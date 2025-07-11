import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgVideo from 'lightgallery/plugins/video';

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// images
import { lighboxVideos, lightBoxImages, popupVideos } from "./data";

const Lightbox = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Single Image Lightbox</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1">

              <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                mode="lg-fade"
                speed={500}
              >
                {(lightBoxImages || []).map((item, idx) => (
                  <a href={item.src} className="xl:w-1/4 lg:w-1/3 md:w-1/2 p-3 inline-block picture-item image-popup" key={idx}>
                    <img src={item.src} alt="work-thumbnail" className="rounded-lg" />
                  </a>
                ))}
              </LightGallery>

            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Popup with Video or Map</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-4">

              <LightGallery
                plugins={[lgZoom, lgVideo]}
                mode="lg-fade"
                speed={500}
              >
                {(popupVideos || []).map((item, idx) => {
                  return (
                    <a key={idx} href={item.src} className="me-2 image-popup-video-button rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold leading-5 text-white hover:bg-indigo-500" data-title="YouTube Video" data-description="YouTube Video Popup">
                      Open {item.provider} Video
                    </a>
                  )
                })}
              </LightGallery>

            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Videos Gallery</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-400 mb-4">
              You can add videos with optional autoplay for
              <strong>Vimeo</strong>
              ,
              <strong>Youtube</strong>
              and
              <strong>self hosted videos</strong>
              . You can specify a default width for the videos or set different widths to each video in your gallery. The videos are 100% responsive and will play correctly on mobile devices.
            </p>
            <div className="grid lg:grid-cols-1">

              <LightGallery
                plugins={[lgZoom, lgVideo, lgThumbnail]}
                mode="lg-fade"

                speed={500}
              >
                {(lighboxVideos || []).map((item, idx) => {
                  return (
                    <a key={idx} href={item.src} className="xl:w-1/3 lg:w-1/3 md:w-1/2 p-3 inline-block picture-item image-popup-video">
                      <img src={item.image} alt="image" />
                    </a>
                  )
                })}
              </LightGallery>

            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default Lightbox
