export interface JiraTicket {
  ticket_number: string;
  ticket_name: string;
}

export interface TaskTimer {
  ticketNumber: string;
  ticketName: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
}

export interface IpcHandler {
  send(channel: "toggle-float-window", value: boolean): void;
  send(
    channel: "window-move",
    value: { movementX: number; movementY: number }
  ): void;
  send(channel: "window-resize", value: { height: number }): void;
  send(channel: "start-task", value: { ticket: string; name: string }): void; // Updated: now sends name too
  send(channel: "pause-task", value: { ticket: string }): void;
  send(channel: "resume-task", value: { ticket: string }): void;
  send(channel: "stop-task", value: { ticket: string }): void;
  send(channel: "load-jira-data", value?: undefined): Promise<JiraTicket[]>;

  on(
    channel: "task-started",
    listener: (data: { ticketNumber: string; ticketName: string }) => void
  ): () => void; // Updated: receives an object
  on(
    channel: "task-paused",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(
    channel: "task-resumed",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(
    channel: "task-stopped",
    listener: (ticketNumber: string) => void
  ): () => void;
  on(channel: string, listener: (...args: any[]) => void): () => void;

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
