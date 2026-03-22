import { useMemo } from "react";
import { navGroups } from "@/lib/sidebarNavigation";

const STORAGE_KEY = "bp_reading_progress";

function getVisited(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export interface SiloProgress {
  label: string;
  visited: number;
  total: number;
  percent: number;
}

export function useSiloProgress(): Record<string, SiloProgress> {
  const visited = getVisited();

  return useMemo(() => {
    const result: Record<string, SiloProgress> = {};
    for (const group of navGroups) {
      const routes = group.items.filter(i => i.route).map(i => i.route!);
      const total = routes.length;
      const visitedCount = routes.filter(r => visited.includes(r)).length;
      result[group.label] = {
        label: group.label,
        visited: visitedCount,
        total,
        percent: total > 0 ? Math.round((visitedCount / total) * 100) : 0,
      };
    }
    return result;
  }, [visited]);
}
