import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AdminMenuList, menuList } from '../constants';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menu, setMenu] = useState(menuList)
    const token = localStorage.getItem("token");
    const menuToRender = location.pathname === "/admin" ? AdminMenuList : menu;
  
    useLayoutEffect(() => {
        if(token){
            setMenu(menuList);
        } else {
            setMenu(menuList.filter((val) => val.name === "Estimations"))
        }
    }, [token])

    return (
        <div className='sidebar-container'>
            <div className='sidebar-box'>
                <div className='sidebar-header'>
                    <h6>{location.pathname !== "/admin" ? "Dashboard" : "Admin Panel" }</h6>
                </div>
                <div className='sidebar-menu'>
                    {/* MENU SECTION  */}
                    {/* {window.localStorage.getItem("token") && ( */}
                        <>
                            {menuToRender.map((item, index) => (
                                <div key={index} onClick={() => navigate(item.path)} className={`sidebar-menu-item ${location.pathname === item?.path ? "active-item" : ""}`}>
                                    <div className='sidebar-menu-icon'>
                                        <img width={25} src={location.pathname === item?.path ? item?.activeIcon : item?.icon} alt='icon' />
                                    </div>
                                    <div className={`sidebar-menu-text ${location.pathname === item?.path ? "active-text" : ""}`}>
                                        <h6>{item.name}</h6>
                                    </div>
                                </div>
                            ))}
                        </>
                    {/* )}
                    {!window.localStorage.getItem("token") && (
                        <div key={0} onClick={() => navigate(menuList[0].path)} className={`sidebar-menu-item ${location.pathname === menuList[0]?.path ? "active-item" : ""}`}>
                            <div className='sidebar-menu-icon'>
                                <img width={25} src={location.pathname === menuList[0]?.path ? menuList[0]?.activeIcon : menuList[0]?.icon} alt='icon' />
                            </div>
                            <div className={`sidebar-menu-text ${location.pathname === menuList[0]?.path ? "active-text" : ""}`}>
                                <h6>{menuList[0].name}</h6>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
