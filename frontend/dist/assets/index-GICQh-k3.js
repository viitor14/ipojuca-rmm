const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DigitalTwin3D-BHycEoxr.js","assets/Gltf-CzdJvisY.js","assets/ModelShowcase-DI4YWCGt.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const p of d)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function i(d){const p={};return d.integrity&&(p.integrity=d.integrity),d.referrerPolicy&&(p.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?p.credentials="include":d.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(d){if(d.ep)return;d.ep=!0;const p=i(d);fetch(d.href,p)}})();function N0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var sc={exports:{}},ds={},ic={exports:{}},Pe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wf;function T0(){if(Wf)return Pe;Wf=1;var t=Symbol.for("react.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),p=Symbol.for("react.provider"),m=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),T=Symbol.for("react.memo"),$=Symbol.for("react.lazy"),A=Symbol.iterator;function P(b){return b===null||typeof b!="object"?null:(b=A&&b[A]||b["@@iterator"],typeof b=="function"?b:null)}var z={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ne=Object.assign,re={};function K(b,R,Z){this.props=b,this.context=R,this.refs=re,this.updater=Z||z}K.prototype.isReactComponent={},K.prototype.setState=function(b,R){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,R,"setState")},K.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};function Y(){}Y.prototype=K.prototype;function W(b,R,Z){this.props=b,this.context=R,this.refs=re,this.updater=Z||z}var le=W.prototype=new Y;le.constructor=W,ne(le,K.prototype),le.isPureReactComponent=!0;var Ie=Array.isArray,we=Object.prototype.hasOwnProperty,pe={current:null},V={key:!0,ref:!0,__self:!0,__source:!0};function de(b,R,Z){var Q,xe={},ge=null,ye=null;if(R!=null)for(Q in R.ref!==void 0&&(ye=R.ref),R.key!==void 0&&(ge=""+R.key),R)we.call(R,Q)&&!V.hasOwnProperty(Q)&&(xe[Q]=R[Q]);var G=arguments.length-2;if(G===1)xe.children=Z;else if(1<G){for(var Ce=Array(G),Te=0;Te<G;Te++)Ce[Te]=arguments[Te+2];xe.children=Ce}if(b&&b.defaultProps)for(Q in G=b.defaultProps,G)xe[Q]===void 0&&(xe[Q]=G[Q]);return{$$typeof:t,type:b,key:ge,ref:ye,props:xe,_owner:pe.current}}function Qe(b,R){return{$$typeof:t,type:b.type,key:R,ref:b.ref,props:b.props,_owner:b._owner}}function X(b){return typeof b=="object"&&b!==null&&b.$$typeof===t}function he(b){var R={"=":"=0",":":"=2"};return"$"+b.replace(/[=:]/g,function(Z){return R[Z]})}var te=/\/+/g;function ee(b,R){return typeof b=="object"&&b!==null&&b.key!=null?he(""+b.key):R.toString(36)}function Se(b,R,Z,Q,xe){var ge=typeof b;(ge==="undefined"||ge==="boolean")&&(b=null);var ye=!1;if(b===null)ye=!0;else switch(ge){case"string":case"number":ye=!0;break;case"object":switch(b.$$typeof){case t:case o:ye=!0}}if(ye)return ye=b,xe=xe(ye),b=Q===""?"."+ee(ye,0):Q,Ie(xe)?(Z="",b!=null&&(Z=b.replace(te,"$&/")+"/"),Se(xe,R,Z,"",function(Te){return Te})):xe!=null&&(X(xe)&&(xe=Qe(xe,Z+(!xe.key||ye&&ye.key===xe.key?"":(""+xe.key).replace(te,"$&/")+"/")+b)),R.push(xe)),1;if(ye=0,Q=Q===""?".":Q+":",Ie(b))for(var G=0;G<b.length;G++){ge=b[G];var Ce=Q+ee(ge,G);ye+=Se(ge,R,Z,Ce,xe)}else if(Ce=P(b),typeof Ce=="function")for(b=Ce.call(b),G=0;!(ge=b.next()).done;)ge=ge.value,Ce=Q+ee(ge,G++),ye+=Se(ge,R,Z,Ce,xe);else if(ge==="object")throw R=String(b),Error("Objects are not valid as a React child (found: "+(R==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":R)+"). If you meant to render a collection of children, use an array instead.");return ye}function ae(b,R,Z){if(b==null)return b;var Q=[],xe=0;return Se(b,Q,"","",function(ge){return R.call(Z,ge,xe++)}),Q}function Oe(b){if(b._status===-1){var R=b._result;R=R(),R.then(function(Z){(b._status===0||b._status===-1)&&(b._status=1,b._result=Z)},function(Z){(b._status===0||b._status===-1)&&(b._status=2,b._result=Z)}),b._status===-1&&(b._status=0,b._result=R)}if(b._status===1)return b._result.default;throw b._result}var ke={current:null},F={transition:null},J={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:F,ReactCurrentOwner:pe};function O(){throw Error("act(...) is not supported in production builds of React.")}return Pe.Children={map:ae,forEach:function(b,R,Z){ae(b,function(){R.apply(this,arguments)},Z)},count:function(b){var R=0;return ae(b,function(){R++}),R},toArray:function(b){return ae(b,function(R){return R})||[]},only:function(b){if(!X(b))throw Error("React.Children.only expected to receive a single React element child.");return b}},Pe.Component=K,Pe.Fragment=i,Pe.Profiler=d,Pe.PureComponent=W,Pe.StrictMode=c,Pe.Suspense=g,Pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J,Pe.act=O,Pe.cloneElement=function(b,R,Z){if(b==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+b+".");var Q=ne({},b.props),xe=b.key,ge=b.ref,ye=b._owner;if(R!=null){if(R.ref!==void 0&&(ge=R.ref,ye=pe.current),R.key!==void 0&&(xe=""+R.key),b.type&&b.type.defaultProps)var G=b.type.defaultProps;for(Ce in R)we.call(R,Ce)&&!V.hasOwnProperty(Ce)&&(Q[Ce]=R[Ce]===void 0&&G!==void 0?G[Ce]:R[Ce])}var Ce=arguments.length-2;if(Ce===1)Q.children=Z;else if(1<Ce){G=Array(Ce);for(var Te=0;Te<Ce;Te++)G[Te]=arguments[Te+2];Q.children=G}return{$$typeof:t,type:b.type,key:xe,ref:ge,props:Q,_owner:ye}},Pe.createContext=function(b){return b={$$typeof:m,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},b.Provider={$$typeof:p,_context:b},b.Consumer=b},Pe.createElement=de,Pe.createFactory=function(b){var R=de.bind(null,b);return R.type=b,R},Pe.createRef=function(){return{current:null}},Pe.forwardRef=function(b){return{$$typeof:y,render:b}},Pe.isValidElement=X,Pe.lazy=function(b){return{$$typeof:$,_payload:{_status:-1,_result:b},_init:Oe}},Pe.memo=function(b,R){return{$$typeof:T,type:b,compare:R===void 0?null:R}},Pe.startTransition=function(b){var R=F.transition;F.transition={};try{b()}finally{F.transition=R}},Pe.unstable_act=O,Pe.useCallback=function(b,R){return ke.current.useCallback(b,R)},Pe.useContext=function(b){return ke.current.useContext(b)},Pe.useDebugValue=function(){},Pe.useDeferredValue=function(b){return ke.current.useDeferredValue(b)},Pe.useEffect=function(b,R){return ke.current.useEffect(b,R)},Pe.useId=function(){return ke.current.useId()},Pe.useImperativeHandle=function(b,R,Z){return ke.current.useImperativeHandle(b,R,Z)},Pe.useInsertionEffect=function(b,R){return ke.current.useInsertionEffect(b,R)},Pe.useLayoutEffect=function(b,R){return ke.current.useLayoutEffect(b,R)},Pe.useMemo=function(b,R){return ke.current.useMemo(b,R)},Pe.useReducer=function(b,R,Z){return ke.current.useReducer(b,R,Z)},Pe.useRef=function(b){return ke.current.useRef(b)},Pe.useState=function(b){return ke.current.useState(b)},Pe.useSyncExternalStore=function(b,R,Z){return ke.current.useSyncExternalStore(b,R,Z)},Pe.useTransition=function(){return ke.current.useTransition()},Pe.version="18.3.1",Pe}var Gf;function Jc(){return Gf||(Gf=1,ic.exports=T0()),ic.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf;function I0(){if(qf)return ds;qf=1;var t=Jc(),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,d=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function m(y,g,T){var $,A={},P=null,z=null;T!==void 0&&(P=""+T),g.key!==void 0&&(P=""+g.key),g.ref!==void 0&&(z=g.ref);for($ in g)c.call(g,$)&&!p.hasOwnProperty($)&&(A[$]=g[$]);if(y&&y.defaultProps)for($ in g=y.defaultProps,g)A[$]===void 0&&(A[$]=g[$]);return{$$typeof:o,type:y,key:P,ref:z,props:A,_owner:d.current}}return ds.Fragment=i,ds.jsx=m,ds.jsxs=m,ds}var Yf;function R0(){return Yf||(Yf=1,sc.exports=I0()),sc.exports}var l=R0(),I=Jc();const $t=N0(I);var Oi={},lc={exports:{}},Wt={},ac={exports:{}},cc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qf;function $0(){return Qf||(Qf=1,(function(t){function o(F,J){var O=F.length;F.push(J);e:for(;0<O;){var b=O-1>>>1,R=F[b];if(0<d(R,J))F[b]=J,F[O]=R,O=b;else break e}}function i(F){return F.length===0?null:F[0]}function c(F){if(F.length===0)return null;var J=F[0],O=F.pop();if(O!==J){F[0]=O;e:for(var b=0,R=F.length,Z=R>>>1;b<Z;){var Q=2*(b+1)-1,xe=F[Q],ge=Q+1,ye=F[ge];if(0>d(xe,O))ge<R&&0>d(ye,xe)?(F[b]=ye,F[ge]=O,b=ge):(F[b]=xe,F[Q]=O,b=Q);else if(ge<R&&0>d(ye,O))F[b]=ye,F[ge]=O,b=ge;else break e}}return J}function d(F,J){var O=F.sortIndex-J.sortIndex;return O!==0?O:F.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var p=performance;t.unstable_now=function(){return p.now()}}else{var m=Date,y=m.now();t.unstable_now=function(){return m.now()-y}}var g=[],T=[],$=1,A=null,P=3,z=!1,ne=!1,re=!1,K=typeof setTimeout=="function"?setTimeout:null,Y=typeof clearTimeout=="function"?clearTimeout:null,W=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function le(F){for(var J=i(T);J!==null;){if(J.callback===null)c(T);else if(J.startTime<=F)c(T),J.sortIndex=J.expirationTime,o(g,J);else break;J=i(T)}}function Ie(F){if(re=!1,le(F),!ne)if(i(g)!==null)ne=!0,Oe(we);else{var J=i(T);J!==null&&ke(Ie,J.startTime-F)}}function we(F,J){ne=!1,re&&(re=!1,Y(de),de=-1),z=!0;var O=P;try{for(le(J),A=i(g);A!==null&&(!(A.expirationTime>J)||F&&!he());){var b=A.callback;if(typeof b=="function"){A.callback=null,P=A.priorityLevel;var R=b(A.expirationTime<=J);J=t.unstable_now(),typeof R=="function"?A.callback=R:A===i(g)&&c(g),le(J)}else c(g);A=i(g)}if(A!==null)var Z=!0;else{var Q=i(T);Q!==null&&ke(Ie,Q.startTime-J),Z=!1}return Z}finally{A=null,P=O,z=!1}}var pe=!1,V=null,de=-1,Qe=5,X=-1;function he(){return!(t.unstable_now()-X<Qe)}function te(){if(V!==null){var F=t.unstable_now();X=F;var J=!0;try{J=V(!0,F)}finally{J?ee():(pe=!1,V=null)}}else pe=!1}var ee;if(typeof W=="function")ee=function(){W(te)};else if(typeof MessageChannel<"u"){var Se=new MessageChannel,ae=Se.port2;Se.port1.onmessage=te,ee=function(){ae.postMessage(null)}}else ee=function(){K(te,0)};function Oe(F){V=F,pe||(pe=!0,ee())}function ke(F,J){de=K(function(){F(t.unstable_now())},J)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){ne||z||(ne=!0,Oe(we))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Qe=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return P},t.unstable_getFirstCallbackNode=function(){return i(g)},t.unstable_next=function(F){switch(P){case 1:case 2:case 3:var J=3;break;default:J=P}var O=P;P=J;try{return F()}finally{P=O}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,J){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var O=P;P=F;try{return J()}finally{P=O}},t.unstable_scheduleCallback=function(F,J,O){var b=t.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?b+O:b):O=b,F){case 1:var R=-1;break;case 2:R=250;break;case 5:R=1073741823;break;case 4:R=1e4;break;default:R=5e3}return R=O+R,F={id:$++,callback:J,priorityLevel:F,startTime:O,expirationTime:R,sortIndex:-1},O>b?(F.sortIndex=O,o(T,F),i(g)===null&&F===i(T)&&(re?(Y(de),de=-1):re=!0,ke(Ie,O-b))):(F.sortIndex=R,o(g,F),ne||z||(ne=!0,Oe(we))),F},t.unstable_shouldYield=he,t.unstable_wrapCallback=function(F){var J=P;return function(){var O=P;P=J;try{return F.apply(this,arguments)}finally{P=O}}}})(cc)),cc}var Kf;function A0(){return Kf||(Kf=1,ac.exports=$0()),ac.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xf;function P0(){if(Xf)return Wt;Xf=1;var t=Jc(),o=A0();function i(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,d={};function p(e,n){m(e,n),m(e+"Capture",n)}function m(e,n){for(d[e]=n,e=0;e<n.length;e++)c.add(n[e])}var y=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,T=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,$={},A={};function P(e){return g.call(A,e)?!0:g.call($,e)?!1:T.test(e)?A[e]=!0:($[e]=!0,!1)}function z(e,n,r,s){if(r!==null&&r.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ne(e,n,r,s){if(n===null||typeof n>"u"||z(e,n,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function re(e,n,r,s,a,u,f){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=n,this.sanitizeURL=u,this.removeEmptyString=f}var K={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){K[e]=new re(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];K[n]=new re(n,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){K[e]=new re(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){K[e]=new re(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){K[e]=new re(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){K[e]=new re(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){K[e]=new re(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){K[e]=new re(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){K[e]=new re(e,5,!1,e.toLowerCase(),null,!1,!1)});var Y=/[\-:]([a-z])/g;function W(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Y,W);K[n]=new re(n,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Y,W);K[n]=new re(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Y,W);K[n]=new re(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){K[e]=new re(e,1,!1,e.toLowerCase(),null,!1,!1)}),K.xlinkHref=new re("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){K[e]=new re(e,1,!1,e.toLowerCase(),null,!0,!0)});function le(e,n,r,s){var a=K.hasOwnProperty(n)?K[n]:null;(a!==null?a.type!==0:s||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(ne(n,r,a,s)&&(r=null),s||a===null?P(n)&&(r===null?e.removeAttribute(n):e.setAttribute(n,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(n=a.attributeName,s=a.attributeNamespace,r===null?e.removeAttribute(n):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,s?e.setAttributeNS(s,n,r):e.setAttribute(n,r))))}var Ie=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,we=Symbol.for("react.element"),pe=Symbol.for("react.portal"),V=Symbol.for("react.fragment"),de=Symbol.for("react.strict_mode"),Qe=Symbol.for("react.profiler"),X=Symbol.for("react.provider"),he=Symbol.for("react.context"),te=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),Se=Symbol.for("react.suspense_list"),ae=Symbol.for("react.memo"),Oe=Symbol.for("react.lazy"),ke=Symbol.for("react.offscreen"),F=Symbol.iterator;function J(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var O=Object.assign,b;function R(e){if(b===void 0)try{throw Error()}catch(r){var n=r.stack.trim().match(/\n( *(at )?)/);b=n&&n[1]||""}return`
`+b+e}var Z=!1;function Q(e,n){if(!e||Z)return"";Z=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(j){var s=j}Reflect.construct(e,[],n)}else{try{n.call()}catch(j){s=j}e.call(n.prototype)}else{try{throw Error()}catch(j){s=j}e()}}catch(j){if(j&&s&&typeof j.stack=="string"){for(var a=j.stack.split(`
`),u=s.stack.split(`
`),f=a.length-1,h=u.length-1;1<=f&&0<=h&&a[f]!==u[h];)h--;for(;1<=f&&0<=h;f--,h--)if(a[f]!==u[h]){if(f!==1||h!==1)do if(f--,h--,0>h||a[f]!==u[h]){var x=`
`+a[f].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=f&&0<=h);break}}}finally{Z=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?R(e):""}function xe(e){switch(e.tag){case 5:return R(e.type);case 16:return R("Lazy");case 13:return R("Suspense");case 19:return R("SuspenseList");case 0:case 2:case 15:return e=Q(e.type,!1),e;case 11:return e=Q(e.type.render,!1),e;case 1:return e=Q(e.type,!0),e;default:return""}}function ge(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case V:return"Fragment";case pe:return"Portal";case Qe:return"Profiler";case de:return"StrictMode";case ee:return"Suspense";case Se:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case he:return(e.displayName||"Context")+".Consumer";case X:return(e._context.displayName||"Context")+".Provider";case te:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ae:return n=e.displayName||null,n!==null?n:ge(e.type)||"Memo";case Oe:n=e._payload,e=e._init;try{return ge(e(n))}catch{}}return null}function ye(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ge(n);case 8:return n===de?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function G(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ce(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Te(e){var n=Ce(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),s=""+e[n];if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,u=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return a.call(this)},set:function(f){s=""+f,u.call(this,f)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(f){s=""+f},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function xt(e){e._valueTracker||(e._valueTracker=Te(e))}function At(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var r=n.getValue(),s="";return e&&(s=Ce(e)?e.checked?"true":"false":e.value),e=s,e!==r?(n.setValue(e),!0):!1}function yt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function vt(e,n){var r=n.checked;return O({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function tn(e,n){var r=n.defaultValue==null?"":n.defaultValue,s=n.checked!=null?n.checked:n.defaultChecked;r=G(n.value!=null?n.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Ve(e,n){n=n.checked,n!=null&&le(e,"checked",n,!1)}function kt(e,n){Ve(e,n);var r=G(n.value),s=n.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?pn(e,n.type,r):n.hasOwnProperty("defaultValue")&&pn(e,n.type,G(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function B(e,n,r){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var s=n.type;if(!(s!=="submit"&&s!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,r||n===e.value||(e.value=n),e.defaultValue=n}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function pn(e,n,r){(n!=="number"||yt(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Pt=Array.isArray;function Me(e,n,r,s){if(e=e.options,n){n={};for(var a=0;a<r.length;a++)n["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=n.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&s&&(e[r].defaultSelected=!0)}else{for(r=""+G(r),n=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}n!==null||e[a].disabled||(n=e[a])}n!==null&&(n.selected=!0)}}function We(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(i(91));return O({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function je(e,n){var r=n.value;if(r==null){if(r=n.children,n=n.defaultValue,r!=null){if(n!=null)throw Error(i(92));if(Pt(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n==null&&(n=""),r=n}e._wrapperState={initialValue:G(r)}}function Ct(e,n){var r=G(n.value),s=G(n.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),n.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function Gt(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function qt(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function et(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?qt(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Et,Qn=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,r,s,a){MSApp.execUnsafeLocalFunction(function(){return e(n,r,s,a)})}:e})(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Et=Et||document.createElement("div"),Et.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Et.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Yt(e,n){if(n){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=n;return}}e.textContent=n}var Ft={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},q=["Webkit","ms","Moz","O"];Object.keys(Ft).forEach(function(e){q.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ft[n]=Ft[e]})});function ot(e,n,r){return n==null||typeof n=="boolean"||n===""?"":r||typeof n!="number"||n===0||Ft.hasOwnProperty(e)&&Ft[e]?(""+n).trim():n+"px"}function nn(e,n){e=e.style;for(var r in n)if(n.hasOwnProperty(r)){var s=r.indexOf("--")===0,a=ot(r,n[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,a):e[r]=a}}var Wr=O({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Mn(e,n){if(n){if(Wr[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(i(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(i(61))}if(n.style!=null&&typeof n.style!="object")throw Error(i(62))}}function rn(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Cr=null;function Er(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var jr=null,Cn=null,Qt=null;function Gr(e){if(e=Ko(e)){if(typeof jr!="function")throw Error(i(280));var n=e.stateNode;n&&(n=Xs(n),jr(e.stateNode,e.type,n))}}function qr(e){Cn?Qt?Qt.push(e):Qt=[e]:Cn=e}function _r(){if(Cn){var e=Cn,n=Qt;if(Qt=Cn=null,Gr(e),n)for(e=0;e<n.length;e++)Gr(n[e])}}function Kn(e,n){return e(n)}function Xn(){}var E=!1;function S(e,n,r){if(E)return e(n,r);E=!0;try{return Kn(e,n,r)}finally{E=!1,(Cn!==null||Qt!==null)&&(Xn(),_r())}}function w(e,n){var r=e.stateNode;if(r===null)return null;var s=Xs(r);if(s===null)return null;r=s[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(i(231,n,typeof r));return r}var _=!1;if(y)try{var U={};Object.defineProperty(U,"passive",{get:function(){_=!0}}),window.addEventListener("test",U,U),window.removeEventListener("test",U,U)}catch{_=!1}function Re(e,n,r,s,a,u,f,h,x){var j=Array.prototype.slice.call(arguments,3);try{n.apply(r,j)}catch(L){this.onError(L)}}var Ee=!1,it=null,Be=!1,lt=null,Ge={onError:function(e){Ee=!0,it=e}};function Mt(e,n,r,s,a,u,f,h,x){Ee=!1,it=null,Re.apply(Ge,arguments)}function Jn(e,n,r,s,a,u,f,h,x){if(Mt.apply(this,arguments),Ee){if(Ee){var j=it;Ee=!1,it=null}else throw Error(i(198));Be||(Be=!0,lt=j)}}function En(e){var n=e,r=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(r=n.return),e=n.return;while(e)}return n.tag===3?r:null}function Zn(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function hu(e){if(En(e)!==e)throw Error(i(188))}function zh(e){var n=e.alternate;if(!n){if(n=En(e),n===null)throw Error(i(188));return n!==e?null:e}for(var r=e,s=n;;){var a=r.return;if(a===null)break;var u=a.alternate;if(u===null){if(s=a.return,s!==null){r=s;continue}break}if(a.child===u.child){for(u=a.child;u;){if(u===r)return hu(a),e;if(u===s)return hu(a),n;u=u.sibling}throw Error(i(188))}if(r.return!==s.return)r=a,s=u;else{for(var f=!1,h=a.child;h;){if(h===r){f=!0,r=a,s=u;break}if(h===s){f=!0,s=a,r=u;break}h=h.sibling}if(!f){for(h=u.child;h;){if(h===r){f=!0,r=u,s=a;break}if(h===s){f=!0,s=u,r=a;break}h=h.sibling}if(!f)throw Error(i(189))}}if(r.alternate!==s)throw Error(i(190))}if(r.tag!==3)throw Error(i(188));return r.stateNode.current===r?e:n}function mu(e){return e=zh(e),e!==null?gu(e):null}function gu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=gu(e);if(n!==null)return n;e=e.sibling}return null}var xu=o.unstable_scheduleCallback,yu=o.unstable_cancelCallback,Fh=o.unstable_shouldYield,Dh=o.unstable_requestPaint,at=o.unstable_now,Bh=o.unstable_getCurrentPriorityLevel,El=o.unstable_ImmediatePriority,vu=o.unstable_UserBlockingPriority,Rs=o.unstable_NormalPriority,Uh=o.unstable_LowPriority,bu=o.unstable_IdlePriority,$s=null,jn=null;function Hh(e){if(jn&&typeof jn.onCommitFiberRoot=="function")try{jn.onCommitFiberRoot($s,e,void 0,(e.current.flags&128)===128)}catch{}}var hn=Math.clz32?Math.clz32:Gh,Vh=Math.log,Wh=Math.LN2;function Gh(e){return e>>>=0,e===0?32:31-(Vh(e)/Wh|0)|0}var As=64,Ps=4194304;function $o(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ms(e,n){var r=e.pendingLanes;if(r===0)return 0;var s=0,a=e.suspendedLanes,u=e.pingedLanes,f=r&268435455;if(f!==0){var h=f&~a;h!==0?s=$o(h):(u&=f,u!==0&&(s=$o(u)))}else f=r&~a,f!==0?s=$o(f):u!==0&&(s=$o(u));if(s===0)return 0;if(n!==0&&n!==s&&(n&a)===0&&(a=s&-s,u=n&-n,a>=u||a===16&&(u&4194240)!==0))return n;if((s&4)!==0&&(s|=r&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=s;0<n;)r=31-hn(n),a=1<<r,s|=e[r],n&=~a;return s}function qh(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Yh(e,n){for(var r=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,u=e.pendingLanes;0<u;){var f=31-hn(u),h=1<<f,x=a[f];x===-1?((h&r)===0||(h&s)!==0)&&(a[f]=qh(h,n)):x<=n&&(e.expiredLanes|=h),u&=~h}}function jl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function wu(){var e=As;return As<<=1,(As&4194240)===0&&(As=64),e}function _l(e){for(var n=[],r=0;31>r;r++)n.push(e);return n}function Ao(e,n,r){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-hn(n),e[n]=r}function Qh(e,n){var r=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-hn(r),u=1<<a;n[a]=0,s[a]=-1,e[a]=-1,r&=~u}}function Nl(e,n){var r=e.entangledLanes|=n;for(e=e.entanglements;r;){var s=31-hn(r),a=1<<s;a&n|e[s]&n&&(e[s]|=n),r&=~a}}var qe=0;function Su(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ku,Tl,Cu,Eu,ju,Il=!1,Os=[],er=null,tr=null,nr=null,Po=new Map,Mo=new Map,rr=[],Kh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _u(e,n){switch(e){case"focusin":case"focusout":er=null;break;case"dragenter":case"dragleave":tr=null;break;case"mouseover":case"mouseout":nr=null;break;case"pointerover":case"pointerout":Po.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Mo.delete(n.pointerId)}}function Oo(e,n,r,s,a,u){return e===null||e.nativeEvent!==u?(e={blockedOn:n,domEventName:r,eventSystemFlags:s,nativeEvent:u,targetContainers:[a]},n!==null&&(n=Ko(n),n!==null&&Tl(n)),e):(e.eventSystemFlags|=s,n=e.targetContainers,a!==null&&n.indexOf(a)===-1&&n.push(a),e)}function Xh(e,n,r,s,a){switch(n){case"focusin":return er=Oo(er,e,n,r,s,a),!0;case"dragenter":return tr=Oo(tr,e,n,r,s,a),!0;case"mouseover":return nr=Oo(nr,e,n,r,s,a),!0;case"pointerover":var u=a.pointerId;return Po.set(u,Oo(Po.get(u)||null,e,n,r,s,a)),!0;case"gotpointercapture":return u=a.pointerId,Mo.set(u,Oo(Mo.get(u)||null,e,n,r,s,a)),!0}return!1}function Nu(e){var n=Nr(e.target);if(n!==null){var r=En(n);if(r!==null){if(n=r.tag,n===13){if(n=Zn(r),n!==null){e.blockedOn=n,ju(e.priority,function(){Cu(r)});return}}else if(n===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ls(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var r=$l(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);Cr=s,r.target.dispatchEvent(s),Cr=null}else return n=Ko(r),n!==null&&Tl(n),e.blockedOn=r,!1;n.shift()}return!0}function Tu(e,n,r){Ls(e)&&r.delete(n)}function Jh(){Il=!1,er!==null&&Ls(er)&&(er=null),tr!==null&&Ls(tr)&&(tr=null),nr!==null&&Ls(nr)&&(nr=null),Po.forEach(Tu),Mo.forEach(Tu)}function Lo(e,n){e.blockedOn===n&&(e.blockedOn=null,Il||(Il=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Jh)))}function zo(e){function n(a){return Lo(a,e)}if(0<Os.length){Lo(Os[0],e);for(var r=1;r<Os.length;r++){var s=Os[r];s.blockedOn===e&&(s.blockedOn=null)}}for(er!==null&&Lo(er,e),tr!==null&&Lo(tr,e),nr!==null&&Lo(nr,e),Po.forEach(n),Mo.forEach(n),r=0;r<rr.length;r++)s=rr[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<rr.length&&(r=rr[0],r.blockedOn===null);)Nu(r),r.blockedOn===null&&rr.shift()}var Yr=Ie.ReactCurrentBatchConfig,zs=!0;function Zh(e,n,r,s){var a=qe,u=Yr.transition;Yr.transition=null;try{qe=1,Rl(e,n,r,s)}finally{qe=a,Yr.transition=u}}function em(e,n,r,s){var a=qe,u=Yr.transition;Yr.transition=null;try{qe=4,Rl(e,n,r,s)}finally{qe=a,Yr.transition=u}}function Rl(e,n,r,s){if(zs){var a=$l(e,n,r,s);if(a===null)Ql(e,n,s,Fs,r),_u(e,s);else if(Xh(a,e,n,r,s))s.stopPropagation();else if(_u(e,s),n&4&&-1<Kh.indexOf(e)){for(;a!==null;){var u=Ko(a);if(u!==null&&ku(u),u=$l(e,n,r,s),u===null&&Ql(e,n,s,Fs,r),u===a)break;a=u}a!==null&&s.stopPropagation()}else Ql(e,n,s,null,r)}}var Fs=null;function $l(e,n,r,s){if(Fs=null,e=Er(s),e=Nr(e),e!==null)if(n=En(e),n===null)e=null;else if(r=n.tag,r===13){if(e=Zn(n),e!==null)return e;e=null}else if(r===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Fs=e,null}function Iu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Bh()){case El:return 1;case vu:return 4;case Rs:case Uh:return 16;case bu:return 536870912;default:return 16}default:return 16}}var or=null,Al=null,Ds=null;function Ru(){if(Ds)return Ds;var e,n=Al,r=n.length,s,a="value"in or?or.value:or.textContent,u=a.length;for(e=0;e<r&&n[e]===a[e];e++);var f=r-e;for(s=1;s<=f&&n[r-s]===a[u-s];s++);return Ds=a.slice(e,1<s?1-s:void 0)}function Bs(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Us(){return!0}function $u(){return!1}function Kt(e){function n(r,s,a,u,f){this._reactName=r,this._targetInst=a,this.type=s,this.nativeEvent=u,this.target=f,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(r=e[h],this[h]=r?r(u):u[h]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Us:$u,this.isPropagationStopped=$u,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Us)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Us)},persist:function(){},isPersistent:Us}),n}var Qr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Kt(Qr),Fo=O({},Qr,{view:0,detail:0}),tm=Kt(Fo),Ml,Ol,Do,Hs=O({},Fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Do&&(Do&&e.type==="mousemove"?(Ml=e.screenX-Do.screenX,Ol=e.screenY-Do.screenY):Ol=Ml=0,Do=e),Ml)},movementY:function(e){return"movementY"in e?e.movementY:Ol}}),Au=Kt(Hs),nm=O({},Hs,{dataTransfer:0}),rm=Kt(nm),om=O({},Fo,{relatedTarget:0}),Ll=Kt(om),sm=O({},Qr,{animationName:0,elapsedTime:0,pseudoElement:0}),im=Kt(sm),lm=O({},Qr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),am=Kt(lm),cm=O({},Qr,{data:0}),Pu=Kt(cm),um={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pm(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=fm[e])?!!n[e]:!1}function zl(){return pm}var hm=O({},Fo,{key:function(e){if(e.key){var n=um[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Bs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zl,charCode:function(e){return e.type==="keypress"?Bs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),mm=Kt(hm),gm=O({},Hs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mu=Kt(gm),xm=O({},Fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zl}),ym=Kt(xm),vm=O({},Qr,{propertyName:0,elapsedTime:0,pseudoElement:0}),bm=Kt(vm),wm=O({},Hs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Sm=Kt(wm),km=[9,13,27,32],Fl=y&&"CompositionEvent"in window,Bo=null;y&&"documentMode"in document&&(Bo=document.documentMode);var Cm=y&&"TextEvent"in window&&!Bo,Ou=y&&(!Fl||Bo&&8<Bo&&11>=Bo),Lu=" ",zu=!1;function Fu(e,n){switch(e){case"keyup":return km.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Du(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Kr=!1;function Em(e,n){switch(e){case"compositionend":return Du(n);case"keypress":return n.which!==32?null:(zu=!0,Lu);case"textInput":return e=n.data,e===Lu&&zu?null:e;default:return null}}function jm(e,n){if(Kr)return e==="compositionend"||!Fl&&Fu(e,n)?(e=Ru(),Ds=Al=or=null,Kr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Ou&&n.locale!=="ko"?null:n.data;default:return null}}var _m={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!_m[e.type]:n==="textarea"}function Uu(e,n,r,s){qr(s),n=Ys(n,"onChange"),0<n.length&&(r=new Pl("onChange","change",null,r,s),e.push({event:r,listeners:n}))}var Uo=null,Ho=null;function Nm(e){id(e,0)}function Vs(e){var n=to(e);if(At(n))return e}function Tm(e,n){if(e==="change")return n}var Hu=!1;if(y){var Dl;if(y){var Bl="oninput"in document;if(!Bl){var Vu=document.createElement("div");Vu.setAttribute("oninput","return;"),Bl=typeof Vu.oninput=="function"}Dl=Bl}else Dl=!1;Hu=Dl&&(!document.documentMode||9<document.documentMode)}function Wu(){Uo&&(Uo.detachEvent("onpropertychange",Gu),Ho=Uo=null)}function Gu(e){if(e.propertyName==="value"&&Vs(Ho)){var n=[];Uu(n,Ho,e,Er(e)),S(Nm,n)}}function Im(e,n,r){e==="focusin"?(Wu(),Uo=n,Ho=r,Uo.attachEvent("onpropertychange",Gu)):e==="focusout"&&Wu()}function Rm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vs(Ho)}function $m(e,n){if(e==="click")return Vs(n)}function Am(e,n){if(e==="input"||e==="change")return Vs(n)}function Pm(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var mn=typeof Object.is=="function"?Object.is:Pm;function Vo(e,n){if(mn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var r=Object.keys(e),s=Object.keys(n);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var a=r[s];if(!g.call(n,a)||!mn(e[a],n[a]))return!1}return!0}function qu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yu(e,n){var r=qu(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=n&&s>=n)return{node:r,offset:n-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=qu(r)}}function Qu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Qu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ku(){for(var e=window,n=yt();n instanceof e.HTMLIFrameElement;){try{var r=typeof n.contentWindow.location.href=="string"}catch{r=!1}if(r)e=n.contentWindow;else break;n=yt(e.document)}return n}function Ul(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Mm(e){var n=Ku(),r=e.focusedElem,s=e.selectionRange;if(n!==r&&r&&r.ownerDocument&&Qu(r.ownerDocument.documentElement,r)){if(s!==null&&Ul(r)){if(n=s.start,e=s.end,e===void 0&&(e=n),"selectionStart"in r)r.selectionStart=n,r.selectionEnd=Math.min(e,r.value.length);else if(e=(n=r.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,u=Math.min(s.start,a);s=s.end===void 0?u:Math.min(s.end,a),!e.extend&&u>s&&(a=s,s=u,u=a),a=Yu(r,u);var f=Yu(r,s);a&&f&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(n=n.createRange(),n.setStart(a.node,a.offset),e.removeAllRanges(),u>s?(e.addRange(n),e.extend(f.node,f.offset)):(n.setEnd(f.node,f.offset),e.addRange(n)))}}for(n=[],e=r;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<n.length;r++)e=n[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Om=y&&"documentMode"in document&&11>=document.documentMode,Xr=null,Hl=null,Wo=null,Vl=!1;function Xu(e,n,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Vl||Xr==null||Xr!==yt(s)||(s=Xr,"selectionStart"in s&&Ul(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Wo&&Vo(Wo,s)||(Wo=s,s=Ys(Hl,"onSelect"),0<s.length&&(n=new Pl("onSelect","select",null,n,r),e.push({event:n,listeners:s}),n.target=Xr)))}function Ws(e,n){var r={};return r[e.toLowerCase()]=n.toLowerCase(),r["Webkit"+e]="webkit"+n,r["Moz"+e]="moz"+n,r}var Jr={animationend:Ws("Animation","AnimationEnd"),animationiteration:Ws("Animation","AnimationIteration"),animationstart:Ws("Animation","AnimationStart"),transitionend:Ws("Transition","TransitionEnd")},Wl={},Ju={};y&&(Ju=document.createElement("div").style,"AnimationEvent"in window||(delete Jr.animationend.animation,delete Jr.animationiteration.animation,delete Jr.animationstart.animation),"TransitionEvent"in window||delete Jr.transitionend.transition);function Gs(e){if(Wl[e])return Wl[e];if(!Jr[e])return e;var n=Jr[e],r;for(r in n)if(n.hasOwnProperty(r)&&r in Ju)return Wl[e]=n[r];return e}var Zu=Gs("animationend"),ed=Gs("animationiteration"),td=Gs("animationstart"),nd=Gs("transitionend"),rd=new Map,od="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function sr(e,n){rd.set(e,n),p(n,[e])}for(var Gl=0;Gl<od.length;Gl++){var ql=od[Gl],Lm=ql.toLowerCase(),zm=ql[0].toUpperCase()+ql.slice(1);sr(Lm,"on"+zm)}sr(Zu,"onAnimationEnd"),sr(ed,"onAnimationIteration"),sr(td,"onAnimationStart"),sr("dblclick","onDoubleClick"),sr("focusin","onFocus"),sr("focusout","onBlur"),sr(nd,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),p("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),p("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),p("onBeforeInput",["compositionend","keypress","textInput","paste"]),p("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Go));function sd(e,n,r){var s=e.type||"unknown-event";e.currentTarget=r,Jn(s,n,void 0,e),e.currentTarget=null}function id(e,n){n=(n&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],a=s.event;s=s.listeners;e:{var u=void 0;if(n)for(var f=s.length-1;0<=f;f--){var h=s[f],x=h.instance,j=h.currentTarget;if(h=h.listener,x!==u&&a.isPropagationStopped())break e;sd(a,h,j),u=x}else for(f=0;f<s.length;f++){if(h=s[f],x=h.instance,j=h.currentTarget,h=h.listener,x!==u&&a.isPropagationStopped())break e;sd(a,h,j),u=x}}}if(Be)throw e=lt,Be=!1,lt=null,e}function Xe(e,n){var r=n[ta];r===void 0&&(r=n[ta]=new Set);var s=e+"__bubble";r.has(s)||(ld(n,e,2,!1),r.add(s))}function Yl(e,n,r){var s=0;n&&(s|=4),ld(r,e,s,n)}var qs="_reactListening"+Math.random().toString(36).slice(2);function qo(e){if(!e[qs]){e[qs]=!0,c.forEach(function(r){r!=="selectionchange"&&(Fm.has(r)||Yl(r,!1,e),Yl(r,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[qs]||(n[qs]=!0,Yl("selectionchange",!1,n))}}function ld(e,n,r,s){switch(Iu(n)){case 1:var a=Zh;break;case 4:a=em;break;default:a=Rl}r=a.bind(null,n,r,e),a=void 0,!_||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(n,r,{capture:!0,passive:a}):e.addEventListener(n,r,!0):a!==void 0?e.addEventListener(n,r,{passive:a}):e.addEventListener(n,r,!1)}function Ql(e,n,r,s,a){var u=s;if((n&1)===0&&(n&2)===0&&s!==null)e:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var h=s.stateNode.containerInfo;if(h===a||h.nodeType===8&&h.parentNode===a)break;if(f===4)for(f=s.return;f!==null;){var x=f.tag;if((x===3||x===4)&&(x=f.stateNode.containerInfo,x===a||x.nodeType===8&&x.parentNode===a))return;f=f.return}for(;h!==null;){if(f=Nr(h),f===null)return;if(x=f.tag,x===5||x===6){s=u=f;continue e}h=h.parentNode}}s=s.return}S(function(){var j=u,L=Er(r),D=[];e:{var M=rd.get(e);if(M!==void 0){var oe=Pl,ce=e;switch(e){case"keypress":if(Bs(r)===0)break e;case"keydown":case"keyup":oe=mm;break;case"focusin":ce="focus",oe=Ll;break;case"focusout":ce="blur",oe=Ll;break;case"beforeblur":case"afterblur":oe=Ll;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":oe=Au;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":oe=rm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":oe=ym;break;case Zu:case ed:case td:oe=im;break;case nd:oe=bm;break;case"scroll":oe=tm;break;case"wheel":oe=Sm;break;case"copy":case"cut":case"paste":oe=am;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":oe=Mu}var ue=(n&4)!==0,ct=!ue&&e==="scroll",k=ue?M!==null?M+"Capture":null:M;ue=[];for(var v=j,C;v!==null;){C=v;var H=C.stateNode;if(C.tag===5&&H!==null&&(C=H,k!==null&&(H=w(v,k),H!=null&&ue.push(Yo(v,H,C)))),ct)break;v=v.return}0<ue.length&&(M=new oe(M,ce,null,r,L),D.push({event:M,listeners:ue}))}}if((n&7)===0){e:{if(M=e==="mouseover"||e==="pointerover",oe=e==="mouseout"||e==="pointerout",M&&r!==Cr&&(ce=r.relatedTarget||r.fromElement)&&(Nr(ce)||ce[On]))break e;if((oe||M)&&(M=L.window===L?L:(M=L.ownerDocument)?M.defaultView||M.parentWindow:window,oe?(ce=r.relatedTarget||r.toElement,oe=j,ce=ce?Nr(ce):null,ce!==null&&(ct=En(ce),ce!==ct||ce.tag!==5&&ce.tag!==6)&&(ce=null)):(oe=null,ce=j),oe!==ce)){if(ue=Au,H="onMouseLeave",k="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(ue=Mu,H="onPointerLeave",k="onPointerEnter",v="pointer"),ct=oe==null?M:to(oe),C=ce==null?M:to(ce),M=new ue(H,v+"leave",oe,r,L),M.target=ct,M.relatedTarget=C,H=null,Nr(L)===j&&(ue=new ue(k,v+"enter",ce,r,L),ue.target=C,ue.relatedTarget=ct,H=ue),ct=H,oe&&ce)t:{for(ue=oe,k=ce,v=0,C=ue;C;C=Zr(C))v++;for(C=0,H=k;H;H=Zr(H))C++;for(;0<v-C;)ue=Zr(ue),v--;for(;0<C-v;)k=Zr(k),C--;for(;v--;){if(ue===k||k!==null&&ue===k.alternate)break t;ue=Zr(ue),k=Zr(k)}ue=null}else ue=null;oe!==null&&ad(D,M,oe,ue,!1),ce!==null&&ct!==null&&ad(D,ct,ce,ue,!0)}}e:{if(M=j?to(j):window,oe=M.nodeName&&M.nodeName.toLowerCase(),oe==="select"||oe==="input"&&M.type==="file")var fe=Tm;else if(Bu(M))if(Hu)fe=Am;else{fe=Rm;var ve=Im}else(oe=M.nodeName)&&oe.toLowerCase()==="input"&&(M.type==="checkbox"||M.type==="radio")&&(fe=$m);if(fe&&(fe=fe(e,j))){Uu(D,fe,r,L);break e}ve&&ve(e,M,j),e==="focusout"&&(ve=M._wrapperState)&&ve.controlled&&M.type==="number"&&pn(M,"number",M.value)}switch(ve=j?to(j):window,e){case"focusin":(Bu(ve)||ve.contentEditable==="true")&&(Xr=ve,Hl=j,Wo=null);break;case"focusout":Wo=Hl=Xr=null;break;case"mousedown":Vl=!0;break;case"contextmenu":case"mouseup":case"dragend":Vl=!1,Xu(D,r,L);break;case"selectionchange":if(Om)break;case"keydown":case"keyup":Xu(D,r,L)}var be;if(Fl)e:{switch(e){case"compositionstart":var _e="onCompositionStart";break e;case"compositionend":_e="onCompositionEnd";break e;case"compositionupdate":_e="onCompositionUpdate";break e}_e=void 0}else Kr?Fu(e,r)&&(_e="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(_e="onCompositionStart");_e&&(Ou&&r.locale!=="ko"&&(Kr||_e!=="onCompositionStart"?_e==="onCompositionEnd"&&Kr&&(be=Ru()):(or=L,Al="value"in or?or.value:or.textContent,Kr=!0)),ve=Ys(j,_e),0<ve.length&&(_e=new Pu(_e,e,null,r,L),D.push({event:_e,listeners:ve}),be?_e.data=be:(be=Du(r),be!==null&&(_e.data=be)))),(be=Cm?Em(e,r):jm(e,r))&&(j=Ys(j,"onBeforeInput"),0<j.length&&(L=new Pu("onBeforeInput","beforeinput",null,r,L),D.push({event:L,listeners:j}),L.data=be))}id(D,n)})}function Yo(e,n,r){return{instance:e,listener:n,currentTarget:r}}function Ys(e,n){for(var r=n+"Capture",s=[];e!==null;){var a=e,u=a.stateNode;a.tag===5&&u!==null&&(a=u,u=w(e,r),u!=null&&s.unshift(Yo(e,u,a)),u=w(e,n),u!=null&&s.push(Yo(e,u,a))),e=e.return}return s}function Zr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ad(e,n,r,s,a){for(var u=n._reactName,f=[];r!==null&&r!==s;){var h=r,x=h.alternate,j=h.stateNode;if(x!==null&&x===s)break;h.tag===5&&j!==null&&(h=j,a?(x=w(r,u),x!=null&&f.unshift(Yo(r,x,h))):a||(x=w(r,u),x!=null&&f.push(Yo(r,x,h)))),r=r.return}f.length!==0&&e.push({event:n,listeners:f})}var Dm=/\r\n?/g,Bm=/\u0000|\uFFFD/g;function cd(e){return(typeof e=="string"?e:""+e).replace(Dm,`
`).replace(Bm,"")}function Qs(e,n,r){if(n=cd(n),cd(e)!==n&&r)throw Error(i(425))}function Ks(){}var Kl=null,Xl=null;function Jl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Zl=typeof setTimeout=="function"?setTimeout:void 0,Um=typeof clearTimeout=="function"?clearTimeout:void 0,ud=typeof Promise=="function"?Promise:void 0,Hm=typeof queueMicrotask=="function"?queueMicrotask:typeof ud<"u"?function(e){return ud.resolve(null).then(e).catch(Vm)}:Zl;function Vm(e){setTimeout(function(){throw e})}function ea(e,n){var r=n,s=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(s===0){e.removeChild(a),zo(n);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=a}while(r);zo(n)}function ir(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function dd(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(n===0)return e;n--}else r==="/$"&&n++}e=e.previousSibling}return null}var eo=Math.random().toString(36).slice(2),_n="__reactFiber$"+eo,Qo="__reactProps$"+eo,On="__reactContainer$"+eo,ta="__reactEvents$"+eo,Wm="__reactListeners$"+eo,Gm="__reactHandles$"+eo;function Nr(e){var n=e[_n];if(n)return n;for(var r=e.parentNode;r;){if(n=r[On]||r[_n]){if(r=n.alternate,n.child!==null||r!==null&&r.child!==null)for(e=dd(e);e!==null;){if(r=e[_n])return r;e=dd(e)}return n}e=r,r=e.parentNode}return null}function Ko(e){return e=e[_n]||e[On],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function to(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Xs(e){return e[Qo]||null}var na=[],no=-1;function lr(e){return{current:e}}function Je(e){0>no||(e.current=na[no],na[no]=null,no--)}function Ke(e,n){no++,na[no]=e.current,e.current=n}var ar={},Nt=lr(ar),Dt=lr(!1),Tr=ar;function ro(e,n){var r=e.type.contextTypes;if(!r)return ar;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===n)return s.__reactInternalMemoizedMaskedChildContext;var a={},u;for(u in r)a[u]=n[u];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=a),a}function Bt(e){return e=e.childContextTypes,e!=null}function Js(){Je(Dt),Je(Nt)}function fd(e,n,r){if(Nt.current!==ar)throw Error(i(168));Ke(Nt,n),Ke(Dt,r)}function pd(e,n,r){var s=e.stateNode;if(n=n.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var a in s)if(!(a in n))throw Error(i(108,ye(e)||"Unknown",a));return O({},r,s)}function Zs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||ar,Tr=Nt.current,Ke(Nt,e),Ke(Dt,Dt.current),!0}function hd(e,n,r){var s=e.stateNode;if(!s)throw Error(i(169));r?(e=pd(e,n,Tr),s.__reactInternalMemoizedMergedChildContext=e,Je(Dt),Je(Nt),Ke(Nt,e)):Je(Dt),Ke(Dt,r)}var Ln=null,ei=!1,ra=!1;function md(e){Ln===null?Ln=[e]:Ln.push(e)}function qm(e){ei=!0,md(e)}function cr(){if(!ra&&Ln!==null){ra=!0;var e=0,n=qe;try{var r=Ln;for(qe=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}Ln=null,ei=!1}catch(a){throw Ln!==null&&(Ln=Ln.slice(e+1)),xu(El,cr),a}finally{qe=n,ra=!1}}return null}var oo=[],so=0,ti=null,ni=0,on=[],sn=0,Ir=null,zn=1,Fn="";function Rr(e,n){oo[so++]=ni,oo[so++]=ti,ti=e,ni=n}function gd(e,n,r){on[sn++]=zn,on[sn++]=Fn,on[sn++]=Ir,Ir=e;var s=zn;e=Fn;var a=32-hn(s)-1;s&=~(1<<a),r+=1;var u=32-hn(n)+a;if(30<u){var f=a-a%5;u=(s&(1<<f)-1).toString(32),s>>=f,a-=f,zn=1<<32-hn(n)+a|r<<a|s,Fn=u+e}else zn=1<<u|r<<a|s,Fn=e}function oa(e){e.return!==null&&(Rr(e,1),gd(e,1,0))}function sa(e){for(;e===ti;)ti=oo[--so],oo[so]=null,ni=oo[--so],oo[so]=null;for(;e===Ir;)Ir=on[--sn],on[sn]=null,Fn=on[--sn],on[sn]=null,zn=on[--sn],on[sn]=null}var Xt=null,Jt=null,tt=!1,gn=null;function xd(e,n){var r=un(5,null,null,0);r.elementType="DELETED",r.stateNode=n,r.return=e,n=e.deletions,n===null?(e.deletions=[r],e.flags|=16):n.push(r)}function yd(e,n){switch(e.tag){case 5:var r=e.type;return n=n.nodeType!==1||r.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Xt=e,Jt=ir(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Xt=e,Jt=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(r=Ir!==null?{id:zn,overflow:Fn}:null,e.memoizedState={dehydrated:n,treeContext:r,retryLane:1073741824},r=un(18,null,null,0),r.stateNode=n,r.return=e,e.child=r,Xt=e,Jt=null,!0):!1;default:return!1}}function ia(e){return(e.mode&1)!==0&&(e.flags&128)===0}function la(e){if(tt){var n=Jt;if(n){var r=n;if(!yd(e,n)){if(ia(e))throw Error(i(418));n=ir(r.nextSibling);var s=Xt;n&&yd(e,n)?xd(s,r):(e.flags=e.flags&-4097|2,tt=!1,Xt=e)}}else{if(ia(e))throw Error(i(418));e.flags=e.flags&-4097|2,tt=!1,Xt=e}}}function vd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Xt=e}function ri(e){if(e!==Xt)return!1;if(!tt)return vd(e),tt=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Jl(e.type,e.memoizedProps)),n&&(n=Jt)){if(ia(e))throw bd(),Error(i(418));for(;n;)xd(e,n),n=ir(n.nextSibling)}if(vd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(n===0){Jt=ir(e.nextSibling);break e}n--}else r!=="$"&&r!=="$!"&&r!=="$?"||n++}e=e.nextSibling}Jt=null}}else Jt=Xt?ir(e.stateNode.nextSibling):null;return!0}function bd(){for(var e=Jt;e;)e=ir(e.nextSibling)}function io(){Jt=Xt=null,tt=!1}function aa(e){gn===null?gn=[e]:gn.push(e)}var Ym=Ie.ReactCurrentBatchConfig;function Xo(e,n,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(i(309));var s=r.stateNode}if(!s)throw Error(i(147,e));var a=s,u=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===u?n.ref:(n=function(f){var h=a.refs;f===null?delete h[u]:h[u]=f},n._stringRef=u,n)}if(typeof e!="string")throw Error(i(284));if(!r._owner)throw Error(i(290,e))}return e}function oi(e,n){throw e=Object.prototype.toString.call(n),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function wd(e){var n=e._init;return n(e._payload)}function Sd(e){function n(k,v){if(e){var C=k.deletions;C===null?(k.deletions=[v],k.flags|=16):C.push(v)}}function r(k,v){if(!e)return null;for(;v!==null;)n(k,v),v=v.sibling;return null}function s(k,v){for(k=new Map;v!==null;)v.key!==null?k.set(v.key,v):k.set(v.index,v),v=v.sibling;return k}function a(k,v){return k=xr(k,v),k.index=0,k.sibling=null,k}function u(k,v,C){return k.index=C,e?(C=k.alternate,C!==null?(C=C.index,C<v?(k.flags|=2,v):C):(k.flags|=2,v)):(k.flags|=1048576,v)}function f(k){return e&&k.alternate===null&&(k.flags|=2),k}function h(k,v,C,H){return v===null||v.tag!==6?(v=Za(C,k.mode,H),v.return=k,v):(v=a(v,C),v.return=k,v)}function x(k,v,C,H){var fe=C.type;return fe===V?L(k,v,C.props.children,H,C.key):v!==null&&(v.elementType===fe||typeof fe=="object"&&fe!==null&&fe.$$typeof===Oe&&wd(fe)===v.type)?(H=a(v,C.props),H.ref=Xo(k,v,C),H.return=k,H):(H=Ni(C.type,C.key,C.props,null,k.mode,H),H.ref=Xo(k,v,C),H.return=k,H)}function j(k,v,C,H){return v===null||v.tag!==4||v.stateNode.containerInfo!==C.containerInfo||v.stateNode.implementation!==C.implementation?(v=ec(C,k.mode,H),v.return=k,v):(v=a(v,C.children||[]),v.return=k,v)}function L(k,v,C,H,fe){return v===null||v.tag!==7?(v=Fr(C,k.mode,H,fe),v.return=k,v):(v=a(v,C),v.return=k,v)}function D(k,v,C){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Za(""+v,k.mode,C),v.return=k,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case we:return C=Ni(v.type,v.key,v.props,null,k.mode,C),C.ref=Xo(k,null,v),C.return=k,C;case pe:return v=ec(v,k.mode,C),v.return=k,v;case Oe:var H=v._init;return D(k,H(v._payload),C)}if(Pt(v)||J(v))return v=Fr(v,k.mode,C,null),v.return=k,v;oi(k,v)}return null}function M(k,v,C,H){var fe=v!==null?v.key:null;if(typeof C=="string"&&C!==""||typeof C=="number")return fe!==null?null:h(k,v,""+C,H);if(typeof C=="object"&&C!==null){switch(C.$$typeof){case we:return C.key===fe?x(k,v,C,H):null;case pe:return C.key===fe?j(k,v,C,H):null;case Oe:return fe=C._init,M(k,v,fe(C._payload),H)}if(Pt(C)||J(C))return fe!==null?null:L(k,v,C,H,null);oi(k,C)}return null}function oe(k,v,C,H,fe){if(typeof H=="string"&&H!==""||typeof H=="number")return k=k.get(C)||null,h(v,k,""+H,fe);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case we:return k=k.get(H.key===null?C:H.key)||null,x(v,k,H,fe);case pe:return k=k.get(H.key===null?C:H.key)||null,j(v,k,H,fe);case Oe:var ve=H._init;return oe(k,v,C,ve(H._payload),fe)}if(Pt(H)||J(H))return k=k.get(C)||null,L(v,k,H,fe,null);oi(v,H)}return null}function ce(k,v,C,H){for(var fe=null,ve=null,be=v,_e=v=0,St=null;be!==null&&_e<C.length;_e++){be.index>_e?(St=be,be=null):St=be.sibling;var De=M(k,be,C[_e],H);if(De===null){be===null&&(be=St);break}e&&be&&De.alternate===null&&n(k,be),v=u(De,v,_e),ve===null?fe=De:ve.sibling=De,ve=De,be=St}if(_e===C.length)return r(k,be),tt&&Rr(k,_e),fe;if(be===null){for(;_e<C.length;_e++)be=D(k,C[_e],H),be!==null&&(v=u(be,v,_e),ve===null?fe=be:ve.sibling=be,ve=be);return tt&&Rr(k,_e),fe}for(be=s(k,be);_e<C.length;_e++)St=oe(be,k,_e,C[_e],H),St!==null&&(e&&St.alternate!==null&&be.delete(St.key===null?_e:St.key),v=u(St,v,_e),ve===null?fe=St:ve.sibling=St,ve=St);return e&&be.forEach(function(yr){return n(k,yr)}),tt&&Rr(k,_e),fe}function ue(k,v,C,H){var fe=J(C);if(typeof fe!="function")throw Error(i(150));if(C=fe.call(C),C==null)throw Error(i(151));for(var ve=fe=null,be=v,_e=v=0,St=null,De=C.next();be!==null&&!De.done;_e++,De=C.next()){be.index>_e?(St=be,be=null):St=be.sibling;var yr=M(k,be,De.value,H);if(yr===null){be===null&&(be=St);break}e&&be&&yr.alternate===null&&n(k,be),v=u(yr,v,_e),ve===null?fe=yr:ve.sibling=yr,ve=yr,be=St}if(De.done)return r(k,be),tt&&Rr(k,_e),fe;if(be===null){for(;!De.done;_e++,De=C.next())De=D(k,De.value,H),De!==null&&(v=u(De,v,_e),ve===null?fe=De:ve.sibling=De,ve=De);return tt&&Rr(k,_e),fe}for(be=s(k,be);!De.done;_e++,De=C.next())De=oe(be,k,_e,De.value,H),De!==null&&(e&&De.alternate!==null&&be.delete(De.key===null?_e:De.key),v=u(De,v,_e),ve===null?fe=De:ve.sibling=De,ve=De);return e&&be.forEach(function(_0){return n(k,_0)}),tt&&Rr(k,_e),fe}function ct(k,v,C,H){if(typeof C=="object"&&C!==null&&C.type===V&&C.key===null&&(C=C.props.children),typeof C=="object"&&C!==null){switch(C.$$typeof){case we:e:{for(var fe=C.key,ve=v;ve!==null;){if(ve.key===fe){if(fe=C.type,fe===V){if(ve.tag===7){r(k,ve.sibling),v=a(ve,C.props.children),v.return=k,k=v;break e}}else if(ve.elementType===fe||typeof fe=="object"&&fe!==null&&fe.$$typeof===Oe&&wd(fe)===ve.type){r(k,ve.sibling),v=a(ve,C.props),v.ref=Xo(k,ve,C),v.return=k,k=v;break e}r(k,ve);break}else n(k,ve);ve=ve.sibling}C.type===V?(v=Fr(C.props.children,k.mode,H,C.key),v.return=k,k=v):(H=Ni(C.type,C.key,C.props,null,k.mode,H),H.ref=Xo(k,v,C),H.return=k,k=H)}return f(k);case pe:e:{for(ve=C.key;v!==null;){if(v.key===ve)if(v.tag===4&&v.stateNode.containerInfo===C.containerInfo&&v.stateNode.implementation===C.implementation){r(k,v.sibling),v=a(v,C.children||[]),v.return=k,k=v;break e}else{r(k,v);break}else n(k,v);v=v.sibling}v=ec(C,k.mode,H),v.return=k,k=v}return f(k);case Oe:return ve=C._init,ct(k,v,ve(C._payload),H)}if(Pt(C))return ce(k,v,C,H);if(J(C))return ue(k,v,C,H);oi(k,C)}return typeof C=="string"&&C!==""||typeof C=="number"?(C=""+C,v!==null&&v.tag===6?(r(k,v.sibling),v=a(v,C),v.return=k,k=v):(r(k,v),v=Za(C,k.mode,H),v.return=k,k=v),f(k)):r(k,v)}return ct}var lo=Sd(!0),kd=Sd(!1),si=lr(null),ii=null,ao=null,ca=null;function ua(){ca=ao=ii=null}function da(e){var n=si.current;Je(si),e._currentValue=n}function fa(e,n,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),e===r)break;e=e.return}}function co(e,n){ii=e,ca=ao=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&n)!==0&&(Ut=!0),e.firstContext=null)}function ln(e){var n=e._currentValue;if(ca!==e)if(e={context:e,memoizedValue:n,next:null},ao===null){if(ii===null)throw Error(i(308));ao=e,ii.dependencies={lanes:0,firstContext:e}}else ao=ao.next=e;return n}var $r=null;function pa(e){$r===null?$r=[e]:$r.push(e)}function Cd(e,n,r,s){var a=n.interleaved;return a===null?(r.next=r,pa(n)):(r.next=a.next,a.next=r),n.interleaved=r,Dn(e,s)}function Dn(e,n){e.lanes|=n;var r=e.alternate;for(r!==null&&(r.lanes|=n),r=e,e=e.return;e!==null;)e.childLanes|=n,r=e.alternate,r!==null&&(r.childLanes|=n),r=e,e=e.return;return r.tag===3?r.stateNode:null}var ur=!1;function ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ed(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Bn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function dr(e,n,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(ze&2)!==0){var a=s.pending;return a===null?n.next=n:(n.next=a.next,a.next=n),s.pending=n,Dn(e,r)}return a=s.interleaved,a===null?(n.next=n,pa(s)):(n.next=a.next,a.next=n),s.interleaved=n,Dn(e,r)}function li(e,n,r){if(n=n.updateQueue,n!==null&&(n=n.shared,(r&4194240)!==0)){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,Nl(e,r)}}function jd(e,n){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var a=null,u=null;if(r=r.firstBaseUpdate,r!==null){do{var f={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};u===null?a=u=f:u=u.next=f,r=r.next}while(r!==null);u===null?a=u=n:u=u.next=n}else a=u=n;r={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:u,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=n:e.next=n,r.lastBaseUpdate=n}function ai(e,n,r,s){var a=e.updateQueue;ur=!1;var u=a.firstBaseUpdate,f=a.lastBaseUpdate,h=a.shared.pending;if(h!==null){a.shared.pending=null;var x=h,j=x.next;x.next=null,f===null?u=j:f.next=j,f=x;var L=e.alternate;L!==null&&(L=L.updateQueue,h=L.lastBaseUpdate,h!==f&&(h===null?L.firstBaseUpdate=j:h.next=j,L.lastBaseUpdate=x))}if(u!==null){var D=a.baseState;f=0,L=j=x=null,h=u;do{var M=h.lane,oe=h.eventTime;if((s&M)===M){L!==null&&(L=L.next={eventTime:oe,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});e:{var ce=e,ue=h;switch(M=n,oe=r,ue.tag){case 1:if(ce=ue.payload,typeof ce=="function"){D=ce.call(oe,D,M);break e}D=ce;break e;case 3:ce.flags=ce.flags&-65537|128;case 0:if(ce=ue.payload,M=typeof ce=="function"?ce.call(oe,D,M):ce,M==null)break e;D=O({},D,M);break e;case 2:ur=!0}}h.callback!==null&&h.lane!==0&&(e.flags|=64,M=a.effects,M===null?a.effects=[h]:M.push(h))}else oe={eventTime:oe,lane:M,tag:h.tag,payload:h.payload,callback:h.callback,next:null},L===null?(j=L=oe,x=D):L=L.next=oe,f|=M;if(h=h.next,h===null){if(h=a.shared.pending,h===null)break;M=h,h=M.next,M.next=null,a.lastBaseUpdate=M,a.shared.pending=null}}while(!0);if(L===null&&(x=D),a.baseState=x,a.firstBaseUpdate=j,a.lastBaseUpdate=L,n=a.shared.interleaved,n!==null){a=n;do f|=a.lane,a=a.next;while(a!==n)}else u===null&&(a.shared.lanes=0);Mr|=f,e.lanes=f,e.memoizedState=D}}function _d(e,n,r){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var s=e[n],a=s.callback;if(a!==null){if(s.callback=null,s=r,typeof a!="function")throw Error(i(191,a));a.call(s)}}}var Jo={},Nn=lr(Jo),Zo=lr(Jo),es=lr(Jo);function Ar(e){if(e===Jo)throw Error(i(174));return e}function ma(e,n){switch(Ke(es,n),Ke(Zo,e),Ke(Nn,Jo),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:et(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=et(n,e)}Je(Nn),Ke(Nn,n)}function uo(){Je(Nn),Je(Zo),Je(es)}function Nd(e){Ar(es.current);var n=Ar(Nn.current),r=et(n,e.type);n!==r&&(Ke(Zo,e),Ke(Nn,r))}function ga(e){Zo.current===e&&(Je(Nn),Je(Zo))}var nt=lr(0);function ci(e){for(var n=e;n!==null;){if(n.tag===13){var r=n.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var xa=[];function ya(){for(var e=0;e<xa.length;e++)xa[e]._workInProgressVersionPrimary=null;xa.length=0}var ui=Ie.ReactCurrentDispatcher,va=Ie.ReactCurrentBatchConfig,Pr=0,rt=null,ht=null,bt=null,di=!1,ts=!1,ns=0,Qm=0;function Tt(){throw Error(i(321))}function ba(e,n){if(n===null)return!1;for(var r=0;r<n.length&&r<e.length;r++)if(!mn(e[r],n[r]))return!1;return!0}function wa(e,n,r,s,a,u){if(Pr=u,rt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,ui.current=e===null||e.memoizedState===null?Zm:e0,e=r(s,a),ts){u=0;do{if(ts=!1,ns=0,25<=u)throw Error(i(301));u+=1,bt=ht=null,n.updateQueue=null,ui.current=t0,e=r(s,a)}while(ts)}if(ui.current=hi,n=ht!==null&&ht.next!==null,Pr=0,bt=ht=rt=null,di=!1,n)throw Error(i(300));return e}function Sa(){var e=ns!==0;return ns=0,e}function Tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return bt===null?rt.memoizedState=bt=e:bt=bt.next=e,bt}function an(){if(ht===null){var e=rt.alternate;e=e!==null?e.memoizedState:null}else e=ht.next;var n=bt===null?rt.memoizedState:bt.next;if(n!==null)bt=n,ht=e;else{if(e===null)throw Error(i(310));ht=e,e={memoizedState:ht.memoizedState,baseState:ht.baseState,baseQueue:ht.baseQueue,queue:ht.queue,next:null},bt===null?rt.memoizedState=bt=e:bt=bt.next=e}return bt}function rs(e,n){return typeof n=="function"?n(e):n}function ka(e){var n=an(),r=n.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=ht,a=s.baseQueue,u=r.pending;if(u!==null){if(a!==null){var f=a.next;a.next=u.next,u.next=f}s.baseQueue=a=u,r.pending=null}if(a!==null){u=a.next,s=s.baseState;var h=f=null,x=null,j=u;do{var L=j.lane;if((Pr&L)===L)x!==null&&(x=x.next={lane:0,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null}),s=j.hasEagerState?j.eagerState:e(s,j.action);else{var D={lane:L,action:j.action,hasEagerState:j.hasEagerState,eagerState:j.eagerState,next:null};x===null?(h=x=D,f=s):x=x.next=D,rt.lanes|=L,Mr|=L}j=j.next}while(j!==null&&j!==u);x===null?f=s:x.next=h,mn(s,n.memoizedState)||(Ut=!0),n.memoizedState=s,n.baseState=f,n.baseQueue=x,r.lastRenderedState=s}if(e=r.interleaved,e!==null){a=e;do u=a.lane,rt.lanes|=u,Mr|=u,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[n.memoizedState,r.dispatch]}function Ca(e){var n=an(),r=n.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=r.dispatch,a=r.pending,u=n.memoizedState;if(a!==null){r.pending=null;var f=a=a.next;do u=e(u,f.action),f=f.next;while(f!==a);mn(u,n.memoizedState)||(Ut=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),r.lastRenderedState=u}return[u,s]}function Td(){}function Id(e,n){var r=rt,s=an(),a=n(),u=!mn(s.memoizedState,a);if(u&&(s.memoizedState=a,Ut=!0),s=s.queue,Ea(Ad.bind(null,r,s,e),[e]),s.getSnapshot!==n||u||bt!==null&&bt.memoizedState.tag&1){if(r.flags|=2048,os(9,$d.bind(null,r,s,a,n),void 0,null),wt===null)throw Error(i(349));(Pr&30)!==0||Rd(r,n,a)}return a}function Rd(e,n,r){e.flags|=16384,e={getSnapshot:n,value:r},n=rt.updateQueue,n===null?(n={lastEffect:null,stores:null},rt.updateQueue=n,n.stores=[e]):(r=n.stores,r===null?n.stores=[e]:r.push(e))}function $d(e,n,r,s){n.value=r,n.getSnapshot=s,Pd(n)&&Md(e)}function Ad(e,n,r){return r(function(){Pd(n)&&Md(e)})}function Pd(e){var n=e.getSnapshot;e=e.value;try{var r=n();return!mn(e,r)}catch{return!0}}function Md(e){var n=Dn(e,1);n!==null&&bn(n,e,1,-1)}function Od(e){var n=Tn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:e},n.queue=e,e=e.dispatch=Jm.bind(null,rt,e),[n.memoizedState,e]}function os(e,n,r,s){return e={tag:e,create:n,destroy:r,deps:s,next:null},n=rt.updateQueue,n===null?(n={lastEffect:null,stores:null},rt.updateQueue=n,n.lastEffect=e.next=e):(r=n.lastEffect,r===null?n.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,n.lastEffect=e)),e}function Ld(){return an().memoizedState}function fi(e,n,r,s){var a=Tn();rt.flags|=e,a.memoizedState=os(1|n,r,void 0,s===void 0?null:s)}function pi(e,n,r,s){var a=an();s=s===void 0?null:s;var u=void 0;if(ht!==null){var f=ht.memoizedState;if(u=f.destroy,s!==null&&ba(s,f.deps)){a.memoizedState=os(n,r,u,s);return}}rt.flags|=e,a.memoizedState=os(1|n,r,u,s)}function zd(e,n){return fi(8390656,8,e,n)}function Ea(e,n){return pi(2048,8,e,n)}function Fd(e,n){return pi(4,2,e,n)}function Dd(e,n){return pi(4,4,e,n)}function Bd(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ud(e,n,r){return r=r!=null?r.concat([e]):null,pi(4,4,Bd.bind(null,n,e),r)}function ja(){}function Hd(e,n){var r=an();n=n===void 0?null:n;var s=r.memoizedState;return s!==null&&n!==null&&ba(n,s[1])?s[0]:(r.memoizedState=[e,n],e)}function Vd(e,n){var r=an();n=n===void 0?null:n;var s=r.memoizedState;return s!==null&&n!==null&&ba(n,s[1])?s[0]:(e=e(),r.memoizedState=[e,n],e)}function Wd(e,n,r){return(Pr&21)===0?(e.baseState&&(e.baseState=!1,Ut=!0),e.memoizedState=r):(mn(r,n)||(r=wu(),rt.lanes|=r,Mr|=r,e.baseState=!0),n)}function Km(e,n){var r=qe;qe=r!==0&&4>r?r:4,e(!0);var s=va.transition;va.transition={};try{e(!1),n()}finally{qe=r,va.transition=s}}function Gd(){return an().memoizedState}function Xm(e,n,r){var s=mr(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},qd(e))Yd(n,r);else if(r=Cd(e,n,r,s),r!==null){var a=Lt();bn(r,e,s,a),Qd(r,n,s)}}function Jm(e,n,r){var s=mr(e),a={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(qd(e))Yd(n,a);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var f=n.lastRenderedState,h=u(f,r);if(a.hasEagerState=!0,a.eagerState=h,mn(h,f)){var x=n.interleaved;x===null?(a.next=a,pa(n)):(a.next=x.next,x.next=a),n.interleaved=a;return}}catch{}finally{}r=Cd(e,n,a,s),r!==null&&(a=Lt(),bn(r,e,s,a),Qd(r,n,s))}}function qd(e){var n=e.alternate;return e===rt||n!==null&&n===rt}function Yd(e,n){ts=di=!0;var r=e.pending;r===null?n.next=n:(n.next=r.next,r.next=n),e.pending=n}function Qd(e,n,r){if((r&4194240)!==0){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,Nl(e,r)}}var hi={readContext:ln,useCallback:Tt,useContext:Tt,useEffect:Tt,useImperativeHandle:Tt,useInsertionEffect:Tt,useLayoutEffect:Tt,useMemo:Tt,useReducer:Tt,useRef:Tt,useState:Tt,useDebugValue:Tt,useDeferredValue:Tt,useTransition:Tt,useMutableSource:Tt,useSyncExternalStore:Tt,useId:Tt,unstable_isNewReconciler:!1},Zm={readContext:ln,useCallback:function(e,n){return Tn().memoizedState=[e,n===void 0?null:n],e},useContext:ln,useEffect:zd,useImperativeHandle:function(e,n,r){return r=r!=null?r.concat([e]):null,fi(4194308,4,Bd.bind(null,n,e),r)},useLayoutEffect:function(e,n){return fi(4194308,4,e,n)},useInsertionEffect:function(e,n){return fi(4,2,e,n)},useMemo:function(e,n){var r=Tn();return n=n===void 0?null:n,e=e(),r.memoizedState=[e,n],e},useReducer:function(e,n,r){var s=Tn();return n=r!==void 0?r(n):n,s.memoizedState=s.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},s.queue=e,e=e.dispatch=Xm.bind(null,rt,e),[s.memoizedState,e]},useRef:function(e){var n=Tn();return e={current:e},n.memoizedState=e},useState:Od,useDebugValue:ja,useDeferredValue:function(e){return Tn().memoizedState=e},useTransition:function(){var e=Od(!1),n=e[0];return e=Km.bind(null,e[1]),Tn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,r){var s=rt,a=Tn();if(tt){if(r===void 0)throw Error(i(407));r=r()}else{if(r=n(),wt===null)throw Error(i(349));(Pr&30)!==0||Rd(s,n,r)}a.memoizedState=r;var u={value:r,getSnapshot:n};return a.queue=u,zd(Ad.bind(null,s,u,e),[e]),s.flags|=2048,os(9,$d.bind(null,s,u,r,n),void 0,null),r},useId:function(){var e=Tn(),n=wt.identifierPrefix;if(tt){var r=Fn,s=zn;r=(s&~(1<<32-hn(s)-1)).toString(32)+r,n=":"+n+"R"+r,r=ns++,0<r&&(n+="H"+r.toString(32)),n+=":"}else r=Qm++,n=":"+n+"r"+r.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},e0={readContext:ln,useCallback:Hd,useContext:ln,useEffect:Ea,useImperativeHandle:Ud,useInsertionEffect:Fd,useLayoutEffect:Dd,useMemo:Vd,useReducer:ka,useRef:Ld,useState:function(){return ka(rs)},useDebugValue:ja,useDeferredValue:function(e){var n=an();return Wd(n,ht.memoizedState,e)},useTransition:function(){var e=ka(rs)[0],n=an().memoizedState;return[e,n]},useMutableSource:Td,useSyncExternalStore:Id,useId:Gd,unstable_isNewReconciler:!1},t0={readContext:ln,useCallback:Hd,useContext:ln,useEffect:Ea,useImperativeHandle:Ud,useInsertionEffect:Fd,useLayoutEffect:Dd,useMemo:Vd,useReducer:Ca,useRef:Ld,useState:function(){return Ca(rs)},useDebugValue:ja,useDeferredValue:function(e){var n=an();return ht===null?n.memoizedState=e:Wd(n,ht.memoizedState,e)},useTransition:function(){var e=Ca(rs)[0],n=an().memoizedState;return[e,n]},useMutableSource:Td,useSyncExternalStore:Id,useId:Gd,unstable_isNewReconciler:!1};function xn(e,n){if(e&&e.defaultProps){n=O({},n),e=e.defaultProps;for(var r in e)n[r]===void 0&&(n[r]=e[r]);return n}return n}function _a(e,n,r,s){n=e.memoizedState,r=r(s,n),r=r==null?n:O({},n,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var mi={isMounted:function(e){return(e=e._reactInternals)?En(e)===e:!1},enqueueSetState:function(e,n,r){e=e._reactInternals;var s=Lt(),a=mr(e),u=Bn(s,a);u.payload=n,r!=null&&(u.callback=r),n=dr(e,u,a),n!==null&&(bn(n,e,a,s),li(n,e,a))},enqueueReplaceState:function(e,n,r){e=e._reactInternals;var s=Lt(),a=mr(e),u=Bn(s,a);u.tag=1,u.payload=n,r!=null&&(u.callback=r),n=dr(e,u,a),n!==null&&(bn(n,e,a,s),li(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var r=Lt(),s=mr(e),a=Bn(r,s);a.tag=2,n!=null&&(a.callback=n),n=dr(e,a,s),n!==null&&(bn(n,e,s,r),li(n,e,s))}};function Kd(e,n,r,s,a,u,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,u,f):n.prototype&&n.prototype.isPureReactComponent?!Vo(r,s)||!Vo(a,u):!0}function Xd(e,n,r){var s=!1,a=ar,u=n.contextType;return typeof u=="object"&&u!==null?u=ln(u):(a=Bt(n)?Tr:Nt.current,s=n.contextTypes,u=(s=s!=null)?ro(e,a):ar),n=new n(r,u),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=mi,e.stateNode=n,n._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=u),n}function Jd(e,n,r,s){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(r,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(r,s),n.state!==e&&mi.enqueueReplaceState(n,n.state,null)}function Na(e,n,r,s){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},ha(e);var u=n.contextType;typeof u=="object"&&u!==null?a.context=ln(u):(u=Bt(n)?Tr:Nt.current,a.context=ro(e,u)),a.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(_a(e,n,u,r),a.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(n=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),n!==a.state&&mi.enqueueReplaceState(a,a.state,null),ai(e,r,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function fo(e,n){try{var r="",s=n;do r+=xe(s),s=s.return;while(s);var a=r}catch(u){a=`
Error generating stack: `+u.message+`
`+u.stack}return{value:e,source:n,stack:a,digest:null}}function Ta(e,n,r){return{value:e,source:null,stack:r??null,digest:n??null}}function Ia(e,n){try{console.error(n.value)}catch(r){setTimeout(function(){throw r})}}var n0=typeof WeakMap=="function"?WeakMap:Map;function Zd(e,n,r){r=Bn(-1,r),r.tag=3,r.payload={element:null};var s=n.value;return r.callback=function(){Si||(Si=!0,Wa=s),Ia(e,n)},r}function ef(e,n,r){r=Bn(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=n.value;r.payload=function(){return s(a)},r.callback=function(){Ia(e,n)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(r.callback=function(){Ia(e,n),typeof s!="function"&&(pr===null?pr=new Set([this]):pr.add(this));var f=n.stack;this.componentDidCatch(n.value,{componentStack:f!==null?f:""})}),r}function tf(e,n,r){var s=e.pingCache;if(s===null){s=e.pingCache=new n0;var a=new Set;s.set(n,a)}else a=s.get(n),a===void 0&&(a=new Set,s.set(n,a));a.has(r)||(a.add(r),e=g0.bind(null,e,n,r),n.then(e,e))}function nf(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function rf(e,n,r,s,a){return(e.mode&1)===0?(e===n?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(n=Bn(-1,1),n.tag=2,dr(r,n,1))),r.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var r0=Ie.ReactCurrentOwner,Ut=!1;function Ot(e,n,r,s){n.child=e===null?kd(n,null,r,s):lo(n,e.child,r,s)}function of(e,n,r,s,a){r=r.render;var u=n.ref;return co(n,a),s=wa(e,n,r,s,u,a),r=Sa(),e!==null&&!Ut?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Un(e,n,a)):(tt&&r&&oa(n),n.flags|=1,Ot(e,n,s,a),n.child)}function sf(e,n,r,s,a){if(e===null){var u=r.type;return typeof u=="function"&&!Ja(u)&&u.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(n.tag=15,n.type=u,lf(e,n,u,s,a)):(e=Ni(r.type,null,s,n,n.mode,a),e.ref=n.ref,e.return=n,n.child=e)}if(u=e.child,(e.lanes&a)===0){var f=u.memoizedProps;if(r=r.compare,r=r!==null?r:Vo,r(f,s)&&e.ref===n.ref)return Un(e,n,a)}return n.flags|=1,e=xr(u,s),e.ref=n.ref,e.return=n,n.child=e}function lf(e,n,r,s,a){if(e!==null){var u=e.memoizedProps;if(Vo(u,s)&&e.ref===n.ref)if(Ut=!1,n.pendingProps=s=u,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Ut=!0);else return n.lanes=e.lanes,Un(e,n,a)}return Ra(e,n,r,s,a)}function af(e,n,r){var s=n.pendingProps,a=s.children,u=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((n.mode&1)===0)n.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ke(ho,Zt),Zt|=r;else{if((r&1073741824)===0)return e=u!==null?u.baseLanes|r:r,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,Ke(ho,Zt),Zt|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=u!==null?u.baseLanes:r,Ke(ho,Zt),Zt|=s}else u!==null?(s=u.baseLanes|r,n.memoizedState=null):s=r,Ke(ho,Zt),Zt|=s;return Ot(e,n,a,r),n.child}function cf(e,n){var r=n.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(n.flags|=512,n.flags|=2097152)}function Ra(e,n,r,s,a){var u=Bt(r)?Tr:Nt.current;return u=ro(n,u),co(n,a),r=wa(e,n,r,s,u,a),s=Sa(),e!==null&&!Ut?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Un(e,n,a)):(tt&&s&&oa(n),n.flags|=1,Ot(e,n,r,a),n.child)}function uf(e,n,r,s,a){if(Bt(r)){var u=!0;Zs(n)}else u=!1;if(co(n,a),n.stateNode===null)xi(e,n),Xd(n,r,s),Na(n,r,s,a),s=!0;else if(e===null){var f=n.stateNode,h=n.memoizedProps;f.props=h;var x=f.context,j=r.contextType;typeof j=="object"&&j!==null?j=ln(j):(j=Bt(r)?Tr:Nt.current,j=ro(n,j));var L=r.getDerivedStateFromProps,D=typeof L=="function"||typeof f.getSnapshotBeforeUpdate=="function";D||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==s||x!==j)&&Jd(n,f,s,j),ur=!1;var M=n.memoizedState;f.state=M,ai(n,s,f,a),x=n.memoizedState,h!==s||M!==x||Dt.current||ur?(typeof L=="function"&&(_a(n,r,L,s),x=n.memoizedState),(h=ur||Kd(n,r,h,s,M,x,j))?(D||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=x),f.props=s,f.state=x,f.context=j,s=h):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{f=n.stateNode,Ed(e,n),h=n.memoizedProps,j=n.type===n.elementType?h:xn(n.type,h),f.props=j,D=n.pendingProps,M=f.context,x=r.contextType,typeof x=="object"&&x!==null?x=ln(x):(x=Bt(r)?Tr:Nt.current,x=ro(n,x));var oe=r.getDerivedStateFromProps;(L=typeof oe=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==D||M!==x)&&Jd(n,f,s,x),ur=!1,M=n.memoizedState,f.state=M,ai(n,s,f,a);var ce=n.memoizedState;h!==D||M!==ce||Dt.current||ur?(typeof oe=="function"&&(_a(n,r,oe,s),ce=n.memoizedState),(j=ur||Kd(n,r,j,s,M,ce,x)||!1)?(L||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,ce,x),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,ce,x)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&M===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&M===e.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=ce),f.props=s,f.state=ce,f.context=x,s=j):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&M===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&M===e.memoizedState||(n.flags|=1024),s=!1)}return $a(e,n,r,s,u,a)}function $a(e,n,r,s,a,u){cf(e,n);var f=(n.flags&128)!==0;if(!s&&!f)return a&&hd(n,r,!1),Un(e,n,u);s=n.stateNode,r0.current=n;var h=f&&typeof r.getDerivedStateFromError!="function"?null:s.render();return n.flags|=1,e!==null&&f?(n.child=lo(n,e.child,null,u),n.child=lo(n,null,h,u)):Ot(e,n,h,u),n.memoizedState=s.state,a&&hd(n,r,!0),n.child}function df(e){var n=e.stateNode;n.pendingContext?fd(e,n.pendingContext,n.pendingContext!==n.context):n.context&&fd(e,n.context,!1),ma(e,n.containerInfo)}function ff(e,n,r,s,a){return io(),aa(a),n.flags|=256,Ot(e,n,r,s),n.child}var Aa={dehydrated:null,treeContext:null,retryLane:0};function Pa(e){return{baseLanes:e,cachePool:null,transitions:null}}function pf(e,n,r){var s=n.pendingProps,a=nt.current,u=!1,f=(n.flags&128)!==0,h;if((h=f)||(h=e!==null&&e.memoizedState===null?!1:(a&2)!==0),h?(u=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Ke(nt,a&1),e===null)return la(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((n.mode&1)===0?n.lanes=1:e.data==="$!"?n.lanes=8:n.lanes=1073741824,null):(f=s.children,e=s.fallback,u?(s=n.mode,u=n.child,f={mode:"hidden",children:f},(s&1)===0&&u!==null?(u.childLanes=0,u.pendingProps=f):u=Ti(f,s,0,null),e=Fr(e,s,r,null),u.return=n,e.return=n,u.sibling=e,n.child=u,n.child.memoizedState=Pa(r),n.memoizedState=Aa,e):Ma(n,f));if(a=e.memoizedState,a!==null&&(h=a.dehydrated,h!==null))return o0(e,n,f,s,h,a,r);if(u){u=s.fallback,f=n.mode,a=e.child,h=a.sibling;var x={mode:"hidden",children:s.children};return(f&1)===0&&n.child!==a?(s=n.child,s.childLanes=0,s.pendingProps=x,n.deletions=null):(s=xr(a,x),s.subtreeFlags=a.subtreeFlags&14680064),h!==null?u=xr(h,u):(u=Fr(u,f,r,null),u.flags|=2),u.return=n,s.return=n,s.sibling=u,n.child=s,s=u,u=n.child,f=e.child.memoizedState,f=f===null?Pa(r):{baseLanes:f.baseLanes|r,cachePool:null,transitions:f.transitions},u.memoizedState=f,u.childLanes=e.childLanes&~r,n.memoizedState=Aa,s}return u=e.child,e=u.sibling,s=xr(u,{mode:"visible",children:s.children}),(n.mode&1)===0&&(s.lanes=r),s.return=n,s.sibling=null,e!==null&&(r=n.deletions,r===null?(n.deletions=[e],n.flags|=16):r.push(e)),n.child=s,n.memoizedState=null,s}function Ma(e,n){return n=Ti({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function gi(e,n,r,s){return s!==null&&aa(s),lo(n,e.child,null,r),e=Ma(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function o0(e,n,r,s,a,u,f){if(r)return n.flags&256?(n.flags&=-257,s=Ta(Error(i(422))),gi(e,n,f,s)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(u=s.fallback,a=n.mode,s=Ti({mode:"visible",children:s.children},a,0,null),u=Fr(u,a,f,null),u.flags|=2,s.return=n,u.return=n,s.sibling=u,n.child=s,(n.mode&1)!==0&&lo(n,e.child,null,f),n.child.memoizedState=Pa(f),n.memoizedState=Aa,u);if((n.mode&1)===0)return gi(e,n,f,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var h=s.dgst;return s=h,u=Error(i(419)),s=Ta(u,s,void 0),gi(e,n,f,s)}if(h=(f&e.childLanes)!==0,Ut||h){if(s=wt,s!==null){switch(f&-f){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(s.suspendedLanes|f))!==0?0:a,a!==0&&a!==u.retryLane&&(u.retryLane=a,Dn(e,a),bn(s,e,a,-1))}return Xa(),s=Ta(Error(i(421))),gi(e,n,f,s)}return a.data==="$?"?(n.flags|=128,n.child=e.child,n=x0.bind(null,e),a._reactRetry=n,null):(e=u.treeContext,Jt=ir(a.nextSibling),Xt=n,tt=!0,gn=null,e!==null&&(on[sn++]=zn,on[sn++]=Fn,on[sn++]=Ir,zn=e.id,Fn=e.overflow,Ir=n),n=Ma(n,s.children),n.flags|=4096,n)}function hf(e,n,r){e.lanes|=n;var s=e.alternate;s!==null&&(s.lanes|=n),fa(e.return,n,r)}function Oa(e,n,r,s,a){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:a}:(u.isBackwards=n,u.rendering=null,u.renderingStartTime=0,u.last=s,u.tail=r,u.tailMode=a)}function mf(e,n,r){var s=n.pendingProps,a=s.revealOrder,u=s.tail;if(Ot(e,n,s.children,r),s=nt.current,(s&2)!==0)s=s&1|2,n.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hf(e,r,n);else if(e.tag===19)hf(e,r,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Ke(nt,s),(n.mode&1)===0)n.memoizedState=null;else switch(a){case"forwards":for(r=n.child,a=null;r!==null;)e=r.alternate,e!==null&&ci(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=n.child,n.child=null):(a=r.sibling,r.sibling=null),Oa(n,!1,a,r,u);break;case"backwards":for(r=null,a=n.child,n.child=null;a!==null;){if(e=a.alternate,e!==null&&ci(e)===null){n.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}Oa(n,!0,r,null,u);break;case"together":Oa(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function xi(e,n){(n.mode&1)===0&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Un(e,n,r){if(e!==null&&(n.dependencies=e.dependencies),Mr|=n.lanes,(r&n.childLanes)===0)return null;if(e!==null&&n.child!==e.child)throw Error(i(153));if(n.child!==null){for(e=n.child,r=xr(e,e.pendingProps),n.child=r,r.return=n;e.sibling!==null;)e=e.sibling,r=r.sibling=xr(e,e.pendingProps),r.return=n;r.sibling=null}return n.child}function s0(e,n,r){switch(n.tag){case 3:df(n),io();break;case 5:Nd(n);break;case 1:Bt(n.type)&&Zs(n);break;case 4:ma(n,n.stateNode.containerInfo);break;case 10:var s=n.type._context,a=n.memoizedProps.value;Ke(si,s._currentValue),s._currentValue=a;break;case 13:if(s=n.memoizedState,s!==null)return s.dehydrated!==null?(Ke(nt,nt.current&1),n.flags|=128,null):(r&n.child.childLanes)!==0?pf(e,n,r):(Ke(nt,nt.current&1),e=Un(e,n,r),e!==null?e.sibling:null);Ke(nt,nt.current&1);break;case 19:if(s=(r&n.childLanes)!==0,(e.flags&128)!==0){if(s)return mf(e,n,r);n.flags|=128}if(a=n.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ke(nt,nt.current),s)break;return null;case 22:case 23:return n.lanes=0,af(e,n,r)}return Un(e,n,r)}var gf,La,xf,yf;gf=function(e,n){for(var r=n.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},La=function(){},xf=function(e,n,r,s){var a=e.memoizedProps;if(a!==s){e=n.stateNode,Ar(Nn.current);var u=null;switch(r){case"input":a=vt(e,a),s=vt(e,s),u=[];break;case"select":a=O({},a,{value:void 0}),s=O({},s,{value:void 0}),u=[];break;case"textarea":a=We(e,a),s=We(e,s),u=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=Ks)}Mn(r,s);var f;r=null;for(j in a)if(!s.hasOwnProperty(j)&&a.hasOwnProperty(j)&&a[j]!=null)if(j==="style"){var h=a[j];for(f in h)h.hasOwnProperty(f)&&(r||(r={}),r[f]="")}else j!=="dangerouslySetInnerHTML"&&j!=="children"&&j!=="suppressContentEditableWarning"&&j!=="suppressHydrationWarning"&&j!=="autoFocus"&&(d.hasOwnProperty(j)?u||(u=[]):(u=u||[]).push(j,null));for(j in s){var x=s[j];if(h=a!=null?a[j]:void 0,s.hasOwnProperty(j)&&x!==h&&(x!=null||h!=null))if(j==="style")if(h){for(f in h)!h.hasOwnProperty(f)||x&&x.hasOwnProperty(f)||(r||(r={}),r[f]="");for(f in x)x.hasOwnProperty(f)&&h[f]!==x[f]&&(r||(r={}),r[f]=x[f])}else r||(u||(u=[]),u.push(j,r)),r=x;else j==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,h=h?h.__html:void 0,x!=null&&h!==x&&(u=u||[]).push(j,x)):j==="children"?typeof x!="string"&&typeof x!="number"||(u=u||[]).push(j,""+x):j!=="suppressContentEditableWarning"&&j!=="suppressHydrationWarning"&&(d.hasOwnProperty(j)?(x!=null&&j==="onScroll"&&Xe("scroll",e),u||h===x||(u=[])):(u=u||[]).push(j,x))}r&&(u=u||[]).push("style",r);var j=u;(n.updateQueue=j)&&(n.flags|=4)}},yf=function(e,n,r,s){r!==s&&(n.flags|=4)};function ss(e,n){if(!tt)switch(e.tailMode){case"hidden":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function It(e){var n=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(n)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=r,n}function i0(e,n,r){var s=n.pendingProps;switch(sa(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return It(n),null;case 1:return Bt(n.type)&&Js(),It(n),null;case 3:return s=n.stateNode,uo(),Je(Dt),Je(Nt),ya(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ri(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,gn!==null&&(Ya(gn),gn=null))),La(e,n),It(n),null;case 5:ga(n);var a=Ar(es.current);if(r=n.type,e!==null&&n.stateNode!=null)xf(e,n,r,s,a),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!s){if(n.stateNode===null)throw Error(i(166));return It(n),null}if(e=Ar(Nn.current),ri(n)){s=n.stateNode,r=n.type;var u=n.memoizedProps;switch(s[_n]=n,s[Qo]=u,e=(n.mode&1)!==0,r){case"dialog":Xe("cancel",s),Xe("close",s);break;case"iframe":case"object":case"embed":Xe("load",s);break;case"video":case"audio":for(a=0;a<Go.length;a++)Xe(Go[a],s);break;case"source":Xe("error",s);break;case"img":case"image":case"link":Xe("error",s),Xe("load",s);break;case"details":Xe("toggle",s);break;case"input":tn(s,u),Xe("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!u.multiple},Xe("invalid",s);break;case"textarea":je(s,u),Xe("invalid",s)}Mn(r,u),a=null;for(var f in u)if(u.hasOwnProperty(f)){var h=u[f];f==="children"?typeof h=="string"?s.textContent!==h&&(u.suppressHydrationWarning!==!0&&Qs(s.textContent,h,e),a=["children",h]):typeof h=="number"&&s.textContent!==""+h&&(u.suppressHydrationWarning!==!0&&Qs(s.textContent,h,e),a=["children",""+h]):d.hasOwnProperty(f)&&h!=null&&f==="onScroll"&&Xe("scroll",s)}switch(r){case"input":xt(s),B(s,u,!0);break;case"textarea":xt(s),Gt(s);break;case"select":case"option":break;default:typeof u.onClick=="function"&&(s.onclick=Ks)}s=a,n.updateQueue=s,s!==null&&(n.flags|=4)}else{f=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=qt(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=f.createElement(r,{is:s.is}):(e=f.createElement(r),r==="select"&&(f=e,s.multiple?f.multiple=!0:s.size&&(f.size=s.size))):e=f.createElementNS(e,r),e[_n]=n,e[Qo]=s,gf(e,n,!1,!1),n.stateNode=e;e:{switch(f=rn(r,s),r){case"dialog":Xe("cancel",e),Xe("close",e),a=s;break;case"iframe":case"object":case"embed":Xe("load",e),a=s;break;case"video":case"audio":for(a=0;a<Go.length;a++)Xe(Go[a],e);a=s;break;case"source":Xe("error",e),a=s;break;case"img":case"image":case"link":Xe("error",e),Xe("load",e),a=s;break;case"details":Xe("toggle",e),a=s;break;case"input":tn(e,s),a=vt(e,s),Xe("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=O({},s,{value:void 0}),Xe("invalid",e);break;case"textarea":je(e,s),a=We(e,s),Xe("invalid",e);break;default:a=s}Mn(r,a),h=a;for(u in h)if(h.hasOwnProperty(u)){var x=h[u];u==="style"?nn(e,x):u==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,x!=null&&Qn(e,x)):u==="children"?typeof x=="string"?(r!=="textarea"||x!=="")&&Yt(e,x):typeof x=="number"&&Yt(e,""+x):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(d.hasOwnProperty(u)?x!=null&&u==="onScroll"&&Xe("scroll",e):x!=null&&le(e,u,x,f))}switch(r){case"input":xt(e),B(e,s,!1);break;case"textarea":xt(e),Gt(e);break;case"option":s.value!=null&&e.setAttribute("value",""+G(s.value));break;case"select":e.multiple=!!s.multiple,u=s.value,u!=null?Me(e,!!s.multiple,u,!1):s.defaultValue!=null&&Me(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Ks)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return It(n),null;case 6:if(e&&n.stateNode!=null)yf(e,n,e.memoizedProps,s);else{if(typeof s!="string"&&n.stateNode===null)throw Error(i(166));if(r=Ar(es.current),Ar(Nn.current),ri(n)){if(s=n.stateNode,r=n.memoizedProps,s[_n]=n,(u=s.nodeValue!==r)&&(e=Xt,e!==null))switch(e.tag){case 3:Qs(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Qs(s.nodeValue,r,(e.mode&1)!==0)}u&&(n.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[_n]=n,n.stateNode=s}return It(n),null;case 13:if(Je(nt),s=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(tt&&Jt!==null&&(n.mode&1)!==0&&(n.flags&128)===0)bd(),io(),n.flags|=98560,u=!1;else if(u=ri(n),s!==null&&s.dehydrated!==null){if(e===null){if(!u)throw Error(i(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(i(317));u[_n]=n}else io(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;It(n),u=!1}else gn!==null&&(Ya(gn),gn=null),u=!0;if(!u)return n.flags&65536?n:null}return(n.flags&128)!==0?(n.lanes=r,n):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(n.child.flags|=8192,(n.mode&1)!==0&&(e===null||(nt.current&1)!==0?mt===0&&(mt=3):Xa())),n.updateQueue!==null&&(n.flags|=4),It(n),null);case 4:return uo(),La(e,n),e===null&&qo(n.stateNode.containerInfo),It(n),null;case 10:return da(n.type._context),It(n),null;case 17:return Bt(n.type)&&Js(),It(n),null;case 19:if(Je(nt),u=n.memoizedState,u===null)return It(n),null;if(s=(n.flags&128)!==0,f=u.rendering,f===null)if(s)ss(u,!1);else{if(mt!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=ci(e),f!==null){for(n.flags|=128,ss(u,!1),s=f.updateQueue,s!==null&&(n.updateQueue=s,n.flags|=4),n.subtreeFlags=0,s=r,r=n.child;r!==null;)u=r,e=s,u.flags&=14680066,f=u.alternate,f===null?(u.childLanes=0,u.lanes=e,u.child=null,u.subtreeFlags=0,u.memoizedProps=null,u.memoizedState=null,u.updateQueue=null,u.dependencies=null,u.stateNode=null):(u.childLanes=f.childLanes,u.lanes=f.lanes,u.child=f.child,u.subtreeFlags=0,u.deletions=null,u.memoizedProps=f.memoizedProps,u.memoizedState=f.memoizedState,u.updateQueue=f.updateQueue,u.type=f.type,e=f.dependencies,u.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Ke(nt,nt.current&1|2),n.child}e=e.sibling}u.tail!==null&&at()>mo&&(n.flags|=128,s=!0,ss(u,!1),n.lanes=4194304)}else{if(!s)if(e=ci(f),e!==null){if(n.flags|=128,s=!0,r=e.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),ss(u,!0),u.tail===null&&u.tailMode==="hidden"&&!f.alternate&&!tt)return It(n),null}else 2*at()-u.renderingStartTime>mo&&r!==1073741824&&(n.flags|=128,s=!0,ss(u,!1),n.lanes=4194304);u.isBackwards?(f.sibling=n.child,n.child=f):(r=u.last,r!==null?r.sibling=f:n.child=f,u.last=f)}return u.tail!==null?(n=u.tail,u.rendering=n,u.tail=n.sibling,u.renderingStartTime=at(),n.sibling=null,r=nt.current,Ke(nt,s?r&1|2:r&1),n):(It(n),null);case 22:case 23:return Ka(),s=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(n.flags|=8192),s&&(n.mode&1)!==0?(Zt&1073741824)!==0&&(It(n),n.subtreeFlags&6&&(n.flags|=8192)):It(n),null;case 24:return null;case 25:return null}throw Error(i(156,n.tag))}function l0(e,n){switch(sa(n),n.tag){case 1:return Bt(n.type)&&Js(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return uo(),Je(Dt),Je(Nt),ya(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 5:return ga(n),null;case 13:if(Je(nt),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(i(340));io()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Je(nt),null;case 4:return uo(),null;case 10:return da(n.type._context),null;case 22:case 23:return Ka(),null;case 24:return null;default:return null}}var yi=!1,Rt=!1,a0=typeof WeakSet=="function"?WeakSet:Set,se=null;function po(e,n){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){st(e,n,s)}else r.current=null}function za(e,n,r){try{r()}catch(s){st(e,n,s)}}var vf=!1;function c0(e,n){if(Kl=zs,e=Ku(),Ul(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var a=s.anchorOffset,u=s.focusNode;s=s.focusOffset;try{r.nodeType,u.nodeType}catch{r=null;break e}var f=0,h=-1,x=-1,j=0,L=0,D=e,M=null;t:for(;;){for(var oe;D!==r||a!==0&&D.nodeType!==3||(h=f+a),D!==u||s!==0&&D.nodeType!==3||(x=f+s),D.nodeType===3&&(f+=D.nodeValue.length),(oe=D.firstChild)!==null;)M=D,D=oe;for(;;){if(D===e)break t;if(M===r&&++j===a&&(h=f),M===u&&++L===s&&(x=f),(oe=D.nextSibling)!==null)break;D=M,M=D.parentNode}D=oe}r=h===-1||x===-1?null:{start:h,end:x}}else r=null}r=r||{start:0,end:0}}else r=null;for(Xl={focusedElem:e,selectionRange:r},zs=!1,se=n;se!==null;)if(n=se,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,se=e;else for(;se!==null;){n=se;try{var ce=n.alternate;if((n.flags&1024)!==0)switch(n.tag){case 0:case 11:case 15:break;case 1:if(ce!==null){var ue=ce.memoizedProps,ct=ce.memoizedState,k=n.stateNode,v=k.getSnapshotBeforeUpdate(n.elementType===n.type?ue:xn(n.type,ue),ct);k.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var C=n.stateNode.containerInfo;C.nodeType===1?C.textContent="":C.nodeType===9&&C.documentElement&&C.removeChild(C.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(H){st(n,n.return,H)}if(e=n.sibling,e!==null){e.return=n.return,se=e;break}se=n.return}return ce=vf,vf=!1,ce}function is(e,n,r){var s=n.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var u=a.destroy;a.destroy=void 0,u!==void 0&&za(n,r,u)}a=a.next}while(a!==s)}}function vi(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var r=n=n.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==n)}}function Fa(e){var n=e.ref;if(n!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof n=="function"?n(e):n.current=e}}function bf(e){var n=e.alternate;n!==null&&(e.alternate=null,bf(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[_n],delete n[Qo],delete n[ta],delete n[Wm],delete n[Gm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function wf(e){return e.tag===5||e.tag===3||e.tag===4}function Sf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Da(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?r.nodeType===8?r.parentNode.insertBefore(e,n):r.insertBefore(e,n):(r.nodeType===8?(n=r.parentNode,n.insertBefore(e,r)):(n=r,n.appendChild(e)),r=r._reactRootContainer,r!=null||n.onclick!==null||(n.onclick=Ks));else if(s!==4&&(e=e.child,e!==null))for(Da(e,n,r),e=e.sibling;e!==null;)Da(e,n,r),e=e.sibling}function Ba(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?r.insertBefore(e,n):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Ba(e,n,r),e=e.sibling;e!==null;)Ba(e,n,r),e=e.sibling}var jt=null,yn=!1;function fr(e,n,r){for(r=r.child;r!==null;)kf(e,n,r),r=r.sibling}function kf(e,n,r){if(jn&&typeof jn.onCommitFiberUnmount=="function")try{jn.onCommitFiberUnmount($s,r)}catch{}switch(r.tag){case 5:Rt||po(r,n);case 6:var s=jt,a=yn;jt=null,fr(e,n,r),jt=s,yn=a,jt!==null&&(yn?(e=jt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):jt.removeChild(r.stateNode));break;case 18:jt!==null&&(yn?(e=jt,r=r.stateNode,e.nodeType===8?ea(e.parentNode,r):e.nodeType===1&&ea(e,r),zo(e)):ea(jt,r.stateNode));break;case 4:s=jt,a=yn,jt=r.stateNode.containerInfo,yn=!0,fr(e,n,r),jt=s,yn=a;break;case 0:case 11:case 14:case 15:if(!Rt&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var u=a,f=u.destroy;u=u.tag,f!==void 0&&((u&2)!==0||(u&4)!==0)&&za(r,n,f),a=a.next}while(a!==s)}fr(e,n,r);break;case 1:if(!Rt&&(po(r,n),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(h){st(r,n,h)}fr(e,n,r);break;case 21:fr(e,n,r);break;case 22:r.mode&1?(Rt=(s=Rt)||r.memoizedState!==null,fr(e,n,r),Rt=s):fr(e,n,r);break;default:fr(e,n,r)}}function Cf(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new a0),n.forEach(function(s){var a=y0.bind(null,e,s);r.has(s)||(r.add(s),s.then(a,a))})}}function vn(e,n){var r=n.deletions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];try{var u=e,f=n,h=f;e:for(;h!==null;){switch(h.tag){case 5:jt=h.stateNode,yn=!1;break e;case 3:jt=h.stateNode.containerInfo,yn=!0;break e;case 4:jt=h.stateNode.containerInfo,yn=!0;break e}h=h.return}if(jt===null)throw Error(i(160));kf(u,f,a),jt=null,yn=!1;var x=a.alternate;x!==null&&(x.return=null),a.return=null}catch(j){st(a,n,j)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Ef(n,e),n=n.sibling}function Ef(e,n){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(vn(n,e),In(e),s&4){try{is(3,e,e.return),vi(3,e)}catch(ue){st(e,e.return,ue)}try{is(5,e,e.return)}catch(ue){st(e,e.return,ue)}}break;case 1:vn(n,e),In(e),s&512&&r!==null&&po(r,r.return);break;case 5:if(vn(n,e),In(e),s&512&&r!==null&&po(r,r.return),e.flags&32){var a=e.stateNode;try{Yt(a,"")}catch(ue){st(e,e.return,ue)}}if(s&4&&(a=e.stateNode,a!=null)){var u=e.memoizedProps,f=r!==null?r.memoizedProps:u,h=e.type,x=e.updateQueue;if(e.updateQueue=null,x!==null)try{h==="input"&&u.type==="radio"&&u.name!=null&&Ve(a,u),rn(h,f);var j=rn(h,u);for(f=0;f<x.length;f+=2){var L=x[f],D=x[f+1];L==="style"?nn(a,D):L==="dangerouslySetInnerHTML"?Qn(a,D):L==="children"?Yt(a,D):le(a,L,D,j)}switch(h){case"input":kt(a,u);break;case"textarea":Ct(a,u);break;case"select":var M=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!u.multiple;var oe=u.value;oe!=null?Me(a,!!u.multiple,oe,!1):M!==!!u.multiple&&(u.defaultValue!=null?Me(a,!!u.multiple,u.defaultValue,!0):Me(a,!!u.multiple,u.multiple?[]:"",!1))}a[Qo]=u}catch(ue){st(e,e.return,ue)}}break;case 6:if(vn(n,e),In(e),s&4){if(e.stateNode===null)throw Error(i(162));a=e.stateNode,u=e.memoizedProps;try{a.nodeValue=u}catch(ue){st(e,e.return,ue)}}break;case 3:if(vn(n,e),In(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{zo(n.containerInfo)}catch(ue){st(e,e.return,ue)}break;case 4:vn(n,e),In(e);break;case 13:vn(n,e),In(e),a=e.child,a.flags&8192&&(u=a.memoizedState!==null,a.stateNode.isHidden=u,!u||a.alternate!==null&&a.alternate.memoizedState!==null||(Va=at())),s&4&&Cf(e);break;case 22:if(L=r!==null&&r.memoizedState!==null,e.mode&1?(Rt=(j=Rt)||L,vn(n,e),Rt=j):vn(n,e),In(e),s&8192){if(j=e.memoizedState!==null,(e.stateNode.isHidden=j)&&!L&&(e.mode&1)!==0)for(se=e,L=e.child;L!==null;){for(D=se=L;se!==null;){switch(M=se,oe=M.child,M.tag){case 0:case 11:case 14:case 15:is(4,M,M.return);break;case 1:po(M,M.return);var ce=M.stateNode;if(typeof ce.componentWillUnmount=="function"){s=M,r=M.return;try{n=s,ce.props=n.memoizedProps,ce.state=n.memoizedState,ce.componentWillUnmount()}catch(ue){st(s,r,ue)}}break;case 5:po(M,M.return);break;case 22:if(M.memoizedState!==null){Nf(D);continue}}oe!==null?(oe.return=M,se=oe):Nf(D)}L=L.sibling}e:for(L=null,D=e;;){if(D.tag===5){if(L===null){L=D;try{a=D.stateNode,j?(u=a.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none"):(h=D.stateNode,x=D.memoizedProps.style,f=x!=null&&x.hasOwnProperty("display")?x.display:null,h.style.display=ot("display",f))}catch(ue){st(e,e.return,ue)}}}else if(D.tag===6){if(L===null)try{D.stateNode.nodeValue=j?"":D.memoizedProps}catch(ue){st(e,e.return,ue)}}else if((D.tag!==22&&D.tag!==23||D.memoizedState===null||D===e)&&D.child!==null){D.child.return=D,D=D.child;continue}if(D===e)break e;for(;D.sibling===null;){if(D.return===null||D.return===e)break e;L===D&&(L=null),D=D.return}L===D&&(L=null),D.sibling.return=D.return,D=D.sibling}}break;case 19:vn(n,e),In(e),s&4&&Cf(e);break;case 21:break;default:vn(n,e),In(e)}}function In(e){var n=e.flags;if(n&2){try{e:{for(var r=e.return;r!==null;){if(wf(r)){var s=r;break e}r=r.return}throw Error(i(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Yt(a,""),s.flags&=-33);var u=Sf(e);Ba(e,u,a);break;case 3:case 4:var f=s.stateNode.containerInfo,h=Sf(e);Da(e,h,f);break;default:throw Error(i(161))}}catch(x){st(e,e.return,x)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function u0(e,n,r){se=e,jf(e)}function jf(e,n,r){for(var s=(e.mode&1)!==0;se!==null;){var a=se,u=a.child;if(a.tag===22&&s){var f=a.memoizedState!==null||yi;if(!f){var h=a.alternate,x=h!==null&&h.memoizedState!==null||Rt;h=yi;var j=Rt;if(yi=f,(Rt=x)&&!j)for(se=a;se!==null;)f=se,x=f.child,f.tag===22&&f.memoizedState!==null?Tf(a):x!==null?(x.return=f,se=x):Tf(a);for(;u!==null;)se=u,jf(u),u=u.sibling;se=a,yi=h,Rt=j}_f(e)}else(a.subtreeFlags&8772)!==0&&u!==null?(u.return=a,se=u):_f(e)}}function _f(e){for(;se!==null;){var n=se;if((n.flags&8772)!==0){var r=n.alternate;try{if((n.flags&8772)!==0)switch(n.tag){case 0:case 11:case 15:Rt||vi(5,n);break;case 1:var s=n.stateNode;if(n.flags&4&&!Rt)if(r===null)s.componentDidMount();else{var a=n.elementType===n.type?r.memoizedProps:xn(n.type,r.memoizedProps);s.componentDidUpdate(a,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var u=n.updateQueue;u!==null&&_d(n,u,s);break;case 3:var f=n.updateQueue;if(f!==null){if(r=null,n.child!==null)switch(n.child.tag){case 5:r=n.child.stateNode;break;case 1:r=n.child.stateNode}_d(n,f,r)}break;case 5:var h=n.stateNode;if(r===null&&n.flags&4){r=h;var x=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":x.autoFocus&&r.focus();break;case"img":x.src&&(r.src=x.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var j=n.alternate;if(j!==null){var L=j.memoizedState;if(L!==null){var D=L.dehydrated;D!==null&&zo(D)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}Rt||n.flags&512&&Fa(n)}catch(M){st(n,n.return,M)}}if(n===e){se=null;break}if(r=n.sibling,r!==null){r.return=n.return,se=r;break}se=n.return}}function Nf(e){for(;se!==null;){var n=se;if(n===e){se=null;break}var r=n.sibling;if(r!==null){r.return=n.return,se=r;break}se=n.return}}function Tf(e){for(;se!==null;){var n=se;try{switch(n.tag){case 0:case 11:case 15:var r=n.return;try{vi(4,n)}catch(x){st(n,r,x)}break;case 1:var s=n.stateNode;if(typeof s.componentDidMount=="function"){var a=n.return;try{s.componentDidMount()}catch(x){st(n,a,x)}}var u=n.return;try{Fa(n)}catch(x){st(n,u,x)}break;case 5:var f=n.return;try{Fa(n)}catch(x){st(n,f,x)}}}catch(x){st(n,n.return,x)}if(n===e){se=null;break}var h=n.sibling;if(h!==null){h.return=n.return,se=h;break}se=n.return}}var d0=Math.ceil,bi=Ie.ReactCurrentDispatcher,Ua=Ie.ReactCurrentOwner,cn=Ie.ReactCurrentBatchConfig,ze=0,wt=null,ut=null,_t=0,Zt=0,ho=lr(0),mt=0,ls=null,Mr=0,wi=0,Ha=0,as=null,Ht=null,Va=0,mo=1/0,Hn=null,Si=!1,Wa=null,pr=null,ki=!1,hr=null,Ci=0,cs=0,Ga=null,Ei=-1,ji=0;function Lt(){return(ze&6)!==0?at():Ei!==-1?Ei:Ei=at()}function mr(e){return(e.mode&1)===0?1:(ze&2)!==0&&_t!==0?_t&-_t:Ym.transition!==null?(ji===0&&(ji=wu()),ji):(e=qe,e!==0||(e=window.event,e=e===void 0?16:Iu(e.type)),e)}function bn(e,n,r,s){if(50<cs)throw cs=0,Ga=null,Error(i(185));Ao(e,r,s),((ze&2)===0||e!==wt)&&(e===wt&&((ze&2)===0&&(wi|=r),mt===4&&gr(e,_t)),Vt(e,s),r===1&&ze===0&&(n.mode&1)===0&&(mo=at()+500,ei&&cr()))}function Vt(e,n){var r=e.callbackNode;Yh(e,n);var s=Ms(e,e===wt?_t:0);if(s===0)r!==null&&yu(r),e.callbackNode=null,e.callbackPriority=0;else if(n=s&-s,e.callbackPriority!==n){if(r!=null&&yu(r),n===1)e.tag===0?qm(Rf.bind(null,e)):md(Rf.bind(null,e)),Hm(function(){(ze&6)===0&&cr()}),r=null;else{switch(Su(s)){case 1:r=El;break;case 4:r=vu;break;case 16:r=Rs;break;case 536870912:r=bu;break;default:r=Rs}r=Ff(r,If.bind(null,e))}e.callbackPriority=n,e.callbackNode=r}}function If(e,n){if(Ei=-1,ji=0,(ze&6)!==0)throw Error(i(327));var r=e.callbackNode;if(go()&&e.callbackNode!==r)return null;var s=Ms(e,e===wt?_t:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||n)n=_i(e,s);else{n=s;var a=ze;ze|=2;var u=Af();(wt!==e||_t!==n)&&(Hn=null,mo=at()+500,Lr(e,n));do try{h0();break}catch(h){$f(e,h)}while(!0);ua(),bi.current=u,ze=a,ut!==null?n=0:(wt=null,_t=0,n=mt)}if(n!==0){if(n===2&&(a=jl(e),a!==0&&(s=a,n=qa(e,a))),n===1)throw r=ls,Lr(e,0),gr(e,s),Vt(e,at()),r;if(n===6)gr(e,s);else{if(a=e.current.alternate,(s&30)===0&&!f0(a)&&(n=_i(e,s),n===2&&(u=jl(e),u!==0&&(s=u,n=qa(e,u))),n===1))throw r=ls,Lr(e,0),gr(e,s),Vt(e,at()),r;switch(e.finishedWork=a,e.finishedLanes=s,n){case 0:case 1:throw Error(i(345));case 2:zr(e,Ht,Hn);break;case 3:if(gr(e,s),(s&130023424)===s&&(n=Va+500-at(),10<n)){if(Ms(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){Lt(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Zl(zr.bind(null,e,Ht,Hn),n);break}zr(e,Ht,Hn);break;case 4:if(gr(e,s),(s&4194240)===s)break;for(n=e.eventTimes,a=-1;0<s;){var f=31-hn(s);u=1<<f,f=n[f],f>a&&(a=f),s&=~u}if(s=a,s=at()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*d0(s/1960))-s,10<s){e.timeoutHandle=Zl(zr.bind(null,e,Ht,Hn),s);break}zr(e,Ht,Hn);break;case 5:zr(e,Ht,Hn);break;default:throw Error(i(329))}}}return Vt(e,at()),e.callbackNode===r?If.bind(null,e):null}function qa(e,n){var r=as;return e.current.memoizedState.isDehydrated&&(Lr(e,n).flags|=256),e=_i(e,n),e!==2&&(n=Ht,Ht=r,n!==null&&Ya(n)),e}function Ya(e){Ht===null?Ht=e:Ht.push.apply(Ht,e)}function f0(e){for(var n=e;;){if(n.flags&16384){var r=n.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var a=r[s],u=a.getSnapshot;a=a.value;try{if(!mn(u(),a))return!1}catch{return!1}}}if(r=n.child,n.subtreeFlags&16384&&r!==null)r.return=n,n=r;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function gr(e,n){for(n&=~Ha,n&=~wi,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var r=31-hn(n),s=1<<r;e[r]=-1,n&=~s}}function Rf(e){if((ze&6)!==0)throw Error(i(327));go();var n=Ms(e,0);if((n&1)===0)return Vt(e,at()),null;var r=_i(e,n);if(e.tag!==0&&r===2){var s=jl(e);s!==0&&(n=s,r=qa(e,s))}if(r===1)throw r=ls,Lr(e,0),gr(e,n),Vt(e,at()),r;if(r===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,zr(e,Ht,Hn),Vt(e,at()),null}function Qa(e,n){var r=ze;ze|=1;try{return e(n)}finally{ze=r,ze===0&&(mo=at()+500,ei&&cr())}}function Or(e){hr!==null&&hr.tag===0&&(ze&6)===0&&go();var n=ze;ze|=1;var r=cn.transition,s=qe;try{if(cn.transition=null,qe=1,e)return e()}finally{qe=s,cn.transition=r,ze=n,(ze&6)===0&&cr()}}function Ka(){Zt=ho.current,Je(ho)}function Lr(e,n){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Um(r)),ut!==null)for(r=ut.return;r!==null;){var s=r;switch(sa(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Js();break;case 3:uo(),Je(Dt),Je(Nt),ya();break;case 5:ga(s);break;case 4:uo();break;case 13:Je(nt);break;case 19:Je(nt);break;case 10:da(s.type._context);break;case 22:case 23:Ka()}r=r.return}if(wt=e,ut=e=xr(e.current,null),_t=Zt=n,mt=0,ls=null,Ha=wi=Mr=0,Ht=as=null,$r!==null){for(n=0;n<$r.length;n++)if(r=$r[n],s=r.interleaved,s!==null){r.interleaved=null;var a=s.next,u=r.pending;if(u!==null){var f=u.next;u.next=a,s.next=f}r.pending=s}$r=null}return e}function $f(e,n){do{var r=ut;try{if(ua(),ui.current=hi,di){for(var s=rt.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}di=!1}if(Pr=0,bt=ht=rt=null,ts=!1,ns=0,Ua.current=null,r===null||r.return===null){mt=1,ls=n,ut=null;break}e:{var u=e,f=r.return,h=r,x=n;if(n=_t,h.flags|=32768,x!==null&&typeof x=="object"&&typeof x.then=="function"){var j=x,L=h,D=L.tag;if((L.mode&1)===0&&(D===0||D===11||D===15)){var M=L.alternate;M?(L.updateQueue=M.updateQueue,L.memoizedState=M.memoizedState,L.lanes=M.lanes):(L.updateQueue=null,L.memoizedState=null)}var oe=nf(f);if(oe!==null){oe.flags&=-257,rf(oe,f,h,u,n),oe.mode&1&&tf(u,j,n),n=oe,x=j;var ce=n.updateQueue;if(ce===null){var ue=new Set;ue.add(x),n.updateQueue=ue}else ce.add(x);break e}else{if((n&1)===0){tf(u,j,n),Xa();break e}x=Error(i(426))}}else if(tt&&h.mode&1){var ct=nf(f);if(ct!==null){(ct.flags&65536)===0&&(ct.flags|=256),rf(ct,f,h,u,n),aa(fo(x,h));break e}}u=x=fo(x,h),mt!==4&&(mt=2),as===null?as=[u]:as.push(u),u=f;do{switch(u.tag){case 3:u.flags|=65536,n&=-n,u.lanes|=n;var k=Zd(u,x,n);jd(u,k);break e;case 1:h=x;var v=u.type,C=u.stateNode;if((u.flags&128)===0&&(typeof v.getDerivedStateFromError=="function"||C!==null&&typeof C.componentDidCatch=="function"&&(pr===null||!pr.has(C)))){u.flags|=65536,n&=-n,u.lanes|=n;var H=ef(u,h,n);jd(u,H);break e}}u=u.return}while(u!==null)}Mf(r)}catch(fe){n=fe,ut===r&&r!==null&&(ut=r=r.return);continue}break}while(!0)}function Af(){var e=bi.current;return bi.current=hi,e===null?hi:e}function Xa(){(mt===0||mt===3||mt===2)&&(mt=4),wt===null||(Mr&268435455)===0&&(wi&268435455)===0||gr(wt,_t)}function _i(e,n){var r=ze;ze|=2;var s=Af();(wt!==e||_t!==n)&&(Hn=null,Lr(e,n));do try{p0();break}catch(a){$f(e,a)}while(!0);if(ua(),ze=r,bi.current=s,ut!==null)throw Error(i(261));return wt=null,_t=0,mt}function p0(){for(;ut!==null;)Pf(ut)}function h0(){for(;ut!==null&&!Fh();)Pf(ut)}function Pf(e){var n=zf(e.alternate,e,Zt);e.memoizedProps=e.pendingProps,n===null?Mf(e):ut=n,Ua.current=null}function Mf(e){var n=e;do{var r=n.alternate;if(e=n.return,(n.flags&32768)===0){if(r=i0(r,n,Zt),r!==null){ut=r;return}}else{if(r=l0(r,n),r!==null){r.flags&=32767,ut=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{mt=6,ut=null;return}}if(n=n.sibling,n!==null){ut=n;return}ut=n=e}while(n!==null);mt===0&&(mt=5)}function zr(e,n,r){var s=qe,a=cn.transition;try{cn.transition=null,qe=1,m0(e,n,r,s)}finally{cn.transition=a,qe=s}return null}function m0(e,n,r,s){do go();while(hr!==null);if((ze&6)!==0)throw Error(i(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var u=r.lanes|r.childLanes;if(Qh(e,u),e===wt&&(ut=wt=null,_t=0),(r.subtreeFlags&2064)===0&&(r.flags&2064)===0||ki||(ki=!0,Ff(Rs,function(){return go(),null})),u=(r.flags&15990)!==0,(r.subtreeFlags&15990)!==0||u){u=cn.transition,cn.transition=null;var f=qe;qe=1;var h=ze;ze|=4,Ua.current=null,c0(e,r),Ef(r,e),Mm(Xl),zs=!!Kl,Xl=Kl=null,e.current=r,u0(r),Dh(),ze=h,qe=f,cn.transition=u}else e.current=r;if(ki&&(ki=!1,hr=e,Ci=a),u=e.pendingLanes,u===0&&(pr=null),Hh(r.stateNode),Vt(e,at()),n!==null)for(s=e.onRecoverableError,r=0;r<n.length;r++)a=n[r],s(a.value,{componentStack:a.stack,digest:a.digest});if(Si)throw Si=!1,e=Wa,Wa=null,e;return(Ci&1)!==0&&e.tag!==0&&go(),u=e.pendingLanes,(u&1)!==0?e===Ga?cs++:(cs=0,Ga=e):cs=0,cr(),null}function go(){if(hr!==null){var e=Su(Ci),n=cn.transition,r=qe;try{if(cn.transition=null,qe=16>e?16:e,hr===null)var s=!1;else{if(e=hr,hr=null,Ci=0,(ze&6)!==0)throw Error(i(331));var a=ze;for(ze|=4,se=e.current;se!==null;){var u=se,f=u.child;if((se.flags&16)!==0){var h=u.deletions;if(h!==null){for(var x=0;x<h.length;x++){var j=h[x];for(se=j;se!==null;){var L=se;switch(L.tag){case 0:case 11:case 15:is(8,L,u)}var D=L.child;if(D!==null)D.return=L,se=D;else for(;se!==null;){L=se;var M=L.sibling,oe=L.return;if(bf(L),L===j){se=null;break}if(M!==null){M.return=oe,se=M;break}se=oe}}}var ce=u.alternate;if(ce!==null){var ue=ce.child;if(ue!==null){ce.child=null;do{var ct=ue.sibling;ue.sibling=null,ue=ct}while(ue!==null)}}se=u}}if((u.subtreeFlags&2064)!==0&&f!==null)f.return=u,se=f;else e:for(;se!==null;){if(u=se,(u.flags&2048)!==0)switch(u.tag){case 0:case 11:case 15:is(9,u,u.return)}var k=u.sibling;if(k!==null){k.return=u.return,se=k;break e}se=u.return}}var v=e.current;for(se=v;se!==null;){f=se;var C=f.child;if((f.subtreeFlags&2064)!==0&&C!==null)C.return=f,se=C;else e:for(f=v;se!==null;){if(h=se,(h.flags&2048)!==0)try{switch(h.tag){case 0:case 11:case 15:vi(9,h)}}catch(fe){st(h,h.return,fe)}if(h===f){se=null;break e}var H=h.sibling;if(H!==null){H.return=h.return,se=H;break e}se=h.return}}if(ze=a,cr(),jn&&typeof jn.onPostCommitFiberRoot=="function")try{jn.onPostCommitFiberRoot($s,e)}catch{}s=!0}return s}finally{qe=r,cn.transition=n}}return!1}function Of(e,n,r){n=fo(r,n),n=Zd(e,n,1),e=dr(e,n,1),n=Lt(),e!==null&&(Ao(e,1,n),Vt(e,n))}function st(e,n,r){if(e.tag===3)Of(e,e,r);else for(;n!==null;){if(n.tag===3){Of(n,e,r);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(pr===null||!pr.has(s))){e=fo(r,e),e=ef(n,e,1),n=dr(n,e,1),e=Lt(),n!==null&&(Ao(n,1,e),Vt(n,e));break}}n=n.return}}function g0(e,n,r){var s=e.pingCache;s!==null&&s.delete(n),n=Lt(),e.pingedLanes|=e.suspendedLanes&r,wt===e&&(_t&r)===r&&(mt===4||mt===3&&(_t&130023424)===_t&&500>at()-Va?Lr(e,0):Ha|=r),Vt(e,n)}function Lf(e,n){n===0&&((e.mode&1)===0?n=1:(n=Ps,Ps<<=1,(Ps&130023424)===0&&(Ps=4194304)));var r=Lt();e=Dn(e,n),e!==null&&(Ao(e,n,r),Vt(e,r))}function x0(e){var n=e.memoizedState,r=0;n!==null&&(r=n.retryLane),Lf(e,r)}function y0(e,n){var r=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(i(314))}s!==null&&s.delete(n),Lf(e,r)}var zf;zf=function(e,n,r){if(e!==null)if(e.memoizedProps!==n.pendingProps||Dt.current)Ut=!0;else{if((e.lanes&r)===0&&(n.flags&128)===0)return Ut=!1,s0(e,n,r);Ut=(e.flags&131072)!==0}else Ut=!1,tt&&(n.flags&1048576)!==0&&gd(n,ni,n.index);switch(n.lanes=0,n.tag){case 2:var s=n.type;xi(e,n),e=n.pendingProps;var a=ro(n,Nt.current);co(n,r),a=wa(null,n,s,e,a,r);var u=Sa();return n.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Bt(s)?(u=!0,Zs(n)):u=!1,n.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ha(n),a.updater=mi,n.stateNode=a,a._reactInternals=n,Na(n,s,e,r),n=$a(null,n,s,!0,u,r)):(n.tag=0,tt&&u&&oa(n),Ot(null,n,a,r),n=n.child),n;case 16:s=n.elementType;e:{switch(xi(e,n),e=n.pendingProps,a=s._init,s=a(s._payload),n.type=s,a=n.tag=b0(s),e=xn(s,e),a){case 0:n=Ra(null,n,s,e,r);break e;case 1:n=uf(null,n,s,e,r);break e;case 11:n=of(null,n,s,e,r);break e;case 14:n=sf(null,n,s,xn(s.type,e),r);break e}throw Error(i(306,s,""))}return n;case 0:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:xn(s,a),Ra(e,n,s,a,r);case 1:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:xn(s,a),uf(e,n,s,a,r);case 3:e:{if(df(n),e===null)throw Error(i(387));s=n.pendingProps,u=n.memoizedState,a=u.element,Ed(e,n),ai(n,s,null,r);var f=n.memoizedState;if(s=f.element,u.isDehydrated)if(u={element:s,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){a=fo(Error(i(423)),n),n=ff(e,n,s,r,a);break e}else if(s!==a){a=fo(Error(i(424)),n),n=ff(e,n,s,r,a);break e}else for(Jt=ir(n.stateNode.containerInfo.firstChild),Xt=n,tt=!0,gn=null,r=kd(n,null,s,r),n.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(io(),s===a){n=Un(e,n,r);break e}Ot(e,n,s,r)}n=n.child}return n;case 5:return Nd(n),e===null&&la(n),s=n.type,a=n.pendingProps,u=e!==null?e.memoizedProps:null,f=a.children,Jl(s,a)?f=null:u!==null&&Jl(s,u)&&(n.flags|=32),cf(e,n),Ot(e,n,f,r),n.child;case 6:return e===null&&la(n),null;case 13:return pf(e,n,r);case 4:return ma(n,n.stateNode.containerInfo),s=n.pendingProps,e===null?n.child=lo(n,null,s,r):Ot(e,n,s,r),n.child;case 11:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:xn(s,a),of(e,n,s,a,r);case 7:return Ot(e,n,n.pendingProps,r),n.child;case 8:return Ot(e,n,n.pendingProps.children,r),n.child;case 12:return Ot(e,n,n.pendingProps.children,r),n.child;case 10:e:{if(s=n.type._context,a=n.pendingProps,u=n.memoizedProps,f=a.value,Ke(si,s._currentValue),s._currentValue=f,u!==null)if(mn(u.value,f)){if(u.children===a.children&&!Dt.current){n=Un(e,n,r);break e}}else for(u=n.child,u!==null&&(u.return=n);u!==null;){var h=u.dependencies;if(h!==null){f=u.child;for(var x=h.firstContext;x!==null;){if(x.context===s){if(u.tag===1){x=Bn(-1,r&-r),x.tag=2;var j=u.updateQueue;if(j!==null){j=j.shared;var L=j.pending;L===null?x.next=x:(x.next=L.next,L.next=x),j.pending=x}}u.lanes|=r,x=u.alternate,x!==null&&(x.lanes|=r),fa(u.return,r,n),h.lanes|=r;break}x=x.next}}else if(u.tag===10)f=u.type===n.type?null:u.child;else if(u.tag===18){if(f=u.return,f===null)throw Error(i(341));f.lanes|=r,h=f.alternate,h!==null&&(h.lanes|=r),fa(f,r,n),f=u.sibling}else f=u.child;if(f!==null)f.return=u;else for(f=u;f!==null;){if(f===n){f=null;break}if(u=f.sibling,u!==null){u.return=f.return,f=u;break}f=f.return}u=f}Ot(e,n,a.children,r),n=n.child}return n;case 9:return a=n.type,s=n.pendingProps.children,co(n,r),a=ln(a),s=s(a),n.flags|=1,Ot(e,n,s,r),n.child;case 14:return s=n.type,a=xn(s,n.pendingProps),a=xn(s.type,a),sf(e,n,s,a,r);case 15:return lf(e,n,n.type,n.pendingProps,r);case 17:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:xn(s,a),xi(e,n),n.tag=1,Bt(s)?(e=!0,Zs(n)):e=!1,co(n,r),Xd(n,s,a),Na(n,s,a,r),$a(null,n,s,!0,e,r);case 19:return mf(e,n,r);case 22:return af(e,n,r)}throw Error(i(156,n.tag))};function Ff(e,n){return xu(e,n)}function v0(e,n,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function un(e,n,r,s){return new v0(e,n,r,s)}function Ja(e){return e=e.prototype,!(!e||!e.isReactComponent)}function b0(e){if(typeof e=="function")return Ja(e)?1:0;if(e!=null){if(e=e.$$typeof,e===te)return 11;if(e===ae)return 14}return 2}function xr(e,n){var r=e.alternate;return r===null?(r=un(e.tag,n,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=n,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,n=e.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Ni(e,n,r,s,a,u){var f=2;if(s=e,typeof e=="function")Ja(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case V:return Fr(r.children,a,u,n);case de:f=8,a|=8;break;case Qe:return e=un(12,r,n,a|2),e.elementType=Qe,e.lanes=u,e;case ee:return e=un(13,r,n,a),e.elementType=ee,e.lanes=u,e;case Se:return e=un(19,r,n,a),e.elementType=Se,e.lanes=u,e;case ke:return Ti(r,a,u,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case X:f=10;break e;case he:f=9;break e;case te:f=11;break e;case ae:f=14;break e;case Oe:f=16,s=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return n=un(f,r,n,a),n.elementType=e,n.type=s,n.lanes=u,n}function Fr(e,n,r,s){return e=un(7,e,s,n),e.lanes=r,e}function Ti(e,n,r,s){return e=un(22,e,s,n),e.elementType=ke,e.lanes=r,e.stateNode={isHidden:!1},e}function Za(e,n,r){return e=un(6,e,null,n),e.lanes=r,e}function ec(e,n,r){return n=un(4,e.children!==null?e.children:[],e.key,n),n.lanes=r,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function w0(e,n,r,s,a){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_l(0),this.expirationTimes=_l(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_l(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function tc(e,n,r,s,a,u,f,h,x){return e=new w0(e,n,r,h,x),n===1?(n=1,u===!0&&(n|=8)):n=0,u=un(3,null,null,n),e.current=u,u.stateNode=e,u.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},ha(u),e}function S0(e,n,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:pe,key:s==null?null:""+s,children:e,containerInfo:n,implementation:r}}function Df(e){if(!e)return ar;e=e._reactInternals;e:{if(En(e)!==e||e.tag!==1)throw Error(i(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Bt(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(i(171))}if(e.tag===1){var r=e.type;if(Bt(r))return pd(e,r,n)}return n}function Bf(e,n,r,s,a,u,f,h,x){return e=tc(r,s,!0,e,a,u,f,h,x),e.context=Df(null),r=e.current,s=Lt(),a=mr(r),u=Bn(s,a),u.callback=n??null,dr(r,u,a),e.current.lanes=a,Ao(e,a,s),Vt(e,s),e}function Ii(e,n,r,s){var a=n.current,u=Lt(),f=mr(a);return r=Df(r),n.context===null?n.context=r:n.pendingContext=r,n=Bn(u,f),n.payload={element:e},s=s===void 0?null:s,s!==null&&(n.callback=s),e=dr(a,n,f),e!==null&&(bn(e,a,f,u),li(e,a,f)),f}function Ri(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Uf(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<n?r:n}}function nc(e,n){Uf(e,n),(e=e.alternate)&&Uf(e,n)}function k0(){return null}var Hf=typeof reportError=="function"?reportError:function(e){console.error(e)};function rc(e){this._internalRoot=e}$i.prototype.render=rc.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(i(409));Ii(e,n,null,null)},$i.prototype.unmount=rc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Or(function(){Ii(null,e,null,null)}),n[On]=null}};function $i(e){this._internalRoot=e}$i.prototype.unstable_scheduleHydration=function(e){if(e){var n=Eu();e={blockedOn:null,target:e,priority:n};for(var r=0;r<rr.length&&n!==0&&n<rr[r].priority;r++);rr.splice(r,0,e),r===0&&Nu(e)}};function oc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ai(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Vf(){}function C0(e,n,r,s,a){if(a){if(typeof s=="function"){var u=s;s=function(){var j=Ri(f);u.call(j)}}var f=Bf(n,s,e,0,null,!1,!1,"",Vf);return e._reactRootContainer=f,e[On]=f.current,qo(e.nodeType===8?e.parentNode:e),Or(),f}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var h=s;s=function(){var j=Ri(x);h.call(j)}}var x=tc(e,0,!1,null,null,!1,!1,"",Vf);return e._reactRootContainer=x,e[On]=x.current,qo(e.nodeType===8?e.parentNode:e),Or(function(){Ii(n,x,r,s)}),x}function Pi(e,n,r,s,a){var u=r._reactRootContainer;if(u){var f=u;if(typeof a=="function"){var h=a;a=function(){var x=Ri(f);h.call(x)}}Ii(n,f,e,a)}else f=C0(r,n,e,a,s);return Ri(f)}ku=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var r=$o(n.pendingLanes);r!==0&&(Nl(n,r|1),Vt(n,at()),(ze&6)===0&&(mo=at()+500,cr()))}break;case 13:Or(function(){var s=Dn(e,1);if(s!==null){var a=Lt();bn(s,e,1,a)}}),nc(e,1)}},Tl=function(e){if(e.tag===13){var n=Dn(e,134217728);if(n!==null){var r=Lt();bn(n,e,134217728,r)}nc(e,134217728)}},Cu=function(e){if(e.tag===13){var n=mr(e),r=Dn(e,n);if(r!==null){var s=Lt();bn(r,e,n,s)}nc(e,n)}},Eu=function(){return qe},ju=function(e,n){var r=qe;try{return qe=e,n()}finally{qe=r}},jr=function(e,n,r){switch(n){case"input":if(kt(e,r),n=r.name,r.type==="radio"&&n!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<r.length;n++){var s=r[n];if(s!==e&&s.form===e.form){var a=Xs(s);if(!a)throw Error(i(90));At(s),kt(s,a)}}}break;case"textarea":Ct(e,r);break;case"select":n=r.value,n!=null&&Me(e,!!r.multiple,n,!1)}},Kn=Qa,Xn=Or;var E0={usingClientEntryPoint:!1,Events:[Ko,to,Xs,qr,_r,Qa]},us={findFiberByHostInstance:Nr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},j0={bundleType:us.bundleType,version:us.version,rendererPackageName:us.rendererPackageName,rendererConfig:us.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ie.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=mu(e),e===null?null:e.stateNode},findFiberByHostInstance:us.findFiberByHostInstance||k0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mi.isDisabled&&Mi.supportsFiber)try{$s=Mi.inject(j0),jn=Mi}catch{}}return Wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E0,Wt.createPortal=function(e,n){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!oc(n))throw Error(i(200));return S0(e,n,null,r)},Wt.createRoot=function(e,n){if(!oc(e))throw Error(i(299));var r=!1,s="",a=Hf;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=tc(e,1,!1,null,null,r,!1,s,a),e[On]=n.current,qo(e.nodeType===8?e.parentNode:e),new rc(n)},Wt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=mu(n),e=e===null?null:e.stateNode,e},Wt.flushSync=function(e){return Or(e)},Wt.hydrate=function(e,n,r){if(!Ai(n))throw Error(i(200));return Pi(null,e,n,!0,r)},Wt.hydrateRoot=function(e,n,r){if(!oc(e))throw Error(i(405));var s=r!=null&&r.hydratedSources||null,a=!1,u="",f=Hf;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onRecoverableError!==void 0&&(f=r.onRecoverableError)),n=Bf(n,null,e,1,r??null,a,!1,u,f),e[On]=n.current,qo(e),s)for(e=0;e<s.length;e++)r=s[e],a=r._getVersion,a=a(r._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[r,a]:n.mutableSourceEagerHydrationData.push(r,a);return new $i(n)},Wt.render=function(e,n,r){if(!Ai(n))throw Error(i(200));return Pi(null,e,n,!1,r)},Wt.unmountComponentAtNode=function(e){if(!Ai(e))throw Error(i(40));return e._reactRootContainer?(Or(function(){Pi(null,null,e,!1,function(){e._reactRootContainer=null,e[On]=null})}),!0):!1},Wt.unstable_batchedUpdates=Qa,Wt.unstable_renderSubtreeIntoContainer=function(e,n,r,s){if(!Ai(r))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return Pi(e,n,r,!1,s)},Wt.version="18.3.1-next-f1338f8080-20240426",Wt}var Jf;function M0(){if(Jf)return lc.exports;Jf=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(o){console.error(o)}}return t(),lc.exports=P0(),lc.exports}var Zf;function O0(){if(Zf)return Oi;Zf=1;var t=M0();return Oi.createRoot=t.createRoot,Oi.hydrateRoot=t.hydrateRoot,Oi}var L0=O0();const z0="modulepreload",F0=function(t){return"/"+t},ep={},Ts=function(o,i,c){let d=Promise.resolve();if(i&&i.length>0){let m=function(T){return Promise.all(T.map($=>Promise.resolve($).then(A=>({status:"fulfilled",value:A}),A=>({status:"rejected",reason:A}))))};document.getElementsByTagName("link");const y=document.querySelector("meta[property=csp-nonce]"),g=(y==null?void 0:y.nonce)||(y==null?void 0:y.getAttribute("nonce"));d=m(i.map(T=>{if(T=F0(T),T in ep)return;ep[T]=!0;const $=T.endsWith(".css"),A=$?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${T}"]${A}`))return;const P=document.createElement("link");if(P.rel=$?"stylesheet":z0,$||(P.as="script"),P.crossOrigin="",P.href=T,g&&P.setAttribute("nonce",g),document.head.appendChild(P),$)return new Promise((z,ne)=>{P.addEventListener("load",z),P.addEventListener("error",()=>ne(new Error(`Unable to preload CSS for ${T}`)))})}))}function p(m){const y=new Event("vite:preloadError",{cancelable:!0});if(y.payload=m,window.dispatchEvent(y),!y.defaultPrevented)throw m}return d.then(m=>{for(const y of m||[])y.status==="rejected"&&p(y.reason);return o().catch(p)})};var Ze="-ms-",Ss="-moz-",Ue="-webkit-",Wp="comm",xl="rule",Zc="decl",D0="@import",B0="@namespace",Gp="@keyframes",U0="@layer",qp=Math.abs,eu=String.fromCharCode,Ac=Object.assign;function H0(t,o){return gt(t,0)^45?(((o<<2^gt(t,0))<<2^gt(t,1))<<2^gt(t,2))<<2^gt(t,3):0}function Yp(t){return t.trim()}function qn(t,o){return(t=o.exec(t))?t[0]:t}function $e(t,o,i){return t.replace(o,i)}function tl(t,o,i){return t.indexOf(o,i)}function gt(t,o){return t.charCodeAt(o)|0}function Vr(t,o,i){return t.slice(o,i)}function wn(t){return t.length}function Qp(t){return t.length}function ys(t,o){return o.push(t),t}function V0(t,o){return t.map(o).join("")}function tp(t,o){return t.filter(function(i){return!qn(i,o)})}var yl=1,jo=1,Kp=0,fn=0,ft=0,To="";function vl(t,o,i,c,d,p,m,y){return{value:t,root:o,parent:i,type:c,props:d,children:p,line:yl,column:jo,length:m,return:"",siblings:y}}function wr(t,o){return Ac(vl("",null,null,"",null,null,0,t.siblings),t,{length:-t.length},o)}function xo(t){for(;t.root;)t=wr(t.root,{children:[t]});ys(t,t.siblings)}function W0(){return ft}function G0(){return ft=fn>0?gt(To,--fn):0,jo--,ft===10&&(jo=1,yl--),ft}function kn(){return ft=fn<Kp?gt(To,fn++):0,jo++,ft===10&&(jo=1,yl++),ft}function Sr(){return gt(To,fn)}function nl(){return fn}function bl(t,o){return Vr(To,t,o)}function js(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function q0(t){return yl=jo=1,Kp=wn(To=t),fn=0,[]}function Y0(t){return To="",t}function uc(t){return Yp(bl(fn-1,Pc(t===91?t+2:t===40?t+1:t)))}function Q0(t){for(;(ft=Sr())&&ft<33;)kn();return js(t)>2||js(ft)>3?"":" "}function K0(t,o){for(;--o&&kn()&&!(ft<48||ft>102||ft>57&&ft<65||ft>70&&ft<97););return bl(t,nl()+(o<6&&Sr()==32&&kn()==32))}function Pc(t){for(;kn();)switch(ft){case t:return fn;case 34:case 39:t!==34&&t!==39&&Pc(ft);break;case 40:t===41&&Pc(t);break;case 92:kn();break}return fn}function X0(t,o){for(;kn()&&t+ft!==57;)if(t+ft===84&&Sr()===47)break;return"/*"+bl(o,fn-1)+"*"+eu(t===47?t:kn())}function J0(t){for(;!js(Sr());)kn();return bl(t,fn)}function Z0(t){return Y0(rl("",null,null,null,[""],t=q0(t),0,[0],t))}function rl(t,o,i,c,d,p,m,y,g){for(var T=0,$=0,A=m,P=0,z=0,ne=0,re=1,K=1,Y=1,W=0,le="",Ie=d,we=p,pe=c,V=le;K;)switch(ne=W,W=kn()){case 40:if(ne!=108&&gt(V,A-1)==58){tl(V+=$e(uc(W),"&","&\f"),"&\f",qp(T?y[T-1]:0))!=-1&&(Y=-1);break}case 34:case 39:case 91:V+=uc(W);break;case 9:case 10:case 13:case 32:V+=Q0(ne);break;case 92:V+=K0(nl()-1,7);continue;case 47:switch(Sr()){case 42:case 47:ys(eg(X0(kn(),nl()),o,i,g),g),(js(ne||1)==5||js(Sr()||1)==5)&&wn(V)&&Vr(V,-1,void 0)!==" "&&(V+=" ");break;default:V+="/"}break;case 123*re:y[T++]=wn(V)*Y;case 125*re:case 59:case 0:switch(W){case 0:case 125:K=0;case 59+$:Y==-1&&(V=$e(V,/\f/g,"")),z>0&&(wn(V)-A||re===0&&ne===47)&&ys(z>32?rp(V+";",c,i,A-1,g):rp($e(V," ","")+";",c,i,A-2,g),g);break;case 59:V+=";";default:if(ys(pe=np(V,o,i,T,$,d,y,le,Ie=[],we=[],A,p),p),W===123)if($===0)rl(V,o,pe,pe,Ie,p,A,y,we);else{switch(P){case 99:if(gt(V,3)===110)break;case 108:if(gt(V,2)===97)break;default:$=0;case 100:case 109:case 115:}$?rl(t,pe,pe,c&&ys(np(t,pe,pe,0,0,d,y,le,d,Ie=[],A,we),we),d,we,A,y,c?Ie:we):rl(V,pe,pe,pe,[""],we,0,y,we)}}T=$=z=0,re=Y=1,le=V="",A=m;break;case 58:A=1+wn(V),z=ne;default:if(re<1){if(W==123)--re;else if(W==125&&re++==0&&G0()==125)continue}switch(V+=eu(W),W*re){case 38:Y=$>0?1:(V+="\f",-1);break;case 44:y[T++]=(wn(V)-1)*Y,Y=1;break;case 64:Sr()===45&&(V+=uc(kn())),P=Sr(),$=A=wn(le=V+=J0(nl())),W++;break;case 45:ne===45&&wn(V)==2&&(re=0)}}return p}function np(t,o,i,c,d,p,m,y,g,T,$,A){for(var P=d-1,z=d===0?p:[""],ne=Qp(z),re=0,K=0,Y=0;re<c;++re)for(var W=0,le=Vr(t,P+1,P=qp(K=m[re])),Ie=t;W<ne;++W)(Ie=Yp(K>0?z[W]+" "+le:$e(le,/&\f/g,z[W])))&&(g[Y++]=Ie);return vl(t,o,i,d===0?xl:y,g,T,$,A)}function eg(t,o,i,c){return vl(t,o,i,Wp,eu(W0()),Vr(t,2,-2),0,c)}function rp(t,o,i,c,d){return vl(t,o,i,Zc,Vr(t,0,c),Vr(t,c+1,-1),c,d)}function Xp(t,o,i){switch(H0(t,o)){case 5103:return Ue+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Ue+t+t;case 4855:return Ue+t.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+t;case 4789:return Ss+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return Ue+t+Ss+t+Ze+t+t;case 5936:switch(gt(t,o+11)){case 114:return Ue+t+Ze+$e(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return Ue+t+Ze+$e(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return Ue+t+Ze+$e(t,/[svh]\w+-[tblr]{2}/,"lr")+t}case 6828:case 4268:case 2903:return Ue+t+Ze+t+t;case 6165:return Ue+t+Ze+"flex-"+t+t;case 5187:return Ue+t+$e(t,/(\w+).+(:[^]+)/,Ue+"box-$1$2"+Ze+"flex-$1$2")+t;case 5443:return Ue+t+Ze+"flex-item-"+$e(t,/flex-|-self/g,"")+(qn(t,/flex-|baseline/)?"":Ze+"grid-row-"+$e(t,/flex-|-self/g,""))+t;case 4675:return Ue+t+Ze+"flex-line-pack"+$e(t,/align-content|flex-|-self/g,"")+t;case 5548:return Ue+t+Ze+$e(t,"shrink","negative")+t;case 5292:return Ue+t+Ze+$e(t,"basis","preferred-size")+t;case 6060:return Ue+"box-"+$e(t,"-grow","")+Ue+t+Ze+$e(t,"grow","positive")+t;case 4554:return Ue+$e(t,/([^-])(transform)/g,"$1"+Ue+"$2")+t;case 6187:return $e($e($e(t,/(zoom-|grab)/,Ue+"$1"),/(image-set)/,Ue+"$1"),t,"")+t;case 5495:case 3959:return $e(t,/(image-set\([^]*)/,Ue+"$1$`$1");case 4968:return $e($e(t,/(.+:)(flex-)?(.*)/,Ue+"box-pack:$3"+Ze+"flex-pack:$3"),/space-between/,"justify")+Ue+t+t;case 4200:if(!qn(t,/flex-|baseline/))return Ze+"grid-column-align"+Vr(t,o)+t;break;case 2592:case 3360:return Ze+$e(t,"template-","")+t;case 4384:case 3616:return i&&i.some(function(c,d){return o=d,qn(c.props,/grid-\w+-end/)})?~tl(t+(i=i[o].value),"span",0)?t:Ze+$e(t,"-start","")+t+Ze+"grid-row-span:"+(~tl(i,"span",0)?qn(i,/\d+/):+qn(i,/\d+/)-+qn(t,/\d+/))+";":Ze+$e(t,"-start","")+t;case 4896:case 4128:return i&&i.some(function(c){return qn(c.props,/grid-\w+-start/)})?t:Ze+$e($e(t,"-end","-span"),"span ","")+t;case 4095:case 3583:case 4068:case 2532:return $e(t,/(.+)-inline(.+)/,Ue+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(wn(t)-1-o>6)switch(gt(t,o+1)){case 109:if(gt(t,o+4)!==45)break;case 102:return $e(t,/(.+:)(.+)-([^]+)/,"$1"+Ue+"$2-$3$1"+Ss+(gt(t,o+3)==108?"$3":"$2-$3"))+t;case 115:return~tl(t,"stretch",0)?Xp($e(t,"stretch","fill-available"),o,i)+t:t}break;case 5152:case 5920:return $e(t,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,d,p,m,y,g,T){return Ze+d+":"+p+T+(m?Ze+d+"-span:"+(y?g:+g-+p)+T:"")+t});case 4949:if(gt(t,o+6)===121)return $e(t,":",":"+Ue)+t;break;case 6444:switch(gt(t,gt(t,14)===45?18:11)){case 120:return $e(t,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Ue+(gt(t,14)===45?"inline-":"")+"box$3$1"+Ue+"$2$3$1"+Ze+"$2box$3")+t;case 100:return $e(t,":",":"+Ze)+t}break;case 5719:case 2647:case 2135:case 3927:case 2391:return $e(t,"scroll-","scroll-snap-")+t}return t}function pl(t,o){for(var i="",c=0;c<t.length;c++)i+=o(t[c],c,t,o)||"";return i}function tg(t,o,i,c){switch(t.type){case U0:if(t.children.length)break;case D0:case B0:case Zc:return t.return=t.return||t.value;case Wp:return"";case Gp:return t.return=t.value+"{"+pl(t.children,c)+"}";case xl:if(!wn(t.value=t.props.join(",")))return""}return wn(i=pl(t.children,c))?t.return=t.value+"{"+i+"}":""}function ng(t){var o=Qp(t);return function(i,c,d,p){for(var m="",y=0;y<o;y++)m+=t[y](i,c,d,p)||"";return m}}function rg(t){return function(o){o.root||(o=o.return)&&t(o)}}function og(t,o,i,c){if(t.length>-1&&!t.return)switch(t.type){case Zc:t.return=Xp(t.value,t.length,i);return;case Gp:return pl([wr(t,{value:$e(t.value,"@","@"+Ue)})],c);case xl:if(t.length)return V0(i=t.props,function(d){switch(qn(d,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":xo(wr(t,{props:[$e(d,/:(read-\w+)/,":"+Ss+"$1")]})),xo(wr(t,{props:[d]})),Ac(t,{props:tp(i,c)});break;case"::placeholder":xo(wr(t,{props:[$e(d,/:(plac\w+)/,":"+Ue+"input-$1")]})),xo(wr(t,{props:[$e(d,/:(plac\w+)/,":"+Ss+"$1")]})),xo(wr(t,{props:[$e(d,/:(plac\w+)/,Ze+"input-$1")]})),xo(wr(t,{props:[d]})),Ac(t,{props:tp(i,c)});break}return""})}}var ko={};function Yn(t,...o){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${t} for more information.${o.length>0?` Args: ${o.join(", ")}`:""}`)}var dc,fc;const _o=typeof process<"u"&&ko!==void 0&&(ko.REACT_APP_SC_ATTR||ko.SC_ATTR)||"data-styled",Jp="active",Zp="data-styled-version",wl="6.6.0",tu=`/*!sc*/
`,ks=typeof window<"u"&&typeof document<"u";if(!$t.createContext)throw Yn(19);function op(t){if(typeof process<"u"&&ko!==void 0){const o=ko[t];if(o!==void 0&&o!=="")return o!=="false"}}const sg=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(fc=(dc=op("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&dc!==void 0?dc:op("SC_DISABLE_SPEEDY"))!==null&&fc!==void 0?fc:typeof process<"u"&&ko!==void 0&&!1),eh="sc-keyframes-",ig={};let ol=new Map,hl=new Map,sl=1;const vs=t=>{if(ol.has(t))return ol.get(t);for(;hl.has(sl);)sl++;const o=sl++;return ol.set(t,o),hl.set(o,t),o},lg=t=>hl.get(t),ag=(t,o)=>{sl=o+1,ol.set(t,o),hl.set(o,t)},nu=Object.freeze([]),No=Object.freeze({});function th(t,o,i=No){return t.theme!==i.theme&&t.theme||o||i.theme}const cg=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ug=/(^-|-$)/g;function nh(t){return t.replace(cg,"-").replace(ug,"")}const dg=/(a)(d)/gi,sp=t=>String.fromCharCode(t+(t>25?39:97));function ru(t){let o,i="";for(o=Math.abs(t);o>52;o=o/52|0)i=sp(o%52)+i;return(sp(o%52)+i).replace(dg,"$1-$2")}const Mc=5381,Hr=(t,o)=>{let i=o.length;for(;i;)t=33*t^o.charCodeAt(--i);return t},rh=t=>Hr(Mc,t);function ou(t){return ru(rh(t)>>>0)}function fg(t){return t.displayName||t.name||"Component"}function Oc(t){return typeof t=="string"&&!0}function pg(t){return Oc(t)?`styled.${t}`:`Styled(${fg(t)})`}const oh=Symbol.for("react.memo"),hg=Symbol.for("react.forward_ref"),mg={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},gg={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},xg={[hg]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[oh]:sh};function ip(t){return("type"in(o=t)&&o.type.$$typeof)===oh?sh:"$$typeof"in t?xg[t.$$typeof]:mg;var o}const yg=Object.defineProperty,vg=Object.getOwnPropertyNames,bg=Object.getOwnPropertySymbols,wg=Object.getOwnPropertyDescriptor,Sg=Object.getPrototypeOf,kg=Object.prototype;function ih(t,o,i){if(typeof o!="string"){const c=Sg(o);c&&c!==kg&&ih(t,c,i);const d=vg(o).concat(bg(o)),p=ip(t),m=ip(o);for(let y=0;y<d.length;++y){const g=d[y];if(!(g in gg||i&&i[g]||m&&g in m||p&&g in p)){const T=wg(o,g);try{yg(t,g,T)}catch{}}}}return t}function Io(t){return typeof t=="function"}const Cg=Symbol.for("react.forward_ref");function su(t){return t!=null&&(typeof t=="object"||typeof t=="function")&&t.$$typeof===Cg&&"styledComponentId"in t}function bs(t,o){return t&&o?t+" "+o:t||o||""}function ml(t,o){return t.join("")}function _s(t){return t!==null&&typeof t=="object"&&t.constructor.name===Object.name&&!("props"in t&&t.$$typeof)}function Lc(t,o,i=!1){if(!i&&!_s(t)&&!Array.isArray(t))return o;if(Array.isArray(o))for(let c=0;c<o.length;c++)t[c]=Lc(t[c],o[c]);else if(_s(o))for(const c in o)t[c]=Lc(t[c],o[c]);return t}function iu(t,o){Object.defineProperty(t,"toString",{value:o})}const Eg=class{constructor(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t,this._cGroup=0,this._cIndex=0}indexOfGroup(t){if(t===this._cGroup)return this._cIndex;let o=this._cIndex;if(t>this._cGroup)for(let i=this._cGroup;i<t;i++)o+=this.groupSizes[i];else for(let i=this._cGroup-1;i>=t;i--)o-=this.groupSizes[i];return this._cGroup=t,this._cIndex=o,o}insertRules(t,o){if(t>=this.groupSizes.length){const d=this.groupSizes,p=d.length;let m=p;for(;t>=m;)if(m<<=1,m<0)throw Yn(16,`${t}`);this.groupSizes=new Uint32Array(m),this.groupSizes.set(d),this.length=m;for(let y=p;y<m;y++)this.groupSizes[y]=0}let i=this.indexOfGroup(t+1),c=0;for(let d=0,p=o.length;d<p;d++)this.tag.insertRule(i,o[d])&&(this.groupSizes[t]++,i++,c++);c>0&&this._cGroup>t&&(this._cIndex+=c)}clearGroup(t){if(t<this.length){const o=this.groupSizes[t],i=this.indexOfGroup(t),c=i+o;this.groupSizes[t]=0;for(let d=i;d<c;d++)this.tag.deleteRule(i);o>0&&this._cGroup>t&&(this._cIndex-=o)}}getGroup(t){let o="";if(t>=this.length||this.groupSizes[t]===0)return o;const i=this.groupSizes[t],c=this.indexOfGroup(t),d=c+i;for(let p=c;p<d;p++)o+=this.tag.getRule(p)+tu;return o}},jg=`style[${_o}][${Zp}="${wl}"]`,_g=new RegExp(`^${_o}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),lp=t=>typeof ShadowRoot<"u"&&t instanceof ShadowRoot||"host"in t&&t.nodeType===11,zc=t=>{if(!t)return document;if(lp(t))return t;if("getRootNode"in t){const o=t.getRootNode();if(lp(o))return o}return document},Ng=(t,o,i)=>{const c=i.split(",");let d;for(let p=0,m=c.length;p<m;p++)(d=c[p])&&t.registerName(o,d)},Tg=(t,o)=>{var i;const c=((i=o.textContent)!==null&&i!==void 0?i:"").split(tu),d=[];for(let p=0,m=c.length;p<m;p++){const y=c[p].trim();if(!y)continue;const g=y.match(_g);if(g){const T=0|parseInt(g[1],10),$=g[2];T!==0&&(ag($,T),Ng(t,$,g[3]),t.getTag().insertRules(T,d)),d.length=0}else d.push(y)}},pc=t=>{const i=zc(t.options.target).querySelectorAll(jg);for(let c=0,d=i.length;c<d;c++){const p=i[c];p&&p.getAttribute(_o)!==Jp&&(Tg(t,p),p.parentNode&&p.parentNode.removeChild(p))}};let fs=!1;function Ig(){if(fs!==!1)return fs;if(typeof document<"u"){const t=document.head.querySelector('meta[property="csp-nonce"]');if(t)return fs=t.nonce||t.getAttribute("content")||void 0;const o=document.head.querySelector('meta[name="sc-nonce"]');if(o)return fs=o.getAttribute("content")||void 0}return fs=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const lh=(t,o)=>{if(typeof document>"u")throw Yn(20);const i=document.head,c=t||i,d=document.createElement("style"),p=(g=>{const T=Array.from(g.querySelectorAll(`style[${_o}]`));return T[T.length-1]})(c),m=p!==void 0?p.nextSibling:null;d.setAttribute(_o,Jp),d.setAttribute(Zp,wl);const y=o||Ig();return y&&d.setAttribute("nonce",y),c.insertBefore(d,m),d},Rg=class{constructor(t,o){this.element=lh(t,o),this.element.appendChild(document.createTextNode("")),this.sheet=(i=>{var c;if(i.sheet)return i.sheet;const d=(c=i.getRootNode().styleSheets)!==null&&c!==void 0?c:document.styleSheets;for(let p=0,m=d.length;p<m;p++){const y=d[p];if(y.ownerNode===i)return y}throw Yn(17)})(this.element),this.length=0}insertRule(t,o){try{return this.sheet.insertRule(o,t),this.length++,!0}catch{return!1}}deleteRule(t){this.sheet.deleteRule(t),this.length--}getRule(t){const o=this.sheet.cssRules[t];return o&&o.cssText?o.cssText:""}},$g=class{constructor(t,o){this.element=lh(t,o),this.nodes=this.element.childNodes,this.length=0}insertRule(t,o){if(t<=this.length&&t>=0){const i=document.createTextNode(o);return this.element.insertBefore(i,this.nodes[t]||null),this.length++,!0}return!1}deleteRule(t){this.element.removeChild(this.nodes[t]),this.length--}getRule(t){return t<this.length?this.nodes[t].textContent:""}};let ap=ks;const Ag={isServer:!ks,useCSSOMInjection:!sg};class Is{static registerId(o){return vs(o)}constructor(o=No,i={},c){this.options=Object.assign(Object.assign({},Ag),o),this.gs=i,this.keyframeIds=new Set,this.names=new Map(c),this.server=!!o.isServer,!this.server&&ks&&ap&&(ap=!1,pc(this)),iu(this,()=>(d=>{const p=d.getTag(),{length:m}=p;let y="";for(let g=0;g<m;g++){const T=lg(g);if(T===void 0)continue;const $=d.names.get(T);if($===void 0||!$.size)continue;const A=p.getGroup(g);if(A.length===0)continue;const P=_o+".g"+g+'[id="'+T+'"]';let z="";for(const ne of $)ne.length>0&&(z+=ne+",");y+=A+P+'{content:"'+z+'"}'+tu}return y})(this))}rehydrate(){!this.server&&ks&&pc(this)}reconstructWithOptions(o,i=!0){const c=new Is(Object.assign(Object.assign({},this.options),o),this.gs,i&&this.names||void 0);return c.keyframeIds=new Set(this.keyframeIds),!this.server&&ks&&o.target!==this.options.target&&zc(this.options.target)!==zc(o.target)&&pc(c),c}allocateGSInstance(o){return this.gs[o]=(this.gs[o]||0)+1}getTag(){return this.tag||(this.tag=(o=(({useCSSOMInjection:i,target:c,nonce:d})=>i?new Rg(c,d):new $g(c,d))(this.options),new Eg(o)));var o}hasNameForId(o,i){var c,d;return(d=(c=this.names.get(o))===null||c===void 0?void 0:c.has(i))!==null&&d!==void 0&&d}registerName(o,i){vs(o),o.startsWith(eh)&&this.keyframeIds.add(o);const c=this.names.get(o);c?c.add(i):this.names.set(o,new Set([i]))}insertRules(o,i,c){this.registerName(o,i),this.getTag().insertRules(vs(o),c)}clearNames(o){this.names.has(o)&&this.names.get(o).clear()}clearRules(o){this.getTag().clearGroup(vs(o)),this.clearNames(o)}clearTag(){this.tag=void 0}}const ah=new WeakSet,Pg={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Mg(t,o){return o==null||typeof o=="boolean"||o===""?"":typeof o!="number"||o===0||t in Pg||t.startsWith("--")?String(o).trim():o+"px"}const Br=47;function cp(t){if(t.charCodeAt(0)===45&&t.charCodeAt(1)===45)return t;let o="";for(let i=0;i<t.length;i++){const c=t.charCodeAt(i);o+=c>=65&&c<=90?"-"+String.fromCharCode(c+32):t[i]}return o.startsWith("ms-")?"-"+o:o}const ch=Symbol.for("sc-keyframes");function Og(t){return typeof t=="object"&&t!==null&&ch in t}function uh(t){return Io(t)&&!(t.prototype&&t.prototype.isReactComponent)}const dh=t=>t==null||t===!1||t==="",Lg=Symbol.for("react.client.reference");function up(t){return t.$$typeof===Lg}function fh(t,o){for(const i in t){const c=t[i];t.hasOwnProperty(i)&&!dh(c)&&(Array.isArray(c)&&ah.has(c)||Io(c)?o.push(cp(i)+":",c,";"):_s(c)?(o.push(i+" {"),fh(c,o),o.push("}")):o.push(cp(i)+": "+Mg(i,c)+";"))}}function kr(t,o,i,c,d=[]){if(dh(t))return d;const p=typeof t;if(p==="string")return d.push(t),d;if(p==="function"){if(up(t))return d;if(uh(t)&&o){const m=t(o);return kr(m,o,i,c,d)}return d.push(t),d}if(Array.isArray(t)){for(let m=0;m<t.length;m++)kr(t[m],o,i,c,d);return d}return su(t)?(d.push(`.${t.styledComponentId}`),d):Og(t)?(i?(t.inject(i,c),d.push(t.getName(c))):d.push(t),d):up(t)?d:_s(t)?t.toString!==Object.prototype.toString?(d.push(t.toString()),d):(fh(t,d),d):(d.push(t.toString()),d)}const zg=rh(wl);class Fg{constructor(o,i,c){this.rules=o,this.componentId=i,this.baseHash=Hr(zg,i),this.baseStyle=c,Is.registerId(i)}generateAndInjectStyles(o,i,c){let d=this.baseStyle?this.baseStyle.generateAndInjectStyles(o,i,c):"";{let p="";for(let m=0;m<this.rules.length;m++){const y=this.rules[m];if(typeof y=="string")p+=y;else if(y)if(uh(y)){const g=y(o);typeof g=="string"?p+=g:g!=null&&g!==!1&&(p+=ml(kr(g,o,i,c)))}else p+=ml(kr(y,o,i,c))}if(p){this.dynamicNameCache||(this.dynamicNameCache=new Map);const m=c.hash?c.hash+p:p;let y=this.dynamicNameCache.get(m);if(!y){if(y=ru(Hr(Hr(this.baseHash,c.hash),p)>>>0),this.dynamicNameCache.size>=200){const g=this.dynamicNameCache.keys().next().value;g!==void 0&&this.dynamicNameCache.delete(g)}this.dynamicNameCache.set(m,y)}if(!i.hasNameForId(this.componentId,y)){const g=c(p,"."+y,void 0,this.componentId);i.insertRules(this.componentId,y,g)}d=bs(d,y)}}return d}}const Dg=/&/g;function ph(t,o){let i=0;for(;--o>=0&&t.charCodeAt(o)===92;)i++;return!(1&~i)}function hc(t){const o=t.length;let i="",c=0,d=0,p=0,m=!1,y=!1;for(let g=0;g<o;g++){const T=t.charCodeAt(g);if(p!==0||m||T!==Br||t.charCodeAt(g+1)!==42)if(m)T===42&&t.charCodeAt(g+1)===Br&&(m=!1,g++);else if(T!==34&&T!==39||ph(t,g)){if(p===0)if(T===123)d++;else if(T===125){if(d--,d<0){y=!0;let $=g+1;for(;$<o;){const A=t.charCodeAt($);if(A===59||A===10)break;$++}$<o&&t.charCodeAt($)===59&&$++,d=0,g=$-1,c=$;continue}d===0&&(i+=t.substring(c,g+1),c=g+1)}else T===59&&d===0&&(i+=t.substring(c,g+1),c=g+1)}else p===0?p=T:p===T&&(p=0);else m=!0,g++}return y||d!==0||p!==0?(c<o&&d===0&&p===0&&(i+=t.substring(c)),i):t}function hh(t,o){const i=o+" ",c=","+i;for(let d=0;d<t.length;d++){const p=t[d];if(p.type==="rule"){p.value=(i+p.value).replaceAll(",",c);const m=p.props,y=[];for(let g=0;g<m.length;g++)y[g]=i+m[g];p.props=y}Array.isArray(p.children)&&p.type!=="@keyframes"&&hh(p.children,o)}return t}function Bg({options:t=No,plugins:o=nu}=No){let i,c,d;const p=(P,z,ne)=>ne.startsWith(c)&&ne.endsWith(c)&&ne.replaceAll(c,"").length>0?`.${i}`:P,m=o.slice();m.push(P=>{P.type===xl&&P.value.includes("&")&&(d||(d=new RegExp(`\\${c}\\b`,"g")),P.props[0]=P.props[0].replace(Dg,c).replace(d,p))}),t.prefix&&m.push(og),m.push(tg);let y=[];const g=ng(m.concat(rg(P=>y.push(P)))),T=(P,z="",ne="",re="&")=>{i=re,c=z,d=void 0;const K=(function(W){const le=W.indexOf("//")!==-1,Ie=W.indexOf("}")!==-1;if(!le&&!Ie)return W;if(!le)return hc(W);const we=W.length;let pe="",V=0,de=0,Qe=0,X=0,he=0,te=!1;for(;de<we;){const ee=W.charCodeAt(de);if(ee!==34&&ee!==39||ph(W,de))if(Qe===0)if(ee===Br&&de+1<we&&W.charCodeAt(de+1)===42){for(de+=2;de+1<we&&(W.charCodeAt(de)!==42||W.charCodeAt(de+1)!==Br);)de++;de+=2}else if(ee!==40)if(ee!==41)if(X>0)de++;else if(ee===42&&de+1<we&&W.charCodeAt(de+1)===Br)pe+=W.substring(V,de),de+=2,V=de,te=!0;else if(ee===Br&&de+1<we&&W.charCodeAt(de+1)===Br){for(pe+=W.substring(V,de);de<we&&W.charCodeAt(de)!==10;)de++;V=de,te=!0}else ee===123?he++:ee===125&&he--,de++;else X>0&&X--,de++;else X++,de++;else de++;else Qe===0?Qe=ee:Qe===ee&&(Qe=0),de++}return te?(V<we&&(pe+=W.substring(V)),he===0?pe:hc(pe)):he===0?W:hc(W)})(P);let Y=Z0(ne||z?ne+" "+z+" { "+K+" }":K);return t.namespace&&(Y=hh(Y,t.namespace)),y=[],pl(Y,g),y},$=t;let A=Mc;for(let P=0;P<o.length;P++)o[P].name||Yn(15),A=Hr(A,o[P].name);return $!=null&&$.namespace&&(A=Hr(A,$.namespace)),$!=null&&$.prefix&&(A=Hr(A,"p")),T.hash=A!==Mc?A.toString():"",T}const Ug=new Is,Fc=Bg(),mh=$t.createContext({shouldForwardProp:void 0,styleSheet:Ug,stylis:Fc,stylisPlugins:void 0});mh.Consumer;function gh(){return $t.useContext(mh)}const Ns=$t.createContext(void 0);Ns.Consumer;function il(t){const o=$t.useContext(Ns),i=$t.useMemo(()=>(function(c,d){if(!c)throw Yn(14);if(Io(c))return c(d);if(Array.isArray(c)||typeof c!="object")throw Yn(8);return d?Object.assign(Object.assign({},d),c):c})(t.theme,o),[t.theme,o]);return t.children?$t.createElement(Ns.Provider,{value:i},t.children):null}const mc={};function Hg(t,o){const i=typeof t!="string"?"sc":nh(t);mc[i]=(mc[i]||0)+1;const c=i+"-"+ou(wl+i+mc[i]);return o?o+"-"+c:c}function Vg(t,o,i){const c=su(t),d=t,p=!Oc(t),{attrs:m=nu,componentId:y=Hg(o.displayName,o.parentComponentId),displayName:g=pg(t)}=o,T=o.displayName&&o.componentId?nh(o.displayName)+"-"+o.componentId:o.componentId||y,$=c&&d.attrs?d.attrs.concat(m).filter(Boolean):m;let{shouldForwardProp:A}=o;if(c&&d.shouldForwardProp){const re=d.shouldForwardProp;if(o.shouldForwardProp){const K=o.shouldForwardProp;A=(Y,W)=>re(Y,W)&&K(Y,W)}else A=re}const P=new Fg(i,T,c?d.componentStyle:void 0);function z(re,K){return(function(Y,W,le){const{attrs:Ie,componentStyle:we,defaultProps:pe,foldedComponentIds:V,styledComponentId:de,target:Qe}=Y,X=$t.useContext(Ns),he=gh(),te=Y.shouldForwardProp||he.shouldForwardProp,ee=th(W,X,pe)||No,[Se,ae]=(function(b,R,Z){const Q=Object.assign(Object.assign({},R),{className:void 0,theme:Z});let xe=null;const ge=b.length>1;for(let ye=0;ye<b.length;ye++){const G=b[ye],Ce=Io(G)?G(ge?Object.assign({},Q):Q):G;for(const Te in Ce)Te==="className"?Q.className=bs(Q.className,Ce[Te]):Te==="style"?Q.style=Object.assign(Object.assign({},Q.style),Ce[Te]):Ce[Te]===void 0?Te in Q&&(Q[Te]!==void 0&&(xe||(xe=[])).push(Te),Q[Te]=void 0):Q[Te]=Ce[Te]}return"className"in R&&typeof R.className=="string"&&(Q.className=bs(Q.className,R.className)),[Q,xe]})(Ie,W,ee),Oe=we.generateAndInjectStyles(Se,he.styleSheet,he.stylis),ke=Se.as||Qe,F=Oc(ke),J=(function(b,R,Z,Q,xe,ge){const ye={};for(const G in b)G[0]==="$"||G==="as"||G==="theme"&&b.theme===Z||(G==="forwardedAs"?b.forwardedAs!==void 0&&(ye.as=b.forwardedAs):b[G]===void 0?G==="className"||xe||ge!==null&&ge.indexOf(G)!==-1||Q&&!Q(G,R)||(ye[G]=void 0):Q&&!Q(G,R)||(ye[G]=b[G]));return ye})(Se,ke,ee,te,F,ae);let O=bs(V,de);return Oe&&(O+=" "+Oe),Se.className&&(O+=" "+Se.className),J[F&&ke.includes("-")?"class":"className"]=O,le&&(J.ref=le),I.createElement(ke,J)})(ne,re,K)}z.displayName=g;let ne=$t.forwardRef(z);return ne.attrs=$,ne.componentStyle=P,ne.displayName=g,ne.shouldForwardProp=A,ne.foldedComponentIds=c?bs(d.foldedComponentIds,d.styledComponentId):"",ne.styledComponentId=T,ne.target=c?d.target:t,Object.defineProperty(ne,"defaultProps",{get(){return this._foldedDefaultProps},set(re){this._foldedDefaultProps=c?(function(K,...Y){for(const W of Y)Lc(K,W,!0);return K})({},d.defaultProps,re):re}}),iu(ne,()=>`.${ne.styledComponentId}`),p&&ih(ne,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),ne}var Wg=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function dp(t,o){const i=[t[0]];for(let c=0,d=o.length;c<d;c+=1)i.push(o[c],t[c+1]);return i}const fp=t=>(ah.add(t),t);function lu(t,...o){if(Io(t)||_s(t))return fp(kr(dp(nu,[t,...o])));const i=t;return o.length===0&&i.length===1&&typeof i[0]=="string"?kr(i):fp(kr(dp(i,o)))}function Dc(t,o,i=No){if(!o)throw Yn(1,o);const c=(d,...p)=>t(o,i,lu(d,...p));return c.attrs=d=>Dc(t,o,Object.assign(Object.assign({},i),{attrs:Array.prototype.concat(i.attrs,d).filter(Boolean)})),c.withConfig=d=>Dc(t,o,Object.assign(Object.assign({},i),d)),c}const xh=t=>Dc(Vg,t),N=xh;Wg.forEach(t=>{N[t]=xh(t)});class Gg{constructor(o,i){this.instanceRules=new Map,this.rules=o,this.componentId=i,this.isStatic=(function(c){for(let d=0;d<c.length;d+=1){const p=c[d];if(Io(p)&&!su(p))return!1}return!0})(o),Is.registerId(this.componentId)}removeStyles(o,i){this.instanceRules.delete(o),this.rebuildGroup(i)}renderStyles(o,i,c,d){const p=this.componentId;if(this.isStatic){if(c.hasNameForId(p,p+o))this.instanceRules.has(o)||this.computeRules(o,i,c,d);else{const y=this.computeRules(o,i,c,d);c.insertRules(p,y.name,y.rules)}return}const m=this.instanceRules.get(o);if(this.computeRules(o,i,c,d),!c.server&&m){const y=m.rules,g=this.instanceRules.get(o).rules;if(y.length===g.length){let T=!0;for(let $=0;$<y.length;$++)if(y[$]!==g[$]){T=!1;break}if(T)return}}this.rebuildGroup(c)}computeRules(o,i,c,d){const p=ml(kr(this.rules,i,c,d)),m={name:this.componentId+o,rules:d(p,"")};return this.instanceRules.set(o,m),m}rebuildGroup(o){const i=this.componentId;o.clearRules(i);for(const c of this.instanceRules.values())o.insertRules(i,c.name,c.rules)}}function qg(t,...o){const i=lu(t,...o),c=`sc-global-${ou(JSON.stringify(i))}`,d=new Gg(i,c),p=y=>{const g=gh(),T=$t.useContext(Ns);let $;{const A=$t.useRef(null);A.current===null&&(A.current=g.styleSheet.allocateGSInstance(c)),$=A.current}g.styleSheet.server&&m($,y,g.styleSheet,T,g.stylis);{const A=d.isStatic?[$,g.styleSheet,d]:[$,y,g.styleSheet,T,g.stylis,d],P=$t.useRef(d);$t.useLayoutEffect(()=>{g.styleSheet.server||(P.current!==d&&(g.styleSheet.clearRules(c),P.current=d),m($,y,g.styleSheet,T,g.stylis))},A),$t.useLayoutEffect(()=>()=>{g.styleSheet.server||d.removeStyles($,g.styleSheet)},[$,g.styleSheet,d])}return g.styleSheet.server&&d.instanceRules.delete($),null};function m(y,g,T,$,A){if(d.isStatic)d.renderStyles(y,ig,T,A);else{const P=Object.assign(Object.assign({},g),{theme:th(g,$,p.defaultProps)});d.renderStyles(y,P,T,A)}}return $t.memo(p)}var yh;class Yg{constructor(o,i){this[yh]=!0,this.inject=(c,d=Fc)=>{const p=this.getName(d);if(!c.hasNameForId(this.id,p)){const m=d(this.rules,p,"@keyframes");c.insertRules(this.id,p,m)}},this.name=o,this.id=eh+o,this.rules=i,vs(this.id),iu(this,()=>{throw Yn(12,String(this.name))})}getName(o=Fc){return o.hash?this.name+ru(+o.hash>>>0):this.name}}function Sl(t,...o){const i=ml(lu(t,...o)),c=ou(i);return new Yg(c,i)}yh=ch;const ie={colors:{bgCanvas:"#F4F5F2",bgSurface:"#FFFFFF",bgSurfaceSubtle:"#F6F7F4",bgSurfaceHover:"#EEF1EC",bgElevated:"#FFFFFF",bgGlassHeavy:"rgba(255, 255, 255, 0.96)",borderSubtle:"rgba(30, 36, 32, 0.09)",borderStrong:"rgba(30, 36, 32, 0.18)",textPrimary:"#1E2420",textSecondary:"#5B655F",textMuted:"#7B857F",brandPrimary:"#2D6A4F",brandPrimaryHover:"#23533D",brandPrimaryLight:"#52796B",brandPrimarySubtle:"rgba(45, 106, 79, 0.09)",accentMuted:"#3E5C52",status:{NORMAL:"#2D6A4F",WARNING:"#B45309",CRITICAL:"#C81E1E",OFFLINE:"#64748B"},statusBg:{NORMAL:"rgba(45, 106, 79, 0.10)",WARNING:"rgba(180, 83, 9, 0.10)",CRITICAL:"rgba(200, 30, 30, 0.09)",OFFLINE:"rgba(100, 116, 139, 0.11)"}},radius:{sm:"6px",md:"10px",lg:"12px",pill:"999px"},motion:{ease:"cubic-bezier(0.2, 0.8, 0.2, 1)",fast:"150ms",press:"90ms",panel:"200ms"},shadows:{sm:"0 1px 2px rgba(30, 36, 32, 0.04)",md:"0 6px 20px rgba(30, 36, 32, 0.07)",lg:"0 18px 44px rgba(30, 36, 32, 0.12)"},fonts:{sans:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",display:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",mono:"'JetBrains Mono', 'Consolas', monospace"}},Dv={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"},Qg={LOW:"Baixo",MEDIUM:"Médio",HIGH:"Alto"};function vh(t,o="2.3.0"){if(!t||typeof t!="string")return!1;const i=p=>{const m=String(p).match(/(\d+)\.(\d+)(?:\.(\d+))?/);return m?[Number(m[1]),Number(m[2]),Number(m[3]||0)]:null},c=i(t),d=i(o);if(!c||!d)return!1;for(let p=0;p<3;p+=1){if(c[p]<d[p])return!0;if(c[p]>d[p])return!1}return!1}function me(t){if(!t||typeof t!="string")return t||"";if(!t.includes("Ã")&&!t.includes("Â"))return t;try{const o=new Uint8Array(t.length);for(let c=0;c<t.length;c++)o[c]=t.charCodeAt(c)&255;const i=new TextDecoder("utf-8",{fatal:!1}).decode(o);if(!i.includes("�"))return i}catch{}return t.replace(/Ã“/g,"Ó").replace(/Ã§/g,"ç").replace(/Ã£/g,"ã").replace(/Ã¡/g,"á").replace(/Ã©/g,"é").replace(/Ã­/g,"í").replace(/Ã³/g,"ó").replace(/Ãº/g,"ú").replace(/Ã¢/g,"â").replace(/Ãª/g,"ê").replace(/Ã´/g,"ô").replace(/Ã‡/g,"Ç").replace(/Ãƒ/g,"Ã")}const ll=qg`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
    background-color: ${({theme:t})=>t.colors.bgCanvas};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-family: ${({theme:t})=>t.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden;
  }

  button, a, input, select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.brandPrimary};
    outline-offset: 2px;
  }

  /* Barras de rolagem discretas e refinadas */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(30, 36, 32, 0.16);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(30, 36, 32, 0.30);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`,Pn=Object.create(null);Pn.open="0";Pn.close="1";Pn.ping="2";Pn.pong="3";Pn.message="4";Pn.upgrade="5";Pn.noop="6";const al=Object.create(null);Object.keys(Pn).forEach(t=>{al[Pn[t]]=t});const Bc={type:"error",data:"parser error"},bh=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",wh=typeof ArrayBuffer=="function",Sh=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,au=({type:t,data:o},i,c)=>bh&&o instanceof Blob?i?c(o):pp(o,c):wh&&(o instanceof ArrayBuffer||Sh(o))?i?c(o):pp(new Blob([o]),c):c(Pn[t]+(o||"")),pp=(t,o)=>{const i=new FileReader;return i.onload=function(){const c=i.result.split(",")[1];o("b"+(c||""))},i.readAsDataURL(t)};function hp(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let gc;function Kg(t,o){if(bh&&t.data instanceof Blob)return t.data.arrayBuffer().then(hp).then(o);if(wh&&(t.data instanceof ArrayBuffer||Sh(t.data)))return o(hp(t.data));au(t,!1,i=>{gc||(gc=new TextEncoder),o(gc.encode(i))})}const mp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ws=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<mp.length;t++)ws[mp.charCodeAt(t)]=t;const Xg=t=>{let o=t.length*.75,i=t.length,c,d=0,p,m,y,g;t[t.length-1]==="="&&(o--,t[t.length-2]==="="&&o--);const T=new ArrayBuffer(o),$=new Uint8Array(T);for(c=0;c<i;c+=4)p=ws[t.charCodeAt(c)],m=ws[t.charCodeAt(c+1)],y=ws[t.charCodeAt(c+2)],g=ws[t.charCodeAt(c+3)],$[d++]=p<<2|m>>4,$[d++]=(m&15)<<4|y>>2,$[d++]=(y&3)<<6|g&63;return T},Jg=typeof ArrayBuffer=="function",cu=(t,o)=>{if(typeof t!="string")return{type:"message",data:kh(t,o)};const i=t.charAt(0);return i==="b"?{type:"message",data:Zg(t.substring(1),o)}:al[i]?t.length>1?{type:al[i],data:t.substring(1)}:{type:al[i]}:Bc},Zg=(t,o)=>{if(Jg){const i=Xg(t);return kh(i,o)}else return{base64:!0,data:t}},kh=(t,o)=>{switch(o){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},Ch="",ex=(t,o)=>{const i=t.length,c=new Array(i);let d=0;t.forEach((p,m)=>{au(p,!1,y=>{c[m]=y,++d===i&&o(c.join(Ch))})})},tx=(t,o)=>{const i=t.split(Ch),c=[];for(let d=0;d<i.length;d++){const p=cu(i[d],o);if(c.push(p),p.type==="error")break}return c};function nx(){return new TransformStream({transform(t,o){Kg(t,i=>{const c=i.length;let d;if(c<126)d=new Uint8Array(1),new DataView(d.buffer).setUint8(0,c);else if(c<65536){d=new Uint8Array(3);const p=new DataView(d.buffer);p.setUint8(0,126),p.setUint16(1,c)}else{d=new Uint8Array(9);const p=new DataView(d.buffer);p.setUint8(0,127),p.setBigUint64(1,BigInt(c))}t.data&&typeof t.data!="string"&&(d[0]|=128),o.enqueue(d),o.enqueue(i)})}})}let xc;function Li(t){return t.reduce((o,i)=>o+i.length,0)}function zi(t,o){if(t[0].length===o)return t.shift();const i=new Uint8Array(o);let c=0;for(let d=0;d<o;d++)i[d]=t[0][c++],c===t[0].length&&(t.shift(),c=0);return t.length&&c<t[0].length&&(t[0]=t[0].slice(c)),i}function rx(t,o){xc||(xc=new TextDecoder);const i=[];let c=0,d=-1,p=!1;return new TransformStream({transform(m,y){for(i.push(m);;){if(c===0){if(Li(i)<1)break;const g=zi(i,1);p=(g[0]&128)===128,d=g[0]&127,d<126?c=3:d===126?c=1:c=2}else if(c===1){if(Li(i)<2)break;const g=zi(i,2);d=new DataView(g.buffer,g.byteOffset,g.length).getUint16(0),c=3}else if(c===2){if(Li(i)<8)break;const g=zi(i,8),T=new DataView(g.buffer,g.byteOffset,g.length),$=T.getUint32(0);if($>Math.pow(2,21)-1){y.enqueue(Bc);break}d=$*Math.pow(2,32)+T.getUint32(4),c=3}else{if(Li(i)<d)break;const g=zi(i,d);y.enqueue(cu(p?g:xc.decode(g),o)),c=0}if(d===0||d>t){y.enqueue(Bc);break}}}})}const Eh=4;function pt(t){if(t)return ox(t)}function ox(t){for(var o in pt.prototype)t[o]=pt.prototype[o];return t}pt.prototype.on=pt.prototype.addEventListener=function(t,o){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(o),this};pt.prototype.once=function(t,o){function i(){this.off(t,i),o.apply(this,arguments)}return i.fn=o,this.on(t,i),this};pt.prototype.off=pt.prototype.removeListener=pt.prototype.removeAllListeners=pt.prototype.removeEventListener=function(t,o){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var i=this._callbacks["$"+t];if(!i)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var c,d=0;d<i.length;d++)if(c=i[d],c===o||c.fn===o){i.splice(d,1);break}return i.length===0&&delete this._callbacks["$"+t],this};pt.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var o=new Array(arguments.length-1),i=this._callbacks["$"+t],c=1;c<arguments.length;c++)o[c-1]=arguments[c];if(i){i=i.slice(0);for(var c=0,d=i.length;c<d;++c)i[c].apply(this,o)}return this};pt.prototype.emitReserved=pt.prototype.emit;pt.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};pt.prototype.hasListeners=function(t){return!!this.listeners(t).length};const kl=typeof Promise=="function"&&typeof Promise.resolve=="function"?o=>Promise.resolve().then(o):(o,i)=>i(o,0),dn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),sx="arraybuffer";function jh(t,...o){return o.reduce((i,c)=>(t.hasOwnProperty(c)&&(i[c]=t[c]),i),{})}const ix=dn.setTimeout,lx=dn.clearTimeout;function Cl(t,o){o.useNativeTimers?(t.setTimeoutFn=ix.bind(dn),t.clearTimeoutFn=lx.bind(dn)):(t.setTimeoutFn=dn.setTimeout.bind(dn),t.clearTimeoutFn=dn.clearTimeout.bind(dn))}const ax=1.33;function cx(t){return typeof t=="string"?ux(t):Math.ceil((t.byteLength||t.size)*ax)}function ux(t){let o=0,i=0;for(let c=0,d=t.length;c<d;c++)o=t.charCodeAt(c),o<128?i+=1:o<2048?i+=2:o<55296||o>=57344?i+=3:(c++,i+=4);return i}function _h(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function dx(t){let o="";for(let i in t)t.hasOwnProperty(i)&&(o.length&&(o+="&"),o+=encodeURIComponent(i)+"="+encodeURIComponent(t[i]));return o}function fx(t){let o={},i=t.split("&");for(let c=0,d=i.length;c<d;c++){let p=i[c].split("=");o[decodeURIComponent(p[0])]=decodeURIComponent(p[1])}return o}class px extends Error{constructor(o,i,c){super(o),this.description=i,this.context=c,this.type="TransportError"}}class uu extends pt{constructor(o){super(),this.writable=!1,Cl(this,o),this.opts=o,this.query=o.query,this.socket=o.socket,this.supportsBinary=!o.forceBase64}onError(o,i,c){return super.emitReserved("error",new px(o,i,c)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(o){this.readyState==="open"&&this.write(o)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(o){const i=cu(o,this.socket.binaryType);this.onPacket(i)}onPacket(o){super.emitReserved("packet",o)}onClose(o){this.readyState="closed",super.emitReserved("close",o)}pause(o){}createUri(o,i={}){return o+"://"+this._hostname()+this._port()+this.opts.path+this._query(i)}_hostname(){const o=this.opts.hostname;return o.indexOf(":")===-1?o:"["+o+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(o){const i=dx(o);return i.length?"?"+i:""}}class hx extends uu{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(o){this.readyState="pausing";const i=()=>{this.readyState="paused",o()};if(this._polling||!this.writable){let c=0;this._polling&&(c++,this.once("pollComplete",function(){--c||i()})),this.writable||(c++,this.once("drain",function(){--c||i()}))}else i()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(o){const i=c=>{if(this.readyState==="opening"&&c.type==="open"&&this.onOpen(),c.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(c)};tx(o,this.socket.binaryType).forEach(i),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const o=()=>{this.write([{type:"close"}])};this.readyState==="open"?o():this.once("open",o)}write(o){this.writable=!1,ex(o,i=>{this.doWrite(i,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const o=this.opts.secure?"https":"http",i=this.query||{};return this.opts.timestampRequests!==!1&&(i[this.opts.timestampParam]=_h()),!this.supportsBinary&&!i.sid&&(i.b64=1),this.createUri(o,i)}}let Nh=!1;try{Nh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const mx=Nh;function gx(){}class xx extends hx{constructor(o){if(super(o),typeof location<"u"){const i=location.protocol==="https:";let c=location.port;c||(c=i?"443":"80"),this.xd=typeof location<"u"&&o.hostname!==location.hostname||c!==o.port}}doWrite(o,i){const c=this.request({method:"POST",data:o});c.on("success",i),c.on("error",(d,p)=>{this.onError("xhr post error",d,p)})}doPoll(){const o=this.request();o.on("data",this.onData.bind(this)),o.on("error",(i,c)=>{this.onError("xhr poll error",i,c)}),this.pollXhr=o}}class An extends pt{constructor(o,i,c){super(),this.createRequest=o,Cl(this,c),this._opts=c,this._method=c.method||"GET",this._uri=i,this._data=c.data!==void 0?c.data:null,this._create()}_create(){var o;const i=jh(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");i.xdomain=!!this._opts.xd;const c=this._xhr=this.createRequest(i);try{c.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){c.setDisableHeaderCheck&&c.setDisableHeaderCheck(!0);for(let d in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(d)&&c.setRequestHeader(d,this._opts.extraHeaders[d])}}catch{}if(this._method==="POST")try{c.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{c.setRequestHeader("Accept","*/*")}catch{}(o=this._opts.cookieJar)===null||o===void 0||o.addCookies(c),"withCredentials"in c&&(c.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(c.timeout=this._opts.requestTimeout),c.onreadystatechange=()=>{var d;c.readyState===3&&((d=this._opts.cookieJar)===null||d===void 0||d.parseCookies(c.getResponseHeader("set-cookie"))),c.readyState===4&&(c.status===200||c.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof c.status=="number"?c.status:0)},0))},c.send(this._data)}catch(d){this.setTimeoutFn(()=>{this._onError(d)},0);return}typeof document<"u"&&(this._index=An.requestsCount++,An.requests[this._index]=this)}_onError(o){this.emitReserved("error",o,this._xhr),this._cleanup(!0)}_cleanup(o){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=gx,o)try{this._xhr.abort()}catch{}typeof document<"u"&&delete An.requests[this._index],this._xhr=null}}_onLoad(){const o=this._xhr.responseText;o!==null&&(this.emitReserved("data",o),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}An.requestsCount=0;An.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",gp);else if(typeof addEventListener=="function"){const t="onpagehide"in dn?"pagehide":"unload";addEventListener(t,gp,!1)}}function gp(){for(let t in An.requests)An.requests.hasOwnProperty(t)&&An.requests[t].abort()}const yx=(function(){const t=Th({xdomain:!1});return t&&t.responseType!==null})();class vx extends xx{constructor(o){super(o);const i=o&&o.forceBase64;this.supportsBinary=yx&&!i}request(o={}){return Object.assign(o,{xd:this.xd},this.opts),new An(Th,this.uri(),o)}}function Th(t){const o=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!o||mx))return new XMLHttpRequest}catch{}if(!o)try{return new dn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Ih=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class bx extends uu{get name(){return"websocket"}doOpen(){const o=this.uri(),i=this.opts.protocols,c=Ih?{}:jh(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(c.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(o,i,c)}catch(d){return this.emitReserved("error",d)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=o=>this.onClose({description:"websocket connection closed",context:o}),this.ws.onmessage=o=>this.onData(o.data),this.ws.onerror=o=>this.onError("websocket error",o)}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;au(c,this.supportsBinary,p=>{try{this.doWrite(c,p)}catch{}d&&kl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const o=this.opts.secure?"wss":"ws",i=this.query||{};return this.opts.timestampRequests&&(i[this.opts.timestampParam]=_h()),this.supportsBinary||(i.b64=1),this.createUri(o,i)}}const yc=dn.WebSocket||dn.MozWebSocket;class wx extends bx{createSocket(o,i,c){return Ih?new yc(o,i,c):i?new yc(o,i):new yc(o)}doWrite(o,i){this.ws.send(i)}}class Sx extends uu{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(o){return this.emitReserved("error",o)}this._transport.closed.then(()=>{this.onClose()}).catch(o=>{this.onError("webtransport error",o)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(o=>{const i=rx(Number.MAX_SAFE_INTEGER,this.socket.binaryType),c=o.readable.pipeThrough(i).getReader(),d=nx();d.readable.pipeTo(o.writable),this._writer=d.writable.getWriter();const p=()=>{c.read().then(({done:y,value:g})=>{y||(this.onPacket(g),p())}).catch(y=>{})};p();const m={type:"open"};this.query.sid&&(m.data=`{"sid":"${this.query.sid}"}`),this._writer.write(m).then(()=>this.onOpen())})})}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;this._writer.write(c).then(()=>{d&&kl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var o;(o=this._transport)===null||o===void 0||o.close()}}const kx={websocket:wx,webtransport:Sx,polling:vx},Cx=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Ex=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Uc(t){if(t.length>8e3)throw"URI too long";const o=t,i=t.indexOf("["),c=t.indexOf("]");i!=-1&&c!=-1&&(t=t.substring(0,i)+t.substring(i,c).replace(/:/g,";")+t.substring(c,t.length));let d=Cx.exec(t||""),p={},m=14;for(;m--;)p[Ex[m]]=d[m]||"";return i!=-1&&c!=-1&&(p.source=o,p.host=p.host.substring(1,p.host.length-1).replace(/;/g,":"),p.authority=p.authority.replace("[","").replace("]","").replace(/;/g,":"),p.ipv6uri=!0),p.pathNames=jx(p,p.path),p.queryKey=_x(p,p.query),p}function jx(t,o){const i=/\/{2,9}/g,c=o.replace(i,"/").split("/");return(o.slice(0,1)=="/"||o.length===0)&&c.splice(0,1),o.slice(-1)=="/"&&c.splice(c.length-1,1),c}function _x(t,o){const i={};return o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(c,d,p){d&&(i[d]=p)}),i}const Hc=typeof addEventListener=="function"&&typeof removeEventListener=="function",cl=[];Hc&&addEventListener("offline",()=>{cl.forEach(t=>t())},!1);let Rh=class So extends pt{constructor(o,i={}){var c,d;if(super(),this.binaryType=sx,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,o&&typeof o=="object"&&(i=o,o=null),o){const p=Uc(o);i.hostname=p.host,i.secure=p.protocol==="https"||p.protocol==="wss",i.port=p.port,p.query&&(i.query=p.query)}else i.host&&(i.hostname=Uc(i.host).host);if(Cl(this,i),this.secure=i.secure!=null?i.secure:typeof location<"u"&&location.protocol==="https:",i.hostname&&!i.port&&(i.port=this.secure?"443":"80"),this.hostname=i.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=i.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),i.transportImplementations&&i.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");i.transportImplementations||!((c=i.transports)===null||c===void 0)&&c.length&&typeof i.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((d=i.transportImplementations)!==null&&d!==void 0?d:i.transports).forEach(p=>{const m=p.prototype.name;this.transports.push(m),this._transportsByName[m]=p})):(this.transports=i.transports?[...i.transports]:["polling","websocket","webtransport"],this._transportsByName=kx),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=fx(this.opts.query)),Hc&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},cl.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(o){const i=Object.assign({},this.opts.query);i.EIO=Eh,i.transport=o,this.id&&(i.sid=this.id);const c=Object.assign({},this.opts,{query:i,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[o]);return new this._transportsByName[o](c)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const o=this.opts.rememberUpgrade&&So.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const i=this.createTransport(o);i.open(),this.setTransport(i)}setTransport(o){this.transport&&this.transport.removeAllListeners(),this.transport=o,o.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",i=>this._onClose("transport close",i))}_probe(o){let i=this.createTransport(o),c=!1;So.priorWebsocketSuccess=!1;const d=()=>{c||(i.send([{type:"ping",data:"probe"}]),i.once("packet",A=>{if(!c)if(A.type==="pong"&&A.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",i),!i)return;So.priorWebsocketSuccess=i.name==="websocket",this.transport.pause(()=>{c||this.readyState!=="closed"&&($(),this.setTransport(i),i.send([{type:"upgrade"}]),this.emitReserved("upgrade",i),i=null,this.upgrading=!1,this.flush())})}else{const P=new Error("probe error");P.transport=i.name,this.emitReserved("upgradeError",P)}}))};function p(){c||(c=!0,$(),i.close(),i=null)}const m=A=>{const P=new Error("probe error: "+A);P.transport=i.name,p(),this.emitReserved("upgradeError",P)};function y(){m("transport closed")}function g(){m("socket closed")}function T(A){i&&A.name!==i.name&&p()}const $=()=>{i.removeListener("open",d),i.removeListener("error",m),i.removeListener("close",y),this.off("close",g),this.off("upgrading",T)};i.once("open",d),i.once("error",m),i.once("close",y),this.once("close",g),this.once("upgrading",T),this._upgrades.indexOf("webtransport")!==-1&&o!=="webtransport"?this.setTimeoutFn(()=>{c||i.open()},200):i.open()}onOpen(){if(this.readyState="open",So.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let o=0;o<this._upgrades.length;o++)this._probe(this._upgrades[o])}_onPacket(o){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",o),this.emitReserved("heartbeat"),o.type){case"open":this.onHandshake(JSON.parse(o.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const i=new Error("server error");i.code=o.data,this._onError(i);break;case"message":this.emitReserved("data",o.data),this.emitReserved("message",o.data);break}}onHandshake(o){this.emitReserved("handshake",o),this.id=o.sid,this.transport.query.sid=o.sid,this._upgrades=this._filterUpgrades(o.upgrades),this._pingInterval=o.pingInterval,this._pingTimeout=o.pingTimeout,this._maxPayload=o.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const o=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+o,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},o),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const o=this._getWritablePackets();this.transport.send(o),this._prevBufferLen=o.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let i=1;for(let c=0;c<this.writeBuffer.length;c++){const d=this.writeBuffer[c].data;if(d&&(i+=cx(d)),c>0&&i>this._maxPayload)return this.writeBuffer.slice(0,c);i+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const o=Date.now()>this._pingTimeoutTime;return o&&(this._pingTimeoutTime=0,kl(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),o}write(o,i,c){return this._sendPacket("message",o,i,c),this}send(o,i,c){return this._sendPacket("message",o,i,c),this}_sendPacket(o,i,c,d){if(typeof i=="function"&&(d=i,i=void 0),typeof c=="function"&&(d=c,c=null),this.readyState==="closing"||this.readyState==="closed")return;c=c||{},c.compress=c.compress!==!1;const p={type:o,data:i,options:c};this.emitReserved("packetCreate",p),this.writeBuffer.push(p),d&&this.once("flush",d),this.flush()}close(){const o=()=>{this._onClose("forced close"),this.transport.close()},i=()=>{this.off("upgrade",i),this.off("upgradeError",i),o()},c=()=>{this.once("upgrade",i),this.once("upgradeError",i)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?c():o()}):this.upgrading?c():o()),this}_onError(o){if(So.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",o),this._onClose("transport error",o)}_onClose(o,i){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Hc&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const c=cl.indexOf(this._offlineEventListener);c!==-1&&cl.splice(c,1)}this.readyState="closed",this.id=null,this.emitReserved("close",o,i),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(o){const i=[];for(let c=0;c<o.length;c++)~this.transports.indexOf(o[c])&&i.push(o[c]);return i}};Rh.protocol=Eh;function Nx(t,o="",i){let c=t;i=i||typeof location<"u"&&location,t==null&&(t=i.protocol+"//"+i.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=i.protocol+t:t=i.host+t),/^(https?|wss?):\/\//.test(t)||(typeof i<"u"?t=i.protocol+"//"+t:t="https://"+t),c=Uc(t)),c.port||(/^(http|ws)$/.test(c.protocol)?c.port="80":/^(http|ws)s$/.test(c.protocol)&&(c.port="443")),c.path=c.path||"/";const p=c.host.indexOf(":")!==-1?"["+c.host+"]":c.host;return c.id=c.protocol+"://"+p+":"+c.port+o,c.href=c.protocol+"://"+p+(i&&i.port===c.port?"":":"+c.port),c}const Tx=typeof ArrayBuffer=="function",Ix=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,$h=Object.prototype.toString,Rx=typeof Blob=="function"||typeof Blob<"u"&&$h.call(Blob)==="[object BlobConstructor]",$x=typeof File=="function"||typeof File<"u"&&$h.call(File)==="[object FileConstructor]";function du(t){return Tx&&(t instanceof ArrayBuffer||Ix(t))||Rx&&t instanceof Blob||$x&&t instanceof File}function ul(t,o){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let i=0,c=t.length;i<c;i++)if(ul(t[i]))return!0;return!1}if(du(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return ul(t.toJSON(),!0);for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&ul(t[i]))return!0;return!1}function Ax(t){const o=[],i=t.data,c=t;return c.data=dl(i,o),c.attachments=o.length,{packet:c,buffers:o}}function dl(t,o,i){if(!t)return t;if(du(t)){const c={_placeholder:!0,num:o.length};return o.push(t),c}else if(Array.isArray(t)){const c=new Array(t.length);for(let d=0;d<t.length;d++)c[d]=dl(t[d],o);return c}else if(typeof t=="object"&&!(t instanceof Date)){if(t.toJSON&&typeof t.toJSON=="function"&&!i)return dl(t.toJSON(),o,!0);const c={};for(const d in t)Object.prototype.hasOwnProperty.call(t,d)&&(c[d]=dl(t[d],o));return c}return t}function Px(t,o){return t.data=Vc(t.data,o),delete t.attachments,t}function Vc(t,o){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<o.length)return o[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let i=0;i<t.length;i++)t[i]=Vc(t[i],o);else if(typeof t=="object")for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(t[i]=Vc(t[i],o));return t}const Mx=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Le;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(Le||(Le={}));class Ox{constructor(o){this.replacer=o}encode(o){return(o.type===Le.EVENT||o.type===Le.ACK)&&ul(o)?this.encodeAsBinary({type:o.type===Le.EVENT?Le.BINARY_EVENT:Le.BINARY_ACK,nsp:o.nsp,data:o.data,id:o.id}):[this.encodeAsString(o)]}encodeAsString(o){let i=""+o.type;return(o.type===Le.BINARY_EVENT||o.type===Le.BINARY_ACK)&&(i+=o.attachments+"-"),o.nsp&&o.nsp!=="/"&&(i+=o.nsp+","),o.id!=null&&(i+=o.id),o.data!=null&&(i+=JSON.stringify(o.data,this.replacer)),i}encodeAsBinary(o){const i=Ax(o),c=this.encodeAsString(i.packet),d=i.buffers;return d.unshift(c),d}}class fu extends pt{constructor(o){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof o=="function"?{reviver:o}:o)}add(o){let i;if(typeof o=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");i=this.decodeString(o);const c=i.type===Le.BINARY_EVENT;c||i.type===Le.BINARY_ACK?(i.type=c?Le.EVENT:Le.ACK,this.reconstructor=new Lx(i)):super.emitReserved("decoded",i)}else if(du(o)||o.base64)if(this.reconstructor)i=this.reconstructor.takeBinaryData(o),i&&(this.reconstructor=null,super.emitReserved("decoded",i));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+o)}decodeString(o){let i=0;const c={type:Number(o.charAt(0))};if(Le[c.type]===void 0)throw new Error("unknown packet type "+c.type);if(c.type===Le.BINARY_EVENT||c.type===Le.BINARY_ACK){const p=i+1;for(;o.charAt(++i)!=="-"&&i!=o.length;);const m=o.substring(p,i);if(m!=Number(m)||o.charAt(i)!=="-")throw new Error("Illegal attachments");const y=Number(m);if(!zx(y)||y<1)throw new Error("Illegal attachments");if(y>this.opts.maxAttachments)throw new Error("too many attachments");c.attachments=y}if(o.charAt(i+1)==="/"){const p=i+1;for(;++i&&!(o.charAt(i)===","||i===o.length););c.nsp=o.substring(p,i)}else c.nsp="/";const d=o.charAt(i+1);if(d!==""&&Number(d)==d){const p=i+1;for(;++i;){const m=o.charAt(i);if(m==null||Number(m)!=m){--i;break}if(i===o.length)break}c.id=Number(o.substring(p,i+1))}if(o.charAt(++i)){const p=this.tryParse(o.substr(i));if(fu.isPayloadValid(c.type,p))c.data=p;else throw new Error("invalid payload")}return c}tryParse(o){try{return JSON.parse(o,this.opts.reviver)}catch{return!1}}static isPayloadValid(o,i){switch(o){case Le.CONNECT:return xp(i);case Le.DISCONNECT:return i===void 0;case Le.CONNECT_ERROR:return typeof i=="string"||xp(i);case Le.EVENT:case Le.BINARY_EVENT:return Array.isArray(i)&&(typeof i[0]=="number"||typeof i[0]=="string"&&Mx.indexOf(i[0])===-1);case Le.ACK:case Le.BINARY_ACK:return Array.isArray(i)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Lx{constructor(o){this.packet=o,this.buffers=[],this.reconPack=o}takeBinaryData(o){if(this.buffers.push(o),this.buffers.length===this.reconPack.attachments){const i=Px(this.reconPack,this.buffers);return this.finishedReconstruction(),i}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const zx=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};function xp(t){return Object.prototype.toString.call(t)==="[object Object]"}const Fx=Object.freeze(Object.defineProperty({__proto__:null,Decoder:fu,Encoder:Ox,get PacketType(){return Le}},Symbol.toStringTag,{value:"Module"}));function Sn(t,o,i){return t.on(o,i),function(){t.off(o,i)}}const Dx=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ah extends pt{constructor(o,i,c){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=o,this.nsp=i,c&&c.auth&&(this.auth=c.auth),this._opts=Object.assign({},c),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const o=this.io;this.subs=[Sn(o,"open",this.onopen.bind(this)),Sn(o,"packet",this.onpacket.bind(this)),Sn(o,"error",this.onerror.bind(this)),Sn(o,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...o){return o.unshift("message"),this.emit.apply(this,o),this}emit(o,...i){var c,d,p;if(Dx.hasOwnProperty(o))throw new Error('"'+o.toString()+'" is a reserved event name');if(i.unshift(o),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(i),this;const m={type:Le.EVENT,data:i};if(m.options={},m.options.compress=this.flags.compress!==!1,typeof i[i.length-1]=="function"){const $=this.ids++,A=i.pop();this._registerAckCallback($,A),m.id=$}const y=(d=(c=this.io.engine)===null||c===void 0?void 0:c.transport)===null||d===void 0?void 0:d.writable,g=this.connected&&!(!((p=this.io.engine)===null||p===void 0)&&p._hasPingExpired());return this.flags.volatile&&!y||(g?(this.notifyOutgoingListeners(m),this.packet(m)):this.sendBuffer.push(m)),this.flags={},this}_registerAckCallback(o,i){var c;const d=(c=this.flags.timeout)!==null&&c!==void 0?c:this._opts.ackTimeout;if(d===void 0){this.acks[o]=i;return}const p=this.io.setTimeoutFn(()=>{delete this.acks[o];for(let y=0;y<this.sendBuffer.length;y++)this.sendBuffer[y].id===o&&this.sendBuffer.splice(y,1);i.call(this,new Error("operation has timed out"))},d),m=(...y)=>{this.io.clearTimeoutFn(p),i.apply(this,y)};m.withError=!0,this.acks[o]=m}emitWithAck(o,...i){return new Promise((c,d)=>{const p=(m,y)=>m?d(m):c(y);p.withError=!0,i.push(p),this.emit(o,...i)})}_addToQueue(o){let i;typeof o[o.length-1]=="function"&&(i=o.pop());const c={id:this._queueSeq++,tryCount:0,pending:!1,args:o,flags:Object.assign({fromQueue:!0},this.flags)};o.push((d,...p)=>(this._queue[0],d!==null?c.tryCount>this._opts.retries&&(this._queue.shift(),i&&i(d)):(this._queue.shift(),i&&i(null,...p)),c.pending=!1,this._drainQueue())),this._queue.push(c),this._drainQueue()}_drainQueue(o=!1){if(!this.connected||this._queue.length===0)return;const i=this._queue[0];i.pending&&!o||(i.pending=!0,i.tryCount++,this.flags=i.flags,this.emit.apply(this,i.args))}packet(o){o.nsp=this.nsp,this.io._packet(o)}onopen(){typeof this.auth=="function"?this.auth(o=>{this._sendConnectPacket(o)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(o){this.packet({type:Le.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},o):o})}onerror(o){this.connected||this.emitReserved("connect_error",o)}onclose(o,i){this.connected=!1,delete this.id,this.emitReserved("disconnect",o,i),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(o=>{if(!this.sendBuffer.some(c=>String(c.id)===o)){const c=this.acks[o];delete this.acks[o],c.withError&&c.call(this,new Error("socket has been disconnected"))}})}onpacket(o){if(o.nsp===this.nsp)switch(o.type){case Le.CONNECT:o.data&&o.data.sid?this.onconnect(o.data.sid,o.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Le.EVENT:case Le.BINARY_EVENT:this.onevent(o);break;case Le.ACK:case Le.BINARY_ACK:this.onack(o);break;case Le.DISCONNECT:this.ondisconnect();break;case Le.CONNECT_ERROR:this.destroy();const c=new Error(o.data.message);c.data=o.data.data,this.emitReserved("connect_error",c);break}}onevent(o){const i=o.data||[];o.id!=null&&i.push(this.ack(o.id)),this.connected?this.emitEvent(i):this.receiveBuffer.push(Object.freeze(i))}emitEvent(o){if(this._anyListeners&&this._anyListeners.length){const i=this._anyListeners.slice();for(const c of i)c.apply(this,o)}super.emit.apply(this,o),this._pid&&o.length&&typeof o[o.length-1]=="string"&&(this._lastOffset=o[o.length-1])}ack(o){const i=this;let c=!1;return function(...d){c||(c=!0,i.packet({type:Le.ACK,id:o,data:d}))}}onack(o){const i=this.acks[o.id];typeof i=="function"&&(delete this.acks[o.id],i.withError&&o.data.unshift(null),i.apply(this,o.data))}onconnect(o,i){this.id=o,this.recovered=i&&this._pid===i,this._pid=i,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(o=>this.emitEvent(o)),this.receiveBuffer=[],this.sendBuffer.forEach(o=>{this.notifyOutgoingListeners(o),this.packet(o)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(o=>o()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Le.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(o){return this.flags.compress=o,this}get volatile(){return this.flags.volatile=!0,this}timeout(o){return this.flags.timeout=o,this}onAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(o),this}prependAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(o),this}offAny(o){if(!this._anyListeners)return this;if(o){const i=this._anyListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(o),this}prependAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(o),this}offAnyOutgoing(o){if(!this._anyOutgoingListeners)return this;if(o){const i=this._anyOutgoingListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(o){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const i=this._anyOutgoingListeners.slice();for(const c of i)c.apply(this,o.data)}}}function Ro(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Ro.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var o=Math.random(),i=Math.floor(o*this.jitter*t);t=(Math.floor(o*10)&1)==0?t-i:t+i}return Math.min(t,this.max)|0};Ro.prototype.reset=function(){this.attempts=0};Ro.prototype.setMin=function(t){this.ms=t};Ro.prototype.setMax=function(t){this.max=t};Ro.prototype.setJitter=function(t){this.jitter=t};class Wc extends pt{constructor(o,i){var c;super(),this.nsps={},this.subs=[],o&&typeof o=="object"&&(i=o,o=void 0),i=i||{},i.path=i.path||"/socket.io",this.opts=i,Cl(this,i),this.reconnection(i.reconnection!==!1),this.reconnectionAttempts(i.reconnectionAttempts||1/0),this.reconnectionDelay(i.reconnectionDelay||1e3),this.reconnectionDelayMax(i.reconnectionDelayMax||5e3),this.randomizationFactor((c=i.randomizationFactor)!==null&&c!==void 0?c:.5),this.backoff=new Ro({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(i.timeout==null?2e4:i.timeout),this._readyState="closed",this.uri=o;const d=i.parser||Fx;this.encoder=new d.Encoder,this.decoder=new d.Decoder,this._autoConnect=i.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(o){return arguments.length?(this._reconnection=!!o,o||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(o){return o===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=o,this)}reconnectionDelay(o){var i;return o===void 0?this._reconnectionDelay:(this._reconnectionDelay=o,(i=this.backoff)===null||i===void 0||i.setMin(o),this)}randomizationFactor(o){var i;return o===void 0?this._randomizationFactor:(this._randomizationFactor=o,(i=this.backoff)===null||i===void 0||i.setJitter(o),this)}reconnectionDelayMax(o){var i;return o===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=o,(i=this.backoff)===null||i===void 0||i.setMax(o),this)}timeout(o){return arguments.length?(this._timeout=o,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(o){if(~this._readyState.indexOf("open"))return this;this.engine=new Rh(this.uri,this.opts);const i=this.engine,c=this;this._readyState="opening",this.skipReconnect=!1;const d=Sn(i,"open",function(){c.onopen(),o&&o()}),p=y=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",y),o?o(y):this.maybeReconnectOnOpen()},m=Sn(i,"error",p);if(this._timeout!==!1){const y=this._timeout,g=this.setTimeoutFn(()=>{d(),p(new Error("timeout")),i.close()},y);this.opts.autoUnref&&g.unref(),this.subs.push(()=>{this.clearTimeoutFn(g)})}return this.subs.push(d),this.subs.push(m),this}connect(o){return this.open(o)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const o=this.engine;this.subs.push(Sn(o,"ping",this.onping.bind(this)),Sn(o,"data",this.ondata.bind(this)),Sn(o,"error",this.onerror.bind(this)),Sn(o,"close",this.onclose.bind(this)),Sn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(o){try{this.decoder.add(o)}catch(i){this.onclose("parse error",i)}}ondecoded(o){kl(()=>{this.emitReserved("packet",o)},this.setTimeoutFn)}onerror(o){this.emitReserved("error",o)}socket(o,i){let c=this.nsps[o];return c?this._autoConnect&&!c.active&&c.connect():(c=new Ah(this,o,i),this.nsps[o]=c),c}_destroy(o){const i=Object.keys(this.nsps);for(const c of i)if(this.nsps[c].active)return;this._close()}_packet(o){const i=this.encoder.encode(o);for(let c=0;c<i.length;c++)this.engine.write(i[c],o.options)}cleanup(){this.subs.forEach(o=>o()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(o,i){var c;this.cleanup(),(c=this.engine)===null||c===void 0||c.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",o,i),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const o=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const i=this.backoff.duration();this._reconnecting=!0;const c=this.setTimeoutFn(()=>{o.skipReconnect||(this.emitReserved("reconnect_attempt",o.backoff.attempts),!o.skipReconnect&&o.open(d=>{d?(o._reconnecting=!1,o.reconnect(),this.emitReserved("reconnect_error",d)):o.onreconnect()}))},i);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}}onreconnect(){const o=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",o)}}const ps={};function fl(t,o){typeof t=="object"&&(o=t,t=void 0),o=o||{};const i=Nx(t,o.path||"/socket.io"),c=i.source,d=i.id,p=i.path,m=ps[d]&&p in ps[d].nsps,y=o.forceNew||o["force new connection"]||o.multiplex===!1||m;let g;return y?g=new Wc(c,o):(ps[d]||(ps[d]=new Wc(c,o)),g=ps[d]),i.query&&!o.query&&(o.query=i.queryKey),g.socket(i.path,o)}Object.assign(fl,{Manager:Wc,Socket:Ah,io:fl,connect:fl});const Ph="";async function Fe(t,{method:o="GET",token:i,body:c,headers:d={}}={}){const p=await fetch(`${Ph}${t}`,{method:o,headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{},...d},body:c?JSON.stringify(c):void 0}),m=await p.json().catch(()=>({}));if(!p.ok){const y=new Error(m.error||`Falha na requisição (${p.status})`);throw y.status=p.status,y}return m}const Ye={login(t,o){return Fe("/api/auth/login",{method:"POST",body:{email:t,password:o}})},getMe(t){return Fe("/api/auth/me",{token:t})},logout(t){return t?Fe("/api/auth/logout",{method:"POST",token:t}).catch(()=>{}):Promise.resolve()},changePassword(t,{currentPassword:o,newPassword:i}){return Fe("/api/auth/change-password",{method:"POST",token:t,body:{current_password:o,new_password:i}})},getUsers(t){return Fe("/api/users",{token:t})},createUser(t,{name:o,email:i,password:c,role:d}){return Fe("/api/users",{method:"POST",token:t,body:{name:o,email:i,password:c,role:d}})},updateUser(t,o,i){return Fe(`/api/users/${o}`,{method:"PUT",token:t,body:i})},deleteUser(t,o){return Fe(`/api/users/${o}`,{method:"DELETE",token:t})},getAuditLogs(t){return Fe("/api/audit-logs",{token:t})},getInventoryChanges(t,{machineId:o,limit:i=120}={}){const c=new URLSearchParams;o&&c.set("machine_id",o),i&&c.set("limit",i);const d=c.toString();return Fe(`/api/inventory/changes${d?`?${d}`:""}`,{token:t})},async downloadAgentInstaller(t){const o=await fetch(`${Ph}/api/agent/download`,{method:"GET",headers:t?{Authorization:`Bearer ${t}`}:{}});if(!o.ok){const p=await o.json().catch(()=>({})),m=new Error(p.error||`Falha ao baixar instalador (${o.status})`);throw m.status=o.status,m}const i=await o.blob(),c=window.URL.createObjectURL(i),d=document.createElement("a");d.href=c,d.download="IpojucaRMM-Setup.exe",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>window.URL.revokeObjectURL(c),4e3)},revokeMachine(t,o,i=!0,c=""){return Fe(`/api/machines/${o}/revoke`,{method:"POST",token:t,body:{revoked:i,reason:c}})},getUnits(t){return Fe("/api/units",{token:t})},createUnit(t,o){return Fe("/api/units",{method:"POST",token:t,body:o})},updateUnit(t,o,i){return Fe(`/api/units/${o}`,{method:"PUT",token:t,body:i})},deleteUnit(t,o,i={}){const c=new URLSearchParams;i.target_unit_id&&c.set("target_unit_id",i.target_unit_id),i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Fe(`/api/units/${o}${d?`?${d}`:""}`,{method:"DELETE",token:t,body:i})},createSector(t,o,i){return Fe(`/api/units/${o}/sectors`,{method:"POST",token:t,body:i})},updateSector(t,o,i){return Fe(`/api/sectors/${o}`,{method:"PUT",token:t,body:i})},deleteSector(t,o,i={}){const c=new URLSearchParams;i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Fe(`/api/sectors/${o}${d?`?${d}`:""}`,{method:"DELETE",token:t,body:i})},getMachines(t,{unitId:o,status:i}={}){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("status",i);const d=c.toString();return Fe(`/api/machines${d?`?${d}`:""}`,{token:t})},getMachineDiagnostics(t,o){return Fe(`/api/machines/${o}/diagnostics`,{token:t})},refreshMachineTelemetryNow(t,o){return Fe(`/api/machines/${o}/refresh-telemetry`,{method:"POST",token:t})},deleteMachine(t,o){return Fe(`/api/machines/${o}`,{method:"DELETE",token:t})},getAgentVersionInfo(){return Fe("/api/agent/version")},updateMachineAgent(t,o){return Fe(`/api/machines/${o}/update-agent`,{method:"POST",token:t})},updateAllAgents(t){return Fe("/api/agent/update-all",{method:"POST",token:t})},getMachineMessages(t,o){return Fe(`/api/machines/${o}/messages`,{token:t})},sendMachineMessage(t,o,i){return Fe(`/api/machines/${o}/messages`,{method:"POST",token:t,body:{message:i}})},updateMachineLocation(t,o,{unitId:i,sectorId:c}){return Fe(`/api/machines/${o}/location`,{method:"POST",token:t,body:{unit_id:i,sector_id:c}})},getTaskCatalog(t){return Fe("/api/catalog/tasks",{token:t})},getApprovedPrinters(t,o,i){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("machine_id",i);const d=c.toString()?`?${c.toString()}`:"";return Fe(`/api/printers${d}`,{token:t})},dispatchAuthorizedTask(t,{machineId:o,taskCode:i,parameters:c,reason:d}){return Fe("/api/command",{method:"POST",token:t,body:{machine_id:o,task_code:i,parameters:c,reason:d}})},getAlerts(t){return Fe("/api/alerts",{token:t})},simulateAgentHeartbeat({agentUuid:t,agentToken:o,inventory:i,metrics:c}){return Fe("/api/heartbeat",{method:"POST",headers:{"X-Agent-Uuid":t,"X-Agent-Token":o},body:{agent_version:"1.0.0",inventory:i,metrics:c}})}};function Bx(t,o={}){const c=fl("/dashboard",{auth:{token:t},reconnection:!0});return o.onMachineUpdated&&c.on("machine:updated",o.onMachineUpdated),o.onMachineDeleted&&c.on("machine:deleted",o.onMachineDeleted),o.onAlertTriggered&&c.on("alert:triggered",o.onAlertTriggered),o.onTaskUpdated&&c.on("task:updated",o.onTaskUpdated),o.onAgentMessage&&c.on("agent:message",o.onAgentMessage),o.onUnitsUpdated&&c.on("units:updated",o.onUnitsUpdated),o.onConnect&&c.on("connect",o.onConnect),o.onDisconnect&&c.on("disconnect",o.onDisconnect),c}const Gn=480,vr=300,yo=3,Ux=30,yp=15,Hx=Gn/2,Vx=62,Cs=12,Ur=9,Fi=2.2,Ae={floorA:"#F2E4CC",floorB:"#E7D5B6",floorEdge:"#C9AE86",wallSouth:"#F0DFC4",wallEast:"#DCC7A6",wallCap:"#9C6B4A",rug:"#7FB069",rugBorder:"#F2C14E",woodTop:"#C98A4B",woodSouth:"#A96C33",deskTop:"#E0A458",deskSouth:"#BE8038",metal:"#B7C4CE",metalDark:"#7C8B96",plastic:"#F4F8FB",plasticDark:"#CBD6DE",paper:"#FFFDF7",plant:"#3E9B4F",plantDark:"#2C7A3B",pot:"#C4693F",glass:"#BFE6F5",glassFrame:"#6E8A96",ink:"#1F2933",inkSoft:"#52606D"},$n={NORMAL:"#12B76A",WARNING:"#F79009",CRITICAL:"#F04438",OFFLINE:"#98A2B3"},Wx={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"};function Es(t,o){const i=parseInt(t.slice(1),16),c=Math.max(0,Math.min(255,Math.round((i>>16&255)*o))),d=Math.max(0,Math.min(255,Math.round((i>>8&255)*o))),p=Math.max(0,Math.min(255,Math.round((i&255)*o)));return`#${(c<<16|d<<8|p).toString(16).padStart(6,"0")}`}function He(t,o,i=0){return{sx:Hx+(t-o)*(Ux/2),sy:Vx+(t+o)*(yp/2)-i*yp}}function Co(t,o,i){t.fillStyle=i,t.beginPath(),t.moveTo(Math.round(o[0].sx),Math.round(o[0].sy));for(let c=1;c<o.length;c+=1)t.lineTo(Math.round(o[c].sx),Math.round(o[c].sy));t.closePath(),t.fill()}function Gx(t,o,i,c,d){const p=He(o,i,c),m=He(o+1,i,c),y=He(o+1,i+1,c),g=He(o,i+1,c);Co(t,[p,m,y,g],d)}function zt(t,o,i,c,d,p,m,y){const g=Es(y,1),T=Es(y,.82),$=Es(y,.68);Co(t,[He(o,i+p,c+m),He(o+d,i+p,c+m),He(o+d,i+p,c),He(o,i+p,c)],T),Co(t,[He(o+d,i,c+m),He(o+d,i+p,c+m),He(o+d,i+p,c),He(o+d,i,c)],$),Co(t,[He(o,i,c+m),He(o+d,i,c+m),He(o+d,i+p,c+m),He(o,i+p,c+m)],g)}function dt(t,o,i,c,d,p,m){Co(t,[He(o,i,c),He(o+d,i,c),He(o+d,i+p,c),He(o,i+p,c)],m)}function qx(t){for(let o=0;o<Cs;o+=1)for(let i=0;i<Ur;i+=1){const c=(o+i)%2===0;Gx(t,o,i,0,c?Ae.floorA:Ae.floorB)}Co(t,[He(0,Ur,0),He(Cs,Ur,0),He(Cs,Ur,-.12),He(0,Ur,-.12)],Ae.floorEdge)}function Yx(t){zt(t,-.3,-.3,0,Cs+.6,.3,Fi,Ae.wallSouth),zt(t,-.3,0,0,.3,Ur,Fi,Ae.wallEast),dt(t,-.3,-.3,Fi,Cs+.6,.3,Ae.wallCap),dt(t,-.3,0,Fi,.3,Ur,Ae.wallCap);const o=4.2,i=.02;dt(t,o,i,1.05,2.6,.02,Ae.glassFrame),dt(t,o+.12,i+.01,1.15,2.36,.02,Ae.glass),dt(t,o+1.26,i+.01,1.15,.08,.02,Ae.glassFrame),dt(t,.02,6,0,.02,1.5,Ae.woodSouth),dt(t,.03,6.1,0,.02,1.3,Ae.woodTop),dt(t,.04,7.2,.95,.02,.12,"#D9B44A")}function Qx(t){dt(t,4.4,4.1,.015,3.4,2.2,Ae.rugBorder),dt(t,4.55,4.25,.02,3.1,1.9,Ae.rug)}function Kx(t){zt(t,7.4,6,0,3.6,.9,1.05,Ae.woodSouth),dt(t,7.35,5.95,1.05,3.7,1,Ae.woodTop),dt(t,7.45,6.05,1.07,3.5,.8,"#E7D9C3")}function Xx(t){zt(t,2.1,2.5,0,2.4,1.2,.82,Ae.deskSouth),dt(t,2.05,2.45,.82,2.5,1.3,Ae.deskTop)}function Jx(t){zt(t,5,2.2,0,2.2,1.1,.82,Ae.deskSouth),dt(t,4.95,2.15,.82,2.3,1.2,Ae.deskTop)}function Zx(t){zt(t,2.7,4,0,.9,.9,.45,Ae.metalDark),zt(t,2.7,4.75,.45,.9,.18,.55,Ae.metal)}function ey(t){zt(t,9.4,1.9,0,1.5,1.2,.62,Ae.metalDark),dt(t,9.35,1.85,.62,1.6,1.3,Ae.metal),zt(t,9.55,2.05,.62,1.15,.85,.55,Ae.plasticDark),dt(t,9.6,2.1,1.17,1.05,.3,Ae.plastic),dt(t,9.7,2.45,1.19,.85,.35,Ae.paper)}function ty(t){zt(t,.55,.9,0,.55,.55,.4,Ae.pot),zt(t,.62,.97,.4,.4,.4,.45,Ae.plantDark),zt(t,.7,1.05,.85,.24,.24,.3,Ae.plant)}const vc=[{x:2.95,y:2.85,label:"MESA 01",labelOffset:-2},{x:5.55,y:2.55,label:"MESA 02",labelOffset:-16},{x:8.15,y:6.25,label:"BALCÃO",labelOffset:-2}];function ny(t){return t?t.health_status==="OFFLINE"?t.last_seen_at?(Date.now()-new Date(t.last_seen_at).getTime())/1e3>=86400:!1:Number(t.idle_seconds||0)>=86400:!1}function ry(t,o,i,c,d,p){const m=(i==null?void 0:i.health_status)||"OFFLINE",y=$n[m]||$n.OFFLINE;zt(t,o.x,o.y,.82,.85,.3,.12,Ae.metalDark),zt(t,o.x+.34,o.y+.08,.94,.16,.12,.28,Ae.metal),zt(t,o.x-.02,o.y+.02,1.2,.9,.14,.62,Ae.plasticDark),dt(t,o.x+.04,o.y+.03,1.78,.78,.12,y),dt(t,o.x+.1,o.y+.05,1.79,.3,.06,Es(y,1.35)),dt(t,o.x+.05,o.y+.42,.84,.7,.28,Ae.plasticDark);const g=He(o.x+.86,o.y+.1,1.86);if(t.fillStyle=p||m!=="NORMAL"?y:Es(y,.6),t.fillRect(Math.round(g.sx)-1,Math.round(g.sy)-1,3,3),c||d){const T=He(o.x-.25,o.y-.25,.03),$=He(o.x+1.15,o.y-.25,.03),A=He(o.x+1.15,o.y+.85,.03),P=He(o.x-.25,o.y+.85,.03);t.strokeStyle=c?"#1F2937":"#52796B",t.lineWidth=c?1.4:1,t.beginPath(),t.moveTo(Math.round(T.sx),Math.round(T.sy)),t.lineTo(Math.round($.sx),Math.round($.sy)),t.lineTo(Math.round(A.sx),Math.round(A.sy)),t.lineTo(Math.round(P.sx),Math.round(P.sy)),t.closePath(),t.stroke()}}function oy(t,o,i,c,d=[]){const p=(i==null?void 0:i.health_status)||"OFFLINE",m=ny(i),y=He(o.x+.45,o.y+.2,2.15),g=(i==null?void 0:i.hostname)||"SEM AGENTE",T=m?`${g} !24h`:g;t.font='8px "Courier New", monospace';const $=Math.max(t.measureText(T).width+18,46),A=Math.round(y.sx-$/2);let P=Math.round(y.sy-13+(o.labelOffset||0));const z=K=>d.some(Y=>A<Y.x+Y.w&&A+$>Y.x&&K<Y.y+Y.h&&K+12>Y.y);let ne=0;for(;z(P)&&ne<8;)P+=14,ne+=1;const re={x:A,y:P,w:$,h:12};return d.push(re),t.fillStyle=c?"#1F2937":m?"#FEF2F2":"rgba(255,255,255,0.96)",t.fillRect(A,P,$,12),t.strokeStyle=c?"#1F2937":m?"#DC2626":"rgba(31,41,55,0.3)",t.lineWidth=1,t.strokeRect(A+.5,P+.5,$-1,11),t.fillStyle=m?"#DC2626":$n[p]||$n.OFFLINE,t.fillRect(A+4,P+4,4,4),t.fillStyle=c?"#FFFFFF":m?"#991B1B":Ae.ink,t.textBaseline="middle",t.fillText(T,A+11,P+6.5),re}function sy(t,o,i,c){if(!o)return;const d=o.health_status||"OFFLINE",p=$n[d]||$n.OFFLINE,m=16,y=236,g=74,T=c-g-18;t.fillStyle="rgba(255,255,255,0.96)",t.fillRect(m,T,y,g),t.strokeStyle="rgba(31,41,55,0.35)",t.lineWidth=1,t.strokeRect(m+.5,T+.5,y-1,g-1),t.fillStyle=p,t.fillRect(m,T,3,g),t.textBaseline="alphabetic",t.font='bold 11px "Courier New", monospace',t.fillStyle=Ae.ink,t.fillText(o.hostname||"SEM AGENTE",m+12,T+18),t.font='9px "Courier New", monospace',t.fillStyle=p,t.fillText(Wx[d]||d,m+12,T+32),t.fillStyle=Ae.inkSoft,t.fillText(`IP ${o.ip_address||"—"}`,m+12,T+45),t.fillText(`CPU ${Number(o.cpu_usage_pct??0).toFixed(0)}%   RAM ${Number(o.ram_usage_pct??0).toFixed(0)}%`,m+12,T+57);const $=Number(o.temperature_c)>0?`${Number(o.temperature_c).toFixed(0)}°C`:"N/D";t.fillText(`DISCO ${Number(o.disk_usage_pct??0).toFixed(0)}%   TEMP ${$}`,m+12,T+69)}const iy=N.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, #f7f4ec 0%, #e7e3d8 58%, #d8d4c7 100%);
  overflow: hidden;
  z-index: 0;
`,ly=N.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${({$dragging:t,$hover:o})=>t?"grabbing":o?"pointer":"grab"};
  image-rendering: auto;
`,ay=N.div`
  position: absolute;
  left: 18px;
  bottom: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 7px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(31, 41, 55, 0.14);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #3b3b3b;
  pointer-events: none;
`,Di=N.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: ${({$color:t})=>t};
  margin-right: 4px;
`,cy=N.div`
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 7px 11px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(31, 41, 55, 0.14);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: #3b3b3b;
  pointer-events: none;
`;function uy({activeUnit:t,machines:o=[],selectedMachine:i,selectedSector:c,onSelectMachine:d}){const p=I.useRef(null),m=I.useRef(null),y=I.useRef([]),g=I.useRef({active:!1,x:0,y:0,panX:0,panY:0}),[T,$]=I.useState({zoom:1.28,panX:0,panY:0}),[A,P]=I.useState(!1),[z,ne]=I.useState(null),[re,K]=I.useState(!0),Y=I.useMemo(()=>{const X=(o||[]).filter(te=>!(t!=null&&t.id)||Number(te.unit_id)===Number(t.id));return[...c!=null&&c.id?X.filter(te=>Number(te.sector_id)===Number(c.id)):X].sort((te,ee)=>Number(te.id)-Number(ee.id))},[o,t==null?void 0:t.id,c==null?void 0:c.id]),W=I.useMemo(()=>Y.map((X,he)=>({...vc[he]||{x:2.2+(he-vc.length)%4*2.1,y:5.2+Math.floor((he-vc.length)/4)*1.6,label:`POSTO ${String(he+1).padStart(2,"0")}`,labelOffset:-6},machine:X})),[Y]);I.useEffect(()=>{const X=setInterval(()=>K(he=>!he),700);return()=>clearInterval(X)},[]);const le=I.useCallback(()=>{const X=p.current;if(!X)return;if(!m.current){const G=document.createElement("canvas");G.width=Gn*yo,G.height=vr*yo,m.current=G}const he=m.current,te=he.getContext("2d");te.setTransform(yo,0,0,yo,0,0),te.imageSmoothingEnabled=!0,te.clearRect(0,0,Gn,vr),qx(te),Yx(te),Qx(te),Kx(te),Xx(te),Jx(te),Zx(te),ey(te),ty(te);const ee=[];W.forEach(G=>{if(!G.machine)return;const Ce=!!(i!=null&&i.id)&&i.id===G.machine.id,Te=!!z&&z===G.machine.id;ry(te,G,G.machine,Ce,Te,re);const xt=He(G.x+.45,G.y+.2,1.2);ee.push({id:G.machine.id,x:xt.sx-26,y:xt.sy-30,w:52,h:48})});const Se=[];W.forEach(G=>{if(!G.machine)return;const Ce=oy(te,G,G.machine,!!(i!=null&&i.id)&&i.id===G.machine.id,Se);Ce&&ee.push({id:G.machine.id,x:Ce.x-2,y:Ce.y-2,w:Ce.w+4,h:Ce.h+4})}),y.current=ee;const ae=window.devicePixelRatio||1,Oe=X.clientWidth||Gn,ke=X.clientHeight||vr,F=Math.round(Oe*ae),J=Math.round(ke*ae);(X.width!==F||X.height!==J)&&(X.width=F,X.height=J);const O=X.getContext("2d");O.imageSmoothingEnabled=!0,O.imageSmoothingQuality="high",O.setTransform(1,0,0,1,0,0),O.clearRect(0,0,F,J);const R=Math.min(Oe/Gn,ke/vr)*T.zoom*ae,Z=Gn*R,Q=vr*R,xe=(F-Z)/2+T.panX*ae,ge=(J-Q)/2+T.panY*ae;O.drawImage(he,0,0,Gn*yo,vr*yo,xe,ge,Z,Q),O.setTransform(ae,0,0,ae,0,0),O.imageSmoothingEnabled=!0,O.textBaseline="alphabetic",O.font='bold 11px "Courier New", monospace',O.fillStyle=Ae.ink;const ye=`${(t==null?void 0:t.code)||"USF"} // ${(c==null?void 0:c.name)||"VISÃO GERAL DA UNIDADE"}`;O.fillText(ye.toUpperCase(),16,26),O.font='9px "Courier New", monospace',O.fillStyle=Ae.inkSoft,O.fillText(`${Y.length} ESTAÇÃO(ÕES) • PIXEL ART • CANVAS 2D`,16,40),sy(O,i,Oe,ke)},[W,i,z,re,T,t==null?void 0:t.code,c==null?void 0:c.name,Y.length]);I.useEffect(()=>{le()},[le]),I.useEffect(()=>{const X=()=>le();return window.addEventListener("resize",X),()=>window.removeEventListener("resize",X)},[le]);const Ie=I.useCallback((X,he)=>{const te=p.current;if(!te)return null;const ee=te.getBoundingClientRect(),Se=ee.width,ae=ee.height,ke=Math.min(Se/Gn,ae/vr)*T.zoom,F=Gn*ke,J=vr*ke,O=(Se-F)/2+T.panX,b=(ae-J)/2+T.panY;return{x:(X-ee.left-O)/ke,y:(he-ee.top-b)/ke}},[T]),we=I.useCallback((X,he)=>{const te=Ie(X,he);if(!te)return null;const ee=y.current.find(Se=>te.x>=Se.x&&te.x<=Se.x+Se.w&&te.y>=Se.y&&te.y<=Se.y+Se.h);return(ee==null?void 0:ee.id)??null},[Ie]),pe=X=>{var he,te;g.current={active:!0,x:X.clientX,y:X.clientY,panX:T.panX,panY:T.panY,moved:!1},P(!0),(te=(he=X.currentTarget).setPointerCapture)==null||te.call(he,X.pointerId)},V=X=>{const he=g.current;if(he.active){const ee=X.clientX-he.x,Se=X.clientY-he.y;(Math.abs(ee)>3||Math.abs(Se)>3)&&(he.moved=!0),$(ae=>({...ae,panX:he.panX+ee,panY:he.panY+Se}));return}const te=we(X.clientX,X.clientY);ne(ee=>ee===te?ee:te)},de=X=>{const he=g.current;if(g.current={...he,active:!1},P(!1),he.moved)return;const te=we(X.clientX,X.clientY);if(te&&d){const ee=Y.find(Se=>Se.id===te);ee&&d(ee)}},Qe=I.useCallback(X=>{X.preventDefault();const he=X.deltaY<0?1.12:.89;$(te=>({...te,zoom:Math.min(4,Math.max(.6,te.zoom*he))}))},[]);return I.useEffect(()=>{const X=p.current;if(X)return X.addEventListener("wheel",Qe,{passive:!1}),()=>X.removeEventListener("wheel",Qe)},[Qe]),l.jsxs(iy,{children:[l.jsx(ly,{ref:p,$dragging:A,$hover:!!z,onPointerDown:pe,onPointerMove:V,onPointerUp:de,onPointerLeave:()=>{g.current={...g.current,active:!1},P(!1),ne(null)},onDoubleClick:()=>$({zoom:1.28,panX:0,panY:0}),title:z?"Clique para abrir o diagnóstico":"Arraste para mover • roda para zoom"}),l.jsxs(ay,{children:[l.jsxs("span",{children:[l.jsx(Di,{$color:$n.NORMAL}),"ONLINE"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:$n.WARNING}),"ATENÇÃO"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:$n.CRITICAL}),"CRÍTICO"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:$n.OFFLINE}),"OFFLINE"]})]}),l.jsx(cy,{children:"ARRASTE • RODA = ZOOM • DUPLO CLIQUE = CENTRALIZAR"})]})}function Ne({size:t=15,strokeWidth:o=1.65,children:i,...c}){return l.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:o,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...c,children:i})}function Gc({size:t=24}){return l.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[l.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"6",fill:"#2D6A4F"}),l.jsx("path",{d:"M7.5 12.25H10.2L11.55 8.5L13.35 15.5L14.7 12.25H16.75",stroke:"#FFFFFF",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}function vp(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M12 5v14M5 12h14"})})}function bp(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 20h9"}),l.jsx("path",{d:"M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"})]})}function qc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 6h18"}),l.jsx("path",{d:"M8 6V4h8v2"}),l.jsx("path",{d:"M19 6l-1 14H6L5 6"}),l.jsx("path",{d:"M10 11v6M14 11v6"})]})}function Bi(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}function bc(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M6 9l6 6 6-6"})})}function Mh(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M15 18l-6-6 6-6"})})}function wp(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M9 18l6-6-6-6"})})}function dy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 12a9 9 0 1 0 3-6.7L3 8"}),l.jsx("path",{d:"M3 3v5h5"})]})}function fy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3v12"}),l.jsx("path",{d:"M7 10l5 5 5-5"}),l.jsx("path",{d:"M5 20h14"})]})}function Oh(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 16V7"}),l.jsx("path",{d:"M8.5 10.5L12 7l3.5 3.5"}),l.jsx("path",{d:"M20 16.5A4.5 4.5 0 0 0 17.5 8h-1.26A6.5 6.5 0 1 0 4 14.5"})]})}function py(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),l.jsx("path",{d:"M16 17l5-5-5-5"}),l.jsx("path",{d:"M21 12H9"})]})}function hy(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("path",{d:"M20 20l-3.5-3.5"})]})}function my(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"7"}),l.jsx("path",{d:"M12 2v3M12 19v3M2 12h3M19 12h3"})]})}function Eo(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M6 9V3h12v6"}),l.jsx("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),l.jsx("rect",{x:"6",y:"14",width:"12",height:"7",rx:"1"})]})}function Yc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M21 12a9 9 0 0 0-15.5-6.3L3 8"}),l.jsx("path",{d:"M3 3v5h5"}),l.jsx("path",{d:"M3 12a9 9 0 0 0 15.5 6.3L21 16"}),l.jsx("path",{d:"M21 21v-5h-5"})]})}function gy(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M3 12h4l2.5-7 5 14 2.5-7h4"})})}function xy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M4 17l6-6-6-6"}),l.jsx("path",{d:"M12 19h8"})]})}function yy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M22 2L11 13"}),l.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]})}function gl(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),l.jsx("path",{d:"M12 9v4M12 17h.01"})]})}function vy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l9 4.5-9 4.5-9-4.5L12 3z"}),l.jsx("path",{d:"M3 12l9 4.5 9-4.5"}),l.jsx("path",{d:"M3 16.5L12 21l9-4.5"})]})}function by(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),l.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"currentColor",stroke:"none"})]})}function wy(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"}),l.jsx("path",{d:"M9 4v16"})]})}function Sy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"}),l.jsx("path",{d:"M12 12l8-4.5M12 12v9M12 12L4 7.5"})]})}function ky(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.2"})]})}function Cy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}function Ey(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"}),l.jsx("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"}),l.jsx("path",{d:"M14.12 14.12a3 3 0 1 1-4.24-4.24"}),l.jsx("path",{d:"M2 2l20 20"})]})}function jy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),l.jsx("path",{d:"M9 12l2 2 4-4"})]})}function wc(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),l.jsx("path",{d:"M8 21h8M12 17v4"})]})}function Ui(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),l.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})}function Vn(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M20 6L9 17l-5-5"})})}function _y(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),l.jsx("circle",{cx:"12",cy:"10",r:"3"})]})}function Qc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 2v10"}),l.jsx("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"})]})}function Ny(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M22 12H2"}),l.jsx("path",{d:"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}),l.jsx("circle",{cx:"6",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"}),l.jsx("circle",{cx:"10",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"})]})}function Ty(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M5 12.55a11 11 0 0 1 14.08 0"}),l.jsx("path",{d:"M8.53 16.11a6 6 0 0 1 6.95 0"}),l.jsx("circle",{cx:"12",cy:"19.5",r:"0.9",fill:"currentColor",stroke:"none"})]})}function Iy(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"2"}),l.jsx("rect",{x:"9.5",y:"9.5",width:"5",height:"5",rx:"0.5"}),l.jsx("path",{d:"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"})]})}function Ry(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"}),l.jsx("path",{d:"M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"})]})}function Sp(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 7v5l3 2"})]})}function $y(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"}),l.jsx("path",{d:"M9 4v14M15 6v14"})]})}function Ay(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"5",y:"4",width:"14",height:"17",rx:"2"}),l.jsx("path",{d:"M9 4V2.8A1 1 0 0 1 10 2h4a1 1 0 0 1 1 1V4"}),l.jsx("path",{d:"M9 10h6M9 14h6M9 18h4"})]})}function Py(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),l.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]})}function My(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}function Bv(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),l.jsx("circle",{cx:"9",cy:"7",r:"4"}),l.jsx("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),l.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function Uv(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"7.5",cy:"15.5",r:"4.5"}),l.jsx("path",{d:"M21 2l-9.6 9.6"}),l.jsx("path",{d:"M15.5 7.5l3 3L22 7l-3-3"})]})}function Hv(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M5.6 5.6l12.8 12.8"})]})}function Vv(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"4",y:"3",width:"16",height:"18",rx:"1.5"}),l.jsx("path",{d:"M9 21v-4h6v4"}),l.jsx("path",{d:"M8 7h1.5M14.5 7H16M8 11h1.5M14.5 11H16"})]})}const Oy=Sl`
  0% { stroke-dashoffset: 36; }
  100% { stroke-dashoffset: 0; }
`,Ly=N.div`
  min-height: 100vh;
  width: 100%;
  background: ${({theme:t})=>t.colors.bgCanvas};
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    background: ${({theme:t})=>t.colors.bgSurface};
  }
`,zy=N.section`
  background: ${({theme:t})=>t.colors.bgCanvas};
  padding: 36px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  min-width: 0;

  @media (max-width: 1180px) {
    padding: 32px 36px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`,Fy=N.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .brand-left {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .brand-name {
    font-size: 0.94rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.02em;
  }

  .brand-org {
    font-size: 0.78rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,Dy=N.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 620px;

  h1 {
    font-size: clamp(1.75rem, 2.35vw, 2.35rem);
    font-weight: 700;
    line-height: 1.16;
    letter-spacing: -0.03em;
    color: ${({theme:t})=>t.colors.textPrimary};

    .muted {
      color: ${({theme:t})=>t.colors.textSecondary};
      font-weight: 600;
    }
  }
`,By=N.div`
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: 14px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .topo-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .topo-proto {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.brandPrimary};
    background: ${({theme:t})=>t.colors.brandPrimarySubtle};
    padding: 3px 9px;
    border-radius: 999px;
  }
`,Uy=N.div`
  display: grid;
  grid-template-columns: 164px 1fr 196px;
  align-items: center;
  gap: 0;

  @media (max-width: 1120px) {
    grid-template-columns: 146px 1fr 172px;
  }
`,Hy=N.div`
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:t})=>t.colors.borderStrong};
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .hub-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${({theme:t})=>t.colors.brandPrimarySubtle};
    color: ${({theme:t})=>t.colors.brandPrimary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .hub-title {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .hub-sub {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,Vy=N.svg`
  width: 100%;
  height: 156px;
  display: block;

  .base-line {
    fill: none;
    stroke: rgba(30, 36, 32, 0.14);
    stroke-width: 1.5;
  }

  .pulse-line {
    fill: none;
    stroke: #2d6a4f;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 8 28;
    animation: ${Oy} 3.2s linear infinite;
  }
`,Wy=N.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Sc=N.div`
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: 8px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .ep-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
  }

  .ep-icon {
    color: ${({theme:t})=>t.colors.brandPrimary};
    display: inline-flex;
  }

  .ep-tag {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,Gy=N.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  .pillar {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .p-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .p-desc {
    font-size: 0.78rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.45;
  }
`,qy=N.main`
  background: ${({theme:t})=>t.colors.bgSurface};
  border-left: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: 960px) {
    border-left: none;
    padding: 24px 20px 28px;
  }
`,Yy=N.header`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};

    .m-title {
      font-size: 0.94rem;
      font-weight: 700;
      color: ${({theme:t})=>t.colors.textPrimary};
      letter-spacing: -0.02em;
    }

    .m-sub {
      font-size: 0.74rem;
      color: ${({theme:t})=>t.colors.textSecondary};
    }
  }
`,Qy=N.div`
  width: 100%;
  max-width: 380px;
  margin: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`,Ky=N.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    font-size: 1.48rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  p {
    font-size: 0.9rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.5;
  }
`,Xy=N.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,kp=N.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.84rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  .input-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    height: 44px;
    padding: ${({$hasToggle:t})=>t?"0 44px 0 13px":"0 13px"};
    border-radius: 8px;
    border: 1px solid ${({theme:t})=>t.colors.borderStrong};
    background: ${({theme:t})=>t.colors.bgSurface};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.95rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;

    &::placeholder {
      color: ${({theme:t})=>t.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:t})=>t.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.14);
    }

    &:disabled {
      background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
      color: ${({theme:t})=>t.colors.textSecondary};
    }
  }

  .pw-toggle {
    position: absolute;
    right: 4px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: ${({theme:t})=>t.colors.textSecondary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;

    &:hover {
      background: ${({theme:t})=>t.colors.bgSurfaceHover};
      color: ${({theme:t})=>t.colors.textPrimary};
    }
  }
`,Jy=N.button`
  margin-top: 4px;
  height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  border: none;
  background: ${({theme:t})=>t.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`,Zy=N.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 13px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid ${({theme:t})=>t.colors.status.CRITICAL};
  background: rgba(200, 30, 30, 0.06);
  color: #991b1b;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.45;

  .err-icon {
    flex-shrink: 0;
    margin-top: 2px;
    display: inline-flex;
  }
`;N.div`
  padding: 12px 14px;
  border-radius: 8px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px dashed ${({theme:t})=>t.colors.borderStrong};
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  button {
    align-self: flex-start;
    height: 32px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid ${({theme:t})=>t.colors.borderStrong};
    background: ${({theme:t})=>t.colors.bgSurface};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({theme:t})=>t.colors.bgSurfaceHover};
    }
  }
`;const e1=N.footer`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding-top: 16px;
  border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .health-row {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .health-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
  }

  .audit-line {
    font-size: 0.74rem;
    color: ${({theme:t})=>t.colors.textMuted};
    line-height: 1.48;
  }
`;function t1({onAuthenticated:t,sessionNotice:o=""}){const[i,c]=I.useState(""),[d,p]=I.useState(""),[m,y]=I.useState(!1),[g,T]=I.useState(!1),[$,A]=I.useState(""),[P,z]=I.useState("checking"),ne=!1;I.useEffect(()=>{let Y=!0;const W=new AbortController;return fetch("/api/health",{signal:W.signal}).then(le=>le.ok?le.json():Promise.reject(new Error("HTTP"))).then(le=>{Y&&z((le==null?void 0:le.status)==="ok"?"ok":"down")}).catch(()=>{Y&&z("down")}),()=>{Y=!1,W.abort()}},[]);async function re(Y){Y.preventDefault(),A("");const W=i.trim();if(!W||!d){A("Informe seu e-mail e senha para continuar.");return}T(!0);try{await t(W,d)}catch(le){A((le==null?void 0:le.message)||"Não foi possível autenticar. Verifique e-mail e senha.")}finally{T(!1)}}const K=P==="ok"?{color:"#2D6A4F",label:"Serviço Pulso RMM operacional"}:P==="down"?{color:"#C81E1E",label:"Servidor de API indisponível no momento"}:{color:"#7B857F",label:"Verificando disponibilidade da API..."};return l.jsxs(Ly,{children:[l.jsxs(zy,{"aria-label":"Visão geral do Pulso RMM",children:[l.jsxs(Fy,{children:[l.jsxs("div",{className:"brand-left",children:[l.jsx(Gc,{size:28}),l.jsx("span",{className:"brand-name",children:"Pulso RMM"})]}),l.jsx("span",{className:"brand-org",children:"Monitoramento & Gestão de Estações"})]}),l.jsxs(Dy,{children:[l.jsxs("h1",{children:["Monitoramento de estações em tempo real."," ",l.jsx("span",{className:"muted",children:"Inventário, telemetria e suporte remoto."})]}),l.jsxs(By,{role:"img","aria-label":"Esquema da arquitetura de telemetria entre a central Pulso RMM e estações monitoradas",children:[l.jsxs("div",{className:"topo-head",children:[l.jsx("span",{children:"Arquitetura de comunicação autenticada"}),l.jsx("span",{className:"topo-proto",children:"HMAC-SHA256 · OTA"})]}),l.jsxs(Uy,{children:[l.jsxs(Hy,{children:[l.jsx("span",{className:"hub-icon",children:l.jsx(jy,{size:17})}),l.jsx("div",{className:"hub-title",children:"Central TI"}),l.jsx("div",{className:"hub-sub",children:"API · Socket.io"})]}),l.jsxs(Vy,{viewBox:"0 0 180 156",preserveAspectRatio:"none","aria-hidden":"true",children:[l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"base-line",d:"M 0 78 L 180 78"}),l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 130, 180 130"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 L 180 78",style:{animationDelay:"0.9s"}}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 130, 180 130",style:{animationDelay:"1.8s"}})]}),l.jsxs(Wy,{children:[l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Recepção"})]}),l.jsx("span",{className:"ep-tag",children:"REC"})]}),l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Consultórios"})]}),l.jsx("span",{className:"ep-tag",children:"CONS"})]}),l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Farmácia"})]}),l.jsx("span",{className:"ep-tag",children:"FARM"})]})]})]})]})]}),l.jsxs(Gy,{children:[l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Telemetria contínua"}),l.jsx("span",{className:"p-desc",children:"Agente Windows nativo em segundo plano sem interromper o atendimento."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Manutenção homologada"}),l.jsx("span",{className:"p-desc",children:"Catálogo de tarefas assinadas por estação e atualizações SHA-256."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Auditoria e LGPD"}),l.jsx("span",{className:"p-desc",children:"Controle por perfil técnico com registro completo das operações."})]})]})]}),l.jsxs(qy,{"aria-label":"Autenticação do painel Pulso RMM",children:[l.jsxs(Yy,{children:[l.jsx(Gc,{size:28}),l.jsxs("div",{children:[l.jsx("div",{className:"m-title",children:"Pulso RMM"}),l.jsx("div",{className:"m-sub",children:"Monitoramento & Gestão de Estações"})]})]}),l.jsxs(Qy,{children:[l.jsxs(Ky,{children:[l.jsx("h2",{children:"Entrar no painel"}),l.jsx("p",{children:"Use sua conta autorizada pela equipe de TI."})]}),($||o)&&l.jsxs(Zy,{role:"alert",children:[l.jsx("span",{className:"err-icon",children:l.jsx(gl,{size:16})}),l.jsx("span",{children:$||o})]}),l.jsxs(Xy,{onSubmit:re,noValidate:!0,children:[l.jsxs(kp,{children:[l.jsx("label",{htmlFor:"rmm-login-email",children:"E-mail"}),l.jsx("div",{className:"input-box",children:l.jsx("input",{id:"rmm-login-email",type:"email",autoComplete:"username",placeholder:"nome@dominio.com",value:i,onChange:Y=>c(Y.target.value),disabled:g,required:!0})})]}),l.jsxs(kp,{$hasToggle:!0,children:[l.jsx("label",{htmlFor:"rmm-login-password",children:"Senha"}),l.jsxs("div",{className:"input-box",children:[l.jsx("input",{id:"rmm-login-password",type:m?"text":"password",autoComplete:"current-password",placeholder:"Digite sua senha",value:d,onChange:Y=>p(Y.target.value),disabled:g,required:!0}),l.jsx("button",{type:"button",className:"pw-toggle",onClick:()=>y(Y=>!Y),"aria-label":m?"Ocultar senha":"Exibir senha","aria-pressed":m,disabled:g,children:m?l.jsx(Ey,{size:17}):l.jsx(Cy,{size:17})})]})]}),l.jsx(Jy,{type:"submit",disabled:g,children:g?"Validando credenciais...":"Entrar no painel"})]}),ne]}),l.jsxs(e1,{children:[l.jsxs("div",{className:"health-row",children:[l.jsx("span",{className:"health-dot",style:{background:K.color}}),l.jsx("span",{children:K.label})]}),l.jsx("p",{className:"audit-line",children:"Sessões, comandos remotos e alterações de infraestrutura são registrados em trilha de auditoria conforme a LGPD."})]})]})]})}const n1={B:{id:"B",name:"Institucional Sereno",tagline:"Porcelanato claro, azul institucional e verde vivo",swatches:["#F6F8F3","#CFE3DC","#2E8B74","#1F5F8B"],room:{wallColor:"#F6F8F3",wallCapColor:"#2E6B7A",baseboardColor:"#2C5F73",accentColor:"#E4A11B",floorType:"porcelain",rugColor:"#6FA88F",rugBorderColor:"#EAF2EC",hasRug:!1,rugSize:[2.4,1.5],rugPos:[.5,0,-.2]},lighting:{background:"#E9F0EA",ambient:{intensity:.42,color:"#FFFFFF"},hemisphere:{sky:"#F7FBFF",ground:"#D6E4DC",intensity:.34},key:{intensity:2.15,color:"#FFF6E6"},fill:{intensity:.26,color:"#DCEBF2"}}}};function r1(){return n1.B}const Cp=[{id:"DIAG",label:"Diagnóstico"},{id:"MAINT",label:"Manutenção"},{id:"SYSTEM",label:"Sistema e periféricos"}],o1={SYNC_TELEMETRY_NOW:{group:"DIAG",label:"Coletar telemetria",subtitle:"Atualiza CPU, RAM, disco e temperatura",Icon:gy},COLLECT_NETWORK_DIAG:{group:"DIAG",label:"Diagnóstico de rede",subtitle:"IPv4, gateway, DNS e latência local",Icon:Ty},CHECK_DISK_HEALTH:{group:"DIAG",label:"Saúde do disco",subtitle:"Integridade física SMART e volume C:",Icon:Ny},LIST_TOP_PROCESSES:{group:"DIAG",label:"Top processos",subtitle:"Processos com maior uso de CPU e RAM",Icon:Iy},RESTART_SPOOLER:{group:"MAINT",label:"Reiniciar spooler",subtitle:"Destrava o serviço e a fila de impressão",Icon:Eo},CLEAR_TEMP_CACHE:{group:"MAINT",label:"Limpar temporários",subtitle:"Remove cache obsoleto sem tocar arquivos",Icon:Ry},FLUSH_DNS_WINSOCK:{group:"MAINT",label:"Limpar cache DNS",subtitle:"Renova a tabela de resolução de nomes",Icon:Yc},UPDATE_AGENT:{group:"SYSTEM",label:"Atualizar agente (OTA)",subtitle:"Baixa, valida SHA-256 e atualiza em silêncio",Icon:Oh},INSTALL_APPROVED_PRINTER:{group:"SYSTEM",label:"Instalar impressora",subtitle:"Mapeia impressora de rede homologada",Icon:Eo},REBOOT_WORKSTATION:{group:"SYSTEM",label:"Reiniciar estação",subtitle:"Aviso de 30s na tela antes de reiniciar",Icon:Qc}};function hs(t){const o=o1[t==null?void 0:t.code];return o||{group:(t==null?void 0:t.riskLevel)==="HIGH"?"SYSTEM":"MAINT",label:me((t==null?void 0:t.title)||(t==null?void 0:t.code)||"Tarefa remota"),subtitle:me((t==null?void 0:t.description)||"Comando remoto homologado"),Icon:xy}}const s1=Sl`
  from { opacity: 0; }
  to { opacity: 1; }
`,i1=Sl`
  from { opacity: 0; transform: translateY(8px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`,pu=Sl`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
`,l1={NORMAL:"Online",WARNING:"Atenção",CRITICAL:"Crítico",OFFLINE:"Offline"};function Ep(t){const o=String(t||"2.3.0").trim(),i=o.match(/(\d+\.\d+(?:\.\d+)?)/);return i?`v${i[1]}`:`v${o}`}function Hi(t,o=80,i=92){return t>=i?ie.colors.status.CRITICAL:t>=o?ie.colors.status.WARNING:ie.colors.textPrimary}function Vi(t,o=80,i=92,c=ie.colors.brandPrimary){return t>=i?ie.colors.status.CRITICAL:t>=o?ie.colors.status.WARNING:c}const jp=N.aside`
  width: ${({$collapsed:t})=>t?"296px":"436px"};
  max-height: 100%;
  min-height: 0;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  box-shadow: ${({theme:t})=>t.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  transition: width 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (max-width: 1120px) {
    width: ${({$collapsed:t})=>t?"268px":"384px"};
  }
`,_p=N.header`
  flex-shrink: 0;
  padding: 11px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,a1=N.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`,c1=N.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`,Np=N.span`
  font-family: ${({theme:t})=>t.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.textSecondary};
  white-space: nowrap;
`,Tp=N.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({$color:t})=>t};
  background: ${({$bgColor:t})=>t||"rgba(30, 36, 32, 0.06)"};
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`,u1=N.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
`,Dr=N.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({$danger:t,$active:o,theme:i})=>t?i.colors.status.CRITICAL:o?i.colors.brandPrimary:i.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({$danger:t,theme:o})=>t?"rgba(200, 30, 30, 0.08)":o.colors.bgSurfaceHover};
    color: ${({$danger:t,theme:o})=>t?o.colors.status.CRITICAL:o.colors.textPrimary};
  }

  &:active {
    transform: scale(0.95);
  }
`,Ip=N.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({theme:t})=>t.colors.textPrimary};
  line-height: 1.18;
  word-break: break-word;
`,Rp=N.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;

  .loc-text {
    font-size: 0.78rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,d1=N.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 5px;
  border: 1px solid
    ${({$open:t,theme:o})=>t?"rgba(45, 106, 79, 0.3)":o.colors.borderSubtle};
  background: ${({$open:t,theme:o})=>t?o.colors.brandPrimarySubtle:"transparent"};
  color: ${({$open:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
    color: ${({theme:t})=>t.colors.textPrimary};
    border-color: ${({theme:t})=>t.colors.borderStrong};
  }
`,f1=N.select`
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border-radius: 7px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  color: ${({theme:t})=>t.colors.textPrimary};
  border: 1px solid ${({theme:t})=>t.colors.borderStrong};
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({theme:t})=>t.colors.brandPrimary};
    background: ${({theme:t})=>t.colors.bgSurface};
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
  }
`,p1=N.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 9px;
  border-radius: 7px;
  background: ${({$bg:t})=>t};
  font-size: 0.73rem;

  .act-left {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: ${({theme:t})=>t.colors.textPrimary};
    font-weight: 600;
  }

  .act-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$color:t})=>t};
    flex-shrink: 0;
  }

  .act-headline {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-right {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({$color:t})=>t};
    white-space: nowrap;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`,h1=N.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 16px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
`,kc=N.button`
  position: relative;
  height: 34px;
  padding: 0 2px;
  border: none;
  background: transparent;
  color: ${({$active:t,theme:o})=>t?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.78rem;
  font-weight: ${({$active:t})=>t?700:500};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:"transparent"};
    transition: background 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .tab-count {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$active:t,$highlight:o})=>t||o?"rgba(45, 106, 79, 0.11)":"rgba(30, 36, 32, 0.06)"};
    color: ${({$active:t,$highlight:o,theme:i})=>t||o?i.colors.brandPrimary:i.colors.textSecondary};
  }
`,m1=N.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Cc=N.footer`
  flex-shrink: 0;
  padding: 8px 16px 10px;
  border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
`,g1=N.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-bottom: 9px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,Wi=N.div`
  padding: 0 10px;
  border-right: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
    padding-right: 0;
  }

  .m-lbl {
    font-size: 0.69rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .m-val {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.06rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({$tone:t})=>t};
    line-height: 1.15;
  }

  .m-track {
    height: 3px;
    background: rgba(30, 36, 32, 0.08);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 2px;

    i {
      display: block;
      height: 100%;
      border-radius: 2px;
      transition: width 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  }
`,x1=N.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  .spark-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .spark-legend {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.66rem;
    color: ${({theme:t})=>t.colors.textSecondary};

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    i {
      width: 8px;
      height: 2.5px;
      border-radius: 2px;
      display: inline-block;
    }
  }

  .spark-empty {
    font-size: 0.74rem;
    color: ${({theme:t})=>t.colors.textMuted};
  }
`,y1=N.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`,br=N.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  dt {
    font-size: 0.74rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    text-align: right;
    word-break: break-word;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;

    &.mono {
      font-family: ${({theme:t})=>t.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.74rem;
    }
  }
`,Ec=N.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  margin: -2px -5px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: ${({$copied:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textPrimary};
  font-family: ${({theme:t})=>t.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .copy-ico {
    display: inline-flex;
    color: ${({$copied:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textMuted};
    opacity: ${({$copied:t})=>t?1:.6};
    transition: opacity 150ms ease, color 150ms ease;
  }

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  }

  &:hover .copy-ico {
    opacity: 1;
    color: ${({theme:t})=>t.colors.brandPrimary};
  }
`,v1=N.div`
  font-size: 0.74rem;
  color: ${({theme:t})=>t.colors.textSecondary};
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px dashed ${({theme:t})=>t.colors.borderStrong};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  line-height: 1.42;

  strong {
    color: ${({theme:t})=>t.colors.textPrimary};
  }
`,b1=N.button`
  width: 100%;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  background: ${({theme:t})=>t.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${({disabled:t})=>t?"wait":"pointer"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    opacity: 0.55;
  }
`,w1=N.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.textPrimary};

  .lead-meta {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,S1=N.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`,$p=N.button`
  height: 25px;
  padding: 0 9px;
  border-radius: 6px;
  border: 1px solid
    ${({$active:t,theme:o})=>t?"rgba(45, 106, 79, 0.28)":o.colors.borderSubtle};
  background: ${({$active:t,theme:o})=>t?o.colors.brandPrimarySubtle:o.colors.bgSurface};
  color: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: ${({$active:t})=>t?700:500};
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;

  &:hover {
    color: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textPrimary};
    border-color: ${({$active:t,theme:o})=>t?"rgba(45, 106, 79, 0.35)":o.colors.borderStrong};
  }
`,k1=N.section`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,C1=N.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 2px 4px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  font-size: 0.69rem;
  font-weight: 700;
  color: ${({theme:t})=>t.colors.textSecondary};

  .grp-count {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.65rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textMuted};
  }
`,E1=N.div`
  display: flex;
  flex-direction: column;
`,j1=N.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  margin: 0 -2px;
  border: 1px solid transparent;
  border-bottom-color: rgba(30, 36, 32, 0.055);
  border-radius: 8px;
  background: transparent;
  text-align: left;
  color: ${({disabled:t,theme:o})=>t?o.colors.textMuted:o.colors.textPrimary};
  cursor: ${({disabled:t})=>t?"not-allowed":"pointer"};
  opacity: ${({disabled:t})=>t?.56:1};
  transition: background 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    border-bottom-color: transparent;
  }

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    border-color: ${({theme:t})=>t.colors.borderSubtle};
  }

  &:hover:not(:disabled) .act-ico {
    background: ${({$risk:t,theme:o})=>t==="HIGH"?"rgba(200, 30, 30, 0.12)":t==="MEDIUM"?"rgba(180, 83, 9, 0.12)":o.colors.brandPrimarySubtle};
    color: ${({$risk:t,theme:o})=>t==="HIGH"?o.colors.status.CRITICAL:t==="MEDIUM"?o.colors.status.WARNING:o.colors.brandPrimary};
  }

  &:hover:not(:disabled) .act-chev {
    color: ${({theme:t})=>t.colors.brandPrimary};
    transform: translateX(2px);
  }

  &:active:not(:disabled) {
    transform: scale(0.992);
  }

  .act-ico {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({$risk:t,theme:o})=>t==="HIGH"?"rgba(200, 30, 30, 0.07)":t==="MEDIUM"?"rgba(180, 83, 9, 0.07)":o.colors.bgSurfaceSubtle};
    color: ${({$risk:t,theme:o})=>t==="HIGH"?o.colors.status.CRITICAL:t==="MEDIUM"?o.colors.status.WARNING:o.colors.textSecondary};
    transition: background 140ms ease, color 140ms ease;
  }

  .act-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .act-title {
    font-size: 0.79rem;
    font-weight: 600;
    line-height: 1.25;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-sub {
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-trail {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .act-risk-pill {
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.65rem;
    font-weight: 600;
    background: ${({$risk:t})=>t==="HIGH"?"rgba(200, 30, 30, 0.08)":"rgba(180, 83, 9, 0.09)"};
    color: ${({$risk:t,theme:o})=>t==="HIGH"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  }

  .act-locked {
    font-size: 0.66rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textMuted};
  }

  .act-busy {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.brandPrimary};

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      animation: ${pu} 1.1s ease-in-out infinite;
    }
  }

  .act-chev {
    color: ${({theme:t})=>t.colors.textMuted};
    display: inline-flex;
    transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1), color 150ms ease;
  }
`,_1=N.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .le-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .le-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${({$tone:t})=>t};
    animation: ${({$pulsing:t})=>t?pu:"none"} 1.2s ease-in-out infinite;
  }

  .le-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .le-title {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-meta {
    font-size: 0.68rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-btn {
    height: 28px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid ${({theme:t})=>t.colors.borderStrong};
    background: ${({theme:t})=>t.colors.bgSurface};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.72rem;
    font-weight: 600;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease;

    &:hover {
      background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
      border-color: ${({theme:t})=>t.colors.brandPrimary};
      color: ${({theme:t})=>t.colors.brandPrimary};
    }
  }
`,N1=N.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
`,T1=N.div`
  margin: auto 0;
  padding: 20px 12px;
  text-align: center;
  color: ${({theme:t})=>t.colors.textSecondary};
  font-size: 0.8rem;
  line-height: 1.5;

  strong {
    display: block;
    color: ${({theme:t})=>t.colors.textPrimary};
    margin-bottom: 4px;
    font-size: 0.84rem;
  }
`,I1=N.div`
  display: flex;
  flex-direction: column;
  align-items: ${({$fromTi:t})=>t?"flex-end":"flex-start"};
`,R1=N.div`
  max-width: 86%;
  padding: 8px 11px;
  border-radius: ${({$fromTi:t})=>t?"11px 11px 3px 11px":"11px 11px 11px 3px"};
  background: ${({$fromTi:t})=>t?"#E9F4EE":"#F3F5F2"};
  border: 1px solid
    ${({$fromTi:t})=>t?"rgba(45, 106, 79, 0.16)":"rgba(30, 36, 32, 0.08)"};
  font-size: 0.8rem;
  line-height: 1.44;
  color: ${({theme:t})=>t.colors.textPrimary};
  word-break: break-word;

  .cb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 3px;
  }

  .cb-sender {
    font-size: 0.7rem;
    font-weight: 700;
    color: ${({$fromTi:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textPrimary};
  }

  .cb-time {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.64rem;
    color: ${({theme:t})=>t.colors.textMuted};
  }
`,$1=N.form`
  display: flex;
  gap: 6px;

  input {
    flex: 1;
    height: 36px;
    padding: 0 11px;
    border-radius: 8px;
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    border: 1px solid ${({theme:t})=>t.colors.borderStrong};
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.8rem;
    transition: border-color 140ms ease, background 140ms ease;

    &::placeholder {
      color: ${({theme:t})=>t.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:t})=>t.colors.brandPrimary};
      background: ${({theme:t})=>t.colors.bgSurface};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  button {
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: none;
    background: ${({theme:t})=>t.colors.brandPrimary};
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

    &:hover:not(:disabled) {
      background: ${({theme:t})=>t.colors.brandPrimaryHover};
    }

    &:active:not(:disabled) {
      transform: scale(0.985);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
`,Gi=N.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(30, 36, 32, 0.44);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
  animation: ${s1} 160ms ease-out;
`,qi=N.div`
  width: 100%;
  max-width: 520px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: 14px;
  padding: 20px 22px 18px;
  box-shadow: 0 20px 44px -12px rgba(24, 32, 27, 0.22), 0 4px 12px rgba(24, 32, 27, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({theme:t})=>t.colors.textPrimary};
  animation: ${i1} 190ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,Yi=N.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  .mh-left {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    min-width: 0;
  }

  .mh-copy {
    min-width: 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({theme:t})=>t.colors.textPrimary};
    line-height: 1.25;
  }

  .m-sub {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 0.74rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 3px;

    .m-mono {
      font-family: ${({theme:t})=>t.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.71rem;
    }
  }

  .mh-right {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`,Qi=N.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({$tone:t,theme:o})=>t==="danger"?"rgba(200, 30, 30, 0.09)":t==="warning"?"rgba(180, 83, 9, 0.1)":o.colors.brandPrimarySubtle};
  color: ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:t==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
`,A1=N.ol`
  list-style: none;
  margin: 0;
  padding: 9px 12px;
  border-radius: 9px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`,jc=N.li`
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;

  .st-mark {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.65rem;
    font-weight: 700;
    background: ${({$state:t,theme:o})=>t==="done"?o.colors.brandPrimary:t==="error"?o.colors.status.CRITICAL:t==="active"?"rgba(45, 106, 79, 0.15)":"rgba(30, 36, 32, 0.08)"};
    color: ${({$state:t,theme:o})=>t==="done"||t==="error"?"#FFFFFF":t==="active"?o.colors.brandPrimary:o.colors.textMuted};
    animation: ${({$state:t})=>t==="active"?pu:"none"} 1.25s ease-in-out infinite;
  }

  .st-lbl {
    font-size: 0.72rem;
    font-weight: ${({$state:t})=>t==="pending"?500:600};
    color: ${({$state:t,theme:o})=>t==="error"?o.colors.status.CRITICAL:t==="pending"?o.colors.textMuted:o.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Ap=N.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px 12px;
  border-radius: 9px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  .ts-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 10px;
    border-right: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    min-width: 0;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      border-right: none;
      padding-right: 0;
    }
  }

  .ts-k {
    font-size: 0.67rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .ts-v {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.77rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Pp=N.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 9px;
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-left: 3px solid
    ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:t==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
  background: ${({$tone:t,theme:o})=>t==="danger"?"rgba(200, 30, 30, 0.05)":t==="warning"?"rgba(180, 83, 9, 0.06)":o.colors.bgSurfaceSubtle};

  .on-ico {
    margin-top: 1px;
    flex-shrink: 0;
    color: ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:t==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
  }

  .on-body {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .on-lead {
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  .on-msg {
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${({theme:t})=>t.colors.textSecondary};
    word-break: break-word;
  }
`,P1=N.dl`
  margin: 0;
  padding: 4px 14px;
  border-radius: 9px;
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  max-height: 260px;
  overflow-y: auto;
`,M1=N.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 14px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);

  &:last-child {
    border-bottom: none;
  }

  dt {
    font-size: 0.74rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    text-align: right;
    word-break: break-word;
  }
`,O1=N.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 260px;
  overflow-y: auto;
`,L1=N.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid
    ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:o.colors.borderSubtle};
  background: ${({$selected:t,theme:o})=>t?"rgba(45, 106, 79, 0.06)":o.colors.bgSurface};
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;

  &:hover {
    border-color: ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:o.colors.borderStrong};
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .pr-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .pr-ico {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({$selected:t,theme:o})=>t?o.colors.brandPrimarySubtle:o.colors.bgSurfaceSubtle};
    color: ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textSecondary};
  }

  .pr-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .pr-name {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.81rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  .pr-tag {
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 0.64rem;
    font-weight: 600;
    background: ${({$source:t})=>t==="NETWORK"?"rgba(29, 78, 216, 0.09)":t==="INSTALLED"?"rgba(45, 106, 79, 0.1)":"rgba(180, 83, 9, 0.1)"};
    color: ${({$source:t})=>t==="NETWORK"?"#1D4ED8":t==="INSTALLED"?"#2D6A4F":"#92400E"};
  }

  .pr-ip {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .pr-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid
      ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:o.colors.borderStrong};
    background: ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:"transparent"};
    color: #ffffff;
  }
`,_c=N.div`
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid
    ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  background: ${({$tone:t})=>t==="danger"?"rgba(200, 30, 30, 0.06)":"rgba(180, 83, 9, 0.07)"};
  color: ${({$tone:t})=>t==="danger"?"#991B1B":"#92400E"};
  font-size: 0.79rem;
  line-height: 1.48;
`,Ki=N.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  .mf-left,
  .mf-right {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`,Wn=N.button`
  height: 35px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 0.79rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: ${({disabled:t})=>t?"not-allowed":"pointer"};
  border: 1px solid
    ${({$variant:t,theme:o})=>t==="primary"?o.colors.brandPrimary:t==="danger"?o.colors.status.CRITICAL:t==="ghost"?"transparent":o.colors.borderStrong};
  background: ${({$variant:t,theme:o})=>t==="primary"?o.colors.brandPrimary:t==="danger"?o.colors.status.CRITICAL:t==="ghost"?"transparent":o.colors.bgSurface};
  color: ${({$variant:t,$copied:o,theme:i})=>t==="primary"||t==="danger"?"#FFFFFF":o?i.colors.brandPrimary:i.colors.textPrimary};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms ease,
    color 150ms ease,
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({$variant:t,theme:o})=>t==="primary"?o.colors.brandPrimaryHover:t==="danger"?"#B41A1A":o.colors.bgSurfaceSubtle};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.45;
  }
`;function ms(t,o=!0){const i=Math.max(0,Math.floor(Number(t||0)));if(i<60)return`${i}s`;const c=Math.floor(i/60),d=i%60;if(c<60)return o&&d>0?`${c}m ${d}s`:`${c} min`;const p=Math.floor(c/60),m=c%60;if(p<24)return m>0?`${p}h ${m}m`:`${p}h`;const y=Math.floor(p/24),g=p%24;return g>0?`${y}d ${g}h`:`${y} dia(s)`}function z1(t){const o=me(t||"").trim();if(!o)return{structured:!1,items:[],message:""};const i=o.split("|").map(p=>p.trim()).filter(Boolean),c=[];let d=i.length>=2;for(const p of i){const m=p.indexOf(":");m>0&&m<36&&m<p.length-1?c.push({label:p.slice(0,m).trim(),value:p.slice(m+1).trim()}):d=!1}return d&&c.length>=2?{structured:!0,items:c,message:o}:{structured:!1,items:[],message:o}}function Mp(t){return t==="FAILED"?{label:"Falha",tone:"danger",color:ie.colors.status.CRITICAL,bg:ie.colors.statusBg.CRITICAL,lead:"A tarefa retornou erro durante a execução"}:t==="EXPIRED"?{label:"Expirado",tone:"danger",color:ie.colors.status.CRITICAL,bg:ie.colors.statusBg.CRITICAL,lead:"Tempo limite atingido sem resposta do agente"}:t==="RUNNING"?{label:"Executando",tone:"brand",color:ie.colors.brandPrimary,bg:"rgba(45, 106, 79, 0.1)",lead:"Enviando ordem assinada ao agente Windows"}:t==="DISPATCHED"||t==="PENDING"?{label:"Na fila do agente",tone:"warning",color:ie.colors.status.WARNING,bg:ie.colors.statusBg.WARNING,lead:"Aguardando retorno real do equipamento"}:{label:"Concluído",tone:"ok",color:ie.colors.status.NORMAL,bg:ie.colors.statusBg.NORMAL,lead:"Execução concluída com sucesso"}}function F1({telemetryHistory:t=[]}){const o=Array.isArray(t)&&t.length>=2,{cpuPath:i,cpuAreaPath:c,ramPath:d,lastCpuPt:p}=I.useMemo(()=>{if(!o)return{cpuPath:"",cpuAreaPath:"",ramPath:"",lastCpuPt:null};const m=t.slice(0,14).reverse(),y=400,g=36,T=(y-6)/Math.max(1,m.length-1),$=K=>m.map((Y,W)=>{const le=Math.min(100,Math.max(0,Number(Y[K]||0)));return{x:Number((W*T+2).toFixed(1)),y:Number((g-le/100*(g-8)-4).toFixed(1))}}),A=$("cpu_usage_pct"),P=$("ram_usage_pct"),z=K=>K.map((Y,W)=>`${W===0?"M":"L"}${Y.x},${Y.y}`).join(" "),ne=z(A),re=`${ne} L${A[A.length-1].x},${g} L${A[0].x},${g} Z`;return{cpuPath:ne,cpuAreaPath:re,ramPath:z(P),lastCpuPt:A[A.length-1]}},[o,t]);return l.jsxs(x1,{children:[l.jsxs("div",{className:"spark-head",children:[l.jsxs("span",{children:["Histórico de uso (",t.length,")"]}),l.jsxs("div",{className:"spark-legend",children:[l.jsxs("span",{children:[l.jsx("i",{style:{background:ie.colors.brandPrimary}})," CPU"]}),l.jsxs("span",{children:[l.jsx("i",{style:{background:ie.colors.status.OFFLINE}})," RAM"]})]})]}),o?l.jsxs("svg",{width:"100%",height:"36",viewBox:"0 0 400 36",preserveAspectRatio:"xMidYMid meet",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:"pulsoCpuGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:"#2D6A4F",stopOpacity:"0.2"}),l.jsx("stop",{offset:"100%",stopColor:"#2D6A4F",stopOpacity:"0.01"})]})}),l.jsx("line",{x1:"0",y1:"12",x2:"400",y2:"12",stroke:"rgba(30,36,32,0.06)"}),l.jsx("line",{x1:"0",y1:"24",x2:"400",y2:"24",stroke:"rgba(30,36,32,0.06)"}),l.jsx("path",{d:c,fill:"url(#pulsoCpuGrad)"}),l.jsx("path",{d,fill:"none",stroke:"#64748B",strokeWidth:"1.4",strokeDasharray:"3 2"}),l.jsx("path",{d:i,fill:"none",stroke:"#2D6A4F",strokeWidth:"1.9"}),p&&l.jsx("circle",{cx:p.x,cy:p.y,r:"3",fill:"#2D6A4F"})]}):l.jsx("span",{className:"spark-empty",children:"Aguardando ao menos 2 leituras reais para traçar a série temporal."})]})}function D1({diagnostics:t,units:o=[],chatMessages:i=[],taskCatalog:c=[],currentUser:d,onDispatchTask:p,onLoadPrinters:m,onRefreshTelemetryNow:y,onUpdateMachineAgent:g,onSendMessage:T,onUpdateLocation:$,onDeleteMachine:A,onFocusCamera:P}){var Xn,E;const[z,ne]=I.useState(null),[re,K]=I.useState(!1),[Y,W]=I.useState(""),[le,Ie]=I.useState(!1),[we,pe]=I.useState(null),[V,de]=I.useState(null),[Qe,X]=I.useState(null),[he,te]=I.useState("ALL"),[ee,Se]=I.useState(!1),[ae,Oe]=I.useState("DIAG"),[ke,F]=I.useState(!1),[J,O]=I.useState(null),[b,R]=I.useState(Date.now()),[Z,Q]=I.useState(null),[xe,ge]=I.useState({open:!1,task:null}),[ye,G]=I.useState(!1),Ce=I.useRef(null),Te=I.useRef(null),xt=I.useRef(0),At=I.useRef(0);function yt(){At.current=xt.current,de(null)}I.useEffect(()=>{const S=setInterval(()=>R(Date.now()),1e3);return()=>clearInterval(S)},[]),I.useEffect(()=>()=>{Te.current&&clearTimeout(Te.current)},[]);const vt=!!(V||Z!=null&&Z.open||xe.open||ye);I.useEffect(()=>{if(!vt)return;function S(w){w.key==="Escape"&&(V?yt():Z!=null&&Z.open?Q(null):xe.open?ge({open:!1,task:null}):ye&&G(!1))}return window.addEventListener("keydown",S),()=>window.removeEventListener("keydown",S)},[vt,V,Z==null?void 0:Z.open,xe.open,ye]),I.useEffect(()=>{ae==="CHAT"&&Ce.current&&(Ce.current.scrollTop=Ce.current.scrollHeight)},[i.length,ae]);const tn=((Xn=t==null?void 0:t.machine)==null?void 0:Xn.id)||null;I.useEffect(()=>{F(!1),X(null)},[tn]);const Ve=((E=t==null?void 0:t.tasks)==null?void 0:E[0])||null;I.useEffect(()=>{if(!(!Ve||!V)&&(V.taskId===Ve.task_id||V.taskCode===Ve.task_code&&V.status==="RUNNING")&&Ve.output_summary){const S={...V,taskId:Ve.task_id,status:Ve.status||"COMPLETED",summary:me(Ve.output_summary),timestamp:new Date(Ve.completed_at||Ve.issued_at||Date.now()).toLocaleTimeString("pt-BR")};de(S),X(S),pe({type:"ok",text:`${V.title}: ${me(Ve.output_summary)}`})}},[Ve==null?void 0:Ve.task_id,Ve==null?void 0:Ve.status,Ve==null?void 0:Ve.output_summary]);function kt(S,w){var U;const _=String(w||"").trim();_&&((U=navigator==null?void 0:navigator.clipboard)!=null&&U.writeText&&navigator.clipboard.writeText(_).catch(()=>{}),O(S),Te.current&&clearTimeout(Te.current),Te.current=setTimeout(()=>O(null),1800))}const B=(t==null?void 0:t.machine)||null;if(!B)return l.jsx(jp,{$collapsed:ee,"aria-label":"Painel de diagnóstico da estação",children:l.jsxs(_p,{style:{borderBottom:"none"},children:[l.jsx(Np,{children:"Aguardando agentes"}),l.jsx(Ip,{children:"Nenhuma estação selecionada"}),l.jsx(Rp,{children:l.jsx("span",{className:"loc-text",style:{whiteSpace:"normal"},children:"Clique em um equipamento na maquete ou instale o Agente Windows para iniciar o monitoramento."})})]})});const{tasks:pn=[],telemetry:Pt=[],telemetryHistory:Me=[]}=t,We=Pt.length>0?Pt:Me,je=We[0]||null,Ct=Number(B.cpu_usage_pct)>0?Number(B.cpu_usage_pct):Number((je==null?void 0:je.cpu_usage_pct)||0),Gt=Number(B.ram_usage_pct)>0?Number(B.ram_usage_pct):Number((je==null?void 0:je.ram_usage_pct)||0),qt=Number(B.disk_usage_pct)>0?Number(B.disk_usage_pct):Number((je==null?void 0:je.disk_usage_pct)||0),et=Number(B.temperature_c)>0?Number(B.temperature_c):Number((je==null?void 0:je.temperature_c)||0),Et=ie.colors.status[B.health_status]||ie.colors.status.NORMAL,Qn=ie.colors.statusBg[B.health_status]||"rgba(30, 36, 32, 0.06)",Yt=Math.max(0,Number(B.idle_seconds||0)),Ft=B.health_status==="OFFLINE",q=B.last_seen_at?Math.max(0,Math.floor((b-new Date(B.last_seen_at).getTime())/1e3)):0,ot=B.last_seen_at?Math.max(0,Math.floor((b-new Date(B.last_seen_at).getTime())/1e3)):0,nn=!Ft&&Yt>0?Yt+Math.min(ot,3):Yt,Wr=vh(B.agent_version,"2.3.0"),Mn=ms(B.uptime_seconds||0,!1),rn=Ft?q>=86400?{badge:"Inativo >24h",alertIcon:!0,color:ie.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Desligado há ${ms(q)}`}:{badge:"Offline",alertIcon:!1,color:ie.colors.status.OFFLINE,bg:ie.colors.bgSurfaceSubtle,headline:`Desligado há ${ms(q)}`}:nn>=86400?{badge:"Inativo >24h",alertIcon:!0,color:ie.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Sem interação há ${ms(nn)}`}:Wr?{badge:Ep(B.agent_version||"2.2.0"),alertIcon:!1,color:ie.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.07)",headline:"Agente desatualizado · atualização recomendada"}:nn<180?{badge:`Ligado ${Mn}`,alertIcon:!1,color:ie.colors.status.NORMAL,bg:ie.colors.bgSurfaceSubtle,headline:"Em uso ativo agora"}:{badge:`Ligado ${Mn}`,alertIcon:!1,color:ie.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.06)",headline:`Ocioso há ${ms(nn)}`};async function Cr(){K(!0),pe(null);try{const S=await y(B.id);pe({type:"ok",text:S.message||"Telemetria atualizada em tempo real."})}catch(S){pe({type:"err",text:`Falha na coleta: ${S.message}`})}finally{K(!1)}}async function Er(S){if(S.preventDefault(),!(!Y.trim()||!T)){Ie(!0);try{await T(B.id,Y.trim()),pe({type:"ok",text:`Mensagem enviada para ${B.hostname}.`}),W("")}catch(w){pe({type:"err",text:`Falha ao enviar mensagem: ${w.message}`})}finally{Ie(!1)}}}async function jr(S){const w=S.target.value;if(!w||!$)return;const[_,U]=w.split(":").map(Number);if(!(!_||!U))try{await $(B.id,{unitId:_,sectorId:U}),F(!1),pe({type:"ok",text:"Localização da estação atualizada."})}catch(Re){pe({type:"err",text:`Erro ao mover estação: ${Re.message}`})}}async function Cn(S){if(S.code==="INSTALL_APPROVED_PRINTER"){Gr(S);return}if(S.code==="REBOOT_WORKSTATION"){ge({open:!0,task:S});return}await Qt(S)}async function Qt(S,w={}){var Be,lt;const U=hs(S).label||me(S.title),Re=++xt.current,Ee=Ge=>{X(Ge),At.current!==Re&&de(Ge)};ne(S.code),pe({type:"busy",text:`Executando "${U}" em ${B.hostname}...`});const it={taskId:null,taskCode:S.code,title:U,status:"RUNNING",summary:`Enviando "${U}" para o Agente Windows (${B.ip_address})...`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:S,paramsRef:w};de(it),X(it);try{if(S.code==="SYNC_TELEMETRY_NOW"&&y){const En=await y(B.id),Zn=`Estação: ${B.hostname} | IPv4: ${B.ip_address} | CPU: ${Ct.toFixed(1)}% | RAM: ${Gt.toFixed(1)}% | Disco: ${qt.toFixed(1)}% | Temperatura: ${et>0?`${et.toFixed(1)}°C`:"N/D"}`;pe({type:"ok",text:En.message||Zn}),Ee({taskId:`sync_${Date.now().toString().slice(-5)}`,taskCode:S.code,title:U,status:"COMPLETED",summary:Zn,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:S,paramsRef:w});return}if(S.code==="UPDATE_AGENT"&&g){const Zn=(await g(B.id)).message||"Atualização OTA silenciosa despachada para o computador.";pe({type:"ok",text:`${U}: ${Zn}`}),Ee({taskId:`ota_${Date.now().toString().slice(-5)}`,taskCode:S.code,title:U,status:"COMPLETED",summary:Zn,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:S,paramsRef:w});return}const Ge=await p({machineId:B.id,taskCode:S.code,parameters:w}),Mt=((Be=Ge==null?void 0:Ge.task)==null?void 0:Be.status)||"DISPATCHED",Jn=Mt==="DISPATCHED"||Mt==="PENDING";pe({type:Jn?"busy":Mt==="FAILED"?"err":"ok",text:Jn?`Ordem enfileirada para ${B.hostname} (aguardando execução real do agente).`:`Retorno de ${B.hostname}: ${me(((lt=Ge==null?void 0:Ge.task)==null?void 0:lt.output_summary)||Mt)}`}),Ge!=null&&Ge.task&&Ee({taskId:Ge.task.task_id,taskCode:Ge.task.task_code,title:U,status:Mt,summary:me(Ge.task.output_summary)||"Ordem autenticada na fila do Agente Windows. O retorno real aparecerá automaticamente assim que a estação concluir a tarefa (TTL 120s).",timestamp:new Date(Ge.task.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:S,paramsRef:w})}catch(Ge){pe({type:"err",text:`Falha: ${Ge.message}`}),Ee({taskId:null,taskCode:S.code,title:U,status:"FAILED",summary:`Erro ao despachar comando: ${Ge.message}`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:S,paramsRef:w})}finally{ne(null)}}async function Gr(S){Q({open:!0,task:S,loading:!0,printers:[],selectedId:null,error:null});try{const w=m?await m(B.unit_id,B.id):[];Q(_=>{var U;return _&&{..._,loading:!1,printers:w,selectedId:((U=w[0])==null?void 0:U.id)??null,error:w.length?null:"Nenhuma impressora encontrada na rede desta estação. Verifique se o agente já enviou um heartbeat com a descoberta."}})}catch(w){const _=String((w==null?void 0:w.message)||""),U=/Rota n[ãa]o encontrada|404/i.test(_);Q(Re=>Re&&{...Re,loading:!1,error:U?"Servidor desatualizado: a rota /api/printers não existe no backend em execução.":`Falha ao carregar impressoras: ${_}`})}}async function qr(){if(!Z)return;const S=Z.printers.find(_=>_.id===Z.selectedId);if(!S)return;const w=Z.task;Q(null),await Qt(w,{printer_ip:S.ip_address,printer_name:S.name})}async function _r(){const S=xe.task;ge({open:!1,task:null}),S&&await Qt(S)}const Kn=o.length>0&&!!$&&(d==null?void 0:d.role)!=="VIEWER";return l.jsxs(l.Fragment,{children:[l.jsxs(jp,{$collapsed:ee,"aria-label":"Painel inspetor do computador",children:[l.jsxs(_p,{children:[l.jsxs(a1,{children:[l.jsxs(c1,{children:[l.jsxs(Np,{children:["#",B.id," · ",Ep(B.agent_version)]}),l.jsxs(Tp,{$color:Et,$bgColor:Qn,children:[l.jsx("span",{className:"dot"}),l1[B.health_status]||B.health_status]})]}),l.jsxs(u1,{children:[l.jsx(Dr,{type:"button",onClick:P,title:"Focar câmera nesta estação","aria-label":"Focar câmera nesta estação",children:l.jsx(my,{size:15})}),l.jsx(Dr,{type:"button",onClick:()=>Se(S=>!S),title:ee?"Expandir painel":"Recolher painel","aria-label":ee?"Expandir painel":"Recolher painel",children:ee?l.jsx(Mh,{size:15}):l.jsx(wp,{size:15})}),A&&(d==null?void 0:d.role)!=="VIEWER"&&l.jsx(Dr,{type:"button",$danger:!0,onClick:()=>G(!0),title:"Remover equipamento do painel","aria-label":"Remover equipamento do painel",children:l.jsx(qc,{size:15})})]})]}),l.jsxs("div",{children:[l.jsx(Ip,{children:me(B.hostname)}),l.jsxs(Rp,{children:[l.jsxs("span",{className:"loc-text",title:`${me(B.unit_name)} · ${me(B.sector_name)}`,children:[me(B.unit_name)," · ",me(B.sector_name)]}),Kn&&!ee&&l.jsxs(d1,{type:"button",$open:ke,onClick:()=>F(S=>!S),"aria-expanded":ke,title:"Mover estação para outra unidade ou setor",children:[l.jsx(_y,{size:11}),l.jsx("span",{children:ke?"Fechar":"Mover"})]})]})]}),ke&&Kn&&!ee&&l.jsx(f1,{"aria-label":"Selecionar nova unidade e setor da estação",value:`${B.unit_id}:${B.sector_id}`,onChange:jr,children:o.map(S=>(S.sectors||[]).map(w=>l.jsxs("option",{value:`${S.id}:${w.id}`,children:[me(S.name)," — ",me(w.name)]},`${S.id}:${w.id}`)))}),l.jsxs(p1,{$bg:rn.bg,$color:rn.color,children:[l.jsxs("span",{className:"act-left",children:[l.jsx("span",{className:"act-dot"}),l.jsx("span",{className:"act-headline",children:rn.headline})]}),l.jsxs("span",{className:"act-right",children:[rn.alertIcon&&l.jsx(gl,{size:12}),l.jsx("span",{children:rn.badge})]})]})]}),!ee&&l.jsxs(h1,{role:"tablist","aria-label":"Abas do inspetor de estação",children:[l.jsx(kc,{type:"button",role:"tab","aria-selected":ae==="DIAG",$active:ae==="DIAG",onClick:()=>Oe("DIAG"),children:l.jsx("span",{children:"Visão geral"})}),l.jsxs(kc,{type:"button",role:"tab","aria-selected":ae==="ACTIONS",$active:ae==="ACTIONS",onClick:()=>Oe("ACTIONS"),children:[l.jsx("span",{children:"Ações"}),l.jsx("span",{className:"tab-count",children:c.length})]}),T&&l.jsxs(kc,{type:"button",role:"tab","aria-selected":ae==="CHAT",$active:ae==="CHAT",$highlight:i.length>0,onClick:()=>Oe("CHAT"),children:[l.jsx("span",{children:"Chat"}),l.jsx("span",{className:"tab-count",children:i.length})]})]}),l.jsxs(m1,{ref:ae==="CHAT"?Ce:null,children:[(ee||ae==="DIAG")&&l.jsxs(l.Fragment,{children:[l.jsxs(g1,{children:[l.jsxs(Wi,{$tone:Hi(Ct,80,92),children:[l.jsx("span",{className:"m-lbl",children:"CPU"}),l.jsxs("span",{className:"m-val",children:[Ct.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,Ct)}%`,background:Vi(Ct,80,92)}})})]}),l.jsxs(Wi,{$tone:Hi(Gt,80,92),children:[l.jsx("span",{className:"m-lbl",children:"RAM"}),l.jsxs("span",{className:"m-val",children:[Gt.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,Gt)}%`,background:Vi(Gt,80,92,ie.colors.brandPrimaryLight)}})})]}),l.jsxs(Wi,{$tone:Hi(qt,82,92),children:[l.jsx("span",{className:"m-lbl",children:"Disco"}),l.jsxs("span",{className:"m-val",children:[qt.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,qt)}%`,background:Vi(qt,82,92,ie.colors.status.OFFLINE)}})})]}),l.jsxs(Wi,{$tone:et>0?Hi(et,75,85):ie.colors.textMuted,children:[l.jsx("span",{className:"m-lbl",children:"Temp."}),l.jsx("span",{className:"m-val",children:et>0?`${et.toFixed(0)}°C`:"N/D"}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${et>0?Math.min(100,et/95*100):0}%`,background:Vi(et,75,85,ie.colors.brandPrimaryLight)}})})]})]}),Ft&&l.jsxs(v1,{children:[l.jsx("strong",{children:"Equipamento desconectado."})," Último contato em"," ",B.last_seen_at?new Date(B.last_seen_at).toLocaleString("pt-BR"):"horário anterior","."]}),!ee&&l.jsxs(l.Fragment,{children:[l.jsx(F1,{telemetryHistory:We}),l.jsxs(y1,{children:[l.jsxs(br,{children:[l.jsx("dt",{children:"Endereço IP"}),l.jsx("dd",{className:"mono",children:l.jsxs(Ec,{type:"button",$copied:J==="ip",onClick:()=>kt("ip",B.ip_address),title:"Copiar endereço IPv4",children:[l.jsx("span",{children:B.ip_address||"0.0.0.0"}),l.jsx("span",{className:"copy-ico",children:J==="ip"?l.jsx(Vn,{size:13}):l.jsx(Ui,{size:12})})]})})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Endereço MAC"}),l.jsx("dd",{className:"mono",children:B.mac_address?l.jsxs(Ec,{type:"button",$copied:J==="mac",onClick:()=>kt("mac",B.mac_address),title:"Copiar endereço MAC",children:[l.jsx("span",{children:B.mac_address}),l.jsx("span",{className:"copy-ico",children:J==="mac"?l.jsx(Vn,{size:13}):l.jsx(Ui,{size:12})})]}):l.jsx("span",{style:{color:ie.colors.textMuted},children:"Não informado"})})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Spooler de impressão"}),l.jsxs("dd",{style:{color:B.spooler_running?ie.colors.status.NORMAL:ie.colors.status.CRITICAL},children:[l.jsx(Eo,{size:13}),l.jsx("span",{children:B.spooler_running?"Ativo":"Parado"})]})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Equipamento"}),l.jsxs("dd",{children:[me(B.manufacturer||"N/D")," ",me(B.model||"")]})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Serial"}),l.jsx("dd",{className:"mono",children:B.serial_number?l.jsxs(Ec,{type:"button",$copied:J==="serial",onClick:()=>kt("serial",B.serial_number),title:`Copiar serial (confiança ${B.identity_confidence||"LOW"})`,children:[l.jsx("span",{children:B.serial_number}),l.jsx("span",{style:{color:ie.colors.textMuted,fontSize:"0.68rem"},children:B.identity_confidence||"LOW"}),l.jsx("span",{className:"copy-ico",children:J==="serial"?l.jsx(Vn,{size:13}):l.jsx(Ui,{size:12})})]}):l.jsx("span",{style:{color:ie.colors.textMuted},children:"Não informado"})})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Processador"}),l.jsx("dd",{children:me(B.cpu_model||B.processor||"Não informado")})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Memória e disco"}),l.jsxs("dd",{className:"mono",children:[(Number(B.ram_total_mb||8192)/1024).toFixed(0)," GB ·"," ",B.disk_total_gb||0," GB ",B.disk_type||"N/D"]})]}),l.jsxs(br,{children:[l.jsx("dt",{children:"Sistema"}),l.jsx("dd",{children:me(B.os_version||"Windows")})]})]})]})]}),!ee&&ae==="ACTIONS"&&(()=>{const S=Cp.map(w=>({...w,items:c.filter(_=>hs(_).group===w.id)})).filter(w=>w.items.length>0&&(he==="ALL"||he===w.id));return l.jsxs(l.Fragment,{children:[l.jsxs(w1,{children:[l.jsx("span",{children:"Catálogo homologado"}),l.jsx("span",{className:"lead-meta",children:"HMAC-SHA256"})]}),l.jsxs(S1,{role:"group","aria-label":"Filtrar ações por categoria",children:[l.jsxs($p,{type:"button",$active:he==="ALL",onClick:()=>te("ALL"),children:["Todas (",c.length,")"]}),Cp.map(w=>l.jsx($p,{type:"button",$active:he===w.id,onClick:()=>te(w.id),children:w.id==="SYSTEM"?"Sistema":w.label},w.id))]}),S.map(w=>l.jsxs(k1,{children:[l.jsxs(C1,{children:[l.jsx("span",{children:w.label}),l.jsx("span",{className:"grp-count",children:w.items.length})]}),l.jsx(E1,{children:w.items.map(_=>{const U=_.permittedForCurrentUser,Re=z===_.code,Ee=hs(_),it=Ee.Icon,Be=_.riskLevel==="MEDIUM"||_.riskLevel==="HIGH";return l.jsxs(j1,{type:"button",$risk:_.riskLevel,disabled:!U||Re,onClick:()=>Cn(_),title:me(_.description),children:[l.jsx("span",{className:"act-ico",children:l.jsx(it,{size:15})}),l.jsxs("span",{className:"act-copy",children:[l.jsx("span",{className:"act-title",children:Ee.label}),l.jsx("span",{className:"act-sub",children:Ee.subtitle})]}),l.jsx("span",{className:"act-trail",children:U?Re?l.jsxs("span",{className:"act-busy",children:[l.jsx("i",{}),"Enviando"]}):l.jsxs(l.Fragment,{children:[Be&&l.jsx("span",{className:"act-risk-pill",children:Qg[_.riskLevel]||_.riskLevel}),l.jsx("span",{className:"act-chev",children:l.jsx(wp,{size:14})})]}):l.jsx("span",{className:"act-locked",children:"Restrito"})})]},_.code)})})]},w.id))]})})(),!ee&&ae==="CHAT"&&T&&l.jsx(N1,{children:i.length===0?l.jsxs(T1,{children:[l.jsx("strong",{children:"Nenhuma mensagem nesta estação"}),"Envie uma mensagem abaixo para abrir o chat diretamente na tela do usuário logado."]}):i.slice(-40).map(S=>{const w=S.direction==="SERVER_TO_CLIENT",_=S.created_at?new Date(S.created_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";return l.jsx(I1,{$fromTi:w,children:l.jsxs(R1,{$fromTi:w,children:[l.jsxs("div",{className:"cb-head",children:[l.jsx("span",{className:"cb-sender",children:me(S.sender)}),_&&l.jsx("span",{className:"cb-time",children:_})]}),l.jsx("div",{children:me(S.message)})]})},S.id)})})]}),!ee&&ae==="DIAG"&&l.jsx(Cc,{children:l.jsxs(b1,{type:"button",onClick:Cr,disabled:re,children:[l.jsx(Yc,{size:14}),l.jsx("span",{children:re?"Atualizando telemetria...":"Atualizar telemetria agora"})]})}),!ee&&ae==="ACTIONS"&&(()=>{const S=pn[0]||null,w=Qe||(S?{taskId:S.task_id,taskCode:S.task_code,title:hs({code:S.task_code,title:S.task_code}).label,status:S.status||"COMPLETED",summary:me(S.output_summary||"Execução registrada no histórico."),timestamp:new Date(S.completed_at||S.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),taskRef:c.find(Re=>Re.code===S.task_code)||null}:null),_=w?Mp(w.status):null,U=w&&(w.status==="RUNNING"||w.status==="DISPATCHED"||w.status==="PENDING");return l.jsx(Cc,{children:l.jsxs(_1,{$tone:_?_.color:ie.colors.textMuted,$pulsing:!!U,children:[l.jsxs("div",{className:"le-left",children:[l.jsx("span",{className:"le-dot"}),l.jsxs("div",{className:"le-text",children:[l.jsx("span",{className:"le-title",children:w?`Última ação: ${w.title}`:"Pronto para executar ações"}),l.jsx("span",{className:"le-meta",children:w?`${_.label} · ${w.timestamp}`:"Clique em uma ação acima para enviar ao agente"})]})]}),w&&l.jsx("button",{type:"button",className:"le-btn",onClick:()=>de(w),children:"Ver retorno"})]})})})(),!ee&&ae==="CHAT"&&T&&l.jsx(Cc,{children:(d==null?void 0:d.role)!=="VIEWER"?l.jsxs($1,{onSubmit:Er,children:[l.jsx("input",{type:"text","aria-label":"Mensagem para o operador do computador",placeholder:"Escrever mensagem para a estação...",value:Y,onChange:S=>W(S.target.value)}),l.jsxs("button",{type:"submit",disabled:le||!Y.trim(),children:[l.jsx(yy,{size:13}),l.jsx("span",{children:"Enviar"})]})]}):l.jsx("div",{style:{fontSize:"0.74rem",color:ie.colors.textSecondary},children:"Modo somente leitura: apenas Suporte N1 ou Admin N2 pode enviar mensagens."})})]}),(Z==null?void 0:Z.open)&&l.jsx(Gi,{onClick:()=>Q(null),children:l.jsxs(qi,{onClick:S=>S.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Instalar impressora homologada",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"brand",children:l.jsx(Eo,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Instalar impressora homologada"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:me(B.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:B.ip_address})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Dr,{type:"button",onClick:()=>Q(null),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),Z.loading&&l.jsxs(Pp,{$tone:"warning",children:[l.jsx("span",{className:"on-ico",children:l.jsx(Sp,{size:15})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:"Buscando impressoras na sub-rede"}),l.jsx("span",{className:"on-msg",children:"Consultando o catálogo homologado e a descoberta de rede da estação..."})]})]}),Z.error&&l.jsx(_c,{$tone:"danger",children:Z.error}),!Z.loading&&Z.printers.length>0&&l.jsx(O1,{children:Z.printers.map(S=>{const w=S.id===Z.selectedId;return l.jsxs(L1,{$selected:w,$source:S.source,children:[l.jsx("input",{type:"radio",name:"approved_printer",checked:w,onChange:()=>Q(_=>_&&{..._,selectedId:S.id})}),l.jsxs("span",{className:"pr-left",children:[l.jsx("span",{className:"pr-ico",children:l.jsx(Eo,{size:15})}),l.jsxs("span",{className:"pr-info",children:[l.jsxs("span",{className:"pr-name",children:[l.jsx("span",{children:S.name}),l.jsx("span",{className:"pr-tag",children:S.source==="NETWORK"?"Rede":S.source==="INSTALLED"?"Instalada":"Homologada"})]}),l.jsxs("span",{className:"pr-ip",children:[S.ip_address,S.model?` · ${S.model}`:""]})]})]}),l.jsx("span",{className:"pr-check",children:w&&l.jsx(Vn,{size:11,strokeWidth:2.4})})]},S.id)})}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Risco Alto · Admin N2"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Wn,{type:"button",onClick:()=>Q(null),children:"Cancelar"}),l.jsx(Wn,{type:"button",$variant:"primary",disabled:!Z.selectedId,onClick:qr,children:"Instalar impressora"})]})]})]})}),xe.open&&l.jsx(Gi,{onClick:()=>ge({open:!1,task:null}),children:l.jsxs(qi,{onClick:S=>S.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar reinicialização da estação",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"danger",children:l.jsx(Qc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Reiniciar estação de trabalho"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação de alto impacto"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Requer confirmação"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Dr,{type:"button",onClick:()=>ge({open:!1,task:null}),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),l.jsxs(Ap,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:me(B.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:B.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Aviso na tela"}),l.jsx("span",{className:"ts-v",children:"30 segundos"})]})]}),l.jsx(_c,{$tone:"warning",children:"O Windows exibirá um aviso de 30 segundos para que o operador salve os documentos abertos antes da reinicialização. A ordem será registrada na auditoria."}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Wn,{type:"button",onClick:()=>ge({open:!1,task:null}),children:"Cancelar"}),l.jsxs(Wn,{type:"button",$variant:"danger",onClick:_r,children:[l.jsx(Qc,{size:13}),l.jsx("span",{children:"Confirmar reinício"})]})]})]})]})}),V&&(()=>{const w=hs({code:V.taskCode,title:V.title}).Icon,_=Mp(V.status),U=z1(V.summary),Re=V.status==="RUNNING"||V.status==="DISPATCHED"||V.status==="PENDING",Ee=V.status==="FAILED"||V.status==="EXPIRED",it=Ee?"error":Re?"active":"done",Be=Ee?"error":Re?"pending":"done";return l.jsx(Gi,{onClick:yt,children:l.jsxs(qi,{onClick:lt=>lt.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":`Execução da ação ${V.title}`,children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:_.tone==="danger"?"danger":_.tone==="warning"?"warning":"brand",children:l.jsx(w,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:V.title}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:me(B.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:B.ip_address}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:V.timestamp})]})]})]}),l.jsxs("div",{className:"mh-right",children:[l.jsxs(Tp,{$color:_.color,$bgColor:_.bg,children:[l.jsx("span",{className:"dot"}),_.label]}),l.jsx(Dr,{type:"button",onClick:yt,"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})]})]}),l.jsxs(A1,{"aria-label":"Etapas da execução remota",children:[l.jsxs(jc,{$state:"done",children:[l.jsx("span",{className:"st-mark",children:l.jsx(Vn,{size:10,strokeWidth:2.5})}),l.jsx("span",{className:"st-lbl",children:"Assinada (HMAC)"})]}),l.jsxs(jc,{$state:it,children:[l.jsx("span",{className:"st-mark",children:it==="done"?l.jsx(Vn,{size:10,strokeWidth:2.5}):it==="error"?"!":"2"}),l.jsx("span",{className:"st-lbl",children:it==="active"?"Na fila do agente":"Enviada ao agente"})]}),l.jsxs(jc,{$state:Be,children:[l.jsx("span",{className:"st-mark",children:Be==="done"?l.jsx(Vn,{size:10,strokeWidth:2.5}):Be==="error"?"!":"3"}),l.jsx("span",{className:"st-lbl",children:Be==="error"?"Falha / TTL":"Retorno recebido"})]})]}),U.structured?l.jsx(P1,{children:U.items.map((lt,Ge)=>l.jsxs(M1,{children:[l.jsx("dt",{children:lt.label}),l.jsx("dd",{children:lt.value})]},Ge))}):l.jsxs(Pp,{$tone:_.tone==="danger"?"danger":_.tone==="warning"?"warning":"brand",children:[l.jsx("span",{className:"on-ico",children:Ee?l.jsx(gl,{size:16}):Re?l.jsx(Sp,{size:16}):l.jsx(Vn,{size:16})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:_.lead}),l.jsx("span",{className:"on-msg",children:U.message})]})]}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsxs(Wn,{type:"button",$variant:"ghost",$copied:J==="report",onClick:()=>kt("report",U.message),title:"Copiar saída completa da tarefa",children:[J==="report"?l.jsx(Vn,{size:13}):l.jsx(Ui,{size:13}),l.jsx("span",{children:J==="report"?"Copiado":"Copiar resultado"})]})}),l.jsxs("div",{className:"mf-right",children:[V.taskRef&&!Re&&l.jsxs(Wn,{type:"button",onClick:()=>Qt(V.taskRef,V.paramsRef||{}),children:[l.jsx(Yc,{size:13}),l.jsx("span",{children:"Executar novamente"})]}),l.jsx(Wn,{type:"button",$variant:"primary",onClick:yt,children:"Fechar"})]})]})]})})})(),ye&&l.jsx(Gi,{onClick:()=>G(!1),children:l.jsxs(qi,{onClick:S=>S.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar remoção de equipamento",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"danger",children:l.jsx(qc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Remover equipamento do painel"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação permanente"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Registrada na auditoria"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Dr,{type:"button",onClick:()=>G(!1),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),l.jsxs(Ap,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:me(B.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:B.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Setor"}),l.jsx("span",{className:"ts-v",children:me(B.sector_name||"N/D")})]})]}),l.jsx(_c,{$tone:"danger",children:"Esta ação remove permanentemente o cadastro, o histórico de telemetria e as mensagens desta estação do painel."}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Wn,{type:"button",onClick:()=>G(!1),children:"Cancelar"}),l.jsx(Wn,{type:"button",$variant:"danger",onClick:async()=>{G(!1),A&&await A(B.id)},children:"Confirmar remoção"})]})]})]})})]})}const B1=[{value:"USF",label:"USF — Unidade de Saúde da Família"},{value:"POLICLINICA",label:"Policlínica Municipal"},{value:"CAPS",label:"CAPS — Centro de Atenção Psicossocial"},{value:"UPA",label:"UPA — Unidade de Pronto Atendimento"},{value:"HOSPITAL",label:"Hospital Municipal"},{value:"CEO",label:"CEO — Centro de Especialidades"},{value:"SEDE",label:"Sede Administrativa / Central TI"}],U1=[{value:"REC",label:"Recepção",desc:"Balcão em L, longarina e madeira"},{value:"CONS",label:"Consultório",desc:"Maca clínica, soro e biombo"},{value:"FARM",label:"Farmácia / Vacina",desc:"Estantes médicas e piso xadrez"},{value:"ADM",label:"Admin / Enfermagem",desc:"Mural de avisos e área clínica"},{value:"TI",label:"Sala Técnica / TI",desc:"Rack de servidor e infraestrutura"}];function Op(t,o="SETOR"){return String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9\s-]/g," ").trim().replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,16)||o}function Lp(t){const o=String((t==null?void 0:t.room_theme)||"").trim().toUpperCase();if(["REC","CONS","FARM","ADM","TI"].includes(o))return o;const i=`${(t==null?void 0:t.code)||""} ${(t==null?void 0:t.name)||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();return i.includes("REC")||i.includes("ACOLH")||(t==null?void 0:t.id)===1?"REC":i.includes("CONS")||i.includes("MED")||i.includes("PSI")||(t==null?void 0:t.id)===2?"CONS":i.includes("FAR")||i.includes("VAC")||i.includes("LAB")||(t==null?void 0:t.id)===3?"FARM":i.includes("TI")||i.includes("CPD")||(t==null?void 0:t.id)===8?"TI":"ADM"}const H1=N.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`,V1=N.div`
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  box-shadow: ${({theme:t})=>t.shadows.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({theme:t})=>t.fonts.sans};
`,W1=N.div`
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e4e8e3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  .m-kicker {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.66rem;
    font-weight: 700;
    color: #52796b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .m-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #242925;
    margin-top: 2px;
  }
`,G1=N.button`
  background: #f4f5f2;
  border: 1px solid #e4e8e3;
  color: #737b75;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #242925;
    background: #ecefeb;
  }
`,zp=N.div`
  display: flex;
  gap: 6px;
  padding: 10px 20px 0;
  background: #f8faf8;
  border-bottom: 1px solid #e4e8e3;
  flex-wrap: wrap;
`,vo=N.button`
  padding: 7px 12px;
  border: 1px solid ${({$active:t,$danger:o})=>t?o?"#DC2626":"#52796B":"transparent"};
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  background: ${({$active:t})=>t?"#FFFFFF":"transparent"};
  color: ${({$active:t,$danger:o})=>o?"#DC2626":t?"#242925":"#737B75"};
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: -1px;

  &:hover {
    color: ${({$danger:t})=>t?"#B91C1C":"#242925"};
  }
`,q1=N.form`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
`,gs=N.div`
  display: grid;
  grid-template-columns: ${({$cols:t})=>t||"1fr"};
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,en=N.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #4a524c;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hint {
    font-weight: 500;
    color: #737b75;
    font-size: 0.64rem;
  }

  input,
  select {
    width: 100%;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #cbd3cb;
    background: #ffffff;
    color: #242925;
    font-family: ${({theme:t})=>t.fonts.sans};
    font-size: 0.78rem;
    outline: none;

    &:focus {
      border-color: #52796b;
      box-shadow: 0 0 0 2px rgba(82, 121, 107, 0.14);
    }
  }
`,Y1=N.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Q1=N.button`
  padding: 8px 6px;
  border-radius: 7px;
  border: 1px solid ${({$selected:t})=>t?"#52796B":"#E4E8E3"};
  background: ${({$selected:t})=>t?"rgba(82, 121, 107, 0.10)":"#F8FAF8"};
  cursor: pointer;
  text-align: left;
  transition: all 0.14s ease;

  &:hover {
    border-color: #52796b;
  }

  .t-code {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.62rem;
    font-weight: 700;
    color: #52796b;
  }

  .t-name {
    font-size: 0.69rem;
    font-weight: 700;
    color: #242925;
    margin-top: 2px;
  }

  .t-desc {
    font-size: 0.59rem;
    color: #737b75;
    line-height: 1.25;
    margin-top: 3px;
  }
`,Nc=N.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 11px;
  border-radius: 7px;
  border: 1px solid #e4e8e3;
  background: #f8faf8;
  font-size: 0.74rem;
  font-weight: 600;
  color: #242925;
  cursor: pointer;

  input {
    accent-color: #52796b;
    width: 15px;
    height: 15px;
  }
`,K1=N.div`
  border: 1px solid #e4e8e3;
  border-radius: 7px;
  padding: 10px 12px;
  background: #f8faf8;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,X1=N.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  color: #52796b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`,xs=N.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.75rem;
  line-height: 1.4;
  background: ${({$tone:t})=>t==="danger"?"rgba(220, 38, 38, 0.08)":"rgba(217, 119, 6, 0.1)"};
  border: 1px solid
    ${({$tone:t})=>t==="danger"?"rgba(220, 38, 38, 0.35)":"rgba(217, 119, 6, 0.35)"};
  color: ${({$tone:t})=>t==="danger"?"#991B1B":"#92400E"};
`,J1=N.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e4e8e3;
`,Fp=N.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 7px;
  font-family: ${({theme:t})=>t.fonts.sans};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${({$variant:t,theme:o})=>t==="primary"?o.colors.brandPrimary:t==="danger"?o.colors.status.CRITICAL:o.colors.borderStrong};
  background: ${({$variant:t,theme:o})=>t==="primary"?o.colors.brandPrimary:t==="danger"?o.colors.status.CRITICAL:o.colors.bgSurface};
  color: ${({$variant:t,theme:o})=>t==="primary"||t==="danger"?"#FFFFFF":o.colors.textPrimary};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    filter: brightness(0.95);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;function Z1({isOpen:t,initialMode:o="CREATE_UNIT",units:i=[],activeUnit:c=null,targetSector:d=null,machines:p=[],onClose:m,onCreateUnit:y,onUpdateUnit:g,onDeleteUnit:T,onCreateSector:$,onUpdateSector:A,onDeleteSector:P}){var Ft;const[z,ne]=I.useState(o),[re,K]=I.useState(!1),[Y,W]=I.useState(""),[le,Ie]=I.useState(""),[we,pe]=I.useState(""),[V,de]=I.useState(!1),[Qe,X]=I.useState("USF"),[he,te]=I.useState(""),[ee,Se]=I.useState(!0),[ae,Oe]=I.useState(""),[ke,F]=I.useState(""),[J,O]=I.useState(""),[b,R]=I.useState(!1),[Z,Q]=I.useState("CONS"),[xe,ge]=I.useState(!0),[ye,G]=I.useState(!0),[Ce,Te]=I.useState(!1),[xt,At]=I.useState(""),[yt,vt]=I.useState(""),[tn,Ve]=I.useState("9"),[kt,B]=I.useState("5"),[pn,Pt]=I.useState(""),Me=I.useMemo(()=>i.filter(q=>Number(q.id)!==Number(c==null?void 0:c.id)),[i,c]),We=I.useMemo(()=>((c==null?void 0:c.sectors)||[]).filter(q=>Number(q.id)!==Number(d==null?void 0:d.id)),[c,d]),je=I.useMemo(()=>d?p.filter(q=>Number(q.sector_id)===Number(d.id)).length:0,[p,d]),Ct=Number(((Ft=c==null?void 0:c.summary)==null?void 0:Ft.total)??p.length??0),Gt=c==null?void 0:c.id,qt=d==null?void 0:d.id;if(I.useEffect(()=>{var q,ot;t&&(ne(o),W(""),K(!1),o==="CREATE_UNIT"?(Ie(""),pe(""),de(!1),X("USF"),te(""),Se(!0)):o==="EDIT_UNIT"&&c?(Ie(me(c.name||"")),pe(c.code||""),de(!0),X(c.unit_type||"USF"),te(me(c.address||""))):o==="DELETE_UNIT"?Oe((q=Me[0])!=null&&q.id?String(Me[0].id):""):o==="CREATE_SECTOR"?(F(""),O(""),R(!1),Q("CONS"),ge(!0),G(!0),Te(!1),At(""),vt(""),Ve("9"),B("5")):o==="EDIT_SECTOR"&&d?(F(me(d.name||"")),O(d.code||""),R(!0),Q(Lp(d)),ge(!1),Te(!1),At(String(d.bounds_x??0)),vt(String(d.bounds_z??0)),Ve(String(d.width_3d??9)),B(String(d.depth_3d??5))):o==="DELETE_SECTOR"&&Pt((ot=We[0])!=null&&ot.id?String(We[0].id):""))},[t,o,Gt,qt]),!t)return null;const et=q=>{var ot,nn;W(""),ne(q),q==="CREATE_UNIT"?(Ie(""),pe(""),de(!1),X("USF"),te(""),Se(!0)):q==="EDIT_UNIT"&&c?(Ie(me(c.name||"")),pe(c.code||""),de(!0),X(c.unit_type||"USF"),te(me(c.address||""))):q==="DELETE_UNIT"?Oe((ot=Me[0])!=null&&ot.id?String(Me[0].id):""):q==="CREATE_SECTOR"?(F(""),O(""),R(!1),Q("CONS"),ge(!0),G(!0),Te(!1),At(""),vt(""),Ve("9"),B("5")):q==="EDIT_SECTOR"&&d?(F(me(d.name||"")),O(d.code||""),R(!0),Q(Lp(d)),ge(!1),Te(!1),At(String(d.bounds_x??0)),vt(String(d.bounds_z??0)),Ve(String(d.width_3d??9)),B(String(d.depth_3d??5))):q==="DELETE_SECTOR"&&Pt((nn=We[0])!=null&&nn.id?String(We[0].id):"")},Et=async q=>{q.preventDefault(),W(""),K(!0);try{z==="CREATE_UNIT"?await y({name:le,code:we,unit_type:Qe,address:he,create_default_sectors:ee}):z==="EDIT_UNIT"&&c?await g(c.id,{name:le,code:we,unit_type:Qe,address:he}):z==="DELETE_UNIT"&&c?await T(c.id,{target_unit_id:ae?Number(ae):void 0}):z==="CREATE_SECTOR"&&c?await $(c.id,{name:ke,code:J,room_theme:Z,auto_size:ye,...ye?{}:{width_3d:Number(tn||9),depth_3d:Number(kt||5)},...xe?{}:{bounds_x:xt===""?void 0:Number(xt),bounds_z:yt===""?void 0:Number(yt)}}):z==="EDIT_SECTOR"&&d?await A(d.id,{name:ke,code:J,room_theme:Z,width_3d:Number(tn||9),depth_3d:Number(kt||5),bounds_x:xt===""?void 0:Number(xt),bounds_z:yt===""?void 0:Number(yt)}):z==="DELETE_SECTOR"&&d&&await P(d.id,{target_sector_id:pn?Number(pn):void 0}),m()}catch(ot){W((ot==null?void 0:ot.message)||"Não foi possível concluir a operação.")}finally{K(!1)}},Qn=z==="EDIT_SECTOR"||z==="DELETE_SECTOR",Yt={CREATE_UNIT:"Cadastrar Nova Unidade de Saúde",EDIT_UNIT:`Editar Unidade — ${me((c==null?void 0:c.name)||"")}`,DELETE_UNIT:`Excluir Unidade — ${me((c==null?void 0:c.name)||"")}`,CREATE_SECTOR:`Novo Setor em ${me((c==null?void 0:c.name)||"Unidade")}`,EDIT_SECTOR:`Editar Setor — ${me((d==null?void 0:d.name)||"")}`,DELETE_SECTOR:`Excluir Setor — ${me((d==null?void 0:d.name)||"")}`}[z];return l.jsx(H1,{onClick:()=>!re&&m(),children:l.jsxs(V1,{onClick:q=>q.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsxs(W1,{children:[l.jsxs("div",{children:[l.jsxs("div",{className:"m-kicker",children:["ESTRUTURA DA REDE // ",c?me(c.code):"RMM"]}),l.jsx("div",{className:"m-title",children:Yt})]}),l.jsx(G1,{type:"button",onClick:()=>!re&&m(),title:"Fechar",children:"✕"})]}),Qn?l.jsxs(zp,{children:[l.jsx(vo,{type:"button",$active:z==="EDIT_SECTOR",onClick:()=>et("EDIT_SECTOR"),children:"Editar Setor"}),l.jsx(vo,{type:"button",$danger:!0,$active:z==="DELETE_SECTOR",onClick:()=>et("DELETE_SECTOR"),children:"Excluir Setor"})]}):l.jsxs(zp,{children:[l.jsx(vo,{type:"button",$active:z==="CREATE_UNIT",onClick:()=>et("CREATE_UNIT"),children:"+ Nova Unidade"}),c&&l.jsxs(l.Fragment,{children:[l.jsx(vo,{type:"button",$active:z==="CREATE_SECTOR",onClick:()=>et("CREATE_SECTOR"),children:"+ Novo Setor"}),l.jsx(vo,{type:"button",$active:z==="EDIT_UNIT",onClick:()=>et("EDIT_UNIT"),children:"Editar Unidade"}),l.jsx(vo,{type:"button",$danger:!0,$active:z==="DELETE_UNIT",onClick:()=>et("DELETE_UNIT"),children:"Excluir Unidade"})]})]}),l.jsxs(q1,{onSubmit:Et,children:[Y&&l.jsx(xs,{$tone:"danger",children:Y}),(z==="CREATE_UNIT"||z==="EDIT_UNIT")&&l.jsxs(l.Fragment,{children:[l.jsxs(gs,{$cols:"2fr 1fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Nome da Unidade de Saúde *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: USF Camela / UPA Ipojuca",value:le,onChange:q=>{const ot=q.target.value;Ie(ot),!V&&z==="CREATE_UNIT"&&pe(Op(ot,"UNI"))}})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única"})]}),l.jsx("input",{type:"text",placeholder:"Ex: USF-CAM",value:we,onChange:q=>{de(!0),pe(q.target.value.toUpperCase())}})]})]}),l.jsxs(gs,{$cols:"1fr 1.4fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Tipo de Estabelecimento"}),l.jsx("select",{value:Qe,onChange:q=>X(q.target.value),children:B1.map(q=>l.jsx("option",{value:q.value,children:q.label},q.value))})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Endereço / Bairro"}),l.jsx("input",{type:"text",placeholder:"Ex: Distrito de Camela, Ipojuca - PE",value:he,onChange:q=>te(q.target.value)})]})]}),z==="CREATE_UNIT"&&l.jsxs(Nc,{children:[l.jsx("input",{type:"checkbox",checked:ee,onChange:q=>Se(q.target.checked)}),l.jsx("span",{children:"Criar planta inicial com 4 setores padrão (Recepção, Consultório, Farmácia e Adm)"})]})]}),z==="DELETE_UNIT"&&c&&l.jsxs(l.Fragment,{children:[Me.length===0?l.jsxs(xs,{$tone:"danger",children:["Esta é a única unidade ativa no painel. Crie outra unidade antes de excluir"," ",l.jsx("strong",{children:me(c.name)}),"."]}):l.jsxs(xs,{$tone:"warning",children:["A unidade ",l.jsx("strong",{children:me(c.name)})," possui"," ",l.jsxs("strong",{children:[(c.sectors||[]).length," setor(es)"]})," e"," ",l.jsxs("strong",{children:[Ct," computador(es)"]})," vinculados. Esta ação remove permanentemente a unidade e todos os seus setores."]}),Me.length>0&&Ct>0&&l.jsxs(en,{children:[l.jsx("label",{children:"Realocar computadores existentes para qual unidade?"}),l.jsx("select",{value:ae,onChange:q=>Oe(q.target.value),required:!0,children:Me.map(q=>l.jsxs("option",{value:q.id,children:["[",q.code,"] ",me(q.name)]},q.id))})]})]}),(z==="CREATE_SECTOR"||z==="EDIT_SECTOR")&&l.jsxs(l.Fragment,{children:[l.jsxs(gs,{$cols:"2fr 1fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Nome do Setor *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: Sala de Vacina, Consultório 02, CPD",value:ke,onChange:q=>{const ot=q.target.value;F(ot),!b&&z==="CREATE_SECTOR"&&O(Op(ot,"SETOR"))}})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única na unidade"})]}),l.jsx("input",{type:"text",placeholder:"Ex: VAC-01",value:J,onChange:q=>{R(!0),O(q.target.value.toUpperCase())}})]})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Estilo do Ambiente & Mobiliário 3D",l.jsx("span",{className:"hint",children:"Define móveis e piso na maquete"})]}),l.jsx(Y1,{children:U1.map(q=>l.jsxs(Q1,{type:"button",$selected:Z===q.value,onClick:()=>Q(q.value),children:[l.jsx("div",{className:"t-code",children:q.value}),l.jsx("div",{className:"t-name",children:q.label}),l.jsx("div",{className:"t-desc",children:q.desc})]},q.value))})]}),l.jsx(X1,{type:"button",onClick:()=>Te(q=>!q),children:Ce?"▾ Ocultar layout e medidas 3D":"▸ Layout e medidas 3D (Avançado)"}),Ce&&l.jsxs(K1,{children:[z==="CREATE_SECTOR"&&l.jsxs(Nc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:xe,onChange:q=>ge(q.target.checked)}),l.jsx("span",{children:"Posicionar automaticamente no próximo espaço livre da planta (sem colisão)"})]}),z==="CREATE_SECTOR"&&l.jsxs(Nc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:ye,onChange:q=>G(q.target.checked)}),l.jsx("span",{children:"Tamanho automático — a sala assume a medida predominante da unidade e encaixa na malha existente"})]}),l.jsxs(gs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Largura da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"4",max:"24",value:tn,disabled:z==="CREATE_SECTOR"&&ye,onChange:q=>Ve(q.target.value)})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Profundidade da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"3.5",max:"16",value:kt,disabled:z==="CREATE_SECTOR"&&ye,onChange:q=>B(q.target.value)})]})]}),(!xe||z==="EDIT_SECTOR")&&l.jsxs(gs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Posição X Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:xt,placeholder:"-4.5, 4.5, 13.5...",onChange:q=>At(q.target.value)})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Posição Z Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:yt,placeholder:"-3.5 (Norte) ou 3.5 (Sul)",onChange:q=>vt(q.target.value)})]})]})]})]}),z==="DELETE_SECTOR"&&d&&l.jsxs(l.Fragment,{children:[We.length===0&&je>0?l.jsxs(xs,{$tone:"danger",children:["O setor ",l.jsx("strong",{children:me(d.name)})," é o único setor desta unidade e contém ",l.jsxs("strong",{children:[je," computador(es)"]}),". Crie outro setor antes de excluí-lo para permitir a transferência."]}):l.jsxs(xs,{$tone:"warning",children:["Confirma a exclusão do setor"," ",l.jsx("strong",{children:me(d.name)})," (",d.code,") da unidade ",l.jsx("strong",{children:me((c==null?void 0:c.name)||"")}),"?",je>0?` Os ${je} computador(es) alocados serão transferidos para o setor selecionado abaixo.`:" Este setor não possui computadores alocados."]}),We.length>0&&je>0&&l.jsxs(en,{children:[l.jsx("label",{children:"Transferir computadores deste setor para:"}),l.jsx("select",{value:pn,onChange:q=>Pt(q.target.value),required:!0,children:We.map(q=>l.jsxs("option",{value:q.id,children:["[",q.code,"] ",me(q.name)]},q.id))})]})]}),l.jsxs(J1,{children:[l.jsx(Fp,{type:"button",onClick:()=>!re&&m(),disabled:re,children:"Cancelar"}),l.jsx(Fp,{type:"submit",$variant:z==="DELETE_UNIT"||z==="DELETE_SECTOR"?"danger":"primary",disabled:re||z==="DELETE_UNIT"&&Me.length===0||z==="DELETE_SECTOR"&&We.length===0&&je>0,children:re?"Processando...":z==="CREATE_UNIT"?"Criar Unidade":z==="EDIT_UNIT"?"Salvar Unidade":z==="DELETE_UNIT"?"Confirmar Exclusão da Unidade":z==="CREATE_SECTOR"?"Criar Setor 3D":z==="EDIT_SECTOR"?"Salvar Setor":"Confirmar Exclusão do Setor"})]})]})]})})}const ev=I.lazy(()=>Ts(()=>import("./DigitalTwin3D-BHycEoxr.js"),__vite__mapDeps([0,1])).then(t=>({default:t.DigitalTwin3D}))),tv=I.lazy(()=>Ts(()=>import("./ModelShowcase-DI4YWCGt.js"),__vite__mapDeps([2,1]))),nv=I.lazy(()=>Ts(()=>import("./InventoryView-BP0YHDvQ.js"),[]).then(t=>({default:t.InventoryView}))),rv=I.lazy(()=>Ts(()=>import("./MonitoringAuditView-x2BKnq6S.js"),[]).then(t=>({default:t.MonitoringAuditView}))),ov=I.lazy(()=>Ts(()=>import("./SettingsView-CDr-xnoJ.js"),[]).then(t=>({default:t.SettingsView}))),sv={ADMIN_N2:"Admin N2",TECH_N1:"Suporte N1",VIEWER:"Gestão"};function Lh(t){return String(t||"Operador").replace(/\s*\((Admin\s*N2|Suporte\s*N1|Tech\s*N1|Gest[aã]o|Viewer)\)\s*$/i,"").trim()}function iv(t){const o=Lh(t).split(/\s+/).filter(Boolean);return o.length===0?"TI":o.length===1?o[0].slice(0,2).toUpperCase():`${o[0][0]}${o[o.length-1][0]}`.toUpperCase()}const lv=N.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
`,av=N.header`
  pointer-events: auto;
  height: 54px;
  flex-shrink: 0;
  background: ${({theme:t})=>t.colors.bgSurface};
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,cv=N.nav`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  flex-shrink: 0;
`,Xi=N.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid
    ${({$active:t,theme:o})=>t?o.colors.borderSubtle:"transparent"};
  background: ${({$active:t,theme:o})=>t?o.colors.bgSurface:"transparent"};
  box-shadow: ${({$active:t,theme:o})=>t?o.shadows.sm:"none"};
  color: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: ${({$active:t})=>t?700:500};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textPrimary};
  }

  .m-badge {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0 5px;
    border-radius: 999px;
    background: rgba(200, 30, 30, 0.11);
    color: #c81e1e;
  }

  @media (max-width: 1360px) {
    padding: 0 8px;
    font-size: 0.73rem;
  }
`,uv=N.main`
  pointer-events: auto;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: ${({theme:t})=>t.colors.bgCanvas};
`,dv=N.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:t})=>t.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:t})=>t.colors.textSecondary};
`,fv=N.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .brand-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .brand-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .brand-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 1px;
    white-space: nowrap;
  }
`,Dp=N.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:t})=>t||"#2D6A4F"};
  display: inline-block;
  flex-shrink: 0;
`,pv=N.nav`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`,hv=N.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  overflow-x: auto;
  padding: 2px 0;

  &::-webkit-scrollbar {
    height: 3px;
  }
`,mv=N.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`,gv=N.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  max-width: 210px;
  flex-shrink: 0;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid
    ${({$active:t,theme:o})=>t?o.colors.borderStrong:"transparent"};
  background: ${({$active:t,theme:o})=>t?o.colors.bgSurfaceSubtle:"transparent"};
  color: ${({$active:t,theme:o})=>t?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.76rem;
  font-weight: ${({$active:t})=>t?600:500};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .u-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }

  .u-count {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
    color: ${({$active:t,theme:o})=>t?o.colors.brandPrimary:o.colors.textMuted};
    background: ${({$active:t})=>t?"rgba(45, 106, 79, 0.1)":"rgba(30, 36, 32, 0.05)"};
    padding: 1px 6px;
    border-radius: 999px;
  }

  @media (max-width: 1360px) {
    max-width: 165px;
    padding: 0 8px;
  }
`,Ji=N.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 32px;
  padding: ${({$iconOnly:t})=>t?"0 8px":"0 10px"};
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid
    ${({$accent:t,theme:o})=>t?"rgba(45, 106, 79, 0.26)":o.colors.borderSubtle};
  background: ${({$accent:t,theme:o})=>t?o.colors.brandPrimarySubtle:o.colors.bgSurface};
  color: ${({$accent:t,$danger:o,theme:i})=>o?i.colors.status.CRITICAL:t?i.colors.brandPrimary:i.colors.textSecondary};
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({$accent:t,$danger:o,theme:i})=>o?"rgba(200, 30, 30, 0.08)":t?"rgba(45, 106, 79, 0.16)":i.colors.bgSurfaceHover};
    border-color: ${({$danger:t,theme:o})=>t?"rgba(200, 30, 30, 0.35)":o.colors.borderStrong};
    color: ${({$danger:t,$accent:o,theme:i})=>t?i.colors.status.CRITICAL:o?i.colors.brandPrimaryHover:i.colors.textPrimary};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,xv=N.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 1360px) {
    .hide-compact {
      display: none;
    }
  }
`,bo=N.span`
  width: 1px;
  height: 20px;
  background: ${({theme:t})=>t.colors.borderSubtle};
  display: inline-block;
  flex-shrink: 0;
`,yv=N.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 4px 3px 5px;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};

  .u-avatar {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: rgba(45, 106, 79, 0.12);
    color: ${({theme:t})=>t.colors.brandPrimary};
    font-size: 0.7rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.02em;
  }

  .u-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    padding-right: 4px;
  }

  .u-name {
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    max-width: 132px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .u-role {
    font-size: 0.66rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
  }
`,vv=N.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 14px;
  gap: 10px;
  pointer-events: none;
`,bv=N.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
`,wv=N.div`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  background: ${({theme:t})=>t.colors.bgGlassHeavy};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.md};
  box-shadow: ${({theme:t})=>t.shadows.sm};
  padding: 4px;
  max-width: 100%;
`,Rn=N.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid
    ${({$active:t,theme:o})=>t?o.colors.borderStrong:"transparent"};
  background: ${({$active:t,theme:o})=>t?o.colors.bgSurfaceSubtle:"transparent"};
  color: ${({$active:t,theme:o})=>t?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({$active:t})=>t?600:500};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }
`,Sv=N.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
  overflow: hidden;
`,kv=N.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 12px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.md};
  box-shadow: ${({theme:t})=>t.shadows.sm};
  color: ${({theme:t})=>t.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: translateY(-1px);
    border-color: ${({theme:t})=>t.colors.borderStrong};
    box-shadow: ${({theme:t})=>t.shadows.md};
  }

  .alert-pill {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
    font-weight: 700;
    color: #991b1b;
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 1px 6px;
    border-radius: 999px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`,Cv=N.aside`
  pointer-events: auto;
  width: 280px;
  max-height: 100%;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  box-shadow: ${({theme:t})=>t.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 960px) {
    display: none;
  }
`,Tc=N.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  &:last-child {
    border-bottom: none;
  }
`,Ic=N.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .sec-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .sec-meta {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
  }

  .sec-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`,Ev=N.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`,Zi=N.div`
  display: flex;
  flex-direction: column;
  padding-top: 7px;
  border-top: 2px solid ${({$color:t})=>t};

  .num {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    line-height: 1.15;
  }

  .lbl {
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 2px;
  }
`,Bp=N.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${({theme:t})=>t.colors.brandPrimary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({theme:t})=>t.colors.brandPrimarySubtle};
  }
`,el=N.button`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({$danger:t,theme:o})=>t?o.colors.status.CRITICAL:o.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({$danger:t,theme:o})=>t?"rgba(200, 30, 30, 0.08)":o.colors.bgSurfaceHover};
    color: ${({$danger:t,theme:o})=>t?o.colors.status.CRITICAL:o.colors.textPrimary};
  }
`,jv=N.div`
  display: flex;
  flex-direction: column;
`,_v=N.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 10px;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);
  border-radius: 6px;
  background: ${({$selected:t,theme:o})=>t?o.colors.brandPrimarySubtle:"transparent"};
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 2.5px;
    border-radius: 2px;
    background: ${({$selected:t,theme:o})=>t?o.colors.brandPrimary:"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({$selected:t,theme:o})=>t?"rgba(45, 106, 79, 0.13)":o.colors.bgSurfaceSubtle};
  }

  .s-info {
    min-width: 0;
  }

  .s-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .s-code {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-top: 1px;
  }

  .s-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .s-count {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:t})=>t.colors.textSecondary};
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(30, 36, 32, 0.05);
  }

  .s-controls {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    opacity: 0.45;
    transition: opacity 150ms ease;
  }

  &:hover .s-controls,
  &:focus-within .s-controls {
    opacity: 1;
  }
`,Nv=N.button`
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: none;
  border-left: 2.5px solid
    ${({$severity:t,theme:o})=>t==="CRITICAL"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  border-radius: 0 6px 6px 0;
  background: ${({$severity:t})=>t==="CRITICAL"?"rgba(200, 30, 30, 0.05)":"rgba(180, 83, 9, 0.05)"};
  margin-bottom: 6px;
  cursor: ${({$clickable:t})=>t?"pointer":"default"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({$severity:t,$clickable:o})=>o?t==="CRITICAL"?"rgba(200, 30, 30, 0.09)":"rgba(180, 83, 9, 0.09)":void 0};
  }

  .a-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  .a-tag {
    font-size: 0.66rem;
    font-weight: 700;
    color: ${({$severity:t,theme:o})=>t==="CRITICAL"?o.colors.status.CRITICAL:o.colors.status.WARNING};
    white-space: nowrap;
  }

  .a-msg {
    font-size: 0.74rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.38;
    margin-top: 2px;
  }

  .a-meta {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.66rem;
    color: ${({theme:t})=>t.colors.textMuted};
    margin-top: 3px;
  }
`,Up=N.p`
  font-size: 0.76rem;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.45;
`,Tv=N.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`,Iv=N.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 14px;
  margin-bottom: -1px;
  background: ${({theme:t})=>t.colors.bgSurface};
  color: ${({theme:t})=>t.colors.textSecondary};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-bottom: ${({$collapsed:t,theme:o})=>t?`1px solid ${o.colors.borderSubtle}`:"1px solid transparent"};
  border-radius: 8px 8px 0 0;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .arrow {
    display: inline-flex;
    transition: transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: rotate(${({$collapsed:t})=>t?"180deg":"0deg"});
  }

  &:hover {
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    color: ${({theme:t})=>t.colors.textPrimary};
  }
`,Rv=N.footer`
  pointer-events: auto;
  align-self: stretch;
  background: ${({theme:t})=>t.colors.bgGlassHeavy};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  box-shadow: ${({theme:t})=>t.shadows.sm};
  padding: ${({$collapsed:t})=>t?"0 14px":"10px 14px"};
  max-height: ${({$collapsed:t})=>t?"0px":"168px"};
  opacity: ${({$collapsed:t})=>t?0:1};
  border-width: ${({$collapsed:t})=>t?"0":"1px"};
  visibility: ${({$collapsed:t})=>t?"hidden":"visible"};
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: max-height 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    padding 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease,
    visibility 220ms;
`,$v=N.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 14px;
  border-right: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  min-width: 204px;
  flex-shrink: 0;

  .dock-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .dock-sub {
    font-size: 0.7rem;
    font-weight: 500;
    color: ${({theme:t})=>t.colors.textSecondary};
    font-variant-numeric: tabular-nums;
  }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    color: ${({theme:t})=>t.colors.textMuted};
  }

  .search-icon {
    position: absolute;
    left: 9px;
    pointer-events: none;
    display: inline-flex;
  }

  .dock-search {
    width: 100%;
    height: 32px;
    background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
    border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
    border-radius: 7px;
    color: ${({theme:t})=>t.colors.textPrimary};
    font-size: 0.76rem;
    padding: 0 10px 0 30px;
    transition: border-color 140ms ease, background 140ms ease;

    &::placeholder {
      color: ${({theme:t})=>t.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:t})=>t.colors.brandPrimary};
      background: ${({theme:t})=>t.colors.bgSurface};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }
`,Av=N.button`
  min-width: 188px;
  flex-shrink: 0;
  padding: 9px 12px;
  background: ${({$selected:t,$inact:o})=>t?"#F1F7F4":o?"#FFFDF5":"#FFFFFF"};
  border: 1px solid
    ${({$selected:t,$inact:o,theme:i})=>t?i.colors.brandPrimary:o?"rgba(180, 83, 9, 0.45)":i.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.md};
  color: ${({theme:t})=>t.colors.textPrimary};
  text-align: left;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    border-color: ${({theme:t})=>t.colors.brandPrimary};
    transform: translateY(-2px);
    box-shadow: ${({theme:t})=>t.shadows.md};
  }

  &:active {
    transform: translateY(0) scale(0.985);
  }

  .n-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    font-weight: 500;
  }

  .n-sector {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: ${({theme:t})=>t.fonts.mono};
    font-size: 0.68rem;
  }

  .n-host {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({theme:t})=>t.colors.textPrimary};
    letter-spacing: -0.01em;
    margin: 4px 0 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }

  .n-prn {
    display: inline-flex;
    align-items: center;
    color: ${({$prnOk:t,theme:o})=>t?o.colors.brandPrimary:o.colors.status.CRITICAL};
    opacity: ${({$prnOk:t})=>t?.72:1};
  }

  .n-metrics {
    font-family: ${({theme:t})=>t.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    margin-bottom: 4px;
  }

  .n-activity {
    font-size: 0.7rem;
    font-weight: 600;
    margin-bottom: 6px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .n-bars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .bar-track {
    height: 3px;
    background: rgba(30, 36, 32, 0.08);
    border-radius: 2px;
    overflow: hidden;
    i {
      display: block;
      height: 100%;
      border-radius: 2px;
    }
  }
`,Pv=N.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Mv=N.div`
  width: 100%;
  max-width: 460px;
  background: ${({theme:t})=>t.colors.bgSurface};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  border-radius: ${({theme:t})=>t.radius.lg};
  padding: 22px 24px;
  box-shadow: ${({theme:t})=>t.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({theme:t})=>t.colors.textPrimary};

  h3 {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: ${({theme:t})=>t.colors.textPrimary};
  }

  p {
    font-size: 0.84rem;
    color: ${({theme:t})=>t.colors.textSecondary};
    line-height: 1.5;
  }

  .modal-result {
    padding: 10px 12px;
    border-radius: 8px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 6px;
    border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  }
`,Ov=N.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 7px;
  border: none;
  background: ${({theme:t})=>t.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Lv=N.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid ${({theme:t})=>t.colors.borderStrong};
  background: ${({theme:t})=>t.colors.bgSurface};
  color: ${({theme:t})=>t.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:t})=>t.colors.bgSurfaceHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }
`,Kc=N.div`
  position: fixed;
  inset: 0;
  background: ${({theme:t})=>t.colors.bgCanvas};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:t})=>t.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:t})=>t.colors.textSecondary};
`,Hp=86400;function Rc(t,o){if(!t)return{isInactive24h:!1,mode:null,seconds:0};const i=t.health_status==="OFFLINE",c=t.last_seen_at?Math.max(0,Math.floor((o-new Date(t.last_seen_at).getTime())/1e3)):0,d=Math.max(0,Math.floor(Number(t.idle_seconds||0)));return i&&c>=Hp?{isInactive24h:!0,mode:"OFFLINE",seconds:c}:!i&&d>=Hp?{isInactive24h:!0,mode:"IDLE",seconds:d}:{isInactive24h:!1,mode:null,seconds:i?c:d}}function wo(t){const o=Math.max(0,Math.floor(Number(t||0)));if(o<60)return`${o}s`;const i=Math.floor(o/60);if(i<60)return`${i}m`;const c=Math.floor(i/60);return c<24?`${c}h ${i%60}m`:`${Math.floor(c/24)}d ${c%24}h`}const Xc="rmm.authToken";function Vp(){try{return window.sessionStorage.getItem(Xc)||null}catch{return null}}function $c(t){try{t?window.sessionStorage.setItem(Xc,t):window.sessionStorage.removeItem(Xc)}catch{}}function zv(){const t=I.useMemo(()=>{const o=new URLSearchParams(window.location.search);return o.get("showcase")!=="1"?null:{angle:o.get("angle")||"iso"}},[]);return t?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(I.Suspense,{fallback:l.jsx(Kc,{children:"Carregando cena de homologação 3D..."}),children:l.jsx(tv,{angle:t.angle})})]}):l.jsx(Fv,{})}function Fv(){var _r,Kn,Xn;const[t,o]=I.useState({token:null,user:null,checking:!0}),[i,c]=I.useState(""),[d,p]=I.useState({open:!1,busy:!1,resultMsg:""}),[m,y]=I.useState([]),[g,T]=I.useState(1),[$,A]=I.useState([]),[P,z]=I.useState("MAP"),[ne,re]=I.useState(null),[K,Y]=I.useState(null),[W,le]=I.useState(null),[Ie,we]=I.useState(null),[pe,V]=I.useState([]),[de,Qe]=I.useState([]),[X,he]=I.useState([]),[te,ee]=I.useState(!1),[Se,ae]=I.useState("ISO"),[Oe,ke]=I.useState("PIXEL"),[F,J]=I.useState(()=>{try{return window.localStorage.getItem("rmm.topControlsCollapsed")==="1"}catch{return!1}}),[O,b]=I.useState(""),[R,Z]=I.useState(()=>{try{return window.localStorage.getItem("rmm.dockCollapsed")==="1"}catch{return!1}}),[Q,xe]=I.useState(()=>{try{return window.localStorage.getItem("rmm.leftRailCollapsed")==="1"}catch{return!1}}),ge=I.useRef(g),ye=I.useRef(K);I.useEffect(()=>{ge.current=g},[g]),I.useEffect(()=>{ye.current=K},[K]),I.useEffect(()=>{try{window.localStorage.setItem("rmm.dockCollapsed",R?"1":"0")}catch{}},[R]),I.useEffect(()=>{try{window.localStorage.setItem("rmm.topControlsCollapsed",F?"1":"0")}catch{}},[F]),I.useEffect(()=>{try{window.localStorage.setItem("rmm.leftRailCollapsed",Q?"1":"0")}catch{}},[Q]);const[G,Ce]=I.useState(Date.now()),[Te,xt]=I.useState({furniture:!0,labels:!0}),[At,yt]=I.useState({isOpen:!1,mode:"CREATE_UNIT",targetSector:null}),vt=I.useCallback((E="")=>{const S=Vp();S&&Ye.logout(S),$c(null),o({token:null,user:null,checking:!1}),ee(!1),y([]),A([]),z("MAP"),we(null),V([]),he([]),c(E)},[]),tn=I.useCallback(async()=>{if(t.token)try{await Ye.downloadAgentInstaller(t.token)}catch(E){(E==null?void 0:E.status)===401&&vt("Sua sessão expirou. Faça login novamente.")}},[t.token,vt]),Ve=I.useCallback(async(E,S)=>{const w=await Ye.login(E,S);return $c(w.token),c(""),o({token:w.token,user:w.user,checking:!1}),w},[]);I.useEffect(()=>{const E=Vp();if(!E){o({token:null,user:null,checking:!1});return}Ye.getMe(E).then(S=>{o({token:E,user:S.user,checking:!1})}).catch(()=>{$c(null),o({token:null,user:null,checking:!1})})},[]);const kt=((_r=t.user)==null?void 0:_r.role)==="ADMIN_N2"||((Kn=t.user)==null?void 0:Kn.role)==="TECH_N1",B=(E,S=null)=>{yt({isOpen:!0,mode:E,targetSector:S})},pn=()=>{yt(E=>({...E,isOpen:!1}))};I.useEffect(()=>{const E=setInterval(()=>Ce(Date.now()),1e3);return()=>clearInterval(E)},[]);const Pt=E=>{xt(S=>({...S,[E]:!S[E]}))},Me=I.useCallback(async(E,S,w)=>{var _;try{const[U,Re,Ee,it]=await Promise.all([Ye.getUnits(E),Ye.getMachines(E),Ye.getTaskCatalog(E),Ye.getAlerts(E)]),Be=Re.machines||[],lt=Be.filter(Mt=>Number(Mt.unit_id)===Number(S));y(U.units||[]),A(Be),Qe(Ee.tasks||[]),he(it.alerts||[]);const Ge=w&&lt.some(Mt=>Mt.id===Number(w))?w:((_=lt[0])==null?void 0:_.id)||null;if(Ge){const[Mt,Jn]=await Promise.all([Ye.getMachineDiagnostics(E,Ge),Ye.getMachineMessages(E,Ge).catch(()=>({messages:[]}))]);we(Mt),V(Jn.messages||[])}else we(null),V([])}catch(U){if((U==null?void 0:U.status)===401){vt("Sua sessão expirou. Faça login novamente.");return}throw U}},[vt]);I.useEffect(()=>{t.token&&Ye.getAgentVersionInfo().then(E=>re(E)).catch(()=>{})},[t.token]),I.useEffect(()=>{if(!t.token)return;const E=t.token,S=Bx(E,{onConnect:()=>ee(!0),onDisconnect:()=>ee(!1),onMachineUpdated:w=>{const _=Number(ge.current),U=Number(w.unit_id),Re=_>0&&U===_;A(Ee=>Ee.some(Be=>Be.id===w.id)?Ee.map(Be=>Be.id===w.id?w:Be):[...Ee,w]),we(Ee=>!Ee||!Ee.machine?Ee:Ee.machine.id===w.id?Re?{...Ee,machine:w}:null:Ee),Ye.getUnits(E).then(Ee=>y(Ee.units||[])).catch(()=>{})},onMachineDeleted:({id:w})=>{A(_=>_.filter(U=>U.id!==Number(w))),we(_=>{var U;return((U=_==null?void 0:_.machine)==null?void 0:U.id)===Number(w)?null:_}),Ye.getUnits(E).then(_=>y(_.units||[])).catch(()=>{})},onAlertTriggered:w=>{he(_=>[w,..._.filter(U=>U.id!==w.id).slice(0,99)])},onTaskUpdated:w=>{const _=ye.current;w&&w.machine_id&&we(U=>{var Be;if(!U||Number((Be=U.machine)==null?void 0:Be.id)!==Number(w.machine_id))return U;const Re=U.tasks||[],it=Re.some(lt=>lt.task_id===w.task_id)?Re.map(lt=>lt.task_id===w.task_id?w:lt):[w,...Re];return{...U,tasks:it}}),w!=null&&w.machine_id&&Number(w.machine_id)===Number(_)&&Ye.getMachineDiagnostics(E,w.machine_id).then(U=>{Number(ye.current)===Number(w.machine_id)&&we(U)}).catch(()=>{})},onAgentMessage:w=>{const _=Number(ye.current);!w||!_||Number(w.machine_id)!==_||V(U=>w.id!==void 0&&U.some(Re=>Re.id===w.id)?U:[...U,w])},onUnitsUpdated:w=>{Array.isArray(w==null?void 0:w.units)&&y(w.units)}});return()=>{S.close()}},[t.token]),I.useEffect(()=>{if(!t.token)return;Me(t.token,g,K).catch(()=>{});const E=setInterval(()=>{Me(t.token,g,K).catch(()=>{})},12e3);return()=>clearInterval(E)},[t.token,g,K,Me]),I.useEffect(()=>{m.length>0&&!m.some(E=>E.id===Number(g))&&(T(m[0].id),le(null),Y(null),we(null))},[m,g]);const We=I.useMemo(()=>$.filter(E=>Number(E.unit_id)===Number(g)),[$,g]),je=m.find(E=>E.id===Number(g))||m[0],Ct=We.find(E=>E.id===Number(K))||We[0]||null,Gt=I.useMemo(()=>((je==null?void 0:je.sectors)||[]).find(E=>E.id===Number(W))||null,[je,W]),qt=I.useMemo(()=>{const E=X.filter(w=>w.status!=="RESOLVED").length,S=$.filter(w=>Rc(w,G).isInactive24h?!X.some(U=>Number(U.machine_id)===Number(w.id)&&U.metric_name==="INACTIVITY_24H"&&U.status!=="RESOLVED"):!1).length;return E+S},[X,$,G]),et=I.useMemo(()=>{if(!O.trim())return We;const E=O.toLowerCase();return We.filter(S=>String(S.hostname||"").toLowerCase().includes(E)||String(S.ip_address||"").toLowerCase().includes(E)||String(S.sector_name||"").toLowerCase().includes(E))},[We,O]),Et=m.reduce((E,S)=>{var w,_,U,Re,Ee;return{total:E.total+(((w=S.summary)==null?void 0:w.total)||0),NORMAL:E.NORMAL+(((_=S.summary)==null?void 0:_.NORMAL)||0),WARNING:E.WARNING+(((U=S.summary)==null?void 0:U.WARNING)||0),CRITICAL:E.CRITICAL+(((Re=S.summary)==null?void 0:Re.CRITICAL)||0),OFFLINE:E.OFFLINE+(((Ee=S.summary)==null?void 0:Ee.OFFLINE)||0)}},{total:0,NORMAL:0,WARNING:0,CRITICAL:0,OFFLINE:0});async function Qn(E){const S=await Ye.dispatchAuthorizedTask(t.token,E);return await Me(t.token,g,E.machineId),S}async function Yt(E,S){return(await Ye.getApprovedPrinters(t.token,E,S)).printers||[]}async function Ft(E){const S=await Ye.refreshMachineTelemetryNow(t.token,E);return await Me(t.token,g,E),S}async function q(E){const S=await Ye.updateMachineAgent(t.token,E);return await Me(t.token,g,E),S}async function ot(){p(E=>({...E,busy:!0,resultMsg:""}));try{const E=await Ye.updateAllAgents(t.token);await Me(t.token,g,K),p({open:!0,busy:!1,resultMsg:E.message||"Ordem de atualização enviada para todas as máquinas."})}catch(E){p({open:!0,busy:!1,resultMsg:`Falha ao enviar atualização: ${E.message}`})}}async function nn(E,S){const w=await Ye.sendMachineMessage(t.token,E,S);return await Me(t.token,g,E),w}async function Wr(E,{unitId:S,sectorId:w}){const _=await Ye.updateMachineLocation(t.token,E,{unitId:S,sectorId:w}),U=P==="MAP"?Number(S):g;return P==="MAP"&&T(Number(S)),await Me(t.token,U,E),_}async function Mn(E,S){const w=await Ye.revokeMachine(t.token,E,S,S?"Revogado pelo painel Pulso RMM":"Reativado pelo painel Pulso RMM");return await Me(t.token,g,K),w}function rn(E){E&&(E.unit_id&&T(Number(E.unit_id)),Y(Number(E.id)),le(null),ae("FOCUS"),z("MAP"))}async function Cr(E){await Ye.deleteMachine(t.token,E),Y(null),await Me(t.token,g,null)}async function Er(E){var _;const S=await Ye.createUnit(t.token,E);Array.isArray(S.units)&&y(S.units);const w=((_=S.unit)==null?void 0:_.id)||g;return T(w),Y(null),le(null),we(null),ae("ISO"),await Me(t.token,w,null),S}async function jr(E,S){const w=await Ye.updateUnit(t.token,E,S);return Array.isArray(w.units)&&y(w.units),await Me(t.token,g,K),w}async function Cn(E,S){var Re;const w=await Ye.deleteUnit(t.token,E,S),_=Array.isArray(w.units)?w.units:[];y(_);const U=w.target_unit_id||((Re=_[0])==null?void 0:Re.id)||1;return T(U),Y(null),le(null),we(null),ae("ISO"),await Me(t.token,U,null),w}async function Qt(E,S){var _;const w=await Ye.createSector(t.token,E,S);return Array.isArray(w.units)&&y(w.units),(_=w.sector)!=null&&_.id&&(le(w.sector.id),ae("SECTOR")),await Me(t.token,g,K),w}async function Gr(E,S){const w=await Ye.updateSector(t.token,E,S);return Array.isArray(w.units)&&y(w.units),await Me(t.token,g,K),w}async function qr(E,S){const w=await Ye.deleteSector(t.token,E,S);return Array.isArray(w.units)&&y(w.units),Number(W)===Number(E)&&(le(null),ae("ISO")),await Me(t.token,g,K),w}return t.checking?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(Kc,{children:"Validando sessão Pulso RMM..."})]}):!t.token||!t.user?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(t1,{onAuthenticated:Ve,sessionNotice:i})]}):l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),P==="MAP"&&(Oe==="PIXEL"?l.jsx(uy,{activeUnit:je,machines:We,selectedMachine:Ct,selectedSector:Gt,onSelectMachine:E=>{Y(E.id),le(null)}}):l.jsx(I.Suspense,{fallback:l.jsx(Kc,{children:"Carregando Gêmeo Digital 3D..."}),children:l.jsx(ev,{activeUnit:je,machines:We,selectedMachine:Ct,selectedSector:Gt,cameraMode:Se,roomVariant:r1(),sceneLayers:Te,onUserOrbit:()=>{Se!=="FREE"&&ae("FREE")},onSelectMachine:E=>{Y(E.id),le(null),ae("FOCUS")}})})),l.jsxs(lv,{children:[l.jsxs(av,{children:[l.jsxs(fv,{children:[l.jsx(Gc,{size:26}),l.jsxs("div",{className:"brand-copy",children:[l.jsx("span",{className:"brand-title",children:"Pulso RMM"}),l.jsxs("span",{className:"brand-status",children:[l.jsx(Dp,{$color:te?ie.colors.status.NORMAL:ie.colors.status.WARNING}),l.jsx("span",{children:te?"Tempo real ativo":"Reconectando"})]})]})]}),l.jsx(bo,{"aria-hidden":"true"}),l.jsxs(cv,{"aria-label":"Módulos do Pulso RMM",children:[l.jsxs(Xi,{type:"button",$active:P==="MAP","aria-current":P==="MAP"?"page":void 0,onClick:()=>z("MAP"),children:[l.jsx($y,{size:13}),l.jsx("span",{children:"Mapa"})]}),l.jsxs(Xi,{type:"button",$active:P==="INVENTORY","aria-current":P==="INVENTORY"?"page":void 0,onClick:()=>z("INVENTORY"),children:[l.jsx(Ay,{size:13}),l.jsx("span",{children:"Inventário"})]}),l.jsxs(Xi,{type:"button",$active:P==="MONITORING","aria-current":P==="MONITORING"?"page":void 0,onClick:()=>z("MONITORING"),children:[l.jsx(Py,{size:13}),l.jsx("span",{children:"Monitoramento"}),qt>0&&l.jsx("span",{className:"m-badge",children:qt})]}),l.jsxs(Xi,{type:"button",$active:P==="SETTINGS","aria-current":P==="SETTINGS"?"page":void 0,onClick:()=>z("SETTINGS"),children:[l.jsx(My,{size:13}),l.jsx("span",{children:"Configurações"})]})]}),P==="MAP"?l.jsxs(l.Fragment,{children:[l.jsx(bo,{"aria-hidden":"true"}),l.jsxs(pv,{"aria-label":"Unidades de Saúde",children:[l.jsx(hv,{children:m.map(E=>{var _,U;const S=E.id===Number(g),w=me(E.name);return l.jsxs(gv,{type:"button",$active:S,"aria-current":S?"page":void 0,title:`${w} (${((_=E.summary)==null?void 0:_.total)||0} estações)`,onClick:()=>{T(E.id),Y(null),le(null),we(null),ae("ISO")},children:[l.jsx("span",{className:"u-name",children:w}),l.jsx("span",{className:"u-count",children:((U=E.summary)==null?void 0:U.total)||0})]},E.id)})}),kt&&l.jsxs(mv,{children:[l.jsx(Ji,{type:"button",$accent:!0,$iconOnly:!0,onClick:()=>B("CREATE_UNIT"),title:"Cadastrar nova Unidade de Saúde","aria-label":"Cadastrar nova Unidade de Saúde",children:l.jsx(vp,{size:14})}),je&&l.jsx(Ji,{type:"button",$iconOnly:!0,onClick:()=>B("EDIT_UNIT"),title:"Editar ou excluir unidade selecionada","aria-label":"Editar unidade selecionada",children:l.jsx(bp,{size:14})})]})]})]}):l.jsx("div",{style:{flex:1}}),l.jsxs(xv,{children:[l.jsxs(Ji,{type:"button",onClick:tn,title:"Baixar instalador autenticado do Agente Windows (.exe)",children:[l.jsx(fy,{size:14}),l.jsx("span",{className:"hide-compact",children:"Agente"})]}),((Xn=t.user)==null?void 0:Xn.role)==="ADMIN_N2"&&l.jsxs(Ji,{type:"button",$accent:!0,onClick:()=>p({open:!0,busy:!1,resultMsg:""}),title:"Enviar atualização silenciosa (OTA) para todas as máquinas",children:[l.jsx(Oh,{size:14}),l.jsx("span",{className:"hide-compact",children:"Atualizar todos"})]}),l.jsx(bo,{"aria-hidden":"true"}),l.jsxs(yv,{title:t.user.email,children:[l.jsx("span",{className:"u-avatar",children:iv(t.user.name)}),l.jsxs("div",{className:"u-meta",children:[l.jsx("span",{className:"u-name",children:Lh(t.user.name)}),l.jsx("span",{className:"u-role",children:sv[t.user.role]||t.user.role})]}),l.jsx(el,{type:"button",$danger:!0,onClick:()=>vt(""),title:"Encerrar sessão","aria-label":"Encerrar sessão",children:l.jsx(py,{size:14})})]})]})]}),P==="MAP"?l.jsxs(vv,{children:[l.jsx(bv,{children:l.jsx(wv,{children:F?l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{fontFamily:ie.fonts.mono,fontSize:"0.72rem",fontWeight:600,color:ie.colors.textSecondary,padding:"0 8px"},children:Oe==="PIXEL"?"Pixel Art":`3D · ${Se}`}),l.jsxs(Rn,{type:"button",onClick:()=>J(!1),title:"Expandir controles de visualização","aria-expanded":"false",children:[l.jsx(bc,{size:14}),l.jsx("span",{children:"Visualização"})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs(Rn,{type:"button",$active:Oe==="PIXEL",onClick:()=>ke("PIXEL"),title:"Planta isométrica em Pixel Art",children:[l.jsx(ky,{size:13}),l.jsx("span",{children:"Pixel Art"})]}),l.jsxs(Rn,{type:"button",$active:Oe==="3D",onClick:()=>ke("3D"),title:"Maquete tridimensional interativa",children:[l.jsx(Sy,{size:13}),l.jsx("span",{children:"3D"})]}),Oe==="3D"&&l.jsxs(l.Fragment,{children:[l.jsx(bo,{"aria-hidden":"true"}),l.jsx(Rn,{type:"button",$active:Se==="ISO",onClick:()=>{le(null),ae("ISO")},children:"ISO"}),l.jsx(Rn,{type:"button",$active:Se==="TOP",onClick:()=>ae("TOP"),children:"Topo"}),l.jsx(Rn,{type:"button",$active:Se==="FOCUS",onClick:()=>ae("FOCUS"),children:"Foco"}),l.jsx(Rn,{type:"button",$active:Se==="ORBIT",onClick:()=>ae(E=>E==="ORBIT"?"ISO":"ORBIT"),title:"Giro orbital suave ao redor da maquete",children:"360°"}),l.jsx(bo,{"aria-hidden":"true"}),l.jsxs(Rn,{type:"button",$active:Te.furniture,onClick:()=>Pt("furniture"),title:"Alternar mobiliário 3D",children:[l.jsx(vy,{size:13}),l.jsx("span",{children:"Mobiliário"})]}),l.jsxs(Rn,{type:"button",$active:Te.labels,onClick:()=>Pt("labels"),title:"Alternar rótulos das estações",children:[l.jsx(by,{size:13}),l.jsx("span",{children:"Rótulos"})]})]}),l.jsx(bo,{"aria-hidden":"true"}),l.jsx(Rn,{type:"button",onClick:()=>J(!0),title:"Recolher barra de visualização","aria-label":"Recolher barra de visualização","aria-expanded":"true",children:l.jsx(bc,{size:14,style:{transform:"rotate(180deg)"}})})]})})}),l.jsxs(Sv,{children:[(()=>{const S=[...We.map(_=>({machine:_,info:Rc(_,G)})).filter(({info:_})=>_.isInactive24h).filter(({machine:_})=>!X.some(U=>Number(U.machine_id)===Number(_.id)&&U.metric_name==="INACTIVITY_24H"&&U.status!=="RESOLVED")).map(({machine:_,info:U})=>({id:`live-inact-${_.id}`,machine_id:_.id,hostname:_.hostname,unit_name:_.unit_name||(je==null?void 0:je.name)||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"Inativo >24h",message:U.mode==="OFFLINE"?`Sem comunicação há ${wo(U.seconds)} (>24h).`:`Ligado sem interação há ${wo(U.seconds)} (>24h).`})),...X],w=S.filter(_=>_.status!=="RESOLVED").length;return Q?l.jsxs(kv,{type:"button",onClick:()=>xe(!1),title:"Expandir painel lateral de rede, setores e alertas","aria-expanded":"false",children:[l.jsx(wy,{size:15}),l.jsx("span",{children:"Painel"}),w>0&&l.jsx("span",{className:"alert-pill",children:w})]}):l.jsxs(Cv,{"aria-label":"Resumo da rede, setores e alertas",children:[l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsx("span",{className:"sec-title",children:"Rede global"}),l.jsxs("div",{className:"sec-actions",children:[l.jsxs("span",{className:"sec-meta",children:[Et.total," PCs"]}),l.jsx(el,{type:"button",onClick:()=>xe(!0),title:"Recolher painel lateral","aria-label":"Recolher painel lateral",children:l.jsx(Mh,{size:14})})]})]}),l.jsxs(Ev,{children:[l.jsxs(Zi,{$color:ie.colors.status.NORMAL,children:[l.jsx("span",{className:"num",children:Et.NORMAL+Et.WARNING+Et.CRITICAL}),l.jsx("span",{className:"lbl",children:"Online"})]}),l.jsxs(Zi,{$color:ie.colors.status.WARNING,children:[l.jsx("span",{className:"num",children:Et.WARNING}),l.jsx("span",{className:"lbl",children:"Atenção"})]}),l.jsxs(Zi,{$color:ie.colors.status.CRITICAL,children:[l.jsx("span",{className:"num",children:Et.CRITICAL}),l.jsx("span",{className:"lbl",children:"Crítico"})]}),l.jsxs(Zi,{$color:ie.colors.status.OFFLINE,children:[l.jsx("span",{className:"num",children:Et.OFFLINE}),l.jsx("span",{className:"lbl",children:"Offline"})]})]})]}),l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsxs("span",{className:"sec-title",children:["Setores",l.jsxs("span",{className:"sec-meta",children:["(",((je==null?void 0:je.sectors)||[]).length,")"]})]}),l.jsxs("div",{className:"sec-actions",children:[W&&l.jsxs(Bp,{type:"button",onClick:()=>{le(null),ae("ISO")},title:"Voltar para a visão geral da maquete",children:[l.jsx(dy,{size:12}),l.jsx("span",{children:"Geral"})]}),kt&&je&&l.jsxs(Bp,{type:"button",onClick:()=>B("CREATE_SECTOR"),title:"Criar novo setor nesta unidade",children:[l.jsx(vp,{size:12}),l.jsx("span",{children:"Setor"})]})]})]}),((je==null?void 0:je.sectors)||[]).length===0?l.jsxs(Up,{children:["Nenhum setor cadastrado."," ",kt&&'Use "+ Setor" para adicionar uma sala.']}):l.jsx(jv,{children:((je==null?void 0:je.sectors)||[]).map(_=>{const U=We.filter(Ee=>Number(Ee.sector_id)===Number(_.id)),Re=W===_.id;return l.jsxs(_v,{$selected:Re,onClick:()=>{Re?(le(null),ae("ISO")):(le(_.id),ae("SECTOR"))},title:`Filtrar e aproximar no setor ${me(_.name)}`,children:[l.jsxs("div",{className:"s-info",children:[l.jsx("div",{className:"s-name",children:me(_.name)}),l.jsx("div",{className:"s-code",children:_.code})]}),l.jsxs("div",{className:"s-right",children:[l.jsx("span",{className:"s-count",children:U.length}),kt&&l.jsxs("div",{className:"s-controls",children:[l.jsx(el,{type:"button",title:`Editar setor ${me(_.name)}`,"aria-label":`Editar setor ${me(_.name)}`,onClick:Ee=>{Ee.stopPropagation(),B("EDIT_SECTOR",_)},children:l.jsx(bp,{size:13})}),l.jsx(el,{type:"button",$danger:!0,title:`Excluir setor ${me(_.name)}`,"aria-label":`Excluir setor ${me(_.name)}`,onClick:Ee=>{Ee.stopPropagation(),B("DELETE_SECTOR",_)},children:l.jsx(qc,{size:13})})]})]})]},_.id)})})]}),l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsx("span",{className:"sec-title",children:"Alertas recentes"}),l.jsxs("span",{className:"sec-meta",children:[w," ",w===1?"ativo":"ativos"]})]}),S.length===0?l.jsx(Up,{children:"Nenhum alerta crítico ou de inatividade (>24h) no momento."}):S.slice(0,5).map(_=>l.jsxs(Nv,{type:"button",$severity:_.severity,$clickable:!!_.machine_id,onClick:()=>{_.machine_id&&(Y(Number(_.machine_id)),ae("FOCUS"))},title:_.machine_id?"Clique para focar esta estação":void 0,children:[l.jsxs("div",{className:"a-top",children:[l.jsx("span",{children:me(_.hostname||`PC #${_.machine_id}`)}),l.jsx("span",{className:"a-tag",children:_.metric_name==="INACTIVITY_24H"&&_.status!=="RESOLVED"?"Inativo >24h":_.status||_.severity})]}),l.jsx("div",{className:"a-msg",children:me(_.message)}),l.jsxs("div",{className:"a-meta",children:[me(_.unit_name||""),_.external_ticket_id?` · #${_.external_ticket_id}`:""]})]},_.id||_.incident_key))]})]})})(),l.jsx(D1,{diagnostics:Ie,units:m,chatMessages:pe,taskCatalog:de,currentUser:t.user||{name:"Operador",role:"VIEWER"},onDispatchTask:Qn,onLoadPrinters:Yt,onRefreshTelemetryNow:Ft,onUpdateMachineAgent:q,onSendMessage:nn,onUpdateLocation:Wr,onDeleteMachine:Cr,onFocusCamera:()=>ae("FOCUS")})]}),l.jsxs(Tv,{children:[l.jsxs(Iv,{type:"button",$collapsed:R,onClick:()=>Z(E=>!E),"aria-expanded":!R,"aria-controls":"rmm-bottom-dock","aria-label":R?"Expandir lista de computadores":"Recolher lista de computadores",children:[l.jsx("span",{className:"arrow","aria-hidden":"true",children:l.jsx(bc,{size:13})}),l.jsx("span",{children:R?`${We.length} ${We.length===1?"estação":"estações"} na unidade`:"Ocultar estações"})]}),l.jsxs(Rv,{id:"rmm-bottom-dock",$collapsed:R,"aria-hidden":R,children:[l.jsxs($v,{children:[l.jsxs("div",{children:[l.jsx("div",{className:"dock-title",children:me((je==null?void 0:je.name)||"Unidade")}),l.jsxs("div",{className:"dock-sub",children:[et.length," de ",We.length," estações"]})]}),l.jsxs("div",{className:"search-wrap",children:[l.jsx("span",{className:"search-icon",children:l.jsx(hy,{size:13})}),l.jsx("input",{className:"dock-search",type:"text","aria-label":"Filtrar estações por hostname, IP ou setor",placeholder:"Filtrar hostname, IP...",value:O,onChange:E=>b(E.target.value)})]})]}),et.length===0&&l.jsxs("div",{style:{fontSize:"0.78rem",color:ie.colors.textSecondary,display:"flex",alignItems:"center",gap:"12px"},children:[l.jsx("span",{children:"Nenhuma estação encontrada nesta unidade."}),l.jsx("button",{type:"button",onClick:tn,style:{background:"transparent",border:"none",padding:0,cursor:"pointer",color:ie.colors.brandPrimary,textDecoration:"underline",fontWeight:600,fontSize:"inherit"},children:"Baixar Agente (.exe)"})]}),et.map(E=>{const S=ie.colors.status[E.health_status]||ie.colors.status.NORMAL,w=(Ct==null?void 0:Ct.id)===E.id,_=Math.min(100,Math.max(0,Number(E.cpu_usage_pct||0))),U=Math.min(100,Math.max(0,Number(E.ram_usage_pct||0))),Re=Math.min(100,Math.max(0,Number(E.disk_usage_pct||0))),Ee=Math.max(0,Math.floor(Number(E.idle_seconds||0))),it=vh(E.agent_version,"2.3.0"),Be=Rc(E,G),lt=E.last_seen_at?Math.max(0,Math.floor((G-new Date(E.last_seen_at).getTime())/1e3)):0,Ge=Be.isInactive24h?`Inativo >24h (${wo(Be.seconds)})`:E.health_status==="OFFLINE"?`Desligado há ${wo(lt)}`:it?`Ativo (${E.agent_version||"2.2.0"})`:Ee<180?`Em uso (${wo(Ee)})`:`Ocioso há ${wo(Ee)}`,Mt=Be.isInactive24h?ie.colors.status.CRITICAL:E.health_status==="OFFLINE"?ie.colors.status.OFFLINE:Ee<180?ie.colors.status.NORMAL:ie.colors.status.WARNING,Jn=E.health_status==="NORMAL"?"Online":E.health_status==="WARNING"?"Atenção":E.health_status==="CRITICAL"?"Crítico":"Offline";return l.jsxs(Av,{type:"button",$selected:w,$inact:Be.isInactive24h,$prnOk:!!E.spooler_running,onClick:()=>{Y(E.id),ae("FOCUS")},children:[l.jsxs("div",{className:"n-top",children:[l.jsxs("span",{className:"n-sector",children:[l.jsx(Dp,{$color:S}),E.sector_code]}),l.jsx("span",{children:Jn})]}),l.jsxs("div",{className:"n-host",children:[l.jsx("span",{children:E.hostname}),l.jsx("span",{className:"n-prn",title:E.spooler_running?"Spooler de impressão ativo":"Spooler de impressão parado",children:l.jsx(Eo,{size:13})})]}),l.jsxs("div",{className:"n-metrics",children:["CPU ",_.toFixed(0),"% · RAM ",U.toFixed(0),"% · ",E.ip_address]}),l.jsxs("div",{className:"n-activity",style:{color:Mt},children:[Be.isInactive24h&&l.jsx(gl,{size:12}),l.jsx("span",{children:Ge})]}),l.jsxs("div",{className:"n-bars",children:[l.jsx("div",{className:"bar-track",title:`CPU: ${_.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${_}%`,background:ie.colors.status.NORMAL}})}),l.jsx("div",{className:"bar-track",title:`RAM: ${U.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${U}%`,background:ie.colors.brandPrimaryLight}})}),l.jsx("div",{className:"bar-track",title:`Disco: ${Re.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${Re}%`,background:ie.colors.status.OFFLINE}})})]})]},E.id)})]})]})]}):l.jsx(uv,{children:l.jsxs(I.Suspense,{fallback:l.jsx(dv,{children:"Carregando módulo..."}),children:[P==="INVENTORY"&&l.jsx(nv,{token:t.token,units:m,allMachines:$,currentUser:t.user,latestAgentVersion:(ne==null?void 0:ne.latest_version)||"2.6.1-native-exe",onOpenMachineInMap:rn,onUpdateLocation:Wr,onRevokeMachine:Mn,onRefreshFleet:()=>Me(t.token,g,K)}),P==="MONITORING"&&l.jsx(rv,{token:t.token,units:m,allMachines:$,alerts:X,currentUser:t.user,onOpenMachineInMap:rn,onRefreshFleet:()=>Me(t.token,g,K)}),P==="SETTINGS"&&l.jsx(ov,{token:t.token,currentUser:t.user,allMachines:$,agentInfo:ne,onDownloadAgent:tn,onRevokeMachine:Mn})]})})]}),l.jsx(Z1,{isOpen:At.isOpen,initialMode:At.mode,units:m,activeUnit:je,targetSector:At.targetSector,machines:We,onClose:pn,onCreateUnit:Er,onUpdateUnit:jr,onDeleteUnit:Cn,onCreateSector:Qt,onUpdateSector:Gr,onDeleteSector:qr}),d.open&&l.jsx(Pv,{onClick:()=>!d.busy&&p({open:!1,busy:!1,resultMsg:""}),children:l.jsxs(Mv,{onClick:E=>E.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsx("h3",{children:"Confirmar atualização global de agentes"}),l.jsxs("p",{children:["Esta operação enviará ordem de atualização silenciosa (com verificação obrigatória SHA-256) para todas as ",l.jsxs("strong",{children:[Et.total," estação(ões)"]})," cadastradas no painel."]}),d.resultMsg&&l.jsx("div",{className:"modal-result",children:d.resultMsg}),l.jsxs("div",{className:"modal-actions",children:[l.jsx(Lv,{type:"button",disabled:d.busy,onClick:()=>p({open:!1,busy:!1,resultMsg:""}),children:d.resultMsg?"Fechar":"Cancelar"}),!d.resultMsg&&l.jsx(Ov,{type:"button",disabled:d.busy,onClick:ot,children:d.busy?"Enviando...":"Confirmar atualização"})]})]})})]})}L0.createRoot(document.getElementById("root")).render(l.jsx($t.StrictMode,{children:l.jsx(zv,{})}));export{qc as A,Sl as E,Yc as I,Dv as S,lu as a,Jc as b,N0 as c,L0 as d,fy as e,me as f,N as g,Vv as h,vh as i,l as j,vy as k,hy as l,Vn as m,Ui as n,_y as o,bp as p,jy as q,I as r,Hv as s,Bi as t,Ye as u,Uv as v,Bv as w,Ey as x,Cy as y,vp as z};
