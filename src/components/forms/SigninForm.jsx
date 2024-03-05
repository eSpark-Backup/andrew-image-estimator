import React, { useState } from 'react'
import { signinItems } from '../../constants'
import TextInput from '../inputs/text-input'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SigninForm = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const InputChangeHandler = (name, value) => {
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const SubmitHandler = () => {
        if (Object.values(userData).some(value => value.trim() === "")) {
            toast.error("All fields are required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
            });
            return;
        }

        console.log(userData);
    };
    return (
        <>
            <div className='signin-inputs'>
                {signinItems.map((item, index) => (
                    <div style={{ width: "75.5%" }}>
                        <TextInput handleChange={InputChangeHandler} style={{ height: "40px" }} key={index} name={item?.name} label={item?.label} type={item?.type} placeholder={item?.placeholder} />
                    </div>
                ))}
            </div>
            <div className='signin-button-parents'>
                <button>
                    Cancel
                </button>

                <button
                    onClick={SubmitHandler}
                >
                    Login
                </button>

            </div>
            <p style={{ fontSize: "14px" }}>New to Image Estimator? Please <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/sign-up")}>Sign Up</span></p>
            <ToastContainer />
        </>
    )
}

export default SigninForm
