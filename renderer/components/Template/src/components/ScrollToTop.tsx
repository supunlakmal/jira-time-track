import { useEffect, useState } from 'react'

const ScrollToTop = () => {

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.pageYOffset > 200) {
      setShowScrollTop(true)
    }
    else if (window.pageYOffset <= 200) {
      setShowScrollTop(false)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='fixed h-10 w-10 items-center justify-center rounded-full z-10 bottom-20 end-14 p-2.5 bg-primary cursor-pointer shadow-lg text-white'>
          <i className="mgc_arrow_up_line text-lg"></i>
        </button>
      )}
    </>
  )
}

export default ScrollToTop