// Format Currency
export const formatNumber = (
  price: number | undefined,
  quantity: number = 1
) => {
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return dollarUS.format(price * quantity);
};
