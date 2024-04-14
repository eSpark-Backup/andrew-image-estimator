import { getImgDim } from '../../algorithm';
import { uploadImg } from '../../assets';

export const ImageRenderer = ({
  form,
  imgRef,
  image,
  handleChange,
  setCanvasImage,
  setImagetoShow,
}) => {
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange('image', file);
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        setCanvasImage(img);
      };
      setImagetoShow(imageUrl);
    }
  };
  const { width, height } = getImgDim(
    { width: imgRef?.current?.width, height: imgRef?.current?.height },
    form
  );
  return (
    <>
      {image ? (
        <img style={{ width, height }} src={image} alt="canvas-image" />
      ) : (
        <div className="upload-container">
          <div className="upload-img">
            <img src={uploadImg} alt="upload" />
          </div>
          <div className="btn-center">
            <p className="upload-heading">Upload Image</p>
            <p className="upload-desc">
              Image should be with .img, .png, .jpeg & .jpg extension
            </p>
            <label htmlFor="imageInput" className="button btn-upload tour">
              Upload Image
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="hidden-input"
              />
              <div className="image-selector animation">
                Select your image from here
              </div>
            </label>
          </div>
        </div>
      )}
    </>
  );
};
