import React, { useEffect, useState } from 'react';
import { SelectInput } from '../inputs/select-input';
import TextInput from '../inputs/text-input';
import { motion } from 'framer-motion';
import { slideAnimation } from '../../constants';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';
import {
  collectionRefAbrasionType,
  collectionRefBrakeBends,
  collectionRefCurrentUsedPlateType,
  collectionRefEstimatedDeliveryDate,
  collectionRefFasteningusingStuds,
  collectionRefImpactType,
  collectionRefPlateType,
  collectionRefRolledBends,
  collectionRefSunkBolts,
} from '../../db';
import { Sorting } from '../../utils';
import { collectionRef, dbRefCollections } from '../../db';
import Loader from '../loader/Loader';
import { generateArray } from '../../pages/dashboard/fieldCustomizer';

const FabForm = ({
  insideCutImg,
  insideChildCroppedImage,
  dropdowns,
  handleDropdowns,
  form,
  handleChange,
  currentFieldIndex,
  setCurrentFieldIndex,
  setCurrentFieldName,
  currentFieldName,
}) => {
  // const handleSelectDropdown = (name, value) => {
  //   handleDropdowns(name, value);
  //   setCurrentFieldIndex((ps) => ps + 1);
  // };
  const [plateTypeOptions, setPlateTypeOptions] = useState([]);
  const [currentUsedPlateTypeOptions, setCurrentUsedPlateTypeOptions] =
    useState([]);
  const [abrasionTypeOptions, setAbrasionTypeOptions] = useState([]);
  const [ImpactTypeOptions, setImpactTypeOptions] = useState([]);
  const [fasteningusingStudsOptions, setFasteningusingStudsOptions] = useState(
    []
  );
  const [brakeBendsOptions, setBrakeBendsOptions] = useState([]);
  const [rolledBendsOptions, setRolledBendsOptions] = useState([]);
  const [sunkBoltsOptions, setSunkBoltsOptions] = useState([]);
  const [
    estimationDeliveryInWeeksOptions,
    setEstimationDeliveryInWeeksOptions,
  ] = useState([]);
  const [weekOptions, setWeekOptions] = useState([]);

  const [fields, setFields] = useState();
  // const [currentFieldIndex, setCurrentFieldIndex] = useState(null);
  const [screenLoading, setScreenLoading] = useState(false);

  let options = [];
  for (let i = 0; i <= 50; i++) {
    options.push({ label: i.toString(), value: i });
  }

  useEffect(() => {
    const updatedWeekOptions = estimationDeliveryInWeeksOptions.map((item) => ({
      label: `${item.label} ${item.label === 1 ? 'Week' : 'Weeks'}`,
      value: item.value.toString(),
    }));

    updatedWeekOptions.push({
      label: `upto ${estimationDeliveryInWeeksOptions?.length} Weeks`,
      value: `${estimationDeliveryInWeeksOptions?.length}+`,
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

    const unsubscribeFunctions = subscriptions.map(([ref, setter]) =>
      fetchDataAndUpdateFields(ref, setter)
    );

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  useEffect(() => {
    setScreenLoading(true);
    const subscribeToCollection = (collectionRef, fieldName) => {
      return onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        console.log({ data });
        setFields([
          ...data[0]?.inputs,
          // {
          //   label: 'Perimeter Welding',
          //   placeholder: 'Select Perimeter Welding',
          //   options: [
          //     { label: 'No', value: false },
          //     { label: 'Yes', value: true },
          //   ],
          //   name: 'perimeterWelding',
          // },
          // {
          //   label: 'Stitch Welding',
          //   placeholder: 'Select Stitch Welding',
          //   options: [
          //     { label: 'No', value: false },
          //     { label: 'Yes', value: true },
          //   ],
          //   name: 'stitchWelding',
          // },

          // {
          //   label: 'Calculate Estimate with Fabrication Services',
          //   placeholder: 'Select',
          //   options: [
          //     { label: 'No', value: false },
          //     { label: 'Yes', value: true },
          //   ],
          //   name: 'fabricator',
          // },
          // {
          //   label: 'Zip Code',
          //   placeholder: 'Enter Zip Code',
          //   name: 'zipCode',
          //   fieldType: 'number',
          //   max: 5,
          // },
          // {
          //   label: 'Delivery to Site Date',
          //   placeholder: 'Enter Delivery to Site Date',
          //   name: 'dtsDate',
          //   fieldType: 'date',
          // },
        ]);
        setCurrentFieldIndex(0);
        setScreenLoading(false);
        console.log(data[0]?.inputs);
      });
    };

    const unsubscribeFunctions = subscribeToCollection(
      dbRefCollections?.ref,
      dbRefCollections?.name
    );

    return () => {
      // unsubscribeFunctions?.unsubscribe();
    };
  }, []);
  console.log({ fields });

  return (
    <div style={{ height: '100%' }} className="image-dropdown">
      {screenLoading ? (
        <Loader />
      ) : (
        <>
          {
            <motion.div {...slideAnimation('left')} className="img head">
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
          <div style={{ width: '100%', height: '100%' }}>
            <motion.div {...slideAnimation('down')} className="details">
              <p className="details-heading">Details</p>
              <p style={{ width: 'auto' }} className="details-desc">
                Kindly provide the following details to get the estimation of
                your object.
              </p>
            </motion.div>
            <div
            className='input-parent'
              // style={{
              //   width: '100%',
              //   maxHeight: 'calc(100% - 100px)',
              //   // minhe: "200px",
              //   display: 'flex',
              //   justifyContent: 'center',
              //   overflowY: 'auto',
              //   padding:"50px 0px"
              // }}
            >
              <div className="dropdown">
                {fields?.map((item, index) => {
                  return (
                    //  <div style={{ width: "calc(100% - 60px)" }} key={item.id}>
                    // <p style={{ marginBottom: "5px" }}>{item.label}:</p>
                    // <motion.div {...slideAnimation("up")}>
                    <motion.div {...slideAnimation('up')}>
                      {item?.fieldType === 'number' ||
                        item?.fieldType === 'date' ? (
                        <TextInput
                          name={item.name}
                          value={dropdowns[item.name]}
                          label={item.label}
                          type={item?.fieldType}
                          placeholder={item?.placeholder}
                          handleChange={handleDropdowns}
                          blinking={index === currentFieldIndex}
                          disabled={index > currentFieldIndex}
                          setCurrentFieldName={setCurrentFieldName}
                          onFocus={() => setCurrentFieldName(item.name)}
                          max={item.max}
                        />
                      ) : (
                        <SelectInput
                          autoOpen
                          isForm
                          customizer
                          name={item.name}
                          value={dropdowns[item.name]}
                          label={item.label}
                          blinking={index === currentFieldIndex}
                          disabled={index > currentFieldIndex}
                          setCurrentFieldName={setCurrentFieldName}
                          options={
                            item.options ||
                            generateArray(item.min, item.max).map((i) => {
                              if (
                                item.label ===
                                'Estimated Delivery Date in Weeks'
                              ) {
                                return {
                                  label: `${i} ${i === 1 ? 'week' : 'weeks'}`,
                                  value: i,
                                };
                              } else {
                                return { label: i, value: item.multiplier };
                              }
                            })
                          }
                          placeholder={
                            item?.placeholder || `Select ${item?.label}`
                          }
                          handleChange={handleDropdowns}
                        />
                      )}
                    </motion.div>
                    // </motion.div>
                    // </div>
                  );
                })}
                <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="perimeterWelding"
                    value={dropdowns.perimeterWelding}
                    label="Perimeter Welding"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select Perimeter Welding"
                    handleChange={handleDropdowns}
                  />
                </motion.div>
                <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="stitchWelding"
                    value={dropdowns.stitchWelding}
                    label="Stitch Welding"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select Stitch Welding"
                    handleChange={handleDropdowns}
                  />
                </motion.div>
                <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="fabricator"
                    value={form.fabricator}
                    label="Calculate Estimate with Fabrication Services"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select"
                    handleChange={handleChange}
                  />
                </motion.div>
                <motion.div {...slideAnimation('up')}>
                  <TextInput
                    name="zipCode"
                    value={dropdowns.zipCode}
                    label="Zip Code"
                    type="number"
                    placeholder="Enter Zip Code"
                    handleChange={handleDropdowns}
                  />
                </motion.div>
                <motion.div {...slideAnimation('up')}>
                  <TextInput
                    name="dtsDate"
                    value={dropdowns.dtsDate}
                    label="Delivery to Site Date"
                    type="date"
                    placeholder="Enter Delivery to Site Date"
                    handleChange={handleDropdowns}
                  />
                </motion.div>
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="plateType"
                value={dropdowns.plateType}
                label="Wear Plate Type for Estimate"
                options={plateTypeOptions}
                placeholder="Select Wear Plate Type for Estimate"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="deliveryDate"
                value={dropdowns.deliveryDate}
                label="Estimated Delivery Date"
                options={weekOptions}
                placeholder="Select Estimated Delivery Date"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="plateTypeUsed"
                value={dropdowns.plateTypeUsed}
                label="Type of wear Plate Used Currently"
                options={currentUsedPlateTypeOptions}
                placeholder="Select Type of wear Plate Used Currently"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="perimeterWelding"
                    value={dropdowns.perimeterWelding}
                    label="Perimeter Welding"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select Perimeter Welding"
                    handleChange={handleDropdowns}
                  />
                </motion.div>
                <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="stitchWelding"
                    value={dropdowns.stitchWelding}
                    label="Stitch Welding"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select Stitch Welding"
                    handleChange={handleDropdowns}
                  />
                </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="fastening"
                value={dropdowns.fastening}
                label="Fastening using Studs"
                options={Sorting(fasteningusingStudsOptions)}
                placeholder="Select Fastening"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="brakeBends"
                value={dropdowns.brakeBends}
                label="How many Press Brake Bends to bend the radius"
                options={Sorting(brakeBendsOptions)}
                placeholder="Select Brake Bends"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="rolledBends"
                value={dropdowns.rolledBends}
                label="How many Rolled Bends"
                options={Sorting(rolledBendsOptions)}
                placeholder="Select Rolled Bends"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="sunkBoltsHoles"
                value={dropdowns.sunkBoltsHoles}
                label="How Many Counter Sunk Bolts Holes"
                options={Sorting(sunkBoltsOptions)}
                placeholder="Select Sunk Bolts Holes"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="abrasionType"
                value={dropdowns.abrasionType}
                label="Abrasion Type"
                options={abrasionTypeOptions}
                placeholder="Select Abrasion Type"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation("up")}>
              <SelectInput
                name="impactType"
                value={dropdowns.impactType}
                label="Impact Type"
                options={ImpactTypeOptions}
                placeholder="Select Impact Type"
                handleChange={handleDropdowns}
              />
            </motion.div> */}
                {/* <motion.div {...slideAnimation('up')}>
                  <SelectInput
                    autoOpen
                    isForm
                    customizer
                    name="fabricator"
                    value={form.fabricator}
                    label="Calculate Estimate with Fabrication Services"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select"
                    handleChange={handleChange}
                  />
                </motion.div> */}
                {/* <motion.div {...slideAnimation('up')}>
                  <TextInput
                    name="zipCode"
                    value={dropdowns.zipCode}
                    label="Zip Code"
                    type="number"
                    placeholder="Enter Zip Code"
                    handleChange={handleDropdowns}
                  />
                </motion.div> */}
                {/* <motion.div {...slideAnimation('up')}>
                  <TextInput
                    name="dtsDate"
                    value={dropdowns.dtsDate}
                    label="Delivery to Site Date"
                    type="date"
                    placeholder="Enter Delivery to Site Date"
                    handleChange={handleDropdowns}
                  />
                </motion.div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FabForm;
