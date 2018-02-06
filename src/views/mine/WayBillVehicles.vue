<template lang="pug">
  section.way-bill-vehicle-list
    section.body
      mt-navbar(v-model='tabActive', ref="navBar")
        mt-tab-item#0.tab-0 全部
        mt-tab-item#1.tab-1 待验车
        mt-tab-item#2.tab-2 待发运
        mt-tab-item#3.tab-3 在途
        mt-tab-item#4.tab-4 到达
        mt-tab-item#5.tab-5 完成
        mt-tab-item#6.tab-6 失效
      mt-tab-container.overflow-scroll(v-model='tabActive', :swipeable="true", disable-swipe, ref="tabContainer")
        mt-tab-container-item(v-for="index in 7", :id="'' + (index - 1)", v-infinite-scroll="loadMore", infinite-scroll-disabled="loading", infinite-scroll-distance="10")
          .card-body
            .no-data(v-if="!wayBillVehicleList.length")
              i.iconfont.icon-car
              p 没有订单数据
            kt-card-item.stress(v-for='wayBillVehicle in wayBillVehicleList', :key='wayBillVehicle.number', :header-left='wayBillVehicle.model', :header-right="wayBillVehicle.status | wayBillVehicleStatusFormat")
              //- span.color-primary(slot='arrow') {{wayBillVehicle.status | wayBillVehicleStatusFormat}}
              .content
                .content-row 车架号：{{wayBillVehicle.frameNo}}
                .content-row 指导价：{{wayBillVehicle.price}}万元
                .content-row
                  small
                    span 运价：{{wayBillVehicle.transportFee | ktCurrency}}
                    span.pl10 保险费：{{wayBillVehicle.insuranceFee | ktCurrency}}
              .buttons.text-right.ui-border-t(slot='footer')
                button.ui-border-radius.warning(@click="showVehiclePhoto(wayBillVehicle)") 验车照片
            .no-more-data(v-if="noMoreData")
              small 已经到底了
    mt-popup.popup-box(v-model="photosVisible", position="right")
      mt-header(ref="header", title="验车照片")
        //- mt-button(icon="back", slot="left", @click.prevent="photosVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="photosVisible = false")
      vehicle-photo(:photos="activePhotos", ref="vehiclePhoto", :close="() => {photosVisible = false}")
</template>

<script>
import MineMixin from '@/views/mine/mixin.js'
import { wayBillVehicles } from '@/common/resources.js'
import { debounce } from 'lodash'
import VehiclePhoto from '@/views/mine/VehiclePhoto.vue'

export default {
  mixins: [MineMixin],
  components: { VehiclePhoto },
  async mounted() {
    this.updateContainerHeight()
    this.search()
  },

  created() {
    this.filter = { ...this.filter, ...this.$route.query }
    this._fetchData()
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.photosVisible) {
        this.$refs.vehiclePhoto.backButtonAction()
      } else {
        this.routerBack()
      }
    },
    // 计算container高度
    updateContainerHeight() {
      let navBarHeight = 0
      let headerHeight = 0
      const $app = this.$root.$children[0]

      this.$nextTick(() => {
        navBarHeight = this.$refs.navBar.$el.getBoundingClientRect().height
        if ($app.headerShow) {
          headerHeight = $app.$refs.header.$el.getBoundingClientRect().height
        }
        this.$refs.tabContainer.$el.style.height = `${window.innerHeight - navBarHeight - headerHeight}px`
      })
    },

    showVehiclePhoto(model) {
      this.activePhotos = model.photos
      this.photosVisible = true
    },

    loadMore: debounce(function() {
      this._fetchData(true)
    }, 500),

    search() {
      this.noMoreData = false
      this.$router.replace({
        name: this.$route.name,
        query: { ...this.filter, page: 1 }
      })
    },

    async _fetchData(isMore) {
      if (isMore) this.filter.page += 1
      else this.filter.page = 1

      this.loading = true
      if (this.filter.status === '0') this.filter.status = null

      const res = await wayBillVehicles.get({ id: this.$route.params.id, ...this.pruneParams(this.filter) }).then(res => res.json()).catch(res => {
        this.loading = false
        throw res
      })

      if (isMore) this.wayBillVehicleList = this.wayBillVehicleList.concat(res.data.result)
      else this.wayBillVehicleList = res.data.result

      if (res.data.result.length) {
        this.loading = false
      } else {
        this.loading = true
        if (this.wayBillVehicleList.length) this.noMoreData = true
      }
    }
  },

  watch: {
    tabActive() {
      if (this.tabActive !== '0') {
        this.filter.status = this.tabActive
      } else {
        this.filter.status = null
      }
      this.$el.querySelector('.tab-' + this.tabActive).scrollIntoView()
      this.search()
    },

    $route() {
      this._fetchData()
    }
  },

  data() {
    return {
      filter: {
        page: 1,
        size: 10,
        status: '0'
      },
      activePhotos: { normal: {} },
      photosVisible: false,
      loading: false,
      noMoreData: false,
      wayBillVehicleList: [],
      tabActive: '0'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
