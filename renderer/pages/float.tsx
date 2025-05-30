import React, { useEffect, useState } from 'react'

const FloatingWindow: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const { movementX, movementY } = e
      // Since we're using the new IPC bridge, we'll send window move events
      window.ipc.send('window-move', { movementX, movementY })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', () => setIsDragging(false))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', () => setIsDragging(false))
    }
  }, [isDragging])

  const handleClose = () => {
    window.ipc.window.hide()
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
    if (!isMinimized) {
      window.ipc.send('window-resize', { height: 40 })
    } else {
      window.ipc.send('window-resize', { height: 400 })
    }
  }

  return (
    <div className="h-screen bg-transparent select-none">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Title bar */}
        <div 
          className="bg-gray-800 text-white p-2 flex justify-between items-center cursor-move"
          onMouseDown={() => setIsDragging(true)}
        >
          <div className="text-sm font-semibold">Time Tracker</div>
          <div className="flex space-x-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-gray-700 p-1 rounded"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? '□' : '−'}
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-red-500 p-1 rounded"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content area */}
        {!isMinimized && (
          <div className="p-4">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Current Task</h3>
                <p className="text-gray-500 text-sm mt-1">No active task</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Time Today</h3>
                <p className="text-gray-500 text-sm mt-1">0h 0m</p>
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"                onClick={() => window.ipc.send('start-task', {})}
              >
                Start New Task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingWindow
