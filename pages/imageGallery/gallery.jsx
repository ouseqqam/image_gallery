import axios from "axios"
import { useState, useEffect } from "react"
import styles from "./styles/gallery.module.css"
import unlike from "./images/2.png"
import like from "./images/1.png"
import Image from 'next/image'

const Gallery = (photo) => {
    const [src, setSrc] = useState(unlike)
    const [likeClick, setLikeClick] = useState(like.click)

    useEffect(() => {
        if (photo.likeState === true) {
            setSrc(like)
        } else {
            setSrc(unlike)
        }
    }, []);

    const handleClick = async () => {
        const localToken = localStorage.getItem('token')
        if(likeClick) {
            try {
                const data = {
                    id : photo.id
                }
                const res = await axios.post("http://localhost:3000/api/like/deleteLike", data, {
                    headers: {
                        Authorization: `Bearer ${localToken}`
                        }
                    })
                setSrc(unlike)
                setLikeClick(false)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const data = {
                    id: photo.id,
                    url: photo.urls,
                    name: photo.name,
                }
                const res = await axios.post("http://localhost:3000/api/like/putLike", data, {
                    headers: {
                        Authorization: `Bearer ${localToken}`
                    }
                })
                setSrc(like)
                setLikeClick(true)
                console.log(res.data?.message)
            } catch (err) {
                console.log(err.response?.data)
            }
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