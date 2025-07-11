import { ApexOptions } from "apexcharts"
import ReactApexChart from "react-apexcharts"

const ProjectChart = () => {
  const monthlyTargetChartOpts: ApexOptions = {
    chart: {
      height: 280,
      type: 'donut',
    },
    legend: {
      show: false
    },
    stroke: {
      colors: ['transparent']
    },
    series: [82, 37],
    labels: ["Done Projects", "Pending Projects"],
    colors: ["#0acf97", "#3073F1"],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  const statisticsChartOpts: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        // endingShape: 'rounded',
        columnWidth: '25%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    colors: ["#cbdcfc", "#3073F1"],
    series: [{
      name: 'Projects',
      data: [56, 38, 85, 72, 28, 69, 55, 52, 69]
    }, {
      name: 'Working Hours',
      data: [176, 185, 256, 240, 187, 205, 191, 114, 194]
    }],
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    legend: {
      offsetY: 7,
    },
    fill: {
      opacity: 1
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2
      },
      borderColor: '#9ca3af20',
      padding: {
        bottom: 5,
      }
    }
  }
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="card">
            <div className="p-6">
              <h4 className="card-title">Monthly Target</h4>
              <ReactApexChart
                className='apex-charts my-8'
                options={monthlyTargetChartOpts}
                height={280}
                series={monthlyTargetChartOpts.series}
                type='donut'
              />
              <div className="flex justify-center">
                <div className="w-1/2 text-center">
                  <h5>Pending</h5>
                  <p className="fw-semibold text-muted">
                    <i className="mgc_round_fill text-primary"></i> Projects
                  </p>
                </div>
                <div className="w-1/2 text-center">
                  <h5>Done</h5>
                  <p className="fw-semibold text-muted">
                    <i className="mgc_round_fill text-success"></i> Projects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="card">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h4 className="card-title">Project Statistics</h4>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-sm bg-primary/25 text-primary hover:bg-primary hover:text-white">
                    All
                  </button>
                  <button type="button" className="btn btn-sm bg-gray-400/25 text-gray-400 hover:bg-gray-400 hover:text-white">
                    6M
                  </button>
                  <button type="button" className="btn btn-sm bg-gray-400/25 text-gray-400 hover:bg-gray-400 hover:text-white">
                    1Y
                  </button>
                </div>
              </div>
              <div dir="ltr" className="mt-2">
                <ReactApexChart
                  className='apex-charts'
                  options={statisticsChartOpts}
                  height={350}
                  series={statisticsChartOpts.series}
                  type='bar'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default ProjectChart