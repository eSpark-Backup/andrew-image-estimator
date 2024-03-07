import { getCanvasPoints, getDimention } from "../algorithm";
import http from "../http";

export const handleCropApi = (crop, imgRef, form) => {
  const { centerShift_x, centerShift_y, w, h } = getDimention(
    form.imageWidth,
    form.imageHeight,
    imgRef?.current?.width,
    imgRef?.current?.height
  );
  const tempCrop = {
    x: crop.x - centerShift_x,
    y: crop.y - centerShift_y,
    width: crop.width,
    height: crop.height,
  };
  const formData = new FormData();
  formData.append("image", form.image);
  const jsonString = JSON.stringify(getCanvasPoints(tempCrop));
  formData.append("contour_data", jsonString);
  formData.append("image_height", Math.abs(h));
  formData.append("image_width", Math.abs(w));
  formData.append("file_name", "crop.png");
  return new Promise((resolve, reject) => {
    http(`/api/img_upload/`, "post", formData, null)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const handleCutoutApi = async (points, croppedImage, cropImg, name) => {
    const formData = new FormData();
    formData.append(
      "image",
      await fetch(croppedImage).then((res) => res.blob()),
      "image.png"
    );
    const newArr = points.map((item) => ({
      x1: item.x,
      y1: item.y,
    }));
    const jsonString = JSON.stringify(newArr);
    formData.append("contour_data", jsonString);
    formData.append("image_height", cropImg.height);
    formData.append("image_width", cropImg.width);
    formData.append("file_name", name);
    return new Promise((resolve, reject) => {
      http(`/api/img_upload/`, "post", formData, null)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
