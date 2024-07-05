import React from 'react'
import styles from '../styles/modules/track.module.scss'
import placeholder from '../assets/img/placeholder.png'

export const Track = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.cover}>
                <div className={styles.mask}></div>
                <img src={placeholder} alt="" className={styles.cover} />
                <div className={styles.controls}>
                    <button className={styles.pause}></button>
                    <div className={styles.progressBar}></div>
                </div>
            </div>
        </div>
    )
}
