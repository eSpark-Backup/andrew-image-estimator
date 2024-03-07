import React, { useState } from 'react';
import TextInput from '../inputs/text-input';
import { signupItems } from '../../constants';
import { toast } from "react-toastify";
import { signUpApi } from "../../services/authApi";
import { getErrors, validateEmail } from "../../algorithm";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const InputChangeHandler = (name, value) => {
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const SubmitHandler = () => {
    if (Object.values(userData).some((value) => value.trim() === "")) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(userData.email)) {
      toast.error("Please provide valid email");
      return;
    }

    if (userData.password.length < 8) {
      toast.error("Password must be of 8 characters");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      toast.error("Password didn't match");
      return;
    }

    const payload = {
      email: userData.email,
      password: userData.password,
      first_name: userData.fName,
      last_name: userData.lName,
    };
    signUpApi(payload)
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/login")
      })
      .catch((err) => {
        toast.error(getErrors(err));
      });
  };

    return (
        <>
            <div className='signup-inputs'>
                {signupItems.map((item, index) => (
                    <div style={{ width: "75.5%" }}>
                        <TextInput handleChange={InputChangeHandler} style={{ height: "40px" }} key={index} name={item?.name} label={item?.label} type={item?.type} placeholder={item?.placeholder} />
                    </div>
                ))}
            </div>
            <div className='signup-button-parents'>
                <button>
                    Cancel
                </button>

                <button
                    onClick={SubmitHandler}
                >
                    Sign Up
                </button>

            </div>
        </>
    );
};

export default SignupForm;
