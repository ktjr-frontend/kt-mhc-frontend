export default [{
  path: '/',
  redirect: { name: 'menu' }
}, {
  path: '/h5/login',
  name: 'login',
  component: resolve => require(['@/views/common/Login.vue'], resolve),
  meta: {
    title: '开好车',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: false,
    skipAuth: true
  }
}, {
  path: '/h5/register',
  name: 'register',
  component: resolve => require(['@/views/common/Register.vue'], resolve),
  meta: {
    title: '注册',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: false,
    skipAuth: true
  }
}, {
  path: '/h5/register_second',
  name: 'registerSecond',
  component: resolve => require(['@/views/common/RegisterSecond.vue'], resolve),
  meta: {
    title: '设置密码',
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
    title: '开好车',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/deposit_account',
  name: 'depositAccount',
  component: resolve => require(['@/views/common/DepositAccount.vue'], resolve),
  meta: {
    title: '保证金专用账户',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '*',
  redirect: '/'
}]
