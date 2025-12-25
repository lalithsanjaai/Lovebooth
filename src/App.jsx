import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import LayoutSelection from './pages/LayoutSelection';
import CameraCapture from './pages/CameraCapture';
import Editor from './pages/Editor';
import Loader from './components/ui/Loader';

// Animated Routes Wrapper to handle location for AnimatePresence
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/layout" element={<LayoutSelection />} />
        <Route path="/camera" element={<CameraCapture />} />
        <Route path="/editor" element={<Editor />} />
        {/* /result route maps to Editor for now, or could be a separate page */}
        <Route path="/result" element={<Editor />} /> 
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time to show off the cute animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-vintage-cream">
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <Router>
            <AnimatedRoutes />
        </Router>
      )}
    </div>
  )
}

export default App
