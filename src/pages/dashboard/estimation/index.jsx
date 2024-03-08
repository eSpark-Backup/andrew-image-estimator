import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../../components'
import { getAllEstimationsApi } from "../../../services/estimationsApi";
import { getErrors } from "../../../algorithm";
import { EstimatorList } from '../../../layout'
import Loader from '../../../components/loader/Loader';

const Estimations = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false)

  const token = window?.localStorage?.getItem("token");

  const fetchAllEstimations = () => {
    setLoading(true)
    getAllEstimationsApi()
      .then((res) => {
        setLoading(false)
        setData(res?.data);
        setFilteredData(res?.data);
      })
      .catch((err) => {
        setLoading(false)
        getErrors(err)
      });
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

  if (loading) {
    return (
      <Loader />
    )
  }

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
