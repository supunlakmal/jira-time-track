import { ScrollToTop, ThemeCustomizer } from "../components"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useDispatch } from "react-redux"
import { hideRightSidebar, showRightSidebar } from "../redux/actions"
import { OffcanvasLayout } from "../components/HeadlessUI"

const RightSideBar = () => {
  const dispatch = useDispatch();
  const { isOpenRightSideBar } = useSelector((state: RootState) => ({
    isOpenRightSideBar: state.Layout.isOpenRightSideBar,
  }));

  /**
     * Toggles the right sidebar
     */
  const handleRightSideBar = () => {
    if (isOpenRightSideBar) {
      dispatch(hideRightSidebar());
    } else if (!isOpenRightSideBar) {
      dispatch(showRightSidebar());
    }
  };

  return (
    <>
      <ScrollToTop />

      <div className="fixed end-0 bottom-20">
        <button type="button" className="bg-white rounded-s-full shadow-lg p-2.5 ps-3 transition-all dark:bg-slate-800" onClick={handleRightSideBar}>
          <span className="sr-only">Setting</span>
          <span className="flex items-center justify-center animate-spin">
            <i className="mgc_settings_4_line text-2xl"></i>
          </span>
        </button>
      </div>

      <OffcanvasLayout open={isOpenRightSideBar} toggleOffcanvas={handleRightSideBar} sizeClassName="w-96 max-w-sm">
        <ThemeCustomizer handleRightSideBar={handleRightSideBar} />
      </OffcanvasLayout>
    </>
  )
}

export default RightSideBar