import type { Meta, StoryObj } from "@storybook/react";
import { CsvImportDialog } from "../../renderer/components/dialogs/CsvImportDialog";

const meta: Meta<typeof CsvImportDialog> = {
  title: "Components/CsvImportDialog",
  component: CsvImportDialog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    onImport: { action: "imported" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log("Close clicked"),
    onImport: (data) => console.log("Import data:", data),
  },
};
