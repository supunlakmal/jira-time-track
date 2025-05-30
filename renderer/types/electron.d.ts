export interface IpcHandler {
  send(channel: string, value: unknown): void;
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
