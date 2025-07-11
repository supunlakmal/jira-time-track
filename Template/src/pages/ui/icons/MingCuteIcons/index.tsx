import { PageBreadcrumb } from "../../../../components"
import { mingCuteIconList } from "./data"

const MingCuteIcons = () => {
  return (
    <>
      <PageBreadcrumb name="MingCute" title="MingCute Icons" breadCrumbItems={["Konrix", "Icons", "MingCute"]} />
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h5 className="card-title">
              All Icons
            </h5>
            <a href="https://www.mingcute.com/" target="_blank" className="btn-code">
              <span className="me-2">Documentaion</span>
              <i className="mgc_link_2_line text-sm"></i>
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 icons-list-demo" id="icons">

            {(mingCuteIconList || []).map((icon, idx) => {
              return (
                <div key={idx}><i className={icon}></i><span>{icon}</span> </div>
              )
            })}

          </div>
        </div>
      </div>
    </>
  )
}

export default MingCuteIcons