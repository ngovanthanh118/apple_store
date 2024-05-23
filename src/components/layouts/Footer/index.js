import { Typography, Box } from "@mui/material";
export default function Footer() {
    return (
        <Box
            component="footer"
            backgroundColor="black"
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="32px"
        >
            <Typography color="white">Copyright © 2024 TopZone</Typography>
        </Box>
    )
}