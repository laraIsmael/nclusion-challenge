import { useEffect, useRef } from "react";

const WIDTH = 600;
const HEIGHT = 600;
const MAX_ITER = 500;

function ComplexGridUpgrade() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("./mandelbrotWorker.js", import.meta.url)
    );

    worker.postMessage({
      width: WIDTH,
      height: HEIGHT,
      max: MAX_ITER,
    });

    worker.onmessage = (event) => {
      const buffer = event.data;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imgData = new ImageData(buffer, WIDTH, HEIGHT);

      ctx.putImageData(imgData, 0, 0);
    };
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
export default ComplexGridUpgrade;
