import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider, message } from 'antd';
// import { BrowserRouter } from 'react-router-dom'; // !!! 可根据实际情况选用 HashRouter
import Routes from '@/routes';
import zhCN from 'antd/es/locale/zh_CN'; // !!! antd 默认英文，需要单独引入中文包做全局配置，这里引入之后项目里其他地方无需再引入

// import './styles/base.less'

import 'moment/locale/zh-cn'; // !!! moment的汉化，需要单独引入...

message.config({
  top: 103,
  prefixCls: 'ant-main-message',
});

render(
  <ConfigProvider locale={zhCN} prefixCls='ant-main'>
    <Routes />
  </ConfigProvider>,
  document.getElementById('app')
);
