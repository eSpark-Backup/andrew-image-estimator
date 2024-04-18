import React from 'react'
import Rodal from 'rodal'
import { GIFModalStyle } from '../../constants'
import GeneralButton from '../buttons/general-button'

const GIFModal = ({ modalIsOpen, closeModal, GIF, description }) => {
    return (
        <Rodal
            visible={modalIsOpen}
            onClose={closeModal}
            customStyles={GIFModalStyle}
            animation="slideUp"
            showCloseButton={false}
        >
            <div className='GIF-modal-container'>
                <div className='GIF-Image-desc-container'>
                    <img className='modal-GIF' src={GIF} width={"100%"} alt="GIF" />
                    <p className='GIF-modal-description'>{description}</p>
                </div>

                <div className='GIF-modal-details-container'>

                    <GeneralButton
                        style={{ width: "200px", height: "40px" }}
                        text="Close"
                        onClick={closeModal}
                    />
                </div>
            </div>
        </Rodal>
    )
}

export default GIFModal
