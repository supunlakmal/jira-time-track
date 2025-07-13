import React, { useState } from "react"

// Components
import { PageBreadcrumb } from "../../components"
import { OffcanvasLayout } from "../../components/HeadlessUI";

interface OffCanvasItem {
  title?: string;
  size: string;
  position: 'end' | 'start' | 'top' | 'bottom';
}
const DefaultOffCanvas = () => {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const handlerOffcanvas = () => {
    setIsOpen(!isopen);
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Default</h4>
        </div>
      </div>
      <div className="p-6">
        <button className="bg-primary text-white hover:bg-primary-600 py-2 px-4 rounded transition-all"
          onClick={handlerOffcanvas}>
          Open Offcanvas
        </button>
        <OffcanvasLayout placement="start" open={isopen} sizeClassName="max-w-xs w-full" toggleOffcanvas={handlerOffcanvas}>
          <div className="flex justify-between items-center py-2 px-4 border-b dark:border-gray-700">
            <h3 className="font-medium">
              Offcanvas title
            </h3>
            <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700  text-sm dark:text-gray-500 dark:hover:text-gray-400" >
              <span className="material-symbols-rounded" onClick={handlerOffcanvas}>close</span>
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-800 dark:text-gray-400">
              Some text as placeholder. In real life you can have the elements you have
              chosen. Like, text, images, lists, etc.
            </p>
          </div>
        </OffcanvasLayout>
      </div>
    </div>
  )
}

const PositionsOffCanvas = () => {
  const offCanvasContents: OffCanvasItem[] = [
    {
      title: "Left",
      position: "start",
      size: "max-w-xs w-full"
    },
    {
      title: "Top",
      position: "top",
      size: "max-h-40 h-full w-full"
    },
    {
      title: "Right",
      position: "end",
      size: "h-full max-w-xs w-full"
    },
    {
      title: "Bottom",
      position: "bottom",
      size: "max-h-40 h-full w-full"
    },
  ]

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false)
  const [OffcanvasPosition, setOffcanvasPosition] = useState(offCanvasContents[0])

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Positions</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-4">

          {(offCanvasContents || []).map((offCanvas, idx) => {
            return (
              <React.Fragment key={idx}>
                <button className="btn bg-primary text-white" onClick={() => {
                  toggleOffcanvas();
                  setOffcanvasPosition({ position: offCanvas.position, size: offCanvas.size })
                }}>
                  {offCanvas.title}
                </button>
              </React.Fragment>
            )
          })}

        </div>
      </div>
      <OffcanvasLayout open={isOffcanvasOpen} placement={OffcanvasPosition.position} toggleOffcanvas={toggleOffcanvas} sizeClassName={OffcanvasPosition.size}>
        <div className="flex justify-between items-center py-2 px-4 border-b dark:border-gray-700">
          <h3 className="font-medium">
            Offcanvas title
          </h3>
          <button className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700  text-sm dark:text-gray-500 dark:hover:text-gray-400" >
            <span className="material-symbols-rounded" onClick={toggleOffcanvas}>close</span>
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-800 dark:text-gray-400">
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </p>
        </div>
      </OffcanvasLayout>
    </div >
  )
}

const Offcanvas = () => {
  return (
    <>
      <PageBreadcrumb title="offcanvas" name="offcanvas" breadCrumbItems={["Konrix", "Components", "offcanvas"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <DefaultOffCanvas />
        <PositionsOffCanvas />
      </div>
    </>
  )
};

export default Offcanvas