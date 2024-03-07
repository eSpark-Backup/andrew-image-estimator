import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  ImageRenderer,
  SelectInput,
  ImageCropper,
  ToolHeader,
  DashboardNextButtons,
  Result,
  FabForm,
  TopButtons,
} from "../../components";
import { getDimention } from "../../algorithm";
import axios from "axios";
import { handleCropApi, handleCutoutApi } from "../../services/cropingApi";
import { toast } from "react-toastify";

function Elementor() {
  const [cropLoading, setCropLoading] = useState(false);
  const [cutoutoading, setCutoutLoading] = useState(false);
  const [insideCutoutoading, setInsideCutoutLoading] = useState(false);
  const [imagetoShow, setImagetoShow] = useState(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [childCroppedImage, setChildCroppedImage] = useState(null);
  const [insideChildCroppedImage, setInsideChildCroppedImage] = useState(null);
  const [next, setNext] = useState(0);
  const [points, setPoints] = useState([]);
  const [childPoints, setChildPoints] = useState([]);
  const [shapeDrawn, setShapeDrawn] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [polygonsInd, setPolygonInd] = useState(0);
  const [polygonArr, setPolygonArr] = useState([]);
  const [calArr, setCalArr] = useState([]);
  const [cutImg, setCutImg] = useState({
    width: "",
    height: "",
  });
  const [insideCutImg, setInsideCutImg] = useState({
    width: "",
    height: "",
  });
  const [cropImg, setCropImg] = useState({
    width: "",
    height: "",
  });
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 700,
    image: null,
    unit: "",
    length: "",
    width: "",
    thickness: 5,
    density: 7.85,
    fabricator: "",
  });
  const [dropdowns, setDropdowns] = useState({
    perimeterWelding: false,
    stitchWelding: false,
    fastening: "",
    brakeBends: "",
    rolledBends: "",
    sunkBoltsHoles: "",
    plateType: "",
    deliveryDate: "",
    plateTypeUsed: "",
    abrasionType: "",
    impactType: "",
    dtsDate: "",
    zipCode: "",
  });
  const [calculation, setCalculation] = useState({
    weight: "",
    size: "",
    platePrice: "",
    perimeterWelding: "",
    stitchWelding: "",
    fastening: "",
    brakeBends: "",
    rolledBends: "",
    sunkBoltsHoles: "",
    totalPrice: "",
    plateType: "",
    deliveryDate: "",
    plateTypeUsed: "",
    abrasionType: "",
    impactType: "",
  });

  //handle dropdowns function
  const handleDropdowns = (name, value) => {
    setDropdowns({
      ...dropdowns,
      [name]: value,
    });
  };

  //handle inputs function
  const handleChange = (name, value) => {
    // if (name === "width" || name === "length") {
    //   if (Number(value) > 1000) {
    //     return;
    //   } else {
    //     setForm({
    //       ...form,
    //       [name]: value,
    //     });
    //   }
    // } else {
      setForm({
        ...form,
        [name]: value,
      });
    // }
  };

  //removing image functionality
  const handleRemoveImage = () => {
    setForm({
      ...form,
      image: null,
    });
    setCanvasImage(null);
  };

  //image ref to get image actual dimention
  const imgRef = useRef(null);

  //Crop proper shape
  const handleCrop = () => {
    setCropLoading(true)
    handleCropApi(crop, imgRef, form)
      .then((res) => {
        setCropImg({
          width: res?.data?.image_width,
          height: res?.data?.image_height,
        });
        setCropLoading(false);
        setCroppedImage("/crop.png");
        setNext(5);
      })
      .catch((err) => {
        setCropLoading(false);
        toast.error("Something went wrong!");
      });
  };

  //Crop bigger object
  const handleCutout = async () => {
    setCutoutLoading(true)
    handleCutoutApi(points, croppedImage, cropImg, "cutout.png")
      .then((res) => {
        setCutoutLoading(false)
        setCutImg({
          width: res?.data?.image_width,
          height: res?.data?.image_height,
        });
        setChildCroppedImage("/cutout.png");
        setNext(6);
      })
      .catch((err) => {
        setCutoutLoading(false)
        toast.error("Something went wrong!");
      });
  };

  //Crop smaller object
  const handleInsideCutout = async () => {
    setInsideCutoutLoading(true)
    handleCutoutApi(
      polygonArr[polygonsInd].points,
      childCroppedImage,
      cutImg,
      `cutout${polygonsInd}.png`
    )
      .then((res) => {
        setInsideCutoutLoading(false)
        setChildPoints([]);
        setInsideCutImg({
          width: res?.data?.image_width,
          height: res?.data?.image_height,
        });
        setInsideChildCroppedImage(`/cutout${polygonsInd}.png`);

        //arr
        const tempObj = {
          polygonsInd,
          image: `/cutout${polygonsInd}.png`,
          dimention: {
            width: res?.data?.image_width,
            height: res?.data?.image_height,
          },
        };
        setCalArr((prevArr) => [...prevArr, tempObj]);
        setNext(7);
      })
      .catch((err) => {
        setInsideCutoutLoading(false)
        toast.error("Something went wrong!");
      });
  };

  //reset shape
  const resetShape = () => {
    setShapeDrawn(false);
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
  };

  //reset bigger object
  const handleReset = () => {
    setPoints([]);
  };

  //revert bigger object
  const handleRevert = () => {
    points.pop();
    setPoints(points);
  };

  //reset smaller object
  const handleResetChild = () => {
    setPolygonArr((prevArray) => {
      return prevArray.filter((item) => !item.new);
    });
    setChildPoints([]);
  };

  //revert smaller object
  const handleRevertChild = () => {
    childPoints.pop();
    setChildPoints(childPoints);
  };

  //reverting with ctrl + z
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
        if (next === 5) {
          handleRevert();
        } else if (next === 6) {
          handleRevertChild();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [points, childPoints]);

  return (
    <section className="container1">
      <ToolHeader
        active={
          next === 1
            ? "select"
            : next === 3
            ? "height"
            : next === 4
            ? "length"
            : ""
        }
        form={form}
        handleChange={handleChange}
      />
      <div className="canvas-container">
        {/* canvas card */}
        <div
          className={`${canvasImage && (next < 5 || next > 8) && "auto"} ${
            canvasImage && "top"
          }  ${next > 9 && "py-0"}
           card`}
        >
          {/* top buttons */}
          <TopButtons
            points={points}
            canvasImage={canvasImage}
            next={next}
            handleRemoveImage={handleRemoveImage}
            crop={crop}
            resetShape={resetShape}
            handleReset={handleReset}
            handleRevert={handleRevert}
            childPoints={childPoints}
            handleResetChild={handleResetChild}
            handleRevertChild={handleRevertChild}
          />
          {next === 0 ? (
            <ImageRenderer
              form={form}
              image={canvasImage}
              handleChange={handleChange}
              setCanvasImage={setCanvasImage}
              setImagetoShow={setImagetoShow}
            />
          ) : next === 1 ? (
            <div>
              <ImageRenderer
                form={form}
                image={canvasImage}
                handleChange={handleChange}
                setCanvasImage={setCanvasImage}
                setImagetoShow={setImagetoShow}
              />
            </div>
          ) : next === 2 ? (
            <ImageCropper
              form={form}
              crop={crop}
              setCrop={setCrop}
              handleRemoveImage={handleRemoveImage}
              image={canvasImage}
              handleChange={handleChange}
              setCanvasImage={setCanvasImage}
              setImagetoShow={setImagetoShow}
              setShapeDrawn={setShapeDrawn}
              shapeDrawn={shapeDrawn}
            />
          ) : next === 3 ? (
            <div>
              <ImageCropper
                focus={"length"}
                form={form}
                crop={crop}
                setCrop={setCrop}
                handleRemoveImage={handleRemoveImage}
                image={canvasImage}
                handleChange={handleChange}
                setCanvasImage={setCanvasImage}
                setImagetoShow={setImagetoShow}
              />
            </div>
          ) : next === 4 ? (
            <div>
              <ImageCropper
                focus={"height"}
                form={form}
                crop={crop}
                setCrop={setCrop}
                handleRemoveImage={handleRemoveImage}
                image={canvasImage}
                handleChange={handleChange}
                setCanvasImage={setCanvasImage}
                setImagetoShow={setImagetoShow}
              />
            </div>
          ) : next === 5 ? (
            <Canvas
              gridWidth={cropImg}
              cropImg={cropImg}
              loading={cropLoading}
              form={form}
              img={croppedImage}
              points={points}
              setPoints={setPoints}
            />
          ) : next === 6 ? (
            <Canvas
              gridWidth={cropImg}
              cropImg={cutImg}
              loading={cutoutoading}
              form={form}
              img={childCroppedImage}
              points={childPoints}
              setPoints={setChildPoints}
              polygonArr={polygonArr}
              setPolygonArr={setPolygonArr}
            />
          ) : next === 7 ? (
            <div>
              {insideCutoutoading ? (
                <>loading</>
              ) : (
                insideChildCroppedImage && (
                  <div className="fab-container">
                    <p className="details-heading">For your object</p>
                    <p className="details-desc">
                      Do you want fabrication services?
                    </p>
                    <div style={{ width: "350px" }}>
                      <SelectInput
                        name="fabricator"
                        value={form.fabricator}
                        options={[
                          { label: "No", value: false },
                          { label: "Yes", value: true },
                        ]}
                        placeholder="Select"
                        handleChange={handleChange}
                      />
                    </div>
                    <img
                      style={{
                        width: `${insideCutImg.width}px`,
                        height: `${insideCutImg.height}px`,
                        zIndex: -9,
                      }}
                      src={insideChildCroppedImage}
                    />
                  </div>
                )
              )}
            </div>
          ) : next === 8 ? (
            <div>
              <SelectInput
                name="fabricator"
                value={form.fabricator}
                label="Do you want fabrication services"
                options={[
                  { label: "No", value: false },
                  { label: "Yes", value: true },
                ]}
                placeholder="Select"
                handleChange={handleChange}
              />
            </div>
          ) : next === 9 ? (
            <FabForm
              insideCutImg={insideCutImg}
              insideChildCroppedImage={insideChildCroppedImage}
              dropdowns={dropdowns}
              handleDropdowns={handleDropdowns}
              form={form}
              handleChange={handleChange}
            />
          ) : (
            <Result calArr={calArr} form={form} />
          )}
        </div>
        {/* bottom buttons */}
        <DashboardNextButtons
          cutImg={cutImg}
          next={next}
          setNext={setNext}
          form={form}
          canvasImage={canvasImage}
          crop={crop}
          points={points}
          childPoints={childPoints}
          dropdowns={dropdowns}
          setDropdowns={setDropdowns}
          handleCrop={handleCrop}
          handleCutout={handleCutout}
          handleInsideCutout={handleInsideCutout}
          calculation={calculation}
          polygonArr={polygonArr}
          polygonsInd={polygonsInd}
          insideCutImg={insideCutImg}
          setCalculation={setCalculation}
          setCalArr={setCalArr}
          setPolygonArr={setPolygonArr}
          setPolygonInd={setPolygonInd}
        />
        {/* image for getting it's actual width and height */}
        {imagetoShow && (
          <img
            ref={imgRef}
            style={{ display: "none" }}
            src={imagetoShow}
            alt="img"
          />
        )}
      </div>
    </section>
  );
}

export default Elementor;
