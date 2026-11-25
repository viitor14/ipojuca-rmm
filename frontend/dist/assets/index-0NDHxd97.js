const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DigitalTwin3D-faEbB50Z.js","assets/Gltf-BUwfhFBz.js","assets/ModelShowcase-DnlXrfUW.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const p of d)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&c(m)}).observe(document,{childList:!0,subtree:!0});function i(d){const p={};return d.integrity&&(p.integrity=d.integrity),d.referrerPolicy&&(p.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?p.credentials="include":d.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function c(d){if(d.ep)return;d.ep=!0;const p=i(d);fetch(d.href,p)}})();function j0(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var rc={exports:{}},cs={},oc={exports:{}},Ae={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uf;function _0(){if(Uf)return Ae;Uf=1;var n=Symbol.for("react.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),p=Symbol.for("react.provider"),m=Symbol.for("react.context"),y=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),j=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),R=Symbol.iterator;function A(b){return b===null||typeof b!="object"?null:(b=R&&b[R]||b["@@iterator"],typeof b=="function"?b:null)}var F={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},oe=Object.assign,W={};function ae(b,T,q){this.props=b,this.context=T,this.refs=W,this.updater=q||F}ae.prototype.isReactComponent={},ae.prototype.setState=function(b,T){if(typeof b!="object"&&typeof b!="function"&&b!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,b,T,"setState")},ae.prototype.forceUpdate=function(b){this.updater.enqueueForceUpdate(this,b,"forceUpdate")};function V(){}V.prototype=ae.prototype;function X(b,T,q){this.props=b,this.context=T,this.refs=W,this.updater=q||F}var xe=X.prototype=new V;xe.constructor=X,oe(xe,ae.prototype),xe.isPureReactComponent=!0;var Te=Array.isArray,Re=Object.prototype.hasOwnProperty,fe={current:null},H={key:!0,ref:!0,__self:!0,__source:!0};function de(b,T,q){var Y,ve={},ge=null,Se=null;if(T!=null)for(Y in T.ref!==void 0&&(Se=T.ref),T.key!==void 0&&(ge=""+T.key),T)Re.call(T,Y)&&!H.hasOwnProperty(Y)&&(ve[Y]=T[Y]);var Q=arguments.length-2;if(Q===1)ve.children=q;else if(1<Q){for(var ke=Array(Q),_e=0;_e<Q;_e++)ke[_e]=arguments[_e+2];ve.children=ke}if(b&&b.defaultProps)for(Y in Q=b.defaultProps,Q)ve[Y]===void 0&&(ve[Y]=Q[Y]);return{$$typeof:n,type:b,key:ge,ref:Se,props:ve,_owner:fe.current}}function We(b,T){return{$$typeof:n,type:b.type,key:T,ref:b.ref,props:b.props,_owner:b._owner}}function J(b){return typeof b=="object"&&b!==null&&b.$$typeof===n}function ne(b){var T={"=":"=0",":":"=2"};return"$"+b.replace(/[=:]/g,function(q){return T[q]})}var ee=/\/+/g;function te(b,T){return typeof b=="object"&&b!==null&&b.key!=null?ne(""+b.key):T.toString(36)}function Ne(b,T,q,Y,ve){var ge=typeof b;(ge==="undefined"||ge==="boolean")&&(b=null);var Se=!1;if(b===null)Se=!0;else switch(ge){case"string":case"number":Se=!0;break;case"object":switch(b.$$typeof){case n:case o:Se=!0}}if(Se)return Se=b,ve=ve(Se),b=Y===""?"."+te(Se,0):Y,Te(ve)?(q="",b!=null&&(q=b.replace(ee,"$&/")+"/"),Ne(ve,T,q,"",function(_e){return _e})):ve!=null&&(J(ve)&&(ve=We(ve,q+(!ve.key||Se&&Se.key===ve.key?"":(""+ve.key).replace(ee,"$&/")+"/")+b)),T.push(ve)),1;if(Se=0,Y=Y===""?".":Y+":",Te(b))for(var Q=0;Q<b.length;Q++){ge=b[Q];var ke=Y+te(ge,Q);Se+=Ne(ge,T,q,ke,ve)}else if(ke=A(b),typeof ke=="function")for(b=ke.call(b),Q=0;!(ge=b.next()).done;)ge=ge.value,ke=Y+te(ge,Q++),Se+=Ne(ge,T,q,ke,ve);else if(ge==="object")throw T=String(b),Error("Objects are not valid as a React child (found: "+(T==="[object Object]"?"object with keys {"+Object.keys(b).join(", ")+"}":T)+"). If you meant to render a collection of children, use an array instead.");return Se}function Ce(b,T,q){if(b==null)return b;var Y=[],ve=0;return Ne(b,Y,"","",function(ge){return T.call(q,ge,ve++)}),Y}function Me(b){if(b._status===-1){var T=b._result;T=T(),T.then(function(q){(b._status===0||b._status===-1)&&(b._status=1,b._result=q)},function(q){(b._status===0||b._status===-1)&&(b._status=2,b._result=q)}),b._status===-1&&(b._status=0,b._result=T)}if(b._status===1)return b._result.default;throw b._result}var Ee={current:null},O={transition:null},Z={ReactCurrentDispatcher:Ee,ReactCurrentBatchConfig:O,ReactCurrentOwner:fe};function M(){throw Error("act(...) is not supported in production builds of React.")}return Ae.Children={map:Ce,forEach:function(b,T,q){Ce(b,function(){T.apply(this,arguments)},q)},count:function(b){var T=0;return Ce(b,function(){T++}),T},toArray:function(b){return Ce(b,function(T){return T})||[]},only:function(b){if(!J(b))throw Error("React.Children.only expected to receive a single React element child.");return b}},Ae.Component=ae,Ae.Fragment=i,Ae.Profiler=d,Ae.PureComponent=X,Ae.StrictMode=c,Ae.Suspense=g,Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Z,Ae.act=M,Ae.cloneElement=function(b,T,q){if(b==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+b+".");var Y=oe({},b.props),ve=b.key,ge=b.ref,Se=b._owner;if(T!=null){if(T.ref!==void 0&&(ge=T.ref,Se=fe.current),T.key!==void 0&&(ve=""+T.key),b.type&&b.type.defaultProps)var Q=b.type.defaultProps;for(ke in T)Re.call(T,ke)&&!H.hasOwnProperty(ke)&&(Y[ke]=T[ke]===void 0&&Q!==void 0?Q[ke]:T[ke])}var ke=arguments.length-2;if(ke===1)Y.children=q;else if(1<ke){Q=Array(ke);for(var _e=0;_e<ke;_e++)Q[_e]=arguments[_e+2];Y.children=Q}return{$$typeof:n,type:b.type,key:ve,ref:ge,props:Y,_owner:Se}},Ae.createContext=function(b){return b={$$typeof:m,_currentValue:b,_currentValue2:b,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},b.Provider={$$typeof:p,_context:b},b.Consumer=b},Ae.createElement=de,Ae.createFactory=function(b){var T=de.bind(null,b);return T.type=b,T},Ae.createRef=function(){return{current:null}},Ae.forwardRef=function(b){return{$$typeof:y,render:b}},Ae.isValidElement=J,Ae.lazy=function(b){return{$$typeof:_,_payload:{_status:-1,_result:b},_init:Me}},Ae.memo=function(b,T){return{$$typeof:j,type:b,compare:T===void 0?null:T}},Ae.startTransition=function(b){var T=O.transition;O.transition={};try{b()}finally{O.transition=T}},Ae.unstable_act=M,Ae.useCallback=function(b,T){return Ee.current.useCallback(b,T)},Ae.useContext=function(b){return Ee.current.useContext(b)},Ae.useDebugValue=function(){},Ae.useDeferredValue=function(b){return Ee.current.useDeferredValue(b)},Ae.useEffect=function(b,T){return Ee.current.useEffect(b,T)},Ae.useId=function(){return Ee.current.useId()},Ae.useImperativeHandle=function(b,T,q){return Ee.current.useImperativeHandle(b,T,q)},Ae.useInsertionEffect=function(b,T){return Ee.current.useInsertionEffect(b,T)},Ae.useLayoutEffect=function(b,T){return Ee.current.useLayoutEffect(b,T)},Ae.useMemo=function(b,T){return Ee.current.useMemo(b,T)},Ae.useReducer=function(b,T,q){return Ee.current.useReducer(b,T,q)},Ae.useRef=function(b){return Ee.current.useRef(b)},Ae.useState=function(b){return Ee.current.useState(b)},Ae.useSyncExternalStore=function(b,T,q){return Ee.current.useSyncExternalStore(b,T,q)},Ae.useTransition=function(){return Ee.current.useTransition()},Ae.version="18.3.1",Ae}var Hf;function Qc(){return Hf||(Hf=1,oc.exports=_0()),oc.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wf;function N0(){if(Wf)return cs;Wf=1;var n=Qc(),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,d=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function m(y,g,j){var _,R={},A=null,F=null;j!==void 0&&(A=""+j),g.key!==void 0&&(A=""+g.key),g.ref!==void 0&&(F=g.ref);for(_ in g)c.call(g,_)&&!p.hasOwnProperty(_)&&(R[_]=g[_]);if(y&&y.defaultProps)for(_ in g=y.defaultProps,g)R[_]===void 0&&(R[_]=g[_]);return{$$typeof:o,type:y,key:A,ref:F,props:R,_owner:d.current}}return cs.Fragment=i,cs.jsx=m,cs.jsxs=m,cs}var Vf;function T0(){return Vf||(Vf=1,rc.exports=N0()),rc.exports}var l=T0(),N=Qc();const Pt=j0(N);var Li={},sc={exports:{}},Qt={},ic={exports:{}},lc={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gf;function R0(){return Gf||(Gf=1,(function(n){function o(O,Z){var M=O.length;O.push(Z);e:for(;0<M;){var b=M-1>>>1,T=O[b];if(0<d(T,Z))O[b]=Z,O[M]=T,M=b;else break e}}function i(O){return O.length===0?null:O[0]}function c(O){if(O.length===0)return null;var Z=O[0],M=O.pop();if(M!==Z){O[0]=M;e:for(var b=0,T=O.length,q=T>>>1;b<q;){var Y=2*(b+1)-1,ve=O[Y],ge=Y+1,Se=O[ge];if(0>d(ve,M))ge<T&&0>d(Se,ve)?(O[b]=Se,O[ge]=M,b=ge):(O[b]=ve,O[Y]=M,b=Y);else if(ge<T&&0>d(Se,M))O[b]=Se,O[ge]=M,b=ge;else break e}}return Z}function d(O,Z){var M=O.sortIndex-Z.sortIndex;return M!==0?M:O.id-Z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var p=performance;n.unstable_now=function(){return p.now()}}else{var m=Date,y=m.now();n.unstable_now=function(){return m.now()-y}}var g=[],j=[],_=1,R=null,A=3,F=!1,oe=!1,W=!1,ae=typeof setTimeout=="function"?setTimeout:null,V=typeof clearTimeout=="function"?clearTimeout:null,X=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function xe(O){for(var Z=i(j);Z!==null;){if(Z.callback===null)c(j);else if(Z.startTime<=O)c(j),Z.sortIndex=Z.expirationTime,o(g,Z);else break;Z=i(j)}}function Te(O){if(W=!1,xe(O),!oe)if(i(g)!==null)oe=!0,Me(Re);else{var Z=i(j);Z!==null&&Ee(Te,Z.startTime-O)}}function Re(O,Z){oe=!1,W&&(W=!1,V(de),de=-1),F=!0;var M=A;try{for(xe(Z),R=i(g);R!==null&&(!(R.expirationTime>Z)||O&&!ne());){var b=R.callback;if(typeof b=="function"){R.callback=null,A=R.priorityLevel;var T=b(R.expirationTime<=Z);Z=n.unstable_now(),typeof T=="function"?R.callback=T:R===i(g)&&c(g),xe(Z)}else c(g);R=i(g)}if(R!==null)var q=!0;else{var Y=i(j);Y!==null&&Ee(Te,Y.startTime-Z),q=!1}return q}finally{R=null,A=M,F=!1}}var fe=!1,H=null,de=-1,We=5,J=-1;function ne(){return!(n.unstable_now()-J<We)}function ee(){if(H!==null){var O=n.unstable_now();J=O;var Z=!0;try{Z=H(!0,O)}finally{Z?te():(fe=!1,H=null)}}else fe=!1}var te;if(typeof X=="function")te=function(){X(ee)};else if(typeof MessageChannel<"u"){var Ne=new MessageChannel,Ce=Ne.port2;Ne.port1.onmessage=ee,te=function(){Ce.postMessage(null)}}else te=function(){ae(ee,0)};function Me(O){H=O,fe||(fe=!0,te())}function Ee(O,Z){de=ae(function(){O(n.unstable_now())},Z)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(O){O.callback=null},n.unstable_continueExecution=function(){oe||F||(oe=!0,Me(Re))},n.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):We=0<O?Math.floor(1e3/O):5},n.unstable_getCurrentPriorityLevel=function(){return A},n.unstable_getFirstCallbackNode=function(){return i(g)},n.unstable_next=function(O){switch(A){case 1:case 2:case 3:var Z=3;break;default:Z=A}var M=A;A=Z;try{return O()}finally{A=M}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(O,Z){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var M=A;A=O;try{return Z()}finally{A=M}},n.unstable_scheduleCallback=function(O,Z,M){var b=n.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?b+M:b):M=b,O){case 1:var T=-1;break;case 2:T=250;break;case 5:T=1073741823;break;case 4:T=1e4;break;default:T=5e3}return T=M+T,O={id:_++,callback:Z,priorityLevel:O,startTime:M,expirationTime:T,sortIndex:-1},M>b?(O.sortIndex=M,o(j,O),i(g)===null&&O===i(j)&&(W?(V(de),de=-1):W=!0,Ee(Te,M-b))):(O.sortIndex=T,o(g,O),oe||F||(oe=!0,Me(Re))),O},n.unstable_shouldYield=ne,n.unstable_wrapCallback=function(O){var Z=A;return function(){var M=A;A=Z;try{return O.apply(this,arguments)}finally{A=M}}}})(lc)),lc}var qf;function I0(){return qf||(qf=1,ic.exports=R0()),ic.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yf;function $0(){if(Yf)return Qt;Yf=1;var n=Qc(),o=I0();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var c=new Set,d={};function p(e,t){m(e,t),m(e+"Capture",t)}function m(e,t){for(d[e]=t,e=0;e<t.length;e++)c.add(t[e])}var y=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,j=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},R={};function A(e){return g.call(R,e)?!0:g.call(_,e)?!1:j.test(e)?R[e]=!0:(_[e]=!0,!1)}function F(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function oe(e,t,r,s){if(t===null||typeof t>"u"||F(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function W(e,t,r,s,a,u,f){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=a,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=u,this.removeEmptyString=f}var ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ae[e]=new W(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ae[t]=new W(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ae[e]=new W(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ae[e]=new W(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ae[e]=new W(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ae[e]=new W(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ae[e]=new W(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ae[e]=new W(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ae[e]=new W(e,5,!1,e.toLowerCase(),null,!1,!1)});var V=/[\-:]([a-z])/g;function X(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(V,X);ae[t]=new W(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(V,X);ae[t]=new W(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(V,X);ae[t]=new W(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ae[e]=new W(e,1,!1,e.toLowerCase(),null,!1,!1)}),ae.xlinkHref=new W("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ae[e]=new W(e,1,!1,e.toLowerCase(),null,!0,!0)});function xe(e,t,r,s){var a=ae.hasOwnProperty(t)?ae[t]:null;(a!==null?a.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(oe(t,r,a,s)&&(r=null),s||a===null?A(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):a.mustUseProperty?e[a.propertyName]=r===null?a.type===3?!1:"":r:(t=a.attributeName,s=a.attributeNamespace,r===null?e.removeAttribute(t):(a=a.type,r=a===3||a===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var Te=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Re=Symbol.for("react.element"),fe=Symbol.for("react.portal"),H=Symbol.for("react.fragment"),de=Symbol.for("react.strict_mode"),We=Symbol.for("react.profiler"),J=Symbol.for("react.provider"),ne=Symbol.for("react.context"),ee=Symbol.for("react.forward_ref"),te=Symbol.for("react.suspense"),Ne=Symbol.for("react.suspense_list"),Ce=Symbol.for("react.memo"),Me=Symbol.for("react.lazy"),Ee=Symbol.for("react.offscreen"),O=Symbol.iterator;function Z(e){return e===null||typeof e!="object"?null:(e=O&&e[O]||e["@@iterator"],typeof e=="function"?e:null)}var M=Object.assign,b;function T(e){if(b===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);b=t&&t[1]||""}return`
`+b+e}var q=!1;function Y(e,t){if(!e||q)return"";q=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(k){var s=k}Reflect.construct(e,[],t)}else{try{t.call()}catch(k){s=k}e.call(t.prototype)}else{try{throw Error()}catch(k){s=k}e()}}catch(k){if(k&&s&&typeof k.stack=="string"){for(var a=k.stack.split(`
`),u=s.stack.split(`
`),f=a.length-1,h=u.length-1;1<=f&&0<=h&&a[f]!==u[h];)h--;for(;1<=f&&0<=h;f--,h--)if(a[f]!==u[h]){if(f!==1||h!==1)do if(f--,h--,0>h||a[f]!==u[h]){var x=`
`+a[f].replace(" at new "," at ");return e.displayName&&x.includes("<anonymous>")&&(x=x.replace("<anonymous>",e.displayName)),x}while(1<=f&&0<=h);break}}}finally{q=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?T(e):""}function ve(e){switch(e.tag){case 5:return T(e.type);case 16:return T("Lazy");case 13:return T("Suspense");case 19:return T("SuspenseList");case 0:case 2:case 15:return e=Y(e.type,!1),e;case 11:return e=Y(e.type.render,!1),e;case 1:return e=Y(e.type,!0),e;default:return""}}function ge(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case H:return"Fragment";case fe:return"Portal";case We:return"Profiler";case de:return"StrictMode";case te:return"Suspense";case Ne:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case ne:return(e.displayName||"Context")+".Consumer";case J:return(e._context.displayName||"Context")+".Provider";case ee:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ce:return t=e.displayName||null,t!==null?t:ge(e.type)||"Memo";case Me:t=e._payload,e=e._init;try{return ge(e(t))}catch{}}return null}function Se(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ge(t);case 8:return t===de?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Q(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ke(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function _e(e){var t=ke(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var a=r.get,u=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(f){s=""+f,u.call(this,f)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(f){s=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yt(e){e._valueTracker||(e._valueTracker=_e(e))}function Kt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=ke(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function pt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function kt(e,t){var r=t.checked;return M({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Nn(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=Q(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Be(e,t){t=t.checked,t!=null&&xe(e,"checked",t,!1)}function Ve(e,t){Be(e,t);var r=Q(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Lt(e,t.type,r):t.hasOwnProperty("defaultValue")&&Lt(e,t.type,Q(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function I(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Lt(e,t,r){(t!=="number"||pt(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Ot=Array.isArray;function ut(e,t,r,s){if(e=e.options,t){t={};for(var a=0;a<r.length;a++)t["$"+r[a]]=!0;for(r=0;r<e.length;r++)a=t.hasOwnProperty("$"+e[r].value),e[r].selected!==a&&(e[r].selected=a),a&&s&&(e[r].defaultSelected=!0)}else{for(r=""+Q(r),t=null,a=0;a<e.length;a++){if(e[a].value===r){e[a].selected=!0,s&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function tt(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return M({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nt(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(i(92));if(Ot(r)){if(1<r.length)throw Error(i(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Q(r)}}function Xt(e,t){var r=Q(t.value),s=Q(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function on(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function sn(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function lt(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?sn(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tn,Zn=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,a){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tn=Tn||document.createElement("div"),Tn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Jt(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Dt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},G=["Webkit","ms","Moz","O"];Object.keys(Dt).forEach(function(e){G.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Dt[t]=Dt[e]})});function at(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Dt.hasOwnProperty(e)&&Dt[e]?(""+t).trim():t+"px"}function ln(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,a=at(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,a):e[r]=a}}var To=M({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function er(e,t){if(t){if(To[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function an(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var tr=null;function nr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var C=null,re=null,P=null;function B(e){if(e=Yo(e)){if(typeof C!="function")throw Error(i(280));var t=e.stateNode;t&&(t=Ks(t),C(e.stateNode,e.type,t))}}function ye(e){re?P?P.push(e):P=[e]:re=e}function qe(){if(re){var e=re,t=P;if(P=re=null,B(e),t)for(e=0;e<t.length;e++)B(t[e])}}function Pe(e,t){return e(t)}function Bt(){}var Qe=!1;function $(e,t,r){if(Qe)return e(t,r);Qe=!0;try{return Pe(e,t,r)}finally{Qe=!1,(re!==null||P!==null)&&(Bt(),qe())}}function K(e,t){var r=e.stateNode;if(r===null)return null;var s=Ks(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(i(231,t,typeof r));return r}var me=!1;if(y)try{var Le={};Object.defineProperty(Le,"passive",{get:function(){me=!0}}),window.addEventListener("test",Le,Le),window.removeEventListener("test",Le,Le)}catch{me=!1}function vt(e,t,r,s,a,u,f,h,x){var k=Array.prototype.slice.call(arguments,3);try{t.apply(r,k)}catch(z){this.onError(z)}}var Ct=!1,Ut=null,Ht=!1,xn=null,ot={onError:function(e){Ct=!0,Ut=e}};function Nr(e,t,r,s,a,u,f,h,x){Ct=!1,Ut=null,vt.apply(ot,arguments)}function Ts(e,t,r,s,a,u,f,h,x){if(Nr.apply(this,arguments),Ct){if(Ct){var k=Ut;Ct=!1,Ut=null}else throw Error(i(198));Ht||(Ht=!0,xn=k)}}function Rn(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function rr(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function du(e){if(Rn(e)!==e)throw Error(i(188))}function Oh(e){var t=e.alternate;if(!t){if(t=Rn(e),t===null)throw Error(i(188));return t!==e?null:e}for(var r=e,s=t;;){var a=r.return;if(a===null)break;var u=a.alternate;if(u===null){if(s=a.return,s!==null){r=s;continue}break}if(a.child===u.child){for(u=a.child;u;){if(u===r)return du(a),e;if(u===s)return du(a),t;u=u.sibling}throw Error(i(188))}if(r.return!==s.return)r=a,s=u;else{for(var f=!1,h=a.child;h;){if(h===r){f=!0,r=a,s=u;break}if(h===s){f=!0,s=a,r=u;break}h=h.sibling}if(!f){for(h=u.child;h;){if(h===r){f=!0,r=u,s=a;break}if(h===s){f=!0,s=u,r=a;break}h=h.sibling}if(!f)throw Error(i(189))}}if(r.alternate!==s)throw Error(i(190))}if(r.tag!==3)throw Error(i(188));return r.stateNode.current===r?e:t}function fu(e){return e=Oh(e),e!==null?pu(e):null}function pu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=pu(e);if(t!==null)return t;e=e.sibling}return null}var hu=o.unstable_scheduleCallback,mu=o.unstable_cancelCallback,Mh=o.unstable_shouldYield,zh=o.unstable_requestPaint,dt=o.unstable_now,Fh=o.unstable_getCurrentPriorityLevel,kl=o.unstable_ImmediatePriority,gu=o.unstable_UserBlockingPriority,Rs=o.unstable_NormalPriority,Dh=o.unstable_LowPriority,xu=o.unstable_IdlePriority,Is=null,In=null;function Bh(e){if(In&&typeof In.onCommitFiberRoot=="function")try{In.onCommitFiberRoot(Is,e,void 0,(e.current.flags&128)===128)}catch{}}var yn=Math.clz32?Math.clz32:Wh,Uh=Math.log,Hh=Math.LN2;function Wh(e){return e>>>=0,e===0?32:31-(Uh(e)/Hh|0)|0}var $s=64,As=4194304;function Ro(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ps(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,a=e.suspendedLanes,u=e.pingedLanes,f=r&268435455;if(f!==0){var h=f&~a;h!==0?s=Ro(h):(u&=f,u!==0&&(s=Ro(u)))}else f=r&~a,f!==0?s=Ro(f):u!==0&&(s=Ro(u));if(s===0)return 0;if(t!==0&&t!==s&&(t&a)===0&&(a=s&-s,u=t&-t,a>=u||a===16&&(u&4194240)!==0))return t;if((s&4)!==0&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-yn(t),a=1<<r,s|=e[r],t&=~a;return s}function Vh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gh(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,a=e.expirationTimes,u=e.pendingLanes;0<u;){var f=31-yn(u),h=1<<f,x=a[f];x===-1?((h&r)===0||(h&s)!==0)&&(a[f]=Vh(h,t)):x<=t&&(e.expiredLanes|=h),u&=~h}}function Cl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function yu(){var e=$s;return $s<<=1,($s&4194240)===0&&($s=64),e}function El(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function Io(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-yn(t),e[t]=r}function qh(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var a=31-yn(r),u=1<<a;t[a]=0,s[a]=-1,e[a]=-1,r&=~u}}function jl(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-yn(r),a=1<<s;a&t|e[s]&t&&(e[s]|=t),r&=~a}}var Ge=0;function vu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var bu,_l,wu,Su,ku,Nl=!1,Ls=[],or=null,sr=null,ir=null,$o=new Map,Ao=new Map,lr=[],Yh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Cu(e,t){switch(e){case"focusin":case"focusout":or=null;break;case"dragenter":case"dragleave":sr=null;break;case"mouseover":case"mouseout":ir=null;break;case"pointerover":case"pointerout":$o.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ao.delete(t.pointerId)}}function Po(e,t,r,s,a,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:u,targetContainers:[a]},t!==null&&(t=Yo(t),t!==null&&_l(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Qh(e,t,r,s,a){switch(t){case"focusin":return or=Po(or,e,t,r,s,a),!0;case"dragenter":return sr=Po(sr,e,t,r,s,a),!0;case"mouseover":return ir=Po(ir,e,t,r,s,a),!0;case"pointerover":var u=a.pointerId;return $o.set(u,Po($o.get(u)||null,e,t,r,s,a)),!0;case"gotpointercapture":return u=a.pointerId,Ao.set(u,Po(Ao.get(u)||null,e,t,r,s,a)),!0}return!1}function Eu(e){var t=Tr(e.target);if(t!==null){var r=Rn(t);if(r!==null){if(t=r.tag,t===13){if(t=rr(r),t!==null){e.blockedOn=t,ku(e.priority,function(){wu(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Os(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Rl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);tr=s,r.target.dispatchEvent(s),tr=null}else return t=Yo(r),t!==null&&_l(t),e.blockedOn=r,!1;t.shift()}return!0}function ju(e,t,r){Os(e)&&r.delete(t)}function Kh(){Nl=!1,or!==null&&Os(or)&&(or=null),sr!==null&&Os(sr)&&(sr=null),ir!==null&&Os(ir)&&(ir=null),$o.forEach(ju),Ao.forEach(ju)}function Lo(e,t){e.blockedOn===t&&(e.blockedOn=null,Nl||(Nl=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Kh)))}function Oo(e){function t(a){return Lo(a,e)}if(0<Ls.length){Lo(Ls[0],e);for(var r=1;r<Ls.length;r++){var s=Ls[r];s.blockedOn===e&&(s.blockedOn=null)}}for(or!==null&&Lo(or,e),sr!==null&&Lo(sr,e),ir!==null&&Lo(ir,e),$o.forEach(t),Ao.forEach(t),r=0;r<lr.length;r++)s=lr[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<lr.length&&(r=lr[0],r.blockedOn===null);)Eu(r),r.blockedOn===null&&lr.shift()}var Gr=Te.ReactCurrentBatchConfig,Ms=!0;function Xh(e,t,r,s){var a=Ge,u=Gr.transition;Gr.transition=null;try{Ge=1,Tl(e,t,r,s)}finally{Ge=a,Gr.transition=u}}function Jh(e,t,r,s){var a=Ge,u=Gr.transition;Gr.transition=null;try{Ge=4,Tl(e,t,r,s)}finally{Ge=a,Gr.transition=u}}function Tl(e,t,r,s){if(Ms){var a=Rl(e,t,r,s);if(a===null)ql(e,t,s,zs,r),Cu(e,s);else if(Qh(a,e,t,r,s))s.stopPropagation();else if(Cu(e,s),t&4&&-1<Yh.indexOf(e)){for(;a!==null;){var u=Yo(a);if(u!==null&&bu(u),u=Rl(e,t,r,s),u===null&&ql(e,t,s,zs,r),u===a)break;a=u}a!==null&&s.stopPropagation()}else ql(e,t,s,null,r)}}var zs=null;function Rl(e,t,r,s){if(zs=null,e=nr(s),e=Tr(e),e!==null)if(t=Rn(e),t===null)e=null;else if(r=t.tag,r===13){if(e=rr(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return zs=e,null}function _u(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Fh()){case kl:return 1;case gu:return 4;case Rs:case Dh:return 16;case xu:return 536870912;default:return 16}default:return 16}}var ar=null,Il=null,Fs=null;function Nu(){if(Fs)return Fs;var e,t=Il,r=t.length,s,a="value"in ar?ar.value:ar.textContent,u=a.length;for(e=0;e<r&&t[e]===a[e];e++);var f=r-e;for(s=1;s<=f&&t[r-s]===a[u-s];s++);return Fs=a.slice(e,1<s?1-s:void 0)}function Ds(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Bs(){return!0}function Tu(){return!1}function Zt(e){function t(r,s,a,u,f){this._reactName=r,this._targetInst=a,this.type=s,this.nativeEvent=u,this.target=f,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(r=e[h],this[h]=r?r(u):u[h]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Bs:Tu,this.isPropagationStopped=Tu,this}return M(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Bs)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Bs)},persist:function(){},isPersistent:Bs}),t}var qr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},$l=Zt(qr),Mo=M({},qr,{view:0,detail:0}),Zh=Zt(Mo),Al,Pl,zo,Us=M({},Mo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ol,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zo&&(zo&&e.type==="mousemove"?(Al=e.screenX-zo.screenX,Pl=e.screenY-zo.screenY):Pl=Al=0,zo=e),Al)},movementY:function(e){return"movementY"in e?e.movementY:Pl}}),Ru=Zt(Us),em=M({},Us,{dataTransfer:0}),tm=Zt(em),nm=M({},Mo,{relatedTarget:0}),Ll=Zt(nm),rm=M({},qr,{animationName:0,elapsedTime:0,pseudoElement:0}),om=Zt(rm),sm=M({},qr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),im=Zt(sm),lm=M({},qr,{data:0}),Iu=Zt(lm),am={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},um={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function dm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=um[e])?!!t[e]:!1}function Ol(){return dm}var fm=M({},Mo,{key:function(e){if(e.key){var t=am[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ds(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?cm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ol,charCode:function(e){return e.type==="keypress"?Ds(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ds(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),pm=Zt(fm),hm=M({},Us,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),$u=Zt(hm),mm=M({},Mo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ol}),gm=Zt(mm),xm=M({},qr,{propertyName:0,elapsedTime:0,pseudoElement:0}),ym=Zt(xm),vm=M({},Us,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),bm=Zt(vm),wm=[9,13,27,32],Ml=y&&"CompositionEvent"in window,Fo=null;y&&"documentMode"in document&&(Fo=document.documentMode);var Sm=y&&"TextEvent"in window&&!Fo,Au=y&&(!Ml||Fo&&8<Fo&&11>=Fo),Pu=" ",Lu=!1;function Ou(e,t){switch(e){case"keyup":return wm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Yr=!1;function km(e,t){switch(e){case"compositionend":return Mu(t);case"keypress":return t.which!==32?null:(Lu=!0,Pu);case"textInput":return e=t.data,e===Pu&&Lu?null:e;default:return null}}function Cm(e,t){if(Yr)return e==="compositionend"||!Ml&&Ou(e,t)?(e=Nu(),Fs=Il=ar=null,Yr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Au&&t.locale!=="ko"?null:t.data;default:return null}}var Em={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Em[e.type]:t==="textarea"}function Fu(e,t,r,s){ye(s),t=qs(t,"onChange"),0<t.length&&(r=new $l("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var Do=null,Bo=null;function jm(e){rd(e,0)}function Hs(e){var t=Zr(e);if(Kt(t))return e}function _m(e,t){if(e==="change")return t}var Du=!1;if(y){var zl;if(y){var Fl="oninput"in document;if(!Fl){var Bu=document.createElement("div");Bu.setAttribute("oninput","return;"),Fl=typeof Bu.oninput=="function"}zl=Fl}else zl=!1;Du=zl&&(!document.documentMode||9<document.documentMode)}function Uu(){Do&&(Do.detachEvent("onpropertychange",Hu),Bo=Do=null)}function Hu(e){if(e.propertyName==="value"&&Hs(Bo)){var t=[];Fu(t,Bo,e,nr(e)),$(jm,t)}}function Nm(e,t,r){e==="focusin"?(Uu(),Do=t,Bo=r,Do.attachEvent("onpropertychange",Hu)):e==="focusout"&&Uu()}function Tm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Hs(Bo)}function Rm(e,t){if(e==="click")return Hs(t)}function Im(e,t){if(e==="input"||e==="change")return Hs(t)}function $m(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var vn=typeof Object.is=="function"?Object.is:$m;function Uo(e,t){if(vn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var a=r[s];if(!g.call(t,a)||!vn(e[a],t[a]))return!1}return!0}function Wu(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vu(e,t){var r=Wu(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Wu(r)}}function Gu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Gu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function qu(){for(var e=window,t=pt();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=pt(e.document)}return t}function Dl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Am(e){var t=qu(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Gu(r.ownerDocument.documentElement,r)){if(s!==null&&Dl(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=r.textContent.length,u=Math.min(s.start,a);s=s.end===void 0?u:Math.min(s.end,a),!e.extend&&u>s&&(a=s,s=u,u=a),a=Vu(r,u);var f=Vu(r,s);a&&f&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),u>s?(e.addRange(t),e.extend(f.node,f.offset)):(t.setEnd(f.node,f.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Pm=y&&"documentMode"in document&&11>=document.documentMode,Qr=null,Bl=null,Ho=null,Ul=!1;function Yu(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Ul||Qr==null||Qr!==pt(s)||(s=Qr,"selectionStart"in s&&Dl(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Ho&&Uo(Ho,s)||(Ho=s,s=qs(Bl,"onSelect"),0<s.length&&(t=new $l("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=Qr)))}function Ws(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Kr={animationend:Ws("Animation","AnimationEnd"),animationiteration:Ws("Animation","AnimationIteration"),animationstart:Ws("Animation","AnimationStart"),transitionend:Ws("Transition","TransitionEnd")},Hl={},Qu={};y&&(Qu=document.createElement("div").style,"AnimationEvent"in window||(delete Kr.animationend.animation,delete Kr.animationiteration.animation,delete Kr.animationstart.animation),"TransitionEvent"in window||delete Kr.transitionend.transition);function Vs(e){if(Hl[e])return Hl[e];if(!Kr[e])return e;var t=Kr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Qu)return Hl[e]=t[r];return e}var Ku=Vs("animationend"),Xu=Vs("animationiteration"),Ju=Vs("animationstart"),Zu=Vs("transitionend"),ed=new Map,td="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function cr(e,t){ed.set(e,t),p(t,[e])}for(var Wl=0;Wl<td.length;Wl++){var Vl=td[Wl],Lm=Vl.toLowerCase(),Om=Vl[0].toUpperCase()+Vl.slice(1);cr(Lm,"on"+Om)}cr(Ku,"onAnimationEnd"),cr(Xu,"onAnimationIteration"),cr(Ju,"onAnimationStart"),cr("dblclick","onDoubleClick"),cr("focusin","onFocus"),cr("focusout","onBlur"),cr(Zu,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),p("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),p("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),p("onBeforeInput",["compositionend","keypress","textInput","paste"]),p("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Mm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wo));function nd(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,Ts(s,t,void 0,e),e.currentTarget=null}function rd(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],a=s.event;s=s.listeners;e:{var u=void 0;if(t)for(var f=s.length-1;0<=f;f--){var h=s[f],x=h.instance,k=h.currentTarget;if(h=h.listener,x!==u&&a.isPropagationStopped())break e;nd(a,h,k),u=x}else for(f=0;f<s.length;f++){if(h=s[f],x=h.instance,k=h.currentTarget,h=h.listener,x!==u&&a.isPropagationStopped())break e;nd(a,h,k),u=x}}}if(Ht)throw e=xn,Ht=!1,xn=null,e}function Je(e,t){var r=t[Zl];r===void 0&&(r=t[Zl]=new Set);var s=e+"__bubble";r.has(s)||(od(t,e,2,!1),r.add(s))}function Gl(e,t,r){var s=0;t&&(s|=4),od(r,e,s,t)}var Gs="_reactListening"+Math.random().toString(36).slice(2);function Vo(e){if(!e[Gs]){e[Gs]=!0,c.forEach(function(r){r!=="selectionchange"&&(Mm.has(r)||Gl(r,!1,e),Gl(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Gs]||(t[Gs]=!0,Gl("selectionchange",!1,t))}}function od(e,t,r,s){switch(_u(t)){case 1:var a=Xh;break;case 4:a=Jh;break;default:a=Tl}r=a.bind(null,t,r,e),a=void 0,!me||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),s?a!==void 0?e.addEventListener(t,r,{capture:!0,passive:a}):e.addEventListener(t,r,!0):a!==void 0?e.addEventListener(t,r,{passive:a}):e.addEventListener(t,r,!1)}function ql(e,t,r,s,a){var u=s;if((t&1)===0&&(t&2)===0&&s!==null)e:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var h=s.stateNode.containerInfo;if(h===a||h.nodeType===8&&h.parentNode===a)break;if(f===4)for(f=s.return;f!==null;){var x=f.tag;if((x===3||x===4)&&(x=f.stateNode.containerInfo,x===a||x.nodeType===8&&x.parentNode===a))return;f=f.return}for(;h!==null;){if(f=Tr(h),f===null)return;if(x=f.tag,x===5||x===6){s=u=f;continue e}h=h.parentNode}}s=s.return}$(function(){var k=u,z=nr(r),D=[];e:{var L=ed.get(e);if(L!==void 0){var se=$l,ce=e;switch(e){case"keypress":if(Ds(r)===0)break e;case"keydown":case"keyup":se=pm;break;case"focusin":ce="focus",se=Ll;break;case"focusout":ce="blur",se=Ll;break;case"beforeblur":case"afterblur":se=Ll;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":se=Ru;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":se=tm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":se=gm;break;case Ku:case Xu:case Ju:se=om;break;case Zu:se=ym;break;case"scroll":se=Zh;break;case"wheel":se=bm;break;case"copy":case"cut":case"paste":se=im;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":se=$u}var ue=(t&4)!==0,ft=!ue&&e==="scroll",w=ue?L!==null?L+"Capture":null:L;ue=[];for(var v=k,S;v!==null;){S=v;var U=S.stateNode;if(S.tag===5&&U!==null&&(S=U,w!==null&&(U=K(v,w),U!=null&&ue.push(Go(v,U,S)))),ft)break;v=v.return}0<ue.length&&(L=new se(L,ce,null,r,z),D.push({event:L,listeners:ue}))}}if((t&7)===0){e:{if(L=e==="mouseover"||e==="pointerover",se=e==="mouseout"||e==="pointerout",L&&r!==tr&&(ce=r.relatedTarget||r.fromElement)&&(Tr(ce)||ce[Dn]))break e;if((se||L)&&(L=z.window===z?z:(L=z.ownerDocument)?L.defaultView||L.parentWindow:window,se?(ce=r.relatedTarget||r.toElement,se=k,ce=ce?Tr(ce):null,ce!==null&&(ft=Rn(ce),ce!==ft||ce.tag!==5&&ce.tag!==6)&&(ce=null)):(se=null,ce=k),se!==ce)){if(ue=Ru,U="onMouseLeave",w="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(ue=$u,U="onPointerLeave",w="onPointerEnter",v="pointer"),ft=se==null?L:Zr(se),S=ce==null?L:Zr(ce),L=new ue(U,v+"leave",se,r,z),L.target=ft,L.relatedTarget=S,U=null,Tr(z)===k&&(ue=new ue(w,v+"enter",ce,r,z),ue.target=S,ue.relatedTarget=ft,U=ue),ft=U,se&&ce)t:{for(ue=se,w=ce,v=0,S=ue;S;S=Xr(S))v++;for(S=0,U=w;U;U=Xr(U))S++;for(;0<v-S;)ue=Xr(ue),v--;for(;0<S-v;)w=Xr(w),S--;for(;v--;){if(ue===w||w!==null&&ue===w.alternate)break t;ue=Xr(ue),w=Xr(w)}ue=null}else ue=null;se!==null&&sd(D,L,se,ue,!1),ce!==null&&ft!==null&&sd(D,ft,ce,ue,!0)}}e:{if(L=k?Zr(k):window,se=L.nodeName&&L.nodeName.toLowerCase(),se==="select"||se==="input"&&L.type==="file")var pe=_m;else if(zu(L))if(Du)pe=Im;else{pe=Tm;var be=Nm}else(se=L.nodeName)&&se.toLowerCase()==="input"&&(L.type==="checkbox"||L.type==="radio")&&(pe=Rm);if(pe&&(pe=pe(e,k))){Fu(D,pe,r,z);break e}be&&be(e,L,k),e==="focusout"&&(be=L._wrapperState)&&be.controlled&&L.type==="number"&&Lt(L,"number",L.value)}switch(be=k?Zr(k):window,e){case"focusin":(zu(be)||be.contentEditable==="true")&&(Qr=be,Bl=k,Ho=null);break;case"focusout":Ho=Bl=Qr=null;break;case"mousedown":Ul=!0;break;case"contextmenu":case"mouseup":case"dragend":Ul=!1,Yu(D,r,z);break;case"selectionchange":if(Pm)break;case"keydown":case"keyup":Yu(D,r,z)}var we;if(Ml)e:{switch(e){case"compositionstart":var je="onCompositionStart";break e;case"compositionend":je="onCompositionEnd";break e;case"compositionupdate":je="onCompositionUpdate";break e}je=void 0}else Yr?Ou(e,r)&&(je="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(je="onCompositionStart");je&&(Au&&r.locale!=="ko"&&(Yr||je!=="onCompositionStart"?je==="onCompositionEnd"&&Yr&&(we=Nu()):(ar=z,Il="value"in ar?ar.value:ar.textContent,Yr=!0)),be=qs(k,je),0<be.length&&(je=new Iu(je,e,null,r,z),D.push({event:je,listeners:be}),we?je.data=we:(we=Mu(r),we!==null&&(je.data=we)))),(we=Sm?km(e,r):Cm(e,r))&&(k=qs(k,"onBeforeInput"),0<k.length&&(z=new Iu("onBeforeInput","beforeinput",null,r,z),D.push({event:z,listeners:k}),z.data=we))}rd(D,t)})}function Go(e,t,r){return{instance:e,listener:t,currentTarget:r}}function qs(e,t){for(var r=t+"Capture",s=[];e!==null;){var a=e,u=a.stateNode;a.tag===5&&u!==null&&(a=u,u=K(e,r),u!=null&&s.unshift(Go(e,u,a)),u=K(e,t),u!=null&&s.push(Go(e,u,a))),e=e.return}return s}function Xr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function sd(e,t,r,s,a){for(var u=t._reactName,f=[];r!==null&&r!==s;){var h=r,x=h.alternate,k=h.stateNode;if(x!==null&&x===s)break;h.tag===5&&k!==null&&(h=k,a?(x=K(r,u),x!=null&&f.unshift(Go(r,x,h))):a||(x=K(r,u),x!=null&&f.push(Go(r,x,h)))),r=r.return}f.length!==0&&e.push({event:t,listeners:f})}var zm=/\r\n?/g,Fm=/\u0000|\uFFFD/g;function id(e){return(typeof e=="string"?e:""+e).replace(zm,`
`).replace(Fm,"")}function Ys(e,t,r){if(t=id(t),id(e)!==t&&r)throw Error(i(425))}function Qs(){}var Yl=null,Ql=null;function Kl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Xl=typeof setTimeout=="function"?setTimeout:void 0,Dm=typeof clearTimeout=="function"?clearTimeout:void 0,ld=typeof Promise=="function"?Promise:void 0,Bm=typeof queueMicrotask=="function"?queueMicrotask:typeof ld<"u"?function(e){return ld.resolve(null).then(e).catch(Um)}:Xl;function Um(e){setTimeout(function(){throw e})}function Jl(e,t){var r=t,s=0;do{var a=r.nextSibling;if(e.removeChild(r),a&&a.nodeType===8)if(r=a.data,r==="/$"){if(s===0){e.removeChild(a),Oo(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=a}while(r);Oo(t)}function ur(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function ad(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Jr=Math.random().toString(36).slice(2),$n="__reactFiber$"+Jr,qo="__reactProps$"+Jr,Dn="__reactContainer$"+Jr,Zl="__reactEvents$"+Jr,Hm="__reactListeners$"+Jr,Wm="__reactHandles$"+Jr;function Tr(e){var t=e[$n];if(t)return t;for(var r=e.parentNode;r;){if(t=r[Dn]||r[$n]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=ad(e);e!==null;){if(r=e[$n])return r;e=ad(e)}return t}e=r,r=e.parentNode}return null}function Yo(e){return e=e[$n]||e[Dn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Zr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Ks(e){return e[qo]||null}var ea=[],eo=-1;function dr(e){return{current:e}}function Ze(e){0>eo||(e.current=ea[eo],ea[eo]=null,eo--)}function Ke(e,t){eo++,ea[eo]=e.current,e.current=t}var fr={},Rt=dr(fr),Wt=dr(!1),Rr=fr;function to(e,t){var r=e.type.contextTypes;if(!r)return fr;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var a={},u;for(u in r)a[u]=t[u];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Vt(e){return e=e.childContextTypes,e!=null}function Xs(){Ze(Wt),Ze(Rt)}function cd(e,t,r){if(Rt.current!==fr)throw Error(i(168));Ke(Rt,t),Ke(Wt,r)}function ud(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var a in s)if(!(a in t))throw Error(i(108,Se(e)||"Unknown",a));return M({},r,s)}function Js(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||fr,Rr=Rt.current,Ke(Rt,e),Ke(Wt,Wt.current),!0}function dd(e,t,r){var s=e.stateNode;if(!s)throw Error(i(169));r?(e=ud(e,t,Rr),s.__reactInternalMemoizedMergedChildContext=e,Ze(Wt),Ze(Rt),Ke(Rt,e)):Ze(Wt),Ke(Wt,r)}var Bn=null,Zs=!1,ta=!1;function fd(e){Bn===null?Bn=[e]:Bn.push(e)}function Vm(e){Zs=!0,fd(e)}function pr(){if(!ta&&Bn!==null){ta=!0;var e=0,t=Ge;try{var r=Bn;for(Ge=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}Bn=null,Zs=!1}catch(a){throw Bn!==null&&(Bn=Bn.slice(e+1)),hu(kl,pr),a}finally{Ge=t,ta=!1}}return null}var no=[],ro=0,ei=null,ti=0,cn=[],un=0,Ir=null,Un=1,Hn="";function $r(e,t){no[ro++]=ti,no[ro++]=ei,ei=e,ti=t}function pd(e,t,r){cn[un++]=Un,cn[un++]=Hn,cn[un++]=Ir,Ir=e;var s=Un;e=Hn;var a=32-yn(s)-1;s&=~(1<<a),r+=1;var u=32-yn(t)+a;if(30<u){var f=a-a%5;u=(s&(1<<f)-1).toString(32),s>>=f,a-=f,Un=1<<32-yn(t)+a|r<<a|s,Hn=u+e}else Un=1<<u|r<<a|s,Hn=e}function na(e){e.return!==null&&($r(e,1),pd(e,1,0))}function ra(e){for(;e===ei;)ei=no[--ro],no[ro]=null,ti=no[--ro],no[ro]=null;for(;e===Ir;)Ir=cn[--un],cn[un]=null,Hn=cn[--un],cn[un]=null,Un=cn[--un],cn[un]=null}var en=null,tn=null,rt=!1,bn=null;function hd(e,t){var r=hn(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function md(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,en=e,tn=ur(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,en=e,tn=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=Ir!==null?{id:Un,overflow:Hn}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=hn(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,en=e,tn=null,!0):!1;default:return!1}}function oa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function sa(e){if(rt){var t=tn;if(t){var r=t;if(!md(e,t)){if(oa(e))throw Error(i(418));t=ur(r.nextSibling);var s=en;t&&md(e,t)?hd(s,r):(e.flags=e.flags&-4097|2,rt=!1,en=e)}}else{if(oa(e))throw Error(i(418));e.flags=e.flags&-4097|2,rt=!1,en=e}}}function gd(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;en=e}function ni(e){if(e!==en)return!1;if(!rt)return gd(e),rt=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Kl(e.type,e.memoizedProps)),t&&(t=tn)){if(oa(e))throw xd(),Error(i(418));for(;t;)hd(e,t),t=ur(t.nextSibling)}if(gd(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){tn=ur(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}tn=null}}else tn=en?ur(e.stateNode.nextSibling):null;return!0}function xd(){for(var e=tn;e;)e=ur(e.nextSibling)}function oo(){tn=en=null,rt=!1}function ia(e){bn===null?bn=[e]:bn.push(e)}var Gm=Te.ReactCurrentBatchConfig;function Qo(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(i(309));var s=r.stateNode}if(!s)throw Error(i(147,e));var a=s,u=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===u?t.ref:(t=function(f){var h=a.refs;f===null?delete h[u]:h[u]=f},t._stringRef=u,t)}if(typeof e!="string")throw Error(i(284));if(!r._owner)throw Error(i(290,e))}return e}function ri(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function yd(e){var t=e._init;return t(e._payload)}function vd(e){function t(w,v){if(e){var S=w.deletions;S===null?(w.deletions=[v],w.flags|=16):S.push(v)}}function r(w,v){if(!e)return null;for(;v!==null;)t(w,v),v=v.sibling;return null}function s(w,v){for(w=new Map;v!==null;)v.key!==null?w.set(v.key,v):w.set(v.index,v),v=v.sibling;return w}function a(w,v){return w=wr(w,v),w.index=0,w.sibling=null,w}function u(w,v,S){return w.index=S,e?(S=w.alternate,S!==null?(S=S.index,S<v?(w.flags|=2,v):S):(w.flags|=2,v)):(w.flags|=1048576,v)}function f(w){return e&&w.alternate===null&&(w.flags|=2),w}function h(w,v,S,U){return v===null||v.tag!==6?(v=Xa(S,w.mode,U),v.return=w,v):(v=a(v,S),v.return=w,v)}function x(w,v,S,U){var pe=S.type;return pe===H?z(w,v,S.props.children,U,S.key):v!==null&&(v.elementType===pe||typeof pe=="object"&&pe!==null&&pe.$$typeof===Me&&yd(pe)===v.type)?(U=a(v,S.props),U.ref=Qo(w,v,S),U.return=w,U):(U=_i(S.type,S.key,S.props,null,w.mode,U),U.ref=Qo(w,v,S),U.return=w,U)}function k(w,v,S,U){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=Ja(S,w.mode,U),v.return=w,v):(v=a(v,S.children||[]),v.return=w,v)}function z(w,v,S,U,pe){return v===null||v.tag!==7?(v=Dr(S,w.mode,U,pe),v.return=w,v):(v=a(v,S),v.return=w,v)}function D(w,v,S){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Xa(""+v,w.mode,S),v.return=w,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Re:return S=_i(v.type,v.key,v.props,null,w.mode,S),S.ref=Qo(w,null,v),S.return=w,S;case fe:return v=Ja(v,w.mode,S),v.return=w,v;case Me:var U=v._init;return D(w,U(v._payload),S)}if(Ot(v)||Z(v))return v=Dr(v,w.mode,S,null),v.return=w,v;ri(w,v)}return null}function L(w,v,S,U){var pe=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return pe!==null?null:h(w,v,""+S,U);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Re:return S.key===pe?x(w,v,S,U):null;case fe:return S.key===pe?k(w,v,S,U):null;case Me:return pe=S._init,L(w,v,pe(S._payload),U)}if(Ot(S)||Z(S))return pe!==null?null:z(w,v,S,U,null);ri(w,S)}return null}function se(w,v,S,U,pe){if(typeof U=="string"&&U!==""||typeof U=="number")return w=w.get(S)||null,h(v,w,""+U,pe);if(typeof U=="object"&&U!==null){switch(U.$$typeof){case Re:return w=w.get(U.key===null?S:U.key)||null,x(v,w,U,pe);case fe:return w=w.get(U.key===null?S:U.key)||null,k(v,w,U,pe);case Me:var be=U._init;return se(w,v,S,be(U._payload),pe)}if(Ot(U)||Z(U))return w=w.get(S)||null,z(v,w,U,pe,null);ri(v,U)}return null}function ce(w,v,S,U){for(var pe=null,be=null,we=v,je=v=0,_t=null;we!==null&&je<S.length;je++){we.index>je?(_t=we,we=null):_t=we.sibling;var De=L(w,we,S[je],U);if(De===null){we===null&&(we=_t);break}e&&we&&De.alternate===null&&t(w,we),v=u(De,v,je),be===null?pe=De:be.sibling=De,be=De,we=_t}if(je===S.length)return r(w,we),rt&&$r(w,je),pe;if(we===null){for(;je<S.length;je++)we=D(w,S[je],U),we!==null&&(v=u(we,v,je),be===null?pe=we:be.sibling=we,be=we);return rt&&$r(w,je),pe}for(we=s(w,we);je<S.length;je++)_t=se(we,w,je,S[je],U),_t!==null&&(e&&_t.alternate!==null&&we.delete(_t.key===null?je:_t.key),v=u(_t,v,je),be===null?pe=_t:be.sibling=_t,be=_t);return e&&we.forEach(function(Sr){return t(w,Sr)}),rt&&$r(w,je),pe}function ue(w,v,S,U){var pe=Z(S);if(typeof pe!="function")throw Error(i(150));if(S=pe.call(S),S==null)throw Error(i(151));for(var be=pe=null,we=v,je=v=0,_t=null,De=S.next();we!==null&&!De.done;je++,De=S.next()){we.index>je?(_t=we,we=null):_t=we.sibling;var Sr=L(w,we,De.value,U);if(Sr===null){we===null&&(we=_t);break}e&&we&&Sr.alternate===null&&t(w,we),v=u(Sr,v,je),be===null?pe=Sr:be.sibling=Sr,be=Sr,we=_t}if(De.done)return r(w,we),rt&&$r(w,je),pe;if(we===null){for(;!De.done;je++,De=S.next())De=D(w,De.value,U),De!==null&&(v=u(De,v,je),be===null?pe=De:be.sibling=De,be=De);return rt&&$r(w,je),pe}for(we=s(w,we);!De.done;je++,De=S.next())De=se(we,w,je,De.value,U),De!==null&&(e&&De.alternate!==null&&we.delete(De.key===null?je:De.key),v=u(De,v,je),be===null?pe=De:be.sibling=De,be=De);return e&&we.forEach(function(E0){return t(w,E0)}),rt&&$r(w,je),pe}function ft(w,v,S,U){if(typeof S=="object"&&S!==null&&S.type===H&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case Re:e:{for(var pe=S.key,be=v;be!==null;){if(be.key===pe){if(pe=S.type,pe===H){if(be.tag===7){r(w,be.sibling),v=a(be,S.props.children),v.return=w,w=v;break e}}else if(be.elementType===pe||typeof pe=="object"&&pe!==null&&pe.$$typeof===Me&&yd(pe)===be.type){r(w,be.sibling),v=a(be,S.props),v.ref=Qo(w,be,S),v.return=w,w=v;break e}r(w,be);break}else t(w,be);be=be.sibling}S.type===H?(v=Dr(S.props.children,w.mode,U,S.key),v.return=w,w=v):(U=_i(S.type,S.key,S.props,null,w.mode,U),U.ref=Qo(w,v,S),U.return=w,w=U)}return f(w);case fe:e:{for(be=S.key;v!==null;){if(v.key===be)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){r(w,v.sibling),v=a(v,S.children||[]),v.return=w,w=v;break e}else{r(w,v);break}else t(w,v);v=v.sibling}v=Ja(S,w.mode,U),v.return=w,w=v}return f(w);case Me:return be=S._init,ft(w,v,be(S._payload),U)}if(Ot(S))return ce(w,v,S,U);if(Z(S))return ue(w,v,S,U);ri(w,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,v!==null&&v.tag===6?(r(w,v.sibling),v=a(v,S),v.return=w,w=v):(r(w,v),v=Xa(S,w.mode,U),v.return=w,w=v),f(w)):r(w,v)}return ft}var so=vd(!0),bd=vd(!1),oi=dr(null),si=null,io=null,la=null;function aa(){la=io=si=null}function ca(e){var t=oi.current;Ze(oi),e._currentValue=t}function ua(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function lo(e,t){si=e,la=io=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Gt=!0),e.firstContext=null)}function dn(e){var t=e._currentValue;if(la!==e)if(e={context:e,memoizedValue:t,next:null},io===null){if(si===null)throw Error(i(308));io=e,si.dependencies={lanes:0,firstContext:e}}else io=io.next=e;return t}var Ar=null;function da(e){Ar===null?Ar=[e]:Ar.push(e)}function wd(e,t,r,s){var a=t.interleaved;return a===null?(r.next=r,da(t)):(r.next=a.next,a.next=r),t.interleaved=r,Wn(e,s)}function Wn(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var hr=!1;function fa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Vn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function mr(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(Fe&2)!==0){var a=s.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),s.pending=t,Wn(e,r)}return a=s.interleaved,a===null?(t.next=t,da(s)):(t.next=a.next,a.next=t),s.interleaved=t,Wn(e,r)}function ii(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,jl(e,r)}}function kd(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var a=null,u=null;if(r=r.firstBaseUpdate,r!==null){do{var f={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};u===null?a=u=f:u=u.next=f,r=r.next}while(r!==null);u===null?a=u=t:u=u.next=t}else a=u=t;r={baseState:s.baseState,firstBaseUpdate:a,lastBaseUpdate:u,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function li(e,t,r,s){var a=e.updateQueue;hr=!1;var u=a.firstBaseUpdate,f=a.lastBaseUpdate,h=a.shared.pending;if(h!==null){a.shared.pending=null;var x=h,k=x.next;x.next=null,f===null?u=k:f.next=k,f=x;var z=e.alternate;z!==null&&(z=z.updateQueue,h=z.lastBaseUpdate,h!==f&&(h===null?z.firstBaseUpdate=k:h.next=k,z.lastBaseUpdate=x))}if(u!==null){var D=a.baseState;f=0,z=k=x=null,h=u;do{var L=h.lane,se=h.eventTime;if((s&L)===L){z!==null&&(z=z.next={eventTime:se,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});e:{var ce=e,ue=h;switch(L=t,se=r,ue.tag){case 1:if(ce=ue.payload,typeof ce=="function"){D=ce.call(se,D,L);break e}D=ce;break e;case 3:ce.flags=ce.flags&-65537|128;case 0:if(ce=ue.payload,L=typeof ce=="function"?ce.call(se,D,L):ce,L==null)break e;D=M({},D,L);break e;case 2:hr=!0}}h.callback!==null&&h.lane!==0&&(e.flags|=64,L=a.effects,L===null?a.effects=[h]:L.push(h))}else se={eventTime:se,lane:L,tag:h.tag,payload:h.payload,callback:h.callback,next:null},z===null?(k=z=se,x=D):z=z.next=se,f|=L;if(h=h.next,h===null){if(h=a.shared.pending,h===null)break;L=h,h=L.next,L.next=null,a.lastBaseUpdate=L,a.shared.pending=null}}while(!0);if(z===null&&(x=D),a.baseState=x,a.firstBaseUpdate=k,a.lastBaseUpdate=z,t=a.shared.interleaved,t!==null){a=t;do f|=a.lane,a=a.next;while(a!==t)}else u===null&&(a.shared.lanes=0);Or|=f,e.lanes=f,e.memoizedState=D}}function Cd(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],a=s.callback;if(a!==null){if(s.callback=null,s=r,typeof a!="function")throw Error(i(191,a));a.call(s)}}}var Ko={},An=dr(Ko),Xo=dr(Ko),Jo=dr(Ko);function Pr(e){if(e===Ko)throw Error(i(174));return e}function pa(e,t){switch(Ke(Jo,t),Ke(Xo,e),Ke(An,Ko),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:lt(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=lt(t,e)}Ze(An),Ke(An,t)}function ao(){Ze(An),Ze(Xo),Ze(Jo)}function Ed(e){Pr(Jo.current);var t=Pr(An.current),r=lt(t,e.type);t!==r&&(Ke(Xo,e),Ke(An,r))}function ha(e){Xo.current===e&&(Ze(An),Ze(Xo))}var st=dr(0);function ai(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ma=[];function ga(){for(var e=0;e<ma.length;e++)ma[e]._workInProgressVersionPrimary=null;ma.length=0}var ci=Te.ReactCurrentDispatcher,xa=Te.ReactCurrentBatchConfig,Lr=0,it=null,bt=null,Et=null,ui=!1,Zo=!1,es=0,qm=0;function It(){throw Error(i(321))}function ya(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!vn(e[r],t[r]))return!1;return!0}function va(e,t,r,s,a,u){if(Lr=u,it=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ci.current=e===null||e.memoizedState===null?Xm:Jm,e=r(s,a),Zo){u=0;do{if(Zo=!1,es=0,25<=u)throw Error(i(301));u+=1,Et=bt=null,t.updateQueue=null,ci.current=Zm,e=r(s,a)}while(Zo)}if(ci.current=pi,t=bt!==null&&bt.next!==null,Lr=0,Et=bt=it=null,ui=!1,t)throw Error(i(300));return e}function ba(){var e=es!==0;return es=0,e}function Pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Et===null?it.memoizedState=Et=e:Et=Et.next=e,Et}function fn(){if(bt===null){var e=it.alternate;e=e!==null?e.memoizedState:null}else e=bt.next;var t=Et===null?it.memoizedState:Et.next;if(t!==null)Et=t,bt=e;else{if(e===null)throw Error(i(310));bt=e,e={memoizedState:bt.memoizedState,baseState:bt.baseState,baseQueue:bt.baseQueue,queue:bt.queue,next:null},Et===null?it.memoizedState=Et=e:Et=Et.next=e}return Et}function ts(e,t){return typeof t=="function"?t(e):t}function wa(e){var t=fn(),r=t.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=bt,a=s.baseQueue,u=r.pending;if(u!==null){if(a!==null){var f=a.next;a.next=u.next,u.next=f}s.baseQueue=a=u,r.pending=null}if(a!==null){u=a.next,s=s.baseState;var h=f=null,x=null,k=u;do{var z=k.lane;if((Lr&z)===z)x!==null&&(x=x.next={lane:0,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null}),s=k.hasEagerState?k.eagerState:e(s,k.action);else{var D={lane:z,action:k.action,hasEagerState:k.hasEagerState,eagerState:k.eagerState,next:null};x===null?(h=x=D,f=s):x=x.next=D,it.lanes|=z,Or|=z}k=k.next}while(k!==null&&k!==u);x===null?f=s:x.next=h,vn(s,t.memoizedState)||(Gt=!0),t.memoizedState=s,t.baseState=f,t.baseQueue=x,r.lastRenderedState=s}if(e=r.interleaved,e!==null){a=e;do u=a.lane,it.lanes|=u,Or|=u,a=a.next;while(a!==e)}else a===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function Sa(e){var t=fn(),r=t.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=r.dispatch,a=r.pending,u=t.memoizedState;if(a!==null){r.pending=null;var f=a=a.next;do u=e(u,f.action),f=f.next;while(f!==a);vn(u,t.memoizedState)||(Gt=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),r.lastRenderedState=u}return[u,s]}function jd(){}function _d(e,t){var r=it,s=fn(),a=t(),u=!vn(s.memoizedState,a);if(u&&(s.memoizedState=a,Gt=!0),s=s.queue,ka(Rd.bind(null,r,s,e),[e]),s.getSnapshot!==t||u||Et!==null&&Et.memoizedState.tag&1){if(r.flags|=2048,ns(9,Td.bind(null,r,s,a,t),void 0,null),jt===null)throw Error(i(349));(Lr&30)!==0||Nd(r,t,a)}return a}function Nd(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=it.updateQueue,t===null?(t={lastEffect:null,stores:null},it.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Td(e,t,r,s){t.value=r,t.getSnapshot=s,Id(t)&&$d(e)}function Rd(e,t,r){return r(function(){Id(t)&&$d(e)})}function Id(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!vn(e,r)}catch{return!0}}function $d(e){var t=Wn(e,1);t!==null&&Cn(t,e,1,-1)}function Ad(e){var t=Pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:e},t.queue=e,e=e.dispatch=Km.bind(null,it,e),[t.memoizedState,e]}function ns(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=it.updateQueue,t===null?(t={lastEffect:null,stores:null},it.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function Pd(){return fn().memoizedState}function di(e,t,r,s){var a=Pn();it.flags|=e,a.memoizedState=ns(1|t,r,void 0,s===void 0?null:s)}function fi(e,t,r,s){var a=fn();s=s===void 0?null:s;var u=void 0;if(bt!==null){var f=bt.memoizedState;if(u=f.destroy,s!==null&&ya(s,f.deps)){a.memoizedState=ns(t,r,u,s);return}}it.flags|=e,a.memoizedState=ns(1|t,r,u,s)}function Ld(e,t){return di(8390656,8,e,t)}function ka(e,t){return fi(2048,8,e,t)}function Od(e,t){return fi(4,2,e,t)}function Md(e,t){return fi(4,4,e,t)}function zd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Fd(e,t,r){return r=r!=null?r.concat([e]):null,fi(4,4,zd.bind(null,t,e),r)}function Ca(){}function Dd(e,t){var r=fn();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&ya(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function Bd(e,t){var r=fn();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&ya(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function Ud(e,t,r){return(Lr&21)===0?(e.baseState&&(e.baseState=!1,Gt=!0),e.memoizedState=r):(vn(r,t)||(r=yu(),it.lanes|=r,Or|=r,e.baseState=!0),t)}function Ym(e,t){var r=Ge;Ge=r!==0&&4>r?r:4,e(!0);var s=xa.transition;xa.transition={};try{e(!1),t()}finally{Ge=r,xa.transition=s}}function Hd(){return fn().memoizedState}function Qm(e,t,r){var s=vr(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},Wd(e))Vd(t,r);else if(r=wd(e,t,r,s),r!==null){var a=zt();Cn(r,e,s,a),Gd(r,t,s)}}function Km(e,t,r){var s=vr(e),a={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(Wd(e))Vd(t,a);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var f=t.lastRenderedState,h=u(f,r);if(a.hasEagerState=!0,a.eagerState=h,vn(h,f)){var x=t.interleaved;x===null?(a.next=a,da(t)):(a.next=x.next,x.next=a),t.interleaved=a;return}}catch{}finally{}r=wd(e,t,a,s),r!==null&&(a=zt(),Cn(r,e,s,a),Gd(r,t,s))}}function Wd(e){var t=e.alternate;return e===it||t!==null&&t===it}function Vd(e,t){Zo=ui=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Gd(e,t,r){if((r&4194240)!==0){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,jl(e,r)}}var pi={readContext:dn,useCallback:It,useContext:It,useEffect:It,useImperativeHandle:It,useInsertionEffect:It,useLayoutEffect:It,useMemo:It,useReducer:It,useRef:It,useState:It,useDebugValue:It,useDeferredValue:It,useTransition:It,useMutableSource:It,useSyncExternalStore:It,useId:It,unstable_isNewReconciler:!1},Xm={readContext:dn,useCallback:function(e,t){return Pn().memoizedState=[e,t===void 0?null:t],e},useContext:dn,useEffect:Ld,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,di(4194308,4,zd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return di(4194308,4,e,t)},useInsertionEffect:function(e,t){return di(4,2,e,t)},useMemo:function(e,t){var r=Pn();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=Pn();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=Qm.bind(null,it,e),[s.memoizedState,e]},useRef:function(e){var t=Pn();return e={current:e},t.memoizedState=e},useState:Ad,useDebugValue:Ca,useDeferredValue:function(e){return Pn().memoizedState=e},useTransition:function(){var e=Ad(!1),t=e[0];return e=Ym.bind(null,e[1]),Pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=it,a=Pn();if(rt){if(r===void 0)throw Error(i(407));r=r()}else{if(r=t(),jt===null)throw Error(i(349));(Lr&30)!==0||Nd(s,t,r)}a.memoizedState=r;var u={value:r,getSnapshot:t};return a.queue=u,Ld(Rd.bind(null,s,u,e),[e]),s.flags|=2048,ns(9,Td.bind(null,s,u,r,t),void 0,null),r},useId:function(){var e=Pn(),t=jt.identifierPrefix;if(rt){var r=Hn,s=Un;r=(s&~(1<<32-yn(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=es++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=qm++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Jm={readContext:dn,useCallback:Dd,useContext:dn,useEffect:ka,useImperativeHandle:Fd,useInsertionEffect:Od,useLayoutEffect:Md,useMemo:Bd,useReducer:wa,useRef:Pd,useState:function(){return wa(ts)},useDebugValue:Ca,useDeferredValue:function(e){var t=fn();return Ud(t,bt.memoizedState,e)},useTransition:function(){var e=wa(ts)[0],t=fn().memoizedState;return[e,t]},useMutableSource:jd,useSyncExternalStore:_d,useId:Hd,unstable_isNewReconciler:!1},Zm={readContext:dn,useCallback:Dd,useContext:dn,useEffect:ka,useImperativeHandle:Fd,useInsertionEffect:Od,useLayoutEffect:Md,useMemo:Bd,useReducer:Sa,useRef:Pd,useState:function(){return Sa(ts)},useDebugValue:Ca,useDeferredValue:function(e){var t=fn();return bt===null?t.memoizedState=e:Ud(t,bt.memoizedState,e)},useTransition:function(){var e=Sa(ts)[0],t=fn().memoizedState;return[e,t]},useMutableSource:jd,useSyncExternalStore:_d,useId:Hd,unstable_isNewReconciler:!1};function wn(e,t){if(e&&e.defaultProps){t=M({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function Ea(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:M({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var hi={isMounted:function(e){return(e=e._reactInternals)?Rn(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=zt(),a=vr(e),u=Vn(s,a);u.payload=t,r!=null&&(u.callback=r),t=mr(e,u,a),t!==null&&(Cn(t,e,a,s),ii(t,e,a))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=zt(),a=vr(e),u=Vn(s,a);u.tag=1,u.payload=t,r!=null&&(u.callback=r),t=mr(e,u,a),t!==null&&(Cn(t,e,a,s),ii(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=zt(),s=vr(e),a=Vn(r,s);a.tag=2,t!=null&&(a.callback=t),t=mr(e,a,s),t!==null&&(Cn(t,e,s,r),ii(t,e,s))}};function qd(e,t,r,s,a,u,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,u,f):t.prototype&&t.prototype.isPureReactComponent?!Uo(r,s)||!Uo(a,u):!0}function Yd(e,t,r){var s=!1,a=fr,u=t.contextType;return typeof u=="object"&&u!==null?u=dn(u):(a=Vt(t)?Rr:Rt.current,s=t.contextTypes,u=(s=s!=null)?to(e,a):fr),t=new t(r,u),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=hi,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=u),t}function Qd(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&hi.enqueueReplaceState(t,t.state,null)}function ja(e,t,r,s){var a=e.stateNode;a.props=r,a.state=e.memoizedState,a.refs={},fa(e);var u=t.contextType;typeof u=="object"&&u!==null?a.context=dn(u):(u=Vt(t)?Rr:Rt.current,a.context=to(e,u)),a.state=e.memoizedState,u=t.getDerivedStateFromProps,typeof u=="function"&&(Ea(e,t,u,r),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&hi.enqueueReplaceState(a,a.state,null),li(e,r,a,s),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function co(e,t){try{var r="",s=t;do r+=ve(s),s=s.return;while(s);var a=r}catch(u){a=`
Error generating stack: `+u.message+`
`+u.stack}return{value:e,source:t,stack:a,digest:null}}function _a(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function Na(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var e0=typeof WeakMap=="function"?WeakMap:Map;function Kd(e,t,r){r=Vn(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){wi||(wi=!0,Ha=s),Na(e,t)},r}function Xd(e,t,r){r=Vn(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var a=t.value;r.payload=function(){return s(a)},r.callback=function(){Na(e,t)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(r.callback=function(){Na(e,t),typeof s!="function"&&(xr===null?xr=new Set([this]):xr.add(this));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),r}function Jd(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new e0;var a=new Set;s.set(t,a)}else a=s.get(t),a===void 0&&(a=new Set,s.set(t,a));a.has(r)||(a.add(r),e=h0.bind(null,e,t,r),t.then(e,e))}function Zd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ef(e,t,r,s,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Vn(-1,1),t.tag=2,mr(r,t,1))),r.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var t0=Te.ReactCurrentOwner,Gt=!1;function Mt(e,t,r,s){t.child=e===null?bd(t,null,r,s):so(t,e.child,r,s)}function tf(e,t,r,s,a){r=r.render;var u=t.ref;return lo(t,a),s=va(e,t,r,s,u,a),r=ba(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Gn(e,t,a)):(rt&&r&&na(t),t.flags|=1,Mt(e,t,s,a),t.child)}function nf(e,t,r,s,a){if(e===null){var u=r.type;return typeof u=="function"&&!Ka(u)&&u.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=u,rf(e,t,u,s,a)):(e=_i(r.type,null,s,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,(e.lanes&a)===0){var f=u.memoizedProps;if(r=r.compare,r=r!==null?r:Uo,r(f,s)&&e.ref===t.ref)return Gn(e,t,a)}return t.flags|=1,e=wr(u,s),e.ref=t.ref,e.return=t,t.child=e}function rf(e,t,r,s,a){if(e!==null){var u=e.memoizedProps;if(Uo(u,s)&&e.ref===t.ref)if(Gt=!1,t.pendingProps=s=u,(e.lanes&a)!==0)(e.flags&131072)!==0&&(Gt=!0);else return t.lanes=e.lanes,Gn(e,t,a)}return Ta(e,t,r,s,a)}function of(e,t,r){var s=t.pendingProps,a=s.children,u=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ke(fo,nn),nn|=r;else{if((r&1073741824)===0)return e=u!==null?u.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ke(fo,nn),nn|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=u!==null?u.baseLanes:r,Ke(fo,nn),nn|=s}else u!==null?(s=u.baseLanes|r,t.memoizedState=null):s=r,Ke(fo,nn),nn|=s;return Mt(e,t,a,r),t.child}function sf(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function Ta(e,t,r,s,a){var u=Vt(r)?Rr:Rt.current;return u=to(t,u),lo(t,a),r=va(e,t,r,s,u,a),s=ba(),e!==null&&!Gt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Gn(e,t,a)):(rt&&s&&na(t),t.flags|=1,Mt(e,t,r,a),t.child)}function lf(e,t,r,s,a){if(Vt(r)){var u=!0;Js(t)}else u=!1;if(lo(t,a),t.stateNode===null)gi(e,t),Yd(t,r,s),ja(t,r,s,a),s=!0;else if(e===null){var f=t.stateNode,h=t.memoizedProps;f.props=h;var x=f.context,k=r.contextType;typeof k=="object"&&k!==null?k=dn(k):(k=Vt(r)?Rr:Rt.current,k=to(t,k));var z=r.getDerivedStateFromProps,D=typeof z=="function"||typeof f.getSnapshotBeforeUpdate=="function";D||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==s||x!==k)&&Qd(t,f,s,k),hr=!1;var L=t.memoizedState;f.state=L,li(t,s,f,a),x=t.memoizedState,h!==s||L!==x||Wt.current||hr?(typeof z=="function"&&(Ea(t,r,z,s),x=t.memoizedState),(h=hr||qd(t,r,h,s,L,x,k))?(D||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=x),f.props=s,f.state=x,f.context=k,s=h):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{f=t.stateNode,Sd(e,t),h=t.memoizedProps,k=t.type===t.elementType?h:wn(t.type,h),f.props=k,D=t.pendingProps,L=f.context,x=r.contextType,typeof x=="object"&&x!==null?x=dn(x):(x=Vt(r)?Rr:Rt.current,x=to(t,x));var se=r.getDerivedStateFromProps;(z=typeof se=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==D||L!==x)&&Qd(t,f,s,x),hr=!1,L=t.memoizedState,f.state=L,li(t,s,f,a);var ce=t.memoizedState;h!==D||L!==ce||Wt.current||hr?(typeof se=="function"&&(Ea(t,r,se,s),ce=t.memoizedState),(k=hr||qd(t,r,k,s,L,ce,x)||!1)?(z||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,ce,x),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,ce,x)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=ce),f.props=s,f.state=ce,f.context=x,s=k):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&L===e.memoizedState||(t.flags|=1024),s=!1)}return Ra(e,t,r,s,u,a)}function Ra(e,t,r,s,a,u){sf(e,t);var f=(t.flags&128)!==0;if(!s&&!f)return a&&dd(t,r,!1),Gn(e,t,u);s=t.stateNode,t0.current=t;var h=f&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&f?(t.child=so(t,e.child,null,u),t.child=so(t,null,h,u)):Mt(e,t,h,u),t.memoizedState=s.state,a&&dd(t,r,!0),t.child}function af(e){var t=e.stateNode;t.pendingContext?cd(e,t.pendingContext,t.pendingContext!==t.context):t.context&&cd(e,t.context,!1),pa(e,t.containerInfo)}function cf(e,t,r,s,a){return oo(),ia(a),t.flags|=256,Mt(e,t,r,s),t.child}var Ia={dehydrated:null,treeContext:null,retryLane:0};function $a(e){return{baseLanes:e,cachePool:null,transitions:null}}function uf(e,t,r){var s=t.pendingProps,a=st.current,u=!1,f=(t.flags&128)!==0,h;if((h=f)||(h=e!==null&&e.memoizedState===null?!1:(a&2)!==0),h?(u=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Ke(st,a&1),e===null)return sa(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(f=s.children,e=s.fallback,u?(s=t.mode,u=t.child,f={mode:"hidden",children:f},(s&1)===0&&u!==null?(u.childLanes=0,u.pendingProps=f):u=Ni(f,s,0,null),e=Dr(e,s,r,null),u.return=t,e.return=t,u.sibling=e,t.child=u,t.child.memoizedState=$a(r),t.memoizedState=Ia,e):Aa(t,f));if(a=e.memoizedState,a!==null&&(h=a.dehydrated,h!==null))return n0(e,t,f,s,h,a,r);if(u){u=s.fallback,f=t.mode,a=e.child,h=a.sibling;var x={mode:"hidden",children:s.children};return(f&1)===0&&t.child!==a?(s=t.child,s.childLanes=0,s.pendingProps=x,t.deletions=null):(s=wr(a,x),s.subtreeFlags=a.subtreeFlags&14680064),h!==null?u=wr(h,u):(u=Dr(u,f,r,null),u.flags|=2),u.return=t,s.return=t,s.sibling=u,t.child=s,s=u,u=t.child,f=e.child.memoizedState,f=f===null?$a(r):{baseLanes:f.baseLanes|r,cachePool:null,transitions:f.transitions},u.memoizedState=f,u.childLanes=e.childLanes&~r,t.memoizedState=Ia,s}return u=e.child,e=u.sibling,s=wr(u,{mode:"visible",children:s.children}),(t.mode&1)===0&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function Aa(e,t){return t=Ni({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function mi(e,t,r,s){return s!==null&&ia(s),so(t,e.child,null,r),e=Aa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function n0(e,t,r,s,a,u,f){if(r)return t.flags&256?(t.flags&=-257,s=_a(Error(i(422))),mi(e,t,f,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(u=s.fallback,a=t.mode,s=Ni({mode:"visible",children:s.children},a,0,null),u=Dr(u,a,f,null),u.flags|=2,s.return=t,u.return=t,s.sibling=u,t.child=s,(t.mode&1)!==0&&so(t,e.child,null,f),t.child.memoizedState=$a(f),t.memoizedState=Ia,u);if((t.mode&1)===0)return mi(e,t,f,null);if(a.data==="$!"){if(s=a.nextSibling&&a.nextSibling.dataset,s)var h=s.dgst;return s=h,u=Error(i(419)),s=_a(u,s,void 0),mi(e,t,f,s)}if(h=(f&e.childLanes)!==0,Gt||h){if(s=jt,s!==null){switch(f&-f){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(s.suspendedLanes|f))!==0?0:a,a!==0&&a!==u.retryLane&&(u.retryLane=a,Wn(e,a),Cn(s,e,a,-1))}return Qa(),s=_a(Error(i(421))),mi(e,t,f,s)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=m0.bind(null,e),a._reactRetry=t,null):(e=u.treeContext,tn=ur(a.nextSibling),en=t,rt=!0,bn=null,e!==null&&(cn[un++]=Un,cn[un++]=Hn,cn[un++]=Ir,Un=e.id,Hn=e.overflow,Ir=t),t=Aa(t,s.children),t.flags|=4096,t)}function df(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),ua(e.return,t,r)}function Pa(e,t,r,s,a){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:a}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=s,u.tail=r,u.tailMode=a)}function ff(e,t,r){var s=t.pendingProps,a=s.revealOrder,u=s.tail;if(Mt(e,t,s.children,r),s=st.current,(s&2)!==0)s=s&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&df(e,r,t);else if(e.tag===19)df(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Ke(st,s),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(r=t.child,a=null;r!==null;)e=r.alternate,e!==null&&ai(e)===null&&(a=r),r=r.sibling;r=a,r===null?(a=t.child,t.child=null):(a=r.sibling,r.sibling=null),Pa(t,!1,a,r,u);break;case"backwards":for(r=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ai(e)===null){t.child=a;break}e=a.sibling,a.sibling=r,r=a,a=e}Pa(t,!0,r,null,u);break;case"together":Pa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function gi(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Gn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Or|=t.lanes,(r&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,r=wr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=wr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function r0(e,t,r){switch(t.tag){case 3:af(t),oo();break;case 5:Ed(t);break;case 1:Vt(t.type)&&Js(t);break;case 4:pa(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,a=t.memoizedProps.value;Ke(oi,s._currentValue),s._currentValue=a;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(Ke(st,st.current&1),t.flags|=128,null):(r&t.child.childLanes)!==0?uf(e,t,r):(Ke(st,st.current&1),e=Gn(e,t,r),e!==null?e.sibling:null);Ke(st,st.current&1);break;case 19:if(s=(r&t.childLanes)!==0,(e.flags&128)!==0){if(s)return ff(e,t,r);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ke(st,st.current),s)break;return null;case 22:case 23:return t.lanes=0,of(e,t,r)}return Gn(e,t,r)}var pf,La,hf,mf;pf=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},La=function(){},hf=function(e,t,r,s){var a=e.memoizedProps;if(a!==s){e=t.stateNode,Pr(An.current);var u=null;switch(r){case"input":a=kt(e,a),s=kt(e,s),u=[];break;case"select":a=M({},a,{value:void 0}),s=M({},s,{value:void 0}),u=[];break;case"textarea":a=tt(e,a),s=tt(e,s),u=[];break;default:typeof a.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=Qs)}er(r,s);var f;r=null;for(k in a)if(!s.hasOwnProperty(k)&&a.hasOwnProperty(k)&&a[k]!=null)if(k==="style"){var h=a[k];for(f in h)h.hasOwnProperty(f)&&(r||(r={}),r[f]="")}else k!=="dangerouslySetInnerHTML"&&k!=="children"&&k!=="suppressContentEditableWarning"&&k!=="suppressHydrationWarning"&&k!=="autoFocus"&&(d.hasOwnProperty(k)?u||(u=[]):(u=u||[]).push(k,null));for(k in s){var x=s[k];if(h=a!=null?a[k]:void 0,s.hasOwnProperty(k)&&x!==h&&(x!=null||h!=null))if(k==="style")if(h){for(f in h)!h.hasOwnProperty(f)||x&&x.hasOwnProperty(f)||(r||(r={}),r[f]="");for(f in x)x.hasOwnProperty(f)&&h[f]!==x[f]&&(r||(r={}),r[f]=x[f])}else r||(u||(u=[]),u.push(k,r)),r=x;else k==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,h=h?h.__html:void 0,x!=null&&h!==x&&(u=u||[]).push(k,x)):k==="children"?typeof x!="string"&&typeof x!="number"||(u=u||[]).push(k,""+x):k!=="suppressContentEditableWarning"&&k!=="suppressHydrationWarning"&&(d.hasOwnProperty(k)?(x!=null&&k==="onScroll"&&Je("scroll",e),u||h===x||(u=[])):(u=u||[]).push(k,x))}r&&(u=u||[]).push("style",r);var k=u;(t.updateQueue=k)&&(t.flags|=4)}},mf=function(e,t,r,s){r!==s&&(t.flags|=4)};function rs(e,t){if(!rt)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function $t(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags&14680064,s|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)r|=a.lanes|a.childLanes,s|=a.subtreeFlags,s|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function o0(e,t,r){var s=t.pendingProps;switch(ra(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(t),null;case 1:return Vt(t.type)&&Xs(),$t(t),null;case 3:return s=t.stateNode,ao(),Ze(Wt),Ze(Rt),ga(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ni(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,bn!==null&&(Ga(bn),bn=null))),La(e,t),$t(t),null;case 5:ha(t);var a=Pr(Jo.current);if(r=t.type,e!==null&&t.stateNode!=null)hf(e,t,r,s,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(i(166));return $t(t),null}if(e=Pr(An.current),ni(t)){s=t.stateNode,r=t.type;var u=t.memoizedProps;switch(s[$n]=t,s[qo]=u,e=(t.mode&1)!==0,r){case"dialog":Je("cancel",s),Je("close",s);break;case"iframe":case"object":case"embed":Je("load",s);break;case"video":case"audio":for(a=0;a<Wo.length;a++)Je(Wo[a],s);break;case"source":Je("error",s);break;case"img":case"image":case"link":Je("error",s),Je("load",s);break;case"details":Je("toggle",s);break;case"input":Nn(s,u),Je("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!u.multiple},Je("invalid",s);break;case"textarea":nt(s,u),Je("invalid",s)}er(r,u),a=null;for(var f in u)if(u.hasOwnProperty(f)){var h=u[f];f==="children"?typeof h=="string"?s.textContent!==h&&(u.suppressHydrationWarning!==!0&&Ys(s.textContent,h,e),a=["children",h]):typeof h=="number"&&s.textContent!==""+h&&(u.suppressHydrationWarning!==!0&&Ys(s.textContent,h,e),a=["children",""+h]):d.hasOwnProperty(f)&&h!=null&&f==="onScroll"&&Je("scroll",s)}switch(r){case"input":yt(s),I(s,u,!0);break;case"textarea":yt(s),on(s);break;case"select":case"option":break;default:typeof u.onClick=="function"&&(s.onclick=Qs)}s=a,t.updateQueue=s,s!==null&&(t.flags|=4)}else{f=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=sn(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=f.createElement(r,{is:s.is}):(e=f.createElement(r),r==="select"&&(f=e,s.multiple?f.multiple=!0:s.size&&(f.size=s.size))):e=f.createElementNS(e,r),e[$n]=t,e[qo]=s,pf(e,t,!1,!1),t.stateNode=e;e:{switch(f=an(r,s),r){case"dialog":Je("cancel",e),Je("close",e),a=s;break;case"iframe":case"object":case"embed":Je("load",e),a=s;break;case"video":case"audio":for(a=0;a<Wo.length;a++)Je(Wo[a],e);a=s;break;case"source":Je("error",e),a=s;break;case"img":case"image":case"link":Je("error",e),Je("load",e),a=s;break;case"details":Je("toggle",e),a=s;break;case"input":Nn(e,s),a=kt(e,s),Je("invalid",e);break;case"option":a=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},a=M({},s,{value:void 0}),Je("invalid",e);break;case"textarea":nt(e,s),a=tt(e,s),Je("invalid",e);break;default:a=s}er(r,a),h=a;for(u in h)if(h.hasOwnProperty(u)){var x=h[u];u==="style"?ln(e,x):u==="dangerouslySetInnerHTML"?(x=x?x.__html:void 0,x!=null&&Zn(e,x)):u==="children"?typeof x=="string"?(r!=="textarea"||x!=="")&&Jt(e,x):typeof x=="number"&&Jt(e,""+x):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(d.hasOwnProperty(u)?x!=null&&u==="onScroll"&&Je("scroll",e):x!=null&&xe(e,u,x,f))}switch(r){case"input":yt(e),I(e,s,!1);break;case"textarea":yt(e),on(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Q(s.value));break;case"select":e.multiple=!!s.multiple,u=s.value,u!=null?ut(e,!!s.multiple,u,!1):s.defaultValue!=null&&ut(e,!!s.multiple,s.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=Qs)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return $t(t),null;case 6:if(e&&t.stateNode!=null)mf(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(i(166));if(r=Pr(Jo.current),Pr(An.current),ni(t)){if(s=t.stateNode,r=t.memoizedProps,s[$n]=t,(u=s.nodeValue!==r)&&(e=en,e!==null))switch(e.tag){case 3:Ys(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ys(s.nodeValue,r,(e.mode&1)!==0)}u&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[$n]=t,t.stateNode=s}return $t(t),null;case 13:if(Ze(st),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(rt&&tn!==null&&(t.mode&1)!==0&&(t.flags&128)===0)xd(),oo(),t.flags|=98560,u=!1;else if(u=ni(t),s!==null&&s.dehydrated!==null){if(e===null){if(!u)throw Error(i(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(i(317));u[$n]=t}else oo(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;$t(t),u=!1}else bn!==null&&(Ga(bn),bn=null),u=!0;if(!u)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(st.current&1)!==0?wt===0&&(wt=3):Qa())),t.updateQueue!==null&&(t.flags|=4),$t(t),null);case 4:return ao(),La(e,t),e===null&&Vo(t.stateNode.containerInfo),$t(t),null;case 10:return ca(t.type._context),$t(t),null;case 17:return Vt(t.type)&&Xs(),$t(t),null;case 19:if(Ze(st),u=t.memoizedState,u===null)return $t(t),null;if(s=(t.flags&128)!==0,f=u.rendering,f===null)if(s)rs(u,!1);else{if(wt!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=ai(e),f!==null){for(t.flags|=128,rs(u,!1),s=f.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)u=r,e=s,u.flags&=14680066,f=u.alternate,f===null?(u.childLanes=0,u.lanes=e,u.child=null,u.subtreeFlags=0,u.memoizedProps=null,u.memoizedState=null,u.updateQueue=null,u.dependencies=null,u.stateNode=null):(u.childLanes=f.childLanes,u.lanes=f.lanes,u.child=f.child,u.subtreeFlags=0,u.deletions=null,u.memoizedProps=f.memoizedProps,u.memoizedState=f.memoizedState,u.updateQueue=f.updateQueue,u.type=f.type,e=f.dependencies,u.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Ke(st,st.current&1|2),t.child}e=e.sibling}u.tail!==null&&dt()>po&&(t.flags|=128,s=!0,rs(u,!1),t.lanes=4194304)}else{if(!s)if(e=ai(f),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),rs(u,!0),u.tail===null&&u.tailMode==="hidden"&&!f.alternate&&!rt)return $t(t),null}else 2*dt()-u.renderingStartTime>po&&r!==1073741824&&(t.flags|=128,s=!0,rs(u,!1),t.lanes=4194304);u.isBackwards?(f.sibling=t.child,t.child=f):(r=u.last,r!==null?r.sibling=f:t.child=f,u.last=f)}return u.tail!==null?(t=u.tail,u.rendering=t,u.tail=t.sibling,u.renderingStartTime=dt(),t.sibling=null,r=st.current,Ke(st,s?r&1|2:r&1),t):($t(t),null);case 22:case 23:return Ya(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&(t.mode&1)!==0?(nn&1073741824)!==0&&($t(t),t.subtreeFlags&6&&(t.flags|=8192)):$t(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function s0(e,t){switch(ra(t),t.tag){case 1:return Vt(t.type)&&Xs(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ao(),Ze(Wt),Ze(Rt),ga(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return ha(t),null;case 13:if(Ze(st),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));oo()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ze(st),null;case 4:return ao(),null;case 10:return ca(t.type._context),null;case 22:case 23:return Ya(),null;case 24:return null;default:return null}}var xi=!1,At=!1,i0=typeof WeakSet=="function"?WeakSet:Set,ie=null;function uo(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){ct(e,t,s)}else r.current=null}function Oa(e,t,r){try{r()}catch(s){ct(e,t,s)}}var gf=!1;function l0(e,t){if(Yl=Ms,e=qu(),Dl(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var a=s.anchorOffset,u=s.focusNode;s=s.focusOffset;try{r.nodeType,u.nodeType}catch{r=null;break e}var f=0,h=-1,x=-1,k=0,z=0,D=e,L=null;t:for(;;){for(var se;D!==r||a!==0&&D.nodeType!==3||(h=f+a),D!==u||s!==0&&D.nodeType!==3||(x=f+s),D.nodeType===3&&(f+=D.nodeValue.length),(se=D.firstChild)!==null;)L=D,D=se;for(;;){if(D===e)break t;if(L===r&&++k===a&&(h=f),L===u&&++z===s&&(x=f),(se=D.nextSibling)!==null)break;D=L,L=D.parentNode}D=se}r=h===-1||x===-1?null:{start:h,end:x}}else r=null}r=r||{start:0,end:0}}else r=null;for(Ql={focusedElem:e,selectionRange:r},Ms=!1,ie=t;ie!==null;)if(t=ie,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ie=e;else for(;ie!==null;){t=ie;try{var ce=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(ce!==null){var ue=ce.memoizedProps,ft=ce.memoizedState,w=t.stateNode,v=w.getSnapshotBeforeUpdate(t.elementType===t.type?ue:wn(t.type,ue),ft);w.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var S=t.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(U){ct(t,t.return,U)}if(e=t.sibling,e!==null){e.return=t.return,ie=e;break}ie=t.return}return ce=gf,gf=!1,ce}function os(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var a=s=s.next;do{if((a.tag&e)===e){var u=a.destroy;a.destroy=void 0,u!==void 0&&Oa(t,r,u)}a=a.next}while(a!==s)}}function yi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function Ma(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function xf(e){var t=e.alternate;t!==null&&(e.alternate=null,xf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[$n],delete t[qo],delete t[Zl],delete t[Hm],delete t[Wm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function yf(e){return e.tag===5||e.tag===3||e.tag===4}function vf(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||yf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function za(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=Qs));else if(s!==4&&(e=e.child,e!==null))for(za(e,t,r),e=e.sibling;e!==null;)za(e,t,r),e=e.sibling}function Fa(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(Fa(e,t,r),e=e.sibling;e!==null;)Fa(e,t,r),e=e.sibling}var Nt=null,Sn=!1;function gr(e,t,r){for(r=r.child;r!==null;)bf(e,t,r),r=r.sibling}function bf(e,t,r){if(In&&typeof In.onCommitFiberUnmount=="function")try{In.onCommitFiberUnmount(Is,r)}catch{}switch(r.tag){case 5:At||uo(r,t);case 6:var s=Nt,a=Sn;Nt=null,gr(e,t,r),Nt=s,Sn=a,Nt!==null&&(Sn?(e=Nt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):Nt.removeChild(r.stateNode));break;case 18:Nt!==null&&(Sn?(e=Nt,r=r.stateNode,e.nodeType===8?Jl(e.parentNode,r):e.nodeType===1&&Jl(e,r),Oo(e)):Jl(Nt,r.stateNode));break;case 4:s=Nt,a=Sn,Nt=r.stateNode.containerInfo,Sn=!0,gr(e,t,r),Nt=s,Sn=a;break;case 0:case 11:case 14:case 15:if(!At&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){a=s=s.next;do{var u=a,f=u.destroy;u=u.tag,f!==void 0&&((u&2)!==0||(u&4)!==0)&&Oa(r,t,f),a=a.next}while(a!==s)}gr(e,t,r);break;case 1:if(!At&&(uo(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(h){ct(r,t,h)}gr(e,t,r);break;case 21:gr(e,t,r);break;case 22:r.mode&1?(At=(s=At)||r.memoizedState!==null,gr(e,t,r),At=s):gr(e,t,r);break;default:gr(e,t,r)}}function wf(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new i0),t.forEach(function(s){var a=g0.bind(null,e,s);r.has(s)||(r.add(s),s.then(a,a))})}}function kn(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var a=r[s];try{var u=e,f=t,h=f;e:for(;h!==null;){switch(h.tag){case 5:Nt=h.stateNode,Sn=!1;break e;case 3:Nt=h.stateNode.containerInfo,Sn=!0;break e;case 4:Nt=h.stateNode.containerInfo,Sn=!0;break e}h=h.return}if(Nt===null)throw Error(i(160));bf(u,f,a),Nt=null,Sn=!1;var x=a.alternate;x!==null&&(x.return=null),a.return=null}catch(k){ct(a,t,k)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Sf(t,e),t=t.sibling}function Sf(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(kn(t,e),Ln(e),s&4){try{os(3,e,e.return),yi(3,e)}catch(ue){ct(e,e.return,ue)}try{os(5,e,e.return)}catch(ue){ct(e,e.return,ue)}}break;case 1:kn(t,e),Ln(e),s&512&&r!==null&&uo(r,r.return);break;case 5:if(kn(t,e),Ln(e),s&512&&r!==null&&uo(r,r.return),e.flags&32){var a=e.stateNode;try{Jt(a,"")}catch(ue){ct(e,e.return,ue)}}if(s&4&&(a=e.stateNode,a!=null)){var u=e.memoizedProps,f=r!==null?r.memoizedProps:u,h=e.type,x=e.updateQueue;if(e.updateQueue=null,x!==null)try{h==="input"&&u.type==="radio"&&u.name!=null&&Be(a,u),an(h,f);var k=an(h,u);for(f=0;f<x.length;f+=2){var z=x[f],D=x[f+1];z==="style"?ln(a,D):z==="dangerouslySetInnerHTML"?Zn(a,D):z==="children"?Jt(a,D):xe(a,z,D,k)}switch(h){case"input":Ve(a,u);break;case"textarea":Xt(a,u);break;case"select":var L=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!u.multiple;var se=u.value;se!=null?ut(a,!!u.multiple,se,!1):L!==!!u.multiple&&(u.defaultValue!=null?ut(a,!!u.multiple,u.defaultValue,!0):ut(a,!!u.multiple,u.multiple?[]:"",!1))}a[qo]=u}catch(ue){ct(e,e.return,ue)}}break;case 6:if(kn(t,e),Ln(e),s&4){if(e.stateNode===null)throw Error(i(162));a=e.stateNode,u=e.memoizedProps;try{a.nodeValue=u}catch(ue){ct(e,e.return,ue)}}break;case 3:if(kn(t,e),Ln(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{Oo(t.containerInfo)}catch(ue){ct(e,e.return,ue)}break;case 4:kn(t,e),Ln(e);break;case 13:kn(t,e),Ln(e),a=e.child,a.flags&8192&&(u=a.memoizedState!==null,a.stateNode.isHidden=u,!u||a.alternate!==null&&a.alternate.memoizedState!==null||(Ua=dt())),s&4&&wf(e);break;case 22:if(z=r!==null&&r.memoizedState!==null,e.mode&1?(At=(k=At)||z,kn(t,e),At=k):kn(t,e),Ln(e),s&8192){if(k=e.memoizedState!==null,(e.stateNode.isHidden=k)&&!z&&(e.mode&1)!==0)for(ie=e,z=e.child;z!==null;){for(D=ie=z;ie!==null;){switch(L=ie,se=L.child,L.tag){case 0:case 11:case 14:case 15:os(4,L,L.return);break;case 1:uo(L,L.return);var ce=L.stateNode;if(typeof ce.componentWillUnmount=="function"){s=L,r=L.return;try{t=s,ce.props=t.memoizedProps,ce.state=t.memoizedState,ce.componentWillUnmount()}catch(ue){ct(s,r,ue)}}break;case 5:uo(L,L.return);break;case 22:if(L.memoizedState!==null){Ef(D);continue}}se!==null?(se.return=L,ie=se):Ef(D)}z=z.sibling}e:for(z=null,D=e;;){if(D.tag===5){if(z===null){z=D;try{a=D.stateNode,k?(u=a.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none"):(h=D.stateNode,x=D.memoizedProps.style,f=x!=null&&x.hasOwnProperty("display")?x.display:null,h.style.display=at("display",f))}catch(ue){ct(e,e.return,ue)}}}else if(D.tag===6){if(z===null)try{D.stateNode.nodeValue=k?"":D.memoizedProps}catch(ue){ct(e,e.return,ue)}}else if((D.tag!==22&&D.tag!==23||D.memoizedState===null||D===e)&&D.child!==null){D.child.return=D,D=D.child;continue}if(D===e)break e;for(;D.sibling===null;){if(D.return===null||D.return===e)break e;z===D&&(z=null),D=D.return}z===D&&(z=null),D.sibling.return=D.return,D=D.sibling}}break;case 19:kn(t,e),Ln(e),s&4&&wf(e);break;case 21:break;default:kn(t,e),Ln(e)}}function Ln(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(yf(r)){var s=r;break e}r=r.return}throw Error(i(160))}switch(s.tag){case 5:var a=s.stateNode;s.flags&32&&(Jt(a,""),s.flags&=-33);var u=vf(e);Fa(e,u,a);break;case 3:case 4:var f=s.stateNode.containerInfo,h=vf(e);za(e,h,f);break;default:throw Error(i(161))}}catch(x){ct(e,e.return,x)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function a0(e,t,r){ie=e,kf(e)}function kf(e,t,r){for(var s=(e.mode&1)!==0;ie!==null;){var a=ie,u=a.child;if(a.tag===22&&s){var f=a.memoizedState!==null||xi;if(!f){var h=a.alternate,x=h!==null&&h.memoizedState!==null||At;h=xi;var k=At;if(xi=f,(At=x)&&!k)for(ie=a;ie!==null;)f=ie,x=f.child,f.tag===22&&f.memoizedState!==null?jf(a):x!==null?(x.return=f,ie=x):jf(a);for(;u!==null;)ie=u,kf(u),u=u.sibling;ie=a,xi=h,At=k}Cf(e)}else(a.subtreeFlags&8772)!==0&&u!==null?(u.return=a,ie=u):Cf(e)}}function Cf(e){for(;ie!==null;){var t=ie;if((t.flags&8772)!==0){var r=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:At||yi(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!At)if(r===null)s.componentDidMount();else{var a=t.elementType===t.type?r.memoizedProps:wn(t.type,r.memoizedProps);s.componentDidUpdate(a,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var u=t.updateQueue;u!==null&&Cd(t,u,s);break;case 3:var f=t.updateQueue;if(f!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}Cd(t,f,r)}break;case 5:var h=t.stateNode;if(r===null&&t.flags&4){r=h;var x=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":x.autoFocus&&r.focus();break;case"img":x.src&&(r.src=x.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var k=t.alternate;if(k!==null){var z=k.memoizedState;if(z!==null){var D=z.dehydrated;D!==null&&Oo(D)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}At||t.flags&512&&Ma(t)}catch(L){ct(t,t.return,L)}}if(t===e){ie=null;break}if(r=t.sibling,r!==null){r.return=t.return,ie=r;break}ie=t.return}}function Ef(e){for(;ie!==null;){var t=ie;if(t===e){ie=null;break}var r=t.sibling;if(r!==null){r.return=t.return,ie=r;break}ie=t.return}}function jf(e){for(;ie!==null;){var t=ie;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{yi(4,t)}catch(x){ct(t,r,x)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var a=t.return;try{s.componentDidMount()}catch(x){ct(t,a,x)}}var u=t.return;try{Ma(t)}catch(x){ct(t,u,x)}break;case 5:var f=t.return;try{Ma(t)}catch(x){ct(t,f,x)}}}catch(x){ct(t,t.return,x)}if(t===e){ie=null;break}var h=t.sibling;if(h!==null){h.return=t.return,ie=h;break}ie=t.return}}var c0=Math.ceil,vi=Te.ReactCurrentDispatcher,Da=Te.ReactCurrentOwner,pn=Te.ReactCurrentBatchConfig,Fe=0,jt=null,ht=null,Tt=0,nn=0,fo=dr(0),wt=0,ss=null,Or=0,bi=0,Ba=0,is=null,qt=null,Ua=0,po=1/0,qn=null,wi=!1,Ha=null,xr=null,Si=!1,yr=null,ki=0,ls=0,Wa=null,Ci=-1,Ei=0;function zt(){return(Fe&6)!==0?dt():Ci!==-1?Ci:Ci=dt()}function vr(e){return(e.mode&1)===0?1:(Fe&2)!==0&&Tt!==0?Tt&-Tt:Gm.transition!==null?(Ei===0&&(Ei=yu()),Ei):(e=Ge,e!==0||(e=window.event,e=e===void 0?16:_u(e.type)),e)}function Cn(e,t,r,s){if(50<ls)throw ls=0,Wa=null,Error(i(185));Io(e,r,s),((Fe&2)===0||e!==jt)&&(e===jt&&((Fe&2)===0&&(bi|=r),wt===4&&br(e,Tt)),Yt(e,s),r===1&&Fe===0&&(t.mode&1)===0&&(po=dt()+500,Zs&&pr()))}function Yt(e,t){var r=e.callbackNode;Gh(e,t);var s=Ps(e,e===jt?Tt:0);if(s===0)r!==null&&mu(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&mu(r),t===1)e.tag===0?Vm(Nf.bind(null,e)):fd(Nf.bind(null,e)),Bm(function(){(Fe&6)===0&&pr()}),r=null;else{switch(vu(s)){case 1:r=kl;break;case 4:r=gu;break;case 16:r=Rs;break;case 536870912:r=xu;break;default:r=Rs}r=Of(r,_f.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function _f(e,t){if(Ci=-1,Ei=0,(Fe&6)!==0)throw Error(i(327));var r=e.callbackNode;if(ho()&&e.callbackNode!==r)return null;var s=Ps(e,e===jt?Tt:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||t)t=ji(e,s);else{t=s;var a=Fe;Fe|=2;var u=Rf();(jt!==e||Tt!==t)&&(qn=null,po=dt()+500,zr(e,t));do try{f0();break}catch(h){Tf(e,h)}while(!0);aa(),vi.current=u,Fe=a,ht!==null?t=0:(jt=null,Tt=0,t=wt)}if(t!==0){if(t===2&&(a=Cl(e),a!==0&&(s=a,t=Va(e,a))),t===1)throw r=ss,zr(e,0),br(e,s),Yt(e,dt()),r;if(t===6)br(e,s);else{if(a=e.current.alternate,(s&30)===0&&!u0(a)&&(t=ji(e,s),t===2&&(u=Cl(e),u!==0&&(s=u,t=Va(e,u))),t===1))throw r=ss,zr(e,0),br(e,s),Yt(e,dt()),r;switch(e.finishedWork=a,e.finishedLanes=s,t){case 0:case 1:throw Error(i(345));case 2:Fr(e,qt,qn);break;case 3:if(br(e,s),(s&130023424)===s&&(t=Ua+500-dt(),10<t)){if(Ps(e,0)!==0)break;if(a=e.suspendedLanes,(a&s)!==s){zt(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Xl(Fr.bind(null,e,qt,qn),t);break}Fr(e,qt,qn);break;case 4:if(br(e,s),(s&4194240)===s)break;for(t=e.eventTimes,a=-1;0<s;){var f=31-yn(s);u=1<<f,f=t[f],f>a&&(a=f),s&=~u}if(s=a,s=dt()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*c0(s/1960))-s,10<s){e.timeoutHandle=Xl(Fr.bind(null,e,qt,qn),s);break}Fr(e,qt,qn);break;case 5:Fr(e,qt,qn);break;default:throw Error(i(329))}}}return Yt(e,dt()),e.callbackNode===r?_f.bind(null,e):null}function Va(e,t){var r=is;return e.current.memoizedState.isDehydrated&&(zr(e,t).flags|=256),e=ji(e,t),e!==2&&(t=qt,qt=r,t!==null&&Ga(t)),e}function Ga(e){qt===null?qt=e:qt.push.apply(qt,e)}function u0(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var a=r[s],u=a.getSnapshot;a=a.value;try{if(!vn(u(),a))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function br(e,t){for(t&=~Ba,t&=~bi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-yn(t),s=1<<r;e[r]=-1,t&=~s}}function Nf(e){if((Fe&6)!==0)throw Error(i(327));ho();var t=Ps(e,0);if((t&1)===0)return Yt(e,dt()),null;var r=ji(e,t);if(e.tag!==0&&r===2){var s=Cl(e);s!==0&&(t=s,r=Va(e,s))}if(r===1)throw r=ss,zr(e,0),br(e,t),Yt(e,dt()),r;if(r===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Fr(e,qt,qn),Yt(e,dt()),null}function qa(e,t){var r=Fe;Fe|=1;try{return e(t)}finally{Fe=r,Fe===0&&(po=dt()+500,Zs&&pr())}}function Mr(e){yr!==null&&yr.tag===0&&(Fe&6)===0&&ho();var t=Fe;Fe|=1;var r=pn.transition,s=Ge;try{if(pn.transition=null,Ge=1,e)return e()}finally{Ge=s,pn.transition=r,Fe=t,(Fe&6)===0&&pr()}}function Ya(){nn=fo.current,Ze(fo)}function zr(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,Dm(r)),ht!==null)for(r=ht.return;r!==null;){var s=r;switch(ra(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Xs();break;case 3:ao(),Ze(Wt),Ze(Rt),ga();break;case 5:ha(s);break;case 4:ao();break;case 13:Ze(st);break;case 19:Ze(st);break;case 10:ca(s.type._context);break;case 22:case 23:Ya()}r=r.return}if(jt=e,ht=e=wr(e.current,null),Tt=nn=t,wt=0,ss=null,Ba=bi=Or=0,qt=is=null,Ar!==null){for(t=0;t<Ar.length;t++)if(r=Ar[t],s=r.interleaved,s!==null){r.interleaved=null;var a=s.next,u=r.pending;if(u!==null){var f=u.next;u.next=a,s.next=f}r.pending=s}Ar=null}return e}function Tf(e,t){do{var r=ht;try{if(aa(),ci.current=pi,ui){for(var s=it.memoizedState;s!==null;){var a=s.queue;a!==null&&(a.pending=null),s=s.next}ui=!1}if(Lr=0,Et=bt=it=null,Zo=!1,es=0,Da.current=null,r===null||r.return===null){wt=1,ss=t,ht=null;break}e:{var u=e,f=r.return,h=r,x=t;if(t=Tt,h.flags|=32768,x!==null&&typeof x=="object"&&typeof x.then=="function"){var k=x,z=h,D=z.tag;if((z.mode&1)===0&&(D===0||D===11||D===15)){var L=z.alternate;L?(z.updateQueue=L.updateQueue,z.memoizedState=L.memoizedState,z.lanes=L.lanes):(z.updateQueue=null,z.memoizedState=null)}var se=Zd(f);if(se!==null){se.flags&=-257,ef(se,f,h,u,t),se.mode&1&&Jd(u,k,t),t=se,x=k;var ce=t.updateQueue;if(ce===null){var ue=new Set;ue.add(x),t.updateQueue=ue}else ce.add(x);break e}else{if((t&1)===0){Jd(u,k,t),Qa();break e}x=Error(i(426))}}else if(rt&&h.mode&1){var ft=Zd(f);if(ft!==null){(ft.flags&65536)===0&&(ft.flags|=256),ef(ft,f,h,u,t),ia(co(x,h));break e}}u=x=co(x,h),wt!==4&&(wt=2),is===null?is=[u]:is.push(u),u=f;do{switch(u.tag){case 3:u.flags|=65536,t&=-t,u.lanes|=t;var w=Kd(u,x,t);kd(u,w);break e;case 1:h=x;var v=u.type,S=u.stateNode;if((u.flags&128)===0&&(typeof v.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(xr===null||!xr.has(S)))){u.flags|=65536,t&=-t,u.lanes|=t;var U=Xd(u,h,t);kd(u,U);break e}}u=u.return}while(u!==null)}$f(r)}catch(pe){t=pe,ht===r&&r!==null&&(ht=r=r.return);continue}break}while(!0)}function Rf(){var e=vi.current;return vi.current=pi,e===null?pi:e}function Qa(){(wt===0||wt===3||wt===2)&&(wt=4),jt===null||(Or&268435455)===0&&(bi&268435455)===0||br(jt,Tt)}function ji(e,t){var r=Fe;Fe|=2;var s=Rf();(jt!==e||Tt!==t)&&(qn=null,zr(e,t));do try{d0();break}catch(a){Tf(e,a)}while(!0);if(aa(),Fe=r,vi.current=s,ht!==null)throw Error(i(261));return jt=null,Tt=0,wt}function d0(){for(;ht!==null;)If(ht)}function f0(){for(;ht!==null&&!Mh();)If(ht)}function If(e){var t=Lf(e.alternate,e,nn);e.memoizedProps=e.pendingProps,t===null?$f(e):ht=t,Da.current=null}function $f(e){var t=e;do{var r=t.alternate;if(e=t.return,(t.flags&32768)===0){if(r=o0(r,t,nn),r!==null){ht=r;return}}else{if(r=s0(r,t),r!==null){r.flags&=32767,ht=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{wt=6,ht=null;return}}if(t=t.sibling,t!==null){ht=t;return}ht=t=e}while(t!==null);wt===0&&(wt=5)}function Fr(e,t,r){var s=Ge,a=pn.transition;try{pn.transition=null,Ge=1,p0(e,t,r,s)}finally{pn.transition=a,Ge=s}return null}function p0(e,t,r,s){do ho();while(yr!==null);if((Fe&6)!==0)throw Error(i(327));r=e.finishedWork;var a=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var u=r.lanes|r.childLanes;if(qh(e,u),e===jt&&(ht=jt=null,Tt=0),(r.subtreeFlags&2064)===0&&(r.flags&2064)===0||Si||(Si=!0,Of(Rs,function(){return ho(),null})),u=(r.flags&15990)!==0,(r.subtreeFlags&15990)!==0||u){u=pn.transition,pn.transition=null;var f=Ge;Ge=1;var h=Fe;Fe|=4,Da.current=null,l0(e,r),Sf(r,e),Am(Ql),Ms=!!Yl,Ql=Yl=null,e.current=r,a0(r),zh(),Fe=h,Ge=f,pn.transition=u}else e.current=r;if(Si&&(Si=!1,yr=e,ki=a),u=e.pendingLanes,u===0&&(xr=null),Bh(r.stateNode),Yt(e,dt()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)a=t[r],s(a.value,{componentStack:a.stack,digest:a.digest});if(wi)throw wi=!1,e=Ha,Ha=null,e;return(ki&1)!==0&&e.tag!==0&&ho(),u=e.pendingLanes,(u&1)!==0?e===Wa?ls++:(ls=0,Wa=e):ls=0,pr(),null}function ho(){if(yr!==null){var e=vu(ki),t=pn.transition,r=Ge;try{if(pn.transition=null,Ge=16>e?16:e,yr===null)var s=!1;else{if(e=yr,yr=null,ki=0,(Fe&6)!==0)throw Error(i(331));var a=Fe;for(Fe|=4,ie=e.current;ie!==null;){var u=ie,f=u.child;if((ie.flags&16)!==0){var h=u.deletions;if(h!==null){for(var x=0;x<h.length;x++){var k=h[x];for(ie=k;ie!==null;){var z=ie;switch(z.tag){case 0:case 11:case 15:os(8,z,u)}var D=z.child;if(D!==null)D.return=z,ie=D;else for(;ie!==null;){z=ie;var L=z.sibling,se=z.return;if(xf(z),z===k){ie=null;break}if(L!==null){L.return=se,ie=L;break}ie=se}}}var ce=u.alternate;if(ce!==null){var ue=ce.child;if(ue!==null){ce.child=null;do{var ft=ue.sibling;ue.sibling=null,ue=ft}while(ue!==null)}}ie=u}}if((u.subtreeFlags&2064)!==0&&f!==null)f.return=u,ie=f;else e:for(;ie!==null;){if(u=ie,(u.flags&2048)!==0)switch(u.tag){case 0:case 11:case 15:os(9,u,u.return)}var w=u.sibling;if(w!==null){w.return=u.return,ie=w;break e}ie=u.return}}var v=e.current;for(ie=v;ie!==null;){f=ie;var S=f.child;if((f.subtreeFlags&2064)!==0&&S!==null)S.return=f,ie=S;else e:for(f=v;ie!==null;){if(h=ie,(h.flags&2048)!==0)try{switch(h.tag){case 0:case 11:case 15:yi(9,h)}}catch(pe){ct(h,h.return,pe)}if(h===f){ie=null;break e}var U=h.sibling;if(U!==null){U.return=h.return,ie=U;break e}ie=h.return}}if(Fe=a,pr(),In&&typeof In.onPostCommitFiberRoot=="function")try{In.onPostCommitFiberRoot(Is,e)}catch{}s=!0}return s}finally{Ge=r,pn.transition=t}}return!1}function Af(e,t,r){t=co(r,t),t=Kd(e,t,1),e=mr(e,t,1),t=zt(),e!==null&&(Io(e,1,t),Yt(e,t))}function ct(e,t,r){if(e.tag===3)Af(e,e,r);else for(;t!==null;){if(t.tag===3){Af(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(xr===null||!xr.has(s))){e=co(r,e),e=Xd(t,e,1),t=mr(t,e,1),e=zt(),t!==null&&(Io(t,1,e),Yt(t,e));break}}t=t.return}}function h0(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=zt(),e.pingedLanes|=e.suspendedLanes&r,jt===e&&(Tt&r)===r&&(wt===4||wt===3&&(Tt&130023424)===Tt&&500>dt()-Ua?zr(e,0):Ba|=r),Yt(e,t)}function Pf(e,t){t===0&&((e.mode&1)===0?t=1:(t=As,As<<=1,(As&130023424)===0&&(As=4194304)));var r=zt();e=Wn(e,t),e!==null&&(Io(e,t,r),Yt(e,r))}function m0(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Pf(e,r)}function g0(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,a=e.memoizedState;a!==null&&(r=a.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(i(314))}s!==null&&s.delete(t),Pf(e,r)}var Lf;Lf=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Wt.current)Gt=!0;else{if((e.lanes&r)===0&&(t.flags&128)===0)return Gt=!1,r0(e,t,r);Gt=(e.flags&131072)!==0}else Gt=!1,rt&&(t.flags&1048576)!==0&&pd(t,ti,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;gi(e,t),e=t.pendingProps;var a=to(t,Rt.current);lo(t,r),a=va(null,t,s,e,a,r);var u=ba();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Vt(s)?(u=!0,Js(t)):u=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,fa(t),a.updater=hi,t.stateNode=a,a._reactInternals=t,ja(t,s,e,r),t=Ra(null,t,s,!0,u,r)):(t.tag=0,rt&&u&&na(t),Mt(null,t,a,r),t=t.child),t;case 16:s=t.elementType;e:{switch(gi(e,t),e=t.pendingProps,a=s._init,s=a(s._payload),t.type=s,a=t.tag=y0(s),e=wn(s,e),a){case 0:t=Ta(null,t,s,e,r);break e;case 1:t=lf(null,t,s,e,r);break e;case 11:t=tf(null,t,s,e,r);break e;case 14:t=nf(null,t,s,wn(s.type,e),r);break e}throw Error(i(306,s,""))}return t;case 0:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:wn(s,a),Ta(e,t,s,a,r);case 1:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:wn(s,a),lf(e,t,s,a,r);case 3:e:{if(af(t),e===null)throw Error(i(387));s=t.pendingProps,u=t.memoizedState,a=u.element,Sd(e,t),li(t,s,null,r);var f=t.memoizedState;if(s=f.element,u.isDehydrated)if(u={element:s,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){a=co(Error(i(423)),t),t=cf(e,t,s,r,a);break e}else if(s!==a){a=co(Error(i(424)),t),t=cf(e,t,s,r,a);break e}else for(tn=ur(t.stateNode.containerInfo.firstChild),en=t,rt=!0,bn=null,r=bd(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(oo(),s===a){t=Gn(e,t,r);break e}Mt(e,t,s,r)}t=t.child}return t;case 5:return Ed(t),e===null&&sa(t),s=t.type,a=t.pendingProps,u=e!==null?e.memoizedProps:null,f=a.children,Kl(s,a)?f=null:u!==null&&Kl(s,u)&&(t.flags|=32),sf(e,t),Mt(e,t,f,r),t.child;case 6:return e===null&&sa(t),null;case 13:return uf(e,t,r);case 4:return pa(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=so(t,null,s,r):Mt(e,t,s,r),t.child;case 11:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:wn(s,a),tf(e,t,s,a,r);case 7:return Mt(e,t,t.pendingProps,r),t.child;case 8:return Mt(e,t,t.pendingProps.children,r),t.child;case 12:return Mt(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,a=t.pendingProps,u=t.memoizedProps,f=a.value,Ke(oi,s._currentValue),s._currentValue=f,u!==null)if(vn(u.value,f)){if(u.children===a.children&&!Wt.current){t=Gn(e,t,r);break e}}else for(u=t.child,u!==null&&(u.return=t);u!==null;){var h=u.dependencies;if(h!==null){f=u.child;for(var x=h.firstContext;x!==null;){if(x.context===s){if(u.tag===1){x=Vn(-1,r&-r),x.tag=2;var k=u.updateQueue;if(k!==null){k=k.shared;var z=k.pending;z===null?x.next=x:(x.next=z.next,z.next=x),k.pending=x}}u.lanes|=r,x=u.alternate,x!==null&&(x.lanes|=r),ua(u.return,r,t),h.lanes|=r;break}x=x.next}}else if(u.tag===10)f=u.type===t.type?null:u.child;else if(u.tag===18){if(f=u.return,f===null)throw Error(i(341));f.lanes|=r,h=f.alternate,h!==null&&(h.lanes|=r),ua(f,r,t),f=u.sibling}else f=u.child;if(f!==null)f.return=u;else for(f=u;f!==null;){if(f===t){f=null;break}if(u=f.sibling,u!==null){u.return=f.return,f=u;break}f=f.return}u=f}Mt(e,t,a.children,r),t=t.child}return t;case 9:return a=t.type,s=t.pendingProps.children,lo(t,r),a=dn(a),s=s(a),t.flags|=1,Mt(e,t,s,r),t.child;case 14:return s=t.type,a=wn(s,t.pendingProps),a=wn(s.type,a),nf(e,t,s,a,r);case 15:return rf(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,a=t.pendingProps,a=t.elementType===s?a:wn(s,a),gi(e,t),t.tag=1,Vt(s)?(e=!0,Js(t)):e=!1,lo(t,r),Yd(t,s,a),ja(t,s,a,r),Ra(null,t,s,!0,e,r);case 19:return ff(e,t,r);case 22:return of(e,t,r)}throw Error(i(156,t.tag))};function Of(e,t){return hu(e,t)}function x0(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hn(e,t,r,s){return new x0(e,t,r,s)}function Ka(e){return e=e.prototype,!(!e||!e.isReactComponent)}function y0(e){if(typeof e=="function")return Ka(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ee)return 11;if(e===Ce)return 14}return 2}function wr(e,t){var r=e.alternate;return r===null?(r=hn(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function _i(e,t,r,s,a,u){var f=2;if(s=e,typeof e=="function")Ka(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case H:return Dr(r.children,a,u,t);case de:f=8,a|=8;break;case We:return e=hn(12,r,t,a|2),e.elementType=We,e.lanes=u,e;case te:return e=hn(13,r,t,a),e.elementType=te,e.lanes=u,e;case Ne:return e=hn(19,r,t,a),e.elementType=Ne,e.lanes=u,e;case Ee:return Ni(r,a,u,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case J:f=10;break e;case ne:f=9;break e;case ee:f=11;break e;case Ce:f=14;break e;case Me:f=16,s=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=hn(f,r,t,a),t.elementType=e,t.type=s,t.lanes=u,t}function Dr(e,t,r,s){return e=hn(7,e,s,t),e.lanes=r,e}function Ni(e,t,r,s){return e=hn(22,e,s,t),e.elementType=Ee,e.lanes=r,e.stateNode={isHidden:!1},e}function Xa(e,t,r){return e=hn(6,e,null,t),e.lanes=r,e}function Ja(e,t,r){return t=hn(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function v0(e,t,r,s,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=El(0),this.expirationTimes=El(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=El(0),this.identifierPrefix=s,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Za(e,t,r,s,a,u,f,h,x){return e=new v0(e,t,r,h,x),t===1?(t=1,u===!0&&(t|=8)):t=0,u=hn(3,null,null,t),e.current=u,u.stateNode=e,u.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},fa(u),e}function b0(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:fe,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function Mf(e){if(!e)return fr;e=e._reactInternals;e:{if(Rn(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Vt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var r=e.type;if(Vt(r))return ud(e,r,t)}return t}function zf(e,t,r,s,a,u,f,h,x){return e=Za(r,s,!0,e,a,u,f,h,x),e.context=Mf(null),r=e.current,s=zt(),a=vr(r),u=Vn(s,a),u.callback=t??null,mr(r,u,a),e.current.lanes=a,Io(e,a,s),Yt(e,s),e}function Ti(e,t,r,s){var a=t.current,u=zt(),f=vr(a);return r=Mf(r),t.context===null?t.context=r:t.pendingContext=r,t=Vn(u,f),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=mr(a,t,f),e!==null&&(Cn(e,a,f,u),ii(e,a,f)),f}function Ri(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ff(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function ec(e,t){Ff(e,t),(e=e.alternate)&&Ff(e,t)}function w0(){return null}var Df=typeof reportError=="function"?reportError:function(e){console.error(e)};function tc(e){this._internalRoot=e}Ii.prototype.render=tc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));Ti(e,t,null,null)},Ii.prototype.unmount=tc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Mr(function(){Ti(null,e,null,null)}),t[Dn]=null}};function Ii(e){this._internalRoot=e}Ii.prototype.unstable_scheduleHydration=function(e){if(e){var t=Su();e={blockedOn:null,target:e,priority:t};for(var r=0;r<lr.length&&t!==0&&t<lr[r].priority;r++);lr.splice(r,0,e),r===0&&Eu(e)}};function nc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function $i(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Bf(){}function S0(e,t,r,s,a){if(a){if(typeof s=="function"){var u=s;s=function(){var k=Ri(f);u.call(k)}}var f=zf(t,s,e,0,null,!1,!1,"",Bf);return e._reactRootContainer=f,e[Dn]=f.current,Vo(e.nodeType===8?e.parentNode:e),Mr(),f}for(;a=e.lastChild;)e.removeChild(a);if(typeof s=="function"){var h=s;s=function(){var k=Ri(x);h.call(k)}}var x=Za(e,0,!1,null,null,!1,!1,"",Bf);return e._reactRootContainer=x,e[Dn]=x.current,Vo(e.nodeType===8?e.parentNode:e),Mr(function(){Ti(t,x,r,s)}),x}function Ai(e,t,r,s,a){var u=r._reactRootContainer;if(u){var f=u;if(typeof a=="function"){var h=a;a=function(){var x=Ri(f);h.call(x)}}Ti(t,f,e,a)}else f=S0(r,t,e,a,s);return Ri(f)}bu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Ro(t.pendingLanes);r!==0&&(jl(t,r|1),Yt(t,dt()),(Fe&6)===0&&(po=dt()+500,pr()))}break;case 13:Mr(function(){var s=Wn(e,1);if(s!==null){var a=zt();Cn(s,e,1,a)}}),ec(e,1)}},_l=function(e){if(e.tag===13){var t=Wn(e,134217728);if(t!==null){var r=zt();Cn(t,e,134217728,r)}ec(e,134217728)}},wu=function(e){if(e.tag===13){var t=vr(e),r=Wn(e,t);if(r!==null){var s=zt();Cn(r,e,t,s)}ec(e,t)}},Su=function(){return Ge},ku=function(e,t){var r=Ge;try{return Ge=e,t()}finally{Ge=r}},C=function(e,t,r){switch(t){case"input":if(Ve(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var a=Ks(s);if(!a)throw Error(i(90));Kt(s),Ve(s,a)}}}break;case"textarea":Xt(e,r);break;case"select":t=r.value,t!=null&&ut(e,!!r.multiple,t,!1)}},Pe=qa,Bt=Mr;var k0={usingClientEntryPoint:!1,Events:[Yo,Zr,Ks,ye,qe,qa]},as={findFiberByHostInstance:Tr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},C0={bundleType:as.bundleType,version:as.version,rendererPackageName:as.rendererPackageName,rendererConfig:as.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Te.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=fu(e),e===null?null:e.stateNode},findFiberByHostInstance:as.findFiberByHostInstance||w0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Pi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Pi.isDisabled&&Pi.supportsFiber)try{Is=Pi.inject(C0),In=Pi}catch{}}return Qt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=k0,Qt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!nc(t))throw Error(i(200));return b0(e,t,null,r)},Qt.createRoot=function(e,t){if(!nc(e))throw Error(i(299));var r=!1,s="",a=Df;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Za(e,1,!1,null,null,r,!1,s,a),e[Dn]=t.current,Vo(e.nodeType===8?e.parentNode:e),new tc(t)},Qt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=fu(t),e=e===null?null:e.stateNode,e},Qt.flushSync=function(e){return Mr(e)},Qt.hydrate=function(e,t,r){if(!$i(t))throw Error(i(200));return Ai(null,e,t,!0,r)},Qt.hydrateRoot=function(e,t,r){if(!nc(e))throw Error(i(405));var s=r!=null&&r.hydratedSources||null,a=!1,u="",f=Df;if(r!=null&&(r.unstable_strictMode===!0&&(a=!0),r.identifierPrefix!==void 0&&(u=r.identifierPrefix),r.onRecoverableError!==void 0&&(f=r.onRecoverableError)),t=zf(t,null,e,1,r??null,a,!1,u,f),e[Dn]=t.current,Vo(e),s)for(e=0;e<s.length;e++)r=s[e],a=r._getVersion,a=a(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,a]:t.mutableSourceEagerHydrationData.push(r,a);return new Ii(t)},Qt.render=function(e,t,r){if(!$i(t))throw Error(i(200));return Ai(null,e,t,!1,r)},Qt.unmountComponentAtNode=function(e){if(!$i(e))throw Error(i(40));return e._reactRootContainer?(Mr(function(){Ai(null,null,e,!1,function(){e._reactRootContainer=null,e[Dn]=null})}),!0):!1},Qt.unstable_batchedUpdates=qa,Qt.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!$i(r))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return Ai(e,t,r,!1,s)},Qt.version="18.3.1-next-f1338f8080-20240426",Qt}var Qf;function A0(){if(Qf)return sc.exports;Qf=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(o){console.error(o)}}return n(),sc.exports=$0(),sc.exports}var Kf;function P0(){if(Kf)return Li;Kf=1;var n=A0();return Li.createRoot=n.createRoot,Li.hydrateRoot=n.hydrateRoot,Li}var L0=P0();const O0="modulepreload",M0=function(n){return"/"+n},Xf={},Up=function(o,i,c){let d=Promise.resolve();if(i&&i.length>0){let m=function(j){return Promise.all(j.map(_=>Promise.resolve(_).then(R=>({status:"fulfilled",value:R}),R=>({status:"rejected",reason:R}))))};document.getElementsByTagName("link");const y=document.querySelector("meta[property=csp-nonce]"),g=(y==null?void 0:y.nonce)||(y==null?void 0:y.getAttribute("nonce"));d=m(i.map(j=>{if(j=M0(j),j in Xf)return;Xf[j]=!0;const _=j.endsWith(".css"),R=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${j}"]${R}`))return;const A=document.createElement("link");if(A.rel=_?"stylesheet":O0,_||(A.as="script"),A.crossOrigin="",A.href=j,g&&A.setAttribute("nonce",g),document.head.appendChild(A),_)return new Promise((F,oe)=>{A.addEventListener("load",F),A.addEventListener("error",()=>oe(new Error(`Unable to preload CSS for ${j}`)))})}))}function p(m){const y=new Event("vite:preloadError",{cancelable:!0});if(y.payload=m,window.dispatchEvent(y),!y.defaultPrevented)throw m}return d.then(m=>{for(const y of m||[])y.status==="rejected"&&p(y.reason);return o().catch(p)})};var et="-ms-",ws="-moz-",Ue="-webkit-",Hp="comm",ml="rule",Kc="decl",z0="@import",F0="@namespace",Wp="@keyframes",D0="@layer",Vp=Math.abs,Xc=String.fromCharCode,Rc=Object.assign;function B0(n,o){return St(n,0)^45?(((o<<2^St(n,0))<<2^St(n,1))<<2^St(n,2))<<2^St(n,3):0}function Gp(n){return n.trim()}function Xn(n,o){return(n=o.exec(n))?n[0]:n}function Ie(n,o,i){return n.replace(o,i)}function Zi(n,o,i){return n.indexOf(o,i)}function St(n,o){return n.charCodeAt(o)|0}function Vr(n,o,i){return n.slice(o,i)}function En(n){return n.length}function qp(n){return n.length}function xs(n,o){return o.push(n),n}function U0(n,o){return n.map(o).join("")}function Jf(n,o){return n.filter(function(i){return!Xn(i,o)})}var gl=1,ko=1,Yp=0,gn=0,gt=0,jo="";function xl(n,o,i,c,d,p,m,y){return{value:n,root:o,parent:i,type:c,props:d,children:p,line:gl,column:ko,length:m,return:"",siblings:y}}function Er(n,o){return Rc(xl("",null,null,"",null,null,0,n.siblings),n,{length:-n.length},o)}function mo(n){for(;n.root;)n=Er(n.root,{children:[n]});xs(n,n.siblings)}function H0(){return gt}function W0(){return gt=gn>0?St(jo,--gn):0,ko--,gt===10&&(ko=1,gl--),gt}function _n(){return gt=gn<Yp?St(jo,gn++):0,ko++,gt===10&&(ko=1,gl++),gt}function jr(){return St(jo,gn)}function el(){return gn}function yl(n,o){return Vr(jo,n,o)}function Es(n){switch(n){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function V0(n){return gl=ko=1,Yp=En(jo=n),gn=0,[]}function G0(n){return jo="",n}function ac(n){return Gp(yl(gn-1,Ic(n===91?n+2:n===40?n+1:n)))}function q0(n){for(;(gt=jr())&&gt<33;)_n();return Es(n)>2||Es(gt)>3?"":" "}function Y0(n,o){for(;--o&&_n()&&!(gt<48||gt>102||gt>57&&gt<65||gt>70&&gt<97););return yl(n,el()+(o<6&&jr()==32&&_n()==32))}function Ic(n){for(;_n();)switch(gt){case n:return gn;case 34:case 39:n!==34&&n!==39&&Ic(gt);break;case 40:n===41&&Ic(n);break;case 92:_n();break}return gn}function Q0(n,o){for(;_n()&&n+gt!==57;)if(n+gt===84&&jr()===47)break;return"/*"+yl(o,gn-1)+"*"+Xc(n===47?n:_n())}function K0(n){for(;!Es(jr());)_n();return yl(n,gn)}function X0(n){return G0(tl("",null,null,null,[""],n=V0(n),0,[0],n))}function tl(n,o,i,c,d,p,m,y,g){for(var j=0,_=0,R=m,A=0,F=0,oe=0,W=1,ae=1,V=1,X=0,xe="",Te=d,Re=p,fe=c,H=xe;ae;)switch(oe=X,X=_n()){case 40:if(oe!=108&&St(H,R-1)==58){Zi(H+=Ie(ac(X),"&","&\f"),"&\f",Vp(j?y[j-1]:0))!=-1&&(V=-1);break}case 34:case 39:case 91:H+=ac(X);break;case 9:case 10:case 13:case 32:H+=q0(oe);break;case 92:H+=Y0(el()-1,7);continue;case 47:switch(jr()){case 42:case 47:xs(J0(Q0(_n(),el()),o,i,g),g),(Es(oe||1)==5||Es(jr()||1)==5)&&En(H)&&Vr(H,-1,void 0)!==" "&&(H+=" ");break;default:H+="/"}break;case 123*W:y[j++]=En(H)*V;case 125*W:case 59:case 0:switch(X){case 0:case 125:ae=0;case 59+_:V==-1&&(H=Ie(H,/\f/g,"")),F>0&&(En(H)-R||W===0&&oe===47)&&xs(F>32?ep(H+";",c,i,R-1,g):ep(Ie(H," ","")+";",c,i,R-2,g),g);break;case 59:H+=";";default:if(xs(fe=Zf(H,o,i,j,_,d,y,xe,Te=[],Re=[],R,p),p),X===123)if(_===0)tl(H,o,fe,fe,Te,p,R,y,Re);else{switch(A){case 99:if(St(H,3)===110)break;case 108:if(St(H,2)===97)break;default:_=0;case 100:case 109:case 115:}_?tl(n,fe,fe,c&&xs(Zf(n,fe,fe,0,0,d,y,xe,d,Te=[],R,Re),Re),d,Re,R,y,c?Te:Re):tl(H,fe,fe,fe,[""],Re,0,y,Re)}}j=_=F=0,W=V=1,xe=H="",R=m;break;case 58:R=1+En(H),F=oe;default:if(W<1){if(X==123)--W;else if(X==125&&W++==0&&W0()==125)continue}switch(H+=Xc(X),X*W){case 38:V=_>0?1:(H+="\f",-1);break;case 44:y[j++]=(En(H)-1)*V,V=1;break;case 64:jr()===45&&(H+=ac(_n())),A=jr(),_=R=En(xe=H+=K0(el())),X++;break;case 45:oe===45&&En(H)==2&&(W=0)}}return p}function Zf(n,o,i,c,d,p,m,y,g,j,_,R){for(var A=d-1,F=d===0?p:[""],oe=qp(F),W=0,ae=0,V=0;W<c;++W)for(var X=0,xe=Vr(n,A+1,A=Vp(ae=m[W])),Te=n;X<oe;++X)(Te=Gp(ae>0?F[X]+" "+xe:Ie(xe,/&\f/g,F[X])))&&(g[V++]=Te);return xl(n,o,i,d===0?ml:y,g,j,_,R)}function J0(n,o,i,c){return xl(n,o,i,Hp,Xc(H0()),Vr(n,2,-2),0,c)}function ep(n,o,i,c,d){return xl(n,o,i,Kc,Vr(n,0,c),Vr(n,c+1,-1),c,d)}function Qp(n,o,i){switch(B0(n,o)){case 5103:return Ue+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Ue+n+n;case 4855:return Ue+n.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+n;case 4789:return ws+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return Ue+n+ws+n+et+n+n;case 5936:switch(St(n,o+11)){case 114:return Ue+n+et+Ie(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return Ue+n+et+Ie(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return Ue+n+et+Ie(n,/[svh]\w+-[tblr]{2}/,"lr")+n}case 6828:case 4268:case 2903:return Ue+n+et+n+n;case 6165:return Ue+n+et+"flex-"+n+n;case 5187:return Ue+n+Ie(n,/(\w+).+(:[^]+)/,Ue+"box-$1$2"+et+"flex-$1$2")+n;case 5443:return Ue+n+et+"flex-item-"+Ie(n,/flex-|-self/g,"")+(Xn(n,/flex-|baseline/)?"":et+"grid-row-"+Ie(n,/flex-|-self/g,""))+n;case 4675:return Ue+n+et+"flex-line-pack"+Ie(n,/align-content|flex-|-self/g,"")+n;case 5548:return Ue+n+et+Ie(n,"shrink","negative")+n;case 5292:return Ue+n+et+Ie(n,"basis","preferred-size")+n;case 6060:return Ue+"box-"+Ie(n,"-grow","")+Ue+n+et+Ie(n,"grow","positive")+n;case 4554:return Ue+Ie(n,/([^-])(transform)/g,"$1"+Ue+"$2")+n;case 6187:return Ie(Ie(Ie(n,/(zoom-|grab)/,Ue+"$1"),/(image-set)/,Ue+"$1"),n,"")+n;case 5495:case 3959:return Ie(n,/(image-set\([^]*)/,Ue+"$1$`$1");case 4968:return Ie(Ie(n,/(.+:)(flex-)?(.*)/,Ue+"box-pack:$3"+et+"flex-pack:$3"),/space-between/,"justify")+Ue+n+n;case 4200:if(!Xn(n,/flex-|baseline/))return et+"grid-column-align"+Vr(n,o)+n;break;case 2592:case 3360:return et+Ie(n,"template-","")+n;case 4384:case 3616:return i&&i.some(function(c,d){return o=d,Xn(c.props,/grid-\w+-end/)})?~Zi(n+(i=i[o].value),"span",0)?n:et+Ie(n,"-start","")+n+et+"grid-row-span:"+(~Zi(i,"span",0)?Xn(i,/\d+/):+Xn(i,/\d+/)-+Xn(n,/\d+/))+";":et+Ie(n,"-start","")+n;case 4896:case 4128:return i&&i.some(function(c){return Xn(c.props,/grid-\w+-start/)})?n:et+Ie(Ie(n,"-end","-span"),"span ","")+n;case 4095:case 3583:case 4068:case 2532:return Ie(n,/(.+)-inline(.+)/,Ue+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(En(n)-1-o>6)switch(St(n,o+1)){case 109:if(St(n,o+4)!==45)break;case 102:return Ie(n,/(.+:)(.+)-([^]+)/,"$1"+Ue+"$2-$3$1"+ws+(St(n,o+3)==108?"$3":"$2-$3"))+n;case 115:return~Zi(n,"stretch",0)?Qp(Ie(n,"stretch","fill-available"),o,i)+n:n}break;case 5152:case 5920:return Ie(n,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,d,p,m,y,g,j){return et+d+":"+p+j+(m?et+d+"-span:"+(y?g:+g-+p)+j:"")+n});case 4949:if(St(n,o+6)===121)return Ie(n,":",":"+Ue)+n;break;case 6444:switch(St(n,St(n,14)===45?18:11)){case 120:return Ie(n,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Ue+(St(n,14)===45?"inline-":"")+"box$3$1"+Ue+"$2$3$1"+et+"$2box$3")+n;case 100:return Ie(n,":",":"+et)+n}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Ie(n,"scroll-","scroll-snap-")+n}return n}function dl(n,o){for(var i="",c=0;c<n.length;c++)i+=o(n[c],c,n,o)||"";return i}function Z0(n,o,i,c){switch(n.type){case D0:if(n.children.length)break;case z0:case F0:case Kc:return n.return=n.return||n.value;case Hp:return"";case Wp:return n.return=n.value+"{"+dl(n.children,c)+"}";case ml:if(!En(n.value=n.props.join(",")))return""}return En(i=dl(n.children,c))?n.return=n.value+"{"+i+"}":""}function eg(n){var o=qp(n);return function(i,c,d,p){for(var m="",y=0;y<o;y++)m+=n[y](i,c,d,p)||"";return m}}function tg(n){return function(o){o.root||(o=o.return)&&n(o)}}function ng(n,o,i,c){if(n.length>-1&&!n.return)switch(n.type){case Kc:n.return=Qp(n.value,n.length,i);return;case Wp:return dl([Er(n,{value:Ie(n.value,"@","@"+Ue)})],c);case ml:if(n.length)return U0(i=n.props,function(d){switch(Xn(d,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":mo(Er(n,{props:[Ie(d,/:(read-\w+)/,":"+ws+"$1")]})),mo(Er(n,{props:[d]})),Rc(n,{props:Jf(i,c)});break;case"::placeholder":mo(Er(n,{props:[Ie(d,/:(plac\w+)/,":"+Ue+"input-$1")]})),mo(Er(n,{props:[Ie(d,/:(plac\w+)/,":"+ws+"$1")]})),mo(Er(n,{props:[Ie(d,/:(plac\w+)/,et+"input-$1")]})),mo(Er(n,{props:[d]})),Rc(n,{props:Jf(i,c)});break}return""})}}var bo={};function Jn(n,...o){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${n} for more information.${o.length>0?` Args: ${o.join(", ")}`:""}`)}var cc,uc;const Co=typeof process<"u"&&bo!==void 0&&(bo.REACT_APP_SC_ATTR||bo.SC_ATTR)||"data-styled",Kp="active",Xp="data-styled-version",vl="6.6.0",Jc=`/*!sc*/
`,Ss=typeof window<"u"&&typeof document<"u";if(!Pt.createContext)throw Jn(19);function tp(n){if(typeof process<"u"&&bo!==void 0){const o=bo[n];if(o!==void 0&&o!=="")return o!=="false"}}const rg=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(uc=(cc=tp("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&cc!==void 0?cc:tp("SC_DISABLE_SPEEDY"))!==null&&uc!==void 0?uc:typeof process<"u"&&bo!==void 0&&!1),Jp="sc-keyframes-",og={};let nl=new Map,fl=new Map,rl=1;const ys=n=>{if(nl.has(n))return nl.get(n);for(;fl.has(rl);)rl++;const o=rl++;return nl.set(n,o),fl.set(o,n),o},sg=n=>fl.get(n),ig=(n,o)=>{rl=o+1,nl.set(n,o),fl.set(o,n)},Zc=Object.freeze([]),Eo=Object.freeze({});function Zp(n,o,i=Eo){return n.theme!==i.theme&&n.theme||o||i.theme}const lg=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,ag=/(^-|-$)/g;function eh(n){return n.replace(lg,"-").replace(ag,"")}const cg=/(a)(d)/gi,np=n=>String.fromCharCode(n+(n>25?39:97));function eu(n){let o,i="";for(o=Math.abs(n);o>52;o=o/52|0)i=np(o%52)+i;return(np(o%52)+i).replace(cg,"$1-$2")}const $c=5381,Wr=(n,o)=>{let i=o.length;for(;i;)n=33*n^o.charCodeAt(--i);return n},th=n=>Wr($c,n);function tu(n){return eu(th(n)>>>0)}function ug(n){return n.displayName||n.name||"Component"}function Ac(n){return typeof n=="string"&&!0}function dg(n){return Ac(n)?`styled.${n}`:`Styled(${ug(n)})`}const nh=Symbol.for("react.memo"),fg=Symbol.for("react.forward_ref"),pg={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},hg={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},rh={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},mg={[fg]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[nh]:rh};function rp(n){return("type"in(o=n)&&o.type.$$typeof)===nh?rh:"$$typeof"in n?mg[n.$$typeof]:pg;var o}const gg=Object.defineProperty,xg=Object.getOwnPropertyNames,yg=Object.getOwnPropertySymbols,vg=Object.getOwnPropertyDescriptor,bg=Object.getPrototypeOf,wg=Object.prototype;function oh(n,o,i){if(typeof o!="string"){const c=bg(o);c&&c!==wg&&oh(n,c,i);const d=xg(o).concat(yg(o)),p=rp(n),m=rp(o);for(let y=0;y<d.length;++y){const g=d[y];if(!(g in hg||i&&i[g]||m&&g in m||p&&g in p)){const j=vg(o,g);try{gg(n,g,j)}catch{}}}}return n}function _o(n){return typeof n=="function"}const Sg=Symbol.for("react.forward_ref");function nu(n){return n!=null&&(typeof n=="object"||typeof n=="function")&&n.$$typeof===Sg&&"styledComponentId"in n}function vs(n,o){return n&&o?n+" "+o:n||o||""}function pl(n,o){return n.join("")}function js(n){return n!==null&&typeof n=="object"&&n.constructor.name===Object.name&&!("props"in n&&n.$$typeof)}function Pc(n,o,i=!1){if(!i&&!js(n)&&!Array.isArray(n))return o;if(Array.isArray(o))for(let c=0;c<o.length;c++)n[c]=Pc(n[c],o[c]);else if(js(o))for(const c in o)n[c]=Pc(n[c],o[c]);return n}function ru(n,o){Object.defineProperty(n,"toString",{value:o})}const kg=class{constructor(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n,this._cGroup=0,this._cIndex=0}indexOfGroup(n){if(n===this._cGroup)return this._cIndex;let o=this._cIndex;if(n>this._cGroup)for(let i=this._cGroup;i<n;i++)o+=this.groupSizes[i];else for(let i=this._cGroup-1;i>=n;i--)o-=this.groupSizes[i];return this._cGroup=n,this._cIndex=o,o}insertRules(n,o){if(n>=this.groupSizes.length){const d=this.groupSizes,p=d.length;let m=p;for(;n>=m;)if(m<<=1,m<0)throw Jn(16,`${n}`);this.groupSizes=new Uint32Array(m),this.groupSizes.set(d),this.length=m;for(let y=p;y<m;y++)this.groupSizes[y]=0}let i=this.indexOfGroup(n+1),c=0;for(let d=0,p=o.length;d<p;d++)this.tag.insertRule(i,o[d])&&(this.groupSizes[n]++,i++,c++);c>0&&this._cGroup>n&&(this._cIndex+=c)}clearGroup(n){if(n<this.length){const o=this.groupSizes[n],i=this.indexOfGroup(n),c=i+o;this.groupSizes[n]=0;for(let d=i;d<c;d++)this.tag.deleteRule(i);o>0&&this._cGroup>n&&(this._cIndex-=o)}}getGroup(n){let o="";if(n>=this.length||this.groupSizes[n]===0)return o;const i=this.groupSizes[n],c=this.indexOfGroup(n),d=c+i;for(let p=c;p<d;p++)o+=this.tag.getRule(p)+Jc;return o}},Cg=`style[${Co}][${Xp}="${vl}"]`,Eg=new RegExp(`^${Co}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),op=n=>typeof ShadowRoot<"u"&&n instanceof ShadowRoot||"host"in n&&n.nodeType===11,Lc=n=>{if(!n)return document;if(op(n))return n;if("getRootNode"in n){const o=n.getRootNode();if(op(o))return o}return document},jg=(n,o,i)=>{const c=i.split(",");let d;for(let p=0,m=c.length;p<m;p++)(d=c[p])&&n.registerName(o,d)},_g=(n,o)=>{var i;const c=((i=o.textContent)!==null&&i!==void 0?i:"").split(Jc),d=[];for(let p=0,m=c.length;p<m;p++){const y=c[p].trim();if(!y)continue;const g=y.match(Eg);if(g){const j=0|parseInt(g[1],10),_=g[2];j!==0&&(ig(_,j),jg(n,_,g[3]),n.getTag().insertRules(j,d)),d.length=0}else d.push(y)}},dc=n=>{const i=Lc(n.options.target).querySelectorAll(Cg);for(let c=0,d=i.length;c<d;c++){const p=i[c];p&&p.getAttribute(Co)!==Kp&&(_g(n,p),p.parentNode&&p.parentNode.removeChild(p))}};let us=!1;function Ng(){if(us!==!1)return us;if(typeof document<"u"){const n=document.head.querySelector('meta[property="csp-nonce"]');if(n)return us=n.nonce||n.getAttribute("content")||void 0;const o=document.head.querySelector('meta[name="sc-nonce"]');if(o)return us=o.getAttribute("content")||void 0}return us=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const sh=(n,o)=>{if(typeof document>"u")throw Jn(20);const i=document.head,c=n||i,d=document.createElement("style"),p=(g=>{const j=Array.from(g.querySelectorAll(`style[${Co}]`));return j[j.length-1]})(c),m=p!==void 0?p.nextSibling:null;d.setAttribute(Co,Kp),d.setAttribute(Xp,vl);const y=o||Ng();return y&&d.setAttribute("nonce",y),c.insertBefore(d,m),d},Tg=class{constructor(n,o){this.element=sh(n,o),this.element.appendChild(document.createTextNode("")),this.sheet=(i=>{var c;if(i.sheet)return i.sheet;const d=(c=i.getRootNode().styleSheets)!==null&&c!==void 0?c:document.styleSheets;for(let p=0,m=d.length;p<m;p++){const y=d[p];if(y.ownerNode===i)return y}throw Jn(17)})(this.element),this.length=0}insertRule(n,o){try{return this.sheet.insertRule(o,n),this.length++,!0}catch{return!1}}deleteRule(n){this.sheet.deleteRule(n),this.length--}getRule(n){const o=this.sheet.cssRules[n];return o&&o.cssText?o.cssText:""}},Rg=class{constructor(n,o){this.element=sh(n,o),this.nodes=this.element.childNodes,this.length=0}insertRule(n,o){if(n<=this.length&&n>=0){const i=document.createTextNode(o);return this.element.insertBefore(i,this.nodes[n]||null),this.length++,!0}return!1}deleteRule(n){this.element.removeChild(this.nodes[n]),this.length--}getRule(n){return n<this.length?this.nodes[n].textContent:""}};let sp=Ss;const Ig={isServer:!Ss,useCSSOMInjection:!rg};class Ns{static registerId(o){return ys(o)}constructor(o=Eo,i={},c){this.options=Object.assign(Object.assign({},Ig),o),this.gs=i,this.keyframeIds=new Set,this.names=new Map(c),this.server=!!o.isServer,!this.server&&Ss&&sp&&(sp=!1,dc(this)),ru(this,()=>(d=>{const p=d.getTag(),{length:m}=p;let y="";for(let g=0;g<m;g++){const j=sg(g);if(j===void 0)continue;const _=d.names.get(j);if(_===void 0||!_.size)continue;const R=p.getGroup(g);if(R.length===0)continue;const A=Co+".g"+g+'[id="'+j+'"]';let F="";for(const oe of _)oe.length>0&&(F+=oe+",");y+=R+A+'{content:"'+F+'"}'+Jc}return y})(this))}rehydrate(){!this.server&&Ss&&dc(this)}reconstructWithOptions(o,i=!0){const c=new Ns(Object.assign(Object.assign({},this.options),o),this.gs,i&&this.names||void 0);return c.keyframeIds=new Set(this.keyframeIds),!this.server&&Ss&&o.target!==this.options.target&&Lc(this.options.target)!==Lc(o.target)&&dc(c),c}allocateGSInstance(o){return this.gs[o]=(this.gs[o]||0)+1}getTag(){return this.tag||(this.tag=(o=(({useCSSOMInjection:i,target:c,nonce:d})=>i?new Tg(c,d):new Rg(c,d))(this.options),new kg(o)));var o}hasNameForId(o,i){var c,d;return(d=(c=this.names.get(o))===null||c===void 0?void 0:c.has(i))!==null&&d!==void 0&&d}registerName(o,i){ys(o),o.startsWith(Jp)&&this.keyframeIds.add(o);const c=this.names.get(o);c?c.add(i):this.names.set(o,new Set([i]))}insertRules(o,i,c){this.registerName(o,i),this.getTag().insertRules(ys(o),c)}clearNames(o){this.names.has(o)&&this.names.get(o).clear()}clearRules(o){this.getTag().clearGroup(ys(o)),this.clearNames(o)}clearTag(){this.tag=void 0}}const ih=new WeakSet,$g={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Ag(n,o){return o==null||typeof o=="boolean"||o===""?"":typeof o!="number"||o===0||n in $g||n.startsWith("--")?String(o).trim():o+"px"}const Ur=47;function ip(n){if(n.charCodeAt(0)===45&&n.charCodeAt(1)===45)return n;let o="";for(let i=0;i<n.length;i++){const c=n.charCodeAt(i);o+=c>=65&&c<=90?"-"+String.fromCharCode(c+32):n[i]}return o.startsWith("ms-")?"-"+o:o}const lh=Symbol.for("sc-keyframes");function Pg(n){return typeof n=="object"&&n!==null&&lh in n}function ah(n){return _o(n)&&!(n.prototype&&n.prototype.isReactComponent)}const ch=n=>n==null||n===!1||n==="",Lg=Symbol.for("react.client.reference");function lp(n){return n.$$typeof===Lg}function uh(n,o){for(const i in n){const c=n[i];n.hasOwnProperty(i)&&!ch(c)&&(Array.isArray(c)&&ih.has(c)||_o(c)?o.push(ip(i)+":",c,";"):js(c)?(o.push(i+" {"),uh(c,o),o.push("}")):o.push(ip(i)+": "+Ag(i,c)+";"))}}function _r(n,o,i,c,d=[]){if(ch(n))return d;const p=typeof n;if(p==="string")return d.push(n),d;if(p==="function"){if(lp(n))return d;if(ah(n)&&o){const m=n(o);return _r(m,o,i,c,d)}return d.push(n),d}if(Array.isArray(n)){for(let m=0;m<n.length;m++)_r(n[m],o,i,c,d);return d}return nu(n)?(d.push(`.${n.styledComponentId}`),d):Pg(n)?(i?(n.inject(i,c),d.push(n.getName(c))):d.push(n),d):lp(n)?d:js(n)?n.toString!==Object.prototype.toString?(d.push(n.toString()),d):(uh(n,d),d):(d.push(n.toString()),d)}const Og=th(vl);class Mg{constructor(o,i,c){this.rules=o,this.componentId=i,this.baseHash=Wr(Og,i),this.baseStyle=c,Ns.registerId(i)}generateAndInjectStyles(o,i,c){let d=this.baseStyle?this.baseStyle.generateAndInjectStyles(o,i,c):"";{let p="";for(let m=0;m<this.rules.length;m++){const y=this.rules[m];if(typeof y=="string")p+=y;else if(y)if(ah(y)){const g=y(o);typeof g=="string"?p+=g:g!=null&&g!==!1&&(p+=pl(_r(g,o,i,c)))}else p+=pl(_r(y,o,i,c))}if(p){this.dynamicNameCache||(this.dynamicNameCache=new Map);const m=c.hash?c.hash+p:p;let y=this.dynamicNameCache.get(m);if(!y){if(y=eu(Wr(Wr(this.baseHash,c.hash),p)>>>0),this.dynamicNameCache.size>=200){const g=this.dynamicNameCache.keys().next().value;g!==void 0&&this.dynamicNameCache.delete(g)}this.dynamicNameCache.set(m,y)}if(!i.hasNameForId(this.componentId,y)){const g=c(p,"."+y,void 0,this.componentId);i.insertRules(this.componentId,y,g)}d=vs(d,y)}}return d}}const zg=/&/g;function dh(n,o){let i=0;for(;--o>=0&&n.charCodeAt(o)===92;)i++;return!(1&~i)}function fc(n){const o=n.length;let i="",c=0,d=0,p=0,m=!1,y=!1;for(let g=0;g<o;g++){const j=n.charCodeAt(g);if(p!==0||m||j!==Ur||n.charCodeAt(g+1)!==42)if(m)j===42&&n.charCodeAt(g+1)===Ur&&(m=!1,g++);else if(j!==34&&j!==39||dh(n,g)){if(p===0)if(j===123)d++;else if(j===125){if(d--,d<0){y=!0;let _=g+1;for(;_<o;){const R=n.charCodeAt(_);if(R===59||R===10)break;_++}_<o&&n.charCodeAt(_)===59&&_++,d=0,g=_-1,c=_;continue}d===0&&(i+=n.substring(c,g+1),c=g+1)}else j===59&&d===0&&(i+=n.substring(c,g+1),c=g+1)}else p===0?p=j:p===j&&(p=0);else m=!0,g++}return y||d!==0||p!==0?(c<o&&d===0&&p===0&&(i+=n.substring(c)),i):n}function fh(n,o){const i=o+" ",c=","+i;for(let d=0;d<n.length;d++){const p=n[d];if(p.type==="rule"){p.value=(i+p.value).replaceAll(",",c);const m=p.props,y=[];for(let g=0;g<m.length;g++)y[g]=i+m[g];p.props=y}Array.isArray(p.children)&&p.type!=="@keyframes"&&fh(p.children,o)}return n}function Fg({options:n=Eo,plugins:o=Zc}=Eo){let i,c,d;const p=(A,F,oe)=>oe.startsWith(c)&&oe.endsWith(c)&&oe.replaceAll(c,"").length>0?`.${i}`:A,m=o.slice();m.push(A=>{A.type===ml&&A.value.includes("&")&&(d||(d=new RegExp(`\\${c}\\b`,"g")),A.props[0]=A.props[0].replace(zg,c).replace(d,p))}),n.prefix&&m.push(ng),m.push(Z0);let y=[];const g=eg(m.concat(tg(A=>y.push(A)))),j=(A,F="",oe="",W="&")=>{i=W,c=F,d=void 0;const ae=(function(X){const xe=X.indexOf("//")!==-1,Te=X.indexOf("}")!==-1;if(!xe&&!Te)return X;if(!xe)return fc(X);const Re=X.length;let fe="",H=0,de=0,We=0,J=0,ne=0,ee=!1;for(;de<Re;){const te=X.charCodeAt(de);if(te!==34&&te!==39||dh(X,de))if(We===0)if(te===Ur&&de+1<Re&&X.charCodeAt(de+1)===42){for(de+=2;de+1<Re&&(X.charCodeAt(de)!==42||X.charCodeAt(de+1)!==Ur);)de++;de+=2}else if(te!==40)if(te!==41)if(J>0)de++;else if(te===42&&de+1<Re&&X.charCodeAt(de+1)===Ur)fe+=X.substring(H,de),de+=2,H=de,ee=!0;else if(te===Ur&&de+1<Re&&X.charCodeAt(de+1)===Ur){for(fe+=X.substring(H,de);de<Re&&X.charCodeAt(de)!==10;)de++;H=de,ee=!0}else te===123?ne++:te===125&&ne--,de++;else J>0&&J--,de++;else J++,de++;else de++;else We===0?We=te:We===te&&(We=0),de++}return ee?(H<Re&&(fe+=X.substring(H)),ne===0?fe:fc(fe)):ne===0?X:fc(X)})(A);let V=X0(oe||F?oe+" "+F+" { "+ae+" }":ae);return n.namespace&&(V=fh(V,n.namespace)),y=[],dl(V,g),y},_=n;let R=$c;for(let A=0;A<o.length;A++)o[A].name||Jn(15),R=Wr(R,o[A].name);return _!=null&&_.namespace&&(R=Wr(R,_.namespace)),_!=null&&_.prefix&&(R=Wr(R,"p")),j.hash=R!==$c?R.toString():"",j}const Dg=new Ns,Oc=Fg(),ph=Pt.createContext({shouldForwardProp:void 0,styleSheet:Dg,stylis:Oc,stylisPlugins:void 0});ph.Consumer;function hh(){return Pt.useContext(ph)}const _s=Pt.createContext(void 0);_s.Consumer;function ol(n){const o=Pt.useContext(_s),i=Pt.useMemo(()=>(function(c,d){if(!c)throw Jn(14);if(_o(c))return c(d);if(Array.isArray(c)||typeof c!="object")throw Jn(8);return d?Object.assign(Object.assign({},d),c):c})(n.theme,o),[n.theme,o]);return n.children?Pt.createElement(_s.Provider,{value:i},n.children):null}const pc={};function Bg(n,o){const i=typeof n!="string"?"sc":eh(n);pc[i]=(pc[i]||0)+1;const c=i+"-"+tu(vl+i+pc[i]);return o?o+"-"+c:c}function Ug(n,o,i){const c=nu(n),d=n,p=!Ac(n),{attrs:m=Zc,componentId:y=Bg(o.displayName,o.parentComponentId),displayName:g=dg(n)}=o,j=o.displayName&&o.componentId?eh(o.displayName)+"-"+o.componentId:o.componentId||y,_=c&&d.attrs?d.attrs.concat(m).filter(Boolean):m;let{shouldForwardProp:R}=o;if(c&&d.shouldForwardProp){const W=d.shouldForwardProp;if(o.shouldForwardProp){const ae=o.shouldForwardProp;R=(V,X)=>W(V,X)&&ae(V,X)}else R=W}const A=new Mg(i,j,c?d.componentStyle:void 0);function F(W,ae){return(function(V,X,xe){const{attrs:Te,componentStyle:Re,defaultProps:fe,foldedComponentIds:H,styledComponentId:de,target:We}=V,J=Pt.useContext(_s),ne=hh(),ee=V.shouldForwardProp||ne.shouldForwardProp,te=Zp(X,J,fe)||Eo,[Ne,Ce]=(function(b,T,q){const Y=Object.assign(Object.assign({},T),{className:void 0,theme:q});let ve=null;const ge=b.length>1;for(let Se=0;Se<b.length;Se++){const Q=b[Se],ke=_o(Q)?Q(ge?Object.assign({},Y):Y):Q;for(const _e in ke)_e==="className"?Y.className=vs(Y.className,ke[_e]):_e==="style"?Y.style=Object.assign(Object.assign({},Y.style),ke[_e]):ke[_e]===void 0?_e in Y&&(Y[_e]!==void 0&&(ve||(ve=[])).push(_e),Y[_e]=void 0):Y[_e]=ke[_e]}return"className"in T&&typeof T.className=="string"&&(Y.className=vs(Y.className,T.className)),[Y,ve]})(Te,X,te),Me=Re.generateAndInjectStyles(Ne,ne.styleSheet,ne.stylis),Ee=Ne.as||We,O=Ac(Ee),Z=(function(b,T,q,Y,ve,ge){const Se={};for(const Q in b)Q[0]==="$"||Q==="as"||Q==="theme"&&b.theme===q||(Q==="forwardedAs"?b.forwardedAs!==void 0&&(Se.as=b.forwardedAs):b[Q]===void 0?Q==="className"||ve||ge!==null&&ge.indexOf(Q)!==-1||Y&&!Y(Q,T)||(Se[Q]=void 0):Y&&!Y(Q,T)||(Se[Q]=b[Q]));return Se})(Ne,Ee,te,ee,O,Ce);let M=vs(H,de);return Me&&(M+=" "+Me),Ne.className&&(M+=" "+Ne.className),Z[O&&Ee.includes("-")?"class":"className"]=M,xe&&(Z.ref=xe),N.createElement(Ee,Z)})(oe,W,ae)}F.displayName=g;let oe=Pt.forwardRef(F);return oe.attrs=_,oe.componentStyle=A,oe.displayName=g,oe.shouldForwardProp=R,oe.foldedComponentIds=c?vs(d.foldedComponentIds,d.styledComponentId):"",oe.styledComponentId=j,oe.target=c?d.target:n,Object.defineProperty(oe,"defaultProps",{get(){return this._foldedDefaultProps},set(W){this._foldedDefaultProps=c?(function(ae,...V){for(const X of V)Pc(ae,X,!0);return ae})({},d.defaultProps,W):W}}),ru(oe,()=>`.${oe.styledComponentId}`),p&&oh(oe,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),oe}var Hg=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function ap(n,o){const i=[n[0]];for(let c=0,d=o.length;c<d;c+=1)i.push(o[c],n[c+1]);return i}const cp=n=>(ih.add(n),n);function ou(n,...o){if(_o(n)||js(n))return cp(_r(ap(Zc,[n,...o])));const i=n;return o.length===0&&i.length===1&&typeof i[0]=="string"?_r(i):cp(_r(ap(i,o)))}function Mc(n,o,i=Eo){if(!o)throw Jn(1,o);const c=(d,...p)=>n(o,i,ou(d,...p));return c.attrs=d=>Mc(n,o,Object.assign(Object.assign({},i),{attrs:Array.prototype.concat(i.attrs,d).filter(Boolean)})),c.withConfig=d=>Mc(n,o,Object.assign(Object.assign({},i),d)),c}const mh=n=>Mc(Ug,n),E=mh;Hg.forEach(n=>{E[n]=mh(n)});class Wg{constructor(o,i){this.instanceRules=new Map,this.rules=o,this.componentId=i,this.isStatic=(function(c){for(let d=0;d<c.length;d+=1){const p=c[d];if(_o(p)&&!nu(p))return!1}return!0})(o),Ns.registerId(this.componentId)}removeStyles(o,i){this.instanceRules.delete(o),this.rebuildGroup(i)}renderStyles(o,i,c,d){const p=this.componentId;if(this.isStatic){if(c.hasNameForId(p,p+o))this.instanceRules.has(o)||this.computeRules(o,i,c,d);else{const y=this.computeRules(o,i,c,d);c.insertRules(p,y.name,y.rules)}return}const m=this.instanceRules.get(o);if(this.computeRules(o,i,c,d),!c.server&&m){const y=m.rules,g=this.instanceRules.get(o).rules;if(y.length===g.length){let j=!0;for(let _=0;_<y.length;_++)if(y[_]!==g[_]){j=!1;break}if(j)return}}this.rebuildGroup(c)}computeRules(o,i,c,d){const p=pl(_r(this.rules,i,c,d)),m={name:this.componentId+o,rules:d(p,"")};return this.instanceRules.set(o,m),m}rebuildGroup(o){const i=this.componentId;o.clearRules(i);for(const c of this.instanceRules.values())o.insertRules(i,c.name,c.rules)}}function Vg(n,...o){const i=ou(n,...o),c=`sc-global-${tu(JSON.stringify(i))}`,d=new Wg(i,c),p=y=>{const g=hh(),j=Pt.useContext(_s);let _;{const R=Pt.useRef(null);R.current===null&&(R.current=g.styleSheet.allocateGSInstance(c)),_=R.current}g.styleSheet.server&&m(_,y,g.styleSheet,j,g.stylis);{const R=d.isStatic?[_,g.styleSheet,d]:[_,y,g.styleSheet,j,g.stylis,d],A=Pt.useRef(d);Pt.useLayoutEffect(()=>{g.styleSheet.server||(A.current!==d&&(g.styleSheet.clearRules(c),A.current=d),m(_,y,g.styleSheet,j,g.stylis))},R),Pt.useLayoutEffect(()=>()=>{g.styleSheet.server||d.removeStyles(_,g.styleSheet)},[_,g.styleSheet,d])}return g.styleSheet.server&&d.instanceRules.delete(_),null};function m(y,g,j,_,R){if(d.isStatic)d.renderStyles(y,og,j,R);else{const A=Object.assign(Object.assign({},g),{theme:Zp(g,_,p.defaultProps)});d.renderStyles(y,A,j,R)}}return Pt.memo(p)}var gh;class Gg{constructor(o,i){this[gh]=!0,this.inject=(c,d=Oc)=>{const p=this.getName(d);if(!c.hasNameForId(this.id,p)){const m=d(this.rules,p,"@keyframes");c.insertRules(this.id,p,m)}},this.name=o,this.id=Jp+o,this.rules=i,ys(this.id),ru(this,()=>{throw Jn(12,String(this.name))})}getName(o=Oc){return o.hash?this.name+eu(+o.hash>>>0):this.name}}function bl(n,...o){const i=pl(ou(n,...o)),c=tu(i);return new Gg(c,i)}gh=lh;const le={colors:{bgCanvas:"#F4F5F2",bgSurface:"#FFFFFF",bgSurfaceSubtle:"#F6F7F4",bgSurfaceHover:"#EEF1EC",bgElevated:"#FFFFFF",bgGlassHeavy:"rgba(255, 255, 255, 0.96)",borderSubtle:"rgba(30, 36, 32, 0.09)",borderStrong:"rgba(30, 36, 32, 0.18)",textPrimary:"#1E2420",textSecondary:"#5B655F",textMuted:"#7B857F",brandPrimary:"#2D6A4F",brandPrimaryHover:"#23533D",brandPrimaryLight:"#52796B",brandPrimarySubtle:"rgba(45, 106, 79, 0.09)",accentMuted:"#3E5C52",status:{NORMAL:"#2D6A4F",WARNING:"#B45309",CRITICAL:"#C81E1E",OFFLINE:"#64748B"},statusBg:{NORMAL:"rgba(45, 106, 79, 0.10)",WARNING:"rgba(180, 83, 9, 0.10)",CRITICAL:"rgba(200, 30, 30, 0.09)",OFFLINE:"rgba(100, 116, 139, 0.11)"}},radius:{sm:"6px",md:"10px",lg:"12px",pill:"999px"},motion:{ease:"cubic-bezier(0.2, 0.8, 0.2, 1)",fast:"150ms",press:"90ms",panel:"200ms"},shadows:{sm:"0 1px 2px rgba(30, 36, 32, 0.04)",md:"0 6px 20px rgba(30, 36, 32, 0.07)",lg:"0 18px 44px rgba(30, 36, 32, 0.12)"},fonts:{sans:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",display:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",mono:"'JetBrains Mono', 'Consolas', monospace"}},Tv={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"},qg={LOW:"Baixo",MEDIUM:"Médio",HIGH:"Alto"};function xh(n,o="2.3.0"){if(!n||typeof n!="string")return!1;const i=p=>{const m=String(p).match(/(\d+)\.(\d+)(?:\.(\d+))?/);return m?[Number(m[1]),Number(m[2]),Number(m[3]||0)]:null},c=i(n),d=i(o);if(!c||!d)return!1;for(let p=0;p<3;p+=1){if(c[p]<d[p])return!0;if(c[p]>d[p])return!1}return!1}function he(n){if(!n||typeof n!="string")return n||"";if(!n.includes("Ã")&&!n.includes("Â"))return n;try{const o=new Uint8Array(n.length);for(let c=0;c<n.length;c++)o[c]=n.charCodeAt(c)&255;const i=new TextDecoder("utf-8",{fatal:!1}).decode(o);if(!i.includes("�"))return i}catch{}return n.replace(/Ã“/g,"Ó").replace(/Ã§/g,"ç").replace(/Ã£/g,"ã").replace(/Ã¡/g,"á").replace(/Ã©/g,"é").replace(/Ã­/g,"í").replace(/Ã³/g,"ó").replace(/Ãº/g,"ú").replace(/Ã¢/g,"â").replace(/Ãª/g,"ê").replace(/Ã´/g,"ô").replace(/Ã‡/g,"Ç").replace(/Ãƒ/g,"Ã")}const sl=Vg`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    width: 100vw;
    height: 100vh;
    background-color: ${({theme:n})=>n.colors.bgCanvas};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-family: ${({theme:n})=>n.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden;
  }

  button, a, input, select {
    font-family: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({theme:n})=>n.colors.brandPrimary};
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
`,Fn=Object.create(null);Fn.open="0";Fn.close="1";Fn.ping="2";Fn.pong="3";Fn.message="4";Fn.upgrade="5";Fn.noop="6";const il=Object.create(null);Object.keys(Fn).forEach(n=>{il[Fn[n]]=n});const zc={type:"error",data:"parser error"},yh=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",vh=typeof ArrayBuffer=="function",bh=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,su=({type:n,data:o},i,c)=>yh&&o instanceof Blob?i?c(o):up(o,c):vh&&(o instanceof ArrayBuffer||bh(o))?i?c(o):up(new Blob([o]),c):c(Fn[n]+(o||"")),up=(n,o)=>{const i=new FileReader;return i.onload=function(){const c=i.result.split(",")[1];o("b"+(c||""))},i.readAsDataURL(n)};function dp(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let hc;function Yg(n,o){if(yh&&n.data instanceof Blob)return n.data.arrayBuffer().then(dp).then(o);if(vh&&(n.data instanceof ArrayBuffer||bh(n.data)))return o(dp(n.data));su(n,!1,i=>{hc||(hc=new TextEncoder),o(hc.encode(i))})}const fp="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",bs=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<fp.length;n++)bs[fp.charCodeAt(n)]=n;const Qg=n=>{let o=n.length*.75,i=n.length,c,d=0,p,m,y,g;n[n.length-1]==="="&&(o--,n[n.length-2]==="="&&o--);const j=new ArrayBuffer(o),_=new Uint8Array(j);for(c=0;c<i;c+=4)p=bs[n.charCodeAt(c)],m=bs[n.charCodeAt(c+1)],y=bs[n.charCodeAt(c+2)],g=bs[n.charCodeAt(c+3)],_[d++]=p<<2|m>>4,_[d++]=(m&15)<<4|y>>2,_[d++]=(y&3)<<6|g&63;return j},Kg=typeof ArrayBuffer=="function",iu=(n,o)=>{if(typeof n!="string")return{type:"message",data:wh(n,o)};const i=n.charAt(0);return i==="b"?{type:"message",data:Xg(n.substring(1),o)}:il[i]?n.length>1?{type:il[i],data:n.substring(1)}:{type:il[i]}:zc},Xg=(n,o)=>{if(Kg){const i=Qg(n);return wh(i,o)}else return{base64:!0,data:n}},wh=(n,o)=>{switch(o){case"blob":return n instanceof Blob?n:new Blob([n]);case"arraybuffer":default:return n instanceof ArrayBuffer?n:n.buffer}},Sh="",Jg=(n,o)=>{const i=n.length,c=new Array(i);let d=0;n.forEach((p,m)=>{su(p,!1,y=>{c[m]=y,++d===i&&o(c.join(Sh))})})},Zg=(n,o)=>{const i=n.split(Sh),c=[];for(let d=0;d<i.length;d++){const p=iu(i[d],o);if(c.push(p),p.type==="error")break}return c};function ex(){return new TransformStream({transform(n,o){Yg(n,i=>{const c=i.length;let d;if(c<126)d=new Uint8Array(1),new DataView(d.buffer).setUint8(0,c);else if(c<65536){d=new Uint8Array(3);const p=new DataView(d.buffer);p.setUint8(0,126),p.setUint16(1,c)}else{d=new Uint8Array(9);const p=new DataView(d.buffer);p.setUint8(0,127),p.setBigUint64(1,BigInt(c))}n.data&&typeof n.data!="string"&&(d[0]|=128),o.enqueue(d),o.enqueue(i)})}})}let mc;function Oi(n){return n.reduce((o,i)=>o+i.length,0)}function Mi(n,o){if(n[0].length===o)return n.shift();const i=new Uint8Array(o);let c=0;for(let d=0;d<o;d++)i[d]=n[0][c++],c===n[0].length&&(n.shift(),c=0);return n.length&&c<n[0].length&&(n[0]=n[0].slice(c)),i}function tx(n,o){mc||(mc=new TextDecoder);const i=[];let c=0,d=-1,p=!1;return new TransformStream({transform(m,y){for(i.push(m);;){if(c===0){if(Oi(i)<1)break;const g=Mi(i,1);p=(g[0]&128)===128,d=g[0]&127,d<126?c=3:d===126?c=1:c=2}else if(c===1){if(Oi(i)<2)break;const g=Mi(i,2);d=new DataView(g.buffer,g.byteOffset,g.length).getUint16(0),c=3}else if(c===2){if(Oi(i)<8)break;const g=Mi(i,8),j=new DataView(g.buffer,g.byteOffset,g.length),_=j.getUint32(0);if(_>Math.pow(2,21)-1){y.enqueue(zc);break}d=_*Math.pow(2,32)+j.getUint32(4),c=3}else{if(Oi(i)<d)break;const g=Mi(i,d);y.enqueue(iu(p?g:mc.decode(g),o)),c=0}if(d===0||d>n){y.enqueue(zc);break}}}})}const kh=4;function xt(n){if(n)return nx(n)}function nx(n){for(var o in xt.prototype)n[o]=xt.prototype[o];return n}xt.prototype.on=xt.prototype.addEventListener=function(n,o){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(o),this};xt.prototype.once=function(n,o){function i(){this.off(n,i),o.apply(this,arguments)}return i.fn=o,this.on(n,i),this};xt.prototype.off=xt.prototype.removeListener=xt.prototype.removeAllListeners=xt.prototype.removeEventListener=function(n,o){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var i=this._callbacks["$"+n];if(!i)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var c,d=0;d<i.length;d++)if(c=i[d],c===o||c.fn===o){i.splice(d,1);break}return i.length===0&&delete this._callbacks["$"+n],this};xt.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var o=new Array(arguments.length-1),i=this._callbacks["$"+n],c=1;c<arguments.length;c++)o[c-1]=arguments[c];if(i){i=i.slice(0);for(var c=0,d=i.length;c<d;++c)i[c].apply(this,o)}return this};xt.prototype.emitReserved=xt.prototype.emit;xt.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};xt.prototype.hasListeners=function(n){return!!this.listeners(n).length};const wl=typeof Promise=="function"&&typeof Promise.resolve=="function"?o=>Promise.resolve().then(o):(o,i)=>i(o,0),mn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),rx="arraybuffer";function Ch(n,...o){return o.reduce((i,c)=>(n.hasOwnProperty(c)&&(i[c]=n[c]),i),{})}const ox=mn.setTimeout,sx=mn.clearTimeout;function Sl(n,o){o.useNativeTimers?(n.setTimeoutFn=ox.bind(mn),n.clearTimeoutFn=sx.bind(mn)):(n.setTimeoutFn=mn.setTimeout.bind(mn),n.clearTimeoutFn=mn.clearTimeout.bind(mn))}const ix=1.33;function lx(n){return typeof n=="string"?ax(n):Math.ceil((n.byteLength||n.size)*ix)}function ax(n){let o=0,i=0;for(let c=0,d=n.length;c<d;c++)o=n.charCodeAt(c),o<128?i+=1:o<2048?i+=2:o<55296||o>=57344?i+=3:(c++,i+=4);return i}function Eh(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function cx(n){let o="";for(let i in n)n.hasOwnProperty(i)&&(o.length&&(o+="&"),o+=encodeURIComponent(i)+"="+encodeURIComponent(n[i]));return o}function ux(n){let o={},i=n.split("&");for(let c=0,d=i.length;c<d;c++){let p=i[c].split("=");o[decodeURIComponent(p[0])]=decodeURIComponent(p[1])}return o}class dx extends Error{constructor(o,i,c){super(o),this.description=i,this.context=c,this.type="TransportError"}}class lu extends xt{constructor(o){super(),this.writable=!1,Sl(this,o),this.opts=o,this.query=o.query,this.socket=o.socket,this.supportsBinary=!o.forceBase64}onError(o,i,c){return super.emitReserved("error",new dx(o,i,c)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(o){this.readyState==="open"&&this.write(o)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(o){const i=iu(o,this.socket.binaryType);this.onPacket(i)}onPacket(o){super.emitReserved("packet",o)}onClose(o){this.readyState="closed",super.emitReserved("close",o)}pause(o){}createUri(o,i={}){return o+"://"+this._hostname()+this._port()+this.opts.path+this._query(i)}_hostname(){const o=this.opts.hostname;return o.indexOf(":")===-1?o:"["+o+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(o){const i=cx(o);return i.length?"?"+i:""}}class fx extends lu{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(o){this.readyState="pausing";const i=()=>{this.readyState="paused",o()};if(this._polling||!this.writable){let c=0;this._polling&&(c++,this.once("pollComplete",function(){--c||i()})),this.writable||(c++,this.once("drain",function(){--c||i()}))}else i()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(o){const i=c=>{if(this.readyState==="opening"&&c.type==="open"&&this.onOpen(),c.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(c)};Zg(o,this.socket.binaryType).forEach(i),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const o=()=>{this.write([{type:"close"}])};this.readyState==="open"?o():this.once("open",o)}write(o){this.writable=!1,Jg(o,i=>{this.doWrite(i,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const o=this.opts.secure?"https":"http",i=this.query||{};return this.opts.timestampRequests!==!1&&(i[this.opts.timestampParam]=Eh()),!this.supportsBinary&&!i.sid&&(i.b64=1),this.createUri(o,i)}}let jh=!1;try{jh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const px=jh;function hx(){}class mx extends fx{constructor(o){if(super(o),typeof location<"u"){const i=location.protocol==="https:";let c=location.port;c||(c=i?"443":"80"),this.xd=typeof location<"u"&&o.hostname!==location.hostname||c!==o.port}}doWrite(o,i){const c=this.request({method:"POST",data:o});c.on("success",i),c.on("error",(d,p)=>{this.onError("xhr post error",d,p)})}doPoll(){const o=this.request();o.on("data",this.onData.bind(this)),o.on("error",(i,c)=>{this.onError("xhr poll error",i,c)}),this.pollXhr=o}}class zn extends xt{constructor(o,i,c){super(),this.createRequest=o,Sl(this,c),this._opts=c,this._method=c.method||"GET",this._uri=i,this._data=c.data!==void 0?c.data:null,this._create()}_create(){var o;const i=Ch(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");i.xdomain=!!this._opts.xd;const c=this._xhr=this.createRequest(i);try{c.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){c.setDisableHeaderCheck&&c.setDisableHeaderCheck(!0);for(let d in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(d)&&c.setRequestHeader(d,this._opts.extraHeaders[d])}}catch{}if(this._method==="POST")try{c.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{c.setRequestHeader("Accept","*/*")}catch{}(o=this._opts.cookieJar)===null||o===void 0||o.addCookies(c),"withCredentials"in c&&(c.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(c.timeout=this._opts.requestTimeout),c.onreadystatechange=()=>{var d;c.readyState===3&&((d=this._opts.cookieJar)===null||d===void 0||d.parseCookies(c.getResponseHeader("set-cookie"))),c.readyState===4&&(c.status===200||c.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof c.status=="number"?c.status:0)},0))},c.send(this._data)}catch(d){this.setTimeoutFn(()=>{this._onError(d)},0);return}typeof document<"u"&&(this._index=zn.requestsCount++,zn.requests[this._index]=this)}_onError(o){this.emitReserved("error",o,this._xhr),this._cleanup(!0)}_cleanup(o){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=hx,o)try{this._xhr.abort()}catch{}typeof document<"u"&&delete zn.requests[this._index],this._xhr=null}}_onLoad(){const o=this._xhr.responseText;o!==null&&(this.emitReserved("data",o),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}zn.requestsCount=0;zn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",pp);else if(typeof addEventListener=="function"){const n="onpagehide"in mn?"pagehide":"unload";addEventListener(n,pp,!1)}}function pp(){for(let n in zn.requests)zn.requests.hasOwnProperty(n)&&zn.requests[n].abort()}const gx=(function(){const n=_h({xdomain:!1});return n&&n.responseType!==null})();class xx extends mx{constructor(o){super(o);const i=o&&o.forceBase64;this.supportsBinary=gx&&!i}request(o={}){return Object.assign(o,{xd:this.xd},this.opts),new zn(_h,this.uri(),o)}}function _h(n){const o=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!o||px))return new XMLHttpRequest}catch{}if(!o)try{return new mn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const Nh=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class yx extends lu{get name(){return"websocket"}doOpen(){const o=this.uri(),i=this.opts.protocols,c=Nh?{}:Ch(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(c.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(o,i,c)}catch(d){return this.emitReserved("error",d)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=o=>this.onClose({description:"websocket connection closed",context:o}),this.ws.onmessage=o=>this.onData(o.data),this.ws.onerror=o=>this.onError("websocket error",o)}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;su(c,this.supportsBinary,p=>{try{this.doWrite(c,p)}catch{}d&&wl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const o=this.opts.secure?"wss":"ws",i=this.query||{};return this.opts.timestampRequests&&(i[this.opts.timestampParam]=Eh()),this.supportsBinary||(i.b64=1),this.createUri(o,i)}}const gc=mn.WebSocket||mn.MozWebSocket;class vx extends yx{createSocket(o,i,c){return Nh?new gc(o,i,c):i?new gc(o,i):new gc(o)}doWrite(o,i){this.ws.send(i)}}class bx extends lu{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(o){return this.emitReserved("error",o)}this._transport.closed.then(()=>{this.onClose()}).catch(o=>{this.onError("webtransport error",o)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(o=>{const i=tx(Number.MAX_SAFE_INTEGER,this.socket.binaryType),c=o.readable.pipeThrough(i).getReader(),d=ex();d.readable.pipeTo(o.writable),this._writer=d.writable.getWriter();const p=()=>{c.read().then(({done:y,value:g})=>{y||(this.onPacket(g),p())}).catch(y=>{})};p();const m={type:"open"};this.query.sid&&(m.data=`{"sid":"${this.query.sid}"}`),this._writer.write(m).then(()=>this.onOpen())})})}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const c=o[i],d=i===o.length-1;this._writer.write(c).then(()=>{d&&wl(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var o;(o=this._transport)===null||o===void 0||o.close()}}const wx={websocket:vx,webtransport:bx,polling:xx},Sx=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,kx=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Fc(n){if(n.length>8e3)throw"URI too long";const o=n,i=n.indexOf("["),c=n.indexOf("]");i!=-1&&c!=-1&&(n=n.substring(0,i)+n.substring(i,c).replace(/:/g,";")+n.substring(c,n.length));let d=Sx.exec(n||""),p={},m=14;for(;m--;)p[kx[m]]=d[m]||"";return i!=-1&&c!=-1&&(p.source=o,p.host=p.host.substring(1,p.host.length-1).replace(/;/g,":"),p.authority=p.authority.replace("[","").replace("]","").replace(/;/g,":"),p.ipv6uri=!0),p.pathNames=Cx(p,p.path),p.queryKey=Ex(p,p.query),p}function Cx(n,o){const i=/\/{2,9}/g,c=o.replace(i,"/").split("/");return(o.slice(0,1)=="/"||o.length===0)&&c.splice(0,1),o.slice(-1)=="/"&&c.splice(c.length-1,1),c}function Ex(n,o){const i={};return o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(c,d,p){d&&(i[d]=p)}),i}const Dc=typeof addEventListener=="function"&&typeof removeEventListener=="function",ll=[];Dc&&addEventListener("offline",()=>{ll.forEach(n=>n())},!1);let Th=class vo extends xt{constructor(o,i={}){var c,d;if(super(),this.binaryType=rx,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,o&&typeof o=="object"&&(i=o,o=null),o){const p=Fc(o);i.hostname=p.host,i.secure=p.protocol==="https"||p.protocol==="wss",i.port=p.port,p.query&&(i.query=p.query)}else i.host&&(i.hostname=Fc(i.host).host);if(Sl(this,i),this.secure=i.secure!=null?i.secure:typeof location<"u"&&location.protocol==="https:",i.hostname&&!i.port&&(i.port=this.secure?"443":"80"),this.hostname=i.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=i.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),i.transportImplementations&&i.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");i.transportImplementations||!((c=i.transports)===null||c===void 0)&&c.length&&typeof i.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((d=i.transportImplementations)!==null&&d!==void 0?d:i.transports).forEach(p=>{const m=p.prototype.name;this.transports.push(m),this._transportsByName[m]=p})):(this.transports=i.transports?[...i.transports]:["polling","websocket","webtransport"],this._transportsByName=wx),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=ux(this.opts.query)),Dc&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},ll.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(o){const i=Object.assign({},this.opts.query);i.EIO=kh,i.transport=o,this.id&&(i.sid=this.id);const c=Object.assign({},this.opts,{query:i,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[o]);return new this._transportsByName[o](c)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const o=this.opts.rememberUpgrade&&vo.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const i=this.createTransport(o);i.open(),this.setTransport(i)}setTransport(o){this.transport&&this.transport.removeAllListeners(),this.transport=o,o.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",i=>this._onClose("transport close",i))}_probe(o){let i=this.createTransport(o),c=!1;vo.priorWebsocketSuccess=!1;const d=()=>{c||(i.send([{type:"ping",data:"probe"}]),i.once("packet",R=>{if(!c)if(R.type==="pong"&&R.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",i),!i)return;vo.priorWebsocketSuccess=i.name==="websocket",this.transport.pause(()=>{c||this.readyState!=="closed"&&(_(),this.setTransport(i),i.send([{type:"upgrade"}]),this.emitReserved("upgrade",i),i=null,this.upgrading=!1,this.flush())})}else{const A=new Error("probe error");A.transport=i.name,this.emitReserved("upgradeError",A)}}))};function p(){c||(c=!0,_(),i.close(),i=null)}const m=R=>{const A=new Error("probe error: "+R);A.transport=i.name,p(),this.emitReserved("upgradeError",A)};function y(){m("transport closed")}function g(){m("socket closed")}function j(R){i&&R.name!==i.name&&p()}const _=()=>{i.removeListener("open",d),i.removeListener("error",m),i.removeListener("close",y),this.off("close",g),this.off("upgrading",j)};i.once("open",d),i.once("error",m),i.once("close",y),this.once("close",g),this.once("upgrading",j),this._upgrades.indexOf("webtransport")!==-1&&o!=="webtransport"?this.setTimeoutFn(()=>{c||i.open()},200):i.open()}onOpen(){if(this.readyState="open",vo.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let o=0;o<this._upgrades.length;o++)this._probe(this._upgrades[o])}_onPacket(o){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",o),this.emitReserved("heartbeat"),o.type){case"open":this.onHandshake(JSON.parse(o.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const i=new Error("server error");i.code=o.data,this._onError(i);break;case"message":this.emitReserved("data",o.data),this.emitReserved("message",o.data);break}}onHandshake(o){this.emitReserved("handshake",o),this.id=o.sid,this.transport.query.sid=o.sid,this._upgrades=this._filterUpgrades(o.upgrades),this._pingInterval=o.pingInterval,this._pingTimeout=o.pingTimeout,this._maxPayload=o.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const o=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+o,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},o),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const o=this._getWritablePackets();this.transport.send(o),this._prevBufferLen=o.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let i=1;for(let c=0;c<this.writeBuffer.length;c++){const d=this.writeBuffer[c].data;if(d&&(i+=lx(d)),c>0&&i>this._maxPayload)return this.writeBuffer.slice(0,c);i+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const o=Date.now()>this._pingTimeoutTime;return o&&(this._pingTimeoutTime=0,wl(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),o}write(o,i,c){return this._sendPacket("message",o,i,c),this}send(o,i,c){return this._sendPacket("message",o,i,c),this}_sendPacket(o,i,c,d){if(typeof i=="function"&&(d=i,i=void 0),typeof c=="function"&&(d=c,c=null),this.readyState==="closing"||this.readyState==="closed")return;c=c||{},c.compress=c.compress!==!1;const p={type:o,data:i,options:c};this.emitReserved("packetCreate",p),this.writeBuffer.push(p),d&&this.once("flush",d),this.flush()}close(){const o=()=>{this._onClose("forced close"),this.transport.close()},i=()=>{this.off("upgrade",i),this.off("upgradeError",i),o()},c=()=>{this.once("upgrade",i),this.once("upgradeError",i)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?c():o()}):this.upgrading?c():o()),this}_onError(o){if(vo.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",o),this._onClose("transport error",o)}_onClose(o,i){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Dc&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const c=ll.indexOf(this._offlineEventListener);c!==-1&&ll.splice(c,1)}this.readyState="closed",this.id=null,this.emitReserved("close",o,i),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(o){const i=[];for(let c=0;c<o.length;c++)~this.transports.indexOf(o[c])&&i.push(o[c]);return i}};Th.protocol=kh;function jx(n,o="",i){let c=n;i=i||typeof location<"u"&&location,n==null&&(n=i.protocol+"//"+i.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=i.protocol+n:n=i.host+n),/^(https?|wss?):\/\//.test(n)||(typeof i<"u"?n=i.protocol+"//"+n:n="https://"+n),c=Fc(n)),c.port||(/^(http|ws)$/.test(c.protocol)?c.port="80":/^(http|ws)s$/.test(c.protocol)&&(c.port="443")),c.path=c.path||"/";const p=c.host.indexOf(":")!==-1?"["+c.host+"]":c.host;return c.id=c.protocol+"://"+p+":"+c.port+o,c.href=c.protocol+"://"+p+(i&&i.port===c.port?"":":"+c.port),c}const _x=typeof ArrayBuffer=="function",Nx=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,Rh=Object.prototype.toString,Tx=typeof Blob=="function"||typeof Blob<"u"&&Rh.call(Blob)==="[object BlobConstructor]",Rx=typeof File=="function"||typeof File<"u"&&Rh.call(File)==="[object FileConstructor]";function au(n){return _x&&(n instanceof ArrayBuffer||Nx(n))||Tx&&n instanceof Blob||Rx&&n instanceof File}function al(n,o){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let i=0,c=n.length;i<c;i++)if(al(n[i]))return!0;return!1}if(au(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return al(n.toJSON(),!0);for(const i in n)if(Object.prototype.hasOwnProperty.call(n,i)&&al(n[i]))return!0;return!1}function Ix(n){const o=[],i=n.data,c=n;return c.data=cl(i,o),c.attachments=o.length,{packet:c,buffers:o}}function cl(n,o,i){if(!n)return n;if(au(n)){const c={_placeholder:!0,num:o.length};return o.push(n),c}else if(Array.isArray(n)){const c=new Array(n.length);for(let d=0;d<n.length;d++)c[d]=cl(n[d],o);return c}else if(typeof n=="object"&&!(n instanceof Date)){if(n.toJSON&&typeof n.toJSON=="function"&&!i)return cl(n.toJSON(),o,!0);const c={};for(const d in n)Object.prototype.hasOwnProperty.call(n,d)&&(c[d]=cl(n[d],o));return c}return n}function $x(n,o){return n.data=Bc(n.data,o),delete n.attachments,n}function Bc(n,o){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<o.length)return o[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let i=0;i<n.length;i++)n[i]=Bc(n[i],o);else if(typeof n=="object")for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(n[i]=Bc(n[i],o));return n}const Ax=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var ze;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(ze||(ze={}));class Px{constructor(o){this.replacer=o}encode(o){return(o.type===ze.EVENT||o.type===ze.ACK)&&al(o)?this.encodeAsBinary({type:o.type===ze.EVENT?ze.BINARY_EVENT:ze.BINARY_ACK,nsp:o.nsp,data:o.data,id:o.id}):[this.encodeAsString(o)]}encodeAsString(o){let i=""+o.type;return(o.type===ze.BINARY_EVENT||o.type===ze.BINARY_ACK)&&(i+=o.attachments+"-"),o.nsp&&o.nsp!=="/"&&(i+=o.nsp+","),o.id!=null&&(i+=o.id),o.data!=null&&(i+=JSON.stringify(o.data,this.replacer)),i}encodeAsBinary(o){const i=Ix(o),c=this.encodeAsString(i.packet),d=i.buffers;return d.unshift(c),d}}class cu extends xt{constructor(o){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof o=="function"?{reviver:o}:o)}add(o){let i;if(typeof o=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");i=this.decodeString(o);const c=i.type===ze.BINARY_EVENT;c||i.type===ze.BINARY_ACK?(i.type=c?ze.EVENT:ze.ACK,this.reconstructor=new Lx(i)):super.emitReserved("decoded",i)}else if(au(o)||o.base64)if(this.reconstructor)i=this.reconstructor.takeBinaryData(o),i&&(this.reconstructor=null,super.emitReserved("decoded",i));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+o)}decodeString(o){let i=0;const c={type:Number(o.charAt(0))};if(ze[c.type]===void 0)throw new Error("unknown packet type "+c.type);if(c.type===ze.BINARY_EVENT||c.type===ze.BINARY_ACK){const p=i+1;for(;o.charAt(++i)!=="-"&&i!=o.length;);const m=o.substring(p,i);if(m!=Number(m)||o.charAt(i)!=="-")throw new Error("Illegal attachments");const y=Number(m);if(!Ox(y)||y<1)throw new Error("Illegal attachments");if(y>this.opts.maxAttachments)throw new Error("too many attachments");c.attachments=y}if(o.charAt(i+1)==="/"){const p=i+1;for(;++i&&!(o.charAt(i)===","||i===o.length););c.nsp=o.substring(p,i)}else c.nsp="/";const d=o.charAt(i+1);if(d!==""&&Number(d)==d){const p=i+1;for(;++i;){const m=o.charAt(i);if(m==null||Number(m)!=m){--i;break}if(i===o.length)break}c.id=Number(o.substring(p,i+1))}if(o.charAt(++i)){const p=this.tryParse(o.substr(i));if(cu.isPayloadValid(c.type,p))c.data=p;else throw new Error("invalid payload")}return c}tryParse(o){try{return JSON.parse(o,this.opts.reviver)}catch{return!1}}static isPayloadValid(o,i){switch(o){case ze.CONNECT:return hp(i);case ze.DISCONNECT:return i===void 0;case ze.CONNECT_ERROR:return typeof i=="string"||hp(i);case ze.EVENT:case ze.BINARY_EVENT:return Array.isArray(i)&&(typeof i[0]=="number"||typeof i[0]=="string"&&Ax.indexOf(i[0])===-1);case ze.ACK:case ze.BINARY_ACK:return Array.isArray(i)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Lx{constructor(o){this.packet=o,this.buffers=[],this.reconPack=o}takeBinaryData(o){if(this.buffers.push(o),this.buffers.length===this.reconPack.attachments){const i=$x(this.reconPack,this.buffers);return this.finishedReconstruction(),i}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Ox=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function hp(n){return Object.prototype.toString.call(n)==="[object Object]"}const Mx=Object.freeze(Object.defineProperty({__proto__:null,Decoder:cu,Encoder:Px,get PacketType(){return ze}},Symbol.toStringTag,{value:"Module"}));function jn(n,o,i){return n.on(o,i),function(){n.off(o,i)}}const zx=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ih extends xt{constructor(o,i,c){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=o,this.nsp=i,c&&c.auth&&(this.auth=c.auth),this._opts=Object.assign({},c),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const o=this.io;this.subs=[jn(o,"open",this.onopen.bind(this)),jn(o,"packet",this.onpacket.bind(this)),jn(o,"error",this.onerror.bind(this)),jn(o,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...o){return o.unshift("message"),this.emit.apply(this,o),this}emit(o,...i){var c,d,p;if(zx.hasOwnProperty(o))throw new Error('"'+o.toString()+'" is a reserved event name');if(i.unshift(o),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(i),this;const m={type:ze.EVENT,data:i};if(m.options={},m.options.compress=this.flags.compress!==!1,typeof i[i.length-1]=="function"){const _=this.ids++,R=i.pop();this._registerAckCallback(_,R),m.id=_}const y=(d=(c=this.io.engine)===null||c===void 0?void 0:c.transport)===null||d===void 0?void 0:d.writable,g=this.connected&&!(!((p=this.io.engine)===null||p===void 0)&&p._hasPingExpired());return this.flags.volatile&&!y||(g?(this.notifyOutgoingListeners(m),this.packet(m)):this.sendBuffer.push(m)),this.flags={},this}_registerAckCallback(o,i){var c;const d=(c=this.flags.timeout)!==null&&c!==void 0?c:this._opts.ackTimeout;if(d===void 0){this.acks[o]=i;return}const p=this.io.setTimeoutFn(()=>{delete this.acks[o];for(let y=0;y<this.sendBuffer.length;y++)this.sendBuffer[y].id===o&&this.sendBuffer.splice(y,1);i.call(this,new Error("operation has timed out"))},d),m=(...y)=>{this.io.clearTimeoutFn(p),i.apply(this,y)};m.withError=!0,this.acks[o]=m}emitWithAck(o,...i){return new Promise((c,d)=>{const p=(m,y)=>m?d(m):c(y);p.withError=!0,i.push(p),this.emit(o,...i)})}_addToQueue(o){let i;typeof o[o.length-1]=="function"&&(i=o.pop());const c={id:this._queueSeq++,tryCount:0,pending:!1,args:o,flags:Object.assign({fromQueue:!0},this.flags)};o.push((d,...p)=>(this._queue[0],d!==null?c.tryCount>this._opts.retries&&(this._queue.shift(),i&&i(d)):(this._queue.shift(),i&&i(null,...p)),c.pending=!1,this._drainQueue())),this._queue.push(c),this._drainQueue()}_drainQueue(o=!1){if(!this.connected||this._queue.length===0)return;const i=this._queue[0];i.pending&&!o||(i.pending=!0,i.tryCount++,this.flags=i.flags,this.emit.apply(this,i.args))}packet(o){o.nsp=this.nsp,this.io._packet(o)}onopen(){typeof this.auth=="function"?this.auth(o=>{this._sendConnectPacket(o)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(o){this.packet({type:ze.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},o):o})}onerror(o){this.connected||this.emitReserved("connect_error",o)}onclose(o,i){this.connected=!1,delete this.id,this.emitReserved("disconnect",o,i),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(o=>{if(!this.sendBuffer.some(c=>String(c.id)===o)){const c=this.acks[o];delete this.acks[o],c.withError&&c.call(this,new Error("socket has been disconnected"))}})}onpacket(o){if(o.nsp===this.nsp)switch(o.type){case ze.CONNECT:o.data&&o.data.sid?this.onconnect(o.data.sid,o.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case ze.EVENT:case ze.BINARY_EVENT:this.onevent(o);break;case ze.ACK:case ze.BINARY_ACK:this.onack(o);break;case ze.DISCONNECT:this.ondisconnect();break;case ze.CONNECT_ERROR:this.destroy();const c=new Error(o.data.message);c.data=o.data.data,this.emitReserved("connect_error",c);break}}onevent(o){const i=o.data||[];o.id!=null&&i.push(this.ack(o.id)),this.connected?this.emitEvent(i):this.receiveBuffer.push(Object.freeze(i))}emitEvent(o){if(this._anyListeners&&this._anyListeners.length){const i=this._anyListeners.slice();for(const c of i)c.apply(this,o)}super.emit.apply(this,o),this._pid&&o.length&&typeof o[o.length-1]=="string"&&(this._lastOffset=o[o.length-1])}ack(o){const i=this;let c=!1;return function(...d){c||(c=!0,i.packet({type:ze.ACK,id:o,data:d}))}}onack(o){const i=this.acks[o.id];typeof i=="function"&&(delete this.acks[o.id],i.withError&&o.data.unshift(null),i.apply(this,o.data))}onconnect(o,i){this.id=o,this.recovered=i&&this._pid===i,this._pid=i,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(o=>this.emitEvent(o)),this.receiveBuffer=[],this.sendBuffer.forEach(o=>{this.notifyOutgoingListeners(o),this.packet(o)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(o=>o()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:ze.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(o){return this.flags.compress=o,this}get volatile(){return this.flags.volatile=!0,this}timeout(o){return this.flags.timeout=o,this}onAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(o),this}prependAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(o),this}offAny(o){if(!this._anyListeners)return this;if(o){const i=this._anyListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(o),this}prependAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(o),this}offAnyOutgoing(o){if(!this._anyOutgoingListeners)return this;if(o){const i=this._anyOutgoingListeners;for(let c=0;c<i.length;c++)if(o===i[c])return i.splice(c,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(o){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const i=this._anyOutgoingListeners.slice();for(const c of i)c.apply(this,o.data)}}}function No(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}No.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var o=Math.random(),i=Math.floor(o*this.jitter*n);n=(Math.floor(o*10)&1)==0?n-i:n+i}return Math.min(n,this.max)|0};No.prototype.reset=function(){this.attempts=0};No.prototype.setMin=function(n){this.ms=n};No.prototype.setMax=function(n){this.max=n};No.prototype.setJitter=function(n){this.jitter=n};class Uc extends xt{constructor(o,i){var c;super(),this.nsps={},this.subs=[],o&&typeof o=="object"&&(i=o,o=void 0),i=i||{},i.path=i.path||"/socket.io",this.opts=i,Sl(this,i),this.reconnection(i.reconnection!==!1),this.reconnectionAttempts(i.reconnectionAttempts||1/0),this.reconnectionDelay(i.reconnectionDelay||1e3),this.reconnectionDelayMax(i.reconnectionDelayMax||5e3),this.randomizationFactor((c=i.randomizationFactor)!==null&&c!==void 0?c:.5),this.backoff=new No({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(i.timeout==null?2e4:i.timeout),this._readyState="closed",this.uri=o;const d=i.parser||Mx;this.encoder=new d.Encoder,this.decoder=new d.Decoder,this._autoConnect=i.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(o){return arguments.length?(this._reconnection=!!o,o||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(o){return o===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=o,this)}reconnectionDelay(o){var i;return o===void 0?this._reconnectionDelay:(this._reconnectionDelay=o,(i=this.backoff)===null||i===void 0||i.setMin(o),this)}randomizationFactor(o){var i;return o===void 0?this._randomizationFactor:(this._randomizationFactor=o,(i=this.backoff)===null||i===void 0||i.setJitter(o),this)}reconnectionDelayMax(o){var i;return o===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=o,(i=this.backoff)===null||i===void 0||i.setMax(o),this)}timeout(o){return arguments.length?(this._timeout=o,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(o){if(~this._readyState.indexOf("open"))return this;this.engine=new Th(this.uri,this.opts);const i=this.engine,c=this;this._readyState="opening",this.skipReconnect=!1;const d=jn(i,"open",function(){c.onopen(),o&&o()}),p=y=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",y),o?o(y):this.maybeReconnectOnOpen()},m=jn(i,"error",p);if(this._timeout!==!1){const y=this._timeout,g=this.setTimeoutFn(()=>{d(),p(new Error("timeout")),i.close()},y);this.opts.autoUnref&&g.unref(),this.subs.push(()=>{this.clearTimeoutFn(g)})}return this.subs.push(d),this.subs.push(m),this}connect(o){return this.open(o)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const o=this.engine;this.subs.push(jn(o,"ping",this.onping.bind(this)),jn(o,"data",this.ondata.bind(this)),jn(o,"error",this.onerror.bind(this)),jn(o,"close",this.onclose.bind(this)),jn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(o){try{this.decoder.add(o)}catch(i){this.onclose("parse error",i)}}ondecoded(o){wl(()=>{this.emitReserved("packet",o)},this.setTimeoutFn)}onerror(o){this.emitReserved("error",o)}socket(o,i){let c=this.nsps[o];return c?this._autoConnect&&!c.active&&c.connect():(c=new Ih(this,o,i),this.nsps[o]=c),c}_destroy(o){const i=Object.keys(this.nsps);for(const c of i)if(this.nsps[c].active)return;this._close()}_packet(o){const i=this.encoder.encode(o);for(let c=0;c<i.length;c++)this.engine.write(i[c],o.options)}cleanup(){this.subs.forEach(o=>o()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(o,i){var c;this.cleanup(),(c=this.engine)===null||c===void 0||c.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",o,i),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const o=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const i=this.backoff.duration();this._reconnecting=!0;const c=this.setTimeoutFn(()=>{o.skipReconnect||(this.emitReserved("reconnect_attempt",o.backoff.attempts),!o.skipReconnect&&o.open(d=>{d?(o._reconnecting=!1,o.reconnect(),this.emitReserved("reconnect_error",d)):o.onreconnect()}))},i);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}}onreconnect(){const o=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",o)}}const ds={};function ul(n,o){typeof n=="object"&&(o=n,n=void 0),o=o||{};const i=jx(n,o.path||"/socket.io"),c=i.source,d=i.id,p=i.path,m=ds[d]&&p in ds[d].nsps,y=o.forceNew||o["force new connection"]||o.multiplex===!1||m;let g;return y?g=new Uc(c,o):(ds[d]||(ds[d]=new Uc(c,o)),g=ds[d]),i.query&&!o.query&&(o.query=i.queryKey),g.socket(i.path,o)}Object.assign(ul,{Manager:Uc,Socket:Ih,io:ul,connect:ul});const $h="";async function Xe(n,{method:o="GET",token:i,body:c,headers:d={}}={}){const p=await fetch(`${$h}${n}`,{method:o,headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{},...d},body:c?JSON.stringify(c):void 0}),m=await p.json().catch(()=>({}));if(!p.ok){const y=new Error(m.error||`Falha na requisição (${p.status})`);throw y.status=p.status,y}return m}const Ye={login(n,o){return Xe("/api/auth/login",{method:"POST",body:{email:n,password:o}})},getMe(n){return Xe("/api/auth/me",{token:n})},logout(n){return n?Xe("/api/auth/logout",{method:"POST",token:n}).catch(()=>{}):Promise.resolve()},async downloadAgentInstaller(n){const o=await fetch(`${$h}/api/agent/download`,{method:"GET",headers:n?{Authorization:`Bearer ${n}`}:{}});if(!o.ok){const p=await o.json().catch(()=>({})),m=new Error(p.error||`Falha ao baixar instalador (${o.status})`);throw m.status=o.status,m}const i=await o.blob(),c=window.URL.createObjectURL(i),d=document.createElement("a");d.href=c,d.download="IpojucaRMM-Setup.exe",document.body.appendChild(d),d.click(),d.remove(),setTimeout(()=>window.URL.revokeObjectURL(c),4e3)},revokeMachine(n,o,i=!0,c=""){return Xe(`/api/machines/${o}/revoke`,{method:"POST",token:n,body:{revoked:i,reason:c}})},getUnits(n){return Xe("/api/units",{token:n})},createUnit(n,o){return Xe("/api/units",{method:"POST",token:n,body:o})},updateUnit(n,o,i){return Xe(`/api/units/${o}`,{method:"PUT",token:n,body:i})},deleteUnit(n,o,i={}){const c=new URLSearchParams;i.target_unit_id&&c.set("target_unit_id",i.target_unit_id),i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Xe(`/api/units/${o}${d?`?${d}`:""}`,{method:"DELETE",token:n,body:i})},createSector(n,o,i){return Xe(`/api/units/${o}/sectors`,{method:"POST",token:n,body:i})},updateSector(n,o,i){return Xe(`/api/sectors/${o}`,{method:"PUT",token:n,body:i})},deleteSector(n,o,i={}){const c=new URLSearchParams;i.target_sector_id&&c.set("target_sector_id",i.target_sector_id);const d=c.toString();return Xe(`/api/sectors/${o}${d?`?${d}`:""}`,{method:"DELETE",token:n,body:i})},getMachines(n,{unitId:o,status:i}={}){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("status",i);const d=c.toString();return Xe(`/api/machines${d?`?${d}`:""}`,{token:n})},getMachineDiagnostics(n,o){return Xe(`/api/machines/${o}/diagnostics`,{token:n})},refreshMachineTelemetryNow(n,o){return Xe(`/api/machines/${o}/refresh-telemetry`,{method:"POST",token:n})},deleteMachine(n,o){return Xe(`/api/machines/${o}`,{method:"DELETE",token:n})},getAgentVersionInfo(){return Xe("/api/agent/version")},updateMachineAgent(n,o){return Xe(`/api/machines/${o}/update-agent`,{method:"POST",token:n})},updateAllAgents(n){return Xe("/api/agent/update-all",{method:"POST",token:n})},getMachineMessages(n,o){return Xe(`/api/machines/${o}/messages`,{token:n})},sendMachineMessage(n,o,i){return Xe(`/api/machines/${o}/messages`,{method:"POST",token:n,body:{message:i}})},updateMachineLocation(n,o,{unitId:i,sectorId:c}){return Xe(`/api/machines/${o}/location`,{method:"POST",token:n,body:{unit_id:i,sector_id:c}})},getTaskCatalog(n){return Xe("/api/catalog/tasks",{token:n})},getApprovedPrinters(n,o,i){const c=new URLSearchParams;o&&c.set("unit_id",o),i&&c.set("machine_id",i);const d=c.toString()?`?${c.toString()}`:"";return Xe(`/api/printers${d}`,{token:n})},dispatchAuthorizedTask(n,{machineId:o,taskCode:i,parameters:c,reason:d}){return Xe("/api/command",{method:"POST",token:n,body:{machine_id:o,task_code:i,parameters:c,reason:d}})},getAlerts(n){return Xe("/api/alerts",{token:n})},simulateAgentHeartbeat({agentUuid:n,agentToken:o,inventory:i,metrics:c}){return Xe("/api/heartbeat",{method:"POST",headers:{"X-Agent-Uuid":n,"X-Agent-Token":o},body:{agent_version:"1.0.0",inventory:i,metrics:c}})}};function Fx(n,o={}){const c=ul("/dashboard",{auth:{token:n},reconnection:!0});return o.onMachineUpdated&&c.on("machine:updated",o.onMachineUpdated),o.onMachineDeleted&&c.on("machine:deleted",o.onMachineDeleted),o.onAlertTriggered&&c.on("alert:triggered",o.onAlertTriggered),o.onTaskUpdated&&c.on("task:updated",o.onTaskUpdated),o.onAgentMessage&&c.on("agent:message",o.onAgentMessage),o.onUnitsUpdated&&c.on("units:updated",o.onUnitsUpdated),o.onConnect&&c.on("connect",o.onConnect),o.onDisconnect&&c.on("disconnect",o.onDisconnect),c}const Kn=480,kr=300,go=3,Dx=30,mp=15,Bx=Kn/2,Ux=62,ks=12,Hr=9,zi=2.2,$e={floorA:"#F2E4CC",floorB:"#E7D5B6",floorEdge:"#C9AE86",wallSouth:"#F0DFC4",wallEast:"#DCC7A6",wallCap:"#9C6B4A",rug:"#7FB069",rugBorder:"#F2C14E",woodTop:"#C98A4B",woodSouth:"#A96C33",deskTop:"#E0A458",deskSouth:"#BE8038",metal:"#B7C4CE",metalDark:"#7C8B96",plastic:"#F4F8FB",plasticDark:"#CBD6DE",paper:"#FFFDF7",plant:"#3E9B4F",plantDark:"#2C7A3B",pot:"#C4693F",glass:"#BFE6F5",glassFrame:"#6E8A96",ink:"#1F2933",inkSoft:"#52606D"},Mn={NORMAL:"#12B76A",WARNING:"#F79009",CRITICAL:"#F04438",OFFLINE:"#98A2B3"},Hx={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"};function Cs(n,o){const i=parseInt(n.slice(1),16),c=Math.max(0,Math.min(255,Math.round((i>>16&255)*o))),d=Math.max(0,Math.min(255,Math.round((i>>8&255)*o))),p=Math.max(0,Math.min(255,Math.round((i&255)*o)));return`#${(c<<16|d<<8|p).toString(16).padStart(6,"0")}`}function He(n,o,i=0){return{sx:Bx+(n-o)*(Dx/2),sy:Ux+(n+o)*(mp/2)-i*mp}}function wo(n,o,i){n.fillStyle=i,n.beginPath(),n.moveTo(Math.round(o[0].sx),Math.round(o[0].sy));for(let c=1;c<o.length;c+=1)n.lineTo(Math.round(o[c].sx),Math.round(o[c].sy));n.closePath(),n.fill()}function Wx(n,o,i,c,d){const p=He(o,i,c),m=He(o+1,i,c),y=He(o+1,i+1,c),g=He(o,i+1,c);wo(n,[p,m,y,g],d)}function Ft(n,o,i,c,d,p,m,y){const g=Cs(y,1),j=Cs(y,.82),_=Cs(y,.68);wo(n,[He(o,i+p,c+m),He(o+d,i+p,c+m),He(o+d,i+p,c),He(o,i+p,c)],j),wo(n,[He(o+d,i,c+m),He(o+d,i+p,c+m),He(o+d,i+p,c),He(o+d,i,c)],_),wo(n,[He(o,i,c+m),He(o+d,i,c+m),He(o+d,i+p,c+m),He(o,i+p,c+m)],g)}function mt(n,o,i,c,d,p,m){wo(n,[He(o,i,c),He(o+d,i,c),He(o+d,i+p,c),He(o,i+p,c)],m)}function Vx(n){for(let o=0;o<ks;o+=1)for(let i=0;i<Hr;i+=1){const c=(o+i)%2===0;Wx(n,o,i,0,c?$e.floorA:$e.floorB)}wo(n,[He(0,Hr,0),He(ks,Hr,0),He(ks,Hr,-.12),He(0,Hr,-.12)],$e.floorEdge)}function Gx(n){Ft(n,-.3,-.3,0,ks+.6,.3,zi,$e.wallSouth),Ft(n,-.3,0,0,.3,Hr,zi,$e.wallEast),mt(n,-.3,-.3,zi,ks+.6,.3,$e.wallCap),mt(n,-.3,0,zi,.3,Hr,$e.wallCap);const o=4.2,i=.02;mt(n,o,i,1.05,2.6,.02,$e.glassFrame),mt(n,o+.12,i+.01,1.15,2.36,.02,$e.glass),mt(n,o+1.26,i+.01,1.15,.08,.02,$e.glassFrame),mt(n,.02,6,0,.02,1.5,$e.woodSouth),mt(n,.03,6.1,0,.02,1.3,$e.woodTop),mt(n,.04,7.2,.95,.02,.12,"#D9B44A")}function qx(n){mt(n,4.4,4.1,.015,3.4,2.2,$e.rugBorder),mt(n,4.55,4.25,.02,3.1,1.9,$e.rug)}function Yx(n){Ft(n,7.4,6,0,3.6,.9,1.05,$e.woodSouth),mt(n,7.35,5.95,1.05,3.7,1,$e.woodTop),mt(n,7.45,6.05,1.07,3.5,.8,"#E7D9C3")}function Qx(n){Ft(n,2.1,2.5,0,2.4,1.2,.82,$e.deskSouth),mt(n,2.05,2.45,.82,2.5,1.3,$e.deskTop)}function Kx(n){Ft(n,5,2.2,0,2.2,1.1,.82,$e.deskSouth),mt(n,4.95,2.15,.82,2.3,1.2,$e.deskTop)}function Xx(n){Ft(n,2.7,4,0,.9,.9,.45,$e.metalDark),Ft(n,2.7,4.75,.45,.9,.18,.55,$e.metal)}function Jx(n){Ft(n,9.4,1.9,0,1.5,1.2,.62,$e.metalDark),mt(n,9.35,1.85,.62,1.6,1.3,$e.metal),Ft(n,9.55,2.05,.62,1.15,.85,.55,$e.plasticDark),mt(n,9.6,2.1,1.17,1.05,.3,$e.plastic),mt(n,9.7,2.45,1.19,.85,.35,$e.paper)}function Zx(n){Ft(n,.55,.9,0,.55,.55,.4,$e.pot),Ft(n,.62,.97,.4,.4,.4,.45,$e.plantDark),Ft(n,.7,1.05,.85,.24,.24,.3,$e.plant)}const xc=[{x:2.95,y:2.85,label:"MESA 01",labelOffset:-2},{x:5.55,y:2.55,label:"MESA 02",labelOffset:-16},{x:8.15,y:6.25,label:"BALCÃO",labelOffset:-2}];function ey(n){return n?n.health_status==="OFFLINE"?n.last_seen_at?(Date.now()-new Date(n.last_seen_at).getTime())/1e3>=86400:!1:Number(n.idle_seconds||0)>=86400:!1}function ty(n,o,i,c,d,p){const m=(i==null?void 0:i.health_status)||"OFFLINE",y=Mn[m]||Mn.OFFLINE;Ft(n,o.x,o.y,.82,.85,.3,.12,$e.metalDark),Ft(n,o.x+.34,o.y+.08,.94,.16,.12,.28,$e.metal),Ft(n,o.x-.02,o.y+.02,1.2,.9,.14,.62,$e.plasticDark),mt(n,o.x+.04,o.y+.03,1.78,.78,.12,y),mt(n,o.x+.1,o.y+.05,1.79,.3,.06,Cs(y,1.35)),mt(n,o.x+.05,o.y+.42,.84,.7,.28,$e.plasticDark);const g=He(o.x+.86,o.y+.1,1.86);if(n.fillStyle=p||m!=="NORMAL"?y:Cs(y,.6),n.fillRect(Math.round(g.sx)-1,Math.round(g.sy)-1,3,3),c||d){const j=He(o.x-.25,o.y-.25,.03),_=He(o.x+1.15,o.y-.25,.03),R=He(o.x+1.15,o.y+.85,.03),A=He(o.x-.25,o.y+.85,.03);n.strokeStyle=c?"#1F2937":"#52796B",n.lineWidth=c?1.4:1,n.beginPath(),n.moveTo(Math.round(j.sx),Math.round(j.sy)),n.lineTo(Math.round(_.sx),Math.round(_.sy)),n.lineTo(Math.round(R.sx),Math.round(R.sy)),n.lineTo(Math.round(A.sx),Math.round(A.sy)),n.closePath(),n.stroke()}}function ny(n,o,i,c,d=[]){const p=(i==null?void 0:i.health_status)||"OFFLINE",m=ey(i),y=He(o.x+.45,o.y+.2,2.15),g=(i==null?void 0:i.hostname)||"SEM AGENTE",j=m?`${g} !24h`:g;n.font='8px "Courier New", monospace';const _=Math.max(n.measureText(j).width+18,46),R=Math.round(y.sx-_/2);let A=Math.round(y.sy-13+(o.labelOffset||0));const F=ae=>d.some(V=>R<V.x+V.w&&R+_>V.x&&ae<V.y+V.h&&ae+12>V.y);let oe=0;for(;F(A)&&oe<8;)A+=14,oe+=1;const W={x:R,y:A,w:_,h:12};return d.push(W),n.fillStyle=c?"#1F2937":m?"#FEF2F2":"rgba(255,255,255,0.96)",n.fillRect(R,A,_,12),n.strokeStyle=c?"#1F2937":m?"#DC2626":"rgba(31,41,55,0.3)",n.lineWidth=1,n.strokeRect(R+.5,A+.5,_-1,11),n.fillStyle=m?"#DC2626":Mn[p]||Mn.OFFLINE,n.fillRect(R+4,A+4,4,4),n.fillStyle=c?"#FFFFFF":m?"#991B1B":$e.ink,n.textBaseline="middle",n.fillText(j,R+11,A+6.5),W}function ry(n,o,i,c){if(!o)return;const d=o.health_status||"OFFLINE",p=Mn[d]||Mn.OFFLINE,m=16,y=236,g=74,j=c-g-18;n.fillStyle="rgba(255,255,255,0.96)",n.fillRect(m,j,y,g),n.strokeStyle="rgba(31,41,55,0.35)",n.lineWidth=1,n.strokeRect(m+.5,j+.5,y-1,g-1),n.fillStyle=p,n.fillRect(m,j,3,g),n.textBaseline="alphabetic",n.font='bold 11px "Courier New", monospace',n.fillStyle=$e.ink,n.fillText(o.hostname||"SEM AGENTE",m+12,j+18),n.font='9px "Courier New", monospace',n.fillStyle=p,n.fillText(Hx[d]||d,m+12,j+32),n.fillStyle=$e.inkSoft,n.fillText(`IP ${o.ip_address||"—"}`,m+12,j+45),n.fillText(`CPU ${Number(o.cpu_usage_pct??0).toFixed(0)}%   RAM ${Number(o.ram_usage_pct??0).toFixed(0)}%`,m+12,j+57);const _=Number(o.temperature_c)>0?`${Number(o.temperature_c).toFixed(0)}°C`:"N/D";n.fillText(`DISCO ${Number(o.disk_usage_pct??0).toFixed(0)}%   TEMP ${_}`,m+12,j+69)}const oy=E.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, #f7f4ec 0%, #e7e3d8 58%, #d8d4c7 100%);
  overflow: hidden;
  z-index: 0;
`,sy=E.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${({$dragging:n,$hover:o})=>n?"grabbing":o?"pointer":"grab"};
  image-rendering: auto;
`,iy=E.div`
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
`,Fi=E.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: ${({$color:n})=>n};
  margin-right: 4px;
`,ly=E.div`
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
`;function ay({activeUnit:n,machines:o=[],selectedMachine:i,selectedSector:c,onSelectMachine:d}){const p=N.useRef(null),m=N.useRef(null),y=N.useRef([]),g=N.useRef({active:!1,x:0,y:0,panX:0,panY:0}),[j,_]=N.useState({zoom:1.28,panX:0,panY:0}),[R,A]=N.useState(!1),[F,oe]=N.useState(null),[W,ae]=N.useState(!0),V=N.useMemo(()=>{const J=(o||[]).filter(ee=>!(n!=null&&n.id)||Number(ee.unit_id)===Number(n.id));return[...c!=null&&c.id?J.filter(ee=>Number(ee.sector_id)===Number(c.id)):J].sort((ee,te)=>Number(ee.id)-Number(te.id))},[o,n==null?void 0:n.id,c==null?void 0:c.id]),X=N.useMemo(()=>V.map((J,ne)=>({...xc[ne]||{x:2.2+(ne-xc.length)%4*2.1,y:5.2+Math.floor((ne-xc.length)/4)*1.6,label:`POSTO ${String(ne+1).padStart(2,"0")}`,labelOffset:-6},machine:J})),[V]);N.useEffect(()=>{const J=setInterval(()=>ae(ne=>!ne),700);return()=>clearInterval(J)},[]);const xe=N.useCallback(()=>{const J=p.current;if(!J)return;if(!m.current){const Q=document.createElement("canvas");Q.width=Kn*go,Q.height=kr*go,m.current=Q}const ne=m.current,ee=ne.getContext("2d");ee.setTransform(go,0,0,go,0,0),ee.imageSmoothingEnabled=!0,ee.clearRect(0,0,Kn,kr),Vx(ee),Gx(ee),qx(ee),Yx(ee),Qx(ee),Kx(ee),Xx(ee),Jx(ee),Zx(ee);const te=[];X.forEach(Q=>{if(!Q.machine)return;const ke=!!(i!=null&&i.id)&&i.id===Q.machine.id,_e=!!F&&F===Q.machine.id;ty(ee,Q,Q.machine,ke,_e,W);const yt=He(Q.x+.45,Q.y+.2,1.2);te.push({id:Q.machine.id,x:yt.sx-26,y:yt.sy-30,w:52,h:48})});const Ne=[];X.forEach(Q=>{if(!Q.machine)return;const ke=ny(ee,Q,Q.machine,!!(i!=null&&i.id)&&i.id===Q.machine.id,Ne);ke&&te.push({id:Q.machine.id,x:ke.x-2,y:ke.y-2,w:ke.w+4,h:ke.h+4})}),y.current=te;const Ce=window.devicePixelRatio||1,Me=J.clientWidth||Kn,Ee=J.clientHeight||kr,O=Math.round(Me*Ce),Z=Math.round(Ee*Ce);(J.width!==O||J.height!==Z)&&(J.width=O,J.height=Z);const M=J.getContext("2d");M.imageSmoothingEnabled=!0,M.imageSmoothingQuality="high",M.setTransform(1,0,0,1,0,0),M.clearRect(0,0,O,Z);const T=Math.min(Me/Kn,Ee/kr)*j.zoom*Ce,q=Kn*T,Y=kr*T,ve=(O-q)/2+j.panX*Ce,ge=(Z-Y)/2+j.panY*Ce;M.drawImage(ne,0,0,Kn*go,kr*go,ve,ge,q,Y),M.setTransform(Ce,0,0,Ce,0,0),M.imageSmoothingEnabled=!0,M.textBaseline="alphabetic",M.font='bold 11px "Courier New", monospace',M.fillStyle=$e.ink;const Se=`${(n==null?void 0:n.code)||"USF"} // ${(c==null?void 0:c.name)||"VISÃO GERAL DA UNIDADE"}`;M.fillText(Se.toUpperCase(),16,26),M.font='9px "Courier New", monospace',M.fillStyle=$e.inkSoft,M.fillText(`${V.length} ESTAÇÃO(ÕES) • PIXEL ART • CANVAS 2D`,16,40),ry(M,i,Me,Ee)},[X,i,F,W,j,n==null?void 0:n.code,c==null?void 0:c.name,V.length]);N.useEffect(()=>{xe()},[xe]),N.useEffect(()=>{const J=()=>xe();return window.addEventListener("resize",J),()=>window.removeEventListener("resize",J)},[xe]);const Te=N.useCallback((J,ne)=>{const ee=p.current;if(!ee)return null;const te=ee.getBoundingClientRect(),Ne=te.width,Ce=te.height,Ee=Math.min(Ne/Kn,Ce/kr)*j.zoom,O=Kn*Ee,Z=kr*Ee,M=(Ne-O)/2+j.panX,b=(Ce-Z)/2+j.panY;return{x:(J-te.left-M)/Ee,y:(ne-te.top-b)/Ee}},[j]),Re=N.useCallback((J,ne)=>{const ee=Te(J,ne);if(!ee)return null;const te=y.current.find(Ne=>ee.x>=Ne.x&&ee.x<=Ne.x+Ne.w&&ee.y>=Ne.y&&ee.y<=Ne.y+Ne.h);return(te==null?void 0:te.id)??null},[Te]),fe=J=>{var ne,ee;g.current={active:!0,x:J.clientX,y:J.clientY,panX:j.panX,panY:j.panY,moved:!1},A(!0),(ee=(ne=J.currentTarget).setPointerCapture)==null||ee.call(ne,J.pointerId)},H=J=>{const ne=g.current;if(ne.active){const te=J.clientX-ne.x,Ne=J.clientY-ne.y;(Math.abs(te)>3||Math.abs(Ne)>3)&&(ne.moved=!0),_(Ce=>({...Ce,panX:ne.panX+te,panY:ne.panY+Ne}));return}const ee=Re(J.clientX,J.clientY);oe(te=>te===ee?te:ee)},de=J=>{const ne=g.current;if(g.current={...ne,active:!1},A(!1),ne.moved)return;const ee=Re(J.clientX,J.clientY);if(ee&&d){const te=V.find(Ne=>Ne.id===ee);te&&d(te)}},We=N.useCallback(J=>{J.preventDefault();const ne=J.deltaY<0?1.12:.89;_(ee=>({...ee,zoom:Math.min(4,Math.max(.6,ee.zoom*ne))}))},[]);return N.useEffect(()=>{const J=p.current;if(J)return J.addEventListener("wheel",We,{passive:!1}),()=>J.removeEventListener("wheel",We)},[We]),l.jsxs(oy,{children:[l.jsx(sy,{ref:p,$dragging:R,$hover:!!F,onPointerDown:fe,onPointerMove:H,onPointerUp:de,onPointerLeave:()=>{g.current={...g.current,active:!1},A(!1),oe(null)},onDoubleClick:()=>_({zoom:1.28,panX:0,panY:0}),title:F?"Clique para abrir o diagnóstico":"Arraste para mover • roda para zoom"}),l.jsxs(iy,{children:[l.jsxs("span",{children:[l.jsx(Fi,{$color:Mn.NORMAL}),"ONLINE"]}),l.jsxs("span",{children:[l.jsx(Fi,{$color:Mn.WARNING}),"ATENÇÃO"]}),l.jsxs("span",{children:[l.jsx(Fi,{$color:Mn.CRITICAL}),"CRÍTICO"]}),l.jsxs("span",{children:[l.jsx(Fi,{$color:Mn.OFFLINE}),"OFFLINE"]})]}),l.jsx(ly,{children:"ARRASTE • RODA = ZOOM • DUPLO CLIQUE = CENTRALIZAR"})]})}function Oe({size:n=15,strokeWidth:o=1.65,children:i,...c}){return l.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:o,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...c,children:i})}function Hc({size:n=24}){return l.jsxs("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[l.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"6",fill:"#2D6A4F"}),l.jsx("path",{d:"M7.5 12.25H10.2L11.55 8.5L13.35 15.5L14.7 12.25H16.75",stroke:"#FFFFFF",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}function gp(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M12 5v14M5 12h14"})})}function xp(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 20h9"}),l.jsx("path",{d:"M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"})]})}function Wc(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M3 6h18"}),l.jsx("path",{d:"M8 6V4h8v2"}),l.jsx("path",{d:"M19 6l-1 14H6L5 6"}),l.jsx("path",{d:"M10 11v6M14 11v6"})]})}function Di(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}function yc(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M6 9l6 6 6-6"})})}function Ah(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M15 18l-6-6 6-6"})})}function yp(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M9 18l6-6-6-6"})})}function cy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M3 12a9 9 0 1 0 3-6.7L3 8"}),l.jsx("path",{d:"M3 3v5h5"})]})}function uy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 3v12"}),l.jsx("path",{d:"M7 10l5 5 5-5"}),l.jsx("path",{d:"M5 20h14"})]})}function Ph(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 16V7"}),l.jsx("path",{d:"M8.5 10.5L12 7l3.5 3.5"}),l.jsx("path",{d:"M20 16.5A4.5 4.5 0 0 0 17.5 8h-1.26A6.5 6.5 0 1 0 4 14.5"})]})}function dy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),l.jsx("path",{d:"M16 17l5-5-5-5"}),l.jsx("path",{d:"M21 12H9"})]})}function fy(n){return l.jsxs(Oe,{...n,children:[l.jsx("circle",{cx:"11",cy:"11",r:"7"}),l.jsx("path",{d:"M20 20l-3.5-3.5"})]})}function py(n){return l.jsxs(Oe,{...n,children:[l.jsx("circle",{cx:"12",cy:"12",r:"7"}),l.jsx("path",{d:"M12 2v3M12 19v3M2 12h3M19 12h3"})]})}function So(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M6 9V3h12v6"}),l.jsx("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),l.jsx("rect",{x:"6",y:"14",width:"12",height:"7",rx:"1"})]})}function Vc(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M21 12a9 9 0 0 0-15.5-6.3L3 8"}),l.jsx("path",{d:"M3 3v5h5"}),l.jsx("path",{d:"M3 12a9 9 0 0 0 15.5 6.3L21 16"}),l.jsx("path",{d:"M21 21v-5h-5"})]})}function hy(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M3 12h4l2.5-7 5 14 2.5-7h4"})})}function my(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M4 17l6-6-6-6"}),l.jsx("path",{d:"M12 19h8"})]})}function gy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M22 2L11 13"}),l.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]})}function hl(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),l.jsx("path",{d:"M12 9v4M12 17h.01"})]})}function xy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 3l9 4.5-9 4.5-9-4.5L12 3z"}),l.jsx("path",{d:"M3 12l9 4.5 9-4.5"}),l.jsx("path",{d:"M3 16.5L12 21l9-4.5"})]})}function yy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),l.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"currentColor",stroke:"none"})]})}function vy(n){return l.jsxs(Oe,{...n,children:[l.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"}),l.jsx("path",{d:"M9 4v16"})]})}function by(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"}),l.jsx("path",{d:"M12 12l8-4.5M12 12v9M12 12L4 7.5"})]})}function wy(n){return l.jsxs(Oe,{...n,children:[l.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.2"}),l.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.2"})]})}function Sy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"}),l.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}function ky(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"}),l.jsx("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"}),l.jsx("path",{d:"M14.12 14.12a3 3 0 1 1-4.24-4.24"}),l.jsx("path",{d:"M2 2l20 20"})]})}function Cy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),l.jsx("path",{d:"M9 12l2 2 4-4"})]})}function vc(n){return l.jsxs(Oe,{...n,children:[l.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),l.jsx("path",{d:"M8 21h8M12 17v4"})]})}function Bi(n){return l.jsxs(Oe,{...n,children:[l.jsx("rect",{x:"9",y:"9",width:"13",height:"13",rx:"2"}),l.jsx("path",{d:"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"})]})}function Yn(n){return l.jsx(Oe,{...n,children:l.jsx("path",{d:"M20 6L9 17l-5-5"})})}function Ey(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),l.jsx("circle",{cx:"12",cy:"10",r:"3"})]})}function Gc(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 2v10"}),l.jsx("path",{d:"M18.36 6.64a9 9 0 1 1-12.73 0"})]})}function jy(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M22 12H2"}),l.jsx("path",{d:"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}),l.jsx("circle",{cx:"6",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"}),l.jsx("circle",{cx:"10",cy:"16",r:"0.8",fill:"currentColor",stroke:"none"})]})}function _y(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M5 12.55a11 11 0 0 1 14.08 0"}),l.jsx("path",{d:"M8.53 16.11a6 6 0 0 1 6.95 0"}),l.jsx("circle",{cx:"12",cy:"19.5",r:"0.9",fill:"currentColor",stroke:"none"})]})}function Ny(n){return l.jsxs(Oe,{...n,children:[l.jsx("rect",{x:"6",y:"6",width:"12",height:"12",rx:"2"}),l.jsx("rect",{x:"9.5",y:"9.5",width:"5",height:"5",rx:"0.5"}),l.jsx("path",{d:"M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"})]})}function Ty(n){return l.jsxs(Oe,{...n,children:[l.jsx("path",{d:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"}),l.jsx("path",{d:"M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"})]})}function vp(n){return l.jsxs(Oe,{...n,children:[l.jsx("circle",{cx:"12",cy:"12",r:"9"}),l.jsx("path",{d:"M12 7v5l3 2"})]})}const Ry=bl`
  0% { stroke-dashoffset: 36; }
  100% { stroke-dashoffset: 0; }
`,Iy=E.div`
  min-height: 100vh;
  width: 100%;
  background: ${({theme:n})=>n.colors.bgCanvas};
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    background: ${({theme:n})=>n.colors.bgSurface};
  }
`,$y=E.section`
  background: ${({theme:n})=>n.colors.bgCanvas};
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
`,Ay=E.header`
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
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.02em;
  }

  .brand-org {
    font-size: 0.78rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,Py=E.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 620px;

  h1 {
    font-size: clamp(1.75rem, 2.35vw, 2.35rem);
    font-weight: 700;
    line-height: 1.16;
    letter-spacing: -0.03em;
    color: ${({theme:n})=>n.colors.textPrimary};

    .muted {
      color: ${({theme:n})=>n.colors.textSecondary};
      font-weight: 600;
    }
  }
`,Ly=E.div`
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
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
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .topo-proto {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.brandPrimary};
    background: ${({theme:n})=>n.colors.brandPrimarySubtle};
    padding: 3px 9px;
    border-radius: 999px;
  }
`,Oy=E.div`
  display: grid;
  grid-template-columns: 164px 1fr 196px;
  align-items: center;
  gap: 0;

  @media (max-width: 1120px) {
    grid-template-columns: 146px 1fr 172px;
  }
`,My=E.div`
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderStrong};
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .hub-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${({theme:n})=>n.colors.brandPrimarySubtle};
    color: ${({theme:n})=>n.colors.brandPrimary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .hub-title {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .hub-sub {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.7rem;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,zy=E.svg`
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
    animation: ${Ry} 3.2s linear infinite;
  }
`,Fy=E.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,bc=E.div`
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
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
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
  }

  .ep-icon {
    color: ${({theme:n})=>n.colors.brandPrimary};
    display: inline-flex;
  }

  .ep-tag {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,Dy=E.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  .pillar {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .p-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .p-desc {
    font-size: 0.78rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    line-height: 1.45;
  }
`,By=E.main`
  background: ${({theme:n})=>n.colors.bgSurface};
  border-left: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: 960px) {
    border-left: none;
    padding: 24px 20px 28px;
  }
`,Uy=E.header`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

    .m-title {
      font-size: 0.94rem;
      font-weight: 700;
      color: ${({theme:n})=>n.colors.textPrimary};
      letter-spacing: -0.02em;
    }

    .m-sub {
      font-size: 0.74rem;
      color: ${({theme:n})=>n.colors.textSecondary};
    }
  }
`,Hy=E.div`
  width: 100%;
  max-width: 380px;
  margin: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`,Wy=E.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    font-size: 1.48rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  p {
    font-size: 0.9rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    line-height: 1.5;
  }
`,Vy=E.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,bp=E.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.84rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .input-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    height: 44px;
    padding: ${({$hasToggle:n})=>n?"0 44px 0 13px":"0 13px"};
    border-radius: 8px;
    border: 1px solid ${({theme:n})=>n.colors.borderStrong};
    background: ${({theme:n})=>n.colors.bgSurface};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.95rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;

    &::placeholder {
      color: ${({theme:n})=>n.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:n})=>n.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.14);
    }

    &:disabled {
      background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
      color: ${({theme:n})=>n.colors.textSecondary};
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
    color: ${({theme:n})=>n.colors.textSecondary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;

    &:hover {
      background: ${({theme:n})=>n.colors.bgSurfaceHover};
      color: ${({theme:n})=>n.colors.textPrimary};
    }
  }
`,Gy=E.button`
  margin-top: 4px;
  height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  border: none;
  background: ${({theme:n})=>n.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`,qy=E.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 13px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid ${({theme:n})=>n.colors.status.CRITICAL};
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
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px dashed ${({theme:n})=>n.colors.borderStrong};
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  button {
    align-self: flex-start;
    height: 32px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid ${({theme:n})=>n.colors.borderStrong};
    background: ${({theme:n})=>n.colors.bgSurface};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({theme:n})=>n.colors.bgSurfaceHover};
    }
  }
`;const Yy=E.footer`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding-top: 16px;
  border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .health-row {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .health-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
  }

  .audit-line {
    font-size: 0.74rem;
    color: ${({theme:n})=>n.colors.textMuted};
    line-height: 1.48;
  }
`;function Qy({onAuthenticated:n,sessionNotice:o=""}){const[i,c]=N.useState(""),[d,p]=N.useState(""),[m,y]=N.useState(!1),[g,j]=N.useState(!1),[_,R]=N.useState(""),[A,F]=N.useState("checking"),oe=!1;N.useEffect(()=>{let V=!0;const X=new AbortController;return fetch("/api/health",{signal:X.signal}).then(xe=>xe.ok?xe.json():Promise.reject(new Error("HTTP"))).then(xe=>{V&&F((xe==null?void 0:xe.status)==="ok"?"ok":"down")}).catch(()=>{V&&F("down")}),()=>{V=!1,X.abort()}},[]);async function W(V){V.preventDefault(),R("");const X=i.trim();if(!X||!d){R("Informe seu e-mail e senha para continuar.");return}j(!0);try{await n(X,d)}catch(xe){R((xe==null?void 0:xe.message)||"Não foi possível autenticar. Verifique e-mail e senha.")}finally{j(!1)}}const ae=A==="ok"?{color:"#2D6A4F",label:"Serviço Pulso RMM operacional"}:A==="down"?{color:"#C81E1E",label:"Servidor de API indisponível no momento"}:{color:"#7B857F",label:"Verificando disponibilidade da API..."};return l.jsxs(Iy,{children:[l.jsxs($y,{"aria-label":"Visão geral do Pulso RMM",children:[l.jsxs(Ay,{children:[l.jsxs("div",{className:"brand-left",children:[l.jsx(Hc,{size:28}),l.jsx("span",{className:"brand-name",children:"Pulso RMM"})]}),l.jsx("span",{className:"brand-org",children:"Monitoramento & Gestão de Estações"})]}),l.jsxs(Py,{children:[l.jsxs("h1",{children:["Monitoramento de estações em tempo real."," ",l.jsx("span",{className:"muted",children:"Inventário, telemetria e suporte remoto."})]}),l.jsxs(Ly,{role:"img","aria-label":"Esquema da arquitetura de telemetria entre a central Pulso RMM e estações monitoradas",children:[l.jsxs("div",{className:"topo-head",children:[l.jsx("span",{children:"Arquitetura de comunicação autenticada"}),l.jsx("span",{className:"topo-proto",children:"HMAC-SHA256 · OTA"})]}),l.jsxs(Oy,{children:[l.jsxs(My,{children:[l.jsx("span",{className:"hub-icon",children:l.jsx(Cy,{size:17})}),l.jsx("div",{className:"hub-title",children:"Central TI"}),l.jsx("div",{className:"hub-sub",children:"API · Socket.io"})]}),l.jsxs(zy,{viewBox:"0 0 180 156",preserveAspectRatio:"none","aria-hidden":"true",children:[l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"base-line",d:"M 0 78 L 180 78"}),l.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 130, 180 130"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),l.jsx("path",{className:"pulse-line",d:"M 0 78 L 180 78",style:{animationDelay:"0.9s"}}),l.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 130, 180 130",style:{animationDelay:"1.8s"}})]}),l.jsxs(Fy,{children:[l.jsxs(bc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(vc,{size:14})}),l.jsx("span",{children:"Recepção"})]}),l.jsx("span",{className:"ep-tag",children:"REC"})]}),l.jsxs(bc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(vc,{size:14})}),l.jsx("span",{children:"Consultórios"})]}),l.jsx("span",{className:"ep-tag",children:"CONS"})]}),l.jsxs(bc,{children:[l.jsxs("span",{className:"ep-left",children:[l.jsx("span",{className:"ep-icon",children:l.jsx(vc,{size:14})}),l.jsx("span",{children:"Farmácia"})]}),l.jsx("span",{className:"ep-tag",children:"FARM"})]})]})]})]})]}),l.jsxs(Dy,{children:[l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Telemetria contínua"}),l.jsx("span",{className:"p-desc",children:"Agente Windows nativo em segundo plano sem interromper o atendimento."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Manutenção homologada"}),l.jsx("span",{className:"p-desc",children:"Catálogo de tarefas assinadas por estação e atualizações SHA-256."})]}),l.jsxs("div",{className:"pillar",children:[l.jsx("span",{className:"p-title",children:"Auditoria e LGPD"}),l.jsx("span",{className:"p-desc",children:"Controle por perfil técnico com registro completo das operações."})]})]})]}),l.jsxs(By,{"aria-label":"Autenticação do painel Pulso RMM",children:[l.jsxs(Uy,{children:[l.jsx(Hc,{size:28}),l.jsxs("div",{children:[l.jsx("div",{className:"m-title",children:"Pulso RMM"}),l.jsx("div",{className:"m-sub",children:"Monitoramento & Gestão de Estações"})]})]}),l.jsxs(Hy,{children:[l.jsxs(Wy,{children:[l.jsx("h2",{children:"Entrar no painel"}),l.jsx("p",{children:"Use sua conta autorizada pela equipe de TI."})]}),(_||o)&&l.jsxs(qy,{role:"alert",children:[l.jsx("span",{className:"err-icon",children:l.jsx(hl,{size:16})}),l.jsx("span",{children:_||o})]}),l.jsxs(Vy,{onSubmit:W,noValidate:!0,children:[l.jsxs(bp,{children:[l.jsx("label",{htmlFor:"rmm-login-email",children:"E-mail"}),l.jsx("div",{className:"input-box",children:l.jsx("input",{id:"rmm-login-email",type:"email",autoComplete:"username",placeholder:"nome@dominio.com",value:i,onChange:V=>c(V.target.value),disabled:g,required:!0})})]}),l.jsxs(bp,{$hasToggle:!0,children:[l.jsx("label",{htmlFor:"rmm-login-password",children:"Senha"}),l.jsxs("div",{className:"input-box",children:[l.jsx("input",{id:"rmm-login-password",type:m?"text":"password",autoComplete:"current-password",placeholder:"Digite sua senha",value:d,onChange:V=>p(V.target.value),disabled:g,required:!0}),l.jsx("button",{type:"button",className:"pw-toggle",onClick:()=>y(V=>!V),"aria-label":m?"Ocultar senha":"Exibir senha","aria-pressed":m,disabled:g,children:m?l.jsx(ky,{size:17}):l.jsx(Sy,{size:17})})]})]}),l.jsx(Gy,{type:"submit",disabled:g,children:g?"Validando credenciais...":"Entrar no painel"})]}),oe]}),l.jsxs(Yy,{children:[l.jsxs("div",{className:"health-row",children:[l.jsx("span",{className:"health-dot",style:{background:ae.color}}),l.jsx("span",{children:ae.label})]}),l.jsx("p",{className:"audit-line",children:"Sessões, comandos remotos e alterações de infraestrutura são registrados em trilha de auditoria conforme a LGPD."})]})]})]})}const Ky={B:{id:"B",name:"Institucional Sereno",tagline:"Porcelanato claro, azul institucional e verde vivo",swatches:["#F6F8F3","#CFE3DC","#2E8B74","#1F5F8B"],room:{wallColor:"#F6F8F3",wallCapColor:"#2E6B7A",baseboardColor:"#2C5F73",accentColor:"#E4A11B",floorType:"porcelain",rugColor:"#6FA88F",rugBorderColor:"#EAF2EC",hasRug:!1,rugSize:[2.4,1.5],rugPos:[.5,0,-.2]},lighting:{background:"#E9F0EA",ambient:{intensity:.42,color:"#FFFFFF"},hemisphere:{sky:"#F7FBFF",ground:"#D6E4DC",intensity:.34},key:{intensity:2.15,color:"#FFF6E6"},fill:{intensity:.26,color:"#DCEBF2"}}}};function Xy(){return Ky.B}const wp=[{id:"DIAG",label:"Diagnóstico"},{id:"MAINT",label:"Manutenção"},{id:"SYSTEM",label:"Sistema e periféricos"}],Jy={SYNC_TELEMETRY_NOW:{group:"DIAG",label:"Coletar telemetria",subtitle:"Atualiza CPU, RAM, disco e temperatura",Icon:hy},COLLECT_NETWORK_DIAG:{group:"DIAG",label:"Diagnóstico de rede",subtitle:"IPv4, gateway, DNS e latência local",Icon:_y},CHECK_DISK_HEALTH:{group:"DIAG",label:"Saúde do disco",subtitle:"Integridade física SMART e volume C:",Icon:jy},LIST_TOP_PROCESSES:{group:"DIAG",label:"Top processos",subtitle:"Processos com maior uso de CPU e RAM",Icon:Ny},RESTART_SPOOLER:{group:"MAINT",label:"Reiniciar spooler",subtitle:"Destrava o serviço e a fila de impressão",Icon:So},CLEAR_TEMP_CACHE:{group:"MAINT",label:"Limpar temporários",subtitle:"Remove cache obsoleto sem tocar arquivos",Icon:Ty},FLUSH_DNS_WINSOCK:{group:"MAINT",label:"Limpar cache DNS",subtitle:"Renova a tabela de resolução de nomes",Icon:Vc},UPDATE_AGENT:{group:"SYSTEM",label:"Atualizar agente (OTA)",subtitle:"Baixa, valida SHA-256 e atualiza em silêncio",Icon:Ph},INSTALL_APPROVED_PRINTER:{group:"SYSTEM",label:"Instalar impressora",subtitle:"Mapeia impressora de rede homologada",Icon:So},REBOOT_WORKSTATION:{group:"SYSTEM",label:"Reiniciar estação",subtitle:"Aviso de 30s na tela antes de reiniciar",Icon:Gc}};function fs(n){const o=Jy[n==null?void 0:n.code];return o||{group:(n==null?void 0:n.riskLevel)==="HIGH"?"SYSTEM":"MAINT",label:he((n==null?void 0:n.title)||(n==null?void 0:n.code)||"Tarefa remota"),subtitle:he((n==null?void 0:n.description)||"Comando remoto homologado"),Icon:my}}const Zy=bl`
  from { opacity: 0; }
  to { opacity: 1; }
`,e1=bl`
  from { opacity: 0; transform: translateY(8px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`,uu=bl`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
`,t1={NORMAL:"Online",WARNING:"Atenção",CRITICAL:"Crítico",OFFLINE:"Offline"};function Sp(n){const o=String(n||"2.3.0").trim(),i=o.match(/(\d+\.\d+(?:\.\d+)?)/);return i?`v${i[1]}`:`v${o}`}function Ui(n,o=80,i=92){return n>=i?le.colors.status.CRITICAL:n>=o?le.colors.status.WARNING:le.colors.textPrimary}function Hi(n,o=80,i=92,c=le.colors.brandPrimary){return n>=i?le.colors.status.CRITICAL:n>=o?le.colors.status.WARNING:c}const kp=E.aside`
  width: ${({$collapsed:n})=>n?"296px":"436px"};
  max-height: 100%;
  min-height: 0;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  transition: width 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (max-width: 1120px) {
    width: ${({$collapsed:n})=>n?"268px":"384px"};
  }
`,Cp=E.header`
  flex-shrink: 0;
  padding: 11px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
`,n1=E.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`,r1=E.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`,Ep=E.span`
  font-family: ${({theme:n})=>n.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({theme:n})=>n.colors.textSecondary};
  white-space: nowrap;
`,jp=E.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({$color:n})=>n};
  background: ${({$bgColor:n})=>n||"rgba(30, 36, 32, 0.06)"};
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`,o1=E.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
`,Br=E.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({$danger:n,$active:o,theme:i})=>n?i.colors.status.CRITICAL:o?i.colors.brandPrimary:i.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({$danger:n,theme:o})=>n?"rgba(200, 30, 30, 0.08)":o.colors.bgSurfaceHover};
    color: ${({$danger:n,theme:o})=>n?o.colors.status.CRITICAL:o.colors.textPrimary};
  }

  &:active {
    transform: scale(0.95);
  }
`,_p=E.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({theme:n})=>n.colors.textPrimary};
  line-height: 1.18;
  word-break: break-word;
`,Np=E.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;

  .loc-text {
    font-size: 0.78rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,s1=E.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 5px;
  border: 1px solid
    ${({$open:n,theme:o})=>n?"rgba(45, 106, 79, 0.3)":o.colors.borderSubtle};
  background: ${({$open:n,theme:o})=>n?o.colors.brandPrimarySubtle:"transparent"};
  color: ${({$open:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover {
    background: ${({theme:n})=>n.colors.bgSurfaceHover};
    color: ${({theme:n})=>n.colors.textPrimary};
    border-color: ${({theme:n})=>n.colors.borderStrong};
  }
`,i1=E.select`
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border-radius: 7px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  color: ${({theme:n})=>n.colors.textPrimary};
  border: 1px solid ${({theme:n})=>n.colors.borderStrong};
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({theme:n})=>n.colors.brandPrimary};
    background: ${({theme:n})=>n.colors.bgSurface};
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
  }
`,l1=E.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 9px;
  border-radius: 7px;
  background: ${({$bg:n})=>n};
  font-size: 0.73rem;

  .act-left {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: ${({theme:n})=>n.colors.textPrimary};
    font-weight: 600;
  }

  .act-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$color:n})=>n};
    flex-shrink: 0;
  }

  .act-headline {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-right {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({$color:n})=>n};
    white-space: nowrap;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`,a1=E.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 16px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  background: ${({theme:n})=>n.colors.bgSurface};
`,wc=E.button`
  position: relative;
  height: 34px;
  padding: 0 2px;
  border: none;
  background: transparent;
  color: ${({$active:n,theme:o})=>n?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.78rem;
  font-weight: ${({$active:n})=>n?700:500};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: ${({$active:n,theme:o})=>n?o.colors.brandPrimary:"transparent"};
    transition: background 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .tab-count {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$active:n,$highlight:o})=>n||o?"rgba(45, 106, 79, 0.11)":"rgba(30, 36, 32, 0.06)"};
    color: ${({$active:n,$highlight:o,theme:i})=>n||o?i.colors.brandPrimary:i.colors.textSecondary};
  }
`,c1=E.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,Sc=E.footer`
  flex-shrink: 0;
  padding: 8px 16px 10px;
  border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  background: ${({theme:n})=>n.colors.bgSurface};
`,u1=E.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-bottom: 9px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
`,Wi=E.div`
  padding: 0 10px;
  border-right: 1px solid ${({theme:n})=>n.colors.borderSubtle};
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
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .m-val {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.06rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({$tone:n})=>n};
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
`,d1=E.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  .spark-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .spark-legend {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.66rem;
    color: ${({theme:n})=>n.colors.textSecondary};

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
    color: ${({theme:n})=>n.colors.textMuted};
  }
`,f1=E.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`,Cr=E.div`
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
    color: ${({theme:n})=>n.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
    text-align: right;
    word-break: break-word;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;

    &.mono {
      font-family: ${({theme:n})=>n.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.74rem;
    }
  }
`,kc=E.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  margin: -2px -5px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: ${({$copied:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textPrimary};
  font-family: ${({theme:n})=>n.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .copy-ico {
    display: inline-flex;
    color: ${({$copied:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textMuted};
    opacity: ${({$copied:n})=>n?1:.6};
    transition: opacity 150ms ease, color 150ms ease;
  }

  &:hover {
    background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  }

  &:hover .copy-ico {
    opacity: 1;
    color: ${({theme:n})=>n.colors.brandPrimary};
  }
`,p1=E.div`
  font-size: 0.74rem;
  color: ${({theme:n})=>n.colors.textSecondary};
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px dashed ${({theme:n})=>n.colors.borderStrong};
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  line-height: 1.42;

  strong {
    color: ${({theme:n})=>n.colors.textPrimary};
  }
`,h1=E.button`
  width: 100%;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  background: ${({theme:n})=>n.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${({disabled:n})=>n?"wait":"pointer"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    opacity: 0.55;
  }
`,m1=E.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: ${({theme:n})=>n.colors.textPrimary};

  .lead-meta {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,g1=E.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`,Tp=E.button`
  height: 25px;
  padding: 0 9px;
  border-radius: 6px;
  border: 1px solid
    ${({$active:n,theme:o})=>n?"rgba(45, 106, 79, 0.28)":o.colors.borderSubtle};
  background: ${({$active:n,theme:o})=>n?o.colors.brandPrimarySubtle:o.colors.bgSurface};
  color: ${({$active:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: ${({$active:n})=>n?700:500};
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;

  &:hover {
    color: ${({$active:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textPrimary};
    border-color: ${({$active:n,theme:o})=>n?"rgba(45, 106, 79, 0.35)":o.colors.borderStrong};
  }
`,x1=E.section`
  display: flex;
  flex-direction: column;
  gap: 3px;
`,y1=E.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 2px 4px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  font-size: 0.69rem;
  font-weight: 700;
  color: ${({theme:n})=>n.colors.textSecondary};

  .grp-count {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.65rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textMuted};
  }
`,v1=E.div`
  display: flex;
  flex-direction: column;
`,b1=E.button`
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
  color: ${({disabled:n,theme:o})=>n?o.colors.textMuted:o.colors.textPrimary};
  cursor: ${({disabled:n})=>n?"not-allowed":"pointer"};
  opacity: ${({disabled:n})=>n?.56:1};
  transition: background 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    border-bottom-color: transparent;
  }

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
    border-color: ${({theme:n})=>n.colors.borderSubtle};
  }

  &:hover:not(:disabled) .act-ico {
    background: ${({$risk:n,theme:o})=>n==="HIGH"?"rgba(200, 30, 30, 0.12)":n==="MEDIUM"?"rgba(180, 83, 9, 0.12)":o.colors.brandPrimarySubtle};
    color: ${({$risk:n,theme:o})=>n==="HIGH"?o.colors.status.CRITICAL:n==="MEDIUM"?o.colors.status.WARNING:o.colors.brandPrimary};
  }

  &:hover:not(:disabled) .act-chev {
    color: ${({theme:n})=>n.colors.brandPrimary};
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
    background: ${({$risk:n,theme:o})=>n==="HIGH"?"rgba(200, 30, 30, 0.07)":n==="MEDIUM"?"rgba(180, 83, 9, 0.07)":o.colors.bgSurfaceSubtle};
    color: ${({$risk:n,theme:o})=>n==="HIGH"?o.colors.status.CRITICAL:n==="MEDIUM"?o.colors.status.WARNING:o.colors.textSecondary};
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
    color: ${({theme:n})=>n.colors.textSecondary};
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
    background: ${({$risk:n})=>n==="HIGH"?"rgba(200, 30, 30, 0.08)":"rgba(180, 83, 9, 0.09)"};
    color: ${({$risk:n,theme:o})=>n==="HIGH"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  }

  .act-locked {
    font-size: 0.66rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textMuted};
  }

  .act-busy {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.brandPrimary};

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      animation: ${uu} 1.1s ease-in-out infinite;
    }
  }

  .act-chev {
    color: ${({theme:n})=>n.colors.textMuted};
    display: inline-flex;
    transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1), color 150ms ease;
  }
`,w1=E.div`
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
    background: ${({$tone:n})=>n};
    animation: ${({$pulsing:n})=>n?uu:"none"} 1.2s ease-in-out infinite;
  }

  .le-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .le-title {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-meta {
    font-size: 0.68rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-btn {
    height: 28px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid ${({theme:n})=>n.colors.borderStrong};
    background: ${({theme:n})=>n.colors.bgSurface};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.72rem;
    font-weight: 600;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease;

    &:hover {
      background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
      border-color: ${({theme:n})=>n.colors.brandPrimary};
      color: ${({theme:n})=>n.colors.brandPrimary};
    }
  }
`,S1=E.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
`,k1=E.div`
  margin: auto 0;
  padding: 20px 12px;
  text-align: center;
  color: ${({theme:n})=>n.colors.textSecondary};
  font-size: 0.8rem;
  line-height: 1.5;

  strong {
    display: block;
    color: ${({theme:n})=>n.colors.textPrimary};
    margin-bottom: 4px;
    font-size: 0.84rem;
  }
`,C1=E.div`
  display: flex;
  flex-direction: column;
  align-items: ${({$fromTi:n})=>n?"flex-end":"flex-start"};
`,E1=E.div`
  max-width: 86%;
  padding: 8px 11px;
  border-radius: ${({$fromTi:n})=>n?"11px 11px 3px 11px":"11px 11px 11px 3px"};
  background: ${({$fromTi:n})=>n?"#E9F4EE":"#F3F5F2"};
  border: 1px solid
    ${({$fromTi:n})=>n?"rgba(45, 106, 79, 0.16)":"rgba(30, 36, 32, 0.08)"};
  font-size: 0.8rem;
  line-height: 1.44;
  color: ${({theme:n})=>n.colors.textPrimary};
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
    color: ${({$fromTi:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textPrimary};
  }

  .cb-time {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.64rem;
    color: ${({theme:n})=>n.colors.textMuted};
  }
`,j1=E.form`
  display: flex;
  gap: 6px;

  input {
    flex: 1;
    height: 36px;
    padding: 0 11px;
    border-radius: 8px;
    background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
    border: 1px solid ${({theme:n})=>n.colors.borderStrong};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.8rem;
    transition: border-color 140ms ease, background 140ms ease;

    &::placeholder {
      color: ${({theme:n})=>n.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:n})=>n.colors.brandPrimary};
      background: ${({theme:n})=>n.colors.bgSurface};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  button {
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: none;
    background: ${({theme:n})=>n.colors.brandPrimary};
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
      background: ${({theme:n})=>n.colors.brandPrimaryHover};
    }

    &:active:not(:disabled) {
      transform: scale(0.985);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
`,Vi=E.div`
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
  animation: ${Zy} 160ms ease-out;
`,Gi=E.div`
  width: 100%;
  max-width: 520px;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: 14px;
  padding: 20px 22px 18px;
  box-shadow: 0 20px 44px -12px rgba(24, 32, 27, 0.22), 0 4px 12px rgba(24, 32, 27, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({theme:n})=>n.colors.textPrimary};
  animation: ${e1} 190ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`,qi=E.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

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
    color: ${({theme:n})=>n.colors.textPrimary};
    line-height: 1.25;
  }

  .m-sub {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 0.74rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-top: 3px;

    .m-mono {
      font-family: ${({theme:n})=>n.fonts.mono};
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
`,Yi=E.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({$tone:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.09)":n==="warning"?"rgba(180, 83, 9, 0.1)":o.colors.brandPrimarySubtle};
  color: ${({$tone:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:n==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
`,_1=E.ol`
  list-style: none;
  margin: 0;
  padding: 9px 12px;
  border-radius: 9px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`,Cc=E.li`
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
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.65rem;
    font-weight: 700;
    background: ${({$state:n,theme:o})=>n==="done"?o.colors.brandPrimary:n==="error"?o.colors.status.CRITICAL:n==="active"?"rgba(45, 106, 79, 0.15)":"rgba(30, 36, 32, 0.08)"};
    color: ${({$state:n,theme:o})=>n==="done"||n==="error"?"#FFFFFF":n==="active"?o.colors.brandPrimary:o.colors.textMuted};
    animation: ${({$state:n})=>n==="active"?uu:"none"} 1.25s ease-in-out infinite;
  }

  .st-lbl {
    font-size: 0.72rem;
    font-weight: ${({$state:n})=>n==="pending"?500:600};
    color: ${({$state:n,theme:o})=>n==="error"?o.colors.status.CRITICAL:n==="pending"?o.colors.textMuted:o.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Rp=E.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px 12px;
  border-radius: 9px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  .ts-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 10px;
    border-right: 1px solid ${({theme:n})=>n.colors.borderSubtle};
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
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .ts-v {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.77rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Ip=E.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 9px;
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-left: 3px solid
    ${({$tone:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:n==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
  background: ${({$tone:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.05)":n==="warning"?"rgba(180, 83, 9, 0.06)":o.colors.bgSurfaceSubtle};

  .on-ico {
    margin-top: 1px;
    flex-shrink: 0;
    color: ${({$tone:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:n==="warning"?o.colors.status.WARNING:o.colors.brandPrimary};
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
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .on-msg {
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${({theme:n})=>n.colors.textSecondary};
    word-break: break-word;
  }
`,N1=E.dl`
  margin: 0;
  padding: 4px 14px;
  border-radius: 9px;
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  max-height: 260px;
  overflow-y: auto;
`,T1=E.div`
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
    color: ${({theme:n})=>n.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
    text-align: right;
    word-break: break-word;
  }
`,R1=E.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 260px;
  overflow-y: auto;
`,I1=E.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid
    ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:o.colors.borderSubtle};
  background: ${({$selected:n,theme:o})=>n?"rgba(45, 106, 79, 0.06)":o.colors.bgSurface};
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;

  &:hover {
    border-color: ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:o.colors.borderStrong};
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
    background: ${({$selected:n,theme:o})=>n?o.colors.brandPrimarySubtle:o.colors.bgSurfaceSubtle};
    color: ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textSecondary};
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
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .pr-tag {
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 0.64rem;
    font-weight: 600;
    background: ${({$source:n})=>n==="NETWORK"?"rgba(29, 78, 216, 0.09)":n==="INSTALLED"?"rgba(45, 106, 79, 0.1)":"rgba(180, 83, 9, 0.1)"};
    color: ${({$source:n})=>n==="NETWORK"?"#1D4ED8":n==="INSTALLED"?"#2D6A4F":"#92400E"};
  }

  .pr-ip {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    color: ${({theme:n})=>n.colors.textSecondary};
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
      ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:o.colors.borderStrong};
    background: ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:"transparent"};
    color: #ffffff;
  }
`,Ec=E.div`
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid
    ${({$tone:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  background: ${({$tone:n})=>n==="danger"?"rgba(200, 30, 30, 0.06)":"rgba(180, 83, 9, 0.07)"};
  color: ${({$tone:n})=>n==="danger"?"#991B1B":"#92400E"};
  font-size: 0.79rem;
  line-height: 1.48;
`,Qi=E.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  .mf-left,
  .mf-right {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`,Qn=E.button`
  height: 35px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 0.79rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: ${({disabled:n})=>n?"not-allowed":"pointer"};
  border: 1px solid
    ${({$variant:n,theme:o})=>n==="primary"?o.colors.brandPrimary:n==="danger"?o.colors.status.CRITICAL:n==="ghost"?"transparent":o.colors.borderStrong};
  background: ${({$variant:n,theme:o})=>n==="primary"?o.colors.brandPrimary:n==="danger"?o.colors.status.CRITICAL:n==="ghost"?"transparent":o.colors.bgSurface};
  color: ${({$variant:n,$copied:o,theme:i})=>n==="primary"||n==="danger"?"#FFFFFF":o?i.colors.brandPrimary:i.colors.textPrimary};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms ease,
    color 150ms ease,
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({$variant:n,theme:o})=>n==="primary"?o.colors.brandPrimaryHover:n==="danger"?"#B41A1A":o.colors.bgSurfaceSubtle};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.45;
  }
`;function ps(n,o=!0){const i=Math.max(0,Math.floor(Number(n||0)));if(i<60)return`${i}s`;const c=Math.floor(i/60),d=i%60;if(c<60)return o&&d>0?`${c}m ${d}s`:`${c} min`;const p=Math.floor(c/60),m=c%60;if(p<24)return m>0?`${p}h ${m}m`:`${p}h`;const y=Math.floor(p/24),g=p%24;return g>0?`${y}d ${g}h`:`${y} dia(s)`}function $1(n){const o=he(n||"").trim();if(!o)return{structured:!1,items:[],message:""};const i=o.split("|").map(p=>p.trim()).filter(Boolean),c=[];let d=i.length>=2;for(const p of i){const m=p.indexOf(":");m>0&&m<36&&m<p.length-1?c.push({label:p.slice(0,m).trim(),value:p.slice(m+1).trim()}):d=!1}return d&&c.length>=2?{structured:!0,items:c,message:o}:{structured:!1,items:[],message:o}}function $p(n){return n==="FAILED"?{label:"Falha",tone:"danger",color:le.colors.status.CRITICAL,bg:le.colors.statusBg.CRITICAL,lead:"A tarefa retornou erro durante a execução"}:n==="EXPIRED"?{label:"Expirado",tone:"danger",color:le.colors.status.CRITICAL,bg:le.colors.statusBg.CRITICAL,lead:"Tempo limite atingido sem resposta do agente"}:n==="RUNNING"?{label:"Executando",tone:"brand",color:le.colors.brandPrimary,bg:"rgba(45, 106, 79, 0.1)",lead:"Enviando ordem assinada ao agente Windows"}:n==="DISPATCHED"||n==="PENDING"?{label:"Na fila do agente",tone:"warning",color:le.colors.status.WARNING,bg:le.colors.statusBg.WARNING,lead:"Aguardando retorno real do equipamento"}:{label:"Concluído",tone:"ok",color:le.colors.status.NORMAL,bg:le.colors.statusBg.NORMAL,lead:"Execução concluída com sucesso"}}function A1({telemetryHistory:n=[]}){const o=Array.isArray(n)&&n.length>=2,{cpuPath:i,cpuAreaPath:c,ramPath:d,lastCpuPt:p}=N.useMemo(()=>{if(!o)return{cpuPath:"",cpuAreaPath:"",ramPath:"",lastCpuPt:null};const m=n.slice(0,14).reverse(),y=400,g=36,j=(y-6)/Math.max(1,m.length-1),_=ae=>m.map((V,X)=>{const xe=Math.min(100,Math.max(0,Number(V[ae]||0)));return{x:Number((X*j+2).toFixed(1)),y:Number((g-xe/100*(g-8)-4).toFixed(1))}}),R=_("cpu_usage_pct"),A=_("ram_usage_pct"),F=ae=>ae.map((V,X)=>`${X===0?"M":"L"}${V.x},${V.y}`).join(" "),oe=F(R),W=`${oe} L${R[R.length-1].x},${g} L${R[0].x},${g} Z`;return{cpuPath:oe,cpuAreaPath:W,ramPath:F(A),lastCpuPt:R[R.length-1]}},[o,n]);return l.jsxs(d1,{children:[l.jsxs("div",{className:"spark-head",children:[l.jsxs("span",{children:["Histórico de uso (",n.length,")"]}),l.jsxs("div",{className:"spark-legend",children:[l.jsxs("span",{children:[l.jsx("i",{style:{background:le.colors.brandPrimary}})," CPU"]}),l.jsxs("span",{children:[l.jsx("i",{style:{background:le.colors.status.OFFLINE}})," RAM"]})]})]}),o?l.jsxs("svg",{width:"100%",height:"36",viewBox:"0 0 400 36",preserveAspectRatio:"xMidYMid meet",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:"pulsoCpuGrad",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:"#2D6A4F",stopOpacity:"0.2"}),l.jsx("stop",{offset:"100%",stopColor:"#2D6A4F",stopOpacity:"0.01"})]})}),l.jsx("line",{x1:"0",y1:"12",x2:"400",y2:"12",stroke:"rgba(30,36,32,0.06)"}),l.jsx("line",{x1:"0",y1:"24",x2:"400",y2:"24",stroke:"rgba(30,36,32,0.06)"}),l.jsx("path",{d:c,fill:"url(#pulsoCpuGrad)"}),l.jsx("path",{d,fill:"none",stroke:"#64748B",strokeWidth:"1.4",strokeDasharray:"3 2"}),l.jsx("path",{d:i,fill:"none",stroke:"#2D6A4F",strokeWidth:"1.9"}),p&&l.jsx("circle",{cx:p.x,cy:p.y,r:"3",fill:"#2D6A4F"})]}):l.jsx("span",{className:"spark-empty",children:"Aguardando ao menos 2 leituras reais para traçar a série temporal."})]})}function P1({diagnostics:n,units:o=[],chatMessages:i=[],taskCatalog:c=[],currentUser:d,onDispatchTask:p,onLoadPrinters:m,onRefreshTelemetryNow:y,onUpdateMachineAgent:g,onSendMessage:j,onUpdateLocation:_,onDeleteMachine:R,onFocusCamera:A}){var Bt,Qe;const[F,oe]=N.useState(null),[W,ae]=N.useState(!1),[V,X]=N.useState(""),[xe,Te]=N.useState(!1),[Re,fe]=N.useState(null),[H,de]=N.useState(null),[We,J]=N.useState(null),[ne,ee]=N.useState("ALL"),[te,Ne]=N.useState(!1),[Ce,Me]=N.useState("DIAG"),[Ee,O]=N.useState(!1),[Z,M]=N.useState(null),[b,T]=N.useState(Date.now()),[q,Y]=N.useState(null),[ve,ge]=N.useState({open:!1,task:null}),[Se,Q]=N.useState(!1),ke=N.useRef(null),_e=N.useRef(null),yt=N.useRef(0),Kt=N.useRef(0);function pt(){Kt.current=yt.current,de(null)}N.useEffect(()=>{const $=setInterval(()=>T(Date.now()),1e3);return()=>clearInterval($)},[]),N.useEffect(()=>()=>{_e.current&&clearTimeout(_e.current)},[]);const kt=!!(H||q!=null&&q.open||ve.open||Se);N.useEffect(()=>{if(!kt)return;function $(K){K.key==="Escape"&&(H?pt():q!=null&&q.open?Y(null):ve.open?ge({open:!1,task:null}):Se&&Q(!1))}return window.addEventListener("keydown",$),()=>window.removeEventListener("keydown",$)},[kt,H,q==null?void 0:q.open,ve.open,Se]),N.useEffect(()=>{Ce==="CHAT"&&ke.current&&(ke.current.scrollTop=ke.current.scrollHeight)},[i.length,Ce]);const Nn=((Bt=n==null?void 0:n.machine)==null?void 0:Bt.id)||null;N.useEffect(()=>{O(!1),J(null)},[Nn]);const Be=((Qe=n==null?void 0:n.tasks)==null?void 0:Qe[0])||null;N.useEffect(()=>{if(!(!Be||!H)&&(H.taskId===Be.task_id||H.taskCode===Be.task_code&&H.status==="RUNNING")&&Be.output_summary){const $={...H,taskId:Be.task_id,status:Be.status||"COMPLETED",summary:he(Be.output_summary),timestamp:new Date(Be.completed_at||Be.issued_at||Date.now()).toLocaleTimeString("pt-BR")};de($),J($),fe({type:"ok",text:`${H.title}: ${he(Be.output_summary)}`})}},[Be==null?void 0:Be.task_id,Be==null?void 0:Be.status,Be==null?void 0:Be.output_summary]);function Ve($,K){var Le;const me=String(K||"").trim();me&&((Le=navigator==null?void 0:navigator.clipboard)!=null&&Le.writeText&&navigator.clipboard.writeText(me).catch(()=>{}),M($),_e.current&&clearTimeout(_e.current),_e.current=setTimeout(()=>M(null),1800))}const I=(n==null?void 0:n.machine)||null;if(!I)return l.jsx(kp,{$collapsed:te,"aria-label":"Painel de diagnóstico da estação",children:l.jsxs(Cp,{style:{borderBottom:"none"},children:[l.jsx(Ep,{children:"Aguardando agentes"}),l.jsx(_p,{children:"Nenhuma estação selecionada"}),l.jsx(Np,{children:l.jsx("span",{className:"loc-text",style:{whiteSpace:"normal"},children:"Clique em um equipamento na maquete ou instale o Agente Windows para iniciar o monitoramento."})})]})});const{tasks:Lt=[],telemetry:Ot=[],telemetryHistory:ut=[]}=n,tt=Ot.length>0?Ot:ut,nt=tt[0]||null,Xt=Number(I.cpu_usage_pct)>0?Number(I.cpu_usage_pct):Number((nt==null?void 0:nt.cpu_usage_pct)||0),on=Number(I.ram_usage_pct)>0?Number(I.ram_usage_pct):Number((nt==null?void 0:nt.ram_usage_pct)||0),sn=Number(I.disk_usage_pct)>0?Number(I.disk_usage_pct):Number((nt==null?void 0:nt.disk_usage_pct)||0),lt=Number(I.temperature_c)>0?Number(I.temperature_c):Number((nt==null?void 0:nt.temperature_c)||0),Tn=le.colors.status[I.health_status]||le.colors.status.NORMAL,Zn=le.colors.statusBg[I.health_status]||"rgba(30, 36, 32, 0.06)",Jt=Math.max(0,Number(I.idle_seconds||0)),Dt=I.health_status==="OFFLINE",G=I.last_seen_at?Math.max(0,Math.floor((b-new Date(I.last_seen_at).getTime())/1e3)):0,at=I.last_seen_at?Math.max(0,Math.floor((b-new Date(I.last_seen_at).getTime())/1e3)):0,ln=!Dt&&Jt>0?Jt+Math.min(at,3):Jt,To=xh(I.agent_version,"2.3.0"),er=ps(I.uptime_seconds||0,!1),an=Dt?G>=86400?{badge:"Inativo >24h",alertIcon:!0,color:le.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Desligado há ${ps(G)}`}:{badge:"Offline",alertIcon:!1,color:le.colors.status.OFFLINE,bg:le.colors.bgSurfaceSubtle,headline:`Desligado há ${ps(G)}`}:ln>=86400?{badge:"Inativo >24h",alertIcon:!0,color:le.colors.status.CRITICAL,bg:"rgba(200, 30, 30, 0.06)",headline:`Sem interação há ${ps(ln)}`}:To?{badge:Sp(I.agent_version||"2.2.0"),alertIcon:!1,color:le.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.07)",headline:"Agente desatualizado · atualização recomendada"}:ln<180?{badge:`Ligado ${er}`,alertIcon:!1,color:le.colors.status.NORMAL,bg:le.colors.bgSurfaceSubtle,headline:"Em uso ativo agora"}:{badge:`Ligado ${er}`,alertIcon:!1,color:le.colors.status.WARNING,bg:"rgba(180, 83, 9, 0.06)",headline:`Ocioso há ${ps(ln)}`};async function tr(){ae(!0),fe(null);try{const $=await y(I.id);fe({type:"ok",text:$.message||"Telemetria atualizada em tempo real."})}catch($){fe({type:"err",text:`Falha na coleta: ${$.message}`})}finally{ae(!1)}}async function nr($){if($.preventDefault(),!(!V.trim()||!j)){Te(!0);try{await j(I.id,V.trim()),fe({type:"ok",text:`Mensagem enviada para ${I.hostname}.`}),X("")}catch(K){fe({type:"err",text:`Falha ao enviar mensagem: ${K.message}`})}finally{Te(!1)}}}async function C($){const K=$.target.value;if(!K||!_)return;const[me,Le]=K.split(":").map(Number);if(!(!me||!Le))try{await _(I.id,{unitId:me,sectorId:Le}),O(!1),fe({type:"ok",text:"Localização da estação atualizada."})}catch(vt){fe({type:"err",text:`Erro ao mover estação: ${vt.message}`})}}async function re($){if($.code==="INSTALL_APPROVED_PRINTER"){B($);return}if($.code==="REBOOT_WORKSTATION"){ge({open:!0,task:$});return}await P($)}async function P($,K={}){var Ht,xn;const Le=fs($).label||he($.title),vt=++yt.current,Ct=ot=>{J(ot),Kt.current!==vt&&de(ot)};oe($.code),fe({type:"busy",text:`Executando "${Le}" em ${I.hostname}...`});const Ut={taskId:null,taskCode:$.code,title:Le,status:"RUNNING",summary:`Enviando "${Le}" para o Agente Windows (${I.ip_address})...`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:$,paramsRef:K};de(Ut),J(Ut);try{if($.code==="SYNC_TELEMETRY_NOW"&&y){const Rn=await y(I.id),rr=`Estação: ${I.hostname} | IPv4: ${I.ip_address} | CPU: ${Xt.toFixed(1)}% | RAM: ${on.toFixed(1)}% | Disco: ${sn.toFixed(1)}% | Temperatura: ${lt>0?`${lt.toFixed(1)}°C`:"N/D"}`;fe({type:"ok",text:Rn.message||rr}),Ct({taskId:`sync_${Date.now().toString().slice(-5)}`,taskCode:$.code,title:Le,status:"COMPLETED",summary:rr,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:$,paramsRef:K});return}if($.code==="UPDATE_AGENT"&&g){const rr=(await g(I.id)).message||"Atualização OTA silenciosa despachada para o computador.";fe({type:"ok",text:`${Le}: ${rr}`}),Ct({taskId:`ota_${Date.now().toString().slice(-5)}`,taskCode:$.code,title:Le,status:"COMPLETED",summary:rr,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:$,paramsRef:K});return}const ot=await p({machineId:I.id,taskCode:$.code,parameters:K}),Nr=((Ht=ot==null?void 0:ot.task)==null?void 0:Ht.status)||"DISPATCHED",Ts=Nr==="DISPATCHED"||Nr==="PENDING";fe({type:Ts?"busy":Nr==="FAILED"?"err":"ok",text:Ts?`Ordem enfileirada para ${I.hostname} (aguardando execução real do agente).`:`Retorno de ${I.hostname}: ${he(((xn=ot==null?void 0:ot.task)==null?void 0:xn.output_summary)||Nr)}`}),ot!=null&&ot.task&&Ct({taskId:ot.task.task_id,taskCode:ot.task.task_code,title:Le,status:Nr,summary:he(ot.task.output_summary)||"Ordem autenticada na fila do Agente Windows. O retorno real aparecerá automaticamente assim que a estação concluir a tarefa (TTL 120s).",timestamp:new Date(ot.task.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:$,paramsRef:K})}catch(ot){fe({type:"err",text:`Falha: ${ot.message}`}),Ct({taskId:null,taskCode:$.code,title:Le,status:"FAILED",summary:`Erro ao despachar comando: ${ot.message}`,timestamp:new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}),taskRef:$,paramsRef:K})}finally{oe(null)}}async function B($){Y({open:!0,task:$,loading:!0,printers:[],selectedId:null,error:null});try{const K=m?await m(I.unit_id,I.id):[];Y(me=>{var Le;return me&&{...me,loading:!1,printers:K,selectedId:((Le=K[0])==null?void 0:Le.id)??null,error:K.length?null:"Nenhuma impressora encontrada na rede desta estação. Verifique se o agente já enviou um heartbeat com a descoberta."}})}catch(K){const me=String((K==null?void 0:K.message)||""),Le=/Rota n[ãa]o encontrada|404/i.test(me);Y(vt=>vt&&{...vt,loading:!1,error:Le?"Servidor desatualizado: a rota /api/printers não existe no backend em execução.":`Falha ao carregar impressoras: ${me}`})}}async function ye(){if(!q)return;const $=q.printers.find(me=>me.id===q.selectedId);if(!$)return;const K=q.task;Y(null),await P(K,{printer_ip:$.ip_address,printer_name:$.name})}async function qe(){const $=ve.task;ge({open:!1,task:null}),$&&await P($)}const Pe=o.length>0&&!!_&&(d==null?void 0:d.role)!=="VIEWER";return l.jsxs(l.Fragment,{children:[l.jsxs(kp,{$collapsed:te,"aria-label":"Painel inspetor do computador",children:[l.jsxs(Cp,{children:[l.jsxs(n1,{children:[l.jsxs(r1,{children:[l.jsxs(Ep,{children:["#",I.id," · ",Sp(I.agent_version)]}),l.jsxs(jp,{$color:Tn,$bgColor:Zn,children:[l.jsx("span",{className:"dot"}),t1[I.health_status]||I.health_status]})]}),l.jsxs(o1,{children:[l.jsx(Br,{type:"button",onClick:A,title:"Focar câmera nesta estação","aria-label":"Focar câmera nesta estação",children:l.jsx(py,{size:15})}),l.jsx(Br,{type:"button",onClick:()=>Ne($=>!$),title:te?"Expandir painel":"Recolher painel","aria-label":te?"Expandir painel":"Recolher painel",children:te?l.jsx(Ah,{size:15}):l.jsx(yp,{size:15})}),R&&(d==null?void 0:d.role)!=="VIEWER"&&l.jsx(Br,{type:"button",$danger:!0,onClick:()=>Q(!0),title:"Remover equipamento do painel","aria-label":"Remover equipamento do painel",children:l.jsx(Wc,{size:15})})]})]}),l.jsxs("div",{children:[l.jsx(_p,{children:he(I.hostname)}),l.jsxs(Np,{children:[l.jsxs("span",{className:"loc-text",title:`${he(I.unit_name)} · ${he(I.sector_name)}`,children:[he(I.unit_name)," · ",he(I.sector_name)]}),Pe&&!te&&l.jsxs(s1,{type:"button",$open:Ee,onClick:()=>O($=>!$),"aria-expanded":Ee,title:"Mover estação para outra unidade ou setor",children:[l.jsx(Ey,{size:11}),l.jsx("span",{children:Ee?"Fechar":"Mover"})]})]})]}),Ee&&Pe&&!te&&l.jsx(i1,{"aria-label":"Selecionar nova unidade e setor da estação",value:`${I.unit_id}:${I.sector_id}`,onChange:C,children:o.map($=>($.sectors||[]).map(K=>l.jsxs("option",{value:`${$.id}:${K.id}`,children:[he($.name)," — ",he(K.name)]},`${$.id}:${K.id}`)))}),l.jsxs(l1,{$bg:an.bg,$color:an.color,children:[l.jsxs("span",{className:"act-left",children:[l.jsx("span",{className:"act-dot"}),l.jsx("span",{className:"act-headline",children:an.headline})]}),l.jsxs("span",{className:"act-right",children:[an.alertIcon&&l.jsx(hl,{size:12}),l.jsx("span",{children:an.badge})]})]})]}),!te&&l.jsxs(a1,{role:"tablist","aria-label":"Abas do inspetor de estação",children:[l.jsx(wc,{type:"button",role:"tab","aria-selected":Ce==="DIAG",$active:Ce==="DIAG",onClick:()=>Me("DIAG"),children:l.jsx("span",{children:"Visão geral"})}),l.jsxs(wc,{type:"button",role:"tab","aria-selected":Ce==="ACTIONS",$active:Ce==="ACTIONS",onClick:()=>Me("ACTIONS"),children:[l.jsx("span",{children:"Ações"}),l.jsx("span",{className:"tab-count",children:c.length})]}),j&&l.jsxs(wc,{type:"button",role:"tab","aria-selected":Ce==="CHAT",$active:Ce==="CHAT",$highlight:i.length>0,onClick:()=>Me("CHAT"),children:[l.jsx("span",{children:"Chat"}),l.jsx("span",{className:"tab-count",children:i.length})]})]}),l.jsxs(c1,{ref:Ce==="CHAT"?ke:null,children:[(te||Ce==="DIAG")&&l.jsxs(l.Fragment,{children:[l.jsxs(u1,{children:[l.jsxs(Wi,{$tone:Ui(Xt,80,92),children:[l.jsx("span",{className:"m-lbl",children:"CPU"}),l.jsxs("span",{className:"m-val",children:[Xt.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,Xt)}%`,background:Hi(Xt,80,92)}})})]}),l.jsxs(Wi,{$tone:Ui(on,80,92),children:[l.jsx("span",{className:"m-lbl",children:"RAM"}),l.jsxs("span",{className:"m-val",children:[on.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,on)}%`,background:Hi(on,80,92,le.colors.brandPrimaryLight)}})})]}),l.jsxs(Wi,{$tone:Ui(sn,82,92),children:[l.jsx("span",{className:"m-lbl",children:"Disco"}),l.jsxs("span",{className:"m-val",children:[sn.toFixed(0),"%"]}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${Math.min(100,sn)}%`,background:Hi(sn,82,92,le.colors.status.OFFLINE)}})})]}),l.jsxs(Wi,{$tone:lt>0?Ui(lt,75,85):le.colors.textMuted,children:[l.jsx("span",{className:"m-lbl",children:"Temp."}),l.jsx("span",{className:"m-val",children:lt>0?`${lt.toFixed(0)}°C`:"N/D"}),l.jsx("div",{className:"m-track",children:l.jsx("i",{style:{width:`${lt>0?Math.min(100,lt/95*100):0}%`,background:Hi(lt,75,85,le.colors.brandPrimaryLight)}})})]})]}),Dt&&l.jsxs(p1,{children:[l.jsx("strong",{children:"Equipamento desconectado."})," Último contato em"," ",I.last_seen_at?new Date(I.last_seen_at).toLocaleString("pt-BR"):"horário anterior","."]}),!te&&l.jsxs(l.Fragment,{children:[l.jsx(A1,{telemetryHistory:tt}),l.jsxs(f1,{children:[l.jsxs(Cr,{children:[l.jsx("dt",{children:"Endereço IP"}),l.jsx("dd",{className:"mono",children:l.jsxs(kc,{type:"button",$copied:Z==="ip",onClick:()=>Ve("ip",I.ip_address),title:"Copiar endereço IPv4",children:[l.jsx("span",{children:I.ip_address||"0.0.0.0"}),l.jsx("span",{className:"copy-ico",children:Z==="ip"?l.jsx(Yn,{size:13}):l.jsx(Bi,{size:12})})]})})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Endereço MAC"}),l.jsx("dd",{className:"mono",children:I.mac_address?l.jsxs(kc,{type:"button",$copied:Z==="mac",onClick:()=>Ve("mac",I.mac_address),title:"Copiar endereço MAC",children:[l.jsx("span",{children:I.mac_address}),l.jsx("span",{className:"copy-ico",children:Z==="mac"?l.jsx(Yn,{size:13}):l.jsx(Bi,{size:12})})]}):l.jsx("span",{style:{color:le.colors.textMuted},children:"Não informado"})})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Spooler de impressão"}),l.jsxs("dd",{style:{color:I.spooler_running?le.colors.status.NORMAL:le.colors.status.CRITICAL},children:[l.jsx(So,{size:13}),l.jsx("span",{children:I.spooler_running?"Ativo":"Parado"})]})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Equipamento"}),l.jsxs("dd",{children:[he(I.manufacturer||"N/D")," ",he(I.model||"")]})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Serial"}),l.jsx("dd",{className:"mono",children:I.serial_number?l.jsxs(kc,{type:"button",$copied:Z==="serial",onClick:()=>Ve("serial",I.serial_number),title:`Copiar serial (confiança ${I.identity_confidence||"LOW"})`,children:[l.jsx("span",{children:I.serial_number}),l.jsx("span",{style:{color:le.colors.textMuted,fontSize:"0.68rem"},children:I.identity_confidence||"LOW"}),l.jsx("span",{className:"copy-ico",children:Z==="serial"?l.jsx(Yn,{size:13}):l.jsx(Bi,{size:12})})]}):l.jsx("span",{style:{color:le.colors.textMuted},children:"Não informado"})})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Processador"}),l.jsx("dd",{children:he(I.cpu_model||I.processor||"Não informado")})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Memória e disco"}),l.jsxs("dd",{className:"mono",children:[(Number(I.ram_total_mb||8192)/1024).toFixed(0)," GB ·"," ",I.disk_total_gb||0," GB ",I.disk_type||"N/D"]})]}),l.jsxs(Cr,{children:[l.jsx("dt",{children:"Sistema"}),l.jsx("dd",{children:he(I.os_version||"Windows")})]})]})]})]}),!te&&Ce==="ACTIONS"&&(()=>{const $=wp.map(K=>({...K,items:c.filter(me=>fs(me).group===K.id)})).filter(K=>K.items.length>0&&(ne==="ALL"||ne===K.id));return l.jsxs(l.Fragment,{children:[l.jsxs(m1,{children:[l.jsx("span",{children:"Catálogo homologado"}),l.jsx("span",{className:"lead-meta",children:"HMAC-SHA256"})]}),l.jsxs(g1,{role:"group","aria-label":"Filtrar ações por categoria",children:[l.jsxs(Tp,{type:"button",$active:ne==="ALL",onClick:()=>ee("ALL"),children:["Todas (",c.length,")"]}),wp.map(K=>l.jsx(Tp,{type:"button",$active:ne===K.id,onClick:()=>ee(K.id),children:K.id==="SYSTEM"?"Sistema":K.label},K.id))]}),$.map(K=>l.jsxs(x1,{children:[l.jsxs(y1,{children:[l.jsx("span",{children:K.label}),l.jsx("span",{className:"grp-count",children:K.items.length})]}),l.jsx(v1,{children:K.items.map(me=>{const Le=me.permittedForCurrentUser,vt=F===me.code,Ct=fs(me),Ut=Ct.Icon,Ht=me.riskLevel==="MEDIUM"||me.riskLevel==="HIGH";return l.jsxs(b1,{type:"button",$risk:me.riskLevel,disabled:!Le||vt,onClick:()=>re(me),title:he(me.description),children:[l.jsx("span",{className:"act-ico",children:l.jsx(Ut,{size:15})}),l.jsxs("span",{className:"act-copy",children:[l.jsx("span",{className:"act-title",children:Ct.label}),l.jsx("span",{className:"act-sub",children:Ct.subtitle})]}),l.jsx("span",{className:"act-trail",children:Le?vt?l.jsxs("span",{className:"act-busy",children:[l.jsx("i",{}),"Enviando"]}):l.jsxs(l.Fragment,{children:[Ht&&l.jsx("span",{className:"act-risk-pill",children:qg[me.riskLevel]||me.riskLevel}),l.jsx("span",{className:"act-chev",children:l.jsx(yp,{size:14})})]}):l.jsx("span",{className:"act-locked",children:"Restrito"})})]},me.code)})})]},K.id))]})})(),!te&&Ce==="CHAT"&&j&&l.jsx(S1,{children:i.length===0?l.jsxs(k1,{children:[l.jsx("strong",{children:"Nenhuma mensagem nesta estação"}),"Envie uma mensagem abaixo para abrir o chat diretamente na tela do usuário logado."]}):i.slice(-40).map($=>{const K=$.direction==="SERVER_TO_CLIENT",me=$.created_at?new Date($.created_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";return l.jsx(C1,{$fromTi:K,children:l.jsxs(E1,{$fromTi:K,children:[l.jsxs("div",{className:"cb-head",children:[l.jsx("span",{className:"cb-sender",children:he($.sender)}),me&&l.jsx("span",{className:"cb-time",children:me})]}),l.jsx("div",{children:he($.message)})]})},$.id)})})]}),!te&&Ce==="DIAG"&&l.jsx(Sc,{children:l.jsxs(h1,{type:"button",onClick:tr,disabled:W,children:[l.jsx(Vc,{size:14}),l.jsx("span",{children:W?"Atualizando telemetria...":"Atualizar telemetria agora"})]})}),!te&&Ce==="ACTIONS"&&(()=>{const $=Lt[0]||null,K=We||($?{taskId:$.task_id,taskCode:$.task_code,title:fs({code:$.task_code,title:$.task_code}).label,status:$.status||"COMPLETED",summary:he($.output_summary||"Execução registrada no histórico."),timestamp:new Date($.completed_at||$.issued_at||Date.now()).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),taskRef:c.find(vt=>vt.code===$.task_code)||null}:null),me=K?$p(K.status):null,Le=K&&(K.status==="RUNNING"||K.status==="DISPATCHED"||K.status==="PENDING");return l.jsx(Sc,{children:l.jsxs(w1,{$tone:me?me.color:le.colors.textMuted,$pulsing:!!Le,children:[l.jsxs("div",{className:"le-left",children:[l.jsx("span",{className:"le-dot"}),l.jsxs("div",{className:"le-text",children:[l.jsx("span",{className:"le-title",children:K?`Última ação: ${K.title}`:"Pronto para executar ações"}),l.jsx("span",{className:"le-meta",children:K?`${me.label} · ${K.timestamp}`:"Clique em uma ação acima para enviar ao agente"})]})]}),K&&l.jsx("button",{type:"button",className:"le-btn",onClick:()=>de(K),children:"Ver retorno"})]})})})(),!te&&Ce==="CHAT"&&j&&l.jsx(Sc,{children:(d==null?void 0:d.role)!=="VIEWER"?l.jsxs(j1,{onSubmit:nr,children:[l.jsx("input",{type:"text","aria-label":"Mensagem para o operador do computador",placeholder:"Escrever mensagem para a estação...",value:V,onChange:$=>X($.target.value)}),l.jsxs("button",{type:"submit",disabled:xe||!V.trim(),children:[l.jsx(gy,{size:13}),l.jsx("span",{children:"Enviar"})]})]}):l.jsx("div",{style:{fontSize:"0.74rem",color:le.colors.textSecondary},children:"Modo somente leitura: apenas Suporte N1 ou Admin N2 pode enviar mensagens."})})]}),(q==null?void 0:q.open)&&l.jsx(Vi,{onClick:()=>Y(null),children:l.jsxs(Gi,{onClick:$=>$.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Instalar impressora homologada",children:[l.jsxs(qi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Yi,{$tone:"brand",children:l.jsx(So,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Instalar impressora homologada"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:he(I.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:I.ip_address})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Br,{type:"button",onClick:()=>Y(null),"aria-label":"Fechar",children:l.jsx(Di,{size:15})})})]}),q.loading&&l.jsxs(Ip,{$tone:"warning",children:[l.jsx("span",{className:"on-ico",children:l.jsx(vp,{size:15})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:"Buscando impressoras na sub-rede"}),l.jsx("span",{className:"on-msg",children:"Consultando o catálogo homologado e a descoberta de rede da estação..."})]})]}),q.error&&l.jsx(Ec,{$tone:"danger",children:q.error}),!q.loading&&q.printers.length>0&&l.jsx(R1,{children:q.printers.map($=>{const K=$.id===q.selectedId;return l.jsxs(I1,{$selected:K,$source:$.source,children:[l.jsx("input",{type:"radio",name:"approved_printer",checked:K,onChange:()=>Y(me=>me&&{...me,selectedId:$.id})}),l.jsxs("span",{className:"pr-left",children:[l.jsx("span",{className:"pr-ico",children:l.jsx(So,{size:15})}),l.jsxs("span",{className:"pr-info",children:[l.jsxs("span",{className:"pr-name",children:[l.jsx("span",{children:$.name}),l.jsx("span",{className:"pr-tag",children:$.source==="NETWORK"?"Rede":$.source==="INSTALLED"?"Instalada":"Homologada"})]}),l.jsxs("span",{className:"pr-ip",children:[$.ip_address,$.model?` · ${$.model}`:""]})]})]}),l.jsx("span",{className:"pr-check",children:K&&l.jsx(Yn,{size:11,strokeWidth:2.4})})]},$.id)})}),l.jsxs(Qi,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:le.colors.textMuted},children:"Risco Alto · Admin N2"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Qn,{type:"button",onClick:()=>Y(null),children:"Cancelar"}),l.jsx(Qn,{type:"button",$variant:"primary",disabled:!q.selectedId,onClick:ye,children:"Instalar impressora"})]})]})]})}),ve.open&&l.jsx(Vi,{onClick:()=>ge({open:!1,task:null}),children:l.jsxs(Gi,{onClick:$=>$.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar reinicialização da estação",children:[l.jsxs(qi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Yi,{$tone:"danger",children:l.jsx(Gc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Reiniciar estação de trabalho"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação de alto impacto"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Requer confirmação"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Br,{type:"button",onClick:()=>ge({open:!1,task:null}),"aria-label":"Fechar",children:l.jsx(Di,{size:15})})})]}),l.jsxs(Rp,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:he(I.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:I.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Aviso na tela"}),l.jsx("span",{className:"ts-v",children:"30 segundos"})]})]}),l.jsx(Ec,{$tone:"warning",children:"O Windows exibirá um aviso de 30 segundos para que o operador salve os documentos abertos antes da reinicialização. A ordem será registrada na auditoria."}),l.jsxs(Qi,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:le.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Qn,{type:"button",onClick:()=>ge({open:!1,task:null}),children:"Cancelar"}),l.jsxs(Qn,{type:"button",$variant:"danger",onClick:qe,children:[l.jsx(Gc,{size:13}),l.jsx("span",{children:"Confirmar reinício"})]})]})]})]})}),H&&(()=>{const K=fs({code:H.taskCode,title:H.title}).Icon,me=$p(H.status),Le=$1(H.summary),vt=H.status==="RUNNING"||H.status==="DISPATCHED"||H.status==="PENDING",Ct=H.status==="FAILED"||H.status==="EXPIRED",Ut=Ct?"error":vt?"active":"done",Ht=Ct?"error":vt?"pending":"done";return l.jsx(Vi,{onClick:pt,children:l.jsxs(Gi,{onClick:xn=>xn.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":`Execução da ação ${H.title}`,children:[l.jsxs(qi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Yi,{$tone:me.tone==="danger"?"danger":me.tone==="warning"?"warning":"brand",children:l.jsx(K,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:H.title}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:he(I.hostname)}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:I.ip_address}),l.jsx("span",{children:"·"}),l.jsx("span",{className:"m-mono",children:H.timestamp})]})]})]}),l.jsxs("div",{className:"mh-right",children:[l.jsxs(jp,{$color:me.color,$bgColor:me.bg,children:[l.jsx("span",{className:"dot"}),me.label]}),l.jsx(Br,{type:"button",onClick:pt,"aria-label":"Fechar",children:l.jsx(Di,{size:15})})]})]}),l.jsxs(_1,{"aria-label":"Etapas da execução remota",children:[l.jsxs(Cc,{$state:"done",children:[l.jsx("span",{className:"st-mark",children:l.jsx(Yn,{size:10,strokeWidth:2.5})}),l.jsx("span",{className:"st-lbl",children:"Assinada (HMAC)"})]}),l.jsxs(Cc,{$state:Ut,children:[l.jsx("span",{className:"st-mark",children:Ut==="done"?l.jsx(Yn,{size:10,strokeWidth:2.5}):Ut==="error"?"!":"2"}),l.jsx("span",{className:"st-lbl",children:Ut==="active"?"Na fila do agente":"Enviada ao agente"})]}),l.jsxs(Cc,{$state:Ht,children:[l.jsx("span",{className:"st-mark",children:Ht==="done"?l.jsx(Yn,{size:10,strokeWidth:2.5}):Ht==="error"?"!":"3"}),l.jsx("span",{className:"st-lbl",children:Ht==="error"?"Falha / TTL":"Retorno recebido"})]})]}),Le.structured?l.jsx(N1,{children:Le.items.map((xn,ot)=>l.jsxs(T1,{children:[l.jsx("dt",{children:xn.label}),l.jsx("dd",{children:xn.value})]},ot))}):l.jsxs(Ip,{$tone:me.tone==="danger"?"danger":me.tone==="warning"?"warning":"brand",children:[l.jsx("span",{className:"on-ico",children:Ct?l.jsx(hl,{size:16}):vt?l.jsx(vp,{size:16}):l.jsx(Yn,{size:16})}),l.jsxs("span",{className:"on-body",children:[l.jsx("span",{className:"on-lead",children:me.lead}),l.jsx("span",{className:"on-msg",children:Le.message})]})]}),l.jsxs(Qi,{children:[l.jsx("div",{className:"mf-left",children:l.jsxs(Qn,{type:"button",$variant:"ghost",$copied:Z==="report",onClick:()=>Ve("report",Le.message),title:"Copiar saída completa da tarefa",children:[Z==="report"?l.jsx(Yn,{size:13}):l.jsx(Bi,{size:13}),l.jsx("span",{children:Z==="report"?"Copiado":"Copiar resultado"})]})}),l.jsxs("div",{className:"mf-right",children:[H.taskRef&&!vt&&l.jsxs(Qn,{type:"button",onClick:()=>P(H.taskRef,H.paramsRef||{}),children:[l.jsx(Vc,{size:13}),l.jsx("span",{children:"Executar novamente"})]}),l.jsx(Qn,{type:"button",$variant:"primary",onClick:pt,children:"Fechar"})]})]})]})})})(),Se&&l.jsx(Vi,{onClick:()=>Q(!1),children:l.jsxs(Gi,{onClick:$=>$.stopPropagation(),role:"dialog","aria-modal":"true","aria-label":"Confirmar remoção de equipamento",children:[l.jsxs(qi,{children:[l.jsxs("div",{className:"mh-left",children:[l.jsx(Yi,{$tone:"danger",children:l.jsx(Wc,{size:18})}),l.jsxs("div",{className:"mh-copy",children:[l.jsx("h3",{children:"Remover equipamento do painel"}),l.jsxs("div",{className:"m-sub",children:[l.jsx("span",{children:"Ação permanente"}),l.jsx("span",{children:"·"}),l.jsx("span",{children:"Registrada na auditoria"})]})]})]}),l.jsx("div",{className:"mh-right",children:l.jsx(Br,{type:"button",onClick:()=>Q(!1),"aria-label":"Fechar",children:l.jsx(Di,{size:15})})})]}),l.jsxs(Rp,{children:[l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Estação"}),l.jsx("span",{className:"ts-v",children:he(I.hostname)})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Endereço IP"}),l.jsx("span",{className:"ts-v",children:I.ip_address||"0.0.0.0"})]}),l.jsxs("div",{className:"ts-cell",children:[l.jsx("span",{className:"ts-k",children:"Setor"}),l.jsx("span",{className:"ts-v",children:he(I.sector_name||"N/D")})]})]}),l.jsx(Ec,{$tone:"danger",children:"Esta ação remove permanentemente o cadastro, o histórico de telemetria e as mensagens desta estação do painel."}),l.jsxs(Qi,{children:[l.jsx("div",{className:"mf-left",children:l.jsx("span",{style:{fontSize:"0.71rem",color:le.colors.textMuted},children:"Esc para cancelar"})}),l.jsxs("div",{className:"mf-right",children:[l.jsx(Qn,{type:"button",onClick:()=>Q(!1),children:"Cancelar"}),l.jsx(Qn,{type:"button",$variant:"danger",onClick:async()=>{Q(!1),R&&await R(I.id)},children:"Confirmar remoção"})]})]})]})})]})}const L1=[{value:"USF",label:"USF — Unidade de Saúde da Família"},{value:"POLICLINICA",label:"Policlínica Municipal"},{value:"CAPS",label:"CAPS — Centro de Atenção Psicossocial"},{value:"UPA",label:"UPA — Unidade de Pronto Atendimento"},{value:"HOSPITAL",label:"Hospital Municipal"},{value:"CEO",label:"CEO — Centro de Especialidades"},{value:"SEDE",label:"Sede Administrativa / Central TI"}],O1=[{value:"REC",label:"Recepção",desc:"Balcão em L, longarina e madeira"},{value:"CONS",label:"Consultório",desc:"Maca clínica, soro e biombo"},{value:"FARM",label:"Farmácia / Vacina",desc:"Estantes médicas e piso xadrez"},{value:"ADM",label:"Admin / Enfermagem",desc:"Mural de avisos e área clínica"},{value:"TI",label:"Sala Técnica / TI",desc:"Rack de servidor e infraestrutura"}];function Ap(n,o="SETOR"){return String(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9\s-]/g," ").trim().replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,16)||o}function Pp(n){const o=String((n==null?void 0:n.room_theme)||"").trim().toUpperCase();if(["REC","CONS","FARM","ADM","TI"].includes(o))return o;const i=`${(n==null?void 0:n.code)||""} ${(n==null?void 0:n.name)||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();return i.includes("REC")||i.includes("ACOLH")||(n==null?void 0:n.id)===1?"REC":i.includes("CONS")||i.includes("MED")||i.includes("PSI")||(n==null?void 0:n.id)===2?"CONS":i.includes("FAR")||i.includes("VAC")||i.includes("LAB")||(n==null?void 0:n.id)===3?"FARM":i.includes("TI")||i.includes("CPD")||(n==null?void 0:n.id)===8?"TI":"ADM"}const M1=E.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`,z1=E.div`
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  box-shadow: ${({theme:n})=>n.shadows.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({theme:n})=>n.fonts.sans};
`,F1=E.div`
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e4e8e3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  .m-kicker {
    font-family: ${({theme:n})=>n.fonts.mono};
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
`,D1=E.button`
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
`,Lp=E.div`
  display: flex;
  gap: 6px;
  padding: 10px 20px 0;
  background: #f8faf8;
  border-bottom: 1px solid #e4e8e3;
  flex-wrap: wrap;
`,xo=E.button`
  padding: 7px 12px;
  border: 1px solid ${({$active:n,$danger:o})=>n?o?"#DC2626":"#52796B":"transparent"};
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  background: ${({$active:n})=>n?"#FFFFFF":"transparent"};
  color: ${({$active:n,$danger:o})=>o?"#DC2626":n?"#242925":"#737B75"};
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: -1px;

  &:hover {
    color: ${({$danger:n})=>n?"#B91C1C":"#242925"};
  }
`,B1=E.form`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
`,hs=E.div`
  display: grid;
  grid-template-columns: ${({$cols:n})=>n||"1fr"};
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,rn=E.div`
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
    font-family: ${({theme:n})=>n.fonts.sans};
    font-size: 0.78rem;
    outline: none;

    &:focus {
      border-color: #52796b;
      box-shadow: 0 0 0 2px rgba(82, 121, 107, 0.14);
    }
  }
`,U1=E.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,H1=E.button`
  padding: 8px 6px;
  border-radius: 7px;
  border: 1px solid ${({$selected:n})=>n?"#52796B":"#E4E8E3"};
  background: ${({$selected:n})=>n?"rgba(82, 121, 107, 0.10)":"#F8FAF8"};
  cursor: pointer;
  text-align: left;
  transition: all 0.14s ease;

  &:hover {
    border-color: #52796b;
  }

  .t-code {
    font-family: ${({theme:n})=>n.fonts.mono};
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
`,jc=E.label`
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
`,W1=E.div`
  border: 1px solid #e4e8e3;
  border-radius: 7px;
  padding: 10px 12px;
  background: #f8faf8;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,V1=E.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  color: #52796b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`,ms=E.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.75rem;
  line-height: 1.4;
  background: ${({$tone:n})=>n==="danger"?"rgba(220, 38, 38, 0.08)":"rgba(217, 119, 6, 0.1)"};
  border: 1px solid
    ${({$tone:n})=>n==="danger"?"rgba(220, 38, 38, 0.35)":"rgba(217, 119, 6, 0.35)"};
  color: ${({$tone:n})=>n==="danger"?"#991B1B":"#92400E"};
`,G1=E.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e4e8e3;
`,Op=E.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 7px;
  font-family: ${({theme:n})=>n.fonts.sans};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${({$variant:n,theme:o})=>n==="primary"?o.colors.brandPrimary:n==="danger"?o.colors.status.CRITICAL:o.colors.borderStrong};
  background: ${({$variant:n,theme:o})=>n==="primary"?o.colors.brandPrimary:n==="danger"?o.colors.status.CRITICAL:o.colors.bgSurface};
  color: ${({$variant:n,theme:o})=>n==="primary"||n==="danger"?"#FFFFFF":o.colors.textPrimary};
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
`;function q1({isOpen:n,initialMode:o="CREATE_UNIT",units:i=[],activeUnit:c=null,targetSector:d=null,machines:p=[],onClose:m,onCreateUnit:y,onUpdateUnit:g,onDeleteUnit:j,onCreateSector:_,onUpdateSector:R,onDeleteSector:A}){var Dt;const[F,oe]=N.useState(o),[W,ae]=N.useState(!1),[V,X]=N.useState(""),[xe,Te]=N.useState(""),[Re,fe]=N.useState(""),[H,de]=N.useState(!1),[We,J]=N.useState("USF"),[ne,ee]=N.useState(""),[te,Ne]=N.useState(!0),[Ce,Me]=N.useState(""),[Ee,O]=N.useState(""),[Z,M]=N.useState(""),[b,T]=N.useState(!1),[q,Y]=N.useState("CONS"),[ve,ge]=N.useState(!0),[Se,Q]=N.useState(!0),[ke,_e]=N.useState(!1),[yt,Kt]=N.useState(""),[pt,kt]=N.useState(""),[Nn,Be]=N.useState("9"),[Ve,I]=N.useState("5"),[Lt,Ot]=N.useState(""),ut=N.useMemo(()=>i.filter(G=>Number(G.id)!==Number(c==null?void 0:c.id)),[i,c]),tt=N.useMemo(()=>((c==null?void 0:c.sectors)||[]).filter(G=>Number(G.id)!==Number(d==null?void 0:d.id)),[c,d]),nt=N.useMemo(()=>d?p.filter(G=>Number(G.sector_id)===Number(d.id)).length:0,[p,d]),Xt=Number(((Dt=c==null?void 0:c.summary)==null?void 0:Dt.total)??p.length??0),on=c==null?void 0:c.id,sn=d==null?void 0:d.id;if(N.useEffect(()=>{var G,at;n&&(oe(o),X(""),ae(!1),o==="CREATE_UNIT"?(Te(""),fe(""),de(!1),J("USF"),ee(""),Ne(!0)):o==="EDIT_UNIT"&&c?(Te(he(c.name||"")),fe(c.code||""),de(!0),J(c.unit_type||"USF"),ee(he(c.address||""))):o==="DELETE_UNIT"?Me((G=ut[0])!=null&&G.id?String(ut[0].id):""):o==="CREATE_SECTOR"?(O(""),M(""),T(!1),Y("CONS"),ge(!0),Q(!0),_e(!1),Kt(""),kt(""),Be("9"),I("5")):o==="EDIT_SECTOR"&&d?(O(he(d.name||"")),M(d.code||""),T(!0),Y(Pp(d)),ge(!1),_e(!1),Kt(String(d.bounds_x??0)),kt(String(d.bounds_z??0)),Be(String(d.width_3d??9)),I(String(d.depth_3d??5))):o==="DELETE_SECTOR"&&Ot((at=tt[0])!=null&&at.id?String(tt[0].id):""))},[n,o,on,sn]),!n)return null;const lt=G=>{var at,ln;X(""),oe(G),G==="CREATE_UNIT"?(Te(""),fe(""),de(!1),J("USF"),ee(""),Ne(!0)):G==="EDIT_UNIT"&&c?(Te(he(c.name||"")),fe(c.code||""),de(!0),J(c.unit_type||"USF"),ee(he(c.address||""))):G==="DELETE_UNIT"?Me((at=ut[0])!=null&&at.id?String(ut[0].id):""):G==="CREATE_SECTOR"?(O(""),M(""),T(!1),Y("CONS"),ge(!0),Q(!0),_e(!1),Kt(""),kt(""),Be("9"),I("5")):G==="EDIT_SECTOR"&&d?(O(he(d.name||"")),M(d.code||""),T(!0),Y(Pp(d)),ge(!1),_e(!1),Kt(String(d.bounds_x??0)),kt(String(d.bounds_z??0)),Be(String(d.width_3d??9)),I(String(d.depth_3d??5))):G==="DELETE_SECTOR"&&Ot((ln=tt[0])!=null&&ln.id?String(tt[0].id):"")},Tn=async G=>{G.preventDefault(),X(""),ae(!0);try{F==="CREATE_UNIT"?await y({name:xe,code:Re,unit_type:We,address:ne,create_default_sectors:te}):F==="EDIT_UNIT"&&c?await g(c.id,{name:xe,code:Re,unit_type:We,address:ne}):F==="DELETE_UNIT"&&c?await j(c.id,{target_unit_id:Ce?Number(Ce):void 0}):F==="CREATE_SECTOR"&&c?await _(c.id,{name:Ee,code:Z,room_theme:q,auto_size:Se,...Se?{}:{width_3d:Number(Nn||9),depth_3d:Number(Ve||5)},...ve?{}:{bounds_x:yt===""?void 0:Number(yt),bounds_z:pt===""?void 0:Number(pt)}}):F==="EDIT_SECTOR"&&d?await R(d.id,{name:Ee,code:Z,room_theme:q,width_3d:Number(Nn||9),depth_3d:Number(Ve||5),bounds_x:yt===""?void 0:Number(yt),bounds_z:pt===""?void 0:Number(pt)}):F==="DELETE_SECTOR"&&d&&await A(d.id,{target_sector_id:Lt?Number(Lt):void 0}),m()}catch(at){X((at==null?void 0:at.message)||"Não foi possível concluir a operação.")}finally{ae(!1)}},Zn=F==="EDIT_SECTOR"||F==="DELETE_SECTOR",Jt={CREATE_UNIT:"Cadastrar Nova Unidade de Saúde",EDIT_UNIT:`Editar Unidade — ${he((c==null?void 0:c.name)||"")}`,DELETE_UNIT:`Excluir Unidade — ${he((c==null?void 0:c.name)||"")}`,CREATE_SECTOR:`Novo Setor em ${he((c==null?void 0:c.name)||"Unidade")}`,EDIT_SECTOR:`Editar Setor — ${he((d==null?void 0:d.name)||"")}`,DELETE_SECTOR:`Excluir Setor — ${he((d==null?void 0:d.name)||"")}`}[F];return l.jsx(M1,{onClick:()=>!W&&m(),children:l.jsxs(z1,{onClick:G=>G.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsxs(F1,{children:[l.jsxs("div",{children:[l.jsxs("div",{className:"m-kicker",children:["ESTRUTURA DA REDE // ",c?he(c.code):"RMM"]}),l.jsx("div",{className:"m-title",children:Jt})]}),l.jsx(D1,{type:"button",onClick:()=>!W&&m(),title:"Fechar",children:"✕"})]}),Zn?l.jsxs(Lp,{children:[l.jsx(xo,{type:"button",$active:F==="EDIT_SECTOR",onClick:()=>lt("EDIT_SECTOR"),children:"Editar Setor"}),l.jsx(xo,{type:"button",$danger:!0,$active:F==="DELETE_SECTOR",onClick:()=>lt("DELETE_SECTOR"),children:"Excluir Setor"})]}):l.jsxs(Lp,{children:[l.jsx(xo,{type:"button",$active:F==="CREATE_UNIT",onClick:()=>lt("CREATE_UNIT"),children:"+ Nova Unidade"}),c&&l.jsxs(l.Fragment,{children:[l.jsx(xo,{type:"button",$active:F==="CREATE_SECTOR",onClick:()=>lt("CREATE_SECTOR"),children:"+ Novo Setor"}),l.jsx(xo,{type:"button",$active:F==="EDIT_UNIT",onClick:()=>lt("EDIT_UNIT"),children:"Editar Unidade"}),l.jsx(xo,{type:"button",$danger:!0,$active:F==="DELETE_UNIT",onClick:()=>lt("DELETE_UNIT"),children:"Excluir Unidade"})]})]}),l.jsxs(B1,{onSubmit:Tn,children:[V&&l.jsx(ms,{$tone:"danger",children:V}),(F==="CREATE_UNIT"||F==="EDIT_UNIT")&&l.jsxs(l.Fragment,{children:[l.jsxs(hs,{$cols:"2fr 1fr",children:[l.jsxs(rn,{children:[l.jsx("label",{children:"Nome da Unidade de Saúde *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: USF Camela / UPA Ipojuca",value:xe,onChange:G=>{const at=G.target.value;Te(at),!H&&F==="CREATE_UNIT"&&fe(Ap(at,"UNI"))}})]}),l.jsxs(rn,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única"})]}),l.jsx("input",{type:"text",placeholder:"Ex: USF-CAM",value:Re,onChange:G=>{de(!0),fe(G.target.value.toUpperCase())}})]})]}),l.jsxs(hs,{$cols:"1fr 1.4fr",children:[l.jsxs(rn,{children:[l.jsx("label",{children:"Tipo de Estabelecimento"}),l.jsx("select",{value:We,onChange:G=>J(G.target.value),children:L1.map(G=>l.jsx("option",{value:G.value,children:G.label},G.value))})]}),l.jsxs(rn,{children:[l.jsx("label",{children:"Endereço / Bairro"}),l.jsx("input",{type:"text",placeholder:"Ex: Distrito de Camela, Ipojuca - PE",value:ne,onChange:G=>ee(G.target.value)})]})]}),F==="CREATE_UNIT"&&l.jsxs(jc,{children:[l.jsx("input",{type:"checkbox",checked:te,onChange:G=>Ne(G.target.checked)}),l.jsx("span",{children:"Criar planta inicial com 4 setores padrão (Recepção, Consultório, Farmácia e Adm)"})]})]}),F==="DELETE_UNIT"&&c&&l.jsxs(l.Fragment,{children:[ut.length===0?l.jsxs(ms,{$tone:"danger",children:["Esta é a única unidade ativa no painel. Crie outra unidade antes de excluir"," ",l.jsx("strong",{children:he(c.name)}),"."]}):l.jsxs(ms,{$tone:"warning",children:["A unidade ",l.jsx("strong",{children:he(c.name)})," possui"," ",l.jsxs("strong",{children:[(c.sectors||[]).length," setor(es)"]})," e"," ",l.jsxs("strong",{children:[Xt," computador(es)"]})," vinculados. Esta ação remove permanentemente a unidade e todos os seus setores."]}),ut.length>0&&Xt>0&&l.jsxs(rn,{children:[l.jsx("label",{children:"Realocar computadores existentes para qual unidade?"}),l.jsx("select",{value:Ce,onChange:G=>Me(G.target.value),required:!0,children:ut.map(G=>l.jsxs("option",{value:G.id,children:["[",G.code,"] ",he(G.name)]},G.id))})]})]}),(F==="CREATE_SECTOR"||F==="EDIT_SECTOR")&&l.jsxs(l.Fragment,{children:[l.jsxs(hs,{$cols:"2fr 1fr",children:[l.jsxs(rn,{children:[l.jsx("label",{children:"Nome do Setor *"}),l.jsx("input",{type:"text",required:!0,placeholder:"Ex: Sala de Vacina, Consultório 02, CPD",value:Ee,onChange:G=>{const at=G.target.value;O(at),!b&&F==="CREATE_SECTOR"&&M(Ap(at,"SETOR"))}})]}),l.jsxs(rn,{children:[l.jsxs("label",{children:["Sigla / Código",l.jsx("span",{className:"hint",children:"Única na unidade"})]}),l.jsx("input",{type:"text",placeholder:"Ex: VAC-01",value:Z,onChange:G=>{T(!0),M(G.target.value.toUpperCase())}})]})]}),l.jsxs(rn,{children:[l.jsxs("label",{children:["Estilo do Ambiente & Mobiliário 3D",l.jsx("span",{className:"hint",children:"Define móveis e piso na maquete"})]}),l.jsx(U1,{children:O1.map(G=>l.jsxs(H1,{type:"button",$selected:q===G.value,onClick:()=>Y(G.value),children:[l.jsx("div",{className:"t-code",children:G.value}),l.jsx("div",{className:"t-name",children:G.label}),l.jsx("div",{className:"t-desc",children:G.desc})]},G.value))})]}),l.jsx(V1,{type:"button",onClick:()=>_e(G=>!G),children:ke?"▾ Ocultar layout e medidas 3D":"▸ Layout e medidas 3D (Avançado)"}),ke&&l.jsxs(W1,{children:[F==="CREATE_SECTOR"&&l.jsxs(jc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:ve,onChange:G=>ge(G.target.checked)}),l.jsx("span",{children:"Posicionar automaticamente no próximo espaço livre da planta (sem colisão)"})]}),F==="CREATE_SECTOR"&&l.jsxs(jc,{style:{background:"#FFFFFF"},children:[l.jsx("input",{type:"checkbox",checked:Se,onChange:G=>Q(G.target.checked)}),l.jsx("span",{children:"Tamanho automático — a sala assume a medida predominante da unidade e encaixa na malha existente"})]}),l.jsxs(hs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(rn,{children:[l.jsx("label",{children:"Largura da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"4",max:"24",value:Nn,disabled:F==="CREATE_SECTOR"&&Se,onChange:G=>Be(G.target.value)})]}),l.jsxs(rn,{children:[l.jsx("label",{children:"Profundidade da Sala (m)"}),l.jsx("input",{type:"number",step:"0.5",min:"3.5",max:"16",value:Ve,disabled:F==="CREATE_SECTOR"&&Se,onChange:G=>I(G.target.value)})]})]}),(!ve||F==="EDIT_SECTOR")&&l.jsxs(hs,{$cols:"repeat(2, 1fr)",children:[l.jsxs(rn,{children:[l.jsx("label",{children:"Posição X Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:yt,placeholder:"-4.5, 4.5, 13.5...",onChange:G=>Kt(G.target.value)})]}),l.jsxs(rn,{children:[l.jsx("label",{children:"Posição Z Centro (m)"}),l.jsx("input",{type:"number",step:"0.5",value:pt,placeholder:"-3.5 (Norte) ou 3.5 (Sul)",onChange:G=>kt(G.target.value)})]})]})]})]}),F==="DELETE_SECTOR"&&d&&l.jsxs(l.Fragment,{children:[tt.length===0&&nt>0?l.jsxs(ms,{$tone:"danger",children:["O setor ",l.jsx("strong",{children:he(d.name)})," é o único setor desta unidade e contém ",l.jsxs("strong",{children:[nt," computador(es)"]}),". Crie outro setor antes de excluí-lo para permitir a transferência."]}):l.jsxs(ms,{$tone:"warning",children:["Confirma a exclusão do setor"," ",l.jsx("strong",{children:he(d.name)})," (",d.code,") da unidade ",l.jsx("strong",{children:he((c==null?void 0:c.name)||"")}),"?",nt>0?` Os ${nt} computador(es) alocados serão transferidos para o setor selecionado abaixo.`:" Este setor não possui computadores alocados."]}),tt.length>0&&nt>0&&l.jsxs(rn,{children:[l.jsx("label",{children:"Transferir computadores deste setor para:"}),l.jsx("select",{value:Lt,onChange:G=>Ot(G.target.value),required:!0,children:tt.map(G=>l.jsxs("option",{value:G.id,children:["[",G.code,"] ",he(G.name)]},G.id))})]})]}),l.jsxs(G1,{children:[l.jsx(Op,{type:"button",onClick:()=>!W&&m(),disabled:W,children:"Cancelar"}),l.jsx(Op,{type:"submit",$variant:F==="DELETE_UNIT"||F==="DELETE_SECTOR"?"danger":"primary",disabled:W||F==="DELETE_UNIT"&&ut.length===0||F==="DELETE_SECTOR"&&tt.length===0&&nt>0,children:W?"Processando...":F==="CREATE_UNIT"?"Criar Unidade":F==="EDIT_UNIT"?"Salvar Unidade":F==="DELETE_UNIT"?"Confirmar Exclusão da Unidade":F==="CREATE_SECTOR"?"Criar Setor 3D":F==="EDIT_SECTOR"?"Salvar Setor":"Confirmar Exclusão do Setor"})]})]})]})})}const Y1=N.lazy(()=>Up(()=>import("./DigitalTwin3D-faEbB50Z.js"),__vite__mapDeps([0,1])).then(n=>({default:n.DigitalTwin3D}))),Q1=N.lazy(()=>Up(()=>import("./ModelShowcase-DnlXrfUW.js"),__vite__mapDeps([2,1]))),K1={ADMIN_N2:"Admin N2",TECH_N1:"Suporte N1",VIEWER:"Gestão"};function Lh(n){return String(n||"Operador").replace(/\s*\((Admin\s*N2|Suporte\s*N1|Tech\s*N1|Gest[aã]o|Viewer)\)\s*$/i,"").trim()}function X1(n){const o=Lh(n).split(/\s+/).filter(Boolean);return o.length===0?"TI":o.length===1?o[0].slice(0,2).toUpperCase():`${o[0][0]}${o[o.length-1][0]}`.toUpperCase()}const J1=E.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
`,Z1=E.header`
  pointer-events: auto;
  height: 54px;
  flex-shrink: 0;
  background: ${({theme:n})=>n.colors.bgSurface};
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`,ev=E.div`
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
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .brand-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-top: 1px;
    white-space: nowrap;
  }
`,Mp=E.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:n})=>n||"#2D6A4F"};
  display: inline-block;
  flex-shrink: 0;
`,tv=E.nav`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`,nv=E.div`
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
`,rv=E.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`,ov=E.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  max-width: 210px;
  flex-shrink: 0;
  border-radius: ${({theme:n})=>n.radius.sm};
  border: 1px solid
    ${({$active:n,theme:o})=>n?o.colors.borderStrong:"transparent"};
  background: ${({$active:n,theme:o})=>n?o.colors.bgSurfaceSubtle:"transparent"};
  color: ${({$active:n,theme:o})=>n?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.76rem;
  font-weight: ${({$active:n})=>n?600:500};
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
    background: ${({theme:n})=>n.colors.bgSurfaceHover};
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }

  .u-count {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
    color: ${({$active:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textMuted};
    background: ${({$active:n})=>n?"rgba(45, 106, 79, 0.1)":"rgba(30, 36, 32, 0.05)"};
    padding: 1px 6px;
    border-radius: 999px;
  }

  @media (max-width: 1360px) {
    max-width: 165px;
    padding: 0 8px;
  }
`,Ki=E.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 32px;
  padding: ${({$iconOnly:n})=>n?"0 8px":"0 10px"};
  border-radius: ${({theme:n})=>n.radius.sm};
  border: 1px solid
    ${({$accent:n,theme:o})=>n?"rgba(45, 106, 79, 0.26)":o.colors.borderSubtle};
  background: ${({$accent:n,theme:o})=>n?o.colors.brandPrimarySubtle:o.colors.bgSurface};
  color: ${({$accent:n,$danger:o,theme:i})=>o?i.colors.status.CRITICAL:n?i.colors.brandPrimary:i.colors.textSecondary};
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
    background: ${({$accent:n,$danger:o,theme:i})=>o?"rgba(200, 30, 30, 0.08)":n?"rgba(45, 106, 79, 0.16)":i.colors.bgSurfaceHover};
    border-color: ${({$danger:n,theme:o})=>n?"rgba(200, 30, 30, 0.35)":o.colors.borderStrong};
    color: ${({$danger:n,$accent:o,theme:i})=>n?i.colors.status.CRITICAL:o?i.colors.brandPrimaryHover:i.colors.textPrimary};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,sv=E.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 1120px) {
    .hide-compact {
      display: none;
    }
  }
`,gs=E.span`
  width: 1px;
  height: 20px;
  background: ${({theme:n})=>n.colors.borderSubtle};
  display: inline-block;
  flex-shrink: 0;
`,iv=E.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 4px 3px 5px;
  border-radius: ${({theme:n})=>n.radius.sm};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};

  .u-avatar {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: rgba(45, 106, 79, 0.12);
    color: ${({theme:n})=>n.colors.brandPrimary};
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
    color: ${({theme:n})=>n.colors.textPrimary};
    max-width: 132px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .u-role {
    font-size: 0.66rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,lv=E.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 14px;
  gap: 10px;
  pointer-events: none;
`,av=E.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
`,cv=E.div`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  background: ${({theme:n})=>n.colors.bgGlassHeavy};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  padding: 4px;
  max-width: 100%;
`,On=E.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid
    ${({$active:n,theme:o})=>n?o.colors.borderStrong:"transparent"};
  background: ${({$active:n,theme:o})=>n?o.colors.bgSurfaceSubtle:"transparent"};
  color: ${({$active:n,theme:o})=>n?o.colors.textPrimary:o.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({$active:n})=>n?600:500};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({theme:n})=>n.colors.bgSurfaceHover};
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }
`,uv=E.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
  overflow: hidden;
`,dv=E.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 12px;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  color: ${({theme:n})=>n.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: translateY(-1px);
    border-color: ${({theme:n})=>n.colors.borderStrong};
    box-shadow: ${({theme:n})=>n.shadows.md};
  }

  .alert-pill {
    font-family: ${({theme:n})=>n.fonts.mono};
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
`,fv=E.aside`
  pointer-events: auto;
  width: 280px;
  max-height: 100%;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 960px) {
    display: none;
  }
`,_c=E.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  &:last-child {
    border-bottom: none;
  }
`,Nc=E.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .sec-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .sec-meta {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .sec-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`,pv=E.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`,Xi=E.div`
  display: flex;
  flex-direction: column;
  padding-top: 7px;
  border-top: 2px solid ${({$color:n})=>n};

  .num {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    line-height: 1.15;
  }

  .lbl {
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-top: 2px;
  }
`,zp=E.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${({theme:n})=>n.colors.brandPrimary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({theme:n})=>n.colors.brandPrimarySubtle};
  }
`,Ji=E.button`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({$danger:n,theme:o})=>n?o.colors.status.CRITICAL:o.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({$danger:n,theme:o})=>n?"rgba(200, 30, 30, 0.08)":o.colors.bgSurfaceHover};
    color: ${({$danger:n,theme:o})=>n?o.colors.status.CRITICAL:o.colors.textPrimary};
  }
`,hv=E.div`
  display: flex;
  flex-direction: column;
`,mv=E.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 10px;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);
  border-radius: 6px;
  background: ${({$selected:n,theme:o})=>n?o.colors.brandPrimarySubtle:"transparent"};
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
    background: ${({$selected:n,theme:o})=>n?o.colors.brandPrimary:"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({$selected:n,theme:o})=>n?"rgba(45, 106, 79, 0.13)":o.colors.bgSurfaceSubtle};
  }

  .s-info {
    min-width: 0;
  }

  .s-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .s-code {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.68rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-top: 1px;
  }

  .s-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .s-count {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
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
`,gv=E.button`
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: none;
  border-left: 2.5px solid
    ${({$severity:n,theme:o})=>n==="CRITICAL"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  border-radius: 0 6px 6px 0;
  background: ${({$severity:n})=>n==="CRITICAL"?"rgba(200, 30, 30, 0.05)":"rgba(180, 83, 9, 0.05)"};
  margin-bottom: 6px;
  cursor: ${({$clickable:n})=>n?"pointer":"default"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({$severity:n,$clickable:o})=>o?n==="CRITICAL"?"rgba(200, 30, 30, 0.09)":"rgba(180, 83, 9, 0.09)":void 0};
  }

  .a-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .a-tag {
    font-size: 0.66rem;
    font-weight: 700;
    color: ${({$severity:n,theme:o})=>n==="CRITICAL"?o.colors.status.CRITICAL:o.colors.status.WARNING};
    white-space: nowrap;
  }

  .a-msg {
    font-size: 0.74rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    line-height: 1.38;
    margin-top: 2px;
  }

  .a-meta {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.66rem;
    color: ${({theme:n})=>n.colors.textMuted};
    margin-top: 3px;
  }
`,Fp=E.p`
  font-size: 0.76rem;
  color: ${({theme:n})=>n.colors.textSecondary};
  line-height: 1.45;
`,xv=E.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`,yv=E.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 14px;
  margin-bottom: -1px;
  background: ${({theme:n})=>n.colors.bgSurface};
  color: ${({theme:n})=>n.colors.textSecondary};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-bottom: ${({$collapsed:n,theme:o})=>n?`1px solid ${o.colors.borderSubtle}`:"1px solid transparent"};
  border-radius: 8px 8px 0 0;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .arrow {
    display: inline-flex;
    transition: transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: rotate(${({$collapsed:n})=>n?"180deg":"0deg"});
  }

  &:hover {
    background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
    color: ${({theme:n})=>n.colors.textPrimary};
  }
`,vv=E.footer`
  pointer-events: auto;
  align-self: stretch;
  background: ${({theme:n})=>n.colors.bgGlassHeavy};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  padding: ${({$collapsed:n})=>n?"0 14px":"10px 14px"};
  max-height: ${({$collapsed:n})=>n?"0px":"168px"};
  opacity: ${({$collapsed:n})=>n?0:1};
  border-width: ${({$collapsed:n})=>n?"0":"1px"};
  visibility: ${({$collapsed:n})=>n?"hidden":"visible"};
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: max-height 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    padding 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease,
    visibility 220ms;
`,bv=E.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 14px;
  border-right: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  min-width: 204px;
  flex-shrink: 0;

  .dock-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .dock-sub {
    font-size: 0.7rem;
    font-weight: 500;
    color: ${({theme:n})=>n.colors.textSecondary};
    font-variant-numeric: tabular-nums;
  }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    color: ${({theme:n})=>n.colors.textMuted};
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
    background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
    border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
    border-radius: 7px;
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.76rem;
    padding: 0 10px 0 30px;
    transition: border-color 140ms ease, background 140ms ease;

    &::placeholder {
      color: ${({theme:n})=>n.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:n})=>n.colors.brandPrimary};
      background: ${({theme:n})=>n.colors.bgSurface};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }
`,wv=E.button`
  min-width: 188px;
  flex-shrink: 0;
  padding: 9px 12px;
  background: ${({$selected:n,$inact:o})=>n?"#F1F7F4":o?"#FFFDF5":"#FFFFFF"};
  border: 1px solid
    ${({$selected:n,$inact:o,theme:i})=>n?i.colors.brandPrimary:o?"rgba(180, 83, 9, 0.45)":i.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  color: ${({theme:n})=>n.colors.textPrimary};
  text-align: left;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    border-color: ${({theme:n})=>n.colors.brandPrimary};
    transform: translateY(-2px);
    box-shadow: ${({theme:n})=>n.shadows.md};
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
    color: ${({theme:n})=>n.colors.textSecondary};
    font-weight: 500;
  }

  .n-sector {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.68rem;
  }

  .n-host {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
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
    color: ${({$prnOk:n,theme:o})=>n?o.colors.brandPrimary:o.colors.status.CRITICAL};
    opacity: ${({$prnOk:n})=>n?.72:1};
  }

  .n-metrics {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    color: ${({theme:n})=>n.colors.textSecondary};
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
`,Sv=E.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,kv=E.div`
  width: 100%;
  max-width: 460px;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  padding: 22px 24px;
  box-shadow: ${({theme:n})=>n.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({theme:n})=>n.colors.textPrimary};

  h3 {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  p {
    font-size: 0.84rem;
    color: ${({theme:n})=>n.colors.textSecondary};
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
    border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  }
`,Cv=E.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 7px;
  border: none;
  background: ${({theme:n})=>n.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,Ev=E.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid ${({theme:n})=>n.colors.borderStrong};
  background: ${({theme:n})=>n.colors.bgSurface};
  color: ${({theme:n})=>n.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.bgSurfaceHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }
`,qc=E.div`
  position: fixed;
  inset: 0;
  background: ${({theme:n})=>n.colors.bgCanvas};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:n})=>n.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:n})=>n.colors.textSecondary};
`,Dp=86400;function Bp(n,o){if(!n)return{isInactive24h:!1,mode:null,seconds:0};const i=n.health_status==="OFFLINE",c=n.last_seen_at?Math.max(0,Math.floor((o-new Date(n.last_seen_at).getTime())/1e3)):0,d=Math.max(0,Math.floor(Number(n.idle_seconds||0)));return i&&c>=Dp?{isInactive24h:!0,mode:"OFFLINE",seconds:c}:!i&&d>=Dp?{isInactive24h:!0,mode:"IDLE",seconds:d}:{isInactive24h:!1,mode:null,seconds:i?c:d}}function yo(n){const o=Math.max(0,Math.floor(Number(n||0)));if(o<60)return`${o}s`;const i=Math.floor(o/60);if(i<60)return`${i}m`;const c=Math.floor(i/60);return c<24?`${c}h ${i%60}m`:`${Math.floor(c/24)}d ${c%24}h`}const Yc="rmm.authToken";function jv(){try{return window.sessionStorage.getItem(Yc)||null}catch{return null}}function Tc(n){try{n?window.sessionStorage.setItem(Yc,n):window.sessionStorage.removeItem(Yc)}catch{}}function _v(){const n=N.useMemo(()=>{const o=new URLSearchParams(window.location.search);return o.get("showcase")!=="1"?null:{angle:o.get("angle")||"iso"}},[]);return n?l.jsxs(ol,{theme:le,children:[l.jsx(sl,{}),l.jsx(N.Suspense,{fallback:l.jsx(qc,{children:"Carregando cena de homologação 3D..."}),children:l.jsx(Q1,{angle:n.angle})})]}):l.jsx(Nv,{})}function Nv(){var an,tr,nr;const[n,o]=N.useState({token:null,user:null,checking:!0}),[i,c]=N.useState(""),[d,p]=N.useState({open:!1,busy:!1,resultMsg:""}),[m,y]=N.useState([]),[g,j]=N.useState(1),[_,R]=N.useState([]),[A,F]=N.useState(null),[oe,W]=N.useState(null),[ae,V]=N.useState(null),[X,xe]=N.useState([]),[Te,Re]=N.useState([]),[fe,H]=N.useState([]),[de,We]=N.useState(!1),[J,ne]=N.useState("ISO"),[ee,te]=N.useState("PIXEL"),[Ne,Ce]=N.useState(()=>{try{return window.localStorage.getItem("rmm.topControlsCollapsed")==="1"}catch{return!1}}),[Me,Ee]=N.useState(""),[O,Z]=N.useState(()=>{try{return window.localStorage.getItem("rmm.dockCollapsed")==="1"}catch{return!1}}),[M,b]=N.useState(()=>{try{return window.localStorage.getItem("rmm.leftRailCollapsed")==="1"}catch{return!1}}),T=N.useRef(g),q=N.useRef(A);N.useEffect(()=>{T.current=g},[g]),N.useEffect(()=>{q.current=A},[A]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.dockCollapsed",O?"1":"0")}catch{}},[O]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.topControlsCollapsed",Ne?"1":"0")}catch{}},[Ne]),N.useEffect(()=>{try{window.localStorage.setItem("rmm.leftRailCollapsed",M?"1":"0")}catch{}},[M]);const[Y,ve]=N.useState(Date.now()),[ge,Se]=N.useState({furniture:!0,labels:!0}),[Q,ke]=N.useState({isOpen:!1,mode:"CREATE_UNIT",targetSector:null}),_e=N.useCallback((C="")=>{const re=loadSessionToken();re&&Ye.logout(re),Tc(null),o({token:null,user:null,checking:!1}),We(!1),y([]),R([]),V(null),xe([]),H([]),c(C)},[]),yt=N.useCallback(async()=>{if(n.token)try{await Ye.downloadAgentInstaller(n.token)}catch(C){(C==null?void 0:C.status)===401&&_e("Sua sessão expirou. Faça login novamente.")}},[n.token,_e]),Kt=N.useCallback(async(C,re)=>{const P=await Ye.login(C,re);return Tc(P.token),c(""),o({token:P.token,user:P.user,checking:!1}),P},[]);N.useEffect(()=>{const C=jv();if(!C){o({token:null,user:null,checking:!1});return}Ye.getMe(C).then(re=>{o({token:C,user:re.user,checking:!1})}).catch(()=>{Tc(null),o({token:null,user:null,checking:!1})})},[]);const pt=((an=n.user)==null?void 0:an.role)==="ADMIN_N2"||((tr=n.user)==null?void 0:tr.role)==="TECH_N1",kt=(C,re=null)=>{ke({isOpen:!0,mode:C,targetSector:re})},Nn=()=>{ke(C=>({...C,isOpen:!1}))};N.useEffect(()=>{const C=setInterval(()=>ve(Date.now()),1e3);return()=>clearInterval(C)},[]);const Be=C=>{Se(re=>({...re,[C]:!re[C]}))},Ve=N.useCallback(async(C,re,P)=>{var B;try{const[ye,qe,Pe,Bt]=await Promise.all([Ye.getUnits(C),Ye.getMachines(C,{unitId:re}),Ye.getTaskCatalog(C),Ye.getAlerts(C)]),Qe=qe.machines||[];y(ye.units||[]),R(Qe),Re(Pe.tasks||[]),H(Bt.alerts||[]);const $=P&&Qe.some(K=>K.id===Number(P))?P:((B=Qe[0])==null?void 0:B.id)||null;if($){const[K,me]=await Promise.all([Ye.getMachineDiagnostics(C,$),Ye.getMachineMessages(C,$).catch(()=>({messages:[]}))]);V(K),xe(me.messages||[])}else V(null),xe([])}catch(ye){if((ye==null?void 0:ye.status)===401){_e("Sua sessão expirou. Faça login novamente.");return}throw ye}},[_e]);N.useEffect(()=>{if(!n.token)return;const C=n.token,re=Fx(C,{onConnect:()=>We(!0),onDisconnect:()=>We(!1),onMachineUpdated:P=>{const B=Number(T.current),ye=Number(P.unit_id),qe=B>0&&ye===B;R(Pe=>{const Bt=Pe.some(Qe=>Qe.id===P.id);return qe?Bt?Pe.map(Qe=>Qe.id===P.id?P:Qe):[...Pe,P]:Bt?Pe.filter(Qe=>Qe.id!==P.id):Pe}),V(Pe=>!Pe||!Pe.machine?Pe:Pe.machine.id===P.id?qe?{...Pe,machine:P}:null:Pe),Ye.getUnits(C).then(Pe=>y(Pe.units||[])).catch(()=>{})},onMachineDeleted:({id:P})=>{R(B=>B.filter(ye=>ye.id!==Number(P))),V(B=>{var ye;return((ye=B==null?void 0:B.machine)==null?void 0:ye.id)===Number(P)?null:B}),Ye.getUnits(C).then(B=>y(B.units||[])).catch(()=>{})},onAlertTriggered:P=>{H(B=>[P,...B.filter(ye=>ye.id!==P.id).slice(0,19)])},onTaskUpdated:P=>{const B=q.current;P&&P.machine_id&&V(ye=>{var Qe;if(!ye||Number((Qe=ye.machine)==null?void 0:Qe.id)!==Number(P.machine_id))return ye;const qe=ye.tasks||[],Bt=qe.some($=>$.task_id===P.task_id)?qe.map($=>$.task_id===P.task_id?P:$):[P,...qe];return{...ye,tasks:Bt}}),P!=null&&P.machine_id&&Number(P.machine_id)===Number(B)&&Ye.getMachineDiagnostics(C,P.machine_id).then(ye=>{Number(q.current)===Number(P.machine_id)&&V(ye)}).catch(()=>{})},onAgentMessage:P=>{const B=Number(q.current);!P||!B||Number(P.machine_id)!==B||xe(ye=>P.id!==void 0&&ye.some(qe=>qe.id===P.id)?ye:[...ye,P])},onUnitsUpdated:P=>{Array.isArray(P==null?void 0:P.units)&&y(P.units)}});return()=>{re.close()}},[n.token]),N.useEffect(()=>{if(!n.token)return;Ve(n.token,g,A).catch(()=>{});const C=setInterval(()=>{Ve(n.token,g,A).catch(()=>{})},12e3);return()=>clearInterval(C)},[n.token,g,A,Ve]),N.useEffect(()=>{m.length>0&&!m.some(C=>C.id===Number(g))&&(j(m[0].id),W(null),F(null),V(null))},[m,g]);const I=m.find(C=>C.id===Number(g))||m[0],Lt=_.find(C=>C.id===Number(A))||_[0]||null,Ot=N.useMemo(()=>((I==null?void 0:I.sectors)||[]).find(C=>C.id===Number(oe))||null,[I,oe]),ut=N.useMemo(()=>{if(!Me.trim())return _;const C=Me.toLowerCase();return _.filter(re=>String(re.hostname||"").toLowerCase().includes(C)||String(re.ip_address||"").toLowerCase().includes(C)||String(re.sector_name||"").toLowerCase().includes(C))},[_,Me]),tt=m.reduce((C,re)=>{var P,B,ye,qe,Pe;return{total:C.total+(((P=re.summary)==null?void 0:P.total)||0),NORMAL:C.NORMAL+(((B=re.summary)==null?void 0:B.NORMAL)||0),WARNING:C.WARNING+(((ye=re.summary)==null?void 0:ye.WARNING)||0),CRITICAL:C.CRITICAL+(((qe=re.summary)==null?void 0:qe.CRITICAL)||0),OFFLINE:C.OFFLINE+(((Pe=re.summary)==null?void 0:Pe.OFFLINE)||0)}},{total:0,NORMAL:0,WARNING:0,CRITICAL:0,OFFLINE:0});async function nt(C){const re=await Ye.dispatchAuthorizedTask(n.token,C);return await Ve(n.token,g,C.machineId),re}async function Xt(C,re){return(await Ye.getApprovedPrinters(n.token,C,re)).printers||[]}async function on(C){const re=await Ye.refreshMachineTelemetryNow(n.token,C);return await Ve(n.token,g,C),re}async function sn(C){const re=await Ye.updateMachineAgent(n.token,C);return await Ve(n.token,g,C),re}async function lt(){p(C=>({...C,busy:!0,resultMsg:""}));try{const C=await Ye.updateAllAgents(n.token);await Ve(n.token,g,A),p({open:!0,busy:!1,resultMsg:C.message||"Ordem de atualização enviada para todas as máquinas."})}catch(C){p({open:!0,busy:!1,resultMsg:`Falha ao enviar atualização: ${C.message}`})}}async function Tn(C,re){const P=await Ye.sendMachineMessage(n.token,C,re);return await Ve(n.token,g,C),P}async function Zn(C,{unitId:re,sectorId:P}){const B=await Ye.updateMachineLocation(n.token,C,{unitId:re,sectorId:P});return j(Number(re)),await Ve(n.token,Number(re),C),B}async function Jt(C){await Ye.deleteMachine(n.token,C),F(null),await Ve(n.token,g,null)}async function Dt(C){var B;const re=await Ye.createUnit(n.token,C);Array.isArray(re.units)&&y(re.units);const P=((B=re.unit)==null?void 0:B.id)||g;return j(P),F(null),W(null),V(null),ne("ISO"),await Ve(n.token,P,null),re}async function G(C,re){const P=await Ye.updateUnit(n.token,C,re);return Array.isArray(P.units)&&y(P.units),await Ve(n.token,g,A),P}async function at(C,re){var qe;const P=await Ye.deleteUnit(n.token,C,re),B=Array.isArray(P.units)?P.units:[];y(B);const ye=P.target_unit_id||((qe=B[0])==null?void 0:qe.id)||1;return j(ye),F(null),W(null),V(null),ne("ISO"),await Ve(n.token,ye,null),P}async function ln(C,re){var B;const P=await Ye.createSector(n.token,C,re);return Array.isArray(P.units)&&y(P.units),(B=P.sector)!=null&&B.id&&(W(P.sector.id),ne("SECTOR")),await Ve(n.token,g,A),P}async function To(C,re){const P=await Ye.updateSector(n.token,C,re);return Array.isArray(P.units)&&y(P.units),await Ve(n.token,g,A),P}async function er(C,re){const P=await Ye.deleteSector(n.token,C,re);return Array.isArray(P.units)&&y(P.units),Number(oe)===Number(C)&&(W(null),ne("ISO")),await Ve(n.token,g,A),P}return n.checking?l.jsxs(ol,{theme:le,children:[l.jsx(sl,{}),l.jsx(qc,{children:"Validando sessão Pulso RMM..."})]}):!n.token||!n.user?l.jsxs(ol,{theme:le,children:[l.jsx(sl,{}),l.jsx(Qy,{onAuthenticated:Kt,sessionNotice:i})]}):l.jsxs(ol,{theme:le,children:[l.jsx(sl,{}),ee==="PIXEL"?l.jsx(ay,{activeUnit:I,machines:_,selectedMachine:Lt,selectedSector:Ot,onSelectMachine:C=>{F(C.id),W(null)}}):l.jsx(N.Suspense,{fallback:l.jsx(qc,{children:"Carregando Gêmeo Digital 3D..."}),children:l.jsx(Y1,{activeUnit:I,machines:_,selectedMachine:Lt,selectedSector:Ot,cameraMode:J,roomVariant:Xy(),sceneLayers:ge,onUserOrbit:()=>{J!=="FREE"&&ne("FREE")},onSelectMachine:C=>{F(C.id),W(null),ne("FOCUS")}})}),l.jsxs(J1,{children:[l.jsxs(Z1,{children:[l.jsxs(ev,{children:[l.jsx(Hc,{size:26}),l.jsxs("div",{className:"brand-copy",children:[l.jsx("span",{className:"brand-title",children:"Pulso RMM"}),l.jsxs("span",{className:"brand-status",children:[l.jsx(Mp,{$color:de?le.colors.status.NORMAL:le.colors.status.WARNING}),l.jsx("span",{children:de?"Tempo real ativo":"Reconectando"})]})]})]}),l.jsx(gs,{"aria-hidden":"true"}),l.jsxs(tv,{"aria-label":"Unidades de Saúde",children:[l.jsx(nv,{children:m.map(C=>{var B,ye;const re=C.id===Number(g),P=he(C.name);return l.jsxs(ov,{type:"button",$active:re,"aria-current":re?"page":void 0,title:`${P} (${((B=C.summary)==null?void 0:B.total)||0} estações)`,onClick:()=>{j(C.id),F(null),W(null),V(null),ne("ISO")},children:[l.jsx("span",{className:"u-name",children:P}),l.jsx("span",{className:"u-count",children:((ye=C.summary)==null?void 0:ye.total)||0})]},C.id)})}),pt&&l.jsxs(rv,{children:[l.jsx(Ki,{type:"button",$accent:!0,$iconOnly:!0,onClick:()=>kt("CREATE_UNIT"),title:"Cadastrar nova Unidade de Saúde","aria-label":"Cadastrar nova Unidade de Saúde",children:l.jsx(gp,{size:14})}),I&&l.jsx(Ki,{type:"button",$iconOnly:!0,onClick:()=>kt("EDIT_UNIT"),title:"Editar ou excluir unidade selecionada","aria-label":"Editar unidade selecionada",children:l.jsx(xp,{size:14})})]})]}),l.jsxs(sv,{children:[l.jsxs(Ki,{type:"button",onClick:yt,title:"Baixar instalador autenticado do Agente Windows (.exe)",children:[l.jsx(uy,{size:14}),l.jsx("span",{className:"hide-compact",children:"Agente"})]}),((nr=n.user)==null?void 0:nr.role)==="ADMIN_N2"&&l.jsxs(Ki,{type:"button",$accent:!0,onClick:()=>p({open:!0,busy:!1,resultMsg:""}),title:"Enviar atualização silenciosa (OTA) para todas as máquinas",children:[l.jsx(Ph,{size:14}),l.jsx("span",{className:"hide-compact",children:"Atualizar todos"})]}),l.jsx(gs,{"aria-hidden":"true"}),l.jsxs(iv,{title:n.user.email,children:[l.jsx("span",{className:"u-avatar",children:X1(n.user.name)}),l.jsxs("div",{className:"u-meta",children:[l.jsx("span",{className:"u-name",children:Lh(n.user.name)}),l.jsx("span",{className:"u-role",children:K1[n.user.role]||n.user.role})]}),l.jsx(Ji,{type:"button",$danger:!0,onClick:()=>_e(""),title:"Encerrar sessão","aria-label":"Encerrar sessão",children:l.jsx(dy,{size:14})})]})]})]}),l.jsxs(lv,{children:[l.jsx(av,{children:l.jsx(cv,{children:Ne?l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{fontFamily:le.fonts.mono,fontSize:"0.72rem",fontWeight:600,color:le.colors.textSecondary,padding:"0 8px"},children:ee==="PIXEL"?"Pixel Art":`3D · ${J}`}),l.jsxs(On,{type:"button",onClick:()=>Ce(!1),title:"Expandir controles de visualização","aria-expanded":"false",children:[l.jsx(yc,{size:14}),l.jsx("span",{children:"Visualização"})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs(On,{type:"button",$active:ee==="PIXEL",onClick:()=>te("PIXEL"),title:"Planta isométrica em Pixel Art",children:[l.jsx(wy,{size:13}),l.jsx("span",{children:"Pixel Art"})]}),l.jsxs(On,{type:"button",$active:ee==="3D",onClick:()=>te("3D"),title:"Maquete tridimensional interativa",children:[l.jsx(by,{size:13}),l.jsx("span",{children:"3D"})]}),ee==="3D"&&l.jsxs(l.Fragment,{children:[l.jsx(gs,{"aria-hidden":"true"}),l.jsx(On,{type:"button",$active:J==="ISO",onClick:()=>{W(null),ne("ISO")},children:"ISO"}),l.jsx(On,{type:"button",$active:J==="TOP",onClick:()=>ne("TOP"),children:"Topo"}),l.jsx(On,{type:"button",$active:J==="FOCUS",onClick:()=>ne("FOCUS"),children:"Foco"}),l.jsx(On,{type:"button",$active:J==="ORBIT",onClick:()=>ne(C=>C==="ORBIT"?"ISO":"ORBIT"),title:"Giro orbital suave ao redor da maquete",children:"360°"}),l.jsx(gs,{"aria-hidden":"true"}),l.jsxs(On,{type:"button",$active:ge.furniture,onClick:()=>Be("furniture"),title:"Alternar mobiliário 3D",children:[l.jsx(xy,{size:13}),l.jsx("span",{children:"Mobiliário"})]}),l.jsxs(On,{type:"button",$active:ge.labels,onClick:()=>Be("labels"),title:"Alternar rótulos das estações",children:[l.jsx(yy,{size:13}),l.jsx("span",{children:"Rótulos"})]})]}),l.jsx(gs,{"aria-hidden":"true"}),l.jsx(On,{type:"button",onClick:()=>Ce(!0),title:"Recolher barra de visualização","aria-label":"Recolher barra de visualização","aria-expanded":"true",children:l.jsx(yc,{size:14,style:{transform:"rotate(180deg)"}})})]})})}),l.jsxs(uv,{children:[(()=>{const re=[..._.map(B=>({machine:B,info:Bp(B,Y)})).filter(({info:B})=>B.isInactive24h).filter(({machine:B})=>!fe.some(ye=>Number(ye.machine_id)===Number(B.id)&&ye.metric_name==="INACTIVITY_24H"&&ye.status!=="RESOLVED")).map(({machine:B,info:ye})=>({id:`live-inact-${B.id}`,machine_id:B.id,hostname:B.hostname,unit_name:B.unit_name||(I==null?void 0:I.name)||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"Inativo >24h",message:ye.mode==="OFFLINE"?`Sem comunicação há ${yo(ye.seconds)} (>24h).`:`Ligado sem interação há ${yo(ye.seconds)} (>24h).`})),...fe],P=re.filter(B=>B.status!=="RESOLVED").length;return M?l.jsxs(dv,{type:"button",onClick:()=>b(!1),title:"Expandir painel lateral de rede, setores e alertas","aria-expanded":"false",children:[l.jsx(vy,{size:15}),l.jsx("span",{children:"Painel"}),P>0&&l.jsx("span",{className:"alert-pill",children:P})]}):l.jsxs(fv,{"aria-label":"Resumo da rede, setores e alertas",children:[l.jsxs(_c,{children:[l.jsxs(Nc,{children:[l.jsx("span",{className:"sec-title",children:"Rede global"}),l.jsxs("div",{className:"sec-actions",children:[l.jsxs("span",{className:"sec-meta",children:[tt.total," PCs"]}),l.jsx(Ji,{type:"button",onClick:()=>b(!0),title:"Recolher painel lateral","aria-label":"Recolher painel lateral",children:l.jsx(Ah,{size:14})})]})]}),l.jsxs(pv,{children:[l.jsxs(Xi,{$color:le.colors.status.NORMAL,children:[l.jsx("span",{className:"num",children:tt.NORMAL+tt.WARNING+tt.CRITICAL}),l.jsx("span",{className:"lbl",children:"Online"})]}),l.jsxs(Xi,{$color:le.colors.status.WARNING,children:[l.jsx("span",{className:"num",children:tt.WARNING}),l.jsx("span",{className:"lbl",children:"Atenção"})]}),l.jsxs(Xi,{$color:le.colors.status.CRITICAL,children:[l.jsx("span",{className:"num",children:tt.CRITICAL}),l.jsx("span",{className:"lbl",children:"Crítico"})]}),l.jsxs(Xi,{$color:le.colors.status.OFFLINE,children:[l.jsx("span",{className:"num",children:tt.OFFLINE}),l.jsx("span",{className:"lbl",children:"Offline"})]})]})]}),l.jsxs(_c,{children:[l.jsxs(Nc,{children:[l.jsxs("span",{className:"sec-title",children:["Setores",l.jsxs("span",{className:"sec-meta",children:["(",((I==null?void 0:I.sectors)||[]).length,")"]})]}),l.jsxs("div",{className:"sec-actions",children:[oe&&l.jsxs(zp,{type:"button",onClick:()=>{W(null),ne("ISO")},title:"Voltar para a visão geral da maquete",children:[l.jsx(cy,{size:12}),l.jsx("span",{children:"Geral"})]}),pt&&I&&l.jsxs(zp,{type:"button",onClick:()=>kt("CREATE_SECTOR"),title:"Criar novo setor nesta unidade",children:[l.jsx(gp,{size:12}),l.jsx("span",{children:"Setor"})]})]})]}),((I==null?void 0:I.sectors)||[]).length===0?l.jsxs(Fp,{children:["Nenhum setor cadastrado."," ",pt&&'Use "+ Setor" para adicionar uma sala.']}):l.jsx(hv,{children:((I==null?void 0:I.sectors)||[]).map(B=>{const ye=_.filter(Pe=>Number(Pe.sector_id)===Number(B.id)),qe=oe===B.id;return l.jsxs(mv,{$selected:qe,onClick:()=>{qe?(W(null),ne("ISO")):(W(B.id),ne("SECTOR"))},title:`Filtrar e aproximar no setor ${he(B.name)}`,children:[l.jsxs("div",{className:"s-info",children:[l.jsx("div",{className:"s-name",children:he(B.name)}),l.jsx("div",{className:"s-code",children:B.code})]}),l.jsxs("div",{className:"s-right",children:[l.jsx("span",{className:"s-count",children:ye.length}),pt&&l.jsxs("div",{className:"s-controls",children:[l.jsx(Ji,{type:"button",title:`Editar setor ${he(B.name)}`,"aria-label":`Editar setor ${he(B.name)}`,onClick:Pe=>{Pe.stopPropagation(),kt("EDIT_SECTOR",B)},children:l.jsx(xp,{size:13})}),l.jsx(Ji,{type:"button",$danger:!0,title:`Excluir setor ${he(B.name)}`,"aria-label":`Excluir setor ${he(B.name)}`,onClick:Pe=>{Pe.stopPropagation(),kt("DELETE_SECTOR",B)},children:l.jsx(Wc,{size:13})})]})]})]},B.id)})})]}),l.jsxs(_c,{children:[l.jsxs(Nc,{children:[l.jsx("span",{className:"sec-title",children:"Alertas recentes"}),l.jsxs("span",{className:"sec-meta",children:[P," ",P===1?"ativo":"ativos"]})]}),re.length===0?l.jsx(Fp,{children:"Nenhum alerta crítico ou de inatividade (>24h) no momento."}):re.slice(0,5).map(B=>l.jsxs(gv,{type:"button",$severity:B.severity,$clickable:!!B.machine_id,onClick:()=>{B.machine_id&&(F(Number(B.machine_id)),ne("FOCUS"))},title:B.machine_id?"Clique para focar esta estação":void 0,children:[l.jsxs("div",{className:"a-top",children:[l.jsx("span",{children:he(B.hostname||`PC #${B.machine_id}`)}),l.jsx("span",{className:"a-tag",children:B.metric_name==="INACTIVITY_24H"&&B.status!=="RESOLVED"?"Inativo >24h":B.status||B.severity})]}),l.jsx("div",{className:"a-msg",children:he(B.message)}),l.jsxs("div",{className:"a-meta",children:[he(B.unit_name||""),B.external_ticket_id?` · #${B.external_ticket_id}`:""]})]},B.id||B.incident_key))]})]})})(),l.jsx(P1,{diagnostics:ae,units:m,chatMessages:X,taskCatalog:Te,currentUser:n.user||{name:"Operador",role:"VIEWER"},onDispatchTask:nt,onLoadPrinters:Xt,onRefreshTelemetryNow:on,onUpdateMachineAgent:sn,onSendMessage:Tn,onUpdateLocation:Zn,onDeleteMachine:Jt,onFocusCamera:()=>ne("FOCUS")})]}),l.jsxs(xv,{children:[l.jsxs(yv,{type:"button",$collapsed:O,onClick:()=>Z(C=>!C),"aria-expanded":!O,"aria-controls":"rmm-bottom-dock","aria-label":O?"Expandir lista de computadores":"Recolher lista de computadores",children:[l.jsx("span",{className:"arrow","aria-hidden":"true",children:l.jsx(yc,{size:13})}),l.jsx("span",{children:O?`${_.length} ${_.length===1?"estação":"estações"} na unidade`:"Ocultar estações"})]}),l.jsxs(vv,{id:"rmm-bottom-dock",$collapsed:O,"aria-hidden":O,children:[l.jsxs(bv,{children:[l.jsxs("div",{children:[l.jsx("div",{className:"dock-title",children:he((I==null?void 0:I.name)||"Unidade")}),l.jsxs("div",{className:"dock-sub",children:[ut.length," de ",_.length," estações"]})]}),l.jsxs("div",{className:"search-wrap",children:[l.jsx("span",{className:"search-icon",children:l.jsx(fy,{size:13})}),l.jsx("input",{className:"dock-search",type:"text","aria-label":"Filtrar estações por hostname, IP ou setor",placeholder:"Filtrar hostname, IP...",value:Me,onChange:C=>Ee(C.target.value)})]})]}),ut.length===0&&l.jsxs("div",{style:{fontSize:"0.78rem",color:le.colors.textSecondary,display:"flex",alignItems:"center",gap:"12px"},children:[l.jsx("span",{children:"Nenhuma estação encontrada nesta unidade."}),l.jsx("button",{type:"button",onClick:yt,style:{background:"transparent",border:"none",padding:0,cursor:"pointer",color:le.colors.brandPrimary,textDecoration:"underline",fontWeight:600,fontSize:"inherit"},children:"Baixar Agente (.exe)"})]}),ut.map(C=>{const re=le.colors.status[C.health_status]||le.colors.status.NORMAL,P=(Lt==null?void 0:Lt.id)===C.id,B=Math.min(100,Math.max(0,Number(C.cpu_usage_pct||0))),ye=Math.min(100,Math.max(0,Number(C.ram_usage_pct||0))),qe=Math.min(100,Math.max(0,Number(C.disk_usage_pct||0))),Pe=Math.max(0,Math.floor(Number(C.idle_seconds||0))),Bt=xh(C.agent_version,"2.3.0"),Qe=Bp(C,Y),$=C.last_seen_at?Math.max(0,Math.floor((Y-new Date(C.last_seen_at).getTime())/1e3)):0,K=Qe.isInactive24h?`Inativo >24h (${yo(Qe.seconds)})`:C.health_status==="OFFLINE"?`Desligado há ${yo($)}`:Bt?`Ativo (${C.agent_version||"2.2.0"})`:Pe<180?`Em uso (${yo(Pe)})`:`Ocioso há ${yo(Pe)}`,me=Qe.isInactive24h?le.colors.status.CRITICAL:C.health_status==="OFFLINE"?le.colors.status.OFFLINE:Pe<180?le.colors.status.NORMAL:le.colors.status.WARNING,Le=C.health_status==="NORMAL"?"Online":C.health_status==="WARNING"?"Atenção":C.health_status==="CRITICAL"?"Crítico":"Offline";return l.jsxs(wv,{type:"button",$selected:P,$inact:Qe.isInactive24h,$prnOk:!!C.spooler_running,onClick:()=>{F(C.id),ne("FOCUS")},children:[l.jsxs("div",{className:"n-top",children:[l.jsxs("span",{className:"n-sector",children:[l.jsx(Mp,{$color:re}),C.sector_code]}),l.jsx("span",{children:Le})]}),l.jsxs("div",{className:"n-host",children:[l.jsx("span",{children:C.hostname}),l.jsx("span",{className:"n-prn",title:C.spooler_running?"Spooler de impressão ativo":"Spooler de impressão parado",children:l.jsx(So,{size:13})})]}),l.jsxs("div",{className:"n-metrics",children:["CPU ",B.toFixed(0),"% · RAM ",ye.toFixed(0),"% · ",C.ip_address]}),l.jsxs("div",{className:"n-activity",style:{color:me},children:[Qe.isInactive24h&&l.jsx(hl,{size:12}),l.jsx("span",{children:K})]}),l.jsxs("div",{className:"n-bars",children:[l.jsx("div",{className:"bar-track",title:`CPU: ${B.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${B}%`,background:le.colors.status.NORMAL}})}),l.jsx("div",{className:"bar-track",title:`RAM: ${ye.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${ye}%`,background:le.colors.brandPrimaryLight}})}),l.jsx("div",{className:"bar-track",title:`Disco: ${qe.toFixed(0)}%`,children:l.jsx("i",{style:{width:`${qe}%`,background:le.colors.status.OFFLINE}})})]})]},C.id)})]})]})]})]}),l.jsx(q1,{isOpen:Q.isOpen,initialMode:Q.mode,units:m,activeUnit:I,targetSector:Q.targetSector,machines:_,onClose:Nn,onCreateUnit:Dt,onUpdateUnit:G,onDeleteUnit:at,onCreateSector:ln,onUpdateSector:To,onDeleteSector:er}),d.open&&l.jsx(Sv,{onClick:()=>!d.busy&&p({open:!1,busy:!1,resultMsg:""}),children:l.jsxs(kv,{onClick:C=>C.stopPropagation(),role:"dialog","aria-modal":"true",children:[l.jsx("h3",{children:"Confirmar atualização global de agentes"}),l.jsxs("p",{children:["Esta operação enviará ordem de atualização silenciosa (com verificação obrigatória SHA-256) para todas as ",l.jsxs("strong",{children:[tt.total," estação(ões)"]})," cadastradas no painel."]}),d.resultMsg&&l.jsx("div",{className:"modal-result",children:d.resultMsg}),l.jsxs("div",{className:"modal-actions",children:[l.jsx(Ev,{type:"button",disabled:d.busy,onClick:()=>p({open:!1,busy:!1,resultMsg:""}),children:d.resultMsg?"Fechar":"Cancelar"}),!d.resultMsg&&l.jsx(Cv,{type:"button",disabled:d.busy,onClick:lt,children:d.busy?"Enviando...":"Confirmar atualização"})]})]})})]})}L0.createRoot(document.getElementById("root")).render(l.jsx(Pt.StrictMode,{children:l.jsx(_v,{})}));export{bl as E,Tv as S,ou as a,Qc as b,j0 as c,L0 as d,he as f,E as g,l as j,N as r};
