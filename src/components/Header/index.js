import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Context } from "../Contexts";
import CategorySevice from "../../services/categorySevice";
export default function Header() {
    // const { cartProducts, accounts } = useContext(Context);
    const [categories, setCategories] = useState([]);
    const { cate_url } = useParams();
    // const [keyWord, setKeyWord] = useState('');
    const navigate = useNavigate();
    const btnNavElement = useRef();
    const navElement = useRef();
    // const searchElement = useRef();
    // const handleClick = () => {
    //     navElement.current.classList.toggle("active");
    //     searchElement.current.classList.toggle("active");
    // };
    // const handleSearch = (ev) => {
    //     ev.preventDefault();
    //     navigate(`/search?q=${keyWord}`)
    // }
    useEffect(() => {
        const fetchAllCategories = async () => {
            await CategorySevice.getAllCategories()
                .then(res => setCategories(prev => prev = res.data))
                .catch(err => { throw new Error(err) })
        }
        fetchAllCategories();
        //btnNavElement.current.addEventListener('click', handleClick);
        // return () => {
        //     btnNavElement.current.removeEventListener('click', handleClick);
        // }
    }, []);
    return (
        <header className="mobile-header flex justify-between items-center bg-black fixed w-full z-10 top-0 px-40">
            <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
            <nav ref={navElement} className="mobile-nav-link flex items-center text-white font-normal text-sm">
                {categories.map(category => (
                    <Link key={category._id}
                        className={cate_url === category.name.toLowerCase() ?
                            "w-full text-center px-10 text-nowrap bg-[#2D2D2D] h-full py-5" : "w-full text-center px-10 py-5 text-nowrap hover:bg-[#2D2D2D]"
                        } to={`category/${category.url}/${category._id}`}>{category.name}</Link>
                ))}
            </nav>
            <div className="flex items-center gap-2">
                <button className="rounded-full p-2 flex items-center text-white bg-[#2f3033]" to='/cart'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                </button>
                <button className="rounded-full p-2 flex items-center text-white bg-[#2f3033]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
            <button ref={btnNavElement} className="mobile-nav-btn hidden text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </header >
    )
}