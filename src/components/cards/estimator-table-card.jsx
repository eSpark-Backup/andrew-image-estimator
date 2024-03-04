import React from 'react'
import { DustbinfillIcon, EditIcon } from '../../assets'

const EstimatorTableCard = ({ item, hideControls }) => {
    const { id, name, createdAt } = item || {}
    return (
        <div key={id} className='esmitimation-table-card'>
            <div>
                <p className='esmitimation-list-item-name'>{name}</p>
            </div>

            <div>
                <span>{createdAt}</span>
            </div>

            <div className={`esmitimation-list-item-options ${hideControls ? "hidden" : ""}`}>
                <img width={50} className='rounded' src={EditIcon} alt="icon" />
                <img width={50} className='rounded' src={DustbinfillIcon} alt="icon" />
            </div>
        </div>
    )
}

export default EstimatorTableCard
