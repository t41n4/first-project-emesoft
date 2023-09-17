// Define the type for your cart item
export interface ICartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity:number;
}
export interface IInputQuantity{
  id:number,
  value:number
}

// Define the shape of your context
export interface CartContextType {
  cart: ICartItem[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantytiCart: (id: IInputQuantity) => void;
}

export interface ICategories {
  [index: number]: string;
}

export interface ProductLayout {
  children: React.ReactNode;
}

export interface IWindowSize {
  width: number | 0;
  height: number | 0;
}

export interface Products {
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
