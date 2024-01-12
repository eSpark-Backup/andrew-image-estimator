import { useEffect, useRef, useState } from 'react'
import { Canvas, Elementor, Grid } from './components'
import './App.css'
import axios from 'axios';
import { areAllFieldsValid, calculateSelectedArea } from './algorithm';

function App() {
  const [points, setPoints] = useState([]);
  const [canvasImage, setCanvasImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 700,
    image: null,
    unit: "",
    length: "",
    width: "",
    thickness: "",
    density: ""
  })
  const [calculation, setCalculation] = useState({
    weight: "",
    size: ""
  })

  //save the original size of image to calculate
  const [newSize, setNewSize] = useState({
    width: "",
    height: ""
  })
  const imageRef = useRef(null)
  useEffect(() => {
    setNewSize({
      ...newSize,
      width: imageRef?.current?.width,
      height: imageRef?.current?.height
    })
    calculateSelectedArea(form, imageRef?.current?.width, imageRef?.current?.height, points, setCalculation)
  }, [imageRef, croppedImage])

  //handle inputs function
  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
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

  //Api fetching
  const handleSubmit = async () => {
    if (areAllFieldsValid(form) && points.length > 1 && (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y)) {
      const formData = new FormData();
      formData.append('image', form.image);
      const newArr = points.map(item => ({
        'x1': item.x,
        'y1': item.y
      }));
      const jsonString = JSON.stringify(newArr);
      formData.append('contour_data', jsonString);
      formData.append('image_height', form.imageHeight);
      formData.append('image_width', form.imageWidth);

      try {
        const response = await axios.post('http://192.168.18.131:8000/api/img_upload/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob'
        });
        const imageUrl = URL.createObjectURL(response?.data)
        setCroppedImage(imageUrl)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }

  return (
    <section className='container'>
      <div className="elementor-container">
        <Elementor
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          disabled={!areAllFieldsValid(form) || points.length < 2 || (points[0]?.x !== points[points.length - 1]?.x || points[0]?.y !== points[points.length - 1]?.y)}
        />
      </div>
      <div className="canvas-container">
        <Canvas
          form={form}
          points={points}
          setPoints={setPoints}
          handleChange={handleChange}
          handleRemoveImage={handleRemoveImage}
          img={canvasImage}
          setCanvasImage={setCanvasImage}
          setCroppedImage={setCroppedImage}
          setForm={setForm}
        />
        {croppedImage && <Grid imageWidth={form.imageWidth} imageHeight={form.imageHeight} width={form.width} height={form.length}>
          <img style={{ position: "absolute", left: 0, top: 0, zIndex: 999, width: `${form.imageWidth}px`, height: `${form.imageHeight}px` }} src={croppedImage} />
        </Grid>}
        {croppedImage && <img style={{ display: "none" }} ref={imageRef} src={croppedImage} />}
        {calculation.size !== "" && <p className='calculation'>Total Size : {Number(calculation.size).toFixed(2)} {form.unit === "cm" ? "Cm" : "In"}&#xb2;</p>}
        {calculation.weight !== "" && <p className='calculation'>Total Weight : {Number(calculation.weight).toFixed(2)} Kg</p>}
      </div>
    </section>
  )
}

export default App
