<template lang="pug">
  .card-item(@click="$emit('click')")
    .card-header.ui-border-b(v-if="headerLeft || headerRight || $slots.headerRight || $slots.headerLeft")
      .left
        slot(name="headerLeft") {{headerLeft}}
      .right
        slot(name="headerRight") {{headerRight}}
    .card-body
      .arrow
        slot(name="arrow")
          | {{arrow}}
        i.iconfont.icon-you.ml5(v-if="arrowVisible")
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
      font-size: 1.2em; // font-weight: bold;
      color: $primary-font-color;
    }
    .right {
      color: $primary-font-color;
    }
  }
  .stress {
    font-size: 1.2em;
    color: $primary-font-color;
    .iconfont {
      font-weight: normal;
      font-size: 1.4em;
      vertical-align: -2px;
      color: $primary-color;
    }
  }
}

.card-footer {
  .buttons {
    padding: 10px 0;
    button {
      line-height: 20px;
      background: none;
    }
    &>button {
      margin-left: 10px;
    }
    .text-left {
      &>button {
        margin-left: 0;
        margin-right: 10px;
      }
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
