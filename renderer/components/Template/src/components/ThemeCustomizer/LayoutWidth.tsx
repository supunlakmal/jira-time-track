
import * as LayoutConstants from "../../constants/layout";

interface LayoutWidthProps {
  handleChangeLayoutWidth: (value: any) => void;
  layoutWidth?: string;
  layoutConstants: typeof LayoutConstants.LayoutWidth;
}

const LayoutWidth = ({
  handleChangeLayoutWidth,
  layoutWidth,
  layoutConstants,
}: LayoutWidthProps) => {
  return (
    <>
      <div className="p-6 2xl:block hidden">
        <h5 className="font-semibold text-sm mb-3">Content Width</h5>
        <div className="grid grid-cols-3 gap-2">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-layout-width"
              id="layout-mode-default"
              value={layoutConstants.LAYOUT_WIDTH_FLUID}
              onChange={(e) => handleChangeLayoutWidth(e.target.value)}
              checked={layoutWidth === layoutConstants.LAYOUT_WIDTH_FLUID}
            />
            <label className="form-label rounded-md" htmlFor="layout-mode-default">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_fullscreen_2_line text-2xl rotate-45"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Fluid </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-layout-width"
              id="layout-mode-boxed"
              value={layoutConstants.LAYOUT_WIDTH_BOXED}
              onChange={(e) => handleChangeLayoutWidth(e.target.value)}
              checked={layoutWidth === layoutConstants.LAYOUT_WIDTH_BOXED}
            />
            <label className="form-label rounded-md" htmlFor="layout-mode-boxed">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_fullscreen_exit_2_line text-2xl rotate-45"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Boxed </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutWidth