import { createContext, useContext } from 'react'
import { tracks } from './apiMock'
import { ITrackContext } from './types/types'

const context = createContext<ITrackContext>({
    tracks,
    addTrack: () => {},
    volume: 0.2,
    setVolume: () => {},
    isGlobalPlaying: false,
    setIsGlobalPlaying: () => {},
    currentGlobalDuration: 0,
    setCurrentGlobalDuration: () => {},
    globalAudioRef: null,
    setGlobalAudioRef: () => {},
})

export const TrackContext = context.Provider

export const useTrackContext = () => useContext(context)
