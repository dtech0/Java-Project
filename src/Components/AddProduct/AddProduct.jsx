


import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    old_price: '',
    new_price: '',
    production_date: '',
    expire_date: '',
    product_quantity: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    // Append all form data
    Object.keys(formData).forEach((key) => {
      productData.append(key, formData[key]);
    });

    // Append image
    if (image) {
      productData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:4000/addproduct', productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message || 'Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add product.');
    }
  };

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          placeholder="Enter product title"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      {/* Additional Fields */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            placeholder="Enter price"
            value={formData.old_price}
            onChange={handleInputChange}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            placeholder="Enter price"
            value={formData.new_price}
            onChange={handleInputChange}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Production Date</p>
          <input
            type="date"
            name="production_date"
            placeholder="Enter date"
            value={formData.production_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Expire Date</p>
          <input
            type="date"
            name="expire_date"
            placeholder="Enter date"
            value={formData.expire_date}
            onChange={handleInputChange}
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Quantity KG/L</p>
          <input
            type="number"
            name="product_quantity"
            placeholder="Enter quantity"
            value={formData.product_quantity}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Category */}
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selection"
          value={formData.category}
          onChange={handleInputChange}
        >
          <option value="">Select category</option>
          <option value="Fruits-Veg">Fruits-Veg</option>
       
          <option value="Fish-Meat">Fish-Meat</option>
          <option value="Beverages">Beverages</option>

          
        </select>
      </div>
      {/* Image Upload */}
      <div className="addproduct-itemfield">
        <label htmlFor="file-input" className="upload-label">
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Product preview" className="preview-img" />
              <button type="button" className="remove-image-btn" onClick={handleImageRemove}>
                ×
              </button>
            </>
          ) : (
            <div className="upload-placeholder">Upload</div>
          )}
        </label>
        <input
          type="file"
          id="file-input"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
      <button type="submit" className="addproduct-btn">
        Add
      </button>
    </form>
  );
};

export default AddProduct;
