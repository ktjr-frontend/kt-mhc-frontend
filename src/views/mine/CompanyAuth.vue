<template lang="pug">
section.company-auth
  mt-header(ref="header", title="企业认证", v-if="headerVisible")
    div(slot="left")
      i.p10.iconfont.icon-guanbi(@click.prevent="close()")
    mt-button(slot="right", v-if="menuVisible")
      small
        a(@click="toggleSideMenu") 菜单
  form(:class="{'overflow-scroll': headerVisible}", ref="popBoxContainer", @submit.prevent="submit")
    section.top-alert(v-if="model.status !== 'initial'")
      span.el-orange(v-if="model.status === 'checking'") 您的企业实名认证信息正在审核中
      span.el-green(v-else-if="model.status === 'passed'") 您已经通过了企业实名认证
      span.el-red(v-else-if="model.status === 'rejected'") 您的企业实名认证失败
    section.fields
      kt-field.input-right(type="text", :disableClear="true", :readonly="readonly", label='empty', v-model='model.name', :state="getFieldState('model.name')")
        div(slot="label")
          | 公司全称
      kt-address-select.has-border(:readonly="readonly", :state="getFieldState('model.city')", v-model="model.city")
        span(slot="label") 所在城市 <em>*</em>
      kt-field.input-right(type="text", :disableClear="readonly", :readonly="readonly", label='empty', v-model='model.detailAddress', :state="getFieldState('model.detailAddress')")
        div(slot="label")
          | 公司所在位置 <em>*</em>
      kt-select.has-border(:readonly="readonly", :options="companyTypeList", v-model="model.companyType", :state="getFieldState('model.companyType')", @click.native="showFieldError($event, 'model.companyType')")
        span(slot="label") 公司类型 <em>*</em>
      vehicle-model-select.has-border(v-if="model.companyType === '1'", :readonly="readonly", v-model="model.mainModels", :state="getFieldState('model.mainModels')", @click.native="showFieldError($event, 'model.mainModels')")
        span(slot="label") 主营品牌 <em>*</em>

    section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title")
          template(v-if="model.companyType !== '1'") 上传企业资质
          template(v-else) 上传企业资质
    section
      .photo-body
        .photo-item(v-if="!model.companyType")
          .photo-item-inner.flex
            small 请选择公司类型
        .photo-item(v-if="model.companyType && model.companyType !== '1'")
          .photo-item-inner
            .preview
              i.iconfont.icon-qingchu(v-if="!readonly", @click="deletePhoto('businessLicense')")
              img(v-if="businessLicense.previewUrl", :src="businessLicense.previewUrl")
            .upload-input
              i.iconfont.icon-paizhao(v-if="!businessLicense.previewUrl")
              span.tip(v-else="businessLicense.previewUrl") 图片仅用于<br>开好车审核
              input(v-if="!readonly", ref="businessLicense", type="file", accept="image/*;", @change="photoChange($event, 'businessLicense')")
          .photo-item-desc 营业执照
        .photo-item(v-if="model.companyType === '1'")
          .photo-item-inner
            .preview
              i.iconfont.icon-qingchu(v-if="!readonly", @click="deletePhoto('overdoorPhoto')")
              img(v-if="overdoorPhoto.previewUrl", :src="overdoorPhoto.previewUrl")
            .upload-input
              i.iconfont.icon-paizhao(v-if="!overdoorPhoto.previewUrl")
              span.tip(v-else="overdoorPhoto.previewUrl") 图片仅用于<br>开好车审核
              input(v-if="!readonly", ref="overdoorPhoto", type="file", accept="image/*;", @change="photoChange($event, 'overdoorPhoto')")
          .photo-item-desc 门头照片
        .photo-item(v-if="model.companyType === '1'")
          .photo-item-inner
            .preview
              i.iconfont.icon-qingchu(v-if="!readonly", @click="deletePhoto('receptionPhoto')")
              img(v-if="receptionPhoto.previewUrl", :src="receptionPhoto.previewUrl")
            .upload-input
              i.iconfont.icon-paizhao(v-if="!receptionPhoto.previewUrl")
              span.tip(v-else="receptionPhoto.previewUrl") 图片仅用于<br>开好车审核
              input(v-if="!readonly", ref="receptionPhoto", type="file", accept="image/*;", @change="photoChange($event, 'receptionPhoto')")
          .photo-item-desc 前台照片
    //- section.mt10
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title") 个人信息
    //- section
      kt-field(type="text", :readonly="readonly", label='empty', placeholder='请输入真实姓名', v-model='model.userName', :state="getFieldState('model.userName')", @click.native="showFieldError($event, 'model.userName')")
        div(slot="label")
          | 法人姓名 <em>*</em>
      kt-field(type="text", :readonly="readonly", label='empty', placeholder='请输入身份证号码', v-model='model.idCard', :state="getFieldState('model.idCard')", @click.native="showFieldError($event, 'model.idCard')")
        div(slot="label")
          | 法人身份证号 <em>*</em>
    //- section.mt10(v-if="model.companyType")
      mt-cell.title-simple-cell.ui-border-b
        span(slot="title" v-if="model.companyType === '1'") 上传名片
        span(slot="title" v-else) 上传在职证明
        a(@click="showWorkCertifyTemp", v-if="model.status !== 'passed'") 查看模板
      .photo-card(v-if="model.companyType === '1'")
        .photo-card-inner
          .preview.flex
            i.iconfont.icon-qingchu(@click="deletePhoto('businessCard')", v-if="businessCard.previewUrl && !readonly")
            img(v-if="businessCard.previewUrl", :src="businessCard.previewUrl")
          .upload-input.flex
            i.iconfont.icon-paizhao(v-if="!businessCard.previewUrl")
            span.tip(v-if="!businessCard.previewUrl") 上传 <em>名片</em> 正面
            span.tip(v-if="businessCard.previewUrl") 图片仅用于<br>开好车审核
            input(v-if="!readonly", ref="businessCard", type="file", accept="image/*;", @change="photoChange($event, 'businessCard')")
      .photo-body(v-else)
        .photo-item
          .photo-item-inner
            .preview
              i.iconfont.icon-qingchu(@click="deletePhoto('workCertify')", v-if="!readonly")
              img(v-if="workCertify.previewUrl", :src="workCertify.previewUrl")
            .upload-input
              i.iconfont.icon-paizhao(v-if="!workCertify.previewUrl")
              span.tip(v-else="workCertify.previewUrl") 图片仅用于<br>开好车审核
              input(v-if="!readonly", ref="workCertify", type="file", accept="image/*;", @change="photoChange($event, 'workCertify')")
          .photo-item-desc 在职证明
        .photo-item(v-if="model.status !== 'passed'")
          .photo-item-inner
            .preview.demo
              img(v-if="workCertify.demo", :src="workCertify.demo", @click="imgViewVisible = true")
          .photo-item-desc 示例
    //- mt-popup.popup-box(v-model='workCertifyVisible', position='right')
      work-certify-template(ref="workCertify", :close="closeWorkCertify", @popup-confirmed="workCertifyConfirm")
    .form-buttons-placeholder(v-if="!readonly")
      .button-tip 所有证件图片仅供于开好车审核
      mt-button.mint-button-block(type='primary', size='large') 提交
    .form-buttons.fixed(v-if="!readonly")
      .button-tip 所有证件图片仅供于开好车审核
      mt-button.mint-button-block(type='primary', size='large') 提交
  //- kt-image-view(:list="imgList", v-model="imgViewVisible", :default-index="defaultIndex")
