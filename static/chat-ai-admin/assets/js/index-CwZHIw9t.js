import{bO as w,O as h}from"../../index.js";import{x}from"./index-DBNqHYGh.js";import{f as R,B as C,h as M,x as H,y as W,D as B,w as D}from"./vue-chunks-Chs-lyDX.js";const _=R({compatConfig:{MODE:3},name:"ResizeObserver",props:{disabled:Boolean,onResize:Function},emits:["resize"],setup(i,v){let{slots:l}=v;const n=C({width:0,height:0,offsetHeight:0,offsetWidth:0});let c=null,s=null;const r=()=>{s&&(s.disconnect(),s=null)},b=e=>{const{onResize:t}=i,o=e[0].target,{width:z,height:p}=o.getBoundingClientRect(),{offsetWidth:d,offsetHeight:f}=o,g=Math.floor(z),m=Math.floor(p);if(n.width!==g||n.height!==m||n.offsetWidth!==d||n.offsetHeight!==f){const u={width:g,height:m,offsetWidth:d,offsetHeight:f};h(n,u),t&&Promise.resolve().then(()=>{t(h(h({},u),{offsetWidth:d,offsetHeight:f}),o)})}},O=M(),a=()=>{const{disabled:e}=i;if(e){r();return}const t=w(O);t!==c&&(r(),c=t),!s&&t&&(s=new x(b),s.observe(t))};return H(()=>{a()}),W(()=>{a()}),B(()=>{r()}),D(()=>i.disabled,()=>{a()},{flush:"post"}),()=>{var e;return(e=l.default)===null||e===void 0?void 0:e.call(l)[0]}}});export{_ as R};