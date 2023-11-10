import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct2 } from "@/common/types";
interface IInitStateProps {
  listProduct: IProduct2[];
  detailProduct: {};
  searchText: string;
}
export const initState: IInitStateProps = {
  listProduct: [
    {
      id: 1,
      productName: "laptop",
      price: 200,
      categories: ["jewelery"],
      picture:
        "https://i.pinimg.com/564x/8e/7f/89/8e7f8987a2508e2f9a854df1791b706c.jpg",
      detailPictures: [
        "https://i.pinimg.com/564x/b1/79/e8/b179e8d49e1da40fd30ba5002ff777de.jpg",
        "https://i.pinimg.com/564x/b1/79/e8/b179e8d49e1da40fd30ba5002ff777de.jpg",
      ],
    },

    {
      id: 2,
      productName: "tablet",
      price: 100,
      categories: ["men's clothing"],
    },
    {
      id: 3,
      productName: "PC",
      price: 300,
      categories: ["electronics"],
    },
  ],
  detailProduct: {},
  searchText: "",
};

const ProductsSliceReducer_2 = createSlice({
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

export default ProductsSliceReducer_2.reducer;
export const {
  addNewProduct,
  handleViewDetailProduct,
  handleUpdateData,
  handleDeleteProduct,
  handleSearchTextChange,
} = ProductsSliceReducer_2.actions;
