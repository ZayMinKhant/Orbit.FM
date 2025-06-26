import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components (to be created)
import LoadingScreen from './components/common/LoadingScreen/LoadingScreen.tsx';
import UniverseView from './components/universe/UniverseView/UniverseView.tsx';
import PlanetInterface from './components/planets/PlanetInterface/PlanetInterface.tsx';

// Contexts
import { AudioProvider } from './contexts/AudioContext.tsx';
import { AppStateProvider } from './contexts/AppStateContext.tsx';

// Styles
import './App.css';
import './styles/globals.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('loading');

  useEffect(() => {
    // Simulate loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentView('universe'); // This state is for logic, not direct rendering.
    }, 8000); // 8 seconds for full loading sequence

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppStateProvider>
      <AudioProvider>
        <div className="App min-h-screen bg-space-dark overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading && (
              <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
            )}
            {!isLoading && (
              <Router>
                <Routes>
                  <Route path="/" element={<UniverseView />} />
                  <Route path="/planet/:planetId" element={<PlanetInterface />} />
                </Routes>
              </Router>
            )}
          </AnimatePresence>
        </div>
      </AudioProvider>
    </AppStateProvider>
  );
}

export default App;
