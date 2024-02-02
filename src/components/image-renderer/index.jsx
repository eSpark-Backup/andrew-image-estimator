import { useRef, useEffect } from 'react';
import { getDimention } from '../../algorithm';

export const ImageRenderer = ({ form, image, handleChange, setCanvasImage, setImagetoShow }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (image) {
      const context = canvasRef.current.getContext('2d');
      var canvas = context.canvas;
      const { centerShift_x, centerShift_y, w, h } = getDimention(canvas.width, canvas.height, image.width, image.height)
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, image.width, image.height,
        centerShift_x, centerShift_y, w, h);
    }
  }, [image ]);

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
      setImagetoShow(imageUrl)
    }
  }

  return (
    <>
      {image ? (
        <canvas
          ref={canvasRef}
          width={form.imageWidth}
          height={form.imageHeight}
        />
      ) :
        <label htmlFor="imageInput" className="button">
          Upload Image
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleAddImage}
            className="hidden-input"
          />
        </label>}
    </>
  );
};