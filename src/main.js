// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import '@/common/global_set.js'
import '@/common/pollyfill.js'
import router from '@/router'
import '@/common/resources.js'
import interceptors from '@/common/interceptors.js'
import KtFilters from '@/common/filters.js'
import KtMixins from '@/common/mixins.js'
import TouchDirective from '@/common/directives/touch.js'
import ClickoutsideDirective from '@/common/directives/clickoutside.js'
import InfiniteScrollDirective from '@/common/directives/infinite_scroll.js'
import SimpleVueValidation from 'simple-vue-validator'
import { getReadTime } from '@/common/utils.js'

import {
  Cell,
  CellSwipe,
  Swipe,
  SwipeItem,
  Field,
  Radio,
  Checklist,
  Header,
  Button,
  Toast,
  MessageBox,
  Indicator,
  Progress,
  Picker,
  Tabbar,
  TabItem,
  TabContainer,
  TabContainerItem,
  DatetimePicker,
  Actionsheet,
  Navbar,
  IndexList,
  IndexSection,
  Popup,
  Spinner
  // InfiniteScroll
} from 'mint-ui'

import KtField from '@/components/KtField.vue'
import KtSelect from '@/components/KtSelect.vue'
import KtDatePicker from '@/components/KtDatePicker.vue'
import KtCountdown from '@/components/KtCountdown.vue'
import KtIcon from '@/components/KtIcon.vue'
import KtCheckbox from '@/components/KtCheckbox.vue'
import KtActionsheet from '@/components/KtActionsheet.vue'
import KtMsgbox from '@/components/KtMsgbox.vue'
import KtCardItem from '@/components/KtCardItem.vue'
import KtInput from '@/components/KtInput.vue'
import KtPopupInput from '@/components/KtPopupInput.vue'
import KtAddressSelect from '@/components/KtAddressSelect.vue'
import KtImageView from '@/components/KtImageView.vue'
import KtTimeLine from '@/components/KtTimeLine.vue'

// vuex化路由
sync(store, router)

// mint-ui 组件
Vue.component(Cell.name, Cell)
Vue.component(CellSwipe.name, CellSwipe)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Field.name, Field)
Vue.component(Radio.name, Radio)
Vue.component(Checklist.name, Checklist)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(Progress.name, Progress)
Vue.component(Picker.name, Picker)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(Navbar.name, Navbar)
Vue.component(Popup.name, Popup)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Spinner.name, Spinner)
// Vue.use(InfiniteScroll)

// 自定义组件
Vue.component(KtField.name, KtField)
Vue.component(KtSelect.name, KtSelect)
Vue.component(KtDatePicker.name, KtDatePicker)
Vue.component(KtCountdown.name, KtCountdown)
Vue.component(KtIcon.name, KtIcon)
Vue.component(KtCheckbox.name, KtCheckbox)
Vue.component(KtActionsheet.name, KtActionsheet)
Vue.component(KtMsgbox.name, KtMsgbox)
Vue.component(KtCardItem.name, KtCardItem)
Vue.component(KtInput.name, KtInput)
Vue.component(KtPopupInput.name, KtPopupInput)
Vue.component(KtAddressSelect.name, KtAddressSelect)
Vue.component(KtImageView.name, KtImageView)
Vue.component(KtTimeLine.name, KtTimeLine)

Vue.use(KtFilters)
Vue.use(KtMixins)
Vue.use(TouchDirective)
Vue.use(ClickoutsideDirective)
Vue.use(InfiniteScrollDirective)

// 表单验证
Vue.use(SimpleVueValidation, {
  templates: {
    error: '错误',
    required: '必填项',
    float: '必须是小数',
    integer: '必须是整数',
    number: '必须是数值',
    lessThan: '必须小于{0}',
    lessThanOrEqualTo: '必须小于等于{0}',
    greaterThan: '必须大于{0}',
    greaterThanOrEqualTo: '必须大于等于{0}',
    between: '必须在{0}到{1}之间',
    size: '尺寸小于{0}',
    length: '长度小于{0}',
    minLength: '最小长度{0}',
    maxLength: '最大长度{0}',
    lengthBetween: '长度在{0}和{1}之间',
    /* beautify ignore:start */
    in: '必须是{0}',
    /* beautify ignore:end */
    notIn: '不能是{0}',
    match: '不匹配',
    regex: '错误的格式',
    digit: '必须是数字',
    email: '邮箱格式错误',
    url: 'url格式错误',
    optionCombiner: function(options) {
      if (options.length > 2) {
        options = [options.slice(0, options.length - 1).join(', '), options[options.length - 1]]
      }
      return options.join('或')
    }
  }
})

// vue-router 全局配置
Vue.http.options.root = process.env.API_HOST || '/api'

// vue-router拦截器统一注入
interceptors.forEach((v) => {
  Vue.http.interceptors.push(v)
})

// 自定义提示框icon样式
const ToastClasses = {
  'success': 'iconfont icon-chenggong',
  'error': 'iconfont icon-warning',
  'warn': 'iconfont icon-warn'
}

Vue.$msgBox = Vue.prototype.$msgBox = MessageBox
Vue.$alert = Vue.prototype.$alert = MessageBox.alert
Vue.$confirm = Vue.prototype.$confirm = MessageBox.confirm
Vue.$prompt = Vue.prototype.$prompt = MessageBox.prompt
Vue.$toast = Vue.prototype.$toast = function toast(msg = '', type = '') {
  Toast({
    message: msg,
    duration: getReadTime(msg),
    iconClass: type ? ToastClasses[type] : ''
  })
}
Vue.$indicator = Vue.prototype.$indicator = Indicator

// 主要入口函数
function main() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  })
}

// 启动应用
if (process.env.NODE_ENV.indexOf('app') > -1) {
  document.addEventListener('deviceready', e => {
    main()
    window.open = cordova.InAppBrowser.open
    const AppUpdater = require('@/app.updater.js').default
    // const AppNativeBridge = require('@/app.native_bridge.js').default
    // const userUpdater = require('@/common/crossers.js').userUpdater
    // AppNativeBridge.getPushMessage()

    // // 订阅消息，需要循环订阅，利用callback做的假的订阅者模式
    // function subscribeMessageLoop() {
    //   AppNativeBridge.subscribeMessage(AppNativeBridge.getPushMessage).then(subscribeMessageLoop).catch(subscribeMessageLoop)
    // }
    // subscribeMessageLoop()

    // // 订阅userid更新
    // userUpdater.$on('user-update', userId => {
    //   console.log('user-update event fired')
    //   AppNativeBridge.bindUId(userId)
    //   AppNativeBridge.setUId(store.getters.token)
    // })

    // // 程序激活的时候检查是否有新消息
    // document.addEventListener('webkitvisibilitychange', () => {
    //   if (!document.webkitHidden) {
    //     AppNativeBridge.getPushMessage()
    //   }
    // })

    // 启用热更新
    new AppUpdater({
      root: process.env.APP_MANIFEST_HOST
    })
  })
} else {
  main()
}
