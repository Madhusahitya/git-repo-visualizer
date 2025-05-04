// src/pages/Actions.tsx
import React from 'react';
import WorkflowsComponent from '../components/GitHub-Actions-Workflows';

const Actions: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center text-[#f0f6fc]">
          <i className="fas fa-play text-[#f0883e] mr-3"></i>
          Actions
        </h2>
        <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
          <i className="fas fa-plus mr-2"></i>
          New workflow
        </button>
      </div>
      
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <div className="border-b border-[#30363d] px-4 py-3 flex items-center justify-between">
          <h3 className="text-[#f0f6fc] font-medium">Workflow runs</h3>
          <div className="flex items-center space-x-2">
            <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-2 py-1 rounded-md text-xs font-medium">
              <i className="fas fa-filter mr-1"></i>
              Filter
            </button>
            <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-2 py-1 rounded-md text-xs font-medium">
              <i className="fas fa-search mr-1"></i>
              Search
            </button>
          </div>
        </div>
        <WorkflowsComponent />
      </div>
    </div>
  );
};

export default Actions;