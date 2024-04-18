import React from 'react'
import { DustbinfillIcon, EditIcon } from '../../assets'
import { formatDate } from "../../algorithm";
import { useNavigate } from 'react-router';

const EstimatorTableCard = ({ item, hideControls, setDeleteModalOpen }) => {
    const navigate = useNavigate();
    const { id, name, created_at } = item || {}
    return (
        <div key={id} className='esmitimation-table-card'>
            <div style={{ width: '40%' }}>
                <p className='esmitimation-list-item-name'>{name}</p>
            </div>

            <div style={{ width: '30%' }}>
                <span>{formatDate(created_at)}</span>
            </div>

            <div style={{ width: '30%' }} className={`esmitimation-list-item-options ${hideControls ? "hidden" : ""}`}>
                <img onClick={() => navigate(`/tool?id=${id}`)} width={50} className='rounded' src={EditIcon} alt="icon" />
                <img onClick={() => setDeleteModalOpen(id)} width={50} className='rounded' src={DustbinfillIcon} alt="icon" />
            </div>
        </div>
    )
}

export default EstimatorTableCard
