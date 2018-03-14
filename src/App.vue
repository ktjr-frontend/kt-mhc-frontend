<template lang="pug">
.app(:class="{'header-app': headerShow}")
  kt-updater-process
  n-progress(parent=".app")
  transition(:name="transitionName", appear, mode="out-in")
    mt-header(ref="header", fixed="", :title="headerTitle", v-show="headerShow")
      div(slot="left", v-if="headerBackShow")
        i.p10.iconfont.icon-houtui(@click="back()", v-if="!tabBarVisible")
        i.p10.iconfont.icon-guanbi(@click="close()", v-if="headerCloseVisible")
      //- mt-button(v-if="headerBackShow", icon="back", slot="left", @click="back()")
      //- mt-button.of-v(v-if="msgCountBtnVisible", slot="left", @click="$router.push({name: 'messageList'})")
        i.iconfont.icon-xiaoxi-solid.ft18.pos-r
          span.badge-red.badge-top 10
      //- mt-button(slot="right", v-if="sideMenuBarVisible")
        small
          a(@click="sideMenuVisible = !sideMenuVisible") 菜单
      //- mt-button(slot="right", v-if="msgListBtnVisible")
        small
          a(@click="emitEvent('messages-mark-read')") 全部已读
  .container(:class="{'header-show': headerShow, 'has-fixed-buttons': hasFixedButtons}", ref="container", v-touch:swipe.swipeleft.swiperight="onAppSwiper")
    transition(:name="transitionName", appear, mode="out-in")
      router-view(ref="routerView")
  //- mt-popup.popup-box.side-menu(v-model='sideMenuVisible', position='right')
    ul
      li
        router-link(:to="{name:'menu'}", :class="{'is-selected': homeTabItemIsSelected}")
          i.iconfont.icon-home
          | 首页
      li.ui-border-t
        router-link(:to="{name:'orders'}", :class="{'is-selected': orderTabItemIsSelected}")
          i.iconfont.icon-dingdan
          | 订单融资
      li.ui-border-t
        router-link(:to="{name:'pickCar'}", :class="{'is-selected': pickCarTabItemIsSelected}")
          i.iconfont.icon-che
          | 申请提车
      li.ui-border-t
        router-link(:to="{name:'depositAccount'}", :class="{'is-selected': depositTabItemIsSelected}")
          i.iconfont.icon-baozhengjinguanli
          | 保证金账户
      li.ui-border-t
        router-link(:to="{name:'mine'}", :class="{'is-selected': mineTabItemIsSelected}")
          i.iconfont.icon-wode
          | 我的
  mt-tabbar(:fixed="true", v-show="tabBarVisible", ref="tabbar")
    mt-tab-item#menu(:class="{'is-selected': homeTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-home1
      | 首页
    //- mt-tab-item#orders(:class="{'is-selected': orderTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-dingdan
      | 订单融资
    mt-tab-item#messages(:class="{'is-selected': msgTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-message
      | 消息
    mt-tab-item#service
      div(slot="icon")
        i.iconfont.icon-contact
      | 客服
    mt-tab-item#mine(:class="{'is-selected': mineTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-man
      | 我的
    //- mt-tab-item#mine(:class="{'is-selected': tabIsSelected(['mine', 'changeBankCardStep1', 'changeBankCardStep2', 'changeBankCardStep3', 'messageList', 'messageDetail'])}")
      div(slot="icon")
        i.iconfont.icon-user
      | 我的
</template>

<script>
import NProgress from '@/components/NProgress.vue'
import KtUpdaterProcess from '@/components/KtUpdaterProgress.vue'

import {
  headerRightButton,
  titleUpdater
} from '@/common/crossers.js'
import {
  mapGetters
} from 'vuex'
import {
  includes,
  each
} from 'lodash'

if (~process.env.NODE_ENV.indexOf('app')) {
  require('assets/fonts/iconfont/iconfont.css')
} else {
  require('http://at.alicdn.com/t/font_527342_843oaa5igohzd7vi.css')
}

