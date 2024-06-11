import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import categorySevice from "../../services/categorySevice";
import { Box, Container, Grid, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategories } from "../../stores/slices/categorySlice";
import { Apple } from "@mui/icons-material";
export default function CategoryPage() {
    const { cate_id } = useParams();
    const categories = useSelector(selectCategories);
    const [products, setProducts] = useState([]);
    const [productStore, setProductStore] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            await categorySevice.getProductsByCategoryId(cate_id)
                .then(res => {
                    setProducts(prev => prev = res.data);
                    setProductStore(prev => prev = res.data);
                })
                .catch(err => console.log(err))
        }
        fetchProducts();
    }, [cate_id]);

    const handleSortProduct = (ev) => {
        switch (ev.target.value) {
            case 'ascending':
                const ascProducts = [...productStore].sort((a, b) => a.discount - b.discount);
                setProducts(prev => prev = ascProducts)
                break;
            case 'descending':
                const descProducts = [...productStore].sort((a, b) => b.discount - a.discount);
                setProducts(prev => prev = descProducts)
                break;
            default:
                setProducts(prev => prev = productStore)
        }
    }
    return (
        <Box
            backgroundColor="#3E3E3F"
            minHeight="100vh"
            paddingBottom="32px"
        >
            <Container>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ py: "12px" }}>
                    <Apple sx={{ color: "white", fontSize: "50px" }} />
                    <Typography variant="h1" fontSize="40px" fontWeight="500" color="white">{categories.find(cate => cate._id === cate_id).name}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ py: "12px" }}>
                    <label htmlFor="sort" className="text-lg text-white ">Sắp xếp theo:</label>
                    <select id="sort" className="bg-inherit text-white text-lg outline-none" onChange={handleSortProduct}>
                        <option className="text-black" value="">Mặc định</option>
                        <option className="text-black" value="ascending">Giá thấp đến cao</option>
                        <option className="text-black" value="descending">Giá cao đến thấp</option>
                    </select>
                </Stack>
                <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                    {products.length > 0 && products.map(product => (
                        <Grid item xs={4} sm={4} md={4} key={product._id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                    {!!!products.length && <Typography variant="h1" color="white" fontSize="1rem" fontWeight="500">Không tồn tại sản phẩm nào</Typography>}
                </Grid>
            </Container>
        </Box>
    );
}
//className="rounded-xl col-span-3 p-3 grid grid-cols-3 gap-6"