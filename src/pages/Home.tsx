// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import GitHubRepositoryVisualizer from '../components/GitHub-Repository-Visualizer';

const Home: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center text-[#f0f6fc]">
          <i className="fab fa-github text-[#f0f6fc] text-4xl mr-4"></i>
          GitHub Repository Visualizer
        </h1>
        <p className="text-lg mb-8 text-[#c9d1d9] leading-relaxed">
          Explore repositories visually, manage issues, track pull requests, and understand collaboration patterns with our comprehensive GitHub-like interface.
        </p>
        
        {/* Quick access cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 hover:border-[#8b949e] transition-colors">
            <div className="flex items-center mb-3">
              <i className="fas fa-code-branch text-[#58a6ff] text-xl mr-3"></i>
              <h3 className="text-[#f0f6fc] font-semibold text-lg">Pull Requests</h3>
            </div>
            <p className="text-[#8b949e] mb-4">Track and manage pull requests with detailed status information.</p>
            <Link to="/pull-requests" className="text-[#58a6ff] hover:underline text-sm font-medium flex items-center">
              View Pull Requests <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 hover:border-[#8b949e] transition-colors">
            <div className="flex items-center mb-3">
              <i className="fas fa-exclamation-circle text-[#f85149] text-xl mr-3"></i>
              <h3 className="text-[#f0f6fc] font-semibold text-lg">Issues</h3>
            </div>
            <p className="text-[#8b949e] mb-4">Manage and organize issues with powerful filtering options.</p>
            <Link to="/issues" className="text-[#58a6ff] hover:underline text-sm font-medium flex items-center">
              View Issues <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-md p-5 hover:border-[#8b949e] transition-colors">
            <div className="flex items-center mb-3">
              <i className="fas fa-project-diagram text-[#8957e5] text-xl mr-3"></i>
              <h3 className="text-[#f0f6fc] font-semibold text-lg">Visualization</h3>
            </div>
            <p className="text-[#8b949e] mb-4">Visualize repository data with interactive charts and graphs.</p>
            <Link to="/visualization" className="text-[#58a6ff] hover:underline text-sm font-medium flex items-center">
              View Visualization <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Repository visualization component */}
      <div className="border border-[#30363d] rounded-md bg-[#161b22] overflow-hidden">
        <div className="border-b border-[#30363d] px-4 py-3">
          <h2 className="text-[#f0f6fc] font-semibold text-lg">Repository Overview</h2>
        </div>
        <GitHubRepositoryVisualizer />
      </div>
    </div>
  );
};

export default Home;