import React, { useEffect, useState } from "react";
import { SelectInput } from "../inputs/select-input";
import TextInput from "../inputs/text-input";
import { useNavigate } from "react-router";
import Joyride from 'react-joyride';
import { SelectorTour, heightTour, widthTour } from "../../constants";
import ModalComponent from "../modal/Modal";

const ToolHeader = ({ next, active, form, handleChange }) => {
  const navigate = useNavigate();
  const [tour, setTour] = useState(false);
  const [selectTaker] = useState(SelectorTour);
  const [selectHeight] = useState(heightTour);
  const [selectwidth] = useState(widthTour);
  const [isNavigatorModalOpen, setIsNavigatorModalOpen] = useState(false)

  useEffect(() => {
    if (active === "select" && form.unit === "") {
      setTour(true);
    }

    if (active === "height" && form.length === "") {
      setTour(true);
    }

    if (active === "length" && form.width === "") {
      setTour(true);
    }

    return () => {
      setTour(false);
    };

  }, [active, form.unit, form.length, form.width]);

  const NavigatorHandler = () => {
    if (window.localStorage.getItem("token")) {
      navigate("/")
    }
    else {
      setIsNavigatorModalOpen(true)
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "62px",
          background: "#303032",
          padding: "10px 30px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <p style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>Logo</p>
          <p
            onClick={NavigatorHandler}
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#fff",
              cursor: "pointer",
              lineHeight: "10px",
            }}
          >
            Back to Dashboard
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {next >= 1 && <div
            className={`${active === "select" || form.unit !== "" ? "active-inputs" : ""
              } tool-inputs-container`}
          >
            <p style={{ color: "#fff" }}>Measuring Unit:</p>
            <SelectInput
              className="tool-inputs select-taker"
              name="unit"
              disabled={active !== "select"}
              value={form.unit}
              options={[
              { label: "cm", value: "cm" },
              { label: "inch", value: "inch" },
              { label: "m", value: "m" },
              { label: "mm", value: "mm" },
              { label: "ft", value: "ft" },
              ]}
              placeholder="Select Unit"
              handleChange={handleChange}
              header={true}
            />
          </div>}
          {next >= 3 && <div
            className={`${active === "height" || form.length ? "active-inputs" : ""
              } tool-inputs-container`}
          >
            <p style={{ color: "#fff" }}>Height:</p>
            <TextInput
              disabled={active !== "height"}
              className="tool-inputs height-taker"
              name="length"
              value={form.length}
              type="number"
              placeholder="Enter"
              handleChange={handleChange}
            />
          </div>}
          {next >= 4 && <div
            className={`${active === "length" || form.width ? "active-inputs" : ""
              } tool-inputs-container`}
          >
            <p style={{ color: "#fff" }}>Length:</p>
            <TextInput
              disabled={active !== "length"}
              className="tool-inputs width-taker"
              name="width"
              value={form.width}
              type="number"
              placeholder="Enter"
              handleChange={handleChange}
            />
          </div>}
        </div>
      </div>
      <Joyride
        run={tour}
        showProgress={false}
        showSkipButton={false}
        hideCloseButton={true}
        steps={active === "select" ? selectTaker : active === "height" ? selectHeight : selectwidth}
        styles={{
          buttonNext: {
            display: "none",
          }
        }
        }
      />
      <ModalComponent
        heading={"Confirm Navigation"}
        description={"As a guest account your estimation will not be saved if you decide to continue. Are  you sure you want to leave this page?"}
        btn1Text={"Cancel"}
        btn2Text={"Leave"}
        closeModal={() => setIsNavigatorModalOpen(false)}
        modalIsOpen={isNavigatorModalOpen}
        onSuccess={() => navigate("/")}
      />
    </>
  );
};

export default ToolHeader;
