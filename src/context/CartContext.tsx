import { CartContextType } from "@/common";
import { ICartItem } from "@/common/types";
import { IProductCart } from "@/common/types";
import React, { createContext, useContext, useState } from "react";
import { usePagination } from "@/hooks";
// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
const PER_PAGE = 8;
// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  // State Add To Cart
  const [carts, setCart] = useState<ICartItem[]>([]);
  const [newCarts, setNewCarts] = useState<ICartItem[]>([]);
  // State Add products
  const [ListProduct, setListProduct] = useState<IProductCart[]>([]);
  console.log("🚀 ~ ListProduct:", ListProduct);

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
  // Handle Cart
  const addToCart = (item: ICartItem) => {
    if (isItemExist(item)) {
      const index = findCartItemIndex(carts, item);
      if (index !== -1) {
        const cartsClone = [...carts];
        cartsClone[index].quantity += item.quantity;
        setCart(cartsClone);
        setNewCarts(cartsClone);
      }
    } else {
      setCart([...carts, item]);
      setNewCarts([...newCarts, item]);
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
        setNewCarts(cartsClone);
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
    setNewCarts(updateCart);
  };

  const filterSearch = (textSearch: string) => {
    if (textSearch) {
      const updateCart = carts.filter((cart) => {
        return cart.name?.includes(textSearch);
      });
      setCart(updateCart);
    } else {
      setCart(newCarts);
    }
  };
  // Handle Product
  const addNewProduct = (data: IProductCart) => {
    setListProduct((prevState) => [...prevState, data]);
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        ListProduct,
        addToCart,
        removeFromCart,
        updateQuantityCart,
        quantity,
        setQuantity,
        filterSearch,
        setListProduct,
        addNewProduct,
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
