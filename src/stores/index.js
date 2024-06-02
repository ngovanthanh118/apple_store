import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import cartMiddleware from '../middlewares/mdw.cart'
import { getLocalStorageItem, getSessionItem } from '../helpers/handleStorage';
import customerReducer from './slices/customerSlice';
import categoryReducer from './slices/categorySlice';
import customerMiddleware from '../middlewares/mdw.customer';
import categoryMiddleware from '../middlewares/mdw.category';
const cartState = getLocalStorageItem('cart') || [];
const customerState = getSessionItem('customer') || {};
const categoriesState = getLocalStorageItem('categories') || [];
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        customer: customerReducer,
        categories: categoryReducer,
    },
    preloadedState: {
        cart: {
            value: cartState
        },
        customer: {
            value: customerState
        },
        categories: {
            value: categoriesState
        }
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware, customerMiddleware, categoryMiddleware),
})