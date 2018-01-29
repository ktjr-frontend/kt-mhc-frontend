export default [{
  path: '/h5/mine',
  name: 'mine',
  component: resolve => require(['@/views/mine/Index.vue'], resolve),
  meta: {
    title: '我的',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
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
    skipAuth: false
  }
}, {
  path: '/h5/real_name_auth',
  name: 'realNameAuth',
  component: resolve => require(['@/views/mine/RealNameAuth.vue'], resolve),
  meta: {
    title: '实名认证',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/company_auth',
  name: 'companyAuth',
  component: resolve => require(['@/views/mine/CompanyAuthPage.vue'], resolve),
  meta: {
    title: '企业认证',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/way_bill',
  name: 'wayBill',
  component: resolve => require(['@/views/mine/WayBill.vue'], resolve),
  meta: {
    title: '企业认证',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/way_bill/:id',
  name: 'wayBillDetail',
  component: resolve => require(['@/views/mine/WayBillDetail.vue'], resolve),
  meta: {
    title: '运单详情',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/way_bill_vihicle/:id',
  name: 'wayBillVehicle',
  component: resolve => require(['@/views/mine/WayBillVehicle.vue'], resolve),
  meta: {
    title: '车辆信息',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}]
