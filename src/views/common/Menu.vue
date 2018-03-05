<template lang="pug">
  section.category
    //- .logo
      img(src="~assets/images/icon.png")
    .card-container
      .card.box-border.box-border-b.opacity0_5
        router-link.card-inner(:to="{name: 'orders'}")
          i.iconfont.icon-order
          p 订单融资
          i.iconfont.icon-you.ft25
    .footer
      button(@click="$router.push({name: 'depositAccount'})")
        i.iconfont.icon-shield.mr10
        | 保证金账户
      //- .card.box-border.box-border-t
      //-   router-link.card-inner(:to="{name: 'depositAccount'}")
      //-     i.iconfont.icon-baozhengjinguanli.el-orange
      //-     p 保证金账户
      //- .card.box-border.box-border-tb
      //-   router-link.card-inner(:to="{name: 'mine'}")
      //-     i.iconfont.icon-wode.el-green
      //-     p 我的
      //- .card
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

<style lang="scss" scoped>
.footer {
  position: fixed;
  bottom: 80px;
  left: 10px;
  right: 10px;
  text-align: center;
  button {
    background-color: #606c73;
    line-height: 35px;
    color: white;
    text-align: center;
    border-radius: 4px;
    min-width: 140px;
    -webkit-appearance: none;
    border: none;
    font-size: 16px;
    &:active {
      background-color: lighten(#606c73, 5%);
    }
  }
}
</style>

<style lang="scss">
.card-container {
  // margin-top: 25px;
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
    width: 100%; // box-sizing: border-box;
    // background-color: white;
    &:active {
      background: #384046;
    }
  }
  .card-inner {
    text-align: center;
    display: flex; // flex-direction: column;
    color: $primary-color;
    font-size: 20px;
    align-items: center;
    justify-content: center;
    height: 100%; // flex: 1;
    // margin: 10px;
    padding: 0 20px;
    .iconfont {
      color: white;
      font-size: 30px;
    }
    .icon-order {
      margin: 0 30px;
    }
    p {
      flex: 1;
      text-align: left;
      min-height: 28px;
      padding: 0 5px;
    }
  }
}
</style>
