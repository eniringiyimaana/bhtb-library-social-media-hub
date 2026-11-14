/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, BookOpen, Shield, HelpCircle, FileText, ChevronRight, Hash, Bookmark, Share2, ClipboardCheck, Scale } from 'lucide-react';
import { policySections, platformPlan, PolicySection } from '../data/policyData';

export default function PolicyExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSectionId, setActiveSectionId] = useState<string>('executive-summary');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Overview', 'Governance', 'Operations', 'Legal & Security'];

  // Filter sections by category and search
  const filteredSections = useMemo(() => {
    return policySections.filter(section => {
      const matchesCategory = selectedCategory === 'All' || section.category === selectedCategory;
      const matchesSearch = section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.subsections?.some(sub => 
          sub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          sub.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Find currently active section
  const activeSection = useMemo(() => {
    return policySections.find(s => s.id === activeSectionId) || policySections[0];
  }, [activeSectionId]);

  const handleCopyLink = (sectionId: string) => {
    const url = `${window.location.origin}#${sectionId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(sectionId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Overview': return <BookOpen className="w-4 h-4" />;
      case 'Governance': return <Shield className="w-4 h-4" />;
      case 'Operations': return <HelpCircle className="w-4 h-4" />;
      case 'Legal & Security': return <Scale className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="policy-explorer">
      {/* Left Column: Filter & Sidebar List */}
      <div className="lg:col-span-4 space-y-6">
        {/* Search & Filter Card */}
        <div className="bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 shadow-lg">
          <h3 className="font-display font-semibold text-white text-lg mb-4">Explore Document</h3>
          
          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search sections or keywords..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-200 placeholder-slate-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Quick Tags */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-850 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section List */}
        <div className="bg-[#1E293B] rounded-3xl border border-slate-700/50 shadow-lg max-h-[500px] overflow-y-auto divide-y divide-slate-800">
          {filteredSections.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              No policy sections match your filters.
            </div>
          ) : (
            filteredSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`w-full text-left p-4 transition-all flex items-start gap-3 hover:bg-slate-800/40 cursor-pointer ${
                  activeSectionId === section.id
                    ? 'bg-slate-800/80 border-r-4 border-indigo-500'
                    : ''
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  activeSectionId === section.id ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  {getCategoryIcon(section.category)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-indigo-500/10">
                      {section.category}
                    </span>
                  </div>
                  <h4 className={`font-semibold text-sm truncate ${
                    activeSectionId === section.id ? 'text-white' : 'text-slate-300'
                  }`}>
                    {section.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{section.content}</p>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Platform Guidance Fast Reference Card */}
        <div className="bg-gradient-to-br from-indigo-950 to-[#1E293B] text-slate-100 rounded-3xl p-6 shadow-xl border border-indigo-900/40 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 translate-x-4 translate-y-4">
            <Scale className="w-40 h-40" />
          </div>
          <h4 className="font-display font-semibold text-lg text-indigo-300 mb-2">Legal Compliance Quick Check</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            All posts published on behalf of BHTB must adhere strictly to Uganda's 
            <strong> Data Protection Act 2019</strong>, 
            <strong> Copyright Act</strong>, and 
            <strong> Computer Misuse Act 2011</strong>.
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Images: Signed Release Consent form required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Tone: Institutional first person "We" only</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Approval: Formal Supervisor sign-off required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Section Reader */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-[#1E293B] rounded-3xl border border-slate-700/50 p-8 shadow-2xl space-y-6"
          >
            {/* Header */}
            <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                    {getCategoryIcon(activeSection.category)}
                    {activeSection.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">ID: {activeSection.id}</span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  {activeSection.title}
                </h2>
              </div>

              {/* Utility buttons */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => handleCopyLink(activeSection.id)}
                  className="p-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-2 cursor-pointer"
                  title="Copy share link to clipboard"
                >
                  <Share2 className="w-4 h-4 text-indigo-400" />
                  <span>{copiedId === activeSection.id ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Core Summary Paragraph */}
            <div className="prose max-w-none">
              <p className="text-base text-slate-300 leading-relaxed font-normal">
                {activeSection.content}
              </p>
            </div>

            {/* Subsections Cards */}
            {activeSection.subsections && activeSection.subsections.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-display font-semibold text-white text-lg flex items-center gap-2 border-b border-slate-850 pb-2">
                  <Bookmark className="w-5 h-5 text-indigo-400" />
                  Key Clauses & Guidelines
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {activeSection.subsections.map((sub, i) => (
                    <div 
                      key={i} 
                      className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/30 hover:border-slate-700 hover:bg-slate-800/70 transition-all space-y-2"
                    >
                      <h4 className="font-display font-semibold text-white text-base flex items-center gap-2">
                        <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                          {i + 1}
                        </span>
                        {sub.title}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Citations and References */}
            {activeSection.citations && activeSection.citations.length > 0 && (
              <div className="bg-[#0F172A]/60 rounded-2xl p-5 mt-6 border border-slate-800">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" />
                  International Standards & Alignment
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeSection.citations.map((cite, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 bg-[#1E293B] border border-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5"
                    >
                      <Hash className="w-3.5 h-3.5 text-indigo-400/70" />
                      {cite}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Render Platform Specific Table if viewing Multi-Platform Strategy */}
        {activeSection.id === 'mission-aims' && (
          <div className="mt-8 bg-[#1E293B] rounded-3xl border border-slate-700/50 p-8 shadow-2xl space-y-4">
            <h3 className="font-display font-semibold text-white text-xl">Official Platform Strategy & Metrics</h3>
            <p className="text-xs text-slate-400">The core objectives and Key Performance Indicators defined for channels:</p>
            <div className="overflow-x-auto border border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs divide-y divide-slate-800">
                <thead className="bg-[#0F172A]/60 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Content Focus</th>
                    <th className="p-4">Objective</th>
                    <th className="p-4">Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {platformPlan.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/20">
                      <td className="p-4 font-bold text-indigo-400">{p.platform}</td>
                      <td className="p-4 leading-relaxed max-w-xs">{p.contentTypes}</td>
                      <td className="p-4 leading-relaxed max-w-sm">{p.objectives}</td>
                      <td className="p-4 font-medium text-white">{p.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
