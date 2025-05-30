export interface JiraTicket {
  ticket_number: string;
  ticket_name: string;
}

export interface IpcHandler {
  send(channel: "toggle-float-window", value: boolean): void;
  send(
    channel: "window-move",
    value: { movementX: number; movementY: number }
  ): void;
  send(channel: "window-resize", value: { height: number }): void;
  send(channel: "start-task", value: { ticket: string }): void;
  send(channel: "load-jira-data", value?: undefined): Promise<JiraTicket[]>;
  on(channel: string, callback: (...args: unknown[]) => void): () => void;
  window: {
    minimize(): void;
    maximize(): void;
    close(): void;
    hide(): void;
    show(): void;
  };
}

declare global {
  interface Window {
    ipc: IpcHandler;
  }
}

export {};
