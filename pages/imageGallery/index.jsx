import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/gallery.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from './gallery'
import { useRouter } from 'next/router'
import React from 'react'




export default function ImageGallery() {
  const [photos, setPhotos] = useState([])
  const [like, setLike] = useState([])
    useEffect(() => {
        fetchImages();
      }, [])
      const getLike = async () => {
        const res = await axios.get("http://localhost:3000/api/like/user1")
        const data = res.data
        setLike(data)
    }
      const fetchImages = () => {
        const url = "https://api.unsplash.com"
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY
        axios.get(`${url}/photos/random?client_id=${accessKey}&count=60`).then(res => {
          setPhotos([...photos, ...res.data])
        }).catch(err => {
          console.log(err.response.data)
        })
      }
  return (
    <div className={styles.body}>
      <h1> Photo Gallery </h1>
      <InfiniteScroll 
        dataLength={photos.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className={styles.container}>
          {
            photos.map((photo) => (
              <div className={styles.galleryContainer} key={photo.id}>
                <Gallery  like ={like} name={photo.user.name} urls={photo.urls.small} id ={photo.id} />
              </div> 
            ))
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}
