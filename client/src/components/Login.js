import React, {useContext, useState } from 'react'
import signinimage from '../images/signin-image.jpg'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../App';


const Login = () => {

  const {state, dispatch} = useContext(userContext)

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const loginUser = async(e)=>{
    e.preventDefault()
    
    const res = await fetch('/signin',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({email,password})
    })
    //givinf syntax error
    // const data = res.json();
    const data = res.text();

    if(res.status === 400 || !data){
        window.alert("Invalid credentials")
        console.log("Invalid credentials")

    }else{
      dispatch({type:'USER', payload :true})
      window.alert("Success Login")
      console.log("Success Login")
      navigate('/');
    }
  }

  return (
    <div>

      <section class="sign-in">
        <div class="container">
          <div class="signin-content">
            <div class="signin-image">
              <figure><img src={signinimage} alt="sing up image" /></figure>
              <Link to="/signup" class="signup-image-link">Create an account</Link>
            </div>

            <div class="signin-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form" id="login-form">
                <div class="form-group">
                  <label for="email"><i class="zmdi zmdi-account material-icons-email"></i></label>
                  <input type="text" name="email" id="email" 
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  placeholder="Your Email" />
                </div>
                <div class="form-group">
                  <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name="password" id="password" 
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  placeholder="Password" />
                </div>
                
                <div class="form-group form-button">
                  <input type="submit" name="signin" id="signin" onClick={loginUser} class="form-submit" value="Log in" />
                </div>
              </form>
              <div class="social-login">
                <span class="social-label">Or login with</span>
                <ul class="socials">
                  <li><Link to="#"><i class="display-flex-center zmdi zmdi-facebook"></i></Link></li>
                  <li><Link to="#"><i class="display-flex-center zmdi zmdi-twitter"></i></Link></li>
                  <li><Link to="#"><i class="display-flex-center zmdi zmdi-google"></i></Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login