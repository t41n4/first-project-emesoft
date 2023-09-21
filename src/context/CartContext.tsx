import { CartContextType } from "@/common";
import { ICartItem } from "@/common/types";
import React, { createContext, useContext, useState } from "react";
import { usePagination } from "@/hooks";
// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
const PER_PAGE = 8;
// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  const [carts, setCart] = useState<ICartItem[]>([]);
  const [quantity, setQuantity] = useState(1);

  // Pagination variables
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const paginateData = usePagination(carts, PER_PAGE);
  const [Page, setPage] = useState<number>(1);

  //Update number of page / set Total page

  // check pro exist in cart
  const isItemExist = (item: ICartItem) =>
    carts.some((cart) => cart.id === item.id);

  const findCartItemIndex = (carts: ICartItem[], item: ICartItem) => {
    return carts.findIndex(
      (cart) => cart.id === item.id && cart.name === item.name
    );
  };

  const addToCart = (item: ICartItem) => {
    console.log("item: ", item);
    if (isItemExist(item)) {
      const index = findCartItemIndex(carts, item);
      if (index !== -1) {
        const cartsClone = [...carts];
        cartsClone[index].quantity += item.quantity;
        setCart(cartsClone);
      }
    } else {
      setCart([...carts, item]);
    }
  };

  const updateQuantityCart = (
    value: number | undefined,
    id: number | undefined
  ) => {
    if (carts.length === 0) {
      // Handle the case when the cart is empty
    } else {
      const index = carts.findIndex((cart) => cart.id === id);
      if (index !== -1) {
        const cartsClone = [...carts];
        cartsClone[index].quantity = value;
        setCart(cartsClone);
      }
    }
  };

  const removeFromCart = (id: number | undefined) => {
    // const updatedCart = carts.filter((item) => item.id === id);
    // console.log(updatedCart);
    // setCart(updatedCart);
    const updateCart = carts.filter((cart) => {
      if (cart.id !== id) {
        return cart;
      }
    });
    setCart(updateCart);
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeFromCart,
        updateQuantityCart,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
