import { configureStore } from "@reduxjs/toolkit";
import ProductSliceReducer from "../reducer/ProducSlice";
import CartSliceReducer from "../reducer/CartSlice";
import UserSliceReducer from "../reducer/UserSlice";
import ProductsSlice_2 from "../reducer/ProductSlice_2";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, UserSliceReducer);

export const store:any = configureStore({
  reducer: {
    singleProduct: ProductSliceReducer,
    singleUser: UserSliceReducer,
    products: ProductSliceReducer,
    carts: CartSliceReducer,
    users: UserSliceReducer,
    products2: ProductsSlice_2
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector 