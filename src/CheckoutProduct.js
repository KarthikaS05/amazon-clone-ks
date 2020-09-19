import React from 'react';
import './CheckoutProduct.css';               
import { useStateValue } from './StateProvider';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { motion } from 'framer-motion';


function CheckoutProduct({ id,image,title,price,rating,hideButton}) {
   
    const [{ basket }, dispatch] = useStateValue();     

    const removeFromBasket = () => {
        //remove item from basket
        //dispatch - type of action
        //then add this type in reducer SWITCH
        //id , remove item with tht id
        dispatch({
          type: "REMOVE_FROM_BASKET",
            id: id,
            
        })
    }

    return (
      <div className="checkoutProduct">
        <motion.img
          className="checkoutProduct__image"
          src={image}
          alt="product image"
          whileHover={{ scale: 1.3 }}
        />

        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <span>&#11088;</span>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>
              <RemoveShoppingCartIcon />
            </button>
          )}
        </div>
      </div>
    );
}

export default CheckoutProduct;