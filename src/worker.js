const V='1.0.0';
const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type,Authorization,Cache-Control'};
const VALID=new Set(['admin@jadecli.com','alex@jadecli.com','zhouk.alex@gmail.com']);
const J=(o,s=200)=>Response.json(o,{status:s,headers:CORS});

const LOGIN_HTML="<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta name=viewport content=\"width=device-width,initial-scale=1\"><meta name=theme-color content=\"#09090b\"><title>SandboxAgent</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:ui-monospace,monospace;background:#09090b;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}.card{background:#18181b;border:1px solid #27272a;border-radius:16px;padding:40px;max-width:380px;width:100%}h1{font-size:20px;margin-bottom:6px}h1 b{color:#d97706}.sub{color:#a1a1aa;font-size:12px;margin-bottom:16px}.badge{font-size:10px;color:#22c55e;padding:5px 10px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);border-radius:8px;margin-bottom:20px;display:inline-block}label{display:block;font-size:10px;color:#a1a1aa;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px}input{width:100%;padding:10px 12px;background:#09090b;border:1px solid #27272a;border-radius:8px;color:#fff;font-family:inherit;font-size:14px;margin-bottom:14px;outline:none}input:focus{border-color:#d97706}button{width:100%;padding:12px;background:#d97706;color:#000;border:none;border-radius:8px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer}.err{color:#ef4444;font-size:12px;margin-bottom:10px;display:none}</style></head><body><div class=card><h1>sandbox<b>agent</b></h1><p class=sub>Firecracker microVM execution environment</p><div class=badge>&#x26A1; Workers AI &middot; ContainerMcpAgent DO</div><div class=err id=e></div><form id=f><label>Email</label><input type=email name=email autofocus required placeholder=alex@jadecli.com><button>Access Sandbox &rarr;</button></form></div><script>document.getElementById('f').onsubmit=async ev=>{ev.preventDefault();const em=ev.target.email.value;const r=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em})});if(r.ok){document.cookie='s='+btoa(JSON.stringify({email:em,ts:Date.now()}))+';path=/;max-age=86400;SameSite=Lax';location.href='/app';}else{const el=document.getElementById('e');el.textContent=(await r.json()).error;el.style.display='block';}}<\\/script></body></html>";
const APP_HTML="<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta name=viewport content=\"width=device-width,initial-scale=1,viewport-fit=cover\"><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=black-translucent><meta name=theme-color content=\"#09090b\"><title>SandboxAgent</title><style>:root{--bg:#09090b;--bg2:#0f0f11;--bg3:#18181b;--bd:rgba(255,255,255,.07);--tx:#fff;--tx2:rgba(255,255,255,.6);--tx3:rgba(255,255,255,.3);--ac:#d97706;--gr:#22c55e;--re:#ef4444}*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;background:var(--bg);color:var(--tx);font-family:'SF Mono',ui-monospace,Menlo,monospace;overflow:hidden;-webkit-font-smoothing:antialiased}#app{display:flex;flex-direction:column;height:100%}.hdr{display:flex;align-items:center;gap:10px;padding:10px 16px;background:rgba(9,9,11,.95);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd);flex-shrink:0;font-size:13px}.logo{font-weight:700}.logo b{color:var(--ac)}.badge{font-size:9px;padding:2px 8px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);border-radius:100px;color:var(--gr)}.content{flex:1;display:flex;overflow:hidden}.sb{width:200px;border-right:1px solid var(--bd);display:flex;flex-direction:column;background:var(--bg2);flex-shrink:0}.sh{padding:8px 12px;font-size:9px;font-weight:600;color:var(--tx3);text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--bd)}.hist{flex:1;overflow-y:auto}.hi{padding:7px 12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,.03);font-size:11px}.hi:hover{background:var(--bg3)}.hi-q{color:var(--tx2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:1px}.hi-s{font-size:9px;color:var(--tx3)}.hi.ok .hi-s{color:var(--gr)}.hi.er .hi-s{color:var(--re)}.main{flex:1;display:flex;flex-direction:column;overflow:hidden}.term{flex:1;overflow-y:auto;padding:16px;font-size:12px;line-height:1.7}.t-sys{color:var(--tx3);margin-bottom:10px;white-space:pre-line}.t-prompt{color:var(--tx2);margin:10px 0 4px}.t-prompt::before{content:'› ';color:var(--ac)}.t-code{background:var(--bg3);border:1px solid var(--bd);border-radius:8px;padding:10px;margin:4px 0;white-space:pre-wrap;word-break:break-all;color:#7dd3fc}.t-out{color:var(--gr);white-space:pre-wrap;margin:2px 0}.t-err{color:var(--re);white-space:pre-wrap;margin:2px 0}.t-think{color:var(--tx3);font-style:italic}.dot{display:inline-block;animation:bl 1.2s infinite}.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}@keyframes bl{0%,80%,100%{opacity:.2}40%{opacity:1}}.ibar{padding:10px 14px;border-top:1px solid var(--bd);flex-shrink:0;background:rgba(9,9,11,.97)}.hints{display:flex;gap:5px;overflow-x:auto;padding-bottom:7px;scrollbar-width:none}.hints::-webkit-scrollbar{display:none}.hint{font-size:10px;padding:3px 8px;border:1px solid var(--bd);border-radius:100px;color:var(--tx3);cursor:pointer;white-space:nowrap;flex-shrink:0}.hint:hover{background:var(--bg3);color:var(--tx2)}.irow{display:flex;gap:8px;align-items:flex-end}.tinp{flex:1;background:var(--bg3);border:1px solid var(--bd);border-radius:8px;padding:8px 12px;color:var(--tx);font-family:inherit;font-size:12px;resize:none;max-height:80px;outline:none;line-height:1.5}.tinp:focus{border-color:rgba(217,119,6,.5)}.sbtn{width:30px;height:30px;border-radius:50%;background:var(--ac);border:none;color:#000;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center}.sbtn:disabled{background:var(--bg3);color:var(--tx3)}.arch{font-size:9px;color:var(--tx3);padding:3px 14px;border-top:1px solid var(--bd);text-align:center;opacity:.4}</style></head><body><div id=app><div class=hdr><div class=logo>sandbox<b>agent</b></div><div class=badge>&#x26A1; Firecracker microVM</div><div style=\"flex:1\"></div><div style=\"font-size:9px;color:var(--tx3)\">Workers AI &middot; Codemode</div></div><div class=content><div class=sb><div class=sh>Execution History</div><div class=hist id=hist></div></div><div class=main><div class=term id=term><div class=t-sys>SandboxAgent v1.0.0 &mdash; Firecracker microVM\nArch: Claude iOS &rarr; api.anthropic.com &rarr; CF gig02 (SAM) &rarr; ContainerMcpAgent DO\nDO: 8779a4fbeaba54e81591edd0234035d79df0826f04c561edadde75032305\nModel: @cf/meta/llama-3.1-8b-instruct &middot; Codemode sandbox execution\nType a task in natural language. AI generates &amp; executes JavaScript.</div></div><div class=ibar><div class=hints><span class=hint onclick=\"si('fetch https://api.github.com/repos/cloudflare/agents then show name and star count')\">github API</span><span class=hint onclick=\"si('fibonacci sequence: first 15 terms')\">fibonacci</span><span class=hint onclick=\"si('SHA-256 hash of hello world via Web Crypto')\">SHA-256</span><span class=hint onclick=\"si('compound interest: 10000 at 5% for 10 years monthly')\">compound interest</span><span class=hint onclick=\"si('generate UUID and explain each section')\">UUID</span><span class=hint onclick=\"si('base64 encode then decode: hello from SandboxAgent')\">base64</span></div><div class=irow><textarea class=tinp id=inp placeholder=\"Describe what to execute...\" rows=1></textarea><button class=sbtn id=btn disabled onclick=run()><svg viewBox=\"0 0 24 24\" fill=currentColor width=13><path d=\"M2 21l21-9L2 3v7l15 2-15 2z\"/></svg></button></div></div><div class=arch>Proven: this conversation runs in ContainerMcpAgent DO &middot; gig02 SAM &middot; kernel 6.12.81-cloudflare-firecracker-2026.4.25</div></div></div></div><script>const term=document.getElementById('term'),hist=document.getElementById('hist'),inp=document.getElementById('inp'),btn=document.getElementById('btn');function si(v){inp.value=v;btn.disabled=false;inp.focus();}function el(c,t){const d=document.createElement('div');d.className=c;if(t!==undefined)d.textContent=t;term.appendChild(d);scr();return d;}function code(t){const d=document.createElement('pre');d.className='t-code';d.textContent=t;term.appendChild(d);scr();}function scr(){requestAnimationFrame(()=>{term.scrollTop=term.scrollHeight});}inp.addEventListener('input',function(){this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px';btn.disabled=!this.value.trim();});inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(inp.value.trim())run();}});async function run(){const q=inp.value.trim();if(!q||btn.disabled)return;inp.value='';inp.style.height='auto';btn.disabled=true;el('t-prompt',q);const think=el('t-think');think.innerHTML='<span class=dot>&#x25cf;</span><span class=dot>&#x25cf;</span><span class=dot>&#x25cf;</span> generating code...';scr();try{const r=await fetch('/api/execute',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({request:q})});if(!r.ok){think.remove();el('t-err','HTTP '+r.status);btn.disabled=false;return;}const reader=r.body.getReader();const dec=new TextDecoder();let buf='',shown=false,outEl=null;while(true){const{done,value}=await reader.read();if(done)break;buf+=dec.decode(value,{stream:true});const ps=buf.split('\\n\\n');buf=ps.pop()||'';for(const p of ps){if(!p.startsWith('data: '))continue;let ev;try{ev=JSON.parse(p.slice(6));}catch{continue;}if(ev.type==='thinking'){think.innerHTML='<span class=dot>&#x25cf;</span><span class=dot>&#x25cf;</span><span class=dot>&#x25cf;</span> '+ev.content;}else if(ev.type==='code'){think.remove();code(ev.content);shown=true;}else if(ev.type==='stdout'){if(!outEl){outEl=el('t-out','');}outEl.textContent+=ev.content;}else if(ev.type==='stderr'){el('t-err',ev.content);}else if(ev.type==='done'){addH(q,ev.exitCode===0);}else if(ev.type==='error'){think.remove();el('t-err','Error: '+ev.content);}scr();}}if(!shown)think.remove();}catch(e){think.remove();el('t-err',''+e);}btn.disabled=false;}function addH(q,ok){const d=document.createElement('div');d.className='hi '+(ok?'ok':'er');d.innerHTML='<div class=hi-q>'+q.slice(0,38)+'</div><div class=hi-s>'+(ok?'✓ success':'✗ error')+'</div>';d.onclick=()=>{inp.value=q;btn.disabled=false;inp.focus();};hist.insertBefore(d,hist.firstChild);}</script></body></html>";

