import React from 'react'
import "./loader2.css"
import Header from '../header/Header'

const Loader2 = () => {
    return (
        <>
            <div className='loader2-parent'>
                <Header/>
                <div className='loader2'>
                    <svg viewBox="25 25 50 50">
                        <circle r="20" cy="50" cx="50"></circle>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Loader2