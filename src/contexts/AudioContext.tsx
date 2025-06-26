import React, { createContext, useContext, useReducer } from 'react';

const AudioContext = createContext();

const initialState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentPlanet: null,
  playlist: [],
  playbackMode: 'normal' // 'normal' or 'blackhole'
};

function audioReducer(state, action) {
  switch (action.type) {
    case 'PLAY_TRACK':
      return { ...state, currentTrack: action.payload, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'RESUME':
      return { ...state, isPlaying: true };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload };
    case 'SET_PLANET':
      return { ...state, currentPlanet: action.payload };
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload };
    case 'SET_PLAYBACK_MODE':
      return { ...state, playbackMode: action.payload };
    default:
      return state;
  }
}

export const AudioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}; 