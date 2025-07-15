import Head from "next/head";
import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { 
  BillingTab, 
  RateFormData, 
  ProjectRateFormData, 
  InvoiceFormData,
  BillingSettings,
  ProjectCost,
  TicketCost,
  Invoice
} from "../types/billing";

const rateFormSchema = yup.object().shape({
  globalHourlyRate: yup
    .string()
    .test(
      "valid-rate",
      "Hourly rate must be a positive number",
      (value) => {
        if (!value || value === "") return true;
        const rate = parseFloat(value);
        return !isNaN(rate) && rate >= 0;
      }
    ),
  currency: yup.string().required("Currency is required"),
  taxRate: yup
    .string()
    .test(
      "valid-tax",
      "Tax rate must be between 0 and 100",
      (value) => {
        if (!value || value === "") return true;
        const tax = parseFloat(value);
        return !isNaN(tax) && tax >= 0 && tax <= 100;
      }
    ),
  companyName: yup.string(),
  companyAddress: yup.string(),
  invoicePrefix: yup.string().required("Invoice prefix is required"),
});

const projectRateFormSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  hourlyRate: yup
    .string()
    .required("Hourly rate is required")
    .test(
      "valid-rate",
      "Hourly rate must be a positive number",
      (value) => {
        const rate = parseFloat(value);
        return !isNaN(rate) && rate > 0;
      }
    ),
});

