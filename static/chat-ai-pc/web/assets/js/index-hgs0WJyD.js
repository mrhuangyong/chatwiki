var je=Object.defineProperty;var Ne=(e,t,s)=>t in e?je(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var L=(e,t,s)=>(Ne(e,typeof t!="symbol"?t+"":t,s),s);import{j as q,w as Z,b as Se,o as Ve,k as O,q as ke,r as k,g as He,t as Me,f as J,I as Ce,e as ae,x as F,y as C,D as E,E as b,u as P,J as re,K as z,L as Ye,G as de,M as me,N as Ae,O as We,n as fe,P as ie,Q as Te,S as ze,A as Qe,T as $e,U as Je,z as Ke}from"./vue-chunks-CcylVCd3.js";import{c as Ze,p as Xe,m as te,n as se,A as Ge,i as ge,I as et,L as tt,C as st,e as Oe,s as ot,D as nt,d as at,S as pe,v as ve,y as rt,E as Ee,F as j}from"./index.js";import{a as it}from"./axios-B4uVmeYG.js";import{q as lt}from"./qs-DrHefV6n.js";import{P as ct,m as ut,b as dt}from"./mount-component-CTbm9LwS.js";import"./dayjs-C4iS2aBk.js";import"./crypto-js-BJ7SvduI.js";let Y=0;function mt(e){e?(Y||document.body.classList.add("van-toast--unclickable"),Y++):Y&&(Y--,Y||document.body.classList.remove("van-toast--unclickable"))}const[ft,D]=Ze("toast"),gt=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay","zIndex"],pt={icon:String,show:Boolean,type:te("text"),overlay:Boolean,message:se,iconSize:se,duration:Ge(2e3),position:te("middle"),teleport:[String,Object],wordBreak:String,className:ge,iconPrefix:String,transition:te("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:ge,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean,zIndex:se};var xe=q({name:ft,props:pt,emits:["update:show"],setup(e,{emit:t,slots:s}){let o,a=!1;const n=()=>{const g=e.show&&e.forbidClick;a!==g&&(a=g,mt(a))},r=g=>t("update:show",g),c=()=>{e.closeOnClick&&r(!1)},i=()=>clearTimeout(o),u=()=>{const{icon:g,type:_,iconSize:h,iconPrefix:m,loadingType:p}=e;if(g||_==="success"||_==="fail")return O(et,{name:g||_,size:h,class:D("icon"),classPrefix:m},null);if(_==="loading")return O(tt,{class:D("loading"),size:h,type:p},null)},f=()=>{const{type:g,message:_}=e;if(s.message)return O("div",{class:D("text")},[s.message()]);if(st(_)&&_!=="")return g==="html"?O("div",{key:0,class:D("text"),innerHTML:String(_)},null):O("div",{class:D("text")},[_])};return Z(()=>[e.show,e.forbidClick],n),Z(()=>[e.show,e.type,e.message,e.duration],()=>{i(),e.show&&e.duration>0&&(o=setTimeout(()=>{r(!1)},e.duration))}),Se(n),Ve(n),()=>O(ct,ke({class:[D([e.position,e.wordBreak==="normal"?"break-normal":e.wordBreak,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:c,onClosed:i,"onUpdate:show":r},Xe(e,gt)),{default:()=>[u(),f()]})}});const vt={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let Q=[],ht=!1,he=Oe({},vt);const _t=new Map;function yt(e){return nt(e)?e:{message:e}}function bt(){const{instance:e,unmount:t}=ut({setup(){const s=k(""),{open:o,state:a,close:n,toggle:r}=dt(),c=()=>{},i=()=>O(xe,ke(a,{onClosed:c,"onUpdate:show":r}),null);return Z(s,u=>{a.message=u}),He().render=i,{open:o,close:n,message:s}}});return e}function wt(){if(!Q.length||ht){const e=bt();Q.push(e)}return Q[Q.length-1]}function X(e={}){if(!ot)return{};const t=wt(),s=yt(e);return t.open(Oe({},he,_t.get(s.type||he.type),s)),t}at(xe);const St=0,kt="application/x-www-form-urlencoded;charset=UTF-8",Mt=5*60*1e3,le=new URL(""+new URL("../img/user_avatar_2x-D7HF6Y-m.png",import.meta.url).href,import.meta.url).href,Ct=new URL("data:image/svg+xml,%3csvg%20width='62'%20height='62'%20viewBox='0%200%2062%2062'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='31'%20cy='31'%20r='31'%20fill='url(%23paint0_linear_930_6995)'/%3e%3cpath%20d='M39%2036.3346C41.9455%2036.3346%2044.3333%2033.9468%2044.3333%2031.0013C44.3333%2028.0558%2041.9455%2025.668%2039%2025.668'%20stroke='%23F2F4FF'%20stroke-width='2.66667'%20stroke-linejoin='round'/%3e%3cpath%20d='M23.0013%2025.668C20.0558%2025.668%2017.668%2028.0558%2017.668%2031.0013C17.668%2033.9468%2020.0558%2036.3346%2023.0013%2036.3346'%20stroke='%23F2F4FF'%20stroke-width='2.66667'%20stroke-linejoin='round'/%3e%3cpath%20d='M23%2036.3346V36.0013V34.3346V31.0013V25.668C23%2021.2497%2026.5817%2017.668%2031%2017.668C35.4183%2017.668%2039%2021.2497%2039%2025.668V36.3346C39%2040.7529%2035.4183%2044.3346%2031%2044.3346'%20stroke='%23F2F4FF'%20stroke-width='2.66667'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cdefs%3e%3clinearGradient%20id='paint0_linear_930_6995'%20x1='31'%20y1='0'%20x2='31'%20y2='62'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23336DFF'/%3e%3cstop%20offset='1'%20stop-color='%23495EFF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e",import.meta.url).href,At=new URL("data:image/png;base64,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",import.meta.url).href;function Ie(e,t){if(t)try{t=JSON.parse(JSON.stringify(t))}catch(s){console.error("Failed to stringify data:",s);return}if(window.parent&&typeof window.parent.postMessage=="function")try{window.parent.postMessage({action:e,data:t},"*")}catch(s){console.error("Failed to post message:",s)}else console.warn("window.parent is not available or postMessage is not supported.")}function Tt(e){Ie("init",e)}function Ot(){Ie("closeChat")}async function Et(e,t){const s=e.getReader();let o;for(;!(o=await s.read()).done;)t(o.value)}function xt(e){let t,s,o,a=!1;return function(r){t===void 0?(t=r,s=0,o=-1):t=Lt(t,r);const c=t.length;let i=0;for(;s<c;){a&&(t[s]===10&&(i=++s),a=!1);let u=-1;for(;s<c&&u===-1;++s)switch(t[s]){case 58:o===-1&&(o=s-i);break;case 13:a=!0;case 10:u=s;break}if(u===-1)break;e(t.subarray(i,u),o),i=s,o=-1}i===c?t=void 0:i!==0&&(t=t.subarray(i),s-=i)}}function It(e,t,s){let o=_e();const a=new TextDecoder;return function(r,c){if(r.length===0)s==null||s(o),o=_e();else if(c>0){const i=a.decode(r.subarray(0,c)),u=c+(r[c+1]===32?2:1),f=a.decode(r.subarray(u));switch(i){case"data":o.data=o.data?o.data+`
`+f:f;break;case"event":o.event=f;break;case"id":e(o.id=f);break;case"retry":const g=parseInt(f,10);isNaN(g)||t(o.retry=g);break}}}}function Lt(e,t){const s=new Uint8Array(e.length+t.length);return s.set(e),s.set(t,e.length),s}function _e(){return{data:"",event:"",id:"",retry:void 0}}var qt=function(e,t){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(s[o[a]]=e[o[a]]);return s};const G="text/event-stream",Bt=1e3,ye="last-event-id";function Rt(e,t){var{signal:s,headers:o,onopen:a,onmessage:n,onclose:r,onerror:c,openWhenHidden:i,fetch:u}=t,f=qt(t,["signal","headers","onopen","onmessage","onclose","onerror","openWhenHidden","fetch"]);return new Promise((g,_)=>{const h=Object.assign({},o);h.accept||(h.accept=G);let m;function p(){m.abort(),document.hidden||V()}i||document.addEventListener("visibilitychange",p);let M=Bt,I=0;function x(){document.removeEventListener("visibilitychange",p),window.clearTimeout(I),m.abort()}s==null||s.addEventListener("abort",()=>{x(),g()});const y=u??window.fetch,B=a??Dt;async function V(){var H;m=new AbortController;try{const R=await y(e,Object.assign(Object.assign({},f),{headers:h,signal:m.signal}));await B(R),await Et(R.body,xt(It(A=>{A?h[ye]=A:delete h[ye]},A=>{M=A},n))),r==null||r(),x(),g()}catch(R){if(!m.signal.aborted)try{const A=(H=c==null?void 0:c(R))!==null&&H!==void 0?H:M;window.clearTimeout(I),I=window.setTimeout(V,A)}catch(A){x(),_(A)}}}V()})}function Dt(e){const t=e.headers.get("content-type");if(!(t!=null&&t.startsWith(G)))throw new Error(`Expected content-type to be ${G}, Actual: ${t}`)}class Ft{constructor(t={}){L(this,"onOpen");L(this,"onClose");L(this,"onError");L(this,"onMessage");L(this,"opt",{url:"",data:{}});L(this,"controller",new AbortController);this.opt={...this.opt,...t},this.open()}open(){const t=new FormData;for(const s in this.opt.data)Object.prototype.hasOwnProperty.call(this.opt.data,s)&&t.append(s,this.opt.data[s]);Rt(this.opt.url,{method:"POST",signal:this.controller.signal,openWhenHidden:!0,body:t,onopen:async s=>{if(s.ok&&s.headers.get("content-type")===G)typeof this.onOpen=="function"&&this.onOpen();else throw s.status>=400&&s.status<500&&s.status!==429?new Error("连接出错"):new Error("连接出错")},onmessage:s=>{typeof this.onMessage=="function"&&this.onMessage(s)},onclose:()=>{typeof this.onClose=="function"&&this.onClose(),this.controller.abort()},onerror:s=>{typeof this.onError=="function"&&this.onError(s)}})}abort(){this.controller.abort()}}const Pt={avater:le},ue=Me("user",()=>J({...Pt}));function Ut(e){const t=new FormData;return Object.keys(e).forEach(s=>{e[s]!==void 0&&e[s]!==null&&t.append(s,e[s])}),t}function W(e=16,t=0){const s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[];let a;if(t=t||s.length,e)for(a=0;a<e;a++)o[a]=s[0|Math.random()*t];else{let n;for(o[8]=o[13]=o[18]=o[23]="-",o[14]="4",a=0;a<36;a++)o[a]||(n=0|Math.random()*16,o[a]=s[a==19?n&3|8:n])}return o.join("")}function Le(){let e=pe.get("openid");return e||(e=W(16),pe.set("openid",e)),e}function be(e){return e.replace(/[&<"']/g,function(t){switch(t){case"&":return"&amp;";case"<":return"&lt;";case'"':return"&quot;";default:return"&#039;"}})}const we=(e,t)=>t,qe=e=>{const t={t:n=>we(e,n)};if(!ve)return t;const{t:s,...o}=ve.global;return{...o,t:(n,...r)=>n?!n.includes(".")&&!e?n:s(we(e,n),...r):""}};function jt(e){const{t}=qe();let s=e.response.status,o=e.response.data.message||e.message,a="";switch(s){case 400:a=`${o}`;break;case 401:a=t("common.errMsg401");break;case 403:a=t("common.errMsg403");break;case 404:a=t("common.errMsg404");break;case 405:a=t("common.errMsg405");break;case 408:a=t("common.errMsg408");break;case 500:a=t("common.errMsg500");break;case 501:a=t("common.errMsg501");break;case 502:a=t("common.errMsg502");break;case 503:a=t("common.errMsg503");break;case 504:a=t("common.errMsg504");break;case 505:a=t("common.errMsg505");break;default:a=`${o}`}return a}let oe=!1;function Be(e){oe||(oe=!0,X(e),setTimeout(()=>{oe=!1},200))}const Nt=e=>{if(e.method==="post"&&e.headers["Content-Type"]==="application/x-www-form-urlencoded"?e.data=lt.stringify(e.data):e.method==="post"&&e.headers["Content-Type"]==="multipart/form-data"&&(e.data=Ut(e.data)),e.method==="get"&&e.params){let t=e.url;t+="?";const s=Object.keys(e.params);for(const o of s)e.params[o]!==void 0&&e.params[o]!==null&&(t+=`${o}=${encodeURIComponent(e.params[o])}&`);t=t.substring(0,t.length-1),e.params={},e.url=t}return e},Vt=e=>{var t,s,o;if(e.data&&typeof e.data.res<"u"&&(e.data.code=e.data.res,e.data.message=e.data.msg||""),((t=e==null?void 0:e.config)==null?void 0:t.responseType)==="blob")return e;if(e.data.code===St)return e.data;if(X((s=e==null?void 0:e.data)==null?void 0:s.message),((o=e==null?void 0:e.data)==null?void 0:o.code)===401)ue().logout();else return Promise.reject(e.data)},Ht=e=>e.response?(console.log("response err： "+e),Wt(e)):e.request?(console.log("request err： "+e),Yt(e)):Promise.reject(e),Yt=e=>{var i,u,f;const{t}=qe(),{response:s,code:o,message:a}=e||{},n=((u=(i=s==null?void 0:s.data)==null?void 0:i.error)==null?void 0:u.message)??"",r=((f=e==null?void 0:e.toString)==null?void 0:f.call(e))??"";let c="";return o==="ECONNABORTED"&&a.indexOf("timeout")!==-1?c=t("common.apiTimeoutMessage"):r!=null&&r.includes("Network Error")?c=t("common.networkExceptionMsg"):c=n,Be(c),Promise.reject(e)},Wt=e=>{var o;let t=(o=e==null?void 0:e.response)==null?void 0:o.status,s=jt(e);return Be(s),t===401&&ue().logout(),Promise.reject(e)},zt="",U=new Map,N=it.create({timeout:Mt,baseURL:zt});N.interceptors.request.use(e=>{const t=new AbortController,s=e.url||"";return e.signal=t.signal,U.set(s,t),e});N.interceptors.response.use(e=>{const t=e.config.url||"";return U.delete(t),e},e=>Promise.reject(e));N.interceptors.request.use(Nt);N.interceptors.response.use(Vt);N.interceptors.response.use(void 0,Ht);const ce={request:e=>new Promise((t,s)=>{var o;(o=e.interceptors)!=null&&o.requestInterceptors&&(e=e.interceptors.requestInterceptors(e)),N.request(e).then(a=>{t(a)}).catch(a=>{s(a)})}),cancelRequest:e=>{var s;const t=Array.isArray(e)?e:[e];for(const o of t)(s=U.get(o))==null||s.abort(),U.delete(o)},cancelAllRequest(){for(const[e,t]of U)t.abort();U.clear()}},$=e=>{const t=ue(),s=rt(),{url:o,method:a,params:n,data:r,headers:c,responseType:i,withToken:u}=e,f=s.getCurrentLocale,g={"Content-Type":kt,"X-Requested-With":"XMLHttpRequest",lang:f.lang,...c};return u||(g.token=t.getToken??""),ce.request({url:o,method:a,params:n,data:r,responseType:i,headers:{...g}})},ee={get:e=>$({method:"get",...e}),post:e=>$({method:"post",...e}),delete:e=>$({method:"delete",...e}),put:e=>$({method:"put",...e}),cancelRequest:e=>ce.cancelRequest(e),cancelAllRequest:()=>ce.cancelAllRequest()},Qt="",$t=e=>new Ft({url:Qt+"/chat/request",data:e}),Jt=e=>ee.post({url:"/chat/welcome",data:e}),Kt=e=>ee.post({url:"/manage/getDialogueList",data:e}),Zt=e=>ee.post({url:"/chat/message",data:e}),Xt=({id:e,prompt:t})=>ee.post({url:"/manage/editPrompt",data:{id:e,prompt:t}}),K=Me("chat",()=>{const e=Ee(),t=k([]);let s=null;const o=k(0),a=k(""),n=J({admin_user_id:"",avatar:"",id:"",name:"",nickname:"",openid:""}),r=J({id:null,library_ids:"",prompt:"",robot_avatar:"",robot_intro:"",robot_key:"",robot_name:"",openid:"",welcomes:{content:"",question:[]}}),c=J({headTitle:"WikiChat.com",headSubTitle:"Based on LLM, free and open-source.",headImage:At,headBackgroundColor:"linear-gradient,to right,#2435E7,#01A0FB",lang:"zh-CN"}),i=k(!1),u=async l=>{s&&(s.abort(),s=null),t.value=[],A.value=!1,p.value=!1,l.dialogue_id?(i.value=!1,o.value=l.dialogue_id):(i.value=!0,o.value=0),a.value=l.openid||Le(),r.robot_key=l.robot_key,r.openid=a.value,n.openid=a.value,n.avatar=l.avatar||le,n.name=l.name||"",n.nickname=l.nickname||"";const v=await Jt({robot_key:r.robot_key,openid:a.value,nickname:n.nickname,name:n.name,avatar:n.avatar||le});try{const w=v.data.customer,d=v.data.robot;return n.admin_user_id=w.admin_user_id,n.avatar=w.avatar,n.id=w.id,n.name=w.name,n.nickname=w.nickname,r.library_ids=d.library_ids,r.prompt=d.prompt,r.robot_avatar=d.robot_avatar,r.robot_intro=d.robot_intro,r.robot_key=d.robot_key,r.robot_name=d.robot_name,r.library_ids=d.library_ids,r.id=d.id,d.welcomes&&(r.welcomes=JSON.parse(d.welcomes)),f(v.data.message),d.external_config_pc&&Object.assign(c,JSON.parse(d.external_config_pc)),v}catch(w){Promise.reject(w)}},f=l=>{l&&(l.uid=W(32),l.loading=!1,l.isWelcome=!0,l.avatar=r.robot_avatar,l.menu_json&&(l.menu_json=JSON.parse(l.menu_json)),l.quote_file&&(l.quote_file=JSON.parse(l.quote_file)),t.value.push(l))},g=l=>{l.uid=W(32),l.loading=!1,l.avatar=n.avatar,l.openid=n.openid,l.msg_type=1,l.is_customer=1,t.value.push(l)},_=l=>{t.value.push(l),e.emit("updateAiMessage",l)},h=(l,v,w)=>{const d=t.value.findIndex(S=>S.uid==w);if(l=="sending"){const S=t.value[d].content;t.value[d].content=S+v}l=="quote_file"&&(t.value[d].quote_file=v.length>0?v:[]),l=="ai_message"&&(t.value[d].id=v.id),l=="debug"&&(t.value[d].debug=v.length>0?v:[]),e.emit("updateAiMessage",t.value[d])},m=()=>{const l=t.value.length-1;t.value[l].loading=!1},p=k(!1),M=l=>{if(p.value)return;const v={loading:!0,id:"",content:"",uid:W(32),avatar:r.robot_avatar,msg_type:1,quote_file:[],is_customer:0,debug:[]},w={robot_key:r.robot_key,openid:r.openid,question:l.message,prompt:r.prompt,library_ids:r.library_ids,dialogue_id:o.value};p.value=!0,s=$t(w),s.onMessage=d=>{if(d.event=="dialogue_id"&&(o.value=d.data),d.event=="c_message"){const S=JSON.parse(d.data);g(S)}if(d.event=="robot"&&(_(v),i.value&&(i.value=!1)),d.event=="sending"&&h("sending",d.data,v.uid),d.event=="ai_message"){const S=JSON.parse(d.data);h("ai_message",S,v.uid)}if(d.event=="quote_file"){const S=JSON.parse(d.data);h("quote_file",S,v.uid)}if(d.event=="debug"){const S=JSON.parse(d.data);h("debug",S,v.uid)}},s.onClose=()=>{m(),p.value=!1,s=null}},I=25,x=k([]),y=k(!1),B=k(!1),V=async()=>{if(B.value||y.value)return!1;let l=0;x.value.length>0&&(l=x.value[x.value.length-1].id),y.value=!0;const v=await Kt({min_id:l,size:I,robot_key:r.robot_key});y.value=!1;const w=v.data||[];return w.length===0?(B.value=!0,!1):(x.value=[...x.value,...w],v)},H=async l=>await u(l),R=20,A=k(!1),Re=async()=>{if(A.value)return;let l=0;const v=t.value.filter(d=>!d.isWelcome);v.length>0&&(l=v[0].id);const w={robot_key:r.robot_key,openid:n.openid,min_id:l,size:R,dialogue_id:o.value};try{const d=await Zt(w),S=d.data.list||[];if(S.length===0){A.value=!0;return}return S.sort((T,Ue)=>T.id-Ue.id),S.forEach(T=>{T.loading=!1,T.uid=W(32),T.is_customer==1?T.avatar=n.avatar:T.avatar=r.robot_avatar,T.menu_json&&(T.menu_json=JSON.parse(T.menu_json)),T.quote_file&&(T.quote_file=JSON.parse(T.quote_file))}),t.value=[...S,...t.value],d}catch(d){Promise.reject(d)}},De=l=>{r.prompt=l},Fe=()=>Xt({id:r.id,prompt:r.prompt});function Pe(){o.value=0,t.value=[],a.value="",n.admin_user_id="",n.avatar="",n.id="",n.name="",n.nickname="",n.openid="",r.id=null,r.library_ids="",r.prompt="",r.robot_avatar="",r.robot_intro="",r.robot_key="",r.robot_key="",r.robot_name="",r.openid="",r.welcomes={content:"",question:[]},i.value=!1,A.value=!1,p.value=!1,y.value=!1,B.value=!1,x.value=[]}return{$reset:Pe,user:n,robot:r,dialogue_id:o,openid:a,sendLock:p,messageList:t,createChat:u,sendMessage:M,getMyChatList:V,myChatList:x,openChat:H,onGetChatMessage:Re,changeRobotPrompt:De,saveRobotPrompt:Fe,externalConfigPC:c}}),Gt={class:"chat-header-body"},es=["src"],ts={class:"robot-info"},ss={class:"robot-name"},os={class:"robot-intro"},ns=q({__name:"chat-header",setup(e){const t=K(),{externalConfigPC:s}=Ce(t),{headBackgroundColor:o}=s.value,a=ae(()=>{const[r,c,i,u]=o.split(",");return r==="color"?i:`${r}(${c}, ${i}, ${u})`}),n=()=>{Ot()};return(r,c)=>{const i=F("svg-icon");return C(),E("div",{class:"chat-header",style:Ye({background:a.value})},[O(i,{class:"close-btn",name:"close",onClick:n}),b("div",Gt,[P(s).headImage?(C(),E("img",{key:0,class:"avatar",src:P(s).headImage,alt:""},null,8,es)):re("",!0),b("div",ts,[b("div",ss,z(P(s).headTitle),1),b("div",os,z(P(s).headSubTitle),1)])])],4)}}}),as=j(ns,[["__scopeId","data-v-4dec102c"]]),rs=["value","onKeydown"],ne=22,is=3,ls=q({__name:"auto-size-textarea",props:{value:{type:String,default:""}},emits:["update:value","change","focus","blur","enter","shiftEnter"],setup(e,{emit:t}){const s=e,o=t,a=ne*is,n=k(null);function r(){o("focus")}function c(){o("blur")}function i(m){m.shiftKey||o("enter")}function u(m){var p=m.value,M=m.selectionStart;return M===p.length}function f(){if(n.value){const m=n.value.selectionStart,p=n.value.value.slice(0,m)+`
`+n.value.value.slice(m);n.value.value=p,u(n.value)&&(n.value.scrollTop=n.value.scrollHeight),n.value.setSelectionRange(m+1,m+1),h()}}function g(m){m.preventDefault(),f(),o("shiftEnter")}function _(m){const p=m.target;o("update:value",p.value),o("change",p.value),h()}function h(){n.value&&(n.value.style.height="auto",n.value.scrollHeight>a?n.value.style.height=`${a}px`:n.value.value.length==0?n.value.style.height=`${ne}px`:n.value.style.height=`${n.value.scrollHeight}px`)}return Z(()=>s.value,()=>{!s.value&&n.value&&(n.value.style.height=`${ne}px`)}),Se(()=>{n.value&&h()}),(m,p)=>(C(),E("textarea",{class:"auto-size-textarea",rows:"1",ref_key:"textareaRef",ref:n,value:s.value,onInput:_,onFocus:r,onBlur:c,onKeydown:[de(me(i,["prevent","exact"]),["enter"]),de(me(g,["shift","prevent"]),["enter"])],placeholder:"在此输入，Shift+Enter换行"},null,40,rs))}}),cs=j(ls,[["__scopeId","data-v-a17959af"]]),us={class:"message-input-box"},ds={class:"message-input-body"},ms=q({__name:"message-input",props:{value:{type:String,default:""}},emits:["update:value","send"],setup(e,{emit:t}){const s=t,o=e,a=k(!1),n=c=>{s("update:value",c)},r=()=>{o.value.trim()&&s("send",o.value)};return(c,i)=>{const u=F("svg-icon");return C(),E("div",us,[b("div",ds,[b("div",{class:Ae(["message-input",{"is-focus":a.value}])},[O(cs,{value:e.value,class:"text-input",onChange:n,onFocus:i[0]||(i[0]=f=>a.value=!0),onBlur:i[1]||(i[1]=f=>a.value=!1),onEnter:r},null,8,["value"]),O(u,{name:"paper-airplane",class:"send-btn",onClick:r})],2)])])}}}),fs=j(ms,[["__scopeId","data-v-866348a9"]]),gs=q({__name:"message-list",props:{messages:{type:Array,default:()=>[]}},emits:["clickMsgMeun","scroll","scrollStart","scrollEnd"],setup(e,{expose:t,emit:s}){const o=s,a=e,n=k(null),r={scrollTop:0,scrollHeight:0,clientHeight:0,scrollStartDiff:60,scrollEndDiff:60};let c=null,i=!1;function u(){a.messages.length!=0&&o("scrollStart",{msg:a.messages[0]})}function f(){a.messages.length!=0&&o("scrollEnd",{msg:a.messages[a.messages.length-1]})}function g(m){i||(c!==null&&(clearTimeout(c),c=null),c=window.setTimeout(()=>{r.scrollTop=m.target.scrollTop,r.scrollHeight=m.target.scrollHeight,r.clientHeight=m.target.clientHeight,o("scroll",{...r}),Math.abs(r.scrollTop)<=r.scrollStartDiff&&u(),Math.abs(r.scrollHeight-r.scrollTop-r.clientHeight)<=r.scrollEndDiff&&f()},50))}const _=()=>{n.value&&fe(()=>{i=!0,n.value&&(n.value.scrollTop=n.value.scrollHeight+1,setTimeout(()=>{i=!1},50))})};function h(m,p){fe(()=>{i=!0,p||(p="top");let M=n.value,I=document.querySelector("#msg-"+m);!M||!I||(p=="top"?M.scrollTop=I.offsetTop:M.scrollTop=I.offsetTop-M.clientHeight+I.clientHeight,setTimeout(()=>{i=!1},50))})}return t({scrollToBottom:_,scrollToMessage:h}),(m,p)=>(C(),E("div",{class:"message-list",ref_key:"scrollBoxRef",ref:n,onScroll:g},[We(m.$slots,"default",{},void 0)],544))}}),ps=j(gs,[["__scopeId","data-v-7e037515"]]),vs=["id"],hs={class:"message-item-left"},_s=["src"],ys={class:"message-item-body"},bs={class:"message-content"},ws={key:0,class:"text-message"},Ss={class:"text-message"},ks={key:0,class:"question-list"},Ms=["onClick"],Cs=q({__name:"message-item",props:{msg:{type:Object,required:!0}},emits:["sendTextMessage"],setup(e,{emit:t}){const s=t,o=e,a=ae(()=>o.msg.is_customer==1),n=ae(()=>({"user-message-item":a.value===!0,"robot-message-item":a.value===!1,"welcome-message-item":o.msg.menu_json&&o.msg.menu_json.question})),r=c=>{s("sendTextMessage",c)};return(c,i)=>(C(),E("div",{class:Ae(["message-item",n.value]),id:"msg-"+e.msg.uid},[b("div",hs,[b("img",{class:"avatar",src:o.msg.avatar},null,8,_s)]),b("div",ys,[b("div",bs,[o.msg.msg_type==1?(C(),E("div",ws,z(P(be)(o.msg.content)),1)):o.msg.msg_type==2?(C(),E(ie,{key:1},[b("div",Ss,z(P(be)(o.msg.menu_json.content)),1),o.msg.menu_json&&o.msg.menu_json.question.length?(C(),E("div",ks,[(C(!0),E(ie,null,Te(o.msg.menu_json.question,u=>(C(),E("div",{class:"question-item",key:u,onClick:f=>r(u)},[b("span",null,z(u),1)],8,Ms))),128))])):re("",!0)],64)):re("",!0)])])],10,vs))}}),As=j(Cs,[["__scopeId","data-v-db39b40c"]]),Ts=q({components:{ChatHeader:as,MessageInput:fs,MessageList:ps,MessageItem:As},async beforeRouteEnter(e,t,s){const o=K(),{openChat:a}=o;let n=e.query||{},r={robot_key:n.robot_key,avatar:n.avatar||"",name:n.name||"",nickname:n.nickname||"",openid:Le(),dialogue_id:n.dialogue_id||""};try{await a(r),s()}catch(c){console.error(c)}},setup(){const e=K(),{sendMessage:t,onGetChatMessage:s}=e,{messageList:o,sendLock:a,robot:n}=Ce(e),r=y=>{y.sdkFloatAvatar=Ct,Tt(y)},c=async()=>{i=!0,await s()&&g(),r(ze(n.value))};let i=!0;const u=k(null),f=y=>{u.value&&u.value.scrollToMessage(y)},g=()=>{u.value&&i&&u.value.scrollToBottom()},_=async()=>{i=!1;let y=o.value[0].uid;await s()&&f(y)},h=()=>{},m=k(""),p=y=>{if(!y)return X("请输入消息内容");t({message:y})};return{init:c,onUpdateAiMessage:()=>{g()},onOpenWindow:()=>{g()},onScrollEnd:h,onScrollStart:_,onSendMesage:async()=>{if(!m.value)return X("请输入消息内容");i=!0,p(m.value),m.value=""},sendTextMessage:p,message:m,sendLock:a,messageList:o,messageListRef:u}},mounted(){const e=Ee();this.init(),e.on("updateAiMessage",this.onUpdateAiMessage),e.on("openWindow",this.onOpenWindow)},unmounted(){const e=K(),{$reset:t}=e;t()}}),Os=e=>($e("data-v-c6a8adb7"),e=e(),Je(),e),Es={class:"chat-page"},xs={class:"chat-page-header"},Is={class:"chat-page-body"},Ls={class:"messages-list-wrap"},qs={class:"chat-page-footer"},Bs=Os(()=>b("div",{class:"technical-support-text"},"由chatwiki提供软件支持",-1));function Rs(e,t,s,o,a,n){const r=F("ChatHeader"),c=F("MessageItem"),i=F("MessageList"),u=F("MessageInput");return C(),E("div",Es,[b("div",xs,[O(r)]),b("div",Is,[b("div",Ls,[O(i,{ref:"messageListRef",messages:e.messageList,onScrollStart:e.onScrollStart,onScrollEnd:e.onScrollEnd},{default:Qe(()=>[(C(!0),E(ie,null,Te(e.messageList,f=>(C(),Ke(c,{key:f.uid,msg:f,onSendTextMessage:e.sendTextMessage},null,8,["msg","onSendTextMessage"]))),128))]),_:1},8,["messages","onScrollStart","onScrollEnd"])])]),b("div",qs,[O(u,{value:e.message,"onUpdate:value":t[0]||(t[0]=f=>e.message=f),onSend:e.onSendMesage,loading:e.sendLock},null,8,["value","onSend","loading"]),Bs])])}const Ys=j(Ts,[["render",Rs],["__scopeId","data-v-c6a8adb7"]]);export{Ys as default};