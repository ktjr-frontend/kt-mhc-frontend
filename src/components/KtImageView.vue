<template lang="pug">
  mt-popup.popup-box(v-model="visible")
    header
      i.iconfont.icon-guanbi(@click.prevent="visible = false")
      span.index {{currentIndex + 1}}/{{imgList.length}}
    mt-swipe(:stopPropagation="true", disable-swipe, @change="handleChange" :auto="0", :prevent="true", :showIndicators="false", :default-index="currentIndex")
      mt-swipe-item(v-for="img in imgList")
        img(:src="img.url")
        p {{img.desc}}
</template>

<script>
export default {
  name: 'kt-image-view',
  props: {
    value: Boolean,
    list: Array,
    defaultIndex: 0
  },

  watch: {
    value() {
      console.log(this.value)
      this.visible = this.value
    },
    list() {
      this.imgList = this.list || []
    },
    defaultIndex() {
      this.currentIndex = this.defaultIndex
    },
    visible() {
      this.$emit('input', this.visible)
    }
  },

  methods: {
    handleChange(index) {
      this.currentIndex = index
    }
  },

  data() {
    return {
      visible: this.value,
      imgList: this.list,
      currentIndex: this.defaultIndex
    }
  }
}
</script>

<style lang="scss" scoped>
.popup-box {
  background-color: black;
}

header {
  position: absolute;
  left: 0;
  right: 0;
  color: white;
  padding: 15px; // line-height: 40px;
  text-align: center;
  .icon-guanbi {
    position: absolute;
    left: 20px;
    top: 13px;
    z-index: 999;
    &:active {
      color: $primary-color;
    }
  }
}

.mint-swipe-item {
  img {
    max-width: 95%;
    max-height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
