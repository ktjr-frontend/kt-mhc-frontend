webpackJsonp([3,14],{"50pe":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"search-orders"},["popup"===t.openType?a("mt-header",{ref:"header",attrs:{title:"订单搜索"}},[a("div",{attrs:{slot:"left"},slot:"left"},[a("i",{staticClass:"p10 iconfont icon-guanbi",on:{click:function(e){e.preventDefault(),t.close(e)}}})])]):t._e(),a("header",{ref:"searchHeader",staticClass:"flex search-header"},[a("div",{staticClass:"search-input flex-item flex"},[a("i",{staticClass:"iconfont icon-sousuo"}),a("input",{staticClass:"flex-item",attrs:{type:"search",placeholder:"搜索"},domProps:{value:t.filter.value},on:{input:function(e){t.inputChange(e)},keyup:function(e){if(!("button"in e)&&13!==e.keyCode)return null;t.search(e)}}}),t.filter.value?a("i",{staticClass:"iconfont icon-qingchu",on:{click:t.clearSearch}}):t._e()]),a("button",{staticClass:"cancel-btn",on:{click:function(e){e.preventDefault(),t.cancel(e)}}},[t._v("取消")])]),a("section",{staticClass:"body"},[a("mt-navbar",{ref:"navBar",model:{value:t.filter.tabActive,callback:function(e){t.$set(t.filter,"tabActive",e)},expression:"filter.tabActive"}},[a("mt-tab-item",{attrs:{id:"vin"}},[t._v("车架号后6位")]),a("mt-tab-item",{attrs:{id:"modelName"}},[t._v("车型")]),a("mt-tab-item",{attrs:{id:"supplier"}},[t._v("供应商/经销商")])],1),a("mt-tab-container",{ref:"tabContainer",staticClass:"overflow-scroll",attrs:{swipeable:!0,"disable-swipe":"disable-swipe"},model:{value:t.filter.tabActive,callback:function(e){t.$set(t.filter,"tabActive",e)},expression:"filter.tabActive"}},t._l(["vin","modelName","supplier"],function(e){return a("mt-tab-container-item",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{id:e,"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[t.orderList.length?t._e():a("div",{staticClass:"no-data"},[a("i",{staticClass:"iconfont icon-car"}),a("p",[t._v("此搜索条件下没有结果")])]),t._l(t.orderList,function(e){return a("kt-card-item",{key:e.number,attrs:{"header-left":"订单号："+e.no,"header-right":t._f("moment")(e.applicationDate,"YYYY-MM-DD"),"arrow-visible":!0,arrow:t._f("orderStatusFormat")(e.status)}},[a("span",{staticClass:"color-primary",attrs:{slot:"arrow"},on:{click:function(a){t.goToDetail(e)}},slot:"arrow"},[t._v(t._s(t._f("orderStatusFormat")(e.status)))]),a("div",{staticClass:"content",on:{click:function(a){t.goToDetail(e)}}},[a("div",{staticClass:"content-row"},[t._v("垫资金额："+t._s(t._f("ktCurrency")(e.loanAmount)))]),a("div",{staticClass:"content-row"},[t._v("供应商："+t._s(e.supplier))]),a("div",{staticClass:"content-row flex"},[a("div",{staticClass:"content-left flex-item"},[t._v("订单描述："+t._s(e.brandName)+" "+t._s(e.seriesName)+" "+t._s(e.modelName))]),a("div",{staticClass:"content-right"},[t._v("共 "+t._s(e.vehicleNumber)+" 辆")])])]),t.canCloseStatus(e.status)||t.canEditStatus(e.status)?a("div",{staticClass:"buttons text-right ui-border-t",attrs:{slot:"footer"},slot:"footer"},[t.canCloseStatus(e.status)?a("button",{staticClass:"ui-border-radius",on:{click:function(a){t.closeOrder(e)}}},[t._v("关闭订单")]):t._e(),t.canEditStatus(e.status)?a("button",{staticClass:"ui-border-radius warning",on:{click:function(a){t.editOrder(e)}}},[t._v("编辑资料")]):t._e()]):t._e()])}),t.noMoreData?a("div",{staticClass:"no-more-data"},[a("small",[t._v("已经到底了")])]):t._e()],2)}))],1)],1)},staticRenderFns:[]}},BKUq:function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,".iconfont[data-v-f15f2e52]{width:30px;text-align:center}",""])},BzB9:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={methods:{},data:function(){return{tabActive:"1"}}}},Fyup:function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,"header[data-v-3b78c9f9]{padding:15px 10px;font-size:15px}em[data-v-3b78c9f9]{color:#f44336}.photo-body[data-v-3b78c9f9]{padding:10px}.preview[data-v-3b78c9f9]{background:#fafafa;height:100px;width:100px;position:relative;margin-right:15px;margin-bottom:15px}.preview .icon-qingchu[data-v-3b78c9f9]{position:absolute;right:-.5em;top:-.5em;font-size:20px;color:#b7bac2;z-index:999}.preview .icon-qingchu[data-v-3b78c9f9]:active{color:#fe6252}.preview img[data-v-3b78c9f9]{max-width:100%;max-height:100%;position:absolute;left:50%;top:50%;z-index:9;-ms-transform:translateY(-50%) translateX(-50%);transform:translateY(-50%) translateX(-50%)}.upload-input[data-v-3b78c9f9]{background:#fafafa;height:100px;width:100px;position:relative;margin-right:15px;margin-bottom:15px}.upload-input .icon-paizhao[data-v-3b78c9f9]{position:absolute;top:50%;left:50%;font-size:25px;color:#333;-ms-transform:translateY(-50%) translateX(-50%);transform:translateY(-50%) translateX(-50%)}.upload-input input[data-v-3b78c9f9]{opacity:0;position:absolute;height:100%;width:100%;left:0;right:0;z-index:99}",""])},NDDF:function(t,e,a){var i=a("m5sx");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("b75932de",i,!0)},NJHo:function(t,e,a){var i=a("Fyup");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("2c2e9d4c",i,!0)},PeBT:function(t,e,a){a("uIpU");var i=a("VU/8")(a("iAGB"),a("mB0m"),"data-v-d90f621a",null);t.exports=i.exports},"Rb/J":function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,".src-views-order-ApplyProcedure---has-header---1ZddK_0{margin-top:40px}",""]),e.locals={"has-header":"src-views-order-ApplyProcedure---has-header---1ZddK_0",hasHeader:"src-views-order-ApplyProcedure---has-header---1ZddK_0"}},S1qk:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"order-detail",class:this.$root.$children[0].headerShow?this.$style.hasHeader:""},[a("section",{staticClass:"body"},[a("mt-navbar",{model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},[a("mt-tab-item",{attrs:{id:"1"}},[t._v("可申请")]),a("mt-tab-item",{attrs:{id:"2"}},[t._v("已申请")])],1),a("mt-tab-container",{attrs:{swipeable:!0,"disable-swipe":"disable-swipe"},model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},[a("mt-tab-container-item",{attrs:{id:"1"}},[a("div",{staticClass:"no-data"},[a("i",{staticClass:"iconfont icon-car"}),a("p",[t._v("暂无数据")])])]),a("mt-tab-container-item",{attrs:{id:"2"}},[a("div",{staticClass:"no-data"},[a("i",{staticClass:"iconfont icon-car"}),a("p",[t._v("暂无数据")])])])],1)],1)])},staticRenderFns:[]}},VpZm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),r=a("exGp"),o=a.n(r),n=a("nWjG");e.default={mixins:[n.a],props:{close:Function},methods:{init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.order=t},submit:function(){var t=this;return o()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$validate();case 2:a=e.sent,console.log(a),a?t.$emit("popup-confirmed",{order:t.order,reason:t.model}):t.$toast(t.validation.firstError(),"error");case 5:case"end":return e.stop()}},e,t)}))()}},validators:{"model.reason":function(t){return this.validate(t).required("请选择取消原因")},"model.otherReason":function(t){var e=this;return this.validate(t).custom(function(){if("其他"===e.model.reason&&!t)return"请填写其他原因"})}},data:function(){return{order:null,model:{reason:null,otherReason:null},reasonList:[{label:"价格不合适",value:"价格不合适"},{label:"无法异地购车",value:"无法异地购车"},{label:"其他",value:"其他"}]}}}},WC8o:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("Xxa5"),s=a.n(i),r=a("exGp"),o=a.n(r),n=a("Dd8w"),l=a.n(n),c=a("3dbI"),u=a("M4fF"),d=(a.n(u),a("p5Qk"));e.default={mixins:[d.a],props:{close:Function},mounted:function(){"page"===this.openType&&this.updateContainerHeight()},created:function(){this.filter=l()({},this.filter,this.$route.query),this._fetchData()},methods:{cancel:function(){this.close?this.close():this.routerBack()},clearSearch:function(){this.filter.value="",this.orderList=[],this.search()},updateContainerHeight:function(){var t=this,e=0,a=0,i=0,s=this.$root.$children[0];this.$nextTick(function(){e=t.$refs.searchHeader.getBoundingClientRect().height,a=t.$refs.navBar.$el.getBoundingClientRect().height,s.headerShow&&(i=s.$refs.header.$el.getBoundingClientRect().height),t.$refs.tabContainer.$el.style.height=window.innerHeight-a-i-e+"px"})},inputChange:function(t){this.filter.value=t.target.value,this.search()},loadMore:a.i(u.debounce)(function(){this._fetchData(!0)},500),search:function(){this.noMoreData=!1,this.$router.replace({name:this.$route.name,query:l()({},this.filter,{page:1})})},_fetchData:a.i(u.debounce)(function(){var t=o()(s.a.mark(function t(e){var a,i,r=this;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.filter.value){t.next=3;break}return this.orderList=[],t.abrupt("return");case 3:return this.filter.page=e?+this.filter.page+1:1,a={page:this.filter.page,size:this.filter.size},a[this.filter.tabActive]=this.filter.value,this.loading=!0,t.next=9,c.c.get(this.pruneParams(a)).then(function(t){return t.json()}).catch(function(t){throw r.loading=!1,t});case 9:i=t.sent,this.orderList=e?this.orderList.concat(i.data.pageData):i.data.pageData,i.data.pageData.length?this.loading=!1:(this.loading=!0,this.orderList.length&&(this.noMoreData=!0));case 12:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),300)},watch:{"filter.tabActive":function(){this.search()},$route:function(){this._fetchData()}},data:function(){return{openType:"page",loading:!1,noMoreData:!1,orderList:[],filter:{tabActive:"vin",page:1,size:10,value:""}}}}},bD9g:function(t,e,a){var i={};i.$style=a("ftUT"),a("NDDF");var s=a("VU/8")(a("BzB9"),a("S1qk"),"data-v-a586be98",i);t.exports=s.exports},ftUT:function(t,e,a){var i=a("Rb/J");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("5e54b673",i,!0)},iAGB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),s=a.n(i),r=a("Xxa5"),o=a.n(r),n=a("exGp"),l=a.n(n),c=a("uJ8L"),u=a.n(c),d=a("bD9g"),f=a.n(d),p=a("w3LH"),h=a.n(p),m=a("3dbI"),v=a("M4fF"),b=(a.n(v),a("p5Qk"));e.default={mixins:[b.a],components:{Search:u.a,ApplyProcedure:f.a,CancelOrderReason:h.a},methods:{headerClose:function(){this.$router.push({name:this.$route.query.from||"menu"})},closeOrder:function(t){var e=this;return l()(o.a.mark(function a(){var i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$confirm("确定取消订单？");case 2:i=a.sent,"confirm"===i&&(e.$refs.cancelOrder.init(t),e.showCancelOrderBox());case 4:case"end":return a.stop()}},a,e)}))()},cancelOrderConfirm:function(t){var e=this;return l()(o.a.mark(function a(){return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.order.status=e.ORDER_STATUS_MAP.CLOSED,console.log(t.reason.reason),e.closeCancelOrderBox();case 3:case"end":return a.stop()}},a,e)}))()},showAmountTip:function(){this.$msgBox({title:"额度详细说明",message:'\n          <section class="dialog-message">\n            <p>我的额度为以下两种模式之和：</p>\n            <p>对于代购车辆&le;2辆车的订单，累计额度为<em>150万</em>，利率<em>5%</em>；</p>\n            <p>对于订购车辆&gt;2辆车的订单，累计额度为<em>400万</em>，利率<em>4.5%</em>；</p>\n          </section>\n        '})},backButtonAction:function(){this.searchBoxVisible?this.searchBoxVisible=!1:this.cancelOrderVisible?this.cancelOrderVisible=!1:this.procedureBoxVisible?this.procedureBoxVisible=!1:this.applySheetVisible?this.applySheetVisible=!1:this.routerBack()},showSettlement:function(t){this.$router.push({name:"settlementDoc",params:{id:t.id}})},showSearchBox:function(){this.$router.push({name:"ordersSearch"})},closeSearchBox:function(){this.routerBack()},showCancelOrderBox:function(){this.cancelOrderVisible=!0},closeCancelOrderBox:function(){this.cancelOrderVisible=!1},showProcedureBox:function(){this.procedureBoxVisible=!0},closeProcedureBox:function(){this.procedureBoxVisible=!1},showApplyActions:function(t){this.$router.push({name:"pickCar",params:{id:t.id}})},search:function(t){this.filter.status=t.value,this.filter.reqDatetime=null,this.$router.push({name:this.$route.name,query:this.pruneParams(this.filter)}),this.statusFilterVisible=!1},toggleStatusFilter:function(){var t=this.$refs.searchColumn.getBoundingClientRect();this.statusFilterStyle.top=t.top+t.height+"px",this.statusFilterVisible=!this.statusFilterVisible},loadMore:a.i(v.debounce)(function(){this._fetchData(!0)},500),_fetchData:function(t){var e=this;return l()(o.a.mark(function a(){var i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t&&(e.filter.page+=1),e.loading=!0,a.next=4,m.c.get(e.pruneParams(e.filter)).then(function(t){return t.json()}).catch(function(t){throw e.loading=!0,t});case 4:i=a.sent,e.orderList=t?e.orderList.concat(i.data):i.data,i.data.length?e.loading=!1:(e.loading=!0,e.noMoreData=!0);case 7:case"end":return a.stop()}},a,e)}))()}},watch:{$route:function(){this._fetchData()}},created:function(){s()(this.filter,this.$route.query),this._fetchData()},data:function(){var t=this;return{applySheetVisible:!1,statusFilterVisible:!1,statusFilterStyle:{},searchBoxVisible:!1,cancelOrderVisible:!1,procedureBoxVisible:!1,loading:!1,noMoreData:!1,applyActions:[{name:"申请提车",method:function(){t.applySheetVisible=!0,t.$router.push({name:"pickCar"})}},{name:"\n          <p>物权转让</p>\n          <small>（将车辆物权转移给下游，有下游公司自行申请提车）</small>\n        ",method:function(){t.applySheetVisible=!0,t.$router.push({name:"interestTransfer"})}}],filter:{status:null,reqDatetime:null,reqCount:10},orderList:[]}}}},jEaE:function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,'header[data-v-d90f621a]{height:130px;background-color:#e27331;background-image:linear-gradient(0,#212a32,#39414a);color:#fff;padding:10px;position:relative;text-align:center;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}header h2[data-v-d90f621a]{position:relative;font-size:16px}header h2[data-v-d90f621a]:after{content:"";position:absolute;width:12.5em;left:0;bottom:-15px;border:1px solid #d9d9d9;-ms-transform:scale(.5);transform:scale(.5);-ms-transform-origin:0;transform-origin:0}.amount-line[data-v-d90f621a]{margin-top:20px}.amount[data-v-d90f621a]{color:#e27331;font-size:30px;font-family:franklin}.show-amount-tip[data-v-d90f621a]{position:absolute;right:-90px;top:-10px;font-size:12px}.search-column[data-v-d90f621a]{padding:10px;background:#fff;position:relative;z-index:9}.search-column button[data-v-d90f621a]{width:100%;white-space:nowrap;padding:5px;background:#eeefef;border:0;border-radius:100px;color:#b7bac2}.icon-filter[data-v-d90f621a]{margin-right:5px}.order-status-body[data-v-d90f621a]{position:fixed;bottom:0;top:0;left:0;right:0;background:rgba(0,0,0,.3)}.order-status-list[data-v-d90f621a]{background:#fff;padding:10px 5px}.order-status-list li[data-v-d90f621a]{width:33.33%;white-space:nowrap}.order-status-list .inner[data-v-d90f621a]{padding:5px 8px;margin:5px;text-align:center}.order-status-list .inner.selected[data-v-d90f621a]{color:#3586ff}.order-status[data-v-d90f621a]{width:80px;-ms-flex:none;flex:none;text-align:right;color:#e27331}.content[data-v-d90f621a]:active{opacity:.85}.content-left[data-v-d90f621a]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.content-right[data-v-d90f621a]{text-align:right}',""])},jlYo:function(t,e,a){var i=a("BKUq");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("5a363d35",i,!0)},m5sx:function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,".iconfont[data-v-a586be98]{width:30px;text-align:center}",""])},mB0m:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"orders"},[a("header",[a("h2",[t._v("我的额度（元）"),a("div",{staticClass:"show-amount-tip",on:{click:t.showAmountTip}},[a("i",{staticClass:"iconfont icon-info2 ft12 mr5"}),t._v("额度利率说明")])]),t._m(0)]),a("div",{ref:"searchColumn",staticClass:"search-column flex scroll-fixed"},[a("div",{staticClass:"flex-item"},[a("button",{on:{click:t.showSearchBox}},[t._v("搜索车架号、供应商/经销商、车型等关键词")])]),a("div",{staticClass:"order-status flex-item",on:{click:t.toggleStatusFilter}},[a("i",{staticClass:"iconfont icon-filter"}),t._v("订单状态")]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.statusFilterVisible,expression:"statusFilterVisible"}],staticClass:"order-status-body",style:t.statusFilterStyle,on:{touchstart:function(e){t.statusFilterVisible=!1}}},[a("ul",{staticClass:"order-status-list flex flex-start flex-wrap"},t._l(t.orderStatusList,function(e){return a("li",{key:e.value},[a("div",{staticClass:"inner ui-border-radius",class:{selected:t.filter.status===e.value},on:{touchstart:function(a){a.stopPropagation(),t.search(e)}}},[t._v(t._s(e.label))])])}))])]),a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],staticClass:"card-body",attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[t.orderList.length?t._e():a("div",{staticClass:"no-data"},[a("i",{staticClass:"iconfont icon-car"}),a("p",[t._v("没有订单数据")])]),t._l(t.orderList,function(e){return a("kt-card-item",{key:e.no,attrs:{"arrow-visible":!1}},[a("span",{attrs:{slot:"headerRight"},slot:"headerRight"},[a("i",{staticClass:"iconfont icon-edit ft14 smaller",on:{click:function(a){t.$router.push({name:"orderEdit",params:{id:e.id}})}}})]),a("span",{attrs:{slot:"headerLeft"},slot:"headerLeft"},[t._v("订单号："+t._s(e.no)),a("div",{staticClass:"smaller ml5"},[t._v(t._s(t._f("moment")(e.applicationDate,"YYYY-MM-DD")))])]),a("div",{staticClass:"content",on:{click:function(a){t.goToDetail(e)}}},[a("div",{staticClass:"content-row"},[t._v("垫资金额："+t._s(t._f("ktCurrency")(e.loanAmount)))]),a("div",{staticClass:"content-row"},[t._v("供应商："+t._s(e.supplier))]),a("div",{staticClass:"content-row flex"},[a("div",{staticClass:"content-left flex-item"},[t._v("订单描述："+t._s(e.brandName)+" "+t._s(e.seriesName)+" "+t._s(e.modelName))]),a("div",{staticClass:"content-right"},[t._v("共 "+t._s(e.vehicleNumber)+" 辆")])])]),a("div",{staticClass:"buttons flex ui-border-t",attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"text-left flex-item"},[t.canCloseStatus(e.status)?a("button",{staticClass:"ui-border-radius",on:{click:function(a){t.closeOrder(e)}}},[t._v("取消订单")]):t._e(),t.canPickStatus(e.status)?a("button",{staticClass:"ui-border-radius",on:{click:function(a){t.showApplyActions(e)}}},[t._v("申请提车")]):t._e()]),a("div",{staticClass:"text-right"},[a("span",{staticClass:"color-primary",attrs:{slot:"arrow"},on:{click:function(a){t.goToDetail(e)}},slot:"arrow"},[t._v(t._s(t._f("orderStatusFormat")(e.status)))]),a("i",{staticClass:"iconfont icon-you color-gray ft12 ml5"})])])])}),t.noMoreData&&t.orderList.length?a("div",{staticClass:"no-more-data"},[a("small",[t._v("已经到底了")])]):t._e()],2),a("mt-popup",{staticClass:"popup-box",attrs:{position:"right"},model:{value:t.searchBoxVisible,callback:function(e){t.searchBoxVisible=e},expression:"searchBoxVisible"}},[a("search",{ref:"searchBox",attrs:{close:t.closeSearchBox}})],1),a("mt-popup",{staticClass:"popup-box",attrs:{position:"right"},model:{value:t.cancelOrderVisible,callback:function(e){t.cancelOrderVisible=e},expression:"cancelOrderVisible"}},[a("cancel-order-reason",{ref:"cancelOrder",attrs:{close:t.closeCancelOrderBox},on:{"popup-confirmed":t.cancelOrderConfirm}})],1),a("mt-popup",{staticClass:"popup-box",attrs:{position:"right"},model:{value:t.procedureBoxVisible,callback:function(e){t.procedureBoxVisible=e},expression:"procedureBoxVisible"}},[a("apply-procedure",{attrs:{close:t.closeProcedureBox}})],1),a("kt-actionsheet",{attrs:{actions:t.applyActions},model:{value:t.applySheetVisible,callback:function(e){t.applySheetVisible=e},expression:"applySheetVisible"}}),a("div",{staticClass:"fixed-footer-placeholder"}),a("footer",{staticClass:"fixed-footer"},[a("div",{staticClass:"tab-item flex2 tab-btn"},[a("button",{on:{click:function(e){t.$router.push({name:"orderEdit",params:{id:"add"}})}}},[t._v("申请订单融资")])])])],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"amount-line"},[t._v("总额度："),a("span",{staticClass:"amount mr30"},[t._v("0")]),t._v("已用额度："),a("span",{staticClass:"amount"},[t._v("0")])])}]}},nBoK:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"letters"},[a("mt-header",{ref:"header",attrs:{title:"取消订单原因"}},[a("div",{attrs:{slot:"left"},slot:"left"},[a("i",{staticClass:"p10 iconfont icon-guanbi",on:{click:function(e){e.preventDefault(),t.close(e)}}})])]),a("header",[t._v("取消订单原因：")]),a("form",{ref:"popBoxContainer",staticClass:"overflow-scroll",on:{submit:function(e){e.preventDefault(),t.submit(e)}}},[a("section",{staticClass:"mt10"},[a("div",{staticClass:"fields"},[a("mt-radio",{staticClass:"first-no-border cell-radiolist",attrs:{state:t.getFieldState("model.reason"),options:t.reasonList},model:{value:t.model.reason,callback:function(e){t.$set(t.model,"reason",e)},expression:"model.reason"}}),a("input",{directives:[{name:"model",rawName:"v-model",value:t.model.reason,expression:"model.reason"}],attrs:{type:"hidden"},domProps:{value:t.model.reason},on:{input:function(e){e.target.composing||t.$set(t.model,"reason",e.target.value)}}}),"其他"===t.model.reason?a("kt-field",{attrs:{type:"textarea",label:"自定义原因：",state:t.getFieldState("model.otherReason"),placeholder:"填写具体原因"},nativeOn:{click:function(e){t.showFieldError(e,"model.otherReason")}},model:{value:t.model.otherReason,callback:function(e){t.$set(t.model,"otherReason",e)},expression:"model.otherReason"}}):t._e()],1)])]),a("div",{staticClass:"form-buttons-placeholder"}),a("div",{staticClass:"form-buttons fixed"},[a("mt-button",{staticClass:"mint-button-block",attrs:{type:"primary",size:"large"},on:{click:t.submit}},[t._v("确定")])],1)],1)},staticRenderFns:[]}},p5Qk:function(t,e,a){"use strict";var i=a("Xxa5"),s=a.n(i),r=a("exGp"),o=a.n(r),n=a("M4fF"),l=(a.n(n),a("oiih")),c=[{label:"全部",value:"0"},{label:"待补齐资料",value:l.b.WAIT_FILL_MATERIAL},{label:"待审核",value:l.b.WAIT_FOR_FIRST_CHECK},{label:"审核未通过",value:l.b.FISRT_CHECK_REJECTED},{label:"待物流验车",value:l.b.WAIT_FOR_CHECK_CAR},{label:"物流已验车",value:l.b.CHECK_PASSED},{label:"已发运",value:l.b.DISPATCHED},{label:"在途中",value:l.b.ON_THE_WAY},{label:"仓库验车不通过",value:l.b.STORE_CHECK_FAILED},{label:"已入库",value:l.b.PUT_IN_STORE},{label:"待提车",value:l.b.WAIT_FOR_PICK},{label:"已完成",value:l.b.PICK_SUCCESS},{label:"已取消",value:l.b.CLOSED}],u=[{label:"结算待支付",value:l.c.WAIT_FOR_PAY},{label:"待结算审核",value:l.c.CHECKING},{label:"还款审核通过",value:l.c.REJECT},{label:"审核通过",value:l.c.PASSED}],d=a.i(n.keyBy)(c,"value"),f=a.i(n.keyBy)(u,"value"),p={};e.a={filters:{orderStatusFormat:function(t){return d[t]?d[t].label:""},orderStatusClass:function(t){return p[t]||""},settlementStatusFormat:function(t){return f[t]?f[t].label:""}},methods:{closeOrder:function(t){var e=this;return o()(s.a.mark(function a(){var i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.$confirm("确定取消订单？");case 2:i=a.sent,"confirm"===i&&(t.status=e.ORDER_STATUS_MAP.CLOSED);case 4:case"end":return a.stop()}},a,e)}))()},editOrder:function(t){console.log(t),this.$router.push({name:"orderEdit",params:{id:t.id}})},goToDetail:function(t){this.$router.push({name:"orderDetail",params:{id:t.id}})},canEditStatus:function(t){return a.i(n.includes)([l.b.WAIT_FILL_MATERIAL,l.b.WAIT_FOR_FIRST_CHECK],t)},canPickStatus:function(t){return a.i(n.includes)([l.b.PUT_IN_STORE],t)},canCloseStatus:function(t){return a.i(n.includes)([l.b.WAIT_FILL_MATERIAL,l.b.FISRT_CHECK_REJECTED,l.b.WAIT_FOR_CHECK_CAR,l.b.DISPATCHED],t)}},computed:{},data:function(){return{orderStatusList:c,orderStatusMap:d,settlementStatusList:u,settlementStatusMap:f}}}},uIpU:function(t,e,a){var i=a("jEaE");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("62954170",i,!0)},uJ8L:function(t,e,a){a("jlYo");var i=a("VU/8")(a("WC8o"),a("50pe"),"data-v-f15f2e52",null);t.exports=i.exports},w3LH:function(t,e,a){a("NJHo");var i=a("VU/8")(a("VpZm"),a("nBoK"),"data-v-3b78c9f9",null);t.exports=i.exports}});