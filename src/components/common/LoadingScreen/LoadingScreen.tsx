import React from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  return (
    <div className="fixed inset-0 bg-space-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="space-font text-4xl text-space-glow mb-8">
          Orbit Core
        </h1>
        <p className="text-white opacity-70">
          Initializing...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen; 