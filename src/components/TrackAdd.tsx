import { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../styles/modules/trackadd.module.scss'
import add from '../assets/img/add.svg'
import { useTrackContext } from '../context'

export const TrackAdd = () => {
    const { tracks, addTrack } = useTrackContext()
    const [isModalActive, setIsModalActive] = useState(false)
    const [songName, setSongName] = useState('')
    const [songAuthor, setSongAuthor] = useState('')
    const [songFile, setSongFile] = useState('')
    const [songCover, setSongCover] = useState('')

    function handleAddClick() {
        setIsModalActive(!isModalActive)
    }

    function handleMaskClick() {
        setIsModalActive(false)
    }

    function handleSetFile(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement
        if (!input) return
        if (!input.files) return
        setSongFile(URL.createObjectURL(input.files[0]))
    }

    function handleSetCover(e: ChangeEvent<HTMLInputElement>) {
        const input = e.target as HTMLInputElement
        if (!input) return
        if (!input.files) return
        setSongCover(URL.createObjectURL(input.files[0]))
    }

    function handleFormSubmit(evt: FormEvent) {
        evt.preventDefault()

        if (!songName || !songAuthor || !songFile || !songCover) return

        const formedTrack = {
            name: songName,
            author: songAuthor,
            file: songFile,
            cover: songCover,
        }

        addTrack([...tracks, formedTrack])

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
                        onChange={(e) => setSongName(e.target.value)}
                        className={styles.name}
                        placeholder="Song name *"
                        type="text"
                    />
                    <input
                        onChange={(e) => setSongAuthor(e.target.value)}
                        className={styles.author}
                        placeholder="Author"
                        type="text"
                    />
                    <label htmlFor="song-upload" className={styles.songInput}>
                        Song file (.mp3/.wav)*
                    </label>
                    <input
                        onChange={handleSetFile}
                        id="song-upload"
                        className={styles.song}
                        placeholder=".mp3, .wav"
                        type="file"
                    />
                    <label htmlFor="cover-upload" className={styles.coverInput}>
                        Song cover (.png/.jpg)
                    </label>

                    <input
                        onChange={handleSetCover}
                        id="cover-upload"
                        className={styles.cover}
                        placeholder="Song cover (png, jpg)"
                        type="file"
                    />
                    <button className={styles.submitButton}>Submit</button>
                </form>
            </div>
        </>
    )
}
