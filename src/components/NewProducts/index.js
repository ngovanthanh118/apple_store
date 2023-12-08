import { useEffect } from "react";
import BoxProduct from "../BoxProduct";
export default function NewProducts({product}) {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <div className="p-8 bg-gray-200 min-h-screen">
            <h1 className="text-black font-normal text-4xl my-2">New Products</h1>
            <div className="grid grid-cols-4 gap-5 p-4 w-full ">
                {product.map(product => (
                    <BoxProduct key={product._id} product={product} />
                ))
                }
            </div>
        </div>

    )
}