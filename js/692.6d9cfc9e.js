"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[692],{9935:function(e,t,s){s.d(t,{Z:function(){return v}});var o=s(6252),n=s(3577),l=s(9963);const a={class:"v-select"},i={class:"options",key:"a1"},c=["onClick"];function d(e,t,s,d,u,_){return(0,o.wg)(),(0,o.iD)("div",a,[(0,o._)("div",{class:(0,n.C_)(["title",{title_checked:d.show_options,disabled:s.disabled}]),onClick:t[0]||(t[0]=e=>d.open_close_options()),onFocusout:t[1]||(t[1]=(...e)=>d.handleFocusOut&&d.handleFocusOut(...e)),tabindex:"0"},[(0,o._)("p",null,(0,n.zw)(s.selected_option.name),1),s.disabled?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,n.C_)(["arrow",{rotate_arrow:d.show_options}])},null,2))],34),(0,o.Wm)(l.uT,{name:"list"},{default:(0,o.w5)((()=>[d.show_options?((0,o.wg)(),(0,o.iD)("div",i,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.options,(e=>((0,o.wg)(),(0,o.iD)("p",{key:e.value,onClick:t=>d.select_option(e)},(0,n.zw)(e.name),9,c)))),128))])):(0,o.kq)("",!0)])),_:1})])}var u=s(2262),_={props:{options_props:{type:Array,default(){return[]},required:!0},selected_option:{type:Object,required:!0,default(){return{}}},disabled:{type:Boolean,required:!1,default:!1},idx:{type:Number,required:!1}},emits:{select:null},setup(e,{emit:t}){const s=(0,u.iH)([]);(0,o.bv)((()=>{s.value=[],e.options_props.forEach((e=>s.value.push(e)))}));const n=(0,u.iH)(!1),l=()=>{n.value=!1},a=()=>{e.disabled||(n.value=!n.value)},i=()=>{l()},c=s=>{t("select",s,e.idx),l()};return{open_close_options:a,handleFocusOut:i,show_options:n,options:s,select_option:c}}},r=s(3744);const p=(0,r.Z)(_,[["render",d],["__scopeId","data-v-6e6fe5a6"]]);var v=p},7692:function(e,t,s){s.r(t),s.d(t,{default:function(){return X}});var o=s(6252);function n(e,t,s,n,l,a){const i=(0,o.up)("document-setting");return(0,o.wg)(),(0,o.j4)(i)}var l=s(3577);const a=e=>((0,o.dD)("data-v-136e4b3e"),e=e(),(0,o.Cn)(),e),i={class:"app"},c={class:"container"},d={class:"header"},u={class:"left"},_=a((()=>(0,o._)("div",{class:"title"},"Настройки документов",-1))),r={class:"autorization"},p=a((()=>(0,o._)("button",null,"Выйти",-1))),v=a((()=>(0,o._)("div",{class:"right"},[(0,o._)("button")],-1))),m={class:"content"},b={class:"binding"},w=a((()=>(0,o._)("div",{class:"header"},"Привязка полей документов",-1))),g={class:"main"},h=a((()=>(0,o._)("label",null,'Поле "Документы"',-1))),k={class:"patterns"},f=a((()=>(0,o._)("div",{class:"header"},[(0,o._)("div",null,"Шаблоны документов"),(0,o._)("div",{class:"small"}," Файлы шаблонов должны быть доступны для чтения по ссылке ")],-1))),D={class:"main"},y={class:"table"},C={class:"row title"},z=a((()=>(0,o._)("td",{class:"item"},null,-1))),S={class:"item"},q={class:"item"},H={class:"item"},j={href:"https://docs.google.com/spreadsheets/d/13U76ujSjV_iaY0L2WBVHVw7q07TSEqstuL0kSeX-Sh8/edit"},O={class:"item"},V={class:"item"},Z=a((()=>(0,o._)("td",{class:"item"},[(0,o._)("div",{class:"btns"},[(0,o._)("button",{class:"btn_edit"},[(0,o._)("div",{class:"icon"})]),(0,o._)("button",{class:"btn_del"},[(0,o._)("div",{class:"icon"})])])],-1))),F={class:"add_button_container"},I=a((()=>(0,o._)("div",{class:"icon"},null,-1))),Y=[I],x={class:"footer"},K={class:"btns"};function W(e,t,s,n,a,I){const W=(0,o.up)("SelectorVue");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",c,[(0,o._)("div",d,[(0,o._)("div",u,[_,(0,o._)("div",r,[(0,o.Uk)(' Вы авторизированы в сервисе Google Drive как "'+(0,l.zw)(a.name)+'". ',1),p])]),v]),(0,o._)("div",m,[(0,o._)("div",b,[w,(0,o._)("div",g,[h,(0,o.Wm)(W,{options_props:a.options,onSelect:I.option_select,selected_option:a.selected_option},null,8,["options_props","onSelect","selected_option"])])]),(0,o._)("div",k,[f,(0,o._)("div",D,[(0,o._)("table",y,[(0,o._)("thead",null,[(0,o._)("tr",C,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(a.title,(e=>((0,o.wg)(),(0,o.iD)("td",{class:"item",key:e},(0,l.zw)(e),1)))),128)),z])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.documents,(e=>((0,o.wg)(),(0,o.iD)("tr",{class:"row",key:e},[(0,o._)("td",S,(0,l.zw)(e.name),1),(0,o._)("td",q,(0,l.zw)(e.serviceID),1),(0,o._)("td",H,[(0,o._)("a",j,(0,l.zw)(e.gauge),1)]),(0,o._)("td",O,(0,l.zw)(e.gouge_type),1),(0,o._)("td",V,(0,l.zw)(e.download_type),1),Z])))),128))])]),(0,o._)("div",F,[(0,o._)("button",{class:"add_new_button",onClick:t[0]||(t[0]=t=>e.push_new_item())},Y)])])])]),(0,o._)("div",x,[(0,o._)("div",K,[(0,o._)("button",{class:"btn btn1",onClick:t[1]||(t[1]=t=>e.close_modal())},"Отмена"),(0,o._)("button",{class:"btn btn2",onClick:t[2]||(t[2]=t=>e.save())},"Сохранить")])])])])}var B=s(9935),E=s(3907),G={components:{SelectorVue:B.Z},data(){return{name:"Дмитрий Ивлев",title:["Название","Google ID файла","Шаблон","Тип шаблона","Тип для скачивания"],options:[{name:"Не выбрано",value:1},{name:"Прибыль",value:2},{name:"Бюджет общий",value:3}],selected_option:{name:"Не выбрано",value:1}}},computed:{...(0,E.Se)(["documents"])},methods:{option_select(e){Object.assign(this.selected_option,e)}}},L=s(3744);const T=(0,L.Z)(G,[["render",W],["__scopeId","data-v-136e4b3e"]]);var U=T,A={components:{DocumentSetting:U}};const N=(0,L.Z)(A,[["render",n]]);var X=N}}]);
//# sourceMappingURL=692.6d9cfc9e.js.map