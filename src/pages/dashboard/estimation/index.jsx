import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../../components'
import { getAllEstimationsApi } from "../../../services/estimationsApi";
import { getErrors } from "../../../algorithm";
import { EstimatorList } from '../../../layout'

const Estimations = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const token = window?.localStorage?.getItem("token");

  const fetchAllEstimations = () => {
    getAllEstimationsApi()
    .then((res) => {
      setData(res?.data);
      setFilteredData(res?.data);
    })
    .catch((err) => getErrors(err));
  }
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

  return (
    <div className='dashboard-main-box'>
      {/* SEARCH BAR  */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Estimation lists  */}
      <EstimatorList fetchAllEstimations={fetchAllEstimations} estimatorListData={filteredData} />

    </div>
  )
}

export default Estimations;
