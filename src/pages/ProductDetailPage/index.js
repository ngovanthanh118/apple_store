import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import productService from "../../services/productService";
import { formatNumberWithDot } from "../../helpers/handleFormatNumber";
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart } from "../../stores/slices/cartSlice";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, Input, InputLabel, Modal, Rating, Stack, Tab, Tabs, Typography } from "@mui/material";
import { AddShoppingCart, CameraAlt, ExpandMore, ShoppingCart } from "@mui/icons-material";
import { commentPrvSliceActions } from "../../stores/slices/commentSlice";
import { selectCustomer } from "../../stores/slices/customerSlice";
import isEmptyObject from "../../helpers/handleEmptyObject";
export default function ProductDetailPage() {
    const { proc_id } = useParams();
    const customer = useSelector(selectCustomer)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [productDetail, setProductDetail] = useState({});
    const [producSimalar, setProductSimalar] = useState([]);
    const [imageShow, setImageShow] = useState('');
    const [colorActive, setColorActive] = useState('');
    const [tabIndex, setTabIndex] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const handleChange = (event, newValue) => {
        if (newValue === 2) {
            fetchCommentList();
            setValue('user_id', customer._id);
            setValue('product_id', proc_id);
        }
        setTabIndex(newValue);
    };
    const dispatch = useDispatch();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm()
    const fetchCommentList = async () => {
        const res = await dispatch(commentPrvSliceActions.getCommentList(proc_id))
        setCommentList(prev => prev = res.payload.data)
    }
    useEffect(() => {
        const fetchProduct = async () => {
            await productService.getProduct(proc_id)
                .then(res => {
                    setProductDetail(prev => prev = res.data.productDetail);
                    setProductSimalar(prev => prev = res.data.productSimilar);
                    setImageShow(prev => prev = res.data.productDetail.images[0]);
                    setColorActive(prev => prev = res.data.productDetail.colors[0].label);
                })
                .catch(err => console.log(err))
        }
        fetchProduct();
        window.scroll(0, 0);
    }, [proc_id])
    const onSubmit = async (data) => {
        if (isEmptyObject(customer)) {
            navigate('/login');
            return;
        }
        const res = await dispatch(commentPrvSliceActions.postComment(data));
        if (!res.payload.error) {
            setOpen(false);
            await fetchCommentList();
        }
    }
    return (
        <Box
            padding="32px 0"
            backgroundColor="#3E3E3F"
            minHeight="100vh"
        >
            <Container className="animate__animated animate__fadeIn">
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" spacing={2} >
                    <Box sx={{ maxWidth: { sm: 600 } }} display="flex" flexDirection="column" gap="12px">
                        <img src={`${process.env.REACT_APP_API_URL}/images/${imageShow}`} alt="img_show" className="flex-1 object-cover w-[600px] h-auto" />
                        <Tabs
                            variant="scrollable"
                            scrollButtons
                        >
                            {productDetail.images && productDetail.images?.map((img, index) => (
                                <Tab
                                    sx={{ backgroundColor: "white", marginX: "4px", borderRadius: "16px" }}
                                    label={<img key={index + 1} src={`${process.env.REACT_APP_API_URL}/images/${img}`} alt="img_thumb" className="w-[80px] h-[80px]" />}
                                    key={index}
                                    onClick={() => setImageShow(prev => prev = img)}
                                >
                                </Tab>
                            ))}

                        </Tabs>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="12px" padding="12px 0" borderLeft={{ sm: "1px solid #ccc" }} paddingLeft="16px" margin="0 !important">
                        <Typography variant="h1" fontSize="1.875rem" color="white" fontWeight="bold">{productDetail.name}</Typography>
                        {productDetail?.discount > 0 ?
                            <Box display="flex" alignItems="center" gap="8px" >
                                <Typography variant="h1" fontWeight="bold" fontSize="1.25rem" color="white">{formatNumberWithDot(productDetail.discount)}đ</Typography>
                                <Typography fontWeight="400" fontSize="1rem" color="white" sx={{ textDecoration: "line-through" }}>{formatNumberWithDot(productDetail.price)}đ</Typography>
                                <Typography variant="span" color="white" fontSize="1rem" fontWeight="400" >-{100 - Math.round(productDetail.discount / productDetail.price * 100)}%</Typography>
                            </Box> :
                            <Typography variant="h1" fontWeight="bold" fontSize="1.5rem" color="white">{formatNumberWithDot(productDetail.price)}đ</Typography>
                        }
                        {!!productDetail.version ?
                            <Box display="flex" flexDirection="column" gap="8px">
                                <Typography variant="h1" color="white" fontSize="1rem" fontWeight="500">Phiên bản</Typography>
                                <Box display="flex" alignItems="center" gap="8px" color="white">
                                    {producSimalar && producSimalar.map((item, index) => (
                                        <Box key={index}
                                            className={item._id === proc_id ?
                                                "p-2 text-sm bg-[#1C1C1D] rounded-md cursor-pointer" :
                                                "p-2 text-sm bg-[#2F3033] rounded-md cursor-pointer"
                                            }
                                            onClick={() => navigate(`/product/${item._id}`)}
                                        >
                                            {item.version}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            :
                            <Box display="flex" flexDirection="column" gap="8px">
                                <Typography variant="h1" color="white" fontSize="1rem" fontWeight="500">Dung lượng</Typography>
                                <Box display="flex" alignItems="center" gap="8px" color="white">
                                    {producSimalar && producSimalar.map((item, index) => (
                                        <Box key={index}
                                            className={item._id === proc_id ?
                                                "p-2 text-sm bg-[#1C1C1D] rounded-md cursor-pointer" :
                                                "p-2 text-sm bg-[#2F3033] rounded-md cursor-pointer"
                                            }
                                            onClick={() => navigate(`/product/${item._id}`)}
                                        >
                                            {item.capacity}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        }

                        <Box display="flex" flexDirection="column" gap="8px">
                            <Typography variant="h1" color="white" fontSize="1rem" fontWeight="500">Màu: {colorActive}</Typography>
                            <Box display="flex" alignItems="center" gap="8px">
                                {productDetail.colors && productDetail.colors.map((item, index) => (
                                    <Box
                                        key={index}
                                        style={{ backgroundColor: item.color }}
                                        className={colorActive === item.label ?
                                            "p-4 border border-white border-solid cursor-pointer rounded-full" :
                                            "p-4 rounded-full cursor-pointer"
                                        }
                                        onClick={() => { setColorActive(prev => prev = item.label) }}
                                    ></Box>
                                ))}
                            </Box>
                        </Box>
                        {productDetail.quantity === 0 && (
                            <Typography variant="h1" color="white" fontSize="1rem" fontWeight="500">Trạng thái: Tạm thời hết hàng</Typography>
                        )}
                        {productDetail.quantity > 0 && (
                            <Box display="flex" gap="6px" >
                                <Button variant="contained" size="large"
                                    startIcon={<AddShoppingCart />}
                                    onClick={() => {
                                        dispatch(addProductToCart(productDetail));
                                    }}
                                >
                                    Thêm vào giỏ hàng
                                </Button>

                            </Box>
                        )}
                    </Box>
                </Stack >
                <Stack direction="column" spacing={1} alignItems="center" sx={{ backgroundColor: "white", borderRadius: "8px", padding: "16px", marginTop: "32px" }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabIndex} onChange={handleChange}>
                            <Tab label="Mô tả" />
                            <Tab label="Thông số kỹ thuật" />
                            <Tab label="Đánh giá sản phẩm" />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabIndex} index={0}>
                        <Typography textAlign="justify">{productDetail.description}</Typography>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={1}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "#F5F5F7", fontWeight: "500" }}
                            >Màn hình
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Cộng nghệ màn hình:</Typography>
                                    <Typography>{productDetail.screen_type}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Độ phân giải:</Typography>
                                    <Typography>{productDetail.resolution}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Màn hình rộng:</Typography>
                                    <Typography>{productDetail.screen_size}"</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Tần số quét:</Typography>
                                    <Typography>{productDetail.refresh_rate} Hz</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "#F5F5F7", fontWeight: "500" }}
                            >Hệ điều hành & CPU
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Hệ điều hành:</Typography>
                                    <Typography>{productDetail.operating_system}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Chip xử lý (CPU):</Typography>
                                    <Typography>{productDetail.cpu}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Chip đồ họa (GPU):</Typography>
                                    <Typography>{productDetail.gpu}</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "#F5F5F7", fontWeight: "500" }}
                            >Bộ nhớ & Lưu trữ
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>RAM:</Typography>
                                    <Typography>{productDetail.ram} GB</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Dung lượng lưu trữ:</Typography>
                                    <Typography>{productDetail.capacity}</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "#F5F5F7", fontWeight: "500" }}
                            >Pin & Sạc
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Dung lượng pin:</Typography>
                                    <Typography>{productDetail.battery_life} mAh</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Hỗ trợ sạc tối đa:</Typography>
                                    <Typography>{productDetail.charger_capacity} W</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                sx={{ backgroundColor: "#F5F5F7", fontWeight: "500" }}
                            >Thông tin chung
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Chất liệu:</Typography>
                                    <Typography>{productDetail.material}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Kích thước, khối lượng:</Typography>
                                    <Typography>{productDetail.size}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ paddingY: "12px" }}>
                                    <Typography sx={{ width: "30%" }}>Thời điểm ra mắt:</Typography>
                                    <Typography>{productDetail.createdAt}</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabIndex} index={2}>
                        <Box borderRadius="12px" padding="24px" border="1px solid #ccc" display="flex" flexDirection="column" gap="18px">
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h1" fontSize="2.5rem" fontWeight="500" sx={{}}>Đánh giá {productDetail.name}</Typography>
                                <Button variant="contained" onClick={() => setOpen(true)}>
                                    Viết đánh giá
                                </Button>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    sx={{
                                        display: "flex", justifyContent: "center", alignItems: "center", paddingX: { xs: "16px" }
                                    }}
                                >
                                    <Card sx={{ width: { xs: "100%", sm: "50%" }, borderRadius: "18px", padding: "16px" }}>
                                        <CardHeader
                                            title="Đánh giá sản phẩm"
                                            sx={{ borderBottom: "1px solid #ccc" }}
                                        />
                                        <CardContent>
                                            <Stack direction="column" spacing={2} alignItems="center">
                                                <img src={`${process.env.REACT_APP_API_URL}/images/${imageShow}`} alt="Anh" className="w-20 h-20" />
                                                <Typography variant="h1" fontSize="1rem" fontWeight="500">{productDetail.name}</Typography>
                                                <Rating onChange={(ev, value) => setValue('rating', value)} />
                                                <textarea {...register('content', { required: "Vui lòng chia sẻ cảm nhận về  sản phẩm" })} placeholder="Mời bạn chia sẻ cảm nhận" className="w-full border border-solid border-gray-300 focus:outline-blue-600 p-2 rounded-xl" />
                                                {!!errors.comment && <Typography variant="span" fontSize="0.9rem" color="red" fontWeight="400">{errors.comment.mess}</Typography>}
                                            </Stack>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" fullWidth size="large" onClick={handleSubmit(onSubmit)}>
                                                Gửi đánh giá
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Modal>
                            </Stack>
                            {commentList.length > 0 && commentList.map((comment) => (
                                <Card key={comment._id}>
                                    <CardContent>
                                        <Box display="flex" flexDirection="column" gap="12px">
                                            <Typography variant="h1" fontSize="1rem" fontWeight="500">{comment.customer_name}</Typography>
                                            <Rating value={comment.rating} readOnly />
                                            <Typography fontSize="0.9rem" fontWeight="400">{comment.content}</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </CustomTabPanel>
                </Stack>
            </Container>
        </Box >
    );
} function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    if (value === index) return (
        <Box p={{ sm: 3, xs: 1 }} sx={{ width: "100%" }} {...other}>
            {children}
        </Box>
    )
}