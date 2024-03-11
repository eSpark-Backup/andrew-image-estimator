import React, { useEffect } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import checkmark from '../../assets/icons/Checkmark.svg';

const ConfirmModal = ({ modalIsOpen, closeModal }) => {
    const customStyles = {
        width: '450px',
        height: '250px',
        padding: '0px',
    };
    useEffect(() => {
        if (modalIsOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [modalIsOpen]);

    return (
        <Rodal
            visible={modalIsOpen}
            onClose={closeModal}
            customStyles={customStyles}
            animation="slideUp"
            showCloseButton={false}
        >
            <div className="modal2" style={{ rowGap: '20px' }}>
                <div className="logo">
                    <img src={checkmark} alt="Checkmark" />
                </div>
                <p className='heading'>Successfully Sent!</p>
                <p className='description'>Estimation has been successfully sent to your email.</p>
                <button className='button' onClick={closeModal}>Close</button>
            </div>
        </Rodal>
    );
};

export default ConfirmModal;
