import React, { useState, useEffect } from 'react'
import { menuList } from '../constants'
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation()

    return (
        <div className='sidebar-container'>
            <div className='sidebar-box'>
                <div className='sidebar-header'>
                    <h6>Dashboard</h6>
                </div>
                <div className='sidebar-menu'>
                    {/* MENU SECTION  */}

                    {
                        menuList.map((item, index) => {
                            return (
                                <div key={index} onClick={() => navigate(item.path)} className={`sidebar-menu-item ${location.pathname === item?.path ? "active-item" : ""}`}>
                                    <div className='sidebar-menu-icon'>
                                        <img width={25} src={location.pathname === item?.path ? item?.activeIcon : item?.icon} alt='icon' />
                                    </div>
                                    <div className={`sidebar-menu-text ${location.pathname === item?.path ? "active-text" : ""}`}>
                                        <h6>{item.name}</h6>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Sidebar
