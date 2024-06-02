import { useNavigate } from "react-router-dom";
import { formatNumberWithDot } from "../../helpers/handleFormatNumber";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
export default function ProductCard({ product }) {
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#323232",
                borderRadius: "1.5rem",
                overflow: "hidden",
                paddingBottom: "4rem",
                cursor: "pointer",
            }}
            className="animate__animated animate__fadeInDown"
            onClick={() => navigate(`/product/${product._id}`)}
        >
            <CardMedia
                component="img"
                image={`${process.env.REACT_APP_API_URL}/images/${product.images[0]}`}
                alt="Anh"
            >
            </CardMedia>
            <CardContent className="flex flex-col gap-6 items-center pt-4">
                <Typography
                    color="white"
                    fontSize="1rem"
                    fontWeight="500">
                    {product.name}
                </Typography>
                {!!product.version ?
                    <Stack
                        direction="row"
                        sx={{
                            backgroundColor: "black",
                            padding: "0.5rem",
                            border: "1px solid #535353",
                            borderRadius: "0.75rem",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                    >
                        {product.version}
                    </Stack> :
                    <Stack
                        direction="row"
                        sx={{
                            backgroundColor: "black",
                            padding: "0.5rem",
                            border: "1px solid #535353",
                            borderRadius: "0.75rem",
                            color: "white",
                            fontSize: "1rem",
                            fontWeight: "500",
                        }}
                    >
                        {product.capacity}
                    </Stack>
                }
                <Stack direction="row">
                    {product?.discount > 0 ?
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >
                            <Typography
                                component="h1"
                                color="white"
                                fontWeight="500"
                                fontSize="1.25rem"
                            >
                                {formatNumberWithDot(product.discount)}đ
                            </Typography>
                            <Typography
                                color="white"
                                fontWeight="500"
                                fontSize="1rem"
                                sx={{
                                    textDecorationLine: "line-through"
                                }}
                            >
                                {formatNumberWithDot(product.price)}đ
                            </Typography>
                            <Typography
                                component="span"
                                color="white"
                                fontWeight="400"
                                fontSize="1rem"
                            >
                                -{100 - Math.round(product.discount / product.price * 100)}%
                            </Typography>
                        </Stack> :
                        <Typography
                            component="h1"
                            color="white"
                            fontWeight="500"
                            fontSize="1.25rem"
                        >
                            {formatNumberWithDot(product.price)}đ
                        </Typography>
                    }
                </Stack>
            </CardContent>
        </Card>
    );
}