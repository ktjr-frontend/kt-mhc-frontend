<template lang="pug">
  section.time-line
    ul
      li(v-for="(item, index) in currentList", :key="item.id", :class="{'active': index === 0}")
        h3 {{item.address}}
        p {{item.date | moment('YYYY-MM-DD HH:mm:ss')}}

</template>

<script>
export default {
  name: 'kt-time-line',
  props: {
    list: Array
  },

  watch: {
    list() {
      this.currentList = this.list || []
    }
  },

  data() {
    return {
      currentList: this.list
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  margin: 10px 0;
  position: relative;
}

h3 {
  font-size: 1.1em;
  font-weight: normal;
  margin-bottom: 5px;
}

li {
  background-image: linear-gradient(90deg, $border-color, $border-color 50%, transparent 50%, transparent);
  background-size: 1px 100%;
  background-repeat: no-repeat; // border-left: 1px solid $border-color;
  color: $placeholder-color;
  font-size: $font-size-xs;
  position: relative;
  padding: 0 15px;
  padding-bottom: 15px;
  &.active {
    color: $primary-font-color;
    &:before {
      background-color: $primary-color;
      box-shadow: 0 0 0 3px white, 0 0 0 4px $primary-color;
    }
  }
  &:last-child {
    background-image: none;
  }
  &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: $border-color;
    box-shadow: 0 0 0 3px white;
    left: -3px;
    top: 3px;
  }
}
</style>
