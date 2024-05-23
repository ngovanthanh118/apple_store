import { createAsyncThunk } from '@reduxjs/toolkit'
import orderService from '../../services/orderService';
const createOrder = createAsyncThunk(
    'order/create',
    async (payload) => {
        const res = await orderService.createOrder(payload)
        return res;
    }
)
const getOrderList = createAsyncThunk(
    'order/list',
    async (payload) => {
        const res = await orderService.getOrders(payload)
        return res;
    }
)
const getOrderDetail = createAsyncThunk(
    'order/detail',
    async (payload) => {
        const res = await orderService.getOrder(payload)
        return res;
    }
)
const cancelOrder = createAsyncThunk(
    'order/cancel',
    async (payload) => {
        const res = await orderService.cancelOrder(payload);
        return res;
    }
)
export const orderPrvSliceActions = { createOrder, getOrderList, getOrderDetail, cancelOrder };

