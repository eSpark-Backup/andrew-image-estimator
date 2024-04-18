import React from 'react'
import signupPic from "../../assets/signup.svg"
import SignupForm from '../../components/forms/SignupForm';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import { slideAnimation } from '../../constants';
import { motion } from "framer-motion"

const SignUp = () => {
  const navigate = useNavigate()
  return (
    <>
      <Header />
      {/* , boxShadow: "0px 4px 4px 0px #00000040" */}
      <div className='main-conatiner'>
        <div className="container">

          <motion.div {...slideAnimation("up")} className='signup-left-container'>
            <div className='signup-left-container-head'>
              <h2 className='center'>Welcome to  Image Estimator. Please Sign up</h2>
            </div>
            <img src={signupPic} alt="Signup" />
          </motion.div>

          <div className="signup-right-container">

            <h2 className='center2 typing-animation'>Please fill all the details to sign up. If you already have an account just <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</span></h2>

            <div className='signup-form-parent'>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default SignUp