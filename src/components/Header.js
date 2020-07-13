import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import CartLink from "../components/Cart/CartLink";
import { UserContext } from "../context/userContexts";
import LoginLink from "../components/LoginLink";

export default function Header() {
  const { user } = React.useContext(UserContext);
  return (
    <header className="header">
      <img src={Logo} alt="vintage logo" className="logo" />
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Product</Link>
            </li>
            {user.token && (
              <li>
                <Link to="/checkout">checkout</Link>
              </li>
            )}
          </div>
          <LoginLink />
          <li>
            <CartLink />
          </li>
        </ul>
      </nav>
    </header>
  );
}
