import React, { useState } from "react"
import { PageBreadcrumb } from "../../components"
import { ModalLayout } from "../../components/HeadlessUI"
import { Link } from "react-router-dom"

interface modalItem {
  title: string,
  size: string,
}

const SimpleModal = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Example</h4>
        </div>
      </div>
      <div className="p-6">
        <div>
          <button
            className="btn bg-primary text-white"
            onClick={handleModal} type="button"
          >
            Show Modal
          </button>
          <ModalLayout
            showModal={isModalOpen}
            toggleModal={handleModal}
            panelClassName="sm:max-w-lg"
            placement="justify-center items-start"
          >
            <div className="duration-500  ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
              <div
                className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                  Modal Title
                </h3>
                <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200">
                  <span className="material-symbols-rounded" onClick={handleModal}>close</span>
                </button>
              </div>
              <div className="px-4 py-8 overflow-y-auto">
                <p className="text-gray-800 dark:text-gray-200">
                  This is a wider card with supporting text below as a natural lead-in to
                  additional
                  content.
                </p>
              </div>
              <div
                className="flex justify-end items-center gap-4 p-4 border-t dark:border-slate-700">
                <button
                  className="btn dark:text-gray-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
                  onClick={handleModal} type="button">Close</button>
                <a className="btn bg-primary text-white" href="">Save</a>
              </div>
            </div>
          </ModalLayout>
        </div>
      </div>
    </div>
  )
}

// const AutoTargetingModal = () => {

//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

//   const handleModal = () => {
//     setIsModalOpen(!isModalOpen)
//   }

//   return (
//     <div className="card">
//       <div className="card-header">
//         <div className="flex justify-between items-center">
//           <h4 className="card-title">Auto Targeting</h4>
//         </div>
//       </div>
//       <div className="p-6">
//         <div>
//           <button
//             className="btn bg-primary text-white"
//             onClick={handleModal}
//             type="button"
//           >
//             Show Modal
//           </button>
//           <ModalLayout
//             showModal={isModalOpen}
//             toggleModal={handleModal}
//             panelClassName="sm:max-w-lg"
//             placement="justify-center items-start"
//           >
//             <div className="duration-500 ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
//               <div
//                 className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
//                 <h3 className="font-medium text-gray-800 dark:text-white text-lg">
//                   Modal Title
//                 </h3>
//                 <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200">
//                   <span className="material-symbols-rounded" onClick={handleModal}>Close</span>
//                 </button>
//               </div>
//               <div className="px-4 py-8 overflow-y-auto">
//                 <p className="text-gray-800 dark:text-gray-200">
//                   This is a wider card with supporting text below as a natural lead-in to
//                   additional
//                   content.
//                 </p>
//               </div>
//               <div
//                 className="flex justify-end items-center gap-4 p-4 border-t dark:border-slate-700">
//                 <button
//                   className="btn dark:text-gray-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
//                   onClick={handleModal} type="button">Close</button>
//                 <a className="btn bg-primary text-white" href="">Save</a>
//               </div>
//             </div>
//           </ModalLayout>
//         </div>
//       </div>
//     </div>
//   )
// }

const CustomSizesModal = () => {
  const modalcontent: modalItem[] = [
    {
      title: "Small",
      size: "sm:max-w-sm",
    },
    {
      title: "Medium",
      size: "sm:max-w-md",
    },
    {
      title: "Large",
      size: "sm:max-w-lg",
    },
    {
      title: "2X Large",
      size: "sm:max-w-2xl",
    },
    {
      title: "7X Large",
      size: "sm:max-w-7xl w-[1278px]",
    },
    {
      title: "Full Width",
      size: "w-screen",
    },
    {
      title: "Full Height",
      size: "sm:max-w-5xl h-screen",
    },
    {
      title: "Full Screen",
      size: "w-screen h-screen",
    },
  ]

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalSize, setModalSize] = useState(modalcontent[0])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Sizes</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4">

          {(modalcontent || []).map((modal, idx) => {
            return (
              <React.Fragment key={idx}>
                <button className="btn bg-primary text-white" onClick={() => {
                  toggleModal();
                  setModalSize({ title: modal.title, size: modal.size })
                }}
                  type="button"
                >
                  {modal.title}
                </button>
              </React.Fragment>
            )
          })}

        </div>

        <ModalLayout
          showModal={isModalOpen}
          toggleModal={toggleModal}
          panelClassName={modalSize.size}
        >
          <div className={`${modalSize.size} duration-500  ease-out transition-all flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700`}>
            <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
              <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                {modalSize.title}
              </h3>
              <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200">
                <span className="material-symbols-rounded" onClick={toggleModal}>close</span>
              </button>
            </div>
            <div className="px-4 py-8 overflow-y-auto">
              <p className="text-gray-800 dark:text-gray-200">
                This is a wider card with supporting text below as a natural lead-in
                to additional
                content.
              </p>
            </div>
            <div className="flex justify-end items-center gap-4 p-4 border-t dark:border-slate-700">
              <button
                className="btn dark:text-gray-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
                onClick={toggleModal} type="button">Close
              </button>
              <a className="btn bg-primary text-white" href="">Save</a>
            </div>
          </div>
        </ModalLayout>


      </div>
    </div>
  )
}

const StaticBackdropModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Static Backdrop</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-2">
          <button className="btn bg-primary text-white" onClick={handleModal} type="button">
            Show Modal
          </button>

          <ModalLayout
            showModal={isModalOpen}
            toggleModal={handleModal}
            panelClassName="sm:max-w-lg"
            isStatic
            placement="justify-center items-start"
          >
            <div className="duration-500 ease-out transition-all sm:w-full m-3 sm:mx-auto flex flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
              <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                  Modal Title
                </h3>
                <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" >
                  <span className="material-symbols-rounded" onClick={handleModal}>close</span>
                </button>
              </div>
              <div className="px-4 py-8 overflow-y-auto">
                <p className="text-gray-800 dark:text-gray-200">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="flex justify-end items-center gap-4 p-4 border-t dark:border-slate-700">
                <button className="py-2 px-5 inline-flex justify-center items-center gap-2 rounded dark:text-gray-200 border dark:border-slate-700 font-medium hover:bg-slate-100 hover:dark:bg-slate-700 transition-all"
                  onClick={handleModal} type="button">Close
                </button>
                <Link className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded bg-primary hover:bg-primary-600 text-white"
                  to="#">Save</Link>
              </div>
            </div>
          </ModalLayout>
        </div>
      </div>
    </div>
  )
}

const AlignedModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Vertically & Horizontaly Centered</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex gap-2">
          <button className="btn bg-primary text-white" type="button" onClick={handleModal}>
            Show Modal
          </button>

          <ModalLayout
            showModal={isModalOpen}
            toggleModal={handleModal}
            panelClassName="sm:max-w-lg"
          >
            <div className="duration-500  ease-out transition-[opacity] sm:w-full sm:mx-auto  flex-col bg-white border shadow-sm rounded-md dark:bg-slate-800 dark:border-gray-700">
              <div className="flex justify-between items-center py-2.5 px-4 border-b dark:border-gray-700">
                <h3 className="font-medium text-gray-800 dark:text-white text-lg">
                  Modal Title
                </h3>
                <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 dark:text-gray-200" >
                  <span className="material-symbols-rounded" onClick={handleModal}>close</span>
                </button>
              </div>
              <div className="px-4 py-8 overflow-y-auto">
                <p className="text-gray-800 dark:text-gray-200">
                  This is a wider card with supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="flex justify-end items-center gap-4 p-4 border-t dark:border-slate-700">
                <button className="py-2 px-5 inline-flex justify-center items-center gap-2 rounded dark:text-gray-200 border dark:border-slate-700 font-medium hover:bg-slate-100 hover:dark:bg-slate-700 transition-all" onClick={handleModal}>Close</button>
                <Link className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded bg-primary hover:bg-primary-600 text-white" to="#">Save</Link>
              </div>
            </div>
          </ModalLayout>
        </div>
      </div>
    </div>
  )
}

const Modals = () => {
  return (
    <>
      <PageBreadcrumb title="Modal" name="Modal" breadCrumbItems={["Konrix", "Components", "Modal"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <SimpleModal />
        <StaticBackdropModal />
        <CustomSizesModal />
        <AlignedModal />
      </div>
    </>
  )
};

export default Modals