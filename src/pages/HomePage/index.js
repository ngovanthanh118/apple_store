import Slide from "../../components/Slide"
import NewProducts from "../../components/NewProducts"
import { useState, useEffect } from "react";
import axios from "axios";
export default function HomePage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get("/products")
            .then(products => setData(products.data))
            .catch(err => console.error(err))
    }, []);
    return (
        <div>
            <Slide product = {data} />
            <NewProducts product = {data}/>
        </div>
    )
}