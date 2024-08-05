import { createContext, useContext } from 'react'
import { tracks } from './apiMock'
import { ITrackContext } from './types/types'

const context = createContext<ITrackContext>({
    tracks,
    addTrack: () => {},
})

export const TrackContext = context.Provider

export const useTrackContext = () => useContext(context)
