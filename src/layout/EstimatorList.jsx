import React, { useState } from 'react'
import { EstimatorBoxCard, EstimatorTableCard, GeneralButton } from '../components'
import { listIcon, squareIcon } from '../assets'
import { useLocation } from 'react-router-dom'


const EstimatorList = ({ estimatorListData }) => {
    const [view, setView] = useState(1)
    const hasData = estimatorListData?.length > 0
    const location = useLocation()
    const isTrash = location.pathname.includes('trash')



    return (
        <>
            <div className='estimator-header-container'>
                <div className={!hasData || isTrash ? "hidden" : ""}>
                    <GeneralButton style={{ width: "200px", height: "40px" }} text='Create Estimation' />
                </div>

                <div className='listing-view-container'>
                    <img width={50} onClick={() => setView(1)} className='rounded' src={squareIcon} alt="icon" />
                    <img onClick={() => setView(2)} width={50} className='rounded' src={listIcon} alt="icon" />
                </div>
            </div>

            <div className='overflow-y-auto' >
                {hasData ?
                    <>
                        {
                            view === 1 ? <>
                                {/* Estimation lists Box view  */}
                                <div className='esmitimation-list-container'>

                                    {
                                        estimatorListData?.map((item, index) => {
                                            return (
                                                <EstimatorBoxCard key={index} item={item} hideControls={isTrash} />
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </>

                                :

                                <>
                                    {/* Estimation lists Table view  */}
                                    <div className='esmitimation-list-table-container'>
                                        {
                                            estimatorListData?.map((item, index) => {
                                                return (
                                                    <EstimatorTableCard key={index} item={item} hideControls={isTrash} />
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </>
                        }
                    </>
                    :


                    <div className='estimation-empty-data-container'>
                        <p>You have not created any estimations yet!</p>
                        <br />
                        <GeneralButton style={{ width: "200px", height: "40px" }} text='Create Estimation' />
                    </div>

                }
            </div>
        </>
    )
}

export default EstimatorList
