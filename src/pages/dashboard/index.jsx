import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../layout'
import Header from "../../components/header/Header"

const DashboardLayout = () => {
  return (
    <>
      <Header />
      <div className='canvas-container'>
        <div className='dashboard-card'>
          <Sidebar />

          <div className='dashboard-screen-container'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout