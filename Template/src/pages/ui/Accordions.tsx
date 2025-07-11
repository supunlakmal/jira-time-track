import { useState } from "react"
import { Collapse } from "../../components/FrostUI"
import { PageBreadcrumb } from "../../components"

const DefaultAccordions = () => {

  const [basicAccordion, setBasicAccordion] = useState<number | null>(0)

  const handleBasicAccordion = (index: number) => () => {
    if (index === basicAccordion) setBasicAccordion(null)
    else setBasicAccordion(index);
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Default Accordion</h4>
            <div className="flex items-center gap-2">
            </div>
          </div>
        </div>
        <div className="p-6">
          <Collapse open={basicAccordion == 0} toggleCollapse={handleBasicAccordion(0)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary"
              className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #1
              <i className="mgc_add_line block"></i>
              <i className="mgc_minimize_line hidden"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your
                HTML. The framework functions by scanning all of your HTML files, JavaScript components,
                and templates for class names, automatically generating corresponding styles, and
                writing them to a static CSS file. This approach is fast, flexible, and reliable,
                requiring zero runtime. Whether you need to create form layouts, tables, or modal
                dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web
                applications. Additionally, the framework includes checkout forms, shopping carts, and
                product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={basicAccordion == 1} toggleCollapse={handleBasicAccordion(1)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary"
              className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #2
              <i className="mgc_add_line block"></i>
              <i className="mgc_minimize_line hidden"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your
                HTML. The framework functions by scanning all of your HTML files, JavaScript components,
                and templates for class names, automatically generating corresponding styles, and
                writing them to a static CSS file. This approach is fast, flexible, and reliable,
                requiring zero runtime. Whether you need to create form layouts, tables, or modal
                dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web
                applications. Additionally, the framework includes checkout forms, shopping carts, and
                product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={basicAccordion == 2} toggleCollapse={handleBasicAccordion(2)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary"
              className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #3
              <i className="mgc_add_line block"></i>
              <i className="mgc_minimize_line hidden"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your
                HTML. The framework functions by scanning all of your HTML files, JavaScript components,
                and templates for class names, automatically generating corresponding styles, and
                writing them to a static CSS file. This approach is fast, flexible, and reliable,
                requiring zero runtime. Whether you need to create form layouts, tables, or modal
                dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web
                applications. Additionally, the framework includes checkout forms, shopping carts, and
                product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
        </div>
      </div>
    </>
  )
}

const AlwaysOpenAccordion = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handlerAccordion() {
    setIsOpen(!isOpen);
  }
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Always Open</h4>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
      <div className="p-6">
        <Collapse open={isOpen} toggleCollapse={handlerAccordion}>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #1
            <i className="mgc_add_line block"></i>
            <i className="mgc_minimize_line hidden"></i>
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>
        <Collapse>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #2
            <i className="mgc_add_line block"></i>
            <i className="mgc_minimize_line hidden"></i>
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>
        <Collapse>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #3
            <i className="mgc_add_line block"></i>
            <i className="mgc_minimize_line hidden"></i>
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>
      </div>
    </div>
  )
}

const BorderedAccordion = () => {
  const [borderAccordion, setBorderAccordion] = useState<number | null>(0)

  const handleBorderAccordion = (index: number) => () => {
    if (index === borderAccordion) setBorderAccordion(null)
    else setBorderAccordion(index);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Bordered</h4>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="rounded border divide-y border-gray-200 dark:border-gray-700 divide-slate-900/10 dark:divide-white/10">
          <Collapse open={borderAccordion === 0} toggleCollapse={handleBorderAccordion(0)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #1
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="p-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={borderAccordion === 1} toggleCollapse={handleBorderAccordion(1)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #2
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="p-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={borderAccordion === 2} toggleCollapse={handleBorderAccordion(2)}>
            <Collapse.Toggle className="p-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #3
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="p-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

const IconAccordion = () => {

  const [iconAccordion, setIconAccordion] = useState<number | null>(0)

  const handleIconAccordion = (index: number) => () => {
    if (index === iconAccordion) setIconAccordion(null)
    else setIconAccordion(index);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">With Icon</h4>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <Collapse open={iconAccordion === 0} toggleCollapse={handleIconAccordion(0)}>
            <div className="rounded border border-gray-200 dark:border-gray-700">
              <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
                <i className="mgc_store_2_line text-lg"></i>
                Accordion #1
                <i className="mgc_up_line ms-auto transition-all text-xl"></i>
              </Collapse.Toggle>
              <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
                <div className="border-t p-3 border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200">
                    Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
                  </p>
                </div>
              </Collapse.Menu>
            </div>
          </Collapse>
          <Collapse open={iconAccordion === 1} toggleCollapse={handleIconAccordion(1)}>
            <div className="rounded border border-gray-200 dark:border-gray-700">
              <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
                <i className="mgc_safe_flash_line text-lg"></i>
                Accordion #2
                <i className="mgc_up_line ms-auto transition-all text-xl"></i>
              </Collapse.Toggle>
              <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
                <div className="border-t p-3 border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200">
                    Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
                  </p>
                </div>
              </Collapse.Menu>
            </div>
          </Collapse>
          <Collapse open={iconAccordion === 2} toggleCollapse={handleIconAccordion(2)}>
            <div className="rounded border border-gray-200 dark:border-gray-700">
              <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
                <i className="mgc_home_3_line text-lg"></i>
                Accordion #3
                <i className="mgc_up_line ms-auto transition-all text-xl"></i>
              </Collapse.Toggle>
              <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
                <div className="border-t p-3 border-gray-200 dark:border-gray-700">
                  <p className="text-gray-800 dark:text-gray-200">
                    Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
                  </p>
                </div>
              </Collapse.Menu>
            </div>
          </Collapse>

        </div>
      </div>
    </div >
  )
}

const ArrowAccordion = () => {

  const [arrowAccordion, setArrowAccordion] = useState<number | null>(0)

  const handleIconAccordion = (index: number) => () => {
    if (index === arrowAccordion) setArrowAccordion(null)
    else setArrowAccordion(index);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">With arrow</h4>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="divide-y divide-slate-900/10 dark:divide-white/10">
          <Collapse open={arrowAccordion === 0} toggleCollapse={handleIconAccordion(0)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #1
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="py-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={arrowAccordion === 1} toggleCollapse={handleIconAccordion(1)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #2
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="py-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>
          <Collapse open={arrowAccordion === 2} toggleCollapse={handleIconAccordion(2)}>
            <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
              Accordion #3
              <i className="mgc_up_line ms-auto transition-all text-xl"></i>
            </Collapse.Toggle>
            <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
              <p className="py-3 text-gray-800 dark:text-gray-200">
                Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
              </p>
            </Collapse.Menu>
          </Collapse>

        </div>
      </div>
    </div>
  )
}

const NoArrowAccordion = () => {

  const [noArrowAccordion, setNoArrowAccordion] = useState<number | null>(0)

  const handleIconAccordion = (index: number) => () => {
    if (index === noArrowAccordion) setNoArrowAccordion(null)
    else setNoArrowAccordion(index);
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">No arrow</h4>
          <div className="flex items-center gap-2">
          </div>
        </div>
      </div>
      <div className="p-6">
        <Collapse open={noArrowAccordion === 0} toggleCollapse={handleIconAccordion(0)}>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #1
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>
        <Collapse open={noArrowAccordion === 1} toggleCollapse={handleIconAccordion(1)}>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #2
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>
        <Collapse open={noArrowAccordion === 2} toggleCollapse={handleIconAccordion(2)}>
          <Collapse.Toggle openClass="text-primary hover:text-primary" className="py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
            Accordion #3
          </Collapse.Toggle>
          <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
            <p className="text-gray-800 dark:text-gray-200">
              Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
            </p>
          </Collapse.Menu>
        </Collapse>

      </div>
    </div>
  )
}
const Accordions = () => {

  return (
    <>
      <PageBreadcrumb title="Accordion" name="Accordion" breadCrumbItems={["Konrix", "Components", "Accordion"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <DefaultAccordions />
        <AlwaysOpenAccordion />
        <BorderedAccordion />
        <IconAccordion />
        <ArrowAccordion />
        <NoArrowAccordion />
      </div>
    </>
  )
}

export default Accordions