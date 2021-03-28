import querystring from 'querystring';
import { BASE_PORT } from '../config';
import Cookies from 'js-cookie';

import axios from 'axios';

const ax = axios.create({
  baseURL: 'http://localhost:' + BASE_PORT,
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type' :'application/json:charset=UtF-8',
};

const base = '/api/v1';

// 拦截器
ax.interceptors.request.use(
  data => {
    // if (data.method === 'post' || data.method === 'put' || data.method === 'delete' || data.method === 'patch') {
    //   console.log(data.data);
    //   data.data = querystring.stringify(data.data);
    // }
    return data;
  },
  error => {
    return Promise.reject(error);
  }
);

ax.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        console.log('超时了');
        // window.alert('请求超时，请检查网络是否连接正常');
      } else {
        // 可以展示断网组件
        console.log('断网了');
        // window.alert('请求失败，请检查网络是否已连接');
      }
    }
    return Promise.reject(error);
  }
);

export const GET = path => _params => {
  const authToken = _params && _params.authToken || Cookies.get('WeLink');
  const params = {...(_params || {}), authToken};
  return ax
    .get(base + path, { params }, {headers})
    .then(res => res.data)
    .catch(() => null);
}

export const POST = path => _data => {
  const authToken = Cookies.get('WeLink');
  const isUpload = /upload/i.test(path);
  let data = _data;
  if (!isUpload) {
    data = {...(_data || {}), authToken};
  }
  const addHeaders = isUpload ? {
    'Content-Type': 'application/form-data',
  } : {};
  return ax
    .post(base + path, data, {headers: { ... headers, ...addHeaders}})
    .then(res => res.data)
    .catch(() => null);
}

export default ax;


