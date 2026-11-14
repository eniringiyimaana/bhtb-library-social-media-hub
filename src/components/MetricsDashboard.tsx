/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { initialKpis, initialBudget } from '../data/policyData';
import { BudgetCategory } from '../types';
import { Award, ArrowUpRight, ArrowDownRight, RefreshCw, Calculator, ShieldCheck, DollarSign, Coins } from 'lucide-react';

export default function MetricsDashboard() {
  const [kpis, setKpis] = useState(initialKpis);
  const [budgetItems, setBudgetItems] = useState<BudgetCategory[]>(initialBudget);

  // Maintain slider state for each budget category
  const [sliderCosts, setSliderCosts] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    initialBudget.forEach(item => {
      // Start with average of min and max cost
      initial[item.id] = Math.round((item.minCost + item.maxCost) / 2);
    });
    return initial;
  });

  // Calculate sum of active budget simulator
  const totalSimulatedCost = useMemo(() => {
    return Object.values(sliderCosts).reduce((acc: number, curr: number) => acc + curr, 0);
  }, [sliderCosts]);

  const handleSliderChange = (id: string, val: number) => {
    setSliderCosts(prev => ({
      ...prev,
      [id]: val
    }));
  };

  const handleResetBudget = () => {
    const initial: { [key: string]: number } = {};
    initialBudget.forEach(item => {
      initial[item.id] = Math.round((item.minCost + item.maxCost) / 2);
    });
    setSliderCosts(initial);
  };

  // Format budget data for Pie Chart
  const pieChartData = useMemo(() => {
    return budgetItems.map(item => ({
      name: item.category,
      value: sliderCosts[item.id]
    }));
  }, [budgetItems, sliderCosts]);

  // Modern soft professional color palette
  const COLORS = [
    '#6366f1', // Indigo
    '#3b82f6', // Blue
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#ef4444', // Red
    '#64748b'  // Slate
  ];

  // Map Recharts data for the KPI visual
  const kpiChartData = useMemo(() => {
    // Only chart numerical metrics for clarity: Followers, Engagement Rate (scaled), TikTok Views, Posts, Response time
    return [
      { name: 'FB Followers (Target/10)', Target: 5, Actual: 6.2 },
      { name: 'FB Engagement %', Target: 5.0, Actual: 4.8 },
      { name: 'TikTok Views (k)', Target: 10, Actual: 12.5 },
      { name: 'Posts Published', Target: 20, Actual: 23 },
      { name: 'Response Time (hrs)', Target: 24, Actual: 16 }
    ];
  }, []);

  return (
    <div className="space-y-8" id="metrics-dashboard">
      {/* Overview Intro card */}
      <div className="bg-[#1E293B] rounded-3xl p-6 sm:p-8 border border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
              Monitoring & Evaluation Core
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Performance KPIs & Budget Hub
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            Track key platform outcomes, response timeliness, and test different budget allocations safely inside BHTB's designated financial limits.
          </p>
        </div>
        <div className="bg-[#0F172A] rounded-2xl border border-slate-700 p-4 shrink-0 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-lg">
            94%
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Policy Adherence</div>
            <div className="text-sm font-bold text-emerald-400">Highly Compliant</div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => {
          const isNumeric = typeof kpi.target === 'number' && typeof kpi.actual === 'number';
          const isHigherBetter = kpi.metricName !== 'Avg. Response Time (Hours)';
          let isSuccess = false;
          if (isNumeric) {
            const target = kpi.target as number;
            const actual = kpi.actual as number;
            isSuccess = isHigherBetter ? actual >= target : actual <= target;
          } else {
            isSuccess = true; // Non numerical (comments addressed)
          }

          return (
            <div 
              key={kpi.id} 
              className="bg-[#1E293B] border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 transition-all flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0F172A] text-indigo-400 border border-indigo-500/10">
                    {kpi.platform}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    isSuccess 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {isSuccess ? 'MET TARGET' : 'UNDER TARGET'}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-300 line-clamp-1">{kpi.metricName}</h4>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-display font-bold text-2xl text-white">
                      {kpi.actual}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Target: {kpi.target}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 mt-4 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-normal line-clamp-1">{kpi.notes}</span>
                <span className={`font-semibold shrink-0 flex items-center gap-0.5 ${
                  kpi.trendPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {kpi.trendPercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {kpi.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* KPI Recharts Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 sm:p-8 shadow-2xl">
          <h3 className="font-display font-semibold text-white text-lg mb-2">Metrics Analysis (Current Month)</h3>
          <p className="text-xs text-slate-400 mb-6">Comparative visualization of BHTB targets vs. actual platform performance.</p>
          <div className="h-80 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kpiChartData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#f8fafc' }} />
                <Legend />
                <Bar dataKey="Target" fill="#475569" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="Actual" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Budget Allocator Tool & Simulated Costs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cost sliders */}
        <div className="lg:col-span-7 bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              <h3 className="font-display font-semibold text-white text-lg">Budget Tweak Simulator</h3>
            </div>
            <button 
              onClick={handleResetBudget}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            As a Social Media Manager, adjust BHTB's annual currency allocations below (ranges specified in policy guidelines) to simulate different financial scenarios:
          </p>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 divide-y divide-slate-800">
            {budgetItems.map(item => (
              <div key={item.id} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{item.category}</span>
                  <span className="font-mono text-slate-500">
                    Range: {item.minCost.toLocaleString()} – {item.maxCost.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={item.minCost}
                    max={item.maxCost}
                    value={sliderCosts[item.id]}
                    onChange={(e) => handleSliderChange(item.id, parseInt(e.target.value, 10))}
                    className="grow h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="font-mono text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-md shrink-0 w-20 text-right">
                    ${sliderCosts[item.id].toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Budget visual break-down */}
        <div className="lg:col-span-5 bg-[#1E293B] rounded-3xl border border-slate-700/50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-white text-lg">Annual Allocation Plan</h3>
            <p className="text-xs text-slate-400">Visual layout of BHTB's current simulated operational expenditures:</p>
            
            {/* Donut chart of budget items */}
            <div className="h-56 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#f8fafc' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total cost</span>
                <span className="font-display font-bold text-lg text-white">${totalSimulatedCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Total Budget Compliance Card */}
            <div className={`p-4 rounded-2xl border ${
              totalSimulatedCost <= 158000 && totalSimulatedCost >= 74000
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-200'
            }`}>
              <div className="flex items-start gap-3">
                <ShieldCheck className={`w-5 h-5 shrink-0 ${
                  totalSimulatedCost <= 158000 && totalSimulatedCost >= 74000 ? 'text-emerald-400' : 'text-rose-400'
                }`} />
                <div>
                  <h4 className="font-semibold text-xs text-white">
                    {totalSimulatedCost <= 158000 && totalSimulatedCost >= 74000
                      ? 'Within Safe Policy Limits' 
                      : 'Outside Suggested Range'}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Official range is ~$74,000 to $158,000. Under-allocating causes service delays; over-allocating raises audit triggers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Legend tags */}
          <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-slate-800 max-h-[140px] overflow-y-auto">
            {pieChartData.map((data, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[10px]">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="truncate text-slate-300 font-medium">{data.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
