// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  // State for file explorer
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true,
    'public': false,
    'docs': false
  });
  
  // State for selected file
  const [selectedFile, setSelectedFile] = useState<string>('src/App.tsx');
  
  // State for current branch
  const [currentBranch, setCurrentBranch] = useState<string>('main');
  const [showBranchDropdown, setShowBranchDropdown] = useState<boolean>(false);
  
  // State for code view options
  const [codeViewOption, setCodeViewOption] = useState<string>('code');
  
  // State for search
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // File structure data
  const fileStructure = {
    'src': {
      'components': {
        'Header.tsx': { size: '4.2 KB', lines: 142, lastModified: '2 days ago' },
        'Sidebar.tsx': { size: '3.1 KB', lines: 98, lastModified: '3 days ago' },
        'FileExplorer.tsx': { size: '5.7 KB', lines: 187, lastModified: '1 day ago' },
        'CodeViewer.tsx': { size: '7.3 KB', lines: 245, lastModified: '5 hours ago' }
      },
      'hooks': {
        'useRepository.ts': { size: '1.8 KB', lines: 62, lastModified: '1 week ago' },
        'useFileSystem.ts': { size: '2.3 KB', lines: 78, lastModified: '4 days ago' }
      },
      'utils': {
        'formatter.ts': { size: '1.2 KB', lines: 45, lastModified: '2 weeks ago' },
        'parser.ts': { size: '3.5 KB', lines: 112, lastModified: '3 days ago' }
      },
      'App.tsx': { size: '2.8 KB', lines: 94, lastModified: '1 day ago' },
      'index.tsx': { size: '0.5 KB', lines: 15, lastModified: '2 weeks ago' },
      'styles.css': { size: '3.7 KB', lines: 184, lastModified: '3 days ago' }
    },
    'public': {
      'index.html': { size: '0.8 KB', lines: 28, lastModified: '1 month ago' },
      'favicon.ico': { size: '4.3 KB', lines: 0, lastModified: '1 month ago' }
    },
    'docs': {
      'README.md': { size: '4.5 KB', lines: 156, lastModified: '1 week ago' },
      'CONTRIBUTING.md': { size: '2.1 KB', lines: 72, lastModified: '2 weeks ago' },
      'API.md': { size: '8.3 KB', lines: 278, lastModified: '4 days ago' }
    },
    '.gitignore': { size: '0.3 KB', lines: 12, lastModified: '1 month ago' },
    'package.json': { size: '1.2 KB', lines: 42, lastModified: '5 days ago' },
    'tsconfig.json': { size: '0.7 KB', lines: 24, lastModified: '2 weeks ago' }
  };
  
  // Branches data
  const branches = [
    { name: 'main', lastCommit: '2 hours ago' },
    { name: 'develop', lastCommit: '5 hours ago' },
    { name: 'feature/file-explorer', lastCommit: '1 day ago' },
    { name: 'bugfix/syntax-highlighting', lastCommit: '3 days ago' }
  ];
  
  // Commit history for selected file
  const commitHistory = [
    { hash: 'a1b2c3d', message: 'Fix performance issues in code viewer component', author: 'Alex Johnson', date: '2 hours ago', avatar: 'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520glasses%2520wearing%2520a%2520blue%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=32&height=32&seq=1&orientation=squarish' },
    { hash: 'e5f6g7h', message: 'Add syntax highlighting for TypeScript files', author: 'Sarah Chen', date: '1 day ago', avatar: 'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520woman%2520with%2520medium%2520length%2520black%2520hair%2520wearing%2520a%2520dark%2520blazer%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=32&height=32&seq=2&orientation=squarish' },
    { hash: 'i9j0k1l', message: 'Refactor file explorer component', author: 'Michael Rodriguez', date: '3 days ago', avatar: 'https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520aged%2520man%2520with%2520brown%2520hair%2520and%2520beard%2520wearing%2520a%2520gray%2520shirt%2520against%2520a%2520neutral%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=32&height=32&seq=3&orientation=squarish' }
  ];
  
  // Sample code content
  const codeContent = `import React, { useState, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { CodeViewer } from './components/CodeViewer';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

/**
 * Main application component
 * Manages the repository visualization and code viewing
 */
const App: React.FC = () => {
  // State for selected file
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  // State for current branch
  const [currentBranch, setCurrentBranch] = useState<string>('main');
  
  // Handle file selection
  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };
  
  // Handle branch change
  const handleBranchChange = (branch: string) => {
    setCurrentBranch(branch);
    // Reset selected file when changing branches
    setSelectedFile(null);
  };
  
  // Load repository data
  useEffect(() => {
    // API call to fetch repository data would go here
    console.log(\`Loading repository data for branch: \${currentBranch}\`);
  }, [currentBranch]);
  
  return (
    <div className="app-container">
      <Header 
        branch={currentBranch}
        onBranchChange={handleBranchChange}
      />
      <div className="main-content">
        <FileExplorer 
          onFileSelect={handleFileSelect}
          currentBranch={currentBranch}
        />
        <CodeViewer 
          filePath={selectedFile}
          branch={currentBranch}
        />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;`;
  
  // Toggle folder expansion
  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };
  
  // Select a file
  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };
  
  // Toggle branch dropdown
  const toggleBranchDropdown = () => {
    setShowBranchDropdown(!showBranchDropdown);
  };
  
  // Select a branch
  const selectBranch = (branch: string) => {
    setCurrentBranch(branch);
    setShowBranchDropdown(false);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowBranchDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  // Render file tree recursively
  const renderFileTree = (structure: any, path = '', level = 0) => {
    return Object.entries(structure).map(([name, value]: [string, any]) => {
      const currentPath = path ? `${path}/${name}` : name;
      const isFolder = typeof value === 'object' && !value.size;
      const isExpanded = expandedFolders[currentPath] || false;
      
      return (
        <div key={currentPath} style={{ paddingLeft: `${level * 16}px` }}>
          <div 
            className={`flex items-center py-1 px-2 text-sm hover:bg-[#30363d] rounded cursor-pointer ${selectedFile === currentPath ? 'bg-[#30363d]' : ''}`}
            onClick={() => isFolder ? toggleFolder(currentPath) : handleFileSelect(currentPath)}
          >
            {isFolder ? (
              <i className={`fas ${isExpanded ? 'fa-chevron-down' : 'fa-chevron-right'} text-gray-500 w-4 mr-1`}></i>
            ) : (
              <i className={`far fa-file text-gray-500 w-4 mr-1 ${(() => {
                const ext = getFileExtension(name);
                if (ext === 'tsx' || ext === 'ts') return 'text-blue-400';
                if (ext === 'css') return 'text-purple-400';
                if (ext === 'md') return 'text-yellow-400';
                return 'text-gray-400';
              })()}`}></i>
            )}
            <span className={`${selectedFile === currentPath ? 'text-white' : ''}`}>{name}</span>
          </div>
          
          {isFolder && isExpanded && (
            <div className="ml-2">
              {renderFileTree(value, currentPath, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };
  
  // Get file extension
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop() || '';
  };
  
  // Get file info
  const getFileInfo = (path: string) => {
    const parts = path.split('/');
    let current: any = fileStructure;
    
    for (const part of parts) {
      if (current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    
    return current;
  };
  
  const selectedFileInfo = getFileInfo(selectedFile);
  
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
      {/* Header */}
      <header className="bg-[#161b22] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <i className="fab fa-github text-white text-2xl"></i>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-[#58a6ff] cursor-pointer">organization</span>
            <span className="mx-1">/</span>
            <span className="text-[#58a6ff] font-semibold cursor-pointer">repository-name</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search repository"
              className="bg-[#0d1117] border border-gray-700 rounded-md py-1 px-3 pl-8 text-sm focus:outline-none focus:border-[#58a6ff] w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <i className="fas fa-search absolute left-3 top-2 text-gray-500 text-sm"></i>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-3 py-1 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
              <i className="fas fa-plus mr-1"></i> New
            </button>
            <div className="cursor-pointer">
              <i className="far fa-bell text-lg"></i>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-700 overflow-hidden cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520wearing%2520a%2520blue%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=32&height=32&seq=6&orientation=squarish"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Secondary Navigation */}
      <div className="bg-[#161b22] border-b border-gray-700 px-4 py-2">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-project-diagram mr-2"></i>
            <Link to="/visualization" className="hover:text-white">Visualization</Link>
          </div>
          <div className="flex items-center px-3 py-1 border-b-2 border-[#f78166] text-white cursor-pointer">
            <i className="fas fa-code mr-2"></i>
            <span>Code</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span>Issues</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-code-branch mr-2"></i>
            <span>Pull Requests</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-play mr-2"></i>
            <span>Actions</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-chart-bar mr-2"></i>
            <span>Insights</span>
          </div>
        </div>
      </div>
      
      {/* Branch and Path Navigation */}
      <div className="bg-[#0d1117] px-4 py-3 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center">
          <div className="relative mr-4" onClick={(e) => e.stopPropagation()}>
            <button 
              className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 rounded-md px-3 py-1 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
              onClick={toggleBranchDropdown}
            >
              <i className="fas fa-code-branch mr-2"></i>
              <span>{currentBranch}</span>
              <i className="fas fa-chevron-down ml-2 text-xs"></i>
            </button>
            
            {showBranchDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10 w-64">
                <div className="p-2">
                  <input 
                    type="text" 
                    placeholder="Find a branch..." 
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {branches.map(branch => (
                    <div 
                      key={branch.name}
                      className={`px-3 py-2 hover:bg-[#30363d] cursor-pointer ${branch.name === currentBranch ? 'bg-[#30363d]' : ''}`}
                      onClick={() => selectBranch(branch.name)}
                    >
                      <div className="flex items-center">
                        <i className="fas fa-code-branch mr-2 text-gray-500"></i>
                        <div>
                          <div className={`text-sm ${branch.name === currentBranch ? 'text-white' : ''}`}>{branch.name}</div>
                          <div className="text-xs text-gray-500">Updated {branch.lastCommit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center text-sm">
            {selectedFile.split('/').map((part, index, array) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-1 text-gray-500">/</span>}
                <span 
                  className={`cursor-pointer hover:text-[#58a6ff] ${index === array.length - 1 ? 'text-white' : 'text-[#58a6ff]'}`}
                >
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
            <i className="fas fa-download mr-1"></i> Code
          </button>
          <button className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
            <i className="fas fa-history mr-1"></i> History
          </button>
          <button className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
            <i className="fas fa-edit mr-1"></i> Edit
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* File Explorer */}
        <div className="w-1/4 border-r border-gray-700 overflow-y-auto">
          <div className="p-3">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Files</h3>
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-plus text-xs"></i>
                </button>
                <button className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-ellipsis-h text-xs"></i>
                </button>
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Find a file..."
                className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1 px-3 pl-8 text-sm focus:outline-none focus:border-[#58a6ff]"
              />
              <i className="fas fa-search absolute left-7 top-[182px] text-gray-500 text-xs"></i>
            </div>
            <div className="file-tree">
              {renderFileTree(fileStructure)}
            </div>
          </div>
        </div>
        
        {/* Code Viewer */}
        <div className="w-3/4 overflow-hidden flex flex-col">
          {/* Code View Options */}
          <div className="bg-[#161b22] border-b border-gray-700 px-4 py-2 flex items-center">
            <div className="flex space-x-4">
              <button 
                className={`text-sm px-2 py-1 rounded-md ${codeViewOption === 'code' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
                onClick={() => setCodeViewOption('code')}
              >
                <i className="fas fa-code mr-1"></i> Code
              </button>
              <button 
                className={`text-sm px-2 py-1 rounded-md ${codeViewOption === 'blame' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
                onClick={() => setCodeViewOption('blame')}
              >
                <i className="fas fa-user-edit mr-1"></i> Blame
              </button>
              <button 
                className={`text-sm px-2 py-1 rounded-md ${codeViewOption === 'raw' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
                onClick={() => setCodeViewOption('raw')}
              >
                <i className="fas fa-file-alt mr-1"></i> Raw
              </button>
            </div>
            <div className="ml-auto flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-copy"></i>
              </button>
              <button className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-search"></i>
              </button>
              <button className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          </div>
          
          {/* File Information */}
          <div className="bg-[#0d1117] px-4 py-2 border-b border-gray-700 flex items-center text-sm">
            <div className="flex items-center text-gray-400">
              <span>{selectedFileInfo?.lines || 0} lines</span>
              <span className="mx-2">|</span>
              <span>{selectedFileInfo?.size || '0 KB'}</span>
            </div>
            <div className="ml-auto flex items-center text-gray-400">
              <span>Last modified {selectedFileInfo?.lastModified || 'unknown'}</span>
              <span className="mx-2">|</span>
              <span>3 contributors</span>
            </div>
          </div>
          
          {/* Code Content */}
          <div className="flex-1 overflow-auto">
            <div className="flex">
              {/* Line Numbers */}
              <div className="text-right pr-2 select-none bg-[#161b22] text-gray-500 text-sm py-2">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="px-2 h-6 leading-6">{i + 1}</div>
                ))}
              </div>
              
              {/* Code */}
              <div className="flex-1 overflow-x-auto text-sm py-2">
                <pre className="font-mono">
                  <code className="language-typescript">
                    {codeContent.split('\n').map((line, i) => {
                      // Very basic syntax highlighting
                      const highlightedLine = line
                        .replace(/import\s+/g, '<span class="text-[#ff7b72]">import</span> ')
                        .replace(/from\s+/g, '<span class="text-[#ff7b72]">from</span> ')
                        .replace(/const\s+/g, '<span class="text-[#ff7b72]">const</span> ')
                        .replace(/let\s+/g, '<span class="text-[#ff7b72]">let</span> ')
                        .replace(/function\s+/g, '<span class="text-[#ff7b72]">function</span> ')
                        .replace(/return\s+/g, '<span class="text-[#ff7b72]">return</span> ')
                        .replace(/export\s+/g, '<span class="text-[#ff7b72]">export</span> ')
                        .replace(/default\s+/g, '<span class="text-[#ff7b72]">default</span> ')
                        .replace(/useState/g, '<span class="text-[#d2a8ff]">useState</span>')
                        .replace(/useEffect/g, '<span class="text-[#d2a8ff]">useEffect</span>')
                        .replace(/React/g, '<span class="text-[#79c0ff]">React</span>')
                        .replace(/\{/g, '<span class="text-[#c9d1d9]">{</span>')
                        .replace(/\}/g, '<span class="text-[#c9d1d9]">}</span>')
                        .replace(/\(/g, '<span class="text-[#c9d1d9]">(</span>')
                        .replace(/\)/g, '<span class="text-[#c9d1d9]">)</span>')
                        .replace(/\/\*\*/g, '<span class="text-[#8b949e]">/**</span>')
                        .replace(/\*\//g, '<span class="text-[#8b949e]">*/</span>')
                        .replace(/\*\s/g, '<span class="text-[#8b949e]">* </span>')
                        .replace(/'[^']*'/g, (match) => `<span class="text-[#a5d6ff]">${match}</span>`)
                        .replace(/"[^"]*"/g, (match) => `<span class="text-[#a5d6ff]">${match}</span>`)
                        .replace(/`[^`]*`/g, (match) => `<span class="text-[#a5d6ff]">${match}</span>`);
                      
                      return (
                        <div key={i} className="px-2 h-6 leading-6 hover:bg-[#161b22]" dangerouslySetInnerHTML={{ __html: highlightedLine }}></div>
                      );
                    })}
                  </code>
                </pre>
              </div>
            </div>
          </div>
          
          {/* Commit Information */}
          <div className="bg-[#161b22] border-t border-gray-700 p-3">
            <div className="flex items-center">
              <img 
                src={commitHistory[0].avatar} 
                alt={commitHistory[0].author} 
                className="w-6 h-6 rounded-full mr-2"
              />
              <div className="text-sm">
                <span className="font-semibold">{commitHistory[0].author}</span>
                <span className="mx-1 text-gray-400">committed</span>
                <span className="text-gray-400">{commitHistory[0].date}</span>
                <span className="mx-1 text-gray-400">·</span>
                <span className="text-[#58a6ff] cursor-pointer">{commitHistory[0].hash}</span>
              </div>
            </div>
            <div className="mt-1 text-sm">{commitHistory[0].message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

