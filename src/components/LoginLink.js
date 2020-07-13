import React from "react";
import {Link } from 'react-router-dom';
import {UserContext} from '../context/userContexts'
import {CartContext} from '../context/CartContxt'

export default function LoginLink() {
   const {user, userLogout} = React.useContext(UserContext);
   const {clearCart} = React.useContext(CartContext);

   if(user.token) {
     return <button className="login-btn" onClick={() =>{
       userLogout();
       clearCart();  
     }}>
       logout
     </button>
     
   }
  return <Link to="/login">login</Link>
}
