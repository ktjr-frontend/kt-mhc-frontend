<template lang="pug">
  .card-item
    .card-header.ui-border-b
      .left {{headerLeft}}
      .right {{headerRight}}
    .card-body
      .arrow
        slot(name="arrow")
          | {{arrow}}
          i.iconfont.icon-you
      slot
    .card-footer
      slot(name="footer")
</template>

<script>
export default {
  props: {
    headerLeft: String,
    headerRight: String,
    arrow: String
  }
}
</script>

<style lang="scss" scoped>
.card-item {
  padding: 0 10px;
  margin: 10px 0;
  background: white;
}

.card-header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $placeholder-color;
}

.left {
  flex: 1;
}

.right {
  width: 30%;
  text-align: right;
}

.card-body {
  position: relative;
  padding: 10px 0;
}

.arrow {
  position: absolute;
  right: 0;
  color: $placeholder-color;
  top: 10px;
  .icon-you {
    font-size: 12px;
  }
}
</style>
