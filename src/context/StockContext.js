import React, { createContext } from "react";
import { useProducts } from "../hooks/useProducts";
import { useSales } from "../hooks/useSales";

export const StockContext = createContext();

export function StockProvider({ children }) {
  const productsState = useProducts();
  const salesState = useSales();

  return (
    <StockContext.Provider value={{ ...productsState, sales: salesState }}>
      {children}
    </StockContext.Provider>
  );
}
