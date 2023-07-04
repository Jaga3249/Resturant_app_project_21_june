import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// save items
export const saveItems = async (data) => {
  await setDoc(doc(firestore, "FoodList", `${Date.now()}`), data, {
    merge: true,
  });
};

// get all food

export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "FoodList"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
