"use strict";(self.webpackChunkoulae_dumi_component_web=self.webpackChunkoulae_dumi_component_web||[]).push([[433],{41586:function(K,E,r){r.r(E);var C=r(22920),b=r(76260),O=r(92671),s=r(86074),n=[{label:"\u54C1\u724C",value:"brand"},{label:"\u6D4F\u89C8\u5668",value:"browser"},{label:"\u64CD\u4F5C\u7CFB\u7EDF",value:"system"},{label:"\u8F6F\u4EF6",value:"software"}],A={brand:[{label:"\u963F\u91CC",value:"ali"},{label:"\u767E\u5EA6",value:"baidu"},{label:"\u817E\u8BAF",value:"tecent"}],browser:[{label:"\u8C37\u6B4C",value:"chrome"},{label:"\u706B\u72D0",value:"firefox"},{label:"Edge",value:"edge"}]},R=[{label:"\u7B49\u4E8E",value:"=="},{label:"\u4E0D\u7B49\u4E8E",value:"!="},{label:"\u5927\u4E8E",value:">"},{label:"\u5927\u4E8E\u7B49\u4E8E",value:">="},{label:"\u5C0F\u4E8E",value:"<"},{label:"\u5C0F\u4E8E\u7B49\u4E8E",value:"<="}],F={ops:"and",children:[{key:"brand",op:"!=",value:"ali"},{key:"system",op:"==",value:"31"},{ops:"and",children:[{key:"software",op:"!=",value:"31"},{key:"browser",op:"<",value:"firefox"}]}]},P=function(){var I=function(y){console.log(y)};return(0,s.jsx)("div",{children:(0,s.jsxs)(C.Z,{onFinish:I,initialValues:{relation:F},children:[(0,s.jsx)(C.Z.Item,{label:"\u6D4B\u8BD5\u6570\u636E",name:"relation",children:(0,s.jsx)(O.RelationComponent,{keyMap:n,handleMap:R,valueMap:A})}),(0,s.jsx)(C.Z.Item,{wrapperCol:{span:12,offset:6},children:(0,s.jsx)(b.ZP,{type:"primary",htmlType:"submit",children:"Submit"})})]})})};E.default=P},24503:function(K,E,r){r.r(E);var C=r(22920),b=r(76260),O=r(92671),s=r(86074),n=[{label:"\u54C1\u724C",value:"brand"},{label:"\u6D4F\u89C8\u5668",value:"browser"},{label:"\u64CD\u4F5C\u7CFB\u7EDF",value:"system"},{label:"\u8F6F\u4EF6",value:"software"}],A={brand:[{label:"\u963F\u91CC",value:"ali"},{label:"\u767E\u5EA6",value:"baidu"},{label:"\u817E\u8BAF",value:"tecent"}],browser:[{label:"\u8C37\u6B4C",value:"chrome"},{label:"\u706B\u72D0",value:"firefox"},{label:"Edge",value:"edge"}]},R=[{label:"\u7B49\u4E8E",value:"=="},{label:"\u4E0D\u7B49\u4E8E",value:"!="},{label:"\u5927\u4E8E",value:">"},{label:"\u5927\u4E8E\u7B49\u4E8E",value:">="},{label:"\u5C0F\u4E8E",value:"<"},{label:"\u5C0F\u4E8E\u7B49\u4E8E",value:"<="}],F={ops:"and",children:[{key:"brand",op:"!=",value:"ali"},{key:"system",op:"==",value:"31"},{ops:"and",children:[{key:"software",op:"!=",value:"31"},{key:"browser",op:"<",value:"firefox"}]}]},P=function(){var I=function(y){console.log(y)};return(0,s.jsx)("div",{children:(0,s.jsxs)(C.Z,{onFinish:I,initialValues:{},children:[(0,s.jsx)(C.Z.Item,{label:"\u6D4B\u8BD5\u6570\u636E",name:"relation",children:(0,s.jsx)(O.RelationComponent,{keyMap:n,handleMap:R,valueMap:A})}),(0,s.jsx)(C.Z.Item,{wrapperCol:{span:12,offset:6},children:(0,s.jsx)(b.ZP,{type:"primary",htmlType:"submit",children:"Submit"})})]})})};E.default=P},92671:function(K,E,r){r.r(E),r.d(E,{RelationComponent:function(){return ae}});var C=r(90783),b=r(22920),O=r(68775),s=r(62435),n=r(86074),A=C.Z.Option,R=function(e){var u=e.data,i=e.pos,m=e.onChange,v=e.keyMap,f=e.handleMap,h=e.valueMap,c=e.defaultValueStatus,o=u.key,p=u.op,T=u.value,g=function(l){typeof m=="function"&&m(l)},N=function(l){g({key:l})},Z=function(l){g({op:l})},B=function(l){g({value:l.target.value})},x=function(l){g({value:l})},t=function(){var l;return o?(l=h[o])!==null&&l!==void 0&&l.length?(0,n.jsx)(b.Z.Item,{name:["relations_validate",i,"value_value"],initialValue:T,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u64CD\u4F5C\u503C"}],style:{marginRight:"6px"},children:(0,n.jsx)(C.Z,{placeholder:"\u8BF7\u9009\u62E9\u64CD\u4F5C\u503C",onChange:x,children:h[o].map(function(j,D){return(0,n.jsx)(A,{value:j.value,children:j.label},D)})})}):(0,n.jsx)(b.Z.Item,{name:["relations_validate",i,"value_value"],initialValue:T,rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u64CD\u4F5C\u503C"}],style:{marginRight:"6px"},children:(0,n.jsx)(O.Z,{placeholder:"\u8BF7\u8F93\u5165\u64CD\u4F5C\u503C",value:T,onChange:B})}):null};return(0,s.useEffect)(function(){c&&g({key:v[0].value,op:f[0].value})},[]),(0,n.jsxs)("div",{className:"term",children:[(0,n.jsx)("span",{className:"element",children:(0,n.jsx)(b.Z.Item,{name:["relations_validate",i,"element_value"],initialValue:o,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u6761\u4EF6"}],style:{marginRight:"6px"},children:(0,n.jsx)(C.Z,{placeholder:"\u8BF7\u9009\u62E9\u6761\u4EF6\u9879",onChange:N,children:v.map(function(a,l){return(0,n.jsx)(A,{value:a.value,children:a.label},l)})})})}),(0,n.jsx)("span",{className:"comparison",children:(0,n.jsx)(b.Z.Item,{name:["relations_validate",i,"comparison_value"],initialValue:p,rules:[{required:!0,message:"\u8BF7\u9009\u62E9\u5173\u7CFB\u7B26"}],style:{marginRight:"6px"},children:(0,n.jsx)(C.Z,{placeholder:"\u8BF7\u9009\u62E9\u5173\u7CFB\u7B26",onChange:Z,children:f.map(function(a,l){return(0,n.jsx)(A,{value:a.value,children:a.label},l)})})})}),(0,n.jsx)("span",{className:"value",children:t()})]})};R.defaultProps={defaultValueStatus:!1};var F=R,P=r(27424),G=r.n(P),I=r(12902),L=r(42122),y=r.n(L),k=r(76260),W=function(e){var u=e.data,i=e.pos,m=e.setElementTerm,v=e.onDeleteTerm,f=e.onTermChange,h=function(){typeof v=="function"&&v(i,u)},c=function(p){typeof f=="function"&&f(i,y()(y()({},u),p))};return typeof m!="function"?(console.error("setElementTerm \u5C5E\u6027\u5FC5\u987B\u8BBE\u7F6E\uFF0C\u4E14\u5FC5\u987B\u662F\u8FD4\u56DE ReactElement \u7684Function"),null):(0,n.jsxs)("div",{className:"vui-relation-item",children:[m(u,i,c),(0,n.jsx)(k.ZP,{type:"primary",danger:!0,onClick:h,className:"delete-term",children:"\u5220\u9664"})]})},w=W,H=C.Z.Option,S="_",Y=[{label:"\u6216",value:"and"},{label:"\u4E14",value:"or"}],$=function d(e){var u=e.data,i=e.pos,m=e.setElementTerm,v=e.onAddGroup,f=e.onAddTerm,h=e.onOpsChange,c=e.onDeleteTerm,o=e.onTermChange,p=function(){var a=U(i),l=u.children;return a.push(String(l.length-1)),a.join(S)},T=function(a){typeof h=="function"&&h(i,y()(y()({},u),{},{ops:a}))},g=function(){var a={},l=p();typeof f=="function"&&f(l,a)},N=function(){var a={ops:V.AND,children:[{}]},l=p();typeof v=="function"&&v(l,a)},Z=u.children,B=u.ops,x=B||V.AND;return console.log("RelationGroup data: ",u),(0,n.jsxs)("div",{className:"vui-relation-group",children:[(0,n.jsx)("div",{className:"relational",children:(0,n.jsx)(C.Z,{className:"relation-sign",value:x,onChange:T,children:Y.map(function(t,a){return(0,n.jsx)(H,{value:t.value,children:t.label},a)})})}),(0,n.jsxs)("div",{className:"conditions",children:[Z.map(function(t,a){var l=t,j=l.children,D=z(i,a);return j&&j.length?(0,n.jsx)(d,{pos:D,data:t,setElementTerm:m,onAddGroup:v,onAddTerm:f,onOpsChange:h,onDeleteTerm:c,onTermChange:o},D):(0,n.jsx)(w,{pos:D,data:t,setElementTerm:m,onDeleteTerm:c,onTermChange:o},D)}),(0,n.jsxs)("div",{className:"operators",children:[(0,n.jsx)(k.ZP,{type:"primary",className:"add-term",onClick:g,children:"\u52A0\u6761\u4EF6"}),(0,n.jsx)(k.ZP,{type:"primary",className:"add-group",onClick:N,children:"\u52A0\u6761\u4EF6\u7EC4"})]})]})]})},z=function(e,u){return e?"".concat(e).concat(S).concat(u):String(u)},U=function(e){return e&&e.split(S)||[]},J=$,V;(function(d){d.AND="and",d.OR="or"})(V||(V={}));var M;(function(d){d.addGroup="addGroup",d.addTerm="addTerm",d.changeOps="changeOps",d.deleteTerm="deleteTerm",d.changeTerm="changeTerm"})(M||(M={}));var Q={ops:V.AND,children:[{}]},X=function(e){var u=e.value,i=e.onValueChange,m=e.setElementTerm,v=e.fromItemOnChange,f=(0,s.useState)(u||Q),h=G()(f,2),c=h[0],o=h[1];(0,s.useEffect)(function(){v&&v(c)},[c]);var p=function(t,a,l){var j=q(c,t,l,a);typeof i=="function"&&i(j,l,a),o(j)},T=function(t,a){p(t,a,M.addGroup)},g=function(t,a){p(t,a,M.addTerm)},N=function(t,a){p(t,a,M.changeOps)},Z=function(t,a){p(t,a,M.deleteTerm)},B=function(t,a){p(t,a,M.changeTerm)};return(0,n.jsx)("div",{className:"vui-relation-tree",children:(0,n.jsx)(J,{pos:"",data:c,setElementTerm:m,onAddGroup:T,onAddTerm:g,onOpsChange:N,onDeleteTerm:Z,onTermChange:B})})},q=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"",i=arguments.length>2?arguments[2]:void 0,m=arguments.length>3?arguments[3]:void 0;if(!u)return m;var v=U(u),f=v.length-1;return(0,I.ZP)(e,function(h){var c={data:h,idx:0},o=h.children||[];v.forEach(function(p,T){var g=Number(p);if(T===f)switch(i){case"addTerm":case"addGroup":o.splice(g+1,0,m);break;case"deleteTerm":o.splice(g,1),o.length||c.data.splice(c.idx,1);break;default:o[g]=m}else c={data:o,idx:g},o=o[g]&&o[g].children||[]})})},_=X,ee=function(e){var u=e.keyMap,i=e.handleMap,m=e.value,v=e.valueMap,f=e.onValueChange,h=function(o,p,T){return(0,n.jsx)(F,{keyMap:u,handleMap:i,valueMap:v,pos:p,data:o,onChange:T})};return(0,n.jsx)(_,{value:m,onValueChange:f,fromItemOnChange:e.onChange,setElementTerm:h})},ae=ee}}]);