import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    itemsOnPage: 3,
  },
  reducers: {
    set: (state, action) => {
      state.itemsOnPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set } = productsSlice.actions;

export default productsSlice.reducer;
