import React from 'react'
import { menuList } from '../constants'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

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
                                <div key={index} onClick={() => navigate(item.path)} className='sidebar-menu-item'>
                                    <div className='sidebar-menu-icon'>
                                        <img width={25} src={item.icon} alt='icon' />
                                    </div>
                                    <div className='sidebar-menu-text'>
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
