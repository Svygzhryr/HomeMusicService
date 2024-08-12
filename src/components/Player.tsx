import { MouseEvent } from 'react'
import styles from '../styles/modules/player.module.scss'
import { useTrackContext } from '../context'

export const Player = () => {
    const { setVolume, volume, isPlaying } = useTrackContext()

    function handleVolumeClick(e: MouseEvent) {
        const { bottom } = e.currentTarget.getBoundingClientRect()
        const percent = (bottom - e.clientY) / 120 / 2
        setVolume(percent)
    }

    return (
        <div className={styles.wrapper}>
            <div
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                className={styles.status}
            ></div>
            <div onClick={handleVolumeClick} className={styles.volumeContainer}>
                <div
                    style={{
                        height: `${Math.round(volume * 100 * 2)}%`,
                        animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                    className={styles.volume}
                ></div>
            </div>
        </div>
    )
}
