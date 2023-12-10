import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../Contexts";
import { getCookie } from "../../ultis";
export default function Header() {
    const { cartProducts } = useContext(Context);
    const [mobileNav, setMobileNav] = useState(false);
    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobileNav(true)
        }
    }, [])
    return (
        <header className="mobile-header flex justify-between items-center p-10 fixed w-full z-10 top-0">
            <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
            <nav className={mobileNav ?
                "mobile-nav-link hidden flex gap-10 text-white opacity-60" :
                "mobile-nav-link flex gap-10 text-white opacity-60"
            }>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All products</NavLink>
                <NavLink to='/categories'>Categories</NavLink>
                <NavLink to={getCookie("token") ? '/account' : '/login'}>Account</NavLink>
                <NavLink to='/cart'>Cart ({cartProducts.length})</NavLink>
            </nav>
            <div className={mobileNav ? "bg-inherit hidden" : "bg-inherit w-2"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            <button className="mobile-nav-btn hidden text-white"
                onClick={() => setMobileNav(prev => !prev)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </header>
    )
}