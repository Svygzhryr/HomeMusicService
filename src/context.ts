import { createContext, useContext } from 'react'
import { tracks } from './apiMock'
import { ITrackContext } from './types/types'

const context = createContext<ITrackContext>({
    tracks,
    addTrack: () => {},
    volume: 0.2,
    setVolume: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
})

export const TrackContext = context.Provider

export const useTrackContext = () => useContext(context)
