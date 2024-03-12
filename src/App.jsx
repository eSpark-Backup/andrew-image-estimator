import React, { useEffect } from 'react'
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <div>
          <Routes />
          <ToastContainer />
        </div>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App