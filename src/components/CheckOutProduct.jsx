import { Star } from "lucide-react";
import React from "react";
import { useAuth } from "../Context/GlobalState";

const CheckOutProduct = ({ image, id, price, title, rating }) => {
  const { dispatch } = useAuth();
  const removeProduct = () => {
    dispatch({
      type: "REMOVE_ITEM",
      id : id
    });
  };
  return (
    <div className="mt-[36px] container mx-auto  border-b-2 border-b-gray-300 p-[30px] flex gap-10">
      <div>
        <img className="min-w-[250px] h-[200px] " src={image} alt="Image-Product" />
      </div>
      <div className="flex flex-col gap-4">
        <p className=" font-semibold ">{title}</p>
        <h3 className="font-bold text-lg">${price}</h3>
        <span className="flex">
          {" "}
          {Array(rating)
            .fill()
            .map((_, index) => (
              <Star key={index} color="yellow" />
            ))}
        </span>

        <button
          onClick={removeProduct}
          className="active:scale-[.9] cursor-pointer w-fit my-auto rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckOutProduct;
