import { useState, useEffect, useCallback } from "react";

export interface UseGitOperationsReturn {
  // State
  projectPaths: Record<string, string>;
  isCheckingBranch: boolean;
  isCreatingBranch: boolean;
  branchMessage: string | null;
  branchExists: boolean | null;
  
  // Actions
  checkBranchExists: (ticketNumber: string) => Promise<void>;
  createOrSwitchBranch: (ticketNumber: string) => Promise<void>;
  refreshProjectPaths: () => Promise<void>;
}

export function useGitOperations(): UseGitOperationsReturn {
  const [projectPaths, setProjectPaths] = useState<Record<string, string>>({});
  const [isCreatingBranch, setIsCreatingBranch] = useState(false);
  const [branchMessage, setBranchMessage] = useState<string | null>(null);
  const [branchExists, setBranchExists] = useState<boolean | null>(null);
  const [isCheckingBranch, setIsCheckingBranch] = useState(false);

  // Load project paths
  const refreshProjectPaths = useCallback(async () => {
    try {
      if (window.ipc && typeof window.ipc.invoke === "function") {
        const storedPaths = await window.ipc.invoke("get-project-paths");
        console.log('=== PROJECT PATHS REFRESH ===');
        console.log('Raw stored paths from IPC:', storedPaths);
        const finalPaths = storedPaths && typeof storedPaths === "object" ? storedPaths : {};
        console.log('Final paths being set:', finalPaths);
        setProjectPaths(finalPaths);
      }
    } catch (e) {
      console.error("Failed to load project paths:", e);
      setProjectPaths({});
    }
  }, []);

  // Check if branch exists
  const checkBranchExists = useCallback(async (ticketNumber: string) => {
    const projectName = ticketNumber.split('-')[0];
    const projectPath = projectPaths[projectName];
    
    if (!projectPath) {
      setBranchExists(null);
      return;
    }

    setIsCheckingBranch(true);
    try {
      const result = await window.ipc.git.checkBranchExists(ticketNumber, projectPath);
      if (result.success) {
        setBranchExists(result.exists || false);
      } else {
        setBranchExists(null);
      }
    } catch (error) {
      console.error("Error checking branch existence:", error);
      setBranchExists(null);
    } finally {
      setIsCheckingBranch(false);
    }
  }, [projectPaths]);

  // Handle git branch creation/switching
  const createOrSwitchBranch = useCallback(async (ticketNumber: string) => {
    const projectName = ticketNumber.split('-')[0];
    
    console.log('=== GIT OPERATIONS DEBUG ===');
    console.log('Ticket Number:', ticketNumber);
    console.log('Extracted Project Name:', projectName);
    console.log('Available Project Paths:', projectPaths);
    console.log('Available Keys:', Object.keys(projectPaths));
    
    let projectPath = projectPaths[projectName];
    console.log('Direct Lookup Result:', projectPath);
    
    // Try case-insensitive lookup if direct lookup fails
    if (!projectPath) {
      console.log('Trying case-insensitive lookup...');
      const lowerProjectName = projectName.toLowerCase();
      const matchingKey = Object.keys(projectPaths).find(
        key => key.toLowerCase() === lowerProjectName
      );
      console.log('Case-insensitive match found:', matchingKey);
      if (matchingKey) {
        projectPath = projectPaths[matchingKey];
        console.log('Using case-insensitive path:', projectPath);
      }
    }
    
    // If no project path found, try refreshing project paths first
    if (!projectPath) {
      console.log(`No project path found for ${projectName}, refreshing project paths...`);
      await refreshProjectPaths();
      
      // Re-fetch project paths after refresh
      const refreshedPaths = await window.ipc.invoke("get-project-paths");
      console.log('Refreshed paths from IPC:', refreshedPaths);
      if (refreshedPaths && typeof refreshedPaths === "object") {
        projectPath = refreshedPaths[projectName];
        console.log('Path after refresh:', projectPath);
        
        // Try case-insensitive on refreshed paths too
        if (!projectPath) {
          const lowerProjectName = projectName.toLowerCase();
          const matchingKey = Object.keys(refreshedPaths).find(
            key => key.toLowerCase() === lowerProjectName
          );
          if (matchingKey) {
            projectPath = refreshedPaths[matchingKey];
            console.log('Using case-insensitive path from refresh:', projectPath);
          }
        }
      }
    }
    
    if (!projectPath) {
      setBranchMessage(`No project path configured for ${projectName}`);
      setTimeout(() => setBranchMessage(null), 3000);
      return;
    }

    setIsCreatingBranch(true);
    setBranchMessage(null);

    try {
      const result = await window.ipc.git.createBranch(ticketNumber, projectPath);
      
      if (result.success) {
        // Show different messages based on the action taken
        if (result.action === "switched") {
          setBranchMessage(`✓ Switched to existing branch '${ticketNumber}'`);
        } else if (result.action === "created") {
          setBranchMessage(`✓ Created and switched to new branch '${ticketNumber}'`);
        } else {
          setBranchMessage(`✓ ${result.message || 'Branch operation successful'}`);
        }
      } else {
        setBranchMessage(`✗ ${result.error || 'Failed to create/switch branch'}`);
      }
    } catch (error) {
      console.error("Error with git branch operation:", error);
      setBranchMessage(`✗ Error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsCreatingBranch(false);
      setTimeout(() => setBranchMessage(null), 5000);
      // Refresh branch existence after operation
      await checkBranchExists(ticketNumber);
    }
  }, [projectPaths, checkBranchExists]);

  // Load project paths on mount and listen for updates
  useEffect(() => {
    refreshProjectPaths();
    
    // Listen for project path updates from other components
    let cleanup: (() => void) | undefined;
    
    if (window.ipc && typeof window.ipc.on === "function") {
      cleanup = window.ipc.on("project-paths-updated", () => {
        console.log("Project paths updated, refreshing...");
        refreshProjectPaths();
      });
    }
    
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [refreshProjectPaths]);

  return {
    // State
    projectPaths,
    isCheckingBranch,
    isCreatingBranch,
    branchMessage,
    branchExists,
    
    // Actions
    checkBranchExists,
    createOrSwitchBranch,
    refreshProjectPaths,
  };
}