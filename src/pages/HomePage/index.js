import ProductBox from "../../components/ProductBox";
import { useState, useEffect } from "react";
import ProductService from '../../services/productService';
import CategorySevice from '../../services/categorySevice';
import CategoryBox from "../../components/CategoryBox";
import { Box } from "@mui/material";
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetctAllCategoriesAndProducts = async () => {
            await ProductService.getProducts()
                .then(res => setProducts(prev => prev = res.data))
                .catch(error => { throw new Error(error) })
            await CategorySevice.getAllCategories()
                .then(res => setCategories(prev => prev = res.data))
                .catch(error => { throw new Error(error) })
        }
        fetctAllCategoriesAndProducts();
    }, []);
    return (
        <Box
            backgroundColor="#3E3E3F"
            padding="12px 64px"
        >
            {/* <Slide products={products.filter(proc => proc.status === "New")} /> */}
            <CategoryBox categories={categories} />
            {categories.map(category => (
                <ProductBox title={category.name} key={category._id} products={products.filter(product => product.category_id === category._id)} />
            ))}
        </Box>
    )
}