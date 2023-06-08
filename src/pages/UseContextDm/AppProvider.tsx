import React, { createContext, useState } from 'react';

const AppContext = createContext({} as any);
const { Provider } = AppContext;

export const AppProvider: React.FC = props => {
  const [list, setList] = useState<any>([
    {
      id: 1,
      txt: '测试1',
    },
    {
      id: 2,
      txt: '测试3',
    },
  ]);
  return <Provider value={{ list, setList }}>{props.children}</Provider>;
};
export default AppContext;
