import React from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { RiRefreshFill } from "react-icons/ri";
import { HiMinusSm } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const CartContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  const showcart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <div className=" fixed top-0 right-0 w-full h-screen bg-white md:w-375  flex flex-col z-[110]  ">
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
        >
          Clear
          <RiRefreshFill />
        </motion.p>
      </div>

      {/* //bottom-section */}
      <div className="w-full h-300  bg-white flex flex-col rounded-t-[2rem]">
        {/* cartitem-section */}
        <div className="w-full h-42  bg-flex flex-col gap-3 p-1 px-2 ">
          {/* cart-item */}
          <div className="bg-gray-200 w-full h-[70px] flex items-center gap-3  rounded-xl">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/resturantapp-256d8.appspot.com/o/Images%2F1688022028584-f5.png?alt=media&token=1c240c84-16bf-4ac6-91dd-21de213b04eb"
              alt=""
              className="w-20"
            />
            {/* name-section */}
            <div>
              <p>Vanila Fruit</p>
              <p>₹5.78</p>
            </div>
            {/* botton-section */}
            <div className="flex justify-center gap-8 ml-auto mr-2 bg-gray-50 p-2 rounded-md">
              <motion.div whileTap={{ scale: 0.75 }}>
                <HiMinusSm className="cursor-pointer text-2xl" />
              </motion.div>
              <p className="flex items-center text-xl">1</p>
              <div>
                <BsPlus className="cursor-pointer text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* total section */}
      <div className="w-full h-80  bg-gray-50  flex-1 flex flex-col items-center justify-evenly p-5 ">
        <div className="flex items-center justify-between w-full ">
          <p className="text-md font-semibold ">SubTotal</p>
          <p className="text-md font-semibold ">₹34</p>
        </div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-md font-semibold ">Delivery</p>
          <p className="text-md font-semibold ">₹34</p>
        </div>
        <div className="w-full h-[2px] bg-slate-500 my-2"></div>
        <div className="flex items-center justify-between w-full ">
          <p className="text-md font-semibold ">Total</p>
          <p className="text-md font-semibold ">₹34</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-full bg-slate-200 p-2 rounded-lg cursor-pointer "
        >
          Check Out
        </motion.button>
      </div>
    </div>
  );
};

export default CartContainer;
