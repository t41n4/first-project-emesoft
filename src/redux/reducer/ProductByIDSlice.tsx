import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/common";

type initialState = {
  loading: boolean;
  singleProduct: any;
  error: string;
};

const initial: initialState = {
  loading: true,
  singleProduct: {},
  error: "",
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

const productByIDSlice = createSlice({
  name: "singleProduct",
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    // fetchProductsByID
    builder.addCase(fetchProductsByID.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchProductsByID.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.loading = false;
        state.singleProduct = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchProductsByID.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message!;
    });
    builder.addDefaultCase((state) => state);
  },
});

export default productByIDSlice.reducer;
