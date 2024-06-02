import { createAsyncThunk } from '@reduxjs/toolkit'
import searchSevice from '../../services/searchSevice';
const searchProducts = createAsyncThunk(
    'search/query',
    async (payload) => {
        const res = await searchSevice.search(payload)
        return res;
    }
)


export const searchPrvSliceActions = { searchProducts };

