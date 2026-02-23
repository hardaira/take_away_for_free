// features/products/productsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updatedItems: localStorage.getItem('newProducts')
    ? JSON.parse(localStorage.getItem('newProducts')!)
    : [],
};

const newProductsSlice = createSlice({
  name: 'newProducts',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.updatedItems.push(action.payload);

      // Save to localStorage
      localStorage.setItem('newProducts', JSON.stringify(state.updatedItems));
    },
  },
});

export const { addProduct } = newProductsSlice.actions;

// ✅ Selector matches the state structure
export const selectAllProducts = state => state.products.updatedItems;

export default newProductsSlice.reducer;
