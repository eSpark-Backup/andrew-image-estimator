import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    return (
        <div className='header'>
            <h2 style={{ color: "white" }}>Logo</h2>
            {location?.pathname === "/" ? <div className='header-links'>
                <h2 style={{ color: "white" }}><span style={{ cursor: "pointer" }}>Signup</span> | <span style={{ cursor: "pointer" }}>Login</span></h2>
            </div> : location.pathname === "/trash" ? <div className='header-links'>
                <h2 style={{ color: "white" }}><span style={{ cursor: "pointer" }}>Logout</span></h2>
            </div> : null}
        </div>
    )
}

export default Header
