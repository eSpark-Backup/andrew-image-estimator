import React, { useEffect, useState } from "react";
import NormalTable from "../tables/normalTable";
import FabricationTable from "../tables/fabricationTable";
import { downloadFileFromDrive, getErrors, getImgSrc } from "../../algorithm";
import { getEstimationFromById } from "../../services/estimationsApi";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import ModalComponent from "../modal/Modal";
import ConfirmModal from "../modal/ConfirmModal";
import { useNavigate } from "react-router-dom";
import { sendEmailApi } from "../../services/emailApi";
import { usernameExtractfromEmail } from "../../utils";

const Result = ({ modal, setModal, id, calArr, form, imageToken }) => {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  const loggedInUser = window.localStorage.getItem("user");
  const { name, email } = JSON.parse(loggedInUser) || {};



  useEffect(() => {
    if (id) {
      setLoading(true);
      getEstimationFromById(id)
        .then(async (res) => {
          setData(res?.data);
          const promises = res.data.map(async (item) => {
            const { url } = await downloadFileFromDrive(item.image.split("/")[5], imageToken);
            return { ...item, imageUrl: url }; // Assuming you want to add imageUrl to each object
          });
          const updatedData = await Promise.all(promises);
          setData(updatedData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err, "errerrerr")
          setLoading(false);
          toast.error(getErrors(err));
        });
    }
  }, [id]);

  const closeSuccessModal = () => {
    navigate("/");
  };

  const handleSendEmail = (inputEmail) => {
    if (loggedInUser) {
      const data = []
      sendEmailApi({ name, email, data }).then((res) => {
        setSuccessModal(true)
      }
      ).catch((err) => {
        toast.error(getErrors(err));
      });

    }
    else {
      const data = []
      const name = usernameExtractfromEmail(inputEmail)
      const email = inputEmail
      sendEmailApi({ name, email, data }).then((res) => {
        setSuccessModal(true)
      }
      ).catch((err) => {
        toast.error(getErrors(err));
      });
    }
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
                        src={item?.imageUrl}
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
                      src={item?.imageToShow}
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
          `Image Estimator will send your estimation to the email: ${email}`
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
