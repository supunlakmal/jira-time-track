import ReactApexChart from "react-apexcharts"
import { lineChartOpts, barChartOpts, columnChartOpts, columnWithDataLabelOpts, dashedLineChartOpts, donutChartOpts, lineColumnAreaChartOpts, pieChartOpts, radialChartOpts, spilineAreaOpts } from "./data"
import { PageBreadcrumb } from "../../../components";

const Charts = () => {
  return (
    <>
      <PageBreadcrumb name="Charts" title="Charts" breadCrumbItems={["Konrix", "Elements", "Charts"]} />
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Line with Data Labels</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={lineChartOpts}
              height={380}
              series={lineChartOpts.series}
              type='line'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Dashed Line</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={dashedLineChartOpts}
              height={380}
              series={dashedLineChartOpts.series}
              type='line'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Spline Area</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={spilineAreaOpts}
              height={350}
              series={spilineAreaOpts.series}
              type='area'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Column Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={columnChartOpts}
              height={350}
              series={columnChartOpts.series}
              type='bar'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Column with Data Labels</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={columnWithDataLabelOpts}
              height={350}
              series={columnWithDataLabelOpts.series}
              type='bar'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Bar Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={barChartOpts}
              height={350}
              series={barChartOpts.series}
              type='bar'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Line, Column & Area Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={lineColumnAreaChartOpts}
              height={350}
              series={lineColumnAreaChartOpts.series}
              type='line'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Radial Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={radialChartOpts}
              height={370}
              series={radialChartOpts.series}
              type='radialBar'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Pie Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={pieChartOpts}
              height={320}
              series={pieChartOpts.series}
              type='pie'
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title   ">Donut Chart</h4>
          </div>
          <div className="p-6">
            <ReactApexChart
              className='apex-charts'
              options={donutChartOpts}
              height={320}
              series={donutChartOpts.series}
              type='donut'
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default Charts