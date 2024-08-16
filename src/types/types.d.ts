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
    volume: number
    setVolume: (volume: number) => void
    isGlobalPlaying: boolean
    setIsGlobalPlaying: (isPlaying: boolean) => void
    currentGlobalDuration: number
    setCurrentGlobalDuration: (currentGlobalDuration: number) => void
    globalAudioRef: MutableRefObject<HTMLAudioElement | null>
    setGlobalAudioRef: (
        globalAudioRef: MutableRefObject<HTMLAudioElement | null>
    ) => void
}

export interface ITracks {
    name: string
    author?: string
    file: string
    cover: string
}
