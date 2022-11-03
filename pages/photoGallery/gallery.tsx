import axios, { responseEncoding } from "axios"
import { env } from "process"
import { useEffect, useState } from "react"
import styles from "./styles/gallery.module.css"
import like from "./images/2.png"
import unlike from "./images/1.png"
import Image from 'next/image'

interface Photo {
    name: string
    urls: string
}

const Gallery = (photo: Photo) => {
    const [src, setSrc] = useState<any>(like)
    const [likeClick, setLikeClick] = useState<boolean>(false)

    const handleClick = () => {
        setLikeClick(!likeClick)
        if (likeClick) {
            setSrc(like)
        } else {
            setSrc(unlike)
        }
        //push id of picture to user1 liked array to leveldb



    }
    return (
        <div className={styles.galleryItem}>
            <div className={styles.image}>
                <img src={photo.urls} alt="random photo" />
            </div>
            <div className={styles.underImg}>
                <p>{photo.name}</p>
                <button onClick={handleClick} className={styles.btnLike}><Image src={src} alt="test" className={styles.like} /></button>
            </div>
        </div>
    );
}
 
export default Gallery;