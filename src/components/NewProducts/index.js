import { useState, useEffect } from "react";
import axios from "axios";
import BoxProduct from "../BoxProduct";
export default function NewProducts() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('/products')
            .then((products) => setData(products.data))
            .catch((error) => console.error(error))
    }, []);
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    return (
        <div className="p-8 bg-gray-200 h-screen">
            <h1 className="text-black font-normal text-4xl my-2">New Products</h1>
            <div className="grid grid-cols-4 gap-5 p-4 w-full ">
                {data.slice(0, 8).map(product => (
                    <BoxProduct key={product.id} product={product} />
                ))
                }
            </div>
        </div>

    )
}