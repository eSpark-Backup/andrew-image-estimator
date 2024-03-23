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
  getDocs,
} from "firebase/firestore";
import db from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { AdminDetailsFields, dbRefCollections } from "../../../db";


const FieldCustomizer = () => {

  const [open, setOpen] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [row, setRow] = useState()
  const [currentCollectionRef, setCurrentCollectionRef] = useState()
  const [inputType, setInputType] = useState("text")
  const [ModalDescription, setModalDescription] = useState("add fields to your dropdown")
  const [fields, setFields] = useState(AdminDetailsFields);



  useEffect(() => {
    const subscribeToCollection = (collectionRef, fieldName) => {
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
            updatedFields[fieldIndex].options.sort((a, b) => a.value - b.value);
          }
          return updatedFields;
        });
      });
    };
  
  
    const unsubscribeFunctions = dbRefCollections.map(({ ref, name }) => subscribeToCollection(ref, name));
  
    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
    };
  }, []);


  const handleDelete = (item, collectionRef) => {
    deleteDoc(doc(collectionRef, item._id)).then(() => {
      toast.success("Option deleted Successfully")
    }).catch(() => {
      toast.error("Option is not deleted")
    })
  };

  const handleAddField = async (value) => {
    if(inputType === "text") {
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
    else if(inputType === "number") {
      setLoading(true)
      
    // delete all the previous options
    const querySnapshot = await getDocs(currentCollectionRef);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
     
    // then add new options
    for (let i = 1; i <= value; i++) {
      const clientRef = doc(currentCollectionRef, uuidv4());
      await setDoc(clientRef, {
        label: i,
        value: i,
      }).then(() => {
        if(i == value) {
        toast.success("Option added Successfully");
        setOpen(false)
        setLoading(false)
      }})
        .catch((error) => {
          if (i == value) {
          toast.error("Option is not added");
          setLoading(false)
        }});
      }

    }

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
              if (item.id > 4) {
                setInputType("number")
                setModalDescription("Enter Maximum value for selected option")
              }
              else {
                setModalDescription("add fields to your dropdown")
                setInputType("text")
              }
            }} className="add">
              <img src={add} alt="add" />
            </div>
            <div style={{ width: "calc(100% - 60px)" }} key={item.id}>
              <p style={{ marginBottom: "5px" }}>{item.label}:</p>
              <SelectInput
                autoOpen
                customizer
                showActions={item.id > 4 ? false : true}
                name={item.name}
                // value={form.unit}
                options={item.options}
                placeholder={item.placeholder}
                handleDelete={(row) => handleDelete(row, item?.collectionRef)}
                handleEdit={(row) => {
                  setRow(row)
                  setOpenEditModal(true)
                  setCurrentCollectionRef(item?.collectionRef)
                  setInputType("text")
                }}
                handleChange={() => console.log("changing")}
              />
            </div>
          </div>
        );
      })}
      <ModalComponent
        heading={"Add"}
        label={ModalDescription}
        placeholder={"Enter value"}
        btn1Text={"Cancel"}
        btn2Text={"Add"}
        closeModal={() => setOpen(false)}
        modalIsOpen={open}
        onSuccess={handleAddField}
        loading2={loading}
        inputType={inputType}
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
        inputType={inputType}
      />
    </div>
  );
};

export default FieldCustomizer;
