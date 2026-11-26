import{r as p,f as d,i as E,j as e,I as Ie,e as Fe,h as ze,k as Ee,l as ie,m as qe,n as Pe,o as Te,p as Re,q as Be,s as Me,t as De,u as Ue,g as l}from"./index-5Nqhhqz7.js";const Oe=l.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({theme:t})=>t.colors.textPrimary};
`,Ge=l.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  .head-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  h1 {
    font-size: 1.32rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  p {
    font-size: 0.82rem;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .head-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`,q=l.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 13px;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid
    ${({$primary:t,theme:a})=>t?a.colors.brandPrimary:a.colors.borderStrong};
  background: ${({$primary:t,theme:a})=>t?a.colors.brandPrimary:a.colors.bgSurface};
  color: ${({$primary:t,theme:a})=>t?"#FFFFFF":a.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({$primary:t,theme:a})=>t?a.colors.brandPrimaryHover:a.colors.bgSurfaceHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,He=l.section`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,C=l.div`
  padding: 15px 18px;
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
    background: ${({$color:t})=>t||"#1E2420"};
  }

  .k-val {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.55rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${({theme:t})=>t.colors.textPrimary};
    line-height: 1.1;
  }

  .k-sub {
    font-size: 0.71rem;
    color: ${({theme:t})=>t.colors.textMuted};
    font-variant-numeric: tabular-nums;
  }
`,Qe=l.section`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  overflow: hidden;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`,le=l.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-right: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 980px) {
    border-right: none;
    border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    &:last-child {
      border-bottom: none;
    }
  }
`,de=l.div`
  padding: 13px 18px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};

  .q-title {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    min-width: 0;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .q-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .q-count {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.71rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,G=l.button`
  border: 1px solid rgba(45, 106, 79, 0.28);
  background: rgba(45, 106, 79, 0.08);
  color: ${({theme:t})=>t.colors.brandPrimary};
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.69rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(45, 106, 79, 0.16);
  }
`,ce=l.div`
  display: flex;
  flex-direction: column;
  max-height: 274px;
  overflow-y: auto;
