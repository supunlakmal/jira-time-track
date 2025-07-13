import { ScrollToTop, ThemeCustomizer } from "../components"
import { OffcanvasLayout } from "../components/HeadlessUI"
import { useLayout } from "../context/LayoutContext";

const RightSideBar = () => {
  const { isOpenRightSideBar, hideRightSidebar, showRightSidebar } = useLayout();

  /**
     * Toggles the right sidebar
     */
  const handleRightSideBar = () => {
    if (isOpenRightSideBar) {
      hideRightSidebar();
    } else if (!isOpenRightSideBar) {
      showRightSidebar();
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