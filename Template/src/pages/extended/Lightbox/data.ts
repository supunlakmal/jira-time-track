// images
import img1 from '../../../assets/images/small/img-1.jpg'
import img2 from '../../../assets/images/small/img-2.jpg'
import img4 from '../../../assets/images/small/img-4.jpg'
import img5 from '../../../assets/images/small/img-5.jpg'
import img12 from '../../../assets/images/small/img-12.jpg'

interface Imagetype {
  src: string,
  provider?: string;
}

interface VideoGalleryType {
  src: string,
  image: string,
}

export const lightBoxImages: Imagetype[] = [
  {
    src: img1,
  },
  {
    src: img2,
  },
  {
    src: img4,
  },
  {
    src: img5,
  },
]

export const popupVideos: Imagetype[] = [
  {
    src: "https://youtu.be/PrUxWZiQfy4",
    provider: "YouTube"
  },
  {
    src: "https://vimeo.com/45830194",
    provider: "Vimeo"
  },
]

export const lighboxVideos: VideoGalleryType[] = [
  {
    src: "https://vimeo.com/115041822",
    image: img1,
  },
  {
    src: "https://www.youtube-nocookie.com/embed/Ga6RYejo6Hk",

    image: img2,
  },
  {
    src: "https://www.youtube-nocookie.com/embed/n8g1hFXCKB4",
    image: img12,
  },
]
