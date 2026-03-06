import ImageTracer from "imagetracerjs";

interface ConvertOptions {
  numberofcolors?: number;
  colorquantcycles?: number;
  ltres?: number;
  qtres?: number;
  pathomit?: number;
  blurradius?: number;
  blurdelta?: number;
  strokewidth?: number;
  linefilter?: boolean;
  scale?: number;
  roundcoords?: number;
  dither?: boolean;
  maxDimension?: number;
  useWorker?: boolean;

  /**
   * Optional custom worker factory
   * Useful for bundlers that need custom worker handling
   */
  workerFactory?: () => Worker;

  /**
   * Optional AbortSignal to cancel processing
   */
  signal?: AbortSignal;
}


export async function imageToSvg(
  imageSrc: string,
  options: ConvertOptions = {}
): Promise<string> {
  
   if (typeof document === "undefined") {
    throw new Error("imageToSvg works only in browser environment.");
  }

  if (options.signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }
  const finalOptions = { ...defaultOptions, ...options };

  const img = await loadImage(imageSrc);

  if (options.signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

 const { width, height } = getScaledDimensions(
    img.naturalWidth,
    img.naturalHeight,
    finalOptions.maxDimension
  );

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context not available");

  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);

  if (finalOptions.useWorker && typeof Worker !== "undefined") {
    try {
      return await runWorker(imageData, finalOptions);
    } catch {
      // Fallback safely if worker fails
      return ImageTracer.imagedataToSVG(imageData, finalOptions);
    }
  }

  return ImageTracer.imagedataToSVG(imageData, finalOptions);
}

function getScaledDimensions(
  width: number,
  height: number,
  maxDimension: number
) {
  const maxCurrent = Math.max(width, height);

  if (maxCurrent <= maxDimension) {
    return { width, height };
  }

  const scale = maxDimension / maxCurrent;

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function runWorker(
  imageData: ImageData,
  options: ConvertOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    let worker: Worker;

    try {
      worker = options.workerFactory
        ? options.workerFactory()
        : new Worker(
            new URL("./imageTracer.worker.ts", import.meta.url),
            { type: "module" }
          );
    } catch (err) {
      reject(err);
      return;
    }

    worker.onmessage = (e: MessageEvent) => {
      const { success, svg, error } = e.data;
      worker.terminate();

      if (success) {
        resolve(svg);
      } else {
        reject(new Error(error));
      }
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };

    // 🚀 Transfer buffer instead of cloning
    worker.postMessage(
      { imageData, options },
      [imageData.data.buffer]
    );
  });
}

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
    dither: true,
    maxDimension: 1200,
    useWorker: true,
  };