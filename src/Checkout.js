import React from 'react';               
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from './StateProvider';


function Checkout() {
  //this is how we pull item  from basket using useStateValue()
  //no need for dispatch here
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://m.media-amazon.com/images/S/abs-image-upload-na/f/AmazonStores/A39IBJ37TRP1C6/da053b7ce9d0abfd3109cf2d1470c0fd.w1500.h300._CR0%2C0%2C1500%2C300_SX1500_.jpg"
          alt="checkout ad"
        />

        <div>
          <h3>Hello {!user ? "Guest" : user.email} ,</h3>
          <h2 className="checkout__title">
            <ShoppingCartIcon /> Your Cart ({!basket.length ? 'is empty' : basket.length}) 
          </h2>
          {/**CheckoutProduct -render out actual basket prod
           * Here for every item in the basket map we render the CheckoutProduct comp
          ie , when we add an item  it maps correctly in checkout product */}
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

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;