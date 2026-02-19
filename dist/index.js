import ImageTracer from "imagetracerjs";
export async function convertPngToSvg(imageSrc, options = {}) {
    if (typeof document === "undefined") {
        throw new Error("convertImageToSvg works only in browser environment.");
    }
    const img = await loadImage(imageSrc);
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Canvas context not available");
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const defaultOptions = {
        numberofcolors: 256,
        colorquantcycles: 1,
        ltres: 0.005,
        qtres: 0.005,
        pathomit: 0,
        blurradius: 0.5,
        blurdelta: 0.5,
        strokewidth: 0.5,
        linefilter: false,
        scale: 1,
        roundcoords: -1,
        dither: true
    };
    const svgString = ImageTracer.imagedataToSVG(imageData, {
        ...defaultOptions,
        ...options
    });
    return svgString;
}
function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}
