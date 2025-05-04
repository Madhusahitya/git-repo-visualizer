// src/pages/Code.tsx
import React from 'react';
import CodeRepositoryExplorer from '../components/Code-Repository-Explorer.tsx';

const Code: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4"> Code </h2>
      <CodeRepositoryExplorer />
    </div>
  );
};

export default Code;