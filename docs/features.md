# Project Time Tracking Application Features

This project is a **Project Time Tracking application** built using **Nextron (Next.js + Electron)**, designed to help users efficiently track time spent on Project tickets. It features a desktop application interface with both a main window and a compact floating timer.

## Core Time Tracking & Session Management

1.  **Ticket-Based Time Tracking:**
    *   Allows users to start, pause, resume, hold, complete, and stop timers associated with specific Project ticket numbers.
    *   Tracks `elapsedTime` for the current session and `totalElapsed` time across all sessions for a given ticket.
    *   Supports associating Project tickets with `storyPoints` for estimated vs. actual time tracking.
2.  **Detailed Session Recording:**
    *   Each timer activity (start, pause, resume, stop, complete, hold) creates or updates a "session" entry.
    *   Records `startTime`, `endTime`, `duration`, and `status` for each individual session.
3.  **Persistent Data Storage:**
    *   Utilizes `electron-store` to save all time tracking sessions and Project data locally, ensuring data is retained across application restarts.
    *   Centralized `DataManager` in the main process handles data read/write operations and broadcasts updates to all open windows.

## User Interface & Experience

1.  **Main Application Window:**
    *   Provides a comprehensive interface (implied by `home.tsx` page) for managing and viewing time tracking data.
2.  **Floating Timer Window (`float.tsx`):**
    *   A compact, always-on-top window for quick access to active timers.
    *   Displays the current active task, its elapsed time, and overall status.
    *   Shows a progress bar for tasks with story points, indicating progress against estimated time.
    *   Allows direct control (start, pause, resume, hold, complete, stop) of timers from the floating window.
    *   Can be minimized to a compact state and expanded back.
    *   Draggable: Users can move the floating window freely on their screen.
3.  **System Tray Integration:**
    *   A system tray icon provides quick access to:
        *   Showing/hiding the main window.
        *   Toggling the visibility of the floating timer window.
        *   Quick actions like "Start New Timer" and "View Today's Summary".
    *   The tray icon's tooltip dynamically updates to show the number of active timers.
4.  **Theme Toggling:**
    *   Supports switching between 'light', 'dark', and 'system' themes for the application's interface.
5.  **Keyboard Shortcuts:**
    *   Provides keyboard shortcuts for common actions within the floating window, such as toggling its visibility and starting/pausing timers.


## Data Management & Reporting

1.  **Project Data Loading:**
    *   Loads initial Project ticket data from a local `json/data.json` file.
    *   `useJiraData` hook handles fetching and refreshing this data for the renderer process.
2.  **Export Functionality (`ExportDialog.tsx`):**
    *   Allows exporting recorded time data.
    *   **Formats:** Supports exporting in CSV (Excel compatible) and JSON (structured data) formats.
    *   **Filtering:** Users can filter exported data by:
        *   Date range (start and end dates).
        *   Specific project names (derived from ticket numbers).
    *   **Summary:** Provides a summary of total sessions, total time, number of projects, and number of tickets before export.

## System & Developer Integrations

1.  **Project Path Management:**
    *   Allows users to select and save specific project directories on their local file system.
    *   This is used for features like Git branch detection.
2.  **Git Branch Detection:**
    *   Can retrieve the current Git branch name for a configured project directory.
3.  **GitHub Actions Integration:**
    *   Ability to trigger GitHub Actions workflows using the `gh` CLI tool for a specified project path and action name.
4.  **Robust IPC Communication:**
    *   Uses Electron's `ipcMain` and `ipcRenderer` for secure and efficient communication between the main process (handling system-level tasks) and renderer processes (handling UI).
    *   A `preload.ts` script ensures secure context isolation and whitelists allowed IPC channels.
