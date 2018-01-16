import { pruneParams } from '@/common/helpers.js'
import { isWeixin } from '@/common/utils.js'
import { ORDER_STATUS_MAP } from '@/constants.js'
const routerCrumbs = []

export default {
  install(Vue, options) {
    return Vue.mixin({
      methods: {
        pruneParams,
        isWeixin,
        routerBack() { // 添加过渡动画在back的时候
          // if (this.routerCrumbs.length) {
          //   const preRoute = this.routerCrumbs.pop()
          //   this.$router.push({
          //     name: preRoute.name,
          //     query: preRoute.query,
          //     params: {
          //       ...preRoute.params,
          //       notSaveCrumbed: true,
          //       transitionName: 'slideLeftFade'
          //     }
          //   }, true)
          // } else {
          this.$store.commit('updateTransitionName', 'slideLeftFade')
          this.$router.back()
          // }
        },
        routerForward() {
          this.$store.commit('updateTransitionName', 'slideRightFade')
          this.$router.forward()
        }
      },

      computed: {
        routerCrumbs: {
          get() {
            return routerCrumbs
          }
        }
      },

      data() {
        return {
          ORDER_STATUS_MAP
        }
      }
    })
  }
}
