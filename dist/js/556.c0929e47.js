"use strict";(self["webpackChunkstorage"]=self["webpackChunkstorage"]||[]).push([[556],{5226:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("input",{type:"date",class:"date_input","aria-required":"true","aria-invalid":"false","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),disabled:o.disabled},null,8,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()},copy_selected_option(){this.option_select(this.copy_selected_option)}},methods:{change_value(){const e=this.selected_option?.split(" ");let t=this.selected_option;e&&(e[0]=e[0].split(".").reverse().join("-"),t=e.join("T")),(0,i.Y3)((()=>{this.copy_selected_option=t}))},option_select(e){const t=e?.split("T");let o=e;t&&(t[0]=t[0].split("-").reverse().join("."),o=t.join(" ")),this.$emit("change_value",o,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-3b9325b2"]]);var u=p},5389:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("input",{type:"datetime-local",class:"date_input","aria-required":"true","aria-invalid":"false","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),disabled:o.disabled},null,8,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()},copy_selected_option(){this.option_select(this.copy_selected_option)}},methods:{change_value(){const e=this.selected_option?.split(" ");let t=this.selected_option;e&&(e[0]=e[0].split(".").reverse().join("-"),t=e.join("T")),(0,i.Y3)((()=>{this.copy_selected_option=t}))},option_select(e){const t=e?.split("T");let o=e;t&&(t[0]=t[0].split("-").reverse().join("."),o=t.join(" ")),this.$emit("change_value",o,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-57abc82d"]]);var u=p},973:function(e,t,o){o.d(t,{Z:function(){return _}});var i=o(3396),n=o(9242),s=o(7139);const l={class:"row"},d=["id","disabled"],a=["for"];function r(e,t,o,r,c,p){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i.wy)((0,i._)("input",{type:"checkbox",class:"checkbox",id:o.idx+"za","onUpdate:modelValue":t[0]||(t[0]=e=>c.copy_selected_option=e),disabled:o.disabled},null,8,d),[[n.e8,c.copy_selected_option]]),(0,i._)("label",{for:o.idx+"za"},(0,s.zw)(o.item),9,a)])}var c={props:{item:{type:String,required:!0,default(){return""}},selected_option:{required:!0},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:Boolean}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()},copy_selected_option(){this.option_select(this.copy_selected_option)}},methods:{change_value(){(0,i.Y3)((()=>{void 0!=this.selected_option&&(this.copy_selected_option=!!this.selected_option)}))},option_select(e){this.$emit("change_value",e,this.idx)}}},p=o(89);const u=(0,p.Z)(c,[["render",r],["__scopeId","data-v-21ca059a"]]);var _=u},9098:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("input",{type:"number",class:"input","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),disabled:o.disabled},null,8,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()},copy_selected_option(){this.copy_selected_option=`${this.copy_selected_option}`,this.option_select(this.copy_selected_option)}},methods:{change_value(){(0,i.Y3)((()=>{this.copy_selected_option=this.selected_option}))},option_select(e){this.$emit("change_value",e,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-1077f776"]]);var u=p},2675:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("input",{type:"number",class:"input",step:"1",onchange:"this.value = parseInt(this.value);","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),disabled:o.disabled},null,8,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()},copy_selected_option(){this.option_select(this.copy_selected_option)}},methods:{change_value(){(0,i.Y3)((()=>{this.copy_selected_option=this.selected_option}))},option_select(e){this.$emit("change_value",e,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-14a6c4e0"]]);var u=p},4254:function(e,t,o){o.d(t,{Z:function(){return p}});var i=o(3396),n=o(7139);const s={class:"row"};function l(e,t,o,l,d,a){const r=(0,i.up)("multi-selector");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("label",null,(0,n.zw)(o.item.name)+":",1),(0,i.Wm)(r,{options_props:a.preparing_field_data(o.item.data),onSelect:a.option_select,selected_options:d.copy_selected_options,disabled:o.disabled},null,8,["options_props","onSelect","selected_options","disabled"])])}var d=o(838),a={components:{MultiSelector:d.Z},props:{item:{type:Object,required:!0,default(){return{}}},selected_options:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_options:[]}},mounted(){this.change_value()},watch:{selected_options(){this.change_value()}},methods:{change_value(){let e=[];(0,i.Y3)((()=>{let t=[];void 0!=this.selected_options&&(t=this.selected_options.split(", ")),this.item.data?.forEach((o=>{t.includes(o)?e.push(!0):e.push(!1)})),this.copy_selected_options=[],this.copy_selected_options=[...e]}))},preparing_field_data(e){const t=[];return e&&e.forEach(((e,o)=>t.push({name:e,value:o}))),t},option_select(e){let t=[];e.forEach(((e,o)=>{e&&t.push(this.item.data[o])})),t=t.join(", "),this.$emit("change_value",t,this.idx)}}},r=o(89);const c=(0,r.Z)(a,[["render",l],["__scopeId","data-v-640ad0b5"]]);var p=c},3078:function(e,t,o){o.d(t,{Z:function(){return p}});var i=o(3396),n=o(7139);const s={class:"row"};function l(e,t,o,l,d,a){const r=(0,i.up)("SelectorVue");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("label",null,(0,n.zw)(o.item.name)+":",1),(0,i.Wm)(r,{options_props:a.preparing_field_data(o.item.data),onSelect:a.option_select,selected_option:{name:d.copy_selected_option,value:-1},disabled:o.disabled},null,8,["options_props","onSelect","selected_option","disabled"])])}var d=o(7720),a={components:{SelectorVue:d.Z},props:{item:{type:Object,required:!0,default(){return{}}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:"Не выбрано"}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()}},methods:{change_value(){(0,i.Y3)((()=>{this.item.data?.forEach((e=>{e==this.selected_option&&(this.copy_selected_option=e),e?.value==this.selected_option&&void 0!=e?.value&&(this.copy_selected_option=e?.name)}))}))},preparing_field_data(e){const t=[];return e&&(e[0]?.name?e.forEach((e=>t.push({name:e.name,value:e?.value}))):e.forEach(((e,o)=>t.push({name:e,value:o})))),t},option_select(e){this.$emit("change_value",e.name,this.idx,e.value)}}},r=o(89);const c=(0,r.Z)(a,[["render",l],["__scopeId","data-v-3d5708a9"]]);var p=c},8592:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("input",{type:"text",class:"input","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),onInput:t[1]||(t[1]=()=>c.option_select(r.copy_selected_option)),disabled:o.disabled},null,40,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()}},methods:{change_value(){(0,i.Y3)((()=>{this.copy_selected_option=this.selected_option}))},option_select(e){this.$emit("change_value",e,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-4ae1b513"]]);var u=p},293:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139),s=o(9242);const l={class:"row"},d=["disabled"];function a(e,t,o,a,r,c){return(0,i.wg)(),(0,i.iD)("div",l,[(0,i._)("label",null,(0,n.zw)(o.item)+":",1),(0,i.wy)((0,i._)("textarea",{class:"text_area",cols:"30",rows:"10","onUpdate:modelValue":t[0]||(t[0]=e=>r.copy_selected_option=e),onInput:t[1]||(t[1]=()=>c.option_select(r.copy_selected_option)),disabled:o.disabled},null,40,d),[[s.nr,r.copy_selected_option]])])}var r={props:{item:{type:String,required:!0,default(){return""}},selected_option:{type:String,required:!0,default(){return""}},idx:{type:Number,required:!0},disabled:{type:Boolean,required:!1,default(){return!1}}},data(){return{copy_selected_option:""}},mounted(){this.change_value()},watch:{selected_option(){this.change_value()}},methods:{change_value(){(0,i.Y3)((()=>{this.copy_selected_option=this.selected_option}))},option_select(e){this.$emit("change_value",e,this.idx)}}},c=o(89);const p=(0,c.Z)(r,[["render",a],["__scopeId","data-v-06cd8824"]]);var u=p},838:function(e,t,o){o.d(t,{Z:function(){return u}});var i=o(3396),n=o(7139);const s={class:"multi_selector"},l=["onClick"];function d(e,t,o,d,a,r){return(0,i.wg)(),(0,i.iD)("div",s,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(o.options_props,((e,t)=>((0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(["item",{selected:o.selected_options[t],disabled:o.disabled}]),key:e.value,onClick:e=>d.select(t)},(0,n.zw)(e.name),11,l)))),128))])}var a=o(4870),r={name:"MultiSelector",props:{options_props:{type:Array,required:!0,default(){return[]}},selected_options:{type:Array,required:!0,default(){return[!0]}},disabled:{type:Boolean,required:!1,default(){return!1}}},emits:{select:null},setup(e,{emit:t}){const o=(0,a.iH)([]);(0,i.bv)((()=>o.value=[...e.selected_options])),(0,i.YP)((()=>e.selected_options),(()=>{o.value=[...e.selected_options]}),{deep:!0});const n=i=>{e.disabled||(0==i&&(o.value=[]),1==o.value[0]&&(o.value[0]=!1),o.value[i]=!o.value[i],o.value.includes(!0)||(o.value[0]=!0),t("select",o.value))};return{options_value:o,select:n}}},c=o(89);const p=(0,c.Z)(r,[["render",d],["__scopeId","data-v-bab1322a"]]);var u=p}}]);
//# sourceMappingURL=556.c0929e47.js.map