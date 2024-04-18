import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DashboardDrawer, Sidebar } from '../../layout'
import Header from "../../components/header/Header"
import ModalComponent from '../../components/modal/Modal'
import { hamburger } from '../../assets';

const DashboardLayout = () => {
  const { pathname } = useLocation()
  const cookie = window?.localStorage.getItem("token")
  const [loginModal, setLoginModal] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false);


  const showDrawer = () => {
    setDrawerOpen(true);
  };


  const onClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    cookie ? setLoginModal(false) : setLoginModal(true)
  }, [cookie])



  return (
    <>
      <Header />

      <div className='hamburger-container'>
        <img onClick={showDrawer} src={hamburger} className='hamburger-icon' />
      </div>


      <div className={`canvas-container ${pathname === "/admin" ? "adminScreen" : ""}`}
      >
        <div className='dashboard-card'>
          <Sidebar />

          <div className="dashboard-screen-container">
            <Outlet />
          </div>
        </div>
      </div>


      <ModalComponent
        closeModal={() => setLoginModal(false)}
        modalIsOpen={loginModal}
        dashboard={true}
      />

      <DashboardDrawer
        drawerOpen={drawerOpen}
        onClose={onClose}
      />
    </>
  )
}

export default DashboardLayout