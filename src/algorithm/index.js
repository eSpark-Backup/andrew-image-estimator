
//algorithm of calculating the selected size of metal and and it's weight
export const calculateSelectedArea = (form, width, height, points, setCalculation) => {
    let scale_factor_x = form.width / width;
    let scale_factor_y = form.length / height;

    let scaledPolygonVertices = points.map(vertex => ({
        x: vertex.x * scale_factor_x,
        y: vertex.y * scale_factor_y
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
            size: baseArea
        });
    }

}

//algorithm of calculating the selected size of metal and and it's weight according to parent's given dimention
export const calculateChildArea = (form, width, height, points, childWidth, childHeight) => {
    const childDimention = getChildDimention(form, width, height, childWidth, childHeight)
    let scale_factor_x = childDimention.width / childWidth;
    let scale_factor_y = childDimention.length / childHeight;

    let scaledPolygonVertices = points.map(vertex => ({
        x: vertex.x * scale_factor_x,
        y: vertex.y * scale_factor_y
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

    const platePrice = weightInPounds * 0.5

    if (!isNaN(weightInPounds) && !isNaN(baseArea)) {
        return {
            weight: weightInPounds,
            size: baseArea,
            platePrice
        }
    }

}

////algorithm of calculating the child dimention according to parent dimention
const getChildDimention = (form, parentWidth, parentHeight, childWidth, childHeight) => {
    const dpiWidth = parentWidth / form.width;
    const dpiHeight = parentHeight / form.length;
    const averageDPI = (dpiWidth + dpiHeight) / 2;

    // Calculate child dimensions in inches
    const childWidthInches = childWidth / averageDPI;
    const childHeightInches = childHeight / averageDPI;
    return { width: childWidthInches, length: childHeightInches }
}

//algorithm of calculating the box-size of grid 
export const handleBoxSize = (totalWidth, totalHeight, objectWidth, objectHeight) => {
    let boxWidth;
    let boxHeight;
    if (objectWidth <= 300) {
        boxWidth = totalWidth / (objectWidth * 0.5)
    } else if (objectWidth > 300 && objectWidth <= 600) {
        boxWidth = totalWidth / (objectWidth * 0.25)
    } else {
        boxWidth = totalWidth / (objectWidth * 0.1)
    }
    if (objectHeight <= 300) {
        boxHeight = totalHeight / (objectHeight * 0.5)
    } else if (objectHeight > 300 && objectHeight <= 600) {
        boxHeight = totalHeight / (objectHeight * 0.25)
    } else {
        boxHeight = totalHeight / (objectHeight * 0.1)
    }

    return { boxWidth, boxHeight }
}

//algorithm of calculating the box-count
export const totalBoxCounts = (objectWidth, objectHeight) => {
    let boxCountX;
    let boxCountY;
    if (objectWidth <= 300) {
        boxCountX = objectWidth * 0.5
    } else if (objectWidth > 300 && objectWidth <= 600) {
        boxCountX = objectWidth * 0.25
    } else {
        boxCountX = objectWidth * 0.1
    }
    if (objectHeight <= 300) {
        boxCountY = objectHeight * 0.5
    } else if (objectHeight > 300 && objectHeight <= 600) {
        boxCountY = objectHeight * 0.25
    } else {
        boxCountY = objectHeight * 0.1
    }
    return { boxCountX, boxCountY }
}

//algorithm of calculating the canvas points
export const getCanvasPoints = (crop) => {
    let points = [];
    if (crop.width < 0 && crop.height < 0) {
        points = [
            { 'x1': crop.x - Math.abs(crop.width), 'y1': crop.y - Math.abs(crop.height) },
            { 'x1': crop.x, 'y1': crop.y - Math.abs(crop.height) },
            { 'x1': crop.x, 'y1': crop.y },
            { 'x1': crop.x - Math.abs(crop.width), 'y1': crop.y },
        ]
    } else if (crop.width < 0) {
        points = [
            { 'x1': crop.x - Math.abs(crop.width), 'y1': crop.y },
            { 'x1': crop.x, 'y1': crop.y },
            { 'x1': crop.x, 'y1': crop.height + crop.y },
            { 'x1': crop.x - Math.abs(crop.width), 'y1': crop.height + crop.y },
        ]
    } else if (crop.height < 0) {
        points = [
            { 'x1': crop.x, 'y1': crop.y },
            { 'x1': crop.width + crop.x, 'y1': crop.y },
            { 'x1': crop.width + crop.x, 'y1': crop.height + crop.y },
            { 'x1': crop.x, 'y1': crop.height + crop.y },
        ]
    } else {
        points = [
            { 'x1': crop.x, 'y1': crop.y },
            { 'x1': crop.width + crop.x, 'y1': crop.y },
            { 'x1': crop.width + crop.x, 'y1': crop.y + Math.abs(crop.height) },
            { 'x1': crop.x, 'y1': crop.y + Math.abs(crop.height) },
        ]
    }
    return points
}

//algorithm of calculating the dimention of scale image to show in canvas
export const getDimention = (canvasW, canvasH, imgW, imgH) => {
    var hRatio = canvasW / imgW;
    var vRatio = canvasH / imgH;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvasW - imgW * ratio) / 2;
    var centerShift_y = (canvasH - imgH * ratio) / 2;
    return { centerShift_x, centerShift_y, w: imgW * ratio, h: imgH * ratio }
}

//algorithm of calculating the grid dimention
export const gridDimention = (imageWidth, imageHeight, width, height) => {
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

    return { gridTemplateColumns, gridTemplateRows, numHorizontalBoxes, numVerticalBoxes }
}