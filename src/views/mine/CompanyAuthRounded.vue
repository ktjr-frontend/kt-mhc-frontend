<template lang="pug">
  section.company-auth-rounded
    mt-popup.popup-box(v-model='companyAuthVisible', position='right')
      company-auth(ref="companyAuth", :close="closeCompanyAuth", @popup-confirmed="companyAuthConfirm")
    kt-popup-input(@popup-confirmed="popInputConfirm", @input="popInputOnInput", ref="popupInput", :visible="popupInputVisible", @visible-change="(value) => popupInputVisible = value")
      mt-header(ref="header", title="公司名称", slot="header")
        //- mt-button(icon="back", slot="left", @click.prevent="popupInputVisible = false") 返回
        div(slot="left")
          i.p10.iconfont.icon-guanbi(@click.prevent="popupInputVisible = false")
      section.mt10
        mt-cell(v-for="c in companyList", :key="c.id", @click.native="selectCompany(c)")
          span(slot="title") {{c.name}}
          i.iconfont.icon-company(slot="icon")
</template>

<script>
import { mapGetters } from 'vuex'
import { company } from '@/common/resources.js'
import { debounce, includes } from 'lodash'
import CompanyAuth from '@/views/mine/CompanyAuth.vue'

export default {
  components: { CompanyAuth },
  computed: {
    ...mapGetters(['user'])
  },

  props: {
    value: Boolean
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.companyAuthVisible) {
        this.$refs.companyAuth.backButtonAction()
      } else if (this.popupInputVisible) {
        this.popupInputVisible = false
      } else {
        this.routerBack()
      }
    },

    // 显示公司
    showCompany() {
      if (includes(['initial', 'rejected'], this.user.company.status)) {
        this.showPopupInput({
          customType: 'editCompanyName',
          placeholder: '请输入营业执照上的公司全称',
          value: this.user.company.name || '',
          confirmButtonText: '下一步',
          label: '公司全称'
        })
      } else {
        this.showCompanyAuth()
      }
    },

    // 显示公司搜索
    showPopupInput(opt) {
      this.$refs.popupInput.init(opt)
      this.popupInputVisible = true
    },

    // 搜索公司
    popInputOnInput: debounce(function(value) {
      company.get({ name: value }).then(res => res.json()).then(res => {
        this.companyList = res.data.result
      })
    }, 300),

    selectCompany(c) {
      this.$refs.popupInput.updateValue(c.name)
    },

    popInputConfirm(opt) {
      // this.popupInputVisible = false
      if (opt.customType === 'editCompanyName') {
        this.showCompanyAuth()
        this.companyName = opt.value
      }
    },

    // 公司信息第二步
    showCompanyAuth() {
      this.$refs.companyAuth.init(this.companyName)
      this.companyAuthVisible = true
      this.$nextTick(() => {
        this.$refs.companyAuth.updatePopBoxHeight()
      })
    },

    closeCompanyAuth() {
      this.companyAuthVisible = false
    },

    companyAuthConfirm(companyAuth = {}) {
      this.companyAuth = companyAuth
      this.companyAuthVisible = false
      this.popupInputVisible = false
    }
  },

  watch: {
    value() {
      if (this.value) {
        this.showCompany()
      } else {
        this.companyAuthVisible = false
        this.popupInputVisible = false
      }
    },

    popupInputVisible() {
      this.$emit('input', this.popupInputVisible)
    },

    companyAuthVisible() {
      if (!this.popupInputVisible && !this.companyAuthVisible) {
        this.$emit('input', false)
      }
    }
  },

  data() {
    return {
      popupInputVisible: false,
      companyAuthVisible: false,
      companyName: '',
      companyAuth: {},
      companyList: []
    }
  }
}
</script>
