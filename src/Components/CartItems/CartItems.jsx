/*

import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';

const CartItems = () => {
  const { cartItems, all_product, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const incrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      delete newSelected[productId];
      return newSelected;
    });
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const allSelected = !selectAll;
    const updatedSelections = {};
    cartProducts.forEach((product) => {
      updatedSelections[product.id] = allSelected;
    });
    setSelectedItems(updatedSelections);
  };

  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      if (selectedItems[product.id]) {
        return total + product.new_price * cartItems[product.id];
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotal();
  const itemCount = Object.values(selectedItems).filter(Boolean).length;

  const handleOrderNow = () => {
    if (itemCount === 0) {
      setWarningMessage(true);
    } else {
      setWarningMessage(false);
      const selectedProducts = cartProducts.filter(product => selectedItems[product.id]);
      navigate('/order', { state: { selectedProducts } });
    }
  };

  useEffect(() => {
    if (itemCount > 0) {
      setWarningMessage(false);
    }
  }, [itemCount]);

  useEffect(() => {
    const allSelected = cartProducts.every((product) => selectedItems[product.id]);
    setSelectAll(allSelected);
  }, [selectedItems, cartProducts]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div className="select-all-container">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label> Select All Items</label>
            </div>
          </div>
          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems[product.id] || false}
                    onChange={() => toggleItemSelection(product.id)}
                  />
                </div>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">${product.new_price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decrementQuantity(product.id)}
                      disabled={cartItems[product.id] <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItems[product.id] || 0}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={() => incrementQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </p>
                  <button className="remove-item-btn" onClick={() => removeItem(product.id)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          {warningMessage && (
            <div className="warning-message">
              <p>Please select at least one item to place your order.</p>
            </div>
          )}
          <div className="cart-summary">
            <h3>Total Selected Items: {itemCount}</h3>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
*/

/*
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';

const CartItems = () => {
  const { cartItems, all_product, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const incrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      delete newSelected[productId];
      return newSelected;
    });
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
/*
  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const allSelected = !selectAll;
    const updatedSelections = {};
    cartProducts.forEach((product) => {
      updatedSelections[product.id] = allSelected;
    });
    setSelectedItems(updatedSelections);
  };
*/
/*
const toggleSelectAll = () => {
  const updatedSelections = {};
  const allSelected = !selectAll; // Use previous state directly
  cartProducts.forEach((product) => {
    updatedSelections[product.id] = allSelected;
  });
  setSelectAll(allSelected); // Update selectAll state after selections are updated
  setSelectedItems(updatedSelections);
};

  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      if (selectedItems[product.id]) {
        return total + product.new_price * cartItems[product.id];
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotal();
  const itemCount = Object.values(selectedItems).filter(Boolean).length;

  /*
  const handleOrderNow = () => {
    const selectedProducts = cartProducts.filter(product => selectedItems[product.id]);
    if (selectedProducts.length === 0) {
      setWarningMessage(true);
    } else {
      setWarningMessage(false);
      navigate('/order', { state: { selectedProducts } });
    }
  };
*/
/*
const handleOrderNow = () => {
  // শুধু সিলেক্ট করা প্রোডাক্টগুলো ফিল্টার করে
  const selectedProducts = cartProducts.filter((product) => selectedItems[product.id]);

  // যদি কোনো প্রোডাক্ট সিলেক্ট না করা থাকে, তাহলে warning দেখাও
  if (selectedProducts.length === 0) {
    setWarningMessage(true);
  } else {
    // সিলেক্ট করা প্রোডাক্টগুলো order page-এ পাঠাও
    setWarningMessage(false);
    navigate('/order', { state: { selectedProducts } });
  }
};

  useEffect(() => {
    if (itemCount > 0) {
      setWarningMessage(false);
    }
  }, [itemCount]);

  useEffect(() => {
    const allSelected = cartProducts.length > 0 && cartProducts.every((product) => selectedItems[product.id]);
    setSelectAll(allSelected);
  }, [selectedItems, cartProducts]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div className="select-all-container">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label> Select All Items</label>
            </div>
          </div>
          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems[product.id] || false}
                    onChange={() => toggleItemSelection(product.id)}
                  />
                </div>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">${product.new_price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decrementQuantity(product.id)}
                      disabled={cartItems[product.id] <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItems[product.id] || 0}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={() => incrementQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </p>
                  <button className="remove-item-btn" onClick={() => removeItem(product.id)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          {warningMessage && (
            <div className="warning-message">
              <p>Please select at least one item to place your order.</p>
            </div>
          )}
          <div className="cart-summary">
            <h3>Total Selected Items: {itemCount}</h3>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;
*/







import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';

