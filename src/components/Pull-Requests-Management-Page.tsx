// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const App: React.FC = () => {
const [prFilter, setPrFilter] = useState('open');
const [searchQuery, setSearchQuery] = useState('');
const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
const [selectedReviewers, setSelectedReviewers] = useState<string[]>([]);
const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
const [sortBy, setSortBy] = useState('newest');
const [showLabelFilter, setShowLabelFilter] = useState(false);
const [showReviewerFilter, setShowReviewerFilter] = useState(false);
const [showAssigneeFilter, setShowAssigneeFilter] = useState(false);
const [showSortOptions, setShowSortOptions] = useState(false);
// Mock data
const pullRequests = [
{
id: 1,
title: "Implement dark mode for dashboard components",
number: "#145",
status: "open",
labels: ["enhancement", "ui"],
reviewers: [
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520asian%252520man%252520with%252520black%252520hair%252520wearing%252520a%252520white%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=5&orientation=squarish" }
],
assignees: [
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520medium%252520length%252520black%252520hair%252520wearing%252520a%252520dark%252520blazer%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=2&orientation=squarish" }
],
comments: 7,
createdAt: "2 days ago",
author: "Alex Johnson",
reviewStatus: "Awaiting review"
},
{
id: 2,
title: "Fix API response handling in data visualization module",
number: "#144",
status: "open",
labels: ["bug", "high priority"],
reviewers: [
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520blonde%252520hair%252520tied%252520back%252520wearing%252520a%252520black%252520top%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=4&orientation=squarish" }
],
assignees: [
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520middle%252520aged%252520man%252520with%252520brown%252520hair%252520and%252520beard%252520wearing%252520a%252520gray%252520shirt%252520against%252520a%252520neutral%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=3&orientation=squarish" }
],
comments: 5,
createdAt: "3 days ago",
author: "Sarah Chen",
reviewStatus: "Changes requested"
},
{
id: 3,
title: "Add pagination to repository search results",
number: "#143",
status: "merged",
labels: ["enhancement"],
reviewers: [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520man%252520with%252520short%252520dark%252520hair%252520and%252520glasses%252520wearing%252520a%252520blue%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=1&orientation=squarish" }
],
assignees: [
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520blonde%252520hair%252520tied%252520back%252520wearing%252520a%252520black%252520top%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=4&orientation=squarish" }
],
comments: 3,
createdAt: "5 days ago",
author: "David Kim",
reviewStatus: "Approved"
},
{
id: 4,
title: "Update documentation for new API endpoints",
number: "#142",
status: "closed",
labels: ["documentation"],
reviewers: [
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520medium%252520length%252520black%252520hair%252520wearing%252520a%252520dark%252520blazer%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=2&orientation=squarish" }
],
assignees: [
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520asian%252520man%252520with%252520black%252520hair%252520wearing%252520a%252520white%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=5&orientation=squarish" }
],
comments: 2,
createdAt: "1 week ago",
author: "Michael Rodriguez",
reviewStatus: "Rejected"
},
{
id: 5,
title: "Implement accessibility improvements for form components",
number: "#141",
status: "merged",
labels: ["accessibility", "ui"],
reviewers: [
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520middle%252520aged%252520man%252520with%252520brown%252520hair%252520and%252520beard%252520wearing%252520a%252520gray%252520shirt%252520against%252520a%252520neutral%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=3&orientation=squarish" }
],
assignees: [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520man%252520with%252520short%252520dark%252520hair%252520and%252520glasses%252520wearing%252520a%252520blue%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=1&orientation=squarish" }
],
comments: 4,
createdAt: "1 week ago",
author: "Emma Wilson",
reviewStatus: "Approved"
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
{ name: "bug", count: 1 },
{ name: "enhancement", count: 3 },
{ name: "documentation", count: 1 },
{ name: "high priority", count: 1 },
{ name: "ui", count: 2 },
{ name: "accessibility", count: 1 }
];
const availableReviewers = [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520man%252520with%252520short%252520dark%252520hair%252520and%252520glasses%252520wearing%252520a%252520blue%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=1&orientation=squarish", count: 1 },
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520medium%252520length%252520black%252520hair%252520wearing%252520a%252520dark%252520blazer%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=2&orientation=squarish", count: 1 },
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520middle%252520aged%252520man%252520with%252520brown%252520hair%252520and%252520beard%252520wearing%252520a%252520gray%252520shirt%252520against%252520a%252520neutral%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=3&orientation=squarish", count: 1 },
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520blonde%252520hair%252520tied%252520back%252520wearing%252520a%252520black%252520top%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=4&orientation=squarish", count: 1 },
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520asian%252520man%252520with%252520black%252520hair%252520wearing%252520a%252520white%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=5&orientation=squarish", count: 1 }
];
const availableAssignees = [
{ name: "Alex Johnson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520man%252520with%252520short%252520dark%252520hair%252520and%252520glasses%252520wearing%252520a%252520blue%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=1&orientation=squarish", count: 1 },
{ name: "Sarah Chen", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520medium%252520length%252520black%252520hair%252520wearing%252520a%252520dark%252520blazer%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=2&orientation=squarish", count: 1 },
{ name: "Michael Rodriguez", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520middle%252520aged%252520man%252520with%252520brown%252520hair%252520and%252520beard%252520wearing%252520a%252520gray%252520shirt%252520against%252520a%252520neutral%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=3&orientation=squarish", count: 1 },
{ name: "Emma Wilson", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520woman%252520with%252520blonde%252520hair%252520tied%252520back%252520wearing%252520a%252520black%252520top%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=4&orientation=squarish", count: 1 },
{ name: "David Kim", avatar: "https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520an%252520asian%252520man%252520with%252520black%252520hair%252520wearing%252520a%252520white%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=40&height=40&seq=5&orientation=squarish", count: 1 }
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
const toggleReviewerSelection = (reviewer: string) => {
if (selectedReviewers.includes(reviewer)) {
setSelectedReviewers(selectedReviewers.filter(r => r !== reviewer));
} else {
setSelectedReviewers([...selectedReviewers, reviewer]);
}
};
const toggleAssigneeSelection = (assignee: string) => {
if (selectedAssignees.includes(assignee)) {
setSelectedAssignees(selectedAssignees.filter(a => a !== assignee));
} else {
setSelectedAssignees([...selectedAssignees, assignee]);
}
};
const filteredPRs = pullRequests.filter(pr => {
// Filter by status
if (prFilter !== 'all') {
if (prFilter === 'open' && pr.status !== 'open') return false;
if (prFilter === 'closed' && !['closed', 'merged'].includes(pr.status)) return false;
if (prFilter === 'merged' && pr.status !== 'merged') return false;
}
// Filter by search query
if (searchQuery && !pr.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
// Filter by selected labels
if (selectedLabels.length > 0 && !pr.labels.some(label => selectedLabels.includes(label))) return false;
// Filter by selected reviewers
if (selectedReviewers.length > 0 && !pr.reviewers.some(reviewer => selectedReviewers.includes(reviewer.name))) return false;
// Filter by selected assignees
if (selectedAssignees.length > 0 && !pr.assignees.some(assignee => selectedAssignees.includes(assignee.name))) return false;
return true;
});
// Sort PRs
const sortedPRs = [...filteredPRs].sort((a, b) => {
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
const getStatusIcon = (status: string) => {
switch (status) {
case 'open':
return <i className="fas fa-code-branch text-[#238636]"></i>;
case 'closed':
return <i className="fas fa-times-circle text-[#da3633]"></i>;
case 'merged':
return <i className="fas fa-code-merge text-[#8957e5]"></i>;
default:
return <i className="fas fa-code-branch text-[#238636]"></i>;
}
};
const getStatusColor = (status: string) => {
switch (status) {
case 'open':
return 'bg-[#238636]';
case 'closed':
return 'bg-[#da3633]';
case 'merged':
return 'bg-[#8957e5]';
default:
return 'bg-[#238636]';
}
};
const getReviewStatusBadge = (status: string) => {
switch (status) {
case 'Approved':
return <span className="px-2 py-0.5 text-xs bg-[#238636] bg-opacity-20 text-[#238636] rounded-full">Approved</span>;
case 'Changes requested':
return <span className="px-2 py-0.5 text-xs bg-[#da3633] bg-opacity-20 text-[#da3633] rounded-full">Changes requested</span>;
case 'Awaiting review':
return <span className="px-2 py-0.5 text-xs bg-[#f0883e] bg-opacity-20 text-[#f0883e] rounded-full">Awaiting review</span>;
case 'Rejected':
return <span className="px-2 py-0.5 text-xs bg-[#da3633] bg-opacity-20 text-[#da3633] rounded-full">Rejected</span>;
default:
return <span className="px-2 py-0.5 text-xs bg-gray-500 bg-opacity-20 text-gray-400 rounded-full">Pending</span>;
}
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
src="https://readdy.ai/api/search-image?query=professional%252520headshot%252520of%252520a%252520young%252520man%252520with%252520short%252520dark%252520hair%252520wearing%252520a%252520blue%252520shirt%252520against%252520a%252520neutral%252520gray%252520background%25252C%252520high%252520quality%252520portrait%252520photo%25252C%2525208k%25252C%252520ultra%252520detailed%25252C%252520professional%252520lighting&width=32&height=32&seq=6&orientation=squarish"
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
<Link to="/code" className="hover:text-white">Code</Link>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-exclamation-circle mr-2"></i>
<Link to="/issues" className="hover:text-white">Issues</Link>
</div>
<div
className="relative flex items-center px-3 py-1 border-b-2 border-[#f78166] text-white cursor-pointer group"
onClick={() => {
const dropdown = document.getElementById('pr-nav-dropdown');
if (dropdown) {
dropdown.classList.toggle('hidden');
}
}}
>
<i className="fas fa-code-branch mr-2"></i>
<span>Pull Requests</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
<div
id="pr-nav-dropdown"
className="hidden absolute top-full left-0 mt-1 w-48 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-20"
>
<div className="py-1">
<a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#30363d]">
<i className="fas fa-plus-circle mr-2"></i>
Created by me
</a>
<a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#30363d]">
<i className="fas fa-user-check mr-2"></i>
Assigned to me
</a>
<a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#30363d]">
<i className="fas fa-at mr-2"></i>
Mentioned me
</a>
<a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-[#30363d]">
<i className="fas fa-code-review mr-2"></i>
Review requests
</a>
</div>
</div>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-play mr-2"></i>
<Link to="/actions" className="hover:text-white">Actions</Link>
</div>
<div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
<i className="fas fa-chart-bar mr-2"></i>
<Link to="/insights" className="hover:text-white">Insights</Link>
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
<h4 className="text-sm font-medium mb-2">Pull Request state</h4>
<div className="space-y-2">
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="prState"
checked={prFilter === 'open'}
onChange={() => setPrFilter('open')}
className="mr-2"
/>
<span className="text-sm">Open pull requests</span>
</label>
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="prState"
checked={prFilter === 'closed'}
onChange={() => setPrFilter('closed')}
className="mr-2"
/>
<span className="text-sm">Closed pull requests</span>
</label>
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="prState"
checked={prFilter === 'merged'}
onChange={() => setPrFilter('merged')}
className="mr-2"
/>
<span className="text-sm">Merged pull requests</span>
</label>
<label className="flex items-center cursor-pointer">
<input
type="radio"
name="prState"
checked={prFilter === 'all'}
onChange={() => setPrFilter('all')}
className="mr-2"
/>
<span className="text-sm">All pull requests</span>
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
<div
key={index}
className="flex items-center justify-between cursor-pointer"
onClick={() => toggleLabelSelection(label.name)}
>
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
<h4 className="text-sm font-medium mb-2">Reviewers</h4>
<div className="space-y-2">
{availableReviewers.map((reviewer, index) => (
<div
key={index}
className="flex items-center justify-between cursor-pointer"
onClick={() => toggleReviewerSelection(reviewer.name)}
>
<div className="flex items-center">
<img src={reviewer.avatar} alt={reviewer.name} className="w-5 h-5 rounded-full mr-2" />
<span className="text-sm">{reviewer.name}</span>
</div>
<span className="text-xs text-gray-400">{reviewer.count}</span>
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
<div
key={index}
className="flex items-center justify-between cursor-pointer"
onClick={() => toggleAssigneeSelection(assignee.name)}
>
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
{/* PR Toolbar */}
<div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div className="flex items-center">
<div className="flex border border-gray-700 rounded-md overflow-hidden">
<button
className={`px-3 py-1 text-sm font-medium flex items-center ${prFilter === 'open' ? 'bg-[#238636] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setPrFilter('open')}
>
<i className="fas fa-code-branch mr-1"></i> Open
</button>
<button
className={`px-3 py-1 text-sm font-medium flex items-center ${prFilter === 'closed' ? 'bg-[#da3633] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setPrFilter('closed')}
>
<i className="fas fa-times-circle mr-1"></i> Closed
</button>
<button
className={`px-3 py-1 text-sm font-medium flex items-center ${prFilter === 'merged' ? 'bg-[#8957e5] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
onClick={() => setPrFilter('merged')}
>
<i className="fas fa-code-merge mr-1"></i> Merged
</button>
</div>
</div>
<div className="w-full sm:w-auto">
<button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium w-full sm:w-auto !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-code-branch mr-1"></i> New Pull Request
</button>
</div>
</div>
{/* Search and Filter Bar */}
<div className="p-4 border-b border-gray-700 flex flex-wrap items-center gap-2">
<div className="relative flex-grow">
<input
type="text"
placeholder="Search all pull requests"
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
onClick={() => setShowReviewerFilter(!showReviewerFilter)}
>
<span>Reviewers</span>
<i className="fas fa-chevron-down ml-2 text-xs"></i>
</button>
{showReviewerFilter && (
<div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
<div className="p-3 border-b border-gray-700">
<input
type="text"
placeholder="Filter users"
className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:border-[#58a6ff]"
/>
</div>
<div className="max-h-60 overflow-y-auto p-2">
{availableReviewers.map((reviewer, index) => (
<div
key={index}
className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
onClick={() => toggleReviewerSelection(reviewer.name)}
>
<input
type="checkbox"
checked={selectedReviewers.includes(reviewer.name)}
onChange={() => {}}
className="mr-2"
/>
<img src={reviewer.avatar} alt={reviewer.name} className="w-5 h-5 rounded-full mr-2" />
<span className="text-sm">{reviewer.name}</span>
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
{/* Pull Requests List */}
{sortedPRs.length > 0 ? (
<div>
{sortedPRs.map((pr) => (
<div
key={pr.id}
className="border-b border-gray-700 hover:bg-[#161b22] transition-colors cursor-pointer p-4"
>
<div className="flex items-start">
<div className="mt-1 mr-3">
{getStatusIcon(pr.status)}
</div>
<div className="flex-grow">
<div className="flex flex-wrap items-start justify-between">
<div>
<h3 className="text-base font-medium text-[#58a6ff] hover:underline mb-1">{pr.title}</h3>
<div className="text-xs text-gray-400 flex items-center flex-wrap gap-2">
<span>{pr.number} opened {pr.createdAt} by {pr.author}</span>
{getReviewStatusBadge(pr.reviewStatus)}
</div>
</div>
<div className="flex items-center mt-1 space-x-2">
{pr.assignees.length > 0 && (
<div className="flex -space-x-1">
{pr.assignees.map((assignee, idx) => (
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
{pr.comments > 0 && (
<div className="flex items-center text-gray-400 text-xs">
<i className="far fa-comment-alt mr-1"></i>
<span>{pr.comments}</span>
</div>
)}
</div>
</div>
<div className="mt-2 flex flex-wrap gap-1">
{pr.labels.map((label, idx) => (
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
<i className="fas fa-code-branch text-5xl"></i>
</div>
<h3 className="text-xl font-medium mb-2">No pull requests found</h3>
<p className="text-gray-400 text-center max-w-md mb-4">
There aren't any pull requests that match your current filter criteria.
</p>
<button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
<i className="fas fa-code-branch mr-1"></i> New Pull Request
</button>
</div>
)}
{/* Pagination */}
{sortedPRs.length > 0 && (
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
