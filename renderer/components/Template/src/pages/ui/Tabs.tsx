import { Tab } from "@headlessui/react";
import { PageBreadcrumb } from "../../components";


interface TabContentItem {
  id: number;
  title: string;
  text: string;
  hidden?: boolean;
}

const Tabs = () => {
  const tabContents: TabContentItem[] = [
    {
      id: 1,
      title: 'Tab 1',
      text: 'Tailwind is a utility-first CSS framework that offers an extensive range of classes, including flex, pt-4, text-center, and rotate-90. These classes can be combined to construct any design directly in your markup, allowing you to build your next idea even faster. Along with its efficiency, Tailwind also provides beautifully designed, expertly crafted components and templates, making it the perfect starting point for your next project. With over 200+ professionally  designed, fully responsive, expertly crafted component examples at your disposal, you can seamlessly integrate them into your Tailwind projects and customize them according to your preferences.',
    },
    {
      id: 2,
      title: 'Tab 2',
      text: 'Tailwind Elements simplifies the process of adding a dark mode to your project. By utilizing Tailwinds classes and a dark variant, you can effortlessly integrate a dual-themed website. Our components come equipped with the dark theme variant as a default feature. Furthermore, like any Tailwind project, the default theme can be personalized by modifying the project`s color palette, type scale, fonts, breakpoints, border radius values, and other attributes through the tailwind.config.js configuration file.',
      hidden: true,
    },
    {
      id: 3,
      title: 'Tab 3',
      text: 'Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast, flexible, and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.',
      hidden: true,
    },
  ];

  return (
    <>
      <PageBreadcrumb title="Tabs" name="Tabs" breadCrumbItems={["Konrix", "Components", "Tabs"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Basic</h4>
            </div>
          </div>
          <div className="p-6">
            <Tab.Group>
              <Tab.List as="nav" className="flex space-x-3 border-b">
                {(tabContents || []).map((tab) => (
                  <Tab key={tab.title} className={({ selected }) => `py-4 px-1 inline-flex items-center gap-2 border-b-2 border-transparent -mb-px transition-all text-sm whitespace-nowrap text-gray-500 hover:text-primary ${selected ? 'border-b-primary font-semibold border-primary text-primary hover:text-primary' : 'text-gray-500 hover:text-primary'}`}>
                    {tab.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mt-2">
                {(tabContents || []).map((tab, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={'transition-all duration-300 transform'}
                  >
                    <p className="text-gray-500 dark:text-gray-400">
                      {tab.text}
                    </p>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Tabs Vertical Left   </h4>
            </div>
          </div>
          <div className="p-6">
            <div className="flex gap-3">
              <div className="grid md:grid-cols-5 gap-5">
                <Tab.Group vertical>
                  <Tab.List as="nav" className="flex md:flex-col gap-2 space-y-2" >
                    {(tabContents || []).map((tab, idx) => {
                      return (
                        <Tab key={idx} className={({ selected }) => `btn ${selected ? "bg-primary text-white" : "bg-transparent"}`}  >
                          {tab.title}
                        </Tab>
                      )
                    })}
                  </Tab.List>
                  <Tab.Panels className='md:col-span-4'>
                    {(tabContents || []).map((tab, idx) => {
                      return (
                        <Tab.Panel key={idx}>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">
                              {tab.text}
                            </p>
                          </div>
                        </Tab.Panel>
                      )
                    })}
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Card type tab</h4>
            </div>
          </div>

          <div className="p-6">
            <Tab.Group>
              <Tab.List as="nav" className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab key={idx} className={({ selected }) => ` border-b-transparent Dark:bg-gray-800 Dark:border-b-gray-800 -mb-px py-3 px-4 inline-flex items-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-t-lg  ${selected ? "text-primary bg-white" : "text-gray hover:text-gray-700 bg-gray-50"}`}  >
                      {tab.title}
                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels className="mt-3">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab.Panel key={idx}>
                      <p className="text-gray-500 dark:text-gray-400">
                        {tab.text}
                      </p>
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Bar with tab</h4>
            </div>
          </div>
          <div className="p-6">
            <Tab.Group>
              <Tab.List as="nav" className="relative z-0 flex border rounded-xl overflow-hidden dark:border-gray-700">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab key={idx} type="button" className={({ selected }) => ` relative min-w-0 flex-1 bg-white first:border-l-0 border-l border-b-2 py-4 px-4 text-gray-500 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400 ${selected ? "border-b-primary text-gray-900" : "hover:bg-gray-50 hover:text-gray-700"}`}>
                      {tab.title}
                    </Tab>
                  )
                })}
              </Tab.List>
              <Tab.Panels className="mt-3">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab.Panel key={idx} >
                      <p className="text-gray-500 dark:text-gray-400">
                        {tab.text}
                      </p>
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pill tab</h4>
            </div>
          </div>

          <div className="p-6">
            <Tab.Group >
              <Tab.List as="nav" className="flex space-x-2">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab key={idx} type="button" className={({ selected }) => ` py-3 px-4 inline-flex items-center gap-2 text-sm font-medium text-center  rounded-lg  dark:hover:text-gray-400 ${selected ? "bg-primary text-white" : "text-gray-500 hover:text-primary"}`}>
                      {tab.title}
                    </Tab>
                  )
                })}
              </Tab.List>

              <Tab.Panels className="mt-3">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab.Panel key={idx} >
                      <p className="text-gray-500 dark:text-gray-400">
                        {tab.text}
                      </p>
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Justifyed tab</h4>
            </div>
          </div>

          <div className="p-6">
            <Tab.Group>
              <Tab.List as="nav" className="flex space-x-2">
                <Tab type="button" className={({ selected }) => `${selected ? "bg-primary text-white" : "text-gray-500 hover:text-primary  bg-transparent"} flex-auto py-3 px-4 inline-flex justify-center items-center gap-2 text-center text-sm font-medium  rounded-lg  dark:hover:text-gray-400`}>
                  Tab 1
                </Tab>
                <Tab type="button" className={({ selected }) => `${selected ? "bg-primary text-white" : "text-gray-500 hover:text-primary  bg-transparent"} flex-auto py-3 px-4 inline-flex justify-center items-center gap-2 text-center text-sm font-medium  rounded-lg  dark:hover:text-gray-400`}>
                  This is the longest link I've seen
                </Tab>
                <Tab type="button" className={({ selected }) => `${selected ? "bg-primary text-white" : "text-gray-500 hover:text-primary  bg-transparent"} flex-auto py-3 px-4 inline-flex justify-center items-center gap-2 text-center text-sm font-medium  rounded-lg  dark:hover:text-gray-400`}>
                  Tab 3
                </Tab>
              </Tab.List>

              <Tab.Panels className="mt-3">
                {(tabContents || []).map((tab, idx) => {
                  return (
                    <Tab.Panel key={idx} >
                      <p className="text-gray-500 dark:text-gray-400">
                        {tab.text}
                      </p>
                    </Tab.Panel>
                  )
                })}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  )
};

export default Tabs