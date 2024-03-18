import React, { children } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


const context = createContext();

const ContextApi = ({children}) => {

const [isLoading, setisLoading] = useState(false)

  return (
    <context.Provider value={{isLoading, setisLoading}}>
      {children}
    </context.Provider>
  )
}

export default ContextApi;


export const StateCall = () => {
  return useContext(context)
  
}





