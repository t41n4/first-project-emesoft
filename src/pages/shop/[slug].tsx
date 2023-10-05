import { IProduct } from "@/common";
import { useCartContext } from "@/context";
import { QuantityInput } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/reducer/CartSlice";
import { fetchProductsByID } from "@/redux/reducer/ProducSlice";
import { validateSlug } from "@/utils";
import { Button, Rating, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);
  const [product, setProduct] = useState<IProduct>();

  const { carts } = useAppSelector((state) => state.carts);

  // use carts from redux

  const { quantity } = useCartContext();
  // validate slug ??
  const { singleProduct, error } = useAppSelector(
    (state) => state.singleProduct
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("carts: ", carts);
  }, [carts]);

  useEffect(() => {
    if (!slug) return;
    if (!validateSlug(slug)) router.push("/404");

    dispatch(fetchProductsByID(Number(slug)));

    if (Object.keys(singleProduct as object).length !== 0) {
      setProduct(singleProduct);
    } else if (error) {
      console.log(error);
      router.push("/404");
    }
  }, [dispatch, error, router, singleProduct, slug]);

  // useEffect(() => {
  //   console.log("quantity: ", quantity);
  // }, [quantity]);

  useEffect(() => {
    setSlug(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className="product-container flex flex-row w-full h-full justify-center items-center p-5">
      <div className="w-4/5 p-10 grid md:grid-cols-1 md:grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4">
        <div className="product product-image flex justify-center items-center border border-black bg-white rounded-lg">
          {product ? (
            <div className="Image p-5">
              <Image
                className="object-cover h-full w-full rounded-lg"
                src={product.image}
                alt="EMESOFT-Logo-Full-Horizontal"
                priority={true}
                sizes="100% 100%"
                width={500}
                height={500}
              />
            </div>
          ) : (
            <Skeleton
              variant="rectangular"
              className="flex w-2/3 h-2/3 rounded-lg"
            />
          )}
        </div>

        <div className="product product-detail flex flex-col w-full h-auto justify-between items-center p-3 rounded-lg border border-black">
          <div className="infomation flex gap-3 flex-col p-5">
            {product ? (
              <>
                <Typography className="product-detail text-2xl uppercase font-sans-semibold">
                  {product.category}
                </Typography>
                <Typography className="product-detail title text-4xl">
                  {product.title}
                </Typography>
                <Typography className="product-detail rating text-4xl">
                  <Rating
                    name="read-only"
                    readOnly
                    value={product.rating.rate}
                  />
                </Typography>
                <Typography className="product-detail price text-4xl">
                  <span className="price-old">{product.price}$</span>
                </Typography>
                <Typography className="product-detail description text-base">
                  {product.description}
                </Typography>
              </>
            ) : (
              <>
                <Skeleton height={32} width={120} />
                <Skeleton height={48} width={240} />
                <Skeleton height={48} width={160} />
                <Skeleton height={48} width={120} />
                <Skeleton height={96} width="100%" />
              </>
            )}
          </div>
          <div className="flex w-full ">
            <div className="flex flex-row button-action w-full p-3 justify-between">
              <div className="w-1/3 mx-3 quantity-input ">
                {product ? (
                  <QuantityInput value={1} id={undefined} />
                ) : (
                  <Skeleton height={32} width={64} />
                )}
              </div>
              <Button
                className="w-1/2 bg-blue-500 hover:bg-blue-400"
                variant="contained"
                onClick={() => {
                  dispatch(
                    addToCart({
                      id: product?.id || 0, // provide a default value of 0 if id is undefined
                      image: product?.image || "",
                      name: product?.title || "",
                      price: product?.price || 0, // provide a default value of 0 if price is undefined
                      quantity: quantity ?? 1, // provide a default value of 1 if quantity is undefined or null
                    })
                  );
                }}
              >
                {product ? "Add to cart" : <Skeleton height={40} width={160} />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
