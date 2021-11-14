import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

//local files
import './Order.css';
import CheckoutProduct from './CheckoutProduct';

function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p> 

            <p className="order_id">
                <small>{order.id}</small>
            </p> 
             {order.data.basket.map(item =>(
                 <CheckoutProduct
                 id={item.id}
                 price={item.price}
                 rating={item.rating}
                 image={item.image}
                 title={item.title}
                 hideButton
             />
             ))}
             <CurrencyFormat
                renderText={(value) => (
                    <h2 className="order_total">Order Total : {value}</h2>
                )}
                      decimalScale={2}
                      value={order.data.amount} 
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
             />
        </div>
    )
}

export default Order
