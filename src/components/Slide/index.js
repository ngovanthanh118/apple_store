import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Contexts';
export default function Slide({ products }) {
    const { addProduct } = useContext(Context);
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
            {products.map(product => (
                <SwiperSlide key={product._id} className='slide'>
                    <div id="slide" className='mobile-slide flex justify-around items-center p-8'>
                        <div className='flex flex-col'>
                            <h1 className='font-medium text-4xl text-white mb-6 opacity-90'>{product.name}</h1>
                            <p className='max-w-xl text-justify text-white text-base mb-7 opacity-60 leading-7'>
                                {product.description}
                            </p>
                            <div className='flex gap-6 items-center'>
                                <Link className='text-white font-medium outline outline-2 outline-white rounded-3xl cursor-pointer px-10 py-2 btn-read' to={'/product/' + product._id}>Read more</Link>
                                <Link className='text-green-800 bg-white outline outline-transparent outline-2 rounded-3xl px-6 py-2 cursor-pointer font-medium flex gap-2 items-center btn-add'
                                    onClick={() => addProduct({ ...product })}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                    <span>Add to cart</span>
                                </Link>
                            </div>
                        </div>
                        <img src={"https://apple-store-server.vercel.app/api/v1/images/" + product.image[0]} width="600px" height="800px" alt="" />
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    )
}