</template>

<script>
import ValidatorMixin from '@/views/validator_mixin.js'
import lrz from 'lrz'
import { merge, includes } from 'lodash'
// import { fileUploader, userPhotos } from '@/common/resources.js'
// import { Indicator } from 'mint-ui'
import { mapGetters } from 'vuex'
import MineMixin from '@/views/mine/mixin.js'
// import WorkCertifyTemplate from '@/views/mine/WorkCertifyTemplate.vue'
import VehicleModelSelect from '@/views/mine/VehicleModelSelect.vue'

// const FILE_NOT_EMPTY = 'has_file'

export default {
  mixins: [ValidatorMixin, MineMixin],
  components: {
    // WorkCertifyTemplate,
    VehicleModelSelect
  },
  props: {
    close: Function,
    headerVisible: false,
    menuVisible: false
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.workCertifyVisible) {
        this.$refs.workCertify.backButtonAction()
      } else {
        this.close()
      }
    },

    init(name) {
      if (!includes(['checking', 'passed'], this.model.status)) {
        this.model.name = name || this.model.name
      }
    },

    toggleSideMenu() {
      const $app = this.$root.$children[0]
      $app.sideMenuVisible = !$app.sideMenuVisible
    },

    // showWorkCertify() {
    //   this.$refs.workCertify.init(this.companyName)
    //   this.workCertifyVisible = true
    //   this.$nextTick(() => {
    //     this.$refs.workCertify.updatePopBoxHeight()
    //   })
    // },

    // closeWorkCertify() {
    //   this.workCertifyVisible = false
    // },

    // workCertifyConfirm(workCertify = {}) {
    //   this.workCertify = workCertify
    //   this.workCertifyVisible = false
    // },

    // // 展示在职证明模板
    // showWorkCertifyTemp() {
    //   this.workCertifyVisible = true
    // },

    deletePhoto(ns) {
      this[ns].previewUrl = ''
      this.$refs[ns].value = ''
      this.model[ns] = ''
    },

    showPreview(url, ns) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        this[ns].previewUrl = url
        this.model[ns] = url
        this.$indicator.close()
      }
    },

    photoChange(e, ns) {
      const file = e.target.files[0]
      if (!file) return
      this.$indicator.open({ spinnerType: 'double-bounce' })
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        this[ns].rst = rst
        this.showPreview(rst.base64, ns)
      }).catch(err => {
        this.$indicator.close()
        this.$toast(err || '上传失败', 'error')
      })
    },

    async submit() {
      const valid = await this.$validate()
      if (valid) {
        this.model.status = 'checking'
        this.$emit('popup-confirmed', this.model)
        await this.$store.dispatch('updateUser', { ...this.$store.getters.user, company: this.model })
        // this.routerBack()
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.city' (value) {
      return this.validate(value).required('请选择公司所在地')
    },
    'model.detailAddress' (value) {
      return this.validate(value).required('请填写公司位置信息')
    },
    'model.companyType' (value) {
      return this.validate(value).required('请选择公司类型')
    },
    'model.mainModels' (value) {
      const validator = this.validate(value)
      if (this.model.companyType === '1') {
        validator.required('请选择主营品牌')
      }
      return validator
    },
    // 'model.userName' (value) {
    //   return this.validate(value).required('请输入真实姓名')
    // },
    // 'model.idCard' (value) {
    //   return this.validate(value).required('请输入身份证号码')
    // },
    'model.businessLicense' (value) {
      const validator = this.validate(value)
      if (this.model.companyType !== '1') {
        validator.required('请上传营业执照')
      }
      return validator
    },
    'model.overdoorPhoto' (value) {
      const validator = this.validate(value)
      if (this.model.companyType === '1') {
        validator.required('请上传门头照片')
      }
      return validator
    },
    'model.receptionPhoto' (value) {
      const validator = this.validate(value)
      if (this.model.companyType === '1') {
        validator.required('请上传前台照片')
      }
      return validator
    }
    // 'model.businessCard' (value) {
    //   const validator = this.validate(value)
    //   if (this.model.companyType === '1') {
    //     validator.required('请上传名片')
    //   }
    //   return validator
    // },
    // 'model.workCertify' (value) {
    //   const validator = this.validate(value)
    //   if (this.model.companyType !== '1') {
    //     validator.required('请上传在职证明')
    //   }
    //   return validator
    // }
  },

  computed: {
    ...mapGetters(['user']),
    readonly() {
      return includes(['checking', 'passed'], this.model.status)
    }
  },

  data() {
    const user = this.$store.getters.user
    const demoWorkCertify = require('@/assets/images/work-certify-demo.jpeg')
    return {
      workCertifyVisible: false,
      depositType: '',
      imgList: [{
        url: demoWorkCertify
      }],
      defaultIndex: 0,
      imgViewVisible: false,
      businessLicense: {
        rst: {},
        file: null,
        previewUrl: user.company.businessLicense,
        previewImgStyle: {}
      },
      overdoorPhoto: {
        rst: {},
        file: null,
        previewUrl: user.company.overdoorPhoto,
        previewImgStyle: {}
      },
      receptionPhoto: {
        rst: {},
        file: null,
        previewUrl: user.company.receptionPhoto,
        previewImgStyle: {}
      },
      businessCard: {
        rst: {},
        file: null,
        previewUrl: user.company.businessCard,
        previewImgStyle: {}
      },
      workCertify: {
        rst: {},
        file: null,
        previewUrl: user.company.workCertify,
        demo: demoWorkCertify,
        previewImgStyle: {}
      },
      model: merge({
        name: '',
        detailAddress: '',
        status: 'initial',
        userName: '',
        idCard: '',
        mainModels: '',
        businessLicense: '',
        businessCard: '',
        receptionPhoto: '',
        overdoorPhoto: '',
        workCertify: '',
        city: '',
        companyType: ''
      }, user.company)
    }
  }
}
</script>

<style lang="scss" module>
.has-header {
  margin-top: $header-height;
}
</style>

<style lang="scss" scoped>
</style>
