import { useEffect, useRef } from "react";

const WIDTH = 600;
const HEIGHT = 600;
const MAX_ITER = 500;

function ComplexGrid() {
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

export default ComplexGrid;
