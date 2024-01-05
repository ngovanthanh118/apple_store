import axios from "axios";
import { useEffect, useState } from "react";
import BoxProduct from "../../components/BoxProduct";
export default function Categories() {
    const [products, setProducts] = useState([]);
    const [allMobile, setAllMobile] = useState(3);
    const [allMac, setAllMac] = useState(3);
    const [allIpad, setAllIpad] = useState(3);
    useEffect(() => {
        window.scroll(0, 0);
    }, []);
    useEffect(() => {
        axios.get('/products')
            .then(res => setProducts(res.data.data))
            .catch(err => console.error(err))
    }, [])
    const mobileProducts = products.filter(product => product.type === "mobile");
    const macProducts = products.filter(product => product.type === "mac");
    const ipadProducts = products.filter(product => product.type === "ipad");

    return (
        <div className="mobile-category-container mt-28 px-8 pt-4 min-h-screen">
            <h1 className="font-bold my-2 text-3xl">Mobiles</h1>
            <div className="mobile-category grid grid-cols-4 gap-4 px-6 w-full">
                {mobileProducts.slice(0, allMobile).map(product => (
                    <BoxProduct key={product._id} product={product} />
                ))}
                {allMobile !== mobileProducts.length &&
                    (<button className="flex items-center gap-4 justify-center btn-all" onClick={() => setAllMobile(mobileProducts.length)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                        <span>Show All</span>
                    </button>)
                }

            </div>
            <h1 className="font-bold mt-8 mb-5 text-3xl">Macbooks</h1>
            <div className="mobile-category grid grid-cols-4 gap-4 px-6 w-full">
                {macProducts.slice(0, allMac).map((product, index) => (
                    <BoxProduct key={product._id} product={product} />
                ))}
                {allMac !== macProducts.length &&
                    (<button className="flex items-center gap-4 justify-center btn-all" onClick={() => setAllMac(macProducts.length)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                        <span>Show All</span>
                    </button>)
                }
            </div>
            <h1 className="font-bold mt-8 mb-5 text-3xl">Ipads</h1>
            <div className="mobile-category grid grid-cols-4 gap-4 px-6 w-full">
                {ipadProducts.slice(0, allIpad).map((product, index) => (
                    <BoxProduct key={product._id} product={product} />
                ))}
                {allIpad !== ipadProducts.length &&
                    (<button className="flex items-center gap-4 justify-center btn-all" onClick={() => setAllIpad(ipadProducts.length)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                        <span>Show All</span>
                    </button>)
                }
            </div>
        </div>
    );
}