import React from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import logo from "../img/logo.png";
import avatar from "../img/avatar.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { app } from "../firebase.config";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import { useState } from "react";
import { initialState } from "../Context/InitialState";

const Header = () => {
  const firebaseauth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseauth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showcart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    // <header></header>

    <header className="fixed z-50 w-screen p-2 px-4 md:p-6 md:px-16 ">
      {/* testop and tablet */}

      <div className="hidden md:flex w-full h-full p-4  items-center justify-between  ">
        <Link to={"/*"} className="flex items-center gap-2 ">
          <img className="w-8 object-cover" src={logo} alt="" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center justify-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8  "
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showcart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div
                className="w-5 h-5  rounded-full flex justify-center 
              items-center bg-cartNumBg absolute -top-2 -right-2"
              >
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative ">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full "
              alt=""
              onClick={login}
            />
            {isMenu && (
              <div className=" w-40 bg-white flex flex-col  rounded-lg shadow-lg absolute top-10 right-0">
                {user && user.email === "jagannathbehera0244@gmail.com" && (
                  <Link to={"/CreateItem"}>
                    <p
                      className="flex items-center gap-3 cursor-pointer px-3 py-1 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  className="flex items-center gap-3 cursor-pointer px-3 py-1 hover:bg-slate-200 transition-all duration-75 ease-in-out text-textColor text-base "
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="flex justify-between md:hidden w-full h-full  p-4">
        <div
          className="relative flex items-center justify-center"
          onClick={showcart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="w-5 h-5  rounded-full flex justify-center items-center bg-cartNumBg absolute -top-1 -right-2">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={"/*"} className="flex items-center gap-2 ">
          <img className="w-8 object-cover" src={logo} alt="" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative  ">
          <motion.img
            whileTap={{ scale: 0.2 }}
            src={user ? user.photoURL : avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full "
            alt=""
            onClick={login}
          />
          {isMenu && (
            <div className=" w-40 bg-white flex flex-col  rounded-lg shadow-lg absolute top-10 right-0">
              {user && user.email === "jagannathbehera0244@gmail.com" && (
                <Link to={"/CreateItem"}>
                  <p
                    className="flex items-center gap-3 cursor-pointer px-3 py-1 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base "
                    onClick={() => setIsMenu(false)}
                  >
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col gap-3 px-3 py-1">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  "
                  onClick={() => setIsMenu(false)}
                >
                  Menu
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  "
                  onClick={() => setIsMenu(false)}
                >
                  About
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer  "
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li>
              </ul>

              <p
                className="flex justify-center bg-slate-300 gap-3 cursor-pointer px-3 py-1 hover:bg-slate-200 transition-all duration-75 ease-in-out text-textColor text-base  m-2 p-2 rounded-md shadow-lg"
                onClick={logout}
              >
                Logout <MdLogout className="mt-1" />
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
