
import * as LayoutConstants from "../../constants/layout";

interface SideBarThemeProps {
  handleChangeSideBarTheme: (value: any) => void;
  sideBarTheme?: string;
  layoutConstants: typeof LayoutConstants.SideBarTheme;
}

const SideBarTheme = ({
  handleChangeSideBarTheme,
  sideBarTheme,
  layoutConstants,
}: SideBarThemeProps) => {
  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Menu Color</h5>
        <div className="grid grid-cols-4 gap-2">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-menu-color"
              id="menu-color-light"
              value={layoutConstants.LEFT_SIDEBAR_THEME_LIGHT}
              onChange={(e) => handleChangeSideBarTheme(e.target.value)}
              checked={sideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_LIGHT}
            />
            <label className="form-label rounded-md" htmlFor="menu-color-light">
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
              name="data-menu-color"
              id="menu-color-dark"
              value={layoutConstants.LEFT_SIDEBAR_THEME_DARK}
              onChange={(e) => handleChangeSideBarTheme(e.target.value)}
              checked={sideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_DARK}
            />
            <label className="form-label rounded-md" htmlFor="menu-color-dark">
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
              name="data-menu-color"
              id="menu-color-brand"
              value={layoutConstants.LEFT_SIDEBAR_THEME_BRAND}
              onChange={(e) => handleChangeSideBarTheme(e.target.value)}
              checked={sideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_BRAND}
            />
            <label className="form-label rounded-md" htmlFor="menu-color-brand">
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
              name="data-menu-color"
              id="menu-color-gradient"
              value={layoutConstants.LEFT_SIDEBAR_THEME_GRADIENT}
              onChange={(e) => handleChangeSideBarTheme(e.target.value)}
              checked={sideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_GRADIENT}
            />
            <label className="form-label rounded-md" htmlFor="menu-color-gradient">
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

export default SideBarTheme