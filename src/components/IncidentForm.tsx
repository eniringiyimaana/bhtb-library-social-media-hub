/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { initialIncidents } from '../data/policyData';
import { IncidentReport } from '../types';
import { AlertOctagon, Plus, CheckCircle, Clock, ShieldAlert, Printer, ChevronRight, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function IncidentForm() {
  const [incidents, setIncidents] = useState<IncidentReport[]>(initialIncidents);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('inc-1');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states for new incident
  const [dateTime, setDateTime] = useState('2026-06-30T10:00');
  const [reportedBy, setReportedBy] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState<'Security Breach' | 'Defamatory Content' | 'Harassment' | 'Misinformation' | 'Other'>('Misinformation');
  const [description, setDescription] = useState('');
  const [platformsAffected, setPlatformsAffected] = useState('');
  const [actionsTaken, setActionsTaken] = useState('');
  const [personsInvolved, setPersonsInvolved] = useState('');
  
  // Escalated check states
  const [escalatedTech, setEscalatedTech] = useState(false);
  const [escalatedComm, setEscalatedComm] = useState(false);
  const [escalatedDir, setEscalatedDir] = useState(false);
  const [escalatedLegal, setEscalatedLegal] = useState(false);

  const [followUpActions, setFollowUpActions] = useState('');
  const [resolution, setResolution] = useState('');
  const [preparedBy, setPreparedBy] = useState('');
  const [signature, setSignature] = useState('');

  const selectedIncident = useMemo(() => {
    return incidents.find(inc => inc.id === selectedIncidentId) || incidents[0];
  }, [incidents, selectedIncidentId]);

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportedBy.trim() || !description.trim() || !preparedBy.trim()) return;

    const escalatedArray: any[] = [];
    if (escalatedTech) escalatedArray.push('Tech Lead');
    if (escalatedComm) escalatedArray.push('Communications Supervisor');
    if (escalatedDir) escalatedArray.push('Director');
    if (escalatedLegal) escalatedArray.push('Legal');

    const newInc: IncidentReport = {
      id: `inc-custom-${Date.now()}`,
      dateTime,
      reportedBy,
      role,
      type,
      description,
      platformsAffected,
      actionsTaken,
      personsInvolved,
      escalatedTo: escalatedArray,
      followUpActions,
      resolution: resolution || 'Pending Investigation',
      preparedBy,
      signature,
      datePrepared: new Date().toISOString().split('T')[0],
      status: resolution ? 'Resolved' : 'Open'
    };

    setIncidents(prev => [newInc, ...prev]);
    setSelectedIncidentId(newInc.id);
    setIsAddOpen(false);

    // Reset Form
    setReportedBy('');
    setRole('');
    setType('Misinformation');
    setDescription('');
    setPlatformsAffected('');
    setActionsTaken('');
    setPersonsInvolved('');
    setEscalatedTech(false);
    setEscalatedComm(false);
    setEscalatedDir(false);
    setEscalatedLegal(false);
    setFollowUpActions('');
    setResolution('');
    setPreparedBy('');
    setSignature('');
  };

  const handleToggleStatus = (id: string) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === id) {
        const nextStatus = inc.status === 'Resolved' ? 'Open' : 'Resolved';
        return {
          ...inc,
          status: nextStatus,
          resolution: nextStatus === 'Resolved' ? 'Issue audited and closed by security supervisor.' : 'Investigation reopened.'
        };
      }
      return inc;
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const getIncidentBadgeColor = (type: string) => {
    switch (type) {
      case 'Security Breach': return 'bg-red-100 text-red-800 border-red-200';
      case 'Harassment': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Defamatory Content': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Misinformation': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="incident-form">
      {/* Left panel: Incidents List & Logging Form */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-700" />
              <h3 className="font-display font-semibold text-gray-900 text-lg">Annex D: Incident Logs</h3>
            </div>
            
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Log Incident
            </button>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Report security anomalies, malware injections, hate speech raids, or serious branding defamation cases instantly for supervisor review.
          </p>

          {/* Incidents stream list */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {incidents.map(inc => (
              <button
                key={inc.id}
                onClick={() => setSelectedIncidentId(inc.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  selectedIncidentId === inc.id 
                    ? 'border-amber-600 bg-amber-50/20' 
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                }`}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border uppercase tracking-wider ${getIncidentBadgeColor(inc.type)}`}>
                      {inc.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {inc.dateTime.replace('T', ' ')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs text-gray-800 truncate">
                    {inc.description}
                  </h4>
                  <p className="text-[10px] text-gray-400">Reported by: {inc.reportedBy}</p>
                </div>

                <div className="shrink-0 flex flex-col items-end justify-between h-full">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    inc.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
                  }`}>
                    {inc.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400 mt-2" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Security reminders block */}
        <div className="bg-amber-950 text-amber-50 rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
            <ShieldAlert className="w-32 h-32" />
          </div>
          <h4 className="font-display font-semibold text-amber-200 mb-2">Escalation Thresholds</h4>
          <p className="text-xs text-amber-100/80 leading-relaxed space-y-2">
            Always escalate issues following our official chain:
            <br />
            <strong>Social Media Officer → Communication Supervisor → Library Director</strong>
          </p>
        </div>
      </div>

      {/* Right panel: Form Preview sheet */}
      <div className="lg:col-span-7">
        <div className="bg-white rounded-3xl border border-amber-100 p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-display font-semibold text-gray-900 text-lg">Official Incident Form Preview</h3>
            {selectedIncident && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(selectedIncident.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    selectedIncident.status === 'Resolved'
                      ? 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                      : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  {selectedIncident.status === 'Resolved' ? 'Reopen Investigation' : 'Resolve Incident'}
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Report
                </button>
              </div>
            )}
          </div>

          {/* Form Print layout exactly like PDF page 21 */}
          <div className="border border-gray-300 p-6 bg-white space-y-5" id="printable-incident-form">
            <div className="border-b border-gray-200 pb-4 text-center">
              <h3 className="font-display font-bold text-gray-950 text-sm">BUGANDA HERITAGE LIBRARY – SOCIAL MEDIA INCIDENT REPORT</h3>
              <p className="text-[10px] text-gray-400 font-mono mt-1">Official Archival Reference ID: {selectedIncident?.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-500 text-[10px] block">Date/Time of Incident</span>
                <span className="text-gray-900 font-mono">{selectedIncident?.dateTime.replace('T', ' ')}</span>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-500 text-[10px] block">Incident Type</span>
                <span className="text-gray-900 font-medium">{selectedIncident?.type}</span>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-500 text-[10px] block">Reported By</span>
                <span className="text-gray-900 font-medium">{selectedIncident?.reportedBy}</span>
              </div>
              <div className="border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-500 text-[10px] block">Official Role</span>
                <span className="text-gray-900">{selectedIncident?.role}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold text-gray-500 text-[10px] block mb-1 uppercase tracking-wider">Description of Incident</span>
                <p className="text-gray-800 leading-relaxed font-normal">{selectedIncident?.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-bold text-gray-500 text-[10px] block mb-1 uppercase tracking-wider">Accounts/Platforms Affected</span>
                  <p className="text-gray-800 font-medium">{selectedIncident?.platformsAffected}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-bold text-gray-500 text-[10px] block mb-1 uppercase tracking-wider">Persons Involved</span>
                  <p className="text-gray-800">{selectedIncident?.personsInvolved}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold text-gray-500 text-[10px] block mb-1 uppercase tracking-wider">Immediate Actions Taken</span>
                <p className="text-gray-800 leading-relaxed">{selectedIncident?.actionsTaken}</p>
              </div>

              {/* Escalated to checklist */}
              <div className="p-3 border border-gray-150 rounded-lg space-y-2">
                <span className="font-bold text-gray-500 text-[10px] block uppercase tracking-wider">Escalation Matrix Check</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
                  {['Tech Lead', 'Communications Supervisor', 'Director', 'Legal'].map(role => {
                    const isChecked = selectedIncident?.escalatedTo.includes(role as any);
                    return (
                      <div key={role} className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          disabled
                          checked={isChecked}
                          className="w-3.5 h-3.5 rounded-sm border-gray-300 text-amber-600"
                        />
                        <span className={isChecked ? 'font-bold text-gray-800' : 'text-gray-400'}>{role}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-bold text-gray-500 text-[10px] block mb-1 uppercase tracking-wider">Follow-up Actions Planned</span>
                <p className="text-gray-800 leading-relaxed">{selectedIncident?.followUpActions || 'No follow up logged yet.'}</p>
              </div>

              <div className="p-3 bg-amber-50/40 border border-amber-100 rounded-lg">
                <span className="font-bold text-amber-800 text-[10px] block mb-1 uppercase tracking-wider">Resolution / Outcome Details</span>
                <p className="text-amber-950 font-medium leading-relaxed">{selectedIncident?.resolution}</p>
              </div>
            </div>

            {/* Signature section */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-gray-200 text-xs">
              <div>
                <span className="font-bold text-gray-500 text-[10px] block uppercase">Prepared by (Staff Name)</span>
                <span className="text-gray-900 block mt-2 font-medium">{selectedIncident?.preparedBy}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-gray-500 text-[10px] block uppercase">Officer Signature</span>
                <span className="text-amber-900 block mt-2 font-display italic text-base font-semibold">{selectedIncident?.signature || 'Kwame S.'}</span>
                <span className="text-[9px] text-gray-400 block font-mono mt-1">Date: {selectedIncident?.datePrepared}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Incident Modal Form */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-100 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-display font-semibold text-gray-900 text-lg">Log social media incident</h3>
              <button 
                onClick={() => setIsAddOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIncident} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Date/Time of Incident</label>
                  <input
                    type="datetime-local"
                    required
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Incident Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  >
                    <option value="Misinformation">Misinformation</option>
                    <option value="Security Breach">Security Breach</option>
                    <option value="Harassment">Harassment</option>
                    <option value="Defamatory Content">Defamatory Content</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Reporter Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Ssewankambo"
                    value={reportedBy}
                    onChange={(e) => setReportedBy(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Reporter Official Role</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Social Media Officer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Description of Incident</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Summarize what transpired, mentioning specific messages, posts, or security issues."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Accounts/Platforms Affected</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Facebook Main Page"
                    value={platformsAffected}
                    onChange={(e) => setPlatformsAffected(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Persons Involved</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. User @heritage_truth"
                    value={personsInvolved}
                    onChange={(e) => setPersonsInvolved(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700">Immediate Actions Taken</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hidden comment, sent direct notification"
                  value={actionsTaken}
                  onChange={(e) => setActionsTaken(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                />
              </div>

              {/* Escalated check list */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 block mb-1">Escalated To (Select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer">
                    <input type="checkbox" checked={escalatedTech} onChange={(e) => setEscalatedTech(e.target.checked)} className="rounded-sm border-gray-300 text-amber-600" />
                    <span>Tech Lead</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer">
                    <input type="checkbox" checked={escalatedComm} onChange={(e) => setEscalatedComm(e.target.checked)} className="rounded-sm border-gray-300 text-amber-600" />
                    <span>Comm Head</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer">
                    <input type="checkbox" checked={escalatedDir} onChange={(e) => setEscalatedDir(e.target.checked)} className="rounded-sm border-gray-300 text-amber-600" />
                    <span>Director</span>
                  </label>
                  <label className="flex items-center gap-1.5 p-2 bg-gray-50 border border-gray-100 rounded-lg cursor-pointer">
                    <input type="checkbox" checked={escalatedLegal} onChange={(e) => setEscalatedLegal(e.target.checked)} className="rounded-sm border-gray-300 text-amber-600" />
                    <span>Legal</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Follow-up Actions Planned</label>
                  <input
                    type="text"
                    placeholder="e.g. Pre-draft lineage sheets"
                    value={followUpActions}
                    onChange={(e) => setFollowUpActions(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Resolution Status Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Issue resolved after deletion"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700">Officer Signature Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame S."
                    value={preparedBy}
                    onChange={(e) => {
                      setPreparedBy(e.target.value);
                      setSignature(e.target.value);
                    }}
                    className="w-full border border-gray-200 rounded-xl p-2.5 bg-white text-gray-800 focus:outline-hidden focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="grow py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="grow py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-xs"
                >
                  Log report
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
