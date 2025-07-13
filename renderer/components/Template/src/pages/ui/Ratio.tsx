import { PageBreadcrumb } from "../../components"

const Ratio = () => {
  return (
    <>
      <PageBreadcrumb title="Aspect Ratio" name="Aspect Ratio" breadCrumbItems={["Konrix", "Components", "Aspect Ratio"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Aspect Ratio 21:9</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-w-7 aspect-h-3">
              <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4" title="Embed Video Ratio"></iframe>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Aspect Ratio 16:9</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4" title="Embed Video Ratio"></iframe>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Aspect Ratio 1:1</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-w-1 aspect-h-1">
              <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4" title="Embed Video Ratio"></iframe>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Aspect Ratio 4:3</h4>
            </div>
          </div>
          <div className="p-6">
            <div className="aspect-w-4 aspect-h-3">
              <iframe src="https://www.youtube.com/embed/PrUxWZiQfy4" title="Embed Video Ratio"></iframe>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Ratio