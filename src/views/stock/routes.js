export default [{
  path: '/h5/stocks',
  name: 'stocks',
  component: resolve => require(['@/views/stock/Index.vue'], resolve),
  meta: {
    title: '库融宝',
    tabBarVisible: false,
    skipAuth: false,
    headerBackShow: true,
    headerShow: true
  }
}]
