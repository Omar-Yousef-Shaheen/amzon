import React from "react";
import LogoEmty from "../images/empty-cart.png";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={LogoEmty} alt="Logo-EmtyCart" />
    </div>
  );
};

export default EmptyCart;
