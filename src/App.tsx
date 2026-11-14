/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, BarChart3, CalendarDays, FileCheck, MessageSquareWarning, ShieldAlert, Award, FileText, Globe, Clock } from 'lucide-react';
import PolicyExplorer from './components/PolicyExplorer';
import MetricsDashboard from './components/MetricsDashboard';
import ContentCalendar from './components/ContentCalendar';
import ReleaseForm from './components/ReleaseForm';
import ResponseSimulator from './components/ResponseSimulator';
import IncidentForm from './components/IncidentForm';

type ActiveTab = 'policy' | 'dashboard' | 'calendar' | 'consent' | 'scripts' | 'incidents';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('policy');

  const menuItems = [
    { id: 'policy', label: 'Policy Reader', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'dashboard', label: 'M&E Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'calendar', label: 'Content Planner', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'consent', label: 'Consent Builder', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'scripts', label: 'Reply Trainer', icon: <MessageSquareWarning className="w-4 h-4" /> },
    { id: 'incidents', label: 'Incident Center', icon: <ShieldAlert className="w-4 h-4" /> },
  ] as const;

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'policy':
        return <PolicyExplorer />;
      case 'dashboard':
        return <MetricsDashboard />;
      case 'calendar':
        return <ContentCalendar />;
      case 'consent':
        return <ReleaseForm />;
      case 'scripts':
        return <ResponseSimulator />;
      case 'incidents':
        return <IncidentForm />;
      default:
        return <PolicyExplorer />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans flex flex-col justify-between selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Banner Navigation */}
      <header className="bg-[#1E293B] border-b border-slate-700/80 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Kingdom Branding */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl tracking-tight shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                B
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
                  <span className="font-mono text-[9px] font-bold tracking-widest text-indigo-400 uppercase">
                    Buganda Heritage & Tourism Board
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Library Social Media Policy & Hub
                </h1>
              </div>
            </div>

            {/* Time Stamp Status Bar */}
            <div className="hidden md:flex items-center gap-4 text-xs">
              <div className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-1.5 flex items-center gap-2 font-mono text-slate-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>UTC Period: 2026-06-30</span>
              </div>
              <div className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl px-3.5 py-1.5 font-bold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Version 1.2 (Active)</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Hero Welcome Row - Styled as a Premium Bento Grid Hero */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-br from-indigo-950 via-[#1E293B] to-[#0F172A] text-slate-100 border border-slate-700/50 rounded-3xl p-8 sm:p-10 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 hidden sm:block">
            <svg className="w-64 h-64 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
            </svg>
          </div>
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              Empowering Buganda's Documentary Digital Face
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight max-w-3xl leading-tight">
              Transforming Policy into Interactive Engagement
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Welcome to the official digital hub of BHTB Library. This compliance center hosts our social media governance guidelines, real-time performance evaluation, content calendar planner, consent builders, and dialogue trainer templates.
            </p>

            {/* Tab Navigation buttons - Styled as Bento Pills */}
            <div className="flex flex-wrap gap-2 pt-6">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500'
                        : 'bg-slate-800 border border-slate-700/60 text-slate-300 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Professional Footer */}
      <footer className="bg-[#0F172A] border-t border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-sm">BHTB Library</span>
            <span className="text-slate-700">|</span>
            <span>Social Media Governance Portal</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-slate-500 font-mono text-[10px]">
            <span>Data Protection Act 2019 Compliant</span>
            <span>•</span>
            <span>Biennial Review Scheduled: June 2028</span>
            <span>•</span>
            <span>Aligned with IFLA & ALA Best Practices</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
