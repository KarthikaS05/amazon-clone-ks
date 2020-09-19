import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";


const promise = loadStripe(
  "pk_test_51HQ8irFDpEzIimoDnOaMQoaYwInm8aEK4ObNV0ZU4v8IVr9mK1GD2wKYQBq1o0TJ887gFQZuEhwFLxqBu8w9B74600dvUp89Yw"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once when the app component loads...
    //listner - whn app loads, we attach the listner
    //ie, when authentication changes give us the auth user
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>", authUser);
      if (authUser) {
        //the user just logged in/the user was logged in
        //ie if page gets refreshed ; it allows to relog in
        //for this we have to store the user in reducer.js
        //if user is logged in , then dispatch it to data layer
        dispatch({
          type: "SET_USER", //add this case in reducer
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    //BEM convention
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            {/**payememnt pg */}
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
