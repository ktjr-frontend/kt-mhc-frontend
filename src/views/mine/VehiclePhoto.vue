<template lang="pug">
  section.vehicle-photo
    section
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 常规照片
    section.flex.img-card.flex-wrap.flex-start
      .img-item
        .img-item-inner
          .img-container
            img(@click="showImgView(0)", :src="currentPhotos.normal.front")
          p.mt10 前45度角
      .img-item
        .img-item-inner
          .img-container
            img(@click="showImgView(1)", :src="currentPhotos.normal.back")
          p.mt10 后45度角
      .img-item
        .img-item-inner
          .img-container
            img(@click="showImgView(2)", :src="currentPhotos.normal.inside")
          p.mt10 内饰
      .img-item
        .img-item-inner
          .img-container
            img(@click="showImgView(3)", :src="currentPhotos.normal.odometer")
          p.mt10 里程表
      .img-item
        .img-item-inner
          .img-container
            img(@click="showImgView(4)", :src="currentPhotos.normal.nameBoard")
          p.mt10 铭牌
    section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span.el-red(slot="title") 异常照片
    section.flex.img-card.flex-wrap.flex-start
      .img-item(v-for="item in currentPhotos.exception")
          .img-item-inner
            .img-container
              img(@click="showImgView(5)", :src="item")
            //- p.mt10 铭牌
    kt-image-view(:list="imgList", v-model="imgViewVisible", :default-index="defaultIndex")

</template>

<script>
import { values, map } from 'lodash'
import KtImageView from '@/components/KtImageView.vue'

export default {
  components: { KtImageView },
  props: {
    photos: Object
  },

  watch: {
    photos() {
      this.currentPhotos = this.photos
      this.imgList = this.photos ? map(values(this.photos.normal).concat(this.photos.exception), v => ({ url: v })) : []
      console.log(this.imgList)
    }
  },

  methods: {
    showImgView(index) {
      this.defaultIndex = index
      this.imgViewVisible = true
    }
  },

  data() {
    return {
      currentPhotos: this.photos || { normal: {} },
      imgViewVisible: false,
      defaultIndex: 0,
      imgList: []
    }
  }
}
</script>

<style lang="scss">
.img-card {
  padding: 10px;
  background-color: white;
}

.img-item {
  text-align: center; // margin: 5px;
  width: 33%;
}

.img-item-inner {
  padding: 5px;
}

.img-container {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  background: $small-gray-color;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 95%;
    max-height: 95%;
  }
}
</style>
