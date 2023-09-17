import { CartContextType } from "@/common";
import { ICartItem, IInputQuantity } from "@/common/types";
import React, { createContext, useContext, useState } from "react";

// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);
  // console.log("cart: ", cart);

  const addToCart = (item: ICartItem) => {
    setCart([...cart, item]);
  };
  const updateQuantytiCart = (value: number, id: number) => {
    if (cart.length === 0) {
      console.log("mang rong");
    } else {
      const cartClone = cart.map((cartItem) => {
        if (cartItem.id === id) {
          cartItem.quantity = value;
        }
        return cartItem;
      });
      setCart(cartClone);
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantytiCart }}
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
