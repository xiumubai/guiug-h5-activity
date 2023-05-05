import instance from '/@/utils/useAxiosApi';

/**
 * 账号密码登录
 * @param phone
 * @param code
 * @returns UseAxiosReturn
 */
export function loginPassword(data) {
  return instance(`/api/coupon/login`, {
    method: 'POST',
    data
  });
}

/**
 * 获取手机号验证码
 * @returns 
 */
export function getValidateCode(phone) {
  return instance(`/api/validate/${phone}`, {
    method: 'GET',
  });
}


/**
 * 优惠券提交
 * @param name
 * @param amount
 * @returns UseAxiosReturn
 */
export function saveCoupon(data) {
  return instance(`/api/coupon/save`, {
    method: 'POST',
    data
  });
}