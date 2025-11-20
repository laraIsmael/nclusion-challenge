# Nclusion Take-Home Challenge

This project renders a 2D visualization of the iterative function:

\[z\_{n+1} = z_n^2 + c, \quad z_0 = 0\]

where **c** is the complex number represented by each pixel in the grid.

---

## 🚀 Features

- Complex plane spanning **(-2, -2)** to **(2, 2)**
- Resolution: **600 × 600** (360,000 points)
- Light color → **bounded**  
  Dark color → **escaped**
- Implemented in **React + TypeScript + Canvas + Tailwind**
- Direct pixel manipulation via **ImageData**
- Pure mathematical iteration (no libraries)

---

## 🧮 How It Works

Each pixel `(x, y)` maps to a complex value: **c = x + yi**

We iterate: **z = z^2 + c**

A point is considered **unbounded** if: **|z|^2 > 4 (escape radius = 2)**

The color is a grayscale mapping of how quickly the point escapes.

---

## 📈 Possible Optimizations (not fully completed due to the 4-hour limit)

1. Inline math to avoid object allocations
2. Replace `Math.sqrt` with squared-magnitude checks
3. Precompute step sizes before loops
4. Move heavy iteration to a Web Worker (best upgrade)

---

## 📁 File Structure

src/
├─ components/
│ └─ ComplexGrid.tsx
├─ utils/
│ ├─ iterate.ts
│ └─ complex.ts (unused after optimization)
└─ App.tsx
