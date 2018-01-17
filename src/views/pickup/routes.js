export default [{
  path: '/h5/pickup_apply',
  name: 'pickCard',
  component: resolve => require(['@/views/pickup/PickCarForm.vue'], resolve),
  meta: {
    title: '委托函申请',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}]
