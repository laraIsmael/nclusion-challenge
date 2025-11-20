import ComplexGrid from "./components/ComplexGrid";

function App() {
  const size = 600;
  const maxIter = 500;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className=" py-10 text-3xl font-bold text-teal-700">
        Nclusion-challenge
      </h1>
      <ComplexGrid width={size} height={size} maxIter={maxIter} />
      <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg shadow-md text-sm text-teal-800">
        <p className="font-semibold mb-1">Visualization Specifications:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Grid Range: (-2, -2) to (2, 2) in the complex plane.</li>
          <li>
            Resolution: {size}x{size} (360,000 squares).
          </li>
          <li>
            Coloring: <span className="text-teal-900 font-bold">Light</span> for
            Bounded, <span className="text-teal-900 font-bold">Dark</span> for
            Unbounded.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
