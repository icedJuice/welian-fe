import ax, { GET, POST } from './axios';


/**
 * 登陆
 *
 *  "email": "string",
 *  "password": "string"
 */

export const signIn = POST('/Users/SignIn');

/**
 * 注册
 *
 * @param { string } requestId
 * @param { string } captchaCode 验证码
 * @param { string } email 邮箱
 * @param { string } nickName 昵称
 * @param { string } password 密码
 * 
 */

 export const signUp = POST('/Users/SignUp');


/**
 * 获取验证码
 *
 * @param { string } requestId
 * @param { string } captchaCode 验证码
 * @param { string } email 邮箱
 * @param { string } nickName 昵称
 * @param { string } password 密码
 * 
 */

 export const getRegisterInfo = GET('/Users/GetRegisterInfo');


/**
 * 获取用户信息
 *
 * @param { string } requestId
 * @param { string } captchaCode 验证码
 * @param { string } email 邮箱
 * @param { string } nickName 昵称
 * @param { string } password 密码
 * 
 */

 export const getUserInfo = GET('/Users/GetUserInfo');