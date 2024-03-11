import React, { useEffect, useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import TextInput from "../inputs/text-input";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getErrors, validateEmail } from "../../algorithm";
import { loginApi } from "../../services/authApi";

const ModalComponent = ({
  modalIsOpen,
  closeModal,
  heading,
  label,
  placeholder,
  description,
  btn1Text,
  btn2Text,
  name,
  dashboard,
  onSuccess,
}) => {
  const customStyles = {
    width: "452px",
    // height: dashboard ? "auto" : "22px",
    padding: dashboard ? "20px 0px" : "20px",
  };
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const InputChangeHandler = (name, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = () => {
    if (Object.values(userData).some((value) => value.trim() === "")) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(userData.email)) {
      toast.error("Please provide valid email");
      return;
    }

    loginApi(userData)
      .then((res) => {
        localStorage.setItem("token", res?.data?.token);
        navigate("/");
      })
      .catch((err) => {
        toast.error(getErrors(err));
      });
  };

  useEffect(() => {
    if (modalIsOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }

    return () => {
        document.body.classList.remove('modal-open');
    };
}, [modalIsOpen]);

  return (
    <div>
      <Rodal
        visible={modalIsOpen}
        onClose={closeModal}
        customStyles={customStyles}
        closeMaskOnClick={dashboard || heading === "Continue as a Guest"?false:true}
        animation="slideUp"
        showCloseButton={false}
        
      >
        {dashboard ? (
          <div className="modal" style={{ rowGap: "20px" }}>
            <h2 className="modal-heading">Login</h2>
            <div className="login-modal-inputs">
              <TextInput
                handleChange={InputChangeHandler}
                value={userData.email}
                style={{ height: "80%", width: "100%" }}
                name={"email"}
                label={"Email:"}
                type={"email"}
                placeholder={"Enter email"}
              />
              <TextInput
                handleChange={InputChangeHandler}
                value={userData.password}
                style={{ height: "80%", width: "100%" }}
                name={"password"}
                label={"Password"}
                type={"password"}
                placeholder={"Enter password"}
              />
            </div>
            <p style={{ fontSize: "16px", fontWeight: "400" }}>Or</p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "400",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Sign Up
            </p>
            <div className="signin-button-parents">
              <button onClick={closeModal}>Skip</button>

              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        ) : (
          <div
            className={"modal"}
            style={description ? { rowGap: "40px" } : { rowGap: "20px" }}
          >
            <h2 className="modal-heading">{heading}</h2>
            {label && placeholder && (
              <div style={{ width: "70%", marginBottom: "10px" }}>
                <TextInput
                  style={{ height: "100%", width: "100%" }}
                  name={name}
                  label={label}
                  type={"text"}
                  placeholder={placeholder}
                />
              </div>
            )}

            {description && <p className="modal-description">{description}</p>}

            <div className="signin-button-parents">
              <button onClick={closeModal}>{btn1Text}</button>

              <button onClick={onSuccess}>{btn2Text}</button>
            </div>
          </div>
        )}
      </Rodal>
    </div>
  );
};

export default ModalComponent;
