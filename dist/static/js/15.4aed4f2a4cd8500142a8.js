webpackJsonp([15],{"2xEa":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Dd8w"),i=a.n(l),n=a("Xxa5"),s=a.n(n),r=a("exGp"),o=a.n(r),u=a("I8NT"),c=a("3dbI"),v=a("M4fF");a.n(v);e.default={mixins:[u.a],mounted:function(){var t=this;return o()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.updateContainerHeight(),t.search();case 2:case"end":return e.stop()}},e,t)}))()},created:function(){this.filter=i()({},this.filter,this.$route.query),this._fetchData()},methods:{updateContainerHeight:function(){var t=this,e=0,a=0,l=this.$root.$children[0];this.$nextTick(function(){e=t.$refs.navBar.$el.getBoundingClientRect().height,l.headerShow&&(a=l.$refs.header.$el.getBoundingClientRect().height),t.$refs.tabContainer.$el.style.height=window.innerHeight-e-a+"px"})},showVehicleInfo:function(t){this.$router.push({name:"wayBillVehicles",params:{id:t.id}})},showWayBillDetail:function(t){this.$router.push({name:"wayBillDetail",params:{id:t.id}})},loadMore:a.i(v.debounce)(function(){this._fetchData(!0)},500),search:function(){this.noMoreData=!1,this.$router.replace({name:this.$route.name,query:i()({},this.filter,{page:1})})},_fetchData:function(t){var e=this;return o()(s.a.mark(function a(){var l;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.filter.page=t?+e.filter.page+1:1,e.loading=!0,"0"===e.filter.status&&(e.filter.status=null),a.next=5,c.m.get(e.pruneParams(e.filter)).then(function(t){return t.json()}).catch(function(t){throw e.loading=!1,t});case 5:l=a.sent,e.wayBillList=t?e.wayBillList.concat(l.data.data):l.data.data,l.data.data.length?e.loading=!1:(e.loading=!0,e.wayBillList.length&&(e.noMoreData=!0));case 8:case"end":return a.stop()}},a,e)}))()}},watch:{tabActive:function(){"0"!==this.tabActive?this.filter.status=this.tabActive:this.filter.status=null,this.search()},$route:function(){this._fetchData()}},data:function(){return{filter:{page:1,size:10,status:"0"},loading:!1,noMoreData:!1,wayBillList:[],tabActive:"0"}}}},"39ck":function(t,e,a){e=t.exports=a("FZ+f")(),e.push([t.i,".no-more-data[data-v-ba19b88a]{text-align:center;padding:10px}",""])},AdFg:function(t,e,a){var l=a("39ck");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("7a3565e6",l,!0)},I8NT:function(t,e,a){"use strict";var l=a("M4fF"),i=(a.n(l),a("oiih")),n=[{label:"品牌4s店",value:1},{label:"港口商家",value:2},{label:"综合展厅",value:3},{label:"资源公司",value:4}],s=[{label:"待下单",value:1},{label:"已下单",value:2},{label:"待验车",value:3},{label:"已提车",value:4},{label:"已发运",value:5},{label:"在途中",value:6},{label:"已运抵",value:7},{label:"已完成",value:8},{label:"已作废",value:9}],r=[{label:"待验车",value:1},{label:"待发运",value:2},{label:"在途",value:3},{label:"到达",value:4},{label:"完成",value:5},{label:"失效",value:6}],o=[{label:"大板车",value:1},{label:"救援车",value:2}],u=[{label:"仓库",value:i.e.TO_WAREHOURSE},{label:"到店",value:i.e.TO_SHOP}],c=[{label:"销售主管",value:1},{label:"销售顾问",value:2},{label:"管理员",value:3}],v=[{label:"签章成功",label2:"可提车",value:1},{label:"未签章",label2:"不可提车",value:2}],d=[{label:"未认证",value:"initial"},{label:"已认证",value:"passed"},{label:"审核中",value:"checking"},{label:"认证失败",value:"rejected"}],b=[{label:"未读",value:"1"},{label:"已读",value:"2"}],f=a.i(l.keyBy)(n,"value"),h=a.i(l.keyBy)(s,"value"),p=a.i(l.keyBy)(r,"value"),y=a.i(l.keyBy)(o,"value"),m=a.i(l.keyBy)(u,"value"),w=a.i(l.keyBy)(c,"value"),g=a.i(l.keyBy)(v,"value"),_=a.i(l.keyBy)(d,"value"),C=a.i(l.keyBy)(b,"value");e.a={filters:{companyTypeFormat:function(t){return f[t]?f[t].label:""},wayBillStatusFormat:function(t){return h[t]?h[t].label:""},wayBillVehicleStatusFormat:function(t){return p[t]?p[t].label:""},transportTypeFormat:function(t){return y[t]?y[t].label:""},deliveryTypeFormat:function(t){return m[t]?m[t].label:""},jobTypeFormat:function(t){return w[t]?w[t].label:""},pickCarLetterStatusFormat:function(t){return g[t]?g[t].label:""},pickCarLetterStatusFormat2:function(t){return g[t]?g[t].label2:""},certifyStatusFormat:function(t){return _[t]?_[t].label:""},messageStatusFormat:function(t){return C[t]?C[t].label:""}},methods:{headerClose:function(){this.$router.push({name:"mine"})}},data:function(){return{companyTypeList:n,companyTypeMap:f,wayBillStatusList:s,wayBillStatusMap:h,wayBillVehicleStatusList:r,wayBillVehicleStatusMap:p,transportTypeList:o,transportTypeMap:y,deliveryTypeList:u,deliveryTypeMap:m,jobTypeList:c,jobTypeMap:w,pickCarStatusList:v,pickCarStatusMap:g,certifyStatusList:d,certifyStatusMap:_,messageStatusList:b,messageStatusMap:C}}}},TeNP:function(t,e,a){a("AdFg");var l=a("VU/8")(a("2xEa"),a("qheG"),"data-v-ba19b88a",null);t.exports=l.exports},qheG:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"way-bill-list"},[a("section",{staticClass:"body"},[a("mt-navbar",{ref:"navBar",model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},[a("mt-tab-item",{attrs:{id:"0"}},[t._v("全部")]),a("mt-tab-item",{attrs:{id:"1"}},[t._v("待付款")]),a("mt-tab-item",{attrs:{id:"2"}},[t._v("进行中")]),a("mt-tab-item",{attrs:{id:"3"}},[t._v("已完成")]),a("mt-tab-item",{attrs:{id:"4"}},[t._v("失效")])],1),a("mt-tab-container",{ref:"tabContainer",staticClass:"overflow-scroll",attrs:{swipeable:!0,"disable-swipe":"disable-swipe"},model:{value:t.tabActive,callback:function(e){t.tabActive=e},expression:"tabActive"}},t._l(5,function(e){return a("mt-tab-container-item",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{id:"0",id:e-1+"","infinite-scroll-disabled":"loading","infinite-scroll-distance":"10"}},[a("div",{staticClass:"card-body"},[t.wayBillList.length?t._e():a("div",{staticClass:"no-data"},[a("i",{staticClass:"iconfont icon-car"}),a("p",[t._v("没有订单数据")])]),t._l(t.wayBillList,function(e){return a("kt-card-item",{key:e.number,staticClass:"stress",attrs:{"header-left":e.name,"header-right":t._f("wayBillStatusFormat")(e.status)}},[a("div",{staticClass:"content"},[a("div",{staticClass:"content-row"},[t._v("运单编号："+t._s(e.number))]),a("div",{staticClass:"content-row"},[t._v("订单宝号："+t._s(e.orderNumber))]),a("div",{staticClass:"content-row"},[a("div",{staticClass:"content-left flex-item"},[t._v("车辆数量："+t._s(e.vehicleCount))])]),a("div",{staticClass:"content-row"},t._l(e.detail,function(e){return a("span",{staticClass:"mr10"},[t._v(t._s(e.model)+" "+t._s(t._f("ktCurrency")(e.price,"","元"))+" "+t._s(e.count)+" 辆")])}))]),a("div",{staticClass:"buttons text-right ui-border-t",attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"ui-border-radius",on:{click:function(a){t.showVehicleInfo(e)}}},[t._v("车辆信息")]),a("button",{staticClass:"ui-border-radius warning",on:{click:function(a){t.showWayBillDetail(e)}}},[t._v("运单详情")])])])}),t.noMoreData?a("div",{staticClass:"no-more-data"},[a("small",[t._v("已经到底了")])]):t._e()],2)])}))],1)])},staticRenderFns:[]}}});