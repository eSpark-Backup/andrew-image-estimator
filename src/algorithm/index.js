
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

export const calculateChildArea = (form, width, height, points, setCalculation, childWidth, childHeight) => {
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

    if (!isNaN(weightInKgs) && !isNaN(baseArea)) {
        setCalculation({
            weight: weightInKgs,
            size: baseArea
        });
    }

}

const getChildDimention = (form, parentWidth, parentHeight, childWidth, childHeight) => {
    const dpiWidth = parentWidth / form.width;
    const dpiHeight = parentHeight / form.length;
    const averageDPI = (dpiWidth + dpiHeight) / 2;

    // Calculate child dimensions in inches
    const childWidthInches = childWidth / averageDPI;
    const childHeightInches = childHeight / averageDPI;
    return { width: childWidthInches, length: childHeightInches }
}


export const areAllFieldsValid = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (Object.hasOwnProperty.call(obj, key)) {
            if (value === null || (typeof value === 'string' && value.trim() === '')) {
                return false;
            }
        }
    }

    return true;
}

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

export const getDimention = (canvasW, canvasH, imgW, imgH) => {
    var hRatio = canvasW / imgW;
    var vRatio = canvasH / imgH;
    var ratio = Math.min(hRatio, vRatio);
    var centerShift_x = (canvasW - imgW * ratio) / 2;
    var centerShift_y = (canvasH - imgH * ratio) / 2;
    return { centerShift_x, centerShift_y, w: imgW * ratio, h: imgH * ratio }
}