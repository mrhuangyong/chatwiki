var st=Object.defineProperty;var nt=(e,t,o)=>t in e?st(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var B=(e,t,o)=>(nt(e,typeof t!="symbol"?t+"":t,o),o);import{g as ge,r as _,a as Ae,j as at,w as U,e as $,h as O,T as qe,F as Re,G as Be,f as ue,n as de,b as pe,c as rt,p as lt,H as it,I as te,m as oe,o as je,E as ct,d as se,s as $e,x as Ne,y as L,C as A,D as T,J as De,K as ze,L as He,M as ut,N as ie,u as K,O as Ue,P as we,Q as dt,z as ft,S as mt,v as vt}from"./vue-chunks-ye1xiFts.js";import{a as gt}from"./axios-B4uVmeYG.js";import{q as pt}from"./qs-DrHefV6n.js";import{i as ht,n as _t,e as F,a as j,t as D,u as ne,T as ke,o as yt,b as bt,p as Fe,c as he,d as We,f as wt,h as _e,w as ye,m as H,j as kt,H as St,I as Je,k as Ct,l as Ot,L as Tt,q as It,r as Mt,S as Se,s as Ce,v as xt,_ as X}from"../../index.js";import"./dayjs-C4iS2aBk.js";import"./crypto-js-BJ7SvduI.js";function Et(e,{args:t=[],done:o,canceled:s,error:n}){if(e){const r=e.apply(null,t);ht(r)?r.then(a=>{a?o():s&&s()}).catch(n||_t):r?o():s&&s()}else o()}const Lt=Symbol();function Ye(e){const t=ge();t&&F(t.proxy,e)}const Pt={show:Boolean,zIndex:j,overlay:D,duration:j,teleport:[String,Object],lockScroll:D,lazyRender:D,beforeClose:Function,overlayStyle:Object,overlayClass:ne,transitionAppear:Boolean,closeOnClickOverlay:D};function At(e,t){return e>t?"horizontal":t>e?"vertical":""}function qt(){const e=_(0),t=_(0),o=_(0),s=_(0),n=_(0),r=_(0),a=_(""),l=_(!0),c=()=>a.value==="vertical",d=()=>a.value==="horizontal",g=()=>{o.value=0,s.value=0,n.value=0,r.value=0,a.value="",l.value=!0};return{move:h=>{const v=h.touches[0];o.value=(v.clientX<0?0:v.clientX)-e.value,s.value=v.clientY-t.value,n.value=Math.abs(o.value),r.value=Math.abs(s.value);const w=10;(!a.value||n.value<w&&r.value<w)&&(a.value=At(n.value,r.value)),l.value&&(n.value>ke||r.value>ke)&&(l.value=!1)},start:h=>{g(),e.value=h.touches[0].clientX,t.value=h.touches[0].clientY},reset:g,startX:e,startY:t,deltaX:o,deltaY:s,offsetX:n,offsetY:r,direction:a,isVertical:c,isHorizontal:d,isTap:l}}let Y=0;const Oe="van-overflow-hidden";function Rt(e,t){const o=qt(),s="01",n="10",r=g=>{o.move(g);const m=o.deltaY.value>0?n:s,p=bt(g.target,e.value),{scrollHeight:h,offsetHeight:v,scrollTop:w}=p;let k="11";w===0?k=v>=h?"00":"01":w+v>=h&&(k="10"),k!=="11"&&o.isVertical()&&!(parseInt(k,2)&parseInt(m,2))&&Fe(g,!0)},a=()=>{document.addEventListener("touchstart",o.start),document.addEventListener("touchmove",r,{passive:!1}),Y||document.body.classList.add(Oe),Y++},l=()=>{Y&&(document.removeEventListener("touchstart",o.start),document.removeEventListener("touchmove",r),Y--,Y||document.body.classList.remove(Oe))},c=()=>t()&&a(),d=()=>t()&&l();yt(c),Ae(d),at(d),U(t,g=>{g?a():l()})}function Ve(e){const t=_(!1);return U(e,o=>{o&&(t.value=o)},{immediate:!0}),o=>()=>t.value?o():null}const Te=()=>{var e;const{scopeId:t}=((e=ge())==null?void 0:e.vnode)||{};return t?{[t]:""}:null},[Bt,jt]=he("overlay"),$t={show:Boolean,zIndex:j,duration:j,className:ne,lockScroll:D,lazyRender:D,customStyle:Object};var Nt=$({name:Bt,props:$t,setup(e,{slots:t}){const o=_(),s=Ve(()=>e.show||!e.lazyRender),n=a=>{e.lockScroll&&Fe(a,!0)},r=s(()=>{var a;const l=F(wt(e.zIndex),e.customStyle);return _e(e.duration)&&(l.animationDuration=`${e.duration}s`),Re(O("div",{ref:o,style:l,class:[jt(),e.className]},[(a=t.default)==null?void 0:a.call(t)]),[[Be,e.show]])});return We("touchmove",n,{target:o}),()=>O(qe,{name:"van-fade",appear:!0},{default:r})}});const Dt=ye(Nt),zt=F({},Pt,{round:Boolean,position:H("center"),closeIcon:H("cross"),closeable:Boolean,transition:String,iconPrefix:String,closeOnPopstate:Boolean,closeIconPosition:H("top-right"),safeAreaInsetTop:Boolean,safeAreaInsetBottom:Boolean}),[Ht,Ie]=he("popup");var Ut=$({name:Ht,inheritAttrs:!1,props:zt,emits:["open","close","opened","closed","keydown","update:show","clickOverlay","clickCloseIcon"],setup(e,{emit:t,attrs:o,slots:s}){let n,r;const a=_(),l=_(),c=Ve(()=>e.show||!e.lazyRender),d=ue(()=>{const f={zIndex:a.value};if(_e(e.duration)){const y=e.position==="center"?"animationDuration":"transitionDuration";f[y]=`${e.duration}s`}return f}),g=()=>{n||(n=!0,a.value=e.zIndex!==void 0?+e.zIndex:kt(),t("open"))},m=()=>{n&&Et(e.beforeClose,{done(){n=!1,t("close"),t("update:show",!1)}})},p=f=>{t("clickOverlay",f),e.closeOnClickOverlay&&m()},h=()=>{if(e.overlay)return O(Dt,oe({show:e.show,class:e.overlayClass,zIndex:a.value,duration:e.duration,customStyle:e.overlayStyle,role:e.closeOnClickOverlay?"button":void 0,tabindex:e.closeOnClickOverlay?0:void 0},Te(),{onClick:p}),{default:s["overlay-content"]})},v=f=>{t("clickCloseIcon",f),m()},w=()=>{if(e.closeable)return O(Je,{role:"button",tabindex:0,name:e.closeIcon,class:[Ie("close-icon",e.closeIconPosition),St],classPrefix:e.iconPrefix,onClick:v},null)};let k;const C=()=>{k&&clearTimeout(k),k=setTimeout(()=>{t("opened")})},I=()=>t("closed"),q=f=>t("keydown",f),R=c(()=>{var f;const{round:y,position:S,safeAreaInsetTop:J,safeAreaInsetBottom:le}=e;return Re(O("div",oe({ref:l,style:d.value,role:"dialog",tabindex:0,class:[Ie({round:y,[S]:S}),{"van-safe-area-top":J,"van-safe-area-bottom":le}],onKeydown:q},o,Te()),[(f=s.default)==null?void 0:f.call(s),w()]),[[Be,e.show]])}),P=()=>{const{position:f,transition:y,transitionAppear:S}=e,J=f==="center"?"van-fade":`van-popup-slide-${f}`;return O(qe,{name:y||J,appear:S,onAfterEnter:C,onAfterLeave:I},{default:R})};return U(()=>e.show,f=>{f&&!n&&(g(),o.tabindex===0&&de(()=>{var y;(y=l.value)==null||y.focus()})),!f&&n&&(n=!1,t("close"))}),Ye({popupRef:l}),Rt(l,()=>e.show&&e.lockScroll),We("popstate",()=>{e.closeOnPopstate&&(m(),r=!1)}),pe(()=>{e.show&&g()}),rt(()=>{r&&(t("update:show",!0),r=!1)}),Ae(()=>{e.show&&e.teleport&&(m(),r=!0)}),lt(Lt,()=>e.show),()=>e.teleport?O(it,{to:e.teleport},{default:()=>[h(),P()]}):O(te,null,[h(),P()])}});const Ft=ye(Ut);let V=0;function Wt(e){e?(V||document.body.classList.add("van-toast--unclickable"),V++):V&&(V--,V||document.body.classList.remove("van-toast--unclickable"))}const[Jt,N]=he("toast"),Yt=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay","zIndex"],Vt={icon:String,show:Boolean,type:H("text"),overlay:Boolean,message:j,iconSize:j,duration:Ot(2e3),position:H("middle"),teleport:[String,Object],wordBreak:String,className:ne,iconPrefix:String,transition:H("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:ne,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean,zIndex:j};var Ge=$({name:Jt,props:Vt,emits:["update:show"],setup(e,{emit:t,slots:o}){let s,n=!1;const r=()=>{const m=e.show&&e.forbidClick;n!==m&&(n=m,Wt(n))},a=m=>t("update:show",m),l=()=>{e.closeOnClick&&a(!1)},c=()=>clearTimeout(s),d=()=>{const{icon:m,type:p,iconSize:h,iconPrefix:v,loadingType:w}=e;if(m||p==="success"||p==="fail")return O(Je,{name:m||p,size:h,class:N("icon"),classPrefix:v},null);if(p==="loading")return O(Tt,{class:N("loading"),size:h,type:w},null)},g=()=>{const{type:m,message:p}=e;if(o.message)return O("div",{class:N("text")},[o.message()]);if(_e(p)&&p!=="")return m==="html"?O("div",{key:0,class:N("text"),innerHTML:String(p)},null):O("div",{class:N("text")},[p])};return U(()=>[e.show,e.forbidClick],r),U(()=>[e.show,e.type,e.message,e.duration],()=>{c(),e.show&&e.duration>0&&(s=setTimeout(()=>{a(!1)},e.duration))}),pe(r),je(r),()=>O(Ft,oe({class:[N([e.position,e.wordBreak==="normal"?"break-normal":e.wordBreak,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:l,onClosed:c,"onUpdate:show":a},Ct(e,Yt)),{default:()=>[d(),g()]})}});function Gt(){const e=se({show:!1}),t=n=>{e.show=n},o=n=>{F(e,n,{transitionAppear:!0}),t(!0)},s=()=>t(!1);return Ye({open:o,close:s,toggle:t}),{open:o,close:s,state:e,toggle:t}}function Kt(e){const t=ct(e),o=document.createElement("div");return document.body.appendChild(o),{instance:t.mount(o),unmount(){t.unmount(),document.body.removeChild(o)}}}const Xt={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let Z=[],Zt=!1,Me=F({},Xt);const Qt=new Map;function eo(e){return Mt(e)?e:{message:e}}function to(){const{instance:e,unmount:t}=Kt({setup(){const o=_(""),{open:s,state:n,close:r,toggle:a}=Gt(),l=()=>{},c=()=>O(Ge,oe(n,{onClosed:l,"onUpdate:show":a}),null);return U(o,d=>{n.message=d}),ge().render=c,{open:s,close:r,message:o}}});return e}function oo(){if(!Z.length||Zt){const e=to();Z.push(e)}return Z[Z.length-1]}function fe(e={}){if(!It)return{};const t=oo(),o=eo(e);return t.open(F({},Me,Qt.get(o.type||Me.type),o)),t}ye(Ge);function so(e){return{all:e=e||new Map,on:function(t,o){var s=e.get(t);s?s.push(o):e.set(t,[o])},off:function(t,o){var s=e.get(t);s&&(o?s.splice(s.indexOf(o)>>>0,1):e.set(t,[]))},emit:function(t,o){var s=e.get(t);s&&s.slice().map(function(n){n(o)}),(s=e.get("*"))&&s.slice().map(function(n){n(t,o)})}}}const Q=so(),Ke=e=>({on:Q.on,off:Q.off,emit:Q.emit,all:Q.all});async function no(e,t){const o=e.getReader();let s;for(;!(s=await o.read()).done;)t(s.value)}function ao(e){let t,o,s,n=!1;return function(a){t===void 0?(t=a,o=0,s=-1):t=lo(t,a);const l=t.length;let c=0;for(;o<l;){n&&(t[o]===10&&(c=++o),n=!1);let d=-1;for(;o<l&&d===-1;++o)switch(t[o]){case 58:s===-1&&(s=o-c);break;case 13:n=!0;case 10:d=o;break}if(d===-1)break;e(t.subarray(c,d),s),c=o,s=-1}c===l?t=void 0:c!==0&&(t=t.subarray(c),o-=c)}}function ro(e,t,o){let s=xe();const n=new TextDecoder;return function(a,l){if(a.length===0)o==null||o(s),s=xe();else if(l>0){const c=n.decode(a.subarray(0,l)),d=l+(a[l+1]===32?2:1),g=n.decode(a.subarray(d));switch(c){case"data":s.data=s.data?s.data+`
`+g:g;break;case"event":s.event=g;break;case"id":e(s.id=g);break;case"retry":const m=parseInt(g,10);isNaN(m)||t(s.retry=m);break}}}}function lo(e,t){const o=new Uint8Array(e.length+t.length);return o.set(e),o.set(t,e.length),o}function xe(){return{data:"",event:"",id:"",retry:void 0}}var io=function(e,t){var o={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(o[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(e);n<s.length;n++)t.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(e,s[n])&&(o[s[n]]=e[s[n]]);return o};const ae="text/event-stream",co=1e3,Ee="last-event-id";function uo(e,t){var{signal:o,headers:s,onopen:n,onmessage:r,onclose:a,onerror:l,openWhenHidden:c,fetch:d}=t,g=io(t,["signal","headers","onopen","onmessage","onclose","onerror","openWhenHidden","fetch"]);return new Promise((m,p)=>{const h=Object.assign({},s);h.accept||(h.accept=ae);let v;function w(){v.abort(),document.hidden||P()}c||document.addEventListener("visibilitychange",w);let k=co,C=0;function I(){document.removeEventListener("visibilitychange",w),window.clearTimeout(C),v.abort()}o==null||o.addEventListener("abort",()=>{I(),m()});const q=d??window.fetch,R=n??fo;async function P(){var f;v=new AbortController;try{const y=await q(e,Object.assign(Object.assign({},g),{headers:h,signal:v.signal}));await R(y),await no(y.body,ao(ro(S=>{S?h[Ee]=S:delete h[Ee]},S=>{k=S},r))),a==null||a(),I(),m()}catch(y){if(!v.signal.aborted)try{const S=(f=l==null?void 0:l(y))!==null&&f!==void 0?f:k;window.clearTimeout(C),C=window.setTimeout(P,S)}catch(S){I(),p(S)}}}P()})}function fo(e){const t=e.headers.get("content-type");if(!(t!=null&&t.startsWith(ae)))throw new Error(`Expected content-type to be ${ae}, Actual: ${t}`)}class mo{constructor(t={}){B(this,"onOpen");B(this,"onClose");B(this,"onError");B(this,"onMessage");B(this,"opt",{url:"",data:{}});B(this,"controller",new AbortController);this.opt={...this.opt,...t},this.open()}open(){const t=new FormData;for(const o in this.opt.data)Object.prototype.hasOwnProperty.call(this.opt.data,o)&&t.append(o,this.opt.data[o]);uo(this.opt.url,{method:"POST",signal:this.controller.signal,openWhenHidden:!0,body:t,onopen:async o=>{if(o.ok&&o.headers.get("content-type")===ae)typeof this.onOpen=="function"&&this.onOpen();else throw o.status>=400&&o.status<500&&o.status!==429?new Error("连接出错"):new Error("连接出错")},onmessage:o=>{typeof this.onMessage=="function"&&this.onMessage(o)},onclose:()=>{typeof this.onClose=="function"&&this.onClose(),this.controller.abort()},onerror:o=>{typeof this.onError=="function"&&this.onError(o)}})}abort(){this.controller.abort()}}const vo=0,go="application/x-www-form-urlencoded;charset=UTF-8",po=5*60*1e3,me=new URL("/assets/img/user_avatar_2x-D7HF6Y-m.png",import.meta.url).href,ho={avater:me},be=$e("user",()=>se({...ho}));function _o(e){const t=new FormData;return Object.keys(e).forEach(o=>{e[o]!==void 0&&e[o]!==null&&t.append(o,e[o])}),t}function G(e=16,t=0){const o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),s=[];let n;if(t=t||o.length,e)for(n=0;n<e;n++)s[n]=o[0|Math.random()*t];else{let r;for(s[8]=s[13]=s[18]=s[23]="-",s[14]="4",n=0;n<36;n++)s[n]||(r=0|Math.random()*16,s[n]=o[n==19?r&3|8:r])}return s.join("")}function Xe(){let e=Se.get("openid");return e||(e=G(16),Se.set("openid",e)),e}function Le(e){return e.replace(/[&<"']/g,function(t){switch(t){case"&":return"&amp;";case"<":return"&lt;";case'"':return"&quot;";default:return"&#039;"}})}const Pe=(e,t)=>t,Ze=e=>{const t={t:r=>Pe(e,r)};if(!Ce)return t;const{t:o,...s}=Ce.global;return{...s,t:(r,...a)=>r?!r.includes(".")&&!e?r:o(Pe(e,r),...a):""}};function yo(e){const{t}=Ze();let o=e.response.status,s=e.response.data.message||e.message,n="";switch(o){case 400:n=`${s}`;break;case 401:n=t("common.errMsg401");break;case 403:n=t("common.errMsg403");break;case 404:n=t("common.errMsg404");break;case 405:n=t("common.errMsg405");break;case 408:n=t("common.errMsg408");break;case 500:n=t("common.errMsg500");break;case 501:n=t("common.errMsg501");break;case 502:n=t("common.errMsg502");break;case 503:n=t("common.errMsg503");break;case 504:n=t("common.errMsg504");break;case 505:n=t("common.errMsg505");break;default:n=`${s}`}return n}let ce=!1;function Qe(e){ce||(ce=!0,fe("msg"),setTimeout(()=>{ce=!1},200))}const bo=e=>{if(e.method==="post"&&e.headers["Content-Type"]==="application/x-www-form-urlencoded"?e.data=pt.stringify(e.data):e.method==="post"&&e.headers["Content-Type"]==="multipart/form-data"&&(e.data=_o(e.data)),e.method==="get"&&e.params){let t=e.url;t+="?";const o=Object.keys(e.params);for(const s of o)e.params[s]!==void 0&&e.params[s]!==null&&(t+=`${s}=${encodeURIComponent(e.params[s])}&`);t=t.substring(0,t.length-1),e.params={},e.url=t}return e},wo=e=>{var t,o,s;if(e.data&&typeof e.data.res<"u"&&(e.data.code=e.data.res,e.data.message=e.data.msg||""),((t=e==null?void 0:e.config)==null?void 0:t.responseType)==="blob")return e;if(e.data.code===vo)return e.data;if(showErrorMsg((o=e==null?void 0:e.data)==null?void 0:o.message),((s=e==null?void 0:e.data)==null?void 0:s.code)===401)be().logout();else return Promise.reject(e.data)},ko=e=>e.response?(console.log("response err： "+e),Co(e)):e.request?(console.log("request err： "+e),So(e)):Promise.reject(e),So=e=>{var a,l,c;const{t}=Ze(),{response:o,code:s,message:n}=e||{};(l=(a=o==null?void 0:o.data)==null?void 0:a.error)==null||l.message;const r=((c=e==null?void 0:e.toString)==null?void 0:c.call(e))??"";return s==="ECONNABORTED"&&n.indexOf("timeout")!==-1?t("common.apiTimeoutMessage"):r!=null&&r.includes("Network Error")&&t("common.networkExceptionMsg"),Qe(),Promise.reject(e)},Co=e=>{var o;let t=(o=e==null?void 0:e.response)==null?void 0:o.status;return yo(e),Qe(),t===401&&be().logout(),Promise.reject(e)},Oo="",z=new Map,W=gt.create({timeout:po,baseURL:Oo});W.interceptors.request.use(e=>{const t=new AbortController,o=e.url||"";return e.signal=t.signal,z.set(o,t),e});W.interceptors.response.use(e=>{const t=e.config.url||"";return z.delete(t),e},e=>Promise.reject(e));W.interceptors.request.use(bo);W.interceptors.response.use(wo);W.interceptors.response.use(void 0,ko);const ve={request:e=>new Promise((t,o)=>{var s;(s=e.interceptors)!=null&&s.requestInterceptors&&(e=e.interceptors.requestInterceptors(e)),W.request(e).then(n=>{t(n)}).catch(n=>{o(n)})}),cancelRequest:e=>{var o;const t=Array.isArray(e)?e:[e];for(const s of t)(o=z.get(s))==null||o.abort(),z.delete(s)},cancelAllRequest(){for(const[e,t]of z)t.abort();z.clear()}},ee=e=>{const t=be(),o=xt(),{url:s,method:n,params:r,data:a,headers:l,responseType:c,withToken:d}=e,g=o.getCurrentLocale,m={"Content-Type":go,"X-Requested-With":"XMLHttpRequest",lang:g.lang,...l};return d||(m.token=t.getToken??""),ve.request({url:s,method:n,params:r,data:a,responseType:c,headers:{...m}})},re={get:e=>ee({method:"get",...e}),post:e=>ee({method:"post",...e}),delete:e=>ee({method:"delete",...e}),put:e=>ee({method:"put",...e}),cancelRequest:e=>ve.cancelRequest(e),cancelAllRequest:()=>ve.cancelAllRequest()},To="",Io=e=>new mo({url:To+"/chat/request",data:e}),Mo=e=>re.post({url:"/chat/welcome",data:e}),xo=e=>re.post({url:"/manage/getDialogueList",data:e}),Eo=e=>re.post({url:"/chat/message",data:e}),Lo=({id:e,prompt:t})=>re.post({url:"/manage/editPrompt",data:{id:e,prompt:t}}),Po=$e("chat",()=>{const e=Ke(),t=_([]);let o=null;const s=_(0),n=_(""),r=se({admin_user_id:"",avatar:"",id:"",name:"",nickname:"",openid:""}),a=se({id:null,library_ids:"",prompt:"",robot_avatar:"",robot_intro:"",robot_key:"",robot_name:"",openid:"",welcomes:{content:"",question:[]}}),l=_(!1),c=async i=>{o&&(o.abort(),o=null),t.value=[],y.value=!1,v.value=!1,i.dialogue_id?(l.value=!1,s.value=i.dialogue_id):(l.value=!0,s.value=0),n.value=i.openid||Xe(),a.robot_key=i.robot_key,a.openid=n.value,r.openid=n.value,r.avatar=i.avatar||me,r.name=i.name||"",r.nickname=i.nickname||"";const b=await Mo({robot_key:a.robot_key,openid:n.value,nickname:r.nickname,name:r.name,avatar:r.avatar||me});try{const M=b.data.customer,u=b.data.robot;return r.admin_user_id=M.admin_user_id,r.avatar=M.avatar,r.id=M.id,r.name=M.name,r.nickname=M.nickname,a.library_ids=u.library_ids,a.prompt=u.prompt,a.robot_avatar=u.robot_avatar,a.robot_intro=u.robot_intro,a.robot_key=u.robot_key,a.robot_name=u.robot_name,a.library_ids=u.library_ids,a.id=u.id,u.welcomes&&(a.welcomes=JSON.parse(u.welcomes)),d(b.data.message),b}catch(M){Promise.reject(M)}},d=i=>{i&&(i.uid=G(32),i.loading=!1,i.isWelcome=!0,i.avatar=a.robot_avatar,i.menu_json&&(i.menu_json=JSON.parse(i.menu_json)),i.quote_file&&(i.quote_file=JSON.parse(i.quote_file)),t.value.push(i))},g=i=>{i.uid=G(32),i.loading=!1,i.avatar=r.avatar,i.openid=r.openid,i.msg_type=1,i.is_customer=1,t.value.push(i)},m=i=>{t.value.push(i),e.emit("updateAiMessage",i)},p=(i,b,M)=>{const u=t.value.findIndex(x=>x.uid==M);if(i=="sending"){const x=t.value[u].content;t.value[u].content=x+b}i=="quote_file"&&(t.value[u].quote_file=b.length>0?b:[]),i=="ai_message"&&(t.value[u].id=b.id),i=="debug"&&(t.value[u].debug=b.length>0?b:[]),e.emit("updateAiMessage",t.value[u])},h=()=>{const i=t.value.length-1;t.value[i].loading=!1},v=_(!1),w=i=>{if(v.value)return;const b={loading:!0,id:"",content:"",uid:G(32),avatar:a.robot_avatar,msg_type:1,quote_file:[],is_customer:0,debug:[]},M={robot_key:a.robot_key,openid:a.openid,question:i.message,prompt:a.prompt,library_ids:a.library_ids,dialogue_id:s.value};v.value=!0,o=Io(M),o.onMessage=u=>{if(u.event=="dialogue_id"&&(s.value=u.data),u.event=="c_message"){const x=JSON.parse(u.data);g(x)}if(u.event=="robot"&&(m(b),l.value&&(l.value=!1)),u.event=="sending"&&p("sending",u.data,b.uid),u.event=="ai_message"){const x=JSON.parse(u.data);p("ai_message",x,b.uid)}if(u.event=="quote_file"){const x=JSON.parse(u.data);p("quote_file",x,b.uid)}if(u.event=="debug"){const x=JSON.parse(u.data);p("debug",x,b.uid)}},o.onClose=()=>{h(),v.value=!1,o=null}},k=25,C=_([]),I=_(!1),q=_(!1),R=async()=>{if(q.value||I.value)return!1;let i=0;C.value.length>0&&(i=C.value[C.value.length-1].id),I.value=!0;const b=await xo({min_id:i,size:k,robot_key:a.robot_key});I.value=!1;const M=b.data||[];return M.length===0?(q.value=!0,!1):(C.value=[...C.value,...M],b)},P=async i=>await c(i),f=20,y=_(!1),S=async()=>{if(y.value)return;let i=0;const b=t.value.filter(u=>!u.isWelcome);b.length>0&&(i=b[0].id);const M={robot_key:a.robot_key,openid:r.openid,min_id:i,size:f,dialogue_id:s.value};try{const u=await Eo(M),x=u.data.list||[];if(x.length===0){y.value=!0;return}return x.sort((E,ot)=>E.id-ot.id),x.forEach(E=>{E.loading=!1,E.uid=G(32),E.is_customer==1?E.avatar=r.avatar:E.avatar=a.robot_avatar,E.menu_json&&(E.menu_json=JSON.parse(E.menu_json)),E.quote_file&&(E.quote_file=JSON.parse(E.quote_file))}),t.value=[...x,...t.value],u}catch(u){Promise.reject(u)}},J=i=>{a.prompt=i},le=()=>Lo({id:a.id,prompt:a.prompt});function tt(){s.value=0,t.value=[],n.value="",r.admin_user_id="",r.avatar="",r.id="",r.name="",r.nickname="",r.openid="",a.id=null,a.library_ids="",a.prompt="",a.robot_avatar="",a.robot_intro="",a.robot_key="",a.robot_key="",a.robot_name="",a.openid="",a.welcomes={content:"",question:[]},l.value=!1,y.value=!1,v.value=!1,I.value=!1,q.value=!1,C.value=[]}return{$reset:tt,user:r,robot:a,dialogue_id:s,openid:n,sendLock:v,messageList:t,createChat:c,sendMessage:w,getMyChatList:R,myChatList:C,openChat:P,onGetChatMessage:S,changeRobotPrompt:J,saveRobotPrompt:le}}),Ao={},et=e=>(De("data-v-7906b4b9"),e=e(),ze(),e),qo={class:"cu-navbar"},Ro={class:"navbar-left"},Bo=et(()=>T("div",{class:"navbar-body"},[T("div",{class:"navbar-title van-ellipsis"},"ZHIMA CHATAI")],-1)),jo=et(()=>T("div",{class:"navbar-right"},null,-1));function $o(e,t){const o=Ne("van-icon");return L(),A("div",qo,[T("div",Ro,[O(o,{class:"navbar-arrow",name:"arrow-left"})]),Bo,jo])}const No=X(Ao,[["render",$o],["__scopeId","data-v-7906b4b9"]]),Do={class:"message-input-box"},zo={class:"message-input-body"},Ho=["value"],Uo=$({__name:"message-input",props:{value:{type:String,default:""}},emits:["update:value","send"],setup(e,{emit:t}){const o=t,s=e,n=l=>{const c=l.target;o("update:value",c.value)},r=()=>{s.value.trim()&&o("send",s.value)},a=l=>{s.value.trim()&&(l.preventDefault(),r())};return(l,c)=>{const d=Ne("svg-icon");return L(),A("div",Do,[T("div",zo,[T("div",{class:He(["message-input",{"is-set":s.value.length>0}])},[T("input",{class:"text-input",type:"text",value:e.value,placeholder:"在此输入您想了解的内容",onChange:n,"on:pressEnter":a},null,40,Ho),O(d,{name:"paper-airplane",class:"send-btn",onClick:r})],2)])])}}}),Fo=X(Uo,[["__scopeId","data-v-cd8c7bb6"]]),Wo=$({__name:"message-list",props:{messages:{type:Array,default:()=>[]}},emits:["clickMsgMeun","scroll","scrollStart","scrollEnd"],setup(e,{expose:t,emit:o}){const s=o,n=e,r=_(null),a={scrollTop:0,scrollHeight:0,clientHeight:0,scrollStartDiff:60,scrollEndDiff:60};let l=null,c=!1;function d(){n.messages.length!=0&&s("scrollStart",{msg:n.messages[0]})}function g(){n.messages.length!=0&&s("scrollEnd",{msg:n.messages[n.messages.length-1]})}function m(v){c||(l!==null&&(clearTimeout(l),l=null),l=window.setTimeout(()=>{a.scrollTop=v.target.scrollTop,a.scrollHeight=v.target.scrollHeight,a.clientHeight=v.target.clientHeight,s("scroll",{...a}),Math.abs(a.scrollTop)<=a.scrollStartDiff&&d(),Math.abs(a.scrollHeight-a.scrollTop-a.clientHeight)<=a.scrollEndDiff&&g()},50))}const p=()=>{r.value&&de(()=>{c=!0,r.value&&(r.value.scrollTop=r.value.scrollHeight+1,setTimeout(()=>{c=!1},50))})};function h(v,w){de(()=>{c=!0,w||(w="top");let k=r.value,C=document.querySelector("#msg-"+v);!k||!C||(w=="top"?k.scrollTop=C.offsetTop:k.scrollTop=C.offsetTop-k.clientHeight+C.clientHeight,setTimeout(()=>{c=!1},50))})}return t({scrollToBottom:p,scrollToMessage:h}),(v,w)=>(L(),A("div",{class:"message-list",ref_key:"scrollBoxRef",ref:r,onScroll:m},[ut(v.$slots,"default",{},void 0)],544))}}),Jo=X(Wo,[["__scopeId","data-v-7e037515"]]),Yo=e=>(De("data-v-3e647e1d"),e=e(),ze(),e),Vo=["id"],Go={class:"message-item-left"},Ko=["src"],Xo={class:"message-item-body"},Zo={class:"message-content"},Qo=Yo(()=>T("span",{class:"triangle"},null,-1)),es={key:0,class:"text-message"},ts={class:"text-message"},os={key:0,class:"question-list"},ss=["onClick"],ns=$({__name:"message-item",props:{msg:{type:Object,required:!0}},emits:["sendTextMessage"],setup(e,{emit:t}){const o=t,s=e,n=ue(()=>s.msg.is_customer==1),r=ue(()=>({"user-message-item":n.value===!0,"robot-message-item":n.value===!1,"welcome-message-item":s.msg.menu_json&&s.msg.menu_json.question})),a=l=>{o("sendTextMessage",l)};return(l,c)=>(L(),A("div",{class:He(["ignore-message-item",r.value]),id:"msg-"+e.msg.uid},[T("div",Go,[T("img",{class:"avatar",src:s.msg.avatar},null,8,Ko)]),T("div",Xo,[T("div",Zo,[Qo,s.msg.msg_type==1?(L(),A("div",es,ie(K(Le)(s.msg.content)),1)):s.msg.msg_type==2?(L(),A(te,{key:1},[T("div",ts,ie(K(Le)(s.msg.menu_json.content)),1),s.msg.menu_json&&s.msg.menu_json.question.length?(L(),A("div",os,[(L(!0),A(te,null,Ue(s.msg.menu_json.question,d=>(L(),A("div",{class:"question-item",key:d,onClick:g=>a(d)},[T("span",null,ie(d),1)],8,ss))),128))])):we("",!0)],64)):we("",!0)])])],10,Vo))}}),as=X(ns,[["__scopeId","data-v-3e647e1d"]]),rs={class:"chat-page"},ls={class:"chat-page-header"},is={class:"chat-page-body"},cs={class:"messages-list-wrap"},us={class:"chat-page-footer"},ds=$({__name:"index",setup(e){const t=mt(),o=Ke(),s=Po(),{sendMessage:n,openChat:r,onGetChatMessage:a,$reset:l}=s,{messageList:c,sendLock:d,dialogue_id:g}=dt(s);let m=!0;const p=_(null),h=f=>{p.value&&p.value.scrollToMessage(f)},v=()=>{p.value&&m&&p.value.scrollToBottom()},w=async()=>{m=!1;let f=c.value[0].uid;await a()&&h(f)},k=()=>{},C=async()=>{m=!0;let f=t.query||{},y={robot_key:f.robot_key,avatar:f.avatar||"",name:f.name||"",nickname:f.nickname||"",openid:Xe(),dialogue_id:g.value};await r(y),await a()&&v()},I=_(""),q=f=>{if(!f)return fe("请输入消息内容");n({message:f})},R=async()=>{if(!I.value)return fe("请输入消息内容");m=!0,q(I.value),I.value=""},P=()=>{p.value&&v()};return pe(()=>{C(),o.on("updateAiMessage",P)}),je(()=>{l(),o.off("updateAiMessage",P)}),(f,y)=>(L(),A("div",rs,[T("div",ls,[O(No)]),T("div",is,[T("div",cs,[O(Jo,{ref_key:"messageListRef",ref:p,messages:K(c),onScrollStart:w,onScrollEnd:k},{default:ft(()=>[(L(!0),A(te,null,Ue(K(c),S=>(L(),vt(as,{key:S.uid,msg:S,onSendTextMessage:q},null,8,["msg"]))),128))]),_:1},8,["messages"])])]),T("div",us,[O(Fo,{value:I.value,"onUpdate:value":y[0]||(y[0]=S=>I.value=S),onSend:R,loading:K(d)},null,8,["value","loading"])])]))}}),ys=X(ds,[["__scopeId","data-v-57c274c0"]]);export{ys as default};