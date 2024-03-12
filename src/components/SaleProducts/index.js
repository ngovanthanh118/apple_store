import { useEffect, useState } from "react";
import BoxProduct from "../BoxProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
export default function SaleProducts({ products }) {
    const [slidePreview, setSlidePreview] = useState(4);
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        if (window.innerWidth <= 767) {
            setSlidePreview(1);
        }
        if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
            setSlidePreview(3);
        }
    }, []);
    //mobile 1
    //tablet 3
    return (
        <div id="sale-product">
            <h1 className="font-bold text-4xl text-gray-800 text-center my-6">Sale-off Products</h1>
            <Swiper
                modules={[Navigation]}
                slidesPerView={slidePreview}
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