import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {

  //building psymnt/checkout  page
  const history = useHistory();//give us the browser history
  //pulls basket items (data) from the data layer
  const [{ basket }, dispatch] = useStateValue(); //{basket} is the state

  /*Prev solu to get total
  const getBasketTotal = (basket) => {
    const total = basket.map((x) => x.price).reduce((a, b) => a + b, 0);
    return total;
  };*/

  // console.log("get basket>>", getBasketTotal(basket));
 // console.log("get whats in basket>>>>", getBasketTotal(basket));
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/**{basket.length}-> pulls the no of items from data layer */}
              Subtotal ({basket.length} items):
               <strong>{value}</strong>
              {/** prev solu <strong>{` ${value}`}</strong>*/}
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} //import from reducer.js
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
     {/**on click the button pusinh the pg into the browser; redirectlyin in some wat  
      * keeps the spannign of the button while redirectling
      * history.push("/paymet") => localhost :30000/payment instead of link to =
     */} 
      <button onClick={e => history.push('/payment')}>Proceed to Checkout
      </button> {/**paymnt pg for collecting pymnt details
       * now add this to switch case in app.js
       */}
    </div>
  );
}

export default Subtotal;
