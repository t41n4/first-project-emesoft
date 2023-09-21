// Format Currency
export const formatNumber = (
  price: number | undefined,
  quantyti: number = 1
) => {
  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return dollarUS.format(price * quantyti);
};
