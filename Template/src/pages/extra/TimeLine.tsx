
// images
import img1 from '../../assets/images/small/img-1.jpg'
import img2 from '../../assets/images/small/img-2.jpg'
import img3 from '../../assets/images/small/img-3.jpg'
import { PageBreadcrumb } from "../../components";
import { Fragment } from "react";

interface TimelineData {
  [key: string]: {
    date: string;
    time: string;
    text: string;
    images?: string[]
  }[]
}

const TimeLine = () => {

  const timelineData: TimelineData = {
    Today: [
      {
        date: '1 hour ago',
        time: '08:25 am',
        text: 'Dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?',
      },
      {
        date: '2 hours ago',
        time: '08:25 am',
        text: 'consectetur adipisicing elit. Iusto, optio, dolorum John deon provident rerum aut hic quasi placeat iure tempora laudantium',
      },
      {
        date: '10 hours ago',
        time: '08:25 am',
        text: '3 new photo Uploaded on facebook fan page',
        images: [img1, img2, img3],
      },
    ],
    Yesterday: [
      {
        date: '07 January 2018',
        time: '08:25 am',
        text: 'Montly Regular Medical check up at Greenland Hospital by the doctor Johm meon',
      },
      {
        date: '07 January 2018',
        time: '08:25 am',
        text: 'Download the new updates of Konrix admin dashboard',
      },

    ],
    LastMonth: [
      {
        date: '07 January 2018',
        time: '08:25 am',
        text: 'Jonatha Smith added new milestone crishtian Lorem ipsum dolor sit amet consiquest dio',
      },
      {
        date: '31 December 2017',
        time: '08:25 am',
        text: 'Download the new updates of Konrix admin dashboard',
      },
      {
        date: '16 Decembar 2017',
        time: '08:25 am',
        text: 'Jonatha Smith added new milestone prank Lorem ipsum dolor sit amet consiquest dio',
      },
    ]
  }

  return (
    <>
      <PageBreadcrumb title='Timeline' name='Timeline' breadCrumbItems={["Konrix", "Extra Pages", "Timeline"]} />
      <div className="relative space-y-12 pb-6">
        <div className="absolute border-s-2 border border-gray-300 h-full top-0 start-10 md:start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -z-10 dark:border-white/10"></div>

        {(Object.keys(timelineData)).map((day, idx) => {
          return (
            <Fragment key={idx}>
              <div className="h-10 w-20 flex justify-center bg-primary text-white md:mx-auto rounded items-center">
                {day}
              </div>
              {(timelineData[day] || []).map((item, idx) => {
                return (idx % 2 === 0) ? (
                  <div className="text-start" key={idx}>
                    <div className="absolute start-10 md:start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mt-6">
                      <div className="w-5 h-5 flex justify-center items-center rounded-full bg-gray-300 dark:bg-slate-700">
                        <i className="mgc_stop_circle_line text-sm"></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="md:col-start-2 col-span-2">
                        <div className="relative md:ms-10 ms-20">
                          <div className="card p-5">
                            <h4 className="mb-2 text-base">{item.date}</h4>
                            <p className="mb-2 text-gray-500 dark:text-gray-200"><small>{item.time}</small></p>
                            <p className="text-gray-500 dark:text-gray-200">{item.text}</p>
                            {item.images && (
                              <div className="flex gap-2 mt-4">
                                {(item.images || []).map((img, idx) => {
                                  return (
                                    <span key={idx}>
                                      <img className="rounded w-14" alt="" src={img} />
                                    </span>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                          <div className="bg-white dark:bg-gray-800 absolute h-4 w-4 rotate-45 rounded-sm top-7 -start-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="md:text-end text-start" key={idx}>
                    <div className="absolute start-10 md:start-1/2 -translate-x-1/2 rtl:translate-x-1/2 mt-6">
                      <div className="w-5 h-5 flex justify-center items-center rounded-full bg-gray-300 dark:bg-slate-700">
                        <i className="mgc_stop_circle_line text-sm"></i>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="md:col-span-1 col-span-2">
                        <div className="relative md:me-10 md:ms-0 ms-20">
                          <div className="card p-5">
                            <h4 className="mb-2 text-base">{item.date}</h4>
                            <p className="mb-2 text-gray-500 dark:text-gray-200"><small>{item.time}</small></p>
                            <p className="text-gray-500 dark:text-gray-200">{item.text}</p>
                            {item.images && (
                              <div className="flex gap-2 mt-4 justify-end">
                                {(item.images || []).map((img, idx) => {
                                  return (
                                    <span key={idx}>
                                      <img className="rounded w-14" alt="" src={img} />
                                    </span>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                          <div className="bg-white dark:bg-gray-800 absolute h-4 w-4 rotate-45 rounded-sm top-7 md:-end-2 md:start-auto -start-2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </Fragment>
          )
        })}
      </div>
    </>
  )
};

export default TimeLine