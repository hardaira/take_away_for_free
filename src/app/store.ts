import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';
import newProductsReducer from '../features/addProduct';
//import productsAllReducer from '../features/productsAll';
import filterCityReducer from '../features/filterCity';
import filterCategoryReducer from '../features/filterCategory';
import cartReducer from '../features/cart';
import favoritesReducer from '../features/favorites';
//import paginationReducer from '../features/pagination';
//import phonesReducer from '../features/phones';
//import tabletsReducer from '../features/tablets';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    //productsAll: productsAllReducer,
    filterCity: filterCityReducer,
    filterCategory: filterCategoryReducer,
    //pagination: paginationReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    newProducts: newProductsReducer,
    //phones: phonesReducer,
    //tablets: tabletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


