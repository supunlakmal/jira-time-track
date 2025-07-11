import { Grid } from 'gridjs-react';
import { dataTableRecords } from './data';
import { PageBreadcrumb } from "../../components";
import "gridjs/dist/theme/mermaid.min.css";

const DataTables = () => {
  return (
    <>
      <PageBreadcrumb name='Data Table' title='Data Table' breadCrumbItems={["Konrix", "Table", "Data Table"]} />
      <div className="flex flex-col gap-6">
        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Basic</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with your own CSS as needed.</p>

            <Grid
              data={dataTableRecords}
              pagination={{ enabled: true, limit: 5 }}
              search={true}
              sort={true}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Pagination</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Pagination can be enabled by setting <code>pagination: true</code>:</p>

            <Grid
              data={dataTableRecords}
              pagination={{ enabled: true, limit: 5 }}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Search</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Grid.js supports global search on all rows and columns. Set <code>search: true</code> to enable the search plugin:</p>

            <Grid
              data={dataTableRecords}
              pagination={{ enabled: true, limit: 5 }}
              search={true}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Sorting</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">To enable sorting, simply add <code>sort: true</code> to your config:</p>
            <Grid
              data={dataTableRecords}
              pagination={{ enabled: true, limit: 5 }}
              sort={true}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Loading State</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Grid.js renders a loading bar automatically while it waits for the data to be fetched. Here we are using an async
              function to demonstrate this behaviour (e.g. an async function can be a XHR call to a server backend)</p>
            <Grid
              columns={['Name', 'Email', 'Phone Number']}
              sort={true}
              search={true}
              data={() => {
                return new Promise(resolve => {
                  setTimeout(() =>
                    resolve([
                      ['John', 'john@example.com', '(353) 01 222 3333'],
                      ['Mark', 'mark@gmail.com', '(01) 22 888 4444']
                    ]), 4000);
                });
              }}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Fixed Header</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">The most basic list group is an unordered list with list items and the proper classes. Build upon it with the options that follow, or with your own CSS as needed.</p>
            <Grid
              data={dataTableRecords}
              columns={['id', 'name', 'email', 'position', 'company', 'country']}
              height='300px'
              fixedHeader={true}
              pagination={{ enabled: true, limit: 10 }}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h4 className="card-title">Hidden Columns</h4>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Add <code>hidden: true</code> to the columns definition to hide them. </p>
            <div id="table-hidden-column"></div>
            check for .html links
            <Grid
              data={dataTableRecords}
              columns={[
                {
                  id: 'id',
                  hidden: true
                },
                'name',
                'email',
                'position',
                'company',
                'country',
              ]}
              sort={true}
              pagination={{ enabled: true, limit: 5 }}
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default DataTables