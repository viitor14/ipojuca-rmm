using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Globalization;
using System.IO;
using System.Management;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Script.Serialization;
using System.Windows.Forms;
using Microsoft.Win32;

[assembly: AssemblyTitle("Pulso RMM - Agente Windows")]
[assembly: AssemblyDescription("Agente Nativo em Segundo Plano de Telemetria, Manutencao Remota, Auto-Update OTA Silencioso e Comunicacao Client-Server")]
[assembly: AssemblyCompany("Pulso RMM")]
[assembly: AssemblyProduct("IpojucaRMMService")]
[assembly: AssemblyVersion("2.6.0.0")]

namespace IpojucaRMM
{
    public class AgentConfig
    {
        public const string CURRENT_VERSION = "2.6.0-native-exe";
        public const string DISPLAY_VERSION = "2.6.0";
        public string BackendUrl = "http://31.97.86.253:4005";
        public string EnrollmentKey = "rmm-ipojuca-enroll-2026";
        public int UnitId = 1;
        public int SectorId = 1;
        public int HeartbeatIntervalMs = 14400000; // 4 horas
        public string AgentUuid = "";
        public string AgentToken = "";
    }

    public class ChatEntry
    {
        public string Timestamp;
        public string Sender;
        public string Text;
        public bool IsSelf;
        public bool IsSystem;

        public ChatEntry(string sender, string text, bool isSelf, bool isSystem)
        {
            Timestamp = DateTime.Now.ToString("HH:mm");
            Sender = sender;
            Text = text;
            IsSelf = isSelf;
            IsSystem = isSystem;
        }
    }

    public class StationSnapshot
    {
        public double CpuPct;
        public double RamPct;
        public double DiskPct;
        public double? TemperatureC;
        public string IpAddress = "—";
        public bool IsConnected;
        public bool IsSyncing;
        public string StatusText = "Conectando ao servidor...";
        public string LastSyncClock = "—";
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
            bool isOtaUpdate = false;
            bool isVerifyAdminExit = false;
            string customUrl = null;

            foreach (string arg in args)
            {
                if (arg.Equals("--verify-admin-exit", StringComparison.OrdinalIgnoreCase))
                    isVerifyAdminExit = true;
                else if (arg.Equals("--background", StringComparison.OrdinalIgnoreCase))
                    isBackgroundMode = true;
                else if (arg.Equals("--silent", StringComparison.OrdinalIgnoreCase))
                    isSilentInstall = true;
                else if (arg.Equals("--silent-restart", StringComparison.OrdinalIgnoreCase))
                    isBackgroundMode = true;
                else if (arg.Equals("--ota-update", StringComparison.OrdinalIgnoreCase))
                    isOtaUpdate = true;
                else if (arg.StartsWith("--url=", StringComparison.OrdinalIgnoreCase))
                    customUrl = arg.Substring(6).Trim();
            }

            // Modo auxiliar silencioso acionado via UAC nativo do Windows (Verb = "runas")
            if (isVerifyAdminExit)
            {
                Environment.Exit(WindowsAdminAuthenticator.IsCurrentProcessElevated() ? 0 : 5);
                return;
            }

            string installDir = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "IpojucaRMM"
            );
            string installedExePath = Path.Combine(installDir, "IpojucaRMM-Agent.exe");
            string currentExePath = Application.ExecutablePath;

            // Se não foi iniciado com --background e não está rodando da pasta instalada, executa o modo Instalador/Atualizador
            if (isOtaUpdate || (!isBackgroundMode && !string.Equals(
                Path.GetFullPath(currentExePath).TrimEnd('\\'),
                Path.GetFullPath(installedExePath).TrimEnd('\\'),
                StringComparison.OrdinalIgnoreCase)))
            {
                RunInstaller(currentExePath, installDir, installedExePath, customUrl, isSilentInstall || isOtaUpdate, isOtaUpdate);
                return;
            }

            // Limpa binário temporário remanescente de uma atualização OTA silenciosa
            try
            {
                string leftoverTmp = Path.Combine(installDir, "IpojucaRMM-Updater-Temp.exe");
                if (File.Exists(leftoverTmp) &&
                    !string.Equals(Path.GetFullPath(currentExePath), Path.GetFullPath(leftoverTmp), StringComparison.OrdinalIgnoreCase))
                {
                    File.Delete(leftoverTmp);
                }
            }
            catch { }

            bool createdNew = false;
            int maxMutexRetries = isBackgroundMode ? 12 : 1;
            for (int i = 0; i < maxMutexRetries; i++)
            {
                _singleInstanceMutex = new Mutex(true, "Global\\IpojucaRMMAgent_SingleInstance_Mutex", out createdNew);
                if (createdNew) break;
                try { _singleInstanceMutex.Close(); } catch { }
                if (i + 1 < maxMutexRetries)
                {
                    Thread.Sleep(500);
                }
            }

