import { getImgDim } from '../../algorithm';
import { uploadImg } from '../../assets';
import { SelectInput } from '../inputs/select-input';

export const ImageRenderer = ({
  form,
  next,
  active,
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
        <>
          {next >= 1 && (
            <div
              className={`${active === 'select' || form.unit !== '' ? 'active-inputs' : ''
                } tool-inputs-container tour`}
            >
              <p style={{ color: '#fff' }}>Measuring Unit:</p>
              <SelectInput
                autoOpen
                className="tool-inputs "
                name="unit"
                disabled={active !== 'select'}
                value={form.unit}
                options={[
                  { label: 'cm', value: 'cm' },
                  { label: 'inch', value: 'inch' },
                  { label: 'm', value: 'm' },
                  { label: 'mm', value: 'mm' },
                  { label: 'ft', value: 'ft' },
                ]}
                placeholder="Select Unit"
                handleChange={handleChange}
                header={true}
              />
              {active === 'select' && (
                <div className="unit-selector animation">
                  You can select the unit for measurement
                </div>
              )}
            </div>
          )}

          <br />
          <img style={{ width, height }} src={image} alt="canvas-image" />
        </>
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
