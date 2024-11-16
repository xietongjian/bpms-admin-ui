import{d as e,r as n,w as t,c as i,h as o}from"./vue-BUaGmb0L.js";var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function r(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function a(e){if(e.__esModule)return e;var n=e.default;if("function"==typeof n){var t=function e(){return this instanceof e?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};t.prototype=n.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(e).forEach((function(n){var i=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,i.get?i:{enumerable:!0,get:function(){return e[n]}})})),t}function c(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((n=>{const t=e[n],i=typeof t;"object"!==i&&"function"!==i||Object.isFrozen(t)||c(t)})),e}class l{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function g(e,...n){const t=Object.create(null);for(const i in e)t[i]=e[i];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}const d=e=>!!e.scope;class h{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=u(e)}openNode(e){if(!d(e))return;const n=((e,{prefix:n})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const t=e.split(".");return[`${n}${t.shift()}`,...t.map(((e,n)=>`${e}${"_".repeat(n+1)}`))].join(" ")}return`${n}${e}`})(e.scope,{prefix:this.classPrefix});this.span(n)}closeNode(e){d(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const f=(e={})=>{const n={children:[]};return Object.assign(n,e),n};class p{constructor(){this.rootNode=f(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n=f({scope:e});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{p._collapse(e)})))}}class b extends p{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,n){const t=e.root;n&&(t.scope=`language:${n}`),this.add(t)}toHTML(){return new h(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function m(e){return e?"string"==typeof e?e:e.source:null}function w(e){return x("(?=",e,")")}function y(e){return x("(?:",e,")*")}function E(e){return x("(?:",e,")?")}function x(...e){return e.map((e=>m(e))).join("")}function _(...e){const n=function(e){const n=e[e.length-1];return"object"==typeof n&&n.constructor===Object?(e.splice(e.length-1,1),n):{}}(e);return"("+(n.capture?"":"?:")+e.map((e=>m(e))).join("|")+")"}function v(e){return new RegExp(e.toString()+"|").exec("").length-1}const N=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function O(e,{joinWith:n}){let t=0;return e.map((e=>{t+=1;const n=t;let i=m(e),o="";for(;i.length>0;){const e=N.exec(i);if(!e){o+=i;break}o+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?o+="\\"+String(Number(e[1])+n):(o+=e[0],"("===e[0]&&t++)}return o})).map((e=>`(${e})`)).join(n)}const M="[a-zA-Z]\\w*",S="[a-zA-Z_]\\w*",k="\\b\\d+(\\.\\d+)?",j="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",R="\\b(0b[01]+)",A={begin:"\\\\[\\s\\S]",relevance:0},T={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[A]},I={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[A]},L=function(e,n,t={}){const i=g({scope:"comment",begin:e,end:n,contains:[]},t);i.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const o=_("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return i.contains.push({begin:x(/[ ]+/,"(",o,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i},B=L("//","$"),P=L("/\\*","\\*/"),D=L("#","$"),H={scope:"number",begin:k,relevance:0},C={scope:"number",begin:j,relevance:0},$={scope:"number",begin:R,relevance:0},z={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[A,{begin:/\[/,end:/\]/,relevance:0,contains:[A]}]},U={scope:"title",begin:M,relevance:0},W={scope:"title",begin:S,relevance:0},G={begin:"\\.\\s*"+S,relevance:0};var X=Object.freeze({__proto__:null,APOS_STRING_MODE:T,BACKSLASH_ESCAPE:A,BINARY_NUMBER_MODE:$,BINARY_NUMBER_RE:R,COMMENT:L,C_BLOCK_COMMENT_MODE:P,C_LINE_COMMENT_MODE:B,C_NUMBER_MODE:C,C_NUMBER_RE:j,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})},HASH_COMMENT_MODE:D,IDENT_RE:M,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:G,NUMBER_MODE:H,NUMBER_RE:k,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:I,REGEXP_MODE:z,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=x(n,/.*\b/,e.binary,/\b.*/)),g({scope:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},TITLE_MODE:U,UNDERSCORE_IDENT_RE:S,UNDERSCORE_TITLE_MODE:W});function K(e,n){"."===e.input[e.index-1]&&n.ignoreMatch()}function F(e,n){void 0!==e.className&&(e.scope=e.className,delete e.className)}function Z(e,n){n&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=K,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function q(e,n){Array.isArray(e.illegal)&&(e.illegal=_(...e.illegal))}function V(e,n){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function J(e,n){void 0===e.relevance&&(e.relevance=1)}const Q=(e,n)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const t=Object.assign({},e);Object.keys(e).forEach((n=>{delete e[n]})),e.keywords=t.keywords,e.begin=x(t.beforeMatch,w(t.begin)),e.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},e.relevance=0,delete t.beforeMatch},Y=["of","and","for","in","not","or","if","then","parent","list","value"],ee="keyword";function ne(e,n,t=ee){const i=Object.create(null);return"string"==typeof e?o(t,e.split(" ")):Array.isArray(e)?o(t,e):Object.keys(e).forEach((function(t){Object.assign(i,ne(e[t],n,t))})),i;function o(e,t){n&&(t=t.map((e=>e.toLowerCase()))),t.forEach((function(n){const t=n.split("|");i[t[0]]=[e,te(t[0],t[1])]}))}}function te(e,n){return n?Number(n):function(e){return Y.includes(e.toLowerCase())}(e)?0:1}const ie={},oe=e=>{console.error(e)},se=(e,...n)=>{console.log(`WARN: ${e}`,...n)},re=(e,n)=>{ie[`${e}/${n}`]||(console.log(`Deprecated as of ${e}. ${n}`),ie[`${e}/${n}`]=!0)},ae=new Error;function ce(e,n,{key:t}){let i=0;const o=e[t],s={},r={};for(let a=1;a<=n.length;a++)r[a+i]=o[a],s[a+i]=!0,i+=v(n[a-1]);e[t]=r,e[t]._emit=s,e[t]._multi=!0}function le(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw oe("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ae;if("object"!=typeof e.beginScope||null===e.beginScope)throw oe("beginScope must be object"),ae;ce(e,e.begin,{key:"beginScope"}),e.begin=O(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw oe("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ae;if("object"!=typeof e.endScope||null===e.endScope)throw oe("endScope must be object"),ae;ce(e,e.end,{key:"endScope"}),e.end=O(e.end,{joinWith:""})}}(e)}function ue(e){function n(n,t){return new RegExp(m(n),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=v(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(O(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),i=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,i)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=g(e.classNameAliases||{}),function t(o,s){const r=o;if(o.isCompiled)return r;[F,V,le,Q].forEach((e=>e(o,s))),e.compilerExtensions.forEach((e=>e(o,s))),o.__beforeBegin=null,[Z,q,J].forEach((e=>e(o,s))),o.isCompiled=!0;let a=null;return"object"==typeof o.keywords&&o.keywords.$pattern&&(o.keywords=Object.assign({},o.keywords),a=o.keywords.$pattern,delete o.keywords.$pattern),a=a||/\w+/,o.keywords&&(o.keywords=ne(o.keywords,e.case_insensitive)),r.keywordPatternRe=n(a,!0),s&&(o.begin||(o.begin=/\B|\b/),r.beginRe=n(r.begin),o.end||o.endsWithParent||(o.end=/\B|\b/),o.end&&(r.endRe=n(r.end)),r.terminatorEnd=m(r.end)||"",o.endsWithParent&&s.terminatorEnd&&(r.terminatorEnd+=(o.end?"|":"")+s.terminatorEnd)),o.illegal&&(r.illegalRe=n(o.illegal)),o.contains||(o.contains=[]),o.contains=[].concat(...o.contains.map((function(e){return function(e){e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(n){return g(e,{variants:null},n)})));if(e.cachedVariants)return e.cachedVariants;if(ge(e))return g(e,{starts:e.starts?g(e.starts):null});if(Object.isFrozen(e))return g(e);return e}("self"===e?o:e)}))),o.contains.forEach((function(e){t(e,r)})),o.starts&&t(o.starts,s),r.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&n.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(r),r}(e)}function ge(e){return!!e&&(e.endsWithParent||ge(e.starts))}class de extends Error{constructor(e,n){super(e),this.name="HTMLInjectionError",this.html=n}}const he=u,fe=g,pe=Symbol("nomatch"),be=function(e){const n=Object.create(null),t=Object.create(null),i=[];let o=!0;const s="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let a={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:b};function u(e){return a.noHighlightRe.test(e)}function g(e,n,t){let i="",o="";"object"==typeof n?(i=e,t=n.ignoreIllegals,o=n.language):(re("10.7.0","highlight(lang, code, ...args) has been deprecated."),re("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),o=e,i=n),void 0===t&&(t=!0);const s={code:i,language:o};M("before:highlight",s);const r=s.result?s.result:d(s.language,s.code,t);return r.code=s.code,M("after:highlight",r),r}function d(e,t,i,r){const c=Object.create(null);function u(){if(!M.keywords)return void k.addText(j);let e=0;M.keywordPatternRe.lastIndex=0;let n=M.keywordPatternRe.exec(j),t="";for(;n;){t+=j.substring(e,n.index);const o=_.case_insensitive?n[0].toLowerCase():n[0],s=(i=o,M.keywords[i]);if(s){const[e,i]=s;if(k.addText(t),t="",c[o]=(c[o]||0)+1,c[o]<=7&&(R+=i),e.startsWith("_"))t+=n[0];else{const t=_.classNameAliases[e]||e;f(n[0],t)}}else t+=n[0];e=M.keywordPatternRe.lastIndex,n=M.keywordPatternRe.exec(j)}var i;t+=j.substring(e),k.addText(t)}function g(){null!=M.subLanguage?function(){if(""===j)return;let e=null;if("string"==typeof M.subLanguage){if(!n[M.subLanguage])return void k.addText(j);e=d(M.subLanguage,j,!0,S[M.subLanguage]),S[M.subLanguage]=e._top}else e=h(j,M.subLanguage.length?M.subLanguage:null);M.relevance>0&&(R+=e.relevance),k.__addSublanguage(e._emitter,e.language)}():u(),j=""}function f(e,n){""!==e&&(k.startScope(n),k.addText(e),k.endScope())}function p(e,n){let t=1;const i=n.length-1;for(;t<=i;){if(!e._emit[t]){t++;continue}const i=_.classNameAliases[e[t]]||e[t],o=n[t];i?f(o,i):(j=o,u(),j=""),t++}}function b(e,n){return e.scope&&"string"==typeof e.scope&&k.openNode(_.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(f(j,_.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),j=""):e.beginScope._multi&&(p(e.beginScope,n),j="")),M=Object.create(e,{parent:{value:M}}),M}function m(e,n,t){let i=function(e,n){const t=e&&e.exec(n);return t&&0===t.index}(e.endRe,t);if(i){if(e["on:end"]){const t=new l(e);e["on:end"](n,t),t.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return m(e.parent,n,t)}function w(e){return 0===M.matcher.regexIndex?(j+=e[0],1):(I=!0,0)}function y(e){const n=e[0],i=t.substring(e.index),o=m(M,e,i);if(!o)return pe;const s=M;M.endScope&&M.endScope._wrap?(g(),f(n,M.endScope._wrap)):M.endScope&&M.endScope._multi?(g(),p(M.endScope,e)):s.skip?j+=n:(s.returnEnd||s.excludeEnd||(j+=n),g(),s.excludeEnd&&(j=n));do{M.scope&&k.closeNode(),M.skip||M.subLanguage||(R+=M.relevance),M=M.parent}while(M!==o.parent);return o.starts&&b(o.starts,e),s.returnEnd?0:n.length}let E={};function x(n,s){const r=s&&s[0];if(j+=n,null==r)return g(),0;if("begin"===E.type&&"end"===s.type&&E.index===s.index&&""===r){if(j+=t.slice(s.index,s.index+1),!o){const n=new Error(`0 width match regex (${e})`);throw n.languageName=e,n.badRule=E.rule,n}return 1}if(E=s,"begin"===s.type)return function(e){const n=e[0],t=e.rule,i=new l(t),o=[t.__beforeBegin,t["on:begin"]];for(const s of o)if(s&&(s(e,i),i.isMatchIgnored))return w(n);return t.skip?j+=n:(t.excludeBegin&&(j+=n),g(),t.returnBegin||t.excludeBegin||(j=n)),b(t,e),t.returnBegin?0:n.length}(s);if("illegal"===s.type&&!i){const e=new Error('Illegal lexeme "'+r+'" for mode "'+(M.scope||"<unnamed>")+'"');throw e.mode=M,e}if("end"===s.type){const e=y(s);if(e!==pe)return e}if("illegal"===s.type&&""===r)return 1;if(T>1e5&&T>3*s.index){throw new Error("potential infinite loop, way more iterations than matches")}return j+=r,r.length}const _=v(e);if(!_)throw oe(s.replace("{}",e)),new Error('Unknown language: "'+e+'"');const N=ue(_);let O="",M=r||N;const S={},k=new a.__emitter(a);!function(){const e=[];for(let n=M;n!==_;n=n.parent)n.scope&&e.unshift(n.scope);e.forEach((e=>k.openNode(e)))}();let j="",R=0,A=0,T=0,I=!1;try{if(_.__emitTokens)_.__emitTokens(t,k);else{for(M.matcher.considerAll();;){T++,I?I=!1:M.matcher.considerAll(),M.matcher.lastIndex=A;const e=M.matcher.exec(t);if(!e)break;const n=x(t.substring(A,e.index),e);A=e.index+n}x(t.substring(A))}return k.finalize(),O=k.toHTML(),{language:e,value:O,relevance:R,illegal:!1,_emitter:k,_top:M}}catch(L){if(L.message&&L.message.includes("Illegal"))return{language:e,value:he(t),illegal:!0,relevance:0,_illegalBy:{message:L.message,index:A,context:t.slice(A-100,A+100),mode:L.mode,resultSoFar:O},_emitter:k};if(o)return{language:e,value:he(t),illegal:!1,relevance:0,errorRaised:L,_emitter:k,_top:M};throw L}}function h(e,t){t=t||a.languages||Object.keys(n);const i=function(e){const n={value:he(e),illegal:!1,relevance:0,_top:r,_emitter:new a.__emitter(a)};return n._emitter.addText(e),n}(e),o=t.filter(v).filter(O).map((n=>d(n,e,!1)));o.unshift(i);const s=o.sort(((e,n)=>{if(e.relevance!==n.relevance)return n.relevance-e.relevance;if(e.language&&n.language){if(v(e.language).supersetOf===n.language)return 1;if(v(n.language).supersetOf===e.language)return-1}return 0})),[c,l]=s,u=c;return u.secondBest=l,u}function f(e){let n=null;const i=function(e){let n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=a.languageDetectRe.exec(n);if(t){const n=v(t[1]);return n||(se(s.replace("{}",t[1])),se("Falling back to no-highlight mode for this block.",e)),n?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>u(e)||v(e)))}(e);if(u(i))return;if(M("before:highlightElement",{el:e,language:i}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(a.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),a.throwUnescapedHTML)){throw new de("One of your code blocks includes unescaped HTML.",e.innerHTML)}n=e;const o=n.textContent,r=i?g(o,{language:i,ignoreIllegals:!0}):h(o);e.innerHTML=r.value,e.dataset.highlighted="yes",function(e,n,i){const o=n&&t[n]||i;e.classList.add("hljs"),e.classList.add(`language-${o}`)}(e,i,r.language),e.result={language:r.language,re:r.relevance,relevance:r.relevance},r.secondBest&&(e.secondBest={language:r.secondBest.language,relevance:r.secondBest.relevance}),M("after:highlightElement",{el:e,result:r,text:o})}let p=!1;function m(){if("loading"===document.readyState)return void(p=!0);document.querySelectorAll(a.cssSelector).forEach(f)}function v(e){return e=(e||"").toLowerCase(),n[e]||n[t[e]]}function N(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{t[e.toLowerCase()]=n}))}function O(e){const n=v(e);return n&&!n.disableAutodetect}function M(e,n){const t=e;i.forEach((function(e){e[t]&&e[t](n)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){p&&m()}),!1),Object.assign(e,{highlight:g,highlightAuto:h,highlightAll:m,highlightElement:f,highlightBlock:function(e){return re("10.7.0","highlightBlock will be removed entirely in v12.0"),re("10.7.0","Please use highlightElement now."),f(e)},configure:function(e){a=fe(a,e)},initHighlighting:()=>{m(),re("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){m(),re("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,i){let s=null;try{s=i(e)}catch(a){if(oe("Language definition for '{}' could not be registered.".replace("{}",t)),!o)throw a;oe(a),s=r}s.name||(s.name=t),n[t]=s,s.rawDefinition=i.bind(null,e),s.aliases&&N(s.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e];for(const n of Object.keys(t))t[n]===e&&delete t[n]},listLanguages:function(){return Object.keys(n)},getLanguage:v,registerAliases:N,autoDetection:O,inherit:fe,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=n=>{e["before:highlightBlock"](Object.assign({block:n.el},n))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=n=>{e["after:highlightBlock"](Object.assign({block:n.el},n))})}(e),i.push(e)},removePlugin:function(e){const n=i.indexOf(e);-1!==n&&i.splice(n,1)}}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="11.9.0",e.regex={concat:x,lookahead:w,either:_,optional:E,anyNumberOfTimes:y};for(const l in X)"object"==typeof X[l]&&c(X[l]);return Object.assign(e,X),e},me=be({});me.newInstance=()=>be({});var we=me;me.HighlightJS=me,me.default=me;const ye=r(we);function Ee(e){const n=e.regex,t=n.concat(/[\p{L}_]/u,n.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),i={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},o={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},s=e.inherit(o,{begin:/\(/,end:/\)/}),r=e.inherit(e.APOS_STRING_MODE,{className:"string"}),a=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[o,a,r,s,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[o,s,a,r]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},i,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[a]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:n.concat(/</,n.lookahead(n.concat(t,n.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:c}]},{className:"tag",begin:n.concat(/<\//,n.lookahead(n.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}var xe=e({props:{code:{type:String,required:!0},language:{type:String,default:""},autodetect:{type:Boolean,default:!0},ignoreIllegals:{type:Boolean,default:!0}},setup:function(e){var o=n(e.language);t((function(){return e.language}),(function(e){o.value=e}));var s=i((function(){return e.autodetect||!o.value})),r=i((function(){return!s.value&&!ye.getLanguage(o.value)}));return{className:i((function(){return r.value?"":"hljs "+o.value})),highlightedCode:i((function(){var n;if(r.value)return console.warn('The language "'+o.value+'" you specified could not be found.'),e.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;");if(s.value){var t=ye.highlightAuto(e.code);return o.value=null!==(n=t.language)&&void 0!==n?n:"",t.value}return(t=ye.highlight(e.code,{language:o.value,ignoreIllegals:e.ignoreIllegals})).value}))}},render:function(){return o("pre",{},[o("code",{class:this.className,innerHTML:this.highlightedCode})])}}),_e={install:function(e){e.component("highlightjs",xe)},component:xe};export{ye as H,a,s as c,r as g,_e as o,Ee as x};