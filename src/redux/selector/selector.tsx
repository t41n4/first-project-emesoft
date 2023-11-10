import { RootState } from "../store/store";
export const displayDataSelector = (state: RootState) =>
  state.products2.listProduct;

export const productDetailSelector = (state: RootState) => {
  return state.products2.detailProduct;
};
