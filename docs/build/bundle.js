var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function i(t){return document.createTextNode(t)}function f(){return i(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t,e){e=""+e,t.data!==e&&(t.data=e)}function h(t,e){(null!=e||t.value)&&(t.value=e)}let g;function v(t){g=t}const b=[],y=[],$=[],_=[],x=Promise.resolve();let k=!1;function C(t){$.push(t)}let E=!1;const M=new Set;function w(){if(!E){E=!0;do{for(let t=0;t<b.length;t+=1){const e=b[t];v(e),S(e.$$)}for(b.length=0;y.length;)y.pop()();for(let t=0;t<$.length;t+=1){const e=$[t];M.has(e)||(M.add(e),e())}$.length=0}while(b.length);for(;_.length;)_.pop()();k=!1,E=!1,M.clear()}}function S(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const A=new Set;function O(t,e){-1===t.$$.dirty[0]&&(b.push(t),k||(k=!0,x.then(w)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function P(a,s,u,c,i,f,d=[-1]){const m=g;v(a);const p=s.props||{},h=a.$$={fragment:null,ctx:null,props:f,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:n(),dirty:d};let b=!1;if(h.ctx=u?u(a,p,(t,e,...n)=>{const o=n.length?n[0]:e;return h.ctx&&i(h.ctx[t],h.ctx[t]=o)&&(h.bound[t]&&h.bound[t](o),b&&O(a,t)),e}):[],h.update(),b=!0,o(h.before_update),h.fragment=!!c&&c(h.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);h.fragment&&h.fragment.l(t),t.forEach(l)}else h.fragment&&h.fragment.c();s.intro&&((y=a.$$.fragment)&&y.i&&(A.delete(y),y.i($))),function(t,n,a){const{fragment:s,on_mount:u,on_destroy:l,after_update:c}=t.$$;s&&s.m(n,a),C(()=>{const n=u.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]}),c.forEach(C)}(a,s.target,s.anchor),w()}var y,$;v(m)}function T(t){let e,n,o,r,a;return{c(){e=c("label"),n=f(),o=c("div"),r=i(t[2]),a=i(" Gold Transmit Stones"),m(e,"for","goldStones"),m(o,"id","goldStones")},m(t,l){u(t,e,l),u(t,n,l),u(t,o,l),s(o,r),s(o,a)},p(t,e){4&e&&p(r,t[2])},d(t){t&&l(e),t&&l(n),t&&l(o)}}}function B(e){let n,r,a,g,v,b,y,$,_,x,k,C,E,M,w,S,A,O,P,B,L,N,j,q,H,z,D,F,I,J,K,Q,R,U,V,W,X,Y,Z,tt,et="banner"==e[4]&&T(e);return{c(){n=c("div"),r=c("div"),r.innerHTML='<h2 class="hero-heading">Epic Seven Guaranteed Summon Calculator</h2>',a=f(),g=c("div"),v=c("form"),b=c("label"),b.textContent="Type:",y=f(),$=c("input"),_=f(),x=c("span"),x.textContent="Banner",k=f(),C=c("input"),E=f(),M=c("span"),M.textContent="Mystic",w=f(),S=c("label"),S.textContent="Current Gems:",A=f(),O=c("input"),B=f(),L=c("label"),L.textContent="Current Bookmarks:",N=f(),j=c("input"),q=f(),H=c("div"),z=i(e[1]),D=i(" of "),F=i(G),I=i(" summons ("),J=i(e[3]),K=i("%)"),Q=f(),R=c("div"),U=c("label"),U.textContent="Progress:",V=f(),W=c("progress"),X=i(e[3]),Y=i("%"),Z=f(),et&&et.c(),m(r,"class","row"),m($,"type","radio"),$.__value="banner",$.value=$.__value,m($,"class","svelte-13y42o8"),e[6][0].push($),m(x,"class","label-body"),m(C,"type","radio"),C.__value="mystic",C.value=C.__value,m(C,"class","svelte-13y42o8"),e[6][0].push(C),m(M,"class","label-body"),m(S,"for","gems"),m(O,"type","text"),O.autofocus=!0,O.disabled=P="mystic"==e[4],m(O,"class","svelte-13y42o8"),m(L,"for","gems"),m(j,"type","text"),m(j,"class","svelte-13y42o8"),m(g,"class","row"),m(U,"for","summonProgress"),m(W,"id","summonProgress"),W.value=e[1],m(W,"max",G),m(n,"class","container main svelte-13y42o8")},m(t,l,c){u(t,n,l),s(n,r),s(n,a),s(n,g),s(g,v),s(v,b),s(v,y),s(v,$),$.checked=$.__value===e[4],s(v,_),s(v,x),s(v,k),s(v,C),C.checked=C.__value===e[4],s(v,E),s(v,M),s(v,w),s(v,S),s(v,A),s(v,O),h(O,e[0].gems),s(v,B),s(v,L),s(v,N),s(v,j),h(j,e[0].bookmarks),s(n,q),s(n,H),s(H,z),s(H,D),s(H,F),s(H,I),s(H,J),s(H,K),s(n,Q),s(n,R),s(R,U),s(R,V),s(R,W),s(W,X),s(W,Y),s(n,Z),et&&et.m(n,null),O.focus(),c&&o(tt),tt=[d($,"change",e[5]),d(C,"change",e[7]),d(O,"input",e[8]),d(j,"input",e[9])]},p(t,[e]){16&e&&($.checked=$.__value===t[4]),16&e&&(C.checked=C.__value===t[4]),16&e&&P!==(P="mystic"==t[4])&&(O.disabled=P),1&e&&O.value!==t[0].gems&&h(O,t[0].gems),1&e&&j.value!==t[0].bookmarks&&h(j,t[0].bookmarks),2&e&&p(z,t[1]),8&e&&p(J,t[3]),8&e&&p(X,t[3]),2&e&&(W.value=t[1]),"banner"==t[4]?et?et.p(t,e):(et=T(t),et.c(),et.m(n,null)):et&&(et.d(1),et=null)},i:t,o:t,d(t){t&&l(n),e[6][0].splice(e[6][0].indexOf($),1),e[6][0].splice(e[6][0].indexOf(C),1),et&&et.d(),o(tt)}}}let G=120;function L(t,e,n){let o,r,a,s={gems:0,bookmarks:0},u="banner";return t.$$.update=()=>{19&t.$$.dirty&&("mystic"==u?(n(0,s.gems=0,s),n(1,o=Math.floor(s.bookmarks/50))):"banner"==u&&(n(1,o=Math.floor(s.gems/95)+Math.floor(s.bookmarks/5)),n(2,r=Math.floor(o/20)))),2&t.$$.dirty&&n(3,a=Math.round(o/G*100))},[s,o,r,a,u,function(){u=this.__value,n(4,u)},[[]],function(){u=this.__value,n(4,u)},function(){s.gems=this.value,n(0,s),n(4,u),n(1,o)},function(){s.bookmarks=this.value,n(0,s),n(4,u),n(1,o)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),P(this,t,L,B,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
