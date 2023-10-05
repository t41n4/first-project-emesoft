import { CartContextType } from "@/common";
import { ICartItem, IQuery } from "@/common/types";
import { IProductCart } from "@/common/types";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePagination } from "@/hooks";
import { useAppSelector } from "@/redux/hooks";
// Create the CartContext
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
const PER_PAGE = 8;
// Create a provider component
export const CartProvider: React.FC<any> = ({ children }) => {
  // State Add To Cart
  // const [carts, setCart] = useState<ICartItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  // State Add products
  // Pagination variables

  const [listProduct, setListProduct] = useState<IProductCart[]>([
    { id: 12, productName: "DUY KHANG", price: 200, categories: ["duykhang"] },
  ]);
  const [productDetail, setProductDetail] = useState<IProductCart | null>(null);
  const [dataUpdate, setDataUpdate] = useState<IProductCart | null>(null);
  const [displayData, setDisplayData] = useState<Array<ICartItem>>([]);

  const paginateData = usePagination(displayData, PER_PAGE);

  const { carts } = useAppSelector((state) => state.carts);

  useEffect(() => {
    setDisplayData(carts);
  }, [carts]);

  const handleSearchTermChange = (searchTerm: string) => {
    handleQueryChange({
      searchTerm,
    });
  };

  const handleQueryChange = (props: IQuery) => {
    const { searchTerm } = props;
    console.log("carts: ", carts);

    const [SearchResult] = carts.reduce(
      ([SearchResult], cart: ICartItem) => {
        const { name } = cart;
        const titleMatch = name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        titleMatch && SearchResult.push(cart);

        return [SearchResult];
      },
      [[]] as [ICartItem[]]
    );
    const joinedResult = [SearchResult].flat();
    console.log("joinedResult: ", joinedResult);

    paginateData.jump(1);
    setDisplayData(joinedResult);
  };

  // // check pro exist in cart
  // const isItemExist = (item: ICartItem) =>
  //   carts.some((cart) => cart.id === item.id);

  // const findCartItemIndex = (carts: ICartItem[], item: ICartItem) => {
  //   return carts.findIndex(
  //     (cart) => cart.id === item.id && cart.name === item.name
  //   );
  // };

  // // Handle Cart
  // const addToCart = (item: ICartItem) => {
  //   if (isItemExist(item)) {
  //     const index = findCartItemIndex(carts, item);
  //     if (index !== -1) {
  //       const cartsClone = [...carts];
  //       cartsClone[index].quantity += item.quantity;
  //       setCart(cartsClone);
  //       setNewCarts(cartsClone);
  //     }
  //   } else {
  //     setCart([...carts, item]);
  //     setNewCarts([...newCarts, item]);
  //   }
  // };

  // const updateQuantityCart = (
  //   value: number | undefined,
  //   id: number | undefined
  // ) => {
  //   if (carts.length === 0) {
  //     // Handle the case when the cart is empty
  //   } else {
  //     const index = carts.findIndex((cart) => cart.id === id);
  //     if (index !== -1) {
  //       const cartsClone = [...carts];
  //       cartsClone[index].quantity = value;
  //       setCart(cartsClone);
  //       setNewCarts(cartsClone);
  //     }
  //   }
  // };

  // const removeFromCart = (id: number | undefined) => {
  //   const updateCart = carts.filter((cart) => {
  //     if (cart.id !== id) {
  //       return cart;
  //     }
  //   });
  //   setCart(updateCart);
  //   setNewCarts(updateCart);
  // };

  // const filterSearch = (textSearch: string) => {
  //   if (textSearch) {
  //     const updateCart = carts.filter((cart) => {
  //       return cart.name?.includes(textSearch);
  //     });
  //     setCart(updateCart);
  //   } else {
  //     setCart(newCarts);
  //   }
  // };
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
        // addToCart,
        // removeFromCart,
        // updateQuantityCart,
        // filterSearch,
        carts,
        listProduct,
        quantity,
        setQuantity,
        setListProduct,
        addNewProduct,
        handleViewDetailProduct,
        productDetail,
        handleDeleteProduct,
        handleDataUpdate,
        dataUpdate,
        handleUpdateData,
        handleSearchTermChange,
        displayData,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
