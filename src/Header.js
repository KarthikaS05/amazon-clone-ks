/**Header component code here
 * codes for inc amazon logo
 * search bar
 * Signed in user name
 * return & orders 
 * basket with added in item numbers
 */
// rfc - gives the def for Header file with proper funct comp
import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

 
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();   
  
  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };


     return (
       <div className="header">
         <Link to="/">
           <img
             className="header__logo"
             src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
             alt="amazon logo"
           />
         </Link>

         <div className="header__search">
           <input className="header__searchInput" type="text" />
           <SearchIcon className="header__searchIcon" />
         </div>

         <div className="header__nav">
           <Link to={!user && "/login"}>
             <div onClick={handleAuthenticaton} className="header__navOptions">
               <span className="header__navOpL1">
                 Hello {!user ? "Guest" : user.email},
               </span>
               <span className="header__navOpL2">
                 {user ? "Sign Out" : "Sign In"}
               </span>
             </div>
           </Link>
           
           <Link to="/orders">
             <div className="header__navOptions">
               <span className="header__navOpL1">Returns</span>
               <span className="header__navOpL2">& Orders</span>
             </div>
           </Link>
           <div className="header__navOptions">
             <span className="header__navOpL1">Your</span>
             <span className="header__navOpL2">Prime</span>
           </div>

           <Link to="/checkout">
             <div className="header__navOptionBasket">
               <ShoppingCartIcon />
               <span
                 className="header__navOpL2 
                     header_basketCount"
               >
                 {" "}
                 {basket?.length}
               </span>
             </div>
           </Link>
         </div>
       </div>
     );
 }

export default Header;