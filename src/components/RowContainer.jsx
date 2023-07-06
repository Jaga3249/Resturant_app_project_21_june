import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useEffect } from "react";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../Context/StateProvider";

import { useState } from "react";
import { actionType } from "../Context/reducer";
import { BsArrowBarUp } from "react-icons/bs";

const RowContainer = ({ flag, data, scrollValue }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const rowContainer = useRef();
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  const addTocart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addTocart();
  }, [items]);
  // console.log(cartItems);

  return (
    <div
      ref={rowContainer}
      className={`w-full bg-white flex gap-4 items-center flex-row scroll-smooth p-4  mt-5 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x flex-wrap justify-center  "
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="   min-w-[250px] md:min-w-[350px] md:min-h-[150px] min-h-[100px] bg-slate-300 rounded-xl"
          >
            <div className="flex items-center justify-between w-full md:h-40 h-24  ">
              <motion.img
                whileHover={{ scale: 1.2 }}
                src={item.imageUrl}
                alt=""
                className=" md:w-40 w-24  h-40 md:-ml-1 mt-4 ml-5 "
              />

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="bg-red-600 w-10 h-10 rounded-full flex justify-center items-center mr-6
                   "
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white  cursor-pointer" />
              </motion.div>
            </div>
            <div className="w-full flex items-end justify-end flex-col pr-4  ">
              <p className="font-semibold text-lg  md:text-lg">{item.Title}</p>
              <p>{item.calories} Calories</p>
              <div>
                <p>
                  <span className="text-2xl">₹</span>
                  <span className="text-2xl">{item.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full md:h-420 h-200  flex items-center justify-center flex-col md:gap-2  gap-1 ">
          <img src={NotFound} alt="" className="h-340" />
          <p className="font-semibold ">Item Not Available</p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
