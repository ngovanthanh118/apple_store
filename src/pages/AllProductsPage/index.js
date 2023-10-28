import { useState, useEffect } from "react";
import axios from "axios";
import BoxProduct from "../../components/BoxProduct";
export default function Products() {
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
        <div className="bg-gray-200">
            <h1 className="text-black font-bold text-4xl ml-16 pt-8 mb-4">All products</h1>
            <div className="grid grid-cols-4 gap-6 px-6 w-full ">
                {data.map(product => (
                    <BoxProduct key={product.id} product={product} />
                ))
                }
            </div>
        </div>

    )
}