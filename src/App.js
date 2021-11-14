import React ,{useState ,useEffect}from 'react';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import  { Elements } from '@stripe/react-stripe-js';


//import local files
import './App.css';
import Header from './Header';
import Orders from './Orders';
import Home from './Home';
import Checkout from './Checkout';
import Payment from './Payment';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';

function App() {

 const [{} ,dispatch]  = useStateValue()
 const promise = loadStripe('pk_test_51Iqf7mSHJiymtJN4i61oBQdh1rZGEFDyFhGiaEkLNDwuZAP1HnuLGE4TavAqMJ8P4BMsufm7pKyC7No2XOFDAJT200aapUiRNU')

  useEffect(() => {
  auth.onAuthStateChanged(authUser => {

   console.log("The user is >>>>" ,authUser) 
    if(authUser) {

      dispatch({
        type: 'SET_USER',
        user:authUser
      })

    }else{
      dispatch({
        type: 'SET_USER',
        user:null
      })
    }
  })
  }, [])
  return (
    
      <Router>
        <div className="app"> 
      <Header/>
        <Switch>
        <Route path="/orders">
              <Orders/>
           </Route>
          <Route path="/login">
              <Login/>
           </Route>
           <Route path="/checkout">
              <Checkout/>
           </Route>
           <Route path="/payment">
               <Elements stripe={promise}>
                 <Payment/>
               </Elements>
              
           </Route>
          <Route path="/">
              <Home/>
          </Route>          
        </Switch> 
        </div>  
      </Router> 
    
  );
}

export default App;
