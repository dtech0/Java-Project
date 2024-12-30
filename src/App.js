import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Login from './Pages/LoginSignup';
import Signup from './Pages/Signup';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import ShopContextProvider from './Context/ShopContext'; // ✅ Ensure this is imported
import CartItems from './Components/CartItems/CartItems';
//import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
//import ListProduct from './Components/ListProduct/ListProduct';
 // New page for order summary
// Import the new pages for account actions


import UpdateAccount from './Pages/UpdateAccount';  // New page for update account
import ResetPassword from './Pages/ResetPassword'; // New page for reset password
import DeleteAccount from './Pages/DeleteAccount'; // New page for delete account
import OrderPage from './Pages/OrderPage'; // Ensure the case matches exactly
import Payment from './Pages/Payment';
import TrackingPage from './Pages/TrackingPage';
// Component to conditionally render the Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup']; // Paths where Navbar is hidden
  return hideHeaderPaths.includes(location.pathname) ? null : <Navbar />;
};
function App() {
  return (
    <ShopContextProvider> {/* ✅ Wrap the app with ShopContextProvider */}
    <div>
    <BrowserRouter>
      <ConditionalNavbar /> {/* ✅ Conditionally render Navbar */}
      <Routes>
        {/* Main Shop Route */}
        <Route path="/" element={<Shop />} />

        {/* Shop Category Routes */}
        <Route path="/Fish-Meat" element={<ShopCategory banner={men_banner} category="Fish-Meat" />} />
        <Route path="/Fruits-Veg" element={<ShopCategory banner={women_banner} category="Fruits-Veg" />} />
        <Route path="/Beverages" element={<ShopCategory banner={kid_banner} category="Beverages" />} />

        {/* Product route with dynamic productId */}
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>

        {/* Cart route */}
        <Route path="/cart" element={<Cart />} />
        
        {/* Cart route */}
        <Route path="/cartItems" element={<CartItems />} />

        {/* OrderPage route */}
        <Route path="/order" element={<OrderPage/>} /> {/* Order Summary page */} 

       <Route path="/payment" element={<Payment />} />

        <Route path='/tracking/:orderId' element={<TrackingPage />} />
        {/* Login/Signup routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* New Routes for account actions */}
        <Route path="/update-account" element={<UpdateAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </div>
</ShopContextProvider>
);
}

export default App;     
    



