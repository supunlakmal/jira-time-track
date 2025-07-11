import { useState } from 'react';
import { Link } from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

// styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css';

// dummy data
import { filterImages as galleryfilter, captionsImages, gallery as galleryData, GalleryItem, hoverEffectImages, images, ImageType, mixImages } from './data'
import { PageBreadcrumb } from '../../../components';

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(galleryData);
  const [category, setCategory] = useState<string>('all');
  const [galleryImages, setGalleryImages] = useState<ImageType[]>(
    (galleryData || []).map((album) => {
      return album.image;
    })
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * filter images by category
   * @param category category
   */

  const filterImages = (category: string) => {
    setIsLoading(true);
    setCategory(category);
    setTimeout(() => {
      const galleryAlbums =
        category === 'all' ? galleryData : galleryData.filter((album) => album.category?.includes(category));
      setGallery(galleryAlbums);
      setGalleryImages(
        (galleryAlbums || []).map((album) => {
          return album.image;
        })
      );
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      <PageBreadcrumb title='Gallery' name='Gallery' breadCrumbItems={["Konrix", "Extra Pages", "Gallery"]} />
      <div className='flex flex-col gap-6'>
        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title uppercase'>Filter Sort </h5>
          </div>
          <div className='p-6'>
            <div className='flex justify-center'>
              <div className='w-full filters-group-wrap mb-3'>
                <div className='flex justify-center mb-5'>
                  <ul className='filter-options flex flex-wrap gap-4 justify-center'>
                    <li className={`${(category) === 'all' ? 'active' : ''}`}><Link to='#' className='btn' onClick={() => filterImages('all')}>All Items</Link></li>
                    <li className={`${(category) === 'design' ? 'active' : ''}`}><Link to='#' className='btn' onClick={() => filterImages('design')}>Design</Link></li>
                    <li className={`${(category) === 'creative' ? 'active' : ''}`}><Link to='#' className='btn' onClick={() => filterImages('creative')}>Creative</Link></li>
                    <li className={`${(category) === 'digital' ? 'active' : ''}`}><Link to='#' className='btn' onClick={() => filterImages('digital')}>Digital</Link></li>
                    <li className={`${(category) === 'photography' ? 'active' : ''}`}><Link to='#' className='btn' onClick={() => filterImages('photography')}>Photography</Link></li>
                  </ul>
                </div>
              </div>

            </div>

            <div id='gallery-wrapper' className='flex flex-wrap justify-center'>

              <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                mode='lg-fade'
                speed={500}
              >
                {(gallery || []).map((slide, idx) => {
                  return (
                    <a key={idx} className='xl:w-1/4 lg:w-1/3 md:w-1/2 p-3 inline-block picture-item image-popup' href={slide.image.src}>
                      <div className='relative block overflow-hidden rounded group transition-all duration-500'>
                        <img src={slide.image.src} className='rounded transition-all duration-500 group-hover:scale-105' alt='work-image' />
                        <div className='absolute inset-3 flex items-end cursor-pointer rounded bg-white p-3 opacity-0 transition-all duration-500 group-hover:opacity-80'>
                          <div>
                            <p className='text-sm text-gray-400'>{slide.tags}</p>
                            <h6 className='text-base text-black font-medium'>{slide.title}</h6>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                })}
              </LightGallery>
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Basic</h5>
          </div>
          <div className='p-6'>

            <div className='grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
              {(images || []).map((item, idx) => {
                return (
                  <img key={idx} alt='gallery' className='object-cover object-center rounded' src={item.src} />
                )
              })}
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Mix Images</h5>
          </div>
          <div className='p-6'>

            <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-5'>
              {(mixImages || []).map((item, idx) => {
                return (
                  <div key={idx} className={`${(mixImages[idx].isBIG) ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                    <img alt='gallery' className='block object-cover object-center w-full h-full rounded' src={item.src} />
                  </div>
                )
              })
              }
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Captions</h5>
          </div>
          <div className='p-6'>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
              {(captionsImages || []).map((item, idx) => {
                return (
                  <div key={idx} className={`${(captionsImages[idx].isBIG) ? 'py-32 px-10 lg:col-span-2' : 'sm:py-24 py-16 sm:px-10 px-6'} flex flex-wrap w-full bg-gray-100 relative`}>
                    <img alt='gallery' className='w-full object-cover h-full object-center block opacity-25 absolute inset-0 rounded' src={item.src} />
                    <div className='text-center relative z-10 w-full'>
                      <h2 className='text-xl text-gray-900 font-medium title-font mb-2'>
                        Shooting Stars</h2>
                      <p className='leading-relaxed'>Skateboard +1 mustache fixie paleo
                        lumbersexual.</p>
                      <a className='mt-3 text-indigo-500 inline-flex items-center'>Learn
                        More
                        <svg fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='w-4 h-4 ms-2' viewBox='0 0 24 24'>
                          <path d='M5 12h14M12 5l7 7-7 7'></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Hover Effect</h5>
          </div>
          <div className='p-6'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
              {(hoverEffectImages || []).map((item, idx) => {
                return (
                  <div key={idx} className='flex relative'>
                    <img alt='gallery' className='absolute w-full h-full object-cover object-center rounded' src={item.src} />
                    <div className='px-8 py-10 relative z-10 w-full bg-white opacity-0 hover:opacity-80'>
                      <h2 className='tracking-widest text-sm font-semibold text-primary mb-1'>
                        THE SUBTITLE</h2>
                      <h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
                        {item.title}</h1>
                      <p className='leading-relaxed'>Photo booth fam kinfolk cold-pressed
                        sriracha leggings jianbing microdosing tousled waistcoat.</p>
                    </div>
                  </div>
                )
              })}

            </div>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <h5 className='card-title'>Filter</h5>
          </div>
          <div className='p-6'>

            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-5'>
              {(galleryfilter || []).map((item, idx) => {
                return (
                  <img key={idx} alt='gallery' className={`${item.filter} object-cover object-center rounded filter`} src={item.src} />

                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Gallery