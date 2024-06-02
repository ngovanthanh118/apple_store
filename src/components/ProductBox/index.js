import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";
import { Container, Box, Typography } from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
export default function ProductBox({ title, products }) {
    return (
        <Container className="animate__animated animate__fadeInDown">
            {products?.length > 0 && (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 4,
                            spaceBetween: 30
                        }
                    }}
                >
                    {products.length > 0 && products.map(product => (
                        <SwiperSlide key={product._id} className="slide">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap="12px"
                        marginY="2.5rem"
                        slot="container-start"
                        color="white"
                    >
                        <AppleIcon
                            sx={{
                                width: "36px",
                                height: "36px"
                            }}
                        />
                        <Typography
                            color="white"
                            fontWeight="500"
                            fontSize="2.25rem"
                        >
                            {title}
                        </Typography>
                    </Box>
                </Swiper>)}
        </Container>
    )
}