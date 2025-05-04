// src/pages/Actions.tsx
import React from 'react';
import WorkflowsComponent from '../components/GitHub-Actions-Workflows';

const Actions: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">GitHub Actions Workflows</h2>
      <WorkflowsComponent />
    </div>
  );
};

export default Actions;