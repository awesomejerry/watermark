(this.webpackJsonpwatermark=this.webpackJsonpwatermark||[]).push([[0],{66:function(e,t,a){e.exports=a(80)},71:function(e,t,a){},72:function(e,t,a){},73:function(e,t,a){},79:function(e,t,a){e.exports=a.p+"static/media/logo.8c4f0b91.png"},80:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),i=(a(71),a(72),a(112)),c=a(111),s=a(109),u=a(113),m=a(35),f=(a(73),a(50)),h=a.n(f),d=a(110),g=a(115),v=a(11),w=a(114),b=a(52),E=function(){var e=Object(n.useRef)(null),t=Object(n.useRef)(null),l=Object(n.useRef)(null),o=Object(n.useRef)(null),i=Object(n.useRef)(null),c=Object(n.useState)(null),s=Object(m.a)(c,2),u=s[0],f=s[1],E=Object(n.useState)(null),p=Object(m.a)(E,2),R=p[0],T=p[1],x=Object(n.useState)(""),j=Object(m.a)(x,2),k=j[0],N=j[1],O=Object(n.useState)(null),S=Object(m.a)(O,2),P=S[0],y=S[1];return r.a.createElement("div",{className:"Watermark"},r.a.createElement(g.a,{id:"standard-name",label:"Gathering Name",className:"input-width",margin:"normal",value:k,onChange:function(e){return N(e.target.value)}}),r.a.createElement(v.a,{utils:b.a},r.a.createElement(w.a,{disableToolbar:!0,variant:"inline",format:"MM/dd",margin:"normal",label:"Gathering Date",className:"input-width",KeyboardButtonProps:{"aria-label":"change date"},minDate:Date.now(),value:P,onChange:function(e){return y(e)}})),r.a.createElement("div",{className:"button-margin"},r.a.createElement(d.a,{variant:"contained",color:"primary",onClick:function(){return o.current.click()}},"Choose Photo")),r.a.createElement("input",{id:"upload",ref:o,type:"file",onChange:function(e){return function(e,t){var a=t.setRaw;e.preventDefault();var n=new FileReader,r=e.target.files[0];n.onloadend=function(){a(n.result)},n.readAsDataURL(r)}(e,{setRaw:f})}}),r.a.createElement("img",{src:u,ref:t,alt:"raw",onLoad:function(){return function(e){var t=e.canvasRef,a=e.rawRef,n=e.setPreview,r=e.name,l=e.date,o=(e.logoRef,t.current),i=a.current,c=o.getContext("2d"),s=o.width/i.width,u=o.height/i.height,m=Math.max(s,u),f=(o.width-i.width*m)/2,d=(o.height-i.height*m)/2;c.clearRect(0,0,o.width,o.height),c.drawImage(i,0,0,i.width,i.height,f,d,i.width*m,i.height*m),c.lineWidth=5,c.strokeStyle="#fafafa",c.beginPath(),c.moveTo(80,30),c.lineTo(1e3,30),c.stroke(),c.closePath(),c.beginPath(),c.moveTo(1050,80),c.lineTo(1050,1e3),c.stroke(),c.closePath(),c.beginPath(),c.moveTo(1e3,1050),c.lineTo(80,1050),c.stroke(),c.closePath(),c.beginPath(),c.moveTo(30,1e3),c.lineTo(30,80),c.stroke(),c.closePath(),c.font="normal 700 ".concat(50,"px 'Noto Sans TC', 'Noto Sans', sans-serif");var g=c.measureText("GATHERING").width;c.fillStyle="rgba(0, 0, 0, 0.6)";c.fillRect(70,50,g+20,120),c.textAlign="left",c.fillStyle="#fafafa",c.fillText("NODE",80,100),c.fillText("GATHERING",80,150),c.font="normal 700 ".concat(40,"px 'Noto Sans TC', 'Noto Sans', sans-serif");var v=c.measureText(r).width;c.fillStyle="rgba(0, 0, 0, 0.6)";c.fillRect(1e3-v-20,900,v+40,130),c.textAlign="right",c.fillStyle="#fafafa",c.fillText(r,1e3,950),c.fillText(h()(l).format("MM/DD"),1e3,1010),n(o.toDataURL())}({canvasRef:e,rawRef:t,setPreview:T,name:k,date:P,logoRef:i})}}),r.a.createElement("img",{src:a(79),ref:i,alt:"logo"}),r.a.createElement("canvas",{ref:e,width:1080,height:1080}),R&&r.a.createElement("img",{src:R,ref:l,alt:"download"}),R&&r.a.createElement("div",{className:"button-margin"},r.a.createElement(d.a,{variant:"contained",color:"primary",href:R,download:"cover.jpg"},"Download")))};var p=function(){return r.a.createElement("div",null,r.a.createElement(i.a,{position:"static"},r.a.createElement(c.a,null,r.a.createElement(s.a,{variant:"h6"},"Node Gathering Cover"))),r.a.createElement(u.a,{maxWidth:"sm"},r.a.createElement(E,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[66,1,2]]]);
//# sourceMappingURL=main.e73c6ca7.chunk.js.map