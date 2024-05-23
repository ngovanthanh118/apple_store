import { Button, Card, CardActions, CardContent, CardHeader, Stack, Typography, Box, FormControl, TextField, Grid, CardMedia, FormLabel } from "@mui/material"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { customerPrvSliceActions } from "../../stores/slices/customerSlice";
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
        }
    }
    return (
        <Grid container spacing={4} px="120px" py="64px" backgroundColor="#F0F0F0">
            <Grid item xs={5}>
                <form>
                    <Card>
                        <CardHeader
                            title="Đăng nhập"
                        />
                        <CardContent sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px"
                        }}>
                            <FormControl>
                                <Typography component="label" htmlFor="email" fontSize="0.9rem" fontWeight="500">Email</Typography>
                                <TextField
                                    error={!!errors.email}
                                    size="small"
                                    type="email"
                                    id="email"
                                    {...register('email', {
                                        required: "Email không được để trống"
                                    })}
                                    helperText={!!errors.email && errors.email.message}
                                />
                            </FormControl>
                            <FormControl>
                                <Typography component="label" htmlFor="password" fontSize="0.9rem" fontWeight="500">Mật khẩu</Typography>
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
            </Grid>
            <Grid item xs={7}>
                <Box>
                    <img src={`${process.env.PUBLIC_URL}/images/login_background.jpg`} />
                </Box>
            </Grid>
        </Grid>
    )
}