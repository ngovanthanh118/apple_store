import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { banners } from '../../configs/data/banner';
export default function Slide() {
    return (
        <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            pagination
            autoplay={{
                disableOnInteraction: false,
            }}
            effect="fade"
        >
            {banners.map((banner, index) => (
                <SwiperSlide key={index}>
                    <img src={banner} alt="ảnh" className='w-full cursor-pointer' />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
