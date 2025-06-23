import React, { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { openLightbox } from "./PhotoSwipeWrapper";
import Spinner from "../Spinner";

export default function ImageGallery({ photos, items }) {
  const [loaded, setLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;

    let isCancelled = false;
    let count = 0;

    photos.forEach((photo) => {
      const img = new Image();
      img.src = photo.src;
      img.onload = () => {
        count++;
        if (!isCancelled) {
          setLoadedCount((prev) => prev + 1);
          if (count === photos.length) {
            setLoaded(true);
          }
        }
      };
      img.onerror = () => {
        count++;
        if (!isCancelled && count === photos.length) {
          setLoaded(true);
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [photos]);

  const handleClick = (_, { index }) => openLightbox(items, index);

  return (
    <div>
      {!loaded && <Spinner />}
      {loaded && (
        <Gallery
          photos={photos}
          onClick={handleClick}
          margin={6}
          targetRowHeight={140}
        />
      )}
    </div>
  );
}
