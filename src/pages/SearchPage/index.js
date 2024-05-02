import { useLocation } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
export default function SearchPage() {
    const location = useLocation();
    const [resultSearch, setResultSearch] = useState([]);
    const [error, setError] = useState(false);
    //
    useEffect(() => {
        window.scroll(0, 0);
        axios.get(process.env.REACT_APP_API_URL + '/search?q=' + decodeURIComponent(location.search.replace('?q=', '')))
            .then(res => {
                if (res.status === 200 && res.data.data.length > 0) {
                    setResultSearch(prev => prev = res.data.data);
                    setError(prev => prev = false);
                    return;
                }
                setError(prev => prev = true);
            })
            .catch(err => setError(prev => prev = true))
    }, [location.search])
    return (
        <div className="bg-gray-200 min-h-screen py-12 px-3">
            <p className="text-black font-semibold text-lg"> Result search for: {decodeURIComponent(location.search.replace('?q=', ''))}</p>
            <div className="grid grid-cols-4 gap-4 px-6 w-full">
                {error && (<p className="py-2">{`Does not exist product with name is ${decodeURIComponent(location.search.replace('?q=', ''))}`}</p>)}
                {!error && resultSearch.length > 0 && resultSearch.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}