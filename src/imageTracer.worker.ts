import ImageTracer from "imagetracerjs";

self.onmessage = (e: MessageEvent) => {
  const { imageData, options } = e.data;

  try {
    const svg = ImageTracer.imagedataToSVG(imageData, options);
    self.postMessage({ success: true, svg });
  } catch (error) {
     self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};