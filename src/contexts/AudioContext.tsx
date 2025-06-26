import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  url: string;
}

interface Planet {
  id: string;
  name: string;
  description: string;
  color: string;
  position: { x: number; y: number; z: number };
  size: number;
  genre: string;
  tracks: Track[];
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentPlanet: Planet | null;
  playlist: Track[];
  playbackMode: 'normal' | 'blackhole';
}

type AudioAction = 
  | { type: 'PLAY_TRACK'; payload: Track }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_PLANET'; payload: Planet }
  | { type: 'SET_PLAYLIST'; payload: Track[] }
  | { type: 'SET_PLAYBACK_MODE'; payload: 'normal' | 'blackhole' };

interface AudioContextType {
  state: AudioState;
  dispatch: React.Dispatch<AudioAction>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const initialState: AudioState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentPlanet: null,
  playlist: [],
  playbackMode: 'normal'
};

function audioReducer(state: AudioState, action: AudioAction): AudioState {
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

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(audioReducer, initialState);

  return (
    <AudioContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};