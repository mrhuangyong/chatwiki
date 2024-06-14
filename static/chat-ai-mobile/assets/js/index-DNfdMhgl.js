var $e=Object.defineProperty;var Be=(e,t,s)=>t in e?$e(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var j=(e,t,s)=>(Be(e,typeof t!="symbol"?t+"":t,s),s);import{j as z,w as ee,b as _e,o as be,k as x,q as ye,r as q,g as He,t as we,f as te,y as ke,z as I,D as L,E as b,I as Se,J as Ce,K as Me,L as De,n as ie,e as le,M as Q,u as U,N as se,O as Te,P as ce,Q as Ue,A as ze,S as Fe,x as Je}from"./vue-chunks-DGcK8bw_.js";import{a as We}from"./axios-B4uVmeYG.js";import{q as Ve}from"./qs-DrHefV6n.js";import{c as Ge,p as Ke,m as X,n as Y,A as Qe,i as ue,I as Xe,L as Ye,C as Ze,e as Oe,s as et,D as tt,d as st,S as de,v as me,y as ot,E as F}from"../../index.js";import{P as at,m as nt,b as rt}from"./mount-component-qMWRoL3E.js";import"./dayjs-C4iS2aBk.js";import"./crypto-js-BJ7SvduI.js";let H=0;function it(e){e?(H||document.body.classList.add("van-toast--unclickable"),H++):H&&(H--,H||document.body.classList.remove("van-toast--unclickable"))}const[lt,R]=Ge("toast"),ct=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay","zIndex"],ut={icon:String,show:Boolean,type:X("text"),overlay:Boolean,message:Y,iconSize:Y,duration:Qe(2e3),position:X("middle"),teleport:[String,Object],wordBreak:String,className:ue,iconPrefix:String,transition:X("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:ue,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean,zIndex:Y};var Ee=z({name:lt,props:ut,emits:["update:show"],setup(e,{emit:t,slots:s}){let o,a=!1;const r=()=>{const m=e.show&&e.forbidClick;a!==m&&(a=m,it(a))},n=m=>t("update:show",m),l=()=>{e.closeOnClick&&n(!1)},c=()=>clearTimeout(o),d=()=>{const{icon:m,type:f,iconSize:C,iconPrefix:p,loadingType:M}=e;if(m||f==="success"||f==="fail")return x(Xe,{name:m||f,size:C,class:R("icon"),classPrefix:p},null);if(f==="loading")return x(Ye,{class:R("loading"),size:C,type:M},null)},v=()=>{const{type:m,message:f}=e;if(s.message)return x("div",{class:R("text")},[s.message()]);if(Ze(f)&&f!=="")return m==="html"?x("div",{key:0,class:R("text"),innerHTML:String(f)},null):x("div",{class:R("text")},[f])};return ee(()=>[e.show,e.forbidClick],r),ee(()=>[e.show,e.type,e.message,e.duration],()=>{c(),e.show&&e.duration>0&&(o=setTimeout(()=>{n(!1)},e.duration))}),_e(r),be(r),()=>x(at,ye({class:[R([e.position,e.wordBreak==="normal"?"break-normal":e.wordBreak,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:l,onClosed:c,"onUpdate:show":n},Ke(e,ct)),{default:()=>[d(),v()]})}});const dt={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let J=[],mt=!1,fe=Oe({},dt);const ft=new Map;function pt(e){return tt(e)?e:{message:e}}function gt(){const{instance:e,unmount:t}=nt({setup(){const s=q(""),{open:o,state:a,close:r,toggle:n}=rt(),l=()=>{},c=()=>x(Ee,ye(a,{onClosed:l,"onUpdate:show":n}),null);return ee(s,d=>{a.message=d}),He().render=c,{open:o,close:r,message:s}}});return e}function vt(){if(!J.length||mt){const e=gt();J.push(e)}return J[J.length-1]}function oe(e={}){if(!et)return{};const t=vt(),s=pt(e);return t.open(Oe({},fe,ft.get(s.type||fe.type),s)),t}st(Ee);function ht(e){return{all:e=e||new Map,on:function(t,s){var o=e.get(t);o?o.push(s):e.set(t,[s])},off:function(t,s){var o=e.get(t);o&&(s?o.splice(o.indexOf(s)>>>0,1):e.set(t,[]))},emit:function(t,s){var o=e.get(t);o&&o.slice().map(function(a){a(s)}),(o=e.get("*"))&&o.slice().map(function(a){a(t,s)})}}}const W=ht(),qe=e=>({on:W.on,off:W.off,emit:W.emit,all:W.all});async function _t(e,t){const s=e.getReader();let o;for(;!(o=await s.read()).done;)t(o.value)}function bt(e){let t,s,o,a=!1;return function(n){t===void 0?(t=n,s=0,o=-1):t=wt(t,n);const l=t.length;let c=0;for(;s<l;){a&&(t[s]===10&&(c=++s),a=!1);let d=-1;for(;s<l&&d===-1;++s)switch(t[s]){case 58:o===-1&&(o=s-c);break;case 13:a=!0;case 10:d=s;break}if(d===-1)break;e(t.subarray(c,d),o),c=s,o=-1}c===l?t=void 0:c!==0&&(t=t.subarray(c),s-=c)}}function yt(e,t,s){let o=pe();const a=new TextDecoder;return function(n,l){if(n.length===0)s==null||s(o),o=pe();else if(l>0){const c=a.decode(n.subarray(0,l)),d=l+(n[l+1]===32?2:1),v=a.decode(n.subarray(d));switch(c){case"data":o.data=o.data?o.data+`
`+v:v;break;case"event":o.event=v;break;case"id":e(o.id=v);break;case"retry":const m=parseInt(v,10);isNaN(m)||t(o.retry=m);break}}}}function wt(e,t){const s=new Uint8Array(e.length+t.length);return s.set(e),s.set(t,e.length),s}function pe(){return{data:"",event:"",id:"",retry:void 0}}var kt=function(e,t){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(s[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(s[o[a]]=e[o[a]]);return s};const G="text/event-stream",St=1e3,ge="last-event-id";function Ct(e,t){var{signal:s,headers:o,onopen:a,onmessage:r,onclose:n,onerror:l,openWhenHidden:c,fetch:d}=t,v=kt(t,["signal","headers","onopen","onmessage","onclose","onerror","openWhenHidden","fetch"]);return new Promise((m,f)=>{const C=Object.assign({},o);C.accept||(C.accept=G);let p;function M(){p.abort(),document.hidden||P()}c||document.addEventListener("visibilitychange",M);let O=St,h=0;function T(){document.removeEventListener("visibilitychange",M),window.clearTimeout(h),p.abort()}s==null||s.addEventListener("abort",()=>{T(),m()});const A=d??window.fetch,B=a??Mt;async function P(){var _;p=new AbortController;try{const S=await A(e,Object.assign(Object.assign({},v),{headers:C,signal:p.signal}));await B(S),await _t(S.body,bt(yt(y=>{y?C[ge]=y:delete C[ge]},y=>{O=y},r))),n==null||n(),T(),m()}catch(S){if(!p.signal.aborted)try{const y=(_=l==null?void 0:l(S))!==null&&_!==void 0?_:O;window.clearTimeout(h),h=window.setTimeout(P,y)}catch(y){T(),f(y)}}}P()})}function Mt(e){const t=e.headers.get("content-type");if(!(t!=null&&t.startsWith(G)))throw new Error(`Expected content-type to be ${G}, Actual: ${t}`)}class Tt{constructor(t={}){j(this,"onOpen");j(this,"onClose");j(this,"onError");j(this,"onMessage");j(this,"opt",{url:"",data:{}});j(this,"controller",new AbortController);this.opt={...this.opt,...t},this.open()}open(){const t=new FormData;for(const s in this.opt.data)Object.prototype.hasOwnProperty.call(this.opt.data,s)&&t.append(s,this.opt.data[s]);Ct(this.opt.url,{method:"POST",signal:this.controller.signal,openWhenHidden:!0,body:t,onopen:async s=>{if(s.ok&&s.headers.get("content-type")===G)typeof this.onOpen=="function"&&this.onOpen();else throw s.status>=400&&s.status<500&&s.status!==429?new Error("连接出错"):new Error("连接出错")},onmessage:s=>{typeof this.onMessage=="function"&&this.onMessage(s)},onclose:()=>{typeof this.onClose=="function"&&this.onClose(),this.controller.abort()},onerror:s=>{typeof this.onError=="function"&&this.onError(s)}})}abort(){this.controller.abort()}}const Ot=0,Et="application/x-www-form-urlencoded;charset=UTF-8",qt=5*60*1e3,ae=new URL("/assets/img/user_avatar_2x-D7HF6Y-m.png",import.meta.url).href,xt={avater:ae},re=we("user",()=>te({...xt}));function It(e){const t=new FormData;return Object.keys(e).forEach(s=>{e[s]!==void 0&&e[s]!==null&&t.append(s,e[s])}),t}function D(e=16,t=0){const s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[];let a;if(t=t||s.length,e)for(a=0;a<e;a++)o[a]=s[0|Math.random()*t];else{let r;for(o[8]=o[13]=o[18]=o[23]="-",o[14]="4",a=0;a<36;a++)o[a]||(r=0|Math.random()*16,o[a]=s[a==19?r&3|8:r])}return o.join("")}function xe(){let e=de.get("openid");return e||(e=D(16),de.set("openid",e)),e}function ve(e){return e.replace(/[&<"']/g,function(t){switch(t){case"&":return"&amp;";case"<":return"&lt;";case'"':return"&quot;";default:return"&#039;"}})}const he=(e,t)=>t,Ie=e=>{const t={t:r=>he(e,r)};if(!me)return t;const{t:s,...o}=me.global;return{...o,t:(r,...n)=>r?!r.includes(".")&&!e?r:s(he(e,r),...n):""}};function Lt(e){const{t}=Ie();let s=e.response.status,o=e.response.data.message||e.message,a="";switch(s){case 400:a=`${o}`;break;case 401:a=t("common.errMsg401");break;case 403:a=t("common.errMsg403");break;case 404:a=t("common.errMsg404");break;case 405:a=t("common.errMsg405");break;case 408:a=t("common.errMsg408");break;case 500:a=t("common.errMsg500");break;case 501:a=t("common.errMsg501");break;case 502:a=t("common.errMsg502");break;case 503:a=t("common.errMsg503");break;case 504:a=t("common.errMsg504");break;case 505:a=t("common.errMsg505");break;default:a=`${o}`}return a}let Z=!1;function Le(e){Z||(Z=!0,oe("msg"),setTimeout(()=>{Z=!1},200))}const At=e=>{if(e.method==="post"&&e.headers["Content-Type"]==="application/x-www-form-urlencoded"?e.data=Ve.stringify(e.data):e.method==="post"&&e.headers["Content-Type"]==="multipart/form-data"&&(e.data=It(e.data)),e.method==="get"&&e.params){let t=e.url;t+="?";const s=Object.keys(e.params);for(const o of s)e.params[o]!==void 0&&e.params[o]!==null&&(t+=`${o}=${encodeURIComponent(e.params[o])}&`);t=t.substring(0,t.length-1),e.params={},e.url=t}return e},Pt=e=>{var t,s,o;if(e.data&&typeof e.data.res<"u"&&(e.data.code=e.data.res,e.data.message=e.data.msg||""),((t=e==null?void 0:e.config)==null?void 0:t.responseType)==="blob")return e;if(e.data.code===Ot)return e.data;if(showErrorMsg((s=e==null?void 0:e.data)==null?void 0:s.message),((o=e==null?void 0:e.data)==null?void 0:o.code)===401)re().logout();else return Promise.reject(e.data)},jt=e=>e.response?(console.log("response err： "+e),Nt(e)):e.request?(console.log("request err： "+e),Rt(e)):Promise.reject(e),Rt=e=>{var n,l,c;const{t}=Ie(),{response:s,code:o,message:a}=e||{};(l=(n=s==null?void 0:s.data)==null?void 0:n.error)==null||l.message;const r=((c=e==null?void 0:e.toString)==null?void 0:c.call(e))??"";return o==="ECONNABORTED"&&a.indexOf("timeout")!==-1?t("common.apiTimeoutMessage"):r!=null&&r.includes("Network Error")&&t("common.networkExceptionMsg"),Le(),Promise.reject(e)},Nt=e=>{var s;let t=(s=e==null?void 0:e.response)==null?void 0:s.status;return Lt(e),Le(),t===401&&re().logout(),Promise.reject(e)},$t="",N=new Map,$=We.create({timeout:qt,baseURL:$t});$.interceptors.request.use(e=>{const t=new AbortController,s=e.url||"";return e.signal=t.signal,N.set(s,t),e});$.interceptors.response.use(e=>{const t=e.config.url||"";return N.delete(t),e},e=>Promise.reject(e));$.interceptors.request.use(At);$.interceptors.response.use(Pt);$.interceptors.response.use(void 0,jt);const ne={request:e=>new Promise((t,s)=>{var o;(o=e.interceptors)!=null&&o.requestInterceptors&&(e=e.interceptors.requestInterceptors(e)),$.request(e).then(a=>{t(a)}).catch(a=>{s(a)})}),cancelRequest:e=>{var s;const t=Array.isArray(e)?e:[e];for(const o of t)(s=N.get(o))==null||s.abort(),N.delete(o)},cancelAllRequest(){for(const[e,t]of N)t.abort();N.clear()}},V=e=>{const t=re(),s=ot(),{url:o,method:a,params:r,data:n,headers:l,responseType:c,withToken:d}=e,v=s.getCurrentLocale,m={"Content-Type":Et,"X-Requested-With":"XMLHttpRequest",lang:v.lang,...l};return d||(m.token=t.getToken??""),ne.request({url:o,method:a,params:r,data:n,responseType:c,headers:{...m}})},K={get:e=>V({method:"get",...e}),post:e=>V({method:"post",...e}),delete:e=>V({method:"delete",...e}),put:e=>V({method:"put",...e}),cancelRequest:e=>ne.cancelRequest(e),cancelAllRequest:()=>ne.cancelAllRequest()},Bt="",Ht=e=>new Tt({url:Bt+"/chat/request",data:e}),Dt=e=>K.post({url:"/chat/welcome",data:e}),Ut=e=>K.post({url:"/manage/getDialogueList",data:e}),zt=e=>K.post({url:"/chat/message",data:e}),Ft=({id:e,prompt:t})=>K.post({url:"/manage/editPrompt",data:{id:e,prompt:t}}),Jt=we("chat",()=>{const e=qe(),t=q([]);let s=null;const o=q(0),a=q(""),r=te({admin_user_id:"",avatar:"",id:"",name:"",nickname:"",openid:""}),n=te({id:null,library_ids:"",prompt:"",robot_avatar:"",robot_intro:"",robot_key:"",robot_name:"",openid:"",welcomes:{content:"",question:[]}}),l=q(!1),c=async i=>{s&&(s.abort(),s=null),t.value=[],S.value=!1,p.value=!1,i.dialogue_id?(l.value=!1,o.value=i.dialogue_id):(l.value=!0,o.value=0),a.value=i.openid||xe(),n.robot_key=i.robot_key,n.openid=a.value,r.openid=a.value,r.avatar=i.avatar||ae,r.name=i.name||"",r.nickname=i.nickname||"";const g=await Dt({robot_key:n.robot_key,openid:a.value,nickname:r.nickname,name:r.name,avatar:r.avatar||ae});try{const w=g.data.customer,u=g.data.robot;return r.admin_user_id=w.admin_user_id,r.avatar=w.avatar,r.id=w.id,r.name=w.name,r.nickname=w.nickname,n.library_ids=u.library_ids,n.prompt=u.prompt,n.robot_avatar=u.robot_avatar,n.robot_intro=u.robot_intro,n.robot_key=u.robot_key,n.robot_name=u.robot_name,n.library_ids=u.library_ids,n.id=u.id,u.welcomes&&(n.welcomes=JSON.parse(u.welcomes)),d(g.data.message),g}catch(w){Promise.reject(w)}},d=i=>{i&&(i.uid=D(32),i.loading=!1,i.isWelcome=!0,i.avatar=n.robot_avatar,i.menu_json&&(i.menu_json=JSON.parse(i.menu_json)),i.quote_file&&(i.quote_file=JSON.parse(i.quote_file)),t.value.push(i))},v=i=>{i.uid=D(32),i.loading=!1,i.avatar=r.avatar,i.openid=r.openid,i.msg_type=1,i.is_customer=1,t.value.push(i)},m=i=>{t.value.push(i),e.emit("updateAiMessage",i)},f=(i,g,w)=>{const u=t.value.findIndex(k=>k.uid==w);if(i=="sending"){const k=t.value[u].content;t.value[u].content=k+g}i=="quote_file"&&(t.value[u].quote_file=g.length>0?g:[]),i=="ai_message"&&(t.value[u].id=g.id),i=="debug"&&(t.value[u].debug=g.length>0?g:[]),e.emit("updateAiMessage",t.value[u])},C=()=>{const i=t.value.length-1;t.value[i].loading=!1},p=q(!1),M=i=>{if(p.value)return;const g={loading:!0,id:"",content:"",uid:D(32),avatar:n.robot_avatar,msg_type:1,quote_file:[],is_customer:0,debug:[]},w={robot_key:n.robot_key,openid:n.openid,question:i.message,prompt:n.prompt,library_ids:n.library_ids,dialogue_id:o.value};p.value=!0,s=Ht(w),s.onMessage=u=>{if(u.event=="dialogue_id"&&(o.value=u.data),u.event=="c_message"){const k=JSON.parse(u.data);v(k)}if(u.event=="robot"&&(m(g),l.value&&(l.value=!1)),u.event=="sending"&&f("sending",u.data,g.uid),u.event=="ai_message"){const k=JSON.parse(u.data);f("ai_message",k,g.uid)}if(u.event=="quote_file"){const k=JSON.parse(u.data);f("quote_file",k,g.uid)}if(u.event=="debug"){const k=JSON.parse(u.data);f("debug",k,g.uid)}},s.onClose=()=>{C(),p.value=!1,s=null}},O=25,h=q([]),T=q(!1),A=q(!1),B=async()=>{if(A.value||T.value)return!1;let i=0;h.value.length>0&&(i=h.value[h.value.length-1].id),T.value=!0;const g=await Ut({min_id:i,size:O,robot_key:n.robot_key});T.value=!1;const w=g.data||[];return w.length===0?(A.value=!0,!1):(h.value=[...h.value,...w],g)},P=async i=>await c(i),_=20,S=q(!1),y=async()=>{if(S.value)return;let i=0;const g=t.value.filter(u=>!u.isWelcome);g.length>0&&(i=g[0].id);const w={robot_key:n.robot_key,openid:r.openid,min_id:i,size:_,dialogue_id:o.value};try{const u=await zt(w),k=u.data.list||[];if(k.length===0){S.value=!0;return}return k.sort((E,Ne)=>E.id-Ne.id),k.forEach(E=>{E.loading=!1,E.uid=D(32),E.is_customer==1?E.avatar=r.avatar:E.avatar=n.robot_avatar,E.menu_json&&(E.menu_json=JSON.parse(E.menu_json)),E.quote_file&&(E.quote_file=JSON.parse(E.quote_file))}),t.value=[...k,...t.value],u}catch(u){Promise.reject(u)}},Pe=i=>{n.prompt=i},je=()=>Ft({id:n.id,prompt:n.prompt});function Re(){o.value=0,t.value=[],a.value="",r.admin_user_id="",r.avatar="",r.id="",r.name="",r.nickname="",r.openid="",n.id=null,n.library_ids="",n.prompt="",n.robot_avatar="",n.robot_intro="",n.robot_key="",n.robot_key="",n.robot_name="",n.openid="",n.welcomes={content:"",question:[]},l.value=!1,S.value=!1,p.value=!1,T.value=!1,A.value=!1,h.value=[]}return{$reset:Re,user:r,robot:n,dialogue_id:o,openid:a,sendLock:p,messageList:t,createChat:c,sendMessage:M,getMyChatList:B,myChatList:h,openChat:P,onGetChatMessage:y,changeRobotPrompt:Pe,saveRobotPrompt:je}}),Wt={},Ae=e=>(Se("data-v-7906b4b9"),e=e(),Ce(),e),Vt={class:"cu-navbar"},Gt={class:"navbar-left"},Kt=Ae(()=>b("div",{class:"navbar-body"},[b("div",{class:"navbar-title van-ellipsis"},"ZHIMA CHATAI")],-1)),Qt=Ae(()=>b("div",{class:"navbar-right"},null,-1));function Xt(e,t){const s=ke("van-icon");return I(),L("div",Vt,[b("div",Gt,[x(s,{class:"navbar-arrow",name:"arrow-left"})]),Kt,Qt])}const Yt=F(Wt,[["render",Xt],["__scopeId","data-v-7906b4b9"]]),Zt={class:"message-input-box"},es={class:"message-input-body"},ts=["value"],ss=z({__name:"message-input",props:{value:{type:String,default:""}},emits:["update:value","send"],setup(e,{emit:t}){const s=t,o=e,a=l=>{const c=l.target;s("update:value",c.value)},r=()=>{o.value.trim()&&s("send",o.value)},n=l=>{o.value.trim()&&(l.preventDefault(),r())};return(l,c)=>{const d=ke("svg-icon");return I(),L("div",Zt,[b("div",es,[b("div",{class:Me(["message-input",{"is-set":o.value.length>0}])},[b("input",{class:"text-input",type:"text",value:e.value,placeholder:"在此输入您想了解的内容",onChange:a,"on:pressEnter":n},null,40,ts),x(d,{name:"paper-airplane",class:"send-btn",onClick:r})],2)])])}}}),os=F(ss,[["__scopeId","data-v-cd8c7bb6"]]),as=z({__name:"message-list",props:{messages:{type:Array,default:()=>[]}},emits:["clickMsgMeun","scroll","scrollStart","scrollEnd"],setup(e,{expose:t,emit:s}){const o=s,a=e,r=q(null),n={scrollTop:0,scrollHeight:0,clientHeight:0,scrollStartDiff:60,scrollEndDiff:60};let l=null,c=!1;function d(){a.messages.length!=0&&o("scrollStart",{msg:a.messages[0]})}function v(){a.messages.length!=0&&o("scrollEnd",{msg:a.messages[a.messages.length-1]})}function m(p){c||(l!==null&&(clearTimeout(l),l=null),l=window.setTimeout(()=>{n.scrollTop=p.target.scrollTop,n.scrollHeight=p.target.scrollHeight,n.clientHeight=p.target.clientHeight,o("scroll",{...n}),Math.abs(n.scrollTop)<=n.scrollStartDiff&&d(),Math.abs(n.scrollHeight-n.scrollTop-n.clientHeight)<=n.scrollEndDiff&&v()},50))}const f=()=>{r.value&&ie(()=>{c=!0,r.value&&(r.value.scrollTop=r.value.scrollHeight+1,setTimeout(()=>{c=!1},50))})};function C(p,M){ie(()=>{c=!0,M||(M="top");let O=r.value,h=document.querySelector("#msg-"+p);!O||!h||(M=="top"?O.scrollTop=h.offsetTop:O.scrollTop=h.offsetTop-O.clientHeight+h.clientHeight,setTimeout(()=>{c=!1},50))})}return t({scrollToBottom:f,scrollToMessage:C}),(p,M)=>(I(),L("div",{class:"message-list",ref_key:"scrollBoxRef",ref:r,onScroll:m},[De(p.$slots,"default",{},void 0)],544))}}),ns=F(as,[["__scopeId","data-v-7e037515"]]),rs=e=>(Se("data-v-3e647e1d"),e=e(),Ce(),e),is=["id"],ls={class:"message-item-left"},cs=["src"],us={class:"message-item-body"},ds={class:"message-content"},ms=rs(()=>b("span",{class:"triangle"},null,-1)),fs={key:0,class:"text-message"},ps={class:"text-message"},gs={key:0,class:"question-list"},vs=["onClick"],hs=z({__name:"message-item",props:{msg:{type:Object,required:!0}},emits:["sendTextMessage"],setup(e,{emit:t}){const s=t,o=e,a=le(()=>o.msg.is_customer==1),r=le(()=>({"user-message-item":a.value===!0,"robot-message-item":a.value===!1,"welcome-message-item":o.msg.menu_json&&o.msg.menu_json.question})),n=l=>{s("sendTextMessage",l)};return(l,c)=>(I(),L("div",{class:Me(["ignore-message-item",r.value]),id:"msg-"+e.msg.uid},[b("div",ls,[b("img",{class:"avatar",src:o.msg.avatar},null,8,cs)]),b("div",us,[b("div",ds,[ms,o.msg.msg_type==1?(I(),L("div",fs,Q(U(ve)(o.msg.content)),1)):o.msg.msg_type==2?(I(),L(se,{key:1},[b("div",ps,Q(U(ve)(o.msg.menu_json.content)),1),o.msg.menu_json&&o.msg.menu_json.question.length?(I(),L("div",gs,[(I(!0),L(se,null,Te(o.msg.menu_json.question,d=>(I(),L("div",{class:"question-item",key:d,onClick:v=>n(d)},[b("span",null,Q(d),1)],8,vs))),128))])):ce("",!0)],64)):ce("",!0)])])],10,is))}}),_s=F(hs,[["__scopeId","data-v-3e647e1d"]]),bs={class:"chat-page"},ys={class:"chat-page-header"},ws={class:"chat-page-body"},ks={class:"messages-list-wrap"},Ss={class:"chat-page-footer"},Cs=z({__name:"index",setup(e){const t=Fe(),s=qe(),o=Jt(),{sendMessage:a,openChat:r,onGetChatMessage:n,$reset:l}=o,{messageList:c,sendLock:d,dialogue_id:v}=Ue(o);let m=!0;const f=q(null),C=_=>{f.value&&f.value.scrollToMessage(_)},p=()=>{f.value&&m&&f.value.scrollToBottom()},M=async()=>{m=!1;let _=c.value[0].uid;await n()&&C(_)},O=()=>{},h=async()=>{m=!0;let _=t.query||{},S={robot_key:_.robot_key,avatar:_.avatar||"",name:_.name||"",nickname:_.nickname||"",openid:xe(),dialogue_id:v.value};await r(S),await n()&&p()},T=q(""),A=_=>{if(!_)return oe("请输入消息内容");a({message:_})},B=async()=>{if(!T.value)return oe("请输入消息内容");m=!0,A(T.value),T.value=""},P=()=>{f.value&&p()};return _e(()=>{h(),s.on("updateAiMessage",P)}),be(()=>{l(),s.off("updateAiMessage",P)}),(_,S)=>(I(),L("div",bs,[b("div",ys,[x(Yt)]),b("div",ws,[b("div",ks,[x(ns,{ref_key:"messageListRef",ref:f,messages:U(c),onScrollStart:M,onScrollEnd:O},{default:ze(()=>[(I(!0),L(se,null,Te(U(c),y=>(I(),Je(_s,{key:y.uid,msg:y,onSendTextMessage:A},null,8,["msg"]))),128))]),_:1},8,["messages"])])]),b("div",Ss,[x(os,{value:T.value,"onUpdate:value":S[0]||(S[0]=y=>T.value=y),onSend:B,loading:U(d)},null,8,["value","loading"])])]))}}),As=F(Cs,[["__scopeId","data-v-57c274c0"]]);export{As as default};