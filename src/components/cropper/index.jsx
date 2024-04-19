import { useState, useRef, useEffect } from "react";
import { getImgDim } from "../../algorithm";
import { slideAnimation } from "../../constants";
import { motion } from "framer-motion"
import GIFModal from "../modal/GIFModal";
import { cropGIF } from "../../assets";

export const ImageCropper = ({
  shapeDrawn,
  setShapeDrawn,
  focus,
  form,
  crop,
  setCrop,
  image,
}) => {
  const [xColor, setXColor] = useState("#39FF14");
  const [yColor, setYColor] = useState("#39FF14");
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showGIFModal, setShowGIFModal] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);


  useEffect(() => {
    if (image && !focus) {
      setShowGIFModal(true);
    }
  }, [!focus]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (focus === "height") {
        setXColor(xColor === "#ff0000" ? "#39FF14" : "#ff0000");
        setYColor("#39FF14");
      } else if (focus === "length") {
        setYColor(yColor === "#ff0000" ? "#39FF14" : "#ff0000");
        setXColor("#39FF14");
      } else {
        setXColor("#39FF14");
        setYColor("#39FF14");
      }
    }, 300); // Delay of 1000 milliseconds (1 second)

    return () => clearTimeout(timeout);
  }, [focus, xColor, yColor]);

  useEffect(() => {
    if (image) {
      const context = canvasRef.current.getContext("2d");
      var canvas = context.canvas;
      const { width, height } = getImgDim({ width: image.width, height: image.height }, form)
      canvas.width = width;
      canvas.height = height;
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the image onto the canvas
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      if (focus) {
        drawCropRectangle(context);
      } else {
        if (isDrawing || shapeDrawn) {
          drawCropRectangle(context);
        }
      }
    }
  }, [image, crop, isDrawing, shapeDrawn, xColor, yColor]);

  const handleResizeMove = (e) => {
    if (!isDrawingRef.current || !crop.handleType) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    switch (crop.handleType) {
      case "top-left":
        setCrop((prevCrop) => ({
          ...prevCrop,
          x: crop.x + deltaX,
          y: crop.y + deltaY,
          width: crop.width - deltaX,
          height: crop.height - deltaY,
        }));
        break;
      case "top-right":
        setCrop((prevCrop) => ({
          ...prevCrop,
          y: crop.y + deltaY,
          width: crop.width + deltaX,
          height: crop.height - deltaY,
        }));
        break;
      case "bottom-left":
        setCrop((prevCrop) => ({
          ...prevCrop,
          x: crop.x + deltaX,
          width: crop.width - deltaX,
          height: crop.height + deltaY,
        }));
        break;
      case "bottom-right":
        setCrop((prevCrop) => ({
          ...prevCrop,
          width: crop.width + deltaX,
          height: crop.height + deltaY,
        }));
        break;
      default:
        break;
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const drawResizeHandles = (context) => {
    const handleSize = 5;
    const handles = [
      { x: crop.x, y: crop.y, cursor: "nwse-resize", type: "top-left" },
      {
        x: crop.x + crop.width,
        y: crop.y,
        cursor: "nesw-resize",
        type: "top-right",
      },
      {
        x: crop.x,
        y: crop.y + crop.height,
        cursor: "nesw-resize",
        type: "bottom-left",
      },
      {
        x: crop.x + crop.width,
        y: crop.y + crop.height,
        cursor: "nwse-resize",
        type: "bottom-right",
      },
    ];

    handles.forEach((handle) => {
      context.fillStyle = "#39FF14";
      context.fillRect(
        handle.x - handleSize / 2,
        handle.y - handleSize / 2,
        handleSize,
        handleSize
      );
    });
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const { left, top } = canvasRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;
    // const rect = canvasRef.current.getBoundingClientRect();
    // const scaleX = canvasRef.current.width / rect.width;
    // const scaleY = canvasRef.current.height / rect.height;

    // const x = (clientX - rect.left) * scaleX;
    // const y = (clientY - rect.top) * scaleY;

    const handle = getHandleAtPosition(x, y);

    if (handle) {
      setDragStart({ x: clientX, y: clientY });
      setCrop((prevCrop) => ({ ...prevCrop, handleType: handle.type }));
      isDrawingRef.current = true;
    } else if (isPointInCropArea(x, y)) {
      setDragStart({ x, y });
      isDrawingRef.current = true;
    } else {
      // Check if the click is outside the existing shape
      if (!shapeDrawn) {
        setDragStart({ x: clientX, y: clientY });
        setCrop((prevCrop) => ({
          ...prevCrop,
          x,
          y,
          width: 0,
          height: 0,
          handleType: null,
        }));
        isDrawingRef.current = true;
        setIsDrawing(true);
      }
    }
  };

  const drawCropRectangle = (context) => {
    const originalStrokeStyle = context.strokeStyle;

    context.strokeStyle = "#39FF14";
    context.lineWidth = 1;
    context.strokeRect(crop.x, crop.y, crop.width, crop.height);

    context.beginPath();
    context.moveTo(crop.x, crop.y);
    context.lineTo(crop.x + crop.width, crop.y);
    context.lineTo(crop.x + crop.width, crop.y + crop.height);
    context.lineTo(crop.x, crop.y + crop.height);
    context.closePath();
    context.stroke();

    context.strokeStyle = xColor;

    context.beginPath();
    context.moveTo(crop.x, crop.y + crop.height);
    context.lineTo(crop.x + crop.width, crop.y + crop.height);
    context.closePath();
    context.stroke();

    context.strokeStyle = xColor;

    context.beginPath();
    context.moveTo(crop.x, crop.y);
    context.lineTo(crop.x + crop.width, crop.y);
    context.closePath();
    context.stroke();

    context.strokeStyle = yColor;

    context.beginPath();
    context.moveTo(crop.x, crop.y);
    context.lineTo(crop.x, crop.y + crop.height);
    context.closePath();
    context.stroke();

    context.strokeStyle = yColor;

    context.beginPath();
    context.moveTo(crop.x + crop.width, crop.y);
    context.lineTo(crop.x + crop.width, crop.y + crop.height);
    context.closePath();
    context.stroke();

    context.strokeStyle = originalStrokeStyle;

    drawResizeHandles(context);
  };

  const handleMouseMove = (e) => {
    //     }
    if (isDrawingRef.current) {
      if (shapeDrawn) {
        if (crop.handleType) {
          handleResizeMove(e);
        } else {
          const { clientX, clientY } = e;
          const { left, top } = canvasRef.current.getBoundingClientRect();
          const x = clientX - left;
          const y = clientY - top;
          // const rect = canvasRef.current.getBoundingClientRect();
          // const scaleX = canvasRef.current.width / rect.width;
          // const scaleY = canvasRef.current.height / rect.height;

          // const x = (clientX - rect.left) * scaleX;
          // const y = (clientY - rect.top) * scaleY;
          setCrop((prevCrop) => ({
            ...prevCrop,
            x: x - dragStart.x + prevCrop.x,
            y: y - dragStart.y + prevCrop.y,
          }));

          setDragStart({ x, y });
        }
      } else {
        const { clientX, clientY } = e;
        const { left, top } = canvasRef.current.getBoundingClientRect();

        if (shapeDrawn) {
          const x = clientX - left - dragStart.x;
          const y = clientY - top - dragStart.y;

          setCrop((prevCrop) => ({
            ...prevCrop,
            x,
            y,
          }));
        } else {
          const width = clientX - left - crop.x;
          const height = clientY - top - crop.y;

          setCrop((prevCrop) => ({ ...prevCrop, width, height }));
        }
      }
    } else {
      const { clientX, clientY } = e;
      const { left, top } = canvasRef.current.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      const handle = getHandleAtPosition(x, y);

      if (handle) {
        canvasRef.current.style.cursor = handle.cursor;
      } else if (isPointInCropArea(x, y)) {
        canvasRef.current.style.cursor = "move";
      } else {
        canvasRef.current.style.cursor = shapeDrawn ? "default" : "crosshair";
      }
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    setIsDrawing(false);
    setShapeDrawn(true);
    setCrop((prevCrop) => ({ ...prevCrop, handleType: null }));
  };

  const getHandleAtPosition = (x, y) => {
    const handles = [
      { x: crop.x, y: crop.y, type: "top-left" },
      { x: crop.x + crop.width, y: crop.y, type: "top-right" },
      { x: crop.x, y: crop.y + crop.height, type: "bottom-left" },
      { x: crop.x + crop.width, y: crop.y + crop.height, type: "bottom-right" },
    ];

    return handles.find(
      (handle) =>
        x >= handle.x - 4 &&
        x <= handle.x + 4 &&
        y >= handle.y - 4 &&
        y <= handle.y + 4
    );
  };

  const isPointInCropArea = (x, y) => {
    return (
      x >= crop.x &&
      x <= crop.x + crop.width &&
      y >= crop.y &&
      y <= crop.y + crop.height
    );
  };

  return (
    <>
      {!focus && <motion.div {...slideAnimation("down")} className="details">
        {/* <p className="details-heading">Crop</p>
        <p className="details-desc">
          Click and drag to create a crop box over your image. Resize and
          reposition the box to cover the portion you want to keep.
        </p> */}
      </motion.div>}
      <div>
        <canvas
          ref={canvasRef}
          width={form.imageWidth}
          height={form.imageHeight}
          className="image-crop-tour"
          style={{
            cursor: focus ? "pointer" : shapeDrawn ? "move" : "crosshair",
          }}
          onMouseDown={!focus && handleMouseDown}
          onMouseMove={!focus && handleMouseMove}
          onMouseUp={!focus && handleMouseUp}
        />
      </div>

      <GIFModal
        GIF={cropGIF}
        description={"Follow the steps to crop your image and create an estimation for your estimate."}
        modalIsOpen={showGIFModal}
        closeModal={() => setShowGIFModal(false)}
      />
    </>
  );
};
