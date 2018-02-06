<template lang="pug">
  section.vehicle-photos
    mt-header(ref="header", title="上传实车照片")
      //- mt-button(icon="back", slot="left", @click.prevent="close") 返回
      div(slot="left")
        i.p10.iconfont.icon-guanbi(@click.prevent="close")
    header
      | 上传实车照片
    .photo-body.flex.flex-wrap.flex-start
      .preview(v-for="photo in model.photos")
        i.iconfont.icon-qingchu(@click="deletePhoto(photo)")
        img(v-if="photo.previewUrl", :src="photo.previewUrl")
      .upload-input
        i.iconfont.icon-paizhao
        input(ref="file", type="file", accept="image/*;", @change="photoChange($event)")
    .footer
      .note-line
        h4 上传注意事项：
        ol
          li 表中涉及的公司要用全称
          li 打款账户要体现在合同中
          li 要盖齐公章，且清晰可见
          li 买方一定为我方指定的公司
    .form-buttons-placeholder
    .form-buttons.fixed
      mt-button.mint-button-block(type='primary', size='large', @click="submit") 确定
</template>

<script>
import lrz from 'lrz'
import { remove } from 'lodash'
// import { fileUploader, userPhotos } from '@/common/resources.js'
// import { Indicator } from 'mint-ui'

// const FILE_NOT_EMPTY = 'has_file'

export default {
  props: {
    close: Function
  },

  methods: {
    init() {

    },

    deletePhoto(photo) {
      this.model.photos = remove(this.model.photos, c => c !== photo)
      this.$refs.file.value = ''
    },

    showPreview(url, photo) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        photo.previewUrl = url
        this.model.photos.push(photo)
        // photo.img = img
        this.$indicator.close()
        // const maxW = this.$els[ns].getBoundingClientRect().width
        // this[ns].previewImgStyle = {
        //   maxWidth: `${maxW}px`
        // }
      }
    },

    photoChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.$indicator.open({ spinnerType: 'double-bounce' })
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        const photo = {}
        photo.rst = rst
        this.showPreview(rst.base64, photo)
      }).catch(err => {
        this.$indicator.close()
        this.$toast(err || '上传失败', 'error')
      })
    },

    async submit() {
      if (!this.model.photos.length) {
        this.$toast('请上传实车照片', 'error')
        return
      }

      this.$emit('popup-confirmed', this.model)
      // if (this.readonly) return
      // if (!this.photo1.rst.file && !this.readonly) {
      //   this.$toast(this.$t('archive.photoID.KIPTitle'), 'error')
      //   return
      // } else if (!this.photo2.rst.file && !this.readonly) {
      //   this.$toast(this.$t('archive.photoID.FKDTitle'), 'error')
      //   return
      // }

      // const formData1 = new FormData()
      // const fileName1 = uniqueId(8)
      // formData1.append('photo', this.photo1.rst.file, `${fileName1}.jpeg`)

      // const formData2 = new FormData()
      // const fileName2 = uniqueId(8)
      // formData2.append('photo', this.photo2.rst.file, `${fileName2}.jpeg`)

      // const resArr = await Promise
      //   .all([
      //     fileUploader.save({ _r: 1 }, formData1),
      //     fileUploader.save({ _r: 2 }, formData2)
      //   ]).then(res => res)

      // const res1 = await resArr[0].json()
      // const res2 = await resArr[0].json()

      // if (res1.code === this.RET_CODE_MAP.OK && res2.code === this.RET_CODE_MAP.OK) {
      //   console.log(res1, res1.data, res2.data)
      //   const res = await userPhotos
      //     .save({ ktpPhotoUrl: res1.data.url, fkdPhotoUrl: res2.data.url })
      //     .then(res => res.json())
      //   await this.$store.dispatch('getUserInfoPercent')
      //   if (res.code === this.RET_CODE_MAP.OK) {
      //     this.$toast(this.$t('global.toast.success'))
      //     this.$router.back()
      //   }
      // }
    }
  },

  data() {
    return {
      model: {
        photos: []
      },
      photos: [{
        rst: {},
        file: null,
        previewUrl: '',
        previewImgStyle: {}
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~views/order/uploader-card.scss";
</style>
