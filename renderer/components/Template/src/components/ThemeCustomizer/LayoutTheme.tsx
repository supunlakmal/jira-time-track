import * as LayoutConstants from "../../constants/layout";

interface LayoutThemeProps {
  handleChangeLayoutTheme: (value: any) => void;
  layoutTheme?: string;
  layoutConstants: typeof LayoutConstants.LayoutTheme;
}

const LayoutTheme = ({
  handleChangeLayoutTheme,
  layoutTheme,
  layoutConstants,
}: LayoutThemeProps) => {
  return (
    <>
      <div className="p-6">
        <h5 className="font-semibold text-sm mb-3">Theme</h5>
        <div className="grid grid-cols-3 gap-2">
          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-mode"
              id="layout-color-light"
              value={layoutConstants.THEME_LIGHT}
              onChange={(e) => handleChangeLayoutTheme(e.target.value)}
              checked={layoutTheme === layoutConstants.THEME_LIGHT}
            />
            <label className="form-label rounded-md" htmlFor="layout-color-light">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_sun_line text-2xl"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Light </div>
          </div>

          <div className="card-radio">
            <input
              className="form-radio"
              type="radio"
              name="data-mode"
              id="layout-color-dark"
              value={layoutConstants.THEME_DARK}
              onChange={(e) => handleChangeLayoutTheme(e.target.value)}
              checked={layoutTheme === layoutConstants.THEME_DARK}
            />
            <label className="form-label rounded-md" htmlFor="layout-color-dark">
              <span className="flex items-center justify-center px-4 py-3">
                <i className="mgc_moon_line text-2xl"></i>
              </span>
            </label>
            <div className="mt-1 text-md font-medium text-center text-gray-600 dark:text-gray-300"> Dark </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutTheme;
