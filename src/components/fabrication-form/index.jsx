import React, { useEffect, useState } from "react";
import { SelectInput } from "../inputs/select-input";
import TextInput from "../inputs/text-input";
import { motion } from "framer-motion"
import { slideAnimation } from "../../constants";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";
import db from "../../firebase"
import { collectionRefAbrasionType, collectionRefBrakeBends, collectionRefCurrentUsedPlateType, collectionRefEstimatedDeliveryDate, collectionRefFasteningusingStuds, collectionRefImpactType, collectionRefPlateType, collectionRefRolledBends, collectionRefSunkBolts } from "../../db";
import { Sorting } from "../../utils";

const FabForm = ({
  insideCutImg,
  insideChildCroppedImage,
  dropdowns,
  handleDropdowns,
  form,
  handleChange,
}) => {
  const [plateTypeOptions, setPlateTypeOptions] = useState([])
  const [currentUsedPlateTypeOptions, setCurrentUsedPlateTypeOptions] = useState([])
  const [abrasionTypeOptions, setAbrasionTypeOptions] = useState([])
  const [ImpactTypeOptions, setImpactTypeOptions] = useState([])
  const [fasteningusingStudsOptions, setFasteningusingStudsOptions] = useState([])
  const [brakeBendsOptions, setBrakeBendsOptions] = useState([])
  const [rolledBendsOptions, setRolledBendsOptions] = useState([])
  const [sunkBoltsOptions, setSunkBoltsOptions] = useState([])
  const [estimationDeliveryInWeeksOptions, setEstimationDeliveryInWeeksOptions] = useState([])
  const [weekOptions, setWeekOptions] = useState([]);

  let options = [];
  for (let i = 0; i <= 50; i++) {
    options.push({ label: i.toString(), value: i });
  }

  useEffect(() => {
    const updatedWeekOptions = estimationDeliveryInWeeksOptions.map((item) => ({
      label: `${item.label} ${item.label === 1 ? "Week" : "Weeks"}`,
      value: item.value.toString(),
    }));

    updatedWeekOptions.push({ 
      label: `upto ${estimationDeliveryInWeeksOptions?.length} Weeks`, 
      value: `${estimationDeliveryInWeeksOptions?.length}+` 
    });

    setWeekOptions(Sorting(updatedWeekOptions));
  }, [estimationDeliveryInWeeksOptions]);



  useEffect(() => {
    const fetchDataAndUpdateFields = (collectionRef, setOptions) => {
      return onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setOptions(data);
      });
    };
  
    const subscriptions = [
      [collectionRefPlateType, setPlateTypeOptions],
      [collectionRefCurrentUsedPlateType, setCurrentUsedPlateTypeOptions],
      [collectionRefAbrasionType, setAbrasionTypeOptions],
      [collectionRefImpactType, setImpactTypeOptions],
      [collectionRefFasteningusingStuds, setFasteningusingStudsOptions],
      [collectionRefBrakeBends, setBrakeBendsOptions],
      [collectionRefRolledBends, setRolledBendsOptions],
      [collectionRefSunkBolts, setSunkBoltsOptions],
      [collectionRefEstimatedDeliveryDate, setEstimationDeliveryInWeeksOptions],
    ];
  
    const unsubscribeFunctions = subscriptions.map(([ref, setter]) => fetchDataAndUpdateFields(ref, setter));
  
    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, []);




  return (
    <div style={{height: "100%"}} className="image-dropdown">
      {
        <motion.div {...slideAnimation("left")} className="img head">
          <img
            style={{
              width: `${insideCutImg.width}px`,
              height: `${insideCutImg.height}px`,
              zIndex: -9,
            }}
            src={insideChildCroppedImage}
          />
        </motion.div>
      }
      <div style={{ width: "100%", height: "100%" }}>
        <motion.div {...slideAnimation("down")} className="details">
          <p className="details-heading">Details</p>
          <p style={{ width: "auto" }} className="details-desc">
            Kindly provide the following details to get the estimation of your
            object.
          </p>
        </motion.div>
        <div
          style={{
            width: "100%",
            maxHeight: "calc(100% - 100px)",
            // minhe: "200px",
            display: "flex",
            justifyContent: "center",
            overflowY: "auto"
          }}
        >
          <div style={{ width: "80%" }} className="dropdown">
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="plateType"
                value={dropdowns.plateType}
                label="Wear Plate Type for Estimate"
                options={plateTypeOptions}
                placeholder="Select Wear Plate Type for Estimate"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="deliveryDate"
                value={dropdowns.deliveryDate}
                label="Estimated Delivery Date"
                options={weekOptions}
                placeholder="Select Estimated Delivery Date"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="plateTypeUsed"
                value={dropdowns.plateTypeUsed}
                label="Type of wear Plate Used Currently"
                options={currentUsedPlateTypeOptions}
                placeholder="Select Type of wear Plate Used Currently"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="perimeterWelding"
                value={dropdowns.perimeterWelding}
                label="Perimeter Welding"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select Perimeter Welding"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="stitchWelding"
                value={dropdowns.stitchWelding}
                label="Stitch Welding"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select Stitch Welding"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="fastening"
                value={dropdowns.fastening}
                label="Fastening using Studs"
                options={Sorting(fasteningusingStudsOptions)}
                placeholder="Select Fastening"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="brakeBends"
                value={dropdowns.brakeBends}
                label="How many Press Brake Bends to bend the radius"
                options={Sorting(brakeBendsOptions)}
                placeholder="Select Brake Bends"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="rolledBends"
                value={dropdowns.rolledBends}
                label="How many Rolled Bends"
                options={Sorting(rolledBendsOptions)}
                placeholder="Select Rolled Bends"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="sunkBoltsHoles"
                value={dropdowns.sunkBoltsHoles}
                label="How Many Counter Sunk Bolts Holes"
                options={Sorting(sunkBoltsOptions)}
                placeholder="Select Sunk Bolts Holes"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="abrasionType"
                value={dropdowns.abrasionType}
                label="Abrasion Type"
                options={abrasionTypeOptions}
                placeholder="Select Abrasion Type"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="impactType"
                value={dropdowns.impactType}
                label="Impact Type"
                options={ImpactTypeOptions}
                placeholder="Select Impact Type"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="fabricator"
                value={form.fabricator}
                label="Calculate Estimate with Fabrication Services"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select"
                handleChange={handleChange}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <TextInput
                name="zipCode"
                value={dropdowns.zipCode}
                label="Zip Code"
                type="number"
                placeholder="Enter Zip Code"
                handleChange={handleDropdowns}
              />
            </motion.div>
            <motion.div {...slideAnimation("up")}>
              <TextInput
                name="dtsDate"
                value={dropdowns.dtsDate}
                label="Delivery to Site Date"
                type="date"
                placeholder="Enter Delivery to Site Date"
                handleChange={handleDropdowns}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabForm;
