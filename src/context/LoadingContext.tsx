import { ReactNode, createContext, useContext, useState } from "react";

type loadingContextType = {
  loading: boolean;
};

const loadingContextDefaultValues: loadingContextType = {
  loading: false,
};

const LoadingContext = createContext<loadingContextType>(
  loadingContextDefaultValues
);

export function useLoading() {
  return useContext(LoadingContext);
}

type Props = {
  children: ReactNode;
};

const [loading, setLoading] = useState<boolean>(false);

export function LoadingProvider({ children }: Props) {
  const value = {
    loading,
  };
  return (
    <>
      <LoadingContext.Provider value={value}>
        {children}
      </LoadingContext.Provider>
    </>
  );
}
