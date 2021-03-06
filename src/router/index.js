import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes.js'
import store from '@/store'
// import {  isString, flattenDeep } from 'lodash'
// import { RET_CODE_MAP } from '@/constants.js'
// import { Toast } from 'mint-ui'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: ~process.env.NODE_ENV.indexOf('app') ? 'hash' : 'history',
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach(async(to, from, next) => {
  const nextAsync = function(opt) { // 避免watch先于popstate事件执行的问题
    setTimeout(() => { opt ? next(opt) : next() })
  }

  const { user, token, stateCode } = store.getters
  if (!to.meta.skipAuth) { // 需要登录权限的页面
    if (!token || !user.phone) {
      nextAsync({ name: 'login', query: { redirect: to.fullPath } })
    } else if (stateCode) {
      nextAsync()
    } else {
      await store.dispatch('getUser')
      nextAsync()
    }
  } else { // 不需要权限的页面不拦截
    nextAsync()
  }
})

router.afterEach((to) => {
  if (to.name !== undefined) {
    document.body.setAttribute('class', to.name)
    document.body.setAttribute('page', to.name)
  }

  if (to.meta.title) {
    document.title = to.meta.title

    // hack ios title not update bug
    const iframe = document.createElement('iframe')
    iframe.classList.add('dn')
    iframe.src = require('assets/images/clear.png')
    document.body.appendChild(iframe)
    iframe.onload = () => {
      setTimeout(() => {
        iframe.onload = null
        document.body.removeChild(iframe)
      }, 10)
    }
  }
})

// 给push方法添加默认过渡效果和记录堆栈
const oldPush = router.push
router.push = function(location = {}, isBackPush) {
  if (typeof location === 'string') location = { path: location }
  if (!location.params) location.params = {}
  if (!location.params.transitionName) location.params.transitionName = 'slideRightFade'
  if (!isBackPush) store.commit('updateIsPopStated', false)
  oldPush.call(router, location)
}

// 替换replace方法
const oldReplace = router.replace
router.replace = function(location = {}, isBackPush) {
  if (typeof location === 'string') location = { path: location }
  if (!location.params) location.params = {}
  if (!location.params.transitionName) location.params.transitionName = 'slideRightFade'
  if (!isBackPush) store.commit('updateIsPopStated', false)
  oldReplace.call(router, location)
}

export default router
