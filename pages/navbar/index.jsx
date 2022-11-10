import styles from './styles/navbar.module.css'
import axios from 'axios'
import router from 'next/router'

const handleClick = async () => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
        localStorage.removeItem('token')
        router.push('/login')
    }
}


const Navbar =  () => {
    return(
        <div className={styles.navbar}>
            <div className={styles.navbar_name}>
                Image Gallery
            </div>
            <div className={styles.navbar__links}>
                <ul>
                    <li><a href="/imageGallery">Home</a></li>
                    <li><a href="/favorite">Favorite</a></li>
                    <li><button onClick={handleClick} >Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar