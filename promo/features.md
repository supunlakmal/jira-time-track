# Project Features

Project Time Tracker is a cross-platform desktop application built with Nextron (Next.js + Electron) that helps developers track time spent on Project tickets.

## Key Features:

- **Time Tracking:**

  - Start, pause, resume, hold, complete, and stop timers for specific Project ticket numbers
  - Session recording with detailed logging of startTime, endTime, duration, and status
  - Accumulated time tracking showing both current session elapsed time and total time across all sessions
  - Multiple timer support for managing several tickets simultaneously

- **Story Point Integration:**

  - Assign story point estimates to tickets for better project planning
  - Progress visualization with real-time progress bars showing completion against estimated time
  - Productivity metrics tracking story points completed per day

- **Persistent Local Storage:**

  - Secure local data storage using electron-store for sessions, settings, and configuration
  - Data persistence across application restarts without requiring external databases
  - Cross-platform compatibility with consistent data storage across Windows, macOS, and Linux

- **Dual Interface Design:**

  - **Main Dashboard Window:**
    - Comprehensive project overview with statistics and metrics
    - Ticket management with search and filtering capabilities
    - Project path integration for developer workflows
    - Data export functionality in multiple formats
  - **Floating Timer Window:**
    - Always-on-top compact timer display
    - Draggable positioning for optimal screen placement
    - Expandable/collapsible interface for space optimization
    - Real-time timer updates with visual progress indicators

- **System Integration:**

  - System tray integration with quick access to all functions
  - Keyboard shortcuts for rapid timer control
  - Desktop notifications for timer updates
  - Git branch detection for project-specific workflows

- **User Experience:**

  - Theme support with light, dark, and system theme options
  - Responsive design optimized for different screen sizes
  - Intuitive controls with clear visual feedback

- **Data Management & Reporting:**

  - **Export Functionality:**
    - Multiple export formats including CSV (Excel-compatible) and JSON
    - Flexible filtering by date range and project names
    - Export summaries showing total sessions, time, projects, and tickets
    - Data validation ensuring export integrity
  - **Analytics Dashboard:**
    - Productivity metrics including tickets per day and points per day
    - Time analysis with average time per ticket and per story point
    - Project comparisons across different repositories and teams
    - Historical tracking for long-term productivity insights

- **Developer Integration Features:**

  - **Project Path Management:**
    - Local directory selection for project-specific features
    - Git repository integration with automatic branch detection
    - Multi-project support with saved paths and configurations
  - **GitHub Actions Integration:**
    - Workflow triggering directly from the application
    - CI/CD integration using GitHub CLI (gh) tool
    - Project-specific actions based on selected repository paths

- **Technology Stack:**
  - Nextron (Next.js + Electron)
  - Next.js
  - Electron
  - Redux Toolkit
  - electron-store
  - Tailwind CSS
  - TypeScript
  - GitHub CLI (optional)
