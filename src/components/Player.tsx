import { MouseEvent, useEffect, useState } from 'react'
import styles from '../styles/modules/player.module.scss'
import { useTrackContext } from '../context'
import { Progressbar } from './Progressbar'

export const Player = () => {
    const [currentDuration, setCurrentDuration] = useState(0)
    const [activeInterval, setActiveInterval] = useState<
        NodeJS.Timeout | number
    >(0)

    const {
        setVolume,
        volume,
        isGlobalPlaying: isPlaying,
        globalAudioRef: audioRef,
    } = useTrackContext()

    function updatePlayer() {
        const interval = setInterval(() => {
            setCurrentDuration(audioRef.current?.currentTime || 0)
        }, 200)
        setActiveInterval(interval)
    }

    function handleVolumeClick(e: MouseEvent) {
        const { bottom } = e.currentTarget.getBoundingClientRect()
        const percent = (bottom - e.clientY) / 120 / 2
        setVolume(percent)
    }

    useEffect(() => {}, [audioRef])

    useEffect(() => {
        if (isPlaying) {
            updatePlayer()
        } else {
            clearInterval(activeInterval)
        }
    }, [isPlaying])

    return (
        <div className={styles.wrapper}>
            {/* <div
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                className={styles.status}
            ></div> */}
            <div className={styles.info}>
                <h3 className={styles.author}>Author here</h3>
                <h3 className={styles.title}>Somename here</h3>
            </div>
            <div className={styles.buttons}>
                <button className={styles.prev}></button>
                <button className={styles.pause}>||</button>
                <button className={styles.next}></button>
            </div>

            <Progressbar
                audioRef={audioRef}
                currentDuration={currentDuration}
                isPlaying={isPlaying}
                setCurrentDuration={setCurrentDuration}
                isInPlayer
            />

            <div onClick={handleVolumeClick} className={styles.volumeContainer}>
                <div
                    style={{
                        height: `${Math.round(volume * 100 * 2.4)}%`,
                        animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                    className={styles.volume}
                ></div>
            </div>
        </div>
    )
}
