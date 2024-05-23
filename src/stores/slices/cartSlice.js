import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const index = state.value.findIndex(proc => proc._id === action.payload._id);
            if (index > -1) {
                state.value[index] = { ...state.value[index], quantity_order: state.value[index].quantity_order + 1 };
                return;
            }
            state.value = [...state.value, { ...action.payload, quantity_order: 1 }];
        },
        increasQuantityProductInCart: (state, action) => {
            const index = state.value.findIndex(proc => proc._id === action.payload._id);
            if (index > -1) {
                state.value[index] = { ...state.value[index], quantity_order: state.value[index].quantity_order + 1 };
            }
        },
        decreaseQuantityProductInCart: (state, action) => {
            const index = state.value.findIndex(proc => proc._id === action.payload._id);
            if (index > -1 && action.payload.quantity_order > 1) {
                state.value[index] = { ...state.value[index], quantity_order: state.value[index].quantity_order - 1 };
            }
        },
        removeProductInCart: (state, action) => {
            console.log("xoa san pham");
            state.value = state.value.filter(proc => proc._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.value = [];
        }
    },
})

export const { addProductToCart, removeProductInCart, clearCart, increasQuantityProductInCart, decreaseQuantityProductInCart } = cartSlice.actions
export default cartSlice.reducer;
export const selectCart = (state) => state.cart.value;
