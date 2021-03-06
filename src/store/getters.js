export default {
  user: function(state) {
    return state.user
  },

  regions(state) {
    return state.regions
  },

  token(state) {
    return state.token
  },

  route(state) {
    return state.route
  },

  stateCode(state) {
    return state.stateCode
  },

  updaterProgressValue(state) {
    return state.updaterProgressValue
  },

  updaterProgressVisible(state) {
    return state.updaterProgressVisible
  },

  now(state) {
    return state.now
  },

  isPopStated(state) {
    return state.isPopStated
  },

  transitionName(state) {
    return state.transitionName
  },

  currentState(state) {
    return state.currentState
  }
}
