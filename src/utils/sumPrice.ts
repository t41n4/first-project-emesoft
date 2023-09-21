export const sumPrice = (carts: any[] | undefined) => {
  let total = 0;
  carts.map((cartItem) => {
    total += cartItem.quantity * cartItem.price;
  });
  return total;
};
