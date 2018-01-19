<template lang="pug">
  section.interest-transfer
    vehicle-list(ref="vehicleList", from="interestTransfer", :close="closeVehicleList", @popup-confirmed="vehicleConfirm")
    mt-popup.popup-box(v-model='chooseBuyerVisible', position='right')
      choose-buyer(ref="chooseBuyer", @popup-confirmed="buyerConfirm")
</template>

<script>
import VehicleList from '@/views/pickup/VehicleList.vue'
import ChooseBuyer from '@/views/pickup/ChooseBuyer.vue'
import { filter, some } from 'lodash'

export default {
  components: { VehicleList, ChooseBuyer },
  mounted() {
    this.$nextTick(() => {
      this.$refs.vehicleList.init()
    })
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.chooseBuyerVisible) {
        this.chooseBuyerVisible = false
      } else {
        this.routerBack()
      }
    },

    vehicleConfirm({ vehicles, checkedCar }) {
      console.log(checkedCar)
      const checkedVehicles = filter(vehicles, v => some(v.children, c => c.checked))
      this.$refs.chooseBuyer.init(checkedVehicles, checkedCar)
      this.chooseBuyerVisible = true
    },

    buyerConfirm(model) {

    },

    closeVehicleList() {
      this.$router.back()
    }
  },

  data() {
    return {
      chooseBuyerVisible: false
    }
  }
}
</script>
