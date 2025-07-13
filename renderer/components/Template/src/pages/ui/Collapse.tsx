import { Collapse as FUCollapse } from "../../components/FrostUI";
import { PageBreadcrumb } from "../../components"

const CollapseWithTarget = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Collapse with Target</h4>
        </div>
      </div>

      <div className="p-6">
        <FUCollapse>
          <FUCollapse.Toggle className="btn bg-primary text-white">
            Collapse <i className="mgc_down_line ms-2 transition-all text-xl"></i>
          </FUCollapse.Toggle>

          <FUCollapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="pt-5 text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </FUCollapse.Menu>
        </FUCollapse>
      </div>
    </div>
  )
}

const AutoTargetCollapse = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Auto Target Collapse</h4>
        </div>
      </div>

      <div className="p-6">
        <FUCollapse>
          <FUCollapse.Toggle className="btn bg-primary text-white">
            Collapse
            <i className="mgc_down_line ms-2 transition-all text-xl"></i>
          </FUCollapse.Toggle>

          <FUCollapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="pt-5 text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </FUCollapse.Menu>
        </FUCollapse>
      </div>
    </div>
  )
}

const ReadMoreCollapse = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center pe-[15px]">
          <h4 className="card-title">Read More Collapse</h4>
        </div>
      </div>

      <div className="p-6">
        <FUCollapse>
          <FUCollapse.Toggle className="flex items-center text-primary">
            <span>Read More</span>
            <span className="hidden">less</span>
            <i className="mgc_down_line ms-2 transition-all text-xl"></i>
          </FUCollapse.Toggle>

          <FUCollapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="pt-5 text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </FUCollapse.Menu>
        </FUCollapse>
      </div>
    </div>
  )

}

const Collapse = () => {
  return (
    <>
      <PageBreadcrumb title="Collapse" name="Collapse" breadCrumbItems={["Konrix", "Components", "Collapse"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <CollapseWithTarget />
        <AutoTargetCollapse />
        <ReadMoreCollapse />
      </div>
    </>
  )
};

export default Collapse