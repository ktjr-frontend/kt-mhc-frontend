webpackJsonp([7],{"5y72":function(t,n,o){o("VyO4");var e=o("VU/8")(o("voIw"),o("E7Ir"),"data-v-5186f54c",null);e.options.__file="/Users/luxueyan/mine/github/kt-mhc-frontend/src/views/common/Download.vue",e.esModule&&Object.keys(e.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),e.options.functional&&console.error("[vue-loader] Download.vue: functional components are not supported with templates, they should use render functions."),t.exports=e.exports},E7Ir:function(t,n,o){t.exports={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("section",{staticClass:"download-page",class:{"is-weixin":t.isInWeixin}},[t._m(0),t._m(1),o("div",{staticClass:"body"},[o("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary"},on:{click:t.downloadAndroid}},[t._v("下载Android版本")]),o("div",{staticClass:"button-tip"},[t._v("支持Android4.0及以上版本")]),o("mt-button",{staticClass:"mint-button-block mint-button--gray"},[t._v("敬请期待iOS版本")]),o("div",{staticClass:"button-tip"},[t._v("您可以通过微信公众号进行借还款哦")])],1),o("div",{staticClass:"foot"},[t._v("@2017 北京汽车订单库存管理有限公司")])])},staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"mask"},[e("img",{attrs:{src:o("v+gC")}})])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"logo"},[e("img",{attrs:{src:o("i+2p")}})])}]},t.exports.render._withStripped=!0},NssI:function(t,n,o){n=t.exports=o("FZ+f")(),n.push([t.i,".is-weixin .mask[data-v-5186f54c]{display:block}.mint-button--gray[data-v-5186f54c]:before{display:none}.mask[data-v-5186f54c]{display:none;z-index:999;position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.7);text-align:center}.mask img[data-v-5186f54c]{width:90%;margin-top:15px}.logo[data-v-5186f54c]{text-align:center}.logo img[data-v-5186f54c]{width:257px;margin:10px auto}.button-tip[data-v-5186f54c]{font-size:10px;color:#999;text-align:center;margin:8px 0 25px}.body[data-v-5186f54c]{padding:65px 28px 0}.foot[data-v-5186f54c]{left:0;right:0;color:#ccc;text-align:center;position:fixed;bottom:20px}","",{version:3,sources:["/Users/luxueyan/mine/github/kt-mhc-frontend/src/views/common/Download.vue"],names:[],mappings:"AACA,kCACE,aAAe,CAChB,AACD,2CACE,YAAc,CACf,AACD,uBACE,aAAc,AACd,YAAa,AACb,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,SAAU,AACV,0BAA+B,AAC/B,iBAAmB,CACpB,AACD,2BACI,UAAW,AACX,eAAiB,CACpB,AACD,uBACE,iBAAmB,CACpB,AACD,2BACI,YAAa,AACb,gBAAkB,CACrB,AACD,6BACE,eAAgB,AAChB,WAAY,AACZ,kBAAmB,AACnB,iBAAmB,CACpB,AACD,uBACE,mBAAqB,CACtB,AACD,uBACE,OAAQ,AACR,QAAS,AACT,WAAY,AACZ,kBAAmB,AACnB,eAAgB,AAChB,WAAa,CACd",file:"Download.vue",sourcesContent:["\n.is-weixin .mask[data-v-5186f54c] {\n  display: block;\n}\n.mint-button--gray[data-v-5186f54c]:before {\n  display: none;\n}\n.mask[data-v-5186f54c] {\n  display: none;\n  z-index: 999;\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.7);\n  text-align: center;\n}\n.mask img[data-v-5186f54c] {\n    width: 90%;\n    margin-top: 15px;\n}\n.logo[data-v-5186f54c] {\n  text-align: center;\n}\n.logo img[data-v-5186f54c] {\n    width: 257px;\n    margin: 10px auto;\n}\n.button-tip[data-v-5186f54c] {\n  font-size: 10px;\n  color: #999;\n  text-align: center;\n  margin: 8px 0 25px;\n}\n.body[data-v-5186f54c] {\n  padding: 65px 28px 0;\n}\n.foot[data-v-5186f54c] {\n  left: 0;\n  right: 0;\n  color: #ccc;\n  text-align: center;\n  position: fixed;\n  bottom: 20px;\n}\n"],sourceRoot:""}])},VyO4:function(t,n,o){var e=o("NssI");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);o("rjj0")("699c35eb",e,!1)},"i+2p":function(t,n,o){t.exports=o.p+"static/img/download-logo.jpg"},"v+gC":function(t,n,o){t.exports=o.p+"static/img/wexin-download-arrow.png"},voIw:function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={methods:{downloadAndroid:function(){var t=~"app-production".indexOf("development")?"dev":"prod";window.open("https://app-static.fnsudai.com/beebird_"+t+"_1_0_0.apk","_blank")}},data:function(){return{isInWeixin:this.isWeixin()}}}}});