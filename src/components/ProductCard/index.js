import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Contexts";
import { formatNumberWithDot } from "../../ultis";
export default function ProductCard({ product }) {
    const { addProduct } = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center bg-[#323232] rounded-2xl cursor-pointer overflow-hidden box-product">
            <div className="relative ">
                <img className="img-product cursor-pointer" src={`${process.env.REACT_APP_API_URL}/images/${product.image[0]}`} alt='' onClick={() => navigate(`/product/${product.url}/${product._id}`)} width="250px" height="250px" />
                <div className="absolute top-2 right-2" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-6 h-6 icon-like">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
            </div>
            <div>
                <p className="text-white font-normal text-sm">{product.name}</p>
            </div>
            <div className="mobile-add-cart flex justify-between items-center px-3 pb-3">
                {product?.discount > 0 ?
                    <div className="flex gap-2 items-center">
                        <h1 className="font-bold text-xl text-white">{formatNumberWithDot(product.discount)}đ</h1>
                        <p className="font-normal text-base text-white line-through">{formatNumberWithDot(product.price)}đ</p>
                        <span className="text-white text-base font-normal ">-{100 - Math.round(product.discount / product.price * 100)}%</span>
                    </div> :
                    <h1 className="font-bold text-xl text-white">{formatNumberWithDot(product.price)}đ</h1>
                }
            </div>
        </div>
    );
}