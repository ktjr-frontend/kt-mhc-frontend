webpackJsonp([10],{"4JGu":function(e,n,t){"use strict";t.d(n,"a",function(){return f});var a=t("Dd8w"),o=t.n(a),r=t("Xxa5"),i=t.n(r),s=t("exGp"),d=t.n(s),c=t("oiih"),u=t("NYxO"),l=t("3dbI"),m=t("M4fF"),h=(t.n(m),[{name:"农业",icon:"nongye"},{name:"中国银行",icon:"zhongguo"},{name:"兴业",icon:"nongye"},{name:"工商",icon:"gongshang"},{name:"建设",icon:"jianshe"},{name:"交通",icon:"jiaotong"},{name:"北京",icon:"beijing"},{name:"民生银行",icon:"minsheng"},{name:"光大",icon:"guangda"},{name:"上海",icon:"shanghai"},{name:"中信",icon:"zhongxin"},{name:"浙商",icon:"zheshang"},{name:"邮政",icon:"youzhengchuxu"},{name:"华夏",icon:"huaxia"},{name:"渤海",icon:"bohai"},{name:"平安",icon:"pingan"},{name:"恒丰",icon:"hengfeng"},{name:"浦发",icon:"pufa"},{name:"招商",icon:"zhaoshang"},{name:"广发",icon:"guangfa"}]),f={methods:{getBankIcon:function(e){var n=t.i(m.find)(h,function(n){return~e.indexOf(n.name)});return(n?n.icon:"")+"yinhang"},showSupportBanks:function(){var e=this;return d()(i.a.mark(function n(){var t,a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(t=e.$store.getters.supportBankCards,!t.length){n.next=5;break}e.$msgBox("支持银行列表：",t.join("、")),n.next=10;break;case 5:return n.next=7,l.e.get().then(function(e){return e.json()});case 7:a=n.sent,e.$store.commit("updateSupportBankCards",a.data),e.$msgBox("支持银行列表：",a.data.join("、"));case 10:case"end":return n.stop()}},n,e)}))()}}};n.b={methods:o()({},t.i(u.a)(["getMsgCode"]),f.methods,{getBank:function(){var e=this;return d()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.validation.isPassed("model.bankCard")&&setTimeout(d()(i.a.mark(function n(){var t;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,l.f.get({cardNo:e.model.bankCard}).then(function(e){return e.json()});case 2:t=n.sent,t.code===c.a.OK?(e.model.bankName=t.data.bankName,e.model.bankCode=t.data.bankCode):(e.model.bankName="自动匹配",e.model.bankCode=""),e.bankCardNotSupported=t.code===c.a.BANK_CARD_NOT_SUPPORTED,e.$validate("model.bankCard");case 6:case"end":return n.stop()}},n,e)})),100);case 1:case"end":return n.stop()}},n,e)}))()},toGetMsgCode:function(){var e=this;return d()(i.a.mark(function n(){var a,o;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate(e.validatePhoneModel);case 2:if(!(a=n.sent)){n.next=10;break}return n.next=6,e.getMsgCode({phone:t.i(m.get)(e,e.validatePhoneModel),label:e.$route.meta.captchaSendType||""});case 6:o=n.sent,o.code===c.a.OK&&(e.countdownVisible=!0,e.$refs.fnCountdown.start()),n.next=11;break;case 10:e.$toast(e.validation.firstError(e.validatePhoneModel),"error");case 11:case"end":return n.stop()}},n,e)}))()},onCountdownOver:function(){this.countdownVisible=!1}}),watch:{bankCardForShow:function(){this.model.bankCard=this.bankCardForShow=this.bankCardForShow.replace(/\s/g,""),this.bankCardForShow=this.bankCardForShow.replace(/\d{4}(?=(\d{1,4}))/g,"$& ")},"model.bankCard":function(){this.bankCardNotSupported=!1}},data:function(){return{bankCardForShow:"",bankCardNotSupported:!1,validatePhoneModel:"user.phone",countdownVisible:!1}}}},CP8Y:function(e,n,t){n=e.exports=t("FZ+f")(),n.push([e.i,"",""])},"N+Ur":function(e,n,t){var a=t("CP8Y");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t("rjj0")("05ee12d2",a,!0)},UXOt:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("Dd8w"),o=t.n(a),r=t("Xxa5"),i=t.n(r),s=t("exGp"),d=t.n(s),c=t("nWjG"),u=t("4JGu"),l=t("3dbI"),m=t("oiih"),h=t("NYxO");n.default={mixins:[u.b,c.a],validators:{"model.bankReservePhone":function(e){return this.validate(e).required("请输入手机号").digit("请正确输入手机号").regex("^1[3-9]\\d{9}$","请正确输入手机号")},"model.captcha":function(e){return this.validate(e).required("请输入验证码").digit("请正确输入验证码").length(6,"请正确输入验证码")}},methods:{submit:function(){var e=this;return d()(i.a.mark(function n(){var t,a;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$validate();case 2:if(!(t=n.sent)){n.next=10;break}return n.next=6,l.a.save(e.model).then(function(e){return e.json()});case 6:a=n.sent,a.code===m.a.OK&&(e.model.bankCardId=a.data.id,e.$router.push({name:"addBankStep3",params:{model:e.model,from:e.$route.from}})),n.next=11;break;case 10:e.$toast(e.validation.firstError(),"error");case 11:case"end":return n.stop()}},n,e)}))()}},mounted:function(){this.model=this.$route.params.model||this.model},computed:o()({},t.i(h.b)(["user"])),data:function(){return{model:{bankReservePhone:"",captcha:""},validatePhoneModel:"model.bankReservePhone"}}}},iEQe:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"add-bank-step2"},[t("form",{staticClass:"simple-form",on:{submit:function(n){n.preventDefault(),e.submit()}}},[t("div",{staticClass:"fields-header"},[t("small",[e._v("为保证您的安全，我们将向您的手机："+e._s(e._f("fbCardNo")(e.model.bankReservePhone))+"发送短信验证码，确认身份。")])]),t("div",{staticClass:"fields"},[t("mt-field",{attrs:{type:"number",label:"",placeholder:"请输入验证码",state:e.getFieldState("model.captcha")},nativeOn:{click:function(n){e.showFieldError(n,"model.captcha")}},model:{value:e.model.captcha,callback:function(n){e.model.captcha=n},expression:"model.captcha"}},[t("mt-button",{attrs:{type:"default",disabled:e.countdownVisible},on:{click:function(n){n.stopPropagation(),n.preventDefault(),e.toGetMsgCode()}}},[t("span",{directives:[{name:"show",rawName:"v-show",value:!e.countdownVisible,expression:"!countdownVisible"}]},[e._v("获取验证码")]),t("fb-countdown",{directives:[{name:"show",rawName:"v-show",value:e.countdownVisible,expression:"countdownVisible"}],ref:"fnCountdown",on:{"countdown-over":function(n){e.onCountdownOver()}}})],1)],1)],1),t("div",{staticClass:"form-buttons"},[t("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary",size:"large"}},[e._v("下一步")])],1)])])},staticRenderFns:[]}},juhY:function(e,n,t){t("N+Ur");var a=t("VU/8")(t("UXOt"),t("iEQe"),null,null);e.exports=a.exports},nWjG:function(e,n,t){"use strict";var a=t("IXCS"),o=t.n(a),r=o.a.Validator;n.a={methods:{Validator:r,validate:r.value,getFieldState:function(e){return this.validation.hasError(e)?"error":this.validation.isPassed(e)?"success":""},showFieldError:function(e,n){var t=e.target;t.classList.contains("mintui-field-error")&&t.parentNode.classList.contains("mint-field-state")&&this.$toast(this.validation.firstError(n),"error")}}}}});