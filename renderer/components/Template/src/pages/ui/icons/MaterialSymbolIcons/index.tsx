import { PageBreadcrumb } from "../../../../components"
import { materialSymbolsIcons } from "./data"

const MaterialSymbolIcons = () => {
  return (
    <>
      <PageBreadcrumb name="Material Symbols Icons" title="Material Symbols Icons" breadCrumbItems={["Konrix", "Icons", "Material Symbols Icons"]} />
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h5 className="card-title">
              All Icons
              <span className="bg-primary/20 text-primary inline-flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs font-medium ms-2">Google Icon</span>
            </h5>
            <a href="https://fonts.google.com/icons?icon.style=Rounded" target="_blank" className="btn-code">
              <span className="me-2">Documentaion</span>
              <i className="mgc_link_2_line text-sm"></i>
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 icons-list-demo" id="icons">
            {(materialSymbolsIcons || []).map((icon, idx) => {
              return (
                <div key={idx}><i className="msr">{icon}</i><span>{icon}</span></div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default MaterialSymbolIcons