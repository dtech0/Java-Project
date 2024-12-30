
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const {all_product: products, getTotalCartItems } = useContext(ShopContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth-token'));
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem('auth-token'));
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Handle search input
    useEffect(() => {
        if (searchQuery.trim()) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchQuery, products]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = (productId) => {
        navigate(`/product/${productId}`);  // Navigate to product display page
       // setFilteredProducts([]); // Hide suggestions
        setSearchQuery(""); // Clear the search bar
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        setUserMenuVisible(false);
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleCartClick = () => {
        if (isLoggedIn) {
            navigate('/cart');
        } else {
            setShowPopup(true);
        }
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" />
                <p>GREENCART</p>
            </div>
            
            {/* Search Bar */}
            <div className="nav-search">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                {searchQuery && (
                    <div className="search-results">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="search-result-item"
                                    onClick={() => handleSearchClick(product.id)}
                                >
                                    {product.name}
                                </div>
                            ))
                        ) : (
                            <div>No products found</div>
                        )}
                    </div>
                )}
            </div>

            <ul className="nav-menu">
                <li>
                    <Link to="/">Shop</Link>
                </li>
                <li
                    className="category-menu"
                    onMouseEnter={() => setCategoryMenuVisible(true)}
                    onMouseLeave={() => setCategoryMenuVisible(false)}
                >
                    <span>Categories</span>
                    {categoryMenuVisible && (
                        <div className="dropdown-menu">
                            <Link to="/Fish-Meat">Fish & Meat</Link>
                            <Link to="/Fruits-Veg">Fruits & Vegetables</Link>
                            <Link to="/Beverages">Beverages</Link>
                            <Link to="/Snacks">Snacks</Link>
                        </div>
                    )}
                </li>
            </ul>

            <div className="nav-login-cart">
                {isLoggedIn ? (
                    <>
                        <button
                            onClick={() => setUserMenuVisible(!userMenuVisible)}
                            className="user-menu-toggle"
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <FaUserCircle size={30} />
                        </button>
                        {userMenuVisible && (
                            <div className="user-menu">
                                <Link to="/update-account"><button>Update Account</button></Link>
                                <Link to="/reset-password"><button>Reset Password</button></Link>
                                <Link to="/delete-account"><button>Delete Account</button></Link>
                                <Link to="/tracking/:orderId"><button>Order History</button></Link>
                                <button onClick={logout}>Logout</button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Link to='/login'><button>Login</button></Link>
                        <Link to='/signup'><button>Sign Up</button></Link>
                    </>
                )}
                <div onClick={handleCartClick} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <img src={cart_icon} alt="Cart Icon" />
                    {isLoggedIn && <div className="nav-cart-count">{getTotalCartItems()}</div>}
                </div>
            </div>

            {showPopup && (
                <div className="popup">
                    <p>Please login to access the cart.</p>
                    <button onClick={() => { setShowPopup(false); navigate('/login'); }}>
                        Go to Login
                    </button>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;
