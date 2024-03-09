import React, { useEffect } from 'react'
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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