import { CartItem, CartLayout } from "@/components";
import { useCart } from "@/context";

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  return (
    <CartLayout>
      <CartItem dataCart={cart} />
    </CartLayout>
  );
};
export default CartPage;
