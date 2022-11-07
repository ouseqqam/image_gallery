import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './styles/gallery.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import Gallery from './gallery'
import router from 'next/router'
// import like from "./images/2.png"
// import unlike from "./images/1.png"



const ImageGallery = () => {
  const [photos, setPhotos] = useState([])
  const [like, setLike] = useState([])
  
  const dispatch = useDispatch();

  useEffect(() => {
    const likes = getLike()
    console.log("likes: ", likes)
    fetchImages()
    getLike()
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

  const getLike = async () => {
    const localToken = localStorage.getItem('token')
    try {
      const res = await axios.get('http://localhost:3000/api/like/user1', {
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      console.log(res.data)
      setLike(res.data)
    } catch (err) {
      console.log(err.response.data)
      router.push('/login')
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
                  <Gallery like={() => likeState(photo)}  name={photo.user.name} urls={photo.urls.small} id ={photo.id} />
                </div> 
              ))
            }
          </div>
        </InfiniteScroll>
      </div>
    )
  }

  export default ImageGallery