import{r as n,u as re,f as h,j as e,I as se,l as F,o as ie,g as o}from"./index-GICQh-k3.js";const ae=o.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({theme:t})=>t.colors.textPrimary};
`,oe=o.div`
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
`,ne=o.button`
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
`,le=o.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,B=o.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 9px 2px 11px;
  font-size: 0.84rem;
  font-weight: ${({$active:t})=>t?700:500};
  color: ${({$active:t,theme:i})=>t?i.colors.textPrimary:i.colors.textSecondary};
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
    background: ${({$active:t,theme:i})=>t?i.colors.brandPrimary:"transparent"};
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
    color: ${({$active:t,theme:i})=>t?i.colors.brandPrimary:i.colors.textSecondary};
  }
`,de=o.section`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,v=o.div`
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
`,O=o.div`
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
`,ce=o.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.sm};
  padding: 3px;
`,ue=o.button`
  height: 26px;
  padding: 0 10px;
  border-radius: 5px;
  border: none;
  background: ${({$active:t,theme:i})=>t?i.colors.brandPrimarySubtle:"transparent"};
  color: ${({$active:t,theme:i})=>t?i.colors.brandPrimary:i.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({$active:t})=>t?700:500};
  cursor: pointer;

  &:hover {
    color: ${({theme:t})=>t.colors.textPrimary};
  }
`,V=o.div`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  overflow: hidden;
`,W=o.div`
  width: 100%;
  overflow-x: auto;
`,H=o.table`
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
`,T=o.span`
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
`,xe=o.button`
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
`,w=o.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-size: 0.82rem;
`;function M(t){if(!t)return"—";const i=new Date(t);return Number.isNaN(i.getTime())?"—":i.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})}function U(t=""){const i=String(t).toUpperCase();return i.startsWith("SECURITY_")||i.includes("FAILED")||i.includes("REVOKED")?{category:"SECURITY",color:"#C81E1E",bg:"rgba(200, 30, 30, 0.10)"}:i.startsWith("REMOTE_TASK")||i.startsWith("AGENT_OTA")?{category:"TASKS",color:"#B45309",bg:"rgba(180, 83, 9, 0.11)"}:i.startsWith("USER_")||i.startsWith("AUTH_")?{category:"USERS",color:"#2D6A4F",bg:"rgba(45, 106, 79, 0.11)"}:{category:"INFRA",color:"#475569",bg:"rgba(100, 116, 139, 0.11)"}}function Y(t){if(!t)return"—";let i=t;if(typeof t=="string")try{i=JSON.parse(t)}catch{return t.slice(0,120)}if(typeof i!="object"||i===null)return String(i);const u=Object.entries(i).filter(([,d])=>d!=null&&d!=="").slice(0,4).map(([d,x])=>{const m=typeof x=="object"?JSON.stringify(x):String(x);return`${d}: ${m}`});return u.length>0?u.join(" · "):"—"}function me({token:t,units:i=[],allMachines:u=[],alerts:d=[],currentUser:x,onOpenMachineInMap:m,onRefreshFleet:A}){const p=(x==null?void 0:x.role)==="ADMIN_N2",[$,I]=n.useState("ALERTS"),[_,K]=n.useState(""),[g,G]=n.useState("ALL"),[f,q]=n.useState("ALL"),[j,J]=n.useState("ALL"),[N,R]=n.useState([]),[Q,z]=n.useState(!1),[E,X]=n.useState(""),[y,Z]=n.useState("ALL"),L=n.useCallback(async()=>{if(!(!t||!p)){z(!0);try{const r=await re.getAuditLogs(t);R(r.logs||[])}catch{R([])}finally{z(!1)}}},[t,p]);n.useEffect(()=>{p&&L()},[p,L]);const S=n.useMemo(()=>{const r=Date.now();return[...u.map(a=>{const l=a.health_status==="OFFLINE",c=a.last_seen_at?Math.max(0,Math.floor((r-new Date(a.last_seen_at).getTime())/1e3)):0,te=Math.max(0,Math.floor(Number(a.idle_seconds||0))),k=l?c:te;return k<86400||d.some(C=>Number(C.machine_id)===Number(a.id)&&C.metric_name==="INACTIVITY_24H"&&C.status!=="RESOLVED")?null:{id:`live-inact-${a.id}`,machine_id:a.id,unit_id:a.unit_id,hostname:a.hostname,unit_name:a.unit_name||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"OPEN",message:l?`Estação sem comunicação há mais de 24h (${Math.floor(k/3600)}h).`:`Estação ligada sem interação há mais de 24h (${Math.floor(k/3600)}h).`,created_at:a.last_seen_at||new Date().toISOString()}}).filter(Boolean),...d]},[u,d]),b=n.useMemo(()=>{let r=0,s=0,a=0,l=0;for(const c of S)c.status==="RESOLVED"?l+=1:(r+=1,c.severity==="CRITICAL"&&(s+=1),c.metric_name==="INACTIVITY_24H"&&(a+=1));return{open:r,critical:s,inactivity:a,resolved:l}},[S]),D=n.useMemo(()=>{const r=_.trim().toLowerCase();return S.filter(s=>{if(g!=="ALL"&&s.severity!==g||f==="OPEN"&&s.status==="RESOLVED"||f==="RESOLVED"&&s.status!=="RESOLVED")return!1;if(j!=="ALL"){const a=u.find(c=>Number(c.id)===Number(s.machine_id)),l=s.unit_id||(a==null?void 0:a.unit_id);if(Number(l)!==Number(j))return!1}return!(r&&![s.hostname,s.unit_name,s.message,s.metric_name,s.status].map(l=>h(String(l||"")).toLowerCase()).join(" ").includes(r))})},[S,g,f,j,_,u]),P=n.useMemo(()=>{const r=E.trim().toLowerCase();return N.filter(s=>{const a=U(s.action_type);return!(y!=="ALL"&&a.category!==y||r&&![s.action_type,s.user_name,s.user_email,s.machine_hostname,s.ip_address,Y(s.details_json)].map(c=>h(String(c||"")).toLowerCase()).join(" ").includes(r))})},[N,y,E]);function ee(r){const s=u.find(a=>Number(a.id)===Number(r.machine_id));s&&(m==null||m(s))}return e.jsxs(ae,{children:[e.jsxs(oe,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:"Monitoramento e auditoria"}),e.jsx("p",{children:"Acompanhamento de incidentes da frota e trilha auditável de ações remotas, acessos e segurança."})]}),e.jsxs(ne,{type:"button",onClick:()=>{A==null||A(),p&&L()},children:[e.jsx(se,{size:14}),e.jsx("span",{children:"Atualizar"})]})]}),e.jsxs(le,{children:[e.jsxs(B,{type:"button",$active:$==="ALERTS",onClick:()=>I("ALERTS"),children:[e.jsx("span",{children:"Alertas da frota"}),e.jsx("span",{className:"t-badge",children:b.open})]}),p&&e.jsxs(B,{type:"button",$active:$==="AUDIT",onClick:()=>I("AUDIT"),children:[e.jsx("span",{children:"Trilha de auditoria"}),e.jsx("span",{className:"t-badge",children:N.length})]})]}),$==="ALERTS"?e.jsxs(e.Fragment,{children:[e.jsxs(de,{children:[e.jsxs(v,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Alertas ativos"]}),e.jsx("span",{className:"k-val",children:b.open})]}),e.jsxs(v,{$color:"#C81E1E",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Críticos abertos"]}),e.jsx("span",{className:"k-val",children:b.critical})]}),e.jsxs(v,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Inatividade >24h"]}),e.jsx("span",{className:"k-val",children:b.inactivity})]}),e.jsxs(v,{$color:"#2D6A4F",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Resolvidos"]}),e.jsx("span",{className:"k-val",children:b.resolved})]})]}),e.jsxs(O,{children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(F,{size:14})}),e.jsx("input",{type:"text","aria-label":"Filtrar alertas",placeholder:"Buscar estação, unidade, métrica ou mensagem...",value:_,onChange:r=>K(r.target.value)})]}),e.jsxs("select",{"aria-label":"Filtrar por severidade",value:g,onChange:r=>G(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas severidades"}),e.jsx("option",{value:"CRITICAL",children:"Crítico"}),e.jsx("option",{value:"WARNING",children:"Atenção"})]}),e.jsxs("select",{"aria-label":"Filtrar por situação",value:f,onChange:r=>q(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas situações"}),e.jsx("option",{value:"OPEN",children:"Abertos"}),e.jsx("option",{value:"RESOLVED",children:"Resolvidos"})]}),e.jsxs("select",{"aria-label":"Filtrar alertas por unidade",value:j,onChange:r=>J(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas as unidades"}),i.map(r=>e.jsx("option",{value:String(r.id),children:h(r.name)},r.id))]})]}),e.jsx(V,{children:e.jsx(W,{children:D.length===0?e.jsx(w,{children:"Nenhum alerta encontrado para os filtros selecionados."}):e.jsxs(H,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Severidade"}),e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"Ocorrência"}),e.jsx("th",{children:"Situação"}),e.jsx("th",{children:"Registro"}),e.jsx("th",{children:"Ação"})]})}),e.jsx("tbody",{children:D.map(r=>{const s=r.severity==="CRITICAL",a=r.status==="RESOLVED";return e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx(T,{$bg:s?"rgba(200,30,30,0.10)":"rgba(180,83,9,0.11)",$color:s?"#C81E1E":"#B45309",children:s?"Crítico":"Atenção"})}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:700},children:h(r.hostname||`PC #${r.machine_id}`)}),e.jsx("div",{className:"sub",children:h(r.unit_name||"—")})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:500},children:h(r.message)}),e.jsxs("div",{className:"sub mono",children:[r.metric_name||"TELEMETRY",r.external_ticket_id?` · Chamado #${r.external_ticket_id}`:""]})]}),e.jsx("td",{children:e.jsx(T,{$bg:a?"rgba(45,106,79,0.10)":"rgba(180,83,9,0.11)",$color:a?"#2D6A4F":"#B45309",children:a?"Resolvido":r.metric_name==="INACTIVITY_24H"?"Inativo >24h":r.status||"Aberto"})}),e.jsx("td",{className:"mono",children:M(r.triggered_at||r.created_at)}),e.jsx("td",{children:r.machine_id?e.jsxs(xe,{type:"button",onClick:()=>ee(r),title:"Abrir estação afetada no mapa",children:[e.jsx(ie,{size:12}),e.jsx("span",{children:"Abrir no mapa"})]}):"—"})]},r.id||r.incident_key)})})]})})})]}):e.jsxs(e.Fragment,{children:[e.jsxs(O,{children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(F,{size:14})}),e.jsx("input",{type:"text","aria-label":"Buscar na trilha de auditoria",placeholder:"Buscar evento, operador, estação, IP ou detalhes...",value:E,onChange:r=>X(r.target.value)})]}),e.jsx(ce,{role:"tablist","aria-label":"Filtrar categoria de auditoria",children:[{key:"ALL",label:"Todos"},{key:"SECURITY",label:"Segurança"},{key:"TASKS",label:"Tarefas remotas"},{key:"USERS",label:"Usuários"},{key:"INFRA",label:"Infraestrutura"}].map(r=>e.jsx(ue,{type:"button",$active:y===r.key,onClick:()=>Z(r.key),children:r.label},r.key))})]}),e.jsx(V,{children:e.jsx(W,{children:Q?e.jsx(w,{children:"Carregando trilha de auditoria..."}):P.length===0?e.jsx(w,{children:"Nenhum evento de auditoria corresponde ao filtro."}):e.jsxs(H,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Data / Hora"}),e.jsx("th",{children:"Evento"}),e.jsx("th",{children:"Operador"}),e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"IP"}),e.jsx("th",{children:"Detalhes"})]})}),e.jsx("tbody",{children:P.map(r=>{const s=U(r.action_type);return e.jsxs("tr",{children:[e.jsx("td",{className:"mono",children:M(r.created_at)}),e.jsx("td",{children:e.jsx(T,{$bg:s.bg,$color:s.color,children:e.jsx("span",{className:"mono",style:{fontSize:"0.68rem"},children:r.action_type})})}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600},children:h(r.user_name||"Sistema / Agente")}),r.user_email&&e.jsx("div",{className:"sub",children:r.user_email})]}),e.jsx("td",{className:"mono",children:r.machine_hostname||"—"}),e.jsx("td",{className:"mono",children:r.ip_address||"—"}),e.jsx("td",{style:{maxWidth:"340px",fontSize:"0.74rem",color:"#5B655F"},children:Y(r.details_json)})]},r.id)})})]})})})]})]})}export{me as MonitoringAuditView};
