import { IProduct } from "@/common";
import { useFetchProducts } from "@/hooks";
import { data } from "autoprefixer";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the context interface
interface ProductContextType {
  products: IProduct[];
  filteredProducts: IProduct[];
  selectedCategory: any;
  filterProductsByCategory: (category: any) => void;
}

// Create the context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Define the ProductProvider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<any>([]);

  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [filteredProducts, setFilteredProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    useFetchProducts().then((res) => {
      setProducts(res);
      setFilteredProducts(res);
    });
  }, []);
  // Your product data (replace with your actual product data)

  // Function to filter products by category
  const filterProductsByCategory = (category: any) => {
    setSelectedCategory(category);
    //update products still retrun if category is empty
    const filteredProducts = products.filter((product: IProduct) => {
      if (category.length === 0) {
        return true;
      }
      return category.includes(product.category);
    });

    console.log("filteredProducts: ", filteredProducts);
    setFilteredProducts(filteredProducts);
  };

  const value: ProductContextType = {
    products,
    filteredProducts,
    selectedCategory,
    filterProductsByCategory,
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
