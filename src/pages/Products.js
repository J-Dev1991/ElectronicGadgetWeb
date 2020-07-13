import React from "react";
import Loading from "../components/Loading";
import ProductList from "../components/Products/ProductList";
import { MyProductContext } from "../context/productsContext";

export default function Products() {
  const { products, featured, loading } = React.useContext(MyProductContext);
  if (loading) {
    return <Loading />;
  } else {
    return <ProductList title="our products" products={products} />;
  }

  return <h1>hello from product page</h1>;
}
