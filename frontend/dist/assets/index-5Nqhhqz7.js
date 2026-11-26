const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DigitalTwin3D-CkdNjEiK.js","assets/Gltf-CA0dpHHn.js","assets/ModelShowcase-OPMiNBgj.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const p of d)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function i(d){const p={};return d.integrity&&(p.integrity=d.integrity),d.referrerPolicy&&(p.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?p.credentials="include":d.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(d){if(d.ep)return;d.ep=!0;const p=i(d);fetch(d.href,p)}})();function N0(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var sc={exports:{}},ds={},ic={exports:{}},Le={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wf;function T0(){if(Wf)return Le;Wf=1;var t=Symbol.for("react.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),p=Symbol.for("react.provider"),m=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),_=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),$=Symbol.iterator;function A(w){return w===null||typeof w!="object"?null:(w=$&&w[$]||w["@@iterator"],typeof w=="function"?w:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ne=Object.assign,re={};function le(w,I,K){this.props=w,this.context=I,this.refs=re,this.updater=K||D}le.prototype.isReactComponent={},le.prototype.setState=function(w,I){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,I,"setState")},le.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function te(){}te.prototype=le.prototype;function H(w,I,K){this.props=w,this.context=I,this.refs=re,this.updater=K||D}var de=H.prototype=new te;de.constructor=H,ne(de,le.prototype),de.isPureReactComponent=!0;var je=Array.isArray,ye=Object.prototype.hasOwnProperty,he={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function fe(w,I,K){var G,ve={},xe=null,Se=null;if(I!=null)for(G in I.ref!==void 0&&(Se=I.ref),I.key!==void 0&&(xe=""+I.key),I)ye.call(I,G)&&!U.hasOwnProperty(G)&&(ve[G]=I[G]);var Y=arguments.length-2;if(Y===1)ve.children=K;else if(1<Y){for(var ke=Array(Y),_e=0;_e<Y;_e++)ke[_e]=arguments[_e+2];ve.children=ke}if(w&&w.defaultProps)for(G in Y=w.defaultProps,Y)ve[G]===void 0&&(ve[G]=Y[G]);return{$$typeof:t,type:w,key:xe,ref:Se,props:ve,_owner:he.current}}function Ve(w,I){return{$$typeof:t,type:w.type,key:I,ref:w.ref,props:w.props,_owner:w._owner}}function ee(w){return typeof w=="object"&&w!==null&&w.$$typeof===t}function ge(w){var I={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(K){return I[K]})}var X=/\/+/g;function J(w,I){return typeof w=="object"&&w!==null&&w.key!=null?ge(""+w.key):I.toString(36)}function Ie(w,I,K,G,ve){var xe=typeof w;(xe==="undefined"||xe==="boolean")&&(w=null);var Se=!1;if(w===null)Se=!0;else switch(xe){case"string":case"number":Se=!0;break;case"object":switch(w.$$typeof){case t:case o:Se=!0}}if(Se)return Se=w,ve=ve(Se),w=G===""?"."+J(Se,0):G,je(ve)?(K="",w!=null&&(K=w.replace(X,"$&/")+"/"),Ie(ve,I,K,"",function(_e){return _e})):ve!=null&&(ee(ve)&&(ve=Ve(ve,K+(!ve.key||Se&&Se.key===ve.key?"":(""+ve.key).replace(X,"$&/")+"/")+w)),I.push(ve)),1;if(Se=0,G=G===""?".":G+":",je(w))for(var Y=0;Y<w.length;Y++){xe=w[Y];var ke=G+J(xe,Y);Se+=Ie(xe,I,K,ke,ve)}else if(ke=A(w),typeof ke=="function")for(w=ke.call(w),Y=0;!(xe=w.next()).done;)xe=xe.value,ke=G+J(xe,Y++),Se+=Ie(xe,I,K,ke,ve);else if(xe==="object")throw I=String(w),Error("Objects are not valid as a React child (found: "+(I==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":I)+"). If you meant to render a collection of children, use an array instead.");return Se}function Ce(w,I,K){if(w==null)return w;var G=[],ve=0;return Ie(w,G,"","",function(xe){return I.call(K,xe,ve++)}),G}function Me(w){if(w._status===-1){var I=w._result;I=I(),I.then(function(K){(w._status===0||w._status===-1)&&(w._status=1,w._result=K)},function(K){(w._status===0||w._status===-1)&&(w._status=2,w._result=K)}),w._status===-1&&(w._status=0,w._result=I)}if(w._status===1)return w._result.default;throw w._result}var ae={current:null},F={transition:null},Q={ReactCurrentDispatcher:ae,ReactCurrentBatchConfig:F,ReactCurrentOwner:he};function O(){throw Error("act(...) is not supported in production builds of React.")}return Le.Children={map:Ce,forEach:function(w,I,K){Ce(w,function(){I.apply(this,arguments)},K)},count:function(w){var I=0;return Ce(w,function(){I++}),I},toArray:function(w){return Ce(w,function(I){return I})||[]},only:function(w){if(!ee(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},Le.Component=le,Le.Fragment=i,Le.Profiler=d,Le.PureComponent=H,Le.StrictMode=c,Le.Suspense=x,Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Q,Le.act=O,Le.cloneElement=function(w,I,K){if(w==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+w+".");var G=ne({},w.props),ve=w.key,xe=w.ref,Se=w._owner;if(I!=null){if(I.ref!==void 0&&(xe=I.ref,Se=he.current),I.key!==void 0&&(ve=""+I.key),w.type&&w.type.defaultProps)var Y=w.type.defaultProps;for(ke in I)ye.call(I,ke)&&!U.hasOwnProperty(ke)&&(G[ke]=I[ke]===void 0&&Y!==void 0?Y[ke]:I[ke])}var ke=arguments.length-2;if(ke===1)G.children=K;else if(1<ke){Y=Array(ke);for(var _e=0;_e<ke;_e++)Y[_e]=arguments[_e+2];G.children=Y}return{$$typeof:t,type:w.type,key:ve,ref:xe,props:G,_owner:Se}},Le.createContext=function(w){return w={$$typeof:m,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},w.Provider={$$typeof:p,_context:w},w.Consumer=w},Le.createElement=fe,Le.createFactory=function(w){var I=fe.bind(null,w);return I.type=w,I},Le.createRef=function(){return{current:null}},Le.forwardRef=function(w){return{$$typeof:v,render:w}},Le.isValidElement=ee,Le.lazy=function(w){return{$$typeof:T,_payload:{_status:-1,_result:w},_init:Me}},Le.memo=function(w,I){return{$$typeof:_,type:w,compare:I===void 0?null:I}},Le.startTransition=function(w){var I=F.transition;F.transition={};try{w()}finally{F.transition=I}},Le.unstable_act=O,Le.useCallback=function(w,I){return ae.current.useCallback(w,I)},Le.useContext=function(w){return ae.current.useContext(w)},Le.useDebugValue=function(){},Le.useDeferredValue=function(w){return ae.current.useDeferredValue(w)},Le.useEffect=function(w,I){return ae.current.useEffect(w,I)},Le.useId=function(){return ae.current.useId()},Le.useImperativeHandle=function(w,I,K){return ae.current.useImperativeHandle(w,I,K)},Le.useInsertionEffect=function(w,I){return ae.current.useInsertionEffect(w,I)},Le.useLayoutEffect=function(w,I){return ae.current.useLayoutEffect(w,I)},Le.useMemo=function(w,I){return ae.current.useMemo(w,I)},Le.useReducer=function(w,I,K){return ae.current.useReducer(w,I,K)},Le.useRef=function(w){return ae.current.useRef(w)},Le.useState=function(w){return ae.current.useState(w)},Le.useSyncExternalStore=function(w,I,K){return ae.current.useSyncExternalStore(w,I,K)},Le.useTransition=function(){return ae.current.useTransition()},Le.version="18.3.1",Le}var Gf;function Jc(){return Gf||(Gf=1,ic.exports=T0()),ic.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qf;function I0(){if(qf)return ds;qf=1;var t=Jc(),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,d=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function m(v,x,_){var T,$={},A=null,D=null;_!==void 0&&(A=""+_),x.key!==void 0&&(A=""+x.key),x.ref!==void 0&&(D=x.ref);for(T in x)c.call(x,T)&&!p.hasOwnProperty(T)&&($[T]=x[T]);if(v&&v.defaultProps)for(T in x=v.defaultProps,x)$[T]===void 0&&($[T]=x[T]);return{$$typeof:o,type:v,key:A,ref:D,props:$,_owner:d.current}}return ds.Fragment=i,ds.jsx=m,ds.jsxs=m,ds}var Yf;function R0(){return Yf||(Yf=1,sc.exports=I0()),sc.exports}var l=R0(),N=Jc();const Lt=N0(N);var Li={},lc={exports:{}},Yt={},ac={exports:{}},cc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qf;function $0(){return Qf||(Qf=1,(function(t){function o(F,Q){var O=F.length;F.push(Q);e:for(;0<O;){var w=O-1>>>1,I=F[w];if(0<d(I,Q))F[w]=Q,F[O]=I,O=w;else break e}}function i(F){return F.length===0?null:F[0]}function c(F){if(F.length===0)return null;var Q=F[0],O=F.pop();if(O!==Q){F[0]=O;e:for(var w=0,I=F.length,K=I>>>1;w<K;){var G=2*(w+1)-1,ve=F[G],xe=G+1,Se=F[xe];if(0>d(ve,O))xe<I&&0>d(Se,ve)?(F[w]=Se,F[xe]=O,w=xe):(F[w]=ve,F[G]=O,w=G);else if(xe<I&&0>d(Se,O))F[w]=Se,F[xe]=O,w=xe;else break e}}return Q}function d(F,Q){var O=F.sortIndex-Q.sortIndex;return O!==0?O:F.id-Q.id}if(typeof performance=="object"&&typeof performance.now=="function"){var p=performance;t.unstable_now=function(){return p.now()}}else{var m=Date,v=m.now();t.unstable_now=function(){return m.now()-v}}var x=[],_=[],T=1,$=null,A=3,D=!1,ne=!1,re=!1,le=typeof setTimeout=="function"?setTimeout:null,te=typeof clearTimeout=="function"?clearTimeout:null,H=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function de(F){for(var Q=i(_);Q!==null;){if(Q.callback===null)c(_);else if(Q.startTime<=F)c(_),Q.sortIndex=Q.expirationTime,o(x,Q);else break;Q=i(_)}}function je(F){if(re=!1,de(F),!ne)if(i(x)!==null)ne=!0,Me(ye);else{var Q=i(_);Q!==null&&ae(je,Q.startTime-F)}}function ye(F,Q){ne=!1,re&&(re=!1,te(fe),fe=-1),D=!0;var O=A;try{for(de(Q),$=i(x);$!==null&&(!($.expirationTime>Q)||F&&!ge());){var w=$.callback;if(typeof w=="function"){$.callback=null,A=$.priorityLevel;var I=w($.expirationTime<=Q);Q=t.unstable_now(),typeof I=="function"?$.callback=I:$===i(x)&&c(x),de(Q)}else c(x);$=i(x)}if($!==null)var K=!0;else{var G=i(_);G!==null&&ae(je,G.startTime-Q),K=!1}return K}finally{$=null,A=O,D=!1}}var he=!1,U=null,fe=-1,Ve=5,ee=-1;function ge(){return!(t.unstable_now()-ee<Ve)}function X(){if(U!==null){var F=t.unstable_now();ee=F;var Q=!0;try{Q=U(!0,F)}finally{Q?J():(he=!1,U=null)}}else he=!1}var J;if(typeof H=="function")J=function(){H(X)};else if(typeof MessageChannel<"u"){var Ie=new MessageChannel,Ce=Ie.port2;Ie.port1.onmessage=X,J=function(){Ce.postMessage(null)}}else J=function(){le(X,0)};function Me(F){U=F,he||(he=!0,J())}function ae(F,Q){fe=le(function(){F(t.unstable_now())},Q)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){ne||D||(ne=!0,Me(ye))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Ve=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return A},t.unstable_getFirstCallbackNode=function(){return i(x)},t.unstable_next=function(F){switch(A){case 1:case 2:case 3:var Q=3;break;default:Q=A}var O=A;A=Q;try{return F()}finally{A=O}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,Q){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var O=A;A=F;try{return Q()}finally{A=O}},t.unstable_scheduleCallback=function(F,Q,O){var w=t.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?w+O:w):O=w,F){case 1:var I=-1;break;case 2:I=250;break;case 5:I=1073741823;break;case 4:I=1e4;break;default:I=5e3}return I=O+I,F={id:T++,callback:Q,priorityLevel:F,startTime:O,expirationTime:I,sortIndex:-1},O>w?(F.sortIndex=O,o(_,F),i(x)===null&&F===i(_)&&(re?(te(fe),fe=-1):re=!0,ae(je,O-w))):(F.sortIndex=I,o(x,F),ne||D||(ne=!0,Me(ye))),F},t.unstable_shouldYield=ge,t.unstable_wrapCallback=function(F){var Q=A;return function(){var O=A;A=Q;try{return F.apply(this,arguments)}finally{A=O}}}})(cc)),cc}var Kf;function A0(){return Kf||(Kf=1,ac.exports=$0()),ac.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Xf;function P0(){if(Xf)return Yt;Xf=1;var t=Jc(),o=A0();function i(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,d={};function p(e,n){m(e,n),m(e+"Capture",n)}function m(e,n){for(d[e]=n,e=0;e<n.length;e++)c.add(n[e])}var v=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),x=Object.prototype.hasOwnProperty,_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,T={},$={};function A(e){return x.call($,e)?!0:x.call(T,e)?!1:_.test(e)?$[e]=!0:(T[e]=!0,!1)}function D(e,n,r,s){if(r!==null&&r.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function ne(e,n,r,s){if(n===null||typeof n>"u"||D(e,n,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function re(e,n,r,s,a,u,f){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=n,this.sanitizeURL=u,this.removeEmptyString=f}var le={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){le[e]=new re(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];le[n]=new re(n,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){le[e]=new re(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){le[e]=new re(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){le[e]=new re(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){le[e]=new re(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){le[e]=new re(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){le[e]=new re(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){le[e]=new re(e,5,!1,e.toLowerCase(),null,!1,!1)});var te=/[\-:]([a-z])/g;function H(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(te,H);le[n]=new re(n,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(te,H);le[n]=new re(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(te,H);le[n]=new re(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){le[e]=new re(e,1,!1,e.toLowerCase(),null,!1,!1)}),le.xlinkHref=new re("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){le[e]=new re(e,1,!1,e.toLowerCase(),null,!0,!0)});function de(e,n,r,s){var a=le.hasOwnProperty(n)?le[n]:null;(a!==null?a.type!==0:s||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(ne(n,r,a,s)&&(r=null),s||a===null?A(n)&&(r===null?e.removeAttribute(n):e.setAttribute(n,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(n=a.attributeName,s=a.attributeNamespace,r===null?e.removeAttribute(n):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,s?e.setAttributeNS(s,n,r):e.setAttribute(n,r))))}var je=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ye=Symbol.for("react.element"),he=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),fe=Symbol.for("react.strict_mode"),Ve=Symbol.for("react.profiler"),ee=Symbol.for("react.provider"),ge=Symbol.for("react.context"),X=Symbol.for("react.forward_ref"),J=Symbol.for("react.suspense"),Ie=Symbol.for("react.suspense_list"),Ce=Symbol.for("react.memo"),Me=Symbol.for("react.lazy"),ae=Symbol.for("react.offscreen"),F=Symbol.iterator;function Q(e){return e===null||typeof e!="object"?null:(e=F&&e[F]||e["@@iterator"],typeof e=="function"?e:null)}var O=Object.assign,w;function I(e){if(w===void 0)try{throw Error()}catch(r){var n=r.stack.trim().match(/\n( *(at )?)/);w=n&&n[1]||""}return`
`+w+e}var K=!1;function G(e,n){if(!e||K)return"";K=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(C){var s=C}Reflect.construct(e,[],n)}else{try{n.call()}catch(C){s=C}e.call(n.prototype)}else{try{throw Error()}catch(C){s=C}e()}}catch(C){if(C&&s&&typeof C.stack=="string"){for(var a=C.stack.split(`
`),u=s.stack.split(`
`),f=a.length-1,h=u.length-1;1<=f&&0<=h&&a[f]!==u[h];)h--;for(;1<=f&&0<=h;f--,h--)if(a[f]!==u[h]){if(f!==1||h!==1)do if(f--,h--,0>h||a[f]!==u[h]){var y=`
`+a[f].replace(" at new "," at ");return e.displayName&&y.includes("<anonymous>")&&(y=y.replace("<anonymous>",e.displayName)),y}while(1<=f&&0<=h);break}}}finally{K=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?I(e):""}function ve(e){switch(e.tag){case 5:return I(e.type);case 16:return I("Lazy");case 13:return I("Suspense");case 19:return I("SuspenseList");case 0:case 2:case 15:return e=G(e.type,!1),e;case 11:return e=G(e.type.render,!1),e;case 1:return e=G(e.type,!0),e;default:return""}}function xe(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case U:return"Fragment";case he:return"Portal";case Ve:return"Profiler";case fe:return"StrictMode";case J:return"Suspense";case Ie:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ge:return(e.displayName||"Context")+".Consumer";case ee:return(e._context.displayName||"Context")+".Provider";case X:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ce:return n=e.displayName||null,n!==null?n:xe(e.type)||"Memo";case Me:n=e._payload,e=e._init;try{return xe(e(n))}catch{}}return null}function Se(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return xe(n);case 8:return n===fe?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Y(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ke(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function _e(e){var n=ke(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),s=""+e[n];if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,u=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return a.call(this)},set:function(f){s=""+f,u.call(this,f)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(f){s=""+f},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function xt(e){e._valueTracker||(e._valueTracker=_e(e))}function Ot(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var r=n.getValue(),s="";return e&&(s=ke(e)?e.checked?"true":"false":e.value),e=s,e!==r?(n.setValue(e),!0):!1}function Et(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Tt(e,n){var r=n.checked;return O({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function pn(e,n){var r=n.defaultValue==null?"":n.defaultValue,s=n.checked!=null?n.checked:n.defaultChecked;r=Y(n.value!=null?n.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function De(e,n){n=n.checked,n!=null&&de(e,"checked",n,!1)}function It(e,n){De(e,n);var r=Y(n.value),s=n.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Bt(e,n.type,r):n.hasOwnProperty("defaultValue")&&Bt(e,n.type,Y(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function V(e,n,r){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var s=n.type;if(!(s!=="submit"&&s!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,r||n===e.value||(e.value=n),e.defaultValue=n}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Bt(e,n,r){(n!=="number"||Et(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var yt=Array.isArray;function pt(e,n,r,s){if(e=e.options,n){n={};for(var a=0;a<r.length;a++)n["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=n.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&s&&(e[r].defaultSelected=!0)}else{for(r=""+Y(r),n=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}n!==null||e[a].disabled||(n=e[a])}n!==null&&(n.selected=!0)}}function vt(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(i(91));return O({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Re(e,n){var r=n.value;if(r==null){if(r=n.children,n=n.defaultValue,r!=null){if(n!=null)throw Error(i(92));if(yt(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n==null&&(n=""),r=n}e._wrapperState={initialValue:Y(r)}}function Ke(e,n){var r=Y(n.value),s=Y(n.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),n.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function ze(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Rt(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function tt(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Rt(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var hn,En=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,r,s,a){MSApp.execUnsafeLocalFunction(function(){return e(n,r,s,a)})}:e})(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(hn=hn||document.createElement("div"),hn.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=hn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function at(e,n){if(n){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=n;return}}e.textContent=n}var Ut={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},q=["Webkit","ms","Moz","O"];Object.keys(Ut).forEach(function(e){q.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ut[n]=Ut[e]})});function ot(e,n,r){return n==null||typeof n=="boolean"||n===""?"":r||typeof n!="number"||n===0||Ut.hasOwnProperty(e)&&Ut[e]?(""+n).trim():n+"px"}function tn(e,n){e=e.style;for(var r in n)if(n.hasOwnProperty(r)){var s=r.indexOf("--")===0,a=ot(r,n[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,a):e[r]=a}}var Ro=O({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xn(e,n){if(n){if(Ro[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(i(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(i(61))}if(n.style!=null&&typeof n.style!="object")throw Error(i(62))}}function nn(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Jn=null;function Zn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Er=null,jn=null,Qt=null;function Vr(e){if(e=Ko(e)){if(typeof Er!="function")throw Error(i(280));var n=e.stateNode;n&&(n=Xs(n),Er(e.stateNode,e.type,n))}}function Wr(e){jn?Qt?Qt.push(e):Qt=[e]:jn=e}function Gr(){if(jn){var e=jn,n=Qt;if(Qt=jn=null,Vr(e),n)for(e=0;e<n.length;e++)Vr(n[e])}}function jr(e,n){return e(n)}function er(){}var On=!1;function M(e,n,r){if(On)return e(n,r);On=!0;try{return jr(e,n,r)}finally{On=!1,(jn!==null||Qt!==null)&&(er(),Gr())}}function g(e,n){var r=e.stateNode;if(r===null)return null;var s=Xs(r);if(s===null)return null;r=s[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(i(231,n,typeof r));return r}var R=!1;if(v)try{var j={};Object.defineProperty(j,"passive",{get:function(){R=!0}}),window.addEventListener("test",j,j),window.removeEventListener("test",j,j)}catch{R=!1}function P(e,n,r,s,a,u,f,h,y){var C=Array.prototype.slice.call(arguments,3);try{n.apply(r,C)}catch(z){this.onError(z)}}var Z=!1,Oe=null,Te=!1,bt=null,$e={onError:function(e){Z=!0,Oe=e}};function jt(e,n,r,s,a,u,f,h,y){Z=!1,Oe=null,P.apply($e,arguments)}function _n(e,n,r,s,a,u,f,h,y){if(jt.apply(this,arguments),Z){if(Z){var C=Oe;Z=!1,Oe=null}else throw Error(i(198));Te||(Te=!0,bt=C)}}function wt(e){var n=e,r=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,(n.flags&4098)!==0&&(r=n.return),e=n.return;while(e)}return n.tag===3?r:null}function rn(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function hu(e){if(wt(e)!==e)throw Error(i(188))}function zh(e){var n=e.alternate;if(!n){if(n=wt(e),n===null)throw Error(i(188));return n!==e?null:e}for(var r=e,s=n;;){var a=r.return;if(a===null)break;var u=a.alternate;if(u===null){if(s=a.return,s!==null){r=s;continue}break}if(a.child===u.child){for(u=a.child;u;){if(u===r)return hu(a),e;if(u===s)return hu(a),n;u=u.sibling}throw Error(i(188))}if(r.return!==s.return)r=a,s=u;else{for(var f=!1,h=a.child;h;){if(h===r){f=!0,r=a,s=u;break}if(h===s){f=!0,s=a,r=u;break}h=h.sibling}if(!f){for(h=u.child;h;){if(h===r){f=!0,r=u,s=a;break}if(h===s){f=!0,s=u,r=a;break}h=h.sibling}if(!f)throw Error(i(189))}}if(r.alternate!==s)throw Error(i(190))}if(r.tag!==3)throw Error(i(188));return r.stateNode.current===r?e:n}function mu(e){return e=zh(e),e!==null?gu(e):null}function gu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=gu(e);if(n!==null)return n;e=e.sibling}return null}var xu=o.unstable_scheduleCallback,yu=o.unstable_cancelCallback,Fh=o.unstable_shouldYield,Dh=o.unstable_requestPaint,it=o.unstable_now,Bh=o.unstable_getCurrentPriorityLevel,El=o.unstable_ImmediatePriority,vu=o.unstable_UserBlockingPriority,Rs=o.unstable_NormalPriority,Uh=o.unstable_LowPriority,bu=o.unstable_IdlePriority,$s=null,Nn=null;function Hh(e){if(Nn&&typeof Nn.onCommitFiberRoot=="function")try{Nn.onCommitFiberRoot($s,e,void 0,(e.current.flags&128)===128)}catch{}}var mn=Math.clz32?Math.clz32:Gh,Vh=Math.log,Wh=Math.LN2;function Gh(e){return e>>>=0,e===0?32:31-(Vh(e)/Wh|0)|0}var As=64,Ps=4194304;function $o(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ms(e,n){var r=e.pendingLanes;if(r===0)return 0;var s=0,a=e.suspendedLanes,u=e.pingedLanes,f=r&268435455;if(f!==0){var h=f&~a;h!==0?s=$o(h):(u&=f,u!==0&&(s=$o(u)))}else f=r&~a,f!==0?s=$o(f):u!==0&&(s=$o(u));if(s===0)return 0;if(n!==0&&n!==s&&(n&a)===0&&(a=s&-s,u=n&-n,a>=u||a===16&&(u&4194240)!==0))return n;if((s&4)!==0&&(s|=r&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=s;0<n;)r=31-mn(n),a=1<<r,s|=e[r],n&=~a;return s}function qh(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Yh(e,n){for(var r=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,u=e.pendingLanes;0<u;){var f=31-mn(u),h=1<<f,y=a[f];y===-1?((h&r)===0||(h&s)!==0)&&(a[f]=qh(h,n)):y<=n&&(e.expiredLanes|=h),u&=~h}}function jl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function wu(){var e=As;return As<<=1,(As&4194240)===0&&(As=64),e}function _l(e){for(var n=[],r=0;31>r;r++)n.push(e);return n}function Ao(e,n,r){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-mn(n),e[n]=r}function Qh(e,n){var r=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-mn(r),u=1<<a;n[a]=0,s[a]=-1,e[a]=-1,r&=~u}}function Nl(e,n){var r=e.entangledLanes|=n;for(e=e.entanglements;r;){var s=31-mn(r),a=1<<s;a&n|e[s]&n&&(e[s]|=n),r&=~a}}var qe=0;function Su(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var ku,Tl,Cu,Eu,ju,Il=!1,Ls=[],tr=null,nr=null,rr=null,Po=new Map,Mo=new Map,or=[],Kh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function _u(e,n){switch(e){case"focusin":case"focusout":tr=null;break;case"dragenter":case"dragleave":nr=null;break;case"mouseover":case"mouseout":rr=null;break;case"pointerover":case"pointerout":Po.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Mo.delete(n.pointerId)}}function Lo(e,n,r,s,a,u){return e===null||e.nativeEvent!==u?(e={blockedOn:n,domEventName:r,eventSystemFlags:s,nativeEvent:u,targetContainers:[a]},n!==null&&(n=Ko(n),n!==null&&Tl(n)),e):(e.eventSystemFlags|=s,n=e.targetContainers,a!==null&&n.indexOf(a)===-1&&n.push(a),e)}function Xh(e,n,r,s,a){switch(n){case"focusin":return tr=Lo(tr,e,n,r,s,a),!0;case"dragenter":return nr=Lo(nr,e,n,r,s,a),!0;case"mouseover":return rr=Lo(rr,e,n,r,s,a),!0;case"pointerover":var u=a.pointerId;return Po.set(u,Lo(Po.get(u)||null,e,n,r,s,a)),!0;case"gotpointercapture":return u=a.pointerId,Mo.set(u,Lo(Mo.get(u)||null,e,n,r,s,a)),!0}return!1}function Nu(e){var n=_r(e.target);if(n!==null){var r=wt(n);if(r!==null){if(n=r.tag,n===13){if(n=rn(r),n!==null){e.blockedOn=n,ju(e.priority,function(){Cu(r)});return}}else if(n===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Os(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var r=$l(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);Jn=s,r.target.dispatchEvent(s),Jn=null}else return n=Ko(r),n!==null&&Tl(n),e.blockedOn=r,!1;n.shift()}return!0}function Tu(e,n,r){Os(e)&&r.delete(n)}function Jh(){Il=!1,tr!==null&&Os(tr)&&(tr=null),nr!==null&&Os(nr)&&(nr=null),rr!==null&&Os(rr)&&(rr=null),Po.forEach(Tu),Mo.forEach(Tu)}function Oo(e,n){e.blockedOn===n&&(e.blockedOn=null,Il||(Il=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Jh)))}function zo(e){function n(a){return Oo(a,e)}if(0<Ls.length){Oo(Ls[0],e);for(var r=1;r<Ls.length;r++){var s=Ls[r];s.blockedOn===e&&(s.blockedOn=null)}}for(tr!==null&&Oo(tr,e),nr!==null&&Oo(nr,e),rr!==null&&Oo(rr,e),Po.forEach(n),Mo.forEach(n),r=0;r<or.length;r++)s=or[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<or.length&&(r=or[0],r.blockedOn===null);)Nu(r),r.blockedOn===null&&or.shift()}var qr=je.ReactCurrentBatchConfig,zs=!0;function Zh(e,n,r,s){var a=qe,u=qr.transition;qr.transition=null;try{qe=1,Rl(e,n,r,s)}finally{qe=a,qr.transition=u}}function em(e,n,r,s){var a=qe,u=qr.transition;qr.transition=null;try{qe=4,Rl(e,n,r,s)}finally{qe=a,qr.transition=u}}function Rl(e,n,r,s){if(zs){var a=$l(e,n,r,s);if(a===null)Ql(e,n,s,Fs,r),_u(e,s);else if(Xh(a,e,n,r,s))s.stopPropagation();else if(_u(e,s),n&4&&-1<Kh.indexOf(e)){for(;a!==null;){var u=Ko(a);if(u!==null&&ku(u),u=$l(e,n,r,s),u===null&&Ql(e,n,s,Fs,r),u===a)break;a=u}a!==null&&s.stopPropagation()}else Ql(e,n,s,null,r)}}var Fs=null;function $l(e,n,r,s){if(Fs=null,e=Zn(s),e=_r(e),e!==null)if(n=wt(e),n===null)e=null;else if(r=n.tag,r===13){if(e=rn(n),e!==null)return e;e=null}else if(r===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return Fs=e,null}function Iu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Bh()){case El:return 1;case vu:return 4;case Rs:case Uh:return 16;case bu:return 536870912;default:return 16}default:return 16}}var sr=null,Al=null,Ds=null;function Ru(){if(Ds)return Ds;var e,n=Al,r=n.length,s,a="value"in sr?sr.value:sr.textContent,u=a.length;for(e=0;e<r&&n[e]===a[e];e++);var f=r-e;for(s=1;s<=f&&n[r-s]===a[u-s];s++);return Ds=a.slice(e,1<s?1-s:void 0)}function Bs(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Us(){return!0}function $u(){return!1}function Kt(e){function n(r,s,a,u,f){this._reactName=r,this._targetInst=a,this.type=s,this.nativeEvent=u,this.target=f,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(r=e[h],this[h]=r?r(u):u[h]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Us:$u,this.isPropagationStopped=$u,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Us)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Us)},persist:function(){},isPersistent:Us}),n}var Yr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pl=Kt(Yr),Fo=O({},Yr,{view:0,detail:0}),tm=Kt(Fo),Ml,Ll,Do,Hs=O({},Fo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Do&&(Do&&e.type==="mousemove"?(Ml=e.screenX-Do.screenX,Ll=e.screenY-Do.screenY):Ll=Ml=0,Do=e),Ml)},movementY:function(e){return"movementY"in e?e.movementY:Ll}}),Au=Kt(Hs),nm=O({},Hs,{dataTransfer:0}),rm=Kt(nm),om=O({},Fo,{relatedTarget:0}),Ol=Kt(om),sm=O({},Yr,{animationName:0,elapsedTime:0,pseudoElement:0}),im=Kt(sm),lm=O({},Yr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),am=Kt(lm),cm=O({},Yr,{data:0}),Pu=Kt(cm),um={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pm(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=fm[e])?!!n[e]:!1}function zl(){return pm}var hm=O({},Fo,{key:function(e){if(e.key){var n=um[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Bs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zl,charCode:function(e){return e.type==="keypress"?Bs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Bs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),mm=Kt(hm),gm=O({},Hs,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Mu=Kt(gm),xm=O({},Fo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zl}),ym=Kt(xm),vm=O({},Yr,{propertyName:0,elapsedTime:0,pseudoElement:0}),bm=Kt(vm),wm=O({},Hs,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Sm=Kt(wm),km=[9,13,27,32],Fl=v&&"CompositionEvent"in window,Bo=null;v&&"documentMode"in document&&(Bo=document.documentMode);var Cm=v&&"TextEvent"in window&&!Bo,Lu=v&&(!Fl||Bo&&8<Bo&&11>=Bo),Ou=" ",zu=!1;function Fu(e,n){switch(e){case"keyup":return km.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Du(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qr=!1;function Em(e,n){switch(e){case"compositionend":return Du(n);case"keypress":return n.which!==32?null:(zu=!0,Ou);case"textInput":return e=n.data,e===Ou&&zu?null:e;default:return null}}function jm(e,n){if(Qr)return e==="compositionend"||!Fl&&Fu(e,n)?(e=Ru(),Ds=Al=sr=null,Qr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Lu&&n.locale!=="ko"?null:n.data;default:return null}}var _m={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Bu(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!_m[e.type]:n==="textarea"}function Uu(e,n,r,s){Wr(s),n=Ys(n,"onChange"),0<n.length&&(r=new Pl("onChange","change",null,r,s),e.push({event:r,listeners:n}))}var Uo=null,Ho=null;function Nm(e){id(e,0)}function Vs(e){var n=eo(e);if(Ot(n))return e}function Tm(e,n){if(e==="change")return n}var Hu=!1;if(v){var Dl;if(v){var Bl="oninput"in document;if(!Bl){var Vu=document.createElement("div");Vu.setAttribute("oninput","return;"),Bl=typeof Vu.oninput=="function"}Dl=Bl}else Dl=!1;Hu=Dl&&(!document.documentMode||9<document.documentMode)}function Wu(){Uo&&(Uo.detachEvent("onpropertychange",Gu),Ho=Uo=null)}function Gu(e){if(e.propertyName==="value"&&Vs(Ho)){var n=[];Uu(n,Ho,e,Zn(e)),M(Nm,n)}}function Im(e,n,r){e==="focusin"?(Wu(),Uo=n,Ho=r,Uo.attachEvent("onpropertychange",Gu)):e==="focusout"&&Wu()}function Rm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Vs(Ho)}function $m(e,n){if(e==="click")return Vs(n)}function Am(e,n){if(e==="input"||e==="change")return Vs(n)}function Pm(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var gn=typeof Object.is=="function"?Object.is:Pm;function Vo(e,n){if(gn(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var r=Object.keys(e),s=Object.keys(n);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var a=r[s];if(!x.call(n,a)||!gn(e[a],n[a]))return!1}return!0}function qu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Yu(e,n){var r=qu(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=n&&s>=n)return{node:r,offset:n-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=qu(r)}}function Qu(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Qu(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function Ku(){for(var e=window,n=Et();n instanceof e.HTMLIFrameElement;){try{var r=typeof n.contentWindow.location.href=="string"}catch{r=!1}if(r)e=n.contentWindow;else break;n=Et(e.document)}return n}function Ul(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Mm(e){var n=Ku(),r=e.focusedElem,s=e.selectionRange;if(n!==r&&r&&r.ownerDocument&&Qu(r.ownerDocument.documentElement,r)){if(s!==null&&Ul(r)){if(n=s.start,e=s.end,e===void 0&&(e=n),"selectionStart"in r)r.selectionStart=n,r.selectionEnd=Math.min(e,r.value.length);else if(e=(n=r.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,u=Math.min(s.start,a);s=s.end===void 0?u:Math.min(s.end,a),!e.extend&&u>s&&(a=s,s=u,u=a),a=Yu(r,u);var f=Yu(r,s);a&&f&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(n=n.createRange(),n.setStart(a.node,a.offset),e.removeAllRanges(),u>s?(e.addRange(n),e.extend(f.node,f.offset)):(n.setEnd(f.node,f.offset),e.addRange(n)))}}for(n=[],e=r;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<n.length;r++)e=n[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Lm=v&&"documentMode"in document&&11>=document.documentMode,Kr=null,Hl=null,Wo=null,Vl=!1;function Xu(e,n,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Vl||Kr==null||Kr!==Et(s)||(s=Kr,"selectionStart"in s&&Ul(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Wo&&Vo(Wo,s)||(Wo=s,s=Ys(Hl,"onSelect"),0<s.length&&(n=new Pl("onSelect","select",null,n,r),e.push({event:n,listeners:s}),n.target=Kr)))}function Ws(e,n){var r={};return r[e.toLowerCase()]=n.toLowerCase(),r["Webkit"+e]="webkit"+n,r["Moz"+e]="moz"+n,r}var Xr={animationend:Ws("Animation","AnimationEnd"),animationiteration:Ws("Animation","AnimationIteration"),animationstart:Ws("Animation","AnimationStart"),transitionend:Ws("Transition","TransitionEnd")},Wl={},Ju={};v&&(Ju=document.createElement("div").style,"AnimationEvent"in window||(delete Xr.animationend.animation,delete Xr.animationiteration.animation,delete Xr.animationstart.animation),"TransitionEvent"in window||delete Xr.transitionend.transition);function Gs(e){if(Wl[e])return Wl[e];if(!Xr[e])return e;var n=Xr[e],r;for(r in n)if(n.hasOwnProperty(r)&&r in Ju)return Wl[e]=n[r];return e}var Zu=Gs("animationend"),ed=Gs("animationiteration"),td=Gs("animationstart"),nd=Gs("transitionend"),rd=new Map,od="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(e,n){rd.set(e,n),p(n,[e])}for(var Gl=0;Gl<od.length;Gl++){var ql=od[Gl],Om=ql.toLowerCase(),zm=ql[0].toUpperCase()+ql.slice(1);ir(Om,"on"+zm)}ir(Zu,"onAnimationEnd"),ir(ed,"onAnimationIteration"),ir(td,"onAnimationStart"),ir("dblclick","onDoubleClick"),ir("focusin","onFocus"),ir("focusout","onBlur"),ir(nd,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),p("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),p("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),p("onBeforeInput",["compositionend","keypress","textInput","paste"]),p("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Go="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Go));function sd(e,n,r){var s=e.type||"unknown-event";e.currentTarget=r,_n(s,n,void 0,e),e.currentTarget=null}function id(e,n){n=(n&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],a=s.event;s=s.listeners;e:{var u=void 0;if(n)for(var f=s.length-1;0<=f;f--){var h=s[f],y=h.instance,C=h.currentTarget;if(h=h.listener,y!==u&&a.isPropagationStopped())break e;sd(a,h,C),u=y}else for(f=0;f<s.length;f++){if(h=s[f],y=h.instance,C=h.currentTarget,h=h.listener,y!==u&&a.isPropagationStopped())break e;sd(a,h,C),u=y}}}if(Te)throw e=bt,Te=!1,bt=null,e}function Xe(e,n){var r=n[ta];r===void 0&&(r=n[ta]=new Set);var s=e+"__bubble";r.has(s)||(ld(n,e,2,!1),r.add(s))}function Yl(e,n,r){var s=0;n&&(s|=4),ld(r,e,s,n)}var qs="_reactListening"+Math.random().toString(36).slice(2);function qo(e){if(!e[qs]){e[qs]=!0,c.forEach(function(r){r!=="selectionchange"&&(Fm.has(r)||Yl(r,!1,e),Yl(r,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[qs]||(n[qs]=!0,Yl("selectionchange",!1,n))}}function ld(e,n,r,s){switch(Iu(n)){case 1:var a=Zh;break;case 4:a=em;break;default:a=Rl}r=a.bind(null,n,r,e),a=void 0,!R||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(n,r,{capture:!0,passive:a}):e.addEventListener(n,r,!0):a!==void 0?e.addEventListener(n,r,{passive:a}):e.addEventListener(n,r,!1)}function Ql(e,n,r,s,a){var u=s;if((n&1)===0&&(n&2)===0&&s!==null)e:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var h=s.stateNode.containerInfo;if(h===a||h.nodeType===8&&h.parentNode===a)break;if(f===4)for(f=s.return;f!==null;){var y=f.tag;if((y===3||y===4)&&(y=f.stateNode.containerInfo,y===a||y.nodeType===8&&y.parentNode===a))return;f=f.return}for(;h!==null;){if(f=_r(h),f===null)return;if(y=f.tag,y===5||y===6){s=u=f;continue e}h=h.parentNode}}s=s.return}M(function(){var C=u,z=Zn(r),B=[];e:{var L=rd.get(e);if(L!==void 0){var oe=Pl,ce=e;switch(e){case"keypress":if(Bs(r)===0)break e;case"keydown":case"keyup":oe=mm;break;case"focusin":ce="focus",oe=Ol;break;case"focusout":ce="blur",oe=Ol;break;case"beforeblur":case"afterblur":oe=Ol;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":oe=Au;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":oe=rm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":oe=ym;break;case Zu:case ed:case td:oe=im;break;case nd:oe=bm;break;case"scroll":oe=tm;break;case"wheel":oe=Sm;break;case"copy":case"cut":case"paste":oe=am;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":oe=Mu}var ue=(n&4)!==0,lt=!ue&&e==="scroll",S=ue?L!==null?L+"Capture":null:L;ue=[];for(var b=C,k;b!==null;){k=b;var W=k.stateNode;if(k.tag===5&&W!==null&&(k=W,S!==null&&(W=g(b,S),W!=null&&ue.push(Yo(b,W,k)))),lt)break;b=b.return}0<ue.length&&(L=new oe(L,ce,null,r,z),B.push({event:L,listeners:ue}))}}if((n&7)===0){e:{if(L=e==="mouseover"||e==="pointerover",oe=e==="mouseout"||e==="pointerout",L&&r!==Jn&&(ce=r.relatedTarget||r.fromElement)&&(_r(ce)||ce[zn]))break e;if((oe||L)&&(L=z.window===z?z:(L=z.ownerDocument)?L.defaultView||L.parentWindow:window,oe?(ce=r.relatedTarget||r.toElement,oe=C,ce=ce?_r(ce):null,ce!==null&&(lt=wt(ce),ce!==lt||ce.tag!==5&&ce.tag!==6)&&(ce=null)):(oe=null,ce=C),oe!==ce)){if(ue=Au,W="onMouseLeave",S="onMouseEnter",b="mouse",(e==="pointerout"||e==="pointerover")&&(ue=Mu,W="onPointerLeave",S="onPointerEnter",b="pointer"),lt=oe==null?L:eo(oe),k=ce==null?L:eo(ce),L=new ue(W,b+"leave",oe,r,z),L.target=lt,L.relatedTarget=k,W=null,_r(z)===C&&(ue=new ue(S,b+"enter",ce,r,z),ue.target=k,ue.relatedTarget=lt,W=ue),lt=W,oe&&ce)t:{for(ue=oe,S=ce,b=0,k=ue;k;k=Jr(k))b++;for(k=0,W=S;W;W=Jr(W))k++;for(;0<b-k;)ue=Jr(ue),b--;for(;0<k-b;)S=Jr(S),k--;for(;b--;){if(ue===S||S!==null&&ue===S.alternate)break t;ue=Jr(ue),S=Jr(S)}ue=null}else ue=null;oe!==null&&ad(B,L,oe,ue,!1),ce!==null&&lt!==null&&ad(B,lt,ce,ue,!0)}}e:{if(L=C?eo(C):window,oe=L.nodeName&&L.nodeName.toLowerCase(),oe==="select"||oe==="input"&&L.type==="file")var pe=Tm;else if(Bu(L))if(Hu)pe=Am;else{pe=Rm;var be=Im}else(oe=L.nodeName)&&oe.toLowerCase()==="input"&&(L.type==="checkbox"||L.type==="radio")&&(pe=$m);if(pe&&(pe=pe(e,C))){Uu(B,pe,r,z);break e}be&&be(e,L,C),e==="focusout"&&(be=L._wrapperState)&&be.controlled&&L.type==="number"&&Bt(L,"number",L.value)}switch(be=C?eo(C):window,e){case"focusin":(Bu(be)||be.contentEditable==="true")&&(Kr=be,Hl=C,Wo=null);break;case"focusout":Wo=Hl=Kr=null;break;case"mousedown":Vl=!0;break;case"contextmenu":case"mouseup":case"dragend":Vl=!1,Xu(B,r,z);break;case"selectionchange":if(Lm)break;case"keydown":case"keyup":Xu(B,r,z)}var we;if(Fl)e:{switch(e){case"compositionstart":var Ee="onCompositionStart";break e;case"compositionend":Ee="onCompositionEnd";break e;case"compositionupdate":Ee="onCompositionUpdate";break e}Ee=void 0}else Qr?Fu(e,r)&&(Ee="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Ee="onCompositionStart");Ee&&(Lu&&r.locale!=="ko"&&(Qr||Ee!=="onCompositionStart"?Ee==="onCompositionEnd"&&Qr&&(we=Ru()):(sr=z,Al="value"in sr?sr.value:sr.textContent,Qr=!0)),be=Ys(C,Ee),0<be.length&&(Ee=new Pu(Ee,e,null,r,z),B.push({event:Ee,listeners:be}),we?Ee.data=we:(we=Du(r),we!==null&&(Ee.data=we)))),(we=Cm?Em(e,r):jm(e,r))&&(C=Ys(C,"onBeforeInput"),0<C.length&&(z=new Pu("onBeforeInput","beforeinput",null,r,z),B.push({event:z,listeners:C}),z.data=we))}id(B,n)})}function Yo(e,n,r){return{instance:e,listener:n,currentTarget:r}}function Ys(e,n){for(var r=n+"Capture",s=[];e!==null;){var a=e,u=a.stateNode;a.tag===5&&u!==null&&(a=u,u=g(e,r),u!=null&&s.unshift(Yo(e,u,a)),u=g(e,n),u!=null&&s.push(Yo(e,u,a))),e=e.return}return s}function Jr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function ad(e,n,r,s,a){for(var u=n._reactName,f=[];r!==null&&r!==s;){var h=r,y=h.alternate,C=h.stateNode;if(y!==null&&y===s)break;h.tag===5&&C!==null&&(h=C,a?(y=g(r,u),y!=null&&f.unshift(Yo(r,y,h))):a||(y=g(r,u),y!=null&&f.push(Yo(r,y,h)))),r=r.return}f.length!==0&&e.push({event:n,listeners:f})}var Dm=/\r\n?/g,Bm=/\u0000|\uFFFD/g;function cd(e){return(typeof e=="string"?e:""+e).replace(Dm,`
`).replace(Bm,"")}function Qs(e,n,r){if(n=cd(n),cd(e)!==n&&r)throw Error(i(425))}function Ks(){}var Kl=null,Xl=null;function Jl(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Zl=typeof setTimeout=="function"?setTimeout:void 0,Um=typeof clearTimeout=="function"?clearTimeout:void 0,ud=typeof Promise=="function"?Promise:void 0,Hm=typeof queueMicrotask=="function"?queueMicrotask:typeof ud<"u"?function(e){return ud.resolve(null).then(e).catch(Vm)}:Zl;function Vm(e){setTimeout(function(){throw e})}function ea(e,n){var r=n,s=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(s===0){e.removeChild(a),zo(n);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=a}while(r);zo(n)}function lr(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function dd(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(n===0)return e;n--}else r==="/$"&&n++}e=e.previousSibling}return null}var Zr=Math.random().toString(36).slice(2),Tn="__reactFiber$"+Zr,Qo="__reactProps$"+Zr,zn="__reactContainer$"+Zr,ta="__reactEvents$"+Zr,Wm="__reactListeners$"+Zr,Gm="__reactHandles$"+Zr;function _r(e){var n=e[Tn];if(n)return n;for(var r=e.parentNode;r;){if(n=r[zn]||r[Tn]){if(r=n.alternate,n.child!==null||r!==null&&r.child!==null)for(e=dd(e);e!==null;){if(r=e[Tn])return r;e=dd(e)}return n}e=r,r=e.parentNode}return null}function Ko(e){return e=e[Tn]||e[zn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function eo(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Xs(e){return e[Qo]||null}var na=[],to=-1;function ar(e){return{current:e}}function Je(e){0>to||(e.current=na[to],na[to]=null,to--)}function Qe(e,n){to++,na[to]=e.current,e.current=n}var cr={},$t=ar(cr),Ht=ar(!1),Nr=cr;function no(e,n){var r=e.type.contextTypes;if(!r)return cr;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===n)return s.__reactInternalMemoizedMaskedChildContext;var a={},u;for(u in r)a[u]=n[u];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=a),a}function Vt(e){return e=e.childContextTypes,e!=null}function Js(){Je(Ht),Je($t)}function fd(e,n,r){if($t.current!==cr)throw Error(i(168));Qe($t,n),Qe(Ht,r)}function pd(e,n,r){var s=e.stateNode;if(n=n.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var a in s)if(!(a in n))throw Error(i(108,Se(e)||"Unknown",a));return O({},r,s)}function Zs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||cr,Nr=$t.current,Qe($t,e),Qe(Ht,Ht.current),!0}function hd(e,n,r){var s=e.stateNode;if(!s)throw Error(i(169));r?(e=pd(e,n,Nr),s.__reactInternalMemoizedMergedChildContext=e,Je(Ht),Je($t),Qe($t,e)):Je(Ht),Qe(Ht,r)}var Fn=null,ei=!1,ra=!1;function md(e){Fn===null?Fn=[e]:Fn.push(e)}function qm(e){ei=!0,md(e)}function ur(){if(!ra&&Fn!==null){ra=!0;var e=0,n=qe;try{var r=Fn;for(qe=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}Fn=null,ei=!1}catch(a){throw Fn!==null&&(Fn=Fn.slice(e+1)),xu(El,ur),a}finally{qe=n,ra=!1}}return null}var ro=[],oo=0,ti=null,ni=0,on=[],sn=0,Tr=null,Dn=1,Bn="";function Ir(e,n){ro[oo++]=ni,ro[oo++]=ti,ti=e,ni=n}function gd(e,n,r){on[sn++]=Dn,on[sn++]=Bn,on[sn++]=Tr,Tr=e;var s=Dn;e=Bn;var a=32-mn(s)-1;s&=~(1<<a),r+=1;var u=32-mn(n)+a;if(30<u){var f=a-a%5;u=(s&(1<<f)-1).toString(32),s>>=f,a-=f,Dn=1<<32-mn(n)+a|r<<a|s,Bn=u+e}else Dn=1<<u|r<<a|s,Bn=e}function oa(e){e.return!==null&&(Ir(e,1),gd(e,1,0))}function sa(e){for(;e===ti;)ti=ro[--oo],ro[oo]=null,ni=ro[--oo],ro[oo]=null;for(;e===Tr;)Tr=on[--sn],on[sn]=null,Bn=on[--sn],on[sn]=null,Dn=on[--sn],on[sn]=null}var Xt=null,Jt=null,et=!1,xn=null;function xd(e,n){var r=un(5,null,null,0);r.elementType="DELETED",r.stateNode=n,r.return=e,n=e.deletions,n===null?(e.deletions=[r],e.flags|=16):n.push(r)}function yd(e,n){switch(e.tag){case 5:var r=e.type;return n=n.nodeType!==1||r.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,Xt=e,Jt=lr(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,Xt=e,Jt=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(r=Tr!==null?{id:Dn,overflow:Bn}:null,e.memoizedState={dehydrated:n,treeContext:r,retryLane:1073741824},r=un(18,null,null,0),r.stateNode=n,r.return=e,e.child=r,Xt=e,Jt=null,!0):!1;default:return!1}}function ia(e){return(e.mode&1)!==0&&(e.flags&128)===0}function la(e){if(et){var n=Jt;if(n){var r=n;if(!yd(e,n)){if(ia(e))throw Error(i(418));n=lr(r.nextSibling);var s=Xt;n&&yd(e,n)?xd(s,r):(e.flags=e.flags&-4097|2,et=!1,Xt=e)}}else{if(ia(e))throw Error(i(418));e.flags=e.flags&-4097|2,et=!1,Xt=e}}}function vd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Xt=e}function ri(e){if(e!==Xt)return!1;if(!et)return vd(e),et=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Jl(e.type,e.memoizedProps)),n&&(n=Jt)){if(ia(e))throw bd(),Error(i(418));for(;n;)xd(e,n),n=lr(n.nextSibling)}if(vd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(n===0){Jt=lr(e.nextSibling);break e}n--}else r!=="$"&&r!=="$!"&&r!=="$?"||n++}e=e.nextSibling}Jt=null}}else Jt=Xt?lr(e.stateNode.nextSibling):null;return!0}function bd(){for(var e=Jt;e;)e=lr(e.nextSibling)}function so(){Jt=Xt=null,et=!1}function aa(e){xn===null?xn=[e]:xn.push(e)}var Ym=je.ReactCurrentBatchConfig;function Xo(e,n,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(i(309));var s=r.stateNode}if(!s)throw Error(i(147,e));var a=s,u=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===u?n.ref:(n=function(f){var h=a.refs;f===null?delete h[u]:h[u]=f},n._stringRef=u,n)}if(typeof e!="string")throw Error(i(284));if(!r._owner)throw Error(i(290,e))}return e}function oi(e,n){throw e=Object.prototype.toString.call(n),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function wd(e){var n=e._init;return n(e._payload)}function Sd(e){function n(S,b){if(e){var k=S.deletions;k===null?(S.deletions=[b],S.flags|=16):k.push(b)}}function r(S,b){if(!e)return null;for(;b!==null;)n(S,b),b=b.sibling;return null}function s(S,b){for(S=new Map;b!==null;)b.key!==null?S.set(b.key,b):S.set(b.index,b),b=b.sibling;return S}function a(S,b){return S=yr(S,b),S.index=0,S.sibling=null,S}function u(S,b,k){return S.index=k,e?(k=S.alternate,k!==null?(k=k.index,k<b?(S.flags|=2,b):k):(S.flags|=2,b)):(S.flags|=1048576,b)}function f(S){return e&&S.alternate===null&&(S.flags|=2),S}function h(S,b,k,W){return b===null||b.tag!==6?(b=Za(k,S.mode,W),b.return=S,b):(b=a(b,k),b.return=S,b)}function y(S,b,k,W){var pe=k.type;return pe===U?z(S,b,k.props.children,W,k.key):b!==null&&(b.elementType===pe||typeof pe=="object"&&pe!==null&&pe.$$typeof===Me&&wd(pe)===b.type)?(W=a(b,k.props),W.ref=Xo(S,b,k),W.return=S,W):(W=Ni(k.type,k.key,k.props,null,S.mode,W),W.ref=Xo(S,b,k),W.return=S,W)}function C(S,b,k,W){return b===null||b.tag!==4||b.stateNode.containerInfo!==k.containerInfo||b.stateNode.implementation!==k.implementation?(b=ec(k,S.mode,W),b.return=S,b):(b=a(b,k.children||[]),b.return=S,b)}function z(S,b,k,W,pe){return b===null||b.tag!==7?(b=zr(k,S.mode,W,pe),b.return=S,b):(b=a(b,k),b.return=S,b)}function B(S,b,k){if(typeof b=="string"&&b!==""||typeof b=="number")return b=Za(""+b,S.mode,k),b.return=S,b;if(typeof b=="object"&&b!==null){switch(b.$$typeof){case ye:return k=Ni(b.type,b.key,b.props,null,S.mode,k),k.ref=Xo(S,null,b),k.return=S,k;case he:return b=ec(b,S.mode,k),b.return=S,b;case Me:var W=b._init;return B(S,W(b._payload),k)}if(yt(b)||Q(b))return b=zr(b,S.mode,k,null),b.return=S,b;oi(S,b)}return null}function L(S,b,k,W){var pe=b!==null?b.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return pe!==null?null:h(S,b,""+k,W);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ye:return k.key===pe?y(S,b,k,W):null;case he:return k.key===pe?C(S,b,k,W):null;case Me:return pe=k._init,L(S,b,pe(k._payload),W)}if(yt(k)||Q(k))return pe!==null?null:z(S,b,k,W,null);oi(S,k)}return null}function oe(S,b,k,W,pe){if(typeof W=="string"&&W!==""||typeof W=="number")return S=S.get(k)||null,h(b,S,""+W,pe);if(typeof W=="object"&&W!==null){switch(W.$$typeof){case ye:return S=S.get(W.key===null?k:W.key)||null,y(b,S,W,pe);case he:return S=S.get(W.key===null?k:W.key)||null,C(b,S,W,pe);case Me:var be=W._init;return oe(S,b,k,be(W._payload),pe)}if(yt(W)||Q(W))return S=S.get(k)||null,z(b,S,W,pe,null);oi(b,W)}return null}function ce(S,b,k,W){for(var pe=null,be=null,we=b,Ee=b=0,Ct=null;we!==null&&Ee<k.length;Ee++){we.index>Ee?(Ct=we,we=null):Ct=we.sibling;var He=L(S,we,k[Ee],W);if(He===null){we===null&&(we=Ct);break}e&&we&&He.alternate===null&&n(S,we),b=u(He,b,Ee),be===null?pe=He:be.sibling=He,be=He,we=Ct}if(Ee===k.length)return r(S,we),et&&Ir(S,Ee),pe;if(we===null){for(;Ee<k.length;Ee++)we=B(S,k[Ee],W),we!==null&&(b=u(we,b,Ee),be===null?pe=we:be.sibling=we,be=we);return et&&Ir(S,Ee),pe}for(we=s(S,we);Ee<k.length;Ee++)Ct=oe(we,S,Ee,k[Ee],W),Ct!==null&&(e&&Ct.alternate!==null&&we.delete(Ct.key===null?Ee:Ct.key),b=u(Ct,b,Ee),be===null?pe=Ct:be.sibling=Ct,be=Ct);return e&&we.forEach(function(vr){return n(S,vr)}),et&&Ir(S,Ee),pe}function ue(S,b,k,W){var pe=Q(k);if(typeof pe!="function")throw Error(i(150));if(k=pe.call(k),k==null)throw Error(i(151));for(var be=pe=null,we=b,Ee=b=0,Ct=null,He=k.next();we!==null&&!He.done;Ee++,He=k.next()){we.index>Ee?(Ct=we,we=null):Ct=we.sibling;var vr=L(S,we,He.value,W);if(vr===null){we===null&&(we=Ct);break}e&&we&&vr.alternate===null&&n(S,we),b=u(vr,b,Ee),be===null?pe=vr:be.sibling=vr,be=vr,we=Ct}if(He.done)return r(S,we),et&&Ir(S,Ee),pe;if(we===null){for(;!He.done;Ee++,He=k.next())He=B(S,He.value,W),He!==null&&(b=u(He,b,Ee),be===null?pe=He:be.sibling=He,be=He);return et&&Ir(S,Ee),pe}for(we=s(S,we);!He.done;Ee++,He=k.next())He=oe(we,S,Ee,He.value,W),He!==null&&(e&&He.alternate!==null&&we.delete(He.key===null?Ee:He.key),b=u(He,b,Ee),be===null?pe=He:be.sibling=He,be=He);return e&&we.forEach(function(_0){return n(S,_0)}),et&&Ir(S,Ee),pe}function lt(S,b,k,W){if(typeof k=="object"&&k!==null&&k.type===U&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case ye:e:{for(var pe=k.key,be=b;be!==null;){if(be.key===pe){if(pe=k.type,pe===U){if(be.tag===7){r(S,be.sibling),b=a(be,k.props.children),b.return=S,S=b;break e}}else if(be.elementType===pe||typeof pe=="object"&&pe!==null&&pe.$$typeof===Me&&wd(pe)===be.type){r(S,be.sibling),b=a(be,k.props),b.ref=Xo(S,be,k),b.return=S,S=b;break e}r(S,be);break}else n(S,be);be=be.sibling}k.type===U?(b=zr(k.props.children,S.mode,W,k.key),b.return=S,S=b):(W=Ni(k.type,k.key,k.props,null,S.mode,W),W.ref=Xo(S,b,k),W.return=S,S=W)}return f(S);case he:e:{for(be=k.key;b!==null;){if(b.key===be)if(b.tag===4&&b.stateNode.containerInfo===k.containerInfo&&b.stateNode.implementation===k.implementation){r(S,b.sibling),b=a(b,k.children||[]),b.return=S,S=b;break e}else{r(S,b);break}else n(S,b);b=b.sibling}b=ec(k,S.mode,W),b.return=S,S=b}return f(S);case Me:return be=k._init,lt(S,b,be(k._payload),W)}if(yt(k))return ce(S,b,k,W);if(Q(k))return ue(S,b,k,W);oi(S,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,b!==null&&b.tag===6?(r(S,b.sibling),b=a(b,k),b.return=S,S=b):(r(S,b),b=Za(k,S.mode,W),b.return=S,S=b),f(S)):r(S,b)}return lt}var io=Sd(!0),kd=Sd(!1),si=ar(null),ii=null,lo=null,ca=null;function ua(){ca=lo=ii=null}function da(e){var n=si.current;Je(si),e._currentValue=n}function fa(e,n,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),e===r)break;e=e.return}}function ao(e,n){ii=e,ca=lo=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&n)!==0&&(Wt=!0),e.firstContext=null)}function ln(e){var n=e._currentValue;if(ca!==e)if(e={context:e,memoizedValue:n,next:null},lo===null){if(ii===null)throw Error(i(308));lo=e,ii.dependencies={lanes:0,firstContext:e}}else lo=lo.next=e;return n}var Rr=null;function pa(e){Rr===null?Rr=[e]:Rr.push(e)}function Cd(e,n,r,s){var a=n.interleaved;return a===null?(r.next=r,pa(n)):(r.next=a.next,a.next=r),n.interleaved=r,Un(e,s)}function Un(e,n){e.lanes|=n;var r=e.alternate;for(r!==null&&(r.lanes|=n),r=e,e=e.return;e!==null;)e.childLanes|=n,r=e.alternate,r!==null&&(r.childLanes|=n),r=e,e=e.return;return r.tag===3?r.stateNode:null}var dr=!1;function ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ed(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Hn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function fr(e,n,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(Be&2)!==0){var a=s.pending;return a===null?n.next=n:(n.next=a.next,a.next=n),s.pending=n,Un(e,r)}return a=s.interleaved,a===null?(n.next=n,pa(s)):(n.next=a.next,a.next=n),s.interleaved=n,Un(e,r)}function li(e,n,r){if(n=n.updateQueue,n!==null&&(n=n.shared,(r&4194240)!==0)){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,Nl(e,r)}}function jd(e,n){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var a=null,u=null;if(r=r.firstBaseUpdate,r!==null){do{var f={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};u===null?a=u=f:u=u.next=f,r=r.next}while(r!==null);u===null?a=u=n:u=u.next=n}else a=u=n;r={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:u,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=n:e.next=n,r.lastBaseUpdate=n}function ai(e,n,r,s){var a=e.updateQueue;dr=!1;var u=a.firstBaseUpdate,f=a.lastBaseUpdate,h=a.shared.pending;if(h!==null){a.shared.pending=null;var y=h,C=y.next;y.next=null,f===null?u=C:f.next=C,f=y;var z=e.alternate;z!==null&&(z=z.updateQueue,h=z.lastBaseUpdate,h!==f&&(h===null?z.firstBaseUpdate=C:h.next=C,z.lastBaseUpdate=y))}if(u!==null){var B=a.baseState;f=0,z=C=y=null,h=u;do{var L=h.lane,oe=h.eventTime;if((s&L)===L){z!==null&&(z=z.next={eventTime:oe,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});e:{var ce=e,ue=h;switch(L=n,oe=r,ue.tag){case 1:if(ce=ue.payload,typeof ce=="function"){B=ce.call(oe,B,L);break e}B=ce;break e;case 3:ce.flags=ce.flags&-65537|128;case 0:if(ce=ue.payload,L=typeof ce=="function"?ce.call(oe,B,L):ce,L==null)break e;B=O({},B,L);break e;case 2:dr=!0}}h.callback!==null&&h.lane!==0&&(e.flags|=64,L=a.effects,L===null?a.effects=[h]:L.push(h))}else oe={eventTime:oe,lane:L,tag:h.tag,payload:h.payload,callback:h.callback,next:null},z===null?(C=z=oe,y=B):z=z.next=oe,f|=L;if(h=h.next,h===null){if(h=a.shared.pending,h===null)break;L=h,h=L.next,L.next=null,a.lastBaseUpdate=L,a.shared.pending=null}}while(!0);if(z===null&&(y=B),a.baseState=y,a.firstBaseUpdate=C,a.lastBaseUpdate=z,n=a.shared.interleaved,n!==null){a=n;do f|=a.lane,a=a.next;while(a!==n)}else u===null&&(a.shared.lanes=0);Pr|=f,e.lanes=f,e.memoizedState=B}}function _d(e,n,r){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var s=e[n],a=s.callback;if(a!==null){if(s.callback=null,s=r,typeof a!="function")throw Error(i(191,a));a.call(s)}}}var Jo={},In=ar(Jo),Zo=ar(Jo),es=ar(Jo);function $r(e){if(e===Jo)throw Error(i(174));return e}function ma(e,n){switch(Qe(es,n),Qe(Zo,e),Qe(In,Jo),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:tt(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=tt(n,e)}Je(In),Qe(In,n)}function co(){Je(In),Je(Zo),Je(es)}function Nd(e){$r(es.current);var n=$r(In.current),r=tt(n,e.type);n!==r&&(Qe(Zo,e),Qe(In,r))}function ga(e){Zo.current===e&&(Je(In),Je(Zo))}var nt=ar(0);function ci(e){for(var n=e;n!==null;){if(n.tag===13){var r=n.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var xa=[];function ya(){for(var e=0;e<xa.length;e++)xa[e]._workInProgressVersionPrimary=null;xa.length=0}var ui=je.ReactCurrentDispatcher,va=je.ReactCurrentBatchConfig,Ar=0,rt=null,ht=null,St=null,di=!1,ts=!1,ns=0,Qm=0;function At(){throw Error(i(321))}function ba(e,n){if(n===null)return!1;for(var r=0;r<n.length&&r<e.length;r++)if(!gn(e[r],n[r]))return!1;return!0}function wa(e,n,r,s,a,u){if(Ar=u,rt=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,ui.current=e===null||e.memoizedState===null?Zm:e0,e=r(s,a),ts){u=0;do{if(ts=!1,ns=0,25<=u)throw Error(i(301));u+=1,St=ht=null,n.updateQueue=null,ui.current=t0,e=r(s,a)}while(ts)}if(ui.current=hi,n=ht!==null&&ht.next!==null,Ar=0,St=ht=rt=null,di=!1,n)throw Error(i(300));return e}function Sa(){var e=ns!==0;return ns=0,e}function Rn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return St===null?rt.memoizedState=St=e:St=St.next=e,St}function an(){if(ht===null){var e=rt.alternate;e=e!==null?e.memoizedState:null}else e=ht.next;var n=St===null?rt.memoizedState:St.next;if(n!==null)St=n,ht=e;else{if(e===null)throw Error(i(310));ht=e,e={memoizedState:ht.memoizedState,baseState:ht.baseState,baseQueue:ht.baseQueue,queue:ht.queue,next:null},St===null?rt.memoizedState=St=e:St=St.next=e}return St}function rs(e,n){return typeof n=="function"?n(e):n}function ka(e){var n=an(),r=n.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=ht,a=s.baseQueue,u=r.pending;if(u!==null){if(a!==null){var f=a.next;a.next=u.next,u.next=f}s.baseQueue=a=u,r.pending=null}if(a!==null){u=a.next,s=s.baseState;var h=f=null,y=null,C=u;do{var z=C.lane;if((Ar&z)===z)y!==null&&(y=y.next={lane:0,action:C.action,hasEagerState:C.hasEagerState,eagerState:C.eagerState,next:null}),s=C.hasEagerState?C.eagerState:e(s,C.action);else{var B={lane:z,action:C.action,hasEagerState:C.hasEagerState,eagerState:C.eagerState,next:null};y===null?(h=y=B,f=s):y=y.next=B,rt.lanes|=z,Pr|=z}C=C.next}while(C!==null&&C!==u);y===null?f=s:y.next=h,gn(s,n.memoizedState)||(Wt=!0),n.memoizedState=s,n.baseState=f,n.baseQueue=y,r.lastRenderedState=s}if(e=r.interleaved,e!==null){a=e;do u=a.lane,rt.lanes|=u,Pr|=u,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[n.memoizedState,r.dispatch]}function Ca(e){var n=an(),r=n.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=r.dispatch,a=r.pending,u=n.memoizedState;if(a!==null){r.pending=null;var f=a=a.next;do u=e(u,f.action),f=f.next;while(f!==a);gn(u,n.memoizedState)||(Wt=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),r.lastRenderedState=u}return[u,s]}function Td(){}function Id(e,n){var r=rt,s=an(),a=n(),u=!gn(s.memoizedState,a);if(u&&(s.memoizedState=a,Wt=!0),s=s.queue,Ea(Ad.bind(null,r,s,e),[e]),s.getSnapshot!==n||u||St!==null&&St.memoizedState.tag&1){if(r.flags|=2048,os(9,$d.bind(null,r,s,a,n),void 0,null),kt===null)throw Error(i(349));(Ar&30)!==0||Rd(r,n,a)}return a}function Rd(e,n,r){e.flags|=16384,e={getSnapshot:n,value:r},n=rt.updateQueue,n===null?(n={lastEffect:null,stores:null},rt.updateQueue=n,n.stores=[e]):(r=n.stores,r===null?n.stores=[e]:r.push(e))}function $d(e,n,r,s){n.value=r,n.getSnapshot=s,Pd(n)&&Md(e)}function Ad(e,n,r){return r(function(){Pd(n)&&Md(e)})}function Pd(e){var n=e.getSnapshot;e=e.value;try{var r=n();return!gn(e,r)}catch{return!0}}function Md(e){var n=Un(e,1);n!==null&&wn(n,e,1,-1)}function Ld(e){var n=Rn();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:rs,lastRenderedState:e},n.queue=e,e=e.dispatch=Jm.bind(null,rt,e),[n.memoizedState,e]}function os(e,n,r,s){return e={tag:e,create:n,destroy:r,deps:s,next:null},n=rt.updateQueue,n===null?(n={lastEffect:null,stores:null},rt.updateQueue=n,n.lastEffect=e.next=e):(r=n.lastEffect,r===null?n.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,n.lastEffect=e)),e}function Od(){return an().memoizedState}function fi(e,n,r,s){var a=Rn();rt.flags|=e,a.memoizedState=os(1|n,r,void 0,s===void 0?null:s)}function pi(e,n,r,s){var a=an();s=s===void 0?null:s;var u=void 0;if(ht!==null){var f=ht.memoizedState;if(u=f.destroy,s!==null&&ba(s,f.deps)){a.memoizedState=os(n,r,u,s);return}}rt.flags|=e,a.memoizedState=os(1|n,r,u,s)}function zd(e,n){return fi(8390656,8,e,n)}function Ea(e,n){return pi(2048,8,e,n)}function Fd(e,n){return pi(4,2,e,n)}function Dd(e,n){return pi(4,4,e,n)}function Bd(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Ud(e,n,r){return r=r!=null?r.concat([e]):null,pi(4,4,Bd.bind(null,n,e),r)}function ja(){}function Hd(e,n){var r=an();n=n===void 0?null:n;var s=r.memoizedState;return s!==null&&n!==null&&ba(n,s[1])?s[0]:(r.memoizedState=[e,n],e)}function Vd(e,n){var r=an();n=n===void 0?null:n;var s=r.memoizedState;return s!==null&&n!==null&&ba(n,s[1])?s[0]:(e=e(),r.memoizedState=[e,n],e)}function Wd(e,n,r){return(Ar&21)===0?(e.baseState&&(e.baseState=!1,Wt=!0),e.memoizedState=r):(gn(r,n)||(r=wu(),rt.lanes|=r,Pr|=r,e.baseState=!0),n)}function Km(e,n){var r=qe;qe=r!==0&&4>r?r:4,e(!0);var s=va.transition;va.transition={};try{e(!1),n()}finally{qe=r,va.transition=s}}function Gd(){return an().memoizedState}function Xm(e,n,r){var s=gr(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},qd(e))Yd(n,r);else if(r=Cd(e,n,r,s),r!==null){var a=Ft();wn(r,e,s,a),Qd(r,n,s)}}function Jm(e,n,r){var s=gr(e),a={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(qd(e))Yd(n,a);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var f=n.lastRenderedState,h=u(f,r);if(a.hasEagerState=!0,a.eagerState=h,gn(h,f)){var y=n.interleaved;y===null?(a.next=a,pa(n)):(a.next=y.next,y.next=a),n.interleaved=a;return}}catch{}finally{}r=Cd(e,n,a,s),r!==null&&(a=Ft(),wn(r,e,s,a),Qd(r,n,s))}}function qd(e){var n=e.alternate;return e===rt||n!==null&&n===rt}function Yd(e,n){ts=di=!0;var r=e.pending;r===null?n.next=n:(n.next=r.next,r.next=n),e.pending=n}function Qd(e,n,r){if((r&4194240)!==0){var s=n.lanes;s&=e.pendingLanes,r|=s,n.lanes=r,Nl(e,r)}}var hi={readContext:ln,useCallback:At,useContext:At,useEffect:At,useImperativeHandle:At,useInsertionEffect:At,useLayoutEffect:At,useMemo:At,useReducer:At,useRef:At,useState:At,useDebugValue:At,useDeferredValue:At,useTransition:At,useMutableSource:At,useSyncExternalStore:At,useId:At,unstable_isNewReconciler:!1},Zm={readContext:ln,useCallback:function(e,n){return Rn().memoizedState=[e,n===void 0?null:n],e},useContext:ln,useEffect:zd,useImperativeHandle:function(e,n,r){return r=r!=null?r.concat([e]):null,fi(4194308,4,Bd.bind(null,n,e),r)},useLayoutEffect:function(e,n){return fi(4194308,4,e,n)},useInsertionEffect:function(e,n){return fi(4,2,e,n)},useMemo:function(e,n){var r=Rn();return n=n===void 0?null:n,e=e(),r.memoizedState=[e,n],e},useReducer:function(e,n,r){var s=Rn();return n=r!==void 0?r(n):n,s.memoizedState=s.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},s.queue=e,e=e.dispatch=Xm.bind(null,rt,e),[s.memoizedState,e]},useRef:function(e){var n=Rn();return e={current:e},n.memoizedState=e},useState:Ld,useDebugValue:ja,useDeferredValue:function(e){return Rn().memoizedState=e},useTransition:function(){var e=Ld(!1),n=e[0];return e=Km.bind(null,e[1]),Rn().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,r){var s=rt,a=Rn();if(et){if(r===void 0)throw Error(i(407));r=r()}else{if(r=n(),kt===null)throw Error(i(349));(Ar&30)!==0||Rd(s,n,r)}a.memoizedState=r;var u={value:r,getSnapshot:n};return a.queue=u,zd(Ad.bind(null,s,u,e),[e]),s.flags|=2048,os(9,$d.bind(null,s,u,r,n),void 0,null),r},useId:function(){var e=Rn(),n=kt.identifierPrefix;if(et){var r=Bn,s=Dn;r=(s&~(1<<32-mn(s)-1)).toString(32)+r,n=":"+n+"R"+r,r=ns++,0<r&&(n+="H"+r.toString(32)),n+=":"}else r=Qm++,n=":"+n+"r"+r.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},e0={readContext:ln,useCallback:Hd,useContext:ln,useEffect:Ea,useImperativeHandle:Ud,useInsertionEffect:Fd,useLayoutEffect:Dd,useMemo:Vd,useReducer:ka,useRef:Od,useState:function(){return ka(rs)},useDebugValue:ja,useDeferredValue:function(e){var n=an();return Wd(n,ht.memoizedState,e)},useTransition:function(){var e=ka(rs)[0],n=an().memoizedState;return[e,n]},useMutableSource:Td,useSyncExternalStore:Id,useId:Gd,unstable_isNewReconciler:!1},t0={readContext:ln,useCallback:Hd,useContext:ln,useEffect:Ea,useImperativeHandle:Ud,useInsertionEffect:Fd,useLayoutEffect:Dd,useMemo:Vd,useReducer:Ca,useRef:Od,useState:function(){return Ca(rs)},useDebugValue:ja,useDeferredValue:function(e){var n=an();return ht===null?n.memoizedState=e:Wd(n,ht.memoizedState,e)},useTransition:function(){var e=Ca(rs)[0],n=an().memoizedState;return[e,n]},useMutableSource:Td,useSyncExternalStore:Id,useId:Gd,unstable_isNewReconciler:!1};function yn(e,n){if(e&&e.defaultProps){n=O({},n),e=e.defaultProps;for(var r in e)n[r]===void 0&&(n[r]=e[r]);return n}return n}function _a(e,n,r,s){n=e.memoizedState,r=r(s,n),r=r==null?n:O({},n,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var mi={isMounted:function(e){return(e=e._reactInternals)?wt(e)===e:!1},enqueueSetState:function(e,n,r){e=e._reactInternals;var s=Ft(),a=gr(e),u=Hn(s,a);u.payload=n,r!=null&&(u.callback=r),n=fr(e,u,a),n!==null&&(wn(n,e,a,s),li(n,e,a))},enqueueReplaceState:function(e,n,r){e=e._reactInternals;var s=Ft(),a=gr(e),u=Hn(s,a);u.tag=1,u.payload=n,r!=null&&(u.callback=r),n=fr(e,u,a),n!==null&&(wn(n,e,a,s),li(n,e,a))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var r=Ft(),s=gr(e),a=Hn(r,s);a.tag=2,n!=null&&(a.callback=n),n=fr(e,a,s),n!==null&&(wn(n,e,s,r),li(n,e,s))}};function Kd(e,n,r,s,a,u,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,u,f):n.prototype&&n.prototype.isPureReactComponent?!Vo(r,s)||!Vo(a,u):!0}function Xd(e,n,r){var s=!1,a=cr,u=n.contextType;return typeof u=="object"&&u!==null?u=ln(u):(a=Vt(n)?Nr:$t.current,s=n.contextTypes,u=(s=s!=null)?no(e,a):cr),n=new n(r,u),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=mi,e.stateNode=n,n._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=u),n}function Jd(e,n,r,s){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(r,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(r,s),n.state!==e&&mi.enqueueReplaceState(n,n.state,null)}function Na(e,n,r,s){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},ha(e);var u=n.contextType;typeof u=="object"&&u!==null?a.context=ln(u):(u=Vt(n)?Nr:$t.current,a.context=no(e,u)),a.state=e.memoizedState,u=n.getDerivedStateFromProps,typeof u=="function"&&(_a(e,n,u,r),a.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(n=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),n!==a.state&&mi.enqueueReplaceState(a,a.state,null),ai(e,r,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function uo(e,n){try{var r="",s=n;do r+=ve(s),s=s.return;while(s);var a=r}catch(u){a=`
Error generating stack: `+u.message+`
`+u.stack}return{value:e,source:n,stack:a,digest:null}}function Ta(e,n,r){return{value:e,source:null,stack:r??null,digest:n??null}}function Ia(e,n){try{console.error(n.value)}catch(r){setTimeout(function(){throw r})}}var n0=typeof WeakMap=="function"?WeakMap:Map;function Zd(e,n,r){r=Hn(-1,r),r.tag=3,r.payload={element:null};var s=n.value;return r.callback=function(){Si||(Si=!0,Wa=s),Ia(e,n)},r}function ef(e,n,r){r=Hn(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=n.value;r.payload=function(){return s(a)},r.callback=function(){Ia(e,n)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(r.callback=function(){Ia(e,n),typeof s!="function"&&(hr===null?hr=new Set([this]):hr.add(this));var f=n.stack;this.componentDidCatch(n.value,{componentStack:f!==null?f:""})}),r}function tf(e,n,r){var s=e.pingCache;if(s===null){s=e.pingCache=new n0;var a=new Set;s.set(n,a)}else a=s.get(n),a===void 0&&(a=new Set,s.set(n,a));a.has(r)||(a.add(r),e=g0.bind(null,e,n,r),n.then(e,e))}function nf(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function rf(e,n,r,s,a){return(e.mode&1)===0?(e===n?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(n=Hn(-1,1),n.tag=2,fr(r,n,1))),r.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var r0=je.ReactCurrentOwner,Wt=!1;function zt(e,n,r,s){n.child=e===null?kd(n,null,r,s):io(n,e.child,r,s)}function of(e,n,r,s,a){r=r.render;var u=n.ref;return ao(n,a),s=wa(e,n,r,s,u,a),r=Sa(),e!==null&&!Wt?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Vn(e,n,a)):(et&&r&&oa(n),n.flags|=1,zt(e,n,s,a),n.child)}function sf(e,n,r,s,a){if(e===null){var u=r.type;return typeof u=="function"&&!Ja(u)&&u.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(n.tag=15,n.type=u,lf(e,n,u,s,a)):(e=Ni(r.type,null,s,n,n.mode,a),e.ref=n.ref,e.return=n,n.child=e)}if(u=e.child,(e.lanes&a)===0){var f=u.memoizedProps;if(r=r.compare,r=r!==null?r:Vo,r(f,s)&&e.ref===n.ref)return Vn(e,n,a)}return n.flags|=1,e=yr(u,s),e.ref=n.ref,e.return=n,n.child=e}function lf(e,n,r,s,a){if(e!==null){var u=e.memoizedProps;if(Vo(u,s)&&e.ref===n.ref)if(Wt=!1,n.pendingProps=s=u,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Wt=!0);else return n.lanes=e.lanes,Vn(e,n,a)}return Ra(e,n,r,s,a)}function af(e,n,r){var s=n.pendingProps,a=s.children,u=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((n.mode&1)===0)n.memoizedState={baseLanes:0,cachePool:null,transitions:null},Qe(po,Zt),Zt|=r;else{if((r&1073741824)===0)return e=u!==null?u.baseLanes|r:r,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,Qe(po,Zt),Zt|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=u!==null?u.baseLanes:r,Qe(po,Zt),Zt|=s}else u!==null?(s=u.baseLanes|r,n.memoizedState=null):s=r,Qe(po,Zt),Zt|=s;return zt(e,n,a,r),n.child}function cf(e,n){var r=n.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(n.flags|=512,n.flags|=2097152)}function Ra(e,n,r,s,a){var u=Vt(r)?Nr:$t.current;return u=no(n,u),ao(n,a),r=wa(e,n,r,s,u,a),s=Sa(),e!==null&&!Wt?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~a,Vn(e,n,a)):(et&&s&&oa(n),n.flags|=1,zt(e,n,r,a),n.child)}function uf(e,n,r,s,a){if(Vt(r)){var u=!0;Zs(n)}else u=!1;if(ao(n,a),n.stateNode===null)xi(e,n),Xd(n,r,s),Na(n,r,s,a),s=!0;else if(e===null){var f=n.stateNode,h=n.memoizedProps;f.props=h;var y=f.context,C=r.contextType;typeof C=="object"&&C!==null?C=ln(C):(C=Vt(r)?Nr:$t.current,C=no(n,C));var z=r.getDerivedStateFromProps,B=typeof z=="function"||typeof f.getSnapshotBeforeUpdate=="function";B||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==s||y!==C)&&Jd(n,f,s,C),dr=!1;var L=n.memoizedState;f.state=L,ai(n,s,f,a),y=n.memoizedState,h!==s||L!==y||Ht.current||dr?(typeof z=="function"&&(_a(n,r,z,s),y=n.memoizedState),(h=dr||Kd(n,r,h,s,L,y,C))?(B||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=y),f.props=s,f.state=y,f.context=C,s=h):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{f=n.stateNode,Ed(e,n),h=n.memoizedProps,C=n.type===n.elementType?h:yn(n.type,h),f.props=C,B=n.pendingProps,L=f.context,y=r.contextType,typeof y=="object"&&y!==null?y=ln(y):(y=Vt(r)?Nr:$t.current,y=no(n,y));var oe=r.getDerivedStateFromProps;(z=typeof oe=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==B||L!==y)&&Jd(n,f,s,y),dr=!1,L=n.memoizedState,f.state=L,ai(n,s,f,a);var ce=n.memoizedState;h!==B||L!==ce||Ht.current||dr?(typeof oe=="function"&&(_a(n,r,oe,s),ce=n.memoizedState),(C=dr||Kd(n,r,C,s,L,ce,y)||!1)?(z||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,ce,y),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,ce,y)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=ce),f.props=s,f.state=ce,f.context=y,s=C):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(n.flags|=1024),s=!1)}return $a(e,n,r,s,u,a)}function $a(e,n,r,s,a,u){cf(e,n);var f=(n.flags&128)!==0;if(!s&&!f)return a&&hd(n,r,!1),Vn(e,n,u);s=n.stateNode,r0.current=n;var h=f&&typeof r.getDerivedStateFromError!="function"?null:s.render();return n.flags|=1,e!==null&&f?(n.child=io(n,e.child,null,u),n.child=io(n,null,h,u)):zt(e,n,h,u),n.memoizedState=s.state,a&&hd(n,r,!0),n.child}function df(e){var n=e.stateNode;n.pendingContext?fd(e,n.pendingContext,n.pendingContext!==n.context):n.context&&fd(e,n.context,!1),ma(e,n.containerInfo)}function ff(e,n,r,s,a){return so(),aa(a),n.flags|=256,zt(e,n,r,s),n.child}var Aa={dehydrated:null,treeContext:null,retryLane:0};function Pa(e){return{baseLanes:e,cachePool:null,transitions:null}}function pf(e,n,r){var s=n.pendingProps,a=nt.current,u=!1,f=(n.flags&128)!==0,h;if((h=f)||(h=e!==null&&e.memoizedState===null?!1:(a&2)!==0),h?(u=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Qe(nt,a&1),e===null)return la(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((n.mode&1)===0?n.lanes=1:e.data==="$!"?n.lanes=8:n.lanes=1073741824,null):(f=s.children,e=s.fallback,u?(s=n.mode,u=n.child,f={mode:"hidden",children:f},(s&1)===0&&u!==null?(u.childLanes=0,u.pendingProps=f):u=Ti(f,s,0,null),e=zr(e,s,r,null),u.return=n,e.return=n,u.sibling=e,n.child=u,n.child.memoizedState=Pa(r),n.memoizedState=Aa,e):Ma(n,f));if(a=e.memoizedState,a!==null&&(h=a.dehydrated,h!==null))return o0(e,n,f,s,h,a,r);if(u){u=s.fallback,f=n.mode,a=e.child,h=a.sibling;var y={mode:"hidden",children:s.children};return(f&1)===0&&n.child!==a?(s=n.child,s.childLanes=0,s.pendingProps=y,n.deletions=null):(s=yr(a,y),s.subtreeFlags=a.subtreeFlags&14680064),h!==null?u=yr(h,u):(u=zr(u,f,r,null),u.flags|=2),u.return=n,s.return=n,s.sibling=u,n.child=s,s=u,u=n.child,f=e.child.memoizedState,f=f===null?Pa(r):{baseLanes:f.baseLanes|r,cachePool:null,transitions:f.transitions},u.memoizedState=f,u.childLanes=e.childLanes&~r,n.memoizedState=Aa,s}return u=e.child,e=u.sibling,s=yr(u,{mode:"visible",children:s.children}),(n.mode&1)===0&&(s.lanes=r),s.return=n,s.sibling=null,e!==null&&(r=n.deletions,r===null?(n.deletions=[e],n.flags|=16):r.push(e)),n.child=s,n.memoizedState=null,s}function Ma(e,n){return n=Ti({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function gi(e,n,r,s){return s!==null&&aa(s),io(n,e.child,null,r),e=Ma(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function o0(e,n,r,s,a,u,f){if(r)return n.flags&256?(n.flags&=-257,s=Ta(Error(i(422))),gi(e,n,f,s)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(u=s.fallback,a=n.mode,s=Ti({mode:"visible",children:s.children},a,0,null),u=zr(u,a,f,null),u.flags|=2,s.return=n,u.return=n,s.sibling=u,n.child=s,(n.mode&1)!==0&&io(n,e.child,null,f),n.child.memoizedState=Pa(f),n.memoizedState=Aa,u);if((n.mode&1)===0)return gi(e,n,f,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var h=s.dgst;return s=h,u=Error(i(419)),s=Ta(u,s,void 0),gi(e,n,f,s)}if(h=(f&e.childLanes)!==0,Wt||h){if(s=kt,s!==null){switch(f&-f){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(s.suspendedLanes|f))!==0?0:a,a!==0&&a!==u.retryLane&&(u.retryLane=a,Un(e,a),wn(s,e,a,-1))}return Xa(),s=Ta(Error(i(421))),gi(e,n,f,s)}return a.data==="$?"?(n.flags|=128,n.child=e.child,n=x0.bind(null,e),a._reactRetry=n,null):(e=u.treeContext,Jt=lr(a.nextSibling),Xt=n,et=!0,xn=null,e!==null&&(on[sn++]=Dn,on[sn++]=Bn,on[sn++]=Tr,Dn=e.id,Bn=e.overflow,Tr=n),n=Ma(n,s.children),n.flags|=4096,n)}function hf(e,n,r){e.lanes|=n;var s=e.alternate;s!==null&&(s.lanes|=n),fa(e.return,n,r)}function La(e,n,r,s,a){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:a}:(u.isBackwards=n,u.rendering=null,u.renderingStartTime=0,u.last=s,u.tail=r,u.tailMode=a)}function mf(e,n,r){var s=n.pendingProps,a=s.revealOrder,u=s.tail;if(zt(e,n,s.children,r),s=nt.current,(s&2)!==0)s=s&1|2,n.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hf(e,r,n);else if(e.tag===19)hf(e,r,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Qe(nt,s),(n.mode&1)===0)n.memoizedState=null;else switch(a){case"forwards":for(r=n.child,a=null;r!==null;)e=r.alternate,e!==null&&ci(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=n.child,n.child=null):(a=r.sibling,r.sibling=null),La(n,!1,a,r,u);break;case"backwards":for(r=null,a=n.child,n.child=null;a!==null;){if(e=a.alternate,e!==null&&ci(e)===null){n.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}La(n,!0,r,null,u);break;case"together":La(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function xi(e,n){(n.mode&1)===0&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function Vn(e,n,r){if(e!==null&&(n.dependencies=e.dependencies),Pr|=n.lanes,(r&n.childLanes)===0)return null;if(e!==null&&n.child!==e.child)throw Error(i(153));if(n.child!==null){for(e=n.child,r=yr(e,e.pendingProps),n.child=r,r.return=n;e.sibling!==null;)e=e.sibling,r=r.sibling=yr(e,e.pendingProps),r.return=n;r.sibling=null}return n.child}function s0(e,n,r){switch(n.tag){case 3:df(n),so();break;case 5:Nd(n);break;case 1:Vt(n.type)&&Zs(n);break;case 4:ma(n,n.stateNode.containerInfo);break;case 10:var s=n.type._context,a=n.memoizedProps.value;Qe(si,s._currentValue),s._currentValue=a;break;case 13:if(s=n.memoizedState,s!==null)return s.dehydrated!==null?(Qe(nt,nt.current&1),n.flags|=128,null):(r&n.child.childLanes)!==0?pf(e,n,r):(Qe(nt,nt.current&1),e=Vn(e,n,r),e!==null?e.sibling:null);Qe(nt,nt.current&1);break;case 19:if(s=(r&n.childLanes)!==0,(e.flags&128)!==0){if(s)return mf(e,n,r);n.flags|=128}if(a=n.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Qe(nt,nt.current),s)break;return null;case 22:case 23:return n.lanes=0,af(e,n,r)}return Vn(e,n,r)}var gf,Oa,xf,yf;gf=function(e,n){for(var r=n.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},Oa=function(){},xf=function(e,n,r,s){var a=e.memoizedProps;if(a!==s){e=n.stateNode,$r(In.current);var u=null;switch(r){case"input":a=Tt(e,a),s=Tt(e,s),u=[];break;case"select":a=O({},a,{value:void 0}),s=O({},s,{value:void 0}),u=[];break;case"textarea":a=vt(e,a),s=vt(e,s),u=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=Ks)}Xn(r,s);var f;r=null;for(C in a)if(!s.hasOwnProperty(C)&&a.hasOwnProperty(C)&&a[C]!=null)if(C==="style"){var h=a[C];for(f in h)h.hasOwnProperty(f)&&(r||(r={}),r[f]="")}else C!=="dangerouslySetInnerHTML"&&C!=="children"&&C!=="suppressContentEditableWarning"&&C!=="suppressHydrationWarning"&&C!=="autoFocus"&&(d.hasOwnProperty(C)?u||(u=[]):(u=u||[]).push(C,null));for(C in s){var y=s[C];if(h=a!=null?a[C]:void 0,s.hasOwnProperty(C)&&y!==h&&(y!=null||h!=null))if(C==="style")if(h){for(f in h)!h.hasOwnProperty(f)||y&&y.hasOwnProperty(f)||(r||(r={}),r[f]="");for(f in y)y.hasOwnProperty(f)&&h[f]!==y[f]&&(r||(r={}),r[f]=y[f])}else r||(u||(u=[]),u.push(C,r)),r=y;else C==="dangerouslySetInnerHTML"?(y=y?y.__html:void 0,h=h?h.__html:void 0,y!=null&&h!==y&&(u=u||[]).push(C,y)):C==="children"?typeof y!="string"&&typeof y!="number"||(u=u||[]).push(C,""+y):C!=="suppressContentEditableWarning"&&C!=="suppressHydrationWarning"&&(d.hasOwnProperty(C)?(y!=null&&C==="onScroll"&&Xe("scroll",e),u||h===y||(u=[])):(u=u||[]).push(C,y))}r&&(u=u||[]).push("style",r);var C=u;(n.updateQueue=C)&&(n.flags|=4)}},yf=function(e,n,r,s){r!==s&&(n.flags|=4)};function ss(e,n){if(!et)switch(e.tailMode){case"hidden":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function Pt(e){var n=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(n)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=r,n}function i0(e,n,r){var s=n.pendingProps;switch(sa(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pt(n),null;case 1:return Vt(n.type)&&Js(),Pt(n),null;case 3:return s=n.stateNode,co(),Je(Ht),Je($t),ya(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ri(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,xn!==null&&(Ya(xn),xn=null))),Oa(e,n),Pt(n),null;case 5:ga(n);var a=$r(es.current);if(r=n.type,e!==null&&n.stateNode!=null)xf(e,n,r,s,a),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!s){if(n.stateNode===null)throw Error(i(166));return Pt(n),null}if(e=$r(In.current),ri(n)){s=n.stateNode,r=n.type;var u=n.memoizedProps;switch(s[Tn]=n,s[Qo]=u,e=(n.mode&1)!==0,r){case"dialog":Xe("cancel",s),Xe("close",s);break;case"iframe":case"object":case"embed":Xe("load",s);break;case"video":case"audio":for(a=0;a<Go.length;a++)Xe(Go[a],s);break;case"source":Xe("error",s);break;case"img":case"image":case"link":Xe("error",s),Xe("load",s);break;case"details":Xe("toggle",s);break;case"input":pn(s,u),Xe("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!u.multiple},Xe("invalid",s);break;case"textarea":Re(s,u),Xe("invalid",s)}Xn(r,u),a=null;for(var f in u)if(u.hasOwnProperty(f)){var h=u[f];f==="children"?typeof h=="string"?s.textContent!==h&&(u.suppressHydrationWarning!==!0&&Qs(s.textContent,h,e),a=["children",h]):typeof h=="number"&&s.textContent!==""+h&&(u.suppressHydrationWarning!==!0&&Qs(s.textContent,h,e),a=["children",""+h]):d.hasOwnProperty(f)&&h!=null&&f==="onScroll"&&Xe("scroll",s)}switch(r){case"input":xt(s),V(s,u,!0);break;case"textarea":xt(s),ze(s);break;case"select":case"option":break;default:typeof u.onClick=="function"&&(s.onclick=Ks)}s=a,n.updateQueue=s,s!==null&&(n.flags|=4)}else{f=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Rt(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=f.createElement(r,{is:s.is}):(e=f.createElement(r),r==="select"&&(f=e,s.multiple?f.multiple=!0:s.size&&(f.size=s.size))):e=f.createElementNS(e,r),e[Tn]=n,e[Qo]=s,gf(e,n,!1,!1),n.stateNode=e;e:{switch(f=nn(r,s),r){case"dialog":Xe("cancel",e),Xe("close",e),a=s;break;case"iframe":case"object":case"embed":Xe("load",e),a=s;break;case"video":case"audio":for(a=0;a<Go.length;a++)Xe(Go[a],e);a=s;break;case"source":Xe("error",e),a=s;break;case"img":case"image":case"link":Xe("error",e),Xe("load",e),a=s;break;case"details":Xe("toggle",e),a=s;break;case"input":pn(e,s),a=Tt(e,s),Xe("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=O({},s,{value:void 0}),Xe("invalid",e);break;case"textarea":Re(e,s),a=vt(e,s),Xe("invalid",e);break;default:a=s}Xn(r,a),h=a;for(u in h)if(h.hasOwnProperty(u)){var y=h[u];u==="style"?tn(e,y):u==="dangerouslySetInnerHTML"?(y=y?y.__html:void 0,y!=null&&En(e,y)):u==="children"?typeof y=="string"?(r!=="textarea"||y!=="")&&at(e,y):typeof y=="number"&&at(e,""+y):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(d.hasOwnProperty(u)?y!=null&&u==="onScroll"&&Xe("scroll",e):y!=null&&de(e,u,y,f))}switch(r){case"input":xt(e),V(e,s,!1);break;case"textarea":xt(e),ze(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Y(s.value));break;case"select":e.multiple=!!s.multiple,u=s.value,u!=null?pt(e,!!s.multiple,u,!1):s.defaultValue!=null&&pt(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Ks)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return Pt(n),null;case 6:if(e&&n.stateNode!=null)yf(e,n,e.memoizedProps,s);else{if(typeof s!="string"&&n.stateNode===null)throw Error(i(166));if(r=$r(es.current),$r(In.current),ri(n)){if(s=n.stateNode,r=n.memoizedProps,s[Tn]=n,(u=s.nodeValue!==r)&&(e=Xt,e!==null))switch(e.tag){case 3:Qs(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Qs(s.nodeValue,r,(e.mode&1)!==0)}u&&(n.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[Tn]=n,n.stateNode=s}return Pt(n),null;case 13:if(Je(nt),s=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(et&&Jt!==null&&(n.mode&1)!==0&&(n.flags&128)===0)bd(),so(),n.flags|=98560,u=!1;else if(u=ri(n),s!==null&&s.dehydrated!==null){if(e===null){if(!u)throw Error(i(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(i(317));u[Tn]=n}else so(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Pt(n),u=!1}else xn!==null&&(Ya(xn),xn=null),u=!0;if(!u)return n.flags&65536?n:null}return(n.flags&128)!==0?(n.lanes=r,n):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(n.child.flags|=8192,(n.mode&1)!==0&&(e===null||(nt.current&1)!==0?mt===0&&(mt=3):Xa())),n.updateQueue!==null&&(n.flags|=4),Pt(n),null);case 4:return co(),Oa(e,n),e===null&&qo(n.stateNode.containerInfo),Pt(n),null;case 10:return da(n.type._context),Pt(n),null;case 17:return Vt(n.type)&&Js(),Pt(n),null;case 19:if(Je(nt),u=n.memoizedState,u===null)return Pt(n),null;if(s=(n.flags&128)!==0,f=u.rendering,f===null)if(s)ss(u,!1);else{if(mt!==0||e!==null&&(e.flags&128)!==0)for(e=n.child;e!==null;){if(f=ci(e),f!==null){for(n.flags|=128,ss(u,!1),s=f.updateQueue,s!==null&&(n.updateQueue=s,n.flags|=4),n.subtreeFlags=0,s=r,r=n.child;r!==null;)u=r,e=s,u.flags&=14680066,f=u.alternate,f===null?(u.childLanes=0,u.lanes=e,u.child=null,u.subtreeFlags=0,u.memoizedProps=null,u.memoizedState=null,u.updateQueue=null,u.dependencies=null,u.stateNode=null):(u.childLanes=f.childLanes,u.lanes=f.lanes,u.child=f.child,u.subtreeFlags=0,u.deletions=null,u.memoizedProps=f.memoizedProps,u.memoizedState=f.memoizedState,u.updateQueue=f.updateQueue,u.type=f.type,e=f.dependencies,u.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Qe(nt,nt.current&1|2),n.child}e=e.sibling}u.tail!==null&&it()>ho&&(n.flags|=128,s=!0,ss(u,!1),n.lanes=4194304)}else{if(!s)if(e=ci(f),e!==null){if(n.flags|=128,s=!0,r=e.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),ss(u,!0),u.tail===null&&u.tailMode==="hidden"&&!f.alternate&&!et)return Pt(n),null}else 2*it()-u.renderingStartTime>ho&&r!==1073741824&&(n.flags|=128,s=!0,ss(u,!1),n.lanes=4194304);u.isBackwards?(f.sibling=n.child,n.child=f):(r=u.last,r!==null?r.sibling=f:n.child=f,u.last=f)}return u.tail!==null?(n=u.tail,u.rendering=n,u.tail=n.sibling,u.renderingStartTime=it(),n.sibling=null,r=nt.current,Qe(nt,s?r&1|2:r&1),n):(Pt(n),null);case 22:case 23:return Ka(),s=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(n.flags|=8192),s&&(n.mode&1)!==0?(Zt&1073741824)!==0&&(Pt(n),n.subtreeFlags&6&&(n.flags|=8192)):Pt(n),null;case 24:return null;case 25:return null}throw Error(i(156,n.tag))}function l0(e,n){switch(sa(n),n.tag){case 1:return Vt(n.type)&&Js(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return co(),Je(Ht),Je($t),ya(),e=n.flags,(e&65536)!==0&&(e&128)===0?(n.flags=e&-65537|128,n):null;case 5:return ga(n),null;case 13:if(Je(nt),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(i(340));so()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Je(nt),null;case 4:return co(),null;case 10:return da(n.type._context),null;case 22:case 23:return Ka(),null;case 24:return null;default:return null}}var yi=!1,Mt=!1,a0=typeof WeakSet=="function"?WeakSet:Set,se=null;function fo(e,n){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){st(e,n,s)}else r.current=null}function za(e,n,r){try{r()}catch(s){st(e,n,s)}}var vf=!1;function c0(e,n){if(Kl=zs,e=Ku(),Ul(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var a=s.anchorOffset,u=s.focusNode;s=s.focusOffset;try{r.nodeType,u.nodeType}catch{r=null;break e}var f=0,h=-1,y=-1,C=0,z=0,B=e,L=null;t:for(;;){for(var oe;B!==r||a!==0&&B.nodeType!==3||(h=f+a),B!==u||s!==0&&B.nodeType!==3||(y=f+s),B.nodeType===3&&(f+=B.nodeValue.length),(oe=B.firstChild)!==null;)L=B,B=oe;for(;;){if(B===e)break t;if(L===r&&++C===a&&(h=f),L===u&&++z===s&&(y=f),(oe=B.nextSibling)!==null)break;B=L,L=B.parentNode}B=oe}r=h===-1||y===-1?null:{start:h,end:y}}else r=null}r=r||{start:0,end:0}}else r=null;for(Xl={focusedElem:e,selectionRange:r},zs=!1,se=n;se!==null;)if(n=se,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,se=e;else for(;se!==null;){n=se;try{var ce=n.alternate;if((n.flags&1024)!==0)switch(n.tag){case 0:case 11:case 15:break;case 1:if(ce!==null){var ue=ce.memoizedProps,lt=ce.memoizedState,S=n.stateNode,b=S.getSnapshotBeforeUpdate(n.elementType===n.type?ue:yn(n.type,ue),lt);S.__reactInternalSnapshotBeforeUpdate=b}break;case 3:var k=n.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(W){st(n,n.return,W)}if(e=n.sibling,e!==null){e.return=n.return,se=e;break}se=n.return}return ce=vf,vf=!1,ce}function is(e,n,r){var s=n.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var u=a.destroy;a.destroy=void 0,u!==void 0&&za(n,r,u)}a=a.next}while(a!==s)}}function vi(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var r=n=n.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==n)}}function Fa(e){var n=e.ref;if(n!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof n=="function"?n(e):n.current=e}}function bf(e){var n=e.alternate;n!==null&&(e.alternate=null,bf(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Tn],delete n[Qo],delete n[ta],delete n[Wm],delete n[Gm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function wf(e){return e.tag===5||e.tag===3||e.tag===4}function Sf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Da(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?r.nodeType===8?r.parentNode.insertBefore(e,n):r.insertBefore(e,n):(r.nodeType===8?(n=r.parentNode,n.insertBefore(e,r)):(n=r,n.appendChild(e)),r=r._reactRootContainer,r!=null||n.onclick!==null||(n.onclick=Ks));else if(s!==4&&(e=e.child,e!==null))for(Da(e,n,r),e=e.sibling;e!==null;)Da(e,n,r),e=e.sibling}function Ba(e,n,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?r.insertBefore(e,n):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Ba(e,n,r),e=e.sibling;e!==null;)Ba(e,n,r),e=e.sibling}var _t=null,vn=!1;function pr(e,n,r){for(r=r.child;r!==null;)kf(e,n,r),r=r.sibling}function kf(e,n,r){if(Nn&&typeof Nn.onCommitFiberUnmount=="function")try{Nn.onCommitFiberUnmount($s,r)}catch{}switch(r.tag){case 5:Mt||fo(r,n);case 6:var s=_t,a=vn;_t=null,pr(e,n,r),_t=s,vn=a,_t!==null&&(vn?(e=_t,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):_t.removeChild(r.stateNode));break;case 18:_t!==null&&(vn?(e=_t,r=r.stateNode,e.nodeType===8?ea(e.parentNode,r):e.nodeType===1&&ea(e,r),zo(e)):ea(_t,r.stateNode));break;case 4:s=_t,a=vn,_t=r.stateNode.containerInfo,vn=!0,pr(e,n,r),_t=s,vn=a;break;case 0:case 11:case 14:case 15:if(!Mt&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var u=a,f=u.destroy;u=u.tag,f!==void 0&&((u&2)!==0||(u&4)!==0)&&za(r,n,f),a=a.next}while(a!==s)}pr(e,n,r);break;case 1:if(!Mt&&(fo(r,n),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(h){st(r,n,h)}pr(e,n,r);break;case 21:pr(e,n,r);break;case 22:r.mode&1?(Mt=(s=Mt)||r.memoizedState!==null,pr(e,n,r),Mt=s):pr(e,n,r);break;default:pr(e,n,r)}}function Cf(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new a0),n.forEach(function(s){var a=y0.bind(null,e,s);r.has(s)||(r.add(s),s.then(a,a))})}}function bn(e,n){var r=n.deletions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];try{var u=e,f=n,h=f;e:for(;h!==null;){switch(h.tag){case 5:_t=h.stateNode,vn=!1;break e;case 3:_t=h.stateNode.containerInfo,vn=!0;break e;case 4:_t=h.stateNode.containerInfo,vn=!0;break e}h=h.return}if(_t===null)throw Error(i(160));kf(u,f,a),_t=null,vn=!1;var y=a.alternate;y!==null&&(y.return=null),a.return=null}catch(C){st(a,n,C)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Ef(n,e),n=n.sibling}function Ef(e,n){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(bn(n,e),$n(e),s&4){try{is(3,e,e.return),vi(3,e)}catch(ue){st(e,e.return,ue)}try{is(5,e,e.return)}catch(ue){st(e,e.return,ue)}}break;case 1:bn(n,e),$n(e),s&512&&r!==null&&fo(r,r.return);break;case 5:if(bn(n,e),$n(e),s&512&&r!==null&&fo(r,r.return),e.flags&32){var a=e.stateNode;try{at(a,"")}catch(ue){st(e,e.return,ue)}}if(s&4&&(a=e.stateNode,a!=null)){var u=e.memoizedProps,f=r!==null?r.memoizedProps:u,h=e.type,y=e.updateQueue;if(e.updateQueue=null,y!==null)try{h==="input"&&u.type==="radio"&&u.name!=null&&De(a,u),nn(h,f);var C=nn(h,u);for(f=0;f<y.length;f+=2){var z=y[f],B=y[f+1];z==="style"?tn(a,B):z==="dangerouslySetInnerHTML"?En(a,B):z==="children"?at(a,B):de(a,z,B,C)}switch(h){case"input":It(a,u);break;case"textarea":Ke(a,u);break;case"select":var L=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!u.multiple;var oe=u.value;oe!=null?pt(a,!!u.multiple,oe,!1):L!==!!u.multiple&&(u.defaultValue!=null?pt(a,!!u.multiple,u.defaultValue,!0):pt(a,!!u.multiple,u.multiple?[]:"",!1))}a[Qo]=u}catch(ue){st(e,e.return,ue)}}break;case 6:if(bn(n,e),$n(e),s&4){if(e.stateNode===null)throw Error(i(162));a=e.stateNode,u=e.memoizedProps;try{a.nodeValue=u}catch(ue){st(e,e.return,ue)}}break;case 3:if(bn(n,e),$n(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{zo(n.containerInfo)}catch(ue){st(e,e.return,ue)}break;case 4:bn(n,e),$n(e);break;case 13:bn(n,e),$n(e),a=e.child,a.flags&8192&&(u=a.memoizedState!==null,a.stateNode.isHidden=u,!u||a.alternate!==null&&a.alternate.memoizedState!==null||(Va=it())),s&4&&Cf(e);break;case 22:if(z=r!==null&&r.memoizedState!==null,e.mode&1?(Mt=(C=Mt)||z,bn(n,e),Mt=C):bn(n,e),$n(e),s&8192){if(C=e.memoizedState!==null,(e.stateNode.isHidden=C)&&!z&&(e.mode&1)!==0)for(se=e,z=e.child;z!==null;){for(B=se=z;se!==null;){switch(L=se,oe=L.child,L.tag){case 0:case 11:case 14:case 15:is(4,L,L.return);break;case 1:fo(L,L.return);var ce=L.stateNode;if(typeof ce.componentWillUnmount=="function"){s=L,r=L.return;try{n=s,ce.props=n.memoizedProps,ce.state=n.memoizedState,ce.componentWillUnmount()}catch(ue){st(s,r,ue)}}break;case 5:fo(L,L.return);break;case 22:if(L.memoizedState!==null){Nf(B);continue}}oe!==null?(oe.return=L,se=oe):Nf(B)}z=z.sibling}e:for(z=null,B=e;;){if(B.tag===5){if(z===null){z=B;try{a=B.stateNode,C?(u=a.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none"):(h=B.stateNode,y=B.memoizedProps.style,f=y!=null&&y.hasOwnProperty("display")?y.display:null,h.style.display=ot("display",f))}catch(ue){st(e,e.return,ue)}}}else if(B.tag===6){if(z===null)try{B.stateNode.nodeValue=C?"":B.memoizedProps}catch(ue){st(e,e.return,ue)}}else if((B.tag!==22&&B.tag!==23||B.memoizedState===null||B===e)&&B.child!==null){B.child.return=B,B=B.child;continue}if(B===e)break e;for(;B.sibling===null;){if(B.return===null||B.return===e)break e;z===B&&(z=null),B=B.return}z===B&&(z=null),B.sibling.return=B.return,B=B.sibling}}break;case 19:bn(n,e),$n(e),s&4&&Cf(e);break;case 21:break;default:bn(n,e),$n(e)}}function $n(e){var n=e.flags;if(n&2){try{e:{for(var r=e.return;r!==null;){if(wf(r)){var s=r;break e}r=r.return}throw Error(i(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(at(a,""),s.flags&=-33);var u=Sf(e);Ba(e,u,a);break;case 3:case 4:var f=s.stateNode.containerInfo,h=Sf(e);Da(e,h,f);break;default:throw Error(i(161))}}catch(y){st(e,e.return,y)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function u0(e,n,r){se=e,jf(e)}function jf(e,n,r){for(var s=(e.mode&1)!==0;se!==null;){var a=se,u=a.child;if(a.tag===22&&s){var f=a.memoizedState!==null||yi;if(!f){var h=a.alternate,y=h!==null&&h.memoizedState!==null||Mt;h=yi;var C=Mt;if(yi=f,(Mt=y)&&!C)for(se=a;se!==null;)f=se,y=f.child,f.tag===22&&f.memoizedState!==null?Tf(a):y!==null?(y.return=f,se=y):Tf(a);for(;u!==null;)se=u,jf(u),u=u.sibling;se=a,yi=h,Mt=C}_f(e)}else(a.subtreeFlags&8772)!==0&&u!==null?(u.return=a,se=u):_f(e)}}function _f(e){for(;se!==null;){var n=se;if((n.flags&8772)!==0){var r=n.alternate;try{if((n.flags&8772)!==0)switch(n.tag){case 0:case 11:case 15:Mt||vi(5,n);break;case 1:var s=n.stateNode;if(n.flags&4&&!Mt)if(r===null)s.componentDidMount();else{var a=n.elementType===n.type?r.memoizedProps:yn(n.type,r.memoizedProps);s.componentDidUpdate(a,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var u=n.updateQueue;u!==null&&_d(n,u,s);break;case 3:var f=n.updateQueue;if(f!==null){if(r=null,n.child!==null)switch(n.child.tag){case 5:r=n.child.stateNode;break;case 1:r=n.child.stateNode}_d(n,f,r)}break;case 5:var h=n.stateNode;if(r===null&&n.flags&4){r=h;var y=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":y.autoFocus&&r.focus();break;case"img":y.src&&(r.src=y.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var C=n.alternate;if(C!==null){var z=C.memoizedState;if(z!==null){var B=z.dehydrated;B!==null&&zo(B)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}Mt||n.flags&512&&Fa(n)}catch(L){st(n,n.return,L)}}if(n===e){se=null;break}if(r=n.sibling,r!==null){r.return=n.return,se=r;break}se=n.return}}function Nf(e){for(;se!==null;){var n=se;if(n===e){se=null;break}var r=n.sibling;if(r!==null){r.return=n.return,se=r;break}se=n.return}}function Tf(e){for(;se!==null;){var n=se;try{switch(n.tag){case 0:case 11:case 15:var r=n.return;try{vi(4,n)}catch(y){st(n,r,y)}break;case 1:var s=n.stateNode;if(typeof s.componentDidMount=="function"){var a=n.return;try{s.componentDidMount()}catch(y){st(n,a,y)}}var u=n.return;try{Fa(n)}catch(y){st(n,u,y)}break;case 5:var f=n.return;try{Fa(n)}catch(y){st(n,f,y)}}}catch(y){st(n,n.return,y)}if(n===e){se=null;break}var h=n.sibling;if(h!==null){h.return=n.return,se=h;break}se=n.return}}var d0=Math.ceil,bi=je.ReactCurrentDispatcher,Ua=je.ReactCurrentOwner,cn=je.ReactCurrentBatchConfig,Be=0,kt=null,ct=null,Nt=0,Zt=0,po=ar(0),mt=0,ls=null,Pr=0,wi=0,Ha=0,as=null,Gt=null,Va=0,ho=1/0,Wn=null,Si=!1,Wa=null,hr=null,ki=!1,mr=null,Ci=0,cs=0,Ga=null,Ei=-1,ji=0;function Ft(){return(Be&6)!==0?it():Ei!==-1?Ei:Ei=it()}function gr(e){return(e.mode&1)===0?1:(Be&2)!==0&&Nt!==0?Nt&-Nt:Ym.transition!==null?(ji===0&&(ji=wu()),ji):(e=qe,e!==0||(e=window.event,e=e===void 0?16:Iu(e.type)),e)}function wn(e,n,r,s){if(50<cs)throw cs=0,Ga=null,Error(i(185));Ao(e,r,s),((Be&2)===0||e!==kt)&&(e===kt&&((Be&2)===0&&(wi|=r),mt===4&&xr(e,Nt)),qt(e,s),r===1&&Be===0&&(n.mode&1)===0&&(ho=it()+500,ei&&ur()))}function qt(e,n){var r=e.callbackNode;Yh(e,n);var s=Ms(e,e===kt?Nt:0);if(s===0)r!==null&&yu(r),e.callbackNode=null,e.callbackPriority=0;else if(n=s&-s,e.callbackPriority!==n){if(r!=null&&yu(r),n===1)e.tag===0?qm(Rf.bind(null,e)):md(Rf.bind(null,e)),Hm(function(){(Be&6)===0&&ur()}),r=null;else{switch(Su(s)){case 1:r=El;break;case 4:r=vu;break;case 16:r=Rs;break;case 536870912:r=bu;break;default:r=Rs}r=Ff(r,If.bind(null,e))}e.callbackPriority=n,e.callbackNode=r}}function If(e,n){if(Ei=-1,ji=0,(Be&6)!==0)throw Error(i(327));var r=e.callbackNode;if(mo()&&e.callbackNode!==r)return null;var s=Ms(e,e===kt?Nt:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||n)n=_i(e,s);else{n=s;var a=Be;Be|=2;var u=Af();(kt!==e||Nt!==n)&&(Wn=null,ho=it()+500,Lr(e,n));do try{h0();break}catch(h){$f(e,h)}while(!0);ua(),bi.current=u,Be=a,ct!==null?n=0:(kt=null,Nt=0,n=mt)}if(n!==0){if(n===2&&(a=jl(e),a!==0&&(s=a,n=qa(e,a))),n===1)throw r=ls,Lr(e,0),xr(e,s),qt(e,it()),r;if(n===6)xr(e,s);else{if(a=e.current.alternate,(s&30)===0&&!f0(a)&&(n=_i(e,s),n===2&&(u=jl(e),u!==0&&(s=u,n=qa(e,u))),n===1))throw r=ls,Lr(e,0),xr(e,s),qt(e,it()),r;switch(e.finishedWork=a,e.finishedLanes=s,n){case 0:case 1:throw Error(i(345));case 2:Or(e,Gt,Wn);break;case 3:if(xr(e,s),(s&130023424)===s&&(n=Va+500-it(),10<n)){if(Ms(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){Ft(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Zl(Or.bind(null,e,Gt,Wn),n);break}Or(e,Gt,Wn);break;case 4:if(xr(e,s),(s&4194240)===s)break;for(n=e.eventTimes,a=-1;0<s;){var f=31-mn(s);u=1<<f,f=n[f],f>a&&(a=f),s&=~u}if(s=a,s=it()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*d0(s/1960))-s,10<s){e.timeoutHandle=Zl(Or.bind(null,e,Gt,Wn),s);break}Or(e,Gt,Wn);break;case 5:Or(e,Gt,Wn);break;default:throw Error(i(329))}}}return qt(e,it()),e.callbackNode===r?If.bind(null,e):null}function qa(e,n){var r=as;return e.current.memoizedState.isDehydrated&&(Lr(e,n).flags|=256),e=_i(e,n),e!==2&&(n=Gt,Gt=r,n!==null&&Ya(n)),e}function Ya(e){Gt===null?Gt=e:Gt.push.apply(Gt,e)}function f0(e){for(var n=e;;){if(n.flags&16384){var r=n.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var a=r[s],u=a.getSnapshot;a=a.value;try{if(!gn(u(),a))return!1}catch{return!1}}}if(r=n.child,n.subtreeFlags&16384&&r!==null)r.return=n,n=r;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function xr(e,n){for(n&=~Ha,n&=~wi,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var r=31-mn(n),s=1<<r;e[r]=-1,n&=~s}}function Rf(e){if((Be&6)!==0)throw Error(i(327));mo();var n=Ms(e,0);if((n&1)===0)return qt(e,it()),null;var r=_i(e,n);if(e.tag!==0&&r===2){var s=jl(e);s!==0&&(n=s,r=qa(e,s))}if(r===1)throw r=ls,Lr(e,0),xr(e,n),qt(e,it()),r;if(r===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Or(e,Gt,Wn),qt(e,it()),null}function Qa(e,n){var r=Be;Be|=1;try{return e(n)}finally{Be=r,Be===0&&(ho=it()+500,ei&&ur())}}function Mr(e){mr!==null&&mr.tag===0&&(Be&6)===0&&mo();var n=Be;Be|=1;var r=cn.transition,s=qe;try{if(cn.transition=null,qe=1,e)return e()}finally{qe=s,cn.transition=r,Be=n,(Be&6)===0&&ur()}}function Ka(){Zt=po.current,Je(po)}function Lr(e,n){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Um(r)),ct!==null)for(r=ct.return;r!==null;){var s=r;switch(sa(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Js();break;case 3:co(),Je(Ht),Je($t),ya();break;case 5:ga(s);break;case 4:co();break;case 13:Je(nt);break;case 19:Je(nt);break;case 10:da(s.type._context);break;case 22:case 23:Ka()}r=r.return}if(kt=e,ct=e=yr(e.current,null),Nt=Zt=n,mt=0,ls=null,Ha=wi=Pr=0,Gt=as=null,Rr!==null){for(n=0;n<Rr.length;n++)if(r=Rr[n],s=r.interleaved,s!==null){r.interleaved=null;var a=s.next,u=r.pending;if(u!==null){var f=u.next;u.next=a,s.next=f}r.pending=s}Rr=null}return e}function $f(e,n){do{var r=ct;try{if(ua(),ui.current=hi,di){for(var s=rt.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}di=!1}if(Ar=0,St=ht=rt=null,ts=!1,ns=0,Ua.current=null,r===null||r.return===null){mt=1,ls=n,ct=null;break}e:{var u=e,f=r.return,h=r,y=n;if(n=Nt,h.flags|=32768,y!==null&&typeof y=="object"&&typeof y.then=="function"){var C=y,z=h,B=z.tag;if((z.mode&1)===0&&(B===0||B===11||B===15)){var L=z.alternate;L?(z.updateQueue=L.updateQueue,z.memoizedState=L.memoizedState,z.lanes=L.lanes):(z.updateQueue=null,z.memoizedState=null)}var oe=nf(f);if(oe!==null){oe.flags&=-257,rf(oe,f,h,u,n),oe.mode&1&&tf(u,C,n),n=oe,y=C;var ce=n.updateQueue;if(ce===null){var ue=new Set;ue.add(y),n.updateQueue=ue}else ce.add(y);break e}else{if((n&1)===0){tf(u,C,n),Xa();break e}y=Error(i(426))}}else if(et&&h.mode&1){var lt=nf(f);if(lt!==null){(lt.flags&65536)===0&&(lt.flags|=256),rf(lt,f,h,u,n),aa(uo(y,h));break e}}u=y=uo(y,h),mt!==4&&(mt=2),as===null?as=[u]:as.push(u),u=f;do{switch(u.tag){case 3:u.flags|=65536,n&=-n,u.lanes|=n;var S=Zd(u,y,n);jd(u,S);break e;case 1:h=y;var b=u.type,k=u.stateNode;if((u.flags&128)===0&&(typeof b.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(hr===null||!hr.has(k)))){u.flags|=65536,n&=-n,u.lanes|=n;var W=ef(u,h,n);jd(u,W);break e}}u=u.return}while(u!==null)}Mf(r)}catch(pe){n=pe,ct===r&&r!==null&&(ct=r=r.return);continue}break}while(!0)}function Af(){var e=bi.current;return bi.current=hi,e===null?hi:e}function Xa(){(mt===0||mt===3||mt===2)&&(mt=4),kt===null||(Pr&268435455)===0&&(wi&268435455)===0||xr(kt,Nt)}function _i(e,n){var r=Be;Be|=2;var s=Af();(kt!==e||Nt!==n)&&(Wn=null,Lr(e,n));do try{p0();break}catch(a){$f(e,a)}while(!0);if(ua(),Be=r,bi.current=s,ct!==null)throw Error(i(261));return kt=null,Nt=0,mt}function p0(){for(;ct!==null;)Pf(ct)}function h0(){for(;ct!==null&&!Fh();)Pf(ct)}function Pf(e){var n=zf(e.alternate,e,Zt);e.memoizedProps=e.pendingProps,n===null?Mf(e):ct=n,Ua.current=null}function Mf(e){var n=e;do{var r=n.alternate;if(e=n.return,(n.flags&32768)===0){if(r=i0(r,n,Zt),r!==null){ct=r;return}}else{if(r=l0(r,n),r!==null){r.flags&=32767,ct=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{mt=6,ct=null;return}}if(n=n.sibling,n!==null){ct=n;return}ct=n=e}while(n!==null);mt===0&&(mt=5)}function Or(e,n,r){var s=qe,a=cn.transition;try{cn.transition=null,qe=1,m0(e,n,r,s)}finally{cn.transition=a,qe=s}return null}function m0(e,n,r,s){do mo();while(mr!==null);if((Be&6)!==0)throw Error(i(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var u=r.lanes|r.childLanes;if(Qh(e,u),e===kt&&(ct=kt=null,Nt=0),(r.subtreeFlags&2064)===0&&(r.flags&2064)===0||ki||(ki=!0,Ff(Rs,function(){return mo(),null})),u=(r.flags&15990)!==0,(r.subtreeFlags&15990)!==0||u){u=cn.transition,cn.transition=null;var f=qe;qe=1;var h=Be;Be|=4,Ua.current=null,c0(e,r),Ef(r,e),Mm(Xl),zs=!!Kl,Xl=Kl=null,e.current=r,u0(r),Dh(),Be=h,qe=f,cn.transition=u}else e.current=r;if(ki&&(ki=!1,mr=e,Ci=a),u=e.pendingLanes,u===0&&(hr=null),Hh(r.stateNode),qt(e,it()),n!==null)for(s=e.onRecoverableError,r=0;r<n.length;r++)a=n[r],s(a.value,{componentStack:a.stack,digest:a.digest});if(Si)throw Si=!1,e=Wa,Wa=null,e;return(Ci&1)!==0&&e.tag!==0&&mo(),u=e.pendingLanes,(u&1)!==0?e===Ga?cs++:(cs=0,Ga=e):cs=0,ur(),null}function mo(){if(mr!==null){var e=Su(Ci),n=cn.transition,r=qe;try{if(cn.transition=null,qe=16>e?16:e,mr===null)var s=!1;else{if(e=mr,mr=null,Ci=0,(Be&6)!==0)throw Error(i(331));var a=Be;for(Be|=4,se=e.current;se!==null;){var u=se,f=u.child;if((se.flags&16)!==0){var h=u.deletions;if(h!==null){for(var y=0;y<h.length;y++){var C=h[y];for(se=C;se!==null;){var z=se;switch(z.tag){case 0:case 11:case 15:is(8,z,u)}var B=z.child;if(B!==null)B.return=z,se=B;else for(;se!==null;){z=se;var L=z.sibling,oe=z.return;if(bf(z),z===C){se=null;break}if(L!==null){L.return=oe,se=L;break}se=oe}}}var ce=u.alternate;if(ce!==null){var ue=ce.child;if(ue!==null){ce.child=null;do{var lt=ue.sibling;ue.sibling=null,ue=lt}while(ue!==null)}}se=u}}if((u.subtreeFlags&2064)!==0&&f!==null)f.return=u,se=f;else e:for(;se!==null;){if(u=se,(u.flags&2048)!==0)switch(u.tag){case 0:case 11:case 15:is(9,u,u.return)}var S=u.sibling;if(S!==null){S.return=u.return,se=S;break e}se=u.return}}var b=e.current;for(se=b;se!==null;){f=se;var k=f.child;if((f.subtreeFlags&2064)!==0&&k!==null)k.return=f,se=k;else e:for(f=b;se!==null;){if(h=se,(h.flags&2048)!==0)try{switch(h.tag){case 0:case 11:case 15:vi(9,h)}}catch(pe){st(h,h.return,pe)}if(h===f){se=null;break e}var W=h.sibling;if(W!==null){W.return=h.return,se=W;break e}se=h.return}}if(Be=a,ur(),Nn&&typeof Nn.onPostCommitFiberRoot=="function")try{Nn.onPostCommitFiberRoot($s,e)}catch{}s=!0}return s}finally{qe=r,cn.transition=n}}return!1}function Lf(e,n,r){n=uo(r,n),n=Zd(e,n,1),e=fr(e,n,1),n=Ft(),e!==null&&(Ao(e,1,n),qt(e,n))}function st(e,n,r){if(e.tag===3)Lf(e,e,r);else for(;n!==null;){if(n.tag===3){Lf(n,e,r);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(hr===null||!hr.has(s))){e=uo(r,e),e=ef(n,e,1),n=fr(n,e,1),e=Ft(),n!==null&&(Ao(n,1,e),qt(n,e));break}}n=n.return}}function g0(e,n,r){var s=e.pingCache;s!==null&&s.delete(n),n=Ft(),e.pingedLanes|=e.suspendedLanes&r,kt===e&&(Nt&r)===r&&(mt===4||mt===3&&(Nt&130023424)===Nt&&500>it()-Va?Lr(e,0):Ha|=r),qt(e,n)}function Of(e,n){n===0&&((e.mode&1)===0?n=1:(n=Ps,Ps<<=1,(Ps&130023424)===0&&(Ps=4194304)));var r=Ft();e=Un(e,n),e!==null&&(Ao(e,n,r),qt(e,r))}function x0(e){var n=e.memoizedState,r=0;n!==null&&(r=n.retryLane),Of(e,r)}function y0(e,n){var r=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(i(314))}s!==null&&s.delete(n),Of(e,r)}var zf;zf=function(e,n,r){if(e!==null)if(e.memoizedProps!==n.pendingProps||Ht.current)Wt=!0;else{if((e.lanes&r)===0&&(n.flags&128)===0)return Wt=!1,s0(e,n,r);Wt=(e.flags&131072)!==0}else Wt=!1,et&&(n.flags&1048576)!==0&&gd(n,ni,n.index);switch(n.lanes=0,n.tag){case 2:var s=n.type;xi(e,n),e=n.pendingProps;var a=no(n,$t.current);ao(n,r),a=wa(null,n,s,e,a,r);var u=Sa();return n.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Vt(s)?(u=!0,Zs(n)):u=!1,n.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,ha(n),a.updater=mi,n.stateNode=a,a._reactInternals=n,Na(n,s,e,r),n=$a(null,n,s,!0,u,r)):(n.tag=0,et&&u&&oa(n),zt(null,n,a,r),n=n.child),n;case 16:s=n.elementType;e:{switch(xi(e,n),e=n.pendingProps,a=s._init,s=a(s._payload),n.type=s,a=n.tag=b0(s),e=yn(s,e),a){case 0:n=Ra(null,n,s,e,r);break e;case 1:n=uf(null,n,s,e,r);break e;case 11:n=of(null,n,s,e,r);break e;case 14:n=sf(null,n,s,yn(s.type,e),r);break e}throw Error(i(306,s,""))}return n;case 0:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:yn(s,a),Ra(e,n,s,a,r);case 1:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:yn(s,a),uf(e,n,s,a,r);case 3:e:{if(df(n),e===null)throw Error(i(387));s=n.pendingProps,u=n.memoizedState,a=u.element,Ed(e,n),ai(n,s,null,r);var f=n.memoizedState;if(s=f.element,u.isDehydrated)if(u={element:s,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){a=uo(Error(i(423)),n),n=ff(e,n,s,r,a);break e}else if(s!==a){a=uo(Error(i(424)),n),n=ff(e,n,s,r,a);break e}else for(Jt=lr(n.stateNode.containerInfo.firstChild),Xt=n,et=!0,xn=null,r=kd(n,null,s,r),n.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(so(),s===a){n=Vn(e,n,r);break e}zt(e,n,s,r)}n=n.child}return n;case 5:return Nd(n),e===null&&la(n),s=n.type,a=n.pendingProps,u=e!==null?e.memoizedProps:null,f=a.children,Jl(s,a)?f=null:u!==null&&Jl(s,u)&&(n.flags|=32),cf(e,n),zt(e,n,f,r),n.child;case 6:return e===null&&la(n),null;case 13:return pf(e,n,r);case 4:return ma(n,n.stateNode.containerInfo),s=n.pendingProps,e===null?n.child=io(n,null,s,r):zt(e,n,s,r),n.child;case 11:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:yn(s,a),of(e,n,s,a,r);case 7:return zt(e,n,n.pendingProps,r),n.child;case 8:return zt(e,n,n.pendingProps.children,r),n.child;case 12:return zt(e,n,n.pendingProps.children,r),n.child;case 10:e:{if(s=n.type._context,a=n.pendingProps,u=n.memoizedProps,f=a.value,Qe(si,s._currentValue),s._currentValue=f,u!==null)if(gn(u.value,f)){if(u.children===a.children&&!Ht.current){n=Vn(e,n,r);break e}}else for(u=n.child,u!==null&&(u.return=n);u!==null;){var h=u.dependencies;if(h!==null){f=u.child;for(var y=h.firstContext;y!==null;){if(y.context===s){if(u.tag===1){y=Hn(-1,r&-r),y.tag=2;var C=u.updateQueue;if(C!==null){C=C.shared;var z=C.pending;z===null?y.next=y:(y.next=z.next,z.next=y),C.pending=y}}u.lanes|=r,y=u.alternate,y!==null&&(y.lanes|=r),fa(u.return,r,n),h.lanes|=r;break}y=y.next}}else if(u.tag===10)f=u.type===n.type?null:u.child;else if(u.tag===18){if(f=u.return,f===null)throw Error(i(341));f.lanes|=r,h=f.alternate,h!==null&&(h.lanes|=r),fa(f,r,n),f=u.sibling}else f=u.child;if(f!==null)f.return=u;else for(f=u;f!==null;){if(f===n){f=null;break}if(u=f.sibling,u!==null){u.return=f.return,f=u;break}f=f.return}u=f}zt(e,n,a.children,r),n=n.child}return n;case 9:return a=n.type,s=n.pendingProps.children,ao(n,r),a=ln(a),s=s(a),n.flags|=1,zt(e,n,s,r),n.child;case 14:return s=n.type,a=yn(s,n.pendingProps),a=yn(s.type,a),sf(e,n,s,a,r);case 15:return lf(e,n,n.type,n.pendingProps,r);case 17:return s=n.type,a=n.pendingProps,a=n.elementType===s?a:yn(s,a),xi(e,n),n.tag=1,Vt(s)?(e=!0,Zs(n)):e=!1,ao(n,r),Xd(n,s,a),Na(n,s,a,r),$a(null,n,s,!0,e,r);case 19:return mf(e,n,r);case 22:return af(e,n,r)}throw Error(i(156,n.tag))};function Ff(e,n){return xu(e,n)}function v0(e,n,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function un(e,n,r,s){return new v0(e,n,r,s)}function Ja(e){return e=e.prototype,!(!e||!e.isReactComponent)}function b0(e){if(typeof e=="function")return Ja(e)?1:0;if(e!=null){if(e=e.$$typeof,e===X)return 11;if(e===Ce)return 14}return 2}function yr(e,n){var r=e.alternate;return r===null?(r=un(e.tag,n,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=n,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,n=e.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function Ni(e,n,r,s,a,u){var f=2;if(s=e,typeof e=="function")Ja(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case U:return zr(r.children,a,u,n);case fe:f=8,a|=8;break;case Ve:return e=un(12,r,n,a|2),e.elementType=Ve,e.lanes=u,e;case J:return e=un(13,r,n,a),e.elementType=J,e.lanes=u,e;case Ie:return e=un(19,r,n,a),e.elementType=Ie,e.lanes=u,e;case ae:return Ti(r,a,u,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case ee:f=10;break e;case ge:f=9;break e;case X:f=11;break e;case Ce:f=14;break e;case Me:f=16,s=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return n=un(f,r,n,a),n.elementType=e,n.type=s,n.lanes=u,n}function zr(e,n,r,s){return e=un(7,e,s,n),e.lanes=r,e}function Ti(e,n,r,s){return e=un(22,e,s,n),e.elementType=ae,e.lanes=r,e.stateNode={isHidden:!1},e}function Za(e,n,r){return e=un(6,e,null,n),e.lanes=r,e}function ec(e,n,r){return n=un(4,e.children!==null?e.children:[],e.key,n),n.lanes=r,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function w0(e,n,r,s,a){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_l(0),this.expirationTimes=_l(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_l(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function tc(e,n,r,s,a,u,f,h,y){return e=new w0(e,n,r,h,y),n===1?(n=1,u===!0&&(n|=8)):n=0,u=un(3,null,null,n),e.current=u,u.stateNode=e,u.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},ha(u),e}function S0(e,n,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:he,key:s==null?null:""+s,children:e,containerInfo:n,implementation:r}}function Df(e){if(!e)return cr;e=e._reactInternals;e:{if(wt(e)!==e||e.tag!==1)throw Error(i(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Vt(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(i(171))}if(e.tag===1){var r=e.type;if(Vt(r))return pd(e,r,n)}return n}function Bf(e,n,r,s,a,u,f,h,y){return e=tc(r,s,!0,e,a,u,f,h,y),e.context=Df(null),r=e.current,s=Ft(),a=gr(r),u=Hn(s,a),u.callback=n??null,fr(r,u,a),e.current.lanes=a,Ao(e,a,s),qt(e,s),e}function Ii(e,n,r,s){var a=n.current,u=Ft(),f=gr(a);return r=Df(r),n.context===null?n.context=r:n.pendingContext=r,n=Hn(u,f),n.payload={element:e},s=s===void 0?null:s,s!==null&&(n.callback=s),e=fr(a,n,f),e!==null&&(wn(e,a,f,u),li(e,a,f)),f}function Ri(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Uf(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<n?r:n}}function nc(e,n){Uf(e,n),(e=e.alternate)&&Uf(e,n)}function k0(){return null}var Hf=typeof reportError=="function"?reportError:function(e){console.error(e)};function rc(e){this._internalRoot=e}$i.prototype.render=rc.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(i(409));Ii(e,n,null,null)},$i.prototype.unmount=rc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Mr(function(){Ii(null,e,null,null)}),n[zn]=null}};function $i(e){this._internalRoot=e}$i.prototype.unstable_scheduleHydration=function(e){if(e){var n=Eu();e={blockedOn:null,target:e,priority:n};for(var r=0;r<or.length&&n!==0&&n<or[r].priority;r++);or.splice(r,0,e),r===0&&Nu(e)}};function oc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ai(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Vf(){}function C0(e,n,r,s,a){if(a){if(typeof s=="function"){var u=s;s=function(){var C=Ri(f);u.call(C)}}var f=Bf(n,s,e,0,null,!1,!1,"",Vf);return e._reactRootContainer=f,e[zn]=f.current,qo(e.nodeType===8?e.parentNode:e),Mr(),f}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var h=s;s=function(){var C=Ri(y);h.call(C)}}var y=tc(e,0,!1,null,null,!1,!1,"",Vf);return e._reactRootContainer=y,e[zn]=y.current,qo(e.nodeType===8?e.parentNode:e),Mr(function(){Ii(n,y,r,s)}),y}function Pi(e,n,r,s,a){var u=r._reactRootContainer;if(u){var f=u;if(typeof a=="function"){var h=a;a=function(){var y=Ri(f);h.call(y)}}Ii(n,f,e,a)}else f=C0(r,n,e,a,s);return Ri(f)}ku=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var r=$o(n.pendingLanes);r!==0&&(Nl(n,r|1),qt(n,it()),(Be&6)===0&&(ho=it()+500,ur()))}break;case 13:Mr(function(){var s=Un(e,1);if(s!==null){var a=Ft();wn(s,e,1,a)}}),nc(e,1)}},Tl=function(e){if(e.tag===13){var n=Un(e,134217728);if(n!==null){var r=Ft();wn(n,e,134217728,r)}nc(e,134217728)}},Cu=function(e){if(e.tag===13){var n=gr(e),r=Un(e,n);if(r!==null){var s=Ft();wn(r,e,n,s)}nc(e,n)}},Eu=function(){return qe},ju=function(e,n){var r=qe;try{return qe=e,n()}finally{qe=r}},Er=function(e,n,r){switch(n){case"input":if(It(e,r),n=r.name,r.type==="radio"&&n!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<r.length;n++){var s=r[n];if(s!==e&&s.form===e.form){var a=Xs(s);if(!a)throw Error(i(90));Ot(s),It(s,a)}}}break;case"textarea":Ke(e,r);break;case"select":n=r.value,n!=null&&pt(e,!!r.multiple,n,!1)}},jr=Qa,er=Mr;var E0={usingClientEntryPoint:!1,Events:[Ko,eo,Xs,Wr,Gr,Qa]},us={findFiberByHostInstance:_r,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},j0={bundleType:us.bundleType,version:us.version,rendererPackageName:us.rendererPackageName,rendererConfig:us.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:je.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=mu(e),e===null?null:e.stateNode},findFiberByHostInstance:us.findFiberByHostInstance||k0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mi.isDisabled&&Mi.supportsFiber)try{$s=Mi.inject(j0),Nn=Mi}catch{}}return Yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=E0,Yt.createPortal=function(e,n){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!oc(n))throw Error(i(200));return S0(e,n,null,r)},Yt.createRoot=function(e,n){if(!oc(e))throw Error(i(299));var r=!1,s="",a=Hf;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),n=tc(e,1,!1,null,null,r,!1,s,a),e[zn]=n.current,qo(e.nodeType===8?e.parentNode:e),new rc(n)},Yt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=mu(n),e=e===null?null:e.stateNode,e},Yt.flushSync=function(e){return Mr(e)},Yt.hydrate=function(e,n,r){if(!Ai(n))throw Error(i(200));return Pi(null,e,n,!0,r)},Yt.hydrateRoot=function(e,n,r){if(!oc(e))throw Error(i(405));var s=r!=null&&r.hydratedSources||null,a=!1,u="",f=Hf;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onRecoverableError!==void 0&&(f=r.onRecoverableError)),n=Bf(n,null,e,1,r??null,a,!1,u,f),e[zn]=n.current,qo(e),s)for(e=0;e<s.length;e++)r=s[e],a=r._getVersion,a=a(r._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[r,a]:n.mutableSourceEagerHydrationData.push(r,a);return new $i(n)},Yt.render=function(e,n,r){if(!Ai(n))throw Error(i(200));return Pi(null,e,n,!1,r)},Yt.unmountComponentAtNode=function(e){if(!Ai(e))throw Error(i(40));return e._reactRootContainer?(Mr(function(){Pi(null,null,e,!1,function(){e._reactRootContainer=null,e[zn]=null})}),!0):!1},Yt.unstable_batchedUpdates=Qa,Yt.unstable_renderSubtreeIntoContainer=function(e,n,r,s){if(!Ai(r))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return Pi(e,n,r,!1,s)},Yt.version="18.3.1-next-f1338f8080-20240426",Yt}var Jf;function M0(){if(Jf)return lc.exports;Jf=1;function t(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)}catch(o){console.error(o)}}return t(),lc.exports=P0(),lc.exports}var Zf;function L0(){if(Zf)return Li;Zf=1;var t=M0();return Li.createRoot=t.createRoot,Li.hydrateRoot=t.hydrateRoot,Li}var O0=L0();const z0="modulepreload",F0=function(t){return"/"+t},ep={},Ts=function(o,i,c){let d=Promise.resolve();if(i&&i.length>0){let m=function(_){return Promise.all(_.map(T=>Promise.resolve(T).then($=>({status:"fulfilled",value:$}),$=>({status:"rejected",reason:$}))))};document.getElementsByTagName("link");const v=document.querySelector("meta[property=csp-nonce]"),x=(v==null?void 0:v.nonce)||(v==null?void 0:v.getAttribute("nonce"));d=m(i.map(_=>{if(_=F0(_),_ in ep)return;ep[_]=!0;const T=_.endsWith(".css"),$=T?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${_}"]${$}`))return;const A=document.createElement("link");if(A.rel=T?"stylesheet":z0,T||(A.as="script"),A.crossOrigin="",A.href=_,x&&A.setAttribute("nonce",x),document.head.appendChild(A),T)return new Promise((D,ne)=>{A.addEventListener("load",D),A.addEventListener("error",()=>ne(new Error(`Unable to preload CSS for ${_}`)))})}))}function p(m){const v=new Event("vite:preloadError",{cancelable:!0});if(v.payload=m,window.dispatchEvent(v),!v.defaultPrevented)throw m}return d.then(m=>{for(const v of m||[])v.status==="rejected"&&p(v.reason);return o().catch(p)})};var Ze="-ms-",Ss="-moz-",We="-webkit-",Wp="comm",xl="rule",Zc="decl",D0="@import",B0="@namespace",Gp="@keyframes",U0="@layer",qp=Math.abs,eu=String.fromCharCode,Ac=Object.assign;function H0(t,o){return gt(t,0)^45?(((o<<2^gt(t,0))<<2^gt(t,1))<<2^gt(t,2))<<2^gt(t,3):0}function Yp(t){return t.trim()}function Qn(t,o){return(t=o.exec(t))?t[0]:t}function Ae(t,o,i){return t.replace(o,i)}function tl(t,o,i){return t.indexOf(o,i)}function gt(t,o){return t.charCodeAt(o)|0}function Hr(t,o,i){return t.slice(o,i)}function Sn(t){return t.length}function Qp(t){return t.length}function ys(t,o){return o.push(t),t}function V0(t,o){return t.map(o).join("")}function tp(t,o){return t.filter(function(i){return!Qn(i,o)})}var yl=1,Eo=1,Kp=0,fn=0,dt=0,No="";function vl(t,o,i,c,d,p,m,v){return{value:t,root:o,parent:i,type:c,props:d,children:p,line:yl,column:Eo,length:m,return:"",siblings:v}}function Sr(t,o){return Ac(vl("",null,null,"",null,null,0,t.siblings),t,{length:-t.length},o)}function go(t){for(;t.root;)t=Sr(t.root,{children:[t]});ys(t,t.siblings)}function W0(){return dt}function G0(){return dt=fn>0?gt(No,--fn):0,Eo--,dt===10&&(Eo=1,yl--),dt}function Cn(){return dt=fn<Kp?gt(No,fn++):0,Eo++,dt===10&&(Eo=1,yl++),dt}function kr(){return gt(No,fn)}function nl(){return fn}function bl(t,o){return Hr(No,t,o)}function js(t){switch(t){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function q0(t){return yl=Eo=1,Kp=Sn(No=t),fn=0,[]}function Y0(t){return No="",t}function uc(t){return Yp(bl(fn-1,Pc(t===91?t+2:t===40?t+1:t)))}function Q0(t){for(;(dt=kr())&&dt<33;)Cn();return js(t)>2||js(dt)>3?"":" "}function K0(t,o){for(;--o&&Cn()&&!(dt<48||dt>102||dt>57&&dt<65||dt>70&&dt<97););return bl(t,nl()+(o<6&&kr()==32&&Cn()==32))}function Pc(t){for(;Cn();)switch(dt){case t:return fn;case 34:case 39:t!==34&&t!==39&&Pc(dt);break;case 40:t===41&&Pc(t);break;case 92:Cn();break}return fn}function X0(t,o){for(;Cn()&&t+dt!==57;)if(t+dt===84&&kr()===47)break;return"/*"+bl(o,fn-1)+"*"+eu(t===47?t:Cn())}function J0(t){for(;!js(kr());)Cn();return bl(t,fn)}function Z0(t){return Y0(rl("",null,null,null,[""],t=q0(t),0,[0],t))}function rl(t,o,i,c,d,p,m,v,x){for(var _=0,T=0,$=m,A=0,D=0,ne=0,re=1,le=1,te=1,H=0,de="",je=d,ye=p,he=c,U=de;le;)switch(ne=H,H=Cn()){case 40:if(ne!=108&&gt(U,$-1)==58){tl(U+=Ae(uc(H),"&","&\f"),"&\f",qp(_?v[_-1]:0))!=-1&&(te=-1);break}case 34:case 39:case 91:U+=uc(H);break;case 9:case 10:case 13:case 32:U+=Q0(ne);break;case 92:U+=K0(nl()-1,7);continue;case 47:switch(kr()){case 42:case 47:ys(eg(X0(Cn(),nl()),o,i,x),x),(js(ne||1)==5||js(kr()||1)==5)&&Sn(U)&&Hr(U,-1,void 0)!==" "&&(U+=" ");break;default:U+="/"}break;case 123*re:v[_++]=Sn(U)*te;case 125*re:case 59:case 0:switch(H){case 0:case 125:le=0;case 59+T:te==-1&&(U=Ae(U,/\f/g,"")),D>0&&(Sn(U)-$||re===0&&ne===47)&&ys(D>32?rp(U+";",c,i,$-1,x):rp(Ae(U," ","")+";",c,i,$-2,x),x);break;case 59:U+=";";default:if(ys(he=np(U,o,i,_,T,d,v,de,je=[],ye=[],$,p),p),H===123)if(T===0)rl(U,o,he,he,je,p,$,v,ye);else{switch(A){case 99:if(gt(U,3)===110)break;case 108:if(gt(U,2)===97)break;default:T=0;case 100:case 109:case 115:}T?rl(t,he,he,c&&ys(np(t,he,he,0,0,d,v,de,d,je=[],$,ye),ye),d,ye,$,v,c?je:ye):rl(U,he,he,he,[""],ye,0,v,ye)}}_=T=D=0,re=te=1,de=U="",$=m;break;case 58:$=1+Sn(U),D=ne;default:if(re<1){if(H==123)--re;else if(H==125&&re++==0&&G0()==125)continue}switch(U+=eu(H),H*re){case 38:te=T>0?1:(U+="\f",-1);break;case 44:v[_++]=(Sn(U)-1)*te,te=1;break;case 64:kr()===45&&(U+=uc(Cn())),A=kr(),T=$=Sn(de=U+=J0(nl())),H++;break;case 45:ne===45&&Sn(U)==2&&(re=0)}}return p}function np(t,o,i,c,d,p,m,v,x,_,T,$){for(var A=d-1,D=d===0?p:[""],ne=Qp(D),re=0,le=0,te=0;re<c;++re)for(var H=0,de=Hr(t,A+1,A=qp(le=m[re])),je=t;H<ne;++H)(je=Yp(le>0?D[H]+" "+de:Ae(de,/&\f/g,D[H])))&&(x[te++]=je);return vl(t,o,i,d===0?xl:v,x,_,T,$)}function eg(t,o,i,c){return vl(t,o,i,Wp,eu(W0()),Hr(t,2,-2),0,c)}function rp(t,o,i,c,d){return vl(t,o,i,Zc,Hr(t,0,c),Hr(t,c+1,-1),c,d)}function Xp(t,o,i){switch(H0(t,o)){case 5103:return We+"print-"+t+t;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return We+t+t;case 4855:return We+t.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+t;case 4789:return Ss+t+t;case 5349:case 4246:case 4810:case 6968:case 2756:return We+t+Ss+t+Ze+t+t;case 5936:switch(gt(t,o+11)){case 114:return We+t+Ze+Ae(t,/[svh]\w+-[tblr]{2}/,"tb")+t;case 108:return We+t+Ze+Ae(t,/[svh]\w+-[tblr]{2}/,"tb-rl")+t;case 45:return We+t+Ze+Ae(t,/[svh]\w+-[tblr]{2}/,"lr")+t}case 6828:case 4268:case 2903:return We+t+Ze+t+t;case 6165:return We+t+Ze+"flex-"+t+t;case 5187:return We+t+Ae(t,/(\w+).+(:[^]+)/,We+"box-$1$2"+Ze+"flex-$1$2")+t;case 5443:return We+t+Ze+"flex-item-"+Ae(t,/flex-|-self/g,"")+(Qn(t,/flex-|baseline/)?"":Ze+"grid-row-"+Ae(t,/flex-|-self/g,""))+t;case 4675:return We+t+Ze+"flex-line-pack"+Ae(t,/align-content|flex-|-self/g,"")+t;case 5548:return We+t+Ze+Ae(t,"shrink","negative")+t;case 5292:return We+t+Ze+Ae(t,"basis","preferred-size")+t;case 6060:return We+"box-"+Ae(t,"-grow","")+We+t+Ze+Ae(t,"grow","positive")+t;case 4554:return We+Ae(t,/([^-])(transform)/g,"$1"+We+"$2")+t;case 6187:return Ae(Ae(Ae(t,/(zoom-|grab)/,We+"$1"),/(image-set)/,We+"$1"),t,"")+t;case 5495:case 3959:return Ae(t,/(image-set\([^]*)/,We+"$1$`$1");case 4968:return Ae(Ae(t,/(.+:)(flex-)?(.*)/,We+"box-pack:$3"+Ze+"flex-pack:$3"),/space-between/,"justify")+We+t+t;case 4200:if(!Qn(t,/flex-|baseline/))return Ze+"grid-column-align"+Hr(t,o)+t;break;case 2592:case 3360:return Ze+Ae(t,"template-","")+t;case 4384:case 3616:return i&&i.some(function(c,d){return o=d,Qn(c.props,/grid-\w+-end/)})?~tl(t+(i=i[o].value),"span",0)?t:Ze+Ae(t,"-start","")+t+Ze+"grid-row-span:"+(~tl(i,"span",0)?Qn(i,/\d+/):+Qn(i,/\d+/)-+Qn(t,/\d+/))+";":Ze+Ae(t,"-start","")+t;case 4896:case 4128:return i&&i.some(function(c){return Qn(c.props,/grid-\w+-start/)})?t:Ze+Ae(Ae(t,"-end","-span"),"span ","")+t;case 4095:case 3583:case 4068:case 2532:return Ae(t,/(.+)-inline(.+)/,We+"$1$2")+t;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Sn(t)-1-o>6)switch(gt(t,o+1)){case 109:if(gt(t,o+4)!==45)break;case 102:return Ae(t,/(.+:)(.+)-([^]+)/,"$1"+We+"$2-$3$1"+Ss+(gt(t,o+3)==108?"$3":"$2-$3"))+t;case 115:return~tl(t,"stretch",0)?Xp(Ae(t,"stretch","fill-available"),o,i)+t:t}break;case 5152:case 5920:return Ae(t,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,d,p,m,v,x,_){return Ze+d+":"+p+_+(m?Ze+d+"-span:"+(v?x:+x-+p)+_:"")+t});case 4949:if(gt(t,o+6)===121)return Ae(t,":",":"+We)+t;break;case 6444:switch(gt(t,gt(t,14)===45?18:11)){case 120:return Ae(t,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+We+(gt(t,14)===45?"inline-":"")+"box$3$1"+We+"$2$3$1"+Ze+"$2box$3")+t;case 100:return Ae(t,":",":"+Ze)+t}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ae(t,"scroll-","scroll-snap-")+t}return t}function pl(t,o){for(var i="",c=0;c<t.length;c++)i+=o(t[c],c,t,o)||"";return i}function tg(t,o,i,c){switch(t.type){case U0:if(t.children.length)break;case D0:case B0:case Zc:return t.return=t.return||t.value;case Wp:return"";case Gp:return t.return=t.value+"{"+pl(t.children,c)+"}";case xl:if(!Sn(t.value=t.props.join(",")))return""}return Sn(i=pl(t.children,c))?t.return=t.value+"{"+i+"}":""}function ng(t){var o=Qp(t);return function(i,c,d,p){for(var m="",v=0;v<o;v++)m+=t[v](i,c,d,p)||"";return m}}function rg(t){return function(o){o.root||(o=o.return)&&t(o)}}function og(t,o,i,c){if(t.length>-1&&!t.return)switch(t.type){case Zc:t.return=Xp(t.value,t.length,i);return;case Gp:return pl([Sr(t,{value:Ae(t.value,"@","@"+We)})],c);case xl:if(t.length)return V0(i=t.props,function(d){switch(Qn(d,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":go(Sr(t,{props:[Ae(d,/:(read-\w+)/,":"+Ss+"$1")]})),go(Sr(t,{props:[d]})),Ac(t,{props:tp(i,c)});break;case"::placeholder":go(Sr(t,{props:[Ae(d,/:(plac\w+)/,":"+We+"input-$1")]})),go(Sr(t,{props:[Ae(d,/:(plac\w+)/,":"+Ss+"$1")]})),go(Sr(t,{props:[Ae(d,/:(plac\w+)/,Ze+"input-$1")]})),go(Sr(t,{props:[d]})),Ac(t,{props:tp(i,c)});break}return""})}}var So={};function Kn(t,...o){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${t} for more information.${o.length>0?` Args: ${o.join(", ")}`:""}`)}var dc,fc;const jo=typeof process<"u"&&So!==void 0&&(So.REACT_APP_SC_ATTR||So.SC_ATTR)||"data-styled",Jp="active",Zp="data-styled-version",wl="6.6.0",tu=`/*!sc*/
`,ks=typeof window<"u"&&typeof document<"u";if(!Lt.createContext)throw Kn(19);function op(t){if(typeof process<"u"&&So!==void 0){const o=So[t];if(o!==void 0&&o!=="")return o!=="false"}}const sg=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(fc=(dc=op("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&dc!==void 0?dc:op("SC_DISABLE_SPEEDY"))!==null&&fc!==void 0?fc:typeof process<"u"&&So!==void 0&&!1),eh="sc-keyframes-",ig={};let ol=new Map,hl=new Map,sl=1;const vs=t=>{if(ol.has(t))return ol.get(t);for(;hl.has(sl);)sl++;const o=sl++;return ol.set(t,o),hl.set(o,t),o},lg=t=>hl.get(t),ag=(t,o)=>{sl=o+1,ol.set(t,o),hl.set(o,t)},nu=Object.freeze([]),_o=Object.freeze({});function th(t,o,i=_o){return t.theme!==i.theme&&t.theme||o||i.theme}const cg=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ug=/(^-|-$)/g;function nh(t){return t.replace(cg,"-").replace(ug,"")}const dg=/(a)(d)/gi,sp=t=>String.fromCharCode(t+(t>25?39:97));function ru(t){let o,i="";for(o=Math.abs(t);o>52;o=o/52|0)i=sp(o%52)+i;return(sp(o%52)+i).replace(dg,"$1-$2")}const Mc=5381,Ur=(t,o)=>{let i=o.length;for(;i;)t=33*t^o.charCodeAt(--i);return t},rh=t=>Ur(Mc,t);function ou(t){return ru(rh(t)>>>0)}function fg(t){return t.displayName||t.name||"Component"}function Lc(t){return typeof t=="string"&&!0}function pg(t){return Lc(t)?`styled.${t}`:`Styled(${fg(t)})`}const oh=Symbol.for("react.memo"),hg=Symbol.for("react.forward_ref"),mg={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},gg={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},sh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},xg={[hg]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[oh]:sh};function ip(t){return("type"in(o=t)&&o.type.$$typeof)===oh?sh:"$$typeof"in t?xg[t.$$typeof]:mg;var o}const yg=Object.defineProperty,vg=Object.getOwnPropertyNames,bg=Object.getOwnPropertySymbols,wg=Object.getOwnPropertyDescriptor,Sg=Object.getPrototypeOf,kg=Object.prototype;function ih(t,o,i){if(typeof o!="string"){const c=Sg(o);c&&c!==kg&&ih(t,c,i);const d=vg(o).concat(bg(o)),p=ip(t),m=ip(o);for(let v=0;v<d.length;++v){const x=d[v];if(!(x in gg||i&&i[x]||m&&x in m||p&&x in p)){const _=wg(o,x);try{yg(t,x,_)}catch{}}}}return t}function To(t){return typeof t=="function"}const Cg=Symbol.for("react.forward_ref");function su(t){return t!=null&&(typeof t=="object"||typeof t=="function")&&t.$$typeof===Cg&&"styledComponentId"in t}function bs(t,o){return t&&o?t+" "+o:t||o||""}function ml(t,o){return t.join("")}function _s(t){return t!==null&&typeof t=="object"&&t.constructor.name===Object.name&&!("props"in t&&t.$$typeof)}function Oc(t,o,i=!1){if(!i&&!_s(t)&&!Array.isArray(t))return o;if(Array.isArray(o))for(let c=0;c<o.length;c++)t[c]=Oc(t[c],o[c]);else if(_s(o))for(const c in o)t[c]=Oc(t[c],o[c]);return t}function iu(t,o){Object.defineProperty(t,"toString",{value:o})}const Eg=class{constructor(t){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=t,this._cGroup=0,this._cIndex=0}indexOfGroup(t){if(t===this._cGroup)return this._cIndex;let o=this._cIndex;if(t>this._cGroup)for(let i=this._cGroup;i<t;i++)o+=this.groupSizes[i];else for(let i=this._cGroup-1;i>=t;i--)o-=this.groupSizes[i];return this._cGroup=t,this._cIndex=o,o}insertRules(t,o){if(t>=this.groupSizes.length){const d=this.groupSizes,p=d.length;let m=p;for(;t>=m;)if(m<<=1,m<0)throw Kn(16,`${t}`);this.groupSizes=new Uint32Array(m),this.groupSizes.set(d),this.length=m;for(let v=p;v<m;v++)this.groupSizes[v]=0}let i=this.indexOfGroup(t+1),c=0;for(let d=0,p=o.length;d<p;d++)this.tag.insertRule(i,o[d])&&(this.groupSizes[t]++,i++,c++);c>0&&this._cGroup>t&&(this._cIndex+=c)}clearGroup(t){if(t<this.length){const o=this.groupSizes[t],i=this.indexOfGroup(t),c=i+o;this.groupSizes[t]=0;for(let d=i;d<c;d++)this.tag.deleteRule(i);o>0&&this._cGroup>t&&(this._cIndex-=o)}}getGroup(t){let o="";if(t>=this.length||this.groupSizes[t]===0)return o;const i=this.groupSizes[t],c=this.indexOfGroup(t),d=c+i;for(let p=c;p<d;p++)o+=this.tag.getRule(p)+tu;return o}},jg=`style[${jo}][${Zp}="${wl}"]`,_g=new RegExp(`^${jo}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),lp=t=>typeof ShadowRoot<"u"&&t instanceof ShadowRoot||"host"in t&&t.nodeType===11,zc=t=>{if(!t)return document;if(lp(t))return t;if("getRootNode"in t){const o=t.getRootNode();if(lp(o))return o}return document},Ng=(t,o,i)=>{const c=i.split(",");let d;for(let p=0,m=c.length;p<m;p++)(d=c[p])&&t.registerName(o,d)},Tg=(t,o)=>{var i;const c=((i=o.textContent)!==null&&i!==void 0?i:"").split(tu),d=[];for(let p=0,m=c.length;p<m;p++){const v=c[p].trim();if(!v)continue;const x=v.match(_g);if(x){const _=0|parseInt(x[1],10),T=x[2];_!==0&&(ag(T,_),Ng(t,T,x[3]),t.getTag().insertRules(_,d)),d.length=0}else d.push(v)}},pc=t=>{const i=zc(t.options.target).querySelectorAll(jg);for(let c=0,d=i.length;c<d;c++){const p=i[c];p&&p.getAttribute(jo)!==Jp&&(Tg(t,p),p.parentNode&&p.parentNode.removeChild(p))}};let fs=!1;function Ig(){if(fs!==!1)return fs;if(typeof document<"u"){const t=document.head.querySelector('meta[property="csp-nonce"]');if(t)return fs=t.nonce||t.getAttribute("content")||void 0;const o=document.head.querySelector('meta[name="sc-nonce"]');if(o)return fs=o.getAttribute("content")||void 0}return fs=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const lh=(t,o)=>{if(typeof document>"u")throw Kn(20);const i=document.head,c=t||i,d=document.createElement("style"),p=(x=>{const _=Array.from(x.querySelectorAll(`style[${jo}]`));return _[_.length-1]})(c),m=p!==void 0?p.nextSibling:null;d.setAttribute(jo,Jp),d.setAttribute(Zp,wl);const v=o||Ig();return v&&d.setAttribute("nonce",v),c.insertBefore(d,m),d},Rg=class{constructor(t,o){this.element=lh(t,o),this.element.appendChild(document.createTextNode("")),this.sheet=(i=>{var c;if(i.sheet)return i.sheet;const d=(c=i.getRootNode().styleSheets)!==null&&c!==void 0?c:document.styleSheets;for(let p=0,m=d.length;p<m;p++){const v=d[p];if(v.ownerNode===i)return v}throw Kn(17)})(this.element),this.length=0}insertRule(t,o){try{return this.sheet.insertRule(o,t),this.length++,!0}catch{return!1}}deleteRule(t){this.sheet.deleteRule(t),this.length--}getRule(t){const o=this.sheet.cssRules[t];return o&&o.cssText?o.cssText:""}},$g=class{constructor(t,o){this.element=lh(t,o),this.nodes=this.element.childNodes,this.length=0}insertRule(t,o){if(t<=this.length&&t>=0){const i=document.createTextNode(o);return this.element.insertBefore(i,this.nodes[t]||null),this.length++,!0}return!1}deleteRule(t){this.element.removeChild(this.nodes[t]),this.length--}getRule(t){return t<this.length?this.nodes[t].textContent:""}};let ap=ks;const Ag={isServer:!ks,useCSSOMInjection:!sg};class Is{static registerId(o){return vs(o)}constructor(o=_o,i={},c){this.options=Object.assign(Object.assign({},Ag),o),this.gs=i,this.keyframeIds=new Set,this.names=new Map(c),this.server=!!o.isServer,!this.server&&ks&&ap&&(ap=!1,pc(this)),iu(this,()=>(d=>{const p=d.getTag(),{length:m}=p;let v="";for(let x=0;x<m;x++){const _=lg(x);if(_===void 0)continue;const T=d.names.get(_);if(T===void 0||!T.size)continue;const $=p.getGroup(x);if($.length===0)continue;const A=jo+".g"+x+'[id="'+_+'"]';let D="";for(const ne of T)ne.length>0&&(D+=ne+",");v+=$+A+'{content:"'+D+'"}'+tu}return v})(this))}rehydrate(){!this.server&&ks&&pc(this)}reconstructWithOptions(o,i=!0){const c=new Is(Object.assign(Object.assign({},this.options),o),this.gs,i&&this.names||void 0);return c.keyframeIds=new Set(this.keyframeIds),!this.server&&ks&&o.target!==this.options.target&&zc(this.options.target)!==zc(o.target)&&pc(c),c}allocateGSInstance(o){return this.gs[o]=(this.gs[o]||0)+1}getTag(){return this.tag||(this.tag=(o=(({useCSSOMInjection:i,target:c,nonce:d})=>i?new Rg(c,d):new $g(c,d))(this.options),new Eg(o)));var o}hasNameForId(o,i){var c,d;return(d=(c=this.names.get(o))===null||c===void 0?void 0:c.has(i))!==null&&d!==void 0&&d}registerName(o,i){vs(o),o.startsWith(eh)&&this.keyframeIds.add(o);const c=this.names.get(o);c?c.add(i):this.names.set(o,new Set([i]))}insertRules(o,i,c){this.registerName(o,i),this.getTag().insertRules(vs(o),c)}clearNames(o){this.names.has(o)&&this.names.get(o).clear()}clearRules(o){this.getTag().clearGroup(vs(o)),this.clearNames(o)}clearTag(){this.tag=void 0}}const ah=new WeakSet,Pg={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Mg(t,o){return o==null||typeof o=="boolean"||o===""?"":typeof o!="number"||o===0||t in Pg||t.startsWith("--")?String(o).trim():o+"px"}const Dr=47;function cp(t){if(t.charCodeAt(0)===45&&t.charCodeAt(1)===45)return t;let o="";for(let i=0;i<t.length;i++){const c=t.charCodeAt(i);o+=c>=65&&c<=90?"-"+String.fromCharCode(c+32):t[i]}return o.startsWith("ms-")?"-"+o:o}const ch=Symbol.for("sc-keyframes");function Lg(t){return typeof t=="object"&&t!==null&&ch in t}function uh(t){return To(t)&&!(t.prototype&&t.prototype.isReactComponent)}const dh=t=>t==null||t===!1||t==="",Og=Symbol.for("react.client.reference");function up(t){return t.$$typeof===Og}function fh(t,o){for(const i in t){const c=t[i];t.hasOwnProperty(i)&&!dh(c)&&(Array.isArray(c)&&ah.has(c)||To(c)?o.push(cp(i)+":",c,";"):_s(c)?(o.push(i+" {"),fh(c,o),o.push("}")):o.push(cp(i)+": "+Mg(i,c)+";"))}}function Cr(t,o,i,c,d=[]){if(dh(t))return d;const p=typeof t;if(p==="string")return d.push(t),d;if(p==="function"){if(up(t))return d;if(uh(t)&&o){const m=t(o);return Cr(m,o,i,c,d)}return d.push(t),d}if(Array.isArray(t)){for(let m=0;m<t.length;m++)Cr(t[m],o,i,c,d);return d}return su(t)?(d.push(`.${t.styledComponentId}`),d):Lg(t)?(i?(t.inject(i,c),d.push(t.getName(c))):d.push(t),d):up(t)?d:_s(t)?t.toString!==Object.prototype.toString?(d.push(t.toString()),d):(fh(t,d),d):(d.push(t.toString()),d)}const zg=rh(wl);class Fg{constructor(o,i,c){this.rules=o,this.componentId=i,this.baseHash=Ur(zg,i),this.baseStyle=c,Is.registerId(i)}generateAndInjectStyles(o,i,c){let d=this.baseStyle?this.baseStyle.generateAndInjectStyles(o,i,c):"";{let p="";for(let m=0;m<this.rules.length;m++){const v=this.rules[m];if(typeof v=="string")p+=v;else if(v)if(uh(v)){const x=v(o);typeof x=="string"?p+=x:x!=null&&x!==!1&&(p+=ml(Cr(x,o,i,c)))}else p+=ml(Cr(v,o,i,c))}if(p){this.dynamicNameCache||(this.dynamicNameCache=new Map);const m=c.hash?c.hash+p:p;let v=this.dynamicNameCache.get(m);if(!v){if(v=ru(Ur(Ur(this.baseHash,c.hash),p)>>>0),this.dynamicNameCache.size>=200){const x=this.dynamicNameCache.keys().next().value;x!==void 0&&this.dynamicNameCache.delete(x)}this.dynamicNameCache.set(m,v)}if(!i.hasNameForId(this.componentId,v)){const x=c(p,"."+v,void 0,this.componentId);i.insertRules(this.componentId,v,x)}d=bs(d,v)}}return d}}const Dg=/&/g;function ph(t,o){let i=0;for(;--o>=0&&t.charCodeAt(o)===92;)i++;return!(1&~i)}function hc(t){const o=t.length;let i="",c=0,d=0,p=0,m=!1,v=!1;for(let x=0;x<o;x++){const _=t.charCodeAt(x);if(p!==0||m||_!==Dr||t.charCodeAt(x+1)!==42)if(m)_===42&&t.charCodeAt(x+1)===Dr&&(m=!1,x++);else if(_!==34&&_!==39||ph(t,x)){if(p===0)if(_===123)d++;else if(_===125){if(d--,d<0){v=!0;let T=x+1;for(;T<o;){const $=t.charCodeAt(T);if($===59||$===10)break;T++}T<o&&t.charCodeAt(T)===59&&T++,d=0,x=T-1,c=T;continue}d===0&&(i+=t.substring(c,x+1),c=x+1)}else _===59&&d===0&&(i+=t.substring(c,x+1),c=x+1)}else p===0?p=_:p===_&&(p=0);else m=!0,x++}return v||d!==0||p!==0?(c<o&&d===0&&p===0&&(i+=t.substring(c)),i):t}function hh(t,o){const i=o+" ",c=","+i;for(let d=0;d<t.length;d++){const p=t[d];if(p.type==="rule"){p.value=(i+p.value).replaceAll(",",c);const m=p.props,v=[];for(let x=0;x<m.length;x++)v[x]=i+m[x];p.props=v}Array.isArray(p.children)&&p.type!=="@keyframes"&&hh(p.children,o)}return t}function Bg({options:t=_o,plugins:o=nu}=_o){let i,c,d;const p=(A,D,ne)=>ne.startsWith(c)&&ne.endsWith(c)&&ne.replaceAll(c,"").length>0?`.${i}`:A,m=o.slice();m.push(A=>{A.type===xl&&A.value.includes("&")&&(d||(d=new RegExp(`\\${c}\\b`,"g")),A.props[0]=A.props[0].replace(Dg,c).replace(d,p))}),t.prefix&&m.push(og),m.push(tg);let v=[];const x=ng(m.concat(rg(A=>v.push(A)))),_=(A,D="",ne="",re="&")=>{i=re,c=D,d=void 0;const le=(function(H){const de=H.indexOf("//")!==-1,je=H.indexOf("}")!==-1;if(!de&&!je)return H;if(!de)return hc(H);const ye=H.length;let he="",U=0,fe=0,Ve=0,ee=0,ge=0,X=!1;for(;fe<ye;){const J=H.charCodeAt(fe);if(J!==34&&J!==39||ph(H,fe))if(Ve===0)if(J===Dr&&fe+1<ye&&H.charCodeAt(fe+1)===42){for(fe+=2;fe+1<ye&&(H.charCodeAt(fe)!==42||H.charCodeAt(fe+1)!==Dr);)fe++;fe+=2}else if(J!==40)if(J!==41)if(ee>0)fe++;else if(J===42&&fe+1<ye&&H.charCodeAt(fe+1)===Dr)he+=H.substring(U,fe),fe+=2,U=fe,X=!0;else if(J===Dr&&fe+1<ye&&H.charCodeAt(fe+1)===Dr){for(he+=H.substring(U,fe);fe<ye&&H.charCodeAt(fe)!==10;)fe++;U=fe,X=!0}else J===123?ge++:J===125&&ge--,fe++;else ee>0&&ee--,fe++;else ee++,fe++;else fe++;else Ve===0?Ve=J:Ve===J&&(Ve=0),fe++}return X?(U<ye&&(he+=H.substring(U)),ge===0?he:hc(he)):ge===0?H:hc(H)})(A);let te=Z0(ne||D?ne+" "+D+" { "+le+" }":le);return t.namespace&&(te=hh(te,t.namespace)),v=[],pl(te,x),v},T=t;let $=Mc;for(let A=0;A<o.length;A++)o[A].name||Kn(15),$=Ur($,o[A].name);return T!=null&&T.namespace&&($=Ur($,T.namespace)),T!=null&&T.prefix&&($=Ur($,"p")),_.hash=$!==Mc?$.toString():"",_}const Ug=new Is,Fc=Bg(),mh=Lt.createContext({shouldForwardProp:void 0,styleSheet:Ug,stylis:Fc,stylisPlugins:void 0});mh.Consumer;function gh(){return Lt.useContext(mh)}const Ns=Lt.createContext(void 0);Ns.Consumer;function il(t){const o=Lt.useContext(Ns),i=Lt.useMemo(()=>(function(c,d){if(!c)throw Kn(14);if(To(c))return c(d);if(Array.isArray(c)||typeof c!="object")throw Kn(8);return d?Object.assign(Object.assign({},d),c):c})(t.theme,o),[t.theme,o]);return t.children?Lt.createElement(Ns.Provider,{value:i},t.children):null}const mc={};function Hg(t,o){const i=typeof t!="string"?"sc":nh(t);mc[i]=(mc[i]||0)+1;const c=i+"-"+ou(wl+i+mc[i]);return o?o+"-"+c:c}function Vg(t,o,i){const c=su(t),d=t,p=!Lc(t),{attrs:m=nu,componentId:v=Hg(o.displayName,o.parentComponentId),displayName:x=pg(t)}=o,_=o.displayName&&o.componentId?nh(o.displayName)+"-"+o.componentId:o.componentId||v,T=c&&d.attrs?d.attrs.concat(m).filter(Boolean):m;let{shouldForwardProp:$}=o;if(c&&d.shouldForwardProp){const re=d.shouldForwardProp;if(o.shouldForwardProp){const le=o.shouldForwardProp;$=(te,H)=>re(te,H)&&le(te,H)}else $=re}const A=new Fg(i,_,c?d.componentStyle:void 0);function D(re,le){return(function(te,H,de){const{attrs:je,componentStyle:ye,defaultProps:he,foldedComponentIds:U,styledComponentId:fe,target:Ve}=te,ee=Lt.useContext(Ns),ge=gh(),X=te.shouldForwardProp||ge.shouldForwardProp,J=th(H,ee,he)||_o,[Ie,Ce]=(function(w,I,K){const G=Object.assign(Object.assign({},I),{className:void 0,theme:K});let ve=null;const xe=w.length>1;for(let Se=0;Se<w.length;Se++){const Y=w[Se],ke=To(Y)?Y(xe?Object.assign({},G):G):Y;for(const _e in ke)_e==="className"?G.className=bs(G.className,ke[_e]):_e==="style"?G.style=Object.assign(Object.assign({},G.style),ke[_e]):ke[_e]===void 0?_e in G&&(G[_e]!==void 0&&(ve||(ve=[])).push(_e),G[_e]=void 0):G[_e]=ke[_e]}return"className"in I&&typeof I.className=="string"&&(G.className=bs(G.className,I.className)),[G,ve]})(je,H,J),Me=ye.generateAndInjectStyles(Ie,ge.styleSheet,ge.stylis),ae=Ie.as||Ve,F=Lc(ae),Q=(function(w,I,K,G,ve,xe){const Se={};for(const Y in w)Y[0]==="$"||Y==="as"||Y==="theme"&&w.theme===K||(Y==="forwardedAs"?w.forwardedAs!==void 0&&(Se.as=w.forwardedAs):w[Y]===void 0?Y==="className"||ve||xe!==null&&xe.indexOf(Y)!==-1||G&&!G(Y,I)||(Se[Y]=void 0):G&&!G(Y,I)||(Se[Y]=w[Y]));return Se})(Ie,ae,J,X,F,Ce);let O=bs(U,fe);return Me&&(O+=" "+Me),Ie.className&&(O+=" "+Ie.className),Q[F&&ae.includes("-")?"class":"className"]=O,de&&(Q.ref=de),N.createElement(ae,Q)})(ne,re,le)}D.displayName=x;let ne=Lt.forwardRef(D);return ne.attrs=T,ne.componentStyle=A,ne.displayName=x,ne.shouldForwardProp=$,ne.foldedComponentIds=c?bs(d.foldedComponentIds,d.styledComponentId):"",ne.styledComponentId=_,ne.target=c?d.target:t,Object.defineProperty(ne,"defaultProps",{get(){return this._foldedDefaultProps},set(re){this._foldedDefaultProps=c?(function(le,...te){for(const H of te)Oc(le,H,!0);return le})({},d.defaultProps,re):re}}),iu(ne,()=>`.${ne.styledComponentId}`),p&&ih(ne,t,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),ne}var Wg=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function dp(t,o){const i=[t[0]];for(let c=0,d=o.length;c<d;c+=1)i.push(o[c],t[c+1]);return i}const fp=t=>(ah.add(t),t);function lu(t,...o){if(To(t)||_s(t))return fp(Cr(dp(nu,[t,...o])));const i=t;return o.length===0&&i.length===1&&typeof i[0]=="string"?Cr(i):fp(Cr(dp(i,o)))}function Dc(t,o,i=_o){if(!o)throw Kn(1,o);const c=(d,...p)=>t(o,i,lu(d,...p));return c.attrs=d=>Dc(t,o,Object.assign(Object.assign({},i),{attrs:Array.prototype.concat(i.attrs,d).filter(Boolean)})),c.withConfig=d=>Dc(t,o,Object.assign(Object.assign({},i),d)),c}const xh=t=>Dc(Vg,t),E=xh;Wg.forEach(t=>{E[t]=xh(t)});class Gg{constructor(o,i){this.instanceRules=new Map,this.rules=o,this.componentId=i,this.isStatic=(function(c){for(let d=0;d<c.length;d+=1){const p=c[d];if(To(p)&&!su(p))return!1}return!0})(o),Is.registerId(this.componentId)}removeStyles(o,i){this.instanceRules.delete(o),this.rebuildGroup(i)}renderStyles(o,i,c,d){const p=this.componentId;if(this.isStatic){if(c.hasNameForId(p,p+o))this.instanceRules.has(o)||this.computeRules(o,i,c,d);else{const v=this.computeRules(o,i,c,d);c.insertRules(p,v.name,v.rules)}return}const m=this.instanceRules.get(o);if(this.computeRules(o,i,c,d),!c.server&&m){const v=m.rules,x=this.instanceRules.get(o).rules;if(v.length===x.length){let _=!0;for(let T=0;T<v.length;T++)if(v[T]!==x[T]){_=!1;break}if(_)return}}this.rebuildGroup(c)}computeRules(o,i,c,d){const p=ml(Cr(this.rules,i,c,d)),m={name:this.componentId+o,rules:d(p,"")};return this.instanceRules.set(o,m),m}rebuildGroup(o){const i=this.componentId;o.clearRules(i);for(const c of this.instanceRules.values())o.insertRules(i,c.name,c.rules)}}function qg(t,...o){const i=lu(t,...o),c=`sc-global-${ou(JSON.stringify(i))}`,d=new Gg(i,c),p=v=>{const x=gh(),_=Lt.useContext(Ns);let T;{const $=Lt.useRef(null);$.current===null&&($.current=x.styleSheet.allocateGSInstance(c)),T=$.current}x.styleSheet.server&&m(T,v,x.styleSheet,_,x.stylis);{const $=d.isStatic?[T,x.styleSheet,d]:[T,v,x.styleSheet,_,x.stylis,d],A=Lt.useRef(d);Lt.useLayoutEffect(()=>{x.styleSheet.server||(A.current!==d&&(x.styleSheet.clearRules(c),A.current=d),m(T,v,x.styleSheet,_,x.stylis))},$),Lt.useLayoutEffect(()=>()=>{x.styleSheet.server||d.removeStyles(T,x.styleSheet)},[T,x.styleSheet,d])}return x.styleSheet.server&&d.instanceRules.delete(T),null};function m(v,x,_,T,$){if(d.isStatic)d.renderStyles(v,ig,_,$);else{const A=Object.assign(Object.assign({},x),{theme:th(x,T,p.defaultProps)});d.renderStyles(v,A,_,$)}}return Lt.memo(p)}var yh;class Yg{constructor(o,i){this[yh]=!0,this.inject=(c,d=Fc)=>{const p=this.getName(d);if(!c.hasNameForId(this.id,p)){const m=d(this.rules,p,"@keyframes");c.insertRules(this.id,p,m)}},this.name=o,this.id=eh+o,this.rules=i,vs(this.id),iu(this,()=>{throw Kn(12,String(this.name))})}getName(o=Fc){return o.hash?this.name+ru(+o.hash>>>0):this.name}}function Sl(t,...o){const i=ml(lu(t,...o)),c=ou(i);return new Yg(c,i)}yh=ch;const ie={colors:{bgCanvas:"#F4F5F2",bgSurface:"#FFFFFF",bgSurfaceSubtle:"#F6F7F4",bgSurfaceHover:"#EEF1EC",bgElevated:"#FFFFFF",bgGlassHeavy:"rgba(255, 255, 255, 0.96)",borderSubtle:"rgba(30, 36, 32, 0.09)",borderStrong:"rgba(30, 36, 32, 0.18)",textPrimary:"#1E2420",textSecondary:"#5B655F",textMuted:"#7B857F",brandPrimary:"#2D6A4F",brandPrimaryHover:"#23533D",brandPrimaryLight:"#52796B",brandPrimarySubtle:"rgba(45, 106, 79, 0.09)",accentMuted:"#3E5C52",status:{NORMAL:"#2D6A4F",WARNING:"#B45309",CRITICAL:"#C81E1E",OFFLINE:"#64748B"},statusBg:{NORMAL:"rgba(45, 106, 79, 0.10)",WARNING:"rgba(180, 83, 9, 0.10)",CRITICAL:"rgba(200, 30, 30, 0.09)",OFFLINE:"rgba(100, 116, 139, 0.11)"}},radius:{sm:"6px",md:"10px",lg:"12px",pill:"999px"},motion:{ease:"cubic-bezier(0.2, 0.8, 0.2, 1)",fast:"150ms",press:"90ms",panel:"200ms"},shadows:{sm:"0 1px 2px rgba(30, 36, 32, 0.04)",md:"0 6px 20px rgba(30, 36, 32, 0.07)",lg:"0 18px 44px rgba(30, 36, 32, 0.12)"},fonts:{sans:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",display:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",mono:"'JetBrains Mono', 'Consolas', monospace"}},Dv={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"},Qg={LOW:"Baixo",MEDIUM:"Médio",HIGH:"Alto"};function vh(t,o="2.3.0"){if(!t||typeof t!="string")return!1;const i=p=>{const m=String(p).match(/(\d+)\.(\d+)(?:\.(\d+))?/);return m?[Number(m[1]),Number(m[2]),Number(m[3]||0)]:null},c=i(t),d=i(o);if(!c||!d)return!1;for(let p=0;p<3;p+=1){if(c[p]<d[p])return!0;if(c[p]>d[p])return!1}return!1}function me(t){if(!t||typeof t!="string")return t||"";if(!t.includes("Ã")&&!t.includes("Â"))return t;try{const o=new Uint8Array(t.length);for(let c=0;c<t.length;c++)o[c]=t.charCodeAt(c)&255;const i=new TextDecoder("utf-8",{fatal:!1}).decode(o);if(!i.includes("�"))return i}catch{}return t.replace(/Ã“/g,"Ó").replace(/Ã§/g,"ç").replace(/Ã£/g,"ã").replace(/Ã¡/g,"á").replace(/Ã©/g,"é").replace(/Ã­/g,"í").replace(/Ã³/g,"ó").replace(/Ãº/g,"ú").replace(/Ã¢/g,"â").replace(/Ãª/g,"ê").replace(/Ã´/g,"ô").replace(/Ã‡/g,"Ç").replace(/Ãƒ/g,"Ã")}const ll=qg`
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
`,Ln=Object.create(null);Ln.open="0";Ln.close="1";Ln.ping="2";Ln.pong="3";Ln.message="4";Ln.upgrade="5";Ln.noop="6";const al=Object.create(null);Object.keys(Ln).forEach(t=>{al[Ln[t]]=t});const Bc={type:"error",data:"parser error"},bh=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",wh=typeof ArrayBuffer=="function",Sh=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t&&t.buffer instanceof ArrayBuffer,au=({type:t,data:o},i,c)=>bh&&o instanceof Blob?i?c(o):pp(o,c):wh&&(o instanceof ArrayBuffer||Sh(o))?i?c(o):pp(new Blob([o]),c):c(Ln[t]+(o||"")),pp=(t,o)=>{const i=new FileReader;return i.onload=function(){const c=i.result.split(",")[1];o("b"+(c||""))},i.readAsDataURL(t)};function hp(t){return t instanceof Uint8Array?t:t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}let gc;function Kg(t,o){if(bh&&t.data instanceof Blob)return t.data.arrayBuffer().then(hp).then(o);if(wh&&(t.data instanceof ArrayBuffer||Sh(t.data)))return o(hp(t.data));au(t,!1,i=>{gc||(gc=new TextEncoder),o(gc.encode(i))})}const mp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ws=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let t=0;t<mp.length;t++)ws[mp.charCodeAt(t)]=t;const Xg=t=>{let o=t.length*.75,i=t.length,c,d=0,p,m,v,x;t[t.length-1]==="="&&(o--,t[t.length-2]==="="&&o--);const _=new ArrayBuffer(o),T=new Uint8Array(_);for(c=0;c<i;c+=4)p=ws[t.charCodeAt(c)],m=ws[t.charCodeAt(c+1)],v=ws[t.charCodeAt(c+2)],x=ws[t.charCodeAt(c+3)],T[d++]=p<<2|m>>4,T[d++]=(m&15)<<4|v>>2,T[d++]=(v&3)<<6|x&63;return _},Jg=typeof ArrayBuffer=="function",cu=(t,o)=>{if(typeof t!="string")return{type:"message",data:kh(t,o)};const i=t.charAt(0);return i==="b"?{type:"message",data:Zg(t.substring(1),o)}:al[i]?t.length>1?{type:al[i],data:t.substring(1)}:{type:al[i]}:Bc},Zg=(t,o)=>{if(Jg){const i=Xg(t);return kh(i,o)}else return{base64:!0,data:t}},kh=(t,o)=>{switch(o){case"blob":return t instanceof Blob?t:new Blob([t]);case"arraybuffer":default:return t instanceof ArrayBuffer?t:t.buffer}},Ch="",ex=(t,o)=>{const i=t.length,c=new Array(i);let d=0;t.forEach((p,m)=>{au(p,!1,v=>{c[m]=v,++d===i&&o(c.join(Ch))})})},tx=(t,o)=>{const i=t.split(Ch),c=[];for(let d=0;d<i.length;d++){const p=cu(i[d],o);if(c.push(p),p.type==="error")break}return c};function nx(){return new TransformStream({transform(t,o){Kg(t,i=>{const c=i.length;let d;if(c<126)d=new Uint8Array(1),new DataView(d.buffer).setUint8(0,c);else if(c<65536){d=new Uint8Array(3);const p=new DataView(d.buffer);p.setUint8(0,126),p.setUint16(1,c)}else{d=new Uint8Array(9);const p=new DataView(d.buffer);p.setUint8(0,127),p.setBigUint64(1,BigInt(c))}t.data&&typeof t.data!="string"&&(d[0]|=128),o.enqueue(d),o.enqueue(i)})}})}let xc;function Oi(t){return t.reduce((o,i)=>o+i.length,0)}function zi(t,o){if(t[0].length===o)return t.shift();const i=new Uint8Array(o);let c=0;for(let d=0;d<o;d++)i[d]=t[0][c++],c===t[0].length&&(t.shift(),c=0);return t.length&&c<t[0].length&&(t[0]=t[0].slice(c)),i}function rx(t,o){xc||(xc=new TextDecoder);const i=[];let c=0,d=-1,p=!1;return new TransformStream({transform(m,v){for(i.push(m);;){if(c===0){if(Oi(i)<1)break;const x=zi(i,1);p=(x[0]&128)===128,d=x[0]&127,d<126?c=3:d===126?c=1:c=2}else if(c===1){if(Oi(i)<2)break;const x=zi(i,2);d=new DataView(x.buffer,x.byteOffset,x.length).getUint16(0),c=3}else if(c===2){if(Oi(i)<8)break;const x=zi(i,8),_=new DataView(x.buffer,x.byteOffset,x.length),T=_.getUint32(0);if(T>Math.pow(2,21)-1){v.enqueue(Bc);break}d=T*Math.pow(2,32)+_.getUint32(4),c=3}else{if(Oi(i)<d)break;const x=zi(i,d);v.enqueue(cu(p?x:xc.decode(x),o)),c=0}if(d===0||d>t){v.enqueue(Bc);break}}}})}const Eh=4;function ft(t){if(t)return ox(t)}function ox(t){for(var o in ft.prototype)t[o]=ft.prototype[o];return t}ft.prototype.on=ft.prototype.addEventListener=function(t,o){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(o),this};ft.prototype.once=function(t,o){function i(){this.off(t,i),o.apply(this,arguments)}return i.fn=o,this.on(t,i),this};ft.prototype.off=ft.prototype.removeListener=ft.prototype.removeAllListeners=ft.prototype.removeEventListener=function(t,o){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var i=this._callbacks["$"+t];if(!i)return this;if(arguments.length==1)return delete this._callbacks["$"+t],this;for(var c,d=0;d<i.length;d++)if(c=i[d],c===o||c.fn===o){i.splice(d,1);break}return i.length===0&&delete this._callbacks["$"+t],this};ft.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var o=new Array(arguments.length-1),i=this._callbacks["$"+t],c=1;c<arguments.length;c++)o[c-1]=arguments[c];if(i){i=i.slice(0);for(var c=0,d=i.length;c<d;++c)i[c].apply(this,o)}return this};ft.prototype.emitReserved=ft.prototype.emit;ft.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]};ft.prototype.hasListeners=function(t){return!!this.listeners(t).length};const kl=typeof Promise=="function"&&typeof Promise.resolve=="function"?o=>Promise.resolve().then(o):(o,i)=>i(o,0),dn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),sx="arraybuffer";function jh(t,...o){return o.reduce((i,c)=>(t.hasOwnProperty(c)&&(i[c]=t[c]),i),{})}const ix=dn.setTimeout,lx=dn.clearTimeout;function Cl(t,o){o.useNativeTimers?(t.setTimeoutFn=ix.bind(dn),t.clearTimeoutFn=lx.bind(dn)):(t.setTimeoutFn=dn.setTimeout.bind(dn),t.clearTimeoutFn=dn.clearTimeout.bind(dn))}const ax=1.33;function cx(t){return typeof t=="string"?ux(t):Math.ceil((t.byteLength||t.size)*ax)}function ux(t){let o=0,i=0;for(let c=0,d=t.length;c<d;c++)o=t.charCodeAt(c),o<128?i+=1:o<2048?i+=2:o<55296||o>=57344?i+=3:(c++,i+=4);return i}function _h(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function dx(t){let o="";for(let i in t)t.hasOwnProperty(i)&&(o.length&&(o+="&"),o+=encodeURIComponent(i)+"="+encodeURIComponent(t[i]));return o}function fx(t){let o={},i=t.split("&");for(let c=0,d=i.length;c<d;c++){let p=i[c].split("=");o[decodeURIComponent(p[0])]=decodeURIComponent(p[1])}return o}class px extends Error{constructor(o,i,c){super(o),this.description=i,this.context=c,this.type="TransportError"}}class uu extends ft{constructor(o){super(),this.writable=!1,Cl(this,o),this.opts=o,this.query=o.query,this.socket=o.socket,this.supportsBinary=!o.forceBase64}onError(o,i,c){return super.emitReserved("error",new px(o,i,c)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(o){this.readyState==="open"&&this.write(o)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(o){const i=cu(o,this.socket.binaryType);this.onPacket(i)}onPacket(o){super.emitReserved("packet",o)}onClose(o){this.readyState="closed",super.emitReserved("close",o)}pause(o){}createUri(o,i={}){return o+"://"+this._hostname()+this._port()+this.opts.path+this._query(i)}_hostname(){const o=this.opts.hostname;return o.indexOf(":")===-1?o:"["+o+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(o){const i=dx(o);return i.length?"?"+i:""}}class hx extends uu{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(o){this.readyState="pausing";const i=()=>{this.readyState="paused",o()};if(this._polling||!this.writable){let c=0;this._polling&&(c++,this.once("pollComplete",function(){--c||i()})),this.writable||(c++,this.once("drain",function(){--c||i()}))}else i()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(o){const i=c=>{if(this.readyState==="opening"&&c.type==="open"&&this.onOpen(),c.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(c)};tx(o,this.socket.binaryType).forEach(i),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const o=()=>{this.write([{type:"close"}])};this.readyState==="open"?o():this.once("open",o)}write(o){this.writable=!1,ex(o,i=>{this.doWrite(i,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const o=this.opts.secure?"https":"http",i=this.query||{};return this.opts.timestampRequests!==!1&&(i[this.opts.timestampParam]=_h()),!this.supportsBinary&&!i.sid&&(i.b64=1),this.createUri(o,i)}}let Nh=!1;try{Nh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const mx=Nh;function gx(){}class xx extends hx{constructor(o){if(super(o),typeof location<"u"){const i=location.protocol==="https:";let c=location.port;c||(c=i?"443":"80"),this.xd=typeof location<"u"&&o.hostname!==location.hostname||c!==o.port}}doWrite(o,i){const c=this.request({method:"POST",data:o});c.on("success",i),c.on("error",(d,p)=>{this.onError("xhr post error",d,p)})}doPoll(){const o=this.request();o.on("data",this.onData.bind(this)),o.on("error",(i,c)=>{this.onError("xhr poll error",i,c)}),this.pollXhr=o}}class Mn extends ft{constructor(o,i,c){super(),this.createRequest=o,Cl(this,c),this._opts=c,this._method=c.method||"GET",this._uri=i,this._data=c.data!==void 0?c.data:null,this._create()}_create(){var o;const i=jh(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");i.xdomain=!!this._opts.xd;const c=this._xhr=this.createRequest(i);try{c.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){c.setDisableHeaderCheck&&c.setDisableHeaderCheck(!0);for(let d in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(d)&&c.setRequestHeader(d,this._opts.extraHeaders[d])}}catch{}if(this._method==="POST")try{c.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{c.setRequestHeader("Accept","*/*")}catch{}(o=this._opts.cookieJar)===null||o===void 0||o.addCookies(c),"withCredentials"in c&&(c.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(c.timeout=this._opts.requestTimeout),c.onreadystatechange=()=>{var d;c.readyState===3&&((d=this._opts.cookieJar)===null||d===void 0||d.parseCookies(c.getResponseHeader("set-cookie"))),c.readyState===4&&(c.status===200||c.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof c.status=="number"?c.status:0)},0))},c.send(this._data)}catch(d){this.setTimeoutFn(()=>{this._onError(d)},0);return}typeof document<"u"&&(this._index=Mn.requestsCount++,Mn.requests[this._index]=this)}_onError(o){this.emitReserved("error",o,this._xhr),this._cleanup(!0)}_cleanup(o){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=gx,o)try{this._xhr.abort()}catch{}typeof document<"u"&&delete Mn.requests[this._index],this._xhr=null}}_onLoad(){const o=this._xhr.responseText;o!==null&&(this.emitReserved("data",o),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}Mn.requestsCount=0;Mn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",gp);else if(typeof addEventListener=="function"){const t="onpagehide"in dn?"pagehide":"unload";addEventListener(t,gp,!1)}}function gp(){for(let t in Mn.requests)Mn.requests.hasOwnProperty(t)&&Mn.requests[t].abort()}const yx=(function(){const t=Th({xdomain:!1});return t&&t.responseType!==null})();class vx extends xx{constructor(o){super(o);const i=o&&o.forceBase64;this.supportsBinary=yx&&!i}request(o={}){return Object.assign(o,{xd:this.xd},this.opts),new Mn(Th,this.uri(),o)}}function Th(t){const o=t.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!o||mx))return new XMLHttpRequest}catch{}if(!o)try{return new dn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Ih=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class bx extends uu{get name(){return"websocket"}doOpen(){const o=this.uri(),i=this.opts.protocols,c=Ih?{}:jh(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(c.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(o,i,c)}catch(d){return this.emitReserved("error",d)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=o=>this.onClose({description:"websocket connection closed",context:o}),this.ws.onmessage=o=>this.onData(o.data),this.ws.onerror=o=>this.onError("websocket error",o)}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;au(c,this.supportsBinary,p=>{try{this.doWrite(c,p)}catch{}d&&kl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const o=this.opts.secure?"wss":"ws",i=this.query||{};return this.opts.timestampRequests&&(i[this.opts.timestampParam]=_h()),this.supportsBinary||(i.b64=1),this.createUri(o,i)}}const yc=dn.WebSocket||dn.MozWebSocket;class wx extends bx{createSocket(o,i,c){return Ih?new yc(o,i,c):i?new yc(o,i):new yc(o)}doWrite(o,i){this.ws.send(i)}}class Sx extends uu{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(o){return this.emitReserved("error",o)}this._transport.closed.then(()=>{this.onClose()}).catch(o=>{this.onError("webtransport error",o)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(o=>{const i=rx(Number.MAX_SAFE_INTEGER,this.socket.binaryType),c=o.readable.pipeThrough(i).getReader(),d=nx();d.readable.pipeTo(o.writable),this._writer=d.writable.getWriter();const p=()=>{c.read().then(({done:v,value:x})=>{v||(this.onPacket(x),p())}).catch(v=>{})};p();const m={type:"open"};this.query.sid&&(m.data=`{"sid":"${this.query.sid}"}`),this._writer.write(m).then(()=>this.onOpen())})})}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;this._writer.write(c).then(()=>{d&&kl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var o;(o=this._transport)===null||o===void 0||o.close()}}const kx={websocket:wx,webtransport:Sx,polling:vx},Cx=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Ex=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Uc(t){if(t.length>8e3)throw"URI too long";const o=t,i=t.indexOf("["),c=t.indexOf("]");i!=-1&&c!=-1&&(t=t.substring(0,i)+t.substring(i,c).replace(/:/g,";")+t.substring(c,t.length));let d=Cx.exec(t||""),p={},m=14;for(;m--;)p[Ex[m]]=d[m]||"";return i!=-1&&c!=-1&&(p.source=o,p.host=p.host.substring(1,p.host.length-1).replace(/;/g,":"),p.authority=p.authority.replace("[","").replace("]","").replace(/;/g,":"),p.ipv6uri=!0),p.pathNames=jx(p,p.path),p.queryKey=_x(p,p.query),p}function jx(t,o){const i=/\/{2,9}/g,c=o.replace(i,"/").split("/");return(o.slice(0,1)=="/"||o.length===0)&&c.splice(0,1),o.slice(-1)=="/"&&c.splice(c.length-1,1),c}function _x(t,o){const i={};return o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(c,d,p){d&&(i[d]=p)}),i}const Hc=typeof addEventListener=="function"&&typeof removeEventListener=="function",cl=[];Hc&&addEventListener("offline",()=>{cl.forEach(t=>t())},!1);let Rh=class wo extends ft{constructor(o,i={}){var c,d;if(super(),this.binaryType=sx,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,o&&typeof o=="object"&&(i=o,o=null),o){const p=Uc(o);i.hostname=p.host,i.secure=p.protocol==="https"||p.protocol==="wss",i.port=p.port,p.query&&(i.query=p.query)}else i.host&&(i.hostname=Uc(i.host).host);if(Cl(this,i),this.secure=i.secure!=null?i.secure:typeof location<"u"&&location.protocol==="https:",i.hostname&&!i.port&&(i.port=this.secure?"443":"80"),this.hostname=i.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=i.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),i.transportImplementations&&i.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");i.transportImplementations||!((c=i.transports)===null||c===void 0)&&c.length&&typeof i.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((d=i.transportImplementations)!==null&&d!==void 0?d:i.transports).forEach(p=>{const m=p.prototype.name;this.transports.push(m),this._transportsByName[m]=p})):(this.transports=i.transports?[...i.transports]:["polling","websocket","webtransport"],this._transportsByName=kx),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=fx(this.opts.query)),Hc&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},cl.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(o){const i=Object.assign({},this.opts.query);i.EIO=Eh,i.transport=o,this.id&&(i.sid=this.id);const c=Object.assign({},this.opts,{query:i,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[o]);return new this._transportsByName[o](c)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const o=this.opts.rememberUpgrade&&wo.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const i=this.createTransport(o);i.open(),this.setTransport(i)}setTransport(o){this.transport&&this.transport.removeAllListeners(),this.transport=o,o.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",i=>this._onClose("transport close",i))}_probe(o){let i=this.createTransport(o),c=!1;wo.priorWebsocketSuccess=!1;const d=()=>{c||(i.send([{type:"ping",data:"probe"}]),i.once("packet",$=>{if(!c)if($.type==="pong"&&$.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",i),!i)return;wo.priorWebsocketSuccess=i.name==="websocket",this.transport.pause(()=>{c||this.readyState!=="closed"&&(T(),this.setTransport(i),i.send([{type:"upgrade"}]),this.emitReserved("upgrade",i),i=null,this.upgrading=!1,this.flush())})}else{const A=new Error("probe error");A.transport=i.name,this.emitReserved("upgradeError",A)}}))};function p(){c||(c=!0,T(),i.close(),i=null)}const m=$=>{const A=new Error("probe error: "+$);A.transport=i.name,p(),this.emitReserved("upgradeError",A)};function v(){m("transport closed")}function x(){m("socket closed")}function _($){i&&$.name!==i.name&&p()}const T=()=>{i.removeListener("open",d),i.removeListener("error",m),i.removeListener("close",v),this.off("close",x),this.off("upgrading",_)};i.once("open",d),i.once("error",m),i.once("close",v),this.once("close",x),this.once("upgrading",_),this._upgrades.indexOf("webtransport")!==-1&&o!=="webtransport"?this.setTimeoutFn(()=>{c||i.open()},200):i.open()}onOpen(){if(this.readyState="open",wo.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let o=0;o<this._upgrades.length;o++)this._probe(this._upgrades[o])}_onPacket(o){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",o),this.emitReserved("heartbeat"),o.type){case"open":this.onHandshake(JSON.parse(o.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const i=new Error("server error");i.code=o.data,this._onError(i);break;case"message":this.emitReserved("data",o.data),this.emitReserved("message",o.data);break}}onHandshake(o){this.emitReserved("handshake",o),this.id=o.sid,this.transport.query.sid=o.sid,this._upgrades=this._filterUpgrades(o.upgrades),this._pingInterval=o.pingInterval,this._pingTimeout=o.pingTimeout,this._maxPayload=o.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const o=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+o,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},o),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const o=this._getWritablePackets();this.transport.send(o),this._prevBufferLen=o.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let i=1;for(let c=0;c<this.writeBuffer.length;c++){const d=this.writeBuffer[c].data;if(d&&(i+=cx(d)),c>0&&i>this._maxPayload)return this.writeBuffer.slice(0,c);i+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const o=Date.now()>this._pingTimeoutTime;return o&&(this._pingTimeoutTime=0,kl(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),o}write(o,i,c){return this._sendPacket("message",o,i,c),this}send(o,i,c){return this._sendPacket("message",o,i,c),this}_sendPacket(o,i,c,d){if(typeof i=="function"&&(d=i,i=void 0),typeof c=="function"&&(d=c,c=null),this.readyState==="closing"||this.readyState==="closed")return;c=c||{},c.compress=c.compress!==!1;const p={type:o,data:i,options:c};this.emitReserved("packetCreate",p),this.writeBuffer.push(p),d&&this.once("flush",d),this.flush()}close(){const o=()=>{this._onClose("forced close"),this.transport.close()},i=()=>{this.off("upgrade",i),this.off("upgradeError",i),o()},c=()=>{this.once("upgrade",i),this.once("upgradeError",i)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?c():o()}):this.upgrading?c():o()),this}_onError(o){if(wo.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",o),this._onClose("transport error",o)}_onClose(o,i){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Hc&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const c=cl.indexOf(this._offlineEventListener);c!==-1&&cl.splice(c,1)}this.readyState="closed",this.id=null,this.emitReserved("close",o,i),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(o){const i=[];for(let c=0;c<o.length;c++)~this.transports.indexOf(o[c])&&i.push(o[c]);return i}};Rh.protocol=Eh;function Nx(t,o="",i){let c=t;i=i||typeof location<"u"&&location,t==null&&(t=i.protocol+"//"+i.host),typeof t=="string"&&(t.charAt(0)==="/"&&(t.charAt(1)==="/"?t=i.protocol+t:t=i.host+t),/^(https?|wss?):\/\//.test(t)||(typeof i<"u"?t=i.protocol+"//"+t:t="https://"+t),c=Uc(t)),c.port||(/^(http|ws)$/.test(c.protocol)?c.port="80":/^(http|ws)s$/.test(c.protocol)&&(c.port="443")),c.path=c.path||"/";const p=c.host.indexOf(":")!==-1?"["+c.host+"]":c.host;return c.id=c.protocol+"://"+p+":"+c.port+o,c.href=c.protocol+"://"+p+(i&&i.port===c.port?"":":"+c.port),c}const Tx=typeof ArrayBuffer=="function",Ix=t=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(t):t.buffer instanceof ArrayBuffer,$h=Object.prototype.toString,Rx=typeof Blob=="function"||typeof Blob<"u"&&$h.call(Blob)==="[object BlobConstructor]",$x=typeof File=="function"||typeof File<"u"&&$h.call(File)==="[object FileConstructor]";function du(t){return Tx&&(t instanceof ArrayBuffer||Ix(t))||Rx&&t instanceof Blob||$x&&t instanceof File}function ul(t,o){if(!t||typeof t!="object")return!1;if(Array.isArray(t)){for(let i=0,c=t.length;i<c;i++)if(ul(t[i]))return!0;return!1}if(du(t))return!0;if(t.toJSON&&typeof t.toJSON=="function"&&arguments.length===1)return ul(t.toJSON(),!0);for(const i in t)if(Object.prototype.hasOwnProperty.call(t,i)&&ul(t[i]))return!0;return!1}function Ax(t){const o=[],i=t.data,c=t;return c.data=dl(i,o),c.attachments=o.length,{packet:c,buffers:o}}function dl(t,o,i){if(!t)return t;if(du(t)){const c={_placeholder:!0,num:o.length};return o.push(t),c}else if(Array.isArray(t)){const c=new Array(t.length);for(let d=0;d<t.length;d++)c[d]=dl(t[d],o);return c}else if(typeof t=="object"&&!(t instanceof Date)){if(t.toJSON&&typeof t.toJSON=="function"&&!i)return dl(t.toJSON(),o,!0);const c={};for(const d in t)Object.prototype.hasOwnProperty.call(t,d)&&(c[d]=dl(t[d],o));return c}return t}function Px(t,o){return t.data=Vc(t.data,o),delete t.attachments,t}function Vc(t,o){if(!t)return t;if(t&&t._placeholder===!0){if(typeof t.num=="number"&&t.num>=0&&t.num<o.length)return o[t.num];throw new Error("illegal attachments")}else if(Array.isArray(t))for(let i=0;i<t.length;i++)t[i]=Vc(t[i],o);else if(typeof t=="object")for(const i in t)Object.prototype.hasOwnProperty.call(t,i)&&(t[i]=Vc(t[i],o));return t}const Mx=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Fe;(function(t){t[t.CONNECT=0]="CONNECT",t[t.DISCONNECT=1]="DISCONNECT",t[t.EVENT=2]="EVENT",t[t.ACK=3]="ACK",t[t.CONNECT_ERROR=4]="CONNECT_ERROR",t[t.BINARY_EVENT=5]="BINARY_EVENT",t[t.BINARY_ACK=6]="BINARY_ACK"})(Fe||(Fe={}));class Lx{constructor(o){this.replacer=o}encode(o){return(o.type===Fe.EVENT||o.type===Fe.ACK)&&ul(o)?this.encodeAsBinary({type:o.type===Fe.EVENT?Fe.BINARY_EVENT:Fe.BINARY_ACK,nsp:o.nsp,data:o.data,id:o.id}):[this.encodeAsString(o)]}encodeAsString(o){let i=""+o.type;return(o.type===Fe.BINARY_EVENT||o.type===Fe.BINARY_ACK)&&(i+=o.attachments+"-"),o.nsp&&o.nsp!=="/"&&(i+=o.nsp+","),o.id!=null&&(i+=o.id),o.data!=null&&(i+=JSON.stringify(o.data,this.replacer)),i}encodeAsBinary(o){const i=Ax(o),c=this.encodeAsString(i.packet),d=i.buffers;return d.unshift(c),d}}class fu extends ft{constructor(o){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof o=="function"?{reviver:o}:o)}add(o){let i;if(typeof o=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");i=this.decodeString(o);const c=i.type===Fe.BINARY_EVENT;c||i.type===Fe.BINARY_ACK?(i.type=c?Fe.EVENT:Fe.ACK,this.reconstructor=new Ox(i)):super.emitReserved("decoded",i)}else if(du(o)||o.base64)if(this.reconstructor)i=this.reconstructor.takeBinaryData(o),i&&(this.reconstructor=null,super.emitReserved("decoded",i));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+o)}decodeString(o){let i=0;const c={type:Number(o.charAt(0))};if(Fe[c.type]===void 0)throw new Error("unknown packet type "+c.type);if(c.type===Fe.BINARY_EVENT||c.type===Fe.BINARY_ACK){const p=i+1;for(;o.charAt(++i)!=="-"&&i!=o.length;);const m=o.substring(p,i);if(m!=Number(m)||o.charAt(i)!=="-")throw new Error("Illegal attachments");const v=Number(m);if(!zx(v)||v<1)throw new Error("Illegal attachments");if(v>this.opts.maxAttachments)throw new Error("too many attachments");c.attachments=v}if(o.charAt(i+1)==="/"){const p=i+1;for(;++i&&!(o.charAt(i)===","||i===o.length););c.nsp=o.substring(p,i)}else c.nsp="/";const d=o.charAt(i+1);if(d!==""&&Number(d)==d){const p=i+1;for(;++i;){const m=o.charAt(i);if(m==null||Number(m)!=m){--i;break}if(i===o.length)break}c.id=Number(o.substring(p,i+1))}if(o.charAt(++i)){const p=this.tryParse(o.substr(i));if(fu.isPayloadValid(c.type,p))c.data=p;else throw new Error("invalid payload")}return c}tryParse(o){try{return JSON.parse(o,this.opts.reviver)}catch{return!1}}static isPayloadValid(o,i){switch(o){case Fe.CONNECT:return xp(i);case Fe.DISCONNECT:return i===void 0;case Fe.CONNECT_ERROR:return typeof i=="string"||xp(i);case Fe.EVENT:case Fe.BINARY_EVENT:return Array.isArray(i)&&(typeof i[0]=="number"||typeof i[0]=="string"&&Mx.indexOf(i[0])===-1);case Fe.ACK:case Fe.BINARY_ACK:return Array.isArray(i)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Ox{constructor(o){this.packet=o,this.buffers=[],this.reconPack=o}takeBinaryData(o){if(this.buffers.push(o),this.buffers.length===this.reconPack.attachments){const i=Px(this.reconPack,this.buffers);return this.finishedReconstruction(),i}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const zx=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t};function xp(t){return Object.prototype.toString.call(t)==="[object Object]"}const Fx=Object.freeze(Object.defineProperty({__proto__:null,Decoder:fu,Encoder:Lx,get PacketType(){return Fe}},Symbol.toStringTag,{value:"Module"}));function kn(t,o,i){return t.on(o,i),function(){t.off(o,i)}}const Dx=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ah extends ft{constructor(o,i,c){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=o,this.nsp=i,c&&c.auth&&(this.auth=c.auth),this._opts=Object.assign({},c),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const o=this.io;this.subs=[kn(o,"open",this.onopen.bind(this)),kn(o,"packet",this.onpacket.bind(this)),kn(o,"error",this.onerror.bind(this)),kn(o,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...o){return o.unshift("message"),this.emit.apply(this,o),this}emit(o,...i){var c,d,p;if(Dx.hasOwnProperty(o))throw new Error('"'+o.toString()+'" is a reserved event name');if(i.unshift(o),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(i),this;const m={type:Fe.EVENT,data:i};if(m.options={},m.options.compress=this.flags.compress!==!1,typeof i[i.length-1]=="function"){const T=this.ids++,$=i.pop();this._registerAckCallback(T,$),m.id=T}const v=(d=(c=this.io.engine)===null||c===void 0?void 0:c.transport)===null||d===void 0?void 0:d.writable,x=this.connected&&!(!((p=this.io.engine)===null||p===void 0)&&p._hasPingExpired());return this.flags.volatile&&!v||(x?(this.notifyOutgoingListeners(m),this.packet(m)):this.sendBuffer.push(m)),this.flags={},this}_registerAckCallback(o,i){var c;const d=(c=this.flags.timeout)!==null&&c!==void 0?c:this._opts.ackTimeout;if(d===void 0){this.acks[o]=i;return}const p=this.io.setTimeoutFn(()=>{delete this.acks[o];for(let v=0;v<this.sendBuffer.length;v++)this.sendBuffer[v].id===o&&this.sendBuffer.splice(v,1);i.call(this,new Error("operation has timed out"))},d),m=(...v)=>{this.io.clearTimeoutFn(p),i.apply(this,v)};m.withError=!0,this.acks[o]=m}emitWithAck(o,...i){return new Promise((c,d)=>{const p=(m,v)=>m?d(m):c(v);p.withError=!0,i.push(p),this.emit(o,...i)})}_addToQueue(o){let i;typeof o[o.length-1]=="function"&&(i=o.pop());const c={id:this._queueSeq++,tryCount:0,pending:!1,args:o,flags:Object.assign({fromQueue:!0},this.flags)};o.push((d,...p)=>(this._queue[0],d!==null?c.tryCount>this._opts.retries&&(this._queue.shift(),i&&i(d)):(this._queue.shift(),i&&i(null,...p)),c.pending=!1,this._drainQueue())),this._queue.push(c),this._drainQueue()}_drainQueue(o=!1){if(!this.connected||this._queue.length===0)return;const i=this._queue[0];i.pending&&!o||(i.pending=!0,i.tryCount++,this.flags=i.flags,this.emit.apply(this,i.args))}packet(o){o.nsp=this.nsp,this.io._packet(o)}onopen(){typeof this.auth=="function"?this.auth(o=>{this._sendConnectPacket(o)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(o){this.packet({type:Fe.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},o):o})}onerror(o){this.connected||this.emitReserved("connect_error",o)}onclose(o,i){this.connected=!1,delete this.id,this.emitReserved("disconnect",o,i),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(o=>{if(!this.sendBuffer.some(c=>String(c.id)===o)){const c=this.acks[o];delete this.acks[o],c.withError&&c.call(this,new Error("socket has been disconnected"))}})}onpacket(o){if(o.nsp===this.nsp)switch(o.type){case Fe.CONNECT:o.data&&o.data.sid?this.onconnect(o.data.sid,o.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Fe.EVENT:case Fe.BINARY_EVENT:this.onevent(o);break;case Fe.ACK:case Fe.BINARY_ACK:this.onack(o);break;case Fe.DISCONNECT:this.ondisconnect();break;case Fe.CONNECT_ERROR:this.destroy();const c=new Error(o.data.message);c.data=o.data.data,this.emitReserved("connect_error",c);break}}onevent(o){const i=o.data||[];o.id!=null&&i.push(this.ack(o.id)),this.connected?this.emitEvent(i):this.receiveBuffer.push(Object.freeze(i))}emitEvent(o){if(this._anyListeners&&this._anyListeners.length){const i=this._anyListeners.slice();for(const c of i)c.apply(this,o)}super.emit.apply(this,o),this._pid&&o.length&&typeof o[o.length-1]=="string"&&(this._lastOffset=o[o.length-1])}ack(o){const i=this;let c=!1;return function(...d){c||(c=!0,i.packet({type:Fe.ACK,id:o,data:d}))}}onack(o){const i=this.acks[o.id];typeof i=="function"&&(delete this.acks[o.id],i.withError&&o.data.unshift(null),i.apply(this,o.data))}onconnect(o,i){this.id=o,this.recovered=i&&this._pid===i,this._pid=i,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(o=>this.emitEvent(o)),this.receiveBuffer=[],this.sendBuffer.forEach(o=>{this.notifyOutgoingListeners(o),this.packet(o)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(o=>o()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Fe.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(o){return this.flags.compress=o,this}get volatile(){return this.flags.volatile=!0,this}timeout(o){return this.flags.timeout=o,this}onAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(o),this}prependAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(o),this}offAny(o){if(!this._anyListeners)return this;if(o){const i=this._anyListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(o),this}prependAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(o),this}offAnyOutgoing(o){if(!this._anyOutgoingListeners)return this;if(o){const i=this._anyOutgoingListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(o){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const i=this._anyOutgoingListeners.slice();for(const c of i)c.apply(this,o.data)}}}function Io(t){t=t||{},this.ms=t.min||100,this.max=t.max||1e4,this.factor=t.factor||2,this.jitter=t.jitter>0&&t.jitter<=1?t.jitter:0,this.attempts=0}Io.prototype.duration=function(){var t=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var o=Math.random(),i=Math.floor(o*this.jitter*t);t=(Math.floor(o*10)&1)==0?t-i:t+i}return Math.min(t,this.max)|0};Io.prototype.reset=function(){this.attempts=0};Io.prototype.setMin=function(t){this.ms=t};Io.prototype.setMax=function(t){this.max=t};Io.prototype.setJitter=function(t){this.jitter=t};class Wc extends ft{constructor(o,i){var c;super(),this.nsps={},this.subs=[],o&&typeof o=="object"&&(i=o,o=void 0),i=i||{},i.path=i.path||"/socket.io",this.opts=i,Cl(this,i),this.reconnection(i.reconnection!==!1),this.reconnectionAttempts(i.reconnectionAttempts||1/0),this.reconnectionDelay(i.reconnectionDelay||1e3),this.reconnectionDelayMax(i.reconnectionDelayMax||5e3),this.randomizationFactor((c=i.randomizationFactor)!==null&&c!==void 0?c:.5),this.backoff=new Io({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(i.timeout==null?2e4:i.timeout),this._readyState="closed",this.uri=o;const d=i.parser||Fx;this.encoder=new d.Encoder,this.decoder=new d.Decoder,this._autoConnect=i.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(o){return arguments.length?(this._reconnection=!!o,o||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(o){return o===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=o,this)}reconnectionDelay(o){var i;return o===void 0?this._reconnectionDelay:(this._reconnectionDelay=o,(i=this.backoff)===null||i===void 0||i.setMin(o),this)}randomizationFactor(o){var i;return o===void 0?this._randomizationFactor:(this._randomizationFactor=o,(i=this.backoff)===null||i===void 0||i.setJitter(o),this)}reconnectionDelayMax(o){var i;return o===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=o,(i=this.backoff)===null||i===void 0||i.setMax(o),this)}timeout(o){return arguments.length?(this._timeout=o,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(o){if(~this._readyState.indexOf("open"))return this;this.engine=new Rh(this.uri,this.opts);const i=this.engine,c=this;this._readyState="opening",this.skipReconnect=!1;const d=kn(i,"open",function(){c.onopen(),o&&o()}),p=v=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",v),o?o(v):this.maybeReconnectOnOpen()},m=kn(i,"error",p);if(this._timeout!==!1){const v=this._timeout,x=this.setTimeoutFn(()=>{d(),p(new Error("timeout")),i.close()},v);this.opts.autoUnref&&x.unref(),this.subs.push(()=>{this.clearTimeoutFn(x)})}return this.subs.push(d),this.subs.push(m),this}connect(o){return this.open(o)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const o=this.engine;this.subs.push(kn(o,"ping",this.onping.bind(this)),kn(o,"data",this.ondata.bind(this)),kn(o,"error",this.onerror.bind(this)),kn(o,"close",this.onclose.bind(this)),kn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(o){try{this.decoder.add(o)}catch(i){this.onclose("parse error",i)}}ondecoded(o){kl(()=>{this.emitReserved("packet",o)},this.setTimeoutFn)}onerror(o){this.emitReserved("error",o)}socket(o,i){let c=this.nsps[o];return c?this._autoConnect&&!c.active&&c.connect():(c=new Ah(this,o,i),this.nsps[o]=c),c}_destroy(o){const i=Object.keys(this.nsps);for(const c of i)if(this.nsps[c].active)return;this._close()}_packet(o){const i=this.encoder.encode(o);for(let c=0;c<i.length;c++)this.engine.write(i[c],o.options)}cleanup(){this.subs.forEach(o=>o()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(o,i){var c;this.cleanup(),(c=this.engine)===null||c===void 0||c.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",o,i),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const o=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const i=this.backoff.duration();this._reconnecting=!0;const c=this.setTimeoutFn(()=>{o.skipReconnect||(this.emitReserved("reconnect_attempt",o.backoff.attempts),!o.skipReconnect&&o.open(d=>{d?(o._reconnecting=!1,o.reconnect(),this.emitReserved("reconnect_error",d)):o.onreconnect()}))},i);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}}onreconnect(){const o=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",o)}}const ps={};function fl(t,o){typeof t=="object"&&(o=t,t=void 0),o=o||{};const i=Nx(t,o.path||"/socket.io"),c=i.source,d=i.id,p=i.path,m=ps[d]&&p in ps[d].nsps,v=o.forceNew||o["force new connection"]||o.multiplex===!1||m;let x;return v?x=new Wc(c,o):(ps[d]||(ps[d]=new Wc(c,o)),x=ps[d]),i.query&&!o.query&&(o.query=i.queryKey),x.socket(i.path,o)}Object.assign(fl,{Manager:Wc,Socket:Ah,io:fl,connect:fl});const Ph="";async function Ue(t,{method:o="GET",token:i,body:c,headers:d={}}={}){const p=await fetch(`${Ph}${t}`,{method:o,cache:"no-store",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{},...d},body:c?JSON.stringify(c):void 0}),m=await p.json().catch(()=>({}));if(!p.ok){const v=new Error(m.error||`Falha na requisição (${p.status})`);throw v.status=p.status,v}return m}const Ye={login(t,o){return Ue("/api/auth/login",{method:"POST",body:{email:t,password:o}})},getMe(t){return Ue("/api/auth/me",{token:t})},logout(t){return t?Ue("/api/auth/logout",{method:"POST",token:t}).catch(()=>{}):Promise.resolve()},changePassword(t,{currentPassword:o,newPassword:i}){return Ue("/api/auth/change-password",{method:"POST",token:t,body:{current_password:o,new_password:i}})},getUsers(t){return Ue("/api/users",{token:t})},createUser(t,{name:o,email:i,password:c,role:d}){return Ue("/api/users",{method:"POST",token:t,body:{name:o,email:i,password:c,role:d}})},updateUser(t,o,i){return Ue(`/api/users/${o}`,{method:"PUT",token:t,body:i})},deleteUser(t,o){return Ue(`/api/users/${o}`,{method:"DELETE",token:t})},getAuditLogs(t){return Ue("/api/audit-logs",{token:t})},getInventoryChanges(t,{machineId:o,limit:i=120}={}){const c=new URLSearchParams;o&&c.set("machine_id",o),i&&c.set("limit",i);const d=c.toString();return Ue(`/api/inventory/changes${d?`?${d}`:""}`,{token:t})},async downloadAgentInstaller(t){const o=await fetch(`${Ph}/api/agent/download`,{method:"GET",headers:t?{Authorization:`Bearer ${t}`}:{}});if(!o.ok){const p=await o.json().catch(()=>({})),m=new Error(p.error||`Falha ao baixar instalador (${o.status})`);throw m.status=o.status,m}const i=await o.blob(),c=window.URL.createObjectURL(i),d=document.createElement("a");d.href=c,d.download="IpojucaRMM-Setup.exe",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>window.URL.revokeObjectURL(c),4e3)},revokeMachine(t,o,i=!0,c=""){return Ue(`/api/machines/${o}/revoke`,{method:"POST",token:t,body:{revoked:i,reason:c}})},getUnits(t){return Ue("/api/units",{token:t})},createUnit(t,o){return Ue("/api/units",{method:"POST",token:t,body:o})},updateUnit(t,o,i){return Ue(`/api/units/${o}`,{method:"PUT",token:t,body:i})},deleteUnit(t,o,i={}){const c=new URLSearchParams;i.target_unit_id&&c.set("target_unit_id",i.target_unit_id),i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Ue(`/api/units/${o}${d?`?${d}`:""}`,{method:"DELETE",token:t,body:i})},createSector(t,o,i){return Ue(`/api/units/${o}/sectors`,{method:"POST",token:t,body:i})},updateSector(t,o,i){return Ue(`/api/sectors/${o}`,{method:"PUT",token:t,body:i})},deleteSector(t,o,i={}){const c=new URLSearchParams;i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Ue(`/api/sectors/${o}${d?`?${d}`:""}`,{method:"DELETE",token:t,body:i})},getMachines(t,{unitId:o,status:i}={}){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("status",i);const d=c.toString();return Ue(`/api/machines${d?`?${d}`:""}`,{token:t})},getMachineDiagnostics(t,o){return Ue(`/api/machines/${o}/diagnostics`,{token:t})},refreshMachineTelemetryNow(t,o){return Ue(`/api/machines/${o}/refresh-telemetry`,{method:"POST",token:t})},deleteMachine(t,o){return Ue(`/api/machines/${o}`,{method:"DELETE",token:t})},getAgentVersionInfo(){return Ue("/api/agent/version")},updateMachineAgent(t,o){return Ue(`/api/machines/${o}/update-agent`,{method:"POST",token:t})},updateAllAgents(t){return Ue("/api/agent/update-all",{method:"POST",token:t})},getMachineMessages(t,o){return Ue(`/api/machines/${o}/messages`,{token:t})},sendMachineMessage(t,o,i){return Ue(`/api/machines/${o}/messages`,{method:"POST",token:t,body:{message:i}})},updateMachineLocation(t,o,{unitId:i,sectorId:c}){return Ue(`/api/machines/${o}/location`,{method:"POST",token:t,body:{unit_id:i,sector_id:c}})},getTaskCatalog(t){return Ue("/api/catalog/tasks",{token:t})},getApprovedPrinters(t,o,i){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("machine_id",i);const d=c.toString()?`?${c.toString()}`:"";return Ue(`/api/printers${d}`,{token:t})},dispatchAuthorizedTask(t,{machineId:o,taskCode:i,parameters:c,reason:d}){return Ue("/api/command",{method:"POST",token:t,body:{machine_id:o,task_code:i,parameters:c,reason:d}})},getAlerts(t){return Ue("/api/alerts",{token:t})},simulateAgentHeartbeat({agentUuid:t,agentToken:o,inventory:i,metrics:c}){return Ue("/api/heartbeat",{method:"POST",headers:{"X-Agent-Uuid":t,"X-Agent-Token":o},body:{agent_version:"1.0.0",inventory:i,metrics:c}})}};function Bx(t,o={}){const c=fl("/dashboard",{auth:{token:t},reconnection:!0});return o.onMachineUpdated&&c.on("machine:updated",o.onMachineUpdated),o.onMachineDeleted&&c.on("machine:deleted",o.onMachineDeleted),o.onAlertTriggered&&c.on("alert:triggered",o.onAlertTriggered),o.onTaskUpdated&&c.on("task:updated",o.onTaskUpdated),o.onAgentMessage&&c.on("agent:message",o.onAgentMessage),o.onUnitsUpdated&&c.on("units:updated",o.onUnitsUpdated),o.onAuditCreated&&c.on("audit:created",o.onAuditCreated),o.onConnect&&c.on("connect",o.onConnect),o.onDisconnect&&c.on("disconnect",o.onDisconnect),c}const Yn=480,br=300,xo=3,Ux=30,yp=15,Hx=Yn/2,Vx=62,Cs=12,Br=9,Fi=2.2,Pe={floorA:"#F2E4CC",floorB:"#E7D5B6",floorEdge:"#C9AE86",wallSouth:"#F0DFC4",wallEast:"#DCC7A6",wallCap:"#9C6B4A",rug:"#7FB069",rugBorder:"#F2C14E",woodTop:"#C98A4B",woodSouth:"#A96C33",deskTop:"#E0A458",deskSouth:"#BE8038",metal:"#B7C4CE",metalDark:"#7C8B96",plastic:"#F4F8FB",plasticDark:"#CBD6DE",paper:"#FFFDF7",plant:"#3E9B4F",plantDark:"#2C7A3B",pot:"#C4693F",glass:"#BFE6F5",glassFrame:"#6E8A96",ink:"#1F2933",inkSoft:"#52606D"},Pn={NORMAL:"#12B76A",WARNING:"#F79009",CRITICAL:"#F04438",OFFLINE:"#98A2B3"},Wx={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"};function Es(t,o){const i=parseInt(t.slice(1),16),c=Math.max(0,Math.min(255,Math.round((i>>16&255)*o))),d=Math.max(0,Math.min(255,Math.round((i>>8&255)*o))),p=Math.max(0,Math.min(255,Math.round((i&255)*o)));return`#${(c<<16|d<<8|p).toString(16).padStart(6,"0")}`}function Ge(t,o,i=0){return{sx:Hx+(t-o)*(Ux/2),sy:Vx+(t+o)*(yp/2)-i*yp}}function ko(t,o,i){t.fillStyle=i,t.beginPath(),t.moveTo(Math.round(o[0].sx),Math.round(o[0].sy));for(let c=1;c<o.length;c+=1)t.lineTo(Math.round(o[c].sx),Math.round(o[c].sy));t.closePath(),t.fill()}function Gx(t,o,i,c,d){const p=Ge(o,i,c),m=Ge(o+1,i,c),v=Ge(o+1,i+1,c),x=Ge(o,i+1,c);ko(t,[p,m,v,x],d)}function Dt(t,o,i,c,d,p,m,v){const x=Es(v,1),_=Es(v,.82),T=Es(v,.68);ko(t,[Ge(o,i+p,c+m),Ge(o+d,i+p,c+m),Ge(o+d,i+p,c),Ge(o,i+p,c)],_),ko(t,[Ge(o+d,i,c+m),Ge(o+d,i+p,c+m),Ge(o+d,i+p,c),Ge(o+d,i,c)],T),ko(t,[Ge(o,i,c+m),Ge(o+d,i,c+m),Ge(o+d,i+p,c+m),Ge(o,i+p,c+m)],x)}function ut(t,o,i,c,d,p,m){ko(t,[Ge(o,i,c),Ge(o+d,i,c),Ge(o+d,i+p,c),Ge(o,i+p,c)],m)}function qx(t){for(let o=0;o<Cs;o+=1)for(let i=0;i<Br;i+=1){const c=(o+i)%2===0;Gx(t,o,i,0,c?Pe.floorA:Pe.floorB)}ko(t,[Ge(0,Br,0),Ge(Cs,Br,0),Ge(Cs,Br,-.12),Ge(0,Br,-.12)],Pe.floorEdge)}function Yx(t){Dt(t,-.3,-.3,0,Cs+.6,.3,Fi,Pe.wallSouth),Dt(t,-.3,0,0,.3,Br,Fi,Pe.wallEast),ut(t,-.3,-.3,Fi,Cs+.6,.3,Pe.wallCap),ut(t,-.3,0,Fi,.3,Br,Pe.wallCap);const o=4.2,i=.02;ut(t,o,i,1.05,2.6,.02,Pe.glassFrame),ut(t,o+.12,i+.01,1.15,2.36,.02,Pe.glass),ut(t,o+1.26,i+.01,1.15,.08,.02,Pe.glassFrame),ut(t,.02,6,0,.02,1.5,Pe.woodSouth),ut(t,.03,6.1,0,.02,1.3,Pe.woodTop),ut(t,.04,7.2,.95,.02,.12,"#D9B44A")}function Qx(t){ut(t,4.4,4.1,.015,3.4,2.2,Pe.rugBorder),ut(t,4.55,4.25,.02,3.1,1.9,Pe.rug)}function Kx(t){Dt(t,7.4,6,0,3.6,.9,1.05,Pe.woodSouth),ut(t,7.35,5.95,1.05,3.7,1,Pe.woodTop),ut(t,7.45,6.05,1.07,3.5,.8,"#E7D9C3")}function Xx(t){Dt(t,2.1,2.5,0,2.4,1.2,.82,Pe.deskSouth),ut(t,2.05,2.45,.82,2.5,1.3,Pe.deskTop)}function Jx(t){Dt(t,5,2.2,0,2.2,1.1,.82,Pe.deskSouth),ut(t,4.95,2.15,.82,2.3,1.2,Pe.deskTop)}function Zx(t){Dt(t,2.7,4,0,.9,.9,.45,Pe.metalDark),Dt(t,2.7,4.75,.45,.9,.18,.55,Pe.metal)}function ey(t){Dt(t,9.4,1.9,0,1.5,1.2,.62,Pe.metalDark),ut(t,9.35,1.85,.62,1.6,1.3,Pe.metal),Dt(t,9.55,2.05,.62,1.15,.85,.55,Pe.plasticDark),ut(t,9.6,2.1,1.17,1.05,.3,Pe.plastic),ut(t,9.7,2.45,1.19,.85,.35,Pe.paper)}function ty(t){Dt(t,.55,.9,0,.55,.55,.4,Pe.pot),Dt(t,.62,.97,.4,.4,.4,.45,Pe.plantDark),Dt(t,.7,1.05,.85,.24,.24,.3,Pe.plant)}const vc=[{x:2.95,y:2.85,label:"MESA 01",labelOffset:-2},{x:5.55,y:2.55,label:"MESA 02",labelOffset:-16},{x:8.15,y:6.25,label:"BALCÃO",labelOffset:-2}];function ny(t){return t?t.health_status==="OFFLINE"?t.last_seen_at?(Date.now()-new Date(t.last_seen_at).getTime())/1e3>=86400:!1:Number(t.idle_seconds||0)>=86400:!1}function ry(t,o,i,c,d,p){const m=(i==null?void 0:i.health_status)||"OFFLINE",v=Pn[m]||Pn.OFFLINE;Dt(t,o.x,o.y,.82,.85,.3,.12,Pe.metalDark),Dt(t,o.x+.34,o.y+.08,.94,.16,.12,.28,Pe.metal),Dt(t,o.x-.02,o.y+.02,1.2,.9,.14,.62,Pe.plasticDark),ut(t,o.x+.04,o.y+.03,1.78,.78,.12,v),ut(t,o.x+.1,o.y+.05,1.79,.3,.06,Es(v,1.35)),ut(t,o.x+.05,o.y+.42,.84,.7,.28,Pe.plasticDark);const x=Ge(o.x+.86,o.y+.1,1.86);if(t.fillStyle=p||m!=="NORMAL"?v:Es(v,.6),t.fillRect(Math.round(x.sx)-1,Math.round(x.sy)-1,3,3),c||d){const _=Ge(o.x-.25,o.y-.25,.03),T=Ge(o.x+1.15,o.y-.25,.03),$=Ge(o.x+1.15,o.y+.85,.03),A=Ge(o.x-.25,o.y+.85,.03);t.strokeStyle=c?"#1F2937":"#52796B",t.lineWidth=c?1.4:1,t.beginPath(),t.moveTo(Math.round(_.sx),Math.round(_.sy)),t.lineTo(Math.round(T.sx),Math.round(T.sy)),t.lineTo(Math.round($.sx),Math.round($.sy)),t.lineTo(Math.round(A.sx),Math.round(A.sy)),t.closePath(),t.stroke()}}function oy(t,o,i,c,d=[]){const p=(i==null?void 0:i.health_status)||"OFFLINE",m=ny(i),v=Ge(o.x+.45,o.y+.2,2.15),x=(i==null?void 0:i.hostname)||"SEM AGENTE",_=m?`${x} !24h`:x;t.font='8px "Courier New", monospace';const T=Math.max(t.measureText(_).width+18,46),$=Math.round(v.sx-T/2);let A=Math.round(v.sy-13+(o.labelOffset||0));const D=le=>d.some(te=>$<te.x+te.w&&$+T>te.x&&le<te.y+te.h&&le+12>te.y);let ne=0;for(;D(A)&&ne<8;)A+=14,ne+=1;const re={x:$,y:A,w:T,h:12};return d.push(re),t.fillStyle=c?"#1F2937":m?"#FEF2F2":"rgba(255,255,255,0.96)",t.fillRect($,A,T,12),t.strokeStyle=c?"#1F2937":m?"#DC2626":"rgba(31,41,55,0.3)",t.lineWidth=1,t.strokeRect($+.5,A+.5,T-1,11),t.fillStyle=m?"#DC2626":Pn[p]||Pn.OFFLINE,t.fillRect($+4,A+4,4,4),t.fillStyle=c?"#FFFFFF":m?"#991B1B":Pe.ink,t.textBaseline="middle",t.fillText(_,$+11,A+6.5),re}function sy(t,o,i,c){if(!o)return;const d=o.health_status||"OFFLINE",p=Pn[d]||Pn.OFFLINE,m=16,v=236,x=74,_=c-x-18;t.fillStyle="rgba(255,255,255,0.96)",t.fillRect(m,_,v,x),t.strokeStyle="rgba(31,41,55,0.35)",t.lineWidth=1,t.strokeRect(m+.5,_+.5,v-1,x-1),t.fillStyle=p,t.fillRect(m,_,3,x),t.textBaseline="alphabetic",t.font='bold 11px "Courier New", monospace',t.fillStyle=Pe.ink,t.fillText(o.hostname||"SEM AGENTE",m+12,_+18),t.font='9px "Courier New", monospace',t.fillStyle=p,t.fillText(Wx[d]||d,m+12,_+32),t.fillStyle=Pe.inkSoft,t.fillText(`IP ${o.ip_address||"—"}`,m+12,_+45),t.fillText(`CPU ${Number(o.cpu_usage_pct??0).toFixed(0)}%   RAM ${Number(o.ram_usage_pct??0).toFixed(0)}%`,m+12,_+57);const T=Number(o.temperature_c)>0?`${Number(o.temperature_c).toFixed(0)}°C`:"N/D";t.fillText(`DISCO ${Number(o.disk_usage_pct??0).toFixed(0)}%   TEMP ${T}`,m+12,_+69)}const iy=E.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, #f7f4ec 0%, #e7e3d8 58%, #d8d4c7 100%);
  overflow: hidden;
  z-index: 0;
`,ly=E.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${({$dragging:t,$hover:o})=>t?"grabbing":o?"pointer":"grab"};
  image-rendering: auto;
`,ay=E.div`
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
`,Di=E.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: ${({$color:t})=>t};
  margin-right: 4px;
`,cy=E.div`
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
`;function uy({activeUnit:t,machines:o=[],selectedMachine:i,selectedSector:c,onSelectMachine:d}){const p=N.useRef(null),m=N.useRef(null),v=N.useRef([]),x=N.useRef({active:!1,x:0,y:0,panX:0,panY:0}),[_,T]=N.useState({zoom:1.28,panX:0,panY:0}),[$,A]=N.useState(!1),[D,ne]=N.useState(null),[re,le]=N.useState(!0),te=N.useMemo(()=>{const ee=(o||[]).filter(X=>!(t!=null&&t.id)||Number(X.unit_id)===Number(t.id));return[...c!=null&&c.id?ee.filter(X=>Number(X.sector_id)===Number(c.id)):ee].sort((X,J)=>Number(X.id)-Number(J.id))},[o,t==null?void 0:t.id,c==null?void 0:c.id]),H=N.useMemo(()=>te.map((ee,ge)=>({...vc[ge]||{x:2.2+(ge-vc.length)%4*2.1,y:5.2+Math.floor((ge-vc.length)/4)*1.6,label:`POSTO ${String(ge+1).padStart(2,"0")}`,labelOffset:-6},machine:ee})),[te]);N.useEffect(()=>{const ee=setInterval(()=>le(ge=>!ge),700);return()=>clearInterval(ee)},[]);const de=N.useCallback(()=>{const ee=p.current;if(!ee)return;if(!m.current){const Y=document.createElement("canvas");Y.width=Yn*xo,Y.height=br*xo,m.current=Y}const ge=m.current,X=ge.getContext("2d");X.setTransform(xo,0,0,xo,0,0),X.imageSmoothingEnabled=!0,X.clearRect(0,0,Yn,br),qx(X),Yx(X),Qx(X),Kx(X),Xx(X),Jx(X),Zx(X),ey(X),ty(X);const J=[];H.forEach(Y=>{if(!Y.machine)return;const ke=!!(i!=null&&i.id)&&i.id===Y.machine.id,_e=!!D&&D===Y.machine.id;ry(X,Y,Y.machine,ke,_e,re);const xt=Ge(Y.x+.45,Y.y+.2,1.2);J.push({id:Y.machine.id,x:xt.sx-26,y:xt.sy-30,w:52,h:48})});const Ie=[];H.forEach(Y=>{if(!Y.machine)return;const ke=oy(X,Y,Y.machine,!!(i!=null&&i.id)&&i.id===Y.machine.id,Ie);ke&&J.push({id:Y.machine.id,x:ke.x-2,y:ke.y-2,w:ke.w+4,h:ke.h+4})}),v.current=J;const Ce=window.devicePixelRatio||1,Me=ee.clientWidth||Yn,ae=ee.clientHeight||br,F=Math.round(Me*Ce),Q=Math.round(ae*Ce);(ee.width!==F||ee.height!==Q)&&(ee.width=F,ee.height=Q);const O=ee.getContext("2d");O.imageSmoothingEnabled=!0,O.imageSmoothingQuality="high",O.setTransform(1,0,0,1,0,0),O.clearRect(0,0,F,Q);const I=Math.min(Me/Yn,ae/br)*_.zoom*Ce,K=Yn*I,G=br*I,ve=(F-K)/2+_.panX*Ce,xe=(Q-G)/2+_.panY*Ce;O.drawImage(ge,0,0,Yn*xo,br*xo,ve,xe,K,G),O.setTransform(Ce,0,0,Ce,0,0),O.imageSmoothingEnabled=!0,O.textBaseline="alphabetic",O.font='bold 11px "Courier New", monospace',O.fillStyle=Pe.ink;const Se=`${(t==null?void 0:t.code)||"USF"} // ${(c==null?void 0:c.name)||"VISÃO GERAL DA UNIDADE"}`;O.fillText(Se.toUpperCase(),16,26),O.font='9px "Courier New", monospace',O.fillStyle=Pe.inkSoft,O.fillText(`${te.length} ESTAÇÃO(ÕES) • PIXEL ART • CANVAS 2D`,16,40),sy(O,i,Me,ae)},[H,i,D,re,_,t==null?void 0:t.code,c==null?void 0:c.name,te.length]);N.useEffect(()=>{de()},[de]),N.useEffect(()=>{const ee=()=>de();return window.addEventListener("resize",ee),()=>window.removeEventListener("resize",ee)},[de]);const je=N.useCallback((ee,ge)=>{const X=p.current;if(!X)return null;const J=X.getBoundingClientRect(),Ie=J.width,Ce=J.height,ae=Math.min(Ie/Yn,Ce/br)*_.zoom,F=Yn*ae,Q=br*ae,O=(Ie-F)/2+_.panX,w=(Ce-Q)/2+_.panY;return{x:(ee-J.left-O)/ae,y:(ge-J.top-w)/ae}},[_]),ye=N.useCallback((ee,ge)=>{const X=je(ee,ge);if(!X)return null;const J=v.current.find(Ie=>X.x>=Ie.x&&X.x<=Ie.x+Ie.w&&X.y>=Ie.y&&X.y<=Ie.y+Ie.h);return(J==null?void 0:J.id)??null},[je]),he=ee=>{var ge,X;x.current={active:!0,x:ee.clientX,y:ee.clientY,panX:_.panX,panY:_.panY,moved:!1},A(!0),(X=(ge=ee.currentTarget).setPointerCapture)==null||X.call(ge,ee.pointerId)},U=ee=>{const ge=x.current;if(ge.active){const J=ee.clientX-ge.x,Ie=ee.clientY-ge.y;(Math.abs(J)>3||Math.abs(Ie)>3)&&(ge.moved=!0),T(Ce=>({...Ce,panX:ge.panX+J,panY:ge.panY+Ie}));return}const X=ye(ee.clientX,ee.clientY);ne(J=>J===X?J:X)},fe=ee=>{const ge=x.current;if(x.current={...ge,active:!1},A(!1),ge.moved)return;const X=ye(ee.clientX,ee.clientY);if(X&&d){const J=te.find(Ie=>Ie.id===X);J&&d(J)}},Ve=N.useCallback(ee=>{ee.preventDefault();const ge=ee.deltaY<0?1.12:.89;T(X=>({...X,zoom:Math.min(4,Math.max(.6,X.zoom*ge))}))},[]);return N.useEffect(()=>{const ee=p.current;if(ee)return ee.addEventListener("wheel",Ve,{passive:!1}),()=>ee.removeEventListener("wheel",Ve)},[Ve]),l.jsxs(iy,{children:[l.jsx(ly,{ref:p,$dragging:$,$hover:!!D,onPointerDown:he,onPointerMove:U,onPointerUp:fe,onPointerLeave:()=>{x.current={...x.current,active:!1},A(!1),ne(null)},onDoubleClick:()=>T({zoom:1.28,panX:0,panY:0}),title:D?"Clique para abrir o diagnóstico":"Arraste para mover • roda para zoom"}),l.jsxs(ay,{children:[l.jsxs("span",{children:[l.jsx(Di,{$color:Pn.NORMAL}),"ONLINE"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:Pn.WARNING}),"ATENÇÃO"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:Pn.CRITICAL}),"CRÍTICO"]}),l.jsxs("span",{children:[l.jsx(Di,{$color:Pn.OFFLINE}),"OFFLINE"]})]}),l.jsx(cy,{children:"ARRASTE • RODA = ZOOM • DUPLO CLIQUE = CENTRALIZAR"})]})}function Ne({size:t=15,strokeWidth:o=1.65,children:i,...c}){return l.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:o,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...c,children:i})}function Gc({size:t=24}){return l.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[l.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"6",fill:"#2D6A4F"}),l.jsx("path",{d:"M7.5 12.25H10.2L11.55 8.5L13.35 15.5L14.7 12.25H16.75",stroke:"#FFFFFF",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}function vp(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M12 5v14M5 12h14"})})}function bp(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 20h9"}),l.jsx("path",{d:"M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"})]})}function qc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 6h18"}),l.jsx("path",{d:"M8 6V4h8v2"}),l.jsx("path",{d:"M19 6l-1 14H6L5 6"}),l.jsx("path",{d:"M10 11v6M14 11v6"})]})}function Bi(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}function bc(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M6 9l6 6 6-6"})})}function Mh(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M15 18l-6-6 6-6"})})}function wp(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M9 18l6-6-6-6"})})}function dy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 12a9 9 0 1 0 3-6.7L3 8"}),l.jsx("path",{d:"M3 3v5h5"})]})}function fy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3v12"}),l.jsx("path",{d:"M7 10l5 5 5-5"}),l.jsx("path",{d:"M5 20h14"})]})}function Lh(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 16V7"}),l.jsx("path",{d:"M8.5 10.5L12 7l3.5 3.5"}),l.jsx("path",{d:"M20 16.5A4.5 4.5 0 0 0 17.5 8h-1.26A6.5 6.5 0 1 0 4 14.5"})]})}function py(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),l.jsx("path",{d:"M16 17l5-5-5-5"}),l.jsx("path",{d:"M21 12H9"})]})}function hy(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("path",{d:"M20 20l-3.5-3.5"})]})}function my(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"7"}),l.jsx("path",{d:"M12 2v3M12 19v3M2 12h3M19 12h3"})]})}function Co(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M6 9V3h12v6"}),l.jsx("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),l.jsx("rect",{x:"6",y:"14",width:"12",height:"7",rx:"1"})]})}function Yc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M21 12a9 9 0 0 0-15.5-6.3L3 8"}),l.jsx("path",{d:"M3 3v5h5"}),l.jsx("path",{d:"M3 12a9 9 0 0 0 15.5 6.3L21 16"}),l.jsx("path",{d:"M21 21v-5h-5"})]})}function gy(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M3 12h4l2.5-7 5 14 2.5-7h4"})})}function xy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M4 17l6-6-6-6"}),l.jsx("path",{d:"M12 19h8"})]})}function yy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M22 2L11 13"}),l.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]})}function gl(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),l.jsx("path",{d:"M12 9v4M12 17h.01"})]})}function vy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l9 4.5-9 4.5-9-4.5L12 3z"}),l.jsx("path",{d:"M3 12l9 4.5 9-4.5"}),l.jsx("path",{d:"M3 16.5L12 21l9-4.5"})]})}function by(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),l.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"currentColor",stroke:"none"})]})}function wy(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"}),l.jsx("path",{d:"M9 4v16"})]})}function Sy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"}),l.jsx("path",{d:"M12 12l8-4.5M12 12v9M12 12L4 7.5"})]})}function ky(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.2"})]})}function Cy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}function Ey(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"}),l.jsx("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"}),l.jsx("path",{d:"M14.12 14.12a3 3 0 1 1-4.24-4.24"}),l.jsx("path",{d:"M2 2l20 20"})]})}function jy(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),l.jsx("path",{d:"M9 12l2 2 4-4"})]})}function wc(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),l.jsx("path",{d:"M8 21h8M12 17v4"})]})}function Ui(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),l.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})}function Gn(t){return l.jsx(Ne,{...t,children:l.jsx("path",{d:"M20 6L9 17l-5-5"})})}function _y(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),l.jsx("circle",{cx:"12",cy:"10",r:"3"})]})}function Qc(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 2v10"}),l.jsx("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"})]})}function Ny(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M22 12H2"}),l.jsx("path",{d:"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}),l.jsx("circle",{cx:"6",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"}),l.jsx("circle",{cx:"10",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"})]})}function Ty(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M5 12.55a11 11 0 0 1 14.08 0"}),l.jsx("path",{d:"M8.53 16.11a6 6 0 0 1 6.95 0"}),l.jsx("circle",{cx:"12",cy:"19.5",r:"0.9",fill:"currentColor",stroke:"none"})]})}function Iy(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"2"}),l.jsx("rect",{x:"9.5",y:"9.5",width:"5",height:"5",rx:"0.5"}),l.jsx("path",{d:"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"})]})}function Ry(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"}),l.jsx("path",{d:"M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"})]})}function Sp(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 7v5l3 2"})]})}function $y(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"}),l.jsx("path",{d:"M9 4v14M15 6v14"})]})}function Ay(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"5",y:"4",width:"14",height:"17",rx:"2"}),l.jsx("path",{d:"M9 4V2.8A1 1 0 0 1 10 2h4a1 1 0 0 1 1 1V4"}),l.jsx("path",{d:"M9 10h6M9 14h6M9 18h4"})]})}function Py(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"}),l.jsx("path",{d:"M13.73 21a2 2 0 0 1-3.46 0"})]})}function My(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"3"}),l.jsx("path",{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"})]})}function Bv(t){return l.jsxs(Ne,{...t,children:[l.jsx("path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}),l.jsx("circle",{cx:"9",cy:"7",r:"4"}),l.jsx("path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}),l.jsx("path",{d:"M16 3.13a4 4 0 0 1 0 7.75"})]})}function Uv(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"7.5",cy:"15.5",r:"4.5"}),l.jsx("path",{d:"M21 2l-9.6 9.6"}),l.jsx("path",{d:"M15.5 7.5l3 3L22 7l-3-3"})]})}function Hv(t){return l.jsxs(Ne,{...t,children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M5.6 5.6l12.8 12.8"})]})}function Vv(t){return l.jsxs(Ne,{...t,children:[l.jsx("rect",{x:"4",y:"3",width:"16",height:"18",rx:"1.5"}),l.jsx("path",{d:"M9 21v-4h6v4"}),l.jsx("path",{d:"M8 7h1.5M14.5 7H16M8 11h1.5M14.5 11H16"})]})}const Ly=Sl`
  0% { stroke-dashoffset: 36; }
  100% { stroke-dashoffset: 0; }
`,Oy=E.div`
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
`,zy=E.section`
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
`,Fy=E.header`
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
`,Dy=E.div`
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
`,By=E.div`
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
`,Uy=E.div`
  display: grid;
  grid-template-columns: 164px 1fr 196px;
  align-items: center;
  gap: 0;

  @media (max-width: 1120px) {
    grid-template-columns: 146px 1fr 172px;
  }
`,Hy=E.div`
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
`,Vy=E.svg`
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
    animation: ${Ly} 3.2s linear infinite;
  }
`,Wy=E.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Sc=E.div`
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
`,Gy=E.div`
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
`,qy=E.main`
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
`,Yy=E.header`
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
`,Qy=E.div`
  width: 100%;
  max-width: 380px;
  margin: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`,Ky=E.div`
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
`,Xy=E.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,kp=E.div`
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
`,Jy=E.button`
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
`,Zy=E.div`
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
`;E.div`
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
`;const e1=E.footer`
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
`;function t1({onAuthenticated:t,sessionNotice:o=""}){const[i,c]=N.useState(""),[d,p]=N.useState(""),[m,v]=N.useState(!1),[x,_]=N.useState(!1),[T,$]=N.useState(""),[A,D]=N.useState("checking"),ne=!1;N.useEffect(()=>{let te=!0;const H=new AbortController;return fetch("/api/health",{signal:H.signal}).then(de=>de.ok?de.json():Promise.reject(new Error("HTTP"))).then(de=>{te&&D((de==null?void 0:de.status)==="ok"?"ok":"down")}).catch(()=>{te&&D("down")}),()=>{te=!1,H.abort()}},[]);async function re(te){te.preventDefault(),$("");const H=i.trim();if(!H||!d){$("Informe seu e-mail e senha para continuar.");return}_(!0);try{await t(H,d)}catch(de){$((de==null?void 0:de.message)||"Não foi possível autenticar. Verifique e-mail e senha.")}finally{_(!1)}}const le=A==="ok"?{color:"#2D6A4F",label:"Serviço Pulso RMM operacional"}:A==="down"?{color:"#C81E1E",label:"Servidor de API indisponível no momento"}:{color:"#7B857F",label:"Verificando disponibilidade da API..."};return l.jsxs(Oy,{children:[l.jsxs(zy,{"aria-label":"Visão geral do Pulso RMM",children:[l.jsxs(Fy,{children:[l.jsxs("div",{className:"brand-left",children:[l.jsx(Gc,{size:28}),l.jsx("span",{className:"brand-name",children:"Pulso RMM"})]}),l.jsx("span",{className:"brand-org",children:"Monitoramento & Gestão de Estações"})]}),l.jsxs(Dy,{children:[l.jsxs("h1",{children:["Monitoramento de estações em tempo real."," ",l.jsx("span",{className:"muted",children:"Inventário, telemetria e suporte remoto."})]}),l.jsxs(By,{role:"img","aria-label":"Esquema da arquitetura de telemetria entre a central Pulso RMM e estações monitoradas",children:[l.jsxs("div",{className:"topo-head",children:[l.jsx("span",{children:"Arquitetura de comunicação autenticada"}),l.jsx("span",{className:"topo-proto",children:"HMAC-SHA256 · OTA"})]}),l.jsxs(Uy,{children:[l.jsxs(Hy,{children:[l.jsx("span",{className:"hub-icon",children:l.jsx(jy,{size:17})}),l.jsx("div",{className:"hub-title",children:"Central TI"}),l.jsx("div",{className:"hub-sub",children:"API · Socket.io"})]}),l.jsxs(Vy,{viewBox:"0 0 180 156",preserveAspectRatio:"none","aria-hidden":"true",children:[l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"base-line",d:"M 0 78 L 180 78"}),l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 130, 180 130"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 L 180 78",style:{animationDelay:"0.9s"}}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 130, 180 130",style:{animationDelay:"1.8s"}})]}),l.jsxs(Wy,{children:[l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Recepção"})]}),l.jsx("span",{className:"ep-tag",children:"REC"})]}),l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Consultórios"})]}),l.jsx("span",{className:"ep-tag",children:"CONS"})]}),l.jsxs(Sc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(wc,{size:14})}),l.jsx("span",{children:"Farmácia"})]}),l.jsx("span",{className:"ep-tag",children:"FARM"})]})]})]})]})]}),l.jsxs(Gy,{children:[l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Telemetria contínua"}),l.jsx("span",{className:"p-desc",children:"Agente Windows nativo em segundo plano sem interromper o atendimento."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Manutenção homologada"}),l.jsx("span",{className:"p-desc",children:"Catálogo de tarefas assinadas por estação e atualizações SHA-256."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Auditoria e LGPD"}),l.jsx("span",{className:"p-desc",children:"Controle por perfil técnico com registro completo das operações."})]})]})]}),l.jsxs(qy,{"aria-label":"Autenticação do painel Pulso RMM",children:[l.jsxs(Yy,{children:[l.jsx(Gc,{size:28}),l.jsxs("div",{children:[l.jsx("div",{className:"m-title",children:"Pulso RMM"}),l.jsx("div",{className:"m-sub",children:"Monitoramento & Gestão de Estações"})]})]}),l.jsxs(Qy,{children:[l.jsxs(Ky,{children:[l.jsx("h2",{children:"Entrar no painel"}),l.jsx("p",{children:"Use sua conta autorizada pela equipe de TI."})]}),(T||o)&&l.jsxs(Zy,{role:"alert",children:[l.jsx("span",{className:"err-icon",children:l.jsx(gl,{size:16})}),l.jsx("span",{children:T||o})]}),l.jsxs(Xy,{onSubmit:re,noValidate:!0,children:[l.jsxs(kp,{children:[l.jsx("label",{htmlFor:"rmm-login-email",children:"E-mail"}),l.jsx("div",{className:"input-box",children:l.jsx("input",{id:"rmm-login-email",type:"email",autoComplete:"username",placeholder:"nome@dominio.com",value:i,onChange:te=>c(te.target.value),disabled:x,required:!0})})]}),l.jsxs(kp,{$hasToggle:!0,children:[l.jsx("label",{htmlFor:"rmm-login-password",children:"Senha"}),l.jsxs("div",{className:"input-box",children:[l.jsx("input",{id:"rmm-login-password",type:m?"text":"password",autoComplete:"current-password",placeholder:"Digite sua senha",value:d,onChange:te=>p(te.target.value),disabled:x,required:!0}),l.jsx("button",{type:"button",className:"pw-toggle",onClick:()=>v(te=>!te),"aria-label":m?"Ocultar senha":"Exibir senha","aria-pressed":m,disabled:x,children:m?l.jsx(Ey,{size:17}):l.jsx(Cy,{size:17})})]})]}),l.jsx(Jy,{type:"submit",disabled:x,children:x?"Validando credenciais...":"Entrar no painel"})]}),ne]}),l.jsxs(e1,{children:[l.jsxs("div",{className:"health-row",children:[l.jsx("span",{className:"health-dot",style:{background:le.color}}),l.jsx("span",{children:le.label})]}),l.jsx("p",{className:"audit-line",children:"Sessões, comandos remotos e alterações de infraestrutura são registrados em trilha de auditoria conforme a LGPD."})]})]})]})}const n1={B:{id:"B",name:"Institucional Sereno",tagline:"Porcelanato claro, azul institucional e verde vivo",swatches:["#F6F8F3","#CFE3DC","#2E8B74","#1F5F8B"],room:{wallColor:"#F6F8F3",wallCapColor:"#2E6B7A",baseboardColor:"#2C5F73",accentColor:"#E4A11B",floorType:"porcelain",rugColor:"#6FA88F",rugBorderColor:"#EAF2EC",hasRug:!1,rugSize:[2.4,1.5],rugPos:[.5,0,-.2]},lighting:{background:"#E9F0EA",ambient:{intensity:.42,color:"#FFFFFF"},hemisphere:{sky:"#F7FBFF",ground:"#D6E4DC",intensity:.34},key:{intensity:2.15,color:"#FFF6E6"},fill:{intensity:.26,color:"#DCEBF2"}}}};function r1(){return n1.B}const Cp=[{id:"DIAG",label:"Diagnóstico"},{id:"MAINT",label:"Manutenção"},{id:"SYSTEM",label:"Sistema e periféricos"}],o1={SYNC_TELEMETRY_NOW:{group:"DIAG",label:"Coletar telemetria",subtitle:"Atualiza CPU, RAM, disco e temperatura",Icon:gy},COLLECT_NETWORK_DIAG:{group:"DIAG",label:"Diagnóstico de rede",subtitle:"IPv4, gateway, DNS e latência local",Icon:Ty},CHECK_DISK_HEALTH:{group:"DIAG",label:"Saúde do disco",subtitle:"Integridade física SMART e volume C:",Icon:Ny},LIST_TOP_PROCESSES:{group:"DIAG",label:"Top processos",subtitle:"Processos com maior uso de CPU e RAM",Icon:Iy},RESTART_SPOOLER:{group:"MAINT",label:"Reiniciar spooler",subtitle:"Destrava o serviço e a fila de impressão",Icon:Co},CLEAR_TEMP_CACHE:{group:"MAINT",label:"Limpar temporários",subtitle:"Remove cache obsoleto sem tocar arquivos",Icon:Ry},FLUSH_DNS_WINSOCK:{group:"MAINT",label:"Limpar cache DNS",subtitle:"Renova a tabela de resolução de nomes",Icon:Yc},UPDATE_AGENT:{group:"SYSTEM",label:"Atualizar agente (OTA)",subtitle:"Baixa, valida SHA-256 e atualiza em silêncio",Icon:Lh},INSTALL_APPROVED_PRINTER:{group:"SYSTEM",label:"Instalar impressora",subtitle:"Mapeia impressora de rede homologada",Icon:Co},REBOOT_WORKSTATION:{group:"SYSTEM",label:"Reiniciar estação",subtitle:"Aviso de 30s na tela antes de reiniciar",Icon:Qc}};function hs(t){const o=o1[t==null?void 0:t.code];return o||{group:(t==null?void 0:t.riskLevel)==="HIGH"?"SYSTEM":"MAINT",label:me((t==null?void 0:t.title)||(t==null?void 0:t.code)||"Tarefa remota"),subtitle:me((t==null?void 0:t.description)||"Comando remoto homologado"),Icon:xy}}const s1=Sl`
  from { opacity: 0; }
  to { opacity: 1; }
`,i1=Sl`
  from { opacity: 0; transform: translateY(8px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`,pu=Sl`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
`,l1={NORMAL:"Online",WARNING:"Atenção",CRITICAL:"Crítico",OFFLINE:"Offline"};function Ep(t){const o=String(t||"2.3.0").trim(),i=o.match(/(\d+\.\d+(?:\.\d+)?)/);return i?`v${i[1]}`:`v${o}`}function Hi(t,o=80,i=92){return t>=i?ie.colors.status.CRITICAL:t>=o?ie.colors.status.WARNING:ie.colors.textPrimary}function Vi(t,o=80,i=92,c=ie.colors.brandPrimary){return t>=i?ie.colors.status.CRITICAL:t>=o?ie.colors.status.WARNING:c}const jp=E.aside`
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
`,_p=E.header`
  flex-shrink: 0;
  padding: 11px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,a1=E.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`,c1=E.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`,Np=E.span`
  font-family: ${({theme:t})=>t.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({theme:t})=>t.colors.textSecondary};
  white-space: nowrap;
`,Tp=E.span`
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
`,u1=E.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
`,Fr=E.button`
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
`,Ip=E.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({theme:t})=>t.colors.textPrimary};
  line-height: 1.18;
  word-break: break-word;
`,Rp=E.div`
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
`,d1=E.button`
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
`,f1=E.select`
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
`,p1=E.div`
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
`,h1=E.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 16px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
`,kc=E.button`
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
`,m1=E.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Cc=E.footer`
  flex-shrink: 0;
  padding: 8px 16px 10px;
  border-top: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurface};
`,g1=E.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-bottom: 9px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};
`,Wi=E.div`
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
`,x1=E.div`
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
`,y1=E.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`,wr=E.div`
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
`,Ec=E.button`
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
`,v1=E.div`
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
`,b1=E.button`
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
`,w1=E.div`
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
`,S1=E.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`,$p=E.button`
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
`,k1=E.section`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,C1=E.div`
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
`,E1=E.div`
  display: flex;
  flex-direction: column;
`,j1=E.button`
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
`,_1=E.div`
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
`,N1=E.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
`,T1=E.div`
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
`,I1=E.div`
  display: flex;
  flex-direction: column;
  align-items: ${({$fromTi:t})=>t?"flex-end":"flex-start"};
`,R1=E.div`
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
`,$1=E.form`
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
`,Gi=E.div`
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
`,qi=E.div`
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
`,Yi=E.div`
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
`,Qi=E.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({$tone:t,theme:o})=>t==="danger"?"rgba(200, 30, 30, 0.09)":t==="warning"?"rgba(180, 83, 9, 0.1)":o.colors.brandPrimarySubtle};
  color: ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:t==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
`,A1=E.ol`
  list-style: none;
  margin: 0;
  padding: 9px 12px;
  border-radius: 9px;
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`,jc=E.li`
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
`,Ap=E.div`
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
`,Pp=E.div`
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
`,P1=E.dl`
  margin: 0;
  padding: 4px 14px;
  border-radius: 9px;
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  max-height: 260px;
  overflow-y: auto;
`,M1=E.div`
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
`,L1=E.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 260px;
  overflow-y: auto;
`,O1=E.label`
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
`,_c=E.div`
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid
    ${({$tone:t,theme:o})=>t==="danger"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  background: ${({$tone:t})=>t==="danger"?"rgba(200, 30, 30, 0.06)":"rgba(180, 83, 9, 0.07)"};
  color: ${({$tone:t})=>t==="danger"?"#991B1B":"#92400E"};
  font-size: 0.79rem;
  line-height: 1.48;
`,Ki=E.div`
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
`,qn=E.button`
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
`;function ms(t,o=!0){const i=Math.max(0,Math.floor(Number(t||0)));if(i<60)return`${i}s`;const c=Math.floor(i/60),d=i%60;if(c<60)return o&&d>0?`${c}m ${d}s`:`${c} min`;const p=Math.floor(c/60),m=c%60;if(p<24)return m>0?`${p}h ${m}m`:`${p}h`;const v=Math.floor(p/24),x=p%24;return x>0?`${v}d ${x}h`:`${v} dia(s)`}function z1(t){const o=me(t||"").trim();if(!o)return{structured:!1,items:[],message:""};const i=o.split("|").map(p=>p.trim()).filter(Boolean),c=[];let d=i.length>=2;for(const p of i){const m=p.indexOf(":");m>0&&m<36&&m<p.length-1?c.push({label:p.slice(0,m).trim(),value:p.slice(m+1).trim()}):d=!1}return d&&c.length>=2?{structured:!0,items:c,message:o}:{structured:!1,items:[],message:o}}function Mp(t){return t==="FAILED"?{label:"Falha",tone:"danger",color:ie.colors.status.CRITICAL,bg:ie.colors.statusBg.CRITICAL,lead:"A tarefa retornou erro durante a execução"}:t==="EXPIRED"?{label:"Expirado",tone:"danger",color:ie.colors.status.CRITICAL,bg:ie.colors.statusBg.CRITICAL,lead:"Tempo limite atingido sem resposta do agente"}:t==="RUNNING"?{label:"Executando",tone:"brand",color:ie.colors.brandPrimary,bg:"rgba(45, 106, 79, 0.1)",lead:"Enviando ordem assinada ao agente Windows"}:t==="DISPATCHED"||t==="PENDING"?{label:"Na fila do agente",tone:"warning",color:ie.colors.status.WARNING,bg:ie.colors.statusBg.WARNING,lead:"Aguardando retorno real do equipamento"}:{label:"Concluído",tone:"ok",color:ie.colors.status.NORMAL,bg:ie.colors.statusBg.NORMAL,lead:"Execução concluída com sucesso"}}function F1({telemetryHistory:t=[]}){const o=Array.isArray(t)&&t.length>=2,{cpuPath:i,cpuAreaPath:c,ramPath:d,lastCpuPt:p}=N.useMemo(()=>{if(!o)return{cpuPath:"",cpuAreaPath:"",ramPath:"",lastCpuPt:null};const m=t.slice(0,14).reverse(),v=400,x=36,_=(v-6)/Math.max(1,m.length-1),T=le=>m.map((te,H)=>{const de=Math.min(100,Math.max(0,Number(te[le]||0)));return{x:Number((H*_+2).toFixed(1)),y:Number((x-de/100*(x-8)-4).toFixed(1))}}),$=T("cpu_usage_pct"),A=T("ram_usage_pct"),D=le=>le.map((te,H)=>`${H===0?"M":"L"}${te.x},${te.y}`).join(" "),ne=D($),re=`${ne} L${$[$.length-1].x},${x} L${$[0].x},${x} Z`;return{cpuPath:ne,cpuAreaPath:re,ramPath:D(A),lastCpuPt:$[$.length-1]}},[o,t]);return l.jsxs(x1,{children:[l.jsxs("div",{className:"spark-head",children:[l.jsxs("span",{children:["Histórico de uso (",t.length,")"]}),l.jsxs("div",{className:"spark-legend",children:[l.jsxs("span",{children:[l.jsx("i",{style:{background:ie.colors.brandPrimary}})," CPU"]}),l.jsxs("span",{children:[l.jsx("i",{style:{background:ie.colors.status.OFFLINE}})," RAM"]})]})]}),o?l.jsxs("svg",{width:"100%",height:"36",viewBox:"0 0 400 36",preserveAspectRatio:"xMidYMid meet",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:"pulsoCpuGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:"#2D6A4F",stopOpacity:"0.2"}),l.jsx("stop",{offset:"100%",stopColor:"#2D6A4F",stopOpacity:"0.01"})]})}),l.jsx("line",{x1:"0",y1:"12",x2:"400",y2:"12",stroke:"rgba(30,36,32,0.06)"}),l.jsx("line",{x1:"0",y1:"24",x2:"400",y2:"24",stroke:"rgba(30,36,32,0.06)"}),l.jsx("path",{d:c,fill:"url(#pulsoCpuGrad)"}),l.jsx("path",{d,fill:"none",stroke:"#64748B",strokeWidth:"1.4",strokeDasharray:"3 2"}),l.jsx("path",{d:i,fill:"none",stroke:"#2D6A4F",strokeWidth:"1.9"}),p&&l.jsx("circle",{cx:p.x,cy:p.y,r:"3",fill:"#2D6A4F"})]}):l.jsx("span",{className:"spark-empty",children:"Aguardando ao menos 2 leituras reais para traçar a série temporal."})]})}function D1({diagnostics:t,units:o=[],chatMessages:i=[],taskCatalog:c=[],currentUser:d,onDispatchTask:p,onLoadPrinters:m,onRefreshTelemetryNow:v,onUpdateMachineAgent:x,onSendMessage:_,onUpdateLocation:T,onDeleteMachine:$,onFocusCamera:A}){var er,On;const[D,ne]=N.useState(null),[re,le]=N.useState(!1),[te,H]=N.useState(""),[de,je]=N.useState(!1),[ye,he]=N.useState(null),[U,fe]=N.useState(null),[Ve,ee]=N.useState(null),[ge,X]=N.useState("ALL"),[J,Ie]=N.useState(!1),[Ce,Me]=N.useState("DIAG"),[ae,F]=N.useState(!1),[Q,O]=N.useState(null),[w,I]=N.useState(Date.now()),[K,G]=N.useState(null),[ve,xe]=N.useState({open:!1,task:null}),[Se,Y]=N.useState(!1),ke=N.useRef(null),_e=N.useRef(null),xt=N.useRef(0),Ot=N.useRef(0);function Et(){Ot.current=xt.current,fe(null)}N.useEffect(()=>{const M=setInterval(()=>I(Date.now()),1e3);return()=>clearInterval(M)},[]),N.useEffect(()=>()=>{_e.current&&clearTimeout(_e.current)},[]);const Tt=!!(U||K!=null&&K.open||ve.open||Se);N.useEffect(()=>{if(!Tt)return;function M(g){g.key==="Escape"&&(U?Et():K!=null&&K.open?G(null):ve.open?xe({open:!1,task:null}):Se&&Y(!1))}return window.addEventListener("keydown",M),()=>window.removeEventListener("keydown",M)},[Tt,U,K==null?void 0:K.open,ve.open,Se]),N.useEffect(()=>{Ce==="CHAT"&&ke.current&&(ke.current.scrollTop=ke.current.scrollHeight)},[i.length,Ce]);const pn=((er=t==null?void 0:t.machine)==null?void 0:er.id)||null;N.useEffect(()=>{F(!1),ee(null)},[pn]);const De=((On=t==null?void 0:t.tasks)==null?void 0:On[0])||null;N.useEffect(()=>{if(!(!De||!U)&&(U.taskId===De.task_id||U.taskCode===De.task_code&&U.status==="RUNNING")&&De.output_summary){const M={...U,taskId:De.task_id,status:De.status||"COMPLETED",summary:me(De.output_summary),timestamp:new Date(De.completed_at||De.issued_at||Date.now()).toLocaleTimeString("pt-BR")};fe(M),ee(M),he({type:"ok",text:`${U.title}: ${me(De.output_summary)}`})}},[De==null?void 0:De.task_id,De==null?void 0:De.status,De==null?void 0:De.output_summary]);function It(M,g){var j;const R=String(g||"").trim();R&&((j=navigator==null?void 0:navigator.clipboard)!=null&&j.writeText&&navigator.clipboard.writeText(R).catch(()=>{}),O(M),_e.current&&clearTimeout(_e.current),_e.current=setTimeout(()=>O(null),1800))}const V=(t==null?void 0:t.machine)||null;if(!V)return l.jsx(jp,{$collapsed:J,"aria-label":"Painel de diagnóstico da estação",children:l.jsxs(_p,{style:{borderBottom:"none"},children:[l.jsx(Np,{children:"Aguardando agentes"}),l.jsx(Ip,{children:"Nenhuma estação selecionada"}),l.jsx(Rp,{children:l.jsx("span",{className:"loc-text",style:{whiteSpace:"normal"},children:"Clique em um equipamento na maquete ou instale o Agente Windows para iniciar o monitoramento."})})]})});const{tasks:Bt=[],telemetry:yt=[],telemetryHistory:pt=[]}=t,vt=yt.length>0?yt:pt,Re=vt[0]||null,Ke=Number(V.cpu_usage_pct)>0?Number(V.cpu_usage_pct):Number((Re==null?void 0:Re.cpu_usage_pct)||0),ze=Number(V.ram_usage_pct)>0?Number(V.ram_usage_pct):Number((Re==null?void 0:Re.ram_usage_pct)||0),Rt=Number(V.disk_usage_pct)>0?Number(V.disk_usage_pct):Number((Re==null?void 0:Re.disk_usage_pct)||0),tt=Number(V.temperature_c)>0?Number(V.temperature_c):Number((Re==null?void 0:Re.temperature_c)||0),hn=ie.colors.status[V.health_status]||ie.colors.status.NORMAL,En=ie.colors.statusBg[V.health_status]||"rgba(30, 36, 32, 0.06)",at=Math.max(0,Number(V.idle_seconds||0)),Ut=V.health_status==="OFFLINE",q=V.last_seen_at?Math.max(0,Math.floor((w-new Date(V.last_seen_at).getTime())/1e3)):0,ot=V.last_seen_at?Math.max(0,Math.floor((w-new Date(V.last_seen_at).getTime())/1e3)):0,tn=!Ut&&at>0?at+Math.min(ot,3):at,Ro=vh(V.agent_version,"2.3.0"),Xn=ms(V.uptime_seconds||0,!1),nn=Ut?q>=86400?{badge:"Inativo >24h",alertIcon:!0,color:ie.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Desligado há ${ms(q)}`}:{badge:"Offline",alertIcon:!1,color:ie.colors.status.OFFLINE,bg:ie.colors.bgSurfaceSubtle,headline:`Desligado há ${ms(q)}`}:tn>=86400?{badge:"Inativo >24h",alertIcon:!0,color:ie.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Sem interação há ${ms(tn)}`}:Ro?{badge:Ep(V.agent_version||"2.2.0"),alertIcon:!1,color:ie.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.07)",headline:"Agente desatualizado · atualização recomendada"}:tn<180?{badge:`Ligado ${Xn}`,alertIcon:!1,color:ie.colors.status.NORMAL,bg:ie.colors.bgSurfaceSubtle,headline:"Em uso ativo agora"}:{badge:`Ligado ${Xn}`,alertIcon:!1,color:ie.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.06)",headline:`Ocioso há ${ms(tn)}`};async function Jn(){le(!0),he(null);try{const M=await v(V.id);he({type:"ok",text:M.message||"Telemetria atualizada em tempo real."})}catch(M){he({type:"err",text:`Falha na coleta: ${M.message}`})}finally{le(!1)}}async function Zn(M){if(M.preventDefault(),!(!te.trim()||!_)){je(!0);try{await _(V.id,te.trim()),he({type:"ok",text:`Mensagem enviada para ${V.hostname}.`}),H("")}catch(g){he({type:"err",text:`Falha ao enviar mensagem: ${g.message}`})}finally{je(!1)}}}async function Er(M){const g=M.target.value;if(!g||!T)return;const[R,j]=g.split(":").map(Number);if(!(!R||!j))try{await T(V.id,{unitId:R,sectorId:j}),F(!1),he({type:"ok",text:"Localização da estação atualizada."})}catch(P){he({type:"err",text:`Erro ao mover estação: ${P.message}`})}}async function jn(M){if(M.code==="INSTALL_APPROVED_PRINTER"){Vr(M);return}if(M.code==="REBOOT_WORKSTATION"){xe({open:!0,task:M});return}await Qt(M)}async function Qt(M,g={}){var Te,bt;const j=hs(M).label||me(M.title),P=++xt.current,Z=$e=>{ee($e),Ot.current!==P&&fe($e)};ne(M.code),he({type:"busy",text:`Executando "${j}" em ${V.hostname}...`});const Oe={taskId:null,taskCode:M.code,title:j,status:"RUNNING",summary:`Enviando "${j}" para o Agente Windows (${V.ip_address})...`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:M,paramsRef:g};fe(Oe),ee(Oe);try{if(M.code==="SYNC_TELEMETRY_NOW"&&v){const wt=await v(V.id),rn=`Estação: ${V.hostname} | IPv4: ${V.ip_address} | CPU: ${Ke.toFixed(1)}% | RAM: ${ze.toFixed(1)}% | Disco: ${Rt.toFixed(1)}% | Temperatura: ${tt>0?`${tt.toFixed(1)}°C`:"N/D"}`;he({type:"ok",text:wt.message||rn}),Z({taskId:`sync_${Date.now().toString().slice(-5)}`,taskCode:M.code,title:j,status:"COMPLETED",summary:rn,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:M,paramsRef:g});return}if(M.code==="UPDATE_AGENT"&&x){const rn=(await x(V.id)).message||"Atualização OTA silenciosa despachada para o computador.";he({type:"ok",text:`${j}: ${rn}`}),Z({taskId:`ota_${Date.now().toString().slice(-5)}`,taskCode:M.code,title:j,status:"COMPLETED",summary:rn,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:M,paramsRef:g});return}const $e=await p({machineId:V.id,taskCode:M.code,parameters:g}),jt=((Te=$e==null?void 0:$e.task)==null?void 0:Te.status)||"DISPATCHED",_n=jt==="DISPATCHED"||jt==="PENDING";he({type:_n?"busy":jt==="FAILED"?"err":"ok",text:_n?`Ordem enfileirada para ${V.hostname} (aguardando execução real do agente).`:`Retorno de ${V.hostname}: ${me(((bt=$e==null?void 0:$e.task)==null?void 0:bt.output_summary)||jt)}`}),$e!=null&&$e.task&&Z({taskId:$e.task.task_id,taskCode:$e.task.task_code,title:j,status:jt,summary:me($e.task.output_summary)||"Ordem autenticada na fila do Agente Windows. O retorno real aparecerá automaticamente assim que a estação concluir a tarefa (TTL 120s).",timestamp:new Date($e.task.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:M,paramsRef:g})}catch($e){he({type:"err",text:`Falha: ${$e.message}`}),Z({taskId:null,taskCode:M.code,title:j,status:"FAILED",summary:`Erro ao despachar comando: ${$e.message}`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:M,paramsRef:g})}finally{ne(null)}}async function Vr(M){G({open:!0,task:M,loading:!0,printers:[],selectedId:null,error:null});try{const g=m?await m(V.unit_id,V.id):[];G(R=>{var j;return R&&{...R,loading:!1,printers:g,selectedId:((j=g[0])==null?void 0:j.id)??null,error:g.length?null:"Nenhuma impressora encontrada na rede desta estação. Verifique se o agente já enviou um heartbeat com a descoberta."}})}catch(g){const R=String((g==null?void 0:g.message)||""),j=/Rota n[ãa]o encontrada|404/i.test(R);G(P=>P&&{...P,loading:!1,error:j?"Servidor desatualizado: a rota /api/printers não existe no backend em execução.":`Falha ao carregar impressoras: ${R}`})}}async function Wr(){if(!K)return;const M=K.printers.find(R=>R.id===K.selectedId);if(!M)return;const g=K.task;G(null),await Qt(g,{printer_ip:M.ip_address,printer_name:M.name})}async function Gr(){const M=ve.task;xe({open:!1,task:null}),M&&await Qt(M)}const jr=o.length>0&&!!T&&(d==null?void 0:d.role)!=="VIEWER";return l.jsxs(l.Fragment,{children:[l.jsxs(jp,{$collapsed:J,"aria-label":"Painel inspetor do computador",children:[l.jsxs(_p,{children:[l.jsxs(a1,{children:[l.jsxs(c1,{children:[l.jsxs(Np,{children:["#",V.id," · ",Ep(V.agent_version)]}),l.jsxs(Tp,{$color:hn,$bgColor:En,children:[l.jsx("span",{className:"dot"}),l1[V.health_status]||V.health_status]})]}),l.jsxs(u1,{children:[l.jsx(Fr,{type:"button",onClick:A,title:"Focar câmera nesta estação","aria-label":"Focar câmera nesta estação",children:l.jsx(my,{size:15})}),l.jsx(Fr,{type:"button",onClick:()=>Ie(M=>!M),title:J?"Expandir painel":"Recolher painel","aria-label":J?"Expandir painel":"Recolher painel",children:J?l.jsx(Mh,{size:15}):l.jsx(wp,{size:15})}),$&&(d==null?void 0:d.role)!=="VIEWER"&&l.jsx(Fr,{type:"button",$danger:!0,onClick:()=>Y(!0),title:"Remover equipamento do painel","aria-label":"Remover equipamento do painel",children:l.jsx(qc,{size:15})})]})]}),l.jsxs("div",{children:[l.jsx(Ip,{children:me(V.hostname)}),l.jsxs(Rp,{children:[l.jsxs("span",{className:"loc-text",title:`${me(V.unit_name)} · ${me(V.sector_name)}`,children:[me(V.unit_name)," · ",me(V.sector_name)]}),jr&&!J&&l.jsxs(d1,{type:"button",$open:ae,onClick:()=>F(M=>!M),"aria-expanded":ae,title:"Mover estação para outra unidade ou setor",children:[l.jsx(_y,{size:11}),l.jsx("span",{children:ae?"Fechar":"Mover"})]})]})]}),ae&&jr&&!J&&l.jsx(f1,{"aria-label":"Selecionar nova unidade e setor da estação",value:`${V.unit_id}:${V.sector_id}`,onChange:Er,children:o.map(M=>(M.sectors||[]).map(g=>l.jsxs("option",{value:`${M.id}:${g.id}`,children:[me(M.name)," — ",me(g.name)]},`${M.id}:${g.id}`)))}),l.jsxs(p1,{$bg:nn.bg,$color:nn.color,children:[l.jsxs("span",{className:"act-left",children:[l.jsx("span",{className:"act-dot"}),l.jsx("span",{className:"act-headline",children:nn.headline})]}),l.jsxs("span",{className:"act-right",children:[nn.alertIcon&&l.jsx(gl,{size:12}),l.jsx("span",{children:nn.badge})]})]})]}),!J&&l.jsxs(h1,{role:"tablist","aria-label":"Abas do inspetor de estação",children:[l.jsx(kc,{type:"button",role:"tab","aria-selected":Ce==="DIAG",$active:Ce==="DIAG",onClick:()=>Me("DIAG"),children:l.jsx("span",{children:"Visão geral"})}),l.jsxs(kc,{type:"button",role:"tab","aria-selected":Ce==="ACTIONS",$active:Ce==="ACTIONS",onClick:()=>Me("ACTIONS"),children:[l.jsx("span",{children:"Ações"}),l.jsx("span",{className:"tab-count",children:c.length})]}),_&&l.jsxs(kc,{type:"button",role:"tab","aria-selected":Ce==="CHAT",$active:Ce==="CHAT",$highlight:i.length>0,onClick:()=>Me("CHAT"),children:[l.jsx("span",{children:"Chat"}),l.jsx("span",{className:"tab-count",children:i.length})]})]}),l.jsxs(m1,{ref:Ce==="CHAT"?ke:null,children:[(J||Ce==="DIAG")&&l.jsxs(l.Fragment,{children:[l.jsxs(g1,{children:[l.jsxs(Wi,{$tone:Hi(Ke,80,92),children:[l.jsx("span",{className:"m-lbl",children:"CPU"}),l.jsxs("span",{className:"m-val",children:[Ke.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,Ke)}%`,background:Vi(Ke,80,92)}})})]}),l.jsxs(Wi,{$tone:Hi(ze,80,92),children:[l.jsx("span",{className:"m-lbl",children:"RAM"}),l.jsxs("span",{className:"m-val",children:[ze.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,ze)}%`,background:Vi(ze,80,92,ie.colors.brandPrimaryLight)}})})]}),l.jsxs(Wi,{$tone:Hi(Rt,82,92),children:[l.jsx("span",{className:"m-lbl",children:"Disco"}),l.jsxs("span",{className:"m-val",children:[Rt.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,Rt)}%`,background:Vi(Rt,82,92,ie.colors.status.OFFLINE)}})})]}),l.jsxs(Wi,{$tone:tt>0?Hi(tt,75,85):ie.colors.textMuted,children:[l.jsx("span",{className:"m-lbl",children:"Temp."}),l.jsx("span",{className:"m-val",children:tt>0?`${tt.toFixed(0)}°C`:"N/D"}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${tt>0?Math.min(100,tt/95*100):0}%`,background:Vi(tt,75,85,ie.colors.brandPrimaryLight)}})})]})]}),Ut&&l.jsxs(v1,{children:[l.jsx("strong",{children:"Equipamento desconectado."})," Último contato em"," ",V.last_seen_at?new Date(V.last_seen_at).toLocaleString("pt-BR"):"horário anterior","."]}),!J&&l.jsxs(l.Fragment,{children:[l.jsx(F1,{telemetryHistory:vt}),l.jsxs(y1,{children:[l.jsxs(wr,{children:[l.jsx("dt",{children:"Endereço IP"}),l.jsx("dd",{className:"mono",children:l.jsxs(Ec,{type:"button",$copied:Q==="ip",onClick:()=>It("ip",V.ip_address),title:"Copiar endereço IPv4",children:[l.jsx("span",{children:V.ip_address||"0.0.0.0"}),l.jsx("span",{className:"copy-ico",children:Q==="ip"?l.jsx(Gn,{size:13}):l.jsx(Ui,{size:12})})]})})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Endereço MAC"}),l.jsx("dd",{className:"mono",children:V.mac_address?l.jsxs(Ec,{type:"button",$copied:Q==="mac",onClick:()=>It("mac",V.mac_address),title:"Copiar endereço MAC",children:[l.jsx("span",{children:V.mac_address}),l.jsx("span",{className:"copy-ico",children:Q==="mac"?l.jsx(Gn,{size:13}):l.jsx(Ui,{size:12})})]}):l.jsx("span",{style:{color:ie.colors.textMuted},children:"Não informado"})})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Spooler de impressão"}),l.jsxs("dd",{style:{color:V.spooler_running?ie.colors.status.NORMAL:ie.colors.status.CRITICAL},children:[l.jsx(Co,{size:13}),l.jsx("span",{children:V.spooler_running?"Ativo":"Parado"})]})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Equipamento"}),l.jsxs("dd",{children:[me(V.manufacturer||"N/D")," ",me(V.model||"")]})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Serial"}),l.jsx("dd",{className:"mono",children:V.serial_number?l.jsxs(Ec,{type:"button",$copied:Q==="serial",onClick:()=>It("serial",V.serial_number),title:`Copiar serial (confiança ${V.identity_confidence||"LOW"})`,children:[l.jsx("span",{children:V.serial_number}),l.jsx("span",{style:{color:ie.colors.textMuted,fontSize:"0.68rem"},children:V.identity_confidence||"LOW"}),l.jsx("span",{className:"copy-ico",children:Q==="serial"?l.jsx(Gn,{size:13}):l.jsx(Ui,{size:12})})]}):l.jsx("span",{style:{color:ie.colors.textMuted},children:"Não informado"})})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Processador"}),l.jsx("dd",{children:me(V.cpu_model||V.processor||"Não informado")})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Memória e disco"}),l.jsxs("dd",{className:"mono",children:[(Number(V.ram_total_mb||8192)/1024).toFixed(0)," GB ·"," ",V.disk_total_gb||0," GB ",V.disk_type||"N/D"]})]}),l.jsxs(wr,{children:[l.jsx("dt",{children:"Sistema"}),l.jsx("dd",{children:me(V.os_version||"Windows")})]})]})]})]}),!J&&Ce==="ACTIONS"&&(()=>{const M=Cp.map(g=>({...g,items:c.filter(R=>hs(R).group===g.id)})).filter(g=>g.items.length>0&&(ge==="ALL"||ge===g.id));return l.jsxs(l.Fragment,{children:[l.jsxs(w1,{children:[l.jsx("span",{children:"Catálogo homologado"}),l.jsx("span",{className:"lead-meta",children:"HMAC-SHA256"})]}),l.jsxs(S1,{role:"group","aria-label":"Filtrar ações por categoria",children:[l.jsxs($p,{type:"button",$active:ge==="ALL",onClick:()=>X("ALL"),children:["Todas (",c.length,")"]}),Cp.map(g=>l.jsx($p,{type:"button",$active:ge===g.id,onClick:()=>X(g.id),children:g.id==="SYSTEM"?"Sistema":g.label},g.id))]}),M.map(g=>l.jsxs(k1,{children:[l.jsxs(C1,{children:[l.jsx("span",{children:g.label}),l.jsx("span",{className:"grp-count",children:g.items.length})]}),l.jsx(E1,{children:g.items.map(R=>{const j=R.permittedForCurrentUser,P=D===R.code,Z=hs(R),Oe=Z.Icon,Te=R.riskLevel==="MEDIUM"||R.riskLevel==="HIGH";return l.jsxs(j1,{type:"button",$risk:R.riskLevel,disabled:!j||P,onClick:()=>jn(R),title:me(R.description),children:[l.jsx("span",{className:"act-ico",children:l.jsx(Oe,{size:15})}),l.jsxs("span",{className:"act-copy",children:[l.jsx("span",{className:"act-title",children:Z.label}),l.jsx("span",{className:"act-sub",children:Z.subtitle})]}),l.jsx("span",{className:"act-trail",children:j?P?l.jsxs("span",{className:"act-busy",children:[l.jsx("i",{}),"Enviando"]}):l.jsxs(l.Fragment,{children:[Te&&l.jsx("span",{className:"act-risk-pill",children:Qg[R.riskLevel]||R.riskLevel}),l.jsx("span",{className:"act-chev",children:l.jsx(wp,{size:14})})]}):l.jsx("span",{className:"act-locked",children:"Restrito"})})]},R.code)})})]},g.id))]})})(),!J&&Ce==="CHAT"&&_&&l.jsx(N1,{children:i.length===0?l.jsxs(T1,{children:[l.jsx("strong",{children:"Nenhuma mensagem nesta estação"}),"Envie uma mensagem abaixo para abrir o chat diretamente na tela do usuário logado."]}):i.slice(-40).map(M=>{const g=M.direction==="SERVER_TO_CLIENT",R=M.created_at?new Date(M.created_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";return l.jsx(I1,{$fromTi:g,children:l.jsxs(R1,{$fromTi:g,children:[l.jsxs("div",{className:"cb-head",children:[l.jsx("span",{className:"cb-sender",children:me(M.sender)}),R&&l.jsx("span",{className:"cb-time",children:R})]}),l.jsx("div",{children:me(M.message)})]})},M.id)})})]}),!J&&Ce==="DIAG"&&l.jsx(Cc,{children:l.jsxs(b1,{type:"button",onClick:Jn,disabled:re,children:[l.jsx(Yc,{size:14}),l.jsx("span",{children:re?"Atualizando telemetria...":"Atualizar telemetria agora"})]})}),!J&&Ce==="ACTIONS"&&(()=>{const M=Bt[0]||null,g=Ve||(M?{taskId:M.task_id,taskCode:M.task_code,title:hs({code:M.task_code,title:M.task_code}).label,status:M.status||"COMPLETED",summary:me(M.output_summary||"Execução registrada no histórico."),timestamp:new Date(M.completed_at||M.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),taskRef:c.find(P=>P.code===M.task_code)||null}:null),R=g?Mp(g.status):null,j=g&&(g.status==="RUNNING"||g.status==="DISPATCHED"||g.status==="PENDING");return l.jsx(Cc,{children:l.jsxs(_1,{$tone:R?R.color:ie.colors.textMuted,$pulsing:!!j,children:[l.jsxs("div",{className:"le-left",children:[l.jsx("span",{className:"le-dot"}),l.jsxs("div",{className:"le-text",children:[l.jsx("span",{className:"le-title",children:g?`Última ação: ${g.title}`:"Pronto para executar ações"}),l.jsx("span",{className:"le-meta",children:g?`${R.label} · ${g.timestamp}`:"Clique em uma ação acima para enviar ao agente"})]})]}),g&&l.jsx("button",{type:"button",className:"le-btn",onClick:()=>fe(g),children:"Ver retorno"})]})})})(),!J&&Ce==="CHAT"&&_&&l.jsx(Cc,{children:(d==null?void 0:d.role)!=="VIEWER"?l.jsxs($1,{onSubmit:Zn,children:[l.jsx("input",{type:"text","aria-label":"Mensagem para o operador do computador",placeholder:"Escrever mensagem para a estação...",value:te,onChange:M=>H(M.target.value)}),l.jsxs("button",{type:"submit",disabled:de||!te.trim(),children:[l.jsx(yy,{size:13}),l.jsx("span",{children:"Enviar"})]})]}):l.jsx("div",{style:{fontSize:"0.74rem",color:ie.colors.textSecondary},children:"Modo somente leitura: apenas Suporte N1 ou Admin N2 pode enviar mensagens."})})]}),(K==null?void 0:K.open)&&l.jsx(Gi,{onClick:()=>G(null),children:l.jsxs(qi,{onClick:M=>M.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Instalar impressora homologada",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"brand",children:l.jsx(Co,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Instalar impressora homologada"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:me(V.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:V.ip_address})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Fr,{type:"button",onClick:()=>G(null),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),K.loading&&l.jsxs(Pp,{$tone:"warning",children:[l.jsx("span",{className:"on-ico",children:l.jsx(Sp,{size:15})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:"Buscando impressoras na sub-rede"}),l.jsx("span",{className:"on-msg",children:"Consultando o catálogo homologado e a descoberta de rede da estação..."})]})]}),K.error&&l.jsx(_c,{$tone:"danger",children:K.error}),!K.loading&&K.printers.length>0&&l.jsx(L1,{children:K.printers.map(M=>{const g=M.id===K.selectedId;return l.jsxs(O1,{$selected:g,$source:M.source,children:[l.jsx("input",{type:"radio",name:"approved_printer",checked:g,onChange:()=>G(R=>R&&{...R,selectedId:M.id})}),l.jsxs("span",{className:"pr-left",children:[l.jsx("span",{className:"pr-ico",children:l.jsx(Co,{size:15})}),l.jsxs("span",{className:"pr-info",children:[l.jsxs("span",{className:"pr-name",children:[l.jsx("span",{children:M.name}),l.jsx("span",{className:"pr-tag",children:M.source==="NETWORK"?"Rede":M.source==="INSTALLED"?"Instalada":"Homologada"})]}),l.jsxs("span",{className:"pr-ip",children:[M.ip_address,M.model?` · ${M.model}`:""]})]})]}),l.jsx("span",{className:"pr-check",children:g&&l.jsx(Gn,{size:11,strokeWidth:2.4})})]},M.id)})}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Risco Alto · Admin N2"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(qn,{type:"button",onClick:()=>G(null),children:"Cancelar"}),l.jsx(qn,{type:"button",$variant:"primary",disabled:!K.selectedId,onClick:Wr,children:"Instalar impressora"})]})]})]})}),ve.open&&l.jsx(Gi,{onClick:()=>xe({open:!1,task:null}),children:l.jsxs(qi,{onClick:M=>M.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar reinicialização da estação",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"danger",children:l.jsx(Qc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Reiniciar estação de trabalho"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação de alto impacto"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Requer confirmação"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Fr,{type:"button",onClick:()=>xe({open:!1,task:null}),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),l.jsxs(Ap,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:me(V.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:V.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Aviso na tela"}),l.jsx("span",{className:"ts-v",children:"30 segundos"})]})]}),l.jsx(_c,{$tone:"warning",children:"O Windows exibirá um aviso de 30 segundos para que o operador salve os documentos abertos antes da reinicialização. A ordem será registrada na auditoria."}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(qn,{type:"button",onClick:()=>xe({open:!1,task:null}),children:"Cancelar"}),l.jsxs(qn,{type:"button",$variant:"danger",onClick:Gr,children:[l.jsx(Qc,{size:13}),l.jsx("span",{children:"Confirmar reinício"})]})]})]})]})}),U&&(()=>{const g=hs({code:U.taskCode,title:U.title}).Icon,R=Mp(U.status),j=z1(U.summary),P=U.status==="RUNNING"||U.status==="DISPATCHED"||U.status==="PENDING",Z=U.status==="FAILED"||U.status==="EXPIRED",Oe=Z?"error":P?"active":"done",Te=Z?"error":P?"pending":"done";return l.jsx(Gi,{onClick:Et,children:l.jsxs(qi,{onClick:bt=>bt.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":`Execução da ação ${U.title}`,children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:R.tone==="danger"?"danger":R.tone==="warning"?"warning":"brand",children:l.jsx(g,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:U.title}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:me(V.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:V.ip_address}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:U.timestamp})]})]})]}),l.jsxs("div",{className:"mh-right",children:[l.jsxs(Tp,{$color:R.color,$bgColor:R.bg,children:[l.jsx("span",{className:"dot"}),R.label]}),l.jsx(Fr,{type:"button",onClick:Et,"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})]})]}),l.jsxs(A1,{"aria-label":"Etapas da execução remota",children:[l.jsxs(jc,{$state:"done",children:[l.jsx("span",{className:"st-mark",children:l.jsx(Gn,{size:10,strokeWidth:2.5})}),l.jsx("span",{className:"st-lbl",children:"Assinada (HMAC)"})]}),l.jsxs(jc,{$state:Oe,children:[l.jsx("span",{className:"st-mark",children:Oe==="done"?l.jsx(Gn,{size:10,strokeWidth:2.5}):Oe==="error"?"!":"2"}),l.jsx("span",{className:"st-lbl",children:Oe==="active"?"Na fila do agente":"Enviada ao agente"})]}),l.jsxs(jc,{$state:Te,children:[l.jsx("span",{className:"st-mark",children:Te==="done"?l.jsx(Gn,{size:10,strokeWidth:2.5}):Te==="error"?"!":"3"}),l.jsx("span",{className:"st-lbl",children:Te==="error"?"Falha / TTL":"Retorno recebido"})]})]}),j.structured?l.jsx(P1,{children:j.items.map((bt,$e)=>l.jsxs(M1,{children:[l.jsx("dt",{children:bt.label}),l.jsx("dd",{children:bt.value})]},$e))}):l.jsxs(Pp,{$tone:R.tone==="danger"?"danger":R.tone==="warning"?"warning":"brand",children:[l.jsx("span",{className:"on-ico",children:Z?l.jsx(gl,{size:16}):P?l.jsx(Sp,{size:16}):l.jsx(Gn,{size:16})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:R.lead}),l.jsx("span",{className:"on-msg",children:j.message})]})]}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsxs(qn,{type:"button",$variant:"ghost",$copied:Q==="report",onClick:()=>It("report",j.message),title:"Copiar saída completa da tarefa",children:[Q==="report"?l.jsx(Gn,{size:13}):l.jsx(Ui,{size:13}),l.jsx("span",{children:Q==="report"?"Copiado":"Copiar resultado"})]})}),l.jsxs("div",{className:"mf-right",children:[U.taskRef&&!P&&l.jsxs(qn,{type:"button",onClick:()=>Qt(U.taskRef,U.paramsRef||{}),children:[l.jsx(Yc,{size:13}),l.jsx("span",{children:"Executar novamente"})]}),l.jsx(qn,{type:"button",$variant:"primary",onClick:Et,children:"Fechar"})]})]})]})})})(),Se&&l.jsx(Gi,{onClick:()=>Y(!1),children:l.jsxs(qi,{onClick:M=>M.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar remoção de equipamento",children:[l.jsxs(Yi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Qi,{$tone:"danger",children:l.jsx(qc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Remover equipamento do painel"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação permanente"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Registrada na auditoria"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Fr,{type:"button",onClick:()=>Y(!1),"aria-label":"Fechar",children:l.jsx(Bi,{size:15})})})]}),l.jsxs(Ap,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:me(V.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:V.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Setor"}),l.jsx("span",{className:"ts-v",children:me(V.sector_name||"N/D")})]})]}),l.jsx(_c,{$tone:"danger",children:"Esta ação remove permanentemente o cadastro, o histórico de telemetria e as mensagens desta estação do painel."}),l.jsxs(Ki,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:ie.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(qn,{type:"button",onClick:()=>Y(!1),children:"Cancelar"}),l.jsx(qn,{type:"button",$variant:"danger",onClick:async()=>{Y(!1),$&&await $(V.id)},children:"Confirmar remoção"})]})]})]})})]})}const B1=[{value:"USF",label:"USF — Unidade de Saúde da Família"},{value:"POLICLINICA",label:"Policlínica Municipal"},{value:"CAPS",label:"CAPS — Centro de Atenção Psicossocial"},{value:"UPA",label:"UPA — Unidade de Pronto Atendimento"},{value:"HOSPITAL",label:"Hospital Municipal"},{value:"CEO",label:"CEO — Centro de Especialidades"},{value:"SEDE",label:"Sede Administrativa / Central TI"}],U1=[{value:"REC",label:"Recepção",desc:"Balcão em L, longarina e madeira"},{value:"CONS",label:"Consultório",desc:"Maca clínica, soro e biombo"},{value:"FARM",label:"Farmácia / Vacina",desc:"Estantes médicas e piso xadrez"},{value:"ADM",label:"Admin / Enfermagem",desc:"Mural de avisos e área clínica"},{value:"TI",label:"Sala Técnica / TI",desc:"Rack de servidor e infraestrutura"}];function Lp(t,o="SETOR"){return String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9\s-]/g," ").trim().replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,16)||o}function Op(t){const o=String((t==null?void 0:t.room_theme)||"").trim().toUpperCase();if(["REC","CONS","FARM","ADM","TI"].includes(o))return o;const i=`${(t==null?void 0:t.code)||""} ${(t==null?void 0:t.name)||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();return i.includes("REC")||i.includes("ACOLH")||(t==null?void 0:t.id)===1?"REC":i.includes("CONS")||i.includes("MED")||i.includes("PSI")||(t==null?void 0:t.id)===2?"CONS":i.includes("FAR")||i.includes("VAC")||i.includes("LAB")||(t==null?void 0:t.id)===3?"FARM":i.includes("TI")||i.includes("CPD")||(t==null?void 0:t.id)===8?"TI":"ADM"}const H1=E.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`,V1=E.div`
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
`,W1=E.div`
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
`,G1=E.button`
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
`,zp=E.div`
  display: flex;
  gap: 6px;
  padding: 10px 20px 0;
  background: #f8faf8;
  border-bottom: 1px solid #e4e8e3;
  flex-wrap: wrap;
`,yo=E.button`
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
`,q1=E.form`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
`,gs=E.div`
  display: grid;
  grid-template-columns: ${({$cols:t})=>t||"1fr"};
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,en=E.div`
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
`,Y1=E.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Q1=E.button`
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
`,Nc=E.label`
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
`,K1=E.div`
  border: 1px solid #e4e8e3;
  border-radius: 7px;
  padding: 10px 12px;
  background: #f8faf8;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,X1=E.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  color: #52796b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`,xs=E.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.75rem;
  line-height: 1.4;
  background: ${({$tone:t})=>t==="danger"?"rgba(220, 38, 38, 0.08)":"rgba(217, 119, 6, 0.1)"};
  border: 1px solid
    ${({$tone:t})=>t==="danger"?"rgba(220, 38, 38, 0.35)":"rgba(217, 119, 6, 0.35)"};
  color: ${({$tone:t})=>t==="danger"?"#991B1B":"#92400E"};
`,J1=E.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e4e8e3;
`,Fp=E.button`
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
`;function Z1({isOpen:t,initialMode:o="CREATE_UNIT",units:i=[],activeUnit:c=null,targetSector:d=null,machines:p=[],onClose:m,onCreateUnit:v,onUpdateUnit:x,onDeleteUnit:_,onCreateSector:T,onUpdateSector:$,onDeleteSector:A}){var Ut;const[D,ne]=N.useState(o),[re,le]=N.useState(!1),[te,H]=N.useState(""),[de,je]=N.useState(""),[ye,he]=N.useState(""),[U,fe]=N.useState(!1),[Ve,ee]=N.useState("USF"),[ge,X]=N.useState(""),[J,Ie]=N.useState(!0),[Ce,Me]=N.useState(""),[ae,F]=N.useState(""),[Q,O]=N.useState(""),[w,I]=N.useState(!1),[K,G]=N.useState("CONS"),[ve,xe]=N.useState(!0),[Se,Y]=N.useState(!0),[ke,_e]=N.useState(!1),[xt,Ot]=N.useState(""),[Et,Tt]=N.useState(""),[pn,De]=N.useState("9"),[It,V]=N.useState("5"),[Bt,yt]=N.useState(""),pt=N.useMemo(()=>i.filter(q=>Number(q.id)!==Number(c==null?void 0:c.id)),[i,c]),vt=N.useMemo(()=>((c==null?void 0:c.sectors)||[]).filter(q=>Number(q.id)!==Number(d==null?void 0:d.id)),[c,d]),Re=N.useMemo(()=>d?p.filter(q=>Number(q.sector_id)===Number(d.id)).length:0,[p,d]),Ke=Number(((Ut=c==null?void 0:c.summary)==null?void 0:Ut.total)??p.length??0),ze=c==null?void 0:c.id,Rt=d==null?void 0:d.id;if(N.useEffect(()=>{var q,ot;t&&(ne(o),H(""),le(!1),o==="CREATE_UNIT"?(je(""),he(""),fe(!1),ee("USF"),X(""),Ie(!0)):o==="EDIT_UNIT"&&c?(je(me(c.name||"")),he(c.code||""),fe(!0),ee(c.unit_type||"USF"),X(me(c.address||""))):o==="DELETE_UNIT"?Me((q=pt[0])!=null&&q.id?String(pt[0].id):""):o==="CREATE_SECTOR"?(F(""),O(""),I(!1),G("CONS"),xe(!0),Y(!0),_e(!1),Ot(""),Tt(""),De("9"),V("5")):o==="EDIT_SECTOR"&&d?(F(me(d.name||"")),O(d.code||""),I(!0),G(Op(d)),xe(!1),_e(!1),Ot(String(d.bounds_x??0)),Tt(String(d.bounds_z??0)),De(String(d.width_3d??9)),V(String(d.depth_3d??5))):o==="DELETE_SECTOR"&&yt((ot=vt[0])!=null&&ot.id?String(vt[0].id):""))},[t,o,ze,Rt]),!t)return null;const tt=q=>{var ot,tn;H(""),ne(q),q==="CREATE_UNIT"?(je(""),he(""),fe(!1),ee("USF"),X(""),Ie(!0)):q==="EDIT_UNIT"&&c?(je(me(c.name||"")),he(c.code||""),fe(!0),ee(c.unit_type||"USF"),X(me(c.address||""))):q==="DELETE_UNIT"?Me((ot=pt[0])!=null&&ot.id?String(pt[0].id):""):q==="CREATE_SECTOR"?(F(""),O(""),I(!1),G("CONS"),xe(!0),Y(!0),_e(!1),Ot(""),Tt(""),De("9"),V("5")):q==="EDIT_SECTOR"&&d?(F(me(d.name||"")),O(d.code||""),I(!0),G(Op(d)),xe(!1),_e(!1),Ot(String(d.bounds_x??0)),Tt(String(d.bounds_z??0)),De(String(d.width_3d??9)),V(String(d.depth_3d??5))):q==="DELETE_SECTOR"&&yt((tn=vt[0])!=null&&tn.id?String(vt[0].id):"")},hn=async q=>{q.preventDefault(),H(""),le(!0);try{D==="CREATE_UNIT"?await v({name:de,code:ye,unit_type:Ve,address:ge,create_default_sectors:J}):D==="EDIT_UNIT"&&c?await x(c.id,{name:de,code:ye,unit_type:Ve,address:ge}):D==="DELETE_UNIT"&&c?await _(c.id,{target_unit_id:Ce?Number(Ce):void 0}):D==="CREATE_SECTOR"&&c?await T(c.id,{name:ae,code:Q,room_theme:K,auto_size:Se,...Se?{}:{width_3d:Number(pn||9),depth_3d:Number(It||5)},...ve?{}:{bounds_x:xt===""?void 0:Number(xt),bounds_z:Et===""?void 0:Number(Et)}}):D==="EDIT_SECTOR"&&d?await $(d.id,{name:ae,code:Q,room_theme:K,width_3d:Number(pn||9),depth_3d:Number(It||5),bounds_x:xt===""?void 0:Number(xt),bounds_z:Et===""?void 0:Number(Et)}):D==="DELETE_SECTOR"&&d&&await A(d.id,{target_sector_id:Bt?Number(Bt):void 0}),m()}catch(ot){H((ot==null?void 0:ot.message)||"Não foi possível concluir a operação.")}finally{le(!1)}},En=D==="EDIT_SECTOR"||D==="DELETE_SECTOR",at={CREATE_UNIT:"Cadastrar Nova Unidade de Saúde",EDIT_UNIT:`Editar Unidade — ${me((c==null?void 0:c.name)||"")}`,DELETE_UNIT:`Excluir Unidade — ${me((c==null?void 0:c.name)||"")}`,CREATE_SECTOR:`Novo Setor em ${me((c==null?void 0:c.name)||"Unidade")}`,EDIT_SECTOR:`Editar Setor — ${me((d==null?void 0:d.name)||"")}`,DELETE_SECTOR:`Excluir Setor — ${me((d==null?void 0:d.name)||"")}`}[D];return l.jsx(H1,{onClick:()=>!re&&m(),children:l.jsxs(V1,{onClick:q=>q.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsxs(W1,{children:[l.jsxs("div",{children:[l.jsxs("div",{className:"m-kicker",children:["ESTRUTURA DA REDE // ",c?me(c.code):"RMM"]}),l.jsx("div",{className:"m-title",children:at})]}),l.jsx(G1,{type:"button",onClick:()=>!re&&m(),title:"Fechar",children:"✕"})]}),En?l.jsxs(zp,{children:[l.jsx(yo,{type:"button",$active:D==="EDIT_SECTOR",onClick:()=>tt("EDIT_SECTOR"),children:"Editar Setor"}),l.jsx(yo,{type:"button",$danger:!0,$active:D==="DELETE_SECTOR",onClick:()=>tt("DELETE_SECTOR"),children:"Excluir Setor"})]}):l.jsxs(zp,{children:[l.jsx(yo,{type:"button",$active:D==="CREATE_UNIT",onClick:()=>tt("CREATE_UNIT"),children:"+ Nova Unidade"}),c&&l.jsxs(l.Fragment,{children:[l.jsx(yo,{type:"button",$active:D==="CREATE_SECTOR",onClick:()=>tt("CREATE_SECTOR"),children:"+ Novo Setor"}),l.jsx(yo,{type:"button",$active:D==="EDIT_UNIT",onClick:()=>tt("EDIT_UNIT"),children:"Editar Unidade"}),l.jsx(yo,{type:"button",$danger:!0,$active:D==="DELETE_UNIT",onClick:()=>tt("DELETE_UNIT"),children:"Excluir Unidade"})]})]}),l.jsxs(q1,{onSubmit:hn,children:[te&&l.jsx(xs,{$tone:"danger",children:te}),(D==="CREATE_UNIT"||D==="EDIT_UNIT")&&l.jsxs(l.Fragment,{children:[l.jsxs(gs,{$cols:"2fr 1fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Nome da Unidade de Saúde *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: USF Camela / UPA Ipojuca",value:de,onChange:q=>{const ot=q.target.value;je(ot),!U&&D==="CREATE_UNIT"&&he(Lp(ot,"UNI"))}})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única"})]}),l.jsx("input",{type:"text",placeholder:"Ex: USF-CAM",value:ye,onChange:q=>{fe(!0),he(q.target.value.toUpperCase())}})]})]}),l.jsxs(gs,{$cols:"1fr 1.4fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Tipo de Estabelecimento"}),l.jsx("select",{value:Ve,onChange:q=>ee(q.target.value),children:B1.map(q=>l.jsx("option",{value:q.value,children:q.label},q.value))})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Endereço / Bairro"}),l.jsx("input",{type:"text",placeholder:"Ex: Distrito de Camela, Ipojuca - PE",value:ge,onChange:q=>X(q.target.value)})]})]}),D==="CREATE_UNIT"&&l.jsxs(Nc,{children:[l.jsx("input",{type:"checkbox",checked:J,onChange:q=>Ie(q.target.checked)}),l.jsx("span",{children:"Criar planta inicial com 4 setores padrão (Recepção, Consultório, Farmácia e Adm)"})]})]}),D==="DELETE_UNIT"&&c&&l.jsxs(l.Fragment,{children:[pt.length===0?l.jsxs(xs,{$tone:"danger",children:["Esta é a única unidade ativa no painel. Crie outra unidade antes de excluir"," ",l.jsx("strong",{children:me(c.name)}),"."]}):l.jsxs(xs,{$tone:"warning",children:["A unidade ",l.jsx("strong",{children:me(c.name)})," possui"," ",l.jsxs("strong",{children:[(c.sectors||[]).length," setor(es)"]})," e"," ",l.jsxs("strong",{children:[Ke," computador(es)"]})," vinculados. Esta ação remove permanentemente a unidade e todos os seus setores."]}),pt.length>0&&Ke>0&&l.jsxs(en,{children:[l.jsx("label",{children:"Realocar computadores existentes para qual unidade?"}),l.jsx("select",{value:Ce,onChange:q=>Me(q.target.value),required:!0,children:pt.map(q=>l.jsxs("option",{value:q.id,children:["[",q.code,"] ",me(q.name)]},q.id))})]})]}),(D==="CREATE_SECTOR"||D==="EDIT_SECTOR")&&l.jsxs(l.Fragment,{children:[l.jsxs(gs,{$cols:"2fr 1fr",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Nome do Setor *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: Sala de Vacina, Consultório 02, CPD",value:ae,onChange:q=>{const ot=q.target.value;F(ot),!w&&D==="CREATE_SECTOR"&&O(Lp(ot,"SETOR"))}})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única na unidade"})]}),l.jsx("input",{type:"text",placeholder:"Ex: VAC-01",value:Q,onChange:q=>{I(!0),O(q.target.value.toUpperCase())}})]})]}),l.jsxs(en,{children:[l.jsxs("label",{children:["Estilo do Ambiente & Mobiliário 3D",l.jsx("span",{className:"hint",children:"Define móveis e piso na maquete"})]}),l.jsx(Y1,{children:U1.map(q=>l.jsxs(Q1,{type:"button",$selected:K===q.value,onClick:()=>G(q.value),children:[l.jsx("div",{className:"t-code",children:q.value}),l.jsx("div",{className:"t-name",children:q.label}),l.jsx("div",{className:"t-desc",children:q.desc})]},q.value))})]}),l.jsx(X1,{type:"button",onClick:()=>_e(q=>!q),children:ke?"▾ Ocultar layout e medidas 3D":"▸ Layout e medidas 3D (Avançado)"}),ke&&l.jsxs(K1,{children:[D==="CREATE_SECTOR"&&l.jsxs(Nc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:ve,onChange:q=>xe(q.target.checked)}),l.jsx("span",{children:"Posicionar automaticamente no próximo espaço livre da planta (sem colisão)"})]}),D==="CREATE_SECTOR"&&l.jsxs(Nc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:Se,onChange:q=>Y(q.target.checked)}),l.jsx("span",{children:"Tamanho automático — a sala assume a medida predominante da unidade e encaixa na malha existente"})]}),l.jsxs(gs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Largura da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"4",max:"24",value:pn,disabled:D==="CREATE_SECTOR"&&Se,onChange:q=>De(q.target.value)})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Profundidade da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"3.5",max:"16",value:It,disabled:D==="CREATE_SECTOR"&&Se,onChange:q=>V(q.target.value)})]})]}),(!ve||D==="EDIT_SECTOR")&&l.jsxs(gs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(en,{children:[l.jsx("label",{children:"Posição X Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:xt,placeholder:"-4.5, 4.5, 13.5...",onChange:q=>Ot(q.target.value)})]}),l.jsxs(en,{children:[l.jsx("label",{children:"Posição Z Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:Et,placeholder:"-3.5 (Norte) ou 3.5 (Sul)",onChange:q=>Tt(q.target.value)})]})]})]})]}),D==="DELETE_SECTOR"&&d&&l.jsxs(l.Fragment,{children:[vt.length===0&&Re>0?l.jsxs(xs,{$tone:"danger",children:["O setor ",l.jsx("strong",{children:me(d.name)})," é o único setor desta unidade e contém ",l.jsxs("strong",{children:[Re," computador(es)"]}),". Crie outro setor antes de excluí-lo para permitir a transferência."]}):l.jsxs(xs,{$tone:"warning",children:["Confirma a exclusão do setor"," ",l.jsx("strong",{children:me(d.name)})," (",d.code,") da unidade ",l.jsx("strong",{children:me((c==null?void 0:c.name)||"")}),"?",Re>0?` Os ${Re} computador(es) alocados serão transferidos para o setor selecionado abaixo.`:" Este setor não possui computadores alocados."]}),vt.length>0&&Re>0&&l.jsxs(en,{children:[l.jsx("label",{children:"Transferir computadores deste setor para:"}),l.jsx("select",{value:Bt,onChange:q=>yt(q.target.value),required:!0,children:vt.map(q=>l.jsxs("option",{value:q.id,children:["[",q.code,"] ",me(q.name)]},q.id))})]})]}),l.jsxs(J1,{children:[l.jsx(Fp,{type:"button",onClick:()=>!re&&m(),disabled:re,children:"Cancelar"}),l.jsx(Fp,{type:"submit",$variant:D==="DELETE_UNIT"||D==="DELETE_SECTOR"?"danger":"primary",disabled:re||D==="DELETE_UNIT"&&pt.length===0||D==="DELETE_SECTOR"&&vt.length===0&&Re>0,children:re?"Processando...":D==="CREATE_UNIT"?"Criar Unidade":D==="EDIT_UNIT"?"Salvar Unidade":D==="DELETE_UNIT"?"Confirmar Exclusão da Unidade":D==="CREATE_SECTOR"?"Criar Setor 3D":D==="EDIT_SECTOR"?"Salvar Setor":"Confirmar Exclusão do Setor"})]})]})]})})}const ev=N.lazy(()=>Ts(()=>import("./DigitalTwin3D-CkdNjEiK.js"),__vite__mapDeps([0,1])).then(t=>({default:t.DigitalTwin3D}))),tv=N.lazy(()=>Ts(()=>import("./ModelShowcase-OPMiNBgj.js"),__vite__mapDeps([2,1]))),nv=N.lazy(()=>Ts(()=>import("./InventoryView-DqteER77.js"),[]).then(t=>({default:t.InventoryView}))),rv=N.lazy(()=>Ts(()=>import("./MonitoringAuditView-Cx_Qj5cy.js"),[]).then(t=>({default:t.MonitoringAuditView}))),ov=N.lazy(()=>Ts(()=>import("./SettingsView-BO1CMTMY.js"),[]).then(t=>({default:t.SettingsView}))),sv={ADMIN_N2:"Admin N2",TECH_N1:"Suporte N1",VIEWER:"Gestão"};function Oh(t){return String(t||"Operador").replace(/\s*\((Admin\s*N2|Suporte\s*N1|Tech\s*N1|Gest[aã]o|Viewer)\)\s*$/i,"").trim()}function iv(t){const o=Oh(t).split(/\s+/).filter(Boolean);return o.length===0?"TI":o.length===1?o[0].slice(0,2).toUpperCase():`${o[0][0]}${o[o.length-1][0]}`.toUpperCase()}const lv=E.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
`,av=E.header`
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
`,cv=E.nav`
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: ${({theme:t})=>t.radius.sm};
  border: 1px solid ${({theme:t})=>t.colors.borderSubtle};
  background: ${({theme:t})=>t.colors.bgSurfaceSubtle};
  flex-shrink: 0;
`,Xi=E.button`
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
`,uv=E.main`
  pointer-events: auto;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: ${({theme:t})=>t.colors.bgCanvas};
`,dv=E.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:t})=>t.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:t})=>t.colors.textSecondary};
`,fv=E.div`
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
`,Dp=E.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:t})=>t||"#2D6A4F"};
  display: inline-block;
  flex-shrink: 0;
`,pv=E.nav`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`,hv=E.div`
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
`,mv=E.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`,gv=E.button`
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
`,Ji=E.button`
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
`,xv=E.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 1360px) {
    .hide-compact {
      display: none;
    }
  }
`,vo=E.span`
  width: 1px;
  height: 20px;
  background: ${({theme:t})=>t.colors.borderSubtle};
  display: inline-block;
  flex-shrink: 0;
`,yv=E.div`
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
`,vv=E.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 14px;
  gap: 10px;
  pointer-events: none;
`,bv=E.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
`,wv=E.div`
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
`,An=E.button`
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
`,Sv=E.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
  overflow: hidden;
`,kv=E.button`
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
`,Cv=E.aside`
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
`,Tc=E.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({theme:t})=>t.colors.borderSubtle};

  &:last-child {
    border-bottom: none;
  }
`,Ic=E.div`
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
`,Ev=E.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`,Zi=E.div`
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
`,Bp=E.button`
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
`,el=E.button`
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
`,jv=E.div`
  display: flex;
  flex-direction: column;
`,_v=E.div`
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
`,Nv=E.button`
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
`,Up=E.p`
  font-size: 0.76rem;
  color: ${({theme:t})=>t.colors.textSecondary};
  line-height: 1.45;
`,Tv=E.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`,Iv=E.button`
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
`,Rv=E.footer`
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
`,$v=E.div`
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
`,Av=E.button`
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
`,Pv=E.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,Mv=E.div`
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
`,Lv=E.button`
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
`,Ov=E.button`
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
`,Kc=E.div`
  position: fixed;
  inset: 0;
  background: ${({theme:t})=>t.colors.bgCanvas};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:t})=>t.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:t})=>t.colors.textSecondary};
`,Hp=86400;function Rc(t,o){if(!t)return{isInactive24h:!1,mode:null,seconds:0};const i=t.health_status==="OFFLINE",c=t.last_seen_at?Math.max(0,Math.floor((o-new Date(t.last_seen_at).getTime())/1e3)):0,d=Math.max(0,Math.floor(Number(t.idle_seconds||0)));return i&&c>=Hp?{isInactive24h:!0,mode:"OFFLINE",seconds:c}:!i&&d>=Hp?{isInactive24h:!0,mode:"IDLE",seconds:d}:{isInactive24h:!1,mode:null,seconds:i?c:d}}function bo(t){const o=Math.max(0,Math.floor(Number(t||0)));if(o<60)return`${o}s`;const i=Math.floor(o/60);if(i<60)return`${i}m`;const c=Math.floor(i/60);return c<24?`${c}h ${i%60}m`:`${Math.floor(c/24)}d ${c%24}h`}const Xc="rmm.authToken";function Vp(){try{return window.sessionStorage.getItem(Xc)||null}catch{return null}}function $c(t){try{t?window.sessionStorage.setItem(Xc,t):window.sessionStorage.removeItem(Xc)}catch{}}function zv(){const t=N.useMemo(()=>{const o=new URLSearchParams(window.location.search);return o.get("showcase")!=="1"?null:{angle:o.get("angle")||"iso"}},[]);return t?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(N.Suspense,{fallback:l.jsx(Kc,{children:"Carregando cena de homologação 3D..."}),children:l.jsx(tv,{angle:t.angle})})]}):l.jsx(Fv,{})}function Fv(){var er,On,M;const[t,o]=N.useState({token:null,user:null,checking:!0}),[i,c]=N.useState(""),[d,p]=N.useState({open:!1,busy:!1,resultMsg:""}),[m,v]=N.useState([]),[x,_]=N.useState(1),[T,$]=N.useState([]),[A,D]=N.useState("MAP"),[ne,re]=N.useState(null),[le,te]=N.useState(null),[H,de]=N.useState(null),[je,ye]=N.useState(null),[he,U]=N.useState(null),[fe,Ve]=N.useState([]),[ee,ge]=N.useState([]),[X,J]=N.useState([]),[Ie,Ce]=N.useState(!1),[Me,ae]=N.useState("ISO"),[F,Q]=N.useState("PIXEL"),[O,w]=N.useState(()=>{try{return window.localStorage.getItem("rmm.topControlsCollapsed")==="1"}catch{return!1}}),[I,K]=N.useState(""),[G,ve]=N.useState(()=>{try{return window.localStorage.getItem("rmm.dockCollapsed")==="1"}catch{return!1}}),[xe,Se]=N.useState(()=>{try{return window.localStorage.getItem("rmm.leftRailCollapsed")==="1"}catch{return!1}}),Y=N.useRef(x),ke=N.useRef(H);N.useEffect(()=>{Y.current=x},[x]),N.useEffect(()=>{ke.current=H},[H]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.dockCollapsed",G?"1":"0")}catch{}},[G]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.topControlsCollapsed",O?"1":"0")}catch{}},[O]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.leftRailCollapsed",xe?"1":"0")}catch{}},[xe]);const[_e,xt]=N.useState(Date.now()),[Ot,Et]=N.useState({furniture:!0,labels:!0}),[Tt,pn]=N.useState({isOpen:!1,mode:"CREATE_UNIT",targetSector:null}),De=N.useCallback((g="")=>{const R=Vp();R&&Ye.logout(R),$c(null),o({token:null,user:null,checking:!1}),Ce(!1),v([]),$([]),D("MAP"),U(null),Ve([]),J([]),c(g)},[]),It=N.useCallback(async()=>{if(t.token)try{await Ye.downloadAgentInstaller(t.token)}catch(g){(g==null?void 0:g.status)===401&&De("Sua sessão expirou. Faça login novamente.")}},[t.token,De]),V=N.useCallback(async(g,R)=>{const j=await Ye.login(g,R);return $c(j.token),c(""),o({token:j.token,user:j.user,checking:!1}),j},[]);N.useEffect(()=>{const g=Vp();if(!g){o({token:null,user:null,checking:!1});return}Ye.getMe(g).then(R=>{o({token:g,user:R.user,checking:!1})}).catch(()=>{$c(null),o({token:null,user:null,checking:!1})})},[]);const Bt=((er=t.user)==null?void 0:er.role)==="ADMIN_N2"||((On=t.user)==null?void 0:On.role)==="TECH_N1",yt=(g,R=null)=>{pn({isOpen:!0,mode:g,targetSector:R})},pt=()=>{pn(g=>({...g,isOpen:!1}))};N.useEffect(()=>{const g=setInterval(()=>xt(Date.now()),1e3);return()=>clearInterval(g)},[]);const vt=g=>{Et(R=>({...R,[g]:!R[g]}))},Re=N.useCallback(async(g,R,j)=>{var P;try{const[Z,Oe,Te,bt]=await Promise.all([Ye.getUnits(g),Ye.getMachines(g),Ye.getTaskCatalog(g),Ye.getAlerts(g)]),$e=Oe.machines||[],jt=$e.filter(wt=>Number(wt.unit_id)===Number(R));v(Z.units||[]),$($e),ge(Te.tasks||[]),J(bt.alerts||[]);const _n=j&&jt.some(wt=>wt.id===Number(j))?j:((P=jt[0])==null?void 0:P.id)||null;if(_n){const[wt,rn]=await Promise.all([Ye.getMachineDiagnostics(g,_n),Ye.getMachineMessages(g,_n).catch(()=>({messages:[]}))]);U(wt),Ve(rn.messages||[])}else U(null),Ve([])}catch(Z){if((Z==null?void 0:Z.status)===401){De("Sua sessão expirou. Faça login novamente.");return}throw Z}},[De]);N.useEffect(()=>{t.token&&Ye.getAgentVersionInfo().then(g=>re(g)).catch(()=>{})},[t.token]),N.useEffect(()=>{if(!t.token)return;const g=t.token,R=Bx(g,{onConnect:()=>Ce(!0),onDisconnect:()=>Ce(!1),onMachineUpdated:j=>{const P=Number(Y.current),Z=Number(j.unit_id),Oe=P>0&&Z===P;$(Te=>Te.some($e=>$e.id===j.id)?Te.map($e=>$e.id===j.id?j:$e):[...Te,j]),U(Te=>!Te||!Te.machine?Te:Te.machine.id===j.id?Oe?{...Te,machine:j}:null:Te),Ye.getUnits(g).then(Te=>v(Te.units||[])).catch(()=>{})},onMachineDeleted:({id:j})=>{$(P=>P.filter(Z=>Z.id!==Number(j))),U(P=>{var Z;return((Z=P==null?void 0:P.machine)==null?void 0:Z.id)===Number(j)?null:P}),Ye.getUnits(g).then(P=>v(P.units||[])).catch(()=>{})},onAlertTriggered:j=>{J(P=>[j,...P.filter(Z=>Z.id!==j.id).slice(0,99)])},onTaskUpdated:j=>{const P=ke.current;j&&j.machine_id&&U(Z=>{var $e;if(!Z||Number(($e=Z.machine)==null?void 0:$e.id)!==Number(j.machine_id))return Z;const Oe=Z.tasks||[],bt=Oe.some(jt=>jt.task_id===j.task_id)?Oe.map(jt=>jt.task_id===j.task_id?j:jt):[j,...Oe];return{...Z,tasks:bt}}),j!=null&&j.machine_id&&Number(j.machine_id)===Number(P)&&Ye.getMachineDiagnostics(g,j.machine_id).then(Z=>{Number(ke.current)===Number(j.machine_id)&&U(Z)}).catch(()=>{})},onAgentMessage:j=>{const P=Number(ke.current);!j||!P||Number(j.machine_id)!==P||Ve(Z=>j.id!==void 0&&Z.some(Oe=>Oe.id===j.id)?Z:[...Z,j])},onUnitsUpdated:j=>{Array.isArray(j==null?void 0:j.units)&&v(j.units)},onAuditCreated:j=>{j&&j.id&&te(j)}});return()=>{R.close()}},[t.token]),N.useEffect(()=>{if(!t.token)return;Re(t.token,x,H).catch(()=>{});const g=setInterval(()=>{Re(t.token,x,H).catch(()=>{})},12e3);return()=>clearInterval(g)},[t.token,x,H,Re]),N.useEffect(()=>{m.length>0&&!m.some(g=>g.id===Number(x))&&(_(m[0].id),ye(null),de(null),U(null))},[m,x]);const Ke=N.useMemo(()=>T.filter(g=>Number(g.unit_id)===Number(x)),[T,x]),ze=m.find(g=>g.id===Number(x))||m[0],Rt=Ke.find(g=>g.id===Number(H))||Ke[0]||null,tt=N.useMemo(()=>((ze==null?void 0:ze.sectors)||[]).find(g=>g.id===Number(je))||null,[ze,je]),hn=N.useMemo(()=>{const g=X.filter(j=>j.status!=="RESOLVED").length,R=T.filter(j=>Rc(j,_e).isInactive24h?!X.some(Z=>Number(Z.machine_id)===Number(j.id)&&Z.metric_name==="INACTIVITY_24H"&&Z.status!=="RESOLVED"):!1).length;return g+R},[X,T,_e]),En=N.useMemo(()=>{if(!I.trim())return Ke;const g=I.toLowerCase();return Ke.filter(R=>String(R.hostname||"").toLowerCase().includes(g)||String(R.ip_address||"").toLowerCase().includes(g)||String(R.sector_name||"").toLowerCase().includes(g))},[Ke,I]),at=m.reduce((g,R)=>{var j,P,Z,Oe,Te;return{total:g.total+(((j=R.summary)==null?void 0:j.total)||0),NORMAL:g.NORMAL+(((P=R.summary)==null?void 0:P.NORMAL)||0),WARNING:g.WARNING+(((Z=R.summary)==null?void 0:Z.WARNING)||0),CRITICAL:g.CRITICAL+(((Oe=R.summary)==null?void 0:Oe.CRITICAL)||0),OFFLINE:g.OFFLINE+(((Te=R.summary)==null?void 0:Te.OFFLINE)||0)}},{total:0,NORMAL:0,WARNING:0,CRITICAL:0,OFFLINE:0});async function Ut(g){const R=await Ye.dispatchAuthorizedTask(t.token,g);return await Re(t.token,x,g.machineId),R}async function q(g,R){return(await Ye.getApprovedPrinters(t.token,g,R)).printers||[]}async function ot(g){const R=await Ye.refreshMachineTelemetryNow(t.token,g);return await Re(t.token,x,g),R}async function tn(g){const R=await Ye.updateMachineAgent(t.token,g);return await Re(t.token,x,g),R}async function Ro(){p(g=>({...g,busy:!0,resultMsg:""}));try{const g=await Ye.updateAllAgents(t.token);await Re(t.token,x,H),p({open:!0,busy:!1,resultMsg:g.message||"Ordem de atualização enviada para todas as máquinas."})}catch(g){p({open:!0,busy:!1,resultMsg:`Falha ao enviar atualização: ${g.message}`})}}async function Xn(g,R){const j=await Ye.sendMachineMessage(t.token,g,R);return await Re(t.token,x,g),j}async function nn(g,{unitId:R,sectorId:j}){const P=await Ye.updateMachineLocation(t.token,g,{unitId:R,sectorId:j}),Z=A==="MAP"?Number(R):x;return A==="MAP"&&_(Number(R)),await Re(t.token,Z,g),P}async function Jn(g,R){const j=await Ye.revokeMachine(t.token,g,R,R?"Revogado pelo painel Pulso RMM":"Reativado pelo painel Pulso RMM");return await Re(t.token,x,H),j}function Zn(g){g&&(g.unit_id&&_(Number(g.unit_id)),de(Number(g.id)),ye(null),ae("FOCUS"),D("MAP"))}async function Er(g){await Ye.deleteMachine(t.token,g),de(null),await Re(t.token,x,null)}async function jn(g){var P;const R=await Ye.createUnit(t.token,g);Array.isArray(R.units)&&v(R.units);const j=((P=R.unit)==null?void 0:P.id)||x;return _(j),de(null),ye(null),U(null),ae("ISO"),await Re(t.token,j,null),R}async function Qt(g,R){const j=await Ye.updateUnit(t.token,g,R);return Array.isArray(j.units)&&v(j.units),await Re(t.token,x,H),j}async function Vr(g,R){var Oe;const j=await Ye.deleteUnit(t.token,g,R),P=Array.isArray(j.units)?j.units:[];v(P);const Z=j.target_unit_id||((Oe=P[0])==null?void 0:Oe.id)||1;return _(Z),de(null),ye(null),U(null),ae("ISO"),await Re(t.token,Z,null),j}async function Wr(g,R){var P;const j=await Ye.createSector(t.token,g,R);return Array.isArray(j.units)&&v(j.units),(P=j.sector)!=null&&P.id&&(ye(j.sector.id),ae("SECTOR")),await Re(t.token,x,H),j}async function Gr(g,R){const j=await Ye.updateSector(t.token,g,R);return Array.isArray(j.units)&&v(j.units),await Re(t.token,x,H),j}async function jr(g,R){const j=await Ye.deleteSector(t.token,g,R);return Array.isArray(j.units)&&v(j.units),Number(je)===Number(g)&&(ye(null),ae("ISO")),await Re(t.token,x,H),j}return t.checking?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(Kc,{children:"Validando sessão Pulso RMM..."})]}):!t.token||!t.user?l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),l.jsx(t1,{onAuthenticated:V,sessionNotice:i})]}):l.jsxs(il,{theme:ie,children:[l.jsx(ll,{}),A==="MAP"&&(F==="PIXEL"?l.jsx(uy,{activeUnit:ze,machines:Ke,selectedMachine:Rt,selectedSector:tt,onSelectMachine:g=>{de(g.id),ye(null)}}):l.jsx(N.Suspense,{fallback:l.jsx(Kc,{children:"Carregando Gêmeo Digital 3D..."}),children:l.jsx(ev,{activeUnit:ze,machines:Ke,selectedMachine:Rt,selectedSector:tt,cameraMode:Me,roomVariant:r1(),sceneLayers:Ot,onUserOrbit:()=>{Me!=="FREE"&&ae("FREE")},onSelectMachine:g=>{de(g.id),ye(null),ae("FOCUS")}})})),l.jsxs(lv,{children:[l.jsxs(av,{children:[l.jsxs(fv,{children:[l.jsx(Gc,{size:26}),l.jsxs("div",{className:"brand-copy",children:[l.jsx("span",{className:"brand-title",children:"Pulso RMM"}),l.jsxs("span",{className:"brand-status",children:[l.jsx(Dp,{$color:Ie?ie.colors.status.NORMAL:ie.colors.status.WARNING}),l.jsx("span",{children:Ie?"Tempo real ativo":"Reconectando"})]})]})]}),l.jsx(vo,{"aria-hidden":"true"}),l.jsxs(cv,{"aria-label":"Módulos do Pulso RMM",children:[l.jsxs(Xi,{type:"button",$active:A==="MAP","aria-current":A==="MAP"?"page":void 0,onClick:()=>D("MAP"),children:[l.jsx($y,{size:13}),l.jsx("span",{children:"Mapa"})]}),l.jsxs(Xi,{type:"button",$active:A==="INVENTORY","aria-current":A==="INVENTORY"?"page":void 0,onClick:()=>D("INVENTORY"),children:[l.jsx(Ay,{size:13}),l.jsx("span",{children:"Inventário"})]}),l.jsxs(Xi,{type:"button",$active:A==="MONITORING","aria-current":A==="MONITORING"?"page":void 0,onClick:()=>D("MONITORING"),children:[l.jsx(Py,{size:13}),l.jsx("span",{children:"Monitoramento"}),hn>0&&l.jsx("span",{className:"m-badge",children:hn})]}),l.jsxs(Xi,{type:"button",$active:A==="SETTINGS","aria-current":A==="SETTINGS"?"page":void 0,onClick:()=>D("SETTINGS"),children:[l.jsx(My,{size:13}),l.jsx("span",{children:"Configurações"})]})]}),A==="MAP"?l.jsxs(l.Fragment,{children:[l.jsx(vo,{"aria-hidden":"true"}),l.jsxs(pv,{"aria-label":"Unidades de Saúde",children:[l.jsx(hv,{children:m.map(g=>{var P,Z;const R=g.id===Number(x),j=me(g.name);return l.jsxs(gv,{type:"button",$active:R,"aria-current":R?"page":void 0,title:`${j} (${((P=g.summary)==null?void 0:P.total)||0} estações)`,onClick:()=>{_(g.id),de(null),ye(null),U(null),ae("ISO")},children:[l.jsx("span",{className:"u-name",children:j}),l.jsx("span",{className:"u-count",children:((Z=g.summary)==null?void 0:Z.total)||0})]},g.id)})}),Bt&&l.jsxs(mv,{children:[l.jsx(Ji,{type:"button",$accent:!0,$iconOnly:!0,onClick:()=>yt("CREATE_UNIT"),title:"Cadastrar nova Unidade de Saúde","aria-label":"Cadastrar nova Unidade de Saúde",children:l.jsx(vp,{size:14})}),ze&&l.jsx(Ji,{type:"button",$iconOnly:!0,onClick:()=>yt("EDIT_UNIT"),title:"Editar ou excluir unidade selecionada","aria-label":"Editar unidade selecionada",children:l.jsx(bp,{size:14})})]})]})]}):l.jsx("div",{style:{flex:1}}),l.jsxs(xv,{children:[l.jsxs(Ji,{type:"button",onClick:It,title:"Baixar instalador autenticado do Agente Windows (.exe)",children:[l.jsx(fy,{size:14}),l.jsx("span",{className:"hide-compact",children:"Agente"})]}),((M=t.user)==null?void 0:M.role)==="ADMIN_N2"&&l.jsxs(Ji,{type:"button",$accent:!0,onClick:()=>p({open:!0,busy:!1,resultMsg:""}),title:"Enviar atualização silenciosa (OTA) para todas as máquinas",children:[l.jsx(Lh,{size:14}),l.jsx("span",{className:"hide-compact",children:"Atualizar todos"})]}),l.jsx(vo,{"aria-hidden":"true"}),l.jsxs(yv,{title:t.user.email,children:[l.jsx("span",{className:"u-avatar",children:iv(t.user.name)}),l.jsxs("div",{className:"u-meta",children:[l.jsx("span",{className:"u-name",children:Oh(t.user.name)}),l.jsx("span",{className:"u-role",children:sv[t.user.role]||t.user.role})]}),l.jsx(el,{type:"button",$danger:!0,onClick:()=>De(""),title:"Encerrar sessão","aria-label":"Encerrar sessão",children:l.jsx(py,{size:14})})]})]})]}),A==="MAP"?l.jsxs(vv,{children:[l.jsx(bv,{children:l.jsx(wv,{children:O?l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{fontFamily:ie.fonts.mono,fontSize:"0.72rem",fontWeight:600,color:ie.colors.textSecondary,padding:"0 8px"},children:F==="PIXEL"?"Pixel Art":`3D · ${Me}`}),l.jsxs(An,{type:"button",onClick:()=>w(!1),title:"Expandir controles de visualização","aria-expanded":"false",children:[l.jsx(bc,{size:14}),l.jsx("span",{children:"Visualização"})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs(An,{type:"button",$active:F==="PIXEL",onClick:()=>Q("PIXEL"),title:"Planta isométrica em Pixel Art",children:[l.jsx(ky,{size:13}),l.jsx("span",{children:"Pixel Art"})]}),l.jsxs(An,{type:"button",$active:F==="3D",onClick:()=>Q("3D"),title:"Maquete tridimensional interativa",children:[l.jsx(Sy,{size:13}),l.jsx("span",{children:"3D"})]}),F==="3D"&&l.jsxs(l.Fragment,{children:[l.jsx(vo,{"aria-hidden":"true"}),l.jsx(An,{type:"button",$active:Me==="ISO",onClick:()=>{ye(null),ae("ISO")},children:"ISO"}),l.jsx(An,{type:"button",$active:Me==="TOP",onClick:()=>ae("TOP"),children:"Topo"}),l.jsx(An,{type:"button",$active:Me==="FOCUS",onClick:()=>ae("FOCUS"),children:"Foco"}),l.jsx(An,{type:"button",$active:Me==="ORBIT",onClick:()=>ae(g=>g==="ORBIT"?"ISO":"ORBIT"),title:"Giro orbital suave ao redor da maquete",children:"360°"}),l.jsx(vo,{"aria-hidden":"true"}),l.jsxs(An,{type:"button",$active:Ot.furniture,onClick:()=>vt("furniture"),title:"Alternar mobiliário 3D",children:[l.jsx(vy,{size:13}),l.jsx("span",{children:"Mobiliário"})]}),l.jsxs(An,{type:"button",$active:Ot.labels,onClick:()=>vt("labels"),title:"Alternar rótulos das estações",children:[l.jsx(by,{size:13}),l.jsx("span",{children:"Rótulos"})]})]}),l.jsx(vo,{"aria-hidden":"true"}),l.jsx(An,{type:"button",onClick:()=>w(!0),title:"Recolher barra de visualização","aria-label":"Recolher barra de visualização","aria-expanded":"true",children:l.jsx(bc,{size:14,style:{transform:"rotate(180deg)"}})})]})})}),l.jsxs(Sv,{children:[(()=>{const R=[...Ke.map(P=>({machine:P,info:Rc(P,_e)})).filter(({info:P})=>P.isInactive24h).filter(({machine:P})=>!X.some(Z=>Number(Z.machine_id)===Number(P.id)&&Z.metric_name==="INACTIVITY_24H"&&Z.status!=="RESOLVED")).map(({machine:P,info:Z})=>({id:`live-inact-${P.id}`,machine_id:P.id,hostname:P.hostname,unit_name:P.unit_name||(ze==null?void 0:ze.name)||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"Inativo >24h",message:Z.mode==="OFFLINE"?`Sem comunicação há ${bo(Z.seconds)} (>24h).`:`Ligado sem interação há ${bo(Z.seconds)} (>24h).`})),...X],j=R.filter(P=>P.status!=="RESOLVED").length;return xe?l.jsxs(kv,{type:"button",onClick:()=>Se(!1),title:"Expandir painel lateral de rede, setores e alertas","aria-expanded":"false",children:[l.jsx(wy,{size:15}),l.jsx("span",{children:"Painel"}),j>0&&l.jsx("span",{className:"alert-pill",children:j})]}):l.jsxs(Cv,{"aria-label":"Resumo da rede, setores e alertas",children:[l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsx("span",{className:"sec-title",children:"Rede global"}),l.jsxs("div",{className:"sec-actions",children:[l.jsxs("span",{className:"sec-meta",children:[at.total," PCs"]}),l.jsx(el,{type:"button",onClick:()=>Se(!0),title:"Recolher painel lateral","aria-label":"Recolher painel lateral",children:l.jsx(Mh,{size:14})})]})]}),l.jsxs(Ev,{children:[l.jsxs(Zi,{$color:ie.colors.status.NORMAL,children:[l.jsx("span",{className:"num",children:at.NORMAL+at.WARNING+at.CRITICAL}),l.jsx("span",{className:"lbl",children:"Online"})]}),l.jsxs(Zi,{$color:ie.colors.status.WARNING,children:[l.jsx("span",{className:"num",children:at.WARNING}),l.jsx("span",{className:"lbl",children:"Atenção"})]}),l.jsxs(Zi,{$color:ie.colors.status.CRITICAL,children:[l.jsx("span",{className:"num",children:at.CRITICAL}),l.jsx("span",{className:"lbl",children:"Crítico"})]}),l.jsxs(Zi,{$color:ie.colors.status.OFFLINE,children:[l.jsx("span",{className:"num",children:at.OFFLINE}),l.jsx("span",{className:"lbl",children:"Offline"})]})]})]}),l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsxs("span",{className:"sec-title",children:["Setores",l.jsxs("span",{className:"sec-meta",children:["(",((ze==null?void 0:ze.sectors)||[]).length,")"]})]}),l.jsxs("div",{className:"sec-actions",children:[je&&l.jsxs(Bp,{type:"button",onClick:()=>{ye(null),ae("ISO")},title:"Voltar para a visão geral da maquete",children:[l.jsx(dy,{size:12}),l.jsx("span",{children:"Geral"})]}),Bt&&ze&&l.jsxs(Bp,{type:"button",onClick:()=>yt("CREATE_SECTOR"),title:"Criar novo setor nesta unidade",children:[l.jsx(vp,{size:12}),l.jsx("span",{children:"Setor"})]})]})]}),((ze==null?void 0:ze.sectors)||[]).length===0?l.jsxs(Up,{children:["Nenhum setor cadastrado."," ",Bt&&'Use "+ Setor" para adicionar uma sala.']}):l.jsx(jv,{children:((ze==null?void 0:ze.sectors)||[]).map(P=>{const Z=Ke.filter(Te=>Number(Te.sector_id)===Number(P.id)),Oe=je===P.id;return l.jsxs(_v,{$selected:Oe,onClick:()=>{Oe?(ye(null),ae("ISO")):(ye(P.id),ae("SECTOR"))},title:`Filtrar e aproximar no setor ${me(P.name)}`,children:[l.jsxs("div",{className:"s-info",children:[l.jsx("div",{className:"s-name",children:me(P.name)}),l.jsx("div",{className:"s-code",children:P.code})]}),l.jsxs("div",{className:"s-right",children:[l.jsx("span",{className:"s-count",children:Z.length}),Bt&&l.jsxs("div",{className:"s-controls",children:[l.jsx(el,{type:"button",title:`Editar setor ${me(P.name)}`,"aria-label":`Editar setor ${me(P.name)}`,onClick:Te=>{Te.stopPropagation(),yt("EDIT_SECTOR",P)},children:l.jsx(bp,{size:13})}),l.jsx(el,{type:"button",$danger:!0,title:`Excluir setor ${me(P.name)}`,"aria-label":`Excluir setor ${me(P.name)}`,onClick:Te=>{Te.stopPropagation(),yt("DELETE_SECTOR",P)},children:l.jsx(qc,{size:13})})]})]})]},P.id)})})]}),l.jsxs(Tc,{children:[l.jsxs(Ic,{children:[l.jsx("span",{className:"sec-title",children:"Alertas recentes"}),l.jsxs("span",{className:"sec-meta",children:[j," ",j===1?"ativo":"ativos"]})]}),R.length===0?l.jsx(Up,{children:"Nenhum alerta crítico ou de inatividade (>24h) no momento."}):R.slice(0,5).map(P=>l.jsxs(Nv,{type:"button",$severity:P.severity,$clickable:!!P.machine_id,onClick:()=>{P.machine_id&&(de(Number(P.machine_id)),ae("FOCUS"))},title:P.machine_id?"Clique para focar esta estação":void 0,children:[l.jsxs("div",{className:"a-top",children:[l.jsx("span",{children:me(P.hostname||`PC #${P.machine_id}`)}),l.jsx("span",{className:"a-tag",children:P.metric_name==="INACTIVITY_24H"&&P.status!=="RESOLVED"?"Inativo >24h":P.status||P.severity})]}),l.jsx("div",{className:"a-msg",children:me(P.message)}),l.jsxs("div",{className:"a-meta",children:[me(P.unit_name||""),P.external_ticket_id?` · #${P.external_ticket_id}`:""]})]},P.id||P.incident_key))]})]})})(),l.jsx(D1,{diagnostics:he,units:m,chatMessages:fe,taskCatalog:ee,currentUser:t.user||{name:"Operador",role:"VIEWER"},onDispatchTask:Ut,onLoadPrinters:q,onRefreshTelemetryNow:ot,onUpdateMachineAgent:tn,onSendMessage:Xn,onUpdateLocation:nn,onDeleteMachine:Er,onFocusCamera:()=>ae("FOCUS")})]}),l.jsxs(Tv,{children:[l.jsxs(Iv,{type:"button",$collapsed:G,onClick:()=>ve(g=>!g),"aria-expanded":!G,"aria-controls":"rmm-bottom-dock","aria-label":G?"Expandir lista de computadores":"Recolher lista de computadores",children:[l.jsx("span",{className:"arrow","aria-hidden":"true",children:l.jsx(bc,{size:13})}),l.jsx("span",{children:G?`${Ke.length} ${Ke.length===1?"estação":"estações"} na unidade`:"Ocultar estações"})]}),l.jsxs(Rv,{id:"rmm-bottom-dock",$collapsed:G,"aria-hidden":G,children:[l.jsxs($v,{children:[l.jsxs("div",{children:[l.jsx("div",{className:"dock-title",children:me((ze==null?void 0:ze.name)||"Unidade")}),l.jsxs("div",{className:"dock-sub",children:[En.length," de ",Ke.length," estações"]})]}),l.jsxs("div",{className:"search-wrap",children:[l.jsx("span",{className:"search-icon",children:l.jsx(hy,{size:13})}),l.jsx("input",{className:"dock-search",type:"text","aria-label":"Filtrar estações por hostname, IP ou setor",placeholder:"Filtrar hostname, IP...",value:I,onChange:g=>K(g.target.value)})]})]}),En.length===0&&l.jsxs("div",{style:{fontSize:"0.78rem",color:ie.colors.textSecondary,display:"flex",alignItems:"center",gap:"12px"},children:[l.jsx("span",{children:"Nenhuma estação encontrada nesta unidade."}),l.jsx("button",{type:"button",onClick:It,style:{background:"transparent",border:"none",padding:0,cursor:"pointer",color:ie.colors.brandPrimary,textDecoration:"underline",fontWeight:600,fontSize:"inherit"},children:"Baixar Agente (.exe)"})]}),En.map(g=>{const R=ie.colors.status[g.health_status]||ie.colors.status.NORMAL,j=(Rt==null?void 0:Rt.id)===g.id,P=Math.min(100,Math.max(0,Number(g.cpu_usage_pct||0))),Z=Math.min(100,Math.max(0,Number(g.ram_usage_pct||0))),Oe=Math.min(100,Math.max(0,Number(g.disk_usage_pct||0))),Te=Math.max(0,Math.floor(Number(g.idle_seconds||0))),bt=vh(g.agent_version,"2.3.0"),$e=Rc(g,_e),jt=g.last_seen_at?Math.max(0,Math.floor((_e-new Date(g.last_seen_at).getTime())/1e3)):0,_n=$e.isInactive24h?`Inativo >24h (${bo($e.seconds)})`:g.health_status==="OFFLINE"?`Desligado há ${bo(jt)}`:bt?`Ativo (${g.agent_version||"2.2.0"})`:Te<180?`Em uso (${bo(Te)})`:`Ocioso há ${bo(Te)}`,wt=$e.isInactive24h?ie.colors.status.CRITICAL:g.health_status==="OFFLINE"?ie.colors.status.OFFLINE:Te<180?ie.colors.status.NORMAL:ie.colors.status.WARNING,rn=g.health_status==="NORMAL"?"Online":g.health_status==="WARNING"?"Atenção":g.health_status==="CRITICAL"?"Crítico":"Offline";return l.jsxs(Av,{type:"button",$selected:j,$inact:$e.isInactive24h,$prnOk:!!g.spooler_running,onClick:()=>{de(g.id),ae("FOCUS")},children:[l.jsxs("div",{className:"n-top",children:[l.jsxs("span",{className:"n-sector",children:[l.jsx(Dp,{$color:R}),g.sector_code]}),l.jsx("span",{children:rn})]}),l.jsxs("div",{className:"n-host",children:[l.jsx("span",{children:g.hostname}),l.jsx("span",{className:"n-prn",title:g.spooler_running?"Spooler de impressão ativo":"Spooler de impressão parado",children:l.jsx(Co,{size:13})})]}),l.jsxs("div",{className:"n-metrics",children:["CPU ",P.toFixed(0),"% · RAM ",Z.toFixed(0),"% · ",g.ip_address]}),l.jsxs("div",{className:"n-activity",style:{color:wt},children:[$e.isInactive24h&&l.jsx(gl,{size:12}),l.jsx("span",{children:_n})]}),l.jsxs("div",{className:"n-bars",children:[l.jsx("div",{className:"bar-track",title:`CPU: ${P.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${P}%`,background:ie.colors.status.NORMAL}})}),l.jsx("div",{className:"bar-track",title:`RAM: ${Z.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${Z}%`,background:ie.colors.brandPrimaryLight}})}),l.jsx("div",{className:"bar-track",title:`Disco: ${Oe.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${Oe}%`,background:ie.colors.status.OFFLINE}})})]})]},g.id)})]})]})]}):l.jsx(uv,{children:l.jsxs(N.Suspense,{fallback:l.jsx(dv,{children:"Carregando módulo..."}),children:[A==="INVENTORY"&&l.jsx(nv,{token:t.token,units:m,allMachines:T,currentUser:t.user,latestAgentVersion:(ne==null?void 0:ne.latest_version)||"2.6.2-native-exe",onOpenMachineInMap:Zn,onUpdateLocation:nn,onRevokeMachine:Jn,onRefreshFleet:()=>Re(t.token,x,H)}),A==="MONITORING"&&l.jsx(rv,{token:t.token,units:m,allMachines:T,alerts:X,currentUser:t.user,latestAuditEvent:le,onOpenMachineInMap:Zn,onRefreshFleet:()=>Re(t.token,x,H)}),A==="SETTINGS"&&l.jsx(ov,{token:t.token,currentUser:t.user,allMachines:T,agentInfo:ne,onDownloadAgent:It,onRevokeMachine:Jn})]})})]}),l.jsx(Z1,{isOpen:Tt.isOpen,initialMode:Tt.mode,units:m,activeUnit:ze,targetSector:Tt.targetSector,machines:Ke,onClose:pt,onCreateUnit:jn,onUpdateUnit:Qt,onDeleteUnit:Vr,onCreateSector:Wr,onUpdateSector:Gr,onDeleteSector:jr}),d.open&&l.jsx(Pv,{onClick:()=>!d.busy&&p({open:!1,busy:!1,resultMsg:""}),children:l.jsxs(Mv,{onClick:g=>g.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsx("h3",{children:"Confirmar atualização global de agentes"}),l.jsxs("p",{children:["Esta operação enviará ordem de atualização silenciosa (com verificação obrigatória SHA-256) para todas as ",l.jsxs("strong",{children:[at.total," estação(ões)"]})," cadastradas no painel."]}),d.resultMsg&&l.jsx("div",{className:"modal-result",children:d.resultMsg}),l.jsxs("div",{className:"modal-actions",children:[l.jsx(Ov,{type:"button",disabled:d.busy,onClick:()=>p({open:!1,busy:!1,resultMsg:""}),children:d.resultMsg?"Fechar":"Cancelar"}),!d.resultMsg&&l.jsx(Lv,{type:"button",disabled:d.busy,onClick:Ro,children:d.busy?"Enviando...":"Confirmar atualização"})]})]})})]})}O0.createRoot(document.getElementById("root")).render(l.jsx(Lt.StrictMode,{children:l.jsx(zv,{})}));export{qc as A,Sl as E,Yc as I,Dv as S,lu as a,Jc as b,N0 as c,O0 as d,fy as e,me as f,E as g,Vv as h,vh as i,l as j,vy as k,hy as l,Gn as m,Ui as n,_y as o,bp as p,jy as q,N as r,Hv as s,Bi as t,Ye as u,Uv as v,Bv as w,Ey as x,Cy as y,vp as z};
