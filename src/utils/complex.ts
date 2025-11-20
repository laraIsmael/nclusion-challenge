//helper functions for complex number

// type for complex number: c = (x + yi)
export type Complex = {
  re: number; // real x number
  im: number; // imaginary y number
};

// helper function to calculate square of complex number, formula:(a + bi)² = (a² − b²) + (2ab)i
export function square(z: Complex): Complex {
  const { re: a, im: b } = z;
  return {
    re: a * a - b * b,
    im: 2 * a * b,
  };
}

// helper function to add 2 complex numbers, formula: (a + bi) + (x + yi) = (a + x) + (b + y)i
export function add(z1: Complex, z2: Complex): Complex {
  return {
    re: z1.re + z2.re,
    im: z1.im + z2.im,
  };
}

// helper function to calculate magnitude (distance firm the origin), formula: |z| = sqrt(a^2 + b^2);
export function magnitude(z: Complex): number {
  return Math.sqrt(z.re * z.re + z.im * z.im);
}
