interface IProd {
  id: number
  name: string
  num: number
  price: number
}
export const reducer = (state: any, action: any): any => {
  const newState = JSON.parse(JSON.stringify(state));
  const id = action.payload;
  const index = state.products.findIndex((product: IProd) => product.id === id);

  switch (action.type) {
    case 'ADD':
      newState.products[index].num++;
      break;
    case 'DECREASE':
      if (state.products[index].num <= 1) {
        newState.products.splice(index, 1);
      } else {
        newState.products[index].num--;
      }

      break;
    case 'CLEAR':
      return { products: [], total: 0 };
    default:
      return state;
  }

  newState.total = newState.products.reduce((total: number, product: IProd) => {
    return total + product.num * product.price;
  }, 0);

  return newState;
};
