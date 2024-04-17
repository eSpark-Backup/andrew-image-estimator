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

    const handleMouseDown = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (points.length > 1) {
        const firstPoint = points[0];
        const distance = Math.sqrt(
          (x - firstPoint.x) ** 2 + (y - firstPoint.y) ** 2
        );
        if (distance < 10) {
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
          context.strokeStyle = "#39FF14";
          context.lineWidth = 3;
          context.stroke();
        }
      }

      context.fillStyle = "#39FF14";
      for (let i = 0; i < points.length; i++) {
        context.beginPath();
        if (i === 0) {
          context.fillStyle = "#FFC107"
          context.arc(points[i].x, points[i].y, 10, 0, 2 * Math.PI)
        }
        else {
          context.fillStyle = "#39FF14"
          context.arc(points[i].x, points[i].y, 4, 0, 2 * Math.PI);
        }

        context.fill();
      }
    };

    canvas?.addEventListener("mousedown", handleMouseDown);
    animate();

    return () => {
      canvas?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [points, img, src]);

  return (
    <>
      <motion.div {...slideAnimation("down")} className="details">
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
              style={{ cursor: "crosshair" }}
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
