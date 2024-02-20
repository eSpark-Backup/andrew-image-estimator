import { gridDimention } from "../../algorithm";

const Box = () => (
    <div style={{ border: '1px solid grey' }}></div>
);

const Grid = ({ imageWidth, imageHeight, width, height, children }) => {

    const { gridTemplateColumns, gridTemplateRows, numHorizontalBoxes, numVerticalBoxes } = gridDimention(imageWidth, imageHeight, width, height)

    return (
        <div style={{ position: "relative", display: 'grid', gridTemplateColumns, gridTemplateRows }}>
            {Array.from({ length: Math.ceil(numHorizontalBoxes) * Math.ceil(numVerticalBoxes) }, (_, index) => (
                <Box key={index} />
            ))}
            {children}
        </div>
    );
};

export default Grid;