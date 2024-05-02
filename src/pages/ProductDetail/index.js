import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../components/Contexts";
import productService from "../../services/productService";

export default function ProductDetail() {
    const { _id } = useParams();
    const [data, setData] = useState([]);
    const { addProduct } = useContext(Context);
    useEffect(() => {
        const fetchProduct = async () => {
            await productService.getProduct(_id)
                .then(res => {
                    setData(prev => prev = res.data);
                    console.log(res.data);
                })
                .catch(err => console.log(err))
        }
        fetchProduct();
        window.scroll(0, 0);
    }, [_id])
    return (
        <div className="p-8">
            <div className="mobile-product-detail mt-26 flex gap-6">
                <div className="bg-white rounded-xl">
                    <img src={`${process.env.REACT_APP_API_URL}/images/${data?.image[0]}`} alt="anh" />
                    <div className="flex gap-2">
                        {data.image.map((img, index) => (
                            <img key={index} src={`${process.env.REACT_APP_API_URL}/images/${img}`} alt="anh" width="80px" height="80px" />
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <h1 className="text-3xl font-bold">{data.name}</h1>
                    <p className="text-justify leading-7 mt-2">{data.description}</p>
                    <div className="flex flex-col gap-2 my-1">
                        <div className="flex">
                            <p className="w-20">Color: </p>
                            <div className="flex gap-2 items-center">
                                {data.color?.map((clr, index) => (
                                    <div key={index} style={{ backgroundColor: clr }} className="w-6 h-6 rounded-sm"></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex">
                            <p className="w-20">Status: </p>
                            <p>{data.status}</p>
                        </div>
                        <div className="flex">
                            <p className="w-20">Quantity: </p>
                            <p>{data.quantity}</p>
                        </div>
                    </div>
                    <div className="flex gap-8 items-center py-1 mt-4">
                        {data.discount > 0 ? (
                            <div className="flex gap-2 items-center">
                                <h1 className="font-bold text-2xl text-red-600 line-through">${data.price}</h1>
                                <h1 className="font-bold text-2xl text-black">${data.discount}</h1>
                            </div>
                        ) :
                            (<h1 className="font-bold text-2xl text-black">${data.price}</h1>)
                        }
                        <Link className="rounded-2xl outline outline-green-900 outline-2 text-green-900 px-4 py-1 cursor-pointer flex gap-2 items-center btn-add"
                            onClick={() => addProduct({ ...data })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="font-medium text-sm ">Add to cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold my-4">Specifications</h1>
                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <p className="w-40">Size: </p>
                        <p>{data.size}</p>
                    </div>
                    <div className="flex">
                        <p className="w-40">Capacity: </p>
                        <div className="flex gap-2 items-center text-white">
                            {data.capacity.map((cap, index) => (
                                <p key={index} className="bg-[#1C1C1D] px-3 py-2">{cap}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}