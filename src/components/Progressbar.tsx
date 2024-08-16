import React, { FC, MouseEvent, useEffect } from 'react'
import styles from '../styles/modules/progressbar.module.scss'

interface ProgressbarProps {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>
    currentDuration: number
    setCurrentDuration: (currentGlobalDuration: number) => void
    isPlaying: boolean
}

export const Progressbar: FC<ProgressbarProps> = ({
    // копать надо здесь
    audioRef,
    currentDuration,
    setCurrentDuration,
    isPlaying,
}) => {
    function calculateSongProgress() {
        if (!audioRef?.current) return
        console.log('hi')
        return (currentDuration / audioRef.current.duration) * 100 || 0
    }

    function handleProgressClick(e: MouseEvent) {
        if (!audioRef?.current) return
        e.stopPropagation()
        const x = e.pageX - e.currentTarget.getBoundingClientRect().left
        const barPercent = x / 200
        const maxDuration = audioRef.current.duration

        setCurrentDuration(maxDuration * barPercent)
        audioRef.current.currentTime = maxDuration * barPercent
    }

    useEffect(() => {
        console.log(calculateSongProgress())
    }, [currentDuration])

    return (
        <div onClick={handleProgressClick} className={styles.progressWrapper}>
            <div
                style={{
                    width: `${calculateSongProgress() || 0}%`,
                }}
                className={`${styles.progressBar} ${isPlaying ? styles.isPlaying : ''}`}
            >
                {calculateSongProgress()}
            </div>
        </div>
    )
}
