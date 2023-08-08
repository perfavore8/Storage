"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[938],{2357:function(e,t,l){l.d(t,{Z:function(){return p}});var s=l(3396);function a(e,t,l,a,i,r){const n=(0,s.up)("NavBar"),o=(0,s.up)("HomeMenu"),c=(0,s.up)("HomeModals");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("header",null,[(0,s.Wm)(n),(0,s.Wm)(o)]),(0,s.Wm)(c,{selectedWH:l.selectedWH},null,8,["selectedWH"])],64)}var i=l(6833),r=l(1624),n=l(2145),o={components:{NavBar:i.Z,HomeMenu:r.Z,HomeModals:n.Z},props:{selectedWH:{type:Object,required:!1}},setup(){}},c=l(89);const u=(0,c.Z)(o,[["render",a],["__scopeId","data-v-3b484666"]]);var p=u},8138:function(e,t,l){l.d(t,{Z:function(){return p}});var s=l(3396),a=l(7139);const i={class:"text"},r=["placeholder","value"];function n(e,t,l,n,o,c){return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("input",{type:"text",class:(0,a.C_)(l.underlined?"input_uderline":"input"),placeholder:l.placeholder,value:l.inputValue,onInput:t[0]||(t[0]=t=>e.$emit("update:inputValue",t.target.value))},null,42,r)])}var o={props:{inputValue:{type:String,required:!1},placeholder:{type:String,required:!1},underlined:{type:Boolean,required:!1}},setup(){}},c=l(89);const u=(0,c.Z)(o,[["render",n],["__scopeId","data-v-4edccb44"]]);var p=u},8935:function(e,t,l){l.d(t,{Z:function(){return E}});var s=l(3396),a=l(9242),i=l(7139);const r=e=>((0,s.dD)("data-v-6cc377a4"),e=e(),(0,s.Cn)(),e),n=r((()=>(0,s._)("span",{class:"material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"}," search ",-1))),o={class:"absolute top-full mt-2 border border-slate-200 bg-white bg-opacity-80 backdrop-blur-md shadow-lg shadow-shark-100 left-1/2 -translate-x-1/2 p-4 rounded-lg w-full max-w-[150%] min-w-[550px] flex flex-col gap-8"},c={key:0,class:"font-medium text-lg text-gray-800"},u={class:"filters pt-2"},p=(0,s.Uk)(" Применить ");function d(e,t,l,r,d,f){const g=(0,s.up)("AppInput"),m=(0,s.up)("SearchFiltersGroup"),v=((0,s.up)("AppInputSelect"),(0,s.up)("BtnsSaveClose"));return(0,s.wg)(),(0,s.iD)("div",{class:"w-1/2 relative z-20",ref:"target",onKeydown:t[7]||(t[7]=(0,a.D2)((()=>r.accept()),["enter"]))},[(0,s._)("div",{class:"search relative w-full",onClick:t[1]||(t[1]=e=>r.toggleFilters(!0)),onFocusin:t[2]||(t[2]=e=>r.toggleFilters(!0))},[(0,s.Wm)(g,{inputValue:r.searchValue,"onUpdate:inputValue":t[0]||(t[0]=e=>r.searchValue=e),placeholder:"Поиск и фильтр"},null,8,["inputValue"]),n],32),(0,s.wy)((0,s._)("div",o,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.Config.hasDifferentSources?r.Config.sources:1,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e,class:"divide-y divide-solid divide-slate-400/40"},[r.Config.hasDifferentSources?((0,s.wg)(),(0,s.iD)("h2",c,(0,i.zw)(e.title),1)):(0,s.kq)("",!0),(0,s._)("div",u,[(0,s._)("div",null,[(0,s.Wm)(m,{filters:r.Config.hasDifferentSources?r.splitArrays(r.baseFilteredfiltersValue)?.[e.title]:r.baseFilteredfiltersValue,onChange_filter_value:r.change_filter_value},null,8,["filters","onChange_filter_value"])]),(0,s._)("div",null,[(0,s.kq)("",!0),(0,s.Wm)(m,{special:!1,filters:r.Config.hasDifferentSources?r.splitArrays(r.spacialFilteredfiltersValueNotSelected)?.[e.title]:r.spacialFilteredfiltersValueNotSelected,onChange_filter_value:r.change_filter_value},null,8,["filters","onChange_filter_value"])])])])))),128)),(0,s.Wm)(v,{show_close:!1,class:"self-start",onSave:t[6]||(t[6]=()=>r.accept())},{other_btns:(0,s.w5)((()=>[(0,s._)("button",{class:"btn bg-transparent order-2",onClick:t[5]||(t[5]=e=>r.reset())}," Сбросить ")])),save:(0,s.w5)((()=>[p])),_:1})],512),[[a.F8,r.showFilters]])],544)}var f=l(4038),g=l(5477);const m={class:"filters2"},v=["onClick"];function h(e,t,l,a,r,n){return(0,s.wg)(),(0,s.iD)("div",m,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.filters,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{key:t,class:(0,i.C_)(["item bg-transparent",{special:l.special}])},[(0,s._)("div",{class:"title",onClick:t=>l.special?e.selected=!1:null},(0,i.zw)(e.name),9,v),((0,s.wg)(),(0,s.j4)((0,s.LL)(e.component),{item:e,idx:e.code,selector_options:e.selector_options,onChange_filter_value:a.change_filter_value},null,40,["item","idx","selector_options","onChange_filter_value"]))],2)))),128))])}var F=l(0),_=l(4197),y=l(999),C=l(4637),w=l(7564),V={components:{FilterNumber:F.Z,FilterText:_.Z,FilterList:y.Z,FilterDate:C.Z,FilterFlag:w.Z},props:{special:{type:Boolean,required:!1,default:()=>!1},filters:{type:Array,required:!1,default:()=>[]}},setup(e,t){const l=(e,l)=>t.emit("change_filter_value",e,l);return{change_filter_value:l}}},b=l(89);const S=(0,b.Z)(V,[["render",h],["__scopeId","data-v-e43dc9e0"]]);var Z=S,D=l(8138),N=l(6367),k=l(6413),q=l(9299),x=l(4870),H=l(6963);function U(){const{tabs:e}=(0,H.j)(),t=(0,s.Fl)((()=>e.selected)),l=(0,x.qj)({clients:{getFieldsUrl:`getClients${t.value.value}Fields`,stateName:`clients${t.value.value}`,stateFieldsName:"fields",needCategories:!0},orders:{needCategories:!1,hasDifferentSources:!0,sources:[{code:"orders",title:"Заказы",getFieldsUrl:"getOrdersFields",stateName:"orders",stateFieldsName:"fields"},{code:"contacts",title:"Контакты",getFieldsUrl:"getClientsContactsFields",stateName:"clientsContacts",stateFieldsName:"fields"},{code:"company",title:"Компании",getFieldsUrl:"getClientsCompanyFields",stateName:"clientsCompany",stateFieldsName:"fields"}]}});return{config:l}}function j(e){const{config:t}=U(),l=t?.[e],a=(0,x.iH)(""),i=()=>a.value="",r=(0,s.Fl)((()=>{let e=[];return l.hasDifferentSources?l.sources.forEach((t=>q.Z.state?.[t.stateName][t.stateFieldsName].forEach((l=>e.push({...l,title:t.title,titleCode:t.code,code:l.code+"_"+t.code}))))):e=q.Z.state?.[l.stateName][l.stateFieldsName],e})),n=(0,s.Fl)((()=>F.filter((e=>e.name.toUpperCase().includes(a.value.toUpperCase()))))),o=(e,t)=>{const l=F.find((e=>e.code===t));Object.assign(l,e)},c=(0,s.Fl)((()=>n.value.filter((e=>e.is_system)))),u=(0,s.Fl)((()=>n.value.filter((e=>!e.is_system)))),p=(0,s.Fl)((()=>F.filter((e=>!e.selected&&!e.is_system&&e.name.toUpperCase().includes(f.value.toUpperCase()))))),d=(0,s.Fl)((()=>u.value.filter((e=>e.selected)))),f=(0,x.iH)(""),g=(0,x.qj)([]),m=async()=>{await q.Z.dispatch("get_fields_properties"),q.Z.state.categories.fields_properties.forEach((e=>{let t="";for(let l=1;l<e.level;l++)t+="-    ";g.push({name:t+e.name,value:e.id})}))},v=()=>{const e={},t=(t,s)=>{const a=t.code.split("_")[0];l.hasDifferentSources?(e[t.titleCode]||(e[t.titleCode]={}),e[t.titleCode][a]=s):e[a]=s};return F.filter((e=>null!=e.value&&""!==e.value)).forEach((e=>{if(1!=e.type&&2!=e.type||t(e,{compare:e.option,query:e.value}),3!=e.type&&4!=e.type||t(e,{compare:e.option,query:e.value}),5!=e.type&&6!=e.type&&12!=e.type||e.value?.length&&t(e,{compare:"in",query:e.value}),7==e.type){const l=e.value.split("~");l.forEach(((e,t)=>l[t]=e.split("-").join("."))),t(e,{from:l[0],to:l[1]})}if(8==e.type){const l=e.value.split("~");l.forEach(((e,t)=>{const s=e.split("T");s[0]=s[0].split("-").join("."),l[t]=s.join(" ")})),t(e,{from:l[0],to:l[1]})}})),e},h={1:"FilterNumber",2:"FilterNumber",3:"FilterText",4:"FilterText",5:"FilterList",6:"FilterList",7:"FilterDate",8:"FilterDate",9:"FilterFlag",12:"FilterList"},F=(0,x.qj)([]),_=()=>{F.length=0;const e=[];r.value.forEach((t=>{let l={};l={...t},e.push(l)})),e.forEach((e=>{const t=e=>{const t=[];return null!=e&&e.forEach(((e,l)=>t.push({name:e,value:l}))),t};let l=null;5!=e.type&&6!=e.type||(l=[]),9==e.type&&(l=1),12==e.type&&(l=[]);const s={is_system:!!e.is_system,selected:!!e.is_system,component:h[e.type],type:e.type,code:e.code,option:"=",selector_options:12==e.type?g:t(e.data),value:l,name:e.name,title:e.title,titleCode:e.titleCode};F.push(s)}))};return(0,s.bv)((async()=>{if(l.hasDifferentSources){const e=[];l.sources.forEach((t=>e.push(q.Z.dispatch(t.getFieldsUrl)))),await Promise.all(e)}else await q.Z.dispatch(l.getFieldsUrl);l.needCategories&&await m(),_()})),{searchValue:a,fields:r,filtersValue:F,filteredFiltersValue:n,change_filter_value:o,fillFilters:_,baseFilteredfiltersValue:c,spacialFilteredfiltersValue:u,spacialFilteredfiltersValueNotSelected:p,specialFilteredfiltersValueSelected:d,specialFiltersSearchValue:f,categories_options:g,filterComponents:h,confirmFilters:v,dropSearchValue:i,Config:l}}var I={components:{AppInput:D.Z,BtnsSaveClose:f.Z,AppInputSelect:g.Z,SearchFiltersGroup:Z},props:{setOfInstructions:String},emits:{emitParams:null},setup(e,t){const{tabs:l}=(0,H.j)(),a=(0,s.Fl)((()=>l.selected)),i=(0,x.iH)(null);(0,N.i9H)(i,(()=>n(!1)));const[r,n]=(0,k.OT)(),{searchValue:o,change_filter_value:c,fillFilters:u,baseFilteredfiltersValue:p,spacialFilteredfiltersValueNotSelected:d,specialFilteredfiltersValueSelected:f,specialFiltersSearchValue:g,confirmFilters:m,dropSearchValue:v,Config:h}=j(e.setOfInstructions),F=()=>{t.emit("emitParams",{filter:m(),q:o,page:1}),n(!1)},_=()=>{u(),v(),t.emit("emitParams",{filter:{},q:"",page:1}),n(!1)},y=e=>e.reduce(((e,t)=>{const l=t.title;return e[l]||(e[l]=[]),e[l].push(t),e}),{});return{searchValue:o,change_filter_value:c,fillFilters:u,baseFilteredfiltersValue:p,spacialFilteredfiltersValueNotSelected:d,specialFilteredfiltersValueSelected:f,specialFiltersSearchValue:g,confirmFilters:m,showFilters:r,toggleFilters:n,target:i,selectedTabComp:a,accept:F,reset:_,Config:h,splitArrays:y}}};const W=(0,b.Z)(I,[["render",d],["__scopeId","data-v-6cc377a4"]]);var E=W}}]);
//# sourceMappingURL=938.b2e54f7a.js.map