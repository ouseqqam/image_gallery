import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./styles/gallery.module.css"
import like from "./images/2.png"
import unlike from "./images/1.png"
import Image from 'next/image'

const Gallery = (like, photo) => {
    const [src, setSrc] = useState(like)
    const [likeClick, setLikeClick] = useState(false)

    const handleClick = async () => {
        setLikeClick(!likeClick)
        if (likeClick) {
            setSrc(like)
        } else {
            setSrc(unlike)
            let data = {
                id: photo.id,
                user: "user1",
                url: photo.urls,
            }
            // const likes = await axios.get("http://localhost:3000/api/like/user1")
            // for (let i = 0; i < likes.data.length; i++) {
            //     if (likes.data[i].photoId === photo.photoId) {
            //         setLikeClick(true)
            //         setSrc(unlike)
            //         break
            //     }
            // }
            await axios.post('http://localhost:3000/api/like/putLike', data)
        }
    }
    return (
        <div className={styles.galleryItem}>
            <div className={styles.image}>
                <img src={photo.urls} alt="random photo" />
            </div>
            <div className={styles.underImg} >
                <p>{photo.name}</p>
                <button onClick={() => handleClick(photo)} className={styles.btnLike}><Image src={src} alt="test" className={styles.like} /></button>
            </div>
        </div>
    );
}
 
export default Gallery