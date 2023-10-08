import { createContext, useContext, useEffect, useState } from "react";
import { IProduct2 } from "@/common/types";
const ProductContext2 = createContext<IProductContext2 | undefined>(undefined);

export const ProductProvider2: React.FC<any> = ({ children }) => {
  const [listProduct, setListProduct] = useState<IProduct2[]>([
    {
      id: 1,
      productName: "laptop",
      price: 200,
      categories: ["electronics"],
    },
    {
      id: 2,
      productName: "tablet",
      price: 200,
      categories: ["electronics"],
    },
    {
      id: 3,
      productName: "PC",
      price: 200,
      categories: ["electronics"],
    },
  ]);
  const [productDetail, setProductDetail] = useState<IProduct2 | null>(null);
  const [dataUpdate, setDataUpdate] = useState<IProduct2 | null>(null);
  const [displayData, setDisplayData] = useState<IProduct2[]>([]);
  // console.log("🚀 ~ searchText:", searchText);
  // handle Add new product

  useEffect(() => {
    setDisplayData(listProduct);
  }, [listProduct]);
  const addNewProduct = (data: IProduct2) => {
    setListProduct((prevState) => [...prevState, data]);
  };
  // hanlde display Data
  const handleSearchTermChange = (searchTerm: string) => {
    console.log("🚀 ~ searchTerm:", searchTerm);
    console.log("displayData", displayData);
    const searchResult = listProduct.reduce((accumulator, currentValue) => {
      const checkSearch =
        searchTerm &&
        currentValue.productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      checkSearch && accumulator.push(currentValue);
      return accumulator;
    }, []);
    console.log("🚀 ~ searchResult:", searchResult);
    // setDisplayData(searchResult);
    const joinArray = [searchResult, listProduct]
      .filter((arrayElement) => arrayElement.length > 0)
      .reduce((accumulator, currentValue) =>
        accumulator.filter((element) => currentValue.includes(element))
      );
    setDisplayData(joinArray);
  };

  // const handleQueryChange = (props: IQuery) => {
  //   const { searchTerm } = props;
  //   console.log("listProduct: ", listProduct);

  //   const [SearchResult] = listProduct.reduce(
  //     ([SearchResult], productItem: IProduct2) => {
  //       // console.log("SearchResult", [SearchResult]);
  //       const { productName } = productItem;
  //       const titleMatch =
  //         searchTerm &&
  //         productName.toLowerCase().includes(searchTerm.toLowerCase());
  //       titleMatch && SearchResult.push(productItem);

  //       return [SearchResult];
  //     },
  //     [[]] as [IProduct2[]]
  //   );
  //   // console.log("🚀 ~ SearchResult:", SearchResult);
  //   const joinedResult = [SearchResult, listProduct]
  //     .filter((arrayElement) => arrayElement.length !== 0)
  //     .reduce((accumulator, currentValue) =>
  //       accumulator.filter((element) => currentValue.includes(element))
  //     );
  //   // console.log("🚀 ~ joinedResult:", joinedResult);

  //   setDisplayData(joinedResult);
  // };

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
  // Use hook form
  // const useHookFormProduct = () => {
  //   const useHookForm = useForm();
  //   return useHookForm;
  // };
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
        handleSearchTermChange,
        displayData,
      }}
    >
      {children}
    </ProductContext2.Provider>
  );
};
interface IProductContext2 {
  listProduct: IProduct2[];
  addNewProduct: (data: IProduct2) => void;
  handleViewDetailProduct: (id: number) => void;
  handleDeleteProduct: (id: number) => void;
  handleDataUpdate: (id: any) => void;
  dataUpdate: IProduct2 | null;
  handleUpdateData: (id: any, data: IProduct2) => void;
  productDetail: IProduct2 | null;
  handleSearchTermChange: (search: string) => void;
  displayData: IProduct2[];
}

export const useProductContext2 = () => {
  const context = useContext(ProductContext2);
  if (!context) {
    throw new Error(
      "useProductContext2 must be used within a ProductProvider2"
    );
  }
  return context;
};
