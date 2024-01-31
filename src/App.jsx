import { useRef, useState } from 'react'
import { Canvas, Elementor, Grid } from './components'
import './App.css'
import axios from 'axios';
import { areAllFieldsValid, calculateChildArea, getCanvasPoints, getDimention } from './algorithm';
import { ImageCropper } from './components/cropper';

function App() {
  const [focus, setFocus] = useState(null)
  const [cropLoading, setCropLoading] = useState(false)
  const [cutoutoading, setCutoutLoading] = useState(false)
  const [insideCutoutoading, setInsideCutoutLoading] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [points, setPoints] = useState([]);
  const [childPoints, setChildPoints] = useState([]);
  const [next, setNext] = useState(0)
  const [canvasImage, setCanvasImage] = useState(null)
  const [imagetoShow, setImagetoShow] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [insideChildCroppedImage, setInsideChildCroppedImage] = useState(null)
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
  const [childCroppedImage, setChildCroppedImage] = useState(null)
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 700,
    image: null,
    unit: "",
    length: "",
    width: "",
    thickness: "",
    density: 7.85
  })
  const [calculation, setCalculation] = useState({
    weight: "",
    size: ""
  })

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
    setCroppedImage(null)
    setCalculation({
      weight: "",
      size: ""
    })
  }

  //calculation for cutout
  const handleCalculate = () => {
    calculateChildArea(form, cropImg.width, cropImg.height, childPoints, setCalculation, insideCutImg.width, insideCutImg.height)
    // calculateSelectedArea(form, cropImg.width, cropImg.height, points, setCalculation)
  }


  const imgRef = useRef(null);
  const { centerShift_x, centerShift_y, w, h } = getDimention(form.imageWidth, form.imageHeight, imgRef?.current?.width, imgRef?.current?.height)

  //Api fetching
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setCropImg({
          width: response?.data?.image_width,
          height: response?.data?.image_height
        })
        setCropLoading(false)
        setCroppedImage('/output_image.png')
        setNext(1)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  //Api fetching
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setCutoutLoading(false)
        setCutImg({
          width: response?.data?.image_width,
          height: response?.data?.image_height
        })
        setChildCroppedImage('/output_image.png')
        const minX = Math.min(...points.map(point => point.x));
        const minY = Math.min(...points.map(point => point.y));

        setPosition({
          x: minX,
          y: minY
        })
        setNext(2)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  const handleInsideCutout = async () => {
    setInsideCutoutLoading(true)
    const formData = new FormData();
    formData.append('image', await fetch(croppedImage).then(res => res.blob()), 'image.png');
    const newArr = childPoints.map(item => ({
      'x1': item.x,
      'y1': item.y
    }));
    const jsonString = JSON.stringify(newArr);
    formData.append('contour_data', jsonString);
    formData.append('image_height', cutImg.height);
    formData.append('image_width', cutImg.width);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/img_upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response) {
        setInsideCutoutLoading(false)
        setInsideCutImg({
          width: response?.data?.image_width,
          height: response?.data?.image_height
        })
        setInsideChildCroppedImage('/output_image.png')
        const minX = Math.min(...childPoints.map(point => point.x));
        const minY = Math.min(...childPoints.map(point => point.y));

        setPosition({
          x: minX,
          y: minY
        })
        setNext(3)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <section className='container'>
      <div className="elementor-container">
        <Elementor
          setFocus={setFocus}
          form={form}
          handleChange={handleChange}
          handleCalculate={handleCalculate}
          next={next}
          setNext={setNext}
          handleCrop={handleCrop}
          handleCutout={handleCutout}
          handleInsideCutout={handleInsideCutout}
          disableCrop={!areAllFieldsValid(form) || !crop.width > 0 || !crop.height > 0}
          disabledCutout={points.length < 2 || (points[0]?.x !== points[points.length - 1]?.x || points[0]?.y !== points[points.length - 1]?.y)}
        />
      </div>
      <div className="canvas-container">
        {next >= 2 ?
          <Canvas
            gridWidth={cropImg}
            cropImg={cutImg}
            loading={cutoutoading}
            next={next}
            form={form}
            img={childCroppedImage}
            points={childPoints}
            setPoints={setChildPoints}
          />
          : next === 1 ?
            <Canvas
              gridWidth={cropImg}
              cropImg={cropImg}
              loading={cropLoading}
              next={next}
              form={form}
              img={croppedImage}
              points={points}
              setPoints={setPoints}
            />
            :
            <ImageCropper
              focus={focus}
              form={form}
              crop={crop}
              setCrop={setCrop}
              handleRemoveImage={handleRemoveImage}
              image={canvasImage}
              handleChange={handleChange}
              setCanvasImage={setCanvasImage}
              setImagetoShow={setImagetoShow}
            />
        }
        {insideCutoutoading ?
          <>loading</> : next >= 3 && insideChildCroppedImage && <Grid imageWidth={cutImg.width} imageHeight={cutImg.height} width={form.width} height={form.length}>
            <img style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, width: `${insideCutImg.width}px`, height: `${insideCutImg.height}px`, zIndex: -9 }} src={insideChildCroppedImage} />
          </Grid>}
        {calculation.size !== "" && calculation.size !== 0 && <p className='calculation'>Total Size : {Number(calculation.size).toFixed(2)} {form.unit === "cm" ? "Cm" : "In"}&#xb2;</p>}
        {calculation.weight !== "" && calculation.weight !== 0 && <p className='calculation'>Total Weight : {Number(calculation.weight).toFixed(2)} Kg</p>}
        {imagetoShow && <img ref={imgRef} style={{ display: "none" }} src={imagetoShow} alt="img" />}
      </div>
    </section>
  )
}

export default App
