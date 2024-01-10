import { useState } from 'react'
import { Canvas, Elementor, Grid } from './components'
import './App.css'
// import axios from 'axios';

function App() {

  function areAllFieldsValid(obj) {
    for (const [key, value] of Object.entries(obj)) {
      if (Object.hasOwnProperty.call(obj, key)) {
        if (value === null || (typeof value === 'string' && value.trim() === '')) {
          return false;
        }
      }
    }

    return true;
  }

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

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleRemoveImage = () => {
    setForm({
      ...form,
      image: null,
    })
    setCanvasImage(null)
    setCroppedImage(null)
  }

  const handleSubmit = async () => {
    if (areAllFieldsValid(form) && points.length > 1 && (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y)) {
      // console.log(form, points)
      // const formData = new FormData();
      // formData.append('image', form.image);

      // const newArr = points.map(item => ({
      //   'x1': item.x,
      //   'y1': item.y
      // }));
      // const jsonString = JSON.stringify(newArr);
      // formData.append('contour_data', jsonString);
      // formData.append('image_height', 700);
      // formData.append('image_width', 700);

      // try {
      //   const response = await axios.post('http://192.168.18.131:8000/api/img_upload/', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   console.log('API Response:', response);
      // } catch (error) {
      //   console.error('Error uploading file:', error);
      // }
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
        />
        {croppedImage && <Grid width={form.width / 5} height={form.length / 5}>
          <img style={{ position: "absolute", left: 0, top: 0, zIndex: 999, width: `${form.width}px`, height: `${form.length}px` }} src={croppedImage} />
        </Grid>}
      </div>
    </section>
  )
}

export default App
