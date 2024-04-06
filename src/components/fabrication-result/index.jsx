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
import { slideAnimation } from "../../constants";
import { motion } from "framer-motion"
import { dbRefResCollections } from "../../db";
import { onSnapshot } from "firebase/firestore";

const Result = ({ modal, setModal, id, calArr, form, imageToken }) => {
  const navigate = useNavigate();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = window.localStorage.getItem("token");
  const loggedInUser = window.localStorage.getItem("user");
  const { name, email } = JSON.parse(loggedInUser) || {};
  const [firebaseData, setFirebaseData] = useState([]);
  const [detailsData, setDetailsData]= useState([]);

  useEffect(() => {   
    if (firebaseData.length > 0 && detailsData.length > 0) {
      const updatedData = firebaseData.map((item) => {
        const dash = item?.payload?.data?.find(i => i.label === "Total Price");
        const CurrentEstimator = detailsData.find((detialsItem) => detialsItem?.total_price === dash?.totalPrice);
        return { ...item, imageUrl: CurrentEstimator?.imageUrl };
      });

      setData(updatedData);
    }
  }, [firebaseData, detailsData]);
  
  useEffect(() => {
    if (id) {
        const subscribeToCollection = (collectionRefRes, fieldName) => {
          return onSnapshot(collectionRefRes, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              _id: doc.id,
              ...doc.data(),
            }));
            setFirebaseData(data.filter((item) => item.payload.estimation_id == id) || []);
          });
        };
    
        const unsubscribeFunctions = subscribeToCollection(
          dbRefResCollections?.ref,
          dbRefResCollections?.name
        );
      setLoading(true);
      getEstimationFromById(id)
        .then(async (res) => {
          const promises = res.data.map(async (item) => {
            const { url } = await downloadFileFromDrive(item.image.split("/")[5], imageToken);
            return { ...item, imageUrl: url }; // Assuming you want to add imageUrl to each object 
            // I want to add the image to table 
           

          });
          const updatedData = await Promise.all(promises);
          setDetailsData(updatedData);
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
    <div style={{ width: "100%", height: "auto" }}>
      {loading ? (
        <Loader />
      ) : token ? (
        data.length > 0 ? (
          data.map((item, index) => {
            return (
              <div
                style={{ width: "98%", height: "auto" }}
                key={item.id}
                className="image-dropdown"
              >
                {
                  <div
                    style={{
                      height:
                        data.length === 1 && !item?.payload?.fab_service
                          ? "590px"
                          : item?.payload?.fab_service
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
                    <motion.div {...slideAnimation("left")} className={index === 0 && "head"}>
                      <img
                        style={{
                          width: "100%",
                          objectFit: "contain",
                        }}
                        // style={{
                        //   width: `${item?.dimention?.width}px`,
                        //   height: `${item?.dimention?.height}px`,
                        //   zIndex: -9,
                        // }}
                        src={item?.imageUrl}
                      />
                    </motion.div>
                  </div>
                }
                <div style={{ width: "85%", padding: "20px 0" }}>
                  {index === 0 && (
                    <motion.div {...slideAnimation("down")} className="details">
                      <p className="details-heading">Estimations</p>
                      <p style={{ width: "auto" }} className="details-desc">
                        Here is the estimations of the object you have selected
                      </p>
                    </motion.div>
                  )}
                  <motion.div {...slideAnimation("up")}>
                  {item?.payload?.fab_service ? (
                    <FabricationTable  item={item.payload?.data} form={form} token={token} />
                  ) : (
                    <NormalTable item={item.payload?.data} form={form} token={token} />
                  )}
                  </motion.div>
                </div>
              </div>
            );
          })
        ) : null
      ) : calArr.length > 0 ? (
        calArr.map((item, index) => {
          return (
            <div
              style={{ width: "100%", height: "auto" }}
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
                  <motion.div {...slideAnimation("left")} className={index === 0 && "head"}>
                    <img
                      style={{
                        width: "100%",
                        objectFit: "contain",
                      }}
                      // style={{
                      //   width: `${item?.dimention?.width}px`,
                      //   height: `${item?.dimention?.height}px`,
                      //   zIndex: -9,
                      // }}
                      src={item?.imageToShow}
                    />
                  </motion.div>
                </div>
              }
              <div style={{ width: "85%", padding: "20px 0" }}>
                {index === 0 && (
                  <motion.div {...slideAnimation("down")} className="details">
                    <p className="details-heading">Estimations</p>
                    <p style={{ width: "auto" }} className="details-desc">
                      Here is the estimations of the object you have selected
                    </p>
                  </motion.div>
                )}
                <motion.div {...slideAnimation("up")}>
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
                </motion.div>
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
