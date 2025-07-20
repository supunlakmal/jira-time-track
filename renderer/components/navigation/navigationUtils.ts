/**
 * Utility functions for navigation item visibility management
 */

/**
 * Check if current path matches any of the specified paths
 * @param currentPath - Current router path
 * @param paths - Array of paths to match against
 * @param matchType - Type of matching: 'exact', 'startsWith', 'includes'
 */
export const isPathMatch = (
  currentPath: string,
  paths: string[],
  matchType: 'exact' | 'startsWith' | 'includes' = 'exact'
): boolean => {
  return paths.some(path => {
    switch (matchType) {
      case 'exact':
        return currentPath === path;
      case 'startsWith':
        return currentPath.startsWith(path);
      case 'includes':
        return currentPath.includes(path);
      default:
        return currentPath === path;
    }
  });
};

/**
 * Determine if a navigation item should be visible based on path rules
 * @param currentPath - Current router path
 * @param visibleOnPaths - Paths where item should be visible
 * @param hiddenOnPaths - Paths where item should be hidden
 * @param visibilityCondition - Custom visibility function
 */
export const shouldShowNavItem = (
  currentPath: string,
  visibleOnPaths?: string[],
  hiddenOnPaths?: string[],
  visibilityCondition?: (currentPath: string) => boolean
): boolean => {
  // If custom condition is provided, use it
  if (visibilityCondition) {
    return visibilityCondition(currentPath);
  }

  // If hiddenOnPaths is specified and current path matches, hide the item
  if (hiddenOnPaths && isPathMatch(currentPath, hiddenOnPaths)) {
    return false;
  }

  // If visibleOnPaths is specified, only show if current path matches
  if (visibleOnPaths && visibleOnPaths.length > 0) {
    return isPathMatch(currentPath, visibleOnPaths);
  }

  // Default: show the item (backward compatibility)
  return true;
};

