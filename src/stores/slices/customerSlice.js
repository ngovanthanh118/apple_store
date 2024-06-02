import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customerService from '../../services/customerService'
import { removeCookie, setCookie } from '../../helpers/handleCookie';
import { clearSessionItem } from '../../helpers/handleStorage';

const initialState = {
    value: {},
}

const signIn = createAsyncThunk(
    'customer/signin',
    async (payload, { dispatch }) => {
        const res = await customerService.signIn(payload);
        setCookie('token', res.token, 9999);
        dispatch(saveProfileCustomer(res.data));
        return true;
    }
)
const siginUp = createAsyncThunk(
    'customer/signup',
    async (payload, { dispatch }) => {
        const res = await customerService.signUp(payload);
        setCookie('token', res.token, 9999);
        dispatch(saveProfileCustomer(res.data));
        return true;
    }
)
const updateProfile = createAsyncThunk(
    'customer/updateProfle',
    async (payload, { dispatch }) => {
        const { id, ...rest } = payload;
        const res = await customerService.updateProfile(id, rest);
        dispatch(saveProfileCustomer(res.data));
        return res;
    }
)
const logout = createAsyncThunk(
    'customer/logout',
    async (_, { dispatch }) => {
        dispatch(removeProfileCustome());
        removeCookie('token');
        clearSessionItem('customer');
        return true;
    }
)
export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        saveProfileCustomer: (state, action) => {
            state.value = action.payload;
        },
        removeProfileCustome: (state) => {
            state.value = {};
        }
    },
})
export const customerPrvSliceActions = { signIn, siginUp, logout, updateProfile };
export const { saveProfileCustomer, removeProfileCustome } = customerSlice.actions
export default customerSlice.reducer;
export const selectCustomer = (state) => state.customer.value;
