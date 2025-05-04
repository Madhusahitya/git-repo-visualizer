// src/pages/Visualization.tsx
import React from 'react';
import GitHubRepositoryVisualizer from '../components/GitHub-Repository-Visualizer';

const Visualization: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold flex items-center text-[#f0f6fc]">
            <i className="fas fa-project-diagram text-[#58a6ff] mr-3"></i>
            Repository Visualization
          </h2>
          <p className="text-[#8b949e] mt-2">
            Interactive visualization of repository structure and activity
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <i className="fas fa-filter mr-2"></i>
            Filter
          </button>
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
        </div>
      </div>
      
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <div className="border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
          <h3 className="text-[#f0f6fc] font-medium">Repository Network</h3>
          <div className="flex items-center space-x-2">
            <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-2 py-1 rounded-md text-xs font-medium">
              <i className="fas fa-expand-arrows-alt mr-1"></i>
              Expand
            </button>
            <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-2 py-1 rounded-md text-xs font-medium">
              <i className="fas fa-search-plus mr-1"></i>
              Zoom
            </button>
          </div>
        </div>
        <GitHubRepositoryVisualizer />
      </div>
    </div>
  );
};

export default Visualization;