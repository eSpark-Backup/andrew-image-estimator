import React from 'react'
import { DustbinfillIcon, EditIcon } from '../../assets'
import { formatDate } from '../../algorithm';

const EstimatorBoxCard = ({ item, hideControls, setDeleteModalOpen }) => {

    const { id, name, created_at } = item || {}
    return (
        <div key={id} className='esmitimation-list-card-container'>
            <div className='esmitimation-list-card'>
                <div>
                    <p className='esmitimation-list-item-name'>{name}</p>
                </div>

                <div className={`esmitimation-list-item-options ${hideControls ? "hidden" : ""}`}>
                    <img width={50} className='rounded' src={EditIcon} alt="icon" />
                    <img width={50} className='rounded' src={DustbinfillIcon} alt="icon" onClick={() => setDeleteModalOpen(id)} />
                </div>
            </div>

            <span>Created on:  {formatDate(created_at)}</span>
        </div>
    )
}

export default EstimatorBoxCard
