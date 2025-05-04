// src/pages/PullRequests.tsx
import React from 'react';
import PullRequestsManagement from '../components/Pull-Requests-Management-Page';


const PullRequests: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pull Request Tracker</h2>
      <PullRequestsManagement />
    </div>
  );
};

export default PullRequests;