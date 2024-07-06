import { FC, useEffect, useRef } from 'react'
import styles from '../styles/modules/track.module.scss'
import { TrackProps } from '../types/types'

export const Track: FC<TrackProps> = ({ name, cover, file }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    function handleClick() {
        const track = audioRef.current as HTMLAudioElement
        if (!track) return

        track.paused ? track.play() : track.pause()
    }

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <audio ref={audioRef}>
                <source src={file} type="audio/mpeg" />
            </audio>
            <div className={styles.cover}>
                <div className={styles.mask}></div>
                <img src={cover} alt="" className={styles.cover} />
                <div className={styles.controls}>
                    <button className={styles.pause}></button>
                    <div className={styles.progressBar}></div>
                </div>
            </div>
        </div>
    )
}
