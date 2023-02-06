import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { url, options } from './api';

export const fetchList = createAsyncThunk('list/fetchList', async () => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
});

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    editItem: (state, action) => {
      const { id, updatedItem } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index] = { ...state.items[index], ...updatedItem };
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((game) => {
        return game.id !== action.payload.id;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map((item) => ({
          ...item,
          quantity: 1,
          price: 5,
          id: nanoid(),
        }));
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectList = (state) => state.list;
export const selectListItem = (state, itemId) => {
  return state.list.items.find((item) => item.id === itemId);
};
export const selectListStatus = (state) => state.list.status;

export const { addItem, editItem, deleteItem } = listSlice.actions;

export default listSlice.reducer;
