import { useRef, useEffect, useState } from "react";
import { getDimention } from "../../algorithm";
import { uploadImg } from "../../assets";
import { ImageTour } from "../../constants";
import Joyride from 'react-joyride';

export const ImageRenderer = ({
  form,
  image,
  handleChange,
  setCanvasImage,
  setImagetoShow,
  next
}) => {
  const canvasRef = useRef(null);
  const [tour, setTour] = useState(false);
  const [imageTour] = useState(ImageTour);

  const callback = (data) => {
    if (data.action === 'close' && data.type === 'step:after') {
      setTour(false);
    }
  }


  useEffect(() => {
    if (!image && next === 0) {
      setTour(true);
    }
  }
    , [image, next]);

  useEffect(() => {
    if (image) {
      const context = canvasRef.current.getContext("2d");
      var canvas = context.canvas;
      const { centerShift_x, centerShift_y, w, h } = getDimention(
        canvas.width,
        canvas.height,
        image.width,
        image.height
      );
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        centerShift_x,
        centerShift_y,
        w,
        h
      );
    }
  }, [image]);

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", file);
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setCanvasImage(img);
      };
      setImagetoShow(imageUrl);
    }
  };

  return (
    <>
      {image ? (
        <canvas
          ref={canvasRef}
          width={form.imageWidth}
          height={form.imageHeight}
        />
      ) : (
        <div className="upload-container">
          <div className="upload-img">
            <img src={uploadImg} alt="upload" />
          </div>
          <diV className="btn-center">
            <p className="upload-heading">Upload Image</p>
            <p className="upload-desc">Image should be with .img, .png, .jpeg & .jpg extension</p>
          <label htmlFor="imageInput" className="button btn-upload image-selector">
            Upload Image
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              className="hidden-input"
              />
          </label>
              </diV>
              <Joyride
        run={tour}
        showProgress={false}
        showSkipButton={false}
        callback={callback}
        steps={imageTour}
        hideCloseButton={true}
        styles={{
          buttonNext: {
            display: "none",
          }

        }}
      />
        </div>
      )}
    </>
  );
};
