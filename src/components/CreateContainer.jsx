import React, { useRef } from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { MdDragIndicator } from "react-icons/md";

import { BsCurrencyRupee } from "react-icons/bs";
import { categories } from "../utils/Data";

import Loder from "./Loder";
import {
  Ref,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "../firebase.config";
import { getAllFoodItems, saveItems } from "../utils/firebaseFunctions";
import { useStateValue } from "../Context/StateProvider";
import { useEffect } from "react";
import { actionType } from "../Context/reducer";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageAsset, setimageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{ FoodItems }, dispatch] = useStateValue();
  const select = useRef();

  const uploadImg = (e) => {
    setIsLoading(true);
    const imagefile = e.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}-${imagefile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imagefile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // console.log(error);
        setFields(true);
        setMsg("Error while uploading :Try Again 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setAlertStatus(null);
          setMsg("Image Uploaded Sucessfully  😊");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteBtn = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);

    deleteObject(deleteRef).then(() => {
      setimageAsset(null);
      setIsLoading(false);
      setFields(true);
      setAlertStatus("danger");
      setMsg("Image Deleted Sucessfully  😊");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !category || !imageAsset || !calories || !price) {
        setFields(true);
        setMsg("Required Field Can't Be Empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: Date.now(),
          Title: title,
          category: category,
          calories: calories,
          imageUrl: imageAsset,
          quantity: 1,
          price: price,
        };
        saveItems(data);
        setIsLoading(false);
        setFields(true);
        setAlertStatus(null);
        setMsg("Data Uploaded Sucessfully  😊");
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
      ClearData();
    } catch (error) {
      setFields(true);
      setMsg("Error while saving :Try Again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    FetchData();
  };

  const FetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        FoodItems: data,
      });
    });
  };

  const ClearData = () => {
    setTitle("");
    setCategory("");
    setimageAsset(null);
    setCalories("");
    setPrice("");
    select.current.selectedIndex = 0;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="w-[70%] md:w-[75%] border border-gray-200 rounded-lg p-4   flex flex-col justify-center items-center gap-3 md:mb-16  md:fixed  object-contain">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center ${
              alertStatus === "danger"
                ? "bg-red-500 text-red-200 "
                : "bg-emerald-500  text-emerald-100"
            }`}
          >
            {msg}
          </motion.p>
        )}
        {/* inner-div-1 */}
        <div className=" w-full py-2 flex items-center gap-2 border-b ">
          <MdFastfood />
          <input
            type="text"
            required
            placeholder="Give Me A Title....."
            className="w-full border-none outline-none h-10 text-lg font-semibold text-textColor border-lg rounded  p-5 "
            value={title}
            onChange={(e) => {
              const inputValue = e.target.value;

              const digitsRemoved = inputValue.replace(/\d/g, "");
              digitsRemoved === "" ? setTitle("") : setTitle(digitsRemoved);
            }}
          />
        </div>

        {/* inner-div-2*/}
        <div className="w-full flex items-center gap-2">
          <MdDragIndicator className="text-2xl -ml-2" />
          <select
            onChange={(e) => {
              const inputValue = e.target.value;
              setCategory(inputValue);

              // inputValue !== "" && setCategory("Select Category");
              // console.log(category);
            }}
            ref={select}
            className=" w-full  h-10 bg-white outline-none rounded-sm   "
          >
            <option
              value="Select Category"
              className=" outline-none border-none font-semibold "
            >
              Select Category
            </option>

            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="  text-headingColor text-base border-none outline-none"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* inner-div-3*/}

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-grey-300 w-full h-225 md:h-440 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loder />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex justify-center items-center flex-col cursor-pointer">
                    <div className="w-full h-full flex justify-center items-center flex-col  gap-3">
                      <MdCloudUpload className="text-3xl text-gray-500" />
                      <p>Click Here To Upload</p>
                    </div>
                    <input
                      type="file"
                      name="uplodImage"
                      accept="image/*"
                      onChange={uploadImg}
                      className="h-0 w-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full">
                    <img
                      src={imageAsset}
                      alt="upload image"
                      className="w-full h-full object-contain "
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 md:right-2  rounded-full  cursor-pointer bg-red-500  md:text-4xl text-3xl"
                      onClick={deleteBtn}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/* inner-div-4*/}

        <div className="flex flex-col md:flex-row justify-center items-center gap-4  w-full">
          <div className="flex items-center gap-3 border-red-300 w-full">
            <MdFoodBank className="text-3xl" />
            <input
              type="phone"
              pattern="[0-9]{1,5}"
              maxlength="5"
              placeholder="Calories"
              value={calories}
              onChange={(e) => {
                const inputValue = e.target.value;
                const integerValue = parseInt(inputValue, 10);
                if (!isNaN(integerValue)) {
                  setCalories(integerValue);
                } else setCalories("");
              }}
              required
              className="w-full h-full border-none outline-none placeholder:text-gray-500 py-2  border-2 rounded-md px-5"
            />
          </div>
          <div className="flex items-center gap-3 border-red-300 w-full">
            <BsCurrencyRupee className="text-3xl " />

            <input
              type="tel"
              pattern="[0-9]{1,5}"
              maxlength="5"
              value={price}
              onChange={(e) => {
                const inputValue = e.target.value;
                const integerValue = parseInt(inputValue, 10);
                if (!isNaN(integerValue)) {
                  setPrice(integerValue);
                } else setPrice("");
              }}
              placeholder="Price"
              required
              className="w-full h-full border-none outline-none placeholder:text-gray-500 py-2 px-5 rounded-md "
            />
          </div>
        </div>

        {/* inner-div-5 */}

        {/* <div className="flex flex-col md:flex-row justify-center items-center gap-3">
          <div className="flex items-center gap-3 border-red-300">
            <MdAttachMoney className="text-3xl " />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
              className="w-full h-full border-none outline-none placeholder:text-gray-500 py-2 "
            />
          </div>
        </div> */}

        {/* <inner-div-6></inner-div-6> */}
        <div className="w-full flex justify-center items-center">
          <button
            className="ml-0 mb-0 md:ml-auto  w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
             text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
