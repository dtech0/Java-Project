import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';  // Import AddProduct component
import ListProduct from '../../Components/ListProduct/ListProduct';  // Import ListProduct component
 import UserOrder from '../../Components/UserOrder/UserOrder';  

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar />
            <div className="main-content">
                <Routes>
                    <Route path='/addproduct' element={<AddProduct />} />
                    <Route path='/listproduct' element={<ListProduct />} />
                    <Route path='/orderpage'   element={<UserOrder/>} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
