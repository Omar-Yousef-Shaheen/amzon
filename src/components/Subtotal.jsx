import React from "react";
import { getTotalPrice, useAuth } from "../Context/GlobalState";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";




const Subtotal = () => {
  const navigate = useNavigate();
  const { basket } = useAuth();

  return (
 <div className="flex justify-center mb-10  ">
     <div className="p-[10px] w-[400px] mx-auto border-2 rounded-md border-gray-400 bg-white mt-8 flex flex-col gap-2  ">
      <div className="flex justify-between items-center font-semibold ">
        <NumericFormat
          renderText={(value) => (
            <>
              <h3 className="text-slate-800">
                Total Price :<span className="text-xl text-black">{value}</span>
              </h3>
            </>
          )}
          value={getTotalPrice(basket)}
          displayType="text"
          prefix="$"
          thousandSeparator={true}
        />
        <h3 className="text-slate-800">
          Items : <span className="text-xl text-black">{basket.length}</span>
        </h3>
      </div>
      <div className="flex items-center gap-2 font-semibold">
        <input type="checkbox" className="cursor-pointer" />
        <p>This Order Contains a Gift</p>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            navigate("/payment");
          }}
          className="active:scale-[.9] mx-auto mt-3 cursor-pointer w-fit  rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
        >
          Proceed to CheckOut
        </button>
      </div>
    </div>
 </div>
  );
};

export default Subtotal;
