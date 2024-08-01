import React, { FormEvent, useState } from 'react'
import styles from '../styles/modules/trackadd.module.scss'
import add from '../assets/img/add.svg'

export const TrackAdd = () => {
    const [isModalActive, setIsModalActive] = useState(false)

    function handleAddClick() {
        setIsModalActive(!isModalActive)
    }

    function handleMaskClick() {
        setIsModalActive(false)
    }

    function handleFormSubmit(evt: FormEvent) {
        evt.preventDefault()
        setIsModalActive(false)
    }

    return (
        <>
            <div
                onClick={handleMaskClick}
                className={styles.mask}
                hidden={!isModalActive}
            ></div>

            <div onClick={handleAddClick} className={styles.wrapper}>
                <img className={styles.add} src={add} alt="add" />
            </div>

            <div className={styles.modalWrapper} hidden={!isModalActive}>
                <form onSubmit={handleFormSubmit} action="">
                    <h3>Add song</h3>
                    <input
                        className={styles.name}
                        placeholder="Song name *"
                        type="text"
                    />
                    <input
                        className={styles.author}
                        placeholder="Author"
                        type="text"
                    />
                    <input
                        className={styles.song}
                        placeholder=".mp3, .wav"
                        type="file"
                    />
                    <input
                        className={styles.cover}
                        placeholder="Song cover (png, jpg)"
                        type="file"
                    />
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}
