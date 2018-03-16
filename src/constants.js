export const STORE_KEY_USER = 'user'
export const STORE_KEY_ACCESS_TOKEN = 'user.access_token'
export const STORE_KEY_LAST_LOGINED_PHONE = 'phone'

// 垫资金额因子
export const PAYMENT_FACTOR = 0.95
export const PAYMENT_RATE = 0.8

// ajax 返回的code类型
export const RET_CODE_MAP = {
  OK: '200' // 成功,
}

// 订单状态
export const ORDER_STATUS_MAP = {
  WAIT_FILL_MATERIAL: 1000, // 待补齐资料
  WAIT_FOR_FIRST_CHECK: 2000, // 待审核
  FISRT_CHECK_REJECTED: 2002, // 初审未通过
  WAIT_FOR_CHECK_CAR: 3000, // 待物流验车
  // CHECK_CAR_REJECTED: '5', // 验车未通过
  DISPATCHED: 3001, // 放款审核未通过
  CHECK_PASSED: 3003, // 放款审核通过
  // LOANED: '8', // 已放款
  ON_THE_WAY: 3004, // 在途中
  STORE_CHECK_FAILED: 4002, // 仓库验车不通过
  PUT_IN_STORE: 4001, // 已入库
  // REPAYMENT_FAILED: '12', // 还款不通过
  WAIT_FOR_PICK: 5000, // 待提车
  // PICK_CHECK_FAILED: '14', // 提车审核不通过
  PICK_SUCCESS: 9001, // 已完成
  CLOSED: 9002 // 已关闭
  // WAIT_FOR_SETTLEMENT: '17', // 待结算审核
  // WAIT_FOR_SETTLEMENT_UPLOAD: '18' // 待上传结算支付凭证
}

// 结算单状态
export const SETTLE_STATUS_MAP = {
  WAIT_FOR_PAY: 1, // 待上传支付凭证
  CHECKING: 2, // 待结算审核
  PASSED: 3, // 审核通过
  REJECT: 4 // 审核拒绝
}

// 支付类型
export const PAYMENT_TYPE = {
  CASH_DEPOSIT: 1, // 保证金 1
  DEPOSIT: 2, // 定金  2
  CONTRACT_AMOUNT: 3, // 车辆采购金额  3
  SETTLEMENT: 4, // 提车结算金 4
  LOGISTICS_COST: 5, // 物流费用  5
  WAREHOURSE_COST: 6 // 仓储费用  6
}

// 运输类型
export const DELIVERY_TYPE = {
  TO_WAREHOURSE: 1,
  TO_SHOP: 2
}
