import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../components";
import { add } from "../../../assets";
import ModalComponent from "../../../components/modal/Modal";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import db from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const FieldCustomizer = () => {
  const collectionRefPlateType = collection(db, "Wear Plate Type");
  const collectionRefCurrentUsedPlateType = collection(db, "Current Used Wear Plate Type");
  const collectionRefAbrasionType = collection(db, "Abrasion Type");
  const collectionRefImpactType = collection(db, "Impact Type");
  const [open, setOpen] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [row, setRow] = useState()
  const [currentCollectionRef, setCurrentCollectionRef] = useState()
  const [fields, setFields] = useState([
    {
      id: 1,
      label: "Wear Plate Type for Estimate",
      options: [],
      placeholder: "available options",
      name: "plateType",
      collectionRef: collectionRefPlateType
    },
    {
      id: 2,
      label: "Type of wear Plate Used Currently",
      options: [],
      placeholder: "available options",
      name: "currentPlateType",
      collectionRef: collectionRefCurrentUsedPlateType
    },
    {
      id: 3,
      label: "Abrasion Type",
      options: [],
      placeholder: "available options",
      name: "abrasionType",
      collectionRef: collectionRefAbrasionType
    },
    {
      id: 4,
      label: "Impact Type",
      options: [],
      placeholder: "available options",
      name: "impactType",
      collectionRef: collectionRefImpactType
    },
  ]);



  //Fetching all collection from firebase
  useEffect(() => {
    const fetchDataAndUpdateFields = (collectionRef, fieldName) => {
      return onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
  
        setFields(prevFields => {
          const updatedFields = [...prevFields];
          const fieldIndex = updatedFields.findIndex(field => field.name === fieldName);
          if (fieldIndex !== -1) {
            updatedFields[fieldIndex].options = data;
          }
          return updatedFields;
        });
      });
    };
  
    const unsubscribePlateType = fetchDataAndUpdateFields(collectionRefPlateType, "plateType");
    const unsubscribeCurrentUsedPlateType = fetchDataAndUpdateFields(collectionRefCurrentUsedPlateType, "currentPlateType");
    const unsubscribeAbrasionType = fetchDataAndUpdateFields(collectionRefAbrasionType, "abrasionType");
    const unsubscribeImpactType = fetchDataAndUpdateFields(collectionRefImpactType, "impactType");
  
    return () => {
      unsubscribePlateType();
      unsubscribeCurrentUsedPlateType();
      unsubscribeAbrasionType()
      unsubscribeImpactType()
    };
  }, []);



  const handleDelete = (item, collectionRef) => {
    deleteDoc(doc(collectionRef, item._id)).then(()=>{
      toast.success("Option deleted Successfully")
    }).catch(()=>{
      toast.error("Option is not deleted")
    })
  };

  const handleAddField = async (value) => {
    setLoading(true)
    const clientRef = doc(currentCollectionRef, uuidv4());
    await setDoc(clientRef, {
      label: value,
      value: value,
    }).then(() => {
      toast.success("Option added Successfully");
      setOpen(false)
      setLoading(false)
    })
      .catch((error) => {
        toast.error("Option is not added");
        setLoading(false)
      });
      
  }


  const handleEditField = async (value) => {
    setLoading(true)
    const clientRef = doc(currentCollectionRef, row._id);
    await setDoc(clientRef, {
      label: value,
      value: clientRef.id,
    }).then(() => {
      toast.success("Option Edited Successfully");
      setLoading(false)
    })
      .catch((error) => {
        toast.success("Option is not edited");
        setLoading(false)
      });

    setOpenEditModal(false)
    setRow(null)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {fields.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div onClick={() => {
              setCurrentCollectionRef(item.collectionRef)
              setOpen(true)
            }} className="add">
              <img src={add} alt="add" />
            </div>
            <div style={{ width: "calc(100% - 60px)" }} key={item.id}>
              <p style={{ marginBottom: "5px" }}>{item.label}:</p>
              <SelectInput
                autoOpen
                customizer
                name={item.name}
                // value={form.unit}
                options={item.options}
                placeholder={item.placeholder}
                handleDelete={(row) => handleDelete(row, item?.collectionRef)}
                handleEdit={(row) => {
                  setRow(row)
                  setOpenEditModal(true)
                  setCurrentCollectionRef(item?.collectionRef)
                }}
                handleChange={()=> console.log("changing")}
              />
            </div>
          </div>
        );
      })}
      <ModalComponent
        heading={"Add"}
        label={
          `add fields to your dropdown`
        }
        placeholder={"Enter value"}
        btn1Text={"Cancel"}
        btn2Text={"Add"}
        closeModal={() => setOpen(false)}
        modalIsOpen={open}
        onSuccess={handleAddField}
        loading2={loading}
      />
      <ModalComponent
        heading={"Edit"}
        label={
          `Edit fields to your dropdown`
        }
        placeholder={"Enter value"}
        btn1Text={"Cancel"}
        btn2Text={"Edit"}
        closeModal={() => setOpenEditModal(false)}
        modalIsOpen={openEditModal}
        onSuccess={handleEditField}
        currentValue={row?.label}
        loading2={loading}
      />
    </div>
  );
};

export default FieldCustomizer;
