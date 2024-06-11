import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectCart } from "../../../stores/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    ButtonBase,
    Input,
    Modal,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon,
    Typography,
    Divider,
    IconButton
} from "@mui/material";
import {
    Search,
    ShoppingCart,
    AccountCircle,
    Close,
    Person,
    LocalMall,
    Login,
    Logout,
    AppRegistration,
    CircleNotifications,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { customerPrvSliceActions, selectCustomer } from "../../../stores/slices/customerSlice";
import isEmptyObject from "../../../helpers/handleEmptyObject";
import { searchPrvSliceActions } from "../../../stores/slices/searchSlice";
import { formatNumberWithDot } from "../../../helpers/handleFormatNumber";
import { selectCategories } from "../../../stores/slices/categorySlice";
import { notificationPrvSliceActions } from "../../../stores/slices/notificationSlice";
export default function Header() {
    const { cate_id } = useParams();
    const categories = useSelector(selectCategories)
    const cart = useSelector(selectCart);
    const customer = useSelector(selectCustomer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [resultSearch, setResultSearch] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isShowNavBar, setIsShowNavBar] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorElNotification, setAnchorElNotification] = useState(null);
    const openNotification = Boolean(anchorElNotification);
    const handleClickNotification = async (event) => {
        setAnchorElNotification(event.currentTarget);
        const res = await dispatch(notificationPrvSliceActions.getNotificationList())
        setNotifications(prev => prev = res.payload.data)
    };
    const handleCloseNotification = () => {
        setAnchorElNotification(null);
    };
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const res = await dispatch(searchPrvSliceActions.searchProducts(keyword));
        if (!res.payload.error) {
            setResultSearch(prev => prev = res.payload.data);
            return;
        }
        setResultSearch(prev => prev = [])
    }

    return (
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            px={{ sm: "10rem" }}
            sx={{
                position: "sticky",
                width: "100%",
                zIndex: "10",
                top: "0",
                backgroundColor: "black",
                paddingX: {
                    sm: "18px !important",
                    md: "128px !important"
                }
            }}
            component="header"
        >
            <Stack direction="row"
                justifyContent={{ xs: "space-between" }}
                alignItems={{ xs: "center" }}
                width={{ xs: "100%", sm: "fit-content" }}>
                <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
                <IconButton sx={{
                    color: "white", display: {
                        xs: "block",
                        sm: "none"
                    }
                }}
                    onClick={() => setIsShowNavBar(prev => !prev)}
                >
                    <MenuIcon />
                </IconButton>
            </Stack>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                spacing={{ xs: 1, sm: 2, md: 4 }}
                width={{ xs: "100%" }}
                flex="1"
                sx={{
                    display: {
                        xs: isShowNavBar ? 'flex' : 'none',
                        sm: 'flex'
                    }
                }}

            >
                {categories.length > 0 && categories.map(category => (
                    <Link key={category._id}
                        className={cate_id === category._id
                            ? "text-white text-sm !ml-0 text-center px-12 max-md:px-3 max-md:text-left text-nowrap bg-[#2D2D2D] h-full py-5"
                            : "text-white text-sm !ml-0 text-center px-12 max-md:px-3 max-md:text-left py-5 text-nowrap hover:bg-[#2D2D2D]"
                        } to={`category/${category._id}`}>{category.name}
                    </Link>
                ))}

            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                p={1}
                sx={{
                    display: {
                        xs: isShowNavBar ? 'flex' : 'none',
                        sm: 'flex'
                    },
                }}
            >
                <Link to='/cart' className="rounded-full p-2 flex items-center text-white bg-[#2f3033] relative">
                    <ShoppingCart />
                    <span className="absolute text-sm -top-2 -right-3 text-red-600 font-medium bg-white rounded-[50%] px-2">{cart?.length}</span>
                </Link>
                <ButtonBase
                    onClick={() => setIsOpenModalSearch(true)}
                    sx={{
                        color: "white",
                        backgroundColor: "#2f3033",
                        padding: "8px",
                        borderRadius: "50%",
                    }}
                >
                    <Search />
                </ButtonBase>
                <Modal
                    open={isOpenModalSearch}
                    onClose={() => setIsOpenModalSearch(false)}
                    sx={{
                        zIndex: "100",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: "80px 0",

                    }}
                >
                    <Box display="flex" gap="8px" flexDirection="column" alignItems="center" width="100%">
                        <Box component="form" onSubmit={handleSubmit} width={{ xs: "80%", sm: "30%" }}>
                            <Input
                                fullWidth
                                value={keyword}
                                onChange={(ev) => setKeyword(ev.target.value)}
                                startAdornment={<Search sx={{ color: "white" }} />}
                                endAdornment={<Close sx={{ color: "white", cursor: "pointer" }}
                                    onClick={() => setIsOpenModalSearch(false)}
                                />}
                                sx={{ color: "white", paddingY: "8px", display: "flex", gap: "12px" }}
                                placeholder="Tìm kiếm sản phẩm"
                            />
                        </Box>
                        {resultSearch.length > 0 &&
                            <Box display="flex" flexDirection="column" alignItems="center" gap="18px" padding="18px 12px" backgroundColor="white" borderRadius="0 0 18px 18px" width="30%">
                                {resultSearch.map((product) => (
                                    <Box display="flex" alignItems="flex-start" gap="18px" width="100%" sx={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate(`/product/${product._id}`);
                                            setIsOpenModalSearch(false)
                                        }}>
                                        <img src={`${process.env.REACT_APP_API_URL}/images/${product.images[0]}`} alt="Anh" className="w-16 h-16" />
                                        <Box display="flex" flexDirection="column" gap="8px">
                                            <Typography fontSize="1rem" fontWeight="400">{product.name} {product.capacity}</Typography>
                                            {product?.discount > 0 ?
                                                <Box display="flex" alignItems="center" gap="8px" >
                                                    <Typography variant="h1" fontWeight="500" fontSize="1.15em">{formatNumberWithDot(product.discount)}đ</Typography>
                                                    <Typography fontWeight="400" fontSize="1rem" sx={{ textDecoration: "line-through" }}>{formatNumberWithDot(product.price)}đ</Typography>
                                                    <Typography variant="span" fontSize="1rem" fontWeight="400" >-{100 - Math.round(product.discount / product.price * 100)}%</Typography>
                                                </Box> :
                                                <Typography variant="h1" fontWeight="500" fontSize="1.15rem">{formatNumberWithDot(product.price)}đ</Typography>
                                            }
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        }
                    </Box>
                </Modal>
                <ButtonBase
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "50%",
                        color: "white",
                        backgroundColor: "#2f3033",
                        padding: "8px"
                    }}
                    onClick={handleClickNotification}
                >
                    <CircleNotifications />
                </ButtonBase>
                <Menu
                    anchorEl={anchorElNotification}
                    open={openNotification}
                    onClose={handleCloseNotification}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            width: {
                                xs: "100%",
                                sm: "20%"
                            },
                            padding: "12px",
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Box display="flex" flexDirection="column" gap="18px" width="100%">
                        <Typography variant="h1" fontSize="1rem" fontWeight="500">Thông báo</Typography>
                        <Divider />
                        {notifications.length > 0 && notifications.map(noti => (
                            <Box display="flex" flexDirection="column" gap="8px">
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">{noti.title}</Typography>
                                <Typography fontSize="0.9rem" fontWeight="400">{noti.content}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Menu>
                <ButtonBase
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "50%",
                        color: "white",
                        backgroundColor: "#2f3033",
                        padding: "8px"
                    }}
                    onClick={handleClick}
                >
                    <AccountCircle />
                </ButtonBase>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {isEmptyObject(customer) ?
                        <Box>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Login />
                                </ListItemIcon>
                                <Link className="w-full" to="/login">Đăng nhập</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <AppRegistration />
                                </ListItemIcon>
                                <Link className="w-full" to="/register">Đăng ký</Link>
                            </MenuItem>
                        </Box>
                        :
                        <Box>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <Link className="w-full" to="/profile">Hồ sơ</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <ListItemIcon>
                                    <LocalMall />
                                </ListItemIcon>
                                <Link className="w-full" to="/my-order">Đơn hàng của tôi</Link>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(customerPrvSliceActions.logout());
                                navigate('/');
                                handleClose();
                            }}>
                                <ListItemIcon>
                                    <Logout />
                                </ListItemIcon>
                                Đăng xuất
                            </MenuItem>
                        </Box>
                    }

                </Menu>
            </Stack>
        </Stack >
    )
}