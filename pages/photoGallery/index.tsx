import axios, { responseEncoding } from "axios";
import { env } from "process";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "../../styles/Home.module.css";

interface Photo {
    name: string;
    urls: string;
}

 
const PhotoGallery = (photo: Photo) => {
    return (
        <div>
            <img src={photo.urls} className={styles.img} alt="random photo" />
            <p>{photo.name}</p>
        </div>
    );
}
 
export default PhotoGallery;