import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    increment: (state, action) => {
      return (state = state.map((game) => {
        return game.id === action.payload.id
          ? { ...game, quantity: game.quantity + 1 }
          : game;
      }));
    },
    decrement: (state, action) => {
      if (action.payload.quantity === 1) {
        return removeItem(state, action);
      }
      return (state = state.map((game) => {
        return game.id === action.payload.id
          ? { ...game, quantity: game.quantity - 1 }
          : game;
      }));
    },
    addItem: (state, action) => {
      return (state = state.find((game) => game.id === action.payload.id)
        ? state.map((game) =>
            game.id === action.payload.id
              ? { ...game, quantity: game.quantity + 1 }
              : game
          )
        : [...state, action.payload]);
    },
    removeItem: (state, action) => {
      return (state = state.filter((game) => {
        return game.id !== action.payload.id;
      }));
    },
  },
});

export const { increment, decrement, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
