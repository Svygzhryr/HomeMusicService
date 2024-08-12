import { Track } from '../components/Track'
import styles from '../styles/modules/library.module.scss'
import { TrackAdd } from '../components/TrackAdd'
import { TrackContext, useTrackContext } from '../context'
import { useState } from 'react'
import { Player } from '../components/Player'

export const Library = () => {
    const { tracks } = useTrackContext()
    const [trackList, setTrackList] = useState(tracks)
    const [volume, setVolume] = useState(0.2)
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <TrackContext
            value={{
                tracks: trackList,
                addTrack: setTrackList,
                volume,
                setVolume,
                isPlaying,
                setIsPlaying,
            }}
        >
            <div>
                <div className={styles.tracksWrapper}>
                    {trackList.map((track) => (
                        <Track
                            key={track.name}
                            name={track.name}
                            cover={track.cover}
                            file={track.file}
                        />
                    ))}
                    <TrackAdd />
                </div>
                <Player />
            </div>
        </TrackContext>
    )
}
