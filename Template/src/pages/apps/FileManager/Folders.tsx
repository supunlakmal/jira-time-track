import { Link } from "react-router-dom";

// components
import { PopoverLayout } from "../../../components/HeadlessUI";

interface FolderFilesTypes {
  folderFiles: {
    name: string;
    storage: string;
    size: string;
    files: string;
  }[]
}

const Folders = ({ folderFiles }: FolderFilesTypes) => {

  const PopoverToggler = () => {
    return (
      <i className="mgc_more_2_fill text-base"></i>
    )
  }

  return (
    <>

      {(folderFiles || []).map((file, idx) => {
        return (
          <div className="card" key={idx}>
            <div className="p-5">
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex items-start relative gap-5">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14">
                      <span className="flex h-full w-full items-center justify-center">
                        <i className="mgc_folder_fill text-6xl h-full w-full fill-warning text-warning"></i>
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-base">{file.name}</p>
                      <p className="text-xs">Using {file.storage} of storage</p>
                    </div>
                  </div>
                  <div className="flex items-center absolute top-0 end-0">

                    <PopoverLayout placement="bottom-end" toggler={<PopoverToggler />} togglerClass="inline-flex text-slate-700 hover:bg-slate-100 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full p-2">
                      <div className="w-40 z-50 mt-2 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                          <i className="mgc_pencil_2_line text-lg me-3"></i>
                          Edit
                        </Link>
                        <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                          <i className="mgc_link_line text-lg me-3"></i>
                          Copy Link
                        </Link>
                        <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                          <i className="mgc_share_2_line text-lg me-3"></i>
                          Share
                        </Link>
                        <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500  hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                          <i className="mgc_download_2_line text-lg me-3"></i>
                          Download
                        </Link>
                      </div>
                    </PopoverLayout>

                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{file.size}</p>
                  <span className="p-0.5 bg-gray-600 rounded-full"></span>
                  <p className="text-sm">{file.files}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Folders