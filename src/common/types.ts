// Define the type for your cart item
export interface CartItem {
  id: number;
  name: string;
  price: number;
}

// Define the shape of your context
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
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
