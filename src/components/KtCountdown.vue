<template lang="pug">
small 已发送({{second}} s)
</template>

<script>
export default {
  name: 'kt-countdown',
  methods: {
    start() {
      const _self = this
      this.handle = setInterval(function countDown() {
        if (_self.second > 0) {
          _self.second -= 1
        } else {
          _self.end()
        }
      }, 1000)
    },
    end() {
      clearInterval(this.handle)
      this.second = 59
      this.$emit('countdown-over')
    }
  },

  data() {
    return {
      handle: null,
      second: 59
    }
  }
}
</script>
