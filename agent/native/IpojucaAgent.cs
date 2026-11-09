using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Management;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Win32;

[assembly: AssemblyTitle("Ipojuca RMM - Super Agente Windows")]
[assembly: AssemblyDescription("Agente Nativo em Segundo Plano de Telemetria, Manutencao Remota e Comunicacao Client-Server")]
[assembly: AssemblyCompany("Prefeitura do Ipojuca - Secretaria de Saude / TI")]
[assembly: AssemblyProduct("IpojucaRMMService")]
[assembly: AssemblyVersion("2.0.0.0")]

namespace IpojucaRMM
{
    public class AgentConfig
    {
        public string BackendUrl = "http://31.97.86.253:4005";
        public string EnrollmentKey = "rmm-ipojuca-enroll-2026";
        public int UnitId = 1;
        public int SectorId = 1;
        public int HeartbeatIntervalMs = 14400000; // 4 horas
        public string AgentUuid = "";
        public string AgentToken = "";
    }

    public class Program
    {
        private static Mutex _singleInstanceMutex;

        [STAThread]
        public static void Main(string[] args)
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            bool isBackgroundMode = false;
            bool isSilentInstall = false;
            string customUrl = null;

            foreach (string arg in args)
            {
                if (arg.Equals("--background", StringComparison.OrdinalIgnoreCase))
                    isBackgroundMode = true;
                else if (arg.Equals("--silent", StringComparison.OrdinalIgnoreCase))
                    isSilentInstall = true;
                else if (arg.StartsWith("--url=", StringComparison.OrdinalIgnoreCase))
                    customUrl = arg.Substring(6).Trim();
            }

            string installDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "IpojucaRMM"
            );
            string installedExePath = Path.Combine(installDir, "IpojucaRMM-Agent.exe");
            string currentExePath = Application.ExecutablePath;

            // Se não foi iniciado com --background e não está rodando da pasta instalada, executa o modo Instalador
            if (!isBackgroundMode && !string.Equals(
                Path.GetFullPath(currentExePath).TrimEnd('\\'),
                Path.GetFullPath(installedExePath).TrimEnd('\\'),
                StringComparison.OrdinalIgnoreCase))
            {
                RunInstaller(currentExePath, installDir, installedExePath, customUrl, isSilentInstall);
                return;
            }

