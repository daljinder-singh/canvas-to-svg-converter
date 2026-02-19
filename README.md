# image-to-svg


![npm version](https://img.shields.io/npm/v/image-to-svg
)
![license](https://img.shields.io/npm/l/image-to-svg
)
![downloads](https://img.shields.io/npm/dm/image-to-svg
)

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
npm install image-to-svg

```

---

## 🚀 Basic Usage

```ts
import { imageToSvg } from "image-to-svg";

const imageUrl = "https://example.com/image.png";

const svgString = await imageToSvg(imageUrl);

console.log(svgString);
```

---

## 🖼️ Using File Input (React Example)

```ts
import { imageToSvg } from "image-to-svg";

const handleFile = async (file: File) => {
  const url = URL.createObjectURL(file);
  const svg = await imageToSvg(url);
  console.log(svg);
};
```

---

## ⚙️ Options

You can customize the SVG tracing behavior:

```ts
imageToSvg(imageUrl, {
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
