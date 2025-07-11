import { Link } from "react-router-dom";

// components
import { PopoverLayout } from "../../../components/HeadlessUI";

interface RecentFileTypes {
  recentFiles: {
    name: string;
    modifiedDate: string;
    modifiedBy: string;
    size: string;
    owner: string;
    members: {
      image: string;
    }[];
  }[]
}
const Recent = ({ recentFiles }: RecentFileTypes) => {

  const PopoverToggler = () => {
    return (
      <i className="mgc_more_2_fill text-base"></i>
    )
  }

  return (
    <>
      <div className="2xl:col-span-4 sm:col-span-2">
        <div className="card">
          <div className="card-header">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-300">Recent Files</h4>
          </div>

          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr className="text-gray-800 dark:text-gray-300">
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold min-w-[10rem]">File Name</th>
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold min-w-[10rem]">Last Modified</th>
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold min-w-[6rem]">File Size</th>
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold min-w-[8rem]">Owner</th>
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold min-w-[6rem]">Members</th>
                        <th scope="col" className="p-3.5 text-sm text-start font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {(recentFiles || []).map((file, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                              <Link to="#" className="font-medium">{file.name}</Link>
                            </td>
                            <td className="p-3.5 text-sm text-gray-700 dark:text-gray-400">
                              <p>{file.modifiedDate}</p>
                              <span className="text-xs">by {file.modifiedBy}</span>
                            </td>
                            <td className="p-3.5 text-sm text-gray-700 dark:text-gray-400">{file.size}</td>
                            <td className="p-3.5 text-sm text-gray-700 dark:text-gray-400">{file.owner}</td>
                            <td className="p-3.5">
                              <div className="flex -space-x-1.5">
                                {(file.members || []).map((member, idx) => (
                                  <img key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-700" src={member.image} alt="Image Description" />
                                ))}
                              </div>
                            </td>
                            <td className="p-3.5">
                              <div>

                                <PopoverLayout placement="bottom-end" togglerClass="inline-flex text-slate-700 hover:bg-slate-100 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full p-2" toggler={<PopoverToggler />}>
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
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recent