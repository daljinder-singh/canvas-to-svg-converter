# canvas-to-svg-converter

![npm version](https://img.shields.io/npm/v/canvas-to-svg-converter)
![license](https://img.shields.io/npm/l/canvas-to-svg-converter)
![downloads](https://img.shields.io/npm/dm/canvas-to-svg-converter)

Convert PNG, JPG, and JPEG images to SVG directly in the browser using ImageTracer.

---

## ✨ Features

- Convert PNG → SVG
- Convert JPG → SVG
- Convert JPEG → SVG
- Fully browser-based (no Node canvas dependency)
- TypeScript support
- Custom tracing options
- Lightweight and simple API

---

## 📦 Installation

```bash
npm install canvas-to-svg-converter
```

---

## 🚀 Basic Usage

```ts
import { convertImageToSvg } from "canvas-to-svg-converter";

const imageUrl = "https://example.com/image.png";

const svgString = await convertImageToSvg(imageUrl);

console.log(svgString);
```

---

## 🖼️ Using File Input (React Example)

```ts
import { convertImageToSvg } from "canvas-to-svg-converter";

const handleFile = async (file: File) => {
  const url = URL.createObjectURL(file);
  const svg = await convertImageToSvg(url);
  console.log(svg);
};
```

---

## ⚙️ Options

You can customize the SVG tracing behavior:

```ts
convertImageToSvg(imageUrl, {
  numberofcolors: 128,
  colorquantcycles: 1,
  ltres: 0.01,
  qtres: 0.01,
  pathomit: 0,
  blurradius: 0,
  blurdelta: 0,
  strokewidth: 0,
  linefilter: false,
  scale: 1,
  roundcoords: 1,
  dither: false
});
```

### Available Options

- `numberofcolors`
- `colorquantcycles`
- `ltres`
- `qtres`
- `pathomit`
- `blurradius`
- `blurdelta`
- `strokewidth`
- `linefilter`
- `scale`
- `roundcoords`
- `dither`

---

## 🌍 Environment

- Browser only
- Works with:
  - React
  - Vue
  - Angular
  - Next.js (client-side only)
  - Any frontend framework

⚠️ This package does NOT work in pure Node.js without a DOM environment.

---

## 📄 License

MIT
