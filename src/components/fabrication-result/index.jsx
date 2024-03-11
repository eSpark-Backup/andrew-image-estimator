import React, { useEffect, useState } from "react";
import NormalTable from "../tables/normalTable";
import FabricationTable from "../tables/fabricationTable";
import { getErrors, getImgSrc } from "../../algorithm";
import { getEstimationFromById } from "../../services/estimationsApi";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import ModalComponent from "../modal/Modal";
import ConfirmModal from "../modal/ConfirmModal";
import { useNavigate } from "react-router-dom";

const Result = ({ modal, setModal, id, calArr, form }) => {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (id) {
      setLoading(true);
      getEstimationFromById(id)
        .then((res) => {
          setData(res?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(getErrors(err));
        });
    }
  }, [id]);

  const closeSuccessModal = () => {
    navigate("/");
  };

  const handleSendEmail = (email) => {
    /// sending emails
    setSuccessModal(true);
  };

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Loader />
      ) : token ? (
        data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div
                style={{ width: "100%" }}
                key={item.id}
                className="image-dropdown"
              >
                {
                  <div
                    style={{
                      height:
                        data.length === 1 && !item?.fab_service
                          ? "590px"
                          : item?.fab_service
                          ? "1635px"
                          : "590px",
                      borderRadius:
                        data.length === 1
                          ? "10px 0 0 10px"
                          : data.length > 1 && index === 0
                          ? "10px 0 0 0"
                          : data.length > 1 && index === data.length - 1
                          ? "0 0 0 10px"
                          : "0",
                    }}
                    className="img"
                  >
                    <div className={index === 0 && "head"}>
                      <img
                        style={{
                          width: "200px",
                          objectFit: "contain",
                        }}
                        // style={{
                        //   width: `${item?.dimention?.width}px`,
                        //   height: `${item?.dimention?.height}px`,
                        //   zIndex: -9,
                        // }}
                        src={getImgSrc(item?.image)}
                      />
                    </div>
                  </div>
                }
                <div style={{ width: "85%", padding: "20px 0" }}>
                  {index === 0 && (
                    <div className="details">
                      <p className="details-heading">Estimations</p>
                      <p style={{ width: "auto" }} className="details-desc">
                        Here is the estimations of the object you have selected
                      </p>
                    </div>
                  )}
                  {item?.fab_service ? (
                    <FabricationTable item={item} form={form} />
                  ) : (
                    <NormalTable item={item} form={form} />
                  )}
                </div>
              </div>
            );
          })
        ) : null
      ) : calArr.length > 0 ? (
        calArr.map((item, index) => {
          return (
            <div
              style={{ width: "100%" }}
              key={item.polygonsInd}
              className="image-dropdown"
            >
              {
                <div
                  style={{
                    height:
                      calArr.length === 1 &&
                      !Object.keys(item).includes("dropdowns")
                        ? "590px"
                        : Object.keys(item).includes("dropdowns")
                        ? "1635px"
                        : "590px",
                    borderRadius:
                      calArr.length === 1
                        ? "10px 0 0 10px"
                        : calArr.length > 1 && index === 0
                        ? "10px 0 0 0"
                        : calArr.length > 1 && index === calArr.length - 1
                        ? "0 0 0 10px"
                        : "0",
                  }}
                  className="img"
                >
                  <div className={index === 0 && "head"}>
                    <img
                      style={{
                        width: "200px",
                        objectFit: "contain",
                      }}
                      // style={{
                      //   width: `${item?.dimention?.width}px`,
                      //   height: `${item?.dimention?.height}px`,
                      //   zIndex: -9,
                      // }}
                      src={getImgSrc(item?.image)}
                    />
                  </div>
                </div>
              }
              <div style={{ width: "85%", padding: "20px 0" }}>
                {index === 0 && (
                  <div className="details">
                    <p className="details-heading">Estimations</p>
                    <p style={{ width: "auto" }} className="details-desc">
                      Here is the estimations of the object you have selected
                    </p>
                  </div>
                )}
                {Object.keys(item).includes("dropdowns") ? (
                  <FabricationTable
                    calculation={item?.calculation}
                    form={form}
                    dropdowns={item?.dropdowns}
                    token={token}
                  />
                ) : (
                  <NormalTable
                    calculation={item?.calculation}
                    form={form}
                    token={token}
                  />
                )}
              </div>
            </div>
          );
        })
      ) : null}
      <ModalComponent
        heading={"Send Estimation to Email"}
        description={
          "Image Estimator will send your estimation to the email: user@estimator.com"
        }
        btn1Text={"Cancel"}
        btn2Text={"Send"}
        closeModal={() => setModal(false)}
        modalIsOpen={modal === "auth"}
        onSuccess={handleSendEmail}
      />
      <ModalComponent
        heading={"Send Estimation to Email"}
        label={
          "Image Estimator will send your estimation to the following email."
        }
        placeholder={"Enter email"}
        btn1Text={"Cancel"}
        btn2Text={"Send"}
        closeModal={() => setModal(false)}
        modalIsOpen={modal === "unAuth"}
        onSuccess={handleSendEmail}
      />
      <ConfirmModal modalIsOpen={successModal} closeModal={closeSuccessModal} />
    </div>
  );
};

export default Result;
