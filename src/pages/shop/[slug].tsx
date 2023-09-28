import { IProduct } from "@/common";
import { QuantityInput } from "@/modules";
import { useCart } from "@/context";
import { useFetchProductsByID } from "@/hooks";
import { validateSlug } from "@/utils";
import { Button, Rating, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [slug, setSlug] = useState(router.query.slug);
  const [product, setProduct] = useState<IProduct>();

  const { addToCart, quantity } = useCart();
  // validate slug ??

  useEffect(() => {
    if (!slug) return;
    if (!validateSlug(slug)) {
      router.push("/404");
      return;
    }

    try {
      useFetchProductsByID(Number(slug)).then((res) => {
        // console.log(res);
        setProduct(res);
      });
    } catch (error) {
      console.log(error);
      router.push("/404");
    }
  }, [slug]);

  useEffect(() => {
    console.log("quantity: ", quantity);
  }, [quantity]);

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
                  <>
                    <QuantityInput value={1} id={undefined} />
                  </>
                ) : (
                  <Skeleton height={32} width={64} />
                )}
              </div>
              <Button
                className="w-1/2 bg-blue-500 hover:bg-blue-400"
                variant="contained"
                onClick={() => {
                  addToCart({
                    id: product?.id,
                    image: product?.image,
                    name: product?.title,
                    price: product?.price,
                    quantity: quantity,
                  });
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
