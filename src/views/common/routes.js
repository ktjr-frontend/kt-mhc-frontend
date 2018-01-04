export default [{
  path: '/',
  redirect: { name: 'menu' }
}, {
  path: '/h5/login',
  name: 'login',
  component: resolve => require(['@/views/common/Login.vue'], resolve),
  meta: {
    title: '开通金融',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: false,
    skipAuth: true
  }
}, {
  path: '/h5/menu',
  name: 'menu',
  component: resolve => require(['@/views/common/Menu.vue'], resolve),
  meta: {
    title: '开通金融',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: false,
    skipAuth: true
  }
}, {
  path: '*',
  redirect: '/'
}]
