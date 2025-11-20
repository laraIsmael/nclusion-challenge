// Determine whether the sequence zₙ₊₁ = zₙ² + c stays bounded or escapes.

/*
 check if the point(pixel) is inbounds of the graph
  paramethers:
    c: complex number for this specific grid point
    maxIter: max number of itarations: 200 it is not small enough(10-50) that it would escape to fast or (1000+) that would slow the program with to many iterations for each pixel
    scapeRadius: is |z| going to get out of bounds - math poven property - Mandelbrot set aet it to 2

  return value:
    number of iteration before escape
    or
    maxIter - if it never scape (means |z| stays inbounds)
*/

import { type Complex, square, add, magnitude } from "./complex";

export function iterate(c: Complex, maxIter = 200, escapeRadius = 2): number {
  //initialize z0
  let z: Complex = { re: 0, im: 0 }; // starter z0 = 0

  // find z - loop maxIter times calling the given formula
  for (let i = 0; i < maxIter; i++) {
    // z = z^2 + c
    z = add(square(z), c);

    // check if z is going outbounds - return the max index before escaping
    if (magnitude(z) > escapeRadius) {
      return i;
    }
  }

  // if z stays inbound return the max we tested for.
  return maxIter;
}
