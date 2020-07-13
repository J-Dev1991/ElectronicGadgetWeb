import React, { createContext, Children } from "react";
// note we could use fetch but because our API is prepared from axios so we will use axios library
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProduct } from "../utils/helpers";
const MyProductContext = React.createContext();

//useEffect();
//let's perform side effects - data fetching, window event listener
//by default runs after every render
//cb as first param
//returns cleanup function to avoid memory leaks, so cannot be async
//second args - array of values(dependencies)

//Provider, useContext
export default function ProductProviderContext({ children }) {
  //setting up the use state variables
  const [loading, setLoading] = React.useState(false);
  const [products, setProduct] = React.useState([]);
  const [featured, setFeatured] = React.useState([]);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`).then((response) => {
      const featured = featuredProducts(flattenProduct(response.data));
      const products = flattenProduct(response.data);
      setFeatured(featured);
      setProduct(products);
      // immidiately after product mount, loading goes back to false
      setLoading(false);
    });

    //start clean function
    return () => {};
    //end clean up function
  }, []);

  return (
    <MyProductContext.Provider value={{ loading, products, featured }}>
      {children}
    </MyProductContext.Provider>
  );
}

export { MyProductContext };
