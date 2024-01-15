
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
    console.log(form, parentWidth, parentHeight, childWidth, childHeight)
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