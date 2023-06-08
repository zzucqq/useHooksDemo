import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <Result
      status='404'
      title='404'
      subTitle='页面未找到'
      extra={
        <Button
          type='primary'
          onClick={(): void => {
            history.push('/');
          }}
        >
          回到首页
        </Button>
      }
    />
  );
};

export default NotFound;
