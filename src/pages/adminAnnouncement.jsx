// src/pages/AdminAnnouncements.jsx
import { Search, Calendar, Clock, ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function AdminAnnouncements() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [priority, setPriority] = useState('low');
  const [audience, setAudience] = useState('all');
  const [status, setStatus] = useState('draft');
  const [searchTerm, setSearchTerm] = useState('');

  const announcements = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      date: 'Jan 15, 2025',
      time: '10:30 AM',
      priority: 'high',
      status: 'Scheduled',
      category: 'General',
      audience: 'All Users',
      content: 'We will be performing scheduled maintenance on our servers from 2:00 AM to 4:00 AM EST...',
    },
    {
      id: 2,
      title: 'New Feature: Dark Mode Available',
      date: 'Jan 12, 2025',
      time: '3:15 PM',
      priority: 'medium',
      status: 'Published',
      category: 'Feature',
      audience: 'Premium Users',
      content: 'Dark mode is now available across all platforms!',
    },
  ];

  const filteredAnnouncements = announcements.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Announcements">
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 max-w-6xl mx-auto">
        
        {/* Create New Announcement */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Create New Announcement</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option>Select category</option>
                <option>General</option>
                <option>Maintenance</option>
                <option>New Feature</option>
                <option>Policy Update</option>
                <option>Event</option>
              </select>
              <ChevronDown className="absolute right-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Enter your announcement content here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          {/* Start Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="hh:mm AM/PM"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="low" checked={priority === 'low'} onChange={(e) => setPriority(e.target.value)} className="w-4 h-4 text-blue-600" />
                <span>Low</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="medium" checked={priority === 'medium'} onChange={(e) => setPriority(e.target.value)} className="w-4 h-4 text-orange-600" />
                <span>Medium</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="high" checked={priority === 'high'} onChange={(e) => setPriority(e.target.value)} className="w-4 h-4 text-red-600" />
                <span>High</span>
              </label>
            </div>
          </div>

          {/* Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>All Users</option>
              <option>Staff Only</option>
              <option>Premium Users</option>
              <option>Branch Managers</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Published</option>
            </select>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mb-10">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition">
            Clear
          </button>

          {/* UPDATED PUBLISH BUTTON */}
          <button className="px-10 py-3 rounded-xl font-extrabold text-sm text-white 
          bg-gradient-to-r from-[#FFD873] via-[#FF9B52] to-[#FF6B6B]
          shadow-md hover:shadow-lg hover:brightness-110 transition-all">
            Publish Announcement
          </button>
        </div>

        <hr className="my-10 border-gray-200" />

        {/* Recent Announcements */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Announcements</h3>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 w-80"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredAnnouncements.map((ann) => (
            <div key={ann.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{ann.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span>{ann.date} • {ann.time}</span>

                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ann.priority === 'high' ? 'bg-red-100 text-red-700' :
                      ann.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {ann.priority.toUpperCase()}
                    </span>

                    <span className="text-blue-600 font-medium">{ann.status}</span>
                    <span>{ann.category} • {ann.audience}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Edit</button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Delete</button>
                </div>
              </div>

              <p className="text-gray-600">{ann.content}</p>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}
