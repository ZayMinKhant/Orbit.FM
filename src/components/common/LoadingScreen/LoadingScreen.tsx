import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showTapToContinue, setShowTapToContinue] = useState(false);

  const loadingMessages = [
    "Initializing quantum music engine...",
    "Mapping stellar coordinates...", 
    "Calibrating harmonic frequencies...",
    "Loading planetary soundscapes...",
    "Establishing orbital trajectories...",
    "Synchronizing cosmic rhythms...",
    "Ready to explore the universe..."
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(messageInterval);
          setTimeout(() => setShowTapToContinue(true), 1000);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(messageInterval);
  }, []);

  const handleContinue = () => {
    onComplete();
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-space-dark via-space-medium to-space-dark flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl px-8">
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="space-font text-6xl md:text-8xl text-space-glow mb-4 drop-shadow-lg">
            ORBIT FM
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-space-glow to-transparent mx-auto"/>
        </motion.div>

        {/* Loading messages */}
        <div className="h-20 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              className="text-white text-xl font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {loadingMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Loading progress */}
        <div className="w-full max-w-md mx-auto mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-space-glow to-blue-400"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentMessage + 1) / loadingMessages.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-white/60 text-sm mt-2">
            <span>Loading...</span>
            <span>{Math.round(((currentMessage + 1) / loadingMessages.length) * 100)}%</span>
          </div>
        </div>

        {/* Tap to continue */}
        <AnimatePresence>
          {showTapToContinue && (
            <motion.button
              onClick={handleContinue}
              className="px-8 py-4 bg-gradient-to-r from-space-glow/20 to-blue-500/20 border border-space-glow/50 text-space-glow rounded-full font-medium text-lg hover:from-space-glow/30 hover:to-blue-500/30 transition-all duration-300 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ Enter the Universe ✨
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Orbital rings animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-white/10 rounded-full"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;