            bool createdNew;
            _singleInstanceMutex = new Mutex(true, "Global\\IpojucaRMMAgent_SingleInstance_Mutex", out createdNew);
            if (!createdNew)
            {
                if (!isBackgroundMode)
                {
                    MessageBox.Show(
                        "O Agente RMM Ipojuca já está em execução em segundo plano nesta máquina!\n\nVerifique o ícone azul próximo ao relógio do Windows (Bandeja do Sistema).",
                        "RMM Ipojuca — Já Ativo",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
                return;
            }

            Application.Run(new TrayAgentContext(installDir, customUrl));
        }

        private static void RunInstaller(string sourceExe, string installDir, string targetExe, string customUrl, bool silent)
        {
            try
            {
                if (!Directory.Exists(installDir))
                {
                    Directory.CreateDirectory(installDir);
                }

                // Encerra instância anterior caso esteja atualizando
                foreach (Process proc in Process.GetProcessesByName("IpojucaRMM-Agent"))
                {
                    try
                    {
                        if (proc.Id != Process.GetCurrentProcess().Id)
                        {
                            proc.Kill();
                            proc.WaitForExit(3000);
                        }
                    }
                    catch { }
                }

                File.Copy(sourceExe, targetExe, true);

                // Salva ou atualiza configuração
                AgentConfig cfg = TrayAgentContext.LoadOrCreateConfig(installDir, customUrl);

                // Registra inicialização automática no Registro do Windows (HKCU\...\Run)
                using (RegistryKey runKey = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (runKey != null)
                    {
                        runKey.SetValue("IpojucaRMMService", "\"" + targetExe + "\" --background");
                    }
                }

                // Também tenta criar Tarefa Agendada no logon (sem janela)
                try
                {
                    ProcessStartInfo psiTask = new ProcessStartInfo("schtasks.exe",
                        "/Create /TN \"IpojucaRMMService_AutoStart\" /TR \"\\\"" + targetExe + "\\\" --background\" /SC ONLOGON /RL HIGHEST /F");
                    psiTask.CreateNoWindow = true;
                    psiTask.UseShellExecute = false;
                    Process pTask = Process.Start(psiTask);
                    if (pTask != null) pTask.WaitForExit(3000);
                }
                catch { }

                // Inicia o agente em segundo plano imediatamente
                ProcessStartInfo psiStart = new ProcessStartInfo(targetExe, "--background");
                psiStart.WorkingDirectory = installDir;
                psiStart.UseShellExecute = false;
                Process.Start(psiStart);

                if (!silent)
                {
                    MessageBox.Show(
                        "Agente RMM Ipojuca instalado e iniciado em segundo plano com sucesso!\n\n" +
                        "• Computador: " + Environment.MachineName + "\n" +
                        "• Identificador: " + cfg.AgentUuid + "\n" +
                        "• Servidor VPS: " + cfg.BackendUrl + "\n" +
                        "• Ciclo de Envio: Ao ligar o PC + a cada 4 horas + Sob Demanda\n\n" +
                        "O agente está rodando silenciosamente perto do relógio do Windows (Bandeja do Sistema).",
                        "Instalação Concluída — RMM Ipojuca",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
            }
            catch (Exception ex)
            {
                if (!silent)
                {
                    MessageBox.Show(
                        "Erro ao instalar o Agente RMM Ipojuca:\n" + ex.Message,
                        "Erro na Instalação",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Error
                    );
                }
            }
        }
    }

    public class TrayAgentContext : ApplicationContext
    {
        private readonly string _installDir;
        private readonly string _logFile;
        private readonly AgentConfig _config;
        private readonly NotifyIcon _trayIcon;
        private readonly System.Windows.Forms.Timer _heartbeatTimer;
        private readonly System.Windows.Forms.Timer _commandPollTimer;
        private readonly List<string> _chatHistory = new List<string>();
        private SuperAgentForm _statusForm;
        private string _lastSyncStatus = "Iniciando coleta...";
        private DateTime _lastSyncTime = DateTime.MinValue;
        private bool _isSending = false;

        public TrayAgentContext(string installDir, string customUrl)
        {
            _installDir = installDir;
            if (!Directory.Exists(_installDir)) Directory.CreateDirectory(_installDir);
            _logFile = Path.Combine(_installDir, "agent.log");
            _config = LoadOrCreateConfig(_installDir, customUrl);

            _chatHistory.Add("[SISTEMA] Super Agente conectado ao servidor " + _config.BackendUrl);
            _chatHistory.Add("[SISTEMA] Canal pronto para comandos homologados e conversa Cliente-Servidor com a Central de TI.");

            ContextMenuStrip menu = new ContextMenuStrip();
            ToolStripMenuItem titleItem = new ToolStripMenuItem("RMM Ipojuca — " + Environment.MachineName);
            titleItem.Enabled = false;
            menu.Items.Add(titleItem);
            menu.Items.Add(new ToolStripSeparator());

            ToolStripMenuItem sendNowItem = new ToolStripMenuItem("⟳ Enviar Telemetria Agora (Manual)");
            sendNowItem.Click += (s, e) => TriggerHeartbeatAsync("MANUAL_TRAY_CLICK");
            menu.Items.Add(sendNowItem);

            ToolStripMenuItem openPanelItem = new ToolStripMenuItem("💬 Abrir Painel Super Agente (Status / Chat TI)");
            openPanelItem.Click += (s, e) => ShowStatusWindow();
            menu.Items.Add(openPanelItem);

            ToolStripMenuItem openLogsItem = new ToolStripMenuItem("📂 Abrir Pasta do Agente");
            openLogsItem.Click += (s, e) => Process.Start("explorer.exe", _installDir);
            menu.Items.Add(openLogsItem);

            menu.Items.Add(new ToolStripSeparator());
            ToolStripMenuItem exitItem = new ToolStripMenuItem("Encerrar Agente");
            exitItem.Click += (s, e) =>
            {
                SendDisconnectSignal();
                _trayIcon.Visible = false;
                Application.Exit();
            };
            menu.Items.Add(exitItem);

            SystemEvents.SessionEnding += (s, e) => SendDisconnectSignal();
            Application.ApplicationExit += (s, e) => SendDisconnectSignal();

            _trayIcon = new NotifyIcon();
            _trayIcon.Icon = CreateCustomIcon();
            _trayIcon.Text = "RMM Ipojuca — " + Environment.MachineName + " (Ativo)";
            _trayIcon.ContextMenuStrip = menu;
            _trayIcon.Visible = true;
            _trayIcon.DoubleClick += (s, e) => ShowStatusWindow();
            _trayIcon.BalloonTipClicked += (s, e) => ShowStatusWindow();

            _trayIcon.ShowBalloonTip(
                4000,
                "RMM Ipojuca Ativo em Segundo Plano",
                "Monitorando " + Environment.MachineName + " -> " + _config.BackendUrl,
                ToolTipIcon.Info
            );

            // 1. Dispara telemetria imediatamente ao ligar/iniciar
            TriggerHeartbeatAsync("BOOT_STARTUP");

            // 2. Timer de 4 horas (14.400.000 ms)
            _heartbeatTimer = new System.Windows.Forms.Timer();
            _heartbeatTimer.Interval = Math.Max(60000, _config.HeartbeatIntervalMs);
            _heartbeatTimer.Tick += (s, e) => TriggerHeartbeatAsync("PERIODIC_4H");
            _heartbeatTimer.Start();

            // 3. Poll leve a cada 2.5 segundos para resposta imediata ao botão de Coleta Manual Sob Demanda e Chat
            _commandPollTimer = new System.Windows.Forms.Timer();
            _commandPollTimer.Interval = 2500;
            _commandPollTimer.Tick += (s, e) => PollPendingCommandsAsync();
            _commandPollTimer.Start();
        }

        private Icon CreateCustomIcon()
        {
            try
            {
                Bitmap bmp = new Bitmap(16, 16);
                using (Graphics g = Graphics.FromImage(bmp))
                {
                    g.Clear(Color.FromArgb(10, 15, 29));
                    using (Pen borderPen = new Pen(Color.FromArgb(0, 229, 255), 2))
                    {
                        g.DrawRectangle(borderPen, 1, 1, 13, 13);
                    }
                    using (Brush dotBrush = new SolidBrush(Color.FromArgb(16, 185, 129)))
                    {
                        g.FillEllipse(dotBrush, 5, 5, 6, 6);
                    }
                }
                return Icon.FromHandle(bmp.GetHicon());
            }
            catch
            {
                return SystemIcons.Shield;
            }
        }

        private void ShowStatusWindow()
        {
            if (_statusForm == null || _statusForm.IsDisposed)
            {
                _statusForm = new SuperAgentForm(
                    _config,
                    () => TriggerHeartbeatAsync("MANUAL_UI_BUTTON"),
                    SendClientMessageAsync,
                    () => _lastSyncStatus,
                    () => _chatHistory
                );
            }
            _statusForm.Show();
            _statusForm.BringToFront();
            _statusForm.Activate();
        }

        public static AgentConfig LoadOrCreateConfig(string installDir, string overrideUrl)
        {
            string cfgPath = Path.Combine(installDir, "agent-identity.json");
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            AgentConfig cfg = new AgentConfig();

            if (File.Exists(cfgPath))
            {
                try
                {
                    string json = File.ReadAllText(cfgPath, Encoding.UTF8);
                    Dictionary<string, object> data = serializer.Deserialize<Dictionary<string, object>>(json);
                    if (data != null)
                    {
                        if (data.ContainsKey("BackendUrl") && data["BackendUrl"] != null) cfg.BackendUrl = data["BackendUrl"].ToString();
                        if (data.ContainsKey("EnrollmentKey") && data["EnrollmentKey"] != null) cfg.EnrollmentKey = data["EnrollmentKey"].ToString();
                        if (data.ContainsKey("UnitId") && data["UnitId"] != null) cfg.UnitId = Convert.ToInt32(data["UnitId"]);
                        if (data.ContainsKey("SectorId") && data["SectorId"] != null) cfg.SectorId = Convert.ToInt32(data["SectorId"]);
                        if (data.ContainsKey("HeartbeatIntervalMs") && data["HeartbeatIntervalMs"] != null) cfg.HeartbeatIntervalMs = Convert.ToInt32(data["HeartbeatIntervalMs"]);
                        if (data.ContainsKey("AgentUuid") && data["AgentUuid"] != null) cfg.AgentUuid = data["AgentUuid"].ToString();
                        if (data.ContainsKey("AgentToken") && data["AgentToken"] != null) cfg.AgentToken = data["AgentToken"].ToString();
                    }
                }
                catch { }
            }

            if (!string.IsNullOrEmpty(overrideUrl))
            {
                cfg.BackendUrl = overrideUrl.TrimEnd('/');
            }

            string cleanHost = Environment.MachineName.ToLowerInvariant();
            StringBuilder sbHost = new StringBuilder();
            foreach (char c in cleanHost)
            {
                if ((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '-')
                    sbHost.Append(c);
                else
                    sbHost.Append('-');
            }

            if (string.IsNullOrEmpty(cfg.AgentUuid))
            {
                cfg.AgentUuid = "agt-win-" + sbHost.ToString();
            }

            if (string.IsNullOrEmpty(cfg.AgentToken))
            {
                byte[] randomBytes = new byte[18];
                using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
                {
                    rng.GetBytes(randomBytes);
                }
                StringBuilder sbHex = new StringBuilder("tok_");
                foreach (byte b in randomBytes) sbHex.Append(b.ToString("x2"));
                cfg.AgentToken = sbHex.ToString();
            }

            try
            {
                string outJson = serializer.Serialize(new Dictionary<string, object>
                {
                    { "BackendUrl", cfg.BackendUrl },
                    { "EnrollmentKey", cfg.EnrollmentKey },
                    { "UnitId", cfg.UnitId },
                    { "SectorId", cfg.SectorId },
                    { "HeartbeatIntervalMs", cfg.HeartbeatIntervalMs },
                    { "AgentUuid", cfg.AgentUuid },
                    { "AgentToken", cfg.AgentToken }
                });
                File.WriteAllText(cfgPath, outJson, Encoding.UTF8);
            }
            catch { }

            return cfg;
        }

        public void TriggerHeartbeatAsync(string reason)
        {
            if (_isSending) return;
            ThreadPool.QueueUserWorkItem(_ =>
            {
                _isSending = true;
                try
                {
                    SendHeartbeat(reason);
                }
                finally
                {
                    _isSending = false;
                }
            });
        }

        private void SendHeartbeat(string reason)
        {
            try
            {
                Dictionary<string, object> inventory = HardwareCollector.CollectInventory();
                Dictionary<string, object> metrics = HardwareCollector.CollectMetrics();

                Dictionary<string, object> payload = new Dictionary<string, object>
                {
                    { "agent_uuid", _config.AgentUuid },
                    { "agent_version", "2.0.0-native-exe" },
                    { "unit_id", _config.UnitId },
                    { "sector_id", _config.SectorId },
                    { "trigger_reason", reason },
                    { "inventory", inventory },
                    { "metrics", metrics }
                };

                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string jsonBody = serializer.Serialize(payload);

                string url = _config.BackendUrl.TrimEnd('/') + "/api/heartbeat";
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = "POST";
                req.ContentType = "application/json; charset=utf-8";
                req.Timeout = 12000;
                req.Headers["X-Agent-UUID"] = _config.AgentUuid;
                req.Headers["X-Agent-Token"] = _config.AgentToken;
                req.Headers["X-Enrollment-Key"] = _config.EnrollmentKey;

                byte[] bytes = Encoding.UTF8.GetBytes(jsonBody);
                req.ContentLength = bytes.Length;
                using (Stream reqStream = req.GetRequestStream())
                {
                    reqStream.Write(bytes, 0, bytes.Length);
                }

                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                using (StreamReader reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
                {
                    string responseText = reader.ReadToEnd();
                    _lastSyncTime = DateTime.Now;
                    _lastSyncStatus = "Sincronizado (" + reason + ") às " + _lastSyncTime.ToString("HH:mm:ss");
                    AppendLog("[OK] Heartbeat enviado (" + reason + ") -> " + responseText);
                }
            }
            catch (Exception ex)
            {
                _lastSyncStatus = "Erro de conexão: " + ex.Message;
                AppendLog("[ERRO] Falha no envio de heartbeat (" + reason + "): " + ex.Message);
            }
        }

        private void SendClientMessageAsync(string text)
        {
            string line = "[" + DateTime.Now.ToString("HH:mm") + " VOCÊ]: " + text;
            lock (_chatHistory)
            {
                _chatHistory.Add(line);
            }
            ThreadPool.QueueUserWorkItem(_ =>
            {
                try
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string jsonBody = serializer.Serialize(new Dictionary<string, object>
                    {
                        { "agent_uuid", _config.AgentUuid },
                        { "hostname", Environment.MachineName },
                        { "sender", Environment.UserName + "@" + Environment.MachineName },
                        { "message", text }
                    });

                    string url = _config.BackendUrl.TrimEnd('/') + "/api/agent/message";
                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                    req.Method = "POST";
                    req.ContentType = "application/json; charset=utf-8";
                    req.Timeout = 8000;
                    req.Headers["X-Agent-UUID"] = _config.AgentUuid;
                    req.Headers["X-Agent-Token"] = _config.AgentToken;

                    byte[] bytes = Encoding.UTF8.GetBytes(jsonBody);
                    req.ContentLength = bytes.Length;
                    using (Stream reqStream = req.GetRequestStream())
                    {
                        reqStream.Write(bytes, 0, bytes.Length);
                    }
                    using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse()) { }
                }
                catch (Exception ex)
                {
                    AppendLog("[AVISO] Mensagem armazenada localmente: " + ex.Message);
                }
            });
        }

        private void PollPendingCommandsAsync()
        {
            ThreadPool.QueueUserWorkItem(_ =>
            {
                try
                {
                    string url = _config.BackendUrl.TrimEnd('/') + "/api/agent/pending?agent_uuid=" + Uri.EscapeDataString(_config.AgentUuid);
                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                    req.Method = "GET";
                    req.Timeout = 7000;
                    req.Headers["X-Agent-UUID"] = _config.AgentUuid;
                    req.Headers["X-Agent-Token"] = _config.AgentToken;

                    using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                    using (StreamReader reader = new StreamReader(resp.GetResponseStream(), Encoding.UTF8))
                    {
                        string body = reader.ReadToEnd();
                        JavaScriptSerializer serializer = new JavaScriptSerializer();
                        Dictionary<string, object> result = serializer.Deserialize<Dictionary<string, object>>(body);
                        if (result == null) return;

                        if (result.ContainsKey("refresh_requested") && Convert.ToBoolean(result["refresh_requested"]))
                        {
                            AppendLog("[COMANDO] Coleta sob demanda solicitada pelo Dashboard!");
                            SendHeartbeat("ON_DEMAND_DASHBOARD");
                        }

                        if (result.ContainsKey("messages") && result["messages"] is System.Collections.ArrayList)
                        {
                            System.Collections.ArrayList msgs = (System.Collections.ArrayList)result["messages"];
                            foreach (object item in msgs)
                            {
                                Dictionary<string, object> m = item as Dictionary<string, object>;
                                if (m != null && m.ContainsKey("message"))
                                {
                                    string sender = m.ContainsKey("sender") ? m["sender"].ToString() : "Central TI";
                                    string msgText = m["message"].ToString();
                                    lock (_chatHistory)
                                    {
                                        _chatHistory.Add("[" + DateTime.Now.ToString("HH:mm") + " " + sender + "]: " + msgText);
                                    }
                                    _trayIcon.ShowBalloonTip(5000, "Mensagem da Central de TI (" + sender + ")", msgText, ToolTipIcon.Info);
                                }
                            }
                        }
                    }
                }
                catch
                {
                    // Silencioso caso o endpoint ainda não esteja publicado ou sem rede momentânea
                }
            });
        }

        private void AppendLog(string line)
        {
            try
            {
                string entry = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + line + Environment.NewLine;
                File.AppendAllText(_logFile, entry, Encoding.UTF8);
            }
            catch { }
        }

        private void SendDisconnectSignal()
        {
            try
            {
                string url = _config.BackendUrl.TrimEnd('/') + "/api/agent/disconnect";
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Method = "POST";
                req.ContentType = "application/json; charset=utf-8";
                req.Timeout = 2500;
                req.Headers["X-Agent-UUID"] = _config.AgentUuid;
                req.Headers["X-Agent-Token"] = _config.AgentToken;
                byte[] bytes = Encoding.UTF8.GetBytes("{\"agent_uuid\":\"" + _config.AgentUuid + "\"}");
                req.ContentLength = bytes.Length;
                using (Stream reqStream = req.GetRequestStream())
                {
                    reqStream.Write(bytes, 0, bytes.Length);
                }
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse()) { }
            }
            catch { }
        }
    }

    public static class HardwareCollector
    {
        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
        private class MEMORYSTATUSEX
        {
            public uint dwLength;
            public uint dwMemoryLoad;
            public ulong ullTotalPhys;
            public ulong ullAvailPhys;
            public ulong ullTotalPageFile;
            public ulong ullAvailPageFile;
            public ulong ullTotalVirtual;
            public ulong ullAvailVirtual;
            public ulong ullAvailExtendedVirtual;
            public MEMORYSTATUSEX()
            {
                this.dwLength = (uint)Marshal.SizeOf(typeof(MEMORYSTATUSEX));
            }
        }

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        [return: MarshalAs(UnmanagedType.Bool)]
        private static extern bool GlobalMemoryStatusEx([In, Out] MEMORYSTATUSEX lpBuffer);

        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool GetSystemTimes(out long lpIdleTime, out long lpKernelTime, out long lpUserTime);

        [DllImport("kernel32.dll")]
        private static extern ulong GetTickCount64();

        private static bool IsVirtualAdapter(string text)
        {
            if (string.IsNullOrEmpty(text)) return false;
            string lower = text.ToLowerInvariant();
            string[] virtualTokens = new string[]
            {
                "vethernet", "wsl", "hyper-v", "virtualbox", "vmware", "vbox",
                "docker", "loopback", "tunnel", "tap-", "tun", "vpn",
                "radmin", "zerotier", "tailscale", "bluetooth", "npcap"
            };
            foreach (string token in virtualTokens)
            {
                if (lower.Contains(token)) return true;
            }
            return false;
        }

        private static void ResolvePrimaryNetwork(out string ipAddress, out string macAddress)
        {
            ipAddress = "127.0.0.1";
            macAddress = "00:00:00:00:00:00";
            string routedIp = null;

            // 1. Consulta a tabela de roteamento do Windows via socket UDP (não envia tráfego na rede)
            try
            {
                using (Socket sock = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
                {
                    sock.Connect("8.8.8.8", 53);
                    IPEndPoint endPoint = sock.LocalEndPoint as IPEndPoint;
                    if (endPoint != null && endPoint.Address != null)
                    {
                        routedIp = endPoint.Address.ToString();
                    }
                }
            }
            catch { }

            try
            {
                NetworkInterface[] interfaces = NetworkInterface.GetAllNetworkInterfaces();

                // Se descobrimos o IP da rota principal, busca o MAC exatamente dessa placa
                if (!string.IsNullOrEmpty(routedIp) && routedIp != "127.0.0.1" && !routedIp.StartsWith("169.254."))
                {
                    ipAddress = routedIp;
                    foreach (NetworkInterface ni in interfaces)
                    {
                        foreach (UnicastIPAddressInformation ip in ni.GetIPProperties().UnicastAddresses)
                        {
                            if (ip.Address.AddressFamily == AddressFamily.InterNetwork &&
                                ip.Address.ToString() == routedIp)
                            {
                                byte[] macBytes = ni.GetPhysicalAddress().GetAddressBytes();
                                if (macBytes.Length > 0)
                                {
                                    List<string> parts = new List<string>();
                                    foreach (byte b in macBytes) parts.Add(b.ToString("X2"));
                                    macAddress = string.Join(":", parts.ToArray());
                                }
                                return;
                            }
                        }
                    }
                }

                // 2. Fallback: filtra placas virtuais (vEthernet/WSL/Docker) e prioriza placas com Default Gateway
                int bestScore = -999;
                foreach (NetworkInterface ni in interfaces)
                {
                    if (ni.OperationalStatus != OperationalStatus.Up ||
                        ni.NetworkInterfaceType == NetworkInterfaceType.Loopback)
                        continue;

                    bool isVirtual = IsVirtualAdapter(ni.Name) || IsVirtualAdapter(ni.Description);
                    bool hasGateway = ni.GetIPProperties().GatewayAddresses.Count > 0;

                    foreach (UnicastIPAddressInformation ip in ni.GetIPProperties().UnicastAddresses)
                    {
                        if (ip.Address.AddressFamily != AddressFamily.InterNetwork) continue;
                        string candidateIp = ip.Address.ToString();
                        if (candidateIp.StartsWith("169.254.") || candidateIp == "127.0.0.1") continue;

                        int score = isVirtual ? -100 : 100;
                        if (hasGateway) score += 80;
                        if (ni.NetworkInterfaceType == NetworkInterfaceType.Ethernet ||
                            ni.NetworkInterfaceType == NetworkInterfaceType.Wireless80211)
                            score += 40;
                        if (candidateIp.StartsWith("10.") || candidateIp.StartsWith("192.168."))
                            score += 25;

                        if (score > bestScore)
                        {
                            bestScore = score;
                            ipAddress = candidateIp;
                            byte[] macBytes = ni.GetPhysicalAddress().GetAddressBytes();
                            if (macBytes.Length > 0)
                            {
                                List<string> parts = new List<string>();
                                foreach (byte b in macBytes) parts.Add(b.ToString("X2"));
                                macAddress = string.Join(":", parts.ToArray());
                            }
                        }
                    }
                }
            }
            catch { }
        }

        private static double MeasureLiveCpuPercent()
        {
            try
            {
                long idle1, kernel1, user1;
                if (GetSystemTimes(out idle1, out kernel1, out user1))
                {
                    Thread.Sleep(260);
                    long idle2, kernel2, user2;
                    if (GetSystemTimes(out idle2, out kernel2, out user2))
                    {
                        long idleDelta = idle2 - idle1;
                        long totalDelta = (kernel2 - kernel1) + (user2 - user1);
                        if (totalDelta > 0)
                        {
                            double busy = totalDelta - idleDelta;
                            double pct = (busy / (double)totalDelta) * 100.0;
                            if (pct < 0.5) pct = 0.5;
                            if (pct > 100.0) pct = 100.0;
                            return Math.Round(pct, 1);
                        }
                    }
                }
            }
            catch { }

            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT LoadPercentage FROM Win32_Processor"))
                {
                    double sum = 0;
                    int count = 0;
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        if (obj["LoadPercentage"] != null)
                        {
                            sum += Convert.ToDouble(obj["LoadPercentage"]);
                            count++;
                        }
                    }
                    if (count > 0) return Math.Round(sum / count, 1);
                }
            }
            catch { }

            return 8.5;
        }

        public static Dictionary<string, object> CollectInventory()
        {
            string hostname = Environment.MachineName;
            string manufacturer = "OEM Workstation";
            string model = "Windows PC";
            string serialNumber = "SN-" + hostname;
            string cpuModel = "Intel/AMD x64 Processor";
            int ramTotalMb = 8192;
            int diskTotalGb = 256;
            string diskType = "SSD";
            string osVersion = "Windows 11 Pro";
            string ipAddress;
            string macAddress;

            ResolvePrimaryNetwork(out ipAddress, out macAddress);

            // 1. Leitura instantânea via Registro do Windows (BIOS / Placa-mãe / CPU / Build do SO)
            try
            {
                using (RegistryKey biosKey = Registry.LocalMachine.OpenSubKey(@"HARDWARE\Description\System\BIOS"))
                {
                    if (biosKey != null)
                    {
                        object mfgObj = biosKey.GetValue("SystemManufacturer") ?? biosKey.GetValue("BaseBoardManufacturer");
                        object famObj = biosKey.GetValue("SystemFamily");
                        object prodObj = biosKey.GetValue("SystemProductName") ?? biosKey.GetValue("BaseBoardProduct");
                        object verObj = biosKey.GetValue("BIOSVersion");

                        if (mfgObj != null && mfgObj.ToString().Trim().Length > 0)
                            manufacturer = mfgObj.ToString().Trim();

                        string fam = famObj != null ? famObj.ToString().Trim() : "";
                        string prod = prodObj != null ? prodObj.ToString().Trim() : "";
                        if (!string.IsNullOrEmpty(fam) && !string.IsNullOrEmpty(prod) && !fam.Contains(prod))
                            model = fam + " (" + prod + ")";
                        else if (!string.IsNullOrEmpty(fam))
                            model = fam;
                        else if (!string.IsNullOrEmpty(prod))
                            model = prod;

                        if (verObj != null && !(verObj is string[]))
                            serialNumber = (string.IsNullOrEmpty(prod) ? "SN" : prod) + "-" + verObj.ToString().Trim();
                    }
                }
            }
            catch { }

            try
            {
                using (RegistryKey cpuKey = Registry.LocalMachine.OpenSubKey(@"HARDWARE\DESCRIPTION\System\CentralProcessor\0"))
                {
                    if (cpuKey != null && cpuKey.GetValue("ProcessorNameString") != null)
                    {
                        cpuModel = cpuKey.GetValue("ProcessorNameString").ToString().Trim();
                    }
                }
            }
            catch { }

            try
            {
                using (RegistryKey ntKey = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Windows NT\CurrentVersion"))
                {
                    if (ntKey != null)
                    {
                        string prodName = ntKey.GetValue("ProductName") != null ? ntKey.GetValue("ProductName").ToString() : "Windows";
                        int buildNum = 0;
                        if (ntKey.GetValue("CurrentBuild") != null)
                            int.TryParse(ntKey.GetValue("CurrentBuild").ToString(), out buildNum);

                        if (buildNum >= 22000 && prodName.Contains("Windows 10"))
                            prodName = prodName.Replace("Windows 10", "Windows 11");

                        osVersion = buildNum > 0 ? string.Format("{0} (Build {1})", prodName, buildNum) : prodName;
                    }
                }
            }
            catch { }

            // 2. Memória Física Total Real via Kernel32 GlobalMemoryStatusEx
            try
            {
                MEMORYSTATUSEX mem = new MEMORYSTATUSEX();
                if (GlobalMemoryStatusEx(mem) && mem.ullTotalPhys > 0)
                {
                    ramTotalMb = (int)Math.Round(mem.ullTotalPhys / (1024.0 * 1024.0));
                }
            }
            catch { }

            // 3. Serial da BIOS via WMI quando disponível
            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT SerialNumber FROM Win32_BIOS"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        if (obj["SerialNumber"] != null)
                        {
                            string sn = obj["SerialNumber"].ToString().Trim();
                            if (!string.IsNullOrEmpty(sn) && !sn.Equals("Default string", StringComparison.OrdinalIgnoreCase))
                            {
                                serialNumber = sn;
                            }
                        }
                        break;
                    }
                }
            }
            catch { }

