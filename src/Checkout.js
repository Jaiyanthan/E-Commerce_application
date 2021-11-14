import React from 'react';

//import local files
import './Checkout.css';
import Subtotal from './Subtotal'
import {useStateValue} from './StateProvider';
import CheckoutProduct from './CheckoutProduct';

function Checkout() {

    const [{basket ,user} ,dispatch] = useStateValue()  
    
    return (
        <div className="checkout">
              <div >
                 <h3>Hello, {user?.email}</h3> 
                <h2 className="checkout_title">Your Shopping Basket</h2>
               
               {basket.map(item=>(     
                  <CheckoutProduct
                      id={item.id}
                      price={item.price}
                      rating={item.rating}
                      image={item.image}
                      title={item.title}
                  />
               ))}

            </div>
            <div className="checkout_right">
                <h2><Subtotal/></h2>
            </div>
        </div>
    )
}

export default Checkout
