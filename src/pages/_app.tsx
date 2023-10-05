"use client";

import { Footer, Header } from "@/components";
import { CartProvider } from "@/context/CartContext";
import { FloatingCartButton } from "@/modules";
import store from "@/redux";
import "@/styles/globals.css";
import { Backdrop, CircularProgress } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ProductProvider } from "../context/ProductContext";
import { UserProvider } from "@/context/UserContext";

interface LoadingProps {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loading = (props: LoadingProps) => {
  const { loading, setLoading } = props;
  const router = useRouter();
  useEffect(() => {
    const handleStart = (url: string) => setLoading(true);

    const handleComplete = (url: string) => setLoading(false);

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
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading]);

  return (
    <main className="mt-[15vh] ">
      <Provider store={store}>
        <ProductProvider>
          <CartProvider>
            <UserProvider>
              <FloatingCartButton />
              <Loading loading={loading} setLoading={setLoading} />
              <Header />
              <Component {...pageProps} />
              <Footer />
            </UserProvider>
          </CartProvider>
        </ProductProvider>
      </Provider>
    </main>
  );
}
