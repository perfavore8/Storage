"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[899],{2357:function(e,a,t){t.d(a,{Z:function(){return r}});var s=t(3396);function n(e,a,t,n,c,o){const l=(0,s.up)("NavBar"),i=(0,s.up)("HomeMenu"),d=(0,s.up)("HomeModals");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("header",null,[(0,s.Wm)(l),(0,s.Wm)(i)]),(0,s.Wm)(d,{selectedWH:t.selectedWH},null,8,["selectedWH"])],64)}var c=t(6833),o=t(1624),l=t(2145),i={components:{NavBar:c.Z,HomeMenu:o.Z,HomeModals:l.Z},props:{selectedWH:{type:Object,required:!1}},setup(){}},d=t(89);const u=(0,d.Z)(i,[["render",n],["__scopeId","data-v-3b484666"]]);var r=u},2899:function(e,a,t){t.r(a),t.d(a,{default:function(){return j}});var s=t(3396),n=t(7139),c=t(9242);const o={class:"app"},l={class:"header"},i={class:"top"},d={class:"bottom"},u={class:"content"},r={key:0},p={key:0,class:"autorization"},_={class:"row"},m=(0,s.Uk)(" Genezis активирован. "),v={key:1,class:"autorization"},g=(0,s.Uk)(" Genezis не активирован. "),b=["src"];function h(e,a,t,h,f,y){const w=(0,s.up)("AppHeader");(0,s.up)("GenezisSettings"),(0,s.up)("BtnsSaveClose");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",l,[(0,s._)("div",i,[(0,s.Wm)(w)]),(0,s._)("div",d,[(0,s._)("button",{class:(0,n.C_)(["btn",{btn_grey:1==f.selectedTab}]),onClick:a[0]||(a[0]=e=>f.selectedTab=1)}," Настройки Интеграции с 1С-Генезис ",2),y.account?.config?.g_enabled&&y.account?.g_url?((0,s.wg)(),(0,s.iD)("button",{key:0,class:(0,n.C_)(["btn",{btn_grey:2==f.selectedTab}]),onClick:a[1]||(a[1]=e=>f.selectedTab=2)}," Настройки «Генезис: 1С интеграция» ",2)):(0,s.kq)("",!0)])]),(0,s._)("div",u,[1==f.selectedTab?((0,s.wg)(),(0,s.iD)("div",r,[y.account?.config?.g_enabled?((0,s.wg)(),(0,s.iD)("div",p,[(0,s._)("div",_,[m,(0,s._)("button",{class:"btn btn_yellow",onClick:a[2]||(a[2]=e=>y.unAutorization())}," Выключить ")]),(0,s.kq)("",!0)])):((0,s.wg)(),(0,s.iD)("div",v,[g,(0,s._)("button",{class:"btn btn_yellow",onClick:a[3]||(a[3]=e=>y.autorization())}," Включить ")]))])):(0,s.kq)("",!0),(0,s.wy)((0,s._)("div",null,[(0,s._)("iframe",{name:"genezis",frameborder:"0",class:"frame",src:y.account?.g_url},null,8,b)],512),[[c.F8,2==f.selectedTab]])])])}var f=t(65),y=t(2357);const w={class:"wrapper"},D={class:"steps"};function S(e,a,t,c,o,l){const i=(0,s.up)("SelectorVue");return(0,s.wg)(),(0,s.iD)("div",w,[(0,s._)("h6",null,(0,n.zw)(t.label),1),(0,s._)("div",D,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(c.copyLeadsDeals,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"label_input",key:e},[(0,s._)("label",null,' Поле "'+(0,n.zw)(e?.name)+'" ',1),(0,s.Wm)(i,{options_props:c.copyLeadsDealsList,onSelect:a=>c.optionSelectLeadsDeals(a,e?.code),selected_option:e?.selected},null,8,["options_props","onSelect","selected_option"])])))),128))])])}var k=t(4870),z=t(7720),Z=t(9299),H={components:{SelectorVue:z.Z},props:{label:String,leadsDeals:Array,needSave:Boolean},setup(e){const a=(0,k.qj)([]),t=(0,k.qj)([]);let n={};const c=(0,s.Fl)((()=>e.needSave));(0,s.YP)(c,(()=>e.needSave?r():null));const o=(0,s.Fl)((()=>{const e=[];return Object.entries(Z.Z.state.account.leadFieldsList).map((a=>{const t=[];Object.entries(a[1].fields).forEach((e=>t.push({name:e[1],value:e[0]}))),a[1].fields=t,a[1].fields.unshift({name:"Не выбрано",value:-1}),a[1].selected={name:"Не выбрано",value:-1},e.push({value:a[0],...a[1]})})),e})),l=()=>{t.push({name:"Не выбрано",value:-1}),o.value.forEach((e=>{const a=e.name;t.push({name:a,value:"optgroup"});const s=e.fields.splice(1,999);s.forEach((e=>t.push({...e,optgroup:!0})))}))},i=()=>{a.map((e=>{e.selected=d(n[e.code],t,"value")}))},d=(e,a,t)=>{let s={name:"Не выбрано",value:-1};return a.forEach((a=>{a[t]==e&&(s=a)})),s},u=(e,t)=>{-1==e.value?n[t]="0":n[t]=e.value,a.map((a=>{a.code==t&&(a.selected=e)}))},r=()=>{const e={};a.forEach((a=>{-1!=a.selected.value&&(e[a.code]=a.selected.value)})),Z.Z.dispatch("update_account",e)};return(0,s.bv)((async()=>{await Promise.all([Z.Z.dispatch("get_account"),Z.Z.dispatch("getLeadFieldsList")]),n=JSON.parse(JSON.stringify(Z.Z.state.account.account.config)),Object.assign(a,e.leadsDeals),l(),i()})),{copyLeadsDeals:a,copyLeadsDealsList:t,optionSelectLeadsDeals:u}}},L=t(89);const C=(0,L.Z)(H,[["render",S],["__scopeId","data-v-6a56a028"]]);var W=C,E=t(4038),T={name:"InstructionsView",components:{AppHeader:y.Z,GenezisSettings:W,BtnsSaveClose:E.Z},data(){return{selectedTab:1,needSave:!1,genezisSettingsData:[{label:"Привязка полей компании",leadsDeals:[{name:"Название",code:"g_company_field_name"},{name:"Инн",code:"g_company_field_inn"},{name:"КПП",code:"g_company_field_kpp"},{name:"ОГРН",code:"g_company_field_ogrn"}]},{label:"Привязка полей аккаунта",leadsDeals:[{name:"Название",code:"g_company_field_account_name"},{name:"Корреспондентский счет",code:"g_company_field_account_correspondent"},{name:"Бик банка",code:"g_company_field_account_bic"},{name:"Расчетный счет",code:"g_company_field_account_settlement"}]}]}},mounted(){this.$store.dispatch("get_account")},computed:{...(0,f.Se)(["catalog"]),account(){return this.$store.state.account.account}},methods:{async unAutorization(){await this.$store.dispatch("genezisEnableDisable","disable"),this.$store.dispatch("get_account")},async autorization(){await this.$store.dispatch("genezisEnableDisable","enable"),this.$store.dispatch("get_account")},save(){this.needSave=!0,(0,s.Y3)((()=>this.needSave=!1))},route(e){this.$router.push("/"+e)}}};const $=(0,L.Z)(T,[["render",h],["__scopeId","data-v-692cdbe9"]]);var j=$}}]);
//# sourceMappingURL=899.a6e69d55.js.map