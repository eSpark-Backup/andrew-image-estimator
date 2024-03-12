import { useState } from 'react';
import TextInput from '../inputs/text-input';
import { gestureAnimation, inputAnimation, signupItems } from '../../constants';
import { toast } from "react-toastify";
import { signUpApi } from "../../services/authApi";
import { getErrors, validateEmail } from "../../algorithm";
import { useNavigate } from "react-router";
import { motion } from "framer-motion"

const SignupForm = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    signUpApi(payload)
      .then((res) => {
        toast.success(res?.data?.message);
        setLoading(false)
        navigate("/login")
      })
      .catch((err) => {
        setLoading(false)
        toast.error(getErrors(err));
      });
  };

  return (
    <>
      <div className='signup-inputs'>
        {signupItems.map((item, index) => (
          <motion.div {...inputAnimation("input")} style={{ width: "100%" }} key={index}>
            <TextInput className={"w-100"} handleChange={InputChangeHandler} style={{ height: "40px" }} name={item?.name} label={item?.label} type={item?.type} placeholder={item?.placeholder} />
          </motion.div>
        ))}
      </div>
      <div className='signup-button-parents'>
        <motion.button onClick={() => navigate("/")} {...gestureAnimation}>
          Cancel
        </motion.button>

        <motion.button
          {...gestureAnimation}
          onClick={SubmitHandler}
        >
          {loading ? 
           <div className='button-loader'>
            <svg viewBox="25 25 50 50">
              <circle r="20" cy="50" cx="50"></circle>
            </svg>
          </div> 
           : "Sign Up"}
        </motion.button>

      </div>
    </>
  );
};

export default SignupForm;
