import React, { useState } from 'react'
import { SearchBar } from '../../../components'
import { estimatorListData, slideAnimation } from '../../../constants'
import { EstimatorList } from '../../../layout'
import { motion } from 'framer-motion'

const Trash = () => {
  const [search, setSearch] = useState('')

  return (
    <div className='dashboard-main-box'>

      {/* SEARCH BAR  */}
      <motion.div {...slideAnimation("down")}>
        <SearchBar search={search} setSearch={setSearch} />
      </motion.div>


      {/* Estimation lists  */}
      <EstimatorList estimatorListData={estimatorListData} />

    </div>
  )
}

export default Trash