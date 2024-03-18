import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../../components'
import { getAllEstimationsApi } from "../../../services/estimationsApi";
import { getErrors } from "../../../algorithm";
import { EstimatorList } from '../../../layout'
import { motion } from 'framer-motion';
import { slideAnimation } from '../../../constants';
import { StateCall } from '../../../ContextApi.jsx';

const Estimations = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const token = window?.localStorage?.getItem("token");
  const { setisLoading } = StateCall()


  const fetchAllEstimations = () => {
    if (token) {
      setisLoading(true)
      getAllEstimationsApi()
        .then((res) => {
          setData(res?.data);
          setFilteredData(res?.data);
        })
        .catch((err) => {
          getErrors(err);
        })
        .finally(() => {
          setisLoading(false)
        });
    }
  };


  useEffect(() => {
    if (token) {
      fetchAllEstimations()
    }
  }, [token]);

  useEffect(() => {
    if (search !== "") {
      setFilteredData(data.filter((item) => item.name.includes(search)));
    } else {
      setFilteredData(data)
    }
  }, [search]);

  // if (loading) {
  //   return (
  //     <Loader />
  //   )
  // }

  return (
    <div className='dashboard-main-box'>
      {/* SEARCH BAR  */}
      <motion.div {...slideAnimation("down")}>
        <SearchBar search={search} setSearch={setSearch} />
      </motion.div>

      {/* Estimation lists  */}
      <EstimatorList fetchAllEstimations={fetchAllEstimations} estimatorListData={filteredData} />

    </div>
  )
}

export default Estimations;
