// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';

const App: React.FC = () => {
  // Workflow states
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [branchFilter, setShowBranchFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBranchDropdown, setShowBranchDropdown] = useState<boolean>(false);
  const [showEventDropdown, setShowEventDropdown] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');

  // Mock data for workflows
  const workflows = [
    {
      id: 1,
      name: "CI Build and Test",
      status: "success",
      branch: "main",
      commit: "Update API response handling in user service",
      event: "push",
      duration: "2m 34s",
      timestamp: "Completed 23 minutes ago",
      author: "Alex Johnson",
      workflowFile: "ci.yml"
    },
    {
      id: 2,
      name: "Deploy to Production",
      status: "failed",
      branch: "release/v2.3",
      commit: "Merge pull request #144 from feature/payment-gateway",
      event: "workflow_dispatch",
      duration: "4m 12s",
      timestamp: "Failed 1 hour ago",
      author: "Sarah Chen",
      workflowFile: "deploy-prod.yml"
    },
    {
      id: 3,
      name: "Code Quality Check",
      status: "success",
      branch: "feature/auth-improvements",
      commit: "Implement JWT refresh token mechanism",
      event: "pull_request",
      duration: "1m 47s",
      timestamp: "Completed 3 hours ago",
      author: "David Kim",
      workflowFile: "code-quality.yml"
    },
    {
      id: 4,
      name: "Integration Tests",
      status: "in_progress",
      branch: "feature/dashboard-analytics",
      commit: "Add user activity timeline component",
      event: "push",
      duration: "Running for 1m 15s",
      timestamp: "Started 1 minute ago",
      author: "Emma Wilson",
      workflowFile: "integration-tests.yml"
    },
    {
      id: 5,
      name: "Build Documentation",
      status: "success",
      branch: "main",
      commit: "Update API documentation for new endpoints",
      event: "push",
      duration: "1m 03s",
      timestamp: "Completed 5 hours ago",
      author: "Michael Rodriguez",
      workflowFile: "build-docs.yml"
    },
    {
      id: 6,
      name: "Security Scan",
      status: "cancelled",
      branch: "feature/user-profiles",
      commit: "Add profile image upload functionality",
      event: "pull_request",
      duration: "Cancelled after 2m 18s",
      timestamp: "Cancelled 2 days ago",
      author: "Sarah Chen",
      workflowFile: "security-scan.yml"
    }
  ];

  // Available branches for filtering
  const branches = [
    { name: "main", count: 2 },
    { name: "release/v2.3", count: 1 },
    { name: "feature/auth-improvements", count: 1 },
    { name: "feature/dashboard-analytics", count: 1 },
    { name: "feature/user-profiles", count: 1 }
  ];

  // Available event types for filtering
  const eventTypes = [
    { name: "push", count: 3 },
    { name: "pull_request", count: 2 },
    { name: "workflow_dispatch", count: 1 }
  ];

  // Filter workflows based on selected filters
  const filteredWorkflows = workflows.filter(workflow => {
    // Filter by status
    if (statusFilter !== 'all') {
      if (statusFilter === 'success' && workflow.status !== 'success') return false;
      if (statusFilter === 'failed' && workflow.status !== 'failed') return false;
      if (statusFilter === 'in_progress' && workflow.status !== 'in_progress') return false;
    }
    
    // Filter by branch
    if (branchFilter !== 'all' && workflow.branch !== branchFilter) return false;
    
    // Filter by event type
    if (selectedEvent !== 'all' && workflow.event !== selectedEvent) return false;
    
    // Filter by search query
    if (searchQuery && !workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !workflow.commit.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    return true;
  });

  // Helper function to get status icon and color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'success':
        return { icon: 'fas fa-check-circle', color: 'text-[#2ea043]', bgColor: 'bg-[#2ea043]', label: 'Success' };
      case 'failed':
        return { icon: 'fas fa-times-circle', color: 'text-[#f85149]', bgColor: 'bg-[#f85149]', label: 'Failed' };
      case 'in_progress':
        return { icon: 'fas fa-circle-notch fa-spin', color: 'text-[#f0883e]', bgColor: 'bg-[#f0883e]', label: 'In progress' };
      case 'cancelled':
        return { icon: 'fas fa-stop-circle', color: 'text-[#8b949e]', bgColor: 'bg-[#8b949e]', label: 'Cancelled' };
      default:
        return { icon: 'fas fa-question-circle', color: 'text-gray-500', bgColor: 'bg-gray-500', label: 'Unknown' };
    }
  };

  // Helper function to get event icon
  const getEventIcon = (event: string) => {
    switch (event) {
      case 'push':
        return 'fas fa-code-branch';
      case 'pull_request':
        return 'fas fa-code-merge';
      case 'workflow_dispatch':
        return 'fas fa-play';
      default:
        return 'fas fa-cog';
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
                src="https://readdy.ai/api/search-image?query=professional%25252520headshot%25252520of%25252520a%25252520young%25252520man%25252520with%25252520short%25252520dark%25252520hair%25252520wearing%25252520a%25252520blue%25252520shirt%25252520against%25252520a%25252520neutral%25252520gray%25252520background%2525252C%25252520high%25252520quality%25252520portrait%25252520photo%2525252C%252525208k%2525252C%25252520ultra%25252520detailed%2525252C%25252520professional%25252520lighting&width=32&height=32&seq=6&orientation=squarish"
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
            <span className="hover:text-white">Code</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <span className="hover:text-white">Issues</span>
          </div>
          <div className="flex items-center px-3 py-1 hover:text-white cursor-pointer">
            <i className="fas fa-code-branch mr-2"></i>
            <a href="https://readdy.ai/home/84caaf0c-a0e2-47df-bf61-758434ccc1a1/6bfe272f-640c-4be7-9597-5b4f4c14d485" data-readdy="true" className="hover:text-white">Pull Requests</a>
          </div>
          <div className="flex items-center px-3 py-1 border-b-2 border-[#f78166] text-white cursor-pointer">
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
                  <h4 className="text-sm font-medium mb-2">Workflow status</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="workflowStatus"
                        checked={statusFilter === 'all'}
                        onChange={() => setStatusFilter('all')}
                        className="mr-2"
                      />
                      <span className="text-sm">All workflows</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="workflowStatus"
                        checked={statusFilter === 'success'}
                        onChange={() => setStatusFilter('success')}
                        className="mr-2"
                      />
                      <span className="text-sm">Successful workflows</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="workflowStatus"
                        checked={statusFilter === 'failed'}
                        onChange={() => setStatusFilter('failed')}
                        className="mr-2"
                      />
                      <span className="text-sm">Failed workflows</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="workflowStatus"
                        checked={statusFilter === 'in_progress'}
                        onChange={() => setStatusFilter('in_progress')}
                        className="mr-2"
                      />
                      <span className="text-sm">In progress workflows</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Branch</h4>
                  <div className="space-y-2">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setShowBranchFilter('all')}
                    >
                      <div className="flex items-center">
                        <i className={`fas fa-check mr-2 ${branchFilter === 'all' ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                        <span className="text-sm">All branches</span>
                      </div>
                    </div>
                    {branches.map((branch, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowBranchFilter(branch.name)}
                      >
                        <div className="flex items-center">
                          <i className={`fas fa-check mr-2 ${branchFilter === branch.name ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                          <span className="text-sm">{branch.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{branch.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Event</h4>
                  <div className="space-y-2">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setSelectedEvent('all')}
                    >
                      <div className="flex items-center">
                        <i className={`fas fa-check mr-2 ${selectedEvent === 'all' ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                        <span className="text-sm">All events</span>
                      </div>
                    </div>
                    {eventTypes.map((event, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setSelectedEvent(event.name)}
                      >
                        <div className="flex items-center">
                          <i className={`fas fa-check mr-2 ${selectedEvent === event.name ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                          <i className={`${getEventIcon(event.name)} mr-2 text-gray-400`}></i>
                          <span className="text-sm">{event.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{event.count}</span>
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
              {/* Workflow Toolbar */}
              <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <div className="flex border border-gray-700 rounded-md overflow-hidden">
                    <button
                      className={`px-3 py-1 text-sm font-medium flex items-center ${statusFilter === 'all' ? 'bg-[#30363d] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
                      onClick={() => setStatusFilter('all')}
                    >
                      <i className="fas fa-list-ul mr-1"></i> All
                    </button>
                    <button
                      className={`px-3 py-1 text-sm font-medium flex items-center ${statusFilter === 'success' ? 'bg-[#2ea043] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
                      onClick={() => setStatusFilter('success')}
                    >
                      <i className="fas fa-check-circle mr-1"></i> Success
                    </button>
                    <button
                      className={`px-3 py-1 text-sm font-medium flex items-center ${statusFilter === 'failed' ? 'bg-[#f85149] text-white' : 'bg-[#0d1117] hover:bg-[#30363d]'} !rounded-button whitespace-nowrap cursor-pointer`}
                      onClick={() => setStatusFilter('failed')}
                    >
                      <i className="fas fa-times-circle mr-1"></i> Failed
                    </button>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium w-full sm:w-auto !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-plus mr-1"></i> New workflow
                  </button>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="p-4 border-b border-gray-700 flex flex-wrap items-center gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Filter workflow runs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-2 px-3 pl-8 text-sm focus:outline-none focus:border-[#58a6ff]"
                  />
                  <i className="fas fa-search absolute left-3 top-2.5 text-gray-500 text-sm"></i>
                </div>
                <div className="relative">
                  <button
                    className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-2 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                  >
                    <i className="fas fa-code-branch mr-2"></i>
                    <span>{branchFilter === 'all' ? 'Branch: All' : `Branch: ${branchFilter}`}</span>
                    <i className="fas fa-chevron-down ml-2 text-xs"></i>
                  </button>
                  {showBranchDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
                      <div className="p-3 border-b border-gray-700">
                        <input
                          type="text"
                          placeholder="Filter branches"
                          className="w-full bg-[#0d1117] border border-gray-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:border-[#58a6ff]"
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-2">
                        <div
                          className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
                          onClick={() => {
                            setShowBranchFilter('all');
                            setShowBranchDropdown(false);
                          }}
                        >
                          <i className={`fas fa-check mr-2 ${branchFilter === 'all' ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                          <span className="text-sm">All branches</span>
                        </div>
                        {branches.map((branch, index) => (
                          <div
                            key={index}
                            className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
                            onClick={() => {
                              setShowBranchFilter(branch.name);
                              setShowBranchDropdown(false);
                            }}
                          >
                            <i className={`fas fa-check mr-2 ${branchFilter === branch.name ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                            <span className="text-sm">{branch.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    className="bg-[#0d1117] border border-gray-700 hover:border-gray-600 rounded-md px-3 py-2 text-sm flex items-center !rounded-button whitespace-nowrap cursor-pointer"
                    onClick={() => setShowEventDropdown(!showEventDropdown)}
                  >
                    <i className="fas fa-bolt mr-2"></i>
                    <span>{selectedEvent === 'all' ? 'Event: All' : `Event: ${selectedEvent}`}</span>
                    <i className="fas fa-chevron-down ml-2 text-xs"></i>
                  </button>
                  {showEventDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#161b22] border border-gray-700 rounded-md shadow-lg z-10">
                      <div className="max-h-60 overflow-y-auto p-2">
                        <div
                          className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
                          onClick={() => {
                            setSelectedEvent('all');
                            setShowEventDropdown(false);
                          }}
                        >
                          <i className={`fas fa-check mr-2 ${selectedEvent === 'all' ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                          <span className="text-sm">All events</span>
                        </div>
                        {eventTypes.map((event, index) => (
                          <div
                            key={index}
                            className="flex items-center px-2 py-1.5 hover:bg-[#30363d] rounded cursor-pointer"
                            onClick={() => {
                              setSelectedEvent(event.name);
                              setShowEventDropdown(false);
                            }}
                          >
                            <i className={`fas fa-check mr-2 ${selectedEvent === event.name ? 'text-[#58a6ff]' : 'text-transparent'}`}></i>
                            <i className={`${getEventIcon(event.name)} mr-2 text-gray-400`}></i>
                            <span className="text-sm">{event.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Workflows List */}
              {filteredWorkflows.length > 0 ? (
                <div>
                  {filteredWorkflows.map((workflow) => {
                    const statusInfo = getStatusInfo(workflow.status);
                    return (
                      <div
                        key={workflow.id}
                        className="border-b border-gray-700 hover:bg-[#161b22] transition-colors cursor-pointer p-4"
                      >
                        <div className="flex items-start">
                          <div className="mt-1 mr-3">
                            <i className={`${statusInfo.icon} ${statusInfo.color} text-lg`}></i>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-wrap items-start justify-between">
                              <div>
                                <h3 className="text-base font-medium text-[#58a6ff] hover:underline mb-1">{workflow.name}</h3>
                                <div className="text-xs text-gray-400 flex items-center flex-wrap gap-2">
                                  <div className="flex items-center">
                                    <i className={`${getEventIcon(workflow.event)} mr-1`}></i>
                                    <span className="capitalize">{workflow.event}</span>
                                  </div>
                                  <span>on {workflow.branch}</span>
                                  <span>·</span>
                                  <span>{workflow.timestamp}</span>
                                  <span>·</span>
                                  <span>{workflow.duration}</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  <span className="line-clamp-1">{workflow.commit}</span>
                                </div>
                              </div>
                              <div className="flex items-center mt-1 space-x-2">
                                <span className={`px-2 py-0.5 text-xs ${statusInfo.bgColor} bg-opacity-20 ${statusInfo.color} rounded-full`}>
                                  {statusInfo.label}
                                </span>
                                <div className="flex items-center">
                                  <button className="text-xs text-gray-400 hover:text-[#58a6ff] !rounded-button whitespace-nowrap cursor-pointer">
                                    <i className="fas fa-redo-alt"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-xs text-gray-400">
                              <span className="mr-3">
                                <i className="fas fa-file-code mr-1"></i>
                                {workflow.workflowFile}
                              </span>
                              <span>
                                <i className="fas fa-user mr-1"></i>
                                {workflow.author}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center">
                  <div className="mb-4 text-gray-400">
                    <i className="fas fa-play-circle text-5xl"></i>
                  </div>
                  <h3 className="text-xl font-medium mb-2">No workflow runs found</h3>
                  <p className="text-gray-400 text-center max-w-md mb-4">
                    There aren't any workflow runs that match your current filter criteria.
                  </p>
                  <button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-4 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-plus mr-1"></i> New workflow
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredWorkflows.length > 0 && (
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

            {/* Workflows Configuration */}
            <div className="mt-6 bg-[#161b22] rounded-md border border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-white">Configured workflows</h3>
                <button className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-md px-3 py-1 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fas fa-plus mr-1"></i> New workflow
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* CI Build and Test */}
                  <div className="border border-gray-700 rounded-md p-4 hover:border-gray-600 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <i className="fas fa-cog text-gray-400 mr-2"></i>
                        <h4 className="font-medium">CI Build and Test</h4>
                      </div>
                      <span className="px-2 py-0.5 text-xs bg-[#2ea043] bg-opacity-20 text-[#2ea043] rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Builds and tests the application on every push to any branch and pull request.
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-3">
                        <i className="fas fa-file-code mr-1"></i>
                        ci.yml
                      </span>
                      <span>
                        <i className="fas fa-code-branch mr-1"></i>
                        All branches
                      </span>
                    </div>
                  </div>

                  {/* Deploy to Production */}
                  <div className="border border-gray-700 rounded-md p-4 hover:border-gray-600 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <i className="fas fa-rocket text-gray-400 mr-2"></i>
                        <h4 className="font-medium">Deploy to Production</h4>
                      </div>
                      <span className="px-2 py-0.5 text-xs bg-[#2ea043] bg-opacity-20 text-[#2ea043] rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Deploys the application to production when manually triggered or on release branches.
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-3">
                        <i className="fas fa-file-code mr-1"></i>
                        deploy-prod.yml
                      </span>
                      <span>
                        <i className="fas fa-code-branch mr-1"></i>
                        release/*
                      </span>
                    </div>
                  </div>

                  {/* Code Quality Check */}
                  <div className="border border-gray-700 rounded-md p-4 hover:border-gray-600 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <i className="fas fa-check-square text-gray-400 mr-2"></i>
                        <h4 className="font-medium">Code Quality Check</h4>
                      </div>
                      <span className="px-2 py-0.5 text-xs bg-[#2ea043] bg-opacity-20 text-[#2ea043] rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Runs linting, static analysis and code style checks on pull requests.
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-3">
                        <i className="fas fa-file-code mr-1"></i>
                        code-quality.yml
                      </span>
                      <span>
                        <i className="fas fa-code-merge mr-1"></i>
                        Pull requests
                      </span>
                    </div>
                  </div>

                  {/* Security Scan */}
                  <div className="border border-gray-700 rounded-md p-4 hover:border-gray-600 cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <i className="fas fa-shield-alt text-gray-400 mr-2"></i>
                        <h4 className="font-medium">Security Scan</h4>
                      </div>
                      <span className="px-2 py-0.5 text-xs bg-[#2ea043] bg-opacity-20 text-[#2ea043] rounded-full">Active</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      Scans dependencies for vulnerabilities and performs security analysis.
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <span className="mr-3">
                        <i className="fas fa-file-code mr-1"></i>
                        security-scan.yml
                      </span>
                      <span>
                        <i className="fas fa-clock mr-1"></i>
                        Weekly
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-[#58a6ff] hover:underline text-sm !rounded-button whitespace-nowrap cursor-pointer">
                    View all workflows <i className="fas fa-chevron-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

