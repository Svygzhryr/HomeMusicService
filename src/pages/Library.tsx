import { Track } from '../components/Track'
import { tracks } from '../apiMock'
import styles from '../styles/modules/library.module.scss'
import { TrackAdd } from '../components/TrackAdd'

export const Library = () => {
    return (
        <div>
            <div className={styles.tracksWrapper}>
                {tracks.map((track) => (
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
    )
}
