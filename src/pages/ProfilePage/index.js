import { Card, CardContent, Stack, Typography, Box, CardActions, Button, TextField, FormControl, InputLabel, Input, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { customerPrvSliceActions, selectCustomer } from "../../stores/slices/customerSlice";
import { FindReplaceOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function ProfilePage() {
    const customer = useSelector(selectCustomer);
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [imageUpdate, setImageUpdate] = useState('');
    const [imageShowUrl, setImageShowUrl] = useState('');
    useEffect(() => {
        setName(prev => prev = customer.name);
        setPhone(prev => prev = customer.phone);
        setAddress(prev => prev = customer.address);
        if (!!customer.image) {
            setImage(prev => prev = customer.image);
        }
    }, [customer])
    const handleChangeFile = (ev) => {
        const file = ev.target.files[0];
        const url = URL.createObjectURL(file);
        setImageUpdate(prev => prev = file);
        setImageShowUrl(prev => prev = url)
    }
    const handleUpdateProfile = async () => {
        const res = await dispatch(customerPrvSliceActions.updateProfile({
            id: customer._id,
            name: name,
            phone: phone,
            address: address,
            image: imageUpdate,
            password: password,
        }))
        if (!res.payload.error) {
            toast.success("Cập nhật tài khoản thành công!");
            return;
        }
        toast.error("Cập nhật tài khoản thất bại!");
    }
    return (
        <Box display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            backgroundColor="#F0F0F0"
            padding="12px"
        >
            <Container

                className="animate__animated animate__fadeInTopRight"
                sx={{
                    padding: "16px",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    maxWidth: {
                        sm: "600px !important"
                    }
                }}
            >
                <Card sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "32px",
                    padding: "12px"
                }}>

                    <CardContent sx={{ padding: "6px" }}>
                        <Box display="flex" gap="18px" alignItems="flex-start">
                            <InputLabel htmlFor="image" sx={{ cursor: "pointer" }}>
                                {!!!imageShowUrl && <img src={`${process.env.REACT_APP_API_URL}/images/${image}`} alt="Ảnh" width="100px" height="100px" />}
                                {!!imageShowUrl && <img src={imageShowUrl} alt="Ảnh" width="100px" height="100px" />}
                            </InputLabel>
                            <Input type="file" id="image" sx={{ display: "none" }} onChange={handleChangeFile} />
                            <Stack direction="column" spacing={1}>
                                <Typography variant="h1" fontSize="1rem" fontWeight="500">{customer.name}</Typography>
                                <Typography fontSize=".9rem" fontWeight="400">{customer.email}</Typography>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
                <Card sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "end",
                    justifyContent: "space-between",
                    padding: "12px"
                }}>
                    <CardContent sx={{ padding: "6px" }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">Tên</Typography>
                            <Input onChange={(ev) => setName(ev.target.value)} size="small" value={name} sx={{ fontSize: "0.9rem" }} />
                            {/* <Typography fontSize="0.9rem">{customer.name}</Typography> */}
                        </Stack>
                    </CardContent>

                </Card>
                <Card sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "end",
                    justifyContent: "space-between",
                    padding: "12px"
                }}>
                    <CardContent sx={{ padding: "6px" }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">Số điện thoại</Typography>
                            <Input onChange={(ev) => setPhone(ev.target.value)} size="small" value={phone} sx={{ fontSize: "0.9rem" }} />
                        </Stack>
                    </CardContent>

                </Card>
                <Card sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "end",
                    justifyContent: "space-between",
                    padding: "12px"
                }}>
                    <CardContent sx={{ padding: "6px" }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">Địa chỉ</Typography>
                            <Input onChange={(ev) => setAddress(ev.target.value)} size="small" value={address} sx={{ fontSize: "0.9rem" }} />
                        </Stack>
                    </CardContent>

                </Card>
                <Card sx={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "end",
                    justifyContent: "space-between",
                    padding: "12px"
                }}>
                    <CardContent sx={{ padding: "6px" }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">Mật khẩu mới</Typography>
                            <TextField
                                size="small"
                                type="password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                            />
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FindReplaceOutlined />}
                            onClick={handleUpdateProfile}
                        >
                            Cập nhật
                        </Button>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    )
}