import axios from 'axios';
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import storageKey from '@/constants/storageKey';

const request = axios.create({
  // 配置信息
});

// axios 请求拦截器
request.interceptors.request.use(
  config => {
    const { data = {} } = config;
    const { current, pageSize } = data;
    const commonData = {
      apiCd: '100000',
      flowId: uuidv4().replace(/[-]/g, ''),
      sysId: 'web',
      timestamp: moment(new Date()).format('YYYYMMDDHHmmss'),
      version: '1.0',
      current: current ? current : 0,
      pageSize: pageSize ? pageSize : 10,
      data,
    };
    config.data = commonData;
    config.headers['authToken'] = sessionStorage.getItem(storageKey.ANTDPROAUTHORITY) || '';
    return config;
  },
  error => {
    console.log(error, 'error'); //
    return Promise.reject(error);
  }
);

// axios 相应拦截器
request.interceptors.response.use(
  response => {
    console.log('拦截器返回--', response);
    const { status, config = {} } = response;
    const { url = '' } = config;
    const { data, code } = response.data;
    if (status === 200 && data && code === '0000000') {
      return data;
    } else if (url.endsWith('.json')) {
      // 这里处理返回json非后端接口情况
      return response.data;
    }
    return Promise.reject(response.data);
  },
  error => {
    message.error(error);
    return Promise.reject(error);
  }
);

export default request;
