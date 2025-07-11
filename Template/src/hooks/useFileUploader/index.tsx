import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import useFileUploader from './useFileUploader';

export interface FileType extends File {
  preview?: string;
  formattedSize?: string;
}

interface FileUploaderProps extends ChildrenProps {
  onFileUpload?: (files: FileType[]) => void;
  showPreview?: boolean;
}

type ChildrenProps = {
  icon?: string;
  text?: string;
  textClass?: string;
  extraText?: string
}

const FileUploader = ({ showPreview = true, onFileUpload, icon, extraText, text }: FileUploaderProps) => {
  const { selectedFiles, handleAcceptedFiles, removeFile } = useFileUploader(showPreview);

  return (
    <>
      <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles, onFileUpload)}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone mt-2">
            <div className="dz-message needsclick" {...getRootProps()}>
              <input {...getInputProps()} />
              <i className={`text-muted fs-36 ${icon}`} />
              <h4 className="h4">{text}</h4>
              <span className="text-muted fs-13">{extraText}</span>
            </div>
          </div>
        )}
      </Dropzone>

      {showPreview && selectedFiles.length > 0 && (
        <div className="dropzone-previews mt-3">
          {(selectedFiles || []).map((file, idx) => {
            return (
              <div className="card mt-1 mb-0 shadow-none border" key={idx + '-file'}>
                <div className="p-2">
                  <div className="align-items-center">
                    {file.preview && (
                      <div className="col-auto">
                        <img
                          data-dz-thumbnail=""
                          className="avatar-sm rounded bg-light"
                          alt={file.name}
                          src={file.preview}
                        />
                      </div>
                    )}
                    {!file.preview && (
                      <div className="col-auto">
                        <div className="avatar-sm">
                          <span className="avatar-title bg-primary rounded">
                            {file.type.split('/')[0]}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="ps-0">
                      <Link to="#" className="text-muted fw-bold">
                        {file.name}
                      </Link>
                      <p className="mb-0">
                        <strong>{file.formattedSize}</strong>
                      </p>
                    </div>
                    <div className="text-end">
                      <Link to="#" className="btn btn-link btn-lg text-muted shadow-none">
                        <i className="ri-close-line" onClick={() => removeFile(file)} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export { FileUploader };
