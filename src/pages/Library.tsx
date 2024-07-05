import { Track } from '../components/Track'
import styles from '../styles/modules/library.module.scss'

export const Library = () => {
    return (
        <div>
            <div className={styles.tracksWrapper}>
                {/* data.map((track) => <Track/> ...) */}
                <Track />
                <Track />
                <Track />
                <Track />
            </div>
        </div>
    )
}
