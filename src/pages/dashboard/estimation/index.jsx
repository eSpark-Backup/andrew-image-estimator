import React, { useState } from 'react'
import { SearchBar } from '../../../components'
import { estimatorListData } from '../../../constants'
import { EstimatorList } from '../../../layout'

const Estimations = () => {
  const [search, setSearch] = useState('')


  return (
    <div className='dashboard-main-box'>
      {/* SEARCH BAR  */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Estimation lists  */}
      <EstimatorList estimatorListData={estimatorListData} />

    </div>
  )
}

export default Estimations