import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url, options } from "./api";

export const fetchList = createAsyncThunk("list/fetchList", async () => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.map((item) => ({
          ...item,
          quantity: 1,
          price: 5,
        }));
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectList = (state) => state.list;
export const selectListItem = (state, itemId) => {
  return state.list.items.find((item) => item.id === +itemId);
};
export const selectListStatus = (state) => state.list.status;

export default listSlice.reducer;
