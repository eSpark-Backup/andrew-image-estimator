import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes />
        <ToastContainer />
      </div>
    </BrowserRouter>
  )
}

export default App