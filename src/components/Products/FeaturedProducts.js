import React from "react";
import ProductList from "./ProductList";
import Loading from "../Loading";
import { MyProductContext } from "../../context/productsContext";

export default function FeaturedProducts() {
  const { loading, featured } = React.useContext(MyProductContext);

  if (loading) {
    return <Loading />;
  } else {
    return <ProductList title="featured products" products={featured} />;
  }
  // return <h1>hello from featured products</h1>;
}
