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
  const [quantity, setQuantity] = useState(1);
  // State Add products
  const [listProduct, setListProduct] = useState<IProductCart[]>([
    { id: 12, productName: "DUY KHANG", price: 200, categories: ["duykhang"] },
  ]);
  const [productDetail, setProductDetail] = useState<IProductCart | null>(null);
  const [dataUpdate, setDataUpdate] = useState<IProductCart | null>(null);

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
  // handle Add new product
  const addNewProduct = (data: IProductCart) => {
    setListProduct((prevState) => [...prevState, data]);
  };
  // Handle view details
  const handleViewDetailProduct = (id: number) => {
    if (listProduct.length > 0) {
      const indexProduct = listProduct.findIndex(
        (product) => product.id === id
      );
      const product = [...listProduct];

      setProductDetail(product[indexProduct]);
    }
  };
  // Handle delete product
  const handleDeleteProduct = (id: number) => {
    const indexProduct = listProduct.findIndex((product) => product.id === id);
    const cloneListProduct = [...listProduct];
    cloneListProduct.splice(indexProduct, 1);
    setListProduct(cloneListProduct);
  };
  // Handle display data update
  const handleDataUpdate = (id: any) => {
    const indexProduct = listProduct.findIndex((product) => product.id === id);
    setDataUpdate(listProduct[indexProduct]);
  };
  const handleUpdateData = (id: any, data: IProductCart) => {
    const indexProduct = listProduct.findIndex((product) => product.id === id);
    const cloneListProduct = [...listProduct];
    cloneListProduct[indexProduct] = data;
    setListProduct(cloneListProduct);
  };
  return (
    <CartContext.Provider
      value={{
        carts,
        listProduct,
        addToCart,
        removeFromCart,
        updateQuantityCart,
        quantity,
        setQuantity,
        filterSearch,
        setListProduct,
        addNewProduct,
        handleViewDetailProduct,
        productDetail,
        handleDeleteProduct,
        handleDataUpdate,
        dataUpdate,
        handleUpdateData,
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
