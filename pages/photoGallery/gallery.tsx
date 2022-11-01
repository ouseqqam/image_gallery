import axios, { responseEncoding } from "axios";
import { env } from "process";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles/gallery.module.css";

interface Photo {
    name: string;
    urls: string;
}

 
const Gallery = (photo: Photo) => {
    return (
        <div className={styles.galleryItem}>
            <div className={styles.image}>
                <img src={photo.urls} alt="random photo" />
            </div>
            <p>{photo.name}</p>
        </div>
    );
}
 
export default Gallery;