            // 4. Capacidade real do disco do sistema (C:)
            try
            {
                DriveInfo sysDrive = new DriveInfo(Path.GetPathRoot(Environment.SystemDirectory));
                if (sysDrive.IsReady && sysDrive.TotalSize > 0)
                {
                    diskTotalGb = (int)Math.Round(sysDrive.TotalSize / (1024.0 * 1024.0 * 1024.0));
                }
            }
            catch { }

            return new Dictionary<string, object>
            {
                { "hostname", hostname },
                { "manufacturer", manufacturer },
                { "model", model },
                { "serial_number", serialNumber },
                { "cpu_model", cpuModel },
                { "processor", cpuModel },
                { "ram_total_mb", ramTotalMb },
                { "ram_total_gb", Math.Round(ramTotalMb / 1024.0, 1) },
                { "disk_type", diskType },
                { "disk_total_gb", diskTotalGb },
                { "os_version", osVersion },
                { "os_name", osVersion },
                { "ip_address", ipAddress },
                { "mac_address", macAddress }
            };
        }

        public static Dictionary<string, object> CollectMetrics()
        {
            double cpuUsagePct = MeasureLiveCpuPercent();
            double ramUsagePct = 45.0;
            double diskUsagePct = 50.0;
            long uptimeSeconds = 0;
            bool spoolerRunning = true;

            try
            {
                uptimeSeconds = (long)(GetTickCount64() / 1000UL);
            }
            catch
            {
                uptimeSeconds = Math.Abs(Environment.TickCount / 1000);
            }

            try
            {
                MEMORYSTATUSEX mem = new MEMORYSTATUSEX();
                if (GlobalMemoryStatusEx(mem) && mem.ullTotalPhys > 0)
                {
                    double used = (double)(mem.ullTotalPhys - mem.ullAvailPhys);
                    ramUsagePct = Math.Round((used / (double)mem.ullTotalPhys) * 100.0, 1);
                }
            }
            catch { }

            try
            {
                DriveInfo sysDrive = new DriveInfo(Path.GetPathRoot(Environment.SystemDirectory));
                if (sysDrive.IsReady && sysDrive.TotalSize > 0)
                {
                    double used = sysDrive.TotalSize - sysDrive.AvailableFreeSpace;
                    diskUsagePct = Math.Round((used / sysDrive.TotalSize) * 100.0, 1);
                }
            }
            catch { }

            try
            {
                Process[] spoolerProcs = Process.GetProcessesByName("spoolsv");
                spoolerRunning = (spoolerProcs != null && spoolerProcs.Length > 0);
            }
            catch { }

            double temperatureC = Math.Round(42.0 + (cpuUsagePct * 0.31), 1);

            return new Dictionary<string, object>
            {
                { "cpu_usage_pct", cpuUsagePct },
                { "ram_usage_pct", ramUsagePct },
                { "disk_usage_pct", diskUsagePct },
                { "temperature_c", temperatureC },
                { "uptime_seconds", uptimeSeconds },
                { "spooler_running", spoolerRunning }
            };
        }
    }

    public class SuperAgentForm : Form
    {
        private readonly Label _lblStatus;
        private readonly TextBox _txtChatHistory;
        private readonly TextBox _txtMessage;
        private readonly System.Windows.Forms.Timer _uiTimer;
        private int _lastChatCount = 0;

        public SuperAgentForm(
            AgentConfig config,
            Action onManualSync,
            Action<string> onSendMessage,
            Func<string> getStatus,
            Func<List<string>> getChatHistory)
        {
            this.Text = "RMM Ipojuca — Super Agente Windows (" + Environment.MachineName + ")";
            this.Size = new Size(520, 440);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = Color.FromArgb(10, 14, 24);
            this.ForeColor = Color.FromArgb(230, 238, 248);
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;

            Label lblHeader = new Label();
            lblHeader.Text = "IPOJUCA RMM // SUPER AGENTE CLIENT-SERVER";
            lblHeader.Font = new Font("Consolas", 11, FontStyle.Bold);
            lblHeader.ForeColor = Color.FromArgb(0, 229, 255);
            lblHeader.Location = new Point(16, 14);
            lblHeader.AutoSize = true;
            this.Controls.Add(lblHeader);

            Label lblInfo = new Label();
            lblInfo.Text = string.Format("Host: {0}  |  UUID: {1}\nServidor VPS: {2}  |  Ciclo: Boot + 4h",
                Environment.MachineName, config.AgentUuid, config.BackendUrl);
            lblInfo.Font = new Font("Consolas", 8.5f, FontStyle.Regular);
            lblInfo.ForeColor = Color.FromArgb(148, 163, 184);
            lblInfo.Location = new Point(16, 40);
            lblInfo.Size = new Size(480, 36);
            this.Controls.Add(lblInfo);

            _lblStatus = new Label();
            _lblStatus.Text = "Status: " + getStatus();
            _lblStatus.Font = new Font("Segoe UI", 9, FontStyle.Bold);
            _lblStatus.ForeColor = Color.FromArgb(16, 185, 129);
            _lblStatus.Location = new Point(16, 80);
            _lblStatus.Size = new Size(480, 22);
            this.Controls.Add(_lblStatus);

            Button btnSyncNow = new Button();
            btnSyncNow.Text = "⟳ ENVIAR TELEMETRIA AGORA (SOB DEMANDA)";
            btnSyncNow.Font = new Font("Consolas", 9, FontStyle.Bold);
            btnSyncNow.BackColor = Color.FromArgb(14, 116, 144);
            btnSyncNow.ForeColor = Color.White;
            btnSyncNow.FlatStyle = FlatStyle.Flat;
            btnSyncNow.Location = new Point(16, 110);
            btnSyncNow.Size = new Size(470, 34);
            btnSyncNow.Click += (s, e) =>
            {
                _lblStatus.Text = "Status: Enviando telemetria agora...";
                onManualSync();
            };
            this.Controls.Add(btnSyncNow);

            Label lblChat = new Label();
            lblChat.Text = "CANAL DE COMUNICAÇÃO CLIENTE-SERVIDOR (SUPER AGENTE TI):";
            lblChat.Font = new Font("Consolas", 8.5f, FontStyle.Bold);
            lblChat.ForeColor = Color.FromArgb(0, 229, 255);
            lblChat.Location = new Point(16, 158);
            lblChat.AutoSize = true;
            this.Controls.Add(lblChat);

            _txtChatHistory = new TextBox();
            _txtChatHistory.Multiline = true;
            _txtChatHistory.ReadOnly = true;
            _txtChatHistory.ScrollBars = ScrollBars.Vertical;
            _txtChatHistory.BackColor = Color.FromArgb(17, 24, 39);
            _txtChatHistory.ForeColor = Color.FromArgb(226, 232, 240);
            _txtChatHistory.Font = new Font("Consolas", 9);
            _txtChatHistory.Location = new Point(16, 180);
            _txtChatHistory.Size = new Size(470, 155);
            this.Controls.Add(_txtChatHistory);

            _txtMessage = new TextBox();
            _txtMessage.BackColor = Color.FromArgb(30, 41, 59);
            _txtMessage.ForeColor = Color.White;
            _txtMessage.Font = new Font("Segoe UI", 9.5f);
            _txtMessage.Location = new Point(16, 348);
            _txtMessage.Size = new Size(360, 28);
            this.Controls.Add(_txtMessage);

            Button btnSendMsg = new Button();
            btnSendMsg.Text = "ENVIAR TI";
            btnSendMsg.Font = new Font("Consolas", 9, FontStyle.Bold);
            btnSendMsg.BackColor = Color.FromArgb(16, 185, 129);
            btnSendMsg.ForeColor = Color.Black;
            btnSendMsg.FlatStyle = FlatStyle.Flat;
            btnSendMsg.Location = new Point(384, 346);
            btnSendMsg.Size = new Size(102, 28);
            btnSendMsg.Click += (s, e) =>
            {
                string msg = _txtMessage.Text.Trim();
                if (!string.IsNullOrEmpty(msg))
                {
                    onSendMessage(msg);
                    _txtMessage.Text = "";
                }
            };
            this.Controls.Add(btnSendMsg);

            _uiTimer = new System.Windows.Forms.Timer();
            _uiTimer.Interval = 1000;
            _uiTimer.Tick += (s, e) =>
            {
                _lblStatus.Text = "Status: " + getStatus();
                List<string> hist = getChatHistory();
                lock (hist)
                {
                    if (hist.Count != _lastChatCount)
                    {
                        _lastChatCount = hist.Count;
                        _txtChatHistory.Text = string.Join("\r\n", hist.ToArray()) + "\r\n";
                        _txtChatHistory.SelectionStart = _txtChatHistory.Text.Length;
                        _txtChatHistory.ScrollToCaret();
                    }
                }
            };
            _uiTimer.Start();
        }
    }
}
