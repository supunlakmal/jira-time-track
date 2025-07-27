import { Add, GridView, List } from "@mui/icons-material";
import Head from "next/head";
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { NewProjectModal, ProjectView } from "../components/projects";
import Button from "../components/ui/Button";
import { useSharedData } from "../hooks/useSharedData";

export default function ProjectDashboardPage() {
  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);
  const { projects } = useSharedData();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Project Dashboard - Project Time Tracker</title>
      </Head>
      <div className="flex flex-col h-full">
        <div className=" border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              {/* <div className="flex items-center space-x-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    className="flex rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-8 h-9 w-full sm:w-64 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    placeholder="Search projects..."
                    type="search"
                  />
                </div>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-9 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                  <FilterList className="h-4 w-4 mr-2" />
                  All Projects
                </button>
              </div> */}
              <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsCreateModalOpen(true)}
                  startIcon={<Add />}
                >
                  Create Project
                </Button>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex items-center">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md h-8 px-3 text-sm font-medium ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <GridView className="h-4 w-4 mr-2" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md h-8 px-3 text-sm font-medium ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto min-h-0 pt-4 ">
          <ProjectView projects={projects} viewMode={viewMode} />
        </main>
      </div>

      <NewProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          // Could add success notification here
          console.log("Project created successfully!");
        }}
      />
    </Layout>
  );
}
