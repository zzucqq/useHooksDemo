import React, { useContext, useState } from 'react';
import AppContext from '../AppProvider';
import { Button } from 'antd';

const Add: React.FC = () => {
  const [txt, setTxt] = useState('');
  const { setList, list } = useContext(AppContext);
  return (
    <ul>
      <li>
        <input placeholder='请输入' onChange={e => setTxt(e.target.value)} />
      </li>
      <li>
        <Button
          onClick={() => {
            const item = {
              id: Date.now(),
              txt,
            };
            setList([item, ...list]);
          }}
        >
          保存
        </Button>
      </li>
    </ul>
  );
};
export default Add;
