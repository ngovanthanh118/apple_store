import { useEffect } from "react";
import BoxProduct from "../BoxProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
export default function NewProducts({ products }) {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <h1 className="text-black font-normal text-4xl my-2">New Products</h1>
            <Swiper
                modules={[Navigation]}
                slidesPerView={4}
                spaceBetween={20}
                navigation={{
                    enabled: true,
                }}
            >
                {products.map(product => (
                    <SwiperSlide key={product._id} >
                        <BoxProduct product={product} />
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </div >

    )
}