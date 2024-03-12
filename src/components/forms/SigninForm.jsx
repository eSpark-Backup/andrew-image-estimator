import React, { useState } from 'react'
import { gestureAnimation, inputAnimation, signinItems, slideAnimation } from '../../constants'
import TextInput from '../inputs/text-input'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { loginApi } from "../../services/authApi";
import { getErrors, validateEmail } from "../../algorithm";
import Loader from '../loader/Loader';
import { motion } from "framer-motion"

const SigninForm = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const InputChangeHandler = (name, value) => {
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const SubmitHandler = () => {
        if (Object.values(userData).some(value => value.trim() === "")) {
            toast.error("All fields are required");
            return;
        }

        if (!validateEmail(userData.email)) {
            toast.error("Please provide valid email");
            return;
        }

        setLoading(true)
        loginApi(userData)
            .then((res) => {
                setLoading(false)
                localStorage.setItem("token", res?.data?.token);
                navigate("/");
            })
            .catch((err) => {
                setLoading(false)
                toast.error(getErrors(err));
            });
    };
    return (
        <>
            <div className='signin-inputs'>
                {signinItems.map((item, index) => (
                    <motion.div {...inputAnimation("input")} key={index} style={{ width: "100%" }}>
                        <TextInput className={"w-100"} handleChange={InputChangeHandler} style={{ height: "40px" }} name={item?.name} label={item?.label} type={item?.type} placeholder={item?.placeholder} />
                    </motion.div>
                ))}
            </div>
            <div className='signin-button-parents'>
                <motion.button onClick={() => navigate("/")} {...gestureAnimation}>
                    Cancel
                </motion.button>

                <motion.button {...gestureAnimation}
                    onClick={SubmitHandler}
                >
                    {loading ?
                        <div className='button-loader'>
                            <svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                            </svg>
                        </div>
                        : "Login"}
                </motion.button>

            </div>
            <p className='typing-animation' style={{ fontSize: "14px", textAlign: "center" }}>New to Image Estimator? Please <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/sign-up")}>Sign Up</span></p>
        </>
    )
}

export default SigninForm
