import { useRef, useEffect } from 'react';

const Canvas = ({ form, img, handleRemoveImage, handleChange, points, setPoints, setCanvasImage, setCroppedImage }) => {
    const canvasRef = useRef(null);


    useEffect(() => {
        if (!img) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = img;

        image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            redrawCanvas();
            requestAnimationFrame(animate);
        };

        const handleMouseDown = (event) => {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;
            if (points.length > 1 && (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y)) {
                setPoints((prevDots) => [...prevDots]);
            } else {
                setPoints((prevDots) => [...prevDots, { x, y }]);
            }
        };

        const redrawCanvas = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            if (points.length > 1) {
                context.beginPath();
                context.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length; i++) {
                    context.lineTo(points[i].x, points[i].y);
                }

                if (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y) {
                    context.strokeStyle = "#FF0000";
                    context.lineWidth = 5;
                    context.stroke();
                } else {
                    context.strokeStyle = "#FFF";
                    context.lineWidth = 3;
                    context.stroke();
                }
            }

            context.fillStyle = "#FFF";
            for (let i = 0; i < points.length; i++) {
                context.beginPath();
                context.arc(points[i].x, points[i].y, 5, 0, 2 * Math.PI);
                context.fill();
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        animate();

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
        };
    }, [points, img]);

    const handleAddImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleChange("image", file);
            const imageUrl = URL.createObjectURL(file);
            setCanvasImage(imageUrl);
        }
    }

    const removeImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        handleRemoveImage()
        setPoints([])
    }

    const handleReset = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height)
        setPoints([])
    }

    const handleRevert = () => {
        points.pop()
        setPoints(points)
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
                handleRevert()
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [points]);


    const cropImage = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (points.length > 1) {
            const path = new Path2D();
            path.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                path.lineTo(points[i].x, points[i].y);
            }

            const image = new Image();
            image.src = img;

            image.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(image, 0, 0, canvas.width, canvas.height);

                context.globalCompositeOperation = 'destination-in';
                context.fill(path);

                context.globalCompositeOperation = 'source-over'; // Reset the composite operation

                const croppedImageDataUrl = canvas.toDataURL("image/png");
                setCroppedImage(croppedImageDataUrl);
            };
        }
    };

    return (
        <>
            <div className="button-container">
                <button onClick={handleRevert}>Revert</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={cropImage}>Crop image</button>
                <button disabled={!img} onClick={removeImage}>Remove Image</button>
            </div>
            <div className='card'>
                {img ?
                    <canvas
                        ref={canvasRef}
                        width={form.imageWidth}
                        height={form.imageHeight}
                        style={{ cursor: 'crosshair' }}
                    ></canvas>
                    :
                    <label htmlFor="imageInput" className="button">
                        Add Image
                        <input
                            id="imageInput"
                            type="file"
                            accept="image/*"
                            onChange={handleAddImage}
                            className="hidden-input"
                        />
                    </label>}
            </div>
        </>
    );
};

export default Canvas;
