var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequire22ef;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,n){t[e]=n},e.parcelRequire22ef=o);var r=o("5dkTx");function d(){var e={blocks:[{id:"block",block:"control",args:{items:[]},action:"",target:"",inverted:""}]};e.blocks[0].action=document.getElementById("action").value,e.blocks[0].target=document.getElementById("target").value,e.blocks[0].inverted=document.getElementById("inverted").value,r.codeutilities.send(JSON.stringify({type:"template",source:"DFOnline Comment Generator",data:JSON.stringify({name:"§6Comment",data:r.encode(JSON.stringify(e))})}))}function i(e=1){var n=[...document.querySelectorAll(".comment")],t=(n.findIndex((e=>e===document.activeElement))+e)%n.length;n[t=t<0?n.length-1:t].focus()}window.onload=()=>{document.getElementById("send").onclick=d},window.onkeydown=e=>("Enter"===e.key&&document.getElementById("send").click(),"ArrowDown"===e.key?(i(1),!1):"ArrowUp"===e.key?(i(-1),!1):void 0);
//# sourceMappingURL=comment.5d462842.js.map
