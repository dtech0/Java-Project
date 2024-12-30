


import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './CSS/OrderPage.css';

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(ShopContext);

  const [address, setAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (!context) {
      return;
    }

    const { cartItems, all_product } = context;
    const productFromBuyNow = location.state?.product;
    const quantityFromBuyNow = location.state?.quantity;
    const selectedProductsFromCart = location.state?.selectedProducts;

    let products = [];
    if (productFromBuyNow) {
      products = [{
        ...productFromBuyNow,
        quantity: quantityFromBuyNow
      }];
    } else if (selectedProductsFromCart) {
      products = selectedProductsFromCart.map(product => ({
        ...product,
        quantity: cartItems[product.id]
      }));
    } else {
      products = all_product.filter(
        (product) => cartItems[product.id] > 0
      );
    }

    setSelectedProducts(products);

    if (!productFromBuyNow && products.length === 0) {
      alert('No products selected. Please add products to the cart or select products to buy.');
      navigate('/');
    }
  }, [context, location.state, navigate]);

  if (!context) {
    return <p>Loading context...</p>;
  }

  const { cartItems, setCartItems } = context;

  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => {
      return total + product.new_price * (product.quantity || cartItems[product.id]);
    }, 0);
  };



const handleProceedToPayment = async () => {
  const userId = localStorage.getItem("userId");
  console.log("User ID from localStorage:", userId);

  if (!userId || userId === 'undefined') {
    alert('User ID not found. Please log in again.');
    navigate('/login');
    return;
  }

  if (!isAddressValid) {
    alert('Please provide a valid delivery address.');
    return;
  }

  const orderData = {
    Order_date: new Date().toISOString().split('T')[0],
    Order_amount: calculateTotal(),
    Cust_id: userId,
    products: selectedProducts.map((product) => ({
      product_id: product.id,
      quantity: product.quantity || cartItems[product.id],
    })),
  };
  console.log("Order Data: ", orderData);
  try {
    const response = await fetch("http://localhost:4000/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Order placed successfully:", data);
      alert(`Order placed successfully! Order ID: ${data.order_id}`);

      const updatedCartItems = { ...cartItems };
      selectedProducts.forEach((product) => {
        delete updatedCartItems[product.id];
      });

      setCartItems(updatedCartItems);

      // Store order information in localStorage
      localStorage.setItem('order_id', data.order_id);
      localStorage.setItem('order_amount', orderData.Order_amount);

      navigate('/payment');
    } else {
      console.error("Server responded with an error:", data);
      alert(`Order failed: ${data.error || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error placing order:", error);
    alert("An error occurred while placing the order. Please try again.");
  }
};




  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleAddressSave = (e) => {
    e.preventDefault();
    const isValid =
      address.fullName &&
      address.addressLine1 &&
      address.city &&
      address.state &&
      address.zipCode &&
      address.phone;
    if (isValid) {
      setIsAddressValid(true);
      setIsAddressFormVisible(false);
      alert('Address saved successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  };

  const totalAmount = calculateTotal();

  return (
    <div className="order-page-container">
      <h2 className="order-page-title">Order Summary</h2>

      <div className="address-section">
        <h3>Delivery Address</h3>
        {isAddressFormVisible && (
          <form className="address-form" onSubmit={handleAddressSave}>
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              Address Line 1:
              <input
                type="text"
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              Address Line 2:
              <input
                type="text"
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              State:
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              ZIP Code:
              <input
                type="text"
                name="zipCode"
                value={address.zipCode}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone"
                value={address.phone}
                onChange={handleAddressChange}
                required
              />
            </label>
            <button type="submit" className="save-address-btn">
              Save Address
            </button>
          </form>
        )}

        {!isAddressFormVisible && isAddressValid && (
          <div className="saved-address">
            <p><strong>Name:</strong> {address.fullName}</p>
            <p><strong>Address:</strong> {address.addressLine1}, {address.addressLine2}</p>
            <p><strong>City:</strong> {address.city}, {address.state} - {address.zipCode}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
          </div>
        )}
      </div>

      <div className="selected-items-section">
        <h3>Selected Items</h3>
        {selectedProducts.length === 0 ? (
          <p>No items selected</p>
        ) : (
          <div className="selected-items">
            {selectedProducts.map((product) => (
              <div key={product.id} className="selected-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="selected-item-image"
                />
                <div className="selected-item-details">
                  <h4>{product.name}</h4>
                  <p>Price: ${product.new_price.toFixed(2)}</p>
                  <p>Quantity: {product.quantity || cartItems[product.id]}</p>
                  <p>
                    Total: ${(product.new_price * (product.quantity || cartItems[product.id])).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="order-summary">
        <h3>Order Total: ${totalAmount.toFixed(2)}</h3>
        <button
          onClick={handleProceedToPayment}
          className="proceed-to-payment-btn"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;



