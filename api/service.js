import ax, { GET, POST } from './axios';


/**
 * 登陆
 *
 *  "email": "string",
 *  "password": "string"
 */

export const signIn = POST('/Users/SignIn');
