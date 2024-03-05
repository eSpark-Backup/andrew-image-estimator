import React, { useState } from 'react';
import Modal from 'react-modal';
import TextInput from '../inputs/text-input'
import { useNavigate } from 'react-router-dom';


const ModalComponent = ({ modalIsOpen, closeModal, heading, label, placeholder, description, btn1Text, btn2Text, name, dashboard }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "452px",
            height: dashboard ? "auto" : "252px",
            padding: dashboard ? "20px 0px" : "0px"
        },
    };
    const navigate = useNavigate()

    return (
        <div>
            {/* <button onClick={openModal}>{buttonLabel}</button> */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} shouldCloseOnOverlayClick={dashboard ? false : true}>
                {dashboard
                    ?
                    <div className='modal' style={{ rowGap: "20px" }}>
                        <h2 className='modal-heading'>Login</h2>
                        <div className='login-modal-inputs'>
                            <TextInput style={{ height: "100%", width: "100%" }} name={"email"} label={"Email:"} type={"email"} placeholder={"Enter email"} />
                            <TextInput style={{ height: "100%", width: "100%" }} name={"password"} label={"Password"} type={"password"} placeholder={"Enter password"} />
                        </div>
                        <p style={{ fontSize: "16px", fontWeight: "400" }}>Or</p>
                        <p style={{ fontSize: "16px", fontWeight: "400", textDecoration: "underline", cursor: "pointer" }} onClick={() => { navigate("/sign-up") }}>Sign Up</p>
                        <div className='signin-button-parents'>
                            <button onClick={closeModal}>
                                Skip
                            </button>

                            <button
                            >
                                Login
                            </button>

                        </div>

                    </div>
                    :
                    <div className={"modal"} style={description ? { rowGap: "40px" } : { rowGap: "20px" }}>
                        <h2 className='modal-heading'>{heading}</h2>
                        {label && placeholder && <div style={{ width: "70%", marginBottom: "10px" }}>
                            <TextInput style={{ height: "100%", width: "100%" }} name={name} label={label} type={"text"} placeholder={placeholder} />
                        </div>}

                        {description && <p className='modal-description'>{description}</p>}

                        <div className='signin-button-parents'>
                            <button onClick={closeModal}>
                                {btn1Text}
                            </button>

                            <button
                            >
                                {btn2Text}
                            </button>

                        </div>
                    </div>}
            </Modal>
        </div>
    );
};

export default ModalComponent;
