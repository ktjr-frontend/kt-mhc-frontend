export default [{
  path: '/h5/orders',
  name: 'orders',
  component: resolve => require(['@/views/order/Index.vue'], resolve),
  meta: {
    title: '订单宝',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}, {
  path: '/h5/order_edit/:id',
  name: 'orderEdit',
  component: resolve => require(['@/views/order/OrderForm.vue'], resolve),
  meta: {
    title: '添加订单',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}, {
  path: '/h5/order/:id',
  name: 'orderDetail',
  component: resolve => require(['@/views/order/OrderDetail.vue'], resolve),
  meta: {
    title: '订单详情',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: false,
    headerBackShow: true,
    headerShow: true
  }
}]
