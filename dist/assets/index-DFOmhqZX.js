(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function pw(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var gg={exports:{}},Il={},yg={exports:{}},Q={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var so=Symbol.for("react.element"),mw=Symbol.for("react.portal"),gw=Symbol.for("react.fragment"),yw=Symbol.for("react.strict_mode"),vw=Symbol.for("react.profiler"),_w=Symbol.for("react.provider"),ww=Symbol.for("react.context"),Ew=Symbol.for("react.forward_ref"),Tw=Symbol.for("react.suspense"),Iw=Symbol.for("react.memo"),Sw=Symbol.for("react.lazy"),Zf=Symbol.iterator;function Rw(t){return t===null||typeof t!="object"?null:(t=Zf&&t[Zf]||t["@@iterator"],typeof t=="function"?t:null)}var vg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_g=Object.assign,wg={};function ki(t,e,n){this.props=t,this.context=e,this.refs=wg,this.updater=n||vg}ki.prototype.isReactComponent={};ki.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ki.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Eg(){}Eg.prototype=ki.prototype;function wh(t,e,n){this.props=t,this.context=e,this.refs=wg,this.updater=n||vg}var Eh=wh.prototype=new Eg;Eh.constructor=wh;_g(Eh,ki.prototype);Eh.isPureReactComponent=!0;var ep=Array.isArray,Tg=Object.prototype.hasOwnProperty,Th={current:null},Ig={key:!0,ref:!0,__self:!0,__source:!0};function Sg(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Tg.call(e,r)&&!Ig.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),h=0;h<l;h++)u[h]=arguments[h+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:so,type:t,key:s,ref:o,props:i,_owner:Th.current}}function Aw(t,e){return{$$typeof:so,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ih(t){return typeof t=="object"&&t!==null&&t.$$typeof===so}function Pw(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var tp=/\/+/g;function Tu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Pw(""+t.key):e.toString(36)}function ha(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case so:case mw:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+Tu(o,0):r,ep(i)?(n="",t!=null&&(n=t.replace(tp,"$&/")+"/"),ha(i,e,n,"",function(h){return h})):i!=null&&(Ih(i)&&(i=Aw(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(tp,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",ep(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+Tu(s,l);o+=ha(s,e,n,u,i)}else if(u=Rw(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+Tu(s,l++),o+=ha(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Bo(t,e,n){if(t==null)return t;var r=[],i=0;return ha(t,r,"","",function(s){return e.call(n,s,i++)}),r}function Cw(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var nt={current:null},da={transition:null},kw={ReactCurrentDispatcher:nt,ReactCurrentBatchConfig:da,ReactCurrentOwner:Th};function Rg(){throw Error("act(...) is not supported in production builds of React.")}Q.Children={map:Bo,forEach:function(t,e,n){Bo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Bo(t,function(){e++}),e},toArray:function(t){return Bo(t,function(e){return e})||[]},only:function(t){if(!Ih(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Q.Component=ki;Q.Fragment=gw;Q.Profiler=vw;Q.PureComponent=wh;Q.StrictMode=yw;Q.Suspense=Tw;Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=kw;Q.act=Rg;Q.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=_g({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Th.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)Tg.call(e,u)&&!Ig.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var h=0;h<u;h++)l[h]=arguments[h+2];r.children=l}return{$$typeof:so,type:t.type,key:i,ref:s,props:r,_owner:o}};Q.createContext=function(t){return t={$$typeof:ww,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:_w,_context:t},t.Consumer=t};Q.createElement=Sg;Q.createFactory=function(t){var e=Sg.bind(null,t);return e.type=t,e};Q.createRef=function(){return{current:null}};Q.forwardRef=function(t){return{$$typeof:Ew,render:t}};Q.isValidElement=Ih;Q.lazy=function(t){return{$$typeof:Sw,_payload:{_status:-1,_result:t},_init:Cw}};Q.memo=function(t,e){return{$$typeof:Iw,type:t,compare:e===void 0?null:e}};Q.startTransition=function(t){var e=da.transition;da.transition={};try{t()}finally{da.transition=e}};Q.unstable_act=Rg;Q.useCallback=function(t,e){return nt.current.useCallback(t,e)};Q.useContext=function(t){return nt.current.useContext(t)};Q.useDebugValue=function(){};Q.useDeferredValue=function(t){return nt.current.useDeferredValue(t)};Q.useEffect=function(t,e){return nt.current.useEffect(t,e)};Q.useId=function(){return nt.current.useId()};Q.useImperativeHandle=function(t,e,n){return nt.current.useImperativeHandle(t,e,n)};Q.useInsertionEffect=function(t,e){return nt.current.useInsertionEffect(t,e)};Q.useLayoutEffect=function(t,e){return nt.current.useLayoutEffect(t,e)};Q.useMemo=function(t,e){return nt.current.useMemo(t,e)};Q.useReducer=function(t,e,n){return nt.current.useReducer(t,e,n)};Q.useRef=function(t){return nt.current.useRef(t)};Q.useState=function(t){return nt.current.useState(t)};Q.useSyncExternalStore=function(t,e,n){return nt.current.useSyncExternalStore(t,e,n)};Q.useTransition=function(){return nt.current.useTransition()};Q.version="18.3.1";yg.exports=Q;var L=yg.exports;const Nw=pw(L);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xw=L,Dw=Symbol.for("react.element"),Ow=Symbol.for("react.fragment"),Lw=Object.prototype.hasOwnProperty,Vw=xw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Mw={key:!0,ref:!0,__self:!0,__source:!0};function Ag(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Lw.call(e,r)&&!Mw.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Dw,type:t,key:s,ref:o,props:i,_owner:Vw.current}}Il.Fragment=Ow;Il.jsx=Ag;Il.jsxs=Ag;gg.exports=Il;var Z=gg.exports,oc={},Pg={exports:{}},gt={},Cg={exports:{}},kg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,K){var G=B.length;B.push(K);e:for(;0<G;){var fe=G-1>>>1,re=B[fe];if(0<i(re,K))B[fe]=K,B[G]=re,G=fe;else break e}}function n(B){return B.length===0?null:B[0]}function r(B){if(B.length===0)return null;var K=B[0],G=B.pop();if(G!==K){B[0]=G;e:for(var fe=0,re=B.length,we=re>>>1;fe<we;){var Xt=2*(fe+1)-1,Jt=B[Xt],Zt=Xt+1,en=B[Zt];if(0>i(Jt,G))Zt<re&&0>i(en,Jt)?(B[fe]=en,B[Zt]=G,fe=Zt):(B[fe]=Jt,B[Xt]=G,fe=Xt);else if(Zt<re&&0>i(en,G))B[fe]=en,B[Zt]=G,fe=Zt;else break e}}return K}function i(B,K){var G=B.sortIndex-K.sortIndex;return G!==0?G:B.id-K.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],h=[],f=1,m=null,y=3,P=!1,R=!1,N=!1,D=typeof setTimeout=="function"?setTimeout:null,w=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function T(B){for(var K=n(h);K!==null;){if(K.callback===null)r(h);else if(K.startTime<=B)r(h),K.sortIndex=K.expirationTime,e(u,K);else break;K=n(h)}}function O(B){if(N=!1,T(B),!R)if(n(u)!==null)R=!0,Ui(b);else{var K=n(h);K!==null&&Yt(O,K.startTime-B)}}function b(B,K){R=!1,N&&(N=!1,w(g),g=-1),P=!0;var G=y;try{for(T(K),m=n(u);m!==null&&(!(m.expirationTime>K)||B&&!A());){var fe=m.callback;if(typeof fe=="function"){m.callback=null,y=m.priorityLevel;var re=fe(m.expirationTime<=K);K=t.unstable_now(),typeof re=="function"?m.callback=re:m===n(u)&&r(u),T(K)}else r(u);m=n(u)}if(m!==null)var we=!0;else{var Xt=n(h);Xt!==null&&Yt(O,Xt.startTime-K),we=!1}return we}finally{m=null,y=G,P=!1}}var U=!1,E=null,g=-1,_=5,I=-1;function A(){return!(t.unstable_now()-I<_)}function k(){if(E!==null){var B=t.unstable_now();I=B;var K=!0;try{K=E(!0,B)}finally{K?S():(U=!1,E=null)}}else U=!1}var S;if(typeof v=="function")S=function(){v(k)};else if(typeof MessageChannel<"u"){var vt=new MessageChannel,ur=vt.port2;vt.port1.onmessage=k,S=function(){ur.postMessage(null)}}else S=function(){D(k,0)};function Ui(B){E=B,U||(U=!0,S())}function Yt(B,K){g=D(function(){B(t.unstable_now())},K)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_continueExecution=function(){R||P||(R=!0,Ui(b))},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return y},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(B){switch(y){case 1:case 2:case 3:var K=3;break;default:K=y}var G=y;y=K;try{return B()}finally{y=G}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(B,K){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var G=y;y=B;try{return K()}finally{y=G}},t.unstable_scheduleCallback=function(B,K,G){var fe=t.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?fe+G:fe):G=fe,B){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=G+re,B={id:f++,callback:K,priorityLevel:B,startTime:G,expirationTime:re,sortIndex:-1},G>fe?(B.sortIndex=G,e(h,B),n(u)===null&&B===n(h)&&(N?(w(g),g=-1):N=!0,Yt(O,G-fe))):(B.sortIndex=re,e(u,B),R||P||(R=!0,Ui(b))),B},t.unstable_shouldYield=A,t.unstable_wrapCallback=function(B){var K=y;return function(){var G=y;y=K;try{return B.apply(this,arguments)}finally{y=G}}}})(kg);Cg.exports=kg;var Fw=Cg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bw=L,pt=Fw;function M(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ng=new Set,xs={};function Fr(t,e){mi(t,e),mi(t+"Capture",e)}function mi(t,e){for(xs[t]=e,t=0;t<e.length;t++)Ng.add(e[t])}var yn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ac=Object.prototype.hasOwnProperty,Uw=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,np={},rp={};function jw(t){return ac.call(rp,t)?!0:ac.call(np,t)?!1:Uw.test(t)?rp[t]=!0:(np[t]=!0,!1)}function Bw(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function $w(t,e,n,r){if(e===null||typeof e>"u"||Bw(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function rt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Ue[t]=new rt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Ue[e]=new rt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Ue[t]=new rt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Ue[t]=new rt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Ue[t]=new rt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Ue[t]=new rt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Ue[t]=new rt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Ue[t]=new rt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Ue[t]=new rt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Sh=/[\-:]([a-z])/g;function Rh(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Sh,Rh);Ue[e]=new rt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Sh,Rh);Ue[e]=new rt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Sh,Rh);Ue[e]=new rt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Ue[t]=new rt(t,1,!1,t.toLowerCase(),null,!1,!1)});Ue.xlinkHref=new rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Ue[t]=new rt(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ah(t,e,n,r){var i=Ue.hasOwnProperty(e)?Ue[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&($w(e,n,i,r)&&(n=null),r||i===null?jw(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Sn=bw.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,$o=Symbol.for("react.element"),Kr=Symbol.for("react.portal"),Gr=Symbol.for("react.fragment"),Ph=Symbol.for("react.strict_mode"),lc=Symbol.for("react.profiler"),xg=Symbol.for("react.provider"),Dg=Symbol.for("react.context"),Ch=Symbol.for("react.forward_ref"),uc=Symbol.for("react.suspense"),cc=Symbol.for("react.suspense_list"),kh=Symbol.for("react.memo"),On=Symbol.for("react.lazy"),Og=Symbol.for("react.offscreen"),ip=Symbol.iterator;function Zi(t){return t===null||typeof t!="object"?null:(t=ip&&t[ip]||t["@@iterator"],typeof t=="function"?t:null)}var ye=Object.assign,Iu;function cs(t){if(Iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Iu=e&&e[1]||""}return`
`+Iu+t}var Su=!1;function Ru(t,e){if(!t||Su)return"";Su=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(h){var r=h}Reflect.construct(t,[],e)}else{try{e.call()}catch(h){r=h}t.call(e.prototype)}else{try{throw Error()}catch(h){r=h}t()}}catch(h){if(h&&r&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Su=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?cs(t):""}function zw(t){switch(t.tag){case 5:return cs(t.type);case 16:return cs("Lazy");case 13:return cs("Suspense");case 19:return cs("SuspenseList");case 0:case 2:case 15:return t=Ru(t.type,!1),t;case 11:return t=Ru(t.type.render,!1),t;case 1:return t=Ru(t.type,!0),t;default:return""}}function hc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Gr:return"Fragment";case Kr:return"Portal";case lc:return"Profiler";case Ph:return"StrictMode";case uc:return"Suspense";case cc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Dg:return(t.displayName||"Context")+".Consumer";case xg:return(t._context.displayName||"Context")+".Provider";case Ch:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case kh:return e=t.displayName||null,e!==null?e:hc(t.type)||"Memo";case On:e=t._payload,t=t._init;try{return hc(t(e))}catch{}}return null}function Hw(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return hc(e);case 8:return e===Ph?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Zn(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Lg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Ww(t){var e=Lg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function zo(t){t._valueTracker||(t._valueTracker=Ww(t))}function Vg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Lg(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function La(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function dc(t,e){var n=e.checked;return ye({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function sp(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=Zn(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Mg(t,e){e=e.checked,e!=null&&Ah(t,"checked",e,!1)}function fc(t,e){Mg(t,e);var n=Zn(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?pc(t,e.type,n):e.hasOwnProperty("defaultValue")&&pc(t,e.type,Zn(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function op(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function pc(t,e,n){(e!=="number"||La(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var hs=Array.isArray;function si(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+Zn(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function mc(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(M(91));return ye({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ap(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(M(92));if(hs(n)){if(1<n.length)throw Error(M(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Zn(n)}}function Fg(t,e){var n=Zn(e.value),r=Zn(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function lp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function bg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function gc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?bg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ho,Ug=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ho=Ho||document.createElement("div"),Ho.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ho.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ds(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ys={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kw=["Webkit","ms","Moz","O"];Object.keys(ys).forEach(function(t){Kw.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ys[e]=ys[t]})});function jg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ys.hasOwnProperty(t)&&ys[t]?(""+e).trim():e+"px"}function Bg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=jg(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var Gw=ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function yc(t,e){if(e){if(Gw[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(M(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(M(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(M(61))}if(e.style!=null&&typeof e.style!="object")throw Error(M(62))}}function vc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var _c=null;function Nh(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var wc=null,oi=null,ai=null;function up(t){if(t=lo(t)){if(typeof wc!="function")throw Error(M(280));var e=t.stateNode;e&&(e=Cl(e),wc(t.stateNode,t.type,e))}}function $g(t){oi?ai?ai.push(t):ai=[t]:oi=t}function zg(){if(oi){var t=oi,e=ai;if(ai=oi=null,up(t),e)for(t=0;t<e.length;t++)up(e[t])}}function Hg(t,e){return t(e)}function Wg(){}var Au=!1;function Kg(t,e,n){if(Au)return t(e,n);Au=!0;try{return Hg(t,e,n)}finally{Au=!1,(oi!==null||ai!==null)&&(Wg(),zg())}}function Os(t,e){var n=t.stateNode;if(n===null)return null;var r=Cl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(M(231,e,typeof n));return n}var Ec=!1;if(yn)try{var es={};Object.defineProperty(es,"passive",{get:function(){Ec=!0}}),window.addEventListener("test",es,es),window.removeEventListener("test",es,es)}catch{Ec=!1}function qw(t,e,n,r,i,s,o,l,u){var h=Array.prototype.slice.call(arguments,3);try{e.apply(n,h)}catch(f){this.onError(f)}}var vs=!1,Va=null,Ma=!1,Tc=null,Qw={onError:function(t){vs=!0,Va=t}};function Yw(t,e,n,r,i,s,o,l,u){vs=!1,Va=null,qw.apply(Qw,arguments)}function Xw(t,e,n,r,i,s,o,l,u){if(Yw.apply(this,arguments),vs){if(vs){var h=Va;vs=!1,Va=null}else throw Error(M(198));Ma||(Ma=!0,Tc=h)}}function br(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Gg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function cp(t){if(br(t)!==t)throw Error(M(188))}function Jw(t){var e=t.alternate;if(!e){if(e=br(t),e===null)throw Error(M(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return cp(i),t;if(s===r)return cp(i),e;s=s.sibling}throw Error(M(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(M(189))}}if(n.alternate!==r)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?t:e}function qg(t){return t=Jw(t),t!==null?Qg(t):null}function Qg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Qg(t);if(e!==null)return e;t=t.sibling}return null}var Yg=pt.unstable_scheduleCallback,hp=pt.unstable_cancelCallback,Zw=pt.unstable_shouldYield,eE=pt.unstable_requestPaint,Ee=pt.unstable_now,tE=pt.unstable_getCurrentPriorityLevel,xh=pt.unstable_ImmediatePriority,Xg=pt.unstable_UserBlockingPriority,Fa=pt.unstable_NormalPriority,nE=pt.unstable_LowPriority,Jg=pt.unstable_IdlePriority,Sl=null,Ht=null;function rE(t){if(Ht&&typeof Ht.onCommitFiberRoot=="function")try{Ht.onCommitFiberRoot(Sl,t,void 0,(t.current.flags&128)===128)}catch{}}var Vt=Math.clz32?Math.clz32:oE,iE=Math.log,sE=Math.LN2;function oE(t){return t>>>=0,t===0?32:31-(iE(t)/sE|0)|0}var Wo=64,Ko=4194304;function ds(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ba(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=ds(l):(s&=o,s!==0&&(r=ds(s)))}else o=n&~i,o!==0?r=ds(o):s!==0&&(r=ds(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-Vt(e),i=1<<n,r|=t[n],e&=~i;return r}function aE(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lE(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Vt(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=aE(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Ic(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Zg(){var t=Wo;return Wo<<=1,!(Wo&4194240)&&(Wo=64),t}function Pu(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function oo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Vt(e),t[e]=n}function uE(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-Vt(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function Dh(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-Vt(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var ne=0;function ey(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var ty,Oh,ny,ry,iy,Sc=!1,Go=[],$n=null,zn=null,Hn=null,Ls=new Map,Vs=new Map,Vn=[],cE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function dp(t,e){switch(t){case"focusin":case"focusout":$n=null;break;case"dragenter":case"dragleave":zn=null;break;case"mouseover":case"mouseout":Hn=null;break;case"pointerover":case"pointerout":Ls.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Vs.delete(e.pointerId)}}function ts(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=lo(e),e!==null&&Oh(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function hE(t,e,n,r,i){switch(e){case"focusin":return $n=ts($n,t,e,n,r,i),!0;case"dragenter":return zn=ts(zn,t,e,n,r,i),!0;case"mouseover":return Hn=ts(Hn,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Ls.set(s,ts(Ls.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Vs.set(s,ts(Vs.get(s)||null,t,e,n,r,i)),!0}return!1}function sy(t){var e=yr(t.target);if(e!==null){var n=br(e);if(n!==null){if(e=n.tag,e===13){if(e=Gg(n),e!==null){t.blockedOn=e,iy(t.priority,function(){ny(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function fa(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Rc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);_c=r,n.target.dispatchEvent(r),_c=null}else return e=lo(n),e!==null&&Oh(e),t.blockedOn=n,!1;e.shift()}return!0}function fp(t,e,n){fa(t)&&n.delete(e)}function dE(){Sc=!1,$n!==null&&fa($n)&&($n=null),zn!==null&&fa(zn)&&(zn=null),Hn!==null&&fa(Hn)&&(Hn=null),Ls.forEach(fp),Vs.forEach(fp)}function ns(t,e){t.blockedOn===e&&(t.blockedOn=null,Sc||(Sc=!0,pt.unstable_scheduleCallback(pt.unstable_NormalPriority,dE)))}function Ms(t){function e(i){return ns(i,t)}if(0<Go.length){ns(Go[0],t);for(var n=1;n<Go.length;n++){var r=Go[n];r.blockedOn===t&&(r.blockedOn=null)}}for($n!==null&&ns($n,t),zn!==null&&ns(zn,t),Hn!==null&&ns(Hn,t),Ls.forEach(e),Vs.forEach(e),n=0;n<Vn.length;n++)r=Vn[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Vn.length&&(n=Vn[0],n.blockedOn===null);)sy(n),n.blockedOn===null&&Vn.shift()}var li=Sn.ReactCurrentBatchConfig,Ua=!0;function fE(t,e,n,r){var i=ne,s=li.transition;li.transition=null;try{ne=1,Lh(t,e,n,r)}finally{ne=i,li.transition=s}}function pE(t,e,n,r){var i=ne,s=li.transition;li.transition=null;try{ne=4,Lh(t,e,n,r)}finally{ne=i,li.transition=s}}function Lh(t,e,n,r){if(Ua){var i=Rc(t,e,n,r);if(i===null)Fu(t,e,r,ja,n),dp(t,r);else if(hE(i,t,e,n,r))r.stopPropagation();else if(dp(t,r),e&4&&-1<cE.indexOf(t)){for(;i!==null;){var s=lo(i);if(s!==null&&ty(s),s=Rc(t,e,n,r),s===null&&Fu(t,e,r,ja,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else Fu(t,e,r,null,n)}}var ja=null;function Rc(t,e,n,r){if(ja=null,t=Nh(r),t=yr(t),t!==null)if(e=br(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Gg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return ja=t,null}function oy(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(tE()){case xh:return 1;case Xg:return 4;case Fa:case nE:return 16;case Jg:return 536870912;default:return 16}default:return 16}}var jn=null,Vh=null,pa=null;function ay(){if(pa)return pa;var t,e=Vh,n=e.length,r,i="value"in jn?jn.value:jn.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return pa=i.slice(t,1<r?1-r:void 0)}function ma(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function qo(){return!0}function pp(){return!1}function yt(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?qo:pp,this.isPropagationStopped=pp,this}return ye(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=qo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=qo)},persist:function(){},isPersistent:qo}),e}var Ni={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Mh=yt(Ni),ao=ye({},Ni,{view:0,detail:0}),mE=yt(ao),Cu,ku,rs,Rl=ye({},ao,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Fh,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==rs&&(rs&&t.type==="mousemove"?(Cu=t.screenX-rs.screenX,ku=t.screenY-rs.screenY):ku=Cu=0,rs=t),Cu)},movementY:function(t){return"movementY"in t?t.movementY:ku}}),mp=yt(Rl),gE=ye({},Rl,{dataTransfer:0}),yE=yt(gE),vE=ye({},ao,{relatedTarget:0}),Nu=yt(vE),_E=ye({},Ni,{animationName:0,elapsedTime:0,pseudoElement:0}),wE=yt(_E),EE=ye({},Ni,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),TE=yt(EE),IE=ye({},Ni,{data:0}),gp=yt(IE),SE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},RE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},AE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function PE(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=AE[t])?!!e[t]:!1}function Fh(){return PE}var CE=ye({},ao,{key:function(t){if(t.key){var e=SE[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ma(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?RE[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Fh,charCode:function(t){return t.type==="keypress"?ma(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ma(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),kE=yt(CE),NE=ye({},Rl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),yp=yt(NE),xE=ye({},ao,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Fh}),DE=yt(xE),OE=ye({},Ni,{propertyName:0,elapsedTime:0,pseudoElement:0}),LE=yt(OE),VE=ye({},Rl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),ME=yt(VE),FE=[9,13,27,32],bh=yn&&"CompositionEvent"in window,_s=null;yn&&"documentMode"in document&&(_s=document.documentMode);var bE=yn&&"TextEvent"in window&&!_s,ly=yn&&(!bh||_s&&8<_s&&11>=_s),vp=" ",_p=!1;function uy(t,e){switch(t){case"keyup":return FE.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function cy(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var qr=!1;function UE(t,e){switch(t){case"compositionend":return cy(e);case"keypress":return e.which!==32?null:(_p=!0,vp);case"textInput":return t=e.data,t===vp&&_p?null:t;default:return null}}function jE(t,e){if(qr)return t==="compositionend"||!bh&&uy(t,e)?(t=ay(),pa=Vh=jn=null,qr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ly&&e.locale!=="ko"?null:e.data;default:return null}}var BE={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!BE[t.type]:e==="textarea"}function hy(t,e,n,r){$g(r),e=Ba(e,"onChange"),0<e.length&&(n=new Mh("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var ws=null,Fs=null;function $E(t){Ty(t,0)}function Al(t){var e=Xr(t);if(Vg(e))return t}function zE(t,e){if(t==="change")return e}var dy=!1;if(yn){var xu;if(yn){var Du="oninput"in document;if(!Du){var Ep=document.createElement("div");Ep.setAttribute("oninput","return;"),Du=typeof Ep.oninput=="function"}xu=Du}else xu=!1;dy=xu&&(!document.documentMode||9<document.documentMode)}function Tp(){ws&&(ws.detachEvent("onpropertychange",fy),Fs=ws=null)}function fy(t){if(t.propertyName==="value"&&Al(Fs)){var e=[];hy(e,Fs,t,Nh(t)),Kg($E,e)}}function HE(t,e,n){t==="focusin"?(Tp(),ws=e,Fs=n,ws.attachEvent("onpropertychange",fy)):t==="focusout"&&Tp()}function WE(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Al(Fs)}function KE(t,e){if(t==="click")return Al(e)}function GE(t,e){if(t==="input"||t==="change")return Al(e)}function qE(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var bt=typeof Object.is=="function"?Object.is:qE;function bs(t,e){if(bt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ac.call(e,i)||!bt(t[i],e[i]))return!1}return!0}function Ip(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Sp(t,e){var n=Ip(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ip(n)}}function py(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?py(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function my(){for(var t=window,e=La();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=La(t.document)}return e}function Uh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function QE(t){var e=my(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&py(n.ownerDocument.documentElement,n)){if(r!==null&&Uh(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Sp(n,s);var o=Sp(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var YE=yn&&"documentMode"in document&&11>=document.documentMode,Qr=null,Ac=null,Es=null,Pc=!1;function Rp(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Pc||Qr==null||Qr!==La(r)||(r=Qr,"selectionStart"in r&&Uh(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Es&&bs(Es,r)||(Es=r,r=Ba(Ac,"onSelect"),0<r.length&&(e=new Mh("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Qr)))}function Qo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Yr={animationend:Qo("Animation","AnimationEnd"),animationiteration:Qo("Animation","AnimationIteration"),animationstart:Qo("Animation","AnimationStart"),transitionend:Qo("Transition","TransitionEnd")},Ou={},gy={};yn&&(gy=document.createElement("div").style,"AnimationEvent"in window||(delete Yr.animationend.animation,delete Yr.animationiteration.animation,delete Yr.animationstart.animation),"TransitionEvent"in window||delete Yr.transitionend.transition);function Pl(t){if(Ou[t])return Ou[t];if(!Yr[t])return t;var e=Yr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in gy)return Ou[t]=e[n];return t}var yy=Pl("animationend"),vy=Pl("animationiteration"),_y=Pl("animationstart"),wy=Pl("transitionend"),Ey=new Map,Ap="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(t,e){Ey.set(t,e),Fr(e,[t])}for(var Lu=0;Lu<Ap.length;Lu++){var Vu=Ap[Lu],XE=Vu.toLowerCase(),JE=Vu[0].toUpperCase()+Vu.slice(1);ir(XE,"on"+JE)}ir(yy,"onAnimationEnd");ir(vy,"onAnimationIteration");ir(_y,"onAnimationStart");ir("dblclick","onDoubleClick");ir("focusin","onFocus");ir("focusout","onBlur");ir(wy,"onTransitionEnd");mi("onMouseEnter",["mouseout","mouseover"]);mi("onMouseLeave",["mouseout","mouseover"]);mi("onPointerEnter",["pointerout","pointerover"]);mi("onPointerLeave",["pointerout","pointerover"]);Fr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Fr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Fr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Fr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Fr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ZE=new Set("cancel close invalid load scroll toggle".split(" ").concat(fs));function Pp(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,Xw(r,e,void 0,t),t.currentTarget=null}function Ty(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,h=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Pp(i,l,h),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,h=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Pp(i,l,h),s=u}}}if(Ma)throw t=Tc,Ma=!1,Tc=null,t}function ue(t,e){var n=e[Dc];n===void 0&&(n=e[Dc]=new Set);var r=t+"__bubble";n.has(r)||(Iy(e,t,2,!1),n.add(r))}function Mu(t,e,n){var r=0;e&&(r|=4),Iy(n,t,r,e)}var Yo="_reactListening"+Math.random().toString(36).slice(2);function Us(t){if(!t[Yo]){t[Yo]=!0,Ng.forEach(function(n){n!=="selectionchange"&&(ZE.has(n)||Mu(n,!1,t),Mu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Yo]||(e[Yo]=!0,Mu("selectionchange",!1,e))}}function Iy(t,e,n,r){switch(oy(e)){case 1:var i=fE;break;case 4:i=pE;break;default:i=Lh}n=i.bind(null,e,n,t),i=void 0,!Ec||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function Fu(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=yr(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}Kg(function(){var h=s,f=Nh(n),m=[];e:{var y=Ey.get(t);if(y!==void 0){var P=Mh,R=t;switch(t){case"keypress":if(ma(n)===0)break e;case"keydown":case"keyup":P=kE;break;case"focusin":R="focus",P=Nu;break;case"focusout":R="blur",P=Nu;break;case"beforeblur":case"afterblur":P=Nu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":P=mp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":P=yE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":P=DE;break;case yy:case vy:case _y:P=wE;break;case wy:P=LE;break;case"scroll":P=mE;break;case"wheel":P=ME;break;case"copy":case"cut":case"paste":P=TE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":P=yp}var N=(e&4)!==0,D=!N&&t==="scroll",w=N?y!==null?y+"Capture":null:y;N=[];for(var v=h,T;v!==null;){T=v;var O=T.stateNode;if(T.tag===5&&O!==null&&(T=O,w!==null&&(O=Os(v,w),O!=null&&N.push(js(v,O,T)))),D)break;v=v.return}0<N.length&&(y=new P(y,R,null,n,f),m.push({event:y,listeners:N}))}}if(!(e&7)){e:{if(y=t==="mouseover"||t==="pointerover",P=t==="mouseout"||t==="pointerout",y&&n!==_c&&(R=n.relatedTarget||n.fromElement)&&(yr(R)||R[vn]))break e;if((P||y)&&(y=f.window===f?f:(y=f.ownerDocument)?y.defaultView||y.parentWindow:window,P?(R=n.relatedTarget||n.toElement,P=h,R=R?yr(R):null,R!==null&&(D=br(R),R!==D||R.tag!==5&&R.tag!==6)&&(R=null)):(P=null,R=h),P!==R)){if(N=mp,O="onMouseLeave",w="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(N=yp,O="onPointerLeave",w="onPointerEnter",v="pointer"),D=P==null?y:Xr(P),T=R==null?y:Xr(R),y=new N(O,v+"leave",P,n,f),y.target=D,y.relatedTarget=T,O=null,yr(f)===h&&(N=new N(w,v+"enter",R,n,f),N.target=T,N.relatedTarget=D,O=N),D=O,P&&R)t:{for(N=P,w=R,v=0,T=N;T;T=Hr(T))v++;for(T=0,O=w;O;O=Hr(O))T++;for(;0<v-T;)N=Hr(N),v--;for(;0<T-v;)w=Hr(w),T--;for(;v--;){if(N===w||w!==null&&N===w.alternate)break t;N=Hr(N),w=Hr(w)}N=null}else N=null;P!==null&&Cp(m,y,P,N,!1),R!==null&&D!==null&&Cp(m,D,R,N,!0)}}e:{if(y=h?Xr(h):window,P=y.nodeName&&y.nodeName.toLowerCase(),P==="select"||P==="input"&&y.type==="file")var b=zE;else if(wp(y))if(dy)b=GE;else{b=WE;var U=HE}else(P=y.nodeName)&&P.toLowerCase()==="input"&&(y.type==="checkbox"||y.type==="radio")&&(b=KE);if(b&&(b=b(t,h))){hy(m,b,n,f);break e}U&&U(t,y,h),t==="focusout"&&(U=y._wrapperState)&&U.controlled&&y.type==="number"&&pc(y,"number",y.value)}switch(U=h?Xr(h):window,t){case"focusin":(wp(U)||U.contentEditable==="true")&&(Qr=U,Ac=h,Es=null);break;case"focusout":Es=Ac=Qr=null;break;case"mousedown":Pc=!0;break;case"contextmenu":case"mouseup":case"dragend":Pc=!1,Rp(m,n,f);break;case"selectionchange":if(YE)break;case"keydown":case"keyup":Rp(m,n,f)}var E;if(bh)e:{switch(t){case"compositionstart":var g="onCompositionStart";break e;case"compositionend":g="onCompositionEnd";break e;case"compositionupdate":g="onCompositionUpdate";break e}g=void 0}else qr?uy(t,n)&&(g="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(g="onCompositionStart");g&&(ly&&n.locale!=="ko"&&(qr||g!=="onCompositionStart"?g==="onCompositionEnd"&&qr&&(E=ay()):(jn=f,Vh="value"in jn?jn.value:jn.textContent,qr=!0)),U=Ba(h,g),0<U.length&&(g=new gp(g,t,null,n,f),m.push({event:g,listeners:U}),E?g.data=E:(E=cy(n),E!==null&&(g.data=E)))),(E=bE?UE(t,n):jE(t,n))&&(h=Ba(h,"onBeforeInput"),0<h.length&&(f=new gp("onBeforeInput","beforeinput",null,n,f),m.push({event:f,listeners:h}),f.data=E))}Ty(m,e)})}function js(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Ba(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Os(t,n),s!=null&&r.unshift(js(t,s,i)),s=Os(t,e),s!=null&&r.push(js(t,s,i))),t=t.return}return r}function Hr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Cp(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,h=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&h!==null&&(l=h,i?(u=Os(n,s),u!=null&&o.unshift(js(n,u,l))):i||(u=Os(n,s),u!=null&&o.push(js(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var eT=/\r\n?/g,tT=/\u0000|\uFFFD/g;function kp(t){return(typeof t=="string"?t:""+t).replace(eT,`
`).replace(tT,"")}function Xo(t,e,n){if(e=kp(e),kp(t)!==e&&n)throw Error(M(425))}function $a(){}var Cc=null,kc=null;function Nc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var xc=typeof setTimeout=="function"?setTimeout:void 0,nT=typeof clearTimeout=="function"?clearTimeout:void 0,Np=typeof Promise=="function"?Promise:void 0,rT=typeof queueMicrotask=="function"?queueMicrotask:typeof Np<"u"?function(t){return Np.resolve(null).then(t).catch(iT)}:xc;function iT(t){setTimeout(function(){throw t})}function bu(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),Ms(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Ms(e)}function Wn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function xp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var xi=Math.random().toString(36).slice(2),zt="__reactFiber$"+xi,Bs="__reactProps$"+xi,vn="__reactContainer$"+xi,Dc="__reactEvents$"+xi,sT="__reactListeners$"+xi,oT="__reactHandles$"+xi;function yr(t){var e=t[zt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[vn]||n[zt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=xp(t);t!==null;){if(n=t[zt])return n;t=xp(t)}return e}t=n,n=t.parentNode}return null}function lo(t){return t=t[zt]||t[vn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Xr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(M(33))}function Cl(t){return t[Bs]||null}var Oc=[],Jr=-1;function sr(t){return{current:t}}function ce(t){0>Jr||(t.current=Oc[Jr],Oc[Jr]=null,Jr--)}function oe(t,e){Jr++,Oc[Jr]=t.current,t.current=e}var er={},Ye=sr(er),ot=sr(!1),Ar=er;function gi(t,e){var n=t.type.contextTypes;if(!n)return er;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function at(t){return t=t.childContextTypes,t!=null}function za(){ce(ot),ce(Ye)}function Dp(t,e,n){if(Ye.current!==er)throw Error(M(168));oe(Ye,e),oe(ot,n)}function Sy(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(M(108,Hw(t)||"Unknown",i));return ye({},n,r)}function Ha(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||er,Ar=Ye.current,oe(Ye,t),oe(ot,ot.current),!0}function Op(t,e,n){var r=t.stateNode;if(!r)throw Error(M(169));n?(t=Sy(t,e,Ar),r.__reactInternalMemoizedMergedChildContext=t,ce(ot),ce(Ye),oe(Ye,t)):ce(ot),oe(ot,n)}var sn=null,kl=!1,Uu=!1;function Ry(t){sn===null?sn=[t]:sn.push(t)}function aT(t){kl=!0,Ry(t)}function or(){if(!Uu&&sn!==null){Uu=!0;var t=0,e=ne;try{var n=sn;for(ne=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}sn=null,kl=!1}catch(i){throw sn!==null&&(sn=sn.slice(t+1)),Yg(xh,or),i}finally{ne=e,Uu=!1}}return null}var Zr=[],ei=0,Wa=null,Ka=0,_t=[],wt=0,Pr=null,an=1,ln="";function pr(t,e){Zr[ei++]=Ka,Zr[ei++]=Wa,Wa=t,Ka=e}function Ay(t,e,n){_t[wt++]=an,_t[wt++]=ln,_t[wt++]=Pr,Pr=t;var r=an;t=ln;var i=32-Vt(r)-1;r&=~(1<<i),n+=1;var s=32-Vt(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,an=1<<32-Vt(e)+i|n<<i|r,ln=s+t}else an=1<<s|n<<i|r,ln=t}function jh(t){t.return!==null&&(pr(t,1),Ay(t,1,0))}function Bh(t){for(;t===Wa;)Wa=Zr[--ei],Zr[ei]=null,Ka=Zr[--ei],Zr[ei]=null;for(;t===Pr;)Pr=_t[--wt],_t[wt]=null,ln=_t[--wt],_t[wt]=null,an=_t[--wt],_t[wt]=null}var ft=null,dt=null,he=!1,Nt=null;function Py(t,e){var n=Et(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Lp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,ft=t,dt=Wn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,ft=t,dt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Pr!==null?{id:an,overflow:ln}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Et(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,ft=t,dt=null,!0):!1;default:return!1}}function Lc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Vc(t){if(he){var e=dt;if(e){var n=e;if(!Lp(t,e)){if(Lc(t))throw Error(M(418));e=Wn(n.nextSibling);var r=ft;e&&Lp(t,e)?Py(r,n):(t.flags=t.flags&-4097|2,he=!1,ft=t)}}else{if(Lc(t))throw Error(M(418));t.flags=t.flags&-4097|2,he=!1,ft=t}}}function Vp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;ft=t}function Jo(t){if(t!==ft)return!1;if(!he)return Vp(t),he=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Nc(t.type,t.memoizedProps)),e&&(e=dt)){if(Lc(t))throw Cy(),Error(M(418));for(;e;)Py(t,e),e=Wn(e.nextSibling)}if(Vp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(M(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){dt=Wn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}dt=null}}else dt=ft?Wn(t.stateNode.nextSibling):null;return!0}function Cy(){for(var t=dt;t;)t=Wn(t.nextSibling)}function yi(){dt=ft=null,he=!1}function $h(t){Nt===null?Nt=[t]:Nt.push(t)}var lT=Sn.ReactCurrentBatchConfig;function is(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(M(309));var r=n.stateNode}if(!r)throw Error(M(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(M(284));if(!n._owner)throw Error(M(290,t))}return t}function Zo(t,e){throw t=Object.prototype.toString.call(e),Error(M(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Mp(t){var e=t._init;return e(t._payload)}function ky(t){function e(w,v){if(t){var T=w.deletions;T===null?(w.deletions=[v],w.flags|=16):T.push(v)}}function n(w,v){if(!t)return null;for(;v!==null;)e(w,v),v=v.sibling;return null}function r(w,v){for(w=new Map;v!==null;)v.key!==null?w.set(v.key,v):w.set(v.index,v),v=v.sibling;return w}function i(w,v){return w=Qn(w,v),w.index=0,w.sibling=null,w}function s(w,v,T){return w.index=T,t?(T=w.alternate,T!==null?(T=T.index,T<v?(w.flags|=2,v):T):(w.flags|=2,v)):(w.flags|=1048576,v)}function o(w){return t&&w.alternate===null&&(w.flags|=2),w}function l(w,v,T,O){return v===null||v.tag!==6?(v=Ku(T,w.mode,O),v.return=w,v):(v=i(v,T),v.return=w,v)}function u(w,v,T,O){var b=T.type;return b===Gr?f(w,v,T.props.children,O,T.key):v!==null&&(v.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===On&&Mp(b)===v.type)?(O=i(v,T.props),O.ref=is(w,v,T),O.return=w,O):(O=Ta(T.type,T.key,T.props,null,w.mode,O),O.ref=is(w,v,T),O.return=w,O)}function h(w,v,T,O){return v===null||v.tag!==4||v.stateNode.containerInfo!==T.containerInfo||v.stateNode.implementation!==T.implementation?(v=Gu(T,w.mode,O),v.return=w,v):(v=i(v,T.children||[]),v.return=w,v)}function f(w,v,T,O,b){return v===null||v.tag!==7?(v=Ir(T,w.mode,O,b),v.return=w,v):(v=i(v,T),v.return=w,v)}function m(w,v,T){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Ku(""+v,w.mode,T),v.return=w,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case $o:return T=Ta(v.type,v.key,v.props,null,w.mode,T),T.ref=is(w,null,v),T.return=w,T;case Kr:return v=Gu(v,w.mode,T),v.return=w,v;case On:var O=v._init;return m(w,O(v._payload),T)}if(hs(v)||Zi(v))return v=Ir(v,w.mode,T,null),v.return=w,v;Zo(w,v)}return null}function y(w,v,T,O){var b=v!==null?v.key:null;if(typeof T=="string"&&T!==""||typeof T=="number")return b!==null?null:l(w,v,""+T,O);if(typeof T=="object"&&T!==null){switch(T.$$typeof){case $o:return T.key===b?u(w,v,T,O):null;case Kr:return T.key===b?h(w,v,T,O):null;case On:return b=T._init,y(w,v,b(T._payload),O)}if(hs(T)||Zi(T))return b!==null?null:f(w,v,T,O,null);Zo(w,T)}return null}function P(w,v,T,O,b){if(typeof O=="string"&&O!==""||typeof O=="number")return w=w.get(T)||null,l(v,w,""+O,b);if(typeof O=="object"&&O!==null){switch(O.$$typeof){case $o:return w=w.get(O.key===null?T:O.key)||null,u(v,w,O,b);case Kr:return w=w.get(O.key===null?T:O.key)||null,h(v,w,O,b);case On:var U=O._init;return P(w,v,T,U(O._payload),b)}if(hs(O)||Zi(O))return w=w.get(T)||null,f(v,w,O,b,null);Zo(v,O)}return null}function R(w,v,T,O){for(var b=null,U=null,E=v,g=v=0,_=null;E!==null&&g<T.length;g++){E.index>g?(_=E,E=null):_=E.sibling;var I=y(w,E,T[g],O);if(I===null){E===null&&(E=_);break}t&&E&&I.alternate===null&&e(w,E),v=s(I,v,g),U===null?b=I:U.sibling=I,U=I,E=_}if(g===T.length)return n(w,E),he&&pr(w,g),b;if(E===null){for(;g<T.length;g++)E=m(w,T[g],O),E!==null&&(v=s(E,v,g),U===null?b=E:U.sibling=E,U=E);return he&&pr(w,g),b}for(E=r(w,E);g<T.length;g++)_=P(E,w,g,T[g],O),_!==null&&(t&&_.alternate!==null&&E.delete(_.key===null?g:_.key),v=s(_,v,g),U===null?b=_:U.sibling=_,U=_);return t&&E.forEach(function(A){return e(w,A)}),he&&pr(w,g),b}function N(w,v,T,O){var b=Zi(T);if(typeof b!="function")throw Error(M(150));if(T=b.call(T),T==null)throw Error(M(151));for(var U=b=null,E=v,g=v=0,_=null,I=T.next();E!==null&&!I.done;g++,I=T.next()){E.index>g?(_=E,E=null):_=E.sibling;var A=y(w,E,I.value,O);if(A===null){E===null&&(E=_);break}t&&E&&A.alternate===null&&e(w,E),v=s(A,v,g),U===null?b=A:U.sibling=A,U=A,E=_}if(I.done)return n(w,E),he&&pr(w,g),b;if(E===null){for(;!I.done;g++,I=T.next())I=m(w,I.value,O),I!==null&&(v=s(I,v,g),U===null?b=I:U.sibling=I,U=I);return he&&pr(w,g),b}for(E=r(w,E);!I.done;g++,I=T.next())I=P(E,w,g,I.value,O),I!==null&&(t&&I.alternate!==null&&E.delete(I.key===null?g:I.key),v=s(I,v,g),U===null?b=I:U.sibling=I,U=I);return t&&E.forEach(function(k){return e(w,k)}),he&&pr(w,g),b}function D(w,v,T,O){if(typeof T=="object"&&T!==null&&T.type===Gr&&T.key===null&&(T=T.props.children),typeof T=="object"&&T!==null){switch(T.$$typeof){case $o:e:{for(var b=T.key,U=v;U!==null;){if(U.key===b){if(b=T.type,b===Gr){if(U.tag===7){n(w,U.sibling),v=i(U,T.props.children),v.return=w,w=v;break e}}else if(U.elementType===b||typeof b=="object"&&b!==null&&b.$$typeof===On&&Mp(b)===U.type){n(w,U.sibling),v=i(U,T.props),v.ref=is(w,U,T),v.return=w,w=v;break e}n(w,U);break}else e(w,U);U=U.sibling}T.type===Gr?(v=Ir(T.props.children,w.mode,O,T.key),v.return=w,w=v):(O=Ta(T.type,T.key,T.props,null,w.mode,O),O.ref=is(w,v,T),O.return=w,w=O)}return o(w);case Kr:e:{for(U=T.key;v!==null;){if(v.key===U)if(v.tag===4&&v.stateNode.containerInfo===T.containerInfo&&v.stateNode.implementation===T.implementation){n(w,v.sibling),v=i(v,T.children||[]),v.return=w,w=v;break e}else{n(w,v);break}else e(w,v);v=v.sibling}v=Gu(T,w.mode,O),v.return=w,w=v}return o(w);case On:return U=T._init,D(w,v,U(T._payload),O)}if(hs(T))return R(w,v,T,O);if(Zi(T))return N(w,v,T,O);Zo(w,T)}return typeof T=="string"&&T!==""||typeof T=="number"?(T=""+T,v!==null&&v.tag===6?(n(w,v.sibling),v=i(v,T),v.return=w,w=v):(n(w,v),v=Ku(T,w.mode,O),v.return=w,w=v),o(w)):n(w,v)}return D}var vi=ky(!0),Ny=ky(!1),Ga=sr(null),qa=null,ti=null,zh=null;function Hh(){zh=ti=qa=null}function Wh(t){var e=Ga.current;ce(Ga),t._currentValue=e}function Mc(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function ui(t,e){qa=t,zh=ti=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(st=!0),t.firstContext=null)}function It(t){var e=t._currentValue;if(zh!==t)if(t={context:t,memoizedValue:e,next:null},ti===null){if(qa===null)throw Error(M(308));ti=t,qa.dependencies={lanes:0,firstContext:t}}else ti=ti.next=t;return e}var vr=null;function Kh(t){vr===null?vr=[t]:vr.push(t)}function xy(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Kh(e)):(n.next=i.next,i.next=n),e.interleaved=n,_n(t,r)}function _n(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Ln=!1;function Gh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Dy(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function dn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Kn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,ee&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,_n(t,n)}return i=r.interleaved,i===null?(e.next=e,Kh(r)):(e.next=i.next,i.next=e),r.interleaved=e,_n(t,n)}function ga(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Dh(t,n)}}function Fp(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Qa(t,e,n,r){var i=t.updateQueue;Ln=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,h=u.next;u.next=null,o===null?s=h:o.next=h,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=h:l.next=h,f.lastBaseUpdate=u))}if(s!==null){var m=i.baseState;o=0,f=h=u=null,l=s;do{var y=l.lane,P=l.eventTime;if((r&y)===y){f!==null&&(f=f.next={eventTime:P,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var R=t,N=l;switch(y=e,P=n,N.tag){case 1:if(R=N.payload,typeof R=="function"){m=R.call(P,m,y);break e}m=R;break e;case 3:R.flags=R.flags&-65537|128;case 0:if(R=N.payload,y=typeof R=="function"?R.call(P,m,y):R,y==null)break e;m=ye({},m,y);break e;case 2:Ln=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,y=i.effects,y===null?i.effects=[l]:y.push(l))}else P={eventTime:P,lane:y,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(h=f=P,u=m):f=f.next=P,o|=y;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;y=l,l=y.next,y.next=null,i.lastBaseUpdate=y,i.shared.pending=null}}while(!0);if(f===null&&(u=m),i.baseState=u,i.firstBaseUpdate=h,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);kr|=o,t.lanes=o,t.memoizedState=m}}function bp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(M(191,i));i.call(r)}}}var uo={},Wt=sr(uo),$s=sr(uo),zs=sr(uo);function _r(t){if(t===uo)throw Error(M(174));return t}function qh(t,e){switch(oe(zs,e),oe($s,t),oe(Wt,uo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:gc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=gc(e,t)}ce(Wt),oe(Wt,e)}function _i(){ce(Wt),ce($s),ce(zs)}function Oy(t){_r(zs.current);var e=_r(Wt.current),n=gc(e,t.type);e!==n&&(oe($s,t),oe(Wt,n))}function Qh(t){$s.current===t&&(ce(Wt),ce($s))}var me=sr(0);function Ya(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ju=[];function Yh(){for(var t=0;t<ju.length;t++)ju[t]._workInProgressVersionPrimary=null;ju.length=0}var ya=Sn.ReactCurrentDispatcher,Bu=Sn.ReactCurrentBatchConfig,Cr=0,ge=null,Ae=null,ke=null,Xa=!1,Ts=!1,Hs=0,uT=0;function ze(){throw Error(M(321))}function Xh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!bt(t[n],e[n]))return!1;return!0}function Jh(t,e,n,r,i,s){if(Cr=s,ge=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ya.current=t===null||t.memoizedState===null?fT:pT,t=n(r,i),Ts){s=0;do{if(Ts=!1,Hs=0,25<=s)throw Error(M(301));s+=1,ke=Ae=null,e.updateQueue=null,ya.current=mT,t=n(r,i)}while(Ts)}if(ya.current=Ja,e=Ae!==null&&Ae.next!==null,Cr=0,ke=Ae=ge=null,Xa=!1,e)throw Error(M(300));return t}function Zh(){var t=Hs!==0;return Hs=0,t}function $t(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ke===null?ge.memoizedState=ke=t:ke=ke.next=t,ke}function St(){if(Ae===null){var t=ge.alternate;t=t!==null?t.memoizedState:null}else t=Ae.next;var e=ke===null?ge.memoizedState:ke.next;if(e!==null)ke=e,Ae=t;else{if(t===null)throw Error(M(310));Ae=t,t={memoizedState:Ae.memoizedState,baseState:Ae.baseState,baseQueue:Ae.baseQueue,queue:Ae.queue,next:null},ke===null?ge.memoizedState=ke=t:ke=ke.next=t}return ke}function Ws(t,e){return typeof e=="function"?e(t):e}function $u(t){var e=St(),n=e.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=t;var r=Ae,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,h=s;do{var f=h.lane;if((Cr&f)===f)u!==null&&(u=u.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),r=h.hasEagerState?h.eagerState:t(r,h.action);else{var m={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};u===null?(l=u=m,o=r):u=u.next=m,ge.lanes|=f,kr|=f}h=h.next}while(h!==null&&h!==s);u===null?o=r:u.next=l,bt(r,e.memoizedState)||(st=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,ge.lanes|=s,kr|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function zu(t){var e=St(),n=e.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);bt(s,e.memoizedState)||(st=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Ly(){}function Vy(t,e){var n=ge,r=St(),i=e(),s=!bt(r.memoizedState,i);if(s&&(r.memoizedState=i,st=!0),r=r.queue,ed(by.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||ke!==null&&ke.memoizedState.tag&1){if(n.flags|=2048,Ks(9,Fy.bind(null,n,r,i,e),void 0,null),xe===null)throw Error(M(349));Cr&30||My(n,e,i)}return i}function My(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ge.updateQueue,e===null?(e={lastEffect:null,stores:null},ge.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Fy(t,e,n,r){e.value=n,e.getSnapshot=r,Uy(e)&&jy(t)}function by(t,e,n){return n(function(){Uy(e)&&jy(t)})}function Uy(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!bt(t,n)}catch{return!0}}function jy(t){var e=_n(t,1);e!==null&&Mt(e,t,1,-1)}function Up(t){var e=$t();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ws,lastRenderedState:t},e.queue=t,t=t.dispatch=dT.bind(null,ge,t),[e.memoizedState,t]}function Ks(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ge.updateQueue,e===null?(e={lastEffect:null,stores:null},ge.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function By(){return St().memoizedState}function va(t,e,n,r){var i=$t();ge.flags|=t,i.memoizedState=Ks(1|e,n,void 0,r===void 0?null:r)}function Nl(t,e,n,r){var i=St();r=r===void 0?null:r;var s=void 0;if(Ae!==null){var o=Ae.memoizedState;if(s=o.destroy,r!==null&&Xh(r,o.deps)){i.memoizedState=Ks(e,n,s,r);return}}ge.flags|=t,i.memoizedState=Ks(1|e,n,s,r)}function jp(t,e){return va(8390656,8,t,e)}function ed(t,e){return Nl(2048,8,t,e)}function $y(t,e){return Nl(4,2,t,e)}function zy(t,e){return Nl(4,4,t,e)}function Hy(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Wy(t,e,n){return n=n!=null?n.concat([t]):null,Nl(4,4,Hy.bind(null,e,t),n)}function td(){}function Ky(t,e){var n=St();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Xh(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Gy(t,e){var n=St();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Xh(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function qy(t,e,n){return Cr&21?(bt(n,e)||(n=Zg(),ge.lanes|=n,kr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,st=!0),t.memoizedState=n)}function cT(t,e){var n=ne;ne=n!==0&&4>n?n:4,t(!0);var r=Bu.transition;Bu.transition={};try{t(!1),e()}finally{ne=n,Bu.transition=r}}function Qy(){return St().memoizedState}function hT(t,e,n){var r=qn(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Yy(t))Xy(e,n);else if(n=xy(t,e,n,r),n!==null){var i=tt();Mt(n,t,r,i),Jy(n,e,r)}}function dT(t,e,n){var r=qn(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Yy(t))Xy(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,bt(l,o)){var u=e.interleaved;u===null?(i.next=i,Kh(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=xy(t,e,i,r),n!==null&&(i=tt(),Mt(n,t,r,i),Jy(n,e,r))}}function Yy(t){var e=t.alternate;return t===ge||e!==null&&e===ge}function Xy(t,e){Ts=Xa=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Jy(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,Dh(t,n)}}var Ja={readContext:It,useCallback:ze,useContext:ze,useEffect:ze,useImperativeHandle:ze,useInsertionEffect:ze,useLayoutEffect:ze,useMemo:ze,useReducer:ze,useRef:ze,useState:ze,useDebugValue:ze,useDeferredValue:ze,useTransition:ze,useMutableSource:ze,useSyncExternalStore:ze,useId:ze,unstable_isNewReconciler:!1},fT={readContext:It,useCallback:function(t,e){return $t().memoizedState=[t,e===void 0?null:e],t},useContext:It,useEffect:jp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,va(4194308,4,Hy.bind(null,e,t),n)},useLayoutEffect:function(t,e){return va(4194308,4,t,e)},useInsertionEffect:function(t,e){return va(4,2,t,e)},useMemo:function(t,e){var n=$t();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=$t();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=hT.bind(null,ge,t),[r.memoizedState,t]},useRef:function(t){var e=$t();return t={current:t},e.memoizedState=t},useState:Up,useDebugValue:td,useDeferredValue:function(t){return $t().memoizedState=t},useTransition:function(){var t=Up(!1),e=t[0];return t=cT.bind(null,t[1]),$t().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ge,i=$t();if(he){if(n===void 0)throw Error(M(407));n=n()}else{if(n=e(),xe===null)throw Error(M(349));Cr&30||My(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,jp(by.bind(null,r,s,t),[t]),r.flags|=2048,Ks(9,Fy.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=$t(),e=xe.identifierPrefix;if(he){var n=ln,r=an;n=(r&~(1<<32-Vt(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Hs++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=uT++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},pT={readContext:It,useCallback:Ky,useContext:It,useEffect:ed,useImperativeHandle:Wy,useInsertionEffect:$y,useLayoutEffect:zy,useMemo:Gy,useReducer:$u,useRef:By,useState:function(){return $u(Ws)},useDebugValue:td,useDeferredValue:function(t){var e=St();return qy(e,Ae.memoizedState,t)},useTransition:function(){var t=$u(Ws)[0],e=St().memoizedState;return[t,e]},useMutableSource:Ly,useSyncExternalStore:Vy,useId:Qy,unstable_isNewReconciler:!1},mT={readContext:It,useCallback:Ky,useContext:It,useEffect:ed,useImperativeHandle:Wy,useInsertionEffect:$y,useLayoutEffect:zy,useMemo:Gy,useReducer:zu,useRef:By,useState:function(){return zu(Ws)},useDebugValue:td,useDeferredValue:function(t){var e=St();return Ae===null?e.memoizedState=t:qy(e,Ae.memoizedState,t)},useTransition:function(){var t=zu(Ws)[0],e=St().memoizedState;return[t,e]},useMutableSource:Ly,useSyncExternalStore:Vy,useId:Qy,unstable_isNewReconciler:!1};function Ct(t,e){if(t&&t.defaultProps){e=ye({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Fc(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ye({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var xl={isMounted:function(t){return(t=t._reactInternals)?br(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=tt(),i=qn(t),s=dn(r,i);s.payload=e,n!=null&&(s.callback=n),e=Kn(t,s,i),e!==null&&(Mt(e,t,i,r),ga(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=tt(),i=qn(t),s=dn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Kn(t,s,i),e!==null&&(Mt(e,t,i,r),ga(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=tt(),r=qn(t),i=dn(n,r);i.tag=2,e!=null&&(i.callback=e),e=Kn(t,i,r),e!==null&&(Mt(e,t,r,n),ga(e,t,r))}};function Bp(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!bs(n,r)||!bs(i,s):!0}function Zy(t,e,n){var r=!1,i=er,s=e.contextType;return typeof s=="object"&&s!==null?s=It(s):(i=at(e)?Ar:Ye.current,r=e.contextTypes,s=(r=r!=null)?gi(t,i):er),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=xl,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function $p(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&xl.enqueueReplaceState(e,e.state,null)}function bc(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Gh(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=It(s):(s=at(e)?Ar:Ye.current,i.context=gi(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Fc(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&xl.enqueueReplaceState(i,i.state,null),Qa(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function wi(t,e){try{var n="",r=e;do n+=zw(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function Hu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Uc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var gT=typeof WeakMap=="function"?WeakMap:Map;function ev(t,e,n){n=dn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){el||(el=!0,Qc=r),Uc(t,e)},n}function tv(t,e,n){n=dn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){Uc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Uc(t,e),typeof r!="function"&&(Gn===null?Gn=new Set([this]):Gn.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function zp(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new gT;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=NT.bind(null,t,e,n),e.then(t,t))}function Hp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Wp(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=dn(-1,1),e.tag=2,Kn(n,e,1))),n.lanes|=1),t)}var yT=Sn.ReactCurrentOwner,st=!1;function et(t,e,n,r){e.child=t===null?Ny(e,null,n,r):vi(e,t.child,n,r)}function Kp(t,e,n,r,i){n=n.render;var s=e.ref;return ui(e,i),r=Jh(t,e,n,r,s,i),n=Zh(),t!==null&&!st?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,wn(t,e,i)):(he&&n&&jh(e),e.flags|=1,et(t,e,r,i),e.child)}function Gp(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!ud(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,nv(t,e,s,r,i)):(t=Ta(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:bs,n(o,r)&&t.ref===e.ref)return wn(t,e,i)}return e.flags|=1,t=Qn(s,r),t.ref=e.ref,t.return=e,e.child=t}function nv(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(bs(s,r)&&t.ref===e.ref)if(st=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(st=!0);else return e.lanes=t.lanes,wn(t,e,i)}return jc(t,e,n,r,i)}function rv(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},oe(ri,ht),ht|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,oe(ri,ht),ht|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,oe(ri,ht),ht|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,oe(ri,ht),ht|=r;return et(t,e,i,n),e.child}function iv(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function jc(t,e,n,r,i){var s=at(n)?Ar:Ye.current;return s=gi(e,s),ui(e,i),n=Jh(t,e,n,r,s,i),r=Zh(),t!==null&&!st?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,wn(t,e,i)):(he&&r&&jh(e),e.flags|=1,et(t,e,n,i),e.child)}function qp(t,e,n,r,i){if(at(n)){var s=!0;Ha(e)}else s=!1;if(ui(e,i),e.stateNode===null)_a(t,e),Zy(e,n,r),bc(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,h=n.contextType;typeof h=="object"&&h!==null?h=It(h):(h=at(n)?Ar:Ye.current,h=gi(e,h));var f=n.getDerivedStateFromProps,m=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";m||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==h)&&$p(e,o,r,h),Ln=!1;var y=e.memoizedState;o.state=y,Qa(e,r,o,i),u=e.memoizedState,l!==r||y!==u||ot.current||Ln?(typeof f=="function"&&(Fc(e,n,f,r),u=e.memoizedState),(l=Ln||Bp(e,n,l,r,y,u,h))?(m||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=h,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Dy(t,e),l=e.memoizedProps,h=e.type===e.elementType?l:Ct(e.type,l),o.props=h,m=e.pendingProps,y=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=It(u):(u=at(n)?Ar:Ye.current,u=gi(e,u));var P=n.getDerivedStateFromProps;(f=typeof P=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==m||y!==u)&&$p(e,o,r,u),Ln=!1,y=e.memoizedState,o.state=y,Qa(e,r,o,i);var R=e.memoizedState;l!==m||y!==R||ot.current||Ln?(typeof P=="function"&&(Fc(e,n,P,r),R=e.memoizedState),(h=Ln||Bp(e,n,h,r,y,R,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,R,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,R,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=R),o.props=r,o.state=R,o.context=u,r=h):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&y===t.memoizedState||(e.flags|=1024),r=!1)}return Bc(t,e,n,r,s,i)}function Bc(t,e,n,r,i,s){iv(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Op(e,n,!1),wn(t,e,s);r=e.stateNode,yT.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=vi(e,t.child,null,s),e.child=vi(e,null,l,s)):et(t,e,l,s),e.memoizedState=r.state,i&&Op(e,n,!0),e.child}function sv(t){var e=t.stateNode;e.pendingContext?Dp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Dp(t,e.context,!1),qh(t,e.containerInfo)}function Qp(t,e,n,r,i){return yi(),$h(i),e.flags|=256,et(t,e,n,r),e.child}var $c={dehydrated:null,treeContext:null,retryLane:0};function zc(t){return{baseLanes:t,cachePool:null,transitions:null}}function ov(t,e,n){var r=e.pendingProps,i=me.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),oe(me,i&1),t===null)return Vc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Ll(o,r,0,null),t=Ir(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=zc(n),e.memoizedState=$c,t):nd(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return vT(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=Qn(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=Qn(l,s):(s=Ir(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?zc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=$c,r}return s=t.child,t=s.sibling,r=Qn(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function nd(t,e){return e=Ll({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function ea(t,e,n,r){return r!==null&&$h(r),vi(e,t.child,null,n),t=nd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function vT(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=Hu(Error(M(422))),ea(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=Ll({mode:"visible",children:r.children},i,0,null),s=Ir(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&vi(e,t.child,null,o),e.child.memoizedState=zc(o),e.memoizedState=$c,s);if(!(e.mode&1))return ea(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(M(419)),r=Hu(s,r,void 0),ea(t,e,o,r)}if(l=(o&t.childLanes)!==0,st||l){if(r=xe,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,_n(t,i),Mt(r,t,i,-1))}return ld(),r=Hu(Error(M(421))),ea(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=xT.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,dt=Wn(i.nextSibling),ft=e,he=!0,Nt=null,t!==null&&(_t[wt++]=an,_t[wt++]=ln,_t[wt++]=Pr,an=t.id,ln=t.overflow,Pr=e),e=nd(e,r.children),e.flags|=4096,e)}function Yp(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Mc(t.return,e,n)}function Wu(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function av(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(et(t,e,r.children,n),r=me.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Yp(t,n,e);else if(t.tag===19)Yp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(oe(me,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Ya(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),Wu(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Ya(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}Wu(e,!0,n,null,s);break;case"together":Wu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function _a(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function wn(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),kr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(M(153));if(e.child!==null){for(t=e.child,n=Qn(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Qn(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function _T(t,e,n){switch(e.tag){case 3:sv(e),yi();break;case 5:Oy(e);break;case 1:at(e.type)&&Ha(e);break;case 4:qh(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;oe(Ga,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(oe(me,me.current&1),e.flags|=128,null):n&e.child.childLanes?ov(t,e,n):(oe(me,me.current&1),t=wn(t,e,n),t!==null?t.sibling:null);oe(me,me.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return av(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),oe(me,me.current),r)break;return null;case 22:case 23:return e.lanes=0,rv(t,e,n)}return wn(t,e,n)}var lv,Hc,uv,cv;lv=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Hc=function(){};uv=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,_r(Wt.current);var s=null;switch(n){case"input":i=dc(t,i),r=dc(t,r),s=[];break;case"select":i=ye({},i,{value:void 0}),r=ye({},r,{value:void 0}),s=[];break;case"textarea":i=mc(t,i),r=mc(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=$a)}yc(n,r);var o;n=null;for(h in i)if(!r.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var l=i[h];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(xs.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in r){var u=r[h];if(l=i!=null?i[h]:void 0,r.hasOwnProperty(h)&&u!==l&&(u!=null||l!=null))if(h==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(h,n)),n=u;else h==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(h,u)):h==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(h,""+u):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(xs.hasOwnProperty(h)?(u!=null&&h==="onScroll"&&ue("scroll",t),s||l===u||(s=[])):(s=s||[]).push(h,u))}n&&(s=s||[]).push("style",n);var h=s;(e.updateQueue=h)&&(e.flags|=4)}};cv=function(t,e,n,r){n!==r&&(e.flags|=4)};function ss(t,e){if(!he)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function He(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function wT(t,e,n){var r=e.pendingProps;switch(Bh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return He(e),null;case 1:return at(e.type)&&za(),He(e),null;case 3:return r=e.stateNode,_i(),ce(ot),ce(Ye),Yh(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Jo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Nt!==null&&(Jc(Nt),Nt=null))),Hc(t,e),He(e),null;case 5:Qh(e);var i=_r(zs.current);if(n=e.type,t!==null&&e.stateNode!=null)uv(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(M(166));return He(e),null}if(t=_r(Wt.current),Jo(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[zt]=e,r[Bs]=s,t=(e.mode&1)!==0,n){case"dialog":ue("cancel",r),ue("close",r);break;case"iframe":case"object":case"embed":ue("load",r);break;case"video":case"audio":for(i=0;i<fs.length;i++)ue(fs[i],r);break;case"source":ue("error",r);break;case"img":case"image":case"link":ue("error",r),ue("load",r);break;case"details":ue("toggle",r);break;case"input":sp(r,s),ue("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},ue("invalid",r);break;case"textarea":ap(r,s),ue("invalid",r)}yc(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Xo(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Xo(r.textContent,l,t),i=["children",""+l]):xs.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&ue("scroll",r)}switch(n){case"input":zo(r),op(r,s,!0);break;case"textarea":zo(r),lp(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=$a)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=bg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[zt]=e,t[Bs]=r,lv(t,e,!1,!1),e.stateNode=t;e:{switch(o=vc(n,r),n){case"dialog":ue("cancel",t),ue("close",t),i=r;break;case"iframe":case"object":case"embed":ue("load",t),i=r;break;case"video":case"audio":for(i=0;i<fs.length;i++)ue(fs[i],t);i=r;break;case"source":ue("error",t),i=r;break;case"img":case"image":case"link":ue("error",t),ue("load",t),i=r;break;case"details":ue("toggle",t),i=r;break;case"input":sp(t,r),i=dc(t,r),ue("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=ye({},r,{value:void 0}),ue("invalid",t);break;case"textarea":ap(t,r),i=mc(t,r),ue("invalid",t);break;default:i=r}yc(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Bg(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Ug(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Ds(t,u):typeof u=="number"&&Ds(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(xs.hasOwnProperty(s)?u!=null&&s==="onScroll"&&ue("scroll",t):u!=null&&Ah(t,s,u,o))}switch(n){case"input":zo(t),op(t,r,!1);break;case"textarea":zo(t),lp(t);break;case"option":r.value!=null&&t.setAttribute("value",""+Zn(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?si(t,!!r.multiple,s,!1):r.defaultValue!=null&&si(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=$a)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return He(e),null;case 6:if(t&&e.stateNode!=null)cv(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(M(166));if(n=_r(zs.current),_r(Wt.current),Jo(e)){if(r=e.stateNode,n=e.memoizedProps,r[zt]=e,(s=r.nodeValue!==n)&&(t=ft,t!==null))switch(t.tag){case 3:Xo(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Xo(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[zt]=e,e.stateNode=r}return He(e),null;case 13:if(ce(me),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(he&&dt!==null&&e.mode&1&&!(e.flags&128))Cy(),yi(),e.flags|=98560,s=!1;else if(s=Jo(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(M(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(M(317));s[zt]=e}else yi(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;He(e),s=!1}else Nt!==null&&(Jc(Nt),Nt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||me.current&1?Pe===0&&(Pe=3):ld())),e.updateQueue!==null&&(e.flags|=4),He(e),null);case 4:return _i(),Hc(t,e),t===null&&Us(e.stateNode.containerInfo),He(e),null;case 10:return Wh(e.type._context),He(e),null;case 17:return at(e.type)&&za(),He(e),null;case 19:if(ce(me),s=e.memoizedState,s===null)return He(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)ss(s,!1);else{if(Pe!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Ya(t),o!==null){for(e.flags|=128,ss(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return oe(me,me.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ee()>Ei&&(e.flags|=128,r=!0,ss(s,!1),e.lanes=4194304)}else{if(!r)if(t=Ya(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ss(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!he)return He(e),null}else 2*Ee()-s.renderingStartTime>Ei&&n!==1073741824&&(e.flags|=128,r=!0,ss(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ee(),e.sibling=null,n=me.current,oe(me,r?n&1|2:n&1),e):(He(e),null);case 22:case 23:return ad(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?ht&1073741824&&(He(e),e.subtreeFlags&6&&(e.flags|=8192)):He(e),null;case 24:return null;case 25:return null}throw Error(M(156,e.tag))}function ET(t,e){switch(Bh(e),e.tag){case 1:return at(e.type)&&za(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return _i(),ce(ot),ce(Ye),Yh(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qh(e),null;case 13:if(ce(me),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(M(340));yi()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ce(me),null;case 4:return _i(),null;case 10:return Wh(e.type._context),null;case 22:case 23:return ad(),null;case 24:return null;default:return null}}var ta=!1,Ge=!1,TT=typeof WeakSet=="function"?WeakSet:Set,$=null;function ni(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){_e(t,e,r)}else n.current=null}function Wc(t,e,n){try{n()}catch(r){_e(t,e,r)}}var Xp=!1;function IT(t,e){if(Cc=Ua,t=my(),Uh(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,h=0,f=0,m=t,y=null;t:for(;;){for(var P;m!==n||i!==0&&m.nodeType!==3||(l=o+i),m!==s||r!==0&&m.nodeType!==3||(u=o+r),m.nodeType===3&&(o+=m.nodeValue.length),(P=m.firstChild)!==null;)y=m,m=P;for(;;){if(m===t)break t;if(y===n&&++h===i&&(l=o),y===s&&++f===r&&(u=o),(P=m.nextSibling)!==null)break;m=y,y=m.parentNode}m=P}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(kc={focusedElem:t,selectionRange:n},Ua=!1,$=e;$!==null;)if(e=$,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,$=t;else for(;$!==null;){e=$;try{var R=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(R!==null){var N=R.memoizedProps,D=R.memoizedState,w=e.stateNode,v=w.getSnapshotBeforeUpdate(e.elementType===e.type?N:Ct(e.type,N),D);w.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var T=e.stateNode.containerInfo;T.nodeType===1?T.textContent="":T.nodeType===9&&T.documentElement&&T.removeChild(T.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(M(163))}}catch(O){_e(e,e.return,O)}if(t=e.sibling,t!==null){t.return=e.return,$=t;break}$=e.return}return R=Xp,Xp=!1,R}function Is(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&Wc(e,n,s)}i=i.next}while(i!==r)}}function Dl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function Kc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function hv(t){var e=t.alternate;e!==null&&(t.alternate=null,hv(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[zt],delete e[Bs],delete e[Dc],delete e[sT],delete e[oT])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function dv(t){return t.tag===5||t.tag===3||t.tag===4}function Jp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||dv(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=$a));else if(r!==4&&(t=t.child,t!==null))for(Gc(t,e,n),t=t.sibling;t!==null;)Gc(t,e,n),t=t.sibling}function qc(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(qc(t,e,n),t=t.sibling;t!==null;)qc(t,e,n),t=t.sibling}var Le=null,kt=!1;function xn(t,e,n){for(n=n.child;n!==null;)fv(t,e,n),n=n.sibling}function fv(t,e,n){if(Ht&&typeof Ht.onCommitFiberUnmount=="function")try{Ht.onCommitFiberUnmount(Sl,n)}catch{}switch(n.tag){case 5:Ge||ni(n,e);case 6:var r=Le,i=kt;Le=null,xn(t,e,n),Le=r,kt=i,Le!==null&&(kt?(t=Le,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Le.removeChild(n.stateNode));break;case 18:Le!==null&&(kt?(t=Le,n=n.stateNode,t.nodeType===8?bu(t.parentNode,n):t.nodeType===1&&bu(t,n),Ms(t)):bu(Le,n.stateNode));break;case 4:r=Le,i=kt,Le=n.stateNode.containerInfo,kt=!0,xn(t,e,n),Le=r,kt=i;break;case 0:case 11:case 14:case 15:if(!Ge&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Wc(n,e,o),i=i.next}while(i!==r)}xn(t,e,n);break;case 1:if(!Ge&&(ni(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){_e(n,e,l)}xn(t,e,n);break;case 21:xn(t,e,n);break;case 22:n.mode&1?(Ge=(r=Ge)||n.memoizedState!==null,xn(t,e,n),Ge=r):xn(t,e,n);break;default:xn(t,e,n)}}function Zp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new TT),e.forEach(function(r){var i=DT.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Pt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:Le=l.stateNode,kt=!1;break e;case 3:Le=l.stateNode.containerInfo,kt=!0;break e;case 4:Le=l.stateNode.containerInfo,kt=!0;break e}l=l.return}if(Le===null)throw Error(M(160));fv(s,o,i),Le=null,kt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(h){_e(i,e,h)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)pv(e,t),e=e.sibling}function pv(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Pt(e,t),Bt(t),r&4){try{Is(3,t,t.return),Dl(3,t)}catch(N){_e(t,t.return,N)}try{Is(5,t,t.return)}catch(N){_e(t,t.return,N)}}break;case 1:Pt(e,t),Bt(t),r&512&&n!==null&&ni(n,n.return);break;case 5:if(Pt(e,t),Bt(t),r&512&&n!==null&&ni(n,n.return),t.flags&32){var i=t.stateNode;try{Ds(i,"")}catch(N){_e(t,t.return,N)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Mg(i,s),vc(l,o);var h=vc(l,s);for(o=0;o<u.length;o+=2){var f=u[o],m=u[o+1];f==="style"?Bg(i,m):f==="dangerouslySetInnerHTML"?Ug(i,m):f==="children"?Ds(i,m):Ah(i,f,m,h)}switch(l){case"input":fc(i,s);break;case"textarea":Fg(i,s);break;case"select":var y=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var P=s.value;P!=null?si(i,!!s.multiple,P,!1):y!==!!s.multiple&&(s.defaultValue!=null?si(i,!!s.multiple,s.defaultValue,!0):si(i,!!s.multiple,s.multiple?[]:"",!1))}i[Bs]=s}catch(N){_e(t,t.return,N)}}break;case 6:if(Pt(e,t),Bt(t),r&4){if(t.stateNode===null)throw Error(M(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(N){_e(t,t.return,N)}}break;case 3:if(Pt(e,t),Bt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ms(e.containerInfo)}catch(N){_e(t,t.return,N)}break;case 4:Pt(e,t),Bt(t);break;case 13:Pt(e,t),Bt(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(sd=Ee())),r&4&&Zp(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Ge=(h=Ge)||f,Pt(e,t),Ge=h):Pt(e,t),Bt(t),r&8192){if(h=t.memoizedState!==null,(t.stateNode.isHidden=h)&&!f&&t.mode&1)for($=t,f=t.child;f!==null;){for(m=$=f;$!==null;){switch(y=$,P=y.child,y.tag){case 0:case 11:case 14:case 15:Is(4,y,y.return);break;case 1:ni(y,y.return);var R=y.stateNode;if(typeof R.componentWillUnmount=="function"){r=y,n=y.return;try{e=r,R.props=e.memoizedProps,R.state=e.memoizedState,R.componentWillUnmount()}catch(N){_e(r,n,N)}}break;case 5:ni(y,y.return);break;case 22:if(y.memoizedState!==null){tm(m);continue}}P!==null?(P.return=y,$=P):tm(m)}f=f.sibling}e:for(f=null,m=t;;){if(m.tag===5){if(f===null){f=m;try{i=m.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=m.stateNode,u=m.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=jg("display",o))}catch(N){_e(t,t.return,N)}}}else if(m.tag===6){if(f===null)try{m.stateNode.nodeValue=h?"":m.memoizedProps}catch(N){_e(t,t.return,N)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===t)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===t)break e;for(;m.sibling===null;){if(m.return===null||m.return===t)break e;f===m&&(f=null),m=m.return}f===m&&(f=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:Pt(e,t),Bt(t),r&4&&Zp(t);break;case 21:break;default:Pt(e,t),Bt(t)}}function Bt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(dv(n)){var r=n;break e}n=n.return}throw Error(M(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Ds(i,""),r.flags&=-33);var s=Jp(t);qc(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Jp(t);Gc(t,l,o);break;default:throw Error(M(161))}}catch(u){_e(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ST(t,e,n){$=t,mv(t)}function mv(t,e,n){for(var r=(t.mode&1)!==0;$!==null;){var i=$,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||ta;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||Ge;l=ta;var h=Ge;if(ta=o,(Ge=u)&&!h)for($=i;$!==null;)o=$,u=o.child,o.tag===22&&o.memoizedState!==null?nm(i):u!==null?(u.return=o,$=u):nm(i);for(;s!==null;)$=s,mv(s),s=s.sibling;$=i,ta=l,Ge=h}em(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,$=s):em(t)}}function em(t){for(;$!==null;){var e=$;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ge||Dl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ge)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Ct(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&bp(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}bp(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var h=e.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var m=f.dehydrated;m!==null&&Ms(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(M(163))}Ge||e.flags&512&&Kc(e)}catch(y){_e(e,e.return,y)}}if(e===t){$=null;break}if(n=e.sibling,n!==null){n.return=e.return,$=n;break}$=e.return}}function tm(t){for(;$!==null;){var e=$;if(e===t){$=null;break}var n=e.sibling;if(n!==null){n.return=e.return,$=n;break}$=e.return}}function nm(t){for(;$!==null;){var e=$;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Dl(4,e)}catch(u){_e(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){_e(e,i,u)}}var s=e.return;try{Kc(e)}catch(u){_e(e,s,u)}break;case 5:var o=e.return;try{Kc(e)}catch(u){_e(e,o,u)}}}catch(u){_e(e,e.return,u)}if(e===t){$=null;break}var l=e.sibling;if(l!==null){l.return=e.return,$=l;break}$=e.return}}var RT=Math.ceil,Za=Sn.ReactCurrentDispatcher,rd=Sn.ReactCurrentOwner,Tt=Sn.ReactCurrentBatchConfig,ee=0,xe=null,Re=null,be=0,ht=0,ri=sr(0),Pe=0,Gs=null,kr=0,Ol=0,id=0,Ss=null,it=null,sd=0,Ei=1/0,rn=null,el=!1,Qc=null,Gn=null,na=!1,Bn=null,tl=0,Rs=0,Yc=null,wa=-1,Ea=0;function tt(){return ee&6?Ee():wa!==-1?wa:wa=Ee()}function qn(t){return t.mode&1?ee&2&&be!==0?be&-be:lT.transition!==null?(Ea===0&&(Ea=Zg()),Ea):(t=ne,t!==0||(t=window.event,t=t===void 0?16:oy(t.type)),t):1}function Mt(t,e,n,r){if(50<Rs)throw Rs=0,Yc=null,Error(M(185));oo(t,n,r),(!(ee&2)||t!==xe)&&(t===xe&&(!(ee&2)&&(Ol|=n),Pe===4&&Mn(t,be)),lt(t,r),n===1&&ee===0&&!(e.mode&1)&&(Ei=Ee()+500,kl&&or()))}function lt(t,e){var n=t.callbackNode;lE(t,e);var r=ba(t,t===xe?be:0);if(r===0)n!==null&&hp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&hp(n),e===1)t.tag===0?aT(rm.bind(null,t)):Ry(rm.bind(null,t)),rT(function(){!(ee&6)&&or()}),n=null;else{switch(ey(r)){case 1:n=xh;break;case 4:n=Xg;break;case 16:n=Fa;break;case 536870912:n=Jg;break;default:n=Fa}n=Iv(n,gv.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function gv(t,e){if(wa=-1,Ea=0,ee&6)throw Error(M(327));var n=t.callbackNode;if(ci()&&t.callbackNode!==n)return null;var r=ba(t,t===xe?be:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=nl(t,r);else{e=r;var i=ee;ee|=2;var s=vv();(xe!==t||be!==e)&&(rn=null,Ei=Ee()+500,Tr(t,e));do try{CT();break}catch(l){yv(t,l)}while(!0);Hh(),Za.current=s,ee=i,Re!==null?e=0:(xe=null,be=0,e=Pe)}if(e!==0){if(e===2&&(i=Ic(t),i!==0&&(r=i,e=Xc(t,i))),e===1)throw n=Gs,Tr(t,0),Mn(t,r),lt(t,Ee()),n;if(e===6)Mn(t,r);else{if(i=t.current.alternate,!(r&30)&&!AT(i)&&(e=nl(t,r),e===2&&(s=Ic(t),s!==0&&(r=s,e=Xc(t,s))),e===1))throw n=Gs,Tr(t,0),Mn(t,r),lt(t,Ee()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(M(345));case 2:mr(t,it,rn);break;case 3:if(Mn(t,r),(r&130023424)===r&&(e=sd+500-Ee(),10<e)){if(ba(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){tt(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=xc(mr.bind(null,t,it,rn),e);break}mr(t,it,rn);break;case 4:if(Mn(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-Vt(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ee()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*RT(r/1960))-r,10<r){t.timeoutHandle=xc(mr.bind(null,t,it,rn),r);break}mr(t,it,rn);break;case 5:mr(t,it,rn);break;default:throw Error(M(329))}}}return lt(t,Ee()),t.callbackNode===n?gv.bind(null,t):null}function Xc(t,e){var n=Ss;return t.current.memoizedState.isDehydrated&&(Tr(t,e).flags|=256),t=nl(t,e),t!==2&&(e=it,it=n,e!==null&&Jc(e)),t}function Jc(t){it===null?it=t:it.push.apply(it,t)}function AT(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!bt(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Mn(t,e){for(e&=~id,e&=~Ol,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Vt(e),r=1<<n;t[n]=-1,e&=~r}}function rm(t){if(ee&6)throw Error(M(327));ci();var e=ba(t,0);if(!(e&1))return lt(t,Ee()),null;var n=nl(t,e);if(t.tag!==0&&n===2){var r=Ic(t);r!==0&&(e=r,n=Xc(t,r))}if(n===1)throw n=Gs,Tr(t,0),Mn(t,e),lt(t,Ee()),n;if(n===6)throw Error(M(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,mr(t,it,rn),lt(t,Ee()),null}function od(t,e){var n=ee;ee|=1;try{return t(e)}finally{ee=n,ee===0&&(Ei=Ee()+500,kl&&or())}}function Nr(t){Bn!==null&&Bn.tag===0&&!(ee&6)&&ci();var e=ee;ee|=1;var n=Tt.transition,r=ne;try{if(Tt.transition=null,ne=1,t)return t()}finally{ne=r,Tt.transition=n,ee=e,!(ee&6)&&or()}}function ad(){ht=ri.current,ce(ri)}function Tr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,nT(n)),Re!==null)for(n=Re.return;n!==null;){var r=n;switch(Bh(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&za();break;case 3:_i(),ce(ot),ce(Ye),Yh();break;case 5:Qh(r);break;case 4:_i();break;case 13:ce(me);break;case 19:ce(me);break;case 10:Wh(r.type._context);break;case 22:case 23:ad()}n=n.return}if(xe=t,Re=t=Qn(t.current,null),be=ht=e,Pe=0,Gs=null,id=Ol=kr=0,it=Ss=null,vr!==null){for(e=0;e<vr.length;e++)if(n=vr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}vr=null}return t}function yv(t,e){do{var n=Re;try{if(Hh(),ya.current=Ja,Xa){for(var r=ge.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Xa=!1}if(Cr=0,ke=Ae=ge=null,Ts=!1,Hs=0,rd.current=null,n===null||n.return===null){Pe=1,Gs=e,Re=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=be,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var h=u,f=l,m=f.tag;if(!(f.mode&1)&&(m===0||m===11||m===15)){var y=f.alternate;y?(f.updateQueue=y.updateQueue,f.memoizedState=y.memoizedState,f.lanes=y.lanes):(f.updateQueue=null,f.memoizedState=null)}var P=Hp(o);if(P!==null){P.flags&=-257,Wp(P,o,l,s,e),P.mode&1&&zp(s,h,e),e=P,u=h;var R=e.updateQueue;if(R===null){var N=new Set;N.add(u),e.updateQueue=N}else R.add(u);break e}else{if(!(e&1)){zp(s,h,e),ld();break e}u=Error(M(426))}}else if(he&&l.mode&1){var D=Hp(o);if(D!==null){!(D.flags&65536)&&(D.flags|=256),Wp(D,o,l,s,e),$h(wi(u,l));break e}}s=u=wi(u,l),Pe!==4&&(Pe=2),Ss===null?Ss=[s]:Ss.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var w=ev(s,u,e);Fp(s,w);break e;case 1:l=u;var v=s.type,T=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||T!==null&&typeof T.componentDidCatch=="function"&&(Gn===null||!Gn.has(T)))){s.flags|=65536,e&=-e,s.lanes|=e;var O=tv(s,l,e);Fp(s,O);break e}}s=s.return}while(s!==null)}wv(n)}catch(b){e=b,Re===n&&n!==null&&(Re=n=n.return);continue}break}while(!0)}function vv(){var t=Za.current;return Za.current=Ja,t===null?Ja:t}function ld(){(Pe===0||Pe===3||Pe===2)&&(Pe=4),xe===null||!(kr&268435455)&&!(Ol&268435455)||Mn(xe,be)}function nl(t,e){var n=ee;ee|=2;var r=vv();(xe!==t||be!==e)&&(rn=null,Tr(t,e));do try{PT();break}catch(i){yv(t,i)}while(!0);if(Hh(),ee=n,Za.current=r,Re!==null)throw Error(M(261));return xe=null,be=0,Pe}function PT(){for(;Re!==null;)_v(Re)}function CT(){for(;Re!==null&&!Zw();)_v(Re)}function _v(t){var e=Tv(t.alternate,t,ht);t.memoizedProps=t.pendingProps,e===null?wv(t):Re=e,rd.current=null}function wv(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=ET(n,e),n!==null){n.flags&=32767,Re=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Pe=6,Re=null;return}}else if(n=wT(n,e,ht),n!==null){Re=n;return}if(e=e.sibling,e!==null){Re=e;return}Re=e=t}while(e!==null);Pe===0&&(Pe=5)}function mr(t,e,n){var r=ne,i=Tt.transition;try{Tt.transition=null,ne=1,kT(t,e,n,r)}finally{Tt.transition=i,ne=r}return null}function kT(t,e,n,r){do ci();while(Bn!==null);if(ee&6)throw Error(M(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(M(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(uE(t,s),t===xe&&(Re=xe=null,be=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||na||(na=!0,Iv(Fa,function(){return ci(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Tt.transition,Tt.transition=null;var o=ne;ne=1;var l=ee;ee|=4,rd.current=null,IT(t,n),pv(n,t),QE(kc),Ua=!!Cc,kc=Cc=null,t.current=n,ST(n),eE(),ee=l,ne=o,Tt.transition=s}else t.current=n;if(na&&(na=!1,Bn=t,tl=i),s=t.pendingLanes,s===0&&(Gn=null),rE(n.stateNode),lt(t,Ee()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(el)throw el=!1,t=Qc,Qc=null,t;return tl&1&&t.tag!==0&&ci(),s=t.pendingLanes,s&1?t===Yc?Rs++:(Rs=0,Yc=t):Rs=0,or(),null}function ci(){if(Bn!==null){var t=ey(tl),e=Tt.transition,n=ne;try{if(Tt.transition=null,ne=16>t?16:t,Bn===null)var r=!1;else{if(t=Bn,Bn=null,tl=0,ee&6)throw Error(M(331));var i=ee;for(ee|=4,$=t.current;$!==null;){var s=$,o=s.child;if($.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var h=l[u];for($=h;$!==null;){var f=$;switch(f.tag){case 0:case 11:case 15:Is(8,f,s)}var m=f.child;if(m!==null)m.return=f,$=m;else for(;$!==null;){f=$;var y=f.sibling,P=f.return;if(hv(f),f===h){$=null;break}if(y!==null){y.return=P,$=y;break}$=P}}}var R=s.alternate;if(R!==null){var N=R.child;if(N!==null){R.child=null;do{var D=N.sibling;N.sibling=null,N=D}while(N!==null)}}$=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,$=o;else e:for(;$!==null;){if(s=$,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Is(9,s,s.return)}var w=s.sibling;if(w!==null){w.return=s.return,$=w;break e}$=s.return}}var v=t.current;for($=v;$!==null;){o=$;var T=o.child;if(o.subtreeFlags&2064&&T!==null)T.return=o,$=T;else e:for(o=v;$!==null;){if(l=$,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Dl(9,l)}}catch(b){_e(l,l.return,b)}if(l===o){$=null;break e}var O=l.sibling;if(O!==null){O.return=l.return,$=O;break e}$=l.return}}if(ee=i,or(),Ht&&typeof Ht.onPostCommitFiberRoot=="function")try{Ht.onPostCommitFiberRoot(Sl,t)}catch{}r=!0}return r}finally{ne=n,Tt.transition=e}}return!1}function im(t,e,n){e=wi(n,e),e=ev(t,e,1),t=Kn(t,e,1),e=tt(),t!==null&&(oo(t,1,e),lt(t,e))}function _e(t,e,n){if(t.tag===3)im(t,t,n);else for(;e!==null;){if(e.tag===3){im(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Gn===null||!Gn.has(r))){t=wi(n,t),t=tv(e,t,1),e=Kn(e,t,1),t=tt(),e!==null&&(oo(e,1,t),lt(e,t));break}}e=e.return}}function NT(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=tt(),t.pingedLanes|=t.suspendedLanes&n,xe===t&&(be&n)===n&&(Pe===4||Pe===3&&(be&130023424)===be&&500>Ee()-sd?Tr(t,0):id|=n),lt(t,e)}function Ev(t,e){e===0&&(t.mode&1?(e=Ko,Ko<<=1,!(Ko&130023424)&&(Ko=4194304)):e=1);var n=tt();t=_n(t,e),t!==null&&(oo(t,e,n),lt(t,n))}function xT(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ev(t,n)}function DT(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(M(314))}r!==null&&r.delete(e),Ev(t,n)}var Tv;Tv=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||ot.current)st=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return st=!1,_T(t,e,n);st=!!(t.flags&131072)}else st=!1,he&&e.flags&1048576&&Ay(e,Ka,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;_a(t,e),t=e.pendingProps;var i=gi(e,Ye.current);ui(e,n),i=Jh(null,e,r,t,i,n);var s=Zh();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,at(r)?(s=!0,Ha(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Gh(e),i.updater=xl,e.stateNode=i,i._reactInternals=e,bc(e,r,t,n),e=Bc(null,e,r,!0,s,n)):(e.tag=0,he&&s&&jh(e),et(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(_a(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=LT(r),t=Ct(r,t),i){case 0:e=jc(null,e,r,t,n);break e;case 1:e=qp(null,e,r,t,n);break e;case 11:e=Kp(null,e,r,t,n);break e;case 14:e=Gp(null,e,r,Ct(r.type,t),n);break e}throw Error(M(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ct(r,i),jc(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ct(r,i),qp(t,e,r,i,n);case 3:e:{if(sv(e),t===null)throw Error(M(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Dy(t,e),Qa(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=wi(Error(M(423)),e),e=Qp(t,e,r,n,i);break e}else if(r!==i){i=wi(Error(M(424)),e),e=Qp(t,e,r,n,i);break e}else for(dt=Wn(e.stateNode.containerInfo.firstChild),ft=e,he=!0,Nt=null,n=Ny(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(yi(),r===i){e=wn(t,e,n);break e}et(t,e,r,n)}e=e.child}return e;case 5:return Oy(e),t===null&&Vc(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,Nc(r,i)?o=null:s!==null&&Nc(r,s)&&(e.flags|=32),iv(t,e),et(t,e,o,n),e.child;case 6:return t===null&&Vc(e),null;case 13:return ov(t,e,n);case 4:return qh(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=vi(e,null,r,n):et(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ct(r,i),Kp(t,e,r,i,n);case 7:return et(t,e,e.pendingProps,n),e.child;case 8:return et(t,e,e.pendingProps.children,n),e.child;case 12:return et(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,oe(Ga,r._currentValue),r._currentValue=o,s!==null)if(bt(s.value,o)){if(s.children===i.children&&!ot.current){e=wn(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=dn(-1,n&-n),u.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?u.next=u:(u.next=f.next,f.next=u),h.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Mc(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(M(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Mc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}et(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,ui(e,n),i=It(i),r=r(i),e.flags|=1,et(t,e,r,n),e.child;case 14:return r=e.type,i=Ct(r,e.pendingProps),i=Ct(r.type,i),Gp(t,e,r,i,n);case 15:return nv(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Ct(r,i),_a(t,e),e.tag=1,at(r)?(t=!0,Ha(e)):t=!1,ui(e,n),Zy(e,r,i),bc(e,r,i,n),Bc(null,e,r,!0,t,n);case 19:return av(t,e,n);case 22:return rv(t,e,n)}throw Error(M(156,e.tag))};function Iv(t,e){return Yg(t,e)}function OT(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Et(t,e,n,r){return new OT(t,e,n,r)}function ud(t){return t=t.prototype,!(!t||!t.isReactComponent)}function LT(t){if(typeof t=="function")return ud(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ch)return 11;if(t===kh)return 14}return 2}function Qn(t,e){var n=t.alternate;return n===null?(n=Et(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ta(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")ud(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Gr:return Ir(n.children,i,s,e);case Ph:o=8,i|=8;break;case lc:return t=Et(12,n,e,i|2),t.elementType=lc,t.lanes=s,t;case uc:return t=Et(13,n,e,i),t.elementType=uc,t.lanes=s,t;case cc:return t=Et(19,n,e,i),t.elementType=cc,t.lanes=s,t;case Og:return Ll(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case xg:o=10;break e;case Dg:o=9;break e;case Ch:o=11;break e;case kh:o=14;break e;case On:o=16,r=null;break e}throw Error(M(130,t==null?t:typeof t,""))}return e=Et(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function Ir(t,e,n,r){return t=Et(7,t,r,e),t.lanes=n,t}function Ll(t,e,n,r){return t=Et(22,t,r,e),t.elementType=Og,t.lanes=n,t.stateNode={isHidden:!1},t}function Ku(t,e,n){return t=Et(6,t,null,e),t.lanes=n,t}function Gu(t,e,n){return e=Et(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function VT(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pu(0),this.expirationTimes=Pu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pu(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function cd(t,e,n,r,i,s,o,l,u){return t=new VT(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Et(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Gh(s),t}function MT(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Kr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function Sv(t){if(!t)return er;t=t._reactInternals;e:{if(br(t)!==t||t.tag!==1)throw Error(M(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(at(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(M(171))}if(t.tag===1){var n=t.type;if(at(n))return Sy(t,n,e)}return e}function Rv(t,e,n,r,i,s,o,l,u){return t=cd(n,r,!0,t,i,s,o,l,u),t.context=Sv(null),n=t.current,r=tt(),i=qn(n),s=dn(r,i),s.callback=e??null,Kn(n,s,i),t.current.lanes=i,oo(t,i,r),lt(t,r),t}function Vl(t,e,n,r){var i=e.current,s=tt(),o=qn(i);return n=Sv(n),e.context===null?e.context=n:e.pendingContext=n,e=dn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=Kn(i,e,o),t!==null&&(Mt(t,i,o,s),ga(t,i,o)),o}function rl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function sm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function hd(t,e){sm(t,e),(t=t.alternate)&&sm(t,e)}function FT(){return null}var Av=typeof reportError=="function"?reportError:function(t){console.error(t)};function dd(t){this._internalRoot=t}Ml.prototype.render=dd.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(M(409));Vl(t,e,null,null)};Ml.prototype.unmount=dd.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Nr(function(){Vl(null,t,null,null)}),e[vn]=null}};function Ml(t){this._internalRoot=t}Ml.prototype.unstable_scheduleHydration=function(t){if(t){var e=ry();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Vn.length&&e!==0&&e<Vn[n].priority;n++);Vn.splice(n,0,t),n===0&&sy(t)}};function fd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Fl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function om(){}function bT(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var h=rl(o);s.call(h)}}var o=Rv(e,r,t,0,null,!1,!1,"",om);return t._reactRootContainer=o,t[vn]=o.current,Us(t.nodeType===8?t.parentNode:t),Nr(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var h=rl(u);l.call(h)}}var u=cd(t,0,!1,null,null,!1,!1,"",om);return t._reactRootContainer=u,t[vn]=u.current,Us(t.nodeType===8?t.parentNode:t),Nr(function(){Vl(e,u,n,r)}),u}function bl(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=rl(o);l.call(u)}}Vl(e,o,t,i)}else o=bT(n,e,t,i,r);return rl(o)}ty=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ds(e.pendingLanes);n!==0&&(Dh(e,n|1),lt(e,Ee()),!(ee&6)&&(Ei=Ee()+500,or()))}break;case 13:Nr(function(){var r=_n(t,1);if(r!==null){var i=tt();Mt(r,t,1,i)}}),hd(t,1)}};Oh=function(t){if(t.tag===13){var e=_n(t,134217728);if(e!==null){var n=tt();Mt(e,t,134217728,n)}hd(t,134217728)}};ny=function(t){if(t.tag===13){var e=qn(t),n=_n(t,e);if(n!==null){var r=tt();Mt(n,t,e,r)}hd(t,e)}};ry=function(){return ne};iy=function(t,e){var n=ne;try{return ne=t,e()}finally{ne=n}};wc=function(t,e,n){switch(e){case"input":if(fc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Cl(r);if(!i)throw Error(M(90));Vg(r),fc(r,i)}}}break;case"textarea":Fg(t,n);break;case"select":e=n.value,e!=null&&si(t,!!n.multiple,e,!1)}};Hg=od;Wg=Nr;var UT={usingClientEntryPoint:!1,Events:[lo,Xr,Cl,$g,zg,od]},os={findFiberByHostInstance:yr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jT={bundleType:os.bundleType,version:os.version,rendererPackageName:os.rendererPackageName,rendererConfig:os.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Sn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=qg(t),t===null?null:t.stateNode},findFiberByHostInstance:os.findFiberByHostInstance||FT,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ra=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ra.isDisabled&&ra.supportsFiber)try{Sl=ra.inject(jT),Ht=ra}catch{}}gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=UT;gt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!fd(e))throw Error(M(200));return MT(t,e,null,n)};gt.createRoot=function(t,e){if(!fd(t))throw Error(M(299));var n=!1,r="",i=Av;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=cd(t,1,!1,null,null,n,!1,r,i),t[vn]=e.current,Us(t.nodeType===8?t.parentNode:t),new dd(e)};gt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(M(188)):(t=Object.keys(t).join(","),Error(M(268,t)));return t=qg(e),t=t===null?null:t.stateNode,t};gt.flushSync=function(t){return Nr(t)};gt.hydrate=function(t,e,n){if(!Fl(e))throw Error(M(200));return bl(null,t,e,!0,n)};gt.hydrateRoot=function(t,e,n){if(!fd(t))throw Error(M(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=Av;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Rv(e,null,t,1,n??null,i,!1,s,o),t[vn]=e.current,Us(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new Ml(e)};gt.render=function(t,e,n){if(!Fl(e))throw Error(M(200));return bl(null,t,e,!1,n)};gt.unmountComponentAtNode=function(t){if(!Fl(t))throw Error(M(40));return t._reactRootContainer?(Nr(function(){bl(null,null,t,!1,function(){t._reactRootContainer=null,t[vn]=null})}),!0):!1};gt.unstable_batchedUpdates=od;gt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!Fl(n))throw Error(M(200));if(t==null||t._reactInternals===void 0)throw Error(M(38));return bl(t,e,n,!1,r)};gt.version="18.3.1-next-f1338f8080-20240426";function Pv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pv)}catch(t){console.error(t)}}Pv(),Pg.exports=gt;var BT=Pg.exports,am=BT;oc.createRoot=am.createRoot,oc.hydrateRoot=am.hydrateRoot;/**
 * react-router v7.9.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var lm="popstate";function $T(t={}){function e(r,i){let{pathname:s,search:o,hash:l}=r.location;return Zc("",{pathname:s,search:o,hash:l},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function n(r,i){return typeof i=="string"?i:qs(i)}return HT(e,n,null,t)}function de(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Ut(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function zT(){return Math.random().toString(36).substring(2,10)}function um(t,e){return{usr:t.state,key:t.key,idx:e}}function Zc(t,e,n=null,r){return{pathname:typeof t=="string"?t:t.pathname,search:"",hash:"",...typeof e=="string"?Di(e):e,state:n,key:e&&e.key||r||zT()}}function qs({pathname:t="/",search:e="",hash:n=""}){return e&&e!=="?"&&(t+=e.charAt(0)==="?"?e:"?"+e),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function Di(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substring(n),t=t.substring(0,n));let r=t.indexOf("?");r>=0&&(e.search=t.substring(r),t=t.substring(0,r)),t&&(e.pathname=t)}return e}function HT(t,e,n,r={}){let{window:i=document.defaultView,v5Compat:s=!1}=r,o=i.history,l="POP",u=null,h=f();h==null&&(h=0,o.replaceState({...o.state,idx:h},""));function f(){return(o.state||{idx:null}).idx}function m(){l="POP";let D=f(),w=D==null?null:D-h;h=D,u&&u({action:l,location:N.location,delta:w})}function y(D,w){l="PUSH";let v=Zc(N.location,D,w);h=f()+1;let T=um(v,h),O=N.createHref(v);try{o.pushState(T,"",O)}catch(b){if(b instanceof DOMException&&b.name==="DataCloneError")throw b;i.location.assign(O)}s&&u&&u({action:l,location:N.location,delta:1})}function P(D,w){l="REPLACE";let v=Zc(N.location,D,w);h=f();let T=um(v,h),O=N.createHref(v);o.replaceState(T,"",O),s&&u&&u({action:l,location:N.location,delta:0})}function R(D){return WT(D)}let N={get action(){return l},get location(){return t(i,o)},listen(D){if(u)throw new Error("A history only accepts one active listener");return i.addEventListener(lm,m),u=D,()=>{i.removeEventListener(lm,m),u=null}},createHref(D){return e(i,D)},createURL:R,encodeLocation(D){let w=R(D);return{pathname:w.pathname,search:w.search,hash:w.hash}},push:y,replace:P,go(D){return o.go(D)}};return N}function WT(t,e=!1){let n="http://localhost";typeof window<"u"&&(n=window.location.origin!=="null"?window.location.origin:window.location.href),de(n,"No window.location.(origin|href) available to create URL");let r=typeof t=="string"?t:qs(t);return r=r.replace(/ $/,"%20"),!e&&r.startsWith("//")&&(r=n+r),new URL(r,n)}function Cv(t,e,n="/"){return KT(t,e,n,!1)}function KT(t,e,n,r){let i=typeof e=="string"?Di(e):e,s=En(i.pathname||"/",n);if(s==null)return null;let o=kv(t);GT(o);let l=null;for(let u=0;l==null&&u<o.length;++u){let h=iI(s);l=nI(o[u],h,r)}return l}function kv(t,e=[],n=[],r="",i=!1){let s=(o,l,u=i,h)=>{let f={relativePath:h===void 0?o.path||"":h,caseSensitive:o.caseSensitive===!0,childrenIndex:l,route:o};if(f.relativePath.startsWith("/")){if(!f.relativePath.startsWith(r)&&u)return;de(f.relativePath.startsWith(r),`Absolute route path "${f.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),f.relativePath=f.relativePath.slice(r.length)}let m=fn([r,f.relativePath]),y=n.concat(f);o.children&&o.children.length>0&&(de(o.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${m}".`),kv(o.children,e,y,m,u)),!(o.path==null&&!o.index)&&e.push({path:m,score:eI(m,o.index),routesMeta:y})};return t.forEach((o,l)=>{var u;if(o.path===""||!((u=o.path)!=null&&u.includes("?")))s(o,l);else for(let h of Nv(o.path))s(o,l,!0,h)}),e}function Nv(t){let e=t.split("/");if(e.length===0)return[];let[n,...r]=e,i=n.endsWith("?"),s=n.replace(/\?$/,"");if(r.length===0)return i?[s,""]:[s];let o=Nv(r.join("/")),l=[];return l.push(...o.map(u=>u===""?s:[s,u].join("/"))),i&&l.push(...o),l.map(u=>t.startsWith("/")&&u===""?"/":u)}function GT(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:tI(e.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}var qT=/^:[\w-]+$/,QT=3,YT=2,XT=1,JT=10,ZT=-2,cm=t=>t==="*";function eI(t,e){let n=t.split("/"),r=n.length;return n.some(cm)&&(r+=ZT),e&&(r+=YT),n.filter(i=>!cm(i)).reduce((i,s)=>i+(qT.test(s)?QT:s===""?XT:JT),r)}function tI(t,e){return t.length===e.length&&t.slice(0,-1).every((r,i)=>r===e[i])?t[t.length-1]-e[e.length-1]:0}function nI(t,e,n=!1){let{routesMeta:r}=t,i={},s="/",o=[];for(let l=0;l<r.length;++l){let u=r[l],h=l===r.length-1,f=s==="/"?e:e.slice(s.length)||"/",m=il({path:u.relativePath,caseSensitive:u.caseSensitive,end:h},f),y=u.route;if(!m&&h&&n&&!r[r.length-1].route.index&&(m=il({path:u.relativePath,caseSensitive:u.caseSensitive,end:!1},f)),!m)return null;Object.assign(i,m.params),o.push({params:i,pathname:fn([s,m.pathname]),pathnameBase:lI(fn([s,m.pathnameBase])),route:y}),m.pathnameBase!=="/"&&(s=fn([s,m.pathnameBase]))}return o}function il(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,r]=rI(t.path,t.caseSensitive,t.end),i=e.match(n);if(!i)return null;let s=i[0],o=s.replace(/(.)\/+$/,"$1"),l=i.slice(1);return{params:r.reduce((h,{paramName:f,isOptional:m},y)=>{if(f==="*"){let R=l[y]||"";o=s.slice(0,s.length-R.length).replace(/(.)\/+$/,"$1")}const P=l[y];return m&&!P?h[f]=void 0:h[f]=(P||"").replace(/%2F/g,"/"),h},{}),pathname:s,pathnameBase:o,pattern:t}}function rI(t,e=!1,n=!0){Ut(t==="*"||!t.endsWith("*")||t.endsWith("/*"),`Route path "${t}" will be treated as if it were "${t.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${t.replace(/\*$/,"/*")}".`);let r=[],i="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,l,u)=>(r.push({paramName:l,isOptional:u!=null}),u?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return t.endsWith("*")?(r.push({paramName:"*"}),i+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?i+="\\/*$":t!==""&&t!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,e?void 0:"i"),r]}function iI(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Ut(!1,`The URL path "${t}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${e}).`),t}}function En(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,r=t.charAt(n);return r&&r!=="/"?null:t.slice(n)||"/"}function sI(t,e="/"){let{pathname:n,search:r="",hash:i=""}=typeof t=="string"?Di(t):t;return{pathname:n?n.startsWith("/")?n:oI(n,e):e,search:uI(r),hash:cI(i)}}function oI(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(i=>{i===".."?n.length>1&&n.pop():i!=="."&&n.push(i)}),n.length>1?n.join("/"):"/"}function qu(t,e,n,r){return`Cannot include a '${t}' character in a manually specified \`to.${e}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function aI(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function pd(t){let e=aI(t);return e.map((n,r)=>r===e.length-1?n.pathname:n.pathnameBase)}function md(t,e,n,r=!1){let i;typeof t=="string"?i=Di(t):(i={...t},de(!i.pathname||!i.pathname.includes("?"),qu("?","pathname","search",i)),de(!i.pathname||!i.pathname.includes("#"),qu("#","pathname","hash",i)),de(!i.search||!i.search.includes("#"),qu("#","search","hash",i)));let s=t===""||i.pathname==="",o=s?"/":i.pathname,l;if(o==null)l=n;else{let m=e.length-1;if(!r&&o.startsWith("..")){let y=o.split("/");for(;y[0]==="..";)y.shift(),m-=1;i.pathname=y.join("/")}l=m>=0?e[m]:"/"}let u=sI(i,l),h=o&&o!=="/"&&o.endsWith("/"),f=(s||o===".")&&n.endsWith("/");return!u.pathname.endsWith("/")&&(h||f)&&(u.pathname+="/"),u}var fn=t=>t.join("/").replace(/\/\/+/g,"/"),lI=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),uI=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,cI=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function hI(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}var xv=["POST","PUT","PATCH","DELETE"];new Set(xv);var dI=["GET",...xv];new Set(dI);var Oi=L.createContext(null);Oi.displayName="DataRouter";var Ul=L.createContext(null);Ul.displayName="DataRouterState";L.createContext(!1);var Dv=L.createContext({isTransitioning:!1});Dv.displayName="ViewTransition";var fI=L.createContext(new Map);fI.displayName="Fetchers";var pI=L.createContext(null);pI.displayName="Await";var jt=L.createContext(null);jt.displayName="Navigation";var co=L.createContext(null);co.displayName="Location";var Qt=L.createContext({outlet:null,matches:[],isDataRoute:!1});Qt.displayName="Route";var gd=L.createContext(null);gd.displayName="RouteError";function mI(t,{relative:e}={}){de(Li(),"useHref() may be used only in the context of a <Router> component.");let{basename:n,navigator:r}=L.useContext(jt),{hash:i,pathname:s,search:o}=ho(t,{relative:e}),l=s;return n!=="/"&&(l=s==="/"?n:fn([n,s])),r.createHref({pathname:l,search:o,hash:i})}function Li(){return L.useContext(co)!=null}function Rn(){return de(Li(),"useLocation() may be used only in the context of a <Router> component."),L.useContext(co).location}var Ov="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Lv(t){L.useContext(jt).static||L.useLayoutEffect(t)}function yd(){let{isDataRoute:t}=L.useContext(Qt);return t?CI():gI()}function gI(){de(Li(),"useNavigate() may be used only in the context of a <Router> component.");let t=L.useContext(Oi),{basename:e,navigator:n}=L.useContext(jt),{matches:r}=L.useContext(Qt),{pathname:i}=Rn(),s=JSON.stringify(pd(r)),o=L.useRef(!1);return Lv(()=>{o.current=!0}),L.useCallback((u,h={})=>{if(Ut(o.current,Ov),!o.current)return;if(typeof u=="number"){n.go(u);return}let f=md(u,JSON.parse(s),i,h.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:fn([e,f.pathname])),(h.replace?n.replace:n.push)(f,h.state,h)},[e,n,s,i,t])}L.createContext(null);function ho(t,{relative:e}={}){let{matches:n}=L.useContext(Qt),{pathname:r}=Rn(),i=JSON.stringify(pd(n));return L.useMemo(()=>md(t,JSON.parse(i),r,e==="path"),[t,i,r,e])}function yI(t,e){return Vv(t,e)}function Vv(t,e,n,r,i){var v;de(Li(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:s}=L.useContext(jt),{matches:o}=L.useContext(Qt),l=o[o.length-1],u=l?l.params:{},h=l?l.pathname:"/",f=l?l.pathnameBase:"/",m=l&&l.route;{let T=m&&m.path||"";Mv(h,!m||T.endsWith("*")||T.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${h}" (under <Route path="${T}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${T}"> to <Route path="${T==="/"?"*":`${T}/*`}">.`)}let y=Rn(),P;if(e){let T=typeof e=="string"?Di(e):e;de(f==="/"||((v=T.pathname)==null?void 0:v.startsWith(f)),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${f}" but pathname "${T.pathname}" was given in the \`location\` prop.`),P=T}else P=y;let R=P.pathname||"/",N=R;if(f!=="/"){let T=f.replace(/^\//,"").split("/");N="/"+R.replace(/^\//,"").split("/").slice(T.length).join("/")}let D=Cv(t,{pathname:N});Ut(m||D!=null,`No routes matched location "${P.pathname}${P.search}${P.hash}" `),Ut(D==null||D[D.length-1].route.element!==void 0||D[D.length-1].route.Component!==void 0||D[D.length-1].route.lazy!==void 0,`Matched leaf route at location "${P.pathname}${P.search}${P.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let w=TI(D&&D.map(T=>Object.assign({},T,{params:Object.assign({},u,T.params),pathname:fn([f,s.encodeLocation?s.encodeLocation(T.pathname).pathname:T.pathname]),pathnameBase:T.pathnameBase==="/"?f:fn([f,s.encodeLocation?s.encodeLocation(T.pathnameBase).pathname:T.pathnameBase])})),o,n,r,i);return e&&w?L.createElement(co.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...P},navigationType:"POP"}},w):w}function vI(){let t=PI(),e=hI(t)?`${t.status} ${t.statusText}`:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r="rgba(200,200,200, 0.5)",i={padding:"0.5rem",backgroundColor:r},s={padding:"2px 4px",backgroundColor:r},o=null;return console.error("Error handled by React Router default ErrorBoundary:",t),o=L.createElement(L.Fragment,null,L.createElement("p",null,"💿 Hey developer 👋"),L.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",L.createElement("code",{style:s},"ErrorBoundary")," or"," ",L.createElement("code",{style:s},"errorElement")," prop on your route.")),L.createElement(L.Fragment,null,L.createElement("h2",null,"Unexpected Application Error!"),L.createElement("h3",{style:{fontStyle:"italic"}},e),n?L.createElement("pre",{style:i},n):null,o)}var _I=L.createElement(vI,null),wI=class extends L.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,e){return e.location!==t.location||e.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:e.error,location:e.location,revalidation:t.revalidation||e.revalidation}}componentDidCatch(t,e){this.props.unstable_onError?this.props.unstable_onError(t,e):console.error("React Router caught the following error during render",t)}render(){return this.state.error!==void 0?L.createElement(Qt.Provider,{value:this.props.routeContext},L.createElement(gd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function EI({routeContext:t,match:e,children:n}){let r=L.useContext(Oi);return r&&r.static&&r.staticContext&&(e.route.errorElement||e.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=e.route.id),L.createElement(Qt.Provider,{value:t},n)}function TI(t,e=[],n=null,r=null,i=null){if(t==null){if(!n)return null;if(n.errors)t=n.matches;else if(e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let s=t,o=n==null?void 0:n.errors;if(o!=null){let h=s.findIndex(f=>f.route.id&&(o==null?void 0:o[f.route.id])!==void 0);de(h>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`),s=s.slice(0,Math.min(s.length,h+1))}let l=!1,u=-1;if(n)for(let h=0;h<s.length;h++){let f=s[h];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(u=h),f.route.id){let{loaderData:m,errors:y}=n,P=f.route.loader&&!m.hasOwnProperty(f.route.id)&&(!y||y[f.route.id]===void 0);if(f.route.lazy||P){l=!0,u>=0?s=s.slice(0,u+1):s=[s[0]];break}}}return s.reduceRight((h,f,m)=>{let y,P=!1,R=null,N=null;n&&(y=o&&f.route.id?o[f.route.id]:void 0,R=f.route.errorElement||_I,l&&(u<0&&m===0?(Mv("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),P=!0,N=null):u===m&&(P=!0,N=f.route.hydrateFallbackElement||null)));let D=e.concat(s.slice(0,m+1)),w=()=>{let v;return y?v=R:P?v=N:f.route.Component?v=L.createElement(f.route.Component,null):f.route.element?v=f.route.element:v=h,L.createElement(EI,{match:f,routeContext:{outlet:h,matches:D,isDataRoute:n!=null},children:v})};return n&&(f.route.ErrorBoundary||f.route.errorElement||m===0)?L.createElement(wI,{location:n.location,revalidation:n.revalidation,component:R,error:y,children:w(),routeContext:{outlet:null,matches:D,isDataRoute:!0},unstable_onError:r}):w()},null)}function vd(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function II(t){let e=L.useContext(Oi);return de(e,vd(t)),e}function SI(t){let e=L.useContext(Ul);return de(e,vd(t)),e}function RI(t){let e=L.useContext(Qt);return de(e,vd(t)),e}function _d(t){let e=RI(t),n=e.matches[e.matches.length-1];return de(n.route.id,`${t} can only be used on routes that contain a unique "id"`),n.route.id}function AI(){return _d("useRouteId")}function PI(){var r;let t=L.useContext(gd),e=SI("useRouteError"),n=_d("useRouteError");return t!==void 0?t:(r=e.errors)==null?void 0:r[n]}function CI(){let{router:t}=II("useNavigate"),e=_d("useNavigate"),n=L.useRef(!1);return Lv(()=>{n.current=!0}),L.useCallback(async(i,s={})=>{Ut(n.current,Ov),n.current&&(typeof i=="number"?t.navigate(i):await t.navigate(i,{fromRouteId:e,...s}))},[t,e])}var hm={};function Mv(t,e,n){!e&&!hm[t]&&(hm[t]=!0,Ut(!1,n))}L.memo(kI);function kI({routes:t,future:e,state:n,unstable_onError:r}){return Vv(t,void 0,n,r,e)}function Fv({to:t,replace:e,state:n,relative:r}){de(Li(),"<Navigate> may be used only in the context of a <Router> component.");let{static:i}=L.useContext(jt);Ut(!i,"<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");let{matches:s}=L.useContext(Qt),{pathname:o}=Rn(),l=yd(),u=md(t,pd(s),o,r==="path"),h=JSON.stringify(u);return L.useEffect(()=>{l(JSON.parse(h),{replace:e,state:n,relative:r})},[l,h,r,e,n]),null}function Ia(t){de(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function NI({basename:t="/",children:e=null,location:n,navigationType:r="POP",navigator:i,static:s=!1}){de(!Li(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let o=t.replace(/^\/*/,"/"),l=L.useMemo(()=>({basename:o,navigator:i,static:s,future:{}}),[o,i,s]);typeof n=="string"&&(n=Di(n));let{pathname:u="/",search:h="",hash:f="",state:m=null,key:y="default"}=n,P=L.useMemo(()=>{let R=En(u,o);return R==null?null:{location:{pathname:R,search:h,hash:f,state:m,key:y},navigationType:r}},[o,u,h,f,m,y,r]);return Ut(P!=null,`<Router basename="${o}"> is not able to match the URL "${u}${h}${f}" because it does not start with the basename, so the <Router> won't render anything.`),P==null?null:L.createElement(jt.Provider,{value:l},L.createElement(co.Provider,{children:e,value:P}))}function xI({children:t,location:e}){return yI(eh(t),e)}function eh(t,e=[]){let n=[];return L.Children.forEach(t,(r,i)=>{if(!L.isValidElement(r))return;let s=[...e,i];if(r.type===L.Fragment){n.push.apply(n,eh(r.props.children,s));return}de(r.type===Ia,`[${typeof r.type=="string"?r.type:r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),de(!r.props.index||!r.props.children,"An index route cannot have child routes.");let o={id:r.props.id||s.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,hydrateFallbackElement:r.props.hydrateFallbackElement,HydrateFallback:r.props.HydrateFallback,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.hasErrorBoundary===!0||r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(o.children=eh(r.props.children,s)),n.push(o)}),n}var Sa="get",Ra="application/x-www-form-urlencoded";function jl(t){return t!=null&&typeof t.tagName=="string"}function DI(t){return jl(t)&&t.tagName.toLowerCase()==="button"}function OI(t){return jl(t)&&t.tagName.toLowerCase()==="form"}function LI(t){return jl(t)&&t.tagName.toLowerCase()==="input"}function VI(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function MI(t,e){return t.button===0&&(!e||e==="_self")&&!VI(t)}var ia=null;function FI(){if(ia===null)try{new FormData(document.createElement("form"),0),ia=!1}catch{ia=!0}return ia}var bI=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Qu(t){return t!=null&&!bI.has(t)?(Ut(!1,`"${t}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ra}"`),null):t}function UI(t,e){let n,r,i,s,o;if(OI(t)){let l=t.getAttribute("action");r=l?En(l,e):null,n=t.getAttribute("method")||Sa,i=Qu(t.getAttribute("enctype"))||Ra,s=new FormData(t)}else if(DI(t)||LI(t)&&(t.type==="submit"||t.type==="image")){let l=t.form;if(l==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let u=t.getAttribute("formaction")||l.getAttribute("action");if(r=u?En(u,e):null,n=t.getAttribute("formmethod")||l.getAttribute("method")||Sa,i=Qu(t.getAttribute("formenctype"))||Qu(l.getAttribute("enctype"))||Ra,s=new FormData(l,t),!FI()){let{name:h,type:f,value:m}=t;if(f==="image"){let y=h?`${h}.`:"";s.append(`${y}x`,"0"),s.append(`${y}y`,"0")}else h&&s.append(h,m)}}else{if(jl(t))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');n=Sa,r=null,i=Ra,o=t}return s&&i==="text/plain"&&(o=s,s=void 0),{action:r,method:n.toLowerCase(),encType:i,formData:s,body:o}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function wd(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function jI(t,e,n){let r=typeof t=="string"?new URL(t,typeof window>"u"?"server://singlefetch/":window.location.origin):t;return r.pathname==="/"?r.pathname=`_root.${n}`:e&&En(r.pathname,e)==="/"?r.pathname=`${e.replace(/\/$/,"")}/_root.${n}`:r.pathname=`${r.pathname.replace(/\/$/,"")}.${n}`,r}async function BI(t,e){if(t.id in e)return e[t.id];try{let n=await import(t.module);return e[t.id]=n,n}catch(n){return console.error(`Error loading route module \`${t.module}\`, reloading page...`),console.error(n),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function $I(t){return t==null?!1:t.href==null?t.rel==="preload"&&typeof t.imageSrcSet=="string"&&typeof t.imageSizes=="string":typeof t.rel=="string"&&typeof t.href=="string"}async function zI(t,e,n){let r=await Promise.all(t.map(async i=>{let s=e.routes[i.route.id];if(s){let o=await BI(s,n);return o.links?o.links():[]}return[]}));return GI(r.flat(1).filter($I).filter(i=>i.rel==="stylesheet"||i.rel==="preload").map(i=>i.rel==="stylesheet"?{...i,rel:"prefetch",as:"style"}:{...i,rel:"prefetch"}))}function dm(t,e,n,r,i,s){let o=(u,h)=>n[h]?u.route.id!==n[h].route.id:!0,l=(u,h)=>{var f;return n[h].pathname!==u.pathname||((f=n[h].route.path)==null?void 0:f.endsWith("*"))&&n[h].params["*"]!==u.params["*"]};return s==="assets"?e.filter((u,h)=>o(u,h)||l(u,h)):s==="data"?e.filter((u,h)=>{var m;let f=r.routes[u.route.id];if(!f||!f.hasLoader)return!1;if(o(u,h)||l(u,h))return!0;if(u.route.shouldRevalidate){let y=u.route.shouldRevalidate({currentUrl:new URL(i.pathname+i.search+i.hash,window.origin),currentParams:((m=n[0])==null?void 0:m.params)||{},nextUrl:new URL(t,window.origin),nextParams:u.params,defaultShouldRevalidate:!0});if(typeof y=="boolean")return y}return!0}):[]}function HI(t,e,{includeHydrateFallback:n}={}){return WI(t.map(r=>{let i=e.routes[r.route.id];if(!i)return[];let s=[i.module];return i.clientActionModule&&(s=s.concat(i.clientActionModule)),i.clientLoaderModule&&(s=s.concat(i.clientLoaderModule)),n&&i.hydrateFallbackModule&&(s=s.concat(i.hydrateFallbackModule)),i.imports&&(s=s.concat(i.imports)),s}).flat(1))}function WI(t){return[...new Set(t)]}function KI(t){let e={},n=Object.keys(t).sort();for(let r of n)e[r]=t[r];return e}function GI(t,e){let n=new Set;return new Set(e),t.reduce((r,i)=>{let s=JSON.stringify(KI(i));return n.has(s)||(n.add(s),r.push({key:s,link:i})),r},[])}function bv(){let t=L.useContext(Oi);return wd(t,"You must render this element inside a <DataRouterContext.Provider> element"),t}function qI(){let t=L.useContext(Ul);return wd(t,"You must render this element inside a <DataRouterStateContext.Provider> element"),t}var Ed=L.createContext(void 0);Ed.displayName="FrameworkContext";function Uv(){let t=L.useContext(Ed);return wd(t,"You must render this element inside a <HydratedRouter> element"),t}function QI(t,e){let n=L.useContext(Ed),[r,i]=L.useState(!1),[s,o]=L.useState(!1),{onFocus:l,onBlur:u,onMouseEnter:h,onMouseLeave:f,onTouchStart:m}=e,y=L.useRef(null);L.useEffect(()=>{if(t==="render"&&o(!0),t==="viewport"){let N=w=>{w.forEach(v=>{o(v.isIntersecting)})},D=new IntersectionObserver(N,{threshold:.5});return y.current&&D.observe(y.current),()=>{D.disconnect()}}},[t]),L.useEffect(()=>{if(r){let N=setTimeout(()=>{o(!0)},100);return()=>{clearTimeout(N)}}},[r]);let P=()=>{i(!0)},R=()=>{i(!1),o(!1)};return n?t!=="intent"?[s,y,{}]:[s,y,{onFocus:as(l,P),onBlur:as(u,R),onMouseEnter:as(h,P),onMouseLeave:as(f,R),onTouchStart:as(m,P)}]:[!1,y,{}]}function as(t,e){return n=>{t&&t(n),n.defaultPrevented||e(n)}}function YI({page:t,...e}){let{router:n}=bv(),r=L.useMemo(()=>Cv(n.routes,t,n.basename),[n.routes,t,n.basename]);return r?L.createElement(JI,{page:t,matches:r,...e}):null}function XI(t){let{manifest:e,routeModules:n}=Uv(),[r,i]=L.useState([]);return L.useEffect(()=>{let s=!1;return zI(t,e,n).then(o=>{s||i(o)}),()=>{s=!0}},[t,e,n]),r}function JI({page:t,matches:e,...n}){let r=Rn(),{manifest:i,routeModules:s}=Uv(),{basename:o}=bv(),{loaderData:l,matches:u}=qI(),h=L.useMemo(()=>dm(t,e,u,i,r,"data"),[t,e,u,i,r]),f=L.useMemo(()=>dm(t,e,u,i,r,"assets"),[t,e,u,i,r]),m=L.useMemo(()=>{if(t===r.pathname+r.search+r.hash)return[];let R=new Set,N=!1;if(e.forEach(w=>{var T;let v=i.routes[w.route.id];!v||!v.hasLoader||(!h.some(O=>O.route.id===w.route.id)&&w.route.id in l&&((T=s[w.route.id])!=null&&T.shouldRevalidate)||v.hasClientLoader?N=!0:R.add(w.route.id))}),R.size===0)return[];let D=jI(t,o,"data");return N&&R.size>0&&D.searchParams.set("_routes",e.filter(w=>R.has(w.route.id)).map(w=>w.route.id).join(",")),[D.pathname+D.search]},[o,l,r,i,h,e,t,s]),y=L.useMemo(()=>HI(f,i),[f,i]),P=XI(f);return L.createElement(L.Fragment,null,m.map(R=>L.createElement("link",{key:R,rel:"prefetch",as:"fetch",href:R,...n})),y.map(R=>L.createElement("link",{key:R,rel:"modulepreload",href:R,...n})),P.map(({key:R,link:N})=>L.createElement("link",{key:R,nonce:n.nonce,...N})))}function ZI(...t){return e=>{t.forEach(n=>{typeof n=="function"?n(e):n!=null&&(n.current=e)})}}var jv=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{jv&&(window.__reactRouterVersion="7.9.1")}catch{}function e1({basename:t,children:e,window:n}){let r=L.useRef();r.current==null&&(r.current=$T({window:n,v5Compat:!0}));let i=r.current,[s,o]=L.useState({action:i.action,location:i.location}),l=L.useCallback(u=>{L.startTransition(()=>o(u))},[o]);return L.useLayoutEffect(()=>i.listen(l),[i,l]),L.createElement(NI,{basename:t,children:e,location:s.location,navigationType:s.action,navigator:i})}var Bv=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,$v=L.forwardRef(function({onClick:e,discover:n="render",prefetch:r="none",relative:i,reloadDocument:s,replace:o,state:l,target:u,to:h,preventScrollReset:f,viewTransition:m,...y},P){let{basename:R}=L.useContext(jt),N=typeof h=="string"&&Bv.test(h),D,w=!1;if(typeof h=="string"&&N&&(D=h,jv))try{let _=new URL(window.location.href),I=h.startsWith("//")?new URL(_.protocol+h):new URL(h),A=En(I.pathname,R);I.origin===_.origin&&A!=null?h=A+I.search+I.hash:w=!0}catch{Ut(!1,`<Link to="${h}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let v=mI(h,{relative:i}),[T,O,b]=QI(r,y),U=i1(h,{replace:o,state:l,target:u,preventScrollReset:f,relative:i,viewTransition:m});function E(_){e&&e(_),_.defaultPrevented||U(_)}let g=L.createElement("a",{...y,...b,href:D||v,onClick:w||s?e:E,ref:ZI(P,O),target:u,"data-discover":!N&&n==="render"?"true":void 0});return T&&!N?L.createElement(L.Fragment,null,g,L.createElement(YI,{page:v})):g});$v.displayName="Link";var t1=L.forwardRef(function({"aria-current":e="page",caseSensitive:n=!1,className:r="",end:i=!1,style:s,to:o,viewTransition:l,children:u,...h},f){let m=ho(o,{relative:h.relative}),y=Rn(),P=L.useContext(Ul),{navigator:R,basename:N}=L.useContext(jt),D=P!=null&&u1(m)&&l===!0,w=R.encodeLocation?R.encodeLocation(m).pathname:m.pathname,v=y.pathname,T=P&&P.navigation&&P.navigation.location?P.navigation.location.pathname:null;n||(v=v.toLowerCase(),T=T?T.toLowerCase():null,w=w.toLowerCase()),T&&N&&(T=En(T,N)||T);const O=w!=="/"&&w.endsWith("/")?w.length-1:w.length;let b=v===w||!i&&v.startsWith(w)&&v.charAt(O)==="/",U=T!=null&&(T===w||!i&&T.startsWith(w)&&T.charAt(w.length)==="/"),E={isActive:b,isPending:U,isTransitioning:D},g=b?e:void 0,_;typeof r=="function"?_=r(E):_=[r,b?"active":null,U?"pending":null,D?"transitioning":null].filter(Boolean).join(" ");let I=typeof s=="function"?s(E):s;return L.createElement($v,{...h,"aria-current":g,className:_,ref:f,style:I,to:o,viewTransition:l},typeof u=="function"?u(E):u)});t1.displayName="NavLink";var n1=L.forwardRef(({discover:t="render",fetcherKey:e,navigate:n,reloadDocument:r,replace:i,state:s,method:o=Sa,action:l,onSubmit:u,relative:h,preventScrollReset:f,viewTransition:m,...y},P)=>{let R=a1(),N=l1(l,{relative:h}),D=o.toLowerCase()==="get"?"get":"post",w=typeof l=="string"&&Bv.test(l),v=T=>{if(u&&u(T),T.defaultPrevented)return;T.preventDefault();let O=T.nativeEvent.submitter,b=(O==null?void 0:O.getAttribute("formmethod"))||o;R(O||T.currentTarget,{fetcherKey:e,method:b,navigate:n,replace:i,state:s,relative:h,preventScrollReset:f,viewTransition:m})};return L.createElement("form",{ref:P,method:D,action:N,onSubmit:r?u:v,...y,"data-discover":!w&&t==="render"?"true":void 0})});n1.displayName="Form";function r1(t){return`${t} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function zv(t){let e=L.useContext(Oi);return de(e,r1(t)),e}function i1(t,{target:e,replace:n,state:r,preventScrollReset:i,relative:s,viewTransition:o}={}){let l=yd(),u=Rn(),h=ho(t,{relative:s});return L.useCallback(f=>{if(MI(f,e)){f.preventDefault();let m=n!==void 0?n:qs(u)===qs(h);l(t,{replace:m,state:r,preventScrollReset:i,relative:s,viewTransition:o})}},[u,l,h,n,r,e,t,i,s,o])}var s1=0,o1=()=>`__${String(++s1)}__`;function a1(){let{router:t}=zv("useSubmit"),{basename:e}=L.useContext(jt),n=AI();return L.useCallback(async(r,i={})=>{let{action:s,method:o,encType:l,formData:u,body:h}=UI(r,e);if(i.navigate===!1){let f=i.fetcherKey||o1();await t.fetch(f,n,i.action||s,{preventScrollReset:i.preventScrollReset,formData:u,body:h,formMethod:i.method||o,formEncType:i.encType||l,flushSync:i.flushSync})}else await t.navigate(i.action||s,{preventScrollReset:i.preventScrollReset,formData:u,body:h,formMethod:i.method||o,formEncType:i.encType||l,replace:i.replace,state:i.state,fromRouteId:n,flushSync:i.flushSync,viewTransition:i.viewTransition})},[t,e,n])}function l1(t,{relative:e}={}){let{basename:n}=L.useContext(jt),r=L.useContext(Qt);de(r,"useFormAction must be used inside a RouteContext");let[i]=r.matches.slice(-1),s={...ho(t||".",{relative:e})},o=Rn();if(t==null){s.search=o.search;let l=new URLSearchParams(s.search),u=l.getAll("index");if(u.some(f=>f==="")){l.delete("index"),u.filter(m=>m).forEach(m=>l.append("index",m));let f=l.toString();s.search=f?`?${f}`:""}}return(!t||t===".")&&i.route.index&&(s.search=s.search?s.search.replace(/^\?/,"?index&"):"?index"),n!=="/"&&(s.pathname=s.pathname==="/"?n:fn([n,s.pathname])),qs(s)}function u1(t,{relative:e}={}){let n=L.useContext(Dv);de(n!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:r}=zv("useViewTransitionState"),i=ho(t,{relative:e});if(!n.isTransitioning)return!1;let s=En(n.currentLocation.pathname,r)||n.currentLocation.pathname,o=En(n.nextLocation.pathname,r)||n.nextLocation.pathname;return il(i.pathname,o)!=null||il(i.pathname,s)!=null}var fm={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hv=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},c1=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Wv={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,h=u?t[i+2]:0,f=s>>2,m=(s&3)<<4|l>>4;let y=(l&15)<<2|h>>6,P=h&63;u||(P=64,o||(y=64)),r.push(n[f],n[m],n[y],n[P])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Hv(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):c1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const h=i<t.length?n[t.charAt(i)]:64;++i;const m=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||h==null||m==null)throw new h1;const y=s<<2|l>>4;if(r.push(y),h!==64){const P=l<<4&240|h>>2;if(r.push(P),m!==64){const R=h<<6&192|m;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class h1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const d1=function(t){const e=Hv(t);return Wv.encodeByteArray(e,!0)},sl=function(t){return d1(t).replace(/\./g,"")},Kv=function(t){try{return Wv.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const p1=()=>f1().__FIREBASE_DEFAULTS__,m1=()=>{if(typeof process>"u"||typeof fm>"u")return;const t=fm.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},g1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Kv(t[1]);return e&&JSON.parse(e)},Bl=()=>{try{return p1()||m1()||g1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Gv=t=>{var e,n;return(n=(e=Bl())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},y1=t=>{const e=Gv(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},qv=()=>{var t;return(t=Bl())===null||t===void 0?void 0:t.config},Qv=t=>{var e;return(e=Bl())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v1{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[sl(JSON.stringify(n)),sl(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function w1(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Xe())}function E1(){var t;const e=(t=Bl())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function T1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function I1(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function S1(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function R1(){const t=Xe();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function A1(){return!E1()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function P1(){try{return typeof indexedDB=="object"}catch{return!1}}function C1(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k1="FirebaseError";class An extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=k1,Object.setPrototypeOf(this,An.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,fo.prototype.create)}}class fo{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?N1(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new An(i,l,r)}}function N1(t,e){return t.replace(x1,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const x1=/\{\$([^}]+)}/g;function D1(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ol(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(pm(s)&&pm(o)){if(!ol(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function pm(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function po(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function ps(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function ms(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function O1(t,e){const n=new L1(t,e);return n.subscribe.bind(n)}class L1{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");V1(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=Yu),i.error===void 0&&(i.error=Yu),i.complete===void 0&&(i.complete=Yu);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function V1(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Yu(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(t){return t&&t._delegate?t._delegate:t}class xr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M1{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new v1;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(b1(e))try{this.getOrInitializeService({instanceIdentifier:gr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=gr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=gr){return this.instances.has(e)}getOptions(e=gr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){var r;const i=this.normalizeInstanceIdentifier(n),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:F1(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=gr){return this.component?this.component.multipleInstances?e:gr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function F1(t){return t===gr?void 0:t}function b1(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new M1(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(Y||(Y={}));const j1={debug:Y.DEBUG,verbose:Y.VERBOSE,info:Y.INFO,warn:Y.WARN,error:Y.ERROR,silent:Y.SILENT},B1=Y.INFO,$1={[Y.DEBUG]:"log",[Y.VERBOSE]:"log",[Y.INFO]:"info",[Y.WARN]:"warn",[Y.ERROR]:"error"},z1=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=$1[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Td{constructor(e){this.name=e,this._logLevel=B1,this._logHandler=z1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Y))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?j1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Y.DEBUG,...e),this._logHandler(this,Y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Y.VERBOSE,...e),this._logHandler(this,Y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Y.INFO,...e),this._logHandler(this,Y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Y.WARN,...e),this._logHandler(this,Y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Y.ERROR,...e),this._logHandler(this,Y.ERROR,...e)}}const H1=(t,e)=>e.some(n=>t instanceof n);let mm,gm;function W1(){return mm||(mm=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function K1(){return gm||(gm=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yv=new WeakMap,th=new WeakMap,Xv=new WeakMap,Xu=new WeakMap,Id=new WeakMap;function G1(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(Yn(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Yv.set(n,t)}).catch(()=>{}),Id.set(e,t),e}function q1(t){if(th.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});th.set(t,e)}let nh={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return th.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Xv.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Yn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Q1(t){nh=t(nh)}function Y1(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(Ju(this),e,...n);return Xv.set(r,e.sort?e.sort():[e]),Yn(r)}:K1().includes(t)?function(...e){return t.apply(Ju(this),e),Yn(Yv.get(this))}:function(...e){return Yn(t.apply(Ju(this),e))}}function X1(t){return typeof t=="function"?Y1(t):(t instanceof IDBTransaction&&q1(t),H1(t,W1())?new Proxy(t,nh):t)}function Yn(t){if(t instanceof IDBRequest)return G1(t);if(Xu.has(t))return Xu.get(t);const e=X1(t);return e!==t&&(Xu.set(t,e),Id.set(e,t)),e}const Ju=t=>Id.get(t);function J1(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=Yn(o);return r&&o.addEventListener("upgradeneeded",u=>{r(Yn(o.result),u.oldVersion,u.newVersion,Yn(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const Z1=["get","getKey","getAll","getAllKeys","count"],eS=["put","add","delete","clear"],Zu=new Map;function ym(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Zu.get(e))return Zu.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=eS.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Z1.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),i&&u.done]))[0]};return Zu.set(e,s),s}Q1(t=>({...t,get:(e,n,r)=>ym(e,n)||t.get(e,n,r),has:(e,n)=>!!ym(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(nS(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function nS(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rh="@firebase/app",vm="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=new Td("@firebase/app"),rS="@firebase/app-compat",iS="@firebase/analytics-compat",sS="@firebase/analytics",oS="@firebase/app-check-compat",aS="@firebase/app-check",lS="@firebase/auth",uS="@firebase/auth-compat",cS="@firebase/database",hS="@firebase/data-connect",dS="@firebase/database-compat",fS="@firebase/functions",pS="@firebase/functions-compat",mS="@firebase/installations",gS="@firebase/installations-compat",yS="@firebase/messaging",vS="@firebase/messaging-compat",_S="@firebase/performance",wS="@firebase/performance-compat",ES="@firebase/remote-config",TS="@firebase/remote-config-compat",IS="@firebase/storage",SS="@firebase/storage-compat",RS="@firebase/firestore",AS="@firebase/vertexai-preview",PS="@firebase/firestore-compat",CS="firebase",kS="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ih="[DEFAULT]",NS={[rh]:"fire-core",[rS]:"fire-core-compat",[sS]:"fire-analytics",[iS]:"fire-analytics-compat",[aS]:"fire-app-check",[oS]:"fire-app-check-compat",[lS]:"fire-auth",[uS]:"fire-auth-compat",[cS]:"fire-rtdb",[hS]:"fire-data-connect",[dS]:"fire-rtdb-compat",[fS]:"fire-fn",[pS]:"fire-fn-compat",[mS]:"fire-iid",[gS]:"fire-iid-compat",[yS]:"fire-fcm",[vS]:"fire-fcm-compat",[_S]:"fire-perf",[wS]:"fire-perf-compat",[ES]:"fire-rc",[TS]:"fire-rc-compat",[IS]:"fire-gcs",[SS]:"fire-gcs-compat",[RS]:"fire-fst",[PS]:"fire-fst-compat",[AS]:"fire-vertex","fire-js":"fire-js",[CS]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs=new Map,xS=new Map,sh=new Map;function _m(t,e){try{t.container.addComponent(e)}catch(n){Tn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ti(t){const e=t.name;if(sh.has(e))return Tn.debug(`There were multiple attempts to register component ${e}.`),!1;sh.set(e,t);for(const n of Qs.values())_m(n,t);for(const n of xS.values())_m(n,t);return!0}function Sd(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ot(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Xn=new fo("app","Firebase",DS);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new xr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Xn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vi=kS;function Jv(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:ih,automaticDataCollectionEnabled:!1},e),i=r.name;if(typeof i!="string"||!i)throw Xn.create("bad-app-name",{appName:String(i)});if(n||(n=qv()),!n)throw Xn.create("no-options");const s=Qs.get(i);if(s){if(ol(n,s.options)&&ol(r,s.config))return s;throw Xn.create("duplicate-app",{appName:i})}const o=new U1(i);for(const u of sh.values())o.addComponent(u);const l=new OS(n,r,o);return Qs.set(i,l),l}function Zv(t=ih){const e=Qs.get(t);if(!e&&t===ih&&qv())return Jv();if(!e)throw Xn.create("no-app",{appName:t});return e}function wm(){return Array.from(Qs.values())}function Jn(t,e,n){var r;let i=(r=NS[t])!==null&&r!==void 0?r:t;n&&(i+=`-${n}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Tn.warn(l.join(" "));return}Ti(new xr(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LS="firebase-heartbeat-database",VS=1,Ys="firebase-heartbeat-store";let ec=null;function e_(){return ec||(ec=J1(LS,VS,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ys)}catch(n){console.warn(n)}}}}).catch(t=>{throw Xn.create("idb-open",{originalErrorMessage:t.message})})),ec}async function MS(t){try{const n=(await e_()).transaction(Ys),r=await n.objectStore(Ys).get(t_(t));return await n.done,r}catch(e){if(e instanceof An)Tn.warn(e.message);else{const n=Xn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Tn.warn(n.message)}}}async function Em(t,e){try{const r=(await e_()).transaction(Ys,"readwrite");await r.objectStore(Ys).put(e,t_(t)),await r.done}catch(n){if(n instanceof An)Tn.warn(n.message);else{const r=Xn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Tn.warn(r.message)}}}function t_(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FS=1024,bS=30*24*60*60*1e3;class US{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new BS(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Tm();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=bS}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Tn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Tm(),{heartbeatsToSend:r,unsentEntries:i}=jS(this._heartbeatsCache.heartbeats),s=sl(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Tn.warn(n),""}}}function Tm(){return new Date().toISOString().substring(0,10)}function jS(t,e=FS){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Im(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Im(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class BS{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return P1()?C1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await MS(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Em(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const i=await this.read();return Em(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Im(t){return sl(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $S(t){Ti(new xr("platform-logger",e=>new tS(e),"PRIVATE")),Ti(new xr("heartbeat",e=>new US(e),"PRIVATE")),Jn(rh,vm,t),Jn(rh,vm,"esm2017"),Jn("fire-js","")}$S("");function Rd(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(t);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(t,r[i])&&(n[r[i]]=t[r[i]]);return n}function n_(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const zS=n_,r_=new fo("auth","Firebase",n_());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const al=new Td("@firebase/auth");function HS(t,...e){al.logLevel<=Y.WARN&&al.warn(`Auth (${Vi}): ${t}`,...e)}function Aa(t,...e){al.logLevel<=Y.ERROR&&al.error(`Auth (${Vi}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(t,...e){throw Pd(t,...e)}function Ft(t,...e){return Pd(t,...e)}function Ad(t,e,n){const r=Object.assign(Object.assign({},zS()),{[e]:n});return new fo("auth","Firebase",r).create(e,{appName:t.name})}function pn(t){return Ad(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function WS(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&Rt(t,"argument-error"),Ad(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Pd(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return r_.create(t,...e)}function H(t,e,...n){if(!t)throw Pd(e,...n)}function un(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Aa(e),new Error(e)}function In(t,e){t||un(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function KS(){return Sm()==="http:"||Sm()==="https:"}function Sm(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function GS(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(KS()||I1()||"connection"in navigator)?navigator.onLine:!0}function qS(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e,n){this.shortDelay=e,this.longDelay=n,In(n>e,"Short delay should be less than long delay!"),this.isMobile=w1()||S1()}get(){return GS()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(t,e){In(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;un("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;un("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;un("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QS={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const YS=new mo(3e4,6e4);function ar(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Pn(t,e,n,r,i={}){return s_(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=po(Object.assign({key:t.config.apiKey},o)).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:u},s);return T1()||(h.referrerPolicy="no-referrer"),i_.fetch()(o_(t,t.config.apiHost,n,l),h)})}async function s_(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},QS),e);try{const i=new JS(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw sa(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,h]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw sa(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw sa(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw sa(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Ad(t,f,h);Rt(t,f)}}catch(i){if(i instanceof An)throw i;Rt(t,"network-request-failed",{message:String(i)})}}async function go(t,e,n,r,i={}){const s=await Pn(t,e,n,r,i);return"mfaPendingCredential"in s&&Rt(t,"multi-factor-auth-required",{_serverResponse:s}),s}function o_(t,e,n,r){const i=`${e}${n}?${r}`;return t.config.emulator?Cd(t.config,i):`${t.config.apiScheme}://${i}`}function XS(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class JS{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Ft(this.auth,"network-request-failed")),YS.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function sa(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=Ft(t,e,r);return i.customData._tokenResponse=n,i}function Rm(t){return t!==void 0&&t.enterprise!==void 0}class ZS{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return XS(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}}async function eR(t,e){return Pn(t,"GET","/v2/recaptchaConfig",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tR(t,e){return Pn(t,"POST","/v1/accounts:delete",e)}async function a_(t,e){return Pn(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function nR(t,e=!1){const n=mt(t),r=await n.getIdToken(e),i=kd(r);H(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:As(tc(i.auth_time)),issuedAtTime:As(tc(i.iat)),expirationTime:As(tc(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function tc(t){return Number(t)*1e3}function kd(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Aa("JWT malformed, contained fewer than 3 sections"),null;try{const i=Kv(n);return i?JSON.parse(i):(Aa("Failed to decode base64 JWT payload"),null)}catch(i){return Aa("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Am(t){const e=kd(t);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof An&&rR(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function rR({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iR{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=As(this.lastLoginAt),this.creationTime=As(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ll(t){var e;const n=t.auth,r=await t.getIdToken(),i=await Ii(t,a_(n,{idToken:r}));H(i==null?void 0:i.users.length,n,"internal-error");const s=i.users[0];t._notifyReloadListener(s);const o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?l_(s.providerUserInfo):[],l=oR(t.providerData,o),u=t.isAnonymous,h=!(t.email&&s.passwordHash)&&!(l!=null&&l.length),f=u?h:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new ah(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function sR(t){const e=mt(t);await ll(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function oR(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function l_(t){return t.map(e=>{var{providerId:n}=e,r=Rd(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aR(t,e){const n=await s_(t,{},async()=>{const r=po({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=o_(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",i_.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function lR(t,e){return Pn(t,"POST","/v2/accounts:revokeToken",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Am(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){H(e.length!==0,"internal-error");const n=Am(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await aR(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new hi;return r&&(H(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(H(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(H(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new hi,this.toJSON())}_performRefresh(){return un("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dn(t,e){H(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class cn{constructor(e){var{uid:n,auth:r,stsTokenManager:i}=e,s=Rd(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new iR(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new ah(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const n=await Ii(this,this.stsTokenManager.getToken(this.auth,e));return H(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return nR(this,e)}reload(){return sR(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new cn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await ll(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ot(this.auth.app))return Promise.reject(pn(this.auth));const e=await this.getIdToken();return await Ii(this,tR(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,i,s,o,l,u,h,f;const m=(r=n.displayName)!==null&&r!==void 0?r:void 0,y=(i=n.email)!==null&&i!==void 0?i:void 0,P=(s=n.phoneNumber)!==null&&s!==void 0?s:void 0,R=(o=n.photoURL)!==null&&o!==void 0?o:void 0,N=(l=n.tenantId)!==null&&l!==void 0?l:void 0,D=(u=n._redirectEventId)!==null&&u!==void 0?u:void 0,w=(h=n.createdAt)!==null&&h!==void 0?h:void 0,v=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:T,emailVerified:O,isAnonymous:b,providerData:U,stsTokenManager:E}=n;H(T&&E,e,"internal-error");const g=hi.fromJSON(this.name,E);H(typeof T=="string",e,"internal-error"),Dn(m,e.name),Dn(y,e.name),H(typeof O=="boolean",e,"internal-error"),H(typeof b=="boolean",e,"internal-error"),Dn(P,e.name),Dn(R,e.name),Dn(N,e.name),Dn(D,e.name),Dn(w,e.name),Dn(v,e.name);const _=new cn({uid:T,auth:e,email:y,emailVerified:O,displayName:m,isAnonymous:b,photoURL:R,phoneNumber:P,tenantId:N,stsTokenManager:g,createdAt:w,lastLoginAt:v});return U&&Array.isArray(U)&&(_.providerData=U.map(I=>Object.assign({},I))),D&&(_._redirectEventId=D),_}static async _fromIdTokenResponse(e,n,r=!1){const i=new hi;i.updateFromServerResponse(n);const s=new cn({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ll(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];H(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?l_(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new hi;l.updateFromIdToken(r);const u=new cn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ah(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pm=new Map;function hn(t){In(t instanceof Function,"Expected a class definition");let e=Pm.get(t);return e?(In(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Pm.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class u_{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}u_.type="NONE";const Cm=u_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(t,e,n){return`firebase:${t}:${e}:${n}`}class di{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Pa(this.userKey,i.apiKey,s),this.fullPersistenceKey=Pa("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?cn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new di(hn(Cm),e,r);const i=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||hn(Cm);const o=Pa(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const f=await h._get(o);if(f){const m=cn._fromJSON(e,f);h!==s&&(l=m),s=h;break}}catch{}const u=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new di(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==s)try{await h._remove(o)}catch{}})),new di(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function km(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(f_(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(c_(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(m_(e))return"Blackberry";if(g_(e))return"Webos";if(h_(e))return"Safari";if((e.includes("chrome/")||d_(e))&&!e.includes("edge/"))return"Chrome";if(p_(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function c_(t=Xe()){return/firefox\//i.test(t)}function h_(t=Xe()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function d_(t=Xe()){return/crios\//i.test(t)}function f_(t=Xe()){return/iemobile/i.test(t)}function p_(t=Xe()){return/android/i.test(t)}function m_(t=Xe()){return/blackberry/i.test(t)}function g_(t=Xe()){return/webos/i.test(t)}function Nd(t=Xe()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function uR(t=Xe()){var e;return Nd(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function cR(){return R1()&&document.documentMode===10}function y_(t=Xe()){return Nd(t)||p_(t)||g_(t)||m_(t)||/windows phone/i.test(t)||f_(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v_(t,e=[]){let n;switch(t){case"Browser":n=km(Xe());break;case"Worker":n=`${km(Xe())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Vi}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hR{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dR(t,e={}){return Pn(t,"GET","/v2/passwordPolicy",ar(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fR=6;class pR{constructor(e){var n,r,i,s;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:fR,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,i,s,o,l;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(n=u.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(l=u.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),u}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mR{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Nm(this),this.idTokenSubscription=new Nm(this),this.beforeStateQueue=new hR(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=r_,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=hn(n)),this._initializationPromise=this.queue(async()=>{var r,i;if(!this._deleted&&(this.persistenceManager=await di.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await a_(this,{idToken:e}),r=await cn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ot(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ll(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=qS()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ot(this.app))return Promise.reject(pn(this));const n=e?mt(e):null;return n&&H(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ot(this.app)?Promise.reject(pn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ot(this.app)?Promise.reject(pn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(hn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await dR(this),n=new pR(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new fo("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await lR(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&hn(e)||this._popupRedirectResolver;H(n,this,"argument-error"),this.redirectPersistenceManager=await di.create(this,[hn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=v_(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(n["X-Firebase-AppCheck"]=i),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&HS(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function lr(t){return mt(t)}class Nm{constructor(e){this.auth=e,this.observer=null,this.addObserver=O1(n=>this.observer=n)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $l={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gR(t){$l=t}function __(t){return $l.loadJS(t)}function yR(){return $l.recaptchaEnterpriseScript}function vR(){return $l.gapiScript}function _R(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const wR="recaptcha-enterprise",ER="NO_RECAPTCHA";class TR{constructor(e){this.type=wR,this.auth=lr(e)}async verify(e="verify",n=!1){async function r(s){if(!n){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{eR(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new ZS(u);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,o(h.siteKey)}}).catch(u=>{l(u)})})}function i(s,o,l){const u=window.grecaptcha;Rm(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(h=>{o(h)}).catch(()=>{o(ER)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{r(this.auth).then(l=>{if(!n&&Rm(window.grecaptcha))i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=yR();u.length!==0&&(u+=l),__(u).then(()=>{i(l,s,o)}).catch(h=>{o(h)})}}).catch(l=>{o(l)})})}}async function xm(t,e,n,r=!1){const i=new TR(t);let s;try{s=await i.verify(n)}catch{s=await i.verify(n,!0)}const o=Object.assign({},e);return r?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function lh(t,e,n,r){var i;if(!((i=t._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const s=await xm(t,e,n,n==="getOobCode");return r(t,s)}else return r(t,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await xm(t,e,n,n==="getOobCode");return r(t,o)}else return Promise.reject(s)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function IR(t,e){const n=Sd(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(ol(s,e??{}))return i;Rt(i,"already-initialized")}return n.initialize({options:e})}function SR(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(hn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function RR(t,e,n){const r=lr(t);H(r._canInitEmulator,r,"emulator-config-failed"),H(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=w_(e),{host:o,port:l}=AR(e),u=l===null?"":`:${l}`;r.config.emulator={url:`${s}//${o}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),PR()}function w_(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function AR(t){const e=w_(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Dm(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Dm(o)}}}function Dm(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function PR(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return un("not implemented")}_getIdTokenResponse(e){return un("not implemented")}_linkToIdToken(e,n){return un("not implemented")}_getReauthenticationResolver(e){return un("not implemented")}}async function CR(t,e){return Pn(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kR(t,e){return go(t,"POST","/v1/accounts:signInWithPassword",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function NR(t,e){return go(t,"POST","/v1/accounts:signInWithEmailLink",ar(t,e))}async function xR(t,e){return go(t,"POST","/v1/accounts:signInWithEmailLink",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xs extends xd{constructor(e,n,r,i=null){super("password",r),this._email=e,this._password=n,this._tenantId=i}static _fromEmailAndPassword(e,n){return new Xs(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Xs(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lh(e,n,"signInWithPassword",kR);case"emailLink":return NR(e,{email:this._email,oobCode:this._password});default:Rt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return lh(e,r,"signUpPassword",CR);case"emailLink":return xR(e,{idToken:n,email:this._email,oobCode:this._password});default:Rt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fi(t,e){return go(t,"POST","/v1/accounts:signInWithIdp",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DR="http://localhost";class Dr extends xd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Dr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Rt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=n,s=Rd(n,["providerId","signInMethod"]);if(!r||!i)return null;const o=new Dr(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return fi(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,fi(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,fi(e,n)}buildRequest(){const e={requestUri:DR,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=po(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OR(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function LR(t){const e=ps(ms(t)).link,n=e?ps(ms(e)).deep_link_id:null,r=ps(ms(t)).deep_link_id;return(r?ps(ms(r)).link:null)||r||n||e||t}class Dd{constructor(e){var n,r,i,s,o,l;const u=ps(ms(e)),h=(n=u.apiKey)!==null&&n!==void 0?n:null,f=(r=u.oobCode)!==null&&r!==void 0?r:null,m=OR((i=u.mode)!==null&&i!==void 0?i:null);H(h&&f&&m,"argument-error"),this.apiKey=h,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(l=u.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const n=LR(e);try{return new Dd(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(){this.providerId=Mi.PROVIDER_ID}static credential(e,n){return Xs._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=Dd.parseLink(n);return H(r,"argument-error"),Xs._fromEmailAndCode(e,r.code,r.tenantId)}}Mi.PROVIDER_ID="password";Mi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo extends Od{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends yo{constructor(){super("facebook.com")}static credential(e){return Dr._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Fn.credentialFromTaggedObject(e)}static credentialFromError(e){return Fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Fn.credential(e.oauthAccessToken)}catch{return null}}}Fn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Fn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on extends yo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Dr._fromParams({providerId:on.PROVIDER_ID,signInMethod:on.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return on.credentialFromTaggedObject(e)}static credentialFromError(e){return on.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return on.credential(n,r)}catch{return null}}}on.GOOGLE_SIGN_IN_METHOD="google.com";on.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn extends yo{constructor(){super("github.com")}static credential(e){return Dr._fromParams({providerId:bn.PROVIDER_ID,signInMethod:bn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return bn.credentialFromTaggedObject(e)}static credentialFromError(e){return bn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return bn.credential(e.oauthAccessToken)}catch{return null}}}bn.GITHUB_SIGN_IN_METHOD="github.com";bn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends yo{constructor(){super("twitter.com")}static credential(e,n){return Dr._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Un.credential(n,r)}catch{return null}}}Un.TWITTER_SIGN_IN_METHOD="twitter.com";Un.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VR(t,e){return go(t,"POST","/v1/accounts:signUp",ar(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await cn._fromIdTokenResponse(e,r,i),o=Om(r);return new Or({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=Om(r);return new Or({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function Om(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ul extends An{constructor(e,n,r,i){var s;super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ul.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new ul(e,n,r,i)}}function E_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ul._fromErrorAndOperation(t,s,e,r):s})}async function MR(t,e,n=!1){const r=await Ii(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Or._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FR(t,e,n=!1){const{auth:r}=t;if(Ot(r.app))return Promise.reject(pn(r));const i="reauthenticate";try{const s=await Ii(t,E_(r,i,e,t),n);H(s.idToken,r,"internal-error");const o=kd(s.idToken);H(o,r,"internal-error");const{sub:l}=o;return H(t.uid===l,r,"user-mismatch"),Or._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Rt(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function T_(t,e,n=!1){if(Ot(t.app))return Promise.reject(pn(t));const r="signIn",i=await E_(t,r,e),s=await Or._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}async function bR(t,e){return T_(lr(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function I_(t){const e=lr(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function UR(t,e,n){if(Ot(t.app))return Promise.reject(pn(t));const r=lr(t),o=await lh(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",VR).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&I_(t),u}),l=await Or._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(l.user),l}function jR(t,e,n){return Ot(t.app)?Promise.reject(pn(t)):bR(mt(t),Mi.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&I_(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function BR(t,e){return Pn(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $R(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=mt(t),s={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await Ii(r,BR(r.auth,s));r.displayName=o.displayName||null,r.photoURL=o.photoUrl||null;const l=r.providerData.find(({providerId:u})=>u==="password");l&&(l.displayName=r.displayName,l.photoURL=r.photoURL),await r._updateTokensIfNecessary(o)}function zR(t,e,n,r){return mt(t).onIdTokenChanged(e,n,r)}function HR(t,e,n){return mt(t).beforeAuthStateChanged(e,n)}function WR(t,e,n,r){return mt(t).onAuthStateChanged(e,n,r)}const cl="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(cl,"1"),this.storage.removeItem(cl),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KR=1e3,GR=10;class R_ extends S_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=y_(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);cR()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,GR):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},KR)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}R_.type="LOCAL";const qR=R_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_ extends S_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}A_.type="SESSION";const P_=A_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QR(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new zl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async h=>h(n.origin,s)),u=await QR(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}zl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ld(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YR{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const h=Ld("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(m){const y=m;if(y.data.eventId===h)switch(y.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(y.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kt(){return window}function XR(t){Kt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C_(){return typeof Kt().WorkerGlobalScope<"u"&&typeof Kt().importScripts=="function"}async function JR(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ZR(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function eA(){return C_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_="firebaseLocalStorageDb",tA=1,hl="firebaseLocalStorage",N_="fbase_key";class vo{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Hl(t,e){return t.transaction([hl],e?"readwrite":"readonly").objectStore(hl)}function nA(){const t=indexedDB.deleteDatabase(k_);return new vo(t).toPromise()}function uh(){const t=indexedDB.open(k_,tA);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(hl,{keyPath:N_})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(hl)?e(r):(r.close(),await nA(),e(await uh()))})})}async function Lm(t,e,n){const r=Hl(t,!0).put({[N_]:e,value:n});return new vo(r).toPromise()}async function rA(t,e){const n=Hl(t,!1).get(e),r=await new vo(n).toPromise();return r===void 0?null:r.value}function Vm(t,e){const n=Hl(t,!0).delete(e);return new vo(n).toPromise()}const iA=800,sA=3;class x_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await uh(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>sA)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return C_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=zl._getInstance(eA()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await JR(),!this.activeServiceWorker)return;this.sender=new YR(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ZR()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await uh();return await Lm(e,cl,"1"),await Vm(e,cl),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Lm(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>rA(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Vm(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Hl(i,!1).getAll();return new vo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}x_.type="LOCAL";const oA=x_;new mo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(t,e){return e?hn(e):(H(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd extends xd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return fi(e,this._buildIdpRequest())}_linkToIdToken(e,n){return fi(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return fi(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function aA(t){return T_(t.auth,new Vd(t),t.bypassAuthState)}function lA(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),FR(n,new Vd(t),t.bypassAuthState)}async function uA(t){const{auth:e,user:n}=t;return H(n,e,"internal-error"),MR(n,new Vd(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O_{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return aA;case"linkViaPopup":case"linkViaRedirect":return uA;case"reauthViaPopup":case"reauthViaRedirect":return lA;default:Rt(this.auth,"internal-error")}}resolve(e){In(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){In(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cA=new mo(2e3,1e4);async function hA(t,e,n){if(Ot(t.app))return Promise.reject(Ft(t,"operation-not-supported-in-this-environment"));const r=lr(t);WS(t,e,Od);const i=D_(r,n);return new wr(r,"signInViaPopup",e,i).executeNotNull()}class wr extends O_{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,wr.currentPopupAction&&wr.currentPopupAction.cancel(),wr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){In(this.filter.length===1,"Popup operations only handle one event");const e=Ld();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Ft(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Ft(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ft(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,cA.get())};e()}}wr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dA="pendingRedirect",Ca=new Map;class fA extends O_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Ca.get(this.auth._key());if(!e){try{const r=await pA(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Ca.set(this.auth._key(),e)}return this.bypassAuthState||Ca.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pA(t,e){const n=yA(e),r=gA(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function mA(t,e){Ca.set(t._key(),e)}function gA(t){return hn(t._redirectPersistence)}function yA(t){return Pa(dA,t.config.apiKey,t.name)}async function vA(t,e,n=!1){if(Ot(t.app))return Promise.reject(pn(t));const r=lr(t),i=D_(r,e),o=await new fA(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _A=10*60*1e3;class wA{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EA(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!L_(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Ft(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_A&&this.cachedEventUids.clear(),this.cachedEventUids.has(Mm(e))}saveEventToCache(e){this.cachedEventUids.add(Mm(e)),this.lastProcessedEventTime=Date.now()}}function Mm(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function L_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function EA(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return L_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TA(t,e={}){return Pn(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IA=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,SA=/^https?/;async function RA(t){if(t.config.emulator)return;const{authorizedDomains:e}=await TA(t);for(const n of e)try{if(AA(n))return}catch{}Rt(t,"unauthorized-domain")}function AA(t){const e=oh(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!SA.test(n))return!1;if(IA.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PA=new mo(3e4,6e4);function Fm(){const t=Kt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function CA(t){return new Promise((e,n)=>{var r,i,s;function o(){Fm(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Fm(),n(Ft(t,"network-request-failed"))},timeout:PA.get()})}if(!((i=(r=Kt().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Kt().gapi)===null||s===void 0)&&s.load)o();else{const l=_R("iframefcb");return Kt()[l]=()=>{gapi.load?o():n(Ft(t,"network-request-failed"))},__(`${vR()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw ka=null,e})}let ka=null;function kA(t){return ka=ka||CA(t),ka}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NA=new mo(5e3,15e3),xA="__/auth/iframe",DA="emulator/auth/iframe",OA={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},LA=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function VA(t){const e=t.config;H(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Cd(e,DA):`https://${t.config.authDomain}/${xA}`,r={apiKey:e.apiKey,appName:t.name,v:Vi},i=LA.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${po(r).slice(1)}`}async function MA(t){const e=await kA(t),n=Kt().gapi;return H(n,t,"internal-error"),e.open({where:document.body,url:VA(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:OA,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=Ft(t,"network-request-failed"),l=Kt().setTimeout(()=>{s(o)},NA.get());function u(){Kt().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const FA={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},bA=500,UA=600,jA="_blank",BA="http://localhost";class bm{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function $A(t,e,n,r=bA,i=UA){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u=Object.assign(Object.assign({},FA),{width:r.toString(),height:i.toString(),top:s,left:o}),h=Xe().toLowerCase();n&&(l=d_(h)?jA:n),c_(h)&&(e=e||BA,u.scrollbars="yes");const f=Object.entries(u).reduce((y,[P,R])=>`${y}${P}=${R},`,"");if(uR(h)&&l!=="_self")return zA(e||"",l),new bm(null);const m=window.open(e||"",l,f);H(m,t,"popup-blocked");try{m.focus()}catch{}return new bm(m)}function zA(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const HA="__/auth/handler",WA="emulator/auth/handler",KA=encodeURIComponent("fac");async function Um(t,e,n,r,i,s){H(t.config.authDomain,t,"auth-domain-config-required"),H(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Vi,eventId:i};if(e instanceof Od){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",D1(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,m]of Object.entries({}))o[f]=m}if(e instanceof yo){const f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),h=u?`#${KA}=${encodeURIComponent(u)}`:"";return`${GA(t)}?${po(l).slice(1)}${h}`}function GA({config:t}){return t.emulator?Cd(t,WA):`https://${t.authDomain}/${HA}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="webStorageSupport";class qA{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=P_,this._completeRedirectFn=vA,this._overrideRedirectResult=mA}async _openPopup(e,n,r,i){var s;In((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const o=await Um(e,n,r,oh(),i);return $A(e,o,Ld())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await Um(e,n,r,oh(),i);return XR(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(In(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await MA(e),r=new wA(e);return n.register("authEvent",i=>(H(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(nc,{type:nc},i=>{var s;const o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[nc];o!==void 0&&n(!!o),Rt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=RA(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return y_()||h_()||Nd()}}const QA=qA;var jm="@firebase/auth",Bm="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YA{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function XA(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function JA(t){Ti(new xr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;H(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:v_(t)},h=new mR(r,i,s,u);return SR(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Ti(new xr("auth-internal",e=>{const n=lr(e.getProvider("auth").getImmediate());return(r=>new YA(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Jn(jm,Bm,XA(t)),Jn(jm,Bm,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZA=5*60,eP=Qv("authIdTokenMaxAge")||ZA;let $m=null;const tP=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>eP)return;const i=n==null?void 0:n.token;$m!==i&&($m=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nP(t=Zv()){const e=Sd(t,"auth");if(e.isInitialized())return e.getImmediate();const n=IR(t,{popupRedirectResolver:QA,persistence:[oA,qR,P_]}),r=Qv("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=tP(s.toString());HR(n,o,()=>o(n.currentUser)),zR(n,l=>o(l))}}const i=Gv("auth");return i&&RR(n,`http://${i}`),n}function rP(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}gR({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=Ft("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",rP().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});JA("Browser");var zm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var V_;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,g){function _(){}_.prototype=g.prototype,E.D=g.prototype,E.prototype=new _,E.prototype.constructor=E,E.C=function(I,A,k){for(var S=Array(arguments.length-2),vt=2;vt<arguments.length;vt++)S[vt-2]=arguments[vt];return g.prototype[A].apply(I,S)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,g,_){_||(_=0);var I=Array(16);if(typeof g=="string")for(var A=0;16>A;++A)I[A]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(A=0;16>A;++A)I[A]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=E.g[0],_=E.g[1],A=E.g[2];var k=E.g[3],S=g+(k^_&(A^k))+I[0]+3614090360&4294967295;g=_+(S<<7&4294967295|S>>>25),S=k+(A^g&(_^A))+I[1]+3905402710&4294967295,k=g+(S<<12&4294967295|S>>>20),S=A+(_^k&(g^_))+I[2]+606105819&4294967295,A=k+(S<<17&4294967295|S>>>15),S=_+(g^A&(k^g))+I[3]+3250441966&4294967295,_=A+(S<<22&4294967295|S>>>10),S=g+(k^_&(A^k))+I[4]+4118548399&4294967295,g=_+(S<<7&4294967295|S>>>25),S=k+(A^g&(_^A))+I[5]+1200080426&4294967295,k=g+(S<<12&4294967295|S>>>20),S=A+(_^k&(g^_))+I[6]+2821735955&4294967295,A=k+(S<<17&4294967295|S>>>15),S=_+(g^A&(k^g))+I[7]+4249261313&4294967295,_=A+(S<<22&4294967295|S>>>10),S=g+(k^_&(A^k))+I[8]+1770035416&4294967295,g=_+(S<<7&4294967295|S>>>25),S=k+(A^g&(_^A))+I[9]+2336552879&4294967295,k=g+(S<<12&4294967295|S>>>20),S=A+(_^k&(g^_))+I[10]+4294925233&4294967295,A=k+(S<<17&4294967295|S>>>15),S=_+(g^A&(k^g))+I[11]+2304563134&4294967295,_=A+(S<<22&4294967295|S>>>10),S=g+(k^_&(A^k))+I[12]+1804603682&4294967295,g=_+(S<<7&4294967295|S>>>25),S=k+(A^g&(_^A))+I[13]+4254626195&4294967295,k=g+(S<<12&4294967295|S>>>20),S=A+(_^k&(g^_))+I[14]+2792965006&4294967295,A=k+(S<<17&4294967295|S>>>15),S=_+(g^A&(k^g))+I[15]+1236535329&4294967295,_=A+(S<<22&4294967295|S>>>10),S=g+(A^k&(_^A))+I[1]+4129170786&4294967295,g=_+(S<<5&4294967295|S>>>27),S=k+(_^A&(g^_))+I[6]+3225465664&4294967295,k=g+(S<<9&4294967295|S>>>23),S=A+(g^_&(k^g))+I[11]+643717713&4294967295,A=k+(S<<14&4294967295|S>>>18),S=_+(k^g&(A^k))+I[0]+3921069994&4294967295,_=A+(S<<20&4294967295|S>>>12),S=g+(A^k&(_^A))+I[5]+3593408605&4294967295,g=_+(S<<5&4294967295|S>>>27),S=k+(_^A&(g^_))+I[10]+38016083&4294967295,k=g+(S<<9&4294967295|S>>>23),S=A+(g^_&(k^g))+I[15]+3634488961&4294967295,A=k+(S<<14&4294967295|S>>>18),S=_+(k^g&(A^k))+I[4]+3889429448&4294967295,_=A+(S<<20&4294967295|S>>>12),S=g+(A^k&(_^A))+I[9]+568446438&4294967295,g=_+(S<<5&4294967295|S>>>27),S=k+(_^A&(g^_))+I[14]+3275163606&4294967295,k=g+(S<<9&4294967295|S>>>23),S=A+(g^_&(k^g))+I[3]+4107603335&4294967295,A=k+(S<<14&4294967295|S>>>18),S=_+(k^g&(A^k))+I[8]+1163531501&4294967295,_=A+(S<<20&4294967295|S>>>12),S=g+(A^k&(_^A))+I[13]+2850285829&4294967295,g=_+(S<<5&4294967295|S>>>27),S=k+(_^A&(g^_))+I[2]+4243563512&4294967295,k=g+(S<<9&4294967295|S>>>23),S=A+(g^_&(k^g))+I[7]+1735328473&4294967295,A=k+(S<<14&4294967295|S>>>18),S=_+(k^g&(A^k))+I[12]+2368359562&4294967295,_=A+(S<<20&4294967295|S>>>12),S=g+(_^A^k)+I[5]+4294588738&4294967295,g=_+(S<<4&4294967295|S>>>28),S=k+(g^_^A)+I[8]+2272392833&4294967295,k=g+(S<<11&4294967295|S>>>21),S=A+(k^g^_)+I[11]+1839030562&4294967295,A=k+(S<<16&4294967295|S>>>16),S=_+(A^k^g)+I[14]+4259657740&4294967295,_=A+(S<<23&4294967295|S>>>9),S=g+(_^A^k)+I[1]+2763975236&4294967295,g=_+(S<<4&4294967295|S>>>28),S=k+(g^_^A)+I[4]+1272893353&4294967295,k=g+(S<<11&4294967295|S>>>21),S=A+(k^g^_)+I[7]+4139469664&4294967295,A=k+(S<<16&4294967295|S>>>16),S=_+(A^k^g)+I[10]+3200236656&4294967295,_=A+(S<<23&4294967295|S>>>9),S=g+(_^A^k)+I[13]+681279174&4294967295,g=_+(S<<4&4294967295|S>>>28),S=k+(g^_^A)+I[0]+3936430074&4294967295,k=g+(S<<11&4294967295|S>>>21),S=A+(k^g^_)+I[3]+3572445317&4294967295,A=k+(S<<16&4294967295|S>>>16),S=_+(A^k^g)+I[6]+76029189&4294967295,_=A+(S<<23&4294967295|S>>>9),S=g+(_^A^k)+I[9]+3654602809&4294967295,g=_+(S<<4&4294967295|S>>>28),S=k+(g^_^A)+I[12]+3873151461&4294967295,k=g+(S<<11&4294967295|S>>>21),S=A+(k^g^_)+I[15]+530742520&4294967295,A=k+(S<<16&4294967295|S>>>16),S=_+(A^k^g)+I[2]+3299628645&4294967295,_=A+(S<<23&4294967295|S>>>9),S=g+(A^(_|~k))+I[0]+4096336452&4294967295,g=_+(S<<6&4294967295|S>>>26),S=k+(_^(g|~A))+I[7]+1126891415&4294967295,k=g+(S<<10&4294967295|S>>>22),S=A+(g^(k|~_))+I[14]+2878612391&4294967295,A=k+(S<<15&4294967295|S>>>17),S=_+(k^(A|~g))+I[5]+4237533241&4294967295,_=A+(S<<21&4294967295|S>>>11),S=g+(A^(_|~k))+I[12]+1700485571&4294967295,g=_+(S<<6&4294967295|S>>>26),S=k+(_^(g|~A))+I[3]+2399980690&4294967295,k=g+(S<<10&4294967295|S>>>22),S=A+(g^(k|~_))+I[10]+4293915773&4294967295,A=k+(S<<15&4294967295|S>>>17),S=_+(k^(A|~g))+I[1]+2240044497&4294967295,_=A+(S<<21&4294967295|S>>>11),S=g+(A^(_|~k))+I[8]+1873313359&4294967295,g=_+(S<<6&4294967295|S>>>26),S=k+(_^(g|~A))+I[15]+4264355552&4294967295,k=g+(S<<10&4294967295|S>>>22),S=A+(g^(k|~_))+I[6]+2734768916&4294967295,A=k+(S<<15&4294967295|S>>>17),S=_+(k^(A|~g))+I[13]+1309151649&4294967295,_=A+(S<<21&4294967295|S>>>11),S=g+(A^(_|~k))+I[4]+4149444226&4294967295,g=_+(S<<6&4294967295|S>>>26),S=k+(_^(g|~A))+I[11]+3174756917&4294967295,k=g+(S<<10&4294967295|S>>>22),S=A+(g^(k|~_))+I[2]+718787259&4294967295,A=k+(S<<15&4294967295|S>>>17),S=_+(k^(A|~g))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+g&4294967295,E.g[1]=E.g[1]+(A+(S<<21&4294967295|S>>>11))&4294967295,E.g[2]=E.g[2]+A&4294967295,E.g[3]=E.g[3]+k&4294967295}r.prototype.u=function(E,g){g===void 0&&(g=E.length);for(var _=g-this.blockSize,I=this.B,A=this.h,k=0;k<g;){if(A==0)for(;k<=_;)i(this,E,k),k+=this.blockSize;if(typeof E=="string"){for(;k<g;)if(I[A++]=E.charCodeAt(k++),A==this.blockSize){i(this,I),A=0;break}}else for(;k<g;)if(I[A++]=E[k++],A==this.blockSize){i(this,I),A=0;break}}this.h=A,this.o+=g},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var g=1;g<E.length-8;++g)E[g]=0;var _=8*this.o;for(g=E.length-8;g<E.length;++g)E[g]=_&255,_/=256;for(this.u(E),E=Array(16),g=_=0;4>g;++g)for(var I=0;32>I;I+=8)E[_++]=this.g[g]>>>I&255;return E};function s(E,g){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=g(E)}function o(E,g){this.h=g;for(var _=[],I=!0,A=E.length-1;0<=A;A--){var k=E[A]|0;I&&k==g||(_[A]=k,I=!1)}this.g=_}var l={};function u(E){return-128<=E&&128>E?s(E,function(g){return new o([g|0],0>g?-1:0)}):new o([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return m;if(0>E)return D(h(-E));for(var g=[],_=1,I=0;E>=_;I++)g[I]=E/_|0,_*=4294967296;return new o(g,0)}function f(E,g){if(E.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(E.charAt(0)=="-")return D(f(E.substring(1),g));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=h(Math.pow(g,8)),I=m,A=0;A<E.length;A+=8){var k=Math.min(8,E.length-A),S=parseInt(E.substring(A,A+k),g);8>k?(k=h(Math.pow(g,k)),I=I.j(k).add(h(S))):(I=I.j(_),I=I.add(h(S)))}return I}var m=u(0),y=u(1),P=u(16777216);t=o.prototype,t.m=function(){if(N(this))return-D(this).m();for(var E=0,g=1,_=0;_<this.g.length;_++){var I=this.i(_);E+=(0<=I?I:4294967296+I)*g,g*=4294967296}return E},t.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(R(this))return"0";if(N(this))return"-"+D(this).toString(E);for(var g=h(Math.pow(E,6)),_=this,I="";;){var A=O(_,g).g;_=w(_,A.j(g));var k=((0<_.g.length?_.g[0]:_.h)>>>0).toString(E);if(_=A,R(_))return k+I;for(;6>k.length;)k="0"+k;I=k+I}},t.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function R(E){if(E.h!=0)return!1;for(var g=0;g<E.g.length;g++)if(E.g[g]!=0)return!1;return!0}function N(E){return E.h==-1}t.l=function(E){return E=w(this,E),N(E)?-1:R(E)?0:1};function D(E){for(var g=E.g.length,_=[],I=0;I<g;I++)_[I]=~E.g[I];return new o(_,~E.h).add(y)}t.abs=function(){return N(this)?D(this):this},t.add=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],I=0,A=0;A<=g;A++){var k=I+(this.i(A)&65535)+(E.i(A)&65535),S=(k>>>16)+(this.i(A)>>>16)+(E.i(A)>>>16);I=S>>>16,k&=65535,S&=65535,_[A]=S<<16|k}return new o(_,_[_.length-1]&-2147483648?-1:0)};function w(E,g){return E.add(D(g))}t.j=function(E){if(R(this)||R(E))return m;if(N(this))return N(E)?D(this).j(D(E)):D(D(this).j(E));if(N(E))return D(this.j(D(E)));if(0>this.l(P)&&0>E.l(P))return h(this.m()*E.m());for(var g=this.g.length+E.g.length,_=[],I=0;I<2*g;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(var A=0;A<E.g.length;A++){var k=this.i(I)>>>16,S=this.i(I)&65535,vt=E.i(A)>>>16,ur=E.i(A)&65535;_[2*I+2*A]+=S*ur,v(_,2*I+2*A),_[2*I+2*A+1]+=k*ur,v(_,2*I+2*A+1),_[2*I+2*A+1]+=S*vt,v(_,2*I+2*A+1),_[2*I+2*A+2]+=k*vt,v(_,2*I+2*A+2)}for(I=0;I<g;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=g;I<2*g;I++)_[I]=0;return new o(_,0)};function v(E,g){for(;(E[g]&65535)!=E[g];)E[g+1]+=E[g]>>>16,E[g]&=65535,g++}function T(E,g){this.g=E,this.h=g}function O(E,g){if(R(g))throw Error("division by zero");if(R(E))return new T(m,m);if(N(E))return g=O(D(E),g),new T(D(g.g),D(g.h));if(N(g))return g=O(E,D(g)),new T(D(g.g),g.h);if(30<E.g.length){if(N(E)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var _=y,I=g;0>=I.l(E);)_=b(_),I=b(I);var A=U(_,1),k=U(I,1);for(I=U(I,2),_=U(_,2);!R(I);){var S=k.add(I);0>=S.l(E)&&(A=A.add(_),k=S),I=U(I,1),_=U(_,1)}return g=w(E,A.j(g)),new T(A,g)}for(A=m;0<=E.l(g);){for(_=Math.max(1,Math.floor(E.m()/g.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),k=h(_),S=k.j(g);N(S)||0<S.l(E);)_-=I,k=h(_),S=k.j(g);R(k)&&(k=y),A=A.add(k),E=w(E,S)}return new T(A,E)}t.A=function(E){return O(this,E).h},t.and=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)&E.i(I);return new o(_,this.h&E.h)},t.or=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)|E.i(I);return new o(_,this.h|E.h)},t.xor=function(E){for(var g=Math.max(this.g.length,E.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)^E.i(I);return new o(_,this.h^E.h)};function b(E){for(var g=E.g.length+1,_=[],I=0;I<g;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new o(_,E.h)}function U(E,g){var _=g>>5;g%=32;for(var I=E.g.length-_,A=[],k=0;k<I;k++)A[k]=0<g?E.i(k+_)>>>g|E.i(k+_+1)<<32-g:E.i(k+_);return new o(A,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,V_=o}).apply(typeof zm<"u"?zm:typeof self<"u"?self:typeof window<"u"?window:{});var oa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var M_,gs,F_,Na,ch,b_,U_,j_;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof oa=="object"&&oa];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(a,c){if(c)e:{var d=r;a=a.split(".");for(var p=0;p<a.length-1;p++){var C=a[p];if(!(C in d))break e;d=d[C]}a=a[a.length-1],p=d[a],c=c(p),c!=p&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function s(a,c){a instanceof String&&(a+="");var d=0,p=!1,C={next:function(){if(!p&&d<a.length){var x=d++;return{value:c(x,a[x]),done:!1}}return p=!0,{done:!0,value:void 0}}};return C[Symbol.iterator]=function(){return C},C}i("Array.prototype.values",function(a){return a||function(){return s(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function f(a,c,d){return a.call.apply(a.bind,arguments)}function m(a,c,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var C=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(C,p),a.apply(c,C)}}return function(){return a.apply(c,arguments)}}function y(a,c,d){return y=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,y.apply(null,arguments)}function P(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function R(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,C,x){for(var j=Array(arguments.length-2),ie=2;ie<arguments.length;ie++)j[ie-2]=arguments[ie];return c.prototype[C].apply(p,j)}}function N(a){const c=a.length;if(0<c){const d=Array(c);for(let p=0;p<c;p++)d[p]=a[p];return d}return[]}function D(a,c){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const C=a.length||0,x=p.length||0;a.length=C+x;for(let j=0;j<x;j++)a[C+j]=p[j]}else a.push(p)}}class w{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function v(a){return/^[\s\xa0]*$/.test(a)}function T(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function O(a){return O[" "](a),a}O[" "]=function(){};var b=T().indexOf("Gecko")!=-1&&!(T().toLowerCase().indexOf("webkit")!=-1&&T().indexOf("Edge")==-1)&&!(T().indexOf("Trident")!=-1||T().indexOf("MSIE")!=-1)&&T().indexOf("Edge")==-1;function U(a,c,d){for(const p in a)c.call(d,a[p],p,a)}function E(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function g(a){const c={};for(const d in a)c[d]=a[d];return c}const _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(a,c){let d,p;for(let C=1;C<arguments.length;C++){p=arguments[C];for(d in p)a[d]=p[d];for(let x=0;x<_.length;x++)d=_[x],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function A(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function k(a){l.setTimeout(()=>{throw a},0)}function S(){var a=K;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class vt{constructor(){this.h=this.g=null}add(c,d){const p=ur.get();p.set(c,d),this.h?this.h.next=p:this.g=p,this.h=p}}var ur=new w(()=>new Ui,a=>a.reset());class Ui{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Yt,B=!1,K=new vt,G=()=>{const a=l.Promise.resolve(void 0);Yt=()=>{a.then(fe)}};var fe=()=>{for(var a;a=S();){try{a.h.call(a.g)}catch(d){k(d)}var c=ur;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}B=!1};function re(){this.s=this.s,this.C=this.C}re.prototype.s=!1,re.prototype.ma=function(){this.s||(this.s=!0,this.N())},re.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var Xt=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function Jt(a,c){if(we.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(b){e:{try{O(c.nodeName);var C=!0;break e}catch{}C=!1}C||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Zt[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Jt.aa.h.call(this)}}R(Jt,we);var Zt={2:"touch",3:"pen",4:"mouse"};Jt.prototype.h=function(){Jt.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var en="closure_listenable_"+(1e6*Math.random()|0),F0=0;function b0(a,c,d,p,C){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!p,this.ha=C,this.key=++F0,this.da=this.fa=!1}function Io(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function So(a){this.src=a,this.g={},this.h=0}So.prototype.add=function(a,c,d,p,C){var x=a.toString();a=this.g[x],a||(a=this.g[x]=[],this.h++);var j=eu(a,c,p,C);return-1<j?(c=a[j],d||(c.fa=!1)):(c=new b0(c,this.src,x,!!p,C),c.fa=d,a.push(c)),c};function Zl(a,c){var d=c.type;if(d in a.g){var p=a.g[d],C=Array.prototype.indexOf.call(p,c,void 0),x;(x=0<=C)&&Array.prototype.splice.call(p,C,1),x&&(Io(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function eu(a,c,d,p){for(var C=0;C<a.length;++C){var x=a[C];if(!x.da&&x.listener==c&&x.capture==!!d&&x.ha==p)return C}return-1}var tu="closure_lm_"+(1e6*Math.random()|0),nu={};function Zd(a,c,d,p,C){if(Array.isArray(c)){for(var x=0;x<c.length;x++)Zd(a,c[x],d,p,C);return null}return d=nf(d),a&&a[en]?a.K(c,d,h(p)?!!p.capture:!!p,C):U0(a,c,d,!1,p,C)}function U0(a,c,d,p,C,x){if(!c)throw Error("Invalid event type");var j=h(C)?!!C.capture:!!C,ie=iu(a);if(ie||(a[tu]=ie=new So(a)),d=ie.add(c,d,p,j,x),d.proxy)return d;if(p=j0(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)Xt||(C=j),C===void 0&&(C=!1),a.addEventListener(c.toString(),p,C);else if(a.attachEvent)a.attachEvent(tf(c.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function j0(){function a(d){return c.call(a.src,a.listener,d)}const c=B0;return a}function ef(a,c,d,p,C){if(Array.isArray(c))for(var x=0;x<c.length;x++)ef(a,c[x],d,p,C);else p=h(p)?!!p.capture:!!p,d=nf(d),a&&a[en]?(a=a.i,c=String(c).toString(),c in a.g&&(x=a.g[c],d=eu(x,d,p,C),-1<d&&(Io(x[d]),Array.prototype.splice.call(x,d,1),x.length==0&&(delete a.g[c],a.h--)))):a&&(a=iu(a))&&(c=a.g[c.toString()],a=-1,c&&(a=eu(c,d,p,C)),(d=-1<a?c[a]:null)&&ru(d))}function ru(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[en])Zl(c.i,a);else{var d=a.type,p=a.proxy;c.removeEventListener?c.removeEventListener(d,p,a.capture):c.detachEvent?c.detachEvent(tf(d),p):c.addListener&&c.removeListener&&c.removeListener(p),(d=iu(c))?(Zl(d,a),d.h==0&&(d.src=null,c[tu]=null)):Io(a)}}}function tf(a){return a in nu?nu[a]:nu[a]="on"+a}function B0(a,c){if(a.da)a=!0;else{c=new Jt(c,this);var d=a.listener,p=a.ha||a.src;a.fa&&ru(a),a=d.call(p,c)}return a}function iu(a){return a=a[tu],a instanceof So?a:null}var su="__closure_events_fn_"+(1e9*Math.random()>>>0);function nf(a){return typeof a=="function"?a:(a[su]||(a[su]=function(c){return a.handleEvent(c)}),a[su])}function je(){re.call(this),this.i=new So(this),this.M=this,this.F=null}R(je,re),je.prototype[en]=!0,je.prototype.removeEventListener=function(a,c,d,p){ef(this,a,c,d,p)};function Je(a,c){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=c.type||c,typeof c=="string")c=new we(c,a);else if(c instanceof we)c.target=c.target||a;else{var C=c;c=new we(p,a),I(c,C)}if(C=!0,d)for(var x=d.length-1;0<=x;x--){var j=c.g=d[x];C=Ro(j,p,!0,c)&&C}if(j=c.g=a,C=Ro(j,p,!0,c)&&C,C=Ro(j,p,!1,c)&&C,d)for(x=0;x<d.length;x++)j=c.g=d[x],C=Ro(j,p,!1,c)&&C}je.prototype.N=function(){if(je.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],p=0;p<d.length;p++)Io(d[p]);delete a.g[c],a.h--}}this.F=null},je.prototype.K=function(a,c,d,p){return this.i.add(String(a),c,!1,d,p)},je.prototype.L=function(a,c,d,p){return this.i.add(String(a),c,!0,d,p)};function Ro(a,c,d,p){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var C=!0,x=0;x<c.length;++x){var j=c[x];if(j&&!j.da&&j.capture==d){var ie=j.listener,Oe=j.ha||j.src;j.fa&&Zl(a.i,j),C=ie.call(Oe,p)!==!1&&C}}return C&&!p.defaultPrevented}function rf(a,c,d){if(typeof a=="function")d&&(a=y(a,d));else if(a&&typeof a.handleEvent=="function")a=y(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function sf(a){a.g=rf(()=>{a.g=null,a.i&&(a.i=!1,sf(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class $0 extends re{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:sf(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ji(a){re.call(this),this.h=a,this.g={}}R(ji,re);var of=[];function af(a){U(a.g,function(c,d){this.g.hasOwnProperty(d)&&ru(c)},a),a.g={}}ji.prototype.N=function(){ji.aa.N.call(this),af(this)},ji.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ou=l.JSON.stringify,z0=l.JSON.parse,H0=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function au(){}au.prototype.h=null;function lf(a){return a.h||(a.h=a.i())}function uf(){}var Bi={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function lu(){we.call(this,"d")}R(lu,we);function uu(){we.call(this,"c")}R(uu,we);var cr={},cf=null;function Ao(){return cf=cf||new je}cr.La="serverreachability";function hf(a){we.call(this,cr.La,a)}R(hf,we);function $i(a){const c=Ao();Je(c,new hf(c))}cr.STAT_EVENT="statevent";function df(a,c){we.call(this,cr.STAT_EVENT,a),this.stat=c}R(df,we);function Ze(a){const c=Ao();Je(c,new df(c,a))}cr.Ma="timingevent";function ff(a,c){we.call(this,cr.Ma,a),this.size=c}R(ff,we);function zi(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function Hi(){this.g=!0}Hi.prototype.xa=function(){this.g=!1};function W0(a,c,d,p,C,x){a.info(function(){if(a.g)if(x)for(var j="",ie=x.split("&"),Oe=0;Oe<ie.length;Oe++){var te=ie[Oe].split("=");if(1<te.length){var Be=te[0];te=te[1];var $e=Be.split("_");j=2<=$e.length&&$e[1]=="type"?j+(Be+"="+te+"&"):j+(Be+"=redacted&")}}else j=null;else j=x;return"XMLHTTP REQ ("+p+") [attempt "+C+"]: "+c+`
`+d+`
`+j})}function K0(a,c,d,p,C,x,j){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+C+"]: "+c+`
`+d+`
`+x+" "+j})}function jr(a,c,d,p){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+q0(a,d)+(p?" "+p:"")})}function G0(a,c){a.info(function(){return"TIMEOUT: "+c})}Hi.prototype.info=function(){};function q0(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var C=p[1];if(Array.isArray(C)&&!(1>C.length)){var x=C[0];if(x!="noop"&&x!="stop"&&x!="close")for(var j=1;j<C.length;j++)C[j]=""}}}}return ou(d)}catch{return c}}var Po={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},pf={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},cu;function Co(){}R(Co,au),Co.prototype.g=function(){return new XMLHttpRequest},Co.prototype.i=function(){return{}},cu=new Co;function Cn(a,c,d,p){this.j=a,this.i=c,this.l=d,this.R=p||1,this.U=new ji(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new mf}function mf(){this.i=null,this.g="",this.h=!1}var gf={},hu={};function du(a,c,d){a.L=1,a.v=Do(tn(c)),a.m=d,a.P=!0,yf(a,null)}function yf(a,c){a.F=Date.now(),ko(a),a.A=tn(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),xf(d.i,"t",p),a.C=0,d=a.j.J,a.h=new mf,a.g=Qf(a.j,d?c:null,!a.m),0<a.O&&(a.M=new $0(y(a.Y,a,a.g),a.O)),c=a.U,d=a.g,p=a.ca;var C="readystatechange";Array.isArray(C)||(C&&(of[0]=C.toString()),C=of);for(var x=0;x<C.length;x++){var j=Zd(d,C[x],p||c.handleEvent,!1,c.h||c);if(!j)break;c.g[j.key]=j}c=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),$i(),W0(a.i,a.u,a.A,a.l,a.R,a.m)}Cn.prototype.ca=function(a){a=a.target;const c=this.M;c&&nn(a)==3?c.j():this.Y(a)},Cn.prototype.Y=function(a){try{if(a==this.g)e:{const $e=nn(this.g);var c=this.g.Ba();const zr=this.g.Z();if(!(3>$e)&&($e!=3||this.g&&(this.h.h||this.g.oa()||bf(this.g)))){this.J||$e!=4||c==7||(c==8||0>=zr?$i(3):$i(2)),fu(this);var d=this.g.Z();this.X=d;t:if(vf(this)){var p=bf(this.g);a="";var C=p.length,x=nn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){hr(this),Wi(this);var j="";break t}this.h.i=new l.TextDecoder}for(c=0;c<C;c++)this.h.h=!0,a+=this.h.i.decode(p[c],{stream:!(x&&c==C-1)});p.length=0,this.h.g+=a,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=d==200,K0(this.i,this.u,this.A,this.l,this.R,$e,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ie,Oe=this.g;if((ie=Oe.g?Oe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(ie)){var te=ie;break t}}te=null}if(d=te)jr(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,pu(this,d);else{this.o=!1,this.s=3,Ze(12),hr(this),Wi(this);break e}}if(this.P){d=!0;let At;for(;!this.J&&this.C<j.length;)if(At=Q0(this,j),At==hu){$e==4&&(this.s=4,Ze(14),d=!1),jr(this.i,this.l,null,"[Incomplete Response]");break}else if(At==gf){this.s=4,Ze(15),jr(this.i,this.l,j,"[Invalid Chunk]"),d=!1;break}else jr(this.i,this.l,At,null),pu(this,At);if(vf(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),$e!=4||j.length!=0||this.h.h||(this.s=1,Ze(16),d=!1),this.o=this.o&&d,!d)jr(this.i,this.l,j,"[Invalid Chunked Response]"),hr(this),Wi(this);else if(0<j.length&&!this.W){this.W=!0;var Be=this.j;Be.g==this&&Be.ba&&!Be.M&&(Be.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),wu(Be),Be.M=!0,Ze(11))}}else jr(this.i,this.l,j,null),pu(this,j);$e==4&&hr(this),this.o&&!this.J&&($e==4?Wf(this.j,this):(this.o=!1,ko(this)))}else dw(this.g),d==400&&0<j.indexOf("Unknown SID")?(this.s=3,Ze(12)):(this.s=0,Ze(13)),hr(this),Wi(this)}}}catch{}finally{}};function vf(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Q0(a,c){var d=a.C,p=c.indexOf(`
`,d);return p==-1?hu:(d=Number(c.substring(d,p)),isNaN(d)?gf:(p+=1,p+d>c.length?hu:(c=c.slice(p,p+d),a.C=p+d,c)))}Cn.prototype.cancel=function(){this.J=!0,hr(this)};function ko(a){a.S=Date.now()+a.I,_f(a,a.I)}function _f(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=zi(y(a.ba,a),c)}function fu(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Cn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(G0(this.i,this.A),this.L!=2&&($i(),Ze(17)),hr(this),this.s=2,Wi(this)):_f(this,this.S-a)};function Wi(a){a.j.G==0||a.J||Wf(a.j,a)}function hr(a){fu(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,af(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function pu(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||mu(d.h,a))){if(!a.K&&mu(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(c)}catch{p=null}if(Array.isArray(p)&&p.length==3){var C=p;if(C[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)bo(d),Mo(d);else break e;_u(d),Ze(18)}}else d.za=C[1],0<d.za-d.T&&37500>C[2]&&d.F&&d.v==0&&!d.C&&(d.C=zi(y(d.Za,d),6e3));if(1>=Tf(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else fr(d,11)}else if((a.K||d.g==a)&&bo(d),!v(c))for(C=d.Da.g.parse(c),c=0;c<C.length;c++){let te=C[c];if(d.T=te[0],te=te[1],d.G==2)if(te[0]=="c"){d.K=te[1],d.ia=te[2];const Be=te[3];Be!=null&&(d.la=Be,d.j.info("VER="+d.la));const $e=te[4];$e!=null&&(d.Aa=$e,d.j.info("SVER="+d.Aa));const zr=te[5];zr!=null&&typeof zr=="number"&&0<zr&&(p=1.5*zr,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const At=a.g;if(At){const jo=At.g?At.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(jo){var x=p.h;x.g||jo.indexOf("spdy")==-1&&jo.indexOf("quic")==-1&&jo.indexOf("h2")==-1||(x.j=x.l,x.g=new Set,x.h&&(gu(x,x.h),x.h=null))}if(p.D){const Eu=At.g?At.g.getResponseHeader("X-HTTP-Session-Id"):null;Eu&&(p.ya=Eu,le(p.I,p.D,Eu))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var j=a;if(p.qa=qf(p,p.J?p.ia:null,p.W),j.K){If(p.h,j);var ie=j,Oe=p.L;Oe&&(ie.I=Oe),ie.B&&(fu(ie),ko(ie)),p.g=j}else zf(p);0<d.i.length&&Fo(d)}else te[0]!="stop"&&te[0]!="close"||fr(d,7);else d.G==3&&(te[0]=="stop"||te[0]=="close"?te[0]=="stop"?fr(d,7):vu(d):te[0]!="noop"&&d.l&&d.l.ta(te),d.v=0)}}$i(4)}catch{}}var Y0=class{constructor(a,c){this.g=a,this.map=c}};function wf(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Ef(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Tf(a){return a.h?1:a.g?a.g.size:0}function mu(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function gu(a,c){a.g?a.g.add(c):a.h=c}function If(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}wf.prototype.cancel=function(){if(this.i=Sf(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Sf(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return N(a.i)}function X0(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,p=0;p<d;p++)c.push(a[p]);return c}c=[],d=0;for(p in a)c[d++]=a[p];return c}function J0(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const p in a)c[d++]=p;return c}}}function Rf(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=J0(a),p=X0(a),C=p.length,x=0;x<C;x++)c.call(void 0,p[x],d&&d[x],a)}var Af=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Z0(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),C=null;if(0<=p){var x=a[d].substring(0,p);C=a[d].substring(p+1)}else x=a[d];c(x,C?decodeURIComponent(C.replace(/\+/g," ")):"")}}}function dr(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof dr){this.h=a.h,No(this,a.j),this.o=a.o,this.g=a.g,xo(this,a.s),this.l=a.l;var c=a.i,d=new qi;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),Pf(this,d),this.m=a.m}else a&&(c=String(a).match(Af))?(this.h=!1,No(this,c[1]||"",!0),this.o=Ki(c[2]||""),this.g=Ki(c[3]||"",!0),xo(this,c[4]),this.l=Ki(c[5]||"",!0),Pf(this,c[6]||"",!0),this.m=Ki(c[7]||"")):(this.h=!1,this.i=new qi(null,this.h))}dr.prototype.toString=function(){var a=[],c=this.j;c&&a.push(Gi(c,Cf,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(Gi(c,Cf,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Gi(d,d.charAt(0)=="/"?nw:tw,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Gi(d,iw)),a.join("")};function tn(a){return new dr(a)}function No(a,c,d){a.j=d?Ki(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function xo(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function Pf(a,c,d){c instanceof qi?(a.i=c,sw(a.i,a.h)):(d||(c=Gi(c,rw)),a.i=new qi(c,a.h))}function le(a,c,d){a.i.set(c,d)}function Do(a){return le(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ki(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Gi(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,ew),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function ew(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Cf=/[#\/\?@]/g,tw=/[#\?:]/g,nw=/[#\?]/g,rw=/[#\?@]/g,iw=/#/g;function qi(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function kn(a){a.g||(a.g=new Map,a.h=0,a.i&&Z0(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}t=qi.prototype,t.add=function(a,c){kn(this),this.i=null,a=Br(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function kf(a,c){kn(a),c=Br(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Nf(a,c){return kn(a),c=Br(a,c),a.g.has(c)}t.forEach=function(a,c){kn(this),this.g.forEach(function(d,p){d.forEach(function(C){a.call(c,C,p,this)},this)},this)},t.na=function(){kn(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let p=0;p<c.length;p++){const C=a[p];for(let x=0;x<C.length;x++)d.push(c[p])}return d},t.V=function(a){kn(this);let c=[];if(typeof a=="string")Nf(this,a)&&(c=c.concat(this.g.get(Br(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},t.set=function(a,c){return kn(this),this.i=null,a=Br(this,a),Nf(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},t.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function xf(a,c,d){kf(a,c),0<d.length&&(a.i=null,a.g.set(Br(a,c),N(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var p=c[d];const x=encodeURIComponent(String(p)),j=this.V(p);for(p=0;p<j.length;p++){var C=x;j[p]!==""&&(C+="="+encodeURIComponent(String(j[p]))),a.push(C)}}return this.i=a.join("&")};function Br(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function sw(a,c){c&&!a.j&&(kn(a),a.i=null,a.g.forEach(function(d,p){var C=p.toLowerCase();p!=C&&(kf(this,p),xf(this,C,d))},a)),a.j=c}function ow(a,c){const d=new Hi;if(l.Image){const p=new Image;p.onload=P(Nn,d,"TestLoadImage: loaded",!0,c,p),p.onerror=P(Nn,d,"TestLoadImage: error",!1,c,p),p.onabort=P(Nn,d,"TestLoadImage: abort",!1,c,p),p.ontimeout=P(Nn,d,"TestLoadImage: timeout",!1,c,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else c(!1)}function aw(a,c){const d=new Hi,p=new AbortController,C=setTimeout(()=>{p.abort(),Nn(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:p.signal}).then(x=>{clearTimeout(C),x.ok?Nn(d,"TestPingServer: ok",!0,c):Nn(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(C),Nn(d,"TestPingServer: error",!1,c)})}function Nn(a,c,d,p,C){try{C&&(C.onload=null,C.onerror=null,C.onabort=null,C.ontimeout=null),p(d)}catch{}}function lw(){this.g=new H0}function uw(a,c,d){const p=d||"";try{Rf(a,function(C,x){let j=C;h(C)&&(j=ou(C)),c.push(p+x+"="+encodeURIComponent(j))})}catch(C){throw c.push(p+"type="+encodeURIComponent("_badmap")),C}}function Oo(a){this.l=a.Ub||null,this.j=a.eb||!1}R(Oo,au),Oo.prototype.g=function(){return new Lo(this.l,this.j)},Oo.prototype.i=function(a){return function(){return a}}({});function Lo(a,c){je.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Lo,je),t=Lo.prototype,t.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,Yi(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Qi(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Yi(this)),this.g&&(this.readyState=3,Yi(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Df(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Df(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?Qi(this):Yi(this),this.readyState==3&&Df(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Qi(this))},t.Qa=function(a){this.g&&(this.response=a,Qi(this))},t.ga=function(){this.g&&Qi(this)};function Qi(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Yi(a)}t.setRequestHeader=function(a,c){this.u.append(a,c)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function Yi(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Lo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Of(a){let c="";return U(a,function(d,p){c+=p,c+=":",c+=d,c+=`\r
`}),c}function yu(a,c,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Of(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):le(a,c,d))}function ve(a){je.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(ve,je);var cw=/^https?$/i,hw=["POST","PUT"];t=ve.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,c,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():cu.g(),this.v=this.o?lf(this.o):lf(cu),this.g.onreadystatechange=y(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(x){Lf(this,x);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var C in p)d.set(C,p[C]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const x of p.keys())d.set(x,p.get(x));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(x=>x.toLowerCase()=="content-type"),C=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(hw,c,void 0))||p||C||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[x,j]of d)this.g.setRequestHeader(x,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ff(this),this.u=!0,this.g.send(a),this.u=!1}catch(x){Lf(this,x)}};function Lf(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,Vf(a),Vo(a)}function Vf(a){a.A||(a.A=!0,Je(a,"complete"),Je(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Je(this,"complete"),Je(this,"abort"),Vo(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Vo(this,!0)),ve.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Mf(this):this.bb())},t.bb=function(){Mf(this)};function Mf(a){if(a.h&&typeof o<"u"&&(!a.v[1]||nn(a)!=4||a.Z()!=2)){if(a.u&&nn(a)==4)rf(a.Ea,0,a);else if(Je(a,"readystatechange"),nn(a)==4){a.h=!1;try{const j=a.Z();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var p;if(p=j===0){var C=String(a.D).match(Af)[1]||null;!C&&l.self&&l.self.location&&(C=l.self.location.protocol.slice(0,-1)),p=!cw.test(C?C.toLowerCase():"")}d=p}if(d)Je(a,"complete"),Je(a,"success");else{a.m=6;try{var x=2<nn(a)?a.g.statusText:""}catch{x=""}a.l=x+" ["+a.Z()+"]",Vf(a)}}finally{Vo(a)}}}}function Vo(a,c){if(a.g){Ff(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||Je(a,"ready");try{d.onreadystatechange=p}catch{}}}function Ff(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function nn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<nn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),z0(c)}};function bf(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function dw(a){const c={};a=(a.g&&2<=nn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(v(a[p]))continue;var d=A(a[p]);const C=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const x=c[C]||[];c[C]=x,x.push(d)}E(c,function(p){return p.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xi(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function Uf(a){this.Aa=0,this.i=[],this.j=new Hi,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Xi("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Xi("baseRetryDelayMs",5e3,a),this.cb=Xi("retryDelaySeedMs",1e4,a),this.Wa=Xi("forwardChannelMaxRetries",2,a),this.wa=Xi("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new wf(a&&a.concurrentRequestLimit),this.Da=new lw,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Uf.prototype,t.la=8,t.G=1,t.connect=function(a,c,d,p){Ze(0),this.W=a,this.H=c||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=qf(this,null,this.W),Fo(this)};function vu(a){if(jf(a),a.G==3){var c=a.U++,d=tn(a.I);if(le(d,"SID",a.K),le(d,"RID",c),le(d,"TYPE","terminate"),Ji(a,d),c=new Cn(a,a.j,c),c.L=2,c.v=Do(tn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Qf(c.j,null),c.g.ea(c.v)),c.F=Date.now(),ko(c)}Gf(a)}function Mo(a){a.g&&(wu(a),a.g.cancel(),a.g=null)}function jf(a){Mo(a),a.u&&(l.clearTimeout(a.u),a.u=null),bo(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Fo(a){if(!Ef(a.h)&&!a.s){a.s=!0;var c=a.Ga;Yt||G(),B||(Yt(),B=!0),K.add(c,a),a.B=0}}function fw(a,c){return Tf(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=zi(y(a.Ga,a,c),Kf(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const C=new Cn(this,this.j,a);let x=this.o;if(this.S&&(x?(x=g(x),I(x,this.S)):x=this.S),this.m!==null||this.O||(C.H=x,x=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(c+=p,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=$f(this,C,c),d=tn(this.I),le(d,"RID",a),le(d,"CVER",22),this.D&&le(d,"X-HTTP-Session-Id",this.D),Ji(this,d),x&&(this.O?c="headers="+encodeURIComponent(String(Of(x)))+"&"+c:this.m&&yu(d,this.m,x)),gu(this.h,C),this.Ua&&le(d,"TYPE","init"),this.P?(le(d,"$req",c),le(d,"SID","null"),C.T=!0,du(C,d,null)):du(C,d,c),this.G=2}}else this.G==3&&(a?Bf(this,a):this.i.length==0||Ef(this.h)||Bf(this))};function Bf(a,c){var d;c?d=c.l:d=a.U++;const p=tn(a.I);le(p,"SID",a.K),le(p,"RID",d),le(p,"AID",a.T),Ji(a,p),a.m&&a.o&&yu(p,a.m,a.o),d=new Cn(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=$f(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),gu(a.h,d),du(d,p,c)}function Ji(a,c){a.H&&U(a.H,function(d,p){le(c,p,d)}),a.l&&Rf({},function(d,p){le(c,p,d)})}function $f(a,c,d){d=Math.min(a.i.length,d);var p=a.l?y(a.l.Na,a.l,a):null;e:{var C=a.i;let x=-1;for(;;){const j=["count="+d];x==-1?0<d?(x=C[0].g,j.push("ofs="+x)):x=0:j.push("ofs="+x);let ie=!0;for(let Oe=0;Oe<d;Oe++){let te=C[Oe].g;const Be=C[Oe].map;if(te-=x,0>te)x=Math.max(0,C[Oe].g-100),ie=!1;else try{uw(Be,j,"req"+te+"_")}catch{p&&p(Be)}}if(ie){p=j.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,p}function zf(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;Yt||G(),B||(Yt(),B=!0),K.add(c,a),a.v=0}}function _u(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=zi(y(a.Fa,a),Kf(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Hf(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=zi(y(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ze(10),Mo(this),Hf(this))};function wu(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Hf(a){a.g=new Cn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=tn(a.qa);le(c,"RID","rpc"),le(c,"SID",a.K),le(c,"AID",a.T),le(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&le(c,"TO",a.ja),le(c,"TYPE","xmlhttp"),Ji(a,c),a.m&&a.o&&yu(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Do(tn(c)),d.m=null,d.P=!0,yf(d,a)}t.Za=function(){this.C!=null&&(this.C=null,Mo(this),_u(this),Ze(19))};function bo(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Wf(a,c){var d=null;if(a.g==c){bo(a),wu(a),a.g=null;var p=2}else if(mu(a.h,c))d=c.D,If(a.h,c),p=1;else return;if(a.G!=0){if(c.o)if(p==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var C=a.B;p=Ao(),Je(p,new ff(p,d)),Fo(a)}else zf(a);else if(C=c.s,C==3||C==0&&0<c.X||!(p==1&&fw(a,c)||p==2&&_u(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),C){case 1:fr(a,5);break;case 4:fr(a,10);break;case 3:fr(a,6);break;default:fr(a,2)}}}function Kf(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function fr(a,c){if(a.j.info("Error code "+c),c==2){var d=y(a.fb,a),p=a.Xa;const C=!p;p=new dr(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||No(p,"https"),Do(p),C?ow(p.toString(),d):aw(p.toString(),d)}else Ze(2);a.G=0,a.l&&a.l.sa(c),Gf(a),jf(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ze(2)):(this.j.info("Failed to ping google.com"),Ze(1))};function Gf(a){if(a.G=0,a.ka=[],a.l){const c=Sf(a.h);(c.length!=0||a.i.length!=0)&&(D(a.ka,c),D(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function qf(a,c,d){var p=d instanceof dr?tn(d):new dr(d);if(p.g!="")c&&(p.g=c+"."+p.g),xo(p,p.s);else{var C=l.location;p=C.protocol,c=c?c+"."+C.hostname:C.hostname,C=+C.port;var x=new dr(null);p&&No(x,p),c&&(x.g=c),C&&xo(x,C),d&&(x.l=d),p=x}return d=a.D,c=a.ya,d&&c&&le(p,d,c),le(p,"VER",a.la),Ji(a,p),p}function Qf(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new ve(new Oo({eb:d})):new ve(a.pa),c.Ha(a.J),c}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Yf(){}t=Yf.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function Uo(){}Uo.prototype.g=function(a,c){return new ct(a,c)};function ct(a,c){je.call(this),this.g=new Uf(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!v(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!v(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new $r(this)}R(ct,je),ct.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ct.prototype.close=function(){vu(this.g)},ct.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=ou(a),a=d);c.i.push(new Y0(c.Ya++,a)),c.G==3&&Fo(c)},ct.prototype.N=function(){this.g.l=null,delete this.j,vu(this.g),delete this.g,ct.aa.N.call(this)};function Xf(a){lu.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}R(Xf,lu);function Jf(){uu.call(this),this.status=1}R(Jf,uu);function $r(a){this.g=a}R($r,Yf),$r.prototype.ua=function(){Je(this.g,"a")},$r.prototype.ta=function(a){Je(this.g,new Xf(a))},$r.prototype.sa=function(a){Je(this.g,new Jf)},$r.prototype.ra=function(){Je(this.g,"b")},Uo.prototype.createWebChannel=Uo.prototype.g,ct.prototype.send=ct.prototype.o,ct.prototype.open=ct.prototype.m,ct.prototype.close=ct.prototype.close,j_=function(){return new Uo},U_=function(){return Ao()},b_=cr,ch={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Po.NO_ERROR=0,Po.TIMEOUT=8,Po.HTTP_ERROR=6,Na=Po,pf.COMPLETE="complete",F_=pf,uf.EventType=Bi,Bi.OPEN="a",Bi.CLOSE="b",Bi.ERROR="c",Bi.MESSAGE="d",je.prototype.listen=je.prototype.K,gs=uf,ve.prototype.listenOnce=ve.prototype.L,ve.prototype.getLastError=ve.prototype.Ka,ve.prototype.getLastErrorCode=ve.prototype.Ba,ve.prototype.getStatus=ve.prototype.Z,ve.prototype.getResponseJson=ve.prototype.Oa,ve.prototype.getResponseText=ve.prototype.oa,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Ha,M_=ve}).apply(typeof oa<"u"?oa:typeof self<"u"?self:typeof window<"u"?window:{});const Hm="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ke.UNAUTHENTICATED=new Ke(null),Ke.GOOGLE_CREDENTIALS=new Ke("google-credentials-uid"),Ke.FIRST_PARTY=new Ke("first-party-uid"),Ke.MOCK_USER=new Ke("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=new Td("@firebase/firestore");function ls(){return Lr.logLevel}function z(t,...e){if(Lr.logLevel<=Y.DEBUG){const n=e.map(Md);Lr.debug(`Firestore (${Fi}): ${t}`,...n)}}function Vr(t,...e){if(Lr.logLevel<=Y.ERROR){const n=e.map(Md);Lr.error(`Firestore (${Fi}): ${t}`,...n)}}function dl(t,...e){if(Lr.logLevel<=Y.WARN){const n=e.map(Md);Lr.warn(`Firestore (${Fi}): ${t}`,...n)}}function Md(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(t="Unexpected state"){const e=`FIRESTORE (${Fi}) INTERNAL ASSERTION FAILED: `+t;throw Vr(e),new Error(e)}function Te(t,e){t||X()}function ae(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends An{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B_{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class iP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ke.UNAUTHENTICATED))}shutdown(){}}class sP{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class oP{constructor(e){this.t=e,this.currentUser=Ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Te(this.o===void 0);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new Sr;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Sr,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Sr)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Te(typeof r.accessToken=="string"),new B_(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string"),new Ke(e)}}class aP{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class lP{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new aP(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class uP{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class cP{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Te(this.o===void 0);const r=s=>{s.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.R;return this.R=s.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Te(typeof n.token=="string"),this.R=n.token,new uP(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hP(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const i=hP(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%e.length))}return r}}function se(t,e){return t<e?-1:t>e?1:0}function Si(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new W(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new W(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new W(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return De.fromMillis(Date.now())}static fromDate(e){return De.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new De(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?se(this.nanoseconds,e.nanoseconds):se(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.timestamp=e}static fromTimestamp(e){return new pe(e)}static min(){return new pe(new De(0,0))}static max(){return new pe(new De(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(e,n,r){n===void 0?n=0:n>e.length&&X(),r===void 0?r=e.length-n:r>e.length-n&&X(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return Js.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof Js?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=e.get(i),o=n.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Se extends Js{construct(e,n,r){return new Se(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(F.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new Se(n)}static emptyPath(){return new Se([])}}const dP=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Fe extends Js{construct(e,n,r){return new Fe(e,n,r)}static isValidIdentifier(e){return dP.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Fe(["__name__"])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new W(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new W(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new W(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new W(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Fe(n)}static emptyPath(){return new Fe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(Se.fromString(e))}static fromName(e){return new q(Se.fromString(e).popFirst(5))}static empty(){return new q(Se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Se.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new Se(e.slice()))}}function fP(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=pe.fromTimestamp(r===1e9?new De(n+1,0):new De(n,r));return new tr(i,q.empty(),e)}function pP(t){return new tr(t.readTime,t.key,-1)}class tr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new tr(pe.min(),q.empty(),-1)}static max(){return new tr(pe.max(),q.empty(),-1)}}function mP(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=q.comparator(t.documentKey,e.documentKey),n!==0?n:se(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gP="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class yP{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z_(t){if(t.code!==F.FAILED_PRECONDITION||t.message!==gP)throw t;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&X(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new V((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof V?n:V.resolve(n)}catch(n){return V.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):V.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):V.reject(n)}static resolve(e){return new V((n,r)=>{n(e)})}static reject(e){return new V((n,r)=>{r(e)})}static waitFor(e){return new V((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=V.resolve(!1);for(const r of e)n=n.next(i=>i?V.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new V((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const h=u;n(e[h]).next(f=>{o[h]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new V((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function vP(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function Wl(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H_{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}H_.oe=-1;function Fd(t){return t==null}function fl(t){return t===0&&1/t==-1/0}function _P(t){return typeof t=="number"&&Number.isInteger(t)&&!fl(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wm(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function _o(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function W_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,n){this.comparator=e,this.root=n||Ve.EMPTY}insert(e,n){return new ut(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ve.BLACK,null,null))}remove(e){return new ut(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ve.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new aa(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new aa(this.root,e,this.comparator,!1)}getReverseIterator(){return new aa(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new aa(this.root,e,this.comparator,!0)}}class aa{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ve{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??Ve.RED,this.left=i??Ve.EMPTY,this.right=s??Ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new Ve(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return Ve.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw X();const e=this.left.check();if(e!==this.right.check())throw X();return e+(this.isRed()?0:1)}}Ve.EMPTY=null,Ve.RED=!0,Ve.BLACK=!1;Ve.EMPTY=new class{constructor(){this.size=0}get key(){throw X()}get value(){throw X()}get color(){throw X()}get left(){throw X()}get right(){throw X()}copy(e,n,r,i,s){return this}insert(e,n,r){return new Ve(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.comparator=e,this.data=new ut(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Km(this.data.getIterator())}getIteratorFrom(e){return new Km(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Qe)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Qe(this.comparator);return n.data=e,n}}class Km{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(e){this.fields=e,e.sort(Fe.comparator)}static empty(){return new Lt([])}unionWith(e){let n=new Qe(Fe.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Lt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Si(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wP extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new wP("Invalid base64 string: "+s):s}}(e);return new Gt(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Gt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return se(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Gt.EMPTY_BYTE_STRING=new Gt("");const EP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Mr(t){if(Te(!!t),typeof t=="string"){let e=0;const n=EP.exec(t);if(Te(!!n),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Me(t.seconds),nanos:Me(t.nanos)}}function Me(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Zs(t){return typeof t=="string"?Gt.fromBase64String(t):Gt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bd(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function K_(t){const e=t.mapValue.fields.__previous_value__;return bd(e)?K_(e):e}function pl(t){const e=Mr(t.mapValue.fields.__local_write_time__.timestampValue);return new De(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TP{constructor(e,n,r,i,s,o,l,u,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h}}class ml{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ml("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ml&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Ri(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?bd(t)?4:SP(t)?9007199254740991:IP(t)?10:11:X()}function qt(t,e){if(t===e)return!0;const n=Ri(t);if(n!==Ri(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return pl(t).isEqual(pl(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Mr(i.timestampValue),l=Mr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return Zs(i.bytesValue).isEqual(Zs(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Me(i.geoPointValue.latitude)===Me(s.geoPointValue.latitude)&&Me(i.geoPointValue.longitude)===Me(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Me(i.integerValue)===Me(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Me(i.doubleValue),l=Me(s.doubleValue);return o===l?fl(o)===fl(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return Si(t.arrayValue.values||[],e.arrayValue.values||[],qt);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Wm(o)!==Wm(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!qt(o[u],l[u])))return!1;return!0}(t,e);default:return X()}}function eo(t,e){return(t.values||[]).find(n=>qt(n,e))!==void 0}function Ai(t,e){if(t===e)return 0;const n=Ri(t),r=Ri(e);if(n!==r)return se(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return se(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=Me(s.integerValue||s.doubleValue),u=Me(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Gm(t.timestampValue,e.timestampValue);case 4:return Gm(pl(t),pl(e));case 5:return se(t.stringValue,e.stringValue);case 6:return function(s,o){const l=Zs(s),u=Zs(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=se(l[h],u[h]);if(f!==0)return f}return se(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=se(Me(s.latitude),Me(o.latitude));return l!==0?l:se(Me(s.longitude),Me(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return qm(t.arrayValue,e.arrayValue);case 10:return function(s,o){var l,u,h,f;const m=s.fields||{},y=o.fields||{},P=(l=m.value)===null||l===void 0?void 0:l.arrayValue,R=(u=y.value)===null||u===void 0?void 0:u.arrayValue,N=se(((h=P==null?void 0:P.values)===null||h===void 0?void 0:h.length)||0,((f=R==null?void 0:R.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:qm(P,R)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===la.mapValue&&o===la.mapValue)return 0;if(s===la.mapValue)return 1;if(o===la.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){const y=se(u[m],f[m]);if(y!==0)return y;const P=Ai(l[u[m]],h[f[m]]);if(P!==0)return P}return se(u.length,f.length)}(t.mapValue,e.mapValue);default:throw X()}}function Gm(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return se(t,e);const n=Mr(t),r=Mr(e),i=se(n.seconds,r.seconds);return i!==0?i:se(n.nanos,r.nanos)}function qm(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=Ai(n[i],r[i]);if(s)return s}return se(n.length,r.length)}function Pi(t){return hh(t)}function hh(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Mr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Zs(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return q.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=hh(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${hh(n.fields[o])}`;return i+"}"}(t.mapValue):X()}function dh(t){return!!t&&"integerValue"in t}function Ud(t){return!!t&&"arrayValue"in t}function xa(t){return!!t&&"mapValue"in t}function IP(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function Ps(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return _o(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Ps(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Ps(t.arrayValue.values[n]);return e}return Object.assign({},t)}function SP(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!xa(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ps(n)}setAll(e){let n=Fe.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Ps(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());xa(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return qt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];xa(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){_o(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Dt(Ps(this.value))}}function G_(t){const e=[];return _o(t.fields,(n,r)=>{const i=new Fe([n]);if(xa(r)){const s=G_(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Lt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new xt(e,0,pe.min(),pe.min(),pe.min(),Dt.empty(),0)}static newFoundDocument(e,n,r,i){return new xt(e,1,n,pe.min(),r,i,0)}static newNoDocument(e,n){return new xt(e,2,n,pe.min(),pe.min(),Dt.empty(),0)}static newUnknownDocument(e,n){return new xt(e,3,n,pe.min(),pe.min(),Dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(pe.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=pe.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof xt&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new xt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl{constructor(e,n){this.position=e,this.inclusive=n}}function Qm(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=q.comparator(q.fromName(o.referenceValue),n.key):r=Ai(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ym(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!qt(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,n="asc"){this.field=e,this.dir=n}}function RP(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q_{}class Ne extends q_{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new PP(e,n,r):n==="array-contains"?new NP(e,r):n==="in"?new xP(e,r):n==="not-in"?new DP(e,r):n==="array-contains-any"?new OP(e,r):new Ne(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new CP(e,r):new kP(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Ai(n,this.value)):n!==null&&Ri(this.value)===Ri(n)&&this.matchesComparison(Ai(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class nr extends q_{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new nr(e,n)}matches(e){return Q_(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Q_(t){return t.op==="and"}function Y_(t){return AP(t)&&Q_(t)}function AP(t){for(const e of t.filters)if(e instanceof nr)return!1;return!0}function fh(t){if(t instanceof Ne)return t.field.canonicalString()+t.op.toString()+Pi(t.value);if(Y_(t))return t.filters.map(e=>fh(e)).join(",");{const e=t.filters.map(n=>fh(n)).join(",");return`${t.op}(${e})`}}function X_(t,e){return t instanceof Ne?function(r,i){return i instanceof Ne&&r.op===i.op&&r.field.isEqual(i.field)&&qt(r.value,i.value)}(t,e):t instanceof nr?function(r,i){return i instanceof nr&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&X_(o,i.filters[l]),!0):!1}(t,e):void X()}function J_(t){return t instanceof Ne?function(n){return`${n.field.canonicalString()} ${n.op} ${Pi(n.value)}`}(t):t instanceof nr?function(n){return n.op.toString()+" {"+n.getFilters().map(J_).join(" ,")+"}"}(t):"Filter"}class PP extends Ne{constructor(e,n,r){super(e,n,r),this.key=q.fromName(r.referenceValue)}matches(e){const n=q.comparator(e.key,this.key);return this.matchesComparison(n)}}class CP extends Ne{constructor(e,n){super(e,"in",n),this.keys=Z_("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class kP extends Ne{constructor(e,n){super(e,"not-in",n),this.keys=Z_("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Z_(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>q.fromName(r.referenceValue))}class NP extends Ne{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Ud(n)&&eo(n.arrayValue,this.value)}}class xP extends Ne{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&eo(this.value.arrayValue,n)}}class DP extends Ne{constructor(e,n){super(e,"not-in",n)}matches(e){if(eo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!eo(this.value.arrayValue,n)}}class OP extends Ne{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Ud(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>eo(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LP{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.ue=null}}function Xm(t,e=null,n=[],r=[],i=null,s=null,o=null){return new LP(t,e,n,r,i,s,o)}function jd(t){const e=ae(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>fh(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Fd(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>Pi(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>Pi(r)).join(",")),e.ue=n}return e.ue}function Bd(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!RP(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!X_(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ym(t.startAt,e.startAt)&&Ym(t.endAt,e.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function VP(t,e,n,r,i,s,o,l){return new Kl(t,e,n,r,i,s,o,l)}function MP(t){return new Kl(t)}function Jm(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function FP(t){return t.collectionGroup!==null}function Cs(t){const e=ae(t);if(e.ce===null){e.ce=[];const n=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Qe(Fe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.ce.push(new yl(s,r))}),n.has(Fe.keyField().canonicalString())||e.ce.push(new yl(Fe.keyField(),r))}return e.ce}function Rr(t){const e=ae(t);return e.le||(e.le=bP(e,Cs(t))),e.le}function bP(t,e){if(t.limitType==="F")return Xm(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new yl(i.field,s)});const n=t.endAt?new gl(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new gl(t.startAt.position,t.startAt.inclusive):null;return Xm(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function ph(t,e,n){return new Kl(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function e0(t,e){return Bd(Rr(t),Rr(e))&&t.limitType===e.limitType}function t0(t){return`${jd(Rr(t))}|lt:${t.limitType}`}function us(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>J_(i)).join(", ")}]`),Fd(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>Pi(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>Pi(i)).join(",")),`Target(${r})`}(Rr(t))}; limitType=${t.limitType})`}function $d(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):q.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of Cs(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const h=Qm(o,l,u);return o.inclusive?h<=0:h<0}(r.startAt,Cs(r),i)||r.endAt&&!function(o,l,u){const h=Qm(o,l,u);return o.inclusive?h>=0:h>0}(r.endAt,Cs(r),i))}(t,e)}function UP(t){return(e,n)=>{let r=!1;for(const i of Cs(t)){const s=jP(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function jP(t,e,n){const r=t.field.isKeyField()?q.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),h=l.data.field(s);return u!==null&&h!==null?Ai(u,h):X()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return X()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){_o(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return W_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BP=new ut(q.comparator);function vl(){return BP}const n0=new ut(q.comparator);function ua(...t){let e=n0;for(const n of t)e=e.insert(n.key,n);return e}function r0(t){let e=n0;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Er(){return ks()}function i0(){return ks()}function ks(){return new bi(t=>t.toString(),(t,e)=>t.isEqual(e))}const $P=new ut(q.comparator),zP=new Qe(q.comparator);function qe(...t){let e=zP;for(const n of t)e=e.add(n);return e}const HP=new Qe(se);function WP(){return HP}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zd(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:fl(e)?"-0":e}}function s0(t){return{integerValue:""+t}}function KP(t,e){return _P(e)?s0(e):zd(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(){this._=void 0}}function GP(t,e,n){return t instanceof _l?function(i,s){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&bd(s)&&(s=K_(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(n,e):t instanceof to?a0(t,e):t instanceof no?l0(t,e):function(i,s){const o=o0(i,s),l=Zm(o)+Zm(i.Pe);return dh(o)&&dh(i.Pe)?s0(l):zd(i.serializer,l)}(t,e)}function qP(t,e,n){return t instanceof to?a0(t,e):t instanceof no?l0(t,e):n}function o0(t,e){return t instanceof wl?function(r){return dh(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class _l extends Gl{}class to extends Gl{constructor(e){super(),this.elements=e}}function a0(t,e){const n=u0(e);for(const r of t.elements)n.some(i=>qt(i,r))||n.push(r);return{arrayValue:{values:n}}}class no extends Gl{constructor(e){super(),this.elements=e}}function l0(t,e){let n=u0(e);for(const r of t.elements)n=n.filter(i=>!qt(i,r));return{arrayValue:{values:n}}}class wl extends Gl{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function Zm(t){return Me(t.integerValue||t.doubleValue)}function u0(t){return Ud(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function QP(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof to&&i instanceof to||r instanceof no&&i instanceof no?Si(r.elements,i.elements,qt):r instanceof wl&&i instanceof wl?qt(r.Pe,i.Pe):r instanceof _l&&i instanceof _l}(t.transform,e.transform)}class YP{constructor(e,n){this.version=e,this.transformResults=n}}class mn{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new mn}static exists(e){return new mn(void 0,e)}static updateTime(e){return new mn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Da(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class ql{}function c0(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new d0(t.key,mn.none()):new wo(t.key,t.data,mn.none());{const n=t.data,r=Dt.empty();let i=new Qe(Fe.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Ur(t.key,r,new Lt(i.toArray()),mn.none())}}function XP(t,e,n){t instanceof wo?function(i,s,o){const l=i.value.clone(),u=tg(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Ur?function(i,s,o){if(!Da(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=tg(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(h0(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Ns(t,e,n,r){return t instanceof wo?function(s,o,l,u){if(!Da(s.precondition,o))return l;const h=s.value.clone(),f=ng(s.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof Ur?function(s,o,l,u){if(!Da(s.precondition,o))return l;const h=ng(s.fieldTransforms,u,o),f=o.data;return f.setAll(h0(s)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(t,e,n,r):function(s,o,l){return Da(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function JP(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=o0(r.transform,i||null);s!=null&&(n===null&&(n=Dt.empty()),n.set(r.field,s))}return n||null}function eg(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&Si(r,i,(s,o)=>QP(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class wo extends ql{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ur extends ql{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function h0(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function tg(t,e,n){const r=new Map;Te(t.length===n.length);for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,qP(o,l,n[i]))}return r}function ng(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,GP(s,o,e))}return r}class d0 extends ql{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ZP extends ql{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eC{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&XP(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Ns(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Ns(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=i0();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=c0(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(pe.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),qe())}isEqual(e){return this.batchId===e.batchId&&Si(this.mutations,e.mutations,(n,r)=>eg(n,r))&&Si(this.baseMutations,e.baseMutations,(n,r)=>eg(n,r))}}class Hd{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){Te(e.mutations.length===r.length);let i=function(){return $P}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new Hd(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tC{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie,J;function nC(t){switch(t){default:return X();case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0}}function rC(t){if(t===void 0)return Vr("GRPC error has no .code"),F.UNKNOWN;switch(t){case Ie.OK:return F.OK;case Ie.CANCELLED:return F.CANCELLED;case Ie.UNKNOWN:return F.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return F.INTERNAL;case Ie.UNAVAILABLE:return F.UNAVAILABLE;case Ie.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Ie.NOT_FOUND:return F.NOT_FOUND;case Ie.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Ie.ABORTED:return F.ABORTED;case Ie.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Ie.DATA_LOSS:return F.DATA_LOSS;default:return X()}}(J=Ie||(Ie={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new V_([4294967295,4294967295],0);class iC{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function mh(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function sC(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function oC(t,e){return mh(t,e.toTimestamp())}function pi(t){return Te(!!t),pe.fromTimestamp(function(n){const r=Mr(n);return new De(r.seconds,r.nanos)}(t))}function f0(t,e){return gh(t,e).canonicalString()}function gh(t,e){const n=function(i){return new Se(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function aC(t){const e=Se.fromString(t);return Te(mC(e)),e}function yh(t,e){return f0(t.databaseId,e.path)}function lC(t){const e=aC(t);return e.length===4?Se.emptyPath():cC(e)}function uC(t){return new Se(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function cC(t){return Te(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function rg(t,e,n){return{name:yh(t,e),fields:n.value.mapValue.fields}}function hC(t,e){let n;if(e instanceof wo)n={update:rg(t,e.key,e.value)};else if(e instanceof d0)n={delete:yh(t,e.key)};else if(e instanceof Ur)n={update:rg(t,e.key,e.data),updateMask:pC(e.fieldMask)};else{if(!(e instanceof ZP))return X();n={verify:yh(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof _l)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof to)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof no)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof wl)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw X()}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:oC(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:X()}(t,e.precondition)),n}function dC(t,e){return t&&t.length>0?(Te(e!==void 0),t.map(n=>function(i,s){let o=i.updateTime?pi(i.updateTime):pi(s);return o.isEqual(pe.min())&&(o=pi(s)),new YP(o,i.transformResults||[])}(n,e))):[]}function fC(t){let e=lC(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){Te(r===1);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(m){const y=p0(m);return y instanceof nr&&Y_(y)?y.getFilters():[y]}(n.where));let o=[];n.orderBy&&(o=function(m){return m.map(y=>function(R){return new yl(Wr(R.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(y))}(n.orderBy));let l=null;n.limit&&(l=function(m){let y;return y=typeof m=="object"?m.value:m,Fd(y)?null:y}(n.limit));let u=null;n.startAt&&(u=function(m){const y=!!m.before,P=m.values||[];return new gl(P,y)}(n.startAt));let h=null;return n.endAt&&(h=function(m){const y=!m.before,P=m.values||[];return new gl(P,y)}(n.endAt)),VP(e,i,o,s,l,"F",u,h)}function p0(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Wr(n.unaryFilter.field);return Ne.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Wr(n.unaryFilter.field);return Ne.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Wr(n.unaryFilter.field);return Ne.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Wr(n.unaryFilter.field);return Ne.create(o,"!=",{nullValue:"NULL_VALUE"});default:return X()}}(t):t.fieldFilter!==void 0?function(n){return Ne.create(Wr(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return X()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return nr.create(n.compositeFilter.filters.map(r=>p0(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return X()}}(n.compositeFilter.op))}(t):X()}function Wr(t){return Fe.fromServerFormat(t.fieldPath)}function pC(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function mC(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gC{constructor(e){this.ct=e}}function yC(t){const e=fC({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?ph(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vC{constructor(){this.un=new _C}addToCollectionParentIndex(e,n){return this.un.add(n),V.resolve()}getCollectionParents(e,n){return V.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return V.resolve()}deleteFieldIndex(e,n){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,n){return V.resolve()}getDocumentsMatchingTarget(e,n){return V.resolve(null)}getIndexType(e,n){return V.resolve(0)}getFieldIndexes(e,n){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,n){return V.resolve(tr.min())}getMinOffsetFromCollectionGroup(e,n){return V.resolve(tr.min())}updateCollectionGroup(e,n,r){return V.resolve()}updateIndexEntries(e,n){return V.resolve()}}class _C{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Qe(Se.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Qe(Se.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Ci(0)}static kn(){return new Ci(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wC{constructor(){this.changes=new bi(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,xt.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?V.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TC{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Ns(r.mutation,i,Lt.empty(),De.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,qe()).next(()=>r))}getLocalViewOfDocuments(e,n,r=qe()){const i=Er();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=ua();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Er();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,qe()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=vl();const o=ks(),l=function(){return ks()}();return n.forEach((u,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Ur)?s=s.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Ns(f.mutation,h,f.mutation.getFieldMask(),De.now())):o.set(h.key,Lt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((h,f)=>o.set(h,f)),n.forEach((h,f)=>{var m;return l.set(h,new EC(f,(m=o.get(h))!==null&&m!==void 0?m:null))}),l))}recalculateAndSaveOverlays(e,n){const r=ks();let i=new ut((o,l)=>o-l),s=qe();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=n.get(u);if(h===null)return;let f=r.get(u)||Lt.empty();f=l.applyToLocalView(h,f),r.set(u,f);const m=(i.get(l.batchId)||qe()).add(u);i=i.insert(l.batchId,m)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,m=i0();f.forEach(y=>{if(!s.has(y)){const P=c0(n.get(y),r.get(y));P!==null&&m.set(y,P),s=s.add(y)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,m))}return V.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return function(o){return q.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):FP(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):V.resolve(Er());let l=-1,u=s;return o.next(h=>V.forEach(h,(f,m)=>(l<m.largestBatchId&&(l=m.largestBatchId),s.get(f)?V.resolve():this.remoteDocumentCache.getEntry(e,f).next(y=>{u=u.insert(f,y)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,u,h,qe())).next(f=>({batchId:l,changes:r0(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new q(n)).next(r=>{let i=ua();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=ua();return this.indexManager.getCollectionParents(e,s).next(l=>V.forEach(l,u=>{const h=function(m,y){return new Kl(y,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((m,y)=>{o=o.insert(m,y)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,xt.newInvalidDocument(f)))});let l=ua();return o.forEach((u,h)=>{const f=s.get(u);f!==void 0&&Ns(f.mutation,h,Lt.empty(),De.now()),$d(n,h)&&(l=l.insert(u,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IC{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return V.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(i){return{id:i.id,version:i.version,createTime:pi(i.createTime)}}(n)),V.resolve()}getNamedQuery(e,n){return V.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(i){return{name:i.name,query:yC(i.bundledQuery),readTime:pi(i.readTime)}}(n)),V.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SC{constructor(){this.overlays=new ut(q.comparator),this.Ir=new Map}getOverlay(e,n){return V.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Er();return V.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.ht(e,n,s)}),V.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Ir.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(r)),V.resolve()}getOverlaysForCollection(e,n,r){const i=Er(),s=n.length+1,o=new q(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return V.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new ut((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=Er(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Er(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return V.resolve(l)}ht(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Ir.get(i.largestBatchId).delete(r.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new tC(n,r));let s=this.Ir.get(n);s===void 0&&(s=qe(),this.Ir.set(n,s)),this.Ir.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RC{constructor(){this.sessionToken=Gt.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,V.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(){this.Tr=new Qe(Ce.Er),this.dr=new Qe(Ce.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new Ce(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new Ce(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new q(new Se([])),r=new Ce(n,e),i=new Ce(n,e+1),s=[];return this.dr.forEachInRange([r,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new q(new Se([])),r=new Ce(n,e),i=new Ce(n,e+1);let s=qe();return this.dr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new Ce(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class Ce{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return q.comparator(e.key,n.key)||se(e.wr,n.wr)}static Ar(e,n){return se(e.wr,n.wr)||q.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AC{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new Qe(Ce.Er)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new eC(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.br=this.br.add(new Ce(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,n){return V.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.vr(r),s=i<0?0:i;return V.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new Ce(n,0),i=new Ce(n,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([r,i],o=>{const l=this.Dr(o.wr);s.push(l)}),V.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Qe(se);return n.forEach(i=>{const s=new Ce(i,0),o=new Ce(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],l=>{r=r.add(l.wr)})}),V.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;q.isDocumentKey(s)||(s=s.child(""));const o=new Ce(new q(s),0);let l=new Qe(se);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.wr)),!0)},o),V.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const i=this.Dr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){Te(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return V.forEach(n.mutations,i=>{const s=new Ce(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new Ce(n,0),i=this.br.firstAfterOrEqual(r);return V.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PC{constructor(e){this.Mr=e,this.docs=function(){return new ut(q.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return V.resolve(r?r.document.mutableCopy():xt.newInvalidDocument(n))}getEntries(e,n){let r=vl();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():xt.newInvalidDocument(i))}),V.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=vl();const o=n.path,l=new q(o.child("")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||mP(pP(f),r)<=0||(i.has(f.key)||$d(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return V.resolve(s)}getAllFromCollectionGroup(e,n,r,i){X()}Or(e,n){return V.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new CC(this)}getSize(e){return V.resolve(this.size)}}class CC extends wC{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.cr.addEntry(e,i)):this.cr.removeEntry(r)}),V.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kC{constructor(e){this.persistence=e,this.Nr=new bi(n=>jd(n),Bd),this.lastRemoteSnapshotVersion=pe.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Wd,this.targetCount=0,this.kr=Ci.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,i)=>n(i)),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),V.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new Ci(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,V.resolve()}updateTargetData(e,n){return this.Kn(n),V.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),V.waitFor(s).next(()=>i)}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return V.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),V.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),V.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),V.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return V.resolve(r)}containsKey(e,n){return V.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NC{constructor(e,n){this.qr={},this.overlays={},this.Qr=new H_(0),this.Kr=!1,this.Kr=!0,this.$r=new RC,this.referenceDelegate=e(this),this.Ur=new kC(this),this.indexManager=new vC,this.remoteDocumentCache=function(i){return new PC(i)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new gC(n),this.Gr=new IC(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new SC,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new AC(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){z("MemoryPersistence","Starting transaction:",e);const i=new xC(this.Qr.next());return this.referenceDelegate.zr(),r(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,n){return V.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class xC extends yP{constructor(e){super(),this.currentSequenceNumber=e}}class Kd{constructor(e){this.persistence=e,this.Jr=new Wd,this.Yr=null}static Zr(e){return new Kd(e)}get Xr(){if(this.Yr)return this.Yr;throw X()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),V.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),V.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),V.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(i=>this.Xr.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.Xr,r=>{const i=q.fromPath(r);return this.ei(e,i).next(s=>{s||n.removeEntry(i,pe.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return V.or([()=>V.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=i}static Wi(e,n){let r=qe(),i=qe();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Gd(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DC{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OC{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return A1()?8:vP(Xe())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.Yi(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new DC;return this.Xi(e,n,o).next(l=>{if(s.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>s.result)}es(e,n,r,i){return r.documentReadCount<this.ji?(ls()<=Y.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",us(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),V.resolve()):(ls()<=Y.DEBUG&&z("QueryEngine","Query:",us(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Hi*i?(ls()<=Y.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",us(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Rr(n))):V.resolve())}Yi(e,n){if(Jm(n))return V.resolve(null);let r=Rr(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=ph(n,null,"F"),r=Rr(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=qe(...s);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(n,l);return this.ns(n,h,o,u.readTime)?this.Yi(e,ph(n,null,"F")):this.rs(e,h,n,u)}))})))}Zi(e,n,r,i){return Jm(n)||i.isEqual(pe.min())?V.resolve(null):this.Ji.getDocuments(e,r).next(s=>{const o=this.ts(n,s);return this.ns(n,o,r,i)?V.resolve(null):(ls()<=Y.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),us(n)),this.rs(e,o,n,fP(i,-1)).next(l=>l))})}ts(e,n){let r=new Qe(UP(e));return n.forEach((i,s)=>{$d(e,s)&&(r=r.add(s))}),r}ns(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,n,r){return ls()<=Y.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",us(n)),this.Ji.getDocumentsMatchingQuery(e,n,tr.min(),r)}rs(e,n,r,i){return this.Ji.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LC{constructor(e,n,r,i){this.persistence=e,this.ss=n,this.serializer=i,this.os=new ut(se),this._s=new bi(s=>jd(s),Bd),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new TC(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function VC(t,e,n,r){return new LC(t,e,n,r)}async function m0(t,e){const n=ae(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=qe();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function MC(t,e){const n=ae(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const m=h.batch,y=m.keys();let P=V.resolve();return y.forEach(R=>{P=P.next(()=>f.getEntry(u,R)).next(N=>{const D=h.docVersions.get(R);Te(D!==null),N.version.compareTo(D)<0&&(m.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),P.next(()=>l.mutationQueue.removeMutationBatch(u,m))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=qe();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function FC(t){const e=ae(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function bC(t,e){const n=ae(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}class ig{constructor(){this.activeTargetIds=WP()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class UC{constructor(){this.so=new ig,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ig,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jC{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){z("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){z("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ca=null;function rc(){return ca===null?ca=function(){return 268435456+Math.round(2147483648*Math.random())}():ca++,"0x"+ca.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BC={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $C{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const We="WebChannelConnection";class zC extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(n,r,i,s,o){const l=rc(),u=this.xo(n,r.toUriEncodedString());z("RestConnection",`Sending RPC '${n}' ${l}:`,u,i);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,s,o),this.No(n,u,h,i).then(f=>(z("RestConnection",`Received RPC '${n}' ${l}: `,f),f),f=>{throw dl("RestConnection",`RPC '${n}' ${l} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(n,r,i,s,o,l){return this.Mo(n,r,i,s,o)}Oo(n,r,i){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Fi}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((s,o)=>n[o]=s),i&&i.headers.forEach((s,o)=>n[o]=s)}xo(n,r){const i=BC[n];return`${this.Do}/v1/${r}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,i){const s=rc();return new Promise((o,l)=>{const u=new M_;u.setWithCredentials(!0),u.listenOnce(F_.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Na.NO_ERROR:const f=u.getResponseJson();z(We,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case Na.TIMEOUT:z(We,`RPC '${e}' ${s} timed out`),l(new W(F.DEADLINE_EXCEEDED,"Request time out"));break;case Na.HTTP_ERROR:const m=u.getStatus();if(z(We,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let y=u.getResponseJson();Array.isArray(y)&&(y=y[0]);const P=y==null?void 0:y.error;if(P&&P.status&&P.message){const R=function(D){const w=D.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(w)>=0?w:F.UNKNOWN}(P.status);l(new W(R,P.message))}else l(new W(F.UNKNOWN,"Server responded with status "+u.getStatus()))}else l(new W(F.UNAVAILABLE,"Connection failed."));break;default:X()}}finally{z(We,`RPC '${e}' ${s} completed.`)}});const h=JSON.stringify(i);z(We,`RPC '${e}' ${s} sending request:`,i),u.send(n,"POST",h,r,15)})}Bo(e,n,r){const i=rc(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=j_(),l=U_(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,n,r),u.encodeInitMessageHeaders=!0;const f=s.join("");z(We,`Creating RPC '${e}' stream ${i}: ${f}`,u);const m=o.createWebChannel(f,u);let y=!1,P=!1;const R=new $C({Io:D=>{P?z(We,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(y||(z(We,`Opening RPC '${e}' stream ${i} transport.`),m.open(),y=!0),z(We,`RPC '${e}' stream ${i} sending:`,D),m.send(D))},To:()=>m.close()}),N=(D,w,v)=>{D.listen(w,T=>{try{v(T)}catch(O){setTimeout(()=>{throw O},0)}})};return N(m,gs.EventType.OPEN,()=>{P||(z(We,`RPC '${e}' stream ${i} transport opened.`),R.yo())}),N(m,gs.EventType.CLOSE,()=>{P||(P=!0,z(We,`RPC '${e}' stream ${i} transport closed`),R.So())}),N(m,gs.EventType.ERROR,D=>{P||(P=!0,dl(We,`RPC '${e}' stream ${i} transport errored:`,D),R.So(new W(F.UNAVAILABLE,"The operation could not be completed")))}),N(m,gs.EventType.MESSAGE,D=>{var w;if(!P){const v=D.data[0];Te(!!v);const T=v,O=T.error||((w=T[0])===null||w===void 0?void 0:w.error);if(O){z(We,`RPC '${e}' stream ${i} received error:`,O);const b=O.status;let U=function(_){const I=Ie[_];if(I!==void 0)return rC(I)}(b),E=O.message;U===void 0&&(U=F.INTERNAL,E="Unknown error status: "+b+" with message "+O.message),P=!0,R.So(new W(U,E)),m.close()}else z(We,`RPC '${e}' stream ${i} received:`,v),R.bo(v)}}),N(l,b_.STAT_EVENT,D=>{D.stat===ch.PROXY?z(We,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===ch.NOPROXY&&z(We,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{R.wo()},0),R}}function ic(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ql(t){return new iC(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g0{constructor(e,n,r=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),i=Math.max(0,n-r);i>0&&z("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HC{constructor(e,n,r,i,s,o,l,u){this.ui=e,this.Ho=r,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new g0(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===F.RESOURCE_EXHAUSTED?(Vr(n.toString()),Vr("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.Yo===n&&this.P_(r,i)},r=>{e(()=>{const i=new W(F.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(i)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{r(()=>this.I_(i))}),this.stream.onMessage(i=>{r(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return z("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(z("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class WC extends HC{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Te(!!e.streamToken),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Te(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=dC(e.writeResults,e.commitTime),r=pi(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=uC(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>hC(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KC extends class{}{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new W(F.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,gh(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new W(F.UNKNOWN,s.toString())})}Lo(e,n,r,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,gh(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new W(F.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class GC{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Vr(n),this.D_=!1):z("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qC{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{r.enqueueAndForget(async()=>{To(this)&&(z("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=ae(u);h.L_.add(4),await Eo(h),h.q_.set("Unknown"),h.L_.delete(4),await Yl(h)}(this))})}),this.q_=new GC(r,i)}}async function Yl(t){if(To(t))for(const e of t.B_)await e(!0)}async function Eo(t){for(const e of t.B_)await e(!1)}function To(t){return ae(t).L_.size===0}async function y0(t,e,n){if(!Wl(e))throw e;t.L_.add(1),await Eo(t),t.q_.set("Offline"),n||(n=()=>FC(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{z("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Yl(t)})}function v0(t,e){return e().catch(n=>y0(t,n,e))}async function Xl(t){const e=ae(t),n=rr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;QC(e);)try{const i=await bC(e.localStore,r);if(i===null){e.O_.length===0&&n.o_();break}r=i.batchId,YC(e,i)}catch(i){await y0(e,i)}_0(e)&&w0(e)}function QC(t){return To(t)&&t.O_.length<10}function YC(t,e){t.O_.push(e);const n=rr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function _0(t){return To(t)&&!rr(t).n_()&&t.O_.length>0}function w0(t){rr(t).start()}async function XC(t){rr(t).p_()}async function JC(t){const e=rr(t);for(const n of t.O_)e.m_(n.mutations)}async function ZC(t,e,n){const r=t.O_.shift(),i=Hd.from(r,e,n);await v0(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await Xl(t)}async function ek(t,e){e&&rr(t).V_&&await async function(r,i){if(function(o){return nC(o)&&o!==F.ABORTED}(i.code)){const s=r.O_.shift();rr(r).s_(),await v0(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Xl(r)}}(t,e),_0(t)&&w0(t)}async function og(t,e){const n=ae(t);n.asyncQueue.verifyOperationInProgress(),z("RemoteStore","RemoteStore received new credentials");const r=To(n);n.L_.add(3),await Eo(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Yl(n)}async function tk(t,e){const n=ae(t);e?(n.L_.delete(2),await Yl(n)):e||(n.L_.add(2),await Eo(n),n.q_.set("Unknown"))}function rr(t){return t.U_||(t.U_=function(n,r,i){const s=ae(n);return s.w_(),new WC(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:XC.bind(null,t),mo:ek.bind(null,t),f_:JC.bind(null,t),g_:ZC.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Xl(t)):(await t.U_.stop(),t.O_.length>0&&(z("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qd{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Sr,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new qd(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function E0(t,e){if(Vr("AsyncQueue",`${e}: ${t}`),Wl(t))return new W(F.UNAVAILABLE,`${e}: ${t}`);throw t}class nk{constructor(){this.queries=ag(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const i=ae(n),s=i.queries;i.queries=ag(),s.forEach((o,l)=>{for(const u of l.j_)u.onError(r)})})(this,new W(F.ABORTED,"Firestore shutting down"))}}function ag(){return new bi(t=>t0(t),e0)}function rk(t){t.Y_.forEach(e=>{e.next()})}var lg,ug;(ug=lg||(lg={})).ea="default",ug.Cache="cache";class ik{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new bi(l=>t0(l),e0),this.Ma=new Map,this.xa=new Set,this.Oa=new ut(q.comparator),this.Na=new Map,this.La=new Wd,this.Ba={},this.ka=new Map,this.qa=Ci.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function sk(t,e,n){const r=uk(t);try{const i=await function(o,l){const u=ae(o),h=De.now(),f=l.reduce((P,R)=>P.add(R.key),qe());let m,y;return u.persistence.runTransaction("Locally write mutations","readwrite",P=>{let R=vl(),N=qe();return u.cs.getEntries(P,f).next(D=>{R=D,R.forEach((w,v)=>{v.isValidDocument()||(N=N.add(w))})}).next(()=>u.localDocuments.getOverlayedDocuments(P,R)).next(D=>{m=D;const w=[];for(const v of l){const T=JP(v,m.get(v.key).overlayedDocument);T!=null&&w.push(new Ur(v.key,T,G_(T.value.mapValue),mn.exists(!0)))}return u.mutationQueue.addMutationBatch(P,h,w,l)}).next(D=>{y=D;const w=D.applyToLocalDocumentSet(m,N);return u.documentOverlayCache.saveOverlays(P,D.batchId,w)})}).then(()=>({batchId:y.batchId,changes:r0(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let h=o.Ba[o.currentUser.toKey()];h||(h=new ut(se)),h=h.insert(l,u),o.Ba[o.currentUser.toKey()]=h}(r,i.batchId,n),await Jl(r,i.changes),await Xl(r.remoteStore)}catch(i){const s=E0(i,"Failed to persist write");n.reject(s)}}function cg(t,e,n){const r=ae(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Fa.forEach((s,o)=>{const l=o.view.Z_(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=ae(o);u.onlineState=l;let h=!1;u.queries.forEach((f,m)=>{for(const y of m.j_)y.Z_(l)&&(h=!0)}),h&&rk(u)}(r.eventManager,e),i.length&&r.Ca.d_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function ok(t,e){const n=ae(t),r=e.batch.batchId;try{const i=await MC(n.localStore,e);I0(n,r,null),T0(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Jl(n,i)}catch(i){await z_(i)}}async function ak(t,e,n){const r=ae(t);try{const i=await function(o,l){const u=ae(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(m=>(Te(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(h,m))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);I0(r,e,n),T0(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Jl(r,i)}catch(i){await z_(i)}}function T0(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function I0(t,e,n){const r=ae(t);let i=r.Ba[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.Ba[r.currentUser.toKey()]=i}}async function Jl(t,e,n){const r=ae(t),i=[],s=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,u)=>{o.push(r.Ka(u,e,n).then(h=>{var f;if((h||n)&&r.isPrimaryClient){const m=h?!h.fromCache:(f=void 0)===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(h){i.push(h);const m=Gd.Wi(u.targetId,h);s.push(m)}}))}),await Promise.all(o),r.Ca.d_(i),await async function(u,h){const f=ae(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>V.forEach(h,y=>V.forEach(y.$i,P=>f.persistence.referenceDelegate.addReference(m,y.targetId,P)).next(()=>V.forEach(y.Ui,P=>f.persistence.referenceDelegate.removeReference(m,y.targetId,P)))))}catch(m){if(!Wl(m))throw m;z("LocalStore","Failed to update sequence numbers: "+m)}for(const m of h){const y=m.targetId;if(!m.fromCache){const P=f.os.get(y),R=P.snapshotVersion,N=P.withLastLimboFreeSnapshotVersion(R);f.os=f.os.insert(y,N)}}}(r.localStore,s))}async function lk(t,e){const n=ae(t);if(!n.currentUser.isEqual(e)){z("SyncEngine","User change. New user:",e.toKey());const r=await m0(n.localStore,e);n.currentUser=e,function(s,o){s.ka.forEach(l=>{l.forEach(u=>{u.reject(new W(F.CANCELLED,o))})}),s.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Jl(n,r.hs)}}function uk(t){const e=ae(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ok.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=ak.bind(null,e),e}class El{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Ql(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return VC(this.persistence,new OC,e.initialUser,this.serializer)}Ga(e){return new NC(Kd.Zr,this.serializer)}Wa(e){return new UC}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}El.provider={build:()=>new El};class vh{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>cg(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=lk.bind(null,this.syncEngine),await tk(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new nk}()}createDatastore(e){const n=Ql(e.databaseInfo.databaseId),r=function(s){return new zC(s)}(e.databaseInfo);return function(s,o,l,u){return new KC(s,o,l,u)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new qC(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>cg(this.syncEngine,n,0),function(){return sg.D()?new sg:new jC}())}createSyncEngine(e,n){return function(i,s,o,l,u,h,f){const m=new ik(i,s,o,l,u,h);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=ae(i);z("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Eo(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}vh.provider={build:()=>new vh};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ck{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=i,this.user=Ke.UNAUTHENTICATED,this.clientId=$_.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{z("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(z("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Sr;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=E0(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function sc(t,e){t.asyncQueue.verifyOperationInProgress(),z("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await m0(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function hg(t,e){t.asyncQueue.verifyOperationInProgress();const n=await hk(t);z("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>og(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>og(e.remoteStore,i)),t._onlineComponents=e}async function hk(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){z("FirestoreClient","Using user provided OfflineComponentProvider");try{await sc(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===F.FAILED_PRECONDITION||i.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;dl("Error using user provided cache. Falling back to memory cache: "+n),await sc(t,new El)}}else z("FirestoreClient","Using default OfflineComponentProvider"),await sc(t,new El);return t._offlineComponents}async function dk(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(z("FirestoreClient","Using user provided OnlineComponentProvider"),await hg(t,t._uninitializedComponentsProvider._online)):(z("FirestoreClient","Using default OnlineComponentProvider"),await hg(t,new vh))),t._onlineComponents}function fk(t){return dk(t).then(e=>e.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S0(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pk(t,e,n){if(!n)throw new W(F.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function mk(t,e,n,r){if(e===!0&&r===!0)throw new W(F.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function fg(t){if(!q.isDocumentKey(t))throw new W(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Qd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":X()}function _h(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new W(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Qd(t);throw new W(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new W(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}mk("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=S0((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new W(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Yd{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pg({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pg(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new iP;switch(r.type){case"firstParty":return new lP(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=dg.get(n);r&&(z("ComponentProvider","Removing Datastore"),dg.delete(n),r.terminate())}(this),Promise.resolve()}}function gk(t,e,n,r={}){var i;const s=(t=_h(t,Yd))._getSettings(),o=`${e}:${n}`;if(s.host!=="firestore.googleapis.com"&&s.host!==o&&dl("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},s),{host:o,ssl:!1})),r.mockUserToken){let l,u;if(typeof r.mockUserToken=="string")l=r.mockUserToken,u=Ke.MOCK_USER;else{l=_1(r.mockUserToken,(i=t._app)===null||i===void 0?void 0:i.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new W(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Ke(h)}t._authCredentials=new sP(new B_(l,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xd{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Xd(this.firestore,e,this._query)}}class gn{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ro(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new gn(this.firestore,e,this._key)}}class ro extends Xd{constructor(e,n,r){super(e,n,MP(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new gn(this.firestore,null,new q(e))}withConverter(e){return new ro(this.firestore,e,this._path)}}function yk(t,e,...n){if(t=mt(t),arguments.length===1&&(e=$_.newId()),pk("doc","path",e),t instanceof Yd){const r=Se.fromString(e,...n);return fg(r),new gn(t,null,new q(r))}{if(!(t instanceof gn||t instanceof ro))throw new W(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Se.fromString(e,...n));return fg(r),new gn(t.firestore,t instanceof ro?t.converter:null,new q(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mg{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new g0(this,"async_queue_retry"),this.Vu=()=>{const r=ic();r&&z("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=ic();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=ic();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new Sr;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Wl(e))throw e;z("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const i=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw Vr("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const i=qd.createAndSchedule(this,e,n,r,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&X()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}class R0 extends Yd{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new mg,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new mg(e),this._firestoreClient=void 0,await e}}}function vk(t,e){const n=typeof t=="object"?t:Zv(),r=typeof t=="string"?t:"(default)",i=Sd(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=y1("firestore");s&&gk(i,...s)}return i}function _k(t){if(t._terminated)throw new W(F.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||wk(t),t._firestoreClient}function wk(t){var e,n,r;const i=t._freezeSettings(),s=function(l,u,h,f){return new TP(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,S0(f.experimentalLongPollingOptions),f.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._componentsProvider||!((n=i.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),t._firestoreClient=new ck(t._authCredentials,t._appCheckCredentials,t._queue,s,t._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e){this._byteString=e}static fromBase64String(e){try{return new io(Gt.fromBase64String(e))}catch(n){throw new W(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new io(Gt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A0{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new W(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class P0{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C0{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new W(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new W(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return se(this._lat,e._lat)||se(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k0{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ek=/^__.*__$/;class Tk{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Ur(e,this.data,this.fieldMask,n,this.fieldTransforms):new wo(e,this.data,n,this.fieldTransforms)}}function N0(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X()}}class Jd{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Jd(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.Ou(e),i}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),i=this.Fu({path:r,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Tl(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(N0(this.Cu)&&Ek.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Ik{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Ql(e)}Qu(e,n,r,i=!1){return new Jd({Cu:e,methodName:n,qu:r,path:Fe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Sk(t){const e=t._freezeSettings(),n=Ql(t._databaseId);return new Ik(t._databaseId,!!e.ignoreUndefinedProperties,n)}function Rk(t,e,n,r,i,s={}){const o=t.Qu(s.merge||s.mergeFields?2:0,e,n,i);L0("Data must be an object, but it was:",o,r);const l=D0(r,o);let u,h;if(s.merge)u=new Lt(o.fieldMask),h=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const m of s.mergeFields){const y=Ak(e,m,n);if(!o.contains(y))throw new W(F.INVALID_ARGUMENT,`Field '${y}' is specified in your field mask but missing from your input data.`);kk(f,y)||f.push(y)}u=new Lt(f),h=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,h=o.fieldTransforms;return new Tk(new Dt(l),u,h)}function x0(t,e){if(O0(t=mt(t)))return L0("Unsupported field value:",e,t),D0(t,e);if(t instanceof P0)return function(r,i){if(!N0(i.Cu))throw i.Bu(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=x0(l,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=mt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return KP(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=De.fromDate(r);return{timestampValue:mh(i.serializer,s)}}if(r instanceof De){const s=new De(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:mh(i.serializer,s)}}if(r instanceof C0)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof io)return{bytesValue:sC(i.serializer,r._byteString)};if(r instanceof gn){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:f0(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof k0)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw l.Bu("VectorValues must only contain numeric values.");return zd(l.serializer,u)})}}}}}}(r,i);throw i.Bu(`Unsupported field value: ${Qd(r)}`)}(t,e)}function D0(t,e){const n={};return W_(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):_o(t,(r,i)=>{const s=x0(i,e.Mu(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function O0(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof De||t instanceof C0||t instanceof io||t instanceof gn||t instanceof P0||t instanceof k0)}function L0(t,e,n){if(!O0(n)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(n)){const r=Qd(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function Ak(t,e,n){if((e=mt(e))instanceof A0)return e._internalPath;if(typeof e=="string")return Ck(t,e);throw Tl("Field path arguments must be of type string or ",t,!1,void 0,n)}const Pk=new RegExp("[~\\*/\\[\\]]");function Ck(t,e,n){if(e.search(Pk)>=0)throw Tl(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new A0(...e.split("."))._internalPath}catch{throw Tl(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Tl(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new W(F.INVALID_ARGUMENT,l+t+u)}function kk(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nk(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}function xk(t,e,n){t=_h(t,gn);const r=_h(t.firestore,R0),i=Nk(t.converter,e,n);return Dk(r,[Rk(Sk(r),"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,mn.none())])}function Dk(t,e){return function(r,i){const s=new Sr;return r.asyncQueue.enqueueAndForget(async()=>sk(await fk(r),i,s)),s.promise}(_k(t),e)}(function(e,n=!0){(function(i){Fi=i})(Vi),Ti(new xr("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new R0(new oP(r.getProvider("auth-internal")),new cP(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new W(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ml(h.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:n},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Jn(Hm,"4.7.3",e),Jn(Hm,"4.7.3","esm2017")})();var Ok="firebase",Lk="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Jn(Ok,Lk,"app");const Vk={apiKey:"AIzaSyDJGoIN2mSXKNYpobLrH_714wAhTua6N6o",authDomain:"farmcultureai.firebaseapp.com",projectId:"farmcultureai",storageBucket:"farmcultureai.appspot.com",messagingSenderId:"38022247529",appId:"1:38022247529:web:38022247529"},V0=wm().length?wm()[0]:Jv(Vk),Oa=nP(V0),Mk=vk(V0);function Fk(){const[t,e]=L.useState(!1),[n,r]=L.useState(""),[i,s]=L.useState(""),[o,l]=L.useState(""),[u,h]=L.useState(!1),f=yd(),m=async(R,N,D)=>{const w=N||(D==null?void 0:D.split("@")[0])||"Farmer";return await xk(yk(Mk,"users",w),{uid:R,displayName:N,email:D,provider:"password"},{merge:!0}),w},y=async R=>{R.preventDefault(),h(!0);try{const N=t?await UR(Oa,i,o):await jR(Oa,i,o);t&&n&&await $R(N.user,{displayName:n});const D=await m(N.user.uid,N.user.displayName,N.user.email);f(`/dashboard?name=${encodeURIComponent(D??"")}`)}catch(N){alert(N.message)}finally{h(!1)}},P=async()=>{h(!0);try{const R=await hA(Oa,new on),N=await m(R.user.uid,R.user.displayName,R.user.email);f(`/dashboard?name=${encodeURIComponent(N??"")}`)}catch(R){alert(R.message)}finally{h(!1)}};return Z.jsx("div",{className:"min-h-screen grid place-items-center bg-emerald-50",role:"main",children:Z.jsxs("div",{className:"w-full max-sm:px-4 sm:w-[400px] bg-white rounded-2xl shadow-xl p-8",children:[Z.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[Z.jsx("img",{src:"/leaf.svg",alt:"Farmculture",className:"h-10"}),Z.jsx("h1",{className:"text-2xl font-bold text-emerald-700",children:"Farmculture"})]}),Z.jsx("h2",{className:"text-xl font-semibold mb-2",children:t?"Create a new account":"Sign in to Farmculture"}),Z.jsx("p",{className:"text-sm text-gray-500 mb-6",children:t?"Join the largest agricultural network":"Welcome back, farmer!"}),Z.jsxs("form",{onSubmit:y,className:"space-y-4",children:[t&&Z.jsx("input",{type:"text",placeholder:"Full name",required:!0,value:n,onChange:R=>r(R.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"}),Z.jsx("input",{type:"email",placeholder:"Email address",required:!0,value:i,onChange:R=>s(R.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"}),Z.jsx("input",{type:"password",placeholder:"Password",required:!0,value:o,onChange:R=>l(R.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"}),Z.jsx("button",{type:"submit",disabled:u,className:"w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-60",children:u?"Please wait…":t?"Create account":"Sign in"})]}),Z.jsxs("div",{className:"flex items-center my-4",children:[Z.jsx("hr",{className:"flex-1"}),Z.jsx("span",{className:"px-3 text-xs text-gray-400",children:"OR"}),Z.jsx("hr",{className:"flex-1"})]}),Z.jsxs("button",{onClick:P,disabled:u,className:"w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-50 disabled:opacity-60",children:[Z.jsx("img",{src:"/google.svg",alt:"Google",className:"h-5"}),"Continue with Google"]}),Z.jsxs("p",{className:"text-center text-sm text-gray-600 mt-6",children:[t?"Already have an account?":"New to Farmculture?"," ",Z.jsx("button",{type:"button",onClick:()=>e(R=>!R),className:"text-emerald-700 font-medium underline",children:t?"Sign in":"Create an account"})]})]})})}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function bk(t,e,n,r){function i(s){return s instanceof n?s:new n(function(o){o(s)})}return new(n||(n=Promise))(function(s,o){function l(f){try{h(r.next(f))}catch(m){o(m)}}function u(f){try{h(r.throw(f))}catch(m){o(m)}}function h(f){f.done?s(f.value):i(f.value).then(l,u)}h((r=r.apply(t,[])).next())})}function Uk(t,e){var n={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},r,i,s,o;return o={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(o[Symbol.iterator]=function(){return this}),o;function l(h){return function(f){return u([h,f])}}function u(h){if(r)throw new TypeError("Generator is already executing.");for(;n;)try{if(r=1,i&&(s=h[0]&2?i.return:h[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,h[1])).done)return s;switch(i=0,s&&(h=[h[0]&2,s.value]),h[0]){case 0:case 1:s=h;break;case 4:return n.label++,{value:h[1],done:!1};case 5:n.label++,i=h[1],h=[0];continue;case 7:h=n.ops.pop(),n.trys.pop();continue;default:if(s=n.trys,!(s=s.length>0&&s[s.length-1])&&(h[0]===6||h[0]===2)){n=0;continue}if(h[0]===3&&(!s||h[1]>s[0]&&h[1]<s[3])){n.label=h[1];break}if(h[0]===6&&n.label<s[1]){n.label=s[1],s=h;break}if(s&&n.label<s[2]){n.label=s[2],n.ops.push(h);break}s[2]&&n.ops.pop(),n.trys.pop();continue}h=e.call(t,n)}catch(f){h=[6,f],i=0}finally{r=s=0}if(h[0]&5)throw h[1];return{value:h[0]?h[1]:void 0,done:!0}}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var ii=function(){return ii=Object.assign||function(e){for(var n,r=1,i=arguments.length;r<i;r++){n=arguments[r];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},ii.apply(this,arguments)},M0=function(t){return{loading:t==null,value:t}},jk=function(){return function(t,e){switch(e.type){case"error":return ii(ii({},t),{error:e.error,loading:!1,value:void 0});case"reset":return M0(e.defaultValue);case"value":return ii(ii({},t),{error:void 0,loading:!1,value:e.value});default:return t}}},Bk=function(t){var e=t?t():void 0,n=L.useReducer(jk(),M0(e)),r=n[0],i=n[1],s=L.useCallback(function(){var u=t?t():void 0;i({type:"reset",defaultValue:u})},[t]),o=L.useCallback(function(u){i({type:"error",error:u})},[]),l=L.useCallback(function(u){i({type:"value",value:u})},[]);return L.useMemo(function(){return{error:r.error,loading:r.loading,reset:s,setError:o,setValue:l,value:r.value}},[r.error,r.loading,s,o,l,r.value])},$k=function(t,e){var n=Bk(function(){return t.currentUser}),r=n.error,i=n.loading,s=n.setError,o=n.setValue,l=n.value;return L.useEffect(function(){var u=WR(t,function(h){return bk(void 0,void 0,void 0,function(){var f;return Uk(this,function(m){switch(m.label){case 0:return[3,4];case 1:return m.trys.push([1,3,,4]),[4,e.onUserChanged(h)];case 2:return m.sent(),[3,4];case 3:return f=m.sent(),s(f),[3,4];case 4:return o(h),[2]}})})},s);return function(){u()}},[t]),[l,i,r]};function zk(){const[t,e]=$k(Oa),{search:n}=Rn(),i=new URLSearchParams(n).get("name")||"Farmer";return e?Z.jsx("p",{className:"p-6",children:"Loading…"}):t?Z.jsx("main",{className:"p-10",children:Z.jsxs("h1",{className:"text-2xl font-bold",children:["Welcome, ",i,"!"]})}):Z.jsx(Fv,{to:"/auth/login",replace:!0})}oc.createRoot(document.getElementById("root")).render(Z.jsx(Nw.StrictMode,{children:Z.jsx(e1,{children:Z.jsxs(xI,{children:[Z.jsx(Ia,{path:"/",element:Z.jsx(Fv,{to:"/auth/login",replace:!0})}),Z.jsx(Ia,{path:"/auth/login",element:Z.jsx(Fk,{})}),Z.jsx(Ia,{path:"/dashboard",element:Z.jsx(zk,{})})]})})}));
