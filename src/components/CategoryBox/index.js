import { Container, Grid, Stack } from "@mui/material";
import CategoryCard from "../CategoryCard";

export default function CategoryBox({ categories }) {
    return (
        <Container className="animate__animated animate__fadeInDown mt-12">
            <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 12, md: 12 }}>
                {categories.length > 0 && categories.map(category => (
                    <Grid item xs={2} sm={4} md={2} key={category._id}>
                        <CategoryCard title={category.name} category={category} key={category._id} />
                    </Grid>
                ))}

            </Grid>

        </Container>
    )
}