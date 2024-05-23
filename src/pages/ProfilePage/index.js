import { Card, CardContent, CardMedia, IconButton, Stack, Typography, Box, CardActions, Button, TextField, FormControl, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCustomer } from "../../stores/slices/customerSlice";
import { EditOutlined, Email, FileUploadOutlined, FindReplaceOutlined } from "@mui/icons-material";
export default function ProfilePage() {
    const customer = useSelector(selectCustomer);
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{
            minHeight: "100vh",
            backgroundColor: "#F0F0F0",
        }}>
            <Box
                display="flex"
                flexDirection="column"
                minWidth="500px"
                padding="12px"
                gap="16px"
                backgroundColor="white"
            >
                <Card sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "32px",
                    padding: "12px"
                }}>
                    <CardMedia
                        component="img"
                        image={!!!customer.image ?
                            customer.image
                            : `${process.env.PUBLIC_URL}/images/empty_image.png`
                        }
                        sx={{
                            maxWidth: "80px"
                        }}
                    />
                    <CardContent sx={{ padding: "6px" }}>
                        <Stack direction="column" spacing={1}>
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">{customer.name}</Typography>
                            <Typography fontSize=".9rem" fontWeight="400">{customer.email}</Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <IconButton sx={{
                                    padding: "0px"
                                }}>
                                    <Email />
                                </IconButton>
                                <FormControl>
                                    <InputLabel>
                                        <IconButton sx={{
                                            padding: "0px"
                                        }}>
                                            <FileUploadOutlined />
                                        </IconButton>
                                    </InputLabel>
                                </FormControl>
                            </Stack>
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
                            <Typography variant="h1" fontSize="1rem" fontWeight="500">Tên</Typography>
                            <Typography fontSize="0.9rem">{customer.name}</Typography>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </CardActions>
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
                            <Typography fontSize="0.9rem">{customer.phone}</Typography>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </CardActions>
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
                            <Typography fontSize="0.9rem">{customer.address}</Typography>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<EditOutlined />}
                        >
                            Chỉnh sửa
                        </Button>
                    </CardActions>
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
                            />
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<FindReplaceOutlined />}
                        >
                            Cập nhật
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Stack>
    )
}