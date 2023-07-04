import React, { useRef } from "react";
import Delivery from "../img/delivery.png";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import CreateContainer from "./CreateContainer";
import { useStateValue } from "../Context/StateProvider";
import { useEffect } from "react";
import { useState } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ FoodItems, cartShow }, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);
  const [direction, setDirection] = useState("");

  useEffect(() => {}, [scrollValue, cartShow]);
  const handleClick = (dir) => {
    if (dir === "l") {
      if (scrollValue === -1500) return;
      setScrollValue(-1500);
      setDirection(dir);
    } else if (dir === "r") {
      if (scrollValue === 1500) return;
      setScrollValue(1500);
      setDirection(dir);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />
      <section className="w-full  my-6   ">
        <div className="w-full flex items-center justify-between md:mb-4 mb-6 ">
          <p
            className="md:text-3xl text-xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
        before:w-28 before:h-1 before:bg-orange-500 transition-all ease-in-out
         duration-100 before:content before:-bottom-2 left-0  w-full"
          >
            Our fresh & Healthy fruits
          </p>

          <div className=" flex gap-3 items-center">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className="flex items-center justify-center w-9 h-9
               bg-orange-300 hover:bg-orange-500 rounded-lg cursor-pointer 
               transition-all ease-in-out duration-100 shadow-lg"
              onClick={() => handleClick("l")}
            >
              <MdChevronLeft className="text-2xl" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.89 }}
              className="flex items-center justify-center w-9 h-9 bg-orange-
              bg-orange-300 hover:bg-orange-500 rounded-lg cursor-pointer 
              transition-all ease-in-out duration-100 shadow-lg"
              onClick={() => handleClick("r")}
            >
              <MdChevronRight />
            </motion.div>
          </div>
        </div>

        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={FoodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      <MenuContainer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;
