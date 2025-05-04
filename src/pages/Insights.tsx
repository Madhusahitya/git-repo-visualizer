// src/pages/Insights.tsx
import React from 'react';
import ContributorInsightsPanel from '../components/ContributorInsightsPanel';

const Insights: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Collaboration & Insights</h2>
      <ContributorInsightsPanel />
    </div>
  );
};

export default Insights;