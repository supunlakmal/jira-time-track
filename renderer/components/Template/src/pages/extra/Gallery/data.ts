
// images
import img1 from '../../../assets/images/small/small-1.jpg'
import img2 from '../../../assets/images/small/small-2.jpg'
import img3 from '../../../assets/images/small/small-3.jpg'
import img4 from '../../../assets/images/small/small-4.jpg'
import img5 from '../../../assets/images/small/small-5.jpg'
import img6 from '../../../assets/images/small/small-6.jpg'
import img7 from '../../../assets/images/small/small-7.jpg'
import img8 from '../../../assets/images/small/small-8.jpg'

import plant3Img from '../../../assets/images/small/plant3.jpeg'
import girlImg from '../../../assets/images/small/girl.jpg'
import plant2Img from '../../../assets/images/small/plant2.jpeg'
import statue1Img from '../../../assets/images/small/statue1.jpg'
import vaseImg from '../../../assets/images/small/vase.jpg'
import flowerImg from '../../../assets/images/small/flower.jpeg'
import flower2Img from '../../../assets/images/small/flower2.jpg'
import plantImg from '../../../assets/images/small/plant.jpg'
import statue2Img from '../../../assets/images/small/statue2.jpg'
import boysImg from '../../../assets/images/small/boys.jpg'

export interface ImageType {
  src: string;
  caption?: string;
  title?: string;
}

export interface FilterImageType {
  src: string,
  filter: string,
}
export interface MixImageType {
  src: string;
  isBIG?: boolean;
}
export interface GalleryItem {
  id?: number;
  image: ImageType;
  tags: string,
  title: string,
  category?: string[];
}

export const gallery: GalleryItem[] = [
  {
    id: 1,
    image: {
      src: img1,
      caption: "Screenshot-1",
    },
    tags: "Media,Icons",
    title: "Open Imagination",
    category: ["creative", "photography"],
  },
  {
    id: 2,
    image: {
      src: img2,
      caption: "Screenshot-2",
    },
    tags: "Illustrations",
    title: "Locked Steel Gate",
    category: ["design", "digital"],
  },
  {
    id: 3,
    image: {
      src: img3,
      caption: "Screenshot-3",
    },
    tags: "Graphics, UI Elements",
    title: "Mac Sunglasses",
    category: ["creative", "photography"],
  },
  {
    id: 4,
    image: {
      src: img4,
      caption: "Screenshot-4",
    },
    tags: "Icons, Illustrations",
    title: "Morning Dew",
    category: ["design", "photography"],
  },
  {
    id: 5,
    image: {
      src: img5,
      caption: "Screenshot-5",
    },
    tags: "UI Elements, Media",
    title: "Console Activity",
    category: ["design", "photography"],
  },
  {
    id: 6,
    image: {
      src: img6,
      caption: "Screenshot-6",
    },
    tags: "Graphics",
    title: "Sunset Bulb Glow",
    category: ["creative", "digital"],
  },
  {
    id: 7,
    image: {
      src: img7,
      caption: "Screenshot-7",
    },
    tags: "Icons, Illustrations",
    title: "Morning Dew",
    category: ["creative", "digital"],
  },
  {
    id: 8,
    image: {
      src: img8,
      caption: "Screenshot-8",
    },
    tags: "Illustrations",
    title: "Locked Steel Gate",
    category: ["design", "digital"],
  },
]

export const images: ImageType[] = [
  {
    src: plant3Img,
  },
  {
    src: girlImg,
  },
  {
    src: plant2Img,
  },
  {
    src: statue1Img,
  },
  {
    src: vaseImg,
  },
  {
    src: flowerImg,
  },
  {
    src: flower2Img,
  },
  {
    src: vaseImg,
  },
  {
    src: girlImg,
  },
  {
    src: plantImg,
  },
]

export const mixImages: MixImageType[] = [
  {
    src: statue1Img,
  },
  {
    src: statue2Img,
  },
  {
    src: vaseImg,
    isBIG: true,
  },
  {
    src: plantImg,
    isBIG: true,
  },
  {
    src: plant2Img,
  },
  {
    src: plant3Img,
  },
]

export const captionsImages: MixImageType[] = [
  {
    src: plantImg,
    isBIG: true,
  },
  {
    src: statue2Img,
  },
  {
    src: statue1Img,
  },
]

export const hoverEffectImages: ImageType[] = [
  {
    src: plantImg,
    title: "Shooting Stars",
  },
  {
    src: plant3Img,
    title: "The Catalyzer",
  },
  {
    src: vaseImg,
    title: "The 400 Blows",
  },
  {
    src: statue2Img,
    title: "Neptune",
  },
  {
    src: statue1Img,
    title: "Holden Caulfield",
  },
  {
    src: plant2Img,
    title: "alper kamu",
  },
]

export const filterImages: FilterImageType[] = [
  {
    src: plant3Img,
    filter: "blur-sm",
  },
  {
    src: plantImg,
    filter: "brightness-50",
  },
  {
    src: plant2Img,
    filter: "contrast-50",
  },
  {
    src: statue1Img,
    filter: "drop-shadow-2xl",
  },
  {
    src: vaseImg,
    filter: "grayscale",
  },
  {
    src: boysImg,
    filter: "hue-rotate-60",
  },
  {
    src: plant3Img,
    filter: "invert",
  },
  {
    src: vaseImg,
    filter: "saturate-50",
  },
  {
    src: plant2Img,
    filter: "sepia",
  },
  {
    src: plantImg,
    filter: "hue-rotate-180",
  },
]