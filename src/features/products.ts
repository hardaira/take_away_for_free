// eslint-disable-next-line no-param-reassign
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  location_city: string;
  contact: string;
  image: string;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/api/products.json');
    const data = await response.json();

    return data;
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },

    removeProduct: (state, action) => {
      state.items = state.items.filter(
        product => product.id !== action.payload,
      );
    },

    setProducts: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { addProduct, removeProduct, setProducts } = productsSlice.actions;

export default productsSlice.reducer;
export const selectAllProducts = (state: any) => state.products.items;
