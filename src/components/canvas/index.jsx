import { useRef, useEffect, useState } from "react";
import { downloadFileFromDrive } from "../../algorithm";
import Loader from "../loader/Loader";
import { slideAnimation } from "../../constants";
import { motion } from "framer-motion"
import GIFModal from "../modal/GIFModal";
import { areaGIF, objectGIF } from "../../assets";

const Canvas = ({
  apiPolygons,
  img,
  points,
  setPoints,
  cropImg,
  polygonArr,
  setPolygonArr,
  token,
}) => {
  const canvasRef = useRef(null);
  const [src, setSrc] = useState("");
  const [loader, setLoader] = useState(false);
  const [showGIFModal, setShowGIFModal] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (img) {
      setShowGIFModal(true);
    }
  }, [img]);


  useEffect(() => {
    if (polygonArr) {
      let arr = [];
      arr.push({ new: true, points });
      if (
        points.length > 2 &&
        points[0]?.x === points[points.length - 1]?.x &&
        points[0]?.y === points[points.length - 1]?.y
      ) {
        polygonArr.length > 0
          ? setPolygonArr([...polygonArr, ...arr])
          : setPolygonArr([...arr]);
        arr = [];
      }
    }
  }, [points]);

  useEffect(() => {
    setLoader(true);
    const fetchDataAndDrawImage = async () => {
      try {
        if (token !== "") {
          const data = await downloadFileFromDrive(img.split("/")[5], token);
          setSrc(data?.url);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
      }
    };

    fetchDataAndDrawImage();
  }, [img, token]);

  const apiPolarr =
    apiPolygons &&
    Object.keys(apiPolygons).length > 0 &&
    Object.keys(apiPolygons).map((key) => ({
      points: apiPolygons[key].map((val) => {
        return { x: val.x1, y: val.y1 };
      }),
    }));

  const handleWheel = (event) => {
    event.preventDefault();

    const delta = Math.max(-1, Math.min(1, event.deltaY));
    const prevScale = scale;
    let newScale;

    if (delta < 0) {
      newScale = Math.min(prevScale + 0.1, 5);
    } else {
      newScale = Math.max(prevScale - 0.1, 1);
    }
    setScale(newScale);
    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const centerX = canvasRect.width / 2;
    const centerY = canvasRect.height / 2;

    const scaleRatio = newScale / scale;

    const newPoints = points.map(({ x, y }) => ({
      x: centerX + (x - centerX) * scaleRatio,
      y: centerY + (y - centerY) * scaleRatio,
    }));

    setPoints(newPoints);

    setScale(newScale);
  };

  const handleMouseDown = (event) => {
    if (event.ctrlKey) {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
    } else {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (points.length > 1) {
        const firstPoint = points[0];
        const distance = Math.sqrt(
          (x - firstPoint.x) ** 2 + (y - firstPoint.y) ** 2
        );
        if (distance < 5) {
          setPoints((prevDots) => [
            ...prevDots,
            { x: firstPoint.x, y: firstPoint.y },
          ]);
          return;
        }
      }
      if (
        points.length > 1 &&
        points[0]?.x === points[points.length - 1]?.x &&
        points[0]?.y === points[points.length - 1]?.y
      ) {
        setPoints((prevDots) => [...prevDots]);
      } else {
        setPoints((prevDots) => [...prevDots, { x, y }]);
      }
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const dx = event.clientX - dragStart.x;
      const dy = event.clientY - dragStart.y;
      const canvas = canvasRef.current;
      const canvasRect = canvas?.getBoundingClientRect();

      const maxX = (canvas.width * scale - canvasRect.width) / (2 * scale);
      const maxY = (canvas.height * scale - canvasRect.height) / (2 * scale);

      let newX = imagePosition.x + dx / scale;
      let newY = imagePosition.y + dy / scale;

      const imageWidth = canvas.width * scale;
      const imageHeight = canvas.height * scale;
      const halfImageWidth = imageWidth / 2;
      const halfImageHeight = imageHeight / 2;

      const leftBoundary = Math.min((canvasRect.width / (2 * scale)) - halfImageWidth, maxX);
      const rightBoundary = Math.max(halfImageWidth - (canvasRect.width / (2 * scale)), -maxX);
      const topBoundary = Math.min((canvasRect.height / (2 * scale)) - halfImageHeight, maxY);
      const bottomBoundary = Math.max(halfImageHeight - (canvasRect.height / (2 * scale)), -maxY);

      newX = Math.max(leftBoundary, Math.min(rightBoundary, newX));
      newY = Math.max(topBoundary, Math.min(bottomBoundary, newY));

      setImagePosition({ x: newX, y: newY });

      const deltaX = newX - imagePosition.x;
      const deltaY = newY - imagePosition.y;

      const newPoints = points.map(({ x, y }) => ({
        x: x + deltaX,
        y: y + deltaY,
      }));
      setPoints(newPoints);

      setDragStart({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!img) {
      return;
    }
    const canvas = canvasRef?.current;
    if (!canvas) {
      return
    }
    const context = canvas?.getContext("2d");
    const image = new Image();
    image.src = src;

    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const sw = canvas.width * scale;
      const sh = canvas.height * scale;
      const sx = Math.min(Math.max(0, canvas.width / 2 - sw / 2), canvas.width - sw);
      const sy = Math.min(Math.max(0, canvas.height / 2 - sh / 2), canvas.height - sh);
      context.drawImage(image, sx, sy, sw, sh);
      drawGraph();
    };

    const drawPolygonsApi = () => {
      apiPolarr && apiPolarr.length > 0
        ? apiPolarr?.forEach(({ points }) => {
          redrawCanvasLoop(points);
        })
        : null;
    };

    const drawPolygons = () => {
      polygonArr && polygonArr.length > 0
        ? polygonArr?.forEach(({ new: newArr, points }) => {
          if (!newArr) redrawCanvasLoop(points);
        })
        : null;
    };

    const redrawCanvasLoop = (points) => {
      if (points.length > 1) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          context.lineTo(points[i].x, points[i].y);
        }

        if (
          points[0]?.x === points[points.length - 1]?.x &&
          points[0]?.y === points[points.length - 1]?.y
        ) {
          context.strokeStyle = "#157c4b";
          context.lineWidth = 3;
          context.stroke();
        } else {
          context.strokeStyle = "#39FF14";
          context.lineWidth = 3;
          context.stroke();
        }
      }

      context.fillStyle = "#39FF14";
      for (let i = 0; i < points.length; i++) {
        context.beginPath();
        context.arc(points[i].x, points[i].y, 4, 0, 2 * Math.PI);
        context.fill();
      }
    };

    function drawGraph() {
      drawPolygons();
      drawPolygonsApi();
    }

    const animate = () => {
      redrawCanvas();
      requestAnimationFrame(animate);
    };

    const redrawCanvas = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);
      const sw = canvas.width * scale;
      const sh = canvas.height * scale;
      let sx = (canvas.width - sw) / 2 + imagePosition.x;
      let sy = (canvas.height - sh) / 2 + imagePosition.y;
      sx = Math.max(Math.min(sx, 0), canvas.width - sw);
      sy = Math.max(Math.min(sy, 0), canvas.height - sh);
      context.drawImage(image, sx, sy, sw, sh);
      drawGraph();

      const scaledPoints = points.map(({ x, y }) => ({
        x,
        y
      }));

      if (scaledPoints.length > 1) {
        context.beginPath();
        context.moveTo(scaledPoints[0].x, scaledPoints[0].y);

        for (let i = 1; i < scaledPoints.length; i++) {
          context.lineTo(scaledPoints[i].x, scaledPoints[i].y);
        }

        if (
          scaledPoints[0].x === scaledPoints[scaledPoints.length - 1].x &&
          scaledPoints[0].y === scaledPoints[scaledPoints.length - 1].y
        ) {
          context.strokeStyle = "#FF0000";
          context.lineWidth = 3;
          context.stroke();
        } else {
          context.strokeStyle = "#39FF14";
          context.lineWidth = 3;
          context.stroke();
        }
      }
      context.fillStyle = "#39FF14";
      scaledPoints.forEach(({ x, y }) => {
        context.beginPath();
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fill();
      });
    };

    canvas?.addEventListener("mousedown", handleMouseDown);
    animate();

    return () => {
      canvas?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [points, img, src, scale, imagePosition]);

  return (
    <>
      <motion.div {...slideAnimation("down")} className="details">
        <p className="details-heading">
          {polygonArr ? "Select the object" : "Select the area"}
        </p>
        {polygonArr ? (
          <p className="details-desc">
            Click on the object to set the starting point of your polygon.
            Continue clicking at each corner or key point to outline the object
            you want to get estimated. Ensure precision by placing points
            accurately. If you make a mistake click on the Revert button undo
            the last step. However Reset button will clear all points, allowing
            you to begin anew.
          </p>
        ) : (
          <p className="details-desc">
            Click on the image to set the starting point of your polygon. For
            clipping out the area, continue clicking at each corner or key point
            to outline the area of interest. Ensure precision by placing points
            accurately. If you make a mistake click on the Revert button undo
            the last step. However Reset button will clear all points, allowing
            you to begin anew.
          </p>
        )}
      </motion.div>

      {loader ? (
        <Loader />
      ) : (
        <>
          <div>
            <canvas
              className="image-area-tour"
              ref={canvasRef}
              width={cropImg.width}
              height={cropImg.height}
              style={{ cursor: isDragging ? "grab" : "crosshair" }}
              onWheel={handleWheel}
            ></canvas>
          </div>
          <GIFModal
            GIF={polygonArr ? objectGIF : areaGIF}
            description={polygonArr
              ? "Now Select the object you want to clip for your project."
              : "Now Select the area of the image you want to clip for your project."}
            modalIsOpen={showGIFModal}
            closeModal={() => setShowGIFModal(false)}
          />
        </>
      )}


    </>
  );
};

export default Canvas;
