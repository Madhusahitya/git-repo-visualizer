// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
const [issueFilter, setIssueFilter] = useState('open');
const [searchQuery, setSearchQuery] = useState('');
const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
const [sortBy, setSortBy] = useState('newest');
const [showLabelFilter, setShowLabelFilter] = useState(false);
const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);
const [showSortOptions, setShowSortOptions] = useState(false);
// Mock data
const issues = [
{
id: 1,
title: "Fix performance issues in visualization component",
number: "#123",
status: "open",
labels: ["bug", "high priority"],
assignees: [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520glasses%2520wearing%2520a%2520blue%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=1&orientation=squarish" }
],
comments: 5,
createdAt: "2 days ago",
author: "Sarah Chen"
},
{
id: 2,
title: "Add new filter options for repository view",
number: "#122",
status: "open",
labels: ["enhancement", "ui"],
assignees: [
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520woman%2520with%2520blonde%2520hair%2520tied%2520back%2520wearing%2520a%2520black%2520top%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=4&orientation=squarish" }
],
comments: 3,
createdAt: "3 days ago",
author: "Michael Rodriguez"
},
{
id: 3,
title: "Update documentation for API endpoints",
number: "#121",
status: "closed",
labels: ["documentation"],
assignees: [
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520an%2520asian%2520man%2520with%2520black%2520hair%2520wearing%2520a%2520white%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=5&orientation=squarish" }
],
comments: 2,
createdAt: "5 days ago",
author: "Alex Johnson"
},
{
id: 4,
title: "Implement dark mode toggle for visualization",
number: "#120",
status: "open",
labels: ["enhancement", "ui", "accessibility"],
assignees: [
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520woman%2520with%2520medium%2520length%2520black%2520hair%2520wearing%2520a%2520dark%2520blazer%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=2&orientation=squarish" }
],
comments: 7,
createdAt: "1 week ago",
author: "Emma Wilson"
},
{
id: 5,
title: "Fix broken links in repository README",
number: "#119",
status: "closed",
labels: ["bug", "documentation"],
assignees: [
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520aged%2520man%2520with%2520brown%2520hair%2520and%2520beard%2520wearing%2520a%2520gray%2520shirt%2520against%2520a%2520neutral%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=3&orientation=squarish" }
],
comments: 1,
createdAt: "1 week ago",
author: "David Kim"
}
];
const labelColors: Record<string, string> = {
bug: "bg-[#d73a4a]",
enhancement: "bg-[#a2eeef]",
documentation: "bg-[#0075ca]",
"high priority": "bg-[#b60205]",
ui: "bg-[#7057ff]",
accessibility: "bg-[#008672]"
};
const availableLabels = [
{ name: "bug", count: 2 },
{ name: "enhancement", count: 2 },
{ name: "documentation", count: 2 },
{ name: "high priority", count: 1 },
{ name: "ui", count: 2 },
{ name: "accessibility", count: 1 }
];
const availableAssignees = [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520man%2520with%2520short%2520dark%2520hair%2520and%2520glasses%2520wearing%2520a%2520blue%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=1&orientation=squarish", count: 1 },
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520woman%2520with%2520medium%2520length%2520black%2520hair%2520wearing%2520a%2520dark%2520blazer%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=2&orientation=squarish", count: 1 },
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520middle%2520aged%2520man%2520with%2520brown%2520hair%2520and%2520beard%2520wearing%2520a%2520gray%2520shirt%2520against%2520a%2520neutral%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=3&orientation=squarish", count: 1 },
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520a%2520young%2520woman%2520with%2520blonde%2520hair%2520tied%2520back%2520wearing%2520a%2520black%2520top%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=4&orientation=squarish", count: 1 },
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%2520headshot%2520of%2520an%2520asian%2520man%2520with%2520black%2520hair%2520wearing%2520a%2520white%2520shirt%2520against%2520a%2520neutral%2520gray%2520background%252C%2520high%2520quality%2520portrait%2520photo%252C%25208k%252C%2520ultra%2520detailed%252C%2520professional%2520lighting&width=40&height=40&seq=5&orientation=squarish", count: 1 }
];
const sortOptions = [
{ value: "newest", label: "Newest" },
{ value: "oldest", label: "Oldest" },
{ value: "most-commented", label: "Most commented" },
{ value: "least-commented", label: "Least commented" },
{ value: "recently-updated", label: "Recently updated" },
{ value: "least-recently-updated", label: "Least recently updated" }
];
const toggleLabelSelection = (label: string) => {
if (selectedLabels.includes(label)) {
setSelectedLabels(selectedLabels.filter(l => l !== label));
} else {
setSelectedLabels([...selectedLabels, label]);
}
};
const toggleAssigneeSelection = (assignee: string) => {
if (selectedAssignees.includes(assignee)) {
setSelectedAssignees(selectedAssignees.filter(a => a !== assignee));
} else {
setSelectedAssignees([...selectedAssignees, assignee]);
}
};
const filteredIssues = issues.filter(issue => {
// Filter by status
if (issueFilter !== 'all' && issue.status !== issueFilter) return false;
// Filter by search query
if (searchQuery && !issue.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
// Filter by selected labels
if (selectedLabels.length > 0 && !issue.labels.some(label => selectedLabels.includes(label))) return false;
// Filter by selected assignees
if (selectedAssignees.length > 0 && !issue.assignees.some(assignee => selectedAssignees.includes(assignee.name))) return false;
return true;
});
// Sort issues
const sortedIssues = [...filteredIssues].sort((a, b) => {
switch (sortBy) {
case 'oldest':
return 1; // Reverse order for demo
case 'most-commented':
return b.comments - a.comments;
case 'least-commented':
return a.comments - b.comments;
case 'recently-updated':
return 1; // Would need timestamp data
case 'least-recently-updated':
return -1; // Would need timestamp data
case 'newest':
default:
return -1; // Default sort by newest
}
});
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
<div className="ml-4 flex items-center text-xs bg-[#30363d] rounded-full px-2 py-1">
<i className="fas fa-code-branch mr-1"></i>
<span>main</span>
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
<i className="fas fa-code mr-2"></i>
<a href="https://readdy.ai/home/84caaf0c-a0e2-47df-bf61-758434ccc1a1/8d7b9a3e-353f-4dfc-be95-a86cb31884ba" data-readdy="true" className="hover:text-white">Code</a>
</div>
<div className="flex items-center px-3 py-1 border-b-2 border-[#f78166] text-white cursor-pointer">
<i className="fas fa-exclamation-circle mr-2"></i>
<span>Issues</span>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-code-branch mr-2"></i>
<a href="https://readdy.ai/home/84caaf0c-a0e2-47df-bf61-758434ccc1a1/6bfe272f-640c-4be7-9597-5b4f4c14d485" data-readdy="true" className="hover:text-white">Pull Requests</a>
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
<div className="container mx-auto px-4 py-6">
<div className="flex flex-col lg:flex-row gap-6">
{/* Left Sidebar */}
<div className="lg:w-1/4">
<div className="bg-[#161b22] rounded-md border border-gray-700 overflow-hidden">
<div className="p-4 border-b border-gray-700">
<h3 className="font-medium text-white">Filters</h3>
</div>
<div className="p-4">
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Issue state</h4>
<div className="space-y-2">
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="issueState"
checked={issueFilter === 'open'}
onChange={() => setIssueFilter('open')}
className="mr-2"
/>
<span className="text-sm">Open issues</span>
</label>
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="issueState"
checked={issueFilter === 'closed'}
onChange={() => setIssueFilter('closed')}
className="mr-2"
/>
<span className="text-sm">Closed issues</span>
</label>
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="issueState"
checked={issueFilter === 'all'}
onChange={() => setIssueFilter('all')}
className="mr-2"
/>
<span className="text-sm">All issues</span>
</label>
</div>
</div>
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Author</h4>
<div className="relative">
<input
type="text"
placeholder="Filter by author"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
<i className="fas fa-search absolute right-3 top-2.5 text-gray-500 text-sm"></i>
</div>
</div>
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Labels</h4>
<div className="space-y-2">
{availableLabels.map((label, index) => (
<div key={index} className="flex items-center justify-between cursor-pointer" onClick={() => toggleLabelSelection(label.name)}>
<div className="flex items-center">
<span className={`w-3 h-3 rounded-full ${labelColors[label.name]} mr-2`}></span>
<span className="text-sm">{label.name}</span>
</div>
<span className="text-xs text-gray-400">{label.count}</span>
</div>
))}
</div>
</div>
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Projects</h4>
<div className="relative">
<input
type="text"
placeholder="Filter by project"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
<i className="fas fa-search absolute right-3 top-2.5 text-gray-500 text-sm"></i>
</div>
</div>
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Milestones</h4>
<div className="relative">
<input
type="text"
placeholder="Filter by milestone"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
<i className="fas fa-search absolute right-3 top-2.5 text-gray-500 text-sm"></i>
</div>
</div>
<div className="mb-6">
<h4 className="text-sm font-medium mb-2">Assignees</h4>
<div className="space-y-2">
{availableAssignees.map((assignee, index) => (
<div key={index} className="flex items-center justify-between cursor-pointer" onClick={() => toggleAssigneeSelection(assignee.name)}>
<div className="flex items-center">
<img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full mr-2" />
<span className="text-sm">{assignee.name}</span>
</div>
<span className="text-xs text-gray-400">{assignee.count}</span>
</div>
))}
</div>
</div>
</div>
</div>
</div>
{/* Main Content */}
<div className="lg:w-3/4">
<div className="bg-[#161b22] rounded-md border border-gray-700 overflow-hidden">
{/* Issue Toolbar */}
<div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div className="flex items-center">
<div className="flex border border-gray-700 rounded-md overflow-hidden">
<button
className={`px-3 py-1 text-sm font-medium flex items-center ${issueFilter === 'open' ? 'bg-[#238636] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setIssueFilter('open')}
>
<i className="fas fa-exclamation-circle mr-1"></i> Open
</button>
<button
className={`px-3 py-1 text-sm font-medium flex items-center ${issueFilter === 'closed' ? 'bg-[#8957e5] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setIssueFilter('closed')}
>
<i className="fas fa-check-circle mr-1"></i> Closed
</button>
</div>
</div>
<div className="w-full sm:w-auto">
<button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium w-full sm:w-auto !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-plus mr-1"></i> New Issue
</button>
</div>
</div>
{/* Search and Filter Bar */}
<div className="p-4 border-b border-gray-700 flex flex-wrap items-center gap-2">
<div className="relative flex-grow">
<input
type="text"
placeholder="Search all issues"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 pl-8 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
<i className="fas fa-search absolute left-3 top-2.5 text-gray-500 text-sm"></i>
</div>
<div className="relative">
<button
className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-2 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
onClick={() => setShowLabelFilter(!showLabelFilter)}
>
<span>Labels</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
{showLabelFilter && (
<div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
<div className="p-3 border-b border-gray-700">
<input
type="text"
placeholder="Filter labels"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
</div>
<div className="max-h-60 overflow-y-auto p-2">
{availableLabels.map((label, index) => (
<div
key={index}
className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
onClick={() => toggleLabelSelection(label.name)}
>
<input
type="checkbox"
checked={selectedLabels.includes(label.name)}
onChange={() => {}}
className="mr-2"
/>
<span className={`w-3 h-3 rounded-full ${labelColors[label.name]} mr-2`}></span>
<span className="text-sm">{label.name}</span>
</div>
))}
</div>
</div>
)}
</div>
<div className="relative">
<button
className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-2 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
onClick={() => setShowAssigneeFilter(!showAssigneeFilter)}
>
<span>Assignees</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
{showAssigneeFilter && (
<div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
<div className="p-3 border-b border-gray-700">
<input
type="text"
placeholder="Filter users"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
</div>
<div className="max-h-60 overflow-y-auto p-2">
{availableAssignees.map((assignee, index) => (
<div
key={index}
className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
onClick={() => toggleAssigneeSelection(assignee.name)}
>
<input
type="checkbox"
checked={selectedAssignees.includes(assignee.name)}
onChange={() => {}}
className="mr-2"
/>
<img src={assignee.avatar} alt={assignee.name} className="w-5 h-5 rounded-full mr-2" />
<span className="text-sm">{assignee.name}</span>
</div>
))}
</div>
</div>
)}
</div>
<div className="relative">
<button
className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-2 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
onClick={() => setShowSortOptions(!showSortOptions)}
>
<span>Sort</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
{showSortOptions && (
<div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
<div className="max-h-60 overflow-y-auto p-2">
{sortOptions.map((option, index) => (
<div
key={index}
className={`flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer ${sortBy === option.value ? 'bg-[#30363d]' : ''}`}
onClick={() => {
setSortBy(option.value);
setShowSortOptions(false);
}}
>
<i className={`fas ${sortBy === option.value ? 'fa-check mr-2' : 'fa-blank mr-5'}`}></i>
<span className="text-sm">{option.label}</span>
</div>
))}
</div>
</div>
)}
</div>
</div>
{/* Issues List */}
{sortedIssues.length > 0 ? (
<div>
{sortedIssues.map((issue) => (
<div
key={issue.id}
className="border-b border-gray-700 hover:bg-[#161b22] transition-colors cursor-pointer p-4"
>
<div className="flex items-start">
<div className="mt-1 mr-3">
{issue.status === 'open' ? (
<i className="fas fa-exclamation-circle text-[#238636]"></i>
) : (
<i className="fas fa-check-circle text-[#8957e5]"></i>
)}
</div>
<div className="flex-grow">
<div className="flex flex-wrap items-start justify-between">
<div>
<h3 className="text-base font-medium text-[#58a6ff] hover:underline mb-1">{issue.title}</h3>
<div className="text-xs text-gray-400">
{issue.number} opened {issue.createdAt} by {issue.author}
</div>
</div>
<div className="flex items-center mt-1 space-x-2">
{issue.assignees.length > 0 && (
<div className="flex -space-x-1">
{issue.assignees.map((assignee, idx) => (
<img
key={idx}
src={assignee.avatar}
alt={assignee.name}
title={assignee.name}
className="w-6 h-6 rounded-full border border-[#0d1117]"
/>
))}
</div>
)}
{issue.comments > 0 && (
<div className="flex items-center text-gray-400 text-xs">
<i className="far fa-comment-alt mr-1"></i>
<span>{issue.comments}</span>
</div>
)}
</div>
</div>
<div className="mt-2 flex flex-wrap gap-1">
{issue.labels.map((label, idx) => (
<span
key={idx}
className={`text-xs px-2 py-0.5 rounded-full ${labelColors[label]} bg-opacity-20 text-white`}
>
{label}
</span>
))}
</div>
</div>
</div>
</div>
))}
</div>
) : (
<div className="py-16 flex flex-col items-center justify-center">
<div className="mb-4 text-gray-400">
<i className="fas fa-search text-5xl"></i>
</div>
<h3 className="text-xl font-medium mb-2">No issues found</h3>
<p className="text-gray-400 text-center max-w-md mb-4">
There aren't any issues that match your current filter criteria.
</p>
<button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-plus mr-1"></i> New Issue
</button>
</div>
)}
{/* Pagination */}
{sortedIssues.length > 0 && (
<div className="p-4 flex justify-center">
<div className="flex border border-gray-700 rounded-md overflow-hidden">
<button className="px-3 py-1 bg-[#0d1117] hover:bg-[#30363d] text-sm border-r border-gray-700 !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-chevron-left"></i>
</button>
<button className="px-3 py-1 bg-[#0d1117] hover:bg-[#30363d] text-sm !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-chevron-right"></i>
</button>
</div>
</div>
)}
</div>
</div>
</div>
</div>
</div>
);
};
export default App
