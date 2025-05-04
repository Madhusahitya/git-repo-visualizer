// src/components/ContributorInsightsPanel.tsx
import React from 'react';

const ContributorInsightsPanel: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Contributor Insights</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Top Contributors</h3>
          <ul className="list-disc pl-5 text-sm">
            <li>JohnDoe (120 commits)</li>
            <li>JaneSmith (98 commits)</li>
            <li>DevHelper (75 commits)</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Activity Heatmap</h3>
          <p className="text-xs text-gray-400">Coming soon...</p>
        </div>
        <div>
          <h3 className="font-medium">Mentorship Suggestions</h3>
          <p className="text-xs text-gray-400">Jane → John (high overlap in code changes)</p>
        </div>
      </div>
    </div>
  );
};

export default ContributorInsightsPanel;