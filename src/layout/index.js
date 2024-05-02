import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Layout() {
    return (
        <div className="bg-[#3E3E3F]">
            <Header />
            <div className="pt-20 px-12">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}