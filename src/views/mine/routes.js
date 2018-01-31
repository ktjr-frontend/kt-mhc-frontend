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
  path: '/h5/way_bills',
  name: 'wayBills',
  component: resolve => require(['@/views/mine/WayBills.vue'], resolve),
  meta: {
    title: '我的运单',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/way_bills/:id',
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
  path: '/h5/way_bill_vihicles/:id',
  name: 'wayBillVehicles',
  component: resolve => require(['@/views/mine/WayBillVehicles.vue'], resolve),
  meta: {
    title: '车辆信息',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/my_cars',
  name: 'myCars',
  component: resolve => require(['@/views/mine/MyCars.vue'], resolve),
  meta: {
    title: '我的车辆',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/pick_car_letters',
  name: 'pickCarLetters',
  component: resolve => require(['@/views/mine/PickCarLetters.vue'], resolve),
  meta: {
    title: '提车委托函列表',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/pick_car_letters/:id',
  name: 'pickCarLetterDetail',
  component: resolve => require(['@/views/mine/PickCarLetterDetail.vue'], resolve),
  meta: {
    title: '提车委托函详情',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}, {
  path: '/h5/info_certify',
  name: 'infoCertify',
  component: resolve => require(['@/views/mine/InfoCertify.vue'], resolve),
  meta: {
    title: '信息认证',
    tabBarVisible: false,
    headerShow: true,
    headerBackShow: true,
    skipAuth: false
  }
}]
