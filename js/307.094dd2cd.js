"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[307],{8513:function(e,t,s){s.d(t,{Z:function(){return p}});var o=s(6252);const l={class:"btns"},i=(0,o.Uk)("Отмена"),n=(0,o.Uk)("Сохранить");function c(e,t,s,c,a,d){return(0,o.wg)(),(0,o.iD)("div",l,[s.show_close?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"btn btn1",onClick:t[0]||(t[0]=e=>d.close())},[(0,o.WI)(e.$slots,"close",{},(()=>[i]),!0)])):(0,o.kq)("",!0),(0,o.WI)(e.$slots,"other_btns",{},void 0,!0),s.show_save?((0,o.wg)(),(0,o.iD)("button",{key:1,class:"btn btn2",onClick:t[1]||(t[1]=e=>d.save())},[(0,o.WI)(e.$slots,"save",{},(()=>[n]),!0)])):(0,o.kq)("",!0)])}var a={props:{show_close:{type:Boolean,required:!1,default(){return!0}},show_save:{type:Boolean,required:!1,default(){return!0}}},emits:{close:null,save:null},methods:{close(){this.$emit("close")},save(){this.$emit("save")}}},d=s(3744);const _=(0,d.Z)(a,[["render",c],["__scopeId","data-v-fcfb56ae"]]);var p=_},8307:function(e,t,s){s.d(t,{Z:function(){return Je}});var o=s(6252),l=s(3577),i=s(9963);const n=e=>((0,o.dD)("data-v-2128e674"),e=e(),(0,o.Cn)(),e),c={key:0},a={key:1},d={class:"container"},_={class:"header"},p={class:"left"},r=n((()=>(0,o._)("div",{class:"title"},"Настройки документов",-1))),u={class:"autorization"},h=n((()=>(0,o._)("button",null,"Выйти",-1))),m={class:"right"},v={class:"modal_settings"},f={class:"content"},g={class:"binding"},w=n((()=>(0,o._)("div",{class:"header"},"Привязка полей документов",-1))),b={class:"main"},y={class:"label_select"},k=n((()=>(0,o._)("label",null,'Поле "Документы"',-1))),D={class:"label_select"},C=n((()=>(0,o._)("label",null,"Поряд имен контактов",-1))),S={class:"patterns"},$=n((()=>(0,o._)("div",{class:"header"},[(0,o._)("div",null,"Шаблоны документов"),(0,o._)("p",{class:"small"}," Файлы шаблонов должны быть доступны для чтения по ссылке. Google ID файла это часть ссылки на файл Пример ссылки: https://docs.google.com/spreadsheets/d/1XdXdEMtUFa8V__UK234432Dpx5-CeI/edit#gid=0, где Google ID файла: 1XdXdEMtUFa8V__UK234432Dpx5-CeI Вместо Google ID файла допускается ввод полного адреса ")],-1))),j={class:"main"},O={class:"table"},x={class:"row title"},q=n((()=>(0,o._)("td",{class:"item"},null,-1))),E={class:"add_button_container"},I=n((()=>(0,o._)("div",{class:"icon"},null,-1))),W=[I],F={class:"footer"},U=(0,o.Uk)("Назад");function Z(e,t,s,n,I,Z){const z=(0,o.up)("document-setting-add-new"),Y=(0,o.up)("document-setting-fields"),H=(0,o.up)("SelectorVue"),V=(0,o.up)("document-setting-doc-row"),K=(0,o.up)("btns-save-close");return(0,o.wg)(),(0,o.iD)(o.HY,null,[I.showAddNew?((0,o.wg)(),(0,o.j4)(z,{key:0,cur_doc:I.cur_doc,id:I.selected_doc_id,onClose:Z.close_add_new,onSave_new_doc:e.save_new_doc,onSave_cur_doc:e.save_cur_doc},{title:(0,o.w5)((()=>[null===I.selected_doc_id?((0,o.wg)(),(0,o.iD)("span",c," Добавление шаблона документов ")):(0,o.kq)("",!0),null!==I.selected_doc_id?((0,o.wg)(),(0,o.iD)("span",a," Редактирование шаблона документов ")):(0,o.kq)("",!0)])),_:1},8,["cur_doc","id","onClose","onSave_new_doc","onSave_cur_doc"])):(0,o.kq)("",!0),I.showFields?((0,o.wg)(),(0,o.j4)(Y,{key:1,onClose:Z.close_fields},null,8,["onClose"])):(0,o.kq)("",!0),(0,o._)("div",{class:"app",ref:"app",onClick:t[4]||(t[4]=e=>I.show_settings?Z.close_settings():null)},[(0,o._)("div",d,[(0,o._)("div",_,[(0,o._)("div",p,[r,(0,o._)("div",u,[(0,o.Uk)(' Вы авторизированы в сервисе Google Drive как "'+(0,l.zw)(I.name)+'". ',1),h])]),(0,o._)("div",m,[(0,o._)("button",{class:"settings_btn",onClick:t[0]||(t[0]=(0,i.iM)((e=>Z.open_close_settings()),["stop"]))}),(0,o.Wm)(i.uT,{name:"modal"},{default:(0,o.w5)((()=>[(0,o.wy)((0,o._)("div",v,[(0,o._)("a",null,[(0,o._)("div",{class:"modal_container",onClick:t[1]||(t[1]=e=>Z.open_fields())}," Поля шаблонов ")]),(0,o._)("a",null,[(0,o._)("div",{class:"modal_container",onClick:t[2]||(t[2]=e=>Z.refresh_fields())}," Обновить поля шаблонов ")])],512),[[i.F8,I.show_settings]])])),_:1})])]),(0,o._)("div",f,[(0,o._)("div",g,[w,(0,o._)("div",b,[(0,o._)("div",y,[k,(0,o.Wm)(H,{options_props:I.lead_fields_options,onSelect:Z.lead_fields_select,selected_option:I.lead_fields},null,8,["options_props","onSelect","selected_option"])]),(0,o._)("div",D,[C,(0,o.Wm)(H,{options_props:I.contact_name_types_options,onSelect:Z.contact_name_types_select,selected_option:I.contact_name_types},null,8,["options_props","onSelect","selected_option"])])])]),(0,o._)("div",S,[$,(0,o._)("div",j,[(0,o._)("table",O,[(0,o._)("thead",null,[(0,o._)("tr",x,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(I.title,(e=>((0,o.wg)(),(0,o.iD)("td",{class:"item",key:e},(0,l.zw)(e),1)))),128)),q])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Z.documents_templates,(t=>((0,o.wg)(),(0,o.j4)(V,{key:t.id,doc:t,onOpen_edit:Z.open_edit,onDelete_cur_doc:e.delete_cur_doc},null,8,["doc","onOpen_edit","onDelete_cur_doc"])))),128))])]),(0,o._)("div",E,[(0,o._)("button",{class:"add_new_button",onClick:t[3]||(t[3]=e=>Z.open_add_new())},W)])])])]),(0,o._)("div",F,[(0,o.Wm)(K,{onClose:Z.close,show_save:!1},{close:(0,o.w5)((()=>[U])),_:1},8,["onClose"])])])],512)],64)}var z=s(1901);const Y=e=>((0,o.dD)("data-v-450788e8"),e=e(),(0,o.Cn)(),e),H={class:"app_new"},V={class:"container"},K={class:"header"},A={class:"content"},N={class:"label_input"},B=Y((()=>(0,o._)("label",{class:"label"},"Название:",-1))),G={class:"label_input"},X=Y((()=>(0,o._)("label",{class:"label"},"Google ID файла:",-1))),T={class:"label_input"},L=Y((()=>(0,o._)("label",{class:"label"},"Этап авто-генерации:",-1))),M={class:"label_input"},P=Y((()=>(0,o._)("label",{class:"label"},"Url последнего документа:",-1))),R={class:"label_input"},J=Y((()=>(0,o._)("label",{class:"label"},"Тип шаблона:",-1))),Q={class:"label_input"},ee=Y((()=>(0,o._)("label",{class:"label"},"Тип для скачивания:",-1))),te={class:"footer"};function se(e,t,s,n,c,a){const d=(0,o.up)("selector-vue"),_=(0,o.up)("btns-save-close");return(0,o.wg)(),(0,o.iD)("div",H,[(0,o._)("div",V,[(0,o._)("div",K,[(0,o.WI)(e.$slots,"title",{},void 0,!0)]),(0,o._)("div",A,[(0,o._)("div",N,[B,(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>c.name=e),class:(0,l.C_)(["input",{not_valid:c.try_accept&&""==c.name}])},null,2),[[i.nr,c.name]])]),(0,o._)("div",G,[X,(0,o.wy)((0,o._)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=e=>c.file=e),class:(0,l.C_)(["input",{not_valid:c.try_accept&&""==c.file}])},null,2),[[i.nr,c.file]])]),(0,o._)("div",T,[L,(0,o.Wm)(d,{options_props:c.pipelines_options,onSelect:a.select_pipelines_option,selected_option:c.status_id},null,8,["options_props","onSelect","selected_option"])]),(0,o._)("div",M,[P,(0,o.Wm)(d,{options_props:c.lead_fields_options,onSelect:a.select_url_field,selected_option:c.url_field},null,8,["options_props","onSelect","selected_option"])]),(0,o._)("div",R,[J,(0,o.Wm)(d,{options_props:c.type_options,onSelect:a.option_select1,selected_option:c.type},null,8,["options_props","onSelect","selected_option"])]),(0,o._)("div",Q,[ee,(0,o.Wm)(d,{options_props:c.export_type_options,onSelect:a.option_select2,selected_option:c.export_type},null,8,["options_props","onSelect","selected_option"])])]),(0,o._)("div",te,[(0,o.Wm)(_,{onClose:a.close_modal,onSave:a.save},null,8,["onClose","onSave"])])])])}var oe=s(8513),le={components:{SelectorVue:z.Z,BtnsSaveClose:oe.Z},props:{cur_doc:{type:Object,required:!1,default(){return{}}},id:{type:Number,required:!1,default(){return null}}},emits:{close:null},data(){return{type_options:[],type:{name:"docx",value:1},export_type_options:[],export_type:{name:"Исходный",value:1},pipelines_options:[],lead_fields_options:[],try_accept:!1,name:"",file:"",status_id:{name:"Не выбрано",value:1},url_field:{name:"Не выбрано",value:1}}},mounted(){this.$store.state.documents.config.types.forEach(((e,t)=>this.type_options.push({name:e,value:t}))),this.$store.state.documents.config.export_type.forEach(((e,t)=>this.export_type_options.push({name:e,value:t}))),this.set_pipelines_options(),this.set_lead_fields_options(),(0,o.Y3)((()=>this.add_cur_doc()))},methods:{save(){if(this.try_accept=!0,""!=this.name&&""!=this.file){const e={name:this.name,file:this.file,type:this.type.name,export_type:this.export_type.name,status_id:this.status_id.value,url_field:this.url_field.value};Object.keys(this.cur_doc).length>0?this.$store.dispatch("update_template",{...e,id:this.id}):this.$store.dispatch("add_template",e),this.close_modal()}},close_modal(){this.$emit("close")},option_select1(e){Object.assign(this.type,e)},option_select2(e){Object.assign(this.export_type,e)},select_pipelines_option(e){Object.assign(this.status_id,e)},select_url_field(e){Object.assign(this.url_field,e)},add_cur_doc(){if(Object.keys(this.cur_doc).length>0){this.name=this.cur_doc.name,this.file=this.cur_doc.file;const e=(e,t,s)=>{let o={};return e.forEach((e=>{e[s]==t&&Object.assign(o,e)})),o};this.type=e(this.type_options,this.cur_doc.type,"name"),this.status_id=e(this.pipelines_options,this.cur_doc.status_id,"value"),this.url_field=e(this.lead_fields_options,this.cur_doc.url_field,"value"),this.export_type=e(this.export_type_options,this.cur_doc.export_type,"name")}},set_pipelines_options(){const e=Object.entries(this.$store.state.documents.config.pipelines);e.forEach((e=>{const t=e[0],s=e[1].name;this.pipelines_options.push({name:s,value:"optgroup"});const o=Object.entries(e[1].statuses);o.forEach((e=>this.pipelines_options.push({name:e[1],value:t+"_"+e[0],optgroup:!0})))}))},set_lead_fields_options(){const e=Object.entries(this.$store.state.documents.config.lead_fields);e.forEach((e=>{const t=e[0];this.lead_fields_options.push({name:t,value:"optgroup"});const s=Object.entries(e[1]);s.forEach((e=>this.lead_fields_options.push({name:e[1],value:e[0],optgroup:!0})))}))}}},ie=s(3744);const ne=(0,ie.Z)(le,[["render",se],["__scopeId","data-v-450788e8"]]);var ce=ne;const ae=e=>((0,o.dD)("data-v-73b0f559"),e=e(),(0,o.Cn)(),e),de={class:"app_fileds"},_e={class:"container"},pe={class:"header"},re=ae((()=>(0,o._)("div",{class:"left"},[(0,o._)("label",null,"Поля для шаблонов документов")],-1))),ue={class:"right"},he=ae((()=>(0,o._)("div",{class:"icon"},null,-1))),me=[he],ve={class:"content"},fe={class:"top"},ge=["onClick"],we={class:"bottom"},be={class:"footer"};function ye(e,t,s,i,n,c){const a=(0,o.up)("document-setting-fileds-list");return(0,o.wg)(),(0,o.iD)("div",de,[(0,o._)("div",_e,[(0,o._)("div",pe,[re,(0,o._)("div",ue,[(0,o._)("button",{class:"btn_del",onClick:t[0]||(t[0]=e=>c.close())},me)])]),(0,o._)("div",ve,[(0,o._)("div",fe,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(n.tpl_fields,(e=>((0,o.wg)(),(0,o.iD)("div",{key:e,onClick:t=>c.select_catalog(e),class:(0,l.C_)(["title",{selected:e.name==n.selected_catalog}])},(0,l.zw)(e.name),11,ge)))),128))]),(0,o._)("div",we,[(0,o.Wm)(a,{list:n.list},null,8,["list"])])]),(0,o._)("div",be,[(0,o._)("button",{class:"btn btn1",onClick:t[1]||(t[1]=e=>c.close())},"Назад")])])])}const ke={class:"list"},De={class:"title"},Ce={class:"fields"},Se=["onClick"];function $e(e,t,s,n,c,a){return(0,o.wg)(),(0,o.iD)("div",ke,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(s.list,(e=>((0,o.wg)(),(0,o.iD)("div",{class:"row",key:e},[(0,o._)("div",De,(0,l.zw)(e.title),1),(0,o._)("div",Ce,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.fields,(e=>((0,o.wg)(),(0,o.iD)("button",{class:"field",key:e,onClick:t=>a.copy(e.value)},(0,l.zw)(e.name),9,Se)))),128)),(0,o.wy)((0,o._)("span",null,null,512),[[i.F8,!1]])])])))),128))])}var je={props:{list:{type:Array,required:!0,default(){return[]}}},methods:{copy(e){navigator.clipboard.writeText(e).then((()=>{alert("Текст скопирован удачно")})).catch((()=>{alert("Текст не скопирован автоматически :с\nПопробуйте вручную")}))}}};const Oe=(0,ie.Z)(je,[["render",$e],["__scopeId","data-v-0b4b3b86"]]);var xe=Oe,qe={emits:{close:null},components:{DocumentSettingFiledsList:xe},data(){return{selected_catalog:"",list:[],tpl_fields:[]}},mounted(){const e=Object.entries(this.$store.state.documents.config.tpl_fields);e.forEach((e=>{const t={name:e[0],fields:[]};Object.entries(e[1]).forEach((e=>{const s={title:e[0],fields:[]};Object.entries(e[1]).forEach((e=>{const t={name:e[1],value:e[0]};s.fields.push(t)})),t.fields.push(s)})),this.tpl_fields.push(t)})),this.tpl_fields[0].name&&this.select_catalog(this.tpl_fields[0])},methods:{select_catalog(e){this.selected_catalog=e.name,this.list=e.fields},close(){this.$emit("close")}}};const Ee=(0,ie.Z)(qe,[["render",ye],["__scopeId","data-v-73b0f559"]]);var Ie=Ee;const We=e=>((0,o.dD)("data-v-2acdcfa1"),e=e(),(0,o.Cn)(),e),Fe={class:"row"},Ue={class:"item"},Ze={class:"item"},ze=We((()=>(0,o._)("td",{class:"item"},[(0,o._)("a",{href:"https://docs.google.com/spreadsheets/d/13U76ujSjV_iaY0L2WBVHVw7q07TSEqstuL0kSeX-Sh8/edit"},"Шаблон")],-1))),Ye={class:"item"},He={class:"item"},Ve={class:"item"},Ke={class:"btns"},Ae=We((()=>(0,o._)("div",{class:"icon"},null,-1))),Ne=[Ae],Be=We((()=>(0,o._)("div",{class:"icon"},null,-1))),Ge=[Be];function Xe(e,t,s,i,n,c){return(0,o.wg)(),(0,o.iD)("tr",Fe,[(0,o._)("td",Ue,(0,l.zw)(s.doc.name),1),(0,o._)("td",Ze,(0,l.zw)(s.doc.file),1),ze,(0,o._)("td",Ye,(0,l.zw)(s.doc.type),1),(0,o._)("td",He,(0,l.zw)(s.doc.export_type),1),(0,o._)("td",Ve,[(0,o._)("div",Ke,[(0,o._)("button",{class:"btn_edit",onClick:t[0]||(t[0]=e=>c.open_edit(s.doc))},Ne),(0,o._)("button",{class:"btn_del",onClick:t[1]||(t[1]=e=>c.delete_cur_doc(s.doc.id))},Ge)])])])}var Te={props:{doc:{type:Object,required:!0}},emits:{open_edit:null,delete_cur_doc:null},methods:{open_edit(e){this.$emit("open_edit",e)},delete_cur_doc(e){this.$store.dispatch("delete_template",{id:e})}}};const Le=(0,ie.Z)(Te,[["render",Xe],["__scopeId","data-v-2acdcfa1"]]);var Me=Le,Pe={components:{SelectorVue:z.Z,DocumentSettingAddNew:ce,DocumentSettingFields:Ie,DocumentSettingDocRow:Me,BtnsSaveClose:oe.Z},data(){return{name:"Дмитрий Ивлев",title:["Название","Google ID файла","Шаблон","Тип шаблона","Тип для скачивания"],lead_fields_options:[],lead_fields:{name:"Не выбрано",value:1},contact_name_types_options:[],contact_name_types:{name:"Не выбрано",value:1},showAddNew:!1,showFields:!1,show_settings:!1,cur_doc:{},selected_doc_id:null,copy_documents:[]}},computed:{documents_templates(){return this.$store.state.documents.templates}},async mounted(){await this.$store.dispatch("get_documents"),this.set_lead_fields_options(),this.set_contact_name_types_options()},methods:{set_lead_fields_options(){const e=Object.entries(this.$store.state.documents.config.lead_fields);e.forEach((e=>{const t=e[0];this.lead_fields_options.push({name:t,value:"optgroup"});const s=Object.entries(e[1]);s.forEach((e=>this.lead_fields_options.push({name:e[1],value:e[0],optgroup:!0})))})),this.lead_fields_options.forEach((e=>e.value==this.$store.state.documents.config.field_docs?this.lead_fields=e:null))},set_contact_name_types_options(){this.$store.state.documents.config.contact_name_types.forEach(((e,t)=>this.contact_name_types_options.push({name:e,value:t})))},refresh_fields(){this.$store.dispatch("refresh_fields")},close(){this.$emit("close",!1)},lead_fields_select(e){Object.assign(this.lead_fields,e)},contact_name_types_select(e){Object.assign(this.contact_name_types,e)},open_edit(e){this.cur_doc={...e},this.selected_doc_id=e.id,this.open_add_new()},open_modal(){this.$refs.app.style.pointerEvents="none",this.$refs.app.style.filter="blur(5px)"},close_modal(){this.$refs.app.style.pointerEvents="all",this.$refs.app.style.filter="none"},open_add_new(){this.showAddNew=!0,this.open_modal()},close_add_new(){this.showAddNew=!1,this.cur_doc={},this.close_modal()},open_close_settings(){this.show_settings=!this.show_settings},close_settings(){this.show_settings=!1},open_fields(){this.showFields=!0,this.open_modal()},close_fields(){this.showFields=!1,this.close_modal()}}};const Re=(0,ie.Z)(Pe,[["render",Z],["__scopeId","data-v-2128e674"]]);var Je=Re},1901:function(e,t,s){s.d(t,{Z:function(){return h}});var o=s(6252),l=s(3577),i=s(9963);const n={class:"v-select"},c={class:"options",key:"a1"},a=["onClick"];function d(e,t,s,d,_,p){return(0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("div",{class:(0,l.C_)(["title",{title_checked:d.show_options,disabled:s.disabled}]),onClick:t[0]||(t[0]=e=>d.open_close_options()),onFocusout:t[1]||(t[1]=(...e)=>d.handleFocusOut&&d.handleFocusOut(...e)),tabindex:"0"},[(0,o._)("p",null,(0,l.zw)(s.selected_option.name),1),s.disabled?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,l.C_)(["arrow",{rotate_arrow:d.show_options}])},null,2))],34),(0,o.Wm)(i.uT,{name:"list"},{default:(0,o.w5)((()=>[d.show_options?((0,o.wg)(),(0,o.iD)("div",c,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.options,(e=>((0,o.wg)(),(0,o.iD)("p",{key:e.value,class:(0,l.C_)({optgroup:"optgroup"===e.value}),onClick:t=>d.select_option(e)},[e.optgroup?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)("     "+(0,l.zw)(e.name),1)],64)):((0,o.wg)(),(0,o.iD)(o.HY,{key:1},[(0,o.Uk)((0,l.zw)(e.name),1)],64))],10,a)))),128))])):(0,o.kq)("",!0)])),_:1})])}var _=s(2262),p={props:{options_props:{type:Array,default(){return[]},required:!0},selected_option:{type:Object,required:!0,default(){return{}}},disabled:{type:Boolean,required:!1,default:!1},idx:{type:Number,required:!1}},emits:{select:null},setup(e,{emit:t}){const s=(0,_.iH)([]);(0,o.bv)((()=>{(0,o.Y3)((()=>{l()}))}));const l=()=>{s.value=[],e.options_props?.forEach((e=>s.value.push(e)))};(0,o.YP)((()=>e.options_props),(()=>{l()}),{deep:!0});const i=(0,_.iH)(!1),n=()=>{i.value=!1},c=()=>{e.disabled||(i.value=!i.value)},a=()=>{n()},d=s=>{"optgroup"!=s.value&&(t("select",s,e.idx),n())};return{open_close_options:c,handleFocusOut:a,show_options:i,options:s,select_option:d}}},r=s(3744);const u=(0,r.Z)(p,[["render",d],["__scopeId","data-v-37e48e59"]]);var h=u}}]);
//# sourceMappingURL=307.094dd2cd.js.map