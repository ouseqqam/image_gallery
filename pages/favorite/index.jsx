import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/gallery.module.css'
import router from 'next/router'
import like from "./images/1.png"
import Navbar from '../../components/navbar'
import Image from 'next/image'

const Favorite = () => {
  const [photos, setPhotos] = useState([])
  const [logging, setLogging] = useState(false)
  
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (!localToken) {
      router.push('/login')
      return
    }
    else
      setLogging(true)
    fetchImages()
  }, [])

  const fetchImages = () => {
    getLike()
  }

  const getLike = async () => {
    const localToken = localStorage.getItem('token')
    try {
      const res = await axios.get('http://localhost:3000/api/like/getLike', {
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      setPhotos(res.data)

    } catch (err) {
      console.log(err.response?.data)
    } 
  }

  const handleClick = async (photo) => {
    const localToken = localStorage.getItem('token')
    try {
        const data = {
            id: photo.id
        }
        const res = await axios.post('http://localhost:3000/api/like/deleteLike', data, {
            headers: {
                Authorization: `Bearer ${localToken}`
            }
        })
        setPhotos(photos.filter((item) => item.id !== photo.id))
        
    } catch (err) {
        console.log(err.response?.data)
    }
}
    return (
      <div>
        {
          logging &&
          <div className={styles.body}>
            <Navbar />
              <div className={styles.container}>
                {
                  photos.map((photo) => (
                    <div className={styles.galleryContainer} key={photo.id}> 
                        <div className={styles.galleryItem}>
                            <div className={styles.image}>
                                <img src={photo.url} alt="favorite photo" />
                            </div>
                            <div className={styles.underImg} >
                                <p>{photo.name}</p>
                                <button onClick={() => handleClick(photo)} className={styles.btnLike}><Image src={like} alt="test" className={styles.like} /></button>
                            </div>
                        </div>
                    </div> 
                  ))
                }
              </div>
          </div>
        }
      </div>
    )
  }

  export default Favorite