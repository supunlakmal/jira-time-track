# Project Time Track - Key Features: Time Goals and Floating Screen

This document explains two core features of the Project Time Track application: Time Goals and the Floating Screen.

## 1. Time Goals

The "Time Goals" feature allows users to set specific targets for their work time, helping them monitor their progress and manage their hours effectively.

### What are Time Goals?

Time Goals are configurable targets for the amount of time a user wants to spend working. They can be set for different periods or entities:

*   **Daily Goals:** For example, aiming to work 8 hours each day.
*   **Weekly Goals:** For example, aiming for a 40-hour work week.
*   **Project-specific Goals:** (Potentially, though not explicitly shown in the provided code, the `type: 'project'` and `targetEntity` fields suggest this capability)
*   **Ticket-specific Goals:** (Potentially, similar to project goals)

The `TimeGoalsWidget.tsx` component is responsible for displaying these goals, their progress, and any associated alerts to the user.

### Logic Behind Time Goals

The `useTimeGoals` hook (`renderer/hooks/useTimeGoals.ts`) manages the state and logic for time goals.

*   **Goal Definition:** Each goal is defined by:
    *   `id`: Unique identifier.
    *   `type`: Scope of the goal (e.g., `daily`, `weekly`, `project`, `ticket`).
    *   `target`: The target duration in milliseconds.
    *   `targetEntity`: (Optional) Project name or ticket number for specific goals.
    *   `description`: User-friendly description.
    *   `enabled`: Whether the goal is active.
*   **Default Goals:** The application includes default daily (8 hours) and weekly (40 hours) goals.
*   **State Management:** Goals, progress, and alerts are managed using React's `useState` and persisted across sessions using `localStorage`.
*   **Goal Actions:** Functions are provided to `addGoal`, `updateGoal`, and `removeGoal`.
*   **Alerts:** The system generates alerts (warning, overtime, achieved) based on goal progress. These alerts can trigger native browser notifications if enabled. Functions to `addAlert`, `dismissAlert`, and `clearAllAlerts` are available.
*   **Time Formatting:** A utility `formatTime` converts milliseconds into a human-readable "Xh Ym" format.
*   **Progress Calculation:** The actual calculation of time spent against goals is derived from the user's tracking sessions, which are passed to the `useTimeGoals` hook.

## 2. Floating Screen

The "Floating Screen" is a compact, always-on-top window that provides quick access to your active timers and related settings. It's designed to be a convenient overlay while you work, allowing you to monitor and control your time tracking without needing to switch back to the main application window.

### Key Features and Functionalities of the Floating Screen (`renderer/pages/float.tsx`)

*   **Timer Display:** Shows a list of active Project task timers with details like ticket number, name, total elapsed time, current session time, status (Running, Paused, On Hold, Completed, Stopped, In Queue), and estimated time based on Story Points with a progress bar.
*   **Timer Actions:** Allows users to directly control timers (Start, Pause, Resume, Hold, Complete, Stop, Delete).
*   **Idle Detection Integration:** Automatically pauses active timers if the user becomes idle for a configurable duration. Displays a "Paused due to idle" message.
*   **Break Reminder Integration:** Displays information about upcoming or active breaks, including time remaining. Provides quick access to break settings and options to end or skip breaks.
*   **Keyboard Shortcuts:** Supports global keyboard shortcuts for controlling the floating window and timer actions.
*   **Drag-and-Drop Movement:** The window can be freely repositioned on the screen.
*   **IPC Communication:** Communicates with the main Electron process for data loading, sending timer commands, updating the tray icon, and handling window events.

### Floating Screen Settings

While there isn't a single "Floating Screen Settings" panel, its configurable aspects are integrated with its features:

*   **Idle Detection Settings:**
    *   **Enabled:** Toggle whether idle detection is active.
    *   **Idle Time:** Configure the duration of inactivity (e.g., 5 minutes) after which timers are paused.
    These settings are managed internally by the `float.tsx` component and the `useIdleDetection` hook.
*   **Break Settings:**
    *   These settings control the break reminder feature (e.g., break duration, frequency).
    *   They are managed by the `useBreakTimer` hook and configured via the `BreakSettingsDialog` component, which can be accessed directly from the floating screen.

### Window Creation and Persistence Logic (`main/helpers/create-window.ts`)

The Electron main process handles the creation and persistence of the floating window's state:

*   **Window State Persistence:** The window's last known position (`x`, `y`) and size (`width`, `height`) are saved using `electron-store` and restored when the application restarts, ensuring the floating window appears where the user left it.
*   **Visibility Check:** The system ensures the window always appears on a visible display, resetting its position to defaults if it's detected to be off-screen.
*   **Initial Options:** When the floating window is created, initial dimensions and other Electron `BrowserWindow` options are applied.
