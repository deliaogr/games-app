import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import listSlice from "./listSlice";

const preloadedState = {
  cart: JSON.parse(localStorage.getItem("cart")),
};

const store = configureStore({
  reducer: {
    cart: cartSlice,
    list: listSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
