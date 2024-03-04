import React, { useState } from 'react'
import { EstimatorBoxCard, EstimatorTableCard, GeneralButton, SearchBar } from '../../../components'
import { listIcon, squareIcon } from '../../../assets'
import { estimatorListData } from '../../../constants'

const Trash = () => {
  const [search, setSearch] = useState('')
  const [view, setView] = useState(1)

  return (
    <div className='dashboard-main-box'>

      <div>
        {/* SEARCH BAR  */}
        <SearchBar search={search} setSearch={setSearch} />


        {/* HEADER  */}
        <div className='estimator-header-container'>
          <div className='hidden'>
            <GeneralButton style={{ width: "200px", height: "40px" }} text='Create Estimation' />
          </div>

          <div className='listing-view-container'>
            <img width={50} onClick={() => setView(1)} className='rounded' src={squareIcon} alt="icon" />
            <img onClick={() => setView(2)} width={50} className='rounded' src={listIcon} alt="icon" />
          </div>
        </div>
      </div>


      <div className='overflow-y-auto'>
        {
          view === 1 ? <>
            {/* Estimation lists Box view  */}
            <div className='esmitimation-list-container'>

              {
                estimatorListData?.map((item, index) => {
                  return (
                    <EstimatorBoxCard hideControls={true} key={index} item={item} />
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
                      <EstimatorTableCard hideControls={true} key={index} item={item} />
                    )
                  }
                  )
                }
              </div>
            </>
        }
      </div>

    </div>
  )
}

export default Trash