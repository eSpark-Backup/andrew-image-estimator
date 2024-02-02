import { useRef, useEffect } from 'react';
import { handleBoxSize } from '../../algorithm';

const Canvas = ({ form, img, points, setPoints, loading, cropImg, gridWidth }) => {
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
            drawGraph()
        }

        function drawGraph() {
            const { boxWidth, boxHeight } = handleBoxSize(gridWidth.width, gridWidth.height, form.width, form.length)
            context.globalAlpha = 1
            // Draw horizontal lines
            for (let y = 0; y <= canvas.height; y += boxHeight) {
                context.strokeStyle = '#fff';
                context.lineWidth = 1;
                context.globalAlpha = 0.3
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
                context.stroke();
            }

            // Draw vertical lines
            for (let x = 0; x <= canvas.width; x += boxWidth) {
                context.globalAlpha = 0.3
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, canvas.height);
                context.stroke();
            }
            context.globalAlpha = 1
        }

        const animate = () => {
            redrawCanvas();
            requestAnimationFrame(animate);
        };

        const handleMouseDown = (event) => {
            const x = event.clientX - canvas.offsetLeft;
            const y = event.clientY - canvas.offsetTop;
            if (points.length > 1) {
                const firstPoint = points[0];
                const distance = Math.sqrt((x - firstPoint.x) ** 2 + (y - firstPoint.y) ** 2);
                if (distance < 5) {
                    setPoints((prevDots) => [...prevDots, { x: firstPoint.x, y: firstPoint.y }]);
                    return;
                }
            }
            if (points.length > 1 && (points[0]?.x === points[points.length - 1]?.x && points[0]?.y === points[points.length - 1]?.y)) {
                setPoints((prevDots) => [...prevDots]);
            } else {
                setPoints((prevDots) => [...prevDots, { x, y }]);
            }
        };

        const redrawCanvas = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            drawGraph()

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






    return (
        <>
            {loading ?
                <>loading</> :
                <canvas
                    ref={canvasRef}
                    width={cropImg.width}
                    height={cropImg.height}
                    style={{ cursor: 'crosshair' }}
                ></canvas>}
        </>
    );
};

export default Canvas;
