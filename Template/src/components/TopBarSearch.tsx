import { useRef, useState } from "react"
import { ModalLayout } from "./HeadlessUI"

const TopBarSearch = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const ref: React.RefObject<HTMLDivElement> = useRef(null);
  // console.log(ref.current?.children[0].classList.remove('hidden'))

  if (isModalOpen) {
    ref.current?.children[0].classList.remove('hidden')
    ref.current?.children[0].classList.add('show')
  }

  return (
    <>
      <button type="button" className="nav-link p-2 me-auto" onClick={handleModal}>
        <span className="sr-only">Search</span>
        <span className="flex items-center justify-center h-6 w-6">
          <i className="mgc_search_line text-2xl"></i>
        </span>
      </button>

      <ModalLayout
        showModal={isModalOpen}
        toggleModal={handleModal}
        panelClassName="min-w-[512px] mt-8 card"
        placement='justify-center items-start'
      >
        <div className="opacity-100 transition-all sm:max-w-lg sm:w-full sm:mx-auto">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl transition-all dark:bg-slate-800">
            <div className="relative">
              <div className="pointer-events-none absolute top-3.5 start-4 text-gray-900 text-opacity-40 dark:text-gray-200">
                <i className="mgc_search_line text-xl"></i>
              </div>
              <input type="search" className="h-12 w-full border-0 bg-transparent ps-11 pe-4 text-gray-900 placeholder-gray-500 dark:placeholder-gray-300 dark:text-gray-200 focus:ring-0 sm:text-sm" placeholder="Search..." />
            </div>
          </div>
        </div>
      </ModalLayout>

    </>
  )
}

export default TopBarSearch