<template lang="pug">
  section.profile
    section
      mt-cell.input-file-cell(title="个人头像")
        .avata
          img(:src="avatar.previewUrl", width="65", height="65")
          //- input(type="file", @change="avatarChange")
      mt-cell(is-link, title="个人简介", :value="user.desc", @click.native="showPopupInput({type: 'textarea', customType: 'desc', maxLength: 20, placeholder: '请输入个人简介', value: user.desc, title: '个人简介'})")
    section.mt10
      mt-cell(:class="userRealNameReadOnly ? 'readonly' : ''", is-link, @click.native="$router.push({name: 'realNameAuth'})", title="真实姓名", :value="user.name || '未认证'")
      mt-cell(:class="companyAuthReadOnly ? 'readonly' : ''", is-link, @click.native="goCompanyCertify", title="公司全称", :value="user.company.name || '未认证'")
    section.mt10
      mt-cell.readonly(title="联系方式", :value="user.phone")
      mt-cell(is-link, title="邮箱", :value="user.email", @click.native="showPopupInput({customType: 'email', placeholder: '请输入邮箱', value: user.email, title: '邮箱', label: '邮箱', validators: [{name: 'email', message: '请正确填写邮箱'}]})")
    kt-popup-input(@popup-confirmed="popInputConfirm", ref="popupInput", :visible="popupInputVisible", @visible-change="(value) => popupInputVisible = value")
    //- company-auth-rounded(v-model="companyAuthVisible", ref="companyAuthRounded", @popup-confirmed="companyAuthConfirm")
</template>

<script>
import lrz from 'lrz'
import { cloneDeep, includes } from 'lodash'
import MineMixin from '@/views/mine/mixin.js'
// import { fileUploader, userPhotos } from '@/common/resources.js'
// import { Indicator } from 'mint-ui'
// import CompanyAuthRounded from '@/views/mine/CompanyAuthRounded.vue'

export default {
  mixins: [MineMixin],
  // components: { CompanyAuthRounded },
  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.companyAuthVisible) {
        this.$refs.companyAuthRounded.backButtonAction()
      } else if (this.popupInputVisible) {
        this.popupInputVisible = false
        // this.$refs.popupInput.close()
      } else {
        this.routerBack()
      }
    },

    showPreview(url) {
      const img = new Image()
      img.src = url
      img.onload = () => {
        this.avatar.previewUrl = url
        this.user.avatar = url
        this.$indicator.close()
      }
    },

    avatarChange(e) {
      const file = e.target.files[0]
      if (!file) return
      this.$indicator.open({ spinnerType: 'double-bounce' })
      lrz(file, {
        quality: 0.7 //1 的话方向会错
      }).then(rst => {
        this.avatar.rst = rst
        this.showPreview(rst.base64)
      }).catch(err => {
        this.$indicator.close()
        this.$toast(err || '上传失败', 'error')
      })
    },

    showPopupInput(opt) {
      this.$refs.popupInput.init(opt)
      console.log(opt)
      this.popupInputVisible = true
    },

    popInputConfirm(opt) {
      this.popupInputVisible = false
      this.user[opt.customType] = opt.value
    },

    goCompanyCertify() {
      if (this.user.status === 'passed') {
        this.$router.push({ name: 'companyAuth' })
      } else {
        this.$toast('请先实名认证')
      }
    }
    // companyAuthConfirm(companyAuth = {}) {
    //   this.companyAuth = companyAuth
    //   this.companyAuthVisible = false
    // }
  },

  computed: {
    userRealNameReadOnly() {
      return includes(['checking', 'passed'], this.user.status)
    },
    companyAuthReadOnly() {
      return includes(['checking', 'passed'], this.user.company.status)
    }
  },

  data() {
    return {
      popupInputVisible: false,
      companyAuthVisible: false,
      user: cloneDeep(this.$store.getters.user),
      avatar: {
        rst: {},
        file: null,
        previewUrl: require('@/assets/images/default-avatar.svg'),
        previewImgStyle: {}
      }
    }
  }
}
</script>
