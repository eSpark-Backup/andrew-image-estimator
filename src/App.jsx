import { useEffect, useRef, useState } from 'react'
import { Canvas, Grid, ImageRenderer, SelectInput, TextInput, ImageCropper, NormalTable, FabricationTable } from './components'
import { calculateChildArea, getCanvasPoints, getDimention } from './algorithm';
import axios from 'axios';
import './App.css'

function App() {
  const [cropLoading, setCropLoading] = useState(false)
  const [cutoutoading, setCutoutLoading] = useState(false)
  const [insideCutoutoading, setInsideCutoutLoading] = useState(false)
  const [imagetoShow, setImagetoShow] = useState(null)
  const [canvasImage, setCanvasImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [childCroppedImage, setChildCroppedImage] = useState(null)
  const [insideChildCroppedImage, setInsideChildCroppedImage] = useState(null)
  const [next, setNext] = useState(0)
  const [points, setPoints] = useState([]);
  const [childPoints, setChildPoints] = useState([]);
  const [shapeDrawn, setShapeDrawn] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [polygonsInd, setPolygonInd] = useState(0)
  const [polygonArr, setPolygonArr] = useState([])
  const [calArr, setCalArr] = useState([])
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const [cutImg, setCutImg] = useState({
    width: "",
    height: ""
  })
  const [insideCutImg, setInsideCutImg] = useState({
    width: "",
    height: ""
  })
  const [cropImg, setCropImg] = useState({
    width: "",
    height: ""
  })
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 700,
    image: null,
    unit: "",
    length: "",
    width: "",
    thickness: 5,
    density: 7.85,
    fabricator: false
  })
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
    zipCode: ""
  })
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
  })

  let options = [];
  for (let i = 0; i <= 50; i++) {
    options.push({ label: i.toString(), value: i })
  }

  let weakOptions = [];
  for (let i = 1; i <= 25; i++) {
    weakOptions.push({ label: `${i} ${i === 1 ? "Week" : "Weeks"}`, value: i.toString() })
  }
  weakOptions.push({ label: `upto 25 Weeks`, value: "25+" })

  //handle dropdowns function
  const handleDropdowns = (name, value) => {
    setDropdowns({
      ...dropdowns,
      [name]: value
    })
  }

  //handle inputs function
  const handleChange = (name, value) => {
    if (name === "width" || name === "length") {
      if (Number(value) > 1000) {
        return
      } else {
        setForm({
          ...form,
          [name]: value
        })
      }
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  //removing image functionality
  const handleRemoveImage = () => {
    setForm({
      ...form,
      image: null,
    })
    setCanvasImage(null)
  }

  //calculation for cutout
  const handleCalculate = () => {
    const object = calculateChildArea(form, cropImg.width, cropImg.height, polygonArr[polygonsInd].points, insideCutImg.width, insideCutImg.height)
    setCalculation(object)
    setCalArr(prevCalArray => {
      return prevCalArray.map(item => {
        if (item.polygonsInd === polygonsInd) {
          return { ...item, calculation: object };
        }
        return item;
      });
    });
    setPolygonArr(prevArray => {
      return prevArray.map(item => {
        if (item.new) {
          return { ...item, new: false };
        }
        return item;
      });
    });
    setPolygonInd(polygonsInd + 1)
    setNext(8)
  }

  //calculation for fabrication
  const calculateFabrication = () => {
    setCalculation(prev => ({
      ...prev,
      perimeterWelding: dropdowns.perimeterWelding ? Number(calculation.weight) * 0.20 : 0,
      stitchWelding: dropdowns.stitchWelding ? Number(calculation.weight) * 0.30 : 0,
      fastening: Number(dropdowns.fastening) * 1.50,
      brakeBends: Number(dropdowns.brakeBends) * 0.60,
      rolledBends: Number(dropdowns.rolledBends) * 0.60,
      sunkBoltsHoles: Number(dropdowns.sunkBoltsHoles) * 0.35,
      totalPrice: Number(calculation.platePrice) + (dropdowns.perimeterWelding ? Number(calculation.weight) * 0.20 : 0) + (dropdowns.stitchWelding ? Number(calculation.weight) * 0.30 : 0) + (Number(dropdowns.fastening) * 1.50) + (Number(dropdowns.brakeBends) * 0.60) + (Number(dropdowns.rolledBends) * 0.60) + (Number(dropdowns.sunkBoltsHoles) * 0.35)

    }))
    setCalArr(prevCalArray => {
      return prevCalArray.map(item => {
        if (item.polygonsInd === polygonsInd - 1) {
          return {
            ...item,
            dropdowns,
            calculation: {
              ...item.calculation,
              perimeterWelding: dropdowns.perimeterWelding ? Number(calculation.weight) * 0.20 : 0,
              stitchWelding: dropdowns.stitchWelding ? Number(calculation.weight) * 0.30 : 0,
              fastening: Number(dropdowns.fastening) * 1.50,
              brakeBends: Number(dropdowns.brakeBends) * 0.60,
              rolledBends: Number(dropdowns.rolledBends) * 0.60,
              sunkBoltsHoles: Number(dropdowns.sunkBoltsHoles) * 0.35,
              totalPrice: Number(calculation.platePrice) + (dropdowns.perimeterWelding ? Number(calculation.weight) * 0.20 : 0) + (dropdowns.stitchWelding ? Number(calculation.weight) * 0.30 : 0) + (Number(dropdowns.fastening) * 1.50) + (Number(dropdowns.brakeBends) * 0.60) + (Number(dropdowns.rolledBends) * 0.60) + (Number(dropdowns.sunkBoltsHoles) * 0.35)
            }
          };
        }
        return item;
      });
    });
    setNext(10)
  }

  //image ref to get image actual dimention
  const imgRef = useRef(null);

  //scale the image
  const { centerShift_x, centerShift_y, w, h } = getDimention(form.imageWidth, form.imageHeight, imgRef?.current?.width, imgRef?.current?.height)

  // const applicationKeyId = "0052d8d1b91eb500000000005";
  // const applicationKey = "K005XClKwpdKvIVE+M3LuhgQF/pY3dA";

  // const getToken = async (applicationKeyId, applicationKey) => {
  //   const response = await fetch('https://api.backblazeb2.com/b2api/v2/b2_authorize_account', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Basic ' + btoa(`${applicationKeyId}:${applicationKey}`),
  //     },
  //   });

  //   const data = await response.json();
  //   return data.authorizationToken;
  // }

  // const fetchImage = async (url) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       "content-type": "application/json",
  //       headers: {
  //         'Authorization': await getToken(applicationKeyId, applicationKey),
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch image');
  //     }
  //     const blob = await response.blob();
  //     const imageUrl = URL.createObjectURL(blob);
  //     return imageUrl;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //Crop proper shape
  const handleCrop = async () => {
    const tempCrop = {
      x: crop.x - centerShift_x,
      y: crop.y - centerShift_y,
      width: crop.width,
      height: crop.height
    }
    setCropLoading(true)
    const formData = new FormData();
    formData.append('image', form.image);
    const jsonString = JSON.stringify(getCanvasPoints(tempCrop));
    formData.append('contour_data', jsonString);
    formData.append('image_height', Math.abs(h));
    formData.append('image_width', Math.abs(w));
    formData.append('file_name', 'crop.png');
    // formData.append('file_name', 'crop.png');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
      // const response = await axios.post('http://192.168.18.142:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setCropImg({
          width: response?.data?.image_width / 2,
          height: response?.data?.image_height / 2
        })
        setCropLoading(false)
        setCroppedImage('/crop.png')
        // setCroppedImage(fetchImage(response?.data?.image_path))
        setNext(5)
      }
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  //Crop bigger object
  const handleCutout = async () => {
    setCutoutLoading(true)
    const formData = new FormData();
    formData.append('image', await fetch(croppedImage).then(res => res.blob()), 'image.png');
    const newArr = points.map(item => ({
      'x1': item.x,
      'y1': item.y
    }));
    const jsonString = JSON.stringify(newArr);
    formData.append('contour_data', jsonString);
    formData.append('image_height', cropImg.height);
    formData.append('image_width', cropImg.width);
    formData.append('file_name', 'cutout.png');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setCutoutLoading(false)
        setCutImg({
          width: response?.data?.image_width / 2,
          height: response?.data?.image_height / 2
        })
        setChildCroppedImage('/cutout.png')
        setNext(6)
      }
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  //Crop smaller object
  const handleInsideCutout = async () => {
    setInsideCutoutLoading(true)
    const formData = new FormData();
    formData.append('image', await fetch(croppedImage).then(res => res.blob()), 'image.png');
    const newArr = polygonArr[polygonsInd].points.map(item => ({
      'x1': item.x,
      'y1': item.y
    }));
    const jsonString = JSON.stringify(newArr);
    formData.append('contour_data', jsonString);
    formData.append('image_height', cutImg.height);
    formData.append('image_width', cutImg.width);
    formData.append('file_name', `cutout${polygonsInd}.png`);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setChildPoints([])
        setInsideCutoutLoading(false)
        setInsideCutImg({
          width: response?.data?.image_width / 2,
          height: response?.data?.image_height / 2
        })
        setInsideChildCroppedImage(`/cutout${polygonsInd}.png`)
        const minX = Math.min(...childPoints.map(point => point.x));
        const minY = Math.min(...childPoints.map(point => point.y));

        setPosition({
          x: minX,
          y: minY
        })

        //arr
        const tempObj = {
          polygonsInd,
          image: `/cutout${polygonsInd}.png`,
          dimention: {
            width: response?.data?.image_width / 2,
            height: response?.data?.image_height / 2
          },
          position: {
            x: minX,
            y: minY
          }
        }
        setCalArr(prevArr => [...prevArr, tempObj])

        setNext(7)
      }
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  //reset shape
  const resetShape = () => {
    setShapeDrawn(false);
    setCrop({ x: 0, y: 0, width: 0, height: 0 });
  };

  //reset bigger object
  const handleReset = () => {
    setPoints([])
  }

  //revert bigger object
  const handleRevert = () => {
    points.pop()
    setPoints(points)
  }

  //reset smaller object
  const handleResetChild = () => {
    setPolygonArr(prevArray => {
      return prevArray.filter(item => !item.new);
    });
    setChildPoints([])
  }

  //revert smaller object
  const handleRevertChild = () => {
    childPoints.pop()
    setChildPoints(childPoints)
  }

  //reverting with ctrl + z
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
        if (next === 5) {
          handleRevert()
        } else if (next === 6) {
          handleRevertChild()
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [points, childPoints]);

  return (
    <section className='container'>
      <div className="canvas-container">
        {/* top buttons */}
        <div className='button-container left'>
          {canvasImage && next === 0 ?
            <button onClick={handleRemoveImage}>Change Image</button> :
            next === 2 ?
              <button onClick={resetShape}>Reset</button>
              : next === 5 ?
                <div className="button-container">
                  <button onClick={handleRevert}>Revert</button>
                  <button onClick={handleReset}>Reset</button>
                </div>
                : next === 6 ?
                  <div className="button-container">
                    <button onClick={handleRevertChild}>Revert</button>
                    <button onClick={handleResetChild}>Reset</button>
                  </div>
                  : null}
        </div>
        {/* canvas card */}
        <div className='card'>
          {next === 0 ?
            <ImageRenderer
              form={form}
              image={canvasImage}
              handleChange={handleChange}
              setCanvasImage={setCanvasImage}
              setImagetoShow={setImagetoShow}
            />
            : next === 1 ?
              <div>
                <SelectInput
                  name="unit"
                  value={form.unit}
                  label="Select Your Measuring Scale"
                  options={[{ label: "Inches (inch)", value: "inch" }]}
                  placeholder="Select Unit"
                  handleChange={handleChange}
                />
              </div>
              : next === 2 ?
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
                : next === 3 ?
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
                    <TextInput
                      name="length"
                      value={form.length}
                      label="Height"
                      type="number"
                      placeholder="Enter the length of your object"
                      handleChange={handleChange}
                    />
                  </div>
                  : next === 4 ?
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
                      <TextInput
                        name="width"
                        value={form.width}
                        label="Length"
                        type="number"
                        placeholder="Enter the width of your object"
                        handleChange={handleChange}
                      />
                    </div>
                    : next === 5 ?
                      <Canvas
                        gridWidth={cropImg}
                        cropImg={cropImg}
                        loading={cropLoading}
                        form={form}
                        img={croppedImage}
                        points={points}
                        setPoints={setPoints}
                      />
                      : next === 6 ?
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
                        : next === 7 ?
                          <div>
                            {insideCutoutoading ?
                              <>loading</> : insideChildCroppedImage && <Grid imageWidth={cutImg.width} imageHeight={cutImg.height} width={form.width} height={form.length}>
                                <img style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, width: `${insideCutImg.width}px`, height: `${insideCutImg.height}px`, zIndex: -9 }} src={insideChildCroppedImage} />
                              </Grid>}
                          </div>
                          : next === 8 ?
                            <div>
                              <SelectInput
                                name="fabricator"
                                value={form.fabricator}
                                label="Do you want fabrication services"
                                options={[{ label: "No", value: false }, { label: "Yes", value: true }]}
                                placeholder="Select"
                                handleChange={handleChange}
                              />
                            </div>
                            : next === 9 ?
                              <div className='image-dropdown'>
                                {<Grid imageWidth={cutImg.width} imageHeight={cutImg.height} width={form.width} height={form.length}>
                                  <img style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, width: `${insideCutImg.width}px`, height: `${insideCutImg.height}px`, zIndex: -9 }} src={insideChildCroppedImage} />
                                </Grid>}
                                <div className='dropdown'>
                                  <div>
                                    <SelectInput
                                      name="plateType"
                                      value={dropdowns.plateType}
                                      label="Wear Plate Type for Estimate"
                                      options={[{ label: "AR plate", value: "AR" }, { label: "CCO plate", value: "CCO" }]}
                                      placeholder="Select Wear Plate Type for Estimate"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="deliveryDate"
                                      value={dropdowns.deliveryDate}
                                      label="Estimated Delivery Date"
                                      options={weakOptions}
                                      placeholder="Select Estimated Delivery Date"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="plateTypeUsed"
                                      value={dropdowns.plateTypeUsed}
                                      label="Type of wear Plate Used Currently"
                                      options={[{ label: "QT plate", value: "QT" }, { label: "AR plate", value: "AR" }, { label: "Weld Overlay", value: "weld" }, { label: "Others", value: "others" }]}
                                      placeholder="Select Type of wear Plate Used Currently"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="perimeterWelding"
                                      value={dropdowns.perimeterWelding}
                                      label="Perimeter Welding"
                                      options={[{ label: "No", value: false }, { label: "Yes", value: true }]}
                                      placeholder="Select Perimeter Welding"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="stitchWelding"
                                      value={dropdowns.stitchWelding}
                                      label="Stitch Welding"
                                      options={[{ label: "No", value: false }, { label: "Yes", value: true }]}
                                      placeholder="Select Stitch Welding"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="fastening"
                                      value={dropdowns.fastening}
                                      label="Fastening using Studs"
                                      options={options}
                                      placeholder="Select Fastening"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="brakeBends"
                                      value={dropdowns.brakeBends}
                                      label="How many Press Brake Bends to bend the radius"
                                      options={options}
                                      placeholder="Select Brake Bends"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="rolledBends"
                                      value={dropdowns.rolledBends}
                                      label="How many Rolled Bends"
                                      options={options}
                                      placeholder="Select Rolled Bends"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="sunkBoltsHoles"
                                      value={dropdowns.sunkBoltsHoles}
                                      label="How Many Counter Sunk Bolts Holes"
                                      options={options}
                                      placeholder="Select Sunk Bolts Holes"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="abrasionType"
                                      value={dropdowns.abrasionType}
                                      label="Abrasion Type"
                                      options={[{ label: "Low", value: "low" }, { label: "Heavy", value: "heavy" }, { label: "Medium", value: "medium" }]}
                                      placeholder="Select Abrasion Type"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="impactType"
                                      value={dropdowns.impactType}
                                      label="Impact Type"
                                      options={[{ label: "Low", value: "low" }, { label: "Heavy", value: "heavy" }, { label: "Medium", value: "medium" }]}
                                      placeholder="Select Impact Type"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      name="dtsDate"
                                      value={dropdowns.dtsDate}
                                      label="Delivery to Site Date"
                                      type="text"
                                      placeholder="Enter Delivery to Site Date"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      name="zipCode"
                                      value={dropdowns.zipCode}
                                      label="Zip Code"
                                      type="number"
                                      placeholder="Enter Zip Code"
                                      handleChange={handleDropdowns}
                                    />
                                  </div>
                                  <div>
                                    <SelectInput
                                      name="fabricator"
                                      value={form.fabricator}
                                      label="Calculate Estimate with Fabrication Services"
                                      options={[{ label: "No", value: false }, { label: "Yes", value: true }]}
                                      placeholder="Select"
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                              :
                              <div className='result'>
                                {calArr.length > 0 ?
                                  calArr.map((item) => {
                                    return (
                                      <div key={item.polygonsInd} className='image-dropdown'>
                                        {<Grid imageWidth={cutImg.width} imageHeight={cutImg.height} width={form.width} height={form.length}>
                                          <img style={{ position: "absolute", left: `${item?.position.x}px`, top: `${item?.position.y}px`, width: `${item?.dimention?.width}px`, height: `${item?.dimention?.height}px`, zIndex: -9 }} src={item?.image} />
                                        </Grid>}
                                        {Object.keys(item).includes("dropdowns") ?
                                          <FabricationTable calculation={item?.calculation} form={form} dropdowns={item?.dropdowns} />
                                          :
                                          <NormalTable calculation={item?.calculation} form={form} />
                                        }
                                      </div>
                                    )
                                  })
                                  :
                                  null
                                }
                              </div>
          }
        </div>
        {/* bottom buttons */}
        <div className='button-container right'>
          {(next <= 10 || (form.fabricator && next === 9)) && canvasImage &&
            <button
              onClick={() => {
                if (next === 0) {
                  setNext(1)
                } else if (next === 1) {
                  setNext(2)
                } else if (next === 2) {
                  setNext(3)
                } else if (next === 3) {
                  setNext(4)
                } else if (next === 4) {
                  handleCrop()
                } else if (next === 5) {
                  handleCutout()
                } else if (next === 6) {
                  handleInsideCutout()
                } else if (next === 7) {
                  handleCalculate()
                } else if (next === 8) {
                  if (!form.fabricator || form?.fabricator === "false") {
                    setNext(10)
                  } else { setNext(9) }
                } else if (next === 9) {
                  if (form?.fabricator === "false") {
                    setNext(10)
                  } else {
                    calculateFabrication()
                  }
                } else {
                  setNext(6)
                  setDropdowns({
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
                    zipCode: ""
                  })
                }
              }}
            >
              {(next > 9) ? "Need more polygons" : next >= 4 && next <= 6 ? "Crop" : "Next"}
            </button>
          }
        </div>
        {/* image for getting it's actual width and height */}
        {imagetoShow && <img ref={imgRef} style={{ display: "none" }} src={imagetoShow} alt="img" />}
      </div>
    </section>
  )
}

export default App
