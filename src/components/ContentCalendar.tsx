/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { initialCalendarItems } from '../data/policyData';
import { ContentCalendarItem } from '../types';
import { CalendarRange, Plus, Filter, Download, ArrowRight, User, Clock, CheckCircle2, ChevronDown, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContentCalendar() {
  const [items, setItems] = useState<ContentCalendarItem[]>(initialCalendarItems);
  const [filterPlatform, setFilterPlatform] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states for new calendar item
  const [date, setDate] = useState('2026-07-07');
  const [platform, setPlatform] = useState<'Facebook' | 'TikTok' | 'Instagram' | 'Twitter/X' | 'YouTube'>('Facebook');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<'Idea' | 'Drafting' | 'Reviewing' | 'Scheduled' | 'Posted'>('Idea');

  const platforms = ['All', 'Facebook', 'TikTok', 'Instagram', 'Twitter/X', 'YouTube'];
  const statuses = ['All', 'Idea', 'Drafting', 'Reviewing', 'Scheduled', 'Posted'];

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesPlatform = filterPlatform === 'All' || item.platform === filterPlatform;
      const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
      return matchesPlatform && matchesStatus;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [items, filterPlatform, filterStatus]);

  const handleCreateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !owner.trim()) return;

    const newItem: ContentCalendarItem = {
      id: `cal-custom-${Date.now()}`,
      date,
      platform,
      description,
      owner,
      status
    };

    setItems(prev => [...prev, newItem]);
    setIsAddOpen(false);

    // Reset Form
    setDescription('');
    setOwner('');
    setDate('2026-07-07');
    setPlatform('Facebook');
    setStatus('Idea');
  };

  const handleUpdateStatus = (id: string, newStatus: 'Idea' | 'Drafting' | 'Reviewing' | 'Scheduled' | 'Posted') => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Date', 'Platform', 'Description', 'Owner', 'Status'];
    const rows = items.map(item => [
      item.id,
      item.date,
      item.platform,
      `"${item.description.replace(/"/g, '""')}"`,
      item.owner,
      item.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `BHTB_Social_Media_Calendar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Idea': return 'bg-slate-800/60 text-slate-400 border-slate-700/60';
      case 'Drafting': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Reviewing': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Scheduled': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Posted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default: return 'bg-slate-800 text-slate-500 border-slate-700';
    }
  };

  const getPlatformIconColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'bg-blue-600/15 text-blue-400 border border-blue-500/20';
      case 'TikTok': return 'bg-[#0F172A] text-slate-200 border border-slate-700';
      case 'Instagram': return 'bg-pink-600/15 text-pink-400 border border-pink-500/20';
      case 'Twitter/X': return 'bg-slate-900 text-slate-300 border border-slate-700';
      case 'YouTube': return 'bg-red-600/15 text-red-400 border border-red-500/20';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="space-y-6" id="content-calendar">
      {/* Header controls card */}
      <div className="bg-[#1E293B] border border-slate-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CalendarRange className="w-5 h-5 text-indigo-400" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white">
              Annex A: Content Calendar Planner
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Maintain high-quality institutional alignment by planning, drafting, reviewing, and approving social media scheduling templates. Use status toggles to trace progress.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setIsAddOpen(true)}
            className="grow sm:grow-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Content Idea
          </button>
          <button
            onClick={handleExportCSV}
            className="grow sm:grow-0 px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters card */}
      <div className="bg-[#1E293B] border border-slate-700/40 rounded-2xl p-4 flex flex-wrap items-center gap-4 shadow-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Filter className="w-4 h-4 text-indigo-400" />
          <span>Filters:</span>
        </div>

        {/* Platform selection */}
        <div className="flex flex-wrap gap-1.5 grow">
          {platforms.map(p => (
            <button
              key={p}
              onClick={() => setFilterPlatform(p)}
              className={`px-3 py-1 text-xs rounded-lg transition-all font-medium cursor-pointer ${
                filterPlatform === p
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'bg-[#0F172A]/40 text-slate-400 hover:bg-slate-800 border border-transparent'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Status Selection */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-xs border border-slate-700 rounded-lg p-1.5 bg-slate-850 text-slate-200 focus:outline-hidden focus:border-indigo-500"
        >
          <option value="All">All Statuses</option>
          <option value="Idea">Idea</option>
          <option value="Drafting">Drafting</option>
          <option value="Reviewing">Reviewing</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Posted">Posted</option>
        </select>
      </div>

      {/* Main Grid Schedule View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 transition-all flex flex-col justify-between space-y-4 shadow-lg text-slate-300"
            >
              <div className="space-y-3">
                {/* Platform Badge & Date */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${getPlatformIconColor(item.platform)}`}>
                    {item.platform}
                  </span>
                  <span className="font-mono text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {item.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-normal min-h-[48px]">
                  {item.description}
                </p>
              </div>

              {/* Status Select, Owner, Delete */}
              <div className="border-t border-slate-800 pt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[80px]">
                    {item.owner}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Status update menu dropdown */}
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value as any)}
                    className={`text-[10px] font-bold border rounded-lg px-2 py-1 focus:outline-hidden transition-all bg-[#0F172A] border-slate-700 text-slate-200 cursor-pointer ${getStatusColor(item.status)}`}
                  >
                    <option value="Idea">Idea</option>
                    <option value="Drafting">Drafting</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Posted">Posted</option>
                  </select>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-800 cursor-pointer"
                    title="Delete Idea"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 py-16 bg-[#1E293B] border border-slate-700/50 rounded-3xl text-center space-y-3 shadow-lg">
            <Plus className="w-10 h-10 mx-auto text-slate-650" />
            <h3 className="font-semibold text-slate-200 text-sm">No Scheduled Items Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Change the filters or add a new post idea using the "Add Content Idea" button above.
            </p>
          </div>
        )}
      </div>

      {/* Add Content Idea Popup Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700 shadow-2xl space-y-4 text-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-semibold text-white text-lg">Add Content Idea</h3>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-white font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-4">
              {/* Date Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Publication Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Platform and status side-by-side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Platform</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="Facebook">Facebook</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram (Future)</option>
                    <option value="Twitter/X">Twitter/X (Future)</option>
                    <option value="YouTube">YouTube (Future)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Initial Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500"
                  >
                    <option value="Idea">Idea</option>
                    <option value="Drafting">Drafting</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Posted">Posted</option>
                  </select>
                </div>
              </div>

              {/* Owner Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Assigned Owner</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah (Outreach)"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500"
                />
              </div>

              {/* Content description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Post Description & Media Plan</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Short TikTok video touring the royal genealogy scrolls, highlighting the preservation seal details."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs border border-slate-700 rounded-xl p-2.5 bg-[#0F172A] text-slate-200 focus:outline-hidden focus:border-indigo-500 placeholder-slate-500 resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="grow py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="grow py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                  Create Schedule
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