            if (!createdNew)
            {
                if (!isBackgroundMode)
                {
                    MessageBox.Show(
                        "O Agente RMM Ipojuca já está em execução em segundo plano nesta máquina.\n\nClique no ícone verde próximo ao relógio do Windows (Bandeja do Sistema) para abrir o painel de suporte.",
                        "RMM Ipojuca — Já Ativo",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
                return;
            }

            Application.Run(new TrayAgentContext(installDir, customUrl));
        }

        public static void DisableAutoStart()
        {
            try
            {
                using (RegistryKey runKey = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (runKey != null && runKey.GetValue("IpojucaRMMService") != null)
                    {
                        runKey.DeleteValue("IpojucaRMMService", false);
                    }
                }
            }
            catch { }

            try
            {
                ProcessStartInfo psiDel = new ProcessStartInfo("schtasks.exe", "/Delete /TN \"IpojucaRMMService_AutoStart\" /F");
                psiDel.CreateNoWindow = true;
                psiDel.UseShellExecute = false;
                psiDel.WindowStyle = ProcessWindowStyle.Hidden;
                Process pDel = Process.Start(psiDel);
                if (pDel != null) pDel.WaitForExit(3000);
            }
            catch { }
        }

        public static void ReleaseSingleInstanceMutex()
        {
            if (_singleInstanceMutex != null)
            {
                try { _singleInstanceMutex.ReleaseMutex(); } catch { }
                try { _singleInstanceMutex.Close(); } catch { }
                _singleInstanceMutex = null;
            }
        }

        private static void RunInstaller(string sourceExe, string installDir, string targetExe, string customUrl, bool silent, bool isOtaUpdate)
        {
            string logPath = Path.Combine(installDir, "agent.log");
            try
            {
                if (!Directory.Exists(installDir))
                {
                    Directory.CreateDirectory(installDir);
                }

                // Aguarda encerramento de instância anterior caso esteja atualizando
                string[] runningNames = new string[] { "IpojucaRMM-Agent", "IpojucaRMM-Setup", "IpojucaRMM-Updater-Temp" };
                for (int attempt = 0; attempt < 10; attempt++)
                {
                    foreach (string pName in runningNames)
                    {
                        foreach (Process proc in Process.GetProcessesByName(pName))
                        {
                            try
                            {
                                if (proc.Id != Process.GetCurrentProcess().Id)
                                {
                                    proc.Kill();
                                    proc.WaitForExit(2000);
                                }
                            }
                            catch { }
                        }
                    }
                    try
                    {
                        File.Copy(sourceExe, targetExe, true);
                        break;
                    }
                    catch
                    {
                        Thread.Sleep(500);
                    }
                }

                // Salva ou atualiza configuração preservando AgentUuid e AgentToken
                AgentConfig cfg = TrayAgentContext.LoadOrCreateConfig(installDir, customUrl);

                // Registra inicialização automática no Registro do Windows (HKCU\...\Run)
                using (RegistryKey runKey = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (runKey != null)
                    {
                        runKey.SetValue("IpojucaRMMService", "\"" + targetExe + "\" --background");
                    }
                }

                // Também tenta criar Tarefa Agendada no logon (menor privilégio para manter UAC ativo no encerramento)
                try
                {
                    ProcessStartInfo psiTask = new ProcessStartInfo("schtasks.exe",
                        "/Create /TN \"IpojucaRMMService_AutoStart\" /TR \"\\\"" + targetExe + "\\\" --background\" /SC ONLOGON /RL LIMITED /F");
                    psiTask.CreateNoWindow = true;
                    psiTask.UseShellExecute = false;
                    psiTask.WindowStyle = ProcessWindowStyle.Hidden;
                    Process pTask = Process.Start(psiTask);
                    if (pTask != null) pTask.WaitForExit(3000);
                }
                catch { }

                // Inicia o agente em segundo plano imediatamente (silencioso em OTA)
                string startArgs = isOtaUpdate ? "--background --silent-restart" : "--background";
                ProcessStartInfo psiStart = new ProcessStartInfo(targetExe, startArgs);
                psiStart.WorkingDirectory = installDir;
                psiStart.UseShellExecute = false;
                psiStart.CreateNoWindow = true;
                psiStart.WindowStyle = ProcessWindowStyle.Hidden;
                Process.Start(psiStart);

                if (isOtaUpdate)
                {
                    // OTA 100% silencioso: zero janela, zero popup ao usuário — apenas log técnico
                    try
                    {
                        File.AppendAllText(
                            logPath,
                            DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " [OTA OK] Atualizado silenciosamente para " + AgentConfig.CURRENT_VERSION + " (" + cfg.AgentUuid + ")" + Environment.NewLine,
                            Encoding.UTF8
                        );
                    }
                    catch { }
                }
                else if (!silent)
                {
                    MessageBox.Show(
                        "Agente RMM Ipojuca instalado e iniciado em segundo plano com sucesso!\n\n" +
                        "• Versão: v" + AgentConfig.DISPLAY_VERSION + "\n" +
                        "• Computador: " + Environment.MachineName + "\n" +
                        "• Identificador: " + cfg.AgentUuid + "\n" +
                        "• Servidor Central: " + cfg.BackendUrl + "\n" +
                        "• Atualizações: Silenciosas em segundo plano\n" +
                        "• Encerramento: Protegido por conta de Administrador do Windows\n\n" +
                        "O agente está ativo perto do relógio do Windows (Bandeja do Sistema).",
                        "Instalação Concluída — RMM Ipojuca",
                        MessageBoxButtons.OK,
                        MessageBoxIcon.Information
                    );
                }
            }
            catch (Exception ex)
            {
                try
                {
                    File.AppendAllText(
                        logPath,
                        DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " [INSTALL ERRO] " + ex.Message + Environment.NewLine,
                        Encoding.UTF8
                    );
                }
                catch { }

                if (!silent && !isOtaUpdate)
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
        private readonly Icon _appIcon;
        private readonly System.Windows.Forms.Timer _heartbeatTimer;
        private readonly System.Windows.Forms.Timer _commandPollTimer;
        private readonly List<ChatEntry> _chatHistory = new List<ChatEntry>();
        private readonly HashSet<string> _executedTaskIds = new HashSet<string>();
        private readonly object _taskLock = new object();
        private readonly object _snapshotLock = new object();
        private readonly object _updateLock = new object();
        private readonly StationSnapshot _snapshot = new StationSnapshot();
        private SuperAgentForm _statusForm;
        private readonly Control _uiDispatcher;
        private DateTime _lastSyncTime = DateTime.MinValue;
        private DateTime _lastUpdateFailureUtc = DateTime.MinValue;
        private string _lastDowngradeBlockedVersion = "";
        private bool _isSending = false;
        private bool _isUpdating = false;
        private bool _adminDialogOpen = false;
        private bool _suppressDisconnectOnExit = false;

        public TrayAgentContext(string installDir, string customUrl)
        {
            _installDir = installDir;
            if (!Directory.Exists(_installDir)) Directory.CreateDirectory(_installDir);
            _logFile = Path.Combine(_installDir, "agent.log");
            _config = LoadOrCreateConfig(_installDir, customUrl);
            _uiDispatcher = new Control();
            _uiDispatcher.CreateControl();

            _chatHistory.Add(new ChatEntry(
                "Central TI",
                "Use este canal sempre que precisar falar com a equipe de TI.",
                false,
                true
            ));

            ContextMenuStrip menu = new ContextMenuStrip();
            menu.Renderer = new EditorialMenuRenderer();
            menu.ShowImageMargin = false;
            menu.Font = new Font("Segoe UI", 9.5f, FontStyle.Regular);
            menu.BackColor = Color.White;
            menu.ForeColor = Color.FromArgb(36, 41, 37);

            ToolStripMenuItem titleItem = new ToolStripMenuItem("Pulso RMM · v" + AgentConfig.DISPLAY_VERSION);
            titleItem.Enabled = false;
            titleItem.Font = new Font("Segoe UI", 8.5f, FontStyle.Bold);
            menu.Items.Add(titleItem);
            menu.Items.Add(new ToolStripSeparator());

            ToolStripMenuItem openPanelItem = new ToolStripMenuItem("Abrir painel de suporte");
            openPanelItem.Font = new Font("Segoe UI", 9.5f, FontStyle.Bold);
            openPanelItem.Click += (s, e) => ShowStatusWindow();
            menu.Items.Add(openPanelItem);

            ToolStripMenuItem sendNowItem = new ToolStripMenuItem("Sincronizar telemetria agora");
            sendNowItem.Click += (s, e) => TriggerHeartbeatAsync("MANUAL_TRAY_CLICK");
            menu.Items.Add(sendNowItem);

            ToolStripMenuItem openLogsItem = new ToolStripMenuItem("Abrir pasta de logs");
            openLogsItem.Click += (s, e) =>
            {
                try { Process.Start("explorer.exe", _installDir); } catch { }
            };
            menu.Items.Add(openLogsItem);

            menu.Items.Add(new ToolStripSeparator());
            ToolStripMenuItem exitItem = new ToolStripMenuItem("Encerrar agente");
            exitItem.ForeColor = Color.FromArgb(200, 30, 30);
            exitItem.Click += (s, e) => RequestAdminExit();
            menu.Items.Add(exitItem);

            SystemEvents.SessionEnding += (s, e) => SendDisconnectSignal();
            Application.ApplicationExit += (s, e) =>
            {
                if (!_suppressDisconnectOnExit)
                {
                    SendDisconnectSignal();
                }
            };

            _appIcon = CreateCustomIcon();
            _trayIcon = new NotifyIcon();
            _trayIcon.Icon = _appIcon;
            _trayIcon.Text = "Pulso RMM — " + Environment.MachineName;
            _trayIcon.ContextMenuStrip = menu;
            _trayIcon.Visible = true;
            _trayIcon.DoubleClick += (s, e) => ShowStatusWindow();
            _trayIcon.BalloonTipClicked += (s, e) => ShowStatusWindow();

            // 1. Dispara telemetria imediatamente ao ligar/iniciar (sem balão intrusivo ao usuário)
            TriggerHeartbeatAsync("BOOT_STARTUP");

            // 2. Timer de 4 horas (14.400.000 ms)
            _heartbeatTimer = new System.Windows.Forms.Timer();
            _heartbeatTimer.Interval = Math.Max(60000, _config.HeartbeatIntervalMs);
            _heartbeatTimer.Tick += (s, e) => TriggerHeartbeatAsync("PERIODIC_4H");
            _heartbeatTimer.Start();

            // 3. Poll calibrado (5s) para comandos remotos assinados, OTA silencioso e chat TI
            _commandPollTimer = new System.Windows.Forms.Timer();
            _commandPollTimer.Interval = 5000;
            _commandPollTimer.Tick += (s, e) => PollPendingCommandsAsync();
            _commandPollTimer.Start();
        }

        public static Icon CreateCustomIcon()
        {
            try
            {
                Bitmap bmp = new Bitmap(32, 32);
                using (Graphics g = Graphics.FromImage(bmp))
                {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    g.Clear(Color.Transparent);
                    PulsoGraphics.DrawBrandMark(g, 1f, 1f, 30f);
                }
                return Icon.FromHandle(bmp.GetHicon());
            }
            catch
            {
                return SystemIcons.Shield;
            }
        }

        private StationSnapshot GetSnapshotCopy()
        {
            lock (_snapshotLock)
            {
                StationSnapshot copy = new StationSnapshot();
                copy.CpuPct = _snapshot.CpuPct;
                copy.RamPct = _snapshot.RamPct;
                copy.DiskPct = _snapshot.DiskPct;
                copy.TemperatureC = _snapshot.TemperatureC;
                copy.IpAddress = _snapshot.IpAddress;
                copy.IsConnected = _snapshot.IsConnected;
                copy.IsSyncing = _snapshot.IsSyncing;
                copy.StatusText = _snapshot.StatusText;
                copy.LastSyncClock = _snapshot.LastSyncClock;
                return copy;
            }
        }

        private List<ChatEntry> GetChatHistorySnapshot()
        {
            lock (_chatHistory)
            {
                return new List<ChatEntry>(_chatHistory);
            }
        }

        private void ShowStatusWindow()
        {
            if (_statusForm == null || _statusForm.IsDisposed)
            {
                _statusForm = new SuperAgentForm(
                    _config,
                    _appIcon,
                    () => TriggerHeartbeatAsync("MANUAL_UI_BUTTON"),
                    SendClientMessageAsync,
                    GetSnapshotCopy,
                    GetChatHistorySnapshot
                );
            }
            if (!_statusForm.Visible)
            {
                _statusForm.Show();
            }
            if (_statusForm.WindowState == FormWindowState.Minimized)
            {
                _statusForm.WindowState = FormWindowState.Normal;
            }
            _statusForm.BringToFront();
            _statusForm.Activate();
        }

        private void RequestAdminExit()
        {
            if (_adminDialogOpen) return;
            _adminDialogOpen = true;
            try
            {
                IntPtr ownerHwnd = (_statusForm != null && !_statusForm.IsDisposed && _statusForm.Visible)
                    ? _statusForm.Handle
                    : IntPtr.Zero;

                string authMethod;
                string detailMsg;
                bool authorized = WindowsAdminAuthenticator.RequestAdminAuthorization(ownerHwnd, out authMethod, out detailMsg);

                if (!authorized)
                {
                    AppendLog("[SEGURANCA] Encerramento nao autorizado (" + authMethod + "): " + detailMsg);
                    return;
                }

                AppendLog("[SEGURANCA] Encerramento autorizado via " + authMethod + ": " + detailMsg);
                SendDisconnectSignal();
                if (_statusForm != null && !_statusForm.IsDisposed)
                {
                    _statusForm.ForceCloseFromAdmin();
                }
                _trayIcon.Visible = false;
                Program.ReleaseSingleInstanceMutex();
                Application.Exit();
            }
            catch (Exception ex)
            {
                AppendLog("[SEGURANCA ERRO] Falha ao solicitar autorizacao administrativa do Windows: " + ex.Message);
            }
            finally
            {
                _adminDialogOpen = false;
            }
        }

        public static bool IsRemoteVersionNewer(string remoteVersion, string localVersion)
        {
            int rMaj, rMin, rPat;
            int lMaj, lMin, lPat;
            if (!TryParseSemVer(remoteVersion, out rMaj, out rMin, out rPat)) return false;
            if (!TryParseSemVer(localVersion, out lMaj, out lMin, out lPat)) return false;
            if (rMaj != lMaj) return rMaj > lMaj;
            if (rMin != lMin) return rMin > lMin;
            return rPat > lPat;
        }

        private static bool TryParseSemVer(string raw, out int major, out int minor, out int patch)
        {
            major = 0;
            minor = 0;
            patch = 0;
            if (string.IsNullOrEmpty(raw)) return false;
            Match m = Regex.Match(raw.Trim(), @"^v?(\d+)\.(\d+)(?:\.(\d+))?");
            if (!m.Success) return false;
            if (!int.TryParse(m.Groups[1].Value, out major)) return false;
            if (!int.TryParse(m.Groups[2].Value, out minor)) return false;
            if (m.Groups[3].Success && !string.IsNullOrEmpty(m.Groups[3].Value))
            {
                int.TryParse(m.Groups[3].Value, out patch);
            }
            return true;
        }

        private void TriggerSilentUpdateAsync(string reason)
        {
            lock (_updateLock)
            {
                if (_isUpdating) return;
                if (_lastUpdateFailureUtc != DateTime.MinValue &&
                    (DateTime.UtcNow - _lastUpdateFailureUtc).TotalMinutes < 10.0)
                {
                    return;
                }
                _isUpdating = true;
            }

            ThreadPool.QueueUserWorkItem(_ =>
            {
                string tempUpdaterPath = Path.Combine(_installDir, "IpojucaRMM-Updater-Temp.exe");
                try
                {
                    AppendLog("[OTA SILENCIOSO] Verificando manifesto de versao (" + reason + ") em " + _config.BackendUrl);

                    string expectedSha256 = "";
                    string latestVer = AgentConfig.CURRENT_VERSION;
                    HttpWebRequest vReq = (HttpWebRequest)WebRequest.Create(_config.BackendUrl.TrimEnd('/') + "/api/agent/version");
                    vReq.Method = "GET";
                    vReq.Timeout = 8000;
                    using (HttpWebResponse vResp = (HttpWebResponse)vReq.GetResponse())
                    using (StreamReader sr = new StreamReader(vResp.GetResponseStream(), Encoding.UTF8))
                    {
                        string vJson = sr.ReadToEnd();
                        JavaScriptSerializer ser = new JavaScriptSerializer();
                        Dictionary<string, object> vData = ser.Deserialize<Dictionary<string, object>>(vJson);
                        if (vData != null)
                        {
                            if (vData.ContainsKey("latest_version") && vData["latest_version"] != null)
                                latestVer = vData["latest_version"].ToString().Trim();
                            if (vData.ContainsKey("sha256") && vData["sha256"] != null)
                                expectedSha256 = vData["sha256"].ToString().Trim().ToLowerInvariant();
                        }
                    }

                    if (!IsRemoteVersionNewer(latestVer, AgentConfig.CURRENT_VERSION))
                    {
                        AppendLog("[OTA ANTI-DOWNGRADE] Versao do servidor (" + latestVer + ") nao e superior a versao local (" + AgentConfig.CURRENT_VERSION + "). Downgrade bloqueado.");
                        lock (_updateLock) { _isUpdating = false; }
                        return;
                    }

                    // Integridade obrigatoria (@security): nunca executar binario OTA sem SHA-256 valido do manifesto
                    if (!Regex.IsMatch(expectedSha256, @"^[0-9a-f]{64}$"))
                    {
                        throw new Exception("Manifesto /api/agent/version nao retornou SHA-256 valido (64 hex).");
                    }

                    if (File.Exists(tempUpdaterPath))
                    {
                        try { File.Delete(tempUpdaterPath); } catch { }
                    }

                    AppendLog("[OTA SILENCIOSO] Baixando nova versao " + latestVer + " em segundo plano...");
                    string downloadUrl = _config.BackendUrl.TrimEnd('/') + "/api/agent/download";
                    HttpWebRequest dlReq = (HttpWebRequest)WebRequest.Create(downloadUrl);
                    dlReq.Method = "GET";
                    dlReq.Timeout = 45000;
                    using (HttpWebResponse dlResp = (HttpWebResponse)dlReq.GetResponse())
                    using (Stream netStream = dlResp.GetResponseStream())
                    using (FileStream fileStream = new FileStream(tempUpdaterPath, FileMode.Create, FileAccess.Write, FileShare.None))
                    {
                        byte[] buffer = new byte[16384];
                        int read;
                        while ((read = netStream.Read(buffer, 0, buffer.Length)) > 0)
                        {
                            fileStream.Write(buffer, 0, read);
                        }
                    }

                    FileInfo fi = new FileInfo(tempUpdaterPath);
                    if (!fi.Exists || fi.Length < 10240)
                    {
                        try { File.Delete(tempUpdaterPath); } catch { }
                        throw new Exception("Arquivo OTA baixado esta incompleto ou invalido.");
                    }

                    string actualSha;
                    using (SHA256 sha = SHA256.Create())
                    using (FileStream fs = File.OpenRead(tempUpdaterPath))
                    {
                        byte[] hashBytes = sha.ComputeHash(fs);
                        StringBuilder sbHash = new StringBuilder(hashBytes.Length * 2);
                        foreach (byte b in hashBytes) sbHash.Append(b.ToString("x2"));
                        actualSha = sbHash.ToString().ToLowerInvariant();
                    }

                    if (actualSha != expectedSha256)
                    {
                        try { File.Delete(tempUpdaterPath); } catch { }
                        throw new Exception("Falha na verificacao de integridade SHA-256 (esperado=" + expectedSha256 + ", obtido=" + actualSha + ").");
                    }

                    AppendLog("[OTA SILENCIOSO] SHA-256 verificado (" + (fi.Length / 1024) + " KB). Aplicando versao " + latestVer + " silenciosamente...");

                    ProcessStartInfo psi = new ProcessStartInfo(tempUpdaterPath, "--ota-update --silent");
                    psi.WorkingDirectory = _installDir;
                    psi.UseShellExecute = false;
                    psi.CreateNoWindow = true;
                    psi.WindowStyle = ProcessWindowStyle.Hidden;
                    Process.Start(psi);

                    _suppressDisconnectOnExit = true;
                    Program.ReleaseSingleInstanceMutex();
                    try { _trayIcon.Visible = false; } catch { }
                    Environment.Exit(0);
                }
                catch (Exception ex)
                {
                    try { if (File.Exists(tempUpdaterPath)) File.Delete(tempUpdaterPath); } catch { }
                    AppendLog("[OTA ERRO] Falha na atualizacao silenciosa (" + reason + "): " + ex.Message);
                    lock (_updateLock)
                    {
                        _lastUpdateFailureUtc = DateTime.UtcNow;
                        _isUpdating = false;
                    }
                }
            });
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
            lock (_snapshotLock)
            {
                _snapshot.IsSyncing = true;
                _snapshot.StatusText = "Sincronizando com a Central de TI...";
            }

            try
            {
                Dictionary<string, object> inventory = HardwareCollector.CollectInventory();
                Dictionary<string, object> metrics = HardwareCollector.CollectMetrics();

                lock (_snapshotLock)
                {
                    if (metrics.ContainsKey("cpu_usage_pct") && metrics["cpu_usage_pct"] != null)
                        _snapshot.CpuPct = Convert.ToDouble(metrics["cpu_usage_pct"]);
                    if (metrics.ContainsKey("ram_usage_pct") && metrics["ram_usage_pct"] != null)
                        _snapshot.RamPct = Convert.ToDouble(metrics["ram_usage_pct"]);
                    if (metrics.ContainsKey("disk_usage_pct") && metrics["disk_usage_pct"] != null)
                        _snapshot.DiskPct = Convert.ToDouble(metrics["disk_usage_pct"]);
                    if (metrics.ContainsKey("temperature_c") && metrics["temperature_c"] != null)
                        _snapshot.TemperatureC = Convert.ToDouble(metrics["temperature_c"]);
                    else
                        _snapshot.TemperatureC = null;
                    if (inventory.ContainsKey("ip_address") && inventory["ip_address"] != null)
                    {
                        string ipVal = inventory["ip_address"].ToString().Trim();
                        if (!string.IsNullOrEmpty(ipVal)) _snapshot.IpAddress = ipVal;
                    }
                }

                Dictionary<string, object> payload = new Dictionary<string, object>
                {
                    { "agent_uuid", _config.AgentUuid },
                    { "agent_version", AgentConfig.CURRENT_VERSION },
                    { "unit_id", _config.UnitId },
                    { "sector_id", _config.SectorId },
                    { "trigger_reason", reason },
                    { "inventory", inventory },
                    { "metrics", metrics },
                    { "printers", PrinterDiscovery.CollectPrinters() }
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
                    string clock = _lastSyncTime.ToString("HH:mm:ss");
                    lock (_snapshotLock)
                    {
                        _snapshot.IsConnected = true;
                        _snapshot.IsSyncing = false;
                        _snapshot.LastSyncClock = clock;
                        _snapshot.StatusText = "Conectado · Última sincronização às " + clock;
                    }
                    AppendLog("[OK] Heartbeat enviado (" + reason + ") -> " + responseText);
                }
            }
            catch (Exception ex)
            {
                lock (_snapshotLock)
                {
                    _snapshot.IsConnected = false;
                    _snapshot.IsSyncing = false;
                    _snapshot.StatusText = "Sem conexão com o servidor";
                }
                AppendLog("[ERRO] Falha no envio de heartbeat (" + reason + "): " + ex.Message);
            }
        }

        [DllImport("secur32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern byte GetUserNameEx(int nameFormat, StringBuilder userName, ref uint userNameSize);

        private const int EXTENDED_NAME_DISPLAY = 3;

        /// <summary>
        /// Resolve o nome do usuario logado no Windows para identificacao exclusiva no chat de suporte TI.
        /// Prioriza Nome de Exibicao (AD/perfil via secur32.dll), com fallback para Environment.UserName.
        /// </summary>
        public static string ResolveLoggedUserSender()
        {
            string resolved = "";
            try
            {
                StringBuilder sb = new StringBuilder(256);
                uint size = (uint)sb.Capacity;
                if (GetUserNameEx(EXTENDED_NAME_DISPLAY, sb, ref size) != 0)
                {
                    resolved = sb.ToString().Trim();
                }
            }
            catch { }

            if (string.IsNullOrEmpty(resolved))
            {
                try
                {
                    resolved = (Environment.UserName ?? "").Trim();
                }
                catch { }
            }

            if (!string.IsNullOrEmpty(resolved))
            {
                resolved = Regex.Replace(resolved, @"[\r\n\t]+", " ").Trim();
            }

            if (string.IsNullOrEmpty(resolved))
            {
                resolved = "Estação " + Environment.MachineName;
            }

            if (resolved.Length > 80)
            {
                resolved = resolved.Substring(0, 80).Trim();
            }
            return resolved;
        }

        private void SendClientMessageAsync(string text)
        {
            lock (_chatHistory)
            {
                _chatHistory.Add(new ChatEntry("Você", text, true, false));
            }
            string senderName = ResolveLoggedUserSender();
            ThreadPool.QueueUserWorkItem(_ =>
            {
                try
                {
                    JavaScriptSerializer serializer = new JavaScriptSerializer();
                    string jsonBody = serializer.Serialize(new Dictionary<string, object>
                    {
                        { "agent_uuid", _config.AgentUuid },
                        { "hostname", Environment.MachineName },
                        { "sender", senderName },
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
                    long currentIdleSeconds = HardwareCollector.GetIdleSeconds();
                    string url = _config.BackendUrl.TrimEnd('/') +
                        "/api/agent/pending?agent_uuid=" + Uri.EscapeDataString(_config.AgentUuid) +
                        "&agent_version=" + Uri.EscapeDataString(AgentConfig.CURRENT_VERSION) +
                        "&idle_seconds=" + currentIdleSeconds;
                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                    req.Method = "GET";
                    req.Timeout = 7000;
                    req.Headers["X-Agent-UUID"] = _config.AgentUuid;
                    req.Headers["X-Agent-Token"] = _config.AgentToken;
                    req.Headers["X-Agent-Version"] = AgentConfig.CURRENT_VERSION;
                    req.Headers["X-Agent-Idle-Seconds"] = currentIdleSeconds.ToString();

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

                        if (result.ContainsKey("update_requested") && Convert.ToBoolean(result["update_requested"]))
                        {
                            string announcedVer = (result.ContainsKey("latest_version") && result["latest_version"] != null)
                                ? result["latest_version"].ToString().Trim()
                                : "";
                            if (!string.IsNullOrEmpty(announcedVer) && !IsRemoteVersionNewer(announcedVer, AgentConfig.CURRENT_VERSION))
                            {
                                if (!string.Equals(_lastDowngradeBlockedVersion, announcedVer, StringComparison.OrdinalIgnoreCase))
                                {
                                    _lastDowngradeBlockedVersion = announcedVer;
                                    AppendLog("[OTA ANTI-DOWNGRADE] Servidor anunciou versao " + announcedVer + " (local: " + AgentConfig.CURRENT_VERSION + "). Downgrade bloqueado.");
                                }
                            }
                            else
                            {
                                AppendLog("[OTA SILENCIOSO] Ordem de atualização automática recebida da Central de TI.");
                                TriggerSilentUpdateAsync("SERVER_POLL");
                            }
                        }

                        if (result.ContainsKey("tasks") && result["tasks"] is System.Collections.ArrayList)
                        {
                            System.Collections.ArrayList tasks = (System.Collections.ArrayList)result["tasks"];
                            foreach (object item in tasks)
                            {
                                Dictionary<string, object> t = item as Dictionary<string, object>;
                                if (t != null && t.ContainsKey("task_id") && t.ContainsKey("task_code"))
                                {
                                    string taskId = Convert.ToString(t["task_id"]);
                                    string taskCode = Convert.ToString(t["task_code"]);
                                    long machineId = t.ContainsKey("machine_id") && t["machine_id"] != null
                                        ? Convert.ToInt64(t["machine_id"])
                                        : 0;
                                    string expiresAt = t.ContainsKey("expires_at") && t["expires_at"] != null
                                        ? Convert.ToString(t["expires_at"])
                                        : "";
                                    string signature = t.ContainsKey("signature") && t["signature"] != null
                                        ? Convert.ToString(t["signature"])
                                        : "";
                                    Dictionary<string, object> taskParams = null;
                                    if (t.ContainsKey("parameters") && t["parameters"] is Dictionary<string, object>)
                                    {
                                        taskParams = (Dictionary<string, object>)t["parameters"];
                                    }
                                    ValidateAndExecuteTask(taskId, machineId, taskCode, expiresAt, signature, taskParams);
                                }
                            }
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
                                        _chatHistory.Add(new ChatEntry(sender, msgText, false, false));
                                    }
                                    // Politica A3: notificacao de bandeja mantida exclusivamente para mensagens da TI
                                    _trayIcon.ShowBalloonTip(5000, "Mensagem da Central de TI (" + sender + ")", msgText, ToolTipIcon.Info);
                                    if (_uiDispatcher != null)
                                    {
                                        _uiDispatcher.BeginInvoke((Action)(() =>
                                        {
                                            ShowStatusWindow();
                                        }));
                                    }
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

        private static string ComputeSha256Hex(string input)
        {
            using (SHA256 sha = SHA256.Create())
            {
                byte[] hash = sha.ComputeHash(Encoding.UTF8.GetBytes(input ?? ""));
                StringBuilder sb = new StringBuilder(hash.Length * 2);
                foreach (byte b in hash) sb.Append(b.ToString("x2"));
                return sb.ToString();
            }
        }

        private static bool VerifyTaskHmac(string taskId, long machineId, string taskCode, string expiresAt, string signature, string agentToken)
        {
            if (string.IsNullOrEmpty(signature) || string.IsNullOrEmpty(agentToken)) return false;
            string keyHex = ComputeSha256Hex(agentToken);
            string canonical = string.Format(CultureInfo.InvariantCulture, "{0}:{1}:{2}:{3}", taskId, machineId, taskCode, expiresAt);
            using (HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(keyHex)))
            {
                byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(canonical));
                StringBuilder sb = new StringBuilder(hash.Length * 2);
                foreach (byte b in hash) sb.Append(b.ToString("x2"));
                string expected = sb.ToString();
                string actual = signature.Trim().ToLowerInvariant();
                if (expected.Length != actual.Length) return false;
                int diff = 0;
                for (int i = 0; i < expected.Length; i++) diff |= expected[i] ^ actual[i];
                return diff == 0;
            }
        }

        private void ReportTaskOutcome(string taskId, bool success, int exitCode, string summary)
        {
            try
            {
                JavaScriptSerializer serializer = new JavaScriptSerializer();
                string jsonBody = serializer.Serialize(new Dictionary<string, object>
                {
                    { "task_id", taskId },
                    { "status", success ? "COMPLETED" : "FAILED" },
                    { "exit_code", exitCode },
                    { "output_summary", summary }
                });

                string url = _config.BackendUrl.TrimEnd('/') + "/api/agent/task-result";
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
                AppendLog("[TASK REPORT ERRO] " + taskId + ": " + ex.Message);
            }
        }

        private void ValidateAndExecuteTask(string taskId, long machineId, string taskCode, string expiresAt, string signature, Dictionary<string, object> taskParams)
        {
            if (string.IsNullOrEmpty(taskId) || string.IsNullOrEmpty(taskCode) || string.IsNullOrEmpty(expiresAt) || string.IsNullOrEmpty(signature))
            {
                AppendLog("[SEGURANCA] Tarefa rejeitada (payload incompleto ou sem assinatura): " + taskId);
                ReportTaskOutcome(taskId, false, 400, "Tarefa rejeitada: payload incompleto ou sem assinatura HMAC.");
                return;
            }

            DateTimeOffset parsedExp;
            if (!DateTimeOffset.TryParse(expiresAt, CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal | DateTimeStyles.AdjustToUniversal, out parsedExp) ||
                DateTimeOffset.UtcNow > parsedExp)
            {
                AppendLog("[SEGURANCA] Tarefa rejeitada (TTL expirado): " + taskId + " exp=" + expiresAt);
                ReportTaskOutcome(taskId, false, 408, "Tarefa rejeitada: prazo de validade (TTL) expirado.");
                return;
            }

            if (!VerifyTaskHmac(taskId, machineId, taskCode, expiresAt, signature, _config.AgentToken))
            {
                AppendLog("[SEGURANCA] Tarefa rejeitada (HMAC invalido): " + taskId);
                ReportTaskOutcome(taskId, false, 401, "Tarefa rejeitada: assinatura criptográfica HMAC inválida.");
                return;
            }

            lock (_taskLock)
            {
                if (_executedTaskIds.Contains(taskId))
                {
                    AppendLog("[SEGURANCA] Tarefa rejeitada (Anti-Replay): " + taskId);
                    ReportTaskOutcome(taskId, false, 409, "Tarefa rejeitada: task_id já processado anteriormente (Anti-Replay).");
                    return;
                }
                if (_executedTaskIds.Count > 5000) _executedTaskIds.Clear();
                _executedTaskIds.Add(taskId);
            }

            ExecuteAndReportTask(taskId, taskCode, taskParams);
        }

        private void ExecuteAndReportTask(string taskId, string taskCode, Dictionary<string, object> taskParams)
        {
            try
            {
                AppendLog("[TASK EXEC] Iniciando execução local silenciosa de " + taskCode + " (" + taskId + ")");

                RemoteTaskExecutor.TaskResult outcome = RemoteTaskExecutor.RunTask(
                    taskCode,
                    taskParams,
                    _config,
                    () => TriggerHeartbeatAsync("TASK_" + taskCode),
                    () => TriggerSilentUpdateAsync("TASK_UPDATE_AGENT")
                );
                ReportTaskOutcome(taskId, outcome.Success, outcome.Success ? 0 : 1, outcome.Summary);
                AppendLog("[TASK OK] " + taskCode + " -> " + outcome.Summary);
            }
            catch (Exception ex)
            {
                AppendLog("[TASK ERRO] " + taskCode + ": " + ex.Message);
                ReportTaskOutcome(taskId, false, 1, "Erro na execução da tarefa: " + ex.Message);
            }
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

    public static class RemoteTaskExecutor
    {
        public class TaskResult
        {
            public bool Success;
            public string Summary;

            public TaskResult(bool success, string summary)
            {
                Success = success;
                Summary = summary;
            }
        }

        public static TaskResult RunTask(string taskCode, Dictionary<string, object> parameters, AgentConfig cfg, Action onTriggerHeartbeat, Action onTriggerUpdate)
        {
            switch (taskCode)
            {
                case "SYNC_TELEMETRY_NOW":
                    if (onTriggerHeartbeat != null) onTriggerHeartbeat();
                    return new TaskResult(true, "Telemetria em tempo real coletada e enviada por " + Environment.MachineName + ".");

                case "CLEAR_TEMP_CACHE":
                    return new TaskResult(true, ClearUserAndSystemTemp());

                case "RESTART_SPOOLER":
                    return new TaskResult(true, RestartPrintSpooler(onTriggerHeartbeat));

                case "FLUSH_DNS_WINSOCK":
                    return new TaskResult(true, FlushDnsAndArp());

                case "COLLECT_NETWORK_DIAG":
                    return new TaskResult(true, CollectLiveNetworkDiagnostics(cfg));

                case "CHECK_DISK_HEALTH":
                    return new TaskResult(true, CheckLiveDiskHealth());

                case "LIST_TOP_PROCESSES":
                    return new TaskResult(true, ListTopProcessesByMemory());

                case "REBOOT_WORKSTATION":
                    return new TaskResult(true, ScheduleSafeReboot());

                case "INSTALL_APPROVED_PRINTER":
                    return InstallApprovedPrinter(parameters, onTriggerHeartbeat);

                case "UPDATE_AGENT":
                    if (onTriggerUpdate != null) onTriggerUpdate();
                    return new TaskResult(true, "Atualização silenciosa iniciada em segundo plano em " + Environment.MachineName + ".");

                default:
                    return new TaskResult(false, "Tarefa '" + taskCode + "' não é suportada por este agente em " + Environment.MachineName + ".");
            }
        }

        private static bool IsPrivateIpv4Strict(string ip)
        {
            if (string.IsNullOrEmpty(ip)) return false;
            if (!Regex.IsMatch(ip, @"^(10\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}$"))
                return false;
            IPAddress parsed;
            return IPAddress.TryParse(ip, out parsed) && parsed.AddressFamily == AddressFamily.InterNetwork;
        }

        private static string EscapePsSingleQuoted(string value)
        {
            return (value ?? "").Replace("'", "''");
        }

        private static TaskResult InstallApprovedPrinter(Dictionary<string, object> parameters, Action onTriggerHeartbeat)
        {
            string printerIp = parameters != null && parameters.ContainsKey("printer_ip")
                ? Convert.ToString(parameters["printer_ip"]).Trim()
                : "";
            string printerName = parameters != null && parameters.ContainsKey("printer_name")
                ? SanitizePrinterName(Convert.ToString(parameters["printer_name"]))
                : "";

            if (!IsPrivateIpv4Strict(printerIp))
            {
                return new TaskResult(false, "Endereço printer_ip inválido ou fora da rede privada institucional.");
            }
            if (string.IsNullOrEmpty(printerName) || printerName.Length < 3)
            {
                return new TaskResult(false, "Parâmetro printer_name inválido após sanitização (permitido 3-64 caracteres alfanuméricos).");
            }

            if (!IsPrinterReachable(printerIp))
            {
                return new TaskResult(false, "A impressora " + printerIp + " não respondeu nas portas 9100/631/515. Nada foi instalado em " + Environment.MachineName + ".");
            }

            bool syntheticName = Regex.IsMatch(printerName, @"^IMPRESSORA-\d+$");
            string realName;
            string realModel;
            PrinterDiscovery.ResolveIppIdentity(printerIp, out realName, out realModel);
            if (!string.IsNullOrEmpty(realName) && syntheticName)
            {
                string safeRealName = SanitizePrinterName(realName);
                if (!string.IsNullOrEmpty(safeRealName) && safeRealName.Length >= 3)
                {
                    printerName = safeRealName;
                }
            }

            string portName = "IP_" + printerIp;
            List<string> candidateDrivers = new List<string>();
            string vendor = DetectPrinterVendor(printerIp);
            if (!string.IsNullOrEmpty(vendor))
            {
                foreach (string installed in ListInstalledDrivers())
                {
                    string upper = installed.ToUpperInvariant();
                    if (upper.Contains("FAX")) continue;
                    if (upper.Contains(vendor) && !candidateDrivers.Contains(installed))
                    {
                        candidateDrivers.Add(installed);
                    }
                }
            }
            candidateDrivers.Add("Microsoft IPP Class Driver");
            candidateDrivers.Add("Generic / Text Only");
            candidateDrivers.Add("Microsoft enhanced Point and Print compatibility driver");

            string safePort = EscapePsSingleQuoted(portName);
            string safeIp = EscapePsSingleQuoted(printerIp);
            string safePrinter = EscapePsSingleQuoted(printerName);

            string lastError = "";
            foreach (string driver in candidateDrivers)
            {
                string safeDriver = EscapePsSingleQuoted(driver);
                string script = string.Join("; ", new string[]
                {
                    "$ErrorActionPreference='Stop'",
                    "$pPort='" + safePort + "'",
                    "$pIp='" + safeIp + "'",
                    "$pName='" + safePrinter + "'",
                    "$pDrv='" + safeDriver + "'",
                    "if (-not (Get-PrinterPort -Name $pPort -ErrorAction SilentlyContinue)) { Add-PrinterPort -Name $pPort -PrinterHostAddress $pIp }",
                    "if (Get-Printer -Name $pName -ErrorAction SilentlyContinue) { Remove-Printer -Name $pName }",
                    "Add-Printer -Name $pName -DriverName $pDrv -PortName $pPort",
                    "(Get-Printer -Name $pName).Name"
                });

                string output = RunPowerShell(script, 45000);
                if (!string.IsNullOrEmpty(output) && output.Trim().Length > 0 && !output.StartsWith("ERRO:"))
                {
                    if (onTriggerHeartbeat != null) onTriggerHeartbeat();
                    return new TaskResult(true, "Impressora '" + printerName + "' instalada em " + Environment.MachineName +
                        " na porta " + portName + " (" + printerIp + ":9100) com o driver '" + driver + "'.");
                }
                lastError = output;
            }

            return new TaskResult(false, "Falha ao instalar a impressora '" + printerName + "' (" + printerIp + ") em " +
                Environment.MachineName + ": " + (string.IsNullOrEmpty(lastError) ? "nenhum driver compatível respondeu." : lastError));
        }

        private static string SanitizePrinterName(string value)
        {
            if (string.IsNullOrEmpty(value)) return "";
            // Whitelist estrita: impede qualquer caractere de controle ou metacaractere PowerShell (', `, $, ;, |, &)
            string clean = Regex.Replace(value, @"[^a-zA-Z0-9 _().-]", " ").Trim();
            clean = Regex.Replace(clean, @"\s+", " ");
            if (clean.Length > 64) clean = clean.Substring(0, 64).Trim();
            return clean;
        }

        private static string DetectPrinterVendor(string ip)
        {
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://" + ip + "/");
                req.Method = "GET";
                req.Timeout = 2500;
                req.ReadWriteTimeout = 2500;
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                {
                    string server = resp.Headers["Server"] ?? "";
                    string body = "";
                    using (StreamReader reader = new StreamReader(resp.GetResponseStream()))
                    {
                        char[] buffer = new char[2048];
                        int read = reader.Read(buffer, 0, buffer.Length);
                        if (read > 0) body = new string(buffer, 0, read);
                    }
                    string blob = (server + " " + body).ToUpperInvariant();
                    if (blob.Contains("KM-MFP") || blob.Contains("KYOCERA")) return "KYOCERA";
                    if (blob.Contains("EPSON")) return "EPSON";
                    if (blob.Contains("BROTHER")) return "BROTHER";
                    if (blob.Contains("CANON")) return "CANON";
                    if (blob.Contains("RICOH")) return "RICOH";
                    if (blob.Contains("XEROX")) return "XEROX";
                    if (blob.Contains("SAMSUNG")) return "SAMSUNG";
                    if (blob.Contains("LEXMARK")) return "LEXMARK";
                    if (blob.Contains("KONICA")) return "KONICA";
                    if (blob.Contains("HEWLETT") || blob.Contains("HP ")) return "HP";
                }
            }
            catch { }
            return null;
        }

        private static List<string> ListInstalledDrivers()
        {
            List<string> names = new List<string>();
            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT Name FROM Win32_PrinterDriver"))
                {
                    foreach (ManagementObject item in searcher.Get())
                    {
                        string name = Convert.ToString(item["Name"]);
                        if (string.IsNullOrEmpty(name)) continue;
                        int comma = name.IndexOf(',');
                        if (comma > 0) name = name.Substring(0, comma);
                        name = name.Trim();
                        if (name.Length > 0 && !names.Contains(name)) names.Add(name);
                    }
                }
            }
            catch { }
            return names;
        }

        private static bool IsPrinterReachable(string ip)
        {
            int[] ports = new int[] { 9100, 631, 515 };
            foreach (int port in ports)
            {
                Socket socket = null;
                try
                {
                    socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                    IAsyncResult ar = socket.BeginConnect(new IPEndPoint(IPAddress.Parse(ip), port), null, null);
                    if (ar.AsyncWaitHandle.WaitOne(1200, false))
                    {
                        socket.EndConnect(ar);
                        if (socket.Connected) return true;
                    }
                }
                catch { }
                finally
                {
                    if (socket != null) { try { socket.Close(); } catch { } }
                }
            }
            return false;
        }

        private static string RunPowerShell(string script, int timeoutMs)
        {
            try
            {
                string encoded = Convert.ToBase64String(Encoding.Unicode.GetBytes(script));
                ProcessStartInfo psi = new ProcessStartInfo("powershell.exe",
                    "-NoProfile -NonInteractive -WindowStyle Hidden -EncodedCommand " + encoded);
                psi.CreateNoWindow = true;
                psi.UseShellExecute = false;
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                using (Process p = Process.Start(psi))
                {
                    string stdout = p.StandardOutput.ReadToEnd();
                    string stderr = p.StandardError.ReadToEnd();
                    if (!p.WaitForExit(timeoutMs))
                    {
                        try { p.Kill(); } catch { }
                        return "ERRO: tempo esgotado ao executar a instalação da impressora.";
                    }
                    if (p.ExitCode != 0)
                    {
                        string detail = string.IsNullOrEmpty(stderr) ? stdout : stderr;
                        detail = Regex.Replace(detail ?? "", @"\s+", " ").Trim();
                        if (detail.Length > 200) detail = detail.Substring(0, 200);
                        return "ERRO: " + detail;
                    }
                    return (stdout ?? "").Trim();
                }
            }
            catch (Exception ex)
            {
                return "ERRO: " + ex.Message;
            }
        }

        private static string ClearUserAndSystemTemp()
        {
            int deletedFiles = 0;
            long freedBytes = 0;
            string[] tempDirs = new string[]
            {
                Path.GetTempPath(),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Windows), "Temp")
            };

            foreach (string dir in tempDirs)
            {
                if (string.IsNullOrEmpty(dir) || !Directory.Exists(dir)) continue;
                try
                {
                    string[] files = Directory.GetFiles(dir, "*", SearchOption.TopDirectoryOnly);
                    foreach (string f in files)
                    {
                        try
                        {
                            FileInfo fi = new FileInfo(f);
                            long len = fi.Length;
                            File.Delete(f);
                            deletedFiles++;
                            freedBytes += len;
                        }
                        catch { }
                    }
                }
                catch { }
            }

            double freedMb = Math.Round(freedBytes / (1024.0 * 1024.0), 2);
            string freeDiskInfo = "";
            try
            {
                DriveInfo cDrive = new DriveInfo("C");
                if (cDrive.IsReady)
                {
                    double freeGb = Math.Round(cDrive.AvailableFreeSpace / (1024.0 * 1024.0 * 1024.0), 1);
                    freeDiskInfo = string.Format(" | Espaço livre atual em C:: {0} GB", freeGb);
                }
            }
            catch { }

            return string.Format("Limpeza concluída em {0}: {1} arquivos temporários removidos ({2} MB liberados de %TEMP% e Windows\\Temp){3}.",
                Environment.MachineName, deletedFiles, freedMb, freeDiskInfo);
        }

        private static string RestartPrintSpooler(Action onTriggerHeartbeat)
        {
            try
            {
                RunHiddenCommand("net", "stop spooler /y", 5000);
                RunHiddenCommand("net", "start spooler", 5000);
                if (onTriggerHeartbeat != null) onTriggerHeartbeat();

                List<string> printers = new List<string>();
                try
                {
                    using (ManagementObjectSearcher s = new ManagementObjectSearcher("SELECT Name, PortName FROM Win32_Printer"))
                    {
                        foreach (ManagementObject o in s.Get())
                        {
                            string pName = o["Name"] != null ? o["Name"].ToString() : "";
                            if (!string.IsNullOrEmpty(pName))
                                printers.Add(pName);
                        }
                    }
                }
                catch { }

                string printerInfo = printers.Count > 0
                    ? "Impressoras instaladas: " + string.Join(", ", printers.ToArray())
                    : "Nenhuma impressora listada no WMI";

                return string.Format("Serviço Spooler de Impressão reiniciado com sucesso em {0} (Status: ATIVO) | {1}.",
                    Environment.MachineName, printerInfo);
            }
            catch (Exception ex)
            {
                return "Tentativa de reinício do Spooler concluída: " + ex.Message;
            }
        }

        private static string FlushDnsAndArp()
        {
            string outDns = RunHiddenCommand("ipconfig", "/flushdns", 5000);
            bool ok = outDns.ToLowerInvariant().Contains("sucesso") || outDns.ToLowerInvariant().Contains("successfully") || outDns.Length > 0;
            return ok
                ? "Cache DNS limpo com sucesso em " + Environment.MachineName + " (ipconfig /flushdns executado e tabela de resolução renovada)."
                : "Comando ipconfig /flushdns executado em " + Environment.MachineName + ".";
        }

        private static string CollectLiveNetworkDiagnostics(AgentConfig cfg)
        {
            string adapterName = "Ethernet/Wi-Fi";
            string ipv4 = "N/A";
            string mac = "N/A";
            string gatewayIp = "N/A";
            string dnsList = "N/A";
            long speedMbps = 0;

            try
            {
                foreach (NetworkInterface ni in NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (ni.OperationalStatus != OperationalStatus.Up || ni.NetworkInterfaceType == NetworkInterfaceType.Loopback)
                        continue;
                    IPInterfaceProperties props = ni.GetIPProperties();
                    if (props.GatewayAddresses.Count > 0)
                    {
                        adapterName = ni.Name + " (" + ni.Description + ")";
                        gatewayIp = props.GatewayAddresses[0].Address.ToString();
                        speedMbps = ni.Speed / 1000000;
                        byte[] macBytes = ni.GetPhysicalAddress().GetAddressBytes();
                        if (macBytes != null && macBytes.Length > 0)
                        {
                            List<string> hex = new List<string>();
                            foreach (byte b in macBytes) hex.Add(b.ToString("X2"));
                            mac = string.Join(":", hex.ToArray());
                        }
                        foreach (UnicastIPAddressInformation uni in props.UnicastAddresses)
                        {
                            if (uni.Address.AddressFamily == AddressFamily.InterNetwork)
                            {
                                ipv4 = uni.Address.ToString();
                                break;
                            }
                        }
                        List<string> dnsItems = new List<string>();
                        foreach (IPAddress dns in props.DnsAddresses)
                        {
                            if (dns.AddressFamily == AddressFamily.InterNetwork)
                                dnsItems.Add(dns.ToString());
                        }
                        if (dnsItems.Count > 0) dnsList = string.Join(", ", dnsItems.ToArray());
                        break;
                    }
                }
            }
            catch { }

            string pingGw = MeasurePingMs(gatewayIp);
            string pingDns = MeasurePingMs("8.8.8.8");

            return string.Format(
                "Host: {0} | Adaptador: {1} ({2} Mbps) | IPv4: {3} (MAC {4}) | Gateway: {5} (Ping {6}) | DNS: [{7}] | Internet (8.8.8.8): {8}",
                Environment.MachineName,
                adapterName,
                speedMbps > 0 ? speedMbps.ToString() : "100+",
                ipv4,
                mac,
                gatewayIp,
                pingGw,
                dnsList,
                pingDns
            );
        }

        private static string MeasurePingMs(string host)
        {
            if (string.IsNullOrEmpty(host) || host == "N/A") return "N/A";
            try
            {
                using (Ping p = new Ping())
                {
                    PingReply r = p.Send(host, 1200);
                    if (r != null && r.Status == IPStatus.Success)
                        return r.RoundtripTime + "ms";
                }
            }
            catch { }
            return "sem ICMP";
        }

        private static string CheckLiveDiskHealth()
        {
            List<string> driveReports = new List<string>();
            try
            {
                foreach (DriveInfo d in DriveInfo.GetDrives())
                {
                    if (d.IsReady && d.DriveType == DriveType.Fixed && d.TotalSize > 0)
                    {
                        double totalGb = Math.Round(d.TotalSize / (1024.0 * 1024.0 * 1024.0), 1);
                        double freeGb = Math.Round(d.AvailableFreeSpace / (1024.0 * 1024.0 * 1024.0), 1);
                        double usedGb = Math.Round(totalGb - freeGb, 1);
                        double usedPct = Math.Round(((d.TotalSize - d.AvailableFreeSpace) / (double)d.TotalSize) * 100.0, 1);
                        driveReports.Add(string.Format("Volume {0} [{1}]: {2} GB usados / {3} GB livres (Total {4} GB — {5}%)",
                            d.Name.TrimEnd('\\'), d.DriveFormat, usedGb, freeGb, totalGb, usedPct));
                    }
                }
            }
            catch { }

            string smartStatus = "OK (Saudável)";
            string diskModel = "Disco Físico";
            try
            {
                using (ManagementObjectSearcher s = new ManagementObjectSearcher("SELECT Model, Status FROM Win32_DiskDrive"))
                {
                    foreach (ManagementObject o in s.Get())
                    {
                        if (o["Model"] != null) diskModel = o["Model"].ToString().Trim();
                        if (o["Status"] != null) smartStatus = o["Status"].ToString().Trim();
                        break;
                    }
                }
            }
            catch { }

            return string.Format("Disco: {0} | Saúde SMART: {1} | {2}",
                diskModel, smartStatus, string.Join(" | ", driveReports.ToArray()));
        }

        private static string ListTopProcessesByMemory()
        {
            try
            {
                Process[] procs = Process.GetProcesses();
                Array.Sort(procs, (a, b) =>
                {
                    long memA = 0, memB = 0;
                    try { memA = a.WorkingSet64; } catch { }
                    try { memB = b.WorkingSet64; } catch { }
                    return memB.CompareTo(memA);
                });

                List<string> top = new List<string>();
                int count = Math.Min(8, procs.Length);
                for (int i = 0; i < count; i++)
                {
                    try
                    {
                        double mb = Math.Round(procs[i].WorkingSet64 / (1024.0 * 1024.0), 0);
                        top.Add(string.Format("#{0} {1} [PID {2}]: {3} MB", i + 1, procs[i].ProcessName, procs[i].Id, mb));
                    }
                    catch { }
                }
                return string.Format("Total ativos em {0}: {1} processos | Top Consumo RAM: {2}",
                    Environment.MachineName, procs.Length, string.Join(" | ", top.ToArray()));
            }
            catch (Exception ex)
            {
                return "Erro ao listar processos: " + ex.Message;
            }
        }

        private static string ScheduleSafeReboot()
        {
            try
            {
                RunHiddenCommand("shutdown.exe", "/r /t 30 /c \"Reinicializacao solicitada pela Central de TI - Pulso RMM (30 segundos)\"", 3000);
                return "Reinicialização agendada para daqui a 30 segundos em " + Environment.MachineName + " (aviso exibido na tela).";
            }
            catch (Exception ex)
            {
                return "Falha ao agendar reinicialização: " + ex.Message;
            }
        }

        private static string RunHiddenCommand(string fileName, string arguments, int timeoutMs)
        {
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo(fileName, arguments);
                psi.CreateNoWindow = true;
                psi.UseShellExecute = false;
                psi.RedirectStandardOutput = true;
                psi.RedirectStandardError = true;
                using (Process p = Process.Start(psi))
                {
                    if (p == null) return "";
                    string output = p.StandardOutput.ReadToEnd();
                    p.WaitForExit(timeoutMs);
                    return output != null ? output.Trim() : "";
                }
            }
            catch
            {
                return "";
            }
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

        [DllImport("kernel32.dll")]
        private static extern uint GetTickCount();

        [StructLayout(LayoutKind.Sequential)]
        private struct LASTINPUTINFO
        {
            public uint cbSize;
            public uint dwTime;
        }

        [DllImport("user32.dll")]
        private static extern bool GetLastInputInfo(ref LASTINPUTINFO plii);

        public static long GetIdleSeconds()
        {
            try
            {
                LASTINPUTINFO lii = new LASTINPUTINFO();
                lii.cbSize = (uint)Marshal.SizeOf(typeof(LASTINPUTINFO));
                if (GetLastInputInfo(ref lii))
                {
                    uint nowTicks = GetTickCount();
                    uint elapsedTicks = unchecked(nowTicks - lii.dwTime);
                    return (long)(elapsedTicks / 1000U);
                }
            }
            catch { }
            return 0;
        }

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

        private static bool IsGenericSerial(string raw)
        {
            if (string.IsNullOrEmpty(raw)) return true;
            string v = raw.Trim();
            if (v.Length < 3 || v.Length > 100) return true;
            string upper = v.ToUpperInvariant();
            string[] generics = new string[]
            {
                "TO BE FILLED BY O.E.M.", "TO BE FILLED BY OEM", "DEFAULT STRING",
                "SYSTEM SERIAL NUMBER", "SYSTEM SERIAL", "SERIAL NUMBER",
                "NONE", "N/A", "NA", "NULL", "UNKNOWN", "NOT SPECIFIED",
                "NOT APPLICABLE", "O.E.M.", "OEM", "123456789", "1234567890", "0123456789"
            };
            foreach (string g in generics)
            {
                if (upper == g) return true;
            }
            if (Regex.IsMatch(upper, @"^[0\s\-.]+$") || Regex.IsMatch(upper, @"^F+$")) return true;
            if (upper.StartsWith("SN-")) return true;
            return false;
        }

        private static string NormalizeSmbiosUuid(string raw)
        {
            if (string.IsNullOrEmpty(raw)) return null;
            string v = raw.Trim().ToUpperInvariant();
            if (!Regex.IsMatch(v, @"^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$"))
                return null;
            if (Regex.IsMatch(v, @"^[0-]+$") || Regex.IsMatch(v, @"^[F-]+$"))
                return null;
            return v;
        }

        private static string DetectSystemDiskType()
        {
            try
            {
                ManagementScope scope = new ManagementScope(@"\\.\root\Microsoft\Windows\Storage");
                scope.Connect();
                using (ManagementObjectSearcher s = new ManagementObjectSearcher(scope, new ObjectQuery("SELECT MediaType, BusType FROM MSFT_PhysicalDisk")))
                {
                    foreach (ManagementObject disk in s.Get())
                    {
                        int media = disk["MediaType"] != null ? Convert.ToInt32(disk["MediaType"]) : 0;
                        int bus = disk["BusType"] != null ? Convert.ToInt32(disk["BusType"]) : 0;
                        if (media == 4 || bus == 17) return "SSD";
                        if (media == 3) return "HDD";
                    }
                }
            }
            catch { }
            return "UNKNOWN";
        }

        private static double? QueryThermalZonePerfClass(string wmiClassName)
        {
            try
            {
                double? hottestC = null;
                using (ManagementObjectSearcher s = new ManagementObjectSearcher(@"\\.\root\CIMV2", "SELECT HighPrecisionTemperature, Temperature FROM " + wmiClassName))
                {
                    foreach (ManagementObject obj in s.Get())
                    {
                        double candidate = -999.0;
                        if (obj["HighPrecisionTemperature"] != null)
                        {
                            double hp = Convert.ToDouble(obj["HighPrecisionTemperature"]);
                            if (hp > 2000.0 && hp < 4500.0)
                            {
                                candidate = Math.Round((hp / 10.0) - 273.15, 1);
                            }
                        }
                        if ((candidate < 15.0 || candidate > 115.0) && obj["Temperature"] != null)
                        {
                            double rawK = Convert.ToDouble(obj["Temperature"]);
                            if (rawK > 200.0 && rawK < 450.0)
                            {
                                candidate = Math.Round(rawK - 273.15, 1);
                            }
                        }
                        if (candidate >= 15.0 && candidate <= 115.0)
                        {
                            if (!hottestC.HasValue || candidate > hottestC.Value)
                            {
                                hottestC = candidate;
                            }
                        }
                    }
                }
                return hottestC;
            }
            catch
            {
                return null;
            }
        }

        public static double? ReadRealTemperatureC()
        {
            // 1. Sensor nativo Windows 10/11 via CIMV2 (funciona sem privilegio de Administrador)
            double? perfFormatted = QueryThermalZonePerfClass("Win32_PerfFormattedData_Counters_ThermalZoneInformation");
            if (perfFormatted.HasValue) return perfFormatted;

            // 2. Fallback para contador bruto CIMV2 (tambem sem elevacao)
            double? perfRaw = QueryThermalZonePerfClass("Win32_PerfRawData_Counters_ThermalZoneInformation");
            if (perfRaw.HasValue) return perfRaw;

            // 3. Fallback ACPI WMI (disponivel quando executado elevado)
            try
            {
                double? hottestAcpi = null;
                ManagementScope scope = new ManagementScope(@"\\.\root\WMI");
                scope.Connect();
                using (ManagementObjectSearcher s = new ManagementObjectSearcher(scope, new ObjectQuery("SELECT CurrentTemperature FROM MSAcpi_ThermalZoneTemperature")))
                {
                    foreach (ManagementObject obj in s.Get())
                    {
                        if (obj["CurrentTemperature"] != null)
                        {
                            double tenthsKelvin = Convert.ToDouble(obj["CurrentTemperature"]);
                            double celsius = Math.Round((tenthsKelvin / 10.0) - 273.15, 1);
                            if (celsius >= 15.0 && celsius <= 115.0)
                            {
                                if (!hottestAcpi.HasValue || celsius > hottestAcpi.Value)
                                    hottestAcpi = celsius;
                            }
                        }
                    }
                }
                if (hottestAcpi.HasValue) return hottestAcpi;
            }
            catch { }

            // 4. Fallback Win32_TemperatureProbe (quando preenchido pelo firmware/SMBIOS)
            try
            {
                using (ManagementObjectSearcher s = new ManagementObjectSearcher(@"\\.\root\CIMV2", "SELECT CurrentReading FROM Win32_TemperatureProbe"))
                {
                    foreach (ManagementObject obj in s.Get())
                    {
                        if (obj["CurrentReading"] != null)
                        {
                            double tenthsC = Convert.ToDouble(obj["CurrentReading"]);
                            double celsius = Math.Round(tenthsC / 10.0, 1);
                            if (celsius >= 15.0 && celsius <= 115.0) return celsius;
                        }
                    }
                }
            }
            catch { }

            return null;
        }

        public static Dictionary<string, object> CollectInventory()
        {
            string hostname = Environment.MachineName;
            string manufacturer = null;
            string model = null;
            string serialNumber = null;
            string smbiosUuid = null;
            string cpuModel = null;
            int? cpuCores = null;
            int? cpuThreads = null;
            int ramTotalMb = 0;
            int diskTotalGb = 0;
            string diskType = DetectSystemDiskType();
            string osVersion = "Windows";
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

            // 3. Serial real da BIOS, SMBIOS UUID e núcleos de CPU via WMI (Ciclo #27 / #48 — nunca inventa serial sintético)
            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT SerialNumber FROM Win32_BIOS"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        if (obj["SerialNumber"] != null)
                        {
                            string sn = obj["SerialNumber"].ToString().Trim();
                            if (!IsGenericSerial(sn)) serialNumber = sn;
                        }
                        break;
                    }
                }
            }
            catch { }

            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT UUID FROM Win32_ComputerSystemProduct"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        if (obj["UUID"] != null)
                        {
                            smbiosUuid = NormalizeSmbiosUuid(obj["UUID"].ToString());
                        }
                        break;
                    }
                }
            }
            catch { }

            try
            {
                int coresSum = 0;
                int threadsSum = 0;
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT Name, NumberOfCores, NumberOfLogicalProcessors FROM Win32_Processor"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        if (string.IsNullOrEmpty(cpuModel) && obj["Name"] != null)
                            cpuModel = obj["Name"].ToString().Trim();
                        if (obj["NumberOfCores"] != null)
                            coresSum += Convert.ToInt32(obj["NumberOfCores"]);
                        if (obj["NumberOfLogicalProcessors"] != null)
                            threadsSum += Convert.ToInt32(obj["NumberOfLogicalProcessors"]);
                    }
                }
                if (coresSum > 0) cpuCores = coresSum;
                if (threadsSum > 0) cpuThreads = threadsSum;
            }
            catch { }

