// src/pages/Code.tsx
import React from 'react';
import CodeRepositoryExplorer from '../components/Code-Repository-Explorer.tsx';

const Code: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold flex items-center text-[#f0f6fc]">
          <i className="fas fa-code text-[#7ee787] mr-3"></i>
          Code Repository
        </h2>
        <div className="flex items-center space-x-3">
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <i className="fas fa-code-branch mr-2"></i>
            main
            <i className="fas fa-caret-down ml-2"></i>
          </button>
          <button className="bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] px-3 py-1.5 rounded-md text-sm font-medium flex items-center">
            <i className="fas fa-download mr-2"></i>
            Code
            <i className="fas fa-caret-down ml-2"></i>
          </button>
        </div>
      </div>
      
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <CodeRepositoryExplorer />
      </div>
    </div>
  );
};

export default Code;