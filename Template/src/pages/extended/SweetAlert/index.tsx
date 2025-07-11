import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { PageBreadcrumb } from '../../../components'

const WarningAlertTrigger = () => {
  return (
    Swal.fire({
      title: 'Do you want to save the changes?',
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: 'Yes,delete it!',
      cancelButtonText: "No,cancel!"
    }).then((result) => {
      {
        if (result.isConfirmed) {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
        } else if (result.dismiss) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
        }
      }
    })
  )
}

const SweetAlert = () => {
  return (
    <>
      <PageBreadcrumb name='Sweet Alert' title='Sweet Alert' breadCrumbItems={["Konrix", "Extended", "Sweet Alert"]} />
      <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Basic Message</h4>
            </div>
          </div>
          <div className="p-6">
            <button type="button" className="btn bg-primary text-white" id="sweetalert-basic" onClick={() => { Swal.fire({ title: "Any fool can use a computer" }) }}>Click me</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Title with a Text Under</h4>
            </div>
          </div>
          <div className="p-6">
            <button type="button" className="btn bg-primary text-white" id="sweetalert-title" onClick={() => { Swal.fire({ title: "The Internet?", icon: "question", text: "That thing is still around?" }) }} >Click me</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Message Alert</h4>
            </div>
          </div>
          <div className="p-6 flex flex-wrap gap-2">
            <button type="button" className="btn bg-success text-white" onClick={() => { Swal.fire({ title: "Good job!", text: "You clicked the button!", icon: "success", showCancelButton: true, cancelButtonColor: "red", }) }}>Success</button>
            <button type="button" className="btn bg-warning text-white" id="sweetalert-warning" onClick={() => { Swal.fire({ title: "Oops...", icon: "warning", text: "Something went wrong!", footer: "Why do I have this issue?" }) }}>Warning</button>
            <button type="button" className="btn bg-info text-white" id="sweetalert-info" onClick={() => { Swal.fire({ title: "Oops...", icon: "info", text: "Something went wrong!", footer: "Why do I have this issue?" }) }}>Info</button>
            <button type="button" className="btn bg-danger text-white" id="sweetalert-error" onClick={() => { Swal.fire({ title: "Oops...", icon: "error", text: "Something went wrong!", footer: "Why do I have this issue?" }) }}>Error</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Long Content</h4>
            </div>
          </div>
          <div className="p-6">
            <button type="button" className="btn bg-primary text-white" onClick={() => { Swal.fire({ imageUrl: 'https://placeholder.pics/svg/300x1500', imageHeight: 1500, imageAlt: 'A tall image' }) }}>Click me</button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Warning Message</h4>
            </div>
          </div>
          <div className="p-6">
            <button type="button" className="btn bg-primary text-white" id="sweetalert-params" onClick={WarningAlertTrigger}>Click me</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default SweetAlert