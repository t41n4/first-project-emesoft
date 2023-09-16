import { Footer, Header } from "@/components";
import "@/styles/globals.css";
import { Backdrop, CircularProgress } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

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
    <div className="pt-[3.5rem]">
      <Loading />
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </div>
  );
}