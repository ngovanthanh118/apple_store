import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategorySevice from "../../../services/categorySevice";
import { selectCart } from "../../../stores/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    ButtonBase,
    FormControl,
    Input,
    Modal,
    Stack,
    Menu,
    MenuItem,
    ListItemIcon
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
    AppRegistration
} from '@mui/icons-material';
import { customerPrvSliceActions, logout, selectCustomer } from "../../../stores/slices/customerSlice";
import isEmptyObject from "../../../helpers/handleEmptyObject";
export default function Header() {
    const cart = useSelector(selectCart);
    const customer = useSelector(selectCustomer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isOpenModalSearch, setIsOpenModalSearch] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { cate_url } = useParams();
    useEffect(() => {
        const fetchAllCategories = async () => {
            await CategorySevice.getAllCategories()
                .then(res => setCategories(prev => prev = res.data))
                .catch(err => { throw new Error(err) })
        }
        fetchAllCategories();
    }, []);
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position="sticky"
            width="100%"
            zIndex="10"
            top="0"
            padding="0 10rem"
            backgroundColor="black"
            component="header"
        >
            <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
            <Stack
                direction="row"
                spacing={2}
            >
                {categories.map(category => (
                    <Link key={category._id}
                        className={cate_url === category.name.toLowerCase()
                            ? "text-white text-sm text-center px-10 text-nowrap bg-[#2D2D2D] h-full py-5"
                            : "text-white text-sm text-center px-10 py-5 text-nowrap hover:bg-[#2D2D2D]"
                        } to={`category/${category.url}/${category._id}`}>{category.name}
                    </Link>
                ))}
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
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
                        borderRadius: "50%"
                    }}
                >
                    <Search />
                </ButtonBase>
                <Modal
                    open={isOpenModalSearch}
                    onClose={() => setIsOpenModalSearch(false)}
                    sx={{
                        zIndex: "100"
                    }}
                >
                    <FormControl
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "1rem",
                            position: "relative",
                        }}
                    >
                        <Input
                            autoFocus={true}
                            startAdornment={<Search />}
                            endAdornment={<Close
                                onClick={() => setIsOpenModalSearch(false)}
                                sx={{
                                    cursor: "pointer"
                                }}
                            />}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "50%",
                                fontSize: "0.9rem",
                                color: "white",
                                position: "absolute",
                                top: "64px",
                                paddingY: "6px"
                            }}
                            placeholder="Tìm kiếm sản phẩm" />
                    </FormControl>
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
        </Box >
    )
}