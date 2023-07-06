import React, { useEffect, useState } from "react";
import { HiMinusSm } from "react-icons/hi";
import { BsPlus } from "react-icons/bs";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";

const CartItem = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.quantity);

  const [items, setItems] = useState([]);

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id == id) {
          item.quantity += 1;
        }
      });
      cartDispatch();
    } else {
      if (qty == 1) {
        setItems(cartItems.filter((item) => item.id !== id));

        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id == id) {
            item.quantity -= 1;
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    setItems(cartItems);
  }, [qty]);

  return (
    <div
      key={item.id}
      className="bg-gray-200 w-full h-[70px] flex items-center gap-3  rounded-xl mb-3"
    >
      <img src={item?.imageUrl} alt="" className="w-20" />
      {/* name-section */}
      <div>
        <p>{item?.Title}</p>
        <p>₹{parseFloat(item?.price) * qty}</p>
      </div>
      {/* botton-section */}
      <div className="flex justify-center gap-8 ml-auto mr-2 bg-gray-50 p-2 rounded-md">
        <motion.div whileTap={{ scale: 0.75 }}>
          <HiMinusSm
            className="cursor-pointer text-2xl"
            onClick={() => updateQty("remove", item?.id)}
          />
        </motion.div>
        <p className="flex items-center text-xl">{qty}</p>
        <div>
          <BsPlus
            className="cursor-pointer text-2xl"
            onClick={() => updateQty("add", item?.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