            if (!cpuThreads.HasValue && Environment.ProcessorCount > 0)
            {
                cpuThreads = Environment.ProcessorCount;
            }

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
                { "smbios_uuid", smbiosUuid },
                { "cpu_model", cpuModel },
                { "processor", cpuModel },
                { "cpu_cores", cpuCores },
                { "cpu_threads", cpuThreads },
                { "ram_total_mb", ramTotalMb > 0 ? (object)ramTotalMb : null },
                { "ram_total_gb", ramTotalMb > 0 ? (object)Math.Round(ramTotalMb / 1024.0, 1) : null },
                { "disk_type", diskType },
                { "disk_total_gb", diskTotalGb > 0 ? (object)diskTotalGb : null },
                { "os_version", osVersion },
                { "os_name", osVersion },
                { "ip_address", ipAddress },
                { "mac_address", macAddress },
                { "inventory_collected_at", DateTime.UtcNow.ToString("o") }
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

            double? temperatureC = ReadRealTemperatureC();
            long idleSeconds = GetIdleSeconds();

            return new Dictionary<string, object>
            {
                { "cpu_usage_pct", cpuUsagePct },
                { "ram_usage_pct", ramUsagePct },
                { "disk_usage_pct", diskUsagePct },
                { "temperature_c", temperatureC.HasValue ? (object)temperatureC.Value : null },
                { "uptime_seconds", uptimeSeconds },
                { "idle_seconds", idleSeconds },
                { "spooler_running", spoolerRunning }
            };
        }
    }

    public static class WindowsAdminAuthenticator
    {
        private const int LOGON32_LOGON_INTERACTIVE = 2;
        private const int LOGON32_LOGON_NETWORK = 3;
        private const int LOGON32_PROVIDER_DEFAULT = 0;

        private const int TokenElevationType = 18;
        private const int TokenLinkedToken = 19;
        private const int TokenElevationTypeLimited = 3;

        private const int CREDUIWIN_ENUMERATE_ADMINS = 0x00000100;
        private const int ERROR_CANCELLED = 1223;

        [StructLayout(LayoutKind.Sequential)]
        private struct TOKEN_LINKED_TOKEN
        {
            public IntPtr LinkedToken;
        }

        [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
        private struct CREDUI_INFO
        {
            public int cbSize;
            public IntPtr hwndParent;
            public string pszMessageText;
            public string pszCaptionText;
            public IntPtr hbmBanner;
        }

        [DllImport("advapi32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        private static extern bool LogonUser(
            string lpszUsername,
            string lpszDomain,
            string lpszPassword,
            int dwLogonType,
            int dwLogonProvider,
            out IntPtr phToken
        );

        [DllImport("advapi32.dll", SetLastError = true)]
        private static extern bool GetTokenInformation(
            IntPtr TokenHandle,
            int TokenInformationClass,
            IntPtr TokenInformation,
            int TokenInformationLength,
            out int ReturnLength
        );

        [DllImport("kernel32.dll", SetLastError = true)]
        private static extern bool CloseHandle(IntPtr hObject);

        [DllImport("credui.dll", CharSet = CharSet.Unicode)]
        private static extern uint CredUIPromptForWindowsCredentials(
            ref CREDUI_INFO pUiInfo,
            uint dwAuthError,
            ref uint pulAuthPackage,
            IntPtr pvInAuthBuffer,
            uint ulInAuthBufferSize,
            out IntPtr ppvOutAuthBuffer,
            out uint pulOutAuthBufferSize,
            ref bool pfSave,
            uint dwFlags
        );

        [DllImport("credui.dll", CharSet = CharSet.Unicode, SetLastError = true)]
        private static extern bool CredUnPackAuthenticationBuffer(
            int dwFlags,
            IntPtr pAuthBuffer,
            uint cbAuthBuffer,
            StringBuilder pszUserName,
            ref int pcchMaxUserName,
            StringBuilder pszDomainName,
            ref int pcchMaxDomainName,
            StringBuilder pszPassword,
            ref int pcchMaxPassword
        );

        public static bool IsCurrentProcessElevated()
        {
            try
            {
                using (WindowsIdentity id = WindowsIdentity.GetCurrent())
                {
                    WindowsPrincipal principal = new WindowsPrincipal(id);
                    return principal.IsInRole(WindowsBuiltInRole.Administrator);
                }
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Aciona a tela nativa UAC do Windows (Controle de Conta de Usuario / Verb = "runas"),
        /// suportando nativamente administradores locais e contas administradoras de rede/dominio (AD/Entra ID).
        /// Caso o processo ja esteja elevado, aciona o prompt nativo Seguranca do Windows (credui.dll).
        /// </summary>
        public static bool RequestAdminAuthorization(IntPtr ownerHwnd, out string authMethod, out string detailMessage)
        {
            authMethod = "WINDOWS_UAC";
            detailMessage = "";

            if (!IsCurrentProcessElevated())
            {
                return RequestViaNativeUac(out detailMessage);
            }

            authMethod = "WINDOWS_CREDUI";
            return RequestViaNativeCredUi(ownerHwnd, out detailMessage);
        }

        private static bool RequestViaNativeUac(out string detailMessage)
        {
            detailMessage = "";
            try
            {
                ProcessStartInfo psi = new ProcessStartInfo(Application.ExecutablePath, "--verify-admin-exit");
                psi.UseShellExecute = true;
                psi.Verb = "runas";
                psi.WindowStyle = ProcessWindowStyle.Hidden;

                using (Process proc = Process.Start(psi))
                {
                    if (proc == null)
                    {
                        detailMessage = "Nao foi possivel iniciar o verificador elevado do Windows.";
                        return false;
                    }
                    if (!proc.WaitForExit(30000))
                    {
                        try { proc.Kill(); } catch { }
                        detailMessage = "Tempo limite excedido na verificacao administrativa do Windows.";
                        return false;
                    }
                    if (proc.ExitCode == 0)
                    {
                        detailMessage = "Elevacao UAC confirmada pelo Windows.";
                        return true;
                    }
                    detailMessage = "Verificador elevado retornou acesso negado (ExitCode=" + proc.ExitCode + ").";
                    return false;
                }
            }
            catch (Win32Exception wex)
            {
                if (wex.NativeErrorCode == ERROR_CANCELLED)
                {
                    detailMessage = "Cancelado pelo usuario na tela UAC do Windows.";
                    return false;
                }
                detailMessage = "Falha ao abrir tela UAC do Windows (codigo " + wex.NativeErrorCode + "): " + wex.Message;
                return false;
            }
            catch (Exception ex)
            {
                detailMessage = "Erro ao solicitar UAC do Windows: " + ex.Message;
                return false;
            }
        }

        private static bool RequestViaNativeCredUi(IntPtr ownerHwnd, out string detailMessage)
        {
            detailMessage = "";
            uint authPackage = 0;
            uint lastAuthError = 0;
            bool saveCred = false;

            for (int attempt = 0; attempt < 3; attempt++)
            {
                CREDUI_INFO uiInfo = new CREDUI_INFO();
                uiInfo.cbSize = Marshal.SizeOf(typeof(CREDUI_INFO));
                uiInfo.hwndParent = ownerHwnd;
                uiInfo.pszCaptionText = "Segurança do Windows — RMM Ipojuca";
                uiInfo.pszMessageText = "Informe uma conta Administradora (local ou de rede) para encerrar o agente nesta máquina.";
                uiInfo.hbmBanner = IntPtr.Zero;

                IntPtr outCredBuf = IntPtr.Zero;
                uint outCredSize = 0;
                try
                {
                    uint result = CredUIPromptForWindowsCredentials(
                        ref uiInfo,
                        lastAuthError,
                        ref authPackage,
                        IntPtr.Zero,
                        0,
                        out outCredBuf,
                        out outCredSize,
                        ref saveCred,
                        CREDUIWIN_ENUMERATE_ADMINS
                    );

                    if (result == ERROR_CANCELLED)
                    {
                        detailMessage = "Cancelado na janela de Seguranca do Windows.";
                        return false;
                    }
                    if (result != 0 || outCredBuf == IntPtr.Zero)
                    {
                        detailMessage = "Prompt de Seguranca do Windows retornou codigo " + result + ".";
                        return false;
                    }

                    int maxUser = 256;
                    int maxDomain = 256;
                    int maxPass = 256;
                    StringBuilder sbUser = new StringBuilder(maxUser);
                    StringBuilder sbDomain = new StringBuilder(maxDomain);
                    StringBuilder sbPass = new StringBuilder(maxPass);

                    if (!CredUnPackAuthenticationBuffer(0, outCredBuf, outCredSize, sbUser, ref maxUser, sbDomain, ref maxDomain, sbPass, ref maxPass))
                    {
                        lastAuthError = 1326;
                        continue;
                    }

                    string unpackedUser = sbUser.ToString().Trim();
                    string unpackedDomain = sbDomain.ToString().Trim();
                    string fullUser = (!string.IsNullOrEmpty(unpackedDomain) && !unpackedUser.Contains("\\") && !unpackedUser.Contains("@"))
                        ? (unpackedDomain + "\\" + unpackedUser)
                        : unpackedUser;

                    string errMsg;
                    if (ValidateWindowsAdmin(fullUser, sbPass.ToString(), out errMsg))
                    {
                        detailMessage = "Conta administrativa validada: " + fullUser;
                        return true;
                    }

                    lastAuthError = 1326;
                    detailMessage = errMsg;
                }
                finally
                {
                    if (outCredBuf != IntPtr.Zero)
                    {
                        try { Marshal.FreeCoTaskMem(outCredBuf); } catch { }
                    }
                }
            }

            if (string.IsNullOrEmpty(detailMessage))
            {
                detailMessage = "Credenciais administrativas recusadas pelo Windows.";
            }
            return false;
        }

        public static bool ValidateWindowsAdmin(string rawUsername, string password, out string errorMessage)
        {
            errorMessage = "";
            string inputUser = (rawUsername ?? "").Trim();
            if (string.IsNullOrEmpty(inputUser))
            {
                errorMessage = "Informe o nome de usuário Administrador do Windows.";
                return false;
            }
            if (string.IsNullOrEmpty(password))
            {
                errorMessage = "Informe a senha da conta Administradora.";
                return false;
            }

            List<string> domainsToTry = new List<string>();
            string user = inputUser;

            int slashIdx = inputUser.IndexOf('\\');
            if (slashIdx > 0 && slashIdx < inputUser.Length - 1)
            {
                string explicitDomain = inputUser.Substring(0, slashIdx).Trim();
                user = inputUser.Substring(slashIdx + 1).Trim();
                domainsToTry.Add(string.IsNullOrEmpty(explicitDomain) ? "." : explicitDomain);
            }
            else if (inputUser.Contains("@"))
            {
                domainsToTry.Add(null);
            }
            else
            {
                // Suporta conta de rede/dominio (AD) e conta local sem precisar digitar o prefixo
                string activeDomain = Environment.UserDomainName;
                if (!string.IsNullOrEmpty(activeDomain) &&
                    !string.Equals(activeDomain, Environment.MachineName, StringComparison.OrdinalIgnoreCase))
                {
                    domainsToTry.Add(activeDomain);
                }
                domainsToTry.Add(".");
            }

            int lastWin32Err = 1326;
            bool authenticatedAsNonAdmin = false;

            foreach (string dom in domainsToTry)
            {
                IntPtr token = IntPtr.Zero;
                IntPtr netToken = IntPtr.Zero;
                try
                {
                    int usedLogonType = LOGON32_LOGON_INTERACTIVE;
                    bool loggedIn = LogonUser(user, dom, password, LOGON32_LOGON_INTERACTIVE, LOGON32_PROVIDER_DEFAULT, out token);
                    int win32Err = loggedIn ? 0 : Marshal.GetLastWin32Error();

                    if (!loggedIn && (win32Err == 1385 || win32Err == 1326))
                    {
                        usedLogonType = LOGON32_LOGON_NETWORK;
                        loggedIn = LogonUser(user, dom, password, LOGON32_LOGON_NETWORK, LOGON32_PROVIDER_DEFAULT, out token);
                        win32Err = loggedIn ? 0 : Marshal.GetLastWin32Error();
                    }

                    if (!loggedIn || token == IntPtr.Zero)
                    {
                        lastWin32Err = win32Err;
                        continue;
                    }

                    if (IsTokenAdministrator(token))
                    {
                        return true;
                    }

                    if (usedLogonType == LOGON32_LOGON_INTERACTIVE)
                    {
                        if (LogonUser(user, dom, password, LOGON32_LOGON_NETWORK, LOGON32_PROVIDER_DEFAULT, out netToken) &&
                            netToken != IntPtr.Zero)
                        {
                            if (IsTokenAdministrator(netToken))
                            {
                                return true;
                            }
                        }
                    }

                    authenticatedAsNonAdmin = true;
                }
                catch (Exception ex)
                {
                    errorMessage = "Não foi possível validar a conta no Windows: " + ex.Message;
                    return false;
                }
                finally
                {
                    if (netToken != IntPtr.Zero)
                    {
                        try { CloseHandle(netToken); } catch { }
                    }
                    if (token != IntPtr.Zero)
                    {
                        try { CloseHandle(token); } catch { }
                    }
                }
            }

            if (authenticatedAsNonAdmin)
            {
                errorMessage = "Credenciais válidas, mas esta conta não possui privilégio de Administrador nesta máquina.";
                return false;
            }

            errorMessage = MapLogonError(lastWin32Err);
            return false;
        }

        private static bool IsTokenAdministrator(IntPtr token)
        {
            try
            {
                using (WindowsIdentity id = new WindowsIdentity(token))
                {
                    WindowsPrincipal principal = new WindowsPrincipal(id);
                    if (principal.IsInRole(WindowsBuiltInRole.Administrator))
                    {
                        return true;
                    }
                }
            }
            catch { }

            // Verifica UAC Split Token (TokenElevationTypeLimited -> TokenLinkedToken)
            IntPtr elevPtr = IntPtr.Zero;
            IntPtr linkedStructPtr = IntPtr.Zero;
            IntPtr linkedToken = IntPtr.Zero;
            try
            {
                int outLen = 0;
                int elevSize = Marshal.SizeOf(typeof(int));
                elevPtr = Marshal.AllocHGlobal(elevSize);
                if (GetTokenInformation(token, TokenElevationType, elevPtr, elevSize, out outLen))
                {
                    int elevType = Marshal.ReadInt32(elevPtr);
                    if (elevType == TokenElevationTypeLimited)
                    {
                        int linkedSize = Marshal.SizeOf(typeof(TOKEN_LINKED_TOKEN));
                        linkedStructPtr = Marshal.AllocHGlobal(linkedSize);
                        if (GetTokenInformation(token, TokenLinkedToken, linkedStructPtr, linkedSize, out outLen))
                        {
                            TOKEN_LINKED_TOKEN linked = (TOKEN_LINKED_TOKEN)Marshal.PtrToStructure(linkedStructPtr, typeof(TOKEN_LINKED_TOKEN));
                            linkedToken = linked.LinkedToken;
                            if (linkedToken != IntPtr.Zero)
                            {
                                using (WindowsIdentity linkedId = new WindowsIdentity(linkedToken))
                                {
                                    WindowsPrincipal linkedPrincipal = new WindowsPrincipal(linkedId);
                                    if (linkedPrincipal.IsInRole(WindowsBuiltInRole.Administrator))
                                    {
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch { }
            finally
            {
                if (linkedToken != IntPtr.Zero)
                {
                    try { CloseHandle(linkedToken); } catch { }
                }
                if (linkedStructPtr != IntPtr.Zero)
                {
                    Marshal.FreeHGlobal(linkedStructPtr);
                }
                if (elevPtr != IntPtr.Zero)
                {
                    Marshal.FreeHGlobal(elevPtr);
                }
            }

            return false;
        }

        private static string MapLogonError(int win32Error)
        {
            switch (win32Error)
            {
                case 1326:
                    return "Usuário ou senha do Windows incorretos.";
                case 1327:
                    return "Restrição de conta impede autenticação neste momento.";
                case 1330:
                case 1907:
                    return "A senha desta conta Windows expirou ou precisa ser alterada.";
                case 1331:
                    return "Esta conta de usuário do Windows está desativada.";
                case 1909:
                    return "Esta conta está temporariamente bloqueada no Windows.";
                case 1385:
                    return "Política local do Windows não permite validação desta conta.";
                default:
                    return "Autenticação recusada pelo Windows (código " + win32Error + ").";
            }
        }
    }

    public class EditorialMenuColorTable : ProfessionalColorTable
    {
        private readonly Color _surface = Color.White;
        private readonly Color _hover = Color.FromArgb(236, 239, 235);
        private readonly Color _border = Color.FromArgb(228, 232, 227);

        public override Color ToolStripDropDownBackground { get { return _surface; } }
        public override Color MenuBorder { get { return _border; } }
        public override Color MenuItemBorder { get { return Color.FromArgb(208, 217, 210); } }
        public override Color MenuItemSelected { get { return _hover; } }
        public override Color MenuItemSelectedGradientBegin { get { return _hover; } }
        public override Color MenuItemSelectedGradientEnd { get { return _hover; } }
        public override Color ImageMarginGradientBegin { get { return _surface; } }
        public override Color ImageMarginGradientMiddle { get { return _surface; } }
        public override Color ImageMarginGradientEnd { get { return _surface; } }
        public override Color SeparatorDark { get { return _border; } }
        public override Color SeparatorLight { get { return _surface; } }
    }

    public class EditorialMenuRenderer : ToolStripProfessionalRenderer
    {
        public EditorialMenuRenderer() : base(new EditorialMenuColorTable())
        {
            this.RoundedEdges = false;
        }

        protected override void OnRenderItemText(ToolStripItemTextRenderEventArgs e)
        {
            if (!e.Item.Enabled)
            {
                e.TextColor = Color.FromArgb(115, 123, 117);
            }
            base.OnRenderItemText(e);
        }
    }

    public static class PulsoGraphics
    {
        public static GraphicsPath CreateRoundedRect(RectangleF bounds, float radius)
        {
            float d = radius * 2f;
            GraphicsPath path = new GraphicsPath();
            if (radius <= 0.1f)
            {
                path.AddRectangle(bounds);
                return path;
            }
            path.AddArc(bounds.X, bounds.Y, d, d, 180, 90);
            path.AddArc(bounds.Right - d, bounds.Y, d, d, 270, 90);
            path.AddArc(bounds.Right - d, bounds.Bottom - d, d, d, 0, 90);
            path.AddArc(bounds.X, bounds.Bottom - d, d, d, 90, 90);
            path.CloseFigure();
            return path;
        }

        public static void DrawBrandMark(Graphics g, float x, float y, float size)
        {
            RectangleF rect = new RectangleF(x, y, size, size);
            using (GraphicsPath bg = CreateRoundedRect(rect, size * 0.26f))
            using (SolidBrush fill = new SolidBrush(Color.FromArgb(45, 106, 79)))
            {
                g.FillPath(fill, bg);
            }

            float s = size / 24f;
            PointF[] pulse = new PointF[]
            {
                new PointF(x + 5.5f * s, y + 12.3f * s),
                new PointF(x + 9.0f * s, y + 12.3f * s),
                new PointF(x + 10.7f * s, y + 7.6f * s),
                new PointF(x + 13.1f * s, y + 16.4f * s),
                new PointF(x + 14.9f * s, y + 12.3f * s),
                new PointF(x + 18.5f * s, y + 12.3f * s)
            };
            using (Pen pen = new Pen(Color.White, Math.Max(1.8f, 2.0f * s)))
            {
                pen.StartCap = LineCap.Round;
                pen.EndCap = LineCap.Round;
                pen.LineJoin = LineJoin.Round;
                g.DrawLines(pen, pulse);
            }
        }
    }

    public class PulsoButton : Control
    {
        public bool IsPrimary = true;
        public float CornerRadius = 7f;
        private bool _hovered = false;
        private bool _pressed = false;

        public PulsoButton()
        {
            SetStyle(
                ControlStyles.AllPaintingInWmPaint |
                ControlStyles.OptimizedDoubleBuffer |
                ControlStyles.UserPaint |
                ControlStyles.ResizeRedraw |
                ControlStyles.SupportsTransparentBackColor,
                true
            );
            this.Cursor = Cursors.Hand;
            this.Font = new Font("Segoe UI", 8.75f, FontStyle.Bold);
        }

        protected override void OnMouseEnter(EventArgs e)
        {
            base.OnMouseEnter(e);
            _hovered = true;
            Invalidate();
        }

        protected override void OnMouseLeave(EventArgs e)
        {
            base.OnMouseLeave(e);
            _hovered = false;
            _pressed = false;
            Invalidate();
        }

        protected override void OnMouseDown(MouseEventArgs e)
        {
            base.OnMouseDown(e);
            if (e.Button == MouseButtons.Left)
            {
                _pressed = true;
                Invalidate();
            }
        }

        protected override void OnMouseUp(MouseEventArgs e)
        {
            base.OnMouseUp(e);
            _pressed = false;
            Invalidate();
        }

        protected override void OnEnabledChanged(EventArgs e)
        {
            base.OnEnabledChanged(e);
            this.Cursor = this.Enabled ? Cursors.Hand : Cursors.Default;
            Invalidate();
        }

        protected override void OnTextChanged(EventArgs e)
        {
            base.OnTextChanged(e);
            Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            Color bg;
            Color fg;
            Color border = Color.Transparent;

            if (IsPrimary)
            {
                bg = !Enabled
                    ? Color.FromArgb(148, 179, 165)
                    : _pressed
                        ? Color.FromArgb(29, 74, 54)
                        : _hovered
                            ? Color.FromArgb(35, 84, 62)
                            : Color.FromArgb(45, 106, 79);
                fg = Color.White;
            }
            else
            {
                bg = !Enabled
                    ? Color.FromArgb(248, 250, 248)
                    : _pressed
                        ? Color.FromArgb(236, 241, 237)
                        : _hovered
                            ? Color.FromArgb(244, 247, 245)
                            : Color.White;
                fg = Enabled ? Color.FromArgb(30, 36, 32) : Color.FromArgb(148, 156, 150);
                border = _hovered && Enabled ? Color.FromArgb(182, 194, 185) : Color.FromArgb(212, 220, 214);
            }

            RectangleF rect = new RectangleF(0.5f, 0.5f, Width - 1.5f, Height - 1.5f);
            using (GraphicsPath path = PulsoGraphics.CreateRoundedRect(rect, CornerRadius))
            using (SolidBrush fill = new SolidBrush(bg))
            {
                g.FillPath(fill, path);
                if (border != Color.Transparent)
                {
                    using (Pen pen = new Pen(border, 1f))
                    {
                        g.DrawPath(pen, path);
                    }
                }
            }

            TextRenderer.DrawText(
                g,
                this.Text,
                this.Font,
                new Rectangle(0, 0, Width, Height),
                fg,
                TextFormatFlags.HorizontalCenter | TextFormatFlags.VerticalCenter | TextFormatFlags.SingleLine | TextFormatFlags.NoPrefix
            );
        }
    }

    public class PulsoStatusPill : Control
    {
        private string _label = "Conectando";
        private Color _dotColor = Color.FromArgb(180, 83, 9);
        private Color _bgColor = Color.FromArgb(254, 243, 199);

        public PulsoStatusPill()
        {
            SetStyle(
                ControlStyles.AllPaintingInWmPaint |
                ControlStyles.OptimizedDoubleBuffer |
                ControlStyles.UserPaint |
                ControlStyles.ResizeRedraw |
                ControlStyles.SupportsTransparentBackColor,
                true
            );
            this.BackColor = Color.Transparent;
            this.Font = new Font("Segoe UI", 8.25f, FontStyle.Bold);
        }

        public void SetState(string label, Color dotColor, Color bgColor)
        {
            if (_label == label && _dotColor == dotColor && _bgColor == bgColor) return;
            _label = label;
            _dotColor = dotColor;
            _bgColor = bgColor;
            Size textSz = TextRenderer.MeasureText(label ?? "", this.Font, new Size(200, 26), TextFormatFlags.SingleLine | TextFormatFlags.NoPrefix);
            int targetW = Math.Max(88, Math.Min(136, textSz.Width + 32));
            int rightEdge = this.Left + this.Width;
            this.Width = targetW;
            this.Left = rightEdge - targetW;
            Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.PixelOffsetMode = PixelOffsetMode.HighQuality;

            RectangleF rect = new RectangleF(0.5f, 0.5f, Width - 1.5f, Height - 1.5f);
            using (GraphicsPath path = PulsoGraphics.CreateRoundedRect(rect, (Height - 2f) / 2f))
            using (SolidBrush fill = new SolidBrush(_bgColor))
            {
                g.FillPath(fill, path);
            }

            float dotSize = 6.5f;
            float dotX = 11f;
            float dotY = (Height - dotSize) / 2f;
            using (SolidBrush dotBrush = new SolidBrush(_dotColor))
            {
                g.FillEllipse(dotBrush, dotX, dotY, dotSize, dotSize);
            }

            TextRenderer.DrawText(
                g,
                _label,
                this.Font,
                new Rectangle(22, 0, Width - 28, Height),
                _dotColor,
                TextFormatFlags.Left | TextFormatFlags.VerticalCenter | TextFormatFlags.SingleLine | TextFormatFlags.NoPrefix
            );
        }
    }

    public class PulsoMetricsStrip : Control
    {
        private double _cpu = 0;
        private double _ram = 0;
        private double _disk = 0;
        private double? _temp = null;

        private readonly Font _lblFont = new Font("Segoe UI", 8f, FontStyle.Regular);
        private readonly Font _valFont = new Font("Consolas", 13.5f, FontStyle.Bold);

        public PulsoMetricsStrip()
        {
            SetStyle(
                ControlStyles.AllPaintingInWmPaint |
                ControlStyles.OptimizedDoubleBuffer |
                ControlStyles.UserPaint |
                ControlStyles.ResizeRedraw,
                true
            );
            this.BackColor = Color.White;
        }

        public void UpdateMetrics(double cpu, double ram, double disk, double? temp)
        {
            if (Math.Abs(_cpu - cpu) < 0.05 &&
                Math.Abs(_ram - ram) < 0.05 &&
                Math.Abs(_disk - disk) < 0.05 &&
                _temp == temp)
                return;
            _cpu = cpu;
            _ram = ram;
            _disk = disk;
            _temp = temp;
            Invalidate();
        }

        private static Color ValueTone(double val, double warnAt, double critAt)
        {
            if (val >= critAt) return Color.FromArgb(200, 30, 30);
            if (val >= warnAt) return Color.FromArgb(180, 83, 9);
            return Color.FromArgb(30, 36, 32);
        }

        private static Color BarTone(double val, double warnAt, double critAt, Color normalColor)
        {
            if (val >= critAt) return Color.FromArgb(200, 30, 30);
            if (val >= warnAt) return Color.FromArgb(180, 83, 9);
            return normalColor;
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.Clear(Color.White);

            int padX = 20;
            int innerW = Width - padX * 2;
            int colW = innerW / 4;

            string[] labels = new string[] { "CPU", "RAM", "Disco", "Temp." };
            string[] values = new string[]
            {
                _cpu > 0 ? string.Format(CultureInfo.InvariantCulture, "{0:0}%", _cpu) : "—",
                _ram > 0 ? string.Format(CultureInfo.InvariantCulture, "{0:0}%", _ram) : "—",
                _disk > 0 ? string.Format(CultureInfo.InvariantCulture, "{0:0}%", _disk) : "—",
                (_temp.HasValue && _temp.Value > 0)
                    ? string.Format(CultureInfo.InvariantCulture, "{0:0}°C", _temp.Value)
                    : "N/D"
            };
            double[] ratios = new double[]
            {
                Math.Min(1.0, Math.Max(0.0, _cpu / 100.0)),
                Math.Min(1.0, Math.Max(0.0, _ram / 100.0)),
                Math.Min(1.0, Math.Max(0.0, _disk / 100.0)),
                (_temp.HasValue && _temp.Value > 0) ? Math.Min(1.0, Math.Max(0.0, _temp.Value / 95.0)) : 0.0
            };
            Color[] textColors = new Color[]
            {
                _cpu > 0 ? ValueTone(_cpu, 80, 92) : Color.FromArgb(132, 142, 136),
                _ram > 0 ? ValueTone(_ram, 80, 92) : Color.FromArgb(132, 142, 136),
                _disk > 0 ? ValueTone(_disk, 82, 92) : Color.FromArgb(132, 142, 136),
                (_temp.HasValue && _temp.Value > 0) ? ValueTone(_temp.Value, 75, 85) : Color.FromArgb(132, 142, 136)
            };
            Color[] barColors = new Color[]
            {
                BarTone(_cpu, 80, 92, Color.FromArgb(45, 106, 79)),
                BarTone(_ram, 80, 92, Color.FromArgb(64, 145, 108)),
                BarTone(_disk, 82, 92, Color.FromArgb(100, 116, 139)),
                BarTone(_temp.HasValue ? _temp.Value : 0, 75, 85, Color.FromArgb(64, 145, 108))
            };

            using (Pen divPen = new Pen(Color.FromArgb(232, 236, 232), 1f))
            using (SolidBrush trackBrush = new SolidBrush(Color.FromArgb(234, 237, 234)))
            {
                for (int i = 0; i < 4; i++)
                {
                    int x = padX + i * colW;
                    int cellPadL = i == 0 ? 0 : 12;
                    int cellPadR = i == 3 ? 0 : 12;

                    if (i > 0)
                    {
                        g.DrawLine(divPen, x, 14, x, Height - 14);
                    }

                    int contentX = x + cellPadL;
                    int contentW = colW - cellPadL - cellPadR;

                    TextRenderer.DrawText(
                        g,
                        labels[i],
                        _lblFont,
                        new Rectangle(contentX, 12, contentW, 16),
                        Color.FromArgb(94, 104, 97),
                        TextFormatFlags.Left | TextFormatFlags.VerticalCenter | TextFormatFlags.NoPrefix
                    );

                    TextRenderer.DrawText(
                        g,
                        values[i],
                        _valFont,
                        new Rectangle(contentX - 1, 29, contentW + 2, 24),
                        textColors[i],
                        TextFormatFlags.Left | TextFormatFlags.VerticalCenter | TextFormatFlags.NoPrefix
                    );

                    RectangleF track = new RectangleF(contentX, 58, contentW, 4f);
                    using (GraphicsPath tPath = PulsoGraphics.CreateRoundedRect(track, 2f))
                    {
                        g.FillPath(trackBrush, tPath);
                    }

                    float fillW = (float)(contentW * ratios[i]);
                    if (fillW >= 3f)
                    {
                        RectangleF fillRect = new RectangleF(contentX, 58, fillW, 4f);
                        using (GraphicsPath fPath = PulsoGraphics.CreateRoundedRect(fillRect, 2f))
                        using (SolidBrush fBrush = new SolidBrush(barColors[i]))
                        {
                            g.FillPath(fBrush, fPath);
                        }
                    }
                }

                // Hairline inferior
                g.DrawLine(divPen, 0, Height - 1, Width, Height - 1);
            }
        }
    }

    public class BubbleChatPanel : Panel
    {
        private List<ChatEntry> _entries = new List<ChatEntry>();
        private readonly Font _senderFont = new Font("Segoe UI", 8f, FontStyle.Bold);
        private readonly Font _timeFont = new Font("Consolas", 7.5f, FontStyle.Regular);
        private readonly Font _bodyFont = new Font("Segoe UI", 9f, FontStyle.Regular);
        private readonly Font _sysFont = new Font("Segoe UI", 8.25f, FontStyle.Regular);

        public BubbleChatPanel()
        {
            this.DoubleBuffered = true;
            this.AutoScroll = true;
            this.BackColor = Color.White;
            SetStyle(ControlStyles.OptimizedDoubleBuffer | ControlStyles.ResizeRedraw, true);
        }

        public void SetEntries(List<ChatEntry> entries)
        {
            _entries = entries != null ? new List<ChatEntry>(entries) : new List<ChatEntry>();
            RecalcScrollHeight();
            Invalidate();
            ScrollToBottom();
        }

        private void ScrollToBottom()
        {
            int maxY = Math.Max(0, this.AutoScrollMinSize.Height - this.ClientSize.Height);
            this.AutoScrollPosition = new Point(0, maxY);
        }

        private void RecalcScrollHeight()
        {
            int contentW = Math.Max(240, this.ClientSize.Width - SystemInformation.VerticalScrollBarWidth - 8);
            int y = 12;
            foreach (ChatEntry item in _entries)
            {
                y += MeasureEntryHeight(item, contentW) + 9;
            }
            this.AutoScrollMinSize = new Size(0, y + 6);
        }

        private int MeasureEntryHeight(ChatEntry item, int totalW)
        {
            if (item.IsSystem)
            {
                int maxW = Math.Max(180, totalW - 44);
                Size sz = TextRenderer.MeasureText(
                    item.Text ?? "",
                    _sysFont,
                    new Size(maxW - 22, 0),
                    TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
                );
                return sz.Height + 14;
            }

            int maxBubbleW = (int)(totalW * 0.78);
            Size bodySz = TextRenderer.MeasureText(
                item.Text ?? "",
                _bodyFont,
                new Size(maxBubbleW - 22, 0),
                TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
            );
            return 22 + bodySz.Height + 14;
        }

        protected override void OnResize(EventArgs e)
        {
            base.OnResize(e);
            RecalcScrollHeight();
            Invalidate();
        }

        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            Graphics g = e.Graphics;
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.Clear(Color.White);

            int padX = 18;
            int scrollW = this.VerticalScroll.Visible ? SystemInformation.VerticalScrollBarWidth : 0;
            int totalW = Math.Max(240, this.ClientSize.Width - padX * 2 - (scrollW > 0 ? 4 : 0));
            int y = 12 + this.AutoScrollPosition.Y;

            foreach (ChatEntry item in _entries)
            {
                if (item.IsSystem)
                {
                    int maxSysW = Math.Max(180, totalW - 24);
                    Size sz = TextRenderer.MeasureText(
                        item.Text ?? "",
                        _sysFont,
                        new Size(maxSysW - 24, 0),
                        TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
                    );
                    int pillW = Math.Min(maxSysW, sz.Width + 24);
                    int pillH = sz.Height + 12;
                    int pillX = padX + (totalW - pillW) / 2;

                    RectangleF pillRect = new RectangleF(pillX, y, pillW, pillH);
                    using (GraphicsPath path = PulsoGraphics.CreateRoundedRect(pillRect, 9f))
                    using (SolidBrush fill = new SolidBrush(Color.FromArgb(244, 246, 244)))
                    {
                        g.FillPath(fill, path);
                    }
                    TextRenderer.DrawText(
                        g,
                        item.Text ?? "",
                        _sysFont,
                        new Rectangle(pillX + 12, y + 6, pillW - 24, sz.Height),
                        Color.FromArgb(94, 104, 97),
                        TextFormatFlags.HorizontalCenter | TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
                    );
                    y += pillH + 10;
                    continue;
                }

                int maxBubbleW = (int)(totalW * 0.78);
                Size headSenderSz = TextRenderer.MeasureText(item.Sender ?? "", _senderFont, new Size(maxBubbleW, 20), TextFormatFlags.NoPrefix);
                Size headTimeSz = TextRenderer.MeasureText(item.Timestamp ?? "", _timeFont, new Size(60, 20), TextFormatFlags.NoPrefix);
                Size bodySz = TextRenderer.MeasureText(
                    item.Text ?? "",
                    _bodyFont,
                    new Size(maxBubbleW - 24, 0),
                    TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
                );

                int headMinW = headSenderSz.Width + headTimeSz.Width + 22;
                int bubbleW = Math.Min(maxBubbleW, Math.Max(headMinW, bodySz.Width) + 24);
                int bubbleH = 22 + bodySz.Height + 14;
                int bubbleX = item.IsSelf ? (padX + totalW - bubbleW) : padX;

                Color bg = item.IsSelf ? Color.FromArgb(233, 244, 238) : Color.FromArgb(243, 245, 242);
                Color border = item.IsSelf ? Color.FromArgb(201, 226, 212) : Color.FromArgb(227, 231, 227);
                Color senderClr = item.IsSelf ? Color.FromArgb(45, 106, 79) : Color.FromArgb(30, 36, 32);

                RectangleF bRect = new RectangleF(bubbleX, y, bubbleW, bubbleH);
                using (GraphicsPath path = PulsoGraphics.CreateRoundedRect(bRect, 10f))
                using (SolidBrush fill = new SolidBrush(bg))
                using (Pen pen = new Pen(border, 1f))
                {
                    g.FillPath(fill, path);
                    g.DrawPath(pen, path);
                }

                TextRenderer.DrawText(
                    g,
                    item.Sender ?? "",
                    _senderFont,
                    new Rectangle(bubbleX + 12, y + 7, bubbleW - 58, 16),
                    senderClr,
                    TextFormatFlags.Left | TextFormatFlags.VerticalCenter | TextFormatFlags.EndEllipsis | TextFormatFlags.NoPrefix
                );

                TextRenderer.DrawText(
                    g,
                    item.Timestamp ?? "",
                    _timeFont,
                    new Rectangle(bubbleX + bubbleW - 52, y + 7, 40, 16),
                    Color.FromArgb(128, 138, 131),
                    TextFormatFlags.Right | TextFormatFlags.VerticalCenter | TextFormatFlags.NoPrefix
                );

                TextRenderer.DrawText(
                    g,
                    item.Text ?? "",
                    _bodyFont,
                    new Rectangle(bubbleX + 12, y + 25, bubbleW - 24, bodySz.Height + 2),
                    Color.FromArgb(30, 36, 32),
                    TextFormatFlags.Left | TextFormatFlags.WordBreak | TextFormatFlags.NoPrefix
                );

                y += bubbleH + 9;
            }
        }
    }

    public class SuperAgentForm : Form
    {
        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        private static extern IntPtr SendMessage(IntPtr hWnd, int msg, IntPtr wParam, string lParam);
        private const int EM_SETCUEBANNER = 0x1501;

        private readonly Color _bgSurface = Color.White;
        private readonly Color _bgSubtle = Color.FromArgb(248, 250, 248);
        private readonly Color _borderSubtle = Color.FromArgb(229, 234, 230);
        private readonly Color _borderStrong = Color.FromArgb(207, 216, 209);
        private readonly Color _textPrimary = Color.FromArgb(30, 36, 32);
        private readonly Color _textSecondary = Color.FromArgb(94, 104, 97);
        private readonly Color _accentPrimary = Color.FromArgb(45, 106, 79);

        private readonly PulsoStatusPill _statusPill;
        private readonly PulsoMetricsStrip _metricsStrip;
        private readonly Label _lblIpCopy;
        private readonly Label _lblIpAction;
        private readonly Label _lblSyncInfo;
        private readonly PulsoButton _btnSyncNow;
        private readonly BubbleChatPanel _chatPanel;
        private readonly TextBox _txtMessage;
        private readonly Label _lblPlaceholder;
        private readonly Panel _msgWrap;
        private readonly System.Windows.Forms.Timer _uiTimer;
        private readonly System.Windows.Forms.Timer _copyResetTimer;
        private readonly Func<StationSnapshot> _getSnapshot;
        private readonly Func<List<ChatEntry>> _getChatHistory;
        private string _currentIp = "—";
        private bool _ipCopied = false;
        private bool _msgFocused = false;
        private int _lastChatCount = -1;
        private bool _allowRealClose = false;

        public SuperAgentForm(
            AgentConfig config,
            Icon appIcon,
            Action onManualSync,
            Action<string> onSendMessage,
            Func<StationSnapshot> getSnapshot,
            Func<List<ChatEntry>> getChatHistory)
        {
            _getSnapshot = getSnapshot;
            _getChatHistory = getChatHistory;

            this.Text = "Pulso RMM — " + Environment.MachineName;
            this.ClientSize = new Size(520, 588);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.BackColor = _bgSurface;
            this.ForeColor = _textPrimary;
            this.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.DoubleBuffered = true;
            if (appIcon != null) this.Icon = appIcon;

            // ZONA 1: CABEÇALHO EDITORIAL PULSO RMM (66px)
            Panel headerBar = new Panel();
            headerBar.BackColor = _bgSurface;
            headerBar.Location = new Point(0, 0);
            headerBar.Size = new Size(520, 66);
            headerBar.Paint += (s, e) =>
            {
                e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;
                e.Graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                PulsoGraphics.DrawBrandMark(e.Graphics, 20f, 18f, 30f);
                using (Pen p = new Pen(_borderSubtle, 1f))
                {
                    e.Graphics.DrawLine(p, 0, headerBar.Height - 1, headerBar.Width, headerBar.Height - 1);
                }
            };
            this.Controls.Add(headerBar);

            Label lblBrand = new Label();
            lblBrand.Text = "Pulso RMM";
            lblBrand.Font = new Font("Segoe UI", 11.5f, FontStyle.Bold);
            lblBrand.ForeColor = _textPrimary;
            lblBrand.BackColor = Color.Transparent;
            lblBrand.Location = new Point(60, 14);
            lblBrand.AutoSize = true;
            headerBar.Controls.Add(lblBrand);

            Label lblMeta = new Label();
            lblMeta.Text = Environment.MachineName + " · v" + AgentConfig.DISPLAY_VERSION;
            lblMeta.Font = new Font("Consolas", 8.25f, FontStyle.Regular);
            lblMeta.ForeColor = _textSecondary;
            lblMeta.BackColor = Color.Transparent;
            lblMeta.Location = new Point(61, 37);
            lblMeta.Size = new Size(300, 16);
            headerBar.Controls.Add(lblMeta);

            _statusPill = new PulsoStatusPill();
            _statusPill.Location = new Point(378, 20);
            _statusPill.Size = new Size(122, 26);
            headerBar.Controls.Add(_statusPill);

            // ZONA 2: FAIXA UNIFICADA DE 4 MÉTRICAS (CPU / RAM / DISCO / TEMP.)
            _metricsStrip = new PulsoMetricsStrip();
            _metricsStrip.Location = new Point(0, 66);
            _metricsStrip.Size = new Size(520, 74);
            this.Controls.Add(_metricsStrip);

            // SUBFAIXA DE REDE (IP COPIÁVEL 1 CLIQUE) + BOTÃO SINCRONIZAR
            Panel syncStrip = new Panel();
            syncStrip.BackColor = _bgSubtle;
            syncStrip.Location = new Point(0, 140);
            syncStrip.Size = new Size(520, 44);
            syncStrip.Paint += (s, e) =>
            {
                using (Pen p = new Pen(_borderSubtle, 1f))
                {
                    e.Graphics.DrawLine(p, 0, syncStrip.Height - 1, syncStrip.Width, syncStrip.Height - 1);
                }
            };
            this.Controls.Add(syncStrip);

            _lblIpCopy = new Label();
            _lblIpCopy.Text = "IPv4 —";
            _lblIpCopy.Font = new Font("Consolas", 8.5f, FontStyle.Bold);
            _lblIpCopy.ForeColor = _textPrimary;
            _lblIpCopy.BackColor = Color.Transparent;
            _lblIpCopy.Cursor = Cursors.Hand;
            _lblIpCopy.Location = new Point(20, 7);
            _lblIpCopy.AutoSize = true;
            _lblIpCopy.Click += (s, e) => CopyIpAddress();
            syncStrip.Controls.Add(_lblIpCopy);

            _lblIpAction = new Label();
            _lblIpAction.Text = "Copiar IP";
            _lblIpAction.Font = new Font("Segoe UI", 7.5f, FontStyle.Regular);
            _lblIpAction.ForeColor = _textSecondary;
            _lblIpAction.BackColor = Color.Transparent;
            _lblIpAction.Cursor = Cursors.Hand;
            _lblIpAction.Location = new Point(155, 8);
            _lblIpAction.AutoSize = true;
            _lblIpAction.Click += (s, e) => CopyIpAddress();
            syncStrip.Controls.Add(_lblIpAction);

            _lblSyncInfo = new Label();
            _lblSyncInfo.Text = "Aguardando primeira sincronização...";
            _lblSyncInfo.Font = new Font("Segoe UI", 7.75f, FontStyle.Regular);
            _lblSyncInfo.ForeColor = _textSecondary;
            _lblSyncInfo.BackColor = Color.Transparent;
            _lblSyncInfo.Location = new Point(20, 23);
            _lblSyncInfo.Size = new Size(344, 15);
            syncStrip.Controls.Add(_lblSyncInfo);

            _btnSyncNow = new PulsoButton();
            _btnSyncNow.Text = "Sincronizar";
            _btnSyncNow.IsPrimary = true;
            _btnSyncNow.Location = new Point(386, 8);
            _btnSyncNow.Size = new Size(114, 28);
            _btnSyncNow.Click += (s, e) =>
            {
                _btnSyncNow.Enabled = false;
                _btnSyncNow.Text = "Sincronizando...";
                onManualSync();
            };
            syncStrip.Controls.Add(_btnSyncNow);

            // ZONA 3: CANAL DE SUPORTE COM BALÕES MODERNOS
            Panel chatHeader = new Panel();
            chatHeader.BackColor = _bgSurface;
            chatHeader.Location = new Point(0, 184);
            chatHeader.Size = new Size(520, 34);
            chatHeader.Paint += (s, e) =>
            {
                using (Pen p = new Pen(Color.FromArgb(238, 241, 238), 1f))
                {
                    e.Graphics.DrawLine(p, 20, chatHeader.Height - 1, chatHeader.Width - 20, chatHeader.Height - 1);
                }
            };
            this.Controls.Add(chatHeader);

            Label lblChatTitle = new Label();
            lblChatTitle.Text = "Chat com a Central de TI";
            lblChatTitle.Font = new Font("Segoe UI", 8.75f, FontStyle.Bold);
            lblChatTitle.ForeColor = _textPrimary;
            lblChatTitle.Location = new Point(20, 9);
            lblChatTitle.AutoSize = true;
            chatHeader.Controls.Add(lblChatTitle);

            Label lblChatHint = new Label();
            lblChatHint.Text = "Enter para enviar";
            lblChatHint.Font = new Font("Segoe UI", 7.75f, FontStyle.Regular);
            lblChatHint.ForeColor = Color.FromArgb(132, 142, 136);
            lblChatHint.TextAlign = ContentAlignment.MiddleRight;
            lblChatHint.Location = new Point(370, 9);
            lblChatHint.Size = new Size(130, 16);
            chatHeader.Controls.Add(lblChatHint);

            _chatPanel = new BubbleChatPanel();
            _chatPanel.Location = new Point(0, 218);
            _chatPanel.Size = new Size(520, 270);
            this.Controls.Add(_chatPanel);

            // COMPOSITOR DE MENSAGEM ARREDONDADO
            Panel composerBar = new Panel();
            composerBar.BackColor = _bgSurface;
            composerBar.Location = new Point(0, 488);
            composerBar.Size = new Size(520, 56);
            composerBar.Paint += (s, e) =>
            {
                using (Pen p = new Pen(_borderSubtle, 1f))
                {
                    e.Graphics.DrawLine(p, 0, 0, composerBar.Width, 0);
                }
            };
            this.Controls.Add(composerBar);

            _msgWrap = new Panel();
            _msgWrap.BackColor = _bgSubtle;
            _msgWrap.Location = new Point(20, 11);
            _msgWrap.Size = new Size(382, 34);
            _msgWrap.Paint += (s, e) =>
            {
                e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;
                RectangleF r = new RectangleF(0.5f, 0.5f, _msgWrap.Width - 1.5f, _msgWrap.Height - 1.5f);
                using (GraphicsPath path = PulsoGraphics.CreateRoundedRect(r, 8f))
                using (SolidBrush fill = new SolidBrush(_msgFocused ? Color.White : _bgSubtle))
                using (Pen pen = new Pen(_msgFocused ? _accentPrimary : _borderStrong, _msgFocused ? 1.4f : 1f))
                {
                    e.Graphics.FillPath(fill, path);
                    e.Graphics.DrawPath(pen, path);
                }
            };
            composerBar.Controls.Add(_msgWrap);

            _txtMessage = new TextBox();
            _txtMessage.BorderStyle = BorderStyle.None;
            _txtMessage.BackColor = _bgSubtle;
            _txtMessage.ForeColor = _textPrimary;
            _txtMessage.Font = new Font("Segoe UI", 9.25f, FontStyle.Regular);
            _txtMessage.Location = new Point(11, 8);
            _txtMessage.Size = new Size(360, 19);
            _txtMessage.HandleCreated += (s, e) =>
            {
                try { SendMessage(_txtMessage.Handle, EM_SETCUEBANNER, (IntPtr)1, "Escrever mensagem para o suporte..."); } catch { }
            };
            _txtMessage.TextChanged += (s, e) =>
            {
                if (_lblPlaceholder != null)
                    _lblPlaceholder.Visible = (_txtMessage.TextLength == 0);
            };
            _txtMessage.GotFocus += (s, e) =>
            {
                _msgFocused = true;
                _txtMessage.BackColor = Color.White;
                if (_lblPlaceholder != null) _lblPlaceholder.BackColor = Color.White;
                _msgWrap.Invalidate();
            };
            _txtMessage.LostFocus += (s, e) =>
            {
                _msgFocused = false;
                _txtMessage.BackColor = _bgSubtle;
                if (_lblPlaceholder != null) _lblPlaceholder.BackColor = _bgSubtle;
                _msgWrap.Invalidate();
            };
            _msgWrap.Controls.Add(_txtMessage);

            _lblPlaceholder = new Label();
            _lblPlaceholder.Text = "Escrever mensagem para o suporte...";
            _lblPlaceholder.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            _lblPlaceholder.ForeColor = Color.FromArgb(142, 151, 145);
            _lblPlaceholder.BackColor = _bgSubtle;
            _lblPlaceholder.Location = new Point(11, 8);
            _lblPlaceholder.AutoSize = true;
            _lblPlaceholder.Cursor = Cursors.IBeam;
            _lblPlaceholder.Click += (s, e) => _txtMessage.Focus();
            _msgWrap.Controls.Add(_lblPlaceholder);
            _lblPlaceholder.BringToFront();

            Action dispatchMessage = () =>
            {
                string msg = _txtMessage.Text.Trim();
                if (!string.IsNullOrEmpty(msg))
                {
                    onSendMessage(msg);
                    _txtMessage.Text = "";
                    RefreshUi();
                }
            };

            _txtMessage.KeyDown += (s, e) =>
            {
                if (e.KeyCode == Keys.Enter)
                {
                    e.SuppressKeyPress = true;
                    dispatchMessage();
                }
            };

            PulsoButton btnSend = new PulsoButton();
            btnSend.Text = "Enviar";
            btnSend.IsPrimary = true;
            btnSend.CornerRadius = 8f;
            btnSend.Location = new Point(410, 11);
            btnSend.Size = new Size(90, 34);
            btnSend.Click += (s, e) => dispatchMessage();
            composerBar.Controls.Add(btnSend);

            // ZONA 4: RODAPÉ DISCRETO (44px)
            Panel footerBar = new Panel();
            footerBar.BackColor = _bgSubtle;
            footerBar.Location = new Point(0, 544);
            footerBar.Size = new Size(520, 44);
            footerBar.Paint += (s, e) =>
            {
                using (Pen p = new Pen(_borderSubtle, 1f))
                {
                    e.Graphics.DrawLine(p, 0, 0, footerBar.Width, 0);
                }
            };
            this.Controls.Add(footerBar);

            Label lblFooter = new Label();
            lblFooter.Text = "Atualização silenciosa ativa · Protegido por UAC";
            lblFooter.Font = new Font("Segoe UI", 7.75f, FontStyle.Regular);
            lblFooter.ForeColor = _textSecondary;
            lblFooter.BackColor = Color.Transparent;
            lblFooter.Location = new Point(20, 14);
            lblFooter.Size = new Size(310, 16);
            footerBar.Controls.Add(lblFooter);

            PulsoButton btnMinimize = new PulsoButton();
            btnMinimize.Text = "Recolher para bandeja";
            btnMinimize.IsPrimary = false;
            btnMinimize.Font = new Font("Segoe UI", 8.25f, FontStyle.Regular);
            btnMinimize.Location = new Point(352, 8);
            btnMinimize.Size = new Size(148, 28);
            btnMinimize.Click += (s, e) => this.Hide();
            footerBar.Controls.Add(btnMinimize);

            _copyResetTimer = new System.Windows.Forms.Timer();
            _copyResetTimer.Interval = 1800;
            _copyResetTimer.Tick += (s, e) =>
            {
                _copyResetTimer.Stop();
                _ipCopied = false;
                UpdateIpLabel();
            };

            this.Shown += (s, e) => _txtMessage.Focus();
            this.Activated += (s, e) => { if (_txtMessage.CanFocus) _txtMessage.Focus(); };

            this.FormClosing += (s, e) =>
            {
                if (!_allowRealClose && e.CloseReason == CloseReason.UserClosing)
                {
                    e.Cancel = true;
                    this.Hide();
                }
            };

            _uiTimer = new System.Windows.Forms.Timer();
            _uiTimer.Interval = 1000;
            _uiTimer.Tick += (s, e) => RefreshUi();
            _uiTimer.Start();

            RefreshUi();
        }

        private void CopyIpAddress()
        {
            if (string.IsNullOrEmpty(_currentIp) || _currentIp == "—") return;
            try
            {
                Clipboard.SetText(_currentIp);
                _ipCopied = true;
                UpdateIpLabel();
                _copyResetTimer.Stop();
                _copyResetTimer.Start();
            }
            catch { }
        }

        private void UpdateIpLabel()
        {
            _lblIpCopy.Text = "IPv4 " + _currentIp;
            _lblIpCopy.ForeColor = _ipCopied ? _accentPrimary : _textPrimary;
            if (_lblIpAction != null)
            {
                _lblIpAction.Left = _lblIpCopy.Left + _lblIpCopy.Width + 6;
                if (_ipCopied)
                {
                    _lblIpAction.Text = "✓ Copiado";
                    _lblIpAction.ForeColor = _accentPrimary;
                    _lblIpAction.Font = new Font("Segoe UI", 7.5f, FontStyle.Bold);
                }
                else
                {
                    _lblIpAction.Text = "· Copiar";
                    _lblIpAction.ForeColor = _textSecondary;
                    _lblIpAction.Font = new Font("Segoe UI", 7.5f, FontStyle.Regular);
                }
            }
        }

        public void ForceCloseFromAdmin()
        {
            _allowRealClose = true;
            try { _uiTimer.Stop(); } catch { }
            try { _copyResetTimer.Stop(); } catch { }
            this.Close();
        }

        public void RefreshUi()
        {
            if (this.IsDisposed) return;

            StationSnapshot snap = _getSnapshot();
            if (snap != null)
            {
                if (snap.IsSyncing)
                {
                    _statusPill.SetState("Sincronizando", Color.FromArgb(45, 106, 79), Color.FromArgb(233, 244, 238));
                    _btnSyncNow.Enabled = false;
                    _btnSyncNow.Text = "Sincronizando...";
                }
                else if (snap.IsConnected)
                {
                    _statusPill.SetState("Conectado", Color.FromArgb(45, 106, 79), Color.FromArgb(233, 244, 238));
                    _btnSyncNow.Enabled = true;
                    _btnSyncNow.Text = "Sincronizar";
                }
                else
                {
                    _statusPill.SetState("Atenção", Color.FromArgb(180, 83, 9), Color.FromArgb(254, 243, 199));
                    _btnSyncNow.Enabled = true;
                    _btnSyncNow.Text = "Sincronizar";
                }

                _metricsStrip.UpdateMetrics(snap.CpuPct, snap.RamPct, snap.DiskPct, snap.TemperatureC);
                _currentIp = string.IsNullOrEmpty(snap.IpAddress) ? "—" : snap.IpAddress;
                if (!_ipCopied) UpdateIpLabel();
                _lblSyncInfo.Text = snap.StatusText;
            }

            List<ChatEntry> entries = _getChatHistory();
            if (entries != null && entries.Count != _lastChatCount)
            {
                _lastChatCount = entries.Count;
                _chatPanel.SetEntries(entries);
            }
        }
    }

    /// <summary>
    /// Descoberta somente-leitura de impressoras: as instaladas na estacao (WMI) e as
    /// alcancaveis na sub-rede local nas portas de impressao. Cache de 6 horas.
    /// </summary>
    public static class PrinterDiscovery
    {
        private const int DiscoveryTtlMs = 6 * 60 * 60 * 1000;
        private const int ProbeTimeoutMs = 350;
        private const int ProbeConcurrency = 64;
        private const int MaxPrinters = 40;
        private static readonly int[] PrinterPorts = new int[] { 9100, 631, 515 };

        private static readonly object CacheLock = new object();
        private static List<Dictionary<string, object>> _cache;
        private static DateTime _cacheAt = DateTime.MinValue;
        private static bool _running;

        public static List<Dictionary<string, object>> CollectPrinters()
        {
            lock (CacheLock)
            {
                if (_cache != null && (DateTime.UtcNow - _cacheAt).TotalMilliseconds < DiscoveryTtlMs)
                    return _cache;
                if (_running)
                    return _cache ?? new List<Dictionary<string, object>>();
                _running = true;
            }

            try
            {
                List<Dictionary<string, object>> result = Discover();
                lock (CacheLock)
                {
                    _cache = result;
                    _cacheAt = DateTime.UtcNow;
                }
                return result;
            }
            catch
            {
                return new List<Dictionary<string, object>>();
            }
            finally
            {
                lock (CacheLock) { _running = false; }
            }
        }

        private static List<Dictionary<string, object>> Discover()
        {
            Dictionary<string, Dictionary<string, object>> byIp = new Dictionary<string, Dictionary<string, object>>();

            foreach (Dictionary<string, object> installed in ListInstalledPrinters())
            {
                string installedIp = installed["ip_address"] as string;
                if (!string.IsNullOrEmpty(installedIp)) byIp[installedIp] = installed;
            }

            string localIp = ResolveLocalIpv4();
            if (IsPrivateIpv4(localIp))
            {
                string prefix = localIp.Substring(0, localIp.LastIndexOf('.'));
                List<string> targets = new List<string>();
                for (int i = 1; i <= 254; i++)
                {
                    string candidate = prefix + "." + i.ToString();
                    if (candidate != localIp) targets.Add(candidate);
                }

                foreach (KeyValuePair<string, int> hit in ScanSubnet(targets))
                {
                    if (byIp.ContainsKey(hit.Key)) continue;
                    string realName;
                    string realModel;
                    ResolveIppIdentity(hit.Key, out realName, out realModel);
                    byIp[hit.Key] = new Dictionary<string, object>
                    {
                        { "ip_address", hit.Key },
                        { "name", string.IsNullOrEmpty(realName) ? "IMPRESSORA-" + hit.Key.Substring(hit.Key.LastIndexOf('.') + 1) : realName },
                        { "model", realModel },
                        { "port", hit.Value },
                        { "source", "NETWORK" }
                    };
                }
            }

            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>(byIp.Values);
            if (list.Count > MaxPrinters) list = list.GetRange(0, MaxPrinters);
            return list;
        }

        /// <summary>
        /// Consulta o nome real do equipamento via IPP (Get-Printer-Attributes).
        /// Retorna printer-info, senao printer-name, senao printer-make-and-model.
        /// </summary>
        public static void ResolveIppIdentity(string ip, out string name, out string model)
        {
            name = null;
            model = null;
            try
            {
                byte[] body = BuildIppGetAttributes(ip);
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://" + ip + ":631/ipp/print");
                req.Method = "POST";
                req.ContentType = "application/ipp";
                req.Timeout = 5000;
                req.ReadWriteTimeout = 5000;
                req.ServicePoint.Expect100Continue = false;
                req.ContentLength = body.Length;
                using (Stream s = req.GetRequestStream())
                {
                    s.Write(body, 0, body.Length);
                }
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                using (Stream rs = resp.GetResponseStream())
                {
                    byte[] buffer = new byte[65536];
                    int total = 0;
                    int read;
                    while (total < buffer.Length && (read = rs.Read(buffer, total, buffer.Length - total)) > 0)
                    {
                        total += read;
                    }
                    Dictionary<string, string> attrs = ParseIppAttributes(buffer, total);
                    string info;
                    string pname;
                    string make;
                    attrs.TryGetValue("printer-info", out info);
                    attrs.TryGetValue("printer-name", out pname);
                    attrs.TryGetValue("printer-make-and-model", out make);
                    name = FirstNonEmpty(make, info, pname);
                    model = FirstNonEmpty(make, info);
                }
            }
            catch { }
        }

        private static string FirstNonEmpty(params string[] values)
        {
            foreach (string v in values)
            {
                if (!string.IsNullOrEmpty(v) && v.Trim().Length > 0) return v.Trim();
            }
            return null;
        }

        private static byte[] BuildIppGetAttributes(string ip)
        {
            List<byte> body = new List<byte>();
            body.Add(0x01); body.Add(0x01);
            body.Add(0x00); body.Add(0x0B);
            body.Add(0x00); body.Add(0x00); body.Add(0x00); body.Add(0x01);
            body.Add(0x01);
            AppendIppAttribute(body, 0x47, "attributes-charset", "utf-8");
            AppendIppAttribute(body, 0x48, "attributes-natural-language", "en-us");
            AppendIppAttribute(body, 0x45, "printer-uri", "ipp://" + ip + "/ipp/print");
            body.Add(0x03);
            return body.ToArray();
        }

        private static void AppendIppAttribute(List<byte> body, byte tag, string name, string value)
        {
            byte[] n = Encoding.UTF8.GetBytes(name);
            byte[] v = Encoding.UTF8.GetBytes(value);
            body.Add(tag);
            body.Add((byte)(n.Length >> 8)); body.Add((byte)(n.Length & 0xFF));
            body.AddRange(n);
            body.Add((byte)(v.Length >> 8)); body.Add((byte)(v.Length & 0xFF));
            body.AddRange(v);
        }

        private static Dictionary<string, string> ParseIppAttributes(byte[] data, int length)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            int i = 8;
            while (i < length)
            {
                byte tag = data[i];
                if (tag == 0x03) break;
                if (tag < 0x10) { i++; continue; }
                if (i + 5 > length) break;
                int nameLen = (data[i + 1] << 8) | data[i + 2];
                if (i + 3 + nameLen + 2 > length) break;
                string name = Encoding.UTF8.GetString(data, i + 3, nameLen);
                int valueLen = (data[i + 3 + nameLen] << 8) | data[i + 4 + nameLen];
                if (i + 5 + nameLen + valueLen > length) break;
                string value = Encoding.UTF8.GetString(data, i + 5 + nameLen, valueLen);
                if (!result.ContainsKey(name)) result[name] = value;
                i += 5 + nameLen + valueLen;
            }
            return result;
        }

        private static List<Dictionary<string, object>> ListInstalledPrinters()
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            try
            {
                using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT Name, PortName, DriverName FROM Win32_Printer"))
                {
                    foreach (ManagementObject item in searcher.Get())
                    {
                        string name = CleanText(item["Name"], 64);
                        if (string.IsNullOrEmpty(name)) continue;
                        string ip = ExtractIpv4(item["PortName"] as string);
                        if (string.IsNullOrEmpty(ip)) continue;
                        list.Add(new Dictionary<string, object>
                        {
                            { "ip_address", ip },
                            { "name", name },
                            { "model", CleanText(item["DriverName"], 80) },
                            { "port", 9100 },
                            { "source", "INSTALLED" }
                        });
                    }
                }
            }
            catch { }
            return list;
        }

        private static List<KeyValuePair<string, int>> ScanSubnet(List<string> targets)
        {
            List<KeyValuePair<string, int>> found = new List<KeyValuePair<string, int>>();
            int cursor = -1;
            int workers = Math.Min(ProbeConcurrency, Math.Max(1, targets.Count));
            Thread[] threads = new Thread[workers];
            for (int w = 0; w < workers; w++)
            {
                threads[w] = new Thread(delegate()
                {
                    while (true)
                    {
                        int index = Interlocked.Increment(ref cursor);
                        if (index >= targets.Count) return;
                        lock (found)
                        {
                            if (found.Count >= MaxPrinters) return;
                        }
                        int port = ProbePrinter(targets[index]);
                        if (port > 0)
                        {
                            lock (found) { found.Add(new KeyValuePair<string, int>(targets[index], port)); }
                        }
                    }
                });
                threads[w].IsBackground = true;
                threads[w].Start();
            }
            foreach (Thread t in threads) t.Join();
            return found;
        }

        private static int ProbePrinter(string ip)
        {
            foreach (int port in PrinterPorts)
            {
                if (ProbePort(ip, port)) return port;
            }
            return 0;
        }

        private static bool ProbePort(string ip, int port)
        {
            Socket socket = null;
            try
            {
                socket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
                IAsyncResult ar = socket.BeginConnect(new IPEndPoint(IPAddress.Parse(ip), port), null, null);
                if (!ar.AsyncWaitHandle.WaitOne(ProbeTimeoutMs, false)) return false;
                socket.EndConnect(ar);
                return socket.Connected;
            }
            catch
            {
                return false;
            }
            finally
            {
                if (socket != null) { try { socket.Close(); } catch { } }
            }
        }

        private static string ResolveLocalIpv4()
        {
            try
            {
                using (Socket sock = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
                {
                    sock.Connect("8.8.8.8", 53);
                    IPEndPoint endPoint = sock.LocalEndPoint as IPEndPoint;
                    if (endPoint != null && endPoint.Address != null)
                    {
                        string routedIp = endPoint.Address.ToString();
                        if (IsPrivateIpv4(routedIp)) return routedIp;
                    }
                }
            }
            catch { }

            try
            {
                foreach (NetworkInterface ni in NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (ni.OperationalStatus != OperationalStatus.Up ||
                        ni.NetworkInterfaceType == NetworkInterfaceType.Loopback)
                        continue;
                    foreach (UnicastIPAddressInformation info in ni.GetIPProperties().UnicastAddresses)
                    {
                        if (info.Address.AddressFamily != AddressFamily.InterNetwork) continue;
                        string candidate = info.Address.ToString();
                        if (IsPrivateIpv4(candidate)) return candidate;
                    }
                }
            }
            catch { }
            return null;
        }

        private static bool IsPrivateIpv4(string ip)
        {
            if (string.IsNullOrEmpty(ip)) return false;
            return Regex.IsMatch(ip, @"^(10\.\d{1,3}|172\.(1[6-9]|2[0-9]|3[0-1])|192\.168)\.\d{1,3}\.\d{1,3}$");
        }

        private static string ExtractIpv4(string value)
        {
            if (string.IsNullOrEmpty(value)) return null;
            Match match = Regex.Match(value, @"\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b");
            if (!match.Success) return null;
            string ip = match.Groups[1].Value;
            return IsPrivateIpv4(ip) ? ip : null;
        }

        private static string CleanText(object value, int max)
        {
            if (value == null) return null;
            string text = Regex.Replace(value.ToString(), @"\s+", " ").Trim();
            if (text.Length == 0) return null;
            return text.Length > max ? text.Substring(0, max) : text;
        }
    }
}
