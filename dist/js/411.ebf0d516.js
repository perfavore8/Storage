"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[411],{8138:function(e,t,a){a.d(t,{Z:function(){return d}});var s=a(3396),l=a(7139);const r={class:"text"},o=["placeholder","value"];function n(e,t,a,n,i,c){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("input",{type:"text",class:(0,l.C_)(a.underlined?"input_uderline":"input"),placeholder:a.placeholder,value:a.inputValue,onInput:t[0]||(t[0]=t=>e.$emit("update:inputValue",t.target.value))},null,42,o)])}var i={props:{inputValue:{type:String,required:!1},placeholder:{type:String,required:!1},underlined:{type:Boolean,required:!1}},setup(){}},c=a(89);const u=(0,c.Z)(i,[["render",n],["__scopeId","data-v-4edccb44"]]);var d=u},1725:function(e,t,a){a.d(t,{Z:function(){return d}});var s=a(3396),l=a(7139);const r={class:"grid gap-3"},o={class:"current d"};function n(e,t,a,n,i,c){return(0,s.wg)(),(0,s.iD)("div",r,[a.page.current!=a.page.first&&null!=a.page.prev?((0,s.wg)(),(0,s.iD)("button",{key:0,onClick:t[0]||(t[0]=e=>n.prev()),class:"a"},(0,l.zw)("<"))):(0,s.kq)("",!0),a.page.current!=a.page.first&&a.page.prev!=a.page.first?((0,s.wg)(),(0,s.iD)("button",{key:1,onClick:t[1]||(t[1]=e=>n.first()),class:"b"},(0,l.zw)(a.page.first),1)):(0,s.kq)("",!0),a.page.current!=a.page.first&&null!=a.page.prev?((0,s.wg)(),(0,s.iD)("button",{key:2,onClick:t[2]||(t[2]=e=>n.prev()),class:"c"},(0,l.zw)(a.page.prev),1)):(0,s.kq)("",!0),(0,s._)("button",o,(0,l.zw)(a.page.current),1),a.page.current!=a.page.last&&null!=a.page.next?((0,s.wg)(),(0,s.iD)("button",{key:3,onClick:t[3]||(t[3]=e=>n.next()),class:"e"},(0,l.zw)(a.page.next),1)):(0,s.kq)("",!0),a.page.current!=a.page.last&&a.page.next!=a.page.last?((0,s.wg)(),(0,s.iD)("button",{key:4,onClick:t[4]||(t[4]=e=>n.last()),class:"f"},(0,l.zw)(a.page.last),1)):(0,s.kq)("",!0),a.page.current!=a.page.last&&null!=a.page.next?((0,s.wg)(),(0,s.iD)("button",{key:5,onClick:t[5]||(t[5]=e=>n.next()),class:"g"},(0,l.zw)(">"))):(0,s.kq)("",!0)])}var i={props:{page:Object},emits:{changePage(e){return e>0&&"number"===typeof e}},setup(e,t){const a=()=>t.emit("changePage",e.page.first),s=()=>t.emit("changePage",e.page.current-1),l=()=>t.emit("changePage",e.page.current+1),r=()=>t.emit("changePage",e.page.last);return{prev:s,first:a,next:l,last:r}}},c=a(89);const u=(0,c.Z)(i,[["render",n],["__scopeId","data-v-30638d00"]]);var d=u},8697:function(e,t,a){a.d(t,{Z:function(){return d}});var s=a(3396),l=a(7139);function r(e,t,a,r,o,n){const i=(0,s.up)("AppPaginator"),c=(0,s.up)("selector-vue");return a.show?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,l.C_)(["bottom",{blur:a.blur}])},[a.showBtns?((0,s.wg)(),(0,s.j4)(i,{key:0,page:a.page,onChangePage:n.changePage},null,8,["page","onChangePage"])):(0,s.kq)("",!0),a.showSelector?((0,s.wg)(),(0,s.j4)(c,{key:1,class:"count",options_props:o.count_values,selected_option:{name:a.count,value:-1},onSelect:n.change_count},null,8,["options_props","selected_option","onSelect"])):(0,s.kq)("",!0)],2)):(0,s.kq)("",!0)}var o=a(7720),n=a(1725),i={components:{SelectorVue:o.Z,AppPaginator:n.Z},props:{previous:{type:Boolean,required:!1},next:{type:Boolean,required:!1},page:{type:Object,required:!1,default(){return{first:1,prev:null,current:1,next:null,last:1}}},count:{type:Number,required:!0},blur:{type:Boolean,required:!1,default:!1},show:{type:Boolean,required:!1,default:!0},showBtns:{type:Boolean,required:!1,default:!0},showSelector:{type:Boolean,required:!1,default:!0}},emits:{changePage:null,changeCount:null},data(){return{count_values:[]}},async mounted(){await this.$store.dispatch("get_account"),this.$store.state.account.user.config.per_pages&&(this.count_values=[...this.$store.state.account.user.config.per_pages].map(((e,t)=>({name:e,value:t}))))},computed:{},methods:{changePage(e){this.$emit("changePage",e)},change_count(e){this.$emit("changeCount",e.name)}}},c=a(89);const u=(0,c.Z)(i,[["render",r],["__scopeId","data-v-53e878de"]]);var d=u},7720:function(e,t,a){a.d(t,{Z:function(){return f}});var s=a(3396),l=a(7139),r=a(9242);const o={class:"v-select"},n=["tabindex"],i={class:"options",key:"a1"},c=["onClick"],u={key:0,class:"material-icons-outlined opacity-50"};function d(e,t,a,d,p,g){return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",{class:(0,l.C_)(["title",{title_checked:d.show_options,disabled:a.disabled}]),onClick:t[0]||(t[0]=e=>d.open_close_options()),onFocusout:t[1]||(t[1]=(...e)=>d.handleFocusOut&&d.handleFocusOut(...e)),tabindex:a.disabled?-1:0},[(0,s._)("p",null,(0,l.zw)(a.selected_option.name),1),a.disabled?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,l.C_)(["arrow",{rotate_arrow:d.show_options}])},null,2))],42,n),(0,s.Wm)(r.uT,{name:"list"},{default:(0,s.w5)((()=>[d.show_options?((0,s.wg)(),(0,s.iD)("div",i,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(d.options,(e=>((0,s.wg)(),(0,s.iD)("p",{key:e.value,class:(0,l.C_)({optgroup:"optgroup"===e.value,selected:e.value==a.selected_option.value}),style:(0,l.j5)({backgroundColor:e.color}),onClick:t=>d.select_option(e)},[e.value==a.selected_option.value&&e.color?((0,s.wg)(),(0,s.iD)("span",u," check ")):(0,s.kq)("",!0),e.optgroup?((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s.Uk)("     "+(0,l.zw)(e.name),1)],64)):((0,s.wg)(),(0,s.iD)(s.HY,{key:2},[(0,s.Uk)((0,l.zw)(e.name),1)],64))],14,c)))),128))])):(0,s.kq)("",!0)])),_:1})])}var p=a(4870),g={props:{options_props:{type:Array,default(){return[]},required:!0},selected_option:{type:Object,required:!0,default(){return{}}},disabled:{type:Boolean,required:!1,default:!1},idx:{type:Number,required:!1}},emits:{select:null},setup(e,{emit:t}){const a=(0,p.iH)([]);(0,s.bv)((()=>{(0,s.Y3)((()=>{l()}))}));const l=()=>{a.value=[],e.options_props?.forEach((e=>a.value.push(e)))};(0,s.YP)((()=>e.options_props),(()=>{l()}),{deep:!0});const r=(0,p.iH)(!1),o=()=>{r.value=!1},n=()=>{e.disabled||(r.value=!r.value)},i=()=>{o()},c=a=>{"optgroup"!=a.value&&(t("select",a,e.idx),o())};return{open_close_options:n,handleFocusOut:i,show_options:r,options:a,select_option:c}}},h=a(89);const w=(0,h.Z)(g,[["render",d],["__scopeId","data-v-4c3530ea"]]);var f=w},411:function(e,t,a){a.r(t),a.d(t,{default:function(){return ye}});var s=a(3396),l=a(7139);const r=e=>((0,s.dD)("data-v-2fd34d30"),e=e(),(0,s.Cn)(),e),o={class:"wrapper p-6 w-screen"},n={class:"header flex flex-row justify-between items-center pb-8 mb-8 border-b border-solid border-slate-200/70"},i={class:"left flex flex-col items-start"},c={class:"text-2xl text-gray-900 font-semibold"},u=r((()=>(0,s._)("div",{class:"right"},[(0,s._)("button",{class:"btn btn_blue flex gap-2 !py-2 !h-10"},[(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},[(0,s._)("path",{fill:"currentColor",d:"M21 14h-6a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2zm-3 3a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3m0-2C6.236 4 4 6.238 4 9s2.236 5 5 5s5-2.238 5-5s-2.236-5-5-5zm0 13c2.021 0 3.301.771 3.783 1.445C12.1 18.705 10.814 19 9 19c-1.984 0-3.206-.305-3.818-.542C5.641 17.743 6.959 17 9 17m0-2c-3.75 0-6 2-6 4c0 1 2.25 2 6 2c3.518 0 6-1 6-2c0-2-2.354-4-6-4z"})]),(0,s.Uk)(" Добавить ")])],-1))),d={class:"main flex flex-col gap-8"};function p(e,t,a,r,p,g){const h=(0,s.up)("AppBreadcrumb"),w=(0,s.up)("UsersActivity"),f=(0,s.up)("UsersListTable");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",n,[(0,s._)("div",i,[(0,s.Wm)(h,{pages:r.pages},null,8,["pages"]),(0,s._)("h1",c,(0,l.zw)(r.forTitle?.text),1)]),u]),(0,s._)("div",d,[(0,s.Wm)(w,{list:r.usersActivity},null,8,["list"]),(0,s.Wm)(f)])])}const g={role:"list",class:"flex items-center gap-4"},h={key:0},w=["onClick"];function f(e,t,a,r,o,n){return(0,s.wg)(),(0,s.iD)("ol",g,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.pages,((e,t)=>((0,s.wg)(),(0,s.iD)("li",{key:e.id},[(0,s._)("div",{class:(0,l.C_)(["hover:text-gray-700 font-medium text-sm flex items-center",[0===t?"text-gray-400":t===a.pages.length-1?"text-gray-700":"text-gray-500",{"hover:text-gray-500":e.disable}]])},[0!==t?((0,s.wg)(),(0,s.iD)("span",h,"/")):(0,s.kq)("",!0),(0,s._)("a",{"aria-current":"page",style:{"line-height":"0"},class:(0,l.C_)({"ml-4":0!==t,"cursor-pointer":t!==a.pages.length-1,"cursor-default":e.disable}),ref_for:!0,ref:e=>r.linkRefs[t]=e,onClick:t=>e.disable?null:e.select()},null,10,w)],2)])))),128))])}var v=a(4870),m={props:{pages:{type:Array,required:!0}},setup(e){(0,s.bv)((()=>{e.pages.forEach(((e,a)=>t[a].innerHTML=e.text))}));const t=(0,v.qj)([]);return{linkRefs:t}}},x=a(89);const b=(0,x.Z)(m,[["render",f]]);var _=b,y=a(678);const k=e=>((0,s.dD)("data-v-7dccb50b"),e=e(),(0,s.Cn)(),e),C={class:"list flex flex-row flex-wrap gap-6"},D={class:"header mb-2"},q={class:"text-xs text-gray-400 font-semibold"},Z={class:"flex justify-between items-center gap-1"},z={class:"text-sm text-slate-500"},j={class:"text-3xl test-slate-800 font-semibold"},B={class:"stat"},L={class:"inline-flex flex-row gap-1 items-center"},M={key:0,xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24"},A=k((()=>(0,s._)("g",{fill:"currentColor"},[(0,s._)("path",{d:"M7.53 9.47a.75.75 0 0 0-1.06 1.06l2.293 2.293a1.75 1.75 0 0 0 2.474 0l1.586-1.586a.25.25 0 0 1 .354 0l2.012 2.013H14.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-1.5 0v.69l-2.013-2.013a1.75 1.75 0 0 0-2.474 0l-1.586 1.586a.25.25 0 0 1-.354 0L7.53 9.47Z"}),(0,s._)("path",{"fill-rule":"evenodd",d:"M11.943 1.25c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19h-.114ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z","clip-rule":"evenodd"})],-1))),U=[A],H={key:1,xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24"},P=k((()=>(0,s._)("g",{fill:"currentColor"},[(0,s._)("path",{d:"M13.75 10c0 .414.336.75.75.75h.69l-2.013 2.013a.25.25 0 0 1-.354 0l-1.586-1.586a1.75 1.75 0 0 0-2.474 0L6.47 13.47a.75.75 0 1 0 1.06 1.06l2.293-2.293a.25.25 0 0 1 .354 0l1.586 1.586a1.75 1.75 0 0 0 2.474 0l2.013-2.012v.689a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75Z"}),(0,s._)("path",{"fill-rule":"evenodd",d:"M11.943 1.25c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19h-.114ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z","clip-rule":"evenodd"})],-1))),E=[P];function N(e,t,a,r,o,n){return(0,s.wg)(),(0,s.iD)("div",C,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.list,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{key:e.id,class:"card grow w-fit p-5 flex flex-col bg-white rounded-xl border border-solid border-slate-200/70 shadow-lg shadow-gray-400/10"},[(0,s._)("div",D,[(0,s._)("h2",q,(0,l.zw)(e.header),1)]),(0,s._)("div",Z,[(0,s._)("div",{class:"text",ref_for:!0,ref:e=>r.textRefs[t]=e},[(0,s._)("span",z,[(0,s._)("span",j,(0,l.zw)(e.firstNumber),1),(0,s.Uk)(" из "+(0,l.zw)(e.secondNumber),1)])],512),(0,s._)("div",B,[e.stat?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,l.C_)(["p-1 text-[10px] rounded flex items-center font-bold",{"bg-green-50 text-green-700":1===e.stat.direction,"bg-red-50 text-red-700":0===e.stat.direction,"bg-gray-100 text-gray-600":2===e.stat.direction}])},[(0,s._)("span",L,[0===e.stat?.direction?((0,s.wg)(),(0,s.iD)("svg",M,U)):1===e.stat?.direction?((0,s.wg)(),(0,s.iD)("svg",H,E)):(0,s.kq)("",!0),(0,s.Uk)(" "+(0,l.zw)(e.stat?.text),1)])],2)):(0,s.kq)("",!0)])])])))),128))])}var T={props:{list:{type:Array,required:!1}},setup(e){(0,s.bv)((()=>{e.list.forEach(((e,a)=>e.needInsertTest?t[a].innerHTML=e.text:null))}));const t=(0,v.qj)([]);return{textRefs:t}}};const I=(0,x.Z)(T,[["render",N],["__scopeId","data-v-7dccb50b"]]);var V=I,R=a(9299);const S=e=>((0,s.dD)("data-v-524e7681"),e=e(),(0,s.Cn)(),e),F={class:"wrapper divide-y divide-slate-200/70 rounded-xl border border-solid border-slate-200/70 shadow-lg shadow-gray-400/10"},Y={class:"filters px-5 py-4 flex flex-row gap-2 justify-between items-center"},W={class:"left"},O={class:"search w-full relative"},K=S((()=>(0,s._)("span",{class:"material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"}," search ",-1))),$=S((()=>(0,s._)("div",{class:"right"},[(0,s._)("button",{class:"export btn order-1 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"},[(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"18",viewBox:"0 0 24 24"},[(0,s._)("path",{fill:"currentColor",d:"M8.71 7.71L11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42ZM21 14a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1Z"})]),(0,s.Uk)(" Экспорт ")])],-1))),G={class:"main"},J={class:"w-full text-slate-500"},Q={class:"bg-slate-50 border-y border-solid border-slate-200/70"},X=S((()=>(0,s._)("th",null,[(0,s._)("input",{type:"checkbox",class:"checkbox",id:"rowid"}),(0,s._)("label",{for:"rowid"})],-1))),ee=S((()=>(0,s._)("th",null,null,-1))),te=["id"],ae=["for"],se={key:0,class:"w-fit h-full flex flex-row gap-4 items-center"},le={class:"flex flex-col"},re={class:"text-gray-900 font-semibold"},oe={key:1,class:"w-fit h-full flex flex-row gap-4 items-center"},ne=S((()=>(0,s._)("td",null,[(0,s._)("button",{class:"export btn order-1 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"},[(0,s._)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24"},[(0,s._)("path",{fill:"currentColor",d:"m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"})]),(0,s.Uk)(" Редактировать ")])],-1))),ie={class:"pagination p-5 flex justify-between items-center"},ce={class:"left flex flex-row gap-1 items-center text-slate-500"},ue=(0,s.Uk)(" Показывать: "),de={class:"right"};function pe(e,t,a,r,o,n){const i=(0,s.up)("AppInput"),c=(0,s.up)("GridBottom"),u=(0,s.up)("AppPaginator");return(0,s.wg)(),(0,s.iD)("div",F,[(0,s._)("div",Y,[(0,s._)("div",W,[(0,s._)("div",O,[(0,s.Wm)(i,{inputValue:e.searchValue,"onUpdate:inputValue":t[0]||(t[0]=t=>e.searchValue=t),placeholder:"Поиск пользователей",underlined:!0},null,8,["inputValue"]),K])]),$]),(0,s._)("div",G,[(0,s._)("table",J,[(0,s._)("thead",Q,[(0,s._)("tr",null,[X,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.titiles,(e=>((0,s.wg)(),(0,s.iD)("th",{key:e.code},(0,l.zw)(e.name),1)))),128)),ee])]),(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.users,(e=>((0,s.wg)(),(0,s.iD)("tr",{key:e.id},[(0,s._)("td",null,[(0,s._)("input",{type:"checkbox",class:"checkbox",id:e.id},null,8,te),(0,s._)("label",{for:e.id},null,8,ae)]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.titiles,(t=>((0,s.wg)(),(0,s.iD)("td",{key:t.code},["name"===t.code?((0,s.wg)(),(0,s.iD)("div",se,[(0,s._)("div",{class:"h-10 w-10 rounded-full flex justify-center items-center font-semibold text-xl",style:(0,l.j5)({backgroundColor:e.color+"20",color:e.color})},(0,l.zw)(r.firstLetter(e.name)),5),(0,s._)("div",le,[(0,s._)("h3",re,(0,l.zw)(e.name),1),(0,s._)("span",null,(0,l.zw)(e.email),1)])])):"status"===t.code?((0,s.wg)(),(0,s.iD)("div",oe,[(0,s._)("div",{class:"w-4 h-4 rounded-full flex items-center justify-center",style:(0,l.j5)({"background-color":(2===e.status?"#4ade80":1===e.status?"#6b7280":"#fb7185")+"50"})},[(0,s._)("div",{class:"w-2 h-2 rounded-full",style:(0,l.j5)({"background-color":(2===e.status?"#4ade80":1===e.status?"#6b7280":"#fb7185")+"99"})},null,4)],4),(0,s.Uk)(" "+(0,l.zw)(2===e.status?"В сети":1===e.status?"Отошел":"Не в сети"),1)])):((0,s.wg)(),(0,s.iD)(s.HY,{key:2},[(0,s.Uk)((0,l.zw)(e[t.code]),1)],64))])))),128)),ne])))),128))])])]),(0,s._)("div",ie,[(0,s._)("div",ce,[ue,(0,s.Wm)(c,{count:20,showBtns:!1,onChangeCount:e=>null,class:"!my-0 mr-2"}),(0,s.Uk)(" из "+(0,l.zw)(r.page.total),1)]),(0,s._)("div",de,[(0,s.Wm)(u,{page:r.page},null,8,["page"])])])])}var ge=a(8138),he=a(8697),we=a(1725);function fe(){function e(){for(var e="0123456789ABCDEF",t="#",a=0;a<6;a++)t+=e[Math.floor(16*Math.random())];return t}function t(){for(var e="0123456789ABCD",t="#",a=0;a<6;a++)t+=e[Math.floor(14*Math.random())];return t}return{getRandomColor:e,getRandomColor2:t}}var ve={components:{AppInput:ge.Z,GridBottom:he.Z,AppPaginator:we.Z},setup(){const{getRandomColor2:e}=fe(),t=(0,v.qj)({total:50,first:1,prev:null,current:1,next:2,last:3}),a=(0,v.qj)([{name:"Имя",code:"name"},{name:"Группа",code:"group"},{name:"Роль",code:"role"},{name:"Статус",code:"status"}]),l=(0,v.qj)([{id:0,name:"Ella Lauda",email:"amanda@site.com",group:"Москва",role:"Пользователь",status:2,color:(0,s.Fl)((()=>e().toLocaleLowerCase()))},{id:1,name:"John Doe",email:"john.doe@example.com",group:"Москва",role:"Администратор",status:2,color:(0,s.Fl)((()=>e().toLocaleLowerCase()))},{id:2,name:"Jane Smith",email:"jane.smith@example.com",group:"СПБ",role:"Пользователь",status:0,color:(0,s.Fl)((()=>e().toLocaleLowerCase()))},{id:3,name:"Michael Johnson",email:"michael.johnson@example.com",group:"СПБ",role:"Пользователь",status:1,color:(0,s.Fl)((()=>e().toLocaleLowerCase()))},{id:4,name:"Emily Wilson",email:"emily.wilson@example.com",group:"СПБ",role:"Пользователь",status:0,color:(0,s.Fl)((()=>e().toLocaleLowerCase()))}]),r=e=>e[0].toLocaleUpperCase();return{page:t,titiles:a,users:l,getRandomColor2:e,firstLetter:r}}};const me=(0,x.Z)(ve,[["render",pe],["__scopeId","data-v-524e7681"]]);var xe=me,be={components:{AppBreadcrumb:_,UsersActivity:V,UsersListTable:xe},setup(){const e=(0,y.tv)(),t=(0,v.qj)([{id:1,text:"<span class='material-icons-round' style='font-size: 20px'>home</span>",select:()=>e.push("/")},{id:2,forTitle:!0,text:"Пользователи",select:()=>{e.push("/"),R.Z.commit("open_close_settings")}},{id:3,text:"Список",select:()=>{}}]),a=(0,s.Fl)((()=>t.find((e=>e.forTitle)))),l=(0,v.qj)([{id:1,header:"TOTAL USERS",firstNumber:"24",secondNumber:"22",stat:{text:"5.0%",direction:1}},{id:2,header:"ACTIVE MEMBERS",firstNumber:"12",secondNumber:"11",stat:{text:"1.2%",direction:1}},{id:3,header:"NEW/RETURNING",firstNumber:"56 %",secondNumber:"48.7",stat:{text:"2.8%",direction:0}},{id:4,header:"ACTIVE MEMBERS",firstNumber:"28 %",secondNumber:"28.6%",stat:{text:"0.0%",direction:2}}]);return{pages:t,forTitle:a,usersActivity:l}}};const _e=(0,x.Z)(be,[["render",p],["__scopeId","data-v-2fd34d30"]]);var ye=_e}}]);
//# sourceMappingURL=411.ebf0d516.js.map