export const STORE_KEY_USER = 'user'
export const STORE_KEY_ACCESS_TOKEN = 'user.access_token'
export const STORE_KEY_LAST_LOGINED_PHONE = 'phone'

// ajax 返回的code类型
export const RET_CODE_MAP = {
  OK: 0 // 成功,
}

// 订单状态
export const ORDER_STATUS_MAP = {
  WAIT_FILL_MATERIAL: '1', // 待完善资料
  WAIT_FOR_FIRST_CHECK: '2', // 待初审
  FISRT_CHECK_REJECTED: '3', // 初审未通过
  WAIT_FOR_CHECK_CAR: '4', // 待验车
  // CHECK_CAR_REJECTED: '5', // 验车未通过
  LOAN_CHECK_FAILED: '6', // 放款审核未通过
  LOAN_CHECK_SUCCESS: '7', // 放款审核通过
  LOANED: '8', // 已放款
  ON_THE_WAY: '9', // 在途中
  STORE_CHECK_FAILED: '10', // 仓库验车不通过
  PUT_IN_STORE: '11', // 已入库
  REPAYMENT_FAILED: '12', // 还款不通过
  WAIT_FOR_PICK: '13', // 待提车
  PICK_CHECK_FAILED: '14', // 提车审核不通过
  PICK_SUCCESS: '15', // 已完成
  CLOSED: '16', // 已关闭
  WAIT_FOT_SETTLEMENT: '17' // 待结算审核
}