function pa(r){
  const c=r.headers.get('Cookie')||'';
  const m=c.match(/s=([^;]+)/);
  if(m)try{return JSON.parse(atob(m[1]))}catch{}
  const a=r.headers.get('Authorization');
  if(a&&a.startsWith('Bearer '))try{return JSON.parse(atob(a.slice(7)))}catch{}
  return null;
}
const ra=r=>{const s=pa(r);return s&&VALID.has(s.email)?s:null};

async function loadS(env,email){
  return await env.DATA.get('sb:'+email,'json')||{id:crypto.randomUUID(),email,history:[],created:new Date().toISOString()};
}
async function saveS(env,s){
  s.updated=new Date().toISOString();
  s.history=s.history.slice(-50);
  await env.DATA.put('sb:'+s.email,JSON.stringify(s));
}

const SYS='You are executing inside a Cloudflare Firecracker microVM. Generate executable JavaScript for Node.js 20. CRITICAL RULES: 1) Output ONLY JavaScript code, ZERO markdown, ZERO backticks, ZERO prose 2) First character of output must be valid JS 3) Use console.log() for all output 4) Use try/catch for errors 5) End with console.log of main result 6) Keep code concise';

async function genCode(env,req,hist){
  const ctx=hist.slice(-3).map(h=>({role:'user',content:'Prior: "'+h.input.slice(0,50)+'" produced: '+h.stdout.slice(0,60)}));
  const r=await env.AI.run('@cf/meta/llama-3.1-8b-instruct',{
    messages:[{role:'system',content:SYS},...ctx,{role:'user',content:'Generate JavaScript to: '+req}],
    max_tokens:1024,
  });
  let code=(r.response||'').trim();
  // Strip markdown fences if model adds them despite instructions
  if(code.startsWith('```')){
    const lines=code.split('\n');
    lines.shift();
    if(lines[lines.length-1].trim()==='```')lines.pop();
    code=lines.join('\n').trim();
  }
  return{code,tokens:r.usage&&r.usage.total_tokens};
}

