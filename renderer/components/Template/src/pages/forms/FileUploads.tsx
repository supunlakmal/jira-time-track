import { FileUploader } from "../../components";
import { PageBreadcrumb } from "../../components";

const FileUploads = () => {
  return (
    <>
      <PageBreadcrumb name="File Upload" title="File Upload" breadCrumbItems={["Konrix", "Form", "File Upload"]} />

      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Dropzone</h4>
          </div>
        </div>

        <div className="p-6">

          <FileUploader
            icon='mgc_upload_3_line text-4xl text-gray-300 dark:text-gray-200'
            text='Drop files here or click to upload.'
          />

          <div className="text-center mt-4">
            <button type="button" className="btn bg-violet-500 border-violet-500 text-white">Send Files</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default FileUploads