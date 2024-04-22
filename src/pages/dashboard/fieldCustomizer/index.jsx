import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../components";
import { EditIcon, add } from "../../../assets";
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
import { collectionRef, dbRefCollections } from "../../../db";
import Loader from "../../../components/loader/Loader";

const FieldCustomizer = () => {
  const collectionRefDetailsForm = collection(db, "details_form");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [row, setRow] = useState("");
  const [fields, setFields] = useState();
  const [FieldsLoading, setFieldsLoading] = useState(false);
  const [docId, setdocId] = useState();

  useEffect(() => {
    setScreenLoading(true);
    const subscribeToCollection = (collectionRef, fieldName) => {
      return onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setFields(data[0]?.inputs);
        setdocId(data[0]?._id);
        setScreenLoading(false);
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

  const handleDelete = (row, obj) => {
    let modifiedFields;
    modifiedFields = fields.map((item) => {
      if (item.label === obj.label) {
        const updatedOptions = item.options.filter(
          (newItem) => newItem.label !== row.label
        );
        return { ...item, options: updatedOptions };
      } else {
        return item;
      }
    });
    setFields(modifiedFields);
  };

  const handleAddField = async (value) => {
    let modifiedFields;
    if (open.type === "text") {
      modifiedFields = fields.map((item) => {
        if (item.label === open.label) {
          const updatedOptions = [
            ...item.options,
            { label: value.label, value: Number(value.value) },
          ];
          return {
            ...item,
            options: updatedOptions,
          };
        } else {
          return item;
        }
      });
    }
    setFields(modifiedFields);
    setOpen(false);
  };

  const handleEditField = async (value) => {
    let modifiedFields;
    if (open.type === "text") {
      modifiedFields = fields.map((item) => {
        if (item.label === open.label) {
          const updatedOptions = item.options.map((option) => {
            if (option.label === row.label) {
              return { label: value.label, value: Number(value.value) };
            } else {
              return option;
            }
          });
          return {
            ...item,
            options: updatedOptions,
          };
        } else {
          return item;
        }
      });
    } else {
      modifiedFields = fields.map((item) => {
        if (item.label === open.label) {
          return {
            ...item,
            min: Number(value.min),
            max: Number(value.max),
            multiplier: Number(value.value),
          };
        } else {
          return item;
        }
      });
    }
    setFields(modifiedFields);
    setOpen(false);
  };

  const handleSubmit = async () => {
    //fields array is updating here we need to call firebase func
    setFieldsLoading(true);
    const clientRef = doc(collectionRefDetailsForm, docId);
    await setDoc(clientRef, {
      inputs: fields,
    }).then(() => {
      toast.success("Fields updated successfully");
      setFieldsLoading(false);
    }
    ).catch((error) => {
      toast.error("Failed to update fields");
      setFieldsLoading(false);
    });
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {screenLoading ? (
        <Loader />
      ) : (
        <>
          <div className="button-container admin-button">

            <button  onClick={handleSubmit}>Save Changes</button>
          </div>

          {fields?.length > 0 &&
            fields?.map((item) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => {
                      if (item.type === "text") {
                        setOpen({ ...item, mode: "add" });
                      } else {
                        setOpen({ ...item, mode: "edit" });
                        setRow({
                          min: item.min,
                          max: item.max,
                          value: item.multiplier,
                        });
                      }
                    }}
                    className="add"
                  >
                    <img
                      src={item.type === "number" ? EditIcon : add}
                      alt="add"
                    />
                  </div>
                  <div style={{ width: "calc(100% - 60px)" }} key={item.id}>
                    <p style={{ marginBottom: "5px" }}>{item.label}:</p>
                    <SelectInput
                      autoOpen
                      customizer
                      showActions={item.type === "number" ? false : true}
                      name={item.name}
                      options={
                        item.options ||
                        generateArray(item.min, item.max).map((i) => {
                          if (
                            item.label === "Estimated Delivery Date in Weeks"
                          ) {
                            return {
                              label: `${i} ${i === 1 ? "week" : "weeks"}`,
                              value: i,
                            };
                          } else {
                            return { label: i, value: i };
                          }
                        })
                      }
                      placeholder="available options"
                      handleDelete={(row) => handleDelete(row, item)}
                      handleEdit={(row) => {
                        setRow(row);
                        setOpen({ ...item, mode: "edit" });
                      }}
                      handleChange={() => console.log("changing")}
                    />
                  </div>
                </div>
              );
            })}
        </>
      )}
      <ModalComponent
        heading={open.mode === "add" ? "Add" : "Edit"}
        label={
          open.mode === "add"
            ? "Add fields to your dropdown"
            : "Edit fields to your dropdown"
        }
        placeholder={"Enter value"}
        btn1Text={"Cancel"}
        btn2Text={open.mode === "add" ? "Add" : "Edit"}
        closeModal={() => setOpen(false)}
        modalIsOpen={open}
        onSuccess={open.mode === "add" ? handleAddField : handleEditField}
        row={row}
        loading2={loading}
        inputType={open.type}
      />
    </div>
  );
};

export default FieldCustomizer;

export function generateArray(min, max) {
  return Array.from({ length: max - min + 1 }, (_, index) => index + min);
}
