import React ,{useState} from 'react';
import {Link ,useHistory} from 'react-router-dom';
import {auth} from './firebase';
import './Login.css';

function Login() {
    
   const history = useHistory(); 
   const [email ,setEmail] = useState('')
   const [password ,setPassword] = useState('')

   const signIn = e => {
      e.preventDefault()
      auth 
          .signInWithEmailAndPassword(email ,password)
          .then(auth => {
              history.push('/')
          })
          .catch(error => alert(error.message))
   }

   const register = e => {
       e.preventDefault()
       auth
           .createUserWithEmailAndPassword(email ,password)
           .then((auth) => {
               if(auth) {
                   history.push('/')
               }
           })
           .catch(error => alert(error.message))  
   }

    return (
        <div className="login">
            <div>
                <Link to="/">
                    <img  className="login_logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"/>
                </Link>
            </div>
           <div className="login_container">
               <h1>Sign-In</h1>

               <form>
                    <h5>E-Mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
                    
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>

                    <button  type='submit' onClick={signIn} className="login_signin">Sign-In</button>
                </form>
                  
                    <button  type='submit' onClick={register} className="login_register">Create your account</button>
           </div>
        </div>
    )
}

export default Login
