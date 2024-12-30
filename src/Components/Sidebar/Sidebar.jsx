import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar"> {/* Fixed className */}
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item"> {/* Fixed className */}
          <img 
            src="https://img.icons8.com/matisse/100/add-product.png" 
            alt="" 
            width="24" 
            height="24" 
          />
          <span>Add Product</span> {/* Added text for better UI */}
        </div>
      </Link>

      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item"> {/* Fixed className */}
          <img 
            src="https://img.icons8.com/ios-filled/100/list.png" 
            alt="" 
            width="24" 
            height="24" 
          />
          <span> List Product</span> {/* Added text for better UI */}
        </div>
      </Link>

      <Link to="/orderpage" style={{ textDecoration: "none" }}>
        <div className="sidebar-item"> {/* Fixed className */}
          <img 
            src="https://img.icons8.com/ios-filled/100/list.png" 
            alt="" 
            width="24" 
            height="24" 
          />
          <span> User Order</span> {/* Added text for better UI */}
        </div>
      </Link>


    </div>
  );
};

export default Sidebar;
