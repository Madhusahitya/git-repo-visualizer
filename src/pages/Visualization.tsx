// src/pages/Visualization.tsx
import React from 'react';
import GitHubRepositoryVisualizer from '../components/GitHub-Repository-Visualizer';

const Visualization: React.FC = () => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl mb-4">Repository Visualization</h2>
      <GitHubRepositoryVisualizer />
    </div>
  );
};

export default Visualization;