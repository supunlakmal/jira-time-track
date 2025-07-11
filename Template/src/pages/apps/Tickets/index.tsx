// components
import { PageBreadcrumb } from '../../../components'

// dummy data
import { ticketDetails, ticketStatistics } from './data'

const TicketStatistic = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
      {(ticketStatistics || []).map((ticket, idx) => {
        return (
          <div className="card" key={idx}>
            <div className="p-5">
              <div className="flex justify-between">
                <div className={`w-20 h-20 rounded-full inline-flex items-center justify-center ${ticket.variant}`}>
                  <i className={`${ticket.icon} text-4xl`}></i>
                </div>
                <div className="text-right">
                  <h3 className="text-gray-700 mt-1 text-2xl font-bold mb-5 dark:text-gray-300">{ticket.count}</h3>
                  <p className="text-gray-500 mb-1 truncate dark:text-gray-400">{ticket.status} Tickets</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const ManageTickets = () => {
  return (
    <div className="mt-6">
      <div className="card">
        <div className="flex flex-wrap justify-between items-center gap-2 p-6">
          <button className="btn bg-danger/20 text-sm font-medium text-danger hover:text-white hover:bg-danger"><i className="mgc_add_circle_line me-3"></i> Add Customers</button>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn bg-success/25 text-lg font-medium text-success hover:text-white hover:bg-success"><i className="mgc_settings_3_line"></i></button>
            <button type="button" className="btn bg-dark/25 text-sm font-medium text-slate-900 dark:text-slate-200/70 hover:text-white hover:bg-dark/90">Import</button>
            <button type="button" className="btn bg-dark/25 text-sm font-medium text-slate-900 dark:text-slate-200/70 hover:text-white hover:bg-dark/90">Export</button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead className="bg-slate-300 bg-opacity-20 border-t dark:bg-slate-800 divide-gray-300 dark:border-gray-700">
              <tr>
                <th scope="col" className="py-3.5 ps-4 pe-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">ID</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Requested By</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Subject</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Assignee</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Priority</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Created Date</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-200">Due Date</th>
                <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
              {(ticketDetails || []).map((ticket, idx) => {
                return (
                  <tr key={idx}>
                    <td className="whitespace-nowrap py-4 ps-4 pe-3 text-sm font-medium text-gray-900 dark:text-gray-200"><b>{ticket.id}</b></td>
                    <td className="whitespace-nowrap py-4 pe-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={ticket.requested_by.image} alt="" />
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-200 ms-4">{ticket.requested_by.name}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pe-3 text-sm font-medium text-gray-900 dark:text-gray-200">{ticket.subject}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-sm">
                      <img className="h-10 w-10 rounded-full" src={ticket.assignee} alt="" />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className={`inline-flex items-center gap-1.5 py-1 px-3 rounded text-xs font-medium ${(ticket.priority === 'High') ? "bg-danger/25 text-danger" : (ticket.priority === "Medium") ? "bg-primary/25 text-primary" : "bg-dark/25 text-slate-900 dark:text-slate-200/90"}`}>
                        {ticket.priority}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className={`inline-flex items-center gap-1.5 py-1 px-3 rounded text-xs text-white font-medium ${(ticket.status === "Closed") ? "bg-dark/80" : "bg-success/90"} `}>
                        {ticket.status}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pe-3 text-sm font-medium text-gray-900 dark:text-gray-200">{ticket.created_date}</td>
                    <td className="whitespace-nowrap py-4 pe-3 text-sm font-medium text-gray-900 dark:text-gray-200">{ticket.due_date}</td>
                    <td className="whitespace-nowrap py-4 px-3 text-center text-sm font-medium">
                      <button className="me-0.5"> <i className="mgc_edit_line text-lg"></i> </button>&nbsp;
                      <button className="ms-0.5"> <i className="mgc_delete_line text-xl"></i> </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
const TicketsApp = () => {
  return (
    <>
      <PageBreadcrumb title='Tickets' name='Tickets' breadCrumbItems={["Konrix", "Apps", "Tickets"]} />

      <TicketStatistic />
      <ManageTickets />

    </>
  )
};

export default TicketsApp