export default {
  components: {
    NProgress,
    KtUpdaterProcess
  },

  mounted() {
    each(this.$refs.tabbar.$children, v => {
      v.$el.addEventListener('click', e => {
        this.tabClick(e, v.id)
      })
    })
    titleUpdater.$on('updatetitle', title => {
      this.title = title
    })

    // 滚动固定部分内容
    let fixedNormalTop = 0
    const container = this.$refs.container
    this.$refs.container.onscroll = () => {
      const fixedEl = document.querySelector('.scroll-fixed')
      let headerHeight = 0
      if (this.headerShow) headerHeight = 40
      if (fixedEl) {
        if (!fixedEl.classList.contains('fixed-top')) {
          fixedNormalTop = fixedEl.offsetTop
          if (container.scrollTop > fixedNormalTop - headerHeight) {
            fixedEl.style.top = headerHeight + 'px'
            fixedEl.classList.add('fixed-top')
          }
        } else {
          if (container.scrollTop <= fixedNormalTop - headerHeight) {
            fixedEl.style.top = 0
            fixedEl.classList.remove('fixed-top')
          }
        }
      }
    }
  },

  methods: {
    // container层swiper
    onAppSwiper(direction, event) {
      if (direction === 'swipeleft') {
        this._transitionName = 'slideRightFade'
        this.routerForward()
      } else if (direction === 'swiperight') {
        this._transitionName = 'slideLeftFade'
        this.back()
      }
    },

    // header的返回按钮
    back() {
      if (this.sideMenuVisible) {
        this.sideMenuVisible = false
        return
      }

      const routerView = this.$refs.routerView
      if (routerView.backButtonAction) {
        routerView.backButtonAction()
      } else {
        this.routerBack()
      }
    },

    // 关闭回首页
    close() {
      const routerView = this.$refs.routerView
      if (routerView.headerClose) {
        routerView.headerClose()
      } else {
        this.$router.push({
          name: 'menu'
        })
      }
    },

    // tab点击事件
    async tabClick(e, tab) {
      // await this.getUser()
      if (tab === 'service') {
        this.$msgBox({
          title: '客服电话',
          message: '<a href="tel://188123111123">188123111123'
        })
      } else {
        this.$router.push({
          name: tab
        })
      }
    },

    // 右侧按钮触发事件
    emitEvent(evName) {
      headerRightButton.$emit(evName)
    },

    // 设置container高度
    updateContainerHeight(route) {
      let tabBarHeight = 0
      let headerHeight = 0
      let otherHeight = 0
      this.$nextTick(() => {
        if (this.tabBarVisible) {
          tabBarHeight = this.$refs.tabbar.$el.getBoundingClientRect().height
        }

        if (this.headerShow) {
          headerHeight = this.$refs.header.$el.getBoundingClientRect().height
        }

        // const fixedFooter = document.querySelector('.fixed-footer')
        // if (fixedFooter) {
        //   otherHeight = fixedFooter.getBoundingClientRect().height
        // }

        this.$refs.container.style.height = `${window.innerHeight - tabBarHeight - headerHeight - otherHeight}px`
      })
    }
  },

  watch: {
    $route(to, from) {
      this.sideMenuVisible = false
      this.transitionName = this._transitionName || to.params.transitionName || this.$store.getters.transitionName
      this.updateContainerHeight(to, from)
      this._transitionName = ''
      this.title = this.$store.state.route.meta.title
      // if (from.fullPath !== '/' && !to.params.notSaveCrumbed) {
      //   if (!this.isPopStated) this.routerCrumbs.push(from)
      //   else this.routerCrumbs.pop() // 如果是history.back，那么需要删除当前页面的crumbs,因为上一步记录了此页面路由
      // }
    }
  },

  computed: {
    ...mapGetters(['route', 'stateCode', 'isPopStated']),
    headerCloseVisible() {
      return !this.tabBarVisible && this
    },
    homeTabItemIsSelected() {
      return includes(['menu'], this.$store.state.route.name)
    },
    orderTabItemIsSelected() {
      return includes(['orders', 'orderEdit', 'orderDetail'], this.$store.state.route.name)
    },
    pickCarTabItemIsSelected() {
      return includes(['pickCar'], this.$store.state.route.name)
    },
    depositTabItemIsSelected() {
      return includes(['depositAccount'], this.$store.state.route.name)
    },
    msgTabItemIsSelected() {
      return includes(['messages'], this.$store.state.route.name)
    },
    mineTabItemIsSelected() {
      return includes([
        'mine', 'profile'
        // , 'realNameAuth', 'companyAuth',
        // 'wayBill', 'wayBillDetail', 'wayBillVehicle'
      ], this.$store.state.route.name)
    },
    msgCountBtnVisible() {
      return includes(['mine'], this.$store.state.route.name)
    },
    msgListBtnVisible() {
      return includes(['messageList'], this.$store.state.route.name)
    },
    tabBarVisible() {
      return this.$store.state.route.meta.tabBarVisible
    },
    sideMenuBarVisible() {
      return !includes([
        'login', 'registerStep1', 'registerStep2',
        'forgetPasswordStep1', 'forgetPasswordStep2'
      ], this.$store.state.route.name)
    },
    headerShow() {
      // !this.isInWeixin &&
      return this.$store.state.route.meta.headerShow && (~process.env.NODE_ENV.indexOf('app') || ~process.env.NODE_ENV.indexOf('development'))
    },
    hasFixedButtons() {
      return this.$store.state.route.meta.hasFixedButtons
    },
    headerBackShow() {
      return window.history.length && this.$store.state.route.meta.headerBackShow
    },
    headerTitle() {
      return this.title || this.$store.state.route.meta.title
    }
  },

  data() {
    return {
      sideMenuVisible: false,
      isInWeixin: this.isWeixin(),
      title: '',
      transitionName: 'slideRightFade'
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-houtui {
  margin-left: -5px;
  &:after {
    content: '|';
    display: inline-block;
    color: lighten($header-bg-color, 8%);
    transform: translateX(10px);
  }
}
</style>

<style lang="scss">
@import '~assets/fonts/franklin/franklin.css';
@import '~assets/scss/base.scss';
@import '~assets/scss/common.scss';
@import '~assets/scss/border.scss';
@import '~assets/scss/transition.scss';
@import '~assets/scss/badge.scss';
@import '~assets/scss/flex.scss';
@import '~assets/scss/form.scss';
@import '~assets/scss/mint-ui.scss';
html {
  height: 100%;
}

body {
  font-family: '-apple-system', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  background-color: $primary-bg-color;
  min-height: 100%;
  color: $primary-font-color;
  font-size: $font-size-xs;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  transition: background .5s;
  &.menu {
    background-image: linear-gradient(0deg, #545b60, #212a32 34%);
  }
  &.registerStep1,
  &.registerStep2,
  &.forgetPasswordStep1,
  &.forgetPasswordStep2 {
    background-color: white;
  }
  &.login {
    background-image: url(~assets/images/login-bg.jpg);
    background-position: 100% $header-height;
    background-size: cover;
    background-repeat: no-repeat;
  }
}

#nprogress .spinner {
  display: none!important;
}

small {
  color: $placeholder-color;
}

.smaller {
  color: $placeholder-color;
  opacity: 0.8;
  font-size: $font-size-xxs;
  display: inline;
}

.container {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &.header-show {
    padding-top: $header-height;
  } // &.has-fixed-buttons {
  //   padding-bottom: 44px;
  // }
}

.side-menu {
  margin-top: $header-height;
  li {
    .iconfont {
      margin-right: 5px;
    }
    a {
      padding: 10px 10px;
      display: block;
      font-size: $font-size-s;
      color: $primary-font-color;
      &.is-selected {
        color: $primary-color;
      }
    }
    &:active {
      background-color: rgba(0, 0, 0, .1);
    }
  }
}
</style>
