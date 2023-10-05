import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/common";

type initialState = {
  singleProduct: IProduct;
  error: string;
  products: IProduct[];
};

const initial: initialState = {
  loading: true,
  singleProduct: {
    id: 0,
    title: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
  error: "",
  products: [],
};

export const fetchProductsByID = createAsyncThunk(
  "products/fetchProductsByID",
  async (id: number) => {
    return fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => json);
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return fetch(`https://fakestoreapi.com/products`)
      .then((res) => {
        return res.json();
      })
      .then((json) => json);
  }
);
const productByIDSlice = createSlice({
  name: "singleProduct",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProducts
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = "";
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message!;
    });

    // fetchProductsByID
    builder.addCase(fetchProductsByID.pending, (state) => {
      state.error = "";
    });
    builder.addCase(
      fetchProductsByID.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.singleProduct = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchProductsByID.rejected, (state, action) => {
      state.error = action.error.message!;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default productByIDSlice.reducer;
