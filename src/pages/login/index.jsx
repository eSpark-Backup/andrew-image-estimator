import React from 'react'
import signupPic from "../../assets/signup.svg"

import { useNavigate } from 'react-router-dom'
import SigninForm from '../../components/forms/SigninForm'
import Header from '../../components/header/Header'

const Login = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      <div className='main-conatiner'>
        <div className="container">

          <div className='signin-left-container'>
            <div className='signin-left-container-head'>
              <h2 className='center'>Welcome to  Image Estimator. Please Login</h2>
            </div>
            <img src={signupPic} alt="Signup" style={{ width: "100%", height: "400px" }} />
          </div>

          <div className="signin-right-container">

            <h2 className='center'>If you already have an account please login using your email & password.</h2>

            <div className='signin-form-parent'>
              <SigninForm />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login