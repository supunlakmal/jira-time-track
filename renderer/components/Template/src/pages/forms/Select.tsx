import Select from "react-select";
import { PageBreadcrumb } from "../../components";

const options = [
  {
    value: "",
    label: "Select"
  },
  {
    value: "og",
    label: "Orange"
  },
  {
    value: "wt",
    label: "white"
  },
  {
    value: "pp",
    label: "Purple"
  },
];

const FormSelect = () => {
  return (
    <>
      <PageBreadcrumb name="Select" title="Form Select" breadCrumbItems={["Konrix", "Form", "Select"]} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Basic</h4>
            </div>
          </div>

          <div className="p-6">
            <Select options={options} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Disabling Select</h4>
            </div>
          </div>

          <div className="p-6">
            <Select options={options} isDisabled={true} />
          </div>
        </div>

        <div className="card lg:row-start-3">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Placeholder</h4>
            </div>
          </div>

          <div className="p-6">
            <Select options={options} placeholder="choose..." />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Searchable</h4>
            </div>
          </div>

          <div className="p-6">
            <Select options={options} isSearchable />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Multiple select</h4>
            </div>
          </div>

          <div className="p-6">
            <Select options={options} isMulti />
          </div>
        </div>
      </div>
    </>
  )
};

export default FormSelect