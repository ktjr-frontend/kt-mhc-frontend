export default [{
  path: '/h5/mine',
  name: 'mine',
  component: resolve => require(['@/views/mine/Index.vue'], resolve),
  meta: {
    title: '我的',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: true
  }
}, {
  path: '/h5/profile',
  name: 'profile',
  component: resolve => require(['@/views/mine/Profile.vue'], resolve),
  meta: {
    title: '个人资料',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: true
  }
}]
