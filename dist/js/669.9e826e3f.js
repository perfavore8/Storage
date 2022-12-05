"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[669],{3026:function(e,t,s){s.d(t,{Z:function(){return d}});var o=s(3396),a=s(7139);const n={class:"span"};function i(e,t,s,i,l,c){const r=(0,o.up)("selector-vue");return s.show?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)(["bottom",{blur:s.blur}])},[s.previous?((0,o.wg)(),(0,o.iD)("button",{key:0,onClick:t[0]||(t[0]=e=>c.changePage(s.page-1)),class:"btn previous"},(0,a.zw)("<"))):(0,o.kq)("",!0),(0,o._)("div",n,(0,a.zw)(s.page),1),s.next?((0,o.wg)(),(0,o.iD)("button",{key:1,onClick:t[1]||(t[1]=e=>c.changePage(s.page+1)),class:"btn next"},(0,a.zw)(">"))):(0,o.kq)("",!0),(0,o.Wm)(r,{class:"count",options_props:l.count_values,selected_option:{name:s.count,value:-1},onSelect:c.change_count},null,8,["options_props","selected_option","onSelect"])],2)):(0,o.kq)("",!0)}var l=s(4469),c={components:{SelectorVue:l.Z},props:{previous:{type:Boolean,required:!0},next:{type:Boolean,required:!0},page:{type:Number,required:!0},count:{type:Number,required:!0},blur:{type:Boolean,required:!1,default:!1},show:{type:Boolean,required:!0}},emits:{changePage:null,changeCount:null},data(){return{count_values:[]}},async mounted(){await this.$store.dispatch("get_account"),this.$store.state.account.user.config.per_pages&&(this.count_values=[...this.$store.state.account.user.config.per_pages].map(((e,t)=>({name:e,value:t}))))},computed:{},methods:{changePage(e){this.$emit("changePage",e)},change_count(e){console.log(e),this.$emit("changeCount",e.name)}}},r=s(89);const u=(0,r.Z)(c,[["render",i],["__scopeId","data-v-f9e85040"]]);var d=u},4469:function(e,t,s){s.d(t,{Z:function(){return h}});var o=s(3396),a=s(7139),n=s(9242);const i={class:"v-select"},l={class:"options",key:"a1"},c=["onClick"];function r(e,t,s,r,u,d){return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",{class:(0,a.C_)(["title",{title_checked:r.show_options,disabled:s.disabled}]),onClick:t[0]||(t[0]=e=>r.open_close_options()),onFocusout:t[1]||(t[1]=(...e)=>r.handleFocusOut&&r.handleFocusOut(...e)),tabindex:"0"},[(0,o._)("p",null,(0,a.zw)(s.selected_option.name),1),s.disabled?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,a.C_)(["arrow",{rotate_arrow:r.show_options}])},null,2))],34),(0,o.Wm)(n.uT,{name:"list"},{default:(0,o.w5)((()=>[r.show_options?((0,o.wg)(),(0,o.iD)("div",l,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.options,(e=>((0,o.wg)(),(0,o.iD)("p",{key:e.value,class:(0,a.C_)({optgroup:"optgroup"===e.value}),onClick:t=>r.select_option(e)},[e.optgroup?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)("     "+(0,a.zw)(e.name),1)],64)):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Uk)((0,a.zw)(e.name),1)],64))],10,c)))),128))])):(0,o.kq)("",!0)])),_:1})])}var u=s(4870),d={props:{options_props:{type:Array,default(){return[]},required:!0},selected_option:{type:Object,required:!0,default(){return{}}},disabled:{type:Boolean,required:!1,default:!1},idx:{type:Number,required:!1}},emits:{select:null},setup(e,{emit:t}){const s=(0,u.iH)([]);(0,o.bv)((()=>{(0,o.Y3)((()=>{a()}))}));const a=()=>{s.value=[],e.options_props?.forEach((e=>s.value.push(e)))};(0,o.YP)((()=>e.options_props),(()=>{a()}),{deep:!0});const n=(0,u.iH)(!1),i=()=>{n.value=!1},l=()=>{e.disabled||(n.value=!n.value)},c=()=>{i()},r=s=>{"optgroup"!=s.value&&(t("select",s,e.idx),i())};return{open_close_options:l,handleFocusOut:c,show_options:n,options:s,select_option:r}}},p=s(89);const g=(0,p.Z)(d,[["render",r],["__scopeId","data-v-a0cfd498"]]);var h=g},6669:function(e,t,s){s.r(t),s.d(t,{default:function(){return B}});var o=s(3396),a=s(7139);const n={class:"app"},i={class:"header"},l={class:"btns"},c=["onClick"],r={class:"content"},u={class:"top"};function d(e,t,s,d,p,g){const h=(0,o.up)("archive-grid");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("div",i,[(0,o._)("div",l,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.catalog,(t=>((0,o.wg)(),(0,o.iD)("button",{class:(0,a.C_)(["btns_btn",{selected_catalog:e.$route.name===t.value}]),onClick:e=>g.route(t.value),key:t},(0,a.zw)(t.name),11,c)))),128))])]),(0,o._)("div",r,[(0,o._)("div",u,[(0,o._)("p",null,"Найдено: "+(0,a.zw)(g.coun_archive),1)]),(0,o.Wm)(h,{class:"grid"})])])}var p=s(9242);const g=e=>((0,o.dD)("data-v-7113fbc1"),e=e(),(0,o.Cn)(),e),h={class:"grid"},_={key:0,class:"text"},v={key:1,class:"table"},w={class:"row title"},m=g((()=>(0,o._)("td",{class:"item"},null,-1))),k={key:0,class:"item"},f={key:0},b={key:1},y={class:"item"},C=["onClick"];function D(e,t,s,n,i,l){const c=(0,o.up)("grid-bottom");return(0,o.wg)(),(0,o.iD)("div",h,[0==l.archive_list.length?((0,o.wg)(),(0,o.iD)("label",_," Ничего не найдено ")):((0,o.wg)(),(0,o.iD)("table",v,[(0,o._)("thead",null,[(0,o._)("tr",w,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.tableConfig,(e=>(0,o.wy)(((0,o.wg)(),(0,o.iD)("td",{key:e[0],class:"item"},(0,a.zw)(e[1].name),1)),[[p.F8,e[1].visible]]))),128)),m])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.archive_list,(e=>((0,o.wg)(),(0,o.iD)("tr",{key:e.id,class:"row"},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.tableConfig,(t=>((0,o.wg)(),(0,o.iD)(o.HY,{key:t},[t[1].visible?((0,o.wg)(),(0,o.iD)("td",k,[t[0].split(".").length<2?((0,o.wg)(),(0,o.iD)("span",f,(0,a.zw)(e.fields[t[0]]),1)):((0,o.wg)(),(0,o.iD)("span",b,[e.fields[t[0].split(".")[0]]?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,a.zw)("cost"==t[0].split(".")[1]?e.fields[t[0].split(".")[0]][t[0].split(".")[1]]+" "+e.fields[t[0].split(".")[0]].currency:e.fields[t[0].split(".")[0]][t[0].split(".")[1]]),1)],64)):(0,o.kq)("",!0)]))])):(0,o.kq)("",!0)],64)))),128)),(0,o._)("td",y,[(0,o._)("div",{class:"edit_icon",onClick:t=>l.unarchive_data(e)},null,8,C)])])))),128))])])),(0,o.Wm)(c,{class:"bottom",previous:null!=l.meta.links.prev,next:null!=l.meta.links.next,page:l.meta.meta.current_page,show:0!=l.archive_list.length,count:l.meta.meta.per_page,onChangePage:l.changePage,onChangeCount:l.changeCount},null,8,["previous","next","page","show","count","onChangePage","onChangeCount"])])}var $=s(3026),q={components:{GridBottom:$.Z},data(){return{isLoading:!1}},async mounted(){this.$store.dispatch("get_account"),this.$store.dispatch("get_products",{is_archive:1}),await this.$store.dispatch("getTableConfig",""),this.$store.dispatch("get_all_fields")},computed:{tableConfig(){return Object.entries(this.$store.state.account.tableConfig)},meta(){return this.$store.state.products.meta},all_fields(){return this.$store.state.fields.all_fields},archive_list(){return this.$store.state.products.products}},watch:{},methods:{changeCount(e){this.count=e},changePage(e){this.page=e},async unarchive_data(e){if(!this.isLoading){this.isLoading=!0;const t={id:e.id,fields:e.fields,is_archive:0};await this.$store.dispatch("update_product",t),await this.$store.dispatch("get_products",{is_archive:1}),this.isLoading=!1}}}},z=s(89);const H=(0,z.Z)(q,[["render",D],["__scopeId","data-v-7113fbc1"]]);var Y=H,x=s(65),P={name:"ArchiveView",components:{ArchiveGrid:Y},computed:{...(0,x.Se)(["catalog"]),coun_archive(){return this.$store.state.products.products.length}},methods:{route(e){this.$router.push("/"+e)}}};const Z=(0,z.Z)(P,[["render",d],["__scopeId","data-v-b5a1e7fe"]]);var B=Z}}]);
//# sourceMappingURL=669.9e826e3f.js.map