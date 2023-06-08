import React from 'react';
import { AppProvider } from './AppProvider';
import List from './components/List';
import Add from './components/Add';
const Demo: React.FC = () => {
  return (
    <AppProvider>
      <List />
      <hr></hr>
      <Add />
    </AppProvider>
  );
};
export default Demo;
