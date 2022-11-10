import styles from './styles/navbar.module.css'



const Navbar =  () => {
    return(
        <div className={styles.navbar}>
            <div className={styles.navbar_name}>
                Image Gallery
            </div>
            <div className={styles.navbar__links}>
                <ul>
                    <li><a href="/imageGallery">Home</a></li>
                    <li><a href="#">Favorite</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar