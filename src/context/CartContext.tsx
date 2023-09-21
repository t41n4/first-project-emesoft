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

  // Pagination variables
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const paginateData = usePagination(carts, PER_PAGE);
  const [Page, setPage] = useState<number>(1);

  //Update number of page / set Total page

  // check pro exist in cart
  const isItemExist = (item: ICartItem) =>
    carts.some((cart) => cart.id === item.id);

  const addToCart = (item: ICartItem) => {
    if (isItemExist(item)) {
      const cartClones = carts.filter((cart) => {
        if (cart.id === item.id) {
          cart.quantity += 1;
        }
        return cart;
      });
      setCart(cartClones);
    } else {
      setCart([...carts, item]);
    }
  };

  const updateQuantytiCart = (value: number, id: number) => {
    const cartClones = carts.filter((cart) => {
      if (cart.id === id) {
        cart.quantity = value;
      }
      return cart;
    });
    setCart(cartClones);
  };

  const removeFromCart = (id: number) => {
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
        updateQuantytiCart,
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
