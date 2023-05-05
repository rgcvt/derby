import{_ as p,o as n,c as i,j as g,t as u,h,F as v,b as y,p as f,i as m,a as d}from"./index-b5198652.js";import"./Close-0a1e1c48.js";const x={name:"InlineInput",props:{value:{type:[Number,String],default:()=>""},type:{type:String,default:()=>"text"},placeholder:{type:String,default:()=>""},labelClasses:{type:String,default:()=>""},inputClasses:{type:String,default:()=>""},rows:{type:Number,default:()=>2},cols:{type:Number,default:()=>20},options:{type:Array,default:()=>[]},isCurrency:{type:Boolean,default:()=>!1}},data(){return{editing:!1,selectedIndex:this.options.findIndex(a=>a.value===this.value)}},computed:{isText(){return this.type==="text"},isNumber(){return this.type==="number"},isTextArea(){return this.type==="textarea"},isSelect(){return this.type==="select"},label(){return this.isNumber?this.value===""?this.placeholder:this.value:this.isText||this.isTextArea?this.value?this.value:this.placeholder:this.selectedIndex===-1?this.placeholder:this.options[this.selectedIndex].label}},methods:{toggle(){this.editing=!this.editing,this.editing&&this.$nextTick(()=>{this.$refs.inputEl.focus()})},handleEnter(){this.$refs.inputEl.blur()},handleBlur(){this.toggle(),this.emitValue(),this.$emit("blur",this.getValue())},handleInput(){this.emitValue()},handleChange(a){this.selectedIndex=this.placeholder?a.target.selectedIndex-1:a.target.selectedIndex,this.emitValue()},emitValue(){this.$emit("input",this.getValue())},getValue(){return this.isNumber?+this.$refs.inputEl.value:this.$refs.inputEl.value}}},o=a=>(f("data-v-d010e5de"),a=a(),m(),a),_={class:"input-wrapper"},b=["type","value","placeholder"],I=["value","placeholder","rows","cols"],w=["value"],B={key:0,disabled:"",value:""},k=["value"],C={key:3,class:"save"},L=o(()=>d("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[d("path",{d:"M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z",fill:"currentColor"})],-1)),E=[L],S={key:0,class:"placeholder"},N={key:1},V={key:2},T={key:3,class:"edit-icon"},A=o(()=>d("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},[d("path",{d:"M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z",fill:"currentColor"})],-1)),F=[A];function M(a,l,s,Z,r,e){return n(),i("div",_,[r.editing&&(e.isText||e.isNumber)?(n(),i("input",{key:0,class:"inline-input",type:s.type,value:s.value,placeholder:s.placeholder,ref:"inputEl",onKeyup:l[0]||(l[0]=g((...t)=>e.handleEnter&&e.handleEnter(...t),["enter"])),onInput:l[1]||(l[1]=(...t)=>e.handleInput&&e.handleInput(...t)),onBlur:l[2]||(l[2]=(...t)=>e.handleBlur&&e.handleBlur(...t))},null,40,b)):r.editing&&e.isTextArea?(n(),i("textarea",{key:1,class:"inline-input",value:s.value,placeholder:s.placeholder,ref:"inputEl",rows:s.rows,cols:s.cols,onInput:l[3]||(l[3]=(...t)=>e.handleInput&&e.handleInput(...t)),onBlur:l[4]||(l[4]=(...t)=>e.handleBlur&&e.handleBlur(...t))},null,40,I)):r.editing&&e.isSelect?(n(),i("select",{key:2,class:"inline-input",value:s.value,ref:"inputEl",onChange:l[5]||(l[5]=(...t)=>e.handleChange&&e.handleChange(...t)),onBlur:l[6]||(l[6]=(...t)=>e.handleBlur&&e.handleBlur(...t))},[s.placeholder?(n(),i("option",B,u(s.placeholder),1)):h("",!0),(n(!0),i(v,null,y(s.options,(t,c)=>(n(),i("option",{key:c,value:t.value},u(t.label),9,k))),128))],40,w)):h("",!0),r.editing?(n(),i("button",C,E)):(n(),i("span",{key:4,class:"inline-label",onClick:l[7]||(l[7]=t=>e.toggle())},[s.placeholder&&!s.value?(n(),i("span",S,u(e.label),1)):s.isCurrency?(n(),i("span",N,"$"+u(e.label.toFixed(2)),1)):(n(),i("span",V,u(e.label),1)),e.isText||e.isNumber?(n(),i("button",T,F)):h("",!0)]))])}const D=p(x,[["render",M],["__scopeId","data-v-d010e5de"]]);export{D as I};
