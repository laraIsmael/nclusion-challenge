import { useEffect, useRef } from "react";

// canvas resolution and iterations
// 360,000 pixels && 180 million loops
const WIDTH = 600;
const HEIGHT = 600;
const MAX_ITER = 500;

export default function ComplexGridUpgrade() {
  // ref to the canvas DOM node to draw imperatively
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // to enable smooth coloring replace boolean return to iteration value.
  // count of how fast the point diverges for a gradiate visual
  const escapeIter = (cx: number, cy: number): number => {
    let zx = 0;
    let zy = 0;
    let iter = 0;

    while (iter < MAX_ITER && zx * zx + zy * zy <= 4) {
      const xx = zx * zx;
      const yy = zy * zy;

      zy = 2 * zx * zy + cy;
      zx = xx - yy + cx;
      iter++;
    }
    return iter;
  };

  // useEffect to only render once on mount
  useEffect(() => {
    // get a reference to the canvas in the DOM
    const canvas = canvasRef.current;
    // check that react finished mounting befor "drawing" in the canvas
    if (!canvas) return;

    // ctx is the drawing API - sanaty check that it exisits
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // create an empty pixel buffer object contsiner
    const imgData = ctx.createImageData(WIDTH, HEIGHT);

    // access the pixel buffer
    const data = imgData.data;

    // precompute sizes to avoid repetition in loop
    const dx = 4 / WIDTH;
    const dy = 4 / HEIGHT;

    for (let px = 0; px < WIDTH; px++) {
      const cx = -2 + px * dx;
      for (let py = 0; py < HEIGHT; py++) {
        const cy = -2 + py * dy;

        // inital RGBA value for each pixel
        const index = (py * WIDTH + px) * 4;

        const color = escapeIter(cx, cy);

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