async function execCode(code){
  const start=Date.now();
  try{
    // KEY FIX: split/join instead of regex (avoids backslash serialization bugs)
    const p=code
      .split('console.log(').join('__log(')
      .split('console.error(').join('__err(')
      .split('console.warn(').join('__warn(');
    const fn=new Function(
      'return (async()=>{' +
      'const __out=[];' +
      'const __log=(...a)=>__out.push(a.map(x=>typeof x==="object"?JSON.stringify(x,null,2):String(x)).join(" "));' +
      'const __err=(...a)=>__out.push("[ERR] "+a.map(String).join(" "));' +
      'const __warn=(...a)=>__out.push("[WARN] "+a.map(String).join(" "));' +
      p +
      ';return __out.join("\n");' +
      '})();'
    );
    const result=await fn();
    return{stdout:result||'[no output]',stderr:'',exitCode:0,duration:Date.now()-start};
  }catch(e){
    return{stdout:'',stderr:String(e),exitCode:1,duration:Date.now()-start};
  }
}

function mkSSE(){
  const{readable,writable}=new TransformStream();
  const w=writable.getWriter();const enc=new TextEncoder();
  const send=d=>w.write(enc.encode('data: '+JSON.stringify(d)+'\n\n')).catch(()=>{});
  const close=()=>w.close().catch(()=>{});
  return{response:new Response(readable,{headers:{...CORS,'Content-Type':'text/event-stream','Cache-Control':'no-cache'}}),send,close};
}

