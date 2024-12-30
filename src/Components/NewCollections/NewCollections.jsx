
/*
import React,{useState,useEffect} from 'react'
import './NewCollections.css'
//import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

const NewCollections = () => {
const [new_collection,setNew_collection]=useState([]);
useEffect(()=>{
  fetch('http://localhost:4000/newitems')
  .then((response)=>response.json())
  .then((data)=>setNew_collection(data));
},[])

  return (
    <div className='new-collections'>
        <h1>NEW ITEMS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections

*/

import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/newitems')
      .then((response) => response.json())
      .then((data) =>  setNew_collection(data.data)); 
        
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW ITEMS</h1>
      <hr />
      <div className="collections">
       
        {Array.isArray(new_collection) && new_collection.length > 0 ? (
          new_collection.map((item, i) => (
            <Item key={i}
             id={item.id}
             name={item.name} 
             image={item.image} 
             new_price={item.new_price} 
             old_price={item.old_price} 
            // production_date={item.production_date}
           //  Expire_date={item.Expire_date}
             />
          ))
        ) : (
          <p>No new items available</p>  // Fallback if no items are available
        )}
      </div>
    </div>
  );
};

export default NewCollections;