const CartItems = () => {
  const { cartItems, all_product, removeFromCart, updateCartItemQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);

  // Handle quantity change
  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  // Increment item quantity
  const incrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  // Decrement item quantity
  const decrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  // Remove item from cart
  const removeItem = (productId) => {
    removeFromCart(productId);
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      delete newSelected[productId];
      return newSelected;
    });
  };

  // Toggle item selection
  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Select or deselect all items
  const toggleSelectAll = () => {
    setSelectAll((prev) => !prev);
    const allSelected = !selectAll;
    const updatedSelections = {};
    cartProducts.forEach((product) => {
      updatedSelections[product.id] = allSelected;
    });
    setSelectedItems(updatedSelections);
  };

  // Filter cart products
  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  // Calculate total amount
  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      if (selectedItems[product.id]) {
        return total + product.new_price * cartItems[product.id];
      }
      return total;
    }, 0);
  };

  // Total amount and item count
  const totalAmount = calculateTotal();
  const itemCount = Object.values(selectedItems).filter(Boolean).length;

  // Handle order now action
  const handleOrderNow = () => {
    const selectedProducts = cartProducts.filter(product => selectedItems[product.id]);
    if (selectedProducts.length === 0) {
      setWarningMessage(true);
    } else {
      setWarningMessage(false);
      navigate('/order', { state: { selectedProducts } });
    }
  };

  // Reset warning message when at least one item is selected
  useEffect(() => {
    if (itemCount > 0) {
      setWarningMessage(false);
    }
  }, [itemCount]);


  // Update select all checkbox based on item selection
  useEffect(() => {
    const allSelected = cartProducts.length > 0 && cartProducts.every((product) => selectedItems[product.id]);
    setSelectAll(allSelected);
  }, [selectedItems, cartProducts]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div className="select-all-container">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
              <label> Select All Items</label>
            </div>
          </div>
          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems[product.id] || false}
                    onChange={() => toggleItemSelection(product.id)}
                  />
                </div>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">${product.new_price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decrementQuantity(product.id)}
                      disabled={cartItems[product.id] <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItems[product.id] || 0}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={() => incrementQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </p>
                  <button className="remove-item-btn" onClick={() => removeItem(product.id)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          {warningMessage && (
            <div className="warning-message">
              <p>Please select at least one item to place your order.</p>
            </div>
          )}
          <div className="cart-summary">
            <h3>Total Selected Items: {itemCount}</h3>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;




/*
import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';

const CartItems = () => {
  const { cartItems, all_product, removeFromCart, updateCartItemQuantity, selectedItems, toggleItemSelection, toggleSelectAll } = useContext(ShopContext);
  const navigate = useNavigate();
  const [warningMessage, setWarningMessage] = useState(false);

  const handleQuantityChange = (e, productId) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const incrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    updateCartItemQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId) => {
    const currentQuantity = cartItems[productId] || 0;
    if (currentQuantity > 1) {
      updateCartItemQuantity(productId, currentQuantity - 1);
    }
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  const cartProducts = all_product.filter((product) => cartItems[product.id] > 0);

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      if (selectedItems[product.id]) {
        return total + product.new_price * cartItems[product.id];
      }
      return total;
    }, 0);
  };

  const totalAmount = calculateTotal();
  const itemCount = Object.values(selectedItems).filter(Boolean).length;

  const handleOrderNow = () => {
    const selectedProducts = cartProducts.filter(product => selectedItems[product.id]);
    if (selectedProducts.length === 0) {
      setWarningMessage(true);
    } else {
      setWarningMessage(false);
      navigate('/order', { state: { selectedProducts } });
    }
  };

  useEffect(() => {
    if (itemCount > 0) {
      setWarningMessage(false);
    }
  }, [itemCount]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <p>Your shopping cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div className="select-all-container">
              <input
                type="checkbox"
                checked={cartProducts.every(product => selectedItems[product.id])}
                onChange={toggleSelectAll}
              />
              <label> Select All Items</label>
            </div>
          </div>
          <div className="cart-items">
            {cartProducts.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems[product.id] || false}
                    onChange={() => toggleItemSelection(product.id)}
                  />
                </div>
                <img src={product.image} alt={product.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{product.name}</h3>
                  <p className="cart-item-price">${product.new_price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => decrementQuantity(product.id)}
                      disabled={cartItems[product.id] <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={cartItems[product.id] || 0}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      min="1"
                      className="quantity-input"
                    />
                    <button className="quantity-btn" onClick={() => incrementQuantity(product.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <p className="cart-item-total">
                    ${(product.new_price * cartItems[product.id]).toFixed(2)}
                  </p>
                  <button className="remove-item-btn" onClick={() => removeItem(product.id)}>
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
          {warningMessage && (
            <div className="warning-message">
              <p>Please select at least one item to place your order.</p>
            </div>
          )}
          <div className="cart-summary">
            <h3>Total Selected Items: {itemCount}</h3>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            <button className="order-now-btn" onClick={handleOrderNow}>
              Order Now
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;

*/