import { configureStore } from "@reduxjs/toolkit";
import ProductByIDSlice from "../reducer/ProductByIDSlice";
import CartSliceReducer from "../reducer/CartSlice";
import UserSliceReducer from "../reducer/UserSlice";

export const store = configureStore({
  reducer: {
    singleProduct: ProductByIDSlice,
    carts: CartSliceReducer,
    users: UserSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
