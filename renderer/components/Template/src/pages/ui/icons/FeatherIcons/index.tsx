// import { feathericonList } from "./data"
import FeatherIcon from 'feather-icons-react';
import { feathericonsList } from './data';
import { PageBreadcrumb } from '../../../../components';

const FeatherIcons = () => {
  return (
    <>
      <PageBreadcrumb name='Feather' title='Feather Icons' breadCrumbItems={["Konrix", "Icons", "Feather"]} />
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h5 className="card-title">
              All Icons
            </h5>
            <a href="https://feathericons.com/" target="_blank" className="btn-code">
              <span className="me-2">Documentaion</span>
              <i className="mgc_link_2_line text-sm"></i>
            </a>
          </div>
        </div>
        <div className="p-6">
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 icons-list-demo" id="icons">

            {(feathericonsList || []).map((icon, idx) => (
              <div key={idx}>
                <FeatherIcon icon={icon.name.slice(3)} />
                <span>{icon.name}</span>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default FeatherIcons