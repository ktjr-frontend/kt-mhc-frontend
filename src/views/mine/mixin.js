import { keyBy } from 'lodash'

const companyTypeList = [{
  label: '品牌4s店',
  value: '1'
}, {
  label: '港口商家',
  value: '2'
}, {
  label: '综合展厅',
  value: '3'
}, {
  label: '资源公司',
  value: '4'
}]

const companyTypeMap = keyBy(companyTypeList, 'value')

export default {
  filters: {
    companyTypeFormat(value) {
      return companyTypeMap[value] ? companyTypeMap[value].label : ''
    }
  },

  data() {
    return {
      companyTypeList,
      companyTypeMap
    }
  }
}
