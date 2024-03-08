import React, { useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if(token){
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  },[])
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Routes />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App