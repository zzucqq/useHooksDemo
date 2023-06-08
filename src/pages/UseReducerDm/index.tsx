import React, { useReducer } from 'react';
import { Button } from 'antd';
// import { useReducer } from "../../components/fakeReducer";
import { reducer } from './reducer';

interface IProd {
  id: number
  name: string
  num: number
  price: number
}
const initialState = {
  products: [
    { id: 1, name: '背包', num: 1, price: 400 },
    { id: 2, name: '耳机', num: 2, price: 220 },
  ],
  total: 820,
};
const Demo: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h2>购物车案例</h2>
      <ul>
        {state.products.map((product: IProd) => {
          return (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              {product.name} {product.num} {product.price}
              &nbsp;&nbsp;&nbsp;
              <Button
                type='primary'
                onClick={(): void => dispatch({ type: 'ADD', payload: product.id })}
              >
                +
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                onClick={(): void => dispatch({ type: 'DECREASE', payload: product.id })}
                danger
              >
                -
              </Button>
            </li>
          );
        })}
      </ul>
      <hr />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;总计 <b>{state.total}</b>{' '}
      元&nbsp;&nbsp;&nbsp;
      <Button onClick={(): void => dispatch({ type: 'CLEAR' })}>清空</Button>
    </div>
  );
};
export default Demo;
