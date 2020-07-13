import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ProductProviderContext from "./context/productsContext";
import { CartProvider } from "./context/CartContxt";
import { UserProvider } from "./context/userContexts";

ReactDOM.render(
  <UserProvider><ProductProviderContext>
  <CartProvider>
    <App />
  </CartProvider>
</ProductProviderContext></UserProvider>
  ,
  document.getElementById("root")
);
