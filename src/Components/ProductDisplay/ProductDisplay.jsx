/*


import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // Popup for login check

    const isLoggedIn = !!localStorage.getItem('auth-token'); // Check login status

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(product.id, selectedQuantity); // Add product with the selected quantity
            setShowPopup(true); // Show success popup
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleBuyNow = () => {
        if (isLoggedIn) {
            // Pass the selected product and quantity to the order page
            navigate('/order', { state: { product, quantity: selectedQuantity } }); 
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleQuantitySelect = (quantity) => {
        setSelectedQuantity(quantity); // Update selected quantity
    };

    const handleGoToCart = () => {
        navigate('/cart'); // Redirect to cart page
    };

    return (
    
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A good product
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Quantity (kg/L)</h1>
                    <div className="productdisplay-right-sizes">
                        {[0.5, 1, 1.5, 2, 2.5].map((quantity) => (
                            <div
                                key={quantity}
                                className={`quantity-option ${selectedQuantity === quantity ? 'selected' : ''}`}
                                onClick={() => handleQuantitySelect(quantity)}
                            >
                                {quantity}
                            </div>
                        ))}
                    </div>
                </div>

               
                <div className="productdisplay-dates">
                    <p><strong>Production Date:</strong> {product.production_date}</p>
                    <p><strong>Expire Date:</strong> {product.Expire_date}</p>
                </div>

                <div className="button-group">
                    <button onClick={handleAddToCart} className="add-to-cart-btn">ADD TO CART</button>
                    <button onClick={handleBuyNow} className="buy-now-btn">BUY NOW</button>
                </div>
                <p className='productdisplay-right-category'><span>Category :</span> Online supershop products</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Fresh and Fine</p>
            </div>

            {showPopup && (
                <div className="popup">
                    <p>Product added to cart. Go to cart?</p>
                    <button onClick={handleGoToCart} className="go-to-cart-btn">Go to Cart</button>
                    <button onClick={() => setShowPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

            {showLoginPopup && (
                <div className="popup">
                    <p>Please login to proceed.</p>
                    <button onClick={() => { setShowLoginPopup(false); navigate('/login'); }} className="go-to-login-btn">
                        Go to Login
                    </button>
                    <button onClick={() => setShowLoginPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

             <DescriptionBox productId={product.id} />
        </div>
    );
};

export default ProductDisplay;
*/



/*
import React, { useContext, useState } from 'react'; 
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import DescriptionBox from '../DescriptionBox/DescriptionBox';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // Popup for login check

    const isLoggedIn = !!localStorage.getItem('auth-token'); // Check login status

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(product.id, selectedQuantity); // Add product with the selected quantity
            setShowPopup(true); // Show success popup
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleBuyNow = () => {
        if (isLoggedIn) {
            // Pass the selected product and quantity to the order page
            navigate('/order', { state: { product, quantity: selectedQuantity } }); 
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleQuantitySelect = (quantity) => {
        setSelectedQuantity(quantity); // Update selected quantity
    };

    const handleGoToCart = () => {
        navigate('/cart'); // Redirect to cart page
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A good product
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Quantity (kg/L)</h1>
                    <div className="productdisplay-right-sizes">
                        {[0.5, 1, 1.5, 2, 2.5].map((quantity) => (
                            <div
                                key={quantity}
                                className={`quantity-option ${selectedQuantity === quantity ? 'selected' : ''}`}
                                onClick={() => handleQuantitySelect(quantity)}
                            >
                                {quantity}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-dates">
                    <p><strong>Production Date:</strong> {product.production_date}</p>
                    <p><strong>Expire Date:</strong> {product.Expire_date}</p>
                </div>
                <div className="button-group">
                    <button onClick={handleAddToCart} className="add-to-cart-btn">ADD TO CART</button>
                    <button onClick={handleBuyNow} className="buy-now-btn">BUY NOW</button>
                </div>
                <p className='productdisplay-right-category'><span>Category :</span> Online supershop products</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Fresh and Fine</p>
            </div>

            {showPopup && (
                <div className="popup">
                    <p>Product added to cart. Go to cart?</p>
                    <button onClick={handleGoToCart} className="go-to-cart-btn">Go to Cart</button>
                    <button onClick={() => setShowPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

            {showLoginPopup && (
                <div className="popup">
                    <p>Please login to proceed.</p>
                    <button onClick={() => { setShowLoginPopup(false); navigate('/login'); }} className="go-to-login-btn">
                        Go to Login
                    </button>
                    <button onClick={() => setShowLoginPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

         
            <DescriptionBox productId={product.id} />
        </div>
    );
};

export default ProductDisplay;
*/


 //almost right review button in side

import React, { useContext, useState } from 'react'; 
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import DescriptionBox from '../DescriptionBox/DescriptionBox';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    const [selectedQuantity, setSelectedQuantity] = useState(1); // Default quantity
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false); // Popup for login check

    const isLoggedIn = !!localStorage.getItem('auth-token'); // Check login status

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(product.id, selectedQuantity); // Add product with the selected quantity
            setShowPopup(true); // Show success popup
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleBuyNow = () => {
        if (isLoggedIn) {
            // Pass the selected product and quantity to the order page
            navigate('/order', { state: { product, quantity: selectedQuantity } }); 
        } else {
            setShowLoginPopup(true); // Show login popup if not logged in
        }
    };

    const handleQuantitySelect = (quantity) => {
        setSelectedQuantity(quantity); // Update selected quantity
    };

    const handleGoToCart = () => {
        navigate('/cart'); // Redirect to cart page
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A good product
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Quantity (kg/L)</h1>
                    <div className="productdisplay-right-sizes">
                        {[0.5, 1, 1.5, 2, 2.5].map((quantity) => (
                            <div
                                key={quantity}
                                className={`quantity-option ${selectedQuantity === quantity ? 'selected' : ''}`}
                                onClick={() => handleQuantitySelect(quantity)}
                            >
                                {quantity}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-dates">
                    <p><strong>Production Date:</strong> {product.production_date}</p>
                    <p><strong>Expire Date:</strong> {product.Expire_date}</p>
                </div>
                <div className="button-group">
                    <button onClick={handleAddToCart} className="add-to-cart-btn">ADD TO CART</button>
                    <button onClick={handleBuyNow} className="buy-now-btn">BUY NOW</button>
                </div>
                <p className='productdisplay-right-category'><span>Category :</span> Online supershop products</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Fresh and Fine</p>
            </div>

            
            {showPopup && (
                <div className="popup">
                    <p>Product added to cart. Go to cart?</p>
                    <button onClick={handleGoToCart} className="go-to-cart-btn">Go to Cart</button>
                    <button onClick={() => setShowPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

        
            {showLoginPopup && (
                <div className="popup">
                    <p>Please login to proceed.</p>
                    <button onClick={() => { setShowLoginPopup(false); navigate('/login'); }} className="go-to-login-btn">
                        Go to Login
                    </button>
                    <button onClick={() => setShowLoginPopup(false)} className="close-popup-btn">Close</button>
                </div>
            )}

    
            <DescriptionBox productId={product.id} />
        </div>
    );
};

export default ProductDisplay;


