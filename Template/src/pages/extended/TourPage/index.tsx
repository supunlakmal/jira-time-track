import { useState } from "react";
import Joyride, { STATUS } from "react-joyride";

//images
import logoDark from '../../../assets/images/logo-dark.png'
import logoLight from '../../../assets/images/logo-light.png'
import { PageBreadcrumb } from "../../../components";

const TourPage = () => {
  const [run, setRun] = useState<boolean>(true);
  const [steps] = useState([
    {
      content: <h3>Let's begin our journey!</h3>,
      locale: { skip: <div aria-label="skip">Skip</div> },
      placement: "center",
      target: "#logo-tour",
    },
    {
      content: <p>You can find here status of user who's currently online.</p>,
      placement: "bottom",
      target: "#logo-tour",
      title: "Logo here",
    },
    {
      content: <p>Click on the button and make sidebar navigation small.</p>,
      placement: "top",
      target: "#display-title-tour",
      title: "Display Text",
    },
    {
      content: <p>Here you can change theme skins and other features.</p>,
      placement: "top",
      target: "#thankyou-tour",
      title: "Thank you !",
      locale: { last: <strong aria-label="last">Done</strong> },
    },
  ]);

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(true);
    }
  };

  return (
    <>
      <PageBreadcrumb title="Tour Page" name="Tour Page" breadCrumbItems={["Konrix", "Extended", "Tour Page"]} />
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        run={run}
        scrollToFirstStep={true}
        showSkipButton={true}
        steps={steps}
      />
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h4 className="card-title">Page Tour (react-joyride)</h4>
          </div>
        </div>

        <div className="p-6">
          <div className="">
            <div className="text-center mb-6">
              <div className="inline-flex justify-center py-3 px-2" id="logo-tour">
                <img src={logoDark} className="h-5 block dark:hidden" alt="logo" />
                <img src={logoLight} className="h-5 hidden dark:block" alt="logo" />
              </div>
              <h5 className="text-base">Responsive Admin Dashboard Template</h5>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-6">
              <div className="p-6" id="tour-card-one">
                <i className="mgc_cellphone_line text-4xl text-gray-800 dark:text-white"></i>
                <div className="bg-gradient-to-r from-gray-200 to-white/0 h-0.5 mt-6 dark:from-gray-700 dark:to-slate-900/0">
                  <div className="bg-gray-400 w-9 h-0.5"></div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Responsive</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">Responsive, and mobile-first project on the web</p>
                </div>
              </div>

              <div className="p-6" id="tour-card-two">
                <i className="mgc_settings_2_line text-4xl text-gray-800 dark:text-white"></i>
                <div className="bg-gradient-to-r from-gray-200 to-white/0 h-0.5 mt-6 dark:from-gray-700 dark:to-slate-900/0">
                  <div className="bg-gray-400 w-9 h-0.5"></div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Customizable</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">Components are easily customized and extendable</p>
                </div>
              </div>

              <div className="p-6" id="tour-card-three">
                <i className="mgc_document_2_line text-4xl text-gray-800 dark:text-white"></i>
                <div className="bg-gradient-to-r from-gray-200 to-white/0 h-0.5 mt-6 dark:from-gray-700 dark:to-slate-900/0">
                  <div className="bg-gray-400 w-9 h-0.5"></div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Documentation</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">Every component and plugin is well documented</p>
                </div>
              </div>

              <div className="p-6" id="tour-card-four">
                <div className="mgc_message_2_line text-4xl text-gray-800 dark:text-white"></div>
                <div className="bg-gradient-to-r from-gray-200 to-white/0 h-0.5 mt-6 dark:from-gray-700 dark:to-slate-900/0">
                  <div className="bg-gray-400 w-9 h-0.5"></div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">24/7 Support</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">Contact us 24 hours a day, 7 days a week</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="btn bg-success text-white" id="thankyou-tour">Thank you !</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default TourPage