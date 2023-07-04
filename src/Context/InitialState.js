import { fetchUser } from "../utils/fetchLocalStoragedata";
import { fetchCart } from "../utils/fetchLocalStoragedata";

const userinfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userinfo,
  FoodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
