import{r as o,u as le,f as x,j as e,e as ce,I as ue,l as K,o as pe,g as n}from"./index-5Nqhhqz7.js";const he=n.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({theme:t})=>t.colors.textPrimary};
`,xe=n.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h1 {
    font-size: 1.32rem;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    font-size: 0.82rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 3px;
  }
`,V=n.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 13px;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid ${({theme:t})=>t.colors.borderStrong};
  background: ${({theme:t})=>t.colors.bgSurface};
  color: ${({theme:t})=>t.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
  }
`,me=n.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,W=n.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 9px 2px 11px;
  font-size: 0.84rem;
  font-weight: ${({$active:t})=>t?700:500};
  color: ${({$active:t,theme:a})=>t?a.colors.textPrimary:a.colors.textSecondary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({$active:t,theme:a})=>t?a.colors.brandPrimary:"transparent"};
    border-radius: 2px 2px 0 0;
  }

  .t-badge {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$active:t})=>t?"rgba(45, 106, 79, 0.12)":"rgba(30, 36, 32, 0.06)"};
    color: ${({$active:t,theme:a})=>t?a.colors.brandPrimary:a.colors.textSecondary};
  }
`,be=n.section`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,C=n.div`
  padding: 14px 18px;
  border-right: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:last-child {
    border-right: none;
  }

  .k-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .k-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({$color:t})=>t};
  }

  .k-val {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
  }
`,Y=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .search-box {
    position: relative;
    flex: 1;
    min-width: 240px;
    display: flex;
    align-items: center;
    color: ${({theme:t})=>t.colors.textMuted};
  }

  .search-ico {
    position: absolute;
    left: 10px;
    pointer-events: none;
    display: inline-flex;
  }

  input,
  select {
    height: 34px;
    border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    border-radius: ${({theme:t})=>t.radius.sm};
    background: ${({theme:t})=>t.colors.bgSurface};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.78rem;
    padding: 0 10px;

    &:focus {
      outline: none;
      border-color: ${({theme:t})=>t.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.1);
    }
  }

  input {
    width: 100%;
    padding-left: 32px;
  }
`,ge=n.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.sm};
  padding: 3px;
`,fe=n.button`
  height: 26px;
  padding: 0 10px;
  border-radius: 5px;
  border: none;
  background: ${({$active:t,theme:a})=>t?a.colors.brandPrimarySubtle:"transparent"};
  color: ${({$active:t,theme:a})=>t?a.colors.brandPrimary:a.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({$active:t})=>t?700:500};
  cursor: pointer;

  &:hover {
    color: ${({theme:t})=>t.colors.textPrimary};
  }
`,q=n.div`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  overflow: hidden;
`,J=n.div`
  width: 100%;
  overflow-x: auto;
`,Q=n.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.79rem;

  thead th {
    text-align: left;
    padding: 10px 14px;
    font-size: 0.69rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${({theme:t})=>t.colors.textSecondary};
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    white-space: nowrap;
  }

  tbody td {
    padding: 11px 14px;
    border-bottom: 1px solid rgba(30, 36, 32, 0.06);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #f9faf8;
  }

  .mono {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.73rem;
  }

  .sub {
    font-size: 0.71rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 2px;
  }
`,O=n.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({$bg:t})=>t};
  color: ${({$color:t})=>t};
