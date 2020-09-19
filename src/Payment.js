import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import Checkout from "./Checkout";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  //give us the browser history
  const history = useHistory();

  //pull data from data layer
  const [{ basket, user }, dispatch] = useStateValue();

  //powerfull hooks
  const stripe = useStripe();
  const elements = useElements();

  // while card pymnt processing
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  //this is how we create variables in react
  //2 peices of state -one for disable state and one for error
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  //for client payments we need to ask stripe for clientSecret
  const [clientSecret, setClientSecret] = useState(true);

  //will be called whn ever any chnages happen to the input param
  useEffect(() => {
    /**
     * Really imp code snippet
     * wht happens here is whnever the basket changes it will make this req
     * it will update the spl clientSceret which allow us to charge the customer
     * to make correct payements
     */
    //generate the special stripe secrete which allows us to charge a customer
    //this is how we write/run async func within useEffect
    const getClientSecret = async () => {
      const response = await axios({
        //creating response obj
        //axios is a way of making a req and interact with API
        //create  axios.js& install axios
        method: 'post',
        // Stripe expects the total in a currencies subunits; ie if u r passing in dollars then u have to convert it to cents
         url: `/payments/create?total=${getBasketTotal(basket) * 100}` //*100 to pass it in subunits of dollars ie in cents; if in AUD u have to find its conversion
      });

      setClientSecret(response.data.clientSecret) //need to set the clientScrete from response obj from stripe into back end
      }
      
    getClientSecret(); //this is how u run an async function in useEffect
  }, [basket])
    
    console.log('THE SECRET IS>>', clientSecret)

  //takes an event and do stripe stuff
  const handleSubmit = async (event) => {
    //do all the stripe stuff
    //after adding the card details
    event.preventDefault (); //stop from refeshing
    setProcessing(true); //to disable the button whn paymnt proccessing starts

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement), //with *clientSecret stripe knows how much we charge the customer
        }, //find the card elem above, then do the below, deconstruct the payment conf from stripe
      }).then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation in Stripe terms
          db.collection('users').doc(user?.id)
              .collection('orders').doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
                })
        //if all goes well then set the following
        setSucceeded(true);
        setError(null)
          setProcessing(false)
          
          //dispatch the action to react context api to empty the basket after processing the paymnt
          dispatch({
              type: 'EMPTY_BASKET' //now add this case into reducer.js
          })

        //on successful payment processing redirect to orders pg and not paymnt processing pg
          history.replace('/orders') //we dont want to come bck to pymnt pg
          //history.replace swaps the page
      })
  }

  //to handle the change done while card details are updated
  const handleChange = event => {
    //takes event;
    //2 peices of state -one for disable state and one for error
    //Listen for any changes in the CardElement
    //& display any error as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/**Payment section - delivery add
         * Payment session - review items
         * payememt session -payememnt method
         */}
        {/**having 2 divs bcz one for left & one for right */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>ABC lane Reservoir</p>
            <p>Mel, VIC</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and delivery</h3>
          </div>
          <div className="payment__items">
            {" "}
            {/**here for every itmes in the basket display the props */}
            {/**prod items in the basket map
             * similar to how its in checkout
             * also remove checkout works- reusing the comp
             */}
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payement Method</h3>
          </div>
          <div className="payment__details">
            {/**Stripe magic here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)} //import from reducer.js
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                 <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                
              </div>

              {/**for Error eg anyhing wrong with the card then this will show up */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
