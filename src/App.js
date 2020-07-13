import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/About";
import CartPage from "./pages/CartPage";
import Error from "./pages/Error";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

//components
import Header from "./components/Header";
import Alert from './components/Alert';
export default function App() {
  return (
    <Router>
      <Header />
      <Alert/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
  
        <Route path="/products">
          <Products />
        </Route>
        <Route
          path="/product/:id"
          children={<ProductDetails></ProductDetails>}
        ></Route>
        <PrivateRoute path="/checkout" name="ajibola" msg="hi"> {/* name and msg are ...rest*/}
          <Checkout /> {/* children*/}
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}
