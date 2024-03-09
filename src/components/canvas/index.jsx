import { useRef, useEffect, useState } from "react";
import { downloadFileFromDrive, getImgSrc } from "../../algorithm";
import Loader from "../loader/Loader";

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
        const data = await downloadFileFromDrive(img.split("/")[5], token);
        if (src === "") {
          setSrc(data?.url);
        }
        setLoader(false);
      } catch (error) {
        setLoader(false);
      }
    };

    fetchDataAndDrawImage();
  }, [img]);

  const apiPolarr = apiPolygons && apiPolygons.length > 0 && Object.keys(apiPolygons).map((key) => ({
    points: apiPolygons[key].map((val) => {
      return { x: val.x1, y: val.y1 };
    }),
  }));

  useEffect(() => {
    if (!img) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const image = new Image();
    image.src = src;

    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
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
          context.strokeStyle = "#BABABA";
          context.lineWidth = 3;
          context.stroke();
        }
      }

      context.fillStyle = "#BABABA";
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

    const handleMouseDown = (event) => {
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
    };

    const redrawCanvas = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      drawGraph();

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
          context.strokeStyle = "#FF0000";
          context.lineWidth = 3;
          context.stroke();
        } else {
          context.strokeStyle = "#BABABA";
          context.lineWidth = 3;
          context.stroke();
        }
      }

      context.fillStyle = "#BABABA";
      for (let i = 0; i < points.length; i++) {
        context.beginPath();
        context.arc(points[i].x, points[i].y, 4, 0, 2 * Math.PI);
        context.fill();
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    animate();

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [points, img, src]);

  return (
    <>
      <div className="details">
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
      </div>

      {loader ? (
        <Loader />
      ) : (
        <canvas
          ref={canvasRef}
          width={cropImg.width}
          height={cropImg.height}
          style={{ cursor: "crosshair" }}
        ></canvas>
      )}
    </>
  );
};

export default Canvas;
