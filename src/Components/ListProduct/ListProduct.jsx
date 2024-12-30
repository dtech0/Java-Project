
import React, { useState, useEffect } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products from the backend
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = (productId) => {
    fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: productId }),
    }).then(() => {
      setAllProducts(allProducts.filter((product) => product.id !== productId));
    });
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Quantity KG/L</p>
        
      </div>
      <div className="listproduct-allproducts">
        {allProducts.map((Product, index) => (
          <div key={index} className="listproduct-format-main listproduct-format">
            <div className="product-image-container">
              {/* Display Product Image */}
              <img
                src={Product.image}
                alt="product"
                onError={(e) => { e.target.src = "/placeholder.jpg"; }}
              />
              {/* Remove Button */}
              <button
                className="remove-icon"
                onClick={() => removeProduct(Product.id)}
              >
                X
              </button>
            </div>
            <p>{Product.name}</p>
            <p>{Product.old_price}</p>
            <p>{Product.new_price}</p>
            <p>{Product.category}</p>
            <p>{Product.product_quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
