import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface AppState {
  currentView: 'loading' | 'universe' | 'planet' | 'blackhole';
  isLoading: boolean;
  error: string | null;
}

type AppStateAction = 
  | { type: 'SET_VIEW'; payload: 'loading' | 'universe' | 'planet' | 'blackhole' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppStateAction>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const initialState: AppState = {
  currentView: 'loading',
  isLoading: true,
  error: null
};

function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextType => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};