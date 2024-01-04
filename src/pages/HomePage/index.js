import Slide from "../../components/Slide"
import NewProducts from "../../components/NewProducts"
import { useState, useEffect } from "react";
import axios from "axios";
export default function HomePage() {
    const [data, setData] = useState([]);
    const loadHomePage = () => {
        axios.get("/products")
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
            <Slide products={data.slice(0, 3)} />
            <NewProducts products={data.filter(proc => proc.status === "New")} />
        </div>
    )
}