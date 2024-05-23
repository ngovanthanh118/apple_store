import { Card, CardContent, CardHeader, Typography, Box, Grid, Stack, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderPrvSliceActions } from "../../stores/slices/orderSlice";
import { selectCustomer } from "../../stores/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import { HourglassTop } from "@mui/icons-material";
import { stringAvatar } from "../../helpers/handleFormatName";
export default function MyOrderPage() {
    const customer = useSelector(selectCustomer)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        const fetchOrderList = async () => {
            const res = await dispatch(orderPrvSliceActions.getOrderList(customer._id));
            const orders = res.payload.data.filter(order => order.status !== 'Hủy');
            setOrderList(prev => prev = orders)
        };
        fetchOrderList();
    }, []);


    return (
        <Grid container spacing={3} sx={{
            minHeight: "100vh",
            padding: "32px 64px",
            backgroundColor: "#F0F0F0"
        }}>
            {orderList.length > 0 && orderList.map((order) =>
                <Grid item xs={3} key={order._id}>
                    <Card sx={{
                        padding: "12px"
                    }}>
                        <CardHeader title={`Mã đơn #${order._id}`}
                            onClick={() => navigate('/my-order/' + order._id)}
                            sx={{ borderBottom: "1px solid #ccc", cursor: "pointer" }}
                        />
                        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "12px", }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Tên người nhận</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar sx={{ width: 24, height: 24 }} {...stringAvatar(order.name)} />
                                    <Typography fontSize="1rem" fontWeight="400">{order.name}</Typography>
                                </Stack>

                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Trạng thái</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <HourglassTop fontSize="12px" />
                                    <Typography fontSize="1rem" fontWeight="400" color="red">{order.status}</Typography>
                                </Stack>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Ngày đặt</Typography>
                                <Typography fontSize="1rem" fontWeight="400" color="blue">{order.createdAt}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
}
