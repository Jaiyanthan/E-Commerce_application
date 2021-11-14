import React, { useEffect, useState } from 'react'
import {Link ,useHistory} from 'react-router-dom';
import {useStripe ,useElements ,CardElement} from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';

import './Payment.css';
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer';
import axios from './axios';
import db from './firebase';

function Payment() {

const [{basket,user} ,dispatch]  = useStateValue()
const history = useHistory()

const stripe    =   useStripe();
const elements  = useElements();

const[error ,setError] = useState(null)
const[disabled ,setDisabled] = useState(true)
const[succeeded ,setSucceeded] = useState(false)
const[processing ,setProcessing] = useState("")
const[clientSeceret ,setClientSeceret] = useState(true)

useEffect(()=> {

 //generate the special stripe seceret which we use to charge a customer

 const getCLientSeceret = async () => {
      
    const response = await axios({ 
      method : 'post',
      url : `/payments/create?total=${getBasketTotal(basket)}`
    });
    setClientSeceret(response.data.clientSecret)
 }

 getCLientSeceret()

},[basket])

console.log('The secret is >>>>>' ,clientSeceret)
console.log("User:" , user)

const  handleSubmit = async (e) => {
    //all clever stripe stuff
    e.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSeceret , {
        payment_method : {
            card : elements.getElement(CardElement)
        }
    }).then(({paymentIntent}) => {
         
        db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:  basket,
                amount:  paymentIntent.amount,
                created: paymentIntent.created,
            
          });
        /*db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent)
            .set({
                basket:basket,
                amoount:paymentIntent.amount,
                created:paymentIntent.created
            })*/

         setSucceeded(true)
         setError(null)
         setProcessing(false)

          dispatch({
              type:'EMPTY_BASKET'
          })

         history.replace('/orders')
    })
}
const  handleChange = e => {
    //listen for the changes in card element
    //and display any errors as the customer enters thier card number
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")

}
    return (
        <div className="payment">
           <div className="payment_container">
               <h1> Checkout (
                  <Link to ="/checkout">{basket?.length} items</Link>
                   )                   
               </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h2>Delivery Address</h2>
                    </div>

                    <div className="payment_address">
                        <p>{user?.email}</p>
                        <p>React Project Lane</p>
                        <p>Chennai ,TN </p>
                    </div>
                </div> 

                <div className="payment_section">
                   <div className="payment_title">
                     <h2>Review Items and delivery</h2>
                   </div>

                   <div className="payment_items">
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
                </div>          

                <div className="payment_section">
                   <div className="payment_title">
                     <h2>Payment Method</h2>
                   </div>
                   <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className="payment_priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                <>
                                    <p>
                                    
                                   <h3> Order Total : {value}</h3>
                                    </p>
                                   {/* <small className="subtotal__gift">
                                    <input type="checkbox" /> This order contains a gift
                                </small>*/}
                                </>
                                )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} 
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>processing</p> : "Buy Now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                   </div>     
                </div>
           </div>
        </div>
    )
}

export default Payment
