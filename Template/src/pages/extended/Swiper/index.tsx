import { Swiper as Swiperjs, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Scrollbar, Mousewheel, EffectFade, EffectCreative, EffectFlip } from 'swiper';

// components
import { PageBreadcrumb } from '../../../components';

// styles
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/scrollbar';
import "swiper/css/effect-fade";
import 'swiper/css/effect-creative';
import "swiper/css/effect-flip";

// images
import picture1 from '../../../assets/images/small/img-1.jpg'
import picture2 from '../../../assets/images/small/img-2.jpg'
import picture3 from '../../../assets/images/small/img-3.jpg'
import picture4 from '../../../assets/images/small/img-4.jpg'
import picture5 from '../../../assets/images/small/img-5.jpg'
import picture6 from '../../../assets/images/small/img-6.jpg'
import picture7 from '../../../assets/images/small/img-7.jpg'
import picture8 from '../../../assets/images/small/img-8.jpg'
import picture9 from '../../../assets/images/small/img-9.jpg'
import picture10 from '../../../assets/images/small/img-10.jpg'
import picture11 from '../../../assets/images/small/img-11.jpg'
import picture12 from '../../../assets/images/small/img-12.jpg'

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + (index + 1) + "</span>";
  },
}

const Swiper = () => {
  return (
    <>
      <PageBreadcrumb name='Swiper' title='Swiper' breadCrumbItems={["Konrix", "Extended", "Swiper"]} />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Default Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs
              className='rounded default-swiper' autoplay={{ delay: 2000 }} loop={true} modules={[Autoplay]}>
              <SwiperSlide>
                <img src={picture1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture3} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Navigation & Pagination Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="navigation-swiper rounded" loop={true} navigation={true} autoplay={{ delay: 2000 }} pagination={{ type: 'bullets' }} modules={[Pagination, Autoplay, Navigation]}>
              <SwiperSlide>
                <img src={picture4} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture5} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture6} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pagination Dynamic Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="pagination-dynamic-swiper rounded" loop={true} autoplay={{ delay: 2000 }} pagination={{ dynamicBullets: true }} modules={[Pagination, Autoplay]}>
              <SwiperSlide>
                <img src={picture7} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture8} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture9} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pagination Fraction Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="pagination-fraction-swiper rounded" loop={true} autoplay={{ delay: 2000 }} navigation={true} pagination={{ type: 'fraction' }} modules={[Pagination, Autoplay, Navigation]}>
              <SwiperSlide>
                <img src={picture10} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture11} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture12} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pagination Custom Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="pagination-custom-swiper rounded" loop={true} autoplay={{ delay: 2000 }} pagination={pagination} modules={[Pagination, Autoplay]}>
              <SwiperSlide>
                <img src={picture2} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture3} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture4} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pagination Progress Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="pagination-progress-swiper rounded" loop={true} autoplay={{ delay: 2000 }} navigation={true} pagination={{ type: 'progressbar' }} modules={[Pagination, Autoplay, Navigation]}>
              <SwiperSlide>
                <img src={picture5} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture6} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture7} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Scrollbar Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="pagination-scrollbar-swiper rounded" loop={true} autoplay={{ delay: 2000 }} navigation={true} scrollbar={{ hide: true }} modules={[Pagination, Autoplay, Scrollbar, Navigation]}>
              <SwiperSlide>
                <img src={picture8} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture9} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture10} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Vertical Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="vertical-swiper rounded" loop={true} autoplay={{ delay: 2000 }} direction='vertical' pagination={{ clickable: true }} modules={[Pagination, Autoplay]} style={{ height: 324 }}>
              <SwiperSlide>
                <img src={picture11} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture12} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture1} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Mousewheel Control Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="vertical-swiper rounded" loop={true} autoplay={{ delay: 2000 }} direction='vertical' slidesPerView={1} mousewheel={true} pagination={{ clickable: true }} modules={[Pagination, Autoplay, Mousewheel]} style={{ height: 324 }}>
              <SwiperSlide>
                <img src={picture3} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture4} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture5} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Effect Fade Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="navigation-swiper rounded" pagination={{ clickable: true }} effect='fade' loop={true} autoplay={{ delay: 2000 }} modules={[Autoplay, Pagination, EffectFade]}>
              <SwiperSlide >
                <img src={picture6} alt="" />
              </SwiperSlide>
              <SwiperSlide >
                <img src={picture7} alt="" />
              </SwiperSlide>
              <SwiperSlide >
                <img src={picture8} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Effect Creative Swiper</h4>
            </div>
          </div>
          <div className="p-6">
            <Swiperjs className="navigation-swiper rounded" pagination={{ clickable: true }} effect='creative' grabCursor={true} creativeEffect={{ prev: { shadow: true, translate: [0, 0, -400], }, next: { translate: ['100%', 0, 0] } }} loop={true} autoplay={{ delay: 2000 }} modules={[Autoplay, Pagination, EffectCreative]}>
              <SwiperSlide >
                <img src={picture9} alt="" />
              </SwiperSlide>
              <SwiperSlide >
                <img src={picture10} alt="" />
              </SwiperSlide>
              <SwiperSlide >
                <img src={picture11} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Effect Flip Swiper</h4>
            </div>
          </div>

          <div className="p-6">
            <Swiperjs className="navigation-swiper rounded" loop={true} autoplay={true} pagination={true} grabCursor={true} effect='flip' modules={[Autoplay, Pagination, EffectFlip]}>
              <SwiperSlide>
                <img src={picture12} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture1} alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img src={picture2} alt="" />
              </SwiperSlide>
            </Swiperjs>
          </div>
        </div>
      </div>
    </>
  )
};

export default Swiper