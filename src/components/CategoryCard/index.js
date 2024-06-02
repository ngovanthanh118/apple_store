import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"

export default function CategoryCard({ category }) {
    const navigate = useNavigate();
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#323232",
                borderRadius: "1rem",
                cursor: "pointer",

            }}
            onClick={() => navigate(`/category/${category._id}`)}
        >
            <CardMedia
                component="img"
                image={process.env.REACT_APP_API_URL + '/images/' + category.image}
                alt="Anh"
            />
            <CardContent>
                <Typography
                    color="white"
                    fontSize="1rem"
                    fontWeight="400"
                    paddingY="0.75rem"
                >
                    {category.name}
                </Typography>
            </CardContent>
        </Card>
    )
}