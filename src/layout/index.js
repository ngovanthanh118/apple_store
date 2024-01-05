import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Layout() {
    return (
        <div className="mt-20">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}