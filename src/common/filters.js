import { isNumber, round, isNull, isNil } from 'lodash'
import moment from 'moment'
import numeral from 'numeral'

export default {
  install(Vue, options) {
    Vue.filter('ktCurrency', (value, prefix = '￥', suffix = '') => {
      if (isNumber(value)) {
        return prefix + numeral(round(value, 2)).format('0,0.00') + suffix
      } else {
        return value
      }
    })

    Vue.filter('ktFlow', (value) => {
      if (value > 0) {
        return value
      } else {
        return -(value)
      }
    })

    Vue.filter('ktPercent', (value, decimal = 2, multi = 100, unit = '%') => {
      return isNumber(value) ? round(value * multi, decimal).toFixed(decimal) + (unit || '') : ''
    })

    Vue.filter('ktRangePercent', (value, value2, decimal = 2) => {
      value = isNumber(value) ? round(value, decimal).toFixed(decimal) : ''
      value2 = isNumber(value2) ? round(value2, decimal).toFixed(decimal) : ''
      if (value === value2) {
        return value + '%'
      }

      return `${value}-${value2}%`
    })

    Vue.filter('ktRound', (value, decimal = 0) => {
      return round(value, decimal).toFixed(2)
    })

    Vue.filter('ktAppend', (value, str) => {
      return (isNil(value) ? '' : value) + str
    })

    Vue.filter('ktPrepend', (value, str) => {
      return str + (isNil(value) ? '' : value)
    })

    Vue.filter('ktPositveNumber', (value) => {
      if (value > 0 && isNumber(value)) {
        return '+' + value
      }
      return value
    })

    Vue.filter('ktNull', (value, str) => {
      return isNull(value) ? '-' : (str || value)
    })

    Vue.filter('ktFalse', (value, str) => {
      return !value ? '-' : (str || value)
    })

    Vue.filter('ktCardNo', (value) => {
      return value ? value.replace(/(\d{4})\d+(\d{4})/g, '$1****$2') : '-'
    })

    Vue.filter('ktBankCardSpace', (value) => {
      return value ? value.replace(/\d{4}(?=(\d{1,4}))/g, '$& ') : '-'
    })

    Vue.filter('moment', (date, format) => {
      return moment(date).format(format)
    })
  }
}
