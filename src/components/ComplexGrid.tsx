import { useEffect, useRef } from "react";
// import type { Complex } from "../utils/complex";
// import { iterate } from "../utils/iterate";

// // type Props = {
// //   width?: number; // grath x axis size
// //   height?: number; // grath y axis size
// //   maxIter?: number; // number of iteration before point escaped
// // };

// // const OldComplexGrid: React.FC<Props> = ({
// //   width = 500,
// //   height = 500,
// //   maxIter = 200,
// // }) => {
// //   // reference to the canvas DOM element
// //   const canvasRef = useRef<HTMLCanvasElement>(null);

// //   // after the component is rendered:
// //   useEffect(() => {
// //     // grab the canvas element
// //     // sanaty check canvas exist
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     // creating the canvas context in 2D
// //     // sanaty check context exisit
// //     const ctx = canvas.getContext("2d");
// //     if (!ctx) return;

// //     // creating the grid x(-2,2) y(-2,2)
// //     const xMin = -2; // left most
// //     const xMax = 2; // right most
// //     const yMin = -2; // bottom most
// //     const yMax = 2; // top most

// //     // empty grath of size width x height - to be filled with color later
// //     const imageData = ctx.createImageData(width, height);

// //     // map each pixel to complex plane
// //     for (let px = 0; px < width; px++) {
// //       for (let py = 0; py < height; py++) {
// //         const x = xMin + (px / width) * (xMax - xMin);
// //         const y = yMax - (py / height) * (yMax - yMin);

// //         // making every pixel inot a complex number
// //         const c: Complex = { re: x, im: y };

// //         // check: how many loops we go through to identify if the point escape or stayed bounded
// //         const iter = iterate(c, maxIter);

// //         // now converting iteration count into color - gray scale
// //         // escape early - dark color escaped
// //         // takes longer to escape - lighter color eventually escaped
// //         // never escapes - full white stayed bounded
// //         const color = Math.floor((iter / maxIter) * 255);

// //         // find the specific pixel location - the imageData is store in a very long 1dimentional array.
// //         // row * width: finds the start of the desired row
// //         // + column: gets to the specific column in said row
// //         // * 4: specific 4 bytes that makes the pixel
// //         const idx = (py * width + px) * 4;

// //         // adding color to each byte of the pixel by location
// //         imageData.data[idx] = color; //R
// //         imageData.data[idx + 1] = color; //G
// //         imageData.data[idx + 2] = color; //B
// //         imageData.data[idx + 3] = 255; //A
// //       }
// //     }

// //     // render the canvas with color collected on the iteration above
// //     ctx.putImageData(imageData, 0, 0);
// //   }, [width, height, maxIter]);

// //   return (
// //     <canvas
// //       ref={canvasRef}
// //       width={width}
// //       height={height}
// //       className="border border-teal-600"
// //     />
// //   );
// // };

// optimized code:

const WIDTH = 600;
const HEIGHT = 600;
const MAX_ITER = 500;

function OptimizedComplexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Iterate z(n+1) = z(n)^2 + c
  const isBounded = (cx: number, cy: number): boolean => {
    let zx = 0;
    let zy = 0;

    for (let i = 0; i < MAX_ITER; i++) {
      // square: (a + bi)^2 = (a^2 - b^2) + 2ab i
      const zx2 = zx * zx - zy * zy + cx;
      const zy2 = 2 * zx * zy + cy;

      zx = zx2;
      zy = zy2;

      // escape condition |z| > 2 → unbounded
      if (zx * zx + zy * zy > 4) return false;
    }

    return true; // bounded
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.createImageData(WIDTH, HEIGHT);
    const data = imgData.data;

    // Grid spans from -2 to 2 (both x and y)
    for (let px = 0; px < WIDTH; px++) {
      for (let py = 0; py < HEIGHT; py++) {
        const x = (px / WIDTH) * 4 - 2; // map pixel → real part
        const y = (py / HEIGHT) * 4 - 2; // map pixel → imaginary part

        const bounded = isBounded(x, y);

        const index = (py * WIDTH + px) * 4;

        // LIGHT color if bounded, DARK if not
        const color = bounded ? 210 : 20; // grayscale

        data[index] = color; // R
        data[index + 1] = color; // G
        data[index + 2] = color; // B
        data[index + 3] = 255; // A
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg--gray-500">
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="border border-gray-700"
      />
    </div>
  );
}

export default OptimizedComplexGrid;
