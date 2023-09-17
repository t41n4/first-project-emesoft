import { CartItem, CartLayout } from "@/components";
import { useCart } from "@/context";

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  console.log("test cart", cart);
  return (
    <CartLayout>
      <CartItem dataCart={cart} />
    </CartLayout>
  );
};
export default CartPage;
