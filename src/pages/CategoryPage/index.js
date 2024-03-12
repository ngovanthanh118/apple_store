import axios from "axios";
import { useEffect, useState } from "react";
import BoxProduct from "../../components/BoxProduct";
export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const loadProduct = (id) => {
        axios.get('/categories/' + id)
            .then(res => setProducts(res.data.data))
            .catch(err => setProducts([]))
    }
    const loadCategories = () => {
        axios.get('/categories')
            .then(res => {
                loadProduct(res.data.data[0]._id)
                setCategories(res.data.data)
            })
    }
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        loadCategories();
    }, [])
    console.log(products)
    return (
        <div className="mobile-category-container mt-28 px-8 pt-4 min-h-screen grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl py-2 flex flex-col gap-2">
                {categories.map(category => (
                    <div
                        className="p-2 border-b-2 border-gray-300 border-solid text-black cursor-pointer"
                        onClick={() => loadProduct(category._id)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl col-span-3 p-3">
                <div className="grid grid-cols-3 gap-2">
                    {products && products.map(product => (
                        <BoxProduct product={product} />
                    ))}
                    {!products.length && <p>Does not exist product in this category!</p>}
                </div>
            </div>
        </div>
    );
}