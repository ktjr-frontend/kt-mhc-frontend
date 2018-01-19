<template lang="pug">
.app(:class="{'header-app': headerShow}")
  kt-updater-process
  n-progress(parent=".app")
  transition(:name="transitionName", appear, mode="out-in")
    mt-header(ref="header", fixed="", :title="headerTitle", v-show="headerShow")
      mt-button(v-if="headerBackShow", icon="back", slot="left", @click="back()") 返回
      //- mt-button.of-v(v-if="msgCountBtnVisible", slot="left", @click="$router.push({name: 'messageList'})")
        i.iconfont.icon-xiaoxi-solid.ft18.pos-r
          span.badge-red.badge-top 10
      mt-button(slot="right")
        small
          a(@click="sideMenuVisible = !sideMenuVisible") 菜单
      //- mt-button(slot="right", v-if="msgListBtnVisible")
        small
          a(@click="emitEvent('messages-mark-read')") 全部已读
  .container(:class="{'header-show': headerShow, 'has-fixed-buttons': hasFixedButtons}", ref="container", v-touch:swipe.swipeleft.swiperight="onAppSwiper")
    transition(:name="transitionName", appear, mode="out-in")
      router-view(ref="routerView")
  mt-popup.popup-box.side-menu(v-model='sideMenuVisible', position='right')
    ul(:class="this.headerShow ? this.$style.hasHeader : ''")
      li
        router-link(:to="{name:'menu'}", :class="{'is-selected': $route.name === 'menu'}")
          i.iconfont.icon-home
          | 首页
      li.ui-border-t
        router-link(:to="{name:'orders'}", :class="{'is-selected': fisrtTabItemIsSelected}")
          i.iconfont.icon-dingdan
          | 订单宝
      li.ui-border-t
        router-link(:to="{name:'mine'}", :class="{'is-selected': secondTabItemIsSelected}")
          i.iconfont.icon-wode
          | 我的
  mt-tabbar(:fixed="true", v-show="tabBarVisible", ref="tabbar")
    mt-tab-item#orders(:class="{'is-selected': fisrtTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-order
      | 订单宝
    mt-tab-item#stocks(:class="{'is-selected': secondTabItemIsSelected}")
      div(slot="icon")
        i.iconfont.icon-wode
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
  require('http://at.alicdn.com/t/font_527342_zm4fx9zwg2t0ggb9.css')
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
    // ...mapActions(),

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

    // tab点击事件
    async tabClick(e, tab) {
      // await this.getUser()
      this.$router.push({
        name: tab
      })
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
    fisrtTabItemIsSelected() {
      return includes(['orders', 'orderEdit', 'orderDetail'], this.$store.state.route.name)
    },
    secondTabItemIsSelected() {
      return includes(['mine', 'profile'], this.$store.state.route.name)
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

<style lang="scss" module>
.has-header {
  margin-top: $header-height;
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
  &.login {
    background-color: white;
  }
}

#nprogress .spinner {
  display: none!important;
}

small {
  color: $gray-color;
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
