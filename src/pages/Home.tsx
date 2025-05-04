// src/pages/Home.tsx
import React from 'react';
import GitHubRepositoryVisualizer from '../components/GitHub-Repository-Visualizer';

const Home: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">GitHub Repository Visualizer</h1>
      <p className="mb-6 text-gray-300">
        Explore repositories visually, manage issues, track pull requests, and understand collaboration patterns.
      </p>
      <GitHubRepositoryVisualizer />
    </div>
  );
};

export default Home;