'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camper, CamperImage } from '@/types/camper';
import styles from './CamperGallery.module.css';

type Props = {
  gallery: Camper['gallery'];
  camperName: string;
};

type GalleryItem = string | CamperImage;

export default function CamperGallery({ gallery, camperName }: Props) {
  const normalizedGallery: GalleryItem[] = Array.isArray(gallery) ? gallery : [];

  const getImageSrc = (img: GalleryItem) => {
    if (typeof img === 'string') return img;
    return img.original || img.thumb || '/Pic.jpg';
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const mainImage =
    normalizedGallery.length > 0
      ? getImageSrc(normalizedGallery[activeIndex])
      : '/Pic.jpg';

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrap}>
        <Image
          src={mainImage}
          alt={camperName}
          fill
          sizes="(max-width: 1200px) 100vw, 600px"
          className={styles.mainImage}
          priority
        />
      </div>

      {normalizedGallery.length > 0 && (
        <div className={styles.thumbs}>
          {normalizedGallery.map((img, index) => {
            const imageSrc = getImageSrc(img);

            return (
              <button
                key={index}
                type="button"
                className={`${styles.thumbButton} ${
                  activeIndex === index ? styles.activeThumb : ''
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className={styles.thumbWrap}>
                  <Image
                    src={imageSrc}
                    alt={`${camperName} ${index + 1}`}
                    fill
                    sizes="120px"
                    className={styles.thumbImage}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
