import { toast } from "react-toastify";
import {
  createEstimationFromById,
  updateEstimationById,
} from "../services/estimationsApi";

export const getImgSrc = (img) => {
  const id = img?.split("/")[5];
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
};

export async function downloadFileFromDrive(fileId, token) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch file");
    }

    const fileData = await response.blob();
    const url = URL.createObjectURL(fileData);
    return { url, fileData };
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error; // Re-throw the error for handling at higher levels
  }
}

//algorithm of calculating the selected size of metal and and it's weight
export const calculateSelectedArea = (
  form,
  width,
  height,
  points,
  setCalculation
) => {
  let scale_factor_x = form.width / width;
  let scale_factor_y = form.length / height;

  let scaledPolygonVertices = points.map((vertex) => ({
    x: vertex.x * scale_factor_x,
    y: vertex.y * scale_factor_y,
  }));
  let n = scaledPolygonVertices.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    let x1 = scaledPolygonVertices[i]?.x;
    let y1 = scaledPolygonVertices[i]?.y;
    let x2 = scaledPolygonVertices[(i + 1) % n]?.x;
    let y2 = scaledPolygonVertices[(i + 1) % n]?.y;

    area += x1 * y2 - x2 * y1;
  }

  const baseArea = Math.abs(area) / 2;

  const baseAreaInMeters = baseArea * 0.00064516;

  const volumeInMeters = baseAreaInMeters * Number(form.thickness);

  const weightInKgs = volumeInMeters * Number(form.density);

  if (!isNaN(weightInKgs) && !isNaN(baseArea)) {
    setCalculation({
      weight: weightInKgs,
      size: baseArea,
    });
  }
};

const unitConverter = (form, valueInInch) => {
  if (form.unit === "cm") {
    return valueInInch * 0.3937;
  } else if (form.unit === "m") {
    return valueInInch * 39.3701;
  } else if (form.unit === "mm") {
    return valueInInch * 0.0393701;
  } else if (form.unit === "ft") {
    return valueInInch * 12;
  } else {
    return valueInInch;
  }
};

const baseAreaConverter = (form, valueInInch) => {
  if (form.unit === "cm") {
    return valueInInch * 6.452;
  } else if (form.unit === "m") {
    return valueInInch * 0.0006452;
  } else if (form.unit === "mm") {
    return valueInInch * 645.2;
  } else if (form.unit === "ft") {
    return valueInInch * 0.00694488;
  } else {
    return valueInInch;
  }
};

//algorithm of calculating the selected size of metal and and it's weight according to parent's given dimention
export const calculateChildArea = (
  form,
  width,
  height,
  points,
  childWidth,
  childHeight
) => {
  const childDimention = getChildDimention(
    form,
    width,
    height,
    childWidth,
    childHeight
  );
  let scale_factor_x = unitConverter(form, childDimention.width) / childWidth;
  let scale_factor_y = unitConverter(form, childDimention.length) / childHeight;

  let scaledPolygonVertices = points.map((vertex) => ({
    x: vertex.x * scale_factor_x,
    y: vertex.y * scale_factor_y,
  }));
  let n = scaledPolygonVertices.length;
  let area = 0;

  for (let i = 0; i < n; i++) {
    let x1 = scaledPolygonVertices[i]?.x;
    let y1 = scaledPolygonVertices[i]?.y;
    let x2 = scaledPolygonVertices[(i + 1) % n]?.x;
    let y2 = scaledPolygonVertices[(i + 1) % n]?.y;

    area += x1 * y2 - x2 * y1;
  }

  const baseArea = Math.abs(area) / 2;

  const baseAreaInMeters = baseArea * 0.00064516;

  const volumeInMeters = baseAreaInMeters * Number(form.thickness);

  const weightInKgs = volumeInMeters * Number(form.density);

  const weightInPounds = weightInKgs * 2.20462;

  const platePrice = weightInPounds * 0.5;

  if (!isNaN(weightInPounds) && !isNaN(baseArea)) {
    return {
      weight: weightInPounds,
      size: baseAreaConverter(form, baseArea),
      platePrice,
    };
  }
};

////algorithm of calculating the child dimention according to parent dimention
const getChildDimention = (
  form,
  parentWidth,
  parentHeight,
  childWidth,
  childHeight
) => {
  const dpiWidth = parentWidth / form.width;
  const dpiHeight = parentHeight / form.length;
  const averageDPI = (dpiWidth + dpiHeight) / 2;

  // Calculate child dimensions in inches
  const childWidthInches = childWidth / averageDPI;
  const childHeightInches = childHeight / averageDPI;
  return { width: childWidthInches, length: childHeightInches };
};

