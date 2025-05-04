// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [activeView, setActiveView] = useState('mind-map');
const [isLoading, setIsLoading] = useState(true);
const [selectedNode, setSelectedNode] = useState<string | null>(null);
const chartRef = useRef<HTMLDivElement>(null);
const [chart, setChart] = useState<echarts.ECharts | null>(null);
const [showSaveModal, setShowSaveModal] = useState(false);
const [viewName, setViewName] = useState('');
const [viewDescription, setViewDescription] = useState('');
const [visibility, setVisibility] = useState('private');
const [tags, setTags] = useState('');
const handleSaveView = () => {
if (!viewName.trim()) return;
// Here you would typically save the view data to your backend
const viewData = {
name: viewName,
description: viewDescription,
visibility: visibility,
tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
chartState: chart?.getOption()
};
console.log('Saving view:', viewData);
// Reset form and close modal
setViewName('');
setViewDescription('');
setVisibility('private');
setTags('');
setShowSaveModal(false);
// Show success message
const successMessage = document.createElement('div');
successMessage.className = 'fixed bottom-4 right-4 bg-[#238636] text-white px-4 py-2 rounded-md shadow-lg';
successMessage.textContent = 'View saved successfully!';
document.body.appendChild(successMessage);
setTimeout(() => {
successMessage.remove();
}, 3000);
};
// Mock data
const repositoryName = "organization/repository-name";
const branches = ["main", "develop", "feature/visualization", "bugfix/performance"];
const contributors = [
{ name: "Alex Johnson", commits: 156, avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20man%20with%20short%20dark%20hair%20and%20glasses%20wearing%20a%20blue%20shirt%20against%20a%20neutral%20gray%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=40&height=40&seq=1&orientation=squarish" },
{ name: "Sarah Chen", commits: 132, avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20medium%20length%20black%20hair%20wearing%20a%20dark%20blazer%20against%20a%20neutral%20gray%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=40&height=40&seq=2&orientation=squarish" },
{ name: "Michael Rodriguez", commits: 98, avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle%20aged%20man%20with%20brown%20hair%20and%20beard%20wearing%20a%20gray%20shirt%20against%20a%20neutral%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=40&height=40&seq=3&orientation=squarish" },
{ name: "Emma Wilson", commits: 87, avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20blonde%20hair%20tied%20back%20wearing%20a%20black%20top%20against%20a%20neutral%20gray%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=40&height=40&seq=4&orientation=squarish" },
{ name: "David Kim", commits: 64, avatar: "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20man%20with%20black%20hair%20wearing%20a%20white%20shirt%20against%20a%20neutral%20gray%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=40&height=40&seq=5&orientation=squarish" }
];
const commitHistory = [
{ id: "a1b2c3d", message: "Fix performance issues in visualization component", author: "Alex Johnson", date: "2 hours ago" },
{ id: "e5f6g7h", message: "Add new filter options for repository view", author: "Sarah Chen", date: "5 hours ago" },
{ id: "i9j0k1l", message: "Update documentation for API endpoints", author: "Michael Rodriguez", date: "Yesterday" },
{ id: "m2n3o4p", message: "Merge pull request #142 from feature/analytics", author: "Emma Wilson", date: "2 days ago" },
{ id: "q5r6s7t", message: "Refactor code structure for better maintainability", author: "David Kim", date: "3 days ago" }
];
useEffect(() => {
// Simulate loading
const timer = setTimeout(() => {
setIsLoading(false);
}, 1500);
return () => clearTimeout(timer);
}, []);
useEffect(() => {
if (!chartRef.current || isLoading) return;
const myChart = echarts.init(chartRef.current);
setChart(myChart);
// Generate mock graph data
const nodes = [];
const links = [];
const categories = [
{ name: 'JavaScript' },
{ name: 'TypeScript' },
{ name: 'CSS' },
{ name: 'HTML' },
{ name: 'Documentation' }
];
// Create nodes
const fileTypes = ['js', 'ts', 'css', 'html', 'md'];
const fileNames = [
'index', 'app', 'main', 'utils', 'helpers',
'components', 'hooks', 'services', 'api', 'constants',
'styles', 'types', 'interfaces', 'config', 'router'
];
for (let i = 0; i < 30; i++) {
const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
const categoryIndex = fileTypes.indexOf(fileType) % categories.length;
nodes.push({
id: i,
name: `${fileName}.${fileType}`,
symbolSize: 20 + Math.random() * 30,
category: categoryIndex,
value: Math.floor(Math.random() * 200)
});
}
// Create links
for (let i = 0; i < nodes.length; i++) {
const numLinks = Math.floor(Math.random() * 3) + 1;
for (let j = 0; j < numLinks; j++) {
const target = Math.floor(Math.random() * nodes.length);
if (target !== i) {
links.push({
source: i,
target: target,
value: Math.random()
});
}
}
}
const option = {
animation: false,
tooltip: {
trigger: 'item',
formatter: function(params: any) {
if (params.dataType === 'node') {
return `<div class="tooltip">
<div class="font-bold">${params.data.name}</div>
<div>Size: ${params.data.value} lines</div>
<div>Category: ${categories[params.data.category].name}</div>
</div>`;
}
return '';
}
},
legend: {
data: categories.map(a => a.name),
textStyle: {
color: '#c9d1d9'
},
right: 10,
top: 10
},
series: [
{
type: 'graph',
layout: 'force',
data: nodes,
links: links,
categories: categories,
roam: true,
label: {
show: true,
position: 'right',
formatter: '{b}',
color: '#c9d1d9'
},
force: {
repulsion: 100,
edgeLength: 100
},
lineStyle: {
color: 'source',
curveness: 0.3,
opacity: 0.6
},
emphasis: {
focus: 'adjacency',
lineStyle: {
width: 4
}
}
}
],
backgroundColor: 'transparent'
};
myChart.setOption(option);

// Add click event handler to the chart
myChart.on('click', function(params: echarts.ECElementEvent) {
 if (params.dataType === 'node' && params.data && typeof params.data === 'object' && 'name' in params.data) {
  handleNodeClick(params.data.name as string);
 }
});

const handleResize = () => {
myChart.resize();
};
window.addEventListener('resize', handleResize);
return () => {
myChart.dispose();
window.removeEventListener('resize', handleResize);
};
}, [isLoading]);
const toggleSidebar = () => {
setSidebarCollapsed(!sidebarCollapsed);
// Resize chart after sidebar toggle
setTimeout(() => {
chart?.resize();
}, 300);
};
const handleNodeClick = (node: string) => {
setSelectedNode(node);
};
return (
<div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
{/* Header */}
<header className="bg-[#161b22] border-b border-gray-700 px-4 py-3 flex items-center justify-between">
<div className="flex items-center">
<div className="mr-4">
<i className="fab fa-github text-white text-2xl"></i>
</div>
<div className="flex items-center text-sm">
{repositoryName.split('/').map((part, index) => (
 <React.Fragment key={index}>
  {index > 0 && <span className="mx-1">/</span>}
  <span className={`text-[#58a6ff] cursor-pointer ${index > 0 ? 'font-semibold' : ''}`}>{part}</span>
 </React.Fragment>
))}
<div className="ml-4 flex items-center text-xs bg-[#30363d] rounded-full px-2 py-1">
<i className="fas fa-code-branch mr-1"></i>
<span>{branches[0]}</span>
</div>
</div>
</div>
<div className="flex items-center">
<div className="relative mr-4">
<input
type="text"
placeholder="Search repository"
className="bg-[#0d1117] border border-gray-700 rounded-md py-1 px-3 pl-8 text-sm focus:outline-none focus:border-[#58a6ff] w-64"
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
src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20man%20with%20short%20dark%20hair%20wearing%20a%20blue%20shirt%20against%20a%20neutral%20gray%20background%2C%20high%20quality%20portrait%20photo%2C%208k%2C%20ultra%20detailed%2C%20professional%20lighting&width=32&height=32&seq=6&orientation=squarish"
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
<div className="flex items-center px-3 py-1 border-b-2 border-[#f78166] text-white cursor-pointer">
<i className="fas fa-project-diagram mr-2"></i>
<span>Visualization</span>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-code mr-2"></i>
<a href="https://readdy.ai/home/84caaf0c-a0e2-47df-bf61-758434ccc1a1/5159d663-4c32-4d0f-8863-f8fbfe495637" data-readdy="true" className="hover:text-white">Code</a>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-exclamation-circle mr-2"></i>
<a href="https://readdy.ai/home/84caaf0c-a0e2-47df-bf61-758434ccc1a1/1e656ebc-4a63-48f9-8e9c-6090d84d971b" data-readdy="true" className="hover:text-white">Issues</a>
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
{/* Main Content */}
<div className="flex h-[calc(100vh-112px)]">
{/* Main Visualization Area */}
<div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-full' : 'w-[70%]'}`}>
{isLoading ? (
<div className="h-full flex items-center justify-center">
<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#58a6ff]"></div>
</div>
) : (
<div className="p-4 h-full">
<div className="bg-[#161b22] rounded-md p-4 h-full">
<div className="flex justify-between items-center mb-4">
<h2 className="text-lg font-semibold">Repository Visualization</h2>
<div className="flex items-center space-x-2">
<button
className={`px-3 py-1 rounded-md text-sm font-medium ${activeView === 'mind-map' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setActiveView('mind-map')}
>
<i className="fas fa-project-diagram mr-1"></i> Mind Map
</button>
<button
className={`px-3 py-1 rounded-md text-sm font-medium ${activeView === 'list' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setActiveView('list')}
>
<i className="fas fa-list mr-1"></i> List
</button>
<button
className={`px-3 py-1 rounded-md text-sm font-medium ${activeView === 'grid' ? 'bg-[#30363d] text-white' : 'text-gray-400 hover:text-white'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setActiveView('grid')}
>
<i className="fas fa-th mr-1"></i> Grid
</button>
</div>
</div>
<div ref={chartRef} className="w-full h-[calc(100%-40px)]"></div>
{/* Zoom Controls */}
<div className="absolute bottom-6 right-6 bg-[#161b22] rounded-md shadow-lg border border-gray-700 flex">
<button className="p-2 hover:bg-[#30363d] !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-search-plus"></i>
</button>
<button className="p-2 hover:bg-[#30363d] !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-search-minus"></i>
</button>
<button className="p-2 hover:bg-[#30363d] !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-expand"></i>
</button>
</div>
</div>
</div>
)}
</div>
{/* Sidebar */}
<div
className={`bg-[#161b22] border-l border-gray-700 transition-all duration-300 ease-in-out ${
sidebarCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-[30%] opacity-100'
}`}
>
<div className="p-4 h-full overflow-y-auto">
<div className="flex justify-between items-center mb-4">
<h2 className="text-lg font-semibold">Details</h2>
<button
onClick={toggleSidebar}
className="text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-times"></i>
</button>
</div>
{selectedNode ? (
<div className="mb-6">
<h3 className="text-md font-medium mb-2">File Information</h3>
<div className="bg-[#0d1117] rounded-md p-3">
<div className="mb-2">
<span className="text-gray-400">Name:</span> {selectedNode}
</div>
<div className="mb-2">
<span className="text-gray-400">Type:</span> JavaScript
</div>
<div className="mb-2">
<span className="text-gray-400">Size:</span> 2.4 KB
</div>
<div className="mb-2">
<span className="text-gray-400">Last modified:</span> 2 days ago
</div>
<div>
<span className="text-gray-400">Contributors:</span> 3
</div>
</div>
</div>
) : null}
{/* Contributors Section */}
<div className="mb-6">
<h3 className="text-md font-medium mb-2">Top Contributors</h3>
<div className="bg-[#0d1117] rounded-md p-3">
{contributors.map((contributor, index) => (
<div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
<div className="flex items-center">
<img
src={contributor.avatar}
alt={contributor.name}
className="w-8 h-8 rounded-full mr-3"
/>
<span>{contributor.name}</span>
</div>
<div className="text-sm text-gray-400">{contributor.commits} commits</div>
</div>
))}
</div>
</div>
{/* Commit History */}
<div className="mb-6">
<h3 className="text-md font-medium mb-2">Recent Commits</h3>
<div className="bg-[#0d1117] rounded-md">
{commitHistory.map((commit, index) => (
<div key={index} className="p-3 border-b border-gray-700 last:border-0">
<div className="flex items-center justify-between mb-1">
<div className="text-[#58a6ff] text-sm cursor-pointer">{commit.id.substring(0, 7)}</div>
<div className="text-xs text-gray-400">{commit.date}</div>
</div>
<div className="mb-1 text-sm">{commit.message}</div>
<div className="text-xs text-gray-400">{commit.author}</div>
</div>
))}
</div>
</div>
{/* Activity Heat Map */}
<div>
<h3 className="text-md font-medium mb-2">Activity</h3>
<div className="bg-[#0d1117] rounded-md p-3">
<div className="grid grid-cols-7 gap-1">
{Array.from({ length: 35 }).map((_, index) => (
<div
key={index}
className={`w-full aspect-square rounded-sm ${
Math.random() > 0.7
? 'bg-[#39d353]'
: Math.random() > 0.5
? 'bg-[#26a641]'
: Math.random() > 0.3
? 'bg-[#006d32]'
: 'bg-[#0e4429]'
}`}
title={`${Math.floor(Math.random() * 10)} contributions on May ${index % 31 + 1}, 2025`}
></div>
))}
</div>
</div>
</div>
</div>
</div>
{/* Sidebar Toggle Button (visible when sidebar is collapsed) */}
{sidebarCollapsed && (
<button
onClick={toggleSidebar}
className="absolute right-4 top-24 bg-[#161b22] border border-gray-700 rounded-md p-2 text-gray-400 hover:text-white cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-chevron-left"></i>
</button>
)}
</div>
{/* Bottom Control Panel */}
<div className="fixed bottom-0 left-0 right-0 bg-[#161b22] border-t border-gray-700 px-4 py-2 flex justify-between items-center">
<div className="flex items-center space-x-4">
<div className="flex items-center">
<span className="text-sm mr-2">Branch:</span>
<div className="relative">
<button className="bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer">
<span>main</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
</div>
</div>
<div className="flex items-center">
<span className="text-sm mr-2">Time Range:</span>
<div className="relative">
<button className="bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer">
<span>Last 30 days</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
</div>
</div>
</div>
<div className="flex items-center space-x-2">
<button className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-download mr-1"></i> Export
</button>
<button className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-share-alt mr-1"></i> Share
</button>
<button
id="saveViewBtn"
onClick={() => setShowSaveModal(true)}
className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-3 py-1 text-sm !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-save mr-1"></i> Save View
</button>
{/* Save View Modal */}
{showSaveModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-[#161b22] rounded-lg w-[500px] border border-gray-700">
<div className="flex justify-between items-center p-4 border-b border-gray-700">
<h3 className="text-lg font-medium">Save View</h3>
<button
id="closeModalBtn"
onClick={() => setShowSaveModal(false)}
className="text-gray-400 hover:text-white">
<i className="fas fa-times"></i>
</button>
</div>
<div className="p-4">
<div className="mb-4">
<label htmlFor="viewName" className="block text-sm font-medium mb-2">View Name</label>
<input
type="text"
id="viewName"
value={viewName}
onChange={(e) => setViewName(e.target.value)}
className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff]"
placeholder="Enter view name"
/>
</div>
<div className="mb-4">
<label htmlFor="viewDescription" className="block text-sm font-medium mb-2">Description</label>
<textarea
id="viewDescription"
value={viewDescription}
onChange={(e) => setViewDescription(e.target.value)}
className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff] h-24 resize-none"
placeholder="Add a description (optional)"
/>
</div>
<div className="mb-4">
<label className="block text-sm font-medium mb-2">Visibility</label>
<div className="space-y-2">
<label className="flex items-center">
<input
type="radio"
name="visibility"
id="privateVisibility"
value="private"
checked={visibility === 'private'}
onChange={(e) => setVisibility(e.target.value)}
className="mr-2"
/>
<span>Private - Only you</span>
</label>
<label className="flex items-center">
<input
type="radio"
name="visibility"
id="teamVisibility"
value="team"
checked={visibility === 'team'}
onChange={(e) => setVisibility(e.target.value)}
className="mr-2"
/>
<span>Team - All team members</span>
</label>
<label className="flex items-center">
<input
type="radio"
name="visibility"
id="publicVisibility"
value="public"
checked={visibility === 'public'}
onChange={(e) => setVisibility(e.target.value)}
className="mr-2"
/>
<span>Public - Anyone with the link</span>
</label>
</div>
</div>
<div className="mb-4">
<label htmlFor="viewTags" className="block text-sm font-medium mb-2">Tags</label>
<input
type="text"
id="viewTags"
value={tags}
onChange={(e) => setTags(e.target.value)}
className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#58a6ff]"
placeholder="Add tags (comma separated)"
/>
</div>
</div>
<div className="flex justify-end gap-2 p-4 border-t border-gray-700">
<button
id="cancelSaveBtn"
onClick={() => setShowSaveModal(false)}
className="px-4 py-2 text-sm border border-gray-700 rounded-md hover:border-gray-600 !rounded-button whitespace-nowrap cursor-pointer"
>
Cancel
</button>
<button
id="confirmSaveBtn"
onClick={handleSaveView}
disabled={!viewName.trim()}
className={`px-4 py-2 text-sm rounded-md text-white !rounded-button whitespace-nowrap cursor-pointer ${
viewName.trim() ? 'bg-[#238636] hover:bg-[#2ea043]' : 'bg-[#238636] opacity-50 cursor-not-allowed'
}`}
>
Save View
</button>
</div>
</div>
</div>
)}
</div>
</div>
{/* Accessibility Menu Button */}
<button className="fixed bottom-16 right-4 bg-[#161b22] border border-gray-700 rounded-full p-3 text-gray-400 hover:text-white shadow-lg !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-universal-access"></i>
</button>
</div>
);
};
export default App
