import { Button, Card, CardActions, CardContent, CardHeader, Stack, Typography, Box, FormControl, TextField, Grid, CardMedia, FormLabel, Container } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { customerPrvSliceActions } from "../../stores/slices/customerSlice";
import { toast } from "react-toastify";
export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" })
    const onSubmit = async (data) => {
        const res = await dispatch(customerPrvSliceActions.signIn(data));
        if (res.payload) {
            navigate('/');
            return;
        }
        toast.error('Tài khoản hoặc mật khẩu không chính xác');
    }
    return (
        <Box backgroundColor="#F0F0F0" minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
            <form className="w-1/3 max-md:w-full px-4 animate__animated animate__fadeInTopRight">
                <Card>

                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        <Typography variant="h1" fontSize="2rem" fontWeight="500" textAlign="center">Đăng nhập</Typography>
                        <FormControl>
                            <Box display="flex" gap="6px">
                                <Typography component="label" htmlFor="email" fontSize="0.9rem" fontWeight="500">Email</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                error={!!errors.email}
                                size="small"
                                type="email"
                                id="email"
                                {...register('email', {
                                    required: "Email không được để trống",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Email không hợp lệ"
                                    }
                                })}
                                helperText={!!errors.email && errors.email.message}
                            />
                        </FormControl>
                        <FormControl>
                            <Box display="flex" gap="6px">
                                <Typography component="label" htmlFor="password" fontSize="0.9rem" fontWeight="500">Mật khẩu</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                error={!!errors.password}
                                margin="none"
                                type="password"
                                size="small"
                                id="password"
                                {...register('password', {
                                    required: "Mật khẩu không được để trống"
                                })}
                                helperText={!!errors.password && errors.password.message}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        <Button fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>Đăng nhập</Button>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <Typography variant="span">Bạn chưa có tài khoản?</Typography>
                            <Link to="/register" className="text-blue-600 underline align-middle">Đăng ký</Link>
                        </Stack>
                    </CardActions>
                </Card>
            </form>
        </Box>
    )
}