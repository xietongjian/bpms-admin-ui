!function(){function n(n){console.log(11111);const{code:e,key:o,keyCode:t,shiftKey:i,ctrlKey:d,metaKey:r}=n;return"F12"===e||"F12"===o||123==t?(n.preventDefault(),new Error("Illegal input")):(83!=t&&"S"!==o||!d&&!r)&&(!i||!d&&!r||"I"!==o&&"I"!==o&&73!=t&&"KeyI"!==e)?void 0:(n.preventDefault(),new Error("Illegal input"))}document.addEventListener("contextmenu",(function(){return!1})),document.oncontextmenu=function(){return!1},document.addEventListener("keydown",n),document.onkeydown=n;const e=window.innerHeight,o=window.innerWidth;window.onresize=function(){e==window.innerHeight&&o==window.innerWidth||(window.close(),window.location="about:blank")}}(),function(){function n(){const n=new Date;return new Date-n>10&&(document.body.innerHTML="<div>Illegal operation</div>",!0)}function e(){for(;n();)n()}n()?e():window.onblur=function(){setTimeout((function(){e()}),500)}}(),window.self!==window.top&&(window.top.location.href=window.location.href);
