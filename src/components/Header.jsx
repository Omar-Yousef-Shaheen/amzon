import { Link } from "react-router-dom";
import Logo from "../images/header-logo.png";
import searchIcon from "../images/searchIcon.png";
import { AlignJustify, ShoppingCart } from "lucide-react";
import { useAuth } from "../Context/GlobalState";
import { auth } from "../firebase";
import Modal from "./Modal";

export const handleAucthent = () => {
  auth.signOut();
};
const Header = () => {
  const { user, basket, SetShowModal, showModal } = useAuth();

  return (
    <>
      <div className="">
        <div className="fixed w-full z-50 h-[70px] flex gap-2  items-center justify-between bg-slate-800 px-[10px] md:px-[18px]  ">
          <Link to="/">
            <img
              className="w-32 mx-2 md:mx-2 mt-4 object-contain "
              src={Logo}
              alt="Logo-Image"
            />
          </Link>
          <div className="flex flex-1 items-center  rounded-xl relative overflow-hidden">
            <input
              className="h-[12px] p-[18px] border-none w-full rounded-md focus:p-[19px]  "
              type="text"
              placeholder="Search..."
            />
            <img
              className="w-9 absolute right-0 bg-slate-300 p-2 cursor-pointer hover:bg-slate-500 transition-all duration-300  "
              src={searchIcon}
              alt="searchIcon"
            />
          </div>
          <button
            onClick={() => {
              SetShowModal(true);
            }}
          >
            <AlignJustify color="white" size={30} className="ml-3 md:hidden" />
          </button>
          <div className="md:flex justify-evenly gap-2 hidden ">
            <Link
              to={!user && "/login"}
              className="border border-gray-500 rounded-md shadow-sm shadow-slate-50 hover:shadow-none transition-all duration-100"
            >
              <div
                className="header-option flex flex-col mx-3 text-white items-center hover:text-gray-400 transition-all duration-200 "
                onClick={handleAucthent}
              >
                <div className="header-optionLineOne   font-semibold text-[15px]">
                  Hello,{" "}
                  <span className="capitalize font-bold text-[17px]">
                    {user?.email.split("@gmail.com") ?? "Guset"}
                  </span>
                </div>
                <div className="header-optionLineTwo font-bold text-[18px]">
                  {user ? "Sign Out" : "Sign in"}
                </div>
              </div>
            </Link>
            <Link
              to="/orders"
              className="border border-gray-500 rounded-md shadow-sm shadow-slate-50 hover:shadow-none transition-all duration-100"
            >
              <div className="header-option flex flex-col mx-3 text-white items-center hover:text-gray-400 transition-all duration-200 ">
                <div className="header-optionLineOne  font-semibold text-[15px]">
                  Returns
                </div>
                <div className="header-optionLineTwo font-bold text-[18px]">
                  & Order
                </div>
              </div>
            </Link>
            <div className="header-option flex flex-col mx-3 text-white items-center">
              <div className="header-optionLineOne font-semibold text-[15px] ">
                Your
              </div>
              <div className="header-optionLineTwo font-bold text-[18px] ">
                Prime
              </div>
            </div>
            <Link to="/checkout">
              <div className="header-optionBasket flex flex-col items-center  text-white hover:text-gray-400 transition-all duration-200 ">
                <span className="header-optionLineTwo header-basketCount mx-[10px] font-bold">
                  {basket.length ?? 0}
                </span>
                <ShoppingCart color="white" size={26} />
              </div>
            </Link>
          </div>
        </div>
        {showModal ?(
          <div className="fixed z-50 bg-bgModal h-lvh w-full backdrop-blur-sm">
            <Modal />
          </div>
         ) : ''}
      </div>
    </>
  );
};

export default Header;
