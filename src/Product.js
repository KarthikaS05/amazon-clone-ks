/**Product component -
 * this goes inside home component within home_container
 * contains :
 * prod info
 * price
 * rating
 * prod img
 * add to basket button
 */

import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { motion } from "framer-motion";


function Product({ id, title, image, price, rating }) {
  
  const [{basket}, dispatch] = useStateValue();

  //console.log("this is the basket>>>>", basket);

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    
    });
    
      
  };
 
 
  return (
    <div className="product">
      <div className="prod__info">
        <p>{title} </p>
        <p className="prod_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="prod__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span>&#11088;</span>
            ))}
        </div>
      </div>

      <motion.img src={image} alt="product image" whileHover={{ scale: 1.3 }} />

      <motion.button
        onClick={addToBasket}
        whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgb(225, 225, 225)" }}
      >
        Add to Basket
      </motion.button>
    </div>
  );
}

export default Product;
