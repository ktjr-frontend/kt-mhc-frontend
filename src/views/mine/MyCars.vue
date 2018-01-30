<template lang="pug">
  section.my-cars
    vehicle-list(ref="vehicleList", from="mine", :close="closeVehicleList", @popup-confirmed="vehicleConfirm")
</template>

<script>
import VehicleList from '@/views/pickup/VehicleList.vue'

export default {
  components: { VehicleList },
  mounted() {
    this.$refs.vehicleList.init()
  },

  methods: {
    closeVehicleList() {
      this.routerBack()
    },
    vehicleConfirm({ vehicles, checkedCar }) {
      this.model.vehicle = {
        count: checkedCar.length,
        vehicles: vehicles
      }
      this.$router.push({
        name: 'pickCar',
        params: this.model
      })
    }
  },

  data() {
    return {
      model: {
        vehicle: {}
      }
    }
  }
}
</script>
