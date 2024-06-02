import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import Layout from "./layout";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import MyOrderPage from "./pages/MyOrderPage";
import ProfilePage from "./pages/ProfilePage";
import OrderDetailPage from "./pages/OrderDetailPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-order" element={<MyOrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category/:cate_id" element={<CategoryPage />} />
          <Route path="/product/:proc_id" element={<ProductDetailPage />} />
          <Route path="/my-order/:_id" element={<OrderDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}
export default App;
