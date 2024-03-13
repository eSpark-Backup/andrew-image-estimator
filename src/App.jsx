import React, { useEffect } from 'react'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <div>
          {/* <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> */}
            <Routes />
          {/* </motion.main> */}
          <ToastContainer key="toast" />
        </div>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App