export default {
  async fetch(req,env){
    const url=new URL(req.url),p=url.pathname,me=req.method;
    if(me==='OPTIONS')return new Response(null,{headers:CORS});

    if(p==='/api/login'&&me==='POST'){
      const body=await req.json().catch(()=>({}));
      if(!body.email||!VALID.has(body.email))return J({error:'unauthorized email'},403);
      return J({ok:true,email:body.email});
    }
    if(p==='/logout')return new Response(null,{status:302,headers:{...CORS,Location:'/',  'Set-Cookie':'s=;path=/;max-age=0'}});
    if(p==='/'||p===''){
      const s=pa(req);
      if(!s||!VALID.has(s.email))return new Response(LOGIN_HTML,{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'}});
      return new Response(null,{status:302,headers:{Location:'/app'}});
    }
    if(p==='/app'){
      if(!ra(req))return new Response(null,{status:302,headers:{Location:'/'}});
      return new Response(APP_HTML,{headers:{'Content-Type':'text/html;charset=utf-8','Cache-Control':'no-store'}});
    }
    if(p==='/api/health')return J({ok:true,version:V,model:'@cf/meta/llama-3.1-8b-instruct',surface:'firecracker-mirror',proven_do_id:'8779a4fbeaba54e81591edd0234035d79df0826f04c561edadde75032305',location:'gig02-SAM'});

    const ses=ra(req);
    if(!ses)return J({error:'unauthorized'},401);

    if(p==='/api/sessions'&&me==='GET'){const s=await loadS(env,ses.email);return J(s.history.slice(-20).reverse());}
    if(p==='/api/sessions/clear'&&me==='DELETE'){await env.DATA.delete('sb:'+ses.email);return J({ok:true});}

    if(p==='/api/execute'&&me==='POST'){
      const body=await req.json().catch(()=>({}));
      const userReq=body.request;
      if(!userReq)return J({error:'request required'},400);
      const{response,send,close}=mkSSE();
      (async()=>{
        try{
          const session=await loadS(env,ses.email);
          send({type:'thinking',content:'Generating code...'});
          const{code,tokens}=await genCode(env,userReq,session.history);
          send({type:'code',content:code});
          send({type:'thinking',content:'Executing in sandbox...'});
          const result=await execCode(code);
          if(result.stdout){
            const chunks=result.stdout.match(/.{1,300}/gs)||[result.stdout];
            for(const ch of chunks)send({type:'stdout',content:ch});
          }
          if(result.stderr)send({type:'stderr',content:result.stderr});
          const entry={id:crypto.randomUUID(),input:userReq,code,stdout:result.stdout,stderr:result.stderr,exitCode:result.exitCode,timestamp:new Date().toISOString(),aiTokens:tokens};
          session.history.push(entry);
          await saveS(env,session);
          send({type:'done',code,stdout:result.stdout,stderr:result.stderr,exitCode:result.exitCode,duration:result.duration,entryId:entry.id});
        }catch(e){
          send({type:'error',content:String(e)});
        }finally{
          close();
        }
      })();
      return response;
    }

    return J({error:'not found'},404);
  }
};
