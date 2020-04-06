var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function l(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function a(t,e){t.appendChild(e)}function s(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function i(t){return document.createTextNode(t)}function f(){return i(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function p(t){return""===t?void 0:+t}function h(t,e){e=""+e,t.data!==e&&(t.data=e)}function g(t,e){(null!=e||t.value)&&(t.value=e)}let v;function b(t){v=t}const $=[],_=[],y=[],k=[],x=Promise.resolve();let C=!1;function E(t){y.push(t)}let w=!1;const M=new Set;function N(){if(!w){w=!0;do{for(let t=0;t<$.length;t+=1){const e=$[t];b(e),S(e.$$)}for($.length=0;_.length;)_.pop()();for(let t=0;t<y.length;t+=1){const e=y[t];M.has(e)||(M.add(e),e())}y.length=0}while($.length);for(;k.length;)k.pop()();C=!1,w=!1,M.clear()}}function S(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(E)}}const A=new Set;function O(t,e){-1===t.$$.dirty[0]&&($.push(t),C||(C=!0,x.then(N)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function P(l,a,s,c,i,f,d=[-1]){const m=v;b(l);const p=a.props||{},h=l.$$={fragment:null,ctx:null,props:f,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(m?m.$$.context:[]),callbacks:n(),dirty:d};let g=!1;if(h.ctx=s?s(l,p,(t,e,...n)=>{const o=n.length?n[0]:e;return h.ctx&&i(h.ctx[t],h.ctx[t]=o)&&(h.bound[t]&&h.bound[t](o),g&&O(l,t)),e}):[],h.update(),g=!0,o(h.before_update),h.fragment=!!c&&c(h.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);h.fragment&&h.fragment.l(t),t.forEach(u)}else h.fragment&&h.fragment.c();a.intro&&(($=l.$$.fragment)&&$.i&&(A.delete($),$.i(_))),function(t,n,l){const{fragment:a,on_mount:s,on_destroy:u,after_update:c}=t.$$;a&&a.m(n,l),E(()=>{const n=s.map(e).filter(r);u?u.push(...n):o(n),t.$$.on_mount=[]}),c.forEach(E)}(l,a.target,a.anchor),N()}var $,_;b(m)}function T(t){let e,n,o,r,l;return{c(){e=c("label"),n=f(),o=c("div"),r=i(t[2]),l=i(" Gold Transmit Stones"),m(e,"for","goldStones"),m(o,"class","gold svelte-1771nlk"),m(o,"id","goldStones")},m(t,u){s(t,e,u),s(t,n,u),s(t,o,u),a(o,r),a(o,l)},p(t,e){4&e&&h(r,t[2])},d(t){t&&u(e),t&&u(n),t&&u(o)}}}function B(e){let n,r,l,p,v,b,$,_,y,k,x,C,E,w,M,N,S,A,O,P,B,j,q,H,z,D,F,I,J,K,Q,R,U,V,W,X,Y,Z,tt,et,nt,ot=!1,rt=!1;function lt(){ot=!0,e[7].call(A)}function at(){rt=!0,e[8].call(q)}let st="banner"==e[3]&&T(e);return{c(){n=c("div"),r=c("div"),r.innerHTML='<h4 class="hero-heading title svelte-1771nlk">Epic Seven Guaranteed Summon Calculator</h4>',l=f(),p=c("div"),v=c("form"),b=c("label"),b.textContent="Type:",$=f(),_=c("input"),y=f(),k=c("span"),k.textContent="Banner",x=f(),C=c("input"),E=f(),w=c("span"),w.textContent="Mystic",M=f(),N=c("label"),N.textContent="Current Gems:",S=f(),A=c("input"),P=f(),B=c("label"),B.textContent="Current Bookmarks:",j=f(),q=c("input"),H=f(),z=c("div"),D=i(e[1]),F=i(" of "),I=i(L),J=i(" summons ("),K=i(G),Q=i("%)"),R=f(),U=c("div"),V=c("label"),V.textContent="Progress:",W=f(),X=c("progress"),Y=i(G),Z=i("%"),et=f(),st&&st.c(),m(r,"class","row"),m(_,"type","radio"),_.__value="banner",_.value=_.__value,m(_,"class","svelte-1771nlk"),e[5][0].push(_),m(k,"class","label-body"),m(C,"type","radio"),C.__value="mystic",C.value=C.__value,m(C,"class","svelte-1771nlk"),e[5][0].push(C),m(w,"class","label-body"),m(N,"for","gems"),m(A,"type","number"),m(A,"min","0"),m(A,"max","99999"),A.disabled=O="mystic"==e[3],m(A,"class","svelte-1771nlk"),m(B,"for","gems"),m(q,"type","number"),m(q,"min","0"),m(q,"max","99999"),m(q,"class","svelte-1771nlk"),m(p,"class","row"),m(z,"class","summons svelte-1771nlk"),m(V,"for","summonProgress"),m(X,"id","summonProgress"),X.value=tt=e[1]||0,m(X,"max",L),m(n,"class","container main svelte-1771nlk")},m(t,u,c){s(t,n,u),a(n,r),a(n,l),a(n,p),a(p,v),a(v,b),a(v,$),a(v,_),_.checked=_.__value===e[3],a(v,y),a(v,k),a(v,x),a(v,C),C.checked=C.__value===e[3],a(v,E),a(v,w),a(v,M),a(v,N),a(v,S),a(v,A),g(A,e[0].gems),a(v,P),a(v,B),a(v,j),a(v,q),g(q,e[0].bookmarks),a(n,H),a(n,z),a(z,D),a(z,F),a(z,I),a(z,J),a(z,K),a(z,Q),a(n,R),a(n,U),a(U,V),a(U,W),a(U,X),a(X,Y),a(X,Z),a(n,et),st&&st.m(n,null),c&&o(nt),nt=[d(_,"change",e[4]),d(C,"change",e[6]),d(A,"input",lt),d(q,"input",at)]},p(t,[e]){8&e&&(_.checked=_.__value===t[3]),8&e&&(C.checked=C.__value===t[3]),8&e&&O!==(O="mystic"==t[3])&&(A.disabled=O),!ot&&1&e&&g(A,t[0].gems),ot=!1,!rt&&1&e&&g(q,t[0].bookmarks),rt=!1,2&e&&h(D,t[1]),2&e&&tt!==(tt=t[1]||0)&&(X.value=tt),"banner"==t[3]?st?st.p(t,e):(st=T(t),st.c(),st.m(n,null)):st&&(st.d(1),st=null)},i:t,o:t,d(t){t&&u(n),e[5][0].splice(e[5][0].indexOf(_),1),e[5][0].splice(e[5][0].indexOf(C),1),st&&st.d(),o(nt)}}}let G=0,L=120;function j(t,e,n){let o,r,l={gems:0,bookmarks:0},a="banner";return t.$$.update=()=>{11&t.$$.dirty&&("mystic"==a?(n(0,l.gems=0,l),n(1,o=Math.floor(l.bookmarks/50))):"banner"==a&&(n(1,o=Math.floor(l.gems/95)+Math.floor(l.bookmarks/5)),n(2,r=Math.floor(o/20)))),2&t.$$.dirty&&isNaN(o)&&n(1,o=0),4&t.$$.dirty&&isNaN(r)&&n(2,r=0)},[l,o,r,a,function(){a=this.__value,n(3,a)},[[]],function(){a=this.__value,n(3,a)},function(){l.gems=p(this.value),n(0,l),n(3,a),n(1,o)},function(){l.bookmarks=p(this.value),n(0,l),n(3,a),n(1,o)}]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}{constructor(t){super(),P(this,t,j,B,l,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
