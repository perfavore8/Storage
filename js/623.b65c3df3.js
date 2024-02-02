"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[623],{9240:function(e,t,l){l.d(t,{Z:function(){return p}});var s=l(3396);const a={class:"z-[46]"};function r(e,t,l,r,i,o){const n=(0,s.up)("NavBar"),c=(0,s.up)("HomeMenu"),u=(0,s.up)("HomeModals");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("header",a,[(0,s.Wm)(n),(0,s.Wm)(c,{class:"z-[46]"})]),(0,s.Wm)(u,{selectedWH:l.selectedWH},null,8,["selectedWH"])],64)}var i=l(3768),o=l(2692),n=l(1621),c={components:{NavBar:i.Z,HomeMenu:o.Z,HomeModals:n.Z},props:{selectedWH:{type:Object,required:!1}},setup(){}},u=l(89);const d=(0,u.Z)(c,[["render",r],["__scopeId","data-v-bb6a9f2e"]]);var p=d},6426:function(e,t,l){l.d(t,{Z:function(){return d}});var s=l(3396),a=l(7139);const r={class:"text"},i=["placeholder","value"];function o(e,t,l,o,n,c){return(0,s.wg)(),(0,s.iD)("div",r,[(0,s._)("input",{type:"text",class:(0,a.C_)(l.underlined?"input_uderline":"input"),placeholder:l.placeholder,value:l.inputValue,onInput:t[0]||(t[0]=t=>e.$emit("update:inputValue",t.target.value))},null,42,i)])}var n={props:{inputValue:{type:String,required:!1},placeholder:{type:String,required:!1},underlined:{type:Boolean,required:!1}},setup(){}},c=l(89);const u=(0,c.Z)(n,[["render",o],["__scopeId","data-v-5e112b4a"]]);var d=u},9211:function(e,t,l){l.d(t,{Z:function(){return B}});var s=l(3396),a=l(9242),r=l(7139);const i=e=>((0,s.dD)("data-v-5b65abd2"),e=e(),(0,s.Cn)(),e),o=i((()=>(0,s._)("span",{class:"material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"}," search ",-1))),n={class:"absolute top-full mt-2 border border-slate-200 bg-white shadow-lg shadow-shark-100 left-1/2 -translate-x-1/2 p-4 rounded-lg w-full max-w-[150%] sm:min-w-[550px] max-h-[75vh] overflow-y-scroll flex flex-col gap-8"},c={key:0,class:"font-medium text-lg text-gray-800"},u={class:"filters grid-cols-1 sm:grid-cols-2 pt-2"};function d(e,t,l,i,d,p){const f=(0,s.up)("AppInput"),v=(0,s.up)("BtnsSaveClose"),m=(0,s.up)("SearchFiltersGroup");(0,s.up)("AppInputSelect");return(0,s.wg)(),(0,s.iD)("div",{class:"w-1/2 relative z-20",ref:"target",onKeydown:t[9]||(t[9]=(0,a.D2)((()=>i.accept()),["enter"]))},[(0,s._)("div",{class:"search relative w-full",onClick:t[1]||(t[1]=e=>i.toggleFilters(!0)),onFocusin:t[2]||(t[2]=e=>i.toggleFilters(!0))},[(0,s.Wm)(f,{inputValue:i.searchValue,"onUpdate:inputValue":t[0]||(t[0]=e=>i.searchValue=e),placeholder:i.t("orders.ser")},null,8,["inputValue","placeholder"]),o],32),(0,s.wy)((0,s._)("div",n,[(0,s.Wm)(v,{show_close:!1,class:"self-start",onSave:t[4]||(t[4]=()=>i.accept())},{other_btns:(0,s.w5)((()=>[(0,s._)("button",{class:"btn bg-transparent order-2",onClick:t[3]||(t[3]=e=>i.reset())},(0,r.zw)(e.$t("global.drop")),1)])),save:(0,s.w5)((()=>[(0,s.Uk)((0,r.zw)(e.$t("global.apply2")),1)])),_:1}),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.Config.hasDifferentSources?i.Config.sources:1,(e=>((0,s.wg)(),(0,s.iD)("div",{key:e,class:"divide-y divide-solid divide-slate-400/40"},[i.Config.hasDifferentSources?((0,s.wg)(),(0,s.iD)("h2",c,(0,r.zw)(e.title),1)):(0,s.kq)("",!0),(0,s._)("div",u,[(0,s._)("div",null,[(0,s.Wm)(m,{filters:i.Config.hasDifferentSources?i.splitArrays(i.baseFilteredfiltersValue)?.[e.title]:i.baseFilteredfiltersValue,onChange_filter_value:i.change_filter_value},null,8,["filters","onChange_filter_value"])]),(0,s._)("div",null,[(0,s.kq)("",!0),(0,s.Wm)(m,{special:!1,filters:i.Config.hasDifferentSources?i.splitArrays(i.specialFilteredfiltersValueNotSelected)?.[e.title]:i.specialFilteredfiltersValueNotSelected,onChange_filter_value:i.change_filter_value},null,8,["filters","onChange_filter_value"])])])])))),128)),(0,s.Wm)(v,{show_close:!1,class:"self-start",onSave:t[8]||(t[8]=()=>i.accept())},{other_btns:(0,s.w5)((()=>[(0,s._)("button",{class:"btn bg-transparent order-2",onClick:t[7]||(t[7]=e=>i.reset())},(0,r.zw)(e.$t("global.drop")),1)])),save:(0,s.w5)((()=>[(0,s.Uk)((0,r.zw)(e.$t("global.apply2")),1)])),_:1})],512),[[a.F8,i.showFilters]])],544)}var p=l(8711),f=l(8890);const v={class:"filters2"},m=["onClick"];function h(e,t,l,a,i,o){return(0,s.wg)(),(0,s.iD)("div",v,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.filters,((e,t)=>((0,s.wg)(),(0,s.iD)("div",{key:t,class:(0,r.C_)(["item bg-transparent",{special:l.special}])},[(0,s._)("div",{class:"title",onClick:t=>l.special?e.selected=!1:null},(0,r.zw)(e.name),9,m),((0,s.wg)(),(0,s.j4)((0,s.LL)(e.component),{item:e,idx:e.code,selector_options:e.selector_options,onChange_filter_value:a.change_filter_value},null,40,["item","idx","selector_options","onChange_filter_value"]))],2)))),128))])}var g=l(8701),F=l(4197),_=l(7438),y=l(6323),b=l(602);const w={class:"wrapper flex flex-row gap-2 p-2"},C=["placeholder"],V=["placeholder"];function S(e,t,l,r,i,o){return(0,s.wg)(),(0,s.iD)("div",w,[(0,s.wy)((0,s._)("input",{type:"number",class:"input","onUpdate:modelValue":t[0]||(t[0]=e=>r.valueOne=e),placeholder:r.t("filters.from"),onFocusout:t[1]||(t[1]=e=>r.checkCorrectOrder())},null,40,C),[[a.nr,r.valueOne,void 0,{number:!0}]]),(0,s.wy)((0,s._)("input",{type:"number",class:"input","onUpdate:modelValue":t[2]||(t[2]=e=>r.valueTwo=e),placeholder:r.t("filters.to"),onFocusout:t[3]||(t[3]=e=>r.checkCorrectOrder())},null,40,V),[[a.nr,r.valueTwo,void 0,{number:!0}]])])}var N=l(4870),D=l(2489),Z={props:{item:{type:Object,required:!0},idx:{type:Number,required:!0}},setup(e,t){const{t:l}=(0,D.j)(),a=(0,N.iH)(""),r=(0,N.iH)("");(0,s.YP)((()=>[a.value,r.value]),(()=>c())),(0,s.YP)((()=>e.item),(()=>n()));const i=()=>{if(a.value>r.value&&""!==a.value&&""!==r.value){const e=a.value;a.value=r.value,r.value=e}};(0,s.bv)((()=>n()));const o=(0,s.Fl)((()=>({option:"range",value:`${a.value}-${r.value}`}))),n=()=>{(0,s.Y3)((()=>{[a.value,r.value]=e.item.value?.split("-")||["",""]}))},c=()=>{t.emit("change_filter_value",o.value,e.idx)};return{valueOne:a,valueTwo:r,checkCorrectOrder:i,t:l}}},k=l(89);const x=(0,k.Z)(Z,[["render",S],["__scopeId","data-v-52a55ac1"]]);var q=x,H={components:{FilterNumber:g.Z,FilterText:F.Z,FilterList:_.Z,FilterDate:y.Z,FilterFlag:b.Z,FilterDoubleNumber:q},props:{special:{type:Boolean,required:!1,default:()=>!1},filters:{type:Array,required:!1,default:()=>[]}},setup(e,t){const l=(e,l)=>t.emit("change_filter_value",e,l);return{change_filter_value:l}}};const U=(0,k.Z)(H,[["render",h],["__scopeId","data-v-4d5f7312"]]);var j=U,O=l(6426),I=l(6367),W=l(6413),E=l(4581),z=l(6963);function A(){const{t:e}=(0,D.j)(),{tabs:t}=(0,z.j)(),l=(0,s.Fl)((()=>t.selected)),a=(0,N.qj)({clients:{getFieldsUrl:`getClients${l.value.value}Fields`,stateName:`clients${l.value.value}`,stateFieldsName:"fields",needCategories:!0},orders:{needCategories:!1,hasDifferentSources:!0,sources:[{code:"amo",title:"",getFieldsUrl:"getAmoFields",stateName:"orders",stateFieldsName:"amoFields"},{code:"orders",title:e("search.orders"),getFieldsUrl:"getOrdersFields",stateName:"orders",stateFieldsName:"fields"},{code:"product",title:e("search.products"),getFieldsUrl:"get_all_fields",stateName:"fields",stateFieldsName:"all_fields"},{code:"contacts",title:e("search.contacts"),getFieldsUrl:"getClientsContactsFields",stateName:"clientsContacts",stateFieldsName:"fields"},{code:"company",title:e("search.companies"),getFieldsUrl:"getClientsCompanyFields",stateName:"clientsCompany",stateFieldsName:"fields"}]}});return{config:a}}function T(e){const{config:t}=A(),l=t?.[e],a=(0,N.iH)(""),r=()=>a.value="",i=(0,s.Fl)((()=>{let e=[];return l.hasDifferentSources?l.sources.forEach((t=>E.Z.state?.[t.stateName][t.stateFieldsName].forEach((l=>e.push({...l,title:t.title,titleCode:t.code,code:t.code+"_"+l.code}))))):e=E.Z.state?.[l.stateName][l.stateFieldsName],e})),o=(0,s.Fl)((()=>F.filter((e=>e.name.toUpperCase().includes(a.value.toUpperCase()))))),n=(e,t)=>{const l=F.find((e=>e.code===t));Object.assign(l,e)},c=(0,s.Fl)((()=>o.value.filter((e=>e.is_system)))),u=(0,s.Fl)((()=>o.value.filter((e=>!e.is_system)))),d=(0,s.Fl)((()=>F.filter((e=>!e.selected&&!e.is_system&&e.name.toUpperCase().includes(f.value.toUpperCase()))))),p=(0,s.Fl)((()=>u.value.filter((e=>e.selected)))),f=(0,N.iH)(""),v=(0,N.qj)([]),m=async()=>{await E.Z.dispatch("get_fields_properties"),E.Z.state.categories.fields_properties.forEach((e=>{let t="";for(let l=1;l<e.level;l++)t+="-    ";v.push({name:t+e.name,value:e.id})}))},h=()=>{const e={},t=(t,s)=>{const a=t.code.split(/_(.*)/s)[1];l.hasDifferentSources?(e[t.titleCode]||(e[t.titleCode]={}),e[t.titleCode][a]=s):e[a]=s};return F.filter((e=>null!=e.value&&""!==e.value)).forEach((e=>{if(1!=e.type&&2!=e.type||t(e,{compare:e.option,query:e.value}),3!=e.type&&4!=e.type&&11!=e.type||t(e,{compare:e.option,query:e.value}),5!=e.type&&6!=e.type&&12!=e.type||e.value?.length&&t(e,{compare:"in",query:e.value}),7==e.type){const l=e.value.split("~");l.forEach(((e,t)=>l[t]=e.split("-").join("."))),t(e,{from:l[0],to:l[1]})}if(8==e.type){const l=e.value.split("~");l.forEach(((e,t)=>{const s=e.split("T");s[0]=s[0].split("-").join("."),l[t]=s.join(" ")})),t(e,{from:l[0],to:l[1]})}})),e},g={1:"FilterDoubleNumber",2:"FilterDoubleNumber",3:"FilterText",4:"FilterText",5:"FilterList",6:"FilterList",7:"FilterDate",8:"FilterDate",9:"FilterFlag",11:"FilterDoubleNumber",12:"FilterList"},F=(0,N.qj)([]),_=()=>{F.length=0;const e=[];i.value.forEach((t=>{let l={};l={...t},e.push(l)})),e.forEach((e=>{const t=e=>{const t=[];return null!=e&&e.forEach(((e,l)=>t.push({name:e,value:l}))),t};let l=null;if(5!=e.type&&6!=e.type||(l=[]),9==e.type&&(l=1),12==e.type&&(l=[]),13==e.type)return;const s={is_system:!!e.is_system,selected:!!e.is_system,component:g[e.type],type:e.type,code:e.code,option:"=",selector_options:12==e.type?v:t(e.data),value:l,name:e.name,title:e.title,titleCode:e.titleCode};F.push(s)}))};return(0,s.bv)((async()=>{if(l.hasDifferentSources){const e=[];l.sources.forEach((t=>e.push(E.Z.dispatch(t.getFieldsUrl)))),await Promise.all(e)}else await E.Z.dispatch(l.getFieldsUrl);l.needCategories&&await m(),_()})),{searchValue:a,fields:i,filtersValue:F,filteredFiltersValue:o,change_filter_value:n,fillFilters:_,baseFilteredfiltersValue:c,specialFilteredfiltersValue:u,specialFilteredfiltersValueNotSelected:d,specialFilteredfiltersValueSelected:p,specialFiltersSearchValue:f,categories_options:v,filterComponents:g,confirmFilters:h,dropSearchValue:r,Config:l}}var $={components:{AppInput:O.Z,BtnsSaveClose:p.Z,AppInputSelect:f.Z,SearchFiltersGroup:j},props:{setOfInstructions:String},emits:{emitParams:null},setup(e,t){const{t:l}=(0,D.j)(),{tabs:a}=(0,z.j)(),r=(0,s.Fl)((()=>a.selected)),i=(0,N.iH)(null);(0,I.i9H)(i,(()=>n(!1)));const[o,n]=(0,W.OT)();(0,s.m0)((()=>o.value?document.body.style.overflowY="hidden":document.body.style.overflowY="auto"));const{searchValue:c,change_filter_value:u,fillFilters:d,baseFilteredfiltersValue:p,specialFilteredfiltersValueNotSelected:f,specialFilteredfiltersValueSelected:v,specialFiltersSearchValue:m,confirmFilters:h,dropSearchValue:g,Config:F}=T(e.setOfInstructions),_=()=>{t.emit("emitParams",{filter:h(),q:c,page:1}),n(!1)},y=()=>{d(),g(),t.emit("emitParams",{filter:{},q:"",page:1}),n(!1)},b=e=>e.reduce(((e,t)=>{const l=t.title;return e[l]||(e[l]=[]),e[l].push(t),e}),{});return{searchValue:c,change_filter_value:u,fillFilters:d,baseFilteredfiltersValue:p,specialFilteredfiltersValueNotSelected:f,specialFilteredfiltersValueSelected:v,specialFiltersSearchValue:m,confirmFilters:h,showFilters:o,toggleFilters:n,target:i,selectedTabComp:r,accept:_,reset:y,Config:F,splitArrays:b,t:l}}};const Y=(0,k.Z)($,[["render",d],["__scopeId","data-v-5b65abd2"]]);var B=Y}}]);
//# sourceMappingURL=623.b65c3df3.js.map