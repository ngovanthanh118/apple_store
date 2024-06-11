import { Typography, Box, Grid, Stack, Card, CardHeader, CardContent, CardActions, Button, Dialog, DialogTitle, DialogActions, Step, Stepper, StepLabel, Container } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { orderPrvSliceActions } from "../../stores/slices/orderSlice";
import { Cancel } from "@mui/icons-material";
import { formatNumberWithDot } from "../../helpers/handleFormatNumber";
import { toast } from "react-toastify";

export default function OrderDetailPage() {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const [orderDetail, setOrderDetail] = useState({});
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState();
    const navigate = useNavigate();
    const steps = useMemo(() => {
        return [
            {
                id: 0,
                label: 'Chờ xử lý'
            },
            {
                id: 1,
                label: 'Đang xử lý'
            },
            {
                id: 2,
                label: 'Đang vận chuyển'
            },
            {
                id: 3,
                label: 'Hoàn thành'
            },
        ]
    }, []);

    useEffect(() => {
        const fetchOrderInfo = async () => {
            const res = await dispatch(orderPrvSliceActions.getOrderDetail(_id));
            steps.forEach(step => {
                if (step.label === res.payload.data.status) {
                    setActiveStep(prev => prev = step.id);
                }
            })
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
        <Box backgroundColor="#F0F0F0" padding="16px" minHeight="100vh" display="flex" alignItems="center">
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "white",
                padding: "16px",
                gap: "18px",
                borderRadius: "18px",
            }}>
                <Stepper activeStep={activeStep} sx={{ width: "100%", paddingY: "12px", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, gap: { xs: "12px" } }}>
                    {steps.length > 0 && steps.map(step => (
                        <Step key={step.id} >
                            <StepLabel>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box display="flex" flexDirection="column" gap="16px" sx={{ width: "100%" }}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                        <Card sx={{ flex: 1 }}>
                            <CardHeader
                                title="Thông tin người đặt"
                                sx={{ borderBottom: "1px solid #ccc" }}
                            />
                            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Họ và tên</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer?.name}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Email</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer?.email}</Typography>
                                </Box>
                                {!!!orderDetail.customer?.phone &&
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h1" fontSize="1rem" fontWeight="500">Số điện thoại</Typography>
                                        <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.customer?.phone}</Typography>
                                    </Box>}
                            </CardContent>
                        </Card>
                        <Card sx={{ flex: 1 }}>
                            <CardHeader
                                title="Thông tin người nhận"
                                sx={{ borderBottom: "1px solid #ccc" }}
                            />
                            <CardContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <Box display="flex" justifyContent="space-between" alignItems="start">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Họ và tên</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.name}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="start">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Số điện thoại</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.phone}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="start" >
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500" sx={{ flex: 1 }}>Địa chỉ</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400" textAlign="right" sx={{ flex: 1, textWrap: "wrap" }}>{orderDetail.address}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                    <Card>
                        <CardHeader
                            title="Thông tin đơn hàng"
                            sx={{ borderBottom: "1px solid #ccc" }}
                        />
                        <CardContent>
                            {orderDetail.products?.length > 0 && orderDetail.products.map((product) =>
                                <Stack key={product._id} direction="row" spacing={2} justifyContent="space-between" alignItems="end" sx={{ paddingY: "12px" }}>
                                    <img src={`${process.env.REACT_APP_API_URL}/images/${product.image}`} alt="Ảnh" className="w-12 h-12" />
                                    <Box flex={1}>
                                        <Typography fontSize="1rem" fontWeight="400">{product.name} {product.capacity} x {product.quantity}</Typography>
                                        <Typography fontSize="1rem" fontWeight="400">{product.color}</Typography>
                                    </Box>
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
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Phương thức thanh toán</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.payment_method}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="500">Ngày đặt</Typography>
                                    <Typography variant="h1" fontSize="1rem" fontWeight="400">{orderDetail.createdAt}</Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "flex-end" }}>
                            {orderDetail.status === 'Chờ xử lý' &&
                                <Button variant="contained" size="small"
                                    onClick={() => setOpen(true)}
                                    startIcon={<Cancel />}>
                                    Hủy đơn hàng
                                </Button>
                            }
                            {orderDetail.status === 'Đang xử lý' &&
                                <Button variant="contained" size="small"
                                    onClick={() => setOpen(true)}
                                    startIcon={<Cancel />}>
                                    Hủy đơn hàng
                                </Button>
                            }
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
                </Box>
            </Container>
        </Box>
    );
}