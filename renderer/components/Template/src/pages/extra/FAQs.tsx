import { Collapse } from "../../components/FrostUI";
import { PageBreadcrumb } from "../../components";

interface FAQItem {
  icon: string;
  question: string;
}

const FAQs = () => {

  const faqs: FAQItem[] = [
    {
      icon: 'mgc_store_2_line',
      question: 'What is Lorem Ipsum?'
    },
    {
      icon: 'mgc_safe_flash_line',
      question: 'My team has credits. How do we use them?'
    },
    {
      icon: 'mgc_home_3_line',
      question: "How does Admin's pricing work?",
    },
    {
      icon: 'mgc_safe_flash_line',
      question: 'How secure is FrostUI?',
    },
    {
      icon: 'mgc_home_3_line',
      question: 'How do I get access to a theme I purchased?',
    },
    {
      icon: 'mgc_safe_flash_line',
      question: 'Upgrade License Type',
    }
  ]

  return (
    <>
      <PageBreadcrumb title='FAQ' name='FAQ' breadCrumbItems={["Konrix", "Extra Pages", "FAQ"]} />

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">

          {(faqs || []).map((faq, idx) => (
            <div className="card" key={idx}>
              <Collapse >
                <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
                  <i className={`${faq.icon} text-lg`}></i>
                  {faq.question}
                  <i className="mgc_up_line ms-auto transition-all text-xl"></i>
                </Collapse.Toggle>
                <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
                  <div className="border-t p-3 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">
                      Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
                    </p>
                  </div>
                </Collapse.Menu>
              </Collapse>
            </div>
          ))}

        </div>

        <div className="space-y-4">

          {(faqs || []).map((faq, idx) => (
            <div className="card" key={idx}>
              <Collapse >
                <Collapse.Toggle openClass="text-primary hover:text-primary" className="p-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400">
                  <i className={`${faq.icon} text-lg`}></i>
                  {faq.question}
                  <i className="mgc_up_line ms-auto transition-all text-xl"></i>
                </Collapse.Toggle>
                <Collapse.Menu className="w-full overflow-hidden transition-[height] duration-300">
                  <div className="border-t p-3 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">
                      Tailwind CSS offers a seamless way to build modern websites without having to leave your HTML. The framework functions by scanning all of your HTML files, JavaScript components, and templates for class names, automatically generating corresponding styles, and writing them to a static CSS file. This approach is fast and reliable, requiring zero runtime. Whether you need to create form layouts, tables, or modal dialogs, Tailwind CSS provides everything necessary to design beautiful, responsive web applications. Additionally, the framework includes checkout forms, shopping carts, and product views, making it the ideal choice for developing your next e-commerce front-end.
                    </p>
                  </div>
                </Collapse.Menu>
              </Collapse>
            </div>
          ))}

        </div>
      </div>
    </>
  )
};

export default FAQs