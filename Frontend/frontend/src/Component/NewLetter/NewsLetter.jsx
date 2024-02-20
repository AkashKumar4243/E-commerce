import React from "react";
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to Our NewsLetter And Get Updated</p>
      <div>
        <input type="Email" placeholder="Enter Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
    
  );
};

export default NewsLetter;
