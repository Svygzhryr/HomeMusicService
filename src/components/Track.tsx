import { FC, useEffect, useRef, useState } from 'react'
import styles from '../styles/modules/track.module.scss'
import placeholder from '../assets/img/placeholder.png'
import play from '../assets/img/play.svg'
import stop from '../assets/img/stop.svg'
import { TrackProps } from '../types/types'
import { useTrackContext } from '../context'
import { Progressbar } from './Progressbar'

export const Track: FC<TrackProps> = ({ name, cover, file }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const { volume, setIsGlobalPlaying, setGlobalAudioRef } = useTrackContext()
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
        setIsGlobalPlaying(true)
        setGlobalAudioRef(audioRef)
        track.play()
    }

    function stopPlayback(track: HTMLAudioElement) {
        clearInterval(activeInterval)
        setIsPlaying(false)
        setIsGlobalPlaying(false)
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

    useEffect(() => {
        if (!audioRef.current) return
        if ((currentDuration / audioRef.current.duration) * 100 >= 100)
            onSongFinish()
    }, [currentDuration])

    useEffect(() => {
        if (!audioRef.current) return
        audioRef.current.volume = volume
    }, [audioRef, volume])

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
                <Progressbar
                    audioRef={audioRef}
                    currentDuration={currentDuration}
                    setCurrentDuration={setCurrentDuration}
                    isPlaying={isPlaying}
                />
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
