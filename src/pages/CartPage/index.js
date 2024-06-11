import { useForm } from "react-hook-form";
import {
    Box,
    ButtonBase,
    Button,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Checkbox,
    RadioGroup,
    Radio,
    Container,
} from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithDot } from "../../helpers/handleFormatNumber";
import { useEffect, useState } from "react";
import { orderPrvSliceActions } from "../../stores/slices/orderSlice";
import { selectCustomer } from "../../stores/slices/customerSlice";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import isEmptyObject from "../../helpers/handleEmptyObject";
import { selectCart } from "../../stores/slices/cartSlice";
import { clearCart, removeProductInCart, decreaseQuantityProductInCart, increasQuantityProductInCart } from "../../stores/slices/cartSlice";
import addressService from "../../services/addressService";
import { checkoutPrvSliceActions } from "../../stores/slices/checkoutSlice";
export default function CartPage() {
    const cart = useSelector(selectCart);
    const [colorSelected, setColorSelected] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customer = useSelector(selectCustomer);
    const [provinceList, setProvinceList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [wardList, setWardList] = useState([]);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" });
    useEffect(() => {
        const fetchProvinces = async () => {
            await addressService.getProvinces()
                .then(res => {
                    setProvinceList(prev => prev = res.data.results);
                })
                .catch(err => console.log(err))
        }
        fetchProvinces();
        setValue('payment_method', 'Thanh toán khi nhận hàng');
    }, [])
    useEffect(() => {
        const productsPayload = cart.map((product) => {
            return {
                product_id: product._id,
                category_id: product.category_id,
                name: product.name,
                color: product.colors[0].label,
                quantity: product.quantity_order,
                price: product.discount,
                image: product.images[0],
            };
        });
        setValue("products", productsPayload);
    }, [cart]);
    const totalPrice = useMemo(() => {
        return cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity_order * currentValue.discount, 0)
    }, [cart])
    const onSubmit = async (data) => {

        if (isEmptyObject(customer)) {
            navigate('/login');
            return;
        }
        const { province, district, ward, ...rest } = data;
        const res = await dispatch(
            orderPrvSliceActions.createOrder({
                ...rest,
                user_id: customer._id,
                address: `${rest.address}, ${ward}, ${district}, ${province}`,
            })
        );
        if (data.payment_method === 'Thanh toán trực tuyến') {
            dispatch(clearCart());
            reset();
            await handleCheckoutOnline(data.products);
            return;
        }
        if (!res.payload.error) {
            toast.success("Đặt hàng thành công!");
            dispatch(clearCart());
            reset();
            navigate("/my-order/" + res.payload.data._id);
        }
    };
    const handleChangeColor = (color, id) => {
        const procPayload = getValues('products');
        const newPayload = procPayload.map(product => {
            if (product.product_id === id) {
                return { ...product, color: color }
            }
            return product;
        })
        setValue('products', newPayload)
    }
    const handleChangeProvince = async (ev) => {
        const provinceName = provinceList.find(province => province.province_id === ev.target.value).province_name;
        setValue('province', provinceName)
        await addressService.getDistricts(ev.target.value)
            .then(res => setDistrictList(prev => prev = res.data.results))
            .catch(err => console.log(err))
    }
    const handleChangeDistrict = async (ev) => {
        const districtName = districtList.find(district => district.district_id === ev.target.value).district_name;
        setValue('district', districtName)
        await addressService.getWards(ev.target.value)
            .then(res => setWardList(prev => prev = res.data.results))
            .catch(err => console.log(err))
    }
    const handleChangeWard = (ev) => {
        const wardName = wardList.find(ward => ward.ward_id === ev.target.value).ward_name;
        setValue('ward', wardName)
    }
    const handleCheckoutOnline = async (products) => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const res = await dispatch(checkoutPrvSliceActions.createCheckout({ products: products }));
        stripe.redirectToCheckout({
            sessionId: res.payload.id
        })
    }
    return (
        <Box
            backgroundColor="#F0F0F0"
            padding="18px 0"
            minHeight="100vh"
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            gap="16px"

        >
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    maxWidth: "650px"
                }}
                className="animate__animated animate__fadeInTopRight"
            >

                <Box
                    backgroundColor="white"
                    paddingX="24px"
                    paddingY="32px"
                    borderRadius="12px 12px 0 0"
                    display="flex"
                    flexDirection="column"
                    gap="18px"

                >
                    {cart.length > 0 &&
                        cart.map((product, index) => (
                            <Stack
                                key={index}
                                direction="row"
                                spacing={2}
                                sx={
                                    index > 0
                                        ? { borderTop: "1px solid #ccc", padding: "12px 0" }
                                        : { borderTop: "0px", padding: "12px 0" }
                                }
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap="6px"
                                    alignItems="center"
                                >
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/images/${product.images[0]}`}
                                        alt="Ảnh"
                                        className="w-16 h-16"
                                    />
                                    <ButtonBase
                                        sx={{
                                            color: "#9E9E9E",
                                            backgroundColor: "#FAFAFB",
                                            borderRadius: "6px",
                                            fontSize: "12px",
                                            padding: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        onClick={() => dispatch(removeProductInCart(product))}
                                    >
                                        <CloseIcon fontSize="8px" />
                                        Xóa
                                    </ButtonBase>
                                </Box>
                                <Box display="flex" flexDirection="column" gap="12px" flex="1">
                                    <Typography variant="h1" fontSize="1rem" fontWeight="300">
                                        {`${product.name} ${product.capacity}`}
                                    </Typography>
                                    <TextField
                                        select
                                        defaultValue={product.colors[0].label}
                                        size="small"
                                        sx={{
                                            width: "30%",
                                        }}
                                        onChange={(ev) => handleChangeColor(ev.target.value, product._id)}
                                    >
                                        {product.colors.length > 0 && product.colors.map((color) => (
                                            <MenuItem
                                                key={color.label}
                                                value={color.label}
                                                sx={{ padding: "12px" }}

                                            >{color.label}</MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        <Typography
                                            fontSize="1rem"
                                            textAlign="right"
                                            fontWeight="500"
                                        >
                                            {formatNumberWithDot(product.discount)}đ
                                        </Typography>
                                        <Typography
                                            fontSize="1rem"
                                            textAlign="right"
                                            fontWeight="400"
                                            color="gray"
                                            sx={{
                                                textDecoration: "line-through",
                                            }}
                                        >
                                            {formatNumberWithDot(product.price)}đ
                                        </Typography>
                                    </Box>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="flex-end"
                                        spacing={0.3}
                                    >
                                        <IconButton
                                            size="small"
                                            disabled={product.quantity_order === 1}
                                            sx={{
                                                fontSize: "12px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                                padding: "0",
                                            }}
                                            onClick={() =>
                                                dispatch(decreaseQuantityProductInCart(product))
                                            }
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <input
                                            type="text"
                                            value={product.quantity_order}
                                            className="text-center bg-[#F5F5F7] w-8 outline-blue-900 rounded-md"
                                        />
                                        <IconButton
                                            size="small"
                                            sx={{
                                                fontSize: "12px",
                                                border: "1px solid #ccc",
                                                borderRadius: "4px",
                                                padding: "0",
                                            }}
                                            onClick={() => {
                                                if (product.quantity_order === product.quantity) {
                                                    toast.warn("Đã hết số lượng!");
                                                    return;
                                                }
                                                dispatch(increasQuantityProductInCart(product));
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    </Stack>
                                </Box>
                            </Stack>
                        ))}
                    <Stack direction="row" justifyContent="space-between" spacing={2}>
                        <Typography fontSize="1rem" fontWeight="500">
                            Tạm tính
                            <Typography component="span" fontSize="1rem" fontWeight="400">
                                {" "}
                                ({cart.length} sản phẩm)
                            </Typography>
                        </Typography>
                        <Typography fontSize="1rem" fontWeight="500">
                            {formatNumberWithDot(totalPrice)}đ
                        </Typography>
                    </Stack>
                </Box>
                <Box
                    backgroundColor="white"
                    paddingX="32px"
                    paddingY="16px"
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                >
                    <Typography fontSize="1rem" fontWeight="500">
                        Thông tin khách hàng
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                error={!!errors.name}
                                color="warning"
                                type="text"
                                label="Họ và tên"
                                {...register("name", {
                                    required: "Vui lòng nhập họ và tên",
                                })}
                            />
                            {!!errors.name && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.name.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                type="tel"
                                error={!!errors.phone}
                                fullWidth
                                color="warning"
                                label="Số điện thoại"
                                {...register("phone", {
                                    required: "Vui lòng nhập số điện thoại",
                                })}
                            />
                            {!!errors.phone && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.phone.message}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    backgroundColor="white"
                    paddingX="32px"
                    paddingY="16px"
                    display="flex"
                    flexDirection="column"
                    gap="18px"
                >
                    <Typography fontSize="1rem" fontWeight="500">
                        Thông tin địa chỉ
                    </Typography>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            // backgroundColor: "#F5F5F7",
                            padding: "12px 6px",
                            borderRadius: "12px",
                        }}
                    >
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                error={!!errors.province}
                                select
                                defaultValue="default"
                                sx={{
                                    backgroundColor: "white",
                                    maxHeight: "500px"
                                }}

                                // {...register("province", {
                                //     required: "Vui lòng chọn tỉnh thành phố",
                                // })}
                                onChange={handleChangeProvince}
                            >
                                <MenuItem sx={{ display: "none" }} value="default">
                                    Chọn Tỉnh / Thành phố
                                </MenuItem>
                                {provinceList?.length > 0 && provinceList.map(province => (
                                    <MenuItem key={province.province_id} value={province.province_id}>{province.province_name}</MenuItem>
                                ))}


                            </TextField>
                            {!!errors.province && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.province.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                error={!!errors.district}
                                select
                                defaultValue="default"
                                sx={{
                                    backgroundColor: "white",
                                    maxHeight: "500px"
                                }}

                                onChange={handleChangeDistrict}
                            >
                                <MenuItem sx={{ display: "none" }} value="default">
                                    Chọn Quận / Huyện
                                </MenuItem>
                                {districtList.length > 0 && districtList.map(district => (
                                    <MenuItem key={district.district_id} value={district.district_id}>{district.district_name}</MenuItem>
                                ))}
                            </TextField>
                            {!!errors.district && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.district.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                error={!!errors.ward}
                                select
                                defaultValue="default"
                                sx={{
                                    backgroundColor: "white",
                                    maxHeight: "500px"
                                }}

                                onChange={handleChangeWard}
                            >
                                <MenuItem sx={{ display: "none" }} value="default">
                                    Chọn Phường / Xã
                                </MenuItem>
                                {wardList.length > 0 && wardList.map(ward => (
                                    <MenuItem key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</MenuItem>
                                ))}
                            </TextField>
                            {!!errors.ward && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.ward.message}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                error={!!errors.address}
                                color="warning"
                                type="text"
                                label="Số nhà, tên đường"
                                sx={{ backgroundColor: "white" }}
                                {...register("address", {
                                    required: "Vui lòng nhập địa chỉ",
                                })}
                            />
                            {!!errors.address && (
                                <Typography
                                    variant="span"
                                    color="red"
                                    fontSize="0.8rem"
                                    fontWeight="400"
                                >
                                    {errors.address.message}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        color="warning"
                        type="text"
                        label="Nhập ghi chú (nếu có)"
                        sx={{ backgroundColor: "white" }}
                        {...register("note")}
                    />
                </Box>
                <Box
                    backgroundColor="white"
                    paddingX="32px"
                    paddingY="16px"
                    display="flex"
                    flexDirection="column"
                    gap="18px"
                    borderRadius="0 0 12px 12px"
                >
                    <Typography fontSize="1rem" fontWeight="500">
                        Phương thức thanh toán
                    </Typography>
                    <FormGroup>
                        <RadioGroup
                            row
                            defaultValue="Thanh toán khi nhận hàng"
                            onChange={(ev) => setValue("payment_method", ev.target.value)}
                        >
                            <FormControlLabel
                                value="Thanh toán khi nhận hàng"
                                control={<Radio />}
                                label="Thanh toán khi nhận hàng"
                            />
                            <FormControlLabel
                                value="Thanh toán trực tuyến"
                                control={<Radio />}
                                label="Thanh toán trực tuyến"
                            />
                        </RadioGroup>
                    </FormGroup>
                </Box>
                <Box
                    backgroundColor="white"
                    paddingX="32px"
                    paddingY="16px"
                    display="flex"
                    flexDirection="column"
                    gap="18px"
                    borderRadius="0 0 12px 12px"
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                            paddingY: "12px",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <Typography fontSize="1rem" fontWeight="600">
                            Tổng tiền:
                        </Typography>
                        <Typography fontSize="1rem" fontWeight="500" color="red">
                            {formatNumberWithDot(totalPrice)}đ
                        </Typography>
                    </Stack>
                    {/* <FormGroup>
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Tôi đồng ý với Chính sách xử lý dữ liệu cá nhân của cửa hàng"
                        />
                    </FormGroup> */}
                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Đặt hàng
                    </Button>
                </Box>


            </Container>
        </Box >
    )
}