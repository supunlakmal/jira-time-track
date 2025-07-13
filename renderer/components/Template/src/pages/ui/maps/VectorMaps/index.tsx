import { PageBreadcrumb } from "../../../../components";
import { IraqVectorMap, CanadaVectorMap, ItalyVectorMap, RussiaVectorMap, WorldMap, } from "./maps";
import { canadaMapOpts, iraqMapOpts, italyMapOpts, russiaMapOpts, spainMapOpts, worldMapOpts } from "./data";
import SpainVectorMap from "./maps/SpainVectorMap";

const VectorMaps = () => {
  return (
    <>
      <PageBreadcrumb title="Vector" name="Vector" breadCrumbItems={["Konrix", "Maps", "Vector"]} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <h4 className="card-title">World Vector Map</h4>
                <div className="flex items-center gap-2">
                  <a href="https://jvm-docs.vercel.app/" target="_blank" className="btn-code">
                    <i className="mgc_link_2_line text-sm"></i>
                    <span className="ms-2">Documentaion</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-3">
                <WorldMap height='360px' width="100%" options={worldMapOpts} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Canada Vector Map</h4>
          </div>
          <div className="p-6">
            <div className="mb-3">
              <CanadaVectorMap height='360px' width='100%' options={canadaMapOpts} />
            </div>
          </div>
        </div>


        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Russia Vector Map</h4>
          </div>
          <div className="p-6">
            <div className="mb-3">
              <RussiaVectorMap height='360px' width="100%" options={russiaMapOpts} />

            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Italy Vector Map</h4>
          </div>
          <div className="p-6">
            <div className="mb-3">
              <ItalyVectorMap height='360px' width="100%" options={italyMapOpts} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Iraq Vector Map</h4>
          </div>
          <div className="p-6">
            <div className="mb-3">
              <IraqVectorMap height='360px' width='100%' options={iraqMapOpts} />

            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Spain Vector Map</h4>
          </div>
          <div className="p-6">
            <div className="mb-3">
              <SpainVectorMap height='360px' width='100%' options={spainMapOpts} />

            </div>
          </div>
        </div>

      </div>
    </>
  )
};

export default VectorMaps