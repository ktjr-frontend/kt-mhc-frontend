<template lang="pug">
  section.category
    //- .logo
      img(src="~assets/images/icon.png")
    .card-container.box-border.box-border-tb
      .card.box-border.box-border-r
        router-link.card-inner(:to="{name: 'orders'}")
          i.iconfont.icon-dingdan.el-blue
          p 订单宝
      .card.box-border.box-border-r
        router-link.card-inner(:to="{name: 'stocks'}")
          i.iconfont.icon-kucun.el-green
          p 库存宝
      .card
        .card-inner(@click="more()")
          i.iconfont.icon-gengduo.el-light-gray
          p 更多
</template>

<script>
export default {
  methods: {
    more() {
      this.$toast('敬请期待')
    }
  }
}
</script>

<style lang="scss">
.card-container {
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  position: relative; // padding: 5vw;
  .iconfont {
    display: block;
    font-size: 40px;
    margin-bottom: 8px;
  }

  .card {
    position: relative;
    font-size: 12px;
    height: 33.33vw;
    width: 33.33vw; // box-sizing: border-box;
    background-color: white;
    &:active {
      background: $border-color;
    }
  }
  .card-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    color: $minor-font-color;
    align-items: center;
    justify-content: center;
    height: 100%; // flex: 1;
    // margin: 10px;
    p {
      min-height: 28px;
      padding: 0 5px;
    }
  }
}
</style>
