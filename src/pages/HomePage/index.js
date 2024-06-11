import ProductBox from "../../components/ProductBox";
import { useState, useEffect } from "react";
import CategoryBox from "../../components/CategoryBox";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { categoryPrvSliceActions } from "../../stores/slices/categorySlice";
import { productPrvSliceActions } from "../../stores/slices/productSlice";
import Slide from "../../components/Slide";
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetctAllCategoriesAndProducts = async () => {
            const productsResponse = await dispatch(productPrvSliceActions.getProductList());
            const categoriesResponse = await dispatch(categoryPrvSliceActions.getCategoryList());
            setProducts(prev => prev = productsResponse.payload.data)
            setCategories(prev => prev = categoriesResponse.payload.data);
        }
        fetctAllCategoriesAndProducts();
    }, []);
    return (
        <Box
            backgroundColor="#3E3E3F"
            minHeight="100vh"
            paddingBottom="18px"
        >
            <Slide />
            <CategoryBox categories={categories} />
            {categories.map(category => (
                <ProductBox title={category.name} key={category._id} products={products.filter(product => product.category_id === category._id)} />
            ))}
        </Box>
    )
}