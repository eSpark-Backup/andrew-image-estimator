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
                <h2 style={{ color: "white" }}>Logo</h2>
                {!token ? <div className='header-links'>
                    <button onClick={() => navigate("/sign-up")}>Signup</button>
                    <button onClick={() => navigate("/login")}>Login</button>
                </div> : <div className='header-links'>
                    <button onClick={() => setLogoutModalOpen(true)}>Logout</button>
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
                    // navigate("/")
                    logout()
                    setLogoutModalOpen(false)
                }}
            />
            <ConfirmModal modalIsOpen={isSuccessModalOpen} closeModal={() => setIsSuccessModalOpen(false)} />
        </>
    )
}

export default Header
