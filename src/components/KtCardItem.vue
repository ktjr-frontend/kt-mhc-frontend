<template lang="pug">
  .card-item
    .card-header.ui-border-b
      .left {{headerLeft}}
      .right {{headerRight}}
    .card-body
      .arrow
        slot(name="arrow")
          | {{arrow}}
        i.iconfont.icon-you(v-if="arrowVisible")
      slot
    .card-footer
      slot(name="footer")
</template>

<script>
export default {
  name: 'kt-card-item',
  props: {
    headerLeft: String,
    headerRight: String,
    arrowVisible: Boolean,
    arrow: String
  }
}
</script>

<style lang="scss">
.card-item {
  &.stress {
    .left {
      font-size: 1.2em;
      font-weight: bold;
      color: $primary-font-color;
    }
    .right {
      color: $primary-font-color;
    }
  }
}

.card-footer {
  .buttons {
    padding: 10px 0;
    button {
      background: none;
      margin-left: 10px;
      line-height: 20px;
    }
  }
}
</style>

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
  &:active {
    opacity: 0.8;
  }
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
