import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuth } from "./Context/GlobalState";
import Orders from "./components/Orders";
import Home from "./components/Home";
import CheckOut from "./components/CheckOut";
import NotFound from "./components/NotFound";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51PHRITBEDNchS2pRxrjWmbtF5fP23Tnoy9gZwZ4kCdx2JtUT0PKnnVrWLKAnAA5VyVWuPSHSDUAPOcRPdWRbbgRJ00wGhcbanC"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <CheckOut />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <NotFound />
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
