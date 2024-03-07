import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ModalComponent from '../modal/Modal'

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)
    return (
        <>
            <div className='header'>
                <h2 style={{ color: "white" }}>Logo</h2>
                {location?.pathname === "/" ? <div className='header-links'>
                    <h2 style={{ color: "white" }}><span onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}>Signup</span> | <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</span></h2>
                </div> : location.pathname === "/trash" ? <div className='header-links'>
                    <h2 style={{ color: "white" }}><span style={{ cursor: "pointer" }} onClick={() => setLogoutModalOpen(true)}>Logout</span></h2>
                </div> : null}

            </div>
            <ModalComponent
                heading={"Logout"}
                description={"Are you sure you want to logout?"}
                btn1Text={"Cancel"}
                btn2Text={"Logout"}
                closeModal={() => setLogoutModalOpen(false)}
                modalIsOpen={isLogoutModalOpen}
            />
        </>
    )
}

export default Header
