import * as LayoutConstants from "../../constants/layout";

interface TopBarThemeProps {
  handleChangeTopBarTheme: (value: any) => void;
  topBarTheme?: string;
  layoutConstants: typeof LayoutConstants.TopBarTheme;
}

const TopBarTheme = ({
  handleChangeTopBarTheme,
  topBarTheme,
  layoutConstants,
}: TopBarThemeProps) => {
  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Topbar Color</h5>
        <div className="grid grid-cols-4 gap-2">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-topbar-color"
              id="topbar-color-light"
              value={layoutConstants.TOPBAR_LIGHT}
              onChange={(e) => handleChangeTopBarTheme(e.target.value)}
              checked={topBarTheme === layoutConstants.TOPBAR_LIGHT}
            />
            <label className="form-label rounded-md" htmlFor="topbar-color-light">
              <span className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-900">
                <span className="w-5 h-5 shadow-lg rounded-full bg-white"></span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Light </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-topbar-color"
              id="topbar-color-dark"
              value={layoutConstants.TOPBAR_DARK}
              onChange={(e) => handleChangeTopBarTheme(e.target.value)}
              checked={topBarTheme === layoutConstants.TOPBAR_DARK}
            />
            <label className="form-label rounded-md" htmlFor="topbar-color-dark">
              <span className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-900">
                <span className="w-5 h-5 shadow-lg rounded-full bg-dark"></span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Dark </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-topbar-color"
              id="topbar-color-brand"
              value={layoutConstants.TOPBAR_BRAND}
              onChange={(e) => handleChangeTopBarTheme(e.target.value)}
              checked={topBarTheme === layoutConstants.TOPBAR_BRAND}
            />
            <label className="form-label rounded-md" htmlFor="topbar-color-brand">
              <span className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-900">
                <span className="w-5 h-5 shadow-lg rounded-full bg-primary"></span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Brand </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-topbar-color"
              id="topbar-color-gradient"
              value={layoutConstants.TOPBAR_GRADIENT}
              onChange={(e) => handleChangeTopBarTheme(e.target.value)}
              checked={topBarTheme === layoutConstants.TOPBAR_GRADIENT}
            />
            <label className="form-label rounded-md" htmlFor="topbar-color-gradient">
              <span className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-900">
                <span className="w-5 h-5 shadow-lg rounded-full" style={{ background: "linear-gradient(135deg, #6379c3 0%, #546ee5 60%)" }}></span>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Gradient </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TopBarTheme