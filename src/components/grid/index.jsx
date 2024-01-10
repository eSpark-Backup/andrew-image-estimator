const Grid = ({ width, height, children }) => {
    const numXUnits = width;
    const numYUnits = height;

    const renderGrid = () => {
        const gridElements = [];

        for (let y = 0; y < numYUnits; y++) {
            for (let x = 0; x < numXUnits; x++) {
                gridElements.push(<div key={`${x}-${y}`} className="grid-cell" />);
            }
        }

        return gridElements;
    };

    return (
        <div style={{ margin: "20px 0px", position: "relative", display: "grid", gridTemplateColumns: `repeat(${width}, 1fr)`, gridTemplateRows: `repeat(${height}, 1fr)` }}>
            {renderGrid()}
            {children}
        </div>
    );
};

export default Grid;