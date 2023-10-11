import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct2 } from "@/common/types";
interface IInitStateProps {
  listProduct: IProduct2[];
  detailProduct: {};
  searchText: string;
}
const initState: IInitStateProps = {
  listProduct: [
    {
      id: 1,
      productName: "laptop",
      price: 200,
      categories: ["electronics"],
    },
    {
      id: 2,
      productName: "tablet",
      price: 200,
      categories: ["electronics"],
    },
    {
      id: 3,
      productName: "PC",
      price: 200,
      categories: ["electronics"],
    },
  ],
  detailProduct: {},
  searchText: "",
};

const ProductsSlice_2 = createSlice({
  name: "products2",
  initialState: initState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<IProduct2>) => {
      state.listProduct.push(action.payload);
    },
    handleViewDetailProduct: (state, action) => {
      const indexProduct = state.listProduct.findIndex(
        (product) => product.id === action.payload
      );
      state.detailProduct = state.listProduct[indexProduct];
    },
    handleUpdateData: (state, action) => {
      const indexProduct = state.listProduct.findIndex(
        (product) => product.id === action.payload.id
      );
      state.listProduct[indexProduct] = action.payload;
    },
    handleDeleteProduct: (state, action) => {
      const indexProduct = state.listProduct.findIndex(
        (product) => product.id === action.payload
      );
      state.listProduct.splice(indexProduct, 1);
    },
    handleSearchTextChange: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export default ProductsSlice_2.reducer;
export const {
  addNewProduct,
  handleViewDetailProduct,
  handleUpdateData,
  handleDeleteProduct,
  handleSearchTextChange,
} = ProductsSlice_2.actions;
