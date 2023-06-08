import { useState } from 'react';

export const useReducer = (reducer: any, initialState = {}) => {
  const [state, updateState] = useState(initialState);

  const dispatch = (action: any) => {
    updateState(reducer(state, action));
  };

  return [state, dispatch];
};
