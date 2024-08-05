import { Track } from '../components/Track'
import styles from '../styles/modules/library.module.scss'
import { TrackAdd } from '../components/TrackAdd'
import { TrackContext, useTrackContext } from '../context'
import { useEffect, useState } from 'react'

export const Library = () => {
    const { tracks } = useTrackContext()
    const [trackList, setTrackList] = useState(tracks)

    useEffect(() => {
        console.log(trackList)
    }, [trackList])

    return (
        <TrackContext value={{ tracks: trackList, addTrack: setTrackList }}>
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
            </div>
        </TrackContext>
    )
}
