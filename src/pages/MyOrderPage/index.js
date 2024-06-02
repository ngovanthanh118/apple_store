import { Card, CardContent, CardHeader, Typography, Box, Grid, Stack, Avatar, Tab, Tabs } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
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
    const [orderFilter, setOrderFilter] = useState([]);
    const [value, setValue] = useState('Tất cả');
    const tabs = useMemo(() => {
        return ['Tất cả', 'Chờ xử lý', 'Đang xử lý', 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy']
    }, [])
    const fetchOrderList = async () => {
        const res = await dispatch(orderPrvSliceActions.getOrderList(customer._id));
        setOrderList(prev => prev = res.payload.data);
        setOrderFilter(prev => prev = res.payload.data);
    };
    useEffect(() => {
        fetchOrderList();
    }, []);


    const handleChange = (event, value) => {
        setValue(prev => prev = value)
        if (value === 'Tất cả') {
            setOrderFilter(prev => prev = orderList)
            return;
        }
        const filerOrderByStatus = orderList.filter(order => order.status === value);
        setOrderFilter(prev => prev = filerOrderByStatus);
    };
    return (
        <Box
            backgroundColor="#F0F0F0"
            minHeight="100vh"
            padding="32px 64px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="16px"
        >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs onChange={handleChange} value={value}>
                    {tabs.length > 0 && tabs.map(tab => (
                        <Tab label={tab} value={tab} />
                    ))}
                </Tabs>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {orderFilter.length > 0 && orderFilter.map((order) =>
                    <Grid item xs={4} md={3} key={order._id} className="animate__animated animate__fadeInLeft">
                        <Card >
                            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "12px", cursor: "pointer" }}
                                onClick={() => navigate('/my-order/' + order._id)}
                            >
                                <Typography variant="h1" fontSize="1rem" fontWeight="500"
                                    sx={{ borderBottom: "1px solid #ccc", paddingY: "12px" }}>Mã đơn #{order._id}</Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Tên người nhận</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Avatar sx={{ width: 24, height: 24 }} {...stringAvatar(order.name)} />
                                        <Typography fontSize="1rem" fontWeight="400">{order.name}</Typography>
                                    </Stack>

                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Trạng thái</Typography>
                                    <Typography fontSize="1rem" fontWeight="400" color="red">{order.status}</Typography>
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
        </Box>
    );
}
