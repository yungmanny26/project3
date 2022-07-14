import React from "react";
import { Link } from "react-router-dom";

const FooterBanner = () => {
  
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>10% OFF</p>
          <h3>SUMMER SALE</h3>
          <p>JULY 11 - AUG 15</p>
        </div>
        <div className="right">
          <p>BEST SELLER </p>
          <h3>NIKE AIR JORDAN </h3>
          <p> </p>
          <Link to="/login">
            <button>REGISTER/LOG IN TO BUY</button>
          </Link>
        </div>
        <img
          src={"https://res.cloudinary.com/dygxpwdnk/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1656167029/jordan-melo-m12-555088_062_a_prem-e1575044740922_m0sver.jpg"}
          alt=""
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default FooterBanner;