const invoiceFormSchema = yup.object().shape({
  projectName: yup.string(),
  clientName: yup.string().required("Client name is required"),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
  includeOngoing: yup.boolean(),
});

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<BillingTab>("settings");
  const [billingSettings, setBillingSettings] = useState<BillingSettings | null>(null);
  const [projectCosts, setProjectCosts] = useState<ProjectCost[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [showProjectRateForm, setShowProjectRateForm] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  const toggleFloatingWindow = () =>
    window.ipc?.send("toggle-float-window", true);

  // Form instances
  const rateForm = useForm<RateFormData>({
    resolver: yupResolver(rateFormSchema),
    defaultValues: {
      globalHourlyRate: "",
      currency: "USD",
      taxRate: "",
      companyName: "",
      companyAddress: "",
      invoicePrefix: "INV",
    },
  });

  const projectRateForm = useForm<ProjectRateFormData>({
    resolver: yupResolver(projectRateFormSchema),
    defaultValues: {
      projectName: "",
      hourlyRate: "",
    },
  });

  const invoiceForm = useForm<InvoiceFormData>({
    resolver: yupResolver(invoiceFormSchema),
    defaultValues: {
      projectName: "",
      clientName: "",
      startDate: "",
      endDate: "",
      includeOngoing: false,
    },
  });

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load billing settings
        if (window.ipc) {
          const billingResult = await window.ipc.invoke("get-billing-settings");
          setBillingSettings(billingResult);
          
          // Populate form with existing settings
          if (billingResult) {
            rateForm.reset({
              globalHourlyRate: billingResult.globalHourlyRate?.toString() || "",
              currency: billingResult.currency || "USD",
              taxRate: billingResult.taxRate?.toString() || "",
              companyName: billingResult.companyName || "",
              companyAddress: billingResult.companyAddress || "",
              invoicePrefix: billingResult.invoicePrefix || "INV",
            });
          }

          // Load project costs
          const costsResult = await window.ipc.invoke("calculate-project-costs");
          if (costsResult.success) {
            setProjectCosts(costsResult.costs);
            setProjectNames(costsResult.costs.map((p: ProjectCost) => p.projectName));
          }

          // Load invoices
          const invoicesResult = await window.ipc.invoke("get-invoices");
          if (invoicesResult.success) {
            setInvoices(invoicesResult.invoices);
          }
        }
      } catch (error) {
        console.error("Error loading billing data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [rateForm]);

  const onSubmitRateSettings = async (data: RateFormData) => {
    try {
      const settings = {
        globalHourlyRate: data.globalHourlyRate ? parseFloat(data.globalHourlyRate) : undefined,
        currency: data.currency,
        taxRate: data.taxRate ? parseFloat(data.taxRate) : undefined,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        invoicePrefix: data.invoicePrefix,
        projectRates: billingSettings?.projectRates || {},
      };

      if (window.ipc) {
        const result = await window.ipc.invoke("save-billing-settings", settings);
        if (result.success) {
          setBillingSettings({ ...settings, projectRates: billingSettings?.projectRates || {} });
        }
      }
    } catch (error) {
      console.error("Error saving billing settings:", error);
    }
  };

  const onSubmitProjectRate = async (data: ProjectRateFormData) => {
    try {
      const updatedRates = {
        ...billingSettings?.projectRates,
        [data.projectName]: parseFloat(data.hourlyRate),
      };

      const newSettings = {
        ...billingSettings,
        projectRates: updatedRates,
      };

      if (window.ipc) {
        const result = await window.ipc.invoke("save-billing-settings", newSettings);
        if (result.success) {
          setBillingSettings(newSettings);
          setShowProjectRateForm(false);
          projectRateForm.reset();
        }
      }
    } catch (error) {
      console.error("Error saving project rate:", error);
    }
  };

  const removeProjectRate = async (projectName: string) => {
    try {
      const updatedRates = { ...billingSettings?.projectRates };
      delete updatedRates[projectName];

      const newSettings = {
        ...billingSettings,
        projectRates: updatedRates,
      };

      if (window.ipc) {
        const result = await window.ipc.invoke("save-billing-settings", newSettings);
        if (result.success) {
          setBillingSettings(newSettings);
        }
      }
    } catch (error) {
      console.error("Error removing project rate:", error);
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const billingStats = useMemo(() => {
    if (!projectCosts.length) return null;

    const totalRevenue = projectCosts.reduce((sum, p) => sum + p.totalCost, 0);
    const totalHours = projectCosts.reduce((sum, p) => sum + p.totalTimeSpent, 0) / (1000 * 60 * 60);
    const averageRate = totalHours > 0 ? totalRevenue / totalHours : 0;
    const topProject = projectCosts.reduce((top, current) => 
      current.totalCost > (top?.totalCost || 0) ? current : top, projectCosts[0]);

    return {
      totalRevenue,
      totalHours,
      averageRate,
      totalInvoices: invoices.length,
      topProject,
      currency: billingSettings?.currency || "USD",
    };
  }, [projectCosts, invoices, billingSettings]);

  const tabs = [
    { id: "settings" as BillingTab, label: "Rate Settings" },
    { id: "overview" as BillingTab, label: "Cost Overview" },
    { id: "invoices" as BillingTab, label: "Invoices" },
  ];

  if (loading) {
    return (
      <Layout toggleFloatingWindow={toggleFloatingWindow}>
        <Head>
          <title>Billing - Project Time Tracker</title>
        </Head>
        <div className="p-6 flex justify-center">
          <div className="text-center">Loading billing data...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout toggleFloatingWindow={toggleFloatingWindow}>
      <Head>
        <title>Billing - Project Time Tracker</title>
      </Head>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Billing Management
          </h1>
          {activeTab === "settings" && (
            <Button
              type="submit"
              variant="primary"
              size="md"
              form="rate-settings-form"
            >
              Save Settings
            </Button>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-600">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "settings" && (
              <div className="space-y-6">
                <form id="rate-settings-form" onSubmit={rateForm.handleSubmit(onSubmitRateSettings)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Global Hourly Rate
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...rateForm.register("globalHourlyRate")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          rateForm.formState.errors.globalHourlyRate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="50.00"
                      />
                      {rateForm.formState.errors.globalHourlyRate && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {rateForm.formState.errors.globalHourlyRate.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Currency *
                      </label>
                      <select
                        {...rateForm.register("currency")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                        <option value="AUD">AUD ($)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        {...rateForm.register("taxRate")}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          rateForm.formState.errors.taxRate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="10.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Invoice Prefix *
                      </label>
                      <input
                        type="text"
                        {...rateForm.register("invoicePrefix")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="INV"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        {...rateForm.register("companyName")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Your Company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company Address
                      </label>
                      <textarea
                        {...rateForm.register("companyAddress")}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="123 Main St, City, State, ZIP"
                      />
                    </div>
                  </div>
                </form>

                {/* Project-specific rates */}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project-Specific Rates</h3>
                    <Button
                      type="button"
                      onClick={() => setShowProjectRateForm(true)}
                      variant="primary"
                      size="sm"
                    >
                      Add Project Rate
                    </Button>
                  </div>

                  {showProjectRateForm && (
                    <form onSubmit={projectRateForm.handleSubmit(onSubmitProjectRate)} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Name *
                          </label>
                          <select
                            {...projectRateForm.register("projectName")}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          >
                            <option value="">Select project...</option>
                            {projectNames.map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Hourly Rate *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            {...projectRateForm.register("hourlyRate")}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="75.00"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" variant="primary" size="sm">
                            Add
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setShowProjectRateForm(false);
                              projectRateForm.reset();
                            }}
                            variant="gray"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </form>
                  )}

                  {billingSettings?.projectRates && Object.keys(billingSettings.projectRates).length > 0 ? (
                    <div className="space-y-2">
                      {Object.entries(billingSettings.projectRates).map(([projectName, rate]) => (
                        <div
                          key={projectName}
                          className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
                        >
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">{projectName}</span>
                            <span className="ml-3 text-gray-600 dark:text-gray-400">
                              {formatCurrency(rate, billingSettings.currency)}
                            </span>
                          </div>
                          <Button
                            type="button"
                            onClick={() => removeProjectRate(projectName)}
                            variant="gray"
                            size="sm"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No project-specific rates configured. Use the global rate or add project rates above.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "overview" && (
              <div className="space-y-6">
                {billingStats && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Revenue</h3>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {formatCurrency(billingStats.totalRevenue, billingStats.currency)}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Total Hours</h3>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {billingStats.totalHours.toFixed(1)}h
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Avg Rate</h3>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {formatCurrency(billingStats.averageRate, billingStats.currency)}/h
                      </p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-orange-600 dark:text-orange-400">Invoices</h3>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {billingStats.totalInvoices}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Costs</h3>
                  {projectCosts.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Project
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Time Spent
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Tickets
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Avg Rate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Total Cost
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-600">
                          {projectCosts.map((project) => (
                            <tr key={project.projectName}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {project.projectName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {formatTime(project.totalTimeSpent)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {project.ticketCount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {formatCurrency(project.averageHourlyRate, project.currency)}/h
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                {formatCurrency(project.totalCost, project.currency)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No project costs available. Start tracking time on tickets to see cost calculations.
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "invoices" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Invoices</h3>
                  <Button
                    type="button"
                    onClick={() => setShowInvoiceForm(true)}
                    variant="primary"
                    size="md"
                  >
                    Generate Invoice
                  </Button>
                </div>

                {invoices.length > 0 ? (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {invoice.invoiceNumber}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {invoice.clientName} • {invoice.projectName}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(invoice.dateRange.start).toLocaleDateString()} - {new Date(invoice.dateRange.end).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatCurrency(invoice.totalCost, invoice.currency)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {invoice.totalHours.toFixed(1)}h
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No invoices generated yet. Use the "Generate Invoice" button to create your first invoice.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
