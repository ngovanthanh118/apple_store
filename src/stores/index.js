import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import cartMiddleware from '../middlewares/mdw.cart'
import { getLocalStorageItem, getSessionItem } from '../helpers/handleStorage';
import customerReducer from './slices/customerSlice';
import customerMiddleware from '../middlewares/mdw.customer';
const cartState = getLocalStorageItem('cart') || [];
const customerState = getSessionItem('customer') || {};
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        customer: customerReducer
    },
    preloadedState: {
        cart: {
            value: cartState
        },
        customer: {
            value: customerState
        }
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cartMiddleware, customerMiddleware),
})