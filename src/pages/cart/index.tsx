import { useCart } from "@/context";
import { usePagination } from "@/hooks";
import { CartEmpty, CartInfo, CartItems, HeaderCart } from "@/modules";
import { useAppSelector } from "@/redux/hooks";
import { Grid, Pagination } from "@mui/material";

const CartPage = () => {
  const { carts } = useAppSelector((state) => state.carts);

  const { currentData, currentPage, maxPage, jump } = usePagination(carts, 8);

  // Handle change pagination

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
