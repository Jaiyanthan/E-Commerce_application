import React, { useState } from 'react';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import {TextField} from '@material-ui/core';

//import local files
import './Product.css';
import { useStateValue } from './StateProvider';

function Product({id ,title ,image ,price ,rating, index}) {

   const [{basket} ,dispatch] = useStateValue()

   const [state , setState] = useState();
   
   

     console.log("this is the basket >>>" , basket)
   const addToBasket = () =>{
       //dispatch the action into the data layer
       dispatch({
           type : "ADD_TO_BASKET",
          item:{
              id:id,
              title:title,
              image:image,
              price:price,
              rating:rating,
              
          },
       })
     
   }
   
 return (
        <div className="product">
          <div className="product_info">
                <p>{title}</p>
            

            <div className="product_price">
                <small>₹</small>
                <strong>{price}</strong>
            </div>
           

            <div className="product_rating">
                {Array(rating)
                .fill()
                .map((_, i) => (
                    <p>★</p>
                ))}
              
            </div>
          </div>

          <img className="image"
           src={image}
           alt="" />

       <button onClick={addToBasket}>Add to basket</button>
          <select onChange={(e)=>{
              const selected = e.target.value;
              setState(selected)
          }}>
              <option value="1">01</option>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="4">04</option>
              <option value="5">05</option>
              <option value="6">06</option>
              <option value="7">07</option>
              <option value="8">08</option>
              <option value="9">09</option>
              <option value="10">10</option>
          </select>
      </div>
    )
}

export default Product
