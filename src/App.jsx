import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader2 from './components/loader2/Loader2';
import { StateCall } from './ContextApi.jsx';

const App = () => {
  const { isLoading } = StateCall()
  useEffect(() => {
    if (isLoading) {
        document.body.classList.add('modal-open');
    } else {
        document.body.classList.remove('modal-open');
    }

    return () => {
        document.body.classList.remove('modal-open');
    };
}, [isLoading]);


  return (
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <div>
          {isLoading && <Loader2 />}
          <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Routes />
          </motion.main>
          <ToastContainer key="toast" />
        </div>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App
