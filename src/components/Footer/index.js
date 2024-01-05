import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="px-4 py-6 mt-8">
            <div className="flex justify-around gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                        <svg height="60" viewBox="0 0 14 44" width="45" xmlns="http://www.w3.org/2000/svg" fill="white">
                            <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"></path>
                        </svg>
                        <Link className="text-white text-xl font-bold" to='/'>Apple Store</Link>
                    </div>
                    <h1 className="text-white font-normal text-base text-center">Think Different</h1>
                </div>
                <div className="flex flex-col gap-4 text-white text-base">
                    <Link to="/">Store</Link>
                    <Link to="#">Service</Link>
                    <Link to="#">About us</Link>
                    <Link to="#">New products</Link>
                </div>
                <div className="flex flex-col gap-4 text-white text-base">
                    <Link to="/">Home</Link>
                    <Link to="/products">All products</Link>
                    <Link to="/categories">Categories</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/cart">Cart</Link>
                    <Link to="/checkout">Checkout</Link>
                </div>
            </div>
            <div className="flex justify-around items-center text-white text-base">
                <p>Copyright © 2024 Apple Inc.</p>
                <div className="flex items-center gap-6 py-4">
                    <Link to="#" className="text-white text-xl">
                        <i class="fa-brands fa-facebook"></i>
                    </Link>
                    <Link to="#" className="text-white text-xl">
                        <i class="fa-brands fa-instagram"></i>
                    </Link>
                    <Link to="#" className="text-white text-xl">
                        <i class="fa-brands fa-twitter"></i>
                    </Link>
                    <Link to="#" className="text-white text-xl">
                        <i class="fa-brands fa-youtube"></i>
                    </Link>
                </div>
            </div>
        </footer>
    )
}