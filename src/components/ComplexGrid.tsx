import React, { useEffect, useRef } from "react";
import type { Complex } from "../utils/complex";
import { iterate } from "../utils/iterate";

type Props = {
  width?: number; // grath x axis size
  height?: number; // grath y axis size
  maxIter?: number; // number of iteration before point escaped
};

const ComplexGrid: React.FC<Props> = ({
  width = 500,
  height = 500,
  maxIter = 200,
}) => {
  // reference to the canvas DOM element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // after the component is rendered:
  useEffect(() => {
    // grab the canvas element
    // sanaty check canvas exist
    const canvas = canvasRef.current;
    if (!canvas) return;

    // creating the canvas context in 2D
    // sanaty check context exisit
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // creating the grid x(-2,2) y(-2,2)
    const xMin = -2; // left most
    const xMax = 2; // right most
    const yMin = -2; // bottom most
    const yMax = 2; // top most

    // empty grath of size width x height - to be filled with color later
    const imageData = ctx.createImageData(width, height);

    // map each pixel to complex plane
    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        //x and y will together represent each pixel location on the grid
        const x = xMin + (px / width) * (xMax - xMin); // each column: pixel 0 to 500 && x from -2 to 2
        const y = yMin + (py / height) * (yMax - yMin); // each row : pixel 0 to 500 && y from -2 to 2

        // making every pixel inot a complex number
        const c: Complex = { re: x, im: y };

        // check: how many loops we go through to identify if the point escape or stayed bounded
        const iter = iterate(c, maxIter);

        // now converting iteration count into color - gray scale
        // escape early - dark color escaped
        // takes longer to escape - lighter color eventually escaped
        // never escapes - full white stayed bounded
        const color = Math.floor((iter / maxIter) * 255);

        // find the specific pixel location - the imageData is store in a very long 1dimentional array.
        // row * width: finds the start of the desired row
        // + column: gets to the specific column in said row
        // * 4: specific 4 bytes that makes the pixel
        const idx = (py * width + px) * 4;

        // adding color to each byte of the pixel by location
        imageData.data[idx] = color; //R
        imageData.data[idx + 1] = color; //G
        imageData.data[idx + 2] = color; //B
        imageData.data[idx + 3] = color; //A
      }
    }

    // render the canvas with color collected on the iteration above
    ctx.putImageData(imageData, 0, 0);
  }, [width, height, maxIter]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-teal-600"
    />
  );
};

export default ComplexGrid;
