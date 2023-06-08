import React, { useContext } from 'react';
import AppContext from '../AppProvider';

const List: React.FC = () => {
  const { list } = useContext(AppContext);
  return (
    <ul>
      {list.map((item: any) => (
        <li key={item.id}>{item.txt}</li>
      ))}
    </ul>
  );
};
export default List;
