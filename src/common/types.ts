import { Dispatch, SetStateAction } from "react";
6;
// Define the type for your cart item
export interface ICartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}
export type UserContextType = {
  users: any[];
  displayData: any[];
  handleSearchTermChange: (searchTerm: string) => void;
};

export interface IProductCart {
  id: number;
  productName: string;
  price: number;
  categories?: string[];
  picture?: File | null;
  detailPictures?: File[] | undefined;
}

export interface IInputQuantity {
  id: any;
  value: number | undefined;
}

// Define the shape of your context
export interface CartContextType {
  carts: ICartItem[];
  // addToCart: (item: ICartItem) => void;
  // removeFromCart: (id: any) => void;
  // updateQuantityCart: (
  //   value: number | undefined,
  //   id: number | undefined
  // ) => void;
  // filterSearch: (textSearch: string) => void;
  quantity: number;
  setQuantity: any;
  listProduct: IProductCart[];
  setListProduct: any;
  productDetail: IProductCart | null;
  addNewProduct: (data: IProductCart) => void;
  handleViewDetailProduct: (id: number) => void;
  handleDeleteProduct: (id: number) => void;
  handleDataUpdate: (id: any) => void;
  dataUpdate: IProductCart | null;
  handleUpdateData: (id: any, data: IProductCart) => void;
  handleSearchTermChange: (searchTerm: string) => void;
  displayData: ICartItem[];
}

export interface IQuery {
  searchTerm?: string;
  categoryTerm?: string[];
  priceTerm?: number | number[];
}

// Define the context interface
export interface ProductContextType {
  products: IProduct[];
  displayData: IProduct[];
  numberOfPages: number;
  categoryTerm: any;
  paginateData: IPaginateData;
  Page: number;
  setPage: Dispatch<SetStateAction<number>>;
  // searchTerm: string;
  // setSearchTerm: Dispatch<SetStateAction<string>>;
  minMaxPrice: number[];

  handleSearchTermChange: (searchTerm: string) => void;
  handleCurrentFilterPriceChange: (newValue: number | number[]) => void;
  handleCategoryChange: (category: any) => void;
}

export interface IPaginateData {
  next: () => void;
  prev: () => void;
  jump: (page: number) => void;
  currentData: () => string | any[];
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
  rating: IRating;
}

interface IRating {
  count: number;
  rate: number;
}
