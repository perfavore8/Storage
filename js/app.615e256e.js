(function(){"use strict";var e={6178:function(e,a,n){var t=n(9963),i=n(6252);function l(e,a){const n=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(n)}var o=n(3744);const s={},r=(0,o.Z)(s,[["render",l]]);var c=r,_=n(2119),d=n(3577);const u=e=>((0,i.dD)("data-v-f752319e"),e=e(),(0,i.Cn)(),e),m={class:"bar_row"},p={class:"bar_item_row"},v={class:"bar_item_icon"},h={class:"filter"},g=["onClick"],f=["onUpdate:modelValue"],b=u((()=>(0,i._)("td",{class:"item"},[(0,i._)("div",{class:"edit_icon"})],-1)));function y(e,a,n,l,o,s){return(0,i.wg)(),(0,i.iD)("table",null,[(0,i._)("tr",m,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.params,(e=>((0,i.wg)(),(0,i.iD)("td",{class:"bar_item",key:e},[(0,i._)("div",p,[(0,i._)("div",null,(0,d.zw)(e),1),(0,i.wy)((0,i._)("button",v,null,512),[[t.F8,e]])])])))),128))]),(0,i._)("tr",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.params.length,((e,a)=>((0,i.wg)(),(0,i.iD)("td",{class:"item",key:a},[(0,i.wy)((0,i._)("div",h,[(0,i._)("button",{onClick:e=>s.changeComparison(a)},[(0,i._)("div",{class:(0,d.C_)(["icon",{tilde:1==o.comparisons[a],equal:2==o.comparisons[a],more:3==o.comparisons[a],more_or_equal:4==o.comparisons[a]}])},null,2)],8,g),(0,i.wy)((0,i._)("input",{"onUpdate:modelValue":e=>o.filterValue[a]=e,type:"text"},null,8,f),[[t.nr,o.filterValue[a]]])],512),[[t.F8,a!=o.params.length-1]])])))),128))]),((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.users,(e=>((0,i.wg)(),(0,i.iD)("tr",{key:e},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e,((e,a)=>((0,i.wg)(),(0,i.iD)("td",{key:a,class:"item"},(0,d.zw)(e),1)))),128)),b])))),128))])}var w={data(){return{show_settings:!1,show_filter:!1,params:["Название","Группа","Артикул","На складе","В резерве","Цена","Себестоимость","Описание","Единицы измерений","Изменение","Свободно для резерва",""],users:[{id:1,name:"Leanne Graham",username:"Bret",email:"Sincere@april.biz",phone:"1-770-736-8031 x56442",website:"hildegard.org",a1:"11",a2:"22",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:2,name:"Ervin Howell",username:"Antonette",email:"Shanna@melissa.tv",phone:"010-692-6593 x09125",website:"anastasia.net",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:3,name:"Clementine Bauch",username:"Samantha",email:"Nathan@yesenia.net",phone:"1-463-123-4447",website:"ramiro.info",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:4,name:"Patricia Lebsack",username:"Karianne",email:"Julianne.OConner@kory.org",phone:"493-170-9623 x156",website:"kale.biz",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:5,name:"Chelsey Dietrich",username:"Kamren",email:"Lucio_Hettinger@annie.ca",phone:"(254)954-1289",website:"demarco.info",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:6,name:"Mrs. Dennis Schulist",username:"Leopoldo_Corkery",email:"Karley_Dach@jasper.info",phone:"1-477-935-8478 x6430",website:"ola.org",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:7,name:"Kurtis Weissnat",username:"Elwyn.Skiles",email:"Telly.Hoeger@billy.biz",phone:"210.067.6132",website:"elvis.io",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:8,name:"Nicholas Runolfsdottir V",username:"Maxime_Nienow",email:"Sherwood@rosamond.me",phone:"586.493.6943 x140",website:"jacynthe.com",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:9,name:"Glenna Reichert",username:"Delphine",email:"Chaim_McDermott@dana.io",phone:"(775)976-6794 x41206",website:"conrad.com",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"},{id:10,name:"Clementina DuBuque",username:"Moriah.Stanton",email:"Rey.Padberg@karina.biz",phone:"024-648-3804",website:"ambrose.net",a1:"1",a2:"2",email1:"Sincere@april.biz",phone2:"1-770-736-8031 x56442",website3:"hildegard.org"}],coll:[],count:3,page:1,filterValue:[],updateKey:0,comparisons:[]}},watch:{count(){this.count<0&&(this.count=0)},paginatedData:{handler:function(){this.updateKey+=1},deep:!0},comparisons:{handler:function(){this.comparisons.forEach(((e,a)=>{e>4&&(this.comparisons[a]=1)}))},deep:!0},data:{handler:function(){this.comparisons=[],this.fillColls(),this.filterValue=[],this.page=1},deep:!0}},computed:{paginatedData(){return this.users.slice(this.page*this.count-this.count,this.page*this.count)}},mounted(){this.fillColls()},methods:{fillColls(){this.coll=Object.keys(this.users[0]),this.coll.forEach((()=>{this.comparisons.push(1)}))},changeComparison(e){this.comparisons[e]=this.comparisons[e]+1}}};const x=(0,o.Z)(w,[["render",y],["__scopeId","data-v-f752319e"]]);var C=x;const S=[{path:"/home",name:"home",component:C},{path:"/",name:"about",component:()=>n.e(443).then(n.bind(n,5718))},{path:"/qwe",name:"qwe",component:()=>n.e(443).then(n.bind(n,7210))}],k=(0,_.p7)({history:(0,_.PO)("/Storage/"),routes:S});var D=k,E=n(3907),O={state:{params:["","Название","Артикул","Себестоимость","Цена","Склад","На складе","Свободно для резерва","В резерве","№ партии","Поступление","НДС","Изменение","Единицы измерений","НДС %","НДС включен в цену","Менеджер может менять % НДС","Описание","Прибыль","Группа",""],data:[["Товар 1","1","500","Bret","Склад 1","Leanne Graham","1-770-736-8031 x56442","Склад 1","1","2022-07-08","3","2022-07-08T21:21","шт","3","Да","Нет","1","Да","Группа 1"],["Товар 1","1","120","Bret","Склад 1","Leanne Graham","1-770-736-8031 x56442","Склад 1","шт","2Leanne Graham","3","3","шт","3","3","3","1","Да","Группа 1"],["Товар 1","1","300","Bret","Склад 1","Ervin Howell","010-692-6593 x09125","Склад 1","","Ervin Howell","","3","шт","3","3","3","1","Да","Группа 1"],["Товар 1","1","1500","Bret","Склад 1","Clementine Bauch","1-463-123-4447","Склад 1","","Clementine Bauch","","3","шт","3","3","3","1","Да","Группа 1"],["Товар 2","2","180000","Antonette","Склад 1","Ervin Howell","010-692-6593 x09125","Склад 2","шт","Ervin Howell","","3","шт","3","3","3","1","Да","Группа 1"],["Товар 3","3","13","Samantha","Склад 1","Clementine Bauch","1-463-123-4447","Склад 1","","Clementine Bauch","","3","шт","3","3","3","1","Да","Группа 1"],["Товар 4","4","117","Karianne","Склад 2","Patricia Lebsack","493-170-9623 x156","Склад 1","","Patricia Lebsack","","3","шт","3","3","3","1","Да","Группа 1"],["Товар 5","5","4356","Kamren","Склад 2","Chelsey Dietrich","(254)954-1289","Склад 2","","Chelsey Dietrich","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 6","6","67589","Leopoldo_Corkery","Склад 2","Mrs. Dennis Schulist","1-477-935-8478 x6430","Склад 2","","Mrs. Dennis Schulist","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 7","7","123","Elwyn.Skiles","Склад 2","Kurtis Weissnat","210.067.6132","Склад 2","","Kurtis Weissnat","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 8","8","123","Maxime_Nienow","Склад 2","Nicholas Runolfsdottir V","586.493.6943 x140","Склад 2","","Nicholas Runolfsdottir V","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 9","9","123","Delphine","Склад 2","Glenna Reichert","(775)976-6794 x41206","Склад 2","","Glenna Reichert","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 9","9","123","Delphine","Склад 2","Glenna Reichert","(775)976-6794 x41206","Склад 2","","Glenna Reichert","","3","шт","3","3","3","1","Да","Группа 2"],["Товар 10","10","123","Moriah.Stanton","Склад 2","Clementina DuBuque","024-648-3804","Склад 12","","Clementina DuBuque","","3","шт","3","3","3","1","Да","Группа 2"]],sync_list_stuff_options:[{name:"Не выбрано",value:1},{name:"Товары",value:2}],sync_list_hide_tab_options:[{name:"Не выбрано",value:1},{name:"Основное",value:2},{name:"Сделки",value:3},{name:"Docs",value:4},{name:"Склад",value:5},{name:"Товары",value:6},{name:"Документы",value:7},{name:"Статистика",value:8},{name:"Счета/покупки",value:9},{name:"Корреспонденция",value:10},{name:"Анкета",value:11},{name:"Авто",value:12},{name:"Финансы",value:13},{name:"Документы",value:14},{name:"Чек-лист",value:15},{name:"DocsSls",value:16},{name:"Реквизиты",value:17}],sync_list_stuff_selected_option:{name:"Не выбрано",value:1},sync_list_hide_tab_selected_option:{name:"Не выбрано",value:1},types:[{name:"Число целое",value:1},{name:"Дробное число",value:2},{name:"Строка",value:3},{name:"Текст",value:4},{name:"Список",value:5},{name:"Мильтисписок",value:6},{name:"Дата",value:7},{name:"Дата-Время",value:8},{name:"Флаг",value:9}],fields:[{id:1,field:"Название",type:{name:"Строка",value:3},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:2,field:"Артикул",type:{name:"Строка",value:3},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:3,field:"Себестоимость",type:{name:"Дробное число",value:2},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:4,field:"Цена",type:{name:"Дробное число",value:2},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:5,field:"Склад",type:{name:"Список",value:5},selector_options:[{name:"Не выбрано",value:1},{name:"Склад 1",value:2},{name:"Склад 2",value:3}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:6,field:"На складе",type:{name:"Число целое",value:1},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:7,field:"Свободно для резерва",type:{name:"Число целое",value:1},selector_options:[{name:"",value:1}],disable_change_type:!1,visibility:!0,edit:!1,editing:!1,delete:!0},{id:8,field:"В резерве",type:{name:"Число целое",value:1},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:9,field:"№ партии",type:{name:"Число целое",value:1},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:10,field:"Поступление",type:{name:"Дата",value:7},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:11,field:"НДС",type:{name:"Флаг",value:9},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:12,field:"Изменение",type:{name:"Дата-Время",value:8},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:13,field:"Единицы измерений",type:{name:"Список",value:5},selector_options:[{name:"Не выбрано",value:1},{name:"шт",value:2},{name:"л (литры)",value:3},{name:"м3 (кубические метры)",value:4},{name:"кг (килограммы)",value:5},{name:"т (тонны)",value:6},{name:"комплект",value:7},{name:"услуга",value:8}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:14,field:"НДС %",type:{name:"Дробное число",value:2},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:15,field:"НДС включен в цену",type:{name:"Флаг",value:9},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:16,field:"Менеджер может менять % НДС",type:{name:"Флаг",value:9},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:17,field:"Описание",type:{name:"Строка",value:3},selector_options:[{name:"",value:1}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1},{id:18,field:"Прибыль",type:{name:"Флаг",value:9},selector_options:[{name:"",value:1}],disable_change_type:!1,visibility:!1,edit:!1,editing:!1,delete:!0},{id:19,field:"Группа",type:{name:"Мильтисписок",value:6},selector_options:[{name:"Не выбрано",value:1},{name:"Группа 1",value:2},{name:"Группа 2",value:3},{name:"Группа 3",value:4},{name:"Группа 4",value:5}],disable_change_type:!0,visibility:!0,edit:!1,editing:!1,delete:!1}],items_from_storage:[{id:1,name:"Тест калькулятора",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1},{name:"Не складывать",value:2},{name:"Сложить",value:3},{name:"Умножить",value:4},{name:"Вычесть",value:5},{name:"Поделить",value:6}],reserve_disable_change:!1,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1},{name:"Не складывать",value:2},{name:"Сложить",value:3},{name:"Умножить",value:4},{name:"Вычесть",value:5},{name:"Поделить",value:6}],cancellation_disable_change:!0},{id:2,name:"Рассмотрение заемщика",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!1,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:3,name:"Заемщик одобрен",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!1},{id:4,name:"Объект залога одобрен",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:5,name:"Процесс сделки",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:6,name:"Test",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:7,name:"ТЕСТ УНИВЕР",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:8,name:"Nethouse TEST",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:9,name:"тест Чек-лист",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:10,name:"Сопряжение",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:11,name:"Тест товаров",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:12,name:"Тест генерации документов",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:13,name:"Праздники",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:14,name:"Тест сенсей",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0},{id:15,name:"Тест Реквизиты",reserve_selected_option:{name:"Не выбрано",value:1},reserve_selector_options:[{name:"Не выбрано",value:1}],reserve_disable_change:!0,cancellation_selected_option:{name:"Не выбрано",value:1},cancellation_selector_options:[{name:"Не выбрано",value:1}],cancellation_disable_change:!0}]},getters:{data(e){return e.data},params(e){return e.params},types(e){return e.types},fields(e){return e.fields},sync_list_stuff_options(e){return e.sync_list_stuff_options},sync_list_hide_tab_options(e){return e.sync_list_hide_tab_options},sync_list_stuff_selected_option(e){return e.sync_list_stuff_selected_option},sync_list_hide_tab_selected_option(e){return e.sync_list_hide_tab_selected_option},items_from_storage(e){return e.items_from_storage}},mutations:{update_data(e,a){e.data=a},update_data_idx(e,a){e.data[a.idx]=a.data},update_all_data(e,a){e.data.forEach(((n,t)=>{e.data[t].push(a)}))},delete_data_idx(e,a){e.data.forEach(((n,t)=>{a.forEach((a=>{e.data[t].splice(a,1)}))}))},update_params(e,a){e.params=a},update_fields(e,a){e.fields=a},update_sync_list_stuff_selected_option(e,a){Object.assign(e.sync_list_stuff_selected_option,a)},update_sync_list_hide_tab_selected_option(e,a){Object.assign(e.sync_list_hide_tab_selected_option,a)},update_items_from_storage(e,a){e.items_from_storage=a}},actions:{}},j={state:{show_edit_modal:!1,idx_edit_modal:-1,show_settings:!1,show_filter:!1,show_table_settings:!1,show_buttons:!1,show_edit_stuff:!1},getters:{show_edit_modal(e){return e.show_edit_modal},idx_edit_modal(e){return e.idx_edit_modal},show_settings(e){return e.show_settings},show_filter(e){return e.show_filter},show_table_settings(e){return e.show_table_settings},show_buttons(e){return e.show_buttons},show_edit_stuff(e){return e.show_edit_stuff}},mutations:{open_edit_modal(e,a){e.show_edit_modal=!0,e.idx_edit_modal=a},close_edit_modal(e){e.show_edit_modal=!1},open_settings(e){e.show_settings=!0},close_settings(e){e.show_settings=!1},open_close_settings(e){e.show_settings=!e.show_settings},open_close_filter(e,a){e.show_filter=a},open_table_settings(e){e.show_table_settings=!0},close_table_settings(e){e.show_table_settings=!1},open_close_buttons(e,a){e.show_buttons=a},open_close_show_edit_stuff(e,a){e.show_edit_stuff=a}},actions:{}},z=(0,E.MT)({modules:{data:O,shows:j}});(0,t.ri)(c).use(z).use(D).mount("#app")}},a={};function n(t){var i=a[t];if(void 0!==i)return i.exports;var l=a[t]={exports:{}};return e[t](l,l.exports,n),l.exports}n.m=e,function(){var e=[];n.O=function(a,t,i,l){if(!t){var o=1/0;for(_=0;_<e.length;_++){t=e[_][0],i=e[_][1],l=e[_][2];for(var s=!0,r=0;r<t.length;r++)(!1&l||o>=l)&&Object.keys(n.O).every((function(e){return n.O[e](t[r])}))?t.splice(r--,1):(s=!1,l<o&&(o=l));if(s){e.splice(_--,1);var c=i();void 0!==c&&(a=c)}}return a}l=l||0;for(var _=e.length;_>0&&e[_-1][2]>l;_--)e[_]=e[_-1];e[_]=[t,i,l]}}(),function(){n.d=function(e,a){for(var t in a)n.o(a,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(a,t){return n.f[t](e,a),a}),[]))}}(),function(){n.u=function(e){return"js/about.4d345ba8.js"}}(),function(){n.miniCssF=function(e){return"css/about.b5f7cd1b.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={},a="storage:";n.l=function(t,i,l,o){if(e[t])e[t].push(i);else{var s,r;if(void 0!==l)for(var c=document.getElementsByTagName("script"),_=0;_<c.length;_++){var d=c[_];if(d.getAttribute("src")==t||d.getAttribute("data-webpack")==a+l){s=d;break}}s||(r=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",a+l),s.src=t),e[t]=[i];var u=function(a,n){s.onerror=s.onload=null,clearTimeout(m);var i=e[t];if(delete e[t],s.parentNode&&s.parentNode.removeChild(s),i&&i.forEach((function(e){return e(n)})),a)return a(n)},m=setTimeout(u.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=u.bind(null,s.onerror),s.onload=u.bind(null,s.onload),r&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/Storage/"}(),function(){var e=function(e,a,n,t){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var l=function(l){if(i.onerror=i.onload=null,"load"===l.type)n();else{var o=l&&("load"===l.type?"missing":l.type),s=l&&l.target&&l.target.href||a,r=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");r.code="CSS_CHUNK_LOAD_FAILED",r.type=o,r.request=s,i.parentNode.removeChild(i),t(r)}};return i.onerror=i.onload=l,i.href=a,document.head.appendChild(i),i},a=function(e,a){for(var n=document.getElementsByTagName("link"),t=0;t<n.length;t++){var i=n[t],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===e||l===a))return i}var o=document.getElementsByTagName("style");for(t=0;t<o.length;t++){i=o[t],l=i.getAttribute("data-href");if(l===e||l===a)return i}},t=function(t){return new Promise((function(i,l){var o=n.miniCssF(t),s=n.p+o;if(a(o,s))return i();e(t,s,i,l)}))},i={143:0};n.f.miniCss=function(e,a){var n={443:1};i[e]?a.push(i[e]):0!==i[e]&&n[e]&&a.push(i[e]=t(e).then((function(){i[e]=0}),(function(a){throw delete i[e],a})))}}(),function(){var e={143:0};n.f.j=function(a,t){var i=n.o(e,a)?e[a]:void 0;if(0!==i)if(i)t.push(i[2]);else{var l=new Promise((function(n,t){i=e[a]=[n,t]}));t.push(i[2]=l);var o=n.p+n.u(a),s=new Error,r=function(t){if(n.o(e,a)&&(i=e[a],0!==i&&(e[a]=void 0),i)){var l=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+a+" failed.\n("+l+": "+o+")",s.name="ChunkLoadError",s.type=l,s.request=o,i[1](s)}};n.l(o,r,"chunk-"+a,a)}},n.O.j=function(a){return 0===e[a]};var a=function(a,t){var i,l,o=t[0],s=t[1],r=t[2],c=0;if(o.some((function(a){return 0!==e[a]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(r)var _=r(n)}for(a&&a(t);c<o.length;c++)l=o[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(_)},t=self["webpackChunkstorage"]=self["webpackChunkstorage"]||[];t.forEach(a.bind(null,0)),t.push=a.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(6178)}));t=n.O(t)})();
//# sourceMappingURL=app.615e256e.js.map