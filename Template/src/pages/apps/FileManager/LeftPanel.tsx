import { Link } from "react-router-dom"

// components
import { PopoverLayout } from "../../../components/HeadlessUI"

const LeftPanel = () => {

  const PopoverToggler = () => {
    return (
      <>
        <i className="mgc_add_line text-lg me-2"></i> Create New
      </>
    )
  }

  return (
    <>
      <div className="p-5">
        <div className="relative">

          <PopoverLayout placement="bottom" togglerClass="btn inline-flex justify-center items-center bg-primary text-white w-full" toggler={<PopoverToggler />}>
            <div className="w-full min-w-[216px] mt-1 z-50 transition-all duration-300 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg p-2">
              <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                <i className="mgc_folder_line text-lg me-2 w-4"></i>
                <span>Folder</span>
              </Link>
              <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                <i className="mgc_file_line text-lg me-2 w-4"></i>
                <span>File</span>
              </Link>
              <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                <i className="mgc_document_2_line text-lg me-2 w-4"></i>
                <span>Document</span>
              </Link>
              <Link className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" to="#">
                <i className="mgc_upload_2_line text-lg me-2 w-4"></i>
                <span>Choose File</span>
              </Link>
            </div>
          </PopoverLayout>

        </div>

        <div className="space-y-2 mt-4">
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_home_3_line text-lg me-3.5 w-4"></i>
            <span>Home</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_document_2_line text-lg me-3.5 w-4"></i>
            <span>Documents</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_download_2_line text-lg me-3.5 w-4"></i>
            <span>Downloads</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_music_line text-lg me-3.5 w-4"></i>
            <span>Music</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i data-feather="image" className="mgc_pic_2_line text-lg me-3.5 w-4"></i>
            <span>Pictures</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_play_line text-lg me-3.5 w-4"></i>
            <span>Video</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_time_line text-lg me-3.5 w-4"></i>
            <span>Recent</span>
          </Link>
          <Link to="#" className="flex items-center py-2 px-4 text-sm rounded text-gray-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" id="headingOne">
            <i className="mgc_delete_line text-lg me-3.5 w-4"></i>
            <span>Bin</span>
          </Link>
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 open:opacity-0">Free</span>
          <h6 className="text-uppercase mt-3">Storage</h6>
          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 mt-4">
            <div className="flex flex-col justify-center overflow-hidden bg-primary" role="progressbar" style={{ width: "46%" }}></div>
          </div>
          <p className="text-gray-500 mt-4 text-xs">7.02 GB (46%) of 15 GB used</p>
        </div>
      </div>
    </>
  )
}

export default LeftPanel