`,ue=l.button`
  position: relative;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);
  background: ${({$active:t})=>t?"#F1F7F4":"transparent"};
  padding: 10px 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: background 140ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: ${({$active:t,theme:a})=>t?a.colors.brandPrimary:"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({$active:t,theme:a})=>t?"#E7F2EC":a.colors.bgSurfaceSubtle};
  }

  .qr-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }

  .qr-name-wrap {
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .qr-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qr-sub {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
    color: ${({theme:t})=>t.colors.textMuted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qr-total {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    flex-shrink: 0;
  }

  .qr-pct {
    font-weight: 500;
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textMuted};
    margin-left: 5px;
  }

  .qr-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .qr-track {
    flex: 1;
    height: 6px;
    border-radius: 999px;
    background: rgba(30, 36, 32, 0.07);
    overflow: hidden;
    display: flex;
  }

  .qr-seg {
    height: 100%;
    transition: width 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .qr-breakdown {
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,We=l.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  flex-wrap: wrap;

  .tabs-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`,pe=l.button`
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
`,xe=l.div`
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
`,me=l.div`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  overflow: hidden;
`,he=l.div`
  width: 100%;
  overflow-x: auto;
`,be=l.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;

  thead th {
    text-align: left;
    padding: 9px 10px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${({theme:t})=>t.colors.textSecondary};
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    white-space: nowrap;
  }

  tbody td {
    padding: 10px 10px;
    border-bottom: 1px solid rgba(30, 36, 32, 0.06);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #f9faf8;
  }

  .host-btn {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.81rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-align: left;

    &:hover {
      color: ${({theme:t})=>t.colors.brandPrimary};
      text-decoration: underline;
    }
  }

  .sub-line {
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 2px;
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mono {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
  }
`,P=l.span`
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

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`,Ke=l.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 4px;
  font-family: ${({theme:t})=>t.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.75rem;
  color: ${({theme:t})=>t.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
    color: ${({theme:t})=>t.colors.brandPrimary};
  }
`,Ve=l.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`,T=l.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding: 0 7px;
  border-radius: 5px;
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
  color: ${({$danger:t,$accent:a,theme:m})=>t?m.colors.status.CRITICAL:a?m.colors.brandPrimary:m.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({$danger:t,theme:a})=>t?"rgba(200, 30, 30, 0.08)":a.colors.bgSurfaceHover};
    border-color: ${({$danger:t,theme:a})=>t?"rgba(200, 30, 30, 0.32)":a.colors.borderStrong};
    color: ${({$danger:t,theme:a})=>t?a.colors.status.CRITICAL:a.colors.textPrimary};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`,R=l.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-size: 0.82rem;
`,Je=l.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Xe=l.div`
  width: 100%;
  max-width: 440px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  box-shadow: ${({theme:t})=>t.shadows.lg};
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .m-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 0.96rem;
      font-weight: 700;
    }
  }

  .m-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 0.74rem;
      font-weight: 600;
      color: ${({theme:t})=>t.colors.textSecondary};
    }
    select {
      height: 36px;
      border-radius: 7px;
      border: 1px solid ${({theme:t})=>t.colors.borderStrong};
      background: ${({theme:t})=>t.colors.bgSurface};
      color: ${({theme:t})=>t.colors.textPrimary};
      padding: 0 10px;
      font-size: 0.82rem;
    }
  }

  .m-err {
    padding: 8px 10px;
    border-radius: 6px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    font-size: 0.76rem;
    font-weight: 600;
  }

  .m-foot {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  }
`,H={NORMAL:{label:"Online",color:"#2D6A4F",bg:"rgba(45, 106, 79, 0.11)"},WARNING:{label:"Atenção",color:"#B45309",bg:"rgba(180, 83, 9, 0.11)"},CRITICAL:{label:"Crítico",color:"#C81E1E",bg:"rgba(200, 30, 30, 0.10)"},OFFLINE:{label:"Offline",color:"#64748B",bg:"rgba(100, 116, 139, 0.12)"}},Ye={hostname:"Hostname",ram_total_mb:"Memória RAM (MB)",ram_total_gb:"Memória RAM (GB)",disk_total_gb:"Disco total (GB)",disk_type:"Tipo de disco",cpu_model:"Processador",manufacturer:"Fabricante",model:"Modelo do equipamento",hardware_model:"Modelo do equipamento",serial_number:"Número de série",mac_address:"Endereço MAC",os_version:"Sistema Operacional",agent_uuid:"Rebind de agente"};function ge(t){let a=String(t??"").replace(/\r?\n/g," ").trim();return/^[=+\-@\t\r]/.test(a)&&(a=`'${a}`),`"${a.replace(/"/g,'""')}"`}function Q(t){if(!t)return"—";const a=new Date(t);return Number.isNaN(a.getTime())?"—":a.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"})}function er({token:t,units:a=[],allMachines:m=[],currentUser:y,latestAgentVersion:j="2.6.2-native-exe",onOpenMachineInMap:N,onUpdateLocation:fe,onRevokeMachine:W,onRefreshFleet:B}){const[M,K]=p.useState("EQUIPMENT"),[L,V]=p.useState(""),[u,w]=p.useState("ALL"),[v,f]=p.useState("ALL"),[$,J]=p.useState("ALL"),[S,X]=p.useState("ALL"),[je,Y]=p.useState(""),[A,Z]=p.useState([]),[ve,ee]=p.useState(!1),[D,ye]=p.useState(""),[x,b]=p.useState({open:!1,machine:null,unitId:"",sectorId:"",busy:!1,error:""}),[Ne,re]=p.useState(null),te=(y==null?void 0:y.role)==="ADMIN_N2",we=te||(y==null?void 0:y.role)==="TECH_N1",oe=async()=>{if(t){ee(!0);try{const r=await Ue.getInventoryChanges(t,{limit:150});Z(r.changes||[])}catch{Z([])}finally{ee(!1)}}};p.useEffect(()=>{oe()},[t]);const U=p.useMemo(()=>{const r=new Map;for(const o of a)r.set(Number(o.id),{id:Number(o.id),name:d(o.name),code:o.code||"",total:0,normal:0,warning:0,critical:0,offline:0});for(const o of m){const s=Number(o.unit_id);r.has(s)||r.set(s,{id:s,name:d(o.unit_name||`Unidade #${s}`),code:"",total:0,normal:0,warning:0,critical:0,offline:0});const n=r.get(s);n.total+=1,o.health_status==="CRITICAL"?n.critical+=1:o.health_status==="WARNING"?n.warning+=1:o.health_status==="OFFLINE"?n.offline+=1:n.normal+=1}return Array.from(r.values()).sort((o,s)=>s.total-o.total||o.name.localeCompare(s.name))},[a,m]),I=p.useMemo(()=>{const r=new Map,o=u==="ALL"?a:a.filter(s=>Number(s.id)===Number(u));for(const s of o)for(const n of s.sectors||[])r.set(Number(n.id),{id:Number(n.id),unitId:Number(s.id),unitName:d(s.name),name:d(n.name),code:n.code||"",total:0,normal:0,warning:0,critical:0,offline:0});for(const s of m){if(u!=="ALL"&&Number(s.unit_id)!==Number(u))continue;const n=Number(s.sector_id);r.has(n)||r.set(n,{id:n,unitId:Number(s.unit_id),unitName:d(s.unit_name||""),name:d(s.sector_name||`Setor #${n}`),code:s.sector_code||"",total:0,normal:0,warning:0,critical:0,offline:0});const c=r.get(n);c.total+=1,s.health_status==="CRITICAL"?c.critical+=1:s.health_status==="WARNING"?c.warning+=1:s.health_status==="OFFLINE"?c.offline+=1:c.normal+=1}return Array.from(r.values()).sort((s,n)=>n.total-s.total||s.name.localeCompare(n.name))},[a,m,u]),F=Math.max(1,...U.map(r=>r.total)),z=Math.max(1,...I.map(r=>r.total)),g=p.useMemo(()=>{let r=0,o=0,s=0,n=0;for(const c of m)c.health_status==="OFFLINE"?s+=1:(r+=1,(c.health_status==="WARNING"||c.health_status==="CRITICAL")&&(o+=1)),c.agent_version&&E(c.agent_version,j)&&(n+=1);return{total:m.length,online:r,attention:o,offline:s,outdated:n}},[m,j]),$e=p.useMemo(()=>{if(u==="ALL")return a.flatMap(o=>(o.sectors||[]).map(s=>({...s,unitName:d(o.name)})));const r=a.find(o=>Number(o.id)===Number(u));return((r==null?void 0:r.sectors)||[]).map(o=>({...o,unitName:d(r.name)}))},[a,u]),_=p.useMemo(()=>{const r=L.trim().toLowerCase();return m.filter(o=>{if(u!=="ALL"&&Number(o.unit_id)!==Number(u)||v!=="ALL"&&Number(o.sector_id)!==Number(v))return!1;if($==="REVOKED"){if(!Number(o.is_revoked))return!1}else if($!=="ALL"&&o.health_status!==$)return!1;if(S==="OUTDATED"){if(!E(o.agent_version,j))return!1}else if(S==="CURRENT"&&E(o.agent_version,j))return!1;return!(r&&![o.hostname,o.ip_address,o.mac_address,o.serial_number,o.cpu_model,o.model,o.hardware_model,o.os_version,o.unit_name,o.sector_name,o.sector_code].map(n=>d(String(n||"")).toLowerCase()).join(" ").includes(r))})},[m,u,v,$,S,L,j]),ae=p.useMemo(()=>{const r=D.trim().toLowerCase();return r?A.filter(o=>[o.hostname,o.unit_name,o.sector_name,o.field_name,o.old_value,o.new_value].map(s=>d(String(s||"")).toLowerCase()).join(" ").includes(r)):A},[A,D]),_e=u!=="ALL"||v!=="ALL"||$!=="ALL"||S!=="ALL"||L.trim().length>0,se=u!=="ALL"?a.find(r=>Number(r.id)===Number(u)):null;function Se(r,o){var s;o&&((s=navigator.clipboard)==null||s.writeText(String(o)).catch(()=>{}),Y(r),setTimeout(()=>Y(n=>n===r?"":n),1400))}function ke(){const r=["Hostname","Unidade","Setor","Codigo Setor","Status","Revogado","IPv4","MAC","Sistema Operacional","Modelo","Numero de Serie","Processador","RAM Total (GB)","Disco Total (GB)","CPU (%)","RAM (%)","Disco (%)","Versao Agente","Ultima Comunicacao"],o=_.map(i=>{var ne;return[i.hostname,d(i.unit_name||""),d(i.sector_name||""),i.sector_code||"",((ne=H[i.health_status])==null?void 0:ne.label)||i.health_status,Number(i.is_revoked)?"Sim":"Nao",i.ip_address||"",i.mac_address||"",i.os_version||"",i.model||i.hardware_model||"",i.serial_number||"",i.cpu_model||"",i.ram_total_mb?Math.round(Number(i.ram_total_mb)/1024):i.ram_total_gb||"",i.disk_total_gb||"",Number(i.cpu_usage_pct||0).toFixed(1),Number(i.ram_usage_pct||0).toFixed(1),Number(i.disk_usage_pct||0).toFixed(1),i.agent_version||"",Q(i.last_seen_at)]}),s=[r.map(ge).join(";"),...o.map(i=>i.map(ge).join(";"))],n=new Blob([`\uFEFF${s.join(`\r
`)}`],{type:"text/csv;charset=utf-8;"}),c=window.URL.createObjectURL(n),h=document.createElement("a");h.href=c;const k=new Date().toISOString().slice(0,10);h.download=`pulso-rmm-inventario-${k}.csv`,document.body.appendChild(h),h.click(),h.remove(),setTimeout(()=>window.URL.revokeObjectURL(c),4e3)}function Ce(r){var o;b({open:!0,machine:r,unitId:String(r.unit_id||((o=a[0])==null?void 0:o.id)||""),sectorId:String(r.sector_id||""),busy:!1,error:""})}async function Le(){if(!x.machine||!x.unitId||!x.sectorId){b(r=>({...r,error:"Selecione a unidade e o setor de destino."}));return}b(r=>({...r,busy:!0,error:""}));try{await fe(x.machine.id,{unitId:Number(x.unitId),sectorId:Number(x.sectorId)}),b({open:!1,machine:null,unitId:"",sectorId:"",busy:!1,error:""})}catch(r){b(o=>({...o,busy:!1,error:r.message||"Não foi possível mover a estação."}))}}async function Ae(r){if(W){re(r.id);try{await W(r.id,!Number(r.is_revoked))}finally{re(null)}}}const O=a.find(r=>Number(r.id)===Number(x.unitId));return e.jsxs(Oe,{children:[e.jsxs(Ge,{children:[e.jsxs("div",{className:"head-copy",children:[e.jsx("h1",{children:"Inventário da frota"}),e.jsx("p",{children:"Quantitativo de estações por unidade e setor, especificações de hardware e histórico de alterações."})]}),e.jsxs("div",{className:"head-actions",children:[e.jsxs(q,{type:"button",onClick:()=>{B==null||B(),oe()},title:"Sincronizar inventário e histórico agora",children:[e.jsx(Ie,{size:14}),e.jsx("span",{children:"Atualizar"})]}),e.jsxs(q,{type:"button",$primary:!0,onClick:ke,disabled:_.length===0,title:"Exportar estações filtradas em CSV (compatível com Excel)",children:[e.jsx(Fe,{size:14}),e.jsxs("span",{children:["Exportar CSV (",_.length,")"]})]})]})]}),e.jsxs(He,{"aria-label":"Resumo quantitativo da frota",children:[e.jsxs(C,{$color:"#1E2420",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Total de estações"]}),e.jsx("span",{className:"k-val",children:g.total}),e.jsxs("span",{className:"k-sub",children:[a.length," ",a.length===1?"unidade":"unidades"]})]}),e.jsxs(C,{$color:"#2D6A4F",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Online"]}),e.jsx("span",{className:"k-val",children:g.online}),e.jsx("span",{className:"k-sub",children:g.total?`${Math.round(g.online/g.total*100)}% da frota`:"—"})]}),e.jsxs(C,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Atenção / Crítico"]}),e.jsx("span",{className:"k-val",children:g.attention}),e.jsx("span",{className:"k-sub",children:"Uso elevado ou falha ativa"})]}),e.jsxs(C,{$color:"#64748B",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Offline"]}),e.jsx("span",{className:"k-val",children:g.offline}),e.jsx("span",{className:"k-sub",children:"Sem heartbeat recente"})]}),e.jsxs(C,{$color:"#B45309",children:[e.jsxs("span",{className:"k-label",children:[e.jsx("span",{className:"k-dot"}),"Agentes desatualizados"]}),e.jsx("span",{className:"k-val",children:g.outdated}),e.jsxs("span",{className:"k-sub",children:["Versão oficial v",j.split("-")[0]]})]})]}),e.jsxs(Qe,{"aria-label":"Quantitativo de computadores por unidade e setor",children:[e.jsxs(le,{children:[e.jsxs(de,{children:[e.jsxs("div",{className:"q-title",children:[e.jsx(ze,{size:14}),e.jsx("span",{children:"Quantitativo por unidade"})]}),e.jsxs("div",{className:"q-meta",children:[u!=="ALL"&&e.jsx(G,{type:"button",onClick:()=>{w("ALL"),f("ALL")},children:"Todas"}),e.jsxs("span",{className:"q-count",children:[U.length," unidades"]})]})]}),e.jsx(ce,{children:U.map(r=>{const o=String(r.id)===String(u),s=g.total>0?Math.round(r.total/g.total*100):0,n=r.normal+r.warning+r.critical;return e.jsxs(ue,{type:"button",$active:o,onClick:()=>{o?(w("ALL"),f("ALL")):(w(String(r.id)),f("ALL"))},title:`Clique para filtrar estações de ${r.name}`,children:[e.jsxs("div",{className:"qr-top",children:[e.jsxs("div",{className:"qr-name-wrap",children:[e.jsx("span",{className:"qr-name",children:r.name}),r.code&&e.jsx("span",{className:"qr-sub",children:r.code})]}),e.jsxs("span",{className:"qr-total",children:[r.total," ",r.total===1?"PC":"PCs",e.jsxs("span",{className:"qr-pct",children:[s,"%"]})]})]}),e.jsxs("div",{className:"qr-bar-row",children:[e.jsxs("div",{className:"qr-track",children:[e.jsx("div",{className:"qr-seg",style:{width:`${r.normal/F*100}%`,background:"#2D6A4F"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.warning/F*100}%`,background:"#B45309"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.critical/F*100}%`,background:"#C81E1E"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.offline/F*100}%`,background:"#94A3B8"}})]}),e.jsx("span",{className:"qr-breakdown",children:r.total===0?"Sem estações":`${n} on · ${r.offline} off`})]})]},r.id)})})]}),e.jsxs(le,{children:[e.jsxs(de,{children:[e.jsxs("div",{className:"q-title",children:[e.jsx(Ee,{size:14}),e.jsx("span",{children:se?`Setores — ${d(se.name)}`:"Quantitativo por setor"})]}),e.jsxs("div",{className:"q-meta",children:[v!=="ALL"&&e.jsx(G,{type:"button",onClick:()=>f("ALL"),children:"Limpar setor"}),e.jsxs("span",{className:"q-count",children:[I.length," setores"]})]})]}),e.jsx(ce,{children:I.length===0?e.jsx(R,{children:"Nenhum setor cadastrado nesta unidade."}):I.map(r=>{const o=String(r.id)===String(v),s=r.normal+r.warning+r.critical;return e.jsxs(ue,{type:"button",$active:o,onClick:()=>{o?f("ALL"):(w(String(r.unitId)),f(String(r.id)))},title:`Clique para filtrar estações do setor ${r.name}`,children:[e.jsxs("div",{className:"qr-top",children:[e.jsxs("div",{className:"qr-name-wrap",children:[e.jsx("span",{className:"qr-name",children:r.name}),e.jsxs("span",{className:"qr-sub",children:[r.code,u==="ALL"&&r.unitName?` · ${r.unitName}`:""]})]}),e.jsxs("span",{className:"qr-total",children:[r.total," ",r.total===1?"PC":"PCs"]})]}),e.jsxs("div",{className:"qr-bar-row",children:[e.jsxs("div",{className:"qr-track",children:[e.jsx("div",{className:"qr-seg",style:{width:`${r.normal/z*100}%`,background:"#2D6A4F"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.warning/z*100}%`,background:"#B45309"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.critical/z*100}%`,background:"#C81E1E"}}),e.jsx("div",{className:"qr-seg",style:{width:`${r.offline/z*100}%`,background:"#94A3B8"}})]}),e.jsx("span",{className:"qr-breakdown",children:r.total===0?"Vazio":`${s} on · ${r.offline} off`})]})]},r.id)})})]})]}),e.jsx(We,{children:e.jsxs("div",{className:"tabs-left",children:[e.jsxs(pe,{type:"button",$active:M==="EQUIPMENT",onClick:()=>K("EQUIPMENT"),children:[e.jsx("span",{children:"Equipamentos"}),e.jsx("span",{className:"t-badge",children:_.length})]}),e.jsxs(pe,{type:"button",$active:M==="CHANGES",onClick:()=>K("CHANGES"),children:[e.jsx("span",{children:"Alterações de hardware"}),e.jsx("span",{className:"t-badge",children:A.length})]})]})}),M==="EQUIPMENT"?e.jsxs(e.Fragment,{children:[e.jsxs(xe,{children:[e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(ie,{size:14})}),e.jsx("input",{type:"text","aria-label":"Buscar estação por hostname, IP, MAC, serial ou CPU",placeholder:"Buscar hostname, IP, MAC, serial, modelo ou CPU...",value:L,onChange:r=>V(r.target.value)})]}),e.jsxs("select",{"aria-label":"Filtrar por unidade",value:u,onChange:r=>{w(r.target.value),f("ALL")},children:[e.jsx("option",{value:"ALL",children:"Todas as unidades"}),a.map(r=>e.jsx("option",{value:String(r.id),children:d(r.name)},r.id))]}),e.jsxs("select",{"aria-label":"Filtrar por setor",value:v,onChange:r=>f(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todos os setores"}),$e.map(r=>e.jsxs("option",{value:String(r.id),children:[d(r.name),u==="ALL"?` (${r.unitName})`:""]},r.id))]}),e.jsxs("select",{"aria-label":"Filtrar por status",value:$,onChange:r=>J(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todos os status"}),e.jsx("option",{value:"NORMAL",children:"Online"}),e.jsx("option",{value:"WARNING",children:"Atenção"}),e.jsx("option",{value:"CRITICAL",children:"Crítico"}),e.jsx("option",{value:"OFFLINE",children:"Offline"}),e.jsx("option",{value:"REVOKED",children:"Revogados"})]}),e.jsxs("select",{"aria-label":"Filtrar por versão do agente",value:S,onChange:r=>X(r.target.value),children:[e.jsx("option",{value:"ALL",children:"Todas as versões"}),e.jsx("option",{value:"CURRENT",children:"Agente atualizado"}),e.jsx("option",{value:"OUTDATED",children:"Agente desatualizado"})]}),_e&&e.jsx(G,{type:"button",onClick:()=>{V(""),w("ALL"),f("ALL"),J("ALL"),X("ALL")},children:"Limpar filtros"})]}),e.jsx(me,{children:e.jsx(he,{children:_.length===0?e.jsx(R,{children:"Nenhuma estação corresponde aos filtros atuais."}):e.jsxs(be,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"Unidade / Setor"}),e.jsx("th",{children:"Status & Recursos"}),e.jsx("th",{children:"IPv4 / MAC"}),e.jsx("th",{children:"Hardware"}),e.jsx("th",{children:"Agente"}),e.jsx("th",{children:"Ações"})]})}),e.jsx("tbody",{children:_.map(r=>{const o=H[r.health_status]||H.OFFLINE,s=r.agent_version&&E(r.agent_version,j),n=!!Number(r.is_revoked),c=`ip-${r.id}`;return e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsxs("button",{type:"button",className:"host-btn",onClick:()=>N==null?void 0:N(r),title:"Abrir esta estação no mapa",children:[e.jsx("span",{children:r.hostname}),n&&e.jsx(P,{$bg:"rgba(200,30,30,0.10)",$color:"#C81E1E",children:"Revogado"})]}),e.jsx("div",{className:"sub-line",title:r.os_version||"",children:r.os_version||"Windows"})]}),e.jsxs("td",{children:[e.jsx("div",{style:{fontWeight:600},children:d(r.unit_name||"—")}),e.jsxs("div",{className:"sub-line",children:[d(r.sector_name||"—"),r.sector_code?` · ${r.sector_code}`:""]})]}),e.jsxs("td",{children:[e.jsxs(P,{$bg:o.bg,$color:o.color,children:[e.jsx("i",{}),o.label]}),e.jsxs("div",{className:"sub-line mono",children:["CPU ",Number(r.cpu_usage_pct||0).toFixed(0),"% · RAM"," ",Number(r.ram_usage_pct||0).toFixed(0),"% · DSK"," ",Number(r.disk_usage_pct||0).toFixed(0),"%"]})]}),e.jsxs("td",{children:[e.jsxs(Ke,{type:"button",onClick:()=>Se(c,r.ip_address),title:"Copiar endereço IPv4",children:[e.jsx("span",{children:r.ip_address||"—"}),je===c?e.jsx(qe,{size:12}):e.jsx(Pe,{size:12})]}),e.jsx("div",{className:"sub-line mono",children:r.mac_address||"—"})]}),e.jsx("td",{children:(()=>{const h=r.ram_total_mb?Math.round(Number(r.ram_total_mb)/1024):r.ram_total_gb||null,k=r.model||r.hardware_model||r.cpu_model||"—",i=[h?`${h}GB RAM`:null,r.disk_total_gb?`${r.disk_total_gb}GB${r.disk_type&&r.disk_type!=="UNKNOWN"?` ${r.disk_type}`:""}`:null,r.serial_number||null].filter(Boolean).join(" · ");return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{maxWidth:"175px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontWeight:500},title:`${k}${r.cpu_model&&k!==r.cpu_model?` · ${r.cpu_model}`:""}`,children:k}),e.jsx("div",{className:"sub-line mono",title:i,children:i||"—"})]})})()}),e.jsxs("td",{children:[e.jsx(P,{$bg:s?"rgba(180,83,9,0.11)":"rgba(45,106,79,0.09)",$color:s?"#B45309":"#2D6A4F",children:e.jsx("span",{className:"mono",style:{fontSize:"0.68rem"},children:String(r.agent_version||"—").replace(/-native-exe$/i,"")})}),e.jsx("div",{className:"sub-line",children:Q(r.last_seen_at)})]}),e.jsx("td",{children:e.jsxs(Ve,{children:[e.jsxs(T,{type:"button",$accent:!0,onClick:()=>N==null?void 0:N(r),title:"Focar estação no mapa",children:[e.jsx(Te,{size:12}),e.jsx("span",{children:"Mapa"})]}),we&&e.jsxs(T,{type:"button",onClick:()=>Ce(r),title:"Mover estação de unidade ou setor",children:[e.jsx(Re,{size:12}),e.jsx("span",{children:"Mover"})]}),te&&e.jsxs(T,{type:"button",$danger:!n,$accent:n,disabled:Ne===r.id,onClick:()=>Ae(r),title:n?"Reativar comunicação do agente":"Revogar credencial do agente",children:[n?e.jsx(Be,{size:12}):e.jsx(Me,{size:12}),e.jsx("span",{children:n?"Reativar":"Revogar"})]})]})})]},r.id)})})]})})})]}):e.jsxs(e.Fragment,{children:[e.jsx(xe,{children:e.jsxs("div",{className:"search-box",children:[e.jsx("span",{className:"search-ico",children:e.jsx(ie,{size:14})}),e.jsx("input",{type:"text","aria-label":"Filtrar alterações de hardware",placeholder:"Filtrar por hostname, unidade, campo ou valor...",value:D,onChange:r=>ye(r.target.value)})]})}),e.jsx(me,{children:e.jsx(he,{children:ve?e.jsx(R,{children:"Carregando histórico de alterações de hardware..."}):ae.length===0?e.jsx(R,{children:"Nenhuma troca de componente ou alteração de hardware registrada até o momento."}):e.jsxs(be,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Data / Hora"}),e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"Unidade / Setor"}),e.jsx("th",{children:"Campo alterado"}),e.jsx("th",{children:"Antes → Depois"})]})}),e.jsx("tbody",{children:ae.map(r=>e.jsxs("tr",{children:[e.jsx("td",{className:"mono",children:Q(r.changed_at)}),e.jsx("td",{style:{fontWeight:700},children:r.hostname||`PC #${r.machine_id}`}),e.jsxs("td",{children:[d(r.unit_name||"—"),r.sector_name?` · ${d(r.sector_name)}`:""]}),e.jsx("td",{children:e.jsx(P,{$bg:"rgba(45,106,79,0.09)",$color:"#2D6A4F",children:Ye[r.field_name]||r.field_name})}),e.jsxs("td",{className:"mono",children:[e.jsx("span",{style:{color:"#64748B"},children:r.old_value||"—"})," → ",e.jsx("span",{style:{color:"#1E2420",fontWeight:700},children:r.new_value||"—"})]})]},r.id))})]})})})]}),x.open&&x.machine&&e.jsx(Je,{onClick:()=>!x.busy&&b({open:!1,machine:null,unitId:"",sectorId:"",busy:!1,error:""}),children:e.jsxs(Xe,{onClick:r=>r.stopPropagation(),role:"dialog","aria-modal":"true",children:[e.jsxs("div",{className:"m-head",children:[e.jsxs("h3",{children:["Mover ",x.machine.hostname]}),e.jsx(T,{type:"button",onClick:()=>b({open:!1,machine:null,unitId:"",sectorId:"",busy:!1,error:""}),"aria-label":"Fechar",children:e.jsx(De,{size:13})})]}),e.jsxs("div",{className:"m-field",children:[e.jsx("label",{htmlFor:"inv-move-unit",children:"Unidade de destino"}),e.jsx("select",{id:"inv-move-unit",value:x.unitId,onChange:r=>{const o=r.target.value,s=a.find(n=>Number(n.id)===Number(o));b(n=>{var c,h;return{...n,unitId:o,sectorId:String(((h=(c=s==null?void 0:s.sectors)==null?void 0:c[0])==null?void 0:h.id)||"")}})},children:a.map(r=>e.jsx("option",{value:String(r.id),children:d(r.name)},r.id))})]}),e.jsxs("div",{className:"m-field",children:[e.jsx("label",{htmlFor:"inv-move-sector",children:"Setor de destino"}),e.jsx("select",{id:"inv-move-sector",value:x.sectorId,onChange:r=>b(o=>({...o,sectorId:r.target.value})),children:((O==null?void 0:O.sectors)||[]).map(r=>e.jsxs("option",{value:String(r.id),children:[d(r.name)," (",r.code,")"]},r.id))})]}),x.error&&e.jsx("div",{className:"m-err",children:x.error}),e.jsxs("div",{className:"m-foot",children:[e.jsx(q,{type:"button",disabled:x.busy,onClick:()=>b({open:!1,machine:null,unitId:"",sectorId:"",busy:!1,error:""}),children:"Cancelar"}),e.jsx(q,{type:"button",$primary:!0,disabled:x.busy,onClick:Le,children:x.busy?"Movendo...":"Salvar localização"})]})]})})]})}export{er as InventoryView};
