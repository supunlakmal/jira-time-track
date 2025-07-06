# Project Time Track - Floating Screen

This document explains the Floating Screen feature of the Project Time Track application.

## Floating Screen

The "Floating Screen" is a compact, always-on-top window that provides quick access to your active timers and related settings. It's designed to be a convenient overlay while you work, allowing you to monitor and control your time tracking without needing to switch back to the main application window.

### Key Features and Functionalities of the Floating Screen (`renderer/pages/float.tsx`)

*   **Timer Display:** Shows a list of active Project task timers with details like ticket number, name, total elapsed time, current session time, status (Running, Paused, On Hold, Completed, Stopped, In Queue), and estimated time based on Story Points with a progress bar.
*   **Timer Actions:** Allows users to directly control timers (Start, Pause, Resume, Hold, Complete, Stop, Delete).
*   **Idle Detection Integration:** Automatically pauses active timers if the user becomes idle for a configurable duration. Displays a "Paused due to idle" message.
*   **Keyboard Shortcuts:** Supports global keyboard shortcuts for controlling the floating window and timer actions.
*   **Drag-and-Drop Movement:** The window can be freely repositioned on the screen.
*   **IPC Communication:** Communicates with the main Electron process for data loading, sending timer commands, updating the tray icon, and handling window events.

### Floating Screen Settings

While there isn't a single "Floating Screen Settings" panel, its configurable aspects are integrated with its features:

*   **Idle Detection Settings:**
    *   **Enabled:** Toggle whether idle detection is active.
    *   **Idle Time:** Configure the duration of inactivity (e.g., 5 minutes) after which timers are paused.
    These settings are managed internally by the `float.tsx` component and the `useIdleDetection` hook.

### Window Creation and Persistence Logic (`main/helpers/create-window.ts`)

The Electron main process handles the creation and persistence of the floating window's state:

*   **Window State Persistence:** The window's last known position (`x`, `y`) and size (`width`, `height`) are saved using `electron-store` and restored when the application restarts, ensuring the floating window appears where the user left it.
*   **Visibility Check:** The system ensures the window always appears on a visible display, resetting its position to defaults if it's detected to be off-screen.
*   **Initial Options:** When the floating window is created, initial dimensions and other Electron `BrowserWindow` options are applied.
