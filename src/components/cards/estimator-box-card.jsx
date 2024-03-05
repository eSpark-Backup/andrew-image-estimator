import React, { useState } from 'react'
import { DustbinfillIcon, EditIcon } from '../../assets'
import ModalComponent from '../modal/Modal';

const EstimatorBoxCard = ({ item, hideControls }) => {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)

    const { id, name, createdAt } = item || {}
    return (
        <div key={id} className='esmitimation-list-card-container'>
            <div className='esmitimation-list-card'>
                <div>
                    <p className='esmitimation-list-item-name'>{name}</p>
                </div>

                <div className={`esmitimation-list-item-options ${hideControls ? "hidden" : ""}`}>
                    <img width={50} className='rounded' src={EditIcon} alt="icon" />
                    <img width={50} className='rounded' src={DustbinfillIcon} alt="icon" onClick={() => setDeleteModalOpen(true)} />
                </div>
            </div>
            <ModalComponent
                heading={"Delete"}
                description={"Are you sure you want to delete this estimation?"}
                btn1Text={"Cancel"}
                btn2Text={"Delete"}
                closeModal={() => setDeleteModalOpen(false)}
                modalIsOpen={isDeleteModalOpen}
            />

            <span>Created on:  {createdAt}</span>
        </div>
    )
}

export default EstimatorBoxCard
