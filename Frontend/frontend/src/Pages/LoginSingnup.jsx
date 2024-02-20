import React, { useState } from 'react'
import './css/LoginSignup.css'

const LoginSingnup = () => {

  const [state,setState] = useState("Login");
  const [formData , setFormData] = useState({
    name : "",
    password : "",
    email : ""
  })

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const signUp = async() => {
    console.log(formData);
    let responseData;
    await fetch ('http://localhost:4000/signUp',{
      method : 'POST',
      headers : {
        Accept : 'application/form-data',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(formData)
    }).then((res) => res.json()).then((data) => {responseData = data});
    console.log(responseData);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error);
    }
  }

  const Login = async() => {
    console.log(formData);
    let responseData;
    await fetch ('http://localhost:4000/login',{
      method : 'Post',
      headers : {
        Accept : 'application/form-data',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(formData)
    }).then((res) => res.json()).then((data) => {responseData = data});

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.error);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'SignUp' ? <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter your name '/>:
           <></>}

          <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter your Email '/>
          <input type="password"name='password' value={formData.password} onChange={handleChange} placeholder='Enter your password '/>
        </div>
        <button onClick={()=> {state==='Login'? Login() : signUp()}}>Submit</button>

        {state==='Login' ? <p className='loginsignup-login'>Create an Account ? <span style={{cursor:"pointer"}} onClick={() =>{setState("SignUp")}}>Click Here</span></p> :
        <p className='loginsignup-login'>Already have an account ? <span style={{cursor:"pointer"}} onClick={() =>{setState("Login")}}>Login Here</span></p>}
        
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By contnuing , I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSingnup