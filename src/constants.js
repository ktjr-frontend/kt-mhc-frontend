export const STORE_KEY_USER = 'user'
export const STORE_KEY_ACCESS_TOKEN = 'user.access_token'
export const STORE_KEY_LAST_LOGINED_PHONE = 'phone'

// ajax 返回的code类型
export const RET_CODE_MAP = {
  OK: 0 // 成功,
}

// 订单状态
export const ORDER_STATUS_MAP = {
  WAIT_FILL_MATERIAL: '1',
  WAIT_FOR_FIRST_CHECK: '2',
  FISRT_CHECK_REJECTED: '3',
  WAIT_FOR_CHECK_CAR: '4',
  CHECK_CAR_REJECTED: '5',
  WAIT_FOR_LOAN: '6',
  LOAN_CHECK_FAILED: '7',
  LOANED: '8',
  ON_THE_WAY: '9',
  STORE_CHECK_FAILED: '10',
  PUT_IN_STORE: '11',
  CLOSED: '12'
}
