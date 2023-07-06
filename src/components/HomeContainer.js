import React from "react";
import Delivery from "../img/delivery.png";
import Herobg from "../img/heroBg.png";
import i1 from "../img/i1.png";
import { heroData } from "../utils/Data";

const HomeContainer = () => {
  return (
    <section className="grid grid-col-1 md:grid-cols-2 gap-3 w-full " id="home">
      {/* div-1 */}
      <div className=" py-2 flex-1 flex  flex-col items-start ml-5  gap-5">
        <div className="flex items-center justify-center gap-1 bg-orange-200 rounded-xl">
          <p className="px-2 py-1 text-orange-500 ">Bike Delivery</p>
          <div className="w-8 h-8 bg-white rounded-full  borderoverflow-hidden  drop-shadow-xl">
            <img src={Delivery} alt="" className="w-full object-contain" />
          </div>
        </div>
        <p className="text-[2.5rem] font-bold tracking-wide ">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem]">Your City</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eveniet
          natus iure veniam ducimus, repellat ipsa ab reprehenderit
          necessitatibus eaque provident, error laudantium exercitationem
          molestias accusamus fugiat alias non dolores, consectetur nam laborum
          praesentium laboriosam quasi obcaecati. Id, sequi sapiente?
        </p>
        <button className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto rounded-lg px-2 py-3 cursor-pointer hover:shadow-lg transition-all ease-in-out duration-100  my-4">
          Order Now
        </button>
      </div>
      {/* div-2 */}

      <div className=" py-2  flex-1 flex items-center relative ">
        <img
          src={Herobg}
          alt=""
          className="ml-auto h-420 w-full lg:w-auto lg:h-650 "
        />
        <div className=" w-full h-full flex justify-center items-center gap-2 absolute  top-0 left-0  flex-wrap lg:px-32  py-12 lg:py-16 ">
          {heroData &&
            heroData.map((n) => (
              <div
                id={n.id}
                className="lg:w-190  p-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col   "
              >
                <img
                  src={n.imagesrc}
                  alt=""
                  className="lg:w-40 w-20  lg:-mt-20 -mt-10  "
                />
                <p className="text-base text font-semibold">{n.name}</p>
                <p className="text-sm text-lighttextGray my-2">{n.desc}</p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-red-400"> ₹</span>
                  {n.Price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
