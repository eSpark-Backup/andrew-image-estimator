
const Box = ({ width, height }) => (
    <div style={{ width: `${width}px`, height: `${height}px`, border: '1px solid black' }}></div>
);

const Grid = ({ imageWidth, imageHeight, width, height, children }) => {
    const totalWidth = imageWidth;
    const totalHeight = imageHeight;

    const numHorizontalBoxes = width;
    const numVerticalBoxes = height;

    const widthOfEachBox = totalWidth / numHorizontalBoxes;
    const heightOfEachBox = totalHeight / numVerticalBoxes;

    return (
        <div style={{ position: "relative", display: 'grid', gridTemplateColumns: `repeat(${numHorizontalBoxes}, 1fr)` }}>
            {Array.from({ length: numHorizontalBoxes * numVerticalBoxes }, (_, index) => (
                <Box key={index} width={widthOfEachBox} height={heightOfEachBox} />
            ))}
            {children}
        </div>
    );
};

export default Grid;