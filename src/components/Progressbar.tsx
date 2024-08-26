import React, { FC, MouseEvent } from 'react'
import styles from '../styles/modules/progressbar.module.scss'

interface ProgressbarProps {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
    currentDuration: number
    setCurrentDuration: (currentGlobalDuration: number) => void
    isPlaying: boolean
    isInPlayer?: boolean
}

export const Progressbar: FC<ProgressbarProps> = ({
    audioRef,
    currentDuration,
    setCurrentDuration,
    isPlaying,
    isInPlayer,
}) => {
    function calculateSongProgress() {
        if (!audioRef?.current) return
        return (currentDuration / audioRef.current.duration) * 100 || 0
    }

    function handleProgressClick(e: MouseEvent) {
        if (!audioRef?.current) return
        e.stopPropagation()
        const { width, left } = e.currentTarget.getBoundingClientRect()
        const x = e.pageX - left
        const barPercent = x / width
        const maxDuration = audioRef.current.duration

        setCurrentDuration(maxDuration * barPercent)
        audioRef.current.currentTime = maxDuration * barPercent
    }

    return (
        <div onClick={handleProgressClick} className={styles.progressWrapper}>
            <div
                style={{
                    width: `${calculateSongProgress() || 0}%`,
                }}
                className={`${styles.progressBar} ${isInPlayer ? styles.player : ''} ${isPlaying ? styles.isPlaying : ''}`}
            ></div>
        </div>
    )
}
