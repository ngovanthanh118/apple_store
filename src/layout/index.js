import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerPrvSliceActions } from "../stores/slices/customerSlice";
import { getCookie } from "../helpers/handleCookie";
import { getSessionItem } from "../helpers/handleStorage";

export default function Layout() {
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(() => {
        const fetchProfileCustomer = async () => {
            await dispatch(customerPrvSliceActions.signIn());
        }
        if (getCookie('token') && !!!getSessionItem('customer')) {
            fetchProfileCustomer();
        }
    }, [dispatch])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location, dispatch])
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}