//algorithm of calculating the box-size of grid
export const handleBoxSize = (
  totalWidth,
  totalHeight,
  objectWidth,
  objectHeight
) => {
  let boxWidth;
  let boxHeight;
  if (objectWidth <= 300) {
    boxWidth = totalWidth / (objectWidth * 0.5);
  } else if (objectWidth > 300 && objectWidth <= 600) {
    boxWidth = totalWidth / (objectWidth * 0.25);
  } else {
    boxWidth = totalWidth / (objectWidth * 0.1);
  }
  if (objectHeight <= 300) {
    boxHeight = totalHeight / (objectHeight * 0.5);
  } else if (objectHeight > 300 && objectHeight <= 600) {
    boxHeight = totalHeight / (objectHeight * 0.25);
  } else {
    boxHeight = totalHeight / (objectHeight * 0.1);
  }

  return { boxWidth, boxHeight };
};

//algorithm of calculating the box-count
export const totalBoxCounts = (objectWidth, objectHeight) => {
  let boxCountX;
  let boxCountY;
  if (objectWidth <= 300) {
    boxCountX = objectWidth * 0.5;
  } else if (objectWidth > 300 && objectWidth <= 600) {
    boxCountX = objectWidth * 0.25;
  } else {
    boxCountX = objectWidth * 0.1;
  }
  if (objectHeight <= 300) {
    boxCountY = objectHeight * 0.5;
  } else if (objectHeight > 300 && objectHeight <= 600) {
    boxCountY = objectHeight * 0.25;
  } else {
    boxCountY = objectHeight * 0.1;
  }
  return { boxCountX, boxCountY };
};

//algorithm of calculating the canvas points
export const getCanvasPoints = (crop) => {
  let points = [];
  if (crop.width < 0 && crop.height < 0) {
    points = [
      { x1: crop.x - Math.abs(crop.width), y1: crop.y - Math.abs(crop.height) },
      { x1: crop.x, y1: crop.y - Math.abs(crop.height) },
      { x1: crop.x, y1: crop.y },
      { x1: crop.x - Math.abs(crop.width), y1: crop.y },
    ];
  } else if (crop.width < 0) {
    points = [
      { x1: crop.x - Math.abs(crop.width), y1: crop.y },
      { x1: crop.x, y1: crop.y },
      { x1: crop.x, y1: crop.height + crop.y },
      { x1: crop.x - Math.abs(crop.width), y1: crop.height + crop.y },
    ];
  } else if (crop.height < 0) {
    points = [
      { x1: crop.x, y1: crop.y },
      { x1: crop.width + crop.x, y1: crop.y },
      { x1: crop.width + crop.x, y1: crop.height + crop.y },
      { x1: crop.x, y1: crop.height + crop.y },
    ];
  } else {
    points = [
      { x1: crop.x, y1: crop.y },
      { x1: crop.width + crop.x, y1: crop.y },
      { x1: crop.width + crop.x, y1: crop.y + Math.abs(crop.height) },
      { x1: crop.x, y1: crop.y + Math.abs(crop.height) },
    ];
  }
  return points;
};

//algorithm of calculating the dimention of scale image to show in canvas
export const getDimention = (canvasW, canvasH, imgW, imgH) => {
  var hRatio = canvasW / imgW;
  var vRatio = canvasH / imgH;
  var ratio = Math.min(hRatio, vRatio);
  var centerShift_x = (canvasW - imgW * ratio) / 2;
  var centerShift_y = (canvasH - imgH * ratio) / 2;
  return { centerShift_x, centerShift_y, w: imgW * ratio, h: imgH * ratio };
};

//algorithm of calculating the grid dimention
export const gridDimention = (imageWidth, imageHeight, width, height) => {
  const totalWidth = imageWidth;
  const totalHeight = imageHeight;

  const boxesCount = totalBoxCounts(width, height);

  const numHorizontalBoxes = boxesCount.boxCountX;
  const numVerticalBoxes = boxesCount.boxCountY;

  const widthOfEachBox = totalWidth / numHorizontalBoxes;
  const heightOfEachBox = totalHeight / numVerticalBoxes;

  const fractionalWidthPart = numHorizontalBoxes % 1;
  const integerWidthPart = Math.floor(numHorizontalBoxes);

  const widthColumnWidths = Array.from(
    { length: integerWidthPart },
    () => widthOfEachBox
  );
  if (fractionalWidthPart) {
    widthColumnWidths.push(widthOfEachBox * fractionalWidthPart);
  }

  const gridTemplateColumns = widthColumnWidths
    .map((width) => `${width}px`)
    .join(" ");

  const fractionalHeightPart = numVerticalBoxes % 1;
  const integerHeightPart = Math.floor(numVerticalBoxes);

  const heightRowHeights = Array.from(
    { length: integerHeightPart },
    () => heightOfEachBox
  );
  if (fractionalHeightPart) {
    heightRowHeights.push(heightOfEachBox * fractionalHeightPart);
  }

  const gridTemplateRows = heightRowHeights
    .map((height) => `${height}px`)
    .join(" ");

  return {
    gridTemplateColumns,
    gridTemplateRows,
    numHorizontalBoxes,
    numVerticalBoxes,
  };
};

export function hasNoFalsyValue(obj) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (!obj[key] && obj[key] !== false) {
      return false;
    }
  }
  return true;
}

