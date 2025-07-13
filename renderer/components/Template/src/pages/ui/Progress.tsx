import { PageBreadcrumb } from "../../components";

const heights: string[] = ["25%", "50%", "75%", "90%", "17%"];
const colors: string[] = [
  "bg-indigo-600 w-3/12",
  "bg-purple-600 w-4/12",
  "bg-blue-600 w-5/12",
  "bg-green-600 w-6/12",
  "bg-yellow-600 w-7/12",
  "bg-red-600 w-8/12",
]

const BasicProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Basic Examples</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 ">
          <div className="flex flex-col justify-center overflow-hidden bg-primary" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
      </div>
    </div>
  )
}

const LabelledProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Labels Examples</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
          <div className="flex flex-col justify-center overflow-hidden bg-primary text-xs text-white text-center" role="progressbar" style={{ width: "57%" }} aria-valuenow={57} aria-valuemin={0} aria-valuemax={100}>57%</div>
        </div>
      </div>
    </div>
  )
}

const HeightProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Height</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div className="flex flex-col justify-center overflow-hidden bg-primary" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div className="flex flex-col justify-center overflow-hidden bg-primary" role="progressbar" style={{ width: "50%" }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <div className="flex w-full h-6 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div className="flex flex-col justify-center overflow-hidden bg-primary" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const VerticalProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Vertical Progress</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex space-x-8">
          {(heights || []).map((height, idx) => {
            return (
              <div key={idx} className="flex flex-col flex-nowrap justify-end w-2 h-32 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                <div className="bg-primary overflow-hidden" role="progressbar" style={{ height: `${height}` }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

const MultipleProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Multiple Bars</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
          <div className="flex flex-col justify-center overflow-hidden bg-sky-400" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
          <div className="flex flex-col justify-center overflow-hidden bg-sky-700" role="progressbar" style={{ width: "15%" }} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100}></div>
          <div className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-white" role="progressbar" style={{ width: "30%" }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}></div>
          <div className="flex flex-col justify-center overflow-hidden bg-orange-600" role="progressbar" style={{ width: "5%" }} aria-valuenow={5} aria-valuemin={0} aria-valuemax={100}></div>
        </div>
      </div>
    </div>
  )
}

const StripedProgressBar = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Striped Progressbar</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col items-center justify-center gap-3">
          {(colors || []).map((color, idx) => {
            return (
              <div key={idx} className="w-full h-4 bg-black/10 rounded-full">
                <div className={`${color} h-4 rounded-full animate-strip`} style={{ backgroundImage: "linear-gradient(45deg,hsla(0,0%,100%,.15) 25%,transparent 0,transparent 50%,hsla(0,0%,100%,.15) 0,hsla(0,0%,100%,.15) 75%,transparent 0,transparent)", backgroundSize: "1rem 1rem" }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const Progress = () => {
  return (
    <>
      <PageBreadcrumb title="Progress" name="Progress" breadCrumbItems={["Konrix", "Components", "Progress"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <BasicProgressBar />
        <LabelledProgressBar />
        <HeightProgressBar />
        <VerticalProgressBar />
        <MultipleProgressBar />
        <StripedProgressBar />
      </div>
    </>
  )
};

export default Progress