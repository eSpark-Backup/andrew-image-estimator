import React from 'react'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
    <div>DashboardLayout</div>
    <Outlet />
    </>
  )
}

export default DashboardLayout