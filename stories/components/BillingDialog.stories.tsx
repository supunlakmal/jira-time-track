import type { Meta, StoryObj } from "@storybook/react";
import { BillingDialog } from "../../renderer/components/dialogs/BillingDialog";

// Mock window.ipc for Storybook
const mockIpc = {
  invoke: async (channel: string, ...args: any[]) => {
    console.log(`Mock IPC invoke: ${channel}`, args);
    
    switch (channel) {
      case "get-billing-settings":
        return {
          globalHourlyRate: 75,
          projectRates: {
            "PROJECT1": 85,
            "PROJECT2": 65,
            "MANUAL": 70
          },
          currency: "USD",
          taxRate: 10,
          companyName: "Tech Solutions Inc.",
          companyAddress: "123 Tech Street\nSan Francisco, CA 94105",
          invoicePrefix: "INV"
        };
        
      case "calculate-project-costs":
        return {
          success: true,
          costs: [
            {
              projectName: "PROJECT1",
              totalTimeSpent: 14400000, // 4 hours in ms
              totalCost: 340,
              ticketCount: 3,
              averageHourlyRate: 85,
              currency: "USD"
            },
            {
              projectName: "PROJECT2", 
              totalTimeSpent: 10800000, // 3 hours in ms
              totalCost: 195,
              ticketCount: 2,
              averageHourlyRate: 65,
              currency: "USD"
            },
            {
              projectName: "MANUAL",
              totalTimeSpent: 7200000, // 2 hours in ms
              totalCost: 140,
              ticketCount: 1,
              averageHourlyRate: 70,
              currency: "USD"
            }
          ]
        };
        
      case "get-invoices":
        return {
          success: true,
          invoices: [
            {
              id: "inv-1",
              invoiceNumber: "INV-2024-001",
              projectName: "PROJECT1",
              clientName: "Acme Corp",
              dateRange: {
                start: new Date("2024-01-01"),
                end: new Date("2024-01-31")
              },
              items: [
                {
                  ticketNumber: "PROJECT1-123",
                  ticketName: "Implement user authentication",
                  timeSpent: 7200000, // 2 hours
                  timeSpentFormatted: "2h 0m",
                  hourlyRate: 85,
                  cost: 170,
                  date: "2024-01-15"
                }
              ],
              subtotal: 170,
              taxAmount: 17,
              totalCost: 187,
              totalHours: 2,
              currency: "USD",
              generatedAt: new Date("2024-01-31"),
              companyInfo: {
                name: "Tech Solutions Inc.",
                address: "123 Tech Street\nSan Francisco, CA 94105"
              }
            },
            {
              id: "inv-2",
              invoiceNumber: "INV-2024-002",
              projectName: "PROJECT2",
              clientName: "Beta Industries",
              dateRange: {
                start: new Date("2024-02-01"),
                end: new Date("2024-02-29")
              },
              items: [
                {
                  ticketNumber: "PROJECT2-456",
                  ticketName: "Database optimization",
                  timeSpent: 10800000, // 3 hours
                  timeSpentFormatted: "3h 0m",
                  hourlyRate: 65,
                  cost: 195,
                  date: "2024-02-20"
                }
              ],
              subtotal: 195,
              taxAmount: 19.5,
              totalCost: 214.5,
              totalHours: 3,
              currency: "USD",
              generatedAt: new Date("2024-02-29"),
              companyInfo: {
                name: "Tech Solutions Inc.",
                address: "123 Tech Street\nSan Francisco, CA 94105"
              }
            }
          ]
        };
        
      case "save-billing-settings":
        return { success: true };
        
      case "add-invoice":
        return { 
          success: true, 
          invoice: {
            id: "inv-new",
            invoiceNumber: "INV-2024-003",
            ...args[0]
          }
        };
        
      case "delete-invoice":
        return { success: true };
        
      default:
        return { success: false, error: "Unknown channel" };
    }
  }
};

// Add mock to window for Storybook
if (typeof window !== 'undefined') {
  (window as any).ipc = mockIpc;
}

const meta: Meta<typeof BillingDialog> = {
  title: "Components/BillingDialog",
  component: BillingDialog,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1f2937" },
      ],
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
};

export const WithExistingData: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Billing dialog with existing billing settings, project costs, and invoices loaded from mock data.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
  beforeEach: () => {
    // Override mock to return empty data
    (window as any).ipc = {
      invoke: async (channel: string) => {
        switch (channel) {
          case "get-billing-settings":
            return {
              projectRates: {},
              currency: "USD",
              invoicePrefix: "INV"
            };
          case "calculate-project-costs":
            return { success: true, costs: [] };
          case "get-invoices":
            return { success: true, invoices: [] };
          default:
            return { success: true };
        }
      }
    };
  },
  parameters: {
    docs: {
      description: {
        story: "Billing dialog in empty state with no existing data.",
      },
    },
  },
};

export const SettingsTabOnly: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Focus on the rate settings tab functionality.",
      },
    },
  },
};

export const OverviewTabOnly: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Focus on the cost overview tab with project cost calculations.",
      },
    },
  },
};

export const InvoicesTabOnly: Story = {
  args: {
    onClose: () => console.log("Dialog closed"),
  },
  parameters: {
    docs: {
      description: {
        story: "Focus on the invoices tab with generated invoices.",
      },
    },
  },
};