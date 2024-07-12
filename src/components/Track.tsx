import { FC, useEffect, useRef, useState } from 'react'
import styles from '../styles/modules/track.module.scss'
import { TrackProps } from '../types/types'

export const Track: FC<TrackProps> = ({ name, cover, file }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDuration, setCurrentDuration] = useState(0)

    function startPlayback(track: HTMLAudioElement) {
        setIsPlaying(true)
        track.play()
    }

    function stopPlayback(track: HTMLAudioElement, interval: NodeJS.Timeout) {
        clearInterval(interval)
        setIsPlaying(false)
        track.pause()
    }

    function handleClick() {
        const track = audioRef.current as HTMLAudioElement
        if (!track) return

        const interval = setInterval(() => {
            setCurrentDuration(audioRef.current?.currentTime || 0)
        }, 1000)

        track.paused ? startPlayback(track) : stopPlayback(track, interval)
    }

    useEffect(() => {
        console.log(currentDuration)
    }, [currentDuration])

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <audio ref={audioRef}>
                <source src={file} type="audio/mpeg" />
            </audio>
            <div className={styles.cover}>
                <div className={styles.mask}></div>
                <img src={cover} alt="" className={styles.cover} />
                <div className={styles.controls}>
                    <button
                        className={` ${isPlaying ? styles.play : styles.pause}`}
                    ></button>

                    <div
                        style={{
                            width: `${
                                (currentDuration / audioRef.current?.duration) *
                                100
                            }%`,
                        }}
                        className={styles.progressBar}
                    >
                        {audioRef.current?.duration}
                    </div>
                </div>
            </div>
        </div>
    )
}
