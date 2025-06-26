import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { planetsData } from '../../../data/planets';
import { useAudio } from '../../../contexts/AudioContext';

const PlanetInterface: React.FC = () => {
  const { planetId } = useParams<{ planetId: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAudio();
  const [planet, setPlanet] = useState<any>(null);

  useEffect(() => {
    if (planetId) {
      const foundPlanet = Object.values(planetsData).find((p: any) => p.id === planetId);
      setPlanet(foundPlanet);
      if (foundPlanet) {
        dispatch({ type: 'SET_PLANET', payload: foundPlanet });
      }
    }
  }, [planetId, dispatch]);

  const handleBackToUniverse = () => {
    dispatch({ type: 'PAUSE' });
    navigate('/');
  };

  const mockTracks = [
    {
      id: 1,
      title: `${planet?.name} Ambient`,
      artist: 'Cosmic Composer',
      duration: 245,
      url: `/sounds/${planet?.id}/track1.mp3`
    },
    {
      id: 2,
      title: `Deep ${planet?.name}`,
      artist: 'Space Orchestra',
      duration: 312,
      url: `/sounds/${planet?.id}/track2.mp3`
    },
    {
      id: 3,
      title: `${planet?.name} Dreams`,
      artist: 'Stellar Musician',
      duration: 198,
      url: `/sounds/${planet?.id}/track3.mp3`
    }
  ];

  const handleTrackPlay = (track: any) => {
    dispatch({ type: 'PLAY_TRACK', payload: track });
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!planet) {
    return (
      <div className="w-full h-screen bg-space-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading planet...</div>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full h-screen bg-gradient-to-br from-space-dark to-space-medium relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background overlay with planet theme */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${planet.color}40 0%, transparent 50%)`
        }}
      />
      
      {/* Header */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={handleBackToUniverse}
          className="mb-4 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm"
        >
          ← Back to Universe
        </button>
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="space-font text-5xl text-white mb-2" style={{ color: planet.color }}>
            {planet.name}
          </h1>
          <p className="text-white/80 text-lg max-w-md">
            {planet.description}
          </p>
          <p className="text-white/60 text-sm mt-2">
            Genre: {planet.genre}
          </p>
        </motion.div>
      </div>

      {/* Music Player Interface */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-black/70 backdrop-blur-lg p-6">
          {/* Currently Playing */}
          {state.currentTrack && (
            <div className="mb-6 flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: planet.color }}
              >
                🎵
              </div>
              <div className="flex-1">
                <h3 className="text-white text-lg font-medium">
                  {state.currentTrack.title}
                </h3>
                <p className="text-white/60">
                  {state.currentTrack.artist}
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: state.isPlaying ? 'PAUSE' : 'RESUME' })}
                className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                {state.isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </button>
            </div>
          )}

          {/* Track List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTracks.map((track, index) => (
              <motion.div
                key={track.id}
                className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-sm"
                onClick={() => handleTrackPlay(track)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">
                    {track.title}
                  </h4>
                  <span className="text-white/60 text-xs">
                    {formatDuration(track.duration)}
                  </span>
                </div>
                <p className="text-white/60 text-xs">
                  {track.artist}
                </p>
                <div className="mt-3">
                  <div 
                    className="h-1 rounded-full opacity-30"
                    style={{ backgroundColor: planet.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="mt-6 border-t border-white/20 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">
                  Add Your Own Music
                </h3>
                <p className="text-white/60 text-sm">
                  Upload MP3, WAV, or M4A files to create your custom planet experience
                </p>
              </div>
              <button className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                📁 Upload Files
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Planet Visualization */}
      <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
        <motion.div
          className="w-32 h-32 rounded-full shadow-2xl"
          style={{ 
            backgroundColor: planet.color,
            boxShadow: `0 0 60px ${planet.color}60`
          }}
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
    </motion.div>
  );
};

export default PlanetInterface;