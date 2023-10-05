import { IProduct } from "@/common";
import { IQuery, ProductContextType } from "@/common/types";
import { useFetchProducts } from "@/hooks";
import usePagination from "@/hooks/usePagination";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProducts } from "@/redux/reducer/ProducSlice";
import { findMax, findMin } from "@/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PRODUCT_PER_PAGE = 8;

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);
// Define the ProductProvider component
export function ProductProvider({ children }: { children: ReactNode }) {
  // const [products, setProducts] = useState<Array<IProduct>>([]);
  const [minMaxPrice, setMinMaxPrice] = useState<number[]>([0, 0]);

  const [displayData, setDisplayData] = useState<Array<IProduct>>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryTerm, setCategoryTerm] = useState<string[]>([]);
  const [priceTerm, setPriceTerm] = useState<number | number[]>(0);

  // pagination variables
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const paginateData = usePagination(displayData, PRODUCT_PER_PAGE);
  const [Page, setPage] = useState<number>(1);

  const { products } = useAppSelector((state) => state.products);
  
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
      return;
    }

    setDisplayData(products);
    setNumberOfPages(Math.ceil(products.length / PRODUCT_PER_PAGE));
    const highestPrice = findMax(products);
    const lowestPrice = findMin(products);
    setMinMaxPrice([lowestPrice, highestPrice]);
  }, [dispatch, products]);

  const handleQueryChange = (props: IQuery) => {
    const { searchTerm, categoryTerm, priceTerm } = props;
    const [SearchResult, PriceResult, CategoryResult] = products.reduce(
      ([SearchResult, PriceResult, CategoryResult], product: IProduct) => {
        const { title, price, category } = product;
        const titleMatch = title
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() ?? "");
        titleMatch && SearchResult.push(product);

        const priceMatch =
          price >= (priceTerm as number) && price <= minMaxPrice[1];
        priceMatch && PriceResult.push(product);

        const categoryMatch =
          categoryTerm?.length === 0 ? true : categoryTerm?.includes(category);
        categoryMatch && CategoryResult.push(product);

        return [SearchResult, PriceResult, CategoryResult];
      },

      [[], [], []] as [IProduct[], IProduct[], IProduct[]]
    );
    // console.log([SearchResult, PriceResult, CategoryResult]);

    // join 3 array
    const joinedResult = [SearchResult, PriceResult, CategoryResult]
      .filter((arr) => arr.length !== 0)
      .reduce((a, b) => a.filter((c) => b.includes(c)));
    console.log("joinedResult: ", joinedResult);

    setPage(1);
    paginateData.jump(1);
    setDisplayData(joinedResult);
  };

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    handleQueryChange({
      searchTerm,
      categoryTerm,
      priceTerm,
    });
  };

  const handleCurrentFilterPriceChange = (value: number | number[]) => {
    const priceTerm = value;
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
    displayData,
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
