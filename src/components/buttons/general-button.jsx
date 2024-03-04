import React from 'react'

const GeneralButton = ({ style, text }) => {
    return (

        <button style={{
            backgroundColor: "#303032",
            border: "1px solid #303032",
            cursor: "pointer",
            color: "#ffffff",
            borderRadius: "10px",
            fontSize: "18px",
            width: "120px",
            height: "40px",
            ...style,
        }}>
            {text}
        </button>

    )
}

export default GeneralButton
