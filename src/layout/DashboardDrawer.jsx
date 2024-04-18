import React, { useLayoutEffect, useState } from 'react'
import { hamburger } from '../assets'
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminMenuList, menuList } from '../constants';
import { useScreenWidth } from '../hooks';

const DashboardDrawer = ({ drawerOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const screenWidth = useScreenWidth();
    const [menu, setMenu] = useState(menuList);
    
    const isSmallScreen = screenWidth < 1000;
    const menuToRender = location.pathname === '/admin' ? AdminMenuList : menu;
    
    
    useLayoutEffect(() => {
        if (token) {
            setMenu(menuList);
        } else {
            setMenu(menuList.filter((val) => val.name === 'Estimations'));
        }
    }, [token]);


    return (
        <div className={`${drawerOpen && !!isSmallScreen ? "customed-side-drawer-container-open" : "customed-side-drawer-container-close"}`}>
            <div className="customed-side-drawer-box">
                <div className='drawer-header-container'>
                    <h3>{location.pathname !== '/admin' ? 'Dashboard' : 'Admin Panel'}</h3>
                    <div>
                        <img onClick={onClose} src={hamburger} className='hamburger-icon' />
                    </div>
                </div>

                <br />
                <br />

                <div className="drawer-menu">
                    {/* MENU SECTION  */}
                    <>
                        {menuToRender.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(item.path)}
                                className={`drawer-menu-item ${location.pathname === item?.path ? 'active-item' : ''
                                    }`}
                            >
                                <div className="sidebar-menu-icon">
                                    <img
                                        width={25}
                                        src={
                                            location.pathname === item?.path
                                                ? item?.icon
                                                : item?.activeIcon
                                        }
                                        alt="icon"
                                    />
                                </div>
                                <div
                                    className={`drawer-menu-text ${location.pathname === item?.path ? 'active-text' : ''
                                        }`}
                                >
                                    <h6>{item.name}</h6>
                                </div>
                            </div>
                        ))}
                    </>

                </div>
            </div>
        </div>
    )
}

export default DashboardDrawer