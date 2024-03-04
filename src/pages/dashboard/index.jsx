import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../../layout'

const DashboardLayout = () => {
  return (
    <>
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