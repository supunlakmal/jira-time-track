import ReactQuill from "react-quill";

// styles
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { PageBreadcrumb } from "../../components";

const Editor = () => {
  let valueBubble = ''
  let valueSnow = ''
  valueSnow = valueBubble = `<h3><span class="ql-size-large">Hello World!</span></h3>
      <p><br/></p>
      <h3>This is an simple editable area.</h3>
      <p><br/></p>
      <ul>
        <li>Select a text to reveal the toolbar.</li>
        <li>Edit rich document on-the-fly, so elastic!</li>
      </ul>
  <p><br/></p>
  <p>End of simple area</p>`

  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: [false, 1, 2, 3, 4, 5, 6] }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["direction", { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ]
  }
  return (
    <>
      <PageBreadcrumb name="Editor" title="Form Editor" breadCrumbItems={["Konrix", "Forms", "Editor"]} />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Snow Editor</h4>
            </div>
          </div>
          <div className="p-6">
            <ReactQuill id="snow-editor" modules={modules} defaultValue={valueSnow} theme="snow" />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Bubble Editor</h4>
            </div>
          </div>
          <div className="p-6">
            <ReactQuill id="bubble-editor" defaultValue={valueBubble} theme="bubble" style={{ height: 300 }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Editor