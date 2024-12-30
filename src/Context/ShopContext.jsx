




import React, { createContext, useState, useEffect } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 100 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [all_product, setAll_Product] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data));

    const token = localStorage.getItem("authToken");
    const cartId = localStorage.getItem("cartId");
    if (token && cartId) {
      setIsAuthenticated(true);
      fetchCartProducts(cartId);
    }
  }, []);

  const fetchCartProducts = async (cartId) => {
    if (!cartId) {
      console.error("Cart ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/get-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_id: cartId }),
      });

      const data = await response.json();

      if (response.ok && data.Success) {
        console.log("Fetched cart products successfully!", data);

        const newCartItems = getDefaultCart();
        data.products.forEach((product) => {
          newCartItems[product.product_id] = product.quantity;
        });
        setCartItems(newCartItems);
      } else {
        console.error("Failed to fetch cart products:", data.error || data.message);
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const addToCart = async (itemId, quantity) => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      console.error("Cart ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId,
          products: [{ product_id: itemId, quantity }],
        }),
      });

      const data = await response.json();

      if (response.ok && data.Success) {
        console.log("Product added to cart successfully!");

        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + quantity,
        }));
      } else {
        console.error("Failed to add to cart:", data.error);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      console.error("Cart ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: itemId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.Success) {
        console.log("Product removed from cart successfully!");

        setCartItems((prev) => {
          const newCart = { ...prev };
          delete newCart[itemId];
          return newCart;
        });
      } else {
        console.error("Failed to remove from cart:", data.error);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateCartItemQuantity = async (itemId, newQuantity) => {
    const cartId = localStorage.getItem("cartId");

    if (!cartId) {
      console.error("Cart ID not found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/update-cart-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: itemId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.Success) {
        console.log("Cart quantity updated successfully!");

        setCartItems((prev) => ({
          ...prev,
          [itemId]: newQuantity,
        }));
        // Update selectedItems as well
        if (selectedItems[itemId]) {
          setSelectedItems((prev) => ({
            ...prev,
            [itemId]: true,
          }));
        }
      } else {
        console.error("Failed to update cart quantity:", data.error);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const toggleItemSelection = (productId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.keys(cartItems).every(
      (productId) => cartItems[productId] > 0
    );
    const updatedSelections = {};
    Object.keys(cartItems).forEach((productId) => {
      updatedSelections[productId] = !allSelected;
    });
    setSelectedItems(updatedSelections);
  };

  const login = async (token, cartId) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("cartId", cartId);
    setIsAuthenticated(true);
    await fetchCartProducts(cartId);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("cartId");
    setIsAuthenticated(false);
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    all_product,
    cartItems,
    selectedItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalCartAmount,
    getTotalCartItems,
    toggleItemSelection,
    toggleSelectAll,
    isAuthenticated,
    login,
    logout,
    fetchCartProducts,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;



