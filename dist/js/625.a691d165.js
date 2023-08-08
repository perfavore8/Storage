"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[625],{1897:function(e,t,a){a.d(t,{Z:function(){return g}});var l=a(3396);const n=e=>((0,l.dD)("data-v-580fb103"),e=e(),(0,l.Cn)(),e),s={class:"date_range"},o=["value"],c=n((()=>(0,l._)("span",null," - ",-1))),u=["value"];function r(e,t,a,n,r,i){return(0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("input",{type:"date",value:a.dateStart?n.pattern("/","-",a.dateStart):n.pattern("/","-",a.dateRange?.split("-")[0]),onInput:t[0]||(t[0]=t=>(e.$emit("update:dateStart",n.pattern("-","/",t.target.value)?.split("-").join("/")),e.$emit("update:dateRange",n.pattern("-","/",t.target.value)?.split("-").join("/")+"-"+a.dateRange?.split("-")[1])))},null,40,o),c,(0,l._)("input",{type:"date",value:a.dateEnd?n.pattern("/","-",a.dateEnd):n.pattern("/","-",a.dateRange?.split("-")[1]),onInput:t[1]||(t[1]=t=>(e.$emit("update:dateEnd",n.pattern("-","/",t.target.value)?.split("-").join("/")),e.$emit("update:dateRange",a.dateRange?.split("-")[0]+"-"+n.pattern("-","/",t.target.value)?.split("-").join("/"))))},null,40,u)])}var i={props:{dateStart:{type:String,required:!1},dateEnd:{type:String,required:!1},dateRange:{type:String,required:!1}},setup(){const e=(e,t,a)=>a?.split(e)?.join(t);return{pattern:e}}},p=a(89);const d=(0,p.Z)(i,[["render",r],["__scopeId","data-v-580fb103"]]);var g=d},2357:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(3396);function n(e,t,a,n,s,o){const c=(0,l.up)("NavBar"),u=(0,l.up)("HomeMenu"),r=(0,l.up)("HomeModals");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("header",null,[(0,l.Wm)(c),(0,l.Wm)(u)]),(0,l.Wm)(r,{selectedWH:a.selectedWH},null,8,["selectedWH"])],64)}var s=a(6833),o=a(1624),c=a(2145),u={components:{NavBar:s.Z,HomeMenu:o.Z,HomeModals:c.Z},props:{selectedWH:{type:Object,required:!1}},setup(){}},r=a(89);const i=(0,r.Z)(u,[["render",n],["__scopeId","data-v-3b484666"]]);var p=i},8138:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(3396),n=a(7139);const s={class:"text"},o=["placeholder","value"];function c(e,t,a,c,u,r){return(0,l.wg)(),(0,l.iD)("div",s,[(0,l._)("input",{type:"text",class:(0,n.C_)(a.underlined?"input_uderline":"input"),placeholder:a.placeholder,value:a.inputValue,onInput:t[0]||(t[0]=t=>e.$emit("update:inputValue",t.target.value))},null,42,o)])}var u={props:{inputValue:{type:String,required:!1},placeholder:{type:String,required:!1},underlined:{type:Boolean,required:!1}},setup(){}},r=a(89);const i=(0,r.Z)(u,[["render",c],["__scopeId","data-v-4edccb44"]]);var p=i},1725:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(3396),n=a(7139);const s={class:"grid gap-3"},o={class:"current d"};function c(e,t,a,c,u,r){return(0,l.wg)(),(0,l.iD)("div",s,[a.page.current!=a.page.first&&null!=a.page.prev?((0,l.wg)(),(0,l.iD)("button",{key:0,onClick:t[0]||(t[0]=e=>c.prev()),class:"a"},(0,n.zw)("<"))):(0,l.kq)("",!0),a.page.current!=a.page.first&&a.page.prev!=a.page.first?((0,l.wg)(),(0,l.iD)("button",{key:1,onClick:t[1]||(t[1]=e=>c.first()),class:"b"},(0,n.zw)(a.page.first),1)):(0,l.kq)("",!0),a.page.current!=a.page.first&&null!=a.page.prev?((0,l.wg)(),(0,l.iD)("button",{key:2,onClick:t[2]||(t[2]=e=>c.prev()),class:"c"},(0,n.zw)(a.page.prev),1)):(0,l.kq)("",!0),(0,l._)("button",o,(0,n.zw)(a.page.current),1),a.page.current!=a.page.last&&null!=a.page.next?((0,l.wg)(),(0,l.iD)("button",{key:3,onClick:t[3]||(t[3]=e=>c.next()),class:"e"},(0,n.zw)(a.page.next),1)):(0,l.kq)("",!0),a.page.current!=a.page.last&&a.page.next!=a.page.last?((0,l.wg)(),(0,l.iD)("button",{key:4,onClick:t[4]||(t[4]=e=>c.last()),class:"f"},(0,n.zw)(a.page.last),1)):(0,l.kq)("",!0),a.page.current!=a.page.last&&null!=a.page.next?((0,l.wg)(),(0,l.iD)("button",{key:5,onClick:t[5]||(t[5]=e=>c.next()),class:"g"},(0,n.zw)(">"))):(0,l.kq)("",!0)])}var u={props:{page:Object},emits:{changePage(e){return e>0&&"number"===typeof e}},setup(e,t){const a=()=>t.emit("changePage",e.page.first),l=()=>t.emit("changePage",e.page.current-1),n=()=>t.emit("changePage",e.page.current+1),s=()=>t.emit("changePage",e.page.last);return{prev:l,first:a,next:n,last:s}}},r=a(89);const i=(0,r.Z)(u,[["render",c],["__scopeId","data-v-30638d00"]]);var p=i},8697:function(e,t,a){a.d(t,{Z:function(){return p}});var l=a(3396),n=a(7139);function s(e,t,a,s,o,c){const u=(0,l.up)("AppPaginator"),r=(0,l.up)("selector-vue");return a.show?((0,l.wg)(),(0,l.iD)("div",{key:0,class:(0,n.C_)(["bottom",{blur:a.blur}])},[a.showBtns?((0,l.wg)(),(0,l.j4)(u,{key:0,page:a.page,onChangePage:c.changePage},null,8,["page","onChangePage"])):(0,l.kq)("",!0),a.showSelector?((0,l.wg)(),(0,l.j4)(r,{key:1,class:"count",options_props:o.count_values,selected_option:{name:a.count,value:-1},onSelect:c.change_count},null,8,["options_props","selected_option","onSelect"])):(0,l.kq)("",!0)],2)):(0,l.kq)("",!0)}var o=a(7720),c=a(1725),u={components:{SelectorVue:o.Z,AppPaginator:c.Z},props:{previous:{type:Boolean,required:!1},next:{type:Boolean,required:!1},page:{type:Object,required:!1,default(){return{first:1,prev:null,current:1,next:null,last:1}}},count:{type:Number,required:!0},blur:{type:Boolean,required:!1,default:!1},show:{type:Boolean,required:!1,default:!0},showBtns:{type:Boolean,required:!1,default:!0},showSelector:{type:Boolean,required:!1,default:!0}},emits:{changePage:null,changeCount:null},data(){return{count_values:[]}},async mounted(){await this.$store.dispatch("get_account"),this.$store.state.account.user.config.per_pages&&(this.count_values=[...this.$store.state.account.user.config.per_pages].map(((e,t)=>({name:e,value:t}))))},computed:{},methods:{changePage(e){this.$emit("changePage",e)},change_count(e){this.$emit("changeCount",e.name)}}},r=a(89);const i=(0,r.Z)(u,[["render",s],["__scopeId","data-v-53e878de"]]);var p=i},4625:function(e,t,a){a.r(t),a.d(t,{default:function(){return J}});var l=a(3396);const n={class:"app"},s={class:"header"},o={class:"wrapper mb-8"};function c(e,t,a,c,u,r){const i=(0,l.up)("AppHeader"),p=(0,l.up)("DocumentsFilters"),d=(0,l.up)("DocumentsGrid");return(0,l.wg)(),(0,l.iD)("div",n,[(0,l._)("div",s,[(0,l.Wm)(i)]),(0,l._)("div",o,[(0,l.Wm)(p),(0,l.Wm)(d)])])}var u=a(2357),r=a(7139),i=a(9242);const p={class:"main"},d={class:"my-2 md:my-4 text-sm md:text-base text-slate-500 dark:text-slate-300 text-left"},g={class:"table",ref:"table"},m={class:"bar_row"},v=["onClick"],_={class:"bar_item_group"},h={key:0},f={key:0,class:"item",style:{padding:"5px 10px 5px 15px"}},y=["href"],b={key:1,class:"item cursor-pointer"},w={key:0,class:"text"};function k(e,t,a,n,s,o){const c=(0,l.up)("grid-bottom");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",p,[(0,l._)("p",d," Найдено: "+(0,r.zw)(n.total),1),(0,l._)("table",g,[(0,l._)("thead",null,[(0,l._)("tr",m,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(n.documents.titles,(e=>(0,l.wy)(((0,l.wg)(),(0,l.iD)("th",{class:(0,r.C_)(["bar_item item",{cursor_pointer:e.sortable}]),style:(0,r.j5)({width:(n.collsCount>=8?100:n.collsCount>3?90:80)/n.collsCount*e.width+"%"}),onClick:t=>e.sortable?n.sort(e.code):null,key:e},[(0,l._)("div",_,[(0,l._)("label",null,(0,r.zw)(e.name),1),e.sortable?((0,l.wg)(),(0,l.iD)("button",{key:0,class:(0,r.C_)(["bar_item_icon",{bar_item_icon_up:"desc"==n.sorting.order&&e.code===n.sorting.order_by,bar_item_icon_down:"asc"==n.sorting.order&&e.code===n.sorting.order_by}])},null,2)):(0,l.kq)("",!0)])],14,v)),[[i.F8,!e.visibleIds||e.visibleIds?.includes(n.accountId)]]))),128))])]),n.documents.list.length?((0,l.wg)(),(0,l.iD)("tbody",h,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(n.documents.list,(e=>((0,l.wg)(),(0,l.iD)("tr",{key:e,class:"row"},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(n.documents.titles,(t=>((0,l.wg)(),(0,l.iD)(l.HY,{key:t},[!t.visibleIds||t.visibleIds?.includes(n.accountId)?((0,l.wg)(),(0,l.iD)(l.HY,{key:0},[t.isDocumentLink?((0,l.wg)(),(0,l.iD)("td",f,[(0,l._)("a",{target:"black",class:"underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline",href:e.document_link},(0,r.zw)(e[t.code]),9,y)])):((0,l.wg)(),(0,l.iD)("td",b,(0,r.zw)(e[t.code]),1))],64)):(0,l.kq)("",!0)],64)))),128))])))),128))])):(0,l.kq)("",!0)],512),0==n.documents.length?((0,l.wg)(),(0,l.iD)("label",w," Ничего не найдено ")):(0,l.kq)("",!0)]),n.documents.list.length<n.meta?.meta?.total?((0,l.wg)(),(0,l.j4)(c,{key:0,page:n.page,show:0!=n.documents.list.length,showSelector:!1,count:n.meta?.per_page,onChangePage:n.changePage},null,8,["page","show","count","onChangePage"])):(0,l.kq)("",!0)],64)}var D=a(8697),q=a(9299),A=a(4870);const Z=(0,A.qj)({titles:[{name:"Статус",placeholder:"Статус документа",code:"status_id",type:"AppInputSelect",minLength:0,requestDelay:0,value:"",selected:{},width:1,sortable:!1,isAutocomplete:!1,selfList:!0,url:"document/templates",list:[],visibleIds:[148,1]},{name:"Название документа",placeholder:"Название документа",code:"template_name",isDocumentLink:!0,type:"AppInputSelect",minLength:0,requestDelay:0,value:"",selected:{},width:1,sortable:!0,isAutocomplete:!1,url:"document/templates",list:[]},{name:"Название заказа",placeholder:"Название заказа",code:"lead_name",type:"AppInputSelect",minLength:0,requestDelay:300,value:"",selected:{},width:1,sortable:!0,isAutocomplete:!0,url:"document/autocomplete/lead_name",list:[]},{name:"Компания",placeholder:"Компания",code:"company_name",type:"AppInputSelect",minLength:3,requestDelay:300,value:"",selected:{},width:1,sortable:!0,isAutocomplete:!0,url:"analytics/autocomplete/company",list:[]},{name:"Контакт",placeholder:"Контакт",code:"contact_name",type:"AppInputSelect",minLength:3,requestDelay:300,value:"",selected:{},width:1,sortable:!0,isAutocomplete:!0,url:"analytics/autocomplete/contact",list:[]},{name:"Кто сформировал",placeholder:"Кто сформировал",code:"user_name",type:"AppInputSelect",minLength:0,requestDelay:0,value:"",selected:{},width:1,sortable:!0,isAutocomplete:!1,url:"document/users",list:[]},{name:"Когда сформировал",placeholder:"Когда сформировал",code:"created_at",type:"AppDateRange",minLength:0,requestDelay:0,value:"",selected:"-",width:1,sortable:!0,list:[]}],list:[]}),I=(0,l.Fl)((()=>Z.titles.find((e=>"status_id"===e.code)))),C=(0,l.Fl)((()=>q.Z.state.documents.documents)),x=()=>{Z.list=[];const e=e=>{let t="";if(I.value&&I.value.list){const a=I.value.list.find((t=>t.id==e));a&&(t=a.name)}return t};C.value.forEach((t=>{const a={template_name:t?.name,document_link:t?.url,lead_name:t?.lead_name,company_name:t?.company_name,contact_name:t?.contact_name,user_name:t?.user_name,created_at:t?.created_at,status_id:e(t?.pipeline_id)+" - "+e(t?.status_id)};" - "===a.status_id&&(a.status_id=""),Z.list.push(a)}))};function L(){const e=(0,l.Fl)((()=>Z.titles.length)),t=()=>{Z.titles.map((async e=>{if("AppInputSelect"===e.type&&!e.isAutocomplete&&!e.selfList){const t=await q.Z.dispatch("getAutocomplete",{subUrl:e.url,value:{}});e.list=[],t.forEach((t=>e.list.push({name:t,value:t})))}}))},a=async()=>{await q.Z.dispatch("getPipelinesListV2");const e=q.Z.state.account.pipelinesListV2;Object.entries(e).forEach((([e,t])=>{I.value.list.push({name:t.name,value:"optgroup",id:e}),t.statuses.forEach((t=>{I.value.list.push({name:t.name,value:e+"-"+t.id,id:t.id,color:t.color,optgroup:!0})}))}))},n=async e=>{const t={subUrl:e.url,value:{query:e.value}};"contact_name"===e.code&&(t.value.from_docs=1);const a=await q.Z.dispatch("getAutocomplete",t);e.list=[],a.forEach((t=>{const a={name:t,value:t};t.label&&(a.name=t.label,a.value=t.value),e.list.push(a)}))},s=async()=>{await Promise.all([a(),q.Z.dispatch("getDocuments",q.Z.state.documents.filters)]),x()},o=(0,l.Fl)((()=>Z.titles)),c=(0,l.Fl)((()=>q.Z.state.documents.meta?.meta?.total));return{documents:Z,collsCount:e,fillDocuments:x,getDocuments:s,documentsTitles:o,total:c,fillTitlesList:t,getAutocompleteList:n}}var S={components:{GridBottom:D.Z},setup(){const{documents:e,collsCount:t,getDocuments:a,total:n,fillTitlesList:s}=L();(0,l.bv)((()=>{a(),s()}));const o=(0,A.qj)({order_by:null,order:""}),c=(0,l.Fl)((()=>q.Z.state.account.account.id)),u=(0,l.Fl)((()=>q.Z.state.orders.meta)),r=(0,l.Fl)((()=>{const e={first:i(u.value?.links?.first),prev:i(u.value?.links?.prev),current:u.value?.meta?.current_page,next:i(u.value?.links?.next),last:i(u.value?.links?.last)};return e})),i=e=>e?e.split("?page=")[1]:null,p=e=>{const t={page:e};q.Z.commit("updateDocumentsFilters",t),a()},d=e=>{o.order_by!=e&&(o.order="",o.order_by=e),"desc"!==o.order&&o.order?"asc"===o.order&&(o.order="desc"):o.order="asc",q.Z.commit("updateDocumentsFilters",o),a()};return{documents:e,collsCount:t,sorting:o,sort:d,changePage:p,page:r,total:n,meta:u,accountId:c}}},P=a(89);const H=(0,P.Z)(S,[["render",k],["__scopeId","data-v-0ff35040"]]);var F=H;const R={class:"flex flex-col gap-5 w-full"},j={class:"row"},B={class:"left"},V={class:"flex flex-col w-full gap-3"},z={class:"filters"},E={class:"btns"};function W(e,t,a,n,s,o){return(0,l.wg)(),(0,l.iD)("div",R,[(0,l._)("div",j,[(0,l._)("div",B,[(0,l._)("div",V,[(0,l._)("div",z,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(n.documentsTitles,(t=>(0,l.wy)(((0,l.wg)(),(0,l.j4)((0,l.LL)(t.type),{key:t.code,list:t.isAutocomplete?t.list:n.filterList(t.value,t.list),selected:t.selected,countLettersReq:t.minLength,placeholder:t.placeholder,requestDelay:t.requestDelay,SelectedInTitle:!0,dateRange:t.selected,inputValue:t.selected,"onUpdate:dateRange":e=>t.selected=e,"onUpdate:inputValue":e=>t.selected=e,onChangeInputValue:e=>(t.value=e,t.isAutocomplete?n.getAutocompleteList(t):null),onSelect:e=>"AppMultiSelect"===t.type?n.selectMulti(e,t.code):t.selected=e},null,40,["list","selected","countLettersReq","placeholder","requestDelay","dateRange","inputValue","onUpdate:dateRange","onUpdate:inputValue","onChangeInputValue","onSelect"])),[[i.F8,!t.visibleIds||t.visibleIds?.includes(e.accountId)]]))),128))])]),(0,l._)("div",E,[(0,l._)("button",{class:"btn btn_blue",onClick:t[0]||(t[0]=e=>n.apply())},"Применить"),(0,l._)("button",{class:"btn btn_grey",onClick:t[1]||(t[1]=e=>n.clearAllFields())}," Очистить ")])])])])}var $=a(1897),M=a(5477),Y=a(8731),T=a(8138),U={components:{AppInputSelect:M.Z,AppDateRange:$.Z,AppInput:T.Z,AppMultiSelect:Y.Z},setup(){const{documentsTitles:e,getDocuments:t,getAutocompleteList:a}=L(),l=()=>{e.value.map((e=>{e.value="",e.selected={},"AppDateRange"===e.type&&(e.selected="-"),"AppInput"===e.type&&(e.selected="")})),n()},n=()=>{const a={};e.value.forEach((e=>{let t=e.selected?.value;"AppDateRange"!==e.type&&"AppInput"!==e.type||"-"===e.selected?"status_id"===e.code&&(t=e.selected.id):t=e.selected,a[e.code]=t})),q.Z.commit("updateDocumentsFilters",a),t()},s=(e,t)=>t.filter((t=>t?.name?.toLowerCase()?.includes(e?.toLowerCase()))),o=(t,a)=>{if("all"===t.value){const l=e.value?.find((e=>e.code===a));l?.list?.forEach((e=>{"all"!==e.value&&(e.selected=!t.selected)}))}t.selected=!t.selected};return{documentsTitles:e,clearAllFields:l,apply:n,filterList:s,selectMulti:o,getAutocompleteList:a}}};const K=(0,P.Z)(U,[["render",W],["__scopeId","data-v-2680f94c"]]);var O=K,G={components:{AppHeader:u.Z,DocumentsGrid:F,DocumentsFilters:O},setup(){}};const N=(0,P.Z)(G,[["render",c],["__scopeId","data-v-5dc503b2"]]);var J=N}}]);
//# sourceMappingURL=625.a691d165.js.map