(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(1983)}])},1983:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return p}});var l=t(5893),n=t(9008),i=t.n(n),r=t(7294),o=t(8800),a=t(5712),c=t(3623),u=t(4846),d=t(3834);let j=["","シェケナダム","アラマキ砦","","","","難破船ドン・ブラコ","ムニ・エール海洋発電所"],h=["バクダン","カタパッド","テッパン","ヘビ","タワー","モグラ","コウモリ","ハシラ","ダイバー","テッキュウ","ナベブタ","キンシャケ","ドロシャケ","グリル",""];var b=t(9077),x=t(5927);let f=e=>{if(!e.statistic)return(0,l.jsx)(l.Fragment,{});let s=e.statistic.result.length,t=e.statistic.result.filter(e=>e.jobResult.isClear).length,n=e.statistic.result.filter(e=>"isBossDefeated"in e.jobResult),i=n.length,r=n.filter(e=>e.jobResult.isBossDefeated).length;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(b.Z.Group,{children:[(0,l.jsx)(b.Z,{label:"総バイト数",value:s}),(0,l.jsx)(b.Z,{label:"バイトクリア数（クリア率）",value:"".concat(t,"(").concat(Math.round(t/s*100),"%)")}),(0,l.jsx)(b.Z,{label:"ヨコヅナバイト数",value:i}),(0,l.jsx)(b.Z,{label:"ヨコヅナクリア数（クリア率）",value:"".concat(r,"(").concat(Math.round(r/i*100),"%)")})]}),(0,l.jsxs)(x.Z,{striped:!0,children:[(0,l.jsx)(x.Z.Header,{children:(0,l.jsxs)(x.Z.Row,{children:[(0,l.jsx)(x.Z.HeaderCell,{children:"種別"}),(0,l.jsx)(x.Z.HeaderCell,{children:"撃破数"}),(0,l.jsx)(x.Z.HeaderCell,{children:"出現数"})]})}),(0,l.jsx)(x.Z.Body,{children:h.map((s,t)=>{if(0!==e.statistic.bossCounts[t])return(0,l.jsxs)(x.Z.Row,{children:[(0,l.jsx)(x.Z.Cell,{children:s}),(0,l.jsx)(x.Z.Cell,{children:e.statistic.bossKillCounts[t]}),(0,l.jsx)(x.Z.Cell,{children:e.statistic.bossCounts[t]})]},s)})})]})]})};function p(){let[e,s]=(0,r.useState)({}),[t,n]=(0,r.useState)(""),h=e=>{let t=e.target.files;t&&Array.from(t).map(e=>{if("application/json"!==e.type)return;let t=new FileReader;t.onload=()=>{if("string"!=typeof t.result)return;let e=JSON.parse(t.result),l=e.reduce((e,s)=>{let t=j[s.schedule.stage_id],l=(0,o.d)("2000-12-27 09:00"),n="YYYY年MM月DD日hh:mm",i=l.add(s.schedule.start_time,"seconds"),r=l.add(s.schedule.end_time,"seconds"),a="".concat(t," (").concat(i.format(n),"-").concat(r.format(n),")"),c=e[a];return c.result.push({playTime:s.play_time,grade:s.players[0].grade,gradePoint:s.players[0].grade_point,jobResult:{isClear:s.job_result.is_clear,...void 0!==s.job_result.is_boss_defeated?{isBossDefeated:s.job_result.is_boss_defeated}:{}}}),c.bossCounts=c.bossCounts.map((e,t)=>e+s.boss_counts[t]),c.bossKillCounts=c.bossKillCounts.map((e,t)=>e+s.players[0].boss_kill_counts[t]),e[a]=c,e},new Proxy({},{get:(e,s)=>s in e?e[s]:{bossKillCounts:Array(15).fill(0),bossCounts:Array(15).fill(0),result:[]}}));s(l)},t.readAsText(e)})},b=Object.keys(e).reduce((s,t)=>{let l=e[t];return s.bossCounts=l.bossCounts.map((e,t)=>e+s.bossCounts[t]),s.bossKillCounts=l.bossKillCounts.map((e,t)=>e+s.bossKillCounts[t]),s},{bossKillCounts:Array(15).fill(0),bossCounts:Array(15).fill(0)});return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(i(),{children:[(0,l.jsx)("title",{children:"SR3 Viewer"}),(0,l.jsx)("meta",{name:"description",content:"Splatoon3 のサーモンランのデータ可視化サイト"}),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,l.jsx)("main",{children:(0,l.jsxs)(a.Z,{children:[(0,l.jsx)(c.Z,{as:"h1",dividing:!0,children:"データ読み込み"}),"Salmonia3+ の「マイページ」 -> 「バックアップ」から出力した json ファイルを選択してください。",(0,l.jsx)("br",{}),(0,l.jsx)("input",{type:"file",onChange:h}),(0,l.jsx)(c.Z,{as:"h1",dividing:!0,children:"リザルト"}),(0,l.jsx)(u.Z,{menu:{secondary:!0,pointing:!0},panes:[{menuItem:"累計",render:()=>(0,l.jsx)(f,{statistic:{...b,result:Object.keys(e).reduce((s,t)=>s.concat(e[t].result),[])}})},{menuItem:"スケジュール",render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d.Z,{placeholder:"バイトスケジュール",fluid:!0,selection:!0,search:!0,options:Object.keys(e).map(e=>({text:e,value:e,key:e})),onChange:(e,s)=>n(s.value.toString())}),(0,l.jsx)(f,{statistic:e[t]})]})}]})]})})]})}}},function(e){e.O(0,[546,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);