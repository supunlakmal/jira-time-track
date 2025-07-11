import { PlacesType, Tooltip, VariantType } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { PageBreadcrumb } from "../../components"

const PlacementTooltips = () => {

  const placements: PlacesType[] = ['bottom', 'right', 'top', 'left']

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Placement Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {(placements || []).map((placement, idx) => {
            return (
              <div key={idx}>
                <button id={`tooltip1-${idx}`} className="btn bg-primary text-white" >
                  Tooltip {placement.charAt(0).toUpperCase() + placement.slice(1)}
                </button>
                <Tooltip
                  place={placement}
                  content={`${placement.charAt(0).toUpperCase() + placement.slice(1)} tooltip`}
                  anchorId={`tooltip1-${idx}`}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const ColoredTooltips = () => {

  const colors: VariantType[] = ["success", "info", "dark", "warning"]

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Color Tooltips</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {(colors || []).map((color, idx) => {
            return (
              <div key={idx}>
                <button id={`tooltip-${idx}`} className={`btn bg-${color} text-white`}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
                <Tooltip
                  place="top"
                  content={`${color.charAt(0).toUpperCase() + color.slice(1)} Tooltip`}
                  anchorId={`tooltip-${idx}`}
                  variant={color}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const RealExampleTooltip = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Real Example</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="text-muted">
          You can use frost
          <Tooltip
            place="bottom"
            content={"Why you see at bottom"}
            anchorId="tooltip-real"
          />
          <span className="underline italic cursor-help" id="tooltip-real"> Tooltip </span>
          to specify extra information. You can also use in
          <Tooltip
            place="bottom"
            anchorId="tooltip-large"
            style={{ backgroundColor: "rgba(0,0,0,0.0)" }}
          >
            <div className="max-w-xs bg-white border border-gray-100 text-left rounded-lg dark:bg-gray-800 dark:border-gray-700 p-3">
              <p className="block text-lg font-medium">Overview</p>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <img alt="images" className="mb-3 rounded" src="https://placehold.co/300x150" />
                <p>This is a popover body with supporting text below as a natural lead-in to additional
                  content.</p>
                <dl className="mt-3">
                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Assigned to:</dt>
                  <dd className="text-gray-600 dark:text-gray-400">Charles East</dd>
                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Due:</dt>
                  <dd className="text-gray-600 dark:text-gray-400">March 20, 2023</dd>
                </dl>
              </div></div>
          </Tooltip>
          <span className="underline italic cursor-help" id="tooltip-large"> large </span>
          Tooltip
        </div>
      </div>
    </div>
  )
}

const Tooltips = () => {
  return (
    <>
      <PageBreadcrumb title="Tooltip" name="Tooltip" breadCrumbItems={["Konrix", "Components", "Tooltip"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <PlacementTooltips />
        <ColoredTooltips />
        <RealExampleTooltip />
      </div>
    </>
  )
};

export default Tooltips