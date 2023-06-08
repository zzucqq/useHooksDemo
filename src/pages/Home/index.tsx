import React from 'react';
import { Button } from 'antd';

import './index.less';

import png from '@/assets/images/code7.png';

const Home: React.FC = () => {
  return (
    <div className='home'>
      <img src={png} alt='' />
      <Button type='primary'>按钮</Button>
    </div>
  );
};

export default Home;
