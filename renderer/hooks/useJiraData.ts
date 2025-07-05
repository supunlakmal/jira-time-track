import { useState, useEffect } from "react";
import type { ProjectTicket } from "../types/electron";

export function useProjectData() {
  const [data, setData] = useState<ProjectTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const result = await window.ipc.send("load-project-data", undefined);
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError("Failed to load Project tickets. Please try again.");
          console.error("Error loading data:", err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const result = await window.ipc.send("load-project-data", undefined);
      setData(result);
      setError(null);
    } catch (err) {
      setError("Failed to refresh Project tickets. Please try again.");
      console.error("Error refreshing data:", err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refreshData };
}
