"use client";

import { Footer, Header } from "@/components";
import { CartProvider } from "@/context/CartContext";
import { FloatingCartButton } from "@/modules";
import "@/styles/globals.css";
import { Backdrop, CircularProgress } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store/store";
import { ProductProvider } from "../context/ProductContext";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(false);

    const handleComplete = (url: string) =>
      url !== router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    loading && (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="pt-[3.5rem] relative ">
      <Provider store={store}>
        <ProductProvider>
          <CartProvider>
            <FloatingCartButton />
            <Loading />
            <Header />
            <Component {...pageProps} />
            <Footer />
          </CartProvider>
        </ProductProvider>
      </Provider>
    </main>
  );
}
