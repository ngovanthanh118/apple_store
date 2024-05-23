import { Typography, Box, Grid, Stack, Card, CardHeader, CardContent, CardActions, Button, Dialog, DialogTitle, DialogActions } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { orderPrvSliceActions } from "../../stores/slices/orderSlice";
import { Cancel } from "@mui/icons-material";
import { formatNumberWithDot } from "../../helpers/handleFormatNumber";
import { toast } from "react-toastify";

export default function OrderDetailPage() {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const [orderDetail, setOrderDetail] = useState();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrderInfo = async () => {
            const res = await dispatch(orderPrvSliceActions.getOrderDetail(_id))
            setOrderDetail(res.payload.data);
        }
        fetchOrderInfo();
    }, [_id])
    const handleCancleOrder = async (oid) => {
        setOpen(false);
        const res = await dispatch(orderPrvSliceActions.cancelOrder(oid))
        if (!res.payload.error) {
            toast.success('Hủy đơn hàng thành công')
            navigate('/my-order');
            return;
        }
        toast.error('Hủy đơn hàng thất bại');
    }
    return (
        <Grid container spacing={2} sx={{ minHeight: "100vh", padding: "64px", backgroundColor: "#F0F0F0" }}>
            <Grid item xs={6}>
                <Stack direction="column" spacing={2}>
                    <Card>
                        <CardHeader
                            title="Thông tin người đặt"
                            sx={{ borderBottom: "1px solid #ccc" }}
                        />
                        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Họ và tên</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer.name}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Email</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer.email}</Typography>
                            </Box>
                            {!!!orderDetail.customer.phone &&
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Số điện thoại</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer.phone}</Typography>
                                </Box>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Thông tin người nhận"
                            sx={{ borderBottom: "1px solid #ccc" }}
                        />
                        <CardContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Họ và tên</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.name}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Số điện thoại</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.phone}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Địa chỉ</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.address}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
            <Grid item xs={6}>
                <Card>
                    <CardHeader
                        title="Thông tin đơn hàng"
                        sx={{ borderBottom: "1px solid #ccc" }}
                    />
                    <CardContent>
                        {orderDetail.products.length > 0 && orderDetail.products.map((product) =>
                            <Stack key={product._id} direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ borderBottom: "1px solid #ccc", paddingY: "12px" }}>
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.image}`} alt="Ảnh" className="w-10 h-10" />
                                <Typography fontSize="1rem" fontWeight="400" sx={{ flex: "1" }}>{product.name} x {product.quantity}</Typography>
                                <Typography fontSize="0.9rem" fontWeight="400">{formatNumberWithDot(product.price * product.quantity)}đ</Typography>
                            </Stack>
                        )}
                        <Stack direction="column" spacing={2} sx={{ paddingY: "12px" }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Tổng tiền</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400" color="red">{formatNumberWithDot(orderDetail.total_pay)}đ</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Ghi chú</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.note}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Trạng thái</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.status}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Phương thúc thanh toán</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.payment_method}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">Ngày đặt</Typography>
                                <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.createdAt}</Typography>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                        <Button variant="contained" size="small"
                            onClick={() => setOpen(true)}
                            startIcon={<Cancel />}>
                            Hủy đơn hàng
                        </Button>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <DialogTitle>
                                Bạn có chắc muốn hủy đơn hàng này không?
                            </DialogTitle>
                            <DialogActions>
                                <Button size="small" onClick={() => setOpen(false)} autoFocus>
                                    Cancel
                                </Button>
                                <Button variant="contained" size="small" onClick={() => {
                                    handleCancleOrder(_id)
                                }}>OK</Button>
                            </DialogActions>
                        </Dialog>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}