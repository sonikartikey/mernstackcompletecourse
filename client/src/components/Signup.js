import React, {useState } from 'react'
import signupimage from '../images/signup-image.jpg'
import {Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  })
  let name, value
  const handleInputs = (e)=>{
    name = e.target.name
    value = e.target.value
    setUser({...user , [name] : value})
  }

  const postData = async(e)=>{
    e.preventDefault()
    const {name,email,phone,work,password,cpassword} = user
    const res = await fetch('/register',{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({name,email,phone,work,password,cpassword})
    })
    //givinf syntax error
    // const data = res.json();
    const data = res.text();
    if(res.status === 422 || !data){
        window.alert("Invalid registration")
        console.log("Invalid registration")

    }else{
      window.alert("Success register")
      console.log("Success register")
      navigate('/login');
    }
  }

  return (
    <>
      <section class="signup">
        <div class="container mt-5">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Sign up</h2>
              <form method="POST" class="register-form" id="register-form">
                <div class="form-group">
                  <label htmlFor="name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="name" id="name" 
                  value ={user.name}
                  onChange = {handleInputs}
                  placeholder="Your Name" />
                </div>
                <div class="form-group">
                  <label htmlFor="email"><i class="zmdi zmdi-email"></i></label>
                  <input type="email" name="email" id="email" 
                  value ={user.email}
                  onChange = {handleInputs}
                  placeholder="Your Email" />
                </div>

                <div class="form-group">
                  <label htmlFor="phone"><i class="zmdi zmdi-phone-in-talk"></i></label>
                  <input type="number" name="phone" id="phone" 
                  value ={user.phone}
                  onChange = {handleInputs}
                  placeholder="Your Phone" />
                </div>

                <div class="form-group">
                  <label htmlFor="work"><i class="zmdi zmdi-slideshow"></i></label>
                  <input type="text" name="work" id="work" 
                  value ={user.work}
                  onChange = {handleInputs}
                  placeholder="Your Profession" />
                </div>


                <div class="form-group">
                  <label htmlFor="pass"><i class="zmdi zmdi-lock"></i></label>
                  <input type="password" name="password" id="pass" 
                  value ={user.password}
                  onChange = {handleInputs}
                  placeholder="Password" />
                </div>
                <div class="form-group">
                  <label htmlFor="cpassword"><i class="zmdi zmdi-lock-outline"></i></label>
                  <input type="password" name="cpassword" id="cpassword" 
                  value ={user.cpassword}
                  onChange = {handleInputs}
                  placeholder="Repeat your password" />
                </div>
                
                <div class="form-group form-button">
                  <input type="submit" name="signup" id="signup" class="form-submit" onClick={postData} value="Register" />
                </div>
              </form>
            </div>
            <div class="signup-image">
              <figure><img src={signupimage} alt="sing up image" /></figure>
              <Link to="/login" class="signup-image-link">I am already member</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Signup;