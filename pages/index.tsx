import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import PhotoGallery from './photoGallery'
import InfiniteScroll from 'react-infinite-scroll-component'

// interface Photo {
//   id: string;
//   urls: string
//   user: string
// }

export default function Home() {

  const [photos, setPhotos] = useState<any>([]);

    useEffect(() => {
        fetchImages();
      }, [])
      const fetchImages = () => {
        const url = "https://api.unsplash.com"
        const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY
        axios.get(`${url}/photos/random?&client_id=${accessKey}&count=10`).then(res => {
          setPhotos([...photos, ...res.data])
        }).catch(err => {
          console.log(err.response.data)
        })
      }
  return (
    <div>
      <InfiniteScroll 
        dataLength={photos.length}
        next={fetchImages}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div>
          {photos.map((photo: any) => (
            <PhotoGallery id={photo.id} urls={photo.urls.thumb} />
            ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}
