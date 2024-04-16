import { useEffect, useRef, useState } from 'react';
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
} from '../../components';
import { downloadFileFromDrive, getErrors } from '../../algorithm';
import axios from 'axios';
import { handleCropApi, handleCutoutApi } from '../../services/cropingApi';
import { toast } from 'react-toastify';
import {
  getEstimationById,
  updateEstimationById,
} from '../../services/estimationsApi';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { motion } from 'framer-motion';
import { fadeAnimation, slideAnimation } from '../../constants';

function Elementor() {
  const [currentFieldIndex, setCurrentFieldIndex] = useState(null);
  const [currentFieldName, setCurrentFieldName] = useState(null);
  const [screenLoader, setScreenLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imagetoShow, setImagetoShow] = useState(null);
  const [polygonImgToShow, setPolygonImgToShow] = useState(null);
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
  const [apiPolygons, setApiPolygons] = useState({});
  const [modal, setModal] = useState(false);
  const [cutImg, setCutImg] = useState({
    width: '',
    height: '',
  });
  const [insideCutImg, setInsideCutImg] = useState({
    width: '',
    height: '',
  });
  const [cropImg, setCropImg] = useState({
    width: '',
    height: '',
  });
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 350,
    image: null,
    unit: '',
    length: '',
    width: '',
    thickness: 5,
    density: 7.85,
    fabricator: '',
  });
  const [dropdowns, setDropdowns] = useState({
    perimeterWelding: false,
    stitchWelding: false,
    fastening: '',
    brakeBends: '',
    rolledBends: '',
    sunkBoltsHoles: '',
    plateType: '',
    deliveryDate: '',
    plateTypeUsed: '',
    abrasionType: '',
    impactType: '',
    dtsDate: '',
    zipCode: '',
  });
  const [calculation, setCalculation] = useState({
    weight: '',
    size: '',
    platePrice: '',
    perimeterWelding: '',
    stitchWelding: '',
    fastening: '',
    brakeBends: '',
    rolledBends: '',
    sunkBoltsHoles: '',
    totalPrice: '',
    plateType: '',
    deliveryDate: '',
    plateTypeUsed: '',
    abrasionType: '',
    impactType: '',
  });
  const [token, setToken] = useState('');

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  //fetching current estimation
  const fetchCurrentEstimation = () => {
    if (id) {
      setScreenLoader(true);
      getEstimationById(id)
        .then((res) => {
          if (res?.data?.image !== '') {
            setNext(6);
            setForm({
              ...form,
              unit: res?.data?.unit,
              length: res?.data?.height,
              width: res?.data?.length,
            });
            setCutImg({
              width: res?.data?.px_length,
              height: res?.data?.px_height,
            });
            setChildCroppedImage(res?.data?.image);
            if (Object.keys(res?.data?.polygons)?.length > 0) {
              setApiPolygons(JSON.parse(res?.data?.polygons));
            }
          }
          setToken(res?.data?.g_api);
          setScreenLoader(false);
        })
        .catch((err) => {
          setScreenLoader(false);
          toast.error(getErrors(err));
        });
    }
  };
  useEffect(() => {
    fetchCurrentEstimation();
  }, [id]);

  //handle dropdowns function
  const handleDropdowns = (name, value, type) => {
    console.log({ name, value, type });
    setDropdowns({
      ...dropdowns,
      [name]: value,
    });
    if (type === 'number') {
      if (value.length > 4) {
        setCurrentFieldIndex((ps) => ps + 1);
      }
    } else {
      setCurrentFieldIndex((ps) => ps + 1);
    }
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
    setImagetoShow(null);
  };

  //image ref to get image actual dimention
  const imgRef = useRef(null);

  //Crop proper shape
  const handleCrop = () => {
    setLoader(true);
    handleCropApi(crop, imgRef, form)
      .then((res) => {
        setToken(res?.data?.g_api);
        setCropImg({
          width: res?.data?.image_width / 2,
          height: res?.data?.image_height / 2,
        });
        setLoader(false);
        setCroppedImage(res?.data?.image_url);
        setNext(5);
      })
      .catch((err) => {
        setLoader(false);
        toast.error('Something went wrong!');
      });
  };

  //Crop bigger object
  const handleCutout = async () => {
    setLoader(true);
    try {
      const res = await handleCutoutApi(
        points,
        croppedImage,
        cropImg,
        'cutout.png',
        token
      );
      setToken(res?.data?.g_api);
      setCutImg({
        width: res?.data?.image_width / 2,
        height: res?.data?.image_height / 2,
      });
      // setNext(6);
      if (id) {
        const { url, fileData } = await downloadFileFromDrive(
          res?.data?.image_url.split('/')[5],
          token
        );
        let formData = new FormData();
        formData.append('image', fileData);
        formData.append('length', form.width);
        formData.append('height', form.length);
        formData.append('measuring_unit', form.unit);
        formData.append('px_height', res?.data?.image_height / 2);
        formData.append('px_length', res?.data?.image_width / 2);
        const updateRes = await updateEstimationById(id, formData);
      }
      setChildCroppedImage(res?.data?.image_url);
      setNext(6);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toast.error('Something went wrong!');
    }
  };

  //Crop smaller object
  const handleInsideCutout = async () => {
    setLoader(true);
    try {
      const res = await handleCutoutApi(
        polygonArr[polygonsInd].points,
        childCroppedImage,
        cutImg,
        `cutout${polygonsInd}.png`,
        token
      );
      setToken(res?.data?.g_api);
      setChildPoints([]);
      setInsideCutImg({
        width: res?.data?.image_width / 2,
        height: res?.data?.image_height / 2,
      });
      const { url } = await downloadFileFromDrive(
        res?.data?.image_url.split('/')[5],
        token
      );
      setPolygonImgToShow(url);

      //arr
      const tempObj = {
        polygonsInd,
        image: res?.data?.image_url,
        imageToShow: url,
        dimention: {
          width: res?.data?.image_width / 2,
          height: res?.data?.image_height / 2,
        },
      };
      setCalArr((prevArr) => [...prevArr, tempObj]);
      setInsideChildCroppedImage(res?.data?.image_url);
      setNext(7);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      toast.error('Something went wrong!');
    }
  };

  // const handleInsideCutout = async () => {
  //   setLoader(true);
  //   handleCutoutApi(
  //     polygonArr[polygonsInd].points,
  //     childCroppedImage,
  //     cutImg,
  //     `cutout${polygonsInd}.png`,
  //     token
  //   )
  //     .then((res) => {
  //       setToken(res?.data?.g_api);
  //       setChildPoints([]);
  //       setInsideCutImg({
  //         width: res?.data?.image_width / 2,
  //         height: res?.data?.image_height / 2,
  //       });
  //       const { url } = await downloadFileFromDrive(res?.data?.image_url.split("/")[5], token)
  //       setInsideChildCroppedImage(res?.data?.image_url);
  //       setPolygonImgToShow(url);

  //       //arr
  //       const tempObj = {
  //         polygonsInd,
  //         image: res?.data?.image_url,
  //         imageToShow: url,
  //         dimention: {
  //           width: res?.data?.image_width / 2,
  //           height: res?.data?.image_height / 2,
  //         },
  //       };
  //       setCalArr((prevArr) => [...prevArr, tempObj]);
  //       setNext(7);
  //       setLoader(false);
  //     })
  //     .catch((err) => {
  //       setLoader(false);
  //       toast.error("Something went wrong!");
  //     });
  // };

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
      if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
        if (next === 5) {
          handleRevert();
        } else if (next === 6) {
          handleRevertChild();
        }
      }
      if (event.ctrlKey && (event.key === 'x' || event.key === 'X')) {
        if (next === 5) {
          handleReset();
        } else if (next === 6) {
          handleResetChild();
        } else if (next === 2) {
          resetShape();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [points, childPoints, crop]);

  return (
    <section className="container1">
      <ToolHeader
        next={next}
        active={
          next === 1
            ? 'select'
            : next === 3
              ? 'height'
              : next === 4
                ? 'length'
                : ''
        }
        form={form}
        handleChange={handleChange}
      />
      <div className="canvas-container">
        {/* canvas card */}
        <div
          className={`
         
           ${(next > 4 || next === 2) && 'top'}  ${next > 9 && 'p-0'}
           card`}
        >
          {screenLoader ? (
            <Loader />
          ) : (
            <>
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
                <div>
                  <ImageRenderer
                    form={form}
                    imgRef={imgRef}
                    image={imagetoShow}
                    handleChange={handleChange}
                    setCanvasImage={setCanvasImage}
                    setImagetoShow={setImagetoShow}
                    next={next}
                  />
                </div>
              ) : next === 1 ? (
                <div>
                  <div>
                    <ImageRenderer
                      active={"select"}
                      form={form}
                      imgRef={imgRef}
                      image={imagetoShow}
                      handleChange={handleChange}
                      setCanvasImage={setCanvasImage}
                      setImagetoShow={setImagetoShow}
                      next={next}
                    />
                  </div>
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
                    next={next}
                    focus={'length'}
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
                    next={next}
                    focus={'height'}
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
                  form={form}
                  img={croppedImage}
                  points={points}
                  setPoints={setPoints}
                  token={token}
                />
              ) : next === 6 ? (
                <Canvas
                  apiPolygons={apiPolygons}
                  gridWidth={cropImg}
                  cropImg={cutImg}
                  form={form}
                  img={childCroppedImage}
                  points={childPoints}
                  setPoints={setChildPoints}
                  polygonArr={polygonArr}
                  setPolygonArr={setPolygonArr}
                  token={token}
                />
              ) : next === 7 ? (
                <div>
                  {insideChildCroppedImage && (
                    <motion.div
                      {...slideAnimation('down')}
                      className="fab-container"
                    >
                      <p className="details-heading">For your object</p>
                      <p className="details-desc">
                        Do you want fabrication services?
                      </p>
                      <div style={{ width: '350px' }}>
                        <SelectInput
                          name="fabricator"
                          value={form.fabricator}
                          options={[
                            { label: 'No', value: false },
                            { label: 'Yes', value: true },
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
                        src={polygonImgToShow}
                      />
                    </motion.div>
                  )}
                </div>
              ) : next === 8 ? (
                <div>
                  <SelectInput
                    name="fabricator"
                    value={form.fabricator}
                    label="Do you want fabrication services"
                    options={[
                      { label: 'No', value: false },
                      { label: 'Yes', value: true },
                    ]}
                    placeholder="Select"
                    handleChange={handleChange}
                  />
                </div>
              ) : next === 9 ? (
                <FabForm
                  insideCutImg={insideCutImg}
                  insideChildCroppedImage={polygonImgToShow}
                  dropdowns={dropdowns}
                  handleDropdowns={handleDropdowns}
                  form={form}
                  handleChange={handleChange}
                  setCurrentFieldIndex={setCurrentFieldIndex}
                  currentFieldIndex={currentFieldIndex}
                  setCurrentFieldName={setCurrentFieldName}
                  currentFieldName={currentFieldName}
                />
              ) : (
                <Result
                  modal={modal}
                  setModal={setModal}
                  id={id}
                  calArr={calArr}
                  form={form}
                  imageToken={token}
                />
              )}
            </>
          )}
        </div>
        {/* bottom buttons */}
        <DashboardNextButtons
          fetchCurrentEstimation={fetchCurrentEstimation}
          apiPolygons={apiPolygons}
          token={token}
          id={id}
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
          calArr={calArr}
          setCalArr={setCalArr}
          setPolygonArr={setPolygonArr}
          setPolygonInd={setPolygonInd}
          loader={loader}
          setLoader={setLoader}
          setModal={setModal}
        />
        {/* image for getting it's actual width and height */}
        {imagetoShow && (
          <img
            ref={imgRef}
            style={{ display: 'none' }}
            src={imagetoShow}
            alt="img"
          />
        )}
      </div>
    </section>
  );
}

export default Elementor;
