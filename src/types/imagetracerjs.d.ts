declare module "imagetracerjs" {
  interface ImageTracerOptions {
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
  }

  const ImageTracer: {
    imagedataToSVG(
      imageData: ImageData,
      options?: ImageTracerOptions
    ): string;
  };

  export default ImageTracer;
}
