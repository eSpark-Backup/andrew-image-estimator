import React from 'react'
import Modal from "react-modal";
import checkmark from "../../assets/icons/Checkmark.svg"


const ConfirmModal = ({ modalIsOpen, closeModal }) => {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "450px",
            height: "250px",
            padding: "0px",
        },
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <div className="modal2" style={{ rowGap: "20px" }}>
                <div className="logo">
                    <img src={checkmark} alt="Checkmark" />
                </div>
                <p className='heading'>Successfully Sent!</p>
                <p className='description'>Estimation has been successfully sent to your email.</p>
                <button className='button' onClick={closeModal}>Close</button>
            </div>
        </Modal>
    )
}

export default ConfirmModal
