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
  loading2,
  navigatorHandler,
  row,
  inputType
}) => {
  const customStyles = {
    width: "452px",
    // height: dashboard ? "auto" : "22px",
    padding: dashboard ? "20px 20px" : "20px",
  };
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [text, setText] = useState({
    label: "",
    value: "",
  });
  const [number, setNumber] = useState({
    min: "",
    max: "",
    value: "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true)

    loginApi(userData)
      .then((res) => {
        setLoading(false)
        navigate("/")
        closeModal()
      })
      .catch((err) => {
        setLoading(false)
        toast.error(getErrors(err));
      });
  };

  useEffect(() => {
    if (inputType === "text") {
      if (row) {
        setText({
          label: row?.label,
          value: row?.value,
        });
      }
    } else {
      if (row) {
        setNumber({
          min: row?.min,
          max: row?.max,
          value: row?.value,
        });
      }
    }
  }, [row]);

  useEffect(() => {
    if (modalIsOpen) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }

    return () => {
            document.body.classList.remove('modal-open')
      setText({
        label: "",
        value: "",
      });
      setNumber({
        min: "",
        max: "",
        value: "",
      });
    };
}, [modalIsOpen]);


  return (
    <div>
      <Rodal
        visible={modalIsOpen}
        onClose={()=>{
          closeModal()
          setValue("")
        }}
        customStyles={customStyles}
        closeMaskOnClick={true}
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

              <button onClick={handleLogin}>
                {loading ? (
                  <div className="button-loader">
                    <svg viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        ) : inputType === "text" ? (
          <div className="modal" style={{ rowGap: "20px" }}>
            <h2 className="modal-heading">{heading}</h2>
            <div className="login-modal-inputs">
              <TextInput
                style={{ height: "100%", width: "100%" }}
                label="Add field to your dropdown"
                value={text.label}
                handleChange={(_, value) => setText({ ...text, label: value })}
                type={"text"}
                placeholder="Enter field name"
              />
              <TextInput
                style={{ height: "100%", width: "100%" }}
                label="Add price to your field"
                value={text.value}
                handleChange={(_, value) => setText({ ...text, value })}
                type={"number"}
                placeholder="Enter field price"
              />
            </div>
            <div className="signin-button-parents">
              <button
                onClick={navigatorHandler ? navigatorHandler : closeModal}
              >
                {btn1Text}
              </button>

              <button
                disabled={
                  label && placeholder && (!text.label || !text.value)
                    ? true
                    : false
                }
                onClick={() => {
                  onSuccess(text);
                  setText({
                    label: "",
                    value: "",
                  });
                }}
              >
                {loading2 ? (
                  <div className="button-loader">
                    <svg viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                  </div>
                ) : (
                  btn2Text
                )}
              </button>
            </div>
          </div>
        ) : inputType === "number" ? (
          <div className="modal" style={{ rowGap: "20px" }}>
            <h2 className="modal-heading">{heading}</h2>
            <div className="login-modal-inputs">
              <TextInput
                style={{ height: "100%", width: "100%" }}
                label="Add min number to your dropdown"
                value={number.min}
                handleChange={(_, value) =>
                  setNumber({ ...number, min: value })
                }
                type={"number"}
                placeholder="Enter min number"
              />
              <TextInput
                style={{ height: "100%", width: "100%" }}
                label="Add max number to your dropdown"
                value={number.max}
                handleChange={(_, value) =>
                  setNumber({ ...number, max: value })
                }
                type={"text"}
                placeholder="Enter max number"
              />
              <TextInput
                style={{ height: "100%", width: "100%" }}
                label="Add price to your field"
                value={number.value}
                handleChange={(_, value) => setNumber({ ...number, value })}
                type={"number"}
                placeholder="Enter field price"
              />
            </div>
            <div className="signin-button-parents">
              <button
                onClick={navigatorHandler ? navigatorHandler : closeModal}
              >
                {btn1Text}
              </button>

              <button
                disabled={
                  label && placeholder && (!number.min || !number.max || !number.value)
                    ? true
                    : false
                }
                onClick={() => {
                  onSuccess(number);
                  setNumber({
                    min: "",
                    max: "",
                    value: "",
                  });
                }}
              >
                {loading2 ? (
                  <div className="button-loader">
                    <svg viewBox="25 25 50 50">
                      <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                  </div>
                ) : (
                  btn2Text
                )}
              </button>
            </div>
          </div>
        ) : (
          <div
            className={"modal"}
            style={description ? { rowGap: "40px" } : { rowGap: "20px" }}
          >
            <h2 className="modal-heading">{heading}</h2>
            {label && placeholder && (
              <div style={{ width: "70%", marginBottom: "10px", display:"flex", justifyContent:"center", alignItems:"center" }}>
                <TextInput
                  style={{ height: "100%", width: "100%" }}
                  name={name}
                  label={label}
                  value={value}
                  handleChange={(_, value) => setValue(value)}
                  type={inputType || "text"}
                  placeholder={placeholder}
                />
              </div>
            )}

            {description && <p className="modal-description">{description}</p>}

            <div className="signin-button-parents">
            <button onClick={navigatorHandler?navigatorHandler:closeModal}>{btn1Text}</button>

              <button disabled={(label && placeholder && !value) ? true : false} onClick={() => {
                onSuccess(value)
              setValue("")
            }}>{loading2 ?
                        <div className='button-loader'>
                            <svg viewBox="25 25 50 50">
                                <circle r="20" cy="50" cx="50"></circle>
                            </svg>
                        </div>
                        : btn2Text}</button>
            </div>
          </div>
        )}
      </Rodal>
    </div>
  );
};

export default ModalComponent;
