import { CartContextType } from "@/common";
import { ICartItem } from "@/common/types";
import React, { createContext, useContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  const [carts, setCart] = useState<ICartItem[]>([]);

  const isItemExist = (item: ICartItem) =>
    carts.some((cart) => cart.id === item.id && cart.name === item.name);

  const addToCart = (item: ICartItem) => {
    if (isItemExist(item)) {
      // update quantity
      const cartClone = carts.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.quantity += 1;
        }
        return cartItem;
      });
      setCart(cartClone);
    } else {
      setCart([...carts, item]);
    }
  };

  const updateQuantytiCart = (value: number, id: number) => {
    if (carts.length === 0) {
      console.log("mang rong");
    } else {
      const cartClone = carts.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.quantity = value;
        }
        return cartItem;
      });
      setCart(cartClone);
    }
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
