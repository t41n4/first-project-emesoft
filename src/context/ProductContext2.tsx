import { createContext, useContext, useState } from "react";
import { IProduct2 } from "@/common/types";
interface IProductContext2 {
  listProduct: IProduct2[];
  addNewProduct: (data: IProduct2) => void;
  handleViewDetailProduct: (id: number) => void;
  handleDeleteProduct: (id: number) => void;
  handleDataUpdate: (id: any) => void;
  dataUpdate: IProduct2 | null;
  handleUpdateData: (id: any, data: IProduct2) => void;
  productDetail: IProduct2 | null;
  handleDisplayProduct: (textSearch?: string) => void;
}
const ProductContext2 = createContext<IProductContext2 | undefined>(undefined);

export const ProductProvider2: React.FC<any> = ({ children }) => {
  const [listProduct, setListProduct] = useState<IProduct2[]>([
    { id: 12, productName: "duy khang", price: 200, categories: ["duykhang"] },
  ]);
  const [productDetail, setProductDetail] = useState<IProduct2 | null>(null);
  const [dataUpdate, setDataUpdate] = useState<IProduct2 | null>(null);
  // handle Add new product
  const addNewProduct = (data: IProduct2) => {
    setListProduct((prevState) => [...prevState, data]);
  };
  // handle display data
  const handleDisplayProduct = (searchText: string | undefined) => {
    // const todoRemaining = state.todoList.filter((todo) => {
    //         return todo.name.includes(state.filters.search);
    //     })
    //     return todoRemaining

    // const listDataProduct = [...listProduct];
    // listDataProduct.filter((product) => {
    //   return product.productName.includes(searchText);
    // });
    // console.log("🚀 ~ listDataProduct:", listDataProduct);
    if (searchText) {
      const listDataProduct = listProduct.filter((product) => {
        return product.productName.includes(searchText);
      });
      return listDataProduct;
    }
    return listProduct;
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
  const handleUpdateData = (id: any, data: IProduct2) => {
    const indexProduct = listProduct.findIndex((product) => product.id === id);
    const cloneListProduct = [...listProduct];
    cloneListProduct[indexProduct] = data;
    setListProduct(cloneListProduct);
  };
  const handleSearchProduct = (textSearch: string) => {};

  return (
    <ProductContext2.Provider
      value={{
        listProduct,
        addNewProduct,
        handleViewDetailProduct,
        productDetail,
        handleDeleteProduct,
        handleDataUpdate,
        dataUpdate,
        handleUpdateData,
        handleDisplayProduct,
      }}
    >
      {children}
    </ProductContext2.Provider>
  );
};

export const useProductContext2 = () => {
  const context = useContext(ProductContext2);
  if (!context) {
    throw new Error(
      "useProductContext2 must be used within a ProductProvider2"
    );
  }
  return context;
};
