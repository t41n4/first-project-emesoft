import { ICartItem } from "@/common/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialState = {
  carts: any[];
  quantity: number;
  newCarts: any[];
};

const initial: initialState = {
  carts: [],
  newCarts: [],
  quantity: 0,
};
const findCartItemIndex = (carts: ICartItem[], item: ICartItem) => {
  return carts.findIndex(
    (cart) => cart.id === item.id && cart.name === item.name
  );
};

const isItemExist = (item: ICartItem, carts: ICartItem[]) =>
  carts.some((cart: { id: number | undefined }) => cart.id === item.id);

const productByIDSlice = createSlice({
  name: "carts",
  initialState: initial,
  reducers: {
    // add to cart
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      if (isItemExist(action.payload, state.carts)) {
        const index = findCartItemIndex(state.carts, action.payload);
        if (index !== -1) {
          const cartsClone = [...state.carts];
          cartsClone[index].quantity += action.payload.quantity;
          state.carts = cartsClone;
        }
      } else {
        state.carts = [...state.carts, action.payload];
        state.newCarts = [...state.newCarts, action.payload];
      }
    },
    // update quantity
    updateQuantityCart: (
      state,
      action: PayloadAction<{ value: number; id: number }>
    ) => {
      if (state.carts.length === 0) {
        // Handle the case when the cart is empty
      } else {
        const index = state.carts.findIndex(
          (cart: { id: number }) => cart.id === action.payload.id
        );
        if (index !== -1) {
          const cartsClone = [...state.carts];
          cartsClone[index].quantity = action.payload.value;
          state.carts = cartsClone;
        }
      }
    },
    // remove from cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updateCart = state.carts.filter((cart: { id: number }) => {
        if (cart.id !== action.payload) {
          return cart;
        }
      });
      state.carts = updateCart;
      state.newCarts = updateCart;
    },
    // filter search
    filterSearch: (state, action: PayloadAction<string>) => {
      // if (textSearch) {
      //   const updateCart = carts.filter((cart) => {
      //     return cart.name?.includes(textSearch);
      //   });
      //   setCart(updateCart);
      // } else {
      //   setCart(newCarts);
      // }
      if (action.payload) {
        const updateCart = state.carts.filter((cart: { name: string }) => {
          return cart.name?.includes(action.payload);
        });
        state.carts = updateCart;
      } else {
        state.carts = state.newCarts;
      }
    },
    // set quantity
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
});

export default productByIDSlice.reducer;
export const { addToCart, updateQuantityCart, removeFromCart, filterSearch } =
  productByIDSlice.actions;
