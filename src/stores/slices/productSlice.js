import { createAsyncThunk } from '@reduxjs/toolkit'
import productService from '../../services/productService';

const getProductList = createAsyncThunk(
    'product/getList',
    async () => {
        const res = await productService.getProducts()
        return res;
    }
)
const getProduct = createAsyncThunk(
    'product/getDetail',
    async (payload) => {
        const res = await productService.getProduct(payload);
        return res;
    }
)
export const productPrvSliceActions = { getProductList, getProduct }
