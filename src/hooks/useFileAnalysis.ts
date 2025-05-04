// src/hooks/useFileAnalysis.ts
import { useMemo } from 'react';

interface FileNode {
  path: string;
  size: number;
  lastModified: string;
}

const useFileAnalysis = (files: FileNode[]) => {
  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.size, 0),
    [files]
  );

  const largeFiles = useMemo(
    () => files.filter((f) => f.size > 100000), // Larger than 100KB
    [files]
  );

  return { totalSize, largeFiles };
};

export default useFileAnalysis;