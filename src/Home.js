import React from 'react'

//import local files
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
           <div classname="home_container">
               <img className="home_image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                alt=""></img>
           </div>
           <div className="home_row">
               <Product 
               id="001"
               title="Book"
               price={350}
               rating={5}
               image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg"
                />
               <Product
               id="002"
               title="Stand Mixer for Baking"
               price={2100}
               rating={4}
               image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
               />
           </div> 

           <div className="home_row">
              <Product
               id="003"
               title="Smart Watch"
               price={7500}
               rating={4}
               image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
               />

              <Product
               id="004"
               title="Bluetooth speaker with alexa"
               price={3500}
               rating={5}
               image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
               /> 

              <Product
               id="005"
               title="I Pad 5"
               price={40000}
               rating={3}
               image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"
               />
           </div> 

           <div className="home_row">
             <Product
               id="006"
               title="Smart TV"
               price={12500}
               rating={4}
               image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
               
               />
               
           </div>
           
        </div>
    )
}

//

export default Home
