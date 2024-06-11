import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customerPrvSliceActions } from "../stores/slices/customerSlice";
import { getCookie } from "../helpers/handleCookie";
import { getSessionItem } from "../helpers/handleStorage";
import isEmptyObject from "../helpers/handleEmptyObject";

export default function Layout() {
    const location = useLocation();

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProfileCustomer = async () => {
            await dispatch(customerPrvSliceActions.signIn());
        }
        if (getCookie('token') && isEmptyObject(getSessionItem('customer'))) {
            fetchProfileCustomer();
        }
    }, [dispatch])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location, dispatch])
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}