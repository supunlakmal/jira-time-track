// types/global.d.ts - Global type declarations for the renderer process

declare global {
  interface Window {
    ipc: {
      send: (channel: string, ...args: any[]) => void;
      invoke: (channel: string, ...args: any[]) => Promise<any>;
      on: (channel: string, callback: (...args: any[]) => void) => () => void;
      window: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
        hide: () => void;
        show: () => void;
      };
    };
  }
}

export {};