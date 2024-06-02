import { Button, Card, CardActions, CardContent, CardHeader, Stack, Typography, Box, FormControl, TextField, Grid, CardMedia, Container } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { customerPrvSliceActions } from "../../stores/slices/customerSlice";
export default function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({ mode: "onChange" })
    const onSubmit = async (data) => {
        const res = await dispatch(customerPrvSliceActions.siginUp(data));
        if (res.payload) {
            navigate('/');
        }
    }
    return (
        <Box backgroundColor="#F0F0F0" display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <form className="w-1/3 max-md:w-full px-4 animate__animated animate__fadeInTopRight">
                <Card>

                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        <Typography variant="h1" fontSize="2rem" fontWeight="500" textAlign="center">Đăng ký</Typography>
                        <FormControl>
                            <Box display="flex" gap="6px">
                                <Typography component="label" htmlFor="name" fontSize="0.9rem" fontWeight="500">Họ và tên</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                size="small"
                                type="text"
                                spellCheck={false}
                                id="name"
                                error={!!errors.name}
                                {...register('name', {
                                    required: "Họ và tên không được để trống"
                                })}
                                helperText={!!errors.name && errors.name.message}
                            />
                        </FormControl>
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
                                <Typography component="label" htmlFor="phone" fontSize="0.9rem" fontWeight="500">Số điện thoại</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                size="small"
                                type="tel"
                                id="phone"
                                error={!!errors.phone}
                                {...register('phone', {
                                    required: "Số điện thoại không được để trống",
                                    pattern: {
                                        value: /(((\+|)84)|0)(3|5|7|8|9)([0-9]{8})\b/,
                                        message: "Số điện thoại không hợp lệ"
                                    }
                                })}
                                helperText={!!errors.phone && errors.phone.message}
                            />
                        </FormControl>
                        <FormControl>
                            <Box display="flex" gap="6px">
                                <Typography component="label" htmlFor="password" fontSize="0.9rem" fontWeight="500">Mật khẩu</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                size="small"
                                type="password"
                                id="password"
                                error={!!errors.password}
                                {...register('password', {
                                    required: "Mật khẩu không được để trống"
                                })}
                                helperText={!!errors.password && errors.password.message}
                            />
                        </FormControl>
                        <FormControl>
                            <Box display="flex" gap="6px">
                                <Typography component="label" htmlFor="confirmPassword" fontSize="0.9rem" fontWeight="500">Xác nhận mật khẩu</Typography>
                                <Typography color="red">*</Typography>
                            </Box>
                            <TextField
                                size="small"
                                type="password"
                                id="confirmPassword"
                                error={!!errors.confirmPassword}
                                {...register('confirmPassword', {
                                    validate: (value) => {
                                        return (
                                            getValues('password') === value || 'Mật khẩu không khớp'
                                        )
                                    }
                                })}
                                helperText={!!errors.confirmPassword && errors.confirmPassword.message}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    }}>
                        <Button fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>Đăng ký</Button>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <Typography variant="">Đã có tài khoản</Typography>
                            <Link to="/login" className="text-blue-600 underline align-middle">Đăng nhập</Link>
                        </Stack>
                    </CardActions>
                </Card>
            </form>
        </Box>

    )
}