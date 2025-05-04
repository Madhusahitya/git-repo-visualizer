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
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">GitHub Repository Visualizer</h1>
        </header>
        <nav className="bg-gray-800 p-2 shadow-md">
          <ul className="flex space-x-4 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/visualization" className="hover:text-blue-400">Visualization</Link></li>
            <li><Link to="/code" className="hover:text-blue-400">Code</Link></li>
            <li><Link to="/issues" className="hover:text-blue-400">Issues</Link></li>
            <li><Link to="/pull-requests" className="hover:text-blue-400">PRs</Link></li>
            <li><Link to="/actions" className="hover:text-blue-400">Actions</Link></li>
            <li><Link to="/insights" className="hover:text-blue-400">Insights</Link></li>
          </ul>
        </nav>
        <main className="flex-grow overflow-auto bg-gray-900">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/code" element={<Code />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/pull-requests" element={<PullRequests />} />
            <Route path="/actions" element={<Actions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;