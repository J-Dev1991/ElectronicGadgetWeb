// user context
import React from "react";

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
}

function UserProvider({ children }) {
  // const [user, setUser] = React.useState({username:null, token:null});
  const [user, setUser] = React.useState(getUserFromLocalStorage());

  const userLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const userLogout = () => {
    setUser({ user: null, token: null });
    localStorage.removeItem("user");
  };

  // alert context below
  const [alert, setAlert] = React.useState({
    show: false,
    msg: "",
    type: "success",
  });

  const showAlert = ({ type = "success", msg }) => {
    setAlert({ msg, type, show: true });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };
  
  return (
    <UserContext.Provider value={{ user, userLogin, userLogout , alert,showAlert,hideAlert}}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
