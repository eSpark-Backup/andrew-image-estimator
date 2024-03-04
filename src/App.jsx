import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import '@fontsource/inter';
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Inter, sans-serif' }}>
        <Routes />
      </div>
    </BrowserRouter>
  )
}

export default App