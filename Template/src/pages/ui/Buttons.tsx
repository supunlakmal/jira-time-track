import { PageBreadcrumb } from "../../components";

const colors: string[] = [
  "primary",
  "success",
  "info",
  "warning",
  "danger",
  "dark",
  "secondary",
];

const DefultButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Default Buttons</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          {(colors || []).map((color, idx) => {
            return (
              <button key={idx} type="button" className={`btn bg-${color} text-white`}>{color.charAt(0).toUpperCase() + color.slice(1)}</button>
            )
          })
          }
          <button type="button" className="btn bg-light text-slate-900">Light</button>
        </div>
      </div>
    </div>
  )
}

const RoundedButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Rounded Button</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          {(colors || []).map((color, idx) => {
            return (
              <button key={idx} type="button" className={`btn bg-${color} text-white rounded-full`}>{color.charAt(0).toUpperCase() + color.slice(1)}</button>
            )
          })
          }
          <button type="button" className="btn bg-light text-slate-900rounded-full">Light</button>
        </div>
      </div>
    </div>
  )
}

const OutlineButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Otline Buttons</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn border-primary text-primary hover:bg-primary hover:text-white">Primary</button>
          <button type="button" className="btn border-success text-success hover:bg-success hover:text-white">Success</button>
          <button type="button" className="btn border-info text-info hover:bg-info hover:text-white">Info</button>
          <button type="button" className="btn border-warning text-warning hover:bg-warning hover:text-white">Warning</button>
          <button type="button" className="btn border-danger text-danger hover:bg-danger hover:text-white">Danger</button>
          <button type="button" className="btn border-dark text-slate-900 hover:bg-dark hover:text-white">Dark</button>
          <button type="button" className="btn border-secondary text-secondary hover:bg-secondary hover:text-white">Secondary</button>
        </div>
      </div>
    </div>
  )
}

const OutlineRoundedButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Outline Rounded Buttons</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn rounded-full border border-primary text-primary hover:bg-primary hover:text-white">Primary</button>
          <button type="button" className="btn rounded-full border border-success text-success hover:bg-success hover:text-white">Success</button>
          <button type="button" className="btn rounded-full border border-info text-info hover:bg-info hover:text-white">Info</button>
          <button type="button" className="btn rounded-full border border-warning text-warning hover:bg-warning hover:text-white">Warning</button>
          <button type="button" className="btn rounded-full border border-danger text-danger hover:bg-danger hover:text-white">Danger</button>
          <button type="button" className="btn rounded-full border border-dark text-slate-900 hover:bg-dark hover:text-white">Dark</button>
          <button type="button" className="btn rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white">Secondary</button>
        </div>
      </div>
    </div>
  )
}

const SoftButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Soft Buttons</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn bg-primary/25 text-primary hover:bg-primary hover:text-white">Primary</button>
          <button type="button" className="btn bg-success/25 text-success hover:bg-success hover:text-white">Success</button>
          <button type="button" className="btn bg-info/25 text-info hover:bg-info hover:text-white">Info</button>
          <button type="button" className="btn bg-warning/25 text-warning hover:bg-warning hover:text-white">Warning</button>
          <button type="button" className="btn bg-danger/25 text-danger hover:bg-danger hover:text-white">Danger</button>
          <button type="button" className="btn bg-dark/25 text-white hover:bg-dark">Dark</button>
          <button type="button" className="btn bg-secondary/25 text-secondary hover:bg-secondary hover:text-white">Secondary</button>
        </div>
      </div>
    </div>
  )
}

const SoftRoundedButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Soft Rounded Buttons</h4>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn rounded-full bg-primary/25 text-primary hover:bg-primary hover:text-white">Primary</button>
          <button type="button" className="btn rounded-full bg-success/25 text-success hover:bg-success hover:text-white">Success</button>
          <button type="button" className="btn rounded-full bg-info/25 text-info hover:bg-info hover:text-white">Info</button>
          <button type="button" className="btn rounded-full bg-warning/25 text-warning hover:bg-warning hover:text-white">Warning</button>
          <button type="button" className="btn rounded-full bg-danger/25 text-danger hover:bg-danger hover:text-white">Danger</button>
          <button type="button" className="btn rounded-full bg-dark/25 text-slate-900 hover:bg-dark hover:text-white">Dark</button>
          <button type="button" className="btn rounded-full bg-secondary/25 text-secondary hover:bg-secondary hover:text-white">Secondary</button>
        </div>
      </div>
    </div>
  )
}

const IconButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Buttons with Icon</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn bg-primary text-white"><i className="mgc_check_line text-base me-4"></i> Primary</button>
          <button type="button" className="btn bg-success text-white"><i className="mgc_check_line text-base me-4"></i> Success</button>
          <button type="button" className="btn bg-info text-white"><i className="mgc_alert_line text-base me-4"></i> Info</button>
          <button type="button" className="btn bg-warning text-white"><i className="mgc_warning_line text-base me-4"></i> Warning</button>
          <button type="button" className="btn bg-danger text-white"><i className="mgc_close_line text-base me-4"></i> Danger</button>
          <button type="button" className="btn bg-dark text-white"><i className="mgc_check_line text-base me-4"></i> Dark</button>
        </div>
      </div>
    </div>

  )
}

const ButtonSizes = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Sizes</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <button type="button" className="btn btn-sm bg-primary text-white">Small</button>
          <button type="button" className="btn bg-primary text-white">Large</button>
          <button type="button" className="btn btn-lg bg-primary text-white">Default</button>
        </div>
      </div>
    </div>
  )
}

const BlockButtons = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Block Button</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-col gap-2">
          <button type="button" className="btn w-full bg-primary text-white">Default</button>
          <button type="button" className="btn w-full border-primary text-primary">Default</button>
        </div>
      </div>
    </div>
  )
}

const DisabledButton = () => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="flex justify-between items-center">
          <h4 className="card-title">Disabled</h4>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn bg-primary text-white" disabled>Disabled</button>
          <button type="button" className="btn border-primary text-primary" disabled>Disabled</button>
        </div>
      </div>
    </div>
  )
}

const Buttons = () => {
  return (
    <>
      <PageBreadcrumb title="Button" name="Button" breadCrumbItems={["Konrix", "Components", "Button"]} />

      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <DefultButtons />
        <RoundedButtons />
        <OutlineButtons />
        <OutlineRoundedButtons />
        <SoftButtons />
        <SoftRoundedButtons />
        <IconButtons />
        <ButtonSizes />
        <BlockButtons />
        <DisabledButton />
      </div>
    </>
  )
}

export default Buttons