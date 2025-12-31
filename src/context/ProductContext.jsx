import React from "react"; 
import { createContext, useState } from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <ProductContext.Provider
      value={{ products, setProducts, cart, setCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};
