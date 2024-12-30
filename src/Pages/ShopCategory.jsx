
import React, { useContext,useEffect } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
  console.log('Product Category: ', props.category);  // Debugging line
  const { all_product } = useContext(ShopContext)

  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-12</span> out of 36 products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className='shopcategory-products'>
          {all_product.map((item,i)=>{
            if(props.category===item.category){
              return <Item key={i} 
              id={item.id} 
              name={item.name}
               image={item.image} 
               new_price={item.new_price}
               old_price={item.old_price}
              // production_date={item.production_date}
              // Expire_date={item.Expire_date}
               />
            }
            else{
              return null;
            }
          })}
        </div>
        <div className="shopcategory-loadmore">
          Explore More
        </div>
    </div>
  )
}

export default ShopCategory  ;
/*

import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Group products by category
  const categorizedProducts = all_product.reduce((acc, item) => {
    if (!acc[item.product_category]) {
      acc[item.product_category] = [];
    }
    acc[item.product_category].push(item);
    return acc;
  }, {});

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

     
      <div className="shopcategory-products">
        {Object.keys(categorizedProducts).map((category) => {
          if (props.product_category === category) {
            return (
              <div key={category}>
                <h2>{category}</h2>
                <div className="shopcategory-product-list">
                  {categorizedProducts[category].map((item) => (
                    <Item
                      key={item.product_id}
                      id={item.product_id}
                      name={item.product_name}
                      image={item.image}
                      new_price={item.new_price}
                      old_price={item.old_price}
                    />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;
*/