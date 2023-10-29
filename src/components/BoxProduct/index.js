import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Contexts";
export default function BoxProduct({ product }) {
    const { addProduct } = useContext(Context);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col bg-white rounded-lg border-gray-300 border-2 border-solid shadow-md box-product">
            <div className="relative ">
                <img className="img-product cursor-pointer" src={product.img} alt='' onClick={() => navigate('/product/' + product.id)} />
                <div className="absolute top-2 right-2 cursor-pointer" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="w-6 h-6 icon-like">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                </div>
            </div>
            <div className="flex justify-between items-center border-t-2 border-gray-200 px-3 py-4">
                <h3 className="text-black font-normal text-lg">{product.name}</h3>
                <span className="text-black font-normal text-lg">{product.storage}</span>
            </div>
            <div className="flex justify-between items-center px-3 pb-3">
                <h1 className="font-bold text-2xl text-black">${product.price}</h1>
                <Link className="rounded-2xl outline outline-green-900 outline-2 text-green-900 px-4 py-1 cursor-pointer flex gap-2 items-center btn-add"
                    onClick={() => addProduct({ ...product })}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span className="font-medium text-sm">Add to cart</span>
                </Link>
            </div>
        </div>
    );
}