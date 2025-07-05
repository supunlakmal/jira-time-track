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
    *   Provides keyboard shortcuts for common actions within the floating window, such as toggling its visibility, starting/pausing timers, and opening break settings.

## Productivity & Wellness Features

1.  **Configurable Break Reminders (Pomodoro-like):**
    *   **Enable/Disable:** Users can enable or disable the break reminder feature.
    *   **Customizable Durations:** Set `workDuration`, `shortBreakDuration`, and `longBreakDuration` in minutes.
    *   **Long Break Interval:** Configure after how many work sessions a long break should be suggested.
    *   **Notifications:** Provides desktop notifications when a break is due or over.
    *   **Break Tips:** Offers contextual tips during break reminders.
    *   **Actions:** Users can choose to "Start Break" or "Skip Break" from the reminder.
    *   **Persistent Settings:** Break timer settings are saved locally.
2.  **Idle Detection:**
    *   Automatically detects user inactivity (idle time is configurable).
    *   When idle, it automatically pauses any active timers to prevent inaccurate time tracking.
    *   Users need to manually resume timers after becoming active again.
3.  **Time Goals Widget:**
    *   Displays progress against user-defined time goals (e.g., daily work hours).
    *   Shows visual progress bars and percentage completion.
    *   Provides alerts for nearing goals, reaching goals, or exceeding goals (overtime).
    *   Allows dismissing individual or all alerts.

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
