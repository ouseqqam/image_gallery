import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/gallery.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from './gallery'
import { useRouter } from 'next/router'


// interface Photo {
//   id: string;
//   urls: string
//   user: string
// }

export default function ImageGallery() {
  const [photos, setPhotos] = useState<any>([]);
    useEffect(() => {
        fetchImages();
      }, [])
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
            photos.map((photo: any) => (
              <div className={styles.galleryContainer} key={photo.id}>
                <Gallery name={photo.user.name} urls={photo.urls.small} />
              </div> 
            ))
          }
        </div>
      </InfiniteScroll>
    </div>
  )
}
