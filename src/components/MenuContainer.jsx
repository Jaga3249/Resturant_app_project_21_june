import React from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/Data";
import { useState } from "react";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("");
  const [{ FoodItems }, dispatch] = useStateValue();
  return (
    <section className="w-full  my-6" id="menu">
      <div className="flex  flex-col justify-center items-center ">
        <p
          className="md:text-3xl text-xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
        before:w-16 before:h-1 before:bg-orange-500 transition-all ease-in-out
         duration-100 before:content before:-bottom-2  mr-auto    "
        >
          Our Hot Dishes
        </p>
        <div className="flex items-center justify-start md:gap-8 gap-2 flex-wrap  md:flex-no wrap md:mt-0 mt-5">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`${
                  filter === category.urlParamName ? "bg-red-600" : "bg-white"
                } w-24 min-w[94px] h-24 rounded-xl   shadow-md drop-shadow-lg transition-all 
                ease-in-out duration-100 cursor-pointer hover:bg-red-600 flex items-center justify-center flex-col gap-2`}
                onClick={() => {
                  setFilter(category.urlParamName);
                }}
              >
                <div
                  className={`${
                    filter === category.ur ? "bg-white" : "bg-red-600"
                  } w-10 h-10 flex justify-center items-center rounded-full hover:bg-gray-300`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? " text-textColor"
                        : "text-white"
                    } `}
                  />
                </div>
                <p
                  className={`${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-lighttextGray"
                  }`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <RowContainer
            flag={false}
            data={FoodItems && FoodItems.filter((n) => n.category === filter)}
          />
        </div>
        {/* {console.log(filter)} */}
      </div>
    </section>
  );
};

export default MenuContainer;
