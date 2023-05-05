import{_ as m,o as r,c as o,a as e,r as v,f as $,g as b,S as N,e as d,d as V,b as C,F as w,t as I,h as p,w as M,p as q,i as D}from"./index-b5198652.js";import{s as H}from"./store-2cf63dc8.js";import{I as g}from"./InlineInput-cd265361.js";import{P as Z}from"./PageHeader-02641712.js";import{C as F}from"./Close-0a1e1c48.js";const T={},A={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},E=e("path",{d:"M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z",fill:"currentColor"},null,-1),L=[E];function P(i,a){return r(),o("svg",A,L)}const j=m(T,[["render",P]]),O={},R={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},z=e("path",{d:"M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z",fill:"currentColor"},null,-1),G=[z];function J(i,a){return r(),o("svg",R,G)}const K=m(O,[["render",J]]);const _=i=>(q("data-v-bac79df3"),i=i(),D(),i),Q={class:"cars"},U={class:"car"},W={class:"number"},X=_(()=>e("label",null,"Number",-1)),Y={class:"driver"},ee=_(()=>e("label",null,"Driver",-1)),te=_(()=>e("label",null,"Race Times",-1)),se={class:"race-times"},re=["data-color"],oe={key:1,class:"color-dot"},ae={class:"delete"},le=["onClick"],ne=_(()=>e("div",{class:"number"},[e("label",null,"Number"),e("input",{name:"number",type:"text",requied:""})],-1)),ce=_(()=>e("div",{class:"driver"},[e("label",null,"Driver"),e("input",{name:"driver",type:"text",required:""})],-1)),ue={__name:"Cars",setup(i){const a=v(H.appState.cars),f=v(H.appState.races),l=v(!1),x=["red","yellow","green","blue"],y=(n,t)=>{a.value[t].driver=n},k=(n,t)=>{a.value[t].id=n},B=n=>{const{number:t,driver:c}=Object.fromEntries(new FormData(n.target));if(a.value.find(u=>u.id==t))alert("A car's number must be unique.");else{l.value=!0;const u={id:t,driver:c,races:x.map(s=>({lane:s,race:null,time:null}))};a.value.push(u)}n.target.reset(),l.value=!1},S=(n,t)=>{a.value.splice(t,1)};return(n,t)=>(r(),$(N,null,{default:b(()=>[d(Z,null,{title:b(()=>[V("Cars")]),_:1}),e("div",Q,[(r(!0),o(w,null,C(a.value,(c,u)=>(r(),o("div",U,[e("div",W,[X,d(g,{type:"text",onBlur:s=>k(s,u),requied:"",value:c.id},null,8,["onBlur","value"])]),e("div",Y,[ee,d(g,{type:"text",onBlur:s=>y(s,u),required:"",value:c.driver},null,8,["onBlur","value"])]),e("div",null,[te,e("div",se,[(r(!0),o(w,null,C(c.races.sort((s,h)=>s.race-h.race),(s,h)=>(r(),o("div",null,[s.time?(r(),o("span",{key:0,class:"color-dot","data-color":s.lane},"⏺",8,re)):(r(),o("span",oe,"⏺")),V(" "+I(s.time),1)]))),256))])]),e("div",ae,[f.value.length==0?(r(),o("button",{key:0,onClick:s=>S(s,u),title:"delete"},[d(j)],8,le)):p("",!0)])]))),256))]),l.value?(r(),o("form",{key:0,name:"new-car",class:"car",onSubmit:t[1]||(t[1]=M(c=>B(c),["prevent"]))},[ne,ce,e("button",{type:"button",onClick:t[0]||(t[0]=()=>{l.value=!l.value})},[d(F)]),e("button",null,[d(K)])],32)):p("",!0),!l.value&&f.value.length==0?(r(),o("button",{key:1,class:"new-car-button",onClick:t[2]||(t[2]=()=>{l.value=!l.value})}," + New Car ")):p("",!0)]),_:1}))}},me=m(ue,[["__scopeId","data-v-bac79df3"]]);export{me as default};
