// src/App.tsx
import { 
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/Home.tsx';
import Visualization from './pages/Visualization.tsx';
import Code from './pages/Code.tsx';
import Issues from './pages/Issues.tsx';
import PullRequests from './pages/PullRequests.tsx';
import Actions from './pages/Actions.tsx';
import Insights from './pages/Insights.tsx';


function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-[#0d1117] text-white">
        {/* GitHub-style header */}
        <header className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex items-center justify-between">
          <div className="flex items-center">
            <i className="fab fa-github text-white text-3xl mr-3"></i>
            <h1 className="text-xl font-semibold">GitHub Repository Visualizer</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#0d1117] rounded-md px-3 py-1 border border-[#30363d] flex items-center text-[#8b949e]">
              <i className="fas fa-search mr-2 text-sm"></i>
              <span className="text-sm">Search</span>
            </div>
            <div className="text-[#8b949e]">
              <i className="far fa-bell text-xl"></i>
            </div>
            <div className="text-[#8b949e]">
              <i className="fas fa-plus text-xl mr-1"></i>
              <i className="fas fa-caret-down text-xs"></i>
            </div>
            <div className="bg-[#238636] text-white rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
          </div>
        </header>
        
        {/* GitHub-style navigation */}
        <nav className="bg-[#161b22] px-6 py-3 border-b border-[#30363d] shadow-sm">
          <ul className="flex items-center space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-home mr-2 text-lg"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/visualization" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-project-diagram mr-2 text-lg"></i> Visualization
              </Link>
            </li>
            <li>
              <Link to="/code" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-code mr-2 text-lg"></i> Code
              </Link>
            </li>
            <li>
              <Link to="/issues" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-exclamation-circle mr-2 text-lg"></i> Issues
              </Link>
            </li>
            <li>
              <Link to="/pull-requests" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-code-branch mr-2 text-lg"></i> Pull Requests
              </Link>
            </li>
            <li>
              <Link to="/actions" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-play mr-2 text-lg"></i> Actions
              </Link>
            </li>
            <li>
              <Link to="/insights" className="text-[#c9d1d9] hover:text-white flex items-center py-1">
                <i className="fas fa-chart-bar mr-2 text-lg"></i> Insights
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Main content area */}
        <main className="flex-grow overflow-auto bg-[#0d1117]">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visualization" element={<Visualization />} />
              <Route path="/code" element={<Code />} />
              <Route path="/issues" element={<Issues />} />
              <Route path="/pull-requests" element={<PullRequests />} />
              <Route path="/actions" element={<Actions />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;