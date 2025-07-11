
import * as LayoutConstants from '../../constants/layout'

interface LayoutDirectionProps {
  handleChangeLayoutDirection: (value: any) => void;
  layoutDirection?: string;
  layoutConstants: typeof LayoutConstants.LayoutDirection;
}

const LayoutDirection = ({
  handleChangeLayoutDirection,
  layoutDirection,
  layoutConstants,
}: LayoutDirectionProps) => {

  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Direction</h5>
        <div className="grid grid-cols-3 gap-2">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="dir"
              id="direction-ltr"
              value={layoutConstants.LEFT_TO_RIGHT}
              onChange={(e) => handleChangeLayoutDirection(e.target.value)}
              checked={layoutDirection === layoutConstants.LEFT_TO_RIGHT}
            />
            <label className="form-label rounded-md" htmlFor="direction-ltr">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_align_left_line text-2xl"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> LTR </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="dir"
              id="direction-rtl"
              value={layoutConstants.RIGHT_TO_LEFT}
              onChange={(e) => handleChangeLayoutDirection(e.target.value)}
              checked={layoutDirection === layoutConstants.RIGHT_TO_LEFT}
            />
            <label className="form-label rounded-md" htmlFor="direction-rtl">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_align_right_line text-2xl"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> RTL </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutDirection