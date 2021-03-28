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

 
/**
 * 获取省份
 * 
*/
 export const getProvinces = GET('/Zone/GetProvinces');

/**
 * 获取市区
 * 
*/
export const GetCitiesInfo = GET('/Zone/GetCitiesInfo');

/**
 * 
 * 上传图片
 * 
 * files:
 * authToken
 * 
*/
export const uploadFile = POST('/CloudFiles/UploadFile');


/**
 * 获取二维码分类
 * 
 * 
*/

export const getQrTypes = GET('/Qr/GetQrTypes');

/**
 * 提交二维码
 * "typeId": 0,
  "title": "string",
  "labels": "string",
  "description": "string",
  "province": "string",
  "city": "string",
  "qrId": "string",
  "avatarId": "string",
  "authToken": "string"
 * 
*/

export const createQrCode = POST('/Qr/CreateQrCode');

/**
 * 获取二维码列表
 * 
 * @param { string } category
 * @param { number } typeId
 * @param { number } currentPage
 * @param { number } pageSize
 * 
*/
export const getQrCodes = GET('/Qr/GetQrCodes');


/**
 * 获取用户qrcode列表
 * currentPage
 * pageSize
*/

export const getMyQrCodes = GET('/Qr/GetMyQrCodes');
