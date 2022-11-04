import axios from "axios"
import { useState } from "react"
import styles from "./styles/gallery.module.css"
import unlike from "./images/2.png"
import like from "./images/1.png"
import Image from 'next/image'

const Gallery = (photo) => {
    const [src, setSrc] = useState(unlike)
    const [likeClick, setLikeClick] = useState(like.click)

    const handleClick = async () => {
        if(likeClick) {
            setSrc(unlike)
            setLikeClick(false)
            // await axios.delete("http://localhost:3000/api/like/user1", {data: {photoId: photo.id}})
        } else {
            setSrc(like)
            setLikeClick(true)
            await axios.post("http://localhost:3000/api/like/user1", {photoId: photo.id})
        }
    }
    return (
        <div className={styles.galleryItem}>
            <div className={styles.image}>
                <img src={photo.urls} alt="random photo" />
            </div>
            <div className={styles.underImg} >
                <p>{photo.name}</p>
                <button onClick={handleClick} className={styles.btnLike}><Image src={src} alt="test" className={styles.like} /></button>
            </div>
        </div>
    );
}
 
export default Gallery