const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/DigitalTwin3D-DTi6ie77.js","assets/Gltf-DKF8YbR3.js","assets/ModelShowcase-BOdyFZ11.js"])))=>i.map(i=>d[i]);
(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))u(d);new MutationObserver(d=>{for(const p of d)if(p.type==="childList")for(const m of p.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&u(m)}).observe(document,{childList:!0,subtree:!0});function i(d){const p={};return d.integrity&&(p.integrity=d.integrity),d.referrerPolicy&&(p.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?p.credentials="include":d.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function u(d){if(d.ep)return;d.ep=!0;const p=i(d);fetch(d.href,p)}})();function ig(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Ba={exports:{}},Zo={},Ua={exports:{}},$e={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wf;function lg(){if(wf)return $e;wf=1;var n=Symbol.for("react.element"),o=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),p=Symbol.for("react.provider"),m=Symbol.for("react.context"),x=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),C=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),I=Symbol.iterator;function P(w){return w===null||typeof w!="object"?null:(w=I&&w[I]||w["@@iterator"],typeof w=="function"?w:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Z=Object.assign,W={};function ae(w,j,ue){this.props=w,this.context=j,this.refs=W,this.updater=ue||D}ae.prototype.isReactComponent={},ae.prototype.setState=function(w,j){if(typeof w!="object"&&typeof w!="function"&&w!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,w,j,"setState")},ae.prototype.forceUpdate=function(w){this.updater.enqueueForceUpdate(this,w,"forceUpdate")};function X(){}X.prototype=ae.prototype;function J(w,j,ue){this.props=w,this.context=j,this.refs=W,this.updater=ue||D}var he=J.prototype=new X;he.constructor=J,Z(he,ae.prototype),he.isPureReactComponent=!0;var Ce=Array.isArray,_e=Object.prototype.hasOwnProperty,ve={current:null},re={key:!0,ref:!0,__self:!0,__source:!0};function te(w,j,ue){var U,N={},ge=null,be=null;if(j!=null)for(U in j.ref!==void 0&&(be=j.ref),j.key!==void 0&&(ge=""+j.key),j)_e.call(j,U)&&!re.hasOwnProperty(U)&&(N[U]=j[U]);var Y=arguments.length-2;if(Y===1)N.children=ue;else if(1<Y){for(var ke=Array(Y),Ne=0;Ne<Y;Ne++)ke[Ne]=arguments[Ne+2];N.children=ke}if(w&&w.defaultProps)for(U in Y=w.defaultProps,Y)N[U]===void 0&&(N[U]=Y[U]);return{$$typeof:n,type:w,key:ge,ref:be,props:N,_owner:ve.current}}function pe(w,j){return{$$typeof:n,type:w.type,key:j,ref:w.ref,props:w.props,_owner:w._owner}}function V(w){return typeof w=="object"&&w!==null&&w.$$typeof===n}function q(w){var j={"=":"=0",":":"=2"};return"$"+w.replace(/[=:]/g,function(ue){return j[ue]})}var K=/\/+/g;function oe(w,j){return typeof w=="object"&&w!==null&&w.key!=null?q(""+w.key):j.toString(36)}function Ee(w,j,ue,U,N){var ge=typeof w;(ge==="undefined"||ge==="boolean")&&(w=null);var be=!1;if(w===null)be=!0;else switch(ge){case"string":case"number":be=!0;break;case"object":switch(w.$$typeof){case n:case o:be=!0}}if(be)return be=w,N=N(be),w=U===""?"."+oe(be,0):U,Ce(N)?(ue="",w!=null&&(ue=w.replace(K,"$&/")+"/"),Ee(N,j,ue,"",function(Ne){return Ne})):N!=null&&(V(N)&&(N=pe(N,ue+(!N.key||be&&be.key===N.key?"":(""+N.key).replace(K,"$&/")+"/")+w)),j.push(N)),1;if(be=0,U=U===""?".":U+":",Ce(w))for(var Y=0;Y<w.length;Y++){ge=w[Y];var ke=U+oe(ge,Y);be+=Ee(ge,j,ue,ke,N)}else if(ke=P(w),typeof ke=="function")for(w=ke.call(w),Y=0;!(ge=w.next()).done;)ge=ge.value,ke=U+oe(ge,Y++),be+=Ee(ge,j,ue,ke,N);else if(ge==="object")throw j=String(w),Error("Objects are not valid as a React child (found: "+(j==="[object Object]"?"object with keys {"+Object.keys(w).join(", ")+"}":j)+"). If you meant to render a collection of children, use an array instead.");return be}function Ae(w,j,ue){if(w==null)return w;var U=[],N=0;return Ee(w,U,"","",function(ge){return j.call(ue,ge,N++)}),U}function Le(w){if(w._status===-1){var j=w._result;j=j(),j.then(function(ue){(w._status===0||w._status===-1)&&(w._status=1,w._result=ue)},function(ue){(w._status===0||w._status===-1)&&(w._status=2,w._result=ue)}),w._status===-1&&(w._status=0,w._result=j)}if(w._status===1)return w._result.default;throw w._result}var fe={current:null},O={transition:null},ne={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:O,ReactCurrentOwner:ve};function M(){throw Error("act(...) is not supported in production builds of React.")}return $e.Children={map:Ae,forEach:function(w,j,ue){Ae(w,function(){j.apply(this,arguments)},ue)},count:function(w){var j=0;return Ae(w,function(){j++}),j},toArray:function(w){return Ae(w,function(j){return j})||[]},only:function(w){if(!V(w))throw Error("React.Children.only expected to receive a single React element child.");return w}},$e.Component=ae,$e.Fragment=i,$e.Profiler=d,$e.PureComponent=J,$e.StrictMode=u,$e.Suspense=g,$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ne,$e.act=M,$e.cloneElement=function(w,j,ue){if(w==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+w+".");var U=Z({},w.props),N=w.key,ge=w.ref,be=w._owner;if(j!=null){if(j.ref!==void 0&&(ge=j.ref,be=ve.current),j.key!==void 0&&(N=""+j.key),w.type&&w.type.defaultProps)var Y=w.type.defaultProps;for(ke in j)_e.call(j,ke)&&!re.hasOwnProperty(ke)&&(U[ke]=j[ke]===void 0&&Y!==void 0?Y[ke]:j[ke])}var ke=arguments.length-2;if(ke===1)U.children=ue;else if(1<ke){Y=Array(ke);for(var Ne=0;Ne<ke;Ne++)Y[Ne]=arguments[Ne+2];U.children=Y}return{$$typeof:n,type:w.type,key:N,ref:ge,props:U,_owner:be}},$e.createContext=function(w){return w={$$typeof:m,_currentValue:w,_currentValue2:w,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},w.Provider={$$typeof:p,_context:w},w.Consumer=w},$e.createElement=te,$e.createFactory=function(w){var j=te.bind(null,w);return j.type=w,j},$e.createRef=function(){return{current:null}},$e.forwardRef=function(w){return{$$typeof:x,render:w}},$e.isValidElement=V,$e.lazy=function(w){return{$$typeof:_,_payload:{_status:-1,_result:w},_init:Le}},$e.memo=function(w,j){return{$$typeof:C,type:w,compare:j===void 0?null:j}},$e.startTransition=function(w){var j=O.transition;O.transition={};try{w()}finally{O.transition=j}},$e.unstable_act=M,$e.useCallback=function(w,j){return fe.current.useCallback(w,j)},$e.useContext=function(w){return fe.current.useContext(w)},$e.useDebugValue=function(){},$e.useDeferredValue=function(w){return fe.current.useDeferredValue(w)},$e.useEffect=function(w,j){return fe.current.useEffect(w,j)},$e.useId=function(){return fe.current.useId()},$e.useImperativeHandle=function(w,j,ue){return fe.current.useImperativeHandle(w,j,ue)},$e.useInsertionEffect=function(w,j){return fe.current.useInsertionEffect(w,j)},$e.useLayoutEffect=function(w,j){return fe.current.useLayoutEffect(w,j)},$e.useMemo=function(w,j){return fe.current.useMemo(w,j)},$e.useReducer=function(w,j,ue){return fe.current.useReducer(w,j,ue)},$e.useRef=function(w){return fe.current.useRef(w)},$e.useState=function(w){return fe.current.useState(w)},$e.useSyncExternalStore=function(w,j,ue){return fe.current.useSyncExternalStore(w,j,ue)},$e.useTransition=function(){return fe.current.useTransition()},$e.version="18.3.1",$e}var Sf;function _u(){return Sf||(Sf=1,Ua.exports=lg()),Ua.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bf;function ag(){if(bf)return Zo;bf=1;var n=_u(),o=Symbol.for("react.element"),i=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,d=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function m(x,g,C){var _,I={},P=null,D=null;C!==void 0&&(P=""+C),g.key!==void 0&&(P=""+g.key),g.ref!==void 0&&(D=g.ref);for(_ in g)u.call(g,_)&&!p.hasOwnProperty(_)&&(I[_]=g[_]);if(x&&x.defaultProps)for(_ in g=x.defaultProps,g)I[_]===void 0&&(I[_]=g[_]);return{$$typeof:o,type:x,key:P,ref:D,props:I,_owner:d.current}}return Zo.Fragment=i,Zo.jsx=m,Zo.jsxs=m,Zo}var kf;function ug(){return kf||(kf=1,Ba.exports=ag()),Ba.exports}var a=ug(),R=_u();const Rt=ig(R);var Ei={},Ha={exports:{}},Vt={},Va={exports:{}},Wa={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ef;function cg(){return Ef||(Ef=1,(function(n){function o(O,ne){var M=O.length;O.push(ne);e:for(;0<M;){var w=M-1>>>1,j=O[w];if(0<d(j,ne))O[w]=ne,O[M]=j,M=w;else break e}}function i(O){return O.length===0?null:O[0]}function u(O){if(O.length===0)return null;var ne=O[0],M=O.pop();if(M!==ne){O[0]=M;e:for(var w=0,j=O.length,ue=j>>>1;w<ue;){var U=2*(w+1)-1,N=O[U],ge=U+1,be=O[ge];if(0>d(N,M))ge<j&&0>d(be,N)?(O[w]=be,O[ge]=M,w=ge):(O[w]=N,O[U]=M,w=U);else if(ge<j&&0>d(be,M))O[w]=be,O[ge]=M,w=ge;else break e}}return ne}function d(O,ne){var M=O.sortIndex-ne.sortIndex;return M!==0?M:O.id-ne.id}if(typeof performance=="object"&&typeof performance.now=="function"){var p=performance;n.unstable_now=function(){return p.now()}}else{var m=Date,x=m.now();n.unstable_now=function(){return m.now()-x}}var g=[],C=[],_=1,I=null,P=3,D=!1,Z=!1,W=!1,ae=typeof setTimeout=="function"?setTimeout:null,X=typeof clearTimeout=="function"?clearTimeout:null,J=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function he(O){for(var ne=i(C);ne!==null;){if(ne.callback===null)u(C);else if(ne.startTime<=O)u(C),ne.sortIndex=ne.expirationTime,o(g,ne);else break;ne=i(C)}}function Ce(O){if(W=!1,he(O),!Z)if(i(g)!==null)Z=!0,Le(_e);else{var ne=i(C);ne!==null&&fe(Ce,ne.startTime-O)}}function _e(O,ne){Z=!1,W&&(W=!1,X(te),te=-1),D=!0;var M=P;try{for(he(ne),I=i(g);I!==null&&(!(I.expirationTime>ne)||O&&!q());){var w=I.callback;if(typeof w=="function"){I.callback=null,P=I.priorityLevel;var j=w(I.expirationTime<=ne);ne=n.unstable_now(),typeof j=="function"?I.callback=j:I===i(g)&&u(g),he(ne)}else u(g);I=i(g)}if(I!==null)var ue=!0;else{var U=i(C);U!==null&&fe(Ce,U.startTime-ne),ue=!1}return ue}finally{I=null,P=M,D=!1}}var ve=!1,re=null,te=-1,pe=5,V=-1;function q(){return!(n.unstable_now()-V<pe)}function K(){if(re!==null){var O=n.unstable_now();V=O;var ne=!0;try{ne=re(!0,O)}finally{ne?oe():(ve=!1,re=null)}}else ve=!1}var oe;if(typeof J=="function")oe=function(){J(K)};else if(typeof MessageChannel<"u"){var Ee=new MessageChannel,Ae=Ee.port2;Ee.port1.onmessage=K,oe=function(){Ae.postMessage(null)}}else oe=function(){ae(K,0)};function Le(O){re=O,ve||(ve=!0,oe())}function fe(O,ne){te=ae(function(){O(n.unstable_now())},ne)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(O){O.callback=null},n.unstable_continueExecution=function(){Z||D||(Z=!0,Le(_e))},n.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):pe=0<O?Math.floor(1e3/O):5},n.unstable_getCurrentPriorityLevel=function(){return P},n.unstable_getFirstCallbackNode=function(){return i(g)},n.unstable_next=function(O){switch(P){case 1:case 2:case 3:var ne=3;break;default:ne=P}var M=P;P=ne;try{return O()}finally{P=M}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(O,ne){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var M=P;P=O;try{return ne()}finally{P=M}},n.unstable_scheduleCallback=function(O,ne,M){var w=n.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?w+M:w):M=w,O){case 1:var j=-1;break;case 2:j=250;break;case 5:j=1073741823;break;case 4:j=1e4;break;default:j=5e3}return j=M+j,O={id:_++,callback:ne,priorityLevel:O,startTime:M,expirationTime:j,sortIndex:-1},M>w?(O.sortIndex=M,o(C,O),i(g)===null&&O===i(C)&&(W?(X(te),te=-1):W=!0,fe(Ce,M-w))):(O.sortIndex=j,o(g,O),Z||D||(Z=!0,Le(_e))),O},n.unstable_shouldYield=q,n.unstable_wrapCallback=function(O){var ne=P;return function(){var M=P;P=ne;try{return O.apply(this,arguments)}finally{P=M}}}})(Wa)),Wa}var Cf;function dg(){return Cf||(Cf=1,Va.exports=cg()),Va.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _f;function fg(){if(_f)return Vt;_f=1;var n=_u(),o=dg();function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var u=new Set,d={};function p(e,t){m(e,t),m(e+"Capture",t)}function m(e,t){for(d[e]=t,e=0;e<t.length;e++)u.add(t[e])}var x=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),g=Object.prototype.hasOwnProperty,C=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},I={};function P(e){return g.call(I,e)?!0:g.call(_,e)?!1:C.test(e)?I[e]=!0:(_[e]=!0,!1)}function D(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Z(e,t,r,s){if(t===null||typeof t>"u"||D(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function W(e,t,r,s,l,c,f){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=l,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=c,this.removeEmptyString=f}var ae={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ae[e]=new W(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ae[t]=new W(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){ae[e]=new W(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ae[e]=new W(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ae[e]=new W(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){ae[e]=new W(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){ae[e]=new W(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){ae[e]=new W(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){ae[e]=new W(e,5,!1,e.toLowerCase(),null,!1,!1)});var X=/[\-:]([a-z])/g;function J(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(X,J);ae[t]=new W(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(X,J);ae[t]=new W(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(X,J);ae[t]=new W(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){ae[e]=new W(e,1,!1,e.toLowerCase(),null,!1,!1)}),ae.xlinkHref=new W("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){ae[e]=new W(e,1,!1,e.toLowerCase(),null,!0,!0)});function he(e,t,r,s){var l=ae.hasOwnProperty(t)?ae[t]:null;(l!==null?l.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Z(t,r,l,s)&&(r=null),s||l===null?P(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):l.mustUseProperty?e[l.propertyName]=r===null?l.type===3?!1:"":r:(t=l.attributeName,s=l.attributeNamespace,r===null?e.removeAttribute(t):(l=l.type,r=l===3||l===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var Ce=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,_e=Symbol.for("react.element"),ve=Symbol.for("react.portal"),re=Symbol.for("react.fragment"),te=Symbol.for("react.strict_mode"),pe=Symbol.for("react.profiler"),V=Symbol.for("react.provider"),q=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),oe=Symbol.for("react.suspense"),Ee=Symbol.for("react.suspense_list"),Ae=Symbol.for("react.memo"),Le=Symbol.for("react.lazy"),fe=Symbol.for("react.offscreen"),O=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=O&&e[O]||e["@@iterator"],typeof e=="function"?e:null)}var M=Object.assign,w;function j(e){if(w===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);w=t&&t[1]||""}return`
`+w+e}var ue=!1;function U(e,t){if(!e||ue)return"";ue=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(E){var s=E}Reflect.construct(e,[],t)}else{try{t.call()}catch(E){s=E}e.call(t.prototype)}else{try{throw Error()}catch(E){s=E}e()}}catch(E){if(E&&s&&typeof E.stack=="string"){for(var l=E.stack.split(`
`),c=s.stack.split(`
`),f=l.length-1,h=c.length-1;1<=f&&0<=h&&l[f]!==c[h];)h--;for(;1<=f&&0<=h;f--,h--)if(l[f]!==c[h]){if(f!==1||h!==1)do if(f--,h--,0>h||l[f]!==c[h]){var y=`
`+l[f].replace(" at new "," at ");return e.displayName&&y.includes("<anonymous>")&&(y=y.replace("<anonymous>",e.displayName)),y}while(1<=f&&0<=h);break}}}finally{ue=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?j(e):""}function N(e){switch(e.tag){case 5:return j(e.type);case 16:return j("Lazy");case 13:return j("Suspense");case 19:return j("SuspenseList");case 0:case 2:case 15:return e=U(e.type,!1),e;case 11:return e=U(e.type.render,!1),e;case 1:return e=U(e.type,!0),e;default:return""}}function ge(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case re:return"Fragment";case ve:return"Portal";case pe:return"Profiler";case te:return"StrictMode";case oe:return"Suspense";case Ee:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case q:return(e.displayName||"Context")+".Consumer";case V:return(e._context.displayName||"Context")+".Provider";case K:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ae:return t=e.displayName||null,t!==null?t:ge(e.type)||"Memo";case Le:t=e._payload,e=e._init;try{return ge(e(t))}catch{}}return null}function be(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ge(t);case 8:return t===te?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Y(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ke(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Ne(e){var t=ke(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var l=r.get,c=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(f){s=""+f,c.call(this,f)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(f){s=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ue(e){e._valueTracker||(e._valueTracker=Ne(e))}function Et(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=ke(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function dt(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Pt(e,t){var r=t.checked;return M({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Ot(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=Y(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ge(e,t){t=t.checked,t!=null&&he(e,"checked",t,!1)}function Oe(e,t){Ge(e,t);var r=Y(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Lt(e,t.type,r):t.hasOwnProperty("defaultValue")&&Lt(e,t.type,Y(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function vt(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Lt(e,t,r){(t!=="number"||dt(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var wt=Array.isArray;function He(e,t,r,s){if(e=e.options,t){t={};for(var l=0;l<r.length;l++)t["$"+r[l]]=!0;for(r=0;r<e.length;r++)l=t.hasOwnProperty("$"+e[r].value),e[r].selected!==l&&(e[r].selected=l),l&&s&&(e[r].defaultSelected=!0)}else{for(r=""+Y(r),t=null,l=0;l<e.length;l++){if(e[l].value===r){e[l].selected=!0,s&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Ct(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(i(91));return M({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function mt(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(i(92));if(wt(r)){if(1<r.length)throw Error(i(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:Y(r)}}function Tn(e,t){var r=Y(t.value),s=Y(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function Wt(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Vn(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Mt(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Vn(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var xn,Wn=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,l){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,l)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(xn=xn||document.createElement("div"),xn.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=xn.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Gt(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Jt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},G=["Webkit","ms","Moz","O"];Object.keys(Jt).forEach(function(e){G.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Jt[t]=Jt[e]})});function nt(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Jt.hasOwnProperty(e)&&Jt[e]?(""+t).trim():t+"px"}function vn(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,l=nt(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,l):e[r]=l}}var Pr=M({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Rn(e,t){if(t){if(Pr[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(i(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(i(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(i(61))}if(t.style!=null&&typeof t.style!="object")throw Error(i(62))}}function L(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var je=null;function S(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Q=null,A=null,$=null;function de(e){if(e=zo(e)){if(typeof Q!="function")throw Error(i(280));var t=e.stateNode;t&&(t=Fs(t),Q(e.stateNode,e.type,t))}}function Ve(e){A?$?$.push(e):$=[e]:A=e}function Ie(){if(A){var e=A,t=$;if($=A=null,de(e),t)for(e=0;e<t.length;e++)de(t[e])}}function St(e,t){return e(t)}function rt(){}var zt=!1;function Gn(e,t,r){if(zt)return e(t,r);zt=!0;try{return St(e,t,r)}finally{zt=!1,(A!==null||$!==null)&&(rt(),Ie())}}function $n(e,t){var r=e.stateNode;if(r===null)return null;var s=Fs(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(i(231,t,typeof r));return r}var yo=!1;if(x)try{var xo={};Object.defineProperty(xo,"passive",{get:function(){yo=!0}}),window.addEventListener("test",xo,xo),window.removeEventListener("test",xo,xo)}catch{yo=!1}function fh(e,t,r,s,l,c,f,h,y){var E=Array.prototype.slice.call(arguments,3);try{t.apply(r,E)}catch(F){this.onError(F)}}var vo=!1,ys=null,xs=!1,il=null,ph={onError:function(e){vo=!0,ys=e}};function hh(e,t,r,s,l,c,f,h,y){vo=!1,ys=null,fh.apply(ph,arguments)}function mh(e,t,r,s,l,c,f,h,y){if(hh.apply(this,arguments),vo){if(vo){var E=ys;vo=!1,ys=null}else throw Error(i(198));xs||(xs=!0,il=E)}}function gr(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function Uu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Hu(e){if(gr(e)!==e)throw Error(i(188))}function gh(e){var t=e.alternate;if(!t){if(t=gr(e),t===null)throw Error(i(188));return t!==e?null:e}for(var r=e,s=t;;){var l=r.return;if(l===null)break;var c=l.alternate;if(c===null){if(s=l.return,s!==null){r=s;continue}break}if(l.child===c.child){for(c=l.child;c;){if(c===r)return Hu(l),e;if(c===s)return Hu(l),t;c=c.sibling}throw Error(i(188))}if(r.return!==s.return)r=l,s=c;else{for(var f=!1,h=l.child;h;){if(h===r){f=!0,r=l,s=c;break}if(h===s){f=!0,s=l,r=c;break}h=h.sibling}if(!f){for(h=c.child;h;){if(h===r){f=!0,r=c,s=l;break}if(h===s){f=!0,s=c,r=l;break}h=h.sibling}if(!f)throw Error(i(189))}}if(r.alternate!==s)throw Error(i(190))}if(r.tag!==3)throw Error(i(188));return r.stateNode.current===r?e:t}function Vu(e){return e=gh(e),e!==null?Wu(e):null}function Wu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Wu(e);if(t!==null)return t;e=e.sibling}return null}var Gu=o.unstable_scheduleCallback,qu=o.unstable_cancelCallback,yh=o.unstable_shouldYield,xh=o.unstable_requestPaint,st=o.unstable_now,vh=o.unstable_getCurrentPriorityLevel,ll=o.unstable_ImmediatePriority,Yu=o.unstable_UserBlockingPriority,vs=o.unstable_NormalPriority,wh=o.unstable_LowPriority,Qu=o.unstable_IdlePriority,ws=null,wn=null;function Sh(e){if(wn&&typeof wn.onCommitFiberRoot=="function")try{wn.onCommitFiberRoot(ws,e,void 0,(e.current.flags&128)===128)}catch{}}var an=Math.clz32?Math.clz32:Eh,bh=Math.log,kh=Math.LN2;function Eh(e){return e>>>=0,e===0?32:31-(bh(e)/kh|0)|0}var Ss=64,bs=4194304;function wo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ks(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,l=e.suspendedLanes,c=e.pingedLanes,f=r&268435455;if(f!==0){var h=f&~l;h!==0?s=wo(h):(c&=f,c!==0&&(s=wo(c)))}else f=r&~l,f!==0?s=wo(f):c!==0&&(s=wo(c));if(s===0)return 0;if(t!==0&&t!==s&&(t&l)===0&&(l=s&-s,c=t&-t,l>=c||l===16&&(c&4194240)!==0))return t;if((s&4)!==0&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-an(t),l=1<<r,s|=e[r],t&=~l;return s}function Ch(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function _h(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,l=e.expirationTimes,c=e.pendingLanes;0<c;){var f=31-an(c),h=1<<f,y=l[f];y===-1?((h&r)===0||(h&s)!==0)&&(l[f]=Ch(h,t)):y<=t&&(e.expiredLanes|=h),c&=~h}}function al(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ku(){var e=Ss;return Ss<<=1,(Ss&4194240)===0&&(Ss=64),e}function ul(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function So(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-an(t),e[t]=r}function Nh(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var l=31-an(r),c=1<<l;t[l]=0,s[l]=-1,e[l]=-1,r&=~c}}function cl(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-an(r),l=1<<s;l&t|e[s]&t&&(e[s]|=t),r&=~l}}var Be=0;function Xu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Ju,dl,Zu,ec,tc,fl=!1,Es=[],qn=null,Yn=null,Qn=null,bo=new Map,ko=new Map,Kn=[],jh="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function nc(e,t){switch(e){case"focusin":case"focusout":qn=null;break;case"dragenter":case"dragleave":Yn=null;break;case"mouseover":case"mouseout":Qn=null;break;case"pointerover":case"pointerout":bo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ko.delete(t.pointerId)}}function Eo(e,t,r,s,l,c){return e===null||e.nativeEvent!==c?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:c,targetContainers:[l]},t!==null&&(t=zo(t),t!==null&&dl(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function Th(e,t,r,s,l){switch(t){case"focusin":return qn=Eo(qn,e,t,r,s,l),!0;case"dragenter":return Yn=Eo(Yn,e,t,r,s,l),!0;case"mouseover":return Qn=Eo(Qn,e,t,r,s,l),!0;case"pointerover":var c=l.pointerId;return bo.set(c,Eo(bo.get(c)||null,e,t,r,s,l)),!0;case"gotpointercapture":return c=l.pointerId,ko.set(c,Eo(ko.get(c)||null,e,t,r,s,l)),!0}return!1}function rc(e){var t=yr(e.target);if(t!==null){var r=gr(t);if(r!==null){if(t=r.tag,t===13){if(t=Uu(r),t!==null){e.blockedOn=t,tc(e.priority,function(){Zu(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Cs(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=hl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);je=s,r.target.dispatchEvent(s),je=null}else return t=zo(r),t!==null&&dl(t),e.blockedOn=r,!1;t.shift()}return!0}function oc(e,t,r){Cs(e)&&r.delete(t)}function Rh(){fl=!1,qn!==null&&Cs(qn)&&(qn=null),Yn!==null&&Cs(Yn)&&(Yn=null),Qn!==null&&Cs(Qn)&&(Qn=null),bo.forEach(oc),ko.forEach(oc)}function Co(e,t){e.blockedOn===t&&(e.blockedOn=null,fl||(fl=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,Rh)))}function _o(e){function t(l){return Co(l,e)}if(0<Es.length){Co(Es[0],e);for(var r=1;r<Es.length;r++){var s=Es[r];s.blockedOn===e&&(s.blockedOn=null)}}for(qn!==null&&Co(qn,e),Yn!==null&&Co(Yn,e),Qn!==null&&Co(Qn,e),bo.forEach(t),ko.forEach(t),r=0;r<Kn.length;r++)s=Kn[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<Kn.length&&(r=Kn[0],r.blockedOn===null);)rc(r),r.blockedOn===null&&Kn.shift()}var Or=Ce.ReactCurrentBatchConfig,_s=!0;function $h(e,t,r,s){var l=Be,c=Or.transition;Or.transition=null;try{Be=1,pl(e,t,r,s)}finally{Be=l,Or.transition=c}}function Ih(e,t,r,s){var l=Be,c=Or.transition;Or.transition=null;try{Be=4,pl(e,t,r,s)}finally{Be=l,Or.transition=c}}function pl(e,t,r,s){if(_s){var l=hl(e,t,r,s);if(l===null)$l(e,t,s,Ns,r),nc(e,s);else if(Th(l,e,t,r,s))s.stopPropagation();else if(nc(e,s),t&4&&-1<jh.indexOf(e)){for(;l!==null;){var c=zo(l);if(c!==null&&Ju(c),c=hl(e,t,r,s),c===null&&$l(e,t,s,Ns,r),c===l)break;l=c}l!==null&&s.stopPropagation()}else $l(e,t,s,null,r)}}var Ns=null;function hl(e,t,r,s){if(Ns=null,e=S(s),e=yr(e),e!==null)if(t=gr(e),t===null)e=null;else if(r=t.tag,r===13){if(e=Uu(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ns=e,null}function sc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vh()){case ll:return 1;case Yu:return 4;case vs:case wh:return 16;case Qu:return 536870912;default:return 16}default:return 16}}var Xn=null,ml=null,js=null;function ic(){if(js)return js;var e,t=ml,r=t.length,s,l="value"in Xn?Xn.value:Xn.textContent,c=l.length;for(e=0;e<r&&t[e]===l[e];e++);var f=r-e;for(s=1;s<=f&&t[r-s]===l[c-s];s++);return js=l.slice(e,1<s?1-s:void 0)}function Ts(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Rs(){return!0}function lc(){return!1}function qt(e){function t(r,s,l,c,f){this._reactName=r,this._targetInst=l,this.type=s,this.nativeEvent=c,this.target=f,this.currentTarget=null;for(var h in e)e.hasOwnProperty(h)&&(r=e[h],this[h]=r?r(c):c[h]);return this.isDefaultPrevented=(c.defaultPrevented!=null?c.defaultPrevented:c.returnValue===!1)?Rs:lc,this.isPropagationStopped=lc,this}return M(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Rs)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Rs)},persist:function(){},isPersistent:Rs}),t}var Lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gl=qt(Lr),No=M({},Lr,{view:0,detail:0}),Ah=qt(No),yl,xl,jo,$s=M({},No,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==jo&&(jo&&e.type==="mousemove"?(yl=e.screenX-jo.screenX,xl=e.screenY-jo.screenY):xl=yl=0,jo=e),yl)},movementY:function(e){return"movementY"in e?e.movementY:xl}}),ac=qt($s),Ph=M({},$s,{dataTransfer:0}),Oh=qt(Ph),Lh=M({},No,{relatedTarget:0}),vl=qt(Lh),Mh=M({},Lr,{animationName:0,elapsedTime:0,pseudoElement:0}),zh=qt(Mh),Fh=M({},Lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Dh=qt(Fh),Bh=M({},Lr,{data:0}),uc=qt(Bh),Uh={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Hh={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Vh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Vh[e])?!!t[e]:!1}function wl(){return Wh}var Gh=M({},No,{key:function(e){if(e.key){var t=Uh[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ts(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Hh[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wl,charCode:function(e){return e.type==="keypress"?Ts(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ts(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),qh=qt(Gh),Yh=M({},$s,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),cc=qt(Yh),Qh=M({},No,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wl}),Kh=qt(Qh),Xh=M({},Lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Jh=qt(Xh),Zh=M({},$s,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),em=qt(Zh),tm=[9,13,27,32],Sl=x&&"CompositionEvent"in window,To=null;x&&"documentMode"in document&&(To=document.documentMode);var nm=x&&"TextEvent"in window&&!To,dc=x&&(!Sl||To&&8<To&&11>=To),fc=" ",pc=!1;function hc(e,t){switch(e){case"keyup":return tm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Mr=!1;function rm(e,t){switch(e){case"compositionend":return mc(t);case"keypress":return t.which!==32?null:(pc=!0,fc);case"textInput":return e=t.data,e===fc&&pc?null:e;default:return null}}function om(e,t){if(Mr)return e==="compositionend"||!Sl&&hc(e,t)?(e=ic(),js=ml=Xn=null,Mr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return dc&&t.locale!=="ko"?null:t.data;default:return null}}var sm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!sm[e.type]:t==="textarea"}function yc(e,t,r,s){Ve(s),t=Ls(t,"onChange"),0<t.length&&(r=new gl("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var Ro=null,$o=null;function im(e){Oc(e,0)}function Is(e){var t=Ur(e);if(Et(t))return e}function lm(e,t){if(e==="change")return t}var xc=!1;if(x){var bl;if(x){var kl="oninput"in document;if(!kl){var vc=document.createElement("div");vc.setAttribute("oninput","return;"),kl=typeof vc.oninput=="function"}bl=kl}else bl=!1;xc=bl&&(!document.documentMode||9<document.documentMode)}function wc(){Ro&&(Ro.detachEvent("onpropertychange",Sc),$o=Ro=null)}function Sc(e){if(e.propertyName==="value"&&Is($o)){var t=[];yc(t,$o,e,S(e)),Gn(im,t)}}function am(e,t,r){e==="focusin"?(wc(),Ro=t,$o=r,Ro.attachEvent("onpropertychange",Sc)):e==="focusout"&&wc()}function um(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Is($o)}function cm(e,t){if(e==="click")return Is(t)}function dm(e,t){if(e==="input"||e==="change")return Is(t)}function fm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var un=typeof Object.is=="function"?Object.is:fm;function Io(e,t){if(un(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var l=r[s];if(!g.call(t,l)||!un(e[l],t[l]))return!1}return!0}function bc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function kc(e,t){var r=bc(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=bc(r)}}function Ec(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Ec(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Cc(){for(var e=window,t=dt();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=dt(e.document)}return t}function El(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function pm(e){var t=Cc(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Ec(r.ownerDocument.documentElement,r)){if(s!==null&&El(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=r.textContent.length,c=Math.min(s.start,l);s=s.end===void 0?c:Math.min(s.end,l),!e.extend&&c>s&&(l=s,s=c,c=l),l=kc(r,c);var f=kc(r,s);l&&f&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),c>s?(e.addRange(t),e.extend(f.node,f.offset)):(t.setEnd(f.node,f.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hm=x&&"documentMode"in document&&11>=document.documentMode,zr=null,Cl=null,Ao=null,_l=!1;function _c(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;_l||zr==null||zr!==dt(s)||(s=zr,"selectionStart"in s&&El(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Ao&&Io(Ao,s)||(Ao=s,s=Ls(Cl,"onSelect"),0<s.length&&(t=new gl("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=zr)))}function As(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var Fr={animationend:As("Animation","AnimationEnd"),animationiteration:As("Animation","AnimationIteration"),animationstart:As("Animation","AnimationStart"),transitionend:As("Transition","TransitionEnd")},Nl={},Nc={};x&&(Nc=document.createElement("div").style,"AnimationEvent"in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),"TransitionEvent"in window||delete Fr.transitionend.transition);function Ps(e){if(Nl[e])return Nl[e];if(!Fr[e])return e;var t=Fr[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in Nc)return Nl[e]=t[r];return e}var jc=Ps("animationend"),Tc=Ps("animationiteration"),Rc=Ps("animationstart"),$c=Ps("transitionend"),Ic=new Map,Ac="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Jn(e,t){Ic.set(e,t),p(t,[e])}for(var jl=0;jl<Ac.length;jl++){var Tl=Ac[jl],mm=Tl.toLowerCase(),gm=Tl[0].toUpperCase()+Tl.slice(1);Jn(mm,"on"+gm)}Jn(jc,"onAnimationEnd"),Jn(Tc,"onAnimationIteration"),Jn(Rc,"onAnimationStart"),Jn("dblclick","onDoubleClick"),Jn("focusin","onFocus"),Jn("focusout","onBlur"),Jn($c,"onTransitionEnd"),m("onMouseEnter",["mouseout","mouseover"]),m("onMouseLeave",["mouseout","mouseover"]),m("onPointerEnter",["pointerout","pointerover"]),m("onPointerLeave",["pointerout","pointerover"]),p("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),p("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),p("onBeforeInput",["compositionend","keypress","textInput","paste"]),p("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),p("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ym=new Set("cancel close invalid load scroll toggle".split(" ").concat(Po));function Pc(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,mh(s,t,void 0,e),e.currentTarget=null}function Oc(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],l=s.event;s=s.listeners;e:{var c=void 0;if(t)for(var f=s.length-1;0<=f;f--){var h=s[f],y=h.instance,E=h.currentTarget;if(h=h.listener,y!==c&&l.isPropagationStopped())break e;Pc(l,h,E),c=y}else for(f=0;f<s.length;f++){if(h=s[f],y=h.instance,E=h.currentTarget,h=h.listener,y!==c&&l.isPropagationStopped())break e;Pc(l,h,E),c=y}}}if(xs)throw e=il,xs=!1,il=null,e}function Ye(e,t){var r=t[Ml];r===void 0&&(r=t[Ml]=new Set);var s=e+"__bubble";r.has(s)||(Lc(t,e,2,!1),r.add(s))}function Rl(e,t,r){var s=0;t&&(s|=4),Lc(r,e,s,t)}var Os="_reactListening"+Math.random().toString(36).slice(2);function Oo(e){if(!e[Os]){e[Os]=!0,u.forEach(function(r){r!=="selectionchange"&&(ym.has(r)||Rl(r,!1,e),Rl(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Os]||(t[Os]=!0,Rl("selectionchange",!1,t))}}function Lc(e,t,r,s){switch(sc(t)){case 1:var l=$h;break;case 4:l=Ih;break;default:l=pl}r=l.bind(null,t,r,e),l=void 0,!yo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),s?l!==void 0?e.addEventListener(t,r,{capture:!0,passive:l}):e.addEventListener(t,r,!0):l!==void 0?e.addEventListener(t,r,{passive:l}):e.addEventListener(t,r,!1)}function $l(e,t,r,s,l){var c=s;if((t&1)===0&&(t&2)===0&&s!==null)e:for(;;){if(s===null)return;var f=s.tag;if(f===3||f===4){var h=s.stateNode.containerInfo;if(h===l||h.nodeType===8&&h.parentNode===l)break;if(f===4)for(f=s.return;f!==null;){var y=f.tag;if((y===3||y===4)&&(y=f.stateNode.containerInfo,y===l||y.nodeType===8&&y.parentNode===l))return;f=f.return}for(;h!==null;){if(f=yr(h),f===null)return;if(y=f.tag,y===5||y===6){s=c=f;continue e}h=h.parentNode}}s=s.return}Gn(function(){var E=c,F=S(r),B=[];e:{var z=Ic.get(e);if(z!==void 0){var ee=gl,ie=e;switch(e){case"keypress":if(Ts(r)===0)break e;case"keydown":case"keyup":ee=qh;break;case"focusin":ie="focus",ee=vl;break;case"focusout":ie="blur",ee=vl;break;case"beforeblur":case"afterblur":ee=vl;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ee=ac;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ee=Oh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ee=Kh;break;case jc:case Tc:case Rc:ee=zh;break;case $c:ee=Jh;break;case"scroll":ee=Ah;break;case"wheel":ee=em;break;case"copy":case"cut":case"paste":ee=Dh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ee=cc}var le=(t&4)!==0,it=!le&&e==="scroll",b=le?z!==null?z+"Capture":null:z;le=[];for(var v=E,k;v!==null;){k=v;var H=k.stateNode;if(k.tag===5&&H!==null&&(k=H,b!==null&&(H=$n(v,b),H!=null&&le.push(Lo(v,H,k)))),it)break;v=v.return}0<le.length&&(z=new ee(z,ie,null,r,F),B.push({event:z,listeners:le}))}}if((t&7)===0){e:{if(z=e==="mouseover"||e==="pointerover",ee=e==="mouseout"||e==="pointerout",z&&r!==je&&(ie=r.relatedTarget||r.fromElement)&&(yr(ie)||ie[In]))break e;if((ee||z)&&(z=F.window===F?F:(z=F.ownerDocument)?z.defaultView||z.parentWindow:window,ee?(ie=r.relatedTarget||r.toElement,ee=E,ie=ie?yr(ie):null,ie!==null&&(it=gr(ie),ie!==it||ie.tag!==5&&ie.tag!==6)&&(ie=null)):(ee=null,ie=E),ee!==ie)){if(le=ac,H="onMouseLeave",b="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(le=cc,H="onPointerLeave",b="onPointerEnter",v="pointer"),it=ee==null?z:Ur(ee),k=ie==null?z:Ur(ie),z=new le(H,v+"leave",ee,r,F),z.target=it,z.relatedTarget=k,H=null,yr(F)===E&&(le=new le(b,v+"enter",ie,r,F),le.target=k,le.relatedTarget=it,H=le),it=H,ee&&ie)t:{for(le=ee,b=ie,v=0,k=le;k;k=Dr(k))v++;for(k=0,H=b;H;H=Dr(H))k++;for(;0<v-k;)le=Dr(le),v--;for(;0<k-v;)b=Dr(b),k--;for(;v--;){if(le===b||b!==null&&le===b.alternate)break t;le=Dr(le),b=Dr(b)}le=null}else le=null;ee!==null&&Mc(B,z,ee,le,!1),ie!==null&&it!==null&&Mc(B,it,ie,le,!0)}}e:{if(z=E?Ur(E):window,ee=z.nodeName&&z.nodeName.toLowerCase(),ee==="select"||ee==="input"&&z.type==="file")var ce=lm;else if(gc(z))if(xc)ce=dm;else{ce=um;var ye=am}else(ee=z.nodeName)&&ee.toLowerCase()==="input"&&(z.type==="checkbox"||z.type==="radio")&&(ce=cm);if(ce&&(ce=ce(e,E))){yc(B,ce,r,F);break e}ye&&ye(e,z,E),e==="focusout"&&(ye=z._wrapperState)&&ye.controlled&&z.type==="number"&&Lt(z,"number",z.value)}switch(ye=E?Ur(E):window,e){case"focusin":(gc(ye)||ye.contentEditable==="true")&&(zr=ye,Cl=E,Ao=null);break;case"focusout":Ao=Cl=zr=null;break;case"mousedown":_l=!0;break;case"contextmenu":case"mouseup":case"dragend":_l=!1,_c(B,r,F);break;case"selectionchange":if(hm)break;case"keydown":case"keyup":_c(B,r,F)}var xe;if(Sl)e:{switch(e){case"compositionstart":var Se="onCompositionStart";break e;case"compositionend":Se="onCompositionEnd";break e;case"compositionupdate":Se="onCompositionUpdate";break e}Se=void 0}else Mr?hc(e,r)&&(Se="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(Se="onCompositionStart");Se&&(dc&&r.locale!=="ko"&&(Mr||Se!=="onCompositionStart"?Se==="onCompositionEnd"&&Mr&&(xe=ic()):(Xn=F,ml="value"in Xn?Xn.value:Xn.textContent,Mr=!0)),ye=Ls(E,Se),0<ye.length&&(Se=new uc(Se,e,null,r,F),B.push({event:Se,listeners:ye}),xe?Se.data=xe:(xe=mc(r),xe!==null&&(Se.data=xe)))),(xe=nm?rm(e,r):om(e,r))&&(E=Ls(E,"onBeforeInput"),0<E.length&&(F=new uc("onBeforeInput","beforeinput",null,r,F),B.push({event:F,listeners:E}),F.data=xe))}Oc(B,t)})}function Lo(e,t,r){return{instance:e,listener:t,currentTarget:r}}function Ls(e,t){for(var r=t+"Capture",s=[];e!==null;){var l=e,c=l.stateNode;l.tag===5&&c!==null&&(l=c,c=$n(e,r),c!=null&&s.unshift(Lo(e,c,l)),c=$n(e,t),c!=null&&s.push(Lo(e,c,l))),e=e.return}return s}function Dr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Mc(e,t,r,s,l){for(var c=t._reactName,f=[];r!==null&&r!==s;){var h=r,y=h.alternate,E=h.stateNode;if(y!==null&&y===s)break;h.tag===5&&E!==null&&(h=E,l?(y=$n(r,c),y!=null&&f.unshift(Lo(r,y,h))):l||(y=$n(r,c),y!=null&&f.push(Lo(r,y,h)))),r=r.return}f.length!==0&&e.push({event:t,listeners:f})}var xm=/\r\n?/g,vm=/\u0000|\uFFFD/g;function zc(e){return(typeof e=="string"?e:""+e).replace(xm,`
`).replace(vm,"")}function Ms(e,t,r){if(t=zc(t),zc(e)!==t&&r)throw Error(i(425))}function zs(){}var Il=null,Al=null;function Pl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ol=typeof setTimeout=="function"?setTimeout:void 0,wm=typeof clearTimeout=="function"?clearTimeout:void 0,Fc=typeof Promise=="function"?Promise:void 0,Sm=typeof queueMicrotask=="function"?queueMicrotask:typeof Fc<"u"?function(e){return Fc.resolve(null).then(e).catch(bm)}:Ol;function bm(e){setTimeout(function(){throw e})}function Ll(e,t){var r=t,s=0;do{var l=r.nextSibling;if(e.removeChild(r),l&&l.nodeType===8)if(r=l.data,r==="/$"){if(s===0){e.removeChild(l),_o(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=l}while(r);_o(t)}function Zn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Dc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var Br=Math.random().toString(36).slice(2),Sn="__reactFiber$"+Br,Mo="__reactProps$"+Br,In="__reactContainer$"+Br,Ml="__reactEvents$"+Br,km="__reactListeners$"+Br,Em="__reactHandles$"+Br;function yr(e){var t=e[Sn];if(t)return t;for(var r=e.parentNode;r;){if(t=r[In]||r[Sn]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Dc(e);e!==null;){if(r=e[Sn])return r;e=Dc(e)}return t}e=r,r=e.parentNode}return null}function zo(e){return e=e[Sn]||e[In],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ur(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(i(33))}function Fs(e){return e[Mo]||null}var zl=[],Hr=-1;function er(e){return{current:e}}function Qe(e){0>Hr||(e.current=zl[Hr],zl[Hr]=null,Hr--)}function qe(e,t){Hr++,zl[Hr]=e.current,e.current=t}var tr={},_t=er(tr),Ft=er(!1),xr=tr;function Vr(e,t){var r=e.type.contextTypes;if(!r)return tr;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var l={},c;for(c in r)l[c]=t[c];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Dt(e){return e=e.childContextTypes,e!=null}function Ds(){Qe(Ft),Qe(_t)}function Bc(e,t,r){if(_t.current!==tr)throw Error(i(168));qe(_t,t),qe(Ft,r)}function Uc(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var l in s)if(!(l in t))throw Error(i(108,be(e)||"Unknown",l));return M({},r,s)}function Bs(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||tr,xr=_t.current,qe(_t,e),qe(Ft,Ft.current),!0}function Hc(e,t,r){var s=e.stateNode;if(!s)throw Error(i(169));r?(e=Uc(e,t,xr),s.__reactInternalMemoizedMergedChildContext=e,Qe(Ft),Qe(_t),qe(_t,e)):Qe(Ft),qe(Ft,r)}var An=null,Us=!1,Fl=!1;function Vc(e){An===null?An=[e]:An.push(e)}function Cm(e){Us=!0,Vc(e)}function nr(){if(!Fl&&An!==null){Fl=!0;var e=0,t=Be;try{var r=An;for(Be=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}An=null,Us=!1}catch(l){throw An!==null&&(An=An.slice(e+1)),Gu(ll,nr),l}finally{Be=t,Fl=!1}}return null}var Wr=[],Gr=0,Hs=null,Vs=0,Zt=[],en=0,vr=null,Pn=1,On="";function wr(e,t){Wr[Gr++]=Vs,Wr[Gr++]=Hs,Hs=e,Vs=t}function Wc(e,t,r){Zt[en++]=Pn,Zt[en++]=On,Zt[en++]=vr,vr=e;var s=Pn;e=On;var l=32-an(s)-1;s&=~(1<<l),r+=1;var c=32-an(t)+l;if(30<c){var f=l-l%5;c=(s&(1<<f)-1).toString(32),s>>=f,l-=f,Pn=1<<32-an(t)+l|r<<l|s,On=c+e}else Pn=1<<c|r<<l|s,On=e}function Dl(e){e.return!==null&&(wr(e,1),Wc(e,1,0))}function Bl(e){for(;e===Hs;)Hs=Wr[--Gr],Wr[Gr]=null,Vs=Wr[--Gr],Wr[Gr]=null;for(;e===vr;)vr=Zt[--en],Zt[en]=null,On=Zt[--en],Zt[en]=null,Pn=Zt[--en],Zt[en]=null}var Yt=null,Qt=null,Je=!1,cn=null;function Gc(e,t){var r=on(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function qc(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Yt=e,Qt=Zn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Yt=e,Qt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=vr!==null?{id:Pn,overflow:On}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=on(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Yt=e,Qt=null,!0):!1;default:return!1}}function Ul(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Hl(e){if(Je){var t=Qt;if(t){var r=t;if(!qc(e,t)){if(Ul(e))throw Error(i(418));t=Zn(r.nextSibling);var s=Yt;t&&qc(e,t)?Gc(s,r):(e.flags=e.flags&-4097|2,Je=!1,Yt=e)}}else{if(Ul(e))throw Error(i(418));e.flags=e.flags&-4097|2,Je=!1,Yt=e}}}function Yc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Yt=e}function Ws(e){if(e!==Yt)return!1;if(!Je)return Yc(e),Je=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Pl(e.type,e.memoizedProps)),t&&(t=Qt)){if(Ul(e))throw Qc(),Error(i(418));for(;t;)Gc(e,t),t=Zn(t.nextSibling)}if(Yc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(i(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){Qt=Zn(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}Qt=null}}else Qt=Yt?Zn(e.stateNode.nextSibling):null;return!0}function Qc(){for(var e=Qt;e;)e=Zn(e.nextSibling)}function qr(){Qt=Yt=null,Je=!1}function Vl(e){cn===null?cn=[e]:cn.push(e)}var _m=Ce.ReactCurrentBatchConfig;function Fo(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(i(309));var s=r.stateNode}if(!s)throw Error(i(147,e));var l=s,c=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===c?t.ref:(t=function(f){var h=l.refs;f===null?delete h[c]:h[c]=f},t._stringRef=c,t)}if(typeof e!="string")throw Error(i(284));if(!r._owner)throw Error(i(290,e))}return e}function Gs(e,t){throw e=Object.prototype.toString.call(t),Error(i(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Kc(e){var t=e._init;return t(e._payload)}function Xc(e){function t(b,v){if(e){var k=b.deletions;k===null?(b.deletions=[v],b.flags|=16):k.push(v)}}function r(b,v){if(!e)return null;for(;v!==null;)t(b,v),v=v.sibling;return null}function s(b,v){for(b=new Map;v!==null;)v.key!==null?b.set(v.key,v):b.set(v.index,v),v=v.sibling;return b}function l(b,v){return b=cr(b,v),b.index=0,b.sibling=null,b}function c(b,v,k){return b.index=k,e?(k=b.alternate,k!==null?(k=k.index,k<v?(b.flags|=2,v):k):(b.flags|=2,v)):(b.flags|=1048576,v)}function f(b){return e&&b.alternate===null&&(b.flags|=2),b}function h(b,v,k,H){return v===null||v.tag!==6?(v=Oa(k,b.mode,H),v.return=b,v):(v=l(v,k),v.return=b,v)}function y(b,v,k,H){var ce=k.type;return ce===re?F(b,v,k.props.children,H,k.key):v!==null&&(v.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===Le&&Kc(ce)===v.type)?(H=l(v,k.props),H.ref=Fo(b,v,k),H.return=b,H):(H=gi(k.type,k.key,k.props,null,b.mode,H),H.ref=Fo(b,v,k),H.return=b,H)}function E(b,v,k,H){return v===null||v.tag!==4||v.stateNode.containerInfo!==k.containerInfo||v.stateNode.implementation!==k.implementation?(v=La(k,b.mode,H),v.return=b,v):(v=l(v,k.children||[]),v.return=b,v)}function F(b,v,k,H,ce){return v===null||v.tag!==7?(v=jr(k,b.mode,H,ce),v.return=b,v):(v=l(v,k),v.return=b,v)}function B(b,v,k){if(typeof v=="string"&&v!==""||typeof v=="number")return v=Oa(""+v,b.mode,k),v.return=b,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case _e:return k=gi(v.type,v.key,v.props,null,b.mode,k),k.ref=Fo(b,null,v),k.return=b,k;case ve:return v=La(v,b.mode,k),v.return=b,v;case Le:var H=v._init;return B(b,H(v._payload),k)}if(wt(v)||ne(v))return v=jr(v,b.mode,k,null),v.return=b,v;Gs(b,v)}return null}function z(b,v,k,H){var ce=v!==null?v.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return ce!==null?null:h(b,v,""+k,H);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case _e:return k.key===ce?y(b,v,k,H):null;case ve:return k.key===ce?E(b,v,k,H):null;case Le:return ce=k._init,z(b,v,ce(k._payload),H)}if(wt(k)||ne(k))return ce!==null?null:F(b,v,k,H,null);Gs(b,k)}return null}function ee(b,v,k,H,ce){if(typeof H=="string"&&H!==""||typeof H=="number")return b=b.get(k)||null,h(v,b,""+H,ce);if(typeof H=="object"&&H!==null){switch(H.$$typeof){case _e:return b=b.get(H.key===null?k:H.key)||null,y(v,b,H,ce);case ve:return b=b.get(H.key===null?k:H.key)||null,E(v,b,H,ce);case Le:var ye=H._init;return ee(b,v,k,ye(H._payload),ce)}if(wt(H)||ne(H))return b=b.get(k)||null,F(v,b,H,ce,null);Gs(v,H)}return null}function ie(b,v,k,H){for(var ce=null,ye=null,xe=v,Se=v=0,xt=null;xe!==null&&Se<k.length;Se++){xe.index>Se?(xt=xe,xe=null):xt=xe.sibling;var ze=z(b,xe,k[Se],H);if(ze===null){xe===null&&(xe=xt);break}e&&xe&&ze.alternate===null&&t(b,xe),v=c(ze,v,Se),ye===null?ce=ze:ye.sibling=ze,ye=ze,xe=xt}if(Se===k.length)return r(b,xe),Je&&wr(b,Se),ce;if(xe===null){for(;Se<k.length;Se++)xe=B(b,k[Se],H),xe!==null&&(v=c(xe,v,Se),ye===null?ce=xe:ye.sibling=xe,ye=xe);return Je&&wr(b,Se),ce}for(xe=s(b,xe);Se<k.length;Se++)xt=ee(xe,b,Se,k[Se],H),xt!==null&&(e&&xt.alternate!==null&&xe.delete(xt.key===null?Se:xt.key),v=c(xt,v,Se),ye===null?ce=xt:ye.sibling=xt,ye=xt);return e&&xe.forEach(function(dr){return t(b,dr)}),Je&&wr(b,Se),ce}function le(b,v,k,H){var ce=ne(k);if(typeof ce!="function")throw Error(i(150));if(k=ce.call(k),k==null)throw Error(i(151));for(var ye=ce=null,xe=v,Se=v=0,xt=null,ze=k.next();xe!==null&&!ze.done;Se++,ze=k.next()){xe.index>Se?(xt=xe,xe=null):xt=xe.sibling;var dr=z(b,xe,ze.value,H);if(dr===null){xe===null&&(xe=xt);break}e&&xe&&dr.alternate===null&&t(b,xe),v=c(dr,v,Se),ye===null?ce=dr:ye.sibling=dr,ye=dr,xe=xt}if(ze.done)return r(b,xe),Je&&wr(b,Se),ce;if(xe===null){for(;!ze.done;Se++,ze=k.next())ze=B(b,ze.value,H),ze!==null&&(v=c(ze,v,Se),ye===null?ce=ze:ye.sibling=ze,ye=ze);return Je&&wr(b,Se),ce}for(xe=s(b,xe);!ze.done;Se++,ze=k.next())ze=ee(xe,b,Se,ze.value,H),ze!==null&&(e&&ze.alternate!==null&&xe.delete(ze.key===null?Se:ze.key),v=c(ze,v,Se),ye===null?ce=ze:ye.sibling=ze,ye=ze);return e&&xe.forEach(function(sg){return t(b,sg)}),Je&&wr(b,Se),ce}function it(b,v,k,H){if(typeof k=="object"&&k!==null&&k.type===re&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case _e:e:{for(var ce=k.key,ye=v;ye!==null;){if(ye.key===ce){if(ce=k.type,ce===re){if(ye.tag===7){r(b,ye.sibling),v=l(ye,k.props.children),v.return=b,b=v;break e}}else if(ye.elementType===ce||typeof ce=="object"&&ce!==null&&ce.$$typeof===Le&&Kc(ce)===ye.type){r(b,ye.sibling),v=l(ye,k.props),v.ref=Fo(b,ye,k),v.return=b,b=v;break e}r(b,ye);break}else t(b,ye);ye=ye.sibling}k.type===re?(v=jr(k.props.children,b.mode,H,k.key),v.return=b,b=v):(H=gi(k.type,k.key,k.props,null,b.mode,H),H.ref=Fo(b,v,k),H.return=b,b=H)}return f(b);case ve:e:{for(ye=k.key;v!==null;){if(v.key===ye)if(v.tag===4&&v.stateNode.containerInfo===k.containerInfo&&v.stateNode.implementation===k.implementation){r(b,v.sibling),v=l(v,k.children||[]),v.return=b,b=v;break e}else{r(b,v);break}else t(b,v);v=v.sibling}v=La(k,b.mode,H),v.return=b,b=v}return f(b);case Le:return ye=k._init,it(b,v,ye(k._payload),H)}if(wt(k))return ie(b,v,k,H);if(ne(k))return le(b,v,k,H);Gs(b,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,v!==null&&v.tag===6?(r(b,v.sibling),v=l(v,k),v.return=b,b=v):(r(b,v),v=Oa(k,b.mode,H),v.return=b,b=v),f(b)):r(b,v)}return it}var Yr=Xc(!0),Jc=Xc(!1),qs=er(null),Ys=null,Qr=null,Wl=null;function Gl(){Wl=Qr=Ys=null}function ql(e){var t=qs.current;Qe(qs),e._currentValue=t}function Yl(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function Kr(e,t){Ys=e,Wl=Qr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&(Bt=!0),e.firstContext=null)}function tn(e){var t=e._currentValue;if(Wl!==e)if(e={context:e,memoizedValue:t,next:null},Qr===null){if(Ys===null)throw Error(i(308));Qr=e,Ys.dependencies={lanes:0,firstContext:e}}else Qr=Qr.next=e;return t}var Sr=null;function Ql(e){Sr===null?Sr=[e]:Sr.push(e)}function Zc(e,t,r,s){var l=t.interleaved;return l===null?(r.next=r,Ql(t)):(r.next=l.next,l.next=r),t.interleaved=r,Ln(e,s)}function Ln(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var rr=!1;function Kl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ed(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Mn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function or(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,(Me&2)!==0){var l=s.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),s.pending=t,Ln(e,r)}return l=s.interleaved,l===null?(t.next=t,Ql(s)):(t.next=l.next,l.next=t),s.interleaved=t,Ln(e,r)}function Qs(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,cl(e,r)}}function td(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var l=null,c=null;if(r=r.firstBaseUpdate,r!==null){do{var f={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};c===null?l=c=f:c=c.next=f,r=r.next}while(r!==null);c===null?l=c=t:c=c.next=t}else l=c=t;r={baseState:s.baseState,firstBaseUpdate:l,lastBaseUpdate:c,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function Ks(e,t,r,s){var l=e.updateQueue;rr=!1;var c=l.firstBaseUpdate,f=l.lastBaseUpdate,h=l.shared.pending;if(h!==null){l.shared.pending=null;var y=h,E=y.next;y.next=null,f===null?c=E:f.next=E,f=y;var F=e.alternate;F!==null&&(F=F.updateQueue,h=F.lastBaseUpdate,h!==f&&(h===null?F.firstBaseUpdate=E:h.next=E,F.lastBaseUpdate=y))}if(c!==null){var B=l.baseState;f=0,F=E=y=null,h=c;do{var z=h.lane,ee=h.eventTime;if((s&z)===z){F!==null&&(F=F.next={eventTime:ee,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,next:null});e:{var ie=e,le=h;switch(z=t,ee=r,le.tag){case 1:if(ie=le.payload,typeof ie=="function"){B=ie.call(ee,B,z);break e}B=ie;break e;case 3:ie.flags=ie.flags&-65537|128;case 0:if(ie=le.payload,z=typeof ie=="function"?ie.call(ee,B,z):ie,z==null)break e;B=M({},B,z);break e;case 2:rr=!0}}h.callback!==null&&h.lane!==0&&(e.flags|=64,z=l.effects,z===null?l.effects=[h]:z.push(h))}else ee={eventTime:ee,lane:z,tag:h.tag,payload:h.payload,callback:h.callback,next:null},F===null?(E=F=ee,y=B):F=F.next=ee,f|=z;if(h=h.next,h===null){if(h=l.shared.pending,h===null)break;z=h,h=z.next,z.next=null,l.lastBaseUpdate=z,l.shared.pending=null}}while(!0);if(F===null&&(y=B),l.baseState=y,l.firstBaseUpdate=E,l.lastBaseUpdate=F,t=l.shared.interleaved,t!==null){l=t;do f|=l.lane,l=l.next;while(l!==t)}else c===null&&(l.shared.lanes=0);Er|=f,e.lanes=f,e.memoizedState=B}}function nd(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],l=s.callback;if(l!==null){if(s.callback=null,s=r,typeof l!="function")throw Error(i(191,l));l.call(s)}}}var Do={},bn=er(Do),Bo=er(Do),Uo=er(Do);function br(e){if(e===Do)throw Error(i(174));return e}function Xl(e,t){switch(qe(Uo,t),qe(Bo,e),qe(bn,Do),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Mt(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Mt(t,e)}Qe(bn),qe(bn,t)}function Xr(){Qe(bn),Qe(Bo),Qe(Uo)}function rd(e){br(Uo.current);var t=br(bn.current),r=Mt(t,e.type);t!==r&&(qe(Bo,e),qe(bn,r))}function Jl(e){Bo.current===e&&(Qe(bn),Qe(Bo))}var et=er(0);function Xs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Zl=[];function ea(){for(var e=0;e<Zl.length;e++)Zl[e]._workInProgressVersionPrimary=null;Zl.length=0}var Js=Ce.ReactCurrentDispatcher,ta=Ce.ReactCurrentBatchConfig,kr=0,tt=null,ft=null,gt=null,Zs=!1,Ho=!1,Vo=0,Nm=0;function Nt(){throw Error(i(321))}function na(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!un(e[r],t[r]))return!1;return!0}function ra(e,t,r,s,l,c){if(kr=c,tt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Js.current=e===null||e.memoizedState===null?$m:Im,e=r(s,l),Ho){c=0;do{if(Ho=!1,Vo=0,25<=c)throw Error(i(301));c+=1,gt=ft=null,t.updateQueue=null,Js.current=Am,e=r(s,l)}while(Ho)}if(Js.current=ni,t=ft!==null&&ft.next!==null,kr=0,gt=ft=tt=null,Zs=!1,t)throw Error(i(300));return e}function oa(){var e=Vo!==0;return Vo=0,e}function kn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gt===null?tt.memoizedState=gt=e:gt=gt.next=e,gt}function nn(){if(ft===null){var e=tt.alternate;e=e!==null?e.memoizedState:null}else e=ft.next;var t=gt===null?tt.memoizedState:gt.next;if(t!==null)gt=t,ft=e;else{if(e===null)throw Error(i(310));ft=e,e={memoizedState:ft.memoizedState,baseState:ft.baseState,baseQueue:ft.baseQueue,queue:ft.queue,next:null},gt===null?tt.memoizedState=gt=e:gt=gt.next=e}return gt}function Wo(e,t){return typeof t=="function"?t(e):t}function sa(e){var t=nn(),r=t.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=ft,l=s.baseQueue,c=r.pending;if(c!==null){if(l!==null){var f=l.next;l.next=c.next,c.next=f}s.baseQueue=l=c,r.pending=null}if(l!==null){c=l.next,s=s.baseState;var h=f=null,y=null,E=c;do{var F=E.lane;if((kr&F)===F)y!==null&&(y=y.next={lane:0,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null}),s=E.hasEagerState?E.eagerState:e(s,E.action);else{var B={lane:F,action:E.action,hasEagerState:E.hasEagerState,eagerState:E.eagerState,next:null};y===null?(h=y=B,f=s):y=y.next=B,tt.lanes|=F,Er|=F}E=E.next}while(E!==null&&E!==c);y===null?f=s:y.next=h,un(s,t.memoizedState)||(Bt=!0),t.memoizedState=s,t.baseState=f,t.baseQueue=y,r.lastRenderedState=s}if(e=r.interleaved,e!==null){l=e;do c=l.lane,tt.lanes|=c,Er|=c,l=l.next;while(l!==e)}else l===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function ia(e){var t=nn(),r=t.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=e;var s=r.dispatch,l=r.pending,c=t.memoizedState;if(l!==null){r.pending=null;var f=l=l.next;do c=e(c,f.action),f=f.next;while(f!==l);un(c,t.memoizedState)||(Bt=!0),t.memoizedState=c,t.baseQueue===null&&(t.baseState=c),r.lastRenderedState=c}return[c,s]}function od(){}function sd(e,t){var r=tt,s=nn(),l=t(),c=!un(s.memoizedState,l);if(c&&(s.memoizedState=l,Bt=!0),s=s.queue,la(ad.bind(null,r,s,e),[e]),s.getSnapshot!==t||c||gt!==null&&gt.memoizedState.tag&1){if(r.flags|=2048,Go(9,ld.bind(null,r,s,l,t),void 0,null),yt===null)throw Error(i(349));(kr&30)!==0||id(r,t,l)}return l}function id(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=tt.updateQueue,t===null?(t={lastEffect:null,stores:null},tt.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function ld(e,t,r,s){t.value=r,t.getSnapshot=s,ud(t)&&cd(e)}function ad(e,t,r){return r(function(){ud(t)&&cd(e)})}function ud(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!un(e,r)}catch{return!0}}function cd(e){var t=Ln(e,1);t!==null&&hn(t,e,1,-1)}function dd(e){var t=kn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Wo,lastRenderedState:e},t.queue=e,e=e.dispatch=Rm.bind(null,tt,e),[t.memoizedState,e]}function Go(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=tt.updateQueue,t===null?(t={lastEffect:null,stores:null},tt.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function fd(){return nn().memoizedState}function ei(e,t,r,s){var l=kn();tt.flags|=e,l.memoizedState=Go(1|t,r,void 0,s===void 0?null:s)}function ti(e,t,r,s){var l=nn();s=s===void 0?null:s;var c=void 0;if(ft!==null){var f=ft.memoizedState;if(c=f.destroy,s!==null&&na(s,f.deps)){l.memoizedState=Go(t,r,c,s);return}}tt.flags|=e,l.memoizedState=Go(1|t,r,c,s)}function pd(e,t){return ei(8390656,8,e,t)}function la(e,t){return ti(2048,8,e,t)}function hd(e,t){return ti(4,2,e,t)}function md(e,t){return ti(4,4,e,t)}function gd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function yd(e,t,r){return r=r!=null?r.concat([e]):null,ti(4,4,gd.bind(null,t,e),r)}function aa(){}function xd(e,t){var r=nn();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&na(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function vd(e,t){var r=nn();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&na(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function wd(e,t,r){return(kr&21)===0?(e.baseState&&(e.baseState=!1,Bt=!0),e.memoizedState=r):(un(r,t)||(r=Ku(),tt.lanes|=r,Er|=r,e.baseState=!0),t)}function jm(e,t){var r=Be;Be=r!==0&&4>r?r:4,e(!0);var s=ta.transition;ta.transition={};try{e(!1),t()}finally{Be=r,ta.transition=s}}function Sd(){return nn().memoizedState}function Tm(e,t,r){var s=ar(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},bd(e))kd(t,r);else if(r=Zc(e,t,r,s),r!==null){var l=It();hn(r,e,s,l),Ed(r,t,s)}}function Rm(e,t,r){var s=ar(e),l={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(bd(e))kd(t,l);else{var c=e.alternate;if(e.lanes===0&&(c===null||c.lanes===0)&&(c=t.lastRenderedReducer,c!==null))try{var f=t.lastRenderedState,h=c(f,r);if(l.hasEagerState=!0,l.eagerState=h,un(h,f)){var y=t.interleaved;y===null?(l.next=l,Ql(t)):(l.next=y.next,y.next=l),t.interleaved=l;return}}catch{}finally{}r=Zc(e,t,l,s),r!==null&&(l=It(),hn(r,e,s,l),Ed(r,t,s))}}function bd(e){var t=e.alternate;return e===tt||t!==null&&t===tt}function kd(e,t){Ho=Zs=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function Ed(e,t,r){if((r&4194240)!==0){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,cl(e,r)}}var ni={readContext:tn,useCallback:Nt,useContext:Nt,useEffect:Nt,useImperativeHandle:Nt,useInsertionEffect:Nt,useLayoutEffect:Nt,useMemo:Nt,useReducer:Nt,useRef:Nt,useState:Nt,useDebugValue:Nt,useDeferredValue:Nt,useTransition:Nt,useMutableSource:Nt,useSyncExternalStore:Nt,useId:Nt,unstable_isNewReconciler:!1},$m={readContext:tn,useCallback:function(e,t){return kn().memoizedState=[e,t===void 0?null:t],e},useContext:tn,useEffect:pd,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,ei(4194308,4,gd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return ei(4194308,4,e,t)},useInsertionEffect:function(e,t){return ei(4,2,e,t)},useMemo:function(e,t){var r=kn();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=kn();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=Tm.bind(null,tt,e),[s.memoizedState,e]},useRef:function(e){var t=kn();return e={current:e},t.memoizedState=e},useState:dd,useDebugValue:aa,useDeferredValue:function(e){return kn().memoizedState=e},useTransition:function(){var e=dd(!1),t=e[0];return e=jm.bind(null,e[1]),kn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=tt,l=kn();if(Je){if(r===void 0)throw Error(i(407));r=r()}else{if(r=t(),yt===null)throw Error(i(349));(kr&30)!==0||id(s,t,r)}l.memoizedState=r;var c={value:r,getSnapshot:t};return l.queue=c,pd(ad.bind(null,s,c,e),[e]),s.flags|=2048,Go(9,ld.bind(null,s,c,r,t),void 0,null),r},useId:function(){var e=kn(),t=yt.identifierPrefix;if(Je){var r=On,s=Pn;r=(s&~(1<<32-an(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=Vo++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=Nm++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Im={readContext:tn,useCallback:xd,useContext:tn,useEffect:la,useImperativeHandle:yd,useInsertionEffect:hd,useLayoutEffect:md,useMemo:vd,useReducer:sa,useRef:fd,useState:function(){return sa(Wo)},useDebugValue:aa,useDeferredValue:function(e){var t=nn();return wd(t,ft.memoizedState,e)},useTransition:function(){var e=sa(Wo)[0],t=nn().memoizedState;return[e,t]},useMutableSource:od,useSyncExternalStore:sd,useId:Sd,unstable_isNewReconciler:!1},Am={readContext:tn,useCallback:xd,useContext:tn,useEffect:la,useImperativeHandle:yd,useInsertionEffect:hd,useLayoutEffect:md,useMemo:vd,useReducer:ia,useRef:fd,useState:function(){return ia(Wo)},useDebugValue:aa,useDeferredValue:function(e){var t=nn();return ft===null?t.memoizedState=e:wd(t,ft.memoizedState,e)},useTransition:function(){var e=ia(Wo)[0],t=nn().memoizedState;return[e,t]},useMutableSource:od,useSyncExternalStore:sd,useId:Sd,unstable_isNewReconciler:!1};function dn(e,t){if(e&&e.defaultProps){t=M({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function ua(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:M({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var ri={isMounted:function(e){return(e=e._reactInternals)?gr(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=It(),l=ar(e),c=Mn(s,l);c.payload=t,r!=null&&(c.callback=r),t=or(e,c,l),t!==null&&(hn(t,e,l,s),Qs(t,e,l))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=It(),l=ar(e),c=Mn(s,l);c.tag=1,c.payload=t,r!=null&&(c.callback=r),t=or(e,c,l),t!==null&&(hn(t,e,l,s),Qs(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=It(),s=ar(e),l=Mn(r,s);l.tag=2,t!=null&&(l.callback=t),t=or(e,l,s),t!==null&&(hn(t,e,s,r),Qs(t,e,s))}};function Cd(e,t,r,s,l,c,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,c,f):t.prototype&&t.prototype.isPureReactComponent?!Io(r,s)||!Io(l,c):!0}function _d(e,t,r){var s=!1,l=tr,c=t.contextType;return typeof c=="object"&&c!==null?c=tn(c):(l=Dt(t)?xr:_t.current,s=t.contextTypes,c=(s=s!=null)?Vr(e,l):tr),t=new t(r,c),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ri,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=c),t}function Nd(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&ri.enqueueReplaceState(t,t.state,null)}function ca(e,t,r,s){var l=e.stateNode;l.props=r,l.state=e.memoizedState,l.refs={},Kl(e);var c=t.contextType;typeof c=="object"&&c!==null?l.context=tn(c):(c=Dt(t)?xr:_t.current,l.context=Vr(e,c)),l.state=e.memoizedState,c=t.getDerivedStateFromProps,typeof c=="function"&&(ua(e,t,c,r),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&ri.enqueueReplaceState(l,l.state,null),Ks(e,r,l,s),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Jr(e,t){try{var r="",s=t;do r+=N(s),s=s.return;while(s);var l=r}catch(c){l=`
Error generating stack: `+c.message+`
`+c.stack}return{value:e,source:t,stack:l,digest:null}}function da(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function fa(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var Pm=typeof WeakMap=="function"?WeakMap:Map;function jd(e,t,r){r=Mn(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){ci||(ci=!0,Na=s),fa(e,t)},r}function Td(e,t,r){r=Mn(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var l=t.value;r.payload=function(){return s(l)},r.callback=function(){fa(e,t)}}var c=e.stateNode;return c!==null&&typeof c.componentDidCatch=="function"&&(r.callback=function(){fa(e,t),typeof s!="function"&&(ir===null?ir=new Set([this]):ir.add(this));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),r}function Rd(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new Pm;var l=new Set;s.set(t,l)}else l=s.get(t),l===void 0&&(l=new Set,s.set(t,l));l.has(r)||(l.add(r),e=Ym.bind(null,e,t,r),t.then(e,e))}function $d(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Id(e,t,r,s,l){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=Mn(-1,1),t.tag=2,or(r,t,1))),r.lanes|=1),e):(e.flags|=65536,e.lanes=l,e)}var Om=Ce.ReactCurrentOwner,Bt=!1;function $t(e,t,r,s){t.child=e===null?Jc(t,null,r,s):Yr(t,e.child,r,s)}function Ad(e,t,r,s,l){r=r.render;var c=t.ref;return Kr(t,l),s=ra(e,t,r,s,c,l),r=oa(),e!==null&&!Bt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zn(e,t,l)):(Je&&r&&Dl(t),t.flags|=1,$t(e,t,s,l),t.child)}function Pd(e,t,r,s,l){if(e===null){var c=r.type;return typeof c=="function"&&!Pa(c)&&c.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=c,Od(e,t,c,s,l)):(e=gi(r.type,null,s,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(c=e.child,(e.lanes&l)===0){var f=c.memoizedProps;if(r=r.compare,r=r!==null?r:Io,r(f,s)&&e.ref===t.ref)return zn(e,t,l)}return t.flags|=1,e=cr(c,s),e.ref=t.ref,e.return=t,t.child=e}function Od(e,t,r,s,l){if(e!==null){var c=e.memoizedProps;if(Io(c,s)&&e.ref===t.ref)if(Bt=!1,t.pendingProps=s=c,(e.lanes&l)!==0)(e.flags&131072)!==0&&(Bt=!0);else return t.lanes=e.lanes,zn(e,t,l)}return pa(e,t,r,s,l)}function Ld(e,t,r){var s=t.pendingProps,l=s.children,c=e!==null?e.memoizedState:null;if(s.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},qe(eo,Kt),Kt|=r;else{if((r&1073741824)===0)return e=c!==null?c.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,qe(eo,Kt),Kt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=c!==null?c.baseLanes:r,qe(eo,Kt),Kt|=s}else c!==null?(s=c.baseLanes|r,t.memoizedState=null):s=r,qe(eo,Kt),Kt|=s;return $t(e,t,l,r),t.child}function Md(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function pa(e,t,r,s,l){var c=Dt(r)?xr:_t.current;return c=Vr(t,c),Kr(t,l),r=ra(e,t,r,s,c,l),s=oa(),e!==null&&!Bt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,zn(e,t,l)):(Je&&s&&Dl(t),t.flags|=1,$t(e,t,r,l),t.child)}function zd(e,t,r,s,l){if(Dt(r)){var c=!0;Bs(t)}else c=!1;if(Kr(t,l),t.stateNode===null)si(e,t),_d(t,r,s),ca(t,r,s,l),s=!0;else if(e===null){var f=t.stateNode,h=t.memoizedProps;f.props=h;var y=f.context,E=r.contextType;typeof E=="object"&&E!==null?E=tn(E):(E=Dt(r)?xr:_t.current,E=Vr(t,E));var F=r.getDerivedStateFromProps,B=typeof F=="function"||typeof f.getSnapshotBeforeUpdate=="function";B||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==s||y!==E)&&Nd(t,f,s,E),rr=!1;var z=t.memoizedState;f.state=z,Ks(t,s,f,l),y=t.memoizedState,h!==s||z!==y||Ft.current||rr?(typeof F=="function"&&(ua(t,r,F,s),y=t.memoizedState),(h=rr||Cd(t,r,h,s,z,y,E))?(B||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=y),f.props=s,f.state=y,f.context=E,s=h):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{f=t.stateNode,ed(e,t),h=t.memoizedProps,E=t.type===t.elementType?h:dn(t.type,h),f.props=E,B=t.pendingProps,z=f.context,y=r.contextType,typeof y=="object"&&y!==null?y=tn(y):(y=Dt(r)?xr:_t.current,y=Vr(t,y));var ee=r.getDerivedStateFromProps;(F=typeof ee=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(h!==B||z!==y)&&Nd(t,f,s,y),rr=!1,z=t.memoizedState,f.state=z,Ks(t,s,f,l);var ie=t.memoizedState;h!==B||z!==ie||Ft.current||rr?(typeof ee=="function"&&(ua(t,r,ee,s),ie=t.memoizedState),(E=rr||Cd(t,r,E,s,z,ie,y)||!1)?(F||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(s,ie,y),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(s,ie,y)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&z===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&z===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=ie),f.props=s,f.state=ie,f.context=y,s=E):(typeof f.componentDidUpdate!="function"||h===e.memoizedProps&&z===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||h===e.memoizedProps&&z===e.memoizedState||(t.flags|=1024),s=!1)}return ha(e,t,r,s,c,l)}function ha(e,t,r,s,l,c){Md(e,t);var f=(t.flags&128)!==0;if(!s&&!f)return l&&Hc(t,r,!1),zn(e,t,c);s=t.stateNode,Om.current=t;var h=f&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&f?(t.child=Yr(t,e.child,null,c),t.child=Yr(t,null,h,c)):$t(e,t,h,c),t.memoizedState=s.state,l&&Hc(t,r,!0),t.child}function Fd(e){var t=e.stateNode;t.pendingContext?Bc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Bc(e,t.context,!1),Xl(e,t.containerInfo)}function Dd(e,t,r,s,l){return qr(),Vl(l),t.flags|=256,$t(e,t,r,s),t.child}var ma={dehydrated:null,treeContext:null,retryLane:0};function ga(e){return{baseLanes:e,cachePool:null,transitions:null}}function Bd(e,t,r){var s=t.pendingProps,l=et.current,c=!1,f=(t.flags&128)!==0,h;if((h=f)||(h=e!==null&&e.memoizedState===null?!1:(l&2)!==0),h?(c=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),qe(et,l&1),e===null)return Hl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(f=s.children,e=s.fallback,c?(s=t.mode,c=t.child,f={mode:"hidden",children:f},(s&1)===0&&c!==null?(c.childLanes=0,c.pendingProps=f):c=yi(f,s,0,null),e=jr(e,s,r,null),c.return=t,e.return=t,c.sibling=e,t.child=c,t.child.memoizedState=ga(r),t.memoizedState=ma,e):ya(t,f));if(l=e.memoizedState,l!==null&&(h=l.dehydrated,h!==null))return Lm(e,t,f,s,h,l,r);if(c){c=s.fallback,f=t.mode,l=e.child,h=l.sibling;var y={mode:"hidden",children:s.children};return(f&1)===0&&t.child!==l?(s=t.child,s.childLanes=0,s.pendingProps=y,t.deletions=null):(s=cr(l,y),s.subtreeFlags=l.subtreeFlags&14680064),h!==null?c=cr(h,c):(c=jr(c,f,r,null),c.flags|=2),c.return=t,s.return=t,s.sibling=c,t.child=s,s=c,c=t.child,f=e.child.memoizedState,f=f===null?ga(r):{baseLanes:f.baseLanes|r,cachePool:null,transitions:f.transitions},c.memoizedState=f,c.childLanes=e.childLanes&~r,t.memoizedState=ma,s}return c=e.child,e=c.sibling,s=cr(c,{mode:"visible",children:s.children}),(t.mode&1)===0&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function ya(e,t){return t=yi({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function oi(e,t,r,s){return s!==null&&Vl(s),Yr(t,e.child,null,r),e=ya(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Lm(e,t,r,s,l,c,f){if(r)return t.flags&256?(t.flags&=-257,s=da(Error(i(422))),oi(e,t,f,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(c=s.fallback,l=t.mode,s=yi({mode:"visible",children:s.children},l,0,null),c=jr(c,l,f,null),c.flags|=2,s.return=t,c.return=t,s.sibling=c,t.child=s,(t.mode&1)!==0&&Yr(t,e.child,null,f),t.child.memoizedState=ga(f),t.memoizedState=ma,c);if((t.mode&1)===0)return oi(e,t,f,null);if(l.data==="$!"){if(s=l.nextSibling&&l.nextSibling.dataset,s)var h=s.dgst;return s=h,c=Error(i(419)),s=da(c,s,void 0),oi(e,t,f,s)}if(h=(f&e.childLanes)!==0,Bt||h){if(s=yt,s!==null){switch(f&-f){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=(l&(s.suspendedLanes|f))!==0?0:l,l!==0&&l!==c.retryLane&&(c.retryLane=l,Ln(e,l),hn(s,e,l,-1))}return Aa(),s=da(Error(i(421))),oi(e,t,f,s)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Qm.bind(null,e),l._reactRetry=t,null):(e=c.treeContext,Qt=Zn(l.nextSibling),Yt=t,Je=!0,cn=null,e!==null&&(Zt[en++]=Pn,Zt[en++]=On,Zt[en++]=vr,Pn=e.id,On=e.overflow,vr=t),t=ya(t,s.children),t.flags|=4096,t)}function Ud(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),Yl(e.return,t,r)}function xa(e,t,r,s,l){var c=e.memoizedState;c===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:l}:(c.isBackwards=t,c.rendering=null,c.renderingStartTime=0,c.last=s,c.tail=r,c.tailMode=l)}function Hd(e,t,r){var s=t.pendingProps,l=s.revealOrder,c=s.tail;if($t(e,t,s.children,r),s=et.current,(s&2)!==0)s=s&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Ud(e,r,t);else if(e.tag===19)Ud(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(qe(et,s),(t.mode&1)===0)t.memoizedState=null;else switch(l){case"forwards":for(r=t.child,l=null;r!==null;)e=r.alternate,e!==null&&Xs(e)===null&&(l=r),r=r.sibling;r=l,r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),xa(t,!1,l,r,c);break;case"backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&Xs(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}xa(t,!0,r,null,c);break;case"together":xa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function si(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function zn(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Er|=t.lanes,(r&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,r=cr(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=cr(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Mm(e,t,r){switch(t.tag){case 3:Fd(t),qr();break;case 5:rd(t);break;case 1:Dt(t.type)&&Bs(t);break;case 4:Xl(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,l=t.memoizedProps.value;qe(qs,s._currentValue),s._currentValue=l;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(qe(et,et.current&1),t.flags|=128,null):(r&t.child.childLanes)!==0?Bd(e,t,r):(qe(et,et.current&1),e=zn(e,t,r),e!==null?e.sibling:null);qe(et,et.current&1);break;case 19:if(s=(r&t.childLanes)!==0,(e.flags&128)!==0){if(s)return Hd(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),qe(et,et.current),s)break;return null;case 22:case 23:return t.lanes=0,Ld(e,t,r)}return zn(e,t,r)}var Vd,va,Wd,Gd;Vd=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}},va=function(){},Wd=function(e,t,r,s){var l=e.memoizedProps;if(l!==s){e=t.stateNode,br(bn.current);var c=null;switch(r){case"input":l=Pt(e,l),s=Pt(e,s),c=[];break;case"select":l=M({},l,{value:void 0}),s=M({},s,{value:void 0}),c=[];break;case"textarea":l=Ct(e,l),s=Ct(e,s),c=[];break;default:typeof l.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=zs)}Rn(r,s);var f;r=null;for(E in l)if(!s.hasOwnProperty(E)&&l.hasOwnProperty(E)&&l[E]!=null)if(E==="style"){var h=l[E];for(f in h)h.hasOwnProperty(f)&&(r||(r={}),r[f]="")}else E!=="dangerouslySetInnerHTML"&&E!=="children"&&E!=="suppressContentEditableWarning"&&E!=="suppressHydrationWarning"&&E!=="autoFocus"&&(d.hasOwnProperty(E)?c||(c=[]):(c=c||[]).push(E,null));for(E in s){var y=s[E];if(h=l!=null?l[E]:void 0,s.hasOwnProperty(E)&&y!==h&&(y!=null||h!=null))if(E==="style")if(h){for(f in h)!h.hasOwnProperty(f)||y&&y.hasOwnProperty(f)||(r||(r={}),r[f]="");for(f in y)y.hasOwnProperty(f)&&h[f]!==y[f]&&(r||(r={}),r[f]=y[f])}else r||(c||(c=[]),c.push(E,r)),r=y;else E==="dangerouslySetInnerHTML"?(y=y?y.__html:void 0,h=h?h.__html:void 0,y!=null&&h!==y&&(c=c||[]).push(E,y)):E==="children"?typeof y!="string"&&typeof y!="number"||(c=c||[]).push(E,""+y):E!=="suppressContentEditableWarning"&&E!=="suppressHydrationWarning"&&(d.hasOwnProperty(E)?(y!=null&&E==="onScroll"&&Ye("scroll",e),c||h===y||(c=[])):(c=c||[]).push(E,y))}r&&(c=c||[]).push("style",r);var E=c;(t.updateQueue=E)&&(t.flags|=4)}},Gd=function(e,t,r,s){r!==s&&(t.flags|=4)};function qo(e,t){if(!Je)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function jt(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,s|=l.subtreeFlags&14680064,s|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,s|=l.subtreeFlags,s|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function zm(e,t,r){var s=t.pendingProps;switch(Bl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return jt(t),null;case 1:return Dt(t.type)&&Ds(),jt(t),null;case 3:return s=t.stateNode,Xr(),Qe(Ft),Qe(_t),ea(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Ws(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,cn!==null&&(Ra(cn),cn=null))),va(e,t),jt(t),null;case 5:Jl(t);var l=br(Uo.current);if(r=t.type,e!==null&&t.stateNode!=null)Wd(e,t,r,s,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(i(166));return jt(t),null}if(e=br(bn.current),Ws(t)){s=t.stateNode,r=t.type;var c=t.memoizedProps;switch(s[Sn]=t,s[Mo]=c,e=(t.mode&1)!==0,r){case"dialog":Ye("cancel",s),Ye("close",s);break;case"iframe":case"object":case"embed":Ye("load",s);break;case"video":case"audio":for(l=0;l<Po.length;l++)Ye(Po[l],s);break;case"source":Ye("error",s);break;case"img":case"image":case"link":Ye("error",s),Ye("load",s);break;case"details":Ye("toggle",s);break;case"input":Ot(s,c),Ye("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!c.multiple},Ye("invalid",s);break;case"textarea":mt(s,c),Ye("invalid",s)}Rn(r,c),l=null;for(var f in c)if(c.hasOwnProperty(f)){var h=c[f];f==="children"?typeof h=="string"?s.textContent!==h&&(c.suppressHydrationWarning!==!0&&Ms(s.textContent,h,e),l=["children",h]):typeof h=="number"&&s.textContent!==""+h&&(c.suppressHydrationWarning!==!0&&Ms(s.textContent,h,e),l=["children",""+h]):d.hasOwnProperty(f)&&h!=null&&f==="onScroll"&&Ye("scroll",s)}switch(r){case"input":Ue(s),vt(s,c,!0);break;case"textarea":Ue(s),Wt(s);break;case"select":case"option":break;default:typeof c.onClick=="function"&&(s.onclick=zs)}s=l,t.updateQueue=s,s!==null&&(t.flags|=4)}else{f=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Vn(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=f.createElement(r,{is:s.is}):(e=f.createElement(r),r==="select"&&(f=e,s.multiple?f.multiple=!0:s.size&&(f.size=s.size))):e=f.createElementNS(e,r),e[Sn]=t,e[Mo]=s,Vd(e,t,!1,!1),t.stateNode=e;e:{switch(f=L(r,s),r){case"dialog":Ye("cancel",e),Ye("close",e),l=s;break;case"iframe":case"object":case"embed":Ye("load",e),l=s;break;case"video":case"audio":for(l=0;l<Po.length;l++)Ye(Po[l],e);l=s;break;case"source":Ye("error",e),l=s;break;case"img":case"image":case"link":Ye("error",e),Ye("load",e),l=s;break;case"details":Ye("toggle",e),l=s;break;case"input":Ot(e,s),l=Pt(e,s),Ye("invalid",e);break;case"option":l=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},l=M({},s,{value:void 0}),Ye("invalid",e);break;case"textarea":mt(e,s),l=Ct(e,s),Ye("invalid",e);break;default:l=s}Rn(r,l),h=l;for(c in h)if(h.hasOwnProperty(c)){var y=h[c];c==="style"?vn(e,y):c==="dangerouslySetInnerHTML"?(y=y?y.__html:void 0,y!=null&&Wn(e,y)):c==="children"?typeof y=="string"?(r!=="textarea"||y!=="")&&Gt(e,y):typeof y=="number"&&Gt(e,""+y):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(d.hasOwnProperty(c)?y!=null&&c==="onScroll"&&Ye("scroll",e):y!=null&&he(e,c,y,f))}switch(r){case"input":Ue(e),vt(e,s,!1);break;case"textarea":Ue(e),Wt(e);break;case"option":s.value!=null&&e.setAttribute("value",""+Y(s.value));break;case"select":e.multiple=!!s.multiple,c=s.value,c!=null?He(e,!!s.multiple,c,!1):s.defaultValue!=null&&He(e,!!s.multiple,s.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=zs)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return jt(t),null;case 6:if(e&&t.stateNode!=null)Gd(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(i(166));if(r=br(Uo.current),br(bn.current),Ws(t)){if(s=t.stateNode,r=t.memoizedProps,s[Sn]=t,(c=s.nodeValue!==r)&&(e=Yt,e!==null))switch(e.tag){case 3:Ms(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ms(s.nodeValue,r,(e.mode&1)!==0)}c&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[Sn]=t,t.stateNode=s}return jt(t),null;case 13:if(Qe(et),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Je&&Qt!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Qc(),qr(),t.flags|=98560,c=!1;else if(c=Ws(t),s!==null&&s.dehydrated!==null){if(e===null){if(!c)throw Error(i(318));if(c=t.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(i(317));c[Sn]=t}else qr(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;jt(t),c=!1}else cn!==null&&(Ra(cn),cn=null),c=!0;if(!c)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(et.current&1)!==0?pt===0&&(pt=3):Aa())),t.updateQueue!==null&&(t.flags|=4),jt(t),null);case 4:return Xr(),va(e,t),e===null&&Oo(t.stateNode.containerInfo),jt(t),null;case 10:return ql(t.type._context),jt(t),null;case 17:return Dt(t.type)&&Ds(),jt(t),null;case 19:if(Qe(et),c=t.memoizedState,c===null)return jt(t),null;if(s=(t.flags&128)!==0,f=c.rendering,f===null)if(s)qo(c,!1);else{if(pt!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=Xs(e),f!==null){for(t.flags|=128,qo(c,!1),s=f.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)c=r,e=s,c.flags&=14680066,f=c.alternate,f===null?(c.childLanes=0,c.lanes=e,c.child=null,c.subtreeFlags=0,c.memoizedProps=null,c.memoizedState=null,c.updateQueue=null,c.dependencies=null,c.stateNode=null):(c.childLanes=f.childLanes,c.lanes=f.lanes,c.child=f.child,c.subtreeFlags=0,c.deletions=null,c.memoizedProps=f.memoizedProps,c.memoizedState=f.memoizedState,c.updateQueue=f.updateQueue,c.type=f.type,e=f.dependencies,c.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return qe(et,et.current&1|2),t.child}e=e.sibling}c.tail!==null&&st()>to&&(t.flags|=128,s=!0,qo(c,!1),t.lanes=4194304)}else{if(!s)if(e=Xs(f),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),qo(c,!0),c.tail===null&&c.tailMode==="hidden"&&!f.alternate&&!Je)return jt(t),null}else 2*st()-c.renderingStartTime>to&&r!==1073741824&&(t.flags|=128,s=!0,qo(c,!1),t.lanes=4194304);c.isBackwards?(f.sibling=t.child,t.child=f):(r=c.last,r!==null?r.sibling=f:t.child=f,c.last=f)}return c.tail!==null?(t=c.tail,c.rendering=t,c.tail=t.sibling,c.renderingStartTime=st(),t.sibling=null,r=et.current,qe(et,s?r&1|2:r&1),t):(jt(t),null);case 22:case 23:return Ia(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&(t.mode&1)!==0?(Kt&1073741824)!==0&&(jt(t),t.subtreeFlags&6&&(t.flags|=8192)):jt(t),null;case 24:return null;case 25:return null}throw Error(i(156,t.tag))}function Fm(e,t){switch(Bl(t),t.tag){case 1:return Dt(t.type)&&Ds(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Xr(),Qe(Ft),Qe(_t),ea(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Jl(t),null;case 13:if(Qe(et),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));qr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Qe(et),null;case 4:return Xr(),null;case 10:return ql(t.type._context),null;case 22:case 23:return Ia(),null;case 24:return null;default:return null}}var ii=!1,Tt=!1,Dm=typeof WeakSet=="function"?WeakSet:Set,se=null;function Zr(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){ot(e,t,s)}else r.current=null}function wa(e,t,r){try{r()}catch(s){ot(e,t,s)}}var qd=!1;function Bm(e,t){if(Il=_s,e=Cc(),El(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var l=s.anchorOffset,c=s.focusNode;s=s.focusOffset;try{r.nodeType,c.nodeType}catch{r=null;break e}var f=0,h=-1,y=-1,E=0,F=0,B=e,z=null;t:for(;;){for(var ee;B!==r||l!==0&&B.nodeType!==3||(h=f+l),B!==c||s!==0&&B.nodeType!==3||(y=f+s),B.nodeType===3&&(f+=B.nodeValue.length),(ee=B.firstChild)!==null;)z=B,B=ee;for(;;){if(B===e)break t;if(z===r&&++E===l&&(h=f),z===c&&++F===s&&(y=f),(ee=B.nextSibling)!==null)break;B=z,z=B.parentNode}B=ee}r=h===-1||y===-1?null:{start:h,end:y}}else r=null}r=r||{start:0,end:0}}else r=null;for(Al={focusedElem:e,selectionRange:r},_s=!1,se=t;se!==null;)if(t=se,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,se=e;else for(;se!==null;){t=se;try{var ie=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(ie!==null){var le=ie.memoizedProps,it=ie.memoizedState,b=t.stateNode,v=b.getSnapshotBeforeUpdate(t.elementType===t.type?le:dn(t.type,le),it);b.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var k=t.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(i(163))}}catch(H){ot(t,t.return,H)}if(e=t.sibling,e!==null){e.return=t.return,se=e;break}se=t.return}return ie=qd,qd=!1,ie}function Yo(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var l=s=s.next;do{if((l.tag&e)===e){var c=l.destroy;l.destroy=void 0,c!==void 0&&wa(t,r,c)}l=l.next}while(l!==s)}}function li(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function Sa(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function Yd(e){var t=e.alternate;t!==null&&(e.alternate=null,Yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Sn],delete t[Mo],delete t[Ml],delete t[km],delete t[Em])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Qd(e){return e.tag===5||e.tag===3||e.tag===4}function Kd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Qd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ba(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=zs));else if(s!==4&&(e=e.child,e!==null))for(ba(e,t,r),e=e.sibling;e!==null;)ba(e,t,r),e=e.sibling}function ka(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(ka(e,t,r),e=e.sibling;e!==null;)ka(e,t,r),e=e.sibling}var bt=null,fn=!1;function sr(e,t,r){for(r=r.child;r!==null;)Xd(e,t,r),r=r.sibling}function Xd(e,t,r){if(wn&&typeof wn.onCommitFiberUnmount=="function")try{wn.onCommitFiberUnmount(ws,r)}catch{}switch(r.tag){case 5:Tt||Zr(r,t);case 6:var s=bt,l=fn;bt=null,sr(e,t,r),bt=s,fn=l,bt!==null&&(fn?(e=bt,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):bt.removeChild(r.stateNode));break;case 18:bt!==null&&(fn?(e=bt,r=r.stateNode,e.nodeType===8?Ll(e.parentNode,r):e.nodeType===1&&Ll(e,r),_o(e)):Ll(bt,r.stateNode));break;case 4:s=bt,l=fn,bt=r.stateNode.containerInfo,fn=!0,sr(e,t,r),bt=s,fn=l;break;case 0:case 11:case 14:case 15:if(!Tt&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){l=s=s.next;do{var c=l,f=c.destroy;c=c.tag,f!==void 0&&((c&2)!==0||(c&4)!==0)&&wa(r,t,f),l=l.next}while(l!==s)}sr(e,t,r);break;case 1:if(!Tt&&(Zr(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(h){ot(r,t,h)}sr(e,t,r);break;case 21:sr(e,t,r);break;case 22:r.mode&1?(Tt=(s=Tt)||r.memoizedState!==null,sr(e,t,r),Tt=s):sr(e,t,r);break;default:sr(e,t,r)}}function Jd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new Dm),t.forEach(function(s){var l=Km.bind(null,e,s);r.has(s)||(r.add(s),s.then(l,l))})}}function pn(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var l=r[s];try{var c=e,f=t,h=f;e:for(;h!==null;){switch(h.tag){case 5:bt=h.stateNode,fn=!1;break e;case 3:bt=h.stateNode.containerInfo,fn=!0;break e;case 4:bt=h.stateNode.containerInfo,fn=!0;break e}h=h.return}if(bt===null)throw Error(i(160));Xd(c,f,l),bt=null,fn=!1;var y=l.alternate;y!==null&&(y.return=null),l.return=null}catch(E){ot(l,t,E)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Zd(t,e),t=t.sibling}function Zd(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(pn(t,e),En(e),s&4){try{Yo(3,e,e.return),li(3,e)}catch(le){ot(e,e.return,le)}try{Yo(5,e,e.return)}catch(le){ot(e,e.return,le)}}break;case 1:pn(t,e),En(e),s&512&&r!==null&&Zr(r,r.return);break;case 5:if(pn(t,e),En(e),s&512&&r!==null&&Zr(r,r.return),e.flags&32){var l=e.stateNode;try{Gt(l,"")}catch(le){ot(e,e.return,le)}}if(s&4&&(l=e.stateNode,l!=null)){var c=e.memoizedProps,f=r!==null?r.memoizedProps:c,h=e.type,y=e.updateQueue;if(e.updateQueue=null,y!==null)try{h==="input"&&c.type==="radio"&&c.name!=null&&Ge(l,c),L(h,f);var E=L(h,c);for(f=0;f<y.length;f+=2){var F=y[f],B=y[f+1];F==="style"?vn(l,B):F==="dangerouslySetInnerHTML"?Wn(l,B):F==="children"?Gt(l,B):he(l,F,B,E)}switch(h){case"input":Oe(l,c);break;case"textarea":Tn(l,c);break;case"select":var z=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!c.multiple;var ee=c.value;ee!=null?He(l,!!c.multiple,ee,!1):z!==!!c.multiple&&(c.defaultValue!=null?He(l,!!c.multiple,c.defaultValue,!0):He(l,!!c.multiple,c.multiple?[]:"",!1))}l[Mo]=c}catch(le){ot(e,e.return,le)}}break;case 6:if(pn(t,e),En(e),s&4){if(e.stateNode===null)throw Error(i(162));l=e.stateNode,c=e.memoizedProps;try{l.nodeValue=c}catch(le){ot(e,e.return,le)}}break;case 3:if(pn(t,e),En(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{_o(t.containerInfo)}catch(le){ot(e,e.return,le)}break;case 4:pn(t,e),En(e);break;case 13:pn(t,e),En(e),l=e.child,l.flags&8192&&(c=l.memoizedState!==null,l.stateNode.isHidden=c,!c||l.alternate!==null&&l.alternate.memoizedState!==null||(_a=st())),s&4&&Jd(e);break;case 22:if(F=r!==null&&r.memoizedState!==null,e.mode&1?(Tt=(E=Tt)||F,pn(t,e),Tt=E):pn(t,e),En(e),s&8192){if(E=e.memoizedState!==null,(e.stateNode.isHidden=E)&&!F&&(e.mode&1)!==0)for(se=e,F=e.child;F!==null;){for(B=se=F;se!==null;){switch(z=se,ee=z.child,z.tag){case 0:case 11:case 14:case 15:Yo(4,z,z.return);break;case 1:Zr(z,z.return);var ie=z.stateNode;if(typeof ie.componentWillUnmount=="function"){s=z,r=z.return;try{t=s,ie.props=t.memoizedProps,ie.state=t.memoizedState,ie.componentWillUnmount()}catch(le){ot(s,r,le)}}break;case 5:Zr(z,z.return);break;case 22:if(z.memoizedState!==null){nf(B);continue}}ee!==null?(ee.return=z,se=ee):nf(B)}F=F.sibling}e:for(F=null,B=e;;){if(B.tag===5){if(F===null){F=B;try{l=B.stateNode,E?(c=l.style,typeof c.setProperty=="function"?c.setProperty("display","none","important"):c.display="none"):(h=B.stateNode,y=B.memoizedProps.style,f=y!=null&&y.hasOwnProperty("display")?y.display:null,h.style.display=nt("display",f))}catch(le){ot(e,e.return,le)}}}else if(B.tag===6){if(F===null)try{B.stateNode.nodeValue=E?"":B.memoizedProps}catch(le){ot(e,e.return,le)}}else if((B.tag!==22&&B.tag!==23||B.memoizedState===null||B===e)&&B.child!==null){B.child.return=B,B=B.child;continue}if(B===e)break e;for(;B.sibling===null;){if(B.return===null||B.return===e)break e;F===B&&(F=null),B=B.return}F===B&&(F=null),B.sibling.return=B.return,B=B.sibling}}break;case 19:pn(t,e),En(e),s&4&&Jd(e);break;case 21:break;default:pn(t,e),En(e)}}function En(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Qd(r)){var s=r;break e}r=r.return}throw Error(i(160))}switch(s.tag){case 5:var l=s.stateNode;s.flags&32&&(Gt(l,""),s.flags&=-33);var c=Kd(e);ka(e,c,l);break;case 3:case 4:var f=s.stateNode.containerInfo,h=Kd(e);ba(e,h,f);break;default:throw Error(i(161))}}catch(y){ot(e,e.return,y)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Um(e,t,r){se=e,ef(e)}function ef(e,t,r){for(var s=(e.mode&1)!==0;se!==null;){var l=se,c=l.child;if(l.tag===22&&s){var f=l.memoizedState!==null||ii;if(!f){var h=l.alternate,y=h!==null&&h.memoizedState!==null||Tt;h=ii;var E=Tt;if(ii=f,(Tt=y)&&!E)for(se=l;se!==null;)f=se,y=f.child,f.tag===22&&f.memoizedState!==null?rf(l):y!==null?(y.return=f,se=y):rf(l);for(;c!==null;)se=c,ef(c),c=c.sibling;se=l,ii=h,Tt=E}tf(e)}else(l.subtreeFlags&8772)!==0&&c!==null?(c.return=l,se=c):tf(e)}}function tf(e){for(;se!==null;){var t=se;if((t.flags&8772)!==0){var r=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:Tt||li(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!Tt)if(r===null)s.componentDidMount();else{var l=t.elementType===t.type?r.memoizedProps:dn(t.type,r.memoizedProps);s.componentDidUpdate(l,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var c=t.updateQueue;c!==null&&nd(t,c,s);break;case 3:var f=t.updateQueue;if(f!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}nd(t,f,r)}break;case 5:var h=t.stateNode;if(r===null&&t.flags&4){r=h;var y=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":y.autoFocus&&r.focus();break;case"img":y.src&&(r.src=y.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var E=t.alternate;if(E!==null){var F=E.memoizedState;if(F!==null){var B=F.dehydrated;B!==null&&_o(B)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(i(163))}Tt||t.flags&512&&Sa(t)}catch(z){ot(t,t.return,z)}}if(t===e){se=null;break}if(r=t.sibling,r!==null){r.return=t.return,se=r;break}se=t.return}}function nf(e){for(;se!==null;){var t=se;if(t===e){se=null;break}var r=t.sibling;if(r!==null){r.return=t.return,se=r;break}se=t.return}}function rf(e){for(;se!==null;){var t=se;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{li(4,t)}catch(y){ot(t,r,y)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var l=t.return;try{s.componentDidMount()}catch(y){ot(t,l,y)}}var c=t.return;try{Sa(t)}catch(y){ot(t,c,y)}break;case 5:var f=t.return;try{Sa(t)}catch(y){ot(t,f,y)}}}catch(y){ot(t,t.return,y)}if(t===e){se=null;break}var h=t.sibling;if(h!==null){h.return=t.return,se=h;break}se=t.return}}var Hm=Math.ceil,ai=Ce.ReactCurrentDispatcher,Ea=Ce.ReactCurrentOwner,rn=Ce.ReactCurrentBatchConfig,Me=0,yt=null,lt=null,kt=0,Kt=0,eo=er(0),pt=0,Qo=null,Er=0,ui=0,Ca=0,Ko=null,Ut=null,_a=0,to=1/0,Fn=null,ci=!1,Na=null,ir=null,di=!1,lr=null,fi=0,Xo=0,ja=null,pi=-1,hi=0;function It(){return(Me&6)!==0?st():pi!==-1?pi:pi=st()}function ar(e){return(e.mode&1)===0?1:(Me&2)!==0&&kt!==0?kt&-kt:_m.transition!==null?(hi===0&&(hi=Ku()),hi):(e=Be,e!==0||(e=window.event,e=e===void 0?16:sc(e.type)),e)}function hn(e,t,r,s){if(50<Xo)throw Xo=0,ja=null,Error(i(185));So(e,r,s),((Me&2)===0||e!==yt)&&(e===yt&&((Me&2)===0&&(ui|=r),pt===4&&ur(e,kt)),Ht(e,s),r===1&&Me===0&&(t.mode&1)===0&&(to=st()+500,Us&&nr()))}function Ht(e,t){var r=e.callbackNode;_h(e,t);var s=ks(e,e===yt?kt:0);if(s===0)r!==null&&qu(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&qu(r),t===1)e.tag===0?Cm(sf.bind(null,e)):Vc(sf.bind(null,e)),Sm(function(){(Me&6)===0&&nr()}),r=null;else{switch(Xu(s)){case 1:r=ll;break;case 4:r=Yu;break;case 16:r=vs;break;case 536870912:r=Qu;break;default:r=vs}r=hf(r,of.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function of(e,t){if(pi=-1,hi=0,(Me&6)!==0)throw Error(i(327));var r=e.callbackNode;if(no()&&e.callbackNode!==r)return null;var s=ks(e,e===yt?kt:0);if(s===0)return null;if((s&30)!==0||(s&e.expiredLanes)!==0||t)t=mi(e,s);else{t=s;var l=Me;Me|=2;var c=af();(yt!==e||kt!==t)&&(Fn=null,to=st()+500,_r(e,t));do try{Gm();break}catch(h){lf(e,h)}while(!0);Gl(),ai.current=c,Me=l,lt!==null?t=0:(yt=null,kt=0,t=pt)}if(t!==0){if(t===2&&(l=al(e),l!==0&&(s=l,t=Ta(e,l))),t===1)throw r=Qo,_r(e,0),ur(e,s),Ht(e,st()),r;if(t===6)ur(e,s);else{if(l=e.current.alternate,(s&30)===0&&!Vm(l)&&(t=mi(e,s),t===2&&(c=al(e),c!==0&&(s=c,t=Ta(e,c))),t===1))throw r=Qo,_r(e,0),ur(e,s),Ht(e,st()),r;switch(e.finishedWork=l,e.finishedLanes=s,t){case 0:case 1:throw Error(i(345));case 2:Nr(e,Ut,Fn);break;case 3:if(ur(e,s),(s&130023424)===s&&(t=_a+500-st(),10<t)){if(ks(e,0)!==0)break;if(l=e.suspendedLanes,(l&s)!==s){It(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Ol(Nr.bind(null,e,Ut,Fn),t);break}Nr(e,Ut,Fn);break;case 4:if(ur(e,s),(s&4194240)===s)break;for(t=e.eventTimes,l=-1;0<s;){var f=31-an(s);c=1<<f,f=t[f],f>l&&(l=f),s&=~c}if(s=l,s=st()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Hm(s/1960))-s,10<s){e.timeoutHandle=Ol(Nr.bind(null,e,Ut,Fn),s);break}Nr(e,Ut,Fn);break;case 5:Nr(e,Ut,Fn);break;default:throw Error(i(329))}}}return Ht(e,st()),e.callbackNode===r?of.bind(null,e):null}function Ta(e,t){var r=Ko;return e.current.memoizedState.isDehydrated&&(_r(e,t).flags|=256),e=mi(e,t),e!==2&&(t=Ut,Ut=r,t!==null&&Ra(t)),e}function Ra(e){Ut===null?Ut=e:Ut.push.apply(Ut,e)}function Vm(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var l=r[s],c=l.getSnapshot;l=l.value;try{if(!un(c(),l))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ur(e,t){for(t&=~Ca,t&=~ui,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-an(t),s=1<<r;e[r]=-1,t&=~s}}function sf(e){if((Me&6)!==0)throw Error(i(327));no();var t=ks(e,0);if((t&1)===0)return Ht(e,st()),null;var r=mi(e,t);if(e.tag!==0&&r===2){var s=al(e);s!==0&&(t=s,r=Ta(e,s))}if(r===1)throw r=Qo,_r(e,0),ur(e,t),Ht(e,st()),r;if(r===6)throw Error(i(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Nr(e,Ut,Fn),Ht(e,st()),null}function $a(e,t){var r=Me;Me|=1;try{return e(t)}finally{Me=r,Me===0&&(to=st()+500,Us&&nr())}}function Cr(e){lr!==null&&lr.tag===0&&(Me&6)===0&&no();var t=Me;Me|=1;var r=rn.transition,s=Be;try{if(rn.transition=null,Be=1,e)return e()}finally{Be=s,rn.transition=r,Me=t,(Me&6)===0&&nr()}}function Ia(){Kt=eo.current,Qe(eo)}function _r(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,wm(r)),lt!==null)for(r=lt.return;r!==null;){var s=r;switch(Bl(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&Ds();break;case 3:Xr(),Qe(Ft),Qe(_t),ea();break;case 5:Jl(s);break;case 4:Xr();break;case 13:Qe(et);break;case 19:Qe(et);break;case 10:ql(s.type._context);break;case 22:case 23:Ia()}r=r.return}if(yt=e,lt=e=cr(e.current,null),kt=Kt=t,pt=0,Qo=null,Ca=ui=Er=0,Ut=Ko=null,Sr!==null){for(t=0;t<Sr.length;t++)if(r=Sr[t],s=r.interleaved,s!==null){r.interleaved=null;var l=s.next,c=r.pending;if(c!==null){var f=c.next;c.next=l,s.next=f}r.pending=s}Sr=null}return e}function lf(e,t){do{var r=lt;try{if(Gl(),Js.current=ni,Zs){for(var s=tt.memoizedState;s!==null;){var l=s.queue;l!==null&&(l.pending=null),s=s.next}Zs=!1}if(kr=0,gt=ft=tt=null,Ho=!1,Vo=0,Ea.current=null,r===null||r.return===null){pt=1,Qo=t,lt=null;break}e:{var c=e,f=r.return,h=r,y=t;if(t=kt,h.flags|=32768,y!==null&&typeof y=="object"&&typeof y.then=="function"){var E=y,F=h,B=F.tag;if((F.mode&1)===0&&(B===0||B===11||B===15)){var z=F.alternate;z?(F.updateQueue=z.updateQueue,F.memoizedState=z.memoizedState,F.lanes=z.lanes):(F.updateQueue=null,F.memoizedState=null)}var ee=$d(f);if(ee!==null){ee.flags&=-257,Id(ee,f,h,c,t),ee.mode&1&&Rd(c,E,t),t=ee,y=E;var ie=t.updateQueue;if(ie===null){var le=new Set;le.add(y),t.updateQueue=le}else ie.add(y);break e}else{if((t&1)===0){Rd(c,E,t),Aa();break e}y=Error(i(426))}}else if(Je&&h.mode&1){var it=$d(f);if(it!==null){(it.flags&65536)===0&&(it.flags|=256),Id(it,f,h,c,t),Vl(Jr(y,h));break e}}c=y=Jr(y,h),pt!==4&&(pt=2),Ko===null?Ko=[c]:Ko.push(c),c=f;do{switch(c.tag){case 3:c.flags|=65536,t&=-t,c.lanes|=t;var b=jd(c,y,t);td(c,b);break e;case 1:h=y;var v=c.type,k=c.stateNode;if((c.flags&128)===0&&(typeof v.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(ir===null||!ir.has(k)))){c.flags|=65536,t&=-t,c.lanes|=t;var H=Td(c,h,t);td(c,H);break e}}c=c.return}while(c!==null)}cf(r)}catch(ce){t=ce,lt===r&&r!==null&&(lt=r=r.return);continue}break}while(!0)}function af(){var e=ai.current;return ai.current=ni,e===null?ni:e}function Aa(){(pt===0||pt===3||pt===2)&&(pt=4),yt===null||(Er&268435455)===0&&(ui&268435455)===0||ur(yt,kt)}function mi(e,t){var r=Me;Me|=2;var s=af();(yt!==e||kt!==t)&&(Fn=null,_r(e,t));do try{Wm();break}catch(l){lf(e,l)}while(!0);if(Gl(),Me=r,ai.current=s,lt!==null)throw Error(i(261));return yt=null,kt=0,pt}function Wm(){for(;lt!==null;)uf(lt)}function Gm(){for(;lt!==null&&!yh();)uf(lt)}function uf(e){var t=pf(e.alternate,e,Kt);e.memoizedProps=e.pendingProps,t===null?cf(e):lt=t,Ea.current=null}function cf(e){var t=e;do{var r=t.alternate;if(e=t.return,(t.flags&32768)===0){if(r=zm(r,t,Kt),r!==null){lt=r;return}}else{if(r=Fm(r,t),r!==null){r.flags&=32767,lt=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{pt=6,lt=null;return}}if(t=t.sibling,t!==null){lt=t;return}lt=t=e}while(t!==null);pt===0&&(pt=5)}function Nr(e,t,r){var s=Be,l=rn.transition;try{rn.transition=null,Be=1,qm(e,t,r,s)}finally{rn.transition=l,Be=s}return null}function qm(e,t,r,s){do no();while(lr!==null);if((Me&6)!==0)throw Error(i(327));r=e.finishedWork;var l=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(i(177));e.callbackNode=null,e.callbackPriority=0;var c=r.lanes|r.childLanes;if(Nh(e,c),e===yt&&(lt=yt=null,kt=0),(r.subtreeFlags&2064)===0&&(r.flags&2064)===0||di||(di=!0,hf(vs,function(){return no(),null})),c=(r.flags&15990)!==0,(r.subtreeFlags&15990)!==0||c){c=rn.transition,rn.transition=null;var f=Be;Be=1;var h=Me;Me|=4,Ea.current=null,Bm(e,r),Zd(r,e),pm(Al),_s=!!Il,Al=Il=null,e.current=r,Um(r),xh(),Me=h,Be=f,rn.transition=c}else e.current=r;if(di&&(di=!1,lr=e,fi=l),c=e.pendingLanes,c===0&&(ir=null),Sh(r.stateNode),Ht(e,st()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)l=t[r],s(l.value,{componentStack:l.stack,digest:l.digest});if(ci)throw ci=!1,e=Na,Na=null,e;return(fi&1)!==0&&e.tag!==0&&no(),c=e.pendingLanes,(c&1)!==0?e===ja?Xo++:(Xo=0,ja=e):Xo=0,nr(),null}function no(){if(lr!==null){var e=Xu(fi),t=rn.transition,r=Be;try{if(rn.transition=null,Be=16>e?16:e,lr===null)var s=!1;else{if(e=lr,lr=null,fi=0,(Me&6)!==0)throw Error(i(331));var l=Me;for(Me|=4,se=e.current;se!==null;){var c=se,f=c.child;if((se.flags&16)!==0){var h=c.deletions;if(h!==null){for(var y=0;y<h.length;y++){var E=h[y];for(se=E;se!==null;){var F=se;switch(F.tag){case 0:case 11:case 15:Yo(8,F,c)}var B=F.child;if(B!==null)B.return=F,se=B;else for(;se!==null;){F=se;var z=F.sibling,ee=F.return;if(Yd(F),F===E){se=null;break}if(z!==null){z.return=ee,se=z;break}se=ee}}}var ie=c.alternate;if(ie!==null){var le=ie.child;if(le!==null){ie.child=null;do{var it=le.sibling;le.sibling=null,le=it}while(le!==null)}}se=c}}if((c.subtreeFlags&2064)!==0&&f!==null)f.return=c,se=f;else e:for(;se!==null;){if(c=se,(c.flags&2048)!==0)switch(c.tag){case 0:case 11:case 15:Yo(9,c,c.return)}var b=c.sibling;if(b!==null){b.return=c.return,se=b;break e}se=c.return}}var v=e.current;for(se=v;se!==null;){f=se;var k=f.child;if((f.subtreeFlags&2064)!==0&&k!==null)k.return=f,se=k;else e:for(f=v;se!==null;){if(h=se,(h.flags&2048)!==0)try{switch(h.tag){case 0:case 11:case 15:li(9,h)}}catch(ce){ot(h,h.return,ce)}if(h===f){se=null;break e}var H=h.sibling;if(H!==null){H.return=h.return,se=H;break e}se=h.return}}if(Me=l,nr(),wn&&typeof wn.onPostCommitFiberRoot=="function")try{wn.onPostCommitFiberRoot(ws,e)}catch{}s=!0}return s}finally{Be=r,rn.transition=t}}return!1}function df(e,t,r){t=Jr(r,t),t=jd(e,t,1),e=or(e,t,1),t=It(),e!==null&&(So(e,1,t),Ht(e,t))}function ot(e,t,r){if(e.tag===3)df(e,e,r);else for(;t!==null;){if(t.tag===3){df(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(ir===null||!ir.has(s))){e=Jr(r,e),e=Td(t,e,1),t=or(t,e,1),e=It(),t!==null&&(So(t,1,e),Ht(t,e));break}}t=t.return}}function Ym(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=It(),e.pingedLanes|=e.suspendedLanes&r,yt===e&&(kt&r)===r&&(pt===4||pt===3&&(kt&130023424)===kt&&500>st()-_a?_r(e,0):Ca|=r),Ht(e,t)}function ff(e,t){t===0&&((e.mode&1)===0?t=1:(t=bs,bs<<=1,(bs&130023424)===0&&(bs=4194304)));var r=It();e=Ln(e,t),e!==null&&(So(e,t,r),Ht(e,r))}function Qm(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),ff(e,r)}function Km(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(i(314))}s!==null&&s.delete(t),ff(e,r)}var pf;pf=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Ft.current)Bt=!0;else{if((e.lanes&r)===0&&(t.flags&128)===0)return Bt=!1,Mm(e,t,r);Bt=(e.flags&131072)!==0}else Bt=!1,Je&&(t.flags&1048576)!==0&&Wc(t,Vs,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;si(e,t),e=t.pendingProps;var l=Vr(t,_t.current);Kr(t,r),l=ra(null,t,s,e,l,r);var c=oa();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Dt(s)?(c=!0,Bs(t)):c=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Kl(t),l.updater=ri,t.stateNode=l,l._reactInternals=t,ca(t,s,e,r),t=ha(null,t,s,!0,c,r)):(t.tag=0,Je&&c&&Dl(t),$t(null,t,l,r),t=t.child),t;case 16:s=t.elementType;e:{switch(si(e,t),e=t.pendingProps,l=s._init,s=l(s._payload),t.type=s,l=t.tag=Jm(s),e=dn(s,e),l){case 0:t=pa(null,t,s,e,r);break e;case 1:t=zd(null,t,s,e,r);break e;case 11:t=Ad(null,t,s,e,r);break e;case 14:t=Pd(null,t,s,dn(s.type,e),r);break e}throw Error(i(306,s,""))}return t;case 0:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:dn(s,l),pa(e,t,s,l,r);case 1:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:dn(s,l),zd(e,t,s,l,r);case 3:e:{if(Fd(t),e===null)throw Error(i(387));s=t.pendingProps,c=t.memoizedState,l=c.element,ed(e,t),Ks(t,s,null,r);var f=t.memoizedState;if(s=f.element,c.isDehydrated)if(c={element:s,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},t.updateQueue.baseState=c,t.memoizedState=c,t.flags&256){l=Jr(Error(i(423)),t),t=Dd(e,t,s,r,l);break e}else if(s!==l){l=Jr(Error(i(424)),t),t=Dd(e,t,s,r,l);break e}else for(Qt=Zn(t.stateNode.containerInfo.firstChild),Yt=t,Je=!0,cn=null,r=Jc(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(qr(),s===l){t=zn(e,t,r);break e}$t(e,t,s,r)}t=t.child}return t;case 5:return rd(t),e===null&&Hl(t),s=t.type,l=t.pendingProps,c=e!==null?e.memoizedProps:null,f=l.children,Pl(s,l)?f=null:c!==null&&Pl(s,c)&&(t.flags|=32),Md(e,t),$t(e,t,f,r),t.child;case 6:return e===null&&Hl(t),null;case 13:return Bd(e,t,r);case 4:return Xl(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=Yr(t,null,s,r):$t(e,t,s,r),t.child;case 11:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:dn(s,l),Ad(e,t,s,l,r);case 7:return $t(e,t,t.pendingProps,r),t.child;case 8:return $t(e,t,t.pendingProps.children,r),t.child;case 12:return $t(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,l=t.pendingProps,c=t.memoizedProps,f=l.value,qe(qs,s._currentValue),s._currentValue=f,c!==null)if(un(c.value,f)){if(c.children===l.children&&!Ft.current){t=zn(e,t,r);break e}}else for(c=t.child,c!==null&&(c.return=t);c!==null;){var h=c.dependencies;if(h!==null){f=c.child;for(var y=h.firstContext;y!==null;){if(y.context===s){if(c.tag===1){y=Mn(-1,r&-r),y.tag=2;var E=c.updateQueue;if(E!==null){E=E.shared;var F=E.pending;F===null?y.next=y:(y.next=F.next,F.next=y),E.pending=y}}c.lanes|=r,y=c.alternate,y!==null&&(y.lanes|=r),Yl(c.return,r,t),h.lanes|=r;break}y=y.next}}else if(c.tag===10)f=c.type===t.type?null:c.child;else if(c.tag===18){if(f=c.return,f===null)throw Error(i(341));f.lanes|=r,h=f.alternate,h!==null&&(h.lanes|=r),Yl(f,r,t),f=c.sibling}else f=c.child;if(f!==null)f.return=c;else for(f=c;f!==null;){if(f===t){f=null;break}if(c=f.sibling,c!==null){c.return=f.return,f=c;break}f=f.return}c=f}$t(e,t,l.children,r),t=t.child}return t;case 9:return l=t.type,s=t.pendingProps.children,Kr(t,r),l=tn(l),s=s(l),t.flags|=1,$t(e,t,s,r),t.child;case 14:return s=t.type,l=dn(s,t.pendingProps),l=dn(s.type,l),Pd(e,t,s,l,r);case 15:return Od(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:dn(s,l),si(e,t),t.tag=1,Dt(s)?(e=!0,Bs(t)):e=!1,Kr(t,r),_d(t,s,l),ca(t,s,l,r),ha(null,t,s,!0,e,r);case 19:return Hd(e,t,r);case 22:return Ld(e,t,r)}throw Error(i(156,t.tag))};function hf(e,t){return Gu(e,t)}function Xm(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function on(e,t,r,s){return new Xm(e,t,r,s)}function Pa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jm(e){if(typeof e=="function")return Pa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===K)return 11;if(e===Ae)return 14}return 2}function cr(e,t){var r=e.alternate;return r===null?(r=on(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function gi(e,t,r,s,l,c){var f=2;if(s=e,typeof e=="function")Pa(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case re:return jr(r.children,l,c,t);case te:f=8,l|=8;break;case pe:return e=on(12,r,t,l|2),e.elementType=pe,e.lanes=c,e;case oe:return e=on(13,r,t,l),e.elementType=oe,e.lanes=c,e;case Ee:return e=on(19,r,t,l),e.elementType=Ee,e.lanes=c,e;case fe:return yi(r,l,c,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case V:f=10;break e;case q:f=9;break e;case K:f=11;break e;case Ae:f=14;break e;case Le:f=16,s=null;break e}throw Error(i(130,e==null?e:typeof e,""))}return t=on(f,r,t,l),t.elementType=e,t.type=s,t.lanes=c,t}function jr(e,t,r,s){return e=on(7,e,s,t),e.lanes=r,e}function yi(e,t,r,s){return e=on(22,e,s,t),e.elementType=fe,e.lanes=r,e.stateNode={isHidden:!1},e}function Oa(e,t,r){return e=on(6,e,null,t),e.lanes=r,e}function La(e,t,r){return t=on(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Zm(e,t,r,s,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ul(0),this.expirationTimes=ul(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ul(0),this.identifierPrefix=s,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function Ma(e,t,r,s,l,c,f,h,y){return e=new Zm(e,t,r,h,y),t===1?(t=1,c===!0&&(t|=8)):t=0,c=on(3,null,null,t),e.current=c,c.stateNode=e,c.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Kl(c),e}function eg(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ve,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function mf(e){if(!e)return tr;e=e._reactInternals;e:{if(gr(e)!==e||e.tag!==1)throw Error(i(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Dt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(i(171))}if(e.tag===1){var r=e.type;if(Dt(r))return Uc(e,r,t)}return t}function gf(e,t,r,s,l,c,f,h,y){return e=Ma(r,s,!0,e,l,c,f,h,y),e.context=mf(null),r=e.current,s=It(),l=ar(r),c=Mn(s,l),c.callback=t??null,or(r,c,l),e.current.lanes=l,So(e,l,s),Ht(e,s),e}function xi(e,t,r,s){var l=t.current,c=It(),f=ar(l);return r=mf(r),t.context===null?t.context=r:t.pendingContext=r,t=Mn(c,f),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=or(l,t,f),e!==null&&(hn(e,l,f,c),Qs(e,l,f)),f}function vi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function yf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function za(e,t){yf(e,t),(e=e.alternate)&&yf(e,t)}function tg(){return null}var xf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fa(e){this._internalRoot=e}wi.prototype.render=Fa.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));xi(e,t,null,null)},wi.prototype.unmount=Fa.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cr(function(){xi(null,e,null,null)}),t[In]=null}};function wi(e){this._internalRoot=e}wi.prototype.unstable_scheduleHydration=function(e){if(e){var t=ec();e={blockedOn:null,target:e,priority:t};for(var r=0;r<Kn.length&&t!==0&&t<Kn[r].priority;r++);Kn.splice(r,0,e),r===0&&rc(e)}};function Da(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Si(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function vf(){}function ng(e,t,r,s,l){if(l){if(typeof s=="function"){var c=s;s=function(){var E=vi(f);c.call(E)}}var f=gf(t,s,e,0,null,!1,!1,"",vf);return e._reactRootContainer=f,e[In]=f.current,Oo(e.nodeType===8?e.parentNode:e),Cr(),f}for(;l=e.lastChild;)e.removeChild(l);if(typeof s=="function"){var h=s;s=function(){var E=vi(y);h.call(E)}}var y=Ma(e,0,!1,null,null,!1,!1,"",vf);return e._reactRootContainer=y,e[In]=y.current,Oo(e.nodeType===8?e.parentNode:e),Cr(function(){xi(t,y,r,s)}),y}function bi(e,t,r,s,l){var c=r._reactRootContainer;if(c){var f=c;if(typeof l=="function"){var h=l;l=function(){var y=vi(f);h.call(y)}}xi(t,f,e,l)}else f=ng(r,t,e,l,s);return vi(f)}Ju=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=wo(t.pendingLanes);r!==0&&(cl(t,r|1),Ht(t,st()),(Me&6)===0&&(to=st()+500,nr()))}break;case 13:Cr(function(){var s=Ln(e,1);if(s!==null){var l=It();hn(s,e,1,l)}}),za(e,1)}},dl=function(e){if(e.tag===13){var t=Ln(e,134217728);if(t!==null){var r=It();hn(t,e,134217728,r)}za(e,134217728)}},Zu=function(e){if(e.tag===13){var t=ar(e),r=Ln(e,t);if(r!==null){var s=It();hn(r,e,t,s)}za(e,t)}},ec=function(){return Be},tc=function(e,t){var r=Be;try{return Be=e,t()}finally{Be=r}},Q=function(e,t,r){switch(t){case"input":if(Oe(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var l=Fs(s);if(!l)throw Error(i(90));Et(s),Oe(s,l)}}}break;case"textarea":Tn(e,r);break;case"select":t=r.value,t!=null&&He(e,!!r.multiple,t,!1)}},St=$a,rt=Cr;var rg={usingClientEntryPoint:!1,Events:[zo,Ur,Fs,Ve,Ie,$a]},Jo={findFiberByHostInstance:yr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},og={bundleType:Jo.bundleType,version:Jo.version,rendererPackageName:Jo.rendererPackageName,rendererConfig:Jo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ce.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Vu(e),e===null?null:e.stateNode},findFiberByHostInstance:Jo.findFiberByHostInstance||tg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ki=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ki.isDisabled&&ki.supportsFiber)try{ws=ki.inject(og),wn=ki}catch{}}return Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rg,Vt.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Da(t))throw Error(i(200));return eg(e,t,null,r)},Vt.createRoot=function(e,t){if(!Da(e))throw Error(i(299));var r=!1,s="",l=xf;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=Ma(e,1,!1,null,null,r,!1,s,l),e[In]=t.current,Oo(e.nodeType===8?e.parentNode:e),new Fa(t)},Vt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(i(188)):(e=Object.keys(e).join(","),Error(i(268,e)));return e=Vu(t),e=e===null?null:e.stateNode,e},Vt.flushSync=function(e){return Cr(e)},Vt.hydrate=function(e,t,r){if(!Si(t))throw Error(i(200));return bi(null,e,t,!0,r)},Vt.hydrateRoot=function(e,t,r){if(!Da(e))throw Error(i(405));var s=r!=null&&r.hydratedSources||null,l=!1,c="",f=xf;if(r!=null&&(r.unstable_strictMode===!0&&(l=!0),r.identifierPrefix!==void 0&&(c=r.identifierPrefix),r.onRecoverableError!==void 0&&(f=r.onRecoverableError)),t=gf(t,null,e,1,r??null,l,!1,c,f),e[In]=t.current,Oo(e),s)for(e=0;e<s.length;e++)r=s[e],l=r._getVersion,l=l(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,l]:t.mutableSourceEagerHydrationData.push(r,l);return new wi(t)},Vt.render=function(e,t,r){if(!Si(t))throw Error(i(200));return bi(null,e,t,!1,r)},Vt.unmountComponentAtNode=function(e){if(!Si(e))throw Error(i(40));return e._reactRootContainer?(Cr(function(){bi(null,null,e,!1,function(){e._reactRootContainer=null,e[In]=null})}),!0):!1},Vt.unstable_batchedUpdates=$a,Vt.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!Si(r))throw Error(i(200));if(e==null||e._reactInternals===void 0)throw Error(i(38));return bi(e,t,r,!1,s)},Vt.version="18.3.1-next-f1338f8080-20240426",Vt}var Nf;function pg(){if(Nf)return Ha.exports;Nf=1;function n(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(o){console.error(o)}}return n(),Ha.exports=fg(),Ha.exports}var jf;function hg(){if(jf)return Ei;jf=1;var n=pg();return Ei.createRoot=n.createRoot,Ei.hydrateRoot=n.hydrateRoot,Ei}var mg=hg();const gg="modulepreload",yg=function(n){return"/"+n},Tf={},xp=function(o,i,u){let d=Promise.resolve();if(i&&i.length>0){let m=function(C){return Promise.all(C.map(_=>Promise.resolve(_).then(I=>({status:"fulfilled",value:I}),I=>({status:"rejected",reason:I}))))};document.getElementsByTagName("link");const x=document.querySelector("meta[property=csp-nonce]"),g=(x==null?void 0:x.nonce)||(x==null?void 0:x.getAttribute("nonce"));d=m(i.map(C=>{if(C=yg(C),C in Tf)return;Tf[C]=!0;const _=C.endsWith(".css"),I=_?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${C}"]${I}`))return;const P=document.createElement("link");if(P.rel=_?"stylesheet":gg,_||(P.as="script"),P.crossOrigin="",P.href=C,g&&P.setAttribute("nonce",g),document.head.appendChild(P),_)return new Promise((D,Z)=>{P.addEventListener("load",D),P.addEventListener("error",()=>Z(new Error(`Unable to preload CSS for ${C}`)))})}))}function p(m){const x=new Event("vite:preloadError",{cancelable:!0});if(x.payload=m,window.dispatchEvent(x),!x.defaultPrevented)throw m}return d.then(m=>{for(const x of m||[])x.status==="rejected"&&p(x.reason);return o().catch(p)})};var Xe="-ms-",us="-moz-",Fe="-webkit-",vp="comm",Zi="rule",Nu="decl",xg="@import",vg="@namespace",wp="@keyframes",wg="@layer",Sp=Math.abs,ju=String.fromCharCode,cu=Object.assign;function Sg(n,o){return ht(n,0)^45?(((o<<2^ht(n,0))<<2^ht(n,1))<<2^ht(n,2))<<2^ht(n,3):0}function bp(n){return n.trim()}function Un(n,o){return(n=o.exec(n))?n[0]:n}function Te(n,o,i){return n.replace(o,i)}function zi(n,o,i){return n.indexOf(o,i)}function ht(n,o){return n.charCodeAt(o)|0}function Ar(n,o,i){return n.slice(o,i)}function mn(n){return n.length}function kp(n){return n.length}function ss(n,o){return o.push(n),n}function bg(n,o){return n.map(o).join("")}function Rf(n,o){return n.filter(function(i){return!Un(i,o)})}var el=1,co=1,Ep=0,ln=0,ut=0,ho="";function tl(n,o,i,u,d,p,m,x){return{value:n,root:o,parent:i,type:u,props:d,children:p,line:el,column:co,length:m,return:"",siblings:x}}function pr(n,o){return cu(tl("",null,null,"",null,null,0,n.siblings),n,{length:-n.length},o)}function ro(n){for(;n.root;)n=pr(n.root,{children:[n]});ss(n,n.siblings)}function kg(){return ut}function Eg(){return ut=ln>0?ht(ho,--ln):0,co--,ut===10&&(co=1,el--),ut}function yn(){return ut=ln<Ep?ht(ho,ln++):0,co++,ut===10&&(co=1,el++),ut}function hr(){return ht(ho,ln)}function Fi(){return ln}function nl(n,o){return Ar(ho,n,o)}function ps(n){switch(n){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Cg(n){return el=co=1,Ep=mn(ho=n),ln=0,[]}function _g(n){return ho="",n}function Ga(n){return bp(nl(ln-1,du(n===91?n+2:n===40?n+1:n)))}function Ng(n){for(;(ut=hr())&&ut<33;)yn();return ps(n)>2||ps(ut)>3?"":" "}function jg(n,o){for(;--o&&yn()&&!(ut<48||ut>102||ut>57&&ut<65||ut>70&&ut<97););return nl(n,Fi()+(o<6&&hr()==32&&yn()==32))}function du(n){for(;yn();)switch(ut){case n:return ln;case 34:case 39:n!==34&&n!==39&&du(ut);break;case 40:n===41&&du(n);break;case 92:yn();break}return ln}function Tg(n,o){for(;yn()&&n+ut!==57;)if(n+ut===84&&hr()===47)break;return"/*"+nl(o,ln-1)+"*"+ju(n===47?n:yn())}function Rg(n){for(;!ps(hr());)yn();return nl(n,ln)}function $g(n){return _g(Di("",null,null,null,[""],n=Cg(n),0,[0],n))}function Di(n,o,i,u,d,p,m,x,g){for(var C=0,_=0,I=m,P=0,D=0,Z=0,W=1,ae=1,X=1,J=0,he="",Ce=d,_e=p,ve=u,re=he;ae;)switch(Z=J,J=yn()){case 40:if(Z!=108&&ht(re,I-1)==58){zi(re+=Te(Ga(J),"&","&\f"),"&\f",Sp(C?x[C-1]:0))!=-1&&(X=-1);break}case 34:case 39:case 91:re+=Ga(J);break;case 9:case 10:case 13:case 32:re+=Ng(Z);break;case 92:re+=jg(Fi()-1,7);continue;case 47:switch(hr()){case 42:case 47:ss(Ig(Tg(yn(),Fi()),o,i,g),g),(ps(Z||1)==5||ps(hr()||1)==5)&&mn(re)&&Ar(re,-1,void 0)!==" "&&(re+=" ");break;default:re+="/"}break;case 123*W:x[C++]=mn(re)*X;case 125*W:case 59:case 0:switch(J){case 0:case 125:ae=0;case 59+_:X==-1&&(re=Te(re,/\f/g,"")),D>0&&(mn(re)-I||W===0&&Z===47)&&ss(D>32?If(re+";",u,i,I-1,g):If(Te(re," ","")+";",u,i,I-2,g),g);break;case 59:re+=";";default:if(ss(ve=$f(re,o,i,C,_,d,x,he,Ce=[],_e=[],I,p),p),J===123)if(_===0)Di(re,o,ve,ve,Ce,p,I,x,_e);else{switch(P){case 99:if(ht(re,3)===110)break;case 108:if(ht(re,2)===97)break;default:_=0;case 100:case 109:case 115:}_?Di(n,ve,ve,u&&ss($f(n,ve,ve,0,0,d,x,he,d,Ce=[],I,_e),_e),d,_e,I,x,u?Ce:_e):Di(re,ve,ve,ve,[""],_e,0,x,_e)}}C=_=D=0,W=X=1,he=re="",I=m;break;case 58:I=1+mn(re),D=Z;default:if(W<1){if(J==123)--W;else if(J==125&&W++==0&&Eg()==125)continue}switch(re+=ju(J),J*W){case 38:X=_>0?1:(re+="\f",-1);break;case 44:x[C++]=(mn(re)-1)*X,X=1;break;case 64:hr()===45&&(re+=Ga(yn())),P=hr(),_=I=mn(he=re+=Rg(Fi())),J++;break;case 45:Z===45&&mn(re)==2&&(W=0)}}return p}function $f(n,o,i,u,d,p,m,x,g,C,_,I){for(var P=d-1,D=d===0?p:[""],Z=kp(D),W=0,ae=0,X=0;W<u;++W)for(var J=0,he=Ar(n,P+1,P=Sp(ae=m[W])),Ce=n;J<Z;++J)(Ce=bp(ae>0?D[J]+" "+he:Te(he,/&\f/g,D[J])))&&(g[X++]=Ce);return tl(n,o,i,d===0?Zi:x,g,C,_,I)}function Ig(n,o,i,u){return tl(n,o,i,vp,ju(kg()),Ar(n,2,-2),0,u)}function If(n,o,i,u,d){return tl(n,o,i,Nu,Ar(n,0,u),Ar(n,u+1,-1),u,d)}function Cp(n,o,i){switch(Sg(n,o)){case 5103:return Fe+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return Fe+n+n;case 4855:return Fe+n.replace("add","source-over").replace("substract","source-out").replace("intersect","source-in").replace("exclude","xor")+n;case 4789:return us+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return Fe+n+us+n+Xe+n+n;case 5936:switch(ht(n,o+11)){case 114:return Fe+n+Xe+Te(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return Fe+n+Xe+Te(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return Fe+n+Xe+Te(n,/[svh]\w+-[tblr]{2}/,"lr")+n}case 6828:case 4268:case 2903:return Fe+n+Xe+n+n;case 6165:return Fe+n+Xe+"flex-"+n+n;case 5187:return Fe+n+Te(n,/(\w+).+(:[^]+)/,Fe+"box-$1$2"+Xe+"flex-$1$2")+n;case 5443:return Fe+n+Xe+"flex-item-"+Te(n,/flex-|-self/g,"")+(Un(n,/flex-|baseline/)?"":Xe+"grid-row-"+Te(n,/flex-|-self/g,""))+n;case 4675:return Fe+n+Xe+"flex-line-pack"+Te(n,/align-content|flex-|-self/g,"")+n;case 5548:return Fe+n+Xe+Te(n,"shrink","negative")+n;case 5292:return Fe+n+Xe+Te(n,"basis","preferred-size")+n;case 6060:return Fe+"box-"+Te(n,"-grow","")+Fe+n+Xe+Te(n,"grow","positive")+n;case 4554:return Fe+Te(n,/([^-])(transform)/g,"$1"+Fe+"$2")+n;case 6187:return Te(Te(Te(n,/(zoom-|grab)/,Fe+"$1"),/(image-set)/,Fe+"$1"),n,"")+n;case 5495:case 3959:return Te(n,/(image-set\([^]*)/,Fe+"$1$`$1");case 4968:return Te(Te(n,/(.+:)(flex-)?(.*)/,Fe+"box-pack:$3"+Xe+"flex-pack:$3"),/space-between/,"justify")+Fe+n+n;case 4200:if(!Un(n,/flex-|baseline/))return Xe+"grid-column-align"+Ar(n,o)+n;break;case 2592:case 3360:return Xe+Te(n,"template-","")+n;case 4384:case 3616:return i&&i.some(function(u,d){return o=d,Un(u.props,/grid-\w+-end/)})?~zi(n+(i=i[o].value),"span",0)?n:Xe+Te(n,"-start","")+n+Xe+"grid-row-span:"+(~zi(i,"span",0)?Un(i,/\d+/):+Un(i,/\d+/)-+Un(n,/\d+/))+";":Xe+Te(n,"-start","")+n;case 4896:case 4128:return i&&i.some(function(u){return Un(u.props,/grid-\w+-start/)})?n:Xe+Te(Te(n,"-end","-span"),"span ","")+n;case 4095:case 3583:case 4068:case 2532:return Te(n,/(.+)-inline(.+)/,Fe+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(mn(n)-1-o>6)switch(ht(n,o+1)){case 109:if(ht(n,o+4)!==45)break;case 102:return Te(n,/(.+:)(.+)-([^]+)/,"$1"+Fe+"$2-$3$1"+us+(ht(n,o+3)==108?"$3":"$2-$3"))+n;case 115:return~zi(n,"stretch",0)?Cp(Te(n,"stretch","fill-available"),o,i)+n:n}break;case 5152:case 5920:return Te(n,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(u,d,p,m,x,g,C){return Xe+d+":"+p+C+(m?Xe+d+"-span:"+(x?g:+g-+p)+C:"")+n});case 4949:if(ht(n,o+6)===121)return Te(n,":",":"+Fe)+n;break;case 6444:switch(ht(n,ht(n,14)===45?18:11)){case 120:return Te(n,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+Fe+(ht(n,14)===45?"inline-":"")+"box$3$1"+Fe+"$2$3$1"+Xe+"$2box$3")+n;case 100:return Te(n,":",":"+Xe)+n}break;case 5719:case 2647:case 2135:case 3927:case 2391:return Te(n,"scroll-","scroll-snap-")+n}return n}function Ki(n,o){for(var i="",u=0;u<n.length;u++)i+=o(n[u],u,n,o)||"";return i}function Ag(n,o,i,u){switch(n.type){case wg:if(n.children.length)break;case xg:case vg:case Nu:return n.return=n.return||n.value;case vp:return"";case wp:return n.return=n.value+"{"+Ki(n.children,u)+"}";case Zi:if(!mn(n.value=n.props.join(",")))return""}return mn(i=Ki(n.children,u))?n.return=n.value+"{"+i+"}":""}function Pg(n){var o=kp(n);return function(i,u,d,p){for(var m="",x=0;x<o;x++)m+=n[x](i,u,d,p)||"";return m}}function Og(n){return function(o){o.root||(o=o.return)&&n(o)}}function Lg(n,o,i,u){if(n.length>-1&&!n.return)switch(n.type){case Nu:n.return=Cp(n.value,n.length,i);return;case wp:return Ki([pr(n,{value:Te(n.value,"@","@"+Fe)})],u);case Zi:if(n.length)return bg(i=n.props,function(d){switch(Un(d,u=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":ro(pr(n,{props:[Te(d,/:(read-\w+)/,":"+us+"$1")]})),ro(pr(n,{props:[d]})),cu(n,{props:Rf(i,u)});break;case"::placeholder":ro(pr(n,{props:[Te(d,/:(plac\w+)/,":"+Fe+"input-$1")]})),ro(pr(n,{props:[Te(d,/:(plac\w+)/,":"+us+"$1")]})),ro(pr(n,{props:[Te(d,/:(plac\w+)/,Xe+"input-$1")]})),ro(pr(n,{props:[d]})),cu(n,{props:Rf(i,u)});break}return""})}}var ao={};function Hn(n,...o){return new Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${n} for more information.${o.length>0?` Args: ${o.join(", ")}`:""}`)}var qa,Ya;const fo=typeof process<"u"&&ao!==void 0&&(ao.REACT_APP_SC_ATTR||ao.SC_ATTR)||"data-styled",_p="active",Np="data-styled-version",rl="6.6.0",Tu=`/*!sc*/
`,cs=typeof window<"u"&&typeof document<"u";if(!Rt.createContext)throw Hn(19);function Af(n){if(typeof process<"u"&&ao!==void 0){const o=ao[n];if(o!==void 0&&o!=="")return o!=="false"}}const Mg=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:(Ya=(qa=Af("REACT_APP_SC_DISABLE_SPEEDY"))!==null&&qa!==void 0?qa:Af("SC_DISABLE_SPEEDY"))!==null&&Ya!==void 0?Ya:typeof process<"u"&&ao!==void 0&&!1),jp="sc-keyframes-",zg={};let Bi=new Map,Xi=new Map,Ui=1;const is=n=>{if(Bi.has(n))return Bi.get(n);for(;Xi.has(Ui);)Ui++;const o=Ui++;return Bi.set(n,o),Xi.set(o,n),o},Fg=n=>Xi.get(n),Dg=(n,o)=>{Ui=o+1,Bi.set(n,o),Xi.set(o,n)},Ru=Object.freeze([]),po=Object.freeze({});function Tp(n,o,i=po){return n.theme!==i.theme&&n.theme||o||i.theme}const Bg=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ug=/(^-|-$)/g;function Rp(n){return n.replace(Bg,"-").replace(Ug,"")}const Hg=/(a)(d)/gi,Pf=n=>String.fromCharCode(n+(n>25?39:97));function $u(n){let o,i="";for(o=Math.abs(n);o>52;o=o/52|0)i=Pf(o%52)+i;return(Pf(o%52)+i).replace(Hg,"$1-$2")}const fu=5381,Ir=(n,o)=>{let i=o.length;for(;i;)n=33*n^o.charCodeAt(--i);return n},$p=n=>Ir(fu,n);function Iu(n){return $u($p(n)>>>0)}function Vg(n){return n.displayName||n.name||"Component"}function pu(n){return typeof n=="string"&&!0}function Wg(n){return pu(n)?`styled.${n}`:`Styled(${Vg(n)})`}const Ip=Symbol.for("react.memo"),Gg=Symbol.for("react.forward_ref"),qg={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Yg={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ap={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Qg={[Gg]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Ip]:Ap};function Of(n){return("type"in(o=n)&&o.type.$$typeof)===Ip?Ap:"$$typeof"in n?Qg[n.$$typeof]:qg;var o}const Kg=Object.defineProperty,Xg=Object.getOwnPropertyNames,Jg=Object.getOwnPropertySymbols,Zg=Object.getOwnPropertyDescriptor,e0=Object.getPrototypeOf,t0=Object.prototype;function Pp(n,o,i){if(typeof o!="string"){const u=e0(o);u&&u!==t0&&Pp(n,u,i);const d=Xg(o).concat(Jg(o)),p=Of(n),m=Of(o);for(let x=0;x<d.length;++x){const g=d[x];if(!(g in Yg||i&&i[g]||m&&g in m||p&&g in p)){const C=Zg(o,g);try{Kg(n,g,C)}catch{}}}}return n}function mo(n){return typeof n=="function"}const n0=Symbol.for("react.forward_ref");function Au(n){return n!=null&&(typeof n=="object"||typeof n=="function")&&n.$$typeof===n0&&"styledComponentId"in n}function ls(n,o){return n&&o?n+" "+o:n||o||""}function Ji(n,o){return n.join("")}function hs(n){return n!==null&&typeof n=="object"&&n.constructor.name===Object.name&&!("props"in n&&n.$$typeof)}function hu(n,o,i=!1){if(!i&&!hs(n)&&!Array.isArray(n))return o;if(Array.isArray(o))for(let u=0;u<o.length;u++)n[u]=hu(n[u],o[u]);else if(hs(o))for(const u in o)n[u]=hu(n[u],o[u]);return n}function Pu(n,o){Object.defineProperty(n,"toString",{value:o})}const r0=class{constructor(n){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=n,this._cGroup=0,this._cIndex=0}indexOfGroup(n){if(n===this._cGroup)return this._cIndex;let o=this._cIndex;if(n>this._cGroup)for(let i=this._cGroup;i<n;i++)o+=this.groupSizes[i];else for(let i=this._cGroup-1;i>=n;i--)o-=this.groupSizes[i];return this._cGroup=n,this._cIndex=o,o}insertRules(n,o){if(n>=this.groupSizes.length){const d=this.groupSizes,p=d.length;let m=p;for(;n>=m;)if(m<<=1,m<0)throw Hn(16,`${n}`);this.groupSizes=new Uint32Array(m),this.groupSizes.set(d),this.length=m;for(let x=p;x<m;x++)this.groupSizes[x]=0}let i=this.indexOfGroup(n+1),u=0;for(let d=0,p=o.length;d<p;d++)this.tag.insertRule(i,o[d])&&(this.groupSizes[n]++,i++,u++);u>0&&this._cGroup>n&&(this._cIndex+=u)}clearGroup(n){if(n<this.length){const o=this.groupSizes[n],i=this.indexOfGroup(n),u=i+o;this.groupSizes[n]=0;for(let d=i;d<u;d++)this.tag.deleteRule(i);o>0&&this._cGroup>n&&(this._cIndex-=o)}}getGroup(n){let o="";if(n>=this.length||this.groupSizes[n]===0)return o;const i=this.groupSizes[n],u=this.indexOfGroup(n),d=u+i;for(let p=u;p<d;p++)o+=this.tag.getRule(p)+Tu;return o}},o0=`style[${fo}][${Np}="${rl}"]`,s0=new RegExp(`^${fo}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Lf=n=>typeof ShadowRoot<"u"&&n instanceof ShadowRoot||"host"in n&&n.nodeType===11,mu=n=>{if(!n)return document;if(Lf(n))return n;if("getRootNode"in n){const o=n.getRootNode();if(Lf(o))return o}return document},i0=(n,o,i)=>{const u=i.split(",");let d;for(let p=0,m=u.length;p<m;p++)(d=u[p])&&n.registerName(o,d)},l0=(n,o)=>{var i;const u=((i=o.textContent)!==null&&i!==void 0?i:"").split(Tu),d=[];for(let p=0,m=u.length;p<m;p++){const x=u[p].trim();if(!x)continue;const g=x.match(s0);if(g){const C=0|parseInt(g[1],10),_=g[2];C!==0&&(Dg(_,C),i0(n,_,g[3]),n.getTag().insertRules(C,d)),d.length=0}else d.push(x)}},Qa=n=>{const i=mu(n.options.target).querySelectorAll(o0);for(let u=0,d=i.length;u<d;u++){const p=i[u];p&&p.getAttribute(fo)!==_p&&(l0(n,p),p.parentNode&&p.parentNode.removeChild(p))}};let es=!1;function a0(){if(es!==!1)return es;if(typeof document<"u"){const n=document.head.querySelector('meta[property="csp-nonce"]');if(n)return es=n.nonce||n.getAttribute("content")||void 0;const o=document.head.querySelector('meta[name="sc-nonce"]');if(o)return es=o.getAttribute("content")||void 0}return es=typeof __webpack_nonce__<"u"?__webpack_nonce__:void 0}const Op=(n,o)=>{if(typeof document>"u")throw Hn(20);const i=document.head,u=n||i,d=document.createElement("style"),p=(g=>{const C=Array.from(g.querySelectorAll(`style[${fo}]`));return C[C.length-1]})(u),m=p!==void 0?p.nextSibling:null;d.setAttribute(fo,_p),d.setAttribute(Np,rl);const x=o||a0();return x&&d.setAttribute("nonce",x),u.insertBefore(d,m),d},u0=class{constructor(n,o){this.element=Op(n,o),this.element.appendChild(document.createTextNode("")),this.sheet=(i=>{var u;if(i.sheet)return i.sheet;const d=(u=i.getRootNode().styleSheets)!==null&&u!==void 0?u:document.styleSheets;for(let p=0,m=d.length;p<m;p++){const x=d[p];if(x.ownerNode===i)return x}throw Hn(17)})(this.element),this.length=0}insertRule(n,o){try{return this.sheet.insertRule(o,n),this.length++,!0}catch{return!1}}deleteRule(n){this.sheet.deleteRule(n),this.length--}getRule(n){const o=this.sheet.cssRules[n];return o&&o.cssText?o.cssText:""}},c0=class{constructor(n,o){this.element=Op(n,o),this.nodes=this.element.childNodes,this.length=0}insertRule(n,o){if(n<=this.length&&n>=0){const i=document.createTextNode(o);return this.element.insertBefore(i,this.nodes[n]||null),this.length++,!0}return!1}deleteRule(n){this.element.removeChild(this.nodes[n]),this.length--}getRule(n){return n<this.length?this.nodes[n].textContent:""}};let Mf=cs;const d0={isServer:!cs,useCSSOMInjection:!Mg};class gs{static registerId(o){return is(o)}constructor(o=po,i={},u){this.options=Object.assign(Object.assign({},d0),o),this.gs=i,this.keyframeIds=new Set,this.names=new Map(u),this.server=!!o.isServer,!this.server&&cs&&Mf&&(Mf=!1,Qa(this)),Pu(this,()=>(d=>{const p=d.getTag(),{length:m}=p;let x="";for(let g=0;g<m;g++){const C=Fg(g);if(C===void 0)continue;const _=d.names.get(C);if(_===void 0||!_.size)continue;const I=p.getGroup(g);if(I.length===0)continue;const P=fo+".g"+g+'[id="'+C+'"]';let D="";for(const Z of _)Z.length>0&&(D+=Z+",");x+=I+P+'{content:"'+D+'"}'+Tu}return x})(this))}rehydrate(){!this.server&&cs&&Qa(this)}reconstructWithOptions(o,i=!0){const u=new gs(Object.assign(Object.assign({},this.options),o),this.gs,i&&this.names||void 0);return u.keyframeIds=new Set(this.keyframeIds),!this.server&&cs&&o.target!==this.options.target&&mu(this.options.target)!==mu(o.target)&&Qa(u),u}allocateGSInstance(o){return this.gs[o]=(this.gs[o]||0)+1}getTag(){return this.tag||(this.tag=(o=(({useCSSOMInjection:i,target:u,nonce:d})=>i?new u0(u,d):new c0(u,d))(this.options),new r0(o)));var o}hasNameForId(o,i){var u,d;return(d=(u=this.names.get(o))===null||u===void 0?void 0:u.has(i))!==null&&d!==void 0&&d}registerName(o,i){is(o),o.startsWith(jp)&&this.keyframeIds.add(o);const u=this.names.get(o);u?u.add(i):this.names.set(o,new Set([i]))}insertRules(o,i,u){this.registerName(o,i),this.getTag().insertRules(is(o),u)}clearNames(o){this.names.has(o)&&this.names.get(o).clear()}clearRules(o){this.getTag().clearGroup(is(o)),this.clearNames(o)}clearTag(){this.tag=void 0}}const Lp=new WeakSet,f0={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function p0(n,o){return o==null||typeof o=="boolean"||o===""?"":typeof o!="number"||o===0||n in f0||n.startsWith("--")?String(o).trim():o+"px"}const Rr=47;function zf(n){if(n.charCodeAt(0)===45&&n.charCodeAt(1)===45)return n;let o="";for(let i=0;i<n.length;i++){const u=n.charCodeAt(i);o+=u>=65&&u<=90?"-"+String.fromCharCode(u+32):n[i]}return o.startsWith("ms-")?"-"+o:o}const Mp=Symbol.for("sc-keyframes");function h0(n){return typeof n=="object"&&n!==null&&Mp in n}function zp(n){return mo(n)&&!(n.prototype&&n.prototype.isReactComponent)}const Fp=n=>n==null||n===!1||n==="",m0=Symbol.for("react.client.reference");function Ff(n){return n.$$typeof===m0}function Dp(n,o){for(const i in n){const u=n[i];n.hasOwnProperty(i)&&!Fp(u)&&(Array.isArray(u)&&Lp.has(u)||mo(u)?o.push(zf(i)+":",u,";"):hs(u)?(o.push(i+" {"),Dp(u,o),o.push("}")):o.push(zf(i)+": "+p0(i,u)+";"))}}function mr(n,o,i,u,d=[]){if(Fp(n))return d;const p=typeof n;if(p==="string")return d.push(n),d;if(p==="function"){if(Ff(n))return d;if(zp(n)&&o){const m=n(o);return mr(m,o,i,u,d)}return d.push(n),d}if(Array.isArray(n)){for(let m=0;m<n.length;m++)mr(n[m],o,i,u,d);return d}return Au(n)?(d.push(`.${n.styledComponentId}`),d):h0(n)?(i?(n.inject(i,u),d.push(n.getName(u))):d.push(n),d):Ff(n)?d:hs(n)?n.toString!==Object.prototype.toString?(d.push(n.toString()),d):(Dp(n,d),d):(d.push(n.toString()),d)}const g0=$p(rl);class y0{constructor(o,i,u){this.rules=o,this.componentId=i,this.baseHash=Ir(g0,i),this.baseStyle=u,gs.registerId(i)}generateAndInjectStyles(o,i,u){let d=this.baseStyle?this.baseStyle.generateAndInjectStyles(o,i,u):"";{let p="";for(let m=0;m<this.rules.length;m++){const x=this.rules[m];if(typeof x=="string")p+=x;else if(x)if(zp(x)){const g=x(o);typeof g=="string"?p+=g:g!=null&&g!==!1&&(p+=Ji(mr(g,o,i,u)))}else p+=Ji(mr(x,o,i,u))}if(p){this.dynamicNameCache||(this.dynamicNameCache=new Map);const m=u.hash?u.hash+p:p;let x=this.dynamicNameCache.get(m);if(!x){if(x=$u(Ir(Ir(this.baseHash,u.hash),p)>>>0),this.dynamicNameCache.size>=200){const g=this.dynamicNameCache.keys().next().value;g!==void 0&&this.dynamicNameCache.delete(g)}this.dynamicNameCache.set(m,x)}if(!i.hasNameForId(this.componentId,x)){const g=u(p,"."+x,void 0,this.componentId);i.insertRules(this.componentId,x,g)}d=ls(d,x)}}return d}}const x0=/&/g;function Bp(n,o){let i=0;for(;--o>=0&&n.charCodeAt(o)===92;)i++;return!(1&~i)}function Ka(n){const o=n.length;let i="",u=0,d=0,p=0,m=!1,x=!1;for(let g=0;g<o;g++){const C=n.charCodeAt(g);if(p!==0||m||C!==Rr||n.charCodeAt(g+1)!==42)if(m)C===42&&n.charCodeAt(g+1)===Rr&&(m=!1,g++);else if(C!==34&&C!==39||Bp(n,g)){if(p===0)if(C===123)d++;else if(C===125){if(d--,d<0){x=!0;let _=g+1;for(;_<o;){const I=n.charCodeAt(_);if(I===59||I===10)break;_++}_<o&&n.charCodeAt(_)===59&&_++,d=0,g=_-1,u=_;continue}d===0&&(i+=n.substring(u,g+1),u=g+1)}else C===59&&d===0&&(i+=n.substring(u,g+1),u=g+1)}else p===0?p=C:p===C&&(p=0);else m=!0,g++}return x||d!==0||p!==0?(u<o&&d===0&&p===0&&(i+=n.substring(u)),i):n}function Up(n,o){const i=o+" ",u=","+i;for(let d=0;d<n.length;d++){const p=n[d];if(p.type==="rule"){p.value=(i+p.value).replaceAll(",",u);const m=p.props,x=[];for(let g=0;g<m.length;g++)x[g]=i+m[g];p.props=x}Array.isArray(p.children)&&p.type!=="@keyframes"&&Up(p.children,o)}return n}function v0({options:n=po,plugins:o=Ru}=po){let i,u,d;const p=(P,D,Z)=>Z.startsWith(u)&&Z.endsWith(u)&&Z.replaceAll(u,"").length>0?`.${i}`:P,m=o.slice();m.push(P=>{P.type===Zi&&P.value.includes("&")&&(d||(d=new RegExp(`\\${u}\\b`,"g")),P.props[0]=P.props[0].replace(x0,u).replace(d,p))}),n.prefix&&m.push(Lg),m.push(Ag);let x=[];const g=Pg(m.concat(Og(P=>x.push(P)))),C=(P,D="",Z="",W="&")=>{i=W,u=D,d=void 0;const ae=(function(J){const he=J.indexOf("//")!==-1,Ce=J.indexOf("}")!==-1;if(!he&&!Ce)return J;if(!he)return Ka(J);const _e=J.length;let ve="",re=0,te=0,pe=0,V=0,q=0,K=!1;for(;te<_e;){const oe=J.charCodeAt(te);if(oe!==34&&oe!==39||Bp(J,te))if(pe===0)if(oe===Rr&&te+1<_e&&J.charCodeAt(te+1)===42){for(te+=2;te+1<_e&&(J.charCodeAt(te)!==42||J.charCodeAt(te+1)!==Rr);)te++;te+=2}else if(oe!==40)if(oe!==41)if(V>0)te++;else if(oe===42&&te+1<_e&&J.charCodeAt(te+1)===Rr)ve+=J.substring(re,te),te+=2,re=te,K=!0;else if(oe===Rr&&te+1<_e&&J.charCodeAt(te+1)===Rr){for(ve+=J.substring(re,te);te<_e&&J.charCodeAt(te)!==10;)te++;re=te,K=!0}else oe===123?q++:oe===125&&q--,te++;else V>0&&V--,te++;else V++,te++;else te++;else pe===0?pe=oe:pe===oe&&(pe=0),te++}return K?(re<_e&&(ve+=J.substring(re)),q===0?ve:Ka(ve)):q===0?J:Ka(J)})(P);let X=$g(Z||D?Z+" "+D+" { "+ae+" }":ae);return n.namespace&&(X=Up(X,n.namespace)),x=[],Ki(X,g),x},_=n;let I=fu;for(let P=0;P<o.length;P++)o[P].name||Hn(15),I=Ir(I,o[P].name);return _!=null&&_.namespace&&(I=Ir(I,_.namespace)),_!=null&&_.prefix&&(I=Ir(I,"p")),C.hash=I!==fu?I.toString():"",C}const w0=new gs,gu=v0(),Hp=Rt.createContext({shouldForwardProp:void 0,styleSheet:w0,stylis:gu,stylisPlugins:void 0});Hp.Consumer;function Vp(){return Rt.useContext(Hp)}const ms=Rt.createContext(void 0);ms.Consumer;function Hi(n){const o=Rt.useContext(ms),i=Rt.useMemo(()=>(function(u,d){if(!u)throw Hn(14);if(mo(u))return u(d);if(Array.isArray(u)||typeof u!="object")throw Hn(8);return d?Object.assign(Object.assign({},d),u):u})(n.theme,o),[n.theme,o]);return n.children?Rt.createElement(ms.Provider,{value:i},n.children):null}const Xa={};function S0(n,o){const i=typeof n!="string"?"sc":Rp(n);Xa[i]=(Xa[i]||0)+1;const u=i+"-"+Iu(rl+i+Xa[i]);return o?o+"-"+u:u}function b0(n,o,i){const u=Au(n),d=n,p=!pu(n),{attrs:m=Ru,componentId:x=S0(o.displayName,o.parentComponentId),displayName:g=Wg(n)}=o,C=o.displayName&&o.componentId?Rp(o.displayName)+"-"+o.componentId:o.componentId||x,_=u&&d.attrs?d.attrs.concat(m).filter(Boolean):m;let{shouldForwardProp:I}=o;if(u&&d.shouldForwardProp){const W=d.shouldForwardProp;if(o.shouldForwardProp){const ae=o.shouldForwardProp;I=(X,J)=>W(X,J)&&ae(X,J)}else I=W}const P=new y0(i,C,u?d.componentStyle:void 0);function D(W,ae){return(function(X,J,he){const{attrs:Ce,componentStyle:_e,defaultProps:ve,foldedComponentIds:re,styledComponentId:te,target:pe}=X,V=Rt.useContext(ms),q=Vp(),K=X.shouldForwardProp||q.shouldForwardProp,oe=Tp(J,V,ve)||po,[Ee,Ae]=(function(w,j,ue){const U=Object.assign(Object.assign({},j),{className:void 0,theme:ue});let N=null;const ge=w.length>1;for(let be=0;be<w.length;be++){const Y=w[be],ke=mo(Y)?Y(ge?Object.assign({},U):U):Y;for(const Ne in ke)Ne==="className"?U.className=ls(U.className,ke[Ne]):Ne==="style"?U.style=Object.assign(Object.assign({},U.style),ke[Ne]):ke[Ne]===void 0?Ne in U&&(U[Ne]!==void 0&&(N||(N=[])).push(Ne),U[Ne]=void 0):U[Ne]=ke[Ne]}return"className"in j&&typeof j.className=="string"&&(U.className=ls(U.className,j.className)),[U,N]})(Ce,J,oe),Le=_e.generateAndInjectStyles(Ee,q.styleSheet,q.stylis),fe=Ee.as||pe,O=pu(fe),ne=(function(w,j,ue,U,N,ge){const be={};for(const Y in w)Y[0]==="$"||Y==="as"||Y==="theme"&&w.theme===ue||(Y==="forwardedAs"?w.forwardedAs!==void 0&&(be.as=w.forwardedAs):w[Y]===void 0?Y==="className"||N||ge!==null&&ge.indexOf(Y)!==-1||U&&!U(Y,j)||(be[Y]=void 0):U&&!U(Y,j)||(be[Y]=w[Y]));return be})(Ee,fe,oe,K,O,Ae);let M=ls(re,te);return Le&&(M+=" "+Le),Ee.className&&(M+=" "+Ee.className),ne[O&&fe.includes("-")?"class":"className"]=M,he&&(ne.ref=he),R.createElement(fe,ne)})(Z,W,ae)}D.displayName=g;let Z=Rt.forwardRef(D);return Z.attrs=_,Z.componentStyle=P,Z.displayName=g,Z.shouldForwardProp=I,Z.foldedComponentIds=u?ls(d.foldedComponentIds,d.styledComponentId):"",Z.styledComponentId=C,Z.target=u?d.target:n,Object.defineProperty(Z,"defaultProps",{get(){return this._foldedDefaultProps},set(W){this._foldedDefaultProps=u?(function(ae,...X){for(const J of X)hu(ae,J,!0);return ae})({},d.defaultProps,W):W}}),Pu(Z,()=>`.${Z.styledComponentId}`),p&&Pp(Z,n,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),Z}var k0=new Set(["a","abbr","address","area","article","aside","audio","b","bdi","bdo","blockquote","body","button","br","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","main","map","mark","menu","meter","nav","object","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","slot","small","span","strong","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","switch","symbol","text","textPath","tspan","use"]);function Df(n,o){const i=[n[0]];for(let u=0,d=o.length;u<d;u+=1)i.push(o[u],n[u+1]);return i}const Bf=n=>(Lp.add(n),n);function Ou(n,...o){if(mo(n)||hs(n))return Bf(mr(Df(Ru,[n,...o])));const i=n;return o.length===0&&i.length===1&&typeof i[0]=="string"?mr(i):Bf(mr(Df(i,o)))}function yu(n,o,i=po){if(!o)throw Hn(1,o);const u=(d,...p)=>n(o,i,Ou(d,...p));return u.attrs=d=>yu(n,o,Object.assign(Object.assign({},i),{attrs:Array.prototype.concat(i.attrs,d).filter(Boolean)})),u.withConfig=d=>yu(n,o,Object.assign(Object.assign({},i),d)),u}const Wp=n=>yu(b0,n),T=Wp;k0.forEach(n=>{T[n]=Wp(n)});class E0{constructor(o,i){this.instanceRules=new Map,this.rules=o,this.componentId=i,this.isStatic=(function(u){for(let d=0;d<u.length;d+=1){const p=u[d];if(mo(p)&&!Au(p))return!1}return!0})(o),gs.registerId(this.componentId)}removeStyles(o,i){this.instanceRules.delete(o),this.rebuildGroup(i)}renderStyles(o,i,u,d){const p=this.componentId;if(this.isStatic){if(u.hasNameForId(p,p+o))this.instanceRules.has(o)||this.computeRules(o,i,u,d);else{const x=this.computeRules(o,i,u,d);u.insertRules(p,x.name,x.rules)}return}const m=this.instanceRules.get(o);if(this.computeRules(o,i,u,d),!u.server&&m){const x=m.rules,g=this.instanceRules.get(o).rules;if(x.length===g.length){let C=!0;for(let _=0;_<x.length;_++)if(x[_]!==g[_]){C=!1;break}if(C)return}}this.rebuildGroup(u)}computeRules(o,i,u,d){const p=Ji(mr(this.rules,i,u,d)),m={name:this.componentId+o,rules:d(p,"")};return this.instanceRules.set(o,m),m}rebuildGroup(o){const i=this.componentId;o.clearRules(i);for(const u of this.instanceRules.values())o.insertRules(i,u.name,u.rules)}}function C0(n,...o){const i=Ou(n,...o),u=`sc-global-${Iu(JSON.stringify(i))}`,d=new E0(i,u),p=x=>{const g=Vp(),C=Rt.useContext(ms);let _;{const I=Rt.useRef(null);I.current===null&&(I.current=g.styleSheet.allocateGSInstance(u)),_=I.current}g.styleSheet.server&&m(_,x,g.styleSheet,C,g.stylis);{const I=d.isStatic?[_,g.styleSheet,d]:[_,x,g.styleSheet,C,g.stylis,d],P=Rt.useRef(d);Rt.useLayoutEffect(()=>{g.styleSheet.server||(P.current!==d&&(g.styleSheet.clearRules(u),P.current=d),m(_,x,g.styleSheet,C,g.stylis))},I),Rt.useLayoutEffect(()=>()=>{g.styleSheet.server||d.removeStyles(_,g.styleSheet)},[_,g.styleSheet,d])}return g.styleSheet.server&&d.instanceRules.delete(_),null};function m(x,g,C,_,I){if(d.isStatic)d.renderStyles(x,zg,C,I);else{const P=Object.assign(Object.assign({},g),{theme:Tp(g,_,p.defaultProps)});d.renderStyles(x,P,C,I)}}return Rt.memo(p)}var Gp;class _0{constructor(o,i){this[Gp]=!0,this.inject=(u,d=gu)=>{const p=this.getName(d);if(!u.hasNameForId(this.id,p)){const m=d(this.rules,p,"@keyframes");u.insertRules(this.id,p,m)}},this.name=o,this.id=jp+o,this.rules=i,is(this.id),Pu(this,()=>{throw Hn(12,String(this.name))})}getName(o=gu){return o.hash?this.name+$u(+o.hash>>>0):this.name}}function N0(n,...o){const i=Ji(Ou(n,...o)),u=Iu(i);return new _0(u,i)}Gp=Mp;const me={colors:{bgCanvas:"#F4F5F2",bgSurface:"#FFFFFF",bgSurfaceSubtle:"#F6F7F4",bgSurfaceHover:"#EEF1EC",bgElevated:"#FFFFFF",bgGlassHeavy:"rgba(255, 255, 255, 0.96)",borderSubtle:"rgba(30, 36, 32, 0.09)",borderStrong:"rgba(30, 36, 32, 0.18)",textPrimary:"#1E2420",textSecondary:"#5B655F",textMuted:"#7B857F",brandPrimary:"#2D6A4F",brandPrimaryHover:"#23533D",brandPrimaryLight:"#52796B",brandPrimarySubtle:"rgba(45, 106, 79, 0.09)",accentMuted:"#3E5C52",status:{NORMAL:"#2D6A4F",WARNING:"#B45309",CRITICAL:"#C81E1E",OFFLINE:"#64748B"},statusBg:{NORMAL:"rgba(45, 106, 79, 0.10)",WARNING:"rgba(180, 83, 9, 0.10)",CRITICAL:"rgba(200, 30, 30, 0.09)",OFFLINE:"rgba(100, 116, 139, 0.11)"}},radius:{sm:"6px",md:"10px",lg:"12px",pill:"999px"},motion:{ease:"cubic-bezier(0.2, 0.8, 0.2, 1)",fast:"150ms",press:"90ms",panel:"200ms"},shadows:{sm:"0 1px 2px rgba(30, 36, 32, 0.04)",md:"0 6px 20px rgba(30, 36, 32, 0.07)",lg:"0 18px 44px rgba(30, 36, 32, 0.12)"},fonts:{sans:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",display:"'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",mono:"'JetBrains Mono', 'Consolas', monospace"}},Y1={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"},j0={LOW:"Baixo",MEDIUM:"Médio",HIGH:"Alto"};function qp(n,o="2.3.0"){if(!n||typeof n!="string")return!1;const i=p=>{const m=String(p).match(/(\d+)\.(\d+)(?:\.(\d+))?/);return m?[Number(m[1]),Number(m[2]),Number(m[3]||0)]:null},u=i(n),d=i(o);if(!u||!d)return!1;for(let p=0;p<3;p+=1){if(u[p]<d[p])return!0;if(u[p]>d[p])return!1}return!1}function we(n){if(!n||typeof n!="string")return n||"";if(!n.includes("Ã")&&!n.includes("Â"))return n;try{const o=new Uint8Array(n.length);for(let u=0;u<n.length;u++)o[u]=n.charCodeAt(u)&255;const i=new TextDecoder("utf-8",{fatal:!1}).decode(o);if(!i.includes("�"))return i}catch{}return n.replace(/Ã“/g,"Ó").replace(/Ã§/g,"ç").replace(/Ã£/g,"ã").replace(/Ã¡/g,"á").replace(/Ã©/g,"é").replace(/Ã­/g,"í").replace(/Ã³/g,"ó").replace(/Ãº/g,"ú").replace(/Ã¢/g,"â").replace(/Ãª/g,"ê").replace(/Ã´/g,"ô").replace(/Ã‡/g,"Ç").replace(/Ãƒ/g,"Ã")}const Vi=C0`
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
`,jn=Object.create(null);jn.open="0";jn.close="1";jn.ping="2";jn.pong="3";jn.message="4";jn.upgrade="5";jn.noop="6";const Wi=Object.create(null);Object.keys(jn).forEach(n=>{Wi[jn[n]]=n});const xu={type:"error",data:"parser error"},Yp=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Qp=typeof ArrayBuffer=="function",Kp=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,Lu=({type:n,data:o},i,u)=>Yp&&o instanceof Blob?i?u(o):Uf(o,u):Qp&&(o instanceof ArrayBuffer||Kp(o))?i?u(o):Uf(new Blob([o]),u):u(jn[n]+(o||"")),Uf=(n,o)=>{const i=new FileReader;return i.onload=function(){const u=i.result.split(",")[1];o("b"+(u||""))},i.readAsDataURL(n)};function Hf(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let Ja;function T0(n,o){if(Yp&&n.data instanceof Blob)return n.data.arrayBuffer().then(Hf).then(o);if(Qp&&(n.data instanceof ArrayBuffer||Kp(n.data)))return o(Hf(n.data));Lu(n,!1,i=>{Ja||(Ja=new TextEncoder),o(Ja.encode(i))})}const Vf="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",as=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<Vf.length;n++)as[Vf.charCodeAt(n)]=n;const R0=n=>{let o=n.length*.75,i=n.length,u,d=0,p,m,x,g;n[n.length-1]==="="&&(o--,n[n.length-2]==="="&&o--);const C=new ArrayBuffer(o),_=new Uint8Array(C);for(u=0;u<i;u+=4)p=as[n.charCodeAt(u)],m=as[n.charCodeAt(u+1)],x=as[n.charCodeAt(u+2)],g=as[n.charCodeAt(u+3)],_[d++]=p<<2|m>>4,_[d++]=(m&15)<<4|x>>2,_[d++]=(x&3)<<6|g&63;return C},$0=typeof ArrayBuffer=="function",Mu=(n,o)=>{if(typeof n!="string")return{type:"message",data:Xp(n,o)};const i=n.charAt(0);return i==="b"?{type:"message",data:I0(n.substring(1),o)}:Wi[i]?n.length>1?{type:Wi[i],data:n.substring(1)}:{type:Wi[i]}:xu},I0=(n,o)=>{if($0){const i=R0(n);return Xp(i,o)}else return{base64:!0,data:n}},Xp=(n,o)=>{switch(o){case"blob":return n instanceof Blob?n:new Blob([n]);case"arraybuffer":default:return n instanceof ArrayBuffer?n:n.buffer}},Jp="",A0=(n,o)=>{const i=n.length,u=new Array(i);let d=0;n.forEach((p,m)=>{Lu(p,!1,x=>{u[m]=x,++d===i&&o(u.join(Jp))})})},P0=(n,o)=>{const i=n.split(Jp),u=[];for(let d=0;d<i.length;d++){const p=Mu(i[d],o);if(u.push(p),p.type==="error")break}return u};function O0(){return new TransformStream({transform(n,o){T0(n,i=>{const u=i.length;let d;if(u<126)d=new Uint8Array(1),new DataView(d.buffer).setUint8(0,u);else if(u<65536){d=new Uint8Array(3);const p=new DataView(d.buffer);p.setUint8(0,126),p.setUint16(1,u)}else{d=new Uint8Array(9);const p=new DataView(d.buffer);p.setUint8(0,127),p.setBigUint64(1,BigInt(u))}n.data&&typeof n.data!="string"&&(d[0]|=128),o.enqueue(d),o.enqueue(i)})}})}let Za;function Ci(n){return n.reduce((o,i)=>o+i.length,0)}function _i(n,o){if(n[0].length===o)return n.shift();const i=new Uint8Array(o);let u=0;for(let d=0;d<o;d++)i[d]=n[0][u++],u===n[0].length&&(n.shift(),u=0);return n.length&&u<n[0].length&&(n[0]=n[0].slice(u)),i}function L0(n,o){Za||(Za=new TextDecoder);const i=[];let u=0,d=-1,p=!1;return new TransformStream({transform(m,x){for(i.push(m);;){if(u===0){if(Ci(i)<1)break;const g=_i(i,1);p=(g[0]&128)===128,d=g[0]&127,d<126?u=3:d===126?u=1:u=2}else if(u===1){if(Ci(i)<2)break;const g=_i(i,2);d=new DataView(g.buffer,g.byteOffset,g.length).getUint16(0),u=3}else if(u===2){if(Ci(i)<8)break;const g=_i(i,8),C=new DataView(g.buffer,g.byteOffset,g.length),_=C.getUint32(0);if(_>Math.pow(2,21)-1){x.enqueue(xu);break}d=_*Math.pow(2,32)+C.getUint32(4),u=3}else{if(Ci(i)<d)break;const g=_i(i,d);x.enqueue(Mu(p?g:Za.decode(g),o)),u=0}if(d===0||d>n){x.enqueue(xu);break}}}})}const Zp=4;function ct(n){if(n)return M0(n)}function M0(n){for(var o in ct.prototype)n[o]=ct.prototype[o];return n}ct.prototype.on=ct.prototype.addEventListener=function(n,o){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(o),this};ct.prototype.once=function(n,o){function i(){this.off(n,i),o.apply(this,arguments)}return i.fn=o,this.on(n,i),this};ct.prototype.off=ct.prototype.removeListener=ct.prototype.removeAllListeners=ct.prototype.removeEventListener=function(n,o){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var i=this._callbacks["$"+n];if(!i)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var u,d=0;d<i.length;d++)if(u=i[d],u===o||u.fn===o){i.splice(d,1);break}return i.length===0&&delete this._callbacks["$"+n],this};ct.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var o=new Array(arguments.length-1),i=this._callbacks["$"+n],u=1;u<arguments.length;u++)o[u-1]=arguments[u];if(i){i=i.slice(0);for(var u=0,d=i.length;u<d;++u)i[u].apply(this,o)}return this};ct.prototype.emitReserved=ct.prototype.emit;ct.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};ct.prototype.hasListeners=function(n){return!!this.listeners(n).length};const ol=typeof Promise=="function"&&typeof Promise.resolve=="function"?o=>Promise.resolve().then(o):(o,i)=>i(o,0),sn=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),z0="arraybuffer";function eh(n,...o){return o.reduce((i,u)=>(n.hasOwnProperty(u)&&(i[u]=n[u]),i),{})}const F0=sn.setTimeout,D0=sn.clearTimeout;function sl(n,o){o.useNativeTimers?(n.setTimeoutFn=F0.bind(sn),n.clearTimeoutFn=D0.bind(sn)):(n.setTimeoutFn=sn.setTimeout.bind(sn),n.clearTimeoutFn=sn.clearTimeout.bind(sn))}const B0=1.33;function U0(n){return typeof n=="string"?H0(n):Math.ceil((n.byteLength||n.size)*B0)}function H0(n){let o=0,i=0;for(let u=0,d=n.length;u<d;u++)o=n.charCodeAt(u),o<128?i+=1:o<2048?i+=2:o<55296||o>=57344?i+=3:(u++,i+=4);return i}function th(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function V0(n){let o="";for(let i in n)n.hasOwnProperty(i)&&(o.length&&(o+="&"),o+=encodeURIComponent(i)+"="+encodeURIComponent(n[i]));return o}function W0(n){let o={},i=n.split("&");for(let u=0,d=i.length;u<d;u++){let p=i[u].split("=");o[decodeURIComponent(p[0])]=decodeURIComponent(p[1])}return o}class G0 extends Error{constructor(o,i,u){super(o),this.description=i,this.context=u,this.type="TransportError"}}class zu extends ct{constructor(o){super(),this.writable=!1,sl(this,o),this.opts=o,this.query=o.query,this.socket=o.socket,this.supportsBinary=!o.forceBase64}onError(o,i,u){return super.emitReserved("error",new G0(o,i,u)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(o){this.readyState==="open"&&this.write(o)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(o){const i=Mu(o,this.socket.binaryType);this.onPacket(i)}onPacket(o){super.emitReserved("packet",o)}onClose(o){this.readyState="closed",super.emitReserved("close",o)}pause(o){}createUri(o,i={}){return o+"://"+this._hostname()+this._port()+this.opts.path+this._query(i)}_hostname(){const o=this.opts.hostname;return o.indexOf(":")===-1?o:"["+o+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(o){const i=V0(o);return i.length?"?"+i:""}}class q0 extends zu{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(o){this.readyState="pausing";const i=()=>{this.readyState="paused",o()};if(this._polling||!this.writable){let u=0;this._polling&&(u++,this.once("pollComplete",function(){--u||i()})),this.writable||(u++,this.once("drain",function(){--u||i()}))}else i()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(o){const i=u=>{if(this.readyState==="opening"&&u.type==="open"&&this.onOpen(),u.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(u)};P0(o,this.socket.binaryType).forEach(i),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const o=()=>{this.write([{type:"close"}])};this.readyState==="open"?o():this.once("open",o)}write(o){this.writable=!1,A0(o,i=>{this.doWrite(i,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const o=this.opts.secure?"https":"http",i=this.query||{};return this.opts.timestampRequests!==!1&&(i[this.opts.timestampParam]=th()),!this.supportsBinary&&!i.sid&&(i.b64=1),this.createUri(o,i)}}let nh=!1;try{nh=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const Y0=nh;function Q0(){}class K0 extends q0{constructor(o){if(super(o),typeof location<"u"){const i=location.protocol==="https:";let u=location.port;u||(u=i?"443":"80"),this.xd=typeof location<"u"&&o.hostname!==location.hostname||u!==o.port}}doWrite(o,i){const u=this.request({method:"POST",data:o});u.on("success",i),u.on("error",(d,p)=>{this.onError("xhr post error",d,p)})}doPoll(){const o=this.request();o.on("data",this.onData.bind(this)),o.on("error",(i,u)=>{this.onError("xhr poll error",i,u)}),this.pollXhr=o}}class Nn extends ct{constructor(o,i,u){super(),this.createRequest=o,sl(this,u),this._opts=u,this._method=u.method||"GET",this._uri=i,this._data=u.data!==void 0?u.data:null,this._create()}_create(){var o;const i=eh(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");i.xdomain=!!this._opts.xd;const u=this._xhr=this.createRequest(i);try{u.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){u.setDisableHeaderCheck&&u.setDisableHeaderCheck(!0);for(let d in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(d)&&u.setRequestHeader(d,this._opts.extraHeaders[d])}}catch{}if(this._method==="POST")try{u.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{u.setRequestHeader("Accept","*/*")}catch{}(o=this._opts.cookieJar)===null||o===void 0||o.addCookies(u),"withCredentials"in u&&(u.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(u.timeout=this._opts.requestTimeout),u.onreadystatechange=()=>{var d;u.readyState===3&&((d=this._opts.cookieJar)===null||d===void 0||d.parseCookies(u.getResponseHeader("set-cookie"))),u.readyState===4&&(u.status===200||u.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof u.status=="number"?u.status:0)},0))},u.send(this._data)}catch(d){this.setTimeoutFn(()=>{this._onError(d)},0);return}typeof document<"u"&&(this._index=Nn.requestsCount++,Nn.requests[this._index]=this)}_onError(o){this.emitReserved("error",o,this._xhr),this._cleanup(!0)}_cleanup(o){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=Q0,o)try{this._xhr.abort()}catch{}typeof document<"u"&&delete Nn.requests[this._index],this._xhr=null}}_onLoad(){const o=this._xhr.responseText;o!==null&&(this.emitReserved("data",o),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}Nn.requestsCount=0;Nn.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",Wf);else if(typeof addEventListener=="function"){const n="onpagehide"in sn?"pagehide":"unload";addEventListener(n,Wf,!1)}}function Wf(){for(let n in Nn.requests)Nn.requests.hasOwnProperty(n)&&Nn.requests[n].abort()}const X0=(function(){const n=rh({xdomain:!1});return n&&n.responseType!==null})();class J0 extends K0{constructor(o){super(o);const i=o&&o.forceBase64;this.supportsBinary=X0&&!i}request(o={}){return Object.assign(o,{xd:this.xd},this.opts),new Nn(rh,this.uri(),o)}}function rh(n){const o=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!o||Y0))return new XMLHttpRequest}catch{}if(!o)try{return new sn[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const oh=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Z0 extends zu{get name(){return"websocket"}doOpen(){const o=this.uri(),i=this.opts.protocols,u=oh?{}:eh(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(u.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(o,i,u)}catch(d){return this.emitReserved("error",d)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=o=>this.onClose({description:"websocket connection closed",context:o}),this.ws.onmessage=o=>this.onData(o.data),this.ws.onerror=o=>this.onError("websocket error",o)}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const u=o[i],d=i===o.length-1;Lu(u,this.supportsBinary,p=>{try{this.doWrite(u,p)}catch{}d&&ol(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const o=this.opts.secure?"wss":"ws",i=this.query||{};return this.opts.timestampRequests&&(i[this.opts.timestampParam]=th()),this.supportsBinary||(i.b64=1),this.createUri(o,i)}}const eu=sn.WebSocket||sn.MozWebSocket;class ey extends Z0{createSocket(o,i,u){return oh?new eu(o,i,u):i?new eu(o,i):new eu(o)}doWrite(o,i){this.ws.send(i)}}class ty extends zu{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(o){return this.emitReserved("error",o)}this._transport.closed.then(()=>{this.onClose()}).catch(o=>{this.onError("webtransport error",o)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(o=>{const i=L0(Number.MAX_SAFE_INTEGER,this.socket.binaryType),u=o.readable.pipeThrough(i).getReader(),d=O0();d.readable.pipeTo(o.writable),this._writer=d.writable.getWriter();const p=()=>{u.read().then(({done:x,value:g})=>{x||(this.onPacket(g),p())}).catch(x=>{})};p();const m={type:"open"};this.query.sid&&(m.data=`{"sid":"${this.query.sid}"}`),this._writer.write(m).then(()=>this.onOpen())})})}write(o){this.writable=!1;for(let i=0;i<o.length;i++){const u=o[i],d=i===o.length-1;this._writer.write(u).then(()=>{d&&ol(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var o;(o=this._transport)===null||o===void 0||o.close()}}const ny={websocket:ey,webtransport:ty,polling:J0},ry=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,oy=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function vu(n){if(n.length>8e3)throw"URI too long";const o=n,i=n.indexOf("["),u=n.indexOf("]");i!=-1&&u!=-1&&(n=n.substring(0,i)+n.substring(i,u).replace(/:/g,";")+n.substring(u,n.length));let d=ry.exec(n||""),p={},m=14;for(;m--;)p[oy[m]]=d[m]||"";return i!=-1&&u!=-1&&(p.source=o,p.host=p.host.substring(1,p.host.length-1).replace(/;/g,":"),p.authority=p.authority.replace("[","").replace("]","").replace(/;/g,":"),p.ipv6uri=!0),p.pathNames=sy(p,p.path),p.queryKey=iy(p,p.query),p}function sy(n,o){const i=/\/{2,9}/g,u=o.replace(i,"/").split("/");return(o.slice(0,1)=="/"||o.length===0)&&u.splice(0,1),o.slice(-1)=="/"&&u.splice(u.length-1,1),u}function iy(n,o){const i={};return o.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(u,d,p){d&&(i[d]=p)}),i}const wu=typeof addEventListener=="function"&&typeof removeEventListener=="function",Gi=[];wu&&addEventListener("offline",()=>{Gi.forEach(n=>n())},!1);let sh=class lo extends ct{constructor(o,i={}){var u,d;if(super(),this.binaryType=z0,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,o&&typeof o=="object"&&(i=o,o=null),o){const p=vu(o);i.hostname=p.host,i.secure=p.protocol==="https"||p.protocol==="wss",i.port=p.port,p.query&&(i.query=p.query)}else i.host&&(i.hostname=vu(i.host).host);if(sl(this,i),this.secure=i.secure!=null?i.secure:typeof location<"u"&&location.protocol==="https:",i.hostname&&!i.port&&(i.port=this.secure?"443":"80"),this.hostname=i.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=i.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),i.transportImplementations&&i.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");i.transportImplementations||!((u=i.transports)===null||u===void 0)&&u.length&&typeof i.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((d=i.transportImplementations)!==null&&d!==void 0?d:i.transports).forEach(p=>{const m=p.prototype.name;this.transports.push(m),this._transportsByName[m]=p})):(this.transports=i.transports?[...i.transports]:["polling","websocket","webtransport"],this._transportsByName=ny),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},i),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=W0(this.opts.query)),wu&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Gi.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(o){const i=Object.assign({},this.opts.query);i.EIO=Zp,i.transport=o,this.id&&(i.sid=this.id);const u=Object.assign({},this.opts,{query:i,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[o]);return new this._transportsByName[o](u)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const o=this.opts.rememberUpgrade&&lo.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const i=this.createTransport(o);i.open(),this.setTransport(i)}setTransport(o){this.transport&&this.transport.removeAllListeners(),this.transport=o,o.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",i=>this._onClose("transport close",i))}_probe(o){let i=this.createTransport(o),u=!1;lo.priorWebsocketSuccess=!1;const d=()=>{u||(i.send([{type:"ping",data:"probe"}]),i.once("packet",I=>{if(!u)if(I.type==="pong"&&I.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",i),!i)return;lo.priorWebsocketSuccess=i.name==="websocket",this.transport.pause(()=>{u||this.readyState!=="closed"&&(_(),this.setTransport(i),i.send([{type:"upgrade"}]),this.emitReserved("upgrade",i),i=null,this.upgrading=!1,this.flush())})}else{const P=new Error("probe error");P.transport=i.name,this.emitReserved("upgradeError",P)}}))};function p(){u||(u=!0,_(),i.close(),i=null)}const m=I=>{const P=new Error("probe error: "+I);P.transport=i.name,p(),this.emitReserved("upgradeError",P)};function x(){m("transport closed")}function g(){m("socket closed")}function C(I){i&&I.name!==i.name&&p()}const _=()=>{i.removeListener("open",d),i.removeListener("error",m),i.removeListener("close",x),this.off("close",g),this.off("upgrading",C)};i.once("open",d),i.once("error",m),i.once("close",x),this.once("close",g),this.once("upgrading",C),this._upgrades.indexOf("webtransport")!==-1&&o!=="webtransport"?this.setTimeoutFn(()=>{u||i.open()},200):i.open()}onOpen(){if(this.readyState="open",lo.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let o=0;o<this._upgrades.length;o++)this._probe(this._upgrades[o])}_onPacket(o){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",o),this.emitReserved("heartbeat"),o.type){case"open":this.onHandshake(JSON.parse(o.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const i=new Error("server error");i.code=o.data,this._onError(i);break;case"message":this.emitReserved("data",o.data),this.emitReserved("message",o.data);break}}onHandshake(o){this.emitReserved("handshake",o),this.id=o.sid,this.transport.query.sid=o.sid,this._upgrades=this._filterUpgrades(o.upgrades),this._pingInterval=o.pingInterval,this._pingTimeout=o.pingTimeout,this._maxPayload=o.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const o=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+o,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},o),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const o=this._getWritablePackets();this.transport.send(o),this._prevBufferLen=o.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let i=1;for(let u=0;u<this.writeBuffer.length;u++){const d=this.writeBuffer[u].data;if(d&&(i+=U0(d)),u>0&&i>this._maxPayload)return this.writeBuffer.slice(0,u);i+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const o=Date.now()>this._pingTimeoutTime;return o&&(this._pingTimeoutTime=0,ol(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),o}write(o,i,u){return this._sendPacket("message",o,i,u),this}send(o,i,u){return this._sendPacket("message",o,i,u),this}_sendPacket(o,i,u,d){if(typeof i=="function"&&(d=i,i=void 0),typeof u=="function"&&(d=u,u=null),this.readyState==="closing"||this.readyState==="closed")return;u=u||{},u.compress=u.compress!==!1;const p={type:o,data:i,options:u};this.emitReserved("packetCreate",p),this.writeBuffer.push(p),d&&this.once("flush",d),this.flush()}close(){const o=()=>{this._onClose("forced close"),this.transport.close()},i=()=>{this.off("upgrade",i),this.off("upgradeError",i),o()},u=()=>{this.once("upgrade",i),this.once("upgradeError",i)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?u():o()}):this.upgrading?u():o()),this}_onError(o){if(lo.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",o),this._onClose("transport error",o)}_onClose(o,i){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),wu&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const u=Gi.indexOf(this._offlineEventListener);u!==-1&&Gi.splice(u,1)}this.readyState="closed",this.id=null,this.emitReserved("close",o,i),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(o){const i=[];for(let u=0;u<o.length;u++)~this.transports.indexOf(o[u])&&i.push(o[u]);return i}};sh.protocol=Zp;function ly(n,o="",i){let u=n;i=i||typeof location<"u"&&location,n==null&&(n=i.protocol+"//"+i.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=i.protocol+n:n=i.host+n),/^(https?|wss?):\/\//.test(n)||(typeof i<"u"?n=i.protocol+"//"+n:n="https://"+n),u=vu(n)),u.port||(/^(http|ws)$/.test(u.protocol)?u.port="80":/^(http|ws)s$/.test(u.protocol)&&(u.port="443")),u.path=u.path||"/";const p=u.host.indexOf(":")!==-1?"["+u.host+"]":u.host;return u.id=u.protocol+"://"+p+":"+u.port+o,u.href=u.protocol+"://"+p+(i&&i.port===u.port?"":":"+u.port),u}const ay=typeof ArrayBuffer=="function",uy=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,ih=Object.prototype.toString,cy=typeof Blob=="function"||typeof Blob<"u"&&ih.call(Blob)==="[object BlobConstructor]",dy=typeof File=="function"||typeof File<"u"&&ih.call(File)==="[object FileConstructor]";function Fu(n){return ay&&(n instanceof ArrayBuffer||uy(n))||cy&&n instanceof Blob||dy&&n instanceof File}function qi(n,o){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let i=0,u=n.length;i<u;i++)if(qi(n[i]))return!0;return!1}if(Fu(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return qi(n.toJSON(),!0);for(const i in n)if(Object.prototype.hasOwnProperty.call(n,i)&&qi(n[i]))return!0;return!1}function fy(n){const o=[],i=n.data,u=n;return u.data=Yi(i,o),u.attachments=o.length,{packet:u,buffers:o}}function Yi(n,o,i){if(!n)return n;if(Fu(n)){const u={_placeholder:!0,num:o.length};return o.push(n),u}else if(Array.isArray(n)){const u=new Array(n.length);for(let d=0;d<n.length;d++)u[d]=Yi(n[d],o);return u}else if(typeof n=="object"&&!(n instanceof Date)){if(n.toJSON&&typeof n.toJSON=="function"&&!i)return Yi(n.toJSON(),o,!0);const u={};for(const d in n)Object.prototype.hasOwnProperty.call(n,d)&&(u[d]=Yi(n[d],o));return u}return n}function py(n,o){return n.data=Su(n.data,o),delete n.attachments,n}function Su(n,o){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<o.length)return o[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let i=0;i<n.length;i++)n[i]=Su(n[i],o);else if(typeof n=="object")for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(n[i]=Su(n[i],o));return n}const hy=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Pe;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(Pe||(Pe={}));class my{constructor(o){this.replacer=o}encode(o){return(o.type===Pe.EVENT||o.type===Pe.ACK)&&qi(o)?this.encodeAsBinary({type:o.type===Pe.EVENT?Pe.BINARY_EVENT:Pe.BINARY_ACK,nsp:o.nsp,data:o.data,id:o.id}):[this.encodeAsString(o)]}encodeAsString(o){let i=""+o.type;return(o.type===Pe.BINARY_EVENT||o.type===Pe.BINARY_ACK)&&(i+=o.attachments+"-"),o.nsp&&o.nsp!=="/"&&(i+=o.nsp+","),o.id!=null&&(i+=o.id),o.data!=null&&(i+=JSON.stringify(o.data,this.replacer)),i}encodeAsBinary(o){const i=fy(o),u=this.encodeAsString(i.packet),d=i.buffers;return d.unshift(u),d}}class Du extends ct{constructor(o){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof o=="function"?{reviver:o}:o)}add(o){let i;if(typeof o=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");i=this.decodeString(o);const u=i.type===Pe.BINARY_EVENT;u||i.type===Pe.BINARY_ACK?(i.type=u?Pe.EVENT:Pe.ACK,this.reconstructor=new gy(i)):super.emitReserved("decoded",i)}else if(Fu(o)||o.base64)if(this.reconstructor)i=this.reconstructor.takeBinaryData(o),i&&(this.reconstructor=null,super.emitReserved("decoded",i));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+o)}decodeString(o){let i=0;const u={type:Number(o.charAt(0))};if(Pe[u.type]===void 0)throw new Error("unknown packet type "+u.type);if(u.type===Pe.BINARY_EVENT||u.type===Pe.BINARY_ACK){const p=i+1;for(;o.charAt(++i)!=="-"&&i!=o.length;);const m=o.substring(p,i);if(m!=Number(m)||o.charAt(i)!=="-")throw new Error("Illegal attachments");const x=Number(m);if(!yy(x)||x<1)throw new Error("Illegal attachments");if(x>this.opts.maxAttachments)throw new Error("too many attachments");u.attachments=x}if(o.charAt(i+1)==="/"){const p=i+1;for(;++i&&!(o.charAt(i)===","||i===o.length););u.nsp=o.substring(p,i)}else u.nsp="/";const d=o.charAt(i+1);if(d!==""&&Number(d)==d){const p=i+1;for(;++i;){const m=o.charAt(i);if(m==null||Number(m)!=m){--i;break}if(i===o.length)break}u.id=Number(o.substring(p,i+1))}if(o.charAt(++i)){const p=this.tryParse(o.substr(i));if(Du.isPayloadValid(u.type,p))u.data=p;else throw new Error("invalid payload")}return u}tryParse(o){try{return JSON.parse(o,this.opts.reviver)}catch{return!1}}static isPayloadValid(o,i){switch(o){case Pe.CONNECT:return Gf(i);case Pe.DISCONNECT:return i===void 0;case Pe.CONNECT_ERROR:return typeof i=="string"||Gf(i);case Pe.EVENT:case Pe.BINARY_EVENT:return Array.isArray(i)&&(typeof i[0]=="number"||typeof i[0]=="string"&&hy.indexOf(i[0])===-1);case Pe.ACK:case Pe.BINARY_ACK:return Array.isArray(i)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class gy{constructor(o){this.packet=o,this.buffers=[],this.reconPack=o}takeBinaryData(o){if(this.buffers.push(o),this.buffers.length===this.reconPack.attachments){const i=py(this.reconPack,this.buffers);return this.finishedReconstruction(),i}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const yy=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function Gf(n){return Object.prototype.toString.call(n)==="[object Object]"}const xy=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Du,Encoder:my,get PacketType(){return Pe}},Symbol.toStringTag,{value:"Module"}));function gn(n,o,i){return n.on(o,i),function(){n.off(o,i)}}const vy=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class lh extends ct{constructor(o,i,u){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=o,this.nsp=i,u&&u.auth&&(this.auth=u.auth),this._opts=Object.assign({},u),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const o=this.io;this.subs=[gn(o,"open",this.onopen.bind(this)),gn(o,"packet",this.onpacket.bind(this)),gn(o,"error",this.onerror.bind(this)),gn(o,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...o){return o.unshift("message"),this.emit.apply(this,o),this}emit(o,...i){var u,d,p;if(vy.hasOwnProperty(o))throw new Error('"'+o.toString()+'" is a reserved event name');if(i.unshift(o),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(i),this;const m={type:Pe.EVENT,data:i};if(m.options={},m.options.compress=this.flags.compress!==!1,typeof i[i.length-1]=="function"){const _=this.ids++,I=i.pop();this._registerAckCallback(_,I),m.id=_}const x=(d=(u=this.io.engine)===null||u===void 0?void 0:u.transport)===null||d===void 0?void 0:d.writable,g=this.connected&&!(!((p=this.io.engine)===null||p===void 0)&&p._hasPingExpired());return this.flags.volatile&&!x||(g?(this.notifyOutgoingListeners(m),this.packet(m)):this.sendBuffer.push(m)),this.flags={},this}_registerAckCallback(o,i){var u;const d=(u=this.flags.timeout)!==null&&u!==void 0?u:this._opts.ackTimeout;if(d===void 0){this.acks[o]=i;return}const p=this.io.setTimeoutFn(()=>{delete this.acks[o];for(let x=0;x<this.sendBuffer.length;x++)this.sendBuffer[x].id===o&&this.sendBuffer.splice(x,1);i.call(this,new Error("operation has timed out"))},d),m=(...x)=>{this.io.clearTimeoutFn(p),i.apply(this,x)};m.withError=!0,this.acks[o]=m}emitWithAck(o,...i){return new Promise((u,d)=>{const p=(m,x)=>m?d(m):u(x);p.withError=!0,i.push(p),this.emit(o,...i)})}_addToQueue(o){let i;typeof o[o.length-1]=="function"&&(i=o.pop());const u={id:this._queueSeq++,tryCount:0,pending:!1,args:o,flags:Object.assign({fromQueue:!0},this.flags)};o.push((d,...p)=>(this._queue[0],d!==null?u.tryCount>this._opts.retries&&(this._queue.shift(),i&&i(d)):(this._queue.shift(),i&&i(null,...p)),u.pending=!1,this._drainQueue())),this._queue.push(u),this._drainQueue()}_drainQueue(o=!1){if(!this.connected||this._queue.length===0)return;const i=this._queue[0];i.pending&&!o||(i.pending=!0,i.tryCount++,this.flags=i.flags,this.emit.apply(this,i.args))}packet(o){o.nsp=this.nsp,this.io._packet(o)}onopen(){typeof this.auth=="function"?this.auth(o=>{this._sendConnectPacket(o)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(o){this.packet({type:Pe.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},o):o})}onerror(o){this.connected||this.emitReserved("connect_error",o)}onclose(o,i){this.connected=!1,delete this.id,this.emitReserved("disconnect",o,i),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(o=>{if(!this.sendBuffer.some(u=>String(u.id)===o)){const u=this.acks[o];delete this.acks[o],u.withError&&u.call(this,new Error("socket has been disconnected"))}})}onpacket(o){if(o.nsp===this.nsp)switch(o.type){case Pe.CONNECT:o.data&&o.data.sid?this.onconnect(o.data.sid,o.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Pe.EVENT:case Pe.BINARY_EVENT:this.onevent(o);break;case Pe.ACK:case Pe.BINARY_ACK:this.onack(o);break;case Pe.DISCONNECT:this.ondisconnect();break;case Pe.CONNECT_ERROR:this.destroy();const u=new Error(o.data.message);u.data=o.data.data,this.emitReserved("connect_error",u);break}}onevent(o){const i=o.data||[];o.id!=null&&i.push(this.ack(o.id)),this.connected?this.emitEvent(i):this.receiveBuffer.push(Object.freeze(i))}emitEvent(o){if(this._anyListeners&&this._anyListeners.length){const i=this._anyListeners.slice();for(const u of i)u.apply(this,o)}super.emit.apply(this,o),this._pid&&o.length&&typeof o[o.length-1]=="string"&&(this._lastOffset=o[o.length-1])}ack(o){const i=this;let u=!1;return function(...d){u||(u=!0,i.packet({type:Pe.ACK,id:o,data:d}))}}onack(o){const i=this.acks[o.id];typeof i=="function"&&(delete this.acks[o.id],i.withError&&o.data.unshift(null),i.apply(this,o.data))}onconnect(o,i){this.id=o,this.recovered=i&&this._pid===i,this._pid=i,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(o=>this.emitEvent(o)),this.receiveBuffer=[],this.sendBuffer.forEach(o=>{this.notifyOutgoingListeners(o),this.packet(o)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(o=>o()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Pe.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(o){return this.flags.compress=o,this}get volatile(){return this.flags.volatile=!0,this}timeout(o){return this.flags.timeout=o,this}onAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(o),this}prependAny(o){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(o),this}offAny(o){if(!this._anyListeners)return this;if(o){const i=this._anyListeners;for(let u=0;u<i.length;u++)if(o===i[u])return i.splice(u,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(o),this}prependAnyOutgoing(o){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(o),this}offAnyOutgoing(o){if(!this._anyOutgoingListeners)return this;if(o){const i=this._anyOutgoingListeners;for(let u=0;u<i.length;u++)if(o===i[u])return i.splice(u,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(o){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const i=this._anyOutgoingListeners.slice();for(const u of i)u.apply(this,o.data)}}}function go(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}go.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var o=Math.random(),i=Math.floor(o*this.jitter*n);n=(Math.floor(o*10)&1)==0?n-i:n+i}return Math.min(n,this.max)|0};go.prototype.reset=function(){this.attempts=0};go.prototype.setMin=function(n){this.ms=n};go.prototype.setMax=function(n){this.max=n};go.prototype.setJitter=function(n){this.jitter=n};class bu extends ct{constructor(o,i){var u;super(),this.nsps={},this.subs=[],o&&typeof o=="object"&&(i=o,o=void 0),i=i||{},i.path=i.path||"/socket.io",this.opts=i,sl(this,i),this.reconnection(i.reconnection!==!1),this.reconnectionAttempts(i.reconnectionAttempts||1/0),this.reconnectionDelay(i.reconnectionDelay||1e3),this.reconnectionDelayMax(i.reconnectionDelayMax||5e3),this.randomizationFactor((u=i.randomizationFactor)!==null&&u!==void 0?u:.5),this.backoff=new go({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(i.timeout==null?2e4:i.timeout),this._readyState="closed",this.uri=o;const d=i.parser||xy;this.encoder=new d.Encoder,this.decoder=new d.Decoder,this._autoConnect=i.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(o){return arguments.length?(this._reconnection=!!o,o||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(o){return o===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=o,this)}reconnectionDelay(o){var i;return o===void 0?this._reconnectionDelay:(this._reconnectionDelay=o,(i=this.backoff)===null||i===void 0||i.setMin(o),this)}randomizationFactor(o){var i;return o===void 0?this._randomizationFactor:(this._randomizationFactor=o,(i=this.backoff)===null||i===void 0||i.setJitter(o),this)}reconnectionDelayMax(o){var i;return o===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=o,(i=this.backoff)===null||i===void 0||i.setMax(o),this)}timeout(o){return arguments.length?(this._timeout=o,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(o){if(~this._readyState.indexOf("open"))return this;this.engine=new sh(this.uri,this.opts);const i=this.engine,u=this;this._readyState="opening",this.skipReconnect=!1;const d=gn(i,"open",function(){u.onopen(),o&&o()}),p=x=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",x),o?o(x):this.maybeReconnectOnOpen()},m=gn(i,"error",p);if(this._timeout!==!1){const x=this._timeout,g=this.setTimeoutFn(()=>{d(),p(new Error("timeout")),i.close()},x);this.opts.autoUnref&&g.unref(),this.subs.push(()=>{this.clearTimeoutFn(g)})}return this.subs.push(d),this.subs.push(m),this}connect(o){return this.open(o)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const o=this.engine;this.subs.push(gn(o,"ping",this.onping.bind(this)),gn(o,"data",this.ondata.bind(this)),gn(o,"error",this.onerror.bind(this)),gn(o,"close",this.onclose.bind(this)),gn(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(o){try{this.decoder.add(o)}catch(i){this.onclose("parse error",i)}}ondecoded(o){ol(()=>{this.emitReserved("packet",o)},this.setTimeoutFn)}onerror(o){this.emitReserved("error",o)}socket(o,i){let u=this.nsps[o];return u?this._autoConnect&&!u.active&&u.connect():(u=new lh(this,o,i),this.nsps[o]=u),u}_destroy(o){const i=Object.keys(this.nsps);for(const u of i)if(this.nsps[u].active)return;this._close()}_packet(o){const i=this.encoder.encode(o);for(let u=0;u<i.length;u++)this.engine.write(i[u],o.options)}cleanup(){this.subs.forEach(o=>o()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(o,i){var u;this.cleanup(),(u=this.engine)===null||u===void 0||u.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",o,i),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const o=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const i=this.backoff.duration();this._reconnecting=!0;const u=this.setTimeoutFn(()=>{o.skipReconnect||(this.emitReserved("reconnect_attempt",o.backoff.attempts),!o.skipReconnect&&o.open(d=>{d?(o._reconnecting=!1,o.reconnect(),this.emitReserved("reconnect_error",d)):o.onreconnect()}))},i);this.opts.autoUnref&&u.unref(),this.subs.push(()=>{this.clearTimeoutFn(u)})}}onreconnect(){const o=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",o)}}const ts={};function Qi(n,o){typeof n=="object"&&(o=n,n=void 0),o=o||{};const i=ly(n,o.path||"/socket.io"),u=i.source,d=i.id,p=i.path,m=ts[d]&&p in ts[d].nsps,x=o.forceNew||o["force new connection"]||o.multiplex===!1||m;let g;return x?g=new bu(u,o):(ts[d]||(ts[d]=new bu(u,o)),g=ts[d]),i.query&&!o.query&&(o.query=i.queryKey),g.socket(i.path,o)}Object.assign(Qi,{Manager:bu,Socket:lh,io:Qi,connect:Qi});const wy="";async function Ze(n,{method:o="GET",token:i,body:u,headers:d={}}={}){const p=await fetch(`${wy}${n}`,{method:o,headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{},...d},body:u?JSON.stringify(u):void 0}),m=await p.json().catch(()=>({}));if(!p.ok){const x=new Error(m.error||`Falha na requisição (${p.status})`);throw x.status=p.status,x}return m}const Ke={login(n,o){return Ze("/api/auth/login",{method:"POST",body:{email:n,password:o}})},getMe(n){return Ze("/api/auth/me",{token:n})},getUnits(n){return Ze("/api/units",{token:n})},createUnit(n,o){return Ze("/api/units",{method:"POST",token:n,body:o})},updateUnit(n,o,i){return Ze(`/api/units/${o}`,{method:"PUT",token:n,body:i})},deleteUnit(n,o,i={}){const u=new URLSearchParams;i.target_unit_id&&u.set("target_unit_id",i.target_unit_id),i.target_sector_id&&u.set("target_sector_id",i.target_sector_id);const d=u.toString();return Ze(`/api/units/${o}${d?`?${d}`:""}`,{method:"DELETE",token:n,body:i})},createSector(n,o,i){return Ze(`/api/units/${o}/sectors`,{method:"POST",token:n,body:i})},updateSector(n,o,i){return Ze(`/api/sectors/${o}`,{method:"PUT",token:n,body:i})},deleteSector(n,o,i={}){const u=new URLSearchParams;i.target_sector_id&&u.set("target_sector_id",i.target_sector_id);const d=u.toString();return Ze(`/api/sectors/${o}${d?`?${d}`:""}`,{method:"DELETE",token:n,body:i})},getMachines(n,{unitId:o,status:i}={}){const u=new URLSearchParams;o&&u.set("unit_id",o),i&&u.set("status",i);const d=u.toString();return Ze(`/api/machines${d?`?${d}`:""}`,{token:n})},getMachineDiagnostics(n,o){return Ze(`/api/machines/${o}/diagnostics`,{token:n})},refreshMachineTelemetryNow(n,o){return Ze(`/api/machines/${o}/refresh-telemetry`,{method:"POST",token:n})},deleteMachine(n,o){return Ze(`/api/machines/${o}`,{method:"DELETE",token:n})},getAgentVersionInfo(){return Ze("/api/agent/version")},updateMachineAgent(n,o){return Ze(`/api/machines/${o}/update-agent`,{method:"POST",token:n})},updateAllAgents(n){return Ze("/api/agent/update-all",{method:"POST",token:n})},getMachineMessages(n,o){return Ze(`/api/machines/${o}/messages`,{token:n})},sendMachineMessage(n,o,i){return Ze(`/api/machines/${o}/messages`,{method:"POST",token:n,body:{message:i}})},updateMachineLocation(n,o,{unitId:i,sectorId:u}){return Ze(`/api/machines/${o}/location`,{method:"POST",token:n,body:{unit_id:i,sector_id:u}})},getTaskCatalog(n){return Ze("/api/catalog/tasks",{token:n})},getApprovedPrinters(n,o,i){const u=new URLSearchParams;o&&u.set("unit_id",o),i&&u.set("machine_id",i);const d=u.toString()?`?${u.toString()}`:"";return Ze(`/api/printers${d}`,{token:n})},dispatchAuthorizedTask(n,{machineId:o,taskCode:i,parameters:u,reason:d}){return Ze("/api/command",{method:"POST",token:n,body:{machine_id:o,task_code:i,parameters:u,reason:d}})},getAlerts(n){return Ze("/api/alerts",{token:n})},simulateAgentHeartbeat({agentUuid:n,agentToken:o,inventory:i,metrics:u}){return Ze("/api/heartbeat",{method:"POST",headers:{"X-Agent-Uuid":n,"X-Agent-Token":o},body:{agent_version:"1.0.0",inventory:i,metrics:u}})}};function Sy(n,o={}){const u=Qi("/dashboard",{auth:{token:n},reconnection:!0});return o.onMachineUpdated&&u.on("machine:updated",o.onMachineUpdated),o.onMachineDeleted&&u.on("machine:deleted",o.onMachineDeleted),o.onAlertTriggered&&u.on("alert:triggered",o.onAlertTriggered),o.onTaskUpdated&&u.on("task:updated",o.onTaskUpdated),o.onAgentMessage&&u.on("agent:message",o.onAgentMessage),o.onUnitsUpdated&&u.on("units:updated",o.onUnitsUpdated),o.onConnect&&u.on("connect",o.onConnect),o.onDisconnect&&u.on("disconnect",o.onDisconnect),u}const Bn=480,fr=300,oo=3,by=30,qf=15,ky=Bn/2,Ey=62,ds=12,$r=9,Ni=2.2,Re={floorA:"#F2E4CC",floorB:"#E7D5B6",floorEdge:"#C9AE86",wallSouth:"#F0DFC4",wallEast:"#DCC7A6",wallCap:"#9C6B4A",rug:"#7FB069",rugBorder:"#F2C14E",woodTop:"#C98A4B",woodSouth:"#A96C33",deskTop:"#E0A458",deskSouth:"#BE8038",metal:"#B7C4CE",metalDark:"#7C8B96",plastic:"#F4F8FB",plasticDark:"#CBD6DE",paper:"#FFFDF7",plant:"#3E9B4F",plantDark:"#2C7A3B",pot:"#C4693F",glass:"#BFE6F5",glassFrame:"#6E8A96",ink:"#1F2933",inkSoft:"#52606D"},_n={NORMAL:"#12B76A",WARNING:"#F79009",CRITICAL:"#F04438",OFFLINE:"#98A2B3"},Cy={NORMAL:"ONLINE",WARNING:"ATENÇÃO",CRITICAL:"CRÍTICO",OFFLINE:"OFFLINE"};function fs(n,o){const i=parseInt(n.slice(1),16),u=Math.max(0,Math.min(255,Math.round((i>>16&255)*o))),d=Math.max(0,Math.min(255,Math.round((i>>8&255)*o))),p=Math.max(0,Math.min(255,Math.round((i&255)*o)));return`#${(u<<16|d<<8|p).toString(16).padStart(6,"0")}`}function De(n,o,i=0){return{sx:ky+(n-o)*(by/2),sy:Ey+(n+o)*(qf/2)-i*qf}}function uo(n,o,i){n.fillStyle=i,n.beginPath(),n.moveTo(Math.round(o[0].sx),Math.round(o[0].sy));for(let u=1;u<o.length;u+=1)n.lineTo(Math.round(o[u].sx),Math.round(o[u].sy));n.closePath(),n.fill()}function _y(n,o,i,u,d){const p=De(o,i,u),m=De(o+1,i,u),x=De(o+1,i+1,u),g=De(o,i+1,u);uo(n,[p,m,x,g],d)}function At(n,o,i,u,d,p,m,x){const g=fs(x,1),C=fs(x,.82),_=fs(x,.68);uo(n,[De(o,i+p,u+m),De(o+d,i+p,u+m),De(o+d,i+p,u),De(o,i+p,u)],C),uo(n,[De(o+d,i,u+m),De(o+d,i+p,u+m),De(o+d,i+p,u),De(o+d,i,u)],_),uo(n,[De(o,i,u+m),De(o+d,i,u+m),De(o+d,i+p,u+m),De(o,i+p,u+m)],g)}function at(n,o,i,u,d,p,m){uo(n,[De(o,i,u),De(o+d,i,u),De(o+d,i+p,u),De(o,i+p,u)],m)}function Ny(n){for(let o=0;o<ds;o+=1)for(let i=0;i<$r;i+=1){const u=(o+i)%2===0;_y(n,o,i,0,u?Re.floorA:Re.floorB)}uo(n,[De(0,$r,0),De(ds,$r,0),De(ds,$r,-.12),De(0,$r,-.12)],Re.floorEdge)}function jy(n){At(n,-.3,-.3,0,ds+.6,.3,Ni,Re.wallSouth),At(n,-.3,0,0,.3,$r,Ni,Re.wallEast),at(n,-.3,-.3,Ni,ds+.6,.3,Re.wallCap),at(n,-.3,0,Ni,.3,$r,Re.wallCap);const o=4.2,i=.02;at(n,o,i,1.05,2.6,.02,Re.glassFrame),at(n,o+.12,i+.01,1.15,2.36,.02,Re.glass),at(n,o+1.26,i+.01,1.15,.08,.02,Re.glassFrame),at(n,.02,6,0,.02,1.5,Re.woodSouth),at(n,.03,6.1,0,.02,1.3,Re.woodTop),at(n,.04,7.2,.95,.02,.12,"#D9B44A")}function Ty(n){at(n,4.4,4.1,.015,3.4,2.2,Re.rugBorder),at(n,4.55,4.25,.02,3.1,1.9,Re.rug)}function Ry(n){At(n,7.4,6,0,3.6,.9,1.05,Re.woodSouth),at(n,7.35,5.95,1.05,3.7,1,Re.woodTop),at(n,7.45,6.05,1.07,3.5,.8,"#E7D9C3")}function $y(n){At(n,2.1,2.5,0,2.4,1.2,.82,Re.deskSouth),at(n,2.05,2.45,.82,2.5,1.3,Re.deskTop)}function Iy(n){At(n,5,2.2,0,2.2,1.1,.82,Re.deskSouth),at(n,4.95,2.15,.82,2.3,1.2,Re.deskTop)}function Ay(n){At(n,2.7,4,0,.9,.9,.45,Re.metalDark),At(n,2.7,4.75,.45,.9,.18,.55,Re.metal)}function Py(n){At(n,9.4,1.9,0,1.5,1.2,.62,Re.metalDark),at(n,9.35,1.85,.62,1.6,1.3,Re.metal),At(n,9.55,2.05,.62,1.15,.85,.55,Re.plasticDark),at(n,9.6,2.1,1.17,1.05,.3,Re.plastic),at(n,9.7,2.45,1.19,.85,.35,Re.paper)}function Oy(n){At(n,.55,.9,0,.55,.55,.4,Re.pot),At(n,.62,.97,.4,.4,.4,.45,Re.plantDark),At(n,.7,1.05,.85,.24,.24,.3,Re.plant)}const tu=[{x:2.95,y:2.85,label:"MESA 01",labelOffset:-2},{x:5.55,y:2.55,label:"MESA 02",labelOffset:-16},{x:8.15,y:6.25,label:"BALCÃO",labelOffset:-2}];function Ly(n){return n?n.health_status==="OFFLINE"?n.last_seen_at?(Date.now()-new Date(n.last_seen_at).getTime())/1e3>=86400:!1:Number(n.idle_seconds||0)>=86400:!1}function My(n,o,i,u,d,p){const m=(i==null?void 0:i.health_status)||"OFFLINE",x=_n[m]||_n.OFFLINE;At(n,o.x,o.y,.82,.85,.3,.12,Re.metalDark),At(n,o.x+.34,o.y+.08,.94,.16,.12,.28,Re.metal),At(n,o.x-.02,o.y+.02,1.2,.9,.14,.62,Re.plasticDark),at(n,o.x+.04,o.y+.03,1.78,.78,.12,x),at(n,o.x+.1,o.y+.05,1.79,.3,.06,fs(x,1.35)),at(n,o.x+.05,o.y+.42,.84,.7,.28,Re.plasticDark);const g=De(o.x+.86,o.y+.1,1.86);if(n.fillStyle=p||m!=="NORMAL"?x:fs(x,.6),n.fillRect(Math.round(g.sx)-1,Math.round(g.sy)-1,3,3),u||d){const C=De(o.x-.25,o.y-.25,.03),_=De(o.x+1.15,o.y-.25,.03),I=De(o.x+1.15,o.y+.85,.03),P=De(o.x-.25,o.y+.85,.03);n.strokeStyle=u?"#1F2937":"#52796B",n.lineWidth=u?1.4:1,n.beginPath(),n.moveTo(Math.round(C.sx),Math.round(C.sy)),n.lineTo(Math.round(_.sx),Math.round(_.sy)),n.lineTo(Math.round(I.sx),Math.round(I.sy)),n.lineTo(Math.round(P.sx),Math.round(P.sy)),n.closePath(),n.stroke()}}function zy(n,o,i,u,d=[]){const p=(i==null?void 0:i.health_status)||"OFFLINE",m=Ly(i),x=De(o.x+.45,o.y+.2,2.15),g=(i==null?void 0:i.hostname)||"SEM AGENTE",C=m?`${g} !24h`:g;n.font='8px "Courier New", monospace';const _=Math.max(n.measureText(C).width+18,46),I=Math.round(x.sx-_/2);let P=Math.round(x.sy-13+(o.labelOffset||0));const D=ae=>d.some(X=>I<X.x+X.w&&I+_>X.x&&ae<X.y+X.h&&ae+12>X.y);let Z=0;for(;D(P)&&Z<8;)P+=14,Z+=1;const W={x:I,y:P,w:_,h:12};return d.push(W),n.fillStyle=u?"#1F2937":m?"#FEF2F2":"rgba(255,255,255,0.96)",n.fillRect(I,P,_,12),n.strokeStyle=u?"#1F2937":m?"#DC2626":"rgba(31,41,55,0.3)",n.lineWidth=1,n.strokeRect(I+.5,P+.5,_-1,11),n.fillStyle=m?"#DC2626":_n[p]||_n.OFFLINE,n.fillRect(I+4,P+4,4,4),n.fillStyle=u?"#FFFFFF":m?"#991B1B":Re.ink,n.textBaseline="middle",n.fillText(C,I+11,P+6.5),W}function Fy(n,o,i,u){if(!o)return;const d=o.health_status||"OFFLINE",p=_n[d]||_n.OFFLINE,m=16,x=236,g=74,C=u-g-18;n.fillStyle="rgba(255,255,255,0.96)",n.fillRect(m,C,x,g),n.strokeStyle="rgba(31,41,55,0.35)",n.lineWidth=1,n.strokeRect(m+.5,C+.5,x-1,g-1),n.fillStyle=p,n.fillRect(m,C,3,g),n.textBaseline="alphabetic",n.font='bold 11px "Courier New", monospace',n.fillStyle=Re.ink,n.fillText(o.hostname||"SEM AGENTE",m+12,C+18),n.font='9px "Courier New", monospace',n.fillStyle=p,n.fillText(Cy[d]||d,m+12,C+32),n.fillStyle=Re.inkSoft,n.fillText(`IP ${o.ip_address||"—"}`,m+12,C+45),n.fillText(`CPU ${Number(o.cpu_usage_pct??0).toFixed(0)}%   RAM ${Number(o.ram_usage_pct??0).toFixed(0)}%`,m+12,C+57);const _=Number(o.temperature_c)>0?`${Number(o.temperature_c).toFixed(0)}°C`:"N/D";n.fillText(`DISCO ${Number(o.disk_usage_pct??0).toFixed(0)}%   TEMP ${_}`,m+12,C+69)}const Dy=T.div`
  position: fixed;
  inset: 0;
  background:
    radial-gradient(circle at 50% 38%, #f7f4ec 0%, #e7e3d8 58%, #d8d4c7 100%);
  overflow: hidden;
  z-index: 0;
`,By=T.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  cursor: ${({$dragging:n,$hover:o})=>n?"grabbing":o?"pointer":"grab"};
  image-rendering: auto;
`,Uy=T.div`
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
`,ji=T.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: ${({$color:n})=>n};
  margin-right: 4px;
`,Hy=T.div`
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
`;function Vy({activeUnit:n,machines:o=[],selectedMachine:i,selectedSector:u,onSelectMachine:d}){const p=R.useRef(null),m=R.useRef(null),x=R.useRef([]),g=R.useRef({active:!1,x:0,y:0,panX:0,panY:0}),[C,_]=R.useState({zoom:1.28,panX:0,panY:0}),[I,P]=R.useState(!1),[D,Z]=R.useState(null),[W,ae]=R.useState(!0),X=R.useMemo(()=>{const V=(o||[]).filter(K=>!(n!=null&&n.id)||Number(K.unit_id)===Number(n.id));return[...u!=null&&u.id?V.filter(K=>Number(K.sector_id)===Number(u.id)):V].sort((K,oe)=>Number(K.id)-Number(oe.id))},[o,n==null?void 0:n.id,u==null?void 0:u.id]),J=R.useMemo(()=>X.map((V,q)=>({...tu[q]||{x:2.2+(q-tu.length)%4*2.1,y:5.2+Math.floor((q-tu.length)/4)*1.6,label:`POSTO ${String(q+1).padStart(2,"0")}`,labelOffset:-6},machine:V})),[X]);R.useEffect(()=>{const V=setInterval(()=>ae(q=>!q),700);return()=>clearInterval(V)},[]);const he=R.useCallback(()=>{const V=p.current;if(!V)return;if(!m.current){const Y=document.createElement("canvas");Y.width=Bn*oo,Y.height=fr*oo,m.current=Y}const q=m.current,K=q.getContext("2d");K.setTransform(oo,0,0,oo,0,0),K.imageSmoothingEnabled=!0,K.clearRect(0,0,Bn,fr),Ny(K),jy(K),Ty(K),Ry(K),$y(K),Iy(K),Ay(K),Py(K),Oy(K);const oe=[];J.forEach(Y=>{if(!Y.machine)return;const ke=!!(i!=null&&i.id)&&i.id===Y.machine.id,Ne=!!D&&D===Y.machine.id;My(K,Y,Y.machine,ke,Ne,W);const Ue=De(Y.x+.45,Y.y+.2,1.2);oe.push({id:Y.machine.id,x:Ue.sx-26,y:Ue.sy-30,w:52,h:48})});const Ee=[];J.forEach(Y=>{if(!Y.machine)return;const ke=zy(K,Y,Y.machine,!!(i!=null&&i.id)&&i.id===Y.machine.id,Ee);ke&&oe.push({id:Y.machine.id,x:ke.x-2,y:ke.y-2,w:ke.w+4,h:ke.h+4})}),x.current=oe;const Ae=window.devicePixelRatio||1,Le=V.clientWidth||Bn,fe=V.clientHeight||fr,O=Math.round(Le*Ae),ne=Math.round(fe*Ae);(V.width!==O||V.height!==ne)&&(V.width=O,V.height=ne);const M=V.getContext("2d");M.imageSmoothingEnabled=!0,M.imageSmoothingQuality="high",M.setTransform(1,0,0,1,0,0),M.clearRect(0,0,O,ne);const j=Math.min(Le/Bn,fe/fr)*C.zoom*Ae,ue=Bn*j,U=fr*j,N=(O-ue)/2+C.panX*Ae,ge=(ne-U)/2+C.panY*Ae;M.drawImage(q,0,0,Bn*oo,fr*oo,N,ge,ue,U),M.setTransform(Ae,0,0,Ae,0,0),M.imageSmoothingEnabled=!0,M.textBaseline="alphabetic",M.font='bold 11px "Courier New", monospace',M.fillStyle=Re.ink;const be=`${(n==null?void 0:n.code)||"USF"} // ${(u==null?void 0:u.name)||"VISÃO GERAL DA UNIDADE"}`;M.fillText(be.toUpperCase(),16,26),M.font='9px "Courier New", monospace',M.fillStyle=Re.inkSoft,M.fillText(`${X.length} ESTAÇÃO(ÕES) • PIXEL ART • CANVAS 2D`,16,40),Fy(M,i,Le,fe)},[J,i,D,W,C,n==null?void 0:n.code,u==null?void 0:u.name,X.length]);R.useEffect(()=>{he()},[he]),R.useEffect(()=>{const V=()=>he();return window.addEventListener("resize",V),()=>window.removeEventListener("resize",V)},[he]);const Ce=R.useCallback((V,q)=>{const K=p.current;if(!K)return null;const oe=K.getBoundingClientRect(),Ee=oe.width,Ae=oe.height,fe=Math.min(Ee/Bn,Ae/fr)*C.zoom,O=Bn*fe,ne=fr*fe,M=(Ee-O)/2+C.panX,w=(Ae-ne)/2+C.panY;return{x:(V-oe.left-M)/fe,y:(q-oe.top-w)/fe}},[C]),_e=R.useCallback((V,q)=>{const K=Ce(V,q);if(!K)return null;const oe=x.current.find(Ee=>K.x>=Ee.x&&K.x<=Ee.x+Ee.w&&K.y>=Ee.y&&K.y<=Ee.y+Ee.h);return(oe==null?void 0:oe.id)??null},[Ce]),ve=V=>{var q,K;g.current={active:!0,x:V.clientX,y:V.clientY,panX:C.panX,panY:C.panY,moved:!1},P(!0),(K=(q=V.currentTarget).setPointerCapture)==null||K.call(q,V.pointerId)},re=V=>{const q=g.current;if(q.active){const oe=V.clientX-q.x,Ee=V.clientY-q.y;(Math.abs(oe)>3||Math.abs(Ee)>3)&&(q.moved=!0),_(Ae=>({...Ae,panX:q.panX+oe,panY:q.panY+Ee}));return}const K=_e(V.clientX,V.clientY);Z(oe=>oe===K?oe:K)},te=V=>{const q=g.current;if(g.current={...q,active:!1},P(!1),q.moved)return;const K=_e(V.clientX,V.clientY);if(K&&d){const oe=X.find(Ee=>Ee.id===K);oe&&d(oe)}},pe=R.useCallback(V=>{V.preventDefault();const q=V.deltaY<0?1.12:.89;_(K=>({...K,zoom:Math.min(4,Math.max(.6,K.zoom*q))}))},[]);return R.useEffect(()=>{const V=p.current;if(V)return V.addEventListener("wheel",pe,{passive:!1}),()=>V.removeEventListener("wheel",pe)},[pe]),a.jsxs(Dy,{children:[a.jsx(By,{ref:p,$dragging:I,$hover:!!D,onPointerDown:ve,onPointerMove:re,onPointerUp:te,onPointerLeave:()=>{g.current={...g.current,active:!1},P(!1),Z(null)},onDoubleClick:()=>_({zoom:1.28,panX:0,panY:0}),title:D?"Clique para abrir o diagnóstico":"Arraste para mover • roda para zoom"}),a.jsxs(Uy,{children:[a.jsxs("span",{children:[a.jsx(ji,{$color:_n.NORMAL}),"ONLINE"]}),a.jsxs("span",{children:[a.jsx(ji,{$color:_n.WARNING}),"ATENÇÃO"]}),a.jsxs("span",{children:[a.jsx(ji,{$color:_n.CRITICAL}),"CRÍTICO"]}),a.jsxs("span",{children:[a.jsx(ji,{$color:_n.OFFLINE}),"OFFLINE"]})]}),a.jsx(Hy,{children:"ARRASTE • RODA = ZOOM • DUPLO CLIQUE = CENTRALIZAR"})]})}function We({size:n=15,strokeWidth:o=1.65,children:i,...u}){return a.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:o,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",...u,children:i})}function ku({size:n=24}){return a.jsxs("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[a.jsx("rect",{x:"2",y:"2",width:"20",height:"20",rx:"6",fill:"#2D6A4F"}),a.jsx("path",{d:"M7.5 12.25H10.2L11.55 8.5L13.35 15.5L14.7 12.25H16.75",stroke:"#FFFFFF",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})]})}function Yf(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M12 5v14M5 12h14"})})}function Qf(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 20h9"}),a.jsx("path",{d:"M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"})]})}function ah(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M3 6h18"}),a.jsx("path",{d:"M8 6V4h8v2"}),a.jsx("path",{d:"M19 6l-1 14H6L5 6"}),a.jsx("path",{d:"M10 11v6M14 11v6"})]})}function Wy(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})}function nu(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M6 9l6 6 6-6"})})}function uh(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M15 18l-6-6 6-6"})})}function Gy(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M9 18l6-6-6-6"})})}function qy(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M3 12a9 9 0 1 0 3-6.7L3 8"}),a.jsx("path",{d:"M3 3v5h5"})]})}function Yy(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 3v12"}),a.jsx("path",{d:"M7 10l5 5 5-5"}),a.jsx("path",{d:"M5 20h14"})]})}function Qy(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 16V7"}),a.jsx("path",{d:"M8.5 10.5L12 7l3.5 3.5"}),a.jsx("path",{d:"M20 16.5A4.5 4.5 0 0 0 17.5 8h-1.26A6.5 6.5 0 1 0 4 14.5"})]})}function Ky(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),a.jsx("path",{d:"M16 17l5-5-5-5"}),a.jsx("path",{d:"M21 12H9"})]})}function Xy(n){return a.jsxs(We,{...n,children:[a.jsx("circle",{cx:"11",cy:"11",r:"7"}),a.jsx("path",{d:"M20 20l-3.5-3.5"})]})}function Jy(n){return a.jsxs(We,{...n,children:[a.jsx("circle",{cx:"12",cy:"12",r:"7"}),a.jsx("path",{d:"M12 2v3M12 19v3M2 12h3M19 12h3"})]})}function ch(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M6 9V3h12v6"}),a.jsx("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),a.jsx("rect",{x:"6",y:"14",width:"12",height:"7",rx:"1"})]})}function Zy(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M21 12a9 9 0 0 0-15.5-6.3L3 8"}),a.jsx("path",{d:"M3 3v5h5"}),a.jsx("path",{d:"M3 12a9 9 0 0 0 15.5 6.3L21 16"}),a.jsx("path",{d:"M21 21v-5h-5"})]})}function ex(n){return a.jsx(We,{...n,children:a.jsx("path",{d:"M3 12h4l2.5-7 5 14 2.5-7h4"})})}function tx(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M4 17l6-6-6-6"}),a.jsx("path",{d:"M12 19h8"})]})}function nx(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M22 2L11 13"}),a.jsx("path",{d:"M22 2l-7 20-4-9-9-4 20-7z"})]})}function Bu(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M10.3 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"}),a.jsx("path",{d:"M12 9v4M12 17h.01"})]})}function rx(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 3l9 4.5-9 4.5-9-4.5L12 3z"}),a.jsx("path",{d:"M3 12l9 4.5 9-4.5"}),a.jsx("path",{d:"M3 16.5L12 21l9-4.5"})]})}function ox(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"}),a.jsx("circle",{cx:"7",cy:"7",r:"1.2",fill:"currentColor",stroke:"none"})]})}function sx(n){return a.jsxs(We,{...n,children:[a.jsx("rect",{x:"3",y:"4",width:"18",height:"16",rx:"2"}),a.jsx("path",{d:"M9 4v16"})]})}function ix(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"}),a.jsx("path",{d:"M12 12l8-4.5M12 12v9M12 12L4 7.5"})]})}function lx(n){return a.jsxs(We,{...n,children:[a.jsx("rect",{x:"3",y:"3",width:"7",height:"7",rx:"1.2"}),a.jsx("rect",{x:"14",y:"3",width:"7",height:"7",rx:"1.2"}),a.jsx("rect",{x:"3",y:"14",width:"7",height:"7",rx:"1.2"}),a.jsx("rect",{x:"14",y:"14",width:"7",height:"7",rx:"1.2"})]})}function ax(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"}),a.jsx("circle",{cx:"12",cy:"12",r:"3"})]})}function ux(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 5.06-5.94"}),a.jsx("path",{d:"M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19"}),a.jsx("path",{d:"M14.12 14.12a3 3 0 1 1-4.24-4.24"}),a.jsx("path",{d:"M2 2l20 20"})]})}function cx(n){return a.jsxs(We,{...n,children:[a.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"}),a.jsx("path",{d:"M9 12l2 2 4-4"})]})}function ru(n){return a.jsxs(We,{...n,children:[a.jsx("rect",{x:"2",y:"3",width:"20",height:"14",rx:"2"}),a.jsx("path",{d:"M8 21h8M12 17v4"})]})}const dx=N0`
  0% { stroke-dashoffset: 36; }
  100% { stroke-dashoffset: 0; }
`,fx=T.div`
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
`,px=T.section`
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
`,hx=T.header`
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
`,mx=T.div`
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
`,gx=T.div`
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
`,yx=T.div`
  display: grid;
  grid-template-columns: 164px 1fr 196px;
  align-items: center;
  gap: 0;

  @media (max-width: 1120px) {
    grid-template-columns: 146px 1fr 172px;
  }
`,xx=T.div`
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
`,vx=T.svg`
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
    animation: ${dx} 3.2s linear infinite;
  }
`,wx=T.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,ou=T.div`
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
`,Sx=T.div`
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
`,bx=T.main`
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
`,kx=T.header`
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
`,Ex=T.div`
  width: 100%;
  max-width: 380px;
  margin: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`,Cx=T.div`
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
`,_x=T.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,Kf=T.div`
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
`,Nx=T.button`
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
`,jx=T.div`
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
`;T.div`
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
`;const Tx=T.footer`
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
`;function Rx({onAuthenticated:n,sessionNotice:o=""}){const[i,u]=R.useState(""),[d,p]=R.useState(""),[m,x]=R.useState(!1),[g,C]=R.useState(!1),[_,I]=R.useState(""),[P,D]=R.useState("checking"),Z=!1;R.useEffect(()=>{let X=!0;const J=new AbortController;return fetch("/api/health",{signal:J.signal}).then(he=>he.ok?he.json():Promise.reject(new Error("HTTP"))).then(he=>{X&&D((he==null?void 0:he.status)==="ok"?"ok":"down")}).catch(()=>{X&&D("down")}),()=>{X=!1,J.abort()}},[]);async function W(X){X.preventDefault(),I("");const J=i.trim();if(!J||!d){I("Informe seu e-mail e senha para continuar.");return}C(!0);try{await n(J,d)}catch(he){I((he==null?void 0:he.message)||"Não foi possível autenticar. Verifique e-mail e senha.")}finally{C(!1)}}const ae=P==="ok"?{color:"#2D6A4F",label:"Serviço Pulso RMM operacional"}:P==="down"?{color:"#C81E1E",label:"Servidor de API indisponível no momento"}:{color:"#7B857F",label:"Verificando disponibilidade da API..."};return a.jsxs(fx,{children:[a.jsxs(px,{"aria-label":"Visão geral do Pulso RMM",children:[a.jsxs(hx,{children:[a.jsxs("div",{className:"brand-left",children:[a.jsx(ku,{size:28}),a.jsx("span",{className:"brand-name",children:"Pulso RMM"})]}),a.jsx("span",{className:"brand-org",children:"Monitoramento & Gestão de Estações"})]}),a.jsxs(mx,{children:[a.jsxs("h1",{children:["Monitoramento de estações em tempo real."," ",a.jsx("span",{className:"muted",children:"Inventário, telemetria e suporte remoto."})]}),a.jsxs(gx,{role:"img","aria-label":"Esquema da arquitetura de telemetria entre a central Pulso RMM e estações monitoradas",children:[a.jsxs("div",{className:"topo-head",children:[a.jsx("span",{children:"Arquitetura de comunicação autenticada"}),a.jsx("span",{className:"topo-proto",children:"HMAC-SHA256 · OTA"})]}),a.jsxs(yx,{children:[a.jsxs(xx,{children:[a.jsx("span",{className:"hub-icon",children:a.jsx(cx,{size:17})}),a.jsx("div",{className:"hub-title",children:"Central TI"}),a.jsx("div",{className:"hub-sub",children:"API · Socket.io"})]}),a.jsxs(vx,{viewBox:"0 0 180 156",preserveAspectRatio:"none","aria-hidden":"true",children:[a.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),a.jsx("path",{className:"base-line",d:"M 0 78 L 180 78"}),a.jsx("path",{className:"base-line",d:"M 0 78 C 60 78, 70 130, 180 130"}),a.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 26, 180 26"}),a.jsx("path",{className:"pulse-line",d:"M 0 78 L 180 78",style:{animationDelay:"0.9s"}}),a.jsx("path",{className:"pulse-line",d:"M 0 78 C 60 78, 70 130, 180 130",style:{animationDelay:"1.8s"}})]}),a.jsxs(wx,{children:[a.jsxs(ou,{children:[a.jsxs("span",{className:"ep-left",children:[a.jsx("span",{className:"ep-icon",children:a.jsx(ru,{size:14})}),a.jsx("span",{children:"Recepção"})]}),a.jsx("span",{className:"ep-tag",children:"REC"})]}),a.jsxs(ou,{children:[a.jsxs("span",{className:"ep-left",children:[a.jsx("span",{className:"ep-icon",children:a.jsx(ru,{size:14})}),a.jsx("span",{children:"Consultórios"})]}),a.jsx("span",{className:"ep-tag",children:"CONS"})]}),a.jsxs(ou,{children:[a.jsxs("span",{className:"ep-left",children:[a.jsx("span",{className:"ep-icon",children:a.jsx(ru,{size:14})}),a.jsx("span",{children:"Farmácia"})]}),a.jsx("span",{className:"ep-tag",children:"FARM"})]})]})]})]})]}),a.jsxs(Sx,{children:[a.jsxs("div",{className:"pillar",children:[a.jsx("span",{className:"p-title",children:"Telemetria contínua"}),a.jsx("span",{className:"p-desc",children:"Agente Windows nativo em segundo plano sem interromper o atendimento."})]}),a.jsxs("div",{className:"pillar",children:[a.jsx("span",{className:"p-title",children:"Manutenção homologada"}),a.jsx("span",{className:"p-desc",children:"Catálogo de tarefas assinadas por estação e atualizações SHA-256."})]}),a.jsxs("div",{className:"pillar",children:[a.jsx("span",{className:"p-title",children:"Auditoria e LGPD"}),a.jsx("span",{className:"p-desc",children:"Controle por perfil técnico com registro completo das operações."})]})]})]}),a.jsxs(bx,{"aria-label":"Autenticação do painel Pulso RMM",children:[a.jsxs(kx,{children:[a.jsx(ku,{size:28}),a.jsxs("div",{children:[a.jsx("div",{className:"m-title",children:"Pulso RMM"}),a.jsx("div",{className:"m-sub",children:"Monitoramento & Gestão de Estações"})]})]}),a.jsxs(Ex,{children:[a.jsxs(Cx,{children:[a.jsx("h2",{children:"Entrar no painel"}),a.jsx("p",{children:"Use sua conta autorizada pela equipe de TI."})]}),(_||o)&&a.jsxs(jx,{role:"alert",children:[a.jsx("span",{className:"err-icon",children:a.jsx(Bu,{size:16})}),a.jsx("span",{children:_||o})]}),a.jsxs(_x,{onSubmit:W,noValidate:!0,children:[a.jsxs(Kf,{children:[a.jsx("label",{htmlFor:"rmm-login-email",children:"E-mail"}),a.jsx("div",{className:"input-box",children:a.jsx("input",{id:"rmm-login-email",type:"email",autoComplete:"username",placeholder:"nome@dominio.com",value:i,onChange:X=>u(X.target.value),disabled:g,required:!0})})]}),a.jsxs(Kf,{$hasToggle:!0,children:[a.jsx("label",{htmlFor:"rmm-login-password",children:"Senha"}),a.jsxs("div",{className:"input-box",children:[a.jsx("input",{id:"rmm-login-password",type:m?"text":"password",autoComplete:"current-password",placeholder:"Digite sua senha",value:d,onChange:X=>p(X.target.value),disabled:g,required:!0}),a.jsx("button",{type:"button",className:"pw-toggle",onClick:()=>x(X=>!X),"aria-label":m?"Ocultar senha":"Exibir senha","aria-pressed":m,disabled:g,children:m?a.jsx(ux,{size:17}):a.jsx(ax,{size:17})})]})]}),a.jsx(Nx,{type:"submit",disabled:g,children:g?"Validando credenciais...":"Entrar no painel"})]}),Z]}),a.jsxs(Tx,{children:[a.jsxs("div",{className:"health-row",children:[a.jsx("span",{className:"health-dot",style:{background:ae.color}}),a.jsx("span",{children:ae.label})]}),a.jsx("p",{className:"audit-line",children:"Sessões, comandos remotos e alterações de infraestrutura são registrados em trilha de auditoria conforme a LGPD."})]})]})]})}const $x={B:{id:"B",name:"Institucional Sereno",tagline:"Porcelanato claro, azul institucional e verde vivo",swatches:["#F6F8F3","#CFE3DC","#2E8B74","#1F5F8B"],room:{wallColor:"#F6F8F3",wallCapColor:"#2E6B7A",baseboardColor:"#2C5F73",accentColor:"#E4A11B",floorType:"porcelain",rugColor:"#6FA88F",rugBorderColor:"#EAF2EC",hasRug:!1,rugSize:[2.4,1.5],rugPos:[.5,0,-.2]},lighting:{background:"#E9F0EA",ambient:{intensity:.42,color:"#FFFFFF"},hemisphere:{sky:"#F7FBFF",ground:"#D6E4DC",intensity:.34},key:{intensity:2.15,color:"#FFF6E6"},fill:{intensity:.26,color:"#DCEBF2"}}}};function Ix(){return $x.B}const Ax={NORMAL:"Online",WARNING:"Atenção",CRITICAL:"Crítico",OFFLINE:"Offline"};function Xf(n){const o=String(n||"2.3.0").trim(),i=o.match(/(\d+\.\d+(?:\.\d+)?)/);return i?`v${i[1]}`:`v${o}`}const Jf=T.aside`
  width: ${({$collapsed:n})=>n?"296px":"432px"};
  max-height: 100%;
  min-height: 0;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  box-shadow: ${({theme:n})=>n.shadows.sm};
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  pointer-events: auto;
  transition: width 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 1120px) {
    width: ${({$collapsed:n})=>n?"268px":"384px"};
  }
`,Zf=T.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  padding-bottom: 12px;
`,Px=T.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`,ep=T.div`
  font-family: ${({theme:n})=>n.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({theme:n})=>n.colors.textSecondary};
`,tp=T.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({$color:n})=>n};
  background: ${({$bgColor:n})=>n||"rgba(30, 36, 32, 0.06)"};

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`,np=T.h2`
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({theme:n})=>n.colors.textPrimary};
  line-height: 1.2;
  word-break: break-word;
`,rp=T.div`
  font-size: 0.78rem;
  color: ${({theme:n})=>n.colors.textSecondary};
  line-height: 1.38;
  margin-top: 2px;
`,Ox=T.select`
  margin-top: 8px;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border-radius: 7px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  color: ${({theme:n})=>n.colors.textPrimary};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;

  &:hover {
    border-color: ${({theme:n})=>n.colors.borderStrong};
  }

  &:focus {
    outline: none;
    border-color: ${({theme:n})=>n.colors.brandPrimary};
    background: ${({theme:n})=>n.colors.bgSurface};
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
  }
`,Lx=T.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
`,Ti=T.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({$variant:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.06)":n==="accent"?o.colors.brandPrimarySubtle:o.colors.bgSurfaceSubtle};
  color: ${({$variant:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:n==="accent"?o.colors.brandPrimary:o.colors.textPrimary};
  border: 1px solid
    ${({$variant:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.22)":n==="accent"?"rgba(45, 106, 79, 0.22)":o.colors.borderSubtle};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({$variant:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.11)":n==="accent"?"rgba(45, 106, 79, 0.15)":o.colors.bgSurfaceHover};
    border-color: ${({$variant:n,theme:o})=>n==="danger"?"rgba(200, 30, 30, 0.36)":o.colors.borderStrong};
  }

  &:active {
    transform: scale(0.985);
  }
`,Mx=T.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  overflow: hidden;
  flex-shrink: 0;
`,Ri=T.div`
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  border-right: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  &:last-child {
    border-right: none;
  }

  .m-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .m-val {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .m-track {
    height: 3.5px;
    background: rgba(30, 36, 32, 0.08);
    border-radius: 2px;
    overflow: hidden;
    i {
      display: block;
      height: 100%;
      border-radius: 2px;
    }
  }
`,zx=T.div`
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  padding: 11px 13px;

  .osc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-bottom: 8px;
  }

  .osc-legend {
    display: flex;
    gap: 12px;
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.68rem;
    span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: ${({theme:n})=>n.colors.textPrimary};
    }
    i {
      width: 8px;
      height: 3px;
      border-radius: 2px;
      display: inline-block;
    }
  }
`,Fx=T.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 12px 14px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};

  .spec-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .spec-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    span.spec-lbl {
      font-size: 0.7rem;
      font-weight: 500;
      color: ${({theme:n})=>n.colors.textSecondary};
    }

    strong {
      font-size: 0.8rem;
      color: ${({theme:n})=>n.colors.textPrimary};
      font-weight: 600;
      line-height: 1.32;
      word-break: break-word;
    }

    strong.mono {
      font-family: ${({theme:n})=>n.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.76rem;
    }
  }

  .spec-divider {
    height: 1px;
    background: ${({theme:n})=>n.colors.borderSubtle};
  }
`,Dx=T.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  padding: 3px;
  border-radius: 9px;
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
`,op=T.button`
  height: 32px;
  padding: 0 10px;
  border: 1px solid
    ${({$active:n,theme:o})=>n?o.colors.borderStrong:"transparent"};
  background: ${({$active:n,theme:o})=>n?o.colors.bgSurface:"transparent"};
  color: ${({$active:n,theme:o})=>n?o.colors.textPrimary:o.colors.textSecondary};
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: ${({$active:n,theme:o})=>n?o.shadows.sm:"none"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .badge-count {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$active:n})=>n?"rgba(45, 106, 79, 0.11)":"rgba(30, 36, 32, 0.07)"};
    color: ${({$active:n,theme:o})=>n?o.colors.brandPrimary:o.colors.textSecondary};
  }
`,Bx=T.div`
  flex-shrink: 0;
  background: ${({$bg:n})=>n};
  border-left: 3px solid ${({$color:n})=>n};
  border-radius: 0 8px 8px 0;
  padding: 9px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .act-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: ${({$color:n})=>n};
  }

  .act-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
  }

  .act-head {
    font-size: 0.86rem;
    font-weight: 700;
    color: ${({theme:n})=>n.colors.textPrimary};
    margin-top: 1px;
  }

  .act-sub {
    font-size: 0.74rem;
    color: ${({theme:n})=>n.colors.textSecondary};
  }
`,Ux=T.div`
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px dashed ${({theme:n})=>n.colors.borderStrong};
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.74rem;
  color: ${({theme:n})=>n.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.4;

  strong {
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.76rem;
  }
`,sp=T.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: ${({theme:n})=>n.colors.textPrimary};
  letter-spacing: -0.01em;
`,Hx=T.button`
  width: 100%;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  background: ${({theme:n})=>n.colors.bgSurface};
  color: ${({theme:n})=>n.colors.textPrimary};
  border: 1px solid ${({theme:n})=>n.colors.borderStrong};
  font-size: 0.78rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${({disabled:n})=>n?"wait":"pointer"};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({theme:n})=>n.colors.bgSurfaceHover};
    border-color: ${({theme:n})=>n.colors.brandPrimary};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }
`,Vx=T.div`
  flex-shrink: 0;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`,Wx=T.div`
  min-height: 92px;
  max-height: 192px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: 8px;
`,Gx=T.div`
  display: flex;
  flex-direction: column;
  align-items: ${({$fromTi:n})=>n?"flex-end":"flex-start"};
`,qx=T.div`
  max-width: 88%;
  padding: 7px 10px;
  border-radius: ${({$fromTi:n})=>n?"10px 10px 3px 10px":"10px 10px 10px 3px"};
  background: ${({$fromTi:n})=>n?"#E9F4EE":"#F3F5F2"};
  border: 1px solid
    ${({$fromTi:n})=>n?"rgba(45, 106, 79, 0.18)":"rgba(30, 36, 32, 0.08)"};
  font-size: 0.78rem;
  line-height: 1.4;
  color: ${({theme:n})=>n.colors.textPrimary};
  word-break: break-word;

  .cb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 2px;
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
`,Yx=T.form`
  display: flex;
  gap: 6px;

  input {
    flex: 1;
    height: 34px;
    padding: 0 11px;
    border-radius: 7px;
    background: ${({theme:n})=>n.colors.bgSurface};
    border: 1px solid ${({theme:n})=>n.colors.borderStrong};
    color: ${({theme:n})=>n.colors.textPrimary};
    font-size: 0.78rem;
    transition: border-color 140ms ease;

    &::placeholder {
      color: ${({theme:n})=>n.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({theme:n})=>n.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  button {
    height: 34px;
    padding: 0 13px;
    border-radius: 7px;
    border: none;
    background: ${({theme:n})=>n.colors.brandPrimary};
    color: #ffffff;
    font-size: 0.76rem;
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
`,Qx=T.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  flex-shrink: 0;
`,Kx=T.button`
  position: relative;
  padding: 10px 11px;
  border-radius: 8px;
  text-align: left;
  background: ${({theme:n})=>n.colors.bgSurface};
  color: ${({disabled:n,theme:o})=>n?o.colors.textMuted:o.colors.textPrimary};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  cursor: ${({disabled:n})=>n?"not-allowed":"pointer"};
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    border-color: ${({theme:n})=>n.colors.brandPrimary};
    transform: translateY(-2px);
    box-shadow: ${({theme:n})=>n.shadows.sm};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  .key-head {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 4px;
  }

  .risk-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$risk:n,theme:o})=>n==="HIGH"?o.colors.status.CRITICAL:n==="MEDIUM"?o.colors.status.WARNING:o.colors.status.NORMAL};
  }

  .key-badge {
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({$risk:n,theme:o})=>n==="HIGH"?o.colors.status.CRITICAL:n==="MEDIUM"?o.colors.status.WARNING:o.colors.textSecondary};
  }

  .key-title {
    font-size: 0.76rem;
    font-weight: 600;
    line-height: 1.28;
    display: block;
    color: inherit;
  }
`,Xx=T.div`
  flex-shrink: 0;
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.md};
  padding: 10px 12px;
  font-family: ${({theme:n})=>n.fonts.mono};
  font-size: 0.72rem;
  line-height: 1.5;
  min-height: 86px;
  max-height: 220px;
  overflow-y: auto;
  color: ${({theme:n})=>n.colors.textPrimary};

  .console-head {
    font-family: ${({theme:n})=>n.fonts.sans};
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};
    padding-bottom: 5px;
  }

  .line-ok {
    color: ${({theme:n})=>n.colors.status.NORMAL};
    font-weight: 600;
  }
  .line-busy {
    color: ${({theme:n})=>n.colors.brandPrimaryLight};
    font-weight: 600;
  }
  .line-err {
    color: ${({theme:n})=>n.colors.status.CRITICAL};
    font-weight: 600;
  }
`,$i=T.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
`,Ii=T.div`
  width: 100%;
  max-width: 520px;
  background: ${({theme:n})=>n.colors.bgSurface};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-radius: ${({theme:n})=>n.radius.lg};
  padding: 22px 24px;
  box-shadow: ${({theme:n})=>n.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({theme:n})=>n.colors.textPrimary};
`,Ai=T.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  h3 {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: ${({theme:n})=>n.colors.textPrimary};
  }

  .m-sub {
    font-size: 0.78rem;
    color: ${({theme:n})=>n.colors.textSecondary};
    margin-top: 2px;
  }
`,su=T.div`
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid
    ${({$tone:n,theme:o})=>n==="danger"?o.colors.status.CRITICAL:o.colors.status.WARNING};
  background: ${({$tone:n})=>n==="danger"?"rgba(200, 30, 30, 0.06)":"rgba(180, 83, 9, 0.07)"};
  color: ${({$tone:n})=>n==="danger"?"#991B1B":"#92400E"};
  font-size: 0.8rem;
  line-height: 1.48;
`,Pi=T.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid ${({theme:n})=>n.colors.borderSubtle};
`,Tr=T.button`
  height: 36px;
  padding: 0 15px;
  border-radius: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: ${({disabled:n})=>n?"not-allowed":"pointer"};
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
  }
`,ip=T.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
`,lp=T.div`
  background: ${({theme:n})=>n.colors.bgSurfaceSubtle};
  border: 1px solid ${({theme:n})=>n.colors.borderSubtle};
  border-left: 2.5px solid ${({theme:n})=>n.colors.brandPrimary};
  border-radius: 0 6px 6px 0;
  padding: 7px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .diag-k {
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textSecondary};
  }

  .diag-v {
    font-family: ${({theme:n})=>n.fonts.mono};
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({theme:n})=>n.colors.textPrimary};
    word-break: break-word;
  }
`;function Dn(n,o=!0){const i=Math.max(0,Math.floor(Number(n||0)));if(i<60)return`${i}s`;const u=Math.floor(i/60),d=i%60;if(u<60)return o&&d>0?`${u}m ${d}s`:`${u} min`;const p=Math.floor(u/60),m=u%60;if(p<24)return m>0?`${p}h ${m}m`:`${p}h`;const x=Math.floor(p/24),g=p%24;return g>0?`${x}d ${g}h`:`${x} dia(s)`}function ap(n){const o=we(n||"");return o?o.split("|").map(u=>u.trim()).filter(Boolean).map((u,d)=>{const p=u.indexOf(":");return p>0&&p<36?{label:u.slice(0,p).trim(),value:u.slice(p+1).trim()}:{label:`Item #${d+1}`,value:u}}):[]}function Jx({telemetryHistory:n=[]}){const o=Array.isArray(n)&&n.length>=2,{cpuPath:i,ramPath:u}=R.useMemo(()=>{if(!o)return{cpuPath:"",ramPath:""};const d=n.slice(0,12).reverse(),p=360,m=44,x=p/Math.max(1,d.length-1),g=C=>d.map((_,I)=>{const P=Math.min(100,Math.max(0,Number(_[C]||0))),D=(I*x).toFixed(1),Z=(m-P/100*(m-8)-4).toFixed(1);return`${I===0?"M":"L"}${D},${Z}`}).join(" ");return{cpuPath:g("cpu_usage_pct"),ramPath:g("ram_usage_pct")}},[o,n]);return a.jsxs(zx,{children:[a.jsxs("div",{className:"osc-head",children:[a.jsxs("span",{children:["Histórico de Uso (",n.length," leituras)"]}),a.jsxs("div",{className:"osc-legend",children:[a.jsxs("span",{children:[a.jsx("i",{style:{background:"#2D6A4F"}})," CPU"]}),a.jsxs("span",{children:[a.jsx("i",{style:{background:"#52796B"}})," RAM"]})]})]}),o?a.jsxs("svg",{width:"100%",height:"44",viewBox:"0 0 360 44",preserveAspectRatio:"none",children:[a.jsx("line",{x1:"0",y1:"11",x2:"360",y2:"11",stroke:"#E4E8E3",strokeDasharray:"3 3"}),a.jsx("line",{x1:"0",y1:"22",x2:"360",y2:"22",stroke:"#E4E8E3",strokeDasharray:"3 3"}),a.jsx("line",{x1:"0",y1:"33",x2:"360",y2:"33",stroke:"#E4E8E3",strokeDasharray:"3 3"}),a.jsx("path",{d:u,fill:"none",stroke:"#52796B",strokeWidth:"1.8"}),a.jsx("path",{d:i,fill:"none",stroke:"#2D6A4F",strokeWidth:"2"})]}):a.jsx("div",{style:{height:"44px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",color:"#737B75",border:"1px dashed #E4E8E3",borderRadius:"4px"},children:"Aguardando ao menos 2 leituras reais para traçar a série temporal."})]})}function Zx({diagnostics:n,units:o=[],chatMessages:i=[],taskCatalog:u=[],currentUser:d,onDispatchTask:p,onLoadPrinters:m,onRefreshTelemetryNow:x,onUpdateMachineAgent:g,onSendMessage:C,onUpdateLocation:_,onDeleteMachine:I,onFocusCamera:P}){var vn,Pr,Rn;const[D,Z]=R.useState(null),[W,ae]=R.useState(!1),[X,J]=R.useState(!1),[he,Ce]=R.useState(""),[_e,ve]=R.useState(!1),[re,te]=R.useState(null),[pe,V]=R.useState(null),[q,K]=R.useState(!1),[oe,Ee]=R.useState("DIAG"),[Ae,Le]=R.useState(Date.now()),[fe,O]=R.useState(null),[ne,M]=R.useState({open:!1,task:null}),[w,j]=R.useState(!1),ue=R.useRef(null);R.useEffect(()=>{ue.current&&(ue.current.scrollTop=ue.current.scrollHeight)},[i.length,oe]),R.useEffect(()=>{const L=setInterval(()=>Le(Date.now()),1e3);return()=>clearInterval(L)},[]);const U=((vn=n==null?void 0:n.tasks)==null?void 0:vn[0])||null;R.useEffect(()=>{!U||!pe||(pe.taskId===U.task_id||pe.taskCode===U.task_code&&pe.status==="RUNNING")&&U.output_summary&&(V(L=>L?{...L,taskId:U.task_id,status:U.status||"COMPLETED",summary:we(U.output_summary),timestamp:new Date(U.completed_at||U.issued_at||Date.now()).toLocaleTimeString("pt-BR")}:null),te({type:"ok",text:`${pe.title}: ${we(U.output_summary)}`}))},[U==null?void 0:U.task_id,U==null?void 0:U.status,U==null?void 0:U.output_summary]);const N=(n==null?void 0:n.machine)||null;if(!N)return a.jsx(Jf,{$collapsed:q,children:a.jsxs(Zf,{children:[a.jsx(ep,{children:"Aguardando agentes"}),a.jsx(np,{children:"Nenhuma estação selecionada"}),a.jsx(rp,{children:"Instale o Agente Windows (IpojucaRMM-Setup.exe) para registrar novas estações nesta unidade."})]})});const{tasks:ge=[],alerts:be=[],telemetry:Y=[],telemetryHistory:ke=[]}=n,Ne=Y.length>0?Y:ke,Ue=Ne[0]||null,Et=Number(N.cpu_usage_pct)>0?Number(N.cpu_usage_pct):Number((Ue==null?void 0:Ue.cpu_usage_pct)||0),dt=Number(N.ram_usage_pct)>0?Number(N.ram_usage_pct):Number((Ue==null?void 0:Ue.ram_usage_pct)||0),Pt=Number(N.disk_usage_pct)>0?Number(N.disk_usage_pct):Number((Ue==null?void 0:Ue.disk_usage_pct)||0),Ot=Number(N.temperature_c)>0?Number(N.temperature_c):Number((Ue==null?void 0:Ue.temperature_c)||0),Ge=me.colors.status[N.health_status]||me.colors.status.NORMAL,Oe=me.colors.statusBg[N.health_status]||"rgba(0,0,0,0.05)",vt=(Number(N.uptime_seconds||0)/3600).toFixed(1),Lt=Math.max(0,Number(N.idle_seconds||0)),wt=N.health_status==="OFFLINE",He=N.last_seen_at?Math.max(0,Math.floor((Ae-new Date(N.last_seen_at).getTime())/1e3)):0,Ct=N.last_seen_at?Math.max(0,Math.floor((Ae-new Date(N.last_seen_at).getTime())/1e3)):0,mt=!wt&&Lt>0?Lt+Math.min(Ct,3):Lt,Tn=qp(N.agent_version,"2.3.0"),Wt=wt?He>=86400?{badge:"Inativo >24h",alertIcon:!0,color:"#C81E1E",bg:"rgba(200, 30, 30, 0.06)",headline:`Desligado há ${Dn(He)} (>24h)`,subline:N.last_seen_at?`Sem comunicação desde ${new Date(N.last_seen_at).toLocaleString("pt-BR")}`:"Sem comunicação há mais de 24 horas"}:{badge:"Desligado",alertIcon:!1,color:"#64748B",bg:"#F6F7F4",headline:`Desligado há ${Dn(He)}`,subline:N.last_seen_at?`Último contato: ${new Date(N.last_seen_at).toLocaleString("pt-BR")}`:"Sem registro recente"}:mt>=86400?{badge:"Inativo >24h",alertIcon:!0,color:"#C81E1E",bg:"rgba(200, 30, 30, 0.06)",headline:`Inativo há ${Dn(mt)} (>24h)`,subline:`Ligado há ${Dn(N.uptime_seconds||0,!1)} sem interação de teclado ou mouse.`}:Tn?{badge:`Agente ${Xf(N.agent_version||"2.2.0")}`,alertIcon:!1,color:"#B45309",bg:"rgba(180, 83, 9, 0.07)",headline:"Estação ativa · atualização recomendada",subline:"Envie a atualização do agente para habilitar recursos recentes."}:mt<180?{badge:"Em uso",alertIcon:!1,color:"#2D6A4F",bg:"rgba(45, 106, 79, 0.07)",headline:"Em uso ativo agora",subline:`Ligado há ${Dn(N.uptime_seconds||0,!1)} (${vt}h)`}:mt<1800?{badge:"Ausente",alertIcon:!1,color:"#B45309",bg:"rgba(180, 83, 9, 0.07)",headline:`Ocioso há ${Dn(mt)}`,subline:`Ligado há ${Dn(N.uptime_seconds||0,!1)} (${vt}h)`}:{badge:"Ocioso",alertIcon:!1,color:"#B45309",bg:"rgba(180, 83, 9, 0.07)",headline:`Parado há ${Dn(mt)}`,subline:`Ligado há ${Dn(N.uptime_seconds||0,!1)} sem interação`};async function Vn(){ae(!0),te(null);try{const L=await x(N.id);te({type:"ok",text:L.message||"Telemetria atualizada em tempo real."})}catch(L){te({type:"err",text:`Falha na coleta: ${L.message}`})}finally{ae(!1)}}async function Mt(L){if(L.preventDefault(),!(!he.trim()||!C)){ve(!0);try{await C(N.id,he.trim()),te({type:"ok",text:`Aviso enviado para a tela de ${N.hostname}.`}),Ce("")}catch(je){te({type:"err",text:`Falha ao enviar mensagem: ${je.message}`})}finally{ve(!1)}}}async function xn(L){const je=L.target.value;if(!je||!_)return;const[S,Q]=je.split(":").map(Number);if(!(!S||!Q))try{await _(N.id,{unitId:S,sectorId:Q}),te({type:"ok",text:"Localização da estação atualizada."})}catch(A){te({type:"err",text:`Erro ao mover estação: ${A.message}`})}}async function Wn(L){if(L.code==="INSTALL_APPROVED_PRINTER"){Jt(L);return}if(L.code==="REBOOT_WORKSTATION"){M({open:!0,task:L});return}await Gt(L)}async function Gt(L,je={}){var Q,A;const S=we(L.title);Z(L.code),te({type:"busy",text:`Executando "${S}" em ${N.hostname}...`}),V({taskId:null,taskCode:L.code,title:S,status:"RUNNING",summary:`Executando "${S}" no Agente Windows (${N.ip_address})...`,timestamp:new Date().toLocaleTimeString("pt-BR"),taskRef:L});try{if(L.code==="SYNC_TELEMETRY_NOW"&&x){const St=(await x(N.id)).message||`Host: ${N.hostname} | IPv4: ${N.ip_address} | CPU: ${Number(N.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(N.ram_usage_pct).toFixed(1)}% | Disco: ${Number(N.disk_usage_pct).toFixed(1)}%`;te({type:"ok",text:`${S}: ${St}`}),V({taskId:`sync_${Date.now()}`,taskCode:L.code,title:S,status:"COMPLETED",summary:St,timestamp:new Date().toLocaleTimeString("pt-BR"),taskRef:L});return}if(L.code==="UPDATE_AGENT"&&g){const St=(await g(N.id)).message||"Atualização OTA despachada para o computador.";te({type:"ok",text:`${S}: ${St}`}),V({taskId:`ota_${Date.now()}`,taskCode:L.code,title:S,status:"COMPLETED",summary:St,timestamp:new Date().toLocaleTimeString("pt-BR"),taskRef:L});return}const $=await p({machineId:N.id,taskCode:L.code,parameters:je}),de=((Q=$==null?void 0:$.task)==null?void 0:Q.status)||"DISPATCHED",Ve=de==="DISPATCHED"||de==="PENDING";te({type:Ve?"busy":de==="FAILED"?"err":"ok",text:Ve?`Ordem enfileirada para ${N.hostname} (aguardando execução real do agente).`:`Retorno recebido de ${N.hostname}: ${we(((A=$==null?void 0:$.task)==null?void 0:A.output_summary)||de)}`}),$!=null&&$.task&&V({taskId:$.task.task_id,taskCode:$.task.task_code,title:S,status:de,summary:we($.task.output_summary)||"Ordem na fila do Agente Windows. O resultado real aparecerá assim que a estação responder (TTL 120s).",timestamp:new Date($.task.issued_at||Date.now()).toLocaleTimeString("pt-BR"),taskRef:L})}catch($){te({type:"err",text:`Falha: ${$.message}`}),V({taskId:null,taskCode:L.code,title:S,status:"FAILED",summary:`Erro ao despachar comando: ${$.message}`,timestamp:new Date().toLocaleTimeString("pt-BR"),taskRef:L})}finally{Z(null)}}async function Jt(L){O({open:!0,task:L,loading:!0,printers:[],selectedId:null,error:null});try{const je=m?await m(N.unit_id,N.id):[];O(S=>{var Q;return S&&{...S,loading:!1,printers:je,selectedId:((Q=je[0])==null?void 0:Q.id)??null,error:je.length?null:"Nenhuma impressora encontrada na rede desta estação. Verifique se o agente já enviou um heartbeat com a descoberta."}})}catch(je){const S=String((je==null?void 0:je.message)||""),Q=/Rota n[ãa]o encontrada|404/i.test(S);O(A=>A&&{...A,loading:!1,error:Q?"Servidor desatualizado: a rota /api/printers não existe no backend em execução. Rode o deploy na VPS.":`Falha ao carregar impressoras: ${S}`})}}async function G(){if(!fe)return;const L=fe.printers.find(S=>S.id===fe.selectedId);if(!L)return;const je=fe.task;O(null),await Gt(je,{printer_ip:L.ip_address,printer_name:L.name})}async function nt(){const L=ne.task;M({open:!1,task:null}),L&&await Gt(L)}return a.jsxs(a.Fragment,{children:[a.jsxs(Jf,{$collapsed:q,"aria-label":"Painel de diagnóstico da estação",children:[a.jsxs(Zf,{children:[a.jsxs(Px,{children:[a.jsxs(ep,{children:["#",N.id," · ",N.ip_address," · ",Xf(N.agent_version)]}),a.jsxs(tp,{$color:Ge,$bgColor:Oe,children:[a.jsx("span",{className:"dot"}),Ax[N.health_status]||N.health_status]})]}),a.jsxs("div",{children:[a.jsx(np,{children:we(N.hostname)}),a.jsxs(rp,{children:[we(N.unit_name)," · ",we(N.sector_name)]}),o.length>0&&_&&(d==null?void 0:d.role)!=="VIEWER"&&a.jsx(Ox,{"aria-label":"Realocar estação para outra unidade ou setor",value:`${N.unit_id}:${N.sector_id}`,onChange:xn,children:o.map(L=>(L.sectors||[]).map(je=>a.jsxs("option",{value:`${L.id}:${je.id}`,children:[we(L.name)," — ",we(je.name)]},`${L.id}:${je.id}`)))})]}),a.jsxs(Lx,{children:[a.jsxs(Ti,{type:"button",$variant:"accent",onClick:P,children:[a.jsx(Jy,{size:13}),a.jsx("span",{children:"Focar"})]}),a.jsxs(Ti,{type:"button",onClick:()=>K(L=>!L),children:[q?a.jsx(uh,{size:13}):a.jsx(Gy,{size:13}),a.jsx("span",{children:q?"Expandir":"Recolher"})]}),I&&(d==null?void 0:d.role)!=="VIEWER"&&a.jsxs(Ti,{type:"button",$variant:"danger",onClick:()=>j(!0),children:[a.jsx(ah,{size:13}),a.jsx("span",{children:"Remover"})]})]})]}),a.jsxs(Mx,{children:[a.jsxs(Ri,{children:[a.jsxs("div",{className:"m-head",children:[a.jsx("span",{children:"CPU"}),a.jsxs("span",{className:"m-val",children:[Et.toFixed(0),"%"]})]}),a.jsx("div",{className:"m-track",children:a.jsx("i",{style:{width:`${Math.min(100,Et)}%`,background:me.colors.status.NORMAL}})})]}),a.jsxs(Ri,{children:[a.jsxs("div",{className:"m-head",children:[a.jsx("span",{children:"RAM"}),a.jsxs("span",{className:"m-val",children:[dt.toFixed(0),"%"]})]}),a.jsx("div",{className:"m-track",children:a.jsx("i",{style:{width:`${Math.min(100,dt)}%`,background:me.colors.brandPrimaryLight}})})]}),a.jsxs(Ri,{children:[a.jsxs("div",{className:"m-head",children:[a.jsx("span",{children:"Disco"}),a.jsxs("span",{className:"m-val",children:[Pt.toFixed(0),"%"]})]}),a.jsx("div",{className:"m-track",children:a.jsx("i",{style:{width:`${Math.min(100,Pt)}%`,background:me.colors.status.OFFLINE}})})]}),a.jsxs(Ri,{children:[a.jsxs("div",{className:"m-head",children:[a.jsx("span",{children:"Temp."}),a.jsx("span",{className:"m-val",children:Ot>0?`${Ot.toFixed(0)}°C`:"N/D"})]}),a.jsx("div",{className:"m-track",children:a.jsx("i",{style:{width:`${Ot>0?Math.min(100,Ot/90*100):0}%`,background:me.colors.status.WARNING}})})]})]}),!q&&a.jsxs(Dx,{role:"tablist","aria-label":"Seções do painel de diagnóstico",children:[a.jsxs(op,{type:"button",role:"tab","aria-selected":oe==="DIAG",$active:oe==="DIAG",onClick:()=>Ee("DIAG"),children:[a.jsx(ex,{size:14}),a.jsx("span",{children:"Diagnóstico"})]}),a.jsxs(op,{type:"button",role:"tab","aria-selected":oe==="ACTIONS",$active:oe==="ACTIONS",onClick:()=>Ee("ACTIONS"),children:[a.jsx(tx,{size:14}),a.jsx("span",{children:"Ações & Chat"}),a.jsx("span",{className:"badge-count",children:u.length})]})]}),(q||oe==="DIAG")&&a.jsxs(a.Fragment,{children:[wt&&a.jsxs(Ux,{children:[a.jsx("strong",{children:"Equipamento desconectado"}),a.jsxs("span",{children:["Última leitura registrada em"," ",N.last_seen_at?new Date(N.last_seen_at).toLocaleTimeString("pt-BR"):"horário anterior",". Novas métricas serão retomadas na reconexão."]})]}),a.jsxs(Bx,{$bg:Wt.bg,$color:Wt.color,children:[a.jsxs("div",{className:"act-top",children:[a.jsx("span",{children:"Estado de atividade"}),a.jsxs("span",{className:"act-badge",children:[Wt.alertIcon&&a.jsx(Bu,{size:12}),Wt.badge]})]}),a.jsx("div",{className:"act-head",children:Wt.headline}),a.jsx("div",{className:"act-sub",children:Wt.subline})]}),!q&&a.jsxs(a.Fragment,{children:[a.jsx(Jx,{telemetryHistory:Ne}),a.jsxs(Fx,{children:[a.jsxs("div",{className:"spec-grid-2",children:[a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"IPv4 / MAC"}),a.jsx("strong",{className:"mono",children:N.ip_address||"0.0.0.0"}),a.jsx("strong",{className:"mono",style:{fontSize:"0.68rem",color:me.colors.textSecondary},children:N.mac_address||"MAC N/D"})]}),a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Spooler de impressão"}),a.jsxs("strong",{style:{display:"inline-flex",alignItems:"center",gap:"5px",color:N.spooler_running?me.colors.status.NORMAL:me.colors.status.CRITICAL},children:[a.jsx(ch,{size:13}),N.spooler_running?"Ativo":"Parado"]})]})]}),a.jsx("div",{className:"spec-divider"}),a.jsxs("div",{className:"spec-grid-2",children:[a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Hardware"}),a.jsxs("strong",{children:[we(N.manufacturer||"N/D")," ",we(N.model||"")]})]}),a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Serial"}),a.jsxs("strong",{className:"mono",children:[N.serial_number||"Não informado"," ",a.jsxs("span",{style:{color:me.colors.textSecondary,fontSize:"0.68rem"},children:["(",N.identity_confidence||"LOW",")"]})]})]})]}),a.jsx("div",{className:"spec-divider"}),a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Processador"}),a.jsx("strong",{children:we(N.cpu_model||N.processor||"Não informado")})]}),a.jsx("div",{className:"spec-divider"}),a.jsxs("div",{className:"spec-grid-2",children:[a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Memória e disco"}),a.jsxs("strong",{className:"mono",children:[(Number(N.ram_total_mb||8192)/1024).toFixed(0)," GB ·"," ",N.disk_total_gb||0," GB ",N.disk_type||"N/D"]})]}),a.jsxs("div",{className:"spec-cell",children:[a.jsx("span",{className:"spec-lbl",children:"Sistema"}),a.jsx("strong",{children:we(N.os_version||"Windows")})]})]})]}),a.jsxs(Hx,{type:"button",onClick:Vn,disabled:W,children:[a.jsx(Zy,{size:14}),a.jsx("span",{children:W?"Atualizando telemetria...":"Atualizar telemetria agora"})]})]})]}),!q&&oe==="ACTIONS"&&a.jsxs(a.Fragment,{children:[C&&a.jsxs(Vx,{children:[a.jsxs(sp,{children:[a.jsx("span",{children:"Chat com o operador"}),a.jsxs("span",{style:{fontFamily:me.fonts.mono,fontSize:"0.68rem",fontWeight:500,color:me.colors.textSecondary},children:[i.length," msg"]})]}),a.jsx(Wx,{ref:ue,children:i.length===0?a.jsx("span",{style:{fontSize:"0.76rem",color:me.colors.textSecondary},children:"Nenhuma conversa ainda. Envie um aviso direto para a tela deste equipamento."}):i.slice(-20).map(L=>{const je=L.direction==="SERVER_TO_CLIENT",S=L.created_at?new Date(L.created_at).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}):"";return a.jsx(Gx,{$fromTi:je,children:a.jsxs(qx,{$fromTi:je,children:[a.jsxs("div",{className:"cb-head",children:[a.jsx("span",{className:"cb-sender",children:we(L.sender)}),S&&a.jsx("span",{className:"cb-time",children:S})]}),a.jsx("div",{children:we(L.message)})]})},L.id)})}),(d==null?void 0:d.role)!=="VIEWER"?a.jsxs(Yx,{onSubmit:Mt,children:[a.jsx("input",{type:"text","aria-label":"Mensagem para o operador do computador",placeholder:"Escrever mensagem para a estação...",value:he,onChange:L=>Ce(L.target.value)}),a.jsxs("button",{type:"submit",disabled:_e||!he.trim(),children:[a.jsx(nx,{size:13}),a.jsx("span",{children:"Enviar"})]})]}):a.jsx("div",{style:{fontSize:"0.74rem",color:me.colors.textSecondary},children:"Modo somente leitura: apenas Suporte N1 ou Admin N2 pode enviar mensagens."})]}),a.jsx(sp,{children:a.jsx("span",{children:"Ações remotas autorizadas"})}),a.jsxs(Xx,{children:[a.jsxs("div",{className:"console-head",children:[a.jsx("span",{children:"Retorno das tarefas"}),a.jsx("span",{children:D?"Executando...":"Pronto"})]}),re?a.jsxs("div",{className:re.type==="err"?"line-err":re.type==="busy"?"line-busy":"line-ok",children:["> ",re.text]}):a.jsx("div",{style:{color:me.colors.textSecondary},children:"> Selecione uma tarefa homologada abaixo para despachar ao agente."}),((pe==null?void 0:pe.summary)||((Pr=ge[0])==null?void 0:Pr.output_summary))&&a.jsx("div",{style:{marginTop:"8px"},children:a.jsx(ip,{children:ap((pe==null?void 0:pe.summary)||((Rn=ge[0])==null?void 0:Rn.output_summary)).map((L,je)=>a.jsxs(lp,{children:[a.jsx("span",{className:"diag-k",children:L.label}),a.jsx("span",{className:"diag-v",children:L.value})]},je))})})]}),a.jsx(Qx,{children:u.map(L=>{const je=L.permittedForCurrentUser,S=D===L.code;return a.jsxs(Kx,{type:"button",$risk:L.riskLevel,disabled:!je||S,onClick:()=>Wn(L),title:L.description,children:[a.jsxs("div",{className:"key-head",children:[a.jsx("span",{className:"risk-dot"}),a.jsxs("span",{className:"key-badge",children:["Risco ",j0[L.riskLevel]||L.riskLevel]})]}),a.jsx("span",{className:"key-title",children:S?"Executando...":we(L.title)})]},L.code)})})]})]}),(fe==null?void 0:fe.open)&&a.jsx($i,{onClick:()=>O(null),children:a.jsxs(Ii,{onClick:L=>L.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsxs(Ai,{children:[a.jsxs("div",{children:[a.jsx("h3",{children:"Instalar impressora homologada"}),a.jsxs("div",{className:"m-sub",children:[N.hostname," (",N.ip_address,") · Selecione a impressora de rede"]})]}),a.jsx(Ti,{type:"button",onClick:()=>O(null),"aria-label":"Fechar",children:a.jsx(Wy,{size:14})})]}),fe.loading&&a.jsx("div",{style:{fontSize:"0.82rem",color:me.colors.brandPrimary,fontWeight:600},children:"Carregando impressoras homologadas..."}),fe.error&&a.jsx(su,{$tone:"danger",children:fe.error}),!fe.loading&&fe.printers.length>0&&a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"260px",overflowY:"auto"},children:fe.printers.map(L=>{const je=L.id===fe.selectedId;return a.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",padding:"9px 11px",borderRadius:"8px",border:`1px solid ${je?me.colors.brandPrimary:me.colors.borderSubtle}`,background:je?"rgba(45, 106, 79, 0.06)":me.colors.bgSurfaceSubtle,cursor:"pointer"},children:[a.jsx("input",{type:"radio",name:"approved_printer",checked:je,style:{accentColor:me.colors.brandPrimary},onChange:()=>O(S=>S&&{...S,selectedId:L.id})}),a.jsxs("span",{style:{display:"flex",flexDirection:"column",gap:"2px"},children:[a.jsxs("strong",{style:{fontSize:"0.82rem",color:me.colors.textPrimary},children:[L.name,a.jsx("span",{style:{marginLeft:"6px",padding:"1px 6px",borderRadius:"999px",fontSize:"0.64rem",fontWeight:600,background:L.source==="NETWORK"?"rgba(29, 78, 216, 0.09)":L.source==="INSTALLED"?"rgba(45, 106, 79, 0.1)":"rgba(180, 83, 9, 0.1)",color:L.source==="NETWORK"?"#1D4ED8":L.source==="INSTALLED"?"#2D6A4F":"#92400E"},children:L.source==="NETWORK"?"Rede":L.source==="INSTALLED"?"Instalada":"Homologada"})]}),a.jsxs("span",{style:{fontFamily:me.fonts.mono,fontSize:"0.72rem",color:me.colors.textSecondary},children:[L.ip_address,L.model?` · ${L.model}`:""]})]})]},L.id)})}),a.jsxs(Pi,{children:[a.jsx(Tr,{type:"button",onClick:()=>O(null),children:"Cancelar"}),a.jsx(Tr,{type:"button",$variant:"primary",disabled:!fe.selectedId,onClick:G,children:"Instalar impressora"})]})]})}),ne.open&&a.jsx($i,{onClick:()=>M({open:!1,task:null}),children:a.jsxs(Ii,{onClick:L=>L.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsx(Ai,{children:a.jsxs("div",{children:[a.jsx("h3",{children:"Confirmar reinicialização"}),a.jsxs("div",{className:"m-sub",children:[N.hostname," (",N.ip_address,")"]})]})}),a.jsx(su,{$tone:"warning",children:"O computador será reiniciado com aviso de 30 segundos na tela do usuário. Salve o trabalho em aberto antes de confirmar."}),a.jsxs(Pi,{children:[a.jsx(Tr,{type:"button",onClick:()=>M({open:!1,task:null}),children:"Cancelar"}),a.jsx(Tr,{type:"button",$variant:"danger",onClick:nt,children:"Confirmar reinício"})]})]})}),pe&&a.jsx($i,{onClick:()=>V(null),children:a.jsxs(Ii,{onClick:L=>L.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsxs(Ai,{children:[a.jsxs("div",{children:[a.jsx("h3",{children:pe.title}),a.jsxs("div",{className:"m-sub",children:[N.hostname," (",N.ip_address,") · ",pe.timestamp]})]}),a.jsxs(tp,{$color:pe.status==="FAILED"||pe.status==="EXPIRED"?me.colors.status.CRITICAL:pe.status==="DISPATCHED"||pe.status==="PENDING"?me.colors.status.WARNING:me.colors.status.NORMAL,$bgColor:pe.status==="FAILED"||pe.status==="EXPIRED"?me.colors.statusBg.CRITICAL:pe.status==="DISPATCHED"||pe.status==="PENDING"?me.colors.statusBg.WARNING:me.colors.statusBg.NORMAL,children:[a.jsx("span",{className:"dot"}),pe.status==="RUNNING"?"Em execução...":pe.status==="DISPATCHED"||pe.status==="PENDING"?"Na fila":pe.status==="EXPIRED"?"Expirado":pe.status==="FAILED"?"Falha":"Concluído"]})]}),a.jsx(ip,{children:ap(pe.summary).map((L,je)=>a.jsxs(lp,{children:[a.jsx("span",{className:"diag-k",children:L.label}),a.jsx("span",{className:"diag-v",children:L.value})]},je))}),a.jsx(Pi,{children:a.jsx(Tr,{type:"button",$variant:"primary",onClick:()=>V(null),children:"Fechar"})})]})}),w&&a.jsx($i,{onClick:()=>j(!1),children:a.jsxs(Ii,{onClick:L=>L.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsx(Ai,{children:a.jsxs("div",{children:[a.jsx("h3",{children:"Confirmar remoção de equipamento"}),a.jsxs("div",{className:"m-sub",children:[we(N.hostname)," (",N.ip_address,")"]})]})}),a.jsx(su,{$tone:"danger",children:"Esta ação remove permanentemente o cadastro, histórico de telemetria e mensagens desta estação do painel. A operação será registrada na trilha de auditoria."}),a.jsxs(Pi,{children:[a.jsx(Tr,{type:"button",onClick:()=>j(!1),children:"Cancelar"}),a.jsx(Tr,{type:"button",$variant:"danger",onClick:async()=>{j(!1),I&&await I(N.id)},children:"Confirmar remoção"})]})]})})]})}const e1=[{value:"USF",label:"USF — Unidade de Saúde da Família"},{value:"POLICLINICA",label:"Policlínica Municipal"},{value:"CAPS",label:"CAPS — Centro de Atenção Psicossocial"},{value:"UPA",label:"UPA — Unidade de Pronto Atendimento"},{value:"HOSPITAL",label:"Hospital Municipal"},{value:"CEO",label:"CEO — Centro de Especialidades"},{value:"SEDE",label:"Sede Administrativa / Central TI"}],t1=[{value:"REC",label:"Recepção",desc:"Balcão em L, longarina e madeira"},{value:"CONS",label:"Consultório",desc:"Maca clínica, soro e biombo"},{value:"FARM",label:"Farmácia / Vacina",desc:"Estantes médicas e piso xadrez"},{value:"ADM",label:"Admin / Enfermagem",desc:"Mural de avisos e área clínica"},{value:"TI",label:"Sala Técnica / TI",desc:"Rack de servidor e infraestrutura"}];function up(n,o="SETOR"){return String(n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z0-9\s-]/g," ").trim().replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,16)||o}function cp(n){const o=String((n==null?void 0:n.room_theme)||"").trim().toUpperCase();if(["REC","CONS","FARM","ADM","TI"].includes(o))return o;const i=`${(n==null?void 0:n.code)||""} ${(n==null?void 0:n.name)||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();return i.includes("REC")||i.includes("ACOLH")||(n==null?void 0:n.id)===1?"REC":i.includes("CONS")||i.includes("MED")||i.includes("PSI")||(n==null?void 0:n.id)===2?"CONS":i.includes("FAR")||i.includes("VAC")||i.includes("LAB")||(n==null?void 0:n.id)===3?"FARM":i.includes("TI")||i.includes("CPD")||(n==null?void 0:n.id)===8?"TI":"ADM"}const n1=T.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`,r1=T.div`
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
`,o1=T.div`
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
`,s1=T.button`
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
`,dp=T.div`
  display: flex;
  gap: 6px;
  padding: 10px 20px 0;
  background: #f8faf8;
  border-bottom: 1px solid #e4e8e3;
  flex-wrap: wrap;
`,so=T.button`
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
`,i1=T.form`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
`,ns=T.div`
  display: grid;
  grid-template-columns: ${({$cols:n})=>n||"1fr"};
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`,Xt=T.div`
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
`,l1=T.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,a1=T.button`
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
`,iu=T.label`
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
`,u1=T.div`
  border: 1px solid #e4e8e3;
  border-radius: 7px;
  padding: 10px 12px;
  background: #f8faf8;
  display: flex;
  flex-direction: column;
  gap: 10px;
`,c1=T.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  color: #52796b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`,rs=T.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.75rem;
  line-height: 1.4;
  background: ${({$tone:n})=>n==="danger"?"rgba(220, 38, 38, 0.08)":"rgba(217, 119, 6, 0.1)"};
  border: 1px solid
    ${({$tone:n})=>n==="danger"?"rgba(220, 38, 38, 0.35)":"rgba(217, 119, 6, 0.35)"};
  color: ${({$tone:n})=>n==="danger"?"#991B1B":"#92400E"};
`,d1=T.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e4e8e3;
`,fp=T.button`
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
`;function f1({isOpen:n,initialMode:o="CREATE_UNIT",units:i=[],activeUnit:u=null,targetSector:d=null,machines:p=[],onClose:m,onCreateUnit:x,onUpdateUnit:g,onDeleteUnit:C,onCreateSector:_,onUpdateSector:I,onDeleteSector:P}){var Jt;const[D,Z]=R.useState(o),[W,ae]=R.useState(!1),[X,J]=R.useState(""),[he,Ce]=R.useState(""),[_e,ve]=R.useState(""),[re,te]=R.useState(!1),[pe,V]=R.useState("USF"),[q,K]=R.useState(""),[oe,Ee]=R.useState(!0),[Ae,Le]=R.useState(""),[fe,O]=R.useState(""),[ne,M]=R.useState(""),[w,j]=R.useState(!1),[ue,U]=R.useState("CONS"),[N,ge]=R.useState(!0),[be,Y]=R.useState(!0),[ke,Ne]=R.useState(!1),[Ue,Et]=R.useState(""),[dt,Pt]=R.useState(""),[Ot,Ge]=R.useState("9"),[Oe,vt]=R.useState("5"),[Lt,wt]=R.useState(""),He=R.useMemo(()=>i.filter(G=>Number(G.id)!==Number(u==null?void 0:u.id)),[i,u]),Ct=R.useMemo(()=>((u==null?void 0:u.sectors)||[]).filter(G=>Number(G.id)!==Number(d==null?void 0:d.id)),[u,d]),mt=R.useMemo(()=>d?p.filter(G=>Number(G.sector_id)===Number(d.id)).length:0,[p,d]),Tn=Number(((Jt=u==null?void 0:u.summary)==null?void 0:Jt.total)??p.length??0),Wt=u==null?void 0:u.id,Vn=d==null?void 0:d.id;if(R.useEffect(()=>{var G,nt;n&&(Z(o),J(""),ae(!1),o==="CREATE_UNIT"?(Ce(""),ve(""),te(!1),V("USF"),K(""),Ee(!0)):o==="EDIT_UNIT"&&u?(Ce(we(u.name||"")),ve(u.code||""),te(!0),V(u.unit_type||"USF"),K(we(u.address||""))):o==="DELETE_UNIT"?Le((G=He[0])!=null&&G.id?String(He[0].id):""):o==="CREATE_SECTOR"?(O(""),M(""),j(!1),U("CONS"),ge(!0),Y(!0),Ne(!1),Et(""),Pt(""),Ge("9"),vt("5")):o==="EDIT_SECTOR"&&d?(O(we(d.name||"")),M(d.code||""),j(!0),U(cp(d)),ge(!1),Ne(!1),Et(String(d.bounds_x??0)),Pt(String(d.bounds_z??0)),Ge(String(d.width_3d??9)),vt(String(d.depth_3d??5))):o==="DELETE_SECTOR"&&wt((nt=Ct[0])!=null&&nt.id?String(Ct[0].id):""))},[n,o,Wt,Vn]),!n)return null;const Mt=G=>{var nt,vn;J(""),Z(G),G==="CREATE_UNIT"?(Ce(""),ve(""),te(!1),V("USF"),K(""),Ee(!0)):G==="EDIT_UNIT"&&u?(Ce(we(u.name||"")),ve(u.code||""),te(!0),V(u.unit_type||"USF"),K(we(u.address||""))):G==="DELETE_UNIT"?Le((nt=He[0])!=null&&nt.id?String(He[0].id):""):G==="CREATE_SECTOR"?(O(""),M(""),j(!1),U("CONS"),ge(!0),Y(!0),Ne(!1),Et(""),Pt(""),Ge("9"),vt("5")):G==="EDIT_SECTOR"&&d?(O(we(d.name||"")),M(d.code||""),j(!0),U(cp(d)),ge(!1),Ne(!1),Et(String(d.bounds_x??0)),Pt(String(d.bounds_z??0)),Ge(String(d.width_3d??9)),vt(String(d.depth_3d??5))):G==="DELETE_SECTOR"&&wt((vn=Ct[0])!=null&&vn.id?String(Ct[0].id):"")},xn=async G=>{G.preventDefault(),J(""),ae(!0);try{D==="CREATE_UNIT"?await x({name:he,code:_e,unit_type:pe,address:q,create_default_sectors:oe}):D==="EDIT_UNIT"&&u?await g(u.id,{name:he,code:_e,unit_type:pe,address:q}):D==="DELETE_UNIT"&&u?await C(u.id,{target_unit_id:Ae?Number(Ae):void 0}):D==="CREATE_SECTOR"&&u?await _(u.id,{name:fe,code:ne,room_theme:ue,auto_size:be,...be?{}:{width_3d:Number(Ot||9),depth_3d:Number(Oe||5)},...N?{}:{bounds_x:Ue===""?void 0:Number(Ue),bounds_z:dt===""?void 0:Number(dt)}}):D==="EDIT_SECTOR"&&d?await I(d.id,{name:fe,code:ne,room_theme:ue,width_3d:Number(Ot||9),depth_3d:Number(Oe||5),bounds_x:Ue===""?void 0:Number(Ue),bounds_z:dt===""?void 0:Number(dt)}):D==="DELETE_SECTOR"&&d&&await P(d.id,{target_sector_id:Lt?Number(Lt):void 0}),m()}catch(nt){J((nt==null?void 0:nt.message)||"Não foi possível concluir a operação.")}finally{ae(!1)}},Wn=D==="EDIT_SECTOR"||D==="DELETE_SECTOR",Gt={CREATE_UNIT:"Cadastrar Nova Unidade de Saúde",EDIT_UNIT:`Editar Unidade — ${we((u==null?void 0:u.name)||"")}`,DELETE_UNIT:`Excluir Unidade — ${we((u==null?void 0:u.name)||"")}`,CREATE_SECTOR:`Novo Setor em ${we((u==null?void 0:u.name)||"Unidade")}`,EDIT_SECTOR:`Editar Setor — ${we((d==null?void 0:d.name)||"")}`,DELETE_SECTOR:`Excluir Setor — ${we((d==null?void 0:d.name)||"")}`}[D];return a.jsx(n1,{onClick:()=>!W&&m(),children:a.jsxs(r1,{onClick:G=>G.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsxs(o1,{children:[a.jsxs("div",{children:[a.jsxs("div",{className:"m-kicker",children:["ESTRUTURA DA REDE // ",u?we(u.code):"RMM"]}),a.jsx("div",{className:"m-title",children:Gt})]}),a.jsx(s1,{type:"button",onClick:()=>!W&&m(),title:"Fechar",children:"✕"})]}),Wn?a.jsxs(dp,{children:[a.jsx(so,{type:"button",$active:D==="EDIT_SECTOR",onClick:()=>Mt("EDIT_SECTOR"),children:"Editar Setor"}),a.jsx(so,{type:"button",$danger:!0,$active:D==="DELETE_SECTOR",onClick:()=>Mt("DELETE_SECTOR"),children:"Excluir Setor"})]}):a.jsxs(dp,{children:[a.jsx(so,{type:"button",$active:D==="CREATE_UNIT",onClick:()=>Mt("CREATE_UNIT"),children:"+ Nova Unidade"}),u&&a.jsxs(a.Fragment,{children:[a.jsx(so,{type:"button",$active:D==="CREATE_SECTOR",onClick:()=>Mt("CREATE_SECTOR"),children:"+ Novo Setor"}),a.jsx(so,{type:"button",$active:D==="EDIT_UNIT",onClick:()=>Mt("EDIT_UNIT"),children:"Editar Unidade"}),a.jsx(so,{type:"button",$danger:!0,$active:D==="DELETE_UNIT",onClick:()=>Mt("DELETE_UNIT"),children:"Excluir Unidade"})]})]}),a.jsxs(i1,{onSubmit:xn,children:[X&&a.jsx(rs,{$tone:"danger",children:X}),(D==="CREATE_UNIT"||D==="EDIT_UNIT")&&a.jsxs(a.Fragment,{children:[a.jsxs(ns,{$cols:"2fr 1fr",children:[a.jsxs(Xt,{children:[a.jsx("label",{children:"Nome da Unidade de Saúde *"}),a.jsx("input",{type:"text",required:!0,placeholder:"Ex: USF Camela / UPA Ipojuca",value:he,onChange:G=>{const nt=G.target.value;Ce(nt),!re&&D==="CREATE_UNIT"&&ve(up(nt,"UNI"))}})]}),a.jsxs(Xt,{children:[a.jsxs("label",{children:["Sigla / Código",a.jsx("span",{className:"hint",children:"Única"})]}),a.jsx("input",{type:"text",placeholder:"Ex: USF-CAM",value:_e,onChange:G=>{te(!0),ve(G.target.value.toUpperCase())}})]})]}),a.jsxs(ns,{$cols:"1fr 1.4fr",children:[a.jsxs(Xt,{children:[a.jsx("label",{children:"Tipo de Estabelecimento"}),a.jsx("select",{value:pe,onChange:G=>V(G.target.value),children:e1.map(G=>a.jsx("option",{value:G.value,children:G.label},G.value))})]}),a.jsxs(Xt,{children:[a.jsx("label",{children:"Endereço / Bairro"}),a.jsx("input",{type:"text",placeholder:"Ex: Distrito de Camela, Ipojuca - PE",value:q,onChange:G=>K(G.target.value)})]})]}),D==="CREATE_UNIT"&&a.jsxs(iu,{children:[a.jsx("input",{type:"checkbox",checked:oe,onChange:G=>Ee(G.target.checked)}),a.jsx("span",{children:"Criar planta inicial com 4 setores padrão (Recepção, Consultório, Farmácia e Adm)"})]})]}),D==="DELETE_UNIT"&&u&&a.jsxs(a.Fragment,{children:[He.length===0?a.jsxs(rs,{$tone:"danger",children:["Esta é a única unidade ativa no painel. Crie outra unidade antes de excluir"," ",a.jsx("strong",{children:we(u.name)}),"."]}):a.jsxs(rs,{$tone:"warning",children:["A unidade ",a.jsx("strong",{children:we(u.name)})," possui"," ",a.jsxs("strong",{children:[(u.sectors||[]).length," setor(es)"]})," e"," ",a.jsxs("strong",{children:[Tn," computador(es)"]})," vinculados. Esta ação remove permanentemente a unidade e todos os seus setores."]}),He.length>0&&Tn>0&&a.jsxs(Xt,{children:[a.jsx("label",{children:"Realocar computadores existentes para qual unidade?"}),a.jsx("select",{value:Ae,onChange:G=>Le(G.target.value),required:!0,children:He.map(G=>a.jsxs("option",{value:G.id,children:["[",G.code,"] ",we(G.name)]},G.id))})]})]}),(D==="CREATE_SECTOR"||D==="EDIT_SECTOR")&&a.jsxs(a.Fragment,{children:[a.jsxs(ns,{$cols:"2fr 1fr",children:[a.jsxs(Xt,{children:[a.jsx("label",{children:"Nome do Setor *"}),a.jsx("input",{type:"text",required:!0,placeholder:"Ex: Sala de Vacina, Consultório 02, CPD",value:fe,onChange:G=>{const nt=G.target.value;O(nt),!w&&D==="CREATE_SECTOR"&&M(up(nt,"SETOR"))}})]}),a.jsxs(Xt,{children:[a.jsxs("label",{children:["Sigla / Código",a.jsx("span",{className:"hint",children:"Única na unidade"})]}),a.jsx("input",{type:"text",placeholder:"Ex: VAC-01",value:ne,onChange:G=>{j(!0),M(G.target.value.toUpperCase())}})]})]}),a.jsxs(Xt,{children:[a.jsxs("label",{children:["Estilo do Ambiente & Mobiliário 3D",a.jsx("span",{className:"hint",children:"Define móveis e piso na maquete"})]}),a.jsx(l1,{children:t1.map(G=>a.jsxs(a1,{type:"button",$selected:ue===G.value,onClick:()=>U(G.value),children:[a.jsx("div",{className:"t-code",children:G.value}),a.jsx("div",{className:"t-name",children:G.label}),a.jsx("div",{className:"t-desc",children:G.desc})]},G.value))})]}),a.jsx(c1,{type:"button",onClick:()=>Ne(G=>!G),children:ke?"▾ Ocultar layout e medidas 3D":"▸ Layout e medidas 3D (Avançado)"}),ke&&a.jsxs(u1,{children:[D==="CREATE_SECTOR"&&a.jsxs(iu,{style:{background:"#FFFFFF"},children:[a.jsx("input",{type:"checkbox",checked:N,onChange:G=>ge(G.target.checked)}),a.jsx("span",{children:"Posicionar automaticamente no próximo espaço livre da planta (sem colisão)"})]}),D==="CREATE_SECTOR"&&a.jsxs(iu,{style:{background:"#FFFFFF"},children:[a.jsx("input",{type:"checkbox",checked:be,onChange:G=>Y(G.target.checked)}),a.jsx("span",{children:"Tamanho automático — a sala assume a medida predominante da unidade e encaixa na malha existente"})]}),a.jsxs(ns,{$cols:"repeat(2, 1fr)",children:[a.jsxs(Xt,{children:[a.jsx("label",{children:"Largura da Sala (m)"}),a.jsx("input",{type:"number",step:"0.5",min:"4",max:"24",value:Ot,disabled:D==="CREATE_SECTOR"&&be,onChange:G=>Ge(G.target.value)})]}),a.jsxs(Xt,{children:[a.jsx("label",{children:"Profundidade da Sala (m)"}),a.jsx("input",{type:"number",step:"0.5",min:"3.5",max:"16",value:Oe,disabled:D==="CREATE_SECTOR"&&be,onChange:G=>vt(G.target.value)})]})]}),(!N||D==="EDIT_SECTOR")&&a.jsxs(ns,{$cols:"repeat(2, 1fr)",children:[a.jsxs(Xt,{children:[a.jsx("label",{children:"Posição X Centro (m)"}),a.jsx("input",{type:"number",step:"0.5",value:Ue,placeholder:"-4.5, 4.5, 13.5...",onChange:G=>Et(G.target.value)})]}),a.jsxs(Xt,{children:[a.jsx("label",{children:"Posição Z Centro (m)"}),a.jsx("input",{type:"number",step:"0.5",value:dt,placeholder:"-3.5 (Norte) ou 3.5 (Sul)",onChange:G=>Pt(G.target.value)})]})]})]})]}),D==="DELETE_SECTOR"&&d&&a.jsxs(a.Fragment,{children:[Ct.length===0&&mt>0?a.jsxs(rs,{$tone:"danger",children:["O setor ",a.jsx("strong",{children:we(d.name)})," é o único setor desta unidade e contém ",a.jsxs("strong",{children:[mt," computador(es)"]}),". Crie outro setor antes de excluí-lo para permitir a transferência."]}):a.jsxs(rs,{$tone:"warning",children:["Confirma a exclusão do setor"," ",a.jsx("strong",{children:we(d.name)})," (",d.code,") da unidade ",a.jsx("strong",{children:we((u==null?void 0:u.name)||"")}),"?",mt>0?` Os ${mt} computador(es) alocados serão transferidos para o setor selecionado abaixo.`:" Este setor não possui computadores alocados."]}),Ct.length>0&&mt>0&&a.jsxs(Xt,{children:[a.jsx("label",{children:"Transferir computadores deste setor para:"}),a.jsx("select",{value:Lt,onChange:G=>wt(G.target.value),required:!0,children:Ct.map(G=>a.jsxs("option",{value:G.id,children:["[",G.code,"] ",we(G.name)]},G.id))})]})]}),a.jsxs(d1,{children:[a.jsx(fp,{type:"button",onClick:()=>!W&&m(),disabled:W,children:"Cancelar"}),a.jsx(fp,{type:"submit",$variant:D==="DELETE_UNIT"||D==="DELETE_SECTOR"?"danger":"primary",disabled:W||D==="DELETE_UNIT"&&He.length===0||D==="DELETE_SECTOR"&&Ct.length===0&&mt>0,children:W?"Processando...":D==="CREATE_UNIT"?"Criar Unidade":D==="EDIT_UNIT"?"Salvar Unidade":D==="DELETE_UNIT"?"Confirmar Exclusão da Unidade":D==="CREATE_SECTOR"?"Criar Setor 3D":D==="EDIT_SECTOR"?"Salvar Setor":"Confirmar Exclusão do Setor"})]})]})]})})}const p1=R.lazy(()=>xp(()=>import("./DigitalTwin3D-DTi6ie77.js"),__vite__mapDeps([0,1])).then(n=>({default:n.DigitalTwin3D}))),h1=R.lazy(()=>xp(()=>import("./ModelShowcase-BOdyFZ11.js"),__vite__mapDeps([2,1]))),m1={ADMIN_N2:"Admin N2",TECH_N1:"Suporte N1",VIEWER:"Gestão"};function dh(n){return String(n||"Operador").replace(/\s*\((Admin\s*N2|Suporte\s*N1|Tech\s*N1|Gest[aã]o|Viewer)\)\s*$/i,"").trim()}function g1(n){const o=dh(n).split(/\s+/).filter(Boolean);return o.length===0?"TI":o.length===1?o[0].slice(0,2).toUpperCase():`${o[0][0]}${o[o.length-1][0]}`.toUpperCase()}const y1=T.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
`,x1=T.header`
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
`,v1=T.div`
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
`,pp=T.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({$color:n})=>n||"#2D6A4F"};
  display: inline-block;
  flex-shrink: 0;
`,w1=T.nav`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`,S1=T.div`
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
`,b1=T.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`,k1=T.button`
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
`,Oi=T.button`
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
`,E1=T.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 1120px) {
    .hide-compact {
      display: none;
    }
  }
`,os=T.span`
  width: 1px;
  height: 20px;
  background: ${({theme:n})=>n.colors.borderSubtle};
  display: inline-block;
  flex-shrink: 0;
`,C1=T.div`
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
`,_1=T.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 14px;
  gap: 10px;
  pointer-events: none;
`,N1=T.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
`,j1=T.div`
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
`,Cn=T.button`
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
`,T1=T.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
  overflow: hidden;
`,R1=T.button`
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
`,$1=T.aside`
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
`,lu=T.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({theme:n})=>n.colors.borderSubtle};

  &:last-child {
    border-bottom: none;
  }
`,au=T.div`
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
`,I1=T.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`,Li=T.div`
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
`,hp=T.button`
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
`,Mi=T.button`
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
`,A1=T.div`
  display: flex;
  flex-direction: column;
`,P1=T.div`
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
`,O1=T.button`
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
`,mp=T.p`
  font-size: 0.76rem;
  color: ${({theme:n})=>n.colors.textSecondary};
  line-height: 1.45;
`,L1=T.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`,M1=T.button`
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
`,z1=T.footer`
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
`,F1=T.div`
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
`,D1=T.button`
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
`,B1=T.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,U1=T.div`
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
`,H1=T.button`
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
`,V1=T.button`
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
`,Eu=T.div`
  position: fixed;
  inset: 0;
  background: ${({theme:n})=>n.colors.bgCanvas};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({theme:n})=>n.fonts.mono};
  font-size: 0.82rem;
  color: ${({theme:n})=>n.colors.textSecondary};
`,gp=86400;function yp(n,o){if(!n)return{isInactive24h:!1,mode:null,seconds:0};const i=n.health_status==="OFFLINE",u=n.last_seen_at?Math.max(0,Math.floor((o-new Date(n.last_seen_at).getTime())/1e3)):0,d=Math.max(0,Math.floor(Number(n.idle_seconds||0)));return i&&u>=gp?{isInactive24h:!0,mode:"OFFLINE",seconds:u}:!i&&d>=gp?{isInactive24h:!0,mode:"IDLE",seconds:d}:{isInactive24h:!1,mode:null,seconds:i?u:d}}function io(n){const o=Math.max(0,Math.floor(Number(n||0)));if(o<60)return`${o}s`;const i=Math.floor(o/60);if(i<60)return`${i}m`;const u=Math.floor(i/60);return u<24?`${u}h ${i%60}m`:`${Math.floor(u/24)}d ${u%24}h`}const Cu="rmm.authToken";function W1(){try{return window.sessionStorage.getItem(Cu)||null}catch{return null}}function uu(n){try{n?window.sessionStorage.setItem(Cu,n):window.sessionStorage.removeItem(Cu)}catch{}}function G1(){const n=R.useMemo(()=>{const o=new URLSearchParams(window.location.search);return o.get("showcase")!=="1"?null:{angle:o.get("angle")||"iso"}},[]);return n?a.jsxs(Hi,{theme:me,children:[a.jsx(Vi,{}),a.jsx(R.Suspense,{fallback:a.jsx(Eu,{children:"Carregando cena de homologação 3D..."}),children:a.jsx(h1,{angle:n.angle})})]}):a.jsx(q1,{})}function q1(){var Rn,L,je;const[n,o]=R.useState({token:null,user:null,checking:!0}),[i,u]=R.useState(""),[d,p]=R.useState({open:!1,busy:!1,resultMsg:""}),[m,x]=R.useState([]),[g,C]=R.useState(1),[_,I]=R.useState([]),[P,D]=R.useState(null),[Z,W]=R.useState(null),[ae,X]=R.useState(null),[J,he]=R.useState([]),[Ce,_e]=R.useState([]),[ve,re]=R.useState([]),[te,pe]=R.useState(!1),[V,q]=R.useState("ISO"),[K,oe]=R.useState("PIXEL"),[Ee,Ae]=R.useState(()=>{try{return window.localStorage.getItem("rmm.topControlsCollapsed")==="1"}catch{return!1}}),[Le,fe]=R.useState(""),[O,ne]=R.useState(()=>{try{return window.localStorage.getItem("rmm.dockCollapsed")==="1"}catch{return!1}}),[M,w]=R.useState(()=>{try{return window.localStorage.getItem("rmm.leftRailCollapsed")==="1"}catch{return!1}}),j=R.useRef(g),ue=R.useRef(P);R.useEffect(()=>{j.current=g},[g]),R.useEffect(()=>{ue.current=P},[P]),R.useEffect(()=>{try{window.localStorage.setItem("rmm.dockCollapsed",O?"1":"0")}catch{}},[O]),R.useEffect(()=>{try{window.localStorage.setItem("rmm.topControlsCollapsed",Ee?"1":"0")}catch{}},[Ee]),R.useEffect(()=>{try{window.localStorage.setItem("rmm.leftRailCollapsed",M?"1":"0")}catch{}},[M]);const[U,N]=R.useState(Date.now()),[ge,be]=R.useState({furniture:!0,labels:!0}),[Y,ke]=R.useState({isOpen:!1,mode:"CREATE_UNIT",targetSector:null}),Ne=R.useCallback((S="")=>{uu(null),o({token:null,user:null,checking:!1}),pe(!1),x([]),I([]),X(null),he([]),re([]),u(S)},[]),Ue=R.useCallback(async(S,Q)=>{const A=await Ke.login(S,Q);return uu(A.token),u(""),o({token:A.token,user:A.user,checking:!1}),A},[]);R.useEffect(()=>{const S=W1();if(!S){o({token:null,user:null,checking:!1});return}Ke.getMe(S).then(Q=>{o({token:S,user:Q.user,checking:!1})}).catch(()=>{uu(null),o({token:null,user:null,checking:!1})})},[]);const Et=((Rn=n.user)==null?void 0:Rn.role)==="ADMIN_N2"||((L=n.user)==null?void 0:L.role)==="TECH_N1",dt=(S,Q=null)=>{ke({isOpen:!0,mode:S,targetSector:Q})},Pt=()=>{ke(S=>({...S,isOpen:!1}))};R.useEffect(()=>{const S=setInterval(()=>N(Date.now()),1e3);return()=>clearInterval(S)},[]);const Ot=S=>{be(Q=>({...Q,[S]:!Q[S]}))},Ge=R.useCallback(async(S,Q,A)=>{var $;try{const[de,Ve,Ie,St]=await Promise.all([Ke.getUnits(S),Ke.getMachines(S,{unitId:Q}),Ke.getTaskCatalog(S),Ke.getAlerts(S)]),rt=Ve.machines||[];x(de.units||[]),I(rt),_e(Ie.tasks||[]),re(St.alerts||[]);const zt=A&&rt.some(Gn=>Gn.id===Number(A))?A:(($=rt[0])==null?void 0:$.id)||null;if(zt){const[Gn,$n]=await Promise.all([Ke.getMachineDiagnostics(S,zt),Ke.getMachineMessages(S,zt).catch(()=>({messages:[]}))]);X(Gn),he($n.messages||[])}else X(null),he([])}catch(de){if((de==null?void 0:de.status)===401){Ne("Sua sessão expirou. Faça login novamente.");return}throw de}},[Ne]);R.useEffect(()=>{if(!n.token)return;const S=n.token,Q=Sy(S,{onConnect:()=>pe(!0),onDisconnect:()=>pe(!1),onMachineUpdated:A=>{const $=Number(j.current),de=Number(A.unit_id),Ve=$>0&&de===$;I(Ie=>{const St=Ie.some(rt=>rt.id===A.id);return Ve?St?Ie.map(rt=>rt.id===A.id?A:rt):[...Ie,A]:St?Ie.filter(rt=>rt.id!==A.id):Ie}),X(Ie=>!Ie||!Ie.machine?Ie:Ie.machine.id===A.id?Ve?{...Ie,machine:A}:null:Ie),Ke.getUnits(S).then(Ie=>x(Ie.units||[])).catch(()=>{})},onMachineDeleted:({id:A})=>{I($=>$.filter(de=>de.id!==Number(A))),X($=>{var de;return((de=$==null?void 0:$.machine)==null?void 0:de.id)===Number(A)?null:$}),Ke.getUnits(S).then($=>x($.units||[])).catch(()=>{})},onAlertTriggered:A=>{re($=>[A,...$.filter(de=>de.id!==A.id).slice(0,19)])},onTaskUpdated:A=>{const $=ue.current;A&&A.machine_id&&X(de=>{var rt;if(!de||Number((rt=de.machine)==null?void 0:rt.id)!==Number(A.machine_id))return de;const Ve=de.tasks||[],St=Ve.some(zt=>zt.task_id===A.task_id)?Ve.map(zt=>zt.task_id===A.task_id?A:zt):[A,...Ve];return{...de,tasks:St}}),A!=null&&A.machine_id&&Number(A.machine_id)===Number($)&&Ke.getMachineDiagnostics(S,A.machine_id).then(de=>{Number(ue.current)===Number(A.machine_id)&&X(de)}).catch(()=>{})},onAgentMessage:A=>{const $=Number(ue.current);!A||!$||Number(A.machine_id)!==$||he(de=>A.id!==void 0&&de.some(Ve=>Ve.id===A.id)?de:[...de,A])},onUnitsUpdated:A=>{Array.isArray(A==null?void 0:A.units)&&x(A.units)}});return()=>{Q.close()}},[n.token]),R.useEffect(()=>{if(!n.token)return;Ge(n.token,g,P).catch(()=>{});const S=setInterval(()=>{Ge(n.token,g,P).catch(()=>{})},12e3);return()=>clearInterval(S)},[n.token,g,P,Ge]),R.useEffect(()=>{m.length>0&&!m.some(S=>S.id===Number(g))&&(C(m[0].id),W(null),D(null),X(null))},[m,g]);const Oe=m.find(S=>S.id===Number(g))||m[0],vt=_.find(S=>S.id===Number(P))||_[0]||null,Lt=R.useMemo(()=>((Oe==null?void 0:Oe.sectors)||[]).find(S=>S.id===Number(Z))||null,[Oe,Z]),wt=R.useMemo(()=>{if(!Le.trim())return _;const S=Le.toLowerCase();return _.filter(Q=>String(Q.hostname||"").toLowerCase().includes(S)||String(Q.ip_address||"").toLowerCase().includes(S)||String(Q.sector_name||"").toLowerCase().includes(S))},[_,Le]),He=m.reduce((S,Q)=>{var A,$,de,Ve,Ie;return{total:S.total+(((A=Q.summary)==null?void 0:A.total)||0),NORMAL:S.NORMAL+((($=Q.summary)==null?void 0:$.NORMAL)||0),WARNING:S.WARNING+(((de=Q.summary)==null?void 0:de.WARNING)||0),CRITICAL:S.CRITICAL+(((Ve=Q.summary)==null?void 0:Ve.CRITICAL)||0),OFFLINE:S.OFFLINE+(((Ie=Q.summary)==null?void 0:Ie.OFFLINE)||0)}},{total:0,NORMAL:0,WARNING:0,CRITICAL:0,OFFLINE:0});async function Ct(S){const Q=await Ke.dispatchAuthorizedTask(n.token,S);return await Ge(n.token,g,S.machineId),Q}async function mt(S,Q){return(await Ke.getApprovedPrinters(n.token,S,Q)).printers||[]}async function Tn(S){const Q=await Ke.refreshMachineTelemetryNow(n.token,S);return await Ge(n.token,g,S),Q}async function Wt(S){const Q=await Ke.updateMachineAgent(n.token,S);return await Ge(n.token,g,S),Q}async function Vn(){p(S=>({...S,busy:!0,resultMsg:""}));try{const S=await Ke.updateAllAgents(n.token);await Ge(n.token,g,P),p({open:!0,busy:!1,resultMsg:S.message||"Ordem de atualização enviada para todas as máquinas."})}catch(S){p({open:!0,busy:!1,resultMsg:`Falha ao enviar atualização: ${S.message}`})}}async function Mt(S,Q){const A=await Ke.sendMachineMessage(n.token,S,Q);return await Ge(n.token,g,S),A}async function xn(S,{unitId:Q,sectorId:A}){const $=await Ke.updateMachineLocation(n.token,S,{unitId:Q,sectorId:A});return C(Number(Q)),await Ge(n.token,Number(Q),S),$}async function Wn(S){await Ke.deleteMachine(n.token,S),D(null),await Ge(n.token,g,null)}async function Gt(S){var $;const Q=await Ke.createUnit(n.token,S);Array.isArray(Q.units)&&x(Q.units);const A=(($=Q.unit)==null?void 0:$.id)||g;return C(A),D(null),W(null),X(null),q("ISO"),await Ge(n.token,A,null),Q}async function Jt(S,Q){const A=await Ke.updateUnit(n.token,S,Q);return Array.isArray(A.units)&&x(A.units),await Ge(n.token,g,P),A}async function G(S,Q){var Ve;const A=await Ke.deleteUnit(n.token,S,Q),$=Array.isArray(A.units)?A.units:[];x($);const de=A.target_unit_id||((Ve=$[0])==null?void 0:Ve.id)||1;return C(de),D(null),W(null),X(null),q("ISO"),await Ge(n.token,de,null),A}async function nt(S,Q){var $;const A=await Ke.createSector(n.token,S,Q);return Array.isArray(A.units)&&x(A.units),($=A.sector)!=null&&$.id&&(W(A.sector.id),q("SECTOR")),await Ge(n.token,g,P),A}async function vn(S,Q){const A=await Ke.updateSector(n.token,S,Q);return Array.isArray(A.units)&&x(A.units),await Ge(n.token,g,P),A}async function Pr(S,Q){const A=await Ke.deleteSector(n.token,S,Q);return Array.isArray(A.units)&&x(A.units),Number(Z)===Number(S)&&(W(null),q("ISO")),await Ge(n.token,g,P),A}return n.checking?a.jsxs(Hi,{theme:me,children:[a.jsx(Vi,{}),a.jsx(Eu,{children:"Validando sessão Pulso RMM..."})]}):!n.token||!n.user?a.jsxs(Hi,{theme:me,children:[a.jsx(Vi,{}),a.jsx(Rx,{onAuthenticated:Ue,sessionNotice:i})]}):a.jsxs(Hi,{theme:me,children:[a.jsx(Vi,{}),K==="PIXEL"?a.jsx(Vy,{activeUnit:Oe,machines:_,selectedMachine:vt,selectedSector:Lt,onSelectMachine:S=>{D(S.id),W(null)}}):a.jsx(R.Suspense,{fallback:a.jsx(Eu,{children:"Carregando Gêmeo Digital 3D..."}),children:a.jsx(p1,{activeUnit:Oe,machines:_,selectedMachine:vt,selectedSector:Lt,cameraMode:V,roomVariant:Ix(),sceneLayers:ge,onUserOrbit:()=>{V!=="FREE"&&q("FREE")},onSelectMachine:S=>{D(S.id),W(null),q("FOCUS")}})}),a.jsxs(y1,{children:[a.jsxs(x1,{children:[a.jsxs(v1,{children:[a.jsx(ku,{size:26}),a.jsxs("div",{className:"brand-copy",children:[a.jsx("span",{className:"brand-title",children:"Pulso RMM"}),a.jsxs("span",{className:"brand-status",children:[a.jsx(pp,{$color:te?me.colors.status.NORMAL:me.colors.status.WARNING}),a.jsx("span",{children:te?"Tempo real ativo":"Reconectando"})]})]})]}),a.jsx(os,{"aria-hidden":"true"}),a.jsxs(w1,{"aria-label":"Unidades de Saúde",children:[a.jsx(S1,{children:m.map(S=>{var $,de;const Q=S.id===Number(g),A=we(S.name);return a.jsxs(k1,{type:"button",$active:Q,"aria-current":Q?"page":void 0,title:`${A} (${(($=S.summary)==null?void 0:$.total)||0} estações)`,onClick:()=>{C(S.id),D(null),W(null),X(null),q("ISO")},children:[a.jsx("span",{className:"u-name",children:A}),a.jsx("span",{className:"u-count",children:((de=S.summary)==null?void 0:de.total)||0})]},S.id)})}),Et&&a.jsxs(b1,{children:[a.jsx(Oi,{type:"button",$accent:!0,$iconOnly:!0,onClick:()=>dt("CREATE_UNIT"),title:"Cadastrar nova Unidade de Saúde","aria-label":"Cadastrar nova Unidade de Saúde",children:a.jsx(Yf,{size:14})}),Oe&&a.jsx(Oi,{type:"button",$iconOnly:!0,onClick:()=>dt("EDIT_UNIT"),title:"Editar ou excluir unidade selecionada","aria-label":"Editar unidade selecionada",children:a.jsx(Qf,{size:14})})]})]}),a.jsxs(E1,{children:[a.jsxs(Oi,{as:"a",href:"/api/agent/download",download:"IpojucaRMM-Setup.exe",title:"Baixar instalador oficial do Agente Windows (.exe)",children:[a.jsx(Yy,{size:14}),a.jsx("span",{className:"hide-compact",children:"Agente"})]}),((je=n.user)==null?void 0:je.role)==="ADMIN_N2"&&a.jsxs(Oi,{type:"button",$accent:!0,onClick:()=>p({open:!0,busy:!1,resultMsg:""}),title:"Enviar atualização silenciosa (OTA) para todas as máquinas",children:[a.jsx(Qy,{size:14}),a.jsx("span",{className:"hide-compact",children:"Atualizar todos"})]}),a.jsx(os,{"aria-hidden":"true"}),a.jsxs(C1,{title:n.user.email,children:[a.jsx("span",{className:"u-avatar",children:g1(n.user.name)}),a.jsxs("div",{className:"u-meta",children:[a.jsx("span",{className:"u-name",children:dh(n.user.name)}),a.jsx("span",{className:"u-role",children:m1[n.user.role]||n.user.role})]}),a.jsx(Mi,{type:"button",$danger:!0,onClick:()=>Ne(""),title:"Encerrar sessão","aria-label":"Encerrar sessão",children:a.jsx(Ky,{size:14})})]})]})]}),a.jsxs(_1,{children:[a.jsx(N1,{children:a.jsx(j1,{children:Ee?a.jsxs(a.Fragment,{children:[a.jsx("span",{style:{fontFamily:me.fonts.mono,fontSize:"0.72rem",fontWeight:600,color:me.colors.textSecondary,padding:"0 8px"},children:K==="PIXEL"?"Pixel Art":`3D · ${V}`}),a.jsxs(Cn,{type:"button",onClick:()=>Ae(!1),title:"Expandir controles de visualização","aria-expanded":"false",children:[a.jsx(nu,{size:14}),a.jsx("span",{children:"Visualização"})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs(Cn,{type:"button",$active:K==="PIXEL",onClick:()=>oe("PIXEL"),title:"Planta isométrica em Pixel Art",children:[a.jsx(lx,{size:13}),a.jsx("span",{children:"Pixel Art"})]}),a.jsxs(Cn,{type:"button",$active:K==="3D",onClick:()=>oe("3D"),title:"Maquete tridimensional interativa",children:[a.jsx(ix,{size:13}),a.jsx("span",{children:"3D"})]}),K==="3D"&&a.jsxs(a.Fragment,{children:[a.jsx(os,{"aria-hidden":"true"}),a.jsx(Cn,{type:"button",$active:V==="ISO",onClick:()=>{W(null),q("ISO")},children:"ISO"}),a.jsx(Cn,{type:"button",$active:V==="TOP",onClick:()=>q("TOP"),children:"Topo"}),a.jsx(Cn,{type:"button",$active:V==="FOCUS",onClick:()=>q("FOCUS"),children:"Foco"}),a.jsx(Cn,{type:"button",$active:V==="ORBIT",onClick:()=>q(S=>S==="ORBIT"?"ISO":"ORBIT"),title:"Giro orbital suave ao redor da maquete",children:"360°"}),a.jsx(os,{"aria-hidden":"true"}),a.jsxs(Cn,{type:"button",$active:ge.furniture,onClick:()=>Ot("furniture"),title:"Alternar mobiliário 3D",children:[a.jsx(rx,{size:13}),a.jsx("span",{children:"Mobiliário"})]}),a.jsxs(Cn,{type:"button",$active:ge.labels,onClick:()=>Ot("labels"),title:"Alternar rótulos das estações",children:[a.jsx(ox,{size:13}),a.jsx("span",{children:"Rótulos"})]})]}),a.jsx(os,{"aria-hidden":"true"}),a.jsx(Cn,{type:"button",onClick:()=>Ae(!0),title:"Recolher barra de visualização","aria-label":"Recolher barra de visualização","aria-expanded":"true",children:a.jsx(nu,{size:14,style:{transform:"rotate(180deg)"}})})]})})}),a.jsxs(T1,{children:[(()=>{const Q=[..._.map($=>({machine:$,info:yp($,U)})).filter(({info:$})=>$.isInactive24h).filter(({machine:$})=>!ve.some(de=>Number(de.machine_id)===Number($.id)&&de.metric_name==="INACTIVITY_24H"&&de.status!=="RESOLVED")).map(({machine:$,info:de})=>({id:`live-inact-${$.id}`,machine_id:$.id,hostname:$.hostname,unit_name:$.unit_name||(Oe==null?void 0:Oe.name)||"",severity:"WARNING",metric_name:"INACTIVITY_24H",status:"Inativo >24h",message:de.mode==="OFFLINE"?`Sem comunicação há ${io(de.seconds)} (>24h).`:`Ligado sem interação há ${io(de.seconds)} (>24h).`})),...ve],A=Q.filter($=>$.status!=="RESOLVED").length;return M?a.jsxs(R1,{type:"button",onClick:()=>w(!1),title:"Expandir painel lateral de rede, setores e alertas","aria-expanded":"false",children:[a.jsx(sx,{size:15}),a.jsx("span",{children:"Painel"}),A>0&&a.jsx("span",{className:"alert-pill",children:A})]}):a.jsxs($1,{"aria-label":"Resumo da rede, setores e alertas",children:[a.jsxs(lu,{children:[a.jsxs(au,{children:[a.jsx("span",{className:"sec-title",children:"Rede global"}),a.jsxs("div",{className:"sec-actions",children:[a.jsxs("span",{className:"sec-meta",children:[He.total," PCs"]}),a.jsx(Mi,{type:"button",onClick:()=>w(!0),title:"Recolher painel lateral","aria-label":"Recolher painel lateral",children:a.jsx(uh,{size:14})})]})]}),a.jsxs(I1,{children:[a.jsxs(Li,{$color:me.colors.status.NORMAL,children:[a.jsx("span",{className:"num",children:He.NORMAL+He.WARNING+He.CRITICAL}),a.jsx("span",{className:"lbl",children:"Online"})]}),a.jsxs(Li,{$color:me.colors.status.WARNING,children:[a.jsx("span",{className:"num",children:He.WARNING}),a.jsx("span",{className:"lbl",children:"Atenção"})]}),a.jsxs(Li,{$color:me.colors.status.CRITICAL,children:[a.jsx("span",{className:"num",children:He.CRITICAL}),a.jsx("span",{className:"lbl",children:"Crítico"})]}),a.jsxs(Li,{$color:me.colors.status.OFFLINE,children:[a.jsx("span",{className:"num",children:He.OFFLINE}),a.jsx("span",{className:"lbl",children:"Offline"})]})]})]}),a.jsxs(lu,{children:[a.jsxs(au,{children:[a.jsxs("span",{className:"sec-title",children:["Setores",a.jsxs("span",{className:"sec-meta",children:["(",((Oe==null?void 0:Oe.sectors)||[]).length,")"]})]}),a.jsxs("div",{className:"sec-actions",children:[Z&&a.jsxs(hp,{type:"button",onClick:()=>{W(null),q("ISO")},title:"Voltar para a visão geral da maquete",children:[a.jsx(qy,{size:12}),a.jsx("span",{children:"Geral"})]}),Et&&Oe&&a.jsxs(hp,{type:"button",onClick:()=>dt("CREATE_SECTOR"),title:"Criar novo setor nesta unidade",children:[a.jsx(Yf,{size:12}),a.jsx("span",{children:"Setor"})]})]})]}),((Oe==null?void 0:Oe.sectors)||[]).length===0?a.jsxs(mp,{children:["Nenhum setor cadastrado."," ",Et&&'Use "+ Setor" para adicionar uma sala.']}):a.jsx(A1,{children:((Oe==null?void 0:Oe.sectors)||[]).map($=>{const de=_.filter(Ie=>Number(Ie.sector_id)===Number($.id)),Ve=Z===$.id;return a.jsxs(P1,{$selected:Ve,onClick:()=>{Ve?(W(null),q("ISO")):(W($.id),q("SECTOR"))},title:`Filtrar e aproximar no setor ${we($.name)}`,children:[a.jsxs("div",{className:"s-info",children:[a.jsx("div",{className:"s-name",children:we($.name)}),a.jsx("div",{className:"s-code",children:$.code})]}),a.jsxs("div",{className:"s-right",children:[a.jsx("span",{className:"s-count",children:de.length}),Et&&a.jsxs("div",{className:"s-controls",children:[a.jsx(Mi,{type:"button",title:`Editar setor ${we($.name)}`,"aria-label":`Editar setor ${we($.name)}`,onClick:Ie=>{Ie.stopPropagation(),dt("EDIT_SECTOR",$)},children:a.jsx(Qf,{size:13})}),a.jsx(Mi,{type:"button",$danger:!0,title:`Excluir setor ${we($.name)}`,"aria-label":`Excluir setor ${we($.name)}`,onClick:Ie=>{Ie.stopPropagation(),dt("DELETE_SECTOR",$)},children:a.jsx(ah,{size:13})})]})]})]},$.id)})})]}),a.jsxs(lu,{children:[a.jsxs(au,{children:[a.jsx("span",{className:"sec-title",children:"Alertas recentes"}),a.jsxs("span",{className:"sec-meta",children:[A," ",A===1?"ativo":"ativos"]})]}),Q.length===0?a.jsx(mp,{children:"Nenhum alerta crítico ou de inatividade (>24h) no momento."}):Q.slice(0,5).map($=>a.jsxs(O1,{type:"button",$severity:$.severity,$clickable:!!$.machine_id,onClick:()=>{$.machine_id&&(D(Number($.machine_id)),q("FOCUS"))},title:$.machine_id?"Clique para focar esta estação":void 0,children:[a.jsxs("div",{className:"a-top",children:[a.jsx("span",{children:we($.hostname||`PC #${$.machine_id}`)}),a.jsx("span",{className:"a-tag",children:$.metric_name==="INACTIVITY_24H"&&$.status!=="RESOLVED"?"Inativo >24h":$.status||$.severity})]}),a.jsx("div",{className:"a-msg",children:we($.message)}),a.jsxs("div",{className:"a-meta",children:[we($.unit_name||""),$.external_ticket_id?` · #${$.external_ticket_id}`:""]})]},$.id||$.incident_key))]})]})})(),a.jsx(Zx,{diagnostics:ae,units:m,chatMessages:J,taskCatalog:Ce,currentUser:n.user||{name:"Operador",role:"VIEWER"},onDispatchTask:Ct,onLoadPrinters:mt,onRefreshTelemetryNow:Tn,onUpdateMachineAgent:Wt,onSendMessage:Mt,onUpdateLocation:xn,onDeleteMachine:Wn,onFocusCamera:()=>q("FOCUS")})]}),a.jsxs(L1,{children:[a.jsxs(M1,{type:"button",$collapsed:O,onClick:()=>ne(S=>!S),"aria-expanded":!O,"aria-controls":"rmm-bottom-dock","aria-label":O?"Expandir lista de computadores":"Recolher lista de computadores",children:[a.jsx("span",{className:"arrow","aria-hidden":"true",children:a.jsx(nu,{size:13})}),a.jsx("span",{children:O?`${_.length} ${_.length===1?"estação":"estações"} na unidade`:"Ocultar estações"})]}),a.jsxs(z1,{id:"rmm-bottom-dock",$collapsed:O,"aria-hidden":O,children:[a.jsxs(F1,{children:[a.jsxs("div",{children:[a.jsx("div",{className:"dock-title",children:we((Oe==null?void 0:Oe.name)||"Unidade")}),a.jsxs("div",{className:"dock-sub",children:[wt.length," de ",_.length," estações"]})]}),a.jsxs("div",{className:"search-wrap",children:[a.jsx("span",{className:"search-icon",children:a.jsx(Xy,{size:13})}),a.jsx("input",{className:"dock-search",type:"text","aria-label":"Filtrar estações por hostname, IP ou setor",placeholder:"Filtrar hostname, IP...",value:Le,onChange:S=>fe(S.target.value)})]})]}),wt.length===0&&a.jsxs("div",{style:{fontSize:"0.78rem",color:me.colors.textSecondary,display:"flex",alignItems:"center",gap:"12px"},children:[a.jsx("span",{children:"Nenhuma estação encontrada nesta unidade."}),a.jsx("a",{href:"/api/agent/download",download:"IpojucaRMM-Setup.exe",style:{color:me.colors.brandPrimary,textDecoration:"underline",fontWeight:600},children:"Baixar Agente (.exe)"})]}),wt.map(S=>{const Q=me.colors.status[S.health_status]||me.colors.status.NORMAL,A=(vt==null?void 0:vt.id)===S.id,$=Math.min(100,Math.max(0,Number(S.cpu_usage_pct||0))),de=Math.min(100,Math.max(0,Number(S.ram_usage_pct||0))),Ve=Math.min(100,Math.max(0,Number(S.disk_usage_pct||0))),Ie=Math.max(0,Math.floor(Number(S.idle_seconds||0))),St=qp(S.agent_version,"2.3.0"),rt=yp(S,U),zt=S.last_seen_at?Math.max(0,Math.floor((U-new Date(S.last_seen_at).getTime())/1e3)):0,Gn=rt.isInactive24h?`Inativo >24h (${io(rt.seconds)})`:S.health_status==="OFFLINE"?`Desligado há ${io(zt)}`:St?`Ativo (${S.agent_version||"2.2.0"})`:Ie<180?`Em uso (${io(Ie)})`:`Ocioso há ${io(Ie)}`,$n=rt.isInactive24h?me.colors.status.CRITICAL:S.health_status==="OFFLINE"?me.colors.status.OFFLINE:Ie<180?me.colors.status.NORMAL:me.colors.status.WARNING,yo=S.health_status==="NORMAL"?"Online":S.health_status==="WARNING"?"Atenção":S.health_status==="CRITICAL"?"Crítico":"Offline";return a.jsxs(D1,{type:"button",$selected:A,$inact:rt.isInactive24h,$prnOk:!!S.spooler_running,onClick:()=>{D(S.id),q("FOCUS")},children:[a.jsxs("div",{className:"n-top",children:[a.jsxs("span",{className:"n-sector",children:[a.jsx(pp,{$color:Q}),S.sector_code]}),a.jsx("span",{children:yo})]}),a.jsxs("div",{className:"n-host",children:[a.jsx("span",{children:S.hostname}),a.jsx("span",{className:"n-prn",title:S.spooler_running?"Spooler de impressão ativo":"Spooler de impressão parado",children:a.jsx(ch,{size:13})})]}),a.jsxs("div",{className:"n-metrics",children:["CPU ",$.toFixed(0),"% · RAM ",de.toFixed(0),"% · ",S.ip_address]}),a.jsxs("div",{className:"n-activity",style:{color:$n},children:[rt.isInactive24h&&a.jsx(Bu,{size:12}),a.jsx("span",{children:Gn})]}),a.jsxs("div",{className:"n-bars",children:[a.jsx("div",{className:"bar-track",title:`CPU: ${$.toFixed(0)}%`,children:a.jsx("i",{style:{width:`${$}%`,background:me.colors.status.NORMAL}})}),a.jsx("div",{className:"bar-track",title:`RAM: ${de.toFixed(0)}%`,children:a.jsx("i",{style:{width:`${de}%`,background:me.colors.brandPrimaryLight}})}),a.jsx("div",{className:"bar-track",title:`Disco: ${Ve.toFixed(0)}%`,children:a.jsx("i",{style:{width:`${Ve}%`,background:me.colors.status.OFFLINE}})})]})]},S.id)})]})]})]})]}),a.jsx(f1,{isOpen:Y.isOpen,initialMode:Y.mode,units:m,activeUnit:Oe,targetSector:Y.targetSector,machines:_,onClose:Pt,onCreateUnit:Gt,onUpdateUnit:Jt,onDeleteUnit:G,onCreateSector:nt,onUpdateSector:vn,onDeleteSector:Pr}),d.open&&a.jsx(B1,{onClick:()=>!d.busy&&p({open:!1,busy:!1,resultMsg:""}),children:a.jsxs(U1,{onClick:S=>S.stopPropagation(),role:"dialog","aria-modal":"true",children:[a.jsx("h3",{children:"Confirmar atualização global de agentes"}),a.jsxs("p",{children:["Esta operação enviará ordem de atualização silenciosa (com verificação obrigatória SHA-256) para todas as ",a.jsxs("strong",{children:[He.total," estação(ões)"]})," cadastradas no painel."]}),d.resultMsg&&a.jsx("div",{className:"modal-result",children:d.resultMsg}),a.jsxs("div",{className:"modal-actions",children:[a.jsx(V1,{type:"button",disabled:d.busy,onClick:()=>p({open:!1,busy:!1,resultMsg:""}),children:d.resultMsg?"Fechar":"Cancelar"}),!d.resultMsg&&a.jsx(H1,{type:"button",disabled:d.busy,onClick:Vn,children:d.busy?"Enviando...":"Confirmar atualização"})]})]})})]})}mg.createRoot(document.getElementById("root")).render(a.jsx(Rt.StrictMode,{children:a.jsx(G1,{})}));export{N0 as E,Y1 as S,Ou as a,_u as b,ig as c,mg as d,we as f,T as g,a as j,R as r};
