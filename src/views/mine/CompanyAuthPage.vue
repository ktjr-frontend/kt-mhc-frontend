<template lang="pug">
  section.company-auth-rounded
    kt-input(v-show="!companyAuthVisible", @input-confirmed="inputConfirm", @input="inputOnInput", ref="input")
      section.mt10
        mt-cell(v-for="c in companyList", :key="c.id", @click.native="selectCompany(c)")
          span(slot="title") {{c.name}}
          i.iconfont.icon-company(slot="icon")
    //- mt-popup.popup-box(v-model='companyAuthVisible', position='right')
    company-auth(v-show="companyAuthVisible", ref="companyAuth", :close="closeCompanyAuth", :header-visible="false", @popup-confirmed="companyAuthConfirm")
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

  mounted() {
    this.showCompany()
  },

  methods: {
    // 自定义顶部标题栏的返回按钮行为
    backButtonAction() {
      if (this.companyAuthVisible) {
        this.$refs.companyAuth.backButtonAction()
      } else if (this.inputVisible) {
        this.inputVisible = false
      } else {
        this.routerBack()
      }
    },

    // 显示公司
    showCompany() {
      if (includes(['initial', 'rejected'], this.user.company.status)) {
        this.$refs.input.init({
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

    // 搜索公司
    inputOnInput: debounce(function(value) {
      company.get({ name: value }).then(res => res.json()).then(res => {
        this.companyList = res.data.result
      })
    }, 300),

    selectCompany(c) {
      this.$refs.input.updateValue(c.name)
    },

    inputConfirm(opt) {
      if (opt.customType === 'editCompanyName') {
        this.showCompanyAuth()
        this.companyName = opt.value
      }
    },

    // 公司信息第二步
    showCompanyAuth() {
      this.companyAuthVisible = true
      this.$nextTick(() => {
        this.$refs.companyAuth.init(this.companyName)
        // this.$refs.companyAuth.updatePopBoxHeight()
      })
    },

    closeCompanyAuth() {
      if (includes(['initial', 'rejected'], this.user.company.status)) {
        this.companyAuthVisible = false
      } else {
        this.routerBack()
      }
    },

    companyAuthConfirm(companyAuth = {}) {
      this.companyAuth = companyAuth
      this.routerBack()
    }
  },

  watch: {
    value() {
      if (this.value) {
        this.showCompany()
      } else {
        this.companyAuthVisible = false
      }
    },

    companyAuthVisible() {
      if (!this.companyAuthVisible) {
        this.$emit('input', false)
      }
    }
  },

  data() {
    return {
      companyAuthVisible: false,
      companyName: '',
      companyAuth: {},
      companyList: []
    }
  }
}
</script>
