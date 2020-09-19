/*Body of the web page
containes : product comps */

import React from "react";
import "./Home.css";
import Product from "./Product";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


function Home() {
  return (
    //BEN
    <div className="home">
      <div className="home__container">
        <Carousel>
          <img
            className="home__img1"
            src="https://images-fe.ssl-images-amazon.com/images/G/35/digital/video/merch/2020/TV/THBY_S2_00000_GWBleedingHero_1500x600_POST_Final_en-AU_PVD5401._CB406115769_.jpg"
            alt="home banner"
          />
          <img
            className="home__img2"
            src="https://images-fe.ssl-images-amazon.com/images/G/35/kindle/journeys/MGFhZjlkNjUt/MGFhZjlkNjUt-OThiN2FjNmQt-w1500._CB404982399_.jpg"
            alt="home banner"
          />
          <img
            className="home__img3"
            src="https://images-fe.ssl-images-amazon.com/images/G/35/AU-hq/2020/img/Books/XCM_Manual_ORIGIN_1239916_1272742_AU_au_books_gw_2x_v3_3298555_1500x600_1X_en_AU._CB406245466_.jpg"
            alt="home banner"
          />
        </Carousel>
       
          <div className="home_row">
            <Product
              id="12345"
              title="CHOETECH Phone Stand, Angle Height Adjustable Desktop Phone Holder"
              price={29.99}
              image="https://images-fe.ssl-images-amazon.com/images/I/41gU3U5p8tL._AC_SY200_.jpg"
              rating={5}
            />
            <Product
              id="13456"
              title="Echo Dot (3rd Gen) - Voice control your music and smart home with Alexa - Charcoal"
              price={49.3}
              image="https://images-na.ssl-images-amazon.com/images/I/61MdyHSbxHL._AC_UL200_SR200,200_.jpg"
              rating={4}
            />
            <Product
              id="43567"
              title="At My Table: A Celebration of Home Cooking Hardcover"
              price={37.0}
              image="https://images-na.ssl-images-amazon.com/images/I/41oSKsEiBSL._SX385_BO1,204,203,200_.jpg"
              rating={4}
            />
          </div>

          <div className="home_row">
            <Product
              id="43578"
              title="Crayola Washable Markers 10pk, Ultra Clean, Thick or Thin lines, Durable Tip, Student, School, Classroom"
              price={3.0}
              image="https://images-na.ssl-images-amazon.com/images/I/91DO3gK0KsL._AC_UL320_SR320,320_.jpg"
              rating={5}
            />
            <Product
              id="10908"
              title="LEGO Star Wars Stormtrooper Helmet 75276 Building Kit, Cool Star Wars Collectible for Adults"
              price={149.0}
              image="https://images-na.ssl-images-amazon.com/images/I/715pIjqLjmL._AC_SX679_.jpg"
              rating={4}
            />
            <Product
              id="10090"
              title="Sparkling Water Maker and Fruit Infuser - Infuses Flavor While Carbonating Beverages (Matte Black)"
              price={179.0}
              image="https://images-na.ssl-images-amazon.com/images/I/81X4A1ypV0L._AC_UL200_SR200,200_.jpg"
              rating={5}
            />
          </div>

          <div className="home_row">
            <Product
              id="20897"
              title="Kambrook Air Chef Frying Oven, Black, KAF200BLK"
              price={119.0}
              image="https://images-na.ssl-images-amazon.com/images/I/715Z6owctuL._AC_SX522_.jpg"
              rating={4}
            />
            <Product
              id="30987"
              title="Codenames"
              price={21.0}
              image="https://images-na.ssl-images-amazon.com/images/I/71ZHkM7fHwL._AC_UL200_SR200,200_.jpg"
              rating={5}
            />
          </div>
      
      </div>
    </div>
  );
}

export default Home;
