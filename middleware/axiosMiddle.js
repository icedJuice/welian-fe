import axios from 'axios'

import md5 from 'js-md5'

import Cookies from 'js-cookie'

export default function({req,res}) {
  console.log('req');
//  if (req.headers !== undefined) {

//     let cookieArr = req.headers.cookie;

//     const token = getCookie('token', cookieArr)

//     //设置axios的全局变量.

//     axios.defaults.timeout = 60000 // 响应时间

//     axios.defaults.headers.token = token;

//   }
}

//解析浏览器中的cookies

function getCookie (name, strCookie) {
  var arrCookie = strCookie.split(';')
  for (var i = 0; i < arrCookie.length; i++) {
    var arr = arrCookie[i].split('=')
    if (arr[0].trim() === name) {
      return arr[1]
    }
  }
  return {}
}