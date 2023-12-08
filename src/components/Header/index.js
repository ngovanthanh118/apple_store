import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../Contexts";
import { getCookie } from "../../ultis";
export default function Header() {
    const { cartProducts, accounts } = useContext(Context);
    return (
        <header className="flex justify-between items-center p-10 fixed w-full z-10 top-0">
            <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
            <nav className="flex gap-10 text-white opacity-60">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All products</NavLink>
                <NavLink to='/categories'>Categories</NavLink>
                <NavLink to={document.cookie ? '/account' : '/login'}>Account</NavLink>
                <NavLink to='/cart'>Cart ({cartProducts.length})</NavLink>
            </nav>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </header>
    )
}