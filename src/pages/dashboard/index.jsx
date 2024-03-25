import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '../../layout'
import Header from "../../components/header/Header"
import ModalComponent from '../../components/modal/Modal'

const DashboardLayout = () => {
  const [loginModal, setLoginModal] = useState(false)
  const cookie = window?.localStorage.getItem("token")
  useEffect(() => {
    cookie ? setLoginModal(false) : setLoginModal(true)
  }, [cookie])
  const { pathname } = useLocation()
  return (
    <>
      <Header />
      <div className={`canvas-container ${pathname === "/admin" ? "adminScreen" : ""}`}>
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
    </>
  )
}

export default DashboardLayout