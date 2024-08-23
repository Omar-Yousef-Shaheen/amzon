import { ShoppingCart, X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { handleAucthent } from "./Header";
import { useAuth } from "../Context/GlobalState";

const Modal = () => {
  const { user, basket, SetShowModal } = useAuth();

  return (
    <div className="flex-col bg-modal rounded-lg py-4 px-6 min-w-[300px]  w-[50%] m-auto mt-[30%] modalAnimate">
      <div
        onClick={() => {
          SetShowModal(false);
        }}
        className="w-fit ml-auto mb-3  hover:scale-125 transition-all duration-200 active:scale-[.9] "
      >
        <X color="black" />
      </div>
      <Link
        onClick={() => {
          SetShowModal(false);
        }}
        to={!user && "/login"}
      >
        <div
          className="header-option  flex   justify-between text-black items-center hover:text-gray-400 transition duration-200 cursor-pointer pb-2 border-b-2 border-gray-600"
          onClick={handleAucthent}
        >
          <div className="header-optionLineOne   font-semibold text-[15px]">
            <span className="capitalize font-bold text-[17px] text-blue-900 ">
              {user?.email.split("@gmail.com") ?? "Guset"}
            </span>
          </div>
          <div className="header-optionLineTwo font-bold text-[18px]">
            {user ? "Sign Out" : "Sign in"}
          </div>
        </div>
      </Link>

      <Link
        onClick={() => {
          SetShowModal(false);
        }}
        to="/orders"
      >
        <div className="header-option flex  justify-between text-black items-center hover:text-gray-400 transition duration-200 cursor-pointer py-2 border-b-2 border-gray-600 ">
          <div className="header-optionLineOne  font-bold text-[15px] text-blue-900">
            Returns
          </div>
          <div className="header-optionLineTwo font-bold text-[18px]">
            & Order
          </div>
        </div>
      </Link>

      <Link
        onClick={() => {
          SetShowModal(false);
        }}
        to="/checkout"
      >
        <div className="header-optionBasket flex justify-between items-center  text-black hover:text-gray-400 transition-all duration-200 pt-5 ">
          <ShoppingCart color="blue" size={26} />
          <span className="header-optionLineTwo header-basketCount mx-[10px] font-bold">
            {basket.length ?? 0}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Modal;
