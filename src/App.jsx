import { useEffect, useRef, useState } from 'react'
import { Canvas, Elementor, Grid } from './components'
import './App.css'
// import axios from 'axios';
import { areAllFieldsValid, calculateChildArea, calculateSelectedArea } from './algorithm';

function App() {
  const [points, setPoints] = useState([]);
  const [childPoints, setChildPoints] = useState([]);
  const [next, setNext] = useState(0)
  const [canvasImage, setCanvasImage] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })
  const [childCroppedImage, setChildCroppedImage] = useState(null)
  const [form, setForm] = useState({
    imageWidth: 700,
    imageHeight: 700,
    gridWidth: 700,
    gridHeight: 700,
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

  //save the original size of image to calculate
  const [newSize, setNewSize] = useState({
    width: "",
    height: ""
  })
  const [childNewSize, setChildNewSize] = useState({
    width: "",
    height: ""
  })
  const imageRef = useRef(null)
  const childImageRef = useRef(null)
  useEffect(() => {
    setChildNewSize({
      ...childNewSize,
      width: childImageRef?.current?.width,
      height: childImageRef?.current?.height
    })
    if (imageRef?.current?.height <= 300) {
      setForm(prevForm => ({
        ...prevForm,
        gridHeight: 300
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        gridHeight: 700
      }));
    }

    if (imageRef?.current?.width <= 300) {
      setForm(prevForm => ({
        ...prevForm,
        gridWidth: 300
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        gridWidth: 700
      }));
    }

  }, [childImageRef?.current, childCroppedImage])
  useEffect(() => {
    setNewSize({
      ...newSize,
      width: imageRef?.current?.width,
      height: imageRef?.current?.height
    })
    if (imageRef?.current?.height <= 300) {
      setForm(prevForm => ({
        ...prevForm,
        gridHeight: 300
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        gridHeight: 700
      }));
    }

    if (imageRef?.current?.width <= 300) {
      setForm(prevForm => ({
        ...prevForm,
        gridWidth: 300
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        gridWidth: 700
      }));
    }

  }, [imageRef?.current, croppedImage])

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

  //handle-crop
  const cropImage = () => {
    if (areAllFieldsValid(form) && points.length > 1 && (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y)) {
      var tempCtx = document.createElement('canvas').getContext('2d');

      const minX = Math.min(...points.map(point => point.x));
      const minY = Math.min(...points.map(point => point.y));
      const maxX = Math.max(...points.map(point => point.x));
      const maxY = Math.max(...points.map(point => point.y));

      const calculatedWidth = maxX - minX;
      const calculatedHeight = maxY - minY;

      tempCtx.canvas.width = calculatedWidth;
      tempCtx.canvas.height = calculatedHeight;

      if (points.length > 1) {
        const mask = new Path2D();
        mask.moveTo(points[0].x - minX, points[0].y - minY);
        points.slice(1).forEach(point => mask.lineTo(point.x - minX, point.y - minY));

        tempCtx.fillStyle = 'white';
        tempCtx.fill(mask);

        const image = new Image();
        image.src = canvasImage;

        image.onload = () => {
          tempCtx.globalCompositeOperation = 'source-in';

          tempCtx.drawImage(image, -minX, -minY, form.imageWidth, form.imageHeight);
          const croppedImageDataUrl = tempCtx.canvas.toDataURL();
          setCroppedImage(croppedImageDataUrl)
          setNext(1)
        };
      }
    } else {
      alert("please provide all fields")
    }
  };

  //calculation for parent cutout
  const handleParentCalculate = () => {
    if (newSize?.width && newSize?.height) {
      calculateSelectedArea(form, newSize?.width, newSize?.height, points, setCalculation)
    }
  }

  //calculation for child cutout
  const handleChildCalculate = () => {
    if (newSize?.width && newSize?.height) {
      calculateChildArea(form, newSize?.width, newSize?.height, childPoints, setCalculation, childNewSize?.width, childNewSize?.height)
    }
  }

  //Api fetching
  const handleSubmit = async () => {
    if (areAllFieldsValid(form) && childPoints.length > 1 && (childPoints[0]?.x === childPoints[childPoints.length - 1]?.x && childPoints[0]?.y === childPoints[childPoints.length - 1]?.y)) {
      var tempCtx = document.createElement('canvas').getContext('2d');

      const minX = Math.min(...childPoints.map(point => point.x));
      const minY = Math.min(...childPoints.map(point => point.y));
      const maxX = Math.max(...childPoints.map(point => point.x));
      const maxY = Math.max(...childPoints.map(point => point.y));

      setPosition({
        x: minX,
        y: minY
      })

      const calculatedWidth = maxX - minX;
      const calculatedHeight = maxY - minY;

      tempCtx.canvas.width = calculatedWidth;
      tempCtx.canvas.height = calculatedHeight;

      if (childPoints.length > 1) {
        const mask = new Path2D();
        mask.moveTo(childPoints[0].x - minX, childPoints[0].y - minY);
        childPoints.slice(1).forEach(point => mask.lineTo(point.x - minX, point.y - minY));

        tempCtx.fillStyle = 'white';
        tempCtx.fill(mask);

        const image = new Image();
        image.src = croppedImage;

        image.onload = () => {
          tempCtx.globalCompositeOperation = 'source-in';

          tempCtx.drawImage(image, -minX, -minY, newSize.width, newSize.height);
          const croppedImageDataUrl = tempCtx.canvas.toDataURL();
          setChildCroppedImage(croppedImageDataUrl)
          setNext(3)
        };
      }
    } else {
      alert("please make a contour first")
    }
  }

  // const api = async () => {
  //   const formData = new FormData();
  //   formData.append('image', form.image);
  //   const newArr = points.map(item => ({
  //     'x1': item.x,
  //     'y1': item.y
  //   }));
  //   const jsonString = JSON.stringify(newArr);
  //   formData.append('contour_data', jsonString);
  //   formData.append('image_height', form.imageHeight);
  //   formData.append('image_width', form.imageWidth);

  //   try {
  //     const response = await axios.post('http://192.168.18.131:8000/api/img_upload/', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       responseType: 'blob'
  //     });
  //     const imageUrl = URL.createObjectURL(response?.data)
  //     setCroppedImage(imageUrl)
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // }

  return (
    <section className='container'>
      <div className="elementor-container">
        <Elementor
          form={form}
          handleChange={handleChange}
          cropImage={cropImage}
          handleParentCalculate={handleParentCalculate}
          handleChildCalculate={handleChildCalculate}
          next={next}
          setNext={setNext}
          handleSubmit={handleSubmit}
          disabled={!areAllFieldsValid(form) || points.length < 2 || (points[0]?.x !== points[points.length - 1]?.x || points[0]?.y !== points[points.length - 1]?.y)}
        />
      </div>
      <div className="canvas-container">
        {next >= 2 ?
          <Canvas
            form={form}
            newSize={newSize}
            childCanvas
            points={childPoints}
            setPoints={setChildPoints}
            img={croppedImage}
            setForm={setForm}
          />
          :
          <Canvas
            form={form}
            points={points}
            setPoints={setPoints}
            handleChange={handleChange}
            handleRemoveImage={handleRemoveImage}
            img={canvasImage}
            setCanvasImage={setCanvasImage}
            setForm={setForm}
          />}
        {next < 3 && croppedImage && <Grid imageWidth={form.gridWidth} imageHeight={form.gridHeight} width={form.width} height={form.length}>
          <img style={{ position: "absolute", left: 0, top: 0, zIndex: 999, width: `${form.gridWidth}px`, height: `${form.gridHeight}px` }} src={croppedImage} />
        </Grid>}
        {next >= 3 && childCroppedImage && <Grid imageWidth={newSize.width} imageHeight={newSize.height} width={form.width} height={form.length}>
          <img style={{ position: "absolute", left: `${position.x}px`, top: `${position.y}px`, zIndex: 999 }} src={childCroppedImage} />
        </Grid>}
        {croppedImage && <img style={{ display: "none" }} ref={imageRef} src={croppedImage} />}
        {childCroppedImage && <img style={{ display: "none" }} ref={childImageRef} src={childCroppedImage} />}
        {calculation.size !== "" && calculation.size !== 0 && <p className='calculation'>Total Size : {Number(calculation.size).toFixed(2)} {form.unit === "cm" ? "Cm" : "In"}&#xb2;</p>}
        {calculation.weight !== "" && calculation.weight !== 0 && <p className='calculation'>Total Weight : {Number(calculation.weight).toFixed(2)} Kg</p>}
      </div>
    </section>
  )
}

export default App
