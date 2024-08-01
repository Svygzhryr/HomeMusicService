import { FC, useEffect, useRef, useState } from 'react'
import styles from '../styles/modules/track.module.scss'
import placeholder from '../assets/img/placeholder.png'
import play from '../assets/img/play.svg'
import stop from '../assets/img/stop.svg'
import { TrackProps } from '../types/types'

export const Track: FC<TrackProps> = ({ name, cover, file }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [activeInterval, setActiveInterval] = useState<
        NodeJS.Timeout | number
    >(0)

    function startPlayback(track: HTMLAudioElement) {
        const interval = setInterval(() => {
            setCurrentDuration(audioRef.current?.currentTime || 0)
        }, 200)
        setActiveInterval(interval)
        setIsPlaying(true)
        track.play()
    }

    function stopPlayback(track: HTMLAudioElement) {
        clearInterval(activeInterval)
        setIsPlaying(false)
        track.pause()
    }

    function handleClick() {
        const track = audioRef.current as HTMLAudioElement
        if (!track) return

        track.paused ? startPlayback(track) : stopPlayback(track)
    }

    function formCurrentTime(currentDuration: number) {
        const minutes = Math.floor(currentDuration / 60)
        const seconds = Math.floor(currentDuration % 60)

        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    function onSongFinish() {
        setIsPlaying(false)
        clearInterval(activeInterval)
        startPlayback(audioRef.current as HTMLAudioElement)
    }

    function calculateSongProgress() {
        if (!audioRef.current) return
        return Math.floor((currentDuration / audioRef.current.duration) * 100)
    }

    useEffect(() => {
        if (!audioRef.current) return
        if ((currentDuration / audioRef.current.duration) * 100 >= 100)
            onSongFinish()
    }, [currentDuration])

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = 0.1
    }, [audioRef])

    return (
        <div className={styles.wrapper} onClick={handleClick}>
            <audio ref={audioRef}>
                <source src={file} type="audio/mpeg" />
            </audio>
            <div className={styles.cover}>
                <div className={styles.mask}></div>
                <h3 className={styles.title}>{name}</h3>
                <img
                    src={cover || placeholder}
                    alt=""
                    className={styles.cover}
                />
            </div>
            <div className={styles.controls}>
                <div
                    style={{
                        width: `${calculateSongProgress()}%`,
                    }}
                    className={`${styles.progressBar} ${isPlaying ? styles.isPlaying : ''}`}
                ></div>
                <img
                    className={`${styles.playButton} ${isPlaying ? styles.currentlyPlaying : ''}`}
                    src={play}
                    alt="play"
                />
                <img
                    className={`${styles.playButton} ${isPlaying ? '' : styles.invisible}`}
                    src={stop}
                    alt="stop"
                />

                <h5 className={styles.time}>
                    {formCurrentTime(currentDuration)}
                </h5>
            </div>
        </div>
    )
}