//calculate area and weight
export const handleCalculate = async (
  token,
  id,
  calArr,
  form,
  cropImg,
  polygonArr,
  polygonsInd,
  insideCutImg,
  setCalculation,
  setCalArr,
  setPolygonArr,
  setPolygonInd,
  setNext
) => {
  const object = calculateChildArea(
    form,
    cropImg.width,
    cropImg.height,
    polygonArr[polygonsInd].points,
    insideCutImg.width,
    insideCutImg.height
  );
  setCalculation(object);
  setCalArr((prevCalArray) => {
    return prevCalArray.map((item) => {
      if (item.polygonsInd === polygonsInd) {
        return { ...item, calculation: object };
      }
      return item;
    });
  });
  setPolygonArr((prevArray) => {
    return prevArray.map((item) => {
      if (item.new) {
        return { ...item, new: false };
      }
      return item;
    });
  });
  setPolygonInd(polygonsInd + 1);
  if (!form.fabricator || form?.fabricator === "false") {
    // if (!form.fabricator || form?.fabricator === "false") {
    //   updateEstimationById(id, {test: ""})
    //   .then((res)=>{
    //     setNext(10);
    //   })
    //   .catch(err => toast(getErrors(err)))
    // }

    // try {
    //   const { image } = calArr.find(
    //     (item) => item?.polygonsInd === polygonsInd
    //   );
    //   const data = await downloadFileFromDrive(image.split("/")[5], token);
    //   const formData = new FormData();
    //   formData.append("estimation_id", id);
    //   formData.append("image", data?.fileData);
    //   formData.append("wear_plate_area", object?.size.toFixed(2));
    //   formData.append("wear_plate_weight", object?.weight.toFixed(2));
    //   formData.append("plate_price", object?.platePrice.toFixed(2));
    //   formData.append("fab_service", false);

    //   const res = await createEstimationFromById(formData);
    //   console.log(res?.data);
    //   setNext(10);
    // } catch (err) {
    //   toast.error(getErrors(err));
    // }
  } else {
    setNext(9);
  }
};

//calculate fabrication
export const calculateFabrication = (
  calculation,
  setCalculation,
  dropdowns,
  setCalArr,
  polygonsInd,
  setNext
) => {
  setCalculation((prev) => ({
    ...prev,
    perimeterWelding: dropdowns.perimeterWelding
      ? Number(calculation.weight) * 0.2
      : 0,
    stitchWelding: dropdowns.stitchWelding
      ? Number(calculation.weight) * 0.3
      : 0,
    fastening: Number(dropdowns.fastening) * 1.5,
    brakeBends: Number(dropdowns.brakeBends) * 0.6,
    rolledBends: Number(dropdowns.rolledBends) * 0.6,
    sunkBoltsHoles: Number(dropdowns.sunkBoltsHoles) * 0.35,
    totalPrice:
      Number(calculation.platePrice) +
      (dropdowns.perimeterWelding ? Number(calculation.weight) * 0.2 : 0) +
      (dropdowns.stitchWelding ? Number(calculation.weight) * 0.3 : 0) +
      Number(dropdowns.fastening) * 1.5 +
      Number(dropdowns.brakeBends) * 0.6 +
      Number(dropdowns.rolledBends) * 0.6 +
      Number(dropdowns.sunkBoltsHoles) * 0.35,
  }));
  setCalArr((prevCalArray) => {
    return prevCalArray.map((item) => {
      if (item.polygonsInd === polygonsInd - 1) {
        return {
          ...item,
          dropdowns,
          calculation: {
            ...item.calculation,
            perimeterWelding: dropdowns.perimeterWelding
              ? Number(calculation.weight) * 0.2
              : 0,
            stitchWelding: dropdowns.stitchWelding
              ? Number(calculation.weight) * 0.3
              : 0,
            fastening: Number(dropdowns.fastening) * 1.5,
            brakeBends: Number(dropdowns.brakeBends) * 0.6,
            rolledBends: Number(dropdowns.rolledBends) * 0.6,
            sunkBoltsHoles: Number(dropdowns.sunkBoltsHoles) * 0.35,
            totalPrice:
              Number(calculation.platePrice) +
              (dropdowns.perimeterWelding
                ? Number(calculation.weight) * 0.2
                : 0) +
              (dropdowns.stitchWelding ? Number(calculation.weight) * 0.3 : 0) +
              Number(dropdowns.fastening) * 1.5 +
              Number(dropdowns.brakeBends) * 0.6 +
              Number(dropdowns.rolledBends) * 0.6 +
              Number(dropdowns.sunkBoltsHoles) * 0.35,
          },
        };
      }
      return item;
    });
  });
  setNext(10);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getErrors = (err) => {
  if (err?.response?.data?.error) {
    return typeof err?.response?.data?.error === "string"
      ? err?.response?.data?.error
      : err?.response?.data?.error[0];
  } else {
    return "Something went wrong!";
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${months[monthIndex]},${year.toString().slice(-2)}`;

  return formattedDate;
};
