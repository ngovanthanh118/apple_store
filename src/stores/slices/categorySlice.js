import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categorySevice from '../../services/categorySevice';

const initialState = {
    value: [],
}

const getCategoryList = createAsyncThunk(
    'category/list',
    async (_, { dispatch }) => {
        const res = await categorySevice.getAllCategories();
        dispatch(saveCategories(res.data))
        return res;
    }
)
const getProductByCategoryID = createAsyncThunk(
    'category/product',
    async (payload) => {
        const res = await categorySevice.getProductsByCategoryId(payload);
        return res;
    }
)
export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        saveCategories: (state, action) => {
            state.value = action.payload;
        }
    },
})
export const categoryPrvSliceActions = { getCategoryList, getProductByCategoryID };
export const { saveCategories } = categorySlice.actions
export default categorySlice.reducer;
export const selectCategories = (state) => state.categories.value;
