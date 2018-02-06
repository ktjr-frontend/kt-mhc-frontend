<template lang="pug">
  section.advanced-certify
    //- company-auth(ref="companyAuth", :close="closeCompanyAuth", :header-visible="false", @popup-confirmed="companyAuthConfirm")
    form(@submit.prevent="submit")
      section.top-alert(v-if="model.status !== 'initial'")
        span.el-orange(v-if="model.status === 'checking'") 您的高级认证信息正在审核中
        span.el-green(v-else-if="model.status === 'passed'") 您已经通过了高级认证
        span.el-red(v-else-if="model.status === 'rejected'") 您的高级认证失败
      section.mt10
        mt-cell.title-simple-cell.ui-border-b
          span(slot="title") 上传授权书
          a(@click="showGrantPriviledgeTemp", v-if="model.status !== 'passed'") 查看授权书模板
      .photo-body
        .photo-item
          .photo-item-inner
            .preview
              i.iconfont.icon-qingchu(@click="deletePhoto('grantPriviledge')", v-if="!readonly")
              img(v-if="grantPriviledge.previewUrl", :src="grantPriviledge.previewUrl")
            .upload-input
              i.iconfont.icon-paizhao(v-if="!grantPriviledge.previewUrl")
              span.tip(v-else="grantPriviledge.previewUrl") 图片仅用于<br>开好车审核
              input(v-if="!readonly", ref="grantPriviledge", type="file", accept="image/*;", @change="photoChange($event, 'grantPriviledge')")
          .photo-item-desc 授权书
        .photo-item(v-if="model.status !== 'passed'")
          .photo-item-inner
            .preview.demo
              img(v-if="grantPriviledge.demo", :src="grantPriviledge.demo", @click="imgViewVisible = true")
          .photo-item-desc 示例
      .form-buttons-placeholder(v-if="!readonly")
        //- .button-tip 所有证件图片仅供于开通金额审核
        mt-button.mint-button-block(type='primary', size='large') 提交
      .form-buttons.fixed(v-if="!readonly")
        //- .button-tip 所有证件图片仅供于开通金额审核
        mt-button.mint-button-block(type='primary', size='large') 提交
    mt-popup.popup-box(v-model='grantPriviledgeVisible', position='right')
      grant-priviledage-template(ref="grantPriviledge", :close="closeGrantPriviledge")
    kt-image-view(:list="imgList", v-model="imgViewVisible", :default-index="defaultIndex")
</template>

<script>
// import CompanyAuth from '@/views/mine/CompanyAuth.vue'
import GrantPriviledageTemplate from '@/views/mine/GrantPriviledgeTemplate.vue'
import { merge, includes } from 'lodash'
import lrz from 'lrz'
import { mapGetters } from 'vuex'

export default {
  components: {
    GrantPriviledageTemplate
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.grantPriviledgeVisible) {
        this.$refs.grantPriviledge.backButtonAction()
      } else {
        this.routerBack()
      }
    },

    // 展示在职证明模板
    showGrantPriviledgeTemp() {
      this.grantPriviledgeVisible = true
    },

    closeGrantPriviledge() {
      this.grantPriviledgeVisible = false
    },

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
        this.$emit('popup-confirmed', this.model)
        await this.$store.dispatch('updateUser', { ...this.$store.getters.user, ...this.model, status: 'checking' })
        this.routerBack()
      } else {
        this.$toast(this.validation.firstError(), 'error')
      }
    }
  },

  validators: {
    'model.grantLetter' (value) {
      const validator = this.validate(value)
      if (this.model.companyType !== '1') {
        validator.required('请上传营业执照')
      }
      return validator
    }
  },

  computed: {
    ...mapGetters(['user']),
    readonly() {
      return includes(['checking', 'passed'], this.model.status)
    }
  },

  data() {
    const user = this.$store.getters.user
    const demoGrantPriviledge = require('@/assets/images/work-certify-demo.jpeg')
    return {
      imgViewVisible: false,
      grantPriviledgeVisible: false,
      defaultIndex: 0,
      grantPriviledge: {
        rst: {},
        demo: demoGrantPriviledge,
        file: null,
        previewUrl: user.company.businessLicense,
        previewImgStyle: {}
      },

      imgList: [{
        url: demoGrantPriviledge
      }],

      model: merge({
        status: '',
        grantLetter: ''
      }, user.advancedCertify)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
