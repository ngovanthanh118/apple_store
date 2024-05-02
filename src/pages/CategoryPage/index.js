import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import categorySevice from "../../services/categorySevice";
export default function CategoryPage() {
    const { _id, cate_url } = useParams();
    const [products, setProducts] = useState([]);
    const [storeProducts, setStoreProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [typeActive, setTypeActive] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleChangeType = (type) => {
        setTypeActive(prev => prev = type);
        if (type === 'all') {
            setProducts(prev => prev = storeProducts);
            return;
        }
        const findProductByType = storeProducts.filter(product => product.type === type);
        setProducts(prev => prev = findProductByType);
    }
    const fetchProducts = async () => {
        await categorySevice.getProductsByCategoryId(_id)
            .then(res => {
                setProducts(prev => prev = res.data);
                setStoreProducts(prev => prev = res.data);
                const getTypes = uniqBy(res.data, 'type');
                setTypes(prev => prev = getTypes);
                setErrorMessage('');
            })
            .catch(err => {
                if (err.response.status !== 200) {
                    setErrorMessage(prev => prev = err.response.data.msg)
                    setProducts([]);
                    setTypes(prev => prev = [])
                }
            })
    }
    useEffect(() => {
        setTypeActive(prev => prev = 'all');
        fetchProducts();
        window.scroll(0, 0);
    }, [_id]);
    return (
        <div className="mobile-category-container min-h-screen">
            <div className="flex gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" strokeWidth={1.5} stroke="currentColor" fill="white" className="w-7 h-w-7">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <h1 className="text-white font-medium text-4xl">{cate_url}</h1>
            </div>
            <div className="flex gap-4 items-center py-2">
                <button className={typeActive === 'all' ?
                    "text-white font-medium text-base text-center px-3 py-4 border-b-[1px] border-white border-solid" :
                    "text-[#AFB7BD] font-medium text-base text-center px-3 py-4"}
                    onClick={() => handleChangeType('all')}
                >Tất cả</button>
                {types.map((type, index) => (
                    <button key={index} className={typeActive.toLowerCase() === type.type.toLowerCase() ?
                        "text-white font-medium text-base text-center px-3 py-4 border-b-[1px] border-white border-solid" :
                        "text-[#AFB7BD] font-medium text-base text-center px-3 py-4"}
                        onClick={() => handleChangeType(type.type)}
                    >{type.type}</button>
                ))}
            </div>
            <div className="rounded-xl col-span-3 p-3 grid grid-cols-3 gap-6">
                {products && products.map(product => (
                    <ProductCard product={product} />
                ))}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}