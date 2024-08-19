import React, { useEffect, useRef, useState } from "react";
import LogoForm from "../images/login-logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [btnCreate, setBtnCreate] = useState(true);
  const [btnSignIn, setBtnSign] = useState(true);
  const navigate = useNavigate();
  const inputEmail = useRef()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = (e) => {
    e.preventDefault();
    setBtnCreate(false);
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
        setBtnCreate(true);
      });
  };
  const signIn = (e) => {
    e.preventDefault();
    setBtnSign(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
        setBtnSign(true);
      });
  };

  useEffect(()=>{
      if(!email){
        
      }
  } , [])

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-[20px] md:mt-[50px]">
      <Link to="/" className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={LogoForm}
          className="mx-auto h-10 w-auto"
        />
      </Link>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-black font-semibold md:text-lg shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-slate-700 hover:text-slate-500 transition-all duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-black font-semibold md:text-lg shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              disabled = {!email || !password}
              type="submit"
              className="flex w-full justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
              onClick={signIn}
            >
              {btnSignIn ? "Sign in" : "Welcome"}
            </button>
          </div>
          <div>
            <Link to="/">
              <button
              disabled={!email || !password}
                onClick={register}
                type="submit"
                className="flex w-full  cursor-pointer justify-center rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 disabled:bg-gray-400"
              >
                {btnCreate ? "Create Your Account" : "Createing..."}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
