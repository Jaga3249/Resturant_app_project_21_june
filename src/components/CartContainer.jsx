import React, { useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiRefreshFill } from "react-icons/ri";

import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CaerItem from "./CartItem";
import CartItem from "./CartItem";
import { act } from "@testing-library/react";
import { useEffect } from "react";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [total, setTotal] = useState(0);
  const showcart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });
    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  useEffect(() => {
    const subtotal = cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    setTotal(subtotal);
    console.log("jaga");
  }, [JSON.stringify(cartItems)]);

  return (
    <div className=" fixed top-0 right-0 w-full h-screen bg-white md:w-375  flex flex-col z-[110]   ">
      {/* header-cart */}
      <div className="p-4  w-full  flex items-center justify-between cursor-pointer ">
        <motion.div whileTap={{ scale: 0.75 }}>
          <HiOutlineArrowNarrowLeft
            className="text-3xl text-textColor"
            onClick={showcart}
          />
        </motion.div>
        <p className="text-lg font-medium">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 px-2 my-2 text-xl bg-white hover:shadow-md drop-shadow-sm"
          onClick={clearCart}
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>

      {/* //bottom-section */}

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="w-full h-300  bg-white flex flex-col rounded-t-[2rem]   ">
            {/* cartitem-section */}
            <div className="w-full h-42  bg-flex flex-col   px-2  overflow-y-auto overflow-x-hidden scrollbar-thin ">
              {/* cart-item */}

              {cartItems && cartItems.map((item) => <CartItem item={item} />)}
            </div>
            {/* total section */}
          </div>
          <div className="w-full h-80  bg-gray-50  flex-1 flex flex-col items-center justify-evenly p-10 mb-1   ">
            <div className="flex items-center justify-between w-full ">
              <p className="text-md font-semibold ">SubTotal</p>
              <p className="text-md font-semibold ">₹{total}</p>
            </div>
            <div className="flex items-center justify-between w-full ">
              <p
                className="text-md font-semibold "
                style={{ marginBlock: "10px" }}
              >
                Delivery
              </p>
              <p className="text-md font-semibold ">₹{total * 0.1}</p>
            </div>
            <div className="w-full h-[2px] bg-slate-500 my-2"></div>
            <div className="flex items-center justify-between w-full ">
              <p className="text-md font-semibold ">Total</p>
              <p className="text-md font-semibold ">₹{total + total * 0.1}</p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                // className="w-full bg-slate-200 p-2 rounded-lg cursor-pointer mt-12 "
                style={{
                  backgroundColor: "#176B87",
                  padding: "20px",
                  marginTop: "15px",
                  // marginBottom: "-10px",
                  marginBlock: "15px",
                  marginLeft: "5px",
                  color: "black",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className=" "
                style={{
                  backgroundColor: "#176B87",
                  padding: "20px",
                  marginTop: "15px",
                  // marginBottom: "-10px",
                  marginBlock: "15px",
                  marginLeft: "5px",
                  color: "black",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
              >
                Login to Check Out
              </motion.button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6  ">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
