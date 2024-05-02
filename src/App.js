import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Layout from "./layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <div className="bg-gray-200">
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:cate_url/:_id" element={<CategoryPage />} />
          <Route path="/product/:proc_url/:_id" element={<ProductDetail />} />
          {/* <Route path="/ipad/:_id" element={<IpadPage />} />
          <Route path="/mac/:_id" element={<MacPage />} />
          <Route path="/watch/:_id" element={<WatchPage />} />
          <Route path="/accessory/:_id" element={<AccessoryPage />} />
          <Route path="/sound/:_id" element={<SoundPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
