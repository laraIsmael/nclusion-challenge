self.onmessage = (event) => {
  const { width, height, max } = event.data;

  const buffer = new Uint8ClampedArray(width * height * 4);

  const escapeValue = (cx, cy) => {
    let zx = 0;
    let zy = 0;
    let iter = 0;
    while (iter < max && zx * zx + zy * zy <= 4) {
      const zx2 = zx * zx - zy * zy + cx;
      const zy2 = 2 * zx * zy + cy;

      zx = zx2;
      zy = zy2;

      iter++;
    }

    return iter;
  };
  const dx = 4 / width;
  const dy = 4 / height;
  let index = 0;

  for (let py = 0; py < height; py++) {
    const y = py * dy - 2;
    for (let px = 0; px < width; px++) {
      const x = px * dx - 2;

      const color = escapeValue(x, y);

      buffer[index] = color; // R
      buffer[index + 1] = color; // G
      buffer[index + 2] = color; // B
      buffer[index + 3] = 255; // A
      index += 4;
    }
  }

  self.postMessage(buffer, [buffer.buffer]);
};
