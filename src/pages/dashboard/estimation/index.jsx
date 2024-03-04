import React, { useState } from 'react'
import { EstimatorBoxCard, GeneralButton, SearchBar } from '../../../components'
import { listIcon, squareIcon } from '../../../assets'
import { estimatorListData } from '../../../constants'

const Estimations = () => {
  const [search, setSearch] = useState('')

  return (
    <div>

      {/* SEARCH BAR  */}
      <SearchBar search={search} setSearch={setSearch} />


      {/* HEADER  */}
      <div className='estimator-header-container'>
        <div>
          <GeneralButton style={{ width: "200px", height: "40px" }} text='Create Estimation' />
        </div>

        <div className='listing-view-container'>
          <img width={50}
            className='rounded' src={squareIcon} alt="icon" />
          <img width={50} className='rounded' src={listIcon} alt="icon" />
        </div>
      </div>


      {/* Estimation lists Box view  */}
      <div className='esmitimation-list-container'>

        {
          estimatorListData?.map((item, index) => {
            return (
              <EstimatorBoxCard key={index} item={item} />
            )
          }
          )
        }


      </div>


    </div>
  )
}

export default Estimations