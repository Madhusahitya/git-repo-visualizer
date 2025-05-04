// src/pages/Insights.tsx
import React from 'react';
import ContributorInsightsPanel from '../components/ContributorInsightsPanel';

const Insights: React.FC = () => {
  return (
    <div className="py-6 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center text-[#f0f6fc]">
          <i className="fas fa-chart-bar text-[#8957e5] mr-3"></i>
          Insights
        </h2>
        <p className="text-[#8b949e] mt-2">
          View repository analytics and collaboration metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#8b949e] transition-colors">
          <div className="flex items-center mb-2">
            <i className="fas fa-users text-[#58a6ff] mr-2"></i>
            <h3 className="text-[#f0f6fc] font-medium">Contributors</h3>
          </div>
          <p className="text-[#8b949e] text-sm">View contribution activity</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#8b949e] transition-colors">
          <div className="flex items-center mb-2">
            <i className="fas fa-code-commit text-[#58a6ff] mr-2"></i>
            <h3 className="text-[#f0f6fc] font-medium">Commits</h3>
          </div>
          <p className="text-[#8b949e] text-sm">View commit frequency</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#8b949e] transition-colors">
          <div className="flex items-center mb-2">
            <i className="fas fa-code text-[#58a6ff] mr-2"></i>
            <h3 className="text-[#f0f6fc] font-medium">Code frequency</h3>
          </div>
          <p className="text-[#8b949e] text-sm">Additions and deletions</p>
        </div>
        
        <div className="bg-[#161b22] border border-[#30363d] rounded-md p-4 hover:border-[#8b949e] transition-colors">
          <div className="flex items-center mb-2">
            <i className="fas fa-network-wired text-[#58a6ff] mr-2"></i>
            <h3 className="text-[#f0f6fc] font-medium">Network</h3>
          </div>
          <p className="text-[#8b949e] text-sm">View repository network</p>
        </div>
      </div>
      
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <div className="border-b border-[#30363d] px-4 py-3">
          <h3 className="text-[#f0f6fc] font-medium">Contributor Analytics</h3>
        </div>
        <ContributorInsightsPanel />
      </div>
    </div>
  );
};

export default Insights;