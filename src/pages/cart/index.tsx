import { CartItems, CartInfo, CartEmpty, HeaderCart } from "@/components";
import { useCart } from "@/context";
import { useState } from "react";
import { Grid, Box, Pagination, Skeleton } from "@mui/material";
import { usePagination } from "@/hooks";

const CartPage = () => {
  const { carts, addToCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentData, currentPage, maxPage, jump } = usePagination(carts, 8);

  // Handle change pagination
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    jump(value);
    window.scrollTo(0, 0);
  };

  setTimeout(() => {
    setIsLoading(true);
  }, 1000);
  return (
    <div className="p-5 flex flex-row-reverse">
      <div className="cartInfo">
        <div className=" sticky  top-[4.75rem] left-[3.5rem]">
          <CartInfo />
        </div>
      </div>
      <div className="cartItems  w-full">
        <div className="header ">
          <HeaderCart />
        </div>
        {currentData().length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className="content px-4">
              <Grid
                container
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 "
              >
                <CartItems dataCarts={currentData()} />
              </Grid>
            </div>
            <div className="Pagination flex justify-center">
              <Pagination
                count={maxPage}
                page={currentPage}
                variant="outlined"
                onChange={(event, value) => {
                  jump(value);
                  window.scroll(0, 0);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default CartPage;
