import React, { useState } from 'react';
import TextInput from '../inputs/text-input';
import { signupItems } from '../../constants';

const SignupForm = () => {
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
        if (Object.values(userData).some(value => value.trim() === "")) {
            alert("All fields are required");
            return;
        }

        if (userData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            alert("Confirm password didn't match");
            return;
        }

        console.log(userData);
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
