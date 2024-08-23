import React from "react";
import checkImg from "../images/checkoutAd.jpg";
import { useAuth } from "../Context/GlobalState";
import CheckOutProduct from "./CheckOutProduct";
import Subtotal from "./Subtotal";
import EmptyCart from "./EmptyCart";
const CheckOut = () => {
  const clearCart = () => {
    dispatch({
      type: "EMTY_CART",
    });
  };
  const { dispatch, basket } = useAuth();

  return (
    <div className="pt-[70px] ">
      <div>
        <div>
          <img className="" src={checkImg} alt="Image-CheckOut" />
        </div>
        <div className="container mx-auto">
          <div className="  my-3   border-b-2 border-gray-300 w-fit py-[20px] gap-4 text-xl md:text-5xl font-semibold text-gray-800">
            <h2 className="text-slate-800">Cart Shoping:</h2>
            {basket.length ? (
              <button
                onClick={clearCart}
                className=" active:scale-[.9] mt-4  cursor-pointer w-fit my-auto rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
              >
                Clear Cart ..?
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="bg-white ">
            {basket.length ? (
              basket.map((item, index) => {
                return (
                  <CheckOutProduct
                    key={index}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                  />
                );
              })
            ) : (
              <EmptyCart />
            )}
          </div>
        </div>
      </div>
      <div>
        <Subtotal />
      </div>
    </div>
  );
};

export default CheckOut;
