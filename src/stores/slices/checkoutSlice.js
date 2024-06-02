import { createAsyncThunk } from '@reduxjs/toolkit'
import checkoutService from '../../services/checkoutService';
const createCheckout = createAsyncThunk(
    'checkout/create',
    async (payload) => {
        const res = await checkoutService.checkout(payload)
        return res;
    }
)


export const checkoutPrvSliceActions = { createCheckout };

