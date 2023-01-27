import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import listSlice from "./listSlice";

const preloadedState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  list: JSON.parse(localStorage.getItem("list")) || {
    items: [],
    status: "idle",
    error: null,
  },
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
  localStorage.setItem("list", JSON.stringify(store.getState().list));
});

export default store;
