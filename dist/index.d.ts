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
}
export declare function convertPngToSvg(imageSrc: string, options?: ConvertOptions): Promise<string>;
export {};
