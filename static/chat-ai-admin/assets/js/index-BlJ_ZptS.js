import{K as F,N as L,b0 as O,O as w,P as V,aj as A,H as W,Q as X,b2 as R,al as v,R as j,X as I,a6 as K,L as N,ad as b,bc as U,a2 as c,a7 as x}from"../../index.js";import{u as Q}from"./inputProps-DYO7gEw-.js";import{f as G,b as M,v as q,e as f,w as J,x as Y,z as Z,k as o}from"./vue-chunks-Chs-lyDX.js";const k=i=>{const{componentCls:n}=i,e=`${n}-inner`;return{[n]:{[`&${n}-small`]:{minWidth:i.switchMinWidthSM,height:i.switchHeightSM,lineHeight:`${i.switchHeightSM}px`,[`${n}-inner`]:{paddingInlineStart:i.switchInnerMarginMaxSM,paddingInlineEnd:i.switchInnerMarginMinSM,[`${e}-checked`]:{marginInlineStart:`calc(-100% + ${i.switchPinSizeSM+i.switchPadding*2}px - ${i.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(100% - ${i.switchPinSizeSM+i.switchPadding*2}px + ${i.switchInnerMarginMaxSM*2}px)`},[`${e}-unchecked`]:{marginTop:-i.switchHeightSM,marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:i.switchPinSizeSM,height:i.switchPinSizeSM},[`${n}-loading-icon`]:{top:(i.switchPinSizeSM-i.switchLoadingIconSize)/2,fontSize:i.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:i.switchInnerMarginMinSM,paddingInlineEnd:i.switchInnerMarginMaxSM,[`${e}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${e}-unchecked`]:{marginInlineStart:`calc(100% - ${i.switchPinSizeSM+i.switchPadding*2}px + ${i.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(-100% + ${i.switchPinSizeSM+i.switchPadding*2}px - ${i.switchInnerMarginMaxSM*2}px)`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${i.switchPinSizeSM+i.switchPadding}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${e}`]:{[`${e}-unchecked`]:{marginInlineStart:i.marginXXS/2,marginInlineEnd:-i.marginXXS/2}},[`&${n}-checked ${e}`]:{[`${e}-checked`]:{marginInlineStart:-i.marginXXS/2,marginInlineEnd:i.marginXXS/2}}}}}}},ii=i=>{const{componentCls:n}=i;return{[n]:{[`${n}-loading-icon${i.iconCls}`]:{position:"relative",top:(i.switchPinSize-i.fontSize)/2,color:i.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:i.switchColor}}}},ni=i=>{const{componentCls:n}=i,e=`${n}-handle`;return{[n]:{[e]:{position:"absolute",top:i.switchPadding,insetInlineStart:i.switchPadding,width:i.switchPinSize,height:i.switchPinSize,transition:`all ${i.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:i.colorWhite,borderRadius:i.switchPinSize/2,boxShadow:i.switchHandleShadow,transition:`all ${i.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${e}`]:{insetInlineStart:`calc(100% - ${i.switchPinSize+i.switchPadding}px)`},[`&:not(${n}-disabled):active`]:{[`${e}::before`]:{insetInlineEnd:i.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${e}::before`]:{insetInlineEnd:0,insetInlineStart:i.switchHandleActiveInset}}}}},ei=i=>{const{componentCls:n}=i,e=`${n}-inner`;return{[n]:{[e]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:i.switchInnerMarginMax,paddingInlineEnd:i.switchInnerMarginMin,transition:`padding-inline-start ${i.switchDuration} ease-in-out, padding-inline-end ${i.switchDuration} ease-in-out`,[`${e}-checked, ${e}-unchecked`]:{display:"block",color:i.colorTextLightSolid,fontSize:i.fontSizeSM,transition:`margin-inline-start ${i.switchDuration} ease-in-out, margin-inline-end ${i.switchDuration} ease-in-out`,pointerEvents:"none"},[`${e}-checked`]:{marginInlineStart:`calc(-100% + ${i.switchPinSize+i.switchPadding*2}px - ${i.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(100% - ${i.switchPinSize+i.switchPadding*2}px + ${i.switchInnerMarginMax*2}px)`},[`${e}-unchecked`]:{marginTop:-i.switchHeight,marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${e}`]:{paddingInlineStart:i.switchInnerMarginMin,paddingInlineEnd:i.switchInnerMarginMax,[`${e}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${e}-unchecked`]:{marginInlineStart:`calc(100% - ${i.switchPinSize+i.switchPadding*2}px + ${i.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(-100% + ${i.switchPinSize+i.switchPadding*2}px - ${i.switchInnerMarginMax*2}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${e}`]:{[`${e}-unchecked`]:{marginInlineStart:i.switchPadding*2,marginInlineEnd:-i.switchPadding*2}},[`&${n}-checked ${e}`]:{[`${e}-checked`]:{marginInlineStart:-i.switchPadding*2,marginInlineEnd:i.switchPadding*2}}}}}},ai=i=>{const{componentCls:n}=i;return{[n]:w(w(w(w({},V(i)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:i.switchMinWidth,height:i.switchHeight,lineHeight:`${i.switchHeight}px`,verticalAlign:"middle",background:i.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${i.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:i.colorTextTertiary}}),A(i)),{[`&${n}-checked`]:{background:i.switchColor,[`&:hover:not(${n}-disabled)`]:{background:i.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:i.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},ci=F("Switch",i=>{const n=i.fontSize*i.lineHeight,e=i.controlHeight/2,t=2,h=n-t*2,s=e-t*2,d=L(i,{switchMinWidth:h*2+t*4,switchHeight:n,switchDuration:i.motionDurationMid,switchColor:i.colorPrimary,switchDisabledOpacity:i.opacityLoading,switchInnerMarginMin:h/2,switchInnerMarginMax:h+t+t*2,switchPadding:t,switchPinSize:h,switchBg:i.colorBgContainer,switchMinWidthSM:s*2+t*2,switchHeightSM:e,switchInnerMarginMinSM:s/2,switchInnerMarginMaxSM:s+t+t*2,switchPinSizeSM:s,switchHandleShadow:`0 2px 4px 0 ${new O("#00230b").setAlpha(.2).toRgbString()}`,switchLoadingIconSize:i.fontSizeIcon*.75,switchLoadingIconColor:`rgba(0, 0, 0, ${i.opacityLoading})`,switchHandleActiveInset:"-30%"});return[ai(d),ei(d),ni(d),ii(d),k(d)]}),ti=X("small","default"),li=()=>({id:String,prefixCls:String,size:c.oneOf(ti),disabled:{type:Boolean,default:void 0},checkedChildren:c.any,unCheckedChildren:c.any,tabindex:c.oneOfType([c.string,c.number]),autofocus:{type:Boolean,default:void 0},loading:{type:Boolean,default:void 0},checked:c.oneOfType([c.string,c.number,c.looseBool]),checkedValue:c.oneOfType([c.string,c.number,c.looseBool]).def(!0),unCheckedValue:c.oneOfType([c.string,c.number,c.looseBool]).def(!1),onChange:{type:Function},onClick:{type:Function},onKeydown:{type:Function},onMouseup:{type:Function},"onUpdate:checked":{type:Function},onBlur:Function,onFocus:Function}),si=G({compatConfig:{MODE:3},name:"ASwitch",__ANT_SWITCH:!0,inheritAttrs:!1,props:li(),slots:Object,setup(i,n){let{attrs:e,slots:t,expose:h,emit:s}=n;const d=Q(),C=R(),g=M(()=>{var a;return(a=i.disabled)!==null&&a!==void 0?a:C.value});q(()=>{v(),v()});const S=f(i.checked!==void 0?i.checked:e.defaultChecked),m=M(()=>S.value===i.checkedValue);J(()=>i.checked,()=>{S.value=i.checked});const{prefixCls:l,direction:y,size:P}=j("switch",i),[z,H]=ci(l),u=f(),p=()=>{var a;(a=u.value)===null||a===void 0||a.focus()};h({focus:p,blur:()=>{var a;(a=u.value)===null||a===void 0||a.blur()}}),Y(()=>{Z(()=>{i.autofocus&&!g.value&&u.value.focus()})});const $=(a,r)=>{g.value||(s("update:checked",a),s("change",a,r),d.onFieldChange())},E=a=>{s("blur",a)},T=a=>{p();const r=m.value?i.unCheckedValue:i.checkedValue;$(r,a),s("click",r,a)},D=a=>{a.keyCode===x.LEFT?$(i.unCheckedValue,a):a.keyCode===x.RIGHT&&$(i.checkedValue,a),s("keydown",a)},_=a=>{var r;(r=u.value)===null||r===void 0||r.blur(),s("mouseup",a)},B=M(()=>({[`${l.value}-small`]:P.value==="small",[`${l.value}-loading`]:i.loading,[`${l.value}-checked`]:m.value,[`${l.value}-disabled`]:g.value,[l.value]:!0,[`${l.value}-rtl`]:y.value==="rtl",[H.value]:!0}));return()=>{var a;return z(o(U,null,{default:()=>[o("button",I(I(I({},K(i,["prefixCls","checkedChildren","unCheckedChildren","checked","autofocus","checkedValue","unCheckedValue","id","onChange","onUpdate:checked"])),e),{},{id:(a=i.id)!==null&&a!==void 0?a:d.id.value,onKeydown:D,onClick:T,onBlur:E,onMouseup:_,type:"button",role:"switch","aria-checked":S.value,disabled:g.value||i.loading,class:[e.class,B.value],ref:u}),[o("div",{class:`${l.value}-handle`},[i.loading?o(N,{class:`${l.value}-loading-icon`},null):null]),o("span",{class:`${l.value}-inner`},[o("span",{class:`${l.value}-inner-checked`},[b(t,i,"checkedChildren")]),o("span",{class:`${l.value}-inner-unchecked`},[b(t,i,"unCheckedChildren")])])])]}))}}}),ui=W(si);export{ui as _};