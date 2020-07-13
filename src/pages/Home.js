import React from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import FeaturedProd from "../components/Products/FeaturedProducts";
export default function Home() {
  return (
    <>
      <Hero>
        <Link to="/products" className="btn btn-primary btn-hero">
          check our products
        </Link>
      </Hero>
      <FeaturedProd />
    </>
  );
}
