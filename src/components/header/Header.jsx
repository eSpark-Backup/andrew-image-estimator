import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ModalComponent from '../modal/Modal'
import { logout } from '../../services/authApi'
import ConfirmModal from '../modal/ConfirmModal'

const Header = () => {
    const navigate = useNavigate()
    const token = window?.localStorage.getItem("token")
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    return (
        <>
            <div className='header'>
                <h2 style={{ color: "white" }} onClick={() => setIsSuccessModalOpen(true)}>Logo</h2>
                {!token ? <div className='header-links'>
                    <h2 style={{ color: "white" }}><span onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}>Signup</span> | <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</span></h2>
                </div> : <div className='header-links'>
                    <h2 style={{ color: "white" }}><span style={{ cursor: "pointer" }} onClick={() => setLogoutModalOpen(true)}>Logout</span></h2>
                </div>}

            </div>
            <ModalComponent
                heading={"Logout"}
                description={"Are you sure you want to logout?"}
                btn1Text={"Cancel"}
                btn2Text={"Logout"}
                closeModal={() => setLogoutModalOpen(false)}
                modalIsOpen={isLogoutModalOpen}
                onSuccess={() => {
                    logout()
                    setLogoutModalOpen(false)
                }}
            />
            <ConfirmModal modalIsOpen={isSuccessModalOpen} closeModal={() => setIsSuccessModalOpen(false)} />
        </>
    )
}

export default Header
