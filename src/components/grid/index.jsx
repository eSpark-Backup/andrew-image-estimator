import { totalBoxCounts } from "../../algorithm";

const Box = () => (
    <div style={{ border: '1px solid grey' }}></div>
);

const Grid = ({ imageWidth, imageHeight, width, height, children }) => {
    const totalWidth = imageWidth;
    const totalHeight = imageHeight;

    const boxesCount = totalBoxCounts(width, height)

    const numHorizontalBoxes = boxesCount.boxCountX;
    const numVerticalBoxes = boxesCount.boxCountY;

    const widthOfEachBox = totalWidth / numHorizontalBoxes;
    const heightOfEachBox = totalHeight / numVerticalBoxes;

    const fractionalWidthPart = numHorizontalBoxes % 1;
    const integerWidthPart = Math.floor(numHorizontalBoxes);

    const widthColumnWidths = Array.from({ length: integerWidthPart }, () => widthOfEachBox);
    if (fractionalWidthPart) {
        widthColumnWidths.push(widthOfEachBox * fractionalWidthPart);
    }

    const gridTemplateColumns = widthColumnWidths.map(width => `${width}px`).join(' ');

    const fractionalHeightPart = numVerticalBoxes % 1;
    const integerHeightPart = Math.floor(numVerticalBoxes);

    const heightRowHeights = Array.from({ length: integerHeightPart }, () => heightOfEachBox);
    if (fractionalHeightPart) {
        heightRowHeights.push(heightOfEachBox * fractionalHeightPart);
    }

    const gridTemplateRows = heightRowHeights.map(height => `${height}px`).join(' ');

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