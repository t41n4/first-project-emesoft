import { IProduct } from "@/common";
import { ProductContextType } from "@/common/types";
import { useFetchProducts } from "@/hooks";
import usePagination from "@/hooks/usePagination";
import { data } from "autoprefixer";
import {
  ReactNode,
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";

const PRODUCT_PER_PAGE = 8;

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);
// Define the ProductProvider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<any>([]);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // pagination variables
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const paginateData = usePagination(filteredProducts, PRODUCT_PER_PAGE);
  // console.log("paginateData: ", paginateData);
  const [Page, setPage] = useState<number>(1);

  useEffect(() => {
    useFetchProducts().then((res) => {
      setProducts(res);
      setFilteredProducts(res);
      setNumberOfPages(Math.ceil(res.length / PRODUCT_PER_PAGE));
    });
  }, []);
  // Your product data (replace with your actual product data)

  useEffect(() => {
    if (searchTerm === "") {
      console.log("searchTerm is empty");
      filterProductsByCategory(selectedCategory);
      paginateData.jump(1);

      return;
    }

    const SearchResult = filteredProducts.filter((product: IProduct) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isFound = SearchResult.length > 0;

    if (isFound) {
      console.log("isFound: ", isFound);
      setFilteredProducts(SearchResult);
      setNumberOfPages(Math.ceil(SearchResult.length / PRODUCT_PER_PAGE));

      setPage(1);
      paginateData.jump(1);
    } else {
      console.log("isFound: ", isFound);

      setFilteredProducts([]);
      setNumberOfPages(0);
      setPage(1);
      paginateData.jump(1);
    }
    console.log("paginateData: ", paginateData);
  }, [searchTerm]);

  // Function to filter products by category
  const filterProductsByCategory = (category: any) => {
    //update selected category
    setSelectedCategory(category);

    //update products still retrun if category is empty
    const filteredProducts = products.filter((product: IProduct) => {
      if (category.length === 0) {
        return true;
      }
      return category.includes(product.category);
    });

    //update filtered products
    setFilteredProducts(filteredProducts);

    //update number of pages
    setNumberOfPages(Math.ceil(filteredProducts.length / PRODUCT_PER_PAGE));
    //reset page to 1
    setPage(1);
    paginateData.jump(1);
  };

  const value: ProductContextType = {
    products,
    filteredProducts,
    selectedCategory,
    filterProductsByCategory,
    numberOfPages,
    paginateData,
    setPage,
    Page,
    setSearchTerm,
    searchTerm,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

// Define a custom hook for using the ProductContext
export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
