// src/pages/Issues.tsx
import React from 'react';
import IssuesDashboard from '../components/Issues-Management-Dashboard';

const Issues: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Issue Management Dashboard</h2>
      <IssuesDashboard />
    </div>
  );
};

export default Issues;