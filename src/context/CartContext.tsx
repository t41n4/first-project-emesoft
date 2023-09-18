import { CartContextType } from "@/common";
import { ICartItem, IInputQuantity } from "@/common/types";
import React, { createContext, useContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  const [carts, setCart] = useState<ICartItem[]>([]);
  console.log("cart: ", carts);

  const isItemExist = (item: ICartItem) =>
    carts.some((cart) => cart.id === item.id && cart.name === item.name);

  const addToCart = (item: ICartItem) => {
    if (isItemExist(item)) {
      const update = carts.map((cart) => {
        if (cart.id === item.id) {
          cart.quantity += 1;
        }
        return cart;
      });
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
    const updatedCart = carts.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart: carts, addToCart, removeFromCart, updateQuantytiCart }}
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
