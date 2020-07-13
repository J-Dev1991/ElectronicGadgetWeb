import React from "react";

//strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";
//handle user

import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContexts";

export default function Login() {
  const history = useHistory();
  // set up user context

  const { userLogin, showAlert,alert } = React.useContext(UserContext);

  //state values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("default");
  const [isMember, setIsMember] = React.useState(true);
  

  let isEmpty = !email || !password || !username || alert.show; 

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    //alert
    showAlert({msg:"processing your data. please wait..."})

    e.preventDefault();
    let response;

    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }

    //alert navigation of either success login or failed
    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data; //destructuring
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `login was successful : ${username} keep shoppining :)` });
      history.push("/products");
    } else {
      // show alert  
      console.log("the response was not successfull");    
        showAlert({msg:"there was an error. please try again", type:"danger"})
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* end of single input */}

        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* end of single input */}

        {/* single text */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="email">username</label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {/* end of single text */}

        {/* empty form text */}
        {!isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}

        {/* submit btn */}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

        {/* register link */}
        <p className="register-link">
          {!isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
