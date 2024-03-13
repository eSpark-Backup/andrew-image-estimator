import React, { useState } from "react";
import {
  EstimatorBoxCard,
  EstimatorTableCard,
  GeneralButton,
} from "../components";
import {
  listIcon,
  squareIcon,
  squareIconWhite,
  listIconWhite,
} from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import ModalComponent from "../components/modal/Modal";
import { toast } from "react-toastify";
import {
  createEstimationApi,
  deleteEstimationsApi,
} from "../services/estimationsApi";
import { getErrors } from "../algorithm";
import { motion } from "framer-motion"
import { gridSlideAnimation, slideAnimation } from "../constants";

const EstimatorList = ({ fetchAllEstimations, estimatorListData }) => {
  const [view, setView] = useState(2);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const hasData = estimatorListData?.length > 0;
  const location = useLocation();
  const navigate = useNavigate();
  const isTrash = location.pathname.includes("trash");
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [deleteLoading,setDeleteLoading] = useState(false)

  const handleCreateEstimation = (value) => {
    setLoading(true)
    if (value.trim() === "") {
      setLoading(false)
      toast.error("Please enter name");
    } else {
      createEstimationApi({ name: value })
        .then((res) => {
          setLoading(false)
          toast.success("Estimation Created Successfully");
          navigate(`/tool/?id=${res?.data?.id}`);
        })
        .catch((err) => {
          setLoading(false)
          getErrors(err)
        });
    }
  };

  const handleDelete = (id) => {
    setDeleteLoading(true)
    deleteEstimationsApi(id)
      .then((res) => {
        setDeleteLoading(false)
        toast.success(res?.data && res?.data[0]);
        setDeleteModalOpen(false);
        fetchAllEstimations()
      })
      .catch((err) => {
        setDeleteLoading(false)
        toast.error(getErrors(err)
      )});
  };

  const Navigator = () => {
    navigate("/tool");
    setCreateModalOpen(false);
  };

  return (
    <>
      <div className="estimator-header-container">
        <motion.div {...slideAnimation("left")} className={!hasData || isTrash ? "hidden" : ""}>
          <GeneralButton
            style={{ width: "200px", height: "40px" }}
            text="Create Estimation"
            onClick={() => setCreateModalOpen(true)}
          />
        </motion.div>

        <motion.div {...slideAnimation("right")} className="listing-view-container">
          <img
            onClick={() => setView(2)}
            width={50}
            className={`rounded ${view === 2 ? "active-choice" : ""}`}
            src={view === 2 ? squareIconWhite : squareIcon}
            alt="icon"
          />
          <img
            width={50}
            onClick={() => setView(1)}
            className={`rounded ${view === 1 ? "active-choice" : ""}`}
            src={view === 1 ? listIconWhite : listIcon}
            alt="icon"
          />
        </motion.div >
      </div>

      <div className="overflow-y-auto">
        {hasData ? (
          <>
            {view === 2 ? (
              <>
                {/* Estimation lists Box view  */}
                <div className="esmitimation-list-container">
                  {estimatorListData?.map((item, index) => {
                    return (
                      <motion.div key={index + estimatorListData.length} style={{ width: "40%" }} {...gridSlideAnimation(index)}>
                        <EstimatorBoxCard
                          setDeleteModalOpen={setDeleteModalOpen}
                          item={item}
                          hideControls={isTrash}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* Estimation lists Table view  */}
                <div className="esmitimation-list-table-container">
                  {estimatorListData?.map((item, index) => {
                    return (
                      <motion.div key={index} style={{ width: "100%" }} {...slideAnimation("up")}>
                        <EstimatorTableCard
                          setDeleteModalOpen={setDeleteModalOpen}
                          item={item}
                          hideControls={isTrash}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <motion.div {...slideAnimation("up")} className="estimation-empty-data-container">
            <p>You have not created any estimations yet!</p>
            <br />
            <GeneralButton
              style={{ width: "200px", height: "40px" }}
              text="Create Estimation"
              onClick={() => setCreateModalOpen(true)}
            />
          </motion.div>
        )}
        {window?.localStorage.getItem("token") ? (
          <ModalComponent
            loading2={loading}
            heading={"Create Estimation"}
            label={"Estimation name"}
            placeholder={"Enter estimation name"}
            btn1Text={"Cancel"}
            btn2Text={"Done"}
            closeModal={() => setCreateModalOpen(false)}
            onSuccess={handleCreateEstimation}
            modalIsOpen={isCreateModalOpen}
          />
        ) : (
          <ModalComponent
            heading={"Continue as a Guest"}
            description={
              "Guest mode allows one-time use only. Estimations made will not be saved. Please sign in or create an account for saving your estimation."
            }
            btn1Text={"Continue"}
            btn2Text={"Sign Up"}
            closeModal={() => setCreateModalOpen(false)}
            navigatorHandler={Navigator}
            onSuccess={() => navigate("/sign-up")}
            modalIsOpen={isCreateModalOpen}
          />
        )}
        <ModalComponent
          heading={"Delete"}
          loading2={deleteLoading}
          description={"Are you sure you want to delete this estimation?"}
          btn1Text={"Cancel"}
          btn2Text={"Delete"}
          closeModal={() => setDeleteModalOpen(false)}
          modalIsOpen={isDeleteModalOpen}
          onSuccess={() => handleDelete(isDeleteModalOpen)}
        />
      </div>
    </>
  );
};

export default EstimatorList;
