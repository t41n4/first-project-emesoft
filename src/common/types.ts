import { Dispatch, SetStateAction } from "react";

// Define the type for your cart item
export interface ICartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
export interface IInputQuantity {
  id: number;
  value: number;
}

// Define the shape of your context
export interface CartContextType {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantytiCart: (id: IInputQuantity) => void;
  totalQuantity: number;
}

// Define the context interface
export interface ProductContextType {
  products: IProduct[];
  filteredProducts: IProduct[];
  numberOfPages: number;
  selectedCategory: any;
  filterProductsByCategory: (category: any) => void;
  paginateData: IPaginateData;
  Page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface IPaginateData {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentData: () => any[] ;
  currentPage: number;
  maxPage: number;
}

export interface ICategories {
  [x: string]: any;
}

export interface IProductLayout {
  children: React.ReactNode;
}

export interface IWindowSize {
  width: number | 0;
  height: number | 0;
}

export interface IProducts {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ICart {
  id: number;
  userId: number;
  date: string; // Assuming date is a string in ISO 8601 format (e.g., "2020-10-10")
  products: IProductItem[];
}

export interface IProductItem {
  productId: number;
  quantity: number;
}

export interface MyComponentProps {
  initialData: string[]; // Define the prop with an initial array of strings
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: object;
}
