export interface TrackProps {
    name: string
    file: string
    cover: string
}

interface TrackContextReturn {
    tracks: ITracks[]
}
export interface ITrackContext {
    tracks: ITracks[]
    addTrack: (tracks: ITracks[]) => void
}

export interface ITracks {
    name: string
    author?: string
    file: string
    cover: string
}
