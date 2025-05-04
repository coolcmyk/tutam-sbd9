import { Suspense, lazy } from "react"

// Lazy load the Home component for better performance
const Home = lazy(() => import("./pages/Home"))

function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-sakura-400 text-xl animate-pulse">Loading...</div>}>
      <Home />
    </Suspense>
  )
}

export default App
