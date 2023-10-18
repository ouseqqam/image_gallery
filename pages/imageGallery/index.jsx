import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/gallery.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from '../../components/gallery'
import router from 'next/router'
import Navbar from '../../components/navbar'
// import like from "./images/2.png"
// import unlike from "./images/1.png"



const ImageGallery = () => {
  const [photos, setPhotos] = useState([])
  const [like, setLike] = useState([])
  const [logging, setLogging] = useState(false)
  
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (!localToken) {
      router.push('/login')
      return
    }
    else
      setLogging(true)
      getLike()
      fetchImages()
  }, [])

  const fetchImages = () => {
  const url = "https://api.unsplash.com"
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY
  axios.get(`${url}/photos/random?client_id=${accessKey}&count=60`).then(res => {
    setPhotos([...photos, ...res.data])
    }).catch(err => {
      console.log(err.response?.data)
    })
  }

  const getLike = async () => {
    const localToken = localStorage.getItem('token')
    try {
      const res = await axios.get('http://localhost:3000/api/like/getLike', {
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      setLogging(true)  
      setLike(res.data)
    } catch (err) {
      console.log(err.response?.data)
    } 
  }

  const likeState = (photo) => {
    for(let i = 0; i < like.length; i++) {
      if(like[i].photoId === photo.photoId) {
        return true
      }
    }
    return false
  }
    return (
      <div>
        {
          logging &&
          <div className={styles.body}>
            <Navbar />
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
                      <Gallery like={() => likeState(photo)}  name={photo.user.name} urls={photo.urls.small} id ={photo.id} />
                    </div> 
                  ))
                }
              </div>
            </InfiniteScroll>
          </div>
        }
      </div>
    )
  }

  export default ImageGallery