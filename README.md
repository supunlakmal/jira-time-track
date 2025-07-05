# Project Time Tracker

A cross-platform desktop application built with Nextron (Next.js + Electron) for tracking time spent on Project tickets. The application provides a rich interface featuring both a comprehensive main dashboard and a compact floating timer, designed to help developers and teams accurately track time across multiple projects and tickets.

## Key Features

### 🎯 Ticket-Based Time Tracking

- **Start, pause, resume, hold, complete, and stop timers** for specific Project ticket numbers
- **Session recording** with detailed logging of startTime, endTime, duration, and status
- **Accumulated time tracking** showing both current session elapsed time and total time across all sessions
- **Multiple timer support** for managing several tickets simultaneously

### 📊 Story Point Integration

- **Assign story point estimates** to tickets for better project planning
- **Progress visualization** with real-time progress bars showing completion against estimated time
- **Productivity metrics** tracking story points completed per day

### 💾 Persistent Local Storage

- **Secure local data storage** using electron-store for sessions, settings, and configuration
- **Data persistence** across application restarts without requiring external databases
- **Cross-platform compatibility** with consistent data storage across Windows, macOS, and Linux

### 🖥️ Dual Interface Design

#### Main Dashboard Window

- **Comprehensive project overview** with statistics and metrics
- **Ticket management** with search and filtering capabilities
- **Project path integration** for developer workflows
- **Data export functionality** in multiple formats

#### Floating Timer Window

- **Always-on-top** compact timer display
- **Draggable positioning** for optimal screen placement
- **Expandable/collapsible** interface for space optimization
- **Real-time timer updates** with visual progress indicators

### 🔧 System Integration

- **System tray integration** with quick access to all functions
- **Keyboard shortcuts** for rapid timer control
- **Desktop notifications** for break reminders and timer updates
- **Git branch detection** for project-specific workflows

### 🎨 User Experience

- **Theme support** with light, dark, and system theme options
- **Responsive design** optimized for different screen sizes
- **Intuitive controls** with clear visual feedback

### 💪 Productivity & Wellness Features

#### Break Reminders (Pomodoro Technique)

- **Configurable work/break cycles** with customizable durations
- **Long break intervals** for extended work sessions
- **Desktop notifications** with contextual productivity tips
- **Flexible break management** with options to start, skip, or postpone breaks

#### Idle Detection

- **Automatic timer pausing** when system inactivity is detected
- **Accurate time logging** preventing overestimation due to breaks
- **Manual resume** requirement to ensure intentional time tracking

#### Time Goals Widget

- **Daily and project-specific goals** with progress tracking
- **Visual progress indicators** showing completion percentages
- **Achievement notifications** for meeting or exceeding goals
- **Overtime alerts** for work-life balance management

### 📈 Data Management & Reporting

#### Export Functionality

- **Multiple export formats** including CSV (Excel-compatible) and JSON
- **Flexible filtering** by date range and project names
- **Export summaries** showing total sessions, time, projects, and tickets
- **Data validation** ensuring export integrity

#### Analytics Dashboard

- **Productivity metrics** including tickets per day and points per day
- **Time analysis** with average time per ticket and per story point
- **Project comparisons** across different repositories and teams
- **Historical tracking** for long-term productivity insights

### 🛠️ Developer Integration Features

#### Project Path Management

- **Local directory selection** for project-specific features
- **Git repository integration** with automatic branch detection
- **Multi-project support** with saved paths and configurations

#### GitHub Actions Integration

- **Workflow triggering** directly from the application
- **CI/CD integration** using GitHub CLI (gh) tool
- **Project-specific actions** based on selected repository paths

## Tech Stack

- **[Nextron](https://github.com/saltyshiomix/nextron)** - Next.js + Electron framework
- **[Next.js](https://nextjs.org/)** - React framework for the renderer process
- **[Electron](https://www.electronjs.org/)** - Cross-platform desktop application framework
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State management with React-Redux
- **[electron-store](https://github.com/sindresorhus/electron-store)** - Simple data persistence
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[GitHub CLI](https://cli.github.com/)** - GitHub Actions integration (optional)

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm, yarn, or pnpm package manager
- Git (for project path features)
- GitHub CLI (optional, for GitHub Actions integration)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/project-time-tracker.git
   cd project-time-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Project data:**

   - Ensure `json/data.json` exists with your Project ticket data
   - The file should contain an array of objects with `ticket_number`, `ticket_name`, and `story_points` properties

4. **Configure environment (optional):**
   - Set up GitHub CLI authentication if using GitHub Actions integration
   - Configure any additional environment variables as needed

## Usage

### Development Mode

Start the application in development mode:

```bash
npm run dev
```

This launches the Electron app with hot-reloading enabled for development.

### Production Build

Create a production build:

```bash
npm run build
```

The packaged application will be output to the `dist/` directory.

### Basic Usage

1. **Starting a Timer:**

   - Use the floating timer window or main dashboard
   - Select a Project ticket from the dropdown
   - Click "Start" to begin tracking time

2. **Managing Sessions:**

   - Pause/resume timers as needed
   - Mark tasks as complete when finished
   - View session history in the main dashboard

3. **System Tray Access:**

   - Right-click the system tray icon for quick actions
   - Toggle floating timer visibility
   - Access main window and settings

4. **Export Data:**
   - Use the Export button in the main dashboard
   - Choose format (CSV or JSON) and date range
   - Filter by specific projects if needed

### Keyboard Shortcuts

- **Toggle floating timer:** Configurable global hotkey
- **Start/pause current timer:** Available in floating window
- **Navigate between tickets:** Arrow keys in timer selection

## Data Persistence

All application data is stored locally using `electron-store`, which creates JSON files in the system's user data directory:

- **Windows:** `%APPDATA%/project-time-tracker/`
- **macOS:** `~/Library/Application Support/project-time-tracker/`
- **Linux:** `~/.config/project-time-tracker/`

### Data Structure

- **Sessions:** Timer sessions with start/end times, duration, and status
- **Settings:** User preferences, theme settings, and break configurations
- **Project Paths:** Local directory paths for Git integration
- **Project Data:** Cached ticket information and story points

## Configuration

### Project Data Format

The `json/data.json` file should follow this structure:

```json
[
  {
    "ticket_number": "PROJ-123",
    "ticket_name": "Implement user authentication",
    "story_points": 3.0
  },
  {
    "ticket_number": "PROJ-124",
    "ticket_name": "Fix login validation bug",
    "story_points": 1.0
  }
]
```

### Break Timer Configuration

- Work duration: 25 minutes (default)
- Short break: 5 minutes (default)
- Long break: 15 minutes (default)
- Long break interval: Every 4 work sessions (default)

All timing settings can be customized through the application interface.

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to your fork: `git push origin feature-name`
6. Submit a pull request

### Code Style

- Follow TypeScript best practices
- Use existing component patterns and conventions
- Maintain consistent code formatting
- Add comments for complex logic

### Testing

- Test all new features in development mode
- Verify cross-platform compatibility when possible
- Test data persistence and export functionality
- Ensure keyboard shortcuts work correctly

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For support, bug reports, or feature requests, please open an issue on the GitHub repository.

---

Built with ❤️ using Nextron, Next.js, and Electron
