import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';  // Ensure this path is correct
import CartItems from '../Components/CartItems/CartItems';
const Cart = () => {
  const { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  
  return (
    <div>
      <CartItems />
    </div>
  );
};

export default Cart;
