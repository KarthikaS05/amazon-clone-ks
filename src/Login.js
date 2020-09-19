import React from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";

function Login() {
  const history = useHistory(); //to push to home pg after user creation
  //above allows to programatically change the url
  //to keep track od entered value
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    //fancy firebase sign in
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    //fancy firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //it successfulyy created a new user with
        //entered email & pw
        console.log(auth);
        if (auth) {
          history.push("/"); //redirect to def pg -homepage
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img
        className="login__bg"
        src="https://images-fe.ssl-images-amazon.com/images/G/35/x-site/newtoamazon/nta_header_desktop_v2_1500x300.jpg"
        alt="login background image"
      />
      <div className="login__pgBox">
        {/*<Link to='/'>
          <img
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="amazon logo"
  
        </Link>/>*/}
        <div className="login__container">
          <Link to='/'>
            <img
              className="login__logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
              alt="amazon logo"
            />
          </Link>
          {""}
          <h1>Sign-in</h1>

          <form>
            <h5>E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            {/**this connects the input to email state */}
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              onClick={signIn}
              className="login__signInButton"
            >
              {" "}
              Sign In
            </button>
          </form>
          <p>
            By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
            Sale. Please see our Privacy Notice, our Cookies Notice and our
            Interest-Based Ads Notice.
          </p>

          <button onClick={register} className="login__registerButton">
            Create your Amazon Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