`,Ee=n.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 27px;
  padding: 0 9px;
  border-radius: 5px;
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
  color: ${({theme:t})=>t.colors.brandPrimary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({theme:t})=>t.colors.brandPrimarySubtle};
    border-color: rgba(45, 106, 79, 0.3);
  }
`,k=n.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-size: 0.82rem;
`;function U(t){if(!t)return"—";const a=new Date(t);return Number.isNaN(a.getTime())?"—":a.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}const w={AUTH_LOGIN_SUCCESS:"Login realizado",AUTH_LOGIN_FAILED:"Tentativa de login negada",AUTH_LOGOUT:"Logout realizado",AUTH_PASSWORD_CHANGED:"Senha própria alterada",AUTH_PASSWORD_CHANGE_FAILED:"Falha na troca de senha",USER_CREATED:"Usuário criado",USER_UPDATED:"Usuário editado",USER_PASSWORD_RESET:"Senha redefinida (Admin)",USER_DELETED:"Usuário excluído",REMOTE_TASK_DISPATCHED:"Ação remota enviada",REMOTE_TASK_RESULT:"Retorno de ação remota",REMOTE_TASK_DISPATCH_ERROR:"Erro ao despachar ação",MANUAL_TELEMETRY_REFRESH:"Coleta manual de telemetria",AGENT_OTA_UPDATE_REQUESTED:"Atualização OTA enviada",AGENT_OTA_UPDATE_ALL_REQUESTED:"Atualização OTA global",AGENT_INSTALLER_DOWNLOADED:"Instalador baixado",AGENT_AUTO_ENROLLED:"Estação cadastrada",AGENT_REBOUND:"Reassociação de hardware",AGENT_REVOKED:"Agente revogado",AGENT_UNREVOKED:"Agente reativado",AGENT_DISCONNECTED:"Agente desconectado",AGENT_AUTH_FAILED:"Auth de agente recusada",AGENT_MESSAGE_SENT:"Mensagem enviada (TI)",AGENT_MESSAGE_RECEIVED:"Mensagem recebida (PC)",MACHINE_RELOCATED:"Estação movida",MACHINE_DELETED:"Estação removida",UNIT_CREATED:"Unidade criada",UNIT_UPDATED:"Unidade editada",UNIT_DELETED:"Unidade excluída",SECTOR_CREATED:"Setor criado",SECTOR_UPDATED:"Setor editado",SECTOR_DELETED:"Setor excluído",SECURITY_BLOCKED_ARBITRARY_COMMAND:"Comando livre bloqueado",SECURITY_BLOCKED_UNKNOWN_TASK:"Tarefa desconhecida bloqueada",SECURITY_BLOCKED_INSUFFICIENT_ROLE:"Ação bloqueada (RBAC)",SECURITY_BLOCKED_TASK_RESULT_SPOOF:"Spoof de tarefa bloqueado",SECURITY_BLOCKED_ACTIVE_AGENT_REBIND:"Rebind ativo bloqueado",HARDWARE_KEY_CONFLICT:"Conflito de hardware"};function X(t){let a=String(t??"").replace(/\r?\n/g," ").trim();return/^[=+\-@\t\r]/.test(a)&&(a=`'${a}`),`"${a.replace(/"/g,'""')}"`}function Z(t=""){const a=String(t).toUpperCase();return a.startsWith("SECURITY_")||a.includes("FAILED")||a.includes("REVOKED")||a.includes("CONFLICT")||a.includes("ERROR")?{category:"SECURITY",color:"#C81E1E",bg:"rgba(200, 30, 30, 0.10)"}:a.startsWith("REMOTE_TASK")||a.startsWith("AGENT_OTA")||a==="MANUAL_TELEMETRY_REFRESH"||a.startsWith("AGENT_MESSAGE")?{category:"TASKS",color:"#B45309",bg:"rgba(180, 83, 9, 0.11)"}:a.startsWith("USER_")||a.startsWith("AUTH_")?{category:"USERS",color:"#2D6A4F",bg:"rgba(45, 106, 79, 0.11)"}:{category:"INFRA",color:"#475569",bg:"rgba(100, 116, 139, 0.11)"}}function F(t){if(!t)return"—";let a=t;if(typeof t=="string")try{a=JSON.parse(t)}catch{return t.slice(0,160)}if(typeof a!="object"||a===null)return String(a);if(a.task_title&&a.output_summary)return`${a.task_title} (${a.status||"OK"}): ${String(a.output_summary).slice(0,160)}`;if(a.task_title&&a.task_code)return`${a.task_title} (${a.task_code}) · ${a.task_id||""}`.replace(/\s*·\s*$/,"");const h=Object.entries(a).filter(([,p])=>p!=null&&p!=="").slice(0,5).map(([p,m])=>{const b=typeof m=="object"?JSON.stringify(m):String(m);return`${p}: ${b}`});return h.length>0?h.join(" · "):"—"}function Ae({token:t,units:a=[],allMachines:h=[],alerts:p=[],currentUser:m,latestAuditEvent:b=null,onOpenMachineInMap:L,onRefreshFleet:R}){const u=(m==null?void 0:m.role)==="ADMIN_N2",[f,P]=o.useState("ALERTS"),[$,ee]=o.useState(""),[A,te]=o.useState("ALL"),[j,re]=o.useState("ALL"),[T,ae]=o.useState("ALL"),[y,z]=o.useState([]),[ie,B]=o.useState(!1),[G,H]=o.useState(""),[D,se]=o.useState(""),[v,oe]=o.useState("ALL"),E=o.useCallback(async({silent:r=!1}={})=>{if(!(!t||!u)){r||B(!0),H("");try{const i=await le.getAuditLogs(t);z(i.logs||[])}catch(i){H((i==null?void 0:i.message)||"Não foi possível carregar a trilha de auditoria.")}finally{r||B(!1)}}},[t,u]);o.useEffect(()=>{u&&E()},[u,E]),o.useEffect(()=>{if(!u||f!=="AUDIT")return;E({silent:y.length>0});const r=setInterval(()=>{E({silent:!0})},1e4);return()=>clearInterval(r)},[u,f,E]),o.useEffect(()=>{!u||!b||!b.id||z(r=>r.some(i=>Number(i.id)===Number(b.id))?r:[b,...r].slice(0,250))},[u,b]);const N=o.useMemo(()=>{const r=Date.now();return[...h.map(s=>{const l=s.health_status==="OFFLINE",c=s.last_seen_at?Math.max(0,Math.floor((r-new Date(s.last_seen_at).getTime())/1e3)):0,g=Math.max(0,Math.floor(Number(s.idle_seconds||0))),d=l?c:g;return d<86400||p.some(I=>Number(I.machine_id)===Number(s.id)&&I.metric_name==="INACTIVITY_24H"&&I.status!=="RESOLVED")?null:{id:`live-inact-${s.id}`,machine_id:s.id,unit_id:s.unit_id,hostname:s.hostname,unit_name:s.unit_name||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"OPEN",message:l?`Estação sem comunicação há mais de 24h (${Math.floor(d/3600)}h).`:`Estação ligada sem interação há mais de 24h (${Math.floor(d/3600)}h).`,created_at:s.last_seen_at||new Date().toISOString()}}).filter(Boolean),...p]},[h,p]),_=o.useMemo(()=>{let r=0,i=0,s=0,l=0;for(const c of N)c.status==="RESOLVED"?l+=1:(r+=1,c.severity==="CRITICAL"&&(i+=1),c.metric_name==="INACTIVITY_24H"&&(s+=1));return{open:r,critical:i,inactivity:s,resolved:l}},[N]),M=o.useMemo(()=>{const r=$.trim().toLowerCase();return N.filter(i=>{if(A!=="ALL"&&i.severity!==A||j==="OPEN"&&i.status==="RESOLVED"||j==="RESOLVED"&&i.status!=="RESOLVED")return!1;if(T!=="ALL"){const s=h.find(c=>Number(c.id)===Number(i.machine_id)),l=i.unit_id||(s==null?void 0:s.unit_id);if(Number(l)!==Number(T))return!1}return!(r&&![i.hostname,i.unit_name,i.message,i.metric_name,i.status].map(l=>x(String(l||"")).toLowerCase()).join(" ").includes(r))})},[N,A,j,T,$,h]),S=o.useMemo(()=>{const r=D.trim().toLowerCase();return y.filter(i=>{const s=Z(i.action_type);return!(v!=="ALL"&&s.category!==v||r&&![i.action_type,w[i.action_type]||"",i.user_name,i.user_email,i.machine_hostname,i.ip_address,F(i.details_json)].map(c=>x(String(c||"")).toLowerCase()).join(" ").includes(r))})},[y,v,D]);function ne(){const r=["Data/Hora","Evento","Codigo","Operador","Email","Estacao","IP","Detalhes"],i=S.map(d=>[U(d.created_at),w[d.action_type]||d.action_type,d.action_type,x(d.user_name||"Sistema / Agente"),d.user_email||"",d.machine_hostname||"",d.ip_address||"",F(d.details_json)]),s=[r.map(X).join(";"),...i.map(d=>d.map(X).join(";"))],l=new Blob([`\uFEFF${s.join(`\r
`)}`],{type:"text/csv;charset=utf-8;"}),c=window.URL.createObjectURL(l),g=document.createElement("a");g.href=c,g.download=`pulso-rmm-auditoria-${new Date().toISOString().slice(0,10)}.csv`,document.body.appendChild(g),g.click(),g.remove(),setTimeout(()=>window.URL.revokeObjectURL(c),4e3)}function de(r){const i=h.find(s=>Number(s.id)===Number(r.machine_id));i&&(L==null||L(i))}return e.jsxs(he,{children:[e.jsxs(xe,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:"Monitoramento e auditoria"}),e.jsx("p",{children:"Acompanhamento de incidentes da frota e trilha auditável de ações remotas, acessos e segurança."})]}),e.jsxs("div",{style:{display:"inline-flex",gap:8,alignItems:"center"},children:[f==="AUDIT"&&u&&e.jsxs(V,{type:"button",onClick:ne,disabled:S.length===0,title:"Exportar trilha de auditoria filtrada em CSV",children:[e.jsx(ce,{size:14}),e.jsxs("span",{children:["Exportar CSV (",S.length,")"]})]}),e.jsxs(V,{type:"button",onClick:()=>{R==null||R(),u&&E()},children:[e.jsx(ue,{size:14}),e.jsx("span",{children:"Atualizar"})]})]})]}),e.jsxs(me,{children:[e.jsxs(W,{type:"button",$active:f==="ALERTS",onClick:()=>P("ALERTS"),children:[e.jsx("span",{children:"Alertas da frota"}),e.jsx("span",{className:"t-badge",children:_.open})]}),u&&e.jsxs(W,{type:"button",$active:f==="AUDIT",onClick:()=>P("AUDIT"),children:[e.jsx("span",{children:"Trilha de auditoria"}),e.jsx("span",{className:"t-badge",children:y.length})]})]}),f==="ALERTS"?e.jsxs(e.Fragment,{children:[e.jsxs(be,{children:[e.jsxs(C,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Alertas ativos"]}),e.jsx("span",{className:"k-val",children:_.open})]}),e.jsxs(C,{$color:"#C81E1E",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Críticos abertos"]}),e.jsx("span",{className:"k-val",children:_.critical})]}),e.jsxs(C,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Inatividade >24h"]}),e.jsx("span",{className:"k-val",children:_.inactivity})]}),e.jsxs(C,{$color:"#2D6A4F",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Resolvidos"]}),e.jsx("span",{className:"k-val",children:_.resolved})]})]}),e.jsxs(Y,{children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(K,{size:14})}),e.jsx("input",{type:"text","aria-label":"Filtrar alertas",placeholder:"Buscar estação, unidade, métrica ou mensagem...",value:$,onChange:r=>ee(r.target.value)})]}),e.jsxs("select",{"aria-label":"Filtrar por severidade",value:A,onChange:r=>te(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas severidades"}),e.jsx("option",{value:"CRITICAL",children:"Crítico"}),e.jsx("option",{value:"WARNING",children:"Atenção"})]}),e.jsxs("select",{"aria-label":"Filtrar por situação",value:j,onChange:r=>re(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas situações"}),e.jsx("option",{value:"OPEN",children:"Abertos"}),e.jsx("option",{value:"RESOLVED",children:"Resolvidos"})]}),e.jsxs("select",{"aria-label":"Filtrar alertas por unidade",value:T,onChange:r=>ae(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas as unidades"}),a.map(r=>e.jsx("option",{value:String(r.id),children:x(r.name)},r.id))]})]}),e.jsx(q,{children:e.jsx(J,{children:M.length===0?e.jsx(k,{children:"Nenhum alerta encontrado para os filtros selecionados."}):e.jsxs(Q,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Severidade"}),e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"Ocorrência"}),e.jsx("th",{children:"Situação"}),e.jsx("th",{children:"Registro"}),e.jsx("th",{children:"Ação"})]})}),e.jsx("tbody",{children:M.map(r=>{const i=r.severity==="CRITICAL",s=r.status==="RESOLVED";return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(O,{$bg:i?"rgba(200,30,30,0.10)":"rgba(180,83,9,0.11)",$color:i?"#C81E1E":"#B45309",children:i?"Crítico":"Atenção"})}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:700},children:x(r.hostname||`PC #${r.machine_id}`)}),e.jsx("div",{className:"sub",children:x(r.unit_name||"—")})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:500},children:x(r.message)}),e.jsxs("div",{className:"sub mono",children:[r.metric_name||"TELEMETRY",r.external_ticket_id?` · Chamado #${r.external_ticket_id}`:""]})]}),e.jsx("td",{children:e.jsx(O,{$bg:s?"rgba(45,106,79,0.10)":"rgba(180,83,9,0.11)",$color:s?"#2D6A4F":"#B45309",children:s?"Resolvido":r.metric_name==="INACTIVITY_24H"?"Inativo >24h":r.status||"Aberto"})}),e.jsx("td",{className:"mono",children:U(r.triggered_at||r.created_at)}),e.jsx("td",{children:r.machine_id?e.jsxs(Ee,{type:"button",onClick:()=>de(r),title:"Abrir estação afetada no mapa",children:[e.jsx(pe,{size:12}),e.jsx("span",{children:"Abrir no mapa"})]}):"—"})]},r.id||r.incident_key)})})]})})})]}):e.jsxs(e.Fragment,{children:[e.jsxs(Y,{children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(K,{size:14})}),e.jsx("input",{type:"text","aria-label":"Buscar na trilha de auditoria",placeholder:"Buscar evento, operador, estação, IP ou detalhes...",value:D,onChange:r=>se(r.target.value)})]}),e.jsx(ge,{role:"tablist","aria-label":"Filtrar categoria de auditoria",children:[{key:"ALL",label:"Todos"},{key:"SECURITY",label:"Segurança"},{key:"TASKS",label:"Tarefas remotas"},{key:"USERS",label:"Usuários"},{key:"INFRA",label:"Infraestrutura"}].map(r=>e.jsx(fe,{type:"button",$active:v===r.key,onClick:()=>oe(r.key),children:r.label},r.key))})]}),G&&e.jsx("div",{style:{padding:"10px 14px",borderRadius:8,background:"#FEF2F2",border:"1px solid #FECACA",color:"#991B1B",fontSize:"0.8rem",fontWeight:600},children:G}),e.jsx(q,{children:e.jsx(J,{children:ie?e.jsx(k,{children:"Carregando trilha de auditoria..."}):S.length===0?e.jsx(k,{children:"Nenhum evento de auditoria corresponde ao filtro."}):e.jsxs(Q,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Data / Hora"}),e.jsx("th",{children:"Evento"}),e.jsx("th",{children:"Operador"}),e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"IP"}),e.jsx("th",{children:"Detalhes"})]})}),e.jsx("tbody",{children:S.map(r=>{const i=Z(r.action_type),s=w[r.action_type];return e.jsxs("tr",{children:[e.jsx("td",{className:"mono",children:U(r.created_at)}),e.jsxs("td",{children:[e.jsx(O,{$bg:i.bg,$color:i.color,children:e.jsx("span",{children:s||r.action_type})}),s&&e.jsx("div",{className:"sub mono",style:{fontSize:"0.66rem"},children:r.action_type})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600},children:x(r.user_name||"Sistema / Agente")}),r.user_email&&e.jsx("div",{className:"sub",children:r.user_email})]}),e.jsx("td",{className:"mono",children:r.machine_hostname||"—"}),e.jsx("td",{className:"mono",children:r.ip_address||"—"}),e.jsx("td",{style:{maxWidth:"340px",fontSize:"0.74rem",color:"#5B655F"},children:F(r.details_json)})]},r.id)})})]})})})]})]})}export{Ae as MonitoringAuditView};
