import { useState } from 'react';

// hooks
import { useViewPort } from '../../../hooks';

// components
import Folders from './Folders'
import LeftPanel from './LeftPanel';
import Recent from './Recent';
import { PageBreadcrumb } from '../../../components';
import { OffcanvasLayout } from '../../../components/HeadlessUI';

// dummy data
import { folderFiles, recentFiles } from './data'

const FileManagerApp = () => {

  const [leftPanelOpen, setLeftPanelOpen] = useState<boolean>(false)

  const { width } = useViewPort()

  const handleLeftPanel = () => {
    setLeftPanelOpen(!leftPanelOpen);
  }

  return (
    <>
      <PageBreadcrumb title='File Manager' name='File Manager' breadCrumbItems={["Konrix", "Apps", "File Manager"]} />
      <div className="flex">

        {(width >= 1024) ? (
          <div className="lg:block hidden top-0 left-0 transform h-full min-w-[16rem] me-6 card rounded-none lg:rounded-md lg:z-0 z-50 fixed lg:static lg:translate-x-0 -translate-x-full transition-all duration-300" tabIndex={-1}>
            <LeftPanel />
          </div>
        ) : (
          <OffcanvasLayout open={leftPanelOpen} toggleOffcanvas={handleLeftPanel} placement="start" sizeClassName="w-64 max-w-[16rem]">
            <LeftPanel />
          </OffcanvasLayout>
        )}

        <div className="w-full">
          <div className="grid 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">

            <div className="2xl:col-span-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div className="lg:hidden block">
                  <button className="inline-flex items-center justify-center text-gray-700 border border-gray-300 rounded shadow hover:bg-slate-100 dark:text-gray-400 hover:dark:bg-gray-800 dark:border-gray-700 transition h-9 w-9 duration-100"
                    onClick={handleLeftPanel}
                  >
                    <div className="mgc_menu_line text-lg"></div>
                  </button>
                </div>
                <h4 className="text-xl">Folders</h4>

                <form className="ms-auto">
                  <div className="flex items-center">
                    <input type="text" className="form-input  rounded-full" placeholder="Search files..." />
                    <span className="mgc_search_line text-xl -ms-8"></span>
                  </div>
                </form>
              </div>
            </div>

            <Folders folderFiles={folderFiles} />
            <Recent recentFiles={recentFiles} />
          </div>
        </div>
      </div>
    </>
  )
};

export default FileManagerApp