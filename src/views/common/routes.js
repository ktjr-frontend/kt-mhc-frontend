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
  path: '/h5/register_step1',
  name: 'registerStep1',
  component: resolve => require(['@/views/common/RegisterStep1.vue'], resolve),
  meta: {
    title: '注册',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: true
  }
}, {
  path: '/h5/register_step2',
  name: 'registerStep2',
  component: resolve => require(['@/views/common/RegisterStep2.vue'], resolve),
  meta: {
    title: '设置密码',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: true
  }
}, {
  path: '/h5/forget_password_step1',
  name: 'forgetPasswordStep1',
  component: resolve => require(['@/views/common/ForgetPasswordStep1.vue'], resolve),
  meta: {
    title: '忘记密码',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: true
  }
}, {
  path: '/h5/forget_password_step2',
  name: 'forgetPasswordStep2',
  component: resolve => require(['@/views/common/ForgetPasswordStep2.vue'], resolve),
  meta: {
    title: '重设密码',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
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
