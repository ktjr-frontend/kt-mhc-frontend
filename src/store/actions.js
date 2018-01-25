import router from '@/router'
import { login, captcha, users } from '@/common/resources.js'
import * as Storage from '@/storage'
import { STORE_KEY_USER, STORE_KEY_ACCESS_TOKEN, RET_CODE_MAP, STORE_KEY_LAST_LOGINED_PHONE } from '@/constants'

export default {
  updateUser: function({ commit }, user = {}) {
    Storage.save(STORE_KEY_USER, JSON.stringify(user))
    commit('updateUser', user)
  },

  updateToken({ commit }, token = '') {
    Storage.save(STORE_KEY_ACCESS_TOKEN, token)
    commit('updateToken', token)
  },

  async login({ commit, dispatch }, user) {
    let data = await login.save({}, user).then(res => res.json())
    if (data.code === RET_CODE_MAP.OK) {
      await dispatch('updateToken', data.data.token)
      const user = await dispatch('getUser')
      if (data.data.user) user.openId = data.data.user.openId
      data.user = user
    }
    return data
  },

  // 获取用户信息
  async getUser({ commit, dispatch }, params = {}) {
    const data = await users.get(params).then(res => res.json())
    if (data.code === RET_CODE_MAP.OK) {
      const user = data.data
      await dispatch('updateUser', user)
      commit('updateStateCode', '1') // 只是用来标记用户信息获取成功
    }
    return data
  },

  // 获取手机验证码
  async getMsgCode({ commit, dispatch }, params = {}) {
    let data = await captcha.get(params).then(res => res.json())
    return data
  },

  logout({ commit, state }, silent) {
    Storage.clearMulti([STORE_KEY_USER, STORE_KEY_ACCESS_TOKEN])
    Storage.save(STORE_KEY_LAST_LOGINED_PHONE, state.user.phone || '')
    commit('updateUser', { phone: state.user.phone })
    commit('updateToken')

    if (silent) return

    router.push({
      name: 'login'
    })
  }
}
