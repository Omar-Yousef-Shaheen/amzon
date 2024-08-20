import React, { useEffect, useState } from "react";
import { getTotalPrice, useAuth } from "../Context/GlobalState";
import { useNavigate } from "react-router-dom";
import CheckOutProduct from "./CheckOutProduct";
import { NumericFormat } from "react-number-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { axiosInstance } from "./axios";
import { doc, setDoc } from "firebase/firestore";
import { dataBase } from "../firebase";

const Payment = () => {
  const options = {
    style: {
      base: {
        color: "#32325d",
        fontSize: "20px",

        "::placeholder": {
          color: "#aab7c4",
        },
      },
    },
    hidePostalCode: true,
  };
  const { basket, user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axiosInstance({
        method: "post",
        url: `/payments/create?total=${getTotalPrice(basket) * 100} `,
      });
      setClientSecret(response.data.clientSecret);
      return response;
    };
    getClientSecret();
  }, [basket]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(
          dataBase,
          "users",
          user?.uid,
          "orders",
          paymentIntent.id
        );
        setDoc(ref, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate("/orders", { replace: true });
        dispatch({
          type: "EMTY_CART",
        });
      });
  };
  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(error ? error.message : "");
  };
  return (
    <>
      {/* <div className="pt-[70px]  flex flex-col items-center   ">
        <div className="bg-gray-300 p-[26px] rounded-lg ">
          <h2 className="text-slate-800 text-3xl font-bold">
            Check Out :{" "}
            <Link className="font-semibold text-4xl text-black" to="/checkout">
              {basket.length} item
            </Link>
          </h2>
        </div>
        <div className="p-[24px] flex gap-4  border-b-2 border-gray-400 w-fit ">
          <h2 className="font-bold text-2xl ">Delivery Address:</h2>
          <div className="flex items-center  gap-3">
            <span className="text-2xl text-slate-800 font-semibold ">
              {user?.email}
            </span>
            <span className="text-xl ">
              {user?.email ? "Maadi,Cairo" : ""}{" "}
            </span>
          </div>
        </div>
      </div> */}
      <div className="pt-[70px]">
        <div className="p-8">
          <h3 className="font-bold text-xl border-b-2 border-gray-400 w-fit pb-5">
            Review Items and Delivery :
          </h3>
          <div className="bg-white">
            {basket.map((item) => (
              <CheckOutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-7">
            <h3 className="font-bold text-xl border-b-2 border-gray-400 w-fit pb-3">
              Payment Method :
            </h3>
            <form onSubmit={handleSubmit} className="w-full  ">
              <div className="flex flex-col gap-3 bg-white p-8 rounded-md border-y-2 border-gray-400">
                <CardElement
                  options={options}
                  className=""
                  onChange={handleChange}
                />

                <NumericFormat
                  renderText={(value) => (
                    <h3 className="text-slate-800 font-bold">
                      Total Order :<span className="text-black"> {value}</span>
                    </h3>
                  )}
                  value={getTotalPrice(basket)}
                  displayType="text"
                  prefix="$"
                  thousandSeparator={true}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  type="submit"
                  className="w-full active:scale-[.9] cursor-pointer  my-auto rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
                >
                  {processing ? "Processing" : "Buy Now"}
                </button>
              </div>
              <div>{error && <h2>{error}</h2>}</div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
