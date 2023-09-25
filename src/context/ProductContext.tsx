import { IProduct } from "@/common";
import { ProductContextType } from "@/common/types";
import { useFetchProducts } from "@/hooks";
import usePagination from "@/hooks/usePagination";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PRODUCT_PER_PAGE = 8;

export interface Query {
  searchTerm: string;
  categoryTerm: string[];
  priceTerm: number | number[];
}

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);
// Define the ProductProvider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 0]);

  const [displayData, setDisplayData] = useState<Array<IProduct>>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryTerm, setCategoryTerm] = useState<string[]>([]);
  const [priceTerm, setPriceTerm] = useState<number | number[]>(0);

  // pagination variables
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const paginateData = usePagination(displayData, PRODUCT_PER_PAGE);
  const [Page, setPage] = useState<number>(1);

  const rawData = useFetchProducts();

  const findMax = (value: Array<IProduct>) => {
    return Math.max(...value.map((product: IProduct) => product.price));
  };
  const findMin = (value: Array<IProduct>) => {
    return Math.min(...value.map((product: IProduct) => product.price));
  };

  useEffect(() => {
    if (displayData.length !== 0) return;
    rawData.then((res) => {
      setProducts(res);
      setDisplayData(res);
      setNumberOfPages(Math.ceil(res.length / PRODUCT_PER_PAGE));

      const highestPrice = findMax(res);
      const lowestPrice = findMin(res);

      setMinMaxPrice([lowestPrice, highestPrice]);
    });
  }, [rawData]);

  const handleQueryChange = (props: Query) => {
    const { searchTerm, categoryTerm, priceTerm } = props;

    const SearchResult = products.filter((product: IProduct) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const PriceResult = products.filter((product: IProduct) => {
      if (priceTerm === 0) {
        // setDisplayData(products);
        return true;
      }
      return product.price >= priceTerm && product.price <= minMaxPrice[1];
    });

    const CategoryResult = products.filter((product: IProduct) => {
      if (categoryTerm.length === 0) {
        return true;
      }
      return categoryTerm.includes(product.category);
    });

    const joinedResult = SearchResult.filter((product: IProduct) =>
      PriceResult.includes(product)
    ).filter((product: IProduct) => CategoryResult.includes(product));

    // console.log("props: ", props);
    // console.log(SearchResult, PriceResult, CategoryResult);
    // console.log("joinedResult: ", joinedResult);

    paginateData.jump(1);
    setDisplayData(joinedResult);
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleQueryChange({
      searchTerm,
      categoryTerm,
      priceTerm,
    });
  };

  const handleCurrentFilterPriceChange = (value: number | number[]) => {
    const priceTerm = value;
    // console.log("priceTerm: ", priceTerm);
    setPriceTerm(priceTerm);
    handleQueryChange({
      searchTerm,
      categoryTerm,
      priceTerm,
    });
  };
  // Function to filter products by category
  const handleCategoryChange = (category: any) => {
    const categoryTerm = category;
    console.log("categoryTerm: ", categoryTerm);
    setCategoryTerm(categoryTerm);

    handleQueryChange({
      searchTerm,
      categoryTerm,
      priceTerm,
    });
  };

  const value: ProductContextType = {
    products,
    filteredProducts: displayData,
    categoryTerm,
    numberOfPages,
    paginateData,
    setPage,
    Page,
    minMaxPrice,
    handleSearchTermChange,
    handleCurrentFilterPriceChange,
    handleCategoryChange,
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
