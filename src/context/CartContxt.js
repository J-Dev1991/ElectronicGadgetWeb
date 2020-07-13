// cart context
import React from "react";
import LocalCart from "../utils/localCart";

function getItemFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, setCart] = React.useState(getItemFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    //local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    //// the total amount of item in the cart
    const newCartItem = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0); //starts at zero... total:
    setCartItems(newCartItem);

    //cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed());
    setTotal(newTotal);
  }, [cart]); //run when the cart is updated

  //remove item
  const removeItem = (id) => {
    // setCart([...cart].filter((item) => item.id !== id));
    const newCart = [...cart].filter((item) => item.id !== id);
    setCart(newCart);
  };

  //increase amount
  const increaseAmount = (id) => {
    let newCart = [...cart].map((item) => {
      return item.id === id
        ? { ...item, amount: item.amount + 1 }
        : { ...item };
    });
    setCart(newCart);
  };

  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
    } else {
      let newCart = [...cart].map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount - 1 }
          : { ...item };
      });
      setCart(newCart);
    }
  };
  const addToCart = (product) => {
    const {
      id,
      image,
      price,
      title,
    } = product;
    let itemToAdd = [...cart].find((item) => item.id === id);
    if (itemToAdd) {
      increaseAmount(id);
      return;
    } else {
      let newItem = { id, image, title, price, amount: 1 };
      let newItems = [...cart, newItem];
      setCart(newItems);
    }
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        removeItem,
        cartItems,
        increaseAmount,
        decreaseAmount,
        clearCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
