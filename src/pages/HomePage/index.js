import Slide from "../../components/Slide";
import NewProducts from "../../components/NewProducts";
import SaleProducts from "../../components/SaleProducts";
import { useState, useEffect } from "react";
import axios from "axios";
import About from "../../components/About";
import Service from "../../components/Service";
export default function HomePage() {
    const [data, setData] = useState([]);
    const loadHomePage = () => {
        axios.get('/products/list')
            .then(products => {
                setData(products.data.data);
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        loadHomePage();
    }, []);
    return (
        <div>
            <Slide products={data.filter(proc => proc.status === "New")} />
            <Service />
            <About />
            <NewProducts products={data.filter(proc => proc.status === "New")} />
            <SaleProducts products={data.filter(proc => proc.discount > 0)} />
        </div>
    )
}