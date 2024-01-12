
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

    setCalculation({
        weight: weightInKgs,
        size: baseArea
    });
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