// src/pages/Issues.tsx
import React from 'react';
import IssuesDashboard from '../components/Issues-Management-Dashboard';

const Issues: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center text-[#f0f6fc]">
          <i className="fas fa-exclamation-circle text-[#f85149] mr-3"></i>
          Issues
        </h2>
        <button className="bg-[#238636] hover:bg-[#2ea043] text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center">
          <i className="fas fa-plus mr-2"></i>
          New Issue
        </button>
      </div>
      
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <div className="border-b border-[#30363d] px-4 py-3">
          <h3 className="text-[#f0f6fc] font-medium">All Issues</h3>
        </div>
        <IssuesDashboard />
      </div>
    </div>
  );
};

export default Issues;