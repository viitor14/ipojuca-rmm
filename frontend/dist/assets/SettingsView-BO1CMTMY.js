import{r as d,u as y,f as u,j as e,v as X,w as he,q as Y,x as C,y as E,z as ue,p as ge,A as be,e as fe,m as je,n as ye,l as we,s as ve,t as Se,g as n}from"./index-5Nqhhqz7.js";const Z={ADMIN_N2:"Admin N2",TECH_N1:"Suporte N1",VIEWER:"Gestão"},Ce=n.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({theme:r})=>r.colors.textPrimary};
`,Ee=n.div`
  h1 {
    font-size: 1.32rem;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    font-size: 0.82rem;
    color: ${({theme:r})=>r.colors.textSecondary};
    margin-top: 3px;
  }
`,$e=n.div`
  display: grid;
  grid-template-columns: 236px minmax(0, 1fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,Ne=n.nav`
  background: ${({theme:r})=>r.colors.bgSurface};
  border: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  border-radius: ${({theme:r})=>r.radius.lg};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`,I=n.button`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 7px;
  border: none;
  background: ${({$active:r,theme:t})=>r?t.colors.brandPrimarySubtle:"transparent"};
  color: ${({$active:r,theme:t})=>r?t.colors.brandPrimary:t.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: ${({$active:r})=>r?700:500};
  text-align: left;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;

  &:hover {
    background: ${({$active:r,theme:t})=>r?"rgba(45, 106, 79, 0.14)":t.colors.bgSurfaceHover};
    color: ${({$active:r,theme:t})=>r?t.colors.brandPrimary:t.colors.textPrimary};
  }
`,Ae=n.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`,P=n.section`
  background: ${({theme:r})=>r.colors.bgSurface};
  border: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  border-radius: ${({theme:r})=>r.radius.lg};
  overflow: hidden;
`,z=n.div`
  padding: 15px 20px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  h2 {
    font-size: 0.94rem;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  p {
    font-size: 0.76rem;
    color: ${({theme:r})=>r.colors.textSecondary};
    margin-top: 2px;
  }
`,U=n.div`
  padding: 20px;
`,Pe=n.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid ${({theme:r})=>r.colors.borderSubtle};

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(45, 106, 79, 0.12);
    color: ${({theme:r})=>r.colors.brandPrimary};
    font-size: 0.96rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-size: 0.96rem;
    font-weight: 700;
  }

  .email {
    font-family: ${({theme:r})=>r.fonts.mono};
    font-size: 0.76rem;
    color: ${({theme:r})=>r.colors.textSecondary};
  }
`,ze=n.form`
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`,x=n.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:r})=>r.colors.textPrimary};
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  input,
  select {
    width: 100%;
    height: 38px;
    border: 1px solid ${({theme:r})=>r.colors.borderStrong};
    border-radius: 7px;
    background: ${({theme:r})=>r.colors.bgSurface};
    color: ${({theme:r})=>r.colors.textPrimary};
    font-size: 0.82rem;
    padding: 0 38px 0 11px;

    &:focus {
      outline: none;
      border-color: ${({theme:r})=>r.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  select {
    padding-right: 11px;
  }

  .eye-btn {
    position: absolute;
    right: 6px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: ${({theme:r})=>r.colors.textMuted};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      color: ${({theme:r})=>r.colors.textPrimary};
      background: ${({theme:r})=>r.colors.bgSurfaceHover};
    }
  }

  .hint {
    font-size: 0.71rem;
    color: ${({theme:r})=>r.colors.textMuted};
  }
`,L=n.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({$type:r})=>r==="error"?"#FEF2F2":"#F0FDF4"};
  border: 1px solid ${({$type:r})=>r==="error"?"#FECACA":"#BBF7D0"};
  color: ${({$type:r})=>r==="error"?"#991B1B":"#166534"};
`,k=n.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 15px;
  border-radius: 7px;
  border: none;
  background: ${({$danger:r,theme:t})=>r?t.colors.status.CRITICAL:t.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({$danger:r,theme:t})=>r?"#A61717":t.colors.brandPrimaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ke=n.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 13px;
  border-radius: 7px;
  border: 1px solid ${({theme:r})=>r.colors.borderStrong};
  background: ${({theme:r})=>r.colors.bgSurface};
  color: ${({theme:r})=>r.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({theme:r})=>r.colors.bgSurfaceHover};
  }
`,ee=n.div`
  width: 100%;
  overflow-x: auto;
`,re=n.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.79rem;

  thead th {
    text-align: left;
    padding: 10px 16px;
    font-size: 0.69rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${({theme:r})=>r.colors.textSecondary};
    background: ${({theme:r})=>r.colors.bgSurfaceSubtle};
    border-bottom: 1px solid ${({theme:r})=>r.colors.borderSubtle};
    white-space: nowrap;
  }

  tbody td {
    padding: 11px 16px;
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
    font-family: ${({theme:r})=>r.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.74rem;
  }
`,T=n.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  background: ${({$bg:r})=>r};
  color: ${({$color:r})=>r};
  white-space: nowrap;
`,w=n.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 27px;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  background: ${({theme:r})=>r.colors.bgSurface};
  color: ${({$danger:r,$accent:t,theme:p})=>r?p.colors.status.CRITICAL:t?p.colors.brandPrimary:p.colors.textSecondary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({$danger:r,theme:t})=>r?"rgba(200, 30, 30, 0.08)":t.colors.bgSurfaceHover};
    border-color: ${({$danger:r,theme:t})=>r?"rgba(200, 30, 30, 0.35)":t.colors.borderStrong};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Te=n.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .m-lbl {
    font-size: 0.7rem;
    font-weight: 600;
    color: ${({theme:r})=>r.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .m-val {
    font-family: ${({theme:r})=>r.fonts.mono};
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({theme:r})=>r.colors.textPrimary};
    word-break: break-all;
  }
`,Fe=n.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Re=n.div`
  width: 100%;
  max-width: 450px;
  background: ${({theme:r})=>r.colors.bgSurface};
  border: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  border-radius: ${({theme:r})=>r.radius.lg};
  box-shadow: ${({theme:r})=>r.shadows.lg};
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

  .m-foot {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid ${({theme:r})=>r.colors.borderSubtle};
  }
`;function _e(r){const t=String(r||"OP").trim().split(/\s+/).filter(Boolean);return t.length===0?"OP":t.length===1?t[0].slice(0,2).toUpperCase():`${t[0][0]}${t[t.length-1][0]}`.toUpperCase()}function Ie({token:r,currentUser:t,allMachines:p=[],agentInfo:c=null,onDownloadAgent:se,onRevokeMachine:M}){var K,J,Q;const m=(t==null?void 0:t.role)==="ADMIN_N2",[b,F]=d.useState(m?"USERS":"ACCOUNT"),[h,$]=d.useState({current:"",next:"",confirm:""}),[f,R]=d.useState({current:!1,next:!1,confirm:!1}),[q,H]=d.useState(!1),[_,v]=d.useState({type:"",text:""}),[oe,ae]=d.useState([]),[te,O]=d.useState(!1),[B,j]=d.useState({type:"",text:""}),[a,i]=d.useState({mode:null,target:null,name:"",email:"",role:"TECH_N1",isActive:!0,password:"",confirmPassword:"",showPassword:!1,busy:!1,error:""}),[D,ie]=d.useState(""),[N,ne]=d.useState("ALL"),[le,W]=d.useState(null),[de,V]=d.useState(!1),S=d.useCallback(async()=>{if(!(!r||!m)){O(!0);try{const s=await y.getUsers(r);ae(s.users||[])}catch(s){j({type:"error",text:s.message||"Falha ao carregar usuários."})}finally{O(!1)}}},[r,m]);d.useEffect(()=>{m&&S()},[m,S]);async function ce(s){if(s.preventDefault(),v({type:"",text:""}),h.next.length<8){v({type:"error",text:"A nova senha deve ter no mínimo 8 caracteres."});return}if(h.next!==h.confirm){v({type:"error",text:"A confirmação da nova senha não confere."});return}H(!0);try{const o=await y.changePassword(r,{currentPassword:h.current,newPassword:h.next});$({current:"",next:"",confirm:""}),v({type:"success",text:o.message||"Senha atualizada com sucesso."})}catch(o){v({type:"error",text:o.message||"Não foi possível alterar a senha."})}finally{H(!1)}}function g(){i(s=>({...s,mode:null,target:null,error:"",busy:!1}))}async function pe(s){if(s.preventDefault(),i(o=>({...o,error:""})),a.mode==="CREATE"){if(!a.name.trim()||!a.email.trim()){i(o=>({...o,error:"Nome e e-mail são obrigatórios."}));return}if(a.password.length<8){i(o=>({...o,error:"A senha inicial deve ter no mínimo 8 caracteres."}));return}i(o=>({...o,busy:!0}));try{await y.createUser(r,{name:a.name.trim(),email:a.email.trim(),role:a.role,password:a.password}),await S(),j({type:"success",text:`Conta ${a.email.trim()} criada com sucesso.`}),g()}catch(o){i(l=>({...l,busy:!1,error:o.message}))}return}if(a.mode==="EDIT"&&a.target){i(o=>({...o,busy:!0}));try{await y.updateUser(r,a.target.id,{name:a.name.trim(),role:a.role,is_active:a.isActive?1:0}),await S(),j({type:"success",text:`Usuário ${a.target.email} atualizado.`}),g()}catch(o){i(l=>({...l,busy:!1,error:o.message}))}return}if(a.mode==="RESET_PW"&&a.target){if(a.password.length<8){i(o=>({...o,error:"A nova senha deve ter no mínimo 8 caracteres."}));return}if(a.password!==a.confirmPassword){i(o=>({...o,error:"A confirmação da nova senha não confere."}));return}i(o=>({...o,busy:!0}));try{await y.updateUser(r,a.target.id,{password:a.password}),j({type:"success",text:`Senha de ${a.target.email} redefinida com sucesso.`}),g()}catch(o){i(l=>({...l,busy:!1,error:o.message}))}return}if(a.mode==="DELETE"&&a.target){i(o=>({...o,busy:!0}));try{await y.deleteUser(r,a.target.id),await S(),j({type:"success",text:`Conta ${a.target.email} removida do sistema.`}),g()}catch(o){i(l=>({...l,busy:!1,error:o.message}))}}}const G=d.useMemo(()=>{const s=D.trim().toLowerCase();return p.filter(o=>{const l=!!Number(o.is_revoked);return!(N==="REVOKED"&&!l||N==="ACTIVE"&&l||s&&![o.hostname,o.ip_address,o.unit_name,o.sector_name,o.agent_version].map(me=>u(String(me||"")).toLowerCase()).join(" ").includes(s))})},[p,N,D]),A=p.filter(s=>!!Number(s.is_revoked)).length;async function xe(s){if(M){W(s.id);try{await M(s.id,!Number(s.is_revoked))}finally{W(null)}}}return e.jsxs(Ce,{children:[e.jsxs(Ee,{children:[e.jsx("h1",{children:"Configurações e acesso"}),e.jsx("p",{children:"Gerencie sua senha, contas da equipe de TI e credenciais dos agentes Windows instalados."})]}),e.jsxs($e,{children:[e.jsxs(Ne,{"aria-label":"Seções de configurações",children:[e.jsxs(I,{type:"button",$active:b==="ACCOUNT",onClick:()=>F("ACCOUNT"),children:[e.jsx(X,{size:15}),e.jsx("span",{children:"Minha conta e senha"})]}),m&&e.jsxs(e.Fragment,{children:[e.jsxs(I,{type:"button",$active:b==="USERS",onClick:()=>F("USERS"),children:[e.jsx(he,{size:15}),e.jsx("span",{children:"Usuários e permissões"})]}),e.jsxs(I,{type:"button",$active:b==="AGENTS",onClick:()=>F("AGENTS"),children:[e.jsx(Y,{size:15}),e.jsx("span",{children:"Agentes e segurança"})]})]})]}),e.jsxs(Ae,{children:[b==="ACCOUNT"&&e.jsxs(P,{children:[e.jsx(z,{children:e.jsxs("div",{children:[e.jsx("h2",{children:"Minha conta e senha"}),e.jsx("p",{children:"Altere sua senha de acesso ao painel Pulso RMM com criptografia scrypt."})]})}),e.jsxs(U,{children:[e.jsxs(Pe,{children:[e.jsx("span",{className:"avatar",children:_e(t==null?void 0:t.name)}),e.jsxs("div",{className:"meta",children:[e.jsx("span",{className:"name",children:u((t==null?void 0:t.name)||"Operador")}),e.jsxs("span",{className:"email",children:[t==null?void 0:t.email," · ",Z[t==null?void 0:t.role]||(t==null?void 0:t.role)]})]})]}),e.jsxs(ze,{onSubmit:ce,children:[e.jsxs(x,{children:[e.jsx("label",{htmlFor:"pw-current",children:"Senha atual"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("input",{id:"pw-current",type:f.current?"text":"password",autoComplete:"current-password",required:!0,value:h.current,onChange:s=>$(o=>({...o,current:s.target.value}))}),e.jsx("button",{type:"button",className:"eye-btn","aria-label":"Mostrar ou ocultar senha atual",onClick:()=>R(s=>({...s,current:!s.current})),children:f.current?e.jsx(C,{size:15}):e.jsx(E,{size:15})})]})]}),e.jsxs(x,{children:[e.jsx("label",{htmlFor:"pw-next",children:"Nova senha"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("input",{id:"pw-next",type:f.next?"text":"password",autoComplete:"new-password",required:!0,minLength:8,value:h.next,onChange:s=>$(o=>({...o,next:s.target.value}))}),e.jsx("button",{type:"button",className:"eye-btn","aria-label":"Mostrar ou ocultar nova senha",onClick:()=>R(s=>({...s,next:!s.next})),children:f.next?e.jsx(C,{size:15}):e.jsx(E,{size:15})})]}),e.jsx("span",{className:"hint",children:"Mínimo de 8 caracteres. Recomende combinar letras, números e símbolos."})]}),e.jsxs(x,{children:[e.jsx("label",{htmlFor:"pw-confirm",children:"Confirmar nova senha"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("input",{id:"pw-confirm",type:f.confirm?"text":"password",autoComplete:"new-password",required:!0,minLength:8,value:h.confirm,onChange:s=>$(o=>({...o,confirm:s.target.value}))}),e.jsx("button",{type:"button",className:"eye-btn","aria-label":"Mostrar ou ocultar confirmação da senha",onClick:()=>R(s=>({...s,confirm:!s.confirm})),children:f.confirm?e.jsx(C,{size:15}):e.jsx(E,{size:15})})]})]}),_.text&&e.jsx(L,{$type:_.type,children:_.text}),e.jsx("div",{children:e.jsx(k,{type:"submit",disabled:q,children:q?"Salvando...":"Atualizar senha"})})]})]})]}),b==="USERS"&&m&&e.jsxs(P,{children:[e.jsxs(z,{children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Usuários e permissões"}),e.jsx("p",{children:"Crie operadores, redefina senhas das contas iniciais ou remova acessos que não utiliza."})]}),e.jsxs(k,{type:"button",onClick:()=>{j({type:"",text:""}),i({mode:"CREATE",target:null,name:"",email:"",role:"TECH_N1",isActive:!0,password:"",confirmPassword:"",showPassword:!1,busy:!1,error:""})},children:[e.jsx(ue,{size:14}),e.jsx("span",{children:"Novo usuário"})]})]}),B.text&&e.jsx("div",{style:{padding:"12px 20px 0"},children:e.jsx(L,{$type:B.type,children:B.text})}),e.jsx(ee,{children:e.jsxs(re,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Operador"}),e.jsx("th",{children:"E-mail"}),e.jsx("th",{children:"Perfil"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Ações"})]})}),e.jsx("tbody",{children:te?e.jsx("tr",{children:e.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"26px",color:"#5B655F"},children:"Carregando operadores..."})}):oe.map(s=>{const o=Number(s.id)===Number(t==null?void 0:t.id),l=!!Number(s.is_active);return e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:600},children:[u(s.name),o&&e.jsx(T,{$bg:"rgba(45,106,79,0.10)",$color:"#2D6A4F",style:{marginLeft:8},children:"Você"})]}),e.jsx("td",{className:"mono",children:s.email}),e.jsx("td",{children:e.jsx(T,{$bg:s.role==="ADMIN_N2"?"rgba(45,106,79,0.12)":s.role==="TECH_N1"?"rgba(180,83,9,0.10)":"rgba(100,116,139,0.11)",$color:s.role==="ADMIN_N2"?"#2D6A4F":s.role==="TECH_N1"?"#B45309":"#475569",children:Z[s.role]||s.role})}),e.jsx("td",{children:e.jsx(T,{$bg:l?"rgba(45,106,79,0.09)":"rgba(100,116,139,0.12)",$color:l?"#2D6A4F":"#64748B",children:l?"Ativo":"Inativo"})}),e.jsx("td",{children:e.jsxs("div",{style:{display:"inline-flex",gap:5,whiteSpace:"nowrap"},children:[e.jsxs(w,{type:"button",onClick:()=>i({mode:"EDIT",target:s,name:u(s.name),email:s.email,role:s.role,isActive:l,password:"",confirmPassword:"",showPassword:!1,busy:!1,error:""}),children:[e.jsx(ge,{size:12}),e.jsx("span",{children:"Editar"})]}),e.jsxs(w,{type:"button",$accent:!0,onClick:()=>i({mode:"RESET_PW",target:s,name:u(s.name),email:s.email,role:s.role,isActive:l,password:"",confirmPassword:"",showPassword:!1,busy:!1,error:""}),children:[e.jsx(X,{size:12}),e.jsx("span",{children:"Redefinir senha"})]}),e.jsx(w,{type:"button",$danger:!0,disabled:o,title:o?"Você não pode excluir sua própria conta logada":`Excluir conta ${s.email}`,onClick:()=>i({mode:"DELETE",target:s,name:u(s.name),email:s.email,role:s.role,isActive:l,password:"",confirmPassword:"",showPassword:!1,busy:!1,error:""}),children:e.jsx(be,{size:12})})]})})]},s.id)})})]})})]}),b==="AGENTS"&&m&&e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsxs(z,{children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Instalador oficial do Agente Windows"}),e.jsx("p",{children:"Binário nativo com criptografia DPAPI, TLS 1.2 e verificação SHA-256 em OTA."})]}),e.jsxs(k,{type:"button",onClick:se,children:[e.jsx(fe,{size:14}),e.jsx("span",{children:"Baixar IpojucaRMM-Setup.exe"})]})]}),e.jsx(U,{children:e.jsxs(Te,{children:[e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"m-lbl",children:"Versão publicada"}),e.jsx("span",{className:"m-val",children:(c==null?void 0:c.latest_version)||"2.6.2-native-exe"})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"m-lbl",children:"Tamanho"}),e.jsx("span",{className:"m-val",children:c!=null&&c.size_bytes?`${(c.size_bytes/1024).toFixed(1)} KB`:"—"})]}),e.jsxs("div",{className:"meta-item",children:[e.jsx("span",{className:"m-lbl",children:"SHA-256 oficial"}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{className:"m-val",style:{fontSize:"0.72rem"},children:c!=null&&c.sha256?`${c.sha256.slice(0,20)}...`:"—"}),(c==null?void 0:c.sha256)&&e.jsx(w,{type:"button",onClick:()=>{var s;(s=navigator.clipboard)==null||s.writeText(c.sha256).catch(()=>{}),V(!0),setTimeout(()=>V(!1),1400)},children:de?e.jsx(je,{size:12}):e.jsx(ye,{size:12})})]})]})]})})]}),e.jsxs(P,{children:[e.jsxs(z,{children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Controle de revogação de estações"}),e.jsx("p",{children:A===0?"Nenhuma estação revogada no momento. Revogue imediatamente qualquer equipamento perdido ou comprometido.":`${A} estação(ões) revogada(s) bloqueada(s) de se comunicar com o servidor.`})]}),e.jsxs("div",{style:{display:"inline-flex",gap:8,alignItems:"center"},children:[e.jsxs("div",{style:{position:"relative",display:"inline-flex",alignItems:"center"},children:[e.jsx("span",{style:{position:"absolute",left:9,color:"#7B857F",display:"inline-flex"},children:e.jsx(we,{size:13})}),e.jsx("input",{type:"text",placeholder:"Filtrar hostname...",value:D,onChange:s=>ie(s.target.value),style:{height:32,padding:"0 10px 0 28px",borderRadius:6,border:"1px solid rgba(30,36,32,0.14)",fontSize:"0.76rem"}})]}),e.jsxs("select",{"aria-label":"Filtrar estado de revogação",value:N,onChange:s=>ne(s.target.value),style:{height:32,padding:"0 8px",borderRadius:6,border:"1px solid rgba(30,36,32,0.14)",fontSize:"0.76rem"},children:[e.jsxs("option",{value:"ALL",children:["Todas (",p.length,")"]}),e.jsxs("option",{value:"REVOKED",children:["Revogadas (",A,")"]}),e.jsxs("option",{value:"ACTIVE",children:["Autorizadas (",p.length-A,")"]})]})]})]}),e.jsx(ee,{children:e.jsxs(re,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Estação"}),e.jsx("th",{children:"Unidade / Setor"}),e.jsx("th",{children:"Versão"}),e.jsx("th",{children:"Credencial"}),e.jsx("th",{children:"Ação"})]})}),e.jsx("tbody",{children:G.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:5,style:{textAlign:"center",padding:"24px",color:"#5B655F"},children:"Nenhuma estação encontrada."})}):G.map(s=>{const o=!!Number(s.is_revoked);return e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:700},children:s.hostname}),e.jsxs("td",{children:[u(s.unit_name||"—")," ·"," ",u(s.sector_name||"—")]}),e.jsx("td",{className:"mono",children:s.agent_version||"—"}),e.jsx("td",{children:e.jsx(T,{$bg:o?"rgba(200,30,30,0.10)":"rgba(45,106,79,0.10)",$color:o?"#C81E1E":"#2D6A4F",children:o?"Revogado":"Autorizado"})}),e.jsx("td",{children:e.jsxs(w,{type:"button",$danger:!o,$accent:o,disabled:le===s.id,onClick:()=>xe(s),children:[o?e.jsx(Y,{size:12}):e.jsx(ve,{size:12}),e.jsx("span",{children:o?"Reativar acesso":"Revogar agente"})]})})]},s.id)})})]})})]})]})]})]}),a.mode&&e.jsx(Fe,{onClick:()=>!a.busy&&g(),children:e.jsxs(Re,{onClick:s=>s.stopPropagation(),role:"dialog","aria-modal":"true",children:[e.jsxs("div",{className:"m-head",children:[e.jsxs("h3",{children:[a.mode==="CREATE"&&"Novo operador",a.mode==="EDIT"&&`Editar ${(K=a.target)==null?void 0:K.email}`,a.mode==="RESET_PW"&&`Redefinir senha — ${(J=a.target)==null?void 0:J.email}`,a.mode==="DELETE"&&"Excluir conta de operador"]}),e.jsx(w,{type:"button",onClick:g,"aria-label":"Fechar",children:e.jsx(Se,{size:13})})]}),e.jsxs("form",{onSubmit:pe,style:{display:"flex",flexDirection:"column",gap:13},children:[(a.mode==="CREATE"||a.mode==="EDIT")&&e.jsxs(e.Fragment,{children:[e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-name",children:"Nome completo"}),e.jsx("input",{id:"um-name",type:"text",required:!0,style:{paddingRight:11},value:a.name,onChange:s=>i(o=>({...o,name:s.target.value}))})]}),a.mode==="CREATE"&&e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-email",children:"E-mail de acesso"}),e.jsx("input",{id:"um-email",type:"email",required:!0,style:{paddingRight:11},value:a.email,onChange:s=>i(o=>({...o,email:s.target.value}))})]}),e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-role",children:"Perfil de permissão"}),e.jsxs("select",{id:"um-role",value:a.role,onChange:s=>i(o=>({...o,role:s.target.value})),children:[e.jsx("option",{value:"ADMIN_N2",children:"Admin N2 (acesso completo + usuários + segurança)"}),e.jsx("option",{value:"TECH_N1",children:"Suporte N1 (mapa, ações de diagnóstico e unidades)"}),e.jsx("option",{value:"VIEWER",children:"Gestão (somente visualização e relatórios)"})]})]}),a.mode==="EDIT"&&e.jsxs("label",{style:{display:"inline-flex",alignItems:"center",gap:8,fontSize:"0.8rem",fontWeight:600,cursor:"pointer"},children:[e.jsx("input",{type:"checkbox",checked:a.isActive,onChange:s=>i(o=>({...o,isActive:s.target.checked}))}),e.jsx("span",{children:"Conta ativa (permitir login no painel)"})]}),a.mode==="CREATE"&&e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-pw",children:"Senha inicial (mínimo 8 caracteres)"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("input",{id:"um-pw",type:a.showPassword?"text":"password",required:!0,minLength:8,value:a.password,onChange:s=>i(o=>({...o,password:s.target.value}))}),e.jsx("button",{type:"button",className:"eye-btn",onClick:()=>i(s=>({...s,showPassword:!s.showPassword})),children:a.showPassword?e.jsx(C,{size:15}):e.jsx(E,{size:15})})]})]})]}),a.mode==="RESET_PW"&&e.jsxs(e.Fragment,{children:[e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-reset-pw",children:"Nova senha (mínimo 8 caracteres)"}),e.jsxs("div",{className:"input-wrap",children:[e.jsx("input",{id:"um-reset-pw",type:a.showPassword?"text":"password",required:!0,minLength:8,value:a.password,onChange:s=>i(o=>({...o,password:s.target.value}))}),e.jsx("button",{type:"button",className:"eye-btn",onClick:()=>i(s=>({...s,showPassword:!s.showPassword})),children:a.showPassword?e.jsx(C,{size:15}):e.jsx(E,{size:15})})]})]}),e.jsxs(x,{children:[e.jsx("label",{htmlFor:"um-reset-confirm",children:"Confirmar nova senha"}),e.jsx("input",{id:"um-reset-confirm",type:a.showPassword?"text":"password",required:!0,minLength:8,style:{paddingRight:11},value:a.confirmPassword,onChange:s=>i(o=>({...o,confirmPassword:s.target.value}))})]})]}),a.mode==="DELETE"&&e.jsxs("p",{style:{fontSize:"0.82rem",color:"#5B655F",lineHeight:1.5},children:["Tem certeza que deseja excluir permanentemente a conta"," ",e.jsx("strong",{style:{color:"#1E2420"},children:(Q=a.target)==null?void 0:Q.email}),"? Essa operação é registrada na trilha de auditoria."]}),a.error&&e.jsx(L,{$type:"error",children:a.error}),e.jsxs("div",{className:"m-foot",children:[e.jsx(ke,{type:"button",disabled:a.busy,onClick:g,children:"Cancelar"}),e.jsx(k,{type:"submit",$danger:a.mode==="DELETE",disabled:a.busy,children:a.busy?"Processando...":a.mode==="CREATE"?"Criar conta":a.mode==="EDIT"?"Salvar alterações":a.mode==="RESET_PW"?"Redefinir senha":"Excluir conta"})]})]})]})})]})}export{Ie as SettingsView};
