"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[422],{6422:function(t,a,e){e.r(a),e.d(a,{GradePointChart:function(){return g}});var r=e(5893),n=e(1722),c=e(9805),s=e(9253),o=e(400),l=e(4888),i=e(4195),h=e(6880),m=e(3023),u=e(5358);let d={1e3:"200バッジ",1200:"銅バッジ",1400:"銀バッジ",1665:"危険度MAX目安",1799:"カンスト"},p=t=>{let{active:a,payload:e,label:n}=t;return a&&e&&e.length?(0,r.jsxs)("div",{className:"custom-tooltip",children:[(0,r.jsx)("p",{className:"label",children:"".concat(k(n))}),(0,r.jsx)("p",{className:"intro",children:"".concat(e[0].payload.grade," ").concat(e[0].payload.gradePoint," ").concat(e[0].value)})]}):(0,r.jsx)(r.Fragment,{})},x=(t,a)=>{if(d[t])return d[t];let e=t/100|0;return e<n.kI.length?n.kI[e]:""},k=t=>(0,c.x)(t).format("YYYY-MM-DD HH:mm"),g=t=>{let a=Math.min(...t.graphData.map(t=>t.value))-100,e=Math.max(...t.graphData.map(t=>t.value)),c=n.kI.map((t,a)=>100*a).concat(Object.keys(d).map(Number)).filter(t=>t<=e+300).filter(t=>t>=a);return(0,r.jsx)(s.h,{width:"100%",height:500,children:(0,r.jsxs)(o.w,{data:t.graphData,margin:{top:5,right:20,bottom:5,left:0},children:[(0,r.jsx)(l.u,{content:(0,r.jsx)(p,{}),cursor:{fill:"transparent"}}),(0,r.jsx)(i.q,{stroke:"#ccc",strokeDasharray:"5 5"}),(0,r.jsx)(h.x,{type:"monotone",dataKey:"value",stroke:"#8884d8"}),(0,r.jsx)(m.K,{height:100,dataKey:"name",angle:40,textAnchor:"start",tickFormatter:k}),(0,r.jsx)(u.B,{width:120,tickFormatter:x,domain:["auto","auto"],ticks:c,textAnchor:"end"})]})})}}}]);