import { IProduct } from "@/common";

export const findMax = (value: Array<IProduct>) => {
  return Math.max(...value.map((product: IProduct) => product.price));
};
export const findMin = (value: Array<IProduct>) => {
  return Math.min(...value.map((product: IProduct) => product.price));
};
