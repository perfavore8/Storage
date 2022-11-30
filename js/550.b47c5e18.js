"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[550],{3026:function(e,t,o){o.d(t,{Z:function(){return d}});var s=o(6252),n=o(3577);const a={class:"span"};function i(e,t,o,i,l,c){const r=(0,s.up)("selector-vue");return o.show?((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,n.C_)(["bottom",{blur:o.blur}])},[o.previous?((0,s.wg)(),(0,s.iD)("button",{key:0,onClick:t[0]||(t[0]=e=>c.changePage(o.page-1)),class:"btn previous"},(0,n.zw)("<"))):(0,s.kq)("",!0),(0,s._)("div",a,(0,n.zw)(o.page),1),o.next?((0,s.wg)(),(0,s.iD)("button",{key:1,onClick:t[1]||(t[1]=e=>c.changePage(o.page+1)),class:"btn next"},(0,n.zw)(">"))):(0,s.kq)("",!0),(0,s.Wm)(r,{class:"count",options_props:l.count_values,selected_option:{name:o.count,value:-1},onSelect:c.change_count},null,8,["options_props","selected_option","onSelect"])],2)):(0,s.kq)("",!0)}var l=o(4469),c={components:{SelectorVue:l.Z},props:{previous:{type:Boolean,required:!0},next:{type:Boolean,required:!0},page:{type:Number,required:!0},count:{type:Number,required:!0},blur:{type:Boolean,required:!1,default:!1},show:{type:Boolean,required:!0}},emits:{changePage:null,changeCount:null},data(){return{count_values:[]}},async mounted(){await this.$store.dispatch("get_account"),this.$store.state.account.user.config.per_pages&&(this.count_values=[...this.$store.state.account.user.config.per_pages].map(((e,t)=>({name:e,value:t}))))},computed:{},methods:{changePage(e){this.$emit("changePage",e)},change_count(e){console.log(e),this.$emit("changeCount",e.name)}}},r=o(3744);const u=(0,r.Z)(c,[["render",i],["__scopeId","data-v-f9e85040"]]);var d=u},4469:function(e,t,o){o.d(t,{Z:function(){return _}});var s=o(6252),n=o(3577),a=o(9963);const i={class:"v-select"},l={class:"options",key:"a1"},c=["onClick"];function r(e,t,o,r,u,d){return(0,s.wg)(),(0,s.iD)("div",i,[(0,s._)("div",{class:(0,n.C_)(["title",{title_checked:r.show_options,disabled:o.disabled}]),onClick:t[0]||(t[0]=e=>r.open_close_options()),onFocusout:t[1]||(t[1]=(...e)=>r.handleFocusOut&&r.handleFocusOut(...e)),tabindex:"0"},[(0,s._)("p",null,(0,n.zw)(o.selected_option.name),1),o.disabled?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",{key:0,class:(0,n.C_)(["arrow",{rotate_arrow:r.show_options}])},null,2))],34),(0,s.Wm)(a.uT,{name:"list"},{default:(0,s.w5)((()=>[r.show_options?((0,s.wg)(),(0,s.iD)("div",l,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.options,(e=>((0,s.wg)(),(0,s.iD)("p",{key:e.value,class:(0,n.C_)({optgroup:"optgroup"===e.value}),onClick:t=>r.select_option(e)},[e.optgroup?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s.Uk)("     "+(0,n.zw)(e.name),1)],64)):((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s.Uk)((0,n.zw)(e.name),1)],64))],10,c)))),128))])):(0,s.kq)("",!0)])),_:1})])}var u=o(2262),d={props:{options_props:{type:Array,default(){return[]},required:!0},selected_option:{type:Object,required:!0,default(){return{}}},disabled:{type:Boolean,required:!1,default:!1},idx:{type:Number,required:!1}},emits:{select:null},setup(e,{emit:t}){const o=(0,u.iH)([]);(0,s.bv)((()=>{(0,s.Y3)((()=>{n()}))}));const n=()=>{o.value=[],e.options_props?.forEach((e=>o.value.push(e)))};(0,s.YP)((()=>e.options_props),(()=>{n()}),{deep:!0});const a=(0,u.iH)(!1),i=()=>{a.value=!1},l=()=>{e.disabled||(a.value=!a.value)},c=()=>{i()},r=o=>{"optgroup"!=o.value&&(t("select",o,e.idx),i())};return{open_close_options:l,handleFocusOut:c,show_options:a,options:o,select_option:r}}},p=o(3744);const g=(0,p.Z)(d,[["render",r],["__scopeId","data-v-a0cfd498"]]);var _=g},5550:function(e,t,o){o.r(t),o.d(t,{default:function(){return H}});var s=o(6252),n=o(3577);const a={class:"app"},i={class:"header"},l={class:"btns"},c=["onClick"],r={class:"content"},u={class:"top"};function d(e,t,o,d,p,g){const _=(0,s.up)("archive-grid");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s._)("div",i,[(0,s._)("div",l,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.catalog,(t=>((0,s.wg)(),(0,s.iD)("button",{class:(0,n.C_)(["btns_btn",{selected_catalog:e.$route.name===t.value}]),onClick:e=>g.route(t.value),key:t},(0,n.zw)(t.name),11,c)))),128))])]),(0,s._)("div",r,[(0,s._)("div",u,[(0,s._)("p",null,"Найдено: "+(0,n.zw)(g.coun_archive),1)]),(0,s.Wm)(_)])])}var p=o(9963);const g=e=>((0,s.dD)("data-v-94305b10"),e=e(),(0,s.Cn)(),e),_={key:0,class:"text"},h={key:1,class:"table"},v={class:"row title"},w=g((()=>(0,s._)("td",{class:"item"},null,-1))),m={class:"item"},b=["onClick"];function k(e,t,o,a,i,l){const c=(0,s.up)("grid-bottom");return(0,s.wg)(),(0,s.iD)(s.HY,null,[0==l.archive_list.length?((0,s.wg)(),(0,s.iD)("label",_," Ничего не найдено ")):((0,s.wg)(),(0,s.iD)("table",h,[(0,s._)("thead",null,[(0,s._)("tr",v,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.all_fields,(e=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("td",{key:e.id,class:"item"},(0,n.zw)(e.name),1)),[[p.F8,e?.table_config.visible]]))),128)),w])]),(0,s._)("tbody",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.archive_list,(e=>((0,s.wg)(),(0,s.iD)("tr",{key:e.id,class:"row"},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(l.all_fields,(t=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("td",{key:t,class:"item"},(0,n.zw)(e.fields[t.code]),1)),[[p.F8,t?.table_config.visible]]))),128)),(0,s._)("td",m,[(0,s._)("div",{class:"edit_icon",onClick:t=>l.unarchive_data(e)},null,8,b)])])))),128))])])),(0,s.Wm)(c,{previous:null!=l.meta.links.prev,next:null!=l.meta.links.next,page:l.meta.meta.current_page,show:0!=l.archive_list.length,count:l.meta.meta.per_page,onChangePage:l.changePage,onChangeCount:l.changeCount},null,8,["previous","next","page","show","count","onChangePage","onChangeCount"])],64)}var f=o(3026),y={components:{GridBottom:f.Z},data(){return{isLoading:!1}},mounted(){this.$store.dispatch("get_all_fields"),this.$store.dispatch("get_products",{is_archive:1})},computed:{meta(){return this.$store.state.products.meta},all_fields(){return this.$store.state.fields.all_fields},archive_list(){return this.$store.state.products.products}},watch:{},methods:{changeCount(e){this.count=e},changePage(e){this.page=e},async unarchive_data(e){if(!this.isLoading){this.isLoading=!0;const t={id:e.id,fields:e.fields,is_archive:0};await this.$store.dispatch("update_product",t),await this.$store.dispatch("get_products",{is_archive:1}),this.isLoading=!1}}}},C=o(3744);const D=(0,C.Z)(y,[["render",k],["__scopeId","data-v-94305b10"]]);var q=D,$=o(3907),x={name:"ArchiveView",components:{ArchiveGrid:q},computed:{...(0,$.Se)(["catalog"]),coun_archive(){return this.$store.state.products.products.length}},methods:{route(e){this.$router.push("/"+e)}}};const z=(0,C.Z)(x,[["render",d],["__scopeId","data-v-671b2b9e"]]);var H=z}}]);
//# sourceMappingURL=550.b47c5e18.js.map