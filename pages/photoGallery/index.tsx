import axios, { responseEncoding } from "axios";
import { env } from "process";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Photo {
    id: string;
    urls: string;
}

 
const PhotoGallery = (photo: Photo) => {
   
    return (
        <div>
            <img key={photo.id} src={photo.urls} alt="random photo" />
        </div>
    );
}
 
export default PhotoGallery;