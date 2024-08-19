import { Star } from "lucide-react";
import React from "react";
import { useAuth } from "../Context/GlobalState";

const Product = ({ id, image, price, rating, title }) => {
  const { dispatch } = useAuth();
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
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
    <div className="rounded-md bg-white p-4 my-4 cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-200 ">
      <p className="line-clamp-2  font-semibold ">{title}</p>
      <div className="flex justify-between items-center my-3">
        <h3 className="font-bold text-lg">
          $ <span className="text-2xl ">{price}</span>
        </h3>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, index) => (
              <Star key={index} color="yellow" />
            ))}
        </div>
      </div>
      <div className="flex flex-col   items-center gap-8">
        <img
          className="max-w-[30%] h-40 cursor-pointer hover:scale-[1.1] transition-all duration-300"
          src={image}
          alt="Photo-Image"
        />
        <button
          onClick={addToCart}
          className="active:scale-[.9] cursor-pointer  rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
