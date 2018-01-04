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
  path: '/h5/order_add',
  name: 'orderAdd',
  component: resolve => require(['@/views/order/OrderForm.vue'], resolve),
  meta: {
    title: '订单宝',
    tabBarVisible: false,
    skipAuth: false,
    hasFixedButtons: true,
    headerBackShow: true,
    headerShow: true
